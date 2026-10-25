
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   d1290: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   d1298: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   d12a0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   d12a8: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   d12b0: 79 89 18 00 00 00 00 00      	ldxdw r9, [r8 + 0x18]
   d12b8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d12c0: 18 02 00 00 90 bd 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11bd90
   d12d0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d12d8: 85 10 00 00 c0 90 00 00      	call 0x90c0
   d12e0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d12e8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d12f0: 15 00 15 00 00 00 00 00      	jeq r0, 0x0, +0x15 <.text+0xd1280>
   d12f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1300: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   d1308: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   d1310: 85 10 00 00 42 6a fe ff      	call -0x195be
   d1318: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   d1320: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xd1210>
   d1328: 05 00 0d 03 00 00 00 00      	ja +0x30d <.text+0xd2a78>
   d1330: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   d1338: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   d1340: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1348: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   d1350: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d1360: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d1368: 85 10 00 00 41 61 fe ff      	call -0x19ebf
   d1370: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   d1378: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]
   d1380: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   d1388: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   d1390: 72 07 59 00 02 00 00 00      	stb [r7 + 0x59], 0x2
   d1398: 05 00 af 03 00 00 00 00      	ja +0x3af <.text+0xd2ff8>
   d13a0: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   d13a8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d13b0: 85 10 00 00 63 6f 00 00      	call 0x6f63
   d13b8: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d13c0: 7b 9a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r9
   d13c8: 15 07 3e 00 00 00 00 00      	jeq r7, 0x0, +0x3e <.text+0xd14a0>
   d13d0: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   d13d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d13e0: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   d13e8: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   d13f0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   d13f8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   d1400: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   d1408: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   d1410: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d1418: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   d1420: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d1428: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   d1430: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d1438: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   d1440: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   d1448: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   d1450: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d1458: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d1460: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   d1468: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   d1470: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   d1478: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   d1480: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   d1488: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   d1490: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1498: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   d14a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d14a8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   d14b0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d14b8: 85 10 00 00 84 90 00 00      	call 0x9084
   d14c0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d14c8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d14d0: 15 00 de 00 00 00 00 00      	jeq r0, 0x0, +0xde <.text+0xd1aa8>
   d14d8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   d14e0: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   d14e8: 85 10 00 00 5f 6b 00 00      	call 0x6b5f
   d14f0: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   d14f8: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <.text+0xd13e8>
   d1500: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   d1508: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   d1510: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   d1518: 2d 70 01 00 00 00 00 00      	jgt r0, r7, +0x1 <.text+0xd1408>
   d1520: 05 00 b4 01 00 00 00 00      	ja +0x1b4 <.text+0xd21a8>
   d1528: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   d1530: 1f 72 00 00 00 00 00 00      	sub64 r2, r7
   d1538: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   d1540: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d1548: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <.text+0xd1438>
   d1550: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d1558: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   d1560: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0xd1450>
   d1568: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   d1570: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   d1578: 79 30 08 00 00 00 00 00      	ldxdw r0, [r3 + 0x8]
   d1580: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   d1588: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d1590: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd1480>
   d1598: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   d15a0: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   d15a8: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   d15b0: 55 01 17 01 01 00 00 00      	jne r1, 0x1, +0x117 <.text+0xd1d50>
   d15b8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0xd1510>
   d15c0: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   d15c8: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   d15d0: 85 10 00 00 42 6b 00 00      	call 0x6b42
   d15d8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   d15e0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d15e8: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   d15f0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   d15f8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d1600: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d1608: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd14f8>
   d1610: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d1618: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   d1620: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d1628: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1518>
   d1630: 85 10 00 00 ff ff ff ff      	call -0x1
   d1638: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   d1640: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   d1648: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d1650: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d1658: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd1548>
   d1660: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d1668: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   d1670: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   d1678: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   d1680: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1570>
   d1688: 05 00 f4 ff 00 00 00 00      	ja -0xc <.text+0xd1510>
   d1690: 7b 7a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r7
   d1698: 79 85 08 00 00 00 00 00      	ldxdw r5, [r8 + 0x8]
   d16a0: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   d16a8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d16b0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d16b8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd15a8>
   d16c0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d16c8: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   d16d0: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   d16d8: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   d16e0: 7b 0a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r0
   d16e8: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   d16f0: 7b 0a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r0
   d16f8: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   d1700: 7b 0a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r0
   d1708: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   d1710: 7b 0a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r0
   d1718: 79 17 18 00 00 00 00 00      	ldxdw r7, [r1 + 0x18]
   d1720: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   d1728: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1618>
   d1730: 05 00 df ff 00 00 00 00      	ja -0x21 <.text+0xd1510>
   d1738: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   d1740: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d1748: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1750: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d1758: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1648>
   d1760: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d1768: 7b 5a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r5
   d1770: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d1778: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd1668>
   d1780: 05 00 d5 ff 00 00 00 00      	ja -0x2b <.text+0xd1510>
   d1788: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d1790: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   d1798: 79 52 08 00 00 00 00 00      	ldxdw r2, [r5 + 0x8]
   d17a0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d17a8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d17b0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d17b8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd16a8>
   d17c0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d17c8: 71 80 2a 00 00 00 00 00      	ldxb r0, [r8 + 0x2a]
   d17d0: 7b 0a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r0
   d17d8: 71 80 29 00 00 00 00 00      	ldxb r0, [r8 + 0x29]
   d17e0: 7b 0a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r0
   d17e8: 71 80 28 00 00 00 00 00      	ldxb r0, [r8 + 0x28]
   d17f0: 7b 0a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r0
   d17f8: 79 80 20 00 00 00 00 00      	ldxdw r0, [r8 + 0x20]
   d1800: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   d1808: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   d1810: 7b 0a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r0
   d1818: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   d1820: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   d1828: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d1830: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1720>
   d1838: 05 00 be ff 00 00 00 00      	ja -0x42 <.text+0xd1510>
   d1840: 7b 7a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r7
   d1848: 7b 4a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r4
   d1850: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   d1858: 79 54 10 00 00 00 00 00      	ldxdw r4, [r5 + 0x10]
   d1860: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d1868: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1870: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d1878: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1768>
   d1880: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d1888: 79 a0 88 fc 00 00 00 00      	ldxdw r0, [r10 - 0x378]
   d1890: 79 a7 98 fc 00 00 00 00      	ldxdw r7, [r10 - 0x368]
   d1898: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d18a0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1790>
   d18a8: 05 00 b0 ff 00 00 00 00      	ja -0x50 <.text+0xd1510>
   d18b0: 79 51 18 00 00 00 00 00      	ldxdw r1, [r5 + 0x18]
   d18b8: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   d18c0: 79 51 20 00 00 00 00 00      	ldxdw r1, [r5 + 0x20]
   d18c8: 7b 1a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r1
   d18d0: 71 51 28 00 00 00 00 00      	ldxb r1, [r5 + 0x28]
   d18d8: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   d18e0: 71 57 29 00 00 00 00 00      	ldxb r7, [r5 + 0x29]
   d18e8: 71 55 2a 00 00 00 00 00      	ldxb r5, [r5 + 0x2a]
   d18f0: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   d18f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d1900: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   d1908: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   d1910: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   d1918: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   d1920: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   d1928: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   d1930: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d1938: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   d1940: 79 61 28 00 00 00 00 00      	ldxdw r1, [r6 + 0x28]
   d1948: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   d1950: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d1958: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   d1960: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   d1968: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d1970: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   d1978: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   d1980: 18 03 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x11cd4b
   d1990: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   d1998: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   d19a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d19a8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   d19b0: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   d19b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d19c0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   d19c8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   d19d0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   d19d8: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   d19e0: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   d19e8: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   d19f0: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   d19f8: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   d1a00: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   d1a08: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   d1a10: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   d1a18: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   d1a20: 7b 9a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r9
   d1a28: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   d1a30: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   d1a38: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   d1a40: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   d1a48: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   d1a50: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   d1a58: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   d1a60: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   d1a68: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   d1a70: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   d1a78: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   d1a80: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   d1a88: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   d1a90: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   d1a98: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   d1aa0: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   d1aa8: 7b 0a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r0
   d1ab0: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   d1ab8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   d1ac0: 73 5a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r5
   d1ac8: 73 7a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r7
   d1ad0: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   d1ad8: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   d1ae0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   d1ae8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d1af0: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   d1af8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d1b00: 7b 4a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r4
   d1b08: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   d1b10: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   d1b18: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d1b20: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   d1b28: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   d1b30: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   d1b38: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   d1b40: 7a 0a c0 fe 01 00 00 00      	stdw [r10 - 0x140], 0x1
   d1b48: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   d1b50: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   d1b58: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   d1b60: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   d1b68: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   d1b70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1b78: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   d1b80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d1b88: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   d1b90: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   d1b98: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   d1ba0: 85 10 00 00 08 66 00 00      	call 0x6608
   d1ba8: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   d1bb0: 15 01 e8 01 02 00 00 00      	jeq r1, 0x2, +0x1e8 <.text+0xd29d8>
   d1bb8: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   d1bc0: 05 00 a6 02 00 00 00 00      	ja +0x2a6 <.text+0xd2fd8>
   d1bc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1bd0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   d1bd8: 18 02 00 00 f4 bf 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11bff4
   d1be8: 85 10 00 00 cb 66 00 00      	call 0x66cb
   d1bf0: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   d1bf8: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   d1c00: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   d1c08: 18 01 00 00 e0 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221e0
   d1c18: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   d1c20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1c28: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   d1c30: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   d1c38: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   d1c40: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   d1c48: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   d1c50: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   d1c58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d1c60: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   d1c68: 18 01 00 00 f4 bf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11bff4
   d1c78: 85 10 00 00 81 68 00 00      	call 0x6881
   d1c80: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xd1bb8>
   d1c88: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d1c90: 07 03 00 00 10 fe ff ff      	add64 r3, -0x1f0
   d1c98: 18 01 00 00 fa c0 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c0fa
   d1ca8: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   d1cb0: 18 04 00 00 10 22 12 00 00 00 00 00 00 00 00 00      	lddw r4, 0x122210
   d1cc0: 18 05 00 00 30 22 12 00 00 00 00 00 00 00 00 00      	lddw r5, 0x122230
   d1cd0: 85 10 00 00 58 82 00 00      	call 0x8258
   d1cd8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   d1ce0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   d1ce8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   d1cf0: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   d1cf8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   d1d00: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d1d08: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   d1d10: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   d1d18: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   d1d20: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   d1d28: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   d1d30: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d1d38: 18 01 00 00 58 e4 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11e458
   d1d48: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   d1d50: 62 0a a8 fe 05 10 00 00      	stw [r10 - 0x158], 0x1005
   d1d58: 72 0a 60 fe 02 00 00 00      	stb [r10 - 0x1a0], 0x2
   d1d60: 62 0a 28 fe 08 00 00 00      	stw [r10 - 0x1d8], 0x8
   d1d68: 7a 0a 20 fe 53 00 00 00      	stdw [r10 - 0x1e0], 0x53
   d1d70: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   d1d78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1d80: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   d1d88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d1d90: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   d1d98: 85 10 00 00 43 62 00 00      	call 0x6243
   d1da0: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   d1da8: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   d1db0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   d1db8: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d1dc0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   d1dc8: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   d1dd0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d1dd8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   d1de0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d1de8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   d1df0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   d1df8: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   d1e00: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   d1e08: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   d1e10: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   d1e18: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d1e20: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d1e28: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d1e30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1e38: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   d1e40: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d1e48: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   d1e50: 85 10 00 00 6f 62 00 00      	call 0x626f
   d1e58: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   d1e60: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   d1e68: 05 00 fc 01 00 00 00 00      	ja +0x1fc <.text+0xd2d30>
   d1e70: 79 39 10 00 00 00 00 00      	ldxdw r9, [r3 + 0x10]
   d1e78: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d1e80: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1e88: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d1e90: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1d80>
   d1e98: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d1ea0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d1ea8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd1d98>
   d1eb0: 05 00 ef fe 00 00 00 00      	ja -0x111 <.text+0xd1510>
   d1eb8: 7b 4a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r4
   d1ec0: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   d1ec8: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d1ed0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1ed8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d1ee0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1dd0>
   d1ee8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d1ef0: 79 87 00 00 00 00 00 00      	ldxdw r7, [r8 + 0x0]
   d1ef8: 7b 7a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r7
   d1f00: 71 37 2a 00 00 00 00 00      	ldxb r7, [r3 + 0x2a]
   d1f08: 7b 7a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r7
   d1f10: 71 37 29 00 00 00 00 00      	ldxb r7, [r3 + 0x29]
   d1f18: 7b 7a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r7
   d1f20: 71 37 28 00 00 00 00 00      	ldxb r7, [r3 + 0x28]
   d1f28: 7b 7a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r7
   d1f30: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   d1f38: 7b 7a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r7
   d1f40: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   d1f48: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   d1f50: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d1f58: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd1e48>
   d1f60: 05 00 d9 fe 00 00 00 00      	ja -0x127 <.text+0xd1510>
   d1f68: 79 82 10 00 00 00 00 00      	ldxdw r2, [r8 + 0x10]
   d1f70: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d1f78: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1f80: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d1f88: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1e78>
   d1f90: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d1f98: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   d1fa0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d1fa8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd1e98>
   d1fb0: 05 00 cf fe 00 00 00 00      	ja -0x131 <.text+0xd1510>
   d1fb8: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d1fc0: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   d1fc8: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   d1fd0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   d1fd8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d1fe0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   d1fe8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1ed8>
   d1ff0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   d1ff8: 71 87 2a 00 00 00 00 00      	ldxb r7, [r8 + 0x2a]
   d2000: 7b 7a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r7
   d2008: 71 87 29 00 00 00 00 00      	ldxb r7, [r8 + 0x29]
   d2010: 7b 7a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r7
   d2018: 71 87 28 00 00 00 00 00      	ldxb r7, [r8 + 0x28]
   d2020: 7b 7a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r7
   d2028: 79 87 20 00 00 00 00 00      	ldxdw r7, [r8 + 0x20]
   d2030: 7b 7a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r7
   d2038: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   d2040: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   d2048: 79 67 00 00 00 00 00 00      	ldxdw r7, [r6 + 0x0]
   d2050: 7b 7a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r7
   d2058: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d2060: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xd1f50>
   d2068: 05 00 b8 fe 00 00 00 00      	ja -0x148 <.text+0xd1510>
   d2070: 7b 9a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r9
   d2078: 7b 5a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r5
   d2080: 79 67 10 00 00 00 00 00      	ldxdw r7, [r6 + 0x10]
   d2088: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d2090: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2098: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   d20a0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd1f90>
   d20a8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   d20b0: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   d20b8: 79 a5 88 fc 00 00 00 00      	ldxdw r5, [r10 - 0x378]
   d20c0: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   d20c8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xd1fb8>
   d20d0: 05 00 ab fe 00 00 00 00      	ja -0x155 <.text+0xd1510>
   d20d8: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d20e0: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   d20e8: 79 64 20 00 00 00 00 00      	ldxdw r4, [r6 + 0x20]
   d20f0: 71 65 28 00 00 00 00 00      	ldxb r5, [r6 + 0x28]
   d20f8: 71 60 29 00 00 00 00 00      	ldxb r0, [r6 + 0x29]
   d2100: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   d2108: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   d2110: 73 1a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r1
   d2118: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   d2120: 73 1a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r1
   d2128: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   d2130: 73 1a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r1
   d2138: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   d2140: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   d2148: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   d2150: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   d2158: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   d2160: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   d2168: 7b 2a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r2
   d2170: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   d2178: 7b 2a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r2
   d2180: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   d2188: 73 2a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r2
   d2190: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   d2198: 73 2a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r2
   d21a0: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   d21a8: 73 2a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r2
   d21b0: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   d21b8: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   d21c0: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   d21c8: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   d21d0: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   d21d8: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   d21e0: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   d21e8: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   d21f0: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   d21f8: 73 6a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r6
   d2200: 73 0a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r0
   d2208: 73 5a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r5
   d2210: 7b 4a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r4
   d2218: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   d2220: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   d2228: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   d2230: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   d2238: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   d2240: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   d2248: 7a 0a 90 ff 00 00 00 00      	stdw [r10 - 0x70], 0x0
   d2250: 7a 0a 88 ff 08 00 00 00      	stdw [r10 - 0x78], 0x8
   d2258: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   d2260: 7a 0a e8 fe 08 00 00 00      	stdw [r10 - 0x118], 0x8
   d2268: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   d2270: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2278: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   d2280: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d2288: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   d2290: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   d2298: 85 10 00 00 91 65 00 00      	call 0x6591
   d22a0: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   d22a8: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   d22b0: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <.text+0xd21a8>
   d22b8: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   d22c0: 05 00 c6 01 00 00 00 00      	ja +0x1c6 <.text+0xd2fd8>
   d22c8: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   d22d0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   d22d8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d22e0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d22e8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd21d8>
   d22f0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d22f8: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   d2300: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d2308: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd21f8>
   d2310: 05 00 63 fe 00 00 00 00      	ja -0x19d <.text+0xd1510>
   d2318: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   d2320: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d2328: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2330: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d2338: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2228>
   d2340: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d2348: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d2350: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd2240>
   d2358: 05 00 5a fe 00 00 00 00      	ja -0x1a6 <.text+0xd1510>
   d2360: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   d2368: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   d2370: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   d2378: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d2380: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2388: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d2390: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2280>
   d2398: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d23a0: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   d23a8: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   d23b0: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   d23b8: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   d23c0: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   d23c8: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   d23d0: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   d23d8: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   d23e0: 79 88 18 00 00 00 00 00      	ldxdw r8, [r8 + 0x18]
   d23e8: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   d23f0: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   d23f8: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d2400: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd22f0>
   d2408: 05 00 44 fe 00 00 00 00      	ja -0x1bc <.text+0xd1510>
   d2410: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   d2418: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   d2420: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2428: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d2430: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2320>
   d2438: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d2440: 7b 8a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r8
   d2448: 7b 9a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r9
   d2450: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   d2458: 7b 3a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r3
   d2460: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   d2468: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd2358>
   d2470: 05 00 37 fe 00 00 00 00      	ja -0x1c9 <.text+0xd1510>
   d2478: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d2480: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   d2488: 79 79 20 00 00 00 00 00      	ldxdw r9, [r7 + 0x20]
   d2490: 71 72 28 00 00 00 00 00      	ldxb r2, [r7 + 0x28]
   d2498: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   d24a0: 71 73 2a 00 00 00 00 00      	ldxb r3, [r7 + 0x2a]
   d24a8: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   d24b0: 79 86 20 00 00 00 00 00      	ldxdw r6, [r8 + 0x20]
   d24b8: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   d24c0: 79 60 18 00 00 00 00 00      	ldxdw r0, [r6 + 0x18]
   d24c8: 7b 0a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r0
   d24d0: 79 60 10 00 00 00 00 00      	ldxdw r0, [r6 + 0x10]
   d24d8: 7b 0a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r0
   d24e0: 79 60 08 00 00 00 00 00      	ldxdw r0, [r6 + 0x8]
   d24e8: 7b 0a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r0
   d24f0: 79 60 00 00 00 00 00 00      	ldxdw r0, [r6 + 0x0]
   d24f8: 7b 0a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r0
   d2500: 79 80 28 00 00 00 00 00      	ldxdw r0, [r8 + 0x28]
   d2508: 71 08 00 00 00 00 00 00      	ldxb r8, [r0 + 0x0]
   d2510: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   d2518: 07 00 00 00 bf ff ff ff      	add64 r0, -0x41
   d2520: 7b 0a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r0
   d2528: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   d2530: 07 00 00 00 98 ff ff ff      	add64 r0, -0x68
   d2538: 7b 0a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r0
   d2540: 18 00 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r0, 0x11cd4b
   d2550: 7b 0a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r0
   d2558: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   d2560: 07 00 00 00 c0 ff ff ff      	add64 r0, -0x40
   d2568: 7b 0a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r0
   d2570: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   d2578: 07 00 00 00 c8 fe ff ff      	add64 r0, -0x138
   d2580: 7b 0a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r0
   d2588: 73 3a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r3
   d2590: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   d2598: 73 2a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r2
   d25a0: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   d25a8: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   d25b0: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   d25b8: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   d25c0: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   d25c8: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   d25d0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   d25d8: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   d25e0: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   d25e8: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   d25f0: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   d25f8: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   d2600: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   d2608: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   d2610: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d2618: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   d2620: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d2628: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   d2630: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   d2638: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   d2640: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   d2648: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   d2650: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d2658: 73 8a bf ff 00 00 00 00      	stxb [r10 - 0x41], r8
   d2660: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   d2668: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   d2670: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   d2678: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   d2680: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   d2688: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   d2690: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   d2698: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   d26a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d26a8: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   d26b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d26b8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   d26c0: b7 03 00 00 89 00 00 00      	mov64 r3, 0x89
   d26c8: 85 10 00 00 bf 63 00 00      	call 0x63bf
   d26d0: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   d26d8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xd25c8>
   d26e0: 05 00 0c 00 00 00 00 00      	ja +0xc <.text+0xd2628>
   d26e8: 7b 8a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r8
   d26f0: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   d26f8: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   d2700: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   d2708: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2710: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d2718: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2608>
   d2720: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d2728: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   d2730: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d2738: 55 02 03 00 01 00 00 00      	jne r2, 0x1, +0x3 <.text+0xd2638>
   d2740: 05 00 dd fd 00 00 00 00      	ja -0x223 <.text+0xd1510>
   d2748: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   d2750: 05 00 34 01 00 00 00 00      	ja +0x134 <.text+0xd2fd8>
   d2758: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   d2760: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d2768: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2770: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d2778: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2668>
   d2780: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d2788: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d2790: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd2680>
   d2798: 05 00 d2 fd 00 00 00 00      	ja -0x22e <.text+0xd1510>
   d27a0: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   d27a8: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d27b0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d27b8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   d27c0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd26b0>
   d27c8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   d27d0: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   d27d8: 7b 5a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r5
   d27e0: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   d27e8: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   d27f0: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   d27f8: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   d2800: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   d2808: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   d2810: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   d2818: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   d2820: 79 85 18 00 00 00 00 00      	ldxdw r5, [r8 + 0x18]
   d2828: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   d2830: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d2838: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xd2728>
   d2840: 05 00 bd fd 00 00 00 00      	ja -0x243 <.text+0xd1510>
   d2848: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
   d2850: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d2858: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   d2860: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d2868: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xd2758>
   d2870: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   d2878: 7b 9a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r9
   d2880: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   d2888: 7b 3a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r3
   d2890: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d2898: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xd2788>
   d28a0: 05 00 b1 fd 00 00 00 00      	ja -0x24f <.text+0xd1510>
   d28a8: 79 75 18 00 00 00 00 00      	ldxdw r5, [r7 + 0x18]
   d28b0: 79 70 20 00 00 00 00 00      	ldxdw r0, [r7 + 0x20]
   d28b8: 71 79 28 00 00 00 00 00      	ldxb r9, [r7 + 0x28]
   d28c0: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   d28c8: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   d28d0: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   d28d8: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   d28e0: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   d28e8: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   d28f0: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   d28f8: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   d2900: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   d2908: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   d2910: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d2918: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   d2920: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   d2928: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d2930: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   d2938: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   d2940: 18 03 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x11cd4b
   d2950: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   d2958: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d2960: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   d2968: 7b 3a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r3
   d2970: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d2978: 07 03 00 00 c8 fe ff ff      	add64 r3, -0x138
   d2980: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   d2988: 73 7a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r7
   d2990: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   d2998: 73 9a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r9
   d29a0: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   d29a8: 7b 5a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r5
   d29b0: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   d29b8: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   d29c0: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   d29c8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   d29d0: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   d29d8: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   d29e0: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   d29e8: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   d29f0: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   d29f8: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   d2a00: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   d2a08: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d2a10: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   d2a18: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d2a20: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   d2a28: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   d2a30: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   d2a38: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   d2a40: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   d2a48: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d2a50: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   d2a58: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   d2a60: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   d2a68: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   d2a70: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   d2a78: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   d2a80: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   d2a88: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   d2a90: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   d2a98: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   d2aa0: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   d2aa8: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   d2ab0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   d2ab8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2ac0: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   d2ac8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d2ad0: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   d2ad8: 85 10 00 00 af 63 00 00      	call 0x63af
   d2ae0: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   d2ae8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xd29d8>
   d2af0: 05 00 bf 00 00 00 00 00      	ja +0xbf <.text+0xd2fd0>
   d2af8: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   d2b00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2b08: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   d2b10: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   d2b18: 85 10 00 00 5e 62 fe ff      	call -0x19da2
   d2b20: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   d2b28: 79 a9 a0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x360]
   d2b30: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xd2a20>
   d2b38: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0xd2a78>
   d2b40: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   d2b48: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   d2b50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2b58: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   d2b60: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d2b70: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d2b78: 85 10 00 00 3f 5e fe ff      	call -0x1a1c1
   d2b80: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   d2b88: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   d2b90: 05 00 fd fc 00 00 00 00      	ja -0x303 <.text+0xd1260>
   d2b98: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   d2ba0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d2ba8: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   d2bb0: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   d2bb8: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   d2bc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2bc8: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   d2bd0: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   d2bd8: 85 10 00 00 97 8d 00 00      	call 0x8d97
   d2be0: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   d2be8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d2bf0: 85 10 00 00 6a 6c 00 00      	call 0x6c6a
   d2bf8: 15 00 01 00 89 00 00 00      	jeq r0, 0x89, +0x1 <.text+0xd2ae8>
   d2c00: 05 00 30 00 00 00 00 00      	ja +0x30 <.text+0xd2c68>
   d2c08: 79 a8 a8 fc 00 00 00 00      	ldxdw r8, [r10 - 0x358]
   d2c10: 79 81 30 00 00 00 00 00      	ldxdw r1, [r8 + 0x30]
   d2c18: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   d2c20: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   d2c28: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d2c30: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d2c38: 85 10 00 00 94 8d 00 00      	call 0x8d94
   d2c40: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d2c48: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d2c50: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <.text+0xd2d50>
   d2c58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2c60: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   d2c68: b7 02 00 00 d4 07 00 00      	mov64 r2, 0x7d4
   d2c70: 85 10 00 00 38 66 00 00      	call 0x6638
   d2c78: 79 a3 10 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f0]
   d2c80: 79 a2 08 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f8]
   d2c88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2c90: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   d2c98: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d2ca8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d2cb0: 85 10 00 00 18 5e fe ff      	call -0x1a1e8
   d2cb8: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   d2cc0: 79 a2 f8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x308]
   d2cc8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   d2cd0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   d2cd8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   d2ce0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   d2ce8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d2cf0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   d2cf8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d2d00: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   d2d08: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d2d10: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   d2d18: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d2d20: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   d2d28: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   d2d30: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   d2d38: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d2d40: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   d2d48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2d50: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   d2d58: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d2d60: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   d2d68: 85 10 00 00 8c 60 00 00      	call 0x608c
   d2d70: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   d2d78: 79 a2 f0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x310]
   d2d80: 05 00 19 00 00 00 00 00      	ja +0x19 <.text+0xd2d30>
   d2d88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2d90: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   d2d98: b7 02 00 00 e3 07 00 00      	mov64 r2, 0x7e3
   d2da0: 85 10 00 00 12 66 00 00      	call 0x6612
   d2da8: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   d2db0: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   d2db8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2dc0: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   d2dc8: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d2dd8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d2de0: 85 10 00 00 f2 5d fe ff      	call -0x1a20e
   d2de8: 79 a7 30 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2d0]
   d2df0: 79 a9 28 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2d8]
   d2df8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d2e00: 85 10 00 00 28 6c 00 00      	call 0x6c28
   d2e08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2e10: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   d2e18: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   d2e20: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   d2e28: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   d2e30: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   d2e38: 85 10 00 00 47 5b fe ff      	call -0x1a4b9
   d2e40: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   d2e48: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]
   d2e50: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   d2e58: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   d2e60: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d2e68: 05 00 54 00 00 00 00 00      	ja +0x54 <.text+0xd2ff0>
   d2e70: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   d2e78: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   d2e80: 85 10 00 00 2c 68 00 00      	call 0x682c
   d2e88: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d2e90: 79 a6 98 fc 00 00 00 00      	ldxdw r6, [r10 - 0x368]
   d2e98: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   d2ea0: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   d2ea8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d2eb0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d2eb8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd2da8>
   d2ec0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d2ec8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   d2ed0: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   d2ed8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd2dc8>
   d2ee0: 05 00 e9 fc 00 00 00 00      	ja -0x317 <.text+0xd1510>
   d2ee8: 79 69 10 00 00 00 00 00      	ldxdw r9, [r6 + 0x10]
   d2ef0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   d2ef8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d2f00: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d2f08: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd2df8>
   d2f10: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d2f18: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   d2f20: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd2e10>
   d2f28: 05 00 e0 fc 00 00 00 00      	ja -0x320 <.text+0xd1510>
   d2f30: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   d2f38: 79 63 20 00 00 00 00 00      	ldxdw r3, [r6 + 0x20]
   d2f40: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   d2f48: 71 65 29 00 00 00 00 00      	ldxb r5, [r6 + 0x29]
   d2f50: 71 60 2a 00 00 00 00 00      	ldxb r0, [r6 + 0x2a]
   d2f58: 73 0a 3a fe 00 00 00 00      	stxb [r10 - 0x1c6], r0
   d2f60: 73 5a 39 fe 00 00 00 00      	stxb [r10 - 0x1c7], r5
   d2f68: 73 4a 38 fe 00 00 00 00      	stxb [r10 - 0x1c8], r4
   d2f70: 7b 3a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r3
   d2f78: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   d2f80: 7b 9a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r9
   d2f88: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   d2f90: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   d2f98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d2fa0: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   d2fa8: 85 10 00 00 e4 6b 00 00      	call 0x6be4
   d2fb0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   d2fb8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d2fc0: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   d2fc8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd2ec8>
   d2fd0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   d2fd8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d2fe0: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   d2fe8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d2ff0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d2ff8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d3000: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd2f00>
   d3008: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d3010: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3018: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   d3020: ad 70 01 00 00 00 00 00      	jlt r0, r7, +0x1 <.text+0xd2f10>
   d3028: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0xd2f88>
   d3030: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3038: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   d3040: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   d3048: 85 10 00 00 bd 65 00 00      	call 0x65bd
   d3050: 79 a3 e0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x320]
   d3058: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   d3060: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3068: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   d3070: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d3080: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d3088: 85 10 00 00 9d 5d fe ff      	call -0x1a263
   d3090: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   d3098: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   d30a0: 05 00 b5 ff 00 00 00 00      	ja -0x4b <.text+0xd2d30>
   d30a8: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   d30b0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   d30b8: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   d30c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d30c8: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   d30d0: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   d30d8: 85 10 00 00 f7 8c 00 00      	call 0x8cf7
   d30e0: 7b 67 00 00 00 00 00 00      	stxdw [r7 + 0x0], r6
   d30e8: 05 00 05 00 00 00 00 00      	ja +0x5 <.text+0xd2ff8>
   d30f0: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]
   d30f8: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   d3100: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d3108: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   d3110: 72 03 59 00 02 00 00 00      	stb [r3 + 0x59], 0x2
   d3118: 95 00 00 00 00 00 00 00      	exit
