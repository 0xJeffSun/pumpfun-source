
repro/pump_amm/init-user-ownership-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000db278 <_ZN145_$LT$pump_amm_recovered..InitUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..InitUserVolumeAccumulatorBumps$GT$$GT$12try_accounts28_$u7b$$u7b$closure$u7d$$u7d$17h28c1c3e7859b7011E>:
   db278: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   db280: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   db288: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   db290: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   db298: 79 89 18 00 00 00 00 00      	ldxdw r9, [r8 + 0x18]
   db2a0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   db2a8: 18 02 00 00 e0 dc 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10dce0
   db2b8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   db2c0: 85 10 00 00 07 60 00 00      	call 0x6007
   db2c8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   db2d0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   db2d8: 15 00 15 00 00 00 00 00      	jeq r0, 0x0, +0x15 <LBB496_4>
   db2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db2e8: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   db2f0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   db2f8: 85 10 00 00 8b 54 fe ff      	call -0x1ab75
   db300: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   db308: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_2>
   db310: 05 00 0d 03 00 00 00 00      	ja +0x30d <LBB496_105>

00000000000db318 <LBB496_2>:
   db318: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   db320: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   db328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db330: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   db338: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   db348: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   db350: 85 10 00 00 ed 4c fe ff      	call -0x1b313
   db358: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   db360: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]

00000000000db368 <LBB496_3>:
   db368: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   db370: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   db378: 72 07 59 00 02 00 00 00      	stb [r7 + 0x59], 0x2
   db380: 05 00 af 03 00 00 00 00      	ja +0x3af <LBB496_128>

00000000000db388 <LBB496_4>:
   db388: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   db390: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   db398: 85 10 00 00 f9 3d 00 00      	call 0x3df9
   db3a0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   db3a8: 7b 9a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r9
   db3b0: 15 07 3e 00 00 00 00 00      	jeq r7, 0x0, +0x3e <LBB496_17>
   db3b8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db3c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db3c8: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   db3d0: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   db3d8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   db3e0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   db3e8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   db3f0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   db3f8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   db400: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   db408: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   db410: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   db418: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   db420: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   db428: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   db430: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   db438: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   db440: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   db448: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db450: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   db458: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   db460: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   db468: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   db470: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   db478: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db480: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   db488: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   db490: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   db498: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   db4a0: 85 10 00 00 cb 5f 00 00      	call 0x5fcb
   db4a8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   db4b0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   db4b8: 15 00 de 00 00 00 00 00      	jeq r0, 0x0, +0xde <LBB496_43>
   db4c0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   db4c8: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   db4d0: 85 10 00 00 cd 3a 00 00      	call 0x3acd
   db4d8: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   db4e0: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <LBB496_8>
   db4e8: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1

00000000000db4f0 <LBB496_8>:
   db4f0: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   db4f8: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   db500: 2d 70 01 00 00 00 00 00      	jgt r0, r7, +0x1 <LBB496_9>
   db508: 05 00 b4 01 00 00 00 00      	ja +0x1b4 <LBB496_68>

00000000000db510 <LBB496_9>:
   db510: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   db518: 1f 72 00 00 00 00 00 00      	sub64 r2, r7
   db520: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   db528: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db530: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <LBB496_11>
   db538: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db540 <LBB496_11>:
   db540: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   db548: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <LBB496_13>
   db550: bf 24 00 00 00 00 00 00      	mov64 r4, r2

00000000000db558 <LBB496_13>:
   db558: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   db560: 79 30 08 00 00 00 00 00      	ldxdw r0, [r3 + 0x8]
   db568: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   db570: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db578: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_15>
   db580: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000db588 <LBB496_15>:
   db588: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   db590: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   db598: 55 01 17 01 01 00 00 00      	jne r1, 0x1, +0x117 <LBB496_46>
   db5a0: 05 00 0e 00 00 00 00 00      	ja +0xe <LBB496_20>

00000000000db5a8 <LBB496_17>:
   db5a8: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   db5b0: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   db5b8: 85 10 00 00 b0 3a 00 00      	call 0x3ab0
   db5c0: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db5c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db5d0: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   db5d8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   db5e0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db5e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db5f0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_19>
   db5f8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db600 <LBB496_19>:
   db600: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   db608: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   db610: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_21>

00000000000db618 <LBB496_20>:
   db618: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000db620 <LBB496_21>:
   db620: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   db628: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   db630: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db638: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db640: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_23>
   db648: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db650 <LBB496_23>:
   db650: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   db658: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   db660: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   db668: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_25>
   db670: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB496_20>

00000000000db678 <LBB496_25>:
   db678: 7b 7a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r7
   db680: 79 85 08 00 00 00 00 00      	ldxdw r5, [r8 + 0x8]
   db688: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   db690: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db698: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db6a0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_27>
   db6a8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db6b0 <LBB496_27>:
   db6b0: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   db6b8: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   db6c0: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   db6c8: 7b 0a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r0
   db6d0: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   db6d8: 7b 0a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r0
   db6e0: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   db6e8: 7b 0a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r0
   db6f0: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   db6f8: 7b 0a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r0
   db700: 79 17 18 00 00 00 00 00      	ldxdw r7, [r1 + 0x18]
   db708: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   db710: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_29>
   db718: 05 00 df ff 00 00 00 00      	ja -0x21 <LBB496_20>

00000000000db720 <LBB496_29>:
   db720: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   db728: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   db730: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db738: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   db740: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_31>
   db748: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000db750 <LBB496_31>:
   db750: 7b 5a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r5
   db758: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   db760: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_33>
   db768: 05 00 d5 ff 00 00 00 00      	ja -0x2b <LBB496_20>

00000000000db770 <LBB496_33>:
   db770: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   db778: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   db780: 79 52 08 00 00 00 00 00      	ldxdw r2, [r5 + 0x8]
   db788: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   db790: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db798: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db7a0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_35>
   db7a8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db7b0 <LBB496_35>:
   db7b0: 71 80 2a 00 00 00 00 00      	ldxb r0, [r8 + 0x2a]
   db7b8: 7b 0a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r0
   db7c0: 71 80 29 00 00 00 00 00      	ldxb r0, [r8 + 0x29]
   db7c8: 7b 0a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r0
   db7d0: 71 80 28 00 00 00 00 00      	ldxb r0, [r8 + 0x28]
   db7d8: 7b 0a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r0
   db7e0: 79 80 20 00 00 00 00 00      	ldxdw r0, [r8 + 0x20]
   db7e8: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   db7f0: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   db7f8: 7b 0a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r0
   db800: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   db808: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   db810: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   db818: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_37>
   db820: 05 00 be ff 00 00 00 00      	ja -0x42 <LBB496_20>

00000000000db828 <LBB496_37>:
   db828: 7b 7a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r7
   db830: 7b 4a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r4
   db838: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   db840: 79 54 10 00 00 00 00 00      	ldxdw r4, [r5 + 0x10]
   db848: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   db850: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db858: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db860: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_39>
   db868: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db870 <LBB496_39>:
   db870: 79 a0 88 fc 00 00 00 00      	ldxdw r0, [r10 - 0x378]
   db878: 79 a7 98 fc 00 00 00 00      	ldxdw r7, [r10 - 0x368]
   db880: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   db888: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_41>
   db890: 05 00 b0 ff 00 00 00 00      	ja -0x50 <LBB496_20>

00000000000db898 <LBB496_41>:
   db898: 79 51 18 00 00 00 00 00      	ldxdw r1, [r5 + 0x18]
   db8a0: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   db8a8: 79 51 20 00 00 00 00 00      	ldxdw r1, [r5 + 0x20]
   db8b0: 7b 1a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r1
   db8b8: 71 51 28 00 00 00 00 00      	ldxb r1, [r5 + 0x28]
   db8c0: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   db8c8: 71 57 29 00 00 00 00 00      	ldxb r7, [r5 + 0x29]
   db8d0: 71 55 2a 00 00 00 00 00      	ldxb r5, [r5 + 0x2a]
   db8d8: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   db8e0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db8e8: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   db8f0: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   db8f8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   db900: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   db908: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   db910: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   db918: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db920: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   db928: 79 61 28 00 00 00 00 00      	ldxdw r1, [r6 + 0x28]
   db930: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   db938: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   db940: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   db948: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   db950: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   db958: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   db960: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   db968: 18 03 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10e58f
   db978: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   db980: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   db988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db990: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   db998: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   db9a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db9a8: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   db9b0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   db9b8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   db9c0: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   db9c8: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   db9d0: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   db9d8: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   db9e0: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   db9e8: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   db9f0: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   db9f8: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dba00: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   dba08: 7b 9a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r9
   dba10: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   dba18: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   dba20: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   dba28: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   dba30: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   dba38: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   dba40: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   dba48: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   dba50: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   dba58: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   dba60: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   dba68: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   dba70: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   dba78: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   dba80: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   dba88: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   dba90: 7b 0a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r0
   dba98: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   dbaa0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dbaa8: 73 5a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r5
   dbab0: 73 7a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r7
   dbab8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   dbac0: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   dbac8: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   dbad0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbad8: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   dbae0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbae8: 7b 4a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r4
   dbaf0: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   dbaf8: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dbb00: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dbb08: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   dbb10: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dbb18: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dbb20: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   dbb28: 7a 0a c0 fe 01 00 00 00      	stdw [r10 - 0x140], 0x1
   dbb30: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   dbb38: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   dbb40: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dbb48: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   dbb50: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   dbb58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbb60: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   dbb68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbb70: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dbb78: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   dbb80: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   dbb88: 85 10 00 00 76 35 00 00      	call 0x3576
   dbb90: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   dbb98: 15 01 e8 01 02 00 00 00      	jeq r1, 0x2, +0x1e8 <LBB496_103>
   dbba0: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   dbba8: 05 00 a6 02 00 00 00 00      	ja +0x2a6 <LBB496_126>

00000000000dbbb0 <LBB496_43>:
   dbbb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbbb8: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   dbbc0: 18 02 00 00 c0 df 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10dfc0
   dbbd0: 85 10 00 00 39 36 00 00      	call 0x3639
   dbbd8: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   dbbe0: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   dbbe8: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   dbbf0: 18 01 00 00 28 3b 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113b28
   dbc00: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dbc08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbc10: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dbc18: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   dbc20: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   dbc28: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   dbc30: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   dbc38: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   dbc40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbc48: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   dbc50: 18 01 00 00 c0 df 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10dfc0
   dbc60: 85 10 00 00 ef 37 00 00      	call 0x37ef
   dbc68: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <LBB496_45>
   dbc70: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dbc78: 07 03 00 00 10 fe ff ff      	add64 r3, -0x1f0
   dbc80: 18 01 00 00 9e de 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10de9e
   dbc90: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   dbc98: 18 04 00 00 58 3b 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x113b58
   dbca8: 18 05 00 00 78 3b 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x113b78
   dbcb8: 85 10 00 00 b1 52 00 00      	call 0x52b1

00000000000dbcc0 <LBB496_45>:
   dbcc0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dbcc8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dbcd0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dbcd8: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   dbce0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   dbce8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbcf0: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   dbcf8: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dbd00: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   dbd08: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dbd10: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   dbd18: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbd20: 18 01 00 00 55 e4 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e455
   dbd30: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dbd38: 62 0a a8 fe 05 10 00 00      	stw [r10 - 0x158], 0x1005
   dbd40: 72 0a 60 fe 02 00 00 00      	stb [r10 - 0x1a0], 0x2
   dbd48: 62 0a 28 fe c1 01 00 00      	stw [r10 - 0x1d8], 0x1c1
   dbd50: 7a 0a 20 fe 0a 00 00 00      	stdw [r10 - 0x1e0], 0xa
   dbd58: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dbd60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbd68: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   dbd70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbd78: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dbd80: 85 10 00 00 b1 31 00 00      	call 0x31b1
   dbd88: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   dbd90: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   dbd98: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dbda0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dbda8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dbdb0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dbdb8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dbdc0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dbdc8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbdd0: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dbdd8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   dbde0: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dbde8: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   dbdf0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dbdf8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   dbe00: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbe08: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dbe10: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbe18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbe20: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   dbe28: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dbe30: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   dbe38: 85 10 00 00 dd 31 00 00      	call 0x31dd
   dbe40: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   dbe48: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   dbe50: 05 00 fc 01 00 00 00 00      	ja +0x1fc <LBB496_109>

00000000000dbe58 <LBB496_46>:
   dbe58: 79 39 10 00 00 00 00 00      	ldxdw r9, [r3 + 0x10]
   dbe60: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbe68: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbe70: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dbe78: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_48>
   dbe80: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dbe88 <LBB496_48>:
   dbe88: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dbe90: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_50>
   dbe98: 05 00 ef fe 00 00 00 00      	ja -0x111 <LBB496_20>

00000000000dbea0 <LBB496_50>:
   dbea0: 7b 4a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r4
   dbea8: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   dbeb0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dbeb8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbec0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dbec8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_52>
   dbed0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dbed8 <LBB496_52>:
   dbed8: 79 87 00 00 00 00 00 00      	ldxdw r7, [r8 + 0x0]
   dbee0: 7b 7a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r7
   dbee8: 71 37 2a 00 00 00 00 00      	ldxb r7, [r3 + 0x2a]
   dbef0: 7b 7a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r7
   dbef8: 71 37 29 00 00 00 00 00      	ldxb r7, [r3 + 0x29]
   dbf00: 7b 7a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r7
   dbf08: 71 37 28 00 00 00 00 00      	ldxb r7, [r3 + 0x28]
   dbf10: 7b 7a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r7
   dbf18: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   dbf20: 7b 7a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r7
   dbf28: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   dbf30: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   dbf38: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dbf40: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_54>
   dbf48: 05 00 d9 fe 00 00 00 00      	ja -0x127 <LBB496_20>

00000000000dbf50 <LBB496_54>:
   dbf50: 79 82 10 00 00 00 00 00      	ldxdw r2, [r8 + 0x10]
   dbf58: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dbf60: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbf68: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dbf70: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_56>
   dbf78: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dbf80 <LBB496_56>:
   dbf80: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   dbf88: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dbf90: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_58>
   dbf98: 05 00 cf fe 00 00 00 00      	ja -0x131 <LBB496_20>

00000000000dbfa0 <LBB496_58>:
   dbfa0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dbfa8: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   dbfb0: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   dbfb8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dbfc0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbfc8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dbfd0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_60>
   dbfd8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000dbfe0 <LBB496_60>:
   dbfe0: 71 87 2a 00 00 00 00 00      	ldxb r7, [r8 + 0x2a]
   dbfe8: 7b 7a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r7
   dbff0: 71 87 29 00 00 00 00 00      	ldxb r7, [r8 + 0x29]
   dbff8: 7b 7a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r7
   dc000: 71 87 28 00 00 00 00 00      	ldxb r7, [r8 + 0x28]
   dc008: 7b 7a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r7
   dc010: 79 87 20 00 00 00 00 00      	ldxdw r7, [r8 + 0x20]
   dc018: 7b 7a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r7
   dc020: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   dc028: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   dc030: 79 67 00 00 00 00 00 00      	ldxdw r7, [r6 + 0x0]
   dc038: 7b 7a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r7
   dc040: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dc048: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB496_62>
   dc050: 05 00 b8 fe 00 00 00 00      	ja -0x148 <LBB496_20>

00000000000dc058 <LBB496_62>:
   dc058: 7b 9a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r9
   dc060: 7b 5a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r5
   dc068: 79 67 10 00 00 00 00 00      	ldxdw r7, [r6 + 0x10]
   dc070: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   dc078: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc080: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dc088: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_64>
   dc090: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000dc098 <LBB496_64>:
   dc098: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   dc0a0: 79 a5 88 fc 00 00 00 00      	ldxdw r5, [r10 - 0x378]
   dc0a8: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   dc0b0: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB496_66>
   dc0b8: 05 00 ab fe 00 00 00 00      	ja -0x155 <LBB496_20>

00000000000dc0c0 <LBB496_66>:
   dc0c0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dc0c8: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   dc0d0: 79 64 20 00 00 00 00 00      	ldxdw r4, [r6 + 0x20]
   dc0d8: 71 65 28 00 00 00 00 00      	ldxb r5, [r6 + 0x28]
   dc0e0: 71 60 29 00 00 00 00 00      	ldxb r0, [r6 + 0x29]
   dc0e8: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   dc0f0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   dc0f8: 73 1a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r1
   dc100: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   dc108: 73 1a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r1
   dc110: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   dc118: 73 1a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r1
   dc120: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   dc128: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   dc130: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dc138: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   dc140: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   dc148: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   dc150: 7b 2a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r2
   dc158: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   dc160: 7b 2a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r2
   dc168: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   dc170: 73 2a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r2
   dc178: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   dc180: 73 2a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r2
   dc188: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   dc190: 73 2a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r2
   dc198: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   dc1a0: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   dc1a8: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   dc1b0: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   dc1b8: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   dc1c0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   dc1c8: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   dc1d0: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   dc1d8: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   dc1e0: 73 6a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r6
   dc1e8: 73 0a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r0
   dc1f0: 73 5a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r5
   dc1f8: 7b 4a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r4
   dc200: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   dc208: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dc210: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   dc218: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   dc220: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dc228: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dc230: 7a 0a 90 ff 00 00 00 00      	stdw [r10 - 0x70], 0x0
   dc238: 7a 0a 88 ff 08 00 00 00      	stdw [r10 - 0x78], 0x8
   dc240: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   dc248: 7a 0a e8 fe 08 00 00 00      	stdw [r10 - 0x118], 0x8
   dc250: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   dc258: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc260: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   dc268: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc270: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   dc278: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   dc280: 85 10 00 00 ff 34 00 00      	call 0x34ff
   dc288: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   dc290: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   dc298: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <LBB496_68>
   dc2a0: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   dc2a8: 05 00 c6 01 00 00 00 00      	ja +0x1c6 <LBB496_126>

00000000000dc2b0 <LBB496_68>:
   dc2b0: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   dc2b8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dc2c0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc2c8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc2d0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_70>
   dc2d8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc2e0 <LBB496_70>:
   dc2e0: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   dc2e8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dc2f0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_72>
   dc2f8: 05 00 63 fe 00 00 00 00      	ja -0x19d <LBB496_20>

00000000000dc300 <LBB496_72>:
   dc300: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   dc308: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dc310: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc318: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc320: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_74>
   dc328: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc330 <LBB496_74>:
   dc330: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dc338: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_76>
   dc340: 05 00 5a fe 00 00 00 00      	ja -0x1a6 <LBB496_20>

00000000000dc348 <LBB496_76>:
   dc348: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dc350: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   dc358: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   dc360: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dc368: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc370: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc378: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_78>
   dc380: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc388 <LBB496_78>:
   dc388: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   dc390: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   dc398: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   dc3a0: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   dc3a8: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   dc3b0: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   dc3b8: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   dc3c0: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   dc3c8: 79 88 18 00 00 00 00 00      	ldxdw r8, [r8 + 0x18]
   dc3d0: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   dc3d8: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   dc3e0: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dc3e8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_80>
   dc3f0: 05 00 44 fe 00 00 00 00      	ja -0x1bc <LBB496_20>

00000000000dc3f8 <LBB496_80>:
   dc3f8: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   dc400: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   dc408: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc410: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc418: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_82>
   dc420: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc428 <LBB496_82>:
   dc428: 7b 8a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r8
   dc430: 7b 9a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r9
   dc438: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   dc440: 7b 3a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r3
   dc448: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   dc450: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_84>
   dc458: 05 00 37 fe 00 00 00 00      	ja -0x1c9 <LBB496_20>

00000000000dc460 <LBB496_84>:
   dc460: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dc468: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   dc470: 79 79 20 00 00 00 00 00      	ldxdw r9, [r7 + 0x20]
   dc478: 71 72 28 00 00 00 00 00      	ldxb r2, [r7 + 0x28]
   dc480: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   dc488: 71 73 2a 00 00 00 00 00      	ldxb r3, [r7 + 0x2a]
   dc490: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   dc498: 79 86 20 00 00 00 00 00      	ldxdw r6, [r8 + 0x20]
   dc4a0: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   dc4a8: 79 60 18 00 00 00 00 00      	ldxdw r0, [r6 + 0x18]
   dc4b0: 7b 0a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r0
   dc4b8: 79 60 10 00 00 00 00 00      	ldxdw r0, [r6 + 0x10]
   dc4c0: 7b 0a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r0
   dc4c8: 79 60 08 00 00 00 00 00      	ldxdw r0, [r6 + 0x8]
   dc4d0: 7b 0a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r0
   dc4d8: 79 60 00 00 00 00 00 00      	ldxdw r0, [r6 + 0x0]
   dc4e0: 7b 0a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r0
   dc4e8: 79 80 28 00 00 00 00 00      	ldxdw r0, [r8 + 0x28]
   dc4f0: 71 08 00 00 00 00 00 00      	ldxb r8, [r0 + 0x0]
   dc4f8: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc500: 07 00 00 00 bf ff ff ff      	add64 r0, -0x41
   dc508: 7b 0a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r0
   dc510: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc518: 07 00 00 00 98 ff ff ff      	add64 r0, -0x68
   dc520: 7b 0a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r0
   dc528: 18 00 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r0, 0x10e58f
   dc538: 7b 0a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r0
   dc540: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc548: 07 00 00 00 c0 ff ff ff      	add64 r0, -0x40
   dc550: 7b 0a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r0
   dc558: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc560: 07 00 00 00 c8 fe ff ff      	add64 r0, -0x138
   dc568: 7b 0a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r0
   dc570: 73 3a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r3
   dc578: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   dc580: 73 2a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r2
   dc588: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   dc590: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dc598: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   dc5a0: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   dc5a8: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   dc5b0: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   dc5b8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dc5c0: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   dc5c8: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   dc5d0: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   dc5d8: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   dc5e0: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   dc5e8: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   dc5f0: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   dc5f8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc600: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dc608: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc610: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   dc618: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc620: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   dc628: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc630: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   dc638: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc640: 73 8a bf ff 00 00 00 00      	stxb [r10 - 0x41], r8
   dc648: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   dc650: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dc658: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dc660: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   dc668: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   dc670: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   dc678: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   dc680: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dc688: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc690: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   dc698: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc6a0: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dc6a8: b7 03 00 00 89 00 00 00      	mov64 r3, 0x89
   dc6b0: 85 10 00 00 2d 33 00 00      	call 0x332d
   dc6b8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   dc6c0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_85>
   dc6c8: 05 00 0c 00 00 00 00 00      	ja +0xc <LBB496_89>

00000000000dc6d0 <LBB496_85>:
   dc6d0: 7b 8a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r8
   dc6d8: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   dc6e0: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   dc6e8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dc6f0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc6f8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc700: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_87>
   dc708: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc710 <LBB496_87>:
   dc710: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   dc718: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dc720: 55 02 03 00 01 00 00 00      	jne r2, 0x1, +0x3 <LBB496_90>
   dc728: 05 00 dd fd 00 00 00 00      	ja -0x223 <LBB496_20>

00000000000dc730 <LBB496_89>:
   dc730: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   dc738: 05 00 34 01 00 00 00 00      	ja +0x134 <LBB496_126>

00000000000dc740 <LBB496_90>:
   dc740: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   dc748: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dc750: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc758: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc760: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_92>
   dc768: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc770 <LBB496_92>:
   dc770: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dc778: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_94>
   dc780: 05 00 d2 fd 00 00 00 00      	ja -0x22e <LBB496_20>

00000000000dc788 <LBB496_94>:
   dc788: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   dc790: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dc798: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc7a0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc7a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_96>
   dc7b0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc7b8 <LBB496_96>:
   dc7b8: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   dc7c0: 7b 5a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r5
   dc7c8: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   dc7d0: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   dc7d8: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   dc7e0: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   dc7e8: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   dc7f0: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   dc7f8: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   dc800: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   dc808: 79 85 18 00 00 00 00 00      	ldxdw r5, [r8 + 0x18]
   dc810: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   dc818: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dc820: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_98>
   dc828: 05 00 bd fd 00 00 00 00      	ja -0x243 <LBB496_20>

00000000000dc830 <LBB496_98>:
   dc830: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
   dc838: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dc840: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc848: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dc850: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_100>
   dc858: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dc860 <LBB496_100>:
   dc860: 7b 9a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r9
   dc868: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   dc870: 7b 3a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r3
   dc878: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dc880: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB496_102>
   dc888: 05 00 b1 fd 00 00 00 00      	ja -0x24f <LBB496_20>

00000000000dc890 <LBB496_102>:
   dc890: 79 75 18 00 00 00 00 00      	ldxdw r5, [r7 + 0x18]
   dc898: 79 70 20 00 00 00 00 00      	ldxdw r0, [r7 + 0x20]
   dc8a0: 71 79 28 00 00 00 00 00      	ldxb r9, [r7 + 0x28]
   dc8a8: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   dc8b0: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   dc8b8: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   dc8c0: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   dc8c8: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   dc8d0: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   dc8d8: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   dc8e0: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   dc8e8: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   dc8f0: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   dc8f8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc900: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   dc908: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   dc910: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc918: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   dc920: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   dc928: 18 03 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10e58f
   dc938: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   dc940: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc948: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   dc950: 7b 3a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r3
   dc958: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc960: 07 03 00 00 c8 fe ff ff      	add64 r3, -0x138
   dc968: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   dc970: 73 7a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r7
   dc978: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   dc980: 73 9a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r9
   dc988: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   dc990: 7b 5a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r5
   dc998: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   dc9a0: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   dc9a8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   dc9b0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dc9b8: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   dc9c0: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   dc9c8: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   dc9d0: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   dc9d8: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   dc9e0: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   dc9e8: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   dc9f0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc9f8: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   dca00: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dca08: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dca10: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dca18: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   dca20: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dca28: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dca30: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dca38: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   dca40: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   dca48: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   dca50: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dca58: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dca60: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   dca68: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   dca70: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   dca78: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   dca80: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dca88: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   dca90: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   dca98: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   dcaa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcaa8: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   dcab0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcab8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dcac0: 85 10 00 00 1d 33 00 00      	call 0x331d
   dcac8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   dcad0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_103>
   dcad8: 05 00 bf 00 00 00 00 00      	ja +0xbf <LBB496_125>

00000000000dcae0 <LBB496_103>:
   dcae0: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   dcae8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcaf0: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   dcaf8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dcb00: 85 10 00 00 23 4c fe ff      	call -0x1b3dd
   dcb08: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   dcb10: 79 a9 a0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x360]
   dcb18: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_104>
   dcb20: 05 00 0b 00 00 00 00 00      	ja +0xb <LBB496_105>

00000000000dcb28 <LBB496_104>:
   dcb28: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   dcb30: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   dcb38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcb40: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   dcb48: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dcb58: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dcb60: 85 10 00 00 eb 49 fe ff      	call -0x1b615
   dcb68: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   dcb70: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   dcb78: 05 00 fd fc 00 00 00 00      	ja -0x303 <LBB496_3>

00000000000dcb80 <LBB496_105>:
   dcb80: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   dcb88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcb90: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   dcb98: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   dcba0: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   dcba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcbb0: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   dcbb8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   dcbc0: 85 10 00 00 de 5c 00 00      	call 0x5cde
   dcbc8: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   dcbd0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dcbd8: 85 10 00 00 00 3b 00 00      	call 0x3b00
   dcbe0: 15 00 01 00 89 00 00 00      	jeq r0, 0x89, +0x1 <LBB496_106>
   dcbe8: 05 00 30 00 00 00 00 00      	ja +0x30 <LBB496_108>

00000000000dcbf0 <LBB496_106>:
   dcbf0: 79 a8 a8 fc 00 00 00 00      	ldxdw r8, [r10 - 0x358]
   dcbf8: 79 81 30 00 00 00 00 00      	ldxdw r1, [r8 + 0x30]
   dcc00: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   dcc08: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   dcc10: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dcc18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dcc20: 85 10 00 00 db 5c 00 00      	call 0x5cdb
   dcc28: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dcc30: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dcc38: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <LBB496_110>
   dcc40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcc48: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   dcc50: b7 02 00 00 d4 07 00 00      	mov64 r2, 0x7d4
   dcc58: 85 10 00 00 a6 35 00 00      	call 0x35a6
   dcc60: 79 a3 10 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f0]
   dcc68: 79 a2 08 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f8]
   dcc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcc78: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   dcc80: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dcc90: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dcc98: 85 10 00 00 c4 49 fe ff      	call -0x1b63c
   dcca0: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   dcca8: 79 a2 f8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x308]
   dccb0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dccb8: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dccc0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dccc8: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dccd0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dccd8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dcce0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dcce8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dccf0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   dccf8: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dcd00: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   dcd08: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dcd10: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   dcd18: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dcd20: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dcd28: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dcd30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd38: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   dcd40: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dcd48: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   dcd50: 85 10 00 00 fa 2f 00 00      	call 0x2ffa
   dcd58: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   dcd60: 79 a2 f0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x310]
   dcd68: 05 00 19 00 00 00 00 00      	ja +0x19 <LBB496_109>

00000000000dcd70 <LBB496_108>:
   dcd70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd78: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   dcd80: b7 02 00 00 e3 07 00 00      	mov64 r2, 0x7e3
   dcd88: 85 10 00 00 80 35 00 00      	call 0x3580
   dcd90: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   dcd98: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   dcda0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcda8: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   dcdb0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dcdc0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dcdc8: 85 10 00 00 9e 49 fe ff      	call -0x1b662
   dcdd0: 79 a7 30 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2d0]
   dcdd8: 79 a9 28 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2d8]
   dcde0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dcde8: 85 10 00 00 be 3a 00 00      	call 0x3abe
   dcdf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcdf8: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   dce00: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dce08: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dce10: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   dce18: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   dce20: 85 10 00 00 f5 47 fe ff      	call -0x1b80b
   dce28: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   dce30: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]

00000000000dce38 <LBB496_109>:
   dce38: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   dce40: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   dce48: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dce50: 05 00 54 00 00 00 00 00      	ja +0x54 <LBB496_127>

00000000000dce58 <LBB496_110>:
   dce58: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dce60: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   dce68: 85 10 00 00 9a 37 00 00      	call 0x379a
   dce70: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   dce78: 79 a6 98 fc 00 00 00 00      	ldxdw r6, [r10 - 0x368]
   dce80: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   dce88: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   dce90: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dce98: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dcea0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_112>
   dcea8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dceb0 <LBB496_112>:
   dceb0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   dceb8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   dcec0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_114>
   dcec8: 05 00 e9 fc 00 00 00 00      	ja -0x317 <LBB496_20>

00000000000dced0 <LBB496_114>:
   dced0: 79 69 10 00 00 00 00 00      	ldxdw r9, [r6 + 0x10]
   dced8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   dcee0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dcee8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dcef0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_116>
   dcef8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dcf00 <LBB496_116>:
   dcf00: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dcf08: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_118>
   dcf10: 05 00 e0 fc 00 00 00 00      	ja -0x320 <LBB496_20>

00000000000dcf18 <LBB496_118>:
   dcf18: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   dcf20: 79 63 20 00 00 00 00 00      	ldxdw r3, [r6 + 0x20]
   dcf28: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   dcf30: 71 65 29 00 00 00 00 00      	ldxb r5, [r6 + 0x29]
   dcf38: 71 60 2a 00 00 00 00 00      	ldxb r0, [r6 + 0x2a]
   dcf40: 73 0a 3a fe 00 00 00 00      	stxb [r10 - 0x1c6], r0
   dcf48: 73 5a 39 fe 00 00 00 00      	stxb [r10 - 0x1c7], r5
   dcf50: 73 4a 38 fe 00 00 00 00      	stxb [r10 - 0x1c8], r4
   dcf58: 7b 3a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r3
   dcf60: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   dcf68: 7b 9a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r9
   dcf70: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dcf78: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   dcf80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf88: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   dcf90: 85 10 00 00 7a 3a 00 00      	call 0x3a7a
   dcf98: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dcfa0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dcfa8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   dcfb0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB496_120>
   dcfb8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dcfc0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dcfc8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000dcfd0 <LBB496_120>:
   dcfd0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dcfd8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dcfe0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dcfe8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB496_122>
   dcff0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dcff8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dd000: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000dd008 <LBB496_122>:
   dd008: ad 70 01 00 00 00 00 00      	jlt r0, r7, +0x1 <LBB496_123>
   dd010: 05 00 0f 00 00 00 00 00      	ja +0xf <LBB496_124>

00000000000dd018 <LBB496_123>:
   dd018: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd020: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   dd028: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   dd030: 85 10 00 00 2b 35 00 00      	call 0x352b
   dd038: 79 a3 e0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x320]
   dd040: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   dd048: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd050: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   dd058: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dd068: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dd070: 85 10 00 00 49 49 fe ff      	call -0x1b6b7
   dd078: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   dd080: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   dd088: 05 00 b5 ff 00 00 00 00      	ja -0x4b <LBB496_109>

00000000000dd090 <LBB496_124>:
   dd090: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   dd098: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   dd0a0: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   dd0a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd0b0: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   dd0b8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   dd0c0: 85 10 00 00 3e 5c 00 00      	call 0x5c3e
   dd0c8: 7b 67 00 00 00 00 00 00      	stxdw [r7 + 0x0], r6
   dd0d0: 05 00 05 00 00 00 00 00      	ja +0x5 <LBB496_128>

00000000000dd0d8 <LBB496_125>:
   dd0d8: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]

00000000000dd0e0 <LBB496_126>:
   dd0e0: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   dd0e8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dd0f0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2

00000000000dd0f8 <LBB496_127>:
   dd0f8: 72 03 59 00 02 00 00 00      	stb [r3 + 0x59], 0x2

00000000000dd100 <LBB496_128>:
   dd100: 95 00 00 00 00 00 00 00      	exit
