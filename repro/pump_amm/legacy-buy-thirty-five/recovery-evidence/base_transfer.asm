072128: stxdw [r10 - 0xc0], r4
072130: stxdw [r10 - 0xc8], r3
072138: ldxdw r6, [r5 - 0xff0]
072140: ldxdw r9, [r6 + 0x0]
072148: ldxdw r7, [r9 + 0x8]
072150: ldxdw r4, [r7 + 0x0]
072158: add64 r4, 0x1
072160: mov64 r3, 0x1
072168: jeq r4, 0x0, +0x1 ; branch 0x72178
072170: mov64 r3, 0x0
072178: ldxdw r0, [r9 + 0x0]
072180: stxdw [r10 - 0xd0], r0
072188: stxdw [r7 + 0x0], r4
072190: jne r3, 0x1, +0x1 ; branch 0x721a0
072198: call -0x1
0721a0: ldxdw r8, [r9 + 0x10]
0721a8: ldxdw r0, [r8 + 0x0]
0721b0: add64 r0, 0x1
0721b8: mov64 r4, 0x1
0721c0: jeq r0, 0x0, +0x1 ; branch 0x721d0
0721c8: mov64 r4, 0x0
0721d0: stxdw [r10 - 0xe0], r2
0721d8: stxdw [r10 - 0xd8], r1
0721e0: ldxdw r3, [r5 - 0xff8]
0721e8: ldxdw r1, [r5 - 0x1000]
0721f0: stxdw [r10 - 0xe8], r1
0721f8: stxdw [r8 + 0x0], r0
072200: jne r4, 0x1, +0x1 ; branch 0x72210
072208: ja -0xf ; branch 0x72198
072210: ldxdw r4, [r9 + 0x18]
072218: ldxdw r0, [r9 + 0x20]
072220: ldxb r5, [r9 + 0x28]
072228: ldxb r2, [r9 + 0x29]
072230: ldxb r9, [r9 + 0x2a]
072238: stxb [r10 - 0x7e], r9
072240: stxb [r10 - 0x7f], r2
072248: stxb [r10 - 0x80], r5
072250: stxdw [r10 - 0x88], r0
072258: stxdw [r10 - 0x90], r4
072260: stxdw [r10 - 0x98], r8
072268: ldxdw r1, [r10 - 0xd0]
072270: stxdw [r10 - 0xa8], r1
072278: stxdw [r10 - 0xa0], r7
072280: ldxh r2, [r6 + 0x118]
072288: stxh [r10 - 0x4], r2
072290: mov64 r2, r10
072298: add64 r2, -0x1
0722a0: ldxb r4, [r6 + 0x11a]
0722a8: stxdw [r10 - 0x18], r2
0722b0: mov64 r2, r6
0722b8: add64 r2, 0x48
0722c0: stxdw [r10 - 0x28], r2
0722c8: mov64 r2, r6
0722d0: add64 r2, 0x28
0722d8: stxdw [r10 - 0x38], r2
0722e0: add64 r6, 0x8
0722e8: stxdw [r10 - 0x48], r6
0722f0: mov64 r1, r10
0722f8: add64 r1, -0x4
072300: stxdw [r10 - 0x58], r1
072308: lddw r1, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
072318: stxdw [r10 - 0x68], r1
072320: stxb [r10 - 0x1], r4
072328: mov64 r1, r10
072330: add64 r1, -0x68
072338: stxdw [r10 - 0x78], r1
072340: stdw [r10 - 0x10], 0x1
072348: stdw [r10 - 0x20], 0x20
072350: stdw [r10 - 0x30], 0x20
072358: stdw [r10 - 0x40], 0x20
072360: stdw [r10 - 0x50], 0x2
072368: stdw [r10 - 0x60], 0x4
072370: stdw [r10 - 0x70], 0x6
072378: mov64 r1, r10
072380: add64 r1, -0x78
072388: stxdw [r10 - 0xfe8], r1
072390: stxdw [r10 - 0xff0], r3
072398: mov64 r1, r10
0723a0: add64 r1, -0xa8
0723a8: stxdw [r10 - 0xff8], r1
0723b0: ldxdw r1, [r10 - 0xe8]
0723b8: stxdw [r10 - 0x1000], r1
0723c0: stdw [r10 - 0xfe0], 0x1
0723c8: mov64 r1, r10
0723d0: add64 r1, -0xb8
0723d8: mov64 r5, r10
0723e0: ldxdw r2, [r10 - 0xe0]
0723e8: ldxdw r3, [r10 - 0xc8]
0723f0: ldxdw r4, [r10 - 0xc0]
0723f8: call 0x77 ; call 0x727b8
072400: ldxdw r2, [r10 - 0xb0]
072408: ldxdw r1, [r10 - 0xb8]
072410: ldxdw r3, [r7 + 0x0]
072418: add64 r3, -0x1
072420: stxdw [r7 + 0x0], r3
072428: jne r3, 0x0, +0x3 ; branch 0x72448
072430: ldxdw r3, [r7 + 0x8]
072438: add64 r3, -0x1
072440: stxdw [r7 + 0x8], r3
072448: ldxdw r3, [r8 + 0x0]
072450: add64 r3, -0x1
072458: stxdw [r8 + 0x0], r3
072460: jne r3, 0x0, +0x3 ; branch 0x72480
072468: ldxdw r3, [r8 + 0x8]
072470: add64 r3, -0x1
072478: stxdw [r8 + 0x8], r3
072480: ldxdw r3, [r10 - 0xd8]
072488: stxdw [r3 + 0x8], r2
072490: stxdw [r3 + 0x0], r1
072498: exit
