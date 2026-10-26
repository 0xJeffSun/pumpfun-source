import sys, difflib
from collections import defaultdict, Counter

NAME = sys.argv[1]
ORIG = open('/tmp/fees_orig.text', 'rb').read()
CAND = open('/tmp/fees_cand_u.text', 'rb').read()
BASE = 0x120

MN = {0x79:'ldxdw',0x71:'ldxb',0x69:'ldxh',0x61:'ldxw',0x7b:'stxdw',0x73:'stxb',0x6b:'stxh',0x63:'stxw',
0x7a:'stdw',0x72:'stb',0x62:'stw',0xb7:'mov',0xbf:'mov64',0x07:'add64',0x0f:'add',0x17:'sub64',0x1f:'sub',
0x27:'mul64',0x57:'and64',0x47:'or64',0x67:'lsh64',0x77:'rsh64',0x87:'neg64',0x5f:'and',0x4f:'or',
0x18:'lddw',0x85:'call',0x95:'exit',0x05:'ja',0x15:'jeq',0x1d:'jeq',0x55:'jne',0x5d:'jne',0x25:'jgt',
0x2d:'jgt',0x35:'jge',0x3d:'jge',0xa5:'jlt',0xad:'jlt',0xb5:'jle',0xbd:'jle',0x45:'jset',0x97:'mod64',
0xc5:'jslt',0xcd:'jslt',0x65:'jsgt',0x6d:'jsgt',0x37:'div64',0x3f:'div64',0xdc:'be'}

def dec(raw):
    op = raw[0]; dst = raw[1] & 0xf; src = (raw[1] >> 4) & 0xf
    off = int.from_bytes(raw[2:4], 'little', signed=True)
    if len(raw) == 16:
        imm = int.from_bytes(raw[4:8], 'little') | (int.from_bytes(raw[12:16], 'little') << 32)
        return f"lddw    r{dst}, 0x{imm:x}"
    imm = int.from_bytes(raw[4:8], 'little', signed=True)
    m = MN.get(op, hex(op))
    if op in (0x79,0x71,0x69,0x61): return f"{m:7} r{dst}, [r{src}{off:+#x}]"
    if op in (0x7b,0x73,0x6b,0x63): return f"{m:7} [r{dst}{off:+#x}], r{src}"
    if op in (0x7a,0x72,0x62): return f"{m:7} [r{dst}{off:+#x}], 0x{imm & 0xffffffff:x}"
    if op == 0x85: return f"call    0x{imm & 0xffffffff:x}"
    if op == 0x95: return "exit"
    if op == 0x05: return f"ja      {off:+#x}"
    if (op & 0x7) == 0x5 and op not in (0x85,0x95,0x05,0x45):
        rhs = f"r{src}" if (op & 0x8) else f"0x{imm & 0xffffffff:x}"
        return f"{m:7} r{dst}, {rhs}, {off:+#x}"
    if op & 0x8: return f"{m:7} r{dst}, r{src}"
    return f"{m:7} r{dst}, 0x{imm & 0xffffffff:x}"

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

O = toks(ORIG); C = toks(CAND)

cands = []
for ln in open('/tmp/cand_syms.txt'):
    a, s_, n = ln.split(None, 2)
    if NAME in n and int(s_) >= 64:
        cands.append((int(s_), int(a, 16), n.strip()))
nonglob = [c for c in cands if '__global' not in c[2]]
sz, addr, sym = max(nonglob or cands)
print(f"{sym}\n@0x{addr:x} size={sz}")

F = toks(CAND[addr - BASE: addr - BASE + sz])
K = 6
pos = defaultdict(list)
for i in range(len(O) - K + 1):
    pos[tuple(key(O[i+j]) for j in range(K))].append(i)
votes = Counter()
for i in range(len(F) - K + 1):
    for p in pos.get(tuple(key(F[i+j]) for j in range(K)), []):
        votes[p - i] += 1
if not votes:
    print("NO ALIGNMENT (heavily rewritten)"); sys.exit()
aln = votes.most_common(1)[0][0]
fk = [key(t) for t in F]; ok = [key(t) for t in O[aln:aln+len(F)]]
sm = difflib.SequenceMatcher(None, fk, ok, autojunk=False)
print(f"aligned orig@{aln}; frame-masked token ratio={sm.ratio()*100:.2f}%")
nblocks = 0
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        continue
    nblocks += 1
    print(f"\n[{tag}] cand[{i1}:{i2}] orig[{j1}:{j2}]")
    for k in range(i1, min(i2, i1+16)):
        print(f"   C#{k:<4} {dec(F[k])}")
    if j1 < j2:
        print("   ----")
    for k in range(j1, min(j2, j1+16)):
        print(f"   O     {dec(O[aln+k])}")
print(f"\n== {nblocks} non-equal blocks ==")
