0e62b8: mov64 r8, r4
0e62c0: mov64 r9, r3
0e62c8: mov64 r7, r2
0e62d0: mov64 r6, r1
0e62d8: lddw r1, 0x11e878 ; rodata b'Instruction: ClaimTokenIncentivesInstruction: InitUserVolumeAccumulatorInst'
0e62e8: mov64 r2, 0x21
0e62f0: call -0x1
0e62f8: stb [r10 - 0xa81], 0xff
0e6300: sth [r10 - 0xa83], 0xffff
0e6308: stxdw [r10 - 0xa78], r8
0e6310: stxdw [r10 - 0xa80], r9
0e6318: mov64 r1, r10
0e6320: add64 r1, -0xa83
0e6328: stxdw [r10 - 0xff8], r1
0e6330: mov64 r1, r10
0e6338: add64 r1, -0x538
0e6340: mov64 r3, r10
0e6348: add64 r3, -0xa80
0e6350: mov64 r5, r10
0e6358: mov64 r2, r7
0e6360: call -0x3bbc ; call 0xc8588
0e6368: ldxw r8, [r10 - 0x538]
0e6370: jeq r8, 0x2, +0x4e ; branch 0xe65e8
0e6378: stxdw [r10 - 0xab0], r6
0e6380: ldxw r1, [r10 - 0x534]
0e6388: stxdw [r10 - 0xab8], r1
0e6390: ldxdw r6, [r10 - 0x530]
0e6398: ldxdw r9, [r10 - 0x528]
0e63a0: mov64 r1, r10
0e63a8: add64 r1, -0xa58
0e63b0: mov64 r2, r10
0e63b8: add64 r2, -0x520
0e63c0: mov64 r3, 0x520
0e63c8: call 0x6699 ; call 0x119898
0e63d0: stxdw [r10 - 0xa60], r9
0e63d8: stxdw [r10 - 0xa68], r6
0e63e0: ldxdw r1, [r10 - 0xab8]
0e63e8: stxw [r10 - 0xa6c], r1
0e63f0: stxw [r10 - 0xa70], r8
0e63f8: ldxh r1, [r10 - 0xa83]
0e6400: stxh [r10 - 0x518], r1
0e6408: ldxb r1, [r10 - 0xa81]
0e6410: stxb [r10 - 0x516], r1
0e6418: ldxdw r1, [r10 - 0xa78]
0e6420: stxdw [r10 - 0x520], r1
0e6428: ldxdw r1, [r10 - 0xa80]
0e6430: stxdw [r10 - 0x528], r1
0e6438: mov64 r1, r10
0e6440: add64 r1, -0xa70
0e6448: stxdw [r10 - 0x530], r1
0e6450: stxdw [r10 - 0x538], r7
0e6458: mov64 r1, r10
0e6460: add64 r1, -0xa98
0e6468: mov64 r2, r10
0e6470: add64 r2, -0x538
0e6478: call -0x117e2 ; call 0x5a570
0e6480: ldxdw r1, [r10 - 0xa98]
0e6488: jeq r1, 0x2, +0x1 ; branch 0xe6498
0e6490: ja +0x2f ; branch 0xe6610
0e6498: mov64 r1, r10
0e64a0: add64 r1, -0xaa8
0e64a8: mov64 r2, r10
0e64b0: add64 r2, -0xa70
0e64b8: mov64 r3, r7
0e64c0: call -0x3445 ; call 0xcc2a0
0e64c8: ldxdw r3, [r10 - 0x830]
0e64d0: ldxdw r4, [r10 - 0x838]
0e64d8: ldxdw r5, [r4 + 0x0]
0e64e0: add64 r5, -0x1
0e64e8: ldxdw r2, [r10 - 0xaa0]
0e64f0: ldxdw r1, [r10 - 0xaa8]
0e64f8: stxdw [r4 + 0x0], r5
0e6500: jne r5, 0x0, +0x3 ; branch 0xe6520
0e6508: ldxdw r5, [r4 + 0x8]
0e6510: add64 r5, -0x1
0e6518: stxdw [r4 + 0x8], r5
0e6520: ldxdw r4, [r3 + 0x0]
0e6528: add64 r4, -0x1
0e6530: stxdw [r3 + 0x0], r4
0e6538: ldxdw r6, [r10 - 0xab0]
0e6540: jne r4, 0x0, +0x3 ; branch 0xe6560
0e6548: ldxdw r4, [r3 + 0x8]
0e6550: add64 r4, -0x1
0e6558: stxdw [r3 + 0x8], r4
0e6560: ldxdw r3, [r10 - 0x800]
0e6568: ldxdw r4, [r10 - 0x808]
0e6570: ldxdw r5, [r4 + 0x0]
0e6578: add64 r5, -0x1
0e6580: stxdw [r4 + 0x0], r5
0e6588: jne r5, 0x0, +0x3 ; branch 0xe65a8
0e6590: ldxdw r5, [r4 + 0x8]
0e6598: add64 r5, -0x1
0e65a0: stxdw [r4 + 0x8], r5
0e65a8: ldxdw r4, [r3 + 0x0]
0e65b0: add64 r4, -0x1
0e65b8: stxdw [r3 + 0x0], r4
0e65c0: jne r4, 0x0, +0x6 ; branch 0xe65f8
0e65c8: ldxdw r4, [r3 + 0x8]
0e65d0: add64 r4, -0x1
0e65d8: stxdw [r3 + 0x8], r4
0e65e0: ja +0x2 ; branch 0xe65f8
0e65e8: ldxdw r2, [r10 - 0x528]
0e65f0: ldxdw r1, [r10 - 0x530]
0e65f8: stxdw [r6 + 0x8], r2
0e6600: stxdw [r6 + 0x0], r1
0e6608: exit
0e6610: ldxdw r2, [r10 - 0xa90]
0e6618: ldxdw r3, [r10 - 0x830]
0e6620: ldxdw r4, [r10 - 0x838]
0e6628: ldxdw r5, [r4 + 0x0]
0e6630: add64 r5, -0x1
0e6638: stxdw [r4 + 0x0], r5
0e6640: jne r5, 0x0, +0x3 ; branch 0xe6660
0e6648: ldxdw r5, [r4 + 0x8]
0e6650: add64 r5, -0x1
0e6658: stxdw [r4 + 0x8], r5
0e6660: ldxdw r4, [r3 + 0x0]
0e6668: add64 r4, -0x1
0e6670: stxdw [r3 + 0x0], r4
0e6678: ldxdw r6, [r10 - 0xab0]
0e6680: jne r4, 0x0, +0x3 ; branch 0xe66a0
0e6688: ldxdw r4, [r3 + 0x8]
0e6690: add64 r4, -0x1
0e6698: stxdw [r3 + 0x8], r4
0e66a0: ldxdw r3, [r10 - 0x800]
0e66a8: ldxdw r4, [r10 - 0x808]
0e66b0: ldxdw r5, [r4 + 0x0]
0e66b8: add64 r5, -0x1
0e66c0: stxdw [r4 + 0x0], r5
0e66c8: jne r5, 0x0, +0x3 ; branch 0xe66e8
0e66d0: ldxdw r5, [r4 + 0x8]
0e66d8: add64 r5, -0x1
0e66e0: stxdw [r4 + 0x8], r5
0e66e8: ldxdw r4, [r3 + 0x0]
0e66f0: add64 r4, -0x1
0e66f8: stxdw [r3 + 0x0], r4
0e6700: jne r4, 0x0, -0x22 ; branch 0xe65f8
0e6708: ja -0x29 ; branch 0xe65c8
