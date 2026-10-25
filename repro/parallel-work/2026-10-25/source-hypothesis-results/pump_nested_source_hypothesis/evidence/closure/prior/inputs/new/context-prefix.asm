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
