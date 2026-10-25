#!/usr/bin/env python3
"""Verify current tracked inputs; historical scratch paths use exact published copies.

Run the immutable package verifier separately for saved receipts and signatures.
The historical Darwin Surfpool executable is identified, not installed or executed.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import struct
import subprocess
import sys

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
PACKAGES = {
    "pump": "repro/pump/bonding-curve-serializer-fortyeight",
    "fees": "repro/pump_fees/solana-family-221-v144",
}
HISTORICAL_COPIES = {
    "work/pump-multi-hop-curve-recovery/differential.py": "repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py",
    "work/pump-multi-hop-curve-recovery/verify_saved.py": "repro/pump/native-curve-partial-fortyeight/isolated-partial-checkpoint/verify_saved.py",
    "work/fees-update-admin-dataflow/signed_transfers.py": "repro/pump_fees/fee-config-serialization-v144/signed_transfers.py",
    "work/fees-config-serialization/serialization_error.py": "repro/pump_fees/fee-config-serialization-v144/serialization_error.py",
}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify_maps(root, groups, tracked):
    checked, historical = 0, []
    for group, entries in groups.items():
        for name, expected in entries.items():
            target = HISTORICAL_COPIES.get(name, name)
            assert target in tracked, ("Unpublished input", group, name, target)
            path = root / target
            assert not path.is_symlink(), target
            assert sha(path.read_bytes()) == expected, (group, name, target)
            checked += 1
            if target != name:
                historical.append({"recorded_path": name, "published_copy": target, "sha256": expected})
    return checked, historical


def verify_pump_body(root, package):
    # Same complete-body/call/literal checks as immutable verify-package.py:112-125.
    spec = importlib.util.spec_from_file_location("pump_binding_elf", package / "elf_reader.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    original = module.Elf(root / "evidence/original/pump/deployed.so")
    candidate = module.Elf(package / "candidate.so")
    symbols = module.Elf(package / "unstripped.so")
    match = json.loads((package / "function-match.json").read_text())
    assert sha(original.b) == "7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d"
    assert sha(candidate.b) == "92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a"
    assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
    assert candidate.pattern(candidate.lo, candidate.hi-candidate.lo) == symbols.pattern(symbols.lo, symbols.hi-symbols.lo)
    start, origin, size = match["candidate_body"]["start"], match["original_body"]["start"], 1840
    assert original.normalized[origin:origin+size] == candidate.normalized[start:start+size]
    assert original.pattern(origin, size) == candidate.pattern(start, size)
    functions = {(f["start"], f["size"]) for f in symbols.funcs}
    ranges = {p: (original.entries[i+1] if i+1 < len(original.entries) else original.hi)-p for i, p in enumerate(original.entries)}
    calls = candidate.callsites(start, size)
    assert len(calls) == 25
    for call in calls:
        dest = original.calls[origin+call["offset"]]
        sizes = [n for at, n in functions if at == call["target"]]
        assert len(sizes) == 1
        n = sizes[0]
        assert ranges[dest] == n
        assert original.normalized[dest:dest+n] == candidate.normalized[call["target"]:call["target"]+n]
        assert original.pattern(dest, n) == candidate.pattern(call["target"], n)
    assert candidate.pattern(start, size) == [{"offset": 248, "type": 8, "symbol": ""}]
    for elf, at in [(original, origin), (candidate, start)]:
        at += 248
        ptr = struct.unpack_from("<I", elf.b, at+4)[0] | struct.unpack_from("<I", elf.b, at+12)[0] << 32
        assert elf.b[ptr:ptr+8] == bytes.fromhex("17b7f83760d8ac60")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("program", choices=PACKAGES)
    args = parser.parse_args()
    package = ROOT / PACKAGES[args.program]
    read = lambda name: json.loads((package / name).read_text())
    tracked = set(subprocess.check_output(["git", "-C", str(ROOT), "ls-files", "-z"]).decode().split("\0"))
    if args.program == "pump":
        maps = read("source-harness-sha256.json")
        groups = {k: maps[k] for k in ["source", "harness", "runtime", "documentation", "build_helpers"]}
        assert len(groups["source"]) == 36
    else:
        groups = {n: read(n) for n in ["source-sha256.json", "build-helper-sha256.json", "documentation-sha256.json", "harness-source-sha256.json", "runtime-inputs.json"]}
        assert len(groups["source-sha256.json"]) == 22
    count, historical = verify_maps(ROOT, groups, tracked)
    assert len(historical) == 2
    if args.program == "pump":
        verify_pump_body(ROOT, package)
    result = {"verified": True, "program": args.program, "current_tracked_bindings": count,
              "historical_exact_copy_bindings": historical,
              "saved_package_verifier_required_separately": True, "runtime_replayed_by_this_script": False}
    if args.program == "pump":
        result.update(historical_surfpool_identity=maps["surfpool"], local_surfpool_binary_checked=False,
                      complete_serializer_and_25_calls_checked=True)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
