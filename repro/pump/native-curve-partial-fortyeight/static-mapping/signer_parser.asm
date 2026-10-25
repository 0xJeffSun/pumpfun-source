0127a0: ldxdw r3, [r2 + 0x8]
0127a8: jne r3, 0x0, +0xb ; branch 0x12808
0127b0: mov64 r2, r10
0127b8: add64 r2, -0x10
0127c0: mov64 r6, r1
0127c8: mov64 r1, r2
0127d0: mov64 r2, 0xbbd
0127d8: call 0x31968 ; direct target 0x19f320
0127e0: ldxdw r1, [r10 - 0x10]
0127e8: ldxdw r2, [r10 - 0x8]
0127f0: stxdw [r6 + 0x8], r2
0127f8: stxdw [r6 + 0x0], r1
012800: ja +0x8 ; branch 0x12848
012808: add64 r3, -0x1
012810: stxdw [r2 + 0x8], r3
012818: ldxdw r3, [r2 + 0x0]
012820: mov64 r4, r3
012828: add64 r4, 0x30
012830: stxdw [r2 + 0x0], r4
012838: mov64 r2, r3
012840: call 0x31193 ; direct target 0x19b4e0
012848: exit
