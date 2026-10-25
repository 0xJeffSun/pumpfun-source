
work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000dcdf8 <_ZN147_$LT$pump_amm_recovered..CloseUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..CloseUserVolumeAccumulatorBumps$GT$$GT$12try_accounts17ha690036f15aeb6f0E>:
   dcdf8: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   dce00: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   dce08: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   dce10: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   dce18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dce20: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dce28: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dce30: 85 10 00 00 ab 61 fe ff      	call -0x19e55
   dce38: 79 a7 f0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x110]
   dce40: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   dce48: 55 02 15 00 02 00 00 00      	jne r2, 0x2, +0x15 <LBB502_3>
   dce50: 79 81 08 f0 00 00 00 00      	ldxdw r1, [r8 - 0xff8]
   dce58: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   dce60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dce68: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dce70: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dce78: 85 10 00 00 79 62 fe ff      	call -0x19d87
   dce80: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   dce88: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   dce90: 71 a1 41 ff 00 00 00 00      	ldxb r1, [r10 - 0xbf]
   dce98: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB502_2>
   dcea0: 05 00 17 00 00 00 00 00      	ja +0x17 <LBB502_6>

00000000000dcea8 <LBB502_2>:
   dcea8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dceb0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   dceb8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   dcec0: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dced0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dced8: 85 10 00 00 7c 49 fe ff      	call -0x1b684
   dcee0: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   dcee8: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   dcef0: 05 00 09 00 00 00 00 00      	ja +0x9 <LBB502_4>

00000000000dcef8 <LBB502_3>:
   dcef8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf00: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   dcf08: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dcf10: 18 04 00 00 c4 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcc4
   dcf20: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dcf28: 85 10 00 00 72 49 fe ff      	call -0x1b68e
   dcf30: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   dcf38: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]

00000000000dcf40 <LBB502_4>:
   dcf40: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dcf48: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dcf50: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2

00000000000dcf58 <LBB502_5>:
   dcf58: 95 00 00 00 00 00 00 00      	exit

00000000000dcf60 <LBB502_6>:
   dcf60: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   dcf68: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   dcf70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf78: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   dcf80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcf88: 07 02 00 00 f8 fe ff ff      	add64 r2, -0x108
   dcf90: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   dcf98: 85 10 00 00 01 5c 00 00      	call 0x5c01
   dcfa0: 61 a1 42 ff 00 00 00 00      	ldxw r1, [r10 - 0xbe]
   dcfa8: 63 1a 48 ff 00 00 00 00      	stxw [r10 - 0xb8], r1
   dcfb0: 69 a1 46 ff 00 00 00 00      	ldxh r1, [r10 - 0xba]
   dcfb8: 6b 1a 4c ff 00 00 00 00      	stxh [r10 - 0xb4], r1
   dcfc0: 79 92 08 00 00 00 00 00      	ldxdw r2, [r9 + 0x8]
   dcfc8: 15 02 b1 00 00 00 00 00      	jeq r2, 0x0, +0xb1 <LBB502_28>
   dcfd0: 7b 8a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r8
   dcfd8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dcfe0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   dcfe8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   dcff0: 7b 39 00 00 00 00 00 00      	stxdw [r9 + 0x0], r3
   dcff8: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   dd000: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dd008: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   dd010: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   dd018: 79 84 00 00 00 00 00 00      	ldxdw r4, [r8 + 0x0]
   dd020: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   dd028: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dd030: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB502_9>
   dd038: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dd040 <LBB502_9>:
   dd040: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   dd048: 7b 0a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r0
   dd050: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   dd058: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB502_11>

00000000000dd060 <LBB502_10>:
   dd060: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000dd068 <LBB502_11>:
   dd068: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   dd070: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   dd078: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   dd080: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dd088: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB502_13>
   dd090: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dd098 <LBB502_13>:
   dd098: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   dd0a0: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB502_15>
   dd0a8: 05 00 f6 ff 00 00 00 00      	ja -0xa <LBB502_10>

00000000000dd0b0 <LBB502_15>:
   dd0b0: 15 03 a3 00 00 00 00 00      	jeq r3, 0x0, +0xa3 <LBB502_29>
   dd0b8: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   dd0c0: 7b 3a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r3
   dd0c8: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   dd0d0: 7b 3a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r3
   dd0d8: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   dd0e0: 7b 3a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r3
   dd0e8: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   dd0f0: 7b 3a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r3
   dd0f8: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   dd100: 7b 3a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r3
   dd108: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   dd110: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   dd118: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   dd120: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   dd128: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dd130: 79 19 38 00 00 00 00 00      	ldxdw r9, [r1 + 0x38]
   dd138: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   dd140: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dd148: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd150: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB502_18>
   dd158: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dd160 <LBB502_18>:
   dd160: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   dd168: 7b 4a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r4
   dd170: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dd178: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   dd180: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB502_20>
   dd188: 05 00 da ff 00 00 00 00      	ja -0x26 <LBB502_10>

00000000000dd190 <LBB502_20>:
   dd190: 79 15 40 00 00 00 00 00      	ldxdw r5, [r1 + 0x40]
   dd198: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   dd1a0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dd1a8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd1b0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB502_22>
   dd1b8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dd1c0 <LBB502_22>:
   dd1c0: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   dd1c8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB502_24>
   dd1d0: 05 00 d1 ff 00 00 00 00      	ja -0x2f <LBB502_10>

00000000000dd1d8 <LBB502_24>:
   dd1d8: 7b 5a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r5
   dd1e0: 7b 0a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r0
   dd1e8: 71 72 29 00 00 00 00 00      	ldxb r2, [r7 + 0x29]
   dd1f0: 15 02 8f 00 00 00 00 00      	jeq r2, 0x0, +0x8f <LBB502_30>
   dd1f8: 7b 9a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r9
   dd200: 7b 8a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r8
   dd208: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   dd210: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   dd218: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   dd220: 7b 2a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r2
   dd228: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   dd230: 7b 2a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r2
   dd238: 79 12 50 00 00 00 00 00      	ldxdw r2, [r1 + 0x50]
   dd240: 7b 2a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r2
   dd248: 79 11 48 00 00 00 00 00      	ldxdw r1, [r1 + 0x48]
   dd250: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   dd258: 79 79 00 00 00 00 00 00      	ldxdw r9, [r7 + 0x0]
   dd260: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dd268: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   dd270: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dd278: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   dd280: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dd288: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dd290: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dd298: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   dd2a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd2a8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   dd2b0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   dd2b8: 18 01 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e27f
   dd2c8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   dd2d0: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dd2d8: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dd2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd2e8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd2f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd2f8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   dd300: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   dd308: 85 10 00 00 de 43 00 00      	call 0x43de
   dd310: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dd318: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   dd320: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   dd328: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   dd330: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   dd338: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   dd340: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   dd348: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   dd350: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   dd358: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   dd360: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   dd368: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   dd370: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   dd378: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   dd380: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd388: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   dd390: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd398: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd3a0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd3a8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd3b0: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd3c0: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd3c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd3d0: 07 02 00 00 a0 ff ff ff      	add64 r2, -0x60
   dd3d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dd3e0: 85 10 00 00 81 5b 00 00      	call 0x5b81
   dd3e8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dd3f0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dd3f8: 15 00 7e 00 00 00 00 00      	jeq r0, 0x0, +0x7e <LBB502_40>
   dd400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd408: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   dd410: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dd418: 85 10 00 00 4c 34 00 00      	call 0x344c
   dd420: 79 a3 d0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x130]
   dd428: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   dd430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd438: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   dd440: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dd450: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dd458: 85 10 00 00 cc 48 fe ff      	call -0x1b734
   dd460: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   dd468: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   dd470: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   dd478: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd480: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   dd488: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd490: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd498: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd4a0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd4a8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd4b0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dd4b8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   dd4c0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dd4c8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dd4d0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   dd4d8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   dd4e0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   dd4e8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dd4f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd4f8: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   dd500: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dd508: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   dd510: 85 10 00 00 a0 2e 00 00      	call 0x2ea0
   dd518: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   dd520: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]

00000000000dd528 <LBB502_27>:
   dd528: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd530: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd538: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   dd540: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   dd548: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   dd550: 05 00 34 00 00 00 00 00      	ja +0x34 <LBB502_32>

00000000000dd558 <LBB502_28>:
   dd558: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd560: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   dd568: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   dd570: 85 10 00 00 21 34 00 00      	call 0x3421
   dd578: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   dd580: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   dd588: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd590: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   dd598: 18 04 00 00 ec e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6ec
   dd5a8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dd5b0: 85 10 00 00 a1 48 fe ff      	call -0x1b75f
   dd5b8: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   dd5c0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   dd5c8: 05 00 2e ff 00 00 00 00      	ja -0xd2 <LBB502_4>

00000000000dd5d0 <LBB502_29>:
   dd5d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd5d8: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   dd5e0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   dd5e8: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   dd5f0: 85 10 00 00 11 34 00 00      	call 0x3411
   dd5f8: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   dd600: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   dd608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd610: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   dd618: 18 04 00 00 fb e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6fb
   dd628: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   dd630: 85 10 00 00 91 48 fe ff      	call -0x1b76f
   dd638: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dd640: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   dd648: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   dd650: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd658: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd660: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   dd668: 05 00 21 00 00 00 00 00      	ja +0x21 <LBB502_36>

00000000000dd670 <LBB502_30>:
   dd670: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd678: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   dd680: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dd688: 85 10 00 00 fe 33 00 00      	call 0x33fe
   dd690: 79 a3 30 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d0]
   dd698: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   dd6a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd6a8: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   dd6b0: 18 04 00 00 c4 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcc4
   dd6c0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dd6c8: 85 10 00 00 7e 48 fe ff      	call -0x1b782
   dd6d0: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   dd6d8: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]

00000000000dd6e0 <LBB502_31>:
   dd6e0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd6e8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd6f0: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2

00000000000dd6f8 <LBB502_32>:
   dd6f8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dd700: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd708: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dd710: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   dd718: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   dd720: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_34>
   dd728: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dd730: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd738: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000dd740 <LBB502_34>:
   dd740: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dd748: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd750: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dd758: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_36>
   dd760: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dd768: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd770: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000dd778 <LBB502_36>:
   dd778: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd780: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd788: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   dd790: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_38>
   dd798: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd7a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd7a8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000dd7b0 <LBB502_38>:
   dd7b0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dd7b8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd7c0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dd7c8: 55 01 f1 fe 00 00 00 00      	jne r1, 0x0, -0x10f <LBB502_5>
   dd7d0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   dd7d8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd7e0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   dd7e8: 05 00 ed fe 00 00 00 00      	ja -0x113 <LBB502_5>

00000000000dd7f0 <LBB502_40>:
   dd7f0: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   dd7f8: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   dd800: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   dd808: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   dd810: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   dd818: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   dd820: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dd828: 15 01 66 00 00 00 00 00      	jeq r1, 0x0, +0x66 <LBB502_44>
   dd830: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   dd838: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   dd840: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   dd848: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   dd850: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd858: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dd860: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd868: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   dd870: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dd878: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd880: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dd888: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd890: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dd898: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd8a0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dd8a8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd8b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd8b8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   dd8c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd8c8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   dd8d0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dd8d8: 85 10 00 00 e2 5a 00 00      	call 0x5ae2
   dd8e0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dd8e8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dd8f0: 15 00 5c 00 00 00 00 00      	jeq r0, 0x0, +0x5c <LBB502_45>
   dd8f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd900: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd908: 18 02 00 00 28 3d 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x113d28
   dd918: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd920: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   dd928: 85 10 00 00 1a 43 00 00      	call 0x431a
   dd930: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dd938: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   dd940: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   dd948: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   dd950: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   dd958: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dd960: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   dd968: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   dd970: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   dd978: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   dd980: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   dd988: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   dd990: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   dd998: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd9a0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   dd9a8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd9b0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dd9b8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd9c0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dd9c8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd9d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd9d8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd9e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd9e8: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   dd9f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dd9f8: 85 10 00 00 be 5a 00 00      	call 0x5abe
   dda00: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dda08: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dda10: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   dda18: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   dda20: 15 00 45 00 00 00 00 00      	jeq r0, 0x0, +0x45 <LBB502_46>
   dda28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dda30: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   dda38: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dda40: 85 10 00 00 87 33 00 00      	call 0x3387
   dda48: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   dda50: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   dda58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dda60: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   dda68: 18 04 00 00 ec e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6ec
   dda78: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dda80: 85 10 00 00 07 48 fe ff      	call -0x1b7f9
   dda88: 79 a3 90 fe 00 00 00 00      	ldxdw r3, [r10 - 0x170]
   dda90: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   dda98: 79 a4 90 fd 00 00 00 00      	ldxdw r4, [r10 - 0x270]
   ddaa0: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   ddaa8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   ddab0: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   ddab8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   ddac0: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   ddac8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ddad0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   ddad8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   ddae0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   ddae8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   ddaf0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   ddaf8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   ddb00: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   ddb08: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   ddb10: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   ddb18: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   ddb20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddb28: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   ddb30: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ddb38: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   ddb40: 85 10 00 00 da 2d 00 00      	call 0x2dda
   ddb48: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   ddb50: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   ddb58: 05 00 70 ff 00 00 00 00      	ja -0x90 <LBB502_31>

00000000000ddb60 <LBB502_44>:
   ddb60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddb68: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   ddb70: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   ddb78: 85 10 00 00 60 33 00 00      	call 0x3360
   ddb80: 79 a3 50 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b0]
   ddb88: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   ddb90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddb98: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   ddba0: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   ddbb0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ddbb8: 85 10 00 00 e0 47 fe ff      	call -0x1b820
   ddbc0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   ddbc8: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   ddbd0: 05 00 2a ff 00 00 00 00      	ja -0xd6 <LBB502_27>

00000000000ddbd8 <LBB502_45>:
   ddbd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddbe0: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   ddbe8: b7 02 00 00 db 07 00 00      	mov64 r2, 0x7db
   ddbf0: 85 10 00 00 51 33 00 00      	call 0x3351
   ddbf8: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   ddc00: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   ddc08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddc10: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   ddc18: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   ddc28: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ddc30: 85 10 00 00 d1 47 fe ff      	call -0x1b82f
   ddc38: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   ddc40: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   ddc48: 05 00 1b ff 00 00 00 00      	ja -0xe5 <LBB502_27>

00000000000ddc50 <LBB502_46>:
   ddc50: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   ddc58: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   ddc60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddc68: 07 02 00 00 50 ff ff ff      	add64 r2, -0xb0
   ddc70: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   ddc78: 85 10 00 00 65 5a 00 00      	call 0x5a65
   ddc80: 69 a1 4c ff 00 00 00 00      	ldxh r1, [r10 - 0xb4]
   ddc88: 61 a2 48 ff 00 00 00 00      	ldxw r2, [r10 - 0xb8]
   ddc90: 79 a3 a8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x258]
   ddc98: 73 36 61 00 00 00 00 00      	stxb [r6 + 0x61], r3
   ddca0: 79 a3 50 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b0]
   ddca8: 73 36 90 00 00 00 00 00      	stxb [r6 + 0x90], r3
   ddcb0: 79 a3 58 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a8]
   ddcb8: 73 36 91 00 00 00 00 00      	stxb [r6 + 0x91], r3
   ddcc0: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   ddcc8: 73 36 92 00 00 00 00 00      	stxb [r6 + 0x92], r3
   ddcd0: 79 a3 20 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2e0]
   ddcd8: 73 36 c0 00 00 00 00 00      	stxb [r6 + 0xc0], r3
   ddce0: 79 a3 28 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d8]
   ddce8: 73 36 c1 00 00 00 00 00      	stxb [r6 + 0xc1], r3
   ddcf0: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   ddcf8: 73 36 c2 00 00 00 00 00      	stxb [r6 + 0xc2], r3
   ddd00: 79 a3 30 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d0]
   ddd08: 7b 36 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r3
   ddd10: 79 a3 38 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c8]
   ddd18: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   ddd20: 79 a3 98 fd 00 00 00 00      	ldxdw r3, [r10 - 0x268]
   ddd28: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   ddd30: 7b 96 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r9
   ddd38: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   ddd40: 7b 36 98 00 00 00 00 00      	stxdw [r6 + 0x98], r3
   ddd48: 79 a3 68 fd 00 00 00 00      	ldxdw r3, [r10 - 0x298]
   ddd50: 7b 36 88 00 00 00 00 00      	stxdw [r6 + 0x88], r3
   ddd58: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   ddd60: 7b 36 80 00 00 00 00 00      	stxdw [r6 + 0x80], r3
   ddd68: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   ddd70: 7b 36 78 00 00 00 00 00      	stxdw [r6 + 0x78], r3
   ddd78: 7b 86 70 00 00 00 00 00      	stxdw [r6 + 0x70], r8
   ddd80: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   ddd88: 7b 36 68 00 00 00 00 00      	stxdw [r6 + 0x68], r3
   ddd90: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   ddd98: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   ddda0: 79 a3 b0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x250]
   ddda8: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   dddb0: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   dddb8: 63 26 62 00 00 00 00 00      	stxw [r6 + 0x62], r2
   dddc0: 6b 16 66 00 00 00 00 00      	stxh [r6 + 0x66], r1
   dddc8: 05 00 31 fe 00 00 00 00      	ja -0x1cf <LBB502_5>
