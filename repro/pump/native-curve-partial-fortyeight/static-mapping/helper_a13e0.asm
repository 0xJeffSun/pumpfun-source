0a13e0: mov64 r6, r1
0a13e8: ldxdw r0, [r2 + 0x40]
0a13f0: mov64 r1, r0
0a13f8: add64 r1, r3
0a1400: mov64 r5, 0x1
0a1408: jlt r1, r0, +0x1 ; branch 0xa1418
0a1410: mov64 r5, 0x0
0a1418: and64 r5, 0x1
0a1420: jne r5, 0x0, +0x7a ; branch 0xa17f8
0a1428: stxdw [r2 + 0x40], r1
0a1430: ldxdw r5, [r2 + 0x50]
0a1438: mov64 r1, r5
0a1440: add64 r1, r3
0a1448: mov64 r3, 0x1
0a1450: jlt r1, r5, +0x1 ; branch 0xa1460
0a1458: mov64 r3, 0x0
0a1460: and64 r3, 0x1
0a1468: jne r3, 0x0, +0x1 ; branch 0xa1478
0a1470: ja +0x19 ; branch 0xa1540
0a1478: mov64 r1, r10
0a1480: add64 r1, -0x78
0a1488: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1498: call 0x16bdc ; direct target 0x157380
0a14a0: stdw [r10 - 0x50], 0x0
0a14a8: stdw [r10 - 0x58], 0x1
0a14b0: stdw [r10 - 0x60], 0x0
0a14b8: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0a14c8: stxdw [r10 - 0x20], r1
0a14d0: mov64 r1, r10
0a14d8: add64 r1, -0x60
0a14e0: stxdw [r10 - 0x28], r1
0a14e8: stb [r10 - 0x10], 0x3
0a14f0: stdw [r10 - 0x18], 0x20
0a14f8: stdw [r10 - 0x38], 0x0
0a1500: stdw [r10 - 0x48], 0x0
0a1508: mov64 r2, r10
0a1510: add64 r2, -0x48
0a1518: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1528: call 0x1792b ; direct target 0x15de88
0a1530: jeq r0, 0x0, +0x1e ; branch 0xa1628
0a1538: ja +0x6f ; branch 0xa18b8
0a1540: stxdw [r2 + 0x50], r1
0a1548: ldxdw r1, [r2 + 0x48]
0a1550: jlt r1, r4, +0x1 ; branch 0xa1560
0a1558: ja +0x35 ; branch 0xa1708
0a1560: mov64 r1, r10
0a1568: add64 r1, -0x78
0a1570: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1580: call 0x16bbf ; direct target 0x157380
0a1588: stdw [r10 - 0x50], 0x0
0a1590: stdw [r10 - 0x58], 0x1
0a1598: stdw [r10 - 0x60], 0x0
0a15a0: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0a15b0: stxdw [r10 - 0x20], r1
0a15b8: mov64 r1, r10
0a15c0: add64 r1, -0x60
0a15c8: stxdw [r10 - 0x28], r1
0a15d0: stb [r10 - 0x10], 0x3
0a15d8: stdw [r10 - 0x18], 0x20
0a15e0: stdw [r10 - 0x38], 0x0
0a15e8: stdw [r10 - 0x48], 0x0
0a15f0: mov64 r2, r10
0a15f8: add64 r2, -0x48
0a1600: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1610: call 0x1790e ; direct target 0x15de88
0a1618: jeq r0, 0x0, +0x7b ; branch 0xa19f8
0a1620: ja +0x52 ; branch 0xa18b8
0a1628: ldxdw r1, [r10 - 0x50]
0a1630: stxdw [r10 - 0xd0], r1
0a1638: ldxdw r1, [r10 - 0x58]
0a1640: stxdw [r10 - 0xd8], r1
0a1648: ldxdw r1, [r10 - 0x60]
0a1650: stxdw [r10 - 0xe0], r1
0a1658: ldxdw r1, [r10 - 0x78]
0a1660: stxdw [r10 - 0xf8], r1
0a1668: ldxdw r1, [r10 - 0x70]
0a1670: stxdw [r10 - 0xf0], r1
0a1678: ldxdw r1, [r10 - 0x68]
0a1680: stxdw [r10 - 0xe8], r1
0a1688: lddw r1, 0x1b72c5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/lib.rsbuyback_fee never exceeds protocol_feebuyback fee is at most protocol_feeglo'
0a1698: stxdw [r10 - 0x110], r1
0a16a0: stw [r10 - 0x80], 0x1788
0a16a8: stb [r10 - 0xc8], 0x2
0a16b0: stw [r10 - 0x100], 0x9dd
0a16b8: stdw [r10 - 0x108], 0x18
0a16c0: stdw [r10 - 0x118], 0x0
0a16c8: mov64 r1, r10
0a16d0: add64 r1, -0x148
0a16d8: mov64 r2, r10
0a16e0: add64 r2, -0x118
0a16e8: call 0x1f488 ; direct target 0x19bb30
0a16f0: ldxdw r1, [r10 - 0x140]
0a16f8: ldxdw r2, [r10 - 0x148]
0a1700: ja +0x5b ; branch 0xa19e0
0a1708: sub64 r1, r4
0a1710: stxdw [r2 + 0x48], r1
0a1718: ldxdw r1, [r2 + 0x58]
0a1720: jlt r1, r4, +0x1 ; branch 0xa1730
0a1728: ja +0x75 ; branch 0xa1ad8
0a1730: mov64 r1, r10
0a1738: add64 r1, -0x78
0a1740: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1750: call 0x16b85 ; direct target 0x157380
0a1758: stdw [r10 - 0x50], 0x0
0a1760: stdw [r10 - 0x58], 0x1
0a1768: stdw [r10 - 0x60], 0x0
0a1770: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0a1780: stxdw [r10 - 0x20], r1
0a1788: mov64 r1, r10
0a1790: add64 r1, -0x60
0a1798: stxdw [r10 - 0x28], r1
0a17a0: stb [r10 - 0x10], 0x3
0a17a8: stdw [r10 - 0x18], 0x20
0a17b0: stdw [r10 - 0x38], 0x0
0a17b8: stdw [r10 - 0x48], 0x0
0a17c0: mov64 r2, r10
0a17c8: add64 r2, -0x48
0a17d0: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a17e0: call 0x178d4 ; direct target 0x15de88
0a17e8: jeq r0, 0x0, +0x61 ; branch 0xa1af8
0a17f0: ja +0x18 ; branch 0xa18b8
0a17f8: mov64 r1, r10
0a1800: add64 r1, -0x78
0a1808: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a1818: call 0x16b6c ; direct target 0x157380
0a1820: stdw [r10 - 0x50], 0x0
0a1828: stdw [r10 - 0x58], 0x1
0a1830: stdw [r10 - 0x60], 0x0
0a1838: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0a1848: stxdw [r10 - 0x20], r1
0a1850: mov64 r1, r10
0a1858: add64 r1, -0x60
0a1860: stxdw [r10 - 0x28], r1
0a1868: stb [r10 - 0x10], 0x3
0a1870: stdw [r10 - 0x18], 0x20
0a1878: stdw [r10 - 0x38], 0x0
0a1880: stdw [r10 - 0x48], 0x0
0a1888: mov64 r2, r10
0a1890: add64 r2, -0x48
0a1898: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0a18a8: call 0x178bb ; direct target 0x15de88
0a18b0: jeq r0, 0x0, +0xa ; branch 0xa1908
0a18b8: mov64 r3, r10
0a18c0: add64 r3, -0x1
0a18c8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
0a18d8: mov64 r2, 0x37
0a18e0: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
0a18f0: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
0a1900: call 0x216a2 ; direct target 0x1ace18
0a1908: ldxdw r1, [r10 - 0x50]
0a1910: stxdw [r10 - 0xd0], r1
0a1918: ldxdw r1, [r10 - 0x58]
0a1920: stxdw [r10 - 0xd8], r1
0a1928: ldxdw r1, [r10 - 0x60]
0a1930: stxdw [r10 - 0xe0], r1
0a1938: ldxdw r1, [r10 - 0x78]
0a1940: stxdw [r10 - 0xf8], r1
0a1948: ldxdw r1, [r10 - 0x70]
0a1950: stxdw [r10 - 0xf0], r1
0a1958: ldxdw r1, [r10 - 0x68]
0a1960: stxdw [r10 - 0xe8], r1
0a1968: lddw r1, 0x1b72c5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/lib.rsbuyback_fee never exceeds protocol_feebuyback fee is at most protocol_feeglo'
0a1978: stxdw [r10 - 0x110], r1
0a1980: stw [r10 - 0x80], 0x1788
0a1988: stb [r10 - 0xc8], 0x2
0a1990: stw [r10 - 0x100], 0x9d8
0a1998: stdw [r10 - 0x108], 0x18
0a19a0: stdw [r10 - 0x118], 0x0
0a19a8: mov64 r1, r10
0a19b0: add64 r1, -0x158
0a19b8: mov64 r2, r10
0a19c0: add64 r2, -0x118
0a19c8: call 0x1f42c ; direct target 0x19bb30
0a19d0: ldxdw r1, [r10 - 0x150]
0a19d8: ldxdw r2, [r10 - 0x158]
0a19e0: stxdw [r6 + 0x8], r1
0a19e8: stxdw [r6 + 0x0], r2
0a19f0: exit
0a19f8: ldxdw r1, [r10 - 0x50]
0a1a00: stxdw [r10 - 0xd0], r1
0a1a08: ldxdw r1, [r10 - 0x58]
0a1a10: stxdw [r10 - 0xd8], r1
0a1a18: ldxdw r1, [r10 - 0x60]
0a1a20: stxdw [r10 - 0xe0], r1
0a1a28: ldxdw r1, [r10 - 0x78]
0a1a30: stxdw [r10 - 0xf8], r1
0a1a38: ldxdw r1, [r10 - 0x70]
0a1a40: stxdw [r10 - 0xf0], r1
0a1a48: ldxdw r1, [r10 - 0x68]
0a1a50: stxdw [r10 - 0xe8], r1
0a1a58: lddw r1, 0x1b72c5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/lib.rsbuyback_fee never exceeds protocol_feebuyback fee is at most protocol_feeglo'
0a1a68: stxdw [r10 - 0x110], r1
0a1a70: stw [r10 - 0x80], 0x1788
0a1a78: stb [r10 - 0xc8], 0x2
0a1a80: stw [r10 - 0x100], 0x9e2
0a1a88: stdw [r10 - 0x108], 0x18
0a1a90: stdw [r10 - 0x118], 0x0
0a1a98: mov64 r1, r10
0a1aa0: add64 r1, -0x138
0a1aa8: mov64 r2, r10
0a1ab0: add64 r2, -0x118
0a1ab8: call 0x1f40e ; direct target 0x19bb30
0a1ac0: ldxdw r1, [r10 - 0x130]
0a1ac8: ldxdw r2, [r10 - 0x138]
0a1ad0: ja -0x1f ; branch 0xa19e0
0a1ad8: sub64 r1, r4
0a1ae0: stxdw [r2 + 0x58], r1
0a1ae8: mov64 r2, 0x2
0a1af0: ja -0x23 ; branch 0xa19e0
0a1af8: ldxdw r1, [r10 - 0x50]
0a1b00: stxdw [r10 - 0xd0], r1
0a1b08: ldxdw r1, [r10 - 0x58]
0a1b10: stxdw [r10 - 0xd8], r1
0a1b18: ldxdw r1, [r10 - 0x60]
0a1b20: stxdw [r10 - 0xe0], r1
0a1b28: ldxdw r1, [r10 - 0x78]
0a1b30: stxdw [r10 - 0xf8], r1
0a1b38: ldxdw r1, [r10 - 0x70]
0a1b40: stxdw [r10 - 0xf0], r1
0a1b48: ldxdw r1, [r10 - 0x68]
0a1b50: stxdw [r10 - 0xe8], r1
0a1b58: lddw r1, 0x1b72c5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/lib.rsbuyback_fee never exceeds protocol_feebuyback fee is at most protocol_feeglo'
0a1b68: stxdw [r10 - 0x110], r1
0a1b70: stw [r10 - 0x80], 0x1788
0a1b78: stb [r10 - 0xc8], 0x2
0a1b80: stw [r10 - 0x100], 0x9e7
0a1b88: stdw [r10 - 0x108], 0x18
0a1b90: stdw [r10 - 0x118], 0x0
0a1b98: mov64 r1, r10
0a1ba0: add64 r1, -0x128
0a1ba8: mov64 r2, r10
0a1bb0: add64 r2, -0x118
0a1bb8: call 0x1f3ee ; direct target 0x19bb30
0a1bc0: ldxdw r1, [r10 - 0x120]
0a1bc8: ldxdw r2, [r10 - 0x128]
0a1bd0: ja -0x3f ; branch 0xa19e0
