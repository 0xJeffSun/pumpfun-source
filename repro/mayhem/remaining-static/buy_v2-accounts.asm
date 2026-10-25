   5c6d8: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   5c6e0: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   5c6e8: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   5c6f0: 7b 2a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r2
   5c6f8: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5c700: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c708: 07 01 00 00 68 fc ff ff      	add64 r1, -0x398
   5c710: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c718: 85 10 00 00 22 5b ff ff      	call -0xa4de ; target 0xa030
   5c720: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   5c728: 7b 1a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r1
   5c730: 79 a6 68 fc 00 00 00 00      	ldxdw r6, [r10 - 0x398]
   5c738: 55 06 23 00 02 00 00 00      	jne r6, 0x2, +0x23 <.text+0x5c738>
   5c740: 79 71 10 f0 00 00 00 00      	ldxdw r1, [r7 - 0xff0]
   5c748: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   5c750: 79 76 08 f0 00 00 00 00      	ldxdw r6, [r7 - 0xff8]
   5c758: 79 77 00 f0 00 00 00 00      	ldxdw r7, [r7 - 0x1000]
   5c760: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c768: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5c770: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c778: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5c780: 85 10 00 00 69 5b ff ff      	call -0xa497 ; target 0xa2d0
   5c788: 71 a1 fd ff 00 00 00 00      	ldxb r1, [r10 - 0x3]
   5c790: 55 01 38 00 02 00 00 00      	jne r1, 0x2, +0x38 <.text+0x5c838>
   5c798: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   5c7a0: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   5c7a8: 85 10 00 00 c8 4d 00 00      	call 0x4dc8 ; target 0x835f0
   5c7b0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5c7c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c7c8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5c7d0: 07 01 00 00 f3 ff ff ff      	add64 r1, -0xd
   5c7d8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5c7e0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5c7e8: bd 21 6c 00 00 00 00 00      	jle r1, r2, +0x6c <.text+0x5ca30>
   5c7f0: 15 04 6d 00 00 00 00 00      	jeq r4, 0x0, +0x6d <.text+0x5ca40>
   5c7f8: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   5c808: 55 02 6e 00 00 00 00 00      	jne r2, 0x0, +0x6e <.text+0x5ca60>
   5c810: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5c820: 55 06 6f 00 01 00 00 00      	jne r6, 0x1, +0x6f <.text+0x5ca80>
   5c828: 2d 21 6f 00 00 00 00 00      	jgt r1, r2, +0x6f <.text+0x5ca88>
   5c830: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5c838: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   5c840: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   5c850: 85 10 00 00 fe 8d 00 00      	call 0x8dfe ; target 0xa3848
   5c858: 85 10 00 00 b2 4d 00 00      	call 0x4db2 ; target 0x835f0
   5c860: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5c870: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c878: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5c880: 07 01 00 00 fa ff ff ff      	add64 r1, -0x6
   5c888: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5c890: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5c898: bd 21 4f 00 00 00 00 00      	jle r1, r2, +0x4f <.text+0x5c9f8>
   5c8a0: 15 04 50 00 00 00 00 00      	jeq r4, 0x0, +0x50 <.text+0x5ca08>
   5c8a8: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   5c8b8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5c7a8>
   5c8c0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5c8c8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5c8d0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   5c8d8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5c8e8: 79 a3 60 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a0]
   5c8f0: bd 21 ea 06 00 00 00 00      	jle r1, r2, +0x6ea <.text+0x5ff28>
   5c8f8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5c908: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5c910: 6a 01 04 00 65 72 00 00      	sth [r1 + 0x4], 0x7265
   5c918: 62 01 00 00 74 72 61 64      	stw [r1 + 0x0], 0x64617274
   5c920: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   5c928: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   5c930: 7a 03 18 00 06 00 00 00      	stdw [r3 + 0x18], 0x6
   5c938: 7a 03 08 00 06 00 00 00      	stdw [r3 + 0x8], 0x6
   5c940: 7a 03 00 00 01 00 00 00      	stdw [r3 + 0x0], 0x1
   5c948: 7b 38 10 00 00 00 00 00      	stxdw [r8 + 0x10], r3
   5c950: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0x5cb00>
   5c958: 85 10 00 00 92 4d 00 00      	call 0x4d92 ; target 0x835f0
   5c960: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5c970: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c978: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5c980: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   5c988: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5c990: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5c998: bd 13 53 00 00 00 00 00      	jle r3, r1, +0x53 <.text+0x5cb18>
   5c9a0: 7b 6a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r6
   5c9a8: 15 04 54 00 00 00 00 00      	jeq r4, 0x0, +0x54 <.text+0x5cb30>
   5c9b0: 18 06 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r6, 0x300007f00
   5c9c0: 55 01 55 00 00 00 00 00      	jne r1, 0x0, +0x55 <.text+0x5cb50>
   5c9c8: 7b 8a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r8
   5c9d0: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   5c9e0: bd 16 57 00 00 00 00 00      	jle r6, r1, +0x57 <.text+0x5cb80>
   5c9e8: 18 08 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300000000
   5c9f8: 7b 68 00 00 00 00 00 00      	stxdw [r8 + 0x0], r6
   5ca00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ca08: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   5ca10: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5ca18: b7 03 00 00 00 01 00 00      	mov64 r3, 0x100
   5ca20: 85 10 00 00 6c 9b 00 00      	call 0x9b6c ; target 0xaa588
   5ca28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ca30: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5ca38: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5ca40: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5ca48: 85 10 00 00 dd 5a ff ff      	call -0xa523 ; target 0xa138
   5ca50: 71 a1 69 ff 00 00 00 00      	ldxb r1, [r10 - 0x97]
   5ca58: 55 01 4b 00 02 00 00 00      	jne r1, 0x2, +0x4b <.text+0x5cb98>
   5ca60: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   5ca68: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   5ca70: 85 10 00 00 6f 4d 00 00      	call 0x4d6f ; target 0x835f0
   5ca78: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   5ca80: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5ca88: 07 01 00 00 f4 ff ff ff      	add64 r1, -0xc
   5ca90: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5ca98: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5caa0: bd 21 74 00 00 00 00 00      	jle r1, r2, +0x74 <.text+0x5cd28>
   5caa8: 79 a5 40 fc 00 00 00 00      	ldxdw r5, [r10 - 0x3c0]
   5cab0: 15 04 75 00 00 00 00 00      	jeq r4, 0x0, +0x75 <.text+0x5cd40>
   5cab8: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   5cac8: 55 02 76 00 00 00 00 00      	jne r2, 0x0, +0x76 <.text+0x5cd60>
   5cad0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5cae0: 55 06 77 00 01 00 00 00      	jne r6, 0x1, +0x77 <.text+0x5cd80>
   5cae8: 2d 21 77 00 00 00 00 00      	jgt r1, r2, +0x77 <.text+0x5cd88>
   5caf0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5caf8: b7 02 00 00 0c 00 00 00      	mov64 r2, 0xc
   5cb00: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   5cb10: 85 10 00 00 a6 8d 00 00      	call 0x8da6 ; target 0xa3848
   5cb18: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cb20: 55 04 b0 ff 00 00 00 00      	jne r4, 0x0, -0x50 <.text+0x5c788>
   5cb28: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5cb30: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   5cb40: 55 02 af ff 00 00 00 00      	jne r2, 0x0, -0x51 <.text+0x5c7a0>
   5cb48: 05 00 af ff 00 00 00 00      	ja -0x51 <.text+0x5c7a8>
   5cb50: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cb58: 55 04 93 ff 00 00 00 00      	jne r4, 0x0, -0x6d <.text+0x5c6d8>
   5cb60: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5cb68: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   5cb78: 15 02 92 ff 00 00 00 00      	jeq r2, 0x0, -0x6e <.text+0x5c6f0>
   5cb80: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5cb88: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5cb98: 15 06 91 ff 01 00 00 00      	jeq r6, 0x1, -0x6f <.text+0x5c708>
   5cba0: bd 21 91 ff 00 00 00 00      	jle r1, r2, -0x6f <.text+0x5c710>
   5cba8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5cbb8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5cbc0: 18 02 00 00 6c 5f 70 61 00 00 00 00 72 61 6d 73      	lddw r2, 0x736d617261705f6c
   5cbd0: 7b 21 05 00 00 00 00 00      	stxdw [r1 + 0x5], r2
   5cbd8: 18 02 00 00 67 6c 6f 62 00 00 00 00 61 6c 5f 70      	lddw r2, 0x705f6c61626f6c67
   5cbe8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5cbf0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5cbf8: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   5cc00: 7a 07 18 00 0d 00 00 00      	stdw [r7 + 0x18], 0xd
   5cc08: 7a 07 08 00 0d 00 00 00      	stdw [r7 + 0x8], 0xd
   5cc10: 7a 07 00 00 01 00 00 00      	stdw [r7 + 0x0], 0x1
   5cc18: 7b 78 10 00 00 00 00 00      	stxdw [r8 + 0x10], r7
   5cc20: 7b 68 08 00 00 00 00 00      	stxdw [r8 + 0x8], r6
   5cc28: 7a 08 00 00 00 00 00 00      	stdw [r8 + 0x0], 0x0
   5cc30: 95 00 00 00 00 00 00 00      	exit
   5cc38: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cc40: 7b 6a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r6
   5cc48: 55 04 ac ff 00 00 00 00      	jne r4, 0x0, -0x54 <.text+0x5c890>
   5cc50: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5cc58: 18 06 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r6, 0x300007f00
   5cc68: 15 01 ab ff 00 00 00 00      	jeq r1, 0x0, -0x55 <.text+0x5c8a8>
   5cc70: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   5cc78: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   5cc80: 7b 8a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r8
   5cc88: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   5cc98: 2d 16 a9 ff 00 00 00 00      	jgt r6, r1, -0x57 <.text+0x5c8c8>
   5cca0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   5cca8: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   5ccb0: 85 10 00 00 76 8d 00 00      	call 0x8d76 ; target 0xa3868
   5ccb8: 85 10 00 00 26 4d 00 00      	call 0x4d26 ; target 0x835f0
   5ccc0: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   5ccc8: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   5ccd0: 07 03 00 00 90 ff ff ff      	add64 r3, -0x70
   5ccd8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5cce0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5cce8: bd 53 43 00 00 00 00 00      	jle r3, r5, +0x43 <.text+0x5cde8>
   5ccf0: 15 04 44 00 00 00 00 00      	jeq r4, 0x0, +0x44 <.text+0x5cdf8>
   5ccf8: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   5cd08: 55 05 45 00 00 00 00 00      	jne r5, 0x0, +0x45 <.text+0x5ce18>
   5cd10: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5cd20: bd 21 47 00 00 00 00 00      	jle r1, r2, +0x47 <.text+0x5ce40>
   5cd28: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   5cd30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cd38: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   5cd40: 7b 1a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r1
   5cd48: b7 03 00 00 70 00 00 00      	mov64 r3, 0x70
   5cd50: 85 10 00 00 06 9b 00 00      	call 0x9b06 ; target 0xaa588
   5cd58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cd60: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5cd68: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cd70: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cd78: 85 10 00 00 ee 4b ff ff      	call -0xb412 ; target 0x2cf0
   5cd80: 61 a1 00 ff 00 00 00 00      	ldxw r1, [r10 - 0x100]
   5cd88: 55 01 3d 00 02 00 00 00      	jne r1, 0x2, +0x3d <.text+0x5ce58>
   5cd90: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   5cd98: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   5cda0: 85 10 00 00 09 4d 00 00      	call 0x4d09 ; target 0x835f0
   5cda8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   5cdb0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5cdb8: 07 01 00 00 fc ff ff ff      	add64 r1, -0x4
   5cdc0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5cdc8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5cdd0: bd 21 56 00 00 00 00 00      	jle r1, r2, +0x56 <.text+0x5cf68>
   5cdd8: 79 a5 40 fc 00 00 00 00      	ldxdw r5, [r10 - 0x3c0]
   5cde0: 15 04 57 00 00 00 00 00      	jeq r4, 0x0, +0x57 <.text+0x5cf80>
   5cde8: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   5cdf8: 55 02 58 00 00 00 00 00      	jne r2, 0x0, +0x58 <.text+0x5cfa0>
   5ce00: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5ce10: 55 06 59 00 01 00 00 00      	jne r6, 0x1, +0x59 <.text+0x5cfc0>
   5ce18: 2d 21 59 00 00 00 00 00      	jgt r1, r2, +0x59 <.text+0x5cfc8>
   5ce20: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5ce28: b7 02 00 00 04 00 00 00      	mov64 r2, 0x4
   5ce30: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   5ce40: 85 10 00 00 40 8d 00 00      	call 0x8d40 ; target 0xa3848
   5ce48: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5ce50: 79 a5 40 fc 00 00 00 00      	ldxdw r5, [r10 - 0x3c0]
   5ce58: 55 04 8b ff 00 00 00 00      	jne r4, 0x0, -0x75 <.text+0x5c998>
   5ce60: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5ce68: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   5ce78: 15 02 8a ff 00 00 00 00      	jeq r2, 0x0, -0x76 <.text+0x5c9b0>
   5ce80: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5ce88: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5ce98: 15 06 89 ff 01 00 00 00      	jeq r6, 0x1, -0x77 <.text+0x5c9c8>
   5cea0: bd 21 89 ff 00 00 00 00      	jle r1, r2, -0x77 <.text+0x5c9d0>
   5cea8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5ceb8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5cec0: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 73      	lddw r2, 0x735f6d656879616d
   5ced0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ced8: 62 01 08 00 74 61 74 65      	stw [r1 + 0x8], 0x65746174
   5cee0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5cee8: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   5cef0: 7a 07 18 00 0c 00 00 00      	stdw [r7 + 0x18], 0xc
   5cef8: 7a 07 08 00 0c 00 00 00      	stdw [r7 + 0x8], 0xc
   5cf00: 05 00 44 00 00 00 00 00      	ja +0x44 <.text+0x5d008>
   5cf08: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cf10: 55 04 bc ff 00 00 00 00      	jne r4, 0x0, -0x44 <.text+0x5cbd8>
   5cf18: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5cf20: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   5cf30: 15 05 bb ff 00 00 00 00      	jeq r5, 0x0, -0x45 <.text+0x5cbf0>
   5cf38: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   5cf40: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5cf48: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5cf58: 2d 21 b9 ff 00 00 00 00      	jgt r1, r2, -0x47 <.text+0x5cc08>
   5cf60: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   5cf68: b7 02 00 00 70 00 00 00      	mov64 r2, 0x70
   5cf70: 85 10 00 00 1e 8d 00 00      	call 0x8d1e ; target 0xa3868
   5cf78: 7b 6a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r6
   5cf80: 85 10 00 00 cd 4c 00 00      	call 0x4ccd ; target 0x835f0
   5cf88: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   5cf90: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   5cf98: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   5cfa0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5cfa8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5cfb0: bd 53 33 00 00 00 00 00      	jle r3, r5, +0x33 <.text+0x5d030>
   5cfb8: 79 a6 40 fc 00 00 00 00      	ldxdw r6, [r10 - 0x3c0]
   5cfc0: 79 a8 50 fc 00 00 00 00      	ldxdw r8, [r10 - 0x3b0]
   5cfc8: 15 04 34 00 00 00 00 00      	jeq r4, 0x0, +0x34 <.text+0x5d050>
   5cfd0: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   5cfe0: 55 05 35 00 00 00 00 00      	jne r5, 0x0, +0x35 <.text+0x5d070>
   5cfe8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5cff8: bd 21 37 00 00 00 00 00      	jle r1, r2, +0x37 <.text+0x5d098>
   5d000: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5d010: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5d018: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d020: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   5d028: 7b 1a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r1
   5d030: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   5d038: 85 10 00 00 a9 9a 00 00      	call 0x9aa9 ; target 0xaa588
   5d040: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d048: 15 01 30 00 00 00 00 00      	jeq r1, 0x0, +0x30 <.text+0x5d0b0>
   5d050: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d058: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d060: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5d068: 7b 1a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r1
   5d070: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5d078: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5d080: 05 00 2d 00 00 00 00 00      	ja +0x2d <.text+0x5d0d0>
   5d088: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5d090: 79 a5 40 fc 00 00 00 00      	ldxdw r5, [r10 - 0x3c0]
   5d098: 55 04 a9 ff 00 00 00 00      	jne r4, 0x0, -0x57 <.text+0x5ccc8>
   5d0a0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5d0a8: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   5d0b8: 15 02 a8 ff 00 00 00 00      	jeq r2, 0x0, -0x58 <.text+0x5cce0>
   5d0c0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5d0c8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5d0d8: 15 06 a7 ff 01 00 00 00      	jeq r6, 0x1, -0x59 <.text+0x5ccf8>
   5d0e0: bd 21 a7 ff 00 00 00 00      	jle r1, r2, -0x59 <.text+0x5cd00>
   5d0e8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5d0f8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5d100: 62 01 00 00 6d 69 6e 74      	stw [r1 + 0x0], 0x746e696d
   5d108: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5d110: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   5d118: 7a 07 18 00 04 00 00 00      	stdw [r7 + 0x18], 0x4
   5d120: 7a 07 08 00 04 00 00 00      	stdw [r7 + 0x8], 0x4
   5d128: 7a 07 00 00 01 00 00 00      	stdw [r7 + 0x0], 0x1
   5d130: 7b 75 10 00 00 00 00 00      	stxdw [r5 + 0x10], r7
   5d138: 7b 65 08 00 00 00 00 00      	stxdw [r5 + 0x8], r6
   5d140: 7a 05 00 00 00 00 00 00      	stdw [r5 + 0x0], 0x0
   5d148: 05 00 5c ff 00 00 00 00      	ja -0xa4 <.text+0x5cb10>
   5d150: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5d158: 79 a6 40 fc 00 00 00 00      	ldxdw r6, [r10 - 0x3c0]
   5d160: 79 a8 50 fc 00 00 00 00      	ldxdw r8, [r10 - 0x3b0]
   5d168: 55 04 cc ff 00 00 00 00      	jne r4, 0x0, -0x34 <.text+0x5ceb0>
   5d170: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5d178: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   5d188: 15 05 cb ff 00 00 00 00      	jeq r5, 0x0, -0x35 <.text+0x5cec8>
   5d190: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   5d198: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5d1a0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5d1b0: 2d 21 c9 ff 00 00 00 00      	jgt r1, r2, -0x37 <.text+0x5cee0>
   5d1b8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   5d1c0: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   5d1c8: 85 10 00 00 d3 8c 00 00      	call 0x8cd3 ; target 0xa3868
   5d1d0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5d1d8: 85 10 00 00 81 7a 00 00      	call 0x7a81 ; target 0x9a5e8
   5d1e0: 55 00 47 00 02 00 00 00      	jne r0, 0x2, +0x47 <.text+0x5d300>
   5d1e8: 7b 1a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r1
   5d1f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d1f8: 07 01 00 00 78 fc ff ff      	add64 r1, -0x388
   5d200: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d208: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d210: 85 10 00 00 6b 5a ff ff      	call -0xa595 ; target 0xa570
   5d218: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   5d220: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5d228: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x5d120>
   5d230: 7b 2a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r2
   5d238: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5d150>
   5d240: 18 03 00 00 96 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb96 ; data 'associated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event'
   5d250: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   5d258: 85 10 00 00 56 4d ff ff      	call -0xb2aa ; target 0x3d10
   5d260: 55 00 ba 02 02 00 00 00      	jne r0, 0x2, +0x2ba <.text+0x5e718>
   5d268: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   5d270: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   5d278: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5d280: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   5d288: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d290: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d298: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d2a0: 07 01 00 00 88 fc ff ff      	add64 r1, -0x378
   5d2a8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d2b0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d2b8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d2c0: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   5d2c8: 85 10 00 00 bc 4f ff ff      	call -0xb044 ; target 0x50b0
   5d2d0: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   5d2d8: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   5d2e0: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x5d1d8>
   5d2e8: 7b 2a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r2
   5d2f0: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5d208>
   5d2f8: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   5d308: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   5d310: 85 10 00 00 3f 4d ff ff      	call -0xb2c1 ; target 0x3d10
   5d318: 55 00 a3 02 02 00 00 00      	jne r0, 0x2, +0x2a3 <.text+0x5e718>
   5d320: 7b 1a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r1
   5d328: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   5d330: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5d338: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   5d340: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d348: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d358: 07 01 00 00 98 fc ff ff      	add64 r1, -0x368
   5d360: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d368: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d370: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d378: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   5d380: 85 10 00 00 a5 4f ff ff      	call -0xb05b ; target 0x50b0
   5d388: 79 a2 a0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x360]
   5d390: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   5d398: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x5d2b0>
   5d3a0: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   5d3b0: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   5d3b8: 85 10 00 00 2a 4d ff ff      	call -0xb2d6 ; target 0x3d10
   5d3c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d3c8: 55 00 10 02 02 00 00 00      	jne r0, 0x2, +0x210 <.text+0x5e330>
   5d3d0: 7b 2a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r2
   5d3d8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d3e0: 15 01 2e 00 00 00 00 00      	jeq r1, 0x0, +0x2e <.text+0x5d438>
   5d3e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d3f0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d3f8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5d400: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   5d408: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5d410: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5d418: 05 00 3c 00 00 00 00 00      	ja +0x3c <.text+0x5d4e0>
   5d420: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   5d428: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   5d430: 85 10 00 00 37 4c 00 00      	call 0x4c37 ; target 0x835f0
   5d438: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5d448: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d450: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5d458: 07 01 00 00 f6 ff ff ff      	add64 r1, -0xa
   5d460: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5d468: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5d470: bd 21 22 00 00 00 00 00      	jle r1, r2, +0x22 <.text+0x5d468>
   5d478: 15 04 23 00 00 00 00 00      	jeq r4, 0x0, +0x23 <.text+0x5d478>
   5d480: 18 01 00 00 f6 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff6
   5d490: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   5d498: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5d388>
   5d4a0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5d4a8: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   5d4b0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   5d4b8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5d4c8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5d4d0: bd 21 a2 05 00 00 00 00      	jle r1, r2, +0x5a2 <.text+0x600c8>
   5d4d8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5d4e8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5d4f0: 18 02 00 00 71 75 6f 74 00 00 00 00 65 5f 6d 69      	lddw r2, 0x696d5f65746f7571
   5d500: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5d508: 6a 01 08 00 6e 74 00 00      	sth [r1 + 0x8], 0x746e
   5d510: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   5d518: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   5d520: 7a 03 18 00 0a 00 00 00      	stdw [r3 + 0x18], 0xa
   5d528: 7a 03 08 00 0a 00 00 00      	stdw [r3 + 0x8], 0xa
   5d530: 7a 03 00 00 01 00 00 00      	stdw [r3 + 0x0], 0x1
   5d538: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   5d540: 7b 46 08 00 00 00 00 00      	stxdw [r6 + 0x8], r4
   5d548: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
   5d550: 05 00 db fe 00 00 00 00      	ja -0x125 <.text+0x5cb10>
   5d558: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5d560: 85 10 00 00 10 7a 00 00      	call 0x7a10 ; target 0x9a5e8
   5d568: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d570: 55 00 0a 00 02 00 00 00      	jne r0, 0x2, +0xa <.text+0x5d4a8>
   5d578: 7b 2a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r2
   5d580: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x5d4e0>
   5d588: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5d590: 55 04 dd ff 00 00 00 00      	jne r4, 0x0, -0x23 <.text+0x5d360>
   5d598: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5d5a0: 18 01 00 00 f6 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff6
   5d5b0: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   5d5b8: 55 02 dc ff 00 00 00 00      	jne r2, 0x0, -0x24 <.text+0x5d380>
   5d5c0: 05 00 dc ff 00 00 00 00      	ja -0x24 <.text+0x5d388>
   5d5c8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5d5d0: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   5d5e0: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   5d5e8: 85 10 00 00 e4 4c ff ff      	call -0xb31c ; target 0x3d10
   5d5f0: 55 00 48 02 02 00 00 00      	jne r0, 0x2, +0x248 <.text+0x5e718>
   5d5f8: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   5d600: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d608: 07 01 00 00 a8 fc ff ff      	add64 r1, -0x358
   5d610: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d618: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d620: 85 10 00 00 b7 59 ff ff      	call -0xa649 ; target 0xa3e0
   5d628: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   5d630: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   5d638: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x5d530>
   5d640: 7b 2a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r2
   5d648: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5d560>
   5d650: 18 03 00 00 f4 da 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadaf4 ; data 'system_programglobal-paramsglobal_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogra'
   5d660: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   5d668: 85 10 00 00 d4 4c ff ff      	call -0xb32c ; target 0x3d10
   5d670: 55 00 38 02 02 00 00 00      	jne r0, 0x2, +0x238 <.text+0x5e718>
   5d678: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   5d680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d688: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   5d690: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d698: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d6a0: 85 10 00 00 19 5a ff ff      	call -0xa5e7 ; target 0xa770
   5d6a8: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   5d6b0: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   5d6b8: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x5d5b0>
   5d6c0: 7b 2a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r2
   5d6c8: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5d5e0>
   5d6d0: 18 03 00 00 89 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb89 ; data 'token_programassociated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_prog'
   5d6e0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5d6e8: 85 10 00 00 c4 4c ff ff      	call -0xb33c ; target 0x3d10
   5d6f0: 55 00 28 02 02 00 00 00      	jne r0, 0x2, +0x228 <.text+0x5e718>
   5d6f8: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   5d700: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d708: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   5d710: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d718: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d720: 85 10 00 00 3f 45 ff ff      	call -0xbac1 ; target 0x120
   5d728: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   5d730: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   5d738: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x5d650>
   5d740: 18 03 00 00 5b dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc5b ; data 'quote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotocol_fee_'
   5d750: b7 04 00 00 13 00 00 00      	mov64 r4, 0x13
   5d758: 85 10 00 00 b6 4c ff ff      	call -0xb34a ; target 0x3d10
   5d760: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d768: 55 00 9c 01 02 00 00 00      	jne r0, 0x2, +0x19c <.text+0x5e330>
   5d770: 7b 2a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r2
   5d778: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d780: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5d6a0>
   5d788: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d790: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d798: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5d7a0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   5d7a8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5d7b0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5d7b8: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x5d708>
   5d7c0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5d7c8: 85 10 00 00 c3 79 00 00      	call 0x79c3 ; target 0x9a5e8
   5d7d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d7d8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5d6d0>
   5d7e0: 7b 2a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r2
   5d7e8: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x5d708>
   5d7f0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5d7f8: 18 03 00 00 e8 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbe8 ; data 'globalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atat'
   5d808: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   5d810: 85 10 00 00 9f 4c ff ff      	call -0xb361 ; target 0x3d10
   5d818: 55 00 03 02 02 00 00 00      	jne r0, 0x2, +0x203 <.text+0x5e718>
   5d820: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   5d828: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   5d830: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5d838: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   5d840: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d848: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d858: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   5d860: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d868: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d870: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5d878: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   5d880: 85 10 00 00 d0 4e ff ff      	call -0xb130 ; target 0x4f08
   5d888: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]
   5d890: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   5d898: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x5d7b0>
   5d8a0: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   5d8b0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5d8b8: 85 10 00 00 8a 4c ff ff      	call -0xb376 ; target 0x3d10
   5d8c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d8c8: 55 00 70 01 02 00 00 00      	jne r0, 0x2, +0x170 <.text+0x5e330>
   5d8d0: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   5d8d8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d8e0: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x5d838>
   5d8e8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5d8f0: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   5d8f8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5d900: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5d908: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d910: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d918: 15 01 0c 00 00 00 00 00      	jeq r1, 0x0, +0xc <.text+0x5d860>
   5d920: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5d928: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   5d930: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5d938: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5d940: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d948: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d950: 05 00 13 00 00 00 00 00      	ja +0x13 <.text+0x5d8d0>
   5d958: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5d960: 85 10 00 00 90 79 00 00      	call 0x7990 ; target 0x9a5e8
   5d968: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d970: 55 00 54 00 02 00 00 00      	jne r0, 0x2, +0x54 <.text+0x5daf8>
   5d978: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   5d980: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5d988: 85 10 00 00 8b 79 00 00      	call 0x798b ; target 0x9a5e8
   5d990: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5d998: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5d890>
   5d9a0: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   5d9a8: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5d910>
   5d9b0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5d9b8: 18 03 00 00 37 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc37 ; data 'fee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountp'
   5d9c8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5d9d0: 85 10 00 00 67 4c ff ff      	call -0xb399 ; target 0x3d10
   5d9d8: 55 00 cb 01 02 00 00 00      	jne r0, 0x2, +0x1cb <.text+0x5e718>
   5d9e0: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   5d9e8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d9f0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5d910>
   5d9f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5da00: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5da08: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5da10: 7b 1a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r1
   5da18: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5da20: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5da28: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x5d978>
   5da30: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5da38: 85 10 00 00 75 79 00 00      	call 0x7975 ; target 0x9a5e8
   5da40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5da48: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5d940>
   5da50: 7b 2a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r2
   5da58: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x5d978>
   5da60: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5da68: 18 03 00 00 44 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc44 ; data 'fee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_tok'
   5da78: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   5da80: 85 10 00 00 51 4c ff ff      	call -0xb3af ; target 0x3d10
   5da88: 55 00 b5 01 02 00 00 00      	jne r0, 0x2, +0x1b5 <.text+0x5e718>
   5da90: 7b 1a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r1
   5da98: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   5daa0: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5daa8: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   5dab0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5dab8: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5dac0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dac8: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   5dad0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5dad8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5dae0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5dae8: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   5daf0: 85 10 00 00 b7 4e ff ff      	call -0xb149 ; target 0x50b0
   5daf8: 79 a8 f0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x310]
   5db00: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   5db08: 15 01 07 00 02 00 00 00      	jeq r1, 0x2, +0x7 <.text+0x5da28>
   5db10: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5db18: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   5db28: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   5db30: 85 10 00 00 3b 4c ff ff      	call -0xb3c5 ; target 0x3d10
   5db38: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5db40: 55 00 24 00 02 00 00 00      	jne r0, 0x2, +0x24 <.text+0x5db48>
   5db48: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5db50: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x5daa8>
   5db58: 79 97 00 00 00 00 00 00      	ldxdw r7, [r9 + 0x0]
   5db60: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5db68: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5db70: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5db78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5db80: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5db88: 15 01 0b 00 00 00 00 00      	jeq r1, 0x0, +0xb <.text+0x5dac8>
   5db90: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5db98: 7b 2a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r2
   5dba0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5dba8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5dbb0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5dbb8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5dbc0: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0x5db98>
   5dbc8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5dbd0: 85 10 00 00 42 79 00 00      	call 0x7942 ; target 0x9a5e8
   5dbd8: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   5dbe0: 55 00 54 00 02 00 00 00      	jne r0, 0x2, +0x54 <.text+0x5dd68>
   5dbe8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5dbf0: 85 10 00 00 3e 79 00 00      	call 0x793e ; target 0x9a5e8
   5dbf8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5dc00: 55 00 0e 00 02 00 00 00      	jne r0, 0x2, +0xe <.text+0x5db58>
   5dc08: 7b 2a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r2
   5dc10: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x5dbd8>
   5dc18: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5dc20: 18 03 00 00 31 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade31 ; data 'associated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsharing_configassociated_us'
   5dc30: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   5dc38: 85 10 00 00 1a 4c ff ff      	call -0xb3e6 ; target 0x3d10
   5dc40: 55 00 7e 01 02 00 00 00      	jne r0, 0x2, +0x17e <.text+0x5e718>
   5dc48: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   5dc50: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5dc58: 55 01 98 ff 00 00 00 00      	jne r1, 0x0, -0x68 <.text+0x5d800>
   5dc60: 05 00 a3 ff 00 00 00 00      	ja -0x5d <.text+0x5d860>
   5dc68: 7b 86 10 00 00 00 00 00      	stxdw [r6 + 0x10], r8
   5dc70: 05 00 79 01 00 00 00 00      	ja +0x179 <.text+0x5e720>
   5dc78: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5dc80: 18 03 00 00 6c de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade6c ; data 'associated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpected variant tag: payermint_auth'
   5dc90: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   5dc98: 85 10 00 00 0e 4c ff ff      	call -0xb3f2 ; target 0x3d10
   5dca0: 55 00 72 01 02 00 00 00      	jne r0, 0x2, +0x172 <.text+0x5e718>
   5dca8: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   5dcb0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5dcb8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5dbd8>
   5dcc0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5dcc8: 7b 2a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r2
   5dcd0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5dcd8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5dce0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5dce8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5dcf0: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5dc48>
   5dcf8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5dd00: 85 10 00 00 1c 79 00 00      	call 0x791c ; target 0x9a5e8
   5dd08: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5dd10: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5dc08>
   5dd18: 7b 2a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r2
   5dd20: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5dc88>
   5dd28: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5dd30: 18 03 00 00 84 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade84
   5dd40: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   5dd48: 85 10 00 00 f8 4b ff ff      	call -0xb408 ; target 0x3d10
   5dd50: 55 00 5c 01 02 00 00 00      	jne r0, 0x2, +0x15c <.text+0x5e718>
   5dd58: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   5dd60: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5dd68: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5dc88>
   5dd70: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5dd78: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   5dd80: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5dd88: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5dd90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5dd98: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5dda0: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5dcf8>
   5dda8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5ddb0: 85 10 00 00 06 79 00 00      	call 0x7906 ; target 0x9a5e8
   5ddb8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5ddc0: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5dcb8>
   5ddc8: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   5ddd0: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5dd38>
   5ddd8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5dde0: 18 03 00 00 fa db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbfa ; data 'pump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_p'
   5ddf0: b7 04 00 00 14 00 00 00      	mov64 r4, 0x14
   5ddf8: 85 10 00 00 e2 4b ff ff      	call -0xb41e ; target 0x3d10
   5de00: 55 00 46 01 02 00 00 00      	jne r0, 0x2, +0x146 <.text+0x5e718>
   5de08: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   5de10: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5de18: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5dd38>
   5de20: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5de28: 7b 2a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r2
   5de30: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5de38: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5de40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5de48: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5de50: 05 00 19 00 00 00 00 00      	ja +0x19 <.text+0x5de00>
   5de58: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5de60: 85 10 00 00 f0 78 00 00      	call 0x78f0 ; target 0x9a5e8
   5de68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5de70: 55 00 0d 00 02 00 00 00      	jne r0, 0x2, +0xd <.text+0x5ddc0>
   5de78: 7b 2a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r2
   5de80: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0x5de40>
   5de88: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5de90: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5de98: 18 03 00 00 f5 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddf5 ; data 'creator_vaultmayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bond'
   5dea8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5deb0: 85 10 00 00 cb 4b ff ff      	call -0xb435 ; target 0x3d10
   5deb8: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   5dec0: 55 00 5b 00 02 00 00 00      	jne r0, 0x2, +0x5b <.text+0x5e080>
   5dec8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5ded0: 55 01 97 ff 00 00 00 00      	jne r1, 0x0, -0x69 <.text+0x5da70>
   5ded8: 05 00 a1 ff 00 00 00 00      	ja -0x5f <.text+0x5dac8>
   5dee0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5dee8: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   5def8: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   5df00: 85 10 00 00 c1 4b ff ff      	call -0xb43f ; target 0x3d10
   5df08: 55 00 25 01 02 00 00 00      	jne r0, 0x2, +0x125 <.text+0x5e718>
   5df10: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   5df18: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5df20: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5de40>
   5df28: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5df30: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   5df38: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5df40: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5df48: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5df50: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5df58: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5deb0>
   5df60: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5df68: 85 10 00 00 cf 78 00 00      	call 0x78cf ; target 0x9a5e8
   5df70: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5df78: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5de70>
   5df80: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   5df88: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5def0>
   5df90: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5df98: 18 03 00 00 52 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd52 ; data 'global_volume_accumulatoruser_volume_accumulatorfee_configfee_programpool_v2buyback_recipientbuyback_recipient'
   5dfa8: b7 04 00 00 19 00 00 00      	mov64 r4, 0x19
   5dfb0: 85 10 00 00 ab 4b ff ff      	call -0xb455 ; target 0x3d10
   5dfb8: 55 00 0f 01 02 00 00 00      	jne r0, 0x2, +0x10f <.text+0x5e718>
   5dfc0: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   5dfc8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5dfd0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5def0>
   5dfd8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5dfe0: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   5dfe8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5dff0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5dff8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5e000: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5e008: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5df60>
   5e010: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e018: 85 10 00 00 b9 78 00 00      	call 0x78b9 ; target 0x9a5e8
   5e020: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e028: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5df20>
   5e030: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   5e038: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5dfa0>
   5e040: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e048: 18 03 00 00 6b dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd6b ; data 'user_volume_accumulatorfee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpoo'
   5e058: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   5e060: 85 10 00 00 95 4b ff ff      	call -0xb46b ; target 0x3d10
   5e068: 55 00 f9 00 02 00 00 00      	jne r0, 0x2, +0xf9 <.text+0x5e718>
   5e070: 7b 1a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r1
   5e078: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e080: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5dfa0>
   5e088: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5e090: 7b 2a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r2
   5e098: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5e0a0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5e0a8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5e0b0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5e0b8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5e010>
   5e0c0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e0c8: 85 10 00 00 a3 78 00 00      	call 0x78a3 ; target 0x9a5e8
   5e0d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e0d8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5dfd0>
   5e0e0: 7b 2a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r2
   5e0e8: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5e050>
   5e0f0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e0f8: 18 03 00 00 92 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade92
   5e108: b7 04 00 00 22 00 00 00      	mov64 r4, 0x22
   5e110: 85 10 00 00 7f 4b ff ff      	call -0xb481 ; target 0x3d10
   5e118: 55 00 e3 00 02 00 00 00      	jne r0, 0x2, +0xe3 <.text+0x5e718>
   5e120: 7b 1a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r1
   5e128: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e130: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5e050>
   5e138: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5e140: 7b 2a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r2
   5e148: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5e150: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5e158: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5e160: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5e168: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5e0d0>
   5e170: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e178: 85 10 00 00 8d 78 00 00      	call 0x788d ; target 0x9a5e8
   5e180: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e188: 55 00 04 00 02 00 00 00      	jne r0, 0x2, +0x4 <.text+0x5e090>
   5e190: 7b 2a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r2
   5e198: 05 00 12 00 00 00 00 00      	ja +0x12 <.text+0x5e110>
   5e1a0: 7b 76 10 00 00 00 00 00      	stxdw [r6 + 0x10], r7
   5e1a8: 05 00 d2 00 00 00 00 00      	ja +0xd2 <.text+0x5e720>
   5e1b0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e1b8: 18 03 00 00 82 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd82 ; data 'fee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_'
   5e1c8: b7 04 00 00 0a 00 00 00      	mov64 r4, 0xa
   5e1d0: 85 10 00 00 67 4b ff ff      	call -0xb499 ; target 0x3d10
   5e1d8: 55 00 cb 00 02 00 00 00      	jne r0, 0x2, +0xcb <.text+0x5e718>
   5e1e0: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   5e1e8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e1f0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5e110>
   5e1f8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5e200: 7b 2a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r2
   5e208: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5e210: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5e218: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5e220: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5e228: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5e180>
   5e230: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e238: 85 10 00 00 75 78 00 00      	call 0x7875 ; target 0x9a5e8
   5e240: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e248: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5e140>
   5e250: 7b 2a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r2
   5e258: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x5e1c0>
   5e260: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e268: 18 03 00 00 8c dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd8c ; data 'fee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreat'
   5e278: b7 04 00 00 0b 00 00 00      	mov64 r4, 0xb
   5e280: 85 10 00 00 51 4b ff ff      	call -0xb4af ; target 0x3d10
   5e288: 55 00 b5 00 02 00 00 00      	jne r0, 0x2, +0xb5 <.text+0x5e718>
   5e290: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   5e298: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e2a0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x5e1c0>
   5e2a8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5e2b0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5e2b8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e2c0: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   5e2c8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5e2d0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5e2d8: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x5e228>
   5e2e0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e2e8: 85 10 00 00 5f 78 00 00      	call 0x785f ; target 0x9a5e8
   5e2f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e2f8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5e1f0>
   5e300: 7b 2a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r2
   5e308: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x5e228>
   5e310: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e318: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   5e328: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   5e330: 85 10 00 00 3b 4b ff ff      	call -0xb4c5 ; target 0x3d10
   5e338: 55 00 9f 00 02 00 00 00      	jne r0, 0x2, +0x9f <.text+0x5e718>
   5e340: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   5e348: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e350: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   5e358: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e360: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5e368: 85 10 00 00 c0 58 ff ff      	call -0xa740 ; target 0xa970
   5e370: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   5e378: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   5e380: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x5e298>
   5e388: 18 03 00 00 5c db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb5c ; data 'programsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statem'
   5e398: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   5e3a0: 85 10 00 00 2d 4b ff ff      	call -0xb4d3 ; target 0x3d10
   5e3a8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e3b0: 55 00 13 00 02 00 00 00      	jne r0, 0x2, +0x13 <.text+0x5e330>
   5e3b8: 7b 2a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r2
   5e3c0: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   5e3c8: 7b 7a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r7
   5e3d0: 15 03 11 00 00 00 00 00      	jeq r3, 0x0, +0x11 <.text+0x5e340>
   5e3d8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e3e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e3e8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5e3f0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5e3f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e400: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   5e408: 7b 1a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r1
   5e410: 15 03 0e 00 00 00 00 00      	jeq r3, 0x0, +0xe <.text+0x5e368>
   5e418: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e420: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   5e428: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e430: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   5e438: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5e440: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5e448: 05 00 14 00 00 00 00 00      	ja +0x14 <.text+0x5e3d0>
   5e450: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5e458: 05 00 7c 00 00 00 00 00      	ja +0x7c <.text+0x5e720>
   5e460: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e468: 85 10 00 00 2f 78 00 00      	call 0x782f ; target 0x9a5e8
   5e470: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e478: 55 00 6d 00 02 00 00 00      	jne r0, 0x2, +0x6d <.text+0x5e6c8>
   5e480: 7b 2a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r2
   5e488: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   5e490: 85 10 00 00 2a 78 00 00      	call 0x782a ; target 0x9a5e8
   5e498: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e4a0: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x5e398>
   5e4a8: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   5e4b0: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x5e3d0>
   5e4b8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e4c0: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   5e4d0: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   5e4d8: 85 10 00 00 06 4b ff ff      	call -0xb4fa ; target 0x3d10
   5e4e0: 55 00 6a 00 02 00 00 00      	jne r0, 0x2, +0x6a <.text+0x5e718>
   5e4e8: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   5e4f0: 18 01 00 00 40 13 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1340
   5e500: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e508: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   5e510: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e518: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   5e520: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e528: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   5e530: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e538: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5e540: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   5e548: 7a 0a 28 ff 00 00 00 00      	stdw [r10 - 0xd8], 0x0
   5e550: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e558: 07 07 00 00 08 fd ff ff      	add64 r7, -0x2f8
   5e560: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e568: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   5e570: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e578: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5e580: 85 10 00 00 00 98 00 00      	call 0x9800 ; target 0xaa588
   5e588: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   5e590: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e598: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e5a0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e5a8: 7b 2a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r2
   5e5b0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e5b8: 7b 2a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r2
   5e5c0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e5c8: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   5e5d0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e5d8: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   5e5e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e5e8: 07 02 00 00 38 fd ff ff      	add64 r2, -0x2c8
   5e5f0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e5f8: 85 10 00 00 ae 58 ff ff      	call -0xa752 ; target 0xab70
   5e600: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x5e528>
   5e608: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5e610: 85 10 00 00 fa 77 00 00      	call 0x77fa ; target 0x9a5e8
   5e618: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e620: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e628: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   5e638: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5e640: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x5e5e8>
   5e648: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   5e650: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e658: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e660: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e668: 7b 2a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r2
   5e670: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e678: 7b 2a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r2
   5e680: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e688: 7b 2a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r2
   5e690: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e698: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   5e6a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6a8: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   5e6b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e6b8: 07 02 00 00 58 fd ff ff      	add64 r2, -0x2a8
   5e6c0: 85 10 00 00 95 58 ff ff      	call -0xa76b ; target 0xab70
   5e6c8: 15 00 09 00 00 00 00 00      	jeq r0, 0x0, +0x9 <.text+0x5e5f8>
   5e6d0: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5e6d8: 85 10 00 00 e1 77 00 00      	call 0x77e1 ; target 0x9a5e8
   5e6e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e6e8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e6f0: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   5e700: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   5e708: 85 10 00 00 c0 4a ff ff      	call -0xb540 ; target 0x3d10
   5e710: 05 00 5b 00 00 00 00 00      	ja +0x5b <.text+0x5e8d0>
   5e718: 7b 8a 50 fb 00 00 00 00      	stxdw [r10 - 0x4b0], r8
   5e720: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   5e728: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5e730: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e738: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e740: 7b 2a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r2
   5e748: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e750: 7b 2a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r2
   5e758: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e760: 7b 2a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r2
   5e768: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e770: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   5e778: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e780: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   5e788: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e790: 07 02 00 00 78 fd ff ff      	add64 r2, -0x288
   5e798: 85 10 00 00 7a 58 ff ff      	call -0xa786 ; target 0xab70
   5e7a0: 15 00 16 00 00 00 00 00      	jeq r0, 0x0, +0x16 <.text+0x5e738>
   5e7a8: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5e7b0: 85 10 00 00 c6 77 00 00      	call 0x77c6 ; target 0x9a5e8
   5e7b8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e7c0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e7c8: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   5e7d8: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   5e7e0: 05 00 3f 00 00 00 00 00      	ja +0x3f <.text+0x5e8c0>
   5e7e8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e7f0: 18 03 00 00 9e dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd9e ; data 'buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_bas'
   5e800: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   5e808: 85 10 00 00 a0 4a ff ff      	call -0xb560 ; target 0x3d10
   5e810: 55 00 04 00 02 00 00 00      	jne r0, 0x2, +0x4 <.text+0x5e718>
   5e818: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   5e820: 7b 1a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r1
   5e828: 55 03 7d ff 00 00 00 00      	jne r3, 0x0, -0x83 <.text+0x5e2f8>
   5e830: 05 00 8a ff 00 00 00 00      	ja -0x76 <.text+0x5e368>
   5e838: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   5e840: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   5e848: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
   5e850: 05 00 7b fc 00 00 00 00      	ja -0x385 <.text+0x5cb10>
   5e858: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   5e860: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5e868: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e870: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e878: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   5e880: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e888: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   5e890: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e898: 7b 2a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r2
   5e8a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e8a8: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   5e8b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e8b8: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   5e8c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e8c8: 07 02 00 00 98 fd ff ff      	add64 r2, -0x268
   5e8d0: 85 10 00 00 53 58 ff ff      	call -0xa7ad ; target 0xab70
   5e8d8: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x5e800>
   5e8e0: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5e8e8: 85 10 00 00 9f 77 00 00      	call 0x779f ; target 0x9a5e8
   5e8f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e8f8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e900: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   5e910: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   5e918: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x5e8c0>
   5e920: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   5e928: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e930: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e938: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e940: 7b 2a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r2
   5e948: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e950: 7b 2a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r2
   5e958: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e960: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   5e968: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e970: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   5e978: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e980: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   5e988: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e990: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   5e998: 85 10 00 00 3a 58 ff ff      	call -0xa7c6 ; target 0xab70
   5e9a0: 15 00 0d 00 00 00 00 00      	jeq r0, 0x0, +0xd <.text+0x5e8f0>
   5e9a8: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5e9b0: 85 10 00 00 86 77 00 00      	call 0x7786 ; target 0x9a5e8
   5e9b8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5e9c0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5e9c8: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   5e9d8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5e9e0: 85 10 00 00 65 4a ff ff      	call -0xb59b ; target 0x3d10
   5e9e8: 79 a6 40 fc 00 00 00 00      	ldxdw r6, [r10 - 0x3c0]
   5e9f0: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   5e9f8: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   5ea00: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
   5ea08: 05 00 44 fc 00 00 00 00      	ja -0x3bc <.text+0x5cb10>
   5ea10: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   5ea18: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5ea20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ea28: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ea30: 7b 2a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r2
   5ea38: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ea40: 7b 2a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r2
   5ea48: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ea50: 7b 2a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r2
   5ea58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ea60: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   5ea68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ea70: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   5ea78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ea80: 07 02 00 00 d8 fd ff ff      	add64 r2, -0x228
   5ea88: 85 10 00 00 1c 58 ff ff      	call -0xa7e4 ; target 0xab70
   5ea90: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x5e9b8>
   5ea98: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   5eaa0: 85 10 00 00 68 77 00 00      	call 0x7768 ; target 0x9a5e8
   5eaa8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5eab0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5eab8: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   5eac8: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   5ead0: 05 00 83 02 00 00 00 00      	ja +0x283 <.text+0x5fdd0>
   5ead8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   5eae0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5eae8: 15 01 79 02 00 00 00 00      	jeq r1, 0x0, +0x279 <.text+0x5fd98>
   5eaf0: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   5eaf8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5eb00: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   5eb08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5eb10: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   5eb18: 18 01 00 00 50 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1950
   5eb28: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5eb30: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   5eb38: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   5eb40: 55 00 ee 02 00 00 00 00      	jne r0, 0x0, +0x2ee <.text+0x60198>
   5eb48: 79 a6 18 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe8]
   5eb50: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   5eb58: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   5eb60: 79 a9 00 ff 00 00 00 00      	ldxdw r9, [r10 - 0x100]
   5eb68: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   5eb70: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   5eb78: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   5eb80: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   5eb88: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5eb90: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5eb98: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5eba0: 5d 93 6f 02 00 00 00 00      	jne r3, r9, +0x26f <.text+0x5fe00>
   5eba8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ebb0: 5d 83 6d 02 00 00 00 00      	jne r3, r8, +0x26d <.text+0x5fe00>
   5ebb8: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   5ebc0: 5d 73 6b 02 00 00 00 00      	jne r3, r7, +0x26b <.text+0x5fe00>
   5ebc8: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5ebd0: 5d 62 69 02 00 00 00 00      	jne r2, r6, +0x269 <.text+0x5fe00>
   5ebd8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ebe0: 15 01 84 02 00 00 00 00      	jeq r1, 0x0, +0x284 <.text+0x5fee8>
   5ebe8: 79 a2 28 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d8]
   5ebf0: 79 21 40 00 00 00 00 00      	ldxdw r1, [r2 + 0x40]
   5ebf8: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5ec00: 79 21 38 00 00 00 00 00      	ldxdw r1, [r2 + 0x38]
   5ec08: 7b 1a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r1
   5ec10: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   5ec18: 7b 1a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r1
   5ec20: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   5ec28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ec30: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5ec38: 7b 3a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r3
   5ec40: 79 17 10 00 00 00 00 00      	ldxdw r7, [r1 + 0x10]
   5ec48: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   5ec50: 79 29 28 00 00 00 00 00      	ldxdw r9, [r2 + 0x28]
   5ec58: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   5ec60: 5d 69 81 02 00 00 00 00      	jne r9, r6, +0x281 <.text+0x5ff50>
   5ec68: 79 a1 48 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b8]
   5ec70: 5d 81 7f 02 00 00 00 00      	jne r1, r8, +0x27f <.text+0x5ff50>
   5ec78: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   5ec80: 5d 71 7d 02 00 00 00 00      	jne r1, r7, +0x27d <.text+0x5ff50>
   5ec88: 79 a1 38 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c8]
   5ec90: 79 a2 30 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4d0]
   5ec98: 5d 21 7a 02 00 00 00 00      	jne r1, r2, +0x27a <.text+0x5ff50>
   5eca0: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5eca8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5ecb0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ecb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ecc0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5ecc8: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   5ecd0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5ecd8: 18 05 00 00 0e dc 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xadc0e ; data 'mayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_pro'
   5ece8: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   5ecf0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5ecf8: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   5ed00: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   5ed08: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   5ed10: 7b 4a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r4
   5ed18: 7b 3a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r3
   5ed20: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   5ed28: 7a 0a e0 fe 0c 00 00 00      	stdw [r10 - 0x120], 0xc
   5ed30: 7a 0a f0 fe 20 00 00 00      	stdw [r10 - 0x110], 0x20
   5ed38: 72 0a 78 fe ff 00 00 00      	stb [r10 - 0x188], 0xff
   5ed40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ed48: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   5ed50: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ed58: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   5ed60: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5ed68: 07 05 00 00 78 fe ff ff      	add64 r5, -0x188
   5ed70: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   5ed78: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   5ed80: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   5ed88: 55 00 a5 02 00 00 00 00      	jne r0, 0x0, +0x2a5 <.text+0x60198>
   5ed90: 79 a6 18 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe8]
   5ed98: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   5eda0: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   5eda8: 79 a9 00 ff 00 00 00 00      	ldxdw r9, [r10 - 0x100]
   5edb0: 71 a1 78 fe 00 00 00 00      	ldxb r1, [r10 - 0x188]
   5edb8: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   5edc0: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   5edc8: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   5edd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5edd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ede0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5ede8: 5d 93 66 02 00 00 00 00      	jne r3, r9, +0x266 <.text+0x60000>
   5edf0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5edf8: 5d 83 64 02 00 00 00 00      	jne r3, r8, +0x264 <.text+0x60000>
   5ee00: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   5ee08: 5d 73 62 02 00 00 00 00      	jne r3, r7, +0x262 <.text+0x60000>
   5ee10: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5ee18: 5d 62 60 02 00 00 00 00      	jne r2, r6, +0x260 <.text+0x60000>
   5ee20: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ee28: 15 01 69 02 00 00 00 00      	jeq r1, 0x0, +0x269 <.text+0x60058>
   5ee30: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   5ee38: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   5ee40: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5ee48: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5ee50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee58: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5ee60: 85 10 00 00 e5 54 ff ff      	call -0xab1b ; target 0x9590
   5ee68: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5ee70: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5ee78: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   5ee80: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   5ee88: 5d 34 65 02 00 00 00 00      	jne r4, r3, +0x265 <.text+0x60098>
   5ee90: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5ee98: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   5eea0: 5d 34 62 02 00 00 00 00      	jne r4, r3, +0x262 <.text+0x60098>
   5eea8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5eeb0: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   5eeb8: 5d 34 5f 02 00 00 00 00      	jne r4, r3, +0x25f <.text+0x60098>
   5eec0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5eec8: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5eed0: 5d 12 5c 02 00 00 00 00      	jne r2, r1, +0x25c <.text+0x60098>
   5eed8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eee0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5eee8: 85 10 00 00 fe 51 ff ff      	call -0xae02 ; target 0x7ee0
   5eef0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   5eef8: 79 19 60 00 00 00 00 00      	ldxdw r9, [r1 + 0x60]
   5ef00: 79 18 58 00 00 00 00 00      	ldxdw r8, [r1 + 0x58]
   5ef08: 79 17 50 00 00 00 00 00      	ldxdw r7, [r1 + 0x50]
   5ef10: 79 16 48 00 00 00 00 00      	ldxdw r6, [r1 + 0x48]
   5ef18: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   5ef20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ef28: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ef30: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   5ef38: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ef40: 7b 2a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r2
   5ef48: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ef50: 7b 2a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r2
   5ef58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ef60: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5ef68: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5ef70: 5d 16 53 02 00 00 00 00      	jne r6, r1, +0x253 <.text+0x600f0>
   5ef78: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   5ef80: 5d 17 51 02 00 00 00 00      	jne r7, r1, +0x251 <.text+0x600f0>
   5ef88: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   5ef90: 5d 18 4f 02 00 00 00 00      	jne r8, r1, +0x24f <.text+0x600f0>
   5ef98: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   5efa0: 5d 19 4d 02 00 00 00 00      	jne r9, r1, +0x24d <.text+0x600f0>
   5efa8: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5efb0: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5efb8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5efc0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5efc8: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   5efd0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5efd8: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   5efe0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5efe8: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   5eff0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5eff8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   5f000: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f008: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   5f010: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f018: 85 10 00 00 ae 54 ff ff      	call -0xab52 ; target 0x9590
   5f020: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5f028: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f030: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   5f038: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f040: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   5f048: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f050: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   5f058: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f060: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   5f068: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f070: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   5f078: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f080: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   5f088: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5f090: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   5f098: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f0a0: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   5f0a8: 85 10 00 00 7a 6d 00 00      	call 0x6d7a ; target 0x95c80
   5f0b0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f0b8: 85 10 00 00 c4 51 ff ff      	call -0xae3c ; target 0x7ee0
   5f0c0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   5f0c8: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5f0d0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f0d8: 79 29 18 00 00 00 00 00      	ldxdw r9, [r2 + 0x18]
   5f0e0: 79 28 10 00 00 00 00 00      	ldxdw r8, [r2 + 0x10]
   5f0e8: 79 27 08 00 00 00 00 00      	ldxdw r7, [r2 + 0x8]
   5f0f0: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   5f0f8: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]
   5f100: 5d 26 42 02 00 00 00 00      	jne r6, r2, +0x242 <.text+0x601f8>
   5f108: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   5f110: 5d 27 40 02 00 00 00 00      	jne r7, r2, +0x240 <.text+0x601f8>
   5f118: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   5f120: 5d 28 3e 02 00 00 00 00      	jne r8, r2, +0x23e <.text+0x601f8>
   5f128: 79 a2 30 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d0]
   5f130: 5d 29 3c 02 00 00 00 00      	jne r9, r2, +0x23c <.text+0x601f8>
   5f138: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f140: 15 01 50 02 00 00 00 00      	jeq r1, 0x0, +0x250 <.text+0x602a8>
   5f148: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   5f150: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   5f158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f160: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5f168: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   5f170: 85 10 00 00 83 54 ff ff      	call -0xab7d ; target 0x9590
   5f178: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5f180: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5f188: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   5f190: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   5f198: 5d 34 03 02 00 00 00 00      	jne r4, r3, +0x203 <.text+0x60098>
   5f1a0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5f1a8: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   5f1b0: 5d 34 00 02 00 00 00 00      	jne r4, r3, +0x200 <.text+0x60098>
   5f1b8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5f1c0: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   5f1c8: 5d 34 fd 01 00 00 00 00      	jne r4, r3, +0x1fd <.text+0x60098>
   5f1d0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f1d8: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5f1e0: 5d 12 fa 01 00 00 00 00      	jne r2, r1, +0x1fa <.text+0x60098>
   5f1e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f1f0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5f1f8: 85 10 00 00 9c 51 ff ff      	call -0xae64 ; target 0x7ee0
   5f200: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   5f208: 79 19 60 00 00 00 00 00      	ldxdw r9, [r1 + 0x60]
   5f210: 79 18 58 00 00 00 00 00      	ldxdw r8, [r1 + 0x58]
   5f218: 79 17 50 00 00 00 00 00      	ldxdw r7, [r1 + 0x50]
   5f220: 79 16 48 00 00 00 00 00      	ldxdw r6, [r1 + 0x48]
   5f228: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   5f230: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f238: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f240: 7b 2a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r2
   5f248: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f250: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   5f258: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f260: 7b 2a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r2
   5f268: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f270: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   5f278: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   5f280: 5d 16 30 02 00 00 00 00      	jne r6, r1, +0x230 <.text+0x602e8>
   5f288: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5f290: 5d 17 2e 02 00 00 00 00      	jne r7, r1, +0x22e <.text+0x602e8>
   5f298: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   5f2a0: 5d 18 2c 02 00 00 00 00      	jne r8, r1, +0x22c <.text+0x602e8>
   5f2a8: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   5f2b0: 5d 19 2a 02 00 00 00 00      	jne r9, r1, +0x22a <.text+0x602e8>
   5f2b8: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   5f2c0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5f2c8: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5f2d0: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   5f2d8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5f2e0: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   5f2e8: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5f2f0: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   5f2f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f300: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   5f308: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f310: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   5f318: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f320: 85 10 00 00 4d 54 ff ff      	call -0xabb3 ; target 0x9590
   5f328: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5f330: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f338: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   5f340: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f348: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   5f350: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f358: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   5f360: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f368: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   5f370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f378: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   5f380: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f388: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   5f390: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5f398: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   5f3a0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f3a8: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   5f3b0: 85 10 00 00 19 6d 00 00      	call 0x6d19 ; target 0x95c80
   5f3b8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f3c0: 85 10 00 00 63 51 ff ff      	call -0xae9d ; target 0x7ee0
   5f3c8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   5f3d0: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5f3d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f3e0: 79 29 18 00 00 00 00 00      	ldxdw r9, [r2 + 0x18]
   5f3e8: 79 28 10 00 00 00 00 00      	ldxdw r8, [r2 + 0x10]
   5f3f0: 79 27 08 00 00 00 00 00      	ldxdw r7, [r2 + 0x8]
   5f3f8: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   5f400: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   5f408: 5d 26 14 02 00 00 00 00      	jne r6, r2, +0x214 <.text+0x60390>
   5f410: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   5f418: 5d 27 12 02 00 00 00 00      	jne r7, r2, +0x212 <.text+0x60390>
   5f420: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   5f428: 5d 28 10 02 00 00 00 00      	jne r8, r2, +0x210 <.text+0x60390>
   5f430: 79 a2 70 fe 00 00 00 00      	ldxdw r2, [r10 - 0x190]
   5f438: 5d 29 0e 02 00 00 00 00      	jne r9, r2, +0x20e <.text+0x60390>
   5f440: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f448: 15 01 21 02 00 00 00 00      	jeq r1, 0x0, +0x221 <.text+0x60438>
   5f450: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   5f458: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f460: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   5f468: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f470: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   5f478: 18 01 00 00 88 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1988
   5f488: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5f490: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   5f498: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   5f4a0: 55 00 c2 01 00 00 00 00      	jne r0, 0x0, +0x1c2 <.text+0x60198>
   5f4a8: 79 a9 18 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe8]
   5f4b0: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   5f4b8: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   5f4c0: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   5f4c8: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   5f4d0: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   5f4d8: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   5f4e0: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   5f4e8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f4f0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f4f8: 5d 62 13 02 00 00 00 00      	jne r2, r6, +0x213 <.text+0x60478>
   5f500: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f508: 5d 72 11 02 00 00 00 00      	jne r2, r7, +0x211 <.text+0x60478>
   5f510: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f518: 5d 82 0f 02 00 00 00 00      	jne r2, r8, +0x20f <.text+0x60478>
   5f520: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f528: 5d 91 0d 02 00 00 00 00      	jne r1, r9, +0x20d <.text+0x60478>
   5f530: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   5f538: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f540: 15 01 22 02 00 00 00 00      	jeq r1, 0x0, +0x222 <.text+0x60538>
   5f548: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5f550: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5f558: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f560: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f568: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5f570: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   5f578: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f580: 18 05 00 00 1a dc 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xadc1a ; data 'bonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_c'
   5f590: 7b 5a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r5
   5f598: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f5a0: 07 05 00 00 d8 fe ff ff      	add64 r5, -0x128
   5f5a8: 7b 5a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r5
   5f5b0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   5f5b8: 7b 4a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r4
   5f5c0: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   5f5c8: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   5f5d0: 7a 0a 80 fe 0d 00 00 00      	stdw [r10 - 0x180], 0xd
   5f5d8: 7a 0a 90 fe 20 00 00 00      	stdw [r10 - 0x170], 0x20
   5f5e0: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   5f5f0: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   5f5f8: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   5f608: 7b 1a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r1
   5f610: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   5f620: 7b 1a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r1
   5f628: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   5f638: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   5f640: 72 0a ff fe ff 00 00 00      	stb [r10 - 0x101], 0xff
   5f648: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f650: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   5f658: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5f660: 07 03 00 00 08 fd ff ff      	add64 r3, -0x2f8
   5f668: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f670: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   5f678: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f680: 07 05 00 00 ff fe ff ff      	add64 r5, -0x101
   5f688: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   5f690: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   5f698: 55 00 83 01 00 00 00 00      	jne r0, 0x0, +0x183 <.text+0x60198>
   5f6a0: 79 a6 18 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe8]
   5f6a8: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   5f6b0: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   5f6b8: 79 a9 00 ff 00 00 00 00      	ldxdw r9, [r10 - 0x100]
   5f6c0: 71 a1 ff fe 00 00 00 00      	ldxb r1, [r10 - 0x101]
   5f6c8: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   5f6d0: 73 12 03 00 00 00 00 00      	stxb [r2 + 0x3], r1
   5f6d8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   5f6e0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f6e8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f6f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5f6f8: 5d 93 f3 01 00 00 00 00      	jne r3, r9, +0x1f3 <.text+0x60578>
   5f700: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5f708: 5d 83 f1 01 00 00 00 00      	jne r3, r8, +0x1f1 <.text+0x60578>
   5f710: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   5f718: 5d 73 ef 01 00 00 00 00      	jne r3, r7, +0x1ef <.text+0x60578>
   5f720: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5f728: 5d 62 ed 01 00 00 00 00      	jne r2, r6, +0x1ed <.text+0x60578>
   5f730: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f738: 15 01 f6 01 00 00 00 00      	jeq r1, 0x0, +0x1f6 <.text+0x605d0>
   5f740: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   5f748: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f750: 15 01 fa 01 00 00 00 00      	jeq r1, 0x0, +0x1fa <.text+0x60608>
   5f758: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   5f760: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f768: 15 01 ff 01 00 00 00 00      	jeq r1, 0x0, +0x1ff <.text+0x60648>
   5f770: 79 a1 b8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x448]
   5f778: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f780: 15 01 03 02 00 00 00 00      	jeq r1, 0x0, +0x203 <.text+0x60680>
   5f788: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   5f790: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   5f798: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5f7a0: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5f7a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f7b0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5f7b8: 85 10 00 00 ba 53 ff ff      	call -0xac46 ; target 0x9590
   5f7c0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5f7c8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5f7d0: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   5f7d8: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   5f7e0: 5d 34 3a 01 00 00 00 00      	jne r4, r3, +0x13a <.text+0x60098>
   5f7e8: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5f7f0: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   5f7f8: 5d 34 37 01 00 00 00 00      	jne r4, r3, +0x137 <.text+0x60098>
   5f800: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5f808: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   5f810: 5d 34 34 01 00 00 00 00      	jne r4, r3, +0x134 <.text+0x60098>
   5f818: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f820: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   5f828: 5d 12 31 01 00 00 00 00      	jne r2, r1, +0x131 <.text+0x60098>
   5f830: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f838: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5f840: 85 10 00 00 d3 50 ff ff      	call -0xaf2d ; target 0x7ee0
   5f848: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   5f850: 79 19 60 00 00 00 00 00      	ldxdw r9, [r1 + 0x60]
   5f858: 79 18 58 00 00 00 00 00      	ldxdw r8, [r1 + 0x58]
   5f860: 79 17 50 00 00 00 00 00      	ldxdw r7, [r1 + 0x50]
   5f868: 79 16 48 00 00 00 00 00      	ldxdw r6, [r1 + 0x48]
   5f870: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   5f878: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f880: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f888: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f890: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   5f898: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f8a0: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   5f8a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f8b0: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   5f8b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f8c0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   5f8c8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5f8d0: 5d 16 e1 01 00 00 00 00      	jne r6, r1, +0x1e1 <.text+0x606c0>
   5f8d8: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   5f8e0: 5d 17 df 01 00 00 00 00      	jne r7, r1, +0x1df <.text+0x606c0>
   5f8e8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   5f8f0: 5d 18 dd 01 00 00 00 00      	jne r8, r1, +0x1dd <.text+0x606c0>
   5f8f8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   5f900: 5d 19 db 01 00 00 00 00      	jne r9, r1, +0x1db <.text+0x606c0>
   5f908: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5f910: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5f918: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5f920: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5f928: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   5f930: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5f938: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   5f940: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5f948: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   5f950: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f958: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   5f960: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f968: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   5f970: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f978: 85 10 00 00 82 53 ff ff      	call -0xac7e ; target 0x9590
   5f980: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5f988: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f990: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   5f998: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f9a0: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   5f9a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f9b0: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   5f9b8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5f9c0: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   5f9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f9d0: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   5f9d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f9e0: 07 02 00 00 98 fe ff ff      	add64 r2, -0x168
   5f9e8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5f9f0: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   5f9f8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5fa00: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   5fa08: 85 10 00 00 4e 6c 00 00      	call 0x6c4e ; target 0x95c80
   5fa10: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5fa18: 85 10 00 00 98 50 ff ff      	call -0xaf68 ; target 0x7ee0
   5fa20: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   5fa28: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5fa30: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5fa38: 79 29 18 00 00 00 00 00      	ldxdw r9, [r2 + 0x18]
   5fa40: 79 28 10 00 00 00 00 00      	ldxdw r8, [r2 + 0x10]
   5fa48: 79 27 08 00 00 00 00 00      	ldxdw r7, [r2 + 0x8]
   5fa50: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   5fa58: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   5fa60: 5d 26 c4 01 00 00 00 00      	jne r6, r2, +0x1c4 <.text+0x60768>
   5fa68: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   5fa70: 5d 27 c2 01 00 00 00 00      	jne r7, r2, +0x1c2 <.text+0x60768>
   5fa78: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   5fa80: 5d 28 c0 01 00 00 00 00      	jne r8, r2, +0x1c0 <.text+0x60768>
   5fa88: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   5fa90: 5d 29 be 01 00 00 00 00      	jne r9, r2, +0x1be <.text+0x60768>
   5fa98: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5faa0: 15 01 d1 01 00 00 00 00      	jeq r1, 0x0, +0x1d1 <.text+0x60810>
   5faa8: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   5fab0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fab8: 15 01 d0 01 00 00 00 00      	jeq r1, 0x0, +0x1d0 <.text+0x60820>
   5fac0: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   5fac8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fad0: 15 01 d4 01 00 00 00 00      	jeq r1, 0x0, +0x1d4 <.text+0x60858>
   5fad8: 79 a1 a8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x458]
   5fae0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5fae8: 79 19 18 00 00 00 00 00      	ldxdw r9, [r1 + 0x18]
   5faf0: 79 18 10 00 00 00 00 00      	ldxdw r8, [r1 + 0x10]
   5faf8: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   5fb00: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   5fb08: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   5fb18: 5d 16 d3 01 00 00 00 00      	jne r6, r1, +0x1d3 <.text+0x60898>
   5fb20: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   5fb30: 5d 17 d0 01 00 00 00 00      	jne r7, r1, +0x1d0 <.text+0x60898>
   5fb38: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   5fb48: 5d 18 cd 01 00 00 00 00      	jne r8, r1, +0x1cd <.text+0x60898>
   5fb50: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   5fb60: 5d 19 ca 01 00 00 00 00      	jne r9, r1, +0x1ca <.text+0x60898>
   5fb68: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   5fb70: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fb78: 15 01 e0 01 00 00 00 00      	jeq r1, 0x0, +0x1e0 <.text+0x60960>
   5fb80: 79 a1 90 fb 00 00 00 00      	ldxdw r1, [r10 - 0x470]
   5fb88: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fb90: 15 01 e5 01 00 00 00 00      	jeq r1, 0x0, +0x1e5 <.text+0x609a0>
   5fb98: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   5fba0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5fba8: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   5fbb0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5fbb8: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   5fbc0: 18 01 00 00 78 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1978
   5fbd0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5fbd8: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   5fbe0: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   5fbe8: 55 00 d9 00 00 00 00 00      	jne r0, 0x0, +0xd9 <.text+0x60198>
   5fbf0: 79 a9 18 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe8]
   5fbf8: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   5fc00: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   5fc08: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   5fc10: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   5fc18: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   5fc20: 73 12 04 00 00 00 00 00      	stxb [r2 + 0x4], r1
   5fc28: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   5fc30: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5fc38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5fc40: 5d 62 d7 01 00 00 00 00      	jne r2, r6, +0x1d7 <.text+0x609e0>
   5fc48: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5fc50: 5d 72 d5 01 00 00 00 00      	jne r2, r7, +0x1d5 <.text+0x609e0>
   5fc58: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5fc60: 5d 82 d3 01 00 00 00 00      	jne r2, r8, +0x1d3 <.text+0x609e0>
   5fc68: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5fc70: 5d 91 d1 01 00 00 00 00      	jne r1, r9, +0x1d1 <.text+0x609e0>
   5fc78: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   5fc80: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fc88: 15 01 d9 01 00 00 00 00      	jeq r1, 0x0, +0x1d9 <.text+0x60a38>
   5fc90: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   5fc98: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5fca0: 15 01 de 01 00 00 00 00      	jeq r1, 0x0, +0x1de <.text+0x60a78>
   5fca8: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   5fcb0: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   5fcb8: 7b 21 f8 00 00 00 00 00      	stxdw [r1 + 0xf8], r2
   5fcc0: 79 a2 60 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a0]
   5fcc8: 7b 21 f0 00 00 00 00 00      	stxdw [r1 + 0xf0], r2
   5fcd0: 79 a2 68 fb 00 00 00 00      	ldxdw r2, [r10 - 0x498]
   5fcd8: 7b 21 e8 00 00 00 00 00      	stxdw [r1 + 0xe8], r2
   5fce0: 79 a2 78 fb 00 00 00 00      	ldxdw r2, [r10 - 0x488]
   5fce8: 7b 21 e0 00 00 00 00 00      	stxdw [r1 + 0xe0], r2
   5fcf0: 79 a2 80 fb 00 00 00 00      	ldxdw r2, [r10 - 0x480]
   5fcf8: 7b 21 d8 00 00 00 00 00      	stxdw [r1 + 0xd8], r2
   5fd00: 79 a2 88 fb 00 00 00 00      	ldxdw r2, [r10 - 0x478]
   5fd08: 7b 21 d0 00 00 00 00 00      	stxdw [r1 + 0xd0], r2
   5fd10: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   5fd18: 7b 21 c8 00 00 00 00 00      	stxdw [r1 + 0xc8], r2
   5fd20: 79 a2 98 fb 00 00 00 00      	ldxdw r2, [r10 - 0x468]
   5fd28: 7b 21 c0 00 00 00 00 00      	stxdw [r1 + 0xc0], r2
   5fd30: 79 a2 a0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x460]
   5fd38: 7b 21 b8 00 00 00 00 00      	stxdw [r1 + 0xb8], r2
   5fd40: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   5fd48: 7b 21 b0 00 00 00 00 00      	stxdw [r1 + 0xb0], r2
   5fd50: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   5fd58: 7b 21 a8 00 00 00 00 00      	stxdw [r1 + 0xa8], r2
   5fd60: 79 a2 48 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b8]
   5fd68: 7b 21 a0 00 00 00 00 00      	stxdw [r1 + 0xa0], r2
   5fd70: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   5fd78: 7b 21 98 00 00 00 00 00      	stxdw [r1 + 0x98], r2
   5fd80: 79 a2 70 fb 00 00 00 00      	ldxdw r2, [r10 - 0x490]
   5fd88: 7b 21 90 00 00 00 00 00      	stxdw [r1 + 0x90], r2
   5fd90: 79 a2 50 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b0]
   5fd98: 7b 21 88 00 00 00 00 00      	stxdw [r1 + 0x88], r2
   5fda0: 79 a2 b8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x448]
   5fda8: 7b 21 80 00 00 00 00 00      	stxdw [r1 + 0x80], r2
   5fdb0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   5fdb8: 7b 21 78 00 00 00 00 00      	stxdw [r1 + 0x78], r2
   5fdc0: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   5fdc8: 7b 21 70 00 00 00 00 00      	stxdw [r1 + 0x70], r2
   5fdd0: 79 a2 d0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x430]
   5fdd8: 7b 21 68 00 00 00 00 00      	stxdw [r1 + 0x68], r2
   5fde0: 79 a2 d8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x428]
   5fde8: 7b 21 60 00 00 00 00 00      	stxdw [r1 + 0x60], r2
   5fdf0: 79 a2 e0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x420]
   5fdf8: 7b 21 58 00 00 00 00 00      	stxdw [r1 + 0x58], r2
   5fe00: 79 a2 e8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x418]
   5fe08: 7b 21 50 00 00 00 00 00      	stxdw [r1 + 0x50], r2
   5fe10: 79 a2 f0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x410]
   5fe18: 7b 21 48 00 00 00 00 00      	stxdw [r1 + 0x48], r2
   5fe20: 79 a2 f8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x408]
   5fe28: 7b 21 40 00 00 00 00 00      	stxdw [r1 + 0x40], r2
   5fe30: 79 a2 00 fc 00 00 00 00      	ldxdw r2, [r10 - 0x400]
   5fe38: 7b 21 38 00 00 00 00 00      	stxdw [r1 + 0x38], r2
   5fe40: 79 a2 08 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f8]
   5fe48: 7b 21 30 00 00 00 00 00      	stxdw [r1 + 0x30], r2
   5fe50: 79 a2 10 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f0]
   5fe58: 7b 21 28 00 00 00 00 00      	stxdw [r1 + 0x28], r2
   5fe60: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   5fe68: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   5fe70: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   5fe78: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   5fe80: 79 a2 30 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d0]
   5fe88: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   5fe90: 79 a2 28 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d8]
   5fe98: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5fea0: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   5fea8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5feb0: 05 00 af f9 00 00 00 00      	ja -0x651 <.text+0x5cb10>
   5feb8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   5fec0: 85 10 00 00 e4 74 00 00      	call 0x74e4 ; target 0x9a5e8
   5fec8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5fed0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5fed8: 18 03 00 00 55 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc55 ; data 'traderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotoco'
   5fee8: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   5fef0: 85 10 00 00 c3 47 ff ff      	call -0xb83d ; target 0x3d10
   5fef8: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   5ff00: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   5ff08: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   5ff10: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   5ff18: 05 00 a2 f9 00 00 00 00      	ja -0x65e <.text+0x5cb10>
   5ff20: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   5ff28: 85 10 00 00 d7 74 00 00      	call 0x74d7 ; target 0x9a5e8
   5ff30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5ff38: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5ff40: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   5ff50: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   5ff58: 85 10 00 00 b6 47 ff ff      	call -0xb84a ; target 0x3d10
   5ff60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5ff68: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   5ff70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ff78: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ff80: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5ff88: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ff90: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   5ff98: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5ffa0: 7b 9a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r9
   5ffa8: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   5ffb0: 7b 7a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r7
   5ffb8: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   5ffc0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5ffc8: 7b 5a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r5
   5ffd0: 7b 4a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r4
   5ffd8: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   5ffe0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5ffe8: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   5fff0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5fff8: 85 10 00 00 3f 6f 00 00      	call 0x6f3f ; target 0x979f8
   60000: 05 00 de ff 00 00 00 00      	ja -0x22 <.text+0x5fdd8>
   60008: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60010: 85 10 00 00 ba 74 00 00      	call 0x74ba ; target 0x9a5e8
   60018: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60020: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60028: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   60038: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   60040: 05 00 d5 ff 00 00 00 00      	ja -0x2b <.text+0x5fdd0>
   60048: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   60050: b7 02 00 00 06 00 00 00      	mov64 r2, 0x6
   60058: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   60068: 85 10 00 00 fb 86 00 00      	call 0x86fb ; target 0xa3848
   60070: b7 01 00 00 d1 07 00 00      	mov64 r1, 0x7d1
   60078: 85 10 00 00 ad 74 00 00      	call 0x74ad ; target 0x9a5e8
   60080: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60088: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60090: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   600a0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   600a8: 85 10 00 00 8c 47 ff ff      	call -0xb874 ; target 0x3d10
   600b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   600b8: 79 a1 30 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d0]
   600c0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   600c8: 7b 7a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r7
   600d0: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   600d8: 7b 6a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r6
   600e0: 79 a1 38 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c8]
   600e8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   600f0: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   600f8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   60100: 79 a1 48 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b8]
   60108: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   60110: 7b 9a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r9
   60118: 05 00 d8 ff 00 00 00 00      	ja -0x28 <.text+0x5fec0>
   60120: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   60128: 85 10 00 00 97 74 00 00      	call 0x7497 ; target 0x9a5e8
   60130: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60138: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60140: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   60150: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   60158: 85 10 00 00 76 47 ff ff      	call -0xb88a ; target 0x3d10
   60160: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60168: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   60170: 05 00 bf ff 00 00 00 00      	ja -0x41 <.text+0x5fe50>
   60178: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60180: 85 10 00 00 8c 74 00 00      	call 0x748c ; target 0x9a5e8
   60188: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60190: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60198: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   601a8: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   601b0: 05 00 a7 ff 00 00 00 00      	ja -0x59 <.text+0x5fdd0>
   601b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   601c0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   601c8: 85 10 00 00 a2 4f ff ff      	call -0xb05e ; target 0x7ee0
   601d0: b7 01 00 00 e7 07 00 00      	mov64 r1, 0x7e7
   601d8: 85 10 00 00 81 74 00 00      	call 0x7481 ; target 0x9a5e8
   601e0: 05 00 a2 ff 00 00 00 00      	ja -0x5e <.text+0x5fdd8>
   601e8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   601f0: b7 02 00 00 0a 00 00 00      	mov64 r2, 0xa
   601f8: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   60208: 85 10 00 00 c7 86 00 00      	call 0x86c7 ; target 0xa3848
   60210: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   60218: 85 10 00 00 79 74 00 00      	call 0x7479 ; target 0x9a5e8
   60220: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60228: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60230: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   60240: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   60248: 85 10 00 00 58 47 ff ff      	call -0xb8a8 ; target 0x3d10
   60250: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60258: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60260: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60268: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60270: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60278: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   60280: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60288: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   60290: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60298: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   602a0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   602a8: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   602b0: 05 00 20 00 00 00 00 00      	ja +0x20 <.text+0x60298>
   602b8: 18 01 00 00 f8 11 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb11f8
   602c8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   602d0: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   602d8: 7a 0a 08 ff 01 00 00 00      	stdw [r10 - 0xf8], 0x1
   602e0: 7a 0a 18 ff 00 00 00 00      	stdw [r10 - 0xe8], 0x0
   602e8: 7a 0a 10 ff 08 00 00 00      	stdw [r10 - 0xf0], 0x8
   602f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   602f8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   60300: 18 02 00 00 08 12 0b 00 00 00 00 00 00 00 00 00      	lddw r2, 0xb1208
   60310: 85 10 00 00 ae 88 00 00      	call 0x88ae ; target 0xa4888
   60318: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   60320: 85 10 00 00 58 74 00 00      	call 0x7458 ; target 0x9a5e8
   60328: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60330: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60338: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   60348: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   60350: 85 10 00 00 37 47 ff ff      	call -0xb8c9 ; target 0x3d10
   60358: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60360: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60368: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60370: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60378: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60380: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   60388: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60390: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   60398: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   603a0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   603a8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   603b0: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   603b8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   603c0: 05 00 83 ff 00 00 00 00      	ja -0x7d <.text+0x5fec0>
   603c8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   603d0: 85 10 00 00 42 74 00 00      	call 0x7442 ; target 0x9a5e8
   603d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   603e0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   603e8: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   603f8: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   60400: 05 00 5d ff 00 00 00 00      	ja -0xa3 <.text+0x5fdd0>
   60408: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   60410: 85 10 00 00 3a 74 00 00      	call 0x743a ; target 0x9a5e8
   60418: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60420: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60428: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   60438: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   60440: 85 10 00 00 19 47 ff ff      	call -0xb8e7 ; target 0x3d10
   60448: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60450: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60458: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60460: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60468: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60470: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   60478: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60480: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   60488: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60490: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   60498: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   604a0: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   604a8: 05 00 e1 ff 00 00 00 00      	ja -0x1f <.text+0x60298>
   604b0: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   604b8: 85 10 00 00 25 74 00 00      	call 0x7425 ; target 0x9a5e8
   604c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   604c8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   604d0: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   604e0: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   604e8: 85 10 00 00 04 47 ff ff      	call -0xb8fc ; target 0x3d10
   604f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   604f8: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60500: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60508: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60510: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60518: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   60520: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60528: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   60530: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60538: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   60540: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60548: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   60550: 05 00 cc ff 00 00 00 00      	ja -0x34 <.text+0x60298>
   60558: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60560: 85 10 00 00 10 74 00 00      	call 0x7410 ; target 0x9a5e8
   60568: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60570: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60578: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   60588: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   60590: 05 00 2b ff 00 00 00 00      	ja -0xd5 <.text+0x5fdd0>
   60598: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   605a0: 85 10 00 00 08 74 00 00      	call 0x7408 ; target 0x9a5e8
   605a8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   605b0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   605b8: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   605c8: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   605d0: 85 10 00 00 e7 46 ff ff      	call -0xb919 ; target 0x3d10
   605d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   605e0: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   605e8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   605f0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   605f8: 7b 3a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r3
   60600: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   60608: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   60610: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   60618: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   60620: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   60628: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   60630: 7b 9a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r9
   60638: 7b 8a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r8
   60640: 7b 7a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r7
   60648: 7b 6a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r6
   60650: 05 00 31 ff 00 00 00 00      	ja -0xcf <.text+0x5fec0>
   60658: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60660: 85 10 00 00 f0 73 00 00      	call 0x73f0 ; target 0x9a5e8
   60668: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60670: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60678: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   60688: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   60690: 05 00 0b ff 00 00 00 00      	ja -0xf5 <.text+0x5fdd0>
   60698: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   606a0: 85 10 00 00 e8 73 00 00      	call 0x73e8 ; target 0x9a5e8
   606a8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   606b0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   606b8: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   606c8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   606d0: 85 10 00 00 c7 46 ff ff      	call -0xb939 ; target 0x3d10
   606d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   606e0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   606e8: 05 00 10 ff 00 00 00 00      	ja -0xf0 <.text+0x5fe50>
   606f0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   606f8: 85 10 00 00 dd 73 00 00      	call 0x73dd ; target 0x9a5e8
   60700: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60708: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60710: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   60720: 05 00 22 ff 00 00 00 00      	ja -0xde <.text+0x5ff18>
   60728: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60730: 85 10 00 00 d6 73 00 00      	call 0x73d6 ; target 0x9a5e8
   60738: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60740: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60748: 18 03 00 00 31 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade31 ; data 'associated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsharing_configassociated_us'
   60758: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   60760: 05 00 f1 fe 00 00 00 00      	ja -0x10f <.text+0x5fdd0>
   60768: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60770: 85 10 00 00 ce 73 00 00      	call 0x73ce ; target 0x9a5e8
   60778: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60780: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60788: 18 03 00 00 37 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc37 ; data 'fee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountp'
   60798: 05 00 13 ff 00 00 00 00      	ja -0xed <.text+0x5ff18>
   607a0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   607a8: 85 10 00 00 c7 73 00 00      	call 0x73c7 ; target 0x9a5e8
   607b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   607b8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   607c0: 18 03 00 00 44 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc44 ; data 'fee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_tok'
   607d0: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   607d8: 05 00 e2 fe 00 00 00 00      	ja -0x11e <.text+0x5fdd0>
   607e0: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   607e8: 85 10 00 00 bf 73 00 00      	call 0x73bf ; target 0x9a5e8
   607f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   607f8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60800: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   60810: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   60818: 85 10 00 00 9e 46 ff ff      	call -0xb962 ; target 0x3d10
   60820: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60828: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60830: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60838: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60840: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60848: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   60850: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60858: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   60860: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60868: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   60870: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60878: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   60880: 05 00 66 ff 00 00 00 00      	ja -0x9a <.text+0x60298>
   60888: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   60890: 85 10 00 00 aa 73 00 00      	call 0x73aa ; target 0x9a5e8
   60898: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   608a0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   608a8: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   608b8: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   608c0: 85 10 00 00 89 46 ff ff      	call -0xb977 ; target 0x3d10
   608c8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   608d0: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   608d8: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   608e0: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   608e8: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   608f0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   608f8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60900: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   60908: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60910: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   60918: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60920: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   60928: 05 00 51 ff 00 00 00 00      	ja -0xaf <.text+0x60298>
   60930: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60938: 05 00 2c fc 00 00 00 00      	ja -0x3d4 <.text+0x5e980>
   60940: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60948: 85 10 00 00 93 73 00 00      	call 0x7393 ; target 0x9a5e8
   60950: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60958: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60960: 18 03 00 00 f5 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddf5 ; data 'creator_vaultmayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bond'
   60970: 05 00 d8 fe 00 00 00 00      	ja -0x128 <.text+0x5ff18>
   60978: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60980: 85 10 00 00 8c 73 00 00      	call 0x738c ; target 0x9a5e8
   60988: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60990: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60998: 18 03 00 00 6c de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade6c ; data 'associated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpected variant tag: payermint_auth'
   609a8: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   609b0: 05 00 a7 fe 00 00 00 00      	ja -0x159 <.text+0x5fdd0>
   609b8: b7 01 00 00 dc 07 00 00      	mov64 r1, 0x7dc
   609c0: 85 10 00 00 84 73 00 00      	call 0x7384 ; target 0x9a5e8
   609c8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   609d0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   609d8: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   609e8: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   609f0: 85 10 00 00 63 46 ff ff      	call -0xb99d ; target 0x3d10
   609f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60a00: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   60a10: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   60a18: 7b 9a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r9
   60a20: 7b 8a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r8
   60a28: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   60a30: 7b 6a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r6
   60a38: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   60a48: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   60a50: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   60a60: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   60a68: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   60a78: 05 00 27 ff 00 00 00 00      	ja -0xd9 <.text+0x60298>
   60a80: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60a88: 85 10 00 00 6b 73 00 00      	call 0x736b ; target 0x9a5e8
   60a90: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60a98: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60aa0: 18 03 00 00 6b dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd6b ; data 'user_volume_accumulatorfee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpoo'
   60ab0: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   60ab8: 05 00 86 fe 00 00 00 00      	ja -0x17a <.text+0x5fdd0>
   60ac0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60ac8: 85 10 00 00 63 73 00 00      	call 0x7363 ; target 0x9a5e8
   60ad0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60ad8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60ae0: 18 03 00 00 92 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade92
   60af0: b7 04 00 00 22 00 00 00      	mov64 r4, 0x22
   60af8: 05 00 7e fe 00 00 00 00      	ja -0x182 <.text+0x5fdd0>
   60b00: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   60b08: 85 10 00 00 5b 73 00 00      	call 0x735b ; target 0x9a5e8
   60b10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60b18: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60b20: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   60b30: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   60b38: 85 10 00 00 3a 46 ff ff      	call -0xb9c6 ; target 0x3d10
   60b40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60b48: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   60b50: 05 00 52 ff 00 00 00 00      	ja -0xae <.text+0x604c8>
   60b58: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60b60: 85 10 00 00 50 73 00 00      	call 0x7350 ; target 0x9a5e8
   60b68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60b70: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60b78: 18 03 00 00 9e dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd9e ; data 'buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_bas'
   60b88: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   60b90: 05 00 6b fe 00 00 00 00      	ja -0x195 <.text+0x5fdd0>
   60b98: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   60ba0: 85 10 00 00 48 73 00 00      	call 0x7348 ; target 0x9a5e8
   60ba8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   60bb0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   60bb8: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   60bc8: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   60bd0: 05 00 63 fe 00 00 00 00      	ja -0x19d <.text+0x5fdd0>
