import difflib
from collections import defaultdict, Counter

ORIG = open('/tmp/fees_orig.text', 'rb').read()
CAND = open('/tmp/fees_cand_u.text', 'rb').read()
BASE = 0x120

def toks(b):
    out = []; i = 0
    while i + 8 <= len(b):
        if b[i] == 0x18 and i + 16 <= len(b):
            out.append(b[i:i+16]); i += 16; continue
        out.append(b[i:i+8]); i += 8
    return out

def key(raw):
    op = raw[0]
    if len(raw) == 16:
        return (0x18, raw[1])
    dst = raw[1] & 0xf; src = (raw[1] >> 4) & 0xf
    off = raw[2:4]; imm = raw[4:8]
    store = op in (0x7b,0x73,0x6b,0x63,0x7a,0x72,0x62)
    load = op in (0x79,0x71,0x69,0x61)
    if store and dst == 10: off = b'FF'
    if load and src == 10: off = b'FF'
    if op == 0x85: imm = bytes(4)
    return (op, raw[1], off, imm)

def is_frame_store(raw):
    return len(raw) == 8 and raw[0] in (0x7b,0x73,0x6b,0x63,0x7a,0x72,0x62) and (raw[1] & 0xf) == 10

O = toks(ORIG)
K = 6
pos = defaultdict(list)
for i in range(len(O) - K + 1):
    pos[tuple(key(O[i+j]) for j in range(K))].append(i)

syms = []
for ln in open('/tmp/cand_syms.txt'):
    a, s_, n = ln.split(None, 2)
    if int(s_) >= 64 and n.startswith('_ZN19pump_fees_candidate') and '__global' not in n and '__idl' not in n:
        syms.append((int(a, 16), int(s_), n.strip()))

rows = []
for addr, sz, name in syms:
    F = toks(CAND[addr - BASE: addr - BASE + sz])
    if len(F) < K: continue
    votes = Counter()
    for i in range(len(F) - K + 1):
        for p in pos.get(tuple(key(F[i+j]) for j in range(K)), []):
            votes[p - i] += 1
    if not votes:
        rows.append((0.0, sz, name, 'NO-ALIGN', 0, 0, 0)); continue
    aln = votes.most_common(1)[0][0]
    fk = [key(t) for t in F]; ok = [key(t) for t in O[aln:aln+len(F)]]
    sm = difflib.SequenceMatcher(None, fk, ok, autojunk=False)
    # classify diff blocks
    n_framestore = n_logic = n_struct = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal': continue
        clen = (i2-i1) + (j2-j1)
        # a 'replace' of equal small length where both sides are same-opcode but differ in imm => constant diff
        if tag == 'replace' and (i2-i1) == (j2-j1):
            for a2, b2 in zip(range(i1,i2), range(j1,j2)):
                ca, oa = F[a2], O[aln+b2]
                if ca[0] == oa[0] and (ca[1] if len(ca)>1 else 0)==(oa[1] if len(oa)>1 else 0):
                    # same op+regs, differ in imm/off
                    if is_frame_store(ca): n_framestore += 1
                    else: n_logic += 1
                else:
                    n_struct += 1
        else:
            n_struct += clen
    rows.append((sm.ratio(), sz, name, 'ok', n_framestore, n_logic, n_struct))

# functions with logic-const diffs and little/no structural diff = closable candidates
def short(n):
    import re
    m = n.replace('_ZN19pump_fees_candidate','')
    return m[:54]
print(f"{'ratio':>6} {'bytes':>5} {'fstore':>6} {'logic':>5} {'struct':>6}  function")
cands = [r for r in rows if r[6] <= 2 and r[5] >= 1 and r[0] >= 0.9]
for r in sorted(rows, key=lambda r:(r[6], -r[0])):
    if r[5] >= 1 and r[6] <= 3 and r[0] >= 0.85:
        print(f"{r[0]*100:6.1f} {r[1]:5} {r[4]:6} {r[5]:5} {r[6]:6}  {short(r[2])}")
print(f"\n{len(rows)} own funcs scanned; candidates (logic-const, struct<=2): {len(cands)}")
