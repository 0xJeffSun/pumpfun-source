#!/usr/bin/env python3
"""Extract Anchor Source(filename,line) code records and panic Location rodata records from an SBF ELF."""
import struct, sys, json, collections
from sbfdis import *

def rodata_ranges(elf):
    out = []
    for name, s in elf.secs.items():
        if name in ('.rodata', '.data.rel.ro', '.data'):
            out.append((name, s[3], s[4], s[5]))  # name, addr, offset, size
    return out

def vaddr_to_off(elf, va):
    for name, s in elf.secs.items():
        addr, off, size = s[3], s[4], s[5]
        if addr <= va < addr + size and s[1] != 8:
            return off + (va - addr)
    return None

def read_str(elf, va, n):
    off = vaddr_to_off(elf, va)
    if off is None: return None
    try: return elf.b[off:off+n].decode()
    except: return None

def source_records(elf, lo=None, hi=None):
    """Find lddw ptr -> stxdw [r10+X]; stdw [r10+X+8] len; stw [r10+X+16] line within straight-line code."""
    b = elf.b; recs = []
    lo = lo or elf.lo; hi = hi or elf.hi
    ins = disasm(elf, lo, hi, mask=False)
    for idx, (at, n, t, i) in enumerate(ins):
        if i[0] != 'lddw': continue
        reg = i[1]; va = i[2]
        # look ahead up to 40 instrs for stxdw [r10+X] reg
        X = None
        for k in range(idx+1, min(idx+40, len(ins))):
            a2, n2, t2, i2 = ins[k]
            if i2[0] == 'stxdw' and i2[2] == reg and i2[1].startswith('[r10'):
                X = int(i2[1][4:-1]); break
            if i2[0] in ('call','exit','ja') or i2[0].startswith('j'): break
        if X is None: continue
        ln = None; line = None
        for k in range(idx+1, min(idx+60, len(ins))):
            a2, n2, t2, i2 = ins[k]
            if i2[0] == 'stdw' and i2[1] == f'[r10{X+8:+d}]': ln = i2[2]
            if i2[0] == 'stw' and i2[1] == f'[r10{X+16:+d}]': line = i2[2]
            if i2[0] in ('call','exit') : break
        if ln is None or line is None: continue
        s = read_str(elf, va, ln)
        if s and s.endswith('.rs'):
            recs.append({'at': at, 'file': s, 'line': line})
    return recs

def location_records(elf):
    """Scan rodata-like sections for 24-byte {ptr,len,line,col} records pointing at .rs strings."""
    recs = []
    for name, s in elf.secs.items():
        if name not in ('.rodata', '.data.rel.ro'): continue
        addr, off, size = s[3], s[4], s[5]
        for p in range(off, off + size - 24 + 1, 8):
            ptr, ln, line, col = struct.unpack_from('<QQII', elf.b, p)
            if 3 < ln < 200 and 0 < line < 100000 and 0 < col < 1000:
                st = read_str(elf, ptr >> 32, ln) if (ptr >> 32) else read_str(elf, ptr, ln)
                if st and st.endswith('.rs'):
                    recs.append({'va': addr + (p - off), 'file': st, 'line': line, 'col': col})
    return recs

if __name__ == '__main__':
    import argparse
    ap = argparse.ArgumentParser(); ap.add_argument('--elf'); ap.add_argument('--out')
    a = ap.parse_args()
    e = Elf(Path(a.elf)) if a.elf else load()
    src = source_records(e); loc = location_records(e)
    json.dump({'source': src, 'location': loc}, open(a.out, 'w'), indent=1)
    byf = collections.defaultdict(list)
    for r in src: byf[r['file']].append(('S', r['line'], hex(r['at'])))
    for r in loc: byf[r['file']].append(('L', f"{r['line']}:{r['col']}", hex(r['va'])))
    for f in sorted(byf):
        if 'pump-amm' in f or not f.startswith('/'):
            print(f, sorted(byf[f], key=lambda x: int(str(x[1]).split(':')[0])))
