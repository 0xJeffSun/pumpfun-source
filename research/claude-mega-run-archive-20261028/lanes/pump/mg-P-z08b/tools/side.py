#!/usr/bin/env python3
"""side.py <orig_start> <orig_size> <cand.so|.o> <cand_start> <cand_size> <o_from> <o_to> <c_from> <c_to>: side-by-side listing (index ranges)."""
import sys, re, subprocess
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
def dis(so, a, n):
    out = []
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True).splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s+(.*)$', line)
        if m:
            t = m.group(2).split('<')[0].strip(); pc = int(m.group(1), 16)
            mm = re.match(r'^(j\w+ .*?|ja |call )([+-]?0x[0-9a-f]+|[+-]?\d+)$', t)
            if mm and not t.startswith('call'):
                tgt = (pc - a) // 8 + 1 + int(mm.group(2), 0) if not t.startswith('ja ') else (pc - a) // 8 + 1 + int(mm.group(2), 0)
                t = t[:mm.start(2)] + f'@{tgt}'
            out.append(t)
    return out
a = sys.argv[1:]
o = dis(W + '/base/original.so', int(a[0], 16), int(a[1])); c = dis(a[2], int(a[3], 16), int(a[4]))
of, ot, cf, ct = map(int, a[5:9])
n = max(ot - of, ct - cf)
for k in range(n):
    x = o[of + k] if of + k < ot else ''; y = c[cf + k] if cf + k < ct else ''
    print(f'{of+k:4d} {x[:38]:38s} | {cf+k:4d} {y[:38]}')
