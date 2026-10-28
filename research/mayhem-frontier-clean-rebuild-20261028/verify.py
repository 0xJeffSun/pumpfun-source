#!/usr/bin/env python3
"""Recheck the clean-rebuild packet: rebuild from pinned inputs and assert the recorded results.

Runs both recipes (default linker without and with the historical crate-path
remap), rebuilding each into a fresh directory, and asserts that the stripped
artifact hashes and the 441-window inventories equal the values recorded in
README.md. Exit status 0 means every recorded claim reproduced on this host.

Requires the pinned toolchains under ~/.cache/solana (see README) and an offline
crate cache populated once with `cargo fetch --locked` in a materialized source
tree. Nothing here reads the original binary before compilation finishes; the
inventory step compares only after the build and strip have completed.
"""
import argparse
import hashlib
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
BUILD = P / "build_and_measure.sh"

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


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def run_recipe(name, spec, workdir):
    out = Path(workdir) / name
    env = dict(os.environ, REMAP_FLAGS=spec["remap"])
    subprocess.run([str(BUILD), str(out)], env=env, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    inventory = json.loads((out / "inventory.json").read_text())
    got = {
        "candidate_sha256": sha(out / "candidate.so"),
        "symbols_sha256": sha(out / "symbols.so"),
        "counts": inventory["counts"],
        "matched_text_bytes": inventory["matched_text_bytes"],
    }
    failures = [k for k in got if got[k] != spec[k]]
    return got, failures


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--only", choices=sorted(EXPECTED), help="run a single recipe")
    ap.add_argument("--keep", type=Path, help="keep build outputs under this new directory")
    args = ap.parse_args()
    names = [args.only] if args.only else sorted(EXPECTED)
    status = 0
    with tempfile.TemporaryDirectory() as tmp:
        workdir = args.keep if args.keep else Path(tmp)
        if args.keep:
            args.keep.mkdir(parents=True, exist_ok=False)
        for name in names:
            got, failures = run_recipe(name, EXPECTED[name], workdir)
            verdict = "OK" if not failures else "FAIL"
            print(f"[{verdict}] {name}: candidate {got['candidate_sha256'][:16]}…  "
                  f"raw {got['counts']['raw-equal']} / normalized {got['counts']['normalized-only']} / "
                  f"unmatched {got['counts']['unmatched']}  matched {got['matched_text_bytes']}")
            for k in failures:
                print(f"       {k}: expected {EXPECTED[name][k]} got {got[k]}", file=sys.stderr)
                status = 1
    return status


if __name__ == "__main__":
    raise SystemExit(main())
