"""Exhaustive/random check: candidate gross = net + calculate_fee(pre_fee(net)) vs original gross = pre_fee(net)
(Token-2022 Fee math exactly as pump-token-ext / spl-token-2022: ceil fee capped at maximum_fee; ceil pre-fee)."""
import random
U64 = (1 << 64) - 1
def fee(bps, mx, pre):
    if pre == 0 or bps == 0: return 0
    raw = (pre * bps + 10000 - 1) // 10000
    return min(raw, mx)
def pre_fee(bps, mx, post):
    if bps == 0: return post
    if post == 0: return 0
    if bps == 10000:
        s = mx + post; return s if s <= U64 else None
    d = 10000 - bps; p = (post * 10000 + d - 1) // d
    if p - post >= mx:
        s = post + mx; return s if s <= U64 else None
    return p if p <= U64 else None
def cand(bps, mx, net):
    p = pre_fee(bps, mx, net)
    if p is None: return ('err', 'pre')
    g = net + fee(bps, mx, p)
    return ('err', 'add') if g > U64 else ('ok', g)
def orig(bps, mx, net):
    p = pre_fee(bps, mx, net)
    return ('err', 'pre') if p is None else ('ok', p)
n = bad = 0
for bps in list(range(0, 10001)):
    for mx in (0, 1, 2, 3, 7, 100, 9999, 10**6, U64):
        for net in (0, 1, 2, 3, 9, 99, 9999, 10000, 10001, 12345, 99999, 10**9 + 7, U64 // 3, U64 - 1, U64):
            n += 1
            if cand(bps, mx, net) != orig(bps, mx, net):
                bad += 1
                if bad <= 5: print('DIFF', bps, mx, net, cand(bps, mx, net), orig(bps, mx, net))
rng = random.Random(7)
for _ in range(2_000_000):
    bps = rng.randrange(0, 10001); mx = rng.choice([rng.randrange(0, 50), rng.randrange(0, 10**9), rng.randrange(0, U64 + 1)])
    net = rng.choice([rng.randrange(0, 10**6), rng.randrange(0, 10**12), rng.randrange(0, U64 + 1)])
    n += 1
    if cand(bps, mx, net) != orig(bps, mx, net):
        bad += 1
        if bad <= 5: print('DIFF', bps, mx, net, cand(bps, mx, net), orig(bps, mx, net))
print('cases', n, 'differences', bad)
