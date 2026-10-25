057e40: mov64 r9, r5
057e48: stxdw [r10 - 0x160], r4
057e50: stxdw [r10 - 0x168], r3
057e58: stxdw [r10 - 0x170], r2
057e60: stxdw [r10 - 0x158], r1
057e68: ldxdw r7, [r9 - 0xff0]
057e70: ldxdw r6, [r7 + 0x58]
057e78: mov64 r8, r7
057e80: add64 r8, 0x8
057e88: mov64 r1, r10
057e90: add64 r1, -0x110
057e98: mov64 r2, r8
057ea0: mov64 r3, r6
057ea8: call 0x9038 ; direct target 0xa0070
057eb0: ldxdw r3, [r10 - 0x108]
057eb8: ldxdw r1, [r10 - 0x110]
057ec0: jne r1, 0x0, +0x2a ; branch 0x58018
057ec8: ldxdw r5, [r10 - 0x160]
057ed0: ldxdw r4, [r10 - 0x168]
057ed8: stxdw [r10 - 0x178], r8
057ee0: stxdw [r10 - 0x180], r7
057ee8: ldxdw r7, [r10 - 0x170]
057ef0: stxdw [r10 - 0x188], r6
057ef8: ldxdw r1, [r10 - 0x100]
057f00: jeq r1, 0x0, +0x44 ; branch 0x58128
057f08: mov64 r1, r10
057f10: add64 r1, -0x70
057f18: lddw r2, 0x1b5ee4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00'
057f28: call 0x1fe8a ; direct target 0x157380
057f30: stdw [r10 - 0x48], 0x0
057f38: stdw [r10 - 0x50], 0x1
057f40: stdw [r10 - 0x58], 0x0
057f48: lddw r1, 0x1bd838 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00'
057f58: stxdw [r10 - 0x18], r1
057f60: mov64 r1, r10
057f68: add64 r1, -0x58
057f70: stxdw [r10 - 0x20], r1
057f78: stb [r10 - 0x8], 0x3
057f80: stdw [r10 - 0x10], 0x20
057f88: stdw [r10 - 0x30], 0x0
057f90: stdw [r10 - 0x40], 0x0
057f98: mov64 r2, r10
057fa0: add64 r2, -0x40
057fa8: lddw r1, 0x1b5ee4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x19\x00\x00\x00+\x00\x00\x00b\x00\x00\x00=\x00\x00\x00<\x00\x00\x00;\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Nonem\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x00\r\x00\x00\x00\n\x00\x00\x00\x1b\x00\x00\x000\x00\x00\x00#\x00\x00\x00rent    N\x00\x00\x00>\x00\x00\x00data\x15\x00\x00\x00,\x00\x00\x00'
057fb8: call 0x20bd9 ; direct target 0x15de88
057fc0: jeq r0, 0x0, +0xc ; branch 0x58028
057fc8: mov64 r3, r10
057fd0: add64 r3, -0x110
057fd8: lddw r1, 0x1b5fa4 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-too'
057fe8: mov64 r2, 0x37
057ff0: lddw r4, 0x1bd868 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xd2\x00\x00\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
058000: lddw r5, 0x1bd888 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\xdb_\x1b\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\xa8\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00'
058010: call 0x2a9c0 ; direct target 0x1ace18
058018: ldxdw r1, [r10 - 0x100]
058020: ja +0x1b ; branch 0x58100
058028: ldxdw r1, [r10 - 0x48]
058030: stxdw [r10 - 0xc8], r1
058038: ldxdw r1, [r10 - 0x50]
058040: stxdw [r10 - 0xd0], r1
058048: ldxdw r1, [r10 - 0x58]
058050: stxdw [r10 - 0xd8], r1
058058: ldxdw r1, [r10 - 0x70]
058060: stxdw [r10 - 0xf0], r1
058068: ldxdw r1, [r10 - 0x68]
058070: stxdw [r10 - 0xe8], r1
058078: ldxdw r1, [r10 - 0x60]
058080: stxdw [r10 - 0xe0], r1
058088: lddw r1, 0x1b6e9f ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programs/pump/src/multi_hop_curve_swap.rsmulti_hop_swapprograms/pump/src/pump_quote.rsprograms/pump/'
058098: stxdw [r10 - 0x108], r1
0580a0: stw [r10 - 0x78], 0x1789
0580a8: stb [r10 - 0xc0], 0x2
0580b0: stw [r10 - 0xf8], 0x127
0580b8: stdw [r10 - 0x100], 0x29
0580c0: stdw [r10 - 0x110], 0x0
0580c8: mov64 r1, r10
0580d0: add64 r1, -0x150
0580d8: mov64 r2, r10
0580e0: add64 r2, -0x110
0580e8: call 0x28748 ; direct target 0x19bb30
0580f0: ldxdw r1, [r10 - 0x148]
0580f8: ldxdw r3, [r10 - 0x150]
058100: ldxdw r2, [r10 - 0x158]
058108: stxdw [r2 + 0x10], r1
058110: stxdw [r2 + 0x8], r3
058118: stdw [r2 + 0x0], 0x2
058120: exit
058128: ldxdw r1, [r9 - 0xff8]
058130: ldxdw r2, [r9 - 0x1000]
058138: ldxdw r0, [r9 - 0xfc8]
058140: stxdw [r10 - 0x198], r0
058148: ldxdw r0, [r9 - 0xfd0]
058150: stxdw [r10 - 0x1a0], r0
058158: ldxdw r8, [r9 - 0xfd8]
058160: ldxdw r0, [r9 - 0xfe0]
058168: stxdw [r10 - 0x190], r0
058170: ldxdw r6, [r9 - 0xfe8]
058178: stxdw [r10 - 0xff0], r1
058180: stxdw [r10 - 0xfe8], r3
058188: stxdw [r10 - 0xff8], r2
058190: stxdw [r10 - 0x1000], r5
058198: mov64 r1, r10
0581a0: add64 r1, -0x110
0581a8: mov64 r5, r10
0581b0: mov64 r2, r7
0581b8: mov64 r9, r3
0581c0: ldxdw r3, [r10 - 0x178]
0581c8: call 0x639f ; direct target 0x89ec8
0581d0: ldxdw r1, [r10 - 0x108]
0581d8: ldxdw r2, [r10 - 0x110]
0581e0: jeq r2, 0x0, +0x2 ; branch 0x581f8
0581e8: ldxdw r2, [r10 - 0x100]
0581f0: ja +0x5c ; branch 0x584d8
0581f8: stxdw [r10 - 0x1a8], r6
058200: ldxdw r2, [r10 - 0x1a0]
058208: stxdw [r10 - 0x168], r8
058210: ldxdw r2, [r10 - 0x198]
058218: ldxdw r3, [r10 - 0x190]
058220: mov64 r4, r3
058228: lsh64 r4, 0x3e
058230: arsh64 r4, 0x3f
058238: and64 r3, 0x1
058240: neg64 r3
058248: stxdw [r10 - 0x190], r3
058250: and64 r3, r1
058258: ldxdw r1, [r10 - 0x100]
058260: stxdw [r10 - 0x1b8], r4
058268: and64 r4, r1
058270: ldxdw r6, [r10 - 0xf8]
058278: ldxdw r8, [r10 - 0xf0]
058280: mov64 r1, r10
058288: add64 r1, -0x110
058290: stxdw [r10 - 0x160], r9
058298: mov64 r2, r9
0582a0: stxdw [r10 - 0x1b0], r3
0582a8: mov64 r9, r4
0582b0: call 0x4fe8 ; direct target 0x801f8
0582b8: ldxdw r1, [r10 - 0x110]
0582c0: jeq r1, 0x2, +0x1 ; branch 0x582d0
0582c8: ja +0x40 ; branch 0x584d0
0582d0: ldxdw r1, [r10 - 0x108]
0582d8: ldxdw r2, [r10 - 0x198]
0582e0: jlt r2, r1, +0x43 ; branch 0x58500
0582e8: sub64 r2, r1
0582f0: jeq r2, 0x0, +0x41 ; branch 0x58500
0582f8: stxdw [r10 - 0x198], r2
058300: ldxdw r1, [r10 - 0x1a8]
058308: ldxdw r1, [r1 + 0x68]
058310: stxdw [r10 - 0x1a8], r1
058318: stdw [r10 - 0xf8], 0x0
058320: stdw [r10 - 0x100], 0x0
058328: stdw [r10 - 0x108], 0x0
058330: stdw [r10 - 0x110], 0x0
058338: ldxdw r1, [r10 - 0x180]
058340: add64 r1, 0x28
058348: mov64 r2, r10
058350: add64 r2, -0x110
058358: mov64 r3, 0x20
058360: call 0x2b662 ; direct target 0x1b3678
058368: lsh64 r0, 0x20
058370: rsh64 r0, 0x20
058378: mov64 r1, 0x1
058380: jeq r0, 0x0, +0x1 ; branch 0x58390
058388: mov64 r1, 0x0
058390: ldxdw r3, [r7 + 0x408]
058398: ldxdw r2, [r10 - 0x180]
0583a0: ldxdw r2, [r2 + 0x60]
0583a8: ldxdw r4, [r10 - 0x188]
0583b0: stxdw [r10 - 0xff8], r4
0583b8: ldxdw r4, [r10 - 0x160]
0583c0: stxdw [r10 - 0xff0], r4
0583c8: stxdw [r10 - 0x1000], r1
0583d0: mov64 r1, r10
0583d8: add64 r1, -0x40
0583e0: mov64 r5, r10
0583e8: ldxdw r4, [r10 - 0x1a8]
0583f0: call 0x53a6 ; direct target 0x82128
0583f8: ldxdw r3, [r10 - 0x38]
058400: ldxdw r1, [r10 - 0x40]
058408: ldxdw r2, [r10 - 0x168]
058410: ldxdw r5, [r10 - 0x1a0]
058418: jne r1, 0x0, +0x1f ; branch 0x58518
058420: stxdw [r10 - 0x170], r8
058428: ldxdw r4, [r10 - 0x30]
058430: ldxdw r1, [r10 - 0x198]
058438: stxdw [r10 - 0xff0], r1
058440: stxdw [r10 - 0xff8], r5
058448: stxdw [r10 - 0x1000], r2
058450: stdw [r10 - 0xfe8], 0x1
058458: mov64 r1, r10
058460: add64 r1, -0x110
058468: mov64 r5, r10
058470: ldxdw r2, [r10 - 0x178]
058478: call 0x5581 ; direct target 0x83088
058480: ldxdw r8, [r10 - 0x100]
058488: ldxdw r2, [r10 - 0x108]
058490: ldxdw r7, [r10 - 0x110]
058498: jeq r7, 0x2, +0x1 ; branch 0x584a8
0584a0: ja +0x10 ; branch 0x58528
0584a8: ldxdw r1, [r10 - 0x158]
0584b0: stxdw [r1 + 0x10], r8
0584b8: stxdw [r1 + 0x8], r2
0584c0: stdw [r1 + 0x0], 0x2
0584c8: ja -0x76 ; branch 0x58120
0584d0: ldxdw r2, [r10 - 0x108]
0584d8: ldxdw r3, [r10 - 0x158]
0584e0: stxdw [r3 + 0x10], r2
0584e8: stxdw [r3 + 0x8], r1
0584f0: stdw [r3 + 0x0], 0x2
0584f8: ja -0x7c ; branch 0x58120
058500: ldxdw r1, [r10 - 0x158]
058508: stdw [r1 + 0x0], 0x0
058510: ja -0x7f ; branch 0x58120
058518: ldxdw r1, [r10 - 0x30]
058520: ja -0x85 ; branch 0x58100
058528: stxdw [r10 - 0x168], r2
058530: mov64 r2, r6
058538: ldxdw r6, [r10 - 0x1b8]
058540: ldxdw r1, [r10 - 0x170]
058548: and64 r6, r1
058550: ldxdw r1, [r10 - 0x190]
058558: and64 r1, r2
058560: stxdw [r10 - 0x190], r1
058568: mov64 r1, r10
058570: add64 r1, -0x140
058578: mov64 r2, r10
058580: add64 r2, -0xf8
058588: mov64 r3, 0x30
058590: call 0x2b60f ; direct target 0x1b3610
058598: jeq r7, 0x0, +0x6 ; branch 0x585d0
0585a0: mov64 r1, r10
0585a8: add64 r1, -0x40
0585b0: mov64 r2, r10
0585b8: add64 r2, -0x140
0585c0: mov64 r3, 0x30
0585c8: call 0x2b608 ; direct target 0x1b3610
0585d0: ldxdw r1, [r10 - 0x158]
0585d8: stxdw [r1 + 0x38], r8
0585e0: ldxdw r2, [r10 - 0x168]
0585e8: stxdw [r1 + 0x30], r2
0585f0: ldxdw r2, [r10 - 0x160]
0585f8: stxdw [r1 + 0x28], r2
058600: stxdw [r1 + 0x20], r6
058608: ldxdw r2, [r10 - 0x190]
058610: stxdw [r1 + 0x18], r2
058618: stxdw [r1 + 0x10], r9
058620: ldxdw r2, [r10 - 0x1b0]
058628: stxdw [r1 + 0x8], r2
058630: stxdw [r1 + 0x0], r7
058638: add64 r1, 0x40
058640: mov64 r2, r10
058648: add64 r2, -0x40
058650: mov64 r3, 0x30
058658: call 0x2b5f6 ; direct target 0x1b3610
058660: ja -0xa9 ; branch 0x58120
