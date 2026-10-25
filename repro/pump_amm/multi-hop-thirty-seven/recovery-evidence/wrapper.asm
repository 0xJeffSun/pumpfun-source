0e9760: mov64 r7, r5
0e9768: mov64 r9, r4
0e9770: mov64 r8, r3
0e9778: mov64 r6, r2
0e9780: stxdw [r10 - 0x1a0], r1
0e9788: lddw r1, 0x11e97c ; rodata b'Instruction: MultiHopSwapInstruction: SweepProtocolFeeInstruction: SweepCre'
0e9798: mov64 r2, 0x19
0e97a0: call -0x1
0e97a8: ldxdw r1, [r7 - 0xff8]
0e97b0: jlt r1, 0x8, +0x52 ; branch 0xe9a48
0e97b8: and64 r1, -0x8
0e97c0: jeq r1, 0x8, +0x50 ; branch 0xe9a48
0e97c8: ldxdw r1, [r7 - 0x1000]
0e97d0: ldxdw r2, [r1 + 0x0]
0e97d8: stxdw [r10 - 0x1a8], r2
0e97e0: ldxdw r1, [r1 + 0x8]
0e97e8: stxdw [r10 - 0x1b0], r1
0e97f0: stb [r10 - 0x161], 0xff
0e97f8: sth [r10 - 0x163], 0xffff
0e9800: stxdw [r10 - 0x158], r9
0e9808: stxdw [r10 - 0x160], r8
0e9810: mov64 r1, r10
0e9818: add64 r1, -0x163
0e9820: stxdw [r10 - 0xff8], r1
0e9828: mov64 r1, r10
0e9830: add64 r1, -0xa8
0e9838: mov64 r3, r10
0e9840: add64 r3, -0x160
0e9848: mov64 r5, r10
0e9850: mov64 r2, r6
0e9858: call -0x6c3f ; call 0xb3668
0e9860: ldxdw r8, [r10 - 0xa0]
0e9868: ldxdw r7, [r10 - 0xa8]
0e9870: ldxb r9, [r10 - 0x6]
0e9878: jeq r9, 0x2, +0x4c ; branch 0xe9ae0
0e9880: mov64 r1, r10
0e9888: add64 r1, -0x140
0e9890: mov64 r2, r10
0e9898: add64 r2, -0x98
0e98a0: mov64 r3, 0x92
0e98a8: call 0x5ffd ; call 0x119898
0e98b0: ldxw r1, [r10 - 0x5]
0e98b8: stxw [r10 - 0xad], r1
0e98c0: ldxb r1, [r10 - 0x1]
0e98c8: stxb [r10 - 0xa9], r1
0e98d0: stxb [r10 - 0xae], r9
0e98d8: stxdw [r10 - 0x148], r8
0e98e0: stxdw [r10 - 0x150], r7
0e98e8: ldxh r1, [r10 - 0x163]
0e98f0: stxh [r10 - 0x88], r1
0e98f8: ldxb r1, [r10 - 0x161]
0e9900: stxb [r10 - 0x86], r1
0e9908: ldxdw r1, [r10 - 0x158]
0e9910: stxdw [r10 - 0x90], r1
0e9918: ldxdw r1, [r10 - 0x160]
0e9920: stxdw [r10 - 0x98], r1
0e9928: mov64 r1, r10
0e9930: add64 r1, -0x150
0e9938: stxdw [r10 - 0xa0], r1
0e9940: stxdw [r10 - 0xa8], r6
0e9948: mov64 r1, r10
0e9950: add64 r1, -0x178
0e9958: mov64 r2, r10
0e9960: add64 r2, -0xa8
0e9968: ldxdw r3, [r10 - 0x1a8]
0e9970: ldxdw r4, [r10 - 0x1b0]
0e9978: call -0x157b8 ; call 0x3dbc0
0e9980: ldxdw r7, [r10 - 0x178]
0e9988: jeq r7, 0x2, +0x1 ; branch 0xe9998
0e9990: ja +0x2d ; branch 0xe9b00
0e9998: mov64 r1, r10
0e99a0: add64 r1, -0x188
0e99a8: mov64 r2, r10
0e99b0: add64 r2, -0x150
0e99b8: mov64 r3, r6
0e99c0: call -0x63ef ; call 0xb7a50
0e99c8: ldxdw r1, [r10 - 0xc8]
0e99d0: ldxdw r2, [r10 - 0xd0]
0e99d8: ldxdw r3, [r2 + 0x0]
0e99e0: add64 r3, -0x1
0e99e8: ldxdw r8, [r10 - 0x180]
0e99f0: ldxdw r7, [r10 - 0x188]
0e99f8: stxdw [r2 + 0x0], r3
0e9a00: jne r3, 0x0, +0x3 ; branch 0xe9a20
0e9a08: ldxdw r3, [r2 + 0x8]
0e9a10: add64 r3, -0x1
0e9a18: stxdw [r2 + 0x8], r3
0e9a20: ldxdw r2, [r1 + 0x0]
0e9a28: add64 r2, -0x1
0e9a30: stxdw [r1 + 0x0], r2
0e9a38: jne r2, 0x0, +0x14 ; branch 0xe9ae0
0e9a40: ja +0x25 ; branch 0xe9b70
0e9a48: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e9a58: call 0x4ab6 ; call 0x10f010
0e9a60: mov64 r1, r0
0e9a68: and64 r1, 0x3
0e9a70: mov64 r2, r1
0e9a78: add64 r2, -0x2
0e9a80: jlt r2, 0x2, +0x5 ; branch 0xe9ab0
0e9a88: jeq r1, 0x0, +0x4 ; branch 0xe9ab0
0e9a90: ldxdw r1, [r0 - 0x1]
0e9a98: ldxdw r2, [r0 + 0x7]
0e9aa0: ldxdw r2, [r2 + 0x0]
0e9aa8: callx r2
0e9ab0: mov64 r1, r10
0e9ab8: add64 r1, -0x198
0e9ac0: mov64 r2, 0x66
0e9ac8: call 0x386d ; call 0x105e38
0e9ad0: ldxdw r8, [r10 - 0x190]
0e9ad8: ldxdw r7, [r10 - 0x198]
0e9ae0: ldxdw r1, [r10 - 0x1a0]
0e9ae8: stxdw [r1 + 0x8], r8
0e9af0: stxdw [r1 + 0x0], r7
0e9af8: exit
0e9b00: ldxdw r8, [r10 - 0x170]
0e9b08: ldxdw r1, [r10 - 0xc8]
0e9b10: ldxdw r2, [r10 - 0xd0]
0e9b18: ldxdw r3, [r2 + 0x0]
0e9b20: add64 r3, -0x1
0e9b28: stxdw [r2 + 0x0], r3
0e9b30: jne r3, 0x0, +0x3 ; branch 0xe9b50
0e9b38: ldxdw r3, [r2 + 0x8]
0e9b40: add64 r3, -0x1
0e9b48: stxdw [r2 + 0x8], r3
0e9b50: ldxdw r2, [r1 + 0x0]
0e9b58: add64 r2, -0x1
0e9b60: stxdw [r1 + 0x0], r2
0e9b68: jne r2, 0x0, -0x12 ; branch 0xe9ae0
0e9b70: ldxdw r2, [r1 + 0x8]
0e9b78: add64 r2, -0x1
0e9b80: stxdw [r1 + 0x8], r2
0e9b88: ja -0x16 ; branch 0xe9ae0
