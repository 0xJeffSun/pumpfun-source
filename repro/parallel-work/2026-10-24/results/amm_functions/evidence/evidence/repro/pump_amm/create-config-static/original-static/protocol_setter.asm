061898: mov64 r7, r3
0618a0: mov64 r6, r1
0618a8: jgt r7, 0x3e8, +0x3 ; branch 0x618c8
0618b0: stxdw [r2 + 0x388], r7
0618b8: mov64 r1, 0x2
0618c0: ja +0x44 ; branch 0x61ae8
0618c8: mov64 r1, r10
0618d0: add64 r1, -0x70
0618d8: lddw r2, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
0618e8: call 0x2761 ; call 0x753f8
0618f0: stdw [r10 - 0x48], 0x0
0618f8: stdw [r10 - 0x50], 0x1
061900: stdw [r10 - 0x58], 0x0
061908: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
061918: stxdw [r10 - 0x18], r1
061920: mov64 r1, r10
061928: add64 r1, -0x58
061930: stxdw [r10 - 0x20], r1
061938: stb [r10 - 0x8], 0x3
061940: stdw [r10 - 0x10], 0x20
061948: stdw [r10 - 0x30], 0x0
061950: stdw [r10 - 0x40], 0x0
061958: mov64 r2, r10
061960: add64 r2, -0x40
061968: lddw r1, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
061978: call 0x3244 ; call 0x7aba0
061980: jeq r0, 0x0, +0xa ; branch 0x619d8
061988: mov64 r3, r10
061990: add64 r3, -0x110
061998: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0619a8: mov64 r2, 0x37
0619b0: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
0619c0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
0619d0: call 0x162b8 ; call 0x112f98
0619d8: ldxdw r1, [r10 - 0x48]
0619e0: stxdw [r10 - 0xc8], r1
0619e8: ldxdw r1, [r10 - 0x50]
0619f0: stxdw [r10 - 0xd0], r1
0619f8: ldxdw r1, [r10 - 0x58]
061a00: stxdw [r10 - 0xd8], r1
061a08: ldxdw r1, [r10 - 0x70]
061a10: stxdw [r10 - 0xf0], r1
061a18: ldxdw r1, [r10 - 0x68]
061a20: stxdw [r10 - 0xe8], r1
061a28: ldxdw r1, [r10 - 0x60]
061a30: stxdw [r10 - 0xe0], r1
061a38: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
061a48: stxdw [r10 - 0x108], r1
061a50: stw [r10 - 0x78], 0x1770
061a58: stb [r10 - 0xc0], 0x2
061a60: stw [r10 - 0xf8], 0xe6
061a68: stdw [r10 - 0x100], 0x2c
061a70: stdw [r10 - 0x110], 0x0
061a78: mov64 r1, r10
061a80: add64 r1, -0x120
061a88: mov64 r2, r10
061a90: add64 r2, -0x110
061a98: call 0x142a3 ; call 0x102fb8
061aa0: ldxdw r3, [r10 - 0x118]
061aa8: ldxdw r2, [r10 - 0x120]
061ab0: mov64 r1, r10
061ab8: add64 r1, -0x130
061ac0: mov64 r4, 0x3e8
061ac8: mov64 r5, r7
061ad0: call -0xc053 ; call 0x1840
061ad8: ldxdw r2, [r10 - 0x128]
061ae0: ldxdw r1, [r10 - 0x130]
061ae8: stxdw [r6 + 0x8], r2
061af0: stxdw [r6 + 0x0], r1
061af8: exit
