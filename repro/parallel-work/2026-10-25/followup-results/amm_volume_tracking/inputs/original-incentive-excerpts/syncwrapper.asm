0e70b8: mov64 r8, r4
0e70c0: mov64 r9, r3
0e70c8: mov64 r7, r2
0e70d0: stxdw [r10 - 0x670], r1
0e70d8: lddw r1, 0x11e8e6 ; rodata b'Instruction: SyncUserVolumeAccumulatorInstruction: BuyExactQuoteInInstructi'
0e70e8: mov64 r2, 0x26
0e70f0: call -0x1
0e70f8: stb [r10 - 0x631], 0xff
0e7100: sth [r10 - 0x633], 0xffff
0e7108: stxdw [r10 - 0x628], r8
0e7110: stxdw [r10 - 0x630], r9
0e7118: mov64 r1, r10
0e7120: add64 r1, -0x633
0e7128: stxdw [r10 - 0xff8], r1
0e7130: mov64 r1, r10
0e7138: add64 r1, -0x310
0e7140: mov64 r3, r10
0e7148: add64 r3, -0x630
0e7150: mov64 r5, r10
0e7158: mov64 r2, r7
0e7160: call -0x2809 ; call 0xd3120
0e7168: ldxdw r9, [r10 - 0x308]
0e7170: ldxdw r8, [r10 - 0x310]
0e7178: ldxb r6, [r10 - 0x6]
0e7180: jeq r6, 0x2, +0x94 ; branch 0xe7628
0e7188: mov64 r1, r10
0e7190: add64 r1, -0x610
0e7198: mov64 r2, r10
0e71a0: add64 r2, -0x300
0e71a8: mov64 r3, 0x2fa
0e71b0: call 0x64dc ; call 0x119898
0e71b8: ldxw r1, [r10 - 0x5]
0e71c0: stxw [r10 - 0x315], r1
0e71c8: ldxb r1, [r10 - 0x1]
0e71d0: stxb [r10 - 0x311], r1
0e71d8: stxb [r10 - 0x316], r6
0e71e0: stxdw [r10 - 0x618], r9
0e71e8: stxdw [r10 - 0x620], r8
0e71f0: ldxh r1, [r10 - 0x633]
0e71f8: stxh [r10 - 0x2f0], r1
0e7200: ldxb r1, [r10 - 0x631]
0e7208: stxb [r10 - 0x2ee], r1
0e7210: ldxdw r1, [r10 - 0x628]
0e7218: stxdw [r10 - 0x2f8], r1
0e7220: ldxdw r1, [r10 - 0x630]
0e7228: stxdw [r10 - 0x300], r1
0e7230: mov64 r1, r10
0e7238: add64 r1, -0x620
0e7240: stxdw [r10 - 0x308], r1
0e7248: stxdw [r10 - 0x310], r7
0e7250: mov64 r1, r10
0e7258: add64 r1, -0x648
0e7260: mov64 r2, r10
0e7268: add64 r2, -0x310
0e7270: call -0x112cb ; call 0x5dc20
0e7278: ldxdw r8, [r10 - 0x648]
0e7280: jeq r8, 0x2, +0x1 ; branch 0xe7290
0e7288: ja +0x42 ; branch 0xe74a0
0e7290: mov64 r1, r10
0e7298: add64 r1, -0x658
0e72a0: mov64 r2, r10
0e72a8: add64 r2, -0x400
0e72b0: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0e72c0: mov64 r4, r7
0e72c8: call -0x1c543 ; call 0x48b8
0e72d0: mov64 r8, 0x2
0e72d8: ldxdw r2, [r10 - 0x658]
0e72e0: jeq r2, 0x2, +0x9 ; branch 0xe7330
0e72e8: ldxdw r3, [r10 - 0x650]
0e72f0: mov64 r1, r10
0e72f8: add64 r1, -0x668
0e7300: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0e7310: mov64 r5, 0x17
0e7318: call -0x1cab5 ; call 0x1d78
0e7320: ldxdw r9, [r10 - 0x660]
0e7328: ldxdw r8, [r10 - 0x668]
0e7330: ldxdw r1, [r10 - 0x390]
0e7338: ldxdw r2, [r10 - 0x398]
0e7340: ldxdw r3, [r2 + 0x0]
0e7348: add64 r3, -0x1
0e7350: stxdw [r2 + 0x0], r3
0e7358: jne r3, 0x0, +0x3 ; branch 0xe7378
0e7360: ldxdw r3, [r2 + 0x8]
0e7368: add64 r3, -0x1
0e7370: stxdw [r2 + 0x8], r3
0e7378: ldxdw r2, [r1 + 0x0]
0e7380: add64 r2, -0x1
0e7388: stxdw [r1 + 0x0], r2
0e7390: jne r2, 0x0, +0x3 ; branch 0xe73b0
0e7398: ldxdw r2, [r1 + 0x8]
0e73a0: add64 r2, -0x1
0e73a8: stxdw [r1 + 0x8], r2
0e73b0: ldxdw r1, [r10 - 0x360]
0e73b8: ldxdw r2, [r10 - 0x368]
0e73c0: ldxdw r3, [r2 + 0x0]
0e73c8: add64 r3, -0x1
0e73d0: stxdw [r2 + 0x0], r3
0e73d8: jne r3, 0x0, +0x3 ; branch 0xe73f8
0e73e0: ldxdw r3, [r2 + 0x8]
0e73e8: add64 r3, -0x1
0e73f0: stxdw [r2 + 0x8], r3
0e73f8: ldxdw r2, [r1 + 0x0]
0e7400: add64 r2, -0x1
0e7408: stxdw [r1 + 0x0], r2
0e7410: jne r2, 0x0, +0x3 ; branch 0xe7430
0e7418: ldxdw r2, [r1 + 0x8]
0e7420: add64 r2, -0x1
0e7428: stxdw [r1 + 0x8], r2
0e7430: ldxdw r1, [r10 - 0x330]
0e7438: ldxdw r2, [r10 - 0x338]
0e7440: ldxdw r3, [r2 + 0x0]
0e7448: add64 r3, -0x1
0e7450: stxdw [r2 + 0x0], r3
0e7458: jne r3, 0x0, +0x3 ; branch 0xe7478
0e7460: ldxdw r3, [r2 + 0x8]
0e7468: add64 r3, -0x1
0e7470: stxdw [r2 + 0x8], r3
0e7478: ldxdw r2, [r1 + 0x0]
0e7480: add64 r2, -0x1
0e7488: stxdw [r1 + 0x0], r2
0e7490: jne r2, 0x0, +0x32 ; branch 0xe7628
0e7498: ja +0x2e ; branch 0xe7610
0e74a0: ldxdw r9, [r10 - 0x640]
0e74a8: ldxdw r1, [r10 - 0x390]
0e74b0: ldxdw r2, [r10 - 0x398]
0e74b8: ldxdw r3, [r2 + 0x0]
0e74c0: add64 r3, -0x1
0e74c8: stxdw [r2 + 0x0], r3
0e74d0: jne r3, 0x0, +0x3 ; branch 0xe74f0
0e74d8: ldxdw r3, [r2 + 0x8]
0e74e0: add64 r3, -0x1
0e74e8: stxdw [r2 + 0x8], r3
0e74f0: ldxdw r2, [r1 + 0x0]
0e74f8: add64 r2, -0x1
0e7500: stxdw [r1 + 0x0], r2
0e7508: jne r2, 0x0, +0x3 ; branch 0xe7528
0e7510: ldxdw r2, [r1 + 0x8]
0e7518: add64 r2, -0x1
0e7520: stxdw [r1 + 0x8], r2
0e7528: ldxdw r1, [r10 - 0x360]
0e7530: ldxdw r2, [r10 - 0x368]
0e7538: ldxdw r3, [r2 + 0x0]
0e7540: add64 r3, -0x1
0e7548: stxdw [r2 + 0x0], r3
0e7550: jne r3, 0x0, +0x3 ; branch 0xe7570
0e7558: ldxdw r3, [r2 + 0x8]
0e7560: add64 r3, -0x1
0e7568: stxdw [r2 + 0x8], r3
0e7570: ldxdw r2, [r1 + 0x0]
0e7578: add64 r2, -0x1
0e7580: stxdw [r1 + 0x0], r2
0e7588: jne r2, 0x0, +0x3 ; branch 0xe75a8
0e7590: ldxdw r2, [r1 + 0x8]
0e7598: add64 r2, -0x1
0e75a0: stxdw [r1 + 0x8], r2
0e75a8: ldxdw r1, [r10 - 0x330]
0e75b0: ldxdw r2, [r10 - 0x338]
0e75b8: ldxdw r3, [r2 + 0x0]
0e75c0: add64 r3, -0x1
0e75c8: stxdw [r2 + 0x0], r3
0e75d0: jne r3, 0x0, +0x3 ; branch 0xe75f0
0e75d8: ldxdw r3, [r2 + 0x8]
0e75e0: add64 r3, -0x1
0e75e8: stxdw [r2 + 0x8], r3
0e75f0: ldxdw r2, [r1 + 0x0]
0e75f8: add64 r2, -0x1
0e7600: stxdw [r1 + 0x0], r2
0e7608: jne r2, 0x0, +0x3 ; branch 0xe7628
0e7610: ldxdw r2, [r1 + 0x8]
0e7618: add64 r2, -0x1
0e7620: stxdw [r1 + 0x8], r2
0e7628: ldxdw r1, [r10 - 0x670]
0e7630: stxdw [r1 + 0x8], r9
0e7638: stxdw [r1 + 0x0], r8
0e7640: exit
