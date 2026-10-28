#!/usr/bin/env python3
"""[mg-P-raw] Pump kit: ELF reader, original windows (score.py replica), window<->candidate correspondence, link-map parser."""
import bisect, hashlib, re, struct, sys
from collections import defaultdict
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
sys.path.insert(0, str(W / 'harness'))
import score as SC  # noqa
ORIG = W / 'base/original.so'
DATA = ('.rodata', '.data.rel.ro')
sha = lambda b: hashlib.sha256(b).digest()


class Elf:
    def __init__(self, path):
        self.path = str(path); b = self.b = Path(path).read_bytes()
        shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
        raw = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
        st = raw[shstrndx]
        nm = lambda o: b[st[4] + o:b.index(b'\0', st[4] + o)].decode()
        self.sections = [dict(index=i, name=nm(x[0]), type=x[1], flags=x[2], addr=x[3], off=x[4], size=x[5], link=x[6], entsize=x[9])
                         for i, x in enumerate(raw)]
        self.sec = {s['name']: s for s in self.sections}
        t = self.sec['.text']; self.lo, self.hi = t['addr'], t['addr'] + t['size']; self.text_index = t['index']
        self.symbols = []; tables = {}
        for s in self.sections:
            if s['type'] not in (2, 11): continue
            strs = self.sections[s['link']]; rows = []
            for p in range(s['off'], s['off'] + s['size'], s['entsize']):
                n, info, other, idx, val, size = struct.unpack_from('<IBBHQQ', b, p)
                rows.append(dict(table=s['name'], name=b[strs['off'] + n:b.index(b'\0', strs['off'] + n)].decode(),
                                 info=info, shndx=idx, value=val, size=size))
            tables[s['index']] = rows; self.symbols += rows
        self.rel = {}
        for s in self.sections:
            if s['type'] != 9: continue
            ts = tables.get(s['link'], [])
            for p in range(s['off'], s['off'] + s['size'], s['entsize']):
                at, info = struct.unpack_from('<QQ', b, p)
                si = info >> 32
                self.rel[at] = dict(type=info & 0xffffffff, sym=ts[si]['name'] if si < len(ts) else None)

    def secname(self, addr):
        for s in self.sections:
            if s['addr'] and s['addr'] <= addr < s['addr'] + s['size'] and s['flags'] & 2: return s['name']
        return None

    def funcs(self):
        """candidate functions (score.py: FUNC symbols in .text with size>0), first symbol per address"""
        out = {}
        for s in self.symbols:
            if s['table'] == '.symtab' and s['info'] & 15 == 2 and s['shndx'] == self.text_index and s['size'] > 0:
                out.setdefault(s['value'], s)
        return out

    def lddw(self, at):
        return struct.unpack_from('<I', self.b, at + 4)[0] | struct.unpack_from('<I', self.b, at + 12)[0] << 32

    def norm(self, start, size):
        secs = {s['name']: {'addr': s['addr'], 'size': s['size'], 'offset': s['off']} for s in self.sections}
        return SC.normalize(self.b[start:start + size], start, secs)


def windows():
    """[(start, size)] of the 1035 original windows (functions.tsv pump/selected), address order"""
    return sorted((w['start'], w['bytes']) for w in SC.original_windows())


class Corr:
    def __init__(self, o, c):
        self.o, self.c = o, c
        self.ws = windows(); self.wsize = dict(self.ws)
        self.ostarts = [a for a, n in self.ws]
        self.cf = c.funcs(); self.cstarts = sorted(self.cf)
        okey = defaultdict(list)
        for a, n in self.ws: okey[(n, sha(o.norm(a, n)))].append(a)
        ckey = defaultdict(list)
        for a in self.cstarts:
            n = self.cf[a]['size']; ckey[(n, sha(c.norm(a, n)))].append(a)
        self.o2c, self.c2o = {}, {}
        for k, oas in okey.items():
            for oa, ca in zip(oas, ckey.get(k, [])):
                self.o2c[oa] = ca; self.c2o[ca] = oa
        self.groups = [(oas, ckey.get(kk, [])) for kk, oas in okey.items() if (len(oas) > 1 or len(ckey.get(kk, [])) > 1) and ckey.get(kk)]
        self.refine()
        self.raw = {oa for oa, ca in self.o2c.items() if o.b[oa:oa + self.wsize[oa]] == c.b[ca:ca + self.wsize[oa]]}

    def site_score(self, oa, ca):
        """consistency of a duplicate-group pairing: call targets map under the current correspondence,
        data targets have equal content (relocated slots ignored)"""
        o, c = self.o, self.c; size = self.wsize[oa]; sc = 0; i = 0
        while i < size:
            po, pc = oa + i, ca + i
            if o.b[po] == 0x18:
                r = o.rel.get(po)
                if r and r['type'] == 8:
                    vo, vc = o.lddw(po), c.lddw(pc)
                    if o.lo <= vo < o.hi:
                        sc += 1 if self.c2o_addr(vc) == vo else 0
                    else:
                        sc += 1 if self.data_eq(vo, vc) else 0
                i += 16; continue
            if o.b[po] == 0x85 and o.b[po + 1] == 0x10:
                io = struct.unpack_from('<i', o.b, po + 4)[0]
                if io != -1:
                    to = po + 8 + 8 * io; tc = pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0]
                    sc += 1 if self.c2o_addr(tc) == to else 0
            i += 8
        return sc

    def data_eq(self, vo, vc, n=24, depth=1):
        o, c = self.o, self.c
        for j in range(0, n, 8):
            ro, rc = o.rel.get(vo + j), c.rel.get(vc + j)
            if ro and rc:
                if depth:
                    po = struct.unpack_from('<II', o.b, vo + j); pc = struct.unpack_from('<II', c.b, vc + j)
                    po = po[1] if po[0] == 0 else po[1] << 32 | po[0]; pc = pc[1] if pc[0] == 0 else pc[1] << 32 | pc[0]
                    if o.lo <= po < o.hi or c.lo <= pc < c.hi:
                        if self.c2o_addr(pc) != po: return False
                    elif not self.data_eq(po, pc, 16, depth - 1): return False
            elif ro or rc: return False
            elif o.b[vo + j:vo + j + 8] != c.b[vc + j:vc + j + 8]: return False
        return True

    def incoming(self):
        """(orig target, cand target) -> count over call/fnptr sites of matched windows outside duplicate groups"""
        o, c = self.o, self.c; inc = defaultdict(int)
        gw = {oa for oas, cas in self.groups for oa in oas}
        for oa, ca in self.o2c.items():
            if oa in gw: continue
            size = self.wsize[oa]; i = 0
            while i < size:
                po, pc = oa + i, ca + i
                if o.b[po] == 0x18:
                    r = o.rel.get(po)
                    if r and r['type'] == 8:
                        vo, vc = o.lddw(po), c.lddw(pc)
                        if o.lo <= vo < o.hi: inc[(vo, vc)] += 1
                    i += 16; continue
                if o.b[po] == 0x85 and o.b[po + 1] == 0x10:
                    io = struct.unpack_from('<i', o.b, po + 4)[0]
                    if io != -1:
                        inc[(po + 8 + 8 * io, pc + 8 + 8 * struct.unpack_from('<i', c.b, pc + 4)[0])] += 1
                i += 8
        return inc

    def refine(self, rounds=4):
        inc = self.incoming()
        for _ in range(rounds):
            changed = 0
            for oas, cas in self.groups:
                for oa in oas:
                    ca = self.o2c.pop(oa, None)
                    if ca is not None: self.c2o.pop(ca, None)
                cand = sorted(((-(self.site_score(oa, ca) + 2 * inc.get((oa, ca), 0)), oas.index(oa), cas.index(ca), oa, ca) for oa in oas for ca in cas))
                new = {}
                usedc = set()
                for s, i, j, oa, ca in cand:
                    if oa in new or ca in usedc: continue
                    new[oa] = ca; usedc.add(ca)
                for oa, ca in new.items():
                    self.o2c[oa] = ca; self.c2o[ca] = oa
                changed += sum(1 for oa in oas if new.get(oa) != getattr(self, '_prev', {}).get(oa))
            self._prev = dict(self.o2c)

    def cfunc_at(self, addr):
        i = bisect.bisect_right(self.cstarts, addr) - 1
        if i < 0: return None
        a = self.cstarts[i]
        return a if addr < a + self.cf[a]['size'] else None

    def ofunc_at(self, addr):
        i = bisect.bisect_right(self.ostarts, addr) - 1
        if i < 0: return None
        a = self.ostarts[i]
        return a if addr < a + self.wsize[a] else None

    def c2o_addr(self, ca):
        f = self.cfunc_at(ca)
        if f is None or f not in self.c2o: return None
        return self.c2o[f] + (ca - f)


MAPLINE = re.compile(r'^\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+)\s(\s*)(\S.*)$')


def parse_map(path):
    """lld -Map: input sections in output order: dict(addr,size,file,section,pattern,out)"""
    out, cur = [], None
    for line in Path(path).read_text().splitlines():
        mm = MAPLINE.match(line)
        if not mm: continue
        vma, lma, size, align, ind, rest = mm.groups()
        if len(ind) == 0:
            cur = rest.split()[0]; continue
        if ':(' not in rest or len(ind) > 8: continue
        f, sec = rest.rsplit(':(', 1); sec = sec[:-1]
        if f.endswith(')') and '(' in f:
            arch, mem = f[:-1].rsplit('(', 1); pat = '*%s:%s' % (Path(arch).name, mem)
        else:
            pat = '*' + Path(f).name
        out.append(dict(addr=int(vma, 16), size=int(size, 16), align=int(align), file=f, section=sec, pattern=pat, out=cur))
    return out


def lis(seq):
    tails, prev, idx = [], [-1] * len(seq), []
    for i, x in enumerate(seq):
        j = bisect.bisect_left(tails, x)
        if j == len(tails): tails.append(x); idx.append(i)
        else: tails[j] = x; idx[j] = i
        prev[i] = idx[j - 1] if j else -1
    out, k = [], idx[-1] if idx else -1
    while k >= 0: out.append(k); k = prev[k]
    return set(out)
