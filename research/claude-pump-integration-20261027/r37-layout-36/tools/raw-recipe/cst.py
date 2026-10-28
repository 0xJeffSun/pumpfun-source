#!/usr/bin/env python3
"""[mg-P-raw] merged-constant (.rodata.cstN) piece order: original vs candidate, per lld shard (xxh3 model).
usage: cst.py BUILD_OUT N  -> per shard: orig sequence, cand sequence (pieces as u32/hex), misplaced pieces."""
import sys, xxhash
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pdatamap
def shard(p): return ((xxhash.xxh3_64_intdigest(p) & 0xffffffff) >> 1) >> 26
def run(build, es):
    o, c, k, secs, allsecs = pdatamap.load(build)
    ms = [s for s in secs if s['file'] == '<internal>' and s['section'] == '.rodata.cst%d' % es][0]
    pairs = pdatamap.anchors(o, c, k)
    ps = sorted((vo, vc) for vo, vc in pairs if ms['addr'] <= vc < ms['addr'] + ms['size'])
    cp = [c.b[ms['addr'] + i:ms['addr'] + i + es] for i in range(0, ms['size'], es)]
    # original merged range: from first anchored piece's shard-start; walk while shard non-decreasing
    olo = min(vo for vo, vc in ps)
    # extend backwards while shards stay non-decreasing
    while shard(o.b[olo - es:olo]) <= shard(o.b[olo:olo + es]) and o.b[olo - es:olo] not in (b'\0' * es,) and olo - es >= o.sec['.rodata']['addr']:
        if shard(o.b[olo - es:olo]) == 0 and olo - es < min(vo for vo, vc in ps) - 4 * es: break
        olo -= es
    op = []; a = olo
    while True:
        p = o.b[a:a + es]
        if op and shard(p) < shard(op[-1]): break
        op.append(p); a += es
    return o, c, cp, op, olo, ps
if __name__ == '__main__':
    es = int(sys.argv[2])
    o, c, cp, op, olo, ps = run(sys.argv[1], es)
    print('orig range %#x..%#x (%d pieces) anchors %d; cand %d pieces' % (olo, olo + len(op) * es, len(op), len(ps), len(cp)))
    fmt = lambda p: str(int.from_bytes(p, 'little')) if es <= 8 else p.hex()[:16]
    for sh in range(32):
        oseq = [fmt(p) for p in op if shard(p) == sh]; cseq = [fmt(p) for p in cp if shard(p) == sh]
        if oseq != cseq: print('shard %2d orig %s\n         cand %s' % (sh, oseq, cseq))
