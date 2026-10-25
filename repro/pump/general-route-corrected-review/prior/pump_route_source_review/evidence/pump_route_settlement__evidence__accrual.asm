0a1bd8: bf 16 00 00 00 00 00 00       	mov64 r6, r1
0a1be0: 71 20 9a 00 00 00 00 00       	ldxb r0, [r2 + 0x9a]
0a1be8: b7 01 00 00 00 00 00 00       	mov64 r1, 0x0
0a1bf0: 55 00 17 00 00 00 00 00       	jne r0, 0x0, +0x17 <.text+0xa1b90> ; branch 0xa1cb0
0a1bf8: bf 57 00 00 00 00 00 00       	mov64 r7, r5
0a1c00: bf 28 00 00 00 00 00 00       	mov64 r8, r2
0a1c08: 79 32 18 04 00 00 00 00       	ldxdw r2, [r3 + 0x418]
0a1c10: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1c18: 07 01 00 00 d8 fe ff ff       	add64 r1, -0x128
0a1c20: b7 03 00 00 00 00 00 00       	mov64 r3, 0x0
0a1c28: bf 49 00 00 00 00 00 00       	mov64 r9, r4
0a1c30: b7 05 00 00 00 00 00 00       	mov64 r5, 0x0
0a1c38: 85 10 00 00 31 27 02 00       	call 0x22731 ; target 0x1b55c8
0a1c40: 79 a3 e0 fe 00 00 00 00       	ldxdw r3, [r10 - 0x120]
0a1c48: 25 03 97 00 0f 27 00 00       	jgt r3, 0x270f, +0x97 <.text+0xa1fe8> ; branch 0xa2108
0a1c50: 79 a2 d8 fe 00 00 00 00       	ldxdw r2, [r10 - 0x128]
0a1c58: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1c60: 07 01 00 00 c8 fe ff ff       	add64 r1, -0x138
0a1c68: b7 04 00 00 10 27 00 00       	mov64 r4, 0x2710
0a1c70: b7 05 00 00 00 00 00 00       	mov64 r5, 0x0
0a1c78: 85 10 00 00 81 24 02 00       	call 0x22481 ; target 0x1b4088
0a1c80: 79 a1 c8 fe 00 00 00 00       	ldxdw r1, [r10 - 0x138]
0a1c88: bf 94 00 00 00 00 00 00       	mov64 r4, r9
0a1c90: ad 14 98 00 00 00 00 00       	jlt r4, r1, +0x98 <.text+0xa2038> ; branch 0xa2158
0a1c98: 1f 14 00 00 00 00 00 00       	sub64 r4, r1
0a1ca0: bf 82 00 00 00 00 00 00       	mov64 r2, r8
0a1ca8: bf 75 00 00 00 00 00 00       	mov64 r5, r7
0a1cb0: 79 20 78 00 00 00 00 00       	ldxdw r0, [r2 + 0x78]
0a1cb8: bf 03 00 00 00 00 00 00       	mov64 r3, r0
0a1cc0: 0f 43 00 00 00 00 00 00       	add64 r3, r4
0a1cc8: b7 04 00 00 01 00 00 00       	mov64 r4, 0x1
0a1cd0: ad 03 01 00 00 00 00 00       	jlt r3, r0, +0x1 <.text+0xa1bc0> ; branch 0xa1ce0
0a1cd8: b7 04 00 00 00 00 00 00       	mov64 r4, 0x0
0a1ce0: 57 04 00 00 01 00 00 00       	and64 r4, 0x1
0a1ce8: 55 04 23 00 00 00 00 00       	jne r4, 0x0, +0x23 <.text+0xa1ce8> ; branch 0xa1e08
0a1cf0: 7b 32 78 00 00 00 00 00       	stxdw [r2 + 0x78], r3
0a1cf8: 79 20 70 00 00 00 00 00       	ldxdw r0, [r2 + 0x70]
0a1d00: bf 03 00 00 00 00 00 00       	mov64 r3, r0
0a1d08: 0f 53 00 00 00 00 00 00       	add64 r3, r5
0a1d10: b7 04 00 00 01 00 00 00       	mov64 r4, 0x1
0a1d18: ad 03 01 00 00 00 00 00       	jlt r3, r0, +0x1 <.text+0xa1c08> ; branch 0xa1d28
0a1d20: b7 04 00 00 00 00 00 00       	mov64 r4, 0x0
0a1d28: 57 04 00 00 01 00 00 00       	and64 r4, 0x1
0a1d30: 55 04 01 00 00 00 00 00       	jne r4, 0x0, +0x1 <.text+0xa1c20> ; branch 0xa1d40
0a1d38: 05 00 57 00 00 00 00 00       	ja +0x57 <.text+0xa1ed8> ; branch 0xa1ff8
0a1d40: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1d48: 07 01 00 00 88 ff ff ff       	add64 r1, -0x78
0a1d50: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00       	lddw r2, 0x1b5efc
0a1d60: 85 10 00 00 c3 6a 01 00       	call 0x16ac3 ; target 0x157380
0a1d68: 7a 0a b0 ff 00 00 00 00       	stdw [r10 - 0x50], 0x0
0a1d70: 7a 0a a8 ff 01 00 00 00       	stdw [r10 - 0x58], 0x1
0a1d78: 7a 0a a0 ff 00 00 00 00       	stdw [r10 - 0x60], 0x0
0a1d80: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1bd838
0a1d90: 7b 1a e0 ff 00 00 00 00       	stxdw [r10 - 0x20], r1
0a1d98: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1da0: 07 01 00 00 a0 ff ff ff       	add64 r1, -0x60
0a1da8: 7b 1a d8 ff 00 00 00 00       	stxdw [r10 - 0x28], r1
0a1db0: 72 0a f0 ff 03 00 00 00       	stb [r10 - 0x10], 0x3
0a1db8: 7a 0a e8 ff 20 00 00 00       	stdw [r10 - 0x18], 0x20
0a1dc0: 7a 0a c8 ff 00 00 00 00       	stdw [r10 - 0x38], 0x0
0a1dc8: 7a 0a b8 ff 00 00 00 00       	stdw [r10 - 0x48], 0x0
0a1dd0: bf a2 00 00 00 00 00 00       	mov64 r2, r10
0a1dd8: 07 02 00 00 b8 ff ff ff       	add64 r2, -0x48
0a1de0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b5efc
0a1df0: 85 10 00 00 12 78 01 00       	call 0x17812 ; target 0x15de88
0a1df8: 15 00 43 00 00 00 00 00       	jeq r0, 0x0, +0x43 <.text+0xa1ef8> ; branch 0xa2018
0a1e00: 05 00 18 00 00 00 00 00       	ja +0x18 <.text+0xa1da8> ; branch 0xa1ec8
0a1e08: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1e10: 07 01 00 00 88 ff ff ff       	add64 r1, -0x78
0a1e18: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00       	lddw r2, 0x1b5efc
0a1e28: 85 10 00 00 aa 6a 01 00       	call 0x16aaa ; target 0x157380
0a1e30: 7a 0a b0 ff 00 00 00 00       	stdw [r10 - 0x50], 0x0
0a1e38: 7a 0a a8 ff 01 00 00 00       	stdw [r10 - 0x58], 0x1
0a1e40: 7a 0a a0 ff 00 00 00 00       	stdw [r10 - 0x60], 0x0
0a1e48: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1bd838
0a1e58: 7b 1a e0 ff 00 00 00 00       	stxdw [r10 - 0x20], r1
0a1e60: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1e68: 07 01 00 00 a0 ff ff ff       	add64 r1, -0x60
0a1e70: 7b 1a d8 ff 00 00 00 00       	stxdw [r10 - 0x28], r1
0a1e78: 72 0a f0 ff 03 00 00 00       	stb [r10 - 0x10], 0x3
0a1e80: 7a 0a e8 ff 20 00 00 00       	stdw [r10 - 0x18], 0x20
0a1e88: 7a 0a c8 ff 00 00 00 00       	stdw [r10 - 0x38], 0x0
0a1e90: 7a 0a b8 ff 00 00 00 00       	stdw [r10 - 0x48], 0x0
0a1e98: bf a2 00 00 00 00 00 00       	mov64 r2, r10
0a1ea0: 07 02 00 00 b8 ff ff ff       	add64 r2, -0x48
0a1ea8: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b5efc
0a1eb8: 85 10 00 00 f9 77 01 00       	call 0x177f9 ; target 0x15de88
0a1ec0: 15 00 0a 00 00 00 00 00       	jeq r0, 0x0, +0xa <.text+0xa1df8> ; branch 0xa1f18
0a1ec8: bf a3 00 00 00 00 00 00       	mov64 r3, r10
0a1ed0: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
0a1ed8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b5fa4
0a1ee8: b7 02 00 00 37 00 00 00       	mov64 r2, 0x37
0a1ef0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00       	lddw r4, 0x1bd868
0a1f00: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00       	lddw r5, 0x1bd888
0a1f10: 85 10 00 00 e0 15 02 00       	call 0x215e0 ; target 0x1ace18
0a1f18: 79 a1 b0 ff 00 00 00 00       	ldxdw r1, [r10 - 0x50]
0a1f20: 7b 1a 30 ff 00 00 00 00       	stxdw [r10 - 0xd0], r1
0a1f28: 79 a1 a8 ff 00 00 00 00       	ldxdw r1, [r10 - 0x58]
0a1f30: 7b 1a 28 ff 00 00 00 00       	stxdw [r10 - 0xd8], r1
0a1f38: 79 a1 a0 ff 00 00 00 00       	ldxdw r1, [r10 - 0x60]
0a1f40: 7b 1a 20 ff 00 00 00 00       	stxdw [r10 - 0xe0], r1
0a1f48: 79 a1 88 ff 00 00 00 00       	ldxdw r1, [r10 - 0x78]
0a1f50: 7b 1a 08 ff 00 00 00 00       	stxdw [r10 - 0xf8], r1
0a1f58: 79 a1 90 ff 00 00 00 00       	ldxdw r1, [r10 - 0x70]
0a1f60: 7b 1a 10 ff 00 00 00 00       	stxdw [r10 - 0xf0], r1
0a1f68: 79 a1 98 ff 00 00 00 00       	ldxdw r1, [r10 - 0x68]
0a1f70: 7b 1a 18 ff 00 00 00 00       	stxdw [r10 - 0xe8], r1
0a1f78: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b72c5
0a1f88: 7b 1a f0 fe 00 00 00 00       	stxdw [r10 - 0x110], r1
0a1f90: 62 0a 80 ff 88 17 00 00       	stw [r10 - 0x80], 0x1788
0a1f98: 72 0a 38 ff 02 00 00 00       	stb [r10 - 0xc8], 0x2
0a1fa0: 62 0a 00 ff f6 09 00 00       	stw [r10 - 0x100], 0x9f6
0a1fa8: 7a 0a f8 fe 18 00 00 00       	stdw [r10 - 0x108], 0x18
0a1fb0: 7a 0a e8 fe 00 00 00 00       	stdw [r10 - 0x118], 0x0
0a1fb8: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a1fc0: 07 01 00 00 a8 fe ff ff       	add64 r1, -0x158
0a1fc8: bf a2 00 00 00 00 00 00       	mov64 r2, r10
0a1fd0: 07 02 00 00 e8 fe ff ff       	add64 r2, -0x118
0a1fd8: 85 10 00 00 6a f3 01 00       	call 0x1f36a ; target 0x19bb30
0a1fe0: 79 a1 a8 fe 00 00 00 00       	ldxdw r1, [r10 - 0x158]
0a1fe8: 79 a2 b0 fe 00 00 00 00       	ldxdw r2, [r10 - 0x150]
0a1ff0: 05 00 1f 00 00 00 00 00       	ja +0x1f <.text+0xa1fd0> ; branch 0xa20f0
0a1ff8: 7b 32 70 00 00 00 00 00       	stxdw [r2 + 0x70], r3
0a2000: 7b 16 08 00 00 00 00 00       	stxdw [r6 + 0x8], r1
0a2008: 7a 06 00 00 02 00 00 00       	stdw [r6 + 0x0], 0x2
0a2010: 05 00 1d 00 00 00 00 00       	ja +0x1d <.text+0xa1fe0> ; branch 0xa2100
0a2018: 79 a1 b0 ff 00 00 00 00       	ldxdw r1, [r10 - 0x50]
0a2020: 7b 1a 30 ff 00 00 00 00       	stxdw [r10 - 0xd0], r1
0a2028: 79 a1 a8 ff 00 00 00 00       	ldxdw r1, [r10 - 0x58]
0a2030: 7b 1a 28 ff 00 00 00 00       	stxdw [r10 - 0xd8], r1
0a2038: 79 a1 a0 ff 00 00 00 00       	ldxdw r1, [r10 - 0x60]
0a2040: 7b 1a 20 ff 00 00 00 00       	stxdw [r10 - 0xe0], r1
0a2048: 79 a1 88 ff 00 00 00 00       	ldxdw r1, [r10 - 0x78]
0a2050: 7b 1a 08 ff 00 00 00 00       	stxdw [r10 - 0xf8], r1
0a2058: 79 a1 90 ff 00 00 00 00       	ldxdw r1, [r10 - 0x70]
0a2060: 7b 1a 10 ff 00 00 00 00       	stxdw [r10 - 0xf0], r1
0a2068: 79 a1 98 ff 00 00 00 00       	ldxdw r1, [r10 - 0x68]
0a2070: 7b 1a 18 ff 00 00 00 00       	stxdw [r10 - 0xe8], r1
0a2078: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b72c5
0a2088: 7b 1a f0 fe 00 00 00 00       	stxdw [r10 - 0x110], r1
0a2090: 62 0a 80 ff 88 17 00 00       	stw [r10 - 0x80], 0x1788
0a2098: 72 0a 38 ff 02 00 00 00       	stb [r10 - 0xc8], 0x2
0a20a0: 62 0a 00 ff fa 09 00 00       	stw [r10 - 0x100], 0x9fa
0a20a8: 7a 0a f8 fe 18 00 00 00       	stdw [r10 - 0x108], 0x18
0a20b0: 7a 0a e8 fe 00 00 00 00       	stdw [r10 - 0x118], 0x0
0a20b8: bf a1 00 00 00 00 00 00       	mov64 r1, r10
0a20c0: 07 01 00 00 b8 fe ff ff       	add64 r1, -0x148
0a20c8: bf a2 00 00 00 00 00 00       	mov64 r2, r10
0a20d0: 07 02 00 00 e8 fe ff ff       	add64 r2, -0x118
0a20d8: 85 10 00 00 4a f3 01 00       	call 0x1f34a ; target 0x19bb30
0a20e0: 79 a1 b8 fe 00 00 00 00       	ldxdw r1, [r10 - 0x148]
0a20e8: 79 a2 c0 fe 00 00 00 00       	ldxdw r2, [r10 - 0x140]
0a20f0: 7b 26 08 00 00 00 00 00       	stxdw [r6 + 0x8], r2
0a20f8: 7b 16 00 00 00 00 00 00       	stxdw [r6 + 0x0], r1
0a2100: 95 00 00 00 00 00 00 00       	exit
0a2108: bf a3 00 00 00 00 00 00       	mov64 r3, r10
0a2110: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
0a2118: 18 01 00 00 03 73 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b7303
0a2128: b7 02 00 00 23 00 00 00       	mov64 r2, 0x23
0a2130: 18 04 00 00 48 de 1b 00 00 00 00 00 00 00 00 00       	lddw r4, 0x1bde48
0a2140: 18 05 00 00 f8 de 1b 00 00 00 00 00 00 00 00 00       	lddw r5, 0x1bdef8
0a2150: 85 10 00 00 98 15 02 00       	call 0x21598 ; target 0x1ace18
0a2158: 18 01 00 00 dd 72 1b 00 00 00 00 00 00 00 00 00       	lddw r1, 0x1b72dd
0a2168: b7 02 00 00 26 00 00 00       	mov64 r2, 0x26
0a2170: 18 03 00 00 e0 de 1b 00 00 00 00 00 00 00 00 00       	lddw r3, 0x1bdee0
0a2180: 85 10 00 00 74 14 02 00       	call 0x21474 ; target 0x1ac528
