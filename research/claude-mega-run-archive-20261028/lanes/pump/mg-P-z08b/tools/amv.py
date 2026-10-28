#!/usr/bin/env python3
"""amv.py <module.ll> <fnpat> <orig_start> <spec> [--frame]: reorder entry-block allocas, llc, compare.
spec: comma list of alloca names (without %) giving the NEW order of the listed allocas, placed at the position of the first
listed one unless prefixed by 'TOP:' (move to the top) or 'END:' (move to the end of the alloca run)."""
import sys, re, subprocess, os
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b'
LLC = os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc')
mod, fn, orig, spec = sys.argv[1:5]
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + re.escape(fn) + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
lines = s[st:en].split('\n')
idx = [k for k, l in enumerate(lines) if re.match(r'^  %\S+ = alloca ', l)]
A = [lines[k] for k in idx]; names = [re.match(r'^  %(\S+) = ', l).group(1) for l in A]
mode = 'pos'
if spec.startswith('TOP:'): mode, spec = 'top', spec[4:]
elif spec.startswith('END:'): mode, spec = 'end', spec[4:]
mv = spec.split(',')
for n in mv: assert n in names, n
rest = [n for n in names if n not in mv]
if mode == 'top': new = mv + rest
elif mode == 'end': new = rest + mv
else:
    first = min(names.index(n) for n in mv); before = [n for n in names[:first] if n not in mv]
    new = before + mv + [n for n in names[first:] if n not in mv]
byname = dict(zip(names, A))
nl = lines[:idx[0]] + [byname[n] for n in new] + [l for k, l in enumerate(lines[idx[0]:], idx[0]) if k not in idx]
out = f'{L}/llx/amv.ll'; open(out, 'w').write(s[:st] + '\n'.join(nl) + s[en:])
r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/amv.o'], capture_output=True, text=True)
if r.returncode: print('LLC FAIL', r.stderr[:300]); sys.exit(1)
o = subprocess.run(['python3', '-B', f'{L}/../plainbody/tools/sacmp.py', f'{L}/llx/amv.o', orig, fn], capture_output=True, text=True).stdout.strip()
print(spec[:80], '->', o.split(':', 1)[-1].strip())
if '--frame' in sys.argv:
    print(subprocess.run(['python3', '-B', f'{L}/tools/frame.py', out, fn], capture_output=True, text=True).stdout[:1500])
