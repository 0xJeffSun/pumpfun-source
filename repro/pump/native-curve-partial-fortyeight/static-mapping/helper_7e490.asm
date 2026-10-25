07e490: mov64 r9, r3
07e498: mov64 r7, r1
07e4a0: jne r4, 0x0, +0x2e ; branch 0x7e618
07e4a8: stxdw [r10 - 0x2a0], r7
07e4b0: stxdw [r10 - 0x2a8], r2
07e4b8: ldxdw r7, [r5 - 0xff8]
07e4c0: ldxdw r6, [r5 - 0x1000]
07e4c8: ldxdw r8, [r9 + 0x18]
07e4d0: mov64 r1, r8
07e4d8: mov64 r2, r7
07e4e0: mov64 r3, 0x20
07e4e8: call 0x26a31 ; direct target 0x1b3678
07e4f0: lsh64 r0, 0x20
07e4f8: rsh64 r0, 0x20
07e500: jeq r0, 0x0, +0x66 ; branch 0x7e838
07e508: mov64 r1, r10
07e510: add64 r1, -0x208
07e518: lddw r2, 0x1b5f1c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de'
07e528: call 0x1b1ca ; direct target 0x157380
07e530: stdw [r10 - 0x38], 0x0
07e538: stdw [r10 - 0x40], 0x1
07e540: stdw [r10 - 0x48], 0x0
07e548: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
07e558: stxdw [r10 - 0x1b0], r1
07e560: mov64 r1, r10
07e568: add64 r1, -0x48
07e570: stxdw [r10 - 0x1b8], r1
07e578: stb [r10 - 0x1a0], 0x3
07e580: stdw [r10 - 0x1a8], 0x20
07e588: stdw [r10 - 0x1c8], 0x0
07e590: stdw [r10 - 0x1d8], 0x0
07e598: mov64 r2, r10
07e5a0: add64 r2, -0x1d8
07e5a8: lddw r1, 0x1b5f1c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de'
07e5b8: call 0x1bf19 ; direct target 0x15de88
07e5c0: jeq r0, 0x0, +0x1b ; branch 0x7e6a0
07e5c8: mov64 r3, r10
07e5d0: add64 r3, -0x1
07e5d8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
07e5e8: mov64 r2, 0x37
07e5f0: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
07e600: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
07e610: call 0x25d00 ; direct target 0x1ace18
07e618: ldxdw r1, [r9 + 0x0]
07e620: ldxdw r3, [r1 + 0x18]
07e628: stxdw [r10 - 0x110], r3
07e630: ldxdw r3, [r1 + 0x10]
07e638: stxdw [r10 - 0x118], r3
07e640: ldxdw r3, [r1 + 0x8]
07e648: stxdw [r10 - 0x120], r3
07e650: ldxdw r1, [r1 + 0x0]
07e658: stxdw [r10 - 0x128], r1
07e660: mov64 r1, r10
07e668: add64 r1, -0x298
07e670: mov64 r3, r10
07e678: add64 r3, -0x128
07e680: call 0x33b6 ; direct target 0x98438
07e688: ldxdw r6, [r10 - 0x290]
07e690: ldxdw r8, [r10 - 0x298]
07e698: ja +0x8f ; branch 0x7eb18
07e6a0: ldxdw r1, [r10 - 0x38]
07e6a8: stxdw [r10 - 0xe0], r1
07e6b0: ldxdw r1, [r10 - 0x40]
07e6b8: stxdw [r10 - 0xe8], r1
07e6c0: ldxdw r1, [r10 - 0x48]
07e6c8: stxdw [r10 - 0xf0], r1
07e6d0: ldxdw r1, [r10 - 0x208]
07e6d8: stxdw [r10 - 0x108], r1
07e6e0: ldxdw r1, [r10 - 0x200]
07e6e8: stxdw [r10 - 0x100], r1
07e6f0: ldxdw r1, [r10 - 0x1f8]
07e6f8: stxdw [r10 - 0xf8], r1
07e700: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
07e710: stxdw [r10 - 0x120], r1
07e718: stw [r10 - 0x90], 0x177a
07e720: stb [r10 - 0xd8], 0x2
07e728: stw [r10 - 0x110], 0xac
07e730: stdw [r10 - 0x118], 0x1d
07e738: stdw [r10 - 0x128], 0x0
07e740: mov64 r1, r10
07e748: add64 r1, -0x218
07e750: mov64 r2, r10
07e758: add64 r2, -0x128
07e760: call 0x23a79 ; direct target 0x19bb30
07e768: ldxdw r3, [r10 - 0x210]
07e770: ldxdw r2, [r10 - 0x218]
07e778: ldxdw r1, [r8 + 0x18]
07e780: stxdw [r10 - 0x110], r1
07e788: ldxdw r1, [r8 + 0x10]
07e790: stxdw [r10 - 0x118], r1
07e798: ldxdw r1, [r8 + 0x8]
07e7a0: stxdw [r10 - 0x120], r1
07e7a8: ldxdw r1, [r8 + 0x0]
07e7b0: stxdw [r10 - 0x128], r1
07e7b8: ldxdw r1, [r7 + 0x0]
07e7c0: stxdw [r10 - 0x108], r1
07e7c8: ldxdw r1, [r7 + 0x8]
07e7d0: stxdw [r10 - 0x100], r1
07e7d8: ldxdw r1, [r7 + 0x10]
07e7e0: stxdw [r10 - 0xf8], r1
07e7e8: ldxdw r1, [r7 + 0x18]
07e7f0: stxdw [r10 - 0xf0], r1
07e7f8: mov64 r1, r10
07e800: add64 r1, -0x228
07e808: mov64 r4, r10
07e810: add64 r4, -0x128
07e818: call 0x23b33 ; direct target 0x19c1b8
07e820: ldxdw r6, [r10 - 0x220]
07e828: ldxdw r8, [r10 - 0x228]
07e830: ja +0x5b ; branch 0x7eb10
07e838: mov64 r1, r10
07e840: add64 r1, -0x128
07e848: mov64 r2, r9
07e850: call 0x2488a ; direct target 0x1a2ca8
07e858: ldxdw r4, [r10 - 0x118]
07e860: ldxdw r1, [r10 - 0x120]
07e868: ldxdw r2, [r10 - 0x128]
07e870: lddw r3, -0x7fffffffffffffe6
07e880: jeq r2, r3, +0x1 ; branch 0x7e890
07e888: ja +0x46 ; branch 0x7eac0
07e890: stxdw [r10 - 0x2b0], r4
07e898: stxdw [r10 - 0x2b8], r6
07e8a0: ldxdw r2, [r1 + 0x0]
07e8a8: ldxdw r1, [r1 + 0x8]
07e8b0: stxdw [r10 - 0x1e0], r1
07e8b8: stxdw [r10 - 0x1e8], r2
07e8c0: mov64 r1, r10
07e8c8: add64 r1, -0x128
07e8d0: mov64 r2, r10
07e8d8: add64 r2, -0x1e8
07e8e0: call 0x20ebd ; direct target 0x185ed0
07e8e8: ldxdw r6, [r10 - 0x120]
07e8f0: ldxdw r8, [r10 - 0x128]
07e8f8: ldxw r1, [r10 - 0xa0]
07e900: jeq r1, 0x2, +0x77 ; branch 0x7ecc0
07e908: stxdw [r10 - 0x2c0], r1
07e910: mov64 r1, r10
07e918: add64 r1, -0x1c8
07e920: mov64 r2, r10
07e928: add64 r2, -0x118
07e930: mov64 r3, 0x78
07e938: call 0x2699a ; direct target 0x1b3610
07e940: ldxdw r1, [r10 - 0x9c]
07e948: stxdw [r10 - 0x14c], r1
07e950: ldxdw r1, [r10 - 0x94]
07e958: stxdw [r10 - 0x144], r1
07e960: ldxdw r1, [r10 - 0x8c]
07e968: stxdw [r10 - 0x13c], r1
07e970: ldxdw r1, [r10 - 0x84]
07e978: stxdw [r10 - 0x134], r1
07e980: ldxw r1, [r10 - 0x7c]
07e988: stxw [r10 - 0x12c], r1
07e990: ldxdw r1, [r10 - 0x2c0]
07e998: stxw [r10 - 0x150], r1
07e9a0: stxdw [r10 - 0x1d0], r6
07e9a8: stxdw [r10 - 0x1d8], r8
07e9b0: mov64 r1, r10
07e9b8: add64 r1, -0x1d8
07e9c0: ldxdw r6, [r10 - 0x2b8]
07e9c8: mov64 r2, r6
07e9d0: mov64 r3, 0x20
07e9d8: call 0x26993 ; direct target 0x1b3678
07e9e0: lsh64 r0, 0x20
07e9e8: rsh64 r0, 0x20
07e9f0: jeq r0, 0x0, +0x5f ; branch 0x7ecf0
07e9f8: mov64 r1, r10
07ea00: add64 r1, -0x78
07ea08: lddw r2, 0x1b5db4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x00'
07ea18: call 0x1b12c ; direct target 0x157380
07ea20: stdw [r10 - 0x50], 0x0
07ea28: stdw [r10 - 0x58], 0x1
07ea30: stdw [r10 - 0x60], 0x0
07ea38: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
07ea48: stxdw [r10 - 0x20], r1
07ea50: mov64 r1, r10
07ea58: add64 r1, -0x60
07ea60: stxdw [r10 - 0x28], r1
07ea68: stb [r10 - 0x10], 0x3
07ea70: stdw [r10 - 0x18], 0x20
07ea78: stdw [r10 - 0x38], 0x0
07ea80: stdw [r10 - 0x48], 0x0
07ea88: mov64 r2, r10
07ea90: add64 r2, -0x48
07ea98: lddw r1, 0x1b5db4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x00'
07eaa8: call 0x1be7b ; direct target 0x15de88
07eab0: jeq r0, 0x0, +0xf ; branch 0x7eb30
07eab8: ja -0x9f ; branch 0x7e5c8
07eac0: stxdw [r10 - 0x118], r4
07eac8: stxdw [r10 - 0x120], r1
07ead0: stxdw [r10 - 0x128], r2
07ead8: mov64 r1, r10
07eae0: add64 r1, -0x238
07eae8: mov64 r2, r10
07eaf0: add64 r2, -0x128
07eaf8: call 0x23a17 ; direct target 0x19bbb8
07eb00: ldxdw r6, [r10 - 0x230]
07eb08: ldxdw r8, [r10 - 0x238]
07eb10: ldxdw r7, [r10 - 0x2a0]
07eb18: stxdw [r7 + 0x8], r6
07eb20: stxdw [r7 + 0x0], r8
07eb28: exit
07eb30: ldxdw r1, [r10 - 0x50]
07eb38: stxdw [r10 - 0xe0], r1
07eb40: ldxdw r1, [r10 - 0x58]
07eb48: stxdw [r10 - 0xe8], r1
07eb50: ldxdw r1, [r10 - 0x60]
07eb58: stxdw [r10 - 0xf0], r1
07eb60: ldxdw r1, [r10 - 0x78]
07eb68: stxdw [r10 - 0x108], r1
07eb70: ldxdw r1, [r10 - 0x70]
07eb78: stxdw [r10 - 0x100], r1
07eb80: ldxdw r1, [r10 - 0x68]
07eb88: stxdw [r10 - 0xf8], r1
07eb90: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
07eba0: stxdw [r10 - 0x120], r1
07eba8: stw [r10 - 0x90], 0x1774
07ebb0: stb [r10 - 0xd8], 0x2
07ebb8: stw [r10 - 0x110], 0xb4
07ebc0: stdw [r10 - 0x118], 0x1d
07ebc8: stdw [r10 - 0x128], 0x0
07ebd0: mov64 r1, r10
07ebd8: add64 r1, -0x248
07ebe0: mov64 r2, r10
07ebe8: add64 r2, -0x128
07ebf0: call 0x239e7 ; direct target 0x19bb30
07ebf8: ldxdw r3, [r10 - 0x240]
07ec00: ldxdw r2, [r10 - 0x248]
07ec08: ldxdw r1, [r10 - 0x1c0]
07ec10: stxdw [r10 - 0x110], r1
07ec18: ldxdw r1, [r10 - 0x1c8]
07ec20: stxdw [r10 - 0x118], r1
07ec28: ldxdw r1, [r10 - 0x1d0]
07ec30: stxdw [r10 - 0x120], r1
07ec38: ldxdw r1, [r10 - 0x1d8]
07ec40: stxdw [r10 - 0x128], r1
07ec48: ldxdw r1, [r6 + 0x0]
07ec50: stxdw [r10 - 0x108], r1
07ec58: ldxdw r1, [r6 + 0x8]
07ec60: stxdw [r10 - 0x100], r1
07ec68: ldxdw r1, [r6 + 0x10]
07ec70: stxdw [r10 - 0xf8], r1
07ec78: ldxdw r1, [r6 + 0x18]
07ec80: stxdw [r10 - 0xf0], r1
07ec88: mov64 r1, r10
07ec90: add64 r1, -0x258
07ec98: mov64 r4, r10
07eca0: add64 r4, -0x128
07eca8: call 0x23aa1 ; direct target 0x19c1b8
07ecb0: ldxdw r6, [r10 - 0x250]
07ecb8: ldxdw r8, [r10 - 0x258]
07ecc0: ldxdw r7, [r10 - 0x2a0]
07ecc8: ldxdw r2, [r10 - 0x2b0]
07ecd0: ldxdw r1, [r2 + 0x0]
07ecd8: add64 r1, -0x1
07ece0: stxdw [r2 + 0x0], r1
07ece8: ja -0x3b ; branch 0x7eb18
07ecf0: ldxdw r1, [r10 - 0x1a0]
07ecf8: stxdw [r10 - 0x1f0], r1
07ed00: ldxdw r1, [r10 - 0x1a8]
07ed08: stxdw [r10 - 0x1f8], r1
07ed10: ldxdw r1, [r10 - 0x1b0]
07ed18: stxdw [r10 - 0x200], r1
07ed20: ldxdw r1, [r10 - 0x1b8]
07ed28: stxdw [r10 - 0x208], r1
07ed30: ldxdw r2, [r10 - 0x2b0]
07ed38: ldxdw r1, [r2 + 0x0]
07ed40: add64 r1, -0x1
07ed48: stxdw [r2 + 0x0], r1
07ed50: mov64 r1, r10
07ed58: add64 r1, -0x268
07ed60: mov64 r3, r10
07ed68: add64 r3, -0x208
07ed70: ldxdw r2, [r10 - 0x2a8]
07ed78: call 0x32d7 ; direct target 0x98438
07ed80: ldxdw r8, [r10 - 0x268]
07ed88: jeq r8, 0x2, +0x1 ; branch 0x7ed98
07ed90: ja +0x4b ; branch 0x7eff0
07ed98: mov64 r3, r6
07eda0: ldxdw r6, [r9 + 0x0]
07eda8: ldxdw r1, [r6 + 0x18]
07edb0: stxdw [r10 - 0x1c0], r1
07edb8: ldxdw r1, [r6 + 0x10]
07edc0: stxdw [r10 - 0x1c8], r1
07edc8: ldxdw r1, [r6 + 0x8]
07edd0: stxdw [r10 - 0x1d0], r1
07edd8: ldxdw r1, [r6 + 0x0]
07ede0: stxdw [r10 - 0x1d8], r1
07ede8: mov64 r8, r10
07edf0: add64 r8, -0x128
07edf8: mov64 r2, r10
07ee00: add64 r2, -0x208
07ee08: mov64 r1, r8
07ee10: mov64 r4, r7
07ee18: call 0x23478 ; direct target 0x1991e0
07ee20: mov64 r1, r10
07ee28: add64 r1, -0x1d8
07ee30: mov64 r2, r8
07ee38: mov64 r3, 0x20
07ee40: call 0x26906 ; direct target 0x1b3678
07ee48: lsh64 r0, 0x20
07ee50: rsh64 r0, 0x20
07ee58: jeq r0, 0x0, +0x34 ; branch 0x7f000
07ee60: mov64 r1, r10
07ee68: add64 r1, -0x108
07ee70: lddw r2, 0x1b5e9c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00k\x00\x00\x002\x00\x00\x00\x1d\x00\x00\x00l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00'
07ee80: call 0x23f15 ; direct target 0x19e730
07ee88: mov64 r1, r10
07ee90: add64 r1, -0xf0
07ee98: lddw r2, 0x1b5e9c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00k\x00\x00\x002\x00\x00\x00\x1d\x00\x00\x00l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00'
07eea8: call -0xe88a ; direct target 0xaa60
07eeb0: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
07eec0: stxdw [r10 - 0x120], r1
07eec8: stb [r10 - 0xd8], 0x2
07eed0: stw [r10 - 0x110], 0xbc
07eed8: stdw [r10 - 0x118], 0x1d
07eee0: stdw [r10 - 0x128], 0x0
07eee8: stw [r10 - 0x90], 0x7d6
07eef0: mov64 r1, r10
07eef8: add64 r1, -0x278
07ef00: mov64 r2, r10
07ef08: add64 r2, -0x128
07ef10: call 0x23983 ; direct target 0x19bb30
07ef18: ldxdw r8, [r10 - 0x270]
07ef20: ldxdw r9, [r10 - 0x278]
07ef28: ldxdw r1, [r6 + 0x18]
07ef30: stxdw [r10 - 0x110], r1
07ef38: ldxdw r1, [r6 + 0x10]
07ef40: stxdw [r10 - 0x118], r1
07ef48: ldxdw r1, [r6 + 0x8]
07ef50: stxdw [r10 - 0x120], r1
07ef58: ldxdw r1, [r6 + 0x0]
07ef60: stxdw [r10 - 0x128], r1
07ef68: mov64 r1, r10
07ef70: add64 r1, -0x108
07ef78: mov64 r2, r10
07ef80: add64 r2, -0x208
07ef88: ldxdw r3, [r10 - 0x2b8]
07ef90: mov64 r4, r7
07ef98: call 0x23448 ; direct target 0x1991e0
07efa0: mov64 r1, r10
07efa8: add64 r1, -0x288
07efb0: mov64 r4, r10
07efb8: add64 r4, -0x128
07efc0: mov64 r2, r9
07efc8: mov64 r3, r8
07efd0: call 0x23a3c ; direct target 0x19c1b8
07efd8: ldxdw r6, [r10 - 0x280]
07efe0: ldxdw r8, [r10 - 0x288]
07efe8: ja -0x9c ; branch 0x7eb10
07eff0: ldxdw r6, [r10 - 0x260]
07eff8: ja -0x9e ; branch 0x7eb10
07f000: mov64 r8, 0x2
07f008: ja -0xa0 ; branch 0x7eb10
