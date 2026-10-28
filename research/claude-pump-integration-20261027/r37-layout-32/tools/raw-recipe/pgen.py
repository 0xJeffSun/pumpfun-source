#!/usr/bin/env python3
"""[mg-P-raw] generate an ordered.ld reproducing the original Pump layout (port of mg-M-raw gen_ordered.py).

usage: pgen.py BUILD_OUT OUT_LD [--text-only] [--unbound-slot] [--report OUT.json]
BUILD_OUT = a pbuild.py/prelink.py output of the CURRENT source (unstripped.so + link map + recorded default.ld).
.text: every original window (address order) -> the candidate input section of its normalized counterpart; unmatched
windows -> the candidate function their matched callers call (pbind.py), placed in the window's slot; candidate-only
functions follow all windows in their current relative order.
.rodata/.data.rel.ro: candidate objects in original order (pdatamap binding); merged constant sections at their first
anchored piece; unbound objects after the bound ones in current order.
Everything else = the SDK default script."""
from pathlib import Path
import json, sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pk, pbind, pdatamap


def find(build, *names):
    for n in names:
        p = Path(build) / n
        if p.exists(): return p
    raise FileNotFoundError(names)


def text_order(build):
    o = pk.Elf(pk.ORIG); c = pk.Elf(Path(build) / 'unstripped.so'); k = pk.Corr(o, c)
    secs = [s for s in pk.parse_map(pdatamap.mapfile(build)) if s['out'] == '.text' and s['size'] > 0]
    by_addr = {s['addr']: s for s in secs}
    bound, conf = pbind.bind_unmatched(o, c, k)
    order, used, notes = [], set(), {}
    for oa in k.ostarts:
        ca = k.o2c.get(oa) or bound.get(oa)
        if ca is None: notes[hex(oa)] = 'unmatched, unbound'; continue
        if ca in used: notes[hex(oa)] = 'duplicate'; continue
        s = by_addr.get(ca)
        assert s is not None, (hex(oa), hex(ca))
        used.add(ca); order.append(s)
    rest = [s for s in secs if s['addr'] not in used]
    return order, rest, notes


def entry(s):
    return '    %s("%s")' % (s['pattern'], s['section'])


def data_entries(build):
    r = pdatamap.analyze(build)
    out = {}
    for sec in pdatamap.DATA:
        rows = r[sec]['rows']
        keyed = sorted([((x['o_off'] if x['o_off'] is not None else x['merged_key']), n, x) for n, x in enumerate(rows)
                        if x['o_off'] is not None or x['merged_key'] is not None], key=lambda t: (t[0], t[1]))
        unb = [x for x in rows if x['o_off'] is None and x['merged_key'] is None]
        ent = lambda x: ('    *(%s)' % x['section']) if x['file'] == '*<internal>' else '    %s("%s")' % (x['file'], x['section'])
        out[sec] = [ent(x) for _, _, x in keyed] + [ent(x) for x in unb]
    return out, r


def write(build, out_ld, order, rest, data=None):
    src = find(build, 'link/linkin/default.ld').read_text().splitlines()
    res = []
    for l in src:
        t = l.strip()
        if t == '.text : { *(.text*) } :text':
            res += ['  .text : {'] + [entry(s) for s in order + rest] + ['    *(.text*)', '  } :text']
        elif data and t == '.rodata : { *(.rodata*) } :rodata':
            res += ['  .rodata : {'] + data['.rodata'] + ['    *(.rodata*)', '  } :rodata']
        elif data and t == '.data.rel.ro : { *(.data.rel.ro*) } :rodata':
            res += ['  .data.rel.ro : {'] + data['.data.rel.ro'] + ['    *(.data.rel.ro*)', '  } :rodata']
        else:
            res.append(l)
    assert len(res) > len(src) + 100
    Path(out_ld).write_text('\n'.join(res) + '\n')


if __name__ == '__main__':
    a = sys.argv[1:]
    rep = a[a.index('--report') + 1] if '--report' in a else None
    order, rest, notes = text_order(a[0])
    data, r = (None, None) if '--text-only' in a else data_entries(a[0])
    write(a[0], a[1], order, rest, data)
    print('text: windows placed %d, tail %d (%d B), notes %d' % (len(order), len(rest), sum(s['size'] for s in rest), len(notes)))
    if rep: Path(rep).write_text(json.dumps(dict(order=[s['section'] for s in order], tail=[s['section'] for s in rest], notes=notes), indent=1))
