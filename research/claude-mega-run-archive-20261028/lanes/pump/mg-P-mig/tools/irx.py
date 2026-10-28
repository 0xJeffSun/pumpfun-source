#!/usr/bin/env python3
"""irx.py <module.ll> <fn-substring> <win_hex> <edit.py|-> [tag]: apply edit(body)->body (python file defining edit) to one fn,
llc the module, compare that fn with the original window (sacmp). '-' = no edit."""
import sys, re, subprocess, runpy, os
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-mig'
mod, fn, win, ed = sys.argv[1:5]; tag = sys.argv[5] if len(sys.argv) > 5 else 'x'
t = open(mod).read()
m = [mm.start() for mm in re.finditer(r'^define [^\n]*' + re.escape(fn), t, re.M)]
assert len(m) == 1, len(m)
s = m[0]; e = t.index('\n}\n', s) + 3
if ed != '-':
    body = t[s:e]; nb = runpy.run_path(ed)['edit'](body); assert nb != body, 'no change'; t = t[:s] + nb + t[e:]
out = f'{L}/llx/{tag}.ll'; open(out, 'w').write(t)
r = subprocess.run([os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc'), '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
if r.returncode: print(r.stderr[-2000:]); sys.exit(1)
print(subprocess.run(['python3', '-B', f'{L}/tools/sacmp.py', f'{L}/llx/{tag}.o', win, fn], capture_output=True, text=True).stdout.strip()[-200:])
