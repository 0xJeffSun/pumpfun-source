
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000dd108 <_ZN147_$LT$pump_amm_recovered..CloseUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..CloseUserVolumeAccumulatorBumps$GT$$GT$12try_accounts17hb6b5178b7cd627ccE>:
   dd108: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   dd110: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   dd118: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   dd120: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   dd128: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd130: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd138: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dd140: 85 10 00 00 49 61 fe ff      	call -0x19eb7
   dd148: 79 a7 f0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x110]
   dd150: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   dd158: 55 02 15 00 02 00 00 00      	jne r2, 0x2, +0x15 <LBB502_3>
   dd160: 79 81 08 f0 00 00 00 00      	ldxdw r1, [r8 - 0xff8]
   dd168: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   dd170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd178: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd180: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dd188: 85 10 00 00 17 62 fe ff      	call -0x19de9
   dd190: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   dd198: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   dd1a0: 71 a1 41 ff 00 00 00 00      	ldxb r1, [r10 - 0xbf]
   dd1a8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB502_2>
   dd1b0: 05 00 17 00 00 00 00 00      	ja +0x17 <LBB502_6>

00000000000dd1b8 <LBB502_2>:
   dd1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd1c0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   dd1c8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   dd1d0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dd1e0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dd1e8: 85 10 00 00 1a 49 fe ff      	call -0x1b6e6
   dd1f0: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   dd1f8: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   dd200: 05 00 09 00 00 00 00 00      	ja +0x9 <LBB502_4>

00000000000dd208 <LBB502_3>:
   dd208: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd210: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   dd218: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dd220: 18 04 00 00 d4 df 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dfd4
   dd230: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dd238: 85 10 00 00 10 49 fe ff      	call -0x1b6f0
   dd240: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   dd248: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]

00000000000dd250 <LBB502_4>:
   dd250: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd258: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd260: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2

00000000000dd268 <LBB502_5>:
   dd268: 95 00 00 00 00 00 00 00      	exit

00000000000dd270 <LBB502_6>:
   dd270: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   dd278: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   dd280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd288: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   dd290: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd298: 07 02 00 00 f8 fe ff ff      	add64 r2, -0x108
   dd2a0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   dd2a8: 85 10 00 00 01 5c 00 00      	call 0x5c01
   dd2b0: 61 a1 42 ff 00 00 00 00      	ldxw r1, [r10 - 0xbe]
   dd2b8: 63 1a 48 ff 00 00 00 00      	stxw [r10 - 0xb8], r1
   dd2c0: 69 a1 46 ff 00 00 00 00      	ldxh r1, [r10 - 0xba]
   dd2c8: 6b 1a 4c ff 00 00 00 00      	stxh [r10 - 0xb4], r1
   dd2d0: 79 92 08 00 00 00 00 00      	ldxdw r2, [r9 + 0x8]
   dd2d8: 15 02 b1 00 00 00 00 00      	jeq r2, 0x0, +0xb1 <LBB502_28>
   dd2e0: 7b 8a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r8
   dd2e8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dd2f0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   dd2f8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   dd300: 7b 39 00 00 00 00 00 00      	stxdw [r9 + 0x0], r3
   dd308: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   dd310: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dd318: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   dd320: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   dd328: 79 84 00 00 00 00 00 00      	ldxdw r4, [r8 + 0x0]
   dd330: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   dd338: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dd340: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB502_9>
   dd348: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dd350 <LBB502_9>:
   dd350: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   dd358: 7b 0a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r0
   dd360: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   dd368: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB502_11>

00000000000dd370 <LBB502_10>:
   dd370: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000dd378 <LBB502_11>:
   dd378: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   dd380: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   dd388: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   dd390: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dd398: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB502_13>
   dd3a0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dd3a8 <LBB502_13>:
   dd3a8: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   dd3b0: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB502_15>
   dd3b8: 05 00 f6 ff 00 00 00 00      	ja -0xa <LBB502_10>

00000000000dd3c0 <LBB502_15>:
   dd3c0: 15 03 a3 00 00 00 00 00      	jeq r3, 0x0, +0xa3 <LBB502_29>
   dd3c8: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   dd3d0: 7b 3a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r3
   dd3d8: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   dd3e0: 7b 3a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r3
   dd3e8: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   dd3f0: 7b 3a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r3
   dd3f8: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   dd400: 7b 3a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r3
   dd408: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   dd410: 7b 3a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r3
   dd418: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   dd420: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   dd428: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   dd430: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   dd438: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dd440: 79 19 38 00 00 00 00 00      	ldxdw r9, [r1 + 0x38]
   dd448: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   dd450: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dd458: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd460: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB502_18>
   dd468: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dd470 <LBB502_18>:
   dd470: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   dd478: 7b 4a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r4
   dd480: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dd488: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   dd490: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB502_20>
   dd498: 05 00 da ff 00 00 00 00      	ja -0x26 <LBB502_10>

00000000000dd4a0 <LBB502_20>:
   dd4a0: 79 15 40 00 00 00 00 00      	ldxdw r5, [r1 + 0x40]
   dd4a8: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   dd4b0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dd4b8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd4c0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB502_22>
   dd4c8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dd4d0 <LBB502_22>:
   dd4d0: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   dd4d8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB502_24>
   dd4e0: 05 00 d1 ff 00 00 00 00      	ja -0x2f <LBB502_10>

00000000000dd4e8 <LBB502_24>:
   dd4e8: 7b 5a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r5
   dd4f0: 7b 0a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r0
   dd4f8: 71 72 29 00 00 00 00 00      	ldxb r2, [r7 + 0x29]
   dd500: 15 02 8f 00 00 00 00 00      	jeq r2, 0x0, +0x8f <LBB502_30>
   dd508: 7b 9a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r9
   dd510: 7b 8a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r8
   dd518: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   dd520: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   dd528: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   dd530: 7b 2a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r2
   dd538: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   dd540: 7b 2a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r2
   dd548: 79 12 50 00 00 00 00 00      	ldxdw r2, [r1 + 0x50]
   dd550: 7b 2a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r2
   dd558: 79 11 48 00 00 00 00 00      	ldxdw r1, [r1 + 0x48]
   dd560: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   dd568: 79 79 00 00 00 00 00 00      	ldxdw r9, [r7 + 0x0]
   dd570: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dd578: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   dd580: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dd588: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   dd590: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dd598: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dd5a0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dd5a8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   dd5b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd5b8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   dd5c0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   dd5c8: 18 01 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e58f
   dd5d8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   dd5e0: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dd5e8: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dd5f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd5f8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd600: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd608: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   dd610: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   dd618: 85 10 00 00 de 43 00 00      	call 0x43de
   dd620: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dd628: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   dd630: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   dd638: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   dd640: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   dd648: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   dd650: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   dd658: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   dd660: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   dd668: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   dd670: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   dd678: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   dd680: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   dd688: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   dd690: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd698: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   dd6a0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd6a8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd6b0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd6b8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd6c0: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd6c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd6d0: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dd6d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd6e0: 07 02 00 00 a0 ff ff ff      	add64 r2, -0x60
   dd6e8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dd6f0: 85 10 00 00 81 5b 00 00      	call 0x5b81
   dd6f8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dd700: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dd708: 15 00 7e 00 00 00 00 00      	jeq r0, 0x0, +0x7e <LBB502_40>
   dd710: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd718: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   dd720: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dd728: 85 10 00 00 4c 34 00 00      	call 0x344c
   dd730: 79 a3 d0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x130]
   dd738: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   dd740: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd748: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   dd750: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dd760: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dd768: 85 10 00 00 6a 48 fe ff      	call -0x1b796
   dd770: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   dd778: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   dd780: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   dd788: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dd790: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   dd798: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dd7a0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dd7a8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dd7b0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dd7b8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dd7c0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dd7c8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   dd7d0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dd7d8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dd7e0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   dd7e8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   dd7f0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   dd7f8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dd800: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd808: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   dd810: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dd818: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   dd820: 85 10 00 00 a0 2e 00 00      	call 0x2ea0
   dd828: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   dd830: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]

00000000000dd838 <LBB502_27>:
   dd838: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd840: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd848: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   dd850: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   dd858: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   dd860: 05 00 34 00 00 00 00 00      	ja +0x34 <LBB502_32>

00000000000dd868 <LBB502_28>:
   dd868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd870: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   dd878: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   dd880: 85 10 00 00 21 34 00 00      	call 0x3421
   dd888: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   dd890: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   dd898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd8a0: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   dd8a8: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   dd8b8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dd8c0: 85 10 00 00 3f 48 fe ff      	call -0x1b7c1
   dd8c8: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   dd8d0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   dd8d8: 05 00 2e ff 00 00 00 00      	ja -0xd2 <LBB502_4>

00000000000dd8e0 <LBB502_29>:
   dd8e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd8e8: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   dd8f0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   dd8f8: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   dd900: 85 10 00 00 11 34 00 00      	call 0x3411
   dd908: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   dd910: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   dd918: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd920: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   dd928: 18 04 00 00 0b ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea0b
   dd938: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   dd940: 85 10 00 00 2f 48 fe ff      	call -0x1b7d1
   dd948: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dd950: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   dd958: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   dd960: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd968: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dd970: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   dd978: 05 00 21 00 00 00 00 00      	ja +0x21 <LBB502_36>

00000000000dd980 <LBB502_30>:
   dd980: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd988: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   dd990: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dd998: 85 10 00 00 fe 33 00 00      	call 0x33fe
   dd9a0: 79 a3 30 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d0]
   dd9a8: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   dd9b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd9b8: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   dd9c0: 18 04 00 00 d4 df 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dfd4
   dd9d0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dd9d8: 85 10 00 00 1c 48 fe ff      	call -0x1b7e4
   dd9e0: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   dd9e8: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]

00000000000dd9f0 <LBB502_31>:
   dd9f0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dd9f8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dda00: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2

00000000000dda08 <LBB502_32>:
   dda08: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dda10: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dda18: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dda20: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   dda28: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   dda30: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_34>
   dda38: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dda40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dda48: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000dda50 <LBB502_34>:
   dda50: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dda58: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dda60: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dda68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_36>
   dda70: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dda78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dda80: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000dda88 <LBB502_36>:
   dda88: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dda90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dda98: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   ddaa0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB502_38>
   ddaa8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   ddab0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ddab8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000ddac0 <LBB502_38>:
   ddac0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   ddac8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ddad0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   ddad8: 55 01 f1 fe 00 00 00 00      	jne r1, 0x0, -0x10f <LBB502_5>
   ddae0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   ddae8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ddaf0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   ddaf8: 05 00 ed fe 00 00 00 00      	ja -0x113 <LBB502_5>

00000000000ddb00 <LBB502_40>:
   ddb00: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   ddb08: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   ddb10: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   ddb18: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   ddb20: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   ddb28: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   ddb30: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   ddb38: 15 01 66 00 00 00 00 00      	jeq r1, 0x0, +0x66 <LBB502_44>
   ddb40: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   ddb48: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   ddb50: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   ddb58: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   ddb60: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   ddb68: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   ddb70: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   ddb78: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   ddb80: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   ddb88: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   ddb90: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   ddb98: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   ddba0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   ddba8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ddbb0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ddbb8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   ddbc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddbc8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   ddbd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddbd8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   ddbe0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ddbe8: 85 10 00 00 e2 5a 00 00      	call 0x5ae2
   ddbf0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ddbf8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ddc00: 15 00 5c 00 00 00 00 00      	jeq r0, 0x0, +0x5c <LBB502_45>
   ddc08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddc10: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   ddc18: 18 02 00 00 80 40 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x114080
   ddc28: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ddc30: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   ddc38: 85 10 00 00 1a 43 00 00      	call 0x431a
   ddc40: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   ddc48: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   ddc50: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   ddc58: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   ddc60: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   ddc68: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   ddc70: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   ddc78: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   ddc80: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   ddc88: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   ddc90: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   ddc98: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   ddca0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   ddca8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   ddcb0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   ddcb8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   ddcc0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   ddcc8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ddcd0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   ddcd8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   ddce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddce8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   ddcf0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddcf8: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   ddd00: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ddd08: 85 10 00 00 be 5a 00 00      	call 0x5abe
   ddd10: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ddd18: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ddd20: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   ddd28: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   ddd30: 15 00 45 00 00 00 00 00      	jeq r0, 0x0, +0x45 <LBB502_46>
   ddd38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddd40: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   ddd48: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ddd50: 85 10 00 00 87 33 00 00      	call 0x3387
   ddd58: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   ddd60: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   ddd68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddd70: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   ddd78: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   ddd88: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   ddd90: 85 10 00 00 a5 47 fe ff      	call -0x1b85b
   ddd98: 79 a3 90 fe 00 00 00 00      	ldxdw r3, [r10 - 0x170]
   ddda0: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   ddda8: 79 a4 90 fd 00 00 00 00      	ldxdw r4, [r10 - 0x270]
   dddb0: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   dddb8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dddc0: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   dddc8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dddd0: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   dddd8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ddde0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   ddde8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   dddf0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   dddf8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   dde00: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   dde08: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dde10: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   dde18: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   dde20: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   dde28: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dde30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dde38: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   dde40: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dde48: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   dde50: 85 10 00 00 da 2d 00 00      	call 0x2dda
   dde58: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   dde60: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   dde68: 05 00 70 ff 00 00 00 00      	ja -0x90 <LBB502_31>

00000000000dde70 <LBB502_44>:
   dde70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dde78: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   dde80: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dde88: 85 10 00 00 60 33 00 00      	call 0x3360
   dde90: 79 a3 50 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b0]
   dde98: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   ddea0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddea8: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   ddeb0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   ddec0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ddec8: 85 10 00 00 7e 47 fe ff      	call -0x1b882
   dded0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   dded8: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   ddee0: 05 00 2a ff 00 00 00 00      	ja -0xd6 <LBB502_27>

00000000000ddee8 <LBB502_45>:
   ddee8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddef0: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   ddef8: b7 02 00 00 db 07 00 00      	mov64 r2, 0x7db
   ddf00: 85 10 00 00 51 33 00 00      	call 0x3351
   ddf08: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   ddf10: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   ddf18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddf20: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   ddf28: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   ddf38: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ddf40: 85 10 00 00 6f 47 fe ff      	call -0x1b891
   ddf48: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   ddf50: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   ddf58: 05 00 1b ff 00 00 00 00      	ja -0xe5 <LBB502_27>

00000000000ddf60 <LBB502_46>:
   ddf60: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   ddf68: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   ddf70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddf78: 07 02 00 00 50 ff ff ff      	add64 r2, -0xb0
   ddf80: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   ddf88: 85 10 00 00 65 5a 00 00      	call 0x5a65
   ddf90: 69 a1 4c ff 00 00 00 00      	ldxh r1, [r10 - 0xb4]
   ddf98: 61 a2 48 ff 00 00 00 00      	ldxw r2, [r10 - 0xb8]
   ddfa0: 79 a3 a8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x258]
   ddfa8: 73 36 61 00 00 00 00 00      	stxb [r6 + 0x61], r3
   ddfb0: 79 a3 50 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b0]
   ddfb8: 73 36 90 00 00 00 00 00      	stxb [r6 + 0x90], r3
   ddfc0: 79 a3 58 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a8]
   ddfc8: 73 36 91 00 00 00 00 00      	stxb [r6 + 0x91], r3
   ddfd0: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   ddfd8: 73 36 92 00 00 00 00 00      	stxb [r6 + 0x92], r3
   ddfe0: 79 a3 20 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2e0]
   ddfe8: 73 36 c0 00 00 00 00 00      	stxb [r6 + 0xc0], r3
   ddff0: 79 a3 28 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d8]
   ddff8: 73 36 c1 00 00 00 00 00      	stxb [r6 + 0xc1], r3
   de000: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   de008: 73 36 c2 00 00 00 00 00      	stxb [r6 + 0xc2], r3
   de010: 79 a3 30 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d0]
   de018: 7b 36 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r3
   de020: 79 a3 38 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c8]
   de028: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   de030: 79 a3 98 fd 00 00 00 00      	ldxdw r3, [r10 - 0x268]
   de038: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   de040: 7b 96 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r9
   de048: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   de050: 7b 36 98 00 00 00 00 00      	stxdw [r6 + 0x98], r3
   de058: 79 a3 68 fd 00 00 00 00      	ldxdw r3, [r10 - 0x298]
   de060: 7b 36 88 00 00 00 00 00      	stxdw [r6 + 0x88], r3
   de068: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   de070: 7b 36 80 00 00 00 00 00      	stxdw [r6 + 0x80], r3
   de078: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   de080: 7b 36 78 00 00 00 00 00      	stxdw [r6 + 0x78], r3
   de088: 7b 86 70 00 00 00 00 00      	stxdw [r6 + 0x70], r8
   de090: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   de098: 7b 36 68 00 00 00 00 00      	stxdw [r6 + 0x68], r3
   de0a0: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   de0a8: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   de0b0: 79 a3 b0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x250]
   de0b8: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   de0c0: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   de0c8: 63 26 62 00 00 00 00 00      	stxw [r6 + 0x62], r2
   de0d0: 6b 16 66 00 00 00 00 00      	stxh [r6 + 0x66], r1
   de0d8: 05 00 31 fe 00 00 00 00      	ja -0x1cf <LBB502_5>
