#!/usr/bin/env python3
"""Find 8-byte LE references to given addresses in .data.rel.ro / .rodata; dump surrounding vtable words."""
import struct, sys, subprocess, re
sys.path.insert(0, '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bfdcc76c-0b71-4f9c-ae22-9692c45e52cf/scratchpad/harness')
from score import sections
OBJDUMP = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'

def allsyms(path):
    try:
        text = subprocess.check_output([OBJDUMP, '-t', path], text=True)
    except Exception:
        return {}
    d = {}
    for line in text.splitlines():
        m = re.match(r'^([0-9a-f]+) (.{7}) (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m:
            d.setdefault(int(m.group(1), 16), []).append((m.group(3), int(m.group(4), 16), m.group(5)))
    return d

def main():
    path = sys.argv[1]; targets = [int(x, 16) for x in sys.argv[2:]]
    blob = open(path, 'rb').read(); secs = sections(blob)
    S = allsyms(path)
    for sec in ('.data.rel.ro', '.rodata'):
        s = secs[sec]; data = blob[s['offset']:s['offset'] + s['size']]
        for i in range(0, len(data) - 7, 8):
            v = struct.unpack_from('<Q', data, i)[0]
            if v & 0xffffffff == 0: v >>= 32
            if v in targets:
                a = s['addr'] + i
                print(f'{sec} {a:#x} -> {v:#x}')
                # dump 8 words before and after
                for j in range(max(0, i - 48), min(len(data), i + 56), 8):
                    w = struct.unpack_from('<Q', data, j)[0]
                    if w & 0xffffffff == 0: w >>= 32
                    nm = ''
                    if w in S: nm = ' '.join(x[2] for x in S[w])[:160]
                    lab = ''
                    if s['addr'] + j in S: lab = '<' + ' '.join(x[2] for x in S[s['addr'] + j])[:120] + '>'
                    print(f'   {s["addr"]+j:#x}: {w:#018x} {nm} {lab}')
main()
