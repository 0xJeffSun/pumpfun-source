#!/usr/bin/env python3
"""phisearch.py BASE.ll OUTDIR [start_order_json] [--free-ptr] [--rev]
Steepest-descent over join-block phi orders (insertion moves) scored by llc pos (true norm metric) then nd.
Indices refer to the join phi group (0,1 = ptr phis; 2.. = let phis in BASE order).
Constraint: index QVB before SVB (or after with --rev). Prints only improvements."""
import sys, os, json, subprocess, itertools
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/exps')
from multiprocessing import Pool
import irx, objsec
base_ll, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
S = open(base_ll).read(); st, en = irx.span(S); BODY = S[st:en]
LS = BODY.split('\n')
i = next(k for k, l in enumerate(LS) if l.lstrip().startswith('%quote_vault_balance.sroa.0.0 = phi'))
s = i
while ' = phi ' in LS[s - 1]: s -= 1
e = i
while ' = phi ' in LS[e + 1]: e += 1
GRP = LS[s:e + 1]; N = len(GRP)
NAMES = [g.split('=')[0].strip() for g in GRP]
QVB = NAMES.index('%quote_vault_balance.sroa.0.0'); SVB = NAMES.index('%sol_vault_balance.sroa.0.0')
FREE_PTR = '--free-ptr' in sys.argv; REV = '--rev' in sys.argv
LLC = irx.LLC
def ok(o):
    if not FREE_PTR and (o[0] != 0 or o[1] != 1): return False
    return (o.index(QVB) < o.index(SVB)) != REV
def ev(o):
    o = list(o); tag = '_'.join(map(str, o))
    ls = LS[:]; ls[s:e + 1] = [GRP[k] for k in o]
    p = f'{outdir}/{tag}.ll'; ob = f'{outdir}/{tag}.o'
    open(p, 'w').write(S[:st] + '\n'.join(ls) + S[en:])
    r = subprocess.run([LLC, '-O3', '-mtriple=sbf', '-mcpu=generic', '-relocation-model=pic', '-function-sections',
                        '-filetype=obj', p, '-o', ob], capture_output=True)
    os.remove(p)
    if r.returncode: return (o, None)
    secs = objsec.sections(ob); key = [k for k in secs if irx.PAT in k and k.startswith('.text')][0]
    sc = irx.score(secs[key]); os.remove(ob)
    return (o, (sc[1], sc[3], sc[0]))
def neigh(o):
    out = set()
    lo = 0 if FREE_PTR else 2
    for a in range(lo, N):
        x = o[a]; r = o[:a] + o[a + 1:]
        for b in range(lo, N):
            c = tuple(r[:b] + [x] + r[b:])
            if c != tuple(o) and ok(list(c)): out.add(c)
    return out
start = json.loads(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].startswith('[') else list(range(N))
seen = {}
with Pool(int(os.environ.get('NP', '4'))) as P:
    cur = tuple(start); seen[cur] = ev(cur)[1]; best = seen[cur]
    print('start', list(cur), best, flush=True)
    while True:
        cand = [c for c in neigh(list(cur)) if c not in seen]
        for o, sc in P.imap_unordered(ev, cand):
            seen[tuple(o)] = sc
        nb = min((v, k) for k, v in seen.items() if v is not None)
        if nb[0] < best:
            best, cur = nb[0], nb[1]; print('improve', list(cur), best, flush=True)
        else:
            break
json.dump({'names': NAMES, 'results': [[list(k), v] for k, v in seen.items()]}, open(outdir + '/results.json', 'w'))
print('final', list(cur), best, 'evaluated', len(seen))
