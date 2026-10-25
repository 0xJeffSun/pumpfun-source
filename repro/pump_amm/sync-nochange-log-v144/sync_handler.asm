
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-log-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000af120 <_ZN18pump_amm_recovered18pump_amm_recovered28sync_user_volume_accumulator17h15f98f9be68dbd67E>:
   af120: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   af128: 71 28 22 00 00 00 00 00      	ldxb r8, [r2 + 0x22]
   af130: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   af138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af140: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   af148: 85 10 00 00 a6 92 00 00      	call 0x92a6
   af150: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   af158: 55 01 28 00 00 00 00 00      	jne r1, 0x0, +0x28 <LBB413_4>
   af160: 79 a7 58 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa8]
   af168: 79 91 08 02 00 00 00 00      	ldxdw r1, [r9 + 0x208]
   af170: cd 17 01 00 00 00 00 00      	jslt r7, r1, +0x1 <LBB413_2>
   af178: 05 00 02 00 00 00 00 00      	ja +0x2 <LBB413_3>

00000000000af180 <LBB413_2>:
   af180: 79 92 60 02 00 00 00 00      	ldxdw r2, [r9 + 0x260]
   af188: cd 12 32 00 00 00 00 00      	jslt r2, r1, +0x32 <LBB413_6>

00000000000af190 <LBB413_3>:
   af190: 79 91 80 02 00 00 00 00      	ldxdw r1, [r9 + 0x280]
   af198: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af1a0: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   af1a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af1b0: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
   af1b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af1c0: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   af1c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af1d0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af1d8: 18 01 00 00 38 f9 0f 00 00 00 00 00 00 00 00 00      	lddw r1, 0xff938
   af1e8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   af1f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af1f8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af200: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   af208: 18 01 00 00 c0 3a 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113ac0
   af218: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af228: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   af230: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   af238: 7a 0a 50 ff 00 00 00 00      	stdw [r10 - 0xb0], 0x0
   af240: 7a 0a 38 ff 01 00 00 00      	stdw [r10 - 0xc8], 0x1
   af248: 7a 0a 48 ff 01 00 00 00      	stdw [r10 - 0xb8], 0x1
   af250: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af258: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   af260: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af268: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af270: 85 10 00 00 95 a8 00 00      	call 0xa895
   af278: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   af280: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   af288: 85 10 00 00 ff ff ff ff      	call -0x1
   af290: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   af298: 05 00 0d 00 00 00 00 00      	ja +0xd <LBB413_5>

00000000000af2a0 <LBB413_4>:
   af2a0: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   af2a8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af2b0: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   af2b8: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   af2c0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af2c8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af2d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af2d8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af2e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af2e8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af2f0: 85 10 00 00 b2 8a 00 00      	call 0x8ab2
   af2f8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   af300: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]

00000000000af308 <LBB413_5>:
   af308: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   af310: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   af318: 95 00 00 00 00 00 00 00      	exit

00000000000af320 <LBB413_6>:
   af320: 79 95 50 02 00 00 00 00      	ldxdw r5, [r9 + 0x250]
   af328: 72 09 79 02 00 00 00 00      	stb [r9 + 0x279], 0x0
   af330: 7a 09 50 02 00 00 00 00      	stdw [r9 + 0x250], 0x0
   af338: 15 05 ca ff 00 00 00 00      	jeq r5, 0x0, -0x36 <LBB413_3>
   af340: 79 91 80 02 00 00 00 00      	ldxdw r1, [r9 + 0x280]
   af348: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af350: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   af358: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af360: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   af368: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af370: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   af378: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af380: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   af388: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af390: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   af398: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af3a0: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   af3a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af3b0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af3b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af3c0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af3c8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af3d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af3e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af3e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af3f0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af3f8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af400: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_9>
   af408: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af410 <LBB413_9>:
   af410: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_11>
   af418: bf 13 00 00 00 00 00 00      	mov64 r3, r1

00000000000af420 <LBB413_11>:
   af420: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   af430: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_13>
   af438: bf 31 00 00 00 00 00 00      	mov64 r1, r3

00000000000af440 <LBB413_13>:
   af440: 7b 8a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r8
   af448: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af458: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_15>

00000000000af460 <LBB413_14>:
   af460: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af468: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   af470: 85 10 00 00 3f a8 00 00      	call 0xa83f

00000000000af478 <LBB413_15>:
   af478: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af488: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af490: 18 02 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r2, -0xa4ae8b8358853b
   af4a0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af4a8: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   af4b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   af4b8: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   af4c0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   af4c8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af4d0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   af4d8: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   af4e0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   af4e8: 7b 71 38 00 00 00 00 00      	stxdw [r1 + 0x38], r7
   af4f0: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   af4f8: 7b 51 28 00 00 00 00 00      	stxdw [r1 + 0x28], r5
   af500: 7a 01 30 00 00 00 00 00      	stdw [r1 + 0x30], 0x0
   af508: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af510: 7a 0a a0 ff 40 00 00 00      	stdw [r10 - 0x60], 0x40
   af518: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af520: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af528: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   af530: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af538: 85 10 00 00 b1 91 00 00      	call 0x91b1
   af540: 79 95 b8 02 00 00 00 00      	ldxdw r5, [r9 + 0x2b8]
   af548: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   af550: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af558: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_17>
   af560: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0

00000000000af568 <LBB413_17>:
   af568: 79 93 b0 02 00 00 00 00      	ldxdw r3, [r9 + 0x2b0]
   af570: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   af578: 55 08 01 00 01 00 00 00      	jne r8, 0x1, +0x1 <LBB413_19>

00000000000af580 <LBB413_18>:
   af580: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000af588 <LBB413_19>:
   af588: 79 90 c0 02 00 00 00 00      	ldxdw r0, [r9 + 0x2c0]
   af590: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
   af598: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af5a0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af5a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_21>
   af5b0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000af5b8 <LBB413_21>:
   af5b8: bf 38 00 00 00 00 00 00      	mov64 r8, r3
   af5c0: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   af5c8: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   af5d0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB413_23>
   af5d8: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB413_18>

00000000000af5e0 <LBB413_23>:
   af5e0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af5f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af5f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   af600: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   af608: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af610: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af618: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_25>
   af620: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af628 <LBB413_25>:
   af628: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_27>
   af630: bf 23 00 00 00 00 00 00      	mov64 r3, r2

00000000000af638 <LBB413_27>:
   af638: 7b 0a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r0
   af640: 18 02 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300007f00
   af650: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_29>
   af658: bf 32 00 00 00 00 00 00      	mov64 r2, r3

00000000000af660 <LBB413_29>:
   af660: 7b 5a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r5
   af668: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   af678: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_31>
   af680: 05 00 bb ff 00 00 00 00      	ja -0x45 <LBB413_14>

00000000000af688 <LBB413_31>:
   af688: 71 91 da 02 00 00 00 00      	ldxb r1, [r9 + 0x2da]
   af690: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   af698: 71 91 d9 02 00 00 00 00      	ldxb r1, [r9 + 0x2d9]
   af6a0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   af6a8: 71 91 d8 02 00 00 00 00      	ldxb r1, [r9 + 0x2d8]
   af6b0: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   af6b8: 79 91 d0 02 00 00 00 00      	ldxdw r1, [r9 + 0x2d0]
   af6c0: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   af6c8: 79 99 c8 02 00 00 00 00      	ldxdw r9, [r9 + 0x2c8]
   af6d0: 18 03 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300000000
   af6e0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   af6e8: 18 01 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r1, -0xa4ae8b8358853b
   af6f8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af700: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   af708: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   af710: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   af718: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   af720: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   af728: 7b 12 18 00 00 00 00 00      	stxdw [r2 + 0x18], r1
   af730: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   af738: 7b 12 20 00 00 00 00 00      	stxdw [r2 + 0x20], r1
   af740: 7b 72 38 00 00 00 00 00      	stxdw [r2 + 0x38], r7
   af748: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   af750: 7b 12 28 00 00 00 00 00      	stxdw [r2 + 0x28], r1
   af758: 7a 02 30 00 00 00 00 00      	stdw [r2 + 0x30], 0x0
   af760: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   af768: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af770: c5 04 a4 00 00 00 00 00      	jslt r4, 0x0, +0xa4 <LBB413_59>
   af778: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af780: 18 00 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r0, 0x300008000
   af790: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_34>
   af798: bf 10 00 00 00 00 00 00      	mov64 r0, r1

00000000000af7a0 <LBB413_34>:
   af7a0: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   af7a8: 1f 45 00 00 00 00 00 00      	sub64 r5, r4
   af7b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af7b8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af7c0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af7c8: 2d 05 01 00 00 00 00 00      	jgt r5, r0, +0x1 <LBB413_36>
   af7d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af7d8 <LBB413_36>:
   af7d8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_38>
   af7e0: bf 53 00 00 00 00 00 00      	mov64 r3, r5

00000000000af7e8 <LBB413_38>:
   af7e8: 18 04 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r4, 0x300000008
   af7f8: ad 43 93 00 00 00 00 00      	jlt r3, r4, +0x93 <LBB413_59>
   af800: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af810: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   af818: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
   af828: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af830: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000af838 <LBB413_40>:
   af838: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   af840: 0f 14 00 00 00 00 00 00      	add64 r4, r1
   af848: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   af850: 0f 15 00 00 00 00 00 00      	add64 r5, r1
   af858: 71 55 00 00 00 00 00 00      	ldxb r5, [r5 + 0x0]
   af860: 73 54 08 00 00 00 00 00      	stxb [r4 + 0x8], r5
   af868: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af870: 15 01 01 00 40 00 00 00      	jeq r1, 0x40, +0x1 <LBB413_41>
   af878: 05 00 f7 ff 00 00 00 00      	ja -0x9 <LBB413_40>

00000000000af880 <LBB413_41>:
   af880: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af890: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af898: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af8a0: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
   af8a8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   af8b0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   af8b8: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_43>
   af8c0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000af8c8 <LBB413_43>:
   af8c8: 55 05 01 00 00 00 00 00      	jne r5, 0x0, +0x1 <LBB413_45>
   af8d0: bf 14 00 00 00 00 00 00      	mov64 r4, r1

00000000000af8d8 <LBB413_45>:
   af8d8: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
   af8e8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_47>
   af8f0: bf 41 00 00 00 00 00 00      	mov64 r1, r4

00000000000af8f8 <LBB413_47>:
   af8f8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af908: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_49>
   af910: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af918: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   af920: 85 10 00 00 ac a7 00 00      	call 0xa7ac

00000000000af928 <LBB413_49>:
   af928: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af938: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af940: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   af948: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   af950: 79 85 10 00 00 00 00 00      	ldxdw r5, [r8 + 0x10]
   af958: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   af960: 7b 01 18 00 00 00 00 00      	stxdw [r1 + 0x18], r0
   af968: 7b 51 10 00 00 00 00 00      	stxdw [r1 + 0x10], r5
   af970: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   af978: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af980: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
   af988: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   af990: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   af998: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   af9a0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   af9a8: 07 07 00 00 30 ff ff ff      	add64 r7, -0xd0
   af9b0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   af9b8: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   af9c0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   af9c8: 18 02 00 00 64 ea 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10ea64
   af9d8: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af9e0: 85 10 00 00 5e 9e 00 00      	call 0x9e5e
   af9e8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   af9f0: 73 1a c2 ff 00 00 00 00      	stxb [r10 - 0x3e], r1
   af9f8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   afa00: 73 1a c1 ff 00 00 00 00      	stxb [r10 - 0x3f], r1
   afa08: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   afa10: 73 1a c0 ff 00 00 00 00      	stxb [r10 - 0x40], r1
   afa18: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   afa20: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   afa28: 7b 9a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r9
   afa30: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   afa38: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   afa40: 79 a9 d0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x130]
   afa48: 7b 9a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r9
   afa50: 7b 8a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r8
   afa58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afa60: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   afa68: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   afa70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afa78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afa80: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   afa88: 18 01 00 00 39 e2 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e239
   afa98: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   afaa0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   afaa8: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   afab0: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   afab8: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   afac0: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   afac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afad0: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   afad8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   afae0: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   afae8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afaf0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   afaf8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   afb00: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   afb08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   afb10: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   afb18: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   afb20: 85 10 00 00 fb 90 00 00      	call 0x90fb
   afb28: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   afb38: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   afb40: 5d 12 12 00 00 00 00 00      	jne r2, r1, +0x12 <LBB413_55>
   afb48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   afb50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afb58: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   afb60: bf 98 00 00 00 00 00 00      	mov64 r8, r9
   afb68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_52>
   afb70: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   afb78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afb80: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000afb88 <LBB413_52>:
   afb88: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   afb90: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   afb98: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afba0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   afba8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_54>
   afbb0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   afbb8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afbc0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000afbc8 <LBB413_54>:
   afbc8: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   afbd0: 05 00 e6 fe 00 00 00 00      	ja -0x11a <LBB413_5>

00000000000afbd8 <LBB413_55>:
   afbd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afbe0: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   afbe8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   afbf0: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   afbf8: 85 10 00 00 91 89 00 00      	call 0x8991
   afc00: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   afc08: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   afc10: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   afc18: 79 a4 a0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x60]
   afc20: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   afc28: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   afc30: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   afc38: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB413_57>
   afc40: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   afc48: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   afc50: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

00000000000afc58 <LBB413_57>:
   afc58: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   afc60: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afc68: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   afc70: 55 04 d2 fe 00 00 00 00      	jne r4, 0x0, -0x12e <LBB413_5>
   afc78: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   afc80: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afc88: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   afc90: 05 00 ce fe 00 00 00 00      	ja -0x132 <LBB413_5>

00000000000afc98 <LBB413_59>:
   afc98: b7 02 00 00 48 00 00 00      	mov64 r2, 0x48
   afca0: 85 10 00 00 39 a7 00 00      	call 0xa739
