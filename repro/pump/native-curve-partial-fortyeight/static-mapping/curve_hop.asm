05b3b0: mov64 r6, r5
05b3b8: stxdw [r10 - 0xa58], r3
05b3c0: mov64 r8, r1
05b3c8: stxdw [r10 - 0xa40], r4
05b3d0: ldxdw r9, [r4 + 0x10]
05b3d8: mov64 r7, r2
05b3e0: add64 r7, 0x50
05b3e8: stxdw [r10 - 0xa48], r2
05b3f0: mov64 r4, r2
05b3f8: add64 r4, 0x18
05b400: mov64 r1, r10
05b408: add64 r1, -0x828
05b410: mov64 r2, r9
05b418: mov64 r3, r7
05b420: stxdw [r10 - 0xa50], r4
05b428: call -0x3cdc ; direct target 0x3cd50
05b430: ldxdw r1, [r10 - 0x828]
05b438: jne r1, 0x2, +0x3c ; branch 0x5b620
05b440: stxdw [r10 - 0xa60], r8
05b448: ldxdw r8, [r6 - 0xfd8]
05b450: stxdw [r10 - 0xa70], r8
05b458: and64 r8, 0x2
05b460: mov64 r4, 0x1
05b468: jeq r8, 0x0, +0x1 ; branch 0x5b478
05b470: mov64 r4, 0x0
05b478: ldxdw r1, [r6 - 0xfe0]
05b480: stxdw [r10 - 0xa88], r1
05b488: ldxdw r1, [r6 - 0xfe8]
05b490: stxdw [r10 - 0xa80], r1
05b498: ldxdw r1, [r6 - 0xff0]
05b4a0: stxdw [r10 - 0xa78], r1
05b4a8: ldxdw r1, [r6 - 0xff8]
05b4b0: stxdw [r10 - 0xa68], r1
05b4b8: ldxdw r6, [r6 - 0x1000]
05b4c0: ldxb r3, [r9 + 0xa3]
05b4c8: ldxb r2, [r9 + 0xa1]
05b4d0: mov64 r1, r10
05b4d8: add64 r1, -0x838
05b4e0: call 0x4579 ; direct target 0x7e0b0
05b4e8: ldxdw r1, [r10 - 0x838]
05b4f0: jeq r1, 0x2, +0x1 ; branch 0x5b500
05b4f8: ja +0x29 ; branch 0x5b648
05b500: ldxb r1, [r9 + 0xa2]
05b508: jeq r1, 0x0, +0x4c ; branch 0x5b770
05b510: mov64 r1, r10
05b518: add64 r1, -0x498
05b520: lddw r2, 0x1b5ed8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00'
05b530: call 0x1f7c9 ; direct target 0x157380
05b538: stdw [r10 - 0x330], 0x0
05b540: stdw [r10 - 0x338], 0x1
05b548: stdw [r10 - 0x340], 0x0
05b550: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
05b560: stxdw [r10 - 0x238], r1
05b568: mov64 r1, r10
05b570: add64 r1, -0x340
05b578: stxdw [r10 - 0x240], r1
05b580: stb [r10 - 0x228], 0x3
05b588: stdw [r10 - 0x230], 0x20
05b590: stdw [r10 - 0x250], 0x0
05b598: stdw [r10 - 0x260], 0x0
05b5a0: mov64 r2, r10
05b5a8: add64 r2, -0x260
05b5b0: lddw r1, 0x1b5ed8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00'
05b5c0: call 0x20518 ; direct target 0x15de88
05b5c8: jeq r0, 0x0, +0x14 ; branch 0x5b670
05b5d0: mov64 r3, r10
05b5d8: add64 r3, -0x6d0
05b5e0: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
05b5f0: mov64 r2, 0x37
05b5f8: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
05b608: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
05b618: call 0x2a2ff ; direct target 0x1ace18
05b620: ldxdw r2, [r10 - 0x820]
05b628: stxdw [r8 + 0x0], r1
05b630: stxdw [r8 + 0x8], r2
05b638: stb [r8 + 0x5a], 0x2
05b640: ja +0x24 ; branch 0x5b768
05b648: ldxdw r2, [r10 - 0x830]
05b650: ldxdw r3, [r10 - 0xa60]
05b658: stxdw [r3 + 0x0], r1
05b660: stxdw [r3 + 0x8], r2
05b668: ja +0x1e ; branch 0x5b760
05b670: ldxdw r1, [r10 - 0x330]
05b678: stxdw [r10 - 0x688], r1
05b680: ldxdw r1, [r10 - 0x338]
05b688: stxdw [r10 - 0x690], r1
05b690: ldxdw r1, [r10 - 0x340]
05b698: stxdw [r10 - 0x698], r1
05b6a0: ldxdw r1, [r10 - 0x498]
05b6a8: stxdw [r10 - 0x6b0], r1
05b6b0: ldxdw r1, [r10 - 0x490]
05b6b8: stxdw [r10 - 0x6a8], r1
05b6c0: ldxdw r1, [r10 - 0x488]
05b6c8: stxdw [r10 - 0x6a0], r1
05b6d0: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
05b6e0: stxdw [r10 - 0x6c8], r1
05b6e8: stw [r10 - 0x638], 0x17dc
05b6f0: stb [r10 - 0x680], 0x2
05b6f8: stw [r10 - 0x6b8], 0x1e4
05b700: stdw [r10 - 0x6c0], 0x29
05b708: stdw [r10 - 0x6d0], 0x0
05b710: mov64 r1, r10
05b718: add64 r1, -0x848
05b720: mov64 r2, r10
05b728: add64 r2, -0x6d0
05b730: call 0x2807f ; direct target 0x19bb30
05b738: ldxdw r1, [r10 - 0x848]
05b740: ldxdw r2, [r10 - 0x840]
05b748: ldxdw r3, [r10 - 0xa60]
05b750: stxdw [r3 + 0x8], r2
05b758: stxdw [r3 + 0x0], r1
05b760: stb [r3 + 0x5a], 0x2
05b768: exit
05b770: stxdw [r10 - 0xa98], r6
05b778: stdw [r10 - 0x6b8], 0x0
05b780: stdw [r10 - 0x6c0], 0x0
05b788: stdw [r10 - 0x6c8], 0x0
05b790: stdw [r10 - 0x6d0], 0x0
05b798: mov64 r6, r9
05b7a0: add64 r6, 0x28
05b7a8: mov64 r2, r10
05b7b0: add64 r2, -0x6d0
05b7b8: mov64 r1, r6
05b7c0: mov64 r3, 0x20
05b7c8: call 0x2afd5 ; direct target 0x1b3678
05b7d0: stxdw [r10 - 0xa90], r0
05b7d8: mov64 r1, r0
05b7e0: lsh64 r1, 0x20
05b7e8: rsh64 r1, 0x20
05b7f0: stxdw [r10 - 0xaa0], r6
05b7f8: jne r1, 0x0, +0x1 ; branch 0x5b808
05b800: ja +0x46 ; branch 0x5ba38
05b808: stxdw [r10 - 0xaa8], r8
05b810: ldxdw r1, [r10 - 0xa40]
05b818: ldxdw r1, [r1 + 0x8]
05b820: ldxdw r2, [r1 + 0x58]
05b828: ldxdw r1, [r2 + 0x8]
05b830: ldxdw r4, [r1 + 0x0]
05b838: add64 r4, 0x1
05b840: mov64 r5, 0x1
05b848: jeq r4, 0x0, +0x1 ; branch 0x5b858
05b850: mov64 r5, 0x0
05b858: ldxdw r8, [r2 + 0x0]
05b860: stxdw [r1 + 0x0], r4
05b868: jne r5, 0x1, +0x1 ; branch 0x5b878
05b870: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
05b878: ldxdw r4, [r2 + 0x10]
05b880: ldxdw r5, [r4 + 0x0]
05b888: add64 r5, 0x1
05b890: mov64 r0, 0x1
05b898: jeq r5, 0x0, +0x1 ; branch 0x5b8a8
05b8a0: mov64 r0, 0x0
05b8a8: stxdw [r4 + 0x0], r5
05b8b0: jne r0, 0x1, +0x1 ; branch 0x5b8c0
05b8b8: ja -0xa ; branch 0x5b870
05b8c0: ldxdw r5, [r2 + 0x18]
05b8c8: ldxdw r0, [r2 + 0x20]
05b8d0: ldxb r6, [r2 + 0x28]
05b8d8: ldxb r3, [r2 + 0x29]
05b8e0: ldxb r2, [r2 + 0x2a]
05b8e8: stxb [r10 - 0x6a6], r2
05b8f0: stxb [r10 - 0x6a7], r3
05b8f8: stxb [r10 - 0x6a8], r6
05b900: stxdw [r10 - 0x6b0], r0
05b908: stxdw [r10 - 0x6b8], r5
05b910: stxdw [r10 - 0x6c0], r4
05b918: stxdw [r10 - 0x6c8], r1
05b920: stxdw [r10 - 0x6d0], r8
05b928: mov64 r1, r10
05b930: add64 r1, -0x260
05b938: mov64 r2, r10
05b940: add64 r2, -0x6d0
05b948: call 0x71f7 ; direct target 0x94908
05b950: ldxdw r2, [r10 - 0x250]
05b958: ldxdw r1, [r10 - 0x258]
05b960: ldxdw r3, [r10 - 0x260]
05b968: jeq r3, 0x2, +0x52 ; branch 0x5bc00
05b970: ldxdw r4, [r10 - 0x248]
05b978: stxdw [r10 - 0x800], r4
05b980: stxdw [r10 - 0x808], r2
05b988: stxdw [r10 - 0x810], r1
05b990: stxdw [r10 - 0x818], r3
05b998: ldxdw r1, [r10 - 0x6c0]
05b9a0: ldxdw r2, [r10 - 0x6c8]
05b9a8: ldxdw r3, [r2 + 0x0]
05b9b0: add64 r3, -0x1
05b9b8: stxdw [r2 + 0x0], r3
05b9c0: jne r3, 0x0, +0x3 ; branch 0x5b9e0
05b9c8: ldxdw r3, [r2 + 0x8]
05b9d0: add64 r3, -0x1
05b9d8: stxdw [r2 + 0x8], r3
05b9e0: ldxdw r2, [r1 + 0x0]
05b9e8: add64 r2, -0x1
05b9f0: stxdw [r1 + 0x0], r2
05b9f8: ldxdw r6, [r10 - 0xa40]
05ba00: ldxdw r8, [r10 - 0xaa8]
05ba08: jne r2, 0x0, +0x3 ; branch 0x5ba28
05ba10: ldxdw r2, [r1 + 0x8]
05ba18: add64 r2, -0x1
05ba20: stxdw [r1 + 0x8], r2
05ba28: stxdw [r10 - 0xab0], r9
05ba30: ja +0x6 ; branch 0x5ba68
05ba38: stxdw [r10 - 0xab0], r9
05ba40: stdw [r10 - 0x800], 0x0
05ba48: stdw [r10 - 0x808], 0x0
05ba50: stdw [r10 - 0x810], 0x0
05ba58: stdw [r10 - 0x818], 0x0
05ba60: ldxdw r6, [r10 - 0xa40]
05ba68: ldxdw r9, [r10 - 0xa48]
05ba70: ldxdw r3, [r9 + 0x48]
05ba78: ldxdw r2, [r9 + 0x40]
05ba80: ldxdw r1, [r6 + 0x0]
05ba88: stxdw [r10 - 0xaa8], r1
05ba90: ldxdw r4, [r1 + 0x58]
05ba98: mov64 r1, r10
05baa0: add64 r1, -0x6d0
05baa8: call -0x689 ; direct target 0x58668
05bab0: ldxdw r1, [r10 - 0x6c8]
05bab8: mov64 r4, r6
05bac0: ldxdw r6, [r10 - 0x6d0]
05bac8: ldxb r2, [r10 - 0x6a6]
05bad0: jeq r2, 0x2, +0x20 ; branch 0x5bbd8
05bad8: ldxh r3, [r10 - 0x6a8]
05bae0: stxh [r10 - 0x7d0], r3
05bae8: ldxdw r3, [r10 - 0x6b0]
05baf0: stxdw [r10 - 0x7d8], r3
05baf8: ldxdw r3, [r10 - 0x6b8]
05bb00: stxdw [r10 - 0x7e0], r3
05bb08: ldxdw r3, [r10 - 0x6c0]
05bb10: stxdw [r10 - 0x7e8], r3
05bb18: ldxw r3, [r10 - 0x6a5]
05bb20: stxw [r10 - 0x7cd], r3
05bb28: ldxb r3, [r10 - 0x6a1]
05bb30: stxb [r10 - 0x7c9], r3
05bb38: stxb [r10 - 0x7ce], r2
05bb40: stxdw [r10 - 0x7f0], r1
05bb48: stxdw [r10 - 0x7f8], r6
05bb50: ldxdw r3, [r9 + 0x48]
05bb58: ldxdw r2, [r9 + 0x40]
05bb60: ldxdw r9, [r4 + 0x8]
05bb68: ldxdw r4, [r9 + 0x58]
05bb70: mov64 r1, r10
05bb78: add64 r1, -0x6d0
05bb80: call -0x6a4 ; direct target 0x58668
05bb88: ldxdw r3, [r10 - 0x6c8]
05bb90: ldxdw r4, [r10 - 0x6d0]
05bb98: ldxb r1, [r10 - 0x6a6]
05bba0: jeq r1, 0x2, +0x1 ; branch 0x5bbb0
05bba8: ja +0x1c ; branch 0x5bc90
05bbb0: ldxdw r1, [r10 - 0xa60]
05bbb8: stxdw [r1 + 0x8], r3
05bbc0: stxdw [r1 + 0x0], r4
05bbc8: stb [r1 + 0x5a], 0x2
05bbd0: ja +0xd7 ; branch 0x5c290
05bbd8: ldxdw r2, [r10 - 0xa60]
05bbe0: stxdw [r2 + 0x8], r1
05bbe8: stxdw [r2 + 0x0], r6
05bbf0: stb [r2 + 0x5a], 0x2
05bbf8: ja -0x93 ; branch 0x5b768
05bc00: ldxdw r3, [r10 - 0xa60]
05bc08: stxdw [r3 + 0x8], r2
05bc10: stxdw [r3 + 0x0], r1
05bc18: stb [r3 + 0x5a], 0x2
05bc20: ldxdw r1, [r10 - 0x6c0]
05bc28: ldxdw r2, [r10 - 0x6c8]
05bc30: ldxdw r3, [r2 + 0x0]
05bc38: add64 r3, -0x1
05bc40: stxdw [r2 + 0x0], r3
05bc48: jne r3, 0x0, +0x3 ; branch 0x5bc68
05bc50: ldxdw r3, [r2 + 0x8]
05bc58: add64 r3, -0x1
05bc60: stxdw [r2 + 0x8], r3
05bc68: ldxdw r2, [r1 + 0x0]
05bc70: add64 r2, -0x1
05bc78: stxdw [r1 + 0x0], r2
05bc80: jne r2, 0x0, -0xa4 ; branch 0x5b768
05bc88: ja +0x73d ; branch 0x5f678
05bc90: stxdw [r10 - 0xac0], r9
05bc98: ldxh r2, [r10 - 0x6a8]
05bca0: stxh [r10 - 0x7a0], r2
05bca8: ldxdw r2, [r10 - 0x6b0]
05bcb0: stxdw [r10 - 0x7a8], r2
05bcb8: ldxdw r2, [r10 - 0x6b8]
05bcc0: stxdw [r10 - 0x7b0], r2
05bcc8: ldxdw r2, [r10 - 0x6c0]
05bcd0: stxdw [r10 - 0x7b8], r2
05bcd8: ldxw r2, [r10 - 0x6a5]
05bce0: stxw [r10 - 0x79d], r2
05bce8: ldxb r2, [r10 - 0x6a1]
05bcf0: stxb [r10 - 0x799], r2
05bcf8: stxb [r10 - 0x79e], r1
05bd00: stxdw [r10 - 0xab8], r3
05bd08: stxdw [r10 - 0x7c0], r3
05bd10: stxdw [r10 - 0xac8], r4
05bd18: stxdw [r10 - 0x7c8], r4
05bd20: ldxdw r1, [r10 - 0xab0]
05bd28: ldxdw r1, [r1 + 0x0]
05bd30: ldxdw r1, [r1 + 0x0]
05bd38: ldxdw r2, [r1 + 0x18]
05bd40: stxdw [r10 - 0x780], r2
05bd48: ldxdw r2, [r1 + 0x10]
05bd50: stxdw [r10 - 0x788], r2
05bd58: ldxdw r2, [r1 + 0x8]
05bd60: stxdw [r10 - 0x790], r2
05bd68: ldxdw r1, [r1 + 0x0]
05bd70: stxdw [r10 - 0x798], r1
05bd78: ldxdw r1, [r10 - 0xa40]
05bd80: ldxdw r1, [r1 + 0x18]
05bd88: stxdw [r10 - 0xad0], r1
05bd90: ldxdw r1, [r1 + 0x20]
05bd98: ldxdw r1, [r1 + 0x0]
05bda0: ldxdw r2, [r1 + 0x18]
05bda8: stxdw [r10 - 0x328], r2
05bdb0: ldxdw r2, [r1 + 0x10]
05bdb8: stxdw [r10 - 0x330], r2
05bdc0: ldxdw r2, [r1 + 0x8]
05bdc8: stxdw [r10 - 0x338], r2
05bdd0: ldxdw r1, [r1 + 0x0]
05bdd8: stxdw [r10 - 0x340], r1
05bde0: ldxdw r1, [r10 - 0xaa8]
05bde8: ldxdw r1, [r1 + 0x58]
05bdf0: ldxdw r1, [r1 + 0x0]
05bdf8: ldxdw r2, [r1 + 0x18]
05be00: stxdw [r10 - 0x248], r2
05be08: ldxdw r2, [r1 + 0x10]
05be10: stxdw [r10 - 0x250], r2
05be18: ldxdw r2, [r1 + 0x8]
05be20: stxdw [r10 - 0x258], r2
05be28: ldxdw r1, [r1 + 0x0]
05be30: stxdw [r10 - 0x260], r1
05be38: ldxdw r1, [r6 + 0x18]
05be40: stxdw [r10 - 0x6b8], r1
05be48: ldxdw r1, [r6 + 0x10]
05be50: stxdw [r10 - 0x6c0], r1
05be58: ldxdw r1, [r6 + 0x8]
05be60: stxdw [r10 - 0x6c8], r1
05be68: ldxdw r1, [r6 + 0x0]
05be70: stxdw [r10 - 0x6d0], r1
05be78: mov64 r1, r10
05be80: add64 r1, -0x858
05be88: mov64 r2, r10
05be90: add64 r2, -0x340
05be98: mov64 r3, r10
05bea0: add64 r3, -0x798
05bea8: mov64 r4, r10
05beb0: add64 r4, -0x260
05beb8: mov64 r5, r10
05bec0: add64 r5, -0x6d0
05bec8: call -0x65c ; direct target 0x58bf0
05bed0: ldxdw r1, [r10 - 0x858]
05bed8: jeq r1, 0x2, +0x1 ; branch 0x5bee8
05bee0: ja +0x60 ; branch 0x5c1e8
05bee8: ldxdw r1, [r10 - 0xa90]
05bef0: lsh64 r1, 0x20
05bef8: rsh64 r1, 0x20
05bf00: jne r1, 0x0, +0x1 ; branch 0x5bf10
05bf08: ja +0x7e ; branch 0x5c300
05bf10: ldxdw r1, [r10 - 0xa40]
05bf18: ldxdw r6, [r1 + 0x20]
05bf20: ldxdw r1, [r10 - 0xab0]
05bf28: ldxdw r2, [r1 + 0x0]
05bf30: mov64 r1, r10
05bf38: add64 r1, -0x260
05bf40: stxdw [r10 - 0xad8], r1
05bf48: call -0x965b ; direct target 0x10c78
05bf50: ldxdw r1, [r10 - 0xac0]
05bf58: ldxdw r2, [r1 + 0x58]
05bf60: ldxdw r1, [r2 + 0x0]
05bf68: ldxdw r3, [r1 + 0x18]
05bf70: stxdw [r10 - 0x480], r3
05bf78: ldxdw r3, [r1 + 0x10]
05bf80: stxdw [r10 - 0x488], r3
05bf88: ldxdw r3, [r1 + 0x8]
05bf90: stxdw [r10 - 0x490], r3
05bf98: ldxdw r1, [r1 + 0x0]
05bfa0: stxdw [r10 - 0x498], r1
05bfa8: ldxdw r3, [r10 - 0xac8]
05bfb0: ldxdw r1, [r3 + 0x18]
05bfb8: stxdw [r10 - 0x328], r1
05bfc0: ldxdw r1, [r3 + 0x10]
05bfc8: stxdw [r10 - 0x330], r1
05bfd0: ldxdw r1, [r3 + 0x8]
05bfd8: stxdw [r10 - 0x338], r1
05bfe0: ldxdw r1, [r3 + 0x0]
05bfe8: stxdw [r10 - 0x340], r1
05bff0: mov64 r9, r10
05bff8: add64 r9, -0x6d0
05c000: mov64 r1, r9
05c008: call -0x9673 ; direct target 0x10c78
05c010: ldxdw r1, [r7 + 0x0]
05c018: ldxdw r2, [r10 - 0xa50]
05c020: ldxdw r2, [r2 + 0x0]
05c028: stxdw [r10 - 0xfe0], r2
05c030: stxdw [r10 - 0xfd8], r1
05c038: mov64 r1, r10
05c040: add64 r1, -0x7c8
05c048: stxdw [r10 - 0xff0], r1
05c050: stxdw [r10 - 0xff8], r9
05c058: mov64 r1, r10
05c060: add64 r1, -0x340
05c068: stxdw [r10 - 0x1000], r1
05c070: stdw [r10 - 0xfe8], 0x0
05c078: mov64 r1, r10
05c080: add64 r1, -0x878
05c088: mov64 r4, r10
05c090: add64 r4, -0x498
05c098: mov64 r5, r10
05c0a0: stxdw [r10 - 0xae0], r6
05c0a8: mov64 r2, r6
05c0b0: ldxdw r3, [r10 - 0xad8]
05c0b8: call -0x8ef6 ; direct target 0x14910
05c0c0: ldxdw r1, [r10 - 0x878]
05c0c8: ldxdw r6, [r10 - 0xa48]
05c0d0: jeq r1, 0x2, +0x1 ; branch 0x5c0e0
05c0d8: ja +0xe6 ; branch 0x5c810
05c0e0: ldxdw r1, [r10 - 0x6c0]
05c0e8: ldxdw r2, [r10 - 0x6c8]
05c0f0: ldxdw r3, [r2 + 0x0]
05c0f8: add64 r3, -0x1
05c100: stxdw [r2 + 0x0], r3
05c108: jne r3, 0x0, +0x3 ; branch 0x5c128
05c110: ldxdw r3, [r2 + 0x8]
05c118: add64 r3, -0x1
05c120: stxdw [r2 + 0x8], r3
05c128: ldxdw r2, [r1 + 0x0]
05c130: add64 r2, -0x1
05c138: stxdw [r1 + 0x0], r2
05c140: jne r2, 0x0, +0x3 ; branch 0x5c160
05c148: ldxdw r2, [r1 + 0x8]
05c150: add64 r2, -0x1
05c158: stxdw [r1 + 0x8], r2
05c160: ldxdw r1, [r10 - 0x250]
05c168: ldxdw r2, [r10 - 0x258]
05c170: ldxdw r3, [r2 + 0x0]
05c178: add64 r3, -0x1
05c180: stxdw [r2 + 0x0], r3
05c188: jne r3, 0x0, +0x3 ; branch 0x5c1a8
05c190: ldxdw r3, [r2 + 0x8]
05c198: add64 r3, -0x1
05c1a0: stxdw [r2 + 0x8], r3
05c1a8: ldxdw r2, [r1 + 0x0]
05c1b0: add64 r2, -0x1
05c1b8: stxdw [r1 + 0x0], r2
05c1c0: jne r2, 0x0, +0x56 ; branch 0x5c478
05c1c8: ldxdw r2, [r1 + 0x8]
05c1d0: add64 r2, -0x1
05c1d8: stxdw [r1 + 0x8], r2
05c1e0: ja +0x52 ; branch 0x5c478
05c1e8: ldxdw r2, [r10 - 0x850]
05c1f0: ldxdw r3, [r10 - 0xa60]
05c1f8: stxdw [r3 + 0x0], r1
05c200: stxdw [r3 + 0x8], r2
05c208: stb [r3 + 0x5a], 0x2
05c210: ldxdw r3, [r10 - 0xab8]
05c218: ldxdw r2, [r3 + 0x0]
05c220: add64 r2, -0x1
05c228: ldxdw r1, [r10 - 0x7b8]
05c230: stxdw [r3 + 0x0], r2
05c238: jne r2, 0x0, +0x3 ; branch 0x5c258
05c240: ldxdw r2, [r3 + 0x8]
05c248: add64 r2, -0x1
05c250: stxdw [r3 + 0x8], r2
05c258: ldxdw r2, [r1 + 0x0]
05c260: add64 r2, -0x1
05c268: stxdw [r1 + 0x0], r2
05c270: jne r2, 0x0, +0x3 ; branch 0x5c290
05c278: ldxdw r2, [r1 + 0x8]
05c280: add64 r2, -0x1
05c288: stxdw [r1 + 0x8], r2
05c290: ldxdw r1, [r10 - 0x7e8]
05c298: ldxdw r2, [r10 - 0x7f0]
05c2a0: ldxdw r3, [r2 + 0x0]
05c2a8: add64 r3, -0x1
05c2b0: stxdw [r2 + 0x0], r3
05c2b8: jne r3, 0x0, +0x3 ; branch 0x5c2d8
05c2c0: ldxdw r3, [r2 + 0x8]
05c2c8: add64 r3, -0x1
05c2d0: stxdw [r2 + 0x8], r3
05c2d8: ldxdw r2, [r1 + 0x0]
05c2e0: add64 r2, -0x1
05c2e8: stxdw [r1 + 0x0], r2
05c2f0: jne r2, 0x0, -0x172 ; branch 0x5b768
05c2f8: ja +0x66f ; branch 0x5f678
05c300: ldxdw r1, [r10 - 0xa40]
05c308: ldxdw r1, [r1 + 0x20]
05c310: stxdw [r10 - 0xae0], r1
05c318: ldxdw r1, [r1 + 0x0]
05c320: ldxdw r2, [r1 + 0x18]
05c328: stxdw [r10 - 0x328], r2
05c330: ldxdw r2, [r1 + 0x10]
05c338: stxdw [r10 - 0x330], r2
05c340: ldxdw r2, [r1 + 0x8]
05c348: stxdw [r10 - 0x338], r2
05c350: ldxdw r1, [r1 + 0x0]
05c358: stxdw [r10 - 0x340], r1
05c360: ldxdw r1, [r10 - 0xac0]
05c368: ldxdw r1, [r1 + 0x58]
05c370: ldxdw r1, [r1 + 0x0]
05c378: ldxdw r2, [r1 + 0x18]
05c380: stxdw [r10 - 0x248], r2
05c388: ldxdw r2, [r1 + 0x10]
05c390: stxdw [r10 - 0x250], r2
05c398: ldxdw r2, [r1 + 0x8]
05c3a0: stxdw [r10 - 0x258], r2
05c3a8: ldxdw r1, [r1 + 0x0]
05c3b0: stxdw [r10 - 0x260], r1
05c3b8: ldxdw r2, [r10 - 0xac8]
05c3c0: ldxdw r1, [r2 + 0x18]
05c3c8: stxdw [r10 - 0x6b8], r1
05c3d0: ldxdw r1, [r2 + 0x10]
05c3d8: stxdw [r10 - 0x6c0], r1
05c3e0: ldxdw r1, [r2 + 0x8]
05c3e8: stxdw [r10 - 0x6c8], r1
05c3f0: ldxdw r1, [r2 + 0x0]
05c3f8: stxdw [r10 - 0x6d0], r1
05c400: mov64 r1, r10
05c408: add64 r1, -0x868
05c410: mov64 r2, r10
05c418: add64 r2, -0x340
05c420: mov64 r3, r10
05c428: add64 r3, -0x798
05c430: mov64 r4, r10
05c438: add64 r4, -0x260
05c440: mov64 r5, r10
05c448: add64 r5, -0x6d0
05c450: call -0x70d ; direct target 0x58bf0
05c458: ldxdw r1, [r10 - 0x868]
05c460: ldxdw r6, [r10 - 0xa48]
05c468: jeq r1, 0x2, +0x1 ; branch 0x5c478
05c470: ja +0xf9 ; branch 0x5cc40
05c478: ldxdw r3, [r10 - 0xa68]
05c480: ldxdw r1, [r10 - 0xa70]
05c488: and64 r1, 0x1
05c490: stxdw [r10 - 0xad8], r1
05c498: jeq r1, 0x0, +0x25 ; branch 0x5c5c8
05c4a0: ldxdw r3, [r6 + 0x38]
05c4a8: ldxdw r2, [r6 + 0x0]
05c4b0: ldxdw r1, [r10 - 0xac0]
05c4b8: ldxdw r1, [r1 + 0x58]
05c4c0: ldxdw r1, [r1 + 0x0]
05c4c8: ldxdw r4, [r1 + 0x18]
05c4d0: stxdw [r10 - 0x248], r4
05c4d8: ldxdw r4, [r1 + 0x10]
05c4e0: stxdw [r10 - 0x250], r4
05c4e8: ldxdw r4, [r1 + 0x8]
05c4f0: stxdw [r10 - 0x258], r4
05c4f8: ldxdw r1, [r1 + 0x0]
05c500: stxdw [r10 - 0x260], r1
05c508: ldxdw r9, [r10 - 0xac8]
05c510: ldxdw r1, [r9 + 0x18]
05c518: stxdw [r10 - 0x6b8], r1
05c520: ldxdw r1, [r9 + 0x10]
05c528: stxdw [r10 - 0x6c0], r1
05c530: ldxdw r1, [r9 + 0x8]
05c538: stxdw [r10 - 0x6c8], r1
05c540: ldxdw r1, [r9 + 0x0]
05c548: stxdw [r10 - 0x6d0], r1
05c550: mov64 r1, r10
05c558: add64 r1, -0x260
05c560: stxdw [r10 - 0x1000], r1
05c568: mov64 r1, r10
05c570: add64 r1, -0x6d0
05c578: stxdw [r10 - 0xff8], r1
05c580: add64 r2, 0x8
05c588: mov64 r1, r10
05c590: add64 r1, -0x888
05c598: mov64 r5, r10
05c5a0: mov64 r4, 0x0
05c5a8: call 0x43dc ; direct target 0x7e490
05c5b0: ldxdw r1, [r10 - 0x888]
05c5b8: jne r1, 0x2, +0xd2 ; branch 0x5cc50
05c5c0: ldxdw r3, [r10 - 0xa68]
05c5c8: ldxdw r1, [r10 - 0xac0]
05c5d0: ldxdw r1, [r1 + 0x58]
05c5d8: ldxdw r1, [r1 + 0x0]
05c5e0: ldxdw r2, [r1 + 0x18]
05c5e8: stxdw [r10 - 0x6b8], r2
05c5f0: ldxdw r2, [r1 + 0x10]
05c5f8: stxdw [r10 - 0x6c0], r2
05c600: ldxdw r2, [r1 + 0x8]
05c608: stxdw [r10 - 0x6c8], r2
05c610: ldxdw r1, [r1 + 0x0]
05c618: stxdw [r10 - 0x6d0], r1
05c620: mov64 r2, r10
05c628: add64 r2, -0x6d0
05c630: mov64 r1, r3
05c638: mov64 r6, r3
05c640: mov64 r3, 0x20
05c648: call 0x2ae05 ; direct target 0x1b3678
05c650: ldxdw r9, [r10 - 0xaa8]
05c658: ldxdw r2, [r9 + 0x58]
05c660: stxdw [r10 - 0xa68], r0
05c668: mov64 r1, r0
05c670: lsh64 r1, 0x20
05c678: rsh64 r1, 0x20
05c680: jeq r1, 0x0, +0x57 ; branch 0x5c940
05c688: ldxdw r1, [r2 + 0x0]
05c690: mov64 r9, r2
05c698: ldxdw r2, [r1 + 0x18]
05c6a0: stxdw [r10 - 0x6b8], r2
05c6a8: ldxdw r2, [r1 + 0x10]
05c6b0: stxdw [r10 - 0x6c0], r2
05c6b8: ldxdw r2, [r1 + 0x8]
05c6c0: stxdw [r10 - 0x6c8], r2
05c6c8: ldxdw r1, [r1 + 0x0]
05c6d0: stxdw [r10 - 0x6d0], r1
05c6d8: mov64 r2, r10
05c6e0: add64 r2, -0x6d0
05c6e8: mov64 r1, r6
05c6f0: mov64 r3, 0x20
05c6f8: call 0x2adef ; direct target 0x1b3678
05c700: mov64 r2, r9
05c708: ldxdw r9, [r10 - 0xaa8]
05c710: lsh64 r0, 0x20
05c718: rsh64 r0, 0x20
05c720: jeq r0, 0x0, +0x43 ; branch 0x5c940
05c728: mov64 r1, r10
05c730: add64 r1, -0x6b0
05c738: lddw r2, 0x1b5eec ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00'
05c748: call 0x1f586 ; direct target 0x157380
05c750: mov64 r1, r10
05c758: add64 r1, -0x698
05c760: lddw r2, 0x1b5eec ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00'
05c770: call -0xa3c8 ; direct target 0xa938
05c778: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
05c788: stxdw [r10 - 0x6c8], r1
05c790: stb [r10 - 0x680], 0x2
05c798: stw [r10 - 0x6b8], 0x222
05c7a0: stdw [r10 - 0x6c0], 0x29
05c7a8: stdw [r10 - 0x6d0], 0x0
05c7b0: stw [r10 - 0x638], 0x17d2
05c7b8: mov64 r1, r10
05c7c0: add64 r1, -0x898
05c7c8: mov64 r2, r10
05c7d0: add64 r2, -0x6d0
05c7d8: call 0x27e6a ; direct target 0x19bb30
05c7e0: ldxdw r1, [r10 - 0x898]
05c7e8: ldxdw r2, [r10 - 0x890]
05c7f0: ldxdw r3, [r10 - 0xa60]
05c7f8: stxdw [r3 + 0x8], r2
05c800: stxdw [r3 + 0x0], r1
05c808: ja -0xc1 ; branch 0x5c208
05c810: ldxdw r2, [r10 - 0x870]
05c818: ldxdw r3, [r10 - 0xa60]
05c820: stxdw [r3 + 0x0], r1
05c828: stxdw [r3 + 0x8], r2
05c830: stb [r3 + 0x5a], 0x2
05c838: ldxdw r1, [r10 - 0x6c0]
05c840: ldxdw r2, [r10 - 0x6c8]
05c848: ldxdw r3, [r2 + 0x0]
05c850: add64 r3, -0x1
05c858: stxdw [r2 + 0x0], r3
05c860: jne r3, 0x0, +0x3 ; branch 0x5c880
05c868: ldxdw r3, [r2 + 0x8]
05c870: add64 r3, -0x1
05c878: stxdw [r2 + 0x8], r3
05c880: ldxdw r2, [r1 + 0x0]
05c888: add64 r2, -0x1
05c890: stxdw [r1 + 0x0], r2
05c898: jne r2, 0x0, +0x3 ; branch 0x5c8b8
05c8a0: ldxdw r2, [r1 + 0x8]
05c8a8: add64 r2, -0x1
05c8b0: stxdw [r1 + 0x8], r2
05c8b8: ldxdw r1, [r10 - 0x250]
05c8c0: ldxdw r2, [r10 - 0x258]
05c8c8: ldxdw r3, [r2 + 0x0]
05c8d0: add64 r3, -0x1
05c8d8: stxdw [r2 + 0x0], r3
05c8e0: jne r3, 0x0, +0x3 ; branch 0x5c900
05c8e8: ldxdw r3, [r2 + 0x8]
05c8f0: add64 r3, -0x1
05c8f8: stxdw [r2 + 0x8], r3
05c900: ldxdw r2, [r1 + 0x0]
05c908: add64 r2, -0x1
05c910: stxdw [r1 + 0x0], r2
05c918: jne r2, 0x0, -0xe2 ; branch 0x5c210
05c920: ldxdw r2, [r1 + 0x8]
05c928: add64 r2, -0x1
05c930: stxdw [r1 + 0x8], r2
05c938: ja -0xe6 ; branch 0x5c210
05c940: mov64 r1, r10
05c948: add64 r1, -0x6d0
05c950: call -0x979c ; direct target 0x10c78
05c958: mov64 r1, r10
05c960: add64 r1, -0x731
05c968: stxdw [r10 - 0x748], r1
05c970: lddw r1, 0x1b683a ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding-curveprograms/pump/src/buy_v2.rsbuybuy_exact_quote_inprograms/pump/src/create_v2.rsquote-con'
05c980: stxdw [r10 - 0x768], r1
05c988: mov64 r1, r10
05c990: add64 r1, -0x768
05c998: stxdw [r10 - 0x778], r1
05c9a0: ldxdw r1, [r10 - 0x6d0]
05c9a8: stxdw [r10 - 0x758], r1
05c9b0: ldxdw r1, [r10 - 0xa98]
05c9b8: stxb [r10 - 0x731], r1
05c9c0: ldxdw r1, [r10 - 0x6c0]
05c9c8: stdw [r10 - 0x740], 0x1
05c9d0: stdw [r10 - 0x750], 0x20
05c9d8: stdw [r10 - 0x760], 0xd
05c9e0: stdw [r10 - 0x770], 0x3
05c9e8: ldxdw r2, [r10 - 0x6c8]
05c9f0: ldxdw r3, [r2 + 0x0]
05c9f8: add64 r3, -0x1
05ca00: stxdw [r2 + 0x0], r3
05ca08: jne r3, 0x0, +0x3 ; branch 0x5ca28
05ca10: ldxdw r3, [r2 + 0x8]
05ca18: add64 r3, -0x1
05ca20: stxdw [r2 + 0x8], r3
05ca28: ldxdw r2, [r1 + 0x0]
05ca30: add64 r2, -0x1
05ca38: stxdw [r1 + 0x0], r2
05ca40: ldxdw r3, [r10 - 0xa48]
05ca48: jne r2, 0x0, +0x3 ; branch 0x5ca68
05ca50: ldxdw r2, [r1 + 0x8]
05ca58: add64 r2, -0x1
05ca60: stxdw [r1 + 0x8], r2
05ca68: ldxdw r1, [r3 + 0x8]
05ca70: ldxdw r2, [r1 + 0x88]
05ca78: mov64 r6, r10
05ca80: add64 r6, -0x6d0
05ca88: mov64 r1, r6
05ca90: call -0x97c4 ; direct target 0x10c78
05ca98: mov64 r1, r6
05caa0: call 0x28bf8 ; direct target 0x1a2a68
05caa8: stxdw [r10 - 0xa98], r0
05cab0: ldxdw r1, [r10 - 0x6c0]
05cab8: ldxdw r2, [r10 - 0x6c8]
05cac0: ldxdw r3, [r2 + 0x0]
05cac8: add64 r3, -0x1
05cad0: stxdw [r2 + 0x0], r3
05cad8: jne r3, 0x0, +0x3 ; branch 0x5caf8
05cae0: ldxdw r3, [r2 + 0x8]
05cae8: add64 r3, -0x1
05caf0: stxdw [r2 + 0x8], r3
05caf8: ldxdw r6, [r10 - 0xab0]
05cb00: add64 r6, 0x8
05cb08: ldxdw r3, [r1 + 0x0]
05cb10: add64 r3, -0x1
05cb18: stxdw [r1 + 0x0], r3
05cb20: jne r3, 0x0, +0x3 ; branch 0x5cb40
05cb28: ldxdw r3, [r1 + 0x8]
05cb30: add64 r3, -0x1
05cb38: stxdw [r1 + 0x8], r3
05cb40: mov64 r1, r10
05cb48: add64 r1, -0x6d0
05cb50: mov64 r2, r6
05cb58: mov64 r3, r9
05cb60: call 0x87b2 ; direct target 0xa08f8
05cb68: ldxdw r3, [r10 - 0x6c8]
05cb70: ldxdw r1, [r10 - 0x6d0]
05cb78: jne r1, 0x0, +0x11 ; branch 0x5cc08
05cb80: stxdw [r10 - 0xac8], r3
05cb88: stxdw [r10 - 0xab8], r6
05cb90: ldxdw r9, [r10 - 0xad0]
05cb98: add64 r9, 0x20
05cba0: ldxdw r6, [r10 - 0x6c0]
05cba8: ldxdw r1, [r10 - 0xa68]
05cbb0: lsh64 r1, 0x20
05cbb8: rsh64 r1, 0x20
05cbc0: jeq r1, 0x0, +0x13 ; branch 0x5cc60
05cbc8: mov64 r1, r10
05cbd0: add64 r1, -0x6d0
05cbd8: ldxdw r2, [r10 - 0xab8]
05cbe0: ldxdw r3, [r10 - 0xa78]
05cbe8: call 0x8729 ; direct target 0xa0538
05cbf0: ldxdw r3, [r10 - 0x6c8]
05cbf8: ldxdw r1, [r10 - 0x6d0]
05cc00: jeq r1, 0x0, +0x1f ; branch 0x5cd00
05cc08: ldxdw r1, [r10 - 0x6c0]
05cc10: ldxdw r2, [r10 - 0xa60]
05cc18: stxdw [r2 + 0x8], r1
05cc20: stxdw [r2 + 0x0], r3
05cc28: stb [r2 + 0x5a], 0x2
05cc30: ldxdw r3, [r10 - 0x7c0]
05cc38: ja -0x145 ; branch 0x5c218
05cc40: ldxdw r2, [r10 - 0x860]
05cc48: ja -0x14c ; branch 0x5c1f0
05cc50: ldxdw r2, [r10 - 0x880]
05cc58: ja -0x14e ; branch 0x5c1f0
05cc60: stxdw [r10 - 0xae8], r9
05cc68: mov64 r1, r10
05cc70: add64 r1, -0x6d0
05cc78: mov64 r2, r10
05cc80: add64 r2, -0x818
05cc88: ldxdw r9, [r10 - 0xa78]
05cc90: mov64 r3, r9
05cc98: call 0x7088 ; direct target 0x950e0
05cca0: ldxdw r1, [r10 - 0x6d0]
05cca8: jeq r1, 0x2, +0x1 ; branch 0x5ccb8
05ccb0: ja +0x1c1 ; branch 0x5dac0
05ccb8: ldxdw r3, [r10 - 0x6c8]
05ccc0: jlt r9, r3, +0x1 ; branch 0x5ccd0
05ccc8: ja +0xe ; branch 0x5cd40
05ccd0: mov64 r1, r10
05ccd8: add64 r1, -0xa38
05cce0: call 0x5ec ; direct target 0x5fc48
05cce8: ldxdw r1, [r10 - 0xa38]
05ccf0: ldxdw r2, [r10 - 0xa30]
05ccf8: ja +0x1b9 ; branch 0x5dac8
05cd00: ldxdw r1, [r10 - 0x6c0]
05cd08: jeq r1, 0x0, +0x2d ; branch 0x5ce78
05cd10: mov64 r1, r10
05cd18: add64 r1, -0x8a8
05cd20: call 0x6a7 ; direct target 0x60260
05cd28: ldxdw r1, [r10 - 0x8a8]
05cd30: ldxdw r2, [r10 - 0x8a0]
05cd38: ja +0x1b1 ; branch 0x5dac8
05cd40: ldxdw r1, [r10 - 0xa48]
05cd48: ldxdw r4, [r1 + 0x8]
05cd50: ldxdw r2, [r1 + 0x0]
05cd58: stxdw [r10 - 0xff0], r6
05cd60: ldxdw r1, [r10 - 0xac8]
05cd68: stxdw [r10 - 0xff8], r1
05cd70: ldxdw r1, [r10 - 0xa98]
05cd78: stxdw [r10 - 0x1000], r1
05cd80: mov64 r9, r3
05cd88: stxdw [r10 - 0xfe8], r3
05cd90: add64 r2, 0x8
05cd98: mov64 r1, r10
05cda0: add64 r1, -0x6d0
05cda8: mov64 r5, r10
05cdb0: ldxdw r3, [r10 - 0xab8]
05cdb8: call 0x5a21 ; direct target 0x89ec8
05cdc0: ldxdw r1, [r10 - 0x6d0]
05cdc8: jne r1, 0x0, +0x13 ; branch 0x5ce68
05cdd0: mov64 r1, 0x0
05cdd8: stxdw [r10 - 0xb10], r1
05cde0: stxdw [r10 - 0xb08], r1
05cde8: ldxdw r1, [r10 - 0xad8]
05cdf0: jeq r1, 0x0, +0x2 ; branch 0x5ce08
05cdf8: ldxdw r1, [r10 - 0x6b8]
05ce00: stxdw [r10 - 0xb08], r1
05ce08: jeq r8, 0x0, +0x2 ; branch 0x5ce20
05ce10: ldxdw r1, [r10 - 0x6b0]
05ce18: stxdw [r10 - 0xb10], r1
05ce20: mov64 r1, r10
05ce28: add64 r1, -0x6d0
05ce30: ldxdw r2, [r10 - 0xab8]
05ce38: ldxdw r3, [r10 - 0xb08]
05ce40: ldxdw r4, [r10 - 0xb10]
05ce48: mov64 r5, r9
05ce50: call 0x470e ; direct target 0x806c8
05ce58: ldxdw r1, [r10 - 0x6d0]
05ce60: jeq r1, 0x0, +0x4b ; branch 0x5d0c0
05ce68: ldxdw r1, [r10 - 0x6c8]
05ce70: ja +0x14 ; branch 0x5cf18
05ce78: stxdw [r10 - 0xae8], r9
05ce80: ldxdw r1, [r10 - 0xa48]
05ce88: ldxdw r4, [r1 + 0x8]
05ce90: ldxdw r2, [r1 + 0x0]
05ce98: stxdw [r10 - 0xff0], r6
05cea0: stxdw [r10 - 0xaf0], r3
05cea8: stxdw [r10 - 0xfe8], r3
05ceb0: ldxdw r1, [r10 - 0xac8]
05ceb8: stxdw [r10 - 0xff8], r1
05cec0: ldxdw r1, [r10 - 0xa98]
05cec8: stxdw [r10 - 0x1000], r1
05ced0: add64 r2, 0x8
05ced8: mov64 r1, r10
05cee0: add64 r1, -0x6d0
05cee8: mov64 r5, r10
05cef0: ldxdw r3, [r10 - 0xab8]
05cef8: call 0x59f9 ; direct target 0x89ec8
05cf00: ldxdw r1, [r10 - 0x6c8]
05cf08: ldxdw r2, [r10 - 0x6d0]
05cf10: jeq r2, 0x0, +0x2 ; branch 0x5cf28
05cf18: ldxdw r2, [r10 - 0x6c0]
05cf20: ja +0x174 ; branch 0x5dac8
05cf28: mov64 r2, 0x0
05cf30: stxdw [r10 - 0xb18], r2
05cf38: stxdw [r10 - 0xaf8], r2
05cf40: ldxdw r2, [r10 - 0xad8]
05cf48: jeq r2, 0x0, +0x1 ; branch 0x5cf58
05cf50: stxdw [r10 - 0xaf8], r1
05cf58: mov64 r1, 0x0
05cf60: stxdw [r10 - 0xb00], r1
05cf68: jeq r8, 0x0, +0x2 ; branch 0x5cf80
05cf70: ldxdw r1, [r10 - 0x6c0]
05cf78: stxdw [r10 - 0xb00], r1
05cf80: ldxdw r6, [r10 - 0x6b8]
05cf88: ldxdw r7, [r10 - 0x6b0]
05cf90: mov64 r1, r10
05cf98: add64 r1, -0x6d0
05cfa0: ldxdw r2, [r10 - 0xaf0]
05cfa8: ldxdw r3, [r10 - 0xaf8]
05cfb0: ldxdw r4, [r10 - 0xb00]
05cfb8: call 0x4699 ; direct target 0x80488
05cfc0: mov64 r1, 0x0
05cfc8: stxdw [r10 - 0xb20], r1
05cfd0: jeq r8, 0x0, +0x1 ; branch 0x5cfe0
05cfd8: stxdw [r10 - 0xb20], r7
05cfe0: ldxdw r1, [r10 - 0xad8]
05cfe8: jeq r1, 0x0, +0x1 ; branch 0x5cff8
05cff0: stxdw [r10 - 0xb18], r6
05cff8: ldxdw r1, [r10 - 0x6d0]
05d000: jeq r1, 0x2, +0x1 ; branch 0x5d010
05d008: ja +0x156 ; branch 0x5dac0
05d010: ldxdw r1, [r10 - 0x6c8]
05d018: mov64 r8, r1
05d020: jeq r1, 0x0, +0x32 ; branch 0x5d1b8
05d028: mov64 r1, r10
05d030: add64 r1, -0x6d0
05d038: mov64 r2, r10
05d040: add64 r2, -0x818
05d048: mov64 r3, r8
05d050: call 0x7011 ; direct target 0x950e0
05d058: ldxdw r1, [r10 - 0x6d0]
05d060: jeq r1, 0x2, +0x1 ; branch 0x5d070
05d068: ja +0x14a ; branch 0x5dac0
05d070: ldxdw r1, [r10 - 0x6c8]
05d078: stxdw [r10 - 0xa70], r1
05d080: jlt r8, r1, +0x1 ; branch 0x5d090
05d088: ja +0x45 ; branch 0x5d2b8
05d090: mov64 r1, r10
05d098: add64 r1, -0x8e8
05d0a0: call 0x678 ; direct target 0x60468
05d0a8: ldxdw r1, [r10 - 0x8e8]
05d0b0: ldxdw r2, [r10 - 0x8e0]
05d0b8: ja +0x141 ; branch 0x5dac8
05d0c0: ldxdw r1, [r10 - 0x6a8]
05d0c8: stxdw [r10 - 0xb20], r1
05d0d0: ldxdw r1, [r10 - 0x6b0]
05d0d8: stxdw [r10 - 0xb18], r1
05d0e0: ldxdw r4, [r10 - 0x6b8]
05d0e8: ldxdw r3, [r10 - 0x6c0]
05d0f0: mov64 r1, r10
05d0f8: add64 r1, -0x6d0
05d100: mov64 r2, r9
05d108: stxdw [r10 - 0xaf8], r3
05d110: stxdw [r10 - 0xb00], r4
05d118: call 0x466d ; direct target 0x80488
05d120: ldxdw r1, [r10 - 0x6d0]
05d128: jeq r1, 0x2, +0x1 ; branch 0x5d138
05d130: ja +0x131 ; branch 0x5dac0
05d138: ldxdw r3, [r10 - 0x6c8]
05d140: mov64 r1, r10
05d148: add64 r1, -0x6d0
05d150: ldxdw r2, [r10 - 0xab8]
05d158: stxdw [r10 - 0xaf0], r3
05d160: call 0x86da ; direct target 0xa0838
05d168: ldxdw r1, [r10 - 0x6c8]
05d170: stxdw [r10 - 0xb28], r1
05d178: ldxdw r1, [r10 - 0x6d0]
05d180: jeq r1, 0x0, +0x77 ; branch 0x5d540
05d188: ldxdw r1, [r10 - 0x6c0]
05d190: ldxdw r2, [r10 - 0xa60]
05d198: stxdw [r2 + 0x8], r1
05d1a0: ldxdw r1, [r10 - 0xb28]
05d1a8: stxdw [r2 + 0x0], r1
05d1b0: ja -0xb2 ; branch 0x5cc28
05d1b8: mov64 r1, r10
05d1c0: add64 r1, -0x6b0
05d1c8: lddw r2, 0x1b5da0 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x16\x00\x00\x00\x0e\x00\x00\x00V\x00\x00\x00*\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00'
05d1d8: call 0x1f434 ; direct target 0x157380
05d1e0: mov64 r1, r10
05d1e8: add64 r1, -0x698
05d1f0: lddw r2, 0x1b5da0 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x16\x00\x00\x00\x0e\x00\x00\x00V\x00\x00\x00*\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00'
05d200: call -0xa51a ; direct target 0xa938
05d208: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
05d218: stxdw [r10 - 0x6c8], r1
05d220: stb [r10 - 0x680], 0x2
05d228: stw [r10 - 0x6b8], 0x2ae
05d230: stdw [r10 - 0x6c0], 0x29
05d238: stdw [r10 - 0x6d0], 0x0
05d240: stw [r10 - 0x638], 0x1786
05d248: mov64 r1, r10
05d250: add64 r1, -0x8f8
05d258: mov64 r2, r10
05d260: add64 r2, -0x6d0
05d268: call 0x27d18 ; direct target 0x19bb30
05d270: ldxdw r3, [r10 - 0x8f0]
05d278: ldxdw r2, [r10 - 0x8f8]
05d280: mov64 r1, r10
05d288: add64 r1, -0x908
05d290: mov64 r4, 0x0
05d298: call -0xb9ec ; direct target 0x340
05d2a0: ldxdw r1, [r10 - 0x908]
05d2a8: ldxdw r2, [r10 - 0x900]
05d2b0: ja +0x102 ; branch 0x5dac8
05d2b8: ldxdw r1, [r10 - 0xae8]
05d2c0: ldxdw r2, [r1 + 0x0]
05d2c8: mov64 r7, r10
05d2d0: add64 r7, -0x6d0
05d2d8: mov64 r1, r7
05d2e0: call -0x98ce ; direct target 0x10c78
05d2e8: ldxdw r2, [r10 - 0xaa8]
05d2f0: ldxb r1, [r2 + 0x30]
05d2f8: ldxdw r2, [r2 + 0x58]
05d300: stxdw [r10 - 0xff0], r2
05d308: ldxdw r2, [r10 - 0xa78]
05d310: stxdw [r10 - 0xfe8], r2
05d318: stxdw [r10 - 0xff8], r1
05d320: stxdw [r10 - 0x1000], r7
05d328: mov64 r1, r10
05d330: add64 r1, -0x8b8
05d338: mov64 r4, r10
05d340: add64 r4, -0x7f8
05d348: mov64 r5, r10
05d350: ldxdw r2, [r10 - 0xa48]
05d358: ldxdw r3, [r10 - 0xa80]
05d360: call -0x621 ; direct target 0x5a260
05d368: ldxdw r1, [r10 - 0x8b8]
05d370: jne r1, 0x2, +0x41 ; branch 0x5d580
05d378: ldxdw r1, [r10 - 0x6c0]
05d380: ldxdw r2, [r10 - 0x6c8]
05d388: ldxdw r3, [r2 + 0x0]
05d390: add64 r3, -0x1
05d398: stxdw [r2 + 0x0], r3
05d3a0: jne r3, 0x0, +0x3 ; branch 0x5d3c0
05d3a8: ldxdw r3, [r2 + 0x8]
05d3b0: add64 r3, -0x1
05d3b8: stxdw [r2 + 0x8], r3
05d3c0: ldxdw r2, [r1 + 0x0]
05d3c8: add64 r2, -0x1
05d3d0: stxdw [r1 + 0x0], r2
05d3d8: jne r2, 0x0, +0x3 ; branch 0x5d3f8
05d3e0: ldxdw r2, [r1 + 0x8]
05d3e8: add64 r2, -0x1
05d3f0: stxdw [r1 + 0x8], r2
05d3f8: mov64 r1, r10
05d400: add64 r1, -0x8c8
05d408: ldxdw r2, [r10 - 0xab8]
05d410: ldxdw r3, [r10 - 0xa78]
05d418: ldxdw r4, [r10 - 0xaf0]
05d420: call 0x87f7 ; direct target 0xa13e0
05d428: ldxdw r1, [r10 - 0x8c8]
05d430: jeq r1, 0x2, +0x1 ; branch 0x5d440
05d438: ja +0x70 ; branch 0x5d7c0
05d440: ldxdw r1, [r10 - 0xa90]
05d448: lsh64 r1, 0x20
05d450: rsh64 r1, 0x20
05d458: jeq r1, 0x0, +0x71 ; branch 0x5d7e8
05d460: ldxdw r1, [r10 - 0xa88]
05d468: jne r1, 0x0, +0x1 ; branch 0x5d478
05d470: ja +0x6e ; branch 0x5d7e8
05d478: ldxdw r1, [r10 - 0xa48]
05d480: ldxdw r4, [r1 + 0x30]
05d488: ldxdw r2, [r10 - 0xac0]
05d490: ldxb r1, [r2 + 0x30]
05d498: ldxdw r2, [r2 + 0x58]
05d4a0: stxdw [r10 - 0xfe8], r8
05d4a8: mov64 r3, r10
05d4b0: add64 r3, -0x778
05d4b8: stxdw [r10 - 0xfe0], r3
05d4c0: stxdw [r10 - 0xff0], r2
05d4c8: stxdw [r10 - 0xff8], r1
05d4d0: ldxdw r1, [r10 - 0xab0]
05d4d8: stxdw [r10 - 0x1000], r1
05d4e0: ldxdw r3, [r10 - 0xa40]
05d4e8: add64 r3, 0x20
05d4f0: mov64 r1, r10
05d4f8: add64 r1, -0x8d8
05d500: mov64 r2, r10
05d508: add64 r2, -0x7c8
05d510: mov64 r5, r10
05d518: call 0x6310 ; direct target 0x8eda0
05d520: ldxdw r1, [r10 - 0x8d8]
05d528: jeq r1, 0x2, +0x57 ; branch 0x5d7e8
05d530: ldxdw r2, [r10 - 0x8d0]
05d538: ja +0x51 ; branch 0x5d7c8
05d540: ldxdw r1, [r10 - 0x6c0]
05d548: jeq r1, 0x0, +0x1d ; branch 0x5d638
05d550: mov64 r1, r10
05d558: add64 r1, -0x918
05d560: call 0x51d ; direct target 0x5fe50
05d568: ldxdw r1, [r10 - 0x918]
05d570: ldxdw r2, [r10 - 0x910]
05d578: ja +0xa9 ; branch 0x5dac8
05d580: ldxdw r2, [r10 - 0x8b0]
05d588: ldxdw r3, [r10 - 0xa60]
05d590: stxdw [r3 + 0x0], r1
05d598: stxdw [r3 + 0x8], r2
05d5a0: stb [r3 + 0x5a], 0x2
05d5a8: ldxdw r1, [r10 - 0x6c0]
05d5b0: ldxdw r2, [r10 - 0x6c8]
05d5b8: ldxdw r3, [r2 + 0x0]
05d5c0: add64 r3, -0x1
05d5c8: stxdw [r2 + 0x0], r3
05d5d0: jne r3, 0x0, +0x3 ; branch 0x5d5f0
05d5d8: ldxdw r3, [r2 + 0x8]
05d5e0: add64 r3, -0x1
05d5e8: stxdw [r2 + 0x8], r3
05d5f0: ldxdw r2, [r1 + 0x0]
05d5f8: add64 r2, -0x1
05d600: stxdw [r1 + 0x0], r2
05d608: jne r2, 0x0, +0x3 ; branch 0x5d628
05d610: ldxdw r2, [r1 + 0x8]
05d618: add64 r2, -0x1
05d620: stxdw [r1 + 0x8], r2
05d628: ldxdw r3, [r10 - 0x7c0]
05d630: ja -0x284 ; branch 0x5c218
05d638: ldxdw r1, [r10 - 0xb28]
05d640: jeq r1, 0x0, +0x96 ; branch 0x5daf8
05d648: ldxdw r1, [r10 - 0xab0]
05d650: ldxdw r8, [r1 + 0x58]
05d658: ldxdw r1, [r10 - 0xb28]
05d660: jgt r1, r8, +0x1 ; branch 0x5d670
05d668: ja +0xb1 ; branch 0x5dbf8
05d670: ldxdw r1, [r10 - 0xa48]
05d678: ldxdw r2, [r1 + 0x0]
05d680: stxdw [r10 - 0xb28], r2
05d688: ldxdw r1, [r1 + 0x18]
05d690: ldxdw r1, [r1 + 0x0]
05d698: ldxdw r2, [r1 + 0x18]
05d6a0: stxdw [r10 - 0x6b8], r2
05d6a8: ldxdw r2, [r1 + 0x10]
05d6b0: stxdw [r10 - 0x6c0], r2
05d6b8: ldxdw r2, [r1 + 0x8]
05d6c0: stxdw [r10 - 0x6c8], r2
05d6c8: ldxdw r1, [r1 + 0x0]
05d6d0: stxdw [r10 - 0x6d0], r1
05d6d8: ldxdw r1, [r10 - 0xab0]
05d6e0: ldxb r1, [r1 + 0xa2]
05d6e8: jeq r1, 0x0, +0xce ; branch 0x5dd60
05d6f0: mov64 r1, r10
05d6f8: add64 r1, -0x6b0
05d700: lddw r2, 0x1b5f40 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()'
05d710: call 0x1f38d ; direct target 0x157380
05d718: mov64 r1, r10
05d720: add64 r1, -0x698
05d728: lddw r2, 0x1b5f40 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()'
05d738: call -0xa5c1 ; direct target 0xa938
05d740: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
05d750: stxdw [r10 - 0x6c8], r1
05d758: stb [r10 - 0x680], 0x2
05d760: stw [r10 - 0x6b8], 0x257
05d768: stdw [r10 - 0x6c0], 0x29
05d770: stdw [r10 - 0x6d0], 0x0
05d778: stw [r10 - 0x638], 0x1785
05d780: mov64 r1, r10
05d788: add64 r1, -0xa08
05d790: mov64 r2, r10
05d798: add64 r2, -0x6d0
05d7a0: call 0x27c71 ; direct target 0x19bb30
05d7a8: ldxdw r2, [r10 - 0xa00]
05d7b0: ldxdw r1, [r10 - 0xa08]
05d7b8: ja +0x61 ; branch 0x5dac8
05d7c0: ldxdw r2, [r10 - 0x8c0]
05d7c8: ldxdw r3, [r10 - 0xa60]
05d7d0: stxdw [r3 + 0x0], r1
05d7d8: stxdw [r3 + 0x8], r2
05d7e0: ja +0x5f ; branch 0x5dae0
05d7e8: ldxdw r1, [r10 - 0xa70]
05d7f0: sub64 r8, r1
05d7f8: mov64 r1, 0x0
05d800: stxdw [r10 - 0xa98], r1
05d808: ldxdw r1, [r10 - 0xb20]
05d810: stxdw [r10 - 0x718], r1
05d818: ldxdw r1, [r10 - 0xb18]
05d820: stxdw [r10 - 0x720], r1
05d828: ldxdw r5, [r10 - 0xb00]
05d830: stxdw [r10 - 0x728], r5
05d838: ldxdw r4, [r10 - 0xaf8]
05d840: stxdw [r10 - 0x730], r4
05d848: ldxdw r1, [r10 - 0x260]
05d850: stxdw [r10 - 0x700], r1
05d858: ldxdw r1, [r10 - 0x258]
05d860: stxdw [r10 - 0x6f8], r1
05d868: ldxdw r1, [r10 - 0x340]
05d870: stxdw [r10 - 0x710], r1
05d878: ldxdw r1, [r10 - 0x338]
05d880: stxdw [r10 - 0x708], r1
05d888: ldxdw r1, [r10 - 0xa48]
05d890: ldxdw r3, [r1 + 0x0]
05d898: add64 r3, 0x8
05d8a0: mov64 r1, r10
05d8a8: add64 r1, -0x6d0
05d8b0: ldxdw r2, [r10 - 0xab8]
05d8b8: call 0x8863 ; direct target 0xa1bd8
05d8c0: ldxdw r1, [r10 - 0x6d0]
05d8c8: jeq r1, 0x2, +0x1 ; branch 0x5d8d8
05d8d0: ja +0x3d ; branch 0x5dac0
05d8d8: ldxdw r6, [r10 - 0x6c8]
05d8e0: mov64 r9, 0x0
05d8e8: ldxdw r1, [r10 - 0xa98]
05d8f0: jeq r1, 0x0, +0x13 ; branch 0x5d990
05d8f8: ldxdw r1, [r10 - 0xa48]
05d900: ldxdw r3, [r1 + 0x0]
05d908: ldxdw r1, [r10 - 0xab0]
05d910: ldxdw r2, [r10 - 0xb08]
05d918: stxdw [r1 + 0x98], r2
05d920: stxdw [r10 - 0xab0], r1
05d928: ldxdw r2, [r10 - 0xac8]
05d930: stxdw [r1 + 0x90], r2
05d938: add64 r3, 0x8
05d940: mov64 r1, r10
05d948: add64 r1, -0x6d0
05d950: ldxdw r2, [r10 - 0xab8]
05d958: ldxdw r4, [r10 - 0xb10]
05d960: ldxdw r5, [r10 - 0xb30]
05d968: call 0x884d ; direct target 0xa1bd8
05d970: ldxdw r1, [r10 - 0x6d0]
05d978: jeq r1, 0x2, +0x1 ; branch 0x5d988
05d980: ja +0x27 ; branch 0x5dac0
05d988: ldxdw r9, [r10 - 0x6c8]
05d990: mov64 r7, r6
05d998: add64 r7, r9
05d9a0: mov64 r1, 0x1
05d9a8: jlt r7, r6, +0x1 ; branch 0x5d9b8
05d9b0: mov64 r1, 0x0
05d9b8: and64 r1, 0x1
05d9c0: jne r1, 0x0, +0xbd ; branch 0x5dfb0
05d9c8: mov64 r1, r10
05d9d0: add64 r1, -0x6d0
05d9d8: mov64 r2, r10
05d9e0: add64 r2, -0x818
05d9e8: mov64 r3, r7
05d9f0: call 0x6edd ; direct target 0x950e0
05d9f8: ldxdw r1, [r10 - 0x6d0]
05da00: jeq r1, 0x2, +0x1 ; branch 0x5da10
05da08: ja +0x16 ; branch 0x5dac0
05da10: ldxdw r1, [r10 - 0x6c8]
05da18: stxdw [r10 - 0xa80], r1
05da20: mov64 r1, r10
05da28: add64 r1, -0x6d0
05da30: mov64 r2, r10
05da38: add64 r2, -0x818
05da40: mov64 r3, r9
05da48: call 0x6ed2 ; direct target 0x950e0
05da50: ldxdw r1, [r10 - 0x6d0]
05da58: jeq r1, 0x2, +0x1 ; branch 0x5da68
05da60: ja +0xb ; branch 0x5dac0
05da68: ldxdw r2, [r10 - 0x6c8]
05da70: ldxdw r1, [r10 - 0xa80]
05da78: stxdw [r10 - 0xad0], r2
05da80: jlt r1, r2, +0x1 ; branch 0x5da90
05da88: ja +0xed ; branch 0x5e1f8
05da90: mov64 r1, r10
05da98: add64 r1, -0x9d8
05daa0: call 0x5ba ; direct target 0x60878
05daa8: ldxdw r1, [r10 - 0x9d8]
05dab0: ldxdw r2, [r10 - 0x9d0]
05dab8: ja +0x1 ; branch 0x5dac8
05dac0: ldxdw r2, [r10 - 0x6c8]
05dac8: ldxdw r3, [r10 - 0xa60]
05dad0: stxdw [r3 + 0x8], r2
05dad8: stxdw [r3 + 0x0], r1
05dae0: stb [r3 + 0x5a], 0x2
05dae8: ldxdw r3, [r10 - 0x7c0]
05daf0: ja -0x31c ; branch 0x5c218
05daf8: mov64 r1, r10
05db00: add64 r1, -0x6b0
05db08: lddw r2, 0x1b5e34 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x14\x00\x00\x00\x13\x00\x00\x00U\x00\x00\x00D\x00\x00\x00:\x00\x00\x00?\x00\x00\x00_\x00\x00\x00]\x00\x00\x00g\x00\x00\x009\x00\x00\x00\x05\x10\x00\x00B\x00\x00\x00E\x00\x00\x00userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00'
05db18: call 0x1f30c ; direct target 0x157380
05db20: mov64 r1, r10
05db28: add64 r1, -0x698
05db30: lddw r2, 0x1b5e34 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x14\x00\x00\x00\x13\x00\x00\x00U\x00\x00\x00D\x00\x00\x00:\x00\x00\x00?\x00\x00\x00_\x00\x00\x00]\x00\x00\x00g\x00\x00\x009\x00\x00\x00\x05\x10\x00\x00B\x00\x00\x00E\x00\x00\x00userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00'
05db40: call -0xa642 ; direct target 0xa938
05db48: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
05db58: stxdw [r10 - 0x6c8], r1
05db60: stb [r10 - 0x680], 0x2
05db68: stw [r10 - 0x6b8], 0x24e
05db70: stdw [r10 - 0x6c0], 0x29
05db78: stdw [r10 - 0x6d0], 0x0
05db80: stw [r10 - 0x638], 0x1784
05db88: mov64 r1, r10
05db90: add64 r1, -0xa18
05db98: mov64 r2, r10
05dba0: add64 r2, -0x6d0
05dba8: call 0x27bf0 ; direct target 0x19bb30
05dbb0: ldxdw r3, [r10 - 0xa10]
05dbb8: ldxdw r2, [r10 - 0xa18]
05dbc0: mov64 r1, r10
05dbc8: add64 r1, -0xa28
05dbd0: mov64 r4, 0x0
05dbd8: call -0xbb14 ; direct target 0x340
05dbe0: ldxdw r1, [r10 - 0xa28]
05dbe8: ldxdw r2, [r10 - 0xa20]
05dbf0: ja -0x26 ; branch 0x5dac8
05dbf8: mov64 r1, 0x0
05dc00: stxdw [r10 - 0xa98], r1
05dc08: mov64 r1, 0x0
05dc10: ldxdw r3, [r10 - 0xb28]
05dc18: mov64 r2, r3
05dc20: add64 r2, r1
05dc28: mov64 r1, 0x1
05dc30: stxdw [r10 - 0xa70], r2
05dc38: jlt r2, r3, +0x1 ; branch 0x5dc48
05dc40: mov64 r1, 0x0
05dc48: and64 r1, 0x1
05dc50: jne r1, 0x0, +0x1 ; branch 0x5dc60
05dc58: ja +0x6 ; branch 0x5dc90
05dc60: mov64 r1, r10
05dc68: add64 r1, -0x9f8
05dc70: call 0x47c ; direct target 0x60058
05dc78: ldxdw r1, [r10 - 0x9f0]
05dc80: ldxdw r2, [r10 - 0x9f8]
05dc88: ja +0x81 ; branch 0x5e098
05dc90: ldxdw r1, [r10 - 0xa90]
05dc98: lsh64 r1, 0x20
05dca0: rsh64 r1, 0x20
05dca8: jne r1, 0x0, +0x1 ; branch 0x5dcb8
05dcb0: ja +0x69 ; branch 0x5e000
05dcb8: ldxdw r2, [r10 - 0xac0]
05dcc0: ldxb r1, [r2 + 0x30]
05dcc8: ldxdw r2, [r2 + 0x58]
05dcd0: stxdw [r10 - 0xff0], r2
05dcd8: ldxdw r2, [r10 - 0xa78]
05dce0: stxdw [r10 - 0xfe8], r2
05dce8: stxdw [r10 - 0xff8], r1
05dcf0: ldxdw r1, [r10 - 0xae0]
05dcf8: stxdw [r10 - 0x1000], r1
05dd00: mov64 r1, r10
05dd08: add64 r1, -0x938
05dd10: mov64 r4, r10
05dd18: add64 r4, -0x7c8
05dd20: mov64 r5, r10
05dd28: ldxdw r2, [r10 - 0xa48]
05dd30: ldxdw r3, [r10 - 0xa80]
05dd38: call -0x75c ; direct target 0x5a260
05dd40: ldxdw r1, [r10 - 0x930]
05dd48: ldxdw r2, [r10 - 0x938]
05dd50: jeq r2, 0x2, +0x5f ; branch 0x5e050
05dd58: ja +0x67 ; branch 0x5e098
05dd60: ldxdw r2, [r10 - 0xb28]
05dd68: add64 r2, 0x288
05dd70: mov64 r1, r10
05dd78: add64 r1, -0x6d0
05dd80: mov64 r3, 0x20
05dd88: call 0x2ab1d ; direct target 0x1b3678
05dd90: lsh64 r0, 0x20
05dd98: rsh64 r0, 0x20
05dda0: jeq r0, 0x0, -0xd7 ; branch 0x5d6f0
05dda8: ldxdw r2, [r10 - 0xb28]
05ddb0: add64 r2, 0x8
05ddb8: ldxdw r1, [r10 - 0xa48]
05ddc0: ldxdw r3, [r1 + 0x8]
05ddc8: ldxdw r1, [r10 - 0xb10]
05ddd0: stxdw [r10 - 0xfd0], r1
05ddd8: stxdw [r10 - 0xfc8], r9
05dde0: ldxdw r1, [r10 - 0xb08]
05dde8: stxdw [r10 - 0xfd8], r1
05ddf0: ldxdw r1, [r10 - 0xa70]
05ddf8: stxdw [r10 - 0xfe0], r1
05de00: ldxdw r1, [r10 - 0xad0]
05de08: stxdw [r10 - 0xfe8], r1
05de10: ldxdw r1, [r10 - 0xab0]
05de18: stxdw [r10 - 0xff0], r1
05de20: stxdw [r10 - 0xff8], r6
05de28: ldxdw r1, [r10 - 0xac8]
05de30: stxdw [r10 - 0x1000], r1
05de38: mov64 r1, r10
05de40: add64 r1, -0x6d0
05de48: mov64 r5, r10
05de50: ldxdw r4, [r10 - 0xa98]
05de58: call -0xc04 ; direct target 0x57e40
05de60: ldxdw r2, [r10 - 0x6c0]
05de68: ldxdw r1, [r10 - 0x6c8]
05de70: ldxdw r3, [r10 - 0x6d0]
05de78: jeq r3, 0x2, -0x77 ; branch 0x5dac8
05de80: ldxdw r4, [r10 - 0x690]
05de88: stxdw [r10 - 0x6e0], r4
05de90: ldxdw r4, [r10 - 0x688]
05de98: stxdw [r10 - 0x6d8], r4
05dea0: ldxdw r4, [r10 - 0x670]
05dea8: stxdw [r10 - 0x6f0], r4
05deb0: ldxdw r4, [r10 - 0x668]
05deb8: stxdw [r10 - 0x6e8], r4
05dec0: ldxdw r4, [r10 - 0x678]
05dec8: stxdw [r10 - 0xb08], r4
05ded0: ldxdw r4, [r10 - 0x680]
05ded8: stxdw [r10 - 0xac8], r4
05dee0: ldxdw r4, [r10 - 0x698]
05dee8: stxdw [r10 - 0xb30], r4
05def0: ldxdw r4, [r10 - 0x6a0]
05def8: stxdw [r10 - 0xb10], r4
05df00: jeq r3, 0x0, +0x1b ; branch 0x5dfe0
05df08: ldxdw r3, [r10 - 0x6a8]
05df10: stxdw [r10 - 0xaf0], r3
05df18: ldxdw r3, [r10 - 0x6b0]
05df20: stxdw [r10 - 0xb20], r3
05df28: ldxdw r3, [r10 - 0x6b8]
05df30: stxdw [r10 - 0xb18], r3
05df38: ldxdw r3, [r10 - 0x6d8]
05df40: stxdw [r10 - 0x6c8], r3
05df48: ldxdw r3, [r10 - 0x6e0]
05df50: stxdw [r10 - 0x6d0], r3
05df58: ldxdw r3, [r10 - 0x6e8]
05df60: stxdw [r10 - 0x490], r3
05df68: ldxdw r3, [r10 - 0x6f0]
05df70: stxdw [r10 - 0x498], r3
05df78: mov64 r3, 0x1
05df80: stxdw [r10 - 0xa98], r3
05df88: stxdw [r10 - 0xb00], r2
05df90: stxdw [r10 - 0xaf8], r1
05df98: stxdw [r10 - 0xb28], r8
05dfa0: ldxdw r1, [r10 - 0xac8]
05dfa8: ja -0x74 ; branch 0x5dc10
05dfb0: mov64 r1, r10
05dfb8: add64 r1, -0x9e8
05dfc0: call 0x4d5 ; direct target 0x60670
05dfc8: ldxdw r1, [r10 - 0x9e8]
05dfd0: ldxdw r2, [r10 - 0x9e0]
05dfd8: ja -0xa3 ; branch 0x5dac8
05dfe0: mov64 r1, 0x0
05dfe8: stxdw [r10 - 0xa98], r1
05dff0: stxdw [r10 - 0xb28], r8
05dff8: ja -0x7e ; branch 0x5dc10
05e000: ldxdw r2, [r7 + 0x0]
05e008: mov64 r1, r10
05e010: add64 r1, -0x928
05e018: ldxdw r3, [r10 - 0xa50]
05e020: ldxdw r4, [r10 - 0xab0]
05e028: ldxdw r5, [r10 - 0xa78]
05e030: call 0x5fec ; direct target 0x8df98
05e038: ldxdw r1, [r10 - 0x920]
05e040: ldxdw r2, [r10 - 0x928]
05e048: jne r2, 0x2, +0x9 ; branch 0x5e098
05e050: mov64 r1, r10
05e058: add64 r1, -0x948
05e060: ldxdw r2, [r10 - 0xab8]
05e068: ldxdw r3, [r10 - 0xb28]
05e070: ldxdw r4, [r10 - 0xaf0]
05e078: call 0x856e ; direct target 0xa0bf0
05e080: ldxdw r1, [r10 - 0x940]
05e088: ldxdw r2, [r10 - 0x948]
05e090: jeq r2, 0x2, +0x4 ; branch 0x5e0b8
05e098: ldxdw r3, [r10 - 0xa60]
05e0a0: stxdw [r3 + 0x0], r2
05e0a8: stxdw [r3 + 0x8], r1
05e0b0: ja -0xbb ; branch 0x5dae0
05e0b8: ldxdw r1, [r10 - 0xa88]
05e0c0: jne r1, 0x0, +0xd ; branch 0x5e130
05e0c8: ldxdw r8, [r10 - 0xa78]
05e0d0: sub64 r8, r9
05e0d8: ldxdw r1, [r10 - 0x6c8]
05e0e0: stxdw [r10 - 0x258], r1
05e0e8: ldxdw r1, [r10 - 0x6d0]
05e0f0: stxdw [r10 - 0x260], r1
05e0f8: ldxdw r1, [r10 - 0x498]
05e100: stxdw [r10 - 0x340], r1
05e108: ldxdw r1, [r10 - 0x490]
05e110: stxdw [r10 - 0x338], r1
05e118: ldxdw r1, [r10 - 0xb28]
05e120: stxdw [r10 - 0xa78], r1
05e128: ja -0x125 ; branch 0x5d808
05e130: ldxdw r1, [r10 - 0xa48]
05e138: ldxdw r4, [r1 + 0x30]
05e140: ldxdw r2, [r10 - 0xaa8]
05e148: ldxb r1, [r2 + 0x30]
05e150: ldxdw r2, [r2 + 0x58]
05e158: ldxdw r3, [r10 - 0xa70]
05e160: stxdw [r10 - 0xfe8], r3
05e168: mov64 r3, r10
05e170: add64 r3, -0x778
05e178: stxdw [r10 - 0xfe0], r3
05e180: stxdw [r10 - 0xff0], r2
05e188: stxdw [r10 - 0xff8], r1
05e190: ldxdw r1, [r10 - 0xab0]
05e198: stxdw [r10 - 0x1000], r1
05e1a0: mov64 r1, r10
05e1a8: add64 r1, -0x958
05e1b0: mov64 r2, r10
05e1b8: add64 r2, -0x7f8
05e1c0: mov64 r5, r10
05e1c8: ldxdw r3, [r10 - 0xad0]
05e1d0: call 0x69cf ; direct target 0x93050
05e1d8: ldxdw r1, [r10 - 0x950]
05e1e0: ldxdw r2, [r10 - 0x958]
05e1e8: jeq r2, 0x2, -0x25 ; branch 0x5e0c8
05e1f0: ja -0x2c ; branch 0x5e098
05e1f8: ldxdw r1, [r10 - 0xad8]
05e200: jne r1, 0x0, +0x1a ; branch 0x5e2d8
05e208: ldxdw r1, [r10 - 0xa90]
05e210: lsh64 r1, 0x20
05e218: rsh64 r1, 0x20
05e220: jne r1, 0x0, +0x32 ; branch 0x5e3b8
05e228: ldxdw r1, [r10 - 0xa68]
05e230: lsh64 r1, 0x20
05e238: rsh64 r1, 0x20
05e240: jeq r1, 0x0, +0x2e ; branch 0x5e3b8
05e248: ldxdw r1, [r10 - 0xa88]
05e250: jeq r1, 0x0, +0x2c ; branch 0x5e3b8
05e258: ldxdw r1, [r10 - 0xa50]
05e260: ldxdw r2, [r1 + 0x0]
05e268: mov64 r7, r10
05e270: add64 r7, -0x6d0
05e278: mov64 r1, r7
05e280: call -0x9ac2 ; direct target 0x10c78
05e288: mov64 r1, r10
05e290: add64 r1, -0x988
05e298: ldxdw r2, [r10 - 0xab0]
05e2a0: mov64 r3, r7
05e2a8: ldxdw r4, [r10 - 0xa70]
05e2b0: call 0x7060 ; direct target 0x965b8
05e2b8: ldxdw r1, [r10 - 0x988]
05e2c0: jeq r1, 0x2, +0x1e ; branch 0x5e3b8
05e2c8: ldxdw r2, [r10 - 0x980]
05e2d0: ja -0x162 ; branch 0x5d7c8
05e2d8: ldxdw r1, [r10 - 0xa90]
05e2e0: lsh64 r1, 0x20
05e2e8: rsh64 r1, 0x20
05e2f0: jeq r1, 0x0, +0x108 ; branch 0x5eb38
05e2f8: ldxdw r2, [r10 - 0xac0]
05e300: ldxb r1, [r2 + 0x30]
05e308: ldxdw r2, [r2 + 0x58]
05e310: stxdw [r10 - 0xfe8], r7
05e318: mov64 r3, r10
05e320: add64 r3, -0x778
05e328: stxdw [r10 - 0xfe0], r3
05e330: stxdw [r10 - 0xff0], r2
05e338: stxdw [r10 - 0xff8], r1
05e340: ldxdw r1, [r10 - 0xab0]
05e348: stxdw [r10 - 0x1000], r1
05e350: ldxdw r3, [r10 - 0xa40]
05e358: add64 r3, 0x20
05e360: ldxdw r4, [r10 - 0xa48]
05e368: add64 r4, 0x38
05e370: mov64 r1, r10
05e378: add64 r1, -0x978
05e380: mov64 r2, r10
05e388: add64 r2, -0x7c8
05e390: mov64 r5, r10
05e398: call 0x6ba4 ; direct target 0x940c0
05e3a0: ldxdw r1, [r10 - 0x978]
05e3a8: jeq r1, 0x2, +0x1 ; branch 0x5e3b8
05e3b0: ja +0xfb ; branch 0x5eb90
05e3b8: mov64 r1, r10
05e3c0: add64 r1, -0x6d0
05e3c8: call 0x284ad ; direct target 0x1a0938
05e3d0: ldxdw r1, [r10 - 0x6d0]
05e3d8: jeq r1, 0x0, +0xe ; branch 0x5e450
05e3e0: ldxdw r1, [r10 - 0x6c8]
05e3e8: ldxdw r2, [r10 - 0x6c0]
05e3f0: ldxdw r3, [r10 - 0x6b8]
05e3f8: stxdw [r10 - 0x6c0], r3
05e400: stxdw [r10 - 0x6c8], r2
05e408: stxdw [r10 - 0x6d0], r1
05e410: mov64 r1, r10
05e418: add64 r1, -0x998
05e420: mov64 r2, r10
05e428: add64 r2, -0x6d0
05e430: call 0x27af0 ; direct target 0x19bbb8
05e438: ldxdw r1, [r10 - 0x998]
05e440: ldxdw r2, [r10 - 0x990]
05e448: ja -0x131 ; branch 0x5dac8
05e450: ldxdw r1, [r10 - 0xa80]
05e458: ldxdw r2, [r10 - 0xad0]
05e460: sub64 r1, r2
05e468: ldxdw r3, [r10 - 0xa68]
05e470: lsh64 r3, 0x20
05e478: rsh64 r3, 0x20
05e480: mov64 r2, 0x1
05e488: jeq r3, 0x0, +0x1 ; branch 0x5e498
05e490: mov64 r2, 0x0
05e498: ldxdw r9, [r10 - 0x6a8]
05e4a0: ldxdw r6, [r10 - 0xa48]
05e4a8: ldxdw r3, [r6 + 0x0]
05e4b0: stdw [r10 - 0x248], 0x0
05e4b8: stdw [r10 - 0x250], 0x0
05e4c0: stdw [r10 - 0x258], 0x0
05e4c8: stdw [r10 - 0x260], 0x0
05e4d0: stdw [r10 - 0x240], 0x0
05e4d8: stdw [r10 - 0x238], 0x0
05e4e0: stdw [r10 - 0x230], 0x0
05e4e8: stdw [r10 - 0x228], 0x0
05e4f0: stdw [r10 - 0x220], 0x0
05e4f8: stdw [r10 - 0x218], 0x0
05e500: stdw [r10 - 0x210], 0x0
05e508: stdw [r10 - 0x208], 0x0
05e510: sth [r10 - 0x200], 0x0
05e518: ldxdw r4, [r6 + 0x18]
05e520: ldxdw r4, [r4 + 0x0]
05e528: ldxdw r5, [r4 + 0x18]
05e530: stxdw [r10 - 0x480], r5
05e538: ldxdw r5, [r4 + 0x10]
05e540: stxdw [r10 - 0x488], r5
05e548: ldxdw r5, [r4 + 0x8]
05e550: stxdw [r10 - 0x490], r5
05e558: ldxdw r4, [r4 + 0x0]
05e560: stxdw [r10 - 0x498], r4
05e568: ldxdw r4, [r10 - 0xaa8]
05e570: ldxdw r4, [r4 + 0x58]
05e578: ldxdw r4, [r4 + 0x0]
05e580: ldxdw r5, [r4 + 0x18]
05e588: stxdw [r10 - 0x328], r5
05e590: ldxdw r5, [r4 + 0x10]
05e598: stxdw [r10 - 0x330], r5
05e5a0: ldxdw r5, [r4 + 0x8]
05e5a8: stxdw [r10 - 0x338], r5
05e5b0: ldxdw r4, [r4 + 0x0]
05e5b8: stxdw [r10 - 0x340], r4
05e5c0: lddw r4, 0x1b6ec8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'multi_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/src/quote_control/state.rsprograms/pump/s'
05e5d0: stxdw [r10 - 0xfc0], r4
05e5d8: stxdw [r10 - 0xfc8], r8
05e5e0: stxdw [r10 - 0xfd0], r1
05e5e8: mov64 r1, r10
05e5f0: add64 r1, -0x730
05e5f8: stxdw [r10 - 0xfd8], r1
05e600: ldxdw r1, [r10 - 0xaf0]
05e608: stxdw [r10 - 0xfe0], r1
05e610: ldxdw r1, [r10 - 0xa78]
05e618: stxdw [r10 - 0xfe8], r1
05e620: stxdw [r10 - 0xff0], r2
05e628: mov64 r1, r10
05e630: add64 r1, -0x340
05e638: stxdw [r10 - 0xff8], r1
05e640: mov64 r1, r10
05e648: add64 r1, -0x498
05e650: stxdw [r10 - 0x1000], r1
05e658: add64 r3, 0x8
05e660: stxdw [r10 - 0xfb0], r9
05e668: stdw [r10 - 0xfb8], 0xe
05e670: mov64 r7, r10
05e678: add64 r7, -0x6d0
05e680: mov64 r4, r10
05e688: add64 r4, -0x260
05e690: mov64 r5, r10
05e698: mov64 r1, r7
05e6a0: ldxdw r2, [r10 - 0xab8]
05e6a8: call 0x5aa4 ; direct target 0x8bbd0
05e6b0: mov64 r1, r10
05e6b8: add64 r1, -0x260
05e6c0: mov64 r2, r7
05e6c8: call 0x207bc ; direct target 0x1624b0
05e6d0: ldxdw r1, [r10 - 0x250]
05e6d8: stxdw [r10 - 0x338], r1
05e6e0: ldxdw r1, [r10 - 0x258]
05e6e8: stxdw [r10 - 0x340], r1
05e6f0: mov64 r1, r10
05e6f8: add64 r1, -0x340
05e700: mov64 r2, 0x1
05e708: call 0x283bd ; direct target 0x1a04f8
05e710: add64 r6, 0x60
05e718: mov64 r8, r10
05e720: add64 r8, -0x528
05e728: mov64 r1, r8
05e730: stxdw [r10 - 0xa48], r6
05e738: mov64 r2, r6
05e740: call -0x9b5a ; direct target 0x10c78
05e748: mov64 r1, r10
05e750: add64 r1, -0x4f8
05e758: mov64 r2, r7
05e760: call 0x207a9 ; direct target 0x1624b0
05e768: lddw r1, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05e778: lddw r2, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05e788: add64 r2, 0x8
05e790: stxdw [r10 - 0x4b8], r2
05e798: stxdw [r10 - 0x4c0], r1
05e7a0: ldxdw r1, [r10 - 0x4f8]
05e7a8: stxdw [r10 - 0x4d0], r1
05e7b0: ldxdw r1, [r10 - 0x4f0]
05e7b8: stxdw [r10 - 0x4d8], r1
05e7c0: stxdw [r10 - 0x4e0], r1
05e7c8: ldxdw r2, [r10 - 0x4e8]
05e7d0: add64 r1, r2
05e7d8: stxdw [r10 - 0x4c8], r1
05e7e0: mov64 r1, r10
05e7e8: add64 r1, -0x380
05e7f0: mov64 r2, r10
05e7f8: add64 r2, -0x4e0
05e800: call -0x97a4 ; direct target 0x12ae8
05e808: ldxdw r7, [r10 - 0x378]
05e810: ldxdw r1, [r10 - 0x370]
05e818: stxdw [r10 - 0xa78], r1
05e820: mov64 r1, 0x22
05e828: mov64 r2, 0x1
05e830: call -0xa26f ; direct target 0xd4c0
05e838: ldxdw r1, [r10 - 0x528]
05e840: ldxdw r2, [r1 + 0x18]
05e848: ldxdw r3, [r1 + 0x10]
05e850: ldxdw r4, [r1 + 0x8]
05e858: ldxdw r1, [r1 + 0x0]
05e860: stxdw [r0 + 0x0], r1
05e868: stxdw [r0 + 0x8], r4
05e870: stxdw [r0 + 0x10], r3
05e878: stxdw [r0 + 0x18], r2
05e880: sth [r0 + 0x20], 0x1
05e888: stxdw [r10 - 0x338], r0
05e890: stdw [r10 - 0x340], 0x1
05e898: stdw [r10 - 0x330], 0x1
05e8a0: mov64 r6, r10
05e8a8: add64 r6, -0x260
05e8b0: mov64 r5, r10
05e8b8: add64 r5, -0x340
05e8c0: mov64 r1, r6
05e8c8: lddw r2, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
05e8d8: mov64 r3, r7
05e8e0: ldxdw r4, [r10 - 0xa78]
05e8e8: call 0x291fe ; direct target 0x1a78e0
05e8f0: mov64 r7, r10
05e8f8: add64 r7, -0x340
05e900: mov64 r1, r7
05e908: mov64 r2, r8
05e910: mov64 r3, 0x30
05e918: call 0x2a99e ; direct target 0x1b3610
05e920: mov64 r1, r10
05e928: add64 r1, -0x498
05e930: stxdw [r10 - 0xa8], r1
05e938: mov64 r1, r10
05e940: add64 r1, -0x78
05e948: stxdw [r10 - 0x488], r1
05e950: lddw r1, 0x1b6807 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'__event_authorityanchor:idlprograms/pump/src/buy.rsbonding-curveprograms/pump/src/buy_v2.rsbuybuy_ex'
05e960: stxdw [r10 - 0x498], r1
05e968: ldxdw r1, [r10 - 0xa58]
05e970: stxb [r10 - 0x78], r1
05e978: stdw [r10 - 0xa0], 0x2
05e980: stdw [r10 - 0x480], 0x1
05e988: stdw [r10 - 0x490], 0x11
05e990: mov64 r1, r10
05e998: add64 r1, -0xa8
05e9a0: stxdw [r10 - 0x1000], r1
05e9a8: stdw [r10 - 0xff8], 0x1
05e9b0: mov64 r1, r10
05e9b8: add64 r1, -0x4b0
05e9c0: mov64 r5, r10
05e9c8: mov64 r2, r6
05e9d0: mov64 r3, r7
05e9d8: mov64 r4, 0x1
05e9e0: call 0x28369 ; direct target 0x1a0530
05e9e8: lddw r1, -0x7fffffffffffffe6
05e9f8: ldxdw r2, [r10 - 0x4b0]
05ea00: jeq r2, r1, +0x1 ; branch 0x5ea10
05ea08: ja +0x32 ; branch 0x5eba0
05ea10: ldxdw r1, [r10 - 0x330]
05ea18: ldxdw r2, [r10 - 0x338]
05ea20: ldxdw r3, [r2 + 0x0]
05ea28: add64 r3, -0x1
05ea30: stxdw [r2 + 0x0], r3
05ea38: jne r3, 0x0, +0x3 ; branch 0x5ea58
05ea40: ldxdw r3, [r2 + 0x8]
05ea48: add64 r3, -0x1
05ea50: stxdw [r2 + 0x8], r3
05ea58: ldxdw r2, [r1 + 0x0]
05ea60: add64 r2, -0x1
05ea68: stxdw [r1 + 0x0], r2
05ea70: jne r2, 0x0, +0x3 ; branch 0x5ea90
05ea78: ldxdw r2, [r1 + 0x8]
05ea80: add64 r2, -0x1
05ea88: stxdw [r1 + 0x8], r2
05ea90: ldxdw r1, [r10 - 0xab0]
05ea98: ldxdw r1, [r1 + 0x58]
05eaa0: jeq r1, 0x0, +0x38 ; branch 0x5ec68
05eaa8: ldxdw r1, [r10 - 0xa68]
05eab0: lsh64 r1, 0x20
05eab8: rsh64 r1, 0x20
05eac0: jeq r1, 0x0, +0x135 ; branch 0x5f470
05eac8: ldxdw r1, [r10 - 0xac0]
05ead0: ldxdw r1, [r1 + 0x58]
05ead8: ldxdw r1, [r1 + 0x0]
05eae0: ldxdw r2, [r1 + 0x18]
05eae8: stxdw [r10 - 0x38], r2
05eaf0: ldxdw r2, [r1 + 0x10]
05eaf8: stxdw [r10 - 0x40], r2
05eb00: ldxdw r2, [r1 + 0x8]
05eb08: stxdw [r10 - 0x48], r2
05eb10: ldxdw r1, [r1 + 0x0]
05eb18: stxdw [r10 - 0x50], r1
05eb20: ldxdw r1, [r10 - 0xa40]
05eb28: add64 r1, 0x20
05eb30: ja +0x133 ; branch 0x5f4d0
05eb38: mov64 r1, r10
05eb40: add64 r1, -0x968
05eb48: ldxdw r2, [r10 - 0xa48]
05eb50: ldxdw r3, [r10 - 0xa58]
05eb58: ldxdw r4, [r10 - 0xab0]
05eb60: mov64 r5, r7
05eb68: call -0xb83 ; direct target 0x58f58
05eb70: ldxdw r1, [r10 - 0x968]
05eb78: jeq r1, 0x2, -0x12f ; branch 0x5e208
05eb80: ldxdw r2, [r10 - 0x960]
05eb88: ja -0x279 ; branch 0x5d7c8
05eb90: ldxdw r2, [r10 - 0x970]
05eb98: ja -0x27b ; branch 0x5d7c8
05eba0: mov64 r1, r10
05eba8: add64 r1, -0x9a8
05ebb0: mov64 r2, r10
05ebb8: add64 r2, -0x4b0
05ebc0: call 0x279fe ; direct target 0x19bbb8
05ebc8: ldxdw r1, [r10 - 0x9a8]
05ebd0: ldxdw r2, [r10 - 0x9a0]
05ebd8: ldxdw r3, [r10 - 0xa60]
05ebe0: stxdw [r3 + 0x8], r2
05ebe8: stxdw [r3 + 0x0], r1
05ebf0: stb [r3 + 0x5a], 0x2
05ebf8: ldxdw r1, [r10 - 0x330]
05ec00: ldxdw r2, [r10 - 0x338]
05ec08: ldxdw r3, [r2 + 0x0]
05ec10: add64 r3, -0x1
05ec18: stxdw [r2 + 0x0], r3
05ec20: jne r3, 0x0, +0x3 ; branch 0x5ec40
05ec28: ldxdw r3, [r2 + 0x8]
05ec30: add64 r3, -0x1
05ec38: stxdw [r2 + 0x8], r3
05ec40: ldxdw r2, [r1 + 0x0]
05ec48: add64 r2, -0x1
05ec50: stxdw [r1 + 0x0], r2
05ec58: jne r2, 0x0, -0x2c7 ; branch 0x5d628
05ec60: ja -0x2cb ; branch 0x5d610
05ec68: ldxdw r3, [r10 - 0xab0]
05ec70: stb [r3 + 0xa1], 0x1
05ec78: ldxdw r1, [r10 - 0xaa8]
05ec80: ldxdw r1, [r1 + 0x58]
05ec88: ldxdw r1, [r1 + 0x0]
05ec90: ldxdw r2, [r1 + 0x18]
05ec98: stxdw [r10 - 0x460], r2
05eca0: ldxdw r2, [r1 + 0x10]
05eca8: stxdw [r10 - 0x468], r2
05ecb0: ldxdw r2, [r1 + 0x8]
05ecb8: stxdw [r10 - 0x470], r2
05ecc0: ldxdw r1, [r1 + 0x0]
05ecc8: stxdw [r10 - 0x478], r1
05ecd0: ldxdw r1, [r10 - 0xa50]
05ecd8: ldxdw r1, [r1 + 0x0]
05ece0: ldxdw r1, [r1 + 0x0]
05ece8: ldxdw r2, [r1 + 0x18]
05ecf0: stxdw [r10 - 0x480], r2
05ecf8: ldxdw r2, [r1 + 0x10]
05ed00: stxdw [r10 - 0x488], r2
05ed08: ldxdw r2, [r1 + 0x8]
05ed10: stxdw [r10 - 0x490], r2
05ed18: ldxdw r1, [r1 + 0x0]
05ed20: stxdw [r10 - 0x498], r1
05ed28: stxdw [r10 - 0xab0], r3
05ed30: ldxdw r1, [r3 + 0x0]
05ed38: ldxdw r1, [r1 + 0x0]
05ed40: ldxdw r2, [r1 + 0x18]
05ed48: stxdw [r10 - 0x440], r2
05ed50: ldxdw r2, [r1 + 0x10]
05ed58: stxdw [r10 - 0x448], r2
05ed60: ldxdw r2, [r1 + 0x8]
05ed68: stxdw [r10 - 0x450], r2
05ed70: ldxdw r1, [r1 + 0x0]
05ed78: stxdw [r10 - 0x458], r1
05ed80: ldxdw r2, [r10 - 0xaa0]
05ed88: ldxdw r1, [r2 + 0x18]
05ed90: stxdw [r10 - 0x420], r1
05ed98: ldxdw r1, [r2 + 0x10]
05eda0: stxdw [r10 - 0x428], r1
05eda8: ldxdw r1, [r2 + 0x8]
05edb0: stxdw [r10 - 0x430], r1
05edb8: ldxdw r1, [r2 + 0x0]
05edc0: stxdw [r10 - 0x438], r1
05edc8: stxdw [r10 - 0x418], r9
05edd0: mov64 r1, r10
05edd8: add64 r1, -0x260
05ede0: mov64 r7, r10
05ede8: add64 r7, -0x498
05edf0: mov64 r2, r7
05edf8: call 0x2097d ; direct target 0x1639e8
05ee00: ldxdw r1, [r10 - 0x250]
05ee08: stxdw [r10 - 0x338], r1
05ee10: ldxdw r1, [r10 - 0x258]
05ee18: stxdw [r10 - 0x340], r1
05ee20: mov64 r1, r10
05ee28: add64 r1, -0x340
05ee30: mov64 r2, 0x1
05ee38: call 0x282d7 ; direct target 0x1a04f8
05ee40: mov64 r8, r10
05ee48: add64 r8, -0x410
05ee50: mov64 r1, r8
05ee58: ldxdw r2, [r10 - 0xa48]
05ee60: call -0x9c3e ; direct target 0x10c78
05ee68: mov64 r1, r10
05ee70: add64 r1, -0x3e0
05ee78: mov64 r2, r7
05ee80: call 0x2096c ; direct target 0x1639e8
05ee88: lddw r1, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05ee98: lddw r2, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05eea8: add64 r2, 0x8
05eeb0: stxdw [r10 - 0x3a0], r2
05eeb8: stxdw [r10 - 0x3a8], r1
05eec0: ldxdw r1, [r10 - 0x3e0]
05eec8: stxdw [r10 - 0x3b8], r1
05eed0: ldxdw r1, [r10 - 0x3d8]
05eed8: stxdw [r10 - 0x3c0], r1
05eee0: stxdw [r10 - 0x3c8], r1
05eee8: ldxdw r2, [r10 - 0x3d0]
05eef0: add64 r1, r2
05eef8: stxdw [r10 - 0x3b0], r1
05ef00: mov64 r1, r10
05ef08: add64 r1, -0xa8
05ef10: mov64 r2, r10
05ef18: add64 r2, -0x3c8
05ef20: call -0x9888 ; direct target 0x12ae8
05ef28: ldxdw r7, [r10 - 0xa0]
05ef30: ldxdw r1, [r10 - 0x98]
05ef38: stxdw [r10 - 0xa78], r1
05ef40: mov64 r1, 0x22
05ef48: mov64 r2, 0x1
05ef50: call -0xa353 ; direct target 0xd4c0
05ef58: ldxdw r1, [r10 - 0x410]
05ef60: ldxdw r2, [r1 + 0x18]
05ef68: ldxdw r3, [r1 + 0x10]
05ef70: ldxdw r4, [r1 + 0x8]
05ef78: ldxdw r1, [r1 + 0x0]
05ef80: stxdw [r0 + 0x0], r1
05ef88: stxdw [r0 + 0x8], r4
05ef90: stxdw [r0 + 0x10], r3
05ef98: stxdw [r0 + 0x18], r2
05efa0: sth [r0 + 0x20], 0x1
05efa8: stxdw [r10 - 0x338], r0
05efb0: stdw [r10 - 0x340], 0x1
05efb8: stdw [r10 - 0x330], 0x1
05efc0: mov64 r6, r10
05efc8: add64 r6, -0x260
05efd0: mov64 r5, r10
05efd8: add64 r5, -0x340
05efe0: mov64 r1, r6
05efe8: lddw r2, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
05eff8: mov64 r3, r7
05f000: ldxdw r4, [r10 - 0xa78]
05f008: call 0x2911a ; direct target 0x1a78e0
05f010: mov64 r7, r10
05f018: add64 r7, -0x340
05f020: mov64 r1, r7
05f028: mov64 r2, r8
05f030: mov64 r3, 0x30
05f038: call 0x2a8ba ; direct target 0x1b3610
05f040: mov64 r1, r10
05f048: add64 r1, -0x380
05f050: stxdw [r10 - 0x78], r1
05f058: mov64 r1, r10
05f060: add64 r1, -0x158
05f068: stxdw [r10 - 0x370], r1
05f070: lddw r1, 0x1b6807 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'__event_authorityanchor:idlprograms/pump/src/buy.rsbonding-curveprograms/pump/src/buy_v2.rsbuybuy_ex'
05f080: stxdw [r10 - 0x380], r1
05f088: ldxdw r1, [r10 - 0xa58]
05f090: stxb [r10 - 0x158], r1
05f098: stdw [r10 - 0x70], 0x2
05f0a0: stdw [r10 - 0x368], 0x1
05f0a8: stdw [r10 - 0x378], 0x11
05f0b0: mov64 r1, r10
05f0b8: add64 r1, -0x78
05f0c0: stxdw [r10 - 0x1000], r1
05f0c8: stdw [r10 - 0xff8], 0x1
05f0d0: mov64 r1, r10
05f0d8: add64 r1, -0x398
05f0e0: mov64 r5, r10
05f0e8: mov64 r2, r6
05f0f0: mov64 r3, r7
05f0f8: mov64 r4, 0x1
05f100: call 0x28285 ; direct target 0x1a0530
05f108: lddw r1, -0x7fffffffffffffe6
05f118: ldxdw r2, [r10 - 0x398]
05f120: jne r2, r1, +0xae ; branch 0x5f698
05f128: ldxdw r1, [r10 - 0x330]
05f130: ldxdw r2, [r10 - 0x338]
05f138: ldxdw r3, [r2 + 0x0]
05f140: add64 r3, -0x1
05f148: stxdw [r2 + 0x0], r3
05f150: jne r3, 0x0, +0x3 ; branch 0x5f170
05f158: ldxdw r3, [r2 + 0x8]
05f160: add64 r3, -0x1
05f168: stxdw [r2 + 0x8], r3
05f170: ldxdw r2, [r1 + 0x0]
05f178: add64 r2, -0x1
05f180: stxdw [r1 + 0x0], r2
05f188: jne r2, 0x0, +0x3 ; branch 0x5f1a8
05f190: ldxdw r2, [r1 + 0x8]
05f198: add64 r2, -0x1
05f1a0: stxdw [r1 + 0x8], r2
05f1a8: ldxdw r1, [r10 - 0xa98]
05f1b0: jeq r1, 0x0, -0xe2 ; branch 0x5eaa8
05f1b8: ldxdw r1, [r10 - 0xb30]
05f1c0: stxdw [r10 - 0x378], r1
05f1c8: ldxdw r1, [r10 - 0xb10]
05f1d0: stxdw [r10 - 0x380], r1
05f1d8: ldxdw r1, [r10 - 0x700]
05f1e0: stxdw [r10 - 0x370], r1
05f1e8: ldxdw r1, [r10 - 0x6f8]
05f1f0: stxdw [r10 - 0x368], r1
05f1f8: ldxdw r1, [r10 - 0xb08]
05f200: stxdw [r10 - 0x358], r1
05f208: ldxdw r1, [r10 - 0xac8]
05f210: stxdw [r10 - 0x360], r1
05f218: ldxdw r1, [r10 - 0x710]
05f220: stxdw [r10 - 0x350], r1
05f228: ldxdw r1, [r10 - 0x708]
05f230: stxdw [r10 - 0x348], r1
05f238: ldxdw r1, [r10 - 0xa50]
05f240: ldxdw r1, [r1 + 0x0]
05f248: ldxdw r1, [r1 + 0x0]
05f250: ldxdw r2, [r1 + 0x18]
05f258: stxdw [r10 - 0x160], r2
05f260: ldxdw r2, [r1 + 0x10]
05f268: stxdw [r10 - 0x168], r2
05f270: ldxdw r2, [r1 + 0x8]
05f278: stxdw [r10 - 0x170], r2
05f280: ldxdw r1, [r1 + 0x0]
05f288: stxdw [r10 - 0x178], r1
05f290: ldxdw r1, [r10 - 0xaa8]
05f298: ldxdw r1, [r1 + 0x58]
05f2a0: ldxdw r1, [r1 + 0x0]
05f2a8: ldxdw r2, [r1 + 0x18]
05f2b0: stxdw [r10 - 0x140], r2
05f2b8: ldxdw r2, [r1 + 0x10]
05f2c0: stxdw [r10 - 0x148], r2
05f2c8: ldxdw r2, [r1 + 0x8]
05f2d0: stxdw [r10 - 0x150], r2
05f2d8: ldxdw r1, [r1 + 0x0]
05f2e0: stxdw [r10 - 0x158], r1
05f2e8: ldxdw r1, [r10 - 0xab0]
05f2f0: ldxdw r1, [r1 + 0x0]
05f2f8: ldxdw r1, [r1 + 0x0]
05f300: ldxdw r2, [r1 + 0x18]
05f308: stxdw [r10 - 0x60], r2
05f310: ldxdw r2, [r1 + 0x10]
05f318: stxdw [r10 - 0x68], r2
05f320: ldxdw r2, [r1 + 0x8]
05f328: stxdw [r10 - 0x70], r2
05f330: ldxdw r1, [r1 + 0x0]
05f338: stxdw [r10 - 0x78], r1
05f340: ldxdw r6, [r10 - 0xaa0]
05f348: ldxdw r1, [r6 + 0x18]
05f350: stxdw [r10 - 0x90], r1
05f358: ldxdw r1, [r6 + 0x10]
05f360: stxdw [r10 - 0x98], r1
05f368: ldxdw r1, [r6 + 0x8]
05f370: stxdw [r10 - 0xa0], r1
05f378: ldxdw r1, [r6 + 0x0]
05f380: stxdw [r10 - 0xa8], r1
05f388: stxdw [r10 - 0xff0], r9
05f390: ldxdw r1, [r10 - 0xad0]
05f398: stxdw [r10 - 0xfe8], r1
05f3a0: mov64 r1, r10
05f3a8: add64 r1, -0xa8
05f3b0: stxdw [r10 - 0xff8], r1
05f3b8: mov64 r1, r10
05f3c0: add64 r1, -0x78
05f3c8: stxdw [r10 - 0x1000], r1
05f3d0: mov64 r1, r10
05f3d8: add64 r1, -0x260
05f3e0: mov64 r2, r10
05f3e8: add64 r2, -0x380
05f3f0: mov64 r3, r10
05f3f8: add64 r3, -0x178
05f400: mov64 r4, r10
05f408: add64 r4, -0x158
05f410: mov64 r5, r10
05f418: call 0x44d0 ; direct target 0x81aa0
05f420: ldxdw r7, [r10 - 0x250]
05f428: ldxdw r6, [r10 - 0x258]
05f430: ldxdw r1, [r10 - 0x260]
05f438: jeq r1, 0x0, +0x64 ; branch 0x5f760
05f440: ldxdw r1, [r10 - 0xa60]
05f448: stxdw [r1 + 0x8], r7
05f450: stxdw [r1 + 0x0], r6
05f458: stb [r1 + 0x5a], 0x2
05f460: ldxdw r3, [r10 - 0x7c0]
05f468: ja -0x64b ; branch 0x5c218
05f470: ldxdw r1, [r10 - 0xaa8]
05f478: ldxdw r1, [r1 + 0x58]
05f480: ldxdw r1, [r1 + 0x0]
05f488: ldxdw r2, [r1 + 0x18]
05f490: stxdw [r10 - 0x38], r2
05f498: ldxdw r2, [r1 + 0x10]
05f4a0: stxdw [r10 - 0x40], r2
05f4a8: ldxdw r2, [r1 + 0x8]
05f4b0: stxdw [r10 - 0x48], r2
05f4b8: ldxdw r1, [r1 + 0x0]
05f4c0: stxdw [r10 - 0x50], r1
05f4c8: ldxdw r1, [r10 - 0xae8]
05f4d0: stxdw [r10 - 0xa40], r1
05f4d8: ldxdw r1, [r10 - 0xa40]
05f4e0: ldxdw r2, [r1 + 0x0]
05f4e8: mov64 r6, r10
05f4f0: add64 r6, -0x30
05f4f8: mov64 r1, r6
05f500: call -0x9d12 ; direct target 0x10c78
05f508: ldxdw r2, [r10 - 0x38]
05f510: ldxdw r1, [r10 - 0xa60]
05f518: stxdw [r1 + 0x18], r2
05f520: ldxdw r2, [r10 - 0x40]
05f528: stxdw [r1 + 0x10], r2
05f530: ldxdw r2, [r10 - 0x48]
05f538: stxdw [r1 + 0x8], r2
05f540: ldxdw r2, [r10 - 0x50]
05f548: stxdw [r1 + 0x0], r2
05f550: ldxdw r2, [r10 - 0xa80]
05f558: stxdw [r1 + 0x28], r2
05f560: ldxdw r2, [r10 - 0xa70]
05f568: stxdw [r1 + 0x20], r2
05f570: add64 r1, 0x30
05f578: mov64 r2, r6
05f580: mov64 r3, 0x30
05f588: call 0x2a810 ; direct target 0x1b3610
05f590: ldxdw r1, [r10 - 0x7b8]
05f598: ldxdw r2, [r10 - 0x7c0]
05f5a0: ldxdw r3, [r2 + 0x0]
05f5a8: add64 r3, -0x1
05f5b0: stxdw [r2 + 0x0], r3
05f5b8: jne r3, 0x0, +0x3 ; branch 0x5f5d8
05f5c0: ldxdw r3, [r2 + 0x8]
05f5c8: add64 r3, -0x1
05f5d0: stxdw [r2 + 0x8], r3
05f5d8: ldxdw r2, [r1 + 0x0]
05f5e0: add64 r2, -0x1
05f5e8: stxdw [r1 + 0x0], r2
05f5f0: jne r2, 0x0, +0x3 ; branch 0x5f610
05f5f8: ldxdw r2, [r1 + 0x8]
05f600: add64 r2, -0x1
05f608: stxdw [r1 + 0x8], r2
05f610: ldxdw r1, [r10 - 0x7e8]
05f618: ldxdw r2, [r10 - 0x7f0]
05f620: ldxdw r3, [r2 + 0x0]
05f628: add64 r3, -0x1
05f630: stxdw [r2 + 0x0], r3
05f638: jne r3, 0x0, +0x3 ; branch 0x5f658
05f640: ldxdw r3, [r2 + 0x8]
05f648: add64 r3, -0x1
05f650: stxdw [r2 + 0x8], r3
05f658: ldxdw r2, [r1 + 0x0]
05f660: add64 r2, -0x1
05f668: stxdw [r1 + 0x0], r2
05f670: jne r2, 0x0, -0x7e2 ; branch 0x5b768
05f678: ldxdw r2, [r1 + 0x8]
05f680: add64 r2, -0x1
05f688: stxdw [r1 + 0x8], r2
05f690: ja -0x7e6 ; branch 0x5b768
05f698: mov64 r1, r10
05f6a0: add64 r1, -0x9b8
05f6a8: mov64 r2, r10
05f6b0: add64 r2, -0x398
05f6b8: call 0x2789f ; direct target 0x19bbb8
05f6c0: ldxdw r1, [r10 - 0x9b8]
05f6c8: ldxdw r2, [r10 - 0x9b0]
05f6d0: ldxdw r3, [r10 - 0xa60]
05f6d8: stxdw [r3 + 0x8], r2
05f6e0: stxdw [r3 + 0x0], r1
05f6e8: stb [r3 + 0x5a], 0x2
05f6f0: ldxdw r1, [r10 - 0x330]
05f6f8: ldxdw r2, [r10 - 0x338]
05f700: ldxdw r3, [r2 + 0x0]
05f708: add64 r3, -0x1
05f710: stxdw [r2 + 0x0], r3
05f718: jne r3, 0x0, +0x3 ; branch 0x5f738
05f720: ldxdw r3, [r2 + 0x8]
05f728: add64 r3, -0x1
05f730: stxdw [r2 + 0x8], r3
05f738: ldxdw r2, [r1 + 0x0]
05f740: add64 r2, -0x1
05f748: stxdw [r1 + 0x0], r2
05f750: jne r2, 0x0, -0x426 ; branch 0x5d628
05f758: ja -0x42a ; branch 0x5d610
05f760: mov64 r1, r10
05f768: add64 r1, -0x330
05f770: mov64 r2, r10
05f778: add64 r2, -0x248
05f780: mov64 r3, 0xd0
05f788: call 0x2a7d0 ; direct target 0x1b3610
05f790: stxdw [r10 - 0x338], r7
05f798: stxdw [r10 - 0x340], r6
05f7a0: mov64 r1, r10
05f7a8: add64 r1, -0x260
05f7b0: mov64 r7, r10
05f7b8: add64 r7, -0x340
05f7c0: mov64 r2, r7
05f7c8: call 0x20884 ; direct target 0x163bf0
05f7d0: ldxdw r1, [r10 - 0x250]
05f7d8: stxdw [r10 - 0xa0], r1
05f7e0: ldxdw r1, [r10 - 0x258]
05f7e8: stxdw [r10 - 0xa8], r1
05f7f0: mov64 r1, r10
05f7f8: add64 r1, -0xa8
05f800: mov64 r2, 0x1
05f808: call 0x2819d ; direct target 0x1a04f8
05f810: mov64 r8, r10
05f818: add64 r8, -0x138
05f820: mov64 r1, r8
05f828: ldxdw r2, [r10 - 0xa48]
05f830: call -0x9d78 ; direct target 0x10c78
05f838: mov64 r1, r10
05f840: add64 r1, -0x108
05f848: mov64 r2, r7
05f850: call 0x20873 ; direct target 0x163bf0
05f858: lddw r1, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05f868: lddw r2, 0x1b64bf ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xe4E\xa5.Q\xcb\x9a\x1d\xca*\xf6+\x8e\xbe\x1e\xffDeadlock\xa7\xe8\xe8\xb1\xc8lr\x7fdeadlocklamports\x17\xb7\xf87`\xd8\xac`CpiGuardend_timePermanentDelegateNonTransfer'
05f878: add64 r2, 0x8
05f880: stxdw [r10 - 0xc8], r2
05f888: stxdw [r10 - 0xd0], r1
05f890: ldxdw r1, [r10 - 0x108]
05f898: stxdw [r10 - 0xe0], r1
05f8a0: ldxdw r1, [r10 - 0x100]
05f8a8: stxdw [r10 - 0xe8], r1
05f8b0: stxdw [r10 - 0xf0], r1
05f8b8: ldxdw r2, [r10 - 0xf8]
05f8c0: add64 r1, r2
05f8c8: stxdw [r10 - 0xd8], r1
05f8d0: mov64 r1, r10
05f8d8: add64 r1, -0x158
05f8e0: mov64 r2, r10
05f8e8: add64 r2, -0xf0
05f8f0: call -0x99c2 ; direct target 0x12ae8
05f8f8: ldxdw r6, [r10 - 0x150]
05f900: ldxdw r9, [r10 - 0x148]
05f908: mov64 r1, 0x22
05f910: mov64 r2, 0x1
05f918: call -0xa48c ; direct target 0xd4c0
05f920: ldxdw r1, [r10 - 0x138]
05f928: ldxdw r2, [r1 + 0x18]
05f930: ldxdw r3, [r1 + 0x10]
05f938: ldxdw r4, [r1 + 0x8]
05f940: ldxdw r1, [r1 + 0x0]
05f948: stxdw [r0 + 0x0], r1
05f950: stxdw [r0 + 0x8], r4
05f958: stxdw [r0 + 0x10], r3
05f960: stxdw [r0 + 0x18], r2
05f968: sth [r0 + 0x20], 0x1
05f970: stxdw [r10 - 0xa0], r0
05f978: stdw [r10 - 0xa8], 0x1
05f980: stdw [r10 - 0x98], 0x1
05f988: mov64 r7, r10
05f990: add64 r7, -0x260
05f998: mov64 r5, r10
05f9a0: add64 r5, -0xa8
05f9a8: mov64 r1, r7
05f9b0: lddw r2, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
05f9c0: mov64 r3, r6
05f9c8: mov64 r4, r9
05f9d0: call 0x28fe1 ; direct target 0x1a78e0
05f9d8: mov64 r6, r10
05f9e0: add64 r6, -0xa8
05f9e8: mov64 r1, r6
05f9f0: mov64 r2, r8
05f9f8: mov64 r3, 0x30
05fa00: call 0x2a781 ; direct target 0x1b3610
05fa08: mov64 r1, r10
05fa10: add64 r1, -0x78
05fa18: stxdw [r10 - 0x178], r1
05fa20: mov64 r1, r10
05fa28: add64 r1, -0x51
05fa30: stxdw [r10 - 0x68], r1
05fa38: lddw r1, 0x1b6807 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'__event_authorityanchor:idlprograms/pump/src/buy.rsbonding-curveprograms/pump/src/buy_v2.rsbuybuy_ex'
05fa48: stxdw [r10 - 0x78], r1
05fa50: ldxdw r1, [r10 - 0xa58]
05fa58: stxb [r10 - 0x51], r1
05fa60: stdw [r10 - 0x170], 0x2
05fa68: stdw [r10 - 0x60], 0x1
05fa70: stdw [r10 - 0x70], 0x11
05fa78: mov64 r1, r10
05fa80: add64 r1, -0x178
05fa88: stxdw [r10 - 0x1000], r1
05fa90: stdw [r10 - 0xff8], 0x1
05fa98: mov64 r1, r10
05faa0: add64 r1, -0xc0
05faa8: mov64 r5, r10
05fab0: mov64 r2, r7
05fab8: mov64 r3, r6
05fac0: mov64 r4, 0x1
05fac8: call 0x2814c ; direct target 0x1a0530
05fad0: lddw r1, -0x7fffffffffffffe6
05fae0: ldxdw r2, [r10 - 0xc0]
05fae8: jeq r2, r1, +0x1 ; branch 0x5faf8
05faf0: ja +0x11 ; branch 0x5fb80
05faf8: ldxdw r1, [r10 - 0x98]
05fb00: ldxdw r2, [r10 - 0xa0]
05fb08: ldxdw r3, [r2 + 0x0]
05fb10: add64 r3, -0x1
05fb18: stxdw [r2 + 0x0], r3
05fb20: jne r3, 0x0, +0x3 ; branch 0x5fb40
05fb28: ldxdw r3, [r2 + 0x8]
05fb30: add64 r3, -0x1
05fb38: stxdw [r2 + 0x8], r3
05fb40: ldxdw r2, [r1 + 0x0]
05fb48: add64 r2, -0x1
05fb50: stxdw [r1 + 0x0], r2
05fb58: jne r2, 0x0, -0x217 ; branch 0x5eaa8
05fb60: ldxdw r2, [r1 + 0x8]
05fb68: add64 r2, -0x1
05fb70: stxdw [r1 + 0x8], r2
05fb78: ja -0x21b ; branch 0x5eaa8
05fb80: mov64 r1, r10
05fb88: add64 r1, -0x9c8
05fb90: mov64 r2, r10
05fb98: add64 r2, -0xc0
05fba0: call 0x27802 ; direct target 0x19bbb8
05fba8: ldxdw r1, [r10 - 0x9c8]
05fbb0: ldxdw r2, [r10 - 0x9c0]
05fbb8: ldxdw r3, [r10 - 0xa60]
05fbc0: stxdw [r3 + 0x8], r2
05fbc8: stxdw [r3 + 0x0], r1
05fbd0: stb [r3 + 0x5a], 0x2
05fbd8: ldxdw r1, [r10 - 0x98]
05fbe0: ldxdw r2, [r10 - 0xa0]
05fbe8: ldxdw r3, [r2 + 0x0]
05fbf0: add64 r3, -0x1
05fbf8: stxdw [r2 + 0x0], r3
05fc00: jne r3, 0x0, +0x3 ; branch 0x5fc20
05fc08: ldxdw r3, [r2 + 0x8]
05fc10: add64 r3, -0x1
05fc18: stxdw [r2 + 0x8], r3
05fc20: ldxdw r2, [r1 + 0x0]
05fc28: add64 r2, -0x1
05fc30: stxdw [r1 + 0x0], r2
05fc38: jne r2, 0x0, -0x4c3 ; branch 0x5d628
05fc40: ja -0x4c7 ; branch 0x5d610
