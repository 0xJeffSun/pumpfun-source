074128: mov64 r7, r2
074130: mov64 r6, r1
074138: ldxdw r1, [r7 + 0x18]
074140: lddw r2, 0x11be90 ; rodata b"\x06\xdd\xf6\xe1\xeeu\x8f\xde\x18B]\xbc\xe4l\xcd\xda\xb6\x1a\xfcM\x83\xb9\r'\xfe\xbd\xf9(\xd8\xa1\x8b\xfc\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction"
074150: mov64 r3, 0x20
074158: call 0x14af0 ; call 0x1198e0
074160: lsh64 r0, 0x20
074168: rsh64 r0, 0x20
074170: jne r0, 0x0, +0x35 ; branch 0x74320
074178: mov64 r1, r10
074180: add64 r1, -0x110
074188: mov64 r2, r7
074190: call 0x129fe ; call 0x109188
074198: ldxdw r7, [r10 - 0x100]
0741a0: ldxdw r1, [r10 - 0x108]
0741a8: ldxdw r2, [r10 - 0x110]
0741b0: lddw r3, -0x7fffffffffffffe6
0741c0: jeq r2, r3, +0x1 ; branch 0x741d0
0741c8: ja +0x2f ; branch 0x74348
0741d0: ldxdw r3, [r1 + 0x8]
0741d8: ldxdw r2, [r1 + 0x0]
0741e0: mov64 r1, r10
0741e8: add64 r1, -0x148
0741f0: call 0xfdfc ; call 0xf31d8
0741f8: ldxdw r8, [r10 - 0x148]
074200: jeq r8, 0x2, +0x1 ; branch 0x74210
074208: ja +0x35 ; branch 0x743b8
074210: mov64 r1, r10
074218: add64 r1, -0x70
074220: lddw r2, 0x11bf78 ; rodata b'\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00'
074230: call 0x238 ; call 0x753f8
074238: stdw [r10 - 0x48], 0x0
074240: stdw [r10 - 0x50], 0x1
074248: stdw [r10 - 0x58], 0x0
074250: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
074260: stxdw [r10 - 0x18], r1
074268: mov64 r1, r10
074270: add64 r1, -0x58
074278: stxdw [r10 - 0x20], r1
074280: stb [r10 - 0x8], 0x3
074288: stdw [r10 - 0x10], 0x20
074290: stdw [r10 - 0x30], 0x0
074298: stdw [r10 - 0x40], 0x0
0742a0: mov64 r2, r10
0742a8: add64 r2, -0x40
0742b0: lddw r1, 0x11bf78 ; rodata b'\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00'
0742c0: call 0xd1b ; call 0x7aba0
0742c8: jeq r0, 0x0, +0x3b ; branch 0x744a8
0742d0: mov64 r3, r10
0742d8: add64 r3, -0x110
0742e0: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0742f0: mov64 r2, 0x37
0742f8: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
074308: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
074318: call 0x13d8f ; call 0x112f98
074320: stdw [r6 + 0x18], 0x0
074328: stdw [r6 + 0x10], 0x0
074330: stdw [r6 + 0x8], 0x0
074338: stdw [r6 + 0x0], 0x0
074340: ja +0x4d ; branch 0x745b0
074348: stxdw [r10 - 0x100], r7
074350: stxdw [r10 - 0x108], r1
074358: stxdw [r10 - 0x110], r2
074360: mov64 r1, r10
074368: add64 r1, -0x158
074370: mov64 r2, r10
074378: add64 r2, -0x110
074380: call 0x11d97 ; call 0x103040
074388: ldxdw r1, [r10 - 0x158]
074390: ldxdw r2, [r10 - 0x150]
074398: stxdw [r6 + 0x10], r2
0743a0: stxdw [r6 + 0x8], r1
0743a8: stdw [r6 + 0x0], 0x2
0743b0: ja +0x3f ; branch 0x745b0
0743b8: ldxdw r1, [r10 - 0x118]
0743c0: stxdw [r10 - 0x180], r1
0743c8: ldxdw r1, [r10 - 0x120]
0743d0: stxdw [r10 - 0x1a0], r1
0743d8: ldxdw r9, [r10 - 0x128]
0743e0: ldxdw r1, [r10 - 0x130]
0743e8: stxdw [r10 - 0x188], r1
0743f0: ldxdw r1, [r10 - 0x138]
0743f8: stxdw [r10 - 0x190], r1
074400: ldxdw r1, [r10 - 0x140]
074408: stxdw [r10 - 0x198], r1
074410: mov64 r1, r10
074418: add64 r1, -0x110
074420: call 0x12542 ; call 0x106e38
074428: ldxdw r1, [r10 - 0x110]
074430: jeq r1, 0x0, +0x30 ; branch 0x745b8
074438: ldxdw r1, [r10 - 0x108]
074440: ldxdw r2, [r10 - 0x100]
074448: ldxdw r3, [r10 - 0xf8]
074450: stxdw [r10 - 0x100], r3
074458: stxdw [r10 - 0x108], r2
074460: stxdw [r10 - 0x110], r1
074468: mov64 r1, r10
074470: add64 r1, -0x168
074478: mov64 r2, r10
074480: add64 r2, -0x110
074488: call 0x11d76 ; call 0x103040
074490: ldxdw r1, [r10 - 0x168]
074498: ldxdw r2, [r10 - 0x160]
0744a0: ja +0x1b ; branch 0x74580
0744a8: ldxdw r1, [r10 - 0x48]
0744b0: stxdw [r10 - 0xc8], r1
0744b8: ldxdw r1, [r10 - 0x50]
0744c0: stxdw [r10 - 0xd0], r1
0744c8: ldxdw r1, [r10 - 0x58]
0744d0: stxdw [r10 - 0xd8], r1
0744d8: ldxdw r1, [r10 - 0x70]
0744e0: stxdw [r10 - 0xf0], r1
0744e8: ldxdw r1, [r10 - 0x68]
0744f0: stxdw [r10 - 0xe8], r1
0744f8: ldxdw r1, [r10 - 0x60]
074500: stxdw [r10 - 0xe0], r1
074508: lddw r1, 0x11d044 ; rodata b'programs/pump-amm/src/utils/transfer_fee.rsFeeBasisPointsExceedsMaximumZero'
074518: stxdw [r10 - 0x108], r1
074520: stw [r10 - 0x78], 0x1777
074528: stb [r10 - 0xc0], 0x2
074530: stw [r10 - 0xf8], 0x20
074538: stdw [r10 - 0x100], 0x2b
074540: stdw [r10 - 0x110], 0x0
074548: mov64 r1, r10
074550: add64 r1, -0x178
074558: mov64 r2, r10
074560: add64 r2, -0x110
074568: call 0x11d49 ; call 0x102fb8
074570: ldxdw r1, [r10 - 0x178]
074578: ldxdw r2, [r10 - 0x170]
074580: stxdw [r6 + 0x10], r2
074588: stxdw [r6 + 0x8], r1
074590: stdw [r6 + 0x0], 0x2
074598: ldxdw r1, [r7 + 0x0]
0745a0: add64 r1, -0x1
0745a8: stxdw [r7 + 0x0], r1
0745b0: exit
0745b8: ldxdw r1, [r10 - 0x180]
0745c0: ldxdw r0, [r10 - 0x1a0]
0745c8: ldxdw r2, [r10 - 0x188]
0745d0: ldxdw r3, [r10 - 0x190]
0745d8: ldxdw r4, [r10 - 0x198]
0745e0: jeq r8, 0x0, +0x7 ; branch 0x74620
0745e8: ldxdw r1, [r10 - 0xf8]
0745f0: jlt r1, r9, +0x1 ; branch 0x74600
0745f8: ldxdw r2, [r10 - 0x180]
074600: jlt r1, r9, +0x1 ; branch 0x74610
074608: mov64 r3, r0
074610: jlt r1, r9, +0x1 ; branch 0x74620
074618: mov64 r4, r9
074620: stxdw [r6 + 0x18], r2
074628: stxdw [r6 + 0x10], r3
074630: stxdw [r6 + 0x8], r4
074638: stxdw [r6 + 0x0], r8
074640: ja -0x16 ; branch 0x74598
