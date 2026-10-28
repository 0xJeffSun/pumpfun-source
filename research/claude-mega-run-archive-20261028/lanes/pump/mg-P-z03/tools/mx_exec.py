#!/usr/bin/env python3
"""mx_exec.py <out_src_dir> <variants.py>: multiplex copies of migrate::execute (lines of `pub fn execute` .. first line == ' }').
variants.py: VARIANTS = {name: [(old, new), ...]} substitutions applied to the copied fn text (each must match)."""
import sys, shutil, subprocess, runpy
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03')
out = Path(sys.argv[1]); V = runpy.run_path(sys.argv[2])['VARIANTS']
src = Path(sys.argv[3]) if len(sys.argv) > 3 else L / 'src'
if out.exists(): shutil.rmtree(out)
out.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['cp', '-c', '-R', str(src), str(out)], check=True)
mp = out / 'src/migrate.rs'; lines = mp.read_text().split('\n')
st = next(i for i, l in enumerate(lines) if l.startswith('pub fn execute<'))
en = next(i for i in range(st, len(lines)) if lines[i] == '}')
fn = '\n'.join(lines[st:en + 1])
extra = []
for n, subs in V.items():
    t = fn.replace('pub fn execute<', f'pub fn execute_{n}<', 1)
    for o, nw in subs:
        assert o in t, (n, o); t = t.replace(o, nw, 1)
    extra.append(t)
mp.write_text('\n'.join(lines) + '\n' + '\n'.join(extra) + '\n')
lp = out / 'src/lib.rs'; s = lp.read_text()
old = "->Result<()>{migrate::execute(ctx)}"
assert s.count(old) == 1
arms = ''.join(f"{101+i}=>migrate::execute_{n}(ctx)," for i, n in enumerate(V))
s = s.replace(old, "->Result<()>{match ctx.remaining_accounts.len(){" + arms + "_=>migrate::execute(ctx)}}")
lp.write_text(s); print('ok', list(V))
