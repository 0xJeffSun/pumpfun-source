   6a1e0: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   6a1e8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   6a1f0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   6a1f8: 25 03 22 00 6b 00 00 00      	jgt r3, 0x6b, +0x22 <.text+0x6a1f0>
   6a200: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a208: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   6a210: 18 02 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e00
   6a220: 85 10 00 00 2b da 01 00      	call 0x1da2b
   6a228: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   6a230: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   6a238: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   6a240: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   6a250: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   6a258: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a260: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   6a268: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   6a270: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   6a278: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   6a280: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   6a288: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   6a290: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a298: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   6a2a0: 18 01 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e00
   6a2b0: 85 10 00 00 7a e7 01 00      	call 0x1e77a
   6a2b8: 15 00 27 00 00 00 00 00      	jeq r0, 0x0, +0x27 <.text+0x6a2d8>
   6a2c0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   6a2c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   6a2d0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   6a2e0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   6a2e8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   6a2f8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   6a308: 85 10 00 00 61 85 02 00      	call 0x28561
   6a310: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   6a318: 18 02 00 00 38 f4 23 ee 00 00 00 00 c1 d5 a2 c9      	lddw r2, -0x365d2a3e11dc0bc8
   6a328: 1d 21 51 00 00 00 00 00      	jeq r1, r2, +0x51 <.text+0x6a498>
   6a330: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a338: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   6a340: 18 02 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e00
   6a350: 85 10 00 00 05 da 01 00      	call 0x1da05
   6a358: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   6a360: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   6a368: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   6a370: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   6a380: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   6a388: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a390: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   6a398: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   6a3a0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   6a3a8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   6a3b0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   6a3b8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   6a3c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a3c8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   6a3d0: 18 01 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e00
   6a3e0: 85 10 00 00 54 e7 01 00      	call 0x1e754
   6a3e8: 15 00 1d 00 00 00 00 00      	jeq r0, 0x0, +0x1d <.text+0x6a3b8>
   6a3f0: 05 00 d9 ff 00 00 00 00      	ja -0x27 <.text+0x6a1a0>
   6a3f8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   6a400: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   6a408: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   6a410: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   6a418: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6a420: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6a428: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   6a430: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   6a438: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6a440: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6a448: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6a450: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6a458: 18 01 00 00 f5 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ef5
   6a468: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   6a470: 62 0a 80 ff bb 17 00 00      	stw [r10 - 0x80], 0x17bb
   6a478: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   6a480: 62 0a 00 ff 91 00 00 00      	stw [r10 - 0x100], 0x91
   6a488: 7a 0a f8 fe 28 00 00 00      	stdw [r10 - 0x108], 0x28
   6a490: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   6a498: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a4a0: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   6a4a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a4b0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   6a4b8: 85 10 00 00 ce 62 02 00      	call 0x262ce
   6a4c0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   6a4c8: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   6a4d0: 05 00 75 00 00 00 00 00      	ja +0x75 <.text+0x6a760>
   6a4d8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   6a4e0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   6a4e8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   6a4f0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   6a4f8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6a500: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6a508: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   6a510: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   6a518: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6a520: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6a528: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6a530: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6a538: 18 01 00 00 f5 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ef5
   6a548: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   6a550: 62 0a 80 ff bb 17 00 00      	stw [r10 - 0x80], 0x17bb
   6a558: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   6a560: 62 0a 00 ff 92 00 00 00      	stw [r10 - 0x100], 0x92
   6a568: 7a 0a f8 fe 28 00 00 00      	stdw [r10 - 0x108], 0x28
   6a570: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   6a578: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a580: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   6a588: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a590: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   6a598: 85 10 00 00 b2 62 02 00      	call 0x262b2
   6a5a0: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   6a5a8: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   6a5b0: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0x6a760>
   6a5b8: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   6a5c0: 61 72 68 00 00 00 00 00      	ldxw r2, [r7 + 0x68]
   6a5c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a5d0: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   6a5d8: 85 10 00 00 67 fc ff ff      	call -0x399
   6a5e0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   6a5e8: 55 01 1b 00 02 00 00 00      	jne r1, 0x2, +0x1b <.text+0x6a5a8>
   6a5f0: 7b 6a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r6
   6a5f8: 79 a6 f0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x110]
   6a600: a5 06 1a 00 6c 00 00 00      	jlt r6, 0x6c, +0x1a <.text+0x6a5b8>
   6a608: 2d 96 19 00 00 00 00 00      	jgt r6, r9, +0x19 <.text+0x6a5b8>
   6a610: 07 06 00 00 94 ff ff ff      	add64 r6, -0x6c
   6a618: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   6a620: 97 01 00 00 28 00 00 00      	mod64 r1, 0x28
   6a628: 1f 16 00 00 00 00 00 00      	sub64 r6, r1
   6a630: 07 07 00 00 6c 00 00 00      	add64 r7, 0x6c
   6a638: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   6a640: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   6a648: a5 06 0b 00 28 00 00 00      	jlt r6, 0x28, +0xb <.text+0x6a588>
   6a650: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   6a658: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   6a660: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   6a668: 85 10 00 00 01 92 02 00      	call 0x29201
   6a670: 07 06 00 00 d8 ff ff ff      	add64 r6, -0x28
   6a678: 07 07 00 00 28 00 00 00      	add64 r7, 0x28
   6a680: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   6a688: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   6a690: 55 00 f5 ff 00 00 00 00      	jne r0, 0x0, -0xb <.text+0x6a520>
   6a698: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   6a6a0: 79 72 f8 ff 00 00 00 00      	ldxdw r2, [r7 - 0x8]
   6a6a8: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
   6a6b0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   6a6b8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   6a6c0: 05 00 3a 00 00 00 00 00      	ja +0x3a <.text+0x6a778>
   6a6c8: 79 a2 f0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x110]
   6a6d0: 05 00 35 00 00 00 00 00      	ja +0x35 <.text+0x6a760>
   6a6d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a6e0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   6a6e8: 18 02 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e00
   6a6f8: 85 10 00 00 90 d9 01 00      	call 0x1d990
   6a700: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   6a708: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   6a710: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   6a718: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   6a728: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   6a730: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a738: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   6a740: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   6a748: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   6a750: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   6a758: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   6a760: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   6a768: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a770: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   6a778: 18 01 00 00 00 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e00
   6a788: 85 10 00 00 df e6 01 00      	call 0x1e6df
   6a790: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
   6a798: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x6a688>
   6a7a0: 05 00 63 ff 00 00 00 00      	ja -0x9d <.text+0x6a1a0>
   6a7a8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   6a7b0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   6a7b8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   6a7c0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   6a7c8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6a7d0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6a7d8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   6a7e0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   6a7e8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6a7f0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6a7f8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6a800: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6a808: 18 01 00 00 f5 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ef5
   6a818: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   6a820: 62 0a 80 ff bb 17 00 00      	stw [r10 - 0x80], 0x17bb
   6a828: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   6a830: 62 0a 00 ff 9e 00 00 00      	stw [r10 - 0x100], 0x9e
   6a838: 7a 0a f8 fe 28 00 00 00      	stdw [r10 - 0x108], 0x28
   6a840: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   6a848: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6a850: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   6a858: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6a860: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   6a868: 85 10 00 00 58 62 02 00      	call 0x26258
   6a870: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   6a878: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   6a880: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   6a888: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   6a890: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
   6a898: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
   6a8a0: 95 00 00 00 00 00 00 00      	exit
