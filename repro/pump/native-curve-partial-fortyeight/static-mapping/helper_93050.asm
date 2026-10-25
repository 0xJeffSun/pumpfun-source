093050: mov64 r7, r4
093058: mov64 r0, r3
093060: mov64 r4, 0x2
093068: ldxdw r9, [r5 - 0xfe8]
093070: jeq r9, 0x0, +0x101 ; branch 0x93880
093078: ldxdw r3, [r2 + 0x8]
093080: stxdw [r10 - 0x130], r3
093088: ldxdw r3, [r3 + 0x0]
093090: add64 r3, 0x1
093098: mov64 r4, 0x1
0930a0: jeq r3, 0x0, +0x1 ; branch 0x930b0
0930a8: mov64 r4, 0x0
0930b0: ldxdw r6, [r5 - 0xfe0]
0930b8: stxdw [r10 - 0x160], r6
0930c0: ldxdw r8, [r5 - 0xff0]
0930c8: ldxdw r6, [r5 - 0xff8]
0930d0: stxdw [r10 - 0x150], r6
0930d8: ldxdw r6, [r5 - 0x1000]
0930e0: ldxdw r5, [r2 + 0x0]
0930e8: stxdw [r10 - 0x158], r5
0930f0: ldxdw r5, [r10 - 0x130]
0930f8: stxdw [r5 + 0x0], r3
093100: jne r4, 0x1, +0x1 ; branch 0x93110
093108: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
093110: ldxdw r5, [r2 + 0x10]
093118: ldxdw r3, [r5 + 0x0]
093120: add64 r3, 0x1
093128: mov64 r4, 0x1
093130: jeq r3, 0x0, +0x1 ; branch 0x93140
093138: mov64 r4, 0x0
093140: stxdw [r10 - 0x168], r5
093148: stxdw [r5 + 0x0], r3
093150: jne r4, 0x1, +0x1 ; branch 0x93160
093158: ja -0xb ; branch 0x93108
093160: stxdw [r10 - 0x148], r6
093168: ldxdw r3, [r0 + 0x20]
093170: ldxdw r0, [r3 + 0x8]
093178: ldxdw r4, [r0 + 0x0]
093180: add64 r4, 0x1
093188: mov64 r5, 0x1
093190: jeq r4, 0x0, +0x1 ; branch 0x931a0
093198: mov64 r5, 0x0
0931a0: ldxb r6, [r2 + 0x2a]
0931a8: stxdw [r10 - 0x190], r6
0931b0: ldxb r6, [r2 + 0x29]
0931b8: stxdw [r10 - 0x188], r6
0931c0: ldxb r6, [r2 + 0x28]
0931c8: stxdw [r10 - 0x180], r6
0931d0: ldxdw r6, [r2 + 0x20]
0931d8: stxdw [r10 - 0x178], r6
0931e0: ldxdw r2, [r2 + 0x18]
0931e8: stxdw [r10 - 0x170], r2
0931f0: ldxdw r6, [r3 + 0x0]
0931f8: stxdw [r0 + 0x0], r4
093200: jne r5, 0x1, +0x1 ; branch 0x93210
093208: ja -0x21 ; branch 0x93108
093210: ldxdw r5, [r3 + 0x10]
093218: ldxdw r2, [r5 + 0x0]
093220: add64 r2, 0x1
093228: mov64 r4, 0x1
093230: jeq r2, 0x0, +0x1 ; branch 0x93240
093238: mov64 r4, 0x0
093240: stxdw [r10 - 0x138], r6
093248: stxdw [r10 - 0x198], r5
093250: stxdw [r5 + 0x0], r2
093258: jne r4, 0x1, +0x1 ; branch 0x93268
093260: ja -0x2c ; branch 0x93108
093268: mov64 r6, r9
093270: ldxdw r2, [r7 + 0x20]
093278: ldxdw r7, [r2 + 0x8]
093280: ldxdw r4, [r7 + 0x0]
093288: add64 r4, 0x1
093290: mov64 r5, 0x1
093298: jeq r4, 0x0, +0x1 ; branch 0x932a8
0932a0: mov64 r5, 0x0
0932a8: ldxb r9, [r3 + 0x2a]
0932b0: stxdw [r10 - 0x1c0], r9
0932b8: ldxb r9, [r3 + 0x29]
0932c0: stxdw [r10 - 0x1b8], r9
0932c8: ldxb r9, [r3 + 0x28]
0932d0: stxdw [r10 - 0x1b0], r9
0932d8: ldxdw r9, [r3 + 0x20]
0932e0: stxdw [r10 - 0x1a8], r9
0932e8: ldxdw r3, [r3 + 0x18]
0932f0: stxdw [r10 - 0x1a0], r3
0932f8: ldxdw r9, [r2 + 0x0]
093300: stxdw [r7 + 0x0], r4
093308: jne r5, 0x1, +0x1 ; branch 0x93318
093310: ja -0x42 ; branch 0x93108
093318: ldxdw r3, [r2 + 0x10]
093320: stxdw [r10 - 0x140], r3
093328: ldxdw r3, [r3 + 0x0]
093330: add64 r3, 0x1
093338: mov64 r4, 0x1
093340: mov64 r5, r6
093348: jeq r3, 0x0, +0x1 ; branch 0x93358
093350: mov64 r4, 0x0
093358: ldxdw r6, [r10 - 0x138]
093360: ldxdw r6, [r10 - 0x140]
093368: stxdw [r6 + 0x0], r3
093370: jne r4, 0x1, +0x1 ; branch 0x93380
093378: ja -0x4f ; branch 0x93108
093380: ldxdw r3, [r10 - 0x148]
093388: ldxdw r6, [r3 + 0x0]
093390: ldxdw r3, [r6 + 0x8]
093398: stxdw [r10 - 0x148], r3
0933a0: ldxdw r4, [r3 + 0x0]
0933a8: add64 r4, 0x1
0933b0: mov64 r3, 0x1
0933b8: jeq r4, 0x0, +0x1 ; branch 0x933c8
0933c0: mov64 r3, 0x0
0933c8: stxdw [r10 - 0x1c8], r0
0933d0: ldxb r0, [r2 + 0x2a]
0933d8: stxdw [r10 - 0x1f0], r0
0933e0: ldxb r0, [r2 + 0x29]
0933e8: stxdw [r10 - 0x1e8], r0
0933f0: ldxb r0, [r2 + 0x28]
0933f8: stxdw [r10 - 0x1e0], r0
093400: ldxdw r0, [r2 + 0x20]
093408: stxdw [r10 - 0x1d8], r0
093410: ldxdw r2, [r2 + 0x18]
093418: stxdw [r10 - 0x1d0], r2
093420: ldxdw r2, [r6 + 0x0]
093428: stxdw [r10 - 0x1f8], r2
093430: ldxdw r2, [r10 - 0x148]
093438: stxdw [r2 + 0x0], r4
093440: jne r3, 0x1, +0x1 ; branch 0x93450
093448: ja -0x69 ; branch 0x93108
093450: ldxdw r0, [r6 + 0x10]
093458: ldxdw r3, [r0 + 0x0]
093460: add64 r3, 0x1
093468: mov64 r2, 0x1
093470: jeq r3, 0x0, +0x1 ; branch 0x93480
093478: mov64 r2, 0x0
093480: stxdw [r0 + 0x0], r3
093488: jne r2, 0x1, +0x1 ; branch 0x93498
093490: ja -0x72 ; branch 0x93108
093498: stxdw [r10 - 0x218], r9
0934a0: stxdw [r10 - 0x210], r7
0934a8: stxdw [r10 - 0x208], r5
0934b0: stxdw [r10 - 0x200], r1
0934b8: ldxdw r3, [r8 + 0x8]
0934c0: ldxdw r1, [r3 + 0x0]
0934c8: add64 r1, 0x1
0934d0: mov64 r2, 0x1
0934d8: jeq r1, 0x0, +0x1 ; branch 0x934e8
0934e0: mov64 r2, 0x0
0934e8: ldxdw r4, [r8 + 0x0]
0934f0: ldxb r5, [r6 + 0x2a]
0934f8: stxdw [r10 - 0x228], r5
093500: ldxb r5, [r6 + 0x29]
093508: stxdw [r10 - 0x220], r5
093510: ldxb r9, [r6 + 0x28]
093518: ldxdw r7, [r6 + 0x20]
093520: ldxdw r5, [r6 + 0x18]
093528: stxdw [r3 + 0x0], r1
093530: jne r2, 0x1, +0x1 ; branch 0x93540
093538: ja -0x87 ; branch 0x93108
093540: ldxdw r6, [r8 + 0x10]
093548: ldxdw r1, [r6 + 0x0]
093550: add64 r1, 0x1
093558: mov64 r2, 0x1
093560: jeq r1, 0x0, +0x1 ; branch 0x93570
093568: mov64 r2, 0x0
093570: stxdw [r10 - 0x230], r4
093578: stxdw [r6 + 0x0], r1
093580: jne r2, 0x1, +0x1 ; branch 0x93590
093588: ja -0x91 ; branch 0x93108
093590: ldxdw r1, [r8 + 0x18]
093598: stxdw [r10 - 0x238], r1
0935a0: ldxdw r1, [r8 + 0x20]
0935a8: stxdw [r10 - 0x240], r1
0935b0: ldxb r4, [r8 + 0x28]
0935b8: ldxb r1, [r8 + 0x29]
0935c0: ldxb r8, [r8 + 0x2a]
0935c8: ldxdw r2, [r10 - 0x228]
0935d0: stxb [r10 - 0x16], r2
0935d8: ldxdw r2, [r10 - 0x220]
0935e0: stxb [r10 - 0x17], r2
0935e8: stxb [r10 - 0x18], r9
0935f0: stxdw [r10 - 0x20], r7
0935f8: stxdw [r10 - 0x28], r5
093600: stxdw [r10 - 0x30], r0
093608: ldxdw r0, [r10 - 0x148]
093610: stxdw [r10 - 0x38], r0
093618: ldxdw r0, [r10 - 0x1f8]
093620: stxdw [r10 - 0x40], r0
093628: ldxdw r0, [r10 - 0x1f0]
093630: stxb [r10 - 0x46], r0
093638: ldxdw r0, [r10 - 0x1e8]
093640: stxb [r10 - 0x47], r0
093648: ldxdw r0, [r10 - 0x1e0]
093650: stxb [r10 - 0x48], r0
093658: ldxdw r0, [r10 - 0x1d8]
093660: stxdw [r10 - 0x50], r0
093668: ldxdw r0, [r10 - 0x1d0]
093670: stxdw [r10 - 0x58], r0
093678: ldxdw r0, [r10 - 0x140]
093680: stxdw [r10 - 0x60], r0
093688: ldxdw r0, [r10 - 0x210]
093690: stxdw [r10 - 0x68], r0
093698: ldxdw r0, [r10 - 0x218]
0936a0: stxdw [r10 - 0x70], r0
0936a8: stxb [r10 - 0x76], r8
0936b0: stxb [r10 - 0x77], r1
0936b8: stxb [r10 - 0x78], r4
0936c0: ldxdw r1, [r10 - 0x240]
0936c8: stxdw [r10 - 0x80], r1
0936d0: ldxdw r1, [r10 - 0x238]
0936d8: stxdw [r10 - 0x88], r1
0936e0: stxdw [r10 - 0x90], r6
0936e8: stxdw [r10 - 0x98], r3
0936f0: ldxdw r1, [r10 - 0x230]
0936f8: stxdw [r10 - 0xa0], r1
093700: ldxdw r1, [r10 - 0x1c0]
093708: stxb [r10 - 0xa6], r1
093710: ldxdw r1, [r10 - 0x1b8]
093718: stxb [r10 - 0xa7], r1
093720: ldxdw r1, [r10 - 0x1b0]
093728: stxb [r10 - 0xa8], r1
093730: ldxdw r1, [r10 - 0x1a8]
093738: stxdw [r10 - 0xb0], r1
093740: ldxdw r1, [r10 - 0x1a0]
093748: stxdw [r10 - 0xb8], r1
093750: ldxdw r1, [r10 - 0x198]
093758: stxdw [r10 - 0xc0], r1
093760: ldxdw r1, [r10 - 0x1c8]
093768: stxdw [r10 - 0xc8], r1
093770: ldxdw r1, [r10 - 0x138]
093778: stxdw [r10 - 0xd0], r1
093780: ldxdw r1, [r10 - 0x160]
093788: stxdw [r10 - 0x10], r1
093790: ldxdw r1, [r10 - 0x190]
093798: stxb [r10 - 0xd6], r1
0937a0: ldxdw r1, [r10 - 0x188]
0937a8: stxb [r10 - 0xd7], r1
0937b0: ldxdw r1, [r10 - 0x180]
0937b8: stxb [r10 - 0xd8], r1
0937c0: ldxdw r1, [r10 - 0x178]
0937c8: stxdw [r10 - 0xe0], r1
0937d0: ldxdw r1, [r10 - 0x170]
0937d8: stxdw [r10 - 0xe8], r1
0937e0: ldxdw r1, [r10 - 0x168]
0937e8: stxdw [r10 - 0xf0], r1
0937f0: ldxdw r1, [r10 - 0x130]
0937f8: stxdw [r10 - 0xf8], r1
093800: ldxdw r1, [r10 - 0x158]
093808: stxdw [r10 - 0x100], r1
093810: stdw [r10 - 0x8], 0x1
093818: stdw [r10 - 0x108], 0x0
093820: stdw [r10 - 0x110], 0x8
093828: stdw [r10 - 0x118], 0x0
093830: mov64 r1, r10
093838: add64 r1, -0x128
093840: mov64 r2, r10
093848: add64 r2, -0x118
093850: ldxdw r3, [r10 - 0x208]
093858: ldxdw r4, [r10 - 0x150]
093860: call 0x1d88c ; direct target 0x17fcc8
093868: ldxdw r3, [r10 - 0x120]
093870: ldxdw r4, [r10 - 0x128]
093878: ldxdw r1, [r10 - 0x200]
093880: stxdw [r1 + 0x8], r3
093888: stxdw [r1 + 0x0], r4
093890: exit
