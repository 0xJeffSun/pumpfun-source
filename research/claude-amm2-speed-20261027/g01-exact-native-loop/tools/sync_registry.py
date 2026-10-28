#!/usr/bin/env python3
"""Make a lane cargo home hold every crates.io archive a staged Cargo.lock pins (offline builds).

usage: sync_registry.py --cargo-home <lane cargo-home> --lock <ws/Cargo.lock> [--pool DIR] [--source CARGO_HOME ...]

For each registry package with a checksum, <cargo-home>/registry/cache/index.crates.io-6f17d22bba15001f/<name>-<ver>.crate
must exist. Missing archives are taken from the shared pool (SP/shared/registry), the archive dirs shipped in the lane worktree's
AMM checkpoint packets (repro/pump_amm/*/results/{dependency-proof/archives,dependencies}) or the given source cargo homes (read-only); every copied archive must hash to the Cargo.lock checksum (cargo's own archive
authentication) or it is refused. A newly found archive is also added to the shared pool. Exit 1 if any stay missing.
"""
import argparse, hashlib, os, re, shutil, subprocess, sys
from pathlib import Path
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad')
IDX = 'index.crates.io-6f17d22bba15001f'
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def packages(lock):
    for blk in Path(lock).read_text().split('[[package]]')[1:]:
        f = dict(re.findall(r'^(name|version|source|checksum) = "([^"]*)"', blk, re.M))
        if f.get('source', '').startswith('registry+https://github.com/rust-lang/crates.io-index') and 'checksum' in f:
            yield f['name'], f['version'], f['checksum']
def clone(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_name(dst.name + '.tmp%d' % os.getpid())
    if subprocess.run(['cp', '-c', str(src), str(tmp)], capture_output=True).returncode != 0:
        shutil.copyfile(src, tmp)
    os.replace(tmp, dst)
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--cargo-home', type=Path, required=True); ap.add_argument('--lock', type=Path, required=True)
    ap.add_argument('--pool', type=Path, default=SP/'shared/registry'); ap.add_argument('--source', type=Path, action='append', default=[])
    a = ap.parse_args()
    cache = a.cargo_home/'registry/cache'/IDX
    # archive dirs shipped (checksummed) inside AMM checkpoint packets of the lane worktree (<lane>/wt), then source cargo homes
    wt = a.cargo_home.resolve().parent/'wt'
    packet = sorted(wt.glob('repro/pump_amm/*/results/dependency-proof/archives')) + sorted(wt.glob('repro/pump_amm/*/results/dependencies'))
    srcs = [a.pool] + packet + [s/'registry/cache'/IDX for s in a.source]
    copied, missing = [], []
    for name, ver, digest in packages(a.lock):
        fn = f'{name}-{ver}.crate'; dst = cache/fn
        if dst.exists(): continue
        for s in srcs:
            cand = s/fn
            if cand.exists() and sha(cand) == digest:
                clone(cand, dst); copied.append(fn)
                if s != a.pool and not (a.pool/fn).exists():
                    a.pool.mkdir(parents=True, exist_ok=True); clone(cand, a.pool/fn)
                break
        else:
            missing.append(fn)
    print(f'sync_registry: {len(copied)} archive(s) added {copied}' + (f'; MISSING {missing}' if missing else ''), file=sys.stderr)
    sys.exit(1 if missing else 0)
if __name__ == '__main__':
    main()
