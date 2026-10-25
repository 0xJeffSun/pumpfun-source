01fed8: stxdw [r10 - 0x7b8], r4
01fee0: mov64 r8, r3
01fee8: mov64 r9, r2
01fef0: mov64 r6, r1
01fef8: ldxdw r7, [r9 + 0x8]
01ff00: ldxdw r2, [r7 + 0x10]
01ff08: ldxdw r1, [r7 + 0x8]
01ff10: ldxdw r1, [r1 + 0x0]
01ff18: ldxdw r3, [r1 + 0x18]
01ff20: stxdw [r10 - 0x5a8], r3
01ff28: ldxdw r3, [r1 + 0x10]
01ff30: stxdw [r10 - 0x5b0], r3
01ff38: ldxdw r3, [r1 + 0x8]
01ff40: stxdw [r10 - 0x5b8], r3
01ff48: ldxdw r1, [r1 + 0x0]
01ff50: stxdw [r10 - 0x5c0], r1
01ff58: add64 r2, 0x8
01ff60: mov64 r1, r10
01ff68: add64 r1, -0x610
01ff70: mov64 r3, r10
01ff78: add64 r3, -0x5c0
01ff80: call 0x84e0 ; call 0x62688
01ff88: ldxdw r2, [r10 - 0x610]
01ff90: jne r2, 0x2, +0x1f ; branch 0x20090
01ff98: ldxdw r1, [r7 + 0x10]
01ffa0: ldxb r2, [r1 + 0x3b3]
01ffa8: jeq r2, 0x0, +0xd5 ; branch 0x20658
01ffb0: ldxb r1, [r1 + 0x3b0]
01ffb8: and64 r1, 0x8
01ffc0: jne r1, 0x0, +0x1b ; branch 0x200a0
01ffc8: ldxdw r1, [r7 + 0x0]
01ffd0: add64 r1, 0x8
01ffd8: call 0x984d ; call 0x6c248
01ffe0: jne r0, 0x0, +0x1 ; branch 0x1fff0
01ffe8: ja +0x4b ; branch 0x20248
01fff0: ldxdw r1, [r7 + 0x40]
01fff8: ldxdw r2, [r1 + 0x68]
020000: mov64 r1, r8
020008: jlt r8, r2, +0x1 ; branch 0x20018
020010: mov64 r1, r2
020018: jeq r1, 0x0, +0xae ; branch 0x20590
020020: stxdw [r10 - 0x7d8], r2
020028: stxdw [r10 - 0x7c8], r1
020030: ldxdw r1, [r7 + 0x20]
020038: ldxdw r2, [r1 + 0x58]
020040: ldxdw r1, [r2 + 0x8]
020048: ldxdw r4, [r1 + 0x0]
020050: add64 r4, 0x1
020058: mov64 r5, 0x1
020060: jeq r4, 0x0, +0x1 ; branch 0x20070
020068: mov64 r5, 0x0
020070: ldxdw r3, [r2 + 0x0]
020078: stxdw [r1 + 0x0], r4
020080: jne r5, 0x1, +0x6d ; branch 0x203f0
020088: call -0x1
020090: ldxdw r1, [r10 - 0x608]
020098: ja +0xf4 ; branch 0x20840
0200a0: mov64 r1, r10
0200a8: add64 r1, -0xc0
0200b0: lddw r2, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
0200c0: call 0xaa66 ; call 0x753f8
0200c8: stdw [r10 - 0x320], 0x0
0200d0: stdw [r10 - 0x328], 0x1
0200d8: stdw [r10 - 0x330], 0x0
0200e0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0200f0: stxdw [r10 - 0x180], r1
0200f8: mov64 r1, r10
020100: add64 r1, -0x330
020108: stxdw [r10 - 0x188], r1
020110: stb [r10 - 0x170], 0x3
020118: stdw [r10 - 0x178], 0x20
020120: stdw [r10 - 0x198], 0x0
020128: stdw [r10 - 0x1a8], 0x0
020130: mov64 r2, r10
020138: add64 r2, -0x1a8
020140: lddw r1, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
020150: call 0xb549 ; call 0x7aba0
020158: jeq r0, 0x0, +0x1 ; branch 0x20168
020160: ja +0xb6 ; branch 0x20718
020168: ldxdw r1, [r10 - 0x320]
020170: stxdw [r10 - 0x578], r1
020178: ldxdw r1, [r10 - 0x328]
020180: stxdw [r10 - 0x580], r1
020188: ldxdw r1, [r10 - 0x330]
020190: stxdw [r10 - 0x588], r1
020198: ldxdw r1, [r10 - 0xc0]
0201a0: stxdw [r10 - 0x5a0], r1
0201a8: ldxdw r1, [r10 - 0xb8]
0201b0: stxdw [r10 - 0x598], r1
0201b8: ldxdw r1, [r10 - 0xb0]
0201c0: stxdw [r10 - 0x590], r1
0201c8: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
0201d8: stxdw [r10 - 0x5b8], r1
0201e0: stw [r10 - 0x528], 0x1784
0201e8: stb [r10 - 0x570], 0x2
0201f0: stw [r10 - 0x5a8], 0xf0
0201f8: stdw [r10 - 0x5b0], 0x2b
020200: stdw [r10 - 0x5c0], 0x0
020208: mov64 r1, r10
020210: add64 r1, -0x620
020218: mov64 r2, r10
020220: add64 r2, -0x5c0
020228: call 0x1c5b1 ; call 0x102fb8
020230: ldxdw r1, [r10 - 0x618]
020238: ldxdw r2, [r10 - 0x620]
020240: ja +0xbf ; branch 0x20840
020248: mov64 r1, r10
020250: add64 r1, -0xc0
020258: lddw r2, 0x11bf90 ; rodata b'A\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00'
020268: call 0xaa31 ; call 0x753f8
020270: stdw [r10 - 0x320], 0x0
020278: stdw [r10 - 0x328], 0x1
020280: stdw [r10 - 0x330], 0x0
020288: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
020298: stxdw [r10 - 0x180], r1
0202a0: mov64 r1, r10
0202a8: add64 r1, -0x330
0202b0: stxdw [r10 - 0x188], r1
0202b8: stb [r10 - 0x170], 0x3
0202c0: stdw [r10 - 0x178], 0x20
0202c8: stdw [r10 - 0x198], 0x0
0202d0: stdw [r10 - 0x1a8], 0x0
0202d8: mov64 r2, r10
0202e0: add64 r2, -0x1a8
0202e8: lddw r1, 0x11bf90 ; rodata b'A\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00'
0202f8: call 0xb514 ; call 0x7aba0
020300: jeq r0, 0x0, +0x1 ; branch 0x20310
020308: ja +0x81 ; branch 0x20718
020310: ldxdw r1, [r10 - 0x320]
020318: stxdw [r10 - 0x578], r1
020320: ldxdw r1, [r10 - 0x328]
020328: stxdw [r10 - 0x580], r1
020330: ldxdw r1, [r10 - 0x330]
020338: stxdw [r10 - 0x588], r1
020340: ldxdw r1, [r10 - 0xc0]
020348: stxdw [r10 - 0x5a0], r1
020350: ldxdw r1, [r10 - 0xb8]
020358: stxdw [r10 - 0x598], r1
020360: ldxdw r1, [r10 - 0xb0]
020368: stxdw [r10 - 0x590], r1
020370: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
020380: stxdw [r10 - 0x5b8], r1
020388: stw [r10 - 0x528], 0x17b1
020390: stb [r10 - 0x570], 0x2
020398: stw [r10 - 0x5a8], 0xf5
0203a0: stdw [r10 - 0x5b0], 0x2b
0203a8: stdw [r10 - 0x5c0], 0x0
0203b0: mov64 r1, r10
0203b8: add64 r1, -0x630
0203c0: mov64 r2, r10
0203c8: add64 r2, -0x5c0
0203d0: call 0x1c57c ; call 0x102fb8
0203d8: ldxdw r1, [r10 - 0x628]
0203e0: ldxdw r2, [r10 - 0x630]
0203e8: ja +0x8a ; branch 0x20840
0203f0: ldxdw r4, [r2 + 0x10]
0203f8: ldxdw r5, [r4 + 0x0]
020400: add64 r5, 0x1
020408: mov64 r0, 0x1
020410: jeq r5, 0x0, +0x1 ; branch 0x20420
020418: mov64 r0, 0x0
020420: stxdw [r10 - 0x7d0], r8
020428: stxdw [r10 - 0x7c0], r6
020430: stxdw [r4 + 0x0], r5
020438: jne r0, 0x1, +0x1 ; branch 0x20448
020440: ja -0x78 ; branch 0x20088
020448: ldxdw r5, [r2 + 0x18]
020450: ldxdw r0, [r2 + 0x20]
020458: ldxb r8, [r2 + 0x28]
020460: ldxb r6, [r2 + 0x29]
020468: ldxb r2, [r2 + 0x2a]
020470: stxb [r10 - 0x596], r2
020478: stxb [r10 - 0x597], r6
020480: stxb [r10 - 0x598], r8
020488: stxdw [r10 - 0x5a0], r0
020490: stxdw [r10 - 0x5a8], r5
020498: stxdw [r10 - 0x5b0], r4
0204a0: stxdw [r10 - 0x5b8], r1
0204a8: stxdw [r10 - 0x5c0], r3
0204b0: mov64 r1, r10
0204b8: add64 r1, -0x1a8
0204c0: mov64 r2, r10
0204c8: add64 r2, -0x5c0
0204d0: call 0xa78a ; call 0x74128
0204d8: ldxdw r1, [r10 - 0x198]
0204e0: ldxdw r2, [r10 - 0x1a0]
0204e8: ldxdw r3, [r10 - 0x1a8]
0204f0: jeq r3, 0x2, +0x1 ; branch 0x20500
0204f8: ja +0x8c ; branch 0x20960
020500: ldxdw r3, [r10 - 0x5b0]
020508: ldxdw r4, [r10 - 0x5b8]
020510: ldxdw r5, [r4 + 0x0]
020518: add64 r5, -0x1
020520: stxdw [r4 + 0x0], r5
020528: ldxdw r6, [r10 - 0x7c0]
020530: jne r5, 0x0, +0x3 ; branch 0x20550
020538: ldxdw r5, [r4 + 0x8]
020540: add64 r5, -0x1
020548: stxdw [r4 + 0x8], r5
020550: ldxdw r4, [r3 + 0x0]
020558: add64 r4, -0x1
020560: stxdw [r3 + 0x0], r4
020568: jne r4, 0x0, +0x5a ; branch 0x20840
020570: ldxdw r4, [r3 + 0x8]
020578: add64 r4, -0x1
020580: stxdw [r3 + 0x8], r4
020588: ja +0x56 ; branch 0x20840
020590: mov64 r1, r10
020598: add64 r1, -0xc0
0205a0: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
0205b0: call 0xa9c8 ; call 0x753f8
0205b8: stdw [r10 - 0x320], 0x0
0205c0: stdw [r10 - 0x328], 0x1
0205c8: stdw [r10 - 0x330], 0x0
0205d0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0205e0: stxdw [r10 - 0x180], r1
0205e8: mov64 r1, r10
0205f0: add64 r1, -0x330
0205f8: stxdw [r10 - 0x188], r1
020600: stb [r10 - 0x170], 0x3
020608: stdw [r10 - 0x178], 0x20
020610: stdw [r10 - 0x198], 0x0
020618: stdw [r10 - 0x1a8], 0x0
020620: mov64 r2, r10
020628: add64 r2, -0x1a8
020630: lddw r1, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
020640: call 0xb4ab ; call 0x7aba0
020648: jeq r0, 0x0, +0x41 ; branch 0x20858
020650: ja +0x18 ; branch 0x20718
020658: mov64 r1, r10
020660: add64 r1, -0xc0
020668: lddw r2, 0x11bffc ; rodata b'B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00'
020678: call 0xa9af ; call 0x753f8
020680: stdw [r10 - 0x320], 0x0
020688: stdw [r10 - 0x328], 0x1
020690: stdw [r10 - 0x330], 0x0
020698: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0206a8: stxdw [r10 - 0x180], r1
0206b0: mov64 r1, r10
0206b8: add64 r1, -0x330
0206c0: stxdw [r10 - 0x188], r1
0206c8: stb [r10 - 0x170], 0x3
0206d0: stdw [r10 - 0x178], 0x20
0206d8: stdw [r10 - 0x198], 0x0
0206e0: stdw [r10 - 0x1a8], 0x0
0206e8: mov64 r2, r10
0206f0: add64 r2, -0x1a8
0206f8: lddw r1, 0x11bffc ; rodata b'B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00'
020708: call 0xb492 ; call 0x7aba0
020710: jeq r0, 0x0, +0xa ; branch 0x20768
020718: mov64 r3, r10
020720: add64 r3, -0x30
020728: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
020738: mov64 r2, 0x37
020740: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
020750: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
020760: call 0x1e506 ; call 0x112f98
020768: ldxdw r1, [r10 - 0x320]
020770: stxdw [r10 - 0x578], r1
020778: ldxdw r1, [r10 - 0x328]
020780: stxdw [r10 - 0x580], r1
020788: ldxdw r1, [r10 - 0x330]
020790: stxdw [r10 - 0x588], r1
020798: ldxdw r1, [r10 - 0xc0]
0207a0: stxdw [r10 - 0x5a0], r1
0207a8: ldxdw r1, [r10 - 0xb8]
0207b0: stxdw [r10 - 0x598], r1
0207b8: ldxdw r1, [r10 - 0xb0]
0207c0: stxdw [r10 - 0x590], r1
0207c8: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
0207d8: stxdw [r10 - 0x5b8], r1
0207e0: stw [r10 - 0x528], 0x17b2
0207e8: stb [r10 - 0x570], 0x2
0207f0: stw [r10 - 0x5a8], 0xee
0207f8: stdw [r10 - 0x5b0], 0x2b
020800: stdw [r10 - 0x5c0], 0x0
020808: mov64 r1, r10
020810: add64 r1, -0x7b0
020818: mov64 r2, r10
020820: add64 r2, -0x5c0
020828: call 0x1c4f1 ; call 0x102fb8
020830: ldxdw r1, [r10 - 0x7a8]
020838: ldxdw r2, [r10 - 0x7b0]
020840: stxdw [r6 + 0x8], r1
020848: stxdw [r6 + 0x0], r2
020850: exit
020858: ldxdw r1, [r10 - 0x320]
020860: stxdw [r10 - 0x578], r1
020868: ldxdw r1, [r10 - 0x328]
020870: stxdw [r10 - 0x580], r1
020878: ldxdw r1, [r10 - 0x330]
020880: stxdw [r10 - 0x588], r1
020888: ldxdw r1, [r10 - 0xc0]
020890: stxdw [r10 - 0x5a0], r1
020898: ldxdw r1, [r10 - 0xb8]
0208a0: stxdw [r10 - 0x598], r1
0208a8: ldxdw r1, [r10 - 0xb0]
0208b0: stxdw [r10 - 0x590], r1
0208b8: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
0208c8: stxdw [r10 - 0x5b8], r1
0208d0: stw [r10 - 0x528], 0x1772
0208d8: stb [r10 - 0x570], 0x2
0208e0: stw [r10 - 0x5a8], 0xfa
0208e8: stdw [r10 - 0x5b0], 0x2b
0208f0: stdw [r10 - 0x5c0], 0x0
0208f8: mov64 r1, r10
020900: add64 r1, -0x790
020908: mov64 r2, r10
020910: add64 r2, -0x5c0
020918: call 0x1c4d3 ; call 0x102fb8
020920: ldxdw r3, [r10 - 0x788]
020928: ldxdw r2, [r10 - 0x790]
020930: mov64 r1, r10
020938: add64 r1, -0x7a0
020940: call -0x40c1 ; call 0x340
020948: ldxdw r1, [r10 - 0x798]
020950: ldxdw r2, [r10 - 0x7a0]
020958: ja -0x24 ; branch 0x20840
020960: ldxdw r4, [r10 - 0x190]
020968: stxdw [r10 - 0x5e8], r4
020970: stxdw [r10 - 0x5f0], r1
020978: stxdw [r10 - 0x5f8], r2
020980: stxdw [r10 - 0x600], r3
020988: ldxdw r1, [r10 - 0x5b0]
020990: ldxdw r2, [r10 - 0x5b8]
020998: ldxdw r3, [r2 + 0x0]
0209a0: add64 r3, -0x1
0209a8: stxdw [r2 + 0x0], r3
0209b0: ldxdw r6, [r10 - 0x7c0]
0209b8: jne r3, 0x0, +0x3 ; branch 0x209d8
0209c0: ldxdw r3, [r2 + 0x8]
0209c8: add64 r3, -0x1
0209d0: stxdw [r2 + 0x8], r3
0209d8: ldxdw r2, [r1 + 0x0]
0209e0: add64 r2, -0x1
0209e8: stxdw [r1 + 0x0], r2
0209f0: jne r2, 0x0, +0x3 ; branch 0x20a10
0209f8: ldxdw r2, [r1 + 0x8]
020a00: add64 r2, -0x1
020a08: stxdw [r1 + 0x8], r2
020a10: mov64 r1, r10
020a18: add64 r1, -0x5c0
020a20: mov64 r2, r10
020a28: add64 r2, -0x600
020a30: ldxdw r3, [r10 - 0x7c8]
020a38: call 0xa7d8 ; call 0x74900
020a40: ldxdw r2, [r10 - 0x5c0]
020a48: jeq r2, 0x2, +0x1 ; branch 0x20a58
020a50: ja +0x71 ; branch 0x20de0
020a58: ldxdw r8, [r10 - 0x5b8]
020a60: jeq r8, 0x0, +0x9 ; branch 0x20ab0
020a68: ldxdw r1, [r10 - 0x7c8]
020a70: jlt r1, r8, +0x1 ; branch 0x20a80
020a78: ja +0x25 ; branch 0x20ba8
020a80: mov64 r1, r10
020a88: add64 r1, -0x760
020a90: call 0x43d ; call 0x22c80
020a98: ldxdw r1, [r10 - 0x758]
020aa0: ldxdw r2, [r10 - 0x760]
020aa8: ja -0x4e ; branch 0x20840
020ab0: mov64 r1, r10
020ab8: add64 r1, -0x5a0
020ac0: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
020ad0: call 0xa924 ; call 0x753f8
020ad8: mov64 r1, r10
020ae0: add64 r1, -0x588
020ae8: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
020af8: call -0x306c ; call 0x87a0
020b00: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
020b10: stxdw [r10 - 0x5b8], r1
020b18: stb [r10 - 0x570], 0x2
020b20: stw [r10 - 0x5a8], 0xff
020b28: stdw [r10 - 0x5b0], 0x2b
020b30: stdw [r10 - 0x5c0], 0x0
020b38: stw [r10 - 0x528], 0x1772
020b40: mov64 r1, r10
020b48: add64 r1, -0x770
020b50: mov64 r2, r10
020b58: add64 r2, -0x5c0
020b60: call 0x1c48a ; call 0x102fb8
020b68: ldxdw r3, [r10 - 0x768]
020b70: ldxdw r2, [r10 - 0x770]
020b78: mov64 r1, r10
020b80: add64 r1, -0x780
020b88: call -0x410a ; call 0x340
020b90: ldxdw r1, [r10 - 0x778]
020b98: ldxdw r2, [r10 - 0x780]
020ba0: ja -0x6d ; branch 0x20840
020ba8: ldxdw r1, [r7 + 0x30]
020bb0: ldxdw r3, [r1 + 0x68]
020bb8: ldxdw r2, [r7 + 0x0]
020bc0: add64 r2, 0x8
020bc8: mov64 r1, r10
020bd0: add64 r1, -0x5c0
020bd8: stxdw [r10 - 0x7e0], r3
020be0: call 0x961d ; call 0x6bcd0
020be8: ldxdw r2, [r10 - 0x5c0]
020bf0: jne r2, 0x2, +0x3d ; branch 0x20de0
020bf8: stxdw [r10 - 0x7e8], r8
020c00: ldxdw r1, [r7 + 0x28]
020c08: ldxdw r8, [r1 + 0x68]
020c10: ldxdw r2, [r7 + 0x0]
020c18: add64 r2, 0x8
020c20: mov64 r1, r10
020c28: add64 r1, -0x5c0
020c30: ldxdw r3, [r10 - 0x7e0]
020c38: call 0x96dd ; call 0x6c328
020c40: ldxdw r2, [r10 - 0x5c0]
020c48: jeq r2, 0x2, +0x1 ; branch 0x20c58
020c50: ja +0x31 ; branch 0x20de0
020c58: ldxdw r4, [r10 - 0x5b8]
020c60: mov64 r1, r10
020c68: add64 r1, -0x5c0
020c70: ldxdw r2, [r10 - 0x7e8]
020c78: mov64 r3, r8
020c80: call -0x1d2f ; call 0x12310
020c88: ldxdw r2, [r10 - 0x5c0]
020c90: jeq r2, 0x2, +0x1 ; branch 0x20ca0
020c98: ja +0x28 ; branch 0x20de0
020ca0: stxdw [r10 - 0x7f0], r8
020ca8: ldxdw r8, [r10 - 0x5b8]
020cb0: jeq r8, 0x0, +0x27 ; branch 0x20df0
020cb8: ldxdw r3, [r10 - 0x7b8]
020cc0: jlt r8, r3, +0x1 ; branch 0x20cd0
020cc8: ja +0x43 ; branch 0x20ee8
020cd0: mov64 r1, r10
020cd8: add64 r1, -0x5a0
020ce0: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
020cf0: mov64 r7, r3
020cf8: call 0xa8df ; call 0x753f8
020d00: mov64 r1, r10
020d08: add64 r1, -0x588
020d10: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
020d20: call -0x30b1 ; call 0x87a0
020d28: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
020d38: stxdw [r10 - 0x5b8], r1
020d40: stb [r10 - 0x570], 0x2
020d48: stw [r10 - 0x5a8], 0x112
020d50: stdw [r10 - 0x5b0], 0x2b
020d58: stdw [r10 - 0x5c0], 0x0
020d60: stw [r10 - 0x528], 0x1774
020d68: mov64 r1, r10
020d70: add64 r1, -0x720
020d78: mov64 r2, r10
020d80: add64 r2, -0x5c0
020d88: call 0x1c445 ; call 0x102fb8
020d90: ldxdw r3, [r10 - 0x718]
020d98: ldxdw r2, [r10 - 0x720]
020da0: mov64 r1, r10
020da8: add64 r1, -0x730
020db0: mov64 r4, r8
020db8: mov64 r5, r7
020dc0: call -0x3eb1 ; call 0x1840
020dc8: ldxdw r1, [r10 - 0x728]
020dd0: ldxdw r2, [r10 - 0x730]
020dd8: ja -0xb4 ; branch 0x20840
020de0: ldxdw r1, [r10 - 0x5b8]
020de8: ja -0xb6 ; branch 0x20840
020df0: mov64 r1, r10
020df8: add64 r1, -0x5a0
020e00: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
020e10: call 0xa8bc ; call 0x753f8
020e18: mov64 r1, r10
020e20: add64 r1, -0x588
020e28: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
020e38: call -0x30d4 ; call 0x87a0
020e40: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
020e50: stxdw [r10 - 0x5b8], r1
020e58: stb [r10 - 0x570], 0x2
020e60: stw [r10 - 0x5a8], 0x111
020e68: stdw [r10 - 0x5b0], 0x2b
020e70: stdw [r10 - 0x5c0], 0x0
020e78: stw [r10 - 0x528], 0x1771
020e80: mov64 r1, r10
020e88: add64 r1, -0x740
020e90: mov64 r2, r10
020e98: add64 r2, -0x5c0
020ea0: call 0x1c422 ; call 0x102fb8
020ea8: ldxdw r3, [r10 - 0x738]
020eb0: ldxdw r2, [r10 - 0x740]
020eb8: mov64 r1, r10
020ec0: add64 r1, -0x750
020ec8: call -0x4172 ; call 0x340
020ed0: ldxdw r1, [r10 - 0x748]
020ed8: ldxdw r2, [r10 - 0x750]
020ee0: ja -0xd5 ; branch 0x20840
020ee8: ldxdw r1, [r10 - 0x7f0]
020ef0: jgt r1, r8, +0x1 ; branch 0x20f00
020ef8: ja +0xe0 ; branch 0x21600
020f00: stxdw [r10 - 0x7f8], r8
020f08: ldxdw r1, [r7 + 0x0]
020f10: ldxdw r1, [r1 + 0x0]
020f18: ldxdw r1, [r1 + 0x0]
020f20: ldxdw r2, [r1 + 0x18]
020f28: stxdw [r10 - 0x5c8], r2
020f30: ldxdw r2, [r1 + 0x10]
020f38: stxdw [r10 - 0x5d0], r2
020f40: ldxdw r2, [r1 + 0x8]
020f48: stxdw [r10 - 0x5d8], r2
020f50: ldxdw r1, [r1 + 0x0]
020f58: stxdw [r10 - 0x5e0], r1
020f60: ldxdw r2, [r7 + 0x50]
020f68: ldxdw r3, [r7 + 0x20]
020f70: ldxdw r4, [r7 + 0x40]
020f78: ldxdw r1, [r7 + 0x30]
020f80: ldxdw r5, [r7 + 0x38]
020f88: ldxb r8, [r9 + 0x21]
020f90: mov64 r0, r10
020f98: add64 r0, -0x330
020fa0: stxdw [r10 - 0x5a0], r0
020fa8: mov64 r0, r10
020fb0: add64 r0, -0x5e0
020fb8: stxdw [r10 - 0x5b0], r0
020fc0: lddw r0, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
020fd0: stxdw [r10 - 0x5c0], r0
020fd8: mov64 r0, r10
020fe0: add64 r0, -0x5c0
020fe8: stxdw [r10 - 0x1a8], r0
020ff0: stxdw [r10 - 0x800], r8
020ff8: stxb [r10 - 0x330], r8
021000: stdw [r10 - 0x598], 0x1
021008: stdw [r10 - 0x5a8], 0x20
021010: stdw [r10 - 0x5b8], 0xb
021018: stdw [r10 - 0x1a0], 0x3
021020: mov64 r0, r10
021028: add64 r0, -0x1a8
021030: stxdw [r10 - 0xfe8], r0
021038: ldxdw r0, [r10 - 0x7c8]
021040: stxdw [r10 - 0xff0], r0
021048: stxdw [r10 - 0xff8], r5
021050: stxdw [r10 - 0x1000], r1
021058: stdw [r10 - 0xfe0], 0x1
021060: mov64 r1, r10
021068: add64 r1, -0x660
021070: mov64 r5, r10
021078: call 0xa2e7 ; call 0x727b8
021080: ldxdw r1, [r10 - 0x658]
021088: ldxdw r2, [r10 - 0x660]
021090: jeq r2, 0x2, +0x1 ; branch 0x210a0
021098: ja -0x10c ; branch 0x20840
0210a0: ldxdw r2, [r7 + 0x48]
0210a8: mov64 r1, r10
0210b0: add64 r1, -0x5a8
0210b8: call -0x25e9 ; call 0xe178
0210c0: ldxdw r1, [r7 + 0x18]
0210c8: ldxdw r2, [r1 + 0x58]
0210d0: mov64 r8, r10
0210d8: add64 r8, -0x1a8
0210e0: mov64 r1, r8
0210e8: call -0x25ef ; call 0xe178
0210f0: ldxdw r1, [r7 + 0x28]
0210f8: ldxdw r2, [r1 + 0x20]
021100: mov64 r1, r10
021108: add64 r1, -0x178
021110: call -0x25f4 ; call 0xe178
021118: ldxdw r1, [r7 + 0x0]
021120: ldxdw r2, [r1 + 0x0]
021128: mov64 r1, r10
021130: add64 r1, -0x148
021138: call -0x25f9 ; call 0xe178
021140: ldxdw r1, [r7 + 0x0]
021148: ldxh r2, [r1 + 0x118]
021150: stxh [r10 - 0x30], r2
021158: mov64 r2, r10
021160: add64 r2, -0x220
021168: ldxb r3, [r1 + 0x11a]
021170: stxdw [r10 - 0x2e0], r2
021178: mov64 r2, r1
021180: add64 r2, 0x48
021188: stxdw [r10 - 0x2f0], r2
021190: mov64 r2, r1
021198: add64 r2, 0x28
0211a0: stxdw [r10 - 0x300], r2
0211a8: add64 r1, 0x8
0211b0: stxdw [r10 - 0x310], r1
0211b8: mov64 r1, r10
0211c0: add64 r1, -0x30
0211c8: stxdw [r10 - 0x320], r1
0211d0: lddw r1, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0211e0: stxdw [r10 - 0x330], r1
0211e8: stxb [r10 - 0x220], r3
0211f0: mov64 r1, r10
0211f8: add64 r1, -0x330
021200: stxdw [r10 - 0xc0], r1
021208: stdw [r10 - 0x2d8], 0x1
021210: stdw [r10 - 0x2e8], 0x20
021218: stdw [r10 - 0x2f8], 0x20
021220: stdw [r10 - 0x308], 0x20
021228: stdw [r10 - 0x318], 0x2
021230: stdw [r10 - 0x328], 0x4
021238: stdw [r10 - 0xb8], 0x6
021240: mov64 r1, r10
021248: add64 r1, -0x578
021250: mov64 r2, r8
021258: mov64 r3, 0x90
021260: call 0x1f0c6 ; call 0x119898
021268: mov64 r1, r10
021270: add64 r1, -0xc0
021278: stxdw [r10 - 0x4e8], r1
021280: stdw [r10 - 0x4e0], 0x1
021288: stdw [r10 - 0x5b0], 0x0
021290: stdw [r10 - 0x5b8], 0x8
021298: stdw [r10 - 0x5c0], 0x0
0212a0: mov64 r1, r10
0212a8: add64 r1, -0x670
0212b0: mov64 r2, r10
0212b8: add64 r2, -0x5c0
0212c0: ldxdw r3, [r10 - 0x7f8]
0212c8: call 0x1a8eb ; call 0xf5a28
0212d0: ldxdw r1, [r10 - 0x668]
0212d8: ldxdw r2, [r10 - 0x670]
0212e0: jne r2, 0x2, -0x155 ; branch 0x20840
0212e8: ldxdw r2, [r7 + 0x28]
0212f0: add64 r2, 0x20
0212f8: mov64 r1, r10
021300: add64 r1, -0x680
021308: call -0x3709 ; call 0x5ac8
021310: ldxdw r1, [r10 - 0x678]
021318: ldxdw r2, [r10 - 0x680]
021320: jne r2, 0x2, -0x15d ; branch 0x20840
021328: ldxdw r2, [r7 + 0x30]
021330: add64 r2, 0x20
021338: mov64 r1, r10
021340: add64 r1, -0x690
021348: call -0x3711 ; call 0x5ac8
021350: ldxdw r1, [r10 - 0x688]
021358: ldxdw r2, [r10 - 0x690]
021360: jne r2, 0x2, -0x165 ; branch 0x20840
021368: ldxdw r2, [r7 + 0x40]
021370: add64 r2, 0x20
021378: mov64 r1, r10
021380: add64 r1, -0x6a0
021388: call -0x3719 ; call 0x5ac8
021390: ldxdw r1, [r10 - 0x698]
021398: ldxdw r2, [r10 - 0x6a0]
0213a0: jne r2, 0x2, -0x16d ; branch 0x20840
0213a8: ldxdw r2, [r7 + 0x18]
0213b0: mov64 r1, r10
0213b8: add64 r1, -0x6b0
0213c0: call -0x3769 ; call 0x5880
0213c8: ldxdw r1, [r10 - 0x6a8]
0213d0: ldxdw r2, [r10 - 0x6b0]
0213d8: jne r2, 0x2, -0x174 ; branch 0x20840
0213e0: mov64 r1, r10
0213e8: add64 r1, -0x5c0
0213f0: call 0x1cb48 ; call 0x106e38
0213f8: ldxdw r1, [r10 - 0x5c0]
021400: jne r1, 0x0, +0x60 ; branch 0x21708
021408: ldxdw r1, [r10 - 0x598]
021410: stxdw [r10 - 0x808], r1
021418: ldxdw r1, [r7 + 0x0]
021420: ldxdw r2, [r1 + 0x0]
021428: ldxdw r2, [r2 + 0x0]
021430: ldxdw r3, [r2 + 0x18]
021438: stxdw [r10 - 0x18], r3
021440: ldxdw r3, [r2 + 0x10]
021448: stxdw [r10 - 0x20], r3
021450: ldxdw r3, [r2 + 0x8]
021458: stxdw [r10 - 0x28], r3
021460: ldxdw r2, [r2 + 0x0]
021468: stxdw [r10 - 0x30], r2
021470: ldxdw r2, [r7 + 0x38]
021478: ldxdw r2, [r2 + 0x0]
021480: ldxdw r3, [r2 + 0x18]
021488: stxdw [r10 - 0xa8], r3
021490: ldxdw r3, [r2 + 0x10]
021498: stxdw [r10 - 0xb0], r3
0214a0: ldxdw r3, [r2 + 0x8]
0214a8: stxdw [r10 - 0xb8], r3
0214b0: ldxdw r2, [r2 + 0x0]
0214b8: stxdw [r10 - 0xc0], r2
0214c0: ldxdw r2, [r7 + 0x40]
0214c8: ldxdw r2, [r2 + 0x20]
0214d0: ldxdw r2, [r2 + 0x0]
0214d8: ldxdw r3, [r2 + 0x18]
0214e0: stxdw [r10 - 0x318], r3
0214e8: ldxdw r3, [r2 + 0x10]
0214f0: stxdw [r10 - 0x320], r3
0214f8: ldxdw r3, [r2 + 0x8]
021500: stxdw [r10 - 0x328], r3
021508: ldxdw r2, [r2 + 0x0]
021510: stxdw [r10 - 0x330], r2
021518: ldxdw r2, [r1 + 0xe0]
021520: stxdw [r10 - 0x190], r2
021528: ldxdw r2, [r1 + 0xd8]
021530: stxdw [r10 - 0x198], r2
021538: ldxdw r2, [r1 + 0xd0]
021540: stxdw [r10 - 0x1a0], r2
021548: ldxdw r1, [r1 + 0xc8]
021550: stxdw [r10 - 0x1a8], r1
021558: lddw r1, 0x300000000
021568: ldxdw r1, [r1 + 0x0]
021570: mov64 r2, 0x0
021578: mov64 r4, 0x1
021580: mov64 r3, r1
021588: add64 r3, -0x12
021590: jgt r3, r1, +0x1 ; branch 0x215a0
021598: mov64 r4, 0x0
0215a0: jne r4, 0x0, +0x1 ; branch 0x215b0
0215a8: mov64 r2, r3
0215b0: lddw r8, 0x300007fee
0215c0: jeq r1, 0x0, +0x1 ; branch 0x215d0
0215c8: mov64 r8, r2
0215d0: lddw r1, 0x300000007
0215e0: jgt r8, r1, +0x33 ; branch 0x21780
0215e8: mov64 r1, 0x1
0215f0: mov64 r2, 0x12
0215f8: call 0x1dfa9 ; call 0x111348
021600: mov64 r1, r10
021608: add64 r1, -0x5a0
021610: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
021620: call 0xa7ba ; call 0x753f8
021628: mov64 r1, r10
021630: add64 r1, -0x588
021638: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
021648: call -0x31d6 ; call 0x87a0
021650: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
021660: stxdw [r10 - 0x5b8], r1
021668: stb [r10 - 0x570], 0x2
021670: stw [r10 - 0x5a8], 0x118
021678: stdw [r10 - 0x5b0], 0x2b
021680: stdw [r10 - 0x5c0], 0x0
021688: stw [r10 - 0x528], 0x1773
021690: mov64 r1, r10
021698: add64 r1, -0x640
0216a0: mov64 r2, r10
0216a8: add64 r2, -0x5c0
0216b0: call 0x1c320 ; call 0x102fb8
0216b8: ldxdw r3, [r10 - 0x638]
0216c0: ldxdw r2, [r10 - 0x640]
0216c8: mov64 r1, r10
0216d0: add64 r1, -0x650
0216d8: ldxdw r4, [r10 - 0x7f0]
0216e0: mov64 r5, r8
0216e8: call -0x3fd6 ; call 0x1840
0216f0: ldxdw r1, [r10 - 0x648]
0216f8: ldxdw r2, [r10 - 0x650]
021700: ja -0x1d9 ; branch 0x20840
021708: ldxdw r1, [r10 - 0x5b8]
021710: ldxdw r2, [r10 - 0x5b0]
021718: ldxdw r3, [r10 - 0x5a8]
021720: stxdw [r10 - 0x5b0], r3
021728: stxdw [r10 - 0x5b8], r2
021730: stxdw [r10 - 0x5c0], r1
021738: mov64 r1, r10
021740: add64 r1, -0x6c0
021748: mov64 r2, r10
021750: add64 r2, -0x5c0
021758: call 0x1c31c ; call 0x103040
021760: ldxdw r1, [r10 - 0x6b8]
021768: ldxdw r2, [r10 - 0x6c0]
021770: ldxdw r6, [r10 - 0x7c0]
021778: ja -0x1e8 ; branch 0x20840
021780: ldxdw r6, [r10 - 0x7c8]
021788: ldxdw r1, [r10 - 0x7e8]
021790: sub64 r6, r1
021798: lddw r1, 0x300000000
0217a8: stxdw [r1 + 0x0], r8
0217b0: lddw r1, 0x5f65746f75715f74
0217c0: stxdw [r8 + 0x8], r1
0217c8: lddw r1, 0x636178655f797562
0217d8: stxdw [r8 + 0x0], r1
0217e0: sth [r8 + 0x10], 0x6e69
0217e8: ldxdw r1, [r7 + 0x0]
0217f0: ldxdw r2, [r1 + 0xf0]
0217f8: stxdw [r10 - 0x818], r2
021800: ldxdw r2, [r1 + 0xe8]
021808: stxdw [r10 - 0x810], r2
021810: add64 r1, 0x8
021818: call 0x9545 ; call 0x6c248
021820: lddw r1, 0x38d7ea4c68000
021830: ldxdw r2, [r7 + 0x0]
021838: ldxb r3, [r2 + 0x11b]
021840: jeq r3, 0x0, +0x1 ; branch 0x21850
021848: ja +0x2 ; branch 0x21860
021850: ldxdw r1, [r7 + 0x18]
021858: ldxdw r1, [r1 + 0x28]
021860: ldxdw r2, [r2 + 0x110]
021868: ldxdw r3, [r10 - 0x7e0]
021870: stxdw [r10 - 0x578], r3
021878: ldxdw r3, [r10 - 0x7f0]
021880: stxdw [r10 - 0x580], r3
021888: ldxdw r3, [r10 - 0x7d8]
021890: stxdw [r10 - 0x588], r3
021898: ldxdw r3, [r10 - 0x7d0]
0218a0: stxdw [r10 - 0x598], r3
0218a8: ldxdw r3, [r10 - 0x7f8]
0218b0: stxdw [r10 - 0x5a0], r3
0218b8: ldxdw r3, [r10 - 0x808]
0218c0: stxdw [r10 - 0x5a8], r3
0218c8: ldxdw r3, [r10 - 0x7e8]
0218d0: stxdw [r10 - 0x570], r3
0218d8: stxdw [r10 - 0x540], r3
0218e0: stxdw [r10 - 0x548], r3
0218e8: ldxdw r3, [r10 - 0x30]
0218f0: stxdw [r10 - 0x538], r3
0218f8: ldxdw r3, [r10 - 0x28]
021900: stxdw [r10 - 0x530], r3
021908: ldxdw r3, [r10 - 0x20]
021910: stxdw [r10 - 0x528], r3
021918: ldxdw r3, [r10 - 0x18]
021920: stxdw [r10 - 0x520], r3
021928: stdw [r10 - 0x568], 0x0
021930: stdw [r10 - 0x590], 0x0
021938: stdw [r10 - 0x560], 0x0
021940: stdw [r10 - 0x558], 0x0
021948: stdw [r10 - 0x550], 0x0
021950: ldxdw r3, [r10 - 0xa8]
021958: stxdw [r10 - 0x500], r3
021960: ldxdw r3, [r10 - 0xb0]
021968: stxdw [r10 - 0x508], r3
021970: ldxdw r3, [r10 - 0xb8]
021978: stxdw [r10 - 0x510], r3
021980: ldxdw r3, [r10 - 0xc0]
021988: stxdw [r10 - 0x518], r3
021990: ldxdw r3, [r10 - 0x330]
021998: stxdw [r10 - 0x4d8], r3
0219a0: ldxdw r3, [r10 - 0x328]
0219a8: stxdw [r10 - 0x4d0], r3
0219b0: ldxdw r3, [r10 - 0x320]
0219b8: stxdw [r10 - 0x4c8], r3
0219c0: ldxdw r3, [r10 - 0x318]
0219c8: stxdw [r10 - 0x4c0], r3
0219d0: stdw [r10 - 0x4f8], 0x0
0219d8: stdw [r10 - 0x4f0], 0x0
0219e0: stdw [r10 - 0x4e8], 0x0
0219e8: stdw [r10 - 0x4e0], 0x0
0219f0: ldxdw r3, [r10 - 0x190]
0219f8: stxdw [r10 - 0x460], r3
021a00: ldxdw r3, [r10 - 0x198]
021a08: stxdw [r10 - 0x468], r3
021a10: ldxdw r3, [r10 - 0x1a0]
021a18: stxdw [r10 - 0x470], r3
021a20: ldxdw r3, [r10 - 0x1a8]
021a28: stxdw [r10 - 0x478], r3
021a30: stdw [r10 - 0x480], 0x0
021a38: stdw [r10 - 0x488], 0x0
021a40: stdw [r10 - 0x490], 0x0
021a48: stdw [r10 - 0x498], 0x0
021a50: stdw [r10 - 0x4a0], 0x0
021a58: stdw [r10 - 0x4a8], 0x0
021a60: stdw [r10 - 0x4b0], 0x0
021a68: stdw [r10 - 0x4b8], 0x0
021a70: stb [r10 - 0x3c8], 0x0
021a78: stdw [r10 - 0x458], 0x0
021a80: stdw [r10 - 0x450], 0x0
021a88: stdw [r10 - 0x448], 0x0
021a90: stdw [r10 - 0x440], 0x0
021a98: stdw [r10 - 0x438], 0x0
021aa0: stdw [r10 - 0x430], 0x0
021aa8: ldxdw r3, [r10 - 0x7b8]
021ab0: stxdw [r10 - 0x428], r3
021ab8: stxdw [r10 - 0x5b8], r8
021ac0: stdw [r10 - 0x5b0], 0x12
021ac8: stdw [r10 - 0x5c0], 0x12
021ad0: stdw [r10 - 0x408], 0x0
021ad8: stdw [r10 - 0x410], 0x0
021ae0: stdw [r10 - 0x418], 0x0
021ae8: stdw [r10 - 0x420], 0x0
021af0: ldxdw r3, [r10 - 0x818]
021af8: stxdw [r10 - 0x3f8], r3
021b00: ldxdw r3, [r10 - 0x810]
021b08: stxdw [r10 - 0x400], r3
021b10: stxb [r10 - 0x3c7], r0
021b18: stxdw [r10 - 0x3f0], r1
021b20: stdw [r10 - 0x3e0], 0x0
021b28: stdw [r10 - 0x3e8], 0x0
021b30: stxdw [r10 - 0x3d0], r6
021b38: stxdw [r10 - 0x3d8], r2
021b40: mov64 r1, r10
021b48: add64 r1, -0x1a8
021b50: mov64 r6, r10
021b58: add64 r6, -0x5c0
021b60: mov64 r2, r6
021b68: call 0x12025 ; call 0xb1c98
021b70: ldxdw r1, [r10 - 0x198]
021b78: stxdw [r10 - 0x328], r1
021b80: ldxdw r1, [r10 - 0x1a0]
021b88: stxdw [r10 - 0x330], r1
021b90: mov64 r1, r10
021b98: add64 r1, -0x330
021ba0: mov64 r2, 0x1
021ba8: call 0x1c9da ; call 0x106a80
021bb0: mov64 r2, r7
021bb8: add64 r2, 0x58
021bc0: mov64 r1, r10
021bc8: add64 r1, -0x3c0
021bd0: stxdw [r10 - 0x7b8], r1
021bd8: stxdw [r10 - 0x7e0], r2
021be0: call -0x274e ; call 0xe178
021be8: ldxb r8, [r9 + 0x22]
021bf0: mov64 r1, r10
021bf8: add64 r1, -0x390
021c00: mov64 r2, r6
021c08: call 0x12011 ; call 0xb1c98
021c10: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
021c20: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
021c30: add64 r2, 0x8
021c38: stxdw [r10 - 0x350], r2
021c40: stxdw [r10 - 0x358], r1
021c48: ldxdw r1, [r10 - 0x390]
021c50: stxdw [r10 - 0x368], r1
021c58: ldxdw r1, [r10 - 0x388]
021c60: stxdw [r10 - 0x370], r1
021c68: stxdw [r10 - 0x378], r1
021c70: ldxdw r2, [r10 - 0x380]
021c78: add64 r1, r2
021c80: stxdw [r10 - 0x360], r1
021c88: mov64 r1, r10
021c90: add64 r1, -0x30
021c98: mov64 r2, r10
021ca0: add64 r2, -0x378
021ca8: call -0x23dd ; call 0xfdc8
021cb0: ldxdw r6, [r10 - 0x28]
021cb8: ldxdw r1, [r10 - 0x20]
021cc0: stxdw [r10 - 0x7d8], r1
021cc8: mov64 r1, 0x22
021cd0: mov64 r2, 0x1
021cd8: call -0x2d6f ; call 0xb168
021ce0: ldxdw r1, [r10 - 0x3c0]
021ce8: ldxdw r2, [r1 + 0x18]
021cf0: ldxdw r3, [r1 + 0x10]
021cf8: ldxdw r4, [r1 + 0x8]
021d00: ldxdw r1, [r1 + 0x0]
021d08: stxdw [r0 + 0x0], r1
021d10: stxdw [r0 + 0x8], r4
021d18: stxdw [r0 + 0x10], r3
021d20: stxdw [r0 + 0x18], r2
021d28: sth [r0 + 0x20], 0x1
021d30: stxdw [r10 - 0x328], r0
021d38: stdw [r10 - 0x330], 0x1
021d40: stdw [r10 - 0x320], 0x1
021d48: mov64 r9, r10
021d50: add64 r9, -0x1a8
021d58: mov64 r5, r10
021d60: add64 r5, -0x330
021d68: mov64 r1, r9
021d70: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
021d80: mov64 r3, r6
021d88: ldxdw r4, [r10 - 0x7d8]
021d90: call 0x1d7b7 ; call 0x10db50
021d98: mov64 r6, r10
021da0: add64 r6, -0x330
021da8: mov64 r1, r6
021db0: ldxdw r2, [r10 - 0x7b8]
021db8: mov64 r3, 0x30
021dc0: call 0x1ef5a ; call 0x119898
021dc8: mov64 r1, r10
021dd0: add64 r1, -0xc0
021dd8: stxdw [r10 - 0x220], r1
021de0: mov64 r1, r10
021de8: add64 r1, -0x1c0
021df0: stxdw [r10 - 0xb0], r1
021df8: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
021e08: stxdw [r10 - 0xc0], r1
021e10: stxdw [r10 - 0x7b8], r8
021e18: stxb [r10 - 0x1c0], r8
021e20: stdw [r10 - 0x218], 0x2
021e28: stdw [r10 - 0xa8], 0x1
021e30: stdw [r10 - 0xb8], 0x11
021e38: mov64 r1, r10
021e40: add64 r1, -0x220
021e48: stxdw [r10 - 0x1000], r1
021e50: stdw [r10 - 0xff8], 0x1
021e58: mov64 r1, r10
021e60: add64 r1, -0x348
021e68: mov64 r5, r10
021e70: mov64 r2, r9
021e78: mov64 r3, r6
021e80: mov64 r4, 0x1
021e88: call 0x1c985 ; call 0x106ab8
021e90: lddw r1, -0x7fffffffffffffe6
021ea0: ldxdw r2, [r10 - 0x348]
021ea8: jne r2, r1, +0x107 ; branch 0x226e8
021eb0: ldxdw r1, [r10 - 0x320]
021eb8: ldxdw r2, [r10 - 0x328]
021ec0: ldxdw r3, [r2 + 0x0]
021ec8: add64 r3, -0x1
021ed0: stxdw [r2 + 0x0], r3
021ed8: jne r3, 0x0, +0x3 ; branch 0x21ef8
021ee0: ldxdw r3, [r2 + 0x8]
021ee8: add64 r3, -0x1
021ef0: stxdw [r2 + 0x8], r3
021ef8: ldxdw r2, [r1 + 0x0]
021f00: add64 r2, -0x1
021f08: stxdw [r1 + 0x0], r2
021f10: jne r2, 0x0, +0x3 ; branch 0x21f30
021f18: ldxdw r2, [r1 + 0x8]
021f20: add64 r2, -0x1
021f28: stxdw [r1 + 0x8], r2
021f30: ldxdw r1, [r7 + 0x18]
021f38: ldxdw r1, [r1 + 0x58]
021f40: ldxdw r1, [r1 + 0x0]
021f48: ldxdw r2, [r1 + 0x18]
021f50: stxdw [r10 - 0x318], r2
021f58: ldxdw r2, [r1 + 0x10]
021f60: stxdw [r10 - 0x320], r2
021f68: ldxdw r2, [r1 + 0x8]
021f70: stxdw [r10 - 0x328], r2
021f78: ldxdw r2, [r1 + 0x0]
021f80: stxdw [r10 - 0x330], r2
021f88: ldxdw r2, [r1 + 0x18]
021f90: stxdw [r10 - 0x190], r2
021f98: ldxdw r2, [r1 + 0x10]
021fa0: stxdw [r10 - 0x198], r2
021fa8: ldxdw r2, [r1 + 0x8]
021fb0: stxdw [r10 - 0x1a0], r2
021fb8: ldxdw r1, [r1 + 0x0]
021fc0: stxdw [r10 - 0x1a8], r1
021fc8: mov64 r1, r10
021fd0: add64 r1, -0x310
021fd8: mov64 r2, r10
021fe0: add64 r2, -0x1a8
021fe8: call 0x1336 ; call 0x2b9a0
021ff0: ldxdw r1, [r7 + 0x0]
021ff8: ldxdw r2, [r1 + 0x0]
022000: ldxdw r2, [r2 + 0x0]
022008: ldxdw r3, [r2 + 0x18]
022010: stxdw [r10 - 0x2d8], r3
022018: ldxdw r3, [r2 + 0x10]
022020: stxdw [r10 - 0x2e0], r3
022028: ldxdw r3, [r2 + 0x8]
022030: stxdw [r10 - 0x2e8], r3
022038: ldxdw r2, [r2 + 0x0]
022040: stxdw [r10 - 0x2f0], r2
022048: ldxdw r2, [r7 + 0x8]
022050: ldxdw r2, [r2 + 0x0]
022058: ldxdw r3, [r2 + 0x10]
022060: stxdw [r10 - 0x2c0], r3
022068: ldxdw r3, [r2 + 0x8]
022070: stxdw [r10 - 0x2c8], r3
022078: ldxdw r3, [r2 + 0x0]
022080: stxdw [r10 - 0x2d0], r3
022088: ldxdw r2, [r2 + 0x18]
022090: stxdw [r10 - 0x2b8], r2
022098: ldxdw r2, [r7 + 0x30]
0220a0: ldxdw r2, [r2 + 0x68]
0220a8: ldxdw r3, [r7 + 0x28]
0220b0: ldxdw r3, [r3 + 0x68]
0220b8: ldxdw r4, [r7 + 0x40]
0220c0: ldxdw r4, [r4 + 0x68]
0220c8: ldxdw r5, [r1 + 0xf0]
0220d0: ldxdw r1, [r1 + 0xe8]
0220d8: stxdw [r10 - 0x2b0], r1
0220e0: stxdw [r10 - 0x2a8], r5
0220e8: ldxdw r1, [r10 - 0x7f8]
0220f0: stxdw [r10 - 0x288], r1
0220f8: ldxdw r1, [r10 - 0x7c8]
022100: stxdw [r10 - 0x290], r1
022108: ldxdw r1, [r10 - 0x7d0]
022110: stxdw [r10 - 0x298], r1
022118: ldxdw r1, [r10 - 0x808]
022120: stxdw [r10 - 0x2a0], r1
022128: stxdw [r10 - 0x270], r4
022130: stxdw [r10 - 0x278], r3
022138: stxdw [r10 - 0x280], r2
022140: mov64 r1, r10
022148: add64 r1, -0x1a8
022150: mov64 r6, r10
022158: add64 r6, -0x330
022160: mov64 r2, r6
022168: call 0xdc9e ; call 0x90660
022170: ldxdw r1, [r10 - 0x198]
022178: stxdw [r10 - 0xb8], r1
022180: ldxdw r1, [r10 - 0x1a0]
022188: stxdw [r10 - 0xc0], r1
022190: mov64 r1, r10
022198: add64 r1, -0xc0
0221a0: mov64 r2, 0x1
0221a8: call 0x1c91a ; call 0x106a80
0221b0: mov64 r8, r10
0221b8: add64 r8, -0x268
0221c0: mov64 r1, r8
0221c8: ldxdw r2, [r10 - 0x7e0]
0221d0: call -0x280c ; call 0xe178
0221d8: mov64 r1, r10
0221e0: add64 r1, -0x238
0221e8: mov64 r2, r6
0221f0: call 0xdc8d ; call 0x90660
0221f8: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
022208: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
022218: add64 r2, 0x8
022220: stxdw [r10 - 0x1e0], r2
022228: stxdw [r10 - 0x1e8], r1
022230: ldxdw r1, [r10 - 0x238]
022238: stxdw [r10 - 0x1f8], r1
022240: ldxdw r1, [r10 - 0x230]
022248: stxdw [r10 - 0x200], r1
022250: stxdw [r10 - 0x208], r1
022258: ldxdw r2, [r10 - 0x228]
022260: add64 r1, r2
022268: stxdw [r10 - 0x1f0], r1
022270: mov64 r1, r10
022278: add64 r1, -0x220
022280: mov64 r2, r10
022288: add64 r2, -0x208
022290: call -0x249a ; call 0xfdc8
022298: ldxdw r9, [r10 - 0x218]
0222a0: ldxdw r1, [r10 - 0x210]
0222a8: stxdw [r10 - 0x7c8], r1
0222b0: mov64 r1, 0x22
0222b8: mov64 r2, 0x1
0222c0: call -0x2e2c ; call 0xb168
0222c8: ldxdw r1, [r10 - 0x268]
0222d0: ldxdw r2, [r1 + 0x18]
0222d8: ldxdw r3, [r1 + 0x10]
0222e0: ldxdw r4, [r1 + 0x8]
0222e8: ldxdw r1, [r1 + 0x0]
0222f0: stxdw [r0 + 0x0], r1
0222f8: stxdw [r0 + 0x8], r4
022300: stxdw [r0 + 0x10], r3
022308: stxdw [r0 + 0x18], r2
022310: sth [r0 + 0x20], 0x1
022318: stxdw [r10 - 0xb8], r0
022320: stdw [r10 - 0xc0], 0x1
022328: stdw [r10 - 0xb0], 0x1
022330: mov64 r6, r10
022338: add64 r6, -0x1a8
022340: mov64 r5, r10
022348: add64 r5, -0xc0
022350: mov64 r1, r6
022358: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
022368: mov64 r3, r9
022370: ldxdw r4, [r10 - 0x7c8]
022378: call 0x1d6fa ; call 0x10db50
022380: mov64 r9, r10
022388: add64 r9, -0xc0
022390: mov64 r1, r9
022398: mov64 r2, r8
0223a0: mov64 r3, 0x30
0223a8: call 0x1ee9d ; call 0x119898
0223b0: mov64 r1, r10
0223b8: add64 r1, -0x30
0223c0: stxdw [r10 - 0x1c0], r1
0223c8: mov64 r1, r10
0223d0: add64 r1, -0x1a9
0223d8: stxdw [r10 - 0x20], r1
0223e0: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
0223f0: stxdw [r10 - 0x30], r1
0223f8: ldxdw r1, [r10 - 0x7b8]
022400: stxb [r10 - 0x1a9], r1
022408: stdw [r10 - 0x1b8], 0x2
022410: stdw [r10 - 0x18], 0x1
022418: stdw [r10 - 0x28], 0x11
022420: mov64 r1, r10
022428: add64 r1, -0x1c0
022430: stxdw [r10 - 0x1000], r1
022438: stdw [r10 - 0xff8], 0x1
022440: mov64 r1, r10
022448: add64 r1, -0x1d8
022450: mov64 r5, r10
022458: mov64 r2, r6
022460: mov64 r3, r9
022468: mov64 r4, 0x1
022470: call 0x1c8c8 ; call 0x106ab8
022478: lddw r1, -0x7fffffffffffffe6
022488: ldxdw r2, [r10 - 0x1d8]
022490: jeq r2, r1, +0x1 ; branch 0x224a0
022498: ja +0x62 ; branch 0x227b0
0224a0: ldxdw r1, [r10 - 0xb0]
0224a8: ldxdw r2, [r10 - 0xb8]
0224b0: ldxdw r3, [r2 + 0x0]
0224b8: add64 r3, -0x1
0224c0: stxdw [r2 + 0x0], r3
0224c8: jne r3, 0x0, +0x3 ; branch 0x224e8
0224d0: ldxdw r3, [r2 + 0x8]
0224d8: add64 r3, -0x1
0224e0: stxdw [r2 + 0x8], r3
0224e8: ldxdw r2, [r1 + 0x0]
0224f0: add64 r2, -0x1
0224f8: stxdw [r1 + 0x0], r2
022500: jne r2, 0x0, +0x3 ; branch 0x22520
022508: ldxdw r2, [r1 + 0x8]
022510: add64 r2, -0x1
022518: stxdw [r1 + 0x8], r2
022520: ldxdw r1, [r7 + 0x40]
022528: ldxdw r1, [r1 + 0x68]
022530: jeq r1, 0x0, +0x1 ; branch 0x22540
022538: ja +0xe5 ; branch 0x22c68
022540: ldxdw r1, [r10 - 0x600]
022548: jeq r1, 0x0, +0xab ; branch 0x22aa8
022550: ldxdw r1, [r7 + 0x20]
022558: ldxdw r2, [r1 + 0x58]
022560: mov64 r1, r10
022568: add64 r1, -0x1a8
022570: call -0x2880 ; call 0xe178
022578: ldxdw r1, [r10 - 0x198]
022580: ldxdw r3, [r10 - 0x1a0]
022588: ldxdw r4, [r3 + 0x0]
022590: add64 r4, -0x1
022598: ldxb r2, [r10 - 0x17f]
0225a0: stxdw [r3 + 0x0], r4
0225a8: jne r4, 0x0, +0x3 ; branch 0x225c8
0225b0: ldxdw r4, [r3 + 0x8]
0225b8: add64 r4, -0x1
0225c0: stxdw [r3 + 0x8], r4
0225c8: ldxdw r3, [r1 + 0x0]
0225d0: add64 r3, -0x1
0225d8: stxdw [r1 + 0x0], r3
0225e0: jne r3, 0x0, +0x3 ; branch 0x22600
0225e8: ldxdw r3, [r1 + 0x8]
0225f0: add64 r3, -0x1
0225f8: stxdw [r1 + 0x8], r3
022600: mov64 r1, r2
022608: jne r1, 0x0, +0x49 ; branch 0x22858
022610: mov64 r1, r10
022618: add64 r1, -0x188
022620: lddw r2, 0x11bf5c ; rodata b"X\x00\x00\x00\x16\x00\x00\x00V\x00\x00\x00\t\x00\x00\x00J\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00"
022630: call 0xa5b8 ; call 0x753f8
022638: mov64 r1, r10
022640: add64 r1, -0x170
022648: lddw r2, 0x11bf5c ; rodata b"X\x00\x00\x00\x16\x00\x00\x00V\x00\x00\x00\t\x00\x00\x00J\x00\x00\x00\x05\x00\x00\x00\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00"
022658: call -0x33d8 ; call 0x87a0
022660: lddw r1, 0x11c7c9 ; rodata b'programs/pump-amm/src/instructions/boost.rsboost_vaultprograms/pump-amm/src'
022670: stxdw [r10 - 0x1a0], r1
022678: stb [r10 - 0x158], 0x2
022680: stw [r10 - 0x190], 0x193
022688: stdw [r10 - 0x198], 0x2b
022690: stdw [r10 - 0x1a8], 0x0
022698: stw [r10 - 0x110], 0x17c8
0226a0: mov64 r1, r10
0226a8: add64 r1, -0x700
0226b0: mov64 r2, r10
0226b8: add64 r2, -0x1a8
0226c0: call 0x1c11e ; call 0x102fb8
0226c8: ldxdw r1, [r10 - 0x6f8]
0226d0: ldxdw r2, [r10 - 0x700]
0226d8: ldxdw r6, [r10 - 0x7c0]
0226e0: ja -0x3d5 ; branch 0x20840
0226e8: mov64 r1, r10
0226f0: add64 r1, -0x6d0
0226f8: mov64 r2, r10
022700: add64 r2, -0x348
022708: call 0x1c126 ; call 0x103040
022710: ldxdw r1, [r10 - 0x6c8]
022718: ldxdw r3, [r10 - 0x320]
022720: ldxdw r2, [r10 - 0x6d0]
022728: ldxdw r4, [r10 - 0x328]
022730: ldxdw r5, [r4 + 0x0]
022738: add64 r5, -0x1
022740: stxdw [r4 + 0x0], r5
022748: jne r5, 0x0, +0x3 ; branch 0x22768
022750: ldxdw r5, [r4 + 0x8]
022758: add64 r5, -0x1
022760: stxdw [r4 + 0x8], r5
022768: ldxdw r4, [r3 + 0x0]
022770: add64 r4, -0x1
022778: stxdw [r3 + 0x0], r4
022780: jne r4, 0x0, -0x203 ; branch 0x21770
022788: ldxdw r4, [r3 + 0x8]
022790: add64 r4, -0x1
022798: stxdw [r3 + 0x8], r4
0227a0: ldxdw r6, [r10 - 0x7c0]
0227a8: ja -0x3ee ; branch 0x20840
0227b0: mov64 r1, r10
0227b8: add64 r1, -0x6e0
0227c0: mov64 r2, r10
0227c8: add64 r2, -0x1d8
0227d0: call 0x1c10d ; call 0x103040
0227d8: ldxdw r1, [r10 - 0x6d8]
0227e0: ldxdw r3, [r10 - 0xb0]
0227e8: ldxdw r2, [r10 - 0x6e0]
0227f0: ldxdw r4, [r10 - 0xb8]
0227f8: ldxdw r5, [r4 + 0x0]
022800: add64 r5, -0x1
022808: stxdw [r4 + 0x0], r5
022810: jne r5, 0x0, +0x3 ; branch 0x22830
022818: ldxdw r5, [r4 + 0x8]
022820: add64 r5, -0x1
022828: stxdw [r4 + 0x8], r5
022830: ldxdw r4, [r3 + 0x0]
022838: add64 r4, -0x1
022840: stxdw [r3 + 0x0], r4
022848: jne r4, 0x0, -0x21c ; branch 0x21770
022850: ja -0x1a ; branch 0x22788
022858: ldxdw r2, [r7 + 0x50]
022860: mov64 r8, r10
022868: add64 r8, -0x30
022870: mov64 r1, r8
022878: call -0x28e1 ; call 0xe178
022880: ldxdw r1, [r7 + 0x20]
022888: ldxdw r2, [r1 + 0x58]
022890: mov64 r6, r10
022898: add64 r6, -0xc0
0228a0: mov64 r1, r6
0228a8: call -0x28e7 ; call 0xe178
0228b0: ldxdw r1, [r7 + 0x40]
0228b8: ldxdw r2, [r1 + 0x20]
0228c0: mov64 r9, r10
0228c8: add64 r9, -0x1a8
0228d0: mov64 r1, r9
0228d8: call -0x28ed ; call 0xe178
0228e0: mov64 r1, r10
0228e8: add64 r1, -0x6f0
0228f0: mov64 r2, r8
0228f8: mov64 r3, r6
022900: mov64 r4, r9
022908: call 0xa4a4 ; call 0x74e30
022910: ldxdw r1, [r10 - 0x6e8]
022918: ldxdw r3, [r10 - 0x198]
022920: ldxdw r4, [r10 - 0x1a0]
022928: ldxdw r5, [r4 + 0x0]
022930: add64 r5, -0x1
022938: ldxdw r2, [r10 - 0x6f0]
022940: stxdw [r4 + 0x0], r5
022948: jne r5, 0x0, +0x3 ; branch 0x22968
022950: ldxdw r5, [r4 + 0x8]
022958: add64 r5, -0x1
022960: stxdw [r4 + 0x8], r5
022968: ldxdw r4, [r3 + 0x0]
022970: add64 r4, -0x1
022978: stxdw [r3 + 0x0], r4
022980: jne r4, 0x0, +0x3 ; branch 0x229a0
022988: ldxdw r4, [r3 + 0x8]
022990: add64 r4, -0x1
022998: stxdw [r3 + 0x8], r4
0229a0: ldxdw r3, [r10 - 0xb0]
0229a8: ldxdw r4, [r10 - 0xb8]
0229b0: ldxdw r5, [r4 + 0x0]
0229b8: add64 r5, -0x1
0229c0: stxdw [r4 + 0x0], r5
0229c8: jne r5, 0x0, +0x3 ; branch 0x229e8
0229d0: ldxdw r5, [r4 + 0x8]
0229d8: add64 r5, -0x1
0229e0: stxdw [r4 + 0x8], r5
0229e8: ldxdw r4, [r3 + 0x0]
0229f0: add64 r4, -0x1
0229f8: stxdw [r3 + 0x0], r4
022a00: jne r4, 0x0, +0x3 ; branch 0x22a20
022a08: ldxdw r4, [r3 + 0x8]
022a10: add64 r4, -0x1
022a18: stxdw [r3 + 0x8], r4
022a20: ldxdw r3, [r10 - 0x20]
022a28: ldxdw r4, [r10 - 0x28]
022a30: ldxdw r5, [r4 + 0x0]
022a38: add64 r5, -0x1
022a40: stxdw [r4 + 0x0], r5
022a48: jne r5, 0x0, +0x3 ; branch 0x22a68
022a50: ldxdw r5, [r4 + 0x8]
022a58: add64 r5, -0x1
022a60: stxdw [r4 + 0x8], r5
022a68: ldxdw r4, [r3 + 0x0]
022a70: add64 r4, -0x1
022a78: stxdw [r3 + 0x0], r4
022a80: jne r4, 0x0, +0x3 ; branch 0x22aa0
022a88: ldxdw r4, [r3 + 0x8]
022a90: add64 r4, -0x1
022a98: stxdw [r3 + 0x8], r4
022aa0: jne r2, 0x2, -0x267 ; branch 0x21770
022aa8: ldxdw r2, [r7 + 0x50]
022ab0: mov64 r1, r10
022ab8: add64 r1, -0x190
022ac0: call -0x292a ; call 0xe178
022ac8: ldxdw r1, [r7 + 0x40]
022ad0: ldxdw r2, [r1 + 0x20]
022ad8: mov64 r6, r10
022ae0: add64 r6, -0xc0
022ae8: mov64 r1, r6
022af0: call -0x2930 ; call 0xe178
022af8: ldxdw r2, [r7 + 0x8]
022b00: mov64 r1, r10
022b08: add64 r1, -0x90
022b10: call -0x2934 ; call 0xe178
022b18: ldxdw r2, [r7 + 0x38]
022b20: mov64 r1, r10
022b28: add64 r1, -0x60
022b30: call -0x2938 ; call 0xe178
022b38: mov64 r1, r10
022b40: add64 r1, -0x30
022b48: stxdw [r10 - 0x220], r1
022b50: mov64 r1, r10
022b58: add64 r1, -0x1c0
022b60: stxdw [r10 - 0x10], r1
022b68: mov64 r1, r10
022b70: add64 r1, -0x5e0
022b78: stxdw [r10 - 0x20], r1
022b80: lddw r1, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
022b90: stxdw [r10 - 0x30], r1
022b98: ldxdw r1, [r10 - 0x800]
022ba0: stxb [r10 - 0x1c0], r1
022ba8: stdw [r10 - 0x218], 0x3
022bb0: stdw [r10 - 0x8], 0x1
022bb8: stdw [r10 - 0x18], 0x20
022bc0: stdw [r10 - 0x28], 0xb
022bc8: mov64 r1, r10
022bd0: add64 r1, -0x160
022bd8: mov64 r2, r6
022be0: mov64 r3, 0x90
022be8: call 0x1ed95 ; call 0x119898
022bf0: mov64 r1, r10
022bf8: add64 r1, -0x220
022c00: stxdw [r10 - 0xd0], r1
022c08: stdw [r10 - 0xc8], 0x1
022c10: stdw [r10 - 0x198], 0x0
022c18: stdw [r10 - 0x1a0], 0x8
022c20: stdw [r10 - 0x1a8], 0x0
022c28: mov64 r1, r10
022c30: add64 r1, -0x710
022c38: mov64 r2, r10
022c40: add64 r2, -0x1a8
022c48: call 0x1a6a8 ; call 0xf6190
022c50: ldxdw r1, [r10 - 0x708]
022c58: ldxdw r2, [r10 - 0x710]
022c60: jne r2, 0x2, -0x29f ; branch 0x21770
022c68: mov64 r2, 0x2
022c70: ldxdw r6, [r10 - 0x7c0]
022c78: ja -0x488 ; branch 0x20840
