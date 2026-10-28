#!/usr/bin/env python3
"""Whole-ELF comparison of the deployed Mayhem ELF against a candidate build (lane mg-M-raw).

usage: python3 -B elfcmp.py CAND_SYMBOLS.so [--stripped CAND.so] [--json OUT] [--quiet]

Reports
  1. ELF header / program headers / every section: address, offset, size, first differing byte,
     meaningful extent vs zero tail.
  2. Window correspondence (all 441 original windows, measure.py keys): normalized / raw matches,
     function-order check (longest increasing subsequence), address-shift segments.
  3. Raw-mismatch classification per matched window: every differing call / lddw immediate is
     translated through the window correspondence (text) and the section-relative offset (data):
       call_shift   callee is the corresponding window at the same offset (pure address shift)
       call_wrong   callee maps elsewhere (genuine: wrong callee / unmatched callee)
       fnptr_shift / fnptr_wrong   same for lddw of a .text address
       data_sec     lddw into .rodata/.data.rel.ro at a different section-relative offset
     plus the .rodata/.data.rel.ro offset map (runs of constant delta) built from all lddw pairs.
"""
from pathlib import Path
from collections import defaultdict, Counter
import bisect, gzip, hashlib, importlib.util, json, struct, sys

WM = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work')
PKT = Path(__file__).resolve().parents[1] / 'inputs'  # durable copies: reader.py, inputs/parent-audit.json.gz, deployed.so
ORIG = PKT / 'deployed.so'  # sha256 a87fa9f8... = mayhem-b/wt/evidence/original/mayhem/deployed.so
spec = importlib.util.spec_from_file_location('progress_elf', PKT / 'reader.py')
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
ROWS = json.loads(gzip.decompress((PKT / 'inputs/parent-audit.json.gz').read_bytes()))['rows']


def key(w):
    return (w['end'] - w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True))


def meaningful_end(e):
    h = e.header
    return max([h['shoff'] + h['shnum'] * h['shentsize'], h['phoff'] + h['phnum'] * h['phentsize']] +
               [s['offset'] + s['size'] for s in e.sections if s['type'] != 8])


def first_diff(a, b):
    n = min(len(a), len(b))
    for i in range(0, n, 4096):
        if a[i:i + 4096] != b[i:i + 4096]:
            for j in range(i, min(i + 4096, n)):
                if a[j] != b[j]:
                    return j
    return None if len(a) == len(b) else n


def sections_report(o, c, cs=None):
    """o: original Elf, c: candidate Elf used for bytes (stripped if given)."""
    out = dict(file=dict(orig_size=len(o.b), cand_size=len(c.b), orig_meaningful=meaningful_end(o),
                         cand_meaningful=meaningful_end(c)))
    mo, mc = out['file']['orig_meaningful'], out['file']['cand_meaningful']
    out['file']['orig_tail_zero'] = not any(o.b[mo:])
    out['file']['meaningful_equal'] = o.b[:mo] == c.b[:mc]
    out['file']['first_diff'] = first_diff(o.b[:mo], c.b[:mc])
    out['header'] = {k: (o.header[k], c.header[k]) for k in o.header if o.header[k] != c.header[k]}
    out['phdrs'] = [dict(orig=a['values'], cand=b['values']) for a, b in zip(o.ph, c.ph) if a['values'] != b['values']]
    rows = []
    for s in o.sections:
        t = c.sec.get(s['name'])
        r = dict(name=s['name'] or '<null>', o_addr=s['address'], o_off=s['offset'], o_size=s['size'])
        if t is None:
            r['cand'] = 'missing'; rows.append(r); continue
        r.update(c_addr=t['address'], c_off=t['offset'], c_size=t['size'], d_size=t['size'] - s['size'])
        if s['type'] != 8:
            a = o.b[s['offset']:s['offset'] + s['size']]; b = c.b[t['offset']:t['offset'] + t['size']]
            r['equal'] = a == b; r['first_diff'] = first_diff(a, b)
            r['o_nz_end'] = len(a.rstrip(b'\0')); r['c_nz_end'] = len(b.rstrip(b'\0'))
            if not r['equal'] and r['first_diff'] is not None:
                n = min(len(a), len(b)); r['diff_bytes_prefix'] = sum(1 for i in range(n) if a[i] != b[i])
        hdr = lambda e, x: e.b[x['header_offset']:x['header_offset'] + 64]
        r['hdr_equal'] = hdr(o, s) == hdr(c, t)
        rows.append(r)
    out['sections'] = rows
    out['cand_only_sections'] = [s['name'] for s in c.sections if s['name'] not in o.sec]
    return out


class Corr:
    """Original window <-> candidate function correspondence."""

    def __init__(self, o, c):
        self.o, self.c = o, c
        self.ow = {r['start']: o.window(r['start'], r['end']) for r in ROWS}
        self.id = {r['start']: r['id'] for r in ROWS}
        funcs = {}
        for s in c.symbols:
            if s['info'] & 15 == 2 and s['size'] >= 8 and c.lo <= s['value'] < c.hi:
                funcs.setdefault(s['value'], s)
        self.cf = funcs  # start -> symbol
        self.cw = {a: c.window(a, a + s['size']) for a, s in funcs.items()}
        bykey = defaultdict(list)
        for a in sorted(self.cw): bykey[key(self.cw[a])].append(a)
        okey = defaultdict(list)
        for a in sorted(self.ow): okey[key(self.ow[a])].append(a)
        self.o2c, self.c2o = {}, {}
        for k, oas in okey.items():
            cas = bykey.get(k, [])
            for i, oa in enumerate(oas):
                if i < len(cas):
                    self.o2c[oa] = cas[i]; self.c2o[cas[i]] = oa
        self.ostarts = sorted(self.ow); self.cstarts = sorted(self.cw)

    def cfunc_at(self, addr):
        i = bisect.bisect_right(self.cstarts, addr) - 1
        if i < 0: return None
        a = self.cstarts[i]
        return a if addr < a + self.cf[a]['size'] else None

    def ofunc_at(self, addr):
        i = bisect.bisect_right(self.ostarts, addr) - 1
        if i < 0: return None
        a = self.ostarts[i]
        return a if addr < self.ow[a]['end'] else None

    def c2o_addr(self, ca):
        f = self.cfunc_at(ca)
        if f is None or f not in self.c2o: return None
        return self.c2o[f] + (ca - f)


def lis(seq):
    """indices of a longest strictly increasing subsequence"""
    tails, prev, idx = [], [-1] * len(seq), []
    for i, x in enumerate(seq):
        j = bisect.bisect_left(tails, x)
        if j == len(tails): tails.append(x); idx.append(i)
        else: tails[j] = x; idx[j] = i
        prev[i] = idx[j - 1] if j else -1
    out, k = [], idx[-1] if idx else -1
    while k >= 0: out.append(k); k = prev[k]
    return set(out)


def secname(e, addr):
    for s in e.sections:
        if s['address'] and s['address'] <= addr < s['address'] + s['size'] and s['flags'] & 2:
            return s['name']
    return None


def analyze(cand_symbols, stripped=None):
    o = m.Elf(ORIG.resolve()); c = m.Elf(Path(cand_symbols).resolve())
    cb = m.Elf(Path(stripped).resolve()) if stripped else c
    rep = dict(candidate=str(cand_symbols), stripped=str(stripped) if stripped else None,
               cand_sha256=hashlib.sha256(cb.b).hexdigest())
    rep['elf'] = sections_report(o, cb)
    k = Corr(o, c)
    matched = [oa for oa in k.ostarts if oa in k.o2c]
    raw = [oa for oa in matched if k.ow[oa]['raw_sha256'] == k.cw[k.o2c[oa]]['raw_sha256']]
    order = [k.o2c[oa] for oa in matched]
    keep = lis(order)
    ooo = [k.id[matched[i]] for i in range(len(matched)) if i not in keep]
    segs = []
    for oa in k.ostarts:
        d = (k.o2c[oa] - oa) if oa in k.o2c else None
        if segs and segs[-1]['shift'] == d: segs[-1]['n'] += 1; segs[-1]['last'] = k.id[oa]
        else: segs.append(dict(first=k.id[oa], last=k.id[oa], start=oa, shift=d, n=1))
    rep['windows'] = dict(total=len(k.ostarts), normalized=len(matched), raw=len(raw),
                          unmatched=[dict(id=k.id[oa], start=oa, size=k.ow[oa]['end'] - oa) for oa in k.ostarts if oa not in k.o2c],
                          out_of_order=ooo, cand_functions=len(k.cw),
                          cand_unmapped=[dict(start=a, size=k.cf[a]['size'], name=k.cf[a]['name'][:90]) for a in k.cstarts if a not in k.c2o],
                          shift_segments=segs)
    # raw mismatch classification
    osec = {s['name']: s for s in o.sections}; csec = {s['name']: s for s in c.sections}
    cls_count = Counter(); per = {}; pairs = defaultdict(set)
    for oa in matched:
        ca = k.o2c[oa]; size = k.ow[oa]['end'] - oa
        cl = Counter(); cont = False
        for i in range(0, size, 8):
            if cont: cont = False; continue
            po, pc = oa + i, ca + i
            op = o.b[po]
            if op == 0x18:
                cont = True
                vo = struct.unpack_from('<I', o.b, po + 4)[0] | struct.unpack_from('<I', o.b, po + 12)[0] << 32
                vc = struct.unpack_from('<I', c.b, pc + 4)[0] | struct.unpack_from('<I', c.b, pc + 12)[0] << 32
                ro = o.rel.get(po)
                if not ro or ro['type'] != 8:
                    if o.b[po:po + 16] != c.b[pc:pc + 16]: cl['lddw_plain'] += 1
                    continue
                so = secname(o, vo); sc = secname(c, vc)
                if so == '.text':
                    t = k.c2o_addr(vc)
                    if vo == vc: pass
                    elif t == vo: cl['fnptr_shift'] += 1
                    else: cl['fnptr_wrong'] += 1
                elif so:
                    offo = vo - osec[so]['address']; offc = vc - csec[sc]['address'] if sc else None
                    pairs[so].add((offo, sc, offc))
                    if vo != vc: cl['data_sec' if offo == offc and so == sc else 'data_moved'] += 1
                continue
            if op == 0x85 and o.b[po + 1] == 0x10 and not (o.rel.get(po) and o.rel[po]['type'] == 10):
                io = struct.unpack_from('<i', o.b, po + 4)[0]; ic = struct.unpack_from('<i', c.b, pc + 4)[0]
                if io == ic: continue
                to = po + 8 + io * 8; tc = pc + 8 + ic * 8
                cl['call_shift' if k.c2o_addr(tc) == to else 'call_wrong'] += 1
                continue
            if o.b[po:po + 8] != c.b[pc:pc + 8]: cl['other'] += 1
        per[k.id[oa]] = dict(cl)
        for x in cl: cls_count[x] += 1
    rep['raw_classes_windows'] = dict(cls_count)
    only_shift = [w for w, cl in per.items() if cl and set(cl) <= {'call_shift', 'fnptr_shift', 'data_sec', 'data_moved'}]
    genuine = {w: cl for w, cl in per.items() if set(cl) & {'call_wrong', 'fnptr_wrong', 'other', 'lddw_plain'}}
    rep['raw_mismatch'] = dict(total=sum(1 for cl in per.values() if cl), shift_only=len(only_shift),
                               with_genuine=len(genuine), genuine=genuine)
    # data offset map: runs of constant delta per section
    dmap = {}
    for so, ps in pairs.items():
        runs = []
        byo = defaultdict(set)
        for offo, sc, offc in ps: byo[offo].add((sc, offc))
        conflicts = {x: sorted(v, key=str) for x, v in byo.items() if len(v) > 1}
        for offo in sorted(byo):
            sc, offc = sorted(byo[offo], key=str)[0]
            d = (sc, None if offc is None else offc - offo)
            if runs and runs[-1]['delta'] == d: runs[-1]['n'] += 1; runs[-1]['last'] = offo
            else: runs.append(dict(first=offo, last=offo, delta=d, n=1))
        dmap[so] = dict(refs=len(byo), conflicts=len(conflicts), runs=runs)
    rep['data_map'] = dmap
    rep['per_window'] = per
    return rep


def main():
    a = sys.argv[1:]
    opt = lambda f: (a.pop(a.index(f) + 1), a.remove(f))[0] if f in a else None
    out = opt('--json'); stripped = opt('--stripped'); quiet = '--quiet' in a
    if quiet: a.remove('--quiet')
    r = analyze(a[0], stripped)
    e = r['elf']
    print('file', json.dumps(e['file']))
    if e['header']: print('header diffs', e['header'])
    print('phdr diffs', len(e['phdrs']))
    for s in e['sections']:
        print('  %-13s o@%06x+%06x c@%06x+%06x d=%+d eq=%s fd=%s' % (s['name'], s['o_off'], s['o_size'], s.get('c_off', 0),
              s.get('c_size', 0), s.get('d_size', 0), s.get('equal'), s.get('first_diff')))
    wv = r['windows']
    print('windows norm %d/%d raw %d; out_of_order %d %s; unmatched %s; cand_unmapped %d' % (
        wv['normalized'], wv['total'], wv['raw'], len(wv['out_of_order']), wv['out_of_order'][:12],
        [(u['id'], u['start'], u['size']) for u in wv['unmatched']], len(wv['cand_unmapped'])))
    if not quiet:
        for u in wv['cand_unmapped'][:8]: print('   cand-only', u)
        print('shift segments', len(wv['shift_segments']))
        for s in wv['shift_segments'][:30]: print('   %s..%s @%d shift=%s n=%d' % (s['first'], s['last'], s['start'], s['shift'], s['n']))
    rm = r['raw_mismatch']
    print('raw mismatches', rm['total'], 'shift-only', rm['shift_only'], 'with-genuine', rm['with_genuine'], r['raw_classes_windows'])
    if not quiet:
        for w, cl in list(rm['genuine'].items())[:15]: print('   genuine', w, cl)
        for so, d in r['data_map'].items():
            print('data map', so, 'refs', d['refs'], 'conflicts', d['conflicts'], 'runs', len(d['runs']))
            for x in d['runs'][:25]: print('   [%d..%d] n=%d delta=%s' % (x['first'], x['last'], x['n'], x['delta']))
    if out: Path(out).write_text(json.dumps(r, indent=1, default=str) + '\n')


if __name__ == '__main__':
    main()
