   60a80: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   60a88: 71 27 98 00 00 00 00 00      	ldxb r7, [r2 + 0x98]
   60a90: 07 07 00 00 01 00 00 00      	add64 r7, 0x1
   60a98: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   60aa0: 57 01 00 00 ff 00 00 00      	and64 r1, 0xff
   60aa8: 5d 71 20 00 00 00 00 00      	jne r1, r7, +0x20 <.text+0x60a90>
   60ab0: 71 38 30 04 00 00 00 00      	ldxb r8, [r3 + 0x430]
   60ab8: a5 08 01 00 05 00 00 00      	jlt r8, 0x5, +0x1 <.text+0x609a8>
   60ac0: b7 08 00 00 05 00 00 00      	mov64 r8, 0x5
   60ac8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   60ad0: 57 01 00 00 ff 00 00 00      	and64 r1, 0xff
   60ad8: ad 18 01 00 00 00 00 00      	jlt r8, r1, +0x1 <.text+0x609c8>
   60ae0: 05 00 57 00 00 00 00 00      	ja +0x57 <.text+0x60c80>
   60ae8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60af0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   60af8: 18 02 00 00 c4 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ec4
   60b08: 85 10 00 00 0e ed 01 00      	call 0x1ed0e
   60b10: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   60b18: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   60b20: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   60b28: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   60b38: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   60b40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60b48: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   60b50: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   60b58: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   60b60: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   60b68: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   60b70: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   60b78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60b80: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   60b88: 18 01 00 00 c4 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ec4
   60b98: 85 10 00 00 5d fa 01 00      	call 0x1fa5d
   60ba0: 15 00 42 00 00 00 00 00      	jeq r0, 0x0, +0x42 <.text+0x60c98>
   60ba8: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x60b50>
   60bb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60bb8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   60bc0: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   60bd0: 85 10 00 00 f5 ec 01 00      	call 0x1ecf5
   60bd8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   60be0: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   60be8: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   60bf0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   60c00: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   60c08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60c10: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   60c18: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   60c20: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   60c28: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   60c30: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   60c38: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   60c40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60c48: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   60c50: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   60c60: 85 10 00 00 44 fa 01 00      	call 0x1fa44
   60c68: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x60ba0>
   60c70: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   60c78: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   60c80: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   60c90: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   60c98: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   60ca8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   60cb8: 85 10 00 00 2b 98 02 00      	call 0x2982b
   60cc0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   60cc8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60cd0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   60cd8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60ce0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   60ce8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60cf0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   60cf8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   60d00: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   60d08: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   60d10: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   60d18: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   60d20: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   60d30: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   60d38: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   60d40: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   60d48: 62 0a 00 ff 3d 00 00 00      	stw [r10 - 0x100], 0x3d
   60d50: 7a 0a f8 fe 1f 00 00 00      	stdw [r10 - 0x108], 0x1f
   60d58: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   60d60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60d68: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   60d70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60d78: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   60d80: 85 10 00 00 b5 75 02 00      	call 0x275b5
   60d88: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   60d90: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   60d98: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0x60da8>
   60da0: 73 76 08 00 00 00 00 00      	stxb [r6 + 0x8], r7
   60da8: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   60db0: 05 00 24 00 00 00 00 00      	ja +0x24 <.text+0x60db8>
   60db8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   60dc0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60dc8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   60dd0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60dd8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   60de0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60de8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   60df0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   60df8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   60e00: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   60e08: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   60e10: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   60e18: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   60e28: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   60e30: 62 0a 80 ff d9 17 00 00      	stw [r10 - 0x80], 0x17d9
   60e38: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   60e40: 62 0a 00 ff 3e 00 00 00      	stw [r10 - 0x100], 0x3e
   60e48: 7a 0a f8 fe 1f 00 00 00      	stdw [r10 - 0x108], 0x1f
   60e50: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   60e58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60e60: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   60e68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60e70: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   60e78: 85 10 00 00 96 75 02 00      	call 0x27596
   60e80: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   60e88: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   60e90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60e98: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   60ea0: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   60ea8: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   60eb0: 85 10 00 00 38 3f ff ff      	call -0xc0c8
   60eb8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   60ec0: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   60ec8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   60ed0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   60ed8: 95 00 00 00 00 00 00 00      	exit
