062688: mov64 r8, r3
062690: mov64 r7, r2
062698: mov64 r6, r1
0626a0: stdw [r10 - 0x100], 0x0
0626a8: stdw [r10 - 0x108], 0x0
0626b0: stdw [r10 - 0x110], 0x0
0626b8: stdw [r10 - 0x118], 0x0
0626c0: add64 r7, 0x360
0626c8: mov64 r2, r10
0626d0: add64 r2, -0x118
0626d8: mov64 r1, r7
0626e0: mov64 r3, 0x20
0626e8: call 0x16e3e ; call 0x1198e0
0626f0: lsh64 r0, 0x20
0626f8: rsh64 r0, 0x20
062700: jeq r0, 0x0, +0x54 ; branch 0x629a8
062708: mov64 r1, r7
062710: mov64 r2, r8
062718: mov64 r3, 0x20
062720: call 0x16e37 ; call 0x1198e0
062728: mov64 r1, 0x2
062730: lsh64 r0, 0x20
062738: rsh64 r0, 0x20
062740: jeq r0, 0x0, +0x9c ; branch 0x62c28
062748: mov64 r1, r10
062750: add64 r1, -0x78
062758: lddw r2, 0x11bf70 ; rodata b'\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00'
062768: call 0x2591 ; call 0x753f8
062770: stdw [r10 - 0x50], 0x0
062778: stdw [r10 - 0x58], 0x1
062780: stdw [r10 - 0x60], 0x0
062788: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
062798: stxdw [r10 - 0x20], r1
0627a0: mov64 r1, r10
0627a8: add64 r1, -0x60
0627b0: stxdw [r10 - 0x28], r1
0627b8: stb [r10 - 0x10], 0x3
0627c0: stdw [r10 - 0x18], 0x20
0627c8: stdw [r10 - 0x38], 0x0
0627d0: stdw [r10 - 0x48], 0x0
0627d8: mov64 r2, r10
0627e0: add64 r2, -0x48
0627e8: lddw r1, 0x11bf70 ; rodata b'\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00'
0627f8: call 0x3074 ; call 0x7aba0
062800: jeq r0, 0x0, +0x1 ; branch 0x62810
062808: ja +0x4b ; branch 0x62a68
062810: ldxdw r1, [r10 - 0x50]
062818: stxdw [r10 - 0xd0], r1
062820: ldxdw r1, [r10 - 0x58]
062828: stxdw [r10 - 0xd8], r1
062830: ldxdw r1, [r10 - 0x60]
062838: stxdw [r10 - 0xe0], r1
062840: ldxdw r1, [r10 - 0x78]
062848: stxdw [r10 - 0xf8], r1
062850: ldxdw r1, [r10 - 0x70]
062858: stxdw [r10 - 0xf0], r1
062860: ldxdw r1, [r10 - 0x68]
062868: stxdw [r10 - 0xe8], r1
062870: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
062880: stxdw [r10 - 0x110], r1
062888: stw [r10 - 0x80], 0x1775
062890: stb [r10 - 0xc8], 0x2
062898: stw [r10 - 0x100], 0x129
0628a0: stdw [r10 - 0x108], 0x2c
0628a8: stdw [r10 - 0x118], 0x0
0628b0: mov64 r1, r10
0628b8: add64 r1, -0x128
0628c0: mov64 r2, r10
0628c8: add64 r2, -0x118
0628d0: call 0x140dc ; call 0x102fb8
0628d8: ldxdw r3, [r10 - 0x120]
0628e0: ldxdw r2, [r10 - 0x128]
0628e8: ldxdw r1, [r7 + 0x18]
0628f0: stxdw [r10 - 0x100], r1
0628f8: ldxdw r1, [r7 + 0x10]
062900: stxdw [r10 - 0x108], r1
062908: ldxdw r1, [r7 + 0x8]
062910: stxdw [r10 - 0x110], r1
062918: ldxdw r1, [r7 + 0x0]
062920: stxdw [r10 - 0x118], r1
062928: ldxdw r1, [r8 + 0x0]
062930: stxdw [r10 - 0xf8], r1
062938: ldxdw r1, [r8 + 0x8]
062940: stxdw [r10 - 0xf0], r1
062948: ldxdw r1, [r8 + 0x10]
062950: stxdw [r10 - 0xe8], r1
062958: ldxdw r1, [r8 + 0x18]
062960: stxdw [r10 - 0xe0], r1
062968: mov64 r1, r10
062970: add64 r1, -0x138
062978: mov64 r4, r10
062980: add64 r4, -0x118
062988: call 0x14108 ; call 0x1031d0
062990: ldxdw r2, [r10 - 0x130]
062998: ldxdw r1, [r10 - 0x138]
0629a0: ja +0x50 ; branch 0x62c28
0629a8: mov64 r1, r10
0629b0: add64 r1, -0x78
0629b8: lddw r2, 0x11bf70 ; rodata b'\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00'
0629c8: call 0x2545 ; call 0x753f8
0629d0: stdw [r10 - 0x50], 0x0
0629d8: stdw [r10 - 0x58], 0x1
0629e0: stdw [r10 - 0x60], 0x0
0629e8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0629f8: stxdw [r10 - 0x20], r1
062a00: mov64 r1, r10
062a08: add64 r1, -0x60
062a10: stxdw [r10 - 0x28], r1
062a18: stb [r10 - 0x10], 0x3
062a20: stdw [r10 - 0x18], 0x20
062a28: stdw [r10 - 0x38], 0x0
062a30: stdw [r10 - 0x48], 0x0
062a38: mov64 r2, r10
062a40: add64 r2, -0x48
062a48: lddw r1, 0x11bf70 ; rodata b'\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00'
062a58: call 0x3028 ; call 0x7aba0
062a60: jeq r0, 0x0, +0xa ; branch 0x62ab8
062a68: mov64 r3, r10
062a70: add64 r3, -0x1
062a78: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
062a88: mov64 r2, 0x37
062a90: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
062aa0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
062ab0: call 0x1609c ; call 0x112f98
062ab8: ldxdw r1, [r10 - 0x50]
062ac0: stxdw [r10 - 0xd0], r1
062ac8: ldxdw r1, [r10 - 0x58]
062ad0: stxdw [r10 - 0xd8], r1
062ad8: ldxdw r1, [r10 - 0x60]
062ae0: stxdw [r10 - 0xe0], r1
062ae8: ldxdw r1, [r10 - 0x78]
062af0: stxdw [r10 - 0xf8], r1
062af8: ldxdw r1, [r10 - 0x70]
062b00: stxdw [r10 - 0xf0], r1
062b08: ldxdw r1, [r10 - 0x68]
062b10: stxdw [r10 - 0xe8], r1
062b18: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
062b28: stxdw [r10 - 0x110], r1
062b30: stw [r10 - 0x80], 0x1775
062b38: stb [r10 - 0xc8], 0x2
062b40: stw [r10 - 0x100], 0x124
062b48: stdw [r10 - 0x108], 0x2c
062b50: stdw [r10 - 0x118], 0x0
062b58: mov64 r1, r10
062b60: add64 r1, -0x148
062b68: mov64 r2, r10
062b70: add64 r2, -0x118
062b78: call 0x14087 ; call 0x102fb8
062b80: ldxdw r3, [r10 - 0x140]
062b88: ldxdw r2, [r10 - 0x148]
062b90: ldxdw r1, [r7 + 0x18]
062b98: stxdw [r10 - 0x100], r1
062ba0: ldxdw r1, [r7 + 0x10]
062ba8: stxdw [r10 - 0x108], r1
062bb0: ldxdw r1, [r7 + 0x8]
062bb8: stxdw [r10 - 0x110], r1
062bc0: ldxdw r1, [r7 + 0x0]
062bc8: stxdw [r10 - 0x118], r1
062bd0: stdw [r10 - 0xf8], 0x0
062bd8: stdw [r10 - 0xf0], 0x0
062be0: stdw [r10 - 0xe8], 0x0
062be8: stdw [r10 - 0xe0], 0x0
062bf0: mov64 r1, r10
062bf8: add64 r1, -0x158
062c00: mov64 r4, r10
062c08: add64 r4, -0x118
062c10: call 0x140b7 ; call 0x1031d0
062c18: ldxdw r2, [r10 - 0x150]
062c20: ldxdw r1, [r10 - 0x158]
062c28: stxdw [r6 + 0x8], r2
062c30: stxdw [r6 + 0x0], r1
062c38: exit
