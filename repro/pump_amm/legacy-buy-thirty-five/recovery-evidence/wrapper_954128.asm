0e8f10: mov64 r7, r5
0e8f18: mov64 r9, r4
0e8f20: mov64 r8, r3
0e8f28: mov64 r6, r2
0e8f30: stxdw [r10 - 0x1b0], r1
0e8f38: lddw r1, 0x11e94b ; rodata b'Instruction: BuyExactQuoteInV2Instruction: SellV2Instruction: MultiHopSwapI'
0e8f48: mov64 r2, 0x1e
0e8f50: call -0x1
0e8f58: ldxdw r1, [r7 - 0xff8]
0e8f60: jlt r1, 0x8, +0x51 ; branch 0xe91f0
0e8f68: and64 r1, -0x8
0e8f70: jeq r1, 0x8, +0x4f ; branch 0xe91f0
0e8f78: ldxdw r1, [r7 - 0x1000]
0e8f80: ldxdw r2, [r1 + 0x0]
0e8f88: stxdw [r10 - 0x1b8], r2
0e8f90: ldxdw r1, [r1 + 0x8]
0e8f98: stxdw [r10 - 0x1c0], r1
0e8fa0: sth [r10 - 0x172], 0xffff
0e8fa8: stxdw [r10 - 0x168], r9
0e8fb0: stxdw [r10 - 0x170], r8
0e8fb8: mov64 r1, r10
0e8fc0: add64 r1, -0x172
0e8fc8: stxdw [r10 - 0xff8], r1
0e8fd0: mov64 r1, r10
0e8fd8: add64 r1, -0xb0
0e8fe0: mov64 r3, r10
0e8fe8: add64 r3, -0x170
0e8ff0: mov64 r5, r10
0e8ff8: mov64 r2, r6
0e9000: call -0x5d1d ; call 0xba720
0e9008: ldxdw r8, [r10 - 0xa8]
0e9010: ldxdw r7, [r10 - 0xb0]
0e9018: ldxb r9, [r10 - 0x6]
0e9020: jeq r9, 0x2, +0x4c ; branch 0xe9288
0e9028: mov64 r1, r10
0e9030: add64 r1, -0x150
0e9038: mov64 r2, r10
0e9040: add64 r2, -0xa0
0e9048: mov64 r3, 0x9a
0e9050: call 0x6108 ; call 0x119898
0e9058: ldxw r1, [r10 - 0x5]
0e9060: stxw [r10 - 0xb5], r1
0e9068: ldxb r1, [r10 - 0x1]
0e9070: stxb [r10 - 0xb1], r1
0e9078: stxb [r10 - 0xb6], r9
0e9080: stxdw [r10 - 0x158], r8
0e9088: stxdw [r10 - 0x160], r7
0e9090: ldxb r1, [r10 - 0x171]
0e9098: stxb [r10 - 0x8f], r1
0e90a0: ldxb r1, [r10 - 0x172]
0e90a8: stxb [r10 - 0x90], r1
0e90b0: ldxdw r1, [r10 - 0x168]
0e90b8: stxdw [r10 - 0x98], r1
0e90c0: ldxdw r1, [r10 - 0x170]
0e90c8: stxdw [r10 - 0xa0], r1
0e90d0: mov64 r1, r10
0e90d8: add64 r1, -0x160
0e90e0: stxdw [r10 - 0xa8], r1
0e90e8: stxdw [r10 - 0xb0], r6
0e90f0: mov64 r1, r10
0e90f8: add64 r1, -0x188
0e9100: mov64 r2, r10
0e9108: add64 r2, -0xb0
0e9110: ldxdw r3, [r10 - 0x1b8]
0e9118: ldxdw r4, [r10 - 0x1c0]
0e9120: call -0x128e1 ; call 0x54a20
0e9128: ldxdw r7, [r10 - 0x188]
0e9130: jeq r7, 0x2, +0x1 ; branch 0xe9140
0e9138: ja +0x2d ; branch 0xe92a8
0e9140: mov64 r1, r10
0e9148: add64 r1, -0x198
0e9150: mov64 r2, r10
0e9158: add64 r2, -0x160
0e9160: mov64 r3, r6
0e9168: call -0x53c0 ; call 0xbf370
0e9170: ldxdw r1, [r10 - 0xd0]
0e9178: ldxdw r2, [r10 - 0xd8]
0e9180: ldxdw r3, [r2 + 0x0]
0e9188: add64 r3, -0x1
0e9190: ldxdw r8, [r10 - 0x190]
0e9198: ldxdw r7, [r10 - 0x198]
0e91a0: stxdw [r2 + 0x0], r3
0e91a8: jne r3, 0x0, +0x3 ; branch 0xe91c8
0e91b0: ldxdw r3, [r2 + 0x8]
0e91b8: add64 r3, -0x1
0e91c0: stxdw [r2 + 0x8], r3
0e91c8: ldxdw r2, [r1 + 0x0]
0e91d0: add64 r2, -0x1
0e91d8: stxdw [r1 + 0x0], r2
0e91e0: jne r2, 0x0, +0x14 ; branch 0xe9288
0e91e8: ja +0x25 ; branch 0xe9318
0e91f0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e9200: call 0x4bc1 ; call 0x10f010
0e9208: mov64 r1, r0
0e9210: and64 r1, 0x3
0e9218: mov64 r2, r1
0e9220: add64 r2, -0x2
0e9228: jlt r2, 0x2, +0x5 ; branch 0xe9258
0e9230: jeq r1, 0x0, +0x4 ; branch 0xe9258
0e9238: ldxdw r1, [r0 - 0x1]
0e9240: ldxdw r2, [r0 + 0x7]
0e9248: ldxdw r2, [r2 + 0x0]
0e9250: callx r2
0e9258: mov64 r1, r10
0e9260: add64 r1, -0x1a8
0e9268: mov64 r2, 0x66
0e9270: call 0x3978 ; call 0x105e38
0e9278: ldxdw r8, [r10 - 0x1a0]
0e9280: ldxdw r7, [r10 - 0x1a8]
0e9288: ldxdw r1, [r10 - 0x1b0]
0e9290: stxdw [r1 + 0x8], r8
0e9298: stxdw [r1 + 0x0], r7
0e92a0: exit
0e92a8: ldxdw r8, [r10 - 0x180]
0e92b0: ldxdw r1, [r10 - 0xd0]
0e92b8: ldxdw r2, [r10 - 0xd8]
0e92c0: ldxdw r3, [r2 + 0x0]
0e92c8: add64 r3, -0x1
0e92d0: stxdw [r2 + 0x0], r3
0e92d8: jne r3, 0x0, +0x3 ; branch 0xe92f8
0e92e0: ldxdw r3, [r2 + 0x8]
0e92e8: add64 r3, -0x1
0e92f0: stxdw [r2 + 0x8], r3
0e92f8: ldxdw r2, [r1 + 0x0]
0e9300: add64 r2, -0x1
0e9308: stxdw [r1 + 0x0], r2
0e9310: jne r2, 0x0, -0x12 ; branch 0xe9288
0e9318: ldxdw r2, [r1 + 0x8]
0e9320: add64 r2, -0x1
0e9328: stxdw [r1 + 0x8], r2
0e9330: ja -0x16 ; branch 0xe9288
