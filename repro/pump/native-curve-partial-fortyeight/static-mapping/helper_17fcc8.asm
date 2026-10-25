17fcc8: mov64 r9, r2
17fcd0: stxdw [r10 - 0x168], r1
17fcd8: ldxdw r0, [r9 + 0x78]
17fce0: ldxdw r6, [r9 + 0x48]
17fce8: ldxdw r2, [r9 + 0x18]
17fcf0: ldxdw r1, [r9 + 0xa8]
17fcf8: ldxdw r5, [r9 + 0xd8]
17fd00: stxdw [r10 - 0xfe0], r3
17fd08: stxdw [r10 - 0xfd8], r4
17fd10: stxdw [r10 - 0xff8], r5
17fd18: stxdw [r10 - 0x1000], r1
17fd20: stdw [r10 - 0xfe8], 0x0
17fd28: stdw [r10 - 0xff0], 0x8
17fd30: mov64 r1, r10
17fd38: add64 r1, -0xc0
17fd40: mov64 r5, r10
17fd48: mov64 r3, r6
17fd50: mov64 r4, r0
17fd58: call 0x272e ; direct target 0x1936d0
17fd60: ldxdw r1, [r10 - 0xb8]
17fd68: stxdw [r10 - 0xf0], r1
17fd70: ldxdw r1, [r10 - 0xb0]
17fd78: stxdw [r10 - 0xe8], r1
17fd80: ldxdw r1, [r10 - 0xa8]
17fd88: stxdw [r10 - 0xe0], r1
17fd90: ldxdw r8, [r10 - 0xc0]
17fd98: lddw r1, -0x8000000000000000
17fda8: jeq r8, r1, +0x72 ; branch 0x180140
17fdb0: mov64 r1, r9
17fdb8: add64 r1, 0xd8
17fdc0: stxdw [r10 - 0x170], r1
17fdc8: mov64 r1, r9
17fdd0: add64 r1, 0xa8
17fdd8: stxdw [r10 - 0x178], r1
17fde0: mov64 r6, r9
17fde8: add64 r6, 0x78
17fdf0: mov64 r7, r9
17fdf8: add64 r7, 0x48
17fe00: mov64 r1, r10
17fe08: add64 r1, -0x120
17fe10: mov64 r2, r10
17fe18: add64 r2, -0xa0
17fe20: mov64 r3, 0x30
17fe28: call 0x66fc ; direct target 0x1b3610
17fe30: stxdw [r10 - 0x140], r8
17fe38: ldxdw r1, [r10 - 0xf0]
17fe40: stxdw [r10 - 0x138], r1
17fe48: ldxdw r1, [r10 - 0xe8]
17fe50: stxdw [r10 - 0x130], r1
17fe58: ldxdw r1, [r10 - 0xe0]
17fe60: stxdw [r10 - 0x128], r1
17fe68: mov64 r1, r10
17fe70: add64 r1, -0xc0
17fe78: stxdw [r10 - 0x180], r1
17fe80: mov64 r2, r7
17fe88: mov64 r3, 0x30
17fe90: call 0x66ef ; direct target 0x1b3610
17fe98: mov64 r1, r10
17fea0: add64 r1, -0x90
17fea8: mov64 r2, r6
17feb0: mov64 r3, 0x30
17feb8: call 0x66ea ; direct target 0x1b3610
17fec0: mov64 r1, r10
17fec8: add64 r1, -0x60
17fed0: ldxdw r2, [r10 - 0x178]
17fed8: mov64 r3, 0x30
17fee0: call 0x66e5 ; direct target 0x1b3610
17fee8: mov64 r1, r10
17fef0: add64 r1, -0x30
17fef8: ldxdw r2, [r10 - 0x170]
17ff00: mov64 r3, 0x30
17ff08: call 0x66e0 ; direct target 0x1b3610
17ff10: ldxdw r1, [r9 + 0x110]
17ff18: ldxdw r2, [r9 + 0x108]
17ff20: stxdw [r10 - 0x1000], r2
17ff28: stxdw [r10 - 0xff8], r1
17ff30: mov64 r1, r10
17ff38: add64 r1, -0xd8
17ff40: mov64 r2, r10
17ff48: add64 r2, -0x140
17ff50: mov64 r5, r10
17ff58: ldxdw r3, [r10 - 0x180]
17ff60: mov64 r4, 0x4
17ff68: call 0x40b8 ; direct target 0x1a0530
17ff70: mov64 r6, 0x2
17ff78: lddw r1, -0x7fffffffffffffe6
17ff88: ldxdw r2, [r10 - 0xd8]
17ff90: jeq r2, r1, +0x8 ; branch 0x17ffd8
17ff98: mov64 r1, r10
17ffa0: add64 r1, -0x150
17ffa8: mov64 r2, r10
17ffb0: add64 r2, -0xd8
17ffb8: call 0x377f ; direct target 0x19bbb8
17ffc0: ldxdw r8, [r10 - 0x140]
17ffc8: ldxdw r7, [r10 - 0x148]
17ffd0: ldxdw r6, [r10 - 0x150]
17ffd8: jeq r8, 0x0, +0x5 ; branch 0x180008
17ffe0: mul64 r8, 0x22
17ffe8: ldxdw r1, [r10 - 0x138]
17fff0: mov64 r2, r8
17fff8: mov64 r3, 0x1
180000: call -0x51ea ; direct target 0x1570b8
180008: ldxdw r2, [r10 - 0x128]
180010: jeq r2, 0x0, +0x3 ; branch 0x180030
180018: ldxdw r1, [r10 - 0x120]
180020: mov64 r3, 0x1
180028: call -0x51ef ; direct target 0x1570b8
180030: mov64 r1, r10
180038: add64 r1, -0xc0
180040: call -0x627 ; direct target 0x17cf10
180048: mov64 r1, r9
180050: call -0x4ac ; direct target 0x17daf8
180058: ldxdw r8, [r9 + 0x28]
180060: ldxdw r1, [r9 + 0x20]
180068: ldxdw r2, [r1 + 0x0]
180070: add64 r2, -0x1
180078: stxdw [r1 + 0x0], r2
180080: jne r2, 0x0, +0x7 ; branch 0x1800c0
180088: ldxdw r2, [r1 + 0x8]
180090: add64 r2, -0x1
180098: stxdw [r1 + 0x8], r2
1800a0: jne r2, 0x0, +0x3 ; branch 0x1800c0
1800a8: mov64 r2, 0x20
1800b0: mov64 r3, 0x8
1800b8: call -0x5201 ; direct target 0x1570b8
1800c0: ldxdw r1, [r8 + 0x0]
1800c8: add64 r1, -0x1
1800d0: stxdw [r8 + 0x0], r1
1800d8: jne r1, 0x0, +0x8 ; branch 0x180120
1800e0: ldxdw r1, [r8 + 0x8]
1800e8: add64 r1, -0x1
1800f0: stxdw [r8 + 0x8], r1
1800f8: jne r1, 0x0, +0x4 ; branch 0x180120
180100: mov64 r1, r8
180108: mov64 r2, 0x28
180110: mov64 r3, 0x8
180118: call -0x520d ; direct target 0x1570b8
180120: ldxdw r1, [r10 - 0x168]
180128: stxdw [r1 + 0x8], r7
180130: stxdw [r1 + 0x0], r6
180138: exit
180140: mov64 r1, r10
180148: add64 r1, -0x160
180150: mov64 r2, r10
180158: add64 r2, -0xf0
180160: call 0x374a ; direct target 0x19bbb8
180168: ldxdw r7, [r10 - 0x158]
180170: ldxdw r6, [r10 - 0x160]
180178: ldxdw r8, [r9 + 0x58]
180180: ldxdw r1, [r9 + 0x50]
180188: ldxdw r2, [r1 + 0x0]
180190: add64 r2, -0x1
180198: stxdw [r1 + 0x0], r2
1801a0: jne r2, 0x0, +0x7 ; branch 0x1801e0
1801a8: ldxdw r2, [r1 + 0x8]
1801b0: add64 r2, -0x1
1801b8: stxdw [r1 + 0x8], r2
1801c0: jne r2, 0x0, +0x3 ; branch 0x1801e0
1801c8: mov64 r2, 0x20
1801d0: mov64 r3, 0x8
1801d8: call -0x5225 ; direct target 0x1570b8
1801e0: ldxdw r1, [r8 + 0x0]
1801e8: add64 r1, -0x1
1801f0: stxdw [r8 + 0x0], r1
1801f8: jne r1, 0x0, +0x8 ; branch 0x180240
180200: ldxdw r1, [r8 + 0x8]
180208: add64 r1, -0x1
180210: stxdw [r8 + 0x8], r1
180218: jne r1, 0x0, +0x4 ; branch 0x180240
180220: mov64 r1, r8
180228: mov64 r2, 0x28
180230: mov64 r3, 0x8
180238: call -0x5231 ; direct target 0x1570b8
180240: ldxdw r8, [r9 + 0x88]
180248: ldxdw r1, [r9 + 0x80]
180250: ldxdw r2, [r1 + 0x0]
180258: add64 r2, -0x1
180260: stxdw [r1 + 0x0], r2
180268: jne r2, 0x0, +0x7 ; branch 0x1802a8
180270: ldxdw r2, [r1 + 0x8]
180278: add64 r2, -0x1
180280: stxdw [r1 + 0x8], r2
180288: jne r2, 0x0, +0x3 ; branch 0x1802a8
180290: mov64 r2, 0x20
180298: mov64 r3, 0x8
1802a0: call -0x523e ; direct target 0x1570b8
1802a8: ldxdw r1, [r8 + 0x0]
1802b0: add64 r1, -0x1
1802b8: stxdw [r8 + 0x0], r1
1802c0: jne r1, 0x0, +0x8 ; branch 0x180308
1802c8: ldxdw r1, [r8 + 0x8]
1802d0: add64 r1, -0x1
1802d8: stxdw [r8 + 0x8], r1
1802e0: jne r1, 0x0, +0x4 ; branch 0x180308
1802e8: mov64 r1, r8
1802f0: mov64 r2, 0x28
1802f8: mov64 r3, 0x8
180300: call -0x524a ; direct target 0x1570b8
180308: ldxdw r8, [r9 + 0xb8]
180310: ldxdw r1, [r9 + 0xb0]
180318: ldxdw r2, [r1 + 0x0]
180320: add64 r2, -0x1
180328: stxdw [r1 + 0x0], r2
180330: jne r2, 0x0, +0x7 ; branch 0x180370
180338: ldxdw r2, [r1 + 0x8]
180340: add64 r2, -0x1
180348: stxdw [r1 + 0x8], r2
180350: jne r2, 0x0, +0x3 ; branch 0x180370
180358: mov64 r2, 0x20
180360: mov64 r3, 0x8
180368: call -0x5257 ; direct target 0x1570b8
180370: ldxdw r1, [r8 + 0x0]
180378: add64 r1, -0x1
180380: stxdw [r8 + 0x0], r1
180388: jne r1, 0x0, +0x8 ; branch 0x1803d0
180390: ldxdw r1, [r8 + 0x8]
180398: add64 r1, -0x1
1803a0: stxdw [r8 + 0x8], r1
1803a8: jne r1, 0x0, +0x4 ; branch 0x1803d0
1803b0: mov64 r1, r8
1803b8: mov64 r2, 0x28
1803c0: mov64 r3, 0x8
1803c8: call -0x5263 ; direct target 0x1570b8
1803d0: ldxdw r8, [r9 + 0xe8]
1803d8: ldxdw r1, [r9 + 0xe0]
1803e0: ldxdw r2, [r1 + 0x0]
1803e8: add64 r2, -0x1
1803f0: stxdw [r1 + 0x0], r2
1803f8: jne r2, 0x0, +0x7 ; branch 0x180438
180400: ldxdw r2, [r1 + 0x8]
180408: add64 r2, -0x1
180410: stxdw [r1 + 0x8], r2
180418: jne r2, 0x0, +0x3 ; branch 0x180438
180420: mov64 r2, 0x20
180428: mov64 r3, 0x8
180430: call -0x5270 ; direct target 0x1570b8
180438: ldxdw r1, [r8 + 0x0]
180440: add64 r1, -0x1
180448: stxdw [r8 + 0x0], r1
180450: jne r1, 0x0, +0x8 ; branch 0x180498
180458: ldxdw r1, [r8 + 0x8]
180460: add64 r1, -0x1
180468: stxdw [r8 + 0x8], r1
180470: jne r1, 0x0, +0x4 ; branch 0x180498
180478: mov64 r1, r8
180480: mov64 r2, 0x28
180488: mov64 r3, 0x8
180490: call -0x527c ; direct target 0x1570b8
180498: mov64 r1, r9
1804a0: call -0x536 ; direct target 0x17daf8
1804a8: ldxdw r8, [r9 + 0x28]
1804b0: ldxdw r1, [r9 + 0x20]
1804b8: ldxdw r2, [r1 + 0x0]
1804c0: add64 r2, -0x1
1804c8: stxdw [r1 + 0x0], r2
1804d0: jne r2, 0x0, +0x7 ; branch 0x180510
1804d8: ldxdw r2, [r1 + 0x8]
1804e0: add64 r2, -0x1
1804e8: stxdw [r1 + 0x8], r2
1804f0: jne r2, 0x0, +0x3 ; branch 0x180510
1804f8: mov64 r2, 0x20
180500: mov64 r3, 0x8
180508: call -0x528b ; direct target 0x1570b8
180510: ldxdw r1, [r8 + 0x0]
180518: add64 r1, -0x1
180520: stxdw [r8 + 0x0], r1
180528: jne r1, 0x0, -0x82 ; branch 0x180120
180530: ldxdw r1, [r8 + 0x8]
180538: add64 r1, -0x1
180540: stxdw [r8 + 0x8], r1
180548: jne r1, 0x0, -0x86 ; branch 0x180120
180550: ja -0x8b ; branch 0x180100
