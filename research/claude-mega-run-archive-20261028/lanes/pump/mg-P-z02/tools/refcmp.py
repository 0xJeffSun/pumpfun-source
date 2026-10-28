#!/usr/bin/env python3
"""refcmp.py <orig_start> <cand.so> <symregex> [score.json]: behaviour check for a (normalized-)matched window.
Compares the masked operands: lddw targets (bytes at the address, 24 B) and call targets (orig window start ->
candidate symbols matched to it per score.json vs the candidate call's symbol). Prints only mismatches + counts."""
import sys, re, struct, json, bisect
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import sections, original_windows, BASE, candidate_functions
from win import Cand, demangle
st = int(sys.argv[1], 0); cand = Cand(sys.argv[2]); rx = sys.argv[3]
sc = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else None
W = original_windows(); w = next(x for x in W if x['start'] == st)
orig = (BASE / 'original.so').read_bytes(); osec = sections(orig)
cs = [(s, n, nm) for s, n, nm in cand.funcs if re.search(rx, demangle(nm))]
s, n, nm = cs[0]; craw = cand.fn(s, n); oraw = w['raw']
def rd(img, secs, a, k):
    for x in secs.values():
        if x['addr'] and x['addr'] <= a < x['addr'] + x['size']:
            o = a - x['addr'] + x['offset']; return img[o:o + k]
    return None
def ops(raw, base):
    i = 0; out = []
    while i < len(raw):
        op, regs, off, imm = struct.unpack_from('<BBhi', raw, i)
        if op == 0x18:
            v = struct.unpack_from('<I', raw, i + 4)[0] | struct.unpack_from('<I', raw, i + 12)[0] << 32
            out.append(('lddw', base + i, v)); i += 16; continue
        if op == 0x85 and regs >> 4 == 1 and imm != -1:
            out.append(('call', base + i, base + i + 8 + imm * 8))
        i += 8
    return out
oo = ops(oraw, st); co = ops(craw, s)
assert len(oo) == len(co), (len(oo), len(co))
wst = sorted(x['start'] for x in W)
cf = sorted(candidate_functions(sys.argv[2])); cst = [f[0] for f in cf]
bad = 0; nl = nc = 0
for (k, oa, ov), (k2, ca, cv) in zip(oo, co):
    assert k == k2
    if k == 'lddw':
        ob = rd(orig, osec, ov, 24); cb = rd(cand.blob, cand.secs, cv, 24)
        if ob is None and cb is None:
            if ov != cv: print('lddw imm differs', hex(oa), hex(ov), hex(cv)); bad += 1
            continue
        nl += 1
        if ob != cb:
            def pieces(img, secs, a):
                out = []
                for i in range(4):
                    b = rd(img, secs, a + 16 * i, 16)
                    if not b: break
                    q, l = struct.unpack('<QQ', b); q = q >> 32 if q >> 40 else q
                    sb = rd(img, secs, q, l) if 0 < l < 300 else None
                    if sb is None: break
                    out.append(sb)
                return out
            po, pc = pieces(orig, osec, ov), pieces(cand.blob, cand.secs, cv)
            if po and pc:
                if po != pc: print('pieces differ', hex(oa), po, pc); bad += 1
                continue
            if ob[:4] != cb[:4]:
                print('lddw', hex(oa), hex(ca), ob, cb); bad += 1; continue
            k = next((i for i in range(24) if ob[i] != cb[i]), 24)
            print('lddw same first', k, 'bytes', hex(oa), ob[:k])
    else:
        nc += 1
        j = bisect.bisect_right(cst, cv) - 1; csym = demangle(cf[j][2]) if j >= 0 and cf[j][0] == cv else '?'
        if sc:
            ent = sc['windows'].get(str(ov))
            osyms = [demangle(x) for x in ent['symbols']] if ent and ent.get('normalized') else None
            if osyms is None:
                print('call', hex(oa), 'orig target', hex(ov), 'unmatched window; cand ->', csym[:90]); continue
            if csym not in osyms:
                print('call MISMATCH', hex(oa), hex(ov), osyms[:1], '!=', csym[:90]); bad += 1
print(f'{nm[:60]}: lddw {nl} calls {nc} mismatches {bad}')
