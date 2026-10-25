08eda0: mov64 r7, r4
08eda8: mov64 r0, r3
08edb0: stxdw [r10 - 0x138], r1
08edb8: ldxdw r9, [r2 + 0x8]
08edc0: ldxdw r4, [r9 + 0x0]
08edc8: add64 r4, 0x1
08edd0: mov64 r3, 0x1
08edd8: jeq r4, 0x0, +0x1 ; branch 0x8ede8
08ede0: mov64 r3, 0x0
08ede8: ldxdw r6, [r2 + 0x0]
08edf0: stxdw [r9 + 0x0], r4
08edf8: jne r3, 0x1, +0x1 ; branch 0x8ee08
08ee00: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
08ee08: stxdw [r10 - 0x158], r6
08ee10: ldxdw r3, [r2 + 0x10]
08ee18: stxdw [r10 - 0x130], r3
08ee20: ldxdw r8, [r3 + 0x0]
08ee28: add64 r8, 0x1
08ee30: mov64 r3, 0x1
08ee38: jeq r8, 0x0, +0x1 ; branch 0x8ee48
08ee40: mov64 r3, 0x0
08ee48: ldxdw r4, [r5 - 0xfe0]
08ee50: stxdw [r10 - 0x170], r4
08ee58: ldxdw r4, [r5 - 0xfe8]
08ee60: stxdw [r10 - 0x160], r4
08ee68: ldxdw r4, [r5 - 0xff0]
08ee70: ldxdw r6, [r5 - 0xff8]
08ee78: stxdw [r10 - 0x168], r6
08ee80: ldxdw r1, [r5 - 0x1000]
08ee88: ldxdw r5, [r10 - 0x130]
08ee90: stxdw [r5 + 0x0], r8
08ee98: jne r3, 0x1, +0x1 ; branch 0x8eea8
08eea0: ja -0x15 ; branch 0x8ee00
08eea8: ldxdw r0, [r0 + 0x0]
08eeb0: ldxdw r8, [r0 + 0x8]
08eeb8: ldxdw r3, [r8 + 0x0]
08eec0: add64 r3, 0x1
08eec8: mov64 r5, 0x1
08eed0: jeq r3, 0x0, +0x1 ; branch 0x8eee0
08eed8: mov64 r5, 0x0
08eee0: ldxb r6, [r2 + 0x2a]
08eee8: stxdw [r10 - 0x198], r6
08eef0: ldxb r6, [r2 + 0x29]
08eef8: stxdw [r10 - 0x190], r6
08ef00: ldxb r6, [r2 + 0x28]
08ef08: stxdw [r10 - 0x188], r6
08ef10: ldxdw r6, [r2 + 0x20]
08ef18: stxdw [r10 - 0x180], r6
08ef20: ldxdw r2, [r2 + 0x18]
08ef28: stxdw [r10 - 0x178], r2
08ef30: ldxdw r2, [r0 + 0x0]
08ef38: stxdw [r10 - 0x148], r2
08ef40: stxdw [r8 + 0x0], r3
08ef48: jne r5, 0x1, +0x1 ; branch 0x8ef58
08ef50: ja -0x2b ; branch 0x8ee00
08ef58: ldxdw r5, [r0 + 0x10]
08ef60: ldxdw r2, [r5 + 0x0]
08ef68: add64 r2, 0x1
08ef70: mov64 r3, 0x1
08ef78: jeq r2, 0x0, +0x1 ; branch 0x8ef88
08ef80: mov64 r3, 0x0
08ef88: stxdw [r10 - 0x1a0], r5
08ef90: stxdw [r5 + 0x0], r2
08ef98: jne r3, 0x1, +0x1 ; branch 0x8efa8
08efa0: ja -0x35 ; branch 0x8ee00
08efa8: ldxdw r2, [r7 + 0x20]
08efb0: ldxdw r7, [r2 + 0x8]
08efb8: ldxdw r3, [r7 + 0x0]
08efc0: add64 r3, 0x1
08efc8: mov64 r5, 0x1
08efd0: jeq r3, 0x0, +0x1 ; branch 0x8efe0
08efd8: mov64 r5, 0x0
08efe0: ldxb r6, [r0 + 0x2a]
08efe8: stxdw [r10 - 0x1c0], r6
08eff0: ldxb r6, [r0 + 0x29]
08eff8: stxdw [r10 - 0x1b8], r6
08f000: ldxb r6, [r0 + 0x28]
08f008: stxdw [r10 - 0x1b0], r6
08f010: ldxdw r6, [r0 + 0x20]
08f018: stxdw [r10 - 0x1a8], r6
08f020: ldxdw r6, [r0 + 0x18]
08f028: ldxdw r0, [r2 + 0x0]
08f030: stxdw [r7 + 0x0], r3
08f038: jne r5, 0x1, +0x1 ; branch 0x8f048
08f040: ja -0x49 ; branch 0x8ee00
08f048: ldxdw r3, [r2 + 0x10]
08f050: stxdw [r10 - 0x140], r3
08f058: ldxdw r5, [r3 + 0x0]
08f060: add64 r5, 0x1
08f068: mov64 r3, 0x1
08f070: jeq r5, 0x0, +0x1 ; branch 0x8f080
08f078: mov64 r3, 0x0
08f080: stxdw [r10 - 0x1c8], r8
08f088: ldxdw r8, [r10 - 0x140]
08f090: stxdw [r8 + 0x0], r5
08f098: jne r3, 0x1, +0x1 ; branch 0x8f0a8
08f0a0: ja -0x55 ; branch 0x8ee00
08f0a8: stxdw [r10 - 0x150], r0
08f0b0: ldxdw r8, [r1 + 0x0]
08f0b8: ldxdw r1, [r8 + 0x8]
08f0c0: ldxdw r5, [r1 + 0x0]
08f0c8: add64 r5, 0x1
08f0d0: mov64 r3, 0x1
08f0d8: jeq r5, 0x0, +0x1 ; branch 0x8f0e8
08f0e0: mov64 r3, 0x0
08f0e8: ldxb r0, [r2 + 0x2a]
08f0f0: stxdw [r10 - 0x1f0], r0
08f0f8: ldxb r0, [r2 + 0x29]
08f100: stxdw [r10 - 0x1e8], r0
08f108: ldxb r0, [r2 + 0x28]
08f110: stxdw [r10 - 0x1e0], r0
08f118: ldxdw r0, [r2 + 0x20]
08f120: stxdw [r10 - 0x1d8], r0
08f128: ldxdw r2, [r2 + 0x18]
08f130: stxdw [r10 - 0x1d0], r2
08f138: ldxdw r2, [r8 + 0x0]
08f140: stxdw [r1 + 0x0], r5
08f148: jne r3, 0x1, +0x1 ; branch 0x8f158
08f150: ja -0x6b ; branch 0x8ee00
08f158: stxdw [r10 - 0x200], r2
08f160: ldxdw r5, [r8 + 0x10]
08f168: ldxdw r3, [r5 + 0x0]
08f170: add64 r3, 0x1
08f178: mov64 r2, 0x1
08f180: jeq r3, 0x0, +0x1 ; branch 0x8f190
08f188: mov64 r2, 0x0
08f190: stxdw [r10 - 0x1f8], r1
08f198: stxdw [r5 + 0x0], r3
08f1a0: mov64 r0, r6
08f1a8: jne r2, 0x1, +0x1 ; branch 0x8f1b8
08f1b0: ja -0x77 ; branch 0x8ee00
08f1b8: stxdw [r10 - 0x210], r7
08f1c0: stxdw [r10 - 0x208], r9
08f1c8: ldxdw r1, [r10 - 0x138]
08f1d0: ldxdw r2, [r4 + 0x8]
08f1d8: ldxdw r1, [r2 + 0x0]
08f1e0: add64 r1, 0x1
08f1e8: mov64 r3, 0x1
08f1f0: jeq r1, 0x0, +0x1 ; branch 0x8f200
08f1f8: mov64 r3, 0x0
08f200: ldxdw r6, [r4 + 0x0]
08f208: ldxb r7, [r8 + 0x2a]
08f210: stxdw [r10 - 0x228], r7
08f218: ldxb r7, [r8 + 0x29]
08f220: stxdw [r10 - 0x220], r7
08f228: ldxb r7, [r8 + 0x28]
08f230: stxdw [r10 - 0x218], r7
08f238: ldxdw r7, [r8 + 0x20]
08f240: ldxdw r9, [r8 + 0x18]
08f248: stxdw [r2 + 0x0], r1
08f250: jne r3, 0x1, +0x1 ; branch 0x8f260
08f258: ja -0x8c ; branch 0x8ee00
08f260: stxdw [r10 - 0x240], r9
08f268: ldxdw r8, [r4 + 0x10]
08f270: ldxdw r1, [r8 + 0x0]
08f278: add64 r1, 0x1
08f280: mov64 r3, 0x1
08f288: jeq r1, 0x0, +0x1 ; branch 0x8f298
08f290: mov64 r3, 0x0
08f298: stxdw [r10 - 0x238], r6
08f2a0: ldxdw r6, [r10 - 0x150]
08f2a8: stxdw [r10 - 0x230], r0
08f2b0: ldxdw r0, [r10 - 0x148]
08f2b8: stxdw [r8 + 0x0], r1
08f2c0: jne r3, 0x1, +0x1 ; branch 0x8f2d0
08f2c8: ja -0x9a ; branch 0x8ee00
08f2d0: ldxdw r9, [r4 + 0x18]
08f2d8: ldxdw r1, [r4 + 0x20]
08f2e0: ldxb r3, [r4 + 0x28]
08f2e8: ldxb r0, [r4 + 0x29]
08f2f0: ldxb r4, [r4 + 0x2a]
08f2f8: ldxdw r6, [r10 - 0x228]
08f300: stxb [r10 - 0x16], r6
08f308: ldxdw r6, [r10 - 0x220]
08f310: stxb [r10 - 0x17], r6
08f318: ldxdw r6, [r10 - 0x218]
08f320: stxb [r10 - 0x18], r6
08f328: stxdw [r10 - 0x20], r7
08f330: ldxdw r6, [r10 - 0x240]
08f338: stxdw [r10 - 0x28], r6
08f340: stxdw [r10 - 0x30], r5
08f348: ldxdw r5, [r10 - 0x1f8]
08f350: stxdw [r10 - 0x38], r5
08f358: ldxdw r5, [r10 - 0x200]
08f360: stxdw [r10 - 0x40], r5
08f368: ldxdw r5, [r10 - 0x1f0]
08f370: stxb [r10 - 0x46], r5
08f378: ldxdw r5, [r10 - 0x1e8]
08f380: stxb [r10 - 0x47], r5
08f388: ldxdw r5, [r10 - 0x1e0]
08f390: stxb [r10 - 0x48], r5
08f398: ldxdw r5, [r10 - 0x1d8]
08f3a0: stxdw [r10 - 0x50], r5
08f3a8: ldxdw r5, [r10 - 0x1d0]
08f3b0: stxdw [r10 - 0x58], r5
08f3b8: ldxdw r5, [r10 - 0x140]
08f3c0: stxdw [r10 - 0x60], r5
08f3c8: ldxdw r5, [r10 - 0x210]
08f3d0: stxdw [r10 - 0x68], r5
08f3d8: ldxdw r5, [r10 - 0x150]
08f3e0: stxdw [r10 - 0x70], r5
08f3e8: stxb [r10 - 0x76], r4
08f3f0: stxb [r10 - 0x77], r0
08f3f8: stxb [r10 - 0x78], r3
08f400: stxdw [r10 - 0x80], r1
08f408: stxdw [r10 - 0x88], r9
08f410: stxdw [r10 - 0x90], r8
08f418: stxdw [r10 - 0x98], r2
08f420: ldxdw r1, [r10 - 0x238]
08f428: stxdw [r10 - 0xa0], r1
08f430: ldxdw r1, [r10 - 0x1c0]
08f438: stxb [r10 - 0xa6], r1
08f440: ldxdw r1, [r10 - 0x1b8]
08f448: stxb [r10 - 0xa7], r1
08f450: ldxdw r1, [r10 - 0x1b0]
08f458: stxb [r10 - 0xa8], r1
08f460: ldxdw r1, [r10 - 0x1a8]
08f468: stxdw [r10 - 0xb0], r1
08f470: ldxdw r1, [r10 - 0x230]
08f478: stxdw [r10 - 0xb8], r1
08f480: ldxdw r1, [r10 - 0x1a0]
08f488: stxdw [r10 - 0xc0], r1
08f490: ldxdw r1, [r10 - 0x1c8]
08f498: stxdw [r10 - 0xc8], r1
08f4a0: ldxdw r1, [r10 - 0x148]
08f4a8: stxdw [r10 - 0xd0], r1
08f4b0: ldxdw r1, [r10 - 0x170]
08f4b8: stxdw [r10 - 0x10], r1
08f4c0: ldxdw r1, [r10 - 0x198]
08f4c8: stxb [r10 - 0xd6], r1
08f4d0: ldxdw r1, [r10 - 0x190]
08f4d8: stxb [r10 - 0xd7], r1
08f4e0: ldxdw r1, [r10 - 0x188]
08f4e8: stxb [r10 - 0xd8], r1
08f4f0: ldxdw r1, [r10 - 0x180]
08f4f8: stxdw [r10 - 0xe0], r1
08f500: ldxdw r1, [r10 - 0x178]
08f508: stxdw [r10 - 0xe8], r1
08f510: ldxdw r1, [r10 - 0x130]
08f518: stxdw [r10 - 0xf0], r1
08f520: ldxdw r1, [r10 - 0x208]
08f528: stxdw [r10 - 0xf8], r1
08f530: ldxdw r1, [r10 - 0x158]
08f538: stxdw [r10 - 0x100], r1
08f540: stdw [r10 - 0x8], 0x1
08f548: stdw [r10 - 0x108], 0x0
08f550: stdw [r10 - 0x110], 0x8
08f558: stdw [r10 - 0x118], 0x0
08f560: mov64 r1, r10
08f568: add64 r1, -0x128
08f570: mov64 r2, r10
08f578: add64 r2, -0x118
08f580: ldxdw r3, [r10 - 0x160]
08f588: ldxdw r4, [r10 - 0x168]
08f590: call 0x1e0e6 ; direct target 0x17fcc8
08f598: ldxdw r1, [r10 - 0x128]
08f5a0: ldxdw r2, [r10 - 0x120]
08f5a8: ldxdw r3, [r10 - 0x138]
08f5b0: stxdw [r3 + 0x8], r2
08f5b8: stxdw [r3 + 0x0], r1
08f5c0: exit
