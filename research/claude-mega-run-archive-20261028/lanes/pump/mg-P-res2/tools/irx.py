#!/usr/bin/env python3
"""irx.py <module.ll> <fnregex> <orig_start> <tag> <edit.py>: run edit.py's `edit(f)` on the function text (returns new text),
then llc + sacmp against the original window. Prints the sacmp summary."""
import sys, re, subprocess, runpy
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res2'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, fn, orig, tag, ed = sys.argv[1:6]
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en]
f2 = runpy.run_path(ed)['edit'](f)
out = f'{L}/llx/{tag}.ll'
open(out, 'w').write(s[:st] + f2 + s[en:])
r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
if r.returncode: print('LLC FAIL', r.stderr[:900]); sys.exit(1)
o = subprocess.run(['python3', '-B', f'{L}/tools/sacmp.py', f'{L}/llx/{tag}.o', orig, fn], capture_output=True, text=True).stdout.strip()
print(tag, o.splitlines()[-1] if o else 'no output')
