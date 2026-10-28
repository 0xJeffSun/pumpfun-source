#!/usr/bin/env python3
"""Multi-variant source brute force for O0084 (sell_v2_handler).

usage:
  mv.py make ROOTNAME VARIANTS.py      -> roots/ROOTNAME = BASEROOT + every variant as pub fn o84hv_<i>
                                          dispatched from sell_v2::handler on retained_reserve_bps magic.
  mv.py score SYMBOLS.so VARIANTS.py   -> score each o84hv_<i> function against original O0084.

VARIANTS.py defines:
  BASEROOT (optional, default roots/base)
  VARIANTS = [(label, handler_source_text, {path_rel_src: (old,new), ...} extra helper edits or None)]
  handler_source_text must define `pub fn sell_v2_handler(` (renamed automatically).
  helper edits are applied once to the shared tree (so they must be additive: new helpers, not changed ones).
"""
import sys, os, re, shutil, importlib.util, json
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c'
sys.path.insert(0, L + '/tools')

def load(p):
    spec = importlib.util.spec_from_file_location('variants', p); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

def make(rootname, vp):
    m = load(vp)
    base = getattr(m, 'BASEROOT', L + '/roots/base')
    dst = L + '/roots/' + rootname
    assert os.path.realpath(dst).startswith(L + '/roots/'), dst
    if os.path.exists(dst): shutil.rmtree(dst)
    import subprocess; subprocess.run(['cp', '-c', '-R', base, dst], check=True)
    src = dst + '/programs/mayhem/src/'
    extra = getattr(m, 'EXTRA', [])  # list of (relpath, old, new) applied once
    for rel, text in getattr(m, 'APPEND', []):
        open(src + rel, 'a').write(text)
    for rel, old, new in extra:
        s = open(src + rel).read(); assert old in s, (rel, old[:80]); s = s.replace(old, new, 1); open(src + rel, 'w').write(s)
    p = src + 'instructions/pump_interface_v2.rs'
    s = open(p).read()
    arms = []
    for i, (label, text, _) in enumerate(m.VARIANTS):
        t = text.replace('pub fn sell_v2_handler(', f'pub fn o84hv_{i}(', 1)
        assert f'o84hv_{i}(' in t, label
        s += f'\n// variant {i}: {label}\n' + t + '\n'
        arms.append(f'{60000+i}=>super::pump_interface_v2::o84hv_{i}(ctx,r,t,b),')
    open(p, 'w').write(s)
    q = src + 'instructions/sell_v2.rs'
    s = open(q).read()
    old = 'pub use super::pump_interface_v2::sell_v2_handler as handler;'
    assert old in s
    s = s.replace(old, 'pub fn handler(ctx:Context<SellV2>,r:u128,t:u16,b:u16)->Result<()>{ match b { ' + ' '.join(arms) +
                  ' _=>super::pump_interface_v2::sell_v2_handler(ctx,r,t,b) } }')
    open(q, 'w').write(s)
    json.dump([v[0] for v in m.VARIANTS], open(dst + '/variants.json', 'w'))
    print('made', dst, len(m.VARIANTS))

def score(so, labels):
    import irx, sbfdis
    C = sbfdis.elf(so); cf = sbfdis.funcs(C)
    res = []
    for a, (b, n) in cf.items():
        mm = re.search(r'o84hv_(\d+?)17h', n)
        if mm:
            i = int(mm.group(1)); res.append((i, labels[i] if i < len(labels) else '?', irx.score(C.b[a:b])))
        elif 'sell_v2_handler' in n:
            res.append((-1, 'REAL', irx.score(C.b[a:b])))
    res.sort()
    for i, l, sc in res: print(f'{i:3d} {sc[3]:4d} pos={sc[1]:5d} r={sc[2]:.4f} len={sc[0]:6d}  {l}')
    return res

if __name__ == '__main__':
    if sys.argv[1] == 'make': make(sys.argv[2], sys.argv[3])
    else:
        lab = json.load(open(sys.argv[3])) if sys.argv[3].endswith('.json') else [v[0] for v in load(sys.argv[3]).VARIANTS]
        score(sys.argv[2], lab)
