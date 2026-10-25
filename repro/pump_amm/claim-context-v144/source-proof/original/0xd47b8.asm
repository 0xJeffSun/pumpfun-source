
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   d47b8: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   d47c0: 79 27 08 00 00 00 00 00      	ldxdw r7, [r2 + 0x8]
   d47c8: 25 07 05 00 07 00 00 00      	jgt r7, 0x7, +0x5 <.text+0xd46d8>
   d47d0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   d47d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d47e0: 18 03 00 00 38 2a 12 00 00 00 00 00 00 00 00 00      	lddw r3, 0x122a38
   d47f0: 85 10 00 00 c7 83 00 00      	call 0x83c7
   d47f8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d4800: 57 01 00 00 f8 ff ff ff      	and64 r1, -0x8
   d4808: 15 01 1c 00 08 00 00 00      	jeq r1, 0x8, +0x1c <.text+0xd47d0>
   d4810: 15 01 1b 00 10 00 00 00      	jeq r1, 0x10, +0x1b <.text+0xd47d0>
   d4818: 15 01 1a 00 18 00 00 00      	jeq r1, 0x18, +0x1a <.text+0xd47d0>
   d4820: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d4828: 57 01 00 00 e0 ff ff ff      	and64 r1, -0x20
   d4830: 15 01 17 00 20 00 00 00      	jeq r1, 0x20, +0x17 <.text+0xd47d0>
   d4838: 7b 9a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r9
   d4840: 79 29 00 00 00 00 00 00      	ldxdw r9, [r2 + 0x0]
   d4848: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   d4850: 79 94 10 00 00 00 00 00      	ldxdw r4, [r9 + 0x10]
   d4858: 79 95 18 00 00 00 00 00      	ldxdw r5, [r9 + 0x18]
   d4860: 79 90 26 00 00 00 00 00      	ldxdw r0, [r9 + 0x26]
   d4868: 71 91 2e 00 00 00 00 00      	ldxb r1, [r9 + 0x2e]
   d4870: 73 1a 10 ff 00 00 00 00      	stxb [r10 - 0xf0], r1
   d4878: 7b 0a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r0
   d4880: 79 a2 09 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf7]
   d4888: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   d4890: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d4898: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   d48a0: a5 01 95 00 08 00 00 00      	jlt r1, 0x8, +0x95 <.text+0xd4c30>
   d48a8: 7b 2a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r2
   d48b0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d48b8: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   d48c0: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   d48c8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d48d0: 07 01 00 00 2f 00 00 00      	add64 r1, 0x2f
   d48d8: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   d48e0: b7 06 00 00 18 ff ff ff      	mov64 r6, -0xe8
   d48e8: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0xd48d8>
   d48f0: 18 01 00 00 c8 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221c8
   d4900: 85 10 00 00 e1 74 00 00      	call 0x74e1
   d4908: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d4910: 7b 7a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r7
   d4918: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4920: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   d4928: b7 02 00 00 bb 0b 00 00      	mov64 r2, 0xbbb
   d4930: 85 10 00 00 a0 62 00 00      	call 0x62a0
   d4938: 79 a8 08 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1f8]
   d4940: 79 a6 00 fe 00 00 00 00      	ldxdw r6, [r10 - 0x200]
   d4948: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d4950: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   d4958: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d4960: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   d4968: a5 02 05 00 02 00 00 00      	jlt r2, 0x2, +0x5 <.text+0xd4878>
   d4970: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <.text+0xd4878>
   d4978: 79 71 ff ff 00 00 00 00      	ldxdw r1, [r7 - 0x1]
   d4980: 79 72 07 00 00 00 00 00      	ldxdw r2, [r7 + 0x7]
   d4988: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   d4990: 8d 00 00 00 02 00 00 00      	callx r2
   d4998: 7b 89 10 00 00 00 00 00      	stxdw [r9 + 0x10], r8
   d49a0: 7b 69 08 00 00 00 00 00      	stxdw [r9 + 0x8], r6
   d49a8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   d49b0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d49b8: 95 00 00 00 00 00 00 00      	exit
   d49c0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d49c8: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
   d49d0: 07 06 00 00 08 00 00 00      	add64 r6, 0x8
   d49d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d49e0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   d49e8: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   d49f0: a5 02 78 00 08 00 00 00      	jlt r2, 0x8, +0x78 <.text+0xd4c98>
   d49f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4a00: 07 01 00 00 08 ff ff ff      	add64 r1, -0xf8
   d4a08: 0f 61 00 00 00 00 00 00      	add64 r1, r6
   d4a10: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   d4a18: 0f 62 00 00 00 00 00 00      	add64 r2, r6
   d4a20: 79 22 28 01 00 00 00 00      	ldxdw r2, [r2 + 0x128]
   d4a28: 7b 21 e8 00 00 00 00 00      	stxdw [r1 + 0xe8], r2
   d4a30: 79 a8 f8 ff 00 00 00 00      	ldxdw r8, [r10 - 0x8]
   d4a38: 07 08 00 00 01 00 00 00      	add64 r8, 0x1
   d4a40: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   d4a48: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0xd4938>
   d4a50: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   d4a58: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   d4a60: 55 01 74 00 00 00 00 00      	jne r1, 0x0, +0x74 <.text+0xd4ce8>
   d4a68: 7b 8a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r8
   d4a70: 15 06 01 00 00 00 00 00      	jeq r6, 0x0, +0x1 <.text+0xd4960>
   d4a78: 05 00 e8 ff 00 00 00 00      	ja -0x18 <.text+0xd48a0>
   d4a80: 7b 0a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r0
   d4a88: 7b 5a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r5
   d4a90: 7b 4a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r4
   d4a98: 7b 3a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r3
   d4aa0: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   d4aa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4ab0: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   d4ab8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4ac0: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   d4ac8: b7 03 00 00 e8 00 00 00      	mov64 r3, 0xe8
   d4ad0: 85 10 00 00 b8 89 00 00      	call 0x89b8
   d4ad8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   d4ae0: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   d4ae8: a5 07 4c 00 08 00 00 00      	jlt r7, 0x8, +0x4c <.text+0xd4c30>
   d4af0: 7b 8a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r8
   d4af8: 0f 69 00 00 00 00 00 00      	add64 r9, r6
   d4b00: 07 09 00 00 30 01 00 00      	add64 r9, 0x130
   d4b08: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   d4b10: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0xd4a18>
   d4b18: 07 07 00 00 f8 ff ff ff      	add64 r7, -0x8
   d4b20: 07 09 00 00 08 00 00 00      	add64 r9, 0x8
   d4b28: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   d4b30: a5 07 4a 00 08 00 00 00      	jlt r7, 0x8, +0x4a <.text+0xd4c68>
   d4b38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4b40: 07 02 00 00 08 ff ff ff      	add64 r2, -0xf8
   d4b48: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   d4b50: 79 93 00 00 00 00 00 00      	ldxdw r3, [r9 + 0x0]
   d4b58: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   d4b60: 79 a8 f8 ff 00 00 00 00      	ldxdw r8, [r10 - 0x8]
   d4b68: 07 08 00 00 01 00 00 00      	add64 r8, 0x1
   d4b70: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d4b78: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0xd4a68>
   d4b80: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d4b88: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   d4b90: 55 02 4e 00 00 00 00 00      	jne r2, 0x0, +0x4e <.text+0xd4ce8>
   d4b98: 7b 8a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r8
   d4ba0: 15 01 01 00 e8 00 00 00      	jeq r1, 0xe8, +0x1 <.text+0xd4a90>
   d4ba8: 05 00 ed ff 00 00 00 00      	ja -0x13 <.text+0xd49f8>
   d4bb0: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   d4bb8: 79 a9 f8 fd 00 00 00 00      	ldxdw r9, [r10 - 0x208]
   d4bc0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d4bc8: 07 01 00 00 20 01 00 00      	add64 r1, 0x120
   d4bd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4bd8: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   d4be0: b7 03 00 00 e8 00 00 00      	mov64 r3, 0xe8
   d4be8: 85 10 00 00 95 89 00 00      	call 0x8995
   d4bf0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   d4bf8: 61 21 00 00 00 00 00 00      	ldxw r1, [r2 + 0x0]
   d4c00: 63 1a 10 fe 00 00 00 00      	stxw [r10 - 0x1f0], r1
   d4c08: 69 21 04 00 00 00 00 00      	ldxh r1, [r2 + 0x4]
   d4c10: 6b 1a 14 fe 00 00 00 00      	stxh [r10 - 0x1ec], r1
   d4c18: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   d4c20: 71 21 10 00 00 00 00 00      	ldxb r1, [r2 + 0x10]
   d4c28: 73 1a 27 ff 00 00 00 00      	stxb [r10 - 0xd9], r1
   d4c30: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d4c38: 7b 1a 1f ff 00 00 00 00      	stxdw [r10 - 0xe1], r1
   d4c40: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d4c48: 7b 1a 17 ff 00 00 00 00      	stxdw [r10 - 0xe9], r1
   d4c50: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d4c58: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   d4c60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4c68: 07 02 00 00 20 fe ff ff      	add64 r2, -0x1e0
   d4c70: b7 03 00 00 e8 00 00 00      	mov64 r3, 0xe8
   d4c78: 85 10 00 00 83 89 00 00      	call 0x8983
   d4c80: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   d4c88: 73 1a 16 fe 00 00 00 00      	stxb [r10 - 0x1ea], r1
   d4c90: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   d4c98: 7b 1a 17 fe 00 00 00 00      	stxdw [r10 - 0x1e9], r1
   d4ca0: 7b 1a 0f ff 00 00 00 00      	stxdw [r10 - 0xf1], r1
   d4ca8: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   d4cb0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   d4cb8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   d4cc0: 7b 19 18 00 00 00 00 00      	stxdw [r9 + 0x18], r1
   d4cc8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d4cd0: 7b 19 20 00 00 00 00 00      	stxdw [r9 + 0x20], r1
   d4cd8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   d4ce0: 7b 19 10 00 00 00 00 00      	stxdw [r9 + 0x10], r1
   d4ce8: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   d4cf0: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   d4cf8: 7b 29 18 02 00 00 00 00      	stxdw [r9 + 0x218], r2
   d4d00: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   d4d08: 7b 29 10 02 00 00 00 00      	stxdw [r9 + 0x210], r2
   d4d10: 79 a2 d8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x228]
   d4d18: 7b 29 08 02 00 00 00 00      	stxdw [r9 + 0x208], r2
   d4d20: 7b 69 18 01 00 00 00 00      	stxdw [r9 + 0x118], r6
   d4d28: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   d4d30: 7b 29 28 00 00 00 00 00      	stxdw [r9 + 0x28], r2
   d4d38: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   d4d40: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   d4d48: 05 00 8c ff 00 00 00 00      	ja -0x74 <.text+0xd4890>
   d4d50: 18 01 00 00 c8 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221c8
   d4d60: 85 10 00 00 55 74 00 00      	call 0x7455
   d4d68: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d4d70: 7b 7a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r7
   d4d78: 79 a9 f8 fd 00 00 00 00      	ldxdw r9, [r10 - 0x208]
   d4d80: 05 00 72 ff 00 00 00 00      	ja -0x8e <.text+0xd47f8>
   d4d88: 18 01 00 00 c8 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221c8
   d4d98: 85 10 00 00 4e 74 00 00      	call 0x744e
   d4da0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d4da8: a5 08 f8 ff 1f 00 00 00      	jlt r8, 0x1f, -0x8 <.text+0xd4c50>
   d4db0: 05 00 05 00 00 00 00 00      	ja +0x5 <.text+0xd4cc0>
   d4db8: 18 01 00 00 c8 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221c8
   d4dc8: 85 10 00 00 48 74 00 00      	call 0x7448
   d4dd0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d4dd8: a5 08 f2 ff 1f 00 00 00      	jlt r8, 0x1f, -0xe <.text+0xd4c50>
   d4de0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d4de8: b7 02 00 00 1e 00 00 00      	mov64 r2, 0x1e
   d4df0: 18 03 00 00 b0 21 12 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1221b0
   d4e00: 85 10 00 00 1f 83 00 00      	call 0x831f
   d4e08: 18 01 00 00 f8 22 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1222f8
   d4e18: 85 10 00 00 bd 86 00 00      	call 0x86bd
