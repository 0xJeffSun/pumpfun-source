004f00: mov64 r7, r2
004f08: mov64 r6, r1
004f10: mov64 r1, r3
004f18: mov64 r2, r4
004f20: mov64 r3, 0x20
004f28: call 0x22936 ; call 0x1198e0
004f30: mov64 r9, 0x2
004f38: lsh64 r0, 0x20
004f40: rsh64 r0, 0x20
004f48: jne r0, 0x0, +0xc1 ; branch 0x5558
004f50: ldxdw r8, [r7 + 0x0]
004f58: mov64 r1, r8
004f60: call 0x1fbfc ; call 0x102f48
004f68: jne r0, 0x0, +0xbd ; branch 0x5558
004f70: mov64 r1, r10
004f78: add64 r1, -0x20
004f80: mov64 r2, r8
004f88: call 0x20851 ; call 0x109218
004f90: ldxdw r8, [r10 - 0x10]
004f98: ldxdw r1, [r10 - 0x18]
004fa0: ldxdw r2, [r10 - 0x20]
004fa8: lddw r3, -0x7fffffffffffffe6
004fb8: jne r2, r3, +0x9d ; branch 0x54a8
004fc0: ldxdw r2, [r1 + 0x0]
004fc8: ldxdw r1, [r1 + 0x8]
004fd0: stxdw [r10 - 0x18], r1
004fd8: stxdw [r10 - 0x20], r2
004fe0: stdw [r10 - 0x10], 0x0
004fe8: mov64 r1, r10
004ff0: add64 r1, -0x20
004ff8: lddw r2, 0x11c62e ; rodata b'\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_authorityGlobalVolumeAccumulator=programs/p'
005008: mov64 r3, 0x8
005010: call 0x1fb37 ; call 0x1029d0
005018: jne r0, 0x0, +0x9c ; branch 0x5500
005020: mov64 r2, r7
005028: add64 r2, 0x208
005030: mov64 r1, r10
005038: add64 r1, -0x20
005040: mov64 r3, 0x20
005048: call 0x1fb30 ; call 0x1029d0
005050: jne r0, 0x0, +0x95 ; branch 0x5500
005058: ldxdw r1, [r7 + 0x388]
005060: stxdw [r10 - 0x8], r1
005068: mov64 r1, r10
005070: add64 r1, -0x20
005078: mov64 r2, r10
005080: add64 r2, -0x8
005088: mov64 r3, 0x8
005090: call 0x1fb27 ; call 0x1029d0
005098: jne r0, 0x0, +0x8c ; branch 0x5500
0050a0: ldxdw r1, [r7 + 0x390]
0050a8: stxdw [r10 - 0x8], r1
0050b0: mov64 r1, r10
0050b8: add64 r1, -0x20
0050c0: mov64 r2, r10
0050c8: add64 r2, -0x8
0050d0: mov64 r3, 0x8
0050d8: call 0x1fb1e ; call 0x1029d0
0050e0: jne r0, 0x0, +0x83 ; branch 0x5500
0050e8: mov64 r2, r7
0050f0: add64 r2, 0x3b0
0050f8: mov64 r1, r10
005100: add64 r1, -0x20
005108: mov64 r3, 0x1
005110: call 0x1fb17 ; call 0x1029d0
005118: jne r0, 0x0, +0x7c ; branch 0x5500
005120: mov64 r1, r7
005128: add64 r1, 0x8
005130: mov64 r2, r10
005138: add64 r2, -0x20
005140: call 0xe31 ; call 0xc2d0
005148: jne r0, 0x0, +0x76 ; branch 0x5500
005150: ldxdw r1, [r7 + 0x398]
005158: stxdw [r10 - 0x8], r1
005160: mov64 r1, r10
005168: add64 r1, -0x20
005170: mov64 r2, r10
005178: add64 r2, -0x8
005180: mov64 r3, 0x8
005188: call 0x1fb08 ; call 0x1029d0
005190: jne r0, 0x0, +0x6d ; branch 0x5500
005198: mov64 r2, r7
0051a0: add64 r2, 0x228
0051a8: mov64 r1, r10
0051b0: add64 r1, -0x20
0051b8: mov64 r3, 0x20
0051c0: call 0x1fb01 ; call 0x1029d0
0051c8: jne r0, 0x0, +0x66 ; branch 0x5500
0051d0: mov64 r2, r7
0051d8: add64 r2, 0x248
0051e0: mov64 r1, r10
0051e8: add64 r1, -0x20
0051f0: mov64 r3, 0x20
0051f8: call 0x1fafa ; call 0x1029d0
005200: jne r0, 0x0, +0x5f ; branch 0x5500
005208: mov64 r2, r7
005210: add64 r2, 0x268
005218: mov64 r1, r10
005220: add64 r1, -0x20
005228: mov64 r3, 0x20
005230: call 0x1faf3 ; call 0x1029d0
005238: jne r0, 0x0, +0x58 ; branch 0x5500
005240: ldxb r1, [r7 + 0x3b1]
005248: stxb [r10 - 0x8], r1
005250: mov64 r1, r10
005258: add64 r1, -0x20
005260: mov64 r2, r10
005268: add64 r2, -0x8
005270: mov64 r3, 0x1
005278: call 0x1faea ; call 0x1029d0
005280: jne r0, 0x0, +0x4f ; branch 0x5500
005288: mov64 r1, r7
005290: add64 r1, 0x288
005298: mov64 r2, r10
0052a0: add64 r2, -0x20
0052a8: call 0xe37 ; call 0xc468
0052b0: jne r0, 0x0, +0x49 ; branch 0x5500
0052b8: ldxb r1, [r7 + 0x3b2]
0052c0: stxb [r10 - 0x8], r1
0052c8: mov64 r1, r10
0052d0: add64 r1, -0x20
0052d8: mov64 r2, r10
0052e0: add64 r2, -0x8
0052e8: mov64 r3, 0x1
0052f0: call 0x1fadb ; call 0x1029d0
0052f8: jne r0, 0x0, +0x40 ; branch 0x5500
005300: mov64 r1, r7
005308: add64 r1, 0x108
005310: mov64 r2, r10
005318: add64 r2, -0x20
005320: call 0xdf5 ; call 0xc2d0
005328: jne r0, 0x0, +0x3a ; branch 0x5500
005330: ldxdw r1, [r7 + 0x3a0]
005338: stxdw [r10 - 0x8], r1
005340: mov64 r1, r10
005348: add64 r1, -0x20
005350: mov64 r2, r10
005358: add64 r2, -0x8
005360: mov64 r3, 0x8
005368: call 0x1facc ; call 0x1029d0
005370: jne r0, 0x0, +0x31 ; branch 0x5500
005378: mov64 r2, r7
005380: add64 r2, 0x368
005388: mov64 r1, r10
005390: add64 r1, -0x20
005398: mov64 r3, 0x20
0053a0: call 0x1fac5 ; call 0x1029d0
0053a8: jne r0, 0x0, +0x2a ; branch 0x5500
0053b0: ldxb r1, [r7 + 0x3b3]
0053b8: stxb [r10 - 0x8], r1
0053c0: mov64 r1, r10
0053c8: add64 r1, -0x20
0053d0: mov64 r2, r10
0053d8: add64 r2, -0x8
0053e0: mov64 r3, 0x1
0053e8: call 0x1fabc ; call 0x1029d0
0053f0: jne r0, 0x0, +0x21 ; branch 0x5500
0053f8: ldxb r1, [r7 + 0x3b4]
005400: stxb [r10 - 0x8], r1
005408: mov64 r1, r10
005410: add64 r1, -0x20
005418: mov64 r2, r10
005420: add64 r2, -0x8
005428: mov64 r3, 0x1
005430: call 0x1fab3 ; call 0x1029d0
005438: jne r0, 0x0, +0x18 ; branch 0x5500
005440: ldxdw r1, [r7 + 0x3a8]
005448: stxdw [r10 - 0x8], r1
005450: mov64 r1, r10
005458: add64 r1, -0x20
005460: mov64 r2, r10
005468: add64 r2, -0x8
005470: mov64 r3, 0x8
005478: call 0x1faaa ; call 0x1029d0
005480: jne r0, 0x0, +0xf ; branch 0x5500
005488: ldxdw r1, [r8 + 0x0]
005490: add64 r1, 0x1
005498: stxdw [r8 + 0x0], r1
0054a0: ja +0x16 ; branch 0x5558
0054a8: stxdw [r10 - 0x10], r8
0054b0: stxdw [r10 - 0x18], r1
0054b8: stxdw [r10 - 0x20], r2
0054c0: mov64 r1, r10
0054c8: add64 r1, -0x30
0054d0: mov64 r2, r10
0054d8: add64 r2, -0x20
0054e0: call 0x1fb6b ; call 0x103040
0054e8: ldxdw r1, [r10 - 0x28]
0054f0: ldxdw r9, [r10 - 0x30]
0054f8: ja +0xb ; branch 0x5558
005500: mov64 r1, r10
005508: add64 r1, -0x40
005510: mov64 r2, r0
005518: call 0x1fb78 ; call 0x1030e0
005520: ldxdw r1, [r10 - 0x38]
005528: ldxdw r2, [r10 - 0x40]
005530: ldxdw r3, [r8 + 0x0]
005538: add64 r3, 0x1
005540: stxdw [r8 + 0x0], r3
005548: jeq r2, 0x2, +0x1 ; branch 0x5558
005550: mov64 r9, r2
005558: stxdw [r6 + 0x8], r1
005560: stxdw [r6 + 0x0], r9
005568: exit
