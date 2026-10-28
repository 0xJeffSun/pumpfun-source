#!/usr/bin/env python3
"""callseg.py <orig_start> <orig_size> <cand.so> <cand_start> <cand_size>: instruction counts between consecutive calls (address order)."""
import sys, re, subprocess
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
def segs(so, a, n):
    out = []; cnt = 0
    for line in subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True).splitlines():
        m = re.match(r'^\s*[0-9a-f]+:\s+(.*)$', line)
        if not m: continue
        cnt += 1
        if m.group(1).startswith('call'): out.append(cnt); cnt = 0
    out.append(cnt); return out
o = segs(W + '/base/original.so', int(sys.argv[1], 16), int(sys.argv[2])); c = segs(sys.argv[3], int(sys.argv[4], 16), int(sys.argv[5]))
print('orig', o); print('cand', c)
print('diff', [a - b for a, b in zip(o, c)])
