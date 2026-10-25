
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f8300 <_ZN14solana_program7program13invoke_signed17h7c1671c4055efadbE>:
   f8300: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   f8308: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   f8310: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   f8318: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   f8320: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   f8328: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
   f8330: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
   f8338: 79 52 00 f0 00 00 00 00      	ldxdw r2, [r5 - 0x1000]
   f8340: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   f8348: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <LBB33_4>
   f8350: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   f8358: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
   f8360: 27 01 00 00 22 00 00 00      	mul64 r1, 0x22
   f8368: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   f8370: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   f8378: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
   f8380: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   f8388: 27 01 00 00 30 00 00 00      	mul64 r1, 0x30
   f8390: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   f8398: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   f83a0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   f83a8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   f83b0: 05 00 05 00 00 00 00 00      	ja +0x5 <LBB33_2>

00000000000f83b8 <LBB33_6>:
   f83b8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   f83c0: 0f 23 00 00 00 00 00 00      	add64 r3, r2
   f83c8: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3

00000000000f83d0 <LBB33_7>:
   f83d0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   f83d8: 1d 16 41 00 00 00 00 00      	jeq r6, r1, +0x41 <LBB33_4>

00000000000f83e0 <LBB33_2>:
   f83e0: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   f83e8: 07 06 00 00 22 00 00 00      	add64 r6, 0x22
   f83f0: 79 a9 e0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x20]
   f83f8: 79 a7 d8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x28]

00000000000f8400 <LBB33_3>:
   f8400: 15 09 f9 ff 00 00 00 00      	jeq r9, 0x0, -0x7 <LBB33_7>
   f8408: 79 72 30 00 00 00 00 00      	ldxdw r2, [r7 + 0x30]
   f8410: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   f8418: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   f8420: 85 10 00 00 79 25 00 00      	call 0x2579
   f8428: 07 09 00 00 d0 ff ff ff      	add64 r9, -0x30
   f8430: 07 07 00 00 30 00 00 00      	add64 r7, 0x30
   f8438: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   f8440: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   f8448: 55 00 f6 ff 00 00 00 00      	jne r0, 0x0, -0xa <LBB33_3>
   f8450: 71 81 21 00 00 00 00 00      	ldxb r1, [r8 + 0x21]
   f8458: 55 01 1b 00 00 00 00 00      	jne r1, 0x0, +0x1b <LBB33_11>
   f8460: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f8468: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f8470: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f8478: 85 10 00 00 b1 03 00 00      	call 0x3b1
   f8480: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f8488: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f8490: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
   f84a0: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <LBB33_12>
   f84a8: 05 00 32 00 00 00 00 00      	ja +0x32 <LBB33_15>

00000000000f84b0 <LBB33_12>:
   f84b0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f84b8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   f84c0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f84c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f84d0: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f84d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f84e0: 85 10 00 00 c5 03 00 00      	call 0x3c5
   f84e8: b7 02 00 00 ff ff ff ff      	mov64 r2, -0x1
   f84f0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f84f8: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   f8500: 1d 83 d6 ff 00 00 00 00      	jeq r3, r8, -0x2a <LBB33_6>

00000000000f8508 <LBB33_13>:
   f8508: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   f8510: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
   f8518: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
   f8520: 7b 24 08 00 00 00 00 00      	stxdw [r4 + 0x8], r2
   f8528: 7b 34 00 00 00 00 00 00      	stxdw [r4 + 0x0], r3
   f8530: 05 00 20 00 00 00 00 00      	ja +0x20 <LBB33_5>

00000000000f8538 <LBB33_11>:
   f8538: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f8540: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f8548: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f8550: 85 10 00 00 a8 03 00 00      	call 0x3a8
   f8558: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f8560: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f8568: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
   f8578: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <LBB33_14>
   f8580: 05 00 17 00 00 00 00 00      	ja +0x17 <LBB33_15>

00000000000f8588 <LBB33_14>:
   f8588: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   f8590: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   f8598: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f85a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f85a8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   f85b0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   f85b8: 85 10 00 00 bc 03 00 00      	call 0x3bc
   f85c0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   f85c8: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   f85d0: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   f85d8: 1d 83 bb ff 00 00 00 00      	jeq r3, r8, -0x45 <LBB33_6>
   f85e0: 05 00 e4 ff 00 00 00 00      	ja -0x1c <LBB33_13>

00000000000f85e8 <LBB33_4>:
   f85e8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   f85f0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   f85f8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   f8600: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   f8608: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   f8610: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   f8618: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   f8620: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
   f8628: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
   f8630: 85 10 00 00 8e 02 00 00      	call 0x28e

00000000000f8638 <LBB33_5>:
   f8638: 95 00 00 00 00 00 00 00      	exit

00000000000f8640 <LBB33_15>:
   f8640: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   f8648: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
   f8650: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
   f8658: 7b 34 08 00 00 00 00 00      	stxdw [r4 + 0x8], r3
   f8660: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   f8668: 05 00 f9 ff 00 00 00 00      	ja -0x7 <LBB33_5>
