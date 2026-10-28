#!/usr/bin/env python3
"""Byte-level re-derivation for the Fees call-conflict resolution.

Usage: python3 rederive.py [original.so] [candidate.so]

Defaults expect the two ELFs beside this file. The ELFs are the retained
repo inputs (identity in evidence/call_edges.json under "elf_identity"):
the original deployed Fees binary and the selected candidate. This script
imports no repo code and reads no inventory file; every value below is
recomputed from ELF bytes.
"""
import hashlib, struct, sys
from collections import Counter

ORIG = sys.argv[1] if len(sys.argv) > 1 else 'original.so'
CAND = sys.argv[2] if len(sys.argv) > 2 else 'candidate.so'

def text_section(path):
    data = open(path, 'rb').read()
    assert data[:4] == b'\x7fELF'
    e_shoff = struct.unpack_from('<Q', data, 0x28)[0]
    e_shentsize, e_shnum, e_shstrndx = struct.unpack_from('<HHH', data, 0x3A)
    def sh(i):
        off = e_shoff + i * e_shentsize
        return struct.unpack_from('<IIQQQQ', data, off)
    strtab_off = sh(e_shstrndx)[4]
    for i in range(e_shnum):
        t = sh(i)
        name, offset, size = t[0], t[4], t[5]
        end = data.index(b'\x00', strtab_off + name)
        if data[strtab_off + name:end] == b'.text':
            return data, offset, size
    raise SystemExit('no .text')

def calls_in(data, lo, hi):
    out = []
    for pc in range(lo, hi - 7, 8):
        if data[pc] == 0x85 and (data[pc + 1] >> 4) == 1:  # pseudo-CALL
            imm = struct.unpack_from('<i', data, pc + 4)[0]
            out.append((pc, pc + 8 + imm * 8))
    return out

od, ot_off, ot_size = text_section(ORIG)
cd, ct_off, ct_size = text_section(CAND)
GROUP = '5064629c0b173ec75a08a105975751990109ead5c78610174e373612d9c53026'

print('original file sha256', hashlib.sha256(od).hexdigest())
print('candidate file sha256', hashlib.sha256(cd).hexdigest())
bodies = {}
for lbl, d, s in (('orig', od, 799392), ('orig', od, 799664),
                  ('cand', cd, 787152), ('cand', cd, 789432)):
    bodies[(lbl, s)] = d[s:s + 272]
    h = hashlib.sha256(bodies[(lbl, s)]).hexdigest()
    print(lbl, s, h, 'GROUP MATCH' if h == GROUP else 'MISMATCH')
print('four bodies byte-identical:', len(set(bodies.values())) == 1)
print('orig 799664 end == orig .text end:', 799664 + 272 == ot_off + ot_size)
print('cand 789432 end == cand .text end:', 789432 + 272 == ct_off + ct_size)

for lbl, d, specs in (('orig', od, [(725664, 400), (726064, 424)]),
                      ('cand', cd, [(710688, 400), (711088, 424)])):
    for start, size in specs:
        edges = [(pc - start, t) for pc, t in calls_in(d, start, start + size)]
        print(lbl, start, 'calls (offset, target):', edges)

for lbl, d, toff, tsize, tgts in (('orig', od, ot_off, ot_size, (799392, 799664)),
                                  ('cand', cd, ct_off, ct_size, (787152, 789432))):
    allc = calls_in(d, toff, toff + tsize)
    for t in tgts:
        print(lbl, 'all call sites landing on', t, [pc for pc, tt in allc if tt == t])

def slot_class(a, b):
    if a == b: return 'equal'
    if a[0] == 0x85 and b[0] == 0x85 and a[1:4] == b[1:4]: return 'call-imm-only'
    if a[0] == 0x18 and b[0] == 0x18: return 'lddw'
    return 'OTHER'
for os_, cs_, size in ((725664, 710688, 400), (726064, 711088, 424)):
    c = Counter(slot_class(od[os_ + i:os_ + i + 8], cd[cs_ + i:cs_ + i + 8])
                for i in range(0, size, 8))
    print(f'slot diff orig {os_} vs cand {cs_}:', dict(c))
