
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/claim-self-transfer-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000004d58 <_ZN11anchor_lang8accounts7account16Account$LT$T$GT$24exit_with_expected_owner17hbc0bd88705590240E>:
    4d58: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    4d60: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    4d68: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    4d70: bf 42 00 00 00 00 00 00      	mov64 r2, r4
    4d78: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    4d80: 85 10 00 00 e6 0b 02 00      	call 0x20be6
    4d88: b7 09 00 00 02 00 00 00      	mov64 r9, 0x2
    4d90: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    4d98: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    4da0: 55 00 94 00 00 00 00 00      	jne r0, 0x0, +0x94 <LBB23_23>
    4da8: 79 78 00 00 00 00 00 00      	ldxdw r8, [r7 + 0x0]
    4db0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    4db8: 85 10 00 00 d3 de 01 00      	call 0x1ded3
    4dc0: 55 00 90 00 00 00 00 00      	jne r0, 0x0, +0x90 <LBB23_23>
    4dc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4dd0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4dd8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
    4de0: 85 10 00 00 50 ea 01 00      	call 0x1ea50
    4de8: 79 a8 f0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x10]
    4df0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
    4df8: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
    4e00: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
    4e10: 5d 32 13 00 00 00 00 00      	jne r2, r3, +0x13 <LBB23_21>
    4e18: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    4e20: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
    4e28: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    4e30: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    4e38: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
    4e40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4e48: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4e50: 18 02 00 00 7d de 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10de7d
    4e60: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4e68: 85 10 00 00 0e de 01 00      	call 0x1de0e
    4e70: 15 00 12 00 00 00 00 00      	jeq r0, 0x0, +0x12 <LBB23_7>
    4e78: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    4e80: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
    4e88: bf 12 00 00 00 00 00 00      	mov64 r2, r1
    4e90: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
    4e98: a5 02 6a 00 02 00 00 00      	jlt r2, 0x2, +0x6a <LBB23_20>
    4ea0: 15 01 69 00 00 00 00 00      	jeq r1, 0x0, +0x69 <LBB23_20>
    4ea8: 05 00 64 00 00 00 00 00      	ja +0x64 <LBB23_19>

0000000000004eb0 <LBB23_21>:
    4eb0: 7b 8a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r8
    4eb8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    4ec0: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    4ec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4ed0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
    4ed8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4ee0: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
    4ee8: 85 10 00 00 cc de 01 00      	call 0x1decc
    4ef0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    4ef8: 79 a9 d0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x30]
    4f00: 05 00 68 00 00 00 00 00      	ja +0x68 <LBB23_23>

0000000000004f08 <LBB23_7>:
    4f08: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    4f10: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
    4f18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4f20: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4f28: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    4f30: 85 10 00 00 f5 dd 01 00      	call 0x1ddf5
    4f38: 55 00 4c 00 00 00 00 00      	jne r0, 0x0, +0x4c <LBB23_17>
    4f40: 71 71 58 00 00 00 00 00      	ldxb r1, [r7 + 0x58]
    4f48: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    4f50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4f58: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4f60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4f68: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4f70: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    4f78: 85 10 00 00 ec dd 01 00      	call 0x1ddec
    4f80: 55 00 43 00 00 00 00 00      	jne r0, 0x0, +0x43 <LBB23_17>
    4f88: 79 71 28 00 00 00 00 00      	ldxdw r1, [r7 + 0x28]
    4f90: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4f98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4fa0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4fa8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4fb0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4fb8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4fc0: 85 10 00 00 e3 dd 01 00      	call 0x1dde3
    4fc8: 55 00 3a 00 00 00 00 00      	jne r0, 0x0, +0x3a <LBB23_17>
    4fd0: 79 71 30 00 00 00 00 00      	ldxdw r1, [r7 + 0x30]
    4fd8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4fe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4fe8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4ff0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4ff8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5000: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5008: 85 10 00 00 da dd 01 00      	call 0x1ddda
    5010: 55 00 31 00 00 00 00 00      	jne r0, 0x0, +0x31 <LBB23_17>
    5018: 79 71 38 00 00 00 00 00      	ldxdw r1, [r7 + 0x38]
    5020: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5028: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5030: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5038: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5040: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5048: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5050: 85 10 00 00 d1 dd 01 00      	call 0x1ddd1
    5058: 55 00 28 00 00 00 00 00      	jne r0, 0x0, +0x28 <LBB23_17>
    5060: 79 71 40 00 00 00 00 00      	ldxdw r1, [r7 + 0x40]
    5068: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5078: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5080: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5088: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5090: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5098: 85 10 00 00 c8 dd 01 00      	call 0x1ddc8
    50a0: 55 00 1f 00 00 00 00 00      	jne r0, 0x0, +0x1f <LBB23_17>
    50a8: 71 71 59 00 00 00 00 00      	ldxb r1, [r7 + 0x59]
    50b0: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    50b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    50c0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    50c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    50d0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    50d8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    50e0: 85 10 00 00 bf dd 01 00      	call 0x1ddbf
    50e8: 55 00 16 00 00 00 00 00      	jne r0, 0x0, +0x16 <LBB23_17>
    50f0: 79 71 48 00 00 00 00 00      	ldxdw r1, [r7 + 0x48]
    50f8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5100: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5108: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5110: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5118: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5120: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5128: 85 10 00 00 b6 dd 01 00      	call 0x1ddb6
    5130: 55 00 0d 00 00 00 00 00      	jne r0, 0x0, +0xd <LBB23_17>
    5138: 79 71 50 00 00 00 00 00      	ldxdw r1, [r7 + 0x50]
    5140: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5148: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5150: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5158: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5160: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5168: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5170: 85 10 00 00 ad dd 01 00      	call 0x1ddad
    5178: 55 00 04 00 00 00 00 00      	jne r0, 0x0, +0x4 <LBB23_17>
    5180: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    5188: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    5190: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
    5198: 05 00 15 00 00 00 00 00      	ja +0x15 <LBB23_23>

00000000000051a0 <LBB23_17>:
    51a0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    51a8: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
    51b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
    51b8: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
    51c0: a5 02 05 00 02 00 00 00      	jlt r2, 0x2, +0x5 <LBB23_20>
    51c8: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <LBB23_20>

00000000000051d0 <LBB23_19>:
    51d0: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
    51d8: 79 02 07 00 00 00 00 00      	ldxdw r2, [r0 + 0x7]
    51e0: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
    51e8: 8d 00 00 00 02 00 00 00      	callx r2

00000000000051f0 <LBB23_20>:
    51f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    51f8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
    5200: b7 02 00 00 bc 0b 00 00      	mov64 r2, 0xbbc
    5208: 85 10 00 00 27 e4 01 00      	call 0x1e427
    5210: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
    5218: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
    5220: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
    5228: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
    5230: 7b 38 00 00 00 00 00 00      	stxdw [r8 + 0x0], r3
    5238: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB23_23>
    5240: bf 29 00 00 00 00 00 00      	mov64 r9, r2

0000000000005248 <LBB23_23>:
    5248: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    5250: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
    5258: 95 00 00 00 00 00 00 00      	exit
