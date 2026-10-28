#!/usr/bin/env python3
"""sdiff.py <orig_start> <orig_size> <cand.so|.o> <cand_start> <cand_size> [--off] [--ctx N] [--max N]: structural diff with stack offsets,
branch targets and call targets masked (unless --off keeps offsets). Prints hunks (orig idx / cand idx) with up to N lines each."""
import sys, re, subprocess, difflib
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
def dis(so, a, n):
    out = []
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True).splitlines():
        m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
        if m: out.append(m.group(1).split('<')[0].strip())
    return out
a = sys.argv[1:]
keep_off = '--off' in a; mx = int(a[a.index('--max') + 1]) if '--max' in a else 6
o = dis(W + '/base/original.so', int(a[0], 16), int(a[1])); c = dis(a[2], int(a[3], 16), int(a[4]))
def key(s):
    if s.startswith(('j', 'call')): s = re.sub(r'([+-]0x[0-9a-f]+|-?\b\d+\b)$', '', s)
    if not keep_off: s = re.sub(r'r10 - 0x[0-9a-f]+', 'r10-X', s)
    s = re.sub(r'lddw (r\d+), 0x[0-9a-f]+', r'lddw \1, C', s)
    return s
sm = difflib.SequenceMatcher(None, [key(x) for x in o], [key(x) for x in c], autojunk=False)
print('ratio(masked)', round(sm.ratio(), 4), 'orig', len(o), 'cand', len(c))
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal': continue
    print(f'--- {tag} o[{i1}:{i2}] c[{j1}:{j2}]')
    for k in range(i1, min(i2, i1 + mx)): print('  o', o[k])
    for k in range(j1, min(j2, j1 + mx)): print('  c', c[k])
