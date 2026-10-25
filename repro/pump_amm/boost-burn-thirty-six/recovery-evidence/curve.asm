012310: mov64 r5, r3
012318: jne r2, 0x0, +0xb ; branch 0x12378
012320: mov64 r2, r10
012328: add64 r2, -0x10
012330: mov64 r6, r1
012338: mov64 r1, r2
012340: mov64 r2, 0x17
012348: call 0xd0cb ; call 0x7a9a8
012350: ldxdw r1, [r10 - 0x10]
012358: ldxdw r2, [r10 - 0x8]
012360: stxdw [r6 + 0x8], r2
012368: stxdw [r6 + 0x0], r1
012370: ja +0x4 ; branch 0x12398
012378: add64 r2, -0x1
012380: mov64 r3, r4
012388: mov64 r4, r5
012390: call 0x1 ; call 0x123a0
012398: exit
