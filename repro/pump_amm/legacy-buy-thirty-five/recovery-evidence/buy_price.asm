0119c8: mov64 r7, r3
0119d0: mov64 r8, r2
0119d8: mov64 r6, r1
0119e0: jge r7, r8, +0x22 ; branch 0x11af8
0119e8: mov64 r1, r10
0119f0: add64 r1, -0x78
0119f8: lddw r2, 0x11c020 ; rodata b'\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00'
011a08: call 0xc73d ; call 0x753f8
011a10: stdw [r10 - 0x50], 0x0
011a18: stdw [r10 - 0x58], 0x1
011a20: stdw [r10 - 0x60], 0x0
011a28: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
011a38: stxdw [r10 - 0x20], r1
011a40: mov64 r1, r10
011a48: add64 r1, -0x60
011a50: stxdw [r10 - 0x28], r1
011a58: stb [r10 - 0x10], 0x3
011a60: stdw [r10 - 0x18], 0x20
011a68: stdw [r10 - 0x38], 0x0
011a70: stdw [r10 - 0x48], 0x0
011a78: mov64 r2, r10
011a80: add64 r2, -0x48
011a88: lddw r1, 0x11c020 ; rodata b'\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00'
011a98: call 0xd220 ; call 0x7aba0
011aa0: jeq r0, 0x0, +0x3a ; branch 0x11c78
011aa8: mov64 r3, r10
011ab0: add64 r3, -0x1
011ab8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
011ac8: mov64 r2, 0x37
011ad0: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
011ae0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
011af0: call 0x20294 ; call 0x112f98
011af8: mov64 r1, r10
011b00: add64 r1, -0x140
011b08: mov64 r2, r4
011b10: mov64 r3, 0x0
011b18: mov64 r4, r8
011b20: mov64 r5, 0x0
011b28: call 0x213a0 ; call 0x11b830
011b30: mov64 r5, 0x1
011b38: jlt r7, r8, +0x1 ; branch 0x11b48
011b40: mov64 r5, 0x0
011b48: sub64 r7, r8
011b50: neg64 r5
011b58: mov64 r1, r10
011b60: add64 r1, -0x130
011b68: ldxdw r2, [r10 - 0x140]
011b70: ldxdw r3, [r10 - 0x138]
011b78: mov64 r4, r7
011b80: call 0x1f0 ; call 0x12b08
011b88: ldxdw r1, [r10 - 0x128]
011b90: ldxdw r2, [r10 - 0x130]
011b98: jne r2, 0x0, +0x37 ; branch 0x11d58
011ba0: ldxdw r2, [r10 - 0x120]
011ba8: jeq r2, 0x0, +0x55 ; branch 0x11e58
011bb0: mov64 r1, r10
011bb8: add64 r1, -0x78
011bc0: lddw r2, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
011bd0: call 0xc704 ; call 0x753f8
011bd8: stdw [r10 - 0x50], 0x0
011be0: stdw [r10 - 0x58], 0x1
011be8: stdw [r10 - 0x60], 0x0
011bf0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
011c00: stxdw [r10 - 0x20], r1
011c08: mov64 r1, r10
011c10: add64 r1, -0x60
011c18: stxdw [r10 - 0x28], r1
011c20: stb [r10 - 0x10], 0x3
011c28: stdw [r10 - 0x18], 0x20
011c30: stdw [r10 - 0x38], 0x0
011c38: stdw [r10 - 0x48], 0x0
011c40: mov64 r2, r10
011c48: add64 r2, -0x48
011c50: lddw r1, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
011c60: call 0xd1e7 ; call 0x7aba0
011c68: jeq r0, 0x0, +0x1f ; branch 0x11d68
011c70: ja -0x3a ; branch 0x11aa8
011c78: ldxdw r1, [r10 - 0x50]
011c80: stxdw [r10 - 0xd0], r1
011c88: ldxdw r1, [r10 - 0x58]
011c90: stxdw [r10 - 0xd8], r1
011c98: ldxdw r1, [r10 - 0x60]
011ca0: stxdw [r10 - 0xe0], r1
011ca8: ldxdw r1, [r10 - 0x78]
011cb0: stxdw [r10 - 0xf8], r1
011cb8: ldxdw r1, [r10 - 0x70]
011cc0: stxdw [r10 - 0xf0], r1
011cc8: ldxdw r1, [r10 - 0x68]
011cd0: stxdw [r10 - 0xe8], r1
011cd8: lddw r1, 0x11c522 ; rodata b'programs/pump-amm/src/curve/constant_product.rsprograms/pump-amm/src/curve/'
011ce8: stxdw [r10 - 0x110], r1
011cf0: stw [r10 - 0x80], 0x1780
011cf8: stb [r10 - 0xc8], 0x2
011d00: stw [r10 - 0x100], 0x15
011d08: stdw [r10 - 0x108], 0x2f
011d10: stdw [r10 - 0x118], 0x0
011d18: mov64 r1, r10
011d20: add64 r1, -0x160
011d28: mov64 r2, r10
011d30: add64 r2, -0x118
011d38: call 0x1e24f ; call 0x102fb8
011d40: ldxdw r1, [r10 - 0x160]
011d48: ldxdw r2, [r10 - 0x158]
011d50: ja +0x1d ; branch 0x11e40
011d58: ldxdw r2, [r10 - 0x120]
011d60: ja +0x1b ; branch 0x11e40
011d68: ldxdw r1, [r10 - 0x50]
011d70: stxdw [r10 - 0xd0], r1
011d78: ldxdw r1, [r10 - 0x58]
011d80: stxdw [r10 - 0xd8], r1
011d88: ldxdw r1, [r10 - 0x60]
011d90: stxdw [r10 - 0xe0], r1
011d98: ldxdw r1, [r10 - 0x78]
011da0: stxdw [r10 - 0xf8], r1
011da8: ldxdw r1, [r10 - 0x70]
011db0: stxdw [r10 - 0xf0], r1
011db8: ldxdw r1, [r10 - 0x68]
011dc0: stxdw [r10 - 0xe8], r1
011dc8: lddw r1, 0x11c522 ; rodata b'programs/pump-amm/src/curve/constant_product.rsprograms/pump-amm/src/curve/'
011dd8: stxdw [r10 - 0x110], r1
011de0: stw [r10 - 0x80], 0x1788
011de8: stb [r10 - 0xc8], 0x2
011df0: stw [r10 - 0x100], 0x18
011df8: stdw [r10 - 0x108], 0x2f
011e00: stdw [r10 - 0x118], 0x0
011e08: mov64 r1, r10
011e10: add64 r1, -0x150
011e18: mov64 r2, r10
011e20: add64 r2, -0x118
011e28: call 0x1e231 ; call 0x102fb8
011e30: ldxdw r1, [r10 - 0x150]
011e38: ldxdw r2, [r10 - 0x148]
011e40: stxdw [r6 + 0x8], r2
011e48: stxdw [r6 + 0x0], r1
011e50: exit
011e58: stxdw [r6 + 0x8], r1
011e60: stdw [r6 + 0x0], 0x2
011e68: ja -0x4 ; branch 0x11e50
