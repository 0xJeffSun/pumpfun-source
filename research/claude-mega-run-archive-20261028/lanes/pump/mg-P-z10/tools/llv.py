#!/usr/bin/env python3
"""llv.py <module.ll> <fnregex> <orig_start> <tag> [old=>new ...] [--md 'line'] [--show]
Apply text edits inside the matched function, llc it, compare with sacmp. Branch weight helpers: use !prof !W1..!W9 via --md."""
import sys, re, subprocess
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
a = sys.argv[1:]; mod, fn, orig, tag = a[:4]; rest = a[4:]
edits = []; md = []; show = False; i = 0
while i < len(rest):
    if rest[i] == '--md': md.append(rest[i+1]); i += 2; continue
    if rest[i] == '--show': show = True; i += 1; continue
    edits.append(rest[i]); i += 1
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en]
for e in edits:
    old, new = e.split('=>')
    if old not in f: print('EDIT NOT FOUND:', old[:80]); sys.exit(1)
    f = f.replace(old, new, 1)
out = f'{L}/llx/{tag}.ll'
open(out, 'w').write(s[:st] + f + s[en:] + '\n' + '\n'.join(md) + '\n')
r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
if r.returncode: print('LLC FAIL', r.stderr[:300]); sys.exit(1)
o = subprocess.run(['python3', '-B', f'{L}/tools/sacmp.py', f'{L}/llx/{tag}.o', orig, fn], capture_output=True, text=True).stdout.strip()
print(tag, o.splitlines()[-1] if o else 'no output')
if show: print(o)
