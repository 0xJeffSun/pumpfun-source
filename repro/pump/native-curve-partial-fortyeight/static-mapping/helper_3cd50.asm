03cd50: ldxdw r7, [r2 + 0x0]
03cd58: ldxdw r8, [r7 + 0x8]
03cd60: ldxdw r0, [r8 + 0x0]
03cd68: add64 r0, 0x1
03cd70: mov64 r5, 0x1
03cd78: jeq r0, 0x0, +0x1 ; branch 0x3cd88
03cd80: mov64 r5, 0x0
03cd88: ldxdw r6, [r7 + 0x0]
03cd90: stxdw [r8 + 0x0], r0
03cd98: jne r5, 0x1, +0x1 ; branch 0x3cda8
03cda0: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
03cda8: ldxdw r9, [r7 + 0x10]
03cdb0: ldxdw r0, [r9 + 0x0]
03cdb8: add64 r0, 0x1
03cdc0: mov64 r5, 0x1
03cdc8: jeq r0, 0x0, +0x1 ; branch 0x3cdd8
03cdd0: mov64 r5, 0x0
03cdd8: stxdw [r10 - 0x98], r2
03cde0: stxdw [r10 - 0x90], r3
03cde8: stxdw [r10 - 0x88], r4
03cdf0: stxdw [r10 - 0xa0], r1
03cdf8: stxdw [r9 + 0x0], r0
03ce00: jne r5, 0x1, +0x1 ; branch 0x3ce10
03ce08: ja -0xe ; branch 0x3cda0
03ce10: ldxdw r2, [r7 + 0x18]
03ce18: ldxdw r3, [r7 + 0x20]
03ce20: ldxb r4, [r7 + 0x28]
03ce28: ldxb r5, [r7 + 0x29]
03ce30: ldxb r0, [r7 + 0x2a]
03ce38: stxb [r10 - 0x1e], r0
03ce40: stxb [r10 - 0x1f], r5
03ce48: stxb [r10 - 0x20], r4
03ce50: stxdw [r10 - 0x28], r3
03ce58: stxdw [r10 - 0x30], r2
03ce60: stxdw [r10 - 0x38], r9
03ce68: stxdw [r10 - 0x48], r6
03ce70: stxdw [r10 - 0x40], r8
03ce78: mov64 r1, r10
03ce80: add64 r1, -0x48
03ce88: call 0x2cb7b ; direct target 0x1a2a68
03ce90: mov64 r6, r0
03ce98: ldxdw r1, [r8 + 0x0]
03cea0: add64 r1, -0x1
03cea8: stxdw [r8 + 0x0], r1
03ceb0: jne r1, 0x0, +0x3 ; branch 0x3ced0
03ceb8: ldxdw r1, [r8 + 0x8]
03cec0: add64 r1, -0x1
03cec8: stxdw [r8 + 0x8], r1
03ced0: ldxdw r1, [r9 + 0x0]
03ced8: add64 r1, -0x1
03cee0: stxdw [r9 + 0x0], r1
03cee8: ldxdw r4, [r10 - 0x88]
03cef0: ldxdw r2, [r10 - 0x98]
03cef8: jne r1, 0x0, +0x3 ; branch 0x3cf18
03cf00: ldxdw r1, [r9 + 0x8]
03cf08: add64 r1, -0x1
03cf10: stxdw [r9 + 0x8], r1
03cf18: mov64 r5, r6
03cf20: jgt r6, 0xa6, +0x1 ; branch 0x3cf30
03cf28: mov64 r5, 0xa6
03cf30: mov64 r1, r10
03cf38: add64 r1, -0x70
03cf40: ldxdw r3, [r10 - 0x90]
03cf48: call 0x60 ; direct target 0x3d250
03cf50: ldxdw r1, [r10 - 0x68]
03cf58: ldxdw r8, [r10 - 0x70]
03cf60: jne r8, 0x2, +0x59 ; branch 0x3d230
03cf68: mov64 r8, 0x2
03cf70: jgt r6, 0xa5, +0x57 ; branch 0x3d230
03cf78: ldxdw r6, [r7 + 0x8]
03cf80: ldxdw r2, [r6 + 0x0]
03cf88: add64 r2, 0x1
03cf90: mov64 r3, 0x1
03cf98: jeq r2, 0x0, +0x1 ; branch 0x3cfa8
03cfa0: mov64 r3, 0x0
03cfa8: ldxdw r1, [r7 + 0x0]
03cfb0: stxdw [r6 + 0x0], r2
03cfb8: jne r3, 0x1, +0x1 ; branch 0x3cfc8
03cfc0: ja -0x45 ; branch 0x3cda0
03cfc8: ldxdw r9, [r7 + 0x10]
03cfd0: ldxdw r2, [r9 + 0x0]
03cfd8: add64 r2, 0x1
03cfe0: mov64 r3, 0x1
03cfe8: jeq r2, 0x0, +0x1 ; branch 0x3cff8
03cff0: mov64 r3, 0x0
03cff8: stxdw [r9 + 0x0], r2
03d000: jne r3, 0x1, +0x1 ; branch 0x3d010
03d008: ja -0x4e ; branch 0x3cda0
03d010: ldxdw r2, [r7 + 0x18]
03d018: ldxdw r3, [r7 + 0x20]
03d020: ldxb r4, [r7 + 0x28]
03d028: ldxb r5, [r7 + 0x29]
03d030: ldxb r0, [r7 + 0x2a]
03d038: stxb [r10 - 0x1e], r0
03d040: stxb [r10 - 0x1f], r5
03d048: stxb [r10 - 0x20], r4
03d050: stxdw [r10 - 0x28], r3
03d058: stxdw [r10 - 0x30], r2
03d060: stxdw [r10 - 0x38], r9
03d068: stxdw [r10 - 0x40], r6
03d070: stxdw [r10 - 0x48], r1
03d078: mov64 r1, r10
03d080: add64 r1, -0x60
03d088: mov64 r2, r10
03d090: add64 r2, -0x48
03d098: mov64 r3, 0xa6
03d0a0: mov64 r4, 0x0
03d0a8: call 0x2cba0 ; direct target 0x1a2db0
03d0b0: lddw r1, -0x7fffffffffffffe6
03d0c0: ldxdw r2, [r10 - 0x60]
03d0c8: jne r2, r1, +0xf ; branch 0x3d148
03d0d0: ldxdw r1, [r6 + 0x0]
03d0d8: add64 r1, -0x1
03d0e0: stxdw [r6 + 0x0], r1
03d0e8: jne r1, 0x0, +0x3 ; branch 0x3d108
03d0f0: ldxdw r1, [r6 + 0x8]
03d0f8: add64 r1, -0x1
03d100: stxdw [r6 + 0x8], r1
03d108: ldxdw r1, [r9 + 0x0]
03d110: add64 r1, -0x1
03d118: stxdw [r9 + 0x0], r1
03d120: jne r1, 0x0, +0x3 ; branch 0x3d140
03d128: ldxdw r1, [r9 + 0x8]
03d130: add64 r1, -0x1
03d138: stxdw [r9 + 0x8], r1
03d140: ja +0x1d ; branch 0x3d230
03d148: ldxdw r1, [r10 - 0x50]
03d150: stxdw [r10 - 0x8], r1
03d158: ldxdw r1, [r10 - 0x58]
03d160: stxdw [r10 - 0x10], r1
03d168: ldxdw r1, [r10 - 0x60]
03d170: stxdw [r10 - 0x18], r1
03d178: mov64 r1, r10
03d180: add64 r1, -0x80
03d188: mov64 r2, r10
03d190: add64 r2, -0x18
03d198: call 0x2bd43 ; direct target 0x19bbb8
03d1a0: ldxdw r1, [r10 - 0x78]
03d1a8: ldxdw r2, [r10 - 0x38]
03d1b0: ldxdw r8, [r10 - 0x80]
03d1b8: ldxdw r3, [r10 - 0x40]
03d1c0: ldxdw r4, [r3 + 0x0]
03d1c8: add64 r4, -0x1
03d1d0: stxdw [r3 + 0x0], r4
03d1d8: jne r4, 0x0, +0x3 ; branch 0x3d1f8
03d1e0: ldxdw r4, [r3 + 0x8]
03d1e8: add64 r4, -0x1
03d1f0: stxdw [r3 + 0x8], r4
03d1f8: ldxdw r3, [r2 + 0x0]
03d200: add64 r3, -0x1
03d208: stxdw [r2 + 0x0], r3
03d210: jne r3, 0x0, +0x3 ; branch 0x3d230
03d218: ldxdw r3, [r2 + 0x8]
03d220: add64 r3, -0x1
03d228: stxdw [r2 + 0x8], r3
03d230: ldxdw r2, [r10 - 0xa0]
03d238: stxdw [r2 + 0x8], r1
03d240: stxdw [r2 + 0x0], r8
03d248: exit
