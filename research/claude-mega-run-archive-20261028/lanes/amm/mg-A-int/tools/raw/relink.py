#!/usr/bin/env python3
"""relink.py LINKDIR LD OUT.so [--strip] : native link-only replay of a lbuild-raw.sh Linux link.
LINKDIR = OUT/link of lbuild-raw.sh (args.txt with container paths, in/, rlib/). LD = linker script
(rustc's default is LINKDIR/in/default.ld). Writes OUT.so (unstripped), OUT.map, and with --strip OUT.stripped.so.
Uses the native v1.44 rust-lld (same lld build as the Linux SDK; control replay reproduces the container link)."""
import subprocess, sys
from pathlib import Path
PT = Path.home() / '.cache/solana/v1.44/platform-tools'
LLD = PT / 'rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
TGM = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-workspace-current-20261027/target'

def relink(d, ld, out, strip=False):
    d = Path(d).resolve(); out = Path(out).resolve(); ld = Path(ld).resolve()
    args = (d / 'args.txt').read_text().splitlines(); new = []; i = 0
    while i < len(args):
        x = args[i]
        if x in ('--script', '-T'): new += [x, str(ld)]; i += 2; continue
        if x.startswith('--script='): new.append('--script=' + str(ld)); i += 1; continue
        if x == '-o': new += ['-o', str(out)]; i += 2; continue
        x = x.replace('/lwout/', str(d) + '/')
        if x.endswith('.rlib') and x.startswith(TGM): x = str(d / 'rlib' / Path(x).name)
        new.append(x); i += 1
    new.append('-Map=' + str(out.with_suffix('.map')))
    r = subprocess.run([str(LLD)] + new, capture_output=True, text=True)
    if r.returncode:
        sys.stderr.write(r.stdout[-3000:] + r.stderr[-3000:]); return r.returncode
    if strip:
        r = subprocess.run([str(PT / 'llvm/bin/llvm-objcopy'), '--strip-all', str(out), str(out.with_suffix('.stripped.so'))])
    return r.returncode

if __name__ == '__main__':
    sys.exit(relink(sys.argv[1], sys.argv[2], sys.argv[3], '--strip' in sys.argv))
