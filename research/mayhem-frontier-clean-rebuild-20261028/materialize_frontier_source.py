#!/usr/bin/env python3
"""Materialize the 432-window Mayhem research source from pinned, committed inputs.

Composes the 67-file source exactly as the current quote-pair packet records it:
the initializer snapshot tarball, plus the layered overrides from the Sell-quote,
ownership-composition and quote-pair packets. Every output file is verified
against ``source-inputs.json`` of the quote-pair packet, so the result is the
same byte-for-byte source set that produced the published 432-window artifact.

This only materializes source. It does not build, and it does not change
``programs/mayhem``.
"""
import argparse
import hashlib
import json
import shutil
import tarfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
QUOTE_PAIR = ROOT / "research/mayhem-quotes-current-recovery-20261027"
SNAPSHOT = ROOT / "research/mayhem-initializer-current-recovery-20261027/source.tar.gz"
SNAPSHOT_SHA256 = "0e0254f2ddc269e2ae31de109aa2bc746c4a476b85415982f621e77adf4863af"
# Layered overrides, applied in order; later layers win.
OVERRIDES = [
    (ROOT / "research/mayhem-sell-current-recovery-20261027/overrides/src/instructions/sell_pump_swap.rs",
     "src/instructions/sell_pump_swap.rs"),
    (ROOT / "research/mayhem-current-ownership-composition-20261027/sources/qualified.rs",
     "src/instructions/pump_interface.rs"),
    (QUOTE_PAIR / "overrides/src/instructions/buy_pump_swap.rs", "src/instructions/buy_pump_swap.rs"),
    (QUOTE_PAIR / "overrides/src/state.rs", "src/state.rs"),
]


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def materialize(dest):
    dest = Path(dest)
    if dest.exists():
        raise SystemExit(f"refusing to overwrite existing {dest}")
    if sha(SNAPSHOT) != SNAPSHOT_SHA256:
        raise SystemExit("initializer snapshot tarball hash differs from the pinned value")
    dest.mkdir(parents=True)
    with tarfile.open(SNAPSHOT, "r:gz") as tar:
        for member in tar.getmembers():
            if not member.isfile() or ".." in Path(member.name).parts or Path(member.name).is_absolute():
                raise SystemExit(f"unsafe tar member: {member.name}")
        tar.extractall(dest, filter="data")
    for src, rel in OVERRIDES:
        shutil.copyfile(src, dest / rel)
    want = json.loads((QUOTE_PAIR / "source-inputs.json").read_text())
    bad = [rel for rel, h in want.items() if not (dest / rel).is_file() or sha(dest / rel) != h]
    extra = sorted(str(p.relative_to(dest)) for p in dest.rglob("*") if p.is_file() and str(p.relative_to(dest)) not in want)
    if bad or extra:
        raise SystemExit(f"materialized source does not match pinned inputs; mismatched={bad} extra={extra}")
    return len(want)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("dest", type=Path, help="new directory to receive the composed source tree")
    args = ap.parse_args()
    count = materialize(args.dest)
    print(f"materialized and verified {count}/{count} pinned source files into {args.dest}")


if __name__ == "__main__":
    main()
