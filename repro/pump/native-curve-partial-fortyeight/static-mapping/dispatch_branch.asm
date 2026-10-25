11c9b8: add64 r2, 0x8
11c9c0: stxdw [r10 - 0x1000], r2
11c9c8: add64 r1, -0x8
11c9d0: stxdw [r10 - 0xff8], r1
11c9d8: mov64 r1, r10
11c9e0: add64 r1, -0x270
11c9e8: mov64 r5, r10
11c9f0: mov64 r2, r9
11c9f8: ldxdw r3, [r10 - 0x3e0]
11ca00: mov64 r4, r8
11ca08: call 0x1976 ; direct target 0x1295c0
11ca10: ldxdw r7, [r10 - 0x268]
11ca18: ldxdw r8, [r10 - 0x270]
11ca20: ja -0x152 ; branch 0x11bf98
