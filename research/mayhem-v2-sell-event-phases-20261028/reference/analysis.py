"""Recompute source, compiler, preservation and CFG evidence without executing ELF code."""
from collections import Counter
from pathlib import Path, PurePosixPath
import difflib
import gzip
import hashlib
import importlib.util
import json
import struct
import tarfile
import tempfile

LABELS = ("direct-signer", "conditional-event")
ORIGINAL = (95848, 113160)
EXPECTED_FLAGS = [
    "--remap-path-prefix=src/=programs/mayhem-program/src/",
    "--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs",
    "--emit=link,llvm-ir", "-Zprint-type-sizes",
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == ".gz" else data


def load(path):
    return json.loads(raw(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def unpack(path):
    files = {}
    with tarfile.open(path) as archive:
        for member in archive:
            name = PurePosixPath(member.name)
            assert member.isfile() and not name.is_absolute() and ".." not in name.parts
            assert str(name) == member.name and member.name not in files
            files[member.name] = archive.extractfile(member).read()
    return files


def key(window):
    return (window["end"] - window["start"], window["normalized_sha256"],
            json.dumps(window["normalization_pattern"], sort_keys=True))


def windows(elf):
    return {s["value"]: elf.window(s["value"], s["value"] + s["size"])
            for s in elf.symbols if s["info"] & 15 == 2 and s["size"] >= 8
            and elf.lo <= s["value"] < elf.hi}


def named(elf, index, marker):
    choices = [s for s in elf.symbols if s["info"] & 15 == 2 and marker in s["name"]]
    assert len(choices) == 1, (marker, choices)
    return index[choices[0]["value"]]


def sources(elf, window):
    result = []
    for ref in window["data_references"]:
        at = ref["target"]
        if at not in elf.rel or elf.rel[at]["type"] != 8:
            continue
        try:
            zero, ptr = struct.unpack_from("<II", elf.b, at)
            size, line, column = struct.unpack_from("<QII", elf.b, at + 8)
            if zero or not (1 <= size < 300 and 1 <= line < 100000 and 1 <= column < 10000):
                continue
            text = elf.b[ptr:ptr + size].decode()
            if text.endswith(".rs\0"):
                result.append([text[:-1], line, column])
        except (struct.error, UnicodeError):
            pass
    return result


def cfg_report(cfg, original, candidate, original_window, candidate_window):
    oi, ob = cfg.cfg(original, original_window["start"], original_window["end"])
    ci, cb = cfg.cfg(candidate, candidate_window["start"], candidate_window["end"])
    pending, pairs, conflicts = [(0, 0)], {}, []
    while pending:
        a, b = pending.pop()
        if a in pairs:
            if pairs[a] != b:
                conflicts.append(["mapping", a, pairs[a], b])
            continue
        pairs[a] = b
        if [k for k, _ in ob[a]["succ"]] != [k for k, _ in cb[b]["succ"]]:
            conflicts.append(["edges", a, b, ob[a]["succ"], cb[b]["succ"]])
            continue
        pending.extend((x, y) for (_, x), (_, y) in zip(ob[a]["succ"], cb[b]["succ"]))
    opcode_differences = []
    for a, b in sorted(pairs.items()):
        if [i["op"] for i in ob[a]["ins"]] != [i["op"] for i in cb[b]["ins"]]:
            opcode_differences.append({"original_block": a, "candidate_block": b,
                                       "original_instructions": len(ob[a]["ins"]),
                                       "candidate_instructions": len(cb[b]["ins"])})
    of, cf = cfg.field_reads(ob), cfg.field_reads(cb)
    field_differences = []
    for a, b in sorted(pairs.items()):
        aa, bb = of.get(a, []), cf.get(b, [])
        shape = lambda rows: [(r["base"], r["offset"], r["width"]) for r in rows]
        if shape(aa) != shape(bb):
            field_differences.append({"original_block": a, "candidate_block": b,
                                      "original_fields": aa, "candidate_fields": bb})
    oa, os = cfg.stack(oi, ob)
    ca, cs = cfg.stack(ci, cb)
    return {"no_return_policy": "relocation-confirmed-abort-symbols-v2",
            "scope": "Diagnostic ordered-edge CFG, direct-r10 liveness and syntactic must-alias field flow; not an equivalence matcher.",
            "original_blocks": ob, "candidate_blocks": cb, "block_mapping": pairs,
            "topology_conflicts": conflicts, "opcode_different_blocks": opcode_differences,
            "different_field_reads": field_differences,
            "original_direct_stack": {"accesses": oa, "slots": os},
            "candidate_direct_stack": {"accesses": ca, "slots": cs}}


def analyze(root, packet):
    reader = module("amm_cfg_reader", packet / "helpers/reader.py")
    progress = module("amm_cfg_progress", packet / "helpers/progress.py")
    cfg = module("amm_cfg_diagnostics", packet / "cfg.py")
    base = unpack(packet / "base-source.tar.gz")
    hashes = lambda files: {n: sha(b) for n, b in files.items()}
    assert len(base) == 67
    assert hashes(base) == load(packet / "base-source-inputs.json")
    assert hashes(base) == load(root / "research/mayhem-quotes-current-recovery-20261027/source-inputs.json")
    original_bytes = raw(root / "evidence/original/mayhem/deployed.so")
    baseline_bytes = raw(root / "research/mayhem-amm-handler-shape-controls-20261027/controls/baseline/symbols.so.gz")
    reports, graphs = {}, {}
    with tempfile.TemporaryDirectory(prefix="amm-cfg-read-") as directory:
        directory = Path(directory)
        op, bp = directory / "original.so", directory / "baseline.so"
        op.write_bytes(original_bytes)
        bp.write_bytes(baseline_bytes)
        original, baseline = reader.Elf(op), reader.Elf(bp)
        rows = load(packet / "helpers/inputs/parent-audit.json.gz")["rows"]
        ow = {r["start"]: original.window(r["start"], r["end"]) for r in rows}
        bw = windows(baseline)
        original_window = ow[ORIGINAL[0]]
        for label in LABELS:
            directory_control = packet / "controls" / label
            overrides = {p.relative_to(directory_control / "overrides").as_posix(): p.read_bytes()
                         for p in (directory_control / "overrides").rglob("*") if p.is_file()}
            assert set(overrides) == {"src/instructions/sell_pump_swap.rs"}
            source = dict(base, **overrides)
            assert hashes(source) == load(directory_control / "source-inputs.json")
            patch = "".join(line for n in sorted(overrides)
                            for line in difflib.unified_diff(base[n].decode().splitlines(True),
                                                            source[n].decode().splitlines(True),
                                                            fromfile="a/" + n, tofile="b/" + n))
            assert patch.encode() == raw(directory_control / "source.patch")
            launch, result = load(directory_control / "launch.json"), load(directory_control / "result.json")
            assert launch["source_inputs"] == hashes(source)
            assert launch["flags"] == EXPECTED_FLAGS and not launch["full_clean"]
            assert launch["controller_sha256"] == sha(raw(packet / "controllers/build_mixed_fast_v2.py"))
            assert result["returncode"] == 0 and result["root_rustc_invocations"] == 1
            assert all(result[k] for k in ["source_unchanged", "tools_unchanged", "target_libraries_unchanged"])
            for stream in ["stdout", "stderr"]:
                assert sha(raw(directory_control / (stream + ".gz"))) == result[stream + "_sha256"]
            assert b"overflows the maximum allowed frame space" not in raw(directory_control / "stderr.gz")
            cb, sb = raw(directory_control / "candidate.so.gz"), raw(directory_control / "symbols.so.gz")
            assert sha(cb) == result["candidate_sha256"] and sha(sb) == result["symbols_sha256"]
            assert len(cb) == result["candidate_bytes"]
            ir = raw(directory_control / "module.ll.gz")
            assert sha(ir) == load(directory_control / "ir-receipt.json")["llvm_ir_sha256"]
            cp, sp = directory / "candidate.so", directory / "symbols.so"
            cp.write_bytes(cb)
            sp.write_bytes(sb)
            candidate, stripped = reader.Elf(sp), reader.Elf(cp)
            for section in candidate.sections:
                if section["flags"] & 2 and section["type"] != 8:
                    other = stripped.sec[section["name"]]
                    assert (section["address"], section["size"]) == (other["address"], other["size"])
                    assert candidate.b[section["offset"]:section["offset"] + section["size"]] == stripped.b[other["offset"]:other["offset"] + other["size"]]
            preservation = progress.compare(original_bytes, baseline_bytes, sb)
            assert preservation["matches"] == 432 and preservation["raw_matches"] == 89
            assert preservation["gains"] == []
            assert preservation["positive_direct_edges_after"] == 4314
            assert preservation["positive_Source_records_after"] == 456
            cw = windows(candidate)
            window = named(candidate, cw, "sell_pump_swap7handler")
            oc = [key(ow[x["target"]]) for x in original_window["direct"]]
            cc = [key(cw[x["target"]]) for x in window["direct"]]
            assert len(oc) == len(cc) == 47 and oc == cc
            assert sources(original, original_window) == sources(candidate, window)
            preserved = {}
            for marker in ["buy_pump_swap7handler", "legacy_buy_handler", "legacy_sell_handler", "buy_v27handler", "sell_v2_handler"]:
                a, b = named(baseline, bw, marker), named(candidate, cw, marker)
                preserved[marker] = key(a) == key(b)
                assert preserved[marker]
            a, ap = original.norm(*ORIGINAL)
            b, bpat = candidate.norm(window["start"], window["end"])
            assert (a, ap) != (b, bpat)
            aa, bb = [a[i:i + 8] for i in range(0, len(a), 8)], [b[i:i + 8] for i in range(0, len(b), 8)]
            graphs[label] = cfg_report(cfg, original, candidate, original_window, window)
            reports[label] = {"candidate_sha256": sha(cb), "symbols_sha256": sha(sb),
                              "original_bytes": ORIGINAL[1] - ORIGINAL[0], "bytes": len(b),
                              "position_equal": sum(x == y for x, y in zip(aa, bb)),
                              "sequence_matcher_aligned_slots": sum(x.size for x in difflib.SequenceMatcher(a=aa, b=bb, autojunk=False).get_matching_blocks()),
                              "full_normalized_body_equal": False, "calls": 47,
                              "ordered_callee_shapes_equal": True,
                              "equal_call_positions": sum(x["offset"] == y["offset"] for x, y in zip(original_window["direct"], window["direct"])),
                              "Source_records": sources(candidate, window),
                              "other_partial_handlers_preserved": preserved,
                              "preservation": preservation,
                              "cfg_original_blocks": len(graphs[label]["original_blocks"]),
                              "cfg_candidate_blocks": len(graphs[label]["candidate_blocks"]),
                              "cfg_mapped_blocks": len(graphs[label]["block_mapping"]),
                              "cfg_topology_conflicts": graphs[label]["topology_conflicts"],
                              "cfg_opcode_different_blocks": graphs[label]["opcode_different_blocks"],
                              "field_order_different_blocks": [x["original_block"] for x in graphs[label]["different_field_reads"]]}
    return {"controls": reports, "accepted_complete_handler_gains": 0,
            "qualified_layout_performed": False, "clean_controller_repeat_performed": False,
            "whole_elf_equal": False}, graphs
