#!/usr/bin/env python3
"""offmap.py <orig_start> <orig_size> <cand.so> <cand_start> <cand_size>: align insns (offsets masked) and print the
mapping orig r10-offset -> cand r10-offset (count), sorted by orig offset."""
import sys, re, subprocess, difflib, collections
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
def dis(so, a, n):
    out = []
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True).splitlines():
        m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
        if m: out.append(m.group(1).split('<')[0].strip())
    return out
o = dis(W + '/base/original.so', int(sys.argv[1], 16), int(sys.argv[2])); c = dis(sys.argv[3], int(sys.argv[4], 16), int(sys.argv[5]))
key = lambda s: re.sub(r'r10 - 0x[0-9a-f]+', 'r10-X', re.sub(r'([+-]0x[0-9a-f]+|-?\b\d+\b)$', '', s) if s.startswith(('j', 'call')) else s)
sm = difflib.SequenceMatcher(None, [key(x) for x in o], [key(x) for x in c], autojunk=False)
mp = collections.Counter()
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag != 'equal': continue
    for k in range(i2 - i1):
        a = re.findall(r'r10 - (0x[0-9a-f]+)', o[i1 + k]); b = re.findall(r'r10 - (0x[0-9a-f]+)', c[j1 + k])
        if a and b: mp[(int(a[0], 16), int(b[0], 16))] += 1
print('ratio', round(sm.ratio(), 4))
rows = sorted(mp.items())
line = []
for (a, b), n in rows:
    line.append(f'{a:#x}->{b:#x}' + (f'({b-a:+#x})' if a != b else '') )
for i in range(0, len(line), 8): print('  '.join(line[i:i+8]))
