013458: stxdw [r10 - 0x140], r3
013460: ldxdw r3, [r5 - 0x1000]
013468: ldxdw r7, [r3 + 0x0]
013470: ldxdw r6, [r7 + 0x8]
013478: ldxdw r0, [r6 + 0x0]
013480: add64 r0, 0x1
013488: mov64 r3, 0x1
013490: jeq r0, 0x0, +0x1 ; branch 0x134a0
013498: mov64 r3, 0x0
0134a0: ldxdw r9, [r7 + 0x0]
0134a8: stxdw [r6 + 0x0], r0
0134b0: jne r3, 0x1, +0x1 ; branch 0x134c0
0134b8: call -0x1
0134c0: stxdw [r10 - 0x168], r9
0134c8: stxdw [r10 - 0x160], r6
0134d0: ldxdw r3, [r7 + 0x10]
0134d8: stxdw [r10 - 0x138], r3
0134e0: ldxdw r0, [r3 + 0x0]
0134e8: add64 r0, 0x1
0134f0: mov64 r8, 0x1
0134f8: jeq r0, 0x0, +0x1 ; branch 0x13508
013500: mov64 r8, 0x0
013508: ldxdw r3, [r5 - 0xfd8]
013510: ldxdw r6, [r5 - 0xfe0]
013518: stxdw [r10 - 0x148], r6
013520: ldxdw r6, [r5 - 0xfe8]
013528: stxdw [r10 - 0x150], r6
013530: ldxdw r6, [r5 - 0xff0]
013538: stxdw [r10 - 0x158], r6
013540: ldxdw r5, [r5 - 0xff8]
013548: ldxdw r6, [r10 - 0x138]
013550: stxdw [r6 + 0x0], r0
013558: jne r8, 0x1, +0x1 ; branch 0x13568
013560: ja -0x16 ; branch 0x134b8
013568: mov64 r9, r1
013570: ldxdw r6, [r4 + 0x88]
013578: ldxdw r4, [r6 + 0x8]
013580: ldxdw r0, [r4 + 0x0]
013588: add64 r0, 0x1
013590: mov64 r1, 0x1
013598: jeq r0, 0x0, +0x1 ; branch 0x135a8
0135a0: mov64 r1, 0x0
0135a8: ldxb r8, [r7 + 0x2a]
0135b0: stxdw [r10 - 0x190], r8
0135b8: ldxb r8, [r7 + 0x29]
0135c0: stxdw [r10 - 0x188], r8
0135c8: ldxb r8, [r7 + 0x28]
0135d0: stxdw [r10 - 0x180], r8
0135d8: ldxdw r8, [r7 + 0x20]
0135e0: stxdw [r10 - 0x178], r8
0135e8: ldxdw r7, [r7 + 0x18]
0135f0: stxdw [r10 - 0x170], r7
0135f8: ldxdw r7, [r6 + 0x0]
013600: stxdw [r10 - 0x198], r7
013608: stxdw [r4 + 0x0], r0
013610: jne r1, 0x1, +0x1 ; branch 0x13620
013618: ja -0x2d ; branch 0x134b8
013620: ldxdw r0, [r6 + 0x10]
013628: ldxdw r7, [r0 + 0x0]
013630: add64 r7, 0x1
013638: mov64 r1, 0x1
013640: mov64 r8, r9
013648: jeq r7, 0x0, +0x1 ; branch 0x13658
013650: mov64 r1, 0x0
013658: stxdw [r10 - 0x1d8], r3
013660: stxdw [r0 + 0x0], r7
013668: jne r1, 0x1, +0x1 ; branch 0x13678
013670: ja -0x38 ; branch 0x134b8
013678: ldxdw r7, [r5 + 0x8]
013680: ldxdw r9, [r7 + 0x0]
013688: add64 r9, 0x1
013690: mov64 r1, 0x1
013698: jeq r9, 0x0, +0x1 ; branch 0x136a8
0136a0: mov64 r1, 0x0
0136a8: ldxdw r3, [r10 - 0x140]
0136b0: ldxdw r3, [r5 + 0x0]
0136b8: stxdw [r10 - 0x1c8], r3
0136c0: ldxb r3, [r6 + 0x2a]
0136c8: stxdw [r10 - 0x1c0], r3
0136d0: ldxb r3, [r6 + 0x29]
0136d8: stxdw [r10 - 0x1b8], r3
0136e0: ldxb r3, [r6 + 0x28]
0136e8: stxdw [r10 - 0x1b0], r3
0136f0: ldxdw r3, [r6 + 0x20]
0136f8: stxdw [r10 - 0x1a8], r3
013700: ldxdw r3, [r6 + 0x18]
013708: stxdw [r10 - 0x1a0], r3
013710: stxdw [r7 + 0x0], r9
013718: jne r1, 0x1, +0x1 ; branch 0x13728
013720: ja -0x4e ; branch 0x134b8
013728: ldxdw r9, [r5 + 0x10]
013730: ldxdw r6, [r9 + 0x0]
013738: add64 r6, 0x1
013740: mov64 r3, 0x1
013748: jeq r6, 0x0, +0x1 ; branch 0x13758
013750: mov64 r3, 0x0
013758: mov64 r1, r2
013760: stxdw [r10 - 0x1d0], r8
013768: stxdw [r9 + 0x0], r6
013770: jne r3, 0x1, +0x1 ; branch 0x13780
013778: ja -0x59 ; branch 0x134b8
013780: ldxdw r2, [r5 + 0x18]
013788: ldxdw r3, [r5 + 0x20]
013790: ldxb r6, [r5 + 0x28]
013798: ldxb r8, [r5 + 0x29]
0137a0: ldxb r5, [r5 + 0x2a]
0137a8: stxb [r10 - 0x7e], r5
0137b0: stxb [r10 - 0x7f], r8
0137b8: stxb [r10 - 0x80], r6
0137c0: stxdw [r10 - 0x88], r3
0137c8: stxdw [r10 - 0x90], r2
0137d0: stxdw [r10 - 0x98], r9
0137d8: stxdw [r10 - 0xa0], r7
0137e0: ldxdw r2, [r10 - 0x1c8]
0137e8: stxdw [r10 - 0xa8], r2
0137f0: ldxdw r2, [r10 - 0x1c0]
0137f8: stxb [r10 - 0xae], r2
013800: ldxdw r2, [r10 - 0x1b8]
013808: stxb [r10 - 0xaf], r2
013810: ldxdw r2, [r10 - 0x1b0]
013818: stxb [r10 - 0xb0], r2
013820: ldxdw r2, [r10 - 0x1a8]
013828: stxdw [r10 - 0xb8], r2
013830: ldxdw r2, [r10 - 0x1a0]
013838: stxdw [r10 - 0xc0], r2
013840: stxdw [r10 - 0xc8], r0
013848: stxdw [r10 - 0xd0], r4
013850: ldxdw r2, [r10 - 0x198]
013858: stxdw [r10 - 0xd8], r2
013860: ldxdw r2, [r10 - 0x190]
013868: stxb [r10 - 0xde], r2
013870: ldxdw r2, [r10 - 0x188]
013878: stxb [r10 - 0xdf], r2
013880: ldxdw r2, [r10 - 0x180]
013888: stxb [r10 - 0xe0], r2
013890: ldxdw r2, [r10 - 0x178]
013898: stxdw [r10 - 0xe8], r2
0138a0: ldxdw r2, [r10 - 0x170]
0138a8: stxdw [r10 - 0xf0], r2
0138b0: ldxdw r2, [r10 - 0x138]
0138b8: stxdw [r10 - 0xf8], r2
0138c0: ldxdw r2, [r10 - 0x160]
0138c8: stxdw [r10 - 0x100], r2
0138d0: ldxdw r2, [r10 - 0x168]
0138d8: stxdw [r10 - 0x108], r2
0138e0: stdw [r10 - 0x70], 0x0
0138e8: stdw [r10 - 0x78], 0x8
0138f0: stdw [r10 - 0x110], 0x0
0138f8: stdw [r10 - 0x118], 0x8
013900: stdw [r10 - 0x120], 0x0
013908: mov64 r8, r1
013910: add64 r1, 0x28
013918: stxdw [r10 - 0x38], r1
013920: lddw r1, 0x11cb5b ; rodata b'pool-authoritybonding-curveholder-rewardsprograms/pump-amm/src/instructions'
013930: stxdw [r10 - 0x48], r1
013938: stdw [r10 - 0x30], 0x20
013940: stdw [r10 - 0x40], 0xe
013948: mov64 r1, r10
013950: add64 r1, -0x28
013958: mov64 r2, r10
013960: add64 r2, -0x48
013968: mov64 r3, 0x2
013970: lddw r4, 0x11e55e ; rodata b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0programs/pu'
013980: call 0x1f4dc ; call 0x10e068
013988: ldxdw r1, [r10 - 0x10]
013990: stxdw [r10 - 0x50], r1
013998: ldxdw r1, [r10 - 0x18]
0139a0: stxdw [r10 - 0x58], r1
0139a8: ldxdw r1, [r10 - 0x20]
0139b0: stxdw [r10 - 0x60], r1
0139b8: ldxdw r1, [r10 - 0x28]
0139c0: stxdw [r10 - 0x68], r1
0139c8: mov64 r7, r8
0139d0: add64 r7, 0x8
0139d8: mov64 r2, r10
0139e0: add64 r2, -0x68
0139e8: mov64 r1, r7
0139f0: mov64 r3, 0x20
0139f8: call 0x20bdc ; call 0x1198e0
013a00: mov64 r9, r0
013a08: ldxdw r1, [r10 - 0x158]
013a10: ldxdw r3, [r1 + 0x28]
013a18: mov64 r1, r10
013a20: add64 r1, -0x28
013a28: mov64 r2, r7
013a30: ldxdw r4, [r10 - 0x150]
013a38: ldxdw r5, [r10 - 0x148]
013a40: call 0xafa7 ; call 0x6b780
013a48: ldxdw r4, [r10 - 0x20]
013a50: ldxdw r1, [r10 - 0x28]
013a58: jne r1, 0x0, +0x1e ; branch 0x13b50
013a60: lsh64 r9, 0x20
013a68: rsh64 r9, 0x20
013a70: mov64 r3, 0x1
013a78: ldxdw r6, [r10 - 0x1d0]
013a80: jeq r9, 0x0, +0x1 ; branch 0x13a90
013a88: mov64 r3, 0x0
013a90: ldxdw r1, [r10 - 0x18]
013a98: stxdw [r10 - 0x1000], r1
013aa0: mov64 r1, r8
013aa8: add64 r1, 0x48
013ab0: stxdw [r10 - 0xff8], r1
013ab8: mov64 r1, r10
013ac0: add64 r1, -0x130
013ac8: mov64 r2, r10
013ad0: add64 r2, -0x120
013ad8: mov64 r5, r10
013ae0: call 0x18e60 ; call 0xdade8
013ae8: ldxdw r1, [r10 - 0x130]
013af0: jeq r1, 0x2, +0x1 ; branch 0x13b00
013af8: ja +0x13 ; branch 0x13b98
013b00: mov64 r1, r10
013b08: add64 r1, -0x120
013b10: call 0x1e662 ; call 0x106e28
013b18: lddw r1, -0x8000000000000000
013b28: ldxdw r2, [r10 - 0x100]
013b30: jne r2, r1, +0x11 ; branch 0x13bc0
013b38: lddw r1, 0x122b98 ; rodata b'\x00\x00\x00\x00\x9e\xe5\x11\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x17\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x9e\xe5\x11\x00\x1c\x00\x00\x00\x00\x00\x00\x00$\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\xf8\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
013b48: call 0x1fd66 ; call 0x112680
013b50: ldxdw r1, [r10 - 0x18]
013b58: ldxdw r2, [r10 - 0x1d0]
013b60: stxdw [r2 + 0x10], r1
013b68: stxdw [r2 + 0x8], r4
013b70: stdw [r2 + 0x0], 0x1
013b78: mov64 r1, r10
013b80: add64 r1, -0x120
013b88: call -0x145a ; call 0x98c0
013b90: ja +0x1e ; branch 0x13c88
013b98: ldxdw r2, [r10 - 0x128]
013ba0: stxdw [r6 + 0x8], r1
013ba8: stxdw [r6 + 0x10], r2
013bb0: stdw [r6 + 0x0], 0x1
013bb8: ja +0x19 ; branch 0x13c88
013bc0: ldxdw r1, [r10 - 0xf0]
013bc8: ldxdw r5, [r10 - 0x140]
013bd0: ldxdw r3, [r10 - 0x1d8]
013bd8: jlt r1, 0x8, +0x16 ; branch 0x13c90
013be0: mov64 r2, r1
013be8: and64 r2, -0x8
013bf0: jeq r2, 0x8, +0x13 ; branch 0x13c90
013bf8: jeq r2, 0x10, +0x12 ; branch 0x13c90
013c00: jeq r1, 0x18, +0x1 ; branch 0x13c10
013c08: ja +0x14 ; branch 0x13cb0
013c10: ldxdw r2, [r10 - 0xf8]
013c18: ldxdw r4, [r2 + 0x0]
013c20: ldxdw r1, [r2 + 0x8]
013c28: ldxdw r2, [r2 + 0x10]
013c30: ldxb r5, [r5 + 0x3b4]
013c38: jeq r5, 0x0, +0x3 ; branch 0x13c58
013c40: ldxdw r5, [r8 + 0x100]
013c48: jeq r5, 0x0, +0x1 ; branch 0x13c58
013c50: mov64 r2, r5
013c58: stxdw [r10 - 0x1000], r1
013c60: stxdw [r10 - 0xff8], r2
013c68: mov64 r5, r10
013c70: mov64 r1, r6
013c78: mov64 r2, r7
013c80: call 0x14f ; call 0x14700
013c88: exit
013c90: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
013ca0: call 0x1f66d ; call 0x10f010
013ca8: ja +0x5 ; branch 0x13cd8
013cb0: mov64 r1, 0x15
013cb8: lddw r2, 0x11c283 ; rodata b'Not all bytes readcalled `Result::unwrap()` on an `Err` valueMaxSeedLengthE'
013cc8: mov64 r3, 0x12
013cd0: call -0x173e ; call 0x82e8
013cd8: stxdw [r10 - 0x120], r0
013ce0: mov64 r3, r10
013ce8: add64 r3, -0x120
013cf0: lddw r1, 0x11c295 ; rodata b'called `Result::unwrap()` on an `Err` valueMaxSeedLengthExceededInvalidSeed'
013d00: mov64 r2, 0x2b
013d08: lddw r4, 0x1229e0 ; rodata b"\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9a\xcc\x11\x00.\x00\x00"
013d18: lddw r5, 0x122b98 ; rodata b'\x00\x00\x00\x00\x9e\xe5\x11\x00\x1c\x00\x00\x00\x00\x00\x00\x00\x17\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x9e\xe5\x11\x00\x1c\x00\x00\x00\x00\x00\x00\x00$\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\xf8\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
013d28: call 0x1fe4d ; call 0x112f98
