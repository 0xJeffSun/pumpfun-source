#!/usr/bin/env python3
"""Recheck the clean-rebuild packet against its archived artifacts and, optionally, by rebuilding.

Default (offline) mode needs no toolchain. For each recipe it decompresses the
archived ``builds/<recipe>/symbols.so.gz`` and ``candidate.so.gz``, asserts their
SHA-256 against the values recorded below, and re-runs the 441-window inventory
tool on the archived symbol artifact to assert the recorded raw / normalized /
unmatched counts and matched text bytes. The original binary is read only by
the inventory step, after the archived artifacts have been verified.

``--rebuild`` additionally rebuilds each recipe from the pinned source inputs
into a fresh directory (requires the installed v1.54 tools and v1.52 strip tool
under ~/.cache/solana and an offline crate cache) and asserts that the fresh
artifacts equal the archived ones.

Exit status 0 means every recorded value reproduced on this host. Passing does
not authenticate the local tool installation or establish whole-ELF identity.
"""
import argparse
import gzip
import hashlib
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
BUILD = P / "build_and_measure.sh"
INVENTORY_TOOL = ROOT / "research/mayhem-window-inventory-tool-20261028/window_inventory.py"

EXPECTED = {
    "default": {
        "remap": "",
        "candidate_sha256": "6fa1945d4041587226c5091258b61ad7e1d86590024c962228820d63d1485944",
        "symbols_sha256": "d6ea5caa34d876a29f790ef70690daeb7a5b41d7176c36412743b70d27b05440",
        "counts": {"raw-equal": 83, "normalized-only": 327, "unmatched": 31},
        "matched_text_bytes": 557664,
    },
    "historical-path-remap": {
        "remap": "--remap-path-prefix=src/=programs/mayhem-program/src/",
        "candidate_sha256": "3c33835363257b8012078cb04f9495f30c5aaeee447184a0d092de0c24b77f17",
        "symbols_sha256": "1e12f53043efe10370cc60f470e1d90e3aa496fcba5f8b7118dfb61842d68458",
        "counts": {"raw-equal": 83, "normalized-only": 347, "unmatched": 11},
        "matched_text_bytes": 598712,
    },
}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def load_inventory_tool():
    spec = importlib.util.spec_from_file_location("mayhem_window_inventory", INVENTORY_TOOL)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def check_archived(name, spec, tool, reader):
    archive = P / "builds" / name
    symbols = gzip.decompress((archive / "symbols.so.gz").read_bytes())
    candidate = gzip.decompress((archive / "candidate.so.gz").read_bytes())
    got = {"symbols_sha256": sha(symbols), "candidate_sha256": sha(candidate)}
    failures = [k for k in got if got[k] != spec[k]]
    if not failures:
        with tempfile.TemporaryDirectory(prefix="mayhem-recheck-") as directory:
            path = Path(directory) / "symbols.so"
            path.write_bytes(symbols)
            result = tool.inventory(path, reader)
        got["counts"] = result["counts"]
        got["matched_text_bytes"] = result["matched_text_bytes"]
        failures += [k for k in ("counts", "matched_text_bytes") if got[k] != spec[k]]
        recorded = json.loads(gzip.decompress((archive / "inventory.json.gz").read_bytes()))
        if recorded["counts"] != result["counts"] or recorded["candidate_sha256"] != result["candidate_sha256"]:
            failures.append("archived inventory.json.gz disagrees with recomputed inventory")
    return got, failures


def rebuild(name, spec, workdir):
    out = Path(workdir) / name
    env = dict(os.environ, REMAP_FLAGS=spec["remap"])
    subprocess.run([str(BUILD), str(out)], env=env, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    got = {"candidate_sha256": sha((out / "candidate.so").read_bytes()),
           "symbols_sha256": sha((out / "symbols.so").read_bytes())}
    return got, [k for k in got if got[k] != spec[k]]


def report(stage, name, got, failures):
    verdict = "OK" if not failures else "FAIL"
    counts = got.get("counts")
    detail = (f"raw {counts['raw-equal']} / normalized {counts['normalized-only']} / unmatched {counts['unmatched']}  "
              f"matched {got['matched_text_bytes']}") if counts else ""
    print(f"[{verdict}] {stage} {name}: candidate {got['candidate_sha256'][:16]}…  {detail}")
    for item in failures:
        expected = EXPECTED[name].get(item, "")
        print(f"       {item}: expected {expected} got {got.get(item, '?')}" if expected else f"       {item}", file=sys.stderr)
    return not failures


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", choices=sorted(EXPECTED), help="check a single recipe")
    ap.add_argument("--rebuild", action="store_true", help="also rebuild each recipe and compare to the archive")
    ap.add_argument("--keep", type=Path, help="with --rebuild, keep build outputs under this new directory")
    args = ap.parse_args()
    names = [args.only] if args.only else sorted(EXPECTED)
    tool = load_inventory_tool()
    reader = tool.load_reader()
    ok = True
    for name in names:
        ok &= report("archived", name, *check_archived(name, EXPECTED[name], tool, reader))
    if args.rebuild:
        with tempfile.TemporaryDirectory() as tmp:
            workdir = args.keep or Path(tmp)
            if args.keep:
                args.keep.mkdir(parents=True, exist_ok=False)
            for name in names:
                ok &= report("rebuilt ", name, *rebuild(name, EXPECTED[name], workdir))
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
