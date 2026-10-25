0950e0: mov64 r7, r3
0950e8: mov64 r6, r1
0950f0: mov64 r1, r10
0950f8: add64 r1, -0x110
095100: call -0x5c ; direct target 0x94e28
095108: ldxdw r1, [r10 - 0x110]
095110: jne r1, 0x2, +0x25 ; branch 0x95240
095118: ldxdw r1, [r10 - 0x108]
095120: jlt r7, r1, +0x1 ; branch 0x95130
095128: ja +0x24 ; branch 0x95250
095130: mov64 r1, r10
095138: add64 r1, -0x70
095140: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
095150: call 0x18445 ; direct target 0x157380
095158: stdw [r10 - 0x48], 0x0
095160: stdw [r10 - 0x50], 0x1
095168: stdw [r10 - 0x58], 0x0
095170: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
095180: stxdw [r10 - 0x18], r1
095188: mov64 r1, r10
095190: add64 r1, -0x58
095198: stxdw [r10 - 0x20], r1
0951a0: stb [r10 - 0x8], 0x3
0951a8: stdw [r10 - 0x10], 0x20
0951b0: stdw [r10 - 0x30], 0x0
0951b8: stdw [r10 - 0x40], 0x0
0951c0: mov64 r2, r10
0951c8: add64 r2, -0x40
0951d0: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
0951e0: call 0x19194 ; direct target 0x15de88
0951e8: jeq r0, 0x0, +0x10 ; branch 0x95270
0951f0: mov64 r3, r10
0951f8: add64 r3, -0x110
095200: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
095210: mov64 r2, 0x37
095218: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
095228: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
095238: call 0x22f7b ; direct target 0x1ace18
095240: ldxdw r2, [r10 - 0x108]
095248: ja +0x1f ; branch 0x95348
095250: sub64 r7, r1
095258: stxdw [r6 + 0x8], r7
095260: stdw [r6 + 0x0], 0x2
095268: ja +0x1d ; branch 0x95358
095270: ldxdw r1, [r10 - 0x48]
095278: stxdw [r10 - 0xc8], r1
095280: ldxdw r1, [r10 - 0x50]
095288: stxdw [r10 - 0xd0], r1
095290: ldxdw r1, [r10 - 0x58]
095298: stxdw [r10 - 0xd8], r1
0952a0: ldxdw r1, [r10 - 0x70]
0952a8: stxdw [r10 - 0xf0], r1
0952b0: ldxdw r1, [r10 - 0x68]
0952b8: stxdw [r10 - 0xe8], r1
0952c0: ldxdw r1, [r10 - 0x60]
0952c8: stxdw [r10 - 0xe0], r1
0952d0: lddw r1, 0x1b729f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/util/transfer_fee.rsprograms/pump/src/lib.rsbuyback_fee never exceeds protocol_fee'
0952e0: stxdw [r10 - 0x108], r1
0952e8: stw [r10 - 0x78], 0x1788
0952f0: stb [r10 - 0xc0], 0x2
0952f8: stw [r10 - 0xf8], 0x38
095300: stdw [r10 - 0x100], 0x26
095308: stdw [r10 - 0x110], 0x0
095310: mov64 r1, r10
095318: add64 r1, -0x120
095320: mov64 r2, r10
095328: add64 r2, -0x110
095330: call 0x20cff ; direct target 0x19bb30
095338: ldxdw r1, [r10 - 0x120]
095340: ldxdw r2, [r10 - 0x118]
095348: stxdw [r6 + 0x8], r2
095350: stxdw [r6 + 0x0], r1
095358: exit
