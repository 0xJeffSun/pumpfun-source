#!/usr/bin/env python3
"""Original <-> candidate data-object correspondence for .rodata / .data.rel.ro (lane mg-M-raw).

usage: python3 -B datamap.py BUILD_DIR [--json OUT] [--quiet]
BUILD_DIR: symbols.so + link.map of a candidate. Every candidate input section of .rodata/.data.rel.ro
(from the link map) is bound to an original offset by
  1. anchors: lddw pairs of the normalized-matched windows (and pointer slots of already bound
     .data.rel.ro objects, iterated), verified by content (rodata: bytes; data.rel.ro: non-pointer bytes
     equal, pointer slots at the same offsets with translated targets);
  2. unique content search in the original section (rodata objects >= 4 bytes).
Reports coverage, gaps (original bytes no candidate object explains), unbound candidate objects, and the
order agreement (objects whose relative order differs from the original).
"""
from pathlib import Path
from collections import defaultdict, Counter
import bisect, json, struct, sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import elfcmp, gen_ordered

DATA = ('.rodata', '.data.rel.ro')


def ptr(b, at):
    """SBF relocated data pointer: u32 0 then the u32 address (rbpf R_BPF_64_RELATIVE data layout)"""
    lo, hi = struct.unpack_from('<II', b, at)
    return hi if lo == 0 else (hi << 32 | lo)


def load(build):
    build = Path(build)
    o = elfcmp.m.Elf(elfcmp.ORIG.resolve()); c = elfcmp.m.Elf((build / 'symbols.so').resolve())
    k = elfcmp.Corr(o, c)
    secs = [s for s in gen_ordered.parse_map(build / 'link.map') if s['out'] in DATA and s['size'] > 0]
    return o, c, k, secs


def anchors(o, c, k):
    """(orig value, cand value) of every relocated lddw in matched windows whose orig target is data."""
    pairs = set()
    for oa, ca in k.o2c.items():
        size = k.ow[oa]['end'] - oa; i = 0
        while i < size:
            po, pc = oa + i, ca + i
            if o.b[po] == 0x18:
                r = o.rel.get(po)
                if r and r['type'] == 8:
                    vo = struct.unpack_from('<I', o.b, po + 4)[0] | struct.unpack_from('<I', o.b, po + 12)[0] << 32
                    vc = struct.unpack_from('<I', c.b, pc + 4)[0] | struct.unpack_from('<I', c.b, pc + 12)[0] << 32
                    if elfcmp.secname(o, vo) in DATA: pairs.add((vo, vc))
                i += 16; continue
            i += 8
    return pairs


class Binder:
    def __init__(self, o, c, k, secs):
        self.o, self.c, self.k, self.secs = o, c, k, secs
        self.starts = [s['addr'] for s in secs]
        self.bound = {}  # cand sec addr -> orig addr
        self.how = {}
        self.osec = {n: o.sec[n] for n in DATA}; self.csec = {n: c.sec[n] for n in DATA}

    def sec_at(self, ca):
        i = bisect.bisect_right(self.starts, ca) - 1
        if i < 0: return None
        s = self.secs[i]
        return s if ca < s['addr'] + s['size'] else None

    def translate(self, vc):
        """candidate pointer -> original pointer (text via windows, data via bound objects)"""
        if self.c.lo <= vc < self.c.hi:
            return self.k.c2o_addr(vc)
        s = self.sec_at(vc)
        if s and s['addr'] in self.bound: return self.bound[s['addr']] + (vc - s['addr'])
        return None

    def check(self, s, oa):
        """content check of candidate section s placed at original address oa"""
        o, c = self.o, self.c
        n = s['size']; ob = o.b[oa:oa + n]; cb = c.b[s['addr']:s['addr'] + n]
        if len(ob) < n: return False
        if s['out'] == '.rodata':
            return ob == cb
        for j in range(0, n, 8):
            ro = o.rel.get(oa + j); rc = c.rel.get(s['addr'] + j)
            if bool(ro) != bool(rc): return False
            if ro:
                vo = ptr(o.b, oa + j); vc = ptr(c.b, s['addr'] + j)
                t = self.translate(vc)
                if t is not None and t != vo: return False
                if t is None and elfcmp.secname(o, vo) != elfcmp.secname(c, vc): return False
            elif ob[j:j + 8] != cb[j:j + 8]:
                return False
        return True

    def bind(self, s, oa, how):
        if s['addr'] in self.bound: return self.bound[s['addr']] == oa
        if not self.check(s, oa): return False
        self.bound[s['addr']] = oa; self.how[s['addr']] = how; return True

    def run(self, pairs):
        bad = Counter()
        for it in range(6):
            new = 0
            for vo, vc in sorted(pairs):
                s = self.sec_at(vc)
                if s is None or s['file'] == '<internal>': continue
                if s['addr'] in self.bound: continue
                if self.bind(s, vo - (vc - s['addr']), 'anchor%d' % it): new += 1
                else: bad['anchor_mismatch'] += 1
            # pointer slots of bound data.rel.ro objects -> more pairs
            for ca, oa in list(self.bound.items()):
                s = self.sec_at(ca)
                if s['out'] != '.data.rel.ro': continue
                for j in range(0, s['size'], 8):
                    if self.o.rel.get(oa + j) and self.c.rel.get(ca + j):
                        vo = ptr(self.o.b, oa + j); vc = ptr(self.c.b, ca + j)
                        if elfcmp.secname(self.o, vo) in DATA: pairs.add((vo, vc))
            if not new: break
        # merged synthetic sections: anchored pieces -> orig range (sort key = first anchored orig address)
        self.merged = {}
        for s in self.secs:
            if s['file'] != '<internal>': continue
            ps = sorted((vo, vc) for vo, vc in pairs if s['addr'] <= vc < s['addr'] + s['size'])
            self.merged[s['addr']] = ps
        taken = []  # orig ranges already explained (bound objects + merged pieces' span)
        for ca, oa in self.bound.items(): taken.append((oa, oa + self.sec_at(ca)['size']))
        for ca, ps in self.merged.items():
            if ps: taken.append((ps[0][0], ps[-1][0] + 1))
        free = lambda a, n: not any(x < a + n and a < y for x, y in taken)
        # content search for remaining rodata objects (unique among hits outside explained ranges)
        base = self.osec['.rodata']['address']
        ob = self.o.b[self.osec['.rodata']['offset']:self.osec['.rodata']['offset'] + self.osec['.rodata']['size']]
        for s in self.secs:
            if s['addr'] in self.bound or s['file'] == '<internal>' or s['out'] != '.rodata' or s['size'] < 4: continue
            cb = self.c.b[s['addr']:s['addr'] + s['size']]
            hits = []; i = ob.find(cb)
            while i >= 0 and len(hits) < 8:
                hits.append(i); i = ob.find(cb, i + 1)
            if len(hits) > 1: hits = [h for h in hits if free(base + h, s['size'])]
            if len(hits) == 1 and self.bind(s, base + hits[0], 'content'): taken.append((base + hits[0], base + hits[0] + s['size']))
            elif hits: bad['content_ambiguous'] += 1
        # content search for remaining .data.rel.ro objects (relocation-aware check at every free 8-aligned slot)
        d = self.osec['.data.rel.ro']
        for s in self.secs:
            if s['addr'] in self.bound or s['file'] == '<internal>' or s['out'] != '.data.rel.ro': continue
            hits = [a for a in range(d['address'], d['address'] + d['size'] - s['size'] + 1, 8)
                    if free(a, s['size']) and self.check(s, a)]
            if len(hits) == 1 and self.bind(s, hits[0], 'content'): taken.append((hits[0], hits[0] + s['size']))
            elif hits: bad['content_ambiguous_drr'] += 1
        return bad


def analyze(build):
    o, c, k, secs = load(build)
    b = Binder(o, c, k, secs)
    pairs = anchors(o, c, k)
    bad = b.run(set(pairs))
    rep = {}
    for out in DATA:
        ss = [s for s in secs if s['out'] == out]
        osz = b.osec[out]['size']; obase = b.osec[out]['address']; cbase = b.csec[out]['address']
        cov = bytearray(osz)
        rows = []
        for s in ss:
            oa = b.bound.get(s['addr'])
            mk = b.merged.get(s['addr'])
            rows.append(dict(c_off=s['addr'] - cbase, size=s['size'], o_off=None if oa is None else oa - obase,
                             file=s['pattern'], section=s['section'], how=b.how.get(s['addr']),
                             merged_key=(mk[0][0] - obase) if mk else None, merged_anchors=len(mk) if mk is not None else None))
            if oa is not None:
                for j in range(oa - obase, oa - obase + s['size']): cov[j] = 1
        gaps, j = [], 0
        while j < osz:
            if not cov[j]:
                e = j
                while e < osz and not cov[e]: e += 1
                if any(o.b[b.osec[out]['offset'] + j:b.osec[out]['offset'] + e]): gaps.append((j, e - j))
                j = e
            else: j += 1
        bound = [r for r in rows if r['o_off'] is not None]
        seq = [r['o_off'] for r in bound]
        keep = elfcmp.lis(seq)
        rep[out] = dict(cand_sections=len(ss), bound=len(bound), unbound=[r for r in rows if r['o_off'] is None and r['merged_key'] is None],
                        merged=[r for r in rows if r['merged_key'] is not None],
                        covered_bytes=sum(cov), orig_bytes=osz, gaps=gaps,
                        out_of_order=len(bound) - len(keep), rows=rows)
    rep['problems'] = dict(bad)
    return rep


if __name__ == '__main__':
    a = sys.argv[1:]
    out = a[a.index('--json') + 1] if '--json' in a else None
    r = analyze(a[0])
    for n in DATA:
        x = r[n]
        print('%s: cand %d bound %d unbound %d covered %d/%d gaps %d (%d B) out_of_order %d' % (
            n, x['cand_sections'], x['bound'], len(x['unbound']), x['covered_bytes'], x['orig_bytes'], len(x['gaps']),
            sum(g[1] for g in x['gaps']), x['out_of_order']))
        if '--quiet' not in a:
            for u in x['unbound'][:10]: print('   unbound', u['c_off'], u['size'], u['file'][:40], u['section'][:60])
            print('   gaps', x['gaps'][:16])
    print('problems', r['problems'])
    if out: Path(out).write_text(json.dumps(r, indent=1) + '\n')
