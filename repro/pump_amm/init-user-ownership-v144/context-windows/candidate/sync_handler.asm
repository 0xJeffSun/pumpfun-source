
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000af220 <_ZN18pump_amm_recovered18pump_amm_recovered28sync_user_volume_accumulator17h15f98f9be68dbd67E>:
   af220: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   af228: 71 28 22 00 00 00 00 00      	ldxb r8, [r2 + 0x22]
   af230: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   af238: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af240: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   af248: 85 10 00 00 e8 92 00 00      	call 0x92e8
   af250: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   af258: 55 01 28 00 00 00 00 00      	jne r1, 0x0, +0x28 <LBB413_4>
   af260: 79 a7 58 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa8]
   af268: 79 91 08 02 00 00 00 00      	ldxdw r1, [r9 + 0x208]
   af270: cd 17 01 00 00 00 00 00      	jslt r7, r1, +0x1 <LBB413_2>
   af278: 05 00 02 00 00 00 00 00      	ja +0x2 <LBB413_3>

00000000000af280 <LBB413_2>:
   af280: 79 92 60 02 00 00 00 00      	ldxdw r2, [r9 + 0x260]
   af288: cd 12 32 00 00 00 00 00      	jslt r2, r1, +0x32 <LBB413_6>

00000000000af290 <LBB413_3>:
   af290: 79 91 80 02 00 00 00 00      	ldxdw r1, [r9 + 0x280]
   af298: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af2a0: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   af2a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af2b0: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
   af2b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af2c0: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   af2c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af2d0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af2d8: 18 01 00 00 48 fc 0f 00 00 00 00 00 00 00 00 00      	lddw r1, 0xffc48
   af2e8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   af2f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af2f8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af300: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   af308: 18 01 00 00 d0 3d 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113dd0
   af318: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af320: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af328: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   af330: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   af338: 7a 0a 50 ff 00 00 00 00      	stdw [r10 - 0xb0], 0x0
   af340: 7a 0a 38 ff 01 00 00 00      	stdw [r10 - 0xc8], 0x1
   af348: 7a 0a 48 ff 01 00 00 00      	stdw [r10 - 0xb8], 0x1
   af350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af358: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   af360: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af368: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af370: 85 10 00 00 d7 a8 00 00      	call 0xa8d7
   af378: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   af380: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   af388: 85 10 00 00 ff ff ff ff      	call -0x1
   af390: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   af398: 05 00 0d 00 00 00 00 00      	ja +0xd <LBB413_5>

00000000000af3a0 <LBB413_4>:
   af3a0: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   af3a8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af3b0: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   af3b8: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   af3c0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af3c8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af3d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af3d8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af3e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af3e8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af3f0: 85 10 00 00 f4 8a 00 00      	call 0x8af4
   af3f8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   af400: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]

00000000000af408 <LBB413_5>:
   af408: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   af410: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   af418: 95 00 00 00 00 00 00 00      	exit

00000000000af420 <LBB413_6>:
   af420: 79 95 50 02 00 00 00 00      	ldxdw r5, [r9 + 0x250]
   af428: 72 09 79 02 00 00 00 00      	stb [r9 + 0x279], 0x0
   af430: 7a 09 50 02 00 00 00 00      	stdw [r9 + 0x250], 0x0
   af438: 15 05 ca ff 00 00 00 00      	jeq r5, 0x0, -0x36 <LBB413_3>
   af440: 79 91 80 02 00 00 00 00      	ldxdw r1, [r9 + 0x280]
   af448: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af450: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   af458: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af460: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   af468: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af470: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   af478: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af480: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   af488: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af490: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   af498: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af4a0: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   af4a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af4b0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af4b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af4c0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af4c8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af4d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af4e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af4e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af4f0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af4f8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af500: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_9>
   af508: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af510 <LBB413_9>:
   af510: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_11>
   af518: bf 13 00 00 00 00 00 00      	mov64 r3, r1

00000000000af520 <LBB413_11>:
   af520: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   af530: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_13>
   af538: bf 31 00 00 00 00 00 00      	mov64 r1, r3

00000000000af540 <LBB413_13>:
   af540: 7b 8a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r8
   af548: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af558: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_15>

00000000000af560 <LBB413_14>:
   af560: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af568: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   af570: 85 10 00 00 81 a8 00 00      	call 0xa881

00000000000af578 <LBB413_15>:
   af578: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af588: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af590: 18 02 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r2, -0xa4ae8b8358853b
   af5a0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af5a8: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   af5b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   af5b8: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   af5c0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   af5c8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af5d0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   af5d8: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   af5e0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   af5e8: 7b 71 38 00 00 00 00 00      	stxdw [r1 + 0x38], r7
   af5f0: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   af5f8: 7b 51 28 00 00 00 00 00      	stxdw [r1 + 0x28], r5
   af600: 7a 01 30 00 00 00 00 00      	stdw [r1 + 0x30], 0x0
   af608: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af610: 7a 0a a0 ff 40 00 00 00      	stdw [r10 - 0x60], 0x40
   af618: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af620: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af628: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   af630: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af638: 85 10 00 00 f3 91 00 00      	call 0x91f3
   af640: 79 95 b8 02 00 00 00 00      	ldxdw r5, [r9 + 0x2b8]
   af648: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   af650: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af658: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_17>
   af660: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0

00000000000af668 <LBB413_17>:
   af668: 79 93 b0 02 00 00 00 00      	ldxdw r3, [r9 + 0x2b0]
   af670: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   af678: 55 08 01 00 01 00 00 00      	jne r8, 0x1, +0x1 <LBB413_19>

00000000000af680 <LBB413_18>:
   af680: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000af688 <LBB413_19>:
   af688: 79 90 c0 02 00 00 00 00      	ldxdw r0, [r9 + 0x2c0]
   af690: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
   af698: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af6a0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af6a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_21>
   af6b0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000af6b8 <LBB413_21>:
   af6b8: bf 38 00 00 00 00 00 00      	mov64 r8, r3
   af6c0: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   af6c8: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   af6d0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB413_23>
   af6d8: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB413_18>

00000000000af6e0 <LBB413_23>:
   af6e0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af6f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af6f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   af700: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   af708: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af710: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af718: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_25>
   af720: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af728 <LBB413_25>:
   af728: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_27>
   af730: bf 23 00 00 00 00 00 00      	mov64 r3, r2

00000000000af738 <LBB413_27>:
   af738: 7b 0a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r0
   af740: 18 02 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300007f00
   af750: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_29>
   af758: bf 32 00 00 00 00 00 00      	mov64 r2, r3

00000000000af760 <LBB413_29>:
   af760: 7b 5a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r5
   af768: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   af778: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_31>
   af780: 05 00 bb ff 00 00 00 00      	ja -0x45 <LBB413_14>

00000000000af788 <LBB413_31>:
   af788: 71 91 da 02 00 00 00 00      	ldxb r1, [r9 + 0x2da]
   af790: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   af798: 71 91 d9 02 00 00 00 00      	ldxb r1, [r9 + 0x2d9]
   af7a0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   af7a8: 71 91 d8 02 00 00 00 00      	ldxb r1, [r9 + 0x2d8]
   af7b0: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   af7b8: 79 91 d0 02 00 00 00 00      	ldxdw r1, [r9 + 0x2d0]
   af7c0: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   af7c8: 79 99 c8 02 00 00 00 00      	ldxdw r9, [r9 + 0x2c8]
   af7d0: 18 03 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300000000
   af7e0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   af7e8: 18 01 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r1, -0xa4ae8b8358853b
   af7f8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af800: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   af808: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   af810: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   af818: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   af820: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   af828: 7b 12 18 00 00 00 00 00      	stxdw [r2 + 0x18], r1
   af830: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   af838: 7b 12 20 00 00 00 00 00      	stxdw [r2 + 0x20], r1
   af840: 7b 72 38 00 00 00 00 00      	stxdw [r2 + 0x38], r7
   af848: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   af850: 7b 12 28 00 00 00 00 00      	stxdw [r2 + 0x28], r1
   af858: 7a 02 30 00 00 00 00 00      	stdw [r2 + 0x30], 0x0
   af860: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   af868: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af870: c5 04 a4 00 00 00 00 00      	jslt r4, 0x0, +0xa4 <LBB413_59>
   af878: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af880: 18 00 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r0, 0x300008000
   af890: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_34>
   af898: bf 10 00 00 00 00 00 00      	mov64 r0, r1

00000000000af8a0 <LBB413_34>:
   af8a0: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   af8a8: 1f 45 00 00 00 00 00 00      	sub64 r5, r4
   af8b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af8b8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af8c0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af8c8: 2d 05 01 00 00 00 00 00      	jgt r5, r0, +0x1 <LBB413_36>
   af8d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af8d8 <LBB413_36>:
   af8d8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_38>
   af8e0: bf 53 00 00 00 00 00 00      	mov64 r3, r5

00000000000af8e8 <LBB413_38>:
   af8e8: 18 04 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r4, 0x300000008
   af8f8: ad 43 93 00 00 00 00 00      	jlt r3, r4, +0x93 <LBB413_59>
   af900: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af910: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   af918: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
   af928: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af930: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000af938 <LBB413_40>:
   af938: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   af940: 0f 14 00 00 00 00 00 00      	add64 r4, r1
   af948: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   af950: 0f 15 00 00 00 00 00 00      	add64 r5, r1
   af958: 71 55 00 00 00 00 00 00      	ldxb r5, [r5 + 0x0]
   af960: 73 54 08 00 00 00 00 00      	stxb [r4 + 0x8], r5
   af968: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af970: 15 01 01 00 40 00 00 00      	jeq r1, 0x40, +0x1 <LBB413_41>
   af978: 05 00 f7 ff 00 00 00 00      	ja -0x9 <LBB413_40>

00000000000af980 <LBB413_41>:
   af980: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af990: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af998: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af9a0: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
   af9a8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   af9b0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   af9b8: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_43>
   af9c0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000af9c8 <LBB413_43>:
   af9c8: 55 05 01 00 00 00 00 00      	jne r5, 0x0, +0x1 <LBB413_45>
   af9d0: bf 14 00 00 00 00 00 00      	mov64 r4, r1

00000000000af9d8 <LBB413_45>:
   af9d8: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
   af9e8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_47>
   af9f0: bf 41 00 00 00 00 00 00      	mov64 r1, r4

00000000000af9f8 <LBB413_47>:
   af9f8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   afa08: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_49>
   afa10: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   afa18: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   afa20: 85 10 00 00 ee a7 00 00      	call 0xa7ee

00000000000afa28 <LBB413_49>:
   afa28: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   afa38: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   afa40: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   afa48: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   afa50: 79 85 10 00 00 00 00 00      	ldxdw r5, [r8 + 0x10]
   afa58: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   afa60: 7b 01 18 00 00 00 00 00      	stxdw [r1 + 0x18], r0
   afa68: 7b 51 10 00 00 00 00 00      	stxdw [r1 + 0x10], r5
   afa70: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   afa78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   afa80: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
   afa88: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   afa90: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   afa98: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   afaa0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   afaa8: 07 07 00 00 30 ff ff ff      	add64 r7, -0xd0
   afab0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   afab8: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   afac0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   afac8: 18 02 00 00 74 ed 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10ed74
   afad8: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   afae0: 85 10 00 00 a0 9e 00 00      	call 0x9ea0
   afae8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   afaf0: 73 1a c2 ff 00 00 00 00      	stxb [r10 - 0x3e], r1
   afaf8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   afb00: 73 1a c1 ff 00 00 00 00      	stxb [r10 - 0x3f], r1
   afb08: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   afb10: 73 1a c0 ff 00 00 00 00      	stxb [r10 - 0x40], r1
   afb18: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   afb20: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   afb28: 7b 9a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r9
   afb30: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   afb38: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   afb40: 79 a9 d0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x130]
   afb48: 7b 9a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r9
   afb50: 7b 8a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r8
   afb58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afb60: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   afb68: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   afb70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afb78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afb80: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   afb88: 18 01 00 00 49 e5 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e549
   afb98: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   afba0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   afba8: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   afbb0: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   afbb8: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   afbc0: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   afbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afbd0: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   afbd8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   afbe0: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   afbe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afbf0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   afbf8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   afc00: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   afc08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   afc10: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   afc18: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   afc20: 85 10 00 00 3d 91 00 00      	call 0x913d
   afc28: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   afc38: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   afc40: 5d 12 12 00 00 00 00 00      	jne r2, r1, +0x12 <LBB413_55>
   afc48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   afc50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afc58: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   afc60: bf 98 00 00 00 00 00 00      	mov64 r8, r9
   afc68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_52>
   afc70: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   afc78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afc80: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000afc88 <LBB413_52>:
   afc88: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   afc90: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   afc98: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afca0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   afca8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_54>
   afcb0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   afcb8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afcc0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000afcc8 <LBB413_54>:
   afcc8: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   afcd0: 05 00 e6 fe 00 00 00 00      	ja -0x11a <LBB413_5>

00000000000afcd8 <LBB413_55>:
   afcd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afce0: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   afce8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   afcf0: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   afcf8: 85 10 00 00 d3 89 00 00      	call 0x89d3
   afd00: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   afd08: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   afd10: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   afd18: 79 a4 a0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x60]
   afd20: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   afd28: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   afd30: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   afd38: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB413_57>
   afd40: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   afd48: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   afd50: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

00000000000afd58 <LBB413_57>:
   afd58: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   afd60: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afd68: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   afd70: 55 04 d2 fe 00 00 00 00      	jne r4, 0x0, -0x12e <LBB413_5>
   afd78: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   afd80: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afd88: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   afd90: 05 00 ce fe 00 00 00 00      	ja -0x132 <LBB413_5>

00000000000afd98 <LBB413_59>:
   afd98: b7 02 00 00 48 00 00 00      	mov64 r2, 0x48
   afda0: 85 10 00 00 7b a7 00 00      	call 0xa77b
