
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000009fc00 <_ZN18pump_amm_recovered9__private8__global29close_user_volume_accumulator17hbe3d60380608f4b1E>:
   9fc00: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   9fc08: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   9fc10: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   9fc18: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   9fc20: 18 01 00 00 ad f1 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10f1ad
   9fc30: b7 02 00 00 27 00 00 00      	mov64 r2, 0x27
   9fc38: 85 10 00 00 ff ff ff ff      	call -0x1
   9fc40: 6a 0a 5e fe ff ff 00 00      	sth [r10 - 0x1a2], 0xffff
   9fc48: 7b 8a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r8
   9fc50: 7b 9a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r9
   9fc58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fc60: 07 01 00 00 5e fe ff ff      	add64 r1, -0x1a2
   9fc68: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   9fc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fc78: 07 01 00 00 38 ff ff ff      	add64 r1, -0xc8
   9fc80: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   9fc88: 07 03 00 00 60 fe ff ff      	add64 r3, -0x1a0
   9fc90: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   9fc98: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9fca0: 85 10 00 00 8c 7a 00 00      	call 0x7a8c
   9fca8: 79 a9 40 ff 00 00 00 00      	ldxdw r9, [r10 - 0xc0]
   9fcb0: 79 a8 38 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc8]
   9fcb8: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   9fcc0: 15 06 67 00 02 00 00 00      	jeq r6, 0x2, +0x67 <LBB402_18>
   9fcc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fcd0: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   9fcd8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9fce0: 07 02 00 00 48 ff ff ff      	add64 r2, -0xb8
   9fce8: b7 03 00 00 b2 00 00 00      	mov64 r3, 0xb2
   9fcf0: 85 10 00 00 b8 d6 00 00      	call 0xd6b8
   9fcf8: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   9fd00: 63 1a 33 ff 00 00 00 00      	stxw [r10 - 0xcd], r1
   9fd08: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   9fd10: 73 1a 37 ff 00 00 00 00      	stxb [r10 - 0xc9], r1
   9fd18: 73 6a 32 ff 00 00 00 00      	stxb [r10 - 0xce], r6
   9fd20: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   9fd28: 7b 8a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r8
   9fd30: 71 a1 5f fe 00 00 00 00      	ldxb r1, [r10 - 0x1a1]
   9fd38: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   9fd40: 71 a1 5e fe 00 00 00 00      	ldxb r1, [r10 - 0x1a2]
   9fd48: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   9fd50: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   9fd58: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   9fd60: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   9fd68: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   9fd70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fd78: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   9fd80: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   9fd88: 7b 7a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r7
   9fd90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fd98: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   9fda0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9fda8: 07 02 00 00 38 ff ff ff      	add64 r2, -0xc8
   9fdb0: 85 10 00 00 45 4f 00 00      	call 0x4f45
   9fdb8: 79 a8 48 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1b8]
   9fdc0: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <LBB402_2>
   9fdc8: 05 00 25 00 00 00 00 00      	ja +0x25 <LBB402_10>

000000000009fdd0 <LBB402_2>:
   9fdd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fdd8: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   9fde0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9fde8: 07 02 00 00 70 fe ff ff      	add64 r2, -0x190
   9fdf0: 85 10 00 00 5d 7c 00 00      	call 0x7c5d
   9fdf8: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   9fe00: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   9fe08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fe10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fe18: 79 a9 40 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1c0]
   9fe20: 79 a8 38 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1c8]
   9fe28: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fe30: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB402_4>
   9fe38: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fe40: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fe48: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009fe50 <LBB402_4>:
   9fe50: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fe58: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fe60: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fe68: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB402_6>
   9fe70: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9fe78: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fe80: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009fe88 <LBB402_6>:
   9fe88: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9fe90: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   9fe98: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fea0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fea8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9feb0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB402_8>
   9feb8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fec0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fec8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009fed0 <LBB402_8>:
   9fed0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fed8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fee0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fee8: 55 02 22 00 00 00 00 00      	jne r2, 0x0, +0x22 <LBB402_18>
   9fef0: 05 00 1e 00 00 00 00 00      	ja +0x1e <LBB402_17>

000000000009fef8 <LBB402_10>:
   9fef8: 79 a9 50 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1b0]
   9ff00: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   9ff08: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   9ff10: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9ff18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9ff20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9ff28: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB402_12>
   9ff30: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9ff38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9ff40: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009ff48 <LBB402_12>:
   9ff48: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9ff50: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9ff58: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9ff60: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB402_14>
   9ff68: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9ff70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9ff78: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009ff80 <LBB402_14>:
   9ff80: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9ff88: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   9ff90: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9ff98: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9ffa0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9ffa8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB402_16>
   9ffb0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9ffb8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9ffc0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009ffc8 <LBB402_16>:
   9ffc8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9ffd0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9ffd8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9ffe0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB402_18>

000000000009ffe8 <LBB402_17>:
   9ffe8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9fff0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fff8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000a0000 <LBB402_18>:
   a0000: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   a0008: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   a0010: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   a0018: 95 00 00 00 00 00 00 00      	exit
