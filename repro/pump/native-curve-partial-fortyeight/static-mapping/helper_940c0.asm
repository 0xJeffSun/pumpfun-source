0940c0: mov64 r7, r4
0940c8: mov64 r0, r3
0940d0: mov64 r4, 0x2
0940d8: ldxdw r9, [r5 - 0xfe8]
0940e0: jeq r9, 0x0, +0x101 ; branch 0x948f0
0940e8: ldxdw r3, [r2 + 0x8]
0940f0: stxdw [r10 - 0x130], r3
0940f8: ldxdw r3, [r3 + 0x0]
094100: add64 r3, 0x1
094108: mov64 r4, 0x1
094110: jeq r3, 0x0, +0x1 ; branch 0x94120
094118: mov64 r4, 0x0
094120: ldxdw r6, [r5 - 0xfe0]
094128: stxdw [r10 - 0x160], r6
094130: ldxdw r8, [r5 - 0xff0]
094138: ldxdw r6, [r5 - 0xff8]
094140: stxdw [r10 - 0x150], r6
094148: ldxdw r6, [r5 - 0x1000]
094150: ldxdw r5, [r2 + 0x0]
094158: stxdw [r10 - 0x158], r5
094160: ldxdw r5, [r10 - 0x130]
094168: stxdw [r5 + 0x0], r3
094170: jne r4, 0x1, +0x1 ; branch 0x94180
094178: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
094180: ldxdw r5, [r2 + 0x10]
094188: ldxdw r3, [r5 + 0x0]
094190: add64 r3, 0x1
094198: mov64 r4, 0x1
0941a0: jeq r3, 0x0, +0x1 ; branch 0x941b0
0941a8: mov64 r4, 0x0
0941b0: stxdw [r10 - 0x168], r5
0941b8: stxdw [r5 + 0x0], r3
0941c0: jne r4, 0x1, +0x1 ; branch 0x941d0
0941c8: ja -0xb ; branch 0x94178
0941d0: stxdw [r10 - 0x148], r6
0941d8: ldxdw r3, [r0 + 0x0]
0941e0: ldxdw r0, [r3 + 0x8]
0941e8: ldxdw r4, [r0 + 0x0]
0941f0: add64 r4, 0x1
0941f8: mov64 r5, 0x1
094200: jeq r4, 0x0, +0x1 ; branch 0x94210
094208: mov64 r5, 0x0
094210: ldxb r6, [r2 + 0x2a]
094218: stxdw [r10 - 0x190], r6
094220: ldxb r6, [r2 + 0x29]
094228: stxdw [r10 - 0x188], r6
094230: ldxb r6, [r2 + 0x28]
094238: stxdw [r10 - 0x180], r6
094240: ldxdw r6, [r2 + 0x20]
094248: stxdw [r10 - 0x178], r6
094250: ldxdw r2, [r2 + 0x18]
094258: stxdw [r10 - 0x170], r2
094260: ldxdw r6, [r3 + 0x0]
094268: stxdw [r0 + 0x0], r4
094270: jne r5, 0x1, +0x1 ; branch 0x94280
094278: ja -0x21 ; branch 0x94178
094280: ldxdw r5, [r3 + 0x10]
094288: ldxdw r2, [r5 + 0x0]
094290: add64 r2, 0x1
094298: mov64 r4, 0x1
0942a0: jeq r2, 0x0, +0x1 ; branch 0x942b0
0942a8: mov64 r4, 0x0
0942b0: stxdw [r10 - 0x138], r6
0942b8: stxdw [r10 - 0x198], r5
0942c0: stxdw [r5 + 0x0], r2
0942c8: jne r4, 0x1, +0x1 ; branch 0x942d8
0942d0: ja -0x2c ; branch 0x94178
0942d8: mov64 r6, r9
0942e0: ldxdw r2, [r7 + 0x0]
0942e8: ldxdw r7, [r2 + 0x8]
0942f0: ldxdw r4, [r7 + 0x0]
0942f8: add64 r4, 0x1
094300: mov64 r5, 0x1
094308: jeq r4, 0x0, +0x1 ; branch 0x94318
094310: mov64 r5, 0x0
094318: ldxb r9, [r3 + 0x2a]
094320: stxdw [r10 - 0x1c0], r9
094328: ldxb r9, [r3 + 0x29]
094330: stxdw [r10 - 0x1b8], r9
094338: ldxb r9, [r3 + 0x28]
094340: stxdw [r10 - 0x1b0], r9
094348: ldxdw r9, [r3 + 0x20]
094350: stxdw [r10 - 0x1a8], r9
094358: ldxdw r3, [r3 + 0x18]
094360: stxdw [r10 - 0x1a0], r3
094368: ldxdw r9, [r2 + 0x0]
094370: stxdw [r7 + 0x0], r4
094378: jne r5, 0x1, +0x1 ; branch 0x94388
094380: ja -0x42 ; branch 0x94178
094388: ldxdw r3, [r2 + 0x10]
094390: stxdw [r10 - 0x140], r3
094398: ldxdw r3, [r3 + 0x0]
0943a0: add64 r3, 0x1
0943a8: mov64 r4, 0x1
0943b0: mov64 r5, r6
0943b8: jeq r3, 0x0, +0x1 ; branch 0x943c8
0943c0: mov64 r4, 0x0
0943c8: ldxdw r6, [r10 - 0x138]
0943d0: ldxdw r6, [r10 - 0x140]
0943d8: stxdw [r6 + 0x0], r3
0943e0: jne r4, 0x1, +0x1 ; branch 0x943f0
0943e8: ja -0x4f ; branch 0x94178
0943f0: ldxdw r3, [r10 - 0x148]
0943f8: ldxdw r6, [r3 + 0x0]
094400: ldxdw r3, [r6 + 0x8]
094408: stxdw [r10 - 0x148], r3
094410: ldxdw r4, [r3 + 0x0]
094418: add64 r4, 0x1
094420: mov64 r3, 0x1
094428: jeq r4, 0x0, +0x1 ; branch 0x94438
094430: mov64 r3, 0x0
094438: stxdw [r10 - 0x1c8], r0
094440: ldxb r0, [r2 + 0x2a]
094448: stxdw [r10 - 0x1f0], r0
094450: ldxb r0, [r2 + 0x29]
094458: stxdw [r10 - 0x1e8], r0
094460: ldxb r0, [r2 + 0x28]
094468: stxdw [r10 - 0x1e0], r0
094470: ldxdw r0, [r2 + 0x20]
094478: stxdw [r10 - 0x1d8], r0
094480: ldxdw r2, [r2 + 0x18]
094488: stxdw [r10 - 0x1d0], r2
094490: ldxdw r2, [r6 + 0x0]
094498: stxdw [r10 - 0x1f8], r2
0944a0: ldxdw r2, [r10 - 0x148]
0944a8: stxdw [r2 + 0x0], r4
0944b0: jne r3, 0x1, +0x1 ; branch 0x944c0
0944b8: ja -0x69 ; branch 0x94178
0944c0: ldxdw r0, [r6 + 0x10]
0944c8: ldxdw r3, [r0 + 0x0]
0944d0: add64 r3, 0x1
0944d8: mov64 r2, 0x1
0944e0: jeq r3, 0x0, +0x1 ; branch 0x944f0
0944e8: mov64 r2, 0x0
0944f0: stxdw [r0 + 0x0], r3
0944f8: jne r2, 0x1, +0x1 ; branch 0x94508
094500: ja -0x72 ; branch 0x94178
094508: stxdw [r10 - 0x218], r9
094510: stxdw [r10 - 0x210], r7
094518: stxdw [r10 - 0x208], r5
094520: stxdw [r10 - 0x200], r1
094528: ldxdw r3, [r8 + 0x8]
094530: ldxdw r1, [r3 + 0x0]
094538: add64 r1, 0x1
094540: mov64 r2, 0x1
094548: jeq r1, 0x0, +0x1 ; branch 0x94558
094550: mov64 r2, 0x0
094558: ldxdw r4, [r8 + 0x0]
094560: ldxb r5, [r6 + 0x2a]
094568: stxdw [r10 - 0x228], r5
094570: ldxb r5, [r6 + 0x29]
094578: stxdw [r10 - 0x220], r5
094580: ldxb r9, [r6 + 0x28]
094588: ldxdw r7, [r6 + 0x20]
094590: ldxdw r5, [r6 + 0x18]
094598: stxdw [r3 + 0x0], r1
0945a0: jne r2, 0x1, +0x1 ; branch 0x945b0
0945a8: ja -0x87 ; branch 0x94178
0945b0: ldxdw r6, [r8 + 0x10]
0945b8: ldxdw r1, [r6 + 0x0]
0945c0: add64 r1, 0x1
0945c8: mov64 r2, 0x1
0945d0: jeq r1, 0x0, +0x1 ; branch 0x945e0
0945d8: mov64 r2, 0x0
0945e0: stxdw [r10 - 0x230], r4
0945e8: stxdw [r6 + 0x0], r1
0945f0: jne r2, 0x1, +0x1 ; branch 0x94600
0945f8: ja -0x91 ; branch 0x94178
094600: ldxdw r1, [r8 + 0x18]
094608: stxdw [r10 - 0x238], r1
094610: ldxdw r1, [r8 + 0x20]
094618: stxdw [r10 - 0x240], r1
094620: ldxb r4, [r8 + 0x28]
094628: ldxb r1, [r8 + 0x29]
094630: ldxb r8, [r8 + 0x2a]
094638: ldxdw r2, [r10 - 0x228]
094640: stxb [r10 - 0x16], r2
094648: ldxdw r2, [r10 - 0x220]
094650: stxb [r10 - 0x17], r2
094658: stxb [r10 - 0x18], r9
094660: stxdw [r10 - 0x20], r7
094668: stxdw [r10 - 0x28], r5
094670: stxdw [r10 - 0x30], r0
094678: ldxdw r0, [r10 - 0x148]
094680: stxdw [r10 - 0x38], r0
094688: ldxdw r0, [r10 - 0x1f8]
094690: stxdw [r10 - 0x40], r0
094698: ldxdw r0, [r10 - 0x1f0]
0946a0: stxb [r10 - 0x46], r0
0946a8: ldxdw r0, [r10 - 0x1e8]
0946b0: stxb [r10 - 0x47], r0
0946b8: ldxdw r0, [r10 - 0x1e0]
0946c0: stxb [r10 - 0x48], r0
0946c8: ldxdw r0, [r10 - 0x1d8]
0946d0: stxdw [r10 - 0x50], r0
0946d8: ldxdw r0, [r10 - 0x1d0]
0946e0: stxdw [r10 - 0x58], r0
0946e8: ldxdw r0, [r10 - 0x140]
0946f0: stxdw [r10 - 0x60], r0
0946f8: ldxdw r0, [r10 - 0x210]
094700: stxdw [r10 - 0x68], r0
094708: ldxdw r0, [r10 - 0x218]
094710: stxdw [r10 - 0x70], r0
094718: stxb [r10 - 0x76], r8
094720: stxb [r10 - 0x77], r1
094728: stxb [r10 - 0x78], r4
094730: ldxdw r1, [r10 - 0x240]
094738: stxdw [r10 - 0x80], r1
094740: ldxdw r1, [r10 - 0x238]
094748: stxdw [r10 - 0x88], r1
094750: stxdw [r10 - 0x90], r6
094758: stxdw [r10 - 0x98], r3
094760: ldxdw r1, [r10 - 0x230]
094768: stxdw [r10 - 0xa0], r1
094770: ldxdw r1, [r10 - 0x1c0]
094778: stxb [r10 - 0xa6], r1
094780: ldxdw r1, [r10 - 0x1b8]
094788: stxb [r10 - 0xa7], r1
094790: ldxdw r1, [r10 - 0x1b0]
094798: stxb [r10 - 0xa8], r1
0947a0: ldxdw r1, [r10 - 0x1a8]
0947a8: stxdw [r10 - 0xb0], r1
0947b0: ldxdw r1, [r10 - 0x1a0]
0947b8: stxdw [r10 - 0xb8], r1
0947c0: ldxdw r1, [r10 - 0x198]
0947c8: stxdw [r10 - 0xc0], r1
0947d0: ldxdw r1, [r10 - 0x1c8]
0947d8: stxdw [r10 - 0xc8], r1
0947e0: ldxdw r1, [r10 - 0x138]
0947e8: stxdw [r10 - 0xd0], r1
0947f0: ldxdw r1, [r10 - 0x160]
0947f8: stxdw [r10 - 0x10], r1
094800: ldxdw r1, [r10 - 0x190]
094808: stxb [r10 - 0xd6], r1
094810: ldxdw r1, [r10 - 0x188]
094818: stxb [r10 - 0xd7], r1
094820: ldxdw r1, [r10 - 0x180]
094828: stxb [r10 - 0xd8], r1
094830: ldxdw r1, [r10 - 0x178]
094838: stxdw [r10 - 0xe0], r1
094840: ldxdw r1, [r10 - 0x170]
094848: stxdw [r10 - 0xe8], r1
094850: ldxdw r1, [r10 - 0x168]
094858: stxdw [r10 - 0xf0], r1
094860: ldxdw r1, [r10 - 0x130]
094868: stxdw [r10 - 0xf8], r1
094870: ldxdw r1, [r10 - 0x158]
094878: stxdw [r10 - 0x100], r1
094880: stdw [r10 - 0x8], 0x1
094888: stdw [r10 - 0x108], 0x0
094890: stdw [r10 - 0x110], 0x8
094898: stdw [r10 - 0x118], 0x0
0948a0: mov64 r1, r10
0948a8: add64 r1, -0x128
0948b0: mov64 r2, r10
0948b8: add64 r2, -0x118
0948c0: ldxdw r3, [r10 - 0x208]
0948c8: ldxdw r4, [r10 - 0x150]
0948d0: call 0x1d67e ; direct target 0x17fcc8
0948d8: ldxdw r3, [r10 - 0x120]
0948e0: ldxdw r4, [r10 - 0x128]
0948e8: ldxdw r1, [r10 - 0x200]
0948f0: stxdw [r1 + 0x8], r3
0948f8: stxdw [r1 + 0x0], r4
094900: exit
