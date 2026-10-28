#!/usr/bin/env python3
"""rd.py <addr> <n> [so]: hex bytes at virtual address from ELF (section-based)."""
import sys, struct
so = sys.argv[3] if len(sys.argv) > 3 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'
b = open(so, 'rb').read()
shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum = struct.unpack_from('<HH', b, 0x3a)
addr = int(sys.argv[1], 16); n = int(sys.argv[2])
for i in range(shnum):
    o = shoff + i * shentsize
    _, typ, flags, vaddr, off, size = struct.unpack_from('<IIQQQQ', b, o)
    if vaddr <= addr < vaddr + size and typ != 8:
        d = b[off + addr - vaddr: off + addr - vaddr + n]
        print(d.hex(' '), '|', ''.join(chr(c) if 32 <= c < 127 else '.' for c in d)); break
