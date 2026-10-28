#!/usr/bin/env python3
"""odf.py <obj.o> <orig_start> <symregex> [-k LINES] [-n HUNKS]: hunk diff of an llc'd function vs the original window
(normalized like sacmp: lddw imm + call imm masked)."""
import sys, re, subprocess, difflib, argparse
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
ORIG = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'
ap = argparse.ArgumentParser(); ap.add_argument('o'); ap.add_argument('start'); ap.add_argument('sym')
ap.add_argument('-k', type=int, default=4); ap.add_argument('-n', type=int, default=20); a = ap.parse_args()
st = int(a.start, 0); w = next(x for x in original_windows() if x['start'] == st)
def norm(raw):
    m = bytearray(raw); i = 0
    while i < len(raw):
        op = raw[i]
        if op == 0x18: m[i+4:i+8] = bytes(4); m[i+12:i+16] = bytes(4); i += 16; continue
        if op == 0x85: m[i+4:i+8] = bytes(4)
        i += 8
    return bytes(m)
def toks(raw, base):
    out = []; i = 0
    while i < len(raw):
        n = 16 if raw[i] == 0x18 else 8; out.append((base + i, raw[i:i+n])); i += n
    return out
txt = subprocess.check_output([OBJ, '-t', a.o], text=True); best = None
for line in txt.splitlines():
    m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if m and re.search(a.sym, m.group(4)): best = (m.group(2), int(m.group(1), 16), int(m.group(3), 16), m.group(4))
sec, off, size, name = best
dump = subprocess.check_output([OBJ, '-s', '-j', sec, a.o], text=True); data = bytearray()
for line in dump.splitlines():
    mm = re.match(r'^ ([0-9a-f]{4,}) ((?:[0-9a-f]{8} ?){1,4})', line)
    if mm: data += bytes.fromhex(mm.group(2).replace(' ', ''))
raw = bytes(data[off:off+size])
def dis(path, args):
    d = {}
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', *args, path], text=True).splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', line)
        if m: d[int(m.group(1), 16)] = re.sub(r'\s*<[^>]*>', '', m.group(2).strip())
    return d
od = dis(ORIG, [f'--start-address={st:#x}', f'--stop-address={st + w["bytes"]:#x}'])
cd = dis(a.o, [f'--section={sec}'])
A = toks(w['raw'], st); B = toks(raw, off)
sm = difflib.SequenceMatcher(None, [norm(x[1]) for x in A], [norm(x[1]) for x in B], autojunk=False)
ops = sm.get_opcodes(); nd = sum(max(i2-i1, j2-j1) for t, i1, i2, j1, j2 in ops if t != 'equal')
print(f"size {size} (orig {w['bytes']}) ratio={sm.ratio():.4f} hunks={sum(1 for o in ops if o[0]!='equal')} diffslots={nd}")
h = 0
for tag, i1, i2, j1, j2 in ops:
    if tag == 'equal': continue
    h += 1
    if h > a.n: print('...more'); break
    oa = A[i1][0] if i1 < len(A) else st + w['bytes']; ca = B[j1][0] if j1 < len(B) else off + size
    print(f"@@ {tag} o+{oa-st:#x}x{i2-i1} c+{ca-off:#x}x{j2-j1}")
    for k in range(i1, min(i2, i1 + a.k)): print('-', od.get(A[k][0], '?'))
    if i2 - i1 > a.k: print(f'-   ...{i2-i1-a.k} more')
    for k in range(j1, min(j2, j1 + a.k)): print('+', cd.get(B[k][0], '?'))
    if j2 - j1 > a.k: print(f'+   ...{j2-j1-a.k} more')
