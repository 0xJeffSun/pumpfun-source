   a1bd8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   a1be0: 71 20 9a 00 00 00 00 00      	ldxb r0, [r2 + 0x9a]
   a1be8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   a1bf0: 55 00 17 00 00 00 00 00      	jne r0, 0x0, +0x17 <.text+0xa1b90>
   a1bf8: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   a1c00: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   a1c08: 79 32 18 04 00 00 00 00      	ldxdw r2, [r3 + 0x418]
   a1c10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1c18: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   a1c20: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   a1c28: bf 49 00 00 00 00 00 00      	mov64 r9, r4
   a1c30: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a1c38: 85 10 00 00 31 27 02 00      	call 0x22731
   a1c40: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   a1c48: 25 03 97 00 0f 27 00 00      	jgt r3, 0x270f, +0x97 <.text+0xa1fe8>
   a1c50: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   a1c58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1c60: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   a1c68: b7 04 00 00 10 27 00 00      	mov64 r4, 0x2710
   a1c70: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   a1c78: 85 10 00 00 81 24 02 00      	call 0x22481
   a1c80: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   a1c88: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   a1c90: ad 14 98 00 00 00 00 00      	jlt r4, r1, +0x98 <.text+0xa2038>
   a1c98: 1f 14 00 00 00 00 00 00      	sub64 r4, r1
   a1ca0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   a1ca8: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   a1cb0: 79 20 78 00 00 00 00 00      	ldxdw r0, [r2 + 0x78]
   a1cb8: bf 03 00 00 00 00 00 00      	mov64 r3, r0
   a1cc0: 0f 43 00 00 00 00 00 00      	add64 r3, r4
   a1cc8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   a1cd0: ad 03 01 00 00 00 00 00      	jlt r3, r0, +0x1 <.text+0xa1bc0>
   a1cd8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   a1ce0: 57 04 00 00 01 00 00 00      	and64 r4, 0x1
   a1ce8: 55 04 23 00 00 00 00 00      	jne r4, 0x0, +0x23 <.text+0xa1ce8>
   a1cf0: 7b 32 78 00 00 00 00 00      	stxdw [r2 + 0x78], r3
   a1cf8: 79 20 70 00 00 00 00 00      	ldxdw r0, [r2 + 0x70]
   a1d00: bf 03 00 00 00 00 00 00      	mov64 r3, r0
   a1d08: 0f 53 00 00 00 00 00 00      	add64 r3, r5
   a1d10: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   a1d18: ad 03 01 00 00 00 00 00      	jlt r3, r0, +0x1 <.text+0xa1c08>
   a1d20: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   a1d28: 57 04 00 00 01 00 00 00      	and64 r4, 0x1
   a1d30: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xa1c20>
   a1d38: 05 00 57 00 00 00 00 00      	ja +0x57 <.text+0xa1ed8>
   a1d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1d48: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a1d50: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a1d60: 85 10 00 00 c3 6a 01 00      	call 0x16ac3
   a1d68: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a1d70: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a1d78: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a1d80: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a1d90: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a1d98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1da0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a1da8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a1db0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a1db8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a1dc0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a1dc8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a1dd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a1dd8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a1de0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a1df0: 85 10 00 00 12 78 01 00      	call 0x17812
   a1df8: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <.text+0xa1ef8>
   a1e00: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0xa1da8>
   a1e08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1e10: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a1e18: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a1e28: 85 10 00 00 aa 6a 01 00      	call 0x16aaa
   a1e30: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a1e38: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a1e40: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a1e48: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a1e58: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a1e60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1e68: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a1e70: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a1e78: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a1e80: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a1e88: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a1e90: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a1e98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a1ea0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a1ea8: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a1eb8: 85 10 00 00 f9 77 01 00      	call 0x177f9
   a1ec0: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xa1df8>
   a1ec8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a1ed0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   a1ed8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   a1ee8: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   a1ef0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   a1f00: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   a1f10: 85 10 00 00 e0 15 02 00      	call 0x215e0
   a1f18: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a1f20: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a1f28: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a1f30: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a1f38: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a1f40: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a1f48: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a1f50: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a1f58: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a1f60: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a1f68: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a1f70: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a1f78: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a1f88: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a1f90: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a1f98: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a1fa0: 62 0a 00 ff f6 09 00 00      	stw [r10 - 0x100], 0x9f6
   a1fa8: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a1fb0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a1fb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1fc0: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   a1fc8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a1fd0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a1fd8: 85 10 00 00 6a f3 01 00      	call 0x1f36a
   a1fe0: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   a1fe8: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
   a1ff0: 05 00 1f 00 00 00 00 00      	ja +0x1f <.text+0xa1fd0>
   a1ff8: 7b 32 70 00 00 00 00 00      	stxdw [r2 + 0x70], r3
   a2000: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a2008: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   a2010: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0xa1fe0>
   a2018: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a2020: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a2028: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a2030: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a2038: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a2040: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a2048: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a2050: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a2058: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a2060: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a2068: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a2070: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a2078: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a2088: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a2090: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a2098: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a20a0: 62 0a 00 ff fa 09 00 00      	stw [r10 - 0x100], 0x9fa
   a20a8: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a20b0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a20b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a20c0: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   a20c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a20d0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a20d8: 85 10 00 00 4a f3 01 00      	call 0x1f34a
   a20e0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   a20e8: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   a20f0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   a20f8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   a2100: 95 00 00 00 00 00 00 00      	exit
   a2108: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a2110: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   a2118: 18 01 00 00 03 73 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b7303
   a2128: b7 02 00 00 23 00 00 00      	mov64 r2, 0x23
   a2130: 18 04 00 00 48 de 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bde48
   a2140: 18 05 00 00 f8 de 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bdef8
   a2150: 85 10 00 00 98 15 02 00      	call 0x21598
   a2158: 18 01 00 00 dd 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72dd
   a2168: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   a2170: 18 03 00 00 e0 de 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdee0
   a2180: 85 10 00 00 74 14 02 00      	call 0x21474
