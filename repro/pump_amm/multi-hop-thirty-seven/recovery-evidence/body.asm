03dbc0: mov64 r9, r1
03dbc8: jeq r3, 0x0, +0x3ed ; branch 0x3fb38
03dbd0: jeq r4, 0x0, +0x111 ; branch 0x3e460
03dbd8: ldxdw r8, [r2 + 0x18]
03dbe0: jeq r8, 0x0, +0x149 ; branch 0x3e630
03dbe8: mov64 r5, r8
03dbf0: div64 r5, 0x5
03dbf8: mov64 r0, r5
03dc00: mul64 r0, 0x5
03dc08: mov64 r1, r8
03dc10: sub64 r1, r0
03dc18: jeq r1, 0x0, +0x1 ; branch 0x3dc28
03dc20: ja +0x141 ; branch 0x3e630
03dc28: ldxdw r1, [r2 + 0x10]
03dc30: stxdw [r10 - 0x410], r1
03dc38: stxdw [r10 - 0x290], r5
03dc40: mov64 r6, 0x1
03dc48: stxdw [r10 - 0x400], r9
03dc50: jlt r8, 0x5, +0x21 ; branch 0x3dd60
03dc58: stxdw [r10 - 0x3a0], r0
03dc60: mov64 r9, r2
03dc68: mov64 r1, 0x0
03dc70: mov64 r2, r5
03dc78: lsh64 r2, 0x5
03dc80: lddw r0, 0x13ffffffffffffff
03dc90: jgt r8, r0, +0x483 ; branch 0x400b0
03dc98: lddw r1, 0x300000000
03dca8: ldxdw r1, [r1 + 0x0]
03dcb0: lddw r6, 0x300008000
03dcc0: jeq r1, 0x0, +0x1 ; branch 0x3dcd0
03dcc8: mov64 r6, r1
03dcd0: mov64 r0, r6
03dcd8: sub64 r0, r2
03dce0: mov64 r1, 0x1
03dce8: mov64 r7, 0x1
03dcf0: jgt r0, r6, +0x1 ; branch 0x3dd00
03dcf8: mov64 r7, 0x0
03dd00: mov64 r6, 0x0
03dd08: jne r7, 0x0, +0x1 ; branch 0x3dd18
03dd10: mov64 r6, r0
03dd18: lddw r0, 0x300000008
03dd28: jlt r6, r0, +0x470 ; branch 0x400b0
03dd30: lddw r1, 0x300000000
03dd40: stxdw [r1 + 0x0], r6
03dd48: mov64 r2, r9
03dd50: ldxdw r9, [r10 - 0x400]
03dd58: ldxdw r0, [r10 - 0x3a0]
03dd60: stxdw [r10 - 0x3f8], r8
03dd68: stxdw [r10 - 0x418], r3
03dd70: stxdw [r10 - 0x420], r4
03dd78: stxdw [r10 - 0x288], r5
03dd80: stxdw [r10 - 0x398], r6
03dd88: stxdw [r10 - 0x280], r6
03dd90: stdw [r10 - 0x278], 0x0
03dd98: stxdw [r10 - 0x428], r2
03dda0: ldxdw r1, [r2 + 0x8]
03dda8: stxdw [r10 - 0x408], r1
03ddb0: ldxdw r1, [r1 + 0x8]
03ddb8: ldxdw r2, [r1 + 0x40]
03ddc0: stxdw [r10 - 0x258], r2
03ddc8: ldxdw r2, [r1 + 0x38]
03ddd0: stxdw [r10 - 0x260], r2
03ddd8: ldxdw r2, [r1 + 0x30]
03dde0: stxdw [r10 - 0x268], r2
03dde8: ldxdw r1, [r1 + 0x28]
03ddf0: stxdw [r10 - 0x270], r1
03ddf8: mov64 r6, 0x2
03de00: mov64 r9, 0x0
03de08: jlt r0, 0x5, +0x139 ; branch 0x3e7d8
03de10: mov64 r8, 0x0
03de18: mov64 r1, r10
03de20: add64 r1, -0x259
03de28: stxdw [r10 - 0x3d8], r1
03de30: mov64 r1, r10
03de38: add64 r1, -0x1d1
03de40: stxdw [r10 - 0x3c0], r1
03de48: mov64 r1, r10
03de50: add64 r1, -0x1d9
03de58: stxdw [r10 - 0x3c8], r1
03de60: mov64 r1, r10
03de68: add64 r1, -0x1e1
03de70: stxdw [r10 - 0x3d0], r1
03de78: mov64 r1, r10
03de80: add64 r1, -0x1b1
03de88: stxdw [r10 - 0x3e0], r1
03de90: mov64 r1, r10
03de98: add64 r1, -0x1b9
03dea0: stxdw [r10 - 0x3e8], r1
03dea8: mov64 r1, r10
03deb0: add64 r1, -0x1c1
03deb8: stxdw [r10 - 0x3f0], r1
03dec0: ldxdw r7, [r10 - 0x410]
03dec8: ja +0x12 ; branch 0x3df60
03ded0: ldxdw r0, [r10 - 0x3a0]
03ded8: add64 r0, -0x5
03dee0: add64 r7, 0xf0
03dee8: stxdw [r10 - 0x398], r4
03def0: mov64 r1, r4
03def8: add64 r1, r8
03df00: ldxdw r2, [r10 - 0x270]
03df08: ldxdw r3, [r10 - 0x268]
03df10: ldxdw r4, [r10 - 0x260]
03df18: ldxdw r5, [r10 - 0x258]
03df20: stxdw [r1 + 0x18], r5
03df28: stxdw [r1 + 0x10], r4
03df30: stxdw [r1 + 0x8], r3
03df38: stxdw [r1 + 0x0], r2
03df40: add64 r8, 0x20
03df48: add64 r9, 0x1
03df50: stxdw [r10 - 0x278], r9
03df58: jlt r0, 0x5, +0x10f ; branch 0x3e7d8
03df60: stxdw [r10 - 0x3b0], r6
03df68: stxdw [r10 - 0x3a0], r0
03df70: stxdw [r10 - 0x3a8], r9
03df78: ldxdw r6, [r7 + 0x30]
03df80: ldxdw r1, [r6 + 0x18]
03df88: stxdw [r10 - 0x238], r1
03df90: ldxdw r1, [r6 + 0x10]
03df98: stxdw [r10 - 0x240], r1
03dfa0: ldxdw r1, [r6 + 0x8]
03dfa8: stxdw [r10 - 0x248], r1
03dfb0: ldxdw r1, [r6 + 0x0]
03dfb8: stxdw [r10 - 0x250], r1
03dfc0: ldxdw r1, [r10 - 0x258]
03dfc8: stxdw [r10 - 0x1f0], r1
03dfd0: ldxdw r1, [r10 - 0x260]
03dfd8: stxdw [r10 - 0x1f8], r1
03dfe0: ldxdw r1, [r10 - 0x268]
03dfe8: stxdw [r10 - 0x200], r1
03dff0: ldxdw r1, [r10 - 0x270]
03dff8: stxdw [r10 - 0x208], r1
03e000: ldxdw r9, [r7 + 0x0]
03e008: ldxdw r1, [r9 + 0x18]
03e010: stxdw [r10 - 0x1d0], r1
03e018: ldxdw r1, [r9 + 0x10]
03e020: stxdw [r10 - 0x1d8], r1
03e028: ldxdw r1, [r9 + 0x8]
03e030: stxdw [r10 - 0x1e0], r1
03e038: ldxdw r1, [r9 + 0x0]
03e040: stxdw [r10 - 0x1e8], r1
03e048: ldxdw r1, [r6 + 0x18]
03e050: stxdw [r10 - 0x1b0], r1
03e058: ldxdw r1, [r6 + 0x10]
03e060: stxdw [r10 - 0x1b8], r1
03e068: ldxdw r1, [r6 + 0x8]
03e070: stxdw [r10 - 0x1c0], r1
03e078: ldxdw r1, [r6 + 0x0]
03e080: stxdw [r10 - 0x1c8], r1
03e088: mov64 r1, r10
03e090: add64 r1, -0x208
03e098: mov64 r2, r10
03e0a0: add64 r2, -0x1c8
03e0a8: mov64 r3, 0x20
03e0b0: call 0x1b705 ; call 0x1198e0
03e0b8: lsh64 r0, 0x20
03e0c0: rsh64 r0, 0x20
03e0c8: ldxdw r1, [r10 - 0x3d0]
03e0d0: ldxdw r3, [r10 - 0x3c8]
03e0d8: ldxdw r2, [r10 - 0x3c0]
03e0e0: jeq r0, 0x0, +0x26 ; branch 0x3e218
03e0e8: mov64 r1, r10
03e0f0: add64 r1, -0x208
03e0f8: mov64 r2, r10
03e100: add64 r2, -0x1e8
03e108: mov64 r3, 0x20
03e110: call 0x1b6f9 ; call 0x1198e0
03e118: lsh64 r0, 0x20
03e120: rsh64 r0, 0x20
03e128: mov64 r9, r6
03e130: ldxdw r1, [r10 - 0x3f0]
03e138: ldxdw r3, [r10 - 0x3e8]
03e140: ldxdw r2, [r10 - 0x3e0]
03e148: jeq r0, 0x0, +0x19 ; branch 0x3e218
03e150: mov64 r1, r10
03e158: add64 r1, -0x78
03e160: lddw r2, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
03e170: call 0x6e50 ; call 0x753f8
03e178: stdw [r10 - 0x50], 0x0
03e180: stdw [r10 - 0x58], 0x1
03e188: stdw [r10 - 0x60], 0x0
03e190: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03e1a0: stxdw [r10 - 0x20], r1
03e1a8: mov64 r1, r10
03e1b0: add64 r1, -0x60
03e1b8: stxdw [r10 - 0x28], r1
03e1c0: stb [r10 - 0x10], 0x3
03e1c8: stdw [r10 - 0x18], 0x20
03e1d0: stdw [r10 - 0x38], 0x0
03e1d8: stdw [r10 - 0x48], 0x0
03e1e0: mov64 r2, r10
03e1e8: add64 r2, -0x48
03e1f0: lddw r1, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
03e200: call 0x7933 ; call 0x7aba0
03e208: jeq r0, 0x0, +0x11f ; branch 0x3eb08
03e210: ja +0x33c ; branch 0x3fbf8
03e218: ldxw r4, [r9 + 0x3]
03e220: stxw [r10 - 0x20d], r4
03e228: ldxw r4, [r9 + 0x0]
03e230: stxw [r10 - 0x210], r4
03e238: ldxdw r1, [r1 + 0x0]
03e240: stxdw [r10 - 0x3b8], r1
03e248: ldxdw r9, [r3 + 0x0]
03e250: ldxb r1, [r2 + 0x8]
03e258: stxb [r10 - 0x218], r1
03e260: ldxdw r1, [r2 + 0x0]
03e268: stxdw [r10 - 0x220], r1
03e270: ldxw r1, [r10 - 0x20d]
03e278: stxw [r10 - 0x195], r1
03e280: ldxw r1, [r10 - 0x210]
03e288: stxw [r10 - 0x198], r1
03e290: ldxb r1, [r10 - 0x218]
03e298: stxb [r10 - 0x228], r1
03e2a0: ldxdw r1, [r10 - 0x220]
03e2a8: stxdw [r10 - 0x230], r1
03e2b0: ldxb r1, [r10 - 0x228]
03e2b8: stxb [r10 - 0x1a0], r1
03e2c0: ldxdw r1, [r10 - 0x230]
03e2c8: stxdw [r10 - 0x1a8], r1
03e2d0: mov64 r1, r10
03e2d8: add64 r1, -0x270
03e2e0: mov64 r2, r10
03e2e8: add64 r2, -0x250
03e2f0: mov64 r3, 0x20
03e2f8: call 0x1b6bc ; call 0x1198e0
03e300: ldxdw r6, [r10 - 0x3b0]
03e308: mov64 r1, r6
03e310: and64 r1, 0xff
03e318: jeq r1, 0x2, +0x1 ; branch 0x3e328
03e320: ja +0x7 ; branch 0x3e360
03e328: lsh64 r0, 0x20
03e330: rsh64 r0, 0x20
03e338: mov64 r6, 0x1
03e340: ldxdw r4, [r10 - 0x398]
03e348: jeq r0, 0x0, +0xe ; branch 0x3e3c0
03e350: mov64 r6, 0x0
03e358: ja +0xc ; branch 0x3e3c0
03e360: mov64 r3, r6
03e368: and64 r3, 0x1
03e370: mov64 r1, 0x1
03e378: mov64 r2, 0x1
03e380: ldxdw r4, [r10 - 0x398]
03e388: jeq r3, 0x0, +0x1 ; branch 0x3e398
03e390: mov64 r2, 0x0
03e398: lsh64 r0, 0x20
03e3a0: rsh64 r0, 0x20
03e3a8: jeq r0, 0x0, +0x1 ; branch 0x3e3b8
03e3b0: mov64 r1, 0x0
03e3b8: jeq r2, r1, +0x2d6 ; branch 0x3fa70
03e3c0: ldxw r1, [r10 - 0x195]
03e3c8: stxw [r10 - 0x26d], r1
03e3d0: ldxw r1, [r10 - 0x198]
03e3d8: stxw [r10 - 0x270], r1
03e3e0: stxdw [r10 - 0x261], r9
03e3e8: ldxdw r1, [r10 - 0x3b8]
03e3f0: stxdw [r10 - 0x269], r1
03e3f8: ldxb r1, [r10 - 0x1a0]
03e400: ldxdw r2, [r10 - 0x3d8]
03e408: stxb [r2 + 0x8], r1
03e410: ldxdw r1, [r10 - 0x1a8]
03e418: stxdw [r2 + 0x0], r1
03e420: ldxdw r1, [r10 - 0x288]
03e428: ldxdw r9, [r10 - 0x3a8]
03e430: jne r9, r1, -0xad ; branch 0x3ded0
03e438: mov64 r1, r10
03e440: add64 r1, -0x288
03e448: call -0x651a ; call 0xbb80
03e450: ldxdw r4, [r10 - 0x280]
03e458: ja -0xb2 ; branch 0x3ded0
03e460: mov64 r1, r10
03e468: add64 r1, -0x1e8
03e470: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
03e480: call 0x6dee ; call 0x753f8
03e488: stdw [r10 - 0x1b8], 0x0
03e490: stdw [r10 - 0x1c0], 0x1
03e498: stdw [r10 - 0x1c8], 0x0
03e4a0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03e4b0: stxdw [r10 - 0x20], r1
03e4b8: mov64 r1, r10
03e4c0: add64 r1, -0x1c8
03e4c8: stxdw [r10 - 0x28], r1
03e4d0: stb [r10 - 0x10], 0x3
03e4d8: stdw [r10 - 0x18], 0x20
03e4e0: stdw [r10 - 0x38], 0x0
03e4e8: stdw [r10 - 0x48], 0x0
03e4f0: mov64 r2, r10
03e4f8: add64 r2, -0x48
03e500: lddw r1, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
03e510: call 0x78d1 ; call 0x7aba0
03e518: jeq r0, 0x0, +0x1 ; branch 0x3e528
03e520: ja +0x2da ; branch 0x3fbf8
03e528: ldxdw r1, [r10 - 0x1b8]
03e530: stxdw [r10 - 0xd0], r1
03e538: ldxdw r1, [r10 - 0x1c0]
03e540: stxdw [r10 - 0xd8], r1
03e548: ldxdw r1, [r10 - 0x1c8]
03e550: stxdw [r10 - 0xe0], r1
03e558: ldxdw r1, [r10 - 0x1e8]
03e560: stxdw [r10 - 0xf8], r1
03e568: ldxdw r1, [r10 - 0x1e0]
03e570: stxdw [r10 - 0xf0], r1
03e578: ldxdw r1, [r10 - 0x1d8]
03e580: stxdw [r10 - 0xe8], r1
03e588: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03e598: stxdw [r10 - 0x110], r1
03e5a0: stw [r10 - 0x80], 0x1771
03e5a8: stb [r10 - 0xc8], 0x2
03e5b0: stw [r10 - 0x100], 0x112
03e5b8: stdw [r10 - 0x108], 0x39
03e5c0: stdw [r10 - 0x118], 0x0
03e5c8: mov64 r1, r10
03e5d0: add64 r1, -0x360
03e5d8: mov64 r2, r10
03e5e0: add64 r2, -0x118
03e5e8: call 0x18939 ; call 0x102fb8
03e5f0: ldxdw r3, [r10 - 0x358]
03e5f8: ldxdw r2, [r10 - 0x360]
03e600: mov64 r1, r10
03e608: add64 r1, -0x370
03e610: call -0x7c5b ; call 0x340
03e618: ldxdw r8, [r10 - 0x368]
03e620: ldxdw r7, [r10 - 0x370]
03e628: ja +0x2e3 ; branch 0x3fd48
03e630: mov64 r1, r10
03e638: add64 r1, -0x1e8
03e640: lddw r2, 0x11c0c0 ; rodata b',\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display impleme'
03e650: call 0x6db4 ; call 0x753f8
03e658: stdw [r10 - 0x1b8], 0x0
03e660: stdw [r10 - 0x1c0], 0x1
03e668: stdw [r10 - 0x1c8], 0x0
03e670: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03e680: stxdw [r10 - 0x20], r1
03e688: mov64 r1, r10
03e690: add64 r1, -0x1c8
03e698: stxdw [r10 - 0x28], r1
03e6a0: stb [r10 - 0x10], 0x3
03e6a8: stdw [r10 - 0x18], 0x20
03e6b0: stdw [r10 - 0x38], 0x0
03e6b8: stdw [r10 - 0x48], 0x0
03e6c0: mov64 r2, r10
03e6c8: add64 r2, -0x48
03e6d0: lddw r1, 0x11c0c0 ; rodata b',\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display impleme'
03e6e0: call 0x7897 ; call 0x7aba0
03e6e8: jeq r0, 0x0, +0x1 ; branch 0x3e6f8
03e6f0: ja +0x2a0 ; branch 0x3fbf8
03e6f8: ldxdw r1, [r10 - 0x1b8]
03e700: stxdw [r10 - 0xd0], r1
03e708: ldxdw r1, [r10 - 0x1c0]
03e710: stxdw [r10 - 0xd8], r1
03e718: ldxdw r1, [r10 - 0x1c8]
03e720: stxdw [r10 - 0xe0], r1
03e728: ldxdw r1, [r10 - 0x1e8]
03e730: stxdw [r10 - 0xf8], r1
03e738: ldxdw r1, [r10 - 0x1e0]
03e740: stxdw [r10 - 0xf0], r1
03e748: ldxdw r1, [r10 - 0x1d8]
03e750: stxdw [r10 - 0xe8], r1
03e758: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03e768: stxdw [r10 - 0x110], r1
03e770: stw [r10 - 0x80], 0x179c
03e778: stb [r10 - 0xc8], 0x2
03e780: stw [r10 - 0x100], 0x116
03e788: stdw [r10 - 0x108], 0x39
03e790: stdw [r10 - 0x118], 0x0
03e798: mov64 r1, r10
03e7a0: add64 r1, -0x2a0
03e7a8: mov64 r2, r10
03e7b0: add64 r2, -0x118
03e7b8: call 0x188ff ; call 0x102fb8
03e7c0: ldxdw r8, [r10 - 0x298]
03e7c8: ldxdw r7, [r10 - 0x2a0]
03e7d0: ja +0x2ae ; branch 0x3fd48
03e7d8: mov64 r7, r6
03e7e0: ldxdw r6, [r10 - 0x408]
03e7e8: ldxdw r2, [r6 + 0x10]
03e7f0: add64 r2, 0x28
03e7f8: mov64 r1, r10
03e800: add64 r1, -0x270
03e808: mov64 r3, 0x20
03e810: call 0x1b619 ; call 0x1198e0
03e818: lsh64 r0, 0x20
03e820: rsh64 r0, 0x20
03e828: jne r0, 0x0, +0xd ; branch 0x3e898
03e830: stxdw [r10 - 0x3a8], r9
03e838: mov64 r2, r7
03e840: mov64 r1, r2
03e848: and64 r1, 0xff
03e850: ldxdw r9, [r10 - 0x400]
03e858: jeq r1, 0x2, +0x1 ; branch 0x3e868
03e860: ja +0x71 ; branch 0x3ebf0
03e868: mov64 r1, r10
03e870: add64 r1, -0x350
03e878: call 0x310 ; call 0x40100
03e880: ldxdw r8, [r10 - 0x348]
03e888: ldxdw r7, [r10 - 0x350]
03e890: ja +0x296 ; branch 0x3fd48
03e898: mov64 r1, r10
03e8a0: add64 r1, -0x1e8
03e8a8: lddw r2, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
03e8b8: call 0x6d67 ; call 0x753f8
03e8c0: stdw [r10 - 0x1b8], 0x0
03e8c8: stdw [r10 - 0x1c0], 0x1
03e8d0: stdw [r10 - 0x1c8], 0x0
03e8d8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03e8e8: stxdw [r10 - 0x20], r1
03e8f0: mov64 r1, r10
03e8f8: add64 r1, -0x1c8
03e900: stxdw [r10 - 0x28], r1
03e908: stb [r10 - 0x10], 0x3
03e910: stdw [r10 - 0x18], 0x20
03e918: stdw [r10 - 0x38], 0x0
03e920: stdw [r10 - 0x48], 0x0
03e928: mov64 r2, r10
03e930: add64 r2, -0x48
03e938: lddw r1, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
03e948: call 0x784a ; call 0x7aba0
03e950: ldxdw r9, [r10 - 0x400]
03e958: jeq r0, 0x0, +0x1 ; branch 0x3e968
03e960: ja +0x252 ; branch 0x3fbf8
03e968: ldxdw r1, [r10 - 0x1b8]
03e970: stxdw [r10 - 0xd0], r1
03e978: ldxdw r1, [r10 - 0x1c0]
03e980: stxdw [r10 - 0xd8], r1
03e988: ldxdw r1, [r10 - 0x1c8]
03e990: stxdw [r10 - 0xe0], r1
03e998: ldxdw r1, [r10 - 0x1e8]
03e9a0: stxdw [r10 - 0xf8], r1
03e9a8: ldxdw r1, [r10 - 0x1e0]
03e9b0: stxdw [r10 - 0xf0], r1
03e9b8: ldxdw r1, [r10 - 0x1d8]
03e9c0: stxdw [r10 - 0xe8], r1
03e9c8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03e9d8: stxdw [r10 - 0x110], r1
03e9e0: stw [r10 - 0x80], 0x17c4
03e9e8: stb [r10 - 0xc8], 0x2
03e9f0: stw [r10 - 0x100], 0x12c
03e9f8: stdw [r10 - 0x108], 0x39
03ea00: stdw [r10 - 0x118], 0x0
03ea08: mov64 r1, r10
03ea10: add64 r1, -0x2d0
03ea18: mov64 r2, r10
03ea20: add64 r2, -0x118
03ea28: call 0x188b1 ; call 0x102fb8
03ea30: ldxdw r3, [r10 - 0x2c8]
03ea38: ldxdw r2, [r10 - 0x2d0]
03ea40: ldxdw r1, [r10 - 0x258]
03ea48: stxdw [r10 - 0x100], r1
03ea50: ldxdw r1, [r10 - 0x260]
03ea58: stxdw [r10 - 0x108], r1
03ea60: ldxdw r1, [r10 - 0x268]
03ea68: stxdw [r10 - 0x110], r1
03ea70: ldxdw r1, [r10 - 0x270]
03ea78: stxdw [r10 - 0x118], r1
03ea80: ldxdw r1, [r6 + 0x10]
03ea88: ldxdw r4, [r1 + 0x28]
03ea90: stxdw [r10 - 0xf8], r4
03ea98: ldxdw r4, [r1 + 0x30]
03eaa0: stxdw [r10 - 0xf0], r4
03eaa8: ldxdw r4, [r1 + 0x38]
03eab0: stxdw [r10 - 0xe8], r4
03eab8: ldxdw r1, [r1 + 0x40]
03eac0: stxdw [r10 - 0xe0], r1
03eac8: mov64 r1, r10
03ead0: add64 r1, -0x2e0
03ead8: mov64 r4, r10
03eae0: add64 r4, -0x118
03eae8: call 0x188dc ; call 0x1031d0
03eaf0: ldxdw r8, [r10 - 0x2d8]
03eaf8: ldxdw r7, [r10 - 0x2e0]
03eb00: ja +0x248 ; branch 0x3fd48
03eb08: ldxdw r1, [r10 - 0x50]
03eb10: stxdw [r10 - 0xd0], r1
03eb18: ldxdw r1, [r10 - 0x58]
03eb20: stxdw [r10 - 0xd8], r1
03eb28: ldxdw r1, [r10 - 0x60]
03eb30: stxdw [r10 - 0xe0], r1
03eb38: ldxdw r1, [r10 - 0x78]
03eb40: stxdw [r10 - 0xf8], r1
03eb48: ldxdw r1, [r10 - 0x70]
03eb50: stxdw [r10 - 0xf0], r1
03eb58: ldxdw r1, [r10 - 0x68]
03eb60: stxdw [r10 - 0xe8], r1
03eb68: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03eb78: stxdw [r10 - 0x110], r1
03eb80: stw [r10 - 0x80], 0x17c4
03eb88: stb [r10 - 0xc8], 0x2
03eb90: stw [r10 - 0x100], 0xfb
03eb98: stdw [r10 - 0x108], 0x39
03eba0: stdw [r10 - 0x118], 0x0
03eba8: mov64 r1, r10
03ebb0: add64 r1, -0x2b0
03ebb8: mov64 r2, r10
03ebc0: add64 r2, -0x118
03ebc8: call 0x1887d ; call 0x102fb8
03ebd0: ldxdw r8, [r10 - 0x2a8]
03ebd8: ldxdw r7, [r10 - 0x2b0]
03ebe0: ldxdw r9, [r10 - 0x400]
03ebe8: ja +0x22b ; branch 0x3fd48
03ebf0: and64 r2, 0x1
03ebf8: stxb [r10 - 0x250], r2
03ec00: ldxdw r1, [r6 + 0x8]
03ec08: ldxdw r2, [r1 + 0x40]
03ec10: stxdw [r10 - 0x178], r2
03ec18: ldxdw r2, [r1 + 0x38]
03ec20: stxdw [r10 - 0x180], r2
03ec28: ldxdw r2, [r1 + 0x30]
03ec30: stxdw [r10 - 0x188], r2
03ec38: ldxdw r1, [r1 + 0x28]
03ec40: stxdw [r10 - 0x190], r1
03ec48: stb [r10 - 0x208], 0x0
03ec50: ldxdw r1, [r10 - 0x290]
03ec58: ldxdw r2, [r10 - 0x3f8]
03ec60: ldxdw r8, [r10 - 0x410]
03ec68: jeq r1, 0x0, +0x23b ; branch 0x3fe48
03ec70: mov64 r2, 0x0
03ec78: mov64 r1, r10
03ec80: add64 r1, -0x30
03ec88: stxdw [r10 - 0x3c8], r1
03ec90: mov64 r1, r10
03ec98: add64 r1, -0x100
03eca0: stxdw [r10 - 0x3d0], r1
03eca8: mov64 r1, r10
03ecb0: add64 r1, -0x1d
03ecb8: stxdw [r10 - 0x3e0], r1
03ecc0: mov64 r1, r10
03ecc8: add64 r1, -0x38
03ecd0: stxdw [r10 - 0x3e8], r1
03ecd8: mov64 r1, r10
03ece0: add64 r1, -0xed
03ece8: stxdw [r10 - 0x3f0], r1
03ecf0: mov64 r1, r10
03ecf8: add64 r1, -0x108
03ed00: stxdw [r10 - 0x430], r1
03ed08: ldxdw r3, [r10 - 0x428]
03ed10: ldxb r1, [r3 + 0x22]
03ed18: stxdw [r10 - 0x3d8], r1
03ed20: ldxb r1, [r3 + 0x20]
03ed28: stxdw [r10 - 0x3c0], r1
03ed30: ja +0x2f ; branch 0x3eeb0
03ed38: ldxdw r1, [r10 - 0x3b0]
03ed40: sub64 r7, r1
03ed48: mov64 r8, r7
03ed50: mov64 r7, r10
03ed58: add64 r7, -0x118
03ed60: mov64 r2, r10
03ed68: add64 r2, -0x48
03ed70: mov64 r1, r7
03ed78: mov64 r3, 0x30
03ed80: call 0x1b562 ; call 0x119898
03ed88: ldxb r1, [r10 - 0x250]
03ed90: stxdw [r10 - 0xfe0], r7
03ed98: stxdw [r10 - 0xfd8], r1
03eda0: mov64 r1, r10
03eda8: add64 r1, -0x208
03edb0: stxdw [r10 - 0xfe8], r1
03edb8: ldxdw r1, [r10 - 0x418]
03edc0: stxdw [r10 - 0xff0], r1
03edc8: mov64 r1, r10
03edd0: add64 r1, -0x170
03edd8: stxdw [r10 - 0xff8], r1
03ede0: stxdw [r10 - 0x1000], r8
03ede8: mov64 r1, r10
03edf0: add64 r1, -0x1c8
03edf8: mov64 r5, r10
03ee00: ldxdw r2, [r10 - 0x408]
03ee08: ldxdw r3, [r10 - 0x3c0]
03ee10: ldxdw r4, [r10 - 0x3b8]
03ee18: call 0xd64 ; call 0x45940
03ee20: ldxdw r7, [r10 - 0x1c8]
03ee28: jne r7, 0x2, +0x245 ; branch 0x40058
03ee30: ldxdw r1, [r10 - 0x138]
03ee38: stxdw [r10 - 0x190], r1
03ee40: ldxdw r1, [r10 - 0x130]
03ee48: stxdw [r10 - 0x188], r1
03ee50: ldxdw r1, [r10 - 0x128]
03ee58: stxdw [r10 - 0x180], r1
03ee60: ldxdw r1, [r10 - 0x120]
03ee68: stxdw [r10 - 0x178], r1
03ee70: ldxdw r1, [r10 - 0x1c0]
03ee78: stxdw [r10 - 0x418], r1
03ee80: stb [r10 - 0x208], 0x2
03ee88: mov64 r2, r6
03ee90: ldxdw r8, [r10 - 0x410]
03ee98: ldxdw r1, [r10 - 0x290]
03eea0: jlt r2, r1, +0x1 ; branch 0x3eeb0
03eea8: ja +0x1f3 ; branch 0x3fe48
03eeb0: mov64 r1, r10
03eeb8: add64 r1, -0x2f0
03eec0: stxdw [r10 - 0x3a0], r2
03eec8: mov64 r3, 0x0
03eed0: mov64 r4, 0x5
03eed8: mov64 r5, 0x0
03eee0: call 0x1b929 ; call 0x11b830
03eee8: mov64 r1, 0x1
03eef0: ldxdw r3, [r10 - 0x2e8]
03eef8: mov64 r2, 0x1
03ef00: jne r3, 0x0, +0x1 ; branch 0x3ef10
03ef08: mov64 r2, 0x0
03ef10: mov64 r6, -0x1
03ef18: mov64 r3, -0x1
03ef20: jne r2, 0x0, +0x1 ; branch 0x3ef30
03ef28: ldxdw r3, [r10 - 0x2f0]
03ef30: mov64 r2, r3
03ef38: add64 r2, 0x5
03ef40: jlt r2, r3, +0x1 ; branch 0x3ef50
03ef48: mov64 r1, 0x0
03ef50: jne r1, 0x0, +0x1 ; branch 0x3ef60
03ef58: mov64 r6, r2
03ef60: ldxdw r1, [r10 - 0x3f8]
03ef68: jle r6, r1, +0x5 ; branch 0x3ef98
03ef70: mov64 r1, r6
03ef78: ldxdw r2, [r10 - 0x3f8]
03ef80: lddw r3, 0x122448 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00;\x01\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00X\x01\x00\x00 \x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00a\x01\x00\x00(\x00\x00\x00\x00\x00\x00'
03ef90: call 0x1aeed ; call 0x116700
03ef98: sub64 r6, r3
03efa0: stxdw [r10 - 0x3b0], r3
03efa8: mov64 r1, r3
03efb0: mul64 r1, 0x30
03efb8: mov64 r2, r8
03efc0: add64 r2, r1
03efc8: mov64 r1, r10
03efd0: add64 r1, -0x118
03efd8: stxdw [r10 - 0x3b8], r2
03efe0: mov64 r3, r6
03efe8: call -0x2e4 ; call 0x3d8d0
03eff0: ldxdw r7, [r10 - 0x118]
03eff8: jeq r7, 0x2, +0x1 ; branch 0x3f008
03f000: ja +0x1ed ; branch 0x3ff70
03f008: ldxb r1, [r10 - 0x110]
03f010: jeq r1, 0x0, +0x7a ; branch 0x3f3e8
03f018: ldxdw r6, [r10 - 0x3a0]
03f020: add64 r6, 0x1
03f028: ldxdw r1, [r10 - 0x290]
03f030: jge r6, r1, +0x33 ; branch 0x3f1d0
03f038: mov64 r1, r10
03f040: add64 r1, -0x300
03f048: mov64 r2, r6
03f050: mov64 r3, 0x0
03f058: mov64 r4, 0x5
03f060: mov64 r5, 0x0
03f068: call 0x1b8f8 ; call 0x11b830
03f070: mov64 r2, 0x1
03f078: ldxdw r1, [r10 - 0x2f8]
03f080: mov64 r4, 0x1
03f088: jne r1, 0x0, +0x1 ; branch 0x3f098
03f090: mov64 r4, 0x0
03f098: mov64 r3, -0x1
03f0a0: mov64 r1, -0x1
03f0a8: jne r4, 0x0, +0x1 ; branch 0x3f0b8
03f0b0: ldxdw r1, [r10 - 0x300]
03f0b8: mov64 r4, r1
03f0c0: add64 r4, 0x5
03f0c8: jlt r4, r1, +0x1 ; branch 0x3f0d8
03f0d0: mov64 r2, 0x0
03f0d8: jne r2, 0x0, +0x1 ; branch 0x3f0e8
03f0e0: mov64 r3, r4
03f0e8: ldxdw r2, [r10 - 0x3f8]
03f0f0: jle r3, r2, +0x5 ; branch 0x3f120
03f0f8: mov64 r1, r3
03f100: ldxdw r2, [r10 - 0x3f8]
03f108: lddw r3, 0x122478 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00a\x01\x00\x00(\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00g\x01\x00\x00"\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00k\x01\x00\x00)\x00\x00\x00\x00\x00\x00'
03f118: call 0x1aebc ; call 0x116700
03f120: sub64 r3, r1
03f128: mul64 r1, 0x30
03f130: mov64 r2, r8
03f138: add64 r2, r1
03f140: mov64 r1, r10
03f148: add64 r1, -0x118
03f150: call -0x311 ; call 0x3d8d0
03f158: ldxdw r7, [r10 - 0x118]
03f160: jeq r7, 0x2, +0x1 ; branch 0x3f170
03f168: ja +0x1c0 ; branch 0x3ff70
03f170: ldxb r1, [r10 - 0x110]
03f178: jeq r1, 0x0, +0xa ; branch 0x3f1d0
03f180: mov64 r1, r6
03f188: add64 r1, 0x1
03f190: mov64 r2, 0x1
03f198: jeq r1, 0x0, +0x1 ; branch 0x3f1a8
03f1a0: mov64 r2, 0x0
03f1a8: mov64 r6, -0x1
03f1b0: jne r2, 0x0, +0x1 ; branch 0x3f1c0
03f1b8: mov64 r6, r1
03f1c0: ldxdw r1, [r10 - 0x290]
03f1c8: jlt r6, r1, -0x33 ; branch 0x3f038
03f1d0: mov64 r1, r10
03f1d8: add64 r1, -0x310
03f1e0: mov64 r2, r6
03f1e8: mov64 r3, 0x0
03f1f0: mov64 r4, 0x5
03f1f8: mov64 r5, 0x0
03f200: call 0x1b8c5 ; call 0x11b830
03f208: mov64 r3, 0x1
03f210: ldxdw r2, [r10 - 0x308]
03f218: jne r2, 0x0, +0x1 ; branch 0x3f228
03f220: mov64 r3, 0x0
03f228: mov64 r7, -0x1
03f230: ldxdw r1, [r10 - 0x3b0]
03f238: jne r3, 0x0, +0x1 ; branch 0x3f248
03f240: ldxdw r7, [r10 - 0x310]
03f248: ldxdw r3, [r10 - 0x3a0]
03f250: jlt r7, r1, +0x1cc ; branch 0x400b8
03f258: ldxdw r2, [r10 - 0x3f8]
03f260: jgt r7, r2, +0x1ce ; branch 0x400d8
03f268: stxdw [r10 - 0x148], r3
03f270: mov64 r1, r10
03f278: add64 r1, -0x290
03f280: stxdw [r10 - 0x150], r1
03f288: mov64 r1, r10
03f290: add64 r1, -0x250
03f298: stxdw [r10 - 0x158], r1
03f2a0: stxdw [r10 - 0x140], r6
03f2a8: mov64 r1, r10
03f2b0: add64 r1, -0x170
03f2b8: mov64 r2, r10
03f2c0: add64 r2, -0x158
03f2c8: call -0x5ef9 ; call 0xfb08
03f2d0: mov64 r2, r6
03f2d8: add64 r2, -0x1
03f2e0: mov64 r1, 0x0
03f2e8: mov64 r3, 0x1
03f2f0: jgt r2, r6, +0x1 ; branch 0x3f300
03f2f8: mov64 r3, 0x0
03f300: jne r3, 0x0, +0x1 ; branch 0x3f310
03f308: mov64 r1, r2
03f310: ldxdw r2, [r10 - 0x3a8]
03f318: jlt r1, r2, +0x4 ; branch 0x3f340
03f320: ldxdw r2, [r10 - 0x3a8]
03f328: lddw r3, 0x1224a8 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00k\x01\x00\x00)\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00q\x01\x00\x00 \x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x04\x03\x00\x00\x14\x00\x00\x00\x00\x00\x00'
03f338: call 0x1a701 ; call 0x112b48
03f340: lsh64 r1, 0x5
03f348: ldxdw r2, [r10 - 0x398]
03f350: add64 r2, r1
03f358: ldxdw r1, [r2 + 0x18]
03f360: stxdw [r10 - 0x120], r1
03f368: ldxdw r1, [r2 + 0x10]
03f370: stxdw [r10 - 0x128], r1
03f378: ldxdw r1, [r2 + 0x8]
03f380: stxdw [r10 - 0x130], r1
03f388: ldxdw r1, [r2 + 0x0]
03f390: stxdw [r10 - 0x138], r1
03f398: ldxdw r1, [r10 - 0x290]
03f3a0: jeq r6, r1, +0x1 ; branch 0x3f3b0
03f3a8: ja +0xa4 ; branch 0x3f8d0
03f3b0: ldxdw r1, [r10 - 0x408]
03f3b8: ldxdw r1, [r1 + 0x10]
03f3c0: ldxdw r2, [r1 + 0x20]
03f3c8: mov64 r1, r10
03f3d0: add64 r1, -0x48
03f3d8: call -0x624d ; call 0xe178
03f3e0: ja -0xd6 ; branch 0x3ed38
03f3e8: stxdw [r10 - 0x1e0], r6
03f3f0: ldxdw r1, [r10 - 0x3b8]
03f3f8: stxdw [r10 - 0x1e8], r1
03f400: stdw [r10 - 0x1b8], 0x0
03f408: stdw [r10 - 0x1c8], 0x0
03f410: mov64 r1, r10
03f418: add64 r1, -0x118
03f420: mov64 r3, r10
03f428: add64 r3, -0x1e8
03f430: mov64 r5, r10
03f438: call 0xf136 ; call 0xb7df0
03f440: ldxdw r8, [r10 - 0x108]
03f448: ldxdw r7, [r10 - 0x110]
03f450: ldxdw r1, [r10 - 0x118]
03f458: jeq r1, 0x0, +0x181 ; branch 0x40068
03f460: ldxdw r4, [r10 - 0x3d0]
03f468: ldxdw r2, [r4 + 0x8]
03f470: ldxdw r3, [r10 - 0x3c8]
03f478: stxdw [r3 + 0x8], r2
03f480: ldxdw r2, [r4 + 0x0]
03f488: stxdw [r3 + 0x0], r2
03f490: ldxdw r5, [r10 - 0x3a0]
03f498: mov64 r4, r5
03f4a0: add64 r4, 0x1
03f4a8: mov64 r6, 0x1
03f4b0: ldxdw r3, [r10 - 0x290]
03f4b8: mov64 r2, 0x1
03f4c0: stxdw [r10 - 0x3b0], r4
03f4c8: jeq r4, r3, +0x1 ; branch 0x3f4d8
03f4d0: mov64 r2, 0x0
03f4d8: ldxdw r0, [r10 - 0x420]
03f4e0: ldxdw r4, [r10 - 0x418]
03f4e8: jeq r5, 0x0, +0x1 ; branch 0x3f4f8
03f4f0: mov64 r6, 0x0
03f4f8: ldxb r9, [r10 - 0x250]
03f500: mov64 r3, r6
03f508: jeq r9, 0x0, +0x1 ; branch 0x3f518
03f510: mov64 r3, r2
03f518: mov64 r5, 0x10100
03f520: jne r3, 0x0, +0x1 ; branch 0x3f530
03f528: mov64 r5, 0x0
03f530: stxdw [r10 - 0x38], r8
03f538: stxdw [r10 - 0x40], r7
03f540: stxdw [r10 - 0x48], r1
03f548: stxdw [r10 - 0xfe0], r0
03f550: mov64 r1, r2
03f558: jeq r9, 0x0, +0x1 ; branch 0x3f568
03f560: mov64 r1, r6
03f568: stxdw [r10 - 0xfe8], r2
03f570: mov64 r2, r10
03f578: add64 r2, -0x208
03f580: stxdw [r10 - 0xff0], r2
03f588: stxdw [r10 - 0xff8], r4
03f590: mov64 r2, r10
03f598: add64 r2, -0x190
03f5a0: stxdw [r10 - 0x1000], r2
03f5a8: or64 r5, r1
03f5b0: stxdw [r10 - 0xfd8], r5
03f5b8: mov64 r1, r10
03f5c0: add64 r1, -0x118
03f5c8: mov64 r4, r10
03f5d0: add64 r4, -0x48
03f5d8: mov64 r5, r10
03f5e0: ldxdw r2, [r10 - 0x408]
03f5e8: ldxdw r3, [r10 - 0x3d8]
03f5f0: call 0x282 ; call 0x40a08
03f5f8: ldxdw r7, [r10 - 0x110]
03f600: ldxdw r1, [r10 - 0x118]
03f608: jeq r1, 0x0, +0x1 ; branch 0x3f618
03f610: ja +0x14e ; branch 0x40088
03f618: stxdw [r10 - 0x418], r7
03f620: ldxb r8, [r10 - 0x108]
03f628: mov64 r1, r10
03f630: add64 r1, -0x320
03f638: mov64 r2, r10
03f640: add64 r2, -0x48
03f648: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
03f658: call 0xf317 ; call 0xb8f18
03f660: ldxdw r7, [r10 - 0x320]
03f668: ldxdw r9, [r10 - 0x400]
03f670: jeq r7, 0x2, +0x1 ; branch 0x3f680
03f678: ja +0x144 ; branch 0x400a0
03f680: ldxdw r1, [r10 - 0x28]
03f688: stxdw [r10 - 0xf8], r1
03f690: ldxdw r1, [r10 - 0x30]
03f698: stxdw [r10 - 0x100], r1
03f6a0: ldxdw r1, [r10 - 0x38]
03f6a8: stxdw [r10 - 0x108], r1
03f6b0: ldxdw r1, [r10 - 0x40]
03f6b8: stxdw [r10 - 0x110], r1
03f6c0: ldxdw r1, [r10 - 0x48]
03f6c8: stxdw [r10 - 0x118], r1
03f6d0: lddw r1, 0x300000000
03f6e0: ldxdw r2, [r1 + 0x0]
03f6e8: mov64 r1, r2
03f6f0: add64 r1, -0x28
03f6f8: mov64 r3, 0x0
03f700: mov64 r4, 0x1
03f708: jgt r1, r2, +0x1 ; branch 0x3f718
03f710: mov64 r4, 0x0
03f718: ldxdw r5, [r10 - 0x398]
03f720: jne r4, 0x0, +0x1 ; branch 0x3f730
03f728: mov64 r3, r1
03f730: lddw r1, 0x300007fd8
03f740: jeq r2, 0x0, +0x2 ; branch 0x3f758
03f748: and64 r3, -0x8
03f750: mov64 r1, r3
03f758: lddw r2, 0x300000007
03f768: jgt r1, r2, +0x3 ; branch 0x3f788
03f770: mov64 r1, 0x8
03f778: mov64 r2, 0x28
03f780: call 0x1a37b ; call 0x111360
03f788: lddw r2, 0x300000000
03f798: stxdw [r2 + 0x0], r1
03f7a0: ldxdw r2, [r10 - 0xf8]
03f7a8: stxdw [r1 + 0x20], r2
03f7b0: ldxdw r2, [r10 - 0x100]
03f7b8: stxdw [r1 + 0x18], r2
03f7c0: ldxdw r2, [r10 - 0x108]
03f7c8: stxdw [r1 + 0x10], r2
03f7d0: ldxdw r2, [r10 - 0x110]
03f7d8: stxdw [r1 + 0x8], r2
03f7e0: ldxdw r2, [r10 - 0x118]
03f7e8: stxdw [r1 + 0x0], r2
03f7f0: stxdw [r10 - 0x200], r1
03f7f8: stxb [r10 - 0x207], r8
03f800: stb [r10 - 0x208], 0x1
03f808: ldxdw r1, [r10 - 0x3a8]
03f810: ldxdw r2, [r10 - 0x3a0]
03f818: jlt r2, r1, +0x5 ; branch 0x3f848
03f820: mov64 r1, r2
03f828: ldxdw r2, [r10 - 0x3a8]
03f830: lddw r3, 0x122460 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00X\x01\x00\x00 \x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00a\x01\x00\x00(\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00g\x01\x00\x00"\x00\x00\x00\x00\x00\x00'
03f840: call 0x1a660 ; call 0x112b48
03f848: lsh64 r2, 0x5
03f850: mov64 r1, r5
03f858: add64 r1, r2
03f860: ldxdw r2, [r1 + 0x0]
03f868: ldxdw r3, [r1 + 0x8]
03f870: ldxdw r4, [r1 + 0x10]
03f878: ldxdw r1, [r1 + 0x18]
03f880: stxdw [r10 - 0x178], r1
03f888: stxdw [r10 - 0x180], r4
03f890: stxdw [r10 - 0x188], r3
03f898: stxdw [r10 - 0x190], r2
03f8a0: ldxdw r2, [r10 - 0x3b0]
03f8a8: ldxdw r1, [r10 - 0x3f8]
03f8b0: ldxdw r8, [r10 - 0x410]
03f8b8: ldxdw r1, [r10 - 0x290]
03f8c0: jlt r2, r1, -0x143 ; branch 0x3eeb0
03f8c8: ja +0xaf ; branch 0x3fe48
03f8d0: mov64 r1, r7
03f8d8: add64 r1, 0x5
03f8e0: mov64 r2, 0x1
03f8e8: jlt r1, r7, +0x1 ; branch 0x3f8f8
03f8f0: mov64 r2, 0x0
03f8f8: mov64 r3, -0x1
03f900: jne r2, 0x0, +0x1 ; branch 0x3f910
03f908: mov64 r3, r1
03f910: ldxdw r1, [r10 - 0x3f8]
03f918: jle r3, r1, +0x5 ; branch 0x3f948
03f920: mov64 r1, r3
03f928: ldxdw r2, [r10 - 0x3f8]
03f930: lddw r3, 0x1224c0 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00q\x01\x00\x00 \x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x04\x03\x00\x00\x14\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x07\x03\x00\x00\n\x00\x00\x00\x00\x00\x00'
03f940: call 0x1adb7 ; call 0x116700
03f948: sub64 r3, r7
03f950: stxdw [r10 - 0x3a0], r7
03f958: mul64 r7, 0x30
03f960: mov64 r2, r8
03f968: add64 r2, r7
03f970: mov64 r1, r10
03f978: add64 r1, -0x118
03f980: mov64 r4, r10
03f988: add64 r4, -0x138
03f990: call 0xb29 ; call 0x452e0
03f998: ldxdw r8, [r10 - 0x110]
03f9a0: ldxdw r7, [r10 - 0x118]
03f9a8: ldxb r1, [r10 - 0xee]
03f9b0: jeq r1, 0x2, +0x72 ; branch 0x3fd48
03f9b8: ldxdw r4, [r10 - 0x430]
03f9c0: ldxh r2, [r4 + 0x18]
03f9c8: ldxdw r3, [r10 - 0x3e8]
03f9d0: stxh [r3 + 0x18], r2
03f9d8: ldxdw r2, [r4 + 0x10]
03f9e0: stxdw [r3 + 0x10], r2
03f9e8: ldxdw r2, [r4 + 0x8]
03f9f0: stxdw [r3 + 0x8], r2
03f9f8: ldxdw r2, [r4 + 0x0]
03fa00: stxdw [r3 + 0x0], r2
03fa08: ldxdw r4, [r10 - 0x3f0]
03fa10: ldxb r2, [r4 + 0x4]
03fa18: ldxdw r3, [r10 - 0x3e0]
03fa20: stxb [r3 + 0x4], r2
03fa28: ldxw r2, [r4 + 0x0]
03fa30: stxw [r3 + 0x0], r2
03fa38: stxb [r10 - 0x1e], r1
03fa40: stxdw [r10 - 0x40], r8
03fa48: stxdw [r10 - 0x48], r7
03fa50: ldxdw r1, [r10 - 0x3f8]
03fa58: ldxdw r1, [r10 - 0x408]
03fa60: ldxdw r7, [r10 - 0x3a0]
03fa68: ja -0x1a7 ; branch 0x3ed38
03fa70: mov64 r1, r10
03fa78: add64 r1, -0x1e8
03fa80: lddw r2, 0x11bf64 ; rodata b"V\x00\x00\x00\t\x00\x00\x00J\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00"
03fa90: call 0x6b2c ; call 0x753f8
03fa98: stdw [r10 - 0x1b8], 0x0
03faa0: stdw [r10 - 0x1c0], 0x1
03faa8: stdw [r10 - 0x1c8], 0x0
03fab0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03fac0: stxdw [r10 - 0x20], r1
03fac8: mov64 r1, r10
03fad0: add64 r1, -0x1c8
03fad8: stxdw [r10 - 0x28], r1
03fae0: stb [r10 - 0x10], 0x3
03fae8: stdw [r10 - 0x18], 0x20
03faf0: stdw [r10 - 0x38], 0x0
03faf8: stdw [r10 - 0x48], 0x0
03fb00: mov64 r2, r10
03fb08: add64 r2, -0x48
03fb10: lddw r1, 0x11bf64 ; rodata b"V\x00\x00\x00\t\x00\x00\x00J\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00"
03fb20: call 0x760f ; call 0x7aba0
03fb28: jeq r0, 0x0, +0x46 ; branch 0x3fd60
03fb30: ja +0x18 ; branch 0x3fbf8
03fb38: mov64 r1, r10
03fb40: add64 r1, -0x1e8
03fb48: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
03fb58: call 0x6b13 ; call 0x753f8
03fb60: stdw [r10 - 0x1b8], 0x0
03fb68: stdw [r10 - 0x1c0], 0x1
03fb70: stdw [r10 - 0x1c8], 0x0
03fb78: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03fb88: stxdw [r10 - 0x20], r1
03fb90: mov64 r1, r10
03fb98: add64 r1, -0x1c8
03fba0: stxdw [r10 - 0x28], r1
03fba8: stb [r10 - 0x10], 0x3
03fbb0: stdw [r10 - 0x18], 0x20
03fbb8: stdw [r10 - 0x38], 0x0
03fbc0: stdw [r10 - 0x48], 0x0
03fbc8: mov64 r2, r10
03fbd0: add64 r2, -0x48
03fbd8: lddw r1, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
03fbe8: call 0x75f6 ; call 0x7aba0
03fbf0: jeq r0, 0x0, +0xa ; branch 0x3fc48
03fbf8: mov64 r3, r10
03fc00: add64 r3, -0x1
03fc08: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
03fc18: mov64 r2, 0x37
03fc20: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
03fc30: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
03fc40: call 0x1a66a ; call 0x112f98
03fc48: ldxdw r1, [r10 - 0x1b8]
03fc50: stxdw [r10 - 0xd0], r1
03fc58: ldxdw r1, [r10 - 0x1c0]
03fc60: stxdw [r10 - 0xd8], r1
03fc68: ldxdw r1, [r10 - 0x1c8]
03fc70: stxdw [r10 - 0xe0], r1
03fc78: ldxdw r1, [r10 - 0x1e8]
03fc80: stxdw [r10 - 0xf8], r1
03fc88: ldxdw r1, [r10 - 0x1e0]
03fc90: stxdw [r10 - 0xf0], r1
03fc98: ldxdw r1, [r10 - 0x1d8]
03fca0: stxdw [r10 - 0xe8], r1
03fca8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03fcb8: stxdw [r10 - 0x110], r1
03fcc0: stw [r10 - 0x80], 0x1772
03fcc8: stb [r10 - 0xc8], 0x2
03fcd0: stw [r10 - 0x100], 0x111
03fcd8: stdw [r10 - 0x108], 0x39
03fce0: stdw [r10 - 0x118], 0x0
03fce8: mov64 r1, r10
03fcf0: add64 r1, -0x380
03fcf8: mov64 r2, r10
03fd00: add64 r2, -0x118
03fd08: call 0x18655 ; call 0x102fb8
03fd10: ldxdw r3, [r10 - 0x378]
03fd18: ldxdw r2, [r10 - 0x380]
03fd20: mov64 r1, r10
03fd28: add64 r1, -0x390
03fd30: call -0x7f3f ; call 0x340
03fd38: ldxdw r8, [r10 - 0x388]
03fd40: ldxdw r7, [r10 - 0x390]
03fd48: stxdw [r9 + 0x8], r8
03fd50: stxdw [r9 + 0x0], r7
03fd58: exit
03fd60: ldxdw r1, [r10 - 0x1b8]
03fd68: stxdw [r10 - 0xd0], r1
03fd70: ldxdw r1, [r10 - 0x1c0]
03fd78: stxdw [r10 - 0xd8], r1
03fd80: ldxdw r1, [r10 - 0x1c8]
03fd88: stxdw [r10 - 0xe0], r1
03fd90: ldxdw r1, [r10 - 0x1e8]
03fd98: stxdw [r10 - 0xf8], r1
03fda0: ldxdw r1, [r10 - 0x1e0]
03fda8: stxdw [r10 - 0xf0], r1
03fdb0: ldxdw r1, [r10 - 0x1d8]
03fdb8: stxdw [r10 - 0xe8], r1
03fdc0: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03fdd0: stxdw [r10 - 0x110], r1
03fdd8: stw [r10 - 0x80], 0x17c6
03fde0: stb [r10 - 0xc8], 0x2
03fde8: stw [r10 - 0x100], 0x127
03fdf0: stdw [r10 - 0x108], 0x39
03fdf8: stdw [r10 - 0x118], 0x0
03fe00: mov64 r1, r10
03fe08: add64 r1, -0x2c0
03fe10: mov64 r2, r10
03fe18: add64 r2, -0x118
03fe20: call 0x18632 ; call 0x102fb8
03fe28: ldxdw r8, [r10 - 0x2b8]
03fe30: ldxdw r7, [r10 - 0x2c0]
03fe38: ldxdw r9, [r10 - 0x400]
03fe40: ja -0x20 ; branch 0x3fd48
03fe48: ldxdw r6, [r10 - 0x420]
03fe50: ldxdw r7, [r10 - 0x418]
03fe58: jlt r7, r6, +0x1 ; branch 0x3fe68
03fe60: ja +0x23 ; branch 0x3ff80
03fe68: mov64 r1, r10
03fe70: add64 r1, -0xf8
03fe78: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
03fe88: call 0x6aad ; call 0x753f8
03fe90: mov64 r1, r10
03fe98: add64 r1, -0xe0
03fea0: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
03feb0: call -0x6ee3 ; call 0x87a0
03feb8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03fec8: stxdw [r10 - 0x110], r1
03fed0: stb [r10 - 0xc8], 0x2
03fed8: stw [r10 - 0x100], 0x185
03fee0: stdw [r10 - 0x108], 0x39
03fee8: stdw [r10 - 0x118], 0x0
03fef0: stw [r10 - 0x80], 0x1774
03fef8: mov64 r1, r10
03ff00: add64 r1, -0x330
03ff08: mov64 r2, r10
03ff10: add64 r2, -0x118
03ff18: call 0x18613 ; call 0x102fb8
03ff20: ldxdw r3, [r10 - 0x328]
03ff28: ldxdw r2, [r10 - 0x330]
03ff30: mov64 r1, r10
03ff38: add64 r1, -0x340
03ff40: mov64 r4, r7
03ff48: mov64 r5, r6
03ff50: call -0x7ce3 ; call 0x1840
03ff58: ldxdw r8, [r10 - 0x338]
03ff60: ldxdw r7, [r10 - 0x340]
03ff68: ja -0x45 ; branch 0x3fd48
03ff70: ldxdw r8, [r10 - 0x110]
03ff78: ja -0x47 ; branch 0x3fd48
03ff80: ldxdw r1, [r10 - 0x408]
03ff88: ldxdw r7, [r1 + 0x0]
03ff90: ldxdw r6, [r1 + 0x28]
03ff98: stdw [r10 - 0x100], 0x0
03ffa0: stdw [r10 - 0x108], 0x0
03ffa8: stdw [r10 - 0x110], 0x0
03ffb0: stdw [r10 - 0x118], 0x0
03ffb8: add64 r6, 0x8
03ffc0: mov64 r2, r10
03ffc8: add64 r2, -0x118
03ffd0: mov64 r1, r6
03ffd8: mov64 r3, 0x20
03ffe0: call 0x1b31f ; call 0x1198e0
03ffe8: lsh64 r0, 0x20
03fff0: rsh64 r0, 0x20
03fff8: jne r0, 0x0, +0x9 ; branch 0x40048
040000: ldxdw r1, [r7 + 0x0]
040008: ldxdw r2, [r1 + 0x18]
040010: stxdw [r6 + 0x18], r2
040018: ldxdw r2, [r1 + 0x10]
040020: stxdw [r6 + 0x10], r2
040028: ldxdw r2, [r1 + 0x8]
040030: stxdw [r6 + 0x8], r2
040038: ldxdw r1, [r1 + 0x0]
040040: stxdw [r6 + 0x0], r1
040048: mov64 r7, 0x2
040050: ja -0x62 ; branch 0x3fd48
040058: ldxdw r8, [r10 - 0x1c0]
040060: ja -0x64 ; branch 0x3fd48
040068: mov64 r1, r10
040070: add64 r1, -0x1c8
040078: call -0x6c0e ; call 0xa010
040080: ja -0x68 ; branch 0x3fd48
040088: ldxdw r8, [r10 - 0x108]
040090: ldxdw r9, [r10 - 0x400]
040098: ja -0x6b ; branch 0x3fd48
0400a0: ldxdw r8, [r10 - 0x318]
0400a8: ja -0x6d ; branch 0x3fd48
0400b0: call 0x1a252 ; call 0x111348
0400b8: mov64 r2, r7
0400c0: lddw r3, 0x122490 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00g\x01\x00\x00"\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00k\x01\x00\x00)\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00q\x01\x00\x00 \x00\x00\x00\x00\x00\x00'
0400d0: call 0x1acdf ; call 0x1167d0
0400d8: mov64 r1, r7
0400e0: ldxdw r2, [r10 - 0x3f8]
0400e8: lddw r3, 0x122490 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00g\x01\x00\x00"\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00k\x01\x00\x00)\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00q\x01\x00\x00 \x00\x00\x00\x00\x00\x00'
0400f8: call 0x1acc0 ; call 0x116700
