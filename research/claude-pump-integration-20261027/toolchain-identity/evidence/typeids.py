#!/usr/bin/env python3
"""Scan an SBF ELF .text for TypeId thunks: lddw rA,<u64>; stxdw [r1+8],rA; lddw rB,<u64>; stxdw [r1+0],rB; exit
(and the reversed store order). Prints addr, hi(+8), lo(+0) and symbol (if unstripped)."""
import struct, sys, subprocess, re
sys.path.insert(0, '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bfdcc76c-0b71-4f9c-ae22-9692c45e52cf/scratchpad/harness')
from score import sections
OBJDUMP = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'

def syms(path):
    try:
        text = subprocess.check_output([OBJDUMP, '-t', path], text=True)
    except Exception:
        return {}
    d = {}
    for line in text.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F \.text\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m:
            d.setdefault(int(m.group(1), 16), []).append(m.group(3))
    return d

def scan(path):
    blob = open(path, 'rb').read(); secs = sections(blob); t = secs['.text']
    data = blob[t['offset']:t['offset'] + t['size']]
    out = []
    for i in range(0, len(data) - 56 + 1, 8):
        if data[i] != 0x18: continue
        try:
            a = data[i:i+56]
        except Exception: continue
        if a[48] != 0x95: continue
        if a[16] != 0x7b or a[40] != 0x7b or a[24] != 0x18: continue
        r1 = a[1] & 0xf; r2 = a[25] & 0xf
        if a[17] != (r1 << 4 | 1) or a[41] != (r2 << 4 | 1): continue
        off1 = struct.unpack_from('<h', a, 18)[0]; off2 = struct.unpack_from('<h', a, 42)[0]
        v1 = struct.unpack_from('<I', a, 4)[0] | struct.unpack_from('<I', a, 12)[0] << 32
        v2 = struct.unpack_from('<I', a, 28)[0] | struct.unpack_from('<I', a, 36)[0] << 32
        if {off1, off2} != {0, 8}: continue
        hi = v1 if off1 == 8 else v2; lo = v2 if off1 == 8 else v1
        out.append((t['addr'] + i, lo, hi, off1))
    return out

if __name__ == '__main__':
    path = sys.argv[1]
    s = syms(path)
    for addr, lo, hi, off1 in scan(path):
        names = s.get(addr, [''])
        print(f'{addr:#08x}  lo={lo:016x} hi={hi:016x} order={"8,0" if off1==8 else "0,8"}  {" | ".join(names)}')
