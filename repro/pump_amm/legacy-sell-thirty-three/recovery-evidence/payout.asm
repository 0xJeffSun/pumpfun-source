04c750: mov64 r6, r1
04c758: jne r3, 0x0, +0x22 ; branch 0x4c870
04c760: mov64 r1, r10
04c768: add64 r1, -0x370
04c770: lddw r2, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
04c780: call 0x518e ; call 0x753f8
04c788: stdw [r10 - 0x320], 0x0
04c790: stdw [r10 - 0x328], 0x1
04c798: stdw [r10 - 0x330], 0x0
04c7a0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04c7b0: stxdw [r10 - 0x110], r1
04c7b8: mov64 r1, r10
04c7c0: add64 r1, -0x330
04c7c8: stxdw [r10 - 0x118], r1
04c7d0: stb [r10 - 0x100], 0x3
04c7d8: stdw [r10 - 0x108], 0x20
04c7e0: stdw [r10 - 0x128], 0x0
04c7e8: stdw [r10 - 0x138], 0x0
04c7f0: mov64 r2, r10
04c7f8: add64 r2, -0x138
04c800: lddw r1, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
04c810: call 0x5c71 ; call 0x7aba0
04c818: jeq r0, 0x0, +0x25 ; branch 0x4c948
04c820: mov64 r3, r10
04c828: add64 r3, -0x2d0
04c830: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
04c840: mov64 r2, 0x37
04c848: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
04c858: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
04c868: call 0x18ce5 ; call 0x112f98
04c870: jeq r3, 0x1, +0x1 ; branch 0x4c880
04c878: ja +0x35 ; branch 0x4ca28
04c880: mov64 r1, r10
04c888: add64 r1, -0x370
04c890: lddw r2, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
04c8a0: call 0x516a ; call 0x753f8
04c8a8: stdw [r10 - 0x320], 0x0
04c8b0: stdw [r10 - 0x328], 0x1
04c8b8: stdw [r10 - 0x330], 0x0
04c8c0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04c8d0: stxdw [r10 - 0x110], r1
04c8d8: mov64 r1, r10
04c8e0: add64 r1, -0x330
04c8e8: stxdw [r10 - 0x118], r1
04c8f0: stb [r10 - 0x100], 0x3
04c8f8: stdw [r10 - 0x108], 0x20
04c900: stdw [r10 - 0x128], 0x0
04c908: stdw [r10 - 0x138], 0x0
04c910: mov64 r2, r10
04c918: add64 r2, -0x138
04c920: lddw r1, 0x11c070 ; rodata b';\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00'
04c930: call 0x5c4d ; call 0x7aba0
04c938: jeq r0, 0x0, +0x9d ; branch 0x4ce28
04c940: ja -0x25 ; branch 0x4c820
04c948: ldxdw r1, [r10 - 0x320]
04c950: stxdw [r10 - 0x268], r1
04c958: ldxdw r1, [r10 - 0x328]
04c960: stxdw [r10 - 0x270], r1
04c968: ldxdw r1, [r10 - 0x330]
04c970: stxdw [r10 - 0x278], r1
04c978: ldxdw r1, [r10 - 0x370]
04c980: stxdw [r10 - 0x290], r1
04c988: ldxdw r1, [r10 - 0x368]
04c990: stxdw [r10 - 0x288], r1
04c998: ldxdw r1, [r10 - 0x360]
04c9a0: stxdw [r10 - 0x280], r1
04c9a8: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04c9b8: stxdw [r10 - 0x2a8], r1
04c9c0: stw [r10 - 0x218], 0x17ab
04c9c8: stb [r10 - 0x260], 0x2
04c9d0: stw [r10 - 0x298], 0x17a
04c9d8: stdw [r10 - 0x2a0], 0x2f
04c9e0: stdw [r10 - 0x2b0], 0x0
04c9e8: mov64 r1, r10
04c9f0: add64 r1, -0x510
04c9f8: mov64 r2, r10
04ca00: add64 r2, -0x2b0
04ca08: call 0x16cb5 ; call 0x102fb8
04ca10: ldxdw r9, [r10 - 0x508]
04ca18: ldxdw r8, [r10 - 0x510]
04ca20: ja +0xd1 ; branch 0x4d0b0
04ca28: stxdw [r10 - 0x518], r6
04ca30: stxdw [r10 - 0x570], r3
04ca38: ldxdw r1, [r5 - 0xfc8]
04ca40: stxdw [r10 - 0x520], r1
04ca48: ldxdw r1, [r5 - 0xfd0]
04ca50: stxdw [r10 - 0x568], r1
04ca58: ldxdw r1, [r5 - 0xfd8]
04ca60: stxdw [r10 - 0x558], r1
04ca68: ldxdw r1, [r5 - 0xfe0]
04ca70: stxdw [r10 - 0x550], r1
04ca78: ldxdw r1, [r5 - 0xfe8]
04ca80: stxdw [r10 - 0x530], r1
04ca88: ldxdw r1, [r5 - 0xff0]
04ca90: stxdw [r10 - 0x548], r1
04ca98: ldxdw r1, [r5 - 0xff8]
04caa0: stxdw [r10 - 0x540], r1
04caa8: ldxdw r1, [r5 - 0x1000]
04cab0: stxdw [r10 - 0x560], r1
04cab8: stxdw [r10 - 0x528], r2
04cac0: mov64 r8, r2
04cac8: add64 r8, 0x30
04cad0: ldxdw r7, [r4 + 0x0]
04cad8: ldxdw r1, [r7 + 0x18]
04cae0: stxdw [r10 - 0x3b8], r1
04cae8: ldxdw r1, [r7 + 0x10]
04caf0: stxdw [r10 - 0x3c0], r1
04caf8: ldxdw r1, [r7 + 0x8]
04cb00: stxdw [r10 - 0x3c8], r1
04cb08: ldxdw r1, [r7 + 0x0]
04cb10: stxdw [r10 - 0x3d0], r1
04cb18: mov64 r1, r10
04cb20: add64 r1, -0x3d0
04cb28: stxdw [r10 - 0x128], r1
04cb30: lddw r1, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
04cb40: stxdw [r10 - 0x138], r1
04cb48: stdw [r10 - 0x120], 0x20
04cb50: stdw [r10 - 0x130], 0x17
04cb58: mov64 r1, r10
04cb60: add64 r1, -0x2b0
04cb68: mov64 r2, r10
04cb70: add64 r2, -0x138
04cb78: mov64 r3, 0x2
04cb80: stxdw [r10 - 0x538], r4
04cb88: lddw r4, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04cb98: call 0x18299 ; call 0x10e068
04cba0: ldxdw r1, [r10 - 0x298]
04cba8: stxdw [r10 - 0x398], r1
04cbb0: ldxdw r1, [r10 - 0x2a0]
04cbb8: stxdw [r10 - 0x3a0], r1
04cbc0: ldxdw r1, [r10 - 0x2a8]
04cbc8: stxdw [r10 - 0x3a8], r1
04cbd0: ldxdw r1, [r10 - 0x2b0]
04cbd8: stxdw [r10 - 0x3b0], r1
04cbe0: ldxb r6, [r10 - 0x290]
04cbe8: ldxdw r9, [r8 + 0x0]
04cbf0: ldxdw r1, [r9 + 0x18]
04cbf8: stxdw [r10 - 0x298], r1
04cc00: ldxdw r1, [r9 + 0x10]
04cc08: stxdw [r10 - 0x2a0], r1
04cc10: ldxdw r1, [r9 + 0x8]
04cc18: stxdw [r10 - 0x2a8], r1
04cc20: ldxdw r1, [r9 + 0x0]
04cc28: stxdw [r10 - 0x2b0], r1
04cc30: mov64 r1, r10
04cc38: add64 r1, -0x2b0
04cc40: mov64 r2, r10
04cc48: add64 r2, -0x3b0
04cc50: mov64 r3, 0x20
04cc58: call 0x19990 ; call 0x1198e0
04cc60: lsh64 r0, 0x20
04cc68: rsh64 r0, 0x20
04cc70: jne r0, 0x0, +0x52 ; branch 0x4cf08
04cc78: stxdw [r10 - 0x578], r9
04cc80: stxdw [r10 - 0x580], r6
04cc88: ldxdw r1, [r10 - 0x520]
04cc90: ldxdw r1, [r10 - 0x550]
04cc98: ldxdw r1, [r10 - 0x538]
04cca0: ldxdw r1, [r10 - 0x530]
04cca8: ldxdw r1, [r10 - 0x568]
04ccb0: ldxdw r1, [r10 - 0x548]
04ccb8: ldxdw r1, [r10 - 0x540]
04ccc0: ldxdw r1, [r10 - 0x560]
04ccc8: stxdw [r10 - 0x588], r7
04ccd0: ldxdw r1, [r10 - 0x558]
04ccd8: ldxdw r1, [r10 - 0x528]
04cce0: ldxb r1, [r1 + 0x59]
04cce8: jeq r1, 0x0, +0x7b ; branch 0x4d0c8
04ccf0: mov64 r7, r8
04ccf8: mov64 r1, r7
04cd00: call 0x17862 ; call 0x109018
04cd08: jne r0, 0x0, +0xad ; branch 0x4d278
04cd10: ldxdw r1, [r10 - 0x528]
04cd18: ldxdw r1, [r1 + 0x48]
04cd20: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04cd30: mov64 r3, 0x20
04cd38: call 0x19974 ; call 0x1198e0
04cd40: lsh64 r0, 0x20
04cd48: rsh64 r0, 0x20
04cd50: ldxdw r8, [r10 - 0x520]
04cd58: jeq r0, 0x0, +0xd5 ; branch 0x4d408
04cd60: mov64 r1, r10
04cd68: add64 r1, -0x370
04cd70: lddw r2, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04cd80: call 0x50ce ; call 0x753f8
04cd88: stdw [r10 - 0x320], 0x0
04cd90: stdw [r10 - 0x328], 0x1
04cd98: stdw [r10 - 0x330], 0x0
04cda0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04cdb0: stxdw [r10 - 0x110], r1
04cdb8: mov64 r1, r10
04cdc0: add64 r1, -0x330
04cdc8: stxdw [r10 - 0x118], r1
04cdd0: stb [r10 - 0x100], 0x3
04cdd8: stdw [r10 - 0x108], 0x20
04cde0: stdw [r10 - 0x128], 0x0
04cde8: stdw [r10 - 0x138], 0x0
04cdf0: mov64 r2, r10
04cdf8: add64 r2, -0x138
04ce00: lddw r1, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04ce10: call 0x5bb1 ; call 0x7aba0
04ce18: jeq r0, 0x0, +0xa0 ; branch 0x4d320
04ce20: ja -0xc1 ; branch 0x4c820
04ce28: ldxdw r1, [r10 - 0x320]
04ce30: stxdw [r10 - 0x268], r1
04ce38: ldxdw r1, [r10 - 0x328]
04ce40: stxdw [r10 - 0x270], r1
04ce48: ldxdw r1, [r10 - 0x330]
04ce50: stxdw [r10 - 0x278], r1
04ce58: ldxdw r1, [r10 - 0x370]
04ce60: stxdw [r10 - 0x290], r1
04ce68: ldxdw r1, [r10 - 0x368]
04ce70: stxdw [r10 - 0x288], r1
04ce78: ldxdw r1, [r10 - 0x360]
04ce80: stxdw [r10 - 0x280], r1
04ce88: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04ce98: stxdw [r10 - 0x2a8], r1
04cea0: stw [r10 - 0x218], 0x17ab
04cea8: stb [r10 - 0x260], 0x2
04ceb0: stw [r10 - 0x298], 0x17f
04ceb8: stdw [r10 - 0x2a0], 0x2f
04cec0: stdw [r10 - 0x2b0], 0x0
04cec8: mov64 r1, r10
04ced0: add64 r1, -0x500
04ced8: mov64 r2, r10
04cee0: add64 r2, -0x2b0
04cee8: call 0x16c19 ; call 0x102fb8
04cef0: ldxdw r9, [r10 - 0x4f8]
04cef8: ldxdw r8, [r10 - 0x500]
04cf00: ja +0x35 ; branch 0x4d0b0
04cf08: mov64 r1, r10
04cf10: add64 r1, -0x370
04cf18: lddw r2, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04cf28: call 0x5099 ; call 0x753f8
04cf30: stdw [r10 - 0x320], 0x0
04cf38: stdw [r10 - 0x328], 0x1
04cf40: stdw [r10 - 0x330], 0x0
04cf48: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04cf58: stxdw [r10 - 0x110], r1
04cf60: mov64 r1, r10
04cf68: add64 r1, -0x330
04cf70: stxdw [r10 - 0x118], r1
04cf78: stb [r10 - 0x100], 0x3
04cf80: stdw [r10 - 0x108], 0x20
04cf88: stdw [r10 - 0x128], 0x0
04cf90: stdw [r10 - 0x138], 0x0
04cf98: mov64 r2, r10
04cfa0: add64 r2, -0x138
04cfa8: lddw r1, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04cfb8: call 0x5b7c ; call 0x7aba0
04cfc0: ldxdw r6, [r10 - 0x518]
04cfc8: jeq r0, 0x0, +0x1 ; branch 0x4cfd8
04cfd0: ja -0xf7 ; branch 0x4c820
04cfd8: ldxdw r1, [r10 - 0x320]
04cfe0: stxdw [r10 - 0x268], r1
04cfe8: ldxdw r1, [r10 - 0x328]
04cff0: stxdw [r10 - 0x270], r1
04cff8: ldxdw r1, [r10 - 0x330]
04d000: stxdw [r10 - 0x278], r1
04d008: ldxdw r1, [r10 - 0x370]
04d010: stxdw [r10 - 0x290], r1
04d018: ldxdw r1, [r10 - 0x368]
04d020: stxdw [r10 - 0x288], r1
04d028: ldxdw r1, [r10 - 0x360]
04d030: stxdw [r10 - 0x280], r1
04d038: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04d048: stxdw [r10 - 0x2a8], r1
04d050: stw [r10 - 0x218], 0x17ac
04d058: stb [r10 - 0x260], 0x2
04d060: stw [r10 - 0x298], 0x188
04d068: stdw [r10 - 0x2a0], 0x2f
04d070: stdw [r10 - 0x2b0], 0x0
04d078: mov64 r1, r10
04d080: add64 r1, -0x3e0
04d088: mov64 r2, r10
04d090: add64 r2, -0x2b0
04d098: call 0x16be3 ; call 0x102fb8
04d0a0: ldxdw r9, [r10 - 0x3d8]
04d0a8: ldxdw r8, [r10 - 0x3e0]
04d0b0: stxdw [r6 + 0x8], r9
04d0b8: stxdw [r6 + 0x0], r8
04d0c0: exit
04d0c8: mov64 r1, r10
04d0d0: add64 r1, -0x370
04d0d8: lddw r2, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04d0e8: call 0x5061 ; call 0x753f8
04d0f0: stdw [r10 - 0x320], 0x0
04d0f8: stdw [r10 - 0x328], 0x1
04d100: stdw [r10 - 0x330], 0x0
04d108: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04d118: stxdw [r10 - 0x110], r1
04d120: mov64 r1, r10
04d128: add64 r1, -0x330
04d130: stxdw [r10 - 0x118], r1
04d138: stb [r10 - 0x100], 0x3
04d140: stdw [r10 - 0x108], 0x20
04d148: stdw [r10 - 0x128], 0x0
04d150: stdw [r10 - 0x138], 0x0
04d158: mov64 r2, r10
04d160: add64 r2, -0x138
04d168: lddw r1, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04d178: call 0x5b44 ; call 0x7aba0
04d180: jeq r0, 0x0, +0x1 ; branch 0x4d190
04d188: ja -0x12e ; branch 0x4c820
04d190: ldxdw r1, [r10 - 0x320]
04d198: stxdw [r10 - 0x268], r1
04d1a0: ldxdw r1, [r10 - 0x328]
04d1a8: stxdw [r10 - 0x270], r1
04d1b0: ldxdw r1, [r10 - 0x330]
04d1b8: stxdw [r10 - 0x278], r1
04d1c0: ldxdw r1, [r10 - 0x370]
04d1c8: stxdw [r10 - 0x290], r1
04d1d0: ldxdw r1, [r10 - 0x368]
04d1d8: stxdw [r10 - 0x288], r1
04d1e0: ldxdw r1, [r10 - 0x360]
04d1e8: stxdw [r10 - 0x280], r1
04d1f0: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04d200: stxdw [r10 - 0x2a8], r1
04d208: stw [r10 - 0x218], 0x17ac
04d210: stb [r10 - 0x260], 0x2
04d218: stw [r10 - 0x298], 0x18b
04d220: stdw [r10 - 0x2a0], 0x2f
04d228: stdw [r10 - 0x2b0], 0x0
04d230: mov64 r1, r10
04d238: add64 r1, -0x4f0
04d240: mov64 r2, r10
04d248: add64 r2, -0x2b0
04d250: call 0x16bac ; call 0x102fb8
04d258: ldxdw r9, [r10 - 0x4e8]
04d260: ldxdw r8, [r10 - 0x4f0]
04d268: ldxdw r6, [r10 - 0x518]
04d270: ja -0x39 ; branch 0x4d0b0
04d278: mov64 r1, r10
04d280: add64 r1, -0x2b0
04d288: call 0x17392 ; call 0x106f20
04d290: ldxdw r1, [r10 - 0x2a8]
04d298: stxdw [r10 - 0x390], r1
04d2a0: ldxdw r1, [r10 - 0x2a0]
04d2a8: stxdw [r10 - 0x388], r1
04d2b0: ldxdw r1, [r10 - 0x298]
04d2b8: stxdw [r10 - 0x380], r1
04d2c0: ldxdw r1, [r10 - 0x2b0]
04d2c8: ldxdw r2, [r10 - 0x520]
04d2d0: jeq r1, 0x0, +0x3c ; branch 0x4d4b8
04d2d8: mov64 r1, r10
04d2e0: add64 r1, -0x420
04d2e8: mov64 r2, r10
04d2f0: add64 r2, -0x390
04d2f8: call 0x16ba8 ; call 0x103040
04d300: ldxdw r9, [r10 - 0x418]
04d308: ldxdw r8, [r10 - 0x420]
04d310: ldxdw r6, [r10 - 0x518]
04d318: ja -0x4e ; branch 0x4d0b0
04d320: ldxdw r1, [r10 - 0x320]
04d328: stxdw [r10 - 0x268], r1
04d330: ldxdw r1, [r10 - 0x328]
04d338: stxdw [r10 - 0x270], r1
04d340: ldxdw r1, [r10 - 0x330]
04d348: stxdw [r10 - 0x278], r1
04d350: ldxdw r1, [r10 - 0x370]
04d358: stxdw [r10 - 0x290], r1
04d360: ldxdw r1, [r10 - 0x368]
04d368: stxdw [r10 - 0x288], r1
04d370: ldxdw r1, [r10 - 0x360]
04d378: stxdw [r10 - 0x280], r1
04d380: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04d390: stxdw [r10 - 0x2a8], r1
04d398: stw [r10 - 0x218], 0x17ac
04d3a0: stb [r10 - 0x260], 0x2
04d3a8: stw [r10 - 0x298], 0x1bc
04d3b0: stdw [r10 - 0x2a0], 0x2f
04d3b8: stdw [r10 - 0x2b0], 0x0
04d3c0: mov64 r1, r10
04d3c8: add64 r1, -0x3f0
04d3d0: mov64 r2, r10
04d3d8: add64 r2, -0x2b0
04d3e0: call 0x16b7a ; call 0x102fb8
04d3e8: ldxdw r9, [r10 - 0x3e8]
04d3f0: ldxdw r8, [r10 - 0x3f0]
04d3f8: ldxdw r6, [r10 - 0x518]
04d400: ja -0x6b ; branch 0x4d0b0
04d408: mov64 r1, r10
04d410: add64 r1, -0x2b0
04d418: mov64 r2, r7
04d420: call 0x177ac ; call 0x109188
04d428: ldxdw r6, [r10 - 0x2a0]
04d430: ldxdw r1, [r10 - 0x2a8]
04d438: ldxdw r2, [r10 - 0x2b0]
04d440: lddw r3, -0x7fffffffffffffe6
04d450: jeq r2, r3, +0x1 ; branch 0x4d460
04d458: ja +0xc9 ; branch 0x4daa8
04d460: ldxdw r2, [r1 + 0x8]
04d468: jlt r2, 0x8, +0xd3 ; branch 0x4db08
04d470: ldxdw r1, [r1 + 0x0]
04d478: ldxdw r1, [r1 + 0x0]
04d480: lddw r2, -0x565ca99f18f00aa
04d490: jne r1, r2, +0xce ; branch 0x4db08
04d498: ldxdw r1, [r6 + 0x0]
04d4a0: add64 r1, -0x1
04d4a8: stxdw [r6 + 0x0], r1
04d4b0: ja +0x144 ; branch 0x4ded8
04d4b8: ldxdw r1, [r10 - 0x380]
04d4c0: stxdw [r10 - 0x8], r1
04d4c8: ldxdw r1, [r10 - 0x388]
04d4d0: stxdw [r10 - 0x10], r1
04d4d8: ldxdw r1, [r10 - 0x390]
04d4e0: stxdw [r10 - 0x18], r1
04d4e8: mov64 r1, r10
04d4f0: add64 r1, -0x18
04d4f8: mov64 r2, 0x89
04d500: call 0x1735c ; call 0x106fe8
04d508: mov64 r6, r0
04d510: ldxdw r1, [r10 - 0x580]
04d518: stxb [r10 - 0x371], r1
04d520: mov64 r1, r10
04d528: add64 r1, -0x371
04d530: stxdw [r10 - 0x350], r1
04d538: mov64 r1, r10
04d540: add64 r1, -0x3d0
04d548: stxdw [r10 - 0x360], r1
04d550: lddw r1, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
04d560: stxdw [r10 - 0x370], r1
04d568: stdw [r10 - 0x348], 0x1
04d570: stdw [r10 - 0x358], 0x20
04d578: stdw [r10 - 0x368], 0x17
04d580: mov64 r1, r10
04d588: add64 r1, -0x370
04d590: stxdw [r10 - 0x340], r1
04d598: stdw [r10 - 0x338], 0x3
04d5a0: mov64 r1, r7
04d5a8: call 0x17724 ; call 0x108ed0
04d5b0: mov64 r8, r0
04d5b8: jgt r6, r8, +0x1 ; branch 0x4d5c8
04d5c0: ja +0x28 ; branch 0x4d708
04d5c8: mov64 r1, r10
04d5d0: add64 r1, -0x298
04d5d8: ldxdw r2, [r10 - 0x530]
04d5e0: call -0x7e8e ; call 0xe178
04d5e8: mov64 r9, r10
04d5f0: add64 r9, -0x138
04d5f8: mov64 r1, r9
04d600: ldxdw r2, [r10 - 0x538]
04d608: call -0x7e93 ; call 0xe178
04d610: mov64 r1, r10
04d618: add64 r1, -0x108
04d620: mov64 r2, r7
04d628: call -0x7e97 ; call 0xe178
04d630: mov64 r1, r10
04d638: add64 r1, -0x268
04d640: mov64 r2, r9
04d648: mov64 r3, 0x60
04d650: call 0x19848 ; call 0x119898
04d658: mov64 r1, r6
04d660: sub64 r1, r8
04d668: mov64 r3, 0x0
04d670: mov64 r2, 0x1
04d678: jgt r1, r6, +0x1 ; branch 0x4d688
04d680: mov64 r2, 0x0
04d688: jne r2, 0x0, +0x1 ; branch 0x4d698
04d690: mov64 r3, r1
04d698: stdw [r10 - 0x200], 0x0
04d6a0: stdw [r10 - 0x208], 0x8
04d6a8: stdw [r10 - 0x2a0], 0x0
04d6b0: stdw [r10 - 0x2a8], 0x8
04d6b8: stdw [r10 - 0x2b0], 0x0
04d6c0: mov64 r1, r10
04d6c8: add64 r1, -0x430
04d6d0: mov64 r2, r10
04d6d8: add64 r2, -0x2b0
04d6e0: call 0x16f08 ; call 0x104f28
04d6e8: ldxdw r9, [r10 - 0x428]
04d6f0: ldxdw r8, [r10 - 0x430]
04d6f8: jeq r8, 0x2, +0x1 ; branch 0x4d708
04d700: ja +0x26f ; branch 0x4ea80
04d708: mov64 r9, r10
04d710: add64 r9, -0x2b0
04d718: mov64 r1, r9
04d720: ldxdw r2, [r10 - 0x578]
04d728: mov64 r3, 0x89
04d730: call 0x18060 ; call 0x10da38
04d738: mov64 r8, r10
04d740: add64 r8, -0x138
04d748: mov64 r1, r8
04d750: mov64 r2, r7
04d758: call -0x7ebd ; call 0xe178
04d760: mov64 r6, r10
04d768: add64 r6, -0x330
04d770: mov64 r1, r6
04d778: mov64 r2, r8
04d780: mov64 r3, 0x30
04d788: call 0x19821 ; call 0x119898
04d790: mov64 r1, r10
04d798: add64 r1, -0x340
04d7a0: stxdw [r10 - 0x1000], r1
04d7a8: stdw [r10 - 0xff8], 0x1
04d7b0: mov64 r1, r10
04d7b8: add64 r1, -0x2d0
04d7c0: mov64 r5, r10
04d7c8: mov64 r2, r9
04d7d0: mov64 r3, r6
04d7d8: mov64 r4, 0x1
04d7e0: call 0x1725a ; call 0x106ab8
04d7e8: lddw r1, -0x7fffffffffffffe6
04d7f8: ldxdw r2, [r10 - 0x2d0]
04d800: jeq r2, r1, +0x1 ; branch 0x4d810
04d808: ja +0x7d ; branch 0x4dbf8
04d810: ldxdw r1, [r10 - 0x320]
04d818: ldxdw r2, [r10 - 0x328]
04d820: ldxdw r3, [r2 + 0x0]
04d828: add64 r3, -0x1
04d830: stxdw [r2 + 0x0], r3
04d838: jne r3, 0x0, +0x3 ; branch 0x4d858
04d840: ldxdw r3, [r2 + 0x8]
04d848: add64 r3, -0x1
04d850: stxdw [r2 + 0x8], r3
04d858: ldxdw r2, [r1 + 0x0]
04d860: add64 r2, -0x1
04d868: stxdw [r1 + 0x0], r2
04d870: jne r2, 0x0, +0x3 ; branch 0x4d890
04d878: ldxdw r2, [r1 + 0x8]
04d880: add64 r2, -0x1
04d888: stxdw [r1 + 0x8], r2
04d890: mov64 r9, r10
04d898: add64 r9, -0x2b0
04d8a0: mov64 r1, r9
04d8a8: ldxdw r2, [r10 - 0x578]
04d8b0: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04d8c0: call 0x17fd7 ; call 0x10d780
04d8c8: mov64 r6, r10
04d8d0: add64 r6, -0x138
04d8d8: mov64 r1, r6
04d8e0: mov64 r2, r7
04d8e8: call -0x7eef ; call 0xe178
04d8f0: mov64 r8, r10
04d8f8: add64 r8, -0x330
04d900: mov64 r1, r8
04d908: mov64 r2, r6
04d910: mov64 r3, 0x30
04d918: call 0x197ef ; call 0x119898
04d920: mov64 r1, r10
04d928: add64 r1, -0x340
04d930: stxdw [r10 - 0x1000], r1
04d938: stdw [r10 - 0xff8], 0x1
04d940: mov64 r1, r10
04d948: add64 r1, -0x2d0
04d950: mov64 r5, r10
04d958: mov64 r2, r9
04d960: mov64 r3, r8
04d968: mov64 r4, 0x1
04d970: call 0x17228 ; call 0x106ab8
04d978: lddw r1, -0x7fffffffffffffe6
04d988: ldxdw r2, [r10 - 0x2d0]
04d990: jeq r2, r1, +0x1 ; branch 0x4d9a0
04d998: ja +0x6a ; branch 0x4dcf0
04d9a0: ldxdw r1, [r10 - 0x320]
04d9a8: ldxdw r2, [r10 - 0x328]
04d9b0: ldxdw r3, [r2 + 0x0]
04d9b8: add64 r3, -0x1
04d9c0: stxdw [r2 + 0x0], r3
04d9c8: jne r3, 0x0, +0x3 ; branch 0x4d9e8
04d9d0: ldxdw r3, [r2 + 0x8]
04d9d8: add64 r3, -0x1
04d9e0: stxdw [r2 + 0x8], r3
04d9e8: ldxdw r2, [r1 + 0x0]
04d9f0: add64 r2, -0x1
04d9f8: stxdw [r1 + 0x0], r2
04da00: jne r2, 0x0, +0x3 ; branch 0x4da20
04da08: ldxdw r2, [r1 + 0x8]
04da10: add64 r2, -0x1
04da18: stxdw [r1 + 0x8], r2
04da20: mov64 r1, r10
04da28: add64 r1, -0x2b0
04da30: mov64 r2, r7
04da38: call 0x176fb ; call 0x109218
04da40: ldxdw r1, [r10 - 0x2a0]
04da48: ldxdw r3, [r10 - 0x2a8]
04da50: ldxdw r2, [r10 - 0x2b0]
04da58: lddw r4, -0x7fffffffffffffe6
04da68: jeq r2, r4, +0x1 ; branch 0x4da78
04da70: ja +0x6a ; branch 0x4ddc8
04da78: ldxdw r2, [r3 + 0x8]
04da80: jgt r2, 0x7, +0x74 ; branch 0x4de28
04da88: mov64 r1, 0x8
04da90: lddw r3, 0x122550 ; rodata b'\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb7\x01\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb8\x01\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\xd0\xbd\x11\x00 \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00|\xce\x11\x00#\x00\x00'
04daa0: call 0x1918b ; call 0x116700
04daa8: stxdw [r10 - 0x2a0], r6
04dab0: stxdw [r10 - 0x2a8], r1
04dab8: stxdw [r10 - 0x2b0], r2
04dac0: mov64 r1, r10
04dac8: add64 r1, -0x400
04dad0: mov64 r2, r10
04dad8: add64 r2, -0x2b0
04dae0: call 0x16aab ; call 0x103040
04dae8: ldxdw r9, [r10 - 0x3f8]
04daf0: ldxdw r8, [r10 - 0x400]
04daf8: ldxdw r6, [r10 - 0x518]
04db00: ja -0x14b ; branch 0x4d0b0
04db08: mov64 r1, r10
04db10: add64 r1, -0x290
04db18: lddw r2, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04db28: call 0x4f19 ; call 0x753f8
04db30: mov64 r1, r10
04db38: add64 r1, -0x278
04db40: lddw r2, 0x11c078 ; rodata b'<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00'
04db50: call -0x8a77 ; call 0x87a0
04db58: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04db68: stxdw [r10 - 0x2a8], r1
04db70: stb [r10 - 0x260], 0x2
04db78: stw [r10 - 0x298], 0x1c0
04db80: stdw [r10 - 0x2a0], 0x2f
04db88: stdw [r10 - 0x2b0], 0x0
04db90: stw [r10 - 0x218], 0x17ac
04db98: mov64 r1, r10
04dba0: add64 r1, -0x410
04dba8: mov64 r2, r10
04dbb0: add64 r2, -0x2b0
04dbb8: call 0x16a7f ; call 0x102fb8
04dbc0: ldxdw r9, [r10 - 0x408]
04dbc8: ldxdw r8, [r10 - 0x410]
04dbd0: ldxdw r1, [r6 + 0x0]
04dbd8: add64 r1, -0x1
04dbe0: stxdw [r6 + 0x0], r1
04dbe8: ldxdw r6, [r10 - 0x518]
04dbf0: ja -0x169 ; branch 0x4d0b0
04dbf8: ldxdw r1, [r10 - 0x2c0]
04dc00: stxdw [r10 - 0x128], r1
04dc08: ldxdw r1, [r10 - 0x2c8]
04dc10: stxdw [r10 - 0x130], r1
04dc18: ldxdw r1, [r10 - 0x2d0]
04dc20: stxdw [r10 - 0x138], r1
04dc28: mov64 r1, r10
04dc30: add64 r1, -0x440
04dc38: mov64 r2, r10
04dc40: add64 r2, -0x138
04dc48: call 0x16a7e ; call 0x103040
04dc50: ldxdw r9, [r10 - 0x438]
04dc58: ldxdw r1, [r10 - 0x320]
04dc60: ldxdw r8, [r10 - 0x440]
04dc68: ldxdw r2, [r10 - 0x328]
04dc70: ldxdw r3, [r2 + 0x0]
04dc78: add64 r3, -0x1
04dc80: stxdw [r2 + 0x0], r3
04dc88: jne r3, 0x0, +0x3 ; branch 0x4dca8
04dc90: ldxdw r3, [r2 + 0x8]
04dc98: add64 r3, -0x1
04dca0: stxdw [r2 + 0x8], r3
04dca8: ldxdw r2, [r1 + 0x0]
04dcb0: add64 r2, -0x1
04dcb8: stxdw [r1 + 0x0], r2
04dcc0: jne r2, 0x0, +0x1b7 ; branch 0x4ea80
04dcc8: ldxdw r2, [r1 + 0x8]
04dcd0: add64 r2, -0x1
04dcd8: stxdw [r1 + 0x8], r2
04dce0: ldxdw r6, [r10 - 0x518]
04dce8: ja -0x188 ; branch 0x4d0b0
04dcf0: ldxdw r1, [r10 - 0x2c0]
04dcf8: stxdw [r10 - 0x128], r1
04dd00: ldxdw r1, [r10 - 0x2c8]
04dd08: stxdw [r10 - 0x130], r1
04dd10: ldxdw r1, [r10 - 0x2d0]
04dd18: stxdw [r10 - 0x138], r1
04dd20: mov64 r1, r10
04dd28: add64 r1, -0x450
04dd30: mov64 r2, r10
04dd38: add64 r2, -0x138
04dd40: call 0x16a5f ; call 0x103040
04dd48: ldxdw r9, [r10 - 0x448]
04dd50: ldxdw r1, [r10 - 0x320]
04dd58: ldxdw r8, [r10 - 0x450]
04dd60: ldxdw r2, [r10 - 0x328]
04dd68: ldxdw r3, [r2 + 0x0]
04dd70: add64 r3, -0x1
04dd78: stxdw [r2 + 0x0], r3
04dd80: jne r3, 0x0, +0x3 ; branch 0x4dda0
04dd88: ldxdw r3, [r2 + 0x8]
04dd90: add64 r3, -0x1
04dd98: stxdw [r2 + 0x8], r3
04dda0: ldxdw r2, [r1 + 0x0]
04dda8: add64 r2, -0x1
04ddb0: stxdw [r1 + 0x0], r2
04ddb8: jne r2, 0x0, +0x198 ; branch 0x4ea80
04ddc0: ja -0x20 ; branch 0x4dcc8
04ddc8: stxdw [r10 - 0x2a0], r1
04ddd0: stxdw [r10 - 0x2a8], r3
04ddd8: stxdw [r10 - 0x2b0], r2
04dde0: mov64 r1, r10
04dde8: add64 r1, -0x460
04ddf0: mov64 r2, r10
04ddf8: add64 r2, -0x2b0
04de00: call 0x16a47 ; call 0x103040
04de08: ldxdw r9, [r10 - 0x458]
04de10: ldxdw r8, [r10 - 0x460]
04de18: ldxdw r6, [r10 - 0x518]
04de20: ja -0x1af ; branch 0x4d0b0
04de28: ldxdw r2, [r3 + 0x0]
04de30: lddw r4, -0x565ca99f18f00aa
04de40: stxdw [r2 + 0x0], r4
04de48: ldxdw r2, [r3 + 0x8]
04de50: jgt r2, 0x27, +0x4 ; branch 0x4de78
04de58: mov64 r1, 0x28
04de60: lddw r3, 0x122568 ; rodata b'\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb8\x01\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\xd0\xbd\x11\x00 \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00|\xce\x11\x00#\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9f\xce\x11\x00,\x00\x00\x00\x00\x00\x00\x00\x87\x01\x00'
04de70: call 0x19111 ; call 0x116700
04de78: ldxdw r2, [r3 + 0x0]
04de80: ldxdw r3, [r10 - 0x3b8]
04de88: stxdw [r2 + 0x20], r3
04de90: ldxdw r3, [r10 - 0x3c0]
04de98: stxdw [r2 + 0x18], r3
04dea0: ldxdw r3, [r10 - 0x3c8]
04dea8: stxdw [r2 + 0x10], r3
04deb0: ldxdw r3, [r10 - 0x3d0]
04deb8: stxdw [r2 + 0x8], r3
04dec0: ldxdw r2, [r1 + 0x0]
04dec8: add64 r2, 0x1
04ded0: stxdw [r1 + 0x0], r2
04ded8: mov64 r1, r10
04dee0: add64 r1, -0x2b0
04dee8: mov64 r2, r7
04def0: call -0x8f3a ; call 0x6528
04def8: ldxdw r9, [r10 - 0x2a8]
04df00: ldxdw r8, [r10 - 0x2b0]
04df08: ldxb r6, [r10 - 0x257]
04df10: jeq r6, 0x2, +0x16d ; branch 0x4ea80
04df18: mov64 r1, r10
04df20: add64 r1, -0x320
04df28: mov64 r2, r10
04df30: add64 r2, -0x2a0
04df38: mov64 r3, 0x49
04df40: call 0x1972a ; call 0x119898
04df48: ldxw r1, [r10 - 0x256]
04df50: stxw [r10 - 0x2d6], r1
04df58: ldxh r1, [r10 - 0x252]
04df60: stxh [r10 - 0x2d2], r1
04df68: stxb [r10 - 0x2d7], r6
04df70: stxdw [r10 - 0x328], r9
04df78: stxdw [r10 - 0x330], r8
04df80: ldxdw r1, [r8 + 0x0]
04df88: ldxdw r2, [r1 + 0x18]
04df90: stxdw [r10 - 0x358], r2
04df98: ldxdw r2, [r1 + 0x10]
04dfa0: stxdw [r10 - 0x360], r2
04dfa8: ldxdw r2, [r1 + 0x8]
04dfb0: stxdw [r10 - 0x368], r2
04dfb8: ldxdw r1, [r1 + 0x0]
04dfc0: stxdw [r10 - 0x370], r1
04dfc8: ldxdw r1, [r10 - 0x540]
04dfd0: ldxdw r6, [r1 + 0x58]
04dfd8: ldxdw r1, [r6 + 0x0]
04dfe0: ldxdw r2, [r1 + 0x18]
04dfe8: stxdw [r10 - 0x120], r2
04dff0: ldxdw r2, [r1 + 0x10]
04dff8: stxdw [r10 - 0x128], r2
04e000: ldxdw r2, [r1 + 0x8]
04e008: stxdw [r10 - 0x130], r2
04e010: ldxdw r1, [r1 + 0x0]
04e018: stxdw [r10 - 0x138], r1
04e020: ldxdw r9, [r10 - 0x548]
04e028: ldxdw r1, [r9 + 0x0]
04e030: ldxdw r2, [r1 + 0x18]
04e038: stxdw [r10 - 0x298], r2
04e040: ldxdw r2, [r1 + 0x10]
04e048: stxdw [r10 - 0x2a0], r2
04e050: ldxdw r2, [r1 + 0x8]
04e058: stxdw [r10 - 0x2a8], r2
04e060: ldxdw r1, [r1 + 0x0]
04e068: stxdw [r10 - 0x2b0], r1
04e070: mov64 r7, r10
04e078: add64 r7, -0x2d0
04e080: mov64 r2, r10
04e088: add64 r2, -0x370
04e090: mov64 r3, r10
04e098: add64 r3, -0x138
04e0a0: mov64 r4, r10
04e0a8: add64 r4, -0x2b0
04e0b0: mov64 r1, r7
04e0b8: call 0x16513 ; call 0x100958
04e0c0: ldxdw r1, [r10 - 0x528]
04e0c8: ldxdw r1, [r1 + 0x0]
04e0d0: ldxdw r2, [r1 + 0x18]
04e0d8: stxdw [r10 - 0x298], r2
04e0e0: ldxdw r2, [r1 + 0x10]
04e0e8: stxdw [r10 - 0x2a0], r2
04e0f0: ldxdw r2, [r1 + 0x8]
04e0f8: stxdw [r10 - 0x2a8], r2
04e100: ldxdw r1, [r1 + 0x0]
04e108: stxdw [r10 - 0x2b0], r1
04e110: mov64 r1, r10
04e118: add64 r1, -0x2b0
04e120: mov64 r2, r7
04e128: mov64 r3, 0x20
04e130: call 0x196f5 ; call 0x1198e0
04e138: lsh64 r0, 0x20
04e140: rsh64 r0, 0x20
04e148: jeq r0, 0x0, +0x1b ; branch 0x4e228
04e150: mov64 r1, r10
04e158: add64 r1, -0x290
04e160: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
04e170: call 0x4e50 ; call 0x753f8
04e178: mov64 r1, r10
04e180: add64 r1, -0x278
04e188: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
04e198: call -0x8b40 ; call 0x87a0
04e1a0: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04e1b0: stxdw [r10 - 0x2a8], r1
04e1b8: stb [r10 - 0x260], 0x2
04e1c0: stw [r10 - 0x298], 0x1d0
04e1c8: stdw [r10 - 0x2a0], 0x2f
04e1d0: stdw [r10 - 0x2b0], 0x0
04e1d8: stw [r10 - 0x218], 0x17ad
04e1e0: mov64 r1, r10
04e1e8: add64 r1, -0x470
04e1f0: mov64 r2, r10
04e1f8: add64 r2, -0x2b0
04e200: call 0x169b6 ; call 0x102fb8
04e208: ldxdw r9, [r10 - 0x468]
04e210: ldxdw r8, [r10 - 0x470]
04e218: ldxdw r6, [r10 - 0x518]
04e220: ja -0x22f ; branch 0x4d0b0
04e228: ldxdw r1, [r10 - 0x528]
04e230: ldxb r2, [r1 + 0x29]
04e238: jeq r2, 0x0, +0x9b ; branch 0x4e718
04e240: call 0x175ba ; call 0x109018
04e248: jne r0, 0x0, +0x1 ; branch 0x4e258
04e250: ja +0x31 ; branch 0x4e3e0
04e258: mov64 r1, r10
04e260: add64 r1, -0x298
04e268: ldxdw r2, [r10 - 0x550]
04e270: call -0x8020 ; call 0xe178
04e278: mov64 r7, r10
04e280: add64 r7, -0x138
04e288: mov64 r1, r7
04e290: ldxdw r2, [r10 - 0x538]
04e298: call -0x8025 ; call 0xe178
04e2a0: mov64 r1, r10
04e2a8: add64 r1, -0x108
04e2b0: ldxdw r2, [r10 - 0x528]
04e2b8: call -0x8029 ; call 0xe178
04e2c0: mov64 r1, r10
04e2c8: add64 r1, -0xd8
04e2d0: mov64 r2, r8
04e2d8: call -0x802d ; call 0xe178
04e2e0: mov64 r1, r10
04e2e8: add64 r1, -0xa8
04e2f0: mov64 r2, r6
04e2f8: call -0x8031 ; call 0xe178
04e300: mov64 r1, r10
04e308: add64 r1, -0x78
04e310: ldxdw r2, [r10 - 0x530]
04e318: call -0x8035 ; call 0xe178
04e320: mov64 r1, r10
04e328: add64 r1, -0x48
04e330: mov64 r2, r9
04e338: call -0x8039 ; call 0xe178
04e340: mov64 r1, r10
04e348: add64 r1, -0x268
04e350: mov64 r2, r7
04e358: mov64 r3, 0x120
04e360: call 0x196a6 ; call 0x119898
04e368: stdw [r10 - 0x140], 0x0
04e370: stdw [r10 - 0x148], 0x8
04e378: stdw [r10 - 0x2a0], 0x0
04e380: stdw [r10 - 0x2a8], 0x8
04e388: stdw [r10 - 0x2b0], 0x0
04e390: mov64 r1, r10
04e398: add64 r1, -0x480
04e3a0: mov64 r2, r10
04e3a8: add64 r2, -0x2b0
04e3b0: call 0x14be7 ; call 0xf42f0
04e3b8: ldxdw r8, [r10 - 0x480]
04e3c0: jeq r8, 0x2, +0x3 ; branch 0x4e3e0
04e3c8: ldxdw r9, [r10 - 0x478]
04e3d0: ldxdw r6, [r10 - 0x518]
04e3d8: ja -0x266 ; branch 0x4d0b0
04e3e0: mov64 r1, r10
04e3e8: add64 r1, -0x2b0
04e3f0: ldxdw r2, [r10 - 0x528]
04e3f8: call -0x97de ; call 0x2510
04e400: ldxdw r9, [r10 - 0x2a8]
04e408: ldxdw r8, [r10 - 0x2b0]
04e410: ldxw r6, [r10 - 0x200]
04e418: jeq r6, 0x2, +0xcc ; branch 0x4ea80
04e420: mov64 r1, r10
04e428: add64 r1, -0x128
04e430: mov64 r2, r10
04e438: add64 r2, -0x2a0
04e440: mov64 r3, 0xa0
04e448: call 0x19689 ; call 0x119898
04e450: ldxdw r1, [r10 - 0x1fc]
04e458: stxdw [r10 - 0x84], r1
04e460: ldxdw r1, [r10 - 0x1f4]
04e468: stxdw [r10 - 0x7c], r1
04e470: ldxdw r1, [r10 - 0x1ec]
04e478: stxdw [r10 - 0x74], r1
04e480: ldxdw r1, [r10 - 0x1e4]
04e488: stxdw [r10 - 0x6c], r1
04e490: ldxw r1, [r10 - 0x1dc]
04e498: stxw [r10 - 0x64], r1
04e4a0: stxw [r10 - 0x88], r6
04e4a8: stxdw [r10 - 0x130], r9
04e4b0: stxdw [r10 - 0x138], r8
04e4b8: ldxdw r7, [r10 - 0x558]
04e4c0: stxdw [r10 - 0xff8], r7
04e4c8: ldxdw r1, [r10 - 0x568]
04e4d0: stxdw [r10 - 0xff0], r1
04e4d8: mov64 r1, r10
04e4e0: add64 r1, -0x138
04e4e8: stxdw [r10 - 0x1000], r1
04e4f0: mov64 r1, r10
04e4f8: add64 r1, -0x490
04e500: mov64 r5, r10
04e508: ldxdw r2, [r10 - 0x548]
04e510: ldxdw r3, [r10 - 0x540]
04e518: ldxdw r4, [r10 - 0x560]
04e520: call 0x4780 ; call 0x72128
04e528: ldxdw r8, [r10 - 0x490]
04e530: jeq r8, 0x2, +0x1 ; branch 0x4e540
04e538: ja +0x56 ; branch 0x4e7f0
04e540: mov64 r1, r10
04e548: add64 r1, -0x328
04e550: ldxdw r5, [r10 - 0x588]
04e558: ldxdw r2, [r5 + 0x0]
04e560: ldxdw r3, [r5 + 0x8]
04e568: ldxdw r4, [r5 + 0x10]
04e570: ldxdw r5, [r5 + 0x18]
04e578: stxdw [r1 + 0x18], r5
04e580: stxdw [r1 + 0x10], r4
04e588: stxdw [r1 + 0x8], r3
04e590: stxdw [r1 + 0x0], r2
04e598: ldxdw r2, [r10 - 0x2e8]
04e5a0: mov64 r6, r2
04e5a8: add64 r6, r7
04e5b0: mov64 r1, 0x1
04e5b8: jlt r6, r2, +0x1 ; branch 0x4e5c8
04e5c0: mov64 r1, 0x0
04e5c8: and64 r1, 0x1
04e5d0: jne r1, 0x0, +0x1 ; branch 0x4e5e0
04e5d8: ja +0x45 ; branch 0x4e808
04e5e0: mov64 r1, r10
04e5e8: add64 r1, -0x18
04e5f0: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
04e600: call 0x4dbe ; call 0x753f8
04e608: mov64 r1, r10
04e610: add64 r1, -0x370
04e618: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
04e628: call -0x8bd2 ; call 0x87a0
04e630: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04e640: stxdw [r10 - 0x2a8], r1
04e648: ldxdw r1, [r10 - 0x8]
04e650: stxdw [r10 - 0x280], r1
04e658: ldxdw r1, [r10 - 0x10]
04e660: stxdw [r10 - 0x288], r1
04e668: ldxdw r1, [r10 - 0x18]
04e670: stxdw [r10 - 0x290], r1
04e678: ldxdw r1, [r10 - 0x370]
04e680: stxdw [r10 - 0x278], r1
04e688: ldxdw r1, [r10 - 0x368]
04e690: stxdw [r10 - 0x270], r1
04e698: ldxdw r1, [r10 - 0x360]
04e6a0: stxdw [r10 - 0x268], r1
04e6a8: stw [r10 - 0x218], 0x1787
04e6b0: stb [r10 - 0x260], 0x2
04e6b8: stw [r10 - 0x298], 0x1f6
04e6c0: stdw [r10 - 0x2a0], 0x2f
04e6c8: stdw [r10 - 0x2b0], 0x0
04e6d0: mov64 r1, r10
04e6d8: add64 r1, -0x4d0
04e6e0: mov64 r2, r10
04e6e8: add64 r2, -0x2b0
04e6f0: call 0x16918 ; call 0x102fb8
04e6f8: ldxdw r9, [r10 - 0x4c8]
04e700: ldxdw r8, [r10 - 0x4d0]
04e708: ldxdw r6, [r10 - 0x518]
04e710: ja -0x2cd ; branch 0x4d0b0
04e718: mov64 r1, r10
04e720: add64 r1, -0x290
04e728: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
04e738: call 0x4d97 ; call 0x753f8
04e740: mov64 r1, r10
04e748: add64 r1, -0x278
04e750: lddw r2, 0x11c074 ; rodata b'=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00'
04e760: call -0x8bf9 ; call 0x87a0
04e768: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04e778: stxdw [r10 - 0x2a8], r1
04e780: stb [r10 - 0x260], 0x2
04e788: stw [r10 - 0x298], 0x1d3
04e790: stdw [r10 - 0x2a0], 0x2f
04e798: stdw [r10 - 0x2b0], 0x0
04e7a0: stw [r10 - 0x218], 0x17ad
04e7a8: mov64 r1, r10
04e7b0: add64 r1, -0x4e0
04e7b8: mov64 r2, r10
04e7c0: add64 r2, -0x2b0
04e7c8: call 0x168fd ; call 0x102fb8
04e7d0: ldxdw r9, [r10 - 0x4d8]
04e7d8: ldxdw r8, [r10 - 0x4e0]
04e7e0: ldxdw r6, [r10 - 0x518]
04e7e8: ja -0x2e8 ; branch 0x4d0b0
04e7f0: ldxdw r9, [r10 - 0x488]
04e7f8: ldxdw r6, [r10 - 0x518]
04e800: ja -0x2eb ; branch 0x4d0b0
04e808: mov64 r1, r10
04e810: add64 r1, -0x18
04e818: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
04e828: call 0x4d79 ; call 0x753f8
04e830: mov64 r1, r10
04e838: add64 r1, -0x370
04e840: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
04e850: call -0x8c17 ; call 0x87a0
04e858: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04e868: stxdw [r10 - 0x2a8], r1
04e870: ldxdw r1, [r10 - 0x8]
04e878: stxdw [r10 - 0x280], r1
04e880: ldxdw r1, [r10 - 0x10]
04e888: stxdw [r10 - 0x288], r1
04e890: ldxdw r1, [r10 - 0x18]
04e898: stxdw [r10 - 0x290], r1
04e8a0: ldxdw r1, [r10 - 0x370]
04e8a8: stxdw [r10 - 0x278], r1
04e8b0: ldxdw r1, [r10 - 0x368]
04e8b8: stxdw [r10 - 0x270], r1
04e8c0: ldxdw r1, [r10 - 0x360]
04e8c8: stxdw [r10 - 0x268], r1
04e8d0: stw [r10 - 0x218], 0x1787
04e8d8: stb [r10 - 0x260], 0x2
04e8e0: stw [r10 - 0x298], 0x1f6
04e8e8: stdw [r10 - 0x2a0], 0x2f
04e8f0: stdw [r10 - 0x2b0], 0x0
04e8f8: mov64 r1, r10
04e900: add64 r1, -0x4a0
04e908: mov64 r2, r10
04e910: add64 r2, -0x2b0
04e918: call 0x168d3 ; call 0x102fb8
04e920: ldxdw r2, [r10 - 0x498]
04e928: ldxdw r1, [r10 - 0x4a0]
04e930: call -0x89b3 ; call 0x9ba0
04e938: stxdw [r10 - 0x2e8], r6
04e940: mov64 r1, r10
04e948: add64 r1, -0x4b0
04e950: mov64 r2, r10
04e958: add64 r2, -0x330
04e960: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04e970: lddw r4, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04e980: call -0x941a ; call 0x48b8
04e988: ldxdw r8, [r10 - 0x4b0]
04e990: jeq r8, 0x2, +0x1 ; branch 0x4e9a0
04e998: ja +0x17 ; branch 0x4ea58
04e9a0: ldxdw r2, [r10 - 0x520]
04e9a8: ldxdw r1, [r2 + 0x18]
04e9b0: stxdw [r10 - 0x298], r1
04e9b8: ldxdw r1, [r2 + 0x10]
04e9c0: stxdw [r10 - 0x2a0], r1
04e9c8: ldxdw r1, [r2 + 0x8]
04e9d0: stxdw [r10 - 0x2a8], r1
04e9d8: ldxdw r1, [r2 + 0x0]
04e9e0: stxdw [r10 - 0x2b0], r1
04e9e8: mov64 r1, r10
04e9f0: add64 r1, -0x4c0
04e9f8: mov64 r4, r10
04ea00: add64 r4, -0x2b0
04ea08: mov64 r8, 0x2
04ea10: ldxdw r2, [r10 - 0x528]
04ea18: ldxdw r3, [r10 - 0x570]
04ea20: mov64 r5, 0x2
04ea28: call 0xc ; call 0x4ea90
04ea30: ldxdw r1, [r10 - 0x4c0]
04ea38: jeq r1, 0x2, +0x1 ; branch 0x4ea48
04ea40: ja +0x5 ; branch 0x4ea70
04ea48: ldxdw r6, [r10 - 0x518]
04ea50: ja -0x335 ; branch 0x4d0b0
04ea58: ldxdw r9, [r10 - 0x4a8]
04ea60: ldxdw r6, [r10 - 0x518]
04ea68: ja -0x338 ; branch 0x4d0b0
04ea70: ldxdw r9, [r10 - 0x4b8]
04ea78: mov64 r8, r1
04ea80: ldxdw r6, [r10 - 0x518]
04ea88: ja -0x33c ; branch 0x4d0b0
