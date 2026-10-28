#!/usr/bin/env python3
"""sacmp.py <obj.o> <orig_start> [cand.so symregex]: compare a standalone-compiled function (first F symbol with most bytes
matching regex 'quote|fn') to the original window (normalized: call imm masked, lddw masked). Prints diff slot count."""
import sys, re, subprocess, struct, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
def norm(raw):
    m = bytearray(raw); i = 0
    while i < len(raw):
        op = raw[i]
        if op == 0x18: m[i+4:i+8] = bytes(4); m[i+12:i+16] = bytes(4); i += 16; continue
        if op == 0x85: m[i+4:i+8] = bytes(4)
        i += 8
    return bytes(m)
def toks(raw):
    out = []; i = 0
    while i < len(raw):
        n = 16 if raw[i] == 0x18 else 8; out.append(raw[i:i+n]); i += n
    return out
o = sys.argv[1]; st = int(sys.argv[2], 0); rx = sys.argv[3] if len(sys.argv) > 3 else 'quote_extensions_supported'
w = next(x for x in original_windows() if x['start'] == st)
# extract section bytes for the symbol
txt = subprocess.check_output([OBJ, '-t', o], text=True)
best = None
for line in txt.splitlines():
    m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if m and re.search(rx, m.group(4)):
        best = (m.group(2), int(m.group(1), 16), int(m.group(3), 16), m.group(4))
sec, off, size, name = best
dump = subprocess.check_output([OBJ, '-s', '-j', sec, o], text=True)
data = bytearray()
for line in dump.splitlines():
    mm = re.match(r'^ ([0-9a-f]{4,}) ((?:[0-9a-f]{8} ?){1,4})', line)
    if mm: data += bytes.fromhex(mm.group(2).replace(' ', ''))
raw = bytes(data[off:off+size])
a = toks(norm(w['raw'])); b = toks(norm(raw))
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
diff = sum(max(i2-i1, j2-j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
print(f"{o.split('/')[-1]}: size {size} (orig {w['bytes']}) ratio={sm.ratio():.4f} diffslots={diff} {'MATCH' if norm(raw)==norm(w['raw']) else ''}")
