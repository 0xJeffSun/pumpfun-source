0123a0: mov64 r5, r2
0123a8: mov64 r6, r1
0123b0: mov64 r7, r3
0123b8: add64 r7, r5
0123c0: mov64 r8, 0x1
0123c8: jlt r7, r3, +0x1 ; branch 0x123d8
0123d0: mov64 r8, 0x0
0123d8: mov64 r1, r7
0123e0: or64 r1, r8
0123e8: jeq r1, 0x0, +0x2a ; branch 0x12540
0123f0: mov64 r1, r10
0123f8: add64 r1, -0x128
012400: mov64 r2, r4
012408: mov64 r3, 0x0
012410: mov64 r4, r5
012418: mov64 r5, 0x0
012420: call 0x21281 ; call 0x11b830
012428: mov64 r1, r10
012430: add64 r1, -0x138
012438: ldxdw r2, [r10 - 0x128]
012440: ldxdw r3, [r10 - 0x120]
012448: mov64 r4, r7
012450: mov64 r5, r8
012458: call 0x20fd2 ; call 0x11a2f0
012460: ldxdw r1, [r10 - 0x130]
012468: jne r1, 0x0, +0x1 ; branch 0x12478
012470: ja +0x57 ; branch 0x12730
012478: mov64 r1, r10
012480: add64 r1, -0x78
012488: lddw r2, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
012498: call 0xc5eb ; call 0x753f8
0124a0: stdw [r10 - 0x50], 0x0
0124a8: stdw [r10 - 0x58], 0x1
0124b0: stdw [r10 - 0x60], 0x0
0124b8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0124c8: stxdw [r10 - 0x20], r1
0124d0: mov64 r1, r10
0124d8: add64 r1, -0x60
0124e0: stxdw [r10 - 0x28], r1
0124e8: stb [r10 - 0x10], 0x3
0124f0: stdw [r10 - 0x18], 0x20
0124f8: stdw [r10 - 0x38], 0x0
012500: stdw [r10 - 0x48], 0x0
012508: mov64 r2, r10
012510: add64 r2, -0x48
012518: lddw r1, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
012528: call 0xd0ce ; call 0x7aba0
012530: jeq r0, 0x0, +0x43 ; branch 0x12750
012538: ja +0x18 ; branch 0x12600
012540: mov64 r1, r10
012548: add64 r1, -0x78
012550: lddw r2, 0x11c068 ; rodata b'\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00'
012560: call 0xc5d2 ; call 0x753f8
012568: stdw [r10 - 0x50], 0x0
012570: stdw [r10 - 0x58], 0x1
012578: stdw [r10 - 0x60], 0x0
012580: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
012590: stxdw [r10 - 0x20], r1
012598: mov64 r1, r10
0125a0: add64 r1, -0x60
0125a8: stxdw [r10 - 0x28], r1
0125b0: stb [r10 - 0x10], 0x3
0125b8: stdw [r10 - 0x18], 0x20
0125c0: stdw [r10 - 0x38], 0x0
0125c8: stdw [r10 - 0x48], 0x0
0125d0: mov64 r2, r10
0125d8: add64 r2, -0x48
0125e0: lddw r1, 0x11c068 ; rodata b'\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00'
0125f0: call 0xd0b5 ; call 0x7aba0
0125f8: jeq r0, 0x0, +0xa ; branch 0x12650
012600: mov64 r3, r10
012608: add64 r3, -0x1
012610: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
012620: mov64 r2, 0x37
012628: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
012638: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
012648: call 0x20129 ; call 0x112f98
012650: ldxdw r1, [r10 - 0x50]
012658: stxdw [r10 - 0xd0], r1
012660: ldxdw r1, [r10 - 0x58]
012668: stxdw [r10 - 0xd8], r1
012670: ldxdw r1, [r10 - 0x60]
012678: stxdw [r10 - 0xe0], r1
012680: ldxdw r1, [r10 - 0x78]
012688: stxdw [r10 - 0xf8], r1
012690: ldxdw r1, [r10 - 0x70]
012698: stxdw [r10 - 0xf0], r1
0126a0: ldxdw r1, [r10 - 0x68]
0126a8: stxdw [r10 - 0xe8], r1
0126b0: lddw r1, 0x11c522 ; rodata b'programs/pump-amm/src/curve/constant_product.rsprograms/pump-amm/src/curve/'
0126c0: stxdw [r10 - 0x110], r1
0126c8: stw [r10 - 0x80], 0x1789
0126d0: stb [r10 - 0xc8], 0x2
0126d8: stw [r10 - 0x100], 0x55
0126e0: stdw [r10 - 0x108], 0x2f
0126e8: stdw [r10 - 0x118], 0x0
0126f0: mov64 r1, r10
0126f8: add64 r1, -0x158
012700: mov64 r2, r10
012708: add64 r2, -0x118
012710: call 0x1e114 ; call 0x102fb8
012718: ldxdw r1, [r10 - 0x158]
012720: ldxdw r2, [r10 - 0x150]
012728: ja +0x1f ; branch 0x12828
012730: ldxdw r1, [r10 - 0x138]
012738: stxdw [r6 + 0x8], r1
012740: stdw [r6 + 0x0], 0x2
012748: ja +0x1d ; branch 0x12838
012750: ldxdw r1, [r10 - 0x50]
012758: stxdw [r10 - 0xd0], r1
012760: ldxdw r1, [r10 - 0x58]
012768: stxdw [r10 - 0xd8], r1
012770: ldxdw r1, [r10 - 0x60]
012778: stxdw [r10 - 0xe0], r1
012780: ldxdw r1, [r10 - 0x78]
012788: stxdw [r10 - 0xf8], r1
012790: ldxdw r1, [r10 - 0x70]
012798: stxdw [r10 - 0xf0], r1
0127a0: ldxdw r1, [r10 - 0x68]
0127a8: stxdw [r10 - 0xe8], r1
0127b0: lddw r1, 0x11c522 ; rodata b'programs/pump-amm/src/curve/constant_product.rsprograms/pump-amm/src/curve/'
0127c0: stxdw [r10 - 0x110], r1
0127c8: stw [r10 - 0x80], 0x1788
0127d0: stb [r10 - 0xc8], 0x2
0127d8: stw [r10 - 0x100], 0x57
0127e0: stdw [r10 - 0x108], 0x2f
0127e8: stdw [r10 - 0x118], 0x0
0127f0: mov64 r1, r10
0127f8: add64 r1, -0x148
012800: mov64 r2, r10
012808: add64 r2, -0x118
012810: call 0x1e0f4 ; call 0x102fb8
012818: ldxdw r1, [r10 - 0x148]
012820: ldxdw r2, [r10 - 0x140]
012828: stxdw [r6 + 0x8], r2
012830: stxdw [r6 + 0x0], r1
012838: exit
