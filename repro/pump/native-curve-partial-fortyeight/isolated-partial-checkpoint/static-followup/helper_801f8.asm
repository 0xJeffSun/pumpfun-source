0801f8: mov64 r6, r1
080200: mov64 r1, r2
080208: add64 r1, r3
080210: mov64 r3, 0x1
080218: jlt r1, r2, +0x1 ; branch 0x80228
080220: mov64 r3, 0x0
080228: and64 r3, 0x1
080230: jne r3, 0x0, +0xa ; branch 0x80288
080238: mov64 r2, r1
080240: add64 r2, r4
080248: mov64 r3, 0x1
080250: jlt r2, r1, +0x1 ; branch 0x80260
080258: mov64 r3, 0x0
080260: and64 r3, 0x1
080268: jne r3, 0x0, +0x3 ; branch 0x80288
080270: stxdw [r6 + 0x8], r2
080278: stdw [r6 + 0x0], 0x2
080280: ja +0x3f ; branch 0x80480
080288: mov64 r1, r10
080290: add64 r1, -0x70
080298: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0802a8: call 0x1ae1a ; direct target 0x157380
0802b0: stdw [r10 - 0x48], 0x0
0802b8: stdw [r10 - 0x50], 0x1
0802c0: stdw [r10 - 0x58], 0x0
0802c8: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0802d8: stxdw [r10 - 0x18], r1
0802e0: mov64 r1, r10
0802e8: add64 r1, -0x58
0802f0: stxdw [r10 - 0x20], r1
0802f8: stb [r10 - 0x8], 0x3
080300: stdw [r10 - 0x10], 0x20
080308: stdw [r10 - 0x30], 0x0
080310: stdw [r10 - 0x40], 0x0
080318: mov64 r2, r10
080320: add64 r2, -0x40
080328: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
080338: call 0x1bb69 ; direct target 0x15de88
080340: jeq r0, 0x0, +0xa ; branch 0x80398
080348: mov64 r3, r10
080350: add64 r3, -0x110
080358: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
080368: mov64 r2, 0x37
080370: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
080380: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
080390: call 0x25950 ; direct target 0x1ace18
080398: ldxdw r1, [r10 - 0x48]
0803a0: stxdw [r10 - 0xc8], r1
0803a8: ldxdw r1, [r10 - 0x50]
0803b0: stxdw [r10 - 0xd0], r1
0803b8: ldxdw r1, [r10 - 0x58]
0803c0: stxdw [r10 - 0xd8], r1
0803c8: ldxdw r1, [r10 - 0x70]
0803d0: stxdw [r10 - 0xf0], r1
0803d8: ldxdw r1, [r10 - 0x68]
0803e0: stxdw [r10 - 0xe8], r1
0803e8: ldxdw r1, [r10 - 0x60]
0803f0: stxdw [r10 - 0xe0], r1
0803f8: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
080408: stxdw [r10 - 0x108], r1
080410: stw [r10 - 0x78], 0x1788
080418: stb [r10 - 0xc0], 0x2
080420: stw [r10 - 0xf8], 0x11d
080428: stdw [r10 - 0x100], 0x1d
080430: stdw [r10 - 0x110], 0x0
080438: mov64 r1, r10
080440: add64 r1, -0x120
080448: mov64 r2, r10
080450: add64 r2, -0x110
080458: call 0x236da ; direct target 0x19bb30
080460: ldxdw r1, [r10 - 0x120]
080468: ldxdw r2, [r10 - 0x118]
080470: stxdw [r6 + 0x8], r2
080478: stxdw [r6 + 0x0], r1
080480: exit
