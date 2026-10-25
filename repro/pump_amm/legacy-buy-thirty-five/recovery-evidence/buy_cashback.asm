0351a8: mov64 r9, r2
0351b0: mov64 r6, r1
0351b8: jne r3, 0x0, +0x22 ; branch 0x352d0
0351c0: mov64 r1, r10
0351c8: add64 r1, -0x218
0351d0: lddw r2, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
0351e0: call 0x8042 ; call 0x753f8
0351e8: stdw [r10 - 0x1e8], 0x0
0351f0: stdw [r10 - 0x1f0], 0x1
0351f8: stdw [r10 - 0x1f8], 0x0
035200: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
035210: stxdw [r10 - 0x20], r1
035218: mov64 r1, r10
035220: add64 r1, -0x1f8
035228: stxdw [r10 - 0x28], r1
035230: stb [r10 - 0x10], 0x3
035238: stdw [r10 - 0x18], 0x20
035240: stdw [r10 - 0x38], 0x0
035248: stdw [r10 - 0x48], 0x0
035250: mov64 r2, r10
035258: add64 r2, -0x48
035260: lddw r1, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
035270: call 0x8b25 ; call 0x7aba0
035278: jeq r0, 0x0, +0x8c ; branch 0x356e0
035280: mov64 r3, r10
035288: add64 r3, -0x1
035290: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0352a0: mov64 r2, 0x37
0352a8: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
0352b8: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
0352c8: call 0x1bb99 ; call 0x112f98
0352d0: stxdw [r10 - 0x310], r4
0352d8: stxdw [r10 - 0x2c0], r6
0352e0: stxdw [r10 - 0x318], r3
0352e8: ldxdw r1, [r5 - 0xfc0]
0352f0: stxdw [r10 - 0x2f8], r1
0352f8: ldxdw r1, [r5 - 0xfc8]
035300: stxdw [r10 - 0x2e0], r1
035308: ldxdw r1, [r5 - 0xfd0]
035310: stxdw [r10 - 0x300], r1
035318: ldxdw r1, [r5 - 0xfd8]
035320: stxdw [r10 - 0x308], r1
035328: ldxdw r3, [r5 - 0xfe0]
035330: ldxdw r4, [r5 - 0xfe8]
035338: ldxdw r1, [r5 - 0xff0]
035340: stxdw [r10 - 0x2e8], r1
035348: ldxdw r1, [r5 - 0xff8]
035350: stxdw [r10 - 0x2d8], r1
035358: ldxdw r1, [r5 - 0x1000]
035360: stxdw [r10 - 0x2f0], r1
035368: ldxdw r7, [r1 + 0x0]
035370: ldxdw r1, [r7 + 0x0]
035378: ldxdw r2, [r1 + 0x18]
035380: stxdw [r10 - 0x1e0], r2
035388: ldxdw r2, [r1 + 0x10]
035390: stxdw [r10 - 0x1e8], r2
035398: ldxdw r2, [r1 + 0x8]
0353a0: stxdw [r10 - 0x1f0], r2
0353a8: ldxdw r1, [r1 + 0x0]
0353b0: stxdw [r10 - 0x1f8], r1
0353b8: stxdw [r10 - 0x2d0], r4
0353c0: ldxdw r1, [r4 + 0x0]
0353c8: ldxdw r2, [r1 + 0x18]
0353d0: stxdw [r10 - 0x30], r2
0353d8: ldxdw r2, [r1 + 0x10]
0353e0: stxdw [r10 - 0x38], r2
0353e8: ldxdw r2, [r1 + 0x8]
0353f0: stxdw [r10 - 0x40], r2
0353f8: ldxdw r1, [r1 + 0x0]
035400: stxdw [r10 - 0x48], r1
035408: stxdw [r10 - 0x2c8], r3
035410: ldxdw r1, [r3 + 0x0]
035418: ldxdw r2, [r1 + 0x18]
035420: stxdw [r10 - 0x1a8], r2
035428: ldxdw r2, [r1 + 0x10]
035430: stxdw [r10 - 0x1b0], r2
035438: ldxdw r2, [r1 + 0x8]
035440: stxdw [r10 - 0x1b8], r2
035448: ldxdw r1, [r1 + 0x0]
035450: stxdw [r10 - 0x1c0], r1
035458: mov64 r6, r10
035460: add64 r6, -0x218
035468: mov64 r2, r10
035470: add64 r2, -0x1f8
035478: mov64 r3, r10
035480: add64 r3, -0x48
035488: mov64 r4, r10
035490: add64 r4, -0x1c0
035498: mov64 r1, r6
0354a0: call 0x19696 ; call 0x100958
0354a8: ldxdw r8, [r9 + 0x0]
0354b0: ldxdw r1, [r8 + 0x18]
0354b8: stxdw [r10 - 0x1a8], r1
0354c0: ldxdw r1, [r8 + 0x10]
0354c8: stxdw [r10 - 0x1b0], r1
0354d0: ldxdw r1, [r8 + 0x8]
0354d8: stxdw [r10 - 0x1b8], r1
0354e0: ldxdw r1, [r8 + 0x0]
0354e8: stxdw [r10 - 0x1c0], r1
0354f0: mov64 r1, r10
0354f8: add64 r1, -0x1c0
035500: mov64 r2, r6
035508: mov64 r3, 0x20
035510: call 0x1c879 ; call 0x1198e0
035518: lsh64 r0, 0x20
035520: rsh64 r0, 0x20
035528: jeq r0, 0x0, +0x54 ; branch 0x357d0
035530: mov64 r1, r10
035538: add64 r1, -0x1d8
035540: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
035550: call 0x7fd4 ; call 0x753f8
035558: stdw [r10 - 0x1e8], 0x0
035560: stdw [r10 - 0x1f0], 0x1
035568: stdw [r10 - 0x1f8], 0x0
035570: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
035580: stxdw [r10 - 0x20], r1
035588: mov64 r1, r10
035590: add64 r1, -0x1f8
035598: stxdw [r10 - 0x28], r1
0355a0: stb [r10 - 0x10], 0x3
0355a8: stdw [r10 - 0x18], 0x20
0355b0: stdw [r10 - 0x38], 0x0
0355b8: stdw [r10 - 0x48], 0x0
0355c0: mov64 r2, r10
0355c8: add64 r2, -0x48
0355d0: lddw r1, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
0355e0: call 0x8ab7 ; call 0x7aba0
0355e8: jeq r0, 0x0, +0x1 ; branch 0x355f8
0355f0: ja -0x6f ; branch 0x35280
0355f8: ldxdw r1, [r10 - 0x1e8]
035600: stxdw [r10 - 0x178], r1
035608: ldxdw r1, [r10 - 0x1f0]
035610: stxdw [r10 - 0x180], r1
035618: ldxdw r1, [r10 - 0x1f8]
035620: stxdw [r10 - 0x188], r1
035628: ldxdw r1, [r10 - 0x1d8]
035630: stxdw [r10 - 0x1a0], r1
035638: ldxdw r1, [r10 - 0x1d0]
035640: stxdw [r10 - 0x198], r1
035648: ldxdw r1, [r10 - 0x1c8]
035650: stxdw [r10 - 0x190], r1
035658: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
035668: stxdw [r10 - 0x1b8], r1
035670: stw [r10 - 0x128], 0x17ad
035678: stb [r10 - 0x170], 0x2
035680: stw [r10 - 0x1a8], 0x36
035688: stdw [r10 - 0x1b0], 0x2e
035690: stdw [r10 - 0x1c0], 0x0
035698: mov64 r1, r10
0356a0: add64 r1, -0x228
0356a8: mov64 r2, r10
0356b0: add64 r2, -0x1c0
0356b8: call 0x19b1f ; call 0x102fb8
0356c0: ldxdw r1, [r10 - 0x220]
0356c8: ldxdw r2, [r10 - 0x228]
0356d0: ldxdw r6, [r10 - 0x2c0]
0356d8: ja +0x1b ; branch 0x357b8
0356e0: ldxdw r1, [r10 - 0x1e8]
0356e8: stxdw [r10 - 0x178], r1
0356f0: ldxdw r1, [r10 - 0x1f0]
0356f8: stxdw [r10 - 0x180], r1
035700: ldxdw r1, [r10 - 0x1f8]
035708: stxdw [r10 - 0x188], r1
035710: ldxdw r1, [r10 - 0x218]
035718: stxdw [r10 - 0x1a0], r1
035720: ldxdw r1, [r10 - 0x210]
035728: stxdw [r10 - 0x198], r1
035730: ldxdw r1, [r10 - 0x208]
035738: stxdw [r10 - 0x190], r1
035740: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
035750: stxdw [r10 - 0x1b8], r1
035758: stw [r10 - 0x128], 0x17ab
035760: stb [r10 - 0x170], 0x2
035768: stw [r10 - 0x1a8], 0x2c
035770: stdw [r10 - 0x1b0], 0x2e
035778: stdw [r10 - 0x1c0], 0x0
035780: mov64 r1, r10
035788: add64 r1, -0x2b8
035790: mov64 r2, r10
035798: add64 r2, -0x1c0
0357a0: call 0x19b02 ; call 0x102fb8
0357a8: ldxdw r1, [r10 - 0x2b0]
0357b0: ldxdw r2, [r10 - 0x2b8]
0357b8: stxdw [r6 + 0x8], r1
0357c0: stxdw [r6 + 0x0], r2
0357c8: exit
0357d0: ldxdw r6, [r10 - 0x300]
0357d8: stxdw [r10 - 0x330], r7
0357e0: ldxdw r7, [r10 - 0x308]
0357e8: ldxdw r1, [r10 - 0x2d8]
0357f0: ldxdw r1, [r10 - 0x2c8]
0357f8: ldxdw r1, [r10 - 0x2d0]
035800: stxdw [r10 - 0x328], r8
035808: ldxdw r1, [r10 - 0x2e8]
035810: ldxdw r1, [r10 - 0x2e0]
035818: ldxdw r1, [r10 - 0x2f0]
035820: ldxdw r8, [r10 - 0x2f8]
035828: ldxb r1, [r9 + 0x29]
035830: jeq r1, 0x0, +0x16 ; branch 0x358e8
035838: stxdw [r10 - 0x338], r1
035840: stxdw [r10 - 0x320], r9
035848: mov64 r1, r9
035850: call 0x1a6f8 ; call 0x109018
035858: ldxdw r8, [r10 - 0x310]
035860: ldxdw r9, [r10 - 0x328]
035868: jne r0, 0x0, +0x1 ; branch 0x35878
035870: ja +0x195 ; branch 0x36520
035878: mov64 r5, r8
035880: mov64 r9, r6
035888: ldxdw r8, [r9 + 0x8]
035890: ldxdw r1, [r8 + 0x0]
035898: add64 r1, 0x1
0358a0: mov64 r2, 0x1
0358a8: jeq r1, 0x0, +0x1 ; branch 0x358b8
0358b0: mov64 r2, 0x0
0358b8: ldxdw r3, [r9 + 0x0]
0358c0: stxdw [r8 + 0x0], r1
0358c8: ldxdw r1, [r10 - 0x2c8]
0358d0: mov64 r4, r7
0358d8: jne r2, 0x1, +0x37 ; branch 0x35a98
0358e0: call -0x1
0358e8: mov64 r1, r10
0358f0: add64 r1, -0x1d8
0358f8: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
035908: call 0x7f5d ; call 0x753f8
035910: stdw [r10 - 0x1e8], 0x0
035918: stdw [r10 - 0x1f0], 0x1
035920: stdw [r10 - 0x1f8], 0x0
035928: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
035938: stxdw [r10 - 0x20], r1
035940: mov64 r1, r10
035948: add64 r1, -0x1f8
035950: stxdw [r10 - 0x28], r1
035958: stb [r10 - 0x10], 0x3
035960: stdw [r10 - 0x18], 0x20
035968: stdw [r10 - 0x38], 0x0
035970: stdw [r10 - 0x48], 0x0
035978: mov64 r2, r10
035980: add64 r2, -0x48
035988: lddw r1, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
035998: call 0x8a40 ; call 0x7aba0
0359a0: jeq r0, 0x0, +0x1 ; branch 0x359b0
0359a8: ja -0xe6 ; branch 0x35280
0359b0: ldxdw r1, [r10 - 0x1e8]
0359b8: stxdw [r10 - 0x178], r1
0359c0: ldxdw r1, [r10 - 0x1f0]
0359c8: stxdw [r10 - 0x180], r1
0359d0: ldxdw r1, [r10 - 0x1f8]
0359d8: stxdw [r10 - 0x188], r1
0359e0: ldxdw r1, [r10 - 0x1d8]
0359e8: stxdw [r10 - 0x1a0], r1
0359f0: ldxdw r1, [r10 - 0x1d0]
0359f8: stxdw [r10 - 0x198], r1
035a00: ldxdw r1, [r10 - 0x1c8]
035a08: stxdw [r10 - 0x190], r1
035a10: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
035a20: stxdw [r10 - 0x1b8], r1
035a28: stw [r10 - 0x128], 0x17ad
035a30: stb [r10 - 0x170], 0x2
035a38: stw [r10 - 0x1a8], 0x39
035a40: stdw [r10 - 0x1b0], 0x2e
035a48: stdw [r10 - 0x1c0], 0x0
035a50: mov64 r1, r10
035a58: add64 r1, -0x2a8
035a60: mov64 r2, r10
035a68: add64 r2, -0x1c0
035a70: call 0x19aa8 ; call 0x102fb8
035a78: ldxdw r1, [r10 - 0x2a0]
035a80: ldxdw r2, [r10 - 0x2a8]
035a88: ldxdw r6, [r10 - 0x2c0]
035a90: ja -0x5c ; branch 0x357b8
035a98: ldxdw r6, [r9 + 0x10]
035aa0: ldxdw r1, [r6 + 0x0]
035aa8: add64 r1, 0x1
035ab0: mov64 r2, 0x1
035ab8: mov64 r7, r5
035ac0: jeq r1, 0x0, +0x1 ; branch 0x35ad0
035ac8: mov64 r2, 0x0
035ad0: stxdw [r6 + 0x0], r1
035ad8: jne r2, 0x1, +0x1 ; branch 0x35ae8
035ae0: ja -0x41 ; branch 0x358e0
035ae8: stxdw [r10 - 0x348], r3
035af0: ldxdw r5, [r7 + 0x8]
035af8: ldxdw r1, [r5 + 0x0]
035b00: add64 r1, 0x1
035b08: mov64 r2, 0x1
035b10: jeq r1, 0x0, +0x1 ; branch 0x35b20
035b18: mov64 r2, 0x0
035b20: ldxdw r3, [r7 + 0x0]
035b28: stxdw [r10 - 0x390], r3
035b30: ldxb r3, [r9 + 0x2a]
035b38: stxdw [r10 - 0x388], r3
035b40: ldxb r3, [r9 + 0x29]
035b48: stxdw [r10 - 0x380], r3
035b50: ldxb r3, [r9 + 0x28]
035b58: stxdw [r10 - 0x378], r3
035b60: ldxdw r3, [r9 + 0x20]
035b68: stxdw [r10 - 0x370], r3
035b70: ldxdw r3, [r9 + 0x18]
035b78: stxdw [r5 + 0x0], r1
035b80: jne r2, 0x1, +0x1 ; branch 0x35b90
035b88: ja -0x56 ; branch 0x358e0
035b90: stxdw [r10 - 0x358], r6
035b98: stxdw [r10 - 0x350], r8
035ba0: ldxdw r1, [r7 + 0x10]
035ba8: stxdw [r10 - 0x300], r1
035bb0: ldxdw r1, [r1 + 0x0]
035bb8: add64 r1, 0x1
035bc0: mov64 r2, 0x1
035bc8: jeq r1, 0x0, +0x1 ; branch 0x35bd8
035bd0: mov64 r2, 0x0
035bd8: ldxdw r9, [r10 - 0x300]
035be0: stxdw [r9 + 0x0], r1
035be8: jne r2, 0x1, +0x1 ; branch 0x35bf8
035bf0: ja -0x63 ; branch 0x358e0
035bf8: ldxdw r1, [r10 - 0x320]
035c00: ldxdw r6, [r1 + 0x8]
035c08: ldxdw r1, [r6 + 0x0]
035c10: add64 r1, 0x1
035c18: mov64 r2, 0x1
035c20: jeq r1, 0x0, +0x1 ; branch 0x35c30
035c28: mov64 r2, 0x0
035c30: ldxb r8, [r7 + 0x2a]
035c38: stxdw [r10 - 0x3b8], r8
035c40: ldxb r8, [r7 + 0x29]
035c48: stxdw [r10 - 0x3b0], r8
035c50: ldxb r8, [r7 + 0x28]
035c58: stxdw [r10 - 0x3a8], r8
035c60: ldxdw r8, [r7 + 0x20]
035c68: stxdw [r10 - 0x3a0], r8
035c70: ldxdw r7, [r7 + 0x18]
035c78: stxdw [r10 - 0x398], r7
035c80: stxdw [r6 + 0x0], r1
035c88: jne r2, 0x1, +0x1 ; branch 0x35c98
035c90: ja -0x77 ; branch 0x358e0
035c98: ldxdw r1, [r10 - 0x320]
035ca0: ldxdw r8, [r1 + 0x10]
035ca8: ldxdw r1, [r8 + 0x0]
035cb0: add64 r1, 0x1
035cb8: mov64 r2, 0x1
035cc0: ldxdw r7, [r10 - 0x330]
035cc8: jeq r1, 0x0, +0x1 ; branch 0x35cd8
035cd0: mov64 r2, 0x0
035cd8: stxdw [r8 + 0x0], r1
035ce0: jne r2, 0x1, +0x1 ; branch 0x35cf0
035ce8: ja -0x82 ; branch 0x358e0
035cf0: stxdw [r10 - 0x368], r6
035cf8: stxdw [r10 - 0x3c0], r3
035d00: ldxdw r1, [r7 + 0x8]
035d08: stxdw [r10 - 0x340], r1
035d10: ldxdw r1, [r1 + 0x0]
035d18: add64 r1, 0x1
035d20: mov64 r2, 0x1
035d28: jeq r1, 0x0, +0x1 ; branch 0x35d38
035d30: mov64 r2, 0x0
035d38: ldxdw r3, [r7 + 0x0]
035d40: stxdw [r10 - 0x3e8], r3
035d48: ldxdw r3, [r10 - 0x320]
035d50: ldxb r6, [r3 + 0x2a]
035d58: stxdw [r10 - 0x3e0], r6
035d60: ldxb r6, [r3 + 0x28]
035d68: stxdw [r10 - 0x3d8], r6
035d70: ldxdw r6, [r3 + 0x20]
035d78: stxdw [r10 - 0x3d0], r6
035d80: ldxdw r3, [r3 + 0x18]
035d88: stxdw [r10 - 0x3c8], r3
035d90: ldxdw r3, [r10 - 0x340]
035d98: stxdw [r3 + 0x0], r1
035da0: jne r2, 0x1, +0x1 ; branch 0x35db0
035da8: ja -0x9a ; branch 0x358e0
035db0: ldxdw r0, [r7 + 0x10]
035db8: ldxdw r1, [r0 + 0x0]
035dc0: add64 r1, 0x1
035dc8: mov64 r2, 0x1
035dd0: ldxdw r3, [r10 - 0x2d0]
035dd8: jeq r1, 0x0, +0x1 ; branch 0x35de8
035de0: mov64 r2, 0x0
035de8: stxdw [r0 + 0x0], r1
035df0: jne r2, 0x1, +0x1 ; branch 0x35e00
035df8: ja -0xa4 ; branch 0x358e0
035e00: mov64 r9, r5
035e08: ldxdw r1, [r3 + 0x8]
035e10: stxdw [r10 - 0x360], r1
035e18: ldxdw r1, [r1 + 0x0]
035e20: add64 r1, 0x1
035e28: mov64 r2, 0x1
035e30: jeq r1, 0x0, +0x1 ; branch 0x35e40
035e38: mov64 r2, 0x0
035e40: ldxdw r5, [r3 + 0x0]
035e48: stxdw [r10 - 0x410], r5
035e50: ldxb r5, [r7 + 0x2a]
035e58: stxdw [r10 - 0x408], r5
035e60: ldxb r5, [r7 + 0x29]
035e68: stxdw [r10 - 0x400], r5
035e70: ldxb r5, [r7 + 0x28]
035e78: stxdw [r10 - 0x3f8], r5
035e80: ldxdw r5, [r7 + 0x20]
035e88: stxdw [r10 - 0x3f0], r5
035e90: ldxdw r7, [r7 + 0x18]
035e98: stxdw [r10 - 0x330], r7
035ea0: ldxdw r7, [r10 - 0x360]
035ea8: stxdw [r7 + 0x0], r1
035eb0: jne r2, 0x1, +0x1 ; branch 0x35ec0
035eb8: ja -0xbc ; branch 0x358e0
035ec0: ldxdw r7, [r3 + 0x10]
035ec8: ldxdw r1, [r7 + 0x0]
035ed0: add64 r1, 0x1
035ed8: mov64 r2, 0x1
035ee0: mov64 r5, r9
035ee8: jeq r1, 0x0, +0x1 ; branch 0x35ef8
035ef0: mov64 r2, 0x0
035ef8: stxdw [r10 - 0x418], r7
035f00: stxdw [r7 + 0x0], r1
035f08: jne r2, 0x1, +0x1 ; branch 0x35f18
035f10: ja -0xc7 ; branch 0x358e0
035f18: ldxdw r6, [r4 + 0x8]
035f20: ldxdw r1, [r6 + 0x0]
035f28: add64 r1, 0x1
035f30: mov64 r2, 0x1
035f38: jeq r1, 0x0, +0x1 ; branch 0x35f48
035f40: mov64 r2, 0x0
035f48: ldxdw r9, [r4 + 0x0]
035f50: stxdw [r10 - 0x440], r9
035f58: ldxb r9, [r3 + 0x2a]
035f60: stxdw [r10 - 0x438], r9
035f68: ldxb r9, [r3 + 0x29]
035f70: stxdw [r10 - 0x430], r9
035f78: ldxb r9, [r3 + 0x28]
035f80: stxdw [r10 - 0x428], r9
035f88: ldxdw r9, [r3 + 0x20]
035f90: stxdw [r10 - 0x420], r9
035f98: ldxdw r9, [r3 + 0x18]
035fa0: stxdw [r6 + 0x0], r1
035fa8: jne r2, 0x1, +0x1 ; branch 0x35fb8
035fb0: ja -0xdb ; branch 0x358e0
035fb8: ldxdw r2, [r4 + 0x10]
035fc0: ldxdw r1, [r2 + 0x0]
035fc8: add64 r1, 0x1
035fd0: mov64 r3, 0x1
035fd8: jeq r1, 0x0, +0x1 ; branch 0x35fe8
035fe0: mov64 r3, 0x0
035fe8: stxdw [r10 - 0x448], r5
035ff0: stxdw [r2 + 0x0], r1
035ff8: jne r3, 0x1, +0x1 ; branch 0x36008
036000: ja -0xe5 ; branch 0x358e0
036008: stxdw [r10 - 0x458], r6
036010: mov64 r7, r8
036018: ldxdw r8, [r10 - 0x2c8]
036020: ldxdw r5, [r8 + 0x8]
036028: ldxdw r1, [r5 + 0x0]
036030: add64 r1, 0x1
036038: mov64 r3, 0x1
036040: jeq r1, 0x0, +0x1 ; branch 0x36050
036048: mov64 r3, 0x0
036050: ldxdw r6, [r8 + 0x0]
036058: stxdw [r10 - 0x478], r6
036060: ldxb r6, [r4 + 0x2a]
036068: stxdw [r10 - 0x470], r6
036070: ldxb r6, [r4 + 0x29]
036078: stxdw [r10 - 0x468], r6
036080: ldxb r6, [r4 + 0x28]
036088: stxdw [r10 - 0x460], r6
036090: mov64 r6, r8
036098: ldxdw r8, [r4 + 0x20]
0360a0: stxdw [r10 - 0x450], r8
0360a8: ldxdw r4, [r4 + 0x18]
0360b0: stxdw [r10 - 0x308], r4
0360b8: stxdw [r5 + 0x0], r1
0360c0: jne r3, 0x1, +0x1 ; branch 0x360d0
0360c8: ja -0xfe ; branch 0x358e0
0360d0: stxdw [r10 - 0x480], r0
0360d8: ldxdw r1, [r10 - 0x368]
0360e0: ldxdw r1, [r6 + 0x10]
0360e8: ldxdw r3, [r1 + 0x0]
0360f0: add64 r3, 0x1
0360f8: mov64 r4, 0x1
036100: mov64 r8, r6
036108: jeq r3, 0x0, +0x1 ; branch 0x36118
036110: mov64 r4, 0x0
036118: stxdw [r10 - 0x488], r7
036120: ldxdw r6, [r10 - 0x358]
036128: ldxdw r6, [r10 - 0x348]
036130: ldxdw r6, [r10 - 0x350]
036138: stxdw [r1 + 0x0], r3
036140: jne r4, 0x1, +0x1 ; branch 0x36150
036148: ja -0x10e ; branch 0x358e0
036150: ldxdw r3, [r8 + 0x18]
036158: ldxdw r4, [r8 + 0x20]
036160: ldxb r0, [r8 + 0x28]
036168: ldxb r6, [r8 + 0x29]
036170: ldxb r8, [r8 + 0x2a]
036178: stxb [r10 - 0x5e], r8
036180: stxb [r10 - 0x5f], r6
036188: stxb [r10 - 0x60], r0
036190: stxdw [r10 - 0x68], r4
036198: stxdw [r10 - 0x70], r3
0361a0: stxdw [r10 - 0x78], r1
0361a8: stxdw [r10 - 0x80], r5
0361b0: ldxdw r1, [r10 - 0x478]
0361b8: stxdw [r10 - 0x88], r1
0361c0: ldxdw r1, [r10 - 0x470]
0361c8: stxb [r10 - 0x8e], r1
0361d0: ldxdw r1, [r10 - 0x468]
0361d8: stxb [r10 - 0x8f], r1
0361e0: ldxdw r1, [r10 - 0x460]
0361e8: stxb [r10 - 0x90], r1
0361f0: ldxdw r1, [r10 - 0x450]
0361f8: stxdw [r10 - 0x98], r1
036200: ldxdw r1, [r10 - 0x308]
036208: stxdw [r10 - 0xa0], r1
036210: stxdw [r10 - 0xa8], r2
036218: ldxdw r1, [r10 - 0x458]
036220: stxdw [r10 - 0xb0], r1
036228: ldxdw r1, [r10 - 0x440]
036230: stxdw [r10 - 0xb8], r1
036238: ldxdw r1, [r10 - 0x438]
036240: stxb [r10 - 0xbe], r1
036248: ldxdw r1, [r10 - 0x430]
036250: stxb [r10 - 0xbf], r1
036258: ldxdw r1, [r10 - 0x428]
036260: stxb [r10 - 0xc0], r1
036268: ldxdw r1, [r10 - 0x420]
036270: stxdw [r10 - 0xc8], r1
036278: stxdw [r10 - 0xd0], r9
036280: ldxdw r1, [r10 - 0x418]
036288: stxdw [r10 - 0xd8], r1
036290: ldxdw r1, [r10 - 0x360]
036298: stxdw [r10 - 0xe0], r1
0362a0: ldxdw r1, [r10 - 0x410]
0362a8: stxdw [r10 - 0xe8], r1
0362b0: ldxdw r1, [r10 - 0x408]
0362b8: stxb [r10 - 0xee], r1
0362c0: ldxdw r1, [r10 - 0x400]
0362c8: stxb [r10 - 0xef], r1
0362d0: ldxdw r1, [r10 - 0x3f8]
0362d8: stxb [r10 - 0xf0], r1
0362e0: ldxdw r1, [r10 - 0x3f0]
0362e8: stxdw [r10 - 0xf8], r1
0362f0: ldxdw r1, [r10 - 0x330]
0362f8: stxdw [r10 - 0x100], r1
036300: ldxdw r1, [r10 - 0x480]
036308: stxdw [r10 - 0x108], r1
036310: ldxdw r1, [r10 - 0x340]
036318: stxdw [r10 - 0x110], r1
036320: ldxdw r1, [r10 - 0x3e8]
036328: stxdw [r10 - 0x118], r1
036330: ldxdw r1, [r10 - 0x3e0]
036338: stxb [r10 - 0x11e], r1
036340: ldxdw r1, [r10 - 0x338]
036348: stxb [r10 - 0x11f], r1
036350: ldxdw r1, [r10 - 0x3d8]
036358: stxb [r10 - 0x120], r1
036360: ldxdw r1, [r10 - 0x3d0]
036368: stxdw [r10 - 0x128], r1
036370: ldxdw r1, [r10 - 0x3c8]
036378: stxdw [r10 - 0x130], r1
036380: ldxdw r1, [r10 - 0x488]
036388: stxdw [r10 - 0x138], r1
036390: ldxdw r1, [r10 - 0x368]
036398: stxdw [r10 - 0x140], r1
0363a0: ldxdw r9, [r10 - 0x328]
0363a8: stxdw [r10 - 0x148], r9
0363b0: ldxdw r1, [r10 - 0x3b8]
0363b8: stxb [r10 - 0x14e], r1
0363c0: ldxdw r1, [r10 - 0x3b0]
0363c8: stxb [r10 - 0x14f], r1
0363d0: ldxdw r1, [r10 - 0x3a8]
0363d8: stxb [r10 - 0x150], r1
0363e0: ldxdw r1, [r10 - 0x3a0]
0363e8: stxdw [r10 - 0x158], r1
0363f0: ldxdw r1, [r10 - 0x398]
0363f8: stxdw [r10 - 0x160], r1
036400: ldxdw r1, [r10 - 0x300]
036408: stxdw [r10 - 0x168], r1
036410: ldxdw r1, [r10 - 0x448]
036418: stxdw [r10 - 0x170], r1
036420: ldxdw r1, [r10 - 0x390]
036428: stxdw [r10 - 0x178], r1
036430: ldxdw r1, [r10 - 0x388]
036438: stxb [r10 - 0x17e], r1
036440: ldxdw r1, [r10 - 0x380]
036448: stxb [r10 - 0x17f], r1
036450: ldxdw r1, [r10 - 0x378]
036458: stxb [r10 - 0x180], r1
036460: ldxdw r1, [r10 - 0x370]
036468: stxdw [r10 - 0x188], r1
036470: ldxdw r1, [r10 - 0x3c0]
036478: stxdw [r10 - 0x190], r1
036480: ldxdw r1, [r10 - 0x358]
036488: stxdw [r10 - 0x198], r1
036490: ldxdw r1, [r10 - 0x350]
036498: stxdw [r10 - 0x1a0], r1
0364a0: ldxdw r1, [r10 - 0x348]
0364a8: stxdw [r10 - 0x1a8], r1
0364b0: stdw [r10 - 0x50], 0x0
0364b8: stdw [r10 - 0x58], 0x8
0364c0: stdw [r10 - 0x1b0], 0x0
0364c8: stdw [r10 - 0x1b8], 0x8
0364d0: stdw [r10 - 0x1c0], 0x0
0364d8: mov64 r1, r10
0364e0: add64 r1, -0x238
0364e8: mov64 r2, r10
0364f0: add64 r2, -0x1c0
0364f8: call 0x17bbe ; call 0xf42f0
036500: ldxdw r1, [r10 - 0x230]
036508: ldxdw r2, [r10 - 0x238]
036510: ldxdw r8, [r10 - 0x310]
036518: jne r2, 0x2, -0x1ca ; branch 0x356d0
036520: ldxdw r3, [r10 - 0x2d8]
036528: ldxdw r7, [r3 + 0x20]
036530: ldxdw r1, [r7 + 0x0]
036538: ldxdw r2, [r1 + 0x18]
036540: stxdw [r10 - 0x1a8], r2
036548: ldxdw r2, [r1 + 0x10]
036550: stxdw [r10 - 0x1b0], r2
036558: ldxdw r2, [r1 + 0x8]
036560: stxdw [r10 - 0x1b8], r2
036568: ldxdw r1, [r1 + 0x0]
036570: stxdw [r10 - 0x1c0], r1
036578: ldxdw r5, [r8 + 0x0]
036580: add64 r3, 0x48
036588: mov64 r1, r10
036590: add64 r1, -0x248
036598: mov64 r2, r10
0365a0: add64 r2, -0x1c0
0365a8: mov64 r4, r9
0365b0: call 0x720a ; call 0x6f608
0365b8: ldxdw r1, [r10 - 0x240]
0365c0: ldxdw r2, [r10 - 0x248]
0365c8: jne r2, 0x2, -0x1e0 ; branch 0x356d0
0365d0: mov64 r9, r8
0365d8: ldxdw r4, [r10 - 0x2c8]
0365e0: ldxdw r6, [r4 + 0x8]
0365e8: ldxdw r1, [r6 + 0x0]
0365f0: add64 r1, 0x1
0365f8: mov64 r2, 0x1
036600: jeq r1, 0x0, +0x1 ; branch 0x36610
036608: mov64 r2, 0x0
036610: ldxdw r5, [r4 + 0x0]
036618: stxdw [r6 + 0x0], r1
036620: ldxdw r3, [r10 - 0x2d0]
036628: jne r2, 0x1, +0x1 ; branch 0x36638
036630: ja -0x1ab ; branch 0x358e0
036638: ldxdw r0, [r4 + 0x10]
036640: ldxdw r1, [r0 + 0x0]
036648: add64 r1, 0x1
036650: mov64 r2, 0x1
036658: jeq r1, 0x0, +0x1 ; branch 0x36668
036660: mov64 r2, 0x0
036668: stxdw [r10 - 0x2d8], r5
036670: stxdw [r0 + 0x0], r1
036678: jne r2, 0x1, +0x1 ; branch 0x36688
036680: ja -0x1b5 ; branch 0x358e0
036688: stxdw [r10 - 0x300], r6
036690: ldxdw r5, [r7 + 0x8]
036698: ldxdw r1, [r5 + 0x0]
0366a0: add64 r1, 0x1
0366a8: mov64 r2, 0x1
0366b0: jeq r1, 0x0, +0x1 ; branch 0x366c0
0366b8: mov64 r2, 0x0
0366c0: ldxdw r6, [r7 + 0x0]
0366c8: stxdw [r10 - 0x350], r6
0366d0: ldxb r6, [r4 + 0x2a]
0366d8: stxdw [r10 - 0x348], r6
0366e0: ldxb r6, [r4 + 0x29]
0366e8: stxdw [r10 - 0x340], r6
0366f0: ldxb r6, [r4 + 0x28]
0366f8: stxdw [r10 - 0x330], r6
036700: ldxdw r6, [r4 + 0x20]
036708: stxdw [r10 - 0x310], r6
036710: ldxdw r4, [r4 + 0x18]
036718: stxdw [r5 + 0x0], r1
036720: jne r2, 0x1, +0x1 ; branch 0x36730
036728: ja -0x1ca ; branch 0x358e0
036730: ldxdw r6, [r7 + 0x10]
036738: ldxdw r1, [r6 + 0x0]
036740: add64 r1, 0x1
036748: mov64 r2, 0x1
036750: jeq r1, 0x0, +0x1 ; branch 0x36760
036758: mov64 r2, 0x0
036760: stxdw [r6 + 0x0], r1
036768: jne r2, 0x1, +0x1 ; branch 0x36778
036770: ja -0x1d3 ; branch 0x358e0
036778: stxdw [r10 - 0x308], r0
036780: ldxdw r1, [r3 + 0x8]
036788: stxdw [r10 - 0x2c8], r1
036790: ldxdw r1, [r1 + 0x0]
036798: add64 r1, 0x1
0367a0: mov64 r2, 0x1
0367a8: jeq r1, 0x0, +0x1 ; branch 0x367b8
0367b0: mov64 r2, 0x0
0367b8: ldxdw r8, [r3 + 0x0]
0367c0: stxdw [r10 - 0x378], r8
0367c8: ldxb r8, [r7 + 0x2a]
0367d0: stxdw [r10 - 0x370], r8
0367d8: ldxb r8, [r7 + 0x29]
0367e0: stxdw [r10 - 0x368], r8
0367e8: ldxb r8, [r7 + 0x28]
0367f0: stxdw [r10 - 0x360], r8
0367f8: ldxdw r8, [r7 + 0x20]
036800: stxdw [r10 - 0x358], r8
036808: ldxdw r0, [r7 + 0x18]
036810: ldxdw r8, [r10 - 0x2c8]
036818: stxdw [r8 + 0x0], r1
036820: jne r2, 0x1, +0x1 ; branch 0x36830
036828: ja -0x1ea ; branch 0x358e0
036830: ldxdw r8, [r3 + 0x10]
036838: ldxdw r1, [r8 + 0x0]
036840: add64 r1, 0x1
036848: mov64 r2, 0x1
036850: jeq r1, 0x0, +0x1 ; branch 0x36860
036858: mov64 r2, 0x0
036860: stxdw [r10 - 0x380], r5
036868: stxdw [r8 + 0x0], r1
036870: jne r2, 0x1, +0x1 ; branch 0x36880
036878: ja -0x1f4 ; branch 0x358e0
036880: mov64 r7, r4
036888: ldxdw r1, [r10 - 0x320]
036890: ldxdw r5, [r1 + 0x8]
036898: ldxdw r1, [r5 + 0x0]
0368a0: add64 r1, 0x1
0368a8: mov64 r2, 0x1
0368b0: jeq r1, 0x0, +0x1 ; branch 0x368c0
0368b8: mov64 r2, 0x0
0368c0: ldxb r4, [r3 + 0x2a]
0368c8: stxdw [r10 - 0x3a0], r4
0368d0: ldxb r4, [r3 + 0x29]
0368d8: stxdw [r10 - 0x398], r4
0368e0: ldxb r4, [r3 + 0x28]
0368e8: stxdw [r10 - 0x390], r4
0368f0: ldxdw r4, [r3 + 0x20]
0368f8: stxdw [r10 - 0x388], r4
036900: ldxdw r3, [r3 + 0x18]
036908: stxdw [r10 - 0x2d0], r3
036910: stxdw [r5 + 0x0], r1
036918: jne r2, 0x1, +0x1 ; branch 0x36928
036920: ja -0x209 ; branch 0x358e0
036928: ldxdw r1, [r10 - 0x320]
036930: ldxdw r1, [r1 + 0x10]
036938: ldxdw r2, [r1 + 0x0]
036940: add64 r2, 0x1
036948: mov64 r3, 0x1
036950: jeq r2, 0x0, +0x1 ; branch 0x36960
036958: mov64 r3, 0x0
036960: stxdw [r10 - 0x3b0], r8
036968: stxdw [r10 - 0x3a8], r7
036970: stxdw [r1 + 0x0], r2
036978: jne r3, 0x1, +0x1 ; branch 0x36988
036980: ja -0x215 ; branch 0x358e0
036988: ldxdw r3, [r9 + 0x8]
036990: ldxdw r8, [r3 + 0x0]
036998: add64 r8, 0x1
0369a0: mov64 r4, 0x1
0369a8: mov64 r7, r0
0369b0: jeq r8, 0x0, +0x1 ; branch 0x369c0
0369b8: mov64 r4, 0x0
0369c0: ldxdw r2, [r9 + 0x0]
0369c8: stxdw [r10 - 0x3d8], r2
0369d0: ldxdw r2, [r10 - 0x320]
0369d8: ldxb r0, [r2 + 0x2a]
0369e0: stxdw [r10 - 0x3d0], r0
0369e8: ldxb r0, [r2 + 0x28]
0369f0: stxdw [r10 - 0x3c8], r0
0369f8: ldxdw r0, [r2 + 0x20]
036a00: stxdw [r10 - 0x3c0], r0
036a08: ldxdw r2, [r2 + 0x18]
036a10: stxdw [r10 - 0x3b8], r2
036a18: stxdw [r3 + 0x0], r8
036a20: jne r4, 0x1, +0x1 ; branch 0x36a30
036a28: ja -0x22a ; branch 0x358e0
036a30: ldxdw r2, [r10 - 0x308]
036a38: ldxdw r2, [r10 - 0x300]
036a40: ldxdw r8, [r9 + 0x10]
036a48: ldxdw r4, [r8 + 0x0]
036a50: add64 r4, 0x1
036a58: mov64 r0, 0x1
036a60: jeq r4, 0x0, +0x1 ; branch 0x36a70
036a68: mov64 r0, 0x0
036a70: stxdw [r10 - 0x3e8], r7
036a78: stxdw [r10 - 0x3e0], r6
036a80: ldxdw r2, [r10 - 0x2d8]
036a88: stxdw [r8 + 0x0], r4
036a90: jne r0, 0x1, +0x1 ; branch 0x36aa0
036a98: ja -0x238 ; branch 0x358e0
036aa0: ldxdw r4, [r9 + 0x18]
036aa8: ldxdw r0, [r9 + 0x20]
036ab0: ldxb r6, [r9 + 0x28]
036ab8: ldxb r2, [r9 + 0x29]
036ac0: ldxb r7, [r9 + 0x2a]
036ac8: stxb [r10 - 0xbe], r7
036ad0: stxb [r10 - 0xbf], r2
036ad8: stxb [r10 - 0xc0], r6
036ae0: stxdw [r10 - 0xc8], r0
036ae8: stxdw [r10 - 0xd0], r4
036af0: stxdw [r10 - 0xd8], r8
036af8: stxdw [r10 - 0xe0], r3
036b00: ldxdw r2, [r10 - 0x3d8]
036b08: stxdw [r10 - 0xe8], r2
036b10: ldxdw r2, [r10 - 0x3d0]
036b18: stxb [r10 - 0xee], r2
036b20: ldxdw r2, [r10 - 0x338]
036b28: stxb [r10 - 0xef], r2
036b30: ldxdw r2, [r10 - 0x3c8]
036b38: stxb [r10 - 0xf0], r2
036b40: ldxdw r2, [r10 - 0x3c0]
036b48: stxdw [r10 - 0xf8], r2
036b50: ldxdw r2, [r10 - 0x3b8]
036b58: stxdw [r10 - 0x100], r2
036b60: stxdw [r10 - 0x108], r1
036b68: stxdw [r10 - 0x110], r5
036b70: ldxdw r1, [r10 - 0x328]
036b78: stxdw [r10 - 0x118], r1
036b80: ldxdw r1, [r10 - 0x3a0]
036b88: stxb [r10 - 0x11e], r1
036b90: ldxdw r1, [r10 - 0x398]
036b98: stxb [r10 - 0x11f], r1
036ba0: ldxdw r1, [r10 - 0x390]
036ba8: stxb [r10 - 0x120], r1
036bb0: ldxdw r1, [r10 - 0x388]
036bb8: stxdw [r10 - 0x128], r1
036bc0: ldxdw r1, [r10 - 0x2d0]
036bc8: stxdw [r10 - 0x130], r1
036bd0: ldxdw r1, [r10 - 0x3b0]
036bd8: stxdw [r10 - 0x138], r1
036be0: ldxdw r1, [r10 - 0x2c8]
036be8: stxdw [r10 - 0x140], r1
036bf0: ldxdw r1, [r10 - 0x378]
036bf8: stxdw [r10 - 0x148], r1
036c00: ldxdw r1, [r10 - 0x370]
036c08: stxb [r10 - 0x14e], r1
036c10: ldxdw r1, [r10 - 0x368]
036c18: stxb [r10 - 0x14f], r1
036c20: ldxdw r1, [r10 - 0x360]
036c28: stxb [r10 - 0x150], r1
036c30: ldxdw r1, [r10 - 0x358]
036c38: stxdw [r10 - 0x158], r1
036c40: ldxdw r1, [r10 - 0x3e8]
036c48: stxdw [r10 - 0x160], r1
036c50: ldxdw r1, [r10 - 0x3e0]
036c58: stxdw [r10 - 0x168], r1
036c60: ldxdw r1, [r10 - 0x380]
036c68: stxdw [r10 - 0x170], r1
036c70: ldxdw r1, [r10 - 0x350]
036c78: stxdw [r10 - 0x178], r1
036c80: ldxdw r1, [r10 - 0x348]
036c88: stxb [r10 - 0x17e], r1
036c90: ldxdw r1, [r10 - 0x340]
036c98: stxb [r10 - 0x17f], r1
036ca0: ldxdw r1, [r10 - 0x330]
036ca8: stxb [r10 - 0x180], r1
036cb0: ldxdw r1, [r10 - 0x310]
036cb8: stxdw [r10 - 0x188], r1
036cc0: ldxdw r1, [r10 - 0x3a8]
036cc8: stxdw [r10 - 0x190], r1
036cd0: ldxdw r1, [r10 - 0x308]
036cd8: stxdw [r10 - 0x198], r1
036ce0: ldxdw r1, [r10 - 0x300]
036ce8: stxdw [r10 - 0x1a0], r1
036cf0: ldxdw r1, [r10 - 0x2d8]
036cf8: stxdw [r10 - 0x1a8], r1
036d00: stdw [r10 - 0xb0], 0x0
036d08: stdw [r10 - 0xb8], 0x8
036d10: stdw [r10 - 0x1b0], 0x0
036d18: stdw [r10 - 0x1b8], 0x8
036d20: stdw [r10 - 0x1c0], 0x0
036d28: mov64 r1, r10
036d30: add64 r1, -0x258
036d38: mov64 r2, r10
036d40: add64 r2, -0x1c0
036d48: ldxdw r3, [r10 - 0x2e0]
036d50: ldxdw r4, [r10 - 0x2e8]
036d58: call 0x17b9a ; call 0xf4a30
036d60: ldxdw r1, [r10 - 0x250]
036d68: ldxdw r2, [r10 - 0x258]
036d70: jne r2, 0x2, -0x2d5 ; branch 0x356d0
036d78: ldxdw r7, [r10 - 0x2f0]
036d80: ldxdw r2, [r7 + 0x48]
036d88: mov64 r6, r2
036d90: ldxdw r1, [r10 - 0x2e0]
036d98: add64 r6, r1
036da0: mov64 r1, 0x1
036da8: jlt r6, r2, +0x1 ; branch 0x36db8
036db0: mov64 r1, 0x0
036db8: and64 r1, 0x1
036dc0: jne r1, 0x0, +0x4a ; branch 0x37018
036dc8: mov64 r1, r10
036dd0: add64 r1, -0x1f8
036dd8: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
036de8: call 0x7cc1 ; call 0x753f8
036df0: mov64 r1, r10
036df8: add64 r1, -0x48
036e00: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
036e10: call -0x5ccf ; call 0x87a0
036e18: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
036e28: stxdw [r10 - 0x1b8], r1
036e30: ldxdw r1, [r10 - 0x1e8]
036e38: stxdw [r10 - 0x190], r1
036e40: ldxdw r1, [r10 - 0x1f0]
036e48: stxdw [r10 - 0x198], r1
036e50: ldxdw r1, [r10 - 0x1f8]
036e58: stxdw [r10 - 0x1a0], r1
036e60: ldxdw r1, [r10 - 0x48]
036e68: stxdw [r10 - 0x188], r1
036e70: ldxdw r1, [r10 - 0x40]
036e78: stxdw [r10 - 0x180], r1
036e80: ldxdw r1, [r10 - 0x38]
036e88: stxdw [r10 - 0x178], r1
036e90: stw [r10 - 0x128], 0x1787
036e98: stb [r10 - 0x170], 0x2
036ea0: stw [r10 - 0x1a8], 0x62
036ea8: stdw [r10 - 0x1b0], 0x2e
036eb0: stdw [r10 - 0x1c0], 0x0
036eb8: mov64 r1, r10
036ec0: add64 r1, -0x268
036ec8: mov64 r2, r10
036ed0: add64 r2, -0x1c0
036ed8: call 0x1981b ; call 0x102fb8
036ee0: ldxdw r2, [r10 - 0x260]
036ee8: ldxdw r1, [r10 - 0x268]
036ef0: call -0x5a6b ; call 0x9ba0
036ef8: stxdw [r7 + 0x48], r6
036f00: mov64 r1, r10
036f08: add64 r1, -0x278
036f10: mov64 r2, r7
036f18: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
036f28: lddw r4, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
036f38: call -0x64d1 ; call 0x48b8
036f40: ldxdw r1, [r10 - 0x270]
036f48: ldxdw r2, [r10 - 0x278]
036f50: jeq r2, 0x2, +0x1 ; branch 0x36f60
036f58: ja -0x312 ; branch 0x356d0
036f60: ldxdw r2, [r10 - 0x2f8]
036f68: ldxdw r1, [r2 + 0x18]
036f70: stxdw [r10 - 0x1a8], r1
036f78: ldxdw r1, [r2 + 0x10]
036f80: stxdw [r10 - 0x1b0], r1
036f88: ldxdw r1, [r2 + 0x8]
036f90: stxdw [r10 - 0x1b8], r1
036f98: ldxdw r1, [r2 + 0x0]
036fa0: stxdw [r10 - 0x1c0], r1
036fa8: mov64 r1, r10
036fb0: add64 r1, -0x288
036fb8: mov64 r4, r10
036fc0: add64 r4, -0x1c0
036fc8: ldxdw r2, [r10 - 0x320]
036fd0: ldxdw r3, [r10 - 0x318]
036fd8: mov64 r5, 0x1
036fe0: call 0x2f55 ; call 0x4ea90
036fe8: ldxdw r1, [r10 - 0x280]
036ff0: ldxdw r2, [r10 - 0x288]
036ff8: jne r2, 0x2, -0x326 ; branch 0x356d0
037000: mov64 r2, 0x2
037008: ldxdw r6, [r10 - 0x2c0]
037010: ja -0x30c ; branch 0x357b8
037018: mov64 r1, r10
037020: add64 r1, -0x1f8
037028: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
037038: call 0x7c77 ; call 0x753f8
037040: mov64 r1, r10
037048: add64 r1, -0x48
037050: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
037060: call -0x5d19 ; call 0x87a0
037068: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
037078: stxdw [r10 - 0x1b8], r1
037080: ldxdw r1, [r10 - 0x1e8]
037088: stxdw [r10 - 0x190], r1
037090: ldxdw r1, [r10 - 0x1f0]
037098: stxdw [r10 - 0x198], r1
0370a0: ldxdw r1, [r10 - 0x1f8]
0370a8: stxdw [r10 - 0x1a0], r1
0370b0: ldxdw r1, [r10 - 0x48]
0370b8: stxdw [r10 - 0x188], r1
0370c0: ldxdw r1, [r10 - 0x40]
0370c8: stxdw [r10 - 0x180], r1
0370d0: ldxdw r1, [r10 - 0x38]
0370d8: stxdw [r10 - 0x178], r1
0370e0: stw [r10 - 0x128], 0x1787
0370e8: stb [r10 - 0x170], 0x2
0370f0: stw [r10 - 0x1a8], 0x62
0370f8: stdw [r10 - 0x1b0], 0x2e
037100: stdw [r10 - 0x1c0], 0x0
037108: mov64 r1, r10
037110: add64 r1, -0x298
037118: mov64 r2, r10
037120: add64 r2, -0x1c0
037128: call 0x197d1 ; call 0x102fb8
037130: ldxdw r1, [r10 - 0x290]
037138: ldxdw r2, [r10 - 0x298]
037140: ldxdw r6, [r10 - 0x2c0]
037148: ja -0x333 ; branch 0x357b8
