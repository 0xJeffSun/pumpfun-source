   8ef00: 71 26 28 00 00 00 00 00      	ldxb r6, [r2 + 0x28]
   8ef08: 7b 6a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r6
   8ef10: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   8ef18: 7b 6a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r6
   8ef20: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   8ef28: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   8ef30: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   8ef38: 7b 2a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r2
   8ef40: 7b 38 00 00 00 00 00 00      	stxdw [r8 + 0x0], r3
   8ef48: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x8ee38>
   8ef50: 05 00 d5 ff 00 00 00 00      	ja -0x2b <.text+0x8ece0>
   8ef58: 79 05 10 00 00 00 00 00      	ldxdw r5, [r0 + 0x10]
   8ef60: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   8ef68: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   8ef70: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8ef78: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x8ee68>
   8ef80: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8ef88: 7b 5a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r5
   8ef90: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   8ef98: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8ee88>
   8efa0: 05 00 cb ff 00 00 00 00      	ja -0x35 <.text+0x8ece0>
   8efa8: 79 72 20 00 00 00 00 00      	ldxdw r2, [r7 + 0x20]
   8efb0: 79 27 08 00 00 00 00 00      	ldxdw r7, [r2 + 0x8]
   8efb8: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   8efc0: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   8efc8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   8efd0: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x8eec0>
   8efd8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   8efe0: 71 06 2a 00 00 00 00 00      	ldxb r6, [r0 + 0x2a]
   8efe8: 7b 6a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r6
   8eff0: 71 06 29 00 00 00 00 00      	ldxb r6, [r0 + 0x29]
   8eff8: 7b 6a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r6
   8f000: 71 06 28 00 00 00 00 00      	ldxb r6, [r0 + 0x28]
   8f008: 7b 6a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r6
   8f010: 79 06 20 00 00 00 00 00      	ldxdw r6, [r0 + 0x20]
   8f018: 7b 6a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r6
   8f020: 79 06 18 00 00 00 00 00      	ldxdw r6, [r0 + 0x18]
   8f028: 79 20 00 00 00 00 00 00      	ldxdw r0, [r2 + 0x0]
   8f030: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   8f038: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x8ef28>
   8f040: 05 00 b7 ff 00 00 00 00      	ja -0x49 <.text+0x8ece0>
   8f048: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   8f050: 7b 3a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r3
   8f058: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   8f060: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   8f068: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8f070: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x8ef60>
   8f078: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8f080: 7b 8a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r8
   8f088: 79 a8 c0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x140]
   8f090: 7b 58 00 00 00 00 00 00      	stxdw [r8 + 0x0], r5
   8f098: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8ef88>
   8f0a0: 05 00 ab ff 00 00 00 00      	ja -0x55 <.text+0x8ece0>
   8f0a8: 7b 0a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r0
   8f0b0: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   8f0b8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   8f0c0: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   8f0c8: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   8f0d0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8f0d8: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x8efc8>
   8f0e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8f0e8: 71 20 2a 00 00 00 00 00      	ldxb r0, [r2 + 0x2a]
   8f0f0: 7b 0a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r0
   8f0f8: 71 20 29 00 00 00 00 00      	ldxb r0, [r2 + 0x29]
   8f100: 7b 0a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r0
   8f108: 71 20 28 00 00 00 00 00      	ldxb r0, [r2 + 0x28]
   8f110: 7b 0a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r0
   8f118: 79 20 20 00 00 00 00 00      	ldxdw r0, [r2 + 0x20]
   8f120: 7b 0a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r0
   8f128: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   8f130: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   8f138: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   8f140: 7b 51 00 00 00 00 00 00      	stxdw [r1 + 0x0], r5
   8f148: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8f038>
   8f150: 05 00 95 ff 00 00 00 00      	ja -0x6b <.text+0x8ece0>
   8f158: 7b 2a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r2
   8f160: 79 85 10 00 00 00 00 00      	ldxdw r5, [r8 + 0x10]
   8f168: 79 53 00 00 00 00 00 00      	ldxdw r3, [r5 + 0x0]
   8f170: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   8f178: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   8f180: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x8f070>
   8f188: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   8f190: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   8f198: 7b 35 00 00 00 00 00 00      	stxdw [r5 + 0x0], r3
   8f1a0: bf 60 00 00 00 00 00 00      	mov64 r0, r6
   8f1a8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x8f098>
   8f1b0: 05 00 89 ff 00 00 00 00      	ja -0x77 <.text+0x8ece0>
   8f1b8: 7b 7a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r7
   8f1c0: 7b 9a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r9
   8f1c8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   8f1d0: 79 42 08 00 00 00 00 00      	ldxdw r2, [r4 + 0x8]
   8f1d8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   8f1e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   8f1e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8f1f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x8f0e0>
   8f1f8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8f200: 79 46 00 00 00 00 00 00      	ldxdw r6, [r4 + 0x0]
   8f208: 71 87 2a 00 00 00 00 00      	ldxb r7, [r8 + 0x2a]
   8f210: 7b 7a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r7
   8f218: 71 87 29 00 00 00 00 00      	ldxb r7, [r8 + 0x29]
   8f220: 7b 7a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r7
   8f228: 71 87 28 00 00 00 00 00      	ldxb r7, [r8 + 0x28]
   8f230: 7b 7a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r7
   8f238: 79 87 20 00 00 00 00 00      	ldxdw r7, [r8 + 0x20]
   8f240: 79 89 18 00 00 00 00 00      	ldxdw r9, [r8 + 0x18]
   8f248: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   8f250: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8f140>
   8f258: 05 00 74 ff 00 00 00 00      	ja -0x8c <.text+0x8ece0>
   8f260: 7b 9a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r9
   8f268: 79 48 10 00 00 00 00 00      	ldxdw r8, [r4 + 0x10]
   8f270: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   8f278: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   8f280: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8f288: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x8f178>
   8f290: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8f298: 7b 6a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r6
   8f2a0: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
   8f2a8: 7b 0a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r0
   8f2b0: 79 a0 b8 fe 00 00 00 00      	ldxdw r0, [r10 - 0x148]
   8f2b8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   8f2c0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8f1b0>
   8f2c8: 05 00 66 ff 00 00 00 00      	ja -0x9a <.text+0x8ece0>
   8f2d0: 79 49 18 00 00 00 00 00      	ldxdw r9, [r4 + 0x18]
   8f2d8: 79 41 20 00 00 00 00 00      	ldxdw r1, [r4 + 0x20]
   8f2e0: 71 43 28 00 00 00 00 00      	ldxb r3, [r4 + 0x28]
   8f2e8: 71 40 29 00 00 00 00 00      	ldxb r0, [r4 + 0x29]
   8f2f0: 71 44 2a 00 00 00 00 00      	ldxb r4, [r4 + 0x2a]
   8f2f8: 79 a6 d8 fd 00 00 00 00      	ldxdw r6, [r10 - 0x228]
   8f300: 73 6a ea ff 00 00 00 00      	stxb [r10 - 0x16], r6
   8f308: 79 a6 e0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x220]
   8f310: 73 6a e9 ff 00 00 00 00      	stxb [r10 - 0x17], r6
   8f318: 79 a6 e8 fd 00 00 00 00      	ldxdw r6, [r10 - 0x218]
   8f320: 73 6a e8 ff 00 00 00 00      	stxb [r10 - 0x18], r6
   8f328: 7b 7a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r7
   8f330: 79 a6 c0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x240]
   8f338: 7b 6a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r6
   8f340: 7b 5a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r5
   8f348: 79 a5 08 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1f8]
   8f350: 7b 5a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r5
   8f358: 79 a5 00 fe 00 00 00 00      	ldxdw r5, [r10 - 0x200]
   8f360: 7b 5a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r5
   8f368: 79 a5 10 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1f0]
   8f370: 73 5a ba ff 00 00 00 00      	stxb [r10 - 0x46], r5
   8f378: 79 a5 18 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1e8]
   8f380: 73 5a b9 ff 00 00 00 00      	stxb [r10 - 0x47], r5
   8f388: 79 a5 20 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1e0]
   8f390: 73 5a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r5
   8f398: 79 a5 28 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1d8]
   8f3a0: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   8f3a8: 79 a5 30 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1d0]
   8f3b0: 7b 5a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r5
   8f3b8: 79 a5 c0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x140]
   8f3c0: 7b 5a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r5
   8f3c8: 79 a5 f0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x210]
   8f3d0: 7b 5a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r5
   8f3d8: 79 a5 b0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x150]
   8f3e0: 7b 5a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r5
   8f3e8: 73 4a 8a ff 00 00 00 00      	stxb [r10 - 0x76], r4
   8f3f0: 73 0a 89 ff 00 00 00 00      	stxb [r10 - 0x77], r0
   8f3f8: 73 3a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r3
   8f400: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   8f408: 7b 9a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r9
   8f410: 7b 8a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r8
   8f418: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   8f420: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   8f428: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   8f430: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   8f438: 73 1a 5a ff 00 00 00 00      	stxb [r10 - 0xa6], r1
   8f440: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   8f448: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   8f450: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   8f458: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   8f460: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   8f468: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   8f470: 79 a1 d0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x230]
   8f478: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   8f480: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   8f488: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   8f490: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   8f498: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   8f4a0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   8f4a8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   8f4b0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   8f4b8: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   8f4c0: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   8f4c8: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   8f4d0: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   8f4d8: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   8f4e0: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   8f4e8: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   8f4f0: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   8f4f8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   8f500: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   8f508: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   8f510: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   8f518: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   8f520: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   8f528: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   8f530: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   8f538: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   8f540: 7a 0a f8 ff 01 00 00 00      	stdw [r10 - 0x8], 0x1
   8f548: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   8f550: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   8f558: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   8f560: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   8f568: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   8f570: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   8f578: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   8f580: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   8f588: 79 a4 98 fe 00 00 00 00      	ldxdw r4, [r10 - 0x168]
   8f590: 85 10 00 00 e6 e0 01 00      	call 0x1e0e6
   8f598: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   8f5a0: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   8f5a8: 79 a3 c8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x138]
   8f5b0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   8f5b8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   8f5c0: 95 00 00 00 00 00 00 00      	exit
