#!/usr/bin/env python3
"""Readonly-data order generator (extends tools/plan.py; source-agnostic).

Maps candidate `.rodata` / `.data.rel.ro` input sections to original
section-relative offsets and emits a linker script whose `.text`, `.rodata`
and `.data.rel.ro` selector lists follow the original order. Evidence, in
order of strength:

  ref        relocated lddw immediates at the same instruction slot of
             normalized-equal (window, body) pairs placed by the text plan;
  pointer    relocated pointer fields of an already placed `.data.rel.ro`
             object (same field offset in both), e.g. Location records that
             point at file-name strings, vtables that point at constants;
  content    exact bytes found once in the original `.rodata` (aligned, not
             overlapping placed objects); for `.data.rel.ro` the non-pointer
             bytes with the same pointer-field layout.

Merged constant pools (`.rodata.cst*`, owner `<internal>`) are placed as one
unit by the majority of their references. Candidate objects without a
placement, and duplicates of an already placed original object, follow in
default order. The original's bytes are used only to choose positions; no
original byte is written to any build input.
"""
import argparse, bisect, collections, hashlib, json, re, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import plan as planmod  # noqa: E402

DATA = ('.rodata', '.data.rel.ro')


def parse_data_map(path):
    rows, sec = [], None
    for ln in Path(path).read_text().split('\n')[1:]:
        m = re.match(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+) (.*)$', ln)
        if not m:
            continue
        vma, _, size, al, rest = m.groups()
        ind = len(rest) - len(rest.lstrip(' '))
        if ind == 0:
            sec = rest.strip()
            continue
        if sec in DATA and ind == 8:
            owner, section = re.match(r'(.*):\((.*)\)$', rest.strip()).groups()
            rows.append({'out': sec, 'vma': int(vma, 16), 'size': int(size, 16), 'align': int(al),
                         'owner': owner, 'section': section})
    return rows


def bounds(e, name):
    s = e.secs[name]
    return s[3], s[3] + s[5]


def lddw_values(e, start, size):
    out = {}
    for at, r in e.relocations.items():
        if start <= at < start + size and r['type'] == 8 and e.b[at] == 0x18:
            out[at - start] = struct.unpack_from('<I', e.b, at + 4)[0] | (struct.unpack_from('<I', e.b, at + 12)[0] << 32)
    return out


def data_ptr(e, at):
    return struct.unpack_from('<Q', e.b, at)[0] >> 32


class DataPlan:
    def __init__(self, pl, mapfile):
        self.pl = pl
        o, s = pl.o, pl.s
        self.D = parse_data_map(mapfile)
        self.ob = {n: bounds(o, n) for n in DATA}
        self.cb = {n: bounds(s, n) for n in DATA}
        st = sorted((r['vma'], i) for i, r in enumerate(self.D))
        self._starts, self._idx = [x for x, _ in st], [i for _, i in st]
        self.optr = {at for at, r in o.relocations.items() if r['type'] == 8 and self.ob['.data.rel.ro'][0] <= at < self.ob['.data.rel.ro'][1]}
        self.cptr = {at for at, r in s.relocations.items() if r['type'] == 8 and self.cb['.data.rel.ro'][0] <= at < self.cb['.data.rel.ro'][1]}

    def dsec(self, v):
        k = bisect.bisect_right(self._starts, v) - 1
        if k < 0:
            return None
        i = self._idx[k]
        r = self.D[i]
        return i if r['vma'] <= v < r['vma'] + r['size'] else None

    def osec(self, v):
        for n, (lo, hi) in self.ob.items():
            if lo <= v < hi:
                return n
        return None

    def place(self):
        pl, o, s, D = self.pl, self.pl.o, self.pl.s, self.D
        votes = collections.defaultdict(collections.Counter)   # d -> (osec, original start) -> n
        basis = {}

        def vote(vo, vc, kind, weight=1):
            d = self.dsec(vc)
            so = self.osec(vo)
            if d is None or so is None or so != D[d]['out']:
                return
            votes[d][(so, vo - (vc - D[d]['vma']))] += weight
            basis.setdefault(d, kind)

        for w, c in pl.A.items():
            if pl.wkey[w] != pl.ckey[c]:
                continue
            st, en = pl.W[w]
            r = pl.sections[c]
            wo, wc = lddw_values(o, st, en - st), lddw_values(s, r['vma'], r['size'])
            for off, vo in wo.items():
                if off in wc:
                    vote(vo, wc[off], 'ref', 4)
        P = {}       # d -> original absolute start
        taken = {}   # (osec, start) -> d

        def settle(kind_filter=None):
            changed = False
            order = sorted(votes, key=lambda d: -max(votes[d].values()))
            for d in order:
                if d in P:
                    continue
                (so, start), n = votes[d].most_common(1)[0]
                if (so, start) in taken:
                    continue
                if not (self.ob[so][0] <= start and start + D[d]['size'] <= self.ob[so][1]):
                    continue
                P[d] = start
                taken[(so, start)] = d
                changed = True
            return changed

        settle()
        # pointer propagation through placed .data.rel.ro objects
        for _ in range(10):
            before = len(P)
            for d, start in list(P.items()):
                r = D[d]
                if r['out'] != '.data.rel.ro':
                    continue
                for k in range(0, r['size'], 8):
                    ca, oa = r['vma'] + k, start + k
                    if ca in self.cptr and oa in self.optr:
                        vc, vo = data_ptr(s, ca), data_ptr(o, oa)
                        vote(vo, vc, 'pointer', 2)
            settle()
            if len(P) == before:
                break
        # content search for remaining objects
        occupied = {n: [] for n in DATA}
        for d, start in P.items():
            occupied[D[d]['out']].append((start, start + D[d]['size']))

        def free(n, a, b):
            return all(b <= x or a >= y for x, y in occupied[n])

        for d, r in enumerate(D):
            if d in P or r['owner'] == '<internal>' or r['size'] < 4:
                continue
            n = r['out']
            lo, hi = self.ob[n]
            body = s.b[r['vma']:r['vma'] + r['size']]
            if n == '.rodata':
                hits = []
                i = o.b.find(body, lo, hi)
                while i != -1 and len(hits) < 3:
                    if (i - lo) % max(r['align'], 1) == 0 and i + len(body) <= hi:
                        hits.append(i)
                    i = o.b.find(body, i + 1, hi)
            else:
                # same pointer-field layout and equal non-pointer bytes
                fields = [k for k in range(0, r['size'], 8) if r['vma'] + k in self.cptr]
                mask = bytearray(body)
                for k in fields:
                    mask[k:k + 8] = bytes(8)
                hits = []
                for i in range(lo, hi - r['size'] + 1, max(r['align'], 8)):
                    if any(i + k not in self.optr for k in fields):
                        continue
                    cand = bytearray(o.b[i:i + r['size']])
                    for k in fields:
                        cand[k:k + 8] = bytes(8)
                    if bytes(cand) == bytes(mask) and not any(i + k in self.optr for k in range(0, r['size'], 8) if k not in fields):
                        hits.append(i)
                        if len(hits) > 2:
                            break
            hits = [h for h in hits if free(n, h, h + r['size']) and (n, h) not in taken]
            if len(hits) == 1:
                P[d] = hits[0]
                taken[(n, hits[0])] = d
                basis[d] = 'content'
                occupied[n].append((hits[0], hits[0] + r['size']))
        self.P, self.basis, self.votes = P, basis, votes
        return P

    def order(self, out):
        D = self.D
        lo = self.ob[out][0]
        placed = sorted((self.P[d] - lo, d) for d in self.P if D[d]['out'] == out)
        seq = [d for _, d in placed]
        rest = [d for d in range(len(D)) if D[d]['out'] == out and d not in self.P]
        return seq, rest

    def selectors(self, out):
        seq, rest = self.order(out)
        lines, seen_internal = [], set()
        for d in seq + rest:
            r = self.D[d]
            if r['owner'] == '<internal>':
                if r['section'] in seen_internal:
                    continue
                seen_internal.add(r['section'])
                lines.append('    *(' + json.dumps(r['section']) + ')')
            else:
                lines.append('    ' + planmod.selector_owner(r['owner']) + '(' + json.dumps(r['section']) + ')')
        return lines

    def script(self, text_script):
        out = text_script
        for name, old in (('.rodata', '  .rodata : { *(.rodata*) } :rodata'),
                          ('.data.rel.ro', '  .data.rel.ro : { *(.data.rel.ro*) } :rodata')):
            assert out.count(old) == 1
            pat = '*(.rodata*)' if name == '.rodata' else '*(.data.rel.ro*)'
            new = '  %s : {\n' % name + '\n'.join(self.selectors(name)) + '\n    %s\n  } :rodata' % pat
            out = out.replace(old, new)
        return out

    def report(self):
        D = self.D
        rows = []
        for d, r in enumerate(D):
            rows.append({'out': r['out'], 'owner': planmod.selector_owner(r['owner']) if r['owner'] != '<internal>' else '<internal>',
                         'section': r['section'], 'size': r['size'], 'align': r['align'], 'default_offset': r['vma'] - self.cb[r['out']][0],
                         'original_offset': (self.P[d] - self.ob[r['out']][0]) if d in self.P else None,
                         'basis': self.basis.get(d) if d in self.P else None})
        cnt = collections.Counter((r['out'], r['basis']) for r in rows)
        return {'objects': rows, 'counts': {f'{k[0]}:{k[1]}': v for k, v in sorted(cnt.items(), key=str)}}


def location_report(dp):
    """Location-shaped .data.rel.ro records (file &str pointer, length, line, column).

    For each original record: its file/line/column and, when a candidate object was
    placed on it, whether the candidate record agrees. Diagnostic only."""
    o, s, D = dp.pl.o, dp.pl.s, dp.D
    lo, hi = dp.ob['.data.rel.ro']

    def rec(e, at, ptrs):
        if at not in ptrs or at + 8 in ptrs or at + 16 in ptrs:
            return None
        n, line, col = struct.unpack_from('<QII', e.b, at + 8)
        if not (0 < n < 256 and 0 < line < 100000 and col < 1000):
            return None
        p = data_ptr(e, at)
        name = e.b[p:p + n]
        if not name.endswith(b'.rs'):
            return None
        return name.decode(errors='replace'), line, col

    placed = {}
    for d, st in dp.P.items():
        r = D[d]
        if r['out'] != '.data.rel.ro':
            continue
        for k in range(0, r['size'] - 23, 8):
            placed[st + k] = rec(s, r['vma'] + k, dp.cptr)
    rows = []
    for at in range(lo, hi - 23, 8):
        orec = rec(o, at, dp.optr)
        if not orec:
            continue
        c = placed.get(at)
        rows.append({'original_offset': at - lo, 'file': orec[0], 'line': orec[1], 'column': orec[2],
                     'candidate': None if c is None else {'file': c[0], 'line': c[1], 'column': c[2]},
                     'status': 'unplaced' if c is None else 'equal' if c == orec else
                               'file-differs' if c[0] != orec[0] else 'line-column-differs'})
    return {'records': rows, 'counts': dict(collections.Counter(r['status'] for r in rows))}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--original', type=Path, default=planmod.ROOT / 'evidence/original/pump_amm/deployed.so')
    ap.add_argument('--symbols', type=Path, required=True)
    ap.add_argument('--map', type=Path, required=True)
    ap.add_argument('--default-script', type=Path, required=True)
    ap.add_argument('--out-dir', type=Path, required=True)
    a = ap.parse_args()
    pl = planmod.Plan(a.original, a.symbols, a.map)
    pl.assign()
    seq, tail = pl.order()
    text = pl.script(a.default_script.read_text(), seq, tail)
    dp = DataPlan(pl, a.map)
    dp.place()
    a.out_dir.mkdir(parents=True, exist_ok=True)
    (a.out_dir / 'ordered.ld').write_text(dp.script(text))
    rep = {'text': pl.report(seq, tail), 'data': dp.report(), 'locations': location_report(dp)}
    rep['inputs'] = {'original_sha256': planmod.digest(pl.o.b), 'symbols_sha256': planmod.digest(pl.s.b),
                     'map_sha256': planmod.digest(a.map.read_bytes()), 'default_script_sha256': planmod.digest(a.default_script.read_bytes()),
                     'plan_sha256': planmod.digest((HERE / 'plan.py').read_bytes()), 'dataplan_sha256': planmod.digest(Path(__file__).read_bytes())}
    (a.out_dir / 'order-plan.json').write_text(json.dumps(rep, indent=1) + '\n')
    print(json.dumps({'text': rep['text']['counts'], 'data': rep['data']['counts'], 'locations': rep['locations']['counts']}, indent=1))


if __name__ == '__main__':
    main()
