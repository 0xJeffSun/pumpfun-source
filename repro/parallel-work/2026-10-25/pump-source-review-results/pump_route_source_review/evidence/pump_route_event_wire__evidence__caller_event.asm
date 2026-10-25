   5e450: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   5e458: 79 a2 30 f5 00 00 00 00      	ldxdw r2, [r10 - 0xad0]
   5e460: 1f 21 00 00 00 00 00 00      	sub64 r1, r2
   5e468: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5e470: 67 03 00 00 20 00 00 00      	lsh64 r3, 0x20
   5e478: 77 03 00 00 20 00 00 00      	rsh64 r3, 0x20
   5e480: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e488: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5e378>
   5e490: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5e498: 79 a9 58 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6a8]
   5e4a0: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5e4a8: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   5e4b0: 7a 0a b8 fd 00 00 00 00      	stdw [r10 - 0x248], 0x0
   5e4b8: 7a 0a b0 fd 00 00 00 00      	stdw [r10 - 0x250], 0x0
   5e4c0: 7a 0a a8 fd 00 00 00 00      	stdw [r10 - 0x258], 0x0
   5e4c8: 7a 0a a0 fd 00 00 00 00      	stdw [r10 - 0x260], 0x0
   5e4d0: 7a 0a c0 fd 00 00 00 00      	stdw [r10 - 0x240], 0x0
   5e4d8: 7a 0a c8 fd 00 00 00 00      	stdw [r10 - 0x238], 0x0
   5e4e0: 7a 0a d0 fd 00 00 00 00      	stdw [r10 - 0x230], 0x0
   5e4e8: 7a 0a d8 fd 00 00 00 00      	stdw [r10 - 0x228], 0x0
   5e4f0: 7a 0a e0 fd 00 00 00 00      	stdw [r10 - 0x220], 0x0
   5e4f8: 7a 0a e8 fd 00 00 00 00      	stdw [r10 - 0x218], 0x0
   5e500: 7a 0a f0 fd 00 00 00 00      	stdw [r10 - 0x210], 0x0
   5e508: 7a 0a f8 fd 00 00 00 00      	stdw [r10 - 0x208], 0x0
   5e510: 6a 0a 00 fe 00 00 00 00      	sth [r10 - 0x200], 0x0
   5e518: 79 64 18 00 00 00 00 00      	ldxdw r4, [r6 + 0x18]
   5e520: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e528: 79 45 18 00 00 00 00 00      	ldxdw r5, [r4 + 0x18]
   5e530: 7b 5a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r5
   5e538: 79 45 10 00 00 00 00 00      	ldxdw r5, [r4 + 0x10]
   5e540: 7b 5a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r5
   5e548: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5e550: 7b 5a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r5
   5e558: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e560: 7b 4a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r4
   5e568: 79 a4 58 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaa8]
   5e570: 79 44 58 00 00 00 00 00      	ldxdw r4, [r4 + 0x58]
   5e578: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e580: 79 45 18 00 00 00 00 00      	ldxdw r5, [r4 + 0x18]
   5e588: 7b 5a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r5
   5e590: 79 45 10 00 00 00 00 00      	ldxdw r5, [r4 + 0x10]
   5e598: 7b 5a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r5
   5e5a0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5e5a8: 7b 5a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r5
   5e5b0: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e5b8: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   5e5c0: 18 04 00 00 c8 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b6ec8
   5e5d0: 7b 4a 40 f0 00 00 00 00      	stxdw [r10 - 0xfc0], r4
   5e5d8: 7b 8a 38 f0 00 00 00 00      	stxdw [r10 - 0xfc8], r8
   5e5e0: 7b 1a 30 f0 00 00 00 00      	stxdw [r10 - 0xfd0], r1
   5e5e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e5f0: 07 01 00 00 d0 f8 ff ff      	add64 r1, -0x730
   5e5f8: 7b 1a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r1
   5e600: 79 a1 10 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf0]
   5e608: 7b 1a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r1
   5e610: 79 a1 88 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa78]
   5e618: 7b 1a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r1
   5e620: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e628: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e630: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5e638: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e640: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e648: 07 01 00 00 68 fb ff ff      	add64 r1, -0x498
   5e650: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e658: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5e660: 7b 9a 50 f0 00 00 00 00      	stxdw [r10 - 0xfb0], r9
   5e668: 7a 0a 48 f0 0e 00 00 00      	stdw [r10 - 0xfb8], 0xe
   5e670: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e678: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5e680: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e688: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5e690: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e698: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e6a0: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5e6a8: 85 10 00 00 a4 5a 00 00      	call 0x5aa4
   5e6b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6b8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5e6c0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e6c8: 85 10 00 00 bc 07 02 00      	call 0x207bc
   5e6d0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5e6d8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5e6e0: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5e6e8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5e6f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6f8: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5e700: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e708: 85 10 00 00 bd 83 02 00      	call 0x283bd
   5e710: 07 06 00 00 60 00 00 00      	add64 r6, 0x60
   5e718: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5e720: 07 08 00 00 d8 fa ff ff      	add64 r8, -0x528
   5e728: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5e730: 7b 6a b8 f5 00 00 00 00      	stxdw [r10 - 0xa48], r6
   5e738: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5e740: 85 10 00 00 a6 64 ff ff      	call -0x9b5a
   5e748: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e750: 07 01 00 00 08 fb ff ff      	add64 r1, -0x4f8
   5e758: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e760: 85 10 00 00 a9 07 02 00      	call 0x207a9
   5e768: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b64bf
   5e778: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b64bf
   5e788: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5e790: 7b 2a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r2
   5e798: 7b 1a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r1
   5e7a0: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   5e7a8: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5e7b0: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5e7b8: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   5e7c0: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   5e7c8: 79 a2 18 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4e8]
   5e7d0: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   5e7d8: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5e7e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e7e8: 07 01 00 00 80 fc ff ff      	add64 r1, -0x380
   5e7f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e7f8: 07 02 00 00 20 fb ff ff      	add64 r2, -0x4e0
   5e800: 85 10 00 00 5c 68 ff ff      	call -0x97a4
   5e808: 79 a7 88 fc 00 00 00 00      	ldxdw r7, [r10 - 0x378]
   5e810: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   5e818: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5e820: b7 01 00 00 22 00 00 00      	mov64 r1, 0x22
   5e828: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e830: 85 10 00 00 91 5d ff ff      	call -0xa26f
   5e838: 79 a1 d8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x528]
   5e840: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e848: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5e850: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5e858: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e860: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   5e868: 7b 40 08 00 00 00 00 00      	stxdw [r0 + 0x8], r4
   5e870: 7b 30 10 00 00 00 00 00      	stxdw [r0 + 0x10], r3
   5e878: 7b 20 18 00 00 00 00 00      	stxdw [r0 + 0x18], r2
   5e880: 6a 00 20 00 01 00 00 00      	sth [r0 + 0x20], 0x1
   5e888: 7b 0a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r0
   5e890: 7a 0a c0 fc 01 00 00 00      	stdw [r10 - 0x340], 0x1
   5e898: 7a 0a d0 fc 01 00 00 00      	stdw [r10 - 0x330], 0x1
   5e8a0: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5e8a8: 07 06 00 00 a0 fd ff ff      	add64 r6, -0x260
   5e8b0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e8b8: 07 05 00 00 c0 fc ff ff      	add64 r5, -0x340
   5e8c0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5e8c8: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   5e8d8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e8e0: 79 a4 88 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa78]
   5e8e8: 85 10 00 00 fe 91 02 00      	call 0x291fe
   5e8f0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e8f8: 07 07 00 00 c0 fc ff ff      	add64 r7, -0x340
   5e900: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e908: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5e910: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5e918: 85 10 00 00 9e a9 02 00      	call 0x2a99e
   5e920: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e928: 07 01 00 00 68 fb ff ff      	add64 r1, -0x498
   5e930: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   5e938: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e940: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   5e948: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   5e950: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6807
   5e960: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   5e968: 79 a1 a8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa58]
   5e970: 73 1a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r1
   5e978: 7a 0a 60 ff 02 00 00 00      	stdw [r10 - 0xa0], 0x2
   5e980: 7a 0a 80 fb 01 00 00 00      	stdw [r10 - 0x480], 0x1
   5e988: 7a 0a 70 fb 11 00 00 00      	stdw [r10 - 0x490], 0x11
   5e990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e998: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   5e9a0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e9a8: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   5e9b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e9b8: 07 01 00 00 50 fb ff ff      	add64 r1, -0x4b0
   5e9c0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e9c8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5e9d0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e9d8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5e9e0: 85 10 00 00 69 83 02 00      	call 0x28369
   5e9e8: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5e9f8: 79 a2 50 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b0]
   5ea00: 1d 12 01 00 00 00 00 00      	jeq r2, r1, +0x1 <.text+0x5e8f0>
   5ea08: 05 00 32 00 00 00 00 00      	ja +0x32 <.text+0x5ea80>
   5ea10: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5ea18: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   5ea20: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5ea28: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ea30: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5ea38: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5e938>
   5ea40: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ea48: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ea50: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ea58: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ea60: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ea68: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ea70: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5e970>
   5ea78: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ea80: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ea88: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5ea90: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5ea98: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5eaa0: 15 01 38 00 00 00 00 00      	jeq r1, 0x0, +0x38 <.text+0x5eb48>
   5eaa8: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5eab0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5eab8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5eac0: 15 01 35 01 00 00 00 00      	jeq r1, 0x0, +0x135 <.text+0x5f350>
