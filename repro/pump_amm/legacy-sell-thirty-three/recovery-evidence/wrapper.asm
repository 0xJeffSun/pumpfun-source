0e84c8: mov64 r6, r5
0e84d0: mov64 r9, r4
0e84d8: mov64 r8, r3
0e84e0: mov64 r7, r2
0e84e8: stxdw [r10 - 0x3a0], r1
0e84f0: lddw r1, 0x11e928 ; rodata b'Instruction: SellInstruction: BuyV2Instruction: BuyExactQuoteInV2Instructio'
0e8500: mov64 r2, 0x11
0e8508: call -0x1
0e8510: ldxdw r1, [r6 - 0xff8]
0e8518: jlt r1, 0x8, +0x70 ; branch 0xe88a0
0e8520: and64 r1, -0x8
0e8528: jeq r1, 0x8, +0x6e ; branch 0xe88a0
0e8530: ldxdw r1, [r6 - 0x1000]
0e8538: ldxdw r2, [r1 + 0x0]
0e8540: stxdw [r10 - 0x3a8], r2
0e8548: ldxdw r1, [r1 + 0x8]
0e8550: stxdw [r10 - 0x3b0], r1
0e8558: stb [r10 - 0x361], 0xff
0e8560: sth [r10 - 0x363], 0xffff
0e8568: stxdw [r10 - 0x358], r9
0e8570: stxdw [r10 - 0x360], r8
0e8578: mov64 r1, r10
0e8580: add64 r1, -0x363
0e8588: stxdw [r10 - 0xff8], r1
0e8590: mov64 r1, r10
0e8598: add64 r1, -0x1a8
0e85a0: mov64 r3, r10
0e85a8: add64 r3, -0x360
0e85b0: mov64 r5, r10
0e85b8: mov64 r2, r7
0e85c0: call -0x5167 ; call 0xbfa90
0e85c8: ldxdw r8, [r10 - 0x198]
0e85d0: ldxdw r6, [r10 - 0x1a0]
0e85d8: ldxdw r9, [r10 - 0x1a8]
0e85e0: lddw r1, -0x8000000000000000
0e85f0: jeq r9, r1, +0x68 ; branch 0xe8938
0e85f8: mov64 r1, r10
0e8600: add64 r1, -0x338
0e8608: mov64 r2, r10
0e8610: add64 r2, -0x190
0e8618: mov64 r3, 0x190
0e8620: call 0x624e ; call 0x119898
0e8628: stxdw [r10 - 0x340], r8
0e8630: stxdw [r10 - 0x348], r6
0e8638: stxdw [r10 - 0x350], r9
0e8640: ldxh r1, [r10 - 0x363]
0e8648: stxh [r10 - 0x188], r1
0e8650: ldxb r1, [r10 - 0x361]
0e8658: stxb [r10 - 0x186], r1
0e8660: ldxdw r1, [r10 - 0x358]
0e8668: stxdw [r10 - 0x190], r1
0e8670: ldxdw r1, [r10 - 0x360]
0e8678: stxdw [r10 - 0x198], r1
0e8680: mov64 r1, r10
0e8688: add64 r1, -0x350
0e8690: stxdw [r10 - 0x1a0], r1
0e8698: stxdw [r10 - 0x1a8], r7
0e86a0: mov64 r1, r10
0e86a8: add64 r1, -0x378
0e86b0: mov64 r2, r10
0e86b8: add64 r2, -0x1a8
0e86c0: ldxdw r3, [r10 - 0x3a8]
0e86c8: ldxdw r4, [r10 - 0x3b0]
0e86d0: call -0x13d71 ; call 0x49b50
0e86d8: ldxdw r6, [r10 - 0x378]
0e86e0: jeq r6, 0x2, +0x1 ; branch 0xe86f0
0e86e8: ja +0x4d ; branch 0xe8958
0e86f0: mov64 r1, r10
0e86f8: add64 r1, -0x388
0e8700: mov64 r2, r10
0e8708: add64 r2, -0x350
0e8710: mov64 r3, r7
0e8718: call -0x454f ; call 0xc5ca8
0e8720: ldxdw r1, [r10 - 0x2b0]
0e8728: ldxdw r2, [r10 - 0x2b8]
0e8730: ldxdw r3, [r2 + 0x0]
0e8738: add64 r3, -0x1
0e8740: ldxdw r8, [r10 - 0x380]
0e8748: ldxdw r6, [r10 - 0x388]
0e8750: stxdw [r2 + 0x0], r3
0e8758: jne r3, 0x0, +0x3 ; branch 0xe8778
0e8760: ldxdw r3, [r2 + 0x8]
0e8768: add64 r3, -0x1
0e8770: stxdw [r2 + 0x8], r3
0e8778: ldxdw r2, [r1 + 0x0]
0e8780: add64 r2, -0x1
0e8788: stxdw [r1 + 0x0], r2
0e8790: jne r2, 0x0, +0x3 ; branch 0xe87b0
0e8798: ldxdw r2, [r1 + 0x8]
0e87a0: add64 r2, -0x1
0e87a8: stxdw [r1 + 0x8], r2
0e87b0: ldxdw r1, [r10 - 0x280]
0e87b8: ldxdw r2, [r10 - 0x288]
0e87c0: ldxdw r3, [r2 + 0x0]
0e87c8: add64 r3, -0x1
0e87d0: stxdw [r2 + 0x0], r3
0e87d8: jne r3, 0x0, +0x3 ; branch 0xe87f8
0e87e0: ldxdw r3, [r2 + 0x8]
0e87e8: add64 r3, -0x1
0e87f0: stxdw [r2 + 0x8], r3
0e87f8: ldxdw r2, [r1 + 0x0]
0e8800: add64 r2, -0x1
0e8808: stxdw [r1 + 0x0], r2
0e8810: jne r2, 0x0, +0x3 ; branch 0xe8830
0e8818: ldxdw r2, [r1 + 0x8]
0e8820: add64 r2, -0x1
0e8828: stxdw [r1 + 0x8], r2
0e8830: ldxdw r1, [r10 - 0x250]
0e8838: ldxdw r2, [r10 - 0x258]
0e8840: ldxdw r3, [r2 + 0x0]
0e8848: add64 r3, -0x1
0e8850: stxdw [r2 + 0x0], r3
0e8858: jne r3, 0x0, +0x3 ; branch 0xe8878
0e8860: ldxdw r3, [r2 + 0x8]
0e8868: add64 r3, -0x1
0e8870: stxdw [r2 + 0x8], r3
0e8878: ldxdw r2, [r1 + 0x0]
0e8880: add64 r2, -0x1
0e8888: stxdw [r1 + 0x0], r2
0e8890: jne r2, 0x0, +0x14 ; branch 0xe8938
0e8898: ja +0x45 ; branch 0xe8ac8
0e88a0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e88b0: call 0x4ceb ; call 0x10f010
0e88b8: mov64 r1, r0
0e88c0: and64 r1, 0x3
0e88c8: mov64 r2, r1
0e88d0: add64 r2, -0x2
0e88d8: jlt r2, 0x2, +0x5 ; branch 0xe8908
0e88e0: jeq r1, 0x0, +0x4 ; branch 0xe8908
0e88e8: ldxdw r1, [r0 - 0x1]
0e88f0: ldxdw r2, [r0 + 0x7]
0e88f8: ldxdw r2, [r2 + 0x0]
0e8900: callx r2
0e8908: mov64 r1, r10
0e8910: add64 r1, -0x398
0e8918: mov64 r2, 0x66
0e8920: call 0x3aa2 ; call 0x105e38
0e8928: ldxdw r8, [r10 - 0x390]
0e8930: ldxdw r6, [r10 - 0x398]
0e8938: ldxdw r1, [r10 - 0x3a0]
0e8940: stxdw [r1 + 0x8], r8
0e8948: stxdw [r1 + 0x0], r6
0e8950: exit
0e8958: ldxdw r8, [r10 - 0x370]
0e8960: ldxdw r1, [r10 - 0x2b0]
0e8968: ldxdw r2, [r10 - 0x2b8]
0e8970: ldxdw r3, [r2 + 0x0]
0e8978: add64 r3, -0x1
0e8980: stxdw [r2 + 0x0], r3
0e8988: jne r3, 0x0, +0x3 ; branch 0xe89a8
0e8990: ldxdw r3, [r2 + 0x8]
0e8998: add64 r3, -0x1
0e89a0: stxdw [r2 + 0x8], r3
0e89a8: ldxdw r2, [r1 + 0x0]
0e89b0: add64 r2, -0x1
0e89b8: stxdw [r1 + 0x0], r2
0e89c0: jne r2, 0x0, +0x3 ; branch 0xe89e0
0e89c8: ldxdw r2, [r1 + 0x8]
0e89d0: add64 r2, -0x1
0e89d8: stxdw [r1 + 0x8], r2
0e89e0: ldxdw r1, [r10 - 0x280]
0e89e8: ldxdw r2, [r10 - 0x288]
0e89f0: ldxdw r3, [r2 + 0x0]
0e89f8: add64 r3, -0x1
0e8a00: stxdw [r2 + 0x0], r3
0e8a08: jne r3, 0x0, +0x3 ; branch 0xe8a28
0e8a10: ldxdw r3, [r2 + 0x8]
0e8a18: add64 r3, -0x1
0e8a20: stxdw [r2 + 0x8], r3
0e8a28: ldxdw r2, [r1 + 0x0]
0e8a30: add64 r2, -0x1
0e8a38: stxdw [r1 + 0x0], r2
0e8a40: jne r2, 0x0, +0x3 ; branch 0xe8a60
0e8a48: ldxdw r2, [r1 + 0x8]
0e8a50: add64 r2, -0x1
0e8a58: stxdw [r1 + 0x8], r2
0e8a60: ldxdw r1, [r10 - 0x250]
0e8a68: ldxdw r2, [r10 - 0x258]
0e8a70: ldxdw r3, [r2 + 0x0]
0e8a78: add64 r3, -0x1
0e8a80: stxdw [r2 + 0x0], r3
0e8a88: jne r3, 0x0, +0x3 ; branch 0xe8aa8
0e8a90: ldxdw r3, [r2 + 0x8]
0e8a98: add64 r3, -0x1
0e8aa0: stxdw [r2 + 0x8], r3
0e8aa8: ldxdw r2, [r1 + 0x0]
0e8ab0: add64 r2, -0x1
0e8ab8: stxdw [r1 + 0x0], r2
0e8ac0: jne r2, 0x0, -0x32 ; branch 0xe8938
0e8ac8: ldxdw r2, [r1 + 0x8]
0e8ad0: add64 r2, -0x1
0e8ad8: stxdw [r1 + 0x8], r2
0e8ae0: ja -0x36 ; branch 0xe8938
