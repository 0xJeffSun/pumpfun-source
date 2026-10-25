
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-context-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000af120 <_ZN18pump_amm_recovered18pump_amm_recovered28sync_user_volume_accumulator17h15f98f9be68dbd67E>:
   af120: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   af128: 71 27 22 00 00 00 00 00      	ldxb r7, [r2 + 0x22]
   af130: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   af138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af140: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   af148: 85 10 00 00 84 92 00 00      	call 0x9284
   af150: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   af158: 55 01 33 00 00 00 00 00      	jne r1, 0x0, +0x33 <LBB413_12>
   af160: 7b 7a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r7
   af168: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   af170: 79 a7 58 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa8]
   af178: 79 92 08 02 00 00 00 00      	ldxdw r2, [r9 + 0x208]
   af180: cd 27 01 00 00 00 00 00      	jslt r7, r2, +0x1 <LBB413_2>
   af188: 05 00 3a 00 00 00 00 00      	ja +0x3a <LBB413_13>

00000000000af190 <LBB413_2>:
   af190: 79 93 60 02 00 00 00 00      	ldxdw r3, [r9 + 0x260]
   af198: cd 23 01 00 00 00 00 00      	jslt r3, r2, +0x1 <LBB413_3>
   af1a0: 05 00 37 00 00 00 00 00      	ja +0x37 <LBB413_13>

00000000000af1a8 <LBB413_3>:
   af1a8: 79 95 50 02 00 00 00 00      	ldxdw r5, [r9 + 0x250]
   af1b0: 72 09 79 02 00 00 00 00      	stb [r9 + 0x279], 0x0
   af1b8: 7a 09 50 02 00 00 00 00      	stdw [r9 + 0x250], 0x0
   af1c0: 15 05 33 00 00 00 00 00      	jeq r5, 0x0, +0x33 <LBB413_13>
   af1c8: 79 91 80 02 00 00 00 00      	ldxdw r1, [r9 + 0x280]
   af1d0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af1d8: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   af1e0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af1e8: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   af1f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af1f8: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   af200: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af208: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   af210: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af218: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   af220: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af228: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   af230: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af238: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af240: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af248: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af250: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af260: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af268: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af270: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af278: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af280: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af288: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_6>
   af290: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af298 <LBB413_6>:
   af298: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_8>
   af2a0: bf 13 00 00 00 00 00 00      	mov64 r3, r1

00000000000af2a8 <LBB413_8>:
   af2a8: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   af2b8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_10>
   af2c0: bf 31 00 00 00 00 00 00      	mov64 r1, r3

00000000000af2c8 <LBB413_10>:
   af2c8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af2d8: 2d 21 13 00 00 00 00 00      	jgt r1, r2, +0x13 <LBB413_14>

00000000000af2e0 <LBB413_11>:
   af2e0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af2e8: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   af2f0: 85 10 00 00 4d a8 00 00      	call 0xa84d

00000000000af2f8 <LBB413_12>:
   af2f8: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   af300: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af308: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   af310: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   af318: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af320: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af330: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af338: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af340: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af348: 85 10 00 00 85 8a 00 00      	call 0x8a85
   af350: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   af358: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]

00000000000af360 <LBB413_13>:
   af360: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   af368: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   af370: 95 00 00 00 00 00 00 00      	exit

00000000000af378 <LBB413_14>:
   af378: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af388: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af390: 18 02 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r2, -0xa4ae8b8358853b
   af3a0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af3a8: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   af3b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   af3b8: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   af3c0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   af3c8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af3d0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   af3d8: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   af3e0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   af3e8: 7b 71 38 00 00 00 00 00      	stxdw [r1 + 0x38], r7
   af3f0: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   af3f8: 7b 51 28 00 00 00 00 00      	stxdw [r1 + 0x28], r5
   af400: 7a 01 30 00 00 00 00 00      	stdw [r1 + 0x30], 0x0
   af408: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af410: 7a 0a a0 ff 40 00 00 00      	stdw [r10 - 0x60], 0x40
   af418: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af420: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af428: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af430: 85 10 00 00 b0 91 00 00      	call 0x91b0
   af438: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   af440: 79 95 b8 02 00 00 00 00      	ldxdw r5, [r9 + 0x2b8]
   af448: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   af450: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af458: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_16>
   af460: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000af468 <LBB413_16>:
   af468: 79 92 b0 02 00 00 00 00      	ldxdw r2, [r9 + 0x2b0]
   af470: 7b 2a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r2
   af478: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   af480: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB413_18>

00000000000af488 <LBB413_17>:
   af488: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000af490 <LBB413_18>:
   af490: 79 93 c0 02 00 00 00 00      	ldxdw r3, [r9 + 0x2c0]
   af498: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af4a0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af4a8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af4b0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_20>
   af4b8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000af4c0 <LBB413_20>:
   af4c0: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   af4c8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af4d0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB413_22>
   af4d8: 05 00 f5 ff 00 00 00 00      	ja -0xb <LBB413_17>

00000000000af4e0 <LBB413_22>:
   af4e0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af4f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af4f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   af500: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   af508: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af510: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af518: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_24>
   af520: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af528 <LBB413_24>:
   af528: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_26>
   af530: bf 23 00 00 00 00 00 00      	mov64 r3, r2

00000000000af538 <LBB413_26>:
   af538: 18 02 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300007f00
   af548: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_28>
   af550: bf 32 00 00 00 00 00 00      	mov64 r2, r3

00000000000af558 <LBB413_28>:
   af558: 7b 5a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r5
   af560: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   af570: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_30>
   af578: 05 00 ac ff 00 00 00 00      	ja -0x54 <LBB413_11>

00000000000af580 <LBB413_30>:
   af580: 71 91 da 02 00 00 00 00      	ldxb r1, [r9 + 0x2da]
   af588: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   af590: 71 91 d9 02 00 00 00 00      	ldxb r1, [r9 + 0x2d9]
   af598: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   af5a0: 71 91 d8 02 00 00 00 00      	ldxb r1, [r9 + 0x2d8]
   af5a8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   af5b0: 79 91 d0 02 00 00 00 00      	ldxdw r1, [r9 + 0x2d0]
   af5b8: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   af5c0: 79 99 c8 02 00 00 00 00      	ldxdw r9, [r9 + 0x2c8]
   af5c8: 18 03 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300000000
   af5d8: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   af5e0: 18 01 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r1, -0xa4ae8b8358853b
   af5f0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af5f8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   af600: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   af608: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   af610: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   af618: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   af620: 7b 12 18 00 00 00 00 00      	stxdw [r2 + 0x18], r1
   af628: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   af630: 7b 12 20 00 00 00 00 00      	stxdw [r2 + 0x20], r1
   af638: 7b 72 38 00 00 00 00 00      	stxdw [r2 + 0x38], r7
   af640: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   af648: 7b 12 28 00 00 00 00 00      	stxdw [r2 + 0x28], r1
   af650: 7a 02 30 00 00 00 00 00      	stdw [r2 + 0x30], 0x0
   af658: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   af660: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af668: c5 04 a3 00 00 00 00 00      	jslt r4, 0x0, +0xa3 <LBB413_58>
   af670: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af678: 18 00 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r0, 0x300008000
   af688: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_33>
   af690: bf 10 00 00 00 00 00 00      	mov64 r0, r1

00000000000af698 <LBB413_33>:
   af698: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   af6a0: 1f 45 00 00 00 00 00 00      	sub64 r5, r4
   af6a8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af6b0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af6b8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af6c0: 2d 05 01 00 00 00 00 00      	jgt r5, r0, +0x1 <LBB413_35>
   af6c8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af6d0 <LBB413_35>:
   af6d0: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_37>
   af6d8: bf 53 00 00 00 00 00 00      	mov64 r3, r5

00000000000af6e0 <LBB413_37>:
   af6e0: 18 04 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r4, 0x300000008
   af6f0: ad 43 92 00 00 00 00 00      	jlt r3, r4, +0x92 <LBB413_58>
   af6f8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af708: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   af710: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
   af720: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af728: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000af730 <LBB413_39>:
   af730: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   af738: 0f 14 00 00 00 00 00 00      	add64 r4, r1
   af740: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   af748: 0f 15 00 00 00 00 00 00      	add64 r5, r1
   af750: 71 55 00 00 00 00 00 00      	ldxb r5, [r5 + 0x0]
   af758: 73 54 08 00 00 00 00 00      	stxb [r4 + 0x8], r5
   af760: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af768: 15 01 01 00 40 00 00 00      	jeq r1, 0x40, +0x1 <LBB413_40>
   af770: 05 00 f7 ff 00 00 00 00      	ja -0x9 <LBB413_39>

00000000000af778 <LBB413_40>:
   af778: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af788: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af790: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af798: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
   af7a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   af7a8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   af7b0: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_42>
   af7b8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000af7c0 <LBB413_42>:
   af7c0: 55 05 01 00 00 00 00 00      	jne r5, 0x0, +0x1 <LBB413_44>
   af7c8: bf 14 00 00 00 00 00 00      	mov64 r4, r1

00000000000af7d0 <LBB413_44>:
   af7d0: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
   af7e0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_46>
   af7e8: bf 41 00 00 00 00 00 00      	mov64 r1, r4

00000000000af7f0 <LBB413_46>:
   af7f0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af800: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_48>
   af808: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af810: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   af818: 85 10 00 00 ab a7 00 00      	call 0xa7ab

00000000000af820 <LBB413_48>:
   af820: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af830: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af838: 79 a7 d0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x130]
   af840: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   af848: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   af850: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   af858: 79 70 18 00 00 00 00 00      	ldxdw r0, [r7 + 0x18]
   af860: 7b 01 18 00 00 00 00 00      	stxdw [r1 + 0x18], r0
   af868: 7b 51 10 00 00 00 00 00      	stxdw [r1 + 0x10], r5
   af870: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   af878: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af880: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
   af888: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   af890: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   af898: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   af8a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af8a8: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   af8b0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   af8b8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   af8c0: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   af8c8: 18 02 00 00 34 e9 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10e934
   af8d8: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af8e0: 85 10 00 00 5c 9e 00 00      	call 0x9e5c
   af8e8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   af8f0: 73 1a c2 ff 00 00 00 00      	stxb [r10 - 0x3e], r1
   af8f8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   af900: 73 1a c1 ff 00 00 00 00      	stxb [r10 - 0x3f], r1
   af908: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   af910: 73 1a c0 ff 00 00 00 00      	stxb [r10 - 0x40], r1
   af918: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   af920: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   af928: 7b 9a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r9
   af930: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   af938: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   af940: 79 a9 c8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x138]
   af948: 7b 9a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r9
   af950: 7b 7a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r7
   af958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af960: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   af968: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   af970: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af978: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af980: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   af988: 18 01 00 00 29 e1 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e129
   af998: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   af9a0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   af9a8: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   af9b0: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   af9b8: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   af9c0: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   af9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af9d0: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   af9d8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   af9e0: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   af9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af9f0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   af9f8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   afa00: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   afa08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   afa10: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   afa18: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   afa20: 85 10 00 00 f9 90 00 00      	call 0x90f9
   afa28: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   afa38: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   afa40: 5d 12 10 00 00 00 00 00      	jne r2, r1, +0x10 <LBB413_54>
   afa48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   afa50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afa58: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   afa60: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_51>
   afa68: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   afa70: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afa78: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000afa80 <LBB413_51>:
   afa80: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   afa88: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   afa90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afa98: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   afaa0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_53>
   afaa8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   afab0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   afab8: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000afac0 <LBB413_53>:
   afac0: 05 00 13 ff 00 00 00 00      	ja -0xed <LBB413_13>

00000000000afac8 <LBB413_54>:
   afac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afad0: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   afad8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   afae0: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   afae8: 85 10 00 00 91 89 00 00      	call 0x8991
   afaf0: 79 a2 a8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x58]
   afaf8: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   afb00: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   afb08: 79 a3 a0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x60]
   afb10: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   afb18: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afb20: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   afb28: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB413_56>
   afb30: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   afb38: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   afb40: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

00000000000afb48 <LBB413_56>:
   afb48: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   afb50: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   afb58: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   afb60: 55 03 ff fe 00 00 00 00      	jne r3, 0x0, -0x101 <LBB413_13>
   afb68: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   afb70: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   afb78: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   afb80: 05 00 fb fe 00 00 00 00      	ja -0x105 <LBB413_13>

00000000000afb88 <LBB413_58>:
   afb88: b7 02 00 00 48 00 00 00      	mov64 r2, 0x48
   afb90: 85 10 00 00 39 a7 00 00      	call 0xa739
