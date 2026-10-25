083088: mov64 r8, r5
083090: stxdw [r10 - 0x80], r4
083098: stxdw [r10 - 0x88], r3
0830a0: mov64 r9, r2
0830a8: stxdw [r10 - 0x78], r1
0830b0: stdw [r10 - 0x18], 0x0
0830b8: stdw [r10 - 0x20], 0x0
0830c0: stdw [r10 - 0x28], 0x0
0830c8: stdw [r10 - 0x30], 0x0
0830d0: mov64 r2, r10
0830d8: add64 r2, -0x30
0830e0: mov64 r1, r9
0830e8: mov64 r3, 0x20
0830f0: call 0x260b0 ; direct target 0x1b3678
0830f8: lsh64 r0, 0x20
083100: rsh64 r0, 0x20
083108: ldxdw r4, [r8 - 0xff8]
083110: mov64 r1, 0x0
083118: jeq r0, 0x0, +0x1 ; branch 0x83128
083120: mov64 r1, r4
083128: ldxdw r7, [r8 - 0x1000]
083130: mov64 r6, r7
083138: add64 r6, r1
083140: mov64 r1, 0x1
083148: jlt r6, r7, +0x1 ; branch 0x83158
083150: mov64 r1, 0x0
083158: and64 r1, 0x1
083160: jne r1, 0x0, +0x2a ; branch 0x832b8
083168: ldxdw r1, [r8 - 0xfe8]
083170: stxdw [r10 - 0x90], r1
083178: ldxdw r8, [r8 - 0xff0]
083180: mov64 r1, r8
083188: jeq r6, 0x0, +0x15 ; branch 0x83238
083190: jeq r8, 0x0, +0x2f ; branch 0x83310
083198: stxdw [r10 - 0x98], r4
0831a0: mov64 r1, r10
0831a8: add64 r1, -0x50
0831b0: mov64 r2, r8
0831b8: mov64 r3, 0x0
0831c0: mov64 r4, 0x2710
0831c8: mov64 r5, 0x0
0831d0: call 0x2647e ; direct target 0x1b55c8
0831d8: mov64 r4, r6
0831e0: add64 r4, 0x2710
0831e8: mov64 r5, 0x1
0831f0: jlt r4, r6, +0x1 ; branch 0x83200
0831f8: mov64 r5, 0x0
083200: mov64 r1, r10
083208: add64 r1, -0x60
083210: ldxdw r2, [r10 - 0x50]
083218: ldxdw r3, [r10 - 0x48]
083220: call 0x261cc ; direct target 0x1b4088
083228: ldxdw r1, [r10 - 0x60]
083230: ldxdw r4, [r10 - 0x98]
083238: jlt r1, 0x2, +0x1a ; branch 0x83310
083240: mov64 r1, r10
083248: add64 r1, -0x30
083250: mov64 r2, r9
083258: mov64 r3, r7
083260: mov64 r5, r8
083268: call -0x575 ; direct target 0x806c8
083270: ldxdw r6, [r10 - 0x20]
083278: ldxdw r9, [r10 - 0x28]
083280: ldxdw r1, [r10 - 0x30]
083288: jeq r1, 0x0, +0x13 ; branch 0x83328
083290: ldxdw r1, [r10 - 0x78]
083298: stxdw [r1 + 0x10], r6
0832a0: stxdw [r1 + 0x8], r9
0832a8: stdw [r1 + 0x0], 0x2
0832b0: ja +0xd ; branch 0x83320
0832b8: mov64 r1, r10
0832c0: add64 r1, -0x70
0832c8: mov64 r2, 0x18
0832d0: call 0x1b537 ; direct target 0x15dc90
0832d8: ldxdw r1, [r10 - 0x70]
0832e0: ldxdw r2, [r10 - 0x68]
0832e8: ldxdw r3, [r10 - 0x78]
0832f0: stxdw [r3 + 0x10], r2
0832f8: stxdw [r3 + 0x8], r1
083300: stdw [r3 + 0x0], 0x2
083308: ja +0x2 ; branch 0x83320
083310: ldxdw r1, [r10 - 0x78]
083318: stdw [r1 + 0x0], 0x0
083320: exit
083328: ldxdw r7, [r10 - 0x18]
083330: ldxdw r1, [r10 - 0x8]
083338: stxdw [r10 - 0x38], r1
083340: ldxdw r1, [r10 - 0x10]
083348: stxdw [r10 - 0x40], r1
083350: ldxdw r1, [r10 - 0x90]
083358: jne r1, 0x0, +0x1 ; branch 0x83368
083360: ja +0xa ; branch 0x833b8
083368: mov64 r1, r10
083370: add64 r1, -0x30
083378: mov64 r2, r8
083380: mov64 r3, r6
083388: mov64 r4, r7
083390: call -0x5e2 ; direct target 0x80488
083398: ldxdw r1, [r10 - 0x30]
0833a0: jeq r1, 0x2, +0x1 ; branch 0x833b0
0833a8: ja +0x1c ; branch 0x83490
0833b0: ldxdw r9, [r10 - 0x28]
0833b8: mov64 r1, r10
0833c0: add64 r1, -0x30
0833c8: mov64 r2, r9
0833d0: ldxdw r8, [r10 - 0x88]
0833d8: mov64 r3, r8
0833e0: ldxdw r4, [r10 - 0x80]
0833e8: call 0x1b ; direct target 0x834c8
0833f0: ldxdw r1, [r10 - 0x30]
0833f8: jeq r1, 0x2, +0x1 ; branch 0x83408
083400: ja +0x11 ; branch 0x83490
083408: mov64 r2, 0x0
083410: ldxdw r1, [r10 - 0x28]
083418: ldxdw r3, [r10 - 0x78]
083420: jeq r1, 0x0, +0x12 ; branch 0x834b8
083428: ldxdw r2, [r10 - 0x38]
083430: stxdw [r3 + 0x20], r2
083438: ldxdw r2, [r10 - 0x40]
083440: stxdw [r3 + 0x18], r2
083448: ldxdw r2, [r10 - 0x80]
083450: stxdw [r3 + 0x40], r2
083458: stxdw [r3 + 0x38], r8
083460: stxdw [r3 + 0x30], r9
083468: stxdw [r3 + 0x28], r1
083470: stxdw [r3 + 0x10], r7
083478: stxdw [r3 + 0x8], r6
083480: stdw [r3 + 0x0], 0x1
083488: ja -0x2e ; branch 0x83320
083490: ldxdw r2, [r10 - 0x28]
083498: ldxdw r3, [r10 - 0x78]
0834a0: stxdw [r3 + 0x10], r2
0834a8: stxdw [r3 + 0x8], r1
0834b0: mov64 r2, 0x2
0834b8: stxdw [r3 + 0x0], r2
0834c0: ja -0x35 ; branch 0x83320
