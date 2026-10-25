03d8d0: mov64 r6, r1
03d8d8: jlt r3, 0x3, +0x57 ; branch 0x3db98
03d8e0: ldxdw r7, [r2 + 0x78]
03d8e8: mov64 r1, r7
03d8f0: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
03d900: mov64 r3, 0x20
03d908: call 0x1b7fa ; call 0x1198e0
03d910: lsh64 r0, 0x20
03d918: rsh64 r0, 0x20
03d920: jeq r0, 0x0, +0x48 ; branch 0x3db68
03d928: mov64 r1, r7
03d930: lddw r2, 0x11e55e ; rodata b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0programs/pu'
03d940: mov64 r3, 0x20
03d948: call 0x1b7f2 ; call 0x1198e0
03d950: lsh64 r0, 0x20
03d958: rsh64 r0, 0x20
03d960: jeq r0, 0x0, +0x43 ; branch 0x3db80
03d968: mov64 r1, r10
03d970: add64 r1, -0x70
03d978: lddw r2, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
03d988: call 0x6f4d ; call 0x753f8
03d990: stdw [r10 - 0x48], 0x0
03d998: stdw [r10 - 0x50], 0x1
03d9a0: stdw [r10 - 0x58], 0x0
03d9a8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03d9b8: stxdw [r10 - 0x18], r1
03d9c0: mov64 r1, r10
03d9c8: add64 r1, -0x58
03d9d0: stxdw [r10 - 0x20], r1
03d9d8: stb [r10 - 0x8], 0x3
03d9e0: stdw [r10 - 0x10], 0x20
03d9e8: stdw [r10 - 0x30], 0x0
03d9f0: stdw [r10 - 0x40], 0x0
03d9f8: mov64 r2, r10
03da00: add64 r2, -0x40
03da08: lddw r1, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
03da18: call 0x7a30 ; call 0x7aba0
03da20: jeq r0, 0x0, +0xa ; branch 0x3da78
03da28: mov64 r3, r10
03da30: add64 r3, -0x110
03da38: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
03da48: mov64 r2, 0x37
03da50: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
03da60: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
03da70: call 0x1aaa4 ; call 0x112f98
03da78: ldxdw r1, [r10 - 0x48]
03da80: stxdw [r10 - 0xc8], r1
03da88: ldxdw r1, [r10 - 0x50]
03da90: stxdw [r10 - 0xd0], r1
03da98: ldxdw r1, [r10 - 0x58]
03daa0: stxdw [r10 - 0xd8], r1
03daa8: ldxdw r1, [r10 - 0x70]
03dab0: stxdw [r10 - 0xf0], r1
03dab8: ldxdw r1, [r10 - 0x68]
03dac0: stxdw [r10 - 0xe8], r1
03dac8: ldxdw r1, [r10 - 0x60]
03dad0: stxdw [r10 - 0xe0], r1
03dad8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
03dae8: stxdw [r10 - 0x108], r1
03daf0: stw [r10 - 0x78], 0x178b
03daf8: stb [r10 - 0xc0], 0x2
03db00: stw [r10 - 0xf8], 0xef
03db08: stdw [r10 - 0x100], 0x39
03db10: stdw [r10 - 0x110], 0x0
03db18: mov64 r1, r10
03db20: add64 r1, -0x120
03db28: mov64 r2, r10
03db30: add64 r2, -0x110
03db38: call 0x18a8f ; call 0x102fb8
03db40: ldxdw r1, [r10 - 0x120]
03db48: ldxdw r2, [r10 - 0x118]
03db50: stxdw [r6 + 0x8], r2
03db58: stxdw [r6 + 0x0], r1
03db60: ja +0x5 ; branch 0x3db90
03db68: stdw [r6 + 0x0], 0x2
03db70: stb [r6 + 0x8], 0x0
03db78: ja +0x2 ; branch 0x3db90
03db80: stdw [r6 + 0x0], 0x2
03db88: stb [r6 + 0x8], 0x1
03db90: exit
03db98: mov64 r1, 0x2
03dba0: mov64 r2, r3
03dba8: lddw r3, 0x122430 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00\xe9\x00\x00\x00\x11\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00;\x01\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00X\x01\x00\x00 \x00\x00\x00\x00\x00\x00'
03dbb8: call 0x1a9f1 ; call 0x112b48
