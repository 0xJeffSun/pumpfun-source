#!/usr/bin/env python3
"""lx.py <module.ll> <fnregex> <orig_start> <tag> [old=>new ...] [--re] [--show N] [--file edits.py]
Apply text edits inside the matched function (literal, or regex with --re), llc it, compare with the original window
(normalized like sacmp: call imm + lddw masked). Prints size/ratio/diffslots/MATCH. --show N prints N diff hunks."""
import sys, re, subprocess, difflib
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00b'
LLC = '/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
a = sys.argv[1:]; mod, fn, orig, tag = a[:4]; rest = a[4:]
edits = []; show = 0; i = 0; rx = False
while i < len(rest):
    if rest[i] == '--show': show = int(rest[i+1]); i += 2; continue
    if rest[i] == '--re': rx = True; i += 1; continue
    edits.append(rest[i]); i += 1
s = open(mod).read()
m = re.search(r'\ndefine [^\n]*' + fn + r'[^\n]*\{', s); st = m.start(); en = s.index('\n}\n', st)
f = s[st:en]
for e in edits:
    old, new = e.split('=>')
    old = old.replace('\\n', '\n'); new = new.replace('\\n', '\n')
    if rx:
        f2 = re.sub(old, new, f, count=1, flags=re.S)
        if f2 == f: print('EDIT NOT APPLIED:', old[:80]); sys.exit(1)
        f = f2
    else:
        if old not in f: print('EDIT NOT FOUND:', old[:80]); sys.exit(1)
        f = f.replace(old, new, 1)
out = f'{L}/llx/{tag}.ll'
open(out, 'w').write(s[:st] + f + s[en:])
r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', out, '-o', f'{L}/llx/{tag}.o'], capture_output=True, text=True)
if r.returncode: print('LLC FAIL', r.stderr[:600]); sys.exit(1)
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
o = f'{L}/llx/{tag}.o'; st0 = int(orig, 0)
w = next(x for x in original_windows() if x['start'] == st0)
txt = subprocess.check_output([OBJ, '-t', o], text=True); best = None
for line in txt.splitlines():
    mm = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
    if mm and re.search(fn, mm.group(4)): best = (mm.group(2), int(mm.group(1), 16), int(mm.group(3), 16), mm.group(4))
sec, off, size, name = best
dump = subprocess.check_output([OBJ, '-s', '-j', sec, o], text=True); data = bytearray()
for line in dump.splitlines():
    mm = re.match(r'^ ([0-9a-f]{4,}) ((?:[0-9a-f]{8} ?){1,4})', line)
    if mm: data += bytes.fromhex(mm.group(2).replace(' ', ''))
raw = bytes(data[off:off+size])
A = toks(norm(w['raw'])); B = toks(norm(raw))
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
diff = sum(max(i2-i1, j2-j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
print(f"{tag}: size {size} (orig {w['bytes']}) ratio={sm.ratio():.4f} diffslots={diff} {'MATCH' if norm(raw)==norm(w['raw']) else ''}")
if show:
    def dis(raw, base):
        t = subprocess.run([OBJ, '-d', '--no-show-raw-insn', '-'], input=b'', capture_output=True)
    # textual diff via odiff-like disassembly
    import tempfile
    def txt_of(path, args):
        t = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn'] + args + [path], text=True)
        res = []
        for l in t.splitlines():
            mm = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', l)
            if mm:
                x = re.sub(r'\s+<.*>', '', mm.group(2).strip()); x = re.sub(r'^call .*', 'call', x); x = re.sub(r'^(lddw r\d+), .*', r'\1, X', x)
                x = re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+$', r'\1L', x); res.append((int(mm.group(1), 16), x))
        return res
    O = txt_of('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so', [f'--start-address={st0:#x}', f'--stop-address={st0+w["bytes"]:#x}'])
    C = txt_of(o, ['-j', sec])
    O = [(ad - st0, x) for ad, x in O]; C = [(ad - off, x) for ad, x in C if off <= ad < off + size]
    sm2 = difflib.SequenceMatcher(None, [x for _, x in O], [x for _, x in C], autojunk=False); k = 0
    for t, i1, i2, j1, j2 in sm2.get_opcodes():
        if t == 'equal': continue
        k += 1
        if k > show: break
        for ad, x in O[i1:i2][:12]: print(f'-{ad:#06x} {x}')
        for ad, x in C[j1:j2][:12]: print(f'+{ad:#06x} {x}')
        print('~')
