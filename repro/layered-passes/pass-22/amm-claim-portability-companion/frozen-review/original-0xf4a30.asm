
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
   f4a30: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   f4a38: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   f4a40: 79 90 78 00 00 00 00 00      	ldxdw r0, [r9 + 0x78]
   f4a48: 79 96 48 00 00 00 00 00      	ldxdw r6, [r9 + 0x48]
   f4a50: 79 92 18 00 00 00 00 00      	ldxdw r2, [r9 + 0x18]
   f4a58: 79 91 a8 00 00 00 00 00      	ldxdw r1, [r9 + 0xa8]
   f4a60: 79 95 d8 00 00 00 00 00      	ldxdw r5, [r9 + 0xd8]
   f4a68: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   f4a70: 7b 4a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r4
   f4a78: 7b 5a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r5
   f4a80: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   f4a88: 7a 0a 18 f0 00 00 00 00      	stdw [r10 - 0xfe8], 0x0
   f4a90: 7a 0a 10 f0 08 00 00 00      	stdw [r10 - 0xff0], 0x8
   f4a98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4aa0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   f4aa8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   f4ab0: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   f4ab8: bf 04 00 00 00 00 00 00      	mov64 r4, r0
   f4ac0: 85 10 00 00 23 16 00 00      	call 0x1623
   f4ac8: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   f4ad0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   f4ad8: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   f4ae0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   f4ae8: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   f4af0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   f4af8: 79 a8 40 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc0]
   f4b00: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   f4b10: 1d 18 72 00 00 00 00 00      	jeq r8, r1, +0x72 <custom_panic+0x69f8>
   f4b18: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   f4b20: 07 01 00 00 d8 00 00 00      	add64 r1, 0xd8
   f4b28: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   f4b30: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   f4b38: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
   f4b40: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   f4b48: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   f4b50: 07 06 00 00 78 00 00 00      	add64 r6, 0x78
   f4b58: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   f4b60: 07 07 00 00 48 00 00 00      	add64 r7, 0x48
   f4b68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4b70: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   f4b78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   f4b80: 07 02 00 00 60 ff ff ff      	add64 r2, -0xa0
   f4b88: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   f4b90: 85 10 00 00 a0 49 00 00      	call 0x49a0
   f4b98: 7b 8a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r8
   f4ba0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   f4ba8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   f4bb0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   f4bb8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   f4bc0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   f4bc8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   f4bd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4bd8: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   f4be0: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   f4be8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f4bf0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   f4bf8: 85 10 00 00 93 49 00 00      	call 0x4993
   f4c00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4c08: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   f4c10: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   f4c18: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   f4c20: 85 10 00 00 8e 49 00 00      	call 0x498e
   f4c28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4c30: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   f4c38: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   f4c40: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   f4c48: 85 10 00 00 89 49 00 00      	call 0x4989
   f4c50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4c58: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   f4c60: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   f4c68: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   f4c70: 85 10 00 00 84 49 00 00      	call 0x4984
   f4c78: 79 91 10 01 00 00 00 00      	ldxdw r1, [r9 + 0x110]
   f4c80: 79 92 08 01 00 00 00 00      	ldxdw r2, [r9 + 0x108]
   f4c88: 7b 2a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r2
   f4c90: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   f4c98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4ca0: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   f4ca8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   f4cb0: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   f4cb8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   f4cc0: 79 a3 80 fe 00 00 00 00      	ldxdw r3, [r10 - 0x180]
   f4cc8: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   f4cd0: 85 10 00 00 bc 23 00 00      	call 0x23bc
   f4cd8: b7 06 00 00 02 00 00 00      	mov64 r6, 0x2
   f4ce0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   f4cf0: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   f4cf8: 1d 12 08 00 00 00 00 00      	jeq r2, r1, +0x8 <custom_panic+0x6890>
   f4d00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4d08: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   f4d10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   f4d18: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   f4d20: 85 10 00 00 63 1c 00 00      	call 0x1c63
   f4d28: 79 a8 c0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x140]
   f4d30: 79 a7 b8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x148]
   f4d38: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
   f4d40: 15 08 05 00 00 00 00 00      	jeq r8, 0x0, +0x5 <custom_panic+0x68c0>
   f4d48: 27 08 00 00 22 00 00 00      	mul64 r8, 0x22
   f4d50: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   f4d58: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   f4d60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   f4d68: 85 10 00 00 a8 f2 ff ff      	call -0xd58
   f4d70: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   f4d78: 15 02 03 00 00 00 00 00      	jeq r2, 0x0, +0x3 <custom_panic+0x68e8>
   f4d80: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   f4d88: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   f4d90: 85 10 00 00 a3 f2 ff ff      	call -0xd5d
   f4d98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4da0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   f4da8: 85 10 00 00 25 fd ff ff      	call -0x2db
   f4db0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   f4db8: 85 10 00 00 21 fe ff ff      	call -0x1df
   f4dc0: 79 98 28 00 00 00 00 00      	ldxdw r8, [r9 + 0x28]
   f4dc8: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
   f4dd0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f4dd8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4de0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f4de8: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6978>
   f4df0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f4df8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4e00: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f4e08: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6978>
   f4e10: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f4e18: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f4e20: 85 10 00 00 91 f2 ff ff      	call -0xd6f
   f4e28: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f4e30: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f4e38: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f4e40: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x69d8>
   f4e48: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f4e50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f4e58: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f4e60: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x69d8>
   f4e68: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f4e70: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   f4e78: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f4e80: 85 10 00 00 85 f2 ff ff      	call -0xd7b
   f4e88: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   f4e90: 7b 71 08 00 00 00 00 00      	stxdw [r1 + 0x8], r7
   f4e98: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
   f4ea0: 95 00 00 00 00 00 00 00      	exit
   f4ea8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f4eb0: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   f4eb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   f4ec0: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   f4ec8: 85 10 00 00 2e 1c 00 00      	call 0x1c2e
   f4ed0: 79 a7 a8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x158]
   f4ed8: 79 a6 a0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x160]
   f4ee0: 79 98 58 00 00 00 00 00      	ldxdw r8, [r9 + 0x58]
   f4ee8: 79 91 50 00 00 00 00 00      	ldxdw r1, [r9 + 0x50]
   f4ef0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f4ef8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4f00: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f4f08: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6a98>
   f4f10: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f4f18: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4f20: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f4f28: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6a98>
   f4f30: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f4f38: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f4f40: 85 10 00 00 6d f2 ff ff      	call -0xd93
   f4f48: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f4f50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f4f58: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f4f60: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x6af8>
   f4f68: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f4f70: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f4f78: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f4f80: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x6af8>
   f4f88: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f4f90: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   f4f98: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f4fa0: 85 10 00 00 61 f2 ff ff      	call -0xd9f
   f4fa8: 79 98 88 00 00 00 00 00      	ldxdw r8, [r9 + 0x88]
   f4fb0: 79 91 80 00 00 00 00 00      	ldxdw r1, [r9 + 0x80]
   f4fb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f4fc0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4fc8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f4fd0: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6b60>
   f4fd8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f4fe0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f4fe8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f4ff0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6b60>
   f4ff8: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f5000: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f5008: 85 10 00 00 54 f2 ff ff      	call -0xdac
   f5010: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f5018: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f5020: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f5028: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x6bc0>
   f5030: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f5038: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f5040: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f5048: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x6bc0>
   f5050: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f5058: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   f5060: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f5068: 85 10 00 00 48 f2 ff ff      	call -0xdb8
   f5070: 79 98 b8 00 00 00 00 00      	ldxdw r8, [r9 + 0xb8]
   f5078: 79 91 b0 00 00 00 00 00      	ldxdw r1, [r9 + 0xb0]
   f5080: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f5088: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f5090: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f5098: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6c28>
   f50a0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f50a8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f50b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f50b8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6c28>
   f50c0: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f50c8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f50d0: 85 10 00 00 3b f2 ff ff      	call -0xdc5
   f50d8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f50e0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f50e8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f50f0: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x6c88>
   f50f8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f5100: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f5108: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f5110: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x6c88>
   f5118: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f5120: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   f5128: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f5130: 85 10 00 00 2f f2 ff ff      	call -0xdd1
   f5138: 79 98 e8 00 00 00 00 00      	ldxdw r8, [r9 + 0xe8]
   f5140: 79 91 e0 00 00 00 00 00      	ldxdw r1, [r9 + 0xe0]
   f5148: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f5150: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f5158: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f5160: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6cf0>
   f5168: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f5170: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f5178: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f5180: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6cf0>
   f5188: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f5190: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f5198: 85 10 00 00 22 f2 ff ff      	call -0xdde
   f51a0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f51a8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f51b0: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f51b8: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x6d50>
   f51c0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f51c8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f51d0: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f51d8: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x6d50>
   f51e0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f51e8: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   f51f0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f51f8: 85 10 00 00 16 f2 ff ff      	call -0xdea
   f5200: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   f5208: 85 10 00 00 97 fd ff ff      	call -0x269
   f5210: 79 98 28 00 00 00 00 00      	ldxdw r8, [r9 + 0x28]
   f5218: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
   f5220: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f5228: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f5230: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f5238: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x6dc8>
   f5240: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   f5248: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f5250: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f5258: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x6dc8>
   f5260: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   f5268: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   f5270: 85 10 00 00 07 f2 ff ff      	call -0xdf9
   f5278: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   f5280: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f5288: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   f5290: 55 01 7e ff 00 00 00 00      	jne r1, 0x0, -0x82 <custom_panic+0x69d8>
   f5298: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   f52a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   f52a8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   f52b0: 55 01 7a ff 00 00 00 00      	jne r1, 0x0, -0x86 <custom_panic+0x69d8>
   f52b8: 05 00 75 ff 00 00 00 00      	ja -0x8b <custom_panic+0x69b8>
