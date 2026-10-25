082630: mov64 r8, r2
082638: mov64 r6, r1
082640: ldxdw r1, [r8 + 0x0]
082648: ldxdw r7, [r1 + 0x0]
082650: mov64 r1, r7
082658: call 0x10d0e ; call 0x108ed0
082660: mov64 r9, r0
082668: stxdw [r10 - 0x558], r7
082670: stxdw [r10 - 0x560], r6
082678: jne r9, 0x0, +0xf ; branch 0x826f8
082680: ldxdw r1, [r8 + 0x8]
082688: mov64 r2, 0x3b5
082690: call 0x1092a ; call 0x106fe8
082698: ldxdw r1, [r8 + 0x10]
0826a0: ldxdw r2, [r1 + 0x0]
0826a8: ldxdw r9, [r2 + 0x8]
0826b0: ldxdw r1, [r9 + 0x0]
0826b8: add64 r1, 0x1
0826c0: mov64 r3, 0x1
0826c8: jeq r1, 0x0, +0x1 ; branch 0x826d8
0826d0: mov64 r3, 0x0
0826d8: ldxdw r4, [r2 + 0x0]
0826e0: stxdw [r9 + 0x0], r1
0826e8: jne r3, 0x1, +0x3d ; branch 0x828d8
0826f0: call -0x1
0826f8: ldxdw r1, [r8 + 0x10]
082700: ldxdw r1, [r1 + 0x0]
082708: mov64 r6, r8
082710: stxdw [r10 - 0x568], r1
082718: ldxdw r8, [r1 + 0x0]
082720: ldxdw r1, [r8 + 0x18]
082728: stxdw [r10 - 0x28], r1
082730: ldxdw r1, [r8 + 0x10]
082738: stxdw [r10 - 0x30], r1
082740: ldxdw r1, [r8 + 0x8]
082748: stxdw [r10 - 0x38], r1
082750: ldxdw r1, [r8 + 0x0]
082758: stxdw [r10 - 0x40], r1
082760: ldxdw r7, [r7 + 0x0]
082768: ldxdw r1, [r7 + 0x18]
082770: stxdw [r10 - 0x3f8], r1
082778: ldxdw r1, [r7 + 0x10]
082780: stxdw [r10 - 0x400], r1
082788: ldxdw r1, [r7 + 0x8]
082790: stxdw [r10 - 0x408], r1
082798: ldxdw r1, [r7 + 0x0]
0827a0: stxdw [r10 - 0x410], r1
0827a8: mov64 r1, r10
0827b0: add64 r1, -0x40
0827b8: mov64 r2, r10
0827c0: add64 r2, -0x410
0827c8: mov64 r3, 0x20
0827d0: call 0x12e21 ; call 0x1198e0
0827d8: lsh64 r0, 0x20
0827e0: rsh64 r0, 0x20
0827e8: jeq r0, 0x0, +0xbf ; branch 0x82de8
0827f0: ldxdw r1, [r6 + 0x8]
0827f8: mov64 r2, 0x3b5
082800: call 0x108fc ; call 0x106fe8
082808: mov64 r8, r6
082810: jgt r0, 0x1, +0x1 ; branch 0x82820
082818: mov64 r0, 0x1
082820: ldxdw r7, [r10 - 0x558]
082828: stxdw [r10 - 0x570], r8
082830: jgt r0, r9, +0x1 ; branch 0x82840
082838: ja +0x196 ; branch 0x834f0
082840: mov64 r2, r0
082848: sub64 r2, r9
082850: mov64 r1, 0x1
082858: mov64 r3, 0x1
082860: jgt r2, r0, +0x1 ; branch 0x82870
082868: mov64 r3, 0x0
082870: mov64 r4, 0x0
082878: jne r3, 0x0, +0x1 ; branch 0x82888
082880: mov64 r4, r2
082888: ldxdw r3, [r10 - 0x568]
082890: ldxdw r5, [r3 + 0x8]
082898: ldxdw r2, [r5 + 0x0]
0828a0: add64 r2, 0x1
0828a8: jeq r2, 0x0, +0x1 ; branch 0x828b8
0828b0: mov64 r1, 0x0
0828b8: ldxdw r0, [r3 + 0x0]
0828c0: stxdw [r5 + 0x0], r2
0828c8: jne r1, 0x1, +0xfb ; branch 0x830a8
0828d0: ja -0x3d ; branch 0x826f0
0828d8: ldxdw r5, [r2 + 0x10]
0828e0: ldxdw r1, [r5 + 0x0]
0828e8: add64 r1, 0x1
0828f0: mov64 r3, 0x1
0828f8: jeq r1, 0x0, +0x1 ; branch 0x82908
082900: mov64 r3, 0x0
082908: stxdw [r5 + 0x0], r1
082910: jne r3, 0x1, +0x1 ; branch 0x82920
082918: ja -0x46 ; branch 0x826f0
082920: ldxdw r1, [r7 + 0x8]
082928: stxdw [r10 - 0x568], r1
082930: ldxdw r1, [r1 + 0x0]
082938: add64 r1, 0x1
082940: mov64 r3, 0x1
082948: jeq r1, 0x0, +0x1 ; branch 0x82958
082950: mov64 r3, 0x0
082958: stxdw [r10 - 0x578], r5
082960: ldxdw r5, [r7 + 0x0]
082968: stxdw [r10 - 0x5a8], r5
082970: ldxb r5, [r2 + 0x2a]
082978: stxdw [r10 - 0x5a0], r5
082980: ldxb r5, [r2 + 0x29]
082988: stxdw [r10 - 0x598], r5
082990: ldxb r5, [r2 + 0x28]
082998: stxdw [r10 - 0x590], r5
0829a0: ldxdw r5, [r2 + 0x20]
0829a8: stxdw [r10 - 0x588], r5
0829b0: ldxdw r2, [r2 + 0x18]
0829b8: stxdw [r10 - 0x580], r2
0829c0: ldxdw r2, [r10 - 0x568]
0829c8: stxdw [r2 + 0x0], r1
0829d0: jne r3, 0x1, +0x1 ; branch 0x829e0
0829d8: ja -0x5e ; branch 0x826f0
0829e0: ldxdw r5, [r7 + 0x10]
0829e8: ldxdw r1, [r5 + 0x0]
0829f0: add64 r1, 0x1
0829f8: mov64 r2, 0x1
082a00: jeq r1, 0x0, +0x1 ; branch 0x82a10
082a08: mov64 r2, 0x0
082a10: stxdw [r5 + 0x0], r1
082a18: jne r2, 0x1, +0x1 ; branch 0x82a28
082a20: ja -0x67 ; branch 0x826f0
082a28: stxdw [r10 - 0x5b0], r4
082a30: ldxdw r1, [r8 + 0x18]
082a38: ldxdw r7, [r1 + 0x0]
082a40: ldxdw r2, [r7 + 0x8]
082a48: ldxdw r1, [r2 + 0x0]
082a50: add64 r1, 0x1
082a58: mov64 r3, 0x1
082a60: jeq r1, 0x0, +0x1 ; branch 0x82a70
082a68: mov64 r3, 0x0
082a70: ldxdw r4, [r10 - 0x558]
082a78: ldxb r6, [r4 + 0x2a]
082a80: stxdw [r10 - 0x5d8], r6
082a88: ldxb r6, [r4 + 0x29]
082a90: stxdw [r10 - 0x5d0], r6
082a98: ldxb r6, [r4 + 0x28]
082aa0: stxdw [r10 - 0x5c8], r6
082aa8: ldxdw r6, [r4 + 0x20]
082ab0: stxdw [r10 - 0x5c0], r6
082ab8: ldxdw r4, [r4 + 0x18]
082ac0: stxdw [r10 - 0x5b8], r4
082ac8: ldxdw r4, [r7 + 0x0]
082ad0: stxdw [r2 + 0x0], r1
082ad8: jne r3, 0x1, +0x1 ; branch 0x82ae8
082ae0: ja -0x7f ; branch 0x826f0
082ae8: stxdw [r10 - 0x5f0], r4
082af0: ldxdw r6, [r7 + 0x10]
082af8: ldxdw r1, [r6 + 0x0]
082b00: add64 r1, 0x1
082b08: mov64 r3, 0x1
082b10: jeq r1, 0x0, +0x1 ; branch 0x82b20
082b18: mov64 r3, 0x0
082b20: stxdw [r10 - 0x5e8], r9
082b28: stxdw [r10 - 0x5e0], r0
082b30: mov64 r4, r8
082b38: stxdw [r6 + 0x0], r1
082b40: jne r3, 0x1, +0x1 ; branch 0x82b50
082b48: ja -0x8c ; branch 0x826f0
082b50: ldxdw r1, [r7 + 0x18]
082b58: stxdw [r10 - 0x5f8], r1
082b60: ldxdw r3, [r7 + 0x20]
082b68: ldxb r0, [r7 + 0x28]
082b70: ldxb r8, [r7 + 0x29]
082b78: ldxb r7, [r7 + 0x2a]
082b80: mov64 r1, r4
082b88: ldxdw r9, [r1 + 0x20]
082b90: ldxb r9, [r9 + 0x0]
082b98: mov64 r4, r10
082ba0: add64 r4, -0x4e0
082ba8: stxdw [r10 - 0x30], r4
082bb0: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
082bc0: stxdw [r10 - 0x40], r4
082bc8: stxb [r10 - 0x4e0], r9
082bd0: mov64 r4, r10
082bd8: add64 r4, -0x40
082be0: stxdw [r10 - 0x58], r4
082be8: mov64 r4, r10
082bf0: add64 r4, -0x58
082bf8: stxdw [r10 - 0x368], r4
082c00: ldxdw r4, [r10 - 0x5d8]
082c08: stxb [r10 - 0x36e], r4
082c10: ldxdw r4, [r10 - 0x5d0]
082c18: stxb [r10 - 0x36f], r4
082c20: ldxdw r4, [r10 - 0x5c8]
082c28: stxb [r10 - 0x370], r4
082c30: ldxdw r4, [r10 - 0x5c0]
082c38: stxdw [r10 - 0x378], r4
082c40: ldxdw r4, [r10 - 0x5b8]
082c48: stxdw [r10 - 0x380], r4
082c50: stxdw [r10 - 0x388], r5
082c58: ldxdw r4, [r10 - 0x568]
082c60: stxdw [r10 - 0x390], r4
082c68: ldxdw r4, [r10 - 0x5a8]
082c70: stxdw [r10 - 0x398], r4
082c78: ldxdw r4, [r10 - 0x5a0]
082c80: stxb [r10 - 0x39e], r4
082c88: ldxdw r4, [r10 - 0x598]
082c90: stxb [r10 - 0x39f], r4
082c98: ldxdw r4, [r10 - 0x590]
082ca0: stxb [r10 - 0x3a0], r4
082ca8: ldxdw r4, [r10 - 0x588]
082cb0: stxdw [r10 - 0x3a8], r4
082cb8: ldxdw r4, [r10 - 0x580]
082cc0: stxdw [r10 - 0x3b0], r4
082cc8: ldxdw r4, [r10 - 0x578]
082cd0: stxdw [r10 - 0x3b8], r4
082cd8: ldxdw r4, [r10 - 0x5e8]
082ce0: stxdw [r10 - 0x3c0], r4
082ce8: ldxdw r4, [r10 - 0x5b0]
082cf0: stxdw [r10 - 0x3c8], r4
082cf8: stxb [r10 - 0x3ce], r7
082d00: stxb [r10 - 0x3cf], r8
082d08: stxb [r10 - 0x3d0], r0
082d10: stxdw [r10 - 0x3d8], r3
082d18: ldxdw r3, [r10 - 0x5f8]
082d20: stxdw [r10 - 0x3e0], r3
082d28: stxdw [r10 - 0x3e8], r6
082d30: stxdw [r10 - 0x3f0], r2
082d38: ldxdw r2, [r10 - 0x5f0]
082d40: stxdw [r10 - 0x3f8], r2
082d48: stdw [r10 - 0x28], 0x1
082d50: stdw [r10 - 0x38], 0xd
082d58: stdw [r10 - 0x50], 0x2
082d60: stdw [r10 - 0x360], 0x1
082d68: stdw [r10 - 0x400], 0x0
082d70: stdw [r10 - 0x408], 0x8
082d78: stdw [r10 - 0x410], 0x0
082d80: ldxdw r1, [r1 + 0x28]
082d88: ldxdw r5, [r1 + 0x0]
082d90: mov64 r1, r10
082d98: add64 r1, -0x540
082da0: mov64 r2, r10
082da8: add64 r2, -0x410
082db0: ldxdw r3, [r10 - 0x5e0]
082db8: mov64 r4, 0x3b5
082dc0: call 0x103c4 ; call 0x104be8
082dc8: ldxdw r1, [r10 - 0x540]
082dd0: jeq r1, 0x2, +0x1ca ; branch 0x83c28
082dd8: ldxdw r2, [r10 - 0x538]
082de0: ja +0x1e5 ; branch 0x83d10
082de8: mov64 r1, r10
082df0: add64 r1, -0x4e0
082df8: lddw r2, 0x11bff4 ; rodata b'\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00'
082e08: call 0x10487 ; call 0x105248
082e10: stdw [r10 - 0x48], 0x0
082e18: stdw [r10 - 0x50], 0x1
082e20: stdw [r10 - 0x58], 0x0
082e28: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
082e38: stxdw [r10 - 0x18], r1
082e40: mov64 r1, r10
082e48: add64 r1, -0x58
082e50: stxdw [r10 - 0x20], r1
082e58: stb [r10 - 0x8], 0x3
082e60: stdw [r10 - 0x10], 0x20
082e68: stdw [r10 - 0x30], 0x0
082e70: stdw [r10 - 0x40], 0x0
082e78: mov64 r2, r10
082e80: add64 r2, -0x40
082e88: lddw r1, 0x11bff4 ; rodata b'\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00'
082e98: call 0x1063d ; call 0x106088
082ea0: jeq r0, 0x0, +0xa ; branch 0x82ef8
082ea8: mov64 r3, r10
082eb0: add64 r3, -0x410
082eb8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
082ec8: mov64 r2, 0x37
082ed0: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
082ee0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
082ef0: call 0x12014 ; call 0x112f98
082ef8: ldxdw r1, [r10 - 0x48]
082f00: stxdw [r10 - 0x3c8], r1
082f08: ldxdw r1, [r10 - 0x50]
082f10: stxdw [r10 - 0x3d0], r1
082f18: ldxdw r1, [r10 - 0x58]
082f20: stxdw [r10 - 0x3d8], r1
082f28: ldxdw r1, [r10 - 0x4e0]
082f30: stxdw [r10 - 0x3f0], r1
082f38: ldxdw r1, [r10 - 0x4d8]
082f40: stxdw [r10 - 0x3e8], r1
082f48: ldxdw r1, [r10 - 0x4d0]
082f50: stxdw [r10 - 0x3e0], r1
082f58: lddw r1, 0x11e127 ; rodata b'programs/pump-amm/src/instructions/admin/create_config.rsboost_authoritynew'
082f68: stxdw [r10 - 0x408], r1
082f70: stw [r10 - 0x378], 0x1005
082f78: stb [r10 - 0x3c0], 0x2
082f80: stw [r10 - 0x3f8], 0x6
082f88: stdw [r10 - 0x400], 0x39
082f90: stdw [r10 - 0x410], 0x0
082f98: mov64 r1, r10
082fa0: add64 r1, -0x520
082fa8: mov64 r2, r10
082fb0: add64 r2, -0x410
082fb8: call 0xffff ; call 0x102fb8
082fc0: ldxdw r3, [r10 - 0x518]
082fc8: ldxdw r2, [r10 - 0x520]
082fd0: ldxdw r1, [r8 + 0x18]
082fd8: stxdw [r10 - 0x3f8], r1
082fe0: ldxdw r1, [r8 + 0x10]
082fe8: stxdw [r10 - 0x400], r1
082ff0: ldxdw r1, [r8 + 0x8]
082ff8: stxdw [r10 - 0x408], r1
083000: ldxdw r1, [r8 + 0x0]
083008: stxdw [r10 - 0x410], r1
083010: ldxdw r1, [r7 + 0x0]
083018: stxdw [r10 - 0x3f0], r1
083020: ldxdw r1, [r7 + 0x8]
083028: stxdw [r10 - 0x3e8], r1
083030: ldxdw r1, [r7 + 0x10]
083038: stxdw [r10 - 0x3e0], r1
083040: ldxdw r1, [r7 + 0x18]
083048: stxdw [r10 - 0x3d8], r1
083050: mov64 r1, r10
083058: add64 r1, -0x530
083060: mov64 r4, r10
083068: add64 r4, -0x410
083070: call 0x1002b ; call 0x1031d0
083078: ldxdw r1, [r10 - 0x530]
083080: ldxdw r2, [r10 - 0x528]
083088: ldxdw r3, [r10 - 0x560]
083090: stxdw [r3 + 0x8], r2
083098: stxdw [r3 + 0x0], r1
0830a0: ja +0x190 ; branch 0x83d28
0830a8: ldxdw r9, [r3 + 0x10]
0830b0: ldxdw r1, [r9 + 0x0]
0830b8: add64 r1, 0x1
0830c0: mov64 r2, 0x1
0830c8: jeq r1, 0x0, +0x1 ; branch 0x830d8
0830d0: mov64 r2, 0x0
0830d8: stxdw [r10 - 0x578], r4
0830e0: stxdw [r9 + 0x0], r1
0830e8: jne r2, 0x1, +0x1 ; branch 0x830f8
0830f0: ja -0x141 ; branch 0x826f0
0830f8: ldxdw r6, [r7 + 0x8]
083100: ldxdw r1, [r6 + 0x0]
083108: add64 r1, 0x1
083110: mov64 r2, 0x1
083118: jeq r1, 0x0, +0x1 ; branch 0x83128
083120: mov64 r2, 0x0
083128: ldxdw r4, [r7 + 0x0]
083130: stxdw [r10 - 0x5a0], r4
083138: ldxb r4, [r3 + 0x2a]
083140: stxdw [r10 - 0x598], r4
083148: ldxb r4, [r3 + 0x29]
083150: stxdw [r10 - 0x590], r4
083158: ldxb r4, [r3 + 0x28]
083160: stxdw [r10 - 0x588], r4
083168: ldxdw r4, [r3 + 0x20]
083170: stxdw [r10 - 0x580], r4
083178: ldxdw r3, [r3 + 0x18]
083180: stxdw [r10 - 0x568], r6
083188: stxdw [r6 + 0x0], r1
083190: jne r2, 0x1, +0x1 ; branch 0x831a0
083198: ja -0x156 ; branch 0x826f0
0831a0: ldxdw r6, [r7 + 0x10]
0831a8: ldxdw r1, [r6 + 0x0]
0831b0: add64 r1, 0x1
0831b8: mov64 r2, 0x1
0831c0: jeq r1, 0x0, +0x1 ; branch 0x831d0
0831c8: mov64 r2, 0x0
0831d0: stxdw [r10 - 0x5a8], r3
0831d8: stxdw [r6 + 0x0], r1
0831e0: jne r2, 0x1, +0x1 ; branch 0x831f0
0831e8: ja -0x160 ; branch 0x826f0
0831f0: stxdw [r10 - 0x5b8], r9
0831f8: stxdw [r10 - 0x5b0], r0
083200: ldxdw r1, [r8 + 0x18]
083208: ldxdw r0, [r1 + 0x0]
083210: ldxdw r2, [r0 + 0x8]
083218: ldxdw r1, [r2 + 0x0]
083220: add64 r1, 0x1
083228: mov64 r3, 0x1
083230: jeq r1, 0x0, +0x1 ; branch 0x83240
083238: mov64 r3, 0x0
083240: ldxb r4, [r7 + 0x2a]
083248: stxdw [r10 - 0x5d0], r4
083250: ldxb r4, [r7 + 0x29]
083258: stxdw [r10 - 0x5c8], r4
083260: ldxb r4, [r7 + 0x28]
083268: stxdw [r10 - 0x5c0], r4
083270: ldxdw r9, [r7 + 0x20]
083278: ldxdw r8, [r7 + 0x18]
083280: ldxdw r4, [r0 + 0x0]
083288: stxdw [r2 + 0x0], r1
083290: jne r3, 0x1, +0x1 ; branch 0x832a0
083298: ja -0x176 ; branch 0x826f0
0832a0: stxdw [r10 - 0x5d8], r4
0832a8: ldxdw r7, [r0 + 0x10]
0832b0: ldxdw r1, [r7 + 0x0]
0832b8: add64 r1, 0x1
0832c0: mov64 r3, 0x1
0832c8: jeq r1, 0x0, +0x1 ; branch 0x832d8
0832d0: mov64 r3, 0x0
0832d8: ldxdw r4, [r10 - 0x578]
0832e0: stxdw [r7 + 0x0], r1
0832e8: jne r3, 0x1, +0x1 ; branch 0x832f8
0832f0: ja -0x181 ; branch 0x826f0
0832f8: ldxdw r1, [r0 + 0x18]
083300: stxdw [r10 - 0x5e0], r1
083308: ldxdw r1, [r0 + 0x20]
083310: stxdw [r10 - 0x5e8], r1
083318: ldxb r3, [r0 + 0x28]
083320: ldxb r4, [r0 + 0x29]
083328: ldxb r0, [r0 + 0x2a]
083330: ldxdw r1, [r10 - 0x5d0]
083338: stxb [r10 - 0x426], r1
083340: ldxdw r1, [r10 - 0x5c8]
083348: stxb [r10 - 0x427], r1
083350: ldxdw r1, [r10 - 0x5c0]
083358: stxb [r10 - 0x428], r1
083360: stxdw [r10 - 0x430], r9
083368: stxdw [r10 - 0x438], r8
083370: stxdw [r10 - 0x440], r6
083378: ldxdw r6, [r10 - 0x568]
083380: stxdw [r10 - 0x448], r6
083388: ldxdw r6, [r10 - 0x5a0]
083390: stxdw [r10 - 0x450], r6
083398: ldxdw r6, [r10 - 0x598]
0833a0: stxb [r10 - 0x456], r6
0833a8: ldxdw r6, [r10 - 0x590]
0833b0: stxb [r10 - 0x457], r6
0833b8: ldxdw r6, [r10 - 0x588]
0833c0: stxb [r10 - 0x458], r6
0833c8: ldxdw r6, [r10 - 0x580]
0833d0: stxdw [r10 - 0x460], r6
0833d8: ldxdw r6, [r10 - 0x5a8]
0833e0: stxdw [r10 - 0x468], r6
0833e8: ldxdw r6, [r10 - 0x5b8]
0833f0: stxdw [r10 - 0x470], r6
0833f8: stxdw [r10 - 0x478], r5
083400: ldxdw r5, [r10 - 0x5b0]
083408: stxdw [r10 - 0x480], r5
083410: stxb [r10 - 0x486], r0
083418: stxb [r10 - 0x487], r4
083420: stxb [r10 - 0x488], r3
083428: ldxdw r1, [r10 - 0x5e8]
083430: stxdw [r10 - 0x490], r1
083438: ldxdw r1, [r10 - 0x5e0]
083440: stxdw [r10 - 0x498], r1
083448: stxdw [r10 - 0x4a0], r7
083450: stxdw [r10 - 0x4a8], r2
083458: ldxdw r1, [r10 - 0x5d8]
083460: stxdw [r10 - 0x4b0], r1
083468: stdw [r10 - 0x418], 0x0
083470: stdw [r10 - 0x420], 0x8
083478: stdw [r10 - 0x4b8], 0x0
083480: stdw [r10 - 0x4c0], 0x8
083488: stdw [r10 - 0x4c8], 0x0
083490: mov64 r1, r10
083498: add64 r1, -0x4f0
0834a0: mov64 r2, r10
0834a8: add64 r2, -0x4c8
0834b0: ldxdw r3, [r10 - 0x578]
0834b8: call 0x1034d ; call 0x104f28
0834c0: ldxdw r1, [r10 - 0x4f0]
0834c8: ldxdw r7, [r10 - 0x558]
0834d0: ldxdw r8, [r10 - 0x570]
0834d8: jeq r1, 0x2, +0x2 ; branch 0x834f0
0834e0: ldxdw r2, [r10 - 0x4e8]
0834e8: ja +0x104 ; branch 0x83d10
0834f0: ldxdw r1, [r7 + 0x8]
0834f8: ldxdw r2, [r1 + 0x0]
083500: add64 r2, 0x1
083508: mov64 r3, 0x1
083510: jeq r2, 0x0, +0x1 ; branch 0x83520
083518: mov64 r3, 0x0
083520: ldxdw r6, [r7 + 0x0]
083528: stxdw [r1 + 0x0], r2
083530: jne r3, 0x1, +0x1 ; branch 0x83540
083538: ja -0x1ca ; branch 0x826f0
083540: ldxdw r3, [r7 + 0x10]
083548: ldxdw r2, [r3 + 0x0]
083550: add64 r2, 0x1
083558: mov64 r4, 0x1
083560: jeq r2, 0x0, +0x1 ; branch 0x83570
083568: mov64 r4, 0x0
083570: stxdw [r3 + 0x0], r2
083578: jne r4, 0x1, +0x1 ; branch 0x83588
083580: ja -0x1d3 ; branch 0x826f0
083588: ldxdw r2, [r8 + 0x18]
083590: ldxdw r9, [r2 + 0x0]
083598: ldxdw r4, [r9 + 0x8]
0835a0: ldxdw r5, [r4 + 0x0]
0835a8: add64 r5, 0x1
0835b0: mov64 r0, 0x1
0835b8: jeq r5, 0x0, +0x1 ; branch 0x835c8
0835c0: mov64 r0, 0x0
0835c8: stxdw [r10 - 0x568], r6
0835d0: ldxb r2, [r7 + 0x2a]
0835d8: stxdw [r10 - 0x590], r2
0835e0: ldxb r2, [r7 + 0x29]
0835e8: stxdw [r10 - 0x588], r2
0835f0: ldxb r2, [r7 + 0x28]
0835f8: stxdw [r10 - 0x580], r2
083600: ldxdw r2, [r7 + 0x20]
083608: stxdw [r10 - 0x578], r2
083610: ldxdw r2, [r7 + 0x18]
083618: ldxdw r7, [r9 + 0x0]
083620: stxdw [r4 + 0x0], r5
083628: jne r0, 0x1, +0x1 ; branch 0x83638
083630: ja -0x1e9 ; branch 0x826f0
083638: ldxdw r5, [r9 + 0x10]
083640: ldxdw r0, [r5 + 0x0]
083648: add64 r0, 0x1
083650: mov64 r6, 0x1
083658: jeq r0, 0x0, +0x1 ; branch 0x83668
083660: mov64 r6, 0x0
083668: stxdw [r10 - 0x5b0], r7
083670: stxdw [r10 - 0x5a8], r2
083678: stxdw [r10 - 0x5a0], r3
083680: stxdw [r10 - 0x598], r1
083688: stxdw [r5 + 0x0], r0
083690: jne r6, 0x1, +0x1 ; branch 0x836a0
083698: ja -0x1f6 ; branch 0x826f0
0836a0: ldxdw r0, [r9 + 0x18]
0836a8: ldxdw r6, [r9 + 0x20]
0836b0: ldxb r7, [r9 + 0x28]
0836b8: ldxb r8, [r9 + 0x29]
0836c0: ldxb r2, [r9 + 0x2a]
0836c8: ldxdw r1, [r10 - 0x570]
0836d0: ldxdw r1, [r1 + 0x20]
0836d8: ldxb r3, [r1 + 0x0]
0836e0: mov64 r1, r10
0836e8: add64 r1, -0x4e0
0836f0: stxdw [r10 - 0x30], r1
0836f8: lddw r1, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
083708: stxdw [r10 - 0x40], r1
083710: mov64 r1, r10
083718: add64 r1, -0x40
083720: stxdw [r10 - 0x58], r1
083728: mov64 r1, r10
083730: add64 r1, -0x58
083738: stxdw [r10 - 0x398], r1
083740: stxb [r10 - 0x39e], r2
083748: stxb [r10 - 0x39f], r8
083750: stxb [r10 - 0x3a0], r7
083758: stxdw [r10 - 0x3a8], r6
083760: stxdw [r10 - 0x3b0], r0
083768: stxdw [r10 - 0x3b8], r5
083770: stxdw [r10 - 0x3c0], r4
083778: ldxdw r1, [r10 - 0x5b0]
083780: stxdw [r10 - 0x3c8], r1
083788: ldxdw r1, [r10 - 0x590]
083790: stxb [r10 - 0x3ce], r1
083798: ldxdw r1, [r10 - 0x588]
0837a0: stxb [r10 - 0x3cf], r1
0837a8: ldxdw r1, [r10 - 0x580]
0837b0: stxb [r10 - 0x3d0], r1
0837b8: ldxdw r1, [r10 - 0x578]
0837c0: stxdw [r10 - 0x3d8], r1
0837c8: ldxdw r1, [r10 - 0x5a8]
0837d0: stxdw [r10 - 0x3e0], r1
0837d8: ldxdw r1, [r10 - 0x5a0]
0837e0: stxdw [r10 - 0x3e8], r1
0837e8: ldxdw r1, [r10 - 0x598]
0837f0: stxdw [r10 - 0x3f0], r1
0837f8: ldxdw r1, [r10 - 0x568]
083800: stxdw [r10 - 0x3f8], r1
083808: stxdw [r10 - 0x568], r3
083810: stxb [r10 - 0x4e0], r3
083818: stdw [r10 - 0x28], 0x1
083820: stdw [r10 - 0x38], 0xd
083828: stdw [r10 - 0x50], 0x2
083830: stdw [r10 - 0x390], 0x1
083838: stdw [r10 - 0x400], 0x0
083840: stdw [r10 - 0x408], 0x8
083848: stdw [r10 - 0x410], 0x0
083850: mov64 r1, r10
083858: add64 r1, -0x500
083860: mov64 r2, r10
083868: add64 r2, -0x410
083870: mov64 r3, 0x3b5
083878: call 0x10189 ; call 0x1044c8
083880: ldxdw r1, [r10 - 0x500]
083888: jeq r1, 0x2, +0x1 ; branch 0x83898
083890: ja +0xb ; branch 0x838f0
083898: ldxdw r0, [r10 - 0x558]
0838a0: ldxdw r1, [r0 + 0x8]
0838a8: ldxdw r2, [r1 + 0x0]
0838b0: add64 r2, 0x1
0838b8: mov64 r3, 0x1
0838c0: jeq r2, 0x0, +0x1 ; branch 0x838d0
0838c8: mov64 r3, 0x0
0838d0: ldxdw r6, [r0 + 0x0]
0838d8: stxdw [r1 + 0x0], r2
0838e0: jne r3, 0x1, +0x3 ; branch 0x83900
0838e8: ja -0x240 ; branch 0x826f0
0838f0: ldxdw r2, [r10 - 0x4f8]
0838f8: ja +0x82 ; branch 0x83d10
083900: ldxdw r8, [r0 + 0x10]
083908: ldxdw r2, [r8 + 0x0]
083910: add64 r2, 0x1
083918: mov64 r4, 0x1
083920: jeq r2, 0x0, +0x1 ; branch 0x83930
083928: mov64 r4, 0x0
083930: stxdw [r8 + 0x0], r2
083938: jne r4, 0x1, +0x1 ; branch 0x83948
083940: ja -0x24b ; branch 0x826f0
083948: ldxdw r4, [r9 + 0x8]
083950: ldxdw r2, [r4 + 0x0]
083958: add64 r2, 0x1
083960: mov64 r5, 0x1
083968: jeq r2, 0x0, +0x1 ; branch 0x83978
083970: mov64 r5, 0x0
083978: ldxdw r3, [r9 + 0x0]
083980: stxdw [r10 - 0x590], r3
083988: ldxb r3, [r0 + 0x2a]
083990: stxdw [r10 - 0x588], r3
083998: ldxb r3, [r0 + 0x29]
0839a0: stxdw [r10 - 0x580], r3
0839a8: ldxb r3, [r0 + 0x28]
0839b0: stxdw [r10 - 0x578], r3
0839b8: ldxdw r3, [r0 + 0x20]
0839c0: ldxdw r7, [r0 + 0x18]
0839c8: stxdw [r4 + 0x0], r2
0839d0: jne r5, 0x1, +0x1 ; branch 0x839e0
0839d8: ja -0x25e ; branch 0x826f0
0839e0: stxdw [r10 - 0x598], r1
0839e8: ldxdw r2, [r9 + 0x10]
0839f0: ldxdw r5, [r2 + 0x0]
0839f8: add64 r5, 0x1
083a00: mov64 r0, 0x1
083a08: jeq r5, 0x0, +0x1 ; branch 0x83a18
083a10: mov64 r0, 0x0
083a18: stxdw [r10 - 0x5a8], r8
083a20: mov64 r1, r7
083a28: stxdw [r10 - 0x5a0], r6
083a30: stxdw [r2 + 0x0], r5
083a38: jne r0, 0x1, +0x1 ; branch 0x83a48
083a40: ja -0x26b ; branch 0x826f0
083a48: ldxdw r5, [r9 + 0x18]
083a50: ldxdw r0, [r9 + 0x20]
083a58: ldxb r6, [r9 + 0x28]
083a60: ldxb r7, [r9 + 0x29]
083a68: ldxb r9, [r9 + 0x2a]
083a70: mov64 r8, r10
083a78: add64 r8, -0x58
083a80: stxdw [r10 - 0x398], r8
083a88: stxb [r10 - 0x39e], r9
083a90: stxb [r10 - 0x39f], r7
083a98: stxb [r10 - 0x3a0], r6
083aa0: stxdw [r10 - 0x3a8], r0
083aa8: stxdw [r10 - 0x3b0], r5
083ab0: stxdw [r10 - 0x3b8], r2
083ab8: stxdw [r10 - 0x3c0], r4
083ac0: ldxdw r2, [r10 - 0x590]
083ac8: stxdw [r10 - 0x3c8], r2
083ad0: ldxdw r2, [r10 - 0x588]
083ad8: stxb [r10 - 0x3ce], r2
083ae0: ldxdw r2, [r10 - 0x580]
083ae8: stxb [r10 - 0x3cf], r2
083af0: ldxdw r2, [r10 - 0x578]
083af8: stxb [r10 - 0x3d0], r2
083b00: stxdw [r10 - 0x3d8], r3
083b08: stxdw [r10 - 0x3e0], r1
083b10: ldxdw r1, [r10 - 0x5a8]
083b18: stxdw [r10 - 0x3e8], r1
083b20: ldxdw r2, [r10 - 0x598]
083b28: stxdw [r10 - 0x3f0], r2
083b30: ldxdw r1, [r10 - 0x5a0]
083b38: stxdw [r10 - 0x3f8], r1
083b40: mov64 r1, r10
083b48: add64 r1, -0x40
083b50: stxdw [r10 - 0x58], r1
083b58: mov64 r1, r10
083b60: add64 r1, -0x4e0
083b68: stxdw [r10 - 0x30], r1
083b70: lddw r1, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
083b80: stxdw [r10 - 0x40], r1
083b88: ldxdw r1, [r10 - 0x568]
083b90: stxb [r10 - 0x4e0], r1
083b98: stdw [r10 - 0x390], 0x1
083ba0: stdw [r10 - 0x400], 0x0
083ba8: stdw [r10 - 0x408], 0x8
083bb0: stdw [r10 - 0x410], 0x0
083bb8: stdw [r10 - 0x50], 0x2
083bc0: stdw [r10 - 0x28], 0x1
083bc8: stdw [r10 - 0x38], 0xd
083bd0: ldxdw r1, [r10 - 0x570]
083bd8: ldxdw r1, [r1 + 0x28]
083be0: ldxdw r3, [r1 + 0x0]
083be8: mov64 r1, r10
083bf0: add64 r1, -0x510
083bf8: mov64 r2, r10
083c00: add64 r2, -0x410
083c08: call 0x10189 ; call 0x104858
083c10: ldxdw r1, [r10 - 0x510]
083c18: jeq r1, 0x2, +0x1 ; branch 0x83c28
083c20: ja +0x1c ; branch 0x83d08
083c28: ldxdw r6, [r10 - 0x560]
083c30: mov64 r1, r10
083c38: add64 r1, -0x410
083c40: ldxdw r2, [r10 - 0x558]
083c48: call -0x10142 ; call 0x3240
083c50: ldxb r1, [r10 - 0x5c]
083c58: jeq r1, 0x2, +0x1 ; branch 0x83c68
083c60: ja +0xe ; branch 0x83cd8
083c68: ldxdw r3, [r10 - 0x408]
083c70: ldxdw r2, [r10 - 0x410]
083c78: mov64 r1, r10
083c80: add64 r1, -0x550
083c88: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
083c98: mov64 r5, 0xd
083ca0: call -0x103e6 ; call 0x1d78
083ca8: ldxdw r1, [r10 - 0x550]
083cb0: ldxdw r2, [r10 - 0x548]
083cb8: stxdw [r6 + 0x8], r2
083cc0: stxdw [r6 + 0x0], r1
083cc8: stb [r6 + 0x3b4], 0x2
083cd0: ja +0xb ; branch 0x83d30
083cd8: mov64 r2, r10
083ce0: add64 r2, -0x410
083ce8: mov64 r1, r6
083cf0: mov64 r3, 0x3b8
083cf8: call 0x12b73 ; call 0x119898
083d00: ja +0x5 ; branch 0x83d30
083d08: ldxdw r2, [r10 - 0x508]
083d10: ldxdw r3, [r10 - 0x560]
083d18: stxdw [r3 + 0x0], r1
083d20: stxdw [r3 + 0x8], r2
083d28: stb [r3 + 0x3b4], 0x2
083d30: exit
