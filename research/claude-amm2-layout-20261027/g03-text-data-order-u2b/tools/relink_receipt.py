#!/usr/bin/env python3
"""Write a native re-link receipt for one layout (iteration evidence, not the build recipe).

Re-links the captured Linux link kit with the macOS platform-tools v1.44
rust-lld and a given script, strips with the v1.52 llvm-objcopy, and records:
every input's SHA-256 (packet-held transient inputs, dependency rlibs by their
frontier target-cache path), the effective argument list with container paths,
the linker binary hash, and the output hashes. Dependency rlibs are not copied
into the packet; they are the frontier's recorded dependency artifacts
(`results/build/build-comparison.json` → `dependency_cache_after`).
"""
import argparse, hashlib, json, re, sys, tempfile
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import relink  # noqa: E402

sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
SDK = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-linux-v144-20261027/sdk'


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--kit', type=Path, required=True)
    ap.add_argument('--script', type=Path, required=True)
    ap.add_argument('--target-cache', type=Path, required=True)
    ap.add_argument('--label', required=True)
    ap.add_argument('--output', type=Path, required=True)
    a = ap.parse_args()
    args = (a.kit / 'effective-args.txt').read_text().split('\n')[:-1]
    rlibs = {}
    for x in args:
        if x.endswith('.rlib'):
            host = Path(str(a.target_cache) + x[len(relink.TARGET_C):]) if x.startswith(relink.TARGET_C) else Path(x)
            rlibs[x] = sha(host)
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / 'relinked.so'
        res = relink.relink(a.kit, a.script.resolve(), out, a.target_cache.resolve())
    rec = {'scope': __doc__, 'label': a.label, 'linker': str(relink.DEFAULT_LLD), 'linker_sha256': sha(relink.DEFAULT_LLD),
           'strip_tool_sha256': sha(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'),
           'script_sha256': sha(a.script), 'effective_args_sha256': sha(a.kit / 'effective-args.txt'),
           'transient_inputs': {p.name: sha(p) for p in sorted((a.kit / 'inputs').iterdir())},
           'dependency_rlibs': rlibs, 'symbols_sha256': res['unstripped_sha256'], 'candidate_sha256': res['candidate_sha256']}
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_text(json.dumps(rec, indent=1) + '\n')
    print(json.dumps({k: rec[k] for k in ('label', 'symbols_sha256', 'candidate_sha256')}))


if __name__ == '__main__':
    main()
