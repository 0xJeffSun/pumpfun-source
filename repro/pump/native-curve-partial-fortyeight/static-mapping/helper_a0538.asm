0a0538: mov64 r4, r3
0a0540: mov64 r6, r1
0a0548: ldxdw r1, [r2 + 0x40]
0a0550: mov64 r7, r1
0a0558: add64 r7, r4
0a0560: mov64 r8, 0x1
0a0568: jlt r7, r1, +0x1 ; branch 0xa0578
0a0570: mov64 r8, 0x0
0a0578: mov64 r1, r7
0a0580: or64 r1, r8
0a0588: jeq r1, 0x0, +0x13 ; branch 0xa0628
0a0590: ldxdw r2, [r2 + 0x48]
0a0598: mov64 r1, r10
0a05a0: add64 r1, -0x120
0a05a8: mov64 r9, 0x0
0a05b0: mov64 r3, 0x0
0a05b8: mov64 r5, 0x0
0a05c0: call 0x22a00 ; direct target 0x1b55c8
0a05c8: mov64 r1, r10
0a05d0: add64 r1, -0x130
0a05d8: ldxdw r2, [r10 - 0x120]
0a05e0: ldxdw r3, [r10 - 0x118]
0a05e8: mov64 r4, r7
0a05f0: mov64 r5, r8
0a05f8: call 0x22751 ; direct target 0x1b4088
0a0600: ldxdw r1, [r10 - 0x128]
0a0608: stxdw [r6 + 0x10], r1
0a0610: ldxdw r1, [r10 - 0x130]
0a0618: stxdw [r6 + 0x8], r1
0a0620: ja +0x40 ; branch 0xa0828
0a0628: mov64 r1, r10
0a0630: add64 r1, -0x70
0a0638: lddw r2, 0x1b5f54 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()a Display implementa'
0a0648: call 0x16da6 ; direct target 0x157380
0a0650: stdw [r10 - 0x48], 0x0
0a0658: stdw [r10 - 0x50], 0x1
0a0660: stdw [r10 - 0x58], 0x0
0a0668: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0a0678: stxdw [r10 - 0x18], r1
0a0680: mov64 r1, r10
0a0688: add64 r1, -0x58
0a0690: stxdw [r10 - 0x20], r1
0a0698: stb [r10 - 0x8], 0x3
0a06a0: stdw [r10 - 0x10], 0x20
0a06a8: stdw [r10 - 0x30], 0x0
0a06b0: stdw [r10 - 0x40], 0x0
0a06b8: mov64 r2, r10
0a06c0: add64 r2, -0x40
0a06c8: lddw r1, 0x1b5f54 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod.rsfailed to fill whole buffer()a Display implementa'
0a06d8: call 0x17af5 ; direct target 0x15de88
0a06e0: jeq r0, 0x0, +0xa ; branch 0xa0738
0a06e8: mov64 r3, r10
0a06f0: add64 r3, -0x110
0a06f8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
0a0708: mov64 r2, 0x37
0a0710: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
0a0720: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
0a0730: call 0x218dc ; direct target 0x1ace18
0a0738: ldxdw r1, [r10 - 0x48]
0a0740: stxdw [r10 - 0xc8], r1
0a0748: ldxdw r1, [r10 - 0x50]
0a0750: stxdw [r10 - 0xd0], r1
0a0758: ldxdw r1, [r10 - 0x58]
0a0760: stxdw [r10 - 0xd8], r1
0a0768: ldxdw r1, [r10 - 0x70]
0a0770: stxdw [r10 - 0xf0], r1
0a0778: ldxdw r1, [r10 - 0x68]
0a0780: stxdw [r10 - 0xe8], r1
0a0788: ldxdw r1, [r10 - 0x60]
0a0790: stxdw [r10 - 0xe0], r1
0a0798: lddw r1, 0x1b72c5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/lib.rsbuyback_fee never exceeds protocol_feebuyback fee is at most protocol_feeglo'
0a07a8: stxdw [r10 - 0x108], r1
0a07b0: stw [r10 - 0x78], 0x178a
0a07b8: stb [r10 - 0xc0], 0x2
0a07c0: stw [r10 - 0xf8], 0x996
0a07c8: stdw [r10 - 0x100], 0x18
0a07d0: stdw [r10 - 0x110], 0x0
0a07d8: mov64 r1, r10
0a07e0: add64 r1, -0x140
0a07e8: mov64 r2, r10
0a07f0: add64 r2, -0x110
0a07f8: call 0x1f666 ; direct target 0x19bb30
0a0800: ldxdw r1, [r10 - 0x140]
0a0808: ldxdw r2, [r10 - 0x138]
0a0810: stxdw [r6 + 0x10], r2
0a0818: stxdw [r6 + 0x8], r1
0a0820: mov64 r9, 0x1
0a0828: stxdw [r6 + 0x0], r9
0a0830: exit
