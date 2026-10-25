0e7d88: mov64 r6, r5
0e7d90: mov64 r8, r4
0e7d98: mov64 r9, r3
0e7da0: mov64 r7, r2
0e7da8: stxdw [r10 - 0x3c0], r1
0e7db0: lddw r1, 0x11e90c ; rodata b'Instruction: BuyExactQuoteInInstruction: SellInstruction: BuyV2Instruction:'
0e7dc0: mov64 r2, 0x1c
0e7dc8: call -0x1
0e7dd0: ldxdw r1, [r6 - 0xff8]
0e7dd8: jlt r1, 0x8, +0x7a ; branch 0xe81b0
0e7de0: mov64 r2, r1
0e7de8: and64 r2, -0x8
0e7df0: jeq r2, 0x8, +0x77 ; branch 0xe81b0
0e7df8: ldxdw r2, [r6 - 0x1000]
0e7e00: ldxdw r3, [r2 + 0x0]
0e7e08: mov64 r5, 0x0
0e7e10: ldxdw r4, [r2 + 0x8]
0e7e18: jeq r1, 0x10, +0x4 ; branch 0xe7e40
0e7e20: ldxb r1, [r2 + 0x10]
0e7e28: jeq r1, 0x0, +0x2 ; branch 0xe7e40
0e7e30: jne r1, 0x1, +0xb8 ; branch 0xe83f8
0e7e38: mov64 r5, 0x1
0e7e40: stxdw [r10 - 0x3d8], r5
0e7e48: stxdw [r10 - 0x3d0], r4
0e7e50: stxdw [r10 - 0x3c8], r3
0e7e58: mov64 r1, -0x1
0e7e60: stxb [r10 - 0x384], r1
0e7e68: stxw [r10 - 0x388], r1
0e7e70: stxdw [r10 - 0x8], r8
0e7e78: stxdw [r10 - 0x10], r9
0e7e80: mov64 r1, r10
0e7e88: add64 r1, -0x388
0e7e90: stxdw [r10 - 0xff8], r1
0e7e98: mov64 r1, r10
0e7ea0: add64 r1, -0x1c8
0e7ea8: mov64 r3, r10
0e7eb0: add64 r3, -0x10
0e7eb8: mov64 r5, r10
0e7ec0: mov64 r2, r7
0e7ec8: call -0x79df ; call 0xaafd8
0e7ed0: ldxdw r8, [r10 - 0x1b8]
0e7ed8: ldxdw r6, [r10 - 0x1c0]
0e7ee0: ldxdw r9, [r10 - 0x1c8]
0e7ee8: lddw r1, -0x8000000000000000
0e7ef8: jeq r9, r1, +0x69 ; branch 0xe8248
0e7f00: mov64 r1, r10
0e7f08: add64 r1, -0x368
0e7f10: mov64 r2, r10
0e7f18: add64 r2, -0x1b0
0e7f20: mov64 r3, 0x1a0
0e7f28: call 0x632d ; call 0x119898
0e7f30: stxdw [r10 - 0x370], r8
0e7f38: stxdw [r10 - 0x378], r6
0e7f40: stxdw [r10 - 0x380], r9
0e7f48: ldxw r1, [r10 - 0x388]
0e7f50: stxw [r10 - 0x1a8], r1
0e7f58: ldxb r1, [r10 - 0x384]
0e7f60: stxb [r10 - 0x1a4], r1
0e7f68: ldxdw r1, [r10 - 0x8]
0e7f70: stxdw [r10 - 0x1b0], r1
0e7f78: ldxdw r1, [r10 - 0x10]
0e7f80: stxdw [r10 - 0x1b8], r1
0e7f88: mov64 r1, r10
0e7f90: add64 r1, -0x380
0e7f98: stxdw [r10 - 0x1c0], r1
0e7fa0: stxdw [r10 - 0x1c8], r7
0e7fa8: mov64 r1, r10
0e7fb0: add64 r1, -0x398
0e7fb8: mov64 r2, r10
0e7fc0: add64 r2, -0x1c8
0e7fc8: ldxdw r3, [r10 - 0x3c8]
0e7fd0: ldxdw r4, [r10 - 0x3d0]
0e7fd8: ldxdw r5, [r10 - 0x3d8]
0e7fe0: call -0x15b49 ; call 0x3a5a0
0e7fe8: ldxdw r6, [r10 - 0x398]
0e7ff0: jeq r6, 0x2, +0x1 ; branch 0xe8000
0e7ff8: ja +0x4d ; branch 0xe8268
0e8000: mov64 r1, r10
0e8008: add64 r1, -0x3a8
0e8010: mov64 r2, r10
0e8018: add64 r2, -0x380
0e8020: mov64 r3, r7
0e8028: call -0x6d98 ; call 0xb1370
0e8030: ldxdw r1, [r10 - 0x2e0]
0e8038: ldxdw r2, [r10 - 0x2e8]
0e8040: ldxdw r3, [r2 + 0x0]
0e8048: add64 r3, -0x1
0e8050: ldxdw r8, [r10 - 0x3a0]
0e8058: ldxdw r6, [r10 - 0x3a8]
0e8060: stxdw [r2 + 0x0], r3
0e8068: jne r3, 0x0, +0x3 ; branch 0xe8088
0e8070: ldxdw r3, [r2 + 0x8]
0e8078: add64 r3, -0x1
0e8080: stxdw [r2 + 0x8], r3
0e8088: ldxdw r2, [r1 + 0x0]
0e8090: add64 r2, -0x1
0e8098: stxdw [r1 + 0x0], r2
0e80a0: jne r2, 0x0, +0x3 ; branch 0xe80c0
0e80a8: ldxdw r2, [r1 + 0x8]
0e80b0: add64 r2, -0x1
0e80b8: stxdw [r1 + 0x8], r2
0e80c0: ldxdw r1, [r10 - 0x2b0]
0e80c8: ldxdw r2, [r10 - 0x2b8]
0e80d0: ldxdw r3, [r2 + 0x0]
0e80d8: add64 r3, -0x1
0e80e0: stxdw [r2 + 0x0], r3
0e80e8: jne r3, 0x0, +0x3 ; branch 0xe8108
0e80f0: ldxdw r3, [r2 + 0x8]
0e80f8: add64 r3, -0x1
0e8100: stxdw [r2 + 0x8], r3
0e8108: ldxdw r2, [r1 + 0x0]
0e8110: add64 r2, -0x1
0e8118: stxdw [r1 + 0x0], r2
0e8120: jne r2, 0x0, +0x3 ; branch 0xe8140
0e8128: ldxdw r2, [r1 + 0x8]
0e8130: add64 r2, -0x1
0e8138: stxdw [r1 + 0x8], r2
0e8140: ldxdw r1, [r10 - 0x280]
0e8148: ldxdw r2, [r10 - 0x288]
0e8150: ldxdw r3, [r2 + 0x0]
0e8158: add64 r3, -0x1
0e8160: stxdw [r2 + 0x0], r3
0e8168: jne r3, 0x0, +0x3 ; branch 0xe8188
0e8170: ldxdw r3, [r2 + 0x8]
0e8178: add64 r3, -0x1
0e8180: stxdw [r2 + 0x8], r3
0e8188: ldxdw r2, [r1 + 0x0]
0e8190: add64 r2, -0x1
0e8198: stxdw [r1 + 0x0], r2
0e81a0: jne r2, 0x0, +0x14 ; branch 0xe8248
0e81a8: ja +0x45 ; branch 0xe83d8
0e81b0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e81c0: call 0x4dc9 ; call 0x10f010
0e81c8: mov64 r1, r0
0e81d0: and64 r1, 0x3
0e81d8: mov64 r2, r1
0e81e0: add64 r2, -0x2
0e81e8: jlt r2, 0x2, +0x5 ; branch 0xe8218
0e81f0: jeq r1, 0x0, +0x4 ; branch 0xe8218
0e81f8: ldxdw r1, [r0 - 0x1]
0e8200: ldxdw r2, [r0 + 0x7]
0e8208: ldxdw r2, [r2 + 0x0]
0e8210: callx r2
0e8218: mov64 r1, r10
0e8220: add64 r1, -0x3b8
0e8228: mov64 r2, 0x66
0e8230: call 0x3b80 ; call 0x105e38
0e8238: ldxdw r8, [r10 - 0x3b0]
0e8240: ldxdw r6, [r10 - 0x3b8]
0e8248: ldxdw r1, [r10 - 0x3c0]
0e8250: stxdw [r1 + 0x8], r8
0e8258: stxdw [r1 + 0x0], r6
0e8260: exit
0e8268: ldxdw r8, [r10 - 0x390]
0e8270: ldxdw r1, [r10 - 0x2e0]
0e8278: ldxdw r2, [r10 - 0x2e8]
0e8280: ldxdw r3, [r2 + 0x0]
0e8288: add64 r3, -0x1
0e8290: stxdw [r2 + 0x0], r3
0e8298: jne r3, 0x0, +0x3 ; branch 0xe82b8
0e82a0: ldxdw r3, [r2 + 0x8]
0e82a8: add64 r3, -0x1
0e82b0: stxdw [r2 + 0x8], r3
0e82b8: ldxdw r2, [r1 + 0x0]
0e82c0: add64 r2, -0x1
0e82c8: stxdw [r1 + 0x0], r2
0e82d0: jne r2, 0x0, +0x3 ; branch 0xe82f0
0e82d8: ldxdw r2, [r1 + 0x8]
0e82e0: add64 r2, -0x1
0e82e8: stxdw [r1 + 0x8], r2
0e82f0: ldxdw r1, [r10 - 0x2b0]
0e82f8: ldxdw r2, [r10 - 0x2b8]
0e8300: ldxdw r3, [r2 + 0x0]
0e8308: add64 r3, -0x1
0e8310: stxdw [r2 + 0x0], r3
0e8318: jne r3, 0x0, +0x3 ; branch 0xe8338
0e8320: ldxdw r3, [r2 + 0x8]
0e8328: add64 r3, -0x1
0e8330: stxdw [r2 + 0x8], r3
0e8338: ldxdw r2, [r1 + 0x0]
0e8340: add64 r2, -0x1
0e8348: stxdw [r1 + 0x0], r2
0e8350: jne r2, 0x0, +0x3 ; branch 0xe8370
0e8358: ldxdw r2, [r1 + 0x8]
0e8360: add64 r2, -0x1
0e8368: stxdw [r1 + 0x8], r2
0e8370: ldxdw r1, [r10 - 0x280]
0e8378: ldxdw r2, [r10 - 0x288]
0e8380: ldxdw r3, [r2 + 0x0]
0e8388: add64 r3, -0x1
0e8390: stxdw [r2 + 0x0], r3
0e8398: jne r3, 0x0, +0x3 ; branch 0xe83b8
0e83a0: ldxdw r3, [r2 + 0x8]
0e83a8: add64 r3, -0x1
0e83b0: stxdw [r2 + 0x8], r3
0e83b8: ldxdw r2, [r1 + 0x0]
0e83c0: add64 r2, -0x1
0e83c8: stxdw [r1 + 0x0], r2
0e83d0: jne r2, 0x0, -0x32 ; branch 0xe8248
0e83d8: ldxdw r2, [r1 + 0x8]
0e83e0: add64 r2, -0x1
0e83e8: stxdw [r1 + 0x8], r2
0e83f0: ja -0x36 ; branch 0xe8248
0e83f8: stxb [r10 - 0x388], r1
0e8400: lddw r1, 0x122298 ; rodata b'\x00\x00\x00\x00\xa4\xc1\x11\x00\x1d\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc6\xc1\x11\x00h\x00\x00\x00\x00\x00\x00\x00Y\x02\x00\x000\x00\x00\x00\x00\x00\x00\x00.\xc2\x11\x00U\x00\x00\x00\x00\x00\x00\x00(\x0c\x00\x00\r\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00'
0e8410: stxdw [r10 - 0x1c8], r1
0e8418: mov64 r1, r10
0e8420: add64 r1, -0x10
0e8428: stxdw [r10 - 0x1b8], r1
0e8430: lddw r1, 0x119320
0e8440: stxdw [r10 - 0x8], r1
0e8448: mov64 r1, r10
0e8450: add64 r1, -0x388
0e8458: stxdw [r10 - 0x10], r1
0e8460: stdw [r10 - 0x1a8], 0x0
0e8468: stdw [r10 - 0x1c0], 0x1
0e8470: stdw [r10 - 0x1b0], 0x1
0e8478: mov64 r6, r10
0e8480: add64 r6, -0x380
0e8488: mov64 r2, r10
0e8490: add64 r2, -0x1c8
0e8498: mov64 r1, r6
0e84a0: call 0x51ea ; call 0x1113f8
0e84a8: mov64 r1, 0x15
0e84b0: mov64 r2, r6
0e84b8: call -0x1bff9 ; call 0x84f8
0e84c0: ja -0x60 ; branch 0xe81c8
