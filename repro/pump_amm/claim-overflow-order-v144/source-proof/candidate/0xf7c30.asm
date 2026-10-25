
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f7c30 <_ZN14solana_program7program13invoke_signed17h7c1671c4055efadbE>:
   f7c30: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   f7c38: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   f7c40: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   f7c48: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   f7c50: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   f7c58: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
   f7c60: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
   f7c68: 79 52 00 f0 00 00 00 00      	ldxdw r2, [r5 - 0x1000]
   f7c70: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   f7c78: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <LBB33_4>
   f7c80: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   f7c88: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
   f7c90: 27 01 00 00 22 00 00 00      	mul64 r1, 0x22
   f7c98: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   f7ca0: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   f7ca8: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
   f7cb0: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   f7cb8: 27 01 00 00 30 00 00 00      	mul64 r1, 0x30
   f7cc0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   f7cc8: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   f7cd0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   f7cd8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   f7ce0: 05 00 05 00 00 00 00 00      	ja +0x5 <LBB33_2>

00000000000f7ce8 <LBB33_6>:
   f7ce8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   f7cf0: 0f 23 00 00 00 00 00 00      	add64 r3, r2
   f7cf8: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3

00000000000f7d00 <LBB33_7>:
   f7d00: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   f7d08: 1d 16 41 00 00 00 00 00      	jeq r6, r1, +0x41 <LBB33_4>

00000000000f7d10 <LBB33_2>:
   f7d10: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   f7d18: 07 06 00 00 22 00 00 00      	add64 r6, 0x22
   f7d20: 79 a9 e0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x20]
   f7d28: 79 a7 d8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x28]

00000000000f7d30 <LBB33_3>:
   f7d30: 15 09 f9 ff 00 00 00 00      	jeq r9, 0x0, -0x7 <LBB33_7>
   f7d38: 79 72 30 00 00 00 00 00      	ldxdw r2, [r7 + 0x30]
   f7d40: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f7d48: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   f7d50: 85 10 00 00 79 25 00 00      	call 0x2579
   f7d58: 07 09 00 00 d0 ff ff ff      	add64 r9, -0x30
   f7d60: 07 07 00 00 30 00 00 00      	add64 r7, 0x30
   f7d68: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   f7d70: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   f7d78: 55 00 f6 ff 00 00 00 00      	jne r0, 0x0, -0xa <LBB33_3>
   f7d80: 71 81 21 00 00 00 00 00      	ldxb r1, [r8 + 0x21]
   f7d88: 55 01 1b 00 00 00 00 00      	jne r1, 0x0, +0x1b <LBB33_11>
   f7d90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f7d98: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f7da0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f7da8: 85 10 00 00 b1 03 00 00      	call 0x3b1
   f7db0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f7db8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f7dc0: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
   f7dd0: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <LBB33_12>
   f7dd8: 05 00 32 00 00 00 00 00      	ja +0x32 <LBB33_15>

00000000000f7de0 <LBB33_12>:
   f7de0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f7de8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f7df0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f7df8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f7e00: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f7e08: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f7e10: 85 10 00 00 c5 03 00 00      	call 0x3c5
   f7e18: b7 02 00 00 ff ff ff ff      	mov64 r2, -0x1
   f7e20: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f7e28: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   f7e30: 1d 83 d6 ff 00 00 00 00      	jeq r3, r8, -0x2a <LBB33_6>

00000000000f7e38 <LBB33_13>:
   f7e38: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   f7e40: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
   f7e48: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
   f7e50: 7b 24 08 00 00 00 00 00      	stxdw [r4 + 0x8], r2
   f7e58: 7b 34 00 00 00 00 00 00      	stxdw [r4 + 0x0], r3
   f7e60: 05 00 20 00 00 00 00 00      	ja +0x20 <LBB33_5>

00000000000f7e68 <LBB33_11>:
   f7e68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f7e70: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f7e78: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f7e80: 85 10 00 00 a8 03 00 00      	call 0x3a8
   f7e88: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f7e90: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f7e98: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
   f7ea8: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <LBB33_14>
   f7eb0: 05 00 17 00 00 00 00 00      	ja +0x17 <LBB33_15>

00000000000f7eb8 <LBB33_14>:
   f7eb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f7ec0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   f7ec8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f7ed0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f7ed8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f7ee0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f7ee8: 85 10 00 00 bc 03 00 00      	call 0x3bc
   f7ef0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   f7ef8: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f7f00: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   f7f08: 1d 83 bb ff 00 00 00 00      	jeq r3, r8, -0x45 <LBB33_6>
   f7f10: 05 00 e4 ff 00 00 00 00      	ja -0x1c <LBB33_13>

00000000000f7f18 <LBB33_4>:
   f7f18: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   f7f20: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   f7f28: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   f7f30: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   f7f38: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   f7f40: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   f7f48: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   f7f50: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
   f7f58: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
   f7f60: 85 10 00 00 8e 02 00 00      	call 0x28e

00000000000f7f68 <LBB33_5>:
   f7f68: 95 00 00 00 00 00 00 00      	exit

00000000000f7f70 <LBB33_15>:
   f7f70: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   f7f78: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
   f7f80: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
   f7f88: 7b 34 08 00 00 00 00 00      	stxdw [r4 + 0x8], r3
   f7f90: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   f7f98: 05 00 f9 ff 00 00 00 00      	ja -0x7 <LBB33_5>
