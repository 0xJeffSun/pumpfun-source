094e28: mov64 r6, r1
094e30: ldxdw r1, [r2 + 0x0]
094e38: jne r1, 0x0, +0x3 ; branch 0x94e58
094e40: stdw [r6 + 0x0], 0x2
094e48: stdw [r6 + 0x8], 0x0
094e50: ja +0x50 ; branch 0x950d8
094e58: ldxdw r1, [r2 + 0x18]
094e60: stxdw [r10 - 0x118], r1
094e68: ldxdw r1, [r2 + 0x10]
094e70: stxdw [r10 - 0x120], r1
094e78: ldxdw r1, [r2 + 0x8]
094e80: stxdw [r10 - 0x128], r1
094e88: mov64 r1, r10
094e90: add64 r1, -0x138
094e98: mov64 r2, r10
094ea0: add64 r2, -0x128
094ea8: call 0x1cea5 ; direct target 0x17c3d8
094eb0: ldxdw r1, [r10 - 0x138]
094eb8: jeq r1, 0x0, +0x4 ; branch 0x94ee0
094ec0: ldxdw r1, [r10 - 0x130]
094ec8: stxdw [r6 + 0x8], r1
094ed0: stdw [r6 + 0x0], 0x2
094ed8: ja +0x3f ; branch 0x950d8
094ee0: mov64 r1, r10
094ee8: add64 r1, -0x70
094ef0: lddw r2, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
094f00: call 0x1848f ; direct target 0x157380
094f08: stdw [r10 - 0x48], 0x0
094f10: stdw [r10 - 0x50], 0x1
094f18: stdw [r10 - 0x58], 0x0
094f20: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
094f30: stxdw [r10 - 0x18], r1
094f38: mov64 r1, r10
094f40: add64 r1, -0x58
094f48: stxdw [r10 - 0x20], r1
094f50: stb [r10 - 0x8], 0x3
094f58: stdw [r10 - 0x10], 0x20
094f60: stdw [r10 - 0x30], 0x0
094f68: stdw [r10 - 0x40], 0x0
094f70: mov64 r2, r10
094f78: add64 r2, -0x40
094f80: lddw r1, 0x1b5efc ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00'
094f90: call 0x191de ; direct target 0x15de88
094f98: jeq r0, 0x0, +0xa ; branch 0x94ff0
094fa0: mov64 r3, r10
094fa8: add64 r3, -0x110
094fb0: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
094fc0: mov64 r2, 0x37
094fc8: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
094fd8: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
094fe8: call 0x22fc5 ; direct target 0x1ace18
094ff0: ldxdw r1, [r10 - 0x48]
094ff8: stxdw [r10 - 0xc8], r1
095000: ldxdw r1, [r10 - 0x50]
095008: stxdw [r10 - 0xd0], r1
095010: ldxdw r1, [r10 - 0x58]
095018: stxdw [r10 - 0xd8], r1
095020: ldxdw r1, [r10 - 0x70]
095028: stxdw [r10 - 0xf0], r1
095030: ldxdw r1, [r10 - 0x68]
095038: stxdw [r10 - 0xe8], r1
095040: ldxdw r1, [r10 - 0x60]
095048: stxdw [r10 - 0xe0], r1
095050: lddw r1, 0x1b729f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/util/transfer_fee.rsprograms/pump/src/lib.rsbuyback_fee never exceeds protocol_fee'
095060: stxdw [r10 - 0x108], r1
095068: stw [r10 - 0x78], 0x1788
095070: stb [r10 - 0xc0], 0x2
095078: stw [r10 - 0xf8], 0x30
095080: stdw [r10 - 0x100], 0x26
095088: stdw [r10 - 0x110], 0x0
095090: mov64 r1, r10
095098: add64 r1, -0x148
0950a0: mov64 r2, r10
0950a8: add64 r2, -0x110
0950b0: call 0x20d4f ; direct target 0x19bb30
0950b8: ldxdw r1, [r10 - 0x148]
0950c0: ldxdw r2, [r10 - 0x140]
0950c8: stxdw [r6 + 0x8], r2
0950d0: stxdw [r6 + 0x0], r1
0950d8: exit
