#!/usr/bin/env python3
"""Numeric-only scorer for O0084 (never prints instructions).
usage: sc.py SYMBOLS.so [labels.json|VARIANTS.py]  -> REAL sell_v2_handler + every o84hv_<i> variant:
   idx masked-lines first-diff-offset len  regions P(<2000) C(2000-3200) M(3200-15000) A(15000-16200) T(>=16200)  label"""
import sys, re, json, difflib, importlib.util
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build')
import irx, objsec, sbfdis
O = irx.O; W = irx.W
APC = [pc for pc, raw in objsec.insns(O.b[W[1]:W[2]])]
B = [(0, 'P'), (2000, 'C'), (3200, 'M'), (15000, 'A'), (16200, 'T')]
def bucket(off):
    r = 'P'
    for lo, n in B:
        if off >= lo: r = n
    return r
def regions(code):
    ml = irx.masked_lines(code, 0)
    sm = difflib.SequenceMatcher(a=irx.ORIG_LINES, b=ml, autojunk=False)
    cnt = {n: 0 for _, n in B}; first = None; tot = 0
    for t, i1, i2, j1, j2 in sm.get_opcodes():
        if t == 'equal': continue
        off = APC[i1] if i1 < len(APC) else APC[-1]
        if first is None: first = off
        k = max(i2 - i1, j2 - j1); tot += k; cnt[bucket(off)] += k
    return tot, first, cnt
def fmt(i, code, label):
    tot, first, cnt = regions(code)
    return f'{i:3d} {tot:4d} first={first} len={len(code):6d}  ' + ' '.join(f'{k}{v}' for k, v in cnt.items()) + f'  {label}'
def main(so, lab=None):
    labels = []
    if lab:
        if lab.endswith('.json'): labels = json.load(open(lab))
        else:
            spec = importlib.util.spec_from_file_location('v', lab); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
            labels = [v[0] for v in m.VARIANTS]
    C = sbfdis.elf(so); cf = sbfdis.funcs(C); rows = []
    for a, (b, n) in cf.items():
        mm = re.search(r'o84hv_(\d+?)17h', n)
        if mm: i = int(mm.group(1)); rows.append((i, C.b[a:b], labels[i] if i < len(labels) else '?'))
        elif 'sell_v2_handler' in n: rows.append((-1, C.b[a:b], 'REAL'))
    for i, code, l in sorted(rows, key=lambda r: r[0]): print(fmt(i, code, l), flush=True)
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
