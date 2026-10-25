040100: mov64 r6, r1
040108: mov64 r1, r10
040110: add64 r1, -0x70
040118: lddw r2, 0x11c0c0 ; rodata b',\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display impleme'
040128: call 0x6a59 ; call 0x753f8
040130: stdw [r10 - 0x48], 0x0
040138: stdw [r10 - 0x50], 0x1
040140: stdw [r10 - 0x58], 0x0
040148: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
040158: stxdw [r10 - 0x18], r1
040160: mov64 r1, r10
040168: add64 r1, -0x58
040170: stxdw [r10 - 0x20], r1
040178: stb [r10 - 0x8], 0x3
040180: stdw [r10 - 0x10], 0x20
040188: stdw [r10 - 0x30], 0x0
040190: stdw [r10 - 0x40], 0x0
040198: mov64 r2, r10
0401a0: add64 r2, -0x40
0401a8: lddw r1, 0x11c0c0 ; rodata b',\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display impleme'
0401b8: call 0x753c ; call 0x7aba0
0401c0: jeq r0, 0x0, +0xa ; branch 0x40218
0401c8: mov64 r3, r10
0401d0: add64 r3, -0x110
0401d8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0401e8: mov64 r2, 0x37
0401f0: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
040200: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
040210: call 0x1a5b0 ; call 0x112f98
040218: ldxdw r1, [r10 - 0x48]
040220: stxdw [r10 - 0xc8], r1
040228: ldxdw r1, [r10 - 0x50]
040230: stxdw [r10 - 0xd0], r1
040238: ldxdw r1, [r10 - 0x58]
040240: stxdw [r10 - 0xd8], r1
040248: ldxdw r1, [r10 - 0x70]
040250: stxdw [r10 - 0xf0], r1
040258: ldxdw r1, [r10 - 0x68]
040260: stxdw [r10 - 0xe8], r1
040268: ldxdw r1, [r10 - 0x60]
040270: stxdw [r10 - 0xe0], r1
040278: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
040288: stxdw [r10 - 0x108], r1
040290: stw [r10 - 0x78], 0x179c
040298: stb [r10 - 0xc0], 0x2
0402a0: stw [r10 - 0xf8], 0x133
0402a8: stdw [r10 - 0x100], 0x39
0402b0: stdw [r10 - 0x110], 0x0
0402b8: mov64 r1, r10
0402c0: add64 r1, -0x120
0402c8: mov64 r2, r10
0402d0: add64 r2, -0x110
0402d8: call 0x1859b ; call 0x102fb8
0402e0: ldxdw r1, [r10 - 0x120]
0402e8: ldxdw r2, [r10 - 0x118]
0402f0: stxdw [r6 + 0x8], r2
0402f8: stxdw [r6 + 0x0], r1
040300: exit
