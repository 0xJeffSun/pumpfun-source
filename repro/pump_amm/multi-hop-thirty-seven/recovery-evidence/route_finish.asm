0452e0: mov64 r9, r4
0452e8: mov64 r8, r3
0452f0: mov64 r7, r2
0452f8: mov64 r6, r1
045300: jlt r8, 0x2, +0x8f ; branch 0x45780
045308: ldxdw r1, [r7 + 0x30]
045310: ldxdw r2, [r1 + 0x18]
045318: stxdw [r10 - 0xf8], r2
045320: ldxdw r2, [r1 + 0x10]
045328: stxdw [r10 - 0x100], r2
045330: ldxdw r2, [r1 + 0x8]
045338: stxdw [r10 - 0x108], r2
045340: ldxdw r1, [r1 + 0x0]
045348: stxdw [r10 - 0x110], r1
045350: mov64 r1, r10
045358: add64 r1, -0x110
045360: mov64 r2, r9
045368: mov64 r3, 0x20
045370: call 0x1a8ad ; call 0x1198e0
045378: lsh64 r0, 0x20
045380: rsh64 r0, 0x20
045388: jeq r0, 0x0, +0x52 ; branch 0x45620
045390: ldxdw r1, [r7 + 0x0]
045398: ldxdw r2, [r1 + 0x18]
0453a0: stxdw [r10 - 0xf8], r2
0453a8: ldxdw r2, [r1 + 0x10]
0453b0: stxdw [r10 - 0x100], r2
0453b8: ldxdw r2, [r1 + 0x8]
0453c0: stxdw [r10 - 0x108], r2
0453c8: ldxdw r1, [r1 + 0x0]
0453d0: stxdw [r10 - 0x110], r1
0453d8: mov64 r1, r10
0453e0: add64 r1, -0x110
0453e8: mov64 r2, r9
0453f0: mov64 r3, 0x20
0453f8: call 0x1a89c ; call 0x1198e0
045400: lsh64 r0, 0x20
045408: rsh64 r0, 0x20
045410: jeq r0, 0x0, +0x47 ; branch 0x45650
045418: mov64 r1, r10
045420: add64 r1, -0x70
045428: lddw r2, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
045438: call 0x5ff7 ; call 0x753f8
045440: stdw [r10 - 0x48], 0x0
045448: stdw [r10 - 0x50], 0x1
045450: stdw [r10 - 0x58], 0x0
045458: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
045468: stxdw [r10 - 0x18], r1
045470: mov64 r1, r10
045478: add64 r1, -0x58
045480: stxdw [r10 - 0x20], r1
045488: stb [r10 - 0x8], 0x3
045490: stdw [r10 - 0x10], 0x20
045498: stdw [r10 - 0x30], 0x0
0454a0: stdw [r10 - 0x40], 0x0
0454a8: mov64 r2, r10
0454b0: add64 r2, -0x40
0454b8: lddw r1, 0x11bf84 ; rodata b'T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fro'
0454c8: call 0x6ada ; call 0x7aba0
0454d0: jeq r0, 0x0, +0xa ; branch 0x45528
0454d8: mov64 r3, r10
0454e0: add64 r3, -0x110
0454e8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0454f8: mov64 r2, 0x37
045500: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
045510: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
045520: call 0x19b4e ; call 0x112f98
045528: ldxdw r1, [r10 - 0x48]
045530: stxdw [r10 - 0xc8], r1
045538: ldxdw r1, [r10 - 0x50]
045540: stxdw [r10 - 0xd0], r1
045548: ldxdw r1, [r10 - 0x58]
045550: stxdw [r10 - 0xd8], r1
045558: ldxdw r1, [r10 - 0x70]
045560: stxdw [r10 - 0xf0], r1
045568: ldxdw r1, [r10 - 0x68]
045570: stxdw [r10 - 0xe8], r1
045578: ldxdw r1, [r10 - 0x60]
045580: stxdw [r10 - 0xe0], r1
045588: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
045598: stxdw [r10 - 0x108], r1
0455a0: stw [r10 - 0x78], 0x17c4
0455a8: stb [r10 - 0xc0], 0x2
0455b0: stw [r10 - 0xf8], 0x309
0455b8: stdw [r10 - 0x100], 0x39
0455c0: stdw [r10 - 0x110], 0x0
0455c8: mov64 r1, r10
0455d0: add64 r1, -0x120
0455d8: mov64 r2, r10
0455e0: add64 r2, -0x110
0455e8: call 0x17b39 ; call 0x102fb8
0455f0: ldxdw r1, [r10 - 0x120]
0455f8: ldxdw r2, [r10 - 0x118]
045600: stxdw [r6 + 0x8], r2
045608: stxdw [r6 + 0x0], r1
045610: mov64 r4, 0x2
045618: ja +0x2a ; branch 0x45770
045620: mov64 r1, 0x4
045628: jgt r8, 0x4, +0x7 ; branch 0x45668
045630: mov64 r2, r8
045638: lddw r3, 0x122508 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x05\x03\x00\x00\n\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00.\x03\x00\x00-\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00/\x03\x00\x00:\x00\x00\x00\x00\x00\x00'
045648: call 0x19a9f ; call 0x112b48
045650: mov64 r1, 0x3
045658: jgt r8, 0x3, +0x1 ; branch 0x45668
045660: ja +0x28 ; branch 0x457a8
045668: mul64 r1, 0x30
045670: add64 r7, r1
045678: ldxdw r1, [r7 + 0x8]
045680: ldxdw r3, [r1 + 0x0]
045688: add64 r3, 0x1
045690: mov64 r4, 0x1
045698: jeq r3, 0x0, +0x1 ; branch 0x456a8
0456a0: mov64 r4, 0x0
0456a8: ldxdw r2, [r7 + 0x0]
0456b0: stxdw [r1 + 0x0], r3
0456b8: jne r4, 0x1, +0x1 ; branch 0x456c8
0456c0: call -0x1
0456c8: ldxdw r3, [r7 + 0x10]
0456d0: ldxdw r4, [r3 + 0x0]
0456d8: add64 r4, 0x1
0456e0: mov64 r5, 0x1
0456e8: jeq r4, 0x0, +0x1 ; branch 0x456f8
0456f0: mov64 r5, 0x0
0456f8: stxdw [r3 + 0x0], r4
045700: jne r5, 0x1, +0x1 ; branch 0x45710
045708: ja -0xa ; branch 0x456c0
045710: ldxb r4, [r7 + 0x2a]
045718: ldxdw r5, [r7 + 0x18]
045720: ldxdw r0, [r7 + 0x20]
045728: ldxb r8, [r7 + 0x28]
045730: ldxb r7, [r7 + 0x29]
045738: stxb [r6 + 0x29], r7
045740: stxb [r6 + 0x28], r8
045748: stxdw [r6 + 0x20], r0
045750: stxdw [r6 + 0x18], r5
045758: stxdw [r6 + 0x10], r3
045760: stxdw [r6 + 0x8], r1
045768: stxdw [r6 + 0x0], r2
045770: stxb [r6 + 0x2a], r4
045778: exit
045780: mov64 r1, 0x1
045788: mov64 r2, r8
045790: lddw r3, 0x1224d8 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x04\x03\x00\x00\x14\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x07\x03\x00\x00\n\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x05\x03\x00\x00\n\x00\x00\x00\x00\x00\x00'
0457a0: call 0x19a74 ; call 0x112b48
0457a8: mov64 r2, r8
0457b0: lddw r3, 0x1224f0 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x07\x03\x00\x00\n\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\x05\x03\x00\x00\n\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00.\x03\x00\x00-\x00\x00\x00\x00\x00\x00'
0457c0: call 0x19a70 ; call 0x112b48
