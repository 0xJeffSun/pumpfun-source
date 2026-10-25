   a0070: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   a0078: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   a0080: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   a0088: 79 82 48 00 00 00 00 00      	ldxdw r2, [r8 + 0x48]
   a0090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0098: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   a00a0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   a00a8: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   a00b0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a00b8: 85 10 00 00 a1 2a 02 00      	call 0x22aa1
   a00c0: 79 84 40 00 00 00 00 00      	ldxdw r4, [r8 + 0x40]
   a00c8: 3d 74 22 00 00 00 00 00      	jge r4, r7, +0x22 <.text+0xa00c0>
   a00d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a00d8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a00e0: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a00f0: 85 10 00 00 51 6e 01 00      	call 0x16e51
   a00f8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a0100: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a0108: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a0110: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0120: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0128: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0130: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a0138: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a0140: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a0148: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a0150: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a0158: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a0160: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0168: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a0170: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a0180: 85 10 00 00 a0 7b 01 00      	call 0x17ba0
   a0188: 15 00 24 00 00 00 00 00      	jeq r0, 0x0, +0x24 <.text+0xa0190>
   a0190: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a0198: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   a01a0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   a01b0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   a01b8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   a01c8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   a01d8: 85 10 00 00 87 19 02 00      	call 0x21987
   a01e0: 5d 74 35 00 00 00 00 00      	jne r4, r7, +0x35 <.text+0xa0270>
   a01e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a01f0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a01f8: 18 02 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f54
   a0208: 85 10 00 00 2e 6e 01 00      	call 0x16e2e
   a0210: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a0218: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a0220: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a0228: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0238: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0240: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0248: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a0250: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a0258: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a0260: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a0268: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a0270: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a0278: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0280: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a0288: 18 01 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f54
   a0298: 85 10 00 00 7d 7b 01 00      	call 0x17b7d
   a02a0: 15 00 32 00 00 00 00 00      	jeq r0, 0x0, +0x32 <.text+0xa0318>
   a02a8: 05 00 dc ff 00 00 00 00      	ja -0x24 <.text+0xa0070>
   a02b0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a02b8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a02c0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a02c8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a02d0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a02d8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a02e0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a02e8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a02f0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a02f8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a0300: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a0308: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a0310: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a0320: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a0328: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a0330: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a0338: 62 0a 00 ff 7c 09 00 00      	stw [r10 - 0x100], 0x97c
   a0340: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a0348: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a0350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0358: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   a0360: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0368: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a0370: 85 10 00 00 f7 f6 01 00      	call 0x1f6f7
   a0378: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   a0380: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
   a0388: 05 00 30 00 00 00 00 00      	ja +0x30 <.text+0xa03f0>
   a0390: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   a0398: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   a03a0: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
   a03a8: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
   a03b0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   a03b8: ad 74 01 00 00 00 00 00      	jlt r4, r7, +0x1 <.text+0xa02a8>
   a03c0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a03c8: 1f 74 00 00 00 00 00 00      	sub64 r4, r7
   a03d0: 87 05 00 00 00 00 00 00      	neg64 r5
   a03d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a03e0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   a03e8: 85 10 00 00 93 27 02 00      	call 0x22793
   a03f0: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   a03f8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   a0400: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a0408: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xa02f8>
   a0410: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   a0418: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   a0420: 0f 91 00 00 00 00 00 00      	add64 r1, r9
   a0428: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   a0430: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0xa0408>
   a0438: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a0440: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a0448: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a0450: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a0458: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a0460: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a0468: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a0470: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a0478: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a0480: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a0488: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a0490: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a0498: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a04a8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a04b0: 62 0a 80 ff 8a 17 00 00      	stw [r10 - 0x80], 0x178a
   a04b8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a04c0: 62 0a 00 ff 7e 09 00 00      	stw [r10 - 0x100], 0x97e
   a04c8: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a04d0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a04d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a04e0: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   a04e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a04f0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a04f8: 85 10 00 00 c6 f6 01 00      	call 0x1f6c6
   a0500: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   a0508: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   a0510: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   a0518: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a0520: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   a0528: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   a0530: 95 00 00 00 00 00 00 00      	exit
