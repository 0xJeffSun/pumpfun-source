
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000de0e0 <_ZN92_$LT$pump_amm_recovered..CloseUserVolumeAccumulator$u20$as$u20$anchor_lang..AccountsExit$GT$4exit17h6b0166a174c80ad6E>:
   de0e0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   de0e8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   de0f0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   de0f8: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   de100: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   de108: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   de110: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB505_2>
   de118: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

00000000000de120 <LBB505_2>:
   de120: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   de128: 7b 51 00 00 00 00 00 00      	stxdw [r1 + 0x0], r5
   de130: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB505_4>

00000000000de138 <LBB505_3>:
   de138: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000de140 <LBB505_4>:
   de140: 79 35 10 00 00 00 00 00      	ldxdw r5, [r3 + 0x10]
   de148: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   de150: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   de158: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   de160: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB505_6>
   de168: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0

00000000000de170 <LBB505_6>:
   de170: 7b 05 00 00 00 00 00 00      	stxdw [r5 + 0x0], r0
   de178: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <LBB505_8>
   de180: 05 00 f6 ff 00 00 00 00      	ja -0xa <LBB505_3>

00000000000de188 <LBB505_8>:
   de188: 79 30 18 00 00 00 00 00      	ldxdw r0, [r3 + 0x18]
   de190: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   de198: 71 38 28 00 00 00 00 00      	ldxb r8, [r3 + 0x28]
   de1a0: 71 39 29 00 00 00 00 00      	ldxb r9, [r3 + 0x29]
   de1a8: 71 33 2a 00 00 00 00 00      	ldxb r3, [r3 + 0x2a]
   de1b0: 73 3a ca ff 00 00 00 00      	stxb [r10 - 0x36], r3
   de1b8: 73 9a c9 ff 00 00 00 00      	stxb [r10 - 0x37], r9
   de1c0: 73 8a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r8
   de1c8: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   de1d0: 7b 0a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r0
   de1d8: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   de1e0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   de1e8: 7b 4a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r4
   de1f0: 79 22 08 00 00 00 00 00      	ldxdw r2, [r2 + 0x8]
   de1f8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   de200: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   de208: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   de210: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   de218: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB505_10>
   de220: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000de228 <LBB505_10>:
   de228: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   de230: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   de238: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB505_12>
   de240: 05 00 de ff 00 00 00 00      	ja -0x22 <LBB505_3>

00000000000de248 <LBB505_12>:
   de248: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   de250: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   de258: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   de260: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   de268: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB505_14>
   de270: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

00000000000de278 <LBB505_14>:
   de278: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   de280: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB505_16>
   de288: 05 00 d5 ff 00 00 00 00      	ja -0x2b <LBB505_3>

00000000000de290 <LBB505_16>:
   de290: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   de298: 79 20 20 00 00 00 00 00      	ldxdw r0, [r2 + 0x20]
   de2a0: 71 27 28 00 00 00 00 00      	ldxb r7, [r2 + 0x28]
   de2a8: 71 28 29 00 00 00 00 00      	ldxb r8, [r2 + 0x29]
   de2b0: 71 22 2a 00 00 00 00 00      	ldxb r2, [r2 + 0x2a]
   de2b8: 73 2a fa ff 00 00 00 00      	stxb [r10 - 0x6], r2
   de2c0: 73 8a f9 ff 00 00 00 00      	stxb [r10 - 0x7], r8
   de2c8: 73 7a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r7
   de2d0: 7b 0a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r0
   de2d8: 7b 5a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r5
   de2e0: 7b 4a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r4
   de2e8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   de2f0: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   de2f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de300: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   de308: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   de310: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   de318: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   de320: 07 03 00 00 a0 ff ff ff      	add64 r3, -0x60
   de328: 85 10 00 00 63 2c 00 00      	call 0x2c63
   de330: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   de338: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   de340: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <LBB505_18>
   de348: 79 a3 98 ff 00 00 00 00      	ldxdw r3, [r10 - 0x68]
   de350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de358: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   de360: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   de370: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   de378: 85 10 00 00 e8 46 fe ff      	call -0x1b918
   de380: 79 a3 88 ff 00 00 00 00      	ldxdw r3, [r10 - 0x78]
   de388: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]

00000000000de390 <LBB505_18>:
   de390: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   de398: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   de3a0: 95 00 00 00 00 00 00 00      	exit
