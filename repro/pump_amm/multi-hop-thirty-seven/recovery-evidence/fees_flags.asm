040890: mov64 r9, r5
040898: mov64 r8, r4
0408a0: stxdw [r10 - 0x28], r3
0408a8: mov64 r3, r2
0408b0: mov64 r6, r1
0408b8: ldxdw r7, [r8 + 0x10]
0408c0: add64 r3, 0x8
0408c8: ldxdw r4, [r9 - 0xff8]
0408d0: ldxdw r5, [r9 - 0xff0]
0408d8: mov64 r2, r7
0408e0: add64 r2, 0x8
0408e8: mov64 r1, r10
0408f0: add64 r1, -0x10
0408f8: call 0x57cd ; call 0x6c768
040900: ldxdw r1, [r10 - 0x10]
040908: jne r1, 0x2, +0x8 ; branch 0x40950
040910: ldxdw r1, [r9 - 0xfe8]
040918: ldxdw r5, [r10 - 0x8]
040920: and64 r1, 0x1
040928: jeq r1, 0x0, +0x1 ; branch 0x40938
040930: ja +0x7 ; branch 0x40970
040938: stxdw [r6 + 0x8], r5
040940: stdw [r6 + 0x0], 0x2
040948: ja +0x3 ; branch 0x40968
040950: ldxdw r2, [r10 - 0x8]
040958: stxdw [r6 + 0x8], r2
040960: stxdw [r6 + 0x0], r1
040968: exit
040970: ldxdw r2, [r9 - 0x1000]
040978: ldxdw r4, [r8 + 0x20]
040980: ldxdw r3, [r8 + 0x8]
040988: ldxdw r1, [r10 - 0x28]
040990: stxdw [r10 - 0xff8], r1
040998: stxdw [r10 - 0xff0], r5
0409a0: stxdw [r10 - 0x1000], r7
0409a8: mov64 r1, r10
0409b0: add64 r1, -0x20
0409b8: mov64 r7, r5
0409c0: mov64 r5, r10
0409c8: call 0x619d ; call 0x716b8
0409d0: mov64 r5, r7
0409d8: ldxdw r1, [r10 - 0x20]
0409e0: jeq r1, 0x2, -0x16 ; branch 0x40938
0409e8: ldxdw r2, [r10 - 0x18]
0409f0: stxdw [r6 + 0x0], r1
0409f8: stxdw [r6 + 0x8], r2
040a00: ja -0x14 ; branch 0x40968
