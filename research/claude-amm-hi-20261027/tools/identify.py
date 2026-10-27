#!/usr/bin/env python3
"""Map unmatched original windows in range to nearest candidate symbols via
callee labels (matched windows) and referenced rodata strings."""
import sys, json, collections, re, struct, argparse
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from common import *

ap = argparse.ArgumentParser()
ap.add_argument('--candidate', default=str(FRONT / 'results/build/candidate.so'))
ap.add_argument('--symbols', default=str(FRONT / 'results/build/unstripped.so'))
ap.add_argument('--measure', default=str(FRONT / 'results/measurement.json.gz'))
ap.add_argument('--lo', type=lambda x: int(x, 0), default=LO)
ap.add_argument('--hi', type=lambda x: int(x, 0), default=HI)
ap.add_argument('--out', default=None)
a = ap.parse_args()

o = Elf(ORIG); c = Elf(Path(a.candidate)); s = Elf(Path(a.symbols))
m = load_measure(a.measure)
rows = m['rows']
# label maps
olabel = {}
cname2label = {}
for r in rows:
    if r['matches']:
        lab = 'M%x' % r['start']
        olabel[r['start']] = lab
        for mm in r['matches']:
            cname2label[mm['start']] = lab
cfuncs = {f['start']: f for f in s.funcs}

def strref(elf, v):
    name, sec = section_of(elf, v)
    if not sec:
        return None
    if name == '.rodata':
        raw = read_cstr(elf, v, 40)
        txt = re.match(rb'[\x20-\x7e]{4,}', raw)
        if txt:
            return 'S:' + txt.group(0)[:24].decode()
        return None
    if name == '.data.rel.ro':
        off = sec[4] + (v - sec[3])
        ptr = struct.unpack_from('<Q', elf.b, off)[0]
        ln = struct.unpack_from('<Q', elf.b, off + 8)[0]
        n2, s2 = section_of(elf, ptr)
        if s2 and n2 == '.rodata' and 0 < ln < 200:
            raw = read_cstr(elf, ptr, ln)
            if re.fullmatch(rb'[\x20-\x7e]+', raw):
                return 'P:' + raw.decode()
    return None

def sig(elf, start, end, is_orig):
    calls = collections.Counter()
    for at, tgt in elf.calls.items():
        if start <= at < end:
            if is_orig:
                calls[olabel.get(tgt, 'U')] += 1
            else:
                calls[cname2label.get(tgt, 'U')] += 1
    # syscalls / external relocs
    for at, r in elf.relocations.items():
        if start <= at < end and r['type'] == 10:
            calls['X:' + r['symbol']] += 1
    strs = collections.Counter()
    for off, v in lddw_targets(elf, start, end):
        t = strref(elf, v)
        if t:
            strs[t] += 1
    return calls, strs

def jacc(a, b):
    keys = set(a) | set(b)
    if not keys:
        return 0.0
    inter = sum(min(a[k], b[k]) for k in keys)
    uni = sum(max(a[k], b[k]) for k in keys)
    return inter / uni

matched_cands = set(cname2label)
cand_sigs = {}
for f in s.funcs:
    cand_sigs[f['start']] = (f, sig(s, f['start'], f['start'] + f['size'], False))

out = []
for r in rows:
    if r['matches'] or not (a.lo <= r['start'] <= a.hi):
        continue
    st, en = r['start'], r['end']
    size = en - st
    calls, strs = sig(o, st, en, True)
    best = []
    for cs, (f, (cc, cstr)) in cand_sigs.items():
        sr = min(size, f['size']) / max(size, f['size'])
        if sr < 0.5:
            continue
        score = 0.45 * jacc(calls, cc) + 0.35 * jacc(strs, cstr) + 0.2 * sr
        best.append((score, cs, f['name'], f['size'], cs in matched_cands))
    best.sort(reverse=True)
    out.append({'start': st, 'size': size, 'calls': dict(calls), 'strs': dict(strs),
                'best': [{'score': round(b[0], 3), 'cstart': b[1], 'name': b[2], 'csize': b[3], 'cand_matched_elsewhere': b[4]} for b in best[:4]]})
for e in out:
    b0 = e['best'][0] if e['best'] else None
    print('%6x %5d  ->  %s' % (e['start'], e['size'], ('%.3f %5d %s%s' % (b0['score'], b0['csize'], b0['name'][:110], ' [M]' if b0['cand_matched_elsewhere'] else '')) if b0 else '-'))
    for b in e['best'][1:3]:
        print('              alt %.3f %5d %s%s' % (b['score'], b['csize'], b['name'][:110], ' [M]' if b['cand_matched_elsewhere'] else ''))
if a.out:
    Path(a.out).write_text(json.dumps(out, indent=1))
