061d68: mov64 r7, r3
061d70: mov64 r8, r2
061d78: mov64 r6, r1
061d80: stdw [r10 - 0x100], 0x0
061d88: stdw [r10 - 0x108], 0x0
061d90: stdw [r10 - 0x110], 0x0
061d98: stdw [r10 - 0x118], 0x0
061da0: mov64 r2, r10
061da8: add64 r2, -0x118
061db0: mov64 r1, r7
061db8: mov64 r3, 0x20
061dc0: call 0x16f63 ; call 0x1198e0
061dc8: lsh64 r0, 0x20
061dd0: rsh64 r0, 0x20
061dd8: jeq r0, 0x0, +0xb9 ; branch 0x623a8
061de0: stdw [r10 - 0x100], 0x0
061de8: stdw [r10 - 0x108], 0x0
061df0: stdw [r10 - 0x110], 0x0
061df8: stdw [r10 - 0x118], 0x0
061e00: mov64 r9, r7
061e08: add64 r9, 0x20
061e10: mov64 r2, r10
061e18: add64 r2, -0x118
061e20: mov64 r1, r9
061e28: mov64 r3, 0x20
061e30: call 0x16f55 ; call 0x1198e0
061e38: lsh64 r0, 0x20
061e40: rsh64 r0, 0x20
061e48: jeq r0, 0x0, +0xab ; branch 0x623a8
061e50: stdw [r10 - 0x100], 0x0
061e58: stdw [r10 - 0x108], 0x0
061e60: stdw [r10 - 0x110], 0x0
061e68: stdw [r10 - 0x118], 0x0
061e70: mov64 r1, r7
061e78: add64 r1, 0x40
061e80: mov64 r2, r10
061e88: add64 r2, -0x118
061e90: mov64 r3, 0x20
061e98: call 0x16f48 ; call 0x1198e0
061ea0: lsh64 r0, 0x20
061ea8: rsh64 r0, 0x20
061eb0: jeq r0, 0x0, +0x9e ; branch 0x623a8
061eb8: stdw [r10 - 0x100], 0x0
061ec0: stdw [r10 - 0x108], 0x0
061ec8: stdw [r10 - 0x110], 0x0
061ed0: stdw [r10 - 0x118], 0x0
061ed8: mov64 r1, r7
061ee0: add64 r1, 0x60
061ee8: mov64 r2, r10
061ef0: add64 r2, -0x118
061ef8: mov64 r3, 0x20
061f00: call 0x16f3b ; call 0x1198e0
061f08: lsh64 r0, 0x20
061f10: rsh64 r0, 0x20
061f18: jeq r0, 0x0, +0x91 ; branch 0x623a8
061f20: stdw [r10 - 0x100], 0x0
061f28: stdw [r10 - 0x108], 0x0
061f30: stdw [r10 - 0x110], 0x0
061f38: stdw [r10 - 0x118], 0x0
061f40: mov64 r1, r7
061f48: add64 r1, 0x80
061f50: mov64 r2, r10
061f58: add64 r2, -0x118
061f60: mov64 r3, 0x20
061f68: call 0x16f2e ; call 0x1198e0
061f70: lsh64 r0, 0x20
061f78: rsh64 r0, 0x20
061f80: jeq r0, 0x0, +0x84 ; branch 0x623a8
061f88: stdw [r10 - 0x100], 0x0
061f90: stdw [r10 - 0x108], 0x0
061f98: stdw [r10 - 0x110], 0x0
061fa0: stdw [r10 - 0x118], 0x0
061fa8: mov64 r1, r7
061fb0: add64 r1, 0xa0
061fb8: mov64 r2, r10
061fc0: add64 r2, -0x118
061fc8: mov64 r3, 0x20
061fd0: call 0x16f21 ; call 0x1198e0
061fd8: lsh64 r0, 0x20
061fe0: rsh64 r0, 0x20
061fe8: jeq r0, 0x0, +0x77 ; branch 0x623a8
061ff0: stdw [r10 - 0x100], 0x0
061ff8: stdw [r10 - 0x108], 0x0
062000: stdw [r10 - 0x110], 0x0
062008: stdw [r10 - 0x118], 0x0
062010: mov64 r1, r7
062018: add64 r1, 0xc0
062020: mov64 r2, r10
062028: add64 r2, -0x118
062030: mov64 r3, 0x20
062038: call 0x16f14 ; call 0x1198e0
062040: lsh64 r0, 0x20
062048: rsh64 r0, 0x20
062050: jeq r0, 0x0, +0x6a ; branch 0x623a8
062058: stdw [r10 - 0x100], 0x0
062060: stdw [r10 - 0x108], 0x0
062068: stdw [r10 - 0x110], 0x0
062070: stdw [r10 - 0x118], 0x0
062078: mov64 r1, r7
062080: add64 r1, 0xe0
062088: mov64 r2, r10
062090: add64 r2, -0x118
062098: mov64 r3, 0x20
0620a0: call 0x16f07 ; call 0x1198e0
0620a8: lsh64 r0, 0x20
0620b0: rsh64 r0, 0x20
0620b8: jeq r0, 0x0, +0x5d ; branch 0x623a8
0620c0: mov64 r1, r7
0620c8: mov64 r2, r9
0620d0: mov64 r3, 0x20
0620d8: call 0x16f00 ; call 0x1198e0
0620e0: lsh64 r0, 0x20
0620e8: arsh64 r0, 0x20
0620f0: jslt r0, 0x0, +0x1 ; branch 0x62100
0620f8: ja +0x3c ; branch 0x622e0
062100: mov64 r2, r7
062108: add64 r2, 0x40
062110: mov64 r1, r9
062118: stxdw [r10 - 0x140], r2
062120: mov64 r3, 0x20
062128: call 0x16ef6 ; call 0x1198e0
062130: lsh64 r0, 0x20
062138: arsh64 r0, 0x20
062140: jsgt r0, -0x1, +0x33 ; branch 0x622e0
062148: mov64 r9, r7
062150: add64 r9, 0x60
062158: ldxdw r1, [r10 - 0x140]
062160: mov64 r2, r9
062168: mov64 r3, 0x20
062170: call 0x16eed ; call 0x1198e0
062178: lsh64 r0, 0x20
062180: arsh64 r0, 0x20
062188: jsgt r0, -0x1, +0x2a ; branch 0x622e0
062190: mov64 r2, r7
062198: add64 r2, 0x80
0621a0: mov64 r1, r9
0621a8: stxdw [r10 - 0x140], r2
0621b0: mov64 r3, 0x20
0621b8: call 0x16ee4 ; call 0x1198e0
0621c0: lsh64 r0, 0x20
0621c8: arsh64 r0, 0x20
0621d0: jsgt r0, -0x1, +0x21 ; branch 0x622e0
0621d8: mov64 r9, r7
0621e0: add64 r9, 0xa0
0621e8: ldxdw r1, [r10 - 0x140]
0621f0: mov64 r2, r9
0621f8: mov64 r3, 0x20
062200: call 0x16edb ; call 0x1198e0
062208: lsh64 r0, 0x20
062210: arsh64 r0, 0x20
062218: jsgt r0, -0x1, +0x18 ; branch 0x622e0
062220: mov64 r2, r7
062228: add64 r2, 0xc0
062230: mov64 r1, r9
062238: mov64 r9, r2
062240: mov64 r3, 0x20
062248: call 0x16ed2 ; call 0x1198e0
062250: lsh64 r0, 0x20
062258: arsh64 r0, 0x20
062260: jsgt r0, -0x1, +0xf ; branch 0x622e0
062268: mov64 r2, r7
062270: add64 r2, 0xe0
062278: mov64 r1, r9
062280: mov64 r3, 0x20
062288: call 0x16eca ; call 0x1198e0
062290: lsh64 r0, 0x20
062298: arsh64 r0, 0x20
0622a0: jslt r0, 0x0, +0x1 ; branch 0x622b0
0622a8: ja +0x6 ; branch 0x622e0
0622b0: mov64 r1, r8
0622b8: mov64 r2, r7
0622c0: mov64 r3, 0x100
0622c8: call 0x16eb9 ; call 0x119898
0622d0: mov64 r2, 0x2
0622d8: ja +0x56 ; branch 0x62590
0622e0: mov64 r1, r10
0622e8: add64 r1, -0x78
0622f0: lddw r2, 0x11bfa0 ; rodata b'\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00'
062300: call 0x261e ; call 0x753f8
062308: stdw [r10 - 0x50], 0x0
062310: stdw [r10 - 0x58], 0x1
062318: stdw [r10 - 0x60], 0x0
062320: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
062330: stxdw [r10 - 0x20], r1
062338: mov64 r1, r10
062340: add64 r1, -0x60
062348: stxdw [r10 - 0x28], r1
062350: stb [r10 - 0x10], 0x3
062358: stdw [r10 - 0x18], 0x20
062360: stdw [r10 - 0x38], 0x0
062368: stdw [r10 - 0x48], 0x0
062370: mov64 r2, r10
062378: add64 r2, -0x48
062380: lddw r1, 0x11bfa0 ; rodata b'\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00'
062390: call 0x3101 ; call 0x7aba0
062398: jeq r0, 0x0, +0x41 ; branch 0x625a8
0623a0: ja +0x18 ; branch 0x62468
0623a8: mov64 r1, r10
0623b0: add64 r1, -0x78
0623b8: lddw r2, 0x11c084 ; rodata b'\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00'
0623c8: call 0x2605 ; call 0x753f8
0623d0: stdw [r10 - 0x50], 0x0
0623d8: stdw [r10 - 0x58], 0x1
0623e0: stdw [r10 - 0x60], 0x0
0623e8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0623f8: stxdw [r10 - 0x20], r1
062400: mov64 r1, r10
062408: add64 r1, -0x60
062410: stxdw [r10 - 0x28], r1
062418: stb [r10 - 0x10], 0x3
062420: stdw [r10 - 0x18], 0x20
062428: stdw [r10 - 0x38], 0x0
062430: stdw [r10 - 0x48], 0x0
062438: mov64 r2, r10
062440: add64 r2, -0x48
062448: lddw r1, 0x11c084 ; rodata b'\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00'
062458: call 0x30e8 ; call 0x7aba0
062460: jeq r0, 0x0, +0xa ; branch 0x624b8
062468: mov64 r3, r10
062470: add64 r3, -0x1
062478: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
062488: mov64 r2, 0x37
062490: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
0624a0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
0624b0: call 0x1615c ; call 0x112f98
0624b8: ldxdw r1, [r10 - 0x50]
0624c0: stxdw [r10 - 0xd0], r1
0624c8: ldxdw r1, [r10 - 0x58]
0624d0: stxdw [r10 - 0xd8], r1
0624d8: ldxdw r1, [r10 - 0x60]
0624e0: stxdw [r10 - 0xe0], r1
0624e8: ldxdw r1, [r10 - 0x78]
0624f0: stxdw [r10 - 0xf8], r1
0624f8: ldxdw r1, [r10 - 0x70]
062500: stxdw [r10 - 0xf0], r1
062508: ldxdw r1, [r10 - 0x68]
062510: stxdw [r10 - 0xe8], r1
062518: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
062528: stxdw [r10 - 0x110], r1
062530: stw [r10 - 0x80], 0x177b
062538: stb [r10 - 0xc8], 0x2
062540: stw [r10 - 0x100], 0x100
062548: stdw [r10 - 0x108], 0x2c
062550: stdw [r10 - 0x118], 0x0
062558: mov64 r1, r10
062560: add64 r1, -0x138
062568: mov64 r2, r10
062570: add64 r2, -0x118
062578: call 0x14147 ; call 0x102fb8
062580: ldxdw r1, [r10 - 0x130]
062588: ldxdw r2, [r10 - 0x138]
062590: stxdw [r6 + 0x8], r1
062598: stxdw [r6 + 0x0], r2
0625a0: exit
0625a8: ldxdw r1, [r10 - 0x50]
0625b0: stxdw [r10 - 0xd0], r1
0625b8: ldxdw r1, [r10 - 0x58]
0625c0: stxdw [r10 - 0xd8], r1
0625c8: ldxdw r1, [r10 - 0x60]
0625d0: stxdw [r10 - 0xe0], r1
0625d8: ldxdw r1, [r10 - 0x78]
0625e0: stxdw [r10 - 0xf8], r1
0625e8: ldxdw r1, [r10 - 0x70]
0625f0: stxdw [r10 - 0xf0], r1
0625f8: ldxdw r1, [r10 - 0x68]
062600: stxdw [r10 - 0xe8], r1
062608: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
062618: stxdw [r10 - 0x110], r1
062620: stw [r10 - 0x80], 0x177c
062628: stb [r10 - 0xc8], 0x2
062630: stw [r10 - 0x100], 0x107
062638: stdw [r10 - 0x108], 0x2c
062640: stdw [r10 - 0x118], 0x0
062648: mov64 r1, r10
062650: add64 r1, -0x128
062658: mov64 r2, r10
062660: add64 r2, -0x118
062668: call 0x14129 ; call 0x102fb8
062670: ldxdw r1, [r10 - 0x120]
062678: ldxdw r2, [r10 - 0x128]
062680: ja -0x1f ; branch 0x62590
