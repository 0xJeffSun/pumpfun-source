#!/usr/bin/env python3
"""Verify current tracked inputs; historical scratch paths use exact published copies.

Run the immutable package verifier separately for saved receipts and signatures.
The historical Darwin Surfpool executable is identified, not installed or executed.
"""
import argparse
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import struct
import subprocess
import sys

from build_source_manifest import source_manifest

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


def verify_branch_pump(root, historical_package, tracked, status):
    """Bind the branch executable to current source; retain old static proof."""
    maps = json.loads((historical_package / "source-harness-sha256.json").read_text())
    groups = {name: maps[name] for name in
              ("harness", "runtime", "documentation", "build_helpers")}
    # The branch README describes new evidence; the historical package keeps
    # its original README hash in its sealed source/harness snapshot.
    groups["documentation"] = {name: digest for name, digest in groups["documentation"].items()
                               if name != "programs/pump/README.md"}
    old_count, historical = verify_maps(root, groups, tracked)
    assert len(historical) == 2
    verify_pump_body(root, historical_package)

    candidate_name = status["branch_candidate_artifact"]
    package = (root / candidate_name).parent
    build = json.loads((package / "build-comparison.json").read_text())
    second = json.loads((package / "second-build-comparison.json").read_text())
    reproducibility = json.loads((package / "build-reproducibility.json").read_text())
    source = source_manifest(root / "programs/pump", root / "programs/pump", root, cwd=root)
    assert source == build["source_sha256"] == second["source_sha256"] == reproducibility["source_sha256"]
    assert status["branch_candidate_source_base_commit"] == reproducibility["source_base_commit"]
    assert build["selected_toolchain"] == second["selected_toolchain"] == "v1.44"
    for name, expected in source.items():
        assert name in tracked and not (root / name).is_symlink()
        assert sha((root / name).read_bytes()) == expected
    candidate = root / candidate_name
    candidate_hash = sha(candidate.read_bytes())
    assert candidate_name in tracked and not candidate.is_symlink()
    assert candidate_hash == build["comparison"]["candidate_sha256"]
    assert candidate_hash == second["comparison"]["candidate_sha256"]
    assert candidate_hash == reproducibility["candidate_sha256"]
    assert not build["comparison"]["full_byte_equality"]
    for report, name in ((build, "build.log.gz"), (second, "second-build.log.gz")):
        path = package / name
        assert str(path.relative_to(root)) in tracked and not path.is_symlink()
        assert sha(gzip.decompress(path.read_bytes())) == report["build_log_sha256"]
    for name in (status["branch_candidate_focused_receipt"],
                 status["branch_candidate_regression_receipt"]):
        assert name in tracked and not (root / name).is_symlink()
    handler = status["rebuilt_branch_source_handler"]
    commands = {
        "claim_token_incentives": ["scripts/pump_claim_token_incentives_8099_verify.py"],
        "admin_update_token_incentives": [
            "scripts/pump_admin_token_incentives_verify.py", "--receipt",
            status["branch_candidate_focused_receipt"], "--candidate", candidate_name,
            "--build-comparison", str((package / "build-comparison.json").relative_to(root)),
            "--expected-baseline", status["branch_candidate_source_base_commit"]],
        "set_mayhem_virtual_params": ["scripts/verify_pump_set_mayhem_params_8099.py"],
    }
    assert handler in commands
    assert all(name in tracked for name in (commands[handler][0],))
    replay = subprocess.run([sys.executable, *commands[handler]], cwd=root,
                            check=True, capture_output=True, text=True)
    return {"verified": True, "program": "pump", "branch_handler": handler,
            "branch_candidate_sha256": candidate_hash,
            "current_source_inputs": len(source),
            "historical_tracked_bindings": old_count,
            "historical_exact_copy_bindings": historical,
            "historical_serializer_and_25_calls_checked": True,
            "current_branch_verifier": json.loads(replay.stdout.strip().splitlines()[-1]),
            "full_original_byte_equality": False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("program", choices=PACKAGES)
    args = parser.parse_args()
    package = ROOT / PACKAGES[args.program]
    read = lambda name: json.loads((package / name).read_text())
    tracked = set(subprocess.check_output(["git", "-C", str(ROOT), "ls-files", "-z"]).decode().split("\0"))
    if args.program == "pump":
        status = json.loads((ROOT / "repro/status.json").read_text())["pump"]
        if status.get("branch_candidate_artifact"):
            print(json.dumps(verify_branch_pump(ROOT, package, tracked, status), indent=2))
            return
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
