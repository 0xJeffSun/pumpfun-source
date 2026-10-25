058668: mov64 r8, r3
058670: mov64 r7, r2
058678: mov64 r6, r1
058680: ldxdw r1, [r4 + 0x8]
058688: ldxdw r2, [r1 + 0x0]
058690: add64 r2, 0x1
058698: mov64 r3, 0x1
0586a0: jeq r2, 0x0, +0x1 ; branch 0x586b0
0586a8: mov64 r3, 0x0
0586b0: stxdw [r1 + 0x0], r2
0586b8: jne r3, 0x1, +0x1 ; branch 0x586c8
0586c0: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
0586c8: ldxdw r2, [r4 + 0x10]
0586d0: ldxdw r3, [r2 + 0x0]
0586d8: add64 r3, 0x1
0586e0: mov64 r5, 0x1
0586e8: jeq r3, 0x0, +0x1 ; branch 0x586f8
0586f0: mov64 r5, 0x0
0586f8: stxdw [r2 + 0x0], r3
058700: jne r5, 0x1, +0x1 ; branch 0x58710
058708: ja -0xa ; branch 0x586c0
058710: ldxdw r9, [r4 + 0x18]
058718: ldxdw r3, [r1 + 0x0]
058720: add64 r3, -0x1
058728: stxdw [r1 + 0x0], r3
058730: jne r3, 0x0, +0x3 ; branch 0x58750
058738: ldxdw r3, [r1 + 0x8]
058740: add64 r3, -0x1
058748: stxdw [r1 + 0x8], r3
058750: ldxdw r1, [r2 + 0x0]
058758: add64 r1, -0x1
058760: stxdw [r2 + 0x0], r1
058768: jne r1, 0x0, +0x3 ; branch 0x58788
058770: ldxdw r1, [r2 + 0x8]
058778: add64 r1, -0x1
058780: stxdw [r2 + 0x8], r1
058788: mov64 r1, r9
058790: lddw r2, 0x1b5ca8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b"\x06\xdd\xf6\xe1\xeeu\x8f\xde\x18B]\xbc\xe4l\xcd\xda\xb6\x1a\xfcM\x83\xb9\r'\xfe\xbd\xf9(\xd8\xa1\x8b\xfc\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction: UpdateBuybackConfigAn o"
0587a0: mov64 r3, 0x20
0587a8: call 0x2b5d9 ; direct target 0x1b3678
0587b0: lsh64 r0, 0x20
0587b8: rsh64 r0, 0x20
0587c0: jeq r0, 0x0, +0x49 ; branch 0x58a10
0587c8: mov64 r1, r9
0587d0: lddw r2, 0x1b5b28 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x06\xdd\xf6\xe1\xd7e\xa1\x93\xd9\xcb\xe1F\xce\xeby\xac\x1c\xb4\x85\xed_[7\x91:\x8c\xf5\x85~\xff\x00\xa9\x06\xa7\xd5\x17\x19,\\Q!\x8c\xc9L=J\xf1\x7fX\xda\xee\x08\x9b\xa1\xfdD\xe3\xdb\xd9\x8a\x00\x00\x00\x00FeeBasisPointsGreaterThanMaximumAcco'
0587e0: mov64 r3, 0x20
0587e8: call 0x2b5d1 ; direct target 0x1b3678
0587f0: lsh64 r0, 0x20
0587f8: rsh64 r0, 0x20
058800: jeq r0, 0x0, +0x5c ; branch 0x58ae8
058808: mov64 r1, r10
058810: add64 r1, -0x70
058818: lddw r2, 0x1b5f1c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de'
058828: call 0x1fd6a ; direct target 0x157380
058830: stdw [r10 - 0x48], 0x0
058838: stdw [r10 - 0x50], 0x1
058840: stdw [r10 - 0x58], 0x0
058848: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
058858: stxdw [r10 - 0x18], r1
058860: mov64 r1, r10
058868: add64 r1, -0x58
058870: stxdw [r10 - 0x20], r1
058878: stb [r10 - 0x8], 0x3
058880: stdw [r10 - 0x10], 0x20
058888: stdw [r10 - 0x30], 0x0
058890: stdw [r10 - 0x40], 0x0
058898: mov64 r2, r10
0588a0: add64 r2, -0x40
0588a8: lddw r1, 0x1b5f1c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de'
0588b8: call 0x20ab9 ; direct target 0x15de88
0588c0: jeq r0, 0x0, +0xa ; branch 0x58918
0588c8: mov64 r3, r10
0588d0: add64 r3, -0x110
0588d8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
0588e8: mov64 r2, 0x37
0588f0: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
058900: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
058910: call 0x2a8a0 ; direct target 0x1ace18
058918: ldxdw r1, [r10 - 0x48]
058920: stxdw [r10 - 0xc8], r1
058928: ldxdw r1, [r10 - 0x50]
058930: stxdw [r10 - 0xd0], r1
058938: ldxdw r1, [r10 - 0x58]
058940: stxdw [r10 - 0xd8], r1
058948: ldxdw r1, [r10 - 0x70]
058950: stxdw [r10 - 0xf0], r1
058958: ldxdw r1, [r10 - 0x68]
058960: stxdw [r10 - 0xe8], r1
058968: ldxdw r1, [r10 - 0x60]
058970: stxdw [r10 - 0xe0], r1
058978: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
058988: stxdw [r10 - 0x108], r1
058990: stw [r10 - 0x78], 0x177a
058998: stb [r10 - 0xc0], 0x2
0589a0: stw [r10 - 0xf8], 0x167
0589a8: stdw [r10 - 0x100], 0x29
0589b0: stdw [r10 - 0x110], 0x0
0589b8: mov64 r1, r10
0589c0: add64 r1, -0x120
0589c8: mov64 r2, r10
0589d0: add64 r2, -0x110
0589d8: call 0x2862a ; direct target 0x19bb30
0589e0: ldxdw r1, [r10 - 0x120]
0589e8: ldxdw r2, [r10 - 0x118]
0589f0: stxdw [r6 + 0x8], r2
0589f8: stxdw [r6 + 0x0], r1
058a00: mov64 r3, 0x2
058a08: ja +0x3a ; branch 0x58be0
058a10: ldxdw r1, [r8 + 0x8]
058a18: ldxdw r3, [r1 + 0x0]
058a20: add64 r3, 0x1
058a28: mov64 r4, 0x1
058a30: jeq r3, 0x0, +0x1 ; branch 0x58a40
058a38: mov64 r4, 0x0
058a40: ldxdw r2, [r8 + 0x0]
058a48: stxdw [r1 + 0x0], r3
058a50: jne r4, 0x1, +0x1 ; branch 0x58a60
058a58: ja -0x74 ; branch 0x586c0
058a60: ldxdw r4, [r8 + 0x10]
058a68: ldxdw r3, [r4 + 0x0]
058a70: add64 r3, 0x1
058a78: mov64 r5, 0x1
058a80: jeq r3, 0x0, +0x1 ; branch 0x58a90
058a88: mov64 r5, 0x0
058a90: stxdw [r4 + 0x0], r3
058a98: jne r5, 0x1, +0x1 ; branch 0x58aa8
058aa0: ja -0x7d ; branch 0x586c0
058aa8: ldxb r3, [r8 + 0x2a]
058ab0: ldxdw r5, [r8 + 0x18]
058ab8: ldxdw r0, [r8 + 0x20]
058ac0: ldxb r7, [r8 + 0x28]
058ac8: ldxb r8, [r8 + 0x29]
058ad0: stxb [r6 + 0x29], r8
058ad8: stxb [r6 + 0x28], r7
058ae0: ja +0x1a ; branch 0x58bb8
058ae8: ldxdw r1, [r7 + 0x8]
058af0: ldxdw r3, [r1 + 0x0]
058af8: add64 r3, 0x1
058b00: mov64 r4, 0x1
058b08: jeq r3, 0x0, +0x1 ; branch 0x58b18
058b10: mov64 r4, 0x0
058b18: ldxdw r2, [r7 + 0x0]
058b20: stxdw [r1 + 0x0], r3
058b28: jne r4, 0x1, +0x1 ; branch 0x58b38
058b30: ja -0x8f ; branch 0x586c0
058b38: ldxdw r4, [r7 + 0x10]
058b40: ldxdw r3, [r4 + 0x0]
058b48: add64 r3, 0x1
058b50: mov64 r5, 0x1
058b58: jeq r3, 0x0, +0x1 ; branch 0x58b68
058b60: mov64 r5, 0x0
058b68: stxdw [r4 + 0x0], r3
058b70: jne r5, 0x1, +0x1 ; branch 0x58b80
058b78: ja -0x98 ; branch 0x586c0
058b80: ldxb r3, [r7 + 0x2a]
058b88: ldxdw r5, [r7 + 0x18]
058b90: ldxdw r0, [r7 + 0x20]
058b98: ldxb r8, [r7 + 0x28]
058ba0: ldxb r7, [r7 + 0x29]
058ba8: stxb [r6 + 0x29], r7
058bb0: stxb [r6 + 0x28], r8
058bb8: stxdw [r6 + 0x20], r0
058bc0: stxdw [r6 + 0x18], r5
058bc8: stxdw [r6 + 0x10], r4
058bd0: stxdw [r6 + 0x8], r1
058bd8: stxdw [r6 + 0x0], r2
058be0: stxb [r6 + 0x2a], r3
058be8: exit
