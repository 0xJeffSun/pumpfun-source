#!/usr/bin/env python3
"""Standalone Mayhem original-window inventory for any unstripped candidate build.

Partitions all 441 inferred original Mayhem windows into raw-equal,
normalized-only and unmatched against the FUNC symbols of a candidate ELF that
still carries its symbol table. The matcher rule is the repository's existing
one (see research/mayhem-quotes-current-recovery-20261027/reader.py): equal
window length, equal normalized instruction bytes, equal relocation pattern,
where normalization masks only pc-relative call immediates and type-8 relocated
lddw immediates. Everything else must be byte-identical.

Static evidence only. It never executes an ELF, never writes into one, and does
not prove source identity, call/data closure or semantics for any match.

Calibration: run with --calibrate against the published 432-window symbol
artifact and it must reproduce raw-equal 100 / normalized-only 332 / unmatched 9.
"""
import argparse
import collections
from contextlib import contextmanager
import gzip
import hashlib
import importlib.util
import json
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
READER = ROOT / "research/mayhem-quotes-current-recovery-20261027/reader.py"
WINDOWS = ROOT / "research/mayhem-trade-origins-validator/audit.json"
ORIGINAL = ROOT / "evidence/original/mayhem/deployed.so"
PUBLISHED = ROOT / "research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz"
PUBLISHED_COUNTS = {"raw-equal": 100, "normalized-only": 332, "unmatched": 9}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def load_reader():
    spec = importlib.util.spec_from_file_location("mayhem_window_reader", READER)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    # reader.Elf resolves paths relative to its own packet's inputs directory;
    # give it a path resolver that accepts absolute paths unchanged.
    class _Inputs:
        def __truediv__(self, other):
            return Path(other)
    module.I = _Inputs()
    return module


def shape(window):
    return (window["end"] - window["start"], window["normalized_sha256"],
            json.dumps(window["normalization_pattern"], sort_keys=True))


def candidate_windows(reader, elf):
    windows, names = {}, collections.defaultdict(list)
    for sym in elf.symbols:
        if sym["info"] & 15 == 2 and sym["size"] >= 8 and elf.lo <= sym["value"] < elf.hi:
            start = sym["value"]
            windows[start] = elf.window(start, start + sym["size"])
            names[start].append(sym["name"])
    return windows, names


def inventory(candidate_path, reader):
    original = reader.Elf(str(ORIGINAL))
    candidate = reader.Elf(str(candidate_path))
    cw, names = candidate_windows(reader, candidate)
    grouped = collections.defaultdict(list)
    for start, win in cw.items():
        grouped[shape(win)].append(start)
    rows = []
    for r in json.loads(WINDOWS.read_bytes())["rows"]:
        win = original.window(r["start"], r["end"])
        hits = sorted(grouped[shape(win)])
        raw = [a for a in hits if cw[a]["raw_sha256"] == win["raw_sha256"]]
        rows.append({
            "id": r["id"], "start": r["start"], "end": r["end"], "bytes": r["end"] - r["start"],
            "classification": "raw-equal" if raw else "normalized-only" if hits else "unmatched",
            "previous_role": r.get("previous_role", ""),
            "counterpart_count": len(hits),
            "counterparts": [{"start": a, "end": cw[a]["end"], "names": sorted(set(names[a]))} for a in hits[:5]],
            "raw_counterparts": raw,
            "direct_calls": len(win["direct"]), "external_calls": len(win["external"]),
            "indirect_calls": len(win["indirect"]), "data_references": len(win["data_references"]),
        })
    assert len(rows) == 441, len(rows)
    counts = {k: sum(r["classification"] == k for r in rows) for k in PUBLISHED_COUNTS}
    matched = sum(r["bytes"] for r in rows if r["classification"] != "unmatched")
    total = sum(r["bytes"] for r in rows)
    assert total == original.hi - original.lo == 706744
    return {
        "scope": "Static window partition only; no source identity, closure or semantic claim.",
        "original_sha256": sha(original.b),
        "candidate_sha256": sha(candidate.b),
        "candidate_text_sha256": sha(candidate.b[candidate.lo:candidate.hi]),
        "candidate_function_symbols": len(cw),
        "counts": counts,
        "matched_text_bytes": matched,
        "unmatched_text_bytes": total - matched,
        "original_text_bytes": total,
        "rows": rows,
    }


@contextmanager
def resolve_candidate(path):
    data = Path(path).read_bytes()
    if path.endswith(".gz"):
        data = gzip.decompress(data)
    with tempfile.TemporaryDirectory(prefix="mayhem-inventory-") as directory:
        candidate = Path(directory) / "candidate.so"
        candidate.write_bytes(data)
        yield candidate


def print_summary(result, label):
    c = result["counts"]
    print(f"{label}")
    print(f"  candidate sha256   {result['candidate_sha256']}")
    print(f"  function symbols   {result['candidate_function_symbols']}")
    print(f"  raw-equal          {c['raw-equal']}")
    print(f"  normalized-only    {c['normalized-only']}")
    print(f"  unmatched          {c['unmatched']}")
    print(f"  matched text bytes {result['matched_text_bytes']} / {result['original_text_bytes']}"
          f"  ({100.0 * result['matched_text_bytes'] / result['original_text_bytes']:.1f}% of text)")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("candidate", nargs="?", help="unstripped candidate .so (or .so.gz) with FUNC symbols")
    ap.add_argument("--calibrate", action="store_true",
                    help="run against the published 432-window artifact and assert 100/332/9")
    ap.add_argument("--out", type=Path, help="write full JSON inventory here")
    ap.add_argument("--unmatched", action="store_true", help="list unmatched windows")
    args = ap.parse_args()
    reader = load_reader()

    if args.calibrate:
        with resolve_candidate(str(PUBLISHED)) as path:
            result = inventory(path, reader)
        print_summary(result, "calibration against published 432-window artifact")
        if result["counts"] != PUBLISHED_COUNTS:
            print(f"CALIBRATION FAILED: {result['counts']} != {PUBLISHED_COUNTS}", file=sys.stderr)
            return 1
        print("  calibration OK: counts equal the published inventory")
        if not args.candidate:
            return 0

    if not args.candidate:
        ap.error("candidate path required unless --calibrate")
    with resolve_candidate(args.candidate) as path:
        result = inventory(path, reader)
    print_summary(result, f"inventory for {args.candidate}")
    if args.unmatched:
        print("  unmatched windows (largest first):")
        for r in sorted((r for r in result["rows"] if r["classification"] == "unmatched"),
                        key=lambda r: -r["bytes"]):
            print(f"    {r['id']}  {r['start']:>7}-{r['end']:<7} {r['bytes']:>6} B  {r['previous_role']}")
    if args.out:
        args.out.write_text(json.dumps(result, indent=2) + "\n")
        print(f"  wrote {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
