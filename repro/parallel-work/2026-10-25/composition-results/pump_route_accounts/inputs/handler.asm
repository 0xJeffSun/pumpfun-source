0567d8: mov64 r9, r3
0567e0: mov64 r6, r1
0567e8: jeq r9, 0x0, +0x45 ; branch 0x56a18
0567f0: ldxdw r5, [r2 + 0x18]
0567f8: jlt r5, 0x5, +0x2a ; branch 0x56950
056800: mov64 r0, r5
056808: div64 r0, 0x5
056810: mov64 r1, r0
056818: mul64 r1, 0x5
056820: jeq r1, r5, +0x1 ; branch 0x56830
056828: ja +0x24 ; branch 0x56950
056830: ldxdw r1, [r4 + 0x10]
056838: jne r1, r0, +0x9 ; branch 0x56888
056840: ldxdw r8, [r2 + 0x10]
056848: ldxdw r3, [r4 + 0x8]
056850: mov64 r1, r0
056858: stxdw [r10 - 0x2b8], r3
056860: jeq r1, 0x0, +0xb5 ; branch 0x56e10
056868: add64 r1, -0x1
056870: ldxb r4, [r3 + 0x0]
056878: add64 r3, 0x1
056880: jlt r4, 0x4, -0x5 ; branch 0x56860
056888: mov64 r1, r10
056890: add64 r1, -0xd8
056898: lddw r2, 0x1b5dd4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x007\x00\x00\x003\x00\x00\x00n\x00\x00\x00C\x00\x00\x00fromkind`\x00\x00\x00\x14\x00\x00\x00'
0568a8: call 0x2015a ; direct target 0x157380
0568b0: stdw [r10 - 0xf0], 0x0
0568b8: stdw [r10 - 0xf8], 0x1
0568c0: stdw [r10 - 0x100], 0x0
0568c8: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0568d8: stxdw [r10 - 0x178], r1
0568e0: mov64 r1, r10
0568e8: add64 r1, -0x100
0568f0: stxdw [r10 - 0x180], r1
0568f8: stb [r10 - 0x168], 0x3
056900: stdw [r10 - 0x170], 0x20
056908: stdw [r10 - 0x190], 0x0
056910: stdw [r10 - 0x1a0], 0x0
056918: mov64 r2, r10
056920: add64 r2, -0x1a0
056928: lddw r1, 0x1b5dd4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'j\x00\x00\x00$\x00\x00\x00&\x00\x00\x00codeF\x00\x00\x00\xca\t\x00\x00\x0c\x00\x00\x00\xc4\x0b\x00\x00R\x00\x00\x00\x1c\x00\x00\x00\x0f\x00\x00\x00K\x00\x00\x00\x1e\x00\x00\x00[\x00\x00\x00"\x00\x00\x00Kind-\x00\x00\x007\x00\x00\x003\x00\x00\x00n\x00\x00\x00C\x00\x00\x00fromkind`\x00\x00\x00\x14\x00\x00\x00'
056938: call 0x20ea9 ; direct target 0x15de88
056940: jeq r0, 0x0, +0x7a ; branch 0x56d18
056948: ja +0x31 ; branch 0x56ad8
056950: mov64 r1, r10
056958: add64 r1, -0xd8
056960: lddw r2, 0x1b5f20 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod'
056970: call 0x20141 ; direct target 0x157380
056978: stdw [r10 - 0xf0], 0x0
056980: stdw [r10 - 0xf8], 0x1
056988: stdw [r10 - 0x100], 0x0
056990: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
0569a0: stxdw [r10 - 0x178], r1
0569a8: mov64 r1, r10
0569b0: add64 r1, -0x100
0569b8: stxdw [r10 - 0x180], r1
0569c0: stb [r10 - 0x168], 0x3
0569c8: stdw [r10 - 0x170], 0x20
0569d0: stdw [r10 - 0x190], 0x0
0569d8: stdw [r10 - 0x1a0], 0x0
0569e0: mov64 r2, r10
0569e8: add64 r2, -0x1a0
0569f0: lddw r1, 0x1b5f20 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00Z\x00\x00\x00\x1a\x00\x00\x00H\x00\x00\x00a\x00\x00\x00\x06\x10\x00\x00c\x00\x00\x00I\x00\x00\x00!\x00\x00\x00src/lib.rssrc/de/mod'
056a00: call 0x20e90 ; direct target 0x15de88
056a08: jeq r0, 0x0, +0x45 ; branch 0x56c38
056a10: ja +0x18 ; branch 0x56ad8
056a18: mov64 r1, r10
056a20: add64 r1, -0xd8
056a28: lddw r2, 0x1b5e34 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x14\x00\x00\x00\x13\x00\x00\x00U\x00\x00\x00D\x00\x00\x00:\x00\x00\x00?\x00\x00\x00_\x00\x00\x00]\x00\x00\x00g\x00\x00\x009\x00\x00\x00\x05\x10\x00\x00B\x00\x00\x00E\x00\x00\x00userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00'
056a38: call 0x20128 ; direct target 0x157380
056a40: stdw [r10 - 0xf0], 0x0
056a48: stdw [r10 - 0xf8], 0x1
056a50: stdw [r10 - 0x100], 0x0
056a58: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
056a68: stxdw [r10 - 0x178], r1
056a70: mov64 r1, r10
056a78: add64 r1, -0x100
056a80: stxdw [r10 - 0x180], r1
056a88: stb [r10 - 0x168], 0x3
056a90: stdw [r10 - 0x170], 0x20
056a98: stdw [r10 - 0x190], 0x0
056aa0: stdw [r10 - 0x1a0], 0x0
056aa8: mov64 r2, r10
056ab0: add64 r2, -0x1a0
056ab8: lddw r1, 0x1b5e34 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x14\x00\x00\x00\x13\x00\x00\x00U\x00\x00\x00D\x00\x00\x00:\x00\x00\x00?\x00\x00\x00_\x00\x00\x00]\x00\x00\x00g\x00\x00\x009\x00\x00\x00\x05\x10\x00\x00B\x00\x00\x00E\x00\x00\x00userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00'
056ac8: call 0x20e77 ; direct target 0x15de88
056ad0: jeq r0, 0x0, +0xa ; branch 0x56b28
056ad8: mov64 r3, r10
056ae0: add64 r3, -0x118
056ae8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
056af8: mov64 r2, 0x37
056b00: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
056b10: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
056b20: call 0x2ac5e ; direct target 0x1ace18
056b28: ldxdw r1, [r10 - 0xf0]
056b30: stxdw [r10 - 0x58], r1
056b38: ldxdw r1, [r10 - 0xf8]
056b40: stxdw [r10 - 0x60], r1
056b48: ldxdw r1, [r10 - 0x100]
056b50: stxdw [r10 - 0x68], r1
056b58: ldxdw r1, [r10 - 0xd8]
056b60: stxdw [r10 - 0x80], r1
056b68: ldxdw r1, [r10 - 0xd0]
056b70: stxdw [r10 - 0x78], r1
056b78: ldxdw r1, [r10 - 0xc8]
056b80: stxdw [r10 - 0x70], r1
056b88: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
056b98: stxdw [r10 - 0x98], r1
056ba0: stw [r10 - 0x8], 0x1784
056ba8: stb [r10 - 0x50], 0x2
056bb0: stw [r10 - 0x88], 0xd0
056bb8: stdw [r10 - 0x90], 0x29
056bc0: stdw [r10 - 0xa0], 0x0
056bc8: mov64 r1, r10
056bd0: add64 r1, -0x230
056bd8: mov64 r2, r10
056be0: add64 r2, -0xa0
056be8: call 0x289e8 ; direct target 0x19bb30
056bf0: ldxdw r3, [r10 - 0x228]
056bf8: ldxdw r2, [r10 - 0x230]
056c00: mov64 r1, r10
056c08: add64 r1, -0x240
056c10: mov64 r4, 0x0
056c18: call -0xad1c ; direct target 0x340
056c20: ldxdw r1, [r10 - 0x240]
056c28: ldxdw r2, [r10 - 0x238]
056c30: ja +0x37 ; branch 0x56df0
056c38: ldxdw r1, [r10 - 0xf0]
056c40: stxdw [r10 - 0x58], r1
056c48: ldxdw r1, [r10 - 0xf8]
056c50: stxdw [r10 - 0x60], r1
056c58: ldxdw r1, [r10 - 0x100]
056c60: stxdw [r10 - 0x68], r1
056c68: ldxdw r1, [r10 - 0xd8]
056c70: stxdw [r10 - 0x80], r1
056c78: ldxdw r1, [r10 - 0xd0]
056c80: stxdw [r10 - 0x78], r1
056c88: ldxdw r1, [r10 - 0xc8]
056c90: stxdw [r10 - 0x70], r1
056c98: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
056ca8: stxdw [r10 - 0x98], r1
056cb0: stw [r10 - 0x8], 0x178b
056cb8: stb [r10 - 0x50], 0x2
056cc0: stw [r10 - 0x88], 0xd6
056cc8: stdw [r10 - 0x90], 0x29
056cd0: stdw [r10 - 0xa0], 0x0
056cd8: mov64 r1, r10
056ce0: add64 r1, -0x1d0
056ce8: mov64 r2, r10
056cf0: add64 r2, -0xa0
056cf8: call 0x289c6 ; direct target 0x19bb30
056d00: ldxdw r1, [r10 - 0x1d0]
056d08: ldxdw r2, [r10 - 0x1c8]
056d10: ja +0x1b ; branch 0x56df0
056d18: ldxdw r1, [r10 - 0xf0]
056d20: stxdw [r10 - 0x58], r1
056d28: ldxdw r1, [r10 - 0xf8]
056d30: stxdw [r10 - 0x60], r1
056d38: ldxdw r1, [r10 - 0x100]
056d40: stxdw [r10 - 0x68], r1
056d48: ldxdw r1, [r10 - 0xd8]
056d50: stxdw [r10 - 0x80], r1
056d58: ldxdw r1, [r10 - 0xd0]
056d60: stxdw [r10 - 0x78], r1
056d68: ldxdw r1, [r10 - 0xc8]
056d70: stxdw [r10 - 0x70], r1
056d78: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
056d88: stxdw [r10 - 0x98], r1
056d90: stw [r10 - 0x8], 0x17da
056d98: stb [r10 - 0x50], 0x2
056da0: stw [r10 - 0x88], 0xda
056da8: stdw [r10 - 0x90], 0x29
056db0: stdw [r10 - 0xa0], 0x0
056db8: mov64 r1, r10
056dc0: add64 r1, -0x1e0
056dc8: mov64 r2, r10
056dd0: add64 r2, -0xa0
056dd8: call 0x289aa ; direct target 0x19bb30
056de0: ldxdw r1, [r10 - 0x1e0]
056de8: ldxdw r2, [r10 - 0x1d8]
056df0: stxdw [r6 + 0x10], r2
056df8: stxdw [r6 + 0x8], r1
056e00: stdw [r6 + 0x0], 0x1
056e08: exit
056e10: stxdw [r10 - 0x328], r6
056e18: ldxdw r7, [r2 + 0x8]
056e20: ldxdw r1, [r7 + 0x28]
056e28: ldxdw r3, [r1 + 0x40]
056e30: stxdw [r10 - 0x1a8], r3
056e38: ldxdw r3, [r1 + 0x38]
056e40: stxdw [r10 - 0x1b0], r3
056e48: ldxdw r3, [r1 + 0x30]
056e50: stxdw [r10 - 0x1b8], r3
056e58: ldxdw r1, [r1 + 0x28]
056e60: stxdw [r10 - 0x1c0], r1
056e68: mov64 r6, 0x0
056e70: stb [r10 - 0x126], 0x2
056e78: jlt r5, 0x5, +0x36 ; branch 0x57030
056e80: mov64 r1, 0x0
056e88: stxdw [r10 - 0x248], r1
056e90: mov64 r1, 0x5
056e98: mov64 r3, r10
056ea0: add64 r3, -0x1b0
056ea8: stxdw [r10 - 0x310], r3
056eb0: mov64 r3, r10
056eb8: add64 r3, -0x155
056ec0: stxdw [r10 - 0x318], r3
056ec8: mov64 r3, r10
056ed0: add64 r3, -0x168
056ed8: stxdw [r10 - 0x320], r3
056ee0: mov64 r3, r10
056ee8: add64 r3, -0x45
056ef0: stxdw [r10 - 0x2e0], r3
056ef8: mov64 r3, r10
056f00: add64 r3, -0x58
056f08: stxdw [r10 - 0x2e8], r3
056f10: mov64 r3, r10
056f18: add64 r3, -0x90
056f20: stxdw [r10 - 0x2f0], r3
056f28: mov64 r3, r10
056f30: add64 r3, -0xe8
056f38: stxdw [r10 - 0x2c0], r3
056f40: mov64 r3, r10
056f48: add64 r3, -0x88
056f50: stxdw [r10 - 0x2c8], r3
056f58: mov64 r3, r0
056f60: add64 r3, -0x1
056f68: stxdw [r10 - 0x2d0], r3
056f70: ldxb r2, [r2 + 0x22]
056f78: stxdw [r10 - 0x2d8], r2
056f80: mov64 r3, 0x0
056f88: stxdw [r10 - 0x300], r7
056f90: stxdw [r10 - 0x2f8], r5
056f98: stxdw [r10 - 0x308], r0
056fa0: ja +0x4c ; branch 0x57208
056fa8: ldxdw r2, [r10 - 0x288]
056fb0: stxdw [r10 - 0x1c0], r2
056fb8: ldxdw r2, [r10 - 0x280]
056fc0: stxdw [r10 - 0x1b8], r2
056fc8: and64 r1, 0x1
056fd0: ldxdw r7, [r10 - 0x300]
056fd8: ldxdw r5, [r10 - 0x2f8]
056fe0: ldxdw r0, [r10 - 0x308]
056fe8: jne r1, 0x0, +0x15d ; branch 0x57ad8
056ff0: ldxdw r2, [r10 - 0x248]
056ff8: add64 r2, 0x1
057000: add64 r8, 0xf0
057008: ldxdw r1, [r10 - 0x260]
057010: add64 r1, 0x5
057018: mov64 r3, r6
057020: stxdw [r10 - 0x248], r2
057028: jlt r2, r0, +0x3b ; branch 0x57208
057030: ldxdw r2, [r7 + 0x30]
057038: add64 r2, 0x28
057040: mov64 r1, r10
057048: add64 r1, -0x1c0
057050: mov64 r3, 0x20
057058: call 0x2b8c3 ; direct target 0x1b3678
057060: lsh64 r0, 0x20
057068: rsh64 r0, 0x20
057070: jeq r0, 0x0, +0x121 ; branch 0x57980
057078: mov64 r1, r10
057080: add64 r1, -0x80
057088: lddw r2, 0x1b5eec ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00'
057098: call 0x2005c ; direct target 0x157380
0570a0: mov64 r1, r10
0570a8: add64 r1, -0x68
0570b0: lddw r2, 0x1b5eec ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00mint@\x00\x00\x00'
0570c0: call -0x98f2 ; direct target 0xa938
0570c8: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
0570d8: stxdw [r10 - 0x98], r1
0570e0: stb [r10 - 0x50], 0x2
0570e8: stw [r10 - 0x88], 0x106
0570f0: stdw [r10 - 0x90], 0x29
0570f8: stdw [r10 - 0xa0], 0x0
057100: stw [r10 - 0x8], 0x17d2
057108: mov64 r1, r10
057110: add64 r1, -0x210
057118: mov64 r2, r10
057120: add64 r2, -0xa0
057128: call 0x28940 ; direct target 0x19bb30
057130: ldxdw r3, [r10 - 0x208]
057138: ldxdw r2, [r10 - 0x210]
057140: ldxdw r1, [r10 - 0x1a8]
057148: stxdw [r10 - 0x88], r1
057150: ldxdw r1, [r10 - 0x1b0]
057158: stxdw [r10 - 0x90], r1
057160: ldxdw r1, [r10 - 0x1b8]
057168: stxdw [r10 - 0x98], r1
057170: ldxdw r1, [r10 - 0x1c0]
057178: stxdw [r10 - 0xa0], r1
057180: ldxdw r1, [r7 + 0x30]
057188: ldxdw r4, [r1 + 0x28]
057190: stxdw [r10 - 0x80], r4
057198: ldxdw r4, [r1 + 0x30]
0571a0: stxdw [r10 - 0x78], r4
0571a8: ldxdw r4, [r1 + 0x38]
0571b0: stxdw [r10 - 0x70], r4
0571b8: ldxdw r1, [r1 + 0x40]
0571c0: stxdw [r10 - 0x68], r1
0571c8: mov64 r1, r10
0571d0: add64 r1, -0x220
0571d8: mov64 r4, r10
0571e0: add64 r4, -0xa0
0571e8: call 0x289f9 ; direct target 0x19c1b8
0571f0: ldxdw r1, [r10 - 0x220]
0571f8: ldxdw r2, [r10 - 0x218]
057200: ja +0x11f ; branch 0x57b00
057208: stxdw [r10 - 0x250], r3
057210: stxdw [r10 - 0x260], r1
057218: jle r1, r5, +0x5 ; branch 0x57248
057220: ldxdw r1, [r10 - 0x260]
057228: ldxdw r2, [r10 - 0x2f8]
057230: lddw r3, 0x1bdc00 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x9fn\x1b\x00)\x00\x00\x00\x00\x00\x00\x00\xe8\x00\x00\x00 \x00\x00\x00\x00\x00\x00\x00Zo\x1b\x00\x19\x00\x00\x00\x00\x00\x00\x00L\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00Zo\x1b\x00\x19\x00\x00\x00\x00\x00\x00\x00M\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\xd6o\x1b\x00\x18\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc8m\x1b\x00\x01\x00\x00\x00'
057240: call 0x2b267 ; direct target 0x1b0580
057248: stxdw [r10 - 0x258], r8
057250: stxdw [r10 - 0x118], r8
057258: stdw [r10 - 0x110], 0x5
057260: stb [r10 - 0x101], 0xff
057268: stdw [r10 - 0xc8], 0x0
057270: stdw [r10 - 0xd8], 0x0
057278: mov64 r1, r10
057280: add64 r1, -0x101
057288: stxdw [r10 - 0xff8], r1
057290: mov64 r1, r10
057298: add64 r1, -0xa0
0572a0: mov64 r3, r10
0572a8: add64 r3, -0x118
0572b0: mov64 r5, r10
0572b8: lddw r2, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
0572c8: call 0x10c86 ; direct target 0xdd700
0572d0: ldxdw r8, [r10 - 0x90]
0572d8: ldxdw r1, [r10 - 0x98]
0572e0: ldxdw r6, [r10 - 0xa0]
0572e8: jeq r6, 0x0, +0xda ; branch 0x579c0
0572f0: ldxdw r4, [r10 - 0x2c8]
0572f8: ldxdw r2, [r4 + 0x8]
057300: ldxdw r3, [r10 - 0x2c0]
057308: stxdw [r3 + 0x8], r2
057310: ldxdw r2, [r4 + 0x0]
057318: stxdw [r3 + 0x0], r2
057320: mov64 r2, 0x0
057328: mov64 r3, 0x1
057330: ldxdw r4, [r10 - 0x248]
057338: ldxdw r5, [r10 - 0x2d0]
057340: jeq r5, r4, +0x1 ; branch 0x57350
057348: mov64 r3, 0x0
057350: mov64 r4, r10
057358: add64 r4, -0x1a0
057360: ldxb r5, [r10 - 0x126]
057368: jeq r5, 0x2, +0x1 ; branch 0x57378
057370: mov64 r2, r4
057378: stxdw [r10 - 0xf0], r8
057380: stxdw [r10 - 0xf8], r1
057388: stxdw [r10 - 0x100], r6
057390: ldxdw r1, [r10 - 0x2b8]
057398: ldxdw r4, [r10 - 0x248]
0573a0: add64 r1, r4
0573a8: ldxb r1, [r1 + 0x0]
0573b0: ldxb r4, [r10 - 0x101]
0573b8: stxdw [r10 - 0xfe0], r3
0573c0: stxdw [r10 - 0xfd8], r1
0573c8: stxdw [r10 - 0xfe8], r2
0573d0: stxdw [r10 - 0xff0], r9
0573d8: mov64 r1, r10
0573e0: add64 r1, -0x1c0
0573e8: stxdw [r10 - 0xff8], r1
0573f0: stxdw [r10 - 0x268], r4
0573f8: stxdw [r10 - 0x1000], r4
057400: mov64 r1, r10
057408: add64 r1, -0xa0
057410: mov64 r4, r10
057418: add64 r4, -0x100
057420: mov64 r5, r10
057428: mov64 r2, r7
057430: ldxdw r3, [r10 - 0x2d8]
057438: call 0x7ee ; direct target 0x5b3b0
057440: ldxdw r2, [r10 - 0x98]
057448: ldxdw r3, [r10 - 0xa0]
057450: ldxb r7, [r10 - 0x46]
057458: jeq r7, 0x2, +0xb4 ; branch 0x57a00
057460: stxdw [r10 - 0x288], r3
057468: stxdw [r10 - 0x280], r2
057470: ldxdw r2, [r10 - 0x2f0]
057478: ldxdw r1, [r2 + 0x8]
057480: stxdw [r10 - 0xd0], r1
057488: ldxdw r1, [r2 + 0x0]
057490: stxdw [r10 - 0xd8], r1
057498: ldxdw r2, [r10 - 0x2e8]
0574a0: ldxdw r1, [r2 + 0x0]
0574a8: stxdw [r10 - 0xb8], r1
0574b0: ldxdw r1, [r2 + 0x8]
0574b8: stxdw [r10 - 0xb0], r1
0574c0: ldxh r1, [r2 + 0x10]
0574c8: stxh [r10 - 0xa8], r1
0574d0: ldxdw r2, [r10 - 0x2e0]
0574d8: ldxb r1, [r2 + 0x4]
0574e0: stxb [r10 - 0xbc], r1
0574e8: ldxw r1, [r2 + 0x0]
0574f0: stxw [r10 - 0xc0], r1
0574f8: ldxdw r9, [r10 - 0x80]
057500: ldxdw r1, [r10 - 0x78]
057508: stxdw [r10 - 0x290], r1
057510: ldxdw r1, [r10 - 0x70]
057518: stxdw [r10 - 0x298], r1
057520: ldxdw r1, [r10 - 0x68]
057528: stxdw [r10 - 0x278], r1
057530: ldxdw r1, [r10 - 0x60]
057538: stxdw [r10 - 0x270], r1
057540: mov64 r1, r10
057548: add64 r1, -0x1f0
057550: mov64 r2, r10
057558: add64 r2, -0x100
057560: lddw r3, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
057570: call 0x10de8 ; direct target 0xde4b8
057578: ldxdw r1, [r10 - 0x1f0]
057580: jeq r1, 0x2, +0x1 ; branch 0x57590
057588: ja +0x93 ; branch 0x57a28
057590: ldxdw r8, [r8 + 0x0]
057598: ldxdw r1, [r8 + 0x8]
0575a0: ldxdw r3, [r1 + 0x0]
0575a8: add64 r3, 0x1
0575b0: mov64 r4, 0x1
0575b8: jeq r3, 0x0, +0x1 ; branch 0x575c8
0575c0: mov64 r4, 0x0
0575c8: ldxdw r2, [r8 + 0x0]
0575d0: stxdw [r1 + 0x0], r3
0575d8: jne r4, 0x1, +0x1 ; branch 0x575e8
0575e0: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
0575e8: ldxdw r3, [r8 + 0x10]
0575f0: ldxdw r4, [r3 + 0x0]
0575f8: add64 r4, 0x1
057600: mov64 r5, 0x1
057608: jeq r4, 0x0, +0x1 ; branch 0x57618
057610: mov64 r5, 0x0
057618: stxdw [r3 + 0x0], r4
057620: jne r5, 0x1, +0x1 ; branch 0x57630
057628: ja -0xa ; branch 0x575e0
057630: ldxb r4, [r8 + 0x2a]
057638: stxdw [r10 - 0x2a0], r4
057640: ldxb r4, [r8 + 0x29]
057648: ldxb r5, [r8 + 0x28]
057650: ldxdw r0, [r8 + 0x20]
057658: stxdw [r10 - 0x2b0], r0
057660: ldxdw r0, [r8 + 0x18]
057668: stxdw [r10 - 0x2a8], r0
057670: ldxdw r6, [r6 + 0x58]
057678: ldxdw r6, [r6 + 0x0]
057680: ldxdw r8, [r6 + 0x18]
057688: stxdw [r10 - 0x88], r8
057690: ldxdw r8, [r6 + 0x10]
057698: stxdw [r10 - 0x90], r8
0576a0: ldxdw r8, [r6 + 0x8]
0576a8: stxdw [r10 - 0x98], r8
0576b0: ldxdw r6, [r6 + 0x0]
0576b8: stxdw [r10 - 0xa0], r6
0576c0: ldxb r6, [r10 - 0x126]
0576c8: jeq r6, 0x2, +0x20 ; branch 0x577d0
0576d0: ldxdw r6, [r10 - 0x170]
0576d8: ldxdw r8, [r10 - 0x178]
0576e0: ldxdw r0, [r8 + 0x0]
0576e8: add64 r0, -0x1
0576f0: stxdw [r8 + 0x0], r0
0576f8: jne r0, 0x0, +0x3 ; branch 0x57718
057700: ldxdw r0, [r8 + 0x8]
057708: add64 r0, -0x1
057710: stxdw [r8 + 0x8], r0
057718: ldxdw r0, [r6 + 0x0]
057720: add64 r0, -0x1
057728: stxdw [r6 + 0x0], r0
057730: jne r0, 0x0, +0x3 ; branch 0x57750
057738: ldxdw r0, [r6 + 0x8]
057740: add64 r0, -0x1
057748: stxdw [r6 + 0x8], r0
057750: ldxdw r6, [r10 - 0x140]
057758: ldxdw r8, [r10 - 0x148]
057760: ldxdw r0, [r8 + 0x0]
057768: add64 r0, -0x1
057770: stxdw [r8 + 0x0], r0
057778: jne r0, 0x0, +0x3 ; branch 0x57798
057780: ldxdw r0, [r8 + 0x8]
057788: add64 r0, -0x1
057790: stxdw [r8 + 0x8], r0
057798: ldxdw r0, [r6 + 0x0]
0577a0: add64 r0, -0x1
0577a8: stxdw [r6 + 0x0], r0
0577b0: jne r0, 0x0, +0x3 ; branch 0x577d0
0577b8: ldxdw r0, [r6 + 0x8]
0577c0: add64 r0, -0x1
0577c8: stxdw [r6 + 0x8], r0
0577d0: ldxdw r0, [r10 - 0x88]
0577d8: stxdw [r10 - 0x188], r0
0577e0: ldxdw r0, [r10 - 0x90]
0577e8: stxdw [r10 - 0x190], r0
0577f0: ldxdw r0, [r10 - 0x98]
0577f8: stxdw [r10 - 0x198], r0
057800: ldxdw r0, [r10 - 0xa0]
057808: stxdw [r10 - 0x1a0], r0
057810: ldxdw r0, [r10 - 0x270]
057818: stxdw [r10 - 0x170], r0
057820: ldxdw r0, [r10 - 0x278]
057828: stxdw [r10 - 0x178], r0
057830: ldxdw r0, [r10 - 0x298]
057838: stxdw [r10 - 0x180], r0
057840: ldxh r0, [r10 - 0xa8]
057848: ldxdw r6, [r10 - 0x320]
057850: stxh [r6 + 0x10], r0
057858: ldxdw r0, [r10 - 0xb0]
057860: stxdw [r6 + 0x8], r0
057868: ldxdw r0, [r10 - 0xb8]
057870: stxdw [r6 + 0x0], r0
057878: stxb [r10 - 0x156], r7
057880: ldxb r0, [r10 - 0xbc]
057888: ldxdw r6, [r10 - 0x318]
057890: stxb [r6 + 0x4], r0
057898: ldxw r0, [r10 - 0xc0]
0578a0: stxw [r6 + 0x0], r0
0578a8: stxb [r10 - 0x128], r5
0578b0: stxb [r10 - 0x127], r4
0578b8: ldxdw r4, [r10 - 0x2a0]
0578c0: stxb [r10 - 0x126], r4
0578c8: ldxdw r4, [r10 - 0x268]
0578d0: stxb [r10 - 0x120], r4
0578d8: ldxdw r4, [r10 - 0x2b0]
0578e0: stxdw [r10 - 0x130], r4
0578e8: ldxdw r4, [r10 - 0x2a8]
0578f0: stxdw [r10 - 0x138], r4
0578f8: stxdw [r10 - 0x140], r3
057900: stxdw [r10 - 0x148], r1
057908: stxdw [r10 - 0x150], r2
057910: ldxdw r1, [r10 - 0xd0]
057918: ldxdw r2, [r10 - 0x310]
057920: stxdw [r2 + 0x8], r1
057928: ldxdw r1, [r10 - 0xd8]
057930: stxdw [r2 + 0x0], r1
057938: ldxdw r2, [r10 - 0x250]
057940: mov64 r6, r2
057948: ldxdw r1, [r10 - 0x290]
057950: add64 r6, r1
057958: mov64 r1, 0x1
057960: ldxdw r8, [r10 - 0x258]
057968: jlt r6, r2, -0x139 ; branch 0x56fa8
057970: mov64 r1, 0x0
057978: ja -0x13b ; branch 0x56fa8
057980: ldxdw r1, [r10 - 0x328]
057988: stxdw [r1 + 0x10], r6
057990: stxdw [r1 + 0x8], r9
057998: stdw [r1 + 0x0], 0x0
0579a0: mov64 r1, r10
0579a8: add64 r1, -0x1a0
0579b0: call -0x96c5 ; direct target 0xc390
0579b8: ja -0x177 ; branch 0x56e08
0579c0: ldxdw r2, [r10 - 0x328]
0579c8: stxdw [r2 + 0x10], r8
0579d0: stxdw [r2 + 0x8], r1
0579d8: stdw [r2 + 0x0], 0x1
0579e0: mov64 r1, r10
0579e8: add64 r1, -0xd8
0579f0: call -0x96a9 ; direct target 0xc4b0
0579f8: ja +0x24 ; branch 0x57b20
057a00: ldxdw r1, [r10 - 0x328]
057a08: stxdw [r1 + 0x10], r2
057a10: stxdw [r1 + 0x8], r3
057a18: stdw [r1 + 0x0], 0x1
057a20: ja +0x1f ; branch 0x57b20
057a28: ldxdw r2, [r10 - 0x1e8]
057a30: ldxdw r3, [r10 - 0x328]
057a38: stxdw [r3 + 0x8], r1
057a40: stxdw [r3 + 0x10], r2
057a48: stdw [r3 + 0x0], 0x1
057a50: ldxdw r2, [r10 - 0x278]
057a58: ldxdw r1, [r2 + 0x0]
057a60: add64 r1, -0x1
057a68: stxdw [r2 + 0x0], r1
057a70: jne r1, 0x0, +0x3 ; branch 0x57a90
057a78: ldxdw r1, [r2 + 0x8]
057a80: add64 r1, -0x1
057a88: stxdw [r2 + 0x8], r1
057a90: ldxdw r2, [r10 - 0x270]
057a98: ldxdw r1, [r2 + 0x0]
057aa0: add64 r1, -0x1
057aa8: stxdw [r2 + 0x0], r1
057ab0: jne r1, 0x0, +0xd ; branch 0x57b20
057ab8: ldxdw r1, [r2 + 0x8]
057ac0: add64 r1, -0x1
057ac8: stxdw [r2 + 0x8], r1
057ad0: ja +0x9 ; branch 0x57b20
057ad8: mov64 r1, r10
057ae0: add64 r1, -0x200
057ae8: call 0x29 ; direct target 0x57c38
057af0: ldxdw r1, [r10 - 0x200]
057af8: ldxdw r2, [r10 - 0x1f8]
057b00: ldxdw r3, [r10 - 0x328]
057b08: stxdw [r3 + 0x10], r2
057b10: stxdw [r3 + 0x8], r1
057b18: stdw [r3 + 0x0], 0x1
057b20: ldxb r1, [r10 - 0x126]
057b28: jeq r1, 0x2, -0x1a5 ; branch 0x56e08
057b30: ldxdw r1, [r10 - 0x170]
057b38: ldxdw r2, [r10 - 0x178]
057b40: ldxdw r3, [r2 + 0x0]
057b48: add64 r3, -0x1
057b50: stxdw [r2 + 0x0], r3
057b58: jne r3, 0x0, +0x3 ; branch 0x57b78
057b60: ldxdw r3, [r2 + 0x8]
057b68: add64 r3, -0x1
057b70: stxdw [r2 + 0x8], r3
057b78: ldxdw r2, [r1 + 0x0]
057b80: add64 r2, -0x1
057b88: stxdw [r1 + 0x0], r2
057b90: jne r2, 0x0, +0x3 ; branch 0x57bb0
057b98: ldxdw r2, [r1 + 0x8]
057ba0: add64 r2, -0x1
057ba8: stxdw [r1 + 0x8], r2
057bb0: ldxdw r1, [r10 - 0x140]
057bb8: ldxdw r2, [r10 - 0x148]
057bc0: ldxdw r3, [r2 + 0x0]
057bc8: add64 r3, -0x1
057bd0: stxdw [r2 + 0x0], r3
057bd8: jne r3, 0x0, +0x3 ; branch 0x57bf8
057be0: ldxdw r3, [r2 + 0x8]
057be8: add64 r3, -0x1
057bf0: stxdw [r2 + 0x8], r3
057bf8: ldxdw r2, [r1 + 0x0]
057c00: add64 r2, -0x1
057c08: stxdw [r1 + 0x0], r2
057c10: jne r2, 0x0, -0x1c2 ; branch 0x56e08
057c18: ldxdw r2, [r1 + 0x8]
057c20: add64 r2, -0x1
057c28: stxdw [r1 + 0x8], r2
057c30: ja -0x1c6 ; branch 0x56e08
