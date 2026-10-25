   5a260: bf 47 00 00 00 00 00 00      	mov64 r7, r4
   5a268: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   5a270: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   5a278: 79 54 18 f0 00 00 00 00      	ldxdw r4, [r5 - 0xfe8]
   5a280: 79 51 10 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff0]
   5a288: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   5a290: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
   5a298: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   5a2a0: 79 56 00 f0 00 00 00 00      	ldxdw r6, [r5 - 0x1000]
   5a2a8: 7b 4a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r4
   5a2b0: 55 09 f5 00 00 00 00 00      	jne r9, 0x0, +0xf5 <.text+0x5a940>
   5a2b8: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   5a2c0: 15 04 10 01 00 00 00 00      	jeq r4, 0x0, +0x110 <.text+0x5aa28>
   5a2c8: 79 75 08 00 00 00 00 00      	ldxdw r5, [r7 + 0x8]
   5a2d0: 79 53 00 00 00 00 00 00      	ldxdw r3, [r5 + 0x0]
   5a2d8: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   5a2e0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a2e8: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5a1d8>
   5a2f0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5a2f8: 79 21 28 00 00 00 00 00      	ldxdw r1, [r2 + 0x28]
   5a300: 79 78 00 00 00 00 00 00      	ldxdw r8, [r7 + 0x0]
   5a308: 7b 35 00 00 00 00 00 00      	stxdw [r5 + 0x0], r3
   5a310: 79 a0 68 fe 00 00 00 00      	ldxdw r0, [r10 - 0x198]
   5a318: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5a208>
   5a320: 85 10 00 00 ff ff ff ff      	call -0x1
   5a328: 79 79 10 00 00 00 00 00      	ldxdw r9, [r7 + 0x10]
   5a330: 79 93 00 00 00 00 00 00      	ldxdw r3, [r9 + 0x0]
   5a338: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   5a340: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a348: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5a238>
   5a350: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5a358: 7b 39 00 00 00 00 00 00      	stxdw [r9 + 0x0], r3
   5a360: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5a250>
   5a368: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0x5a200>
   5a370: 7b 8a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r8
   5a378: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5a380: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5a388: 7b 3a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r3
   5a390: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   5a398: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   5a3a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a3a8: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5a298>
   5a3b0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5a3b8: 71 78 2a 00 00 00 00 00      	ldxb r8, [r7 + 0x2a]
   5a3c0: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   5a3c8: 71 78 29 00 00 00 00 00      	ldxb r8, [r7 + 0x29]
   5a3d0: 7b 8a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r8
   5a3d8: 71 78 28 00 00 00 00 00      	ldxb r8, [r7 + 0x28]
   5a3e0: 7b 8a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r8
   5a3e8: 79 78 20 00 00 00 00 00      	ldxdw r8, [r7 + 0x20]
   5a3f0: 7b 8a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r8
   5a3f8: 79 77 18 00 00 00 00 00      	ldxdw r7, [r7 + 0x18]
   5a400: 7b 7a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r7
   5a408: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   5a410: 7b 7a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r7
   5a418: 79 a7 58 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1a8]
   5a420: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   5a428: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5a318>
   5a430: 05 00 dd ff 00 00 00 00      	ja -0x23 <.text+0x5a200>
   5a438: 79 17 10 00 00 00 00 00      	ldxdw r7, [r1 + 0x10]
   5a440: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   5a448: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   5a450: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a458: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5a348>
   5a460: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5a468: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   5a470: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5a360>
   5a478: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x5a200>
   5a480: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   5a488: 7b 3a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r3
   5a490: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   5a498: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   5a4a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a4a8: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5a398>
   5a4b0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5a4b8: 79 68 00 00 00 00 00 00      	ldxdw r8, [r6 + 0x0]
   5a4c0: 7b 8a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r8
   5a4c8: 71 18 2a 00 00 00 00 00      	ldxb r8, [r1 + 0x2a]
   5a4d0: 7b 8a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r8
   5a4d8: 71 18 29 00 00 00 00 00      	ldxb r8, [r1 + 0x29]
   5a4e0: 7b 8a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r8
   5a4e8: 71 18 28 00 00 00 00 00      	ldxb r8, [r1 + 0x28]
   5a4f0: 7b 8a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r8
   5a4f8: 79 18 20 00 00 00 00 00      	ldxdw r8, [r1 + 0x20]
   5a500: 7b 8a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r8
   5a508: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5a510: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5a518: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   5a520: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   5a528: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5a418>
   5a530: 05 00 bd ff 00 00 00 00      	ja -0x43 <.text+0x5a200>
   5a538: 79 68 10 00 00 00 00 00      	ldxdw r8, [r6 + 0x10]
   5a540: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5a548: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5a550: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5a558: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5a448>
   5a560: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5a568: 7b 7a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r7
   5a570: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   5a578: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x5a468>
   5a580: 05 00 b3 ff 00 00 00 00      	ja -0x4d <.text+0x5a200>
   5a588: 79 27 20 00 00 00 00 00      	ldxdw r7, [r2 + 0x20]
   5a590: 79 73 08 00 00 00 00 00      	ldxdw r3, [r7 + 0x8]
   5a598: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5a5a0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5a5a8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5a5b0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5a4a0>
   5a5b8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5a5c0: 71 64 2a 00 00 00 00 00      	ldxb r4, [r6 + 0x2a]
   5a5c8: 7b 4a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r4
   5a5d0: 71 64 29 00 00 00 00 00      	ldxb r4, [r6 + 0x29]
   5a5d8: 7b 4a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r4
   5a5e0: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   5a5e8: 7b 4a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r4
   5a5f0: 79 64 20 00 00 00 00 00      	ldxdw r4, [r6 + 0x20]
   5a5f8: 7b 4a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r4
   5a600: 79 66 18 00 00 00 00 00      	ldxdw r6, [r6 + 0x18]
   5a608: 79 74 00 00 00 00 00 00      	ldxdw r4, [r7 + 0x0]
   5a610: 7b 4a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r4
   5a618: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5a620: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5a510>
   5a628: 05 00 9e ff 00 00 00 00      	ja -0x62 <.text+0x5a200>
   5a630: 79 74 10 00 00 00 00 00      	ldxdw r4, [r7 + 0x10]
   5a638: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5a640: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5a648: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5a650: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5a540>
   5a658: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5a660: 7b 3a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r3
   5a668: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   5a670: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5a560>
   5a678: 05 00 94 ff 00 00 00 00      	ja -0x6c <.text+0x5a200>
   5a680: 7b 6a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r6
   5a688: 7b 9a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r9
   5a690: 79 01 08 00 00 00 00 00      	ldxdw r1, [r0 + 0x8]
   5a698: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5a6a0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5a6a8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5a6b0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5a5a0>
   5a6b8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5a6c0: 79 06 00 00 00 00 00 00      	ldxdw r6, [r0 + 0x0]
   5a6c8: 7b 6a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r6
   5a6d0: 71 76 2a 00 00 00 00 00      	ldxb r6, [r7 + 0x2a]
   5a6d8: 71 79 29 00 00 00 00 00      	ldxb r9, [r7 + 0x29]
   5a6e0: 7b 9a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r9
   5a6e8: 71 79 28 00 00 00 00 00      	ldxb r9, [r7 + 0x28]
   5a6f0: 7b 9a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r9
   5a6f8: 79 79 20 00 00 00 00 00      	ldxdw r9, [r7 + 0x20]
   5a700: 7b 9a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r9
   5a708: 79 79 18 00 00 00 00 00      	ldxdw r9, [r7 + 0x18]
   5a710: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5a718: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x5a608>
   5a720: 05 00 7f ff 00 00 00 00      	ja -0x81 <.text+0x5a200>
   5a728: 7b 8a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r8
   5a730: 79 07 10 00 00 00 00 00      	ldxdw r7, [r0 + 0x10]
   5a738: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5a740: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5a748: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5a750: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5a640>
   5a758: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5a760: 79 a8 40 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1c0]
   5a768: 79 a8 48 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1b8]
   5a770: 7b 5a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r5
   5a778: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   5a780: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x5a670>
   5a788: 05 00 72 ff 00 00 00 00      	ja -0x8e <.text+0x5a200>
   5a790: 79 08 18 00 00 00 00 00      	ldxdw r8, [r0 + 0x18]
   5a798: 79 02 20 00 00 00 00 00      	ldxdw r2, [r0 + 0x20]
   5a7a0: 71 03 28 00 00 00 00 00      	ldxb r3, [r0 + 0x28]
   5a7a8: 71 05 29 00 00 00 00 00      	ldxb r5, [r0 + 0x29]
   5a7b0: 71 00 2a 00 00 00 00 00      	ldxb r0, [r0 + 0x2a]
   5a7b8: 73 6a ea ff 00 00 00 00      	stxb [r10 - 0x16], r6
   5a7c0: 79 a6 80 fd 00 00 00 00      	ldxdw r6, [r10 - 0x280]
   5a7c8: 73 6a e9 ff 00 00 00 00      	stxb [r10 - 0x17], r6
   5a7d0: 79 a6 88 fd 00 00 00 00      	ldxdw r6, [r10 - 0x278]
   5a7d8: 73 6a e8 ff 00 00 00 00      	stxb [r10 - 0x18], r6
   5a7e0: 79 a6 90 fd 00 00 00 00      	ldxdw r6, [r10 - 0x270]
   5a7e8: 7b 6a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r6
   5a7f0: 7b 9a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r9
   5a7f8: 7b 4a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r4
   5a800: 79 a4 b0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x250]
   5a808: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   5a810: 79 a4 b8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x248]
   5a818: 7b 4a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r4
   5a820: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   5a828: 73 4a ba ff 00 00 00 00      	stxb [r10 - 0x46], r4
   5a830: 79 a4 c8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x238]
   5a838: 73 4a b9 ff 00 00 00 00      	stxb [r10 - 0x47], r4
   5a840: 79 a4 d0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x230]
   5a848: 73 4a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r4
   5a850: 79 a4 d8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x228]
   5a858: 7b 4a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r4
   5a860: 79 a4 a0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x260]
   5a868: 7b 4a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r4
   5a870: 79 a4 70 fd 00 00 00 00      	ldxdw r4, [r10 - 0x290]
   5a878: 7b 4a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r4
   5a880: 79 a4 50 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1b0]
   5a888: 7b 4a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r4
   5a890: 79 a4 e8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x218]
   5a898: 7b 4a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r4
   5a8a0: 73 0a 8a ff 00 00 00 00      	stxb [r10 - 0x76], r0
   5a8a8: 73 5a 89 ff 00 00 00 00      	stxb [r10 - 0x77], r5
   5a8b0: 73 3a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r3
   5a8b8: 7b 2a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r2
   5a8c0: 7b 8a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r8
   5a8c8: 7b 7a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r7
   5a8d0: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   5a8d8: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   5a8e0: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   5a8e8: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5a8f0: 73 1a 5a ff 00 00 00 00      	stxb [r10 - 0xa6], r1
   5a8f8: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5a900: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   5a908: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   5a910: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   5a918: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   5a920: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   5a928: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   5a930: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   5a938: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5a940: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   5a948: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   5a950: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   5a958: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5a960: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5a968: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   5a970: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   5a978: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   5a980: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   5a988: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5a990: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   5a998: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   5a9a0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5a9a8: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   5a9b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5a9b8: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5a9c0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5a9c8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   5a9d0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   5a9d8: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   5a9e0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5a9e8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   5a9f0: 7a 0a f0 ff 08 00 00 00      	stdw [r10 - 0x10], 0x8
   5a9f8: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   5aa00: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   5aa08: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   5aa10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5aa18: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   5aa20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5aa28: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5aa30: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   5aa38: 79 a4 60 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1a0]
   5aa40: 85 10 00 00 50 4a 02 00      	call 0x24a50
   5aa48: 79 a3 88 fe 00 00 00 00      	ldxdw r3, [r10 - 0x178]
   5aa50: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   5aa58: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x5aa28>
   5aa60: 79 92 20 00 00 00 00 00      	ldxdw r2, [r9 + 0x20]
   5aa68: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5aa70: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   5aa78: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5aa80: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   5aa88: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5aa90: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   5aa98: 7b 2a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r2
   5aaa0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5aaa8: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   5aab0: 79 68 00 00 00 00 00 00      	ldxdw r8, [r6 + 0x0]
   5aab8: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5aac0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5aac8: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5aad0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   5aad8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5aae0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   5aae8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5aaf0: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   5aaf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ab00: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   5ab08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ab10: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5ab18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5ab20: 85 10 00 00 6a b1 02 00      	call 0x2b16a
   5ab28: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   5ab30: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5ab38: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5ab40: 55 00 04 00 00 00 00 00      	jne r0, 0x0, +0x4 <.text+0x5aa48>
   5ab48: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   5ab50: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ab58: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5ab60: 95 00 00 00 00 00 00 00      	exit
   5ab68: 71 91 80 00 00 00 00 00      	ldxb r1, [r9 + 0x80]
   5ab70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ab78: 07 02 00 00 e7 fe ff ff      	add64 r2, -0x119
   5ab80: 7b 2a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r2
   5ab88: 7b 9a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r9
   5ab90: 18 02 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b683a
   5aba0: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   5aba8: 73 1a e7 fe 00 00 00 00      	stxb [r10 - 0x119], r1
   5abb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5abb8: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   5abc0: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   5abc8: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   5abd0: 7a 0a d8 fe 01 00 00 00      	stdw [r10 - 0x128], 0x1
   5abd8: 7a 0a c8 fe 20 00 00 00      	stdw [r10 - 0x138], 0x20
   5abe0: 7a 0a b8 fe 0d 00 00 00      	stdw [r10 - 0x148], 0xd
   5abe8: 7a 0a a8 fe 03 00 00 00      	stdw [r10 - 0x158], 0x3
   5abf0: 79 a2 70 fe 00 00 00 00      	ldxdw r2, [r10 - 0x190]
   5abf8: 15 02 e9 ff 00 00 00 00      	jeq r2, 0x0, -0x17 <.text+0x5aa28>
   5ac00: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   5ac08: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5ac10: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5ac18: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ac20: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ab10>
   5ac28: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5ac30: 79 70 00 00 00 00 00 00      	ldxdw r0, [r7 + 0x0]
   5ac38: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   5ac40: 79 a5 68 fe 00 00 00 00      	ldxdw r5, [r10 - 0x198]
   5ac48: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ab38>
   5ac50: 05 00 d9 fe 00 00 00 00      	ja -0x127 <.text+0x5a200>
   5ac58: 79 73 10 00 00 00 00 00      	ldxdw r3, [r7 + 0x10]
   5ac60: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5ac68: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5ac70: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ac78: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ab68>
   5ac80: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5ac88: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5ac90: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ab80>
   5ac98: 05 00 d0 fe 00 00 00 00      	ja -0x130 <.text+0x5a200>
   5aca0: 7b 4a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r4
   5aca8: 79 91 28 00 00 00 00 00      	ldxdw r1, [r9 + 0x28]
   5acb0: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   5acb8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5acc0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5acc8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5acd0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5abc0>
   5acd8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5ace0: 71 74 2a 00 00 00 00 00      	ldxb r4, [r7 + 0x2a]
   5ace8: 7b 4a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r4
   5acf0: 71 74 29 00 00 00 00 00      	ldxb r4, [r7 + 0x29]
   5acf8: 7b 4a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r4
   5ad00: 71 74 28 00 00 00 00 00      	ldxb r4, [r7 + 0x28]
   5ad08: 7b 4a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r4
   5ad10: 79 74 20 00 00 00 00 00      	ldxdw r4, [r7 + 0x20]
   5ad18: 7b 4a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r4
   5ad20: 79 77 18 00 00 00 00 00      	ldxdw r7, [r7 + 0x18]
   5ad28: 7b 7a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r7
   5ad30: 79 a7 50 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1b0]
   5ad38: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   5ad40: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ac30>
   5ad48: 05 00 ba fe 00 00 00 00      	ja -0x146 <.text+0x5a200>
   5ad50: 79 94 30 00 00 00 00 00      	ldxdw r4, [r9 + 0x30]
   5ad58: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5ad60: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5ad68: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ad70: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ac60>
   5ad78: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5ad80: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   5ad88: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ac78>
   5ad90: 05 00 b1 fe 00 00 00 00      	ja -0x14f <.text+0x5a200>
   5ad98: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   5ada0: 79 67 08 00 00 00 00 00      	ldxdw r7, [r6 + 0x8]
   5ada8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5adb0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5adb8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5adc0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5acb0>
   5adc8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5add0: 71 90 4a 00 00 00 00 00      	ldxb r0, [r9 + 0x4a]
   5add8: 7b 0a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r0
   5ade0: 71 90 49 00 00 00 00 00      	ldxb r0, [r9 + 0x49]
   5ade8: 7b 0a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r0
   5adf0: 71 90 48 00 00 00 00 00      	ldxb r0, [r9 + 0x48]
   5adf8: 7b 0a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r0
   5ae00: 79 90 40 00 00 00 00 00      	ldxdw r0, [r9 + 0x40]
   5ae08: 7b 0a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r0
   5ae10: 79 90 38 00 00 00 00 00      	ldxdw r0, [r9 + 0x38]
   5ae18: 7b 0a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r0
   5ae20: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   5ae28: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ad18>
   5ae30: 05 00 9d fe 00 00 00 00      	ja -0x163 <.text+0x5a200>
   5ae38: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   5ae40: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   5ae48: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ae50: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5ae58: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ae60: bf 50 00 00 00 00 00 00      	mov64 r0, r5
   5ae68: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ad58>
   5ae70: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5ae78: 79 a5 48 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1b8]
   5ae80: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   5ae88: 79 a5 68 fe 00 00 00 00      	ldxdw r5, [r10 - 0x198]
   5ae90: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ad80>
   5ae98: 05 00 90 fe 00 00 00 00      	ja -0x170 <.text+0x5a200>
   5aea0: 79 91 58 00 00 00 00 00      	ldxdw r1, [r9 + 0x58]
   5aea8: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   5aeb0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5aeb8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5aec0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5aec8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5adb8>
   5aed0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5aed8: 7b 3a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r3
   5aee0: 79 93 50 00 00 00 00 00      	ldxdw r3, [r9 + 0x50]
   5aee8: 7b 3a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r3
   5aef0: 71 63 2a 00 00 00 00 00      	ldxb r3, [r6 + 0x2a]
   5aef8: 7b 3a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r3
   5af00: 71 63 29 00 00 00 00 00      	ldxb r3, [r6 + 0x29]
   5af08: 7b 3a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r3
   5af10: 71 63 28 00 00 00 00 00      	ldxb r3, [r6 + 0x28]
   5af18: 7b 3a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r3
   5af20: 79 63 20 00 00 00 00 00      	ldxdw r3, [r6 + 0x20]
   5af28: 7b 3a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r3
   5af30: 79 66 18 00 00 00 00 00      	ldxdw r6, [r6 + 0x18]
   5af38: 79 a3 38 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1c8]
   5af40: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5af48: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ae38>
   5af50: 05 00 79 fe 00 00 00 00      	ja -0x187 <.text+0x5a200>
   5af58: 79 93 60 00 00 00 00 00      	ldxdw r3, [r9 + 0x60]
   5af60: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5af68: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5af70: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5af78: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ae68>
   5af80: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5af88: 7b 0a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r0
   5af90: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5af98: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5ae88>
   5afa0: 05 00 6f fe 00 00 00 00      	ja -0x191 <.text+0x5a200>
   5afa8: 7b 7a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r7
   5afb0: 7b 4a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r4
   5afb8: 79 51 08 00 00 00 00 00      	ldxdw r1, [r5 + 0x8]
   5afc0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5afc8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5afd0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5afd8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5aec8>
   5afe0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5afe8: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   5aff0: 71 97 7a 00 00 00 00 00      	ldxb r7, [r9 + 0x7a]
   5aff8: 7b 7a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r7
   5b000: 71 97 79 00 00 00 00 00      	ldxb r7, [r9 + 0x79]
   5b008: 7b 7a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r7
   5b010: 71 97 78 00 00 00 00 00      	ldxb r7, [r9 + 0x78]
   5b018: 7b 7a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r7
   5b020: 79 97 70 00 00 00 00 00      	ldxdw r7, [r9 + 0x70]
   5b028: 7b 7a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r7
   5b030: 79 97 68 00 00 00 00 00      	ldxdw r7, [r9 + 0x68]
   5b038: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5b040: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5af30>
   5b048: 05 00 5a fe 00 00 00 00      	ja -0x1a6 <.text+0x5a200>
   5b050: 7b 7a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r7
   5b058: 7b 0a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r0
   5b060: 79 59 10 00 00 00 00 00      	ldxdw r9, [r5 + 0x10]
   5b068: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5b070: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5b078: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5b080: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5af70>
   5b088: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5b090: bf 67 00 00 00 00 00 00      	mov64 r7, r6
   5b098: 79 a0 40 fe 00 00 00 00      	ldxdw r0, [r10 - 0x1c0]
   5b0a0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5b0a8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x5af98>
   5b0b0: 05 00 4d fe 00 00 00 00      	ja -0x1b3 <.text+0x5a200>
   5b0b8: bf 56 00 00 00 00 00 00      	mov64 r6, r5
   5b0c0: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   5b0c8: 7b 2a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r2
   5b0d0: 79 62 20 00 00 00 00 00      	ldxdw r2, [r6 + 0x20]
   5b0d8: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   5b0e0: 71 65 29 00 00 00 00 00      	ldxb r5, [r6 + 0x29]
   5b0e8: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   5b0f0: 79 a0 80 fd 00 00 00 00      	ldxdw r0, [r10 - 0x280]
   5b0f8: 73 0a ea ff 00 00 00 00      	stxb [r10 - 0x16], r0
   5b100: 79 a0 88 fd 00 00 00 00      	ldxdw r0, [r10 - 0x278]
   5b108: 73 0a e9 ff 00 00 00 00      	stxb [r10 - 0x17], r0
   5b110: 79 a0 90 fd 00 00 00 00      	ldxdw r0, [r10 - 0x270]
   5b118: 73 0a e8 ff 00 00 00 00      	stxb [r10 - 0x18], r0
   5b120: 79 a0 98 fd 00 00 00 00      	ldxdw r0, [r10 - 0x268]
   5b128: 7b 0a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r0
   5b130: 79 a0 70 fd 00 00 00 00      	ldxdw r0, [r10 - 0x290]
   5b138: 7b 0a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r0
   5b140: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   5b148: 79 a3 38 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1c8]
   5b150: 7b 3a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r3
   5b158: 79 a3 b8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x248]
   5b160: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   5b168: 79 a3 c0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x240]
   5b170: 73 3a ba ff 00 00 00 00      	stxb [r10 - 0x46], r3
   5b178: 79 a3 c8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x238]
   5b180: 73 3a b9 ff 00 00 00 00      	stxb [r10 - 0x47], r3
   5b188: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   5b190: 73 3a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r3
   5b198: 79 a3 d8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x228]
   5b1a0: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   5b1a8: 7b 7a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r7
   5b1b0: 79 a3 48 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b8]
   5b1b8: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   5b1c0: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   5b1c8: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   5b1d0: 7b 8a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r8
   5b1d8: 73 6a 8a ff 00 00 00 00      	stxb [r10 - 0x76], r6
   5b1e0: 73 5a 89 ff 00 00 00 00      	stxb [r10 - 0x77], r5
   5b1e8: 73 4a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r4
   5b1f0: 7b 2a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r2
   5b1f8: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   5b200: 7b 2a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r2
   5b208: 7b 9a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r9
   5b210: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   5b218: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   5b220: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   5b228: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5b230: 73 1a 5a ff 00 00 00 00      	stxb [r10 - 0xa6], r1
   5b238: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5b240: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   5b248: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5b250: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   5b258: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   5b260: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   5b268: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   5b270: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   5b278: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5b280: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   5b288: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   5b290: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   5b298: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   5b2a0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5b2a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b2b0: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   5b2b8: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5b2c0: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   5b2c8: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   5b2d0: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   5b2d8: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   5b2e0: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   5b2e8: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   5b2f0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5b2f8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5b300: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   5b308: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5b310: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5b318: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5b320: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5b328: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   5b330: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5b338: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5b340: 7a 0a f8 ff 01 00 00 00      	stdw [r10 - 0x8], 0x1
   5b348: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   5b350: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   5b358: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   5b360: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b368: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   5b370: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b378: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5b380: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   5b388: 79 a4 60 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1a0]
   5b390: 85 10 00 00 26 49 02 00      	call 0x24926
   5b398: 79 a3 98 fe 00 00 00 00      	ldxdw r3, [r10 - 0x168]
   5b3a0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5b3a8: 05 00 f3 fe 00 00 00 00      	ja -0x10d <.text+0x5aa28>
