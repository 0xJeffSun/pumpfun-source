   7e490: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   7e498: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   7e4a0: 55 04 2e 00 00 00 00 00      	jne r4, 0x0, +0x2e <.text+0x7e4f8>
   7e4a8: 7b 7a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r7
   7e4b0: 7b 2a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r2
   7e4b8: 79 57 08 f0 00 00 00 00      	ldxdw r7, [r5 - 0xff8]
   7e4c0: 79 56 00 f0 00 00 00 00      	ldxdw r6, [r5 - 0x1000]
   7e4c8: 79 98 18 00 00 00 00 00      	ldxdw r8, [r9 + 0x18]
   7e4d0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7e4d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   7e4e0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   7e4e8: 85 10 00 00 31 6a 02 00      	call 0x26a31
   7e4f0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   7e4f8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   7e500: 15 00 66 00 00 00 00 00      	jeq r0, 0x0, +0x66 <.text+0x7e718>
   7e508: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e510: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   7e518: 18 02 00 00 1c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f1c
   7e528: 85 10 00 00 ca b1 01 00      	call 0x1b1ca
   7e530: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7e538: 7a 0a c0 ff 01 00 00 00      	stdw [r10 - 0x40], 0x1
   7e540: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7e548: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7e558: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   7e560: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e568: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   7e570: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   7e578: 72 0a 60 fe 03 00 00 00      	stb [r10 - 0x1a0], 0x3
   7e580: 7a 0a 58 fe 20 00 00 00      	stdw [r10 - 0x1a8], 0x20
   7e588: 7a 0a 38 fe 00 00 00 00      	stdw [r10 - 0x1c8], 0x0
   7e590: 7a 0a 28 fe 00 00 00 00      	stdw [r10 - 0x1d8], 0x0
   7e598: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e5a0: 07 02 00 00 28 fe ff ff      	add64 r2, -0x1d8
   7e5a8: 18 01 00 00 1c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f1c
   7e5b8: 85 10 00 00 19 bf 01 00      	call 0x1bf19
   7e5c0: 15 00 1b 00 00 00 00 00      	jeq r0, 0x0, +0x1b <.text+0x7e580>
   7e5c8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7e5d0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7e5d8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   7e5e8: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   7e5f0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   7e600: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   7e610: 85 10 00 00 00 5d 02 00      	call 0x25d00
   7e618: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   7e620: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   7e628: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   7e630: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   7e638: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   7e640: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   7e648: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   7e650: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   7e658: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   7e660: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e668: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   7e670: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7e678: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   7e680: 85 10 00 00 b6 33 00 00      	call 0x33b6
   7e688: 79 a6 70 fd 00 00 00 00      	ldxdw r6, [r10 - 0x290]
   7e690: 79 a8 68 fd 00 00 00 00      	ldxdw r8, [r10 - 0x298]
   7e698: 05 00 8f 00 00 00 00 00      	ja +0x8f <.text+0x7e9f8>
   7e6a0: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   7e6a8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7e6b0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   7e6b8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7e6c0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   7e6c8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7e6d0: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   7e6d8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   7e6e0: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   7e6e8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   7e6f0: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   7e6f8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7e700: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   7e710: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7e718: 62 0a 70 ff 7a 17 00 00      	stw [r10 - 0x90], 0x177a
   7e720: 72 0a 28 ff 02 00 00 00      	stb [r10 - 0xd8], 0x2
   7e728: 62 0a f0 fe ac 00 00 00      	stw [r10 - 0x110], 0xac
   7e730: 7a 0a e8 fe 1d 00 00 00      	stdw [r10 - 0x118], 0x1d
   7e738: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   7e740: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e748: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   7e750: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e758: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   7e760: 85 10 00 00 79 3a 02 00      	call 0x23a79
   7e768: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   7e770: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   7e778: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   7e780: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7e788: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   7e790: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   7e798: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   7e7a0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7e7a8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   7e7b0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   7e7b8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   7e7c0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   7e7c8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   7e7d0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   7e7d8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   7e7e0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7e7e8: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   7e7f0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7e7f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e800: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   7e808: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   7e810: 07 04 00 00 d8 fe ff ff      	add64 r4, -0x128
   7e818: 85 10 00 00 33 3b 02 00      	call 0x23b33
   7e820: 79 a6 e0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x220]
   7e828: 79 a8 d8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x228]
   7e830: 05 00 5b 00 00 00 00 00      	ja +0x5b <.text+0x7e9f0>
   7e838: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e840: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   7e848: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   7e850: 85 10 00 00 8a 48 02 00      	call 0x2488a
   7e858: 79 a4 e8 fe 00 00 00 00      	ldxdw r4, [r10 - 0x118]
   7e860: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   7e868: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   7e870: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   7e880: 1d 32 01 00 00 00 00 00      	jeq r2, r3, +0x1 <.text+0x7e770>
   7e888: 05 00 46 00 00 00 00 00      	ja +0x46 <.text+0x7e9a0>
   7e890: 7b 4a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r4
   7e898: 7b 6a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r6
   7e8a0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   7e8a8: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
   7e8b0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   7e8b8: 7b 2a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r2
   7e8c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e8c8: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   7e8d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e8d8: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   7e8e0: 85 10 00 00 bd 0e 02 00      	call 0x20ebd
   7e8e8: 79 a6 e0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x120]
   7e8f0: 79 a8 d8 fe 00 00 00 00      	ldxdw r8, [r10 - 0x128]
   7e8f8: 61 a1 60 ff 00 00 00 00      	ldxw r1, [r10 - 0xa0]
   7e900: 15 01 77 00 02 00 00 00      	jeq r1, 0x2, +0x77 <.text+0x7eba0>
   7e908: 7b 1a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r1
   7e910: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e918: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   7e920: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e928: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7e930: b7 03 00 00 78 00 00 00      	mov64 r3, 0x78
   7e938: 85 10 00 00 9a 69 02 00      	call 0x2699a
   7e940: 79 a1 64 ff 00 00 00 00      	ldxdw r1, [r10 - 0x9c]
   7e948: 7b 1a b4 fe 00 00 00 00      	stxdw [r10 - 0x14c], r1
   7e950: 79 a1 6c ff 00 00 00 00      	ldxdw r1, [r10 - 0x94]
   7e958: 7b 1a bc fe 00 00 00 00      	stxdw [r10 - 0x144], r1
   7e960: 79 a1 74 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8c]
   7e968: 7b 1a c4 fe 00 00 00 00      	stxdw [r10 - 0x13c], r1
   7e970: 79 a1 7c ff 00 00 00 00      	ldxdw r1, [r10 - 0x84]
   7e978: 7b 1a cc fe 00 00 00 00      	stxdw [r10 - 0x134], r1
   7e980: 61 a1 84 ff 00 00 00 00      	ldxw r1, [r10 - 0x7c]
   7e988: 63 1a d4 fe 00 00 00 00      	stxw [r10 - 0x12c], r1
   7e990: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   7e998: 63 1a b0 fe 00 00 00 00      	stxw [r10 - 0x150], r1
   7e9a0: 7b 6a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r6
   7e9a8: 7b 8a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r8
   7e9b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e9b8: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   7e9c0: 79 a6 48 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2b8]
   7e9c8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   7e9d0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   7e9d8: 85 10 00 00 93 69 02 00      	call 0x26993
   7e9e0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   7e9e8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   7e9f0: 15 00 5f 00 00 00 00 00      	jeq r0, 0x0, +0x5f <.text+0x7ebd0>
   7e9f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ea00: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7ea08: 18 02 00 00 b4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5db4
   7ea18: 85 10 00 00 2c b1 01 00      	call 0x1b12c
   7ea20: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7ea28: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7ea30: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7ea38: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7ea48: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7ea50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ea58: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7ea60: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7ea68: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7ea70: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7ea78: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7ea80: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7ea88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ea90: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7ea98: 18 01 00 00 b4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5db4
   7eaa8: 85 10 00 00 7b be 01 00      	call 0x1be7b
   7eab0: 15 00 0f 00 00 00 00 00      	jeq r0, 0x0, +0xf <.text+0x7ea10>
   7eab8: 05 00 61 ff 00 00 00 00      	ja -0x9f <.text+0x7e4a8>
   7eac0: 7b 4a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r4
   7eac8: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7ead0: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   7ead8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7eae0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   7eae8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7eaf0: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   7eaf8: 85 10 00 00 17 3a 02 00      	call 0x23a17
   7eb00: 79 a6 d0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x230]
   7eb08: 79 a8 c8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x238]
   7eb10: 79 a7 60 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2a0]
   7eb18: 7b 67 08 00 00 00 00 00      	stxdw [r7 + 0x8], r6
   7eb20: 7b 87 00 00 00 00 00 00      	stxdw [r7 + 0x0], r8
   7eb28: 95 00 00 00 00 00 00 00      	exit
   7eb30: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7eb38: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7eb40: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7eb48: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7eb50: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7eb58: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7eb60: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7eb68: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   7eb70: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7eb78: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   7eb80: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7eb88: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7eb90: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   7eba0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7eba8: 62 0a 70 ff 74 17 00 00      	stw [r10 - 0x90], 0x1774
   7ebb0: 72 0a 28 ff 02 00 00 00      	stb [r10 - 0xd8], 0x2
   7ebb8: 62 0a f0 fe b4 00 00 00      	stw [r10 - 0x110], 0xb4
   7ebc0: 7a 0a e8 fe 1d 00 00 00      	stdw [r10 - 0x118], 0x1d
   7ebc8: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   7ebd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ebd8: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   7ebe0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ebe8: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   7ebf0: 85 10 00 00 e7 39 02 00      	call 0x239e7
   7ebf8: 79 a3 c0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x240]
   7ec00: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   7ec08: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   7ec10: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7ec18: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   7ec20: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   7ec28: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   7ec30: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7ec38: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   7ec40: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   7ec48: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   7ec50: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   7ec58: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   7ec60: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   7ec68: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   7ec70: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7ec78: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   7ec80: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7ec88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ec90: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   7ec98: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   7eca0: 07 04 00 00 d8 fe ff ff      	add64 r4, -0x128
   7eca8: 85 10 00 00 a1 3a 02 00      	call 0x23aa1
   7ecb0: 79 a6 b0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x250]
   7ecb8: 79 a8 a8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x258]
   7ecc0: 79 a7 60 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2a0]
   7ecc8: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   7ecd0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   7ecd8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   7ece0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   7ece8: 05 00 c5 ff 00 00 00 00      	ja -0x3b <.text+0x7e9f8>
   7ecf0: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   7ecf8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   7ed00: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   7ed08: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   7ed10: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   7ed18: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   7ed20: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   7ed28: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   7ed30: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   7ed38: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   7ed40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   7ed48: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   7ed50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ed58: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   7ed60: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7ed68: 07 03 00 00 f8 fd ff ff      	add64 r3, -0x208
   7ed70: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   7ed78: 85 10 00 00 d7 32 00 00      	call 0x32d7
   7ed80: 79 a8 98 fd 00 00 00 00      	ldxdw r8, [r10 - 0x268]
   7ed88: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0x7ec78>
   7ed90: 05 00 4b 00 00 00 00 00      	ja +0x4b <.text+0x7eed0>
   7ed98: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   7eda0: 79 96 00 00 00 00 00 00      	ldxdw r6, [r9 + 0x0]
   7eda8: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   7edb0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   7edb8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   7edc0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   7edc8: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   7edd0: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   7edd8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   7ede0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   7ede8: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   7edf0: 07 08 00 00 d8 fe ff ff      	add64 r8, -0x128
   7edf8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ee00: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   7ee08: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7ee10: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   7ee18: 85 10 00 00 78 34 02 00      	call 0x23478
   7ee20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ee28: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   7ee30: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   7ee38: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   7ee40: 85 10 00 00 06 69 02 00      	call 0x26906
   7ee48: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   7ee50: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   7ee58: 15 00 34 00 00 00 00 00      	jeq r0, 0x0, +0x34 <.text+0x7eee0>
   7ee60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ee68: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   7ee70: 18 02 00 00 9c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e9c
   7ee80: 85 10 00 00 15 3f 02 00      	call 0x23f15
   7ee88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ee90: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   7ee98: 18 02 00 00 9c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e9c
   7eea8: 85 10 00 00 76 17 ff ff      	call -0xe88a
   7eeb0: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   7eec0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7eec8: 72 0a 28 ff 02 00 00 00      	stb [r10 - 0xd8], 0x2
   7eed0: 62 0a f0 fe bc 00 00 00      	stw [r10 - 0x110], 0xbc
   7eed8: 7a 0a e8 fe 1d 00 00 00      	stdw [r10 - 0x118], 0x1d
   7eee0: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   7eee8: 62 0a 70 ff d6 07 00 00      	stw [r10 - 0x90], 0x7d6
   7eef0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7eef8: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   7ef00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ef08: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   7ef10: 85 10 00 00 83 39 02 00      	call 0x23983
   7ef18: 79 a8 90 fd 00 00 00 00      	ldxdw r8, [r10 - 0x270]
   7ef20: 79 a9 88 fd 00 00 00 00      	ldxdw r9, [r10 - 0x278]
   7ef28: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   7ef30: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7ef38: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   7ef40: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   7ef48: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   7ef50: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   7ef58: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   7ef60: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   7ef68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ef70: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   7ef78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ef80: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   7ef88: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   7ef90: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   7ef98: 85 10 00 00 48 34 02 00      	call 0x23448
   7efa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7efa8: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   7efb0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   7efb8: 07 04 00 00 d8 fe ff ff      	add64 r4, -0x128
   7efc0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   7efc8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   7efd0: 85 10 00 00 3c 3a 02 00      	call 0x23a3c
   7efd8: 79 a6 80 fd 00 00 00 00      	ldxdw r6, [r10 - 0x280]
   7efe0: 79 a8 78 fd 00 00 00 00      	ldxdw r8, [r10 - 0x288]
   7efe8: 05 00 64 ff 00 00 00 00      	ja -0x9c <.text+0x7e9f0>
   7eff0: 79 a6 a0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x260]
   7eff8: 05 00 62 ff 00 00 00 00      	ja -0x9e <.text+0x7e9f0>
   7f000: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   7f008: 05 00 60 ff 00 00 00 00      	ja -0xa0 <.text+0x7e9f0>
