#!/usr/bin/env python3
"""mx_fn.py <out_src_dir> <variants.py> [src]: generic multiplex.
variants.py: FILE (rel to src/), START (line prefix of fn, e.g. 'pub fn init_pump_amm_boost<'), NAME (fn name),
CALLER_FILE, CALL (exact call text, e.g. 'init_pump_amm_boost(&ctx)?;'), COND (expr matched against 101+i),
VARIANTS = {v: [(old,new),...]}. Copies end at first line == '}' after START; copies appended at file end."""
import sys, shutil, subprocess, runpy
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03')
out = Path(sys.argv[1]); C = runpy.run_path(sys.argv[2]); V = C['VARIANTS']
src = Path(sys.argv[3]) if len(sys.argv) > 3 else L / 'src'
if out.exists(): shutil.rmtree(out)
out.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['cp', '-c', '-R', str(src), str(out)], check=True)
fp = out / 'src' / C['FILE']; lines = fp.read_text().split('\n')
st = next(i for i, l in enumerate(lines) if l.startswith(C['START']))
en = next(i for i in range(st, len(lines)) if lines[i] == '}')
fn = '\n'.join(lines[st:en + 1]); name = C['NAME']
extra = []
for n, subs in V.items():
    def ren(x):
        for sep in ('<', '('):
            if f'fn {name}{sep}' in x: return x.replace(f'fn {name}{sep}', f'fn {name}_{n}{sep}', 1)
        raise SystemExit('fn name not found')
    if isinstance(subs, str):
        t = C.get('PREFIX', '') + ren(subs)
    else:
        t = C.get('PREFIX', '') + ren(fn)
        for o, nw in subs:
            assert o in t, (n, o); t = t.replace(o, nw, 1)
    extra.append(t)
fp.write_text('\n'.join(lines) + '\n' + '\n'.join(extra) + '\n')
cp = out / 'src' / C['CALLER_FILE']; s = cp.read_text(); call = C['CALL']
assert s.count(call) == 1, s.count(call)
base = call.rstrip(';').rstrip('?')
arms = ''.join(f"{101+i}=>{base.replace(name + '(', name + '_' + n + '(', 1)}?," for i, n in enumerate(V))
s = s.replace(call, f"match {C['COND']} {{{arms}_=>{base}?}};")
cp.write_text(s); print('ok', list(V))
