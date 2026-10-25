061630: mov64 r7, r3
061638: mov64 r6, r1
061640: jgt r7, 0x3e8, +0x3 ; branch 0x61660
061648: stxdw [r2 + 0x380], r7
061650: mov64 r1, 0x2
061658: ja +0x44 ; branch 0x61880
061660: mov64 r1, r10
061668: add64 r1, -0x70
061670: lddw r2, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
061680: call 0x27ae ; call 0x753f8
061688: stdw [r10 - 0x48], 0x0
061690: stdw [r10 - 0x50], 0x1
061698: stdw [r10 - 0x58], 0x0
0616a0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0616b0: stxdw [r10 - 0x18], r1
0616b8: mov64 r1, r10
0616c0: add64 r1, -0x58
0616c8: stxdw [r10 - 0x20], r1
0616d0: stb [r10 - 0x8], 0x3
0616d8: stdw [r10 - 0x10], 0x20
0616e0: stdw [r10 - 0x30], 0x0
0616e8: stdw [r10 - 0x40], 0x0
0616f0: mov64 r2, r10
0616f8: add64 r2, -0x40
061700: lddw r1, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
061710: call 0x3291 ; call 0x7aba0
061718: jeq r0, 0x0, +0xa ; branch 0x61770
061720: mov64 r3, r10
061728: add64 r3, -0x110
061730: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
061740: mov64 r2, 0x37
061748: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
061758: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
061768: call 0x16305 ; call 0x112f98
061770: ldxdw r1, [r10 - 0x48]
061778: stxdw [r10 - 0xc8], r1
061780: ldxdw r1, [r10 - 0x50]
061788: stxdw [r10 - 0xd0], r1
061790: ldxdw r1, [r10 - 0x58]
061798: stxdw [r10 - 0xd8], r1
0617a0: ldxdw r1, [r10 - 0x70]
0617a8: stxdw [r10 - 0xf0], r1
0617b0: ldxdw r1, [r10 - 0x68]
0617b8: stxdw [r10 - 0xe8], r1
0617c0: ldxdw r1, [r10 - 0x60]
0617c8: stxdw [r10 - 0xe0], r1
0617d0: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
0617e0: stxdw [r10 - 0x108], r1
0617e8: stw [r10 - 0x78], 0x1770
0617f0: stb [r10 - 0xc0], 0x2
0617f8: stw [r10 - 0xf8], 0xdc
061800: stdw [r10 - 0x100], 0x2c
061808: stdw [r10 - 0x110], 0x0
061810: mov64 r1, r10
061818: add64 r1, -0x120
061820: mov64 r2, r10
061828: add64 r2, -0x110
061830: call 0x142f0 ; call 0x102fb8
061838: ldxdw r3, [r10 - 0x118]
061840: ldxdw r2, [r10 - 0x120]
061848: mov64 r1, r10
061850: add64 r1, -0x130
061858: mov64 r4, 0x3e8
061860: mov64 r5, r7
061868: call -0xc006 ; call 0x1840
061870: ldxdw r2, [r10 - 0x128]
061878: ldxdw r1, [r10 - 0x130]
061880: stxdw [r6 + 0x8], r2
061888: stxdw [r6 + 0x0], r1
061890: exit
