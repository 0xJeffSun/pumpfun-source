#!/usr/bin/env python3
"""Compare a function section from an llc object with the function in a linked .so (or the original window).
usage: objcmp.py <obj.o> <mangled> <ref.so|orig> [orig_start]"""
import subprocess, sys, struct, os
sys.path.insert(0, os.path.dirname(__file__))
from sbf import elf, ORIGINAL
from pathlib import Path
TC = os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin')
obj, fn, ref = sys.argv[1:4]
tmp = obj + '.' + fn[-20:] + '.bin'
subprocess.run([TC + '/llvm-objcopy', '--dump-section', '.text.' + fn + '=' + tmp, obj], check=True)
code = Path(tmp).read_bytes()
if ref == 'orig':
    e = elf.Elf(ORIGINAL); st = int(sys.argv[4], 0)
    en = [x for x in e.entries if x > st][0]
    body = e.b[st:en]
else:
    e = elf.Elf(Path(ref)); f = [f for f in e.funcs if f['name'] == fn][0]
    body = e.b[f['start']:f['start'] + f['size']]
def toks(b):
    out = []; i = 0
    while i < len(b):
        op = b[i]
        if op == 0x18:
            out.append((b[i:i+2].hex(), 'lddw')); i += 16; continue
        if op == 0x85:
            out.append((b[i:i+2].hex(), 'call')); i += 8; continue
        out.append(b[i:i+8].hex()); i += 8
    return out
a, b = toks(code), toks(body)
print('obj', len(code), 'ref', len(body), 'tokens equal' if a == b else 'DIFF')
if a != b:
    import difflib
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for t, i1, i2, j1, j2 in sm.get_opcodes():
        if t != 'equal':
            print(t, 'obj', i1, a[i1:i2][:4], 'ref', j1, b[j1:j2][:4])
