040308: mov64 r8, r3
040310: mov64 r7, r2
040318: mov64 r6, r1
040320: ldxdw r1, [r4 + 0x8]
040328: ldxdw r2, [r1 + 0x0]
040330: add64 r2, 0x1
040338: mov64 r3, 0x1
040340: jeq r2, 0x0, +0x1 ; branch 0x40350
040348: mov64 r3, 0x0
040350: stxdw [r1 + 0x0], r2
040358: jne r3, 0x1, +0x1 ; branch 0x40368
040360: call -0x1
040368: ldxdw r2, [r4 + 0x10]
040370: ldxdw r3, [r2 + 0x0]
040378: add64 r3, 0x1
040380: mov64 r5, 0x1
040388: jeq r3, 0x0, +0x1 ; branch 0x40398
040390: mov64 r5, 0x0
040398: stxdw [r2 + 0x0], r3
0403a0: jne r5, 0x1, +0x1 ; branch 0x403b0
0403a8: ja -0xa ; branch 0x40360
0403b0: ldxdw r9, [r4 + 0x18]
0403b8: ldxdw r3, [r1 + 0x0]
0403c0: add64 r3, -0x1
0403c8: stxdw [r1 + 0x0], r3
0403d0: jne r3, 0x0, +0x3 ; branch 0x403f0
0403d8: ldxdw r3, [r1 + 0x8]
0403e0: add64 r3, -0x1
0403e8: stxdw [r1 + 0x8], r3
0403f0: ldxdw r1, [r2 + 0x0]
0403f8: add64 r1, -0x1
040400: stxdw [r2 + 0x0], r1
040408: jne r1, 0x0, +0x3 ; branch 0x40428
040410: ldxdw r1, [r2 + 0x8]
040418: add64 r1, -0x1
040420: stxdw [r2 + 0x8], r1
040428: mov64 r1, r9
040430: lddw r2, 0x11be90 ; rodata b"\x06\xdd\xf6\xe1\xeeu\x8f\xde\x18B]\xbc\xe4l\xcd\xda\xb6\x1a\xfcM\x83\xb9\r'\xfe\xbd\xf9(\xd8\xa1\x8b\xfc\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction"
040440: mov64 r3, 0x20
040448: call 0x1b292 ; call 0x1198e0
040450: lsh64 r0, 0x20
040458: rsh64 r0, 0x20
040460: jeq r0, 0x0, +0x49 ; branch 0x406b0
040468: mov64 r1, r9
040470: lddw r2, 0x11bd50 ; rodata b'\x06\xdd\xf6\xe1\xd7e\xa1\x93\xd9\xcb\xe1F\xce\xeby\xac\x1c\xb4\x85\xed_[7\x91:\x8c\xf5\x85~\xff\x00\xa9AccountNotAssociatedTokenAccount\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
040480: mov64 r3, 0x20
040488: call 0x1b28a ; call 0x1198e0
040490: lsh64 r0, 0x20
040498: rsh64 r0, 0x20
0404a0: jeq r0, 0x0, +0x5c ; branch 0x40788
0404a8: mov64 r1, r10
0404b0: add64 r1, -0x70
0404b8: lddw r2, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
0404c8: call 0x69e5 ; call 0x753f8
0404d0: stdw [r10 - 0x48], 0x0
0404d8: stdw [r10 - 0x50], 0x1
0404e0: stdw [r10 - 0x58], 0x0
0404e8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0404f8: stxdw [r10 - 0x18], r1
040500: mov64 r1, r10
040508: add64 r1, -0x58
040510: stxdw [r10 - 0x20], r1
040518: stb [r10 - 0x8], 0x3
040520: stdw [r10 - 0x10], 0x20
040528: stdw [r10 - 0x30], 0x0
040530: stdw [r10 - 0x40], 0x0
040538: mov64 r2, r10
040540: add64 r2, -0x40
040548: lddw r1, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
040558: call 0x74c8 ; call 0x7aba0
040560: jeq r0, 0x0, +0xa ; branch 0x405b8
040568: mov64 r3, r10
040570: add64 r3, -0x110
040578: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
040588: mov64 r2, 0x37
040590: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
0405a0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
0405b0: call 0x1a53c ; call 0x112f98
0405b8: ldxdw r1, [r10 - 0x48]
0405c0: stxdw [r10 - 0xc8], r1
0405c8: ldxdw r1, [r10 - 0x50]
0405d0: stxdw [r10 - 0xd0], r1
0405d8: ldxdw r1, [r10 - 0x58]
0405e0: stxdw [r10 - 0xd8], r1
0405e8: ldxdw r1, [r10 - 0x70]
0405f0: stxdw [r10 - 0xf0], r1
0405f8: ldxdw r1, [r10 - 0x68]
040600: stxdw [r10 - 0xe8], r1
040608: ldxdw r1, [r10 - 0x60]
040610: stxdw [r10 - 0xe0], r1
040618: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
040628: stxdw [r10 - 0x108], r1
040630: stw [r10 - 0x78], 0x178b
040638: stb [r10 - 0xc0], 0x2
040640: stw [r10 - 0xf8], 0x19e
040648: stdw [r10 - 0x100], 0x39
040650: stdw [r10 - 0x110], 0x0
040658: mov64 r1, r10
040660: add64 r1, -0x120
040668: mov64 r2, r10
040670: add64 r2, -0x110
040678: call 0x18527 ; call 0x102fb8
040680: ldxdw r1, [r10 - 0x120]
040688: ldxdw r2, [r10 - 0x118]
040690: stxdw [r6 + 0x8], r2
040698: stxdw [r6 + 0x0], r1
0406a0: mov64 r3, 0x2
0406a8: ja +0x3a ; branch 0x40880
0406b0: ldxdw r1, [r8 + 0x8]
0406b8: ldxdw r3, [r1 + 0x0]
0406c0: add64 r3, 0x1
0406c8: mov64 r4, 0x1
0406d0: jeq r3, 0x0, +0x1 ; branch 0x406e0
0406d8: mov64 r4, 0x0
0406e0: ldxdw r2, [r8 + 0x0]
0406e8: stxdw [r1 + 0x0], r3
0406f0: jne r4, 0x1, +0x1 ; branch 0x40700
0406f8: ja -0x74 ; branch 0x40360
040700: ldxdw r4, [r8 + 0x10]
040708: ldxdw r3, [r4 + 0x0]
040710: add64 r3, 0x1
040718: mov64 r5, 0x1
040720: jeq r3, 0x0, +0x1 ; branch 0x40730
040728: mov64 r5, 0x0
040730: stxdw [r4 + 0x0], r3
040738: jne r5, 0x1, +0x1 ; branch 0x40748
040740: ja -0x7d ; branch 0x40360
040748: ldxb r3, [r8 + 0x2a]
040750: ldxdw r5, [r8 + 0x18]
040758: ldxdw r0, [r8 + 0x20]
040760: ldxb r7, [r8 + 0x28]
040768: ldxb r8, [r8 + 0x29]
040770: stxb [r6 + 0x29], r8
040778: stxb [r6 + 0x28], r7
040780: ja +0x1a ; branch 0x40858
040788: ldxdw r1, [r7 + 0x8]
040790: ldxdw r3, [r1 + 0x0]
040798: add64 r3, 0x1
0407a0: mov64 r4, 0x1
0407a8: jeq r3, 0x0, +0x1 ; branch 0x407b8
0407b0: mov64 r4, 0x0
0407b8: ldxdw r2, [r7 + 0x0]
0407c0: stxdw [r1 + 0x0], r3
0407c8: jne r4, 0x1, +0x1 ; branch 0x407d8
0407d0: ja -0x8f ; branch 0x40360
0407d8: ldxdw r4, [r7 + 0x10]
0407e0: ldxdw r3, [r4 + 0x0]
0407e8: add64 r3, 0x1
0407f0: mov64 r5, 0x1
0407f8: jeq r3, 0x0, +0x1 ; branch 0x40808
040800: mov64 r5, 0x0
040808: stxdw [r4 + 0x0], r3
040810: jne r5, 0x1, +0x1 ; branch 0x40820
040818: ja -0x98 ; branch 0x40360
040820: ldxb r3, [r7 + 0x2a]
040828: ldxdw r5, [r7 + 0x18]
040830: ldxdw r0, [r7 + 0x20]
040838: ldxb r8, [r7 + 0x28]
040840: ldxb r7, [r7 + 0x29]
040848: stxb [r6 + 0x29], r7
040850: stxb [r6 + 0x28], r8
040858: stxdw [r6 + 0x20], r0
040860: stxdw [r6 + 0x18], r5
040868: stxdw [r6 + 0x10], r4
040870: stxdw [r6 + 0x8], r1
040878: stxdw [r6 + 0x0], r2
040880: stxb [r6 + 0x2a], r3
040888: exit
