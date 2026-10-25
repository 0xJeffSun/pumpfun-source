   82af8: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   82b00: bf 38 00 00 00 00 00 00      	mov64 r8, r3
   82b08: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   82b10: bd 78 30 00 00 00 00 00      	jle r8, r7, +0x30 <.text+0x82b78>
   82b18: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   82b20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82b28: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   82b30: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   82b38: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   82b40: 7b 4a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r4
   82b48: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   82b50: 85 10 00 00 4e 65 02 00      	call 0x2654e
   82b58: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   82b60: 1f 74 00 00 00 00 00 00      	sub64 r4, r7
   82b68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82b70: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   82b78: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   82b80: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   82b88: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   82b90: 85 10 00 00 ae 0b 00 00      	call 0xbae
   82b98: 79 a9 f0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x110]
   82ba0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   82ba8: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x82aa0>
   82bb0: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   82bb8: 05 00 7d 00 00 00 00 00      	ja +0x7d <.text+0x82e88>
   82bc0: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   82bc8: 15 01 80 00 00 00 00 00      	jeq r1, 0x0, +0x80 <.text+0x82eb0>
   82bd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82bd8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   82be0: 18 02 00 00 e4 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ee4
   82bf0: 85 10 00 00 f1 a8 01 00      	call 0x1a8f1
   82bf8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   82c00: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   82c08: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   82c10: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   82c20: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   82c28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82c30: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   82c38: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   82c40: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   82c48: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   82c50: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   82c58: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   82c60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   82c68: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   82c70: 18 01 00 00 e4 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ee4
   82c80: 85 10 00 00 40 b6 01 00      	call 0x1b640
   82c88: 15 00 48 00 00 00 00 00      	jeq r0, 0x0, +0x48 <.text+0x82db0>
   82c90: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x82c38>
   82c98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82ca0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   82ca8: 18 02 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f40
   82cb8: 85 10 00 00 d8 a8 01 00      	call 0x1a8d8
   82cc0: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   82cc8: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   82cd0: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   82cd8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   82ce8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   82cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82cf8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   82d00: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   82d08: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   82d10: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   82d18: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   82d20: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   82d28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   82d30: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   82d38: 18 01 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f40
   82d48: 85 10 00 00 27 b6 01 00      	call 0x1b627
   82d50: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x82c88>
   82d58: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   82d60: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   82d68: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   82d78: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   82d80: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   82d90: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   82da0: 85 10 00 00 0e 54 02 00      	call 0x2540e
   82da8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   82db0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   82db8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   82dc0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   82dc8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   82dd0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   82dd8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   82de0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   82de8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   82df0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   82df8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   82e00: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   82e08: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   82e18: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   82e20: 62 0a 80 ff 85 17 00 00      	stw [r10 - 0x80], 0x1785
   82e28: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   82e30: 62 0a 00 ff 06 02 00 00      	stw [r10 - 0x100], 0x206
   82e38: 7a 0a f8 fe 1d 00 00 00      	stdw [r10 - 0x108], 0x1d
   82e40: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   82e48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82e50: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   82e58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   82e60: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   82e68: 85 10 00 00 98 31 02 00      	call 0x23198
   82e70: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   82e78: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   82e80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82e88: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   82e90: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   82e98: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   82ea0: 85 10 00 00 61 fc fe ff      	call -0x1039f
   82ea8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   82eb0: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   82eb8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   82ec0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   82ec8: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x82e98>
   82ed0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   82ed8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   82ee0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   82ee8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   82ef0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   82ef8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   82f00: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   82f08: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   82f10: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   82f18: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   82f20: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   82f28: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   82f30: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   82f40: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   82f48: 62 0a 80 ff 89 17 00 00      	stw [r10 - 0x80], 0x1789
   82f50: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   82f58: 62 0a 00 ff 0e 02 00 00      	stw [r10 - 0x100], 0x20e
   82f60: 7a 0a f8 fe 1d 00 00 00      	stdw [r10 - 0x108], 0x1d
   82f68: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   82f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82f78: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   82f80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   82f88: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   82f90: 85 10 00 00 73 31 02 00      	call 0x23173
   82f98: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   82fa0: 79 a9 a8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x158]
   82fa8: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   82fb0: 7b 96 08 00 00 00 00 00      	stxdw [r6 + 0x8], r9
   82fb8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   82fc0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   82fc8: 95 00 00 00 00 00 00 00      	exit
   82fd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82fd8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   82fe0: 79 a2 a0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x160]
   82fe8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   82ff0: 85 10 00 00 be f9 ff ff      	call -0x642
   82ff8: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   83000: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   83008: 79 a3 e8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x118]
   83010: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x82f00>
   83018: 05 00 d3 ff 00 00 00 00      	ja -0x2d <.text+0x82d98>
   83020: 79 a3 08 ff 00 00 00 00      	ldxdw r3, [r10 - 0xf8]
   83028: 7b 36 20 00 00 00 00 00      	stxdw [r6 + 0x20], r3
   83030: 79 a3 00 ff 00 00 00 00      	ldxdw r3, [r10 - 0x100]
   83038: 7b 36 18 00 00 00 00 00      	stxdw [r6 + 0x18], r3
   83040: 79 a3 98 fe 00 00 00 00      	ldxdw r3, [r10 - 0x168]
   83048: 7b 36 40 00 00 00 00 00      	stxdw [r6 + 0x40], r3
   83050: 7b 86 38 00 00 00 00 00      	stxdw [r6 + 0x38], r8
   83058: 7b 96 30 00 00 00 00 00      	stxdw [r6 + 0x30], r9
   83060: 7b 76 28 00 00 00 00 00      	stxdw [r6 + 0x28], r7
   83068: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   83070: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   83078: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   83080: 05 00 e7 ff 00 00 00 00      	ja -0x19 <.text+0x82ea0>
