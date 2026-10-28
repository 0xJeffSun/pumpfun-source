#!/usr/bin/env python3
"""pd.py SYMBOLS.so|OBJ.o -- positional normalized diff of sell_v2_handler vs orig O0084, numeric only.
Groups differing insns into runs (gap<=2); per run: orig offset, #insns, field-diff classes (o=opcode r=regs f=off16 i=imm)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import irx, objsec
p = sys.argv[1]
if p.endswith('.o'):
    secs = objsec.sections(p); key = [k for k in secs if irx.PAT in k and k.startswith('.text')][0]; code = secs[key]
else:
    code = irx.elf_code(p)
A = irx.ORIG; Bn = objsec.norm(code)
apc = [pc for pc, raw in objsec.insns(irx.O.b[irx.W[1]:irx.W[2]])]
diffs = []
for k, (a, b) in enumerate(zip(A, Bn)):
    if a != b:
        c = ''
        if a[0] != b[0]: c += 'o'
        if a[1] != b[1]: c += 'r'
        if a[2:4] != b[2:4]: c += 'f'
        if a[4:8] != b[4:8]: c += 'i'
        diffs.append((k, c))
print('len', len(code), 'orig', sum(len(x) for x in A), 'posdiff', len(diffs) + abs(len(A) - len(Bn)))
runs = []
for k, c in diffs:
    if runs and k - runs[-1][1] <= 3: runs[-1][1] = k; runs[-1][2].append(c)
    else: runs.append([k, k, [c]])
for s, e, cs in runs:
    from collections import Counter
    print(f'  O+{apc[s]:6d}..{apc[e]:6d} n={len(cs):3d} ' + ' '.join(f'{k}:{v}' for k, v in sorted(Counter(cs).items())))
