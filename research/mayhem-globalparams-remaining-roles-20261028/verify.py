#!/usr/bin/env python3
"""Offline census of the five GlobalParams roles in the 441-window source.

The window-matching Mayhem tree names five fields that the older crosswalk
left unresolved. This script re-lexes that frozen tree, splits the shared
name field_10 across GlobalParams and FeeRecipient, and checks the recorded
survey. It does not compile, link, or execute a program.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
import sys
import tarfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = Path(__file__).resolve().parent
TAR_REL = "research/claude-mayhem-441-20261028/sources/source.tar.gz"
TAR_SHA256 = "049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494"
BASELINE_TAR_REL = "research/mayhem-meaningful-elf-20261028/baseline/source.tar.gz"
REPEAT_TAR_REL = "research/mayhem-meaningful-elf-20261028/builds/03-repeat-rebound/source.tar.gz"
CONTRACTS_REL = "research/mayhem-globalparams-contracts/contracts.json"
FIELDS = ("field_0", "field_1", "field_3", "field_6", "field_10")
IDENT = re.compile(r"\b(field_0|field_1|field_3|field_6|field_10)\b")
IMPL_RE = re.compile(r"\bimpl\b(?:\s*<[^;\n{]*>)?\s+(?:[\w:]+\s+)*\b(FeeRecipient|GlobalParams)\b")
STRUCT_RE = re.compile(r"\bstruct\s+([A-Za-z_][A-Za-z0-9_]*)")

# 同名 field_10 分属两个账户。业务读取只承认 GlobalParams 上、且不是赋值的那几次。
BUSINESS_QUOTES = {
    ("field_6", "src/state.rs", "let duration_hours=params.field_6 as i64;"),
    (
        "field_10",
        "src/instructions/fee_recipients.rs",
        "if last != 0 && global_params.field_10 as i64 != 0 {",
    ),
    (
        "field_10",
        "src/instructions/fee_recipients.rs",
        "let interval = global_params.field_10 as i64;",
    ),
}
PINNED_FILES = (
    "src/lib.rs",
    "src/state.rs",
    "src/instructions/fee_recipients.rs",
    "src/instructions/admin.rs",
)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def mask_source(text: str) -> str:
    """Blank comments and string/char literals. Keep every other column."""
    out = list(text)
    i = 0
    n = len(text)
    while i < n:
        if text.startswith("//", i):
            while i < n and text[i] != "\n":
                out[i] = " "
                i += 1
            continue
        if text.startswith("/*", i):
            out[i] = out[i + 1] = " "
            i += 2
            while i < n and not text.startswith("*/", i):
                if text[i] != "\n":
                    out[i] = " "
                i += 1
            if i < n:
                out[i] = out[i + 1] = " "
                i += 2
            continue
        if text[i] in "\"'":
            quote = text[i]
            out[i] = " "
            i += 1
            while i < n:
                if text[i] == "\\":
                    out[i] = " "
                    if i + 1 < n and text[i + 1] != "\n":
                        out[i + 1] = " "
                        i += 2
                        continue
                if text[i] == "\n":
                    break
                if text[i] == quote:
                    out[i] = " "
                    i += 1
                    break
                out[i] = " "
                i += 1
            continue
        i += 1
    return "".join(out)


def scopes_at_lines(masked: str) -> list[tuple[str | None, str | None]]:
    """Map each line to (enclosing impl, enclosing struct).

    只跟踪 FeeRecipient / GlobalParams 这两个 impl。结构体则保留真实名字，
    这样事件结构体里的同名字段不会被算进 GlobalParams 账户。
    """
    lines = masked.splitlines()
    depth = 0
    impl_name: str | None = None
    impl_depth: int | None = None
    struct_name: str | None = None
    struct_depth: int | None = None
    owners: list[tuple[str | None, str | None]] = []
    for line in lines:
        if impl_name is None:
            match = IMPL_RE.search(line)
            if match and "{" in line:
                impl_name = match.group(1)
                impl_depth = depth
        if struct_name is None:
            match = STRUCT_RE.search(line)
            if match and "{" in line:
                struct_name = match.group(1)
                struct_depth = depth
        owners.append((impl_name, struct_name))
        depth += line.count("{") - line.count("}")
        if impl_name is not None and impl_depth is not None and depth <= impl_depth:
            impl_name = None
            impl_depth = None
        if struct_name is not None and struct_depth is not None and depth <= struct_depth:
            struct_name = None
            struct_depth = None
    return owners


def classify_occurrence(
    masked_line: str,
    start: int,
    field: str,
    impl_owner: str | None,
    struct_owner: str | None,
) -> tuple[str, str]:
    """Return (owner, role) for one identifier occurrence on an already-masked line."""
    prefix = masked_line[:start]
    suffix = masked_line[start + len(field) :]
    receiver_match = re.search(r"\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*$", prefix)
    receiver = receiver_match.group(1) if receiver_match else None
    writes = bool(re.match(r"\s*(\+=|=)(?!=)", suffix))
    if receiver is None and re.search(r"\bpub\s+$", prefix):
        return struct_owner or "declaration", "declaration"
    if receiver in {"global_params", "params", "state"}:
        owner = "GlobalParams"
    elif receiver in {"fee_recipient", "recipient"}:
        owner = "FeeRecipient"
    elif receiver == "self":
        owner = impl_owner or "unscoped_self"
    elif receiver is None:
        owner = "binding"
    else:
        owner = f"receiver:{receiver}"
    if owner == "GlobalParams" and not writes:
        # 事件投影是 `field_N: state.field_N`，不是交易或 sweep 里的业务读取。
        if receiver == "state" and re.search(rf"\b{field}\s*:\s*state\s*\.\s*{field}\b", masked_line):
            return owner, "event_read"
        if receiver in {"global_params", "params"}:
            return owner, "business_read"
        return owner, "unclassified_global_read"
    if owner == "GlobalParams" and writes:
        return owner, "transport_write"
    if owner == "FeeRecipient" and writes:
        return owner, "recipient_write"
    if owner == "FeeRecipient" and not writes:
        return owner, "recipient_read"
    if owner == "binding":
        return owner, "binding"
    if owner == "declaration":
        return owner, "declaration"
    return owner, "unclassified"


def occurrences_in_text(path: str, text: str) -> list[dict]:
    masked = mask_source(text)
    raw_lines = text.splitlines()
    masked_lines = masked.splitlines()
    owners = scopes_at_lines(masked)
    found = []
    for line_no, (raw, masked_line, (impl_owner, struct_owner)) in enumerate(zip(raw_lines, masked_lines, owners), 1):
        for match in IDENT.finditer(masked_line):
            owner, role = classify_occurrence(masked_line, match.start(), match.group(1), impl_owner, struct_owner)
            found.append(
                {
                    "file": path,
                    "line": line_no,
                    "column": match.start() + 1,
                    "field": match.group(1),
                    "owner": owner,
                    "role": role,
                    "quote": raw.strip(),
                }
            )
    return found


def program_sources(archive: bytes) -> dict[str, bytes]:
    files: dict[str, bytes] = {}
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
        for member in tar.getmembers():
            name = member.name
            if not member.isfile() or not name.endswith(".rs"):
                continue
            if name.startswith("vendor/") or "/vendor/" in name:
                continue
            extracted = tar.extractfile(member)
            if extracted is None:
                raise SystemExit(f"missing tar member {name}")
            files[name] = extracted.read()
    return files


def member_bytes(archive: bytes, name: str) -> bytes:
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
        extracted = tar.extractfile(name)
        if extracted is None:
            raise SystemExit(f"missing tar member {name}")
        return extracted.read()


def census(archive: bytes) -> dict:
    sources = program_sources(archive)
    rows = []
    for path in sorted(sources):
        rows.extend(occurrences_in_text(path, sources[path].decode("utf-8")))
    rows.sort(key=lambda row: (row["file"], row["line"], row["column"], row["field"]))
    return {"program_rust_files": len(sources), "occurrences": rows, "sources": sources}


def business_key(row: dict) -> tuple[str, str, str]:
    return (row["field"], row["file"], row["quote"])


def summarize(rows: list[dict]) -> dict:
    summary = {}
    for field in FIELDS:
        owned = [row for row in rows if row["field"] == field]
        summary[field] = {
            "occurrences": len(owned),
            "by_role": {},
        }
        for row in owned:
            summary[field]["by_role"][row["role"]] = summary[field]["by_role"].get(row["role"], 0) + 1
        summary[field]["business_reads"] = [
            {"file": row["file"], "line": row["line"], "quote": row["quote"]}
            for row in owned
            if row["role"] == "business_read"
        ]
    return summary


def assert_census(rows: list[dict], sources: dict[str, bytes]) -> None:
    bad = [row for row in rows if row["role"].startswith("unclassified") or row["owner"].startswith("receiver:") or row["owner"] == "unscoped_self"]
    if bad:
        raise SystemExit("unclassified field tokens:\n" + json.dumps(bad, indent=2))
    found = {business_key(row) for row in rows if row["role"] == "business_read"}
    if found != BUSINESS_QUOTES:
        raise SystemExit(
            "business-read set drifted\n"
            + json.dumps({"found": sorted(map(list, found)), "expected": sorted(map(list, BUSINESS_QUOTES))}, indent=2)
        )
    for field in ("field_0", "field_1", "field_3"):
        hits = [row for row in rows if row["field"] == field and row["role"] == "business_read"]
        if hits:
            raise SystemExit(f"{field} gained a business read: {hits}")
    reset = sources["src/lib.rs"].decode("utf-8").splitlines()
    body = "\n".join(reset[194:216])  # reset_state, 1-based lines 195-216
    if "pub fn reset_state" not in body or "state.field_10" in body:
        raise SystemExit("reset_state no longer preserves GlobalParams.field_10")
    for field in ("field_0", "field_1", "field_3", "field_6"):
        if f"state.{field} = 0;" not in body:
            raise SystemExit(f"reset_state lost the zero write of {field}")
    fee = sources["src/instructions/fee_recipients.rs"].decode("utf-8")
    admin = fee.split("impl<'info> crate::SweepFeesAdmin<'info>", 1)[1].split("pub(crate) fn sweep_fees_admin", 1)[0]
    trader = fee.split("impl<'info> crate::SweepFees<'info>", 1)[1].split("impl<'info> crate::SweepFeesAdmin<'info>", 1)[0]
    if "validate_sweep" not in trader:
        raise SystemExit("trader sweep no longer calls validate_sweep")
    if "validate_sweep" in admin:
        raise SystemExit("admin sweep started consulting the field_10 interval")
    if "SweepFeeRateLimit" not in fee:
        raise SystemExit("SweepFeeRateLimit disappeared from the sweep source")


def check_history(root: Path) -> dict:
    path = root / CONTRACTS_REL
    data = json.loads(path.read_text())
    entry = next(item for item in data["fields"] if item["field"] == "field_10")
    values = entry["history"]["values_v1_to_v10"]
    if values != [86400, 86400, 86400, 86400, 86400, 86400, 86280, 86280, 86280, 86280]:
        raise SystemExit(f"field_10 history values changed: {values}")
    # 先前的契约包把 consumer 标成空。这里只核对它仍是那份历史记录，不改写它。
    if entry.get("consumer_status") != "no consumer in any recovered source":
        raise SystemExit("PR284 field_10 consumer_status is no longer the historical sentence this package supersedes")
    return {
        "path": CONTRACTS_REL,
        "sha256": sha256(path.read_bytes()),
        "values_v1_to_v10": values,
        "historical_consumer_status": entry["consumer_status"],
    }


def check_repeat_source(root: Path, baseline: bytes) -> dict:
    repeat_path = root / REPEAT_TAR_REL
    repeat = repeat_path.read_bytes()
    notes = {"path": REPEAT_TAR_REL, "sha256": sha256(repeat), "program_members_equal": []}
    base_sources = program_sources(baseline)
    repeat_sources = program_sources(repeat)
    if set(base_sources) != set(repeat_sources):
        raise SystemExit("repeat-build program source membership differs from the 441 tree")
    for name, raw in base_sources.items():
        if repeat_sources[name] != raw:
            raise SystemExit(f"program source drifted in the meaningful-ELF repeat tree: {name}")
        notes["program_members_equal"].append(name)
    anchor = "vendor/anchor-lang/src/lib.rs"
    if member_bytes(baseline, anchor) == member_bytes(repeat, anchor):
        raise SystemExit("expected the meaningful-ELF repeat tree to move only the Anchor module declaration")
    notes["only_member_difference"] = anchor
    return notes


def build_survey(root: Path) -> dict:
    tar_path = root / TAR_REL
    archive = tar_path.read_bytes()
    digest = sha256(archive)
    if digest != TAR_SHA256:
        raise SystemExit(f"{TAR_REL} sha256 {digest} != {TAR_SHA256}")
    baseline_path = root / BASELINE_TAR_REL
    baseline = baseline_path.read_bytes()
    if sha256(baseline) != TAR_SHA256:
        raise SystemExit("meaningful-ELF baseline source is not the 441 source archive")
    counted = census(archive)
    assert_census(counted["occurrences"], counted["sources"])
    pins = {name: sha256(counted["sources"][name]) for name in PINNED_FILES}
    survey = {
        "source_tar": TAR_REL,
        "source_tar_sha256": digest,
        "source_tar_bytes": len(archive),
        "meaningful_elf_baseline_tar": BASELINE_TAR_REL,
        "meaningful_elf_baseline_same_sha256": True,
        "meaningful_elf_repeat": check_repeat_source(root, archive),
        "program_rust_files": counted["program_rust_files"],
        "pinned_file_sha256": pins,
        "history": check_history(root),
        "summary": summarize(counted["occurrences"]),
        "occurrences": counted["occurrences"],
        "limits": [
            "Historical Rust names stay unresolved.",
            "field_0, field_1 and field_3 still have no business read in this tree.",
            "The 120-second change from 86400 to 86280 has no recovered explanation.",
            "programs/mayhem sweep_remaining is a different, older source and is not patched here.",
            "No program was compiled or executed.",
        ],
    }
    return survey


def main(argv: list[str]) -> None:
    survey = build_survey(ROOT)
    expected_path = PACKAGE / "survey.json"
    payload = json.dumps(survey, indent=2) + "\n"
    if "--write" in argv:
        expected_path.write_text(payload)
        print(f"wrote {expected_path}")
        return
    expected = json.loads(expected_path.read_text())
    if expected != survey:
        raise SystemExit("survey.json does not match the regenerated census")
    business = {
        field: [item["quote"] for item in survey["summary"][field]["business_reads"]]
        for field in FIELDS
    }
    print(json.dumps({"program_rust_files": survey["program_rust_files"], "business_reads": business}, indent=2))
    print("mayhem globalparams remaining-role census OK")


if __name__ == "__main__":
    main(sys.argv[1:])
