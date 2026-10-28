#!/usr/bin/env python3
"""Scorer for lane mg-M-o83b (O0083 = buy_v2_handler, orig 140512..159160).

  sc.py win SYMBOLS.so                  -> O0081/O0082/O0083/O0084 report (winreport metric: norm_eq + diffslots)
  sc.py mv SYMBOLS.so [labels.json]     -> score every o83v_<i> fn (+ REAL buy_v2_handler) vs orig O0083
  sc.py diff SYMBOLS.so [PAT] [--m] [--m3] [--ctx N] [--max N] -> hunks (orig vs cand); --m masks regs, --m3 regs+stack
"""
import sys, re, json, difflib
B = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0, B)
import sbfdis
O = sbfdis.elf('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/wt/evidence/original/mayhem/deployed.so')
WINS = [('O0081', 113672, 127520, 'legacy_buy_handler'), ('O0082', 127520, 140512, 'legacy_sell_handler'),
        ('O0083', 140512, 159160, 'buy_v2_handler'), ('O0084', 159160, 177256, 'sell_v2_handler')]
_oc = {}

def seq(E, s, e, mode=0):
    out = []
    for x in sbfdis.window_insns(E, s, e):
        t = x['norm']
        if mode >= 1: t = re.sub(r'\br\d+\b', 'r', t)
        if mode >= 2:
            t = re.sub(r'@\d+', '@', t); t = re.sub(r'add64 r, -\d+', 'add64 r, -N', t); t = re.sub(r'[-+]0x[0-9a-f]+\]', ']', t); t = re.sub(r'[-+]\d+\]', ']', t)
        out.append((x['pc'] - s, t))
    return out

def orig(wid, mode):
    k = (wid, mode)
    if k not in _oc:
        w = [x for x in WINS if x[0] == wid][0]; _oc[k] = seq(O, w[1], w[2], mode)
    return _oc[k]

def nd(a, b):
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    return sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal'), sm

def score(C, a, b, wid='O0083'):
    r = []
    for mode in (0, 1, 2):
        o = [t for _, t in orig(wid, mode)]; k = [t for _, t in seq(C, a, b, mode)]
        r.append(nd(o, k)[0])
    w = [x for x in WINS if x[0] == wid][0]
    eq = (w[2] - w[1] == b - a) and r[0] == 0
    return b - a, eq, r

def find(cf, pat):
    return [(a, b, n) for a, (b, n) in cf.items() if pat in n]

def cmd_win(path):
    C = sbfdis.elf(path); cf = sbfdis.funcs(C)
    for wid, s, e, pat in WINS:
        c = find(cf, pat)
        if not c: print(f'{wid}: no cand'); continue
        a, b, n = c[0]; sz, eq, r = score(C, a, b, wid)
        print(f'{wid}: orig {e-s} cand {sz} norm_eq={eq} slots={r[0]} mreg={r[1]} mstk={r[2]} ({len(c)} cand)')

def cmd_mv(path, labels=None):
    C = sbfdis.elf(path); cf = sbfdis.funcs(C); res = []
    for a, (b, n) in cf.items():
        m = re.search(r'o83v_(\d+)17h', n)
        if m: i = int(m.group(1)); res.append((i, labels[i] if labels and i < len(labels) else '?', score(C, a, b)))
        elif 'buy_v2_handler' in n: res.append((-1, 'REAL', score(C, a, b)))
    res.sort()
    for i, l, (sz, eq, r) in res:
        print(f'{i:3d} slots={r[0]:4d} mreg={r[1]:4d} mstk={r[2]:4d} len={sz:6d} eq={int(eq)}  {l}')
    return res

def cmd_diff(path, pat, mode, ctx, mx):
    C = sbfdis.elf(path); cf = sbfdis.funcs(C)
    a, b, n = find(cf, pat)[0]
    o = orig('O0083', mode); k = seq(C, a, b, mode)
    d, sm = nd([t for _, t in o], [t for _, t in k])
    print(f'{n[-60:]} len {b-a} slots {d}')
    shown = 0
    for t, i1, i2, j1, j2 in sm.get_opcodes():
        if t == 'equal': continue
        print(f'@@ {t} O[{o[i1][0] if i1 < len(o) else -1}:+{i2-i1}] C[{k[j1][0] if j1 < len(k) else -1}:+{j2-j1}]')
        for x in range(max(0, i1 - ctx), i1): print('   ', o[x][1])
        for x in range(i1, i2): print(' - ', o[x][1])
        for x in range(j1, j2): print(' + ', k[x][1])
        shown += 1
        if shown >= mx: break

if __name__ == '__main__':
    av = sys.argv[1:]
    def opt(name, d):
        if name in av: i = av.index(name); v = av[i + 1]; del av[i:i + 2]; return int(v)
        return d
    ctx = opt('--ctx', 0); mx = opt('--max', 40)
    mode = 2 if '--m3' in av else 1 if '--m' in av else 0
    av = [x for x in av if not x.startswith('--')]
    if av[0] == 'win': cmd_win(av[1])
    elif av[0] == 'mv': cmd_mv(av[1], json.load(open(av[2])) if len(av) > 2 else None)
    elif av[0] == 'diff': cmd_diff(av[1], av[2] if len(av) > 2 else 'buy_v2_handler', mode, ctx, mx)
