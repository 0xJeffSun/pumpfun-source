0e8ae8: mov64 r7, r5
0e8af0: mov64 r9, r4
0e8af8: mov64 r8, r3
0e8b00: mov64 r6, r2
0e8b08: stxdw [r10 - 0x1b0], r1
0e8b10: lddw r1, 0x11e939 ; rodata b'Instruction: BuyV2Instruction: BuyExactQuoteInV2Instruction: SellV2Instruct'
0e8b20: mov64 r2, 0x12
0e8b28: call -0x1
0e8b30: ldxdw r1, [r7 - 0xff8]
0e8b38: jlt r1, 0x8, +0x51 ; branch 0xe8dc8
0e8b40: and64 r1, -0x8
0e8b48: jeq r1, 0x8, +0x4f ; branch 0xe8dc8
0e8b50: ldxdw r1, [r7 - 0x1000]
0e8b58: ldxdw r2, [r1 + 0x0]
0e8b60: stxdw [r10 - 0x1b8], r2
0e8b68: ldxdw r1, [r1 + 0x8]
0e8b70: stxdw [r10 - 0x1c0], r1
0e8b78: sth [r10 - 0x172], 0xffff
0e8b80: stxdw [r10 - 0x168], r9
0e8b88: stxdw [r10 - 0x170], r8
0e8b90: mov64 r1, r10
0e8b98: add64 r1, -0x172
0e8ba0: stxdw [r10 - 0xff8], r1
0e8ba8: mov64 r1, r10
0e8bb0: add64 r1, -0xb0
0e8bb8: mov64 r3, r10
0e8bc0: add64 r3, -0x170
0e8bc8: mov64 r5, r10
0e8bd0: mov64 r2, r6
0e8bd8: call -0x5c98 ; call 0xba720
0e8be0: ldxdw r8, [r10 - 0xa8]
0e8be8: ldxdw r7, [r10 - 0xb0]
0e8bf0: ldxb r9, [r10 - 0x6]
0e8bf8: jeq r9, 0x2, +0x4c ; branch 0xe8e60
0e8c00: mov64 r1, r10
0e8c08: add64 r1, -0x150
0e8c10: mov64 r2, r10
0e8c18: add64 r2, -0xa0
0e8c20: mov64 r3, 0x9a
0e8c28: call 0x618d ; call 0x119898
0e8c30: ldxw r1, [r10 - 0x5]
0e8c38: stxw [r10 - 0xb5], r1
0e8c40: ldxb r1, [r10 - 0x1]
0e8c48: stxb [r10 - 0xb1], r1
0e8c50: stxb [r10 - 0xb6], r9
0e8c58: stxdw [r10 - 0x158], r8
0e8c60: stxdw [r10 - 0x160], r7
0e8c68: ldxb r1, [r10 - 0x171]
0e8c70: stxb [r10 - 0x8f], r1
0e8c78: ldxb r1, [r10 - 0x172]
0e8c80: stxb [r10 - 0x90], r1
0e8c88: ldxdw r1, [r10 - 0x168]
0e8c90: stxdw [r10 - 0x98], r1
0e8c98: ldxdw r1, [r10 - 0x170]
0e8ca0: stxdw [r10 - 0xa0], r1
0e8ca8: mov64 r1, r10
0e8cb0: add64 r1, -0x160
0e8cb8: stxdw [r10 - 0xa8], r1
0e8cc0: stxdw [r10 - 0xb0], r6
0e8cc8: mov64 r1, r10
0e8cd0: add64 r1, -0x188
0e8cd8: mov64 r2, r10
0e8ce0: add64 r2, -0xb0
0e8ce8: ldxdw r3, [r10 - 0x1b8]
0e8cf0: ldxdw r4, [r10 - 0x1c0]
0e8cf8: call -0x12b36 ; call 0x53350
0e8d00: ldxdw r7, [r10 - 0x188]
0e8d08: jeq r7, 0x2, +0x1 ; branch 0xe8d18
0e8d10: ja +0x2d ; branch 0xe8e80
0e8d18: mov64 r1, r10
0e8d20: add64 r1, -0x198
0e8d28: mov64 r2, r10
0e8d30: add64 r2, -0x160
0e8d38: mov64 r3, r6
0e8d40: call -0x533b ; call 0xbf370
0e8d48: ldxdw r1, [r10 - 0xd0]
0e8d50: ldxdw r2, [r10 - 0xd8]
0e8d58: ldxdw r3, [r2 + 0x0]
0e8d60: add64 r3, -0x1
0e8d68: ldxdw r8, [r10 - 0x190]
0e8d70: ldxdw r7, [r10 - 0x198]
0e8d78: stxdw [r2 + 0x0], r3
0e8d80: jne r3, 0x0, +0x3 ; branch 0xe8da0
0e8d88: ldxdw r3, [r2 + 0x8]
0e8d90: add64 r3, -0x1
0e8d98: stxdw [r2 + 0x8], r3
0e8da0: ldxdw r2, [r1 + 0x0]
0e8da8: add64 r2, -0x1
0e8db0: stxdw [r1 + 0x0], r2
0e8db8: jne r2, 0x0, +0x14 ; branch 0xe8e60
0e8dc0: ja +0x25 ; branch 0xe8ef0
0e8dc8: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e8dd8: call 0x4c46 ; call 0x10f010
0e8de0: mov64 r1, r0
0e8de8: and64 r1, 0x3
0e8df0: mov64 r2, r1
0e8df8: add64 r2, -0x2
0e8e00: jlt r2, 0x2, +0x5 ; branch 0xe8e30
0e8e08: jeq r1, 0x0, +0x4 ; branch 0xe8e30
0e8e10: ldxdw r1, [r0 - 0x1]
0e8e18: ldxdw r2, [r0 + 0x7]
0e8e20: ldxdw r2, [r2 + 0x0]
0e8e28: callx r2
0e8e30: mov64 r1, r10
0e8e38: add64 r1, -0x1a8
0e8e40: mov64 r2, 0x66
0e8e48: call 0x39fd ; call 0x105e38
0e8e50: ldxdw r8, [r10 - 0x1a0]
0e8e58: ldxdw r7, [r10 - 0x1a8]
0e8e60: ldxdw r1, [r10 - 0x1b0]
0e8e68: stxdw [r1 + 0x8], r8
0e8e70: stxdw [r1 + 0x0], r7
0e8e78: exit
0e8e80: ldxdw r8, [r10 - 0x180]
0e8e88: ldxdw r1, [r10 - 0xd0]
0e8e90: ldxdw r2, [r10 - 0xd8]
0e8e98: ldxdw r3, [r2 + 0x0]
0e8ea0: add64 r3, -0x1
0e8ea8: stxdw [r2 + 0x0], r3
0e8eb0: jne r3, 0x0, +0x3 ; branch 0xe8ed0
0e8eb8: ldxdw r3, [r2 + 0x8]
0e8ec0: add64 r3, -0x1
0e8ec8: stxdw [r2 + 0x8], r3
0e8ed0: ldxdw r2, [r1 + 0x0]
0e8ed8: add64 r2, -0x1
0e8ee0: stxdw [r1 + 0x0], r2
0e8ee8: jne r2, 0x0, -0x12 ; branch 0xe8e60
0e8ef0: ldxdw r2, [r1 + 0x8]
0e8ef8: add64 r2, -0x1
0e8f00: stxdw [r1 + 0x8], r2
0e8f08: ja -0x16 ; branch 0xe8e60
