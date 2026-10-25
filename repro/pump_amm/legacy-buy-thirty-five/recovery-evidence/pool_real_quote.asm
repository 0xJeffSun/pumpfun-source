06bcd0: mov64 r7, r3
06bcd8: mov64 r6, r1
06bce0: mov64 r1, r10
06bce8: add64 r1, -0x110
06bcf0: call -0x52 ; call 0x6ba68
06bcf8: ldxdw r1, [r10 - 0x110]
06bd00: jne r1, 0x2, +0x25 ; branch 0x6be30
06bd08: ldxdw r1, [r10 - 0x108]
06bd10: jlt r7, r1, +0x1 ; branch 0x6bd20
06bd18: ja +0x24 ; branch 0x6be40
06bd20: mov64 r1, r10
06bd28: add64 r1, -0x70
06bd30: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06bd40: call 0x12d6 ; call 0x753f8
06bd48: stdw [r10 - 0x48], 0x0
06bd50: stdw [r10 - 0x50], 0x1
06bd58: stdw [r10 - 0x58], 0x0
06bd60: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
06bd70: stxdw [r10 - 0x18], r1
06bd78: mov64 r1, r10
06bd80: add64 r1, -0x58
06bd88: stxdw [r10 - 0x20], r1
06bd90: stb [r10 - 0x8], 0x3
06bd98: stdw [r10 - 0x10], 0x20
06bda0: stdw [r10 - 0x30], 0x0
06bda8: stdw [r10 - 0x40], 0x0
06bdb0: mov64 r2, r10
06bdb8: add64 r2, -0x40
06bdc0: lddw r1, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06bdd0: call 0x1db9 ; call 0x7aba0
06bdd8: jeq r0, 0x0, +0x10 ; branch 0x6be60
06bde0: mov64 r3, r10
06bde8: add64 r3, -0x110
06bdf0: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
06be00: mov64 r2, 0x37
06be08: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
06be18: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
06be28: call 0x14e2d ; call 0x112f98
06be30: ldxdw r2, [r10 - 0x108]
06be38: ja +0x1f ; branch 0x6bf38
06be40: sub64 r7, r1
06be48: stxdw [r6 + 0x8], r7
06be50: stdw [r6 + 0x0], 0x2
06be58: ja +0x1d ; branch 0x6bf48
06be60: ldxdw r1, [r10 - 0x48]
06be68: stxdw [r10 - 0xc8], r1
06be70: ldxdw r1, [r10 - 0x50]
06be78: stxdw [r10 - 0xd0], r1
06be80: ldxdw r1, [r10 - 0x58]
06be88: stxdw [r10 - 0xd8], r1
06be90: ldxdw r1, [r10 - 0x70]
06be98: stxdw [r10 - 0xf0], r1
06bea0: ldxdw r1, [r10 - 0x68]
06bea8: stxdw [r10 - 0xe8], r1
06beb0: ldxdw r1, [r10 - 0x60]
06beb8: stxdw [r10 - 0xe0], r1
06bec0: lddw r1, 0x11cf14 ; rodata b'programs/pump-amm/src/state/pool.rsOverflowing user accumulator sol volumep'
06bed0: stxdw [r10 - 0x108], r1
06bed8: stw [r10 - 0x78], 0x1787
06bee0: stb [r10 - 0xc0], 0x2
06bee8: stw [r10 - 0xf8], 0x1a1
06bef0: stdw [r10 - 0x100], 0x23
06bef8: stdw [r10 - 0x110], 0x0
06bf00: mov64 r1, r10
06bf08: add64 r1, -0x120
06bf10: mov64 r2, r10
06bf18: add64 r2, -0x110
06bf20: call 0x12e12 ; call 0x102fb8
06bf28: ldxdw r1, [r10 - 0x120]
06bf30: ldxdw r2, [r10 - 0x118]
06bf38: stxdw [r6 + 0x8], r2
06bf40: stxdw [r6 + 0x0], r1
06bf48: exit
