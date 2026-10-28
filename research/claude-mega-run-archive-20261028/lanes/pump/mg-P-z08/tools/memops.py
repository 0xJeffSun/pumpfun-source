#!/usr/bin/env python3
"""memops.py <so|orig> <start> <size> [bases=r7,r9,r8,r3]: compact memory-op token stream of a function.
tokens: L<base><off> (load from param base), S<off> (store to sret r6 base), s/l (stack spill/reload), C (call), J (jump)."""
import sys, re, subprocess
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
so = sys.argv[1] if sys.argv[1] != 'orig' else W + '/base/original.so'
if so.endswith('.o'):
    hdr = subprocess.check_output([OBJ, '-h', so], text=True)
    sec = [l.split()[1] for l in hdr.splitlines() if len(l.split()) > 2 and re.search(sys.argv[2], l.split()[1])][0]
    txt = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--section={sec}', so], text=True)
else:
    a = int(sys.argv[2], 16); n = int(sys.argv[3])
    txt = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True)
toks = []
for line in txt.splitlines():
    m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
    if not m: continue
    ins = m.group(1).split('<')[0].strip()
    mm = re.match(r'ldx(\w+) r(\d+), \[r(\d+) ([+-]) (0x[0-9a-f]+)\]', ins)
    if mm:
        sz, dst, base, sg, off = mm.groups()
        if base == '10': toks.append('l' + ('' if sg == '-' else '+') + off[2:])
        else: toks.append(f'L{base}.{sg if sg=="-" else ""}{off[2:]}')
        continue
    mm = re.match(r'st(x?)(\w+) \[r(\d+) ([+-]) (0x[0-9a-f]+)\], (\S+)', ins)
    if mm:
        x, sz, base, sg, off, src = mm.groups()
        if base == '10': toks.append('s' + off[2:])
        else: toks.append(f'S{base}.{off[2:]}' + ('' if x else '#'))
        continue
    if ins.startswith('call'): toks.append('C'); continue
    if ins.startswith('j'): toks.append('J'); continue
if len(sys.argv) > 4:
    import difflib
    so2 = sys.argv[4]
    sys.argv = sys.argv[:1] + [so2, sys.argv[5], sys.argv[6]]
    t2 = subprocess.check_output([sys.executable, '-B', __file__] + sys.argv[1:], text=True).split()
    sm = difflib.SequenceMatcher(None, toks, t2, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal': print(f'  ={i2-i1}', end='')
        else: print(f'\n  -[{" ".join(toks[i1:i2])}] +[{" ".join(t2[j1:j2])}]', end='')
    print()
else:
    for i in range(0, len(toks), 22): print(' '.join(toks[i:i+22]))
