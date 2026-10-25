0e4738: mov64 r6, r5
0e4740: mov64 r9, r4
0e4748: mov64 r8, r3
0e4750: mov64 r7, r2
0e4758: stxdw [r10 - 0x1c0], r1
0e4760: lddw r1, 0x11e7e7 ; rodata b'Instruction: BoostBuyAndBurnInstruction: SetReservedFeeRecipientsInstructio'
0e4770: mov64 r2, 0x1c
0e4778: call -0x1
0e4780: ldxdw r1, [r6 - 0xff8]
0e4788: jlt r1, 0x8, +0x62 ; branch 0xe4aa0
0e4790: and64 r1, -0x8
0e4798: jeq r1, 0x8, +0x60 ; branch 0xe4aa0
0e47a0: ldxdw r1, [r6 - 0x1000]
0e47a8: ldxdw r2, [r1 + 0x0]
0e47b0: stxdw [r10 - 0x1c8], r2
0e47b8: ldxdw r1, [r1 + 0x8]
0e47c0: stxdw [r10 - 0x1d0], r1
0e47c8: stb [r10 - 0x181], 0xff
0e47d0: sth [r10 - 0x183], 0xffff
0e47d8: stxdw [r10 - 0x178], r9
0e47e0: stxdw [r10 - 0x180], r8
0e47e8: mov64 r1, r10
0e47f0: add64 r1, -0x183
0e47f8: stxdw [r10 - 0xff8], r1
0e4800: mov64 r1, r10
0e4808: add64 r1, -0xb8
0e4810: mov64 r3, r10
0e4818: add64 r3, -0x180
0e4820: mov64 r5, r10
0e4828: mov64 r2, r7
0e4830: call -0xae0d ; call 0x8d7d0
0e4838: ldxdw r8, [r10 - 0xb0]
0e4840: ldxdw r6, [r10 - 0xb8]
0e4848: ldxb r9, [r10 - 0x6]
0e4850: jeq r9, 0x2, +0x5c ; branch 0xe4b38
0e4858: mov64 r1, r10
0e4860: add64 r1, -0x160
0e4868: mov64 r2, r10
0e4870: add64 r2, -0xa8
0e4878: mov64 r3, 0xa2
0e4880: call 0x6a02 ; call 0x119898
0e4888: ldxw r1, [r10 - 0x5]
0e4890: stxw [r10 - 0xbd], r1
0e4898: ldxb r1, [r10 - 0x1]
0e48a0: stxb [r10 - 0xb9], r1
0e48a8: stxb [r10 - 0xbe], r9
0e48b0: stxdw [r10 - 0x168], r8
0e48b8: stxdw [r10 - 0x170], r6
0e48c0: ldxh r1, [r10 - 0x183]
0e48c8: stxh [r10 - 0x98], r1
0e48d0: ldxb r1, [r10 - 0x181]
0e48d8: stxb [r10 - 0x96], r1
0e48e0: ldxdw r1, [r10 - 0x178]
0e48e8: stxdw [r10 - 0xa0], r1
0e48f0: ldxdw r1, [r10 - 0x180]
0e48f8: stxdw [r10 - 0xa8], r1
0e4900: mov64 r1, r10
0e4908: add64 r1, -0x170
0e4910: stxdw [r10 - 0xb0], r1
0e4918: stxdw [r10 - 0xb8], r7
0e4920: mov64 r1, r10
0e4928: add64 r1, -0x198
0e4930: mov64 r2, r10
0e4938: add64 r2, -0xb8
0e4940: ldxdw r3, [r10 - 0x1c8]
0e4948: ldxdw r4, [r10 - 0x1d0]
0e4950: call -0x18950 ; call 0x1fed8
0e4958: ldxdw r6, [r10 - 0x198]
0e4960: jeq r6, 0x2, +0x1 ; branch 0xe4970
0e4968: ja +0x3d ; branch 0xe4b58
0e4970: mov64 r1, r10
0e4978: add64 r1, -0x1a8
0e4980: mov64 r2, r10
0e4988: add64 r2, -0x170
0e4990: mov64 r3, r7
0e4998: call -0xa927 ; call 0x90068
0e49a0: ldxdw r1, [r10 - 0x108]
0e49a8: ldxdw r2, [r10 - 0x110]
0e49b0: ldxdw r3, [r2 + 0x0]
0e49b8: add64 r3, -0x1
0e49c0: ldxdw r8, [r10 - 0x1a0]
0e49c8: ldxdw r6, [r10 - 0x1a8]
0e49d0: stxdw [r2 + 0x0], r3
0e49d8: jne r3, 0x0, +0x3 ; branch 0xe49f8
0e49e0: ldxdw r3, [r2 + 0x8]
0e49e8: add64 r3, -0x1
0e49f0: stxdw [r2 + 0x8], r3
0e49f8: ldxdw r2, [r1 + 0x0]
0e4a00: add64 r2, -0x1
0e4a08: stxdw [r1 + 0x0], r2
0e4a10: jne r2, 0x0, +0x3 ; branch 0xe4a30
0e4a18: ldxdw r2, [r1 + 0x8]
0e4a20: add64 r2, -0x1
0e4a28: stxdw [r1 + 0x8], r2
0e4a30: ldxdw r1, [r10 - 0xd8]
0e4a38: ldxdw r2, [r10 - 0xe0]
0e4a40: ldxdw r3, [r2 + 0x0]
0e4a48: add64 r3, -0x1
0e4a50: stxdw [r2 + 0x0], r3
0e4a58: jne r3, 0x0, +0x3 ; branch 0xe4a78
0e4a60: ldxdw r3, [r2 + 0x8]
0e4a68: add64 r3, -0x1
0e4a70: stxdw [r2 + 0x8], r3
0e4a78: ldxdw r2, [r1 + 0x0]
0e4a80: add64 r2, -0x1
0e4a88: stxdw [r1 + 0x0], r2
0e4a90: jne r2, 0x0, +0x14 ; branch 0xe4b38
0e4a98: ja +0x35 ; branch 0xe4c48
0e4aa0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e4ab0: call 0x54ab ; call 0x10f010
0e4ab8: mov64 r1, r0
0e4ac0: and64 r1, 0x3
0e4ac8: mov64 r2, r1
0e4ad0: add64 r2, -0x2
0e4ad8: jlt r2, 0x2, +0x5 ; branch 0xe4b08
0e4ae0: jeq r1, 0x0, +0x4 ; branch 0xe4b08
0e4ae8: ldxdw r1, [r0 - 0x1]
0e4af0: ldxdw r2, [r0 + 0x7]
0e4af8: ldxdw r2, [r2 + 0x0]
0e4b00: callx r2
0e4b08: mov64 r1, r10
0e4b10: add64 r1, -0x1b8
0e4b18: mov64 r2, 0x66
0e4b20: call 0x4262 ; call 0x105e38
0e4b28: ldxdw r8, [r10 - 0x1b0]
0e4b30: ldxdw r6, [r10 - 0x1b8]
0e4b38: ldxdw r1, [r10 - 0x1c0]
0e4b40: stxdw [r1 + 0x8], r8
0e4b48: stxdw [r1 + 0x0], r6
0e4b50: exit
0e4b58: ldxdw r8, [r10 - 0x190]
0e4b60: ldxdw r1, [r10 - 0x108]
0e4b68: ldxdw r2, [r10 - 0x110]
0e4b70: ldxdw r3, [r2 + 0x0]
0e4b78: add64 r3, -0x1
0e4b80: stxdw [r2 + 0x0], r3
0e4b88: jne r3, 0x0, +0x3 ; branch 0xe4ba8
0e4b90: ldxdw r3, [r2 + 0x8]
0e4b98: add64 r3, -0x1
0e4ba0: stxdw [r2 + 0x8], r3
0e4ba8: ldxdw r2, [r1 + 0x0]
0e4bb0: add64 r2, -0x1
0e4bb8: stxdw [r1 + 0x0], r2
0e4bc0: jne r2, 0x0, +0x3 ; branch 0xe4be0
0e4bc8: ldxdw r2, [r1 + 0x8]
0e4bd0: add64 r2, -0x1
0e4bd8: stxdw [r1 + 0x8], r2
0e4be0: ldxdw r1, [r10 - 0xd8]
0e4be8: ldxdw r2, [r10 - 0xe0]
0e4bf0: ldxdw r3, [r2 + 0x0]
0e4bf8: add64 r3, -0x1
0e4c00: stxdw [r2 + 0x0], r3
0e4c08: jne r3, 0x0, +0x3 ; branch 0xe4c28
0e4c10: ldxdw r3, [r2 + 0x8]
0e4c18: add64 r3, -0x1
0e4c20: stxdw [r2 + 0x8], r3
0e4c28: ldxdw r2, [r1 + 0x0]
0e4c30: add64 r2, -0x1
0e4c38: stxdw [r1 + 0x0], r2
0e4c40: jne r2, 0x0, -0x22 ; branch 0xe4b38
0e4c48: ldxdw r2, [r1 + 0x8]
0e4c50: add64 r2, -0x1
0e4c58: stxdw [r1 + 0x8], r2
0e4c60: ja -0x26 ; branch 0xe4b38
