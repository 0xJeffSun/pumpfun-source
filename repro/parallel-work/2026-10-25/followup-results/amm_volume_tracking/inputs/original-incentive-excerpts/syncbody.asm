05dc20: mov64 r7, r2
05dc28: mov64 r6, r1
05dc30: ldxdw r9, [r7 + 0x8]
05dc38: mov64 r1, r10
05dc40: add64 r1, -0xd0
05dc48: call 0x1523d ; call 0x106e38
05dc50: ldxdw r1, [r10 - 0xd0]
05dc58: jne r1, 0x0, +0x28 ; branch 0x5dda0
05dc60: ldxdw r1, [r9 + 0x208]
05dc68: ldxdw r2, [r9 + 0x260]
05dc70: jsge r2, r1, +0x33 ; branch 0x5de10
05dc78: ldxdw r5, [r10 - 0xa8]
05dc80: jslt r5, r1, +0x1 ; branch 0x5dc90
05dc88: ja +0x30 ; branch 0x5de10
05dc90: ldxdw r0, [r9 + 0x250]
05dc98: stb [r9 + 0x279], 0x0
05dca0: stdw [r9 + 0x250], 0x0
05dca8: jeq r0, 0x0, +0x2c ; branch 0x5de10
05dcb0: ldxdw r1, [r9 + 0x280]
05dcb8: ldxdw r2, [r1 + 0x18]
05dcc0: stxdw [r10 - 0xd8], r2
05dcc8: ldxdw r2, [r1 + 0x10]
05dcd0: stxdw [r10 - 0xe0], r2
05dcd8: ldxdw r2, [r1 + 0x8]
05dce0: stxdw [r10 - 0xe8], r2
05dce8: ldxdw r1, [r1 + 0x0]
05dcf0: stxdw [r10 - 0xf0], r1
05dcf8: lddw r1, 0x300000000
05dd08: ldxdw r2, [r1 + 0x0]
05dd10: mov64 r1, r2
05dd18: add64 r1, -0x100
05dd20: mov64 r3, 0x0
05dd28: mov64 r4, 0x1
05dd30: jgt r1, r2, +0x1 ; branch 0x5dd40
05dd38: mov64 r4, 0x0
05dd40: jne r4, 0x0, +0x1 ; branch 0x5dd50
05dd48: mov64 r3, r1
05dd50: lddw r1, 0x300007f00
05dd60: jeq r2, 0x0, +0x1 ; branch 0x5dd70
05dd68: mov64 r1, r3
05dd70: lddw r2, 0x300000007
05dd80: jgt r1, r2, +0x35 ; branch 0x5df30
05dd88: mov64 r1, 0x1
05dd90: mov64 r2, 0x100
05dd98: call 0x166b5 ; call 0x111348
05dda0: ldxdw r1, [r10 - 0xc8]
05dda8: ldxdw r2, [r10 - 0xc0]
05ddb0: ldxdw r3, [r10 - 0xb8]
05ddb8: stxdw [r10 - 0xc0], r3
05ddc0: stxdw [r10 - 0xc8], r2
05ddc8: stxdw [r10 - 0xd0], r1
05ddd0: mov64 r1, r10
05ddd8: add64 r1, -0x100
05dde0: mov64 r2, r10
05dde8: add64 r2, -0xd0
05ddf0: call 0x14a49 ; call 0x103040
05ddf8: ldxdw r2, [r10 - 0xf8]
05de00: ldxdw r1, [r10 - 0x100]
05de08: ja +0x21 ; branch 0x5df18
05de10: ldxdw r1, [r9 + 0x280]
05de18: ldxdw r2, [r1 + 0x18]
05de20: stxdw [r10 - 0x50], r2
05de28: ldxdw r2, [r1 + 0x10]
05de30: stxdw [r10 - 0x58], r2
05de38: ldxdw r2, [r1 + 0x8]
05de40: stxdw [r10 - 0x60], r2
05de48: ldxdw r1, [r1 + 0x0]
05de50: stxdw [r10 - 0x68], r1
05de58: lddw r1, 0x10e970
05de68: stxdw [r10 - 0xe8], r1
05de70: mov64 r1, r10
05de78: add64 r1, -0x68
05de80: stxdw [r10 - 0xf0], r1
05de88: lddw r1, 0x122590 ; rodata b'\x00\x00\x00\x00|\xce\x11\x00#\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9f\xce\x11\x00,\x00\x00\x00\x00\x00\x00\x00\x87\x01\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xe1\x00\x00\x00\x00\x00'
05de98: stxdw [r10 - 0xd0], r1
05dea0: mov64 r1, r10
05dea8: add64 r1, -0xf0
05deb0: stxdw [r10 - 0xc0], r1
05deb8: stdw [r10 - 0xb0], 0x0
05dec0: stdw [r10 - 0xc8], 0x1
05dec8: stdw [r10 - 0xb8], 0x1
05ded0: mov64 r1, r10
05ded8: add64 r1, -0x28
05dee0: mov64 r2, r10
05dee8: add64 r2, -0xd0
05def0: call 0x166a0 ; call 0x1113f8
05def8: ldxdw r1, [r10 - 0x20]
05df00: ldxdw r2, [r10 - 0x18]
05df08: call -0x1
05df10: mov64 r1, 0x2
05df18: stxdw [r6 + 0x8], r2
05df20: stxdw [r6 + 0x0], r1
05df28: exit
05df30: lddw r2, 0x300000000
05df40: stxdw [r2 + 0x0], r1
05df48: lddw r2, -0xa4ae8b8358853b
05df58: stxdw [r1 + 0x0], r2
05df60: ldxdw r2, [r10 - 0xf0]
05df68: stxdw [r1 + 0x8], r2
05df70: ldxdw r2, [r10 - 0xe8]
05df78: stxdw [r1 + 0x10], r2
05df80: ldxdw r2, [r10 - 0xe0]
05df88: stxdw [r1 + 0x18], r2
05df90: ldxdw r2, [r10 - 0xd8]
05df98: stxdw [r1 + 0x20], r2
05dfa0: stxdw [r10 - 0x120], r5
05dfa8: stxdw [r1 + 0x38], r5
05dfb0: stxdw [r10 - 0x128], r0
05dfb8: stxdw [r1 + 0x28], r0
05dfc0: stdw [r1 + 0x30], 0x0
05dfc8: stxdw [r10 - 0xd0], r1
05dfd0: stdw [r10 - 0xc8], 0x40
05dfd8: mov64 r1, r10
05dfe0: add64 r1, -0xd0
05dfe8: mov64 r8, 0x1
05dff0: mov64 r2, 0x1
05dff8: call 0x15150 ; call 0x106a80
05e000: ldxdw r5, [r9 + 0x2b8]
05e008: ldxdw r1, [r5 + 0x0]
05e010: add64 r1, 0x1
05e018: jeq r1, 0x0, +0x1 ; branch 0x5e028
05e020: mov64 r8, 0x0
05e028: ldxdw r3, [r9 + 0x2b0]
05e030: stxdw [r5 + 0x0], r1
05e038: jne r8, 0x1, +0x1 ; branch 0x5e048
05e040: call -0x1
05e048: ldxdw r0, [r9 + 0x2c0]
05e050: ldxdw r1, [r0 + 0x0]
05e058: add64 r1, 0x1
05e060: mov64 r2, 0x1
05e068: jeq r1, 0x0, +0x1 ; branch 0x5e078
05e070: mov64 r2, 0x0
05e078: mov64 r8, r3
05e080: stxdw [r0 + 0x0], r1
05e088: jne r2, 0x1, +0x1 ; branch 0x5e098
05e090: ja -0xb ; branch 0x5e040
05e098: lddw r1, 0x300000000
05e0a8: ldxdw r1, [r1 + 0x0]
05e0b0: mov64 r2, r1
05e0b8: add64 r2, -0x100
05e0c0: mov64 r3, 0x0
05e0c8: mov64 r4, 0x1
05e0d0: jgt r2, r1, +0x1 ; branch 0x5e0e0
05e0d8: mov64 r4, 0x0
05e0e0: jne r4, 0x0, +0x1 ; branch 0x5e0f0
05e0e8: mov64 r3, r2
05e0f0: stxdw [r10 - 0x118], r0
05e0f8: lddw r2, 0x300007f00
05e108: jeq r1, 0x0, +0x1 ; branch 0x5e118
05e110: mov64 r2, r3
05e118: stxdw [r10 - 0x130], r5
05e120: lddw r1, 0x300000007
05e130: jgt r2, r1, +0x1 ; branch 0x5e140
05e138: ja -0x77 ; branch 0x5dd88
05e140: ldxb r7, [r7 + 0x22]
05e148: ldxb r1, [r9 + 0x2da]
05e150: stxdw [r10 - 0x150], r1
05e158: ldxb r1, [r9 + 0x2d9]
05e160: stxdw [r10 - 0x148], r1
05e168: ldxb r1, [r9 + 0x2d8]
05e170: stxdw [r10 - 0x140], r1
05e178: ldxdw r1, [r9 + 0x2d0]
05e180: stxdw [r10 - 0x138], r1
05e188: ldxdw r9, [r9 + 0x2c8]
05e190: lddw r3, 0x300000000
05e1a0: stxdw [r3 + 0x0], r2
05e1a8: lddw r1, -0xa4ae8b8358853b
05e1b8: stxdw [r2 + 0x0], r1
05e1c0: ldxdw r1, [r10 - 0xf0]
05e1c8: stxdw [r2 + 0x8], r1
05e1d0: ldxdw r1, [r10 - 0xe8]
05e1d8: stxdw [r2 + 0x10], r1
05e1e0: ldxdw r1, [r10 - 0xe0]
05e1e8: stxdw [r2 + 0x18], r1
05e1f0: ldxdw r1, [r10 - 0xd8]
05e1f8: stxdw [r2 + 0x20], r1
05e200: ldxdw r1, [r10 - 0x120]
05e208: stxdw [r2 + 0x38], r1
05e210: ldxdw r1, [r10 - 0x128]
05e218: stxdw [r2 + 0x28], r1
05e220: stdw [r2 + 0x30], 0x0
05e228: mov64 r1, 0x0
05e230: mov64 r4, 0x48
05e238: jslt r4, 0x0, +0xa5 ; branch 0x5e768
05e240: ldxdw r1, [r3 + 0x0]
05e248: lddw r0, 0x300008000
05e258: jeq r1, 0x0, +0x1 ; branch 0x5e268
05e260: mov64 r0, r1
05e268: mov64 r5, r0
05e270: sub64 r5, r4
05e278: mov64 r3, 0x0
05e280: mov64 r1, 0x1
05e288: mov64 r4, 0x1
05e290: jgt r5, r0, +0x1 ; branch 0x5e2a0
05e298: mov64 r4, 0x0
05e2a0: jne r4, 0x0, +0x1 ; branch 0x5e2b0
05e2a8: mov64 r3, r5
05e2b0: lddw r4, 0x300000008
05e2c0: jlt r3, r4, +0x94 ; branch 0x5e768
05e2c8: lddw r1, 0x300000000
05e2d8: stxdw [r1 + 0x0], r3
05e2e0: lddw r1, 0x1d9acb512ea545e4
05e2f0: stxdw [r3 + 0x0], r1
05e2f8: mov64 r1, 0x0
05e300: mov64 r4, r3
05e308: add64 r4, r1
05e310: mov64 r5, r2
05e318: add64 r5, r1
05e320: ldxb r5, [r5 + 0x0]
05e328: stxb [r4 + 0x8], r5
05e330: add64 r1, 0x1
05e338: jeq r1, 0x40, +0x1 ; branch 0x5e348
05e340: ja -0x9 ; branch 0x5e300
05e348: lddw r1, 0x300000000
05e358: ldxdw r2, [r1 + 0x0]
05e360: mov64 r1, r2
05e368: add64 r1, -0x22
05e370: mov64 r4, 0x0
05e378: mov64 r5, 0x1
05e380: jgt r1, r2, +0x1 ; branch 0x5e390
05e388: mov64 r5, 0x0
05e390: jne r5, 0x0, +0x1 ; branch 0x5e3a0
05e398: mov64 r4, r1
05e3a0: lddw r1, 0x300007fde
05e3b0: jeq r2, 0x0, +0x1 ; branch 0x5e3c0
05e3b8: mov64 r1, r4
05e3c0: stxdw [r10 - 0x120], r7
05e3c8: lddw r2, 0x300000007
05e3d8: jgt r1, r2, +0x3 ; branch 0x5e3f8
05e3e0: mov64 r1, 0x1
05e3e8: mov64 r2, 0x22
05e3f0: call 0x165ed ; call 0x111360
05e3f8: lddw r2, 0x300000000
05e408: stxdw [r2 + 0x0], r1
05e410: ldxdw r2, [r8 + 0x0]
05e418: ldxdw r4, [r8 + 0x8]
05e420: ldxdw r5, [r8 + 0x10]
05e428: ldxdw r0, [r8 + 0x18]
05e430: stxdw [r1 + 0x18], r0
05e438: stxdw [r1 + 0x10], r5
05e440: stxdw [r1 + 0x8], r4
05e448: stxdw [r1 + 0x0], r2
05e450: sth [r1 + 0x20], 0x1
05e458: stxdw [r10 - 0x60], r1
05e460: stdw [r10 - 0x58], 0x1
05e468: stdw [r10 - 0x68], 0x1
05e470: mov64 r7, r10
05e478: add64 r7, -0xd0
05e480: mov64 r5, r10
05e488: add64 r5, -0x68
05e490: mov64 r1, r7
05e498: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
05e4a8: mov64 r4, 0x48
05e4b0: call 0x15ed3 ; call 0x10db50
05e4b8: ldxdw r1, [r10 - 0x150]
05e4c0: stxb [r10 - 0x3e], r1
05e4c8: ldxdw r1, [r10 - 0x148]
05e4d0: stxb [r10 - 0x3f], r1
05e4d8: ldxdw r1, [r10 - 0x140]
05e4e0: stxb [r10 - 0x40], r1
05e4e8: ldxdw r1, [r10 - 0x138]
05e4f0: stxdw [r10 - 0x48], r1
05e4f8: stxdw [r10 - 0x50], r9
05e500: ldxdw r1, [r10 - 0x118]
05e508: stxdw [r10 - 0x58], r1
05e510: ldxdw r9, [r10 - 0x130]
05e518: stxdw [r10 - 0x60], r9
05e520: stxdw [r10 - 0x68], r8
05e528: mov64 r1, r10
05e530: add64 r1, -0x28
05e538: stxdw [r10 - 0x38], r1
05e540: mov64 r1, r10
05e548: add64 r1, -0x1
05e550: stxdw [r10 - 0x18], r1
05e558: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
05e568: stxdw [r10 - 0x28], r1
05e570: ldxdw r1, [r10 - 0x120]
05e578: stxb [r10 - 0x1], r1
05e580: stdw [r10 - 0x30], 0x2
05e588: stdw [r10 - 0x10], 0x1
05e590: stdw [r10 - 0x20], 0x11
05e598: mov64 r1, r10
05e5a0: add64 r1, -0x38
05e5a8: stxdw [r10 - 0x1000], r1
05e5b0: stdw [r10 - 0xff8], 0x1
05e5b8: mov64 r1, r10
05e5c0: add64 r1, -0x80
05e5c8: mov64 r3, r10
05e5d0: add64 r3, -0x68
05e5d8: mov64 r5, r10
05e5e0: mov64 r2, r7
05e5e8: mov64 r4, 0x1
05e5f0: call 0x15098 ; call 0x106ab8
05e5f8: lddw r1, -0x7fffffffffffffe6
05e608: ldxdw r2, [r10 - 0x80]
05e610: jeq r2, r1, +0x1 ; branch 0x5e620
05e618: ja +0x11 ; branch 0x5e6a8
05e620: ldxdw r1, [r9 + 0x0]
05e628: add64 r1, -0x1
05e630: stxdw [r9 + 0x0], r1
05e638: mov64 r8, r9
05e640: jne r1, 0x0, +0x3 ; branch 0x5e660
05e648: ldxdw r1, [r8 + 0x8]
05e650: add64 r1, -0x1
05e658: stxdw [r8 + 0x8], r1
05e660: ldxdw r2, [r10 - 0x118]
05e668: ldxdw r1, [r2 + 0x0]
05e670: add64 r1, -0x1
05e678: stxdw [r2 + 0x0], r1
05e680: jne r1, 0x0, -0xef ; branch 0x5df10
05e688: ldxdw r1, [r2 + 0x8]
05e690: add64 r1, -0x1
05e698: stxdw [r2 + 0x8], r1
05e6a0: ja -0xf3 ; branch 0x5df10
05e6a8: mov64 r1, r10
05e6b0: add64 r1, -0x110
05e6b8: mov64 r2, r10
05e6c0: add64 r2, -0x80
05e6c8: call 0x1492e ; call 0x103040
05e6d0: ldxdw r3, [r10 - 0x58]
05e6d8: ldxdw r2, [r10 - 0x108]
05e6e0: ldxdw r1, [r10 - 0x110]
05e6e8: ldxdw r4, [r10 - 0x60]
05e6f0: ldxdw r5, [r4 + 0x0]
05e6f8: add64 r5, -0x1
05e700: stxdw [r4 + 0x0], r5
05e708: jne r5, 0x0, +0x3 ; branch 0x5e728
05e710: ldxdw r5, [r4 + 0x8]
05e718: add64 r5, -0x1
05e720: stxdw [r4 + 0x8], r5
05e728: ldxdw r4, [r3 + 0x0]
05e730: add64 r4, -0x1
05e738: stxdw [r3 + 0x0], r4
05e740: jne r4, 0x0, -0x106 ; branch 0x5df18
05e748: ldxdw r4, [r3 + 0x8]
05e750: add64 r4, -0x1
05e758: stxdw [r3 + 0x8], r4
05e760: ja -0x10a ; branch 0x5df18
05e768: mov64 r2, 0x48
05e770: call 0x1657a ; call 0x111348
