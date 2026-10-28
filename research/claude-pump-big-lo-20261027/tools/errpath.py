#!/usr/bin/env python3
"""Classify emit_cpi!-style error paths: after `call From<ProgramError>::from(r1=&res, r2=&err)` the block loads
the two result words and the lamports/data Rc pointers of the [AccountInfo;1] array. Order = sequence of roles.
  errpath.py <objdump.dis> <from_fn_addr> [--syms unstripped.so]
"""
import re, sys
dis, target = sys.argv[1], int(sys.argv[2], 16)
lines = open(dis).read().splitlines()
ins = []
for l in lines:
    m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', l)
    if m:
        ins.append((int(m.group(1), 16), re.sub(r'\s+<.*>$', '', m.group(2).strip())))
res = []
for k, (a, t) in enumerate(ins):
    m = re.match(r'call (-?0x[0-9a-f]+)$', t)
    if not m:
        continue
    imm = int(m.group(1), 16)
    if a + 8 + imm * 8 != target:
        continue
    # find r1 setup: previous 'add64 r1, -X'
    X = None
    for q in range(k - 1, max(0, k - 6), -1):
        mm = re.match(r'add64 r1, -(0x[0-9a-f]+)', ins[q][1])
        if mm:
            X = int(mm.group(1), 16); break
    seq = []
    for q in range(k + 1, min(len(ins), k + 6)):
        mm = re.match(r'ldxdw (r\d), \[r10 - (0x[0-9a-f]+)\]', ins[q][1])
        if not mm:
            break
        off = int(mm.group(2), 16)
        role = 'res0' if off == X else 'res1' if X and off == X - 8 else f'o{off:#x}'
        seq.append(role)
    if len([s for s in seq if s.startswith('res')]) == 2 and len(seq) >= 4:
        others = [s for s in seq if s.startswith('o')]
        first = seq[0]
        kind = 'result-first' if first.startswith('res') else 'other-first'
        res.append((a, kind, seq))
for a, kind, seq in res:
    print(f'{a:#x} {kind:13s} {seq}')
