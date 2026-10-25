   ac6c8: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   ac6d0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   ac6d8: 7b 2a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r2
   ac6e0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   ac6e8: 55 01 07 00 00 00 00 00      	jne r1, 0x0, +0x7 <.text+0xac608>
   ac6f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac6f8: 07 01 00 00 30 f4 ff ff      	add64 r1, -0xbd0
   ac700: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   ac708: 85 10 00 00 82 e5 01 00      	call 0x1e582
   ac710: 79 a1 30 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbd0]
   ac718: 79 a2 38 f4 00 00 00 00      	ldxdw r2, [r10 - 0xbc8]
   ac720: 05 00 c5 00 00 00 00 00      	ja +0xc5 <.text+0xacc30>
   ac728: 79 58 08 f0 00 00 00 00      	ldxdw r8, [r5 - 0xff8]
   ac730: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   ac738: 7b 2a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r2
   ac740: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   ac748: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   ac750: 7b 47 08 00 00 00 00 00      	stxdw [r7 + 0x8], r4
   ac758: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   ac760: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   ac768: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   ac770: 55 04 10 00 00 00 00 00      	jne r4, 0x0, +0x10 <.text+0xac6d8>
   ac778: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac780: 07 01 00 00 60 f4 ff ff      	add64 r1, -0xba0
   ac788: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   ac790: 85 10 00 00 71 e5 01 00      	call 0x1e571
   ac798: 79 a2 60 f4 00 00 00 00      	ldxdw r2, [r10 - 0xba0]
   ac7a0: 15 02 21 00 02 00 00 00      	jeq r2, 0x2, +0x21 <.text+0xac790>
   ac7a8: 79 a3 68 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb98]
   ac7b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac7b8: 07 01 00 00 50 f4 ff ff      	add64 r1, -0xbb0
   ac7c0: 18 04 00 00 90 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7590
   ac7d0: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   ac7d8: 85 10 00 00 2a ac fe ff      	call -0x153d6
   ac7e0: 79 a1 50 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbb0]
   ac7e8: 79 a2 58 f4 00 00 00 00      	ldxdw r2, [r10 - 0xba8]
   ac7f0: 05 00 ab 00 00 00 00 00      	ja +0xab <.text+0xacc30>
   ac7f8: bf 15 00 00 00 00 00 00      	mov64 r5, r1
   ac800: 07 05 00 00 fe ff ff ff      	add64 r5, -0x2
   ac808: 7b 57 08 00 00 00 00 00      	stxdw [r7 + 0x8], r5
   ac810: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   ac818: 07 04 00 00 60 00 00 00      	add64 r4, 0x60
   ac820: 7b 47 00 00 00 00 00 00      	stxdw [r7 + 0x0], r4
   ac828: 7b 3a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r3
   ac830: 15 05 0f 00 00 00 00 00      	jeq r5, 0x0, +0xf <.text+0xac790>
   ac838: 7b 4a 08 f9 00 00 00 00      	stxdw [r10 - 0x6f8], r4
   ac840: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   ac848: 07 04 00 00 fd ff ff ff      	add64 r4, -0x3
   ac850: 7b 47 08 00 00 00 00 00      	stxdw [r7 + 0x8], r4
   ac858: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   ac860: 07 03 00 00 90 00 00 00      	add64 r3, 0x90
   ac868: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   ac870: 55 04 0e 00 00 00 00 00      	jne r4, 0x0, +0xe <.text+0xac7c8>
   ac878: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac880: 07 01 00 00 70 f4 ff ff      	add64 r1, -0xb90
   ac888: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   ac890: 85 10 00 00 51 e5 01 00      	call 0x1e551
   ac898: 79 a1 70 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb90]
   ac8a0: 79 a2 78 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb88]
   ac8a8: 05 00 94 00 00 00 00 00      	ja +0x94 <.text+0xacc30>
   ac8b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac8b8: 07 01 00 00 40 f4 ff ff      	add64 r1, -0xbc0
   ac8c0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   ac8c8: 85 10 00 00 4a e5 01 00      	call 0x1e54a
   ac8d0: 79 a1 40 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbc0]
   ac8d8: 79 a2 48 f4 00 00 00 00      	ldxdw r2, [r10 - 0xbb8]
   ac8e0: 05 00 8d 00 00 00 00 00      	ja +0x8d <.text+0xacc30>
   ac8e8: 7b 3a 10 f9 00 00 00 00      	stxdw [r10 - 0x6f0], r3
   ac8f0: 07 01 00 00 fc ff ff ff      	add64 r1, -0x4
   ac8f8: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   ac900: 07 02 00 00 c0 00 00 00      	add64 r2, 0xc0
   ac908: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   ac910: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ac918: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ac920: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ac928: 85 10 00 00 28 cd fe ff      	call -0x132d8
   ac930: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   ac938: 15 01 16 00 02 00 00 00      	jeq r1, 0x2, +0x16 <.text+0xac8d0>
   ac940: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   ac950: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ac958: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   ac960: 07 03 00 00 c0 fb ff ff      	add64 r3, -0x440
   ac968: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   ac970: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   ac978: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xac868>
   ac980: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   ac988: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xac878>
   ac990: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   ac998: 18 09 00 00 c0 7b 00 00 00 00 00 00 03 00 00 00      	lddw r9, 0x300007bc0
   ac9a8: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xac8a0>
   ac9b0: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   ac9b8: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   ac9c0: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   ac9d0: 2d 19 0e 00 00 00 00 00      	jgt r9, r1, +0xe <.text+0xac928>
   ac9d8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   ac9e0: b7 02 00 00 40 04 00 00      	mov64 r2, 0x440
   ac9e8: 85 10 00 00 f8 fc 01 00      	call 0x1fcf8
   ac9f0: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   ac9f8: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   aca00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aca08: 07 01 00 00 80 f4 ff ff      	add64 r1, -0xb80
   aca10: 18 04 00 00 26 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7326
   aca20: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   aca28: 85 10 00 00 e0 ab fe ff      	call -0x15420
   aca30: 79 a1 80 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb80]
   aca38: 79 a2 88 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb78]
   aca40: 05 00 61 00 00 00 00 00      	ja +0x61 <.text+0xacc30>
   aca48: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   aca58: 7b 91 00 00 00 00 00 00      	stxdw [r1 + 0x0], r9
   aca60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   aca68: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   aca70: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   aca78: b7 03 00 00 40 04 00 00      	mov64 r3, 0x440
   aca80: 85 10 00 00 71 0d 02 00      	call 0x20d71
   aca88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aca90: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   aca98: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   acaa0: 85 10 00 00 9f cb fe ff      	call -0x13461
   acaa8: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   acab0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   acab8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xac9a8>
   acac0: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xacb18>
   acac8: 7b 3a 18 f9 00 00 00 00      	stxdw [r10 - 0x6e8], r3
   acad0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acad8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   acae0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   acae8: 85 10 00 00 12 ce fe ff      	call -0x131ee
   acaf0: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   acaf8: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   acb00: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xac9f0>
   acb08: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xacb60>
   acb10: 7b 3a 20 f9 00 00 00 00      	stxdw [r10 - 0x6e0], r3
   acb18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acb20: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   acb28: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   acb30: 85 10 00 00 97 ce fe ff      	call -0x13169
   acb38: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   acb40: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   acb48: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xaca38>
   acb50: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xacba8>
   acb58: 7b 3a 28 f9 00 00 00 00      	stxdw [r10 - 0x6d8], r3
   acb60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acb68: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   acb70: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   acb78: 85 10 00 00 b7 cd fe ff      	call -0x13249
   acb80: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   acb88: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   acb90: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xaca80>
   acb98: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xacbf0>
   acba0: 7b 3a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r3
   acba8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   acbb0: 55 01 37 00 00 00 00 00      	jne r1, 0x0, +0x37 <.text+0xacc50>
   acbb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acbc0: 07 01 00 00 a0 f8 ff ff      	add64 r1, -0x760
   acbc8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   acbd0: 85 10 00 00 e9 e4 01 00      	call 0x1e4e9
   acbd8: 79 a3 a8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x758]
   acbe0: 79 a2 a0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x760]
   acbe8: 15 02 38 00 02 00 00 00      	jeq r2, 0x2, +0x38 <.text+0xacc90>
   acbf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acbf8: 07 01 00 00 90 f8 ff ff      	add64 r1, -0x770
   acc00: 18 04 00 00 29 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7529
   acc10: b7 05 00 00 11 00 00 00      	mov64 r5, 0x11
   acc18: 85 10 00 00 a2 ab fe ff      	call -0x1545e
   acc20: 79 a1 90 f8 00 00 00 00      	ldxdw r1, [r10 - 0x770]
   acc28: 79 a2 98 f8 00 00 00 00      	ldxdw r2, [r10 - 0x768]
   acc30: 05 00 23 00 00 00 00 00      	ja +0x23 <.text+0xacc30>
   acc38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acc40: 07 01 00 00 e0 f8 ff ff      	add64 r1, -0x720
   acc48: 18 04 00 00 68 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5e68
   acc58: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   acc60: 85 10 00 00 99 ab fe ff      	call -0x15467
   acc68: 79 a1 e0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x720]
   acc70: 79 a2 e8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x718]
   acc78: 05 00 1a 00 00 00 00 00      	ja +0x1a <.text+0xacc30>
   acc80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acc88: 07 01 00 00 d0 f8 ff ff      	add64 r1, -0x730
   acc90: 18 04 00 00 5b 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b735b
   acca0: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   acca8: 85 10 00 00 90 ab fe ff      	call -0x15470
   accb0: 79 a1 d0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x730]
   accb8: 79 a2 d8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x728]
   accc0: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0xacc30>
   accc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   accd0: 07 01 00 00 c0 f8 ff ff      	add64 r1, -0x740
   accd8: 18 04 00 00 9e 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b759e
   acce8: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   accf0: 85 10 00 00 87 ab fe ff      	call -0x15479
   accf8: 79 a1 c0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x740]
   acd00: 79 a2 c8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x738]
   acd08: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0xacc30>
   acd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acd18: 07 01 00 00 b0 f8 ff ff      	add64 r1, -0x750
   acd20: 18 04 00 00 c1 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b74c1
   acd30: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   acd38: 85 10 00 00 7e ab fe ff      	call -0x15482
   acd40: 79 a1 b0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x750]
   acd48: 79 a2 b8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x748]
   acd50: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   acd58: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   acd60: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   acd68: 95 00 00 00 00 00 00 00      	exit
   acd70: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   acd78: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   acd80: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   acd88: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   acd90: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   acd98: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   acda0: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   acda8: 55 02 11 00 00 00 00 00      	jne r2, 0x0, +0x11 <.text+0xacd18>
   acdb0: 7b 3a 28 f4 00 00 00 00      	stxdw [r10 - 0xbd8], r3
   acdb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acdc0: 07 01 00 00 80 f8 ff ff      	add64 r1, -0x780
   acdc8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   acdd0: 85 10 00 00 a9 e4 01 00      	call 0x1e4a9
   acdd8: 79 a3 88 f8 00 00 00 00      	ldxdw r3, [r10 - 0x778]
   acde0: 79 a2 80 f8 00 00 00 00      	ldxdw r2, [r10 - 0x780]
   acde8: 15 02 12 00 02 00 00 00      	jeq r2, 0x2, +0x12 <.text+0xacd60>
   acdf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acdf8: 07 01 00 00 70 f8 ff ff      	add64 r1, -0x790
   ace00: 18 04 00 00 83 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7583
   ace10: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   ace18: 85 10 00 00 62 ab fe ff      	call -0x1549e
   ace20: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   ace28: 79 a2 78 f8 00 00 00 00      	ldxdw r2, [r10 - 0x788]
   ace30: 05 00 e3 ff 00 00 00 00      	ja -0x1d <.text+0xacc30>
   ace38: 7b 3a 28 f4 00 00 00 00      	stxdw [r10 - 0xbd8], r3
   ace40: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   ace48: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   ace50: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   ace58: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   ace60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   ace68: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   ace70: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   ace78: 55 02 11 00 00 00 00 00      	jne r2, 0x0, +0x11 <.text+0xacde8>
   ace80: 7b 3a 20 f4 00 00 00 00      	stxdw [r10 - 0xbe0], r3
   ace88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ace90: 07 01 00 00 60 f8 ff ff      	add64 r1, -0x7a0
   ace98: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   acea0: 85 10 00 00 8f e4 01 00      	call 0x1e48f
   acea8: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   aceb0: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   aceb8: 15 02 12 00 02 00 00 00      	jeq r2, 0x2, +0x12 <.text+0xace30>
   acec0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acec8: 07 01 00 00 50 f8 ff ff      	add64 r1, -0x7b0
   aced0: 18 04 00 00 50 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7550
   acee0: b7 05 00 00 09 00 00 00      	mov64 r5, 0x9
   acee8: 85 10 00 00 48 ab fe ff      	call -0x154b8
   acef0: 79 a1 50 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b0]
   acef8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   acf00: 05 00 c9 ff 00 00 00 00      	ja -0x37 <.text+0xacc30>
   acf08: 7b 3a 20 f4 00 00 00 00      	stxdw [r10 - 0xbe0], r3
   acf10: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   acf18: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   acf20: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   acf28: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   acf30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   acf38: 07 02 00 00 fd ff ff ff      	add64 r2, -0x3
   acf40: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   acf48: 55 02 1a 00 00 00 00 00      	jne r2, 0x0, +0x1a <.text+0xacf00>
   acf50: 7b 3a 18 f4 00 00 00 00      	stxdw [r10 - 0xbe8], r3
   acf58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acf60: 07 01 00 00 40 f8 ff ff      	add64 r1, -0x7c0
   acf68: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   acf70: 85 10 00 00 75 e4 01 00      	call 0x1e475
   acf78: 79 a3 48 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7b8]
   acf80: 79 a2 40 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7c0]
   acf88: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xace78>
   acf90: 05 00 34 00 00 00 00 00      	ja +0x34 <.text+0xad018>
   acf98: 7b 3a 10 f4 00 00 00 00      	stxdw [r10 - 0xbf0], r3
   acfa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acfa8: 07 01 00 00 20 f8 ff ff      	add64 r1, -0x7e0
   acfb0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   acfb8: 85 10 00 00 6c e4 01 00      	call 0x1e46c
   acfc0: 79 a3 28 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7d8]
   acfc8: 79 a2 20 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e0]
   acfd0: 15 02 19 00 02 00 00 00      	jeq r2, 0x2, +0x19 <.text+0xacf80>
   acfd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acfe0: 07 01 00 00 10 f8 ff ff      	add64 r1, -0x7f0
   acfe8: 18 04 00 00 71 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7571
   acff8: b7 05 00 00 12 00 00 00      	mov64 r5, 0x12
   ad000: 85 10 00 00 25 ab fe ff      	call -0x154db
   ad008: 79 a1 10 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7f0]
   ad010: 79 a2 18 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e8]
   ad018: 05 00 a6 ff 00 00 00 00      	ja -0x5a <.text+0xacc30>
   ad020: 7b 3a 18 f4 00 00 00 00      	stxdw [r10 - 0xbe8], r3
   ad028: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   ad030: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   ad038: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   ad040: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   ad048: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   ad050: 07 02 00 00 fc ff ff ff      	add64 r2, -0x4
   ad058: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   ad060: 15 02 e6 ff 00 00 00 00      	jeq r2, 0x0, -0x1a <.text+0xace78>
   ad068: 7b 3a 10 f4 00 00 00 00      	stxdw [r10 - 0xbf0], r3
   ad070: 07 01 00 00 fb ff ff ff      	add64 r1, -0x5
   ad078: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   ad080: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   ad088: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   ad090: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   ad098: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   ad0a0: 7b 3a f8 f3 00 00 00 00      	stxdw [r10 - 0xc08], r3
   ad0a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad0b0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad0b8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ad0c0: 85 10 00 00 7c ab fe ff      	call -0x15484
   ad0c8: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   ad0d0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   ad0d8: 71 a1 ea fb 00 00 00 00      	ldxb r1, [r10 - 0x416]
   ad0e0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xacfd0>
   ad0e8: 05 00 12 00 00 00 00 00      	ja +0x12 <.text+0xad060>
   ad0f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad0f8: 07 01 00 00 90 f4 ff ff      	add64 r1, -0xb70
   ad100: 18 04 00 00 2c 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b732c
   ad110: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   ad118: 85 10 00 00 02 ab fe ff      	call -0x154fe
   ad120: 79 a1 90 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb70]
   ad128: 79 a2 98 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb68]
   ad130: 05 00 83 ff 00 00 00 00      	ja -0x7d <.text+0xacc30>
   ad138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad140: 07 01 00 00 30 f8 ff ff      	add64 r1, -0x7d0
   ad148: 18 04 00 00 65 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7565
   ad158: b7 05 00 00 0c 00 00 00      	mov64 r5, 0xc
   ad160: 85 10 00 00 f9 aa fe ff      	call -0x15507
   ad168: 79 a1 30 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7d0]
   ad170: 79 a2 38 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7c8]
   ad178: 05 00 7a ff 00 00 00 00      	ja -0x86 <.text+0xacc30>
   ad180: 7b 1a e0 f3 00 00 00 00      	stxdw [r10 - 0xc20], r1
   ad188: 7b 2a e8 f3 00 00 00 00      	stxdw [r10 - 0xc18], r2
   ad190: 7b 3a 00 f4 00 00 00 00      	stxdw [r10 - 0xc00], r3
   ad198: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ad1a0: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   ad1a8: 79 a1 e0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x420]
   ad1b0: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   ad1b8: 69 a1 e8 fb 00 00 00 00      	ldxh r1, [r10 - 0x418]
   ad1c0: 6b 1a 50 f9 00 00 00 00      	stxh [r10 - 0x6b0], r1
   ad1c8: 61 a1 eb fb 00 00 00 00      	ldxw r1, [r10 - 0x415]
   ad1d0: 63 1a 38 f9 00 00 00 00      	stxw [r10 - 0x6c8], r1
   ad1d8: 71 a1 ef fb 00 00 00 00      	ldxb r1, [r10 - 0x411]
   ad1e0: 73 1a 3c f9 00 00 00 00      	stxb [r10 - 0x6c4], r1
   ad1e8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad1f0: 7b 1a 08 f4 00 00 00 00      	stxdw [r10 - 0xbf8], r1
   ad1f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad200: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad208: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ad210: 85 10 00 00 52 ab fe ff      	call -0x154ae
   ad218: 79 a7 c8 fb 00 00 00 00      	ldxdw r7, [r10 - 0x438]
   ad220: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   ad228: 71 a1 ea fb 00 00 00 00      	ldxb r1, [r10 - 0x416]
   ad230: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xad120>
   ad238: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0xad198>
   ad240: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad248: 07 01 00 00 a0 f4 ff ff      	add64 r1, -0xb60
   ad250: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   ad258: 18 04 00 00 54 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7354
   ad268: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   ad270: 85 10 00 00 d7 aa fe ff      	call -0x15529
   ad278: 79 a1 a0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb60]
   ad280: 79 a2 a8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb58]
   ad288: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   ad290: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   ad298: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   ad2a0: 79 a2 00 f4 00 00 00 00      	ldxdw r2, [r10 - 0xc00]
   ad2a8: 79 a3 08 f4 00 00 00 00      	ldxdw r3, [r10 - 0xbf8]
   ad2b0: 05 00 84 01 00 00 00 00      	ja +0x184 <.text+0xaddb8>
   ad2b8: 7b 2a d0 f3 00 00 00 00      	stxdw [r10 - 0xc30], r2
   ad2c0: 7b 1a d8 f3 00 00 00 00      	stxdw [r10 - 0xc28], r1
   ad2c8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ad2d0: 7b 1a 60 f9 00 00 00 00      	stxdw [r10 - 0x6a0], r1
   ad2d8: 79 a1 e0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x420]
   ad2e0: 7b 1a 68 f9 00 00 00 00      	stxdw [r10 - 0x698], r1
   ad2e8: 69 a1 e8 fb 00 00 00 00      	ldxh r1, [r10 - 0x418]
   ad2f0: 6b 1a 70 f9 00 00 00 00      	stxh [r10 - 0x690], r1
   ad2f8: 61 a1 eb fb 00 00 00 00      	ldxw r1, [r10 - 0x415]
   ad300: 63 1a 58 f9 00 00 00 00      	stxw [r10 - 0x6a8], r1
   ad308: 71 a1 ef fb 00 00 00 00      	ldxb r1, [r10 - 0x411]
   ad310: 73 1a 5c f9 00 00 00 00      	stxb [r10 - 0x6a4], r1
   ad318: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad320: 7b 1a f0 f3 00 00 00 00      	stxdw [r10 - 0xc10], r1
   ad328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad330: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad338: 85 10 00 00 dc e6 01 00      	call 0x1e6dc
   ad340: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ad348: 7b 1a 90 f9 00 00 00 00      	stxdw [r10 - 0x670], r1
   ad350: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad358: 7b 1a 98 f9 00 00 00 00      	stxdw [r10 - 0x668], r1
   ad360: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ad368: 7b 1a a0 f9 00 00 00 00      	stxdw [r10 - 0x660], r1
   ad370: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ad378: 15 01 0c 00 00 00 00 00      	jeq r1, 0x0, +0xc <.text+0xad2c0>
   ad380: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad388: 07 01 00 00 00 f8 ff ff      	add64 r1, -0x800
   ad390: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ad398: 07 02 00 00 90 f9 ff ff      	add64 r2, -0x670
   ad3a0: 85 10 00 00 02 dd 01 00      	call 0x1dd02
   ad3a8: 79 a1 00 f8 00 00 00 00      	ldxdw r1, [r10 - 0x800]
   ad3b0: 79 a2 08 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f8]
   ad3b8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   ad3c0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   ad3c8: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   ad3d0: 79 a3 08 f4 00 00 00 00      	ldxdw r3, [r10 - 0xbf8]
   ad3d8: 05 00 4f 01 00 00 00 00      	ja +0x14f <.text+0xadd38>
   ad3e0: 7b 7a c8 f3 00 00 00 00      	stxdw [r10 - 0xc38], r7
   ad3e8: 79 a1 a0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x660]
   ad3f0: 7b 1a 88 f9 00 00 00 00      	stxdw [r10 - 0x678], r1
   ad3f8: 79 a1 98 f9 00 00 00 00      	ldxdw r1, [r10 - 0x668]
   ad400: 7b 1a 80 f9 00 00 00 00      	stxdw [r10 - 0x680], r1
   ad408: 79 a1 90 f9 00 00 00 00      	ldxdw r1, [r10 - 0x670]
   ad410: 7b 1a 78 f9 00 00 00 00      	stxdw [r10 - 0x688], r1
   ad418: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad420: 07 01 00 00 00 f9 ff ff      	add64 r1, -0x700
   ad428: 7b 1a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r1
   ad430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad438: 07 01 00 00 28 f9 ff ff      	add64 r1, -0x6d8
   ad440: 7b 1a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r1
   ad448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad450: 07 01 00 00 20 f9 ff ff      	add64 r1, -0x6e0
   ad458: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   ad460: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad468: 07 01 00 00 18 f9 ff ff      	add64 r1, -0x6e8
   ad470: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   ad478: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad480: 07 01 00 00 78 f9 ff ff      	add64 r1, -0x688
   ad488: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   ad490: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad498: 07 01 00 00 f8 f8 ff ff      	add64 r1, -0x708
   ad4a0: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   ad4a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad4b0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad4b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ad4c0: 07 02 00 00 b0 fa ff ff      	add64 r2, -0x550
   ad4c8: 85 10 00 00 91 05 00 00      	call 0x591
   ad4d0: 61 a7 c0 fb 00 00 00 00      	ldxw r7, [r10 - 0x440]
   ad4d8: 15 07 01 00 02 00 00 00      	jeq r7, 0x2, +0x1 <.text+0xad3c8>
   ad4e0: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0xad3e0>
   ad4e8: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ad4f0: 79 a2 d0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x430]
   ad4f8: 05 00 26 01 00 00 00 00      	ja +0x126 <.text+0xadd10>
   ad500: 61 a1 c4 fb 00 00 00 00      	ldxw r1, [r10 - 0x43c]
   ad508: 7b 1a c0 f3 00 00 00 00      	stxdw [r10 - 0xc40], r1
   ad510: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ad518: 7b 1a b8 f3 00 00 00 00      	stxdw [r10 - 0xc48], r1
   ad520: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad528: 7b 1a b0 f3 00 00 00 00      	stxdw [r10 - 0xc50], r1
   ad530: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad538: 07 01 00 00 c0 f9 ff ff      	add64 r1, -0x640
   ad540: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ad548: 07 02 00 00 d8 fb ff ff      	add64 r2, -0x428
   ad550: b7 03 00 00 68 00 00 00      	mov64 r3, 0x68
   ad558: 85 10 00 00 16 0c 02 00      	call 0x20c16
   ad560: 79 a1 b0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc50]
   ad568: 7b 1a b8 f9 00 00 00 00      	stxdw [r10 - 0x648], r1
   ad570: 79 a1 b8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc48]
   ad578: 7b 1a b0 f9 00 00 00 00      	stxdw [r10 - 0x650], r1
   ad580: 79 a1 c0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc40]
   ad588: 63 1a ac f9 00 00 00 00      	stxw [r10 - 0x654], r1
   ad590: 63 7a a8 f9 00 00 00 00      	stxw [r10 - 0x658], r7
   ad598: 79 a2 00 fa 00 00 00 00      	ldxdw r2, [r10 - 0x600]
   ad5a0: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   ad5a8: 15 01 ad 00 00 00 00 00      	jeq r1, 0x0, +0xad <.text+0xad9f8>
   ad5b0: 71 21 28 00 00 00 00 00      	ldxb r1, [r2 + 0x28]
   ad5b8: 15 01 ba 00 00 00 00 00      	jeq r1, 0x0, +0xba <.text+0xada70>
   ad5c0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ad5c8: 07 07 00 00 b0 fa ff ff      	add64 r7, -0x550
   ad5d0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ad5d8: 85 10 00 00 d3 c6 fe ff      	call -0x1392d
   ad5e0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ad5e8: 85 10 00 00 80 ea 01 00      	call 0x1ea80
   ad5f0: 7b 0a c0 f3 00 00 00 00      	stxdw [r10 - 0xc40], r0
   ad5f8: 79 a2 00 fa 00 00 00 00      	ldxdw r2, [r10 - 0x600]
   ad600: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ad608: 07 07 00 00 c0 fb ff ff      	add64 r7, -0x440
   ad610: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ad618: 85 10 00 00 cb c6 fe ff      	call -0x13935
   ad620: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad628: 07 01 00 00 a0 fb ff ff      	add64 r1, -0x460
   ad630: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ad638: 85 10 00 00 8f ea 01 00      	call 0x1ea8f
   ad640: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   ad648: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   ad650: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   ad660: 5d 21 b4 00 00 00 00 00      	jne r1, r2, +0xb4 <.text+0xadae8>
   ad668: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad670: 07 01 00 00 78 f9 ff ff      	add64 r1, -0x688
   ad678: 79 a2 c0 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc40]
   ad680: 85 10 00 00 be e6 01 00      	call 0x1e6be
   ad688: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad690: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   ad698: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ad6a0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ad6a8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ad6b0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xad5b0>
   ad6b8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ad6c0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ad6c8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ad6d0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ad6d8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ad6e0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ad6e8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xad5e8>
   ad6f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ad6f8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ad700: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ad708: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   ad710: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   ad718: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ad720: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ad728: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ad730: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xad630>
   ad738: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ad740: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ad748: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ad750: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ad758: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ad760: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ad768: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xad668>
   ad770: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ad778: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ad780: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ad788: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xad678>
   ad790: 05 00 bd 00 00 00 00 00      	ja +0xbd <.text+0xadc60>
   ad798: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad7a0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad7a8: 85 10 00 00 4e e6 01 00      	call 0x1e64e
   ad7b0: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ad7b8: 7b 1a 40 fa 00 00 00 00      	stxdw [r10 - 0x5c0], r1
   ad7c0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad7c8: 7b 1a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r1
   ad7d0: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ad7d8: 7b 1a 50 fa 00 00 00 00      	stxdw [r10 - 0x5b0], r1
   ad7e0: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ad7e8: 55 01 c1 00 00 00 00 00      	jne r1, 0x0, +0xc1 <.text+0xadcd8>
   ad7f0: 79 a1 50 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b0]
   ad7f8: 7b 1a 38 fa 00 00 00 00      	stxdw [r10 - 0x5c8], r1
   ad800: 79 a1 48 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b8]
   ad808: 7b 1a 30 fa 00 00 00 00      	stxdw [r10 - 0x5d0], r1
   ad810: 79 a1 40 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c0]
   ad818: 7b 1a 28 fa 00 00 00 00      	stxdw [r10 - 0x5d8], r1
   ad820: 79 a1 00 fa 00 00 00 00      	ldxdw r1, [r10 - 0x600]
   ad828: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ad830: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ad838: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   ad840: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   ad848: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ad850: 18 05 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1b683a
   ad860: 7b 5a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r5
   ad868: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   ad870: 07 05 00 00 b0 fa ff ff      	add64 r5, -0x550
   ad878: 7b 5a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r5
   ad880: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   ad888: 7b 4a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r4
   ad890: 7b 3a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r3
   ad898: 7b 2a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r2
   ad8a0: 7a 0a a8 fb 0d 00 00 00      	stdw [r10 - 0x458], 0xd
   ad8a8: 7a 0a b8 fb 20 00 00 00      	stdw [r10 - 0x448], 0x20
   ad8b0: 79 a4 f0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x710]
   ad8b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad8c0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad8c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ad8d0: 07 02 00 00 a0 fb ff ff      	add64 r2, -0x460
   ad8d8: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   ad8e0: 85 10 00 00 ba f4 01 00      	call 0x1f4ba
   ad8e8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ad8f0: 7b 1a 70 fa 00 00 00 00      	stxdw [r10 - 0x590], r1
   ad8f8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ad900: 7b 1a 68 fa 00 00 00 00      	stxdw [r10 - 0x598], r1
   ad908: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ad910: 7b 1a 60 fa 00 00 00 00      	stxdw [r10 - 0x5a0], r1
   ad918: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ad920: 7b 1a 58 fa 00 00 00 00      	stxdw [r10 - 0x5a8], r1
   ad928: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   ad930: 73 1a 7f fa 00 00 00 00      	stxb [r10 - 0x581], r1
   ad938: 73 18 01 00 00 00 00 00      	stxb [r8 + 0x1], r1
   ad940: 79 a1 08 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f8]
   ad948: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ad950: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ad958: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   ad960: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ad968: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   ad970: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ad978: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   ad980: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   ad988: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   ad990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad998: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ad9a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ad9a8: 07 02 00 00 58 fa ff ff      	add64 r2, -0x5a8
   ad9b0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ad9b8: 85 10 00 00 97 0b 02 00      	call 0x20b97
   ad9c0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ad9c8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ad9d0: 15 00 af 00 00 00 00 00      	jeq r0, 0x0, +0xaf <.text+0xade30>
   ad9d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ad9e0: 07 01 00 00 b0 f7 ff ff      	add64 r1, -0x850
   ad9e8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ad9f0: 85 10 00 00 25 e3 01 00      	call 0x1e325
   ad9f8: 79 a3 b8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x848]
   ada00: 79 a2 b0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x850]
   ada08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ada10: 07 01 00 00 a0 f7 ff ff      	add64 r1, -0x860
   ada18: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   ada28: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   ada30: 85 10 00 00 df a9 fe ff      	call -0x15621
   ada38: 79 a3 a8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x858]
   ada40: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   ada48: 79 a1 08 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f8]
   ada50: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ada58: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   ada60: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   ada68: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   ada70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ada78: 79 a7 58 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5a8]
   ada80: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   ada88: 79 a7 60 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5a0]
   ada90: 7b 7a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r7
   ada98: 79 a7 68 fa 00 00 00 00      	ldxdw r7, [r10 - 0x598]
   adaa0: 7b 7a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r7
   adaa8: 79 a7 70 fa 00 00 00 00      	ldxdw r7, [r10 - 0x590]
   adab0: 7b 7a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r7
   adab8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   adac0: 7b 0a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r0
   adac8: 7b 5a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r5
   adad0: 7b 4a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r4
   adad8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adae0: 07 01 00 00 90 f7 ff ff      	add64 r1, -0x870
   adae8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   adaf0: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   adaf8: 85 10 00 00 d7 dc 01 00      	call 0x1dcd7
   adb00: 79 a1 90 f7 00 00 00 00      	ldxdw r1, [r10 - 0x870]
   adb08: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   adb10: 05 00 63 00 00 00 00 00      	ja +0x63 <.text+0xadd10>
   adb18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adb20: 07 01 00 00 c0 f4 ff ff      	add64 r1, -0xb40
   adb28: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   adb30: 85 10 00 00 fd e2 01 00      	call 0x1e2fd
   adb38: 79 a3 c8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb38]
   adb40: 79 a2 c0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb40]
   adb48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adb50: 07 01 00 00 b0 f4 ff ff      	add64 r1, -0xb50
   adb58: 18 04 00 00 48 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5f48
   adb68: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   adb70: 85 10 00 00 b7 a9 fe ff      	call -0x15649
   adb78: 79 a1 b0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb50]
   adb80: 79 a2 b8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb48]
   adb88: 05 00 54 00 00 00 00 00      	ja +0x54 <.text+0xadd10>
   adb90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adb98: 07 01 00 00 e0 f4 ff ff      	add64 r1, -0xb20
   adba0: b7 02 00 00 d2 07 00 00      	mov64 r2, 0x7d2
   adba8: 85 10 00 00 ee e2 01 00      	call 0x1e2ee
   adbb0: 79 a3 e8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb18]
   adbb8: 79 a2 e0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb20]
   adbc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adbc8: 07 01 00 00 d0 f4 ff ff      	add64 r1, -0xb30
   adbd0: 18 04 00 00 48 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5f48
   adbe0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   adbe8: 85 10 00 00 a8 a9 fe ff      	call -0x15658
   adbf0: 79 a1 d0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb30]
   adbf8: 79 a2 d8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb28]
   adc00: 05 00 45 00 00 00 00 00      	ja +0x45 <.text+0xadd10>
   adc08: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   adc10: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   adc18: 7b 3a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r3
   adc20: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   adc28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adc30: 07 01 00 00 f0 f7 ff ff      	add64 r1, -0x810
   adc38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   adc40: 07 02 00 00 a0 fb ff ff      	add64 r2, -0x460
   adc48: 85 10 00 00 ed db 01 00      	call 0x1dbed
   adc50: 79 a1 f0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x810]
   adc58: 79 a2 f8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x808]
   adc60: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   adc68: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   adc70: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   adc78: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   adc80: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   adc88: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   adc90: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   adc98: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   adca0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xadba0>
   adca8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   adcb0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   adcb8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   adcc0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   adcc8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   adcd0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   adcd8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xadbd8>
   adce0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   adce8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   adcf0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   adcf8: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   add00: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   add08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   add10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   add18: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   add20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xadc20>
   add28: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   add30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   add38: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   add40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   add48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   add50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   add58: 55 02 1d 00 00 00 00 00      	jne r2, 0x0, +0x1d <.text+0xadd28>
   add60: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   add68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   add70: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   add78: 05 00 19 00 00 00 00 00      	ja +0x19 <.text+0xadd28>
   add80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   add88: 07 01 00 00 e0 f7 ff ff      	add64 r1, -0x820
   add90: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   add98: 85 10 00 00 b0 e2 01 00      	call 0x1e2b0
   adda0: 79 a3 e8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x818]
   adda8: 79 a2 e0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x820]
   addb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   addb8: 07 01 00 00 d0 f7 ff ff      	add64 r1, -0x830
   addc0: 18 04 00 00 48 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5f48
   addd0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   addd8: 85 10 00 00 6a a9 fe ff      	call -0x15696
   adde0: 79 a1 d0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x830]
   adde8: 79 a2 d8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x828]
   addf0: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0xadd10>
   addf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ade00: 07 01 00 00 c0 f7 ff ff      	add64 r1, -0x840
   ade08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ade10: 07 02 00 00 40 fa ff ff      	add64 r2, -0x5c0
   ade18: 85 10 00 00 b3 db 01 00      	call 0x1dbb3
   ade20: 79 a1 c0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x840]
   ade28: 79 a2 c8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x838]
   ade30: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   ade38: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   ade40: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   ade48: 79 a3 08 f4 00 00 00 00      	ldxdw r3, [r10 - 0xbf8]
   ade50: 79 a7 c8 f3 00 00 00 00      	ldxdw r7, [r10 - 0xc38]
   ade58: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   ade60: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ade68: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   ade70: 79 a2 00 f4 00 00 00 00      	ldxdw r2, [r10 - 0xc00]
   ade78: 79 a4 f0 f3 00 00 00 00      	ldxdw r4, [r10 - 0xc10]
   ade80: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xadd80>
   ade88: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   ade90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ade98: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   adea0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   adea8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   adeb0: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   adeb8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xaddb8>
   adec0: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   adec8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   aded0: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1
   aded8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   adee0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   adee8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   adef0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xaddf0>
   adef8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   adf00: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   adf08: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   adf10: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   adf18: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   adf20: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   adf28: 55 01 c7 fd 00 00 00 00      	jne r1, 0x0, -0x239 <.text+0xacc48>
   adf30: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   adf38: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   adf40: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   adf48: 05 00 c3 fd 00 00 00 00      	ja -0x23d <.text+0xacc48>
   adf50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adf58: 07 01 00 00 f0 f8 ff ff      	add64 r1, -0x710
   adf60: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   adf68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adf70: 07 01 00 00 7f fa ff ff      	add64 r1, -0x581
   adf78: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   adf80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adf88: 07 01 00 00 a8 f9 ff ff      	add64 r1, -0x658
   adf90: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   adf98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adfa0: 07 01 00 00 20 f9 ff ff      	add64 r1, -0x6e0
   adfa8: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   adfb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adfb8: 07 01 00 00 18 f9 ff ff      	add64 r1, -0x6e8
   adfc0: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   adfc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adfd0: 07 01 00 00 28 fa ff ff      	add64 r1, -0x5d8
   adfd8: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   adfe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   adfe8: 07 01 00 00 08 f9 ff ff      	add64 r1, -0x6f8
   adff0: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   adff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae000: 07 01 00 00 b0 fa ff ff      	add64 r1, -0x550
   ae008: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ae010: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   ae018: 85 10 00 00 6e 0b 00 00      	call 0xb6e
   ae020: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   ae028: 7b 1a c0 f3 00 00 00 00      	stxdw [r10 - 0xc40], r1
   ae030: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   ae038: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xadf28>
   ae040: 05 00 1f 01 00 00 00 00      	ja +0x11f <.text+0xae820>
   ae048: 79 a1 c0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc40]
   ae050: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae058: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   ae060: 15 01 1d 01 00 00 00 00      	jeq r1, 0x0, +0x11d <.text+0xae830>
   ae068: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ae070: 07 07 00 00 b0 fa ff ff      	add64 r7, -0x550
   ae078: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae080: 85 10 00 00 7e c5 fe ff      	call -0x13a82
   ae088: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae090: 85 10 00 00 2b e9 01 00      	call 0x1e92b
   ae098: 7b 0a b8 f3 00 00 00 00      	stxdw [r10 - 0xc48], r0
   ae0a0: 79 a1 c0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc40]
   ae0a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae0b0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ae0b8: 07 07 00 00 c0 fb ff ff      	add64 r7, -0x440
   ae0c0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae0c8: 85 10 00 00 75 c5 fe ff      	call -0x13a8b
   ae0d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae0d8: 07 01 00 00 a0 fb ff ff      	add64 r1, -0x460
   ae0e0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ae0e8: 85 10 00 00 39 e9 01 00      	call 0x1e939
   ae0f0: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   ae0f8: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   ae100: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   ae110: 5d 21 16 01 00 00 00 00      	jne r1, r2, +0x116 <.text+0xae8a8>
   ae118: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae120: 07 01 00 00 28 fa ff ff      	add64 r1, -0x5d8
   ae128: 79 a2 b8 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc48]
   ae130: 85 10 00 00 68 e5 01 00      	call 0x1e568
   ae138: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ae140: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   ae148: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ae150: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae158: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ae160: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae060>
   ae168: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ae170: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae178: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ae180: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae188: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae190: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ae198: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xae098>
   ae1a0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae1a8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae1b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ae1b8: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   ae1c0: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   ae1c8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ae1d0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae1d8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ae1e0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae0e0>
   ae1e8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ae1f0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae1f8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ae200: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae208: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae210: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ae218: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xae118>
   ae220: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae228: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae230: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ae238: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xae128>
   ae240: 05 00 1c 01 00 00 00 00      	ja +0x11c <.text+0xaea08>
   ae248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae250: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ae258: 85 10 00 00 f8 e4 01 00      	call 0x1e4f8
   ae260: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ae268: 7b 1a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r1
   ae270: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ae278: 7b 1a a0 fa 00 00 00 00      	stxdw [r10 - 0x560], r1
   ae280: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ae288: 7b 1a a8 fa 00 00 00 00      	stxdw [r10 - 0x558], r1
   ae290: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ae298: 55 01 20 01 00 00 00 00      	jne r1, 0x0, +0x120 <.text+0xaea80>
   ae2a0: 79 a1 a8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x558]
   ae2a8: 7b 1a 90 fa 00 00 00 00      	stxdw [r10 - 0x570], r1
   ae2b0: 79 a1 a0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x560]
   ae2b8: 7b 1a 88 fa 00 00 00 00      	stxdw [r10 - 0x578], r1
   ae2c0: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   ae2c8: 7b 1a 80 fa 00 00 00 00      	stxdw [r10 - 0x580], r1
   ae2d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae2d8: 07 01 00 00 28 f9 ff ff      	add64 r1, -0x6d8
   ae2e0: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   ae2e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae2f0: 07 01 00 00 20 f9 ff ff      	add64 r1, -0x6e0
   ae2f8: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   ae300: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae308: 07 01 00 00 a8 f9 ff ff      	add64 r1, -0x658
   ae310: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   ae318: 79 a1 c0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc40]
   ae320: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   ae328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae330: 07 01 00 00 18 f9 ff ff      	add64 r1, -0x6e8
   ae338: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   ae340: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae348: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   ae350: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   ae358: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae360: 07 01 00 00 10 f9 ff ff      	add64 r1, -0x6f0
   ae368: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   ae370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae378: 07 01 00 00 b0 fa ff ff      	add64 r1, -0x550
   ae380: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ae388: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   ae390: 85 10 00 00 27 0e 00 00      	call 0xe27
   ae398: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   ae3a0: 7b 1a b8 f3 00 00 00 00      	stxdw [r10 - 0xc48], r1
   ae3a8: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   ae3b0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xae2a0>
   ae3b8: 05 00 04 01 00 00 00 00      	ja +0x104 <.text+0xaeac0>
   ae3c0: 79 a1 b8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc48]
   ae3c8: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
   ae3d0: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   ae3d8: 15 01 02 01 00 00 00 00      	jeq r1, 0x0, +0x102 <.text+0xaead0>
   ae3e0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ae3e8: 07 07 00 00 b0 fa ff ff      	add64 r7, -0x550
   ae3f0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae3f8: 85 10 00 00 0f c5 fe ff      	call -0x13af1
   ae400: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae408: 85 10 00 00 bc e8 01 00      	call 0x1e8bc
   ae410: 7b 0a b0 f3 00 00 00 00      	stxdw [r10 - 0xc50], r0
   ae418: 79 a1 b8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc48]
   ae420: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
   ae428: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   ae430: 07 07 00 00 c0 fb ff ff      	add64 r7, -0x440
   ae438: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   ae440: 85 10 00 00 06 c5 fe ff      	call -0x13afa
   ae448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae450: 07 01 00 00 a0 fb ff ff      	add64 r1, -0x460
   ae458: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   ae460: 85 10 00 00 ca e8 01 00      	call 0x1e8ca
   ae468: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   ae470: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   ae478: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   ae488: 5d 21 fb 00 00 00 00 00      	jne r1, r2, +0xfb <.text+0xaeb48>
   ae490: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae498: 07 01 00 00 80 fa ff ff      	add64 r1, -0x580
   ae4a0: 79 a2 b0 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc50]
   ae4a8: 85 10 00 00 f9 e4 01 00      	call 0x1e4f9
   ae4b0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ae4b8: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   ae4c0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ae4c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae4d0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ae4d8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae3d8>
   ae4e0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ae4e8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae4f0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ae4f8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae500: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae508: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ae510: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xae410>
   ae518: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae520: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae528: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ae530: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   ae538: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   ae540: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ae548: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae550: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   ae558: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae458>
   ae560: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   ae568: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   ae570: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   ae578: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae580: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae588: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   ae590: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xae490>
   ae598: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae5a0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   ae5a8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   ae5b0: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xae4a0>
   ae5b8: 05 00 01 01 00 00 00 00      	ja +0x101 <.text+0xaeca8>
   ae5c0: 79 a4 f0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x710]
   ae5c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae5d0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ae5d8: 18 02 00 00 48 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf48
   ae5e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ae5f0: 85 10 00 00 18 f3 01 00      	call 0x1f318
   ae5f8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ae600: 7b 1a f8 fa 00 00 00 00      	stxdw [r10 - 0x508], r1
   ae608: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ae610: 7b 1a f0 fa 00 00 00 00      	stxdw [r10 - 0x510], r1
   ae618: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ae620: 7b 1a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r1
   ae628: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ae630: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   ae638: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   ae640: 73 18 00 00 00 00 00 00      	stxb [r8 + 0x0], r1
   ae648: 79 a1 00 f9 00 00 00 00      	ldxdw r1, [r10 - 0x700]
   ae650: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ae658: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ae660: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   ae668: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae670: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   ae678: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ae680: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   ae688: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   ae690: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   ae698: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae6a0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ae6a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ae6b0: 07 02 00 00 e0 fa ff ff      	add64 r2, -0x520
   ae6b8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ae6c0: 85 10 00 00 f6 09 02 00      	call 0x209f6
   ae6c8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ae6d0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ae6d8: 55 00 ec 00 00 00 00 00      	jne r0, 0x0, +0xec <.text+0xaed20>
   ae6e0: 79 a4 f0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x710]
   ae6e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae6f0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ae6f8: 18 02 00 00 10 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf10
   ae708: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ae710: 85 10 00 00 f4 f2 01 00      	call 0x1f2f4
   ae718: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   ae720: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   ae728: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   ae730: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   ae738: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   ae740: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   ae748: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   ae750: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   ae758: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   ae760: 73 18 02 00 00 00 00 00      	stxb [r8 + 0x2], r1
   ae768: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ae770: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ae778: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ae780: 7b 2a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r2
   ae788: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ae790: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   ae798: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ae7a0: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   ae7a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ae7b0: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   ae7b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae7c0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   ae7c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ae7d0: 07 02 00 00 00 fb ff ff      	add64 r2, -0x500
   ae7d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ae7e0: 85 10 00 00 d2 09 02 00      	call 0x209d2
   ae7e8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ae7f0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ae7f8: 15 00 f0 00 00 00 00 00      	jeq r0, 0x0, +0xf0 <.text+0xaee60>
   ae800: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae808: 07 01 00 00 e0 f6 ff ff      	add64 r1, -0x920
   ae810: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ae818: 85 10 00 00 60 e1 01 00      	call 0x1e160
   ae820: 79 a3 e8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x918]
   ae828: 79 a2 e0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x920]
   ae830: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae838: 07 01 00 00 d0 f6 ff ff      	add64 r1, -0x930
   ae840: 18 04 00 00 26 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7326
   ae850: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   ae858: 85 10 00 00 1a a8 fe ff      	call -0x157e6
   ae860: 79 a3 d8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x928]
   ae868: 79 a2 d0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x930]
   ae870: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ae878: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ae880: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   ae888: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   ae890: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   ae898: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   ae8a0: 79 a7 00 fb 00 00 00 00      	ldxdw r7, [r10 - 0x500]
   ae8a8: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   ae8b0: 79 a7 08 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4f8]
   ae8b8: 7b 7a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r7
   ae8c0: 79 a7 10 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4f0]
   ae8c8: 7b 7a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r7
   ae8d0: 79 a7 18 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4e8]
   ae8d8: 7b 7a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r7
   ae8e0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   ae8e8: 7b 0a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r0
   ae8f0: 7b 5a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r5
   ae8f8: 7b 4a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r4
   ae900: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae908: 07 01 00 00 c0 f6 ff ff      	add64 r1, -0x940
   ae910: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ae918: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   ae920: 85 10 00 00 12 db 01 00      	call 0x1db12
   ae928: 79 a1 c0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x940]
   ae930: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   ae938: 05 00 9e fe 00 00 00 00      	ja -0x162 <.text+0xadd10>
   ae940: 79 a2 c0 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc40]
   ae948: 05 00 9c fe 00 00 00 00      	ja -0x164 <.text+0xadd10>
   ae950: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae958: 07 01 00 00 00 f5 ff ff      	add64 r1, -0xb00
   ae960: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   ae968: 85 10 00 00 36 e1 01 00      	call 0x1e136
   ae970: 79 a3 08 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf8]
   ae978: 79 a2 00 f5 00 00 00 00      	ldxdw r2, [r10 - 0xb00]
   ae980: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae988: 07 01 00 00 f0 f4 ff ff      	add64 r1, -0xb10
   ae990: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   ae9a0: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   ae9a8: 85 10 00 00 f0 a7 fe ff      	call -0x15810
   ae9b0: 79 a1 f0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb10]
   ae9b8: 79 a2 f8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb08]
   ae9c0: 05 00 8d fe 00 00 00 00      	ja -0x173 <.text+0xadd10>
   ae9c8: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   ae9d0: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   ae9d8: 7b 3a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r3
   ae9e0: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   ae9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ae9f0: 07 01 00 00 80 f7 ff ff      	add64 r1, -0x880
   ae9f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   aea00: 07 02 00 00 a0 fb ff ff      	add64 r2, -0x460
   aea08: 85 10 00 00 35 da 01 00      	call 0x1da35
   aea10: 79 a1 80 f7 00 00 00 00      	ldxdw r1, [r10 - 0x880]
   aea18: 79 a2 88 f7 00 00 00 00      	ldxdw r2, [r10 - 0x878]
   aea20: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   aea28: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   aea30: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   aea38: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   aea40: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   aea48: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   aea50: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aea58: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   aea60: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae960>
   aea68: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   aea70: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aea78: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   aea80: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   aea88: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aea90: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   aea98: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xae998>
   aeaa0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   aeaa8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aeab0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   aeab8: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   aeac0: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   aeac8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   aead0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aead8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   aeae0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xae9e0>
   aeae8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   aeaf0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aeaf8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   aeb00: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   aeb08: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aeb10: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   aeb18: 55 02 65 fe 00 00 00 00      	jne r2, 0x0, -0x19b <.text+0xadd28>
   aeb20: 05 00 47 fe 00 00 00 00      	ja -0x1b9 <.text+0xadc40>
   aeb28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aeb30: 07 01 00 00 70 f7 ff ff      	add64 r1, -0x890
   aeb38: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   aeb40: 85 10 00 00 fb e0 01 00      	call 0x1e0fb
   aeb48: 79 a3 78 f7 00 00 00 00      	ldxdw r3, [r10 - 0x888]
   aeb50: 79 a2 70 f7 00 00 00 00      	ldxdw r2, [r10 - 0x890]
   aeb58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aeb60: 07 01 00 00 60 f7 ff ff      	add64 r1, -0x8a0
   aeb68: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   aeb78: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   aeb80: 85 10 00 00 b5 a7 fe ff      	call -0x1584b
   aeb88: 79 a1 60 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8a0]
   aeb90: 79 a2 68 f7 00 00 00 00      	ldxdw r2, [r10 - 0x898]
   aeb98: 05 00 52 fe 00 00 00 00      	ja -0x1ae <.text+0xadd10>
   aeba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aeba8: 07 01 00 00 50 f7 ff ff      	add64 r1, -0x8b0
   aebb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   aebb8: 07 02 00 00 98 fa ff ff      	add64 r2, -0x568
   aebc0: 85 10 00 00 fe d9 01 00      	call 0x1d9fe
   aebc8: 79 a1 50 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b0]
   aebd0: 79 a2 58 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8a8]
   aebd8: 05 00 4a fe 00 00 00 00      	ja -0x1b6 <.text+0xadd10>
   aebe0: 79 a2 b8 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc48]
   aebe8: 05 00 48 fe 00 00 00 00      	ja -0x1b8 <.text+0xadd10>
   aebf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aebf8: 07 01 00 00 20 f5 ff ff      	add64 r1, -0xae0
   aec00: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   aec08: 85 10 00 00 e2 e0 01 00      	call 0x1e0e2
   aec10: 79 a3 28 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad8]
   aec18: 79 a2 20 f5 00 00 00 00      	ldxdw r2, [r10 - 0xae0]
   aec20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aec28: 07 01 00 00 10 f5 ff ff      	add64 r1, -0xaf0
   aec30: 18 04 00 00 11 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7511
   aec40: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   aec48: 85 10 00 00 9c a7 fe ff      	call -0x15864
   aec50: 79 a1 10 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf0]
   aec58: 79 a2 18 f5 00 00 00 00      	ldxdw r2, [r10 - 0xae8]
   aec60: 05 00 39 fe 00 00 00 00      	ja -0x1c7 <.text+0xadd10>
   aec68: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   aec70: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   aec78: 7b 3a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r3
   aec80: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   aec88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aec90: 07 01 00 00 40 f7 ff ff      	add64 r1, -0x8c0
   aec98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   aeca0: 07 02 00 00 a0 fb ff ff      	add64 r2, -0x460
   aeca8: 85 10 00 00 e1 d9 01 00      	call 0x1d9e1
   aecb0: 79 a1 40 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8c0]
   aecb8: 79 a2 48 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8b8]
   aecc0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   aecc8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   aecd0: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   aecd8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   aece0: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   aece8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   aecf0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aecf8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   aed00: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xaec00>
   aed08: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   aed10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aed18: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   aed20: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   aed28: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aed30: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   aed38: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xaec38>
   aed40: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   aed48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aed50: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   aed58: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   aed60: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   aed68: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   aed70: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aed78: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   aed80: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xaec80>
   aed88: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   aed90: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   aed98: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   aeda0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   aeda8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   aedb0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   aedb8: 55 02 11 fe 00 00 00 00      	jne r2, 0x0, -0x1ef <.text+0xadd28>
   aedc0: 05 00 f3 fd 00 00 00 00      	ja -0x20d <.text+0xadc40>
   aedc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aedd0: 07 01 00 00 30 f7 ff ff      	add64 r1, -0x8d0
   aedd8: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   aede0: 85 10 00 00 a7 e0 01 00      	call 0x1e0a7
   aede8: 79 a3 38 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8c8]
   aedf0: 79 a2 30 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d0]
   aedf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aee00: 07 01 00 00 20 f7 ff ff      	add64 r1, -0x8e0
   aee08: 18 04 00 00 11 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7511
   aee18: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   aee20: 85 10 00 00 61 a7 fe ff      	call -0x1589f
   aee28: 79 a1 20 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8e0]
   aee30: 79 a2 28 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d8]
   aee38: 05 00 fe fd 00 00 00 00      	ja -0x202 <.text+0xadd10>
   aee40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aee48: 07 01 00 00 10 f7 ff ff      	add64 r1, -0x8f0
   aee50: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   aee58: 85 10 00 00 98 e0 01 00      	call 0x1e098
   aee60: 79 a3 18 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8e8]
   aee68: 79 a2 10 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8f0]
   aee70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aee78: 07 01 00 00 00 f7 ff ff      	add64 r1, -0x900
   aee80: 18 04 00 00 90 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7590
   aee90: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   aee98: 85 10 00 00 52 a7 fe ff      	call -0x158ae
   aeea0: 79 a3 08 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8f8]
   aeea8: 79 a2 00 f7 00 00 00 00      	ldxdw r2, [r10 - 0x900]
   aeeb0: 79 a1 00 f9 00 00 00 00      	ldxdw r1, [r10 - 0x700]
   aeeb8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   aeec0: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   aeec8: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   aeed0: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   aeed8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   aeee0: 79 a7 e0 fa 00 00 00 00      	ldxdw r7, [r10 - 0x520]
   aeee8: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   aeef0: 79 a7 e8 fa 00 00 00 00      	ldxdw r7, [r10 - 0x518]
   aeef8: 7b 7a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r7
   aef00: 79 a7 f0 fa 00 00 00 00      	ldxdw r7, [r10 - 0x510]
   aef08: 7b 7a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r7
   aef10: 79 a7 f8 fa 00 00 00 00      	ldxdw r7, [r10 - 0x508]
   aef18: 7b 7a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r7
   aef20: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   aef28: 7b 0a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r0
   aef30: 7b 5a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r5
   aef38: 7b 4a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r4
   aef40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aef48: 07 01 00 00 f0 f6 ff ff      	add64 r1, -0x910
   aef50: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   aef58: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   aef60: 85 10 00 00 4a da 01 00      	call 0x1da4a
   aef68: 79 a1 f0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x910]
   aef70: 79 a2 f8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x908]
   aef78: 05 00 d6 fd 00 00 00 00      	ja -0x22a <.text+0xadd10>
   aef80: 79 a1 18 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e8]
   aef88: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   aef90: 15 01 6d 00 00 00 00 00      	jeq r1, 0x0, +0x6d <.text+0xaf1e0>
   aef98: 79 a1 28 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbd8]
   aefa0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   aefa8: 15 01 a3 00 00 00 00 00      	jeq r1, 0x0, +0xa3 <.text+0xaf3a8>
   aefb0: 79 a1 28 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbd8]
   aefb8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   aefc0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   aefc8: 7b 2a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r2
   aefd0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   aefd8: 7b 2a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r2
   aefe0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   aefe8: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   aeff0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   aeff8: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   af000: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af008: 07 01 00 00 b0 fa ff ff      	add64 r1, -0x550
   af010: 18 02 00 00 a7 7a 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b7aa7
   af020: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   af028: 85 10 00 00 c9 08 02 00      	call 0x208c9
   af030: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   af038: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   af040: 55 00 66 00 00 00 00 00      	jne r0, 0x0, +0x66 <.text+0xaf258>
   af048: 18 01 00 00 4e 03 45 59 00 00 00 00 80 3d 65 a3      	lddw r1, -0x5c9ac27fa6bafcb2
   af058: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   af060: 18 01 00 00 5a d4 a0 67 00 00 00 00 16 60 67 4c      	lddw r1, 0x4c67601667a0d45a
   af070: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   af078: 18 01 00 00 a6 ea b0 a7 00 00 00 00 29 54 91 85      	lddw r1, -0x7a6eabd6584f155a
   af088: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   af090: 18 01 00 00 05 2a e5 d7 00 00 00 00 a7 da a7 24      	lddw r1, 0x24a7daa7d7e52a05
   af0a0: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   af0a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af0b0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af0b8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af0c0: 07 04 00 00 b0 fa ff ff      	add64 r4, -0x550
   af0c8: 18 02 00 00 58 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf58
   af0d8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   af0e0: 85 10 00 00 ba f1 01 00      	call 0x1f1ba
   af0e8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   af0f0: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   af0f8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   af100: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   af108: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   af110: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   af118: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   af120: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   af128: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   af130: 73 18 03 00 00 00 00 00      	stxb [r8 + 0x3], r1
   af138: 79 a1 20 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbe0]
   af140: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   af148: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   af150: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af158: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   af160: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af168: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   af170: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af178: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   af180: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af190: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af198: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af1a0: 07 02 00 00 20 fb ff ff      	add64 r2, -0x4e0
   af1a8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   af1b0: 85 10 00 00 98 08 02 00      	call 0x20898
   af1b8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   af1c0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   af1c8: 15 00 6e 00 00 00 00 00      	jeq r0, 0x0, +0x6e <.text+0xaf420>
   af1d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af1d8: 07 01 00 00 80 f6 ff ff      	add64 r1, -0x980
   af1e0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   af1e8: 85 10 00 00 26 e0 01 00      	call 0x1e026
   af1f0: 79 a3 88 f6 00 00 00 00      	ldxdw r3, [r10 - 0x978]
   af1f8: 79 a2 80 f6 00 00 00 00      	ldxdw r2, [r10 - 0x980]
   af200: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af208: 07 01 00 00 70 f6 ff ff      	add64 r1, -0x990
   af210: 18 04 00 00 83 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7583
   af220: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   af228: 85 10 00 00 e0 a6 fe ff      	call -0x15920
   af230: 79 a3 78 f6 00 00 00 00      	ldxdw r3, [r10 - 0x988]
   af238: 79 a2 70 f6 00 00 00 00      	ldxdw r2, [r10 - 0x990]
   af240: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   af248: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af250: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   af258: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af260: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   af268: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af270: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   af278: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af280: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   af288: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   af290: 79 a1 28 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d8]
   af298: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   af2a0: 79 a1 30 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d0]
   af2a8: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   af2b0: 79 a1 38 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c8]
   af2b8: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   af2c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af2c8: 07 01 00 00 60 f6 ff ff      	add64 r1, -0x9a0
   af2d0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af2d8: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   af2e0: 85 10 00 00 da d9 01 00      	call 0x1d9da
   af2e8: 79 a1 60 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9a0]
   af2f0: 79 a2 68 f6 00 00 00 00      	ldxdw r2, [r10 - 0x998]
   af2f8: 05 00 66 fd 00 00 00 00      	ja -0x29a <.text+0xadd10>
   af300: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af308: 07 01 00 00 40 f5 ff ff      	add64 r1, -0xac0
   af310: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   af318: 85 10 00 00 00 e0 01 00      	call 0x1e000
   af320: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   af328: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   af330: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af338: 07 01 00 00 30 f5 ff ff      	add64 r1, -0xad0
   af340: 18 04 00 00 68 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5e68
   af350: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   af358: 85 10 00 00 ba a6 fe ff      	call -0x15946
   af360: 79 a1 30 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad0]
   af368: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   af370: 05 00 57 fd 00 00 00 00      	ja -0x2a9 <.text+0xadd10>
   af378: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af380: 07 01 00 00 b0 f6 ff ff      	add64 r1, -0x950
   af388: b7 02 00 00 dc 07 00 00      	mov64 r2, 0x7dc
   af390: 85 10 00 00 f1 df 01 00      	call 0x1dff1
   af398: 79 a3 b8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x948]
   af3a0: 79 a2 b0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x950]
   af3a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af3b0: 07 01 00 00 a0 f6 ff ff      	add64 r1, -0x960
   af3b8: 18 04 00 00 29 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7529
   af3c8: b7 05 00 00 11 00 00 00      	mov64 r5, 0x11
   af3d0: 85 10 00 00 ab a6 fe ff      	call -0x15955
   af3d8: 79 a3 a8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x958]
   af3e0: 79 a2 a0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x960]
   af3e8: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   af3f0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af3f8: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   af400: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af408: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   af410: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af418: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   af420: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af428: 18 01 00 00 05 2a e5 d7 00 00 00 00 a7 da a7 24      	lddw r1, 0x24a7daa7d7e52a05
   af438: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   af440: 18 01 00 00 a6 ea b0 a7 00 00 00 00 29 54 91 85      	lddw r1, -0x7a6eabd6584f155a
   af450: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   af458: 18 01 00 00 5a d4 a0 67 00 00 00 00 16 60 67 4c      	lddw r1, 0x4c67601667a0d45a
   af468: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   af470: 18 01 00 00 4e 03 45 59 00 00 00 00 80 3d 65 a3      	lddw r1, -0x5c9ac27fa6bafcb2
   af480: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   af488: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af490: 07 01 00 00 90 f6 ff ff      	add64 r1, -0x970
   af498: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af4a0: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   af4a8: 85 10 00 00 a1 d9 01 00      	call 0x1d9a1
   af4b0: 79 a1 90 f6 00 00 00 00      	ldxdw r1, [r10 - 0x970]
   af4b8: 79 a2 98 f6 00 00 00 00      	ldxdw r2, [r10 - 0x968]
   af4c0: 05 00 2d fd 00 00 00 00      	ja -0x2d3 <.text+0xadd10>
   af4c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af4d0: 07 01 00 00 60 f5 ff ff      	add64 r1, -0xaa0
   af4d8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   af4e0: 85 10 00 00 c7 df 01 00      	call 0x1dfc7
   af4e8: 79 a3 68 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa98]
   af4f0: 79 a2 60 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa0]
   af4f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af500: 07 01 00 00 50 f5 ff ff      	add64 r1, -0xab0
   af508: 18 04 00 00 29 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7529
   af518: b7 05 00 00 11 00 00 00      	mov64 r5, 0x11
   af520: 85 10 00 00 81 a6 fe ff      	call -0x1597f
   af528: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   af530: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   af538: 05 00 1e fd 00 00 00 00      	ja -0x2e2 <.text+0xadd10>
   af540: 18 01 00 00 4e 03 45 59 00 00 00 00 80 3d 65 a3      	lddw r1, -0x5c9ac27fa6bafcb2
   af550: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   af558: 18 01 00 00 5a d4 a0 67 00 00 00 00 16 60 67 4c      	lddw r1, 0x4c67601667a0d45a
   af568: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   af570: 18 01 00 00 a6 ea b0 a7 00 00 00 00 29 54 91 85      	lddw r1, -0x7a6eabd6584f155a
   af580: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   af588: 18 01 00 00 05 2a e5 d7 00 00 00 00 a7 da a7 24      	lddw r1, 0x24a7daa7d7e52a05
   af598: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   af5a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af5a8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af5b0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af5b8: 07 04 00 00 b0 fa ff ff      	add64 r4, -0x550
   af5c0: 18 02 00 00 68 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf68
   af5d0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   af5d8: 85 10 00 00 1b f1 01 00      	call 0x1f11b
   af5e0: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   af5e8: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   af5f0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   af5f8: 7b 1a 50 fb 00 00 00 00      	stxdw [r10 - 0x4b0], r1
   af600: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   af608: 7b 1a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r1
   af610: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   af618: 7b 1a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r1
   af620: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   af628: 73 18 04 00 00 00 00 00      	stxb [r8 + 0x4], r1
   af630: 79 a1 18 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbe8]
   af638: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   af640: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   af648: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af650: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   af658: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af660: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   af668: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af670: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   af678: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af688: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af690: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af698: 07 02 00 00 40 fb ff ff      	add64 r2, -0x4c0
   af6a0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   af6a8: 85 10 00 00 f9 07 02 00      	call 0x207f9
   af6b0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   af6b8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   af6c0: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <.text+0xaf6d8>
   af6c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af6d0: 07 01 00 00 50 f6 ff ff      	add64 r1, -0x9b0
   af6d8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   af6e0: 85 10 00 00 87 df 01 00      	call 0x1df87
   af6e8: 79 a3 58 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9a8]
   af6f0: 79 a2 50 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9b0]
   af6f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af700: 07 01 00 00 40 f6 ff ff      	add64 r1, -0x9c0
   af708: 18 04 00 00 50 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7550
   af718: b7 05 00 00 09 00 00 00      	mov64 r5, 0x9
   af720: 85 10 00 00 41 a6 fe ff      	call -0x159bf
   af728: 79 a3 48 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9b8]
   af730: 79 a2 40 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9c0]
   af738: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   af740: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af748: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   af750: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af758: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   af760: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af768: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   af770: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af778: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   af780: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   af788: 79 a1 48 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b8]
   af790: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   af798: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   af7a0: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   af7a8: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   af7b0: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   af7b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af7c0: 07 01 00 00 30 f6 ff ff      	add64 r1, -0x9d0
   af7c8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af7d0: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   af7d8: 85 10 00 00 3b d9 01 00      	call 0x1d93b
   af7e0: 79 a1 30 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9d0]
   af7e8: 79 a2 38 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9c8]
   af7f0: 05 00 c7 fc 00 00 00 00      	ja -0x339 <.text+0xadd10>
   af7f8: 79 a1 18 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbe8]
   af800: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   af808: 15 01 69 00 00 00 00 00      	jeq r1, 0x0, +0x69 <.text+0xafa38>
   af810: 79 a1 00 fa 00 00 00 00      	ldxdw r1, [r10 - 0x600]
   af818: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af820: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   af828: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   af830: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   af838: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af840: 18 05 00 00 59 75 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1b7559
   af850: 7b 5a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r5
   af858: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   af860: 07 05 00 00 a0 fb ff ff      	add64 r5, -0x460
   af868: 7b 5a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r5
   af870: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   af878: 7b 4a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r4
   af880: 7b 3a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r3
   af888: 7b 2a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r2
   af890: 7a 0a 88 fb 0c 00 00 00      	stdw [r10 - 0x478], 0xc
   af898: 7a 0a 98 fb 20 00 00 00      	stdw [r10 - 0x468], 0x20
   af8a0: 18 01 00 00 4e 03 45 59 00 00 00 00 80 3d 65 a3      	lddw r1, -0x5c9ac27fa6bafcb2
   af8b0: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   af8b8: 18 01 00 00 5a d4 a0 67 00 00 00 00 16 60 67 4c      	lddw r1, 0x4c67601667a0d45a
   af8c8: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   af8d0: 18 01 00 00 a6 ea b0 a7 00 00 00 00 29 54 91 85      	lddw r1, -0x7a6eabd6584f155a
   af8e0: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   af8e8: 18 01 00 00 05 2a e5 d7 00 00 00 00 a7 da a7 24      	lddw r1, 0x24a7daa7d7e52a05
   af8f8: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   af900: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af908: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af910: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af918: 07 02 00 00 80 fb ff ff      	add64 r2, -0x480
   af920: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   af928: 07 04 00 00 b0 fa ff ff      	add64 r4, -0x550
   af930: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   af938: 85 10 00 00 af f0 01 00      	call 0x1f0af
   af940: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   af948: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   af950: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   af958: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   af960: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   af968: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   af970: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   af978: 7b 1a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r1
   af980: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   af988: 73 18 05 00 00 00 00 00      	stxb [r8 + 0x5], r1
   af990: 79 a1 10 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbf0]
   af998: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   af9a0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   af9a8: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   af9b0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   af9b8: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   af9c0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   af9c8: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   af9d0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   af9d8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   af9e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af9e8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   af9f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af9f8: 07 02 00 00 60 fb ff ff      	add64 r2, -0x4a0
   afa00: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   afa08: 85 10 00 00 8d 07 02 00      	call 0x2078d
   afa10: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   afa18: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   afa20: 15 00 35 00 00 00 00 00      	jeq r0, 0x0, +0x35 <.text+0xafab0>
   afa28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afa30: 07 01 00 00 20 f6 ff ff      	add64 r1, -0x9e0
   afa38: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   afa40: 85 10 00 00 1b df 01 00      	call 0x1df1b
   afa48: 79 a3 28 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9d8]
   afa50: 79 a2 20 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9e0]
   afa58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afa60: 07 01 00 00 10 f6 ff ff      	add64 r1, -0x9f0
   afa68: 18 04 00 00 65 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7565
   afa78: b7 05 00 00 0c 00 00 00      	mov64 r5, 0xc
   afa80: 85 10 00 00 d5 a5 fe ff      	call -0x15a2b
   afa88: 79 a3 18 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9e8]
   afa90: 79 a2 10 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f0]
   afa98: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   afaa0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   afaa8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   afab0: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   afab8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   afac0: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   afac8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   afad0: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   afad8: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   afae0: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   afae8: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   afaf0: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   afaf8: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   afb00: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   afb08: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   afb10: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   afb18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afb20: 07 01 00 00 00 f6 ff ff      	add64 r1, -0xa00
   afb28: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   afb30: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   afb38: 85 10 00 00 cf d8 01 00      	call 0x1d8cf
   afb40: 79 a1 00 f6 00 00 00 00      	ldxdw r1, [r10 - 0xa00]
   afb48: 79 a2 08 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f8]
   afb50: 05 00 5b fc 00 00 00 00      	ja -0x3a5 <.text+0xadd10>
   afb58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afb60: 07 01 00 00 80 f5 ff ff      	add64 r1, -0xa80
   afb68: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   afb70: 85 10 00 00 f5 de 01 00      	call 0x1def5
   afb78: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   afb80: 79 a2 80 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa80]
   afb88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afb90: 07 01 00 00 70 f5 ff ff      	add64 r1, -0xa90
   afb98: 18 04 00 00 50 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7550
   afba8: b7 05 00 00 09 00 00 00      	mov64 r5, 0x9
   afbb0: 85 10 00 00 af a5 fe ff      	call -0x15a51
   afbb8: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   afbc0: 79 a2 78 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa88]
   afbc8: 05 00 4c fc 00 00 00 00      	ja -0x3b4 <.text+0xadd10>
   afbd0: 79 a1 10 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbf0]
   afbd8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   afbe0: 15 01 69 00 00 00 00 00      	jeq r1, 0x0, +0x69 <.text+0xafe10>
   afbe8: 79 a1 f8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc08]
   afbf0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   afbf8: 15 01 9c 00 00 00 00 00      	jeq r1, 0x0, +0x9c <.text+0xaffc0>
   afc00: 79 a4 f0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x710]
   afc08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afc10: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   afc18: 18 02 00 00 d8 db 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdbd8
   afc28: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   afc30: 85 10 00 00 50 f0 01 00      	call 0x1f050
   afc38: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   afc40: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   afc48: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   afc50: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   afc58: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   afc60: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   afc68: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   afc70: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   afc78: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   afc80: 73 18 06 00 00 00 00 00      	stxb [r8 + 0x6], r1
   afc88: 79 a2 e8 f3 00 00 00 00      	ldxdw r2, [r10 - 0xc18]
   afc90: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   afc98: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   afca0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   afca8: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   afcb0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   afcb8: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   afcc0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   afcc8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   afcd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   afcd8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   afce0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   afce8: 07 02 00 00 b0 fa ff ff      	add64 r2, -0x550
   afcf0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   afcf8: 85 10 00 00 2f 07 02 00      	call 0x2072f
   afd00: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   afd08: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   afd10: 55 00 52 00 00 00 00 00      	jne r0, 0x0, +0x52 <.text+0xafe88>
   afd18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   afd20: 07 02 00 00 a8 f9 ff ff      	add64 r2, -0x658
   afd28: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   afd30: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   afd38: 85 10 00 00 1a 07 02 00      	call 0x2071a
   afd40: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   afd48: 79 a2 28 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d8]
   afd50: 79 a3 20 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e0]
   afd58: 79 a4 18 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6e8]
   afd60: 79 a5 00 f9 00 00 00 00      	ldxdw r5, [r10 - 0x700]
   afd68: 69 a0 50 f9 00 00 00 00      	ldxh r0, [r10 - 0x6b0]
   afd70: 6b 06 a8 00 00 00 00 00      	stxh [r6 + 0xa8], r0
   afd78: 79 a0 48 f9 00 00 00 00      	ldxdw r0, [r10 - 0x6b8]
   afd80: 7b 06 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r0
   afd88: 79 a0 40 f9 00 00 00 00      	ldxdw r0, [r10 - 0x6c0]
   afd90: 7b 06 98 00 00 00 00 00      	stxdw [r6 + 0x98], r0
   afd98: 71 a0 3c f9 00 00 00 00      	ldxb r0, [r10 - 0x6c4]
   afda0: 73 06 af 00 00 00 00 00      	stxb [r6 + 0xaf], r0
   afda8: 61 a0 38 f9 00 00 00 00      	ldxw r0, [r10 - 0x6c8]
   afdb0: 63 06 ab 00 00 00 00 00      	stxw [r6 + 0xab], r0
   afdb8: 79 a0 68 f9 00 00 00 00      	ldxdw r0, [r10 - 0x698]
   afdc0: 7b 06 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r0
   afdc8: 79 a0 60 f9 00 00 00 00      	ldxdw r0, [r10 - 0x6a0]
   afdd0: 7b 06 c8 00 00 00 00 00      	stxdw [r6 + 0xc8], r0
   afdd8: 69 a0 70 f9 00 00 00 00      	ldxh r0, [r10 - 0x690]
   afde0: 6b 06 d8 00 00 00 00 00      	stxh [r6 + 0xd8], r0
   afde8: 71 a0 5c f9 00 00 00 00      	ldxb r0, [r10 - 0x6a4]
   afdf0: 61 a7 58 f9 00 00 00 00      	ldxw r7, [r10 - 0x6a8]
   afdf8: 79 a8 e8 f3 00 00 00 00      	ldxdw r8, [r10 - 0xc18]
   afe00: 7b 86 80 00 00 00 00 00      	stxdw [r6 + 0x80], r8
   afe08: 79 a8 00 f4 00 00 00 00      	ldxdw r8, [r10 - 0xc00]
   afe10: 7b 86 88 00 00 00 00 00      	stxdw [r6 + 0x88], r8
   afe18: 79 a8 08 f4 00 00 00 00      	ldxdw r8, [r10 - 0xbf8]
   afe20: 7b 86 90 00 00 00 00 00      	stxdw [r6 + 0x90], r8
   afe28: 79 a8 d0 f3 00 00 00 00      	ldxdw r8, [r10 - 0xc30]
   afe30: 7b 86 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r8
   afe38: 79 a8 c8 f3 00 00 00 00      	ldxdw r8, [r10 - 0xc38]
   afe40: 7b 86 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r8
   afe48: 79 a8 f0 f3 00 00 00 00      	ldxdw r8, [r10 - 0xc10]
   afe50: 7b 86 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r8
   afe58: 7b 56 e0 00 00 00 00 00      	stxdw [r6 + 0xe0], r5
   afe60: 79 a5 c0 f3 00 00 00 00      	ldxdw r5, [r10 - 0xc40]
   afe68: 7b 56 e8 00 00 00 00 00      	stxdw [r6 + 0xe8], r5
   afe70: 79 a5 b8 f3 00 00 00 00      	ldxdw r5, [r10 - 0xc48]
   afe78: 7b 56 f0 00 00 00 00 00      	stxdw [r6 + 0xf0], r5
   afe80: 7b 96 f8 00 00 00 00 00      	stxdw [r6 + 0xf8], r9
   afe88: 7b 46 00 01 00 00 00 00      	stxdw [r6 + 0x100], r4
   afe90: 7b 36 08 01 00 00 00 00      	stxdw [r6 + 0x108], r3
   afe98: 7b 26 10 01 00 00 00 00      	stxdw [r6 + 0x110], r2
   afea0: 7b 16 18 01 00 00 00 00      	stxdw [r6 + 0x118], r1
   afea8: 79 a1 28 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbd8]
   afeb0: 7b 16 20 01 00 00 00 00      	stxdw [r6 + 0x120], r1
   afeb8: 79 a1 20 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbe0]
   afec0: 7b 16 28 01 00 00 00 00      	stxdw [r6 + 0x128], r1
   afec8: 79 a1 18 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbe8]
   afed0: 7b 16 30 01 00 00 00 00      	stxdw [r6 + 0x130], r1
   afed8: 79 a1 10 f4 00 00 00 00      	ldxdw r1, [r10 - 0xbf0]
   afee0: 7b 16 38 01 00 00 00 00      	stxdw [r6 + 0x138], r1
   afee8: 79 a1 f8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc08]
   afef0: 7b 16 40 01 00 00 00 00      	stxdw [r6 + 0x140], r1
   afef8: 79 a1 d8 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc28]
   aff00: 73 16 da 00 00 00 00 00      	stxb [r6 + 0xda], r1
   aff08: 63 76 db 00 00 00 00 00      	stxw [r6 + 0xdb], r7
   aff10: 79 a1 e0 f3 00 00 00 00      	ldxdw r1, [r10 - 0xc20]
   aff18: 73 16 aa 00 00 00 00 00      	stxb [r6 + 0xaa], r1
   aff20: 73 06 df 00 00 00 00 00      	stxb [r6 + 0xdf], r0
   aff28: 05 00 c7 f9 00 00 00 00      	ja -0x639 <.text+0xacc48>
   aff30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aff38: 07 01 00 00 a0 f5 ff ff      	add64 r1, -0xa60
   aff40: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   aff48: 85 10 00 00 7a de 01 00      	call 0x1de7a
   aff50: 79 a3 a8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa58]
   aff58: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   aff60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aff68: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   aff70: 18 04 00 00 65 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7565
   aff80: b7 05 00 00 0c 00 00 00      	mov64 r5, 0xc
   aff88: 85 10 00 00 34 a5 fe ff      	call -0x15acc
   aff90: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   aff98: 79 a2 98 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa68]
   affa0: 05 00 d1 fb 00 00 00 00      	ja -0x42f <.text+0xadd10>
   affa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   affb0: 07 01 00 00 f0 f5 ff ff      	add64 r1, -0xa10
   affb8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   affc0: 85 10 00 00 6b de 01 00      	call 0x1de6b
   affc8: 79 a3 f8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa08]
   affd0: 79 a2 f0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa10]
   affd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   affe0: 07 01 00 00 e0 f5 ff ff      	add64 r1, -0xa20
   affe8: 18 04 00 00 2c 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b732c
   afff8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   b0000: 85 10 00 00 25 a5 fe ff      	call -0x15adb
   b0008: 79 a3 e8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa18]
   b0010: 79 a2 e0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa20]
   b0018: 79 a4 e8 f3 00 00 00 00      	ldxdw r4, [r10 - 0xc18]
   b0020: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   b0028: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   b0030: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   b0038: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   b0040: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   b0048: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   b0050: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   b0058: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   b0060: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   b0068: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   b0070: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   b0078: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   b0080: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   b0088: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   b0090: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   b0098: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   b00a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b00a8: 07 01 00 00 d0 f5 ff ff      	add64 r1, -0xa30
   b00b0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   b00b8: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   b00c0: 85 10 00 00 1e d8 01 00      	call 0x1d81e
   b00c8: 79 a1 d0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa30]
   b00d0: 79 a2 d8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa28]
   b00d8: 05 00 aa fb 00 00 00 00      	ja -0x456 <.text+0xadd10>
   b00e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b00e8: 07 01 00 00 c0 f5 ff ff      	add64 r1, -0xa40
   b00f0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   b00f8: 85 10 00 00 44 de 01 00      	call 0x1de44
   b0100: 79 a3 c8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa38]
   b0108: 79 a2 c0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa40]
   b0110: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b0118: 07 01 00 00 b0 f5 ff ff      	add64 r1, -0xa50
   b0120: 18 04 00 00 71 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7571
   b0130: b7 05 00 00 12 00 00 00      	mov64 r5, 0x12
   b0138: 85 10 00 00 fe a4 fe ff      	call -0x15b02
   b0140: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   b0148: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   b0150: 05 00 9b fb 00 00 00 00      	ja -0x465 <.text+0xadd10>
