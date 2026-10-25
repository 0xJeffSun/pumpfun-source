   a08f8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   a0900: 79 27 40 00 00 00 00 00      	ldxdw r7, [r2 + 0x40]
   a0908: 15 07 1a 00 00 00 00 00      	jeq r7, 0x0, +0x1a <.text+0xa08c0>
   a0910: 07 03 00 00 28 00 00 00      	add64 r3, 0x28
   a0918: 71 21 9a 00 00 00 00 00      	ldxb r1, [r2 + 0x9a]
   a0920: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xa0818>
   a0928: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   a0930: 07 03 00 00 60 00 00 00      	add64 r3, 0x60
   a0938: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   a0940: 79 24 48 00 00 00 00 00      	ldxdw r4, [r2 + 0x48]
   a0948: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0950: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   a0958: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
   a0960: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   a0968: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   a0970: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a0978: 85 10 00 00 89 29 02 00      	call 0x22989
   a0980: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0988: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   a0990: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   a0998: 79 a3 e8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x118]
   a09a0: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   a09a8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a09b0: 85 10 00 00 da 26 02 00      	call 0x226da
   a09b8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   a09c0: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   a09c8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   a09d0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a09d8: 05 00 40 00 00 00 00 00      	ja +0x40 <.text+0xa0ac0>
   a09e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a09e8: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   a09f0: 18 02 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f54
   a0a00: 85 10 00 00 2f 6d 01 00      	call 0x16d2f
   a0a08: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a0a10: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   a0a18: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   a0a20: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0a30: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   a0a38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0a40: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   a0a48: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0a50: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   a0a58: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   a0a60: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   a0a68: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   a0a70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0a78: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   a0a80: 18 01 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f54
   a0a90: 85 10 00 00 7e 7a 01 00      	call 0x17a7e
   a0a98: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xa09d0>
   a0aa0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a0aa8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   a0ab0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   a0ac0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   a0ac8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   a0ad8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   a0ae8: 85 10 00 00 65 18 02 00      	call 0x21865
   a0af0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   a0af8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   a0b00: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a0b08: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a0b10: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a0b18: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a0b20: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a0b28: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a0b30: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a0b38: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a0b40: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a0b48: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a0b50: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a0b60: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   a0b68: 62 0a 88 ff 8a 17 00 00      	stw [r10 - 0x78], 0x178a
   a0b70: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   a0b78: 62 0a 08 ff b1 09 00 00      	stw [r10 - 0xf8], 0x9b1
   a0b80: 7a 0a 00 ff 18 00 00 00      	stdw [r10 - 0x100], 0x18
   a0b88: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   a0b90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0b98: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   a0ba0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0ba8: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   a0bb0: 85 10 00 00 ef f5 01 00      	call 0x1f5ef
   a0bb8: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   a0bc0: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   a0bc8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   a0bd0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a0bd8: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   a0be0: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   a0be8: 95 00 00 00 00 00 00 00      	exit
