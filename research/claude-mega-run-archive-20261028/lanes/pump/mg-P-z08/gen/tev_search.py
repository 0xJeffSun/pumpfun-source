#!/usr/bin/env python3
"""Random-mutation search over trade_event literal orders (IR multiplex). Usage: tev_search.py ROUNDS PER_ROUND SEED"""
import random, subprocess, sys, json, re, os, shutil
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08'
ns = {}; exec(open(f'{L}/gen/tev_vars.py').read(), ns)
FIELDS, lit, LET_A, LET_B, QM = ns['FIELDS'], ns['lit'], ns['LET_A'], ns['LET_B'], ns['QM']
D = dict(FIELDS)
rounds, per, seed = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]); rnd = random.Random(seed)
state_f = f'{L}/v/search_state.json'
best = json.load(open(state_f)) if os.path.exists(state_f) else {'order': [k for k, _ in ns['G2']], 'let': 'B', 'score': [129, -0.5928]}
def body(order, let):
    return (LET_B if let == 'B' else LET_A) + QM + lit([(k, D[k]) for k in order])
def mutate(o):
    o = list(o)
    for _ in range(rnd.choice([1, 1, 2, 3])):
        i = rnd.randrange(len(o)); x = o.pop(i); o.insert(rnd.randrange(len(o) + 1), x)
    return o
log = open(f'{L}/v/search.log', 'a')
for r in range(rounds):
    cands = {}
    for k in range(per):
        o = mutate(best['order']); let = best['let'] if rnd.random() < 0.85 else ('A' if best['let'] == 'B' else 'B')
        cands[f'r{r}k{k}'] = (o, let)
    open(f'{L}/gen/tev_vars_search.py', 'w').write('')
    src = f'{L}/v/tevS/src'
    shutil.rmtree(f'{L}/v/tevS', ignore_errors=True); os.makedirs(f'{L}/v/tevS')
    subprocess.run(['cp', '-c', '-R', f'{L}/src', src], check=True)
    p = src + '/src/multi_hop_curve_swap.rs'; t = open(p).read()
    SIG = "(curve:&BondingCurve,global:&Global,volume:&VolumeSnapshot,user:&Pubkey,mint:&Pubkey,is_buy:bool,token_amount:u64,quote_amount:u64,fees:&(u64,u64,u64,u64),buyback_fee:u64,unparsed_trailing_field:u64,ix_name:&str,timestamp:i64)->TradeEvent"
    for name, (o, let) in cands.items():
        t += f"\n#[inline(never)]\npub fn trade_event_{name}{SIG}{{\n{body(o, let)}\n}}\n"
    open(p, 'w').write(t)
    b = subprocess.run([f'{L}/tools/irb.sh', src, 'tevS'], capture_output=True, text=True)
    if 'FAILED' in b.stdout: log.write(f'round {r} build failed\n'); log.flush(); continue
    ir = f'{L}/ir/tevS.ll'; irt = open(ir).read()
    for name, (o, let) in cands.items():
        fn = f'trade_event_{name}17'
        if re.search(r'@\S*' + fn + r'\S* = .*alias', irt): continue
        subprocess.run([sys.executable, '-B', f'{L}/../mg-P-z06/tools/xfn.py', ir, fn, f'{L}/llx/S.ll'], capture_output=True)
        out = subprocess.run([f'{L}/tools/llt.sh', f'{L}/llx/S.ll', 'S', '0x8bbd0', fn], capture_output=True, text=True).stdout
        m = re.search(r'size (\d+) .*ratio=([\d.]+) diffslots=(\d+)', out)
        if not m: continue
        sc = [int(m.group(3)) + (0 if m.group(1) == '1800' else 4), -float(m.group(2))]
        log.write(f'{name} {let} size={m.group(1)} ratio={m.group(2)} diff={m.group(3)}\n')
        if sc < best['score']:
            best = {'order': o, 'let': let, 'score': sc}; json.dump(best, open(state_f, 'w'))
            log.write(f'  NEW BEST {sc}\n')
        if 'MATCH' in out: log.write('  MATCH!\n')
    log.flush()
log.write(f'done best={best["score"]}\n'); log.close()
