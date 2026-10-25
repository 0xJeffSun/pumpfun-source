07e0b0: mov64 r6, r1
07e0b8: and64 r2, 0xff
07e0c0: jne r2, 0x0, +0x1d ; branch 0x7e1b0
07e0c8: mov64 r1, 0x2
07e0d0: jne r4, 0x0, +0x74 ; branch 0x7e478
07e0d8: and64 r3, 0xff
07e0e0: jeq r3, 0x0, +0x72 ; branch 0x7e478
07e0e8: mov64 r1, r10
07e0f0: add64 r1, -0x78
07e0f8: lddw r2, 0x1b5dc4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x007\x00\x00\x003\x00\x00\x00n\x00\x00\x00C\x00\x00\x00'
07e108: call 0x1b24e ; direct target 0x157380
07e110: stdw [r10 - 0x50], 0x0
07e118: stdw [r10 - 0x58], 0x1
07e120: stdw [r10 - 0x60], 0x0
07e128: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
07e138: stxdw [r10 - 0x20], r1
07e140: mov64 r1, r10
07e148: add64 r1, -0x60
07e150: stxdw [r10 - 0x28], r1
07e158: stb [r10 - 0x10], 0x3
07e160: stdw [r10 - 0x18], 0x20
07e168: stdw [r10 - 0x38], 0x0
07e170: stdw [r10 - 0x48], 0x0
07e178: mov64 r2, r10
07e180: add64 r2, -0x48
07e188: lddw r1, 0x1b5dc4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x007\x00\x00\x003\x00\x00\x00n\x00\x00\x00C\x00\x00\x00'
07e198: call 0x1bf9d ; direct target 0x15de88
07e1a0: jeq r0, 0x0, +0x3f ; branch 0x7e3a0
07e1a8: ja +0x18 ; branch 0x7e270
07e1b0: mov64 r1, r10
07e1b8: add64 r1, -0x78
07e1c0: lddw r2, 0x1b5db0 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x05\x00\x00\x00\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind'
07e1d0: call 0x1b235 ; direct target 0x157380
07e1d8: stdw [r10 - 0x50], 0x0
07e1e0: stdw [r10 - 0x58], 0x1
07e1e8: stdw [r10 - 0x60], 0x0
07e1f0: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
07e200: stxdw [r10 - 0x20], r1
07e208: mov64 r1, r10
07e210: add64 r1, -0x60
07e218: stxdw [r10 - 0x28], r1
07e220: stb [r10 - 0x10], 0x3
07e228: stdw [r10 - 0x18], 0x20
07e230: stdw [r10 - 0x38], 0x0
07e238: stdw [r10 - 0x48], 0x0
07e240: mov64 r2, r10
07e248: add64 r2, -0x48
07e250: lddw r1, 0x1b5db0 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x05\x00\x00\x00\x04\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00J\x00\x00\x00^\x00\x00\x00A\x00\x00\x00pool4\x00\x00\x00j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind'
07e260: call 0x1bf84 ; direct target 0x15de88
07e268: jeq r0, 0x0, +0xa ; branch 0x7e2c0
07e270: mov64 r3, r10
07e278: add64 r3, -0x1
07e280: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
07e290: mov64 r2, 0x37
07e298: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
07e2a8: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
07e2b8: call 0x25d6b ; direct target 0x1ace18
07e2c0: ldxdw r1, [r10 - 0x50]
07e2c8: stxdw [r10 - 0xd0], r1
07e2d0: ldxdw r1, [r10 - 0x58]
07e2d8: stxdw [r10 - 0xd8], r1
07e2e0: ldxdw r1, [r10 - 0x60]
07e2e8: stxdw [r10 - 0xe0], r1
07e2f0: ldxdw r1, [r10 - 0x78]
07e2f8: stxdw [r10 - 0xf8], r1
07e300: ldxdw r1, [r10 - 0x70]
07e308: stxdw [r10 - 0xf0], r1
07e310: ldxdw r1, [r10 - 0x68]
07e318: stxdw [r10 - 0xe8], r1
07e320: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
07e330: stxdw [r10 - 0x110], r1
07e338: stw [r10 - 0x80], 0x1775
07e340: stb [r10 - 0xc8], 0x2
07e348: stw [r10 - 0x100], 0x95
07e350: stdw [r10 - 0x108], 0x1d
07e358: stdw [r10 - 0x118], 0x0
07e360: mov64 r1, r10
07e368: add64 r1, -0x128
07e370: mov64 r2, r10
07e378: add64 r2, -0x118
07e380: call 0x23af5 ; direct target 0x19bb30
07e388: ldxdw r2, [r10 - 0x120]
07e390: ldxdw r1, [r10 - 0x128]
07e398: ja +0x1b ; branch 0x7e478
07e3a0: ldxdw r1, [r10 - 0x50]
07e3a8: stxdw [r10 - 0xd0], r1
07e3b0: ldxdw r1, [r10 - 0x58]
07e3b8: stxdw [r10 - 0xd8], r1
07e3c0: ldxdw r1, [r10 - 0x60]
07e3c8: stxdw [r10 - 0xe0], r1
07e3d0: ldxdw r1, [r10 - 0x78]
07e3d8: stxdw [r10 - 0xf8], r1
07e3e0: ldxdw r1, [r10 - 0x70]
07e3e8: stxdw [r10 - 0xf0], r1
07e3f0: ldxdw r1, [r10 - 0x68]
07e3f8: stxdw [r10 - 0xe8], r1
07e400: lddw r1, 0x1b723b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/trade_v3.rsprograms/pump/src/util/constant_product.rsprograms/pump/src/util/fee.rs'
07e410: stxdw [r10 - 0x110], r1
07e418: stw [r10 - 0x80], 0x17ce
07e420: stb [r10 - 0xc8], 0x2
07e428: stw [r10 - 0x100], 0x96
07e430: stdw [r10 - 0x108], 0x1d
07e438: stdw [r10 - 0x118], 0x0
07e440: mov64 r1, r10
07e448: add64 r1, -0x138
07e450: mov64 r2, r10
07e458: add64 r2, -0x118
07e460: call 0x23ad9 ; direct target 0x19bb30
07e468: ldxdw r2, [r10 - 0x130]
07e470: ldxdw r1, [r10 - 0x138]
07e478: stxdw [r6 + 0x8], r2
07e480: stxdw [r6 + 0x0], r1
07e488: exit
