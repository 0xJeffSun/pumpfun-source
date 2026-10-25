058bf0: mov64 r6, r3
058bf8: mov64 r7, r2
058c00: mov64 r9, r1
058c08: mov64 r8, r10
058c10: add64 r8, -0x110
058c18: mov64 r1, r8
058c20: mov64 r2, r6
058c28: stxdw [r10 - 0x140], r4
058c30: mov64 r3, r4
058c38: stxdw [r10 - 0x138], r5
058c40: mov64 r4, r5
058c48: call 0x280b2 ; direct target 0x1991e0
058c50: mov64 r1, r7
058c58: mov64 r2, r8
058c60: mov64 r3, 0x20
058c68: call 0x2b541 ; direct target 0x1b3678
058c70: mov64 r1, 0x2
058c78: lsh64 r0, 0x20
058c80: rsh64 r0, 0x20
058c88: jeq r0, 0x0, +0x56 ; branch 0x58f40
058c90: stxdw [r10 - 0x148], r9
058c98: mov64 r1, r10
058ca0: add64 r1, -0x70
058ca8: lddw r2, 0x1b5e9c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00k\x00\x00\x002\x00\x00\x00\x1d\x00\x00\x00l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00'
058cb8: call 0x28b4e ; direct target 0x19e730
058cc0: stdw [r10 - 0x48], 0x0
058cc8: stdw [r10 - 0x50], 0x1
058cd0: stdw [r10 - 0x58], 0x0
058cd8: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
058ce8: stxdw [r10 - 0x18], r1
058cf0: mov64 r1, r10
058cf8: add64 r1, -0x58
058d00: stxdw [r10 - 0x20], r1
058d08: stb [r10 - 0x8], 0x3
058d10: stdw [r10 - 0x10], 0x20
058d18: stdw [r10 - 0x30], 0x0
058d20: stdw [r10 - 0x40], 0x0
058d28: mov64 r2, r10
058d30: add64 r2, -0x40
058d38: lddw r1, 0x1b5e9c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00k\x00\x00\x002\x00\x00\x00\x1d\x00\x00\x00l\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00'
058d48: call 0x28d04 ; direct target 0x19f570
058d50: jeq r0, 0x0, +0xa ; branch 0x58da8
058d58: mov64 r3, r10
058d60: add64 r3, -0x110
058d68: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
058d78: mov64 r2, 0x37
058d80: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
058d90: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
058da0: call 0x2a80e ; direct target 0x1ace18
058da8: ldxdw r1, [r10 - 0x48]
058db0: stxdw [r10 - 0xc8], r1
058db8: ldxdw r1, [r10 - 0x50]
058dc0: stxdw [r10 - 0xd0], r1
058dc8: ldxdw r1, [r10 - 0x58]
058dd0: stxdw [r10 - 0xd8], r1
058dd8: ldxdw r1, [r10 - 0x70]
058de0: stxdw [r10 - 0xf0], r1
058de8: ldxdw r1, [r10 - 0x68]
058df0: stxdw [r10 - 0xe8], r1
058df8: ldxdw r1, [r10 - 0x60]
058e00: stxdw [r10 - 0xe0], r1
058e08: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
058e18: stxdw [r10 - 0x108], r1
058e20: stw [r10 - 0x78], 0x7d6
058e28: stb [r10 - 0xc0], 0x2
058e30: stw [r10 - 0xf8], 0x171
058e38: stdw [r10 - 0x100], 0x29
058e40: stdw [r10 - 0x110], 0x0
058e48: mov64 r1, r10
058e50: add64 r1, -0x120
058e58: mov64 r2, r10
058e60: add64 r2, -0x110
058e68: call 0x28598 ; direct target 0x19bb30
058e70: ldxdw r8, [r10 - 0x118]
058e78: ldxdw r9, [r10 - 0x120]
058e80: mov64 r1, r10
058e88: add64 r1, -0xf0
058e90: mov64 r2, r6
058e98: ldxdw r3, [r10 - 0x140]
058ea0: ldxdw r4, [r10 - 0x138]
058ea8: call 0x28066 ; direct target 0x1991e0
058eb0: ldxdw r1, [r7 + 0x18]
058eb8: stxdw [r10 - 0xf8], r1
058ec0: ldxdw r1, [r7 + 0x10]
058ec8: stxdw [r10 - 0x100], r1
058ed0: ldxdw r1, [r7 + 0x8]
058ed8: stxdw [r10 - 0x108], r1
058ee0: ldxdw r1, [r7 + 0x0]
058ee8: stxdw [r10 - 0x110], r1
058ef0: mov64 r1, r10
058ef8: add64 r1, -0x130
058f00: mov64 r4, r10
058f08: add64 r4, -0x110
058f10: mov64 r2, r9
058f18: mov64 r3, r8
058f20: call 0x28652 ; direct target 0x19c1b8
058f28: ldxdw r2, [r10 - 0x128]
058f30: ldxdw r1, [r10 - 0x130]
058f38: ldxdw r9, [r10 - 0x148]
058f40: stxdw [r9 + 0x8], r2
058f48: stxdw [r9 + 0x0], r1
058f50: exit
