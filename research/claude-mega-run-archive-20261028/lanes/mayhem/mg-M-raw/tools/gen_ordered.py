#!/usr/bin/env python3
"""Generate an ordered.ld whose .text order reproduces the original Mayhem function order (lane mg-M-raw).

usage: python3 -B gen_ordered.py BUILD_DIR OUT_LD [--assign O0083=substr ...] [--tail end|keep] [--report OUT.json]
  BUILD_DIR has symbols.so, link.map and ordered.ld of a build of the CURRENT source (any order).
Each original window (address order) is bound to the candidate input section of its normalized counterpart
(elfcmp.Corr); unmatched windows are bound with --assign (symbol-name substring) or, by default, to the
unmapped candidate function lying between the counterparts of their matched neighbours. Candidate-only
functions (no original window) go after all windows (--tail end) in their current relative order.
Everything outside the .text explicit list is copied unchanged from BUILD_DIR/ordered.ld.
"""
from pathlib import Path
import json, re, sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import elfcmp

LINE = re.compile(r'^\s+([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+)\s+(\S.*)$')


def parse_map(path):
    """-> list of input sections in output order: dict(addr,size,file,section,pattern,section_out)"""
    out, cur, outcol = [], None, None
    for line in Path(path).read_text().splitlines():
        mm = LINE.match(line)
        if not mm: continue
        vma, lma, size, align, rest = mm.groups()
        col = len(line) - len(rest)
        if ':(' not in rest and (outcol is None or col == outcol) and rest.startswith('.'):
            outcol = col; cur = rest.split()[0]; continue
        if ':(' not in rest: continue
        f, sec = rest.rsplit(':(', 1); sec = sec[:-1]
        if f.endswith(')') and '(' in f:
            arch, mem = f[:-1].rsplit('(', 1); pat = '*%s:%s' % (Path(arch).name, mem)
        else:
            pat = '*' + Path(f).name
        out.append(dict(addr=int(vma, 16), size=int(size, 16), file=f, section=sec, pattern=pat, out=cur))
    return out


def entry(s):
    return '    %s("%s")' % (s['pattern'], s['section'])


def generate(build, assign=None, tail='end'):
    build = Path(build)
    o = elfcmp.m.Elf(elfcmp.ORIG.resolve()); c = elfcmp.m.Elf((build / 'symbols.so').resolve())
    k = elfcmp.Corr(o, c)
    secs = [s for s in parse_map(build / 'link.map') if s['out'] == '.text' and s['size'] > 0]
    by_addr = {s['addr']: s for s in secs}
    used, order, notes = set(), [], {}
    name = lambda a: k.cf[a]['name']
    unm_c = [a for a in k.cstarts if a not in k.c2o]
    assign = dict(assign or {})
    for oa in k.ostarts:
        wid = k.id[oa]
        if oa in k.o2c:
            ca = k.o2c[oa]
        elif wid in assign:
            hits = [a for a in unm_c if assign[wid] in name(a)]
            assert len(hits) == 1, (wid, assign[wid], [name(a) for a in hits])
            ca = hits[0]
        else:
            # unmapped candidate function between the counterparts of the matched neighbours
            prev = max([k.o2c[x] for x in k.ostarts if x < oa and x in k.o2c] or [0])
            nxt = min([k.o2c[x] for x in k.ostarts if x > oa and x in k.o2c] or [1 << 62])
            hits = [a for a in unm_c if prev < a < nxt and a not in used]
            if not hits:
                notes[wid] = 'no candidate'; continue
            ca = hits[0]
        s = by_addr.get(ca)
        assert s is not None, (wid, ca)
        if ca in used: notes[wid] = 'duplicate'; continue
        used.add(ca); order.append(s); notes.setdefault(wid, name(ca)[:100] if oa not in k.o2c else None)
    rest = [s for s in secs if s['addr'] not in used]
    return order, rest, {w: n for w, n in notes.items() if n}


def data_entries(build):
    """explicit .rodata / .data.rel.ro lists in original order (datamap binding); merged synthetic sections are
    placed by their first anchored piece; unbound candidate objects follow in their current order."""
    import datamap
    r = datamap.analyze(build)
    out = {}
    for sec in datamap.DATA:
        rows = r[sec]['rows']
        keyed = sorted([((x['o_off'] if x['o_off'] is not None else x['merged_key']), n, x) for n, x in enumerate(rows)
                        if x['o_off'] is not None or x['merged_key'] is not None], key=lambda t: (t[0], t[1]))
        unb = [x for x in rows if x['o_off'] is None and x['merged_key'] is None]
        ent = lambda x: ('    *(%s)' % x['section']) if x['file'] == '*<internal>' else '    %s("%s")' % (x['file'], x['section'])
        out[sec] = [ent(x) for _, _, x in keyed] + [ent(x) for x in unb]
    return out


def write(build, out_ld, order, rest, data=None):
    src = (Path(build) / 'ordered.ld').read_text().splitlines()
    i = next(n for n, l in enumerate(src) if l.strip() == '.text : {')
    j = next(n for n in range(i, len(src)) if src[n].strip() == '*(.text*)')
    body = [entry(s) for s in order + rest]
    lines = src[:i + 1] + body + src[j:]
    if data:
        res = []
        for l in lines:
            t = l.strip()
            if t == '.rodata : { *(.rodata*) } :rodata':
                res += ['  .rodata : {'] + data['.rodata'] + ['    *(.rodata*)', '  } :rodata']
            elif t == '.data.rel.ro : { *(.data.rel.ro*) } :rodata':
                res += ['  .data.rel.ro : {'] + data['.data.rel.ro'] + ['    *(.data.rel.ro*)', '  } :rodata']
            else:
                res.append(l)
        assert len(res) > len(lines), 'data section lines not found'
        lines = res
    Path(out_ld).write_text('\n'.join(lines) + '\n')


if __name__ == '__main__':
    a = sys.argv[1:]
    assign = {}
    while '--assign' in a:
        i = a.index('--assign'); w, s = a[i + 1].split('=', 1); assign[w] = s; del a[i:i + 2]
    rep = None
    if '--report' in a:
        i = a.index('--report'); rep = a[i + 1]; del a[i:i + 2]
    nodata = '--text-only' in a
    if nodata: a.remove('--text-only')
    order, rest, notes = generate(a[0], assign)
    write(a[0], a[1], order, rest, None if nodata else data_entries(a[0]))
    print('windows bound', len(order), 'tail', len(rest), 'notes', notes)
    print('tail:', [s['section'][:70] for s in rest][:12])
    if rep: Path(rep).write_text(json.dumps(dict(order=[s['section'] for s in order], tail=[s['section'] for s in rest], notes=notes), indent=1))
