0b7df0: mov64 r9, r3
0b7df8: mov64 r6, r1
0b7e00: mov64 r1, r10
0b7e08: add64 r1, -0x120
0b7e10: mov64 r2, r9
0b7e18: call -0x16f73 ; call 0x288
0b7e20: ldxw r1, [r10 - 0x120]
0b7e28: jeq r1, 0x2, +0x16 ; branch 0xb7ee0
0b7e30: lddw r1, 0x300000000
0b7e40: ldxdw r1, [r1 + 0x0]
0b7e48: mov64 r3, r1
0b7e50: add64 r3, -0x80
0b7e58: mov64 r2, 0x0
0b7e60: mov64 r4, 0x1
0b7e68: jgt r3, r1, +0x1 ; branch 0xb7e78
0b7e70: mov64 r4, 0x0
0b7e78: jne r4, 0x0, +0x1 ; branch 0xb7e88
0b7e80: mov64 r2, r3
0b7e88: lddw r7, 0x300007f80
0b7e98: jeq r1, 0x0, +0x2 ; branch 0xb7eb0
0b7ea0: and64 r2, -0x8
0b7ea8: mov64 r7, r2
0b7eb0: lddw r1, 0x300000007
0b7ec0: jgt r7, r1, +0xe ; branch 0xb7f38
0b7ec8: mov64 r1, 0x8
0b7ed0: mov64 r2, 0x80
0b7ed8: call 0xb290 ; call 0x111360
0b7ee0: ldxdw r3, [r10 - 0x110]
0b7ee8: ldxdw r2, [r10 - 0x118]
0b7ef0: mov64 r1, r10
0b7ef8: add64 r1, -0x2d0
0b7f00: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
0b7f10: mov64 r5, 0x9
0b7f18: call -0x16c35 ; call 0x1d78
0b7f20: ldxdw r1, [r10 - 0x2d0]
0b7f28: ldxdw r2, [r10 - 0x2c8]
0b7f30: ja +0x147 ; branch 0xb8970
0b7f38: lddw r8, 0x300000000
0b7f48: stxdw [r8 + 0x0], r7
0b7f50: mov64 r2, r10
0b7f58: add64 r2, -0x120
0b7f60: mov64 r1, r7
0b7f68: mov64 r3, 0x80
0b7f70: call 0xc324 ; call 0x119898
0b7f78: mov64 r1, r10
0b7f80: add64 r1, -0x120
0b7f88: mov64 r2, r9
0b7f90: call -0x16fa2 ; call 0x288
0b7f98: ldxw r1, [r10 - 0x120]
0b7fa0: jeq r1, 0x2, +0x12 ; branch 0xb8038
0b7fa8: ldxdw r5, [r8 + 0x0]
0b7fb0: mov64 r3, r5
0b7fb8: add64 r3, -0x80
0b7fc0: mov64 r2, 0x0
0b7fc8: mov64 r4, 0x1
0b7fd0: jgt r3, r5, +0x1 ; branch 0xb7fe0
0b7fd8: mov64 r4, 0x0
0b7fe0: jne r4, 0x0, +0x1 ; branch 0xb7ff0
0b7fe8: mov64 r2, r3
0b7ff0: lddw r1, 0x300007f80
0b8000: jeq r5, 0x0, +0x2 ; branch 0xb8018
0b8008: and64 r2, -0x8
0b8010: mov64 r1, r2
0b8018: lddw r2, 0x300000007
0b8028: jgt r1, r2, +0xc ; branch 0xb8090
0b8030: ja -0x2e ; branch 0xb7ec8
0b8038: ldxdw r3, [r10 - 0x110]
0b8040: ldxdw r2, [r10 - 0x118]
0b8048: mov64 r1, r10
0b8050: add64 r1, -0x2c0
0b8058: lddw r4, 0x11e1d6 ; rodata b'quote_mintbase_mintauthoritybase_token_programcoin_creator_vault_atacoin_cr'
0b8068: mov64 r5, 0xa
0b8070: call -0x16c60 ; call 0x1d78
0b8078: ldxdw r1, [r10 - 0x2c0]
0b8080: ldxdw r2, [r10 - 0x2b8]
0b8088: ja +0x11c ; branch 0xb8970
0b8090: stxdw [r8 + 0x0], r1
0b8098: mov64 r2, r10
0b80a0: add64 r2, -0x120
0b80a8: stxdw [r10 - 0x2d8], r1
0b80b0: mov64 r3, 0x80
0b80b8: call 0xc2fb ; call 0x119898
0b80c0: mov64 r1, r10
0b80c8: add64 r1, -0x120
0b80d0: mov64 r2, r9
0b80d8: call -0x14fd0 ; call 0x10260
0b80e0: ldxb r1, [r10 - 0x2]
0b80e8: jeq r1, 0x2, +0x14 ; branch 0xb8190
0b80f0: ldxdw r5, [r8 + 0x0]
0b80f8: mov64 r3, r5
0b8100: add64 r3, -0x120
0b8108: mov64 r2, 0x0
0b8110: mov64 r4, 0x1
0b8118: jgt r3, r5, +0x1 ; branch 0xb8128
0b8120: mov64 r4, 0x0
0b8128: jne r4, 0x0, +0x1 ; branch 0xb8138
0b8130: mov64 r2, r3
0b8138: lddw r1, 0x300007ee0
0b8148: jeq r5, 0x0, +0x2 ; branch 0xb8160
0b8150: and64 r2, -0x8
0b8158: mov64 r1, r2
0b8160: lddw r2, 0x300000007
0b8170: jgt r1, r2, +0xe ; branch 0xb81e8
0b8178: mov64 r1, 0x8
0b8180: mov64 r2, 0x120
0b8188: call 0xb23a ; call 0x111360
0b8190: ldxdw r3, [r10 - 0x118]
0b8198: ldxdw r2, [r10 - 0x120]
0b81a0: mov64 r1, r10
0b81a8: add64 r1, -0x2b0
0b81b0: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b81c0: mov64 r5, 0x4
0b81c8: call -0x16c8b ; call 0x1d78
0b81d0: ldxdw r1, [r10 - 0x2b0]
0b81d8: ldxdw r2, [r10 - 0x2a8]
0b81e0: ja +0xf1 ; branch 0xb8970
0b81e8: stxdw [r8 + 0x0], r1
0b81f0: mov64 r2, r10
0b81f8: add64 r2, -0x120
0b8200: stxdw [r10 - 0x2e0], r1
0b8208: mov64 r3, 0x120
0b8210: call 0xc2d0 ; call 0x119898
0b8218: mov64 r1, r10
0b8220: add64 r1, -0x120
0b8228: mov64 r2, r9
0b8230: call -0x1700d ; call 0x1d0
0b8238: ldxw r1, [r10 - 0x70]
0b8240: jeq r1, 0x2, +0x14 ; branch 0xb82e8
0b8248: ldxdw r5, [r8 + 0x0]
0b8250: mov64 r3, r5
0b8258: add64 r3, -0xd8
0b8260: mov64 r2, 0x0
0b8268: mov64 r4, 0x1
0b8270: jgt r3, r5, +0x1 ; branch 0xb8280
0b8278: mov64 r4, 0x0
0b8280: jne r4, 0x0, +0x1 ; branch 0xb8290
0b8288: mov64 r2, r3
0b8290: lddw r1, 0x300007f28
0b82a0: jeq r5, 0x0, +0x2 ; branch 0xb82b8
0b82a8: and64 r2, -0x8
0b82b0: mov64 r1, r2
0b82b8: lddw r2, 0x300000007
0b82c8: jgt r1, r2, +0xe ; branch 0xb8340
0b82d0: mov64 r1, 0x8
0b82d8: mov64 r2, 0xd8
0b82e0: call 0xb20f ; call 0x111360
0b82e8: ldxdw r3, [r10 - 0x118]
0b82f0: ldxdw r2, [r10 - 0x120]
0b82f8: mov64 r1, r10
0b8300: add64 r1, -0x2a0
0b8308: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0b8318: mov64 r5, 0x17
0b8320: call -0x16cb6 ; call 0x1d78
0b8328: ldxdw r1, [r10 - 0x2a0]
0b8330: ldxdw r2, [r10 - 0x298]
0b8338: ja +0xc6 ; branch 0xb8970
0b8340: stxdw [r8 + 0x0], r1
0b8348: mov64 r2, r10
0b8350: add64 r2, -0x120
0b8358: stxdw [r10 - 0x2e8], r1
0b8360: mov64 r3, 0xd8
0b8368: call 0xc2a5 ; call 0x119898
0b8370: mov64 r1, r10
0b8378: add64 r1, -0x120
0b8380: mov64 r2, r9
0b8388: call -0x17038 ; call 0x1d0
0b8390: ldxw r1, [r10 - 0x70]
0b8398: jeq r1, 0x2, +0x12 ; branch 0xb8430
0b83a0: ldxdw r1, [r8 + 0x0]
0b83a8: mov64 r3, r1
0b83b0: add64 r3, -0xd8
0b83b8: mov64 r2, 0x0
0b83c0: mov64 r4, 0x1
0b83c8: jgt r3, r1, +0x1 ; branch 0xb83d8
0b83d0: mov64 r4, 0x0
0b83d8: jne r4, 0x0, +0x1 ; branch 0xb83e8
0b83e0: mov64 r2, r3
0b83e8: lddw r9, 0x300007f28
0b83f8: jeq r1, 0x0, +0x2 ; branch 0xb8410
0b8400: and64 r2, -0x8
0b8408: mov64 r9, r2
0b8410: lddw r1, 0x300000007
0b8420: jgt r9, r1, +0xc ; branch 0xb8488
0b8428: ja -0x2c ; branch 0xb82d0
0b8430: ldxdw r3, [r10 - 0x118]
0b8438: ldxdw r2, [r10 - 0x120]
0b8440: mov64 r1, r10
0b8448: add64 r1, -0x290
0b8450: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0b8460: mov64 r5, 0x18
0b8468: call -0x16cdf ; call 0x1d78
0b8470: ldxdw r1, [r10 - 0x290]
0b8478: ldxdw r2, [r10 - 0x288]
0b8480: ja +0x9d ; branch 0xb8970
0b8488: lddw r1, 0x300000000
0b8498: stxdw [r1 + 0x0], r9
0b84a0: mov64 r2, r10
0b84a8: add64 r2, -0x120
0b84b0: mov64 r1, r9
0b84b8: mov64 r3, 0xd8
0b84c0: call 0xc27a ; call 0x119898
0b84c8: ldxdw r8, [r10 - 0x2e0]
0b84d0: ldxdw r1, [r8 + 0x0]
0b84d8: ldxb r1, [r1 + 0x29]
0b84e0: jeq r1, 0x0, +0x83 ; branch 0xb8900
0b84e8: ldxdw r1, [r8 + 0x40]
0b84f0: stxdw [r10 - 0x148], r1
0b84f8: ldxdw r1, [r8 + 0x38]
0b8500: stxdw [r10 - 0x150], r1
0b8508: ldxdw r1, [r8 + 0x30]
0b8510: stxdw [r10 - 0x158], r1
0b8518: ldxdw r1, [r8 + 0x28]
0b8520: stxdw [r10 - 0x160], r1
0b8528: ldxdw r1, [r7 + 0x58]
0b8530: ldxdw r1, [r1 + 0x0]
0b8538: ldxdw r2, [r1 + 0x18]
0b8540: stxdw [r10 - 0x128], r2
0b8548: ldxdw r2, [r1 + 0x10]
0b8550: stxdw [r10 - 0x130], r2
0b8558: ldxdw r2, [r1 + 0x8]
0b8560: stxdw [r10 - 0x138], r2
0b8568: ldxdw r1, [r1 + 0x0]
0b8570: stxdw [r10 - 0x140], r1
0b8578: mov64 r1, r10
0b8580: add64 r1, -0x160
0b8588: mov64 r2, r10
0b8590: add64 r2, -0x140
0b8598: mov64 r3, 0x20
0b85a0: call 0xc267 ; call 0x1198e0
0b85a8: lsh64 r0, 0x20
0b85b0: rsh64 r0, 0x20
0b85b8: jne r0, 0x0, +0x42 ; branch 0xb87d0
0b85c0: ldxdw r1, [r8 + 0x60]
0b85c8: stxdw [r10 - 0x148], r1
0b85d0: ldxdw r1, [r8 + 0x58]
0b85d8: stxdw [r10 - 0x150], r1
0b85e0: ldxdw r1, [r8 + 0x50]
0b85e8: stxdw [r10 - 0x158], r1
0b85f0: ldxdw r1, [r8 + 0x48]
0b85f8: stxdw [r10 - 0x160], r1
0b8600: ldxdw r1, [r10 - 0x2d8]
0b8608: ldxdw r1, [r1 + 0x58]
0b8610: ldxdw r1, [r1 + 0x0]
0b8618: ldxdw r2, [r1 + 0x18]
0b8620: stxdw [r10 - 0x128], r2
0b8628: ldxdw r2, [r1 + 0x10]
0b8630: stxdw [r10 - 0x130], r2
0b8638: ldxdw r2, [r1 + 0x8]
0b8640: stxdw [r10 - 0x138], r2
0b8648: ldxdw r1, [r1 + 0x0]
0b8650: stxdw [r10 - 0x140], r1
0b8658: mov64 r1, r10
0b8660: add64 r1, -0x160
0b8668: mov64 r2, r10
0b8670: add64 r2, -0x140
0b8678: mov64 r3, 0x20
0b8680: call 0xc24b ; call 0x1198e0
0b8688: lsh64 r0, 0x20
0b8690: rsh64 r0, 0x20
0b8698: jeq r0, 0x0, +0x5e ; branch 0xb8990
0b86a0: mov64 r1, r10
0b86a8: add64 r1, -0x1a0
0b86b0: mov64 r2, 0x9
0b86b8: call -0x7ba3 ; call 0x7a9a8
0b86c0: ldxdw r3, [r10 - 0x198]
0b86c8: ldxdw r2, [r10 - 0x1a0]
0b86d0: mov64 r1, r10
0b86d8: add64 r1, -0x1b0
0b86e0: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b86f0: mov64 r5, 0x4
0b86f8: call -0x16d31 ; call 0x1d78
0b8700: ldxdw r3, [r10 - 0x1a8]
0b8708: ldxdw r2, [r10 - 0x1b0]
0b8710: ldxdw r1, [r10 - 0x148]
0b8718: stxdw [r10 - 0x108], r1
0b8720: ldxdw r1, [r10 - 0x150]
0b8728: stxdw [r10 - 0x110], r1
0b8730: ldxdw r1, [r10 - 0x158]
0b8738: stxdw [r10 - 0x118], r1
0b8740: ldxdw r1, [r10 - 0x160]
0b8748: stxdw [r10 - 0x120], r1
0b8750: ldxdw r1, [r10 - 0x140]
0b8758: stxdw [r10 - 0x100], r1
0b8760: ldxdw r1, [r10 - 0x138]
0b8768: stxdw [r10 - 0xf8], r1
0b8770: ldxdw r1, [r10 - 0x130]
0b8778: stxdw [r10 - 0xf0], r1
0b8780: ldxdw r1, [r10 - 0x128]
0b8788: stxdw [r10 - 0xe8], r1
0b8790: mov64 r1, r10
0b8798: add64 r1, -0x1c0
0b87a0: mov64 r4, r10
0b87a8: add64 r4, -0x120
0b87b0: call 0x9543 ; call 0x1031d0
0b87b8: ldxdw r1, [r10 - 0x1c0]
0b87c0: ldxdw r2, [r10 - 0x1b8]
0b87c8: ja +0x34 ; branch 0xb8970
0b87d0: mov64 r1, r10
0b87d8: add64 r1, -0x170
0b87e0: mov64 r2, 0x8
0b87e8: call -0x7bc9 ; call 0x7a9a8
0b87f0: ldxdw r3, [r10 - 0x168]
0b87f8: ldxdw r2, [r10 - 0x170]
0b8800: mov64 r1, r10
0b8808: add64 r1, -0x180
0b8810: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b8820: mov64 r5, 0x4
0b8828: call -0x16d57 ; call 0x1d78
0b8830: ldxdw r3, [r10 - 0x178]
0b8838: ldxdw r2, [r10 - 0x180]
0b8840: ldxdw r1, [r10 - 0x148]
0b8848: stxdw [r10 - 0x108], r1
0b8850: ldxdw r1, [r10 - 0x150]
0b8858: stxdw [r10 - 0x110], r1
0b8860: ldxdw r1, [r10 - 0x158]
0b8868: stxdw [r10 - 0x118], r1
0b8870: ldxdw r1, [r10 - 0x160]
0b8878: stxdw [r10 - 0x120], r1
0b8880: ldxdw r1, [r10 - 0x140]
0b8888: stxdw [r10 - 0x100], r1
0b8890: ldxdw r1, [r10 - 0x138]
0b8898: stxdw [r10 - 0xf8], r1
0b88a0: ldxdw r1, [r10 - 0x130]
0b88a8: stxdw [r10 - 0xf0], r1
0b88b0: ldxdw r1, [r10 - 0x128]
0b88b8: stxdw [r10 - 0xe8], r1
0b88c0: mov64 r1, r10
0b88c8: add64 r1, -0x190
0b88d0: mov64 r4, r10
0b88d8: add64 r4, -0x120
0b88e0: call 0x951d ; call 0x1031d0
0b88e8: ldxdw r1, [r10 - 0x190]
0b88f0: ldxdw r2, [r10 - 0x188]
0b88f8: ja +0xe ; branch 0xb8970
0b8900: mov64 r1, r10
0b8908: add64 r1, -0x270
0b8910: mov64 r2, 0x7d0
0b8918: call 0x9aa3 ; call 0x105e38
0b8920: ldxdw r3, [r10 - 0x268]
0b8928: ldxdw r2, [r10 - 0x270]
0b8930: mov64 r1, r10
0b8938: add64 r1, -0x280
0b8940: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b8950: mov64 r5, 0x4
0b8958: call -0x16d7d ; call 0x1d78
0b8960: ldxdw r1, [r10 - 0x280]
0b8968: ldxdw r2, [r10 - 0x278]
0b8970: stxdw [r6 + 0x10], r2
0b8978: stxdw [r6 + 0x8], r1
0b8980: stdw [r6 + 0x0], 0x0
0b8988: exit
0b8990: ldxdw r1, [r8 + 0xa0]
0b8998: stxdw [r10 - 0x148], r1
0b89a0: ldxdw r1, [r8 + 0x98]
0b89a8: stxdw [r10 - 0x150], r1
0b89b0: ldxdw r1, [r8 + 0x90]
0b89b8: stxdw [r10 - 0x158], r1
0b89c0: ldxdw r1, [r8 + 0x88]
0b89c8: stxdw [r10 - 0x160], r1
0b89d0: ldxdw r1, [r10 - 0x2e8]
0b89d8: ldxdw r1, [r1 + 0x20]
0b89e0: stxdw [r10 - 0x2f0], r1
0b89e8: ldxdw r1, [r1 + 0x0]
0b89f0: ldxdw r2, [r1 + 0x18]
0b89f8: stxdw [r10 - 0x128], r2
0b8a00: ldxdw r2, [r1 + 0x10]
0b8a08: stxdw [r10 - 0x130], r2
0b8a10: ldxdw r2, [r1 + 0x8]
0b8a18: stxdw [r10 - 0x138], r2
0b8a20: ldxdw r1, [r1 + 0x0]
0b8a28: stxdw [r10 - 0x140], r1
0b8a30: mov64 r1, r10
0b8a38: add64 r1, -0x160
0b8a40: mov64 r2, r10
0b8a48: add64 r2, -0x140
0b8a50: mov64 r3, 0x20
0b8a58: call 0xc1d0 ; call 0x1198e0
0b8a60: lsh64 r0, 0x20
0b8a68: rsh64 r0, 0x20
0b8a70: jeq r0, 0x0, +0x26 ; branch 0xb8ba8
0b8a78: mov64 r1, r10
0b8a80: add64 r1, -0x1d0
0b8a88: mov64 r2, 0xe
0b8a90: call -0x7c1e ; call 0x7a9a8
0b8a98: ldxdw r3, [r10 - 0x1c8]
0b8aa0: ldxdw r2, [r10 - 0x1d0]
0b8aa8: mov64 r1, r10
0b8ab0: add64 r1, -0x1e0
0b8ab8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b8ac8: mov64 r5, 0x4
0b8ad0: call -0x16dac ; call 0x1d78
0b8ad8: ldxdw r3, [r10 - 0x1d8]
0b8ae0: ldxdw r2, [r10 - 0x1e0]
0b8ae8: ldxdw r1, [r10 - 0x148]
0b8af0: stxdw [r10 - 0x108], r1
0b8af8: ldxdw r1, [r10 - 0x150]
0b8b00: stxdw [r10 - 0x110], r1
0b8b08: ldxdw r1, [r10 - 0x158]
0b8b10: stxdw [r10 - 0x118], r1
0b8b18: ldxdw r1, [r10 - 0x160]
0b8b20: stxdw [r10 - 0x120], r1
0b8b28: ldxdw r1, [r10 - 0x140]
0b8b30: stxdw [r10 - 0x100], r1
0b8b38: ldxdw r1, [r10 - 0x138]
0b8b40: stxdw [r10 - 0xf8], r1
0b8b48: ldxdw r1, [r10 - 0x130]
0b8b50: stxdw [r10 - 0xf0], r1
0b8b58: ldxdw r1, [r10 - 0x128]
0b8b60: stxdw [r10 - 0xe8], r1
0b8b68: mov64 r1, r10
0b8b70: add64 r1, -0x1f0
0b8b78: mov64 r4, r10
0b8b80: add64 r4, -0x120
0b8b88: call 0x94c8 ; call 0x1031d0
0b8b90: ldxdw r1, [r10 - 0x1f0]
0b8b98: ldxdw r2, [r10 - 0x1e8]
0b8ba0: ja -0x47 ; branch 0xb8970
0b8ba8: ldxdw r1, [r10 - 0x2f0]
0b8bb0: ldxdw r1, [r8 + 0xc0]
0b8bb8: stxdw [r10 - 0x148], r1
0b8bc0: ldxdw r1, [r8 + 0xb8]
0b8bc8: stxdw [r10 - 0x150], r1
0b8bd0: ldxdw r1, [r8 + 0xb0]
0b8bd8: stxdw [r10 - 0x158], r1
0b8be0: ldxdw r1, [r8 + 0xa8]
0b8be8: stxdw [r10 - 0x160], r1
0b8bf0: ldxdw r8, [r9 + 0x20]
0b8bf8: ldxdw r1, [r8 + 0x0]
0b8c00: ldxdw r2, [r1 + 0x18]
0b8c08: stxdw [r10 - 0x128], r2
0b8c10: ldxdw r2, [r1 + 0x10]
0b8c18: stxdw [r10 - 0x130], r2
0b8c20: ldxdw r2, [r1 + 0x8]
0b8c28: stxdw [r10 - 0x138], r2
0b8c30: ldxdw r1, [r1 + 0x0]
0b8c38: stxdw [r10 - 0x140], r1
0b8c40: mov64 r1, r10
0b8c48: add64 r1, -0x160
0b8c50: mov64 r2, r10
0b8c58: add64 r2, -0x140
0b8c60: mov64 r3, 0x20
0b8c68: call 0xc18e ; call 0x1198e0
0b8c70: lsh64 r0, 0x20
0b8c78: rsh64 r0, 0x20
0b8c80: jeq r0, 0x0, +0x26 ; branch 0xb8db8
0b8c88: mov64 r1, r10
0b8c90: add64 r1, -0x200
0b8c98: mov64 r2, 0xf
0b8ca0: call -0x7c60 ; call 0x7a9a8
0b8ca8: ldxdw r3, [r10 - 0x1f8]
0b8cb0: ldxdw r2, [r10 - 0x200]
0b8cb8: mov64 r1, r10
0b8cc0: add64 r1, -0x210
0b8cc8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b8cd8: mov64 r5, 0x4
0b8ce0: call -0x16dee ; call 0x1d78
0b8ce8: ldxdw r3, [r10 - 0x208]
0b8cf0: ldxdw r2, [r10 - 0x210]
0b8cf8: ldxdw r1, [r10 - 0x148]
0b8d00: stxdw [r10 - 0x108], r1
0b8d08: ldxdw r1, [r10 - 0x150]
0b8d10: stxdw [r10 - 0x110], r1
0b8d18: ldxdw r1, [r10 - 0x158]
0b8d20: stxdw [r10 - 0x118], r1
0b8d28: ldxdw r1, [r10 - 0x160]
0b8d30: stxdw [r10 - 0x120], r1
0b8d38: ldxdw r1, [r10 - 0x140]
0b8d40: stxdw [r10 - 0x100], r1
0b8d48: ldxdw r1, [r10 - 0x138]
0b8d50: stxdw [r10 - 0xf8], r1
0b8d58: ldxdw r1, [r10 - 0x130]
0b8d60: stxdw [r10 - 0xf0], r1
0b8d68: ldxdw r1, [r10 - 0x128]
0b8d70: stxdw [r10 - 0xe8], r1
0b8d78: mov64 r1, r10
0b8d80: add64 r1, -0x220
0b8d88: mov64 r4, r10
0b8d90: add64 r4, -0x120
0b8d98: call 0x9486 ; call 0x1031d0
0b8da0: ldxdw r1, [r10 - 0x220]
0b8da8: ldxdw r2, [r10 - 0x218]
0b8db0: ja -0x89 ; branch 0xb8970
0b8db8: ldxdw r1, [r10 - 0x2f0]
0b8dc0: ldxb r1, [r1 + 0x29]
0b8dc8: jeq r1, 0x0, +0x1a ; branch 0xb8ea0
0b8dd0: ldxb r1, [r8 + 0x29]
0b8dd8: jne r1, 0x0, +0xf ; branch 0xb8e58
0b8de0: mov64 r1, r10
0b8de8: add64 r1, -0x230
0b8df0: mov64 r2, 0x7d0
0b8df8: call 0x9a07 ; call 0x105e38
0b8e00: ldxdw r3, [r10 - 0x228]
0b8e08: ldxdw r2, [r10 - 0x230]
0b8e10: mov64 r1, r10
0b8e18: add64 r1, -0x240
0b8e20: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0b8e30: mov64 r5, 0x18
0b8e38: call -0x16e19 ; call 0x1d78
0b8e40: ldxdw r1, [r10 - 0x240]
0b8e48: ldxdw r2, [r10 - 0x238]
0b8e50: ja -0x9d ; branch 0xb8970
0b8e58: stxdw [r6 + 0x20], r9
0b8e60: ldxdw r1, [r10 - 0x2e8]
0b8e68: stxdw [r6 + 0x18], r1
0b8e70: ldxdw r1, [r10 - 0x2e0]
0b8e78: stxdw [r6 + 0x10], r1
0b8e80: ldxdw r1, [r10 - 0x2d8]
0b8e88: stxdw [r6 + 0x8], r1
0b8e90: stxdw [r6 + 0x0], r7
0b8e98: ja -0xa3 ; branch 0xb8988
0b8ea0: mov64 r1, r10
0b8ea8: add64 r1, -0x250
0b8eb0: mov64 r2, 0x7d0
0b8eb8: call 0x99ef ; call 0x105e38
0b8ec0: ldxdw r3, [r10 - 0x248]
0b8ec8: ldxdw r2, [r10 - 0x250]
0b8ed0: mov64 r1, r10
0b8ed8: add64 r1, -0x260
0b8ee0: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0b8ef0: mov64 r5, 0x17
0b8ef8: call -0x16e31 ; call 0x1d78
0b8f00: ldxdw r1, [r10 - 0x260]
0b8f08: ldxdw r2, [r10 - 0x258]
0b8f10: ja -0xb5 ; branch 0xb8970
