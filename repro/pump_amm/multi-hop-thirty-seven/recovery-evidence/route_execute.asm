040a08: mov64 r6, r5
040a10: mov64 r7, r4
040a18: stxdw [r10 - 0x978], r3
040a20: mov64 r9, r2
040a28: stxdw [r10 - 0x960], r1
040a30: ldxdw r8, [r6 - 0xfd8]
040a38: mov64 r1, r8
040a40: rsh64 r1, 0x10
040a48: stxb [r10 - 0x7b2], r1
040a50: stxh [r10 - 0x7b4], r8
040a58: ldxdw r1, [r7 + 0x8]
040a60: ldxdw r1, [r1 + 0x58]
040a68: ldxdw r1, [r1 + 0x0]
040a70: ldxdw r2, [r1 + 0x18]
040a78: stxdw [r10 - 0x3d8], r2
040a80: ldxdw r2, [r1 + 0x10]
040a88: stxdw [r10 - 0x3e0], r2
040a90: ldxdw r2, [r1 + 0x8]
040a98: stxdw [r10 - 0x3e8], r2
040aa0: ldxdw r1, [r1 + 0x0]
040aa8: stxdw [r10 - 0x3f0], r1
040ab0: ldxdw r1, [r6 - 0x1000]
040ab8: mov64 r2, r10
040ac0: add64 r2, -0x3f0
040ac8: mov64 r3, 0x20
040ad0: call 0x1b1c1 ; call 0x1198e0
040ad8: ldxdw r4, [r6 - 0xfe0]
040ae0: ldxdw r5, [r6 - 0xfe8]
040ae8: ldxdw r1, [r6 - 0xff0]
040af0: stxdw [r10 - 0x970], r1
040af8: ldxdw r3, [r6 - 0xff8]
040b00: stxdw [r10 - 0x968], r9
040b08: ldxdw r1, [r9 + 0x18]
040b10: ldxb r1, [r1 + 0x3b0]
040b18: mov64 r2, r0
040b20: lsh64 r2, 0x20
040b28: rsh64 r2, 0x20
040b30: jeq r2, 0x0, +0x24 ; branch 0x40c58
040b38: and64 r1, 0x10
040b40: jeq r1, 0x0, +0x25 ; branch 0x40c70
040b48: mov64 r1, r10
040b50: add64 r1, -0x650
040b58: lddw r2, 0x11c0b8 ; rodata b'\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display'
040b68: call 0x6911 ; call 0x753f8
040b70: stdw [r10 - 0x100], 0x0
040b78: stdw [r10 - 0x108], 0x1
040b80: stdw [r10 - 0x110], 0x0
040b88: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
040b98: stxdw [r10 - 0x5c8], r1
040ba0: mov64 r1, r10
040ba8: add64 r1, -0x110
040bb0: stxdw [r10 - 0x5d0], r1
040bb8: stb [r10 - 0x5b8], 0x3
040bc0: stdw [r10 - 0x5c0], 0x20
040bc8: stdw [r10 - 0x5e0], 0x0
040bd0: stdw [r10 - 0x5f0], 0x0
040bd8: mov64 r2, r10
040be0: add64 r2, -0x5f0
040be8: lddw r1, 0x11c0b8 ; rodata b'\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display'
040bf8: call 0x73f4 ; call 0x7aba0
040c00: jeq r0, 0x0, +0x4c ; branch 0x40e68
040c08: mov64 r3, r10
040c10: add64 r3, -0x6d0
040c18: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
040c28: mov64 r2, 0x37
040c30: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
040c40: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
040c50: call 0x1a468 ; call 0x112f98
040c58: and64 r1, 0x8
040c60: jeq r1, 0x0, +0x1 ; branch 0x40c70
040c68: ja +0x79 ; branch 0x41038
040c70: stxdw [r10 - 0x980], r0
040c78: stxdw [r10 - 0x988], r5
040c80: stxdw [r10 - 0x998], r4
040c88: stxdw [r10 - 0x990], r3
040c90: ldxdw r6, [r7 + 0x10]
040c98: mov64 r1, r6
040ca0: add64 r1, 0x28
040ca8: stxdw [r10 - 0x5e0], r1
040cb0: lddw r1, 0x11cb5b ; rodata b'pool-authoritybonding-curveholder-rewardsprograms/pump-amm/src/instructions'
040cc0: stxdw [r10 - 0x5f0], r1
040cc8: stdw [r10 - 0x5d8], 0x20
040cd0: stdw [r10 - 0x5e8], 0xe
040cd8: mov64 r1, r10
040ce0: add64 r1, -0x3f0
040ce8: mov64 r2, r10
040cf0: add64 r2, -0x5f0
040cf8: mov64 r3, 0x2
040d00: lddw r4, 0x11e55e ; rodata b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0programs/pu'
040d10: call 0x19a6a ; call 0x10e068
040d18: ldxdw r1, [r10 - 0x3d8]
040d20: stxdw [r10 - 0xf8], r1
040d28: ldxdw r1, [r10 - 0x3e0]
040d30: stxdw [r10 - 0x100], r1
040d38: ldxdw r1, [r10 - 0x3e8]
040d40: stxdw [r10 - 0x108], r1
040d48: ldxdw r1, [r10 - 0x3f0]
040d50: stxdw [r10 - 0x110], r1
040d58: mov64 r1, r6
040d60: add64 r1, 0x8
040d68: mov64 r2, r10
040d70: add64 r2, -0x110
040d78: mov64 r3, 0x20
040d80: call 0x1b16b ; call 0x1198e0
040d88: lsh64 r0, 0x20
040d90: rsh64 r0, 0x20
040d98: jeq r0, 0x0, +0x6c ; branch 0x41100
040da0: mov64 r1, r10
040da8: add64 r1, -0x650
040db0: lddw r2, 0x11c0b0 ; rodata b'N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a'
040dc0: call 0x68c6 ; call 0x753f8
040dc8: stdw [r10 - 0x100], 0x0
040dd0: stdw [r10 - 0x108], 0x1
040dd8: stdw [r10 - 0x110], 0x0
040de0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
040df0: stxdw [r10 - 0x5c8], r1
040df8: mov64 r1, r10
040e00: add64 r1, -0x110
040e08: stxdw [r10 - 0x5d0], r1
040e10: stb [r10 - 0x5b8], 0x3
040e18: stdw [r10 - 0x5c0], 0x20
040e20: stdw [r10 - 0x5e0], 0x0
040e28: stdw [r10 - 0x5f0], 0x0
040e30: mov64 r2, r10
040e38: add64 r2, -0x5f0
040e40: lddw r1, 0x11c0b0 ; rodata b'N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a'
040e50: call 0x73a9 ; call 0x7aba0
040e58: jeq r0, 0x0, +0x1d ; branch 0x40f48
040e60: ja -0x4c ; branch 0x40c08
040e68: ldxdw r1, [r10 - 0x100]
040e70: stxdw [r10 - 0x3a8], r1
040e78: ldxdw r1, [r10 - 0x108]
040e80: stxdw [r10 - 0x3b0], r1
040e88: ldxdw r1, [r10 - 0x110]
040e90: stxdw [r10 - 0x3b8], r1
040e98: ldxdw r1, [r10 - 0x650]
040ea0: stxdw [r10 - 0x3d0], r1
040ea8: ldxdw r1, [r10 - 0x648]
040eb0: stxdw [r10 - 0x3c8], r1
040eb8: ldxdw r1, [r10 - 0x640]
040ec0: stxdw [r10 - 0x3c0], r1
040ec8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
040ed8: stxdw [r10 - 0x3e8], r1
040ee0: stw [r10 - 0x358], 0x1785
040ee8: stb [r10 - 0x3a0], 0x2
040ef0: stw [r10 - 0x3d8], 0x1da
040ef8: stdw [r10 - 0x3e0], 0x39
040f00: stdw [r10 - 0x3f0], 0x0
040f08: mov64 r1, r10
040f10: add64 r1, -0x7c8
040f18: mov64 r2, r10
040f20: add64 r2, -0x3f0
040f28: call 0x18411 ; call 0x102fb8
040f30: ldxdw r1, [r10 - 0x7c8]
040f38: ldxdw r2, [r10 - 0x7c0]
040f40: ja +0xc2 ; branch 0x41558
040f48: ldxdw r1, [r10 - 0x100]
040f50: stxdw [r10 - 0x3a8], r1
040f58: ldxdw r1, [r10 - 0x108]
040f60: stxdw [r10 - 0x3b0], r1
040f68: ldxdw r1, [r10 - 0x110]
040f70: stxdw [r10 - 0x3b8], r1
040f78: ldxdw r1, [r10 - 0x650]
040f80: stxdw [r10 - 0x3d0], r1
040f88: ldxdw r1, [r10 - 0x648]
040f90: stxdw [r10 - 0x3c8], r1
040f98: ldxdw r1, [r10 - 0x640]
040fa0: stxdw [r10 - 0x3c0], r1
040fa8: lddw r1, 0x11cd69 ; rodata b'programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_quote_in'
040fb8: stxdw [r10 - 0x3e8], r1
040fc0: stw [r10 - 0x358], 0x17be
040fc8: stb [r10 - 0x3a0], 0x2
040fd0: stw [r10 - 0x3d8], 0x77
040fd8: stdw [r10 - 0x3e0], 0x33
040fe0: stdw [r10 - 0x3f0], 0x0
040fe8: mov64 r1, r10
040ff0: add64 r1, -0x7e8
040ff8: mov64 r2, r10
041000: add64 r2, -0x3f0
041008: call 0x183f5 ; call 0x102fb8
041010: ldxdw r1, [r10 - 0x7e0]
041018: ldxdw r2, [r10 - 0x7e8]
041020: ldxdw r6, [r10 - 0x968]
041028: jeq r2, 0x2, +0x8d ; branch 0x41498
041030: ja +0x172 ; branch 0x41bc8
041038: mov64 r1, r10
041040: add64 r1, -0x650
041048: lddw r2, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
041058: call 0x6873 ; call 0x753f8
041060: stdw [r10 - 0x100], 0x0
041068: stdw [r10 - 0x108], 0x1
041070: stdw [r10 - 0x110], 0x0
041078: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
041088: stxdw [r10 - 0x5c8], r1
041090: mov64 r1, r10
041098: add64 r1, -0x110
0410a0: stxdw [r10 - 0x5d0], r1
0410a8: stb [r10 - 0x5b8], 0x3
0410b0: stdw [r10 - 0x5c0], 0x20
0410b8: stdw [r10 - 0x5e0], 0x0
0410c0: stdw [r10 - 0x5f0], 0x0
0410c8: mov64 r2, r10
0410d0: add64 r2, -0x5f0
0410d8: lddw r1, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
0410e8: call 0x7356 ; call 0x7aba0
0410f0: jeq r0, 0x0, +0x21 ; branch 0x41200
0410f8: ja -0x9f ; branch 0x40c08
041100: and64 r8, 0xff00
041108: jeq r8, 0x0, +0x2 ; branch 0x41120
041110: ldxb r1, [r6 + 0x11c]
041118: jne r1, 0x0, +0x38 ; branch 0x412e0
041120: ldxb r1, [r6 + 0x11b]
041128: ldxdw r6, [r10 - 0x968]
041130: jeq r1, 0x0, +0x6c ; branch 0x41498
041138: mov64 r1, r10
041140: add64 r1, -0x650
041148: lddw r2, 0x11c054 ; rodata b'P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00'
041158: call 0x6853 ; call 0x753f8
041160: stdw [r10 - 0x100], 0x0
041168: stdw [r10 - 0x108], 0x1
041170: stdw [r10 - 0x110], 0x0
041178: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
041188: stxdw [r10 - 0x5c8], r1
041190: mov64 r1, r10
041198: add64 r1, -0x110
0411a0: stxdw [r10 - 0x5d0], r1
0411a8: stb [r10 - 0x5b8], 0x3
0411b0: stdw [r10 - 0x5c0], 0x20
0411b8: stdw [r10 - 0x5e0], 0x0
0411c0: stdw [r10 - 0x5f0], 0x0
0411c8: mov64 r2, r10
0411d0: add64 r2, -0x5f0
0411d8: lddw r1, 0x11c054 ; rodata b'P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00'
0411e8: call 0x7336 ; call 0x7aba0
0411f0: jeq r0, 0x0, +0x11e ; branch 0x41ae8
0411f8: ja -0xbf ; branch 0x40c08
041200: ldxdw r1, [r10 - 0x100]
041208: stxdw [r10 - 0x3a8], r1
041210: ldxdw r1, [r10 - 0x108]
041218: stxdw [r10 - 0x3b0], r1
041220: ldxdw r1, [r10 - 0x110]
041228: stxdw [r10 - 0x3b8], r1
041230: ldxdw r1, [r10 - 0x650]
041238: stxdw [r10 - 0x3d0], r1
041240: ldxdw r1, [r10 - 0x648]
041248: stxdw [r10 - 0x3c8], r1
041250: ldxdw r1, [r10 - 0x640]
041258: stxdw [r10 - 0x3c0], r1
041260: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
041270: stxdw [r10 - 0x3e8], r1
041278: stw [r10 - 0x358], 0x1784
041280: stb [r10 - 0x3a0], 0x2
041288: stw [r10 - 0x3d8], 0x1d5
041290: stdw [r10 - 0x3e0], 0x39
041298: stdw [r10 - 0x3f0], 0x0
0412a0: mov64 r1, r10
0412a8: add64 r1, -0x7d8
0412b0: mov64 r2, r10
0412b8: add64 r2, -0x3f0
0412c0: call 0x1839e ; call 0x102fb8
0412c8: ldxdw r1, [r10 - 0x7d8]
0412d0: ldxdw r2, [r10 - 0x7d0]
0412d8: ja +0x4f ; branch 0x41558
0412e0: mov64 r1, r10
0412e8: add64 r1, -0x650
0412f0: lddw r2, 0x11c028 ; rodata b'O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00'
041300: call 0x681e ; call 0x753f8
041308: stdw [r10 - 0x100], 0x0
041310: stdw [r10 - 0x108], 0x1
041318: stdw [r10 - 0x110], 0x0
041320: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
041330: stxdw [r10 - 0x5c8], r1
041338: mov64 r1, r10
041340: add64 r1, -0x110
041348: stxdw [r10 - 0x5d0], r1
041350: stb [r10 - 0x5b8], 0x3
041358: stdw [r10 - 0x5c0], 0x20
041360: stdw [r10 - 0x5e0], 0x0
041368: stdw [r10 - 0x5f0], 0x0
041370: mov64 r2, r10
041378: add64 r2, -0x5f0
041380: lddw r1, 0x11c028 ; rodata b'O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00'
041390: call 0x7301 ; call 0x7aba0
041398: jeq r0, 0x0, +0x1 ; branch 0x413a8
0413a0: ja -0xf4 ; branch 0x40c08
0413a8: ldxdw r1, [r10 - 0x100]
0413b0: stxdw [r10 - 0x3a8], r1
0413b8: ldxdw r1, [r10 - 0x108]
0413c0: stxdw [r10 - 0x3b0], r1
0413c8: ldxdw r1, [r10 - 0x110]
0413d0: stxdw [r10 - 0x3b8], r1
0413d8: ldxdw r1, [r10 - 0x650]
0413e0: stxdw [r10 - 0x3d0], r1
0413e8: ldxdw r1, [r10 - 0x648]
0413f0: stxdw [r10 - 0x3c8], r1
0413f8: ldxdw r1, [r10 - 0x640]
041400: stxdw [r10 - 0x3c0], r1
041408: lddw r1, 0x11cd69 ; rodata b'programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_quote_in'
041418: stxdw [r10 - 0x3e8], r1
041420: stw [r10 - 0x358], 0x17bf
041428: stb [r10 - 0x3a0], 0x2
041430: stw [r10 - 0x3d8], 0x78
041438: stdw [r10 - 0x3e0], 0x33
041440: stdw [r10 - 0x3f0], 0x0
041448: mov64 r1, r10
041450: add64 r1, -0x7f8
041458: mov64 r2, r10
041460: add64 r2, -0x3f0
041468: call 0x18369 ; call 0x102fb8
041470: ldxdw r1, [r10 - 0x7f0]
041478: ldxdw r2, [r10 - 0x7f8]
041480: ldxdw r6, [r10 - 0x968]
041488: jeq r2, 0x2, +0x1 ; branch 0x41498
041490: ja +0xe6 ; branch 0x41bc8
041498: mov64 r8, r7
0414a0: add64 r8, 0x10
0414a8: ldxdw r4, [r6 + 0x0]
0414b0: ldxdw r3, [r6 + 0x48]
0414b8: ldxdw r1, [r8 + 0x0]
0414c0: ldxdw r2, [r1 + 0x0]
0414c8: mov64 r1, r10
0414d0: add64 r1, -0x818
0414d8: call 0x2d69 ; call 0x58028
0414e0: ldxdw r1, [r10 - 0x818]
0414e8: jeq r1, 0x2, +0x1 ; branch 0x414f8
0414f0: ja +0x10 ; branch 0x41578
0414f8: ldxdw r3, [r6 + 0x40]
041500: ldxdw r2, [r6 + 0x38]
041508: ldxdw r1, [r7 + 0x0]
041510: ldxdw r4, [r1 + 0x58]
041518: mov64 r1, r10
041520: add64 r1, -0x3f0
041528: call -0x245 ; call 0x40308
041530: ldxdw r2, [r10 - 0x3e8]
041538: ldxdw r1, [r10 - 0x3f0]
041540: ldxb r3, [r10 - 0x3c6]
041548: jeq r3, 0x2, +0x1 ; branch 0x41558
041550: ja +0x9 ; branch 0x415a0
041558: ldxdw r3, [r10 - 0x960]
041560: stxdw [r3 + 0x10], r2
041568: stxdw [r3 + 0x8], r1
041570: ja +0xcd ; branch 0x41be0
041578: ldxdw r2, [r10 - 0x810]
041580: ldxdw r3, [r10 - 0x960]
041588: stxdw [r3 + 0x8], r1
041590: stxdw [r3 + 0x10], r2
041598: ja +0xc8 ; branch 0x41be0
0415a0: mov64 r9, r7
0415a8: add64 r9, 0x8
0415b0: ldxh r4, [r10 - 0x3c8]
0415b8: stxh [r10 - 0x788], r4
0415c0: ldxdw r4, [r10 - 0x3d0]
0415c8: stxdw [r10 - 0x790], r4
0415d0: ldxdw r4, [r10 - 0x3d8]
0415d8: stxdw [r10 - 0x798], r4
0415e0: ldxdw r4, [r10 - 0x3e0]
0415e8: stxdw [r10 - 0x7a0], r4
0415f0: ldxw r4, [r10 - 0x3c5]
0415f8: stxw [r10 - 0x785], r4
041600: ldxb r4, [r10 - 0x3c1]
041608: stxb [r10 - 0x781], r4
041610: stxb [r10 - 0x786], r3
041618: stxdw [r10 - 0x7a8], r2
041620: stxdw [r10 - 0x7b0], r1
041628: ldxdw r3, [r6 + 0x40]
041630: ldxdw r2, [r6 + 0x38]
041638: ldxdw r1, [r9 + 0x0]
041640: ldxdw r4, [r1 + 0x58]
041648: mov64 r1, r10
041650: add64 r1, -0x3f0
041658: call -0x26b ; call 0x40308
041660: ldxdw r4, [r10 - 0x3e8]
041668: ldxdw r1, [r10 - 0x3f0]
041670: ldxb r2, [r10 - 0x3c6]
041678: jeq r2, 0x2, +0xae ; branch 0x41bf0
041680: ldxh r3, [r10 - 0x3c8]
041688: stxh [r10 - 0x758], r3
041690: ldxdw r3, [r10 - 0x3d0]
041698: stxdw [r10 - 0x760], r3
0416a0: ldxdw r3, [r10 - 0x3d8]
0416a8: stxdw [r10 - 0x768], r3
0416b0: ldxdw r3, [r10 - 0x3e0]
0416b8: stxdw [r10 - 0x770], r3
0416c0: ldxw r3, [r10 - 0x3c5]
0416c8: stxw [r10 - 0x755], r3
0416d0: ldxb r3, [r10 - 0x3c1]
0416d8: stxb [r10 - 0x751], r3
0416e0: stxb [r10 - 0x756], r2
0416e8: stxdw [r10 - 0x778], r4
0416f0: stxdw [r10 - 0x780], r1
0416f8: ldxb r2, [r10 - 0x7b4]
041700: jeq r2, 0x0, +0x24 ; branch 0x41828
041708: mov64 r5, r9
041710: mov64 r9, r4
041718: ldxdw r3, [r6 + 0x30]
041720: ldxdw r2, [r6 + 0x18]
041728: stxdw [r10 - 0x9a0], r5
041730: ldxdw r4, [r5 + 0x0]
041738: ldxdw r4, [r4 + 0x58]
041740: ldxdw r4, [r4 + 0x0]
041748: ldxdw r5, [r4 + 0x18]
041750: stxdw [r10 - 0x5d8], r5
041758: ldxdw r5, [r4 + 0x10]
041760: stxdw [r10 - 0x5e0], r5
041768: ldxdw r5, [r4 + 0x8]
041770: stxdw [r10 - 0x5e8], r5
041778: ldxdw r4, [r4 + 0x0]
041780: stxdw [r10 - 0x5f0], r4
041788: ldxdw r4, [r1 + 0x18]
041790: stxdw [r10 - 0x3d8], r4
041798: ldxdw r4, [r1 + 0x10]
0417a0: stxdw [r10 - 0x3e0], r4
0417a8: ldxdw r4, [r1 + 0x8]
0417b0: stxdw [r10 - 0x3e8], r4
0417b8: ldxdw r1, [r1 + 0x0]
0417c0: stxdw [r10 - 0x3f0], r1
0417c8: add64 r2, 0x8
0417d0: mov64 r1, r10
0417d8: add64 r1, -0x828
0417e0: mov64 r4, r10
0417e8: add64 r4, -0x5f0
0417f0: mov64 r5, r10
0417f8: add64 r5, -0x3f0
041800: call 0x1b3a ; call 0x4f1d8
041808: ldxdw r1, [r10 - 0x828]
041810: jne r1, 0x2, +0x80 ; branch 0x41c18
041818: mov64 r4, r9
041820: ldxdw r9, [r10 - 0x9a0]
041828: ldxdw r1, [r10 - 0x980]
041830: lsh64 r1, 0x20
041838: rsh64 r1, 0x20
041840: mov64 r2, r10
041848: add64 r2, -0x7b0
041850: mov64 r3, r10
041858: add64 r3, -0x780
041860: jeq r1, 0x0, +0x1 ; branch 0x41870
041868: mov64 r3, r2
041870: stxdw [r10 - 0x9b8], r3
041878: mov64 r5, r9
041880: ldxdw r3, [r10 - 0x988]
041888: jeq r1, 0x0, +0x1 ; branch 0x41898
041890: mov64 r5, r7
041898: mov64 r2, r7
0418a0: add64 r2, 0x18
0418a8: stxdw [r10 - 0x9a0], r2
0418b0: mov64 r2, r7
0418b8: add64 r2, 0x20
0418c0: stxdw [r10 - 0x9c0], r2
0418c8: mov64 r0, r2
0418d0: jeq r1, 0x0, +0x1 ; branch 0x418e0
0418d8: ldxdw r0, [r10 - 0x9a0]
0418e0: stxdw [r10 - 0x9a8], r4
0418e8: ldxdw r1, [r10 - 0x970]
0418f0: ldxb r1, [r1 + 0x0]
0418f8: stxdw [r10 - 0x9b0], r1
041900: jeq r1, 0x0, +0x68 ; branch 0x41c48
041908: mov64 r4, 0x0
041910: stdw [r10 - 0x738], 0x0
041918: stdw [r10 - 0x740], 0x0
041920: stdw [r10 - 0x748], 0x0
041928: stdw [r10 - 0x750], 0x0
041930: jeq r3, 0x0, +0x91 ; branch 0x41dc0
041938: stxdw [r10 - 0x9d8], r0
041940: stxdw [r10 - 0x9c8], r5
041948: stxdw [r10 - 0x9d0], r4
041950: ldxdw r1, [r6 + 0x10]
041958: ldxdw r2, [r1 + 0x20]
041960: ldxdw r1, [r2 + 0x0]
041968: ldxdw r3, [r1 + 0x18]
041970: stxdw [r10 - 0xf8], r3
041978: ldxdw r3, [r1 + 0x10]
041980: stxdw [r10 - 0x100], r3
041988: ldxdw r3, [r1 + 0x8]
041990: stxdw [r10 - 0x108], r3
041998: ldxdw r1, [r1 + 0x0]
0419a0: stxdw [r10 - 0x110], r1
0419a8: mov64 r6, r10
0419b0: add64 r6, -0x3f0
0419b8: mov64 r1, r6
0419c0: call -0x670a ; call 0xe178
0419c8: mov64 r1, r10
0419d0: add64 r1, -0x650
0419d8: mov64 r2, r6
0419e0: call 0x7bc ; call 0x457c8
0419e8: ldxdw r1, [r10 - 0x650]
0419f0: jeq r1, 0x2, +0x1 ; branch 0x41a00
0419f8: ja +0x61 ; branch 0x41d08
041a00: ldxdw r1, [r10 - 0x110]
041a08: stxdw [r10 - 0x5f0], r1
041a10: ldxdw r1, [r10 - 0x108]
041a18: stxdw [r10 - 0x5e8], r1
041a20: ldxdw r1, [r10 - 0x100]
041a28: stxdw [r10 - 0x5e0], r1
041a30: ldxdw r1, [r10 - 0xf8]
041a38: stxdw [r10 - 0x5d8], r1
041a40: ldxdw r1, [r10 - 0x3e0]
041a48: ldxdw r2, [r10 - 0x648]
041a50: stxdw [r10 - 0x9e8], r2
041a58: ldxdw r2, [r10 - 0x3e8]
041a60: ldxdw r3, [r2 + 0x0]
041a68: add64 r3, -0x1
041a70: stxdw [r2 + 0x0], r3
041a78: jne r3, 0x0, +0x3 ; branch 0x41a98
041a80: ldxdw r3, [r2 + 0x8]
041a88: add64 r3, -0x1
041a90: stxdw [r2 + 0x8], r3
041a98: ldxdw r2, [r1 + 0x0]
041aa0: add64 r2, -0x1
041aa8: stxdw [r1 + 0x0], r2
041ab0: ldxdw r0, [r10 - 0x9d8]
041ab8: jne r2, 0x0, +0x3 ; branch 0x41ad8
041ac0: ldxdw r2, [r1 + 0x8]
041ac8: add64 r2, -0x1
041ad0: stxdw [r1 + 0x8], r2
041ad8: stxdw [r10 - 0x9e0], r8
041ae0: ja +0x64 ; branch 0x41e08
041ae8: ldxdw r1, [r10 - 0x100]
041af0: stxdw [r10 - 0x3a8], r1
041af8: ldxdw r1, [r10 - 0x108]
041b00: stxdw [r10 - 0x3b0], r1
041b08: ldxdw r1, [r10 - 0x110]
041b10: stxdw [r10 - 0x3b8], r1
041b18: ldxdw r1, [r10 - 0x650]
041b20: stxdw [r10 - 0x3d0], r1
041b28: ldxdw r1, [r10 - 0x648]
041b30: stxdw [r10 - 0x3c8], r1
041b38: ldxdw r1, [r10 - 0x640]
041b40: stxdw [r10 - 0x3c0], r1
041b48: lddw r1, 0x11cd69 ; rodata b'programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_quote_in'
041b58: stxdw [r10 - 0x3e8], r1
041b60: stw [r10 - 0x358], 0x17c0
041b68: stb [r10 - 0x3a0], 0x2
041b70: stw [r10 - 0x3d8], 0x7c
041b78: stdw [r10 - 0x3e0], 0x33
041b80: stdw [r10 - 0x3f0], 0x0
041b88: mov64 r1, r10
041b90: add64 r1, -0x808
041b98: mov64 r2, r10
041ba0: add64 r2, -0x3f0
041ba8: call 0x18281 ; call 0x102fb8
041bb0: ldxdw r1, [r10 - 0x800]
041bb8: ldxdw r2, [r10 - 0x808]
041bc0: jeq r2, 0x2, -0xe6 ; branch 0x41498
041bc8: ldxdw r3, [r10 - 0x960]
041bd0: stxdw [r3 + 0x8], r2
041bd8: stxdw [r3 + 0x10], r1
041be0: stdw [r3 + 0x0], 0x1
041be8: exit
041bf0: ldxdw r2, [r10 - 0x960]
041bf8: stxdw [r2 + 0x10], r4
041c00: stxdw [r2 + 0x8], r1
041c08: stdw [r2 + 0x0], 0x1
041c10: ja +0x10f ; branch 0x42490
041c18: ldxdw r2, [r10 - 0x820]
041c20: ldxdw r3, [r10 - 0x960]
041c28: stxdw [r3 + 0x8], r1
041c30: stxdw [r3 + 0x10], r2
041c38: stdw [r3 + 0x0], 0x1
041c40: ja +0xfa ; branch 0x42418
041c48: ldxdw r2, [r6 + 0x8]
041c50: ldxdw r1, [r2 + 0x20]
041c58: ldxdw r1, [r1 + 0x0]
041c60: stxdw [r10 - 0x9d8], r2
041c68: ldxdw r4, [r2 + 0x68]
041c70: ldxdw r2, [r1 + 0x18]
041c78: stxdw [r10 - 0x738], r2
041c80: ldxdw r2, [r1 + 0x10]
041c88: stxdw [r10 - 0x740], r2
041c90: ldxdw r2, [r1 + 0x8]
041c98: stxdw [r10 - 0x748], r2
041ca0: ldxdw r1, [r1 + 0x0]
041ca8: stxdw [r10 - 0x750], r1
041cb0: jeq r3, 0x0, +0x1 ; branch 0x41cc0
041cb8: ja -0x71 ; branch 0x41938
041cc0: stxdw [r10 - 0x9d0], r4
041cc8: stxdw [r10 - 0x9e0], r8
041cd0: mov64 r1, 0x0
041cd8: stxdw [r10 - 0x9e8], r1
041ce0: stdw [r10 - 0x718], 0x0
041ce8: stdw [r10 - 0x720], 0x0
041cf0: stdw [r10 - 0x728], 0x0
041cf8: stdw [r10 - 0x730], 0x0
041d00: ja +0x2f ; branch 0x41e80
041d08: ldxdw r2, [r10 - 0x648]
041d10: ldxdw r3, [r10 - 0x960]
041d18: stxdw [r3 + 0x10], r2
041d20: stxdw [r3 + 0x8], r1
041d28: stdw [r3 + 0x0], 0x1
041d30: ldxdw r1, [r10 - 0x3e0]
041d38: ldxdw r2, [r10 - 0x3e8]
041d40: ldxdw r3, [r2 + 0x0]
041d48: add64 r3, -0x1
041d50: stxdw [r2 + 0x0], r3
041d58: ldxdw r9, [r10 - 0x9a8]
041d60: jne r3, 0x0, +0x3 ; branch 0x41d80
041d68: ldxdw r3, [r2 + 0x8]
041d70: add64 r3, -0x1
041d78: stxdw [r2 + 0x8], r3
041d80: ldxdw r2, [r1 + 0x0]
041d88: add64 r2, -0x1
041d90: stxdw [r1 + 0x0], r2
041d98: jne r2, 0x0, +0xcf ; branch 0x42418
041da0: ldxdw r2, [r1 + 0x8]
041da8: add64 r2, -0x1
041db0: stxdw [r1 + 0x8], r2
041db8: ja +0xcb ; branch 0x42418
041dc0: stxdw [r10 - 0x9c8], r5
041dc8: stxdw [r10 - 0x9e0], r8
041dd0: mov64 r1, 0x0
041dd8: stxdw [r10 - 0x9d0], r1
041de0: stdw [r10 - 0x5d8], 0x0
041de8: stdw [r10 - 0x5e0], 0x0
041df0: stdw [r10 - 0x5e8], 0x0
041df8: stdw [r10 - 0x5f0], 0x0
041e00: stxdw [r10 - 0x9e8], r1
041e08: ldxdw r1, [r10 - 0x5d8]
041e10: stxdw [r10 - 0x718], r1
041e18: ldxdw r1, [r10 - 0x5e0]
041e20: stxdw [r10 - 0x720], r1
041e28: ldxdw r1, [r10 - 0x5e8]
041e30: stxdw [r10 - 0x728], r1
041e38: ldxdw r1, [r10 - 0x5f0]
041e40: stxdw [r10 - 0x730], r1
041e48: ldxdw r1, [r10 - 0x9b0]
041e50: jeq r1, 0x2, +0x57 ; branch 0x42110
041e58: jeq r1, 0x1, +0x2d ; branch 0x41fc8
041e60: ldxdw r6, [r10 - 0x968]
041e68: ldxdw r1, [r6 + 0x8]
041e70: stxdw [r10 - 0x9d8], r1
041e78: ldxdw r5, [r10 - 0x9c8]
041e80: ldxdw r1, [r5 + 0x0]
041e88: stxdw [r10 - 0x970], r1
041e90: ldxdw r8, [r0 + 0x0]
041e98: ldxdw r2, [r6 + 0x0]
041ea0: mov64 r6, r10
041ea8: add64 r6, -0x3f0
041eb0: mov64 r1, r6
041eb8: call -0x67a9 ; call 0xe178
041ec0: ldxdw r1, [r10 - 0x990]
041ec8: stxdw [r10 - 0xff0], r1
041ed0: stxdw [r10 - 0xff8], r6
041ed8: stxdw [r10 - 0x1000], r8
041ee0: stdw [r10 - 0xfe8], 0x8
041ee8: stdw [r10 - 0xfe0], 0x0
041ef0: mov64 r1, r10
041ef8: add64 r1, -0x848
041f00: mov64 r5, r10
041f08: ldxdw r2, [r10 - 0x9b8]
041f10: ldxdw r3, [r10 - 0x970]
041f18: ldxdw r4, [r10 - 0x9d8]
041f20: call 0x6112 ; call 0x727b8
041f28: ldxdw r1, [r10 - 0x848]
041f30: jeq r1, 0x2, +0x1 ; branch 0x41f40
041f38: ja +0x70 ; branch 0x422c0
041f40: ldxdw r1, [r10 - 0x3e0]
041f48: ldxdw r2, [r10 - 0x3e8]
041f50: ldxdw r3, [r2 + 0x0]
041f58: add64 r3, -0x1
041f60: stxdw [r2 + 0x0], r3
041f68: jne r3, 0x0, +0x3 ; branch 0x41f88
041f70: ldxdw r3, [r2 + 0x8]
041f78: add64 r3, -0x1
041f80: stxdw [r2 + 0x8], r3
041f88: ldxdw r2, [r1 + 0x0]
041f90: add64 r2, -0x1
041f98: stxdw [r1 + 0x0], r2
041fa0: jne r2, 0x0, +0x2d ; branch 0x42110
041fa8: ldxdw r2, [r1 + 0x8]
041fb0: add64 r2, -0x1
041fb8: stxdw [r1 + 0x8], r2
041fc0: ja +0x29 ; branch 0x42110
041fc8: ldxdw r1, [r10 - 0x970]
041fd0: ldxb r2, [r1 + 0x1]
041fd8: mov64 r1, 0x20
041fe0: jeq r2, 0x0, +0x1 ; branch 0x41ff0
041fe8: mov64 r1, 0x18
041ff0: ldxdw r2, [r10 - 0x970]
041ff8: ldxdw r6, [r2 + 0x8]
042000: mov64 r2, r6
042008: add64 r2, r1
042010: ldxdw r1, [r2 + 0x0]
042018: stxdw [r10 - 0x970], r1
042020: ldxdw r1, [r1 + 0x20]
042028: ldxdw r1, [r1 + 0x0]
042030: ldxdw r2, [r1 + 0x18]
042038: stxdw [r10 - 0x5d8], r2
042040: ldxdw r2, [r1 + 0x10]
042048: stxdw [r10 - 0x5e0], r2
042050: ldxdw r2, [r1 + 0x8]
042058: stxdw [r10 - 0x5e8], r2
042060: ldxdw r1, [r1 + 0x0]
042068: stxdw [r10 - 0x5f0], r1
042070: ldxdw r8, [r0 + 0x0]
042078: ldxdw r1, [r8 + 0x20]
042080: ldxdw r1, [r1 + 0x0]
042088: ldxdw r2, [r1 + 0x18]
042090: stxdw [r10 - 0x3d8], r2
042098: ldxdw r2, [r1 + 0x10]
0420a0: stxdw [r10 - 0x3e0], r2
0420a8: ldxdw r2, [r1 + 0x8]
0420b0: stxdw [r10 - 0x3e8], r2
0420b8: ldxdw r1, [r1 + 0x0]
0420c0: stxdw [r10 - 0x3f0], r1
0420c8: mov64 r1, r10
0420d0: add64 r1, -0x5f0
0420d8: mov64 r2, r10
0420e0: add64 r2, -0x3f0
0420e8: mov64 r3, 0x20
0420f0: call 0x1aefd ; call 0x1198e0
0420f8: lsh64 r0, 0x20
042100: rsh64 r0, 0x20
042108: jne r0, 0x0, +0x4c ; branch 0x42370
042110: ldxdw r1, [r10 - 0x9a0]
042118: ldxdw r2, [r1 + 0x0]
042120: add64 r2, 0x20
042128: mov64 r1, r10
042130: add64 r1, -0x858
042138: call -0x78cf ; call 0x5ac8
042140: ldxdw r1, [r10 - 0x858]
042148: jeq r1, 0x2, +0x1 ; branch 0x42158
042150: ja +0x2b ; branch 0x422b0
042158: ldxdw r1, [r10 - 0x9c0]
042160: ldxdw r2, [r1 + 0x0]
042168: add64 r2, 0x20
042170: mov64 r1, r10
042178: add64 r1, -0x868
042180: call -0x78d8 ; call 0x5ac8
042188: ldxdw r1, [r10 - 0x868]
042190: jeq r1, 0x2, +0x1 ; branch 0x421a0
042198: ja +0x38 ; branch 0x42360
0421a0: ldxdw r1, [r9 + 0x0]
0421a8: ldxdw r2, [r1 + 0x58]
0421b0: mov64 r6, r10
0421b8: add64 r6, -0x3f0
0421c0: mov64 r1, r6
0421c8: call -0x680b ; call 0xe178
0421d0: mov64 r1, r10
0421d8: add64 r1, -0x5f0
0421e0: mov64 r2, r6
0421e8: call 0x63e7 ; call 0x74128
0421f0: ldxdw r2, [r10 - 0x5e0]
0421f8: ldxdw r1, [r10 - 0x5e8]
042200: ldxdw r3, [r10 - 0x5f0]
042208: jeq r3, 0x2, +0x1 ; branch 0x42218
042210: ja +0x5d ; branch 0x42500
042218: ldxdw r3, [r10 - 0x960]
042220: stxdw [r3 + 0x10], r2
042228: stxdw [r3 + 0x8], r1
042230: stdw [r3 + 0x0], 0x1
042238: ldxdw r1, [r10 - 0x3e0]
042240: ldxdw r2, [r10 - 0x3e8]
042248: ldxdw r3, [r2 + 0x0]
042250: add64 r3, -0x1
042258: stxdw [r2 + 0x0], r3
042260: jne r3, 0x0, +0x3 ; branch 0x42280
042268: ldxdw r3, [r2 + 0x8]
042270: add64 r3, -0x1
042278: stxdw [r2 + 0x8], r3
042280: ldxdw r2, [r1 + 0x0]
042288: add64 r2, -0x1
042290: stxdw [r1 + 0x0], r2
042298: ldxdw r9, [r10 - 0x9a8]
0422a0: jne r2, 0x0, +0x2e ; branch 0x42418
0422a8: ja -0xa2 ; branch 0x41da0
0422b0: ldxdw r2, [r10 - 0x850]
0422b8: ja +0x26 ; branch 0x423f0
0422c0: ldxdw r2, [r10 - 0x840]
0422c8: ldxdw r3, [r10 - 0x960]
0422d0: stxdw [r3 + 0x8], r1
0422d8: stxdw [r3 + 0x10], r2
0422e0: stdw [r3 + 0x0], 0x1
0422e8: ldxdw r1, [r10 - 0x3e0]
0422f0: ldxdw r2, [r10 - 0x3e8]
0422f8: ldxdw r3, [r2 + 0x0]
042300: add64 r3, -0x1
042308: stxdw [r2 + 0x0], r3
042310: jne r3, 0x0, +0x3 ; branch 0x42330
042318: ldxdw r3, [r2 + 0x8]
042320: add64 r3, -0x1
042328: stxdw [r2 + 0x8], r3
042330: ldxdw r2, [r1 + 0x0]
042338: add64 r2, -0x1
042340: stxdw [r1 + 0x0], r2
042348: ldxdw r9, [r10 - 0x9a8]
042350: jne r2, 0x0, +0x18 ; branch 0x42418
042358: ja -0xb8 ; branch 0x41da0
042360: ldxdw r2, [r10 - 0x860]
042368: ja +0x10 ; branch 0x423f0
042370: ldxdw r1, [r10 - 0x9c8]
042378: ldxdw r3, [r1 + 0x0]
042380: ldxdw r1, [r6 + 0x10]
042388: ldxdw r2, [r10 - 0x990]
042390: stxdw [r10 - 0xff8], r2
042398: stxdw [r10 - 0xff0], r1
0423a0: stxdw [r10 - 0x1000], r8
0423a8: mov64 r1, r10
0423b0: add64 r1, -0x838
0423b8: mov64 r5, r10
0423c0: ldxdw r2, [r10 - 0x9b8]
0423c8: ldxdw r4, [r10 - 0x970]
0423d0: call 0x5faa ; call 0x72128
0423d8: ldxdw r1, [r10 - 0x838]
0423e0: jeq r1, 0x2, -0x5b ; branch 0x42110
0423e8: ldxdw r2, [r10 - 0x830]
0423f0: ldxdw r3, [r10 - 0x960]
0423f8: stxdw [r3 + 0x8], r1
042400: stxdw [r3 + 0x10], r2
042408: stdw [r3 + 0x0], 0x1
042410: ldxdw r9, [r10 - 0x9a8]
042418: ldxdw r2, [r9 + 0x0]
042420: add64 r2, -0x1
042428: ldxdw r1, [r10 - 0x770]
042430: stxdw [r9 + 0x0], r2
042438: jne r2, 0x0, +0x3 ; branch 0x42458
042440: ldxdw r2, [r9 + 0x8]
042448: add64 r2, -0x1
042450: stxdw [r9 + 0x8], r2
042458: ldxdw r2, [r1 + 0x0]
042460: add64 r2, -0x1
042468: stxdw [r1 + 0x0], r2
042470: jne r2, 0x0, +0x3 ; branch 0x42490
042478: ldxdw r2, [r1 + 0x8]
042480: add64 r2, -0x1
042488: stxdw [r1 + 0x8], r2
042490: ldxdw r1, [r10 - 0x7a0]
042498: ldxdw r2, [r10 - 0x7a8]
0424a0: ldxdw r3, [r2 + 0x0]
0424a8: add64 r3, -0x1
0424b0: stxdw [r2 + 0x0], r3
0424b8: jne r3, 0x0, +0x3 ; branch 0x424d8
0424c0: ldxdw r3, [r2 + 0x8]
0424c8: add64 r3, -0x1
0424d0: stxdw [r2 + 0x8], r3
0424d8: ldxdw r2, [r1 + 0x0]
0424e0: add64 r2, -0x1
0424e8: stxdw [r1 + 0x0], r2
0424f0: jne r2, 0x0, -0x122 ; branch 0x41be8
0424f8: ja +0x304 ; branch 0x43d20
042500: ldxdw r4, [r10 - 0x5d8]
042508: stxdw [r10 - 0x6f8], r4
042510: stxdw [r10 - 0x700], r2
042518: stxdw [r10 - 0x708], r1
042520: stxdw [r10 - 0x710], r3
042528: ldxdw r1, [r10 - 0x3e0]
042530: ldxdw r2, [r10 - 0x3e8]
042538: ldxdw r3, [r2 + 0x0]
042540: add64 r3, -0x1
042548: stxdw [r2 + 0x0], r3
042550: jne r3, 0x0, +0x3 ; branch 0x42570
042558: ldxdw r3, [r2 + 0x8]
042560: add64 r3, -0x1
042568: stxdw [r2 + 0x8], r3
042570: ldxdw r2, [r1 + 0x0]
042578: add64 r2, -0x1
042580: stxdw [r1 + 0x0], r2
042588: ldxdw r6, [r10 - 0x968]
042590: ldxdw r3, [r10 - 0x990]
042598: ldxdw r4, [r10 - 0x980]
0425a0: jne r2, 0x0, +0x3 ; branch 0x425c0
0425a8: ldxdw r2, [r1 + 0x8]
0425b0: add64 r2, -0x1
0425b8: stxdw [r1 + 0x8], r2
0425c0: mov64 r1, r4
0425c8: lsh64 r1, 0x20
0425d0: rsh64 r1, 0x20
0425d8: jeq r1, 0x0, +0xb ; branch 0x42638
0425e0: ldxdw r1, [r10 - 0x9a0]
0425e8: ldxdw r1, [r1 + 0x0]
0425f0: ldxdw r1, [r1 + 0x68]
0425f8: jlt r1, r3, +0x1 ; branch 0x42608
042600: ja +0x1d ; branch 0x426f0
042608: mov64 r1, r10
042610: add64 r1, -0x878
042618: call 0x451 ; call 0x448a8
042620: ldxdw r1, [r10 - 0x870]
042628: ldxdw r2, [r10 - 0x878]
042630: ja +0x13 ; branch 0x426d0
042638: mov64 r1, r10
042640: add64 r1, -0x3f0
042648: mov64 r2, r10
042650: add64 r2, -0x710
042658: call 0x6454 ; call 0x74900
042660: ldxdw r1, [r10 - 0x3f0]
042668: jeq r1, 0x2, +0x1 ; branch 0x42678
042670: ja +0x15 ; branch 0x42720
042678: ldxdw r2, [r10 - 0x3e8]
042680: ldxdw r1, [r10 - 0x9c0]
042688: ldxdw r1, [r1 + 0x0]
042690: ldxdw r8, [r1 + 0x68]
042698: jlt r8, r2, +0x1 ; branch 0x426a8
0426a0: ja +0x14 ; branch 0x42748
0426a8: mov64 r1, r10
0426b0: add64 r1, -0x958
0426b8: call 0x3fc ; call 0x446a0
0426c0: ldxdw r1, [r10 - 0x950]
0426c8: ldxdw r2, [r10 - 0x958]
0426d0: ldxdw r3, [r10 - 0x960]
0426d8: stxdw [r3 + 0x8], r2
0426e0: stxdw [r3 + 0x10], r1
0426e8: ja -0x5d ; branch 0x42408
0426f0: sub64 r1, r3
0426f8: ldxdw r2, [r10 - 0x9c0]
042700: ldxdw r2, [r2 + 0x0]
042708: ldxdw r8, [r2 + 0x68]
042710: stxdw [r10 - 0x970], r3
042718: ja +0xa ; branch 0x42770
042720: ldxdw r2, [r10 - 0x3e8]
042728: ldxdw r3, [r10 - 0x960]
042730: stxdw [r3 + 0x10], r2
042738: stxdw [r3 + 0x8], r1
042740: ja -0x68 ; branch 0x42408
042748: stxdw [r10 - 0x970], r2
042750: sub64 r8, r2
042758: ldxdw r1, [r10 - 0x9a0]
042760: ldxdw r1, [r1 + 0x0]
042768: ldxdw r1, [r1 + 0x68]
042770: stxdw [r10 - 0x6f0], r1
042778: ldxdw r6, [r10 - 0x9e0]
042780: ldxdw r2, [r6 + 0x0]
042788: add64 r2, 0x8
042790: mov64 r1, r10
042798: add64 r1, -0x3f0
0427a0: mov64 r3, r8
0427a8: call 0x1a62 ; call 0x4fac0
0427b0: ldxdw r3, [r10 - 0x3e8]
0427b8: ldxdw r1, [r10 - 0x3f0]
0427c0: jeq r1, 0x0, +0x6 ; branch 0x427f8
0427c8: ldxdw r1, [r10 - 0x3e0]
0427d0: ldxdw r2, [r10 - 0x960]
0427d8: stxdw [r2 + 0x10], r1
0427e0: stxdw [r2 + 0x8], r3
0427e8: stdw [r2 + 0x0], 0x1
0427f0: ja -0x7d ; branch 0x42410
0427f8: stxdw [r10 - 0x9a8], r3
042800: stxdw [r10 - 0x9b0], r8
042808: stxdw [r10 - 0x9a0], r9
042810: stxdw [r10 - 0x9e0], r6
042818: ldxdw r1, [r10 - 0x3e0]
042820: stxdw [r10 - 0x6e8], r1
042828: ldxdw r1, [r7 + 0x10]
042830: ldxdw r2, [r1 + 0xf0]
042838: stxdw [r10 - 0x9c8], r2
042840: ldxdw r1, [r1 + 0xe8]
042848: stxdw [r10 - 0x9b8], r1
042850: ldxdw r1, [r7 + 0x0]
042858: ldxdw r1, [r1 + 0x28]
042860: stxdw [r10 - 0x6e0], r1
042868: ldxdw r8, [r10 - 0x968]
042870: ldxdw r1, [r8 + 0x20]
042878: ldxdw r2, [r1 + 0x88]
042880: mov64 r6, r10
042888: add64 r6, -0x3f0
042890: mov64 r1, r6
042898: call -0x68e5 ; call 0xe178
0428a0: mov64 r1, r6
0428a8: call 0x18cd3 ; call 0x108f48
0428b0: stxdw [r10 - 0x6d8], r0
0428b8: ldxdw r1, [r10 - 0x3e0]
0428c0: ldxdw r2, [r10 - 0x3e8]
0428c8: ldxdw r3, [r2 + 0x0]
0428d0: add64 r3, -0x1
0428d8: stxdw [r2 + 0x0], r3
0428e0: jne r3, 0x0, +0x3 ; branch 0x42900
0428e8: ldxdw r3, [r2 + 0x8]
0428f0: add64 r3, -0x1
0428f8: stxdw [r2 + 0x8], r3
042900: ldxdw r3, [r1 + 0x0]
042908: add64 r3, -0x1
042910: stxdw [r1 + 0x0], r3
042918: ldxdw r2, [r10 - 0x990]
042920: ldxdw r9, [r10 - 0x980]
042928: jne r3, 0x0, +0x3 ; branch 0x42948
042930: ldxdw r3, [r1 + 0x8]
042938: add64 r3, -0x1
042940: stxdw [r1 + 0x8], r3
042948: ldxdw r1, [r8 + 0x18]
042950: mov64 r3, r10
042958: add64 r3, -0x7b4
042960: stxdw [r10 - 0x698], r3
042968: mov64 r3, r10
042970: add64 r3, -0x6e8
042978: stxdw [r10 - 0x6a0], r3
042980: mov64 r3, r10
042988: add64 r3, -0x6f0
042990: stxdw [r10 - 0x6a8], r3
042998: mov64 r3, r10
0429a0: add64 r3, -0x6e0
0429a8: stxdw [r10 - 0x6b0], r3
0429b0: mov64 r3, r10
0429b8: add64 r3, -0x6d8
0429c0: stxdw [r10 - 0x6b8], r3
0429c8: stxdw [r10 - 0x6c0], r8
0429d0: stxdw [r10 - 0x6c8], r1
0429d8: ldxdw r1, [r10 - 0x9e0]
0429e0: stxdw [r10 - 0x6d0], r1
0429e8: lsh64 r9, 0x20
0429f0: rsh64 r9, 0x20
0429f8: jeq r9, 0x0, +0x2e ; branch 0x42b70
042a00: ldxdw r3, [r10 - 0x6f0]
042a08: ldxdw r4, [r10 - 0x6e8]
042a10: mov64 r1, r10
042a18: add64 r1, -0x3f0
042a20: call -0x6177 ; call 0x11e70
042a28: ldxdw r1, [r10 - 0x3f0]
042a30: jeq r1, 0x2, +0x1 ; branch 0x42a40
042a38: ja +0x1aa ; branch 0x43790
042a40: ldxdw r8, [r10 - 0x3e8]
042a48: mov64 r1, r10
042a50: add64 r1, -0x3f0
042a58: mov64 r2, r10
042a60: add64 r2, -0x6d0
042a68: mov64 r3, r8
042a70: call 0x407 ; call 0x44ab0
042a78: ldxdw r2, [r10 - 0x3e0]
042a80: ldxdw r1, [r10 - 0x3e8]
042a88: ldxdw r3, [r10 - 0x3f0]
042a90: jeq r3, 0x0, +0x1 ; branch 0x42aa0
042a98: ja +0x19f ; branch 0x43798
042aa0: ldxdw r3, [r10 - 0x3c0]
042aa8: stxdw [r10 - 0x628], r3
042ab0: ldxdw r3, [r10 - 0x3c8]
042ab8: stxdw [r10 - 0x630], r3
042ac0: ldxdw r3, [r10 - 0x3d0]
042ac8: stxdw [r10 - 0x638], r3
042ad0: ldxdw r3, [r10 - 0x3d8]
042ad8: stxdw [r10 - 0x640], r3
042ae0: stxdw [r10 - 0x648], r2
042ae8: stxdw [r10 - 0x650], r1
042af0: mov64 r1, r10
042af8: add64 r1, -0x3f0
042b00: mov64 r3, r10
042b08: add64 r3, -0x650
042b10: mov64 r2, r8
042b18: ldxdw r4, [r10 - 0x9a8]
042b20: call 0x1d77 ; call 0x516e0
042b28: ldxdw r6, [r10 - 0x3e8]
042b30: ldxdw r1, [r10 - 0x3f0]
042b38: jeq r1, 0x0, +0x3f ; branch 0x42d38
042b40: ldxdw r1, [r10 - 0x3e0]
042b48: ldxdw r2, [r10 - 0x960]
042b50: stxdw [r2 + 0x10], r1
042b58: stxdw [r2 + 0x8], r6
042b60: stdw [r2 + 0x0], 0x1
042b68: ja +0x189 ; branch 0x437b8
042b70: mov64 r1, r10
042b78: add64 r1, -0x3f0
042b80: mov64 r2, r10
042b88: add64 r2, -0x6d0
042b90: ldxdw r3, [r10 - 0x970]
042b98: call 0x3e2 ; call 0x44ab0
042ba0: ldxdw r2, [r10 - 0x3e0]
042ba8: ldxdw r1, [r10 - 0x3e8]
042bb0: ldxdw r3, [r10 - 0x3f0]
042bb8: jeq r3, 0x0, +0x1 ; branch 0x42bc8
042bc0: ja +0x17a ; branch 0x43798
042bc8: ldxdw r3, [r10 - 0x3c0]
042bd0: stxdw [r10 - 0x668], r3
042bd8: ldxdw r3, [r10 - 0x3c8]
042be0: stxdw [r10 - 0x670], r3
042be8: ldxdw r3, [r10 - 0x3d0]
042bf0: stxdw [r10 - 0x678], r3
042bf8: ldxdw r3, [r10 - 0x3d8]
042c00: stxdw [r10 - 0x680], r3
042c08: stxdw [r10 - 0x688], r2
042c10: stxdw [r10 - 0x690], r1
042c18: ldxdw r1, [r10 - 0x9e0]
042c20: ldxdw r2, [r1 + 0x0]
042c28: add64 r2, 0x8
042c30: mov64 r1, r10
042c38: add64 r1, -0x3f0
042c40: mov64 r3, r10
042c48: add64 r3, -0x690
042c50: ldxdw r4, [r10 - 0x970]
042c58: call 0x1c54 ; call 0x50f00
042c60: ldxdw r1, [r10 - 0x3f0]
042c68: jeq r1, 0x0, +0x3 ; branch 0x42c88
042c70: ldxdw r1, [r10 - 0x3e8]
042c78: ldxdw r2, [r10 - 0x3e0]
042c80: ja +0x162 ; branch 0x43798
042c88: ldxdw r1, [r10 - 0x3d8]
042c90: stxdw [r10 - 0x660], r1
042c98: ldxdw r1, [r10 - 0x3d0]
042ca0: stxdw [r10 - 0x658], r1
042ca8: ldxdw r6, [r10 - 0x3c8]
042cb0: ldxdw r1, [r10 - 0x970]
042cb8: jlt r1, r6, +0x9 ; branch 0x42d08
042cc0: ldxdw r1, [r10 - 0x3c0]
042cc8: ldxdw r8, [r10 - 0x970]
042cd0: sub64 r8, r6
042cd8: mov64 r9, r1
042ce0: jlt r8, r1, +0x4 ; branch 0x42d08
042ce8: ldxdw r1, [r10 - 0x3b8]
042cf0: sub64 r8, r9
042cf8: stxdw [r10 - 0x980], r1
042d00: jge r8, r1, +0x55 ; branch 0x42fb0
042d08: mov64 r1, r10
042d10: add64 r1, -0x948
042d18: call 0x3f5 ; call 0x44cc8
042d20: ldxdw r1, [r10 - 0x948]
042d28: ldxdw r2, [r10 - 0x940]
042d30: ja +0x14c ; branch 0x43798
042d38: ldxdw r1, [r10 - 0x3e0]
042d40: mov64 r9, r1
042d48: jeq r1, 0x0, +0x13 ; branch 0x42de8
042d50: mov64 r1, r10
042d58: add64 r1, -0x3f0
042d60: mov64 r2, r10
042d68: add64 r2, -0x710
042d70: mov64 r3, r9
042d78: call 0x6370 ; call 0x74900
042d80: ldxdw r1, [r10 - 0x3f0]
042d88: jeq r1, 0x2, +0x1 ; branch 0x42d98
042d90: ja +0x13f ; branch 0x43790
042d98: ldxdw r1, [r10 - 0x3e8]
042da0: stxdw [r10 - 0x970], r1
042da8: jlt r9, r1, +0x1 ; branch 0x42db8
042db0: ja +0x25 ; branch 0x42ee0
042db8: mov64 r1, r10
042dc0: add64 r1, -0x8a8
042dc8: call 0x461 ; call 0x450d8
042dd0: ldxdw r1, [r10 - 0x8a8]
042dd8: ldxdw r2, [r10 - 0x8a0]
042de0: ja +0x136 ; branch 0x43798
042de8: mov64 r1, r10
042df0: add64 r1, -0x3d0
042df8: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
042e08: call 0x64bd ; call 0x753f8
042e10: mov64 r1, r10
042e18: add64 r1, -0x3b8
042e20: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
042e30: call -0x74d3 ; call 0x87a0
042e38: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
042e48: stxdw [r10 - 0x3e8], r1
042e50: stb [r10 - 0x3a0], 0x2
042e58: stw [r10 - 0x3d8], 0x2c8
042e60: stdw [r10 - 0x3e0], 0x39
042e68: stdw [r10 - 0x3f0], 0x0
042e70: stw [r10 - 0x358], 0x1772
042e78: mov64 r1, r10
042e80: add64 r1, -0x8b8
042e88: mov64 r2, r10
042e90: add64 r2, -0x3f0
042e98: call 0x18023 ; call 0x102fb8
042ea0: ldxdw r3, [r10 - 0x8b0]
042ea8: ldxdw r2, [r10 - 0x8b8]
042eb0: mov64 r1, r10
042eb8: add64 r1, -0x8c8
042ec0: call -0x8571 ; call 0x340
042ec8: ldxdw r1, [r10 - 0x8c8]
042ed0: ldxdw r2, [r10 - 0x8c0]
042ed8: ja +0x117 ; branch 0x43798
042ee0: ldxdw r1, [r10 - 0x988]
042ee8: jne r1, 0x1, +0x4c ; branch 0x43150
042ef0: ldxdw r1, [r10 - 0x9c0]
042ef8: ldxdw r4, [r1 + 0x0]
042f00: ldxdw r1, [r10 - 0x9a0]
042f08: ldxdw r3, [r1 + 0x0]
042f10: ldxdw r1, [r10 - 0x968]
042f18: ldxdw r1, [r1 + 0x10]
042f20: ldxdw r2, [r10 - 0x9e0]
042f28: ldxdw r2, [r2 + 0x0]
042f30: stxdw [r10 - 0xff8], r9
042f38: stxdw [r10 - 0xff0], r2
042f40: stxdw [r10 - 0x1000], r1
042f48: mov64 r1, r10
042f50: add64 r1, -0x888
042f58: mov64 r2, r10
042f60: add64 r2, -0x780
042f68: mov64 r5, r10
042f70: call 0x5e36 ; call 0x72128
042f78: ldxdw r1, [r10 - 0x888]
042f80: jeq r1, 0x2, +0x39 ; branch 0x43150
042f88: ldxdw r2, [r10 - 0x880]
042f90: ldxdw r3, [r10 - 0x960]
042f98: stxdw [r3 + 0x8], r1
042fa0: stxdw [r3 + 0x10], r2
042fa8: ja +0x100 ; branch 0x437b0
042fb0: ldxdw r1, [r10 - 0x3e0]
042fb8: stxdw [r10 - 0x9a8], r1
042fc0: ldxdw r1, [r10 - 0x980]
042fc8: sub64 r8, r1
042fd0: ldxdw r3, [r10 - 0x6f0]
042fd8: ldxdw r4, [r10 - 0x6e8]
042fe0: mov64 r1, r10
042fe8: add64 r1, -0x3f0
042ff0: mov64 r2, r8
042ff8: call -0x619e ; call 0x12310
043000: ldxdw r1, [r10 - 0x3f0]
043008: jne r1, 0x2, +0xf0 ; branch 0x43790
043010: ldxdw r1, [r10 - 0x3e8]
043018: stxdw [r10 - 0x9a0], r1
043020: jeq r1, 0x0, +0x99 ; branch 0x434f0
043028: ldxdw r1, [r10 - 0x6f0]
043030: ldxdw r2, [r10 - 0x9a0]
043038: jlt r1, r2, +0x1 ; branch 0x43048
043040: ja +0xb4 ; branch 0x435e8
043048: mov64 r1, r10
043050: add64 r1, -0x3d0
043058: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
043068: call 0x6471 ; call 0x753f8
043070: mov64 r1, r10
043078: add64 r1, -0x3b8
043080: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
043090: call -0x751f ; call 0x87a0
043098: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
0430a8: stxdw [r10 - 0x3e8], r1
0430b0: stb [r10 - 0x3a0], 0x2
0430b8: stw [r10 - 0x3d8], 0x283
0430c0: stdw [r10 - 0x3e0], 0x39
0430c8: stdw [r10 - 0x3f0], 0x0
0430d0: stw [r10 - 0x358], 0x1773
0430d8: mov64 r1, r10
0430e0: add64 r1, -0x908
0430e8: mov64 r2, r10
0430f0: add64 r2, -0x3f0
0430f8: call 0x17fd7 ; call 0x102fb8
043100: ldxdw r3, [r10 - 0x900]
043108: ldxdw r2, [r10 - 0x908]
043110: ldxdw r4, [r10 - 0x6f0]
043118: mov64 r1, r10
043120: add64 r1, -0x918
043128: ldxdw r5, [r10 - 0x9a0]
043130: call -0x831f ; call 0x1840
043138: ldxdw r1, [r10 - 0x918]
043140: ldxdw r2, [r10 - 0x910]
043148: ja +0xc9 ; branch 0x43798
043150: ldxdw r1, [r10 - 0x968]
043158: ldxdw r3, [r1 + 0x30]
043160: ldxdw r2, [r1 + 0x18]
043168: ldxdw r1, [r10 - 0x630]
043170: ldxh r4, [r10 - 0x7b4]
043178: ldxb r5, [r10 - 0x7b2]
043180: ldxdw r0, [r10 - 0x628]
043188: stxdw [r10 - 0xff0], r0
043190: lsh64 r5, 0x10
043198: or64 r4, r5
0431a0: stxdw [r10 - 0xfe8], r4
0431a8: stxdw [r10 - 0xff8], r1
0431b0: mov64 r1, r10
0431b8: add64 r1, -0x780
0431c0: stxdw [r10 - 0x1000], r1
0431c8: mov64 r1, r10
0431d0: add64 r1, -0x3f0
0431d8: mov64 r5, r10
0431e0: mov64 r4, r7
0431e8: call -0x52c ; call 0x40890
0431f0: ldxdw r1, [r10 - 0x3f0]
0431f8: jne r1, 0x2, +0xb2 ; branch 0x43790
043200: ldxdw r3, [r10 - 0x3e8]
043208: ldxdw r1, [r10 - 0x9e0]
043210: ldxdw r2, [r1 + 0x0]
043218: ldxdw r0, [r10 - 0x968]
043220: ldxdw r1, [r0 + 0x0]
043228: ldxdw r1, [r1 + 0x0]
043230: ldxdw r4, [r0 + 0x18]
043238: ldxdw r5, [r1 + 0x0]
043240: stxdw [r10 - 0xf0], r5
043248: ldxdw r5, [r1 + 0x8]
043250: stxdw [r10 - 0xe8], r5
043258: ldxdw r5, [r1 + 0x10]
043260: stxdw [r10 - 0xe0], r5
043268: ldxdw r1, [r1 + 0x18]
043270: stxdw [r10 - 0xd8], r1
043278: ldxdw r1, [r0 + 0x28]
043280: ldxdw r5, [r10 - 0x6e0]
043288: stxdw [r10 - 0xf8], r5
043290: add64 r4, 0x8
043298: stxdw [r10 - 0x108], r4
0432a0: stxdw [r10 - 0x110], r2
0432a8: ldxdw r2, [r10 - 0x750]
0432b0: stxdw [r10 - 0xd0], r2
0432b8: ldxdw r2, [r10 - 0x748]
0432c0: stxdw [r10 - 0xc8], r2
0432c8: ldxdw r2, [r10 - 0x740]
0432d0: stxdw [r10 - 0xc0], r2
0432d8: ldxdw r2, [r10 - 0x738]
0432e0: stxdw [r10 - 0xb8], r2
0432e8: ldxdw r2, [r10 - 0x730]
0432f0: stxdw [r10 - 0xb0], r2
0432f8: ldxdw r2, [r10 - 0x728]
043300: stxdw [r10 - 0xa8], r2
043308: ldxdw r2, [r10 - 0x720]
043310: stxdw [r10 - 0xa0], r2
043318: ldxdw r2, [r10 - 0x718]
043320: stxdw [r10 - 0x98], r2
043328: add64 r1, 0x8
043330: stxdw [r10 - 0x100], r1
043338: ldxdw r7, [r10 - 0x6f0]
043340: mov64 r1, r10
043348: add64 r1, -0x690
043350: mov64 r2, r10
043358: add64 r2, -0x710
043360: call 0x62b3 ; call 0x74900
043368: ldxdw r1, [r10 - 0x690]
043370: jeq r1, 0x2, +0x1 ; branch 0x43380
043378: ja +0x2c ; branch 0x434e0
043380: mov64 r1, r9
043388: ldxdw r2, [r10 - 0x970]
043390: sub64 r1, r2
043398: mov64 r4, 0x0
0433a0: ldxdw r2, [r10 - 0x988]
0433a8: jeq r2, 0x0, +0x1 ; branch 0x433b8
0433b0: ldxdw r4, [r10 - 0x998]
0433b8: ldxdw r2, [r10 - 0x688]
0433c0: stxdw [r10 - 0xfb0], r2
0433c8: stxdw [r10 - 0xfa8], r1
0433d0: ldxdw r1, [r10 - 0x9c8]
0433d8: stxdw [r10 - 0xfb8], r1
0433e0: ldxdw r1, [r10 - 0x9b8]
0433e8: stxdw [r10 - 0xfc0], r1
0433f0: stxdw [r10 - 0xfc8], r9
0433f8: stxdw [r10 - 0xfd0], r6
043400: mov64 r1, r10
043408: add64 r1, -0x650
043410: stxdw [r10 - 0xfd8], r1
043418: stxdw [r10 - 0xfe0], r8
043420: ldxdw r1, [r10 - 0x9b0]
043428: stxdw [r10 - 0xfe8], r1
043430: stxdw [r10 - 0xff0], r7
043438: ldxdw r1, [r10 - 0x9e8]
043440: stxdw [r10 - 0xff8], r1
043448: ldxdw r1, [r10 - 0x9d0]
043450: stxdw [r10 - 0x1000], r1
043458: mov64 r1, r10
043460: add64 r1, -0x3f0
043468: mov64 r2, r10
043470: add64 r2, -0x110
043478: mov64 r5, r10
043480: ldxdw r3, [r10 - 0x990]
043488: call 0x1ef9 ; call 0x52c58
043490: ldxdw r7, [r10 - 0x3e8]
043498: ldxdw r6, [r10 - 0x3f0]
0434a0: ldxb r8, [r10 - 0x238]
0434a8: jeq r8, 0x2, +0x1 ; branch 0x434b8
0434b0: ja +0x62 ; branch 0x437c8
0434b8: ldxdw r1, [r10 - 0x960]
0434c0: stxdw [r1 + 0x10], r7
0434c8: stxdw [r1 + 0x8], r6
0434d0: stdw [r1 + 0x0], 0x1
0434d8: ja +0x5b ; branch 0x437b8
0434e0: ldxdw r2, [r10 - 0x688]
0434e8: ja +0x55 ; branch 0x43798
0434f0: mov64 r1, r10
0434f8: add64 r1, -0x3d0
043500: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
043510: call 0x63dc ; call 0x753f8
043518: mov64 r1, r10
043520: add64 r1, -0x3b8
043528: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
043538: call -0x75b4 ; call 0x87a0
043540: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
043550: stxdw [r10 - 0x3e8], r1
043558: stb [r10 - 0x3a0], 0x2
043560: stw [r10 - 0x3d8], 0x282
043568: stdw [r10 - 0x3e0], 0x39
043570: stdw [r10 - 0x3f0], 0x0
043578: stw [r10 - 0x358], 0x1771
043580: mov64 r1, r10
043588: add64 r1, -0x928
043590: mov64 r2, r10
043598: add64 r2, -0x3f0
0435a0: call 0x17f42 ; call 0x102fb8
0435a8: ldxdw r3, [r10 - 0x920]
0435b0: ldxdw r2, [r10 - 0x928]
0435b8: mov64 r1, r10
0435c0: add64 r1, -0x938
0435c8: call -0x8652 ; call 0x340
0435d0: ldxdw r1, [r10 - 0x938]
0435d8: ldxdw r2, [r10 - 0x930]
0435e0: ja +0x36 ; branch 0x43798
0435e8: ldxdw r1, [r10 - 0x988]
0435f0: jeq r1, 0x1, +0x1 ; branch 0x43600
0435f8: ja +0x13 ; branch 0x43698
043600: ldxdw r1, [r10 - 0x968]
043608: ldxdw r1, [r1 + 0x10]
043610: ldxdw r4, [r7 + 0x18]
043618: ldxdw r3, [r7 + 0x0]
043620: ldxdw r2, [r7 + 0x10]
043628: ldxdw r5, [r10 - 0x9a0]
043630: stxdw [r10 - 0xff8], r5
043638: stxdw [r10 - 0xff0], r2
043640: stxdw [r10 - 0x1000], r1
043648: mov64 r1, r10
043650: add64 r1, -0x8d8
043658: mov64 r2, r10
043660: add64 r2, -0x7b0
043668: mov64 r5, r10
043670: call 0x5d56 ; call 0x72128
043678: ldxdw r1, [r10 - 0x8d8]
043680: jeq r1, 0x2, +0x2 ; branch 0x43698
043688: ldxdw r2, [r10 - 0x8d0]
043690: ja -0xe1 ; branch 0x42f90
043698: ldxdw r1, [r10 - 0x968]
0436a0: ldxdw r3, [r1 + 0x30]
0436a8: ldxdw r2, [r1 + 0x18]
0436b0: ldxh r1, [r10 - 0x7b4]
0436b8: ldxb r4, [r10 - 0x7b2]
0436c0: ldxdw r5, [r10 - 0x980]
0436c8: stxdw [r10 - 0xff0], r5
0436d0: lsh64 r4, 0x10
0436d8: or64 r1, r4
0436e0: stxdw [r10 - 0xfe8], r1
0436e8: stxdw [r10 - 0xff8], r9
0436f0: mov64 r1, r10
0436f8: add64 r1, -0x780
043700: stxdw [r10 - 0x1000], r1
043708: mov64 r1, r10
043710: add64 r1, -0x3f0
043718: mov64 r5, r10
043720: mov64 r4, r7
043728: call -0x5d4 ; call 0x40890
043730: ldxdw r1, [r10 - 0x3f0]
043738: jne r1, 0x2, +0xa ; branch 0x43790
043740: ldxdw r1, [r10 - 0x990]
043748: ldxdw r2, [r10 - 0x970]
043750: jlt r1, r2, +0x1 ; branch 0x43760
043758: ja +0xd8 ; branch 0x43e20
043760: mov64 r1, r10
043768: add64 r1, -0x8f8
043770: call 0x2eb ; call 0x44ed0
043778: ldxdw r1, [r10 - 0x8f8]
043780: ldxdw r2, [r10 - 0x8f0]
043788: ja +0x1 ; branch 0x43798
043790: ldxdw r2, [r10 - 0x3e8]
043798: ldxdw r3, [r10 - 0x960]
0437a0: stxdw [r3 + 0x10], r2
0437a8: stxdw [r3 + 0x8], r1
0437b0: stdw [r3 + 0x0], 0x1
0437b8: ldxdw r9, [r10 - 0x778]
0437c0: ja -0x276 ; branch 0x42418
0437c8: mov64 r1, r10
0437d0: add64 r1, -0x5e0
0437d8: mov64 r2, r10
0437e0: add64 r2, -0x3e0
0437e8: mov64 r3, 0x1a8
0437f0: call 0x1ac14 ; call 0x119898
0437f8: ldxw r1, [r10 - 0x237]
043800: stxw [r10 - 0x437], r1
043808: ldxw r1, [r10 - 0x234]
043810: stxw [r10 - 0x434], r1
043818: stxb [r10 - 0x438], r8
043820: stxdw [r10 - 0x5e8], r7
043828: stxdw [r10 - 0x5f0], r6
043830: mov64 r1, r10
043838: add64 r1, -0x3f0
043840: mov64 r7, r10
043848: add64 r7, -0x5f0
043850: mov64 r2, r7
043858: call 0xeb8e ; call 0xb94d0
043860: ldxdw r1, [r10 - 0x3e0]
043868: stxdw [r10 - 0x108], r1
043870: ldxdw r1, [r10 - 0x3e8]
043878: stxdw [r10 - 0x110], r1
043880: mov64 r1, r10
043888: add64 r1, -0x110
043890: mov64 r2, 0x1
043898: call 0x1863c ; call 0x106a80
0438a0: ldxdw r2, [r10 - 0x968]
0438a8: add64 r2, 0x78
0438b0: mov64 r9, r10
0438b8: add64 r9, -0x90
0438c0: mov64 r1, r9
0438c8: call -0x6aeb ; call 0xe178
0438d0: mov64 r1, r10
0438d8: add64 r1, -0x60
0438e0: mov64 r2, r7
0438e8: call 0xeb7c ; call 0xb94d0
0438f0: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
043900: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
043910: add64 r2, 0x8
043918: stxdw [r10 - 0x20], r2
043920: stxdw [r10 - 0x28], r1
043928: ldxdw r1, [r10 - 0x60]
043930: stxdw [r10 - 0x38], r1
043938: ldxdw r1, [r10 - 0x58]
043940: stxdw [r10 - 0x40], r1
043948: stxdw [r10 - 0x48], r1
043950: ldxdw r2, [r10 - 0x50]
043958: add64 r1, r2
043960: stxdw [r10 - 0x30], r1
043968: mov64 r1, r10
043970: add64 r1, -0x138
043978: mov64 r2, r10
043980: add64 r2, -0x48
043988: call -0x6779 ; call 0xfdc8
043990: ldxdw r7, [r10 - 0x130]
043998: ldxdw r6, [r10 - 0x128]
0439a0: mov64 r1, 0x22
0439a8: mov64 r2, 0x1
0439b0: call -0x710a ; call 0xb168
0439b8: ldxdw r1, [r10 - 0x90]
0439c0: ldxdw r2, [r1 + 0x18]
0439c8: ldxdw r3, [r1 + 0x10]
0439d0: ldxdw r4, [r1 + 0x8]
0439d8: ldxdw r1, [r1 + 0x0]
0439e0: stxdw [r0 + 0x0], r1
0439e8: stxdw [r0 + 0x8], r4
0439f0: stxdw [r0 + 0x10], r3
0439f8: stxdw [r0 + 0x18], r2
043a00: sth [r0 + 0x20], 0x1
043a08: stxdw [r10 - 0x108], r0
043a10: stdw [r10 - 0x110], 0x1
043a18: stdw [r10 - 0x100], 0x1
043a20: mov64 r8, r10
043a28: add64 r8, -0x3f0
043a30: mov64 r5, r10
043a38: add64 r5, -0x110
043a40: mov64 r1, r8
043a48: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
043a58: mov64 r3, r7
043a60: mov64 r4, r6
043a68: call 0x1941c ; call 0x10db50
043a70: mov64 r7, r10
043a78: add64 r7, -0x110
043a80: mov64 r1, r7
043a88: mov64 r2, r9
043a90: mov64 r3, 0x30
043a98: call 0x1abbf ; call 0x119898
043aa0: mov64 r1, r10
043aa8: add64 r1, -0x690
043ab0: stxdw [r10 - 0x1a8], r1
043ab8: mov64 r1, r10
043ac0: add64 r1, -0x148
043ac8: stxdw [r10 - 0x680], r1
043ad0: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
043ae0: stxdw [r10 - 0x690], r1
043ae8: ldxdw r1, [r10 - 0x978]
043af0: stxb [r10 - 0x148], r1
043af8: stdw [r10 - 0x1a0], 0x2
043b00: stdw [r10 - 0x678], 0x1
043b08: stdw [r10 - 0x688], 0x11
043b10: mov64 r1, r10
043b18: add64 r1, -0x1a8
043b20: stxdw [r10 - 0x1000], r1
043b28: stdw [r10 - 0xff8], 0x1
043b30: mov64 r1, r10
043b38: add64 r1, -0x18
043b40: mov64 r5, r10
043b48: mov64 r2, r8
043b50: mov64 r3, r7
043b58: mov64 r4, 0x1
043b60: call 0x185ea ; call 0x106ab8
043b68: lddw r1, -0x7fffffffffffffe6
043b78: ldxdw r2, [r10 - 0x18]
043b80: jeq r2, r1, +0x1 ; branch 0x43b90
043b88: ja +0x36 ; branch 0x43d40
043b90: ldxdw r1, [r10 - 0x100]
043b98: ldxdw r2, [r10 - 0x108]
043ba0: ldxdw r3, [r2 + 0x0]
043ba8: add64 r3, -0x1
043bb0: stxdw [r2 + 0x0], r3
043bb8: jne r3, 0x0, +0x3 ; branch 0x43bd8
043bc0: ldxdw r3, [r2 + 0x8]
043bc8: add64 r3, -0x1
043bd0: stxdw [r2 + 0x8], r3
043bd8: ldxdw r2, [r1 + 0x0]
043be0: add64 r2, -0x1
043be8: stxdw [r1 + 0x0], r2
043bf0: jne r2, 0x0, +0x3 ; branch 0x43c10
043bf8: ldxdw r2, [r1 + 0x8]
043c00: add64 r2, -0x1
043c08: stxdw [r1 + 0x8], r2
043c10: ldxdw r1, [r10 - 0x960]
043c18: ldxdw r2, [r10 - 0x970]
043c20: stxdw [r1 + 0x8], r2
043c28: stb [r1 + 0x10], 0x0
043c30: stdw [r1 + 0x0], 0x0
043c38: ldxdw r1, [r10 - 0x770]
043c40: ldxdw r2, [r10 - 0x778]
043c48: ldxdw r3, [r2 + 0x0]
043c50: add64 r3, -0x1
043c58: stxdw [r2 + 0x0], r3
043c60: jne r3, 0x0, +0x3 ; branch 0x43c80
043c68: ldxdw r3, [r2 + 0x8]
043c70: add64 r3, -0x1
043c78: stxdw [r2 + 0x8], r3
043c80: ldxdw r2, [r1 + 0x0]
043c88: add64 r2, -0x1
043c90: stxdw [r1 + 0x0], r2
043c98: jne r2, 0x0, +0x3 ; branch 0x43cb8
043ca0: ldxdw r2, [r1 + 0x8]
043ca8: add64 r2, -0x1
043cb0: stxdw [r1 + 0x8], r2
043cb8: ldxdw r1, [r10 - 0x7a0]
043cc0: ldxdw r2, [r10 - 0x7a8]
043cc8: ldxdw r3, [r2 + 0x0]
043cd0: add64 r3, -0x1
043cd8: stxdw [r2 + 0x0], r3
043ce0: jne r3, 0x0, +0x3 ; branch 0x43d00
043ce8: ldxdw r3, [r2 + 0x8]
043cf0: add64 r3, -0x1
043cf8: stxdw [r2 + 0x8], r3
043d00: ldxdw r2, [r1 + 0x0]
043d08: add64 r2, -0x1
043d10: stxdw [r1 + 0x0], r2
043d18: jne r2, 0x0, -0x427 ; branch 0x41be8
043d20: ldxdw r2, [r1 + 0x8]
043d28: add64 r2, -0x1
043d30: stxdw [r1 + 0x8], r2
043d38: ja -0x42b ; branch 0x41be8
043d40: mov64 r1, r10
043d48: add64 r1, -0x898
043d50: mov64 r2, r10
043d58: add64 r2, -0x18
043d60: call 0x17e5b ; call 0x103040
043d68: ldxdw r1, [r10 - 0x898]
043d70: ldxdw r2, [r10 - 0x890]
043d78: ldxdw r3, [r10 - 0x960]
043d80: stxdw [r3 + 0x10], r2
043d88: stxdw [r3 + 0x8], r1
043d90: stdw [r3 + 0x0], 0x1
043d98: ldxdw r1, [r10 - 0x100]
043da0: ldxdw r2, [r10 - 0x108]
043da8: ldxdw r3, [r2 + 0x0]
043db0: add64 r3, -0x1
043db8: stxdw [r2 + 0x0], r3
043dc0: jne r3, 0x0, +0x3 ; branch 0x43de0
043dc8: ldxdw r3, [r2 + 0x8]
043dd0: add64 r3, -0x1
043dd8: stxdw [r2 + 0x8], r3
043de0: ldxdw r2, [r1 + 0x0]
043de8: add64 r2, -0x1
043df0: stxdw [r1 + 0x0], r2
043df8: jne r2, 0x0, -0xc9 ; branch 0x437b8
043e00: ldxdw r2, [r1 + 0x8]
043e08: add64 r2, -0x1
043e10: stxdw [r1 + 0x8], r2
043e18: ja -0xcd ; branch 0x437b8
043e20: ldxdw r3, [r10 - 0x3e8]
043e28: stxdw [r10 - 0x618], r8
043e30: ldxdw r1, [r10 - 0x9a0]
043e38: stxdw [r10 - 0x620], r1
043e40: ldxdw r1, [r10 - 0x9a8]
043e48: stxdw [r10 - 0x650], r1
043e50: ldxdw r1, [r10 - 0x660]
043e58: stxdw [r10 - 0x648], r1
043e60: ldxdw r1, [r10 - 0x658]
043e68: stxdw [r10 - 0x640], r1
043e70: ldxdw r1, [r10 - 0x980]
043e78: stxdw [r10 - 0x628], r1
043e80: stxdw [r10 - 0x630], r9
043e88: stxdw [r10 - 0x638], r6
043e90: ldxdw r1, [r10 - 0x990]
043e98: stxdw [r10 - 0x600], r1
043ea0: ldxdw r2, [r10 - 0x970]
043ea8: stxdw [r10 - 0x610], r2
043eb0: sub64 r1, r2
043eb8: stxdw [r10 - 0x5f8], r1
043ec0: stxdw [r10 - 0x608], r3
043ec8: ldxdw r1, [r10 - 0x9e0]
043ed0: ldxdw r2, [r1 + 0x0]
043ed8: ldxdw r0, [r10 - 0x968]
043ee0: ldxdw r1, [r0 + 0x0]
043ee8: ldxdw r1, [r1 + 0x0]
043ef0: ldxdw r4, [r0 + 0x18]
043ef8: ldxdw r5, [r1 + 0x0]
043f00: stxdw [r10 - 0xf0], r5
043f08: ldxdw r5, [r1 + 0x8]
043f10: stxdw [r10 - 0xe8], r5
043f18: ldxdw r5, [r1 + 0x10]
043f20: stxdw [r10 - 0xe0], r5
043f28: ldxdw r1, [r1 + 0x18]
043f30: stxdw [r10 - 0xd8], r1
043f38: ldxdw r1, [r0 + 0x28]
043f40: ldxdw r5, [r10 - 0x6e0]
043f48: stxdw [r10 - 0xf8], r5
043f50: add64 r4, 0x8
043f58: stxdw [r10 - 0x108], r4
043f60: stxdw [r10 - 0x110], r2
043f68: ldxdw r2, [r10 - 0x730]
043f70: stxdw [r10 - 0xd0], r2
043f78: ldxdw r2, [r10 - 0x728]
043f80: stxdw [r10 - 0xc8], r2
043f88: ldxdw r2, [r10 - 0x720]
043f90: stxdw [r10 - 0xc0], r2
043f98: ldxdw r2, [r10 - 0x718]
043fa0: stxdw [r10 - 0xb8], r2
043fa8: ldxdw r2, [r10 - 0x750]
043fb0: stxdw [r10 - 0xb0], r2
043fb8: ldxdw r2, [r10 - 0x748]
043fc0: stxdw [r10 - 0xa8], r2
043fc8: ldxdw r2, [r10 - 0x740]
043fd0: stxdw [r10 - 0xa0], r2
043fd8: ldxdw r2, [r10 - 0x738]
043fe0: stxdw [r10 - 0x98], r2
043fe8: add64 r1, 0x8
043ff0: stxdw [r10 - 0x100], r1
043ff8: ldxdw r6, [r10 - 0x6f0]
044000: mov64 r1, r10
044008: add64 r1, -0x138
044010: mov64 r2, r10
044018: add64 r2, -0x710
044020: call 0x611b ; call 0x74900
044028: ldxdw r1, [r10 - 0x138]
044030: jeq r1, 0x2, +0x1 ; branch 0x44040
044038: ja +0xb1 ; branch 0x445c8
044040: mov64 r1, 0x0
044048: ldxdw r2, [r10 - 0x988]
044050: jeq r2, 0x0, +0x1 ; branch 0x44060
044058: ldxdw r1, [r10 - 0x998]
044060: ldxdw r2, [r10 - 0x130]
044068: lddw r3, 0x11cd01 ; rodata b'multi_hop_swapglobal_configprograms/pump-amm/src/instructions/swap/sell.rsu'
044078: stxdw [r10 - 0xfb0], r3
044080: stxdw [r10 - 0xfb8], r2
044088: ldxdw r2, [r10 - 0x9c8]
044090: stxdw [r10 - 0xfc0], r2
044098: ldxdw r2, [r10 - 0x9b8]
0440a0: stxdw [r10 - 0xfc8], r2
0440a8: ldxdw r2, [r10 - 0x9b0]
0440b0: stxdw [r10 - 0xfd0], r2
0440b8: stxdw [r10 - 0xfd8], r6
0440c0: ldxdw r2, [r10 - 0x9d0]
0440c8: stxdw [r10 - 0xfe0], r2
0440d0: ldxdw r2, [r10 - 0x9e8]
0440d8: stxdw [r10 - 0xfe8], r2
0440e0: stxdw [r10 - 0xff0], r8
0440e8: stxdw [r10 - 0x1000], r1
0440f0: ldxdw r4, [r10 - 0x990]
0440f8: stxdw [r10 - 0xff8], r4
044100: stdw [r10 - 0xfa8], 0xe
044108: mov64 r1, r10
044110: add64 r1, -0x3f0
044118: mov64 r2, r10
044120: add64 r2, -0x110
044128: mov64 r3, r10
044130: add64 r3, -0x650
044138: mov64 r5, r10
044140: call 0x1be5 ; call 0x52070
044148: ldxdw r7, [r10 - 0x3e0]
044150: ldxdw r6, [r10 - 0x3e8]
044158: ldxdw r8, [r10 - 0x3f0]
044160: lddw r1, -0x8000000000000000
044170: jeq r8, r1, -0x198 ; branch 0x434b8
044178: mov64 r1, r10
044180: add64 r1, -0x5d8
044188: mov64 r2, r10
044190: add64 r2, -0x3d8
044198: mov64 r3, 0x1e8
0441a0: call 0x1aade ; call 0x119898
0441a8: stxdw [r10 - 0x5e0], r7
0441b0: stxdw [r10 - 0x5e8], r6
0441b8: stxdw [r10 - 0x5f0], r8
0441c0: mov64 r1, r10
0441c8: add64 r1, -0x3f0
0441d0: mov64 r6, r10
0441d8: add64 r6, -0x5f0
0441e0: mov64 r2, r6
0441e8: call 0xdb55 ; call 0xb1c98
0441f0: ldxdw r1, [r10 - 0x3e0]
0441f8: stxdw [r10 - 0x108], r1
044200: ldxdw r1, [r10 - 0x3e8]
044208: stxdw [r10 - 0x110], r1
044210: mov64 r1, r10
044218: add64 r1, -0x110
044220: mov64 r2, 0x1
044228: call 0x1850a ; call 0x106a80
044230: ldxdw r2, [r10 - 0x968]
044238: add64 r2, 0x78
044240: mov64 r9, r10
044248: add64 r9, -0x1f0
044250: mov64 r1, r9
044258: call -0x6c1d ; call 0xe178
044260: mov64 r1, r10
044268: add64 r1, -0x1c0
044270: mov64 r2, r6
044278: call 0xdb43 ; call 0xb1c98
044280: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
044290: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
0442a0: add64 r2, 0x8
0442a8: stxdw [r10 - 0x168], r2
0442b0: stxdw [r10 - 0x170], r1
0442b8: ldxdw r1, [r10 - 0x1c0]
0442c0: stxdw [r10 - 0x180], r1
0442c8: ldxdw r1, [r10 - 0x1b8]
0442d0: stxdw [r10 - 0x188], r1
0442d8: stxdw [r10 - 0x190], r1
0442e0: ldxdw r2, [r10 - 0x1b0]
0442e8: add64 r1, r2
0442f0: stxdw [r10 - 0x178], r1
0442f8: mov64 r1, r10
044300: add64 r1, -0x1a8
044308: mov64 r2, r10
044310: add64 r2, -0x190
044318: call -0x68ab ; call 0xfdc8
044320: ldxdw r6, [r10 - 0x1a0]
044328: ldxdw r7, [r10 - 0x198]
044330: mov64 r1, 0x22
044338: mov64 r2, 0x1
044340: call -0x723c ; call 0xb168
044348: ldxdw r1, [r10 - 0x1f0]
044350: ldxdw r2, [r1 + 0x18]
044358: ldxdw r3, [r1 + 0x10]
044360: ldxdw r4, [r1 + 0x8]
044368: ldxdw r1, [r1 + 0x0]
044370: stxdw [r0 + 0x0], r1
044378: stxdw [r0 + 0x8], r4
044380: stxdw [r0 + 0x10], r3
044388: stxdw [r0 + 0x18], r2
044390: sth [r0 + 0x20], 0x1
044398: stxdw [r10 - 0x108], r0
0443a0: stdw [r10 - 0x110], 0x1
0443a8: stdw [r10 - 0x100], 0x1
0443b0: mov64 r8, r10
0443b8: add64 r8, -0x3f0
0443c0: mov64 r5, r10
0443c8: add64 r5, -0x110
0443d0: mov64 r1, r8
0443d8: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0443e8: mov64 r3, r6
0443f0: mov64 r4, r7
0443f8: call 0x192ea ; call 0x10db50
044400: mov64 r6, r10
044408: add64 r6, -0x110
044410: mov64 r1, r6
044418: mov64 r2, r9
044420: mov64 r3, 0x30
044428: call 0x1aa8d ; call 0x119898
044430: mov64 r1, r10
044438: add64 r1, -0x138
044440: stxdw [r10 - 0x148], r1
044448: mov64 r1, r10
044450: add64 r1, -0x111
044458: stxdw [r10 - 0x128], r1
044460: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
044470: stxdw [r10 - 0x138], r1
044478: ldxdw r1, [r10 - 0x978]
044480: stxb [r10 - 0x111], r1
044488: stdw [r10 - 0x140], 0x2
044490: stdw [r10 - 0x120], 0x1
044498: stdw [r10 - 0x130], 0x11
0444a0: mov64 r1, r10
0444a8: add64 r1, -0x148
0444b0: stxdw [r10 - 0x1000], r1
0444b8: stdw [r10 - 0xff8], 0x1
0444c0: mov64 r1, r10
0444c8: add64 r1, -0x160
0444d0: mov64 r5, r10
0444d8: mov64 r2, r8
0444e0: mov64 r3, r6
0444e8: mov64 r4, 0x1
0444f0: call 0x184b8 ; call 0x106ab8
0444f8: lddw r1, -0x7fffffffffffffe6
044508: ldxdw r2, [r10 - 0x160]
044510: jeq r2, r1, +0x1 ; branch 0x44520
044518: ja +0x17 ; branch 0x445d8
044520: ldxdw r1, [r10 - 0x100]
044528: ldxdw r2, [r10 - 0x108]
044530: ldxdw r3, [r2 + 0x0]
044538: add64 r3, -0x1
044540: stxdw [r2 + 0x0], r3
044548: jne r3, 0x0, +0x3 ; branch 0x44568
044550: ldxdw r3, [r2 + 0x8]
044558: add64 r3, -0x1
044560: stxdw [r2 + 0x8], r3
044568: ldxdw r2, [r1 + 0x0]
044570: add64 r2, -0x1
044578: stxdw [r1 + 0x0], r2
044580: jne r2, 0x0, +0x3 ; branch 0x445a0
044588: ldxdw r2, [r1 + 0x8]
044590: add64 r2, -0x1
044598: stxdw [r1 + 0x8], r2
0445a0: ldxdw r1, [r10 - 0x960]
0445a8: ldxdw r2, [r10 - 0x9a0]
0445b0: stxdw [r1 + 0x8], r2
0445b8: stb [r1 + 0x10], 0x1
0445c0: ja -0x133 ; branch 0x43c30
0445c8: ldxdw r2, [r10 - 0x130]
0445d0: ja -0x1c8 ; branch 0x43798
0445d8: mov64 r1, r10
0445e0: add64 r1, -0x8e8
0445e8: mov64 r2, r10
0445f0: add64 r2, -0x160
0445f8: call 0x17d48 ; call 0x103040
044600: ldxdw r1, [r10 - 0x8e8]
044608: ldxdw r2, [r10 - 0x8e0]
044610: ldxdw r3, [r10 - 0x960]
044618: stxdw [r3 + 0x10], r2
044620: stxdw [r3 + 0x8], r1
044628: stdw [r3 + 0x0], 0x1
044630: ldxdw r1, [r10 - 0x100]
044638: ldxdw r2, [r10 - 0x108]
044640: ldxdw r3, [r2 + 0x0]
044648: add64 r3, -0x1
044650: stxdw [r2 + 0x0], r3
044658: jne r3, 0x0, +0x3 ; branch 0x44678
044660: ldxdw r3, [r2 + 0x8]
044668: add64 r3, -0x1
044670: stxdw [r2 + 0x8], r3
044678: ldxdw r2, [r1 + 0x0]
044680: add64 r2, -0x1
044688: stxdw [r1 + 0x0], r2
044690: jne r2, 0x0, -0x1dc ; branch 0x437b8
044698: ja -0x114 ; branch 0x43e00
