#!/usr/bin/env python3
"""oh.py SYMBOLS.so|OBJ.o [lo hi] [ctx] -- masked diff hunks of sell_v2_handler vs orig O0084.
Original side printed as MNEMONIC ONLY (no operands); candidate side printed in full (own code)."""
import sys, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import irx, objsec, sbfdis
p = sys.argv[1]
if p.endswith('.o'):
    secs = objsec.sections(p); key = [k for k in secs if irx.PAT in k and k.startswith('.text')][0]; code = secs[key]
else:
    code = irx.elf_code(p)
lo = int(sys.argv[2]) if len(sys.argv) > 2 else 0
hi = int(sys.argv[3]) if len(sys.argv) > 3 else 1 << 30
ctx = int(sys.argv[4]) if len(sys.argv) > 4 else 2
print('score', irx.score(code))
a = irx.ORIG_LINES; b = irx.masked_lines(code, 0)
oc = irx.O.b[irx.W[1]:irx.W[2]]
apc = [pc for pc, raw in objsec.insns(oc)]
bt = [sbfdis.decode(code, None, pc, pc + len(raw), None, None)[0]['text'] for pc, raw in objsec.insns(code)]
bpc = [pc for pc, raw in objsec.insns(code)]
sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal': continue
    if i1 < len(apc) and not (lo <= apc[i1] < hi): continue
    print(f'@@ O+{apc[i1] if i1 < len(apc) else "end"} C+{bpc[j1] if j1 < len(bpc) else "end"}  orig: ' + ' '.join(a[k].split()[0] for k in range(i1, i2)))
    for k in range(max(0, j1 - ctx), min(len(bt), j2 + ctx)):
        print(f'  {"+" if j1 <= k < j2 else " "} {bpc[k]:6d}  {bt[k]}')
