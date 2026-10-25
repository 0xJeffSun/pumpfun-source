0a13e0: bf 16 00 00 00 00 00 00  mov64 r6, r1
0a13e8: 79 20 40 00 00 00 00 00  ldxdw r0, [r2 + 0x40]
0a13f0: bf 01 00 00 00 00 00 00  mov64 r1, r0
0a13f8: 0f 31 00 00 00 00 00 00  add64 r1, r3
0a1400: b7 05 00 00 01 00 00 00  mov64 r5, 0x1
0a1408: ad 01 01 00 00 00 00 00  jlt r1, r0, +0x1 <.text+0xa12f8> ; branch 0xa1418
0a1410: b7 05 00 00 00 00 00 00  mov64 r5, 0x0
0a1418: 57 05 00 00 01 00 00 00  and64 r5, 0x1
0a1420: 55 05 7a 00 00 00 00 00  jne r5, 0x0, +0x7a <.text+0xa16d8> ; branch 0xa17f8
0a1428: 7b 12 40 00 00 00 00 00  stxdw [r2 + 0x40], r1
0a1430: 79 25 50 00 00 00 00 00  ldxdw r5, [r2 + 0x50]
0a1438: bf 51 00 00 00 00 00 00  mov64 r1, r5
0a1440: 0f 31 00 00 00 00 00 00  add64 r1, r3
0a1448: b7 03 00 00 01 00 00 00  mov64 r3, 0x1
0a1450: ad 51 01 00 00 00 00 00  jlt r1, r5, +0x1 <.text+0xa1340> ; branch 0xa1460
0a1458: b7 03 00 00 00 00 00 00  mov64 r3, 0x0
0a1460: 57 03 00 00 01 00 00 00  and64 r3, 0x1
0a1468: 55 03 01 00 00 00 00 00  jne r3, 0x0, +0x1 <.text+0xa1358> ; branch 0xa1478
0a1470: 05 00 19 00 00 00 00 00  ja +0x19 <.text+0xa1420> ; branch 0xa1540
0a1478: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1480: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
0a1488: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
0a1498: 85 10 00 00 dc 6b 01 00  call 0x16bdc ; direct target 0x157380
0a14a0: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
0a14a8: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
0a14b0: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
0a14b8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
0a14c8: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
0a14d0: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a14d8: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
0a14e0: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
0a14e8: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
0a14f0: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
0a14f8: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
0a1500: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
0a1508: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a1510: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
0a1518: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
0a1528: 85 10 00 00 2b 79 01 00  call 0x1792b ; direct target 0x15de88
0a1530: 15 00 1e 00 00 00 00 00  jeq r0, 0x0, +0x1e <.text+0xa1508> ; branch 0xa1628
0a1538: 05 00 6f 00 00 00 00 00  ja +0x6f <.text+0xa1798> ; branch 0xa18b8
0a1540: 7b 12 50 00 00 00 00 00  stxdw [r2 + 0x50], r1
0a1548: 79 21 48 00 00 00 00 00  ldxdw r1, [r2 + 0x48]
0a1550: ad 41 01 00 00 00 00 00  jlt r1, r4, +0x1 <.text+0xa1440> ; branch 0xa1560
0a1558: 05 00 35 00 00 00 00 00  ja +0x35 <.text+0xa15e8> ; branch 0xa1708
0a1560: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1568: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
0a1570: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
0a1580: 85 10 00 00 bf 6b 01 00  call 0x16bbf ; direct target 0x157380
0a1588: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
0a1590: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
0a1598: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
0a15a0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
0a15b0: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
0a15b8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a15c0: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
0a15c8: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
0a15d0: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
0a15d8: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
0a15e0: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
0a15e8: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
0a15f0: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a15f8: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
0a1600: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
0a1610: 85 10 00 00 0e 79 01 00  call 0x1790e ; direct target 0x15de88
0a1618: 15 00 7b 00 00 00 00 00  jeq r0, 0x0, +0x7b <.text+0xa18d8> ; branch 0xa19f8
0a1620: 05 00 52 00 00 00 00 00  ja +0x52 <.text+0xa1798> ; branch 0xa18b8
0a1628: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
0a1630: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
0a1638: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
0a1640: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
0a1648: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
0a1650: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
0a1658: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
0a1660: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
0a1668: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
0a1670: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
0a1678: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
0a1680: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
0a1688: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b72c5
0a1698: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
0a16a0: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
0a16a8: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
0a16b0: 62 0a 00 ff dd 09 00 00  stw [r10 - 0x100], 0x9dd
0a16b8: 7a 0a f8 fe 18 00 00 00  stdw [r10 - 0x108], 0x18
0a16c0: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
0a16c8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a16d0: 07 01 00 00 b8 fe ff ff  add64 r1, -0x148
0a16d8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a16e0: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
0a16e8: 85 10 00 00 88 f4 01 00  call 0x1f488 ; direct target 0x19bb30
0a16f0: 79 a1 c0 fe 00 00 00 00  ldxdw r1, [r10 - 0x140]
0a16f8: 79 a2 b8 fe 00 00 00 00  ldxdw r2, [r10 - 0x148]
0a1700: 05 00 5b 00 00 00 00 00  ja +0x5b <.text+0xa18c0> ; branch 0xa19e0
0a1708: 1f 41 00 00 00 00 00 00  sub64 r1, r4
0a1710: 7b 12 48 00 00 00 00 00  stxdw [r2 + 0x48], r1
0a1718: 79 21 58 00 00 00 00 00  ldxdw r1, [r2 + 0x58]
0a1720: ad 41 01 00 00 00 00 00  jlt r1, r4, +0x1 <.text+0xa1610> ; branch 0xa1730
0a1728: 05 00 75 00 00 00 00 00  ja +0x75 <.text+0xa19b8> ; branch 0xa1ad8
0a1730: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1738: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
0a1740: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
0a1750: 85 10 00 00 85 6b 01 00  call 0x16b85 ; direct target 0x157380
0a1758: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
0a1760: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
0a1768: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
0a1770: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
0a1780: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
0a1788: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1790: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
0a1798: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
0a17a0: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
0a17a8: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
0a17b0: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
0a17b8: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
0a17c0: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a17c8: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
0a17d0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
0a17e0: 85 10 00 00 d4 78 01 00  call 0x178d4 ; direct target 0x15de88
0a17e8: 15 00 61 00 00 00 00 00  jeq r0, 0x0, +0x61 <.text+0xa19d8> ; branch 0xa1af8
0a17f0: 05 00 18 00 00 00 00 00  ja +0x18 <.text+0xa1798> ; branch 0xa18b8
0a17f8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1800: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
0a1808: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
0a1818: 85 10 00 00 6c 6b 01 00  call 0x16b6c ; direct target 0x157380
0a1820: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
0a1828: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
0a1830: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
0a1838: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
0a1848: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
0a1850: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1858: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
0a1860: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
0a1868: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
0a1870: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
0a1878: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
0a1880: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
0a1888: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a1890: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
0a1898: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
0a18a8: 85 10 00 00 bb 78 01 00  call 0x178bb ; direct target 0x15de88
0a18b0: 15 00 0a 00 00 00 00 00  jeq r0, 0x0, +0xa <.text+0xa17e8> ; branch 0xa1908
0a18b8: bf a3 00 00 00 00 00 00  mov64 r3, r10
0a18c0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
0a18c8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
0a18d8: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
0a18e0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
0a18f0: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
0a1900: 85 10 00 00 a2 16 02 00  call 0x216a2 ; direct target 0x1ace18
0a1908: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
0a1910: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
0a1918: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
0a1920: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
0a1928: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
0a1930: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
0a1938: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
0a1940: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
0a1948: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
0a1950: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
0a1958: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
0a1960: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
0a1968: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b72c5
0a1978: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
0a1980: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
0a1988: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
0a1990: 62 0a 00 ff d8 09 00 00  stw [r10 - 0x100], 0x9d8
0a1998: 7a 0a f8 fe 18 00 00 00  stdw [r10 - 0x108], 0x18
0a19a0: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
0a19a8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a19b0: 07 01 00 00 a8 fe ff ff  add64 r1, -0x158
0a19b8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a19c0: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
0a19c8: 85 10 00 00 2c f4 01 00  call 0x1f42c ; direct target 0x19bb30
0a19d0: 79 a1 b0 fe 00 00 00 00  ldxdw r1, [r10 - 0x150]
0a19d8: 79 a2 a8 fe 00 00 00 00  ldxdw r2, [r10 - 0x158]
0a19e0: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
0a19e8: 7b 26 00 00 00 00 00 00  stxdw [r6 + 0x0], r2
0a19f0: 95 00 00 00 00 00 00 00  exit
0a19f8: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
0a1a00: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
0a1a08: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
0a1a10: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
0a1a18: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
0a1a20: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
0a1a28: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
0a1a30: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
0a1a38: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
0a1a40: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
0a1a48: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
0a1a50: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
0a1a58: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b72c5
0a1a68: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
0a1a70: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
0a1a78: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
0a1a80: 62 0a 00 ff e2 09 00 00  stw [r10 - 0x100], 0x9e2
0a1a88: 7a 0a f8 fe 18 00 00 00  stdw [r10 - 0x108], 0x18
0a1a90: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
0a1a98: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1aa0: 07 01 00 00 c8 fe ff ff  add64 r1, -0x138
0a1aa8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a1ab0: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
0a1ab8: 85 10 00 00 0e f4 01 00  call 0x1f40e ; direct target 0x19bb30
0a1ac0: 79 a1 d0 fe 00 00 00 00  ldxdw r1, [r10 - 0x130]
0a1ac8: 79 a2 c8 fe 00 00 00 00  ldxdw r2, [r10 - 0x138]
0a1ad0: 05 00 e1 ff 00 00 00 00  ja -0x1f <.text+0xa18c0> ; branch 0xa19e0
0a1ad8: 1f 41 00 00 00 00 00 00  sub64 r1, r4
0a1ae0: 7b 12 58 00 00 00 00 00  stxdw [r2 + 0x58], r1
0a1ae8: b7 02 00 00 02 00 00 00  mov64 r2, 0x2
0a1af0: 05 00 dd ff 00 00 00 00  ja -0x23 <.text+0xa18c0> ; branch 0xa19e0
0a1af8: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
0a1b00: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
0a1b08: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
0a1b10: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
0a1b18: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
0a1b20: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
0a1b28: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
0a1b30: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
0a1b38: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
0a1b40: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
0a1b48: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
0a1b50: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
0a1b58: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b72c5
0a1b68: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
0a1b70: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
0a1b78: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
0a1b80: 62 0a 00 ff e7 09 00 00  stw [r10 - 0x100], 0x9e7
0a1b88: 7a 0a f8 fe 18 00 00 00  stdw [r10 - 0x108], 0x18
0a1b90: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
0a1b98: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a1ba0: 07 01 00 00 d8 fe ff ff  add64 r1, -0x128
0a1ba8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a1bb0: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
0a1bb8: 85 10 00 00 ee f3 01 00  call 0x1f3ee ; direct target 0x19bb30
0a1bc0: 79 a1 e0 fe 00 00 00 00  ldxdw r1, [r10 - 0x120]
0a1bc8: 79 a2 d8 fe 00 00 00 00  ldxdw r2, [r10 - 0x128]
0a1bd0: 05 00 c1 ff 00 00 00 00  ja -0x3f <.text+0xa18c0> ; branch 0xa19e0
