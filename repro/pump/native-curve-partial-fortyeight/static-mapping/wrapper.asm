1295c0: mov64 r8, r5
1295c8: mov64 r7, r4
1295d0: mov64 r9, r3
1295d8: stxdw [r10 - 0x190], r2
1295e0: mov64 r6, r1
1295e8: lddw r1, 0x1b7e16 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'Instruction: MultiHopCurveSwapInstruction: SweepProtocolFeeInstruction: SweepCreatorFeeInstruction: '
1295f8: mov64 r2, 0x1e
129600: call -0x1 ; relocation {'type': 10, 'symbol': 'sol_log_'}
129608: ldxdw r1, [r8 - 0xff8]
129610: jlt r1, 0x8, +0x87 ; branch 0x129a50
129618: ldxdw r2, [r8 - 0x1000]
129620: add64 r1, -0x8
129628: ldxdw r3, [r2 + 0x0]
129630: stxdw [r10 - 0x198], r3
129638: stxdw [r10 - 0x148], r1
129640: add64 r2, 0x8
129648: stxdw [r10 - 0x150], r2
129650: mov64 r1, r10
129658: add64 r1, -0xc0
129660: mov64 r2, r10
129668: add64 r2, -0x150
129670: call -0x22fe4 ; direct target 0x11758
129678: ldxdw r8, [r10 - 0xb8]
129680: ldxdw r2, [r10 - 0xc0]
129688: lddw r1, -0x8000000000000000
129698: jeq r2, r1, +0x7a ; branch 0x129a70
1296a0: stxdw [r10 - 0x1a8], r2
1296a8: stxdw [r10 - 0x1a0], r6
1296b0: ldxdw r1, [r10 - 0xb0]
1296b8: stxdw [r10 - 0x1b0], r1
1296c0: stb [r10 - 0x161], 0xff
1296c8: sth [r10 - 0x163], 0xffff
1296d0: stxdw [r10 - 0x158], r7
1296d8: stxdw [r10 - 0x160], r9
1296e0: mov64 r1, r10
1296e8: add64 r1, -0x163
1296f0: stxdw [r10 - 0xff8], r1
1296f8: mov64 r1, r10
129700: add64 r1, -0xc0
129708: mov64 r3, r10
129710: add64 r3, -0x160
129718: mov64 r5, r10
129720: ldxdw r2, [r10 - 0x190]
129728: call -0x9bbb ; direct target 0xdb958
129730: ldxdw r9, [r10 - 0xb8]
129738: ldxdw r7, [r10 - 0xc0]
129740: ldxb r6, [r10 - 0x36]
129748: jne r6, 0x2, +0x1 ; branch 0x129758
129750: ja +0x76 ; branch 0x129b08
129758: mov64 r1, r10
129760: add64 r1, -0x140
129768: mov64 r2, r10
129770: add64 r2, -0xb0
129778: mov64 r3, 0x7a
129780: call 0x113d1 ; direct target 0x1b3610
129788: ldxw r1, [r10 - 0x35]
129790: stxw [r10 - 0xc5], r1
129798: ldxb r1, [r10 - 0x31]
1297a0: stxb [r10 - 0xc1], r1
1297a8: stxb [r10 - 0xc6], r6
1297b0: stxdw [r10 - 0x148], r9
1297b8: stxdw [r10 - 0x150], r7
1297c0: ldxh r1, [r10 - 0x163]
1297c8: stxh [r10 - 0xa0], r1
1297d0: ldxb r1, [r10 - 0x161]
1297d8: stxb [r10 - 0x9e], r1
1297e0: ldxdw r1, [r10 - 0x158]
1297e8: stxdw [r10 - 0xa8], r1
1297f0: ldxdw r1, [r10 - 0x160]
1297f8: stxdw [r10 - 0xb0], r1
129800: mov64 r1, r10
129808: add64 r1, -0x150
129810: stxdw [r10 - 0xb8], r1
129818: ldxdw r6, [r10 - 0x190]
129820: stxdw [r10 - 0xc0], r6
129828: ldxdw r1, [r10 - 0x1b0]
129830: stxdw [r10 - 0x8], r1
129838: stxdw [r10 - 0x10], r8
129840: ldxdw r1, [r10 - 0x1a8]
129848: stxdw [r10 - 0x18], r1
129850: mov64 r1, r10
129858: add64 r1, -0x30
129860: mov64 r2, r10
129868: add64 r2, -0xc0
129870: mov64 r4, r10
129878: add64 r4, -0x18
129880: ldxdw r3, [r10 - 0x198]
129888: call -0x1a617 ; direct target 0x567d8
129890: ldxdw r7, [r10 - 0x28]
129898: ldxdw r1, [r10 - 0x30]
1298a0: mov64 r8, r6
1298a8: jne r1, 0x0, +0x4d ; branch 0x129b18
1298b0: lddw r1, 0x300000000
1298c0: ldxdw r2, [r1 + 0x0]
1298c8: mov64 r1, r2
1298d0: add64 r1, -0x100
1298d8: mov64 r3, 0x0
1298e0: mov64 r4, 0x1
1298e8: jgt r1, r2, +0x1 ; branch 0x1298f8
1298f0: mov64 r4, 0x0
1298f8: ldxdw r6, [r10 - 0x1a0]
129900: jne r4, 0x0, +0x1 ; branch 0x129910
129908: mov64 r3, r1
129910: lddw r1, 0x300007f00
129920: jeq r2, 0x0, +0x1 ; branch 0x129930
129928: mov64 r1, r3
129930: lddw r2, 0x300000008
129940: jlt r1, r2, +0x4a ; branch 0x129b98
129948: ldxdw r2, [r10 - 0x20]
129950: lddw r3, 0x300000000
129960: stxdw [r3 + 0x0], r1
129968: stxdw [r1 + 0x8], r2
129970: stxdw [r1 + 0x0], r7
129978: mov64 r2, 0x10
129980: call 0xede3 ; direct target 0x1a08a0
129988: mov64 r1, r10
129990: add64 r1, -0x178
129998: mov64 r2, r10
1299a0: add64 r2, -0x150
1299a8: mov64 r3, r8
1299b0: call -0x98b7 ; direct target 0xdd400
1299b8: ldxdw r1, [r10 - 0xe0]
1299c0: ldxdw r2, [r10 - 0xe8]
1299c8: ldxdw r3, [r2 + 0x0]
1299d0: add64 r3, -0x1
1299d8: ldxdw r9, [r10 - 0x170]
1299e0: ldxdw r7, [r10 - 0x178]
1299e8: stxdw [r2 + 0x0], r3
1299f0: jne r3, 0x0, +0x3 ; branch 0x129a10
1299f8: ldxdw r3, [r2 + 0x8]
129a00: add64 r3, -0x1
129a08: stxdw [r2 + 0x8], r3
129a10: ldxdw r2, [r1 + 0x0]
129a18: add64 r2, -0x1
129a20: stxdw [r1 + 0x0], r2
129a28: jne r2, 0x0, +0x18 ; branch 0x129af0
129a30: ldxdw r2, [r1 + 0x8]
129a38: add64 r2, -0x1
129a40: stxdw [r1 + 0x8], r2
129a48: ja +0x14 ; branch 0x129af0
129a50: lddw r1, 0x1bd820 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x87_\x1b\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
129a60: call 0xfe7f ; direct target 0x1a8e60
129a68: mov64 r8, r0
129a70: mov64 r1, r8
129a78: and64 r1, 0x3
129a80: mov64 r2, r1
129a88: add64 r2, -0x2
129a90: jlt r2, 0x2, +0x5 ; branch 0x129ac0
129a98: jeq r1, 0x0, +0x4 ; branch 0x129ac0
129aa0: ldxdw r1, [r8 - 0x1]
129aa8: ldxdw r2, [r8 + 0x7]
129ab0: ldxdw r2, [r2 + 0x0]
129ab8: callx r2
129ac0: mov64 r1, r10
129ac8: add64 r1, -0x188
129ad0: mov64 r2, 0x66
129ad8: call 0xeb08 ; direct target 0x19f320
129ae0: ldxdw r9, [r10 - 0x180]
129ae8: ldxdw r7, [r10 - 0x188]
129af0: stxdw [r6 + 0x8], r9
129af8: stxdw [r6 + 0x0], r7
129b00: exit
129b08: ldxdw r6, [r10 - 0x1a0]
129b10: ja -0x5 ; branch 0x129af0
129b18: ldxdw r1, [r10 - 0xe0]
129b20: ldxdw r9, [r10 - 0x20]
129b28: ldxdw r2, [r10 - 0xe8]
129b30: ldxdw r3, [r2 + 0x0]
129b38: add64 r3, -0x1
129b40: stxdw [r2 + 0x0], r3
129b48: jne r3, 0x0, +0x3 ; branch 0x129b68
129b50: ldxdw r3, [r2 + 0x8]
129b58: add64 r3, -0x1
129b60: stxdw [r2 + 0x8], r3
129b68: ldxdw r2, [r1 + 0x0]
129b70: add64 r2, -0x1
129b78: stxdw [r1 + 0x0], r2
129b80: ldxdw r6, [r10 - 0x1a0]
129b88: jne r2, 0x0, -0x14 ; branch 0x129af0
129b90: ja -0x2d ; branch 0x129a30
129b98: mov64 r1, 0x1
129ba0: mov64 r2, 0x100
129ba8: call 0x102bd ; direct target 0x1ab198
