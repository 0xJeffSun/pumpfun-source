#!/usr/bin/env python3
"""[mg-P-raw] first-use order of merged constants (.rodata.cstN pieces) by function order.
usage: firstuse.py BUILD_OUT N
 - cand: the main object's .rodata.cstN input-section order (from link/linkin/*.cgu.0.rcgu.o) vs the order of first
   reference walking the candidate's main-object functions in DEFAULT-link (= codegen) order (requires BUILD_OUT linked
   with the default script) -> validates the model
 - orig: first reference order walking the original's main-object windows in address order."""
import sys, struct, glob
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap, dem, cst


def obj_section(path, name):
    b = Path(path).read_bytes()
    shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    st = hs[shstrndx]
    for h in hs:
        n = b[st[4] + h[0]:b.index(b'\0', st[4] + h[0])].decode()
        if n == name: return b[h[4]:h[4] + h[5]]
    return None


def refs(e, start, size, lo, hi, es):
    out = []; i = 0
    while i < size:
        if e.b[start + i] == 0x18:
            v = e.lddw(start + i)
            if lo <= v < hi: out.append(e.b[v:v + es])
            i += 16; continue
        i += 8
    return out


if __name__ == '__main__':
    build, es = Path(sys.argv[1]), int(sys.argv[2])
    o, c, cp, op, olo, ps = cst.run(build, es)
    k = pk.Corr(o, c)
    main = [p for p in glob.glob(str(build / 'link/linkin/*-cgu.0.rcgu.o'))][0]
    sec = obj_section(main, '.rodata.cst%d' % es)
    objseq = [sec[i:i + es] for i in range(0, len(sec), es)]
    ms = [s for s in pk.parse_map(pdatamap.mapfile(build)) if s['file'] == '<internal>' and s['section'] == '.rodata.cst%d' % es][0]
    fu = []
    for a in k.cstarts:
        if a >= 0x17bc38 and False: break
        for p in refs(c, a, k.cf[a]['size'], ms['addr'], ms['addr'] + ms['size'], es):
            if p not in fu: fu.append(p)
    fmt = lambda p: str(int.from_bytes(p, 'little')) if es <= 8 else p.hex()[:16]
    print('cand obj section pieces', len(objseq), 'first-use (cand fn order)', len(fu))
    agree = [fmt(p) for p in objseq] == [fmt(p) for p in fu if p in objseq][:len(objseq)]
    print('cand: obj order == first-use order:', agree)
    if not agree:
        print('  obj :', [fmt(p) for p in objseq][:60]); print('  fuse:', [fmt(p) for p in fu][:60])
    ofu = []
    for a in k.ostarts:
        for p in refs(o, a, k.wsize[a], olo, olo + len(op) * es, es):
            if p not in ofu: ofu.append(p)
    print('orig first-use order (%d):' % len(ofu), [fmt(p) for p in ofu])
