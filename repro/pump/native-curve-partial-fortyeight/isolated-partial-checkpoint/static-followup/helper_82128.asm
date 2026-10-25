082128: mov64 r6, r1
082130: ldxdw r1, [r5 - 0xff8]
082138: jge r4, r1, +0x22 ; branch 0x82250
082140: mov64 r1, r10
082148: add64 r1, -0x78
082150: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
082160: call 0x1aa43 ; direct target 0x157380
082168: stdw [r10 - 0x50], 0x0
082170: stdw [r10 - 0x58], 0x1
082178: stdw [r10 - 0x60], 0x0
082180: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
082190: stxdw [r10 - 0x20], r1
082198: mov64 r1, r10
0821a0: add64 r1, -0x60
0821a8: stxdw [r10 - 0x28], r1
0821b0: stb [r10 - 0x10], 0x3
0821b8: stdw [r10 - 0x18], 0x20
0821c0: stdw [r10 - 0x38], 0x0
0821c8: stdw [r10 - 0x48], 0x0
0821d0: mov64 r2, r10
0821d8: add64 r2, -0x48
0821e0: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0821f0: call 0x1b792 ; direct target 0x15de88
0821f8: jeq r0, 0x0, +0x30 ; branch 0x82380
082200: mov64 r3, r10
082208: add64 r3, -0x1
082210: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
082220: mov64 r2, 0x37
082228: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
082238: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
082248: call 0x25579 ; direct target 0x1ace18
082250: ldxdw r7, [r5 - 0xff0]
082258: mov64 r0, r2
082260: add64 r0, r7
082268: mov64 r7, 0x1
082270: jlt r0, r2, +0x1 ; branch 0x82280
082278: mov64 r7, 0x0
082280: and64 r7, 0x1
082288: jne r7, 0x0, +0x3a ; branch 0x82460
082290: ldxdw r2, [r5 - 0x1000]
082298: jne r2, 0x0, +0x1 ; branch 0x822a8
0822a0: ja +0x6d ; branch 0x82610
0822a8: jlt r0, r3, +0x1 ; branch 0x822b8
0822b0: ja +0x6a ; branch 0x82608
0822b8: mov64 r1, r10
0822c0: add64 r1, -0x78
0822c8: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0822d8: call 0x1aa14 ; direct target 0x157380
0822e0: stdw [r10 - 0x50], 0x0
0822e8: stdw [r10 - 0x58], 0x1
0822f0: stdw [r10 - 0x60], 0x0
0822f8: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
082308: stxdw [r10 - 0x20], r1
082310: mov64 r1, r10
082318: add64 r1, -0x60
082320: stxdw [r10 - 0x28], r1
082328: stb [r10 - 0x10], 0x3
082330: stdw [r10 - 0x18], 0x20
082338: stdw [r10 - 0x38], 0x0
082340: stdw [r10 - 0x48], 0x0
082348: mov64 r2, r10
082350: add64 r2, -0x48
082358: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
082368: call 0x1b763 ; direct target 0x15de88
082370: jeq r0, 0x0, +0x95 ; branch 0x82820
082378: ja -0x30 ; branch 0x82200
082380: ldxdw r1, [r10 - 0x50]
082388: stxdw [r10 - 0xd0], r1
082390: ldxdw r1, [r10 - 0x58]
082398: stxdw [r10 - 0xd8], r1
0823a0: ldxdw r1, [r10 - 0x60]
0823a8: stxdw [r10 - 0xe0], r1
0823b0: ldxdw r1, [r10 - 0x78]
0823b8: stxdw [r10 - 0xf8], r1
0823c0: ldxdw r1, [r10 - 0x70]
0823c8: stxdw [r10 - 0xf0], r1
0823d0: ldxdw r1, [r10 - 0x68]
0823d8: stxdw [r10 - 0xe8], r1
0823e0: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
0823f0: stxdw [r10 - 0x110], r1
0823f8: stw [r10 - 0x80], 0x1788
082400: stb [r10 - 0xc8], 0x2
082408: stw [r10 - 0x100], 0x1ee
082410: stdw [r10 - 0x108], 0x1d
082418: stdw [r10 - 0x118], 0x0
082420: mov64 r1, r10
082428: add64 r1, -0x188
082430: mov64 r2, r10
082438: add64 r2, -0x118
082440: call 0x232dd ; direct target 0x19bb30
082448: ldxdw r1, [r10 - 0x188]
082450: ldxdw r2, [r10 - 0x180]
082458: ja +0xce ; branch 0x82ad0
082460: mov64 r1, r10
082468: add64 r1, -0x78
082470: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
082480: call 0x1a9df ; direct target 0x157380
082488: stdw [r10 - 0x50], 0x0
082490: stdw [r10 - 0x58], 0x1
082498: stdw [r10 - 0x60], 0x0
0824a0: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0824b0: stxdw [r10 - 0x20], r1
0824b8: mov64 r1, r10
0824c0: add64 r1, -0x60
0824c8: stxdw [r10 - 0x28], r1
0824d0: stb [r10 - 0x10], 0x3
0824d8: stdw [r10 - 0x18], 0x20
0824e0: stdw [r10 - 0x38], 0x0
0824e8: stdw [r10 - 0x48], 0x0
0824f0: mov64 r2, r10
0824f8: add64 r2, -0x48
082500: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
082510: call 0x1b72e ; direct target 0x15de88
082518: jeq r0, 0x0, +0x1 ; branch 0x82528
082520: ja -0x65 ; branch 0x82200
082528: ldxdw r1, [r10 - 0x50]
082530: stxdw [r10 - 0xd0], r1
082538: ldxdw r1, [r10 - 0x58]
082540: stxdw [r10 - 0xd8], r1
082548: ldxdw r1, [r10 - 0x60]
082550: stxdw [r10 - 0xe0], r1
082558: ldxdw r1, [r10 - 0x78]
082560: stxdw [r10 - 0xf8], r1
082568: ldxdw r1, [r10 - 0x70]
082570: stxdw [r10 - 0xf0], r1
082578: ldxdw r1, [r10 - 0x68]
082580: stxdw [r10 - 0xe8], r1
082588: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
082598: stxdw [r10 - 0x110], r1
0825a0: stw [r10 - 0x80], 0x1788
0825a8: stb [r10 - 0xc8], 0x2
0825b0: stw [r10 - 0x100], 0x1f2
0825b8: stdw [r10 - 0x108], 0x1d
0825c0: stdw [r10 - 0x118], 0x0
0825c8: mov64 r1, r10
0825d0: add64 r1, -0x178
0825d8: mov64 r2, r10
0825e0: add64 r2, -0x118
0825e8: call 0x232a8 ; direct target 0x19bb30
0825f0: ldxdw r1, [r10 - 0x178]
0825f8: ldxdw r2, [r10 - 0x170]
082600: ja +0x99 ; branch 0x82ad0
082608: sub64 r0, r3
082610: jeq r4, r1, +0x6 ; branch 0x82648
082618: jeq r0, 0x0, +0x5c ; branch 0x82900
082620: sub64 r4, r1
082628: stxdw [r6 + 0x10], r0
082630: stxdw [r6 + 0x8], r4
082638: mov64 r1, 0x0
082640: ja +0x94 ; branch 0x82ae8
082648: mov64 r1, r10
082650: add64 r1, -0x78
082658: lddw r2, 0x1b5f40 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()'
082668: call 0x1a9a2 ; direct target 0x157380
082670: stdw [r10 - 0x50], 0x0
082678: stdw [r10 - 0x58], 0x1
082680: stdw [r10 - 0x60], 0x0
082688: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
082698: stxdw [r10 - 0x20], r1
0826a0: mov64 r1, r10
0826a8: add64 r1, -0x60
0826b0: stxdw [r10 - 0x28], r1
0826b8: stb [r10 - 0x10], 0x3
0826c0: stdw [r10 - 0x18], 0x20
0826c8: stdw [r10 - 0x38], 0x0
0826d0: stdw [r10 - 0x48], 0x0
0826d8: mov64 r2, r10
0826e0: add64 r2, -0x48
0826e8: lddw r1, 0x1b5f40 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()'
0826f8: call 0x1b6f1 ; direct target 0x15de88
082700: jeq r0, 0x0, +0x1 ; branch 0x82710
082708: ja -0xa2 ; branch 0x82200
082710: ldxdw r1, [r10 - 0x50]
082718: stxdw [r10 - 0xd0], r1
082720: ldxdw r1, [r10 - 0x58]
082728: stxdw [r10 - 0xd8], r1
082730: ldxdw r1, [r10 - 0x60]
082738: stxdw [r10 - 0xe0], r1
082740: ldxdw r1, [r10 - 0x78]
082748: stxdw [r10 - 0xf8], r1
082750: ldxdw r1, [r10 - 0x70]
082758: stxdw [r10 - 0xf0], r1
082760: ldxdw r1, [r10 - 0x68]
082768: stxdw [r10 - 0xe8], r1
082770: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
082780: stxdw [r10 - 0x110], r1
082788: stw [r10 - 0x80], 0x1785
082790: stb [r10 - 0xc8], 0x2
082798: stw [r10 - 0x100], 0x1fa
0827a0: stdw [r10 - 0x108], 0x1d
0827a8: stdw [r10 - 0x118], 0x0
0827b0: mov64 r1, r10
0827b8: add64 r1, -0x148
0827c0: mov64 r2, r10
0827c8: add64 r2, -0x118
0827d0: call 0x2326b ; direct target 0x19bb30
0827d8: ldxdw r3, [r10 - 0x140]
0827e0: ldxdw r2, [r10 - 0x148]
0827e8: mov64 r1, r10
0827f0: add64 r1, -0x158
0827f8: mov64 r4, 0x0
082800: call -0x10499 ; direct target 0x340
082808: ldxdw r1, [r10 - 0x158]
082810: ldxdw r2, [r10 - 0x150]
082818: ja +0x56 ; branch 0x82ad0
082820: ldxdw r1, [r10 - 0x50]
082828: stxdw [r10 - 0xd0], r1
082830: ldxdw r1, [r10 - 0x58]
082838: stxdw [r10 - 0xd8], r1
082840: ldxdw r1, [r10 - 0x60]
082848: stxdw [r10 - 0xe0], r1
082850: ldxdw r1, [r10 - 0x78]
082858: stxdw [r10 - 0xf8], r1
082860: ldxdw r1, [r10 - 0x70]
082868: stxdw [r10 - 0xf0], r1
082870: ldxdw r1, [r10 - 0x68]
082878: stxdw [r10 - 0xe8], r1
082880: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
082890: stxdw [r10 - 0x110], r1
082898: stw [r10 - 0x80], 0x1788
0828a0: stb [r10 - 0xc8], 0x2
0828a8: stw [r10 - 0x100], 0x1f6
0828b0: stdw [r10 - 0x108], 0x1d
0828b8: stdw [r10 - 0x118], 0x0
0828c0: mov64 r1, r10
0828c8: add64 r1, -0x168
0828d0: mov64 r2, r10
0828d8: add64 r2, -0x118
0828e0: call 0x23249 ; direct target 0x19bb30
0828e8: ldxdw r1, [r10 - 0x168]
0828f0: ldxdw r2, [r10 - 0x160]
0828f8: ja +0x3a ; branch 0x82ad0
082900: mov64 r1, r10
082908: add64 r1, -0x78
082910: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
082920: call 0x1a94b ; direct target 0x157380
082928: stdw [r10 - 0x50], 0x0
082930: stdw [r10 - 0x58], 0x1
082938: stdw [r10 - 0x60], 0x0
082940: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
082950: stxdw [r10 - 0x20], r1
082958: mov64 r1, r10
082960: add64 r1, -0x60
082968: stxdw [r10 - 0x28], r1
082970: stb [r10 - 0x10], 0x3
082978: stdw [r10 - 0x18], 0x20
082980: stdw [r10 - 0x38], 0x0
082988: stdw [r10 - 0x48], 0x0
082990: mov64 r2, r10
082998: add64 r2, -0x48
0829a0: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0829b0: call 0x1b69a ; direct target 0x15de88
0829b8: jeq r0, 0x0, +0x1 ; branch 0x829c8
0829c0: ja -0xf9 ; branch 0x82200
0829c8: ldxdw r1, [r10 - 0x50]
0829d0: stxdw [r10 - 0xd0], r1
0829d8: ldxdw r1, [r10 - 0x58]
0829e0: stxdw [r10 - 0xd8], r1
0829e8: ldxdw r1, [r10 - 0x60]
0829f0: stxdw [r10 - 0xe0], r1
0829f8: ldxdw r1, [r10 - 0x78]
082a00: stxdw [r10 - 0xf8], r1
082a08: ldxdw r1, [r10 - 0x70]
082a10: stxdw [r10 - 0xf0], r1
082a18: ldxdw r1, [r10 - 0x68]
082a20: stxdw [r10 - 0xe8], r1
082a28: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
082a38: stxdw [r10 - 0x110], r1
082a40: stw [r10 - 0x80], 0x1788
082a48: stb [r10 - 0xc8], 0x2
082a50: stw [r10 - 0x100], 0x1fb
082a58: stdw [r10 - 0x108], 0x1d
082a60: stdw [r10 - 0x118], 0x0
082a68: mov64 r1, r10
082a70: add64 r1, -0x128
082a78: mov64 r2, r10
082a80: add64 r2, -0x118
082a88: call 0x23214 ; direct target 0x19bb30
082a90: ldxdw r3, [r10 - 0x120]
082a98: ldxdw r2, [r10 - 0x128]
082aa0: mov64 r1, r10
082aa8: add64 r1, -0x138
082ab0: mov64 r4, 0x0
082ab8: call -0x104f0 ; direct target 0x340
082ac0: ldxdw r1, [r10 - 0x138]
082ac8: ldxdw r2, [r10 - 0x130]
082ad0: stxdw [r6 + 0x10], r2
082ad8: stxdw [r6 + 0x8], r1
082ae0: mov64 r1, 0x1
082ae8: stxdw [r6 + 0x0], r1
082af0: exit
