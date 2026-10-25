0b1370: mov64 r7, r3
0b1378: mov64 r8, r2
0b1380: mov64 r6, r1
0b1388: ldxdw r2, [r8 + 0x120]
0b1390: mov64 r1, r10
0b1398: add64 r1, -0x28
0b13a0: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0b13b0: mov64 r4, r7
0b13b8: call -0x15a36 ; call 0x4210
0b13c0: ldxdw r2, [r10 - 0x28]
0b13c8: jne r2, 0x2, +0x18 ; branch 0xb1490
0b13d0: ldxdw r1, [r8 + 0x148]
0b13d8: ldxdw r9, [r1 + 0x20]
0b13e0: mov64 r2, r7
0b13e8: mov64 r3, 0x20
0b13f0: call 0xd09d ; call 0x1198e0
0b13f8: lsh64 r0, 0x20
0b1400: rsh64 r0, 0x20
0b1408: jne r0, 0x0, +0x26 ; branch 0xb1540
0b1410: mov64 r1, r9
0b1418: call 0xa365 ; call 0x102f48
0b1420: jne r0, 0x0, +0x23 ; branch 0xb1540
0b1428: mov64 r1, r10
0b1430: add64 r1, -0x18
0b1438: mov64 r2, r9
0b1440: call 0xafba ; call 0x109218
0b1448: ldxdw r1, [r10 - 0x8]
0b1450: ldxdw r2, [r10 - 0x18]
0b1458: lddw r3, -0x7fffffffffffffe6
0b1468: jne r2, r3, +0xe ; branch 0xb14e0
0b1470: ldxdw r2, [r1 + 0x0]
0b1478: add64 r2, 0x1
0b1480: stxdw [r1 + 0x0], r2
0b1488: ja +0x16 ; branch 0xb1540
0b1490: ldxdw r3, [r10 - 0x20]
0b1498: mov64 r1, r10
0b14a0: add64 r1, -0x38
0b14a8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b14b8: mov64 r5, 0x4
0b14c0: call -0x15eea ; call 0x1d78
0b14c8: ldxdw r1, [r10 - 0x30]
0b14d0: ldxdw r3, [r10 - 0x38]
0b14d8: ja +0x56 ; branch 0xb1790
0b14e0: ldxdw r3, [r10 - 0x10]
0b14e8: stxdw [r10 - 0x8], r1
0b14f0: stxdw [r10 - 0x10], r3
0b14f8: stxdw [r10 - 0x18], r2
0b1500: mov64 r1, r10
0b1508: add64 r1, -0x48
0b1510: mov64 r2, r10
0b1518: add64 r2, -0x18
0b1520: call 0xa363 ; call 0x103040
0b1528: ldxdw r2, [r10 - 0x48]
0b1530: jeq r2, 0x2, +0x1 ; branch 0xb1540
0b1538: ja +0xe1 ; branch 0xb1c48
0b1540: ldxdw r1, [r8 + 0x150]
0b1548: ldxdw r9, [r1 + 0x20]
0b1550: mov64 r2, r7
0b1558: mov64 r3, 0x20
0b1560: call 0xd06f ; call 0x1198e0
0b1568: lsh64 r0, 0x20
0b1570: rsh64 r0, 0x20
0b1578: jne r0, 0x0, +0x1 ; branch 0xb1588
0b1580: ja +0x44 ; branch 0xb17a8
0b1588: ldxdw r1, [r8 + 0x158]
0b1590: ldxdw r9, [r1 + 0x20]
0b1598: mov64 r2, r7
0b15a0: mov64 r3, 0x20
0b15a8: call 0xd066 ; call 0x1198e0
0b15b0: lsh64 r0, 0x20
0b15b8: rsh64 r0, 0x20
0b15c0: jne r0, 0x0, +0x1 ; branch 0xb15d0
0b15c8: ja +0x4b ; branch 0xb1828
0b15d0: ldxdw r1, [r8 + 0x160]
0b15d8: ldxdw r9, [r1 + 0x20]
0b15e0: mov64 r2, r7
0b15e8: mov64 r3, 0x20
0b15f0: call 0xd05d ; call 0x1198e0
0b15f8: lsh64 r0, 0x20
0b1600: rsh64 r0, 0x20
0b1608: jne r0, 0x0, +0x1 ; branch 0xb1618
0b1610: ja +0x52 ; branch 0xb18a8
0b1618: ldxdw r1, [r8 + 0x168]
0b1620: ldxdw r9, [r1 + 0x20]
0b1628: mov64 r2, r7
0b1630: mov64 r3, 0x20
0b1638: call 0xd054 ; call 0x1198e0
0b1640: lsh64 r0, 0x20
0b1648: rsh64 r0, 0x20
0b1650: jne r0, 0x0, +0x1 ; branch 0xb1660
0b1658: ja +0x59 ; branch 0xb1928
0b1660: ldxdw r3, [r8 + 0x198]
0b1668: ldxdw r2, [r3 + 0x20]
0b1670: mov64 r1, r10
0b1678: add64 r1, -0xe8
0b1680: mov64 r4, r7
0b1688: call -0x1591a ; call 0x4dc0
0b1690: ldxdw r2, [r10 - 0xe8]
0b1698: jeq r2, 0x2, +0x1 ; branch 0xb16a8
0b16a0: ja +0x14 ; branch 0xb1748
0b16a8: ldxdw r2, [r8 + 0x1a8]
0b16b0: mov64 r1, r10
0b16b8: add64 r1, -0x108
0b16c0: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0b16d0: mov64 r4, r7
0b16d8: call -0x159c5 ; call 0x48b8
0b16e0: mov64 r3, 0x2
0b16e8: ldxdw r2, [r10 - 0x108]
0b16f0: jeq r2, 0x2, +0x13 ; branch 0xb1790
0b16f8: ldxdw r3, [r10 - 0x100]
0b1700: mov64 r1, r10
0b1708: add64 r1, -0x118
0b1710: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b1720: mov64 r5, 0x17
0b1728: call -0x15f37 ; call 0x1d78
0b1730: ldxdw r1, [r10 - 0x110]
0b1738: ldxdw r3, [r10 - 0x118]
0b1740: ja +0x9 ; branch 0xb1790
0b1748: ldxdw r3, [r10 - 0xe0]
0b1750: mov64 r1, r10
0b1758: add64 r1, -0xf8
0b1760: lddw r4, 0x11e204 ; rodata b'coin_creator_vault_atacoin_creator_token_accountcoin_creator_vault_authorit'
0b1770: mov64 r5, 0x16
0b1778: call -0x15f41 ; call 0x1d78
0b1780: ldxdw r1, [r10 - 0xf0]
0b1788: ldxdw r3, [r10 - 0xf8]
0b1790: stxdw [r6 + 0x8], r1
0b1798: stxdw [r6 + 0x0], r3
0b17a0: exit
0b17a8: mov64 r1, r9
0b17b0: call 0xa2f2 ; call 0x102f48
0b17b8: jne r0, 0x0, -0x47 ; branch 0xb1588
0b17c0: mov64 r1, r10
0b17c8: add64 r1, -0x18
0b17d0: mov64 r2, r9
0b17d8: call 0xaf47 ; call 0x109218
0b17e0: ldxdw r1, [r10 - 0x8]
0b17e8: ldxdw r2, [r10 - 0x18]
0b17f0: lddw r3, -0x7fffffffffffffe6
0b1800: jne r2, r3, +0x34 ; branch 0xb19a8
0b1808: ldxdw r2, [r1 + 0x0]
0b1810: add64 r2, 0x1
0b1818: stxdw [r1 + 0x0], r2
0b1820: ja -0x54 ; branch 0xb1588
0b1828: mov64 r1, r9
0b1830: call 0xa2e2 ; call 0x102f48
0b1838: jne r0, 0x0, -0x4e ; branch 0xb15d0
0b1840: mov64 r1, r10
0b1848: add64 r1, -0x18
0b1850: mov64 r2, r9
0b1858: call 0xaf37 ; call 0x109218
0b1860: ldxdw r1, [r10 - 0x8]
0b1868: ldxdw r2, [r10 - 0x18]
0b1870: lddw r3, -0x7fffffffffffffe6
0b1880: jne r2, r3, +0x39 ; branch 0xb1a50
0b1888: ldxdw r2, [r1 + 0x0]
0b1890: add64 r2, 0x1
0b1898: stxdw [r1 + 0x0], r2
0b18a0: ja -0x5b ; branch 0xb15d0
0b18a8: mov64 r1, r9
0b18b0: call 0xa2d2 ; call 0x102f48
0b18b8: jne r0, 0x0, -0x55 ; branch 0xb1618
0b18c0: mov64 r1, r10
0b18c8: add64 r1, -0x18
0b18d0: mov64 r2, r9
0b18d8: call 0xaf27 ; call 0x109218
0b18e0: ldxdw r1, [r10 - 0x8]
0b18e8: ldxdw r2, [r10 - 0x18]
0b18f0: lddw r3, -0x7fffffffffffffe6
0b1900: jne r2, r3, +0x3e ; branch 0xb1af8
0b1908: ldxdw r2, [r1 + 0x0]
0b1910: add64 r2, 0x1
0b1918: stxdw [r1 + 0x0], r2
0b1920: ja -0x62 ; branch 0xb1618
0b1928: mov64 r1, r9
0b1930: call 0xa2c2 ; call 0x102f48
0b1938: jne r0, 0x0, -0x5c ; branch 0xb1660
0b1940: mov64 r1, r10
0b1948: add64 r1, -0x18
0b1950: mov64 r2, r9
0b1958: call 0xaf17 ; call 0x109218
0b1960: ldxdw r1, [r10 - 0x8]
0b1968: ldxdw r2, [r10 - 0x18]
0b1970: lddw r3, -0x7fffffffffffffe6
0b1980: jne r2, r3, +0x43 ; branch 0xb1ba0
0b1988: ldxdw r2, [r1 + 0x0]
0b1990: add64 r2, 0x1
0b1998: stxdw [r1 + 0x0], r2
0b19a0: ja -0x69 ; branch 0xb1660
0b19a8: ldxdw r3, [r10 - 0x10]
0b19b0: stxdw [r10 - 0x8], r1
0b19b8: stxdw [r10 - 0x10], r3
0b19c0: stxdw [r10 - 0x18], r2
0b19c8: mov64 r1, r10
0b19d0: add64 r1, -0x68
0b19d8: mov64 r2, r10
0b19e0: add64 r2, -0x18
0b19e8: call 0xa2ca ; call 0x103040
0b19f0: ldxdw r2, [r10 - 0x68]
0b19f8: jeq r2, 0x2, -0x8f ; branch 0xb1588
0b1a00: ldxdw r3, [r10 - 0x60]
0b1a08: mov64 r1, r10
0b1a10: add64 r1, -0x78
0b1a18: lddw r4, 0x11e304 ; rodata b'user_quote_token_accounttoken_2022_programprotocol_fee_recipient_token_acco'
0b1a28: mov64 r5, 0x18
0b1a30: call -0x15f98 ; call 0x1d78
0b1a38: ldxdw r1, [r10 - 0x70]
0b1a40: ldxdw r3, [r10 - 0x78]
0b1a48: ja -0x58 ; branch 0xb1790
0b1a50: ldxdw r3, [r10 - 0x10]
0b1a58: stxdw [r10 - 0x8], r1
0b1a60: stxdw [r10 - 0x10], r3
0b1a68: stxdw [r10 - 0x18], r2
0b1a70: mov64 r1, r10
0b1a78: add64 r1, -0x88
0b1a80: mov64 r2, r10
0b1a88: add64 r2, -0x18
0b1a90: call 0xa2b5 ; call 0x103040
0b1a98: ldxdw r2, [r10 - 0x88]
0b1aa0: jeq r2, 0x2, -0x9b ; branch 0xb15d0
0b1aa8: ldxdw r3, [r10 - 0x80]
0b1ab0: mov64 r1, r10
0b1ab8: add64 r1, -0x98
0b1ac0: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0b1ad0: mov64 r5, 0x17
0b1ad8: call -0x15fad ; call 0x1d78
0b1ae0: ldxdw r1, [r10 - 0x90]
0b1ae8: ldxdw r3, [r10 - 0x98]
0b1af0: ja -0x6d ; branch 0xb1790
0b1af8: ldxdw r3, [r10 - 0x10]
0b1b00: stxdw [r10 - 0x8], r1
0b1b08: stxdw [r10 - 0x10], r3
0b1b10: stxdw [r10 - 0x18], r2
0b1b18: mov64 r1, r10
0b1b20: add64 r1, -0xa8
0b1b28: mov64 r2, r10
0b1b30: add64 r2, -0x18
0b1b38: call 0xa2a0 ; call 0x103040
0b1b40: ldxdw r2, [r10 - 0xa8]
0b1b48: jeq r2, 0x2, -0xa7 ; branch 0xb1618
0b1b50: ldxdw r3, [r10 - 0xa0]
0b1b58: mov64 r1, r10
0b1b60: add64 r1, -0xb8
0b1b68: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0b1b78: mov64 r5, 0x18
0b1b80: call -0x15fc2 ; call 0x1d78
0b1b88: ldxdw r1, [r10 - 0xb0]
0b1b90: ldxdw r3, [r10 - 0xb8]
0b1b98: ja -0x82 ; branch 0xb1790
0b1ba0: ldxdw r3, [r10 - 0x10]
0b1ba8: stxdw [r10 - 0x8], r1
0b1bb0: stxdw [r10 - 0x10], r3
0b1bb8: stxdw [r10 - 0x18], r2
0b1bc0: mov64 r1, r10
0b1bc8: add64 r1, -0xc8
0b1bd0: mov64 r2, r10
0b1bd8: add64 r2, -0x18
0b1be0: call 0xa28b ; call 0x103040
0b1be8: ldxdw r2, [r10 - 0xc8]
0b1bf0: jeq r2, 0x2, -0xb3 ; branch 0xb1660
0b1bf8: ldxdw r3, [r10 - 0xc0]
0b1c00: mov64 r1, r10
0b1c08: add64 r1, -0xd8
0b1c10: lddw r4, 0x11e32e ; rodata b'protocol_fee_recipient_token_accountfee_configfee_programprotocol_fee_recip'
0b1c20: mov64 r5, 0x24
0b1c28: call -0x15fd7 ; call 0x1d78
0b1c30: ldxdw r1, [r10 - 0xd0]
0b1c38: ldxdw r3, [r10 - 0xd8]
0b1c40: ja -0x97 ; branch 0xb1790
0b1c48: ldxdw r3, [r10 - 0x40]
0b1c50: mov64 r1, r10
0b1c58: add64 r1, -0x58
0b1c60: lddw r4, 0x11e2ed ; rodata b'user_base_token_accountuser_quote_token_accounttoken_2022_programprotocol_f'
0b1c70: mov64 r5, 0x17
0b1c78: call -0x15fe1 ; call 0x1d78
0b1c80: ldxdw r1, [r10 - 0x50]
0b1c88: ldxdw r3, [r10 - 0x58]
0b1c90: ja -0xa1 ; branch 0xb1790
