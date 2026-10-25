   3d250: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   3d258: 7b 4a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r4
   3d260: 7b 3a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r3
   3d268: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   3d270: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   3d278: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   3d280: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   3d288: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   3d290: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   3d298: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   3d2a0: 07 01 00 00 28 00 00 00      	add64 r1, 0x28
   3d2a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3d2b0: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   3d2b8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   3d2c0: 85 10 00 00 76 ec 02 00      	call 0x2ec76
   3d2c8: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
   3d2d0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   3d2d8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   3d2e0: 55 00 3a 00 00 00 00 00      	jne r0, 0x0, +0x3a <.text+0x3d398>
   3d2e8: 7b 6a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r6
   3d2f0: 79 76 60 00 00 00 00 00      	ldxdw r6, [r7 + 0x60]
   3d2f8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   3d300: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   3d308: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d310: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   3d318: 85 10 00 00 cd c9 00 00      	call 0xc9cd
   3d320: 79 a8 d8 fe 00 00 00 00      	ldxdw r8, [r10 - 0x128]
   3d328: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0x3d218>
   3d330: 05 00 2c 00 00 00 00 00      	ja +0x2c <.text+0x3d378>
   3d338: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   3d340: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   3d348: 0f 18 00 00 00 00 00 00      	add64 r8, r1
   3d350: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   3d358: ad 68 01 00 00 00 00 00      	jlt r8, r6, +0x1 <.text+0x3d248>
   3d360: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   3d368: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   3d370: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x3d260>
   3d378: 05 00 26 00 00 00 00 00      	ja +0x26 <.text+0x3d390>
   3d380: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d388: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   3d390: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   3d3a0: 85 10 00 00 fb 33 02 00      	call 0x233fb
   3d3a8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   3d3b0: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   3d3b8: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   3d3c0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   3d3d0: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   3d3d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d3e0: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   3d3e8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   3d3f0: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   3d3f8: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   3d400: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   3d408: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   3d410: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3d418: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   3d420: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   3d430: 85 10 00 00 4a 41 02 00      	call 0x2414a
   3d438: 79 a6 88 fe 00 00 00 00      	ldxdw r6, [r10 - 0x178]
   3d440: 15 00 08 01 00 00 00 00      	jeq r0, 0x0, +0x108 <.text+0x3db68>
   3d448: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   3d450: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   3d458: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   3d468: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   3d470: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   3d480: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   3d490: 85 10 00 00 30 df 02 00      	call 0x2df30
   3d498: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   3d4a0: 79 a6 88 fe 00 00 00 00      	ldxdw r6, [r10 - 0x178]
   3d4a8: 05 00 16 01 00 00 00 00      	ja +0x116 <.text+0x3dc40>
   3d4b0: 79 a6 88 fe 00 00 00 00      	ldxdw r6, [r10 - 0x178]
   3d4b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d4c0: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   3d4c8: 85 10 00 00 aa c6 02 00      	call 0x2c6aa
   3d4d0: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   3d4d8: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   3d4e0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   3d4e8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   3d4f0: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   3d4f8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   3d500: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   3d508: 15 01 08 00 00 00 00 00      	jeq r1, 0x0, +0x8 <.text+0x3d430>
   3d510: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d518: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   3d520: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3d528: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   3d530: 85 10 00 00 d0 bc 02 00      	call 0x2bcd0
   3d538: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   3d540: 79 a8 b0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x150]
   3d548: 05 00 02 01 00 00 00 00      	ja +0x102 <.text+0x3dc40>
   3d550: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   3d558: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   3d560: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   3d568: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   3d570: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   3d578: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   3d580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d588: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   3d590: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   3d598: 85 10 00 00 a9 c6 02 00      	call 0x2c6a9
   3d5a0: 79 77 00 00 00 00 00 00      	ldxdw r7, [r7 + 0x0]
   3d5a8: 79 79 08 00 00 00 00 00      	ldxdw r9, [r7 + 0x8]
   3d5b0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   3d5b8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   3d5c0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3d5c8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x3d4b8>
   3d5d0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3d5d8: 7b 6a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r6
   3d5e0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   3d5e8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   3d5f0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3d4e0>
   3d5f8: 85 10 00 00 ff ff ff ff      	call -0x1
   3d600: 79 76 10 00 00 00 00 00      	ldxdw r6, [r7 + 0x10]
   3d608: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   3d610: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   3d618: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3d620: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x3d510>
   3d628: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3d630: 7b 0a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r0
   3d638: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   3d640: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3d530>
   3d648: 05 00 f5 ff 00 00 00 00      	ja -0xb <.text+0x3d4d8>
   3d650: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   3d658: 79 73 20 00 00 00 00 00      	ldxdw r3, [r7 + 0x20]
   3d660: 71 74 28 00 00 00 00 00      	ldxb r4, [r7 + 0x28]
   3d668: 71 75 29 00 00 00 00 00      	ldxb r5, [r7 + 0x29]
   3d670: 71 70 2a 00 00 00 00 00      	ldxb r0, [r7 + 0x2a]
   3d678: 73 0a 02 ff 00 00 00 00      	stxb [r10 - 0xfe], r0
   3d680: 73 5a 01 ff 00 00 00 00      	stxb [r10 - 0xff], r5
   3d688: 73 4a 00 ff 00 00 00 00      	stxb [r10 - 0x100], r4
   3d690: 7b 3a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r3
   3d698: 7b 2a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r2
   3d6a0: 7b 6a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r6
   3d6a8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   3d6b0: 7b 9a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r9
   3d6b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d6c0: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   3d6c8: 85 10 00 00 64 ca 02 00      	call 0x2ca64
   3d6d0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   3d6d8: 1f 82 00 00 00 00 00 00      	sub64 r2, r8
   3d6e0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   3d6e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3d6f0: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <.text+0x3d5e0>
   3d6f8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3d700: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0x3d5f0>
   3d708: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   3d710: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   3d718: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   3d720: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   3d728: 79 a4 70 fe 00 00 00 00      	ldxdw r4, [r10 - 0x190]
   3d730: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x3d630>
   3d738: 79 92 08 00 00 00 00 00      	ldxdw r2, [r9 + 0x8]
   3d740: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   3d748: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   3d750: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   3d758: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   3d760: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   3d768: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x3d668>
   3d770: 79 62 08 00 00 00 00 00      	ldxdw r2, [r6 + 0x8]
   3d778: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   3d780: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   3d788: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   3d790: 79 a6 88 fe 00 00 00 00      	ldxdw r6, [r10 - 0x178]
   3d798: 2d 14 01 00 00 00 00 00      	jgt r4, r1, +0x1 <.text+0x3d688>
   3d7a0: 05 00 b7 00 00 00 00 00      	ja +0xb7 <.text+0x3dc40>
   3d7a8: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   3d7b0: 1f 12 00 00 00 00 00 00      	sub64 r2, r1
   3d7b8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   3d7c0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3d7c8: 2d 42 01 00 00 00 00 00      	jgt r2, r4, +0x1 <.text+0x3d6b8>
   3d7d0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3d7d8: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   3d7e0: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0x3d6d0>
   3d7e8: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   3d7f0: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   3d7f8: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   3d800: 79 20 08 00 00 00 00 00      	ldxdw r0, [r2 + 0x8]
   3d808: 79 03 00 00 00 00 00 00      	ldxdw r3, [r0 + 0x0]
   3d810: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   3d818: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x3d708>
   3d820: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   3d828: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   3d830: 7b 30 00 00 00 00 00 00      	stxdw [r0 + 0x0], r3
   3d838: 55 01 01 00 01 00 00 00      	jne r1, 0x1, +0x1 <.text+0x3d728>
   3d840: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0x3d4d8>
   3d848: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   3d850: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   3d858: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   3d860: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3d868: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x3d758>
   3d870: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3d878: 7b 4a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r4
   3d880: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   3d888: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3d778>
   3d890: 05 00 ac ff 00 00 00 00      	ja -0x54 <.text+0x3d4d8>
   3d898: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   3d8a0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   3d8a8: 79 35 08 00 00 00 00 00      	ldxdw r5, [r3 + 0x8]
   3d8b0: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   3d8b8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   3d8c0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   3d8c8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x3d7b8>
   3d8d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   3d8d8: 7b 6a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r6
   3d8e0: 71 26 2a 00 00 00 00 00      	ldxb r6, [r2 + 0x2a]
   3d8e8: 7b 6a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r6
   3d8f0: 71 26 29 00 00 00 00 00      	ldxb r6, [r2 + 0x29]
   3d8f8: 7b 6a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r6
   3d900: 71 26 28 00 00 00 00 00      	ldxb r6, [r2 + 0x28]
   3d908: 7b 6a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r6
   3d910: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   3d918: 7b 6a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r6
   3d920: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   3d928: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
   3d930: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   3d938: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   3d940: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   3d948: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x3d838>
   3d950: 05 00 94 ff 00 00 00 00      	ja -0x6c <.text+0x3d4d8>
   3d958: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
   3d960: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   3d968: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   3d970: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   3d978: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x3d868>
   3d980: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   3d988: 7b 0a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r0
   3d990: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   3d998: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x3d888>
   3d9a0: 05 00 8a ff 00 00 00 00      	ja -0x76 <.text+0x3d4d8>
   3d9a8: 7b 5a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r5
   3d9b0: 79 70 08 00 00 00 00 00      	ldxdw r0, [r7 + 0x8]
   3d9b8: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
   3d9c0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   3d9c8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   3d9d0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x3d8c0>
   3d9d8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   3d9e0: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   3d9e8: 7b 5a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r5
   3d9f0: 71 35 2a 00 00 00 00 00      	ldxb r5, [r3 + 0x2a]
   3d9f8: 7b 5a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r5
   3da00: 71 35 29 00 00 00 00 00      	ldxb r5, [r3 + 0x29]
   3da08: 7b 5a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r5
   3da10: 71 35 28 00 00 00 00 00      	ldxb r5, [r3 + 0x28]
   3da18: 7b 5a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r5
   3da20: 79 36 20 00 00 00 00 00      	ldxdw r6, [r3 + 0x20]
   3da28: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   3da30: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   3da38: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x3d928>
   3da40: 05 00 76 ff 00 00 00 00      	ja -0x8a <.text+0x3d4d8>
   3da48: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   3da50: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   3da58: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   3da60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3da68: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x3d958>
   3da70: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3da78: 7b 4a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r4
   3da80: 7b 9a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r9
   3da88: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   3da90: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3d980>
   3da98: 05 00 6b ff 00 00 00 00      	ja -0x95 <.text+0x3d4d8>
   3daa0: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   3daa8: 79 73 20 00 00 00 00 00      	ldxdw r3, [r7 + 0x20]
   3dab0: 71 74 28 00 00 00 00 00      	ldxb r4, [r7 + 0x28]
   3dab8: 71 79 29 00 00 00 00 00      	ldxb r9, [r7 + 0x29]
   3dac0: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   3dac8: 73 7a 7a ff 00 00 00 00      	stxb [r10 - 0x86], r7
   3dad0: 73 9a 79 ff 00 00 00 00      	stxb [r10 - 0x87], r9
   3dad8: 73 4a 78 ff 00 00 00 00      	stxb [r10 - 0x88], r4
   3dae0: 7b 3a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r3
   3dae8: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   3daf0: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   3daf8: 7b 0a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r0
   3db00: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   3db08: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   3db10: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   3db18: 73 1a 4a ff 00 00 00 00      	stxb [r10 - 0xb6], r1
   3db20: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   3db28: 73 1a 49 ff 00 00 00 00      	stxb [r10 - 0xb7], r1
   3db30: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   3db38: 73 1a 48 ff 00 00 00 00      	stxb [r10 - 0xb8], r1
   3db40: 7b 6a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r6
   3db48: 7b 5a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r5
   3db50: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   3db58: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   3db60: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   3db68: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   3db70: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   3db78: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   3db80: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   3db88: 73 1a 1a ff 00 00 00 00      	stxb [r10 - 0xe6], r1
   3db90: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   3db98: 73 1a 19 ff 00 00 00 00      	stxb [r10 - 0xe7], r1
   3dba0: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   3dba8: 73 1a 18 ff 00 00 00 00      	stxb [r10 - 0xe8], r1
   3dbb0: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   3dbb8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   3dbc0: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   3dbc8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   3dbd0: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   3dbd8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   3dbe0: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   3dbe8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   3dbf0: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   3dbf8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   3dc00: 7a 0a 88 ff 00 00 00 00      	stdw [r10 - 0x78], 0x0
   3dc08: 7a 0a 80 ff 08 00 00 00      	stdw [r10 - 0x80], 0x8
   3dc10: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   3dc18: 7a 0a e0 fe 08 00 00 00      	stdw [r10 - 0x120], 0x8
   3dc20: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   3dc28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3dc30: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   3dc38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3dc40: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   3dc48: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   3dc50: 85 10 00 00 87 c0 02 00      	call 0x2c087
   3dc58: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   3dc60: 79 a6 88 fe 00 00 00 00      	ldxdw r6, [r10 - 0x178]
   3dc68: 15 01 1e 00 02 00 00 00      	jeq r1, 0x2, +0x1e <.text+0x3dc40>
   3dc70: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   3dc78: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   3dc80: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0x3dc40>
   3dc88: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   3dc90: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   3dc98: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   3dca0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   3dca8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   3dcb0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   3dcb8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   3dcc0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   3dcc8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   3dcd0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   3dcd8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   3dce0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   3dce8: 18 01 00 00 74 6d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6d74
   3dcf8: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   3dd00: 62 0a 70 ff 88 17 00 00      	stw [r10 - 0x90], 0x1788
   3dd08: 72 0a 28 ff 02 00 00 00      	stb [r10 - 0xd8], 0x2
   3dd10: 62 0a f0 fe 8d 00 00 00      	stw [r10 - 0x110], 0x8d
   3dd18: 7a 0a e8 fe 23 00 00 00      	stdw [r10 - 0x118], 0x23
   3dd20: 7a 0a d8 fe 00 00 00 00      	stdw [r10 - 0x128], 0x0
   3dd28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3dd30: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   3dd38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3dd40: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   3dd48: 85 10 00 00 bc bb 02 00      	call 0x2bbbc
   3dd50: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   3dd58: 79 a8 90 fe 00 00 00 00      	ldxdw r8, [r10 - 0x170]
   3dd60: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   3dd68: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   3dd70: 95 00 00 00 00 00 00 00      	exit
