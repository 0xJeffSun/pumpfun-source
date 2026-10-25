049b50: mov64 r6, r1
049b58: ldxdw r7, [r2 + 0x8]
049b60: ldxdw r1, [r7 + 0x130]
049b68: ldxb r1, [r1 + 0x3b0]
049b70: and64 r1, 0x10
049b78: jne r1, 0x0, +0x6d ; branch 0x49ee8
049b80: mov64 r8, r3
049b88: stxdw [r10 - 0x528], r4
049b90: stxdw [r10 - 0x530], r2
049b98: ldxdw r1, [r7 + 0x120]
049ba0: ldxdw r2, [r1 + 0x0]
049ba8: ldxdw r4, [r7 + 0x128]
049bb0: ldxdw r3, [r7 + 0x180]
049bb8: mov64 r1, r10
049bc0: add64 r1, -0x3c0
049bc8: call 0x1c8b ; call 0x58028
049bd0: ldxdw r9, [r10 - 0x3c0]
049bd8: jeq r9, 0x2, +0x1 ; branch 0x49be8
049be0: ja +0x43 ; branch 0x49e00
049be8: ldxdw r3, [r7 + 0x90]
049bf0: ldxdw r2, [r7 + 0x130]
049bf8: ldxdw r1, [r7 + 0x120]
049c00: ldxb r4, [r1 + 0x11b]
049c08: mov64 r1, r10
049c10: add64 r1, -0x3d0
049c18: call 0x1e3d ; call 0x58e08
049c20: ldxdw r9, [r10 - 0x3d0]
049c28: jeq r9, 0x2, +0x1 ; branch 0x49c38
049c30: ja +0x3b ; branch 0x49e10
049c38: mov64 r1, r8
049c40: jeq r1, 0x0, +0x3b ; branch 0x49e20
049c48: stxdw [r10 - 0x538], r6
049c50: ldxdw r1, [r7 + 0x158]
049c58: ldxdw r6, [r1 + 0x68]
049c60: ldxdw r1, [r7 + 0x150]
049c68: ldxdw r1, [r1 + 0x68]
049c70: stxdw [r10 - 0x548], r1
049c78: ldxdw r1, [r7 + 0x148]
049c80: ldxdw r1, [r1 + 0x68]
049c88: stxdw [r10 - 0x550], r1
049c90: ldxdw r1, [r7 + 0x160]
049c98: ldxdw r3, [r1 + 0x68]
049ca0: ldxdw r2, [r7 + 0x120]
049ca8: add64 r2, 0x8
049cb0: mov64 r1, r10
049cb8: add64 r1, -0x380
049cc0: stxdw [r10 - 0x540], r3
049cc8: call 0x44cb ; call 0x6c328
049cd0: ldxdw r9, [r10 - 0x380]
049cd8: jeq r9, 0x2, +0x1 ; branch 0x49ce8
049ce0: ja +0x18d ; branch 0x4a950
049ce8: mov64 r2, r8
049cf0: ldxdw r8, [r10 - 0x378]
049cf8: mov64 r1, r10
049d00: add64 r1, -0x380
049d08: stxdw [r10 - 0x558], r2
049d10: mov64 r3, r6
049d18: mov64 r4, r8
049d20: call -0x6fd7 ; call 0x11e70
049d28: ldxdw r9, [r10 - 0x380]
049d30: jeq r9, 0x2, +0x1 ; branch 0x49d40
049d38: ja +0x182 ; branch 0x4a950
049d40: ldxdw r5, [r10 - 0x378]
049d48: ldxdw r3, [r7 + 0x130]
049d50: ldxdw r2, [r7 + 0x120]
049d58: ldxdw r1, [r7 + 0x190]
049d60: ldxdw r4, [r7 + 0x138]
049d68: stxdw [r10 - 0xfe0], r8
049d70: mov64 r8, r5
049d78: stxdw [r10 - 0xfe8], r6
049d80: stxdw [r10 - 0xff0], r4
049d88: stxdw [r10 - 0xff8], r1
049d90: mov64 r1, r7
049d98: add64 r1, 0x1a0
049da0: stxdw [r10 - 0x1000], r1
049da8: stxdw [r10 - 0xfd8], r8
049db0: mov64 r1, r10
049db8: add64 r1, -0x380
049dc0: mov64 r5, r10
049dc8: mov64 r4, r7
049dd0: call -0x6d30 ; call 0x13458
049dd8: ldxdw r9, [r10 - 0x378]
049de0: ldxdw r1, [r10 - 0x380]
049de8: jeq r1, 0x0, +0x80 ; branch 0x4a1f0
049df0: ldxdw r8, [r10 - 0x370]
049df8: ja +0x16b ; branch 0x4a958
049e00: ldxdw r8, [r10 - 0x3b8]
049e08: ja +0x58 ; branch 0x4a0d0
049e10: ldxdw r8, [r10 - 0x3c8]
049e18: ja +0x56 ; branch 0x4a0d0
049e20: mov64 r1, r10
049e28: add64 r1, -0x20
049e30: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
049e40: call 0x56b6 ; call 0x753f8
049e48: stdw [r10 - 0x40], 0x0
049e50: stdw [r10 - 0x48], 0x1
049e58: stdw [r10 - 0x50], 0x0
049e60: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
049e70: stxdw [r10 - 0x90], r1
049e78: mov64 r1, r10
049e80: add64 r1, -0x50
049e88: stxdw [r10 - 0x98], r1
049e90: stb [r10 - 0x80], 0x3
049e98: stdw [r10 - 0x88], 0x20
049ea0: stdw [r10 - 0xa8], 0x0
049ea8: stdw [r10 - 0xb8], 0x0
049eb0: mov64 r2, r10
049eb8: add64 r2, -0xb8
049ec0: lddw r1, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
049ed0: call 0x6199 ; call 0x7aba0
049ed8: jeq r0, 0x0, +0x41 ; branch 0x4a0e8
049ee0: ja +0x18 ; branch 0x49fa8
049ee8: mov64 r1, r10
049ef0: add64 r1, -0x20
049ef8: lddw r2, 0x11c0b8 ; rodata b'\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display'
049f08: call 0x569d ; call 0x753f8
049f10: stdw [r10 - 0x40], 0x0
049f18: stdw [r10 - 0x48], 0x1
049f20: stdw [r10 - 0x50], 0x0
049f28: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
049f38: stxdw [r10 - 0x90], r1
049f40: mov64 r1, r10
049f48: add64 r1, -0x50
049f50: stxdw [r10 - 0x98], r1
049f58: stb [r10 - 0x80], 0x3
049f60: stdw [r10 - 0x88], 0x20
049f68: stdw [r10 - 0xa8], 0x0
049f70: stdw [r10 - 0xb8], 0x0
049f78: mov64 r2, r10
049f80: add64 r2, -0xb8
049f88: lddw r1, 0x11c0b8 ; rodata b'\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffer()a Display'
049f98: call 0x6180 ; call 0x7aba0
049fa0: jeq r0, 0x0, +0xa ; branch 0x49ff8
049fa8: mov64 r3, r10
049fb0: add64 r3, -0x160
049fb8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
049fc8: mov64 r2, 0x37
049fd0: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
049fe0: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
049ff0: call 0x191f4 ; call 0x112f98
049ff8: ldxdw r1, [r10 - 0x40]
04a000: stxdw [r10 - 0x338], r1
04a008: ldxdw r1, [r10 - 0x48]
04a010: stxdw [r10 - 0x340], r1
04a018: ldxdw r1, [r10 - 0x50]
04a020: stxdw [r10 - 0x348], r1
04a028: ldxdw r1, [r10 - 0x20]
04a030: stxdw [r10 - 0x360], r1
04a038: ldxdw r1, [r10 - 0x18]
04a040: stxdw [r10 - 0x358], r1
04a048: ldxdw r1, [r10 - 0x10]
04a050: stxdw [r10 - 0x350], r1
04a058: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04a068: stxdw [r10 - 0x378], r1
04a070: stw [r10 - 0x2e8], 0x1785
04a078: stb [r10 - 0x330], 0x2
04a080: stw [r10 - 0x368], 0x65
04a088: stdw [r10 - 0x370], 0x2f
04a090: stdw [r10 - 0x380], 0x0
04a098: mov64 r1, r10
04a0a0: add64 r1, -0x3b0
04a0a8: mov64 r2, r10
04a0b0: add64 r2, -0x380
04a0b8: call 0x171df ; call 0x102fb8
04a0c0: ldxdw r8, [r10 - 0x3a8]
04a0c8: ldxdw r9, [r10 - 0x3b0]
04a0d0: stxdw [r6 + 0x8], r8
04a0d8: stxdw [r6 + 0x0], r9
04a0e0: exit
04a0e8: ldxdw r1, [r10 - 0x40]
04a0f0: stxdw [r10 - 0x338], r1
04a0f8: ldxdw r1, [r10 - 0x48]
04a100: stxdw [r10 - 0x340], r1
04a108: ldxdw r1, [r10 - 0x50]
04a110: stxdw [r10 - 0x348], r1
04a118: ldxdw r1, [r10 - 0x20]
04a120: stxdw [r10 - 0x360], r1
04a128: ldxdw r1, [r10 - 0x18]
04a130: stxdw [r10 - 0x358], r1
04a138: ldxdw r1, [r10 - 0x10]
04a140: stxdw [r10 - 0x350], r1
04a148: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04a158: stxdw [r10 - 0x378], r1
04a160: stw [r10 - 0x2e8], 0x1771
04a168: stb [r10 - 0x330], 0x2
04a170: stw [r10 - 0x368], 0x6e
04a178: stdw [r10 - 0x370], 0x2f
04a180: stdw [r10 - 0x380], 0x0
04a188: mov64 r1, r10
04a190: add64 r1, -0x510
04a198: mov64 r2, r10
04a1a0: add64 r2, -0x380
04a1a8: call 0x171c1 ; call 0x102fb8
04a1b0: ldxdw r3, [r10 - 0x508]
04a1b8: ldxdw r2, [r10 - 0x510]
04a1c0: mov64 r1, r10
04a1c8: add64 r1, -0x520
04a1d0: call -0x93d3 ; call 0x340
04a1d8: ldxdw r8, [r10 - 0x518]
04a1e0: ldxdw r9, [r10 - 0x520]
04a1e8: ja -0x24 ; branch 0x4a0d0
04a1f0: stxdw [r10 - 0x560], r8
04a1f8: stxdw [r10 - 0x588], r6
04a200: ldxdw r1, [r10 - 0x360]
04a208: stxdw [r10 - 0x568], r1
04a210: ldxdw r1, [r10 - 0x370]
04a218: stxdw [r10 - 0x570], r1
04a220: ldxdw r1, [r10 - 0x368]
04a228: stxdw [r10 - 0x578], r1
04a230: ldxdw r1, [r10 - 0x358]
04a238: stxdw [r10 - 0x580], r1
04a240: ldxdw r8, [r10 - 0x350]
04a248: ldxdw r1, [r7 + 0x130]
04a250: ldxdw r2, [r7 + 0x128]
04a258: ldxdw r2, [r2 + 0x0]
04a260: ldxdw r3, [r2 + 0x18]
04a268: stxdw [r10 - 0x368], r3
04a270: ldxdw r3, [r2 + 0x10]
04a278: stxdw [r10 - 0x370], r3
04a280: ldxdw r3, [r2 + 0x8]
04a288: stxdw [r10 - 0x378], r3
04a290: ldxdw r2, [r2 + 0x0]
04a298: stxdw [r10 - 0x380], r2
04a2a0: add64 r1, 0x248
04a2a8: mov64 r2, r10
04a2b0: add64 r2, -0x380
04a2b8: mov64 r3, 0x20
04a2c0: call 0x19ec3 ; call 0x1198e0
04a2c8: lsh64 r0, 0x20
04a2d0: rsh64 r0, 0x20
04a2d8: mov64 r2, 0x0
04a2e0: mov64 r5, 0x0
04a2e8: ldxdw r6, [r10 - 0x538]
04a2f0: jeq r0, 0x0, +0x1 ; branch 0x4a300
04a2f8: mov64 r5, r8
04a300: mov64 r8, 0x0
04a308: ldxdw r1, [r10 - 0x560]
04a310: jeq r0, 0x0, +0x1 ; branch 0x4a320
04a318: ldxdw r8, [r10 - 0x580]
04a320: mov64 r3, 0x0
04a328: jeq r0, 0x0, +0x1 ; branch 0x4a338
04a330: ldxdw r3, [r10 - 0x578]
04a338: stxdw [r10 - 0x578], r3
04a340: mov64 r3, 0x0
04a348: jeq r0, 0x0, +0x1 ; branch 0x4a358
04a350: ldxdw r3, [r10 - 0x570]
04a358: mov64 r4, 0x0
04a360: jeq r0, 0x0, +0x1 ; branch 0x4a370
04a368: mov64 r4, r9
04a370: jeq r0, 0x0, +0x1 ; branch 0x4a380
04a378: ldxdw r2, [r10 - 0x568]
04a380: jlt r1, r2, +0x1 ; branch 0x4a390
04a388: ja +0x6 ; branch 0x4a3c0
04a390: mov64 r1, r10
04a398: add64 r1, -0x500
04a3a0: call 0x371 ; call 0x4bf30
04a3a8: ldxdw r8, [r10 - 0x4f8]
04a3b0: ldxdw r9, [r10 - 0x500]
04a3b8: ja -0x5e ; branch 0x4a0d0
04a3c0: stxdw [r10 - 0x570], r5
04a3c8: stxdw [r10 - 0x590], r4
04a3d0: stxdw [r10 - 0x580], r3
04a3d8: stxdw [r10 - 0x568], r2
04a3e0: ldxdw r2, [r7 + 0x120]
04a3e8: add64 r2, 0x8
04a3f0: mov64 r1, r10
04a3f8: add64 r1, -0x380
04a400: ldxdw r3, [r10 - 0x540]
04a408: call 0x4318 ; call 0x6bcd0
04a410: ldxdw r9, [r10 - 0x380]
04a418: jne r9, 0x2, +0x35 ; branch 0x4a5c8
04a420: stxdw [r10 - 0x598], r8
04a428: ldxdw r8, [r10 - 0x560]
04a430: ldxdw r1, [r10 - 0x568]
04a438: sub64 r8, r1
04a440: ldxdw r1, [r10 - 0x378]
04a448: jlt r1, r8, +0x1 ; branch 0x4a458
04a450: ja +0x30 ; branch 0x4a5d8
04a458: mov64 r1, r10
04a460: add64 r1, -0x360
04a468: lddw r2, 0x11bfec ; rodata b'?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00'
04a478: call 0x55ef ; call 0x753f8
04a480: mov64 r1, r10
04a488: add64 r1, -0x348
04a490: lddw r2, 0x11bfec ; rodata b'?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00'
04a4a0: call -0x83a1 ; call 0x87a0
04a4a8: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04a4b8: stxdw [r10 - 0x378], r1
04a4c0: stb [r10 - 0x330], 0x2
04a4c8: stw [r10 - 0x368], 0xab
04a4d0: stdw [r10 - 0x370], 0x2f
04a4d8: stdw [r10 - 0x380], 0x0
04a4e0: stw [r10 - 0x2e8], 0x17af
04a4e8: mov64 r1, r10
04a4f0: add64 r1, -0x4e0
04a4f8: mov64 r2, r10
04a500: add64 r2, -0x380
04a508: call 0x17155 ; call 0x102fb8
04a510: ldxdw r1, [r10 - 0x4d8]
04a518: stxdw [r10 - 0x528], r1
04a520: ldxdw r1, [r10 - 0x4e0]
04a528: stxdw [r10 - 0x530], r1
04a530: ldxdw r2, [r7 + 0x120]
04a538: add64 r2, 0x8
04a540: mov64 r1, r10
04a548: add64 r1, -0x380
04a550: ldxdw r3, [r10 - 0x540]
04a558: call 0x42ee ; call 0x6bcd0
04a560: ldxdw r9, [r10 - 0x380]
04a568: jeq r9, 0x2, +0x1 ; branch 0x4a578
04a570: ja +0x15 ; branch 0x4a620
04a578: ldxdw r4, [r10 - 0x378]
04a580: mov64 r1, r10
04a588: add64 r1, -0x4f0
04a590: ldxdw r2, [r10 - 0x530]
04a598: ldxdw r3, [r10 - 0x528]
04a5a0: mov64 r5, r8
04a5a8: call -0x91ae ; call 0x1840
04a5b0: ldxdw r8, [r10 - 0x4e8]
04a5b8: ldxdw r9, [r10 - 0x4f0]
04a5c0: ja -0x9f ; branch 0x4a0d0
04a5c8: ldxdw r8, [r10 - 0x378]
04a5d0: ja -0xa1 ; branch 0x4a0d0
04a5d8: ldxdw r1, [r10 - 0x570]
04a5e0: jlt r8, r1, +0x1 ; branch 0x4a5f0
04a5e8: ja +0xb ; branch 0x4a648
04a5f0: mov64 r1, r10
04a5f8: add64 r1, -0x4d0
04a600: call 0x366 ; call 0x4c138
04a608: ldxdw r8, [r10 - 0x4c8]
04a610: ldxdw r9, [r10 - 0x4d0]
04a618: ja -0xaa ; branch 0x4a0d0
04a620: ldxdw r8, [r10 - 0x378]
04a628: ldxdw r1, [r10 - 0x530]
04a630: ldxdw r2, [r10 - 0x528]
04a638: call -0x8154 ; call 0x9ba0
04a640: ja -0xaf ; branch 0x4a0d0
04a648: mov64 r2, r8
04a650: sub64 r2, r1
04a658: ldxdw r1, [r10 - 0x598]
04a660: jge r2, r1, +0x6 ; branch 0x4a698
04a668: mov64 r1, r10
04a670: add64 r1, -0x4c0
04a678: call 0x398 ; call 0x4c340
04a680: ldxdw r8, [r10 - 0x4b8]
04a688: ldxdw r9, [r10 - 0x4c0]
04a690: ja -0xb9 ; branch 0x4a0d0
04a698: stxdw [r10 - 0x5a0], r2
04a6a0: stxdw [r10 - 0x5a8], r8
04a6a8: ldxdw r1, [r7 + 0x140]
04a6b0: ldxdw r2, [r1 + 0x58]
04a6b8: mov64 r6, r10
04a6c0: add64 r6, -0x380
04a6c8: mov64 r1, r6
04a6d0: call -0x78ac ; call 0xe178
04a6d8: mov64 r1, r10
04a6e0: add64 r1, -0xb8
04a6e8: mov64 r2, r6
04a6f0: call 0x5346 ; call 0x74128
04a6f8: ldxdw r8, [r10 - 0xa8]
04a700: ldxdw r9, [r10 - 0xb0]
04a708: ldxdw r1, [r10 - 0xb8]
04a710: jeq r1, 0x2, +0x4a ; branch 0x4a968
04a718: ldxdw r2, [r10 - 0xa0]
04a720: stxdw [r10 - 0x388], r2
04a728: stxdw [r10 - 0x390], r8
04a730: stxdw [r10 - 0x398], r9
04a738: stxdw [r10 - 0x3a0], r1
04a740: ldxdw r1, [r10 - 0x370]
04a748: ldxdw r2, [r10 - 0x378]
04a750: ldxdw r3, [r2 + 0x0]
04a758: add64 r3, -0x1
04a760: stxdw [r2 + 0x0], r3
04a768: jne r3, 0x0, +0x3 ; branch 0x4a788
04a770: ldxdw r3, [r2 + 0x8]
04a778: add64 r3, -0x1
04a780: stxdw [r2 + 0x8], r3
04a788: ldxdw r2, [r10 - 0x598]
04a790: ldxdw r3, [r10 - 0x5a0]
04a798: sub64 r3, r2
04a7a0: ldxdw r2, [r1 + 0x0]
04a7a8: add64 r2, -0x1
04a7b0: stxdw [r1 + 0x0], r2
04a7b8: jne r2, 0x0, +0x3 ; branch 0x4a7d8
04a7c0: ldxdw r2, [r1 + 0x8]
04a7c8: add64 r2, -0x1
04a7d0: stxdw [r1 + 0x8], r2
04a7d8: mov64 r1, r10
04a7e0: add64 r1, -0x380
04a7e8: mov64 r2, r10
04a7f0: add64 r2, -0x3a0
04a7f8: stxdw [r10 - 0x5a0], r3
04a800: call 0x541f ; call 0x74900
04a808: ldxdw r9, [r10 - 0x380]
04a810: jeq r9, 0x2, +0x1 ; branch 0x4a820
04a818: ja +0x26 ; branch 0x4a950
04a820: ldxdw r2, [r10 - 0x378]
04a828: ldxdw r1, [r10 - 0x528]
04a830: stxdw [r10 - 0x5b0], r2
04a838: jlt r2, r1, +0x1 ; branch 0x4a848
04a840: ja +0x32 ; branch 0x4a9d8
04a848: mov64 r1, r10
04a850: add64 r1, -0x360
04a858: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
04a868: call 0x5571 ; call 0x753f8
04a870: mov64 r1, r10
04a878: add64 r1, -0x348
04a880: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
04a890: call -0x841f ; call 0x87a0
04a898: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04a8a8: stxdw [r10 - 0x378], r1
04a8b0: stb [r10 - 0x330], 0x2
04a8b8: stw [r10 - 0x368], 0xbd
04a8c0: stdw [r10 - 0x370], 0x2f
04a8c8: stdw [r10 - 0x380], 0x0
04a8d0: stw [r10 - 0x2e8], 0x1774
04a8d8: mov64 r1, r10
04a8e0: add64 r1, -0x4a0
04a8e8: mov64 r2, r10
04a8f0: add64 r2, -0x380
04a8f8: call 0x170d7 ; call 0x102fb8
04a900: ldxdw r3, [r10 - 0x498]
04a908: ldxdw r2, [r10 - 0x4a0]
04a910: mov64 r1, r10
04a918: add64 r1, -0x4b0
04a920: ldxdw r4, [r10 - 0x5b0]
04a928: ldxdw r5, [r10 - 0x528]
04a930: call -0x921f ; call 0x1840
04a938: ldxdw r8, [r10 - 0x4a8]
04a940: ldxdw r9, [r10 - 0x4b0]
04a948: ja +0x1 ; branch 0x4a958
04a950: ldxdw r8, [r10 - 0x378]
04a958: ldxdw r6, [r10 - 0x538]
04a960: ja -0x113 ; branch 0x4a0d0
04a968: ldxdw r1, [r10 - 0x370]
04a970: ldxdw r2, [r10 - 0x378]
04a978: ldxdw r3, [r2 + 0x0]
04a980: add64 r3, -0x1
04a988: stxdw [r2 + 0x0], r3
04a990: jne r3, 0x0, +0x3 ; branch 0x4a9b0
04a998: ldxdw r3, [r2 + 0x8]
04a9a0: add64 r3, -0x1
04a9a8: stxdw [r2 + 0x8], r3
04a9b0: ldxdw r2, [r1 + 0x0]
04a9b8: add64 r2, -0x1
04a9c0: stxdw [r1 + 0x0], r2
04a9c8: jne r2, 0x0, -0xf ; branch 0x4a958
04a9d0: ja +0x2a7 ; branch 0x4bf10
04a9d8: ldxdw r1, [r10 - 0x5a0]
04a9e0: ldxdw r2, [r10 - 0x5b0]
04a9e8: jlt r1, r2, +0x1 ; branch 0x4a9f8
04a9f0: ja +0x6 ; branch 0x4aa28
04a9f8: mov64 r1, r10
04aa00: add64 r1, -0x490
04aa08: call 0x367 ; call 0x4c548
04aa10: ldxdw r8, [r10 - 0x488]
04aa18: ldxdw r9, [r10 - 0x490]
04aa20: ja -0x1a ; branch 0x4a958
04aa28: ldxdw r4, [r7 + 0x148]
04aa30: ldxdw r3, [r7 + 0x138]
04aa38: ldxdw r2, [r7 + 0x170]
04aa40: ldxdw r1, [r7 + 0x158]
04aa48: ldxdw r5, [r7 + 0x128]
04aa50: ldxdw r0, [r10 - 0x558]
04aa58: stxdw [r10 - 0xff0], r0
04aa60: stxdw [r10 - 0xff8], r5
04aa68: stxdw [r10 - 0x1000], r1
04aa70: stdw [r10 - 0xfe8], 0x8
04aa78: stdw [r10 - 0xfe0], 0x0
04aa80: mov64 r1, r10
04aa88: add64 r1, -0x3e0
04aa90: mov64 r5, r10
04aa98: call 0x4fa3 ; call 0x727b8
04aaa0: ldxdw r9, [r10 - 0x3e0]
04aaa8: jne r9, 0x2, +0x35 ; branch 0x4ac58
04aab0: ldxdw r4, [r7 + 0x160]
04aab8: ldxdw r3, [r7 + 0x140]
04aac0: ldxdw r2, [r7 + 0x178]
04aac8: ldxdw r1, [r7 + 0x150]
04aad0: ldxdw r5, [r7 + 0x120]
04aad8: ldxdw r0, [r10 - 0x5a0]
04aae0: stxdw [r10 - 0xff8], r0
04aae8: stxdw [r10 - 0xff0], r5
04aaf0: stxdw [r10 - 0x1000], r1
04aaf8: mov64 r1, r10
04ab00: add64 r1, -0x3f0
04ab08: mov64 r5, r10
04ab10: call 0x4ec2 ; call 0x72128
04ab18: ldxdw r9, [r10 - 0x3f0]
04ab20: jeq r9, 0x2, +0x1 ; branch 0x4ab30
04ab28: ja +0x27 ; branch 0x4ac68
04ab30: ldxdw r1, [r7 + 0x120]
04ab38: ldxb r4, [r1 + 0x11b]
04ab40: ldxdw r2, [r7 + 0x130]
04ab48: add64 r2, 0x8
04ab50: mov64 r1, r10
04ab58: add64 r1, -0x400
04ab60: ldxdw r3, [r10 - 0x598]
04ab68: call 0x342d ; call 0x64cd8
04ab70: ldxdw r2, [r7 + 0x178]
04ab78: ldxdw r3, [r7 + 0x140]
04ab80: ldxdw r4, [r7 + 0x160]
04ab88: ldxdw r1, [r7 + 0x168]
04ab90: ldxdw r5, [r7 + 0x120]
04ab98: ldxdw r0, [r10 - 0x400]
04aba0: stxdw [r10 - 0x5b8], r0
04aba8: ldxdw r0, [r10 - 0x3f8]
04abb0: stxdw [r10 - 0xff8], r0
04abb8: stxdw [r10 - 0xff0], r5
04abc0: stxdw [r10 - 0x1000], r1
04abc8: mov64 r1, r10
04abd0: add64 r1, -0x410
04abd8: mov64 r5, r10
04abe0: call 0x4ea8 ; call 0x72128
04abe8: ldxdw r9, [r10 - 0x410]
04abf0: jeq r9, 0x2, +0x1 ; branch 0x4ac00
04abf8: ja +0xf ; branch 0x4ac78
04ac00: ldxdw r1, [r10 - 0x570]
04ac08: jne r1, 0x0, +0xf ; branch 0x4ac88
04ac10: mov64 r1, 0x0
04ac18: stxdw [r10 - 0x5d0], r1
04ac20: ldxdw r1, [r10 - 0x530]
04ac28: ldxdw r2, [r1 + 0x18]
04ac30: stxdw [r10 - 0x5c0], r2
04ac38: ldxdw r1, [r1 + 0x10]
04ac40: stxdw [r10 - 0x5c8], r1
04ac48: mov64 r1, 0x0
04ac50: ja +0x60 ; branch 0x4af58
04ac58: ldxdw r8, [r10 - 0x3d8]
04ac60: ja -0x62 ; branch 0x4a958
04ac68: ldxdw r8, [r10 - 0x3e8]
04ac70: ja -0x64 ; branch 0x4a958
04ac78: ldxdw r8, [r10 - 0x408]
04ac80: ja -0x66 ; branch 0x4a958
04ac88: ldxdw r1, [r10 - 0x530]
04ac90: ldxdw r2, [r1 + 0x18]
04ac98: stxdw [r10 - 0x5c0], r2
04aca0: ldxdw r1, [r1 + 0x10]
04aca8: stxdw [r10 - 0x5c8], r1
04acb0: ldxdw r3, [r7 + 0x120]
04acb8: ldxb r1, [r3 + 0x11c]
04acc0: jne r1, 0x0, +0x2a ; branch 0x4ae18
04acc8: ldxdw r1, [r7 + 0x138]
04acd0: ldxdw r1, [r1 + 0x58]
04acd8: ldxdw r1, [r1 + 0x0]
04ace0: ldxdw r2, [r1 + 0x18]
04ace8: stxdw [r10 - 0x368], r2
04acf0: ldxdw r2, [r1 + 0x10]
04acf8: stxdw [r10 - 0x370], r2
04ad00: ldxdw r2, [r1 + 0x8]
04ad08: stxdw [r10 - 0x378], r2
04ad10: ldxdw r1, [r1 + 0x0]
04ad18: stxdw [r10 - 0x380], r1
04ad20: mov64 r1, r10
04ad28: add64 r1, -0x430
04ad30: mov64 r4, r10
04ad38: add64 r4, -0x380
04ad40: mov64 r2, 0x0
04ad48: stxdw [r10 - 0x5d0], r2
04ad50: ldxdw r2, [r10 - 0x5c8]
04ad58: ldxdw r3, [r10 - 0x5c0]
04ad60: mov64 r5, 0x0
04ad68: call 0x7a4 ; call 0x4ea90
04ad70: ldxdw r9, [r10 - 0x430]
04ad78: jeq r9, 0x2, +0x1 ; branch 0x4ad88
04ad80: ja +0x9b ; branch 0x4b260
04ad88: ldxdw r4, [r7 + 0x160]
04ad90: ldxdw r3, [r7 + 0x140]
04ad98: ldxdw r2, [r7 + 0x178]
04ada0: ldxdw r1, [r7 + 0x198]
04ada8: ldxdw r5, [r7 + 0x120]
04adb0: ldxdw r0, [r10 - 0x570]
04adb8: stxdw [r10 - 0xff8], r0
04adc0: stxdw [r10 - 0xff0], r5
04adc8: stxdw [r10 - 0x1000], r1
04add0: mov64 r1, r10
04add8: add64 r1, -0x440
04ade0: mov64 r5, r10
04ade8: call 0x4e67 ; call 0x72128
04adf0: mov64 r1, 0x1
04adf8: ldxdw r9, [r10 - 0x440]
04ae00: jeq r9, 0x2, +0x2a ; branch 0x4af58
04ae08: ldxdw r8, [r10 - 0x438]
04ae10: ja -0x98 ; branch 0x4a958
04ae18: ldxdw r1, [r7 + 0x160]
04ae20: ldxdw r2, [r7 + 0x140]
04ae28: ldxdw r4, [r7 + 0x138]
04ae30: ldxdw r4, [r4 + 0x58]
04ae38: ldxdw r4, [r4 + 0x0]
04ae40: ldxdw r5, [r4 + 0x18]
04ae48: stxdw [r10 - 0x368], r5
04ae50: ldxdw r5, [r4 + 0x10]
04ae58: stxdw [r10 - 0x370], r5
04ae60: ldxdw r5, [r4 + 0x8]
04ae68: stxdw [r10 - 0x378], r5
04ae70: ldxdw r4, [r4 + 0x0]
04ae78: stxdw [r10 - 0x380], r4
04ae80: ldxdw r4, [r7 + 0x128]
04ae88: ldxdw r5, [r7 + 0x178]
04ae90: ldxdw r0, [r7 + 0x180]
04ae98: ldxdw r8, [r7 + 0x188]
04aea0: stxdw [r10 - 0xfd0], r3
04aea8: mov64 r3, r10
04aeb0: add64 r3, -0x380
04aeb8: stxdw [r10 - 0xfc8], r3
04aec0: ldxdw r3, [r10 - 0x570]
04aec8: stxdw [r10 - 0xfd8], r3
04aed0: stxdw [r10 - 0xfe0], r8
04aed8: stxdw [r10 - 0xfe8], r0
04aee0: stxdw [r10 - 0xff0], r5
04aee8: stxdw [r10 - 0xff8], r2
04aef0: stxdw [r10 - 0x1000], r1
04aef8: mov64 r1, r10
04af00: add64 r1, -0x420
04af08: mov64 r5, r10
04af10: ldxdw r2, [r10 - 0x5c8]
04af18: ldxdw r3, [r10 - 0x5c0]
04af20: call 0x305 ; call 0x4c750
04af28: ldxdw r9, [r10 - 0x420]
04af30: jeq r9, 0x2, +0x1 ; branch 0x4af40
04af38: ja +0x62 ; branch 0x4b250
04af40: mov64 r1, 0x3
04af48: mov64 r2, 0x1
04af50: stxdw [r10 - 0x5d0], r2
04af58: ldxdw r4, [r7 + 0x130]
04af60: ldxdw r2, [r7 + 0x140]
04af68: ldxdw r2, [r2 + 0x58]
04af70: ldxdw r2, [r2 + 0x0]
04af78: ldxdw r3, [r2 + 0x18]
04af80: stxdw [r10 - 0xa0], r3
04af88: ldxdw r3, [r2 + 0x10]
04af90: stxdw [r10 - 0xa8], r3
04af98: ldxdw r3, [r2 + 0x8]
04afa0: stxdw [r10 - 0xb0], r3
04afa8: ldxdw r2, [r2 + 0x0]
04afb0: stxdw [r10 - 0xb8], r2
04afb8: ldxdw r2, [r7 + 0x178]
04afc0: ldxdw r2, [r2 + 0x0]
04afc8: ldxdw r3, [r2 + 0x18]
04afd0: stxdw [r10 - 0x368], r3
04afd8: ldxdw r3, [r2 + 0x10]
04afe0: stxdw [r10 - 0x370], r3
04afe8: ldxdw r3, [r2 + 0x8]
04aff0: stxdw [r10 - 0x378], r3
04aff8: ldxdw r2, [r2 + 0x0]
04b000: stxdw [r10 - 0x380], r2
04b008: mov64 r2, r10
04b010: add64 r2, -0xb8
04b018: stxdw [r10 - 0xff8], r2
04b020: mov64 r2, r10
04b028: add64 r2, -0x380
04b030: stxdw [r10 - 0xff0], r2
04b038: stxdw [r10 - 0x1000], r1
04b040: add64 r4, 0x8
04b048: mov64 r1, r10
04b050: add64 r1, -0x50
04b058: mov64 r5, r10
04b060: ldxdw r2, [r10 - 0x5c8]
04b068: ldxdw r3, [r10 - 0x5c0]
04b070: call -0x27e5 ; call 0x37150
04b078: ldxdw r8, [r10 - 0x40]
04b080: ldxdw r1, [r10 - 0x50]
04b088: jeq r1, 0x0, +0x2 ; branch 0x4b0a0
04b090: ldxdw r9, [r10 - 0x48]
04b098: ja -0xe9 ; branch 0x4a958
04b0a0: ldxdw r1, [r10 - 0x5b8]
04b0a8: jeq r1, 0x0, +0x21 ; branch 0x4b1b8
04b0b0: mov64 r1, r7
04b0b8: add64 r1, 0x180
04b0c0: ldxdw r4, [r10 - 0x48]
04b0c8: ldxdw r3, [r7 + 0x140]
04b0d0: ldxdw r2, [r7 + 0x178]
04b0d8: ldxdw r5, [r7 + 0x128]
04b0e0: stxdw [r10 - 0xff0], r1
04b0e8: mov64 r1, r7
04b0f0: add64 r1, 0x188
04b0f8: stxdw [r10 - 0xfe8], r1
04b100: stxdw [r10 - 0xff8], r5
04b108: stxdw [r10 - 0x1000], r8
04b110: mov64 r1, r10
04b118: add64 r1, -0x450
04b120: mov64 r5, r10
04b128: call 0x4b46 ; call 0x70b60
04b130: ldxdw r9, [r10 - 0x450]
04b138: jne r9, 0x2, +0x26 ; branch 0x4b270
04b140: ldxdw r4, [r7 + 0x160]
04b148: ldxdw r3, [r7 + 0x140]
04b150: ldxdw r2, [r7 + 0x178]
04b158: ldxdw r1, [r7 + 0x120]
04b160: stxdw [r10 - 0xff8], r8
04b168: ldxdw r5, [r10 - 0x5b8]
04b170: stxdw [r10 - 0xff0], r5
04b178: stxdw [r10 - 0x1000], r1
04b180: mov64 r1, r10
04b188: add64 r1, -0x460
04b190: mov64 r5, r10
04b198: call 0x4ca3 ; call 0x716b8
04b1a0: ldxdw r9, [r10 - 0x460]
04b1a8: jeq r9, 0x2, +0x1 ; branch 0x4b1b8
04b1b0: ja +0x193 ; branch 0x4be50
04b1b8: mov64 r1, r10
04b1c0: add64 r1, -0xb8
04b1c8: call 0x1778d ; call 0x106e38
04b1d0: ldxdw r1, [r10 - 0xb8]
04b1d8: jeq r1, 0x0, +0x14 ; branch 0x4b280
04b1e0: ldxdw r1, [r10 - 0xb0]
04b1e8: ldxdw r2, [r10 - 0xa8]
04b1f0: ldxdw r3, [r10 - 0xa0]
04b1f8: stxdw [r10 - 0xa8], r3
04b200: stxdw [r10 - 0xb0], r2
04b208: stxdw [r10 - 0xb8], r1
04b210: mov64 r1, r10
04b218: add64 r1, -0x470
04b220: mov64 r2, r10
04b228: add64 r2, -0xb8
04b230: call 0x16fc1 ; call 0x103040
04b238: ldxdw r8, [r10 - 0x468]
04b240: ldxdw r9, [r10 - 0x470]
04b248: ja -0x11f ; branch 0x4a958
04b250: ldxdw r8, [r10 - 0x418]
04b258: ja -0x121 ; branch 0x4a958
04b260: ldxdw r8, [r10 - 0x428]
04b268: ja -0x123 ; branch 0x4a958
04b270: ldxdw r8, [r10 - 0x448]
04b278: ja -0x125 ; branch 0x4a958
04b280: ldxdw r1, [r10 - 0x90]
04b288: stxdw [r10 - 0x5f0], r1
04b290: ldxdw r1, [r7 + 0x120]
04b298: ldxdw r2, [r1 + 0x0]
04b2a0: ldxdw r2, [r2 + 0x0]
04b2a8: ldxdw r3, [r2 + 0x18]
04b2b0: stxdw [r10 - 0x1a8], r3
04b2b8: ldxdw r3, [r2 + 0x10]
04b2c0: stxdw [r10 - 0x1b0], r3
04b2c8: ldxdw r3, [r2 + 0x8]
04b2d0: stxdw [r10 - 0x1b8], r3
04b2d8: ldxdw r2, [r2 + 0x0]
04b2e0: stxdw [r10 - 0x1c0], r2
04b2e8: ldxdw r2, [r7 + 0x128]
04b2f0: ldxdw r2, [r2 + 0x0]
04b2f8: ldxdw r3, [r2 + 0x18]
04b300: stxdw [r10 - 0x188], r3
04b308: ldxdw r3, [r2 + 0x10]
04b310: stxdw [r10 - 0x190], r3
04b318: ldxdw r3, [r2 + 0x8]
04b320: stxdw [r10 - 0x198], r3
04b328: ldxdw r2, [r2 + 0x0]
04b330: stxdw [r10 - 0x1a0], r2
04b338: ldxdw r2, [r7 + 0x148]
04b340: ldxdw r2, [r2 + 0x20]
04b348: ldxdw r2, [r2 + 0x0]
04b350: ldxdw r3, [r2 + 0x18]
04b358: stxdw [r10 - 0x168], r3
04b360: ldxdw r3, [r2 + 0x10]
04b368: stxdw [r10 - 0x170], r3
04b370: ldxdw r3, [r2 + 0x8]
04b378: stxdw [r10 - 0x178], r3
04b380: ldxdw r2, [r2 + 0x0]
04b388: stxdw [r10 - 0x180], r2
04b390: ldxdw r2, [r7 + 0x150]
04b398: ldxdw r2, [r2 + 0x20]
04b3a0: ldxdw r2, [r2 + 0x0]
04b3a8: ldxdw r3, [r2 + 0x18]
04b3b0: stxdw [r10 - 0x148], r3
04b3b8: ldxdw r3, [r2 + 0x10]
04b3c0: stxdw [r10 - 0x150], r3
04b3c8: ldxdw r3, [r2 + 0x8]
04b3d0: stxdw [r10 - 0x158], r3
04b3d8: ldxdw r2, [r2 + 0x0]
04b3e0: stxdw [r10 - 0x160], r2
04b3e8: ldxdw r2, [r7 + 0x90]
04b3f0: ldxdw r3, [r2 + 0x18]
04b3f8: stxdw [r10 - 0x8], r3
04b400: ldxdw r3, [r2 + 0x10]
04b408: stxdw [r10 - 0x10], r3
04b410: ldxdw r3, [r2 + 0x8]
04b418: stxdw [r10 - 0x18], r3
04b420: ldxdw r2, [r2 + 0x0]
04b428: stxdw [r10 - 0x20], r2
04b430: ldxdw r2, [r7 + 0x168]
04b438: ldxdw r2, [r2 + 0x20]
04b440: ldxdw r2, [r2 + 0x0]
04b448: ldxdw r3, [r2 + 0x18]
04b450: stxdw [r10 - 0x38], r3
04b458: ldxdw r3, [r2 + 0x10]
04b460: stxdw [r10 - 0x40], r3
04b468: ldxdw r3, [r2 + 0x8]
04b470: stxdw [r10 - 0x48], r3
04b478: ldxdw r2, [r2 + 0x0]
04b480: stxdw [r10 - 0x50], r2
04b488: ldxdw r2, [r1 + 0xe0]
04b490: stxdw [r10 - 0xa0], r2
04b498: ldxdw r2, [r1 + 0xd8]
04b4a0: stxdw [r10 - 0xa8], r2
04b4a8: ldxdw r2, [r1 + 0xd0]
04b4b0: stxdw [r10 - 0xb0], r2
04b4b8: ldxdw r2, [r1 + 0xc8]
04b4c0: stxdw [r10 - 0xb8], r2
04b4c8: mov64 r2, 0x0
04b4d0: stxdw [r10 - 0x5e8], r2
04b4d8: ldxdw r2, [r10 - 0x570]
04b4e0: stxdw [r10 - 0x5c0], r2
04b4e8: ldxdw r2, [r10 - 0x5d0]
04b4f0: jne r2, 0x0, +0x2 ; branch 0x4b508
04b4f8: mov64 r2, 0x0
04b500: stxdw [r10 - 0x5c0], r2
04b508: ldxdw r2, [r10 - 0x578]
04b510: stxdw [r10 - 0x5c8], r2
04b518: ldxdw r2, [r10 - 0x5d0]
04b520: jne r2, 0x0, +0x2 ; branch 0x4b538
04b528: mov64 r2, 0x0
04b530: stxdw [r10 - 0x5c8], r2
04b538: mov64 r2, 0x0
04b540: stxdw [r10 - 0x5d8], r2
04b548: ldxdw r2, [r10 - 0x5d0]
04b550: jne r2, 0x0, +0x2 ; branch 0x4b568
04b558: ldxdw r2, [r10 - 0x570]
04b560: stxdw [r10 - 0x5d8], r2
04b568: mov64 r2, 0x0
04b570: stxdw [r10 - 0x5e0], r2
04b578: ldxdw r2, [r10 - 0x5d0]
04b580: jne r2, 0x0, +0x2 ; branch 0x4b598
04b588: ldxdw r2, [r10 - 0x578]
04b590: stxdw [r10 - 0x5e0], r2
04b598: ldxb r2, [r1 + 0x11e]
04b5a0: mov64 r3, 0x0
04b5a8: stxdw [r10 - 0x5d0], r3
04b5b0: jeq r2, 0x0, +0x2 ; branch 0x4b5c8
04b5b8: ldxdw r3, [r10 - 0x570]
04b5c0: stxdw [r10 - 0x5d0], r3
04b5c8: mov64 r8, 0x0
04b5d0: jeq r2, 0x0, +0x1 ; branch 0x4b5e0
04b5d8: ldxdw r8, [r10 - 0x578]
04b5e0: ldxb r1, [r1 + 0x11b]
04b5e8: jeq r1, 0x0, +0x1 ; branch 0x4b5f8
04b5f0: ja +0x3 ; branch 0x4b610
04b5f8: ldxdw r1, [r7 + 0x130]
04b600: ldxdw r1, [r1 + 0x3a0]
04b608: stxdw [r10 - 0x5e8], r1
04b610: mov64 r1, r10
04b618: add64 r1, -0x140
04b620: mov64 r2, r10
04b628: add64 r2, -0x3a0
04b630: ldxdw r3, [r10 - 0x5b8]
04b638: call 0x5258 ; call 0x74900
04b640: ldxdw r9, [r10 - 0x140]
04b648: jne r9, 0x2, +0x102 ; branch 0x4be60
04b650: ldxdw r9, [r10 - 0x5a0]
04b658: ldxdw r1, [r10 - 0x5b0]
04b660: sub64 r9, r1
04b668: ldxdw r1, [r10 - 0x138]
04b670: stxdw [r10 - 0x570], r1
04b678: ldxdw r1, [r7 + 0x120]
04b680: ldxdw r2, [r1 + 0xf0]
04b688: stxdw [r10 - 0x5b0], r2
04b690: ldxdw r2, [r1 + 0xe8]
04b698: stxdw [r10 - 0x578], r2
04b6a0: add64 r1, 0x8
04b6a8: call 0x4173 ; call 0x6c248
04b6b0: lddw r1, 0x38d7ea4c68000
04b6c0: ldxdw r2, [r7 + 0x120]
04b6c8: ldxb r3, [r2 + 0x11b]
04b6d0: jeq r3, 0x0, +0x1 ; branch 0x4b6e0
04b6d8: ja +0x2 ; branch 0x4b6f0
04b6e0: ldxdw r1, [r7 + 0x138]
04b6e8: ldxdw r1, [r1 + 0x28]
04b6f0: ldxdw r2, [r2 + 0x110]
04b6f8: ldxdw r3, [r10 - 0x5a0]
04b700: stxdw [r10 - 0x318], r3
04b708: ldxdw r3, [r10 - 0x5a8]
04b710: stxdw [r10 - 0x320], r3
04b718: ldxdw r3, [r10 - 0x598]
04b720: stxdw [r10 - 0x328], r3
04b728: ldxdw r3, [r10 - 0x580]
04b730: stxdw [r10 - 0x330], r3
04b738: ldxdw r3, [r10 - 0x568]
04b740: stxdw [r10 - 0x338], r3
04b748: ldxdw r3, [r10 - 0x590]
04b750: stxdw [r10 - 0x340], r3
04b758: ldxdw r3, [r10 - 0x560]
04b760: stxdw [r10 - 0x348], r3
04b768: ldxdw r3, [r10 - 0x540]
04b770: stxdw [r10 - 0x350], r3
04b778: ldxdw r3, [r10 - 0x588]
04b780: stxdw [r10 - 0x358], r3
04b788: ldxdw r3, [r10 - 0x548]
04b790: stxdw [r10 - 0x360], r3
04b798: ldxdw r3, [r10 - 0x550]
04b7a0: stxdw [r10 - 0x368], r3
04b7a8: ldxdw r3, [r10 - 0x528]
04b7b0: stxdw [r10 - 0x370], r3
04b7b8: ldxdw r3, [r10 - 0x558]
04b7c0: stxdw [r10 - 0x378], r3
04b7c8: ldxdw r3, [r10 - 0x5f0]
04b7d0: stxdw [r10 - 0x380], r3
04b7d8: ldxdw r3, [r10 - 0x1c0]
04b7e0: stxdw [r10 - 0x310], r3
04b7e8: ldxdw r3, [r10 - 0x1b8]
04b7f0: stxdw [r10 - 0x308], r3
04b7f8: ldxdw r3, [r10 - 0x1b0]
04b800: stxdw [r10 - 0x300], r3
04b808: ldxdw r3, [r10 - 0x1a8]
04b810: stxdw [r10 - 0x2f8], r3
04b818: ldxdw r3, [r10 - 0x188]
04b820: stxdw [r10 - 0x2d8], r3
04b828: ldxdw r3, [r10 - 0x190]
04b830: stxdw [r10 - 0x2e0], r3
04b838: ldxdw r3, [r10 - 0x198]
04b840: stxdw [r10 - 0x2e8], r3
04b848: ldxdw r3, [r10 - 0x1a0]
04b850: stxdw [r10 - 0x2f0], r3
04b858: ldxdw r3, [r10 - 0x180]
04b860: stxdw [r10 - 0x2d0], r3
04b868: ldxdw r3, [r10 - 0x178]
04b870: stxdw [r10 - 0x2c8], r3
04b878: ldxdw r3, [r10 - 0x170]
04b880: stxdw [r10 - 0x2c0], r3
04b888: ldxdw r3, [r10 - 0x168]
04b890: stxdw [r10 - 0x2b8], r3
04b898: ldxdw r3, [r10 - 0x160]
04b8a0: stxdw [r10 - 0x2b0], r3
04b8a8: ldxdw r3, [r10 - 0x158]
04b8b0: stxdw [r10 - 0x2a8], r3
04b8b8: ldxdw r3, [r10 - 0x150]
04b8c0: stxdw [r10 - 0x2a0], r3
04b8c8: ldxdw r3, [r10 - 0x148]
04b8d0: stxdw [r10 - 0x298], r3
04b8d8: ldxdw r3, [r10 - 0x8]
04b8e0: stxdw [r10 - 0x278], r3
04b8e8: ldxdw r3, [r10 - 0x10]
04b8f0: stxdw [r10 - 0x280], r3
04b8f8: ldxdw r3, [r10 - 0x18]
04b900: stxdw [r10 - 0x288], r3
04b908: ldxdw r3, [r10 - 0x20]
04b910: stxdw [r10 - 0x290], r3
04b918: ldxdw r3, [r10 - 0x38]
04b920: stxdw [r10 - 0x258], r3
04b928: ldxdw r3, [r10 - 0x40]
04b930: stxdw [r10 - 0x260], r3
04b938: ldxdw r3, [r10 - 0x48]
04b940: stxdw [r10 - 0x268], r3
04b948: ldxdw r3, [r10 - 0x50]
04b950: stxdw [r10 - 0x270], r3
04b958: ldxdw r3, [r10 - 0xa0]
04b960: stxdw [r10 - 0x238], r3
04b968: ldxdw r3, [r10 - 0xa8]
04b970: stxdw [r10 - 0x240], r3
04b978: ldxdw r3, [r10 - 0xb0]
04b980: stxdw [r10 - 0x248], r3
04b988: ldxdw r3, [r10 - 0xb8]
04b990: stxdw [r10 - 0x250], r3
04b998: ldxdw r3, [r10 - 0x5b0]
04b9a0: stxdw [r10 - 0x1f8], r3
04b9a8: ldxdw r3, [r10 - 0x578]
04b9b0: stxdw [r10 - 0x200], r3
04b9b8: stxb [r10 - 0x1c8], r0
04b9c0: ldxdw r3, [r10 - 0x570]
04b9c8: stxdw [r10 - 0x208], r3
04b9d0: ldxdw r3, [r10 - 0x5e8]
04b9d8: stxdw [r10 - 0x210], r3
04b9e0: ldxdw r3, [r10 - 0x5c0]
04b9e8: stxdw [r10 - 0x218], r3
04b9f0: ldxdw r3, [r10 - 0x5c8]
04b9f8: stxdw [r10 - 0x220], r3
04ba00: ldxdw r3, [r10 - 0x5d8]
04ba08: stxdw [r10 - 0x228], r3
04ba10: ldxdw r3, [r10 - 0x5e0]
04ba18: stxdw [r10 - 0x230], r3
04ba20: stxdw [r10 - 0x1d0], r9
04ba28: stxdw [r10 - 0x1d8], r2
04ba30: ldxdw r2, [r10 - 0x5d0]
04ba38: stxdw [r10 - 0x1e0], r2
04ba40: stxdw [r10 - 0x1e8], r8
04ba48: stxdw [r10 - 0x1f0], r1
04ba50: mov64 r1, r10
04ba58: add64 r1, -0xb8
04ba60: mov64 r9, r10
04ba68: add64 r9, -0x380
04ba70: mov64 r2, r9
04ba78: call 0xdb4a ; call 0xb94d0
04ba80: ldxdw r1, [r10 - 0xa8]
04ba88: stxdw [r10 - 0x48], r1
04ba90: ldxdw r1, [r10 - 0xb0]
04ba98: stxdw [r10 - 0x50], r1
04baa0: mov64 r1, r10
04baa8: add64 r1, -0x50
04bab0: mov64 r2, 0x1
04bab8: call 0x175f8 ; call 0x106a80
04bac0: add64 r7, 0xc0
04bac8: mov64 r1, r10
04bad0: add64 r1, -0x130
04bad8: stxdw [r10 - 0x540], r1
04bae0: mov64 r2, r7
04bae8: call -0x7b2f ; call 0xe178
04baf0: ldxdw r1, [r10 - 0x530]
04baf8: ldxb r1, [r1 + 0x20]
04bb00: stxdw [r10 - 0x528], r1
04bb08: mov64 r1, r10
04bb10: add64 r1, -0x100
04bb18: mov64 r2, r9
04bb20: call 0xdb35 ; call 0xb94d0
04bb28: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
04bb38: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
04bb48: add64 r2, 0x8
04bb50: stxdw [r10 - 0xc0], r2
04bb58: stxdw [r10 - 0xc8], r1
04bb60: ldxdw r1, [r10 - 0x100]
04bb68: stxdw [r10 - 0xd8], r1
04bb70: ldxdw r1, [r10 - 0xf8]
04bb78: stxdw [r10 - 0xe0], r1
04bb80: stxdw [r10 - 0xe8], r1
04bb88: ldxdw r2, [r10 - 0xf0]
04bb90: add64 r1, r2
04bb98: stxdw [r10 - 0xd0], r1
04bba0: mov64 r1, r10
04bba8: add64 r1, -0x160
04bbb0: mov64 r2, r10
04bbb8: add64 r2, -0xe8
04bbc0: call -0x77c0 ; call 0xfdc8
04bbc8: ldxdw r9, [r10 - 0x158]
04bbd0: ldxdw r8, [r10 - 0x150]
04bbd8: mov64 r1, 0x22
04bbe0: mov64 r2, 0x1
04bbe8: call -0x8151 ; call 0xb168
04bbf0: ldxdw r1, [r10 - 0x130]
04bbf8: ldxdw r2, [r1 + 0x18]
04bc00: ldxdw r3, [r1 + 0x10]
04bc08: ldxdw r4, [r1 + 0x8]
04bc10: ldxdw r1, [r1 + 0x0]
04bc18: stxdw [r0 + 0x0], r1
04bc20: stxdw [r0 + 0x8], r4
04bc28: stxdw [r0 + 0x10], r3
04bc30: stxdw [r0 + 0x18], r2
04bc38: sth [r0 + 0x20], 0x1
04bc40: stxdw [r10 - 0x48], r0
04bc48: stdw [r10 - 0x50], 0x1
04bc50: stdw [r10 - 0x40], 0x1
04bc58: mov64 r7, r10
04bc60: add64 r7, -0xb8
04bc68: mov64 r5, r10
04bc70: add64 r5, -0x50
04bc78: mov64 r1, r7
04bc80: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04bc90: mov64 r3, r9
04bc98: mov64 r4, r8
04bca0: call 0x183d5 ; call 0x10db50
04bca8: mov64 r8, r10
04bcb0: add64 r8, -0x50
04bcb8: mov64 r1, r8
04bcc0: ldxdw r2, [r10 - 0x540]
04bcc8: mov64 r3, 0x30
04bcd0: call 0x19b78 ; call 0x119898
04bcd8: mov64 r1, r10
04bce0: add64 r1, -0x20
04bce8: stxdw [r10 - 0x180], r1
04bcf0: mov64 r1, r10
04bcf8: add64 r1, -0x1a0
04bd00: stxdw [r10 - 0x10], r1
04bd08: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
04bd18: stxdw [r10 - 0x20], r1
04bd20: ldxdw r1, [r10 - 0x528]
04bd28: stxb [r10 - 0x1a0], r1
04bd30: stdw [r10 - 0x178], 0x2
04bd38: stdw [r10 - 0x8], 0x1
04bd40: stdw [r10 - 0x18], 0x11
04bd48: mov64 r1, r10
04bd50: add64 r1, -0x180
04bd58: stxdw [r10 - 0x1000], r1
04bd60: stdw [r10 - 0xff8], 0x1
04bd68: mov64 r1, r10
04bd70: add64 r1, -0x68
04bd78: mov64 r5, r10
04bd80: mov64 r2, r7
04bd88: mov64 r3, r8
04bd90: mov64 r4, 0x1
04bd98: call 0x175a3 ; call 0x106ab8
04bda0: lddw r1, -0x7fffffffffffffe6
04bdb0: ldxdw r2, [r10 - 0x68]
04bdb8: jne r2, r1, +0x16 ; branch 0x4be70
04bdc0: ldxdw r1, [r10 - 0x40]
04bdc8: ldxdw r2, [r10 - 0x48]
04bdd0: ldxdw r3, [r2 + 0x0]
04bdd8: add64 r3, -0x1
04bde0: stxdw [r2 + 0x0], r3
04bde8: jne r3, 0x0, +0x3 ; branch 0x4be08
04bdf0: ldxdw r3, [r2 + 0x8]
04bdf8: add64 r3, -0x1
04be00: stxdw [r2 + 0x8], r3
04be08: ldxdw r2, [r1 + 0x0]
04be10: add64 r2, -0x1
04be18: stxdw [r1 + 0x0], r2
04be20: jne r2, 0x0, +0x3 ; branch 0x4be40
04be28: ldxdw r2, [r1 + 0x8]
04be30: add64 r2, -0x1
04be38: stxdw [r1 + 0x8], r2
04be40: mov64 r9, 0x2
04be48: ja -0x29f ; branch 0x4a958
04be50: ldxdw r8, [r10 - 0x458]
04be58: ja -0x2a1 ; branch 0x4a958
04be60: ldxdw r8, [r10 - 0x138]
04be68: ja -0x2a3 ; branch 0x4a958
04be70: mov64 r1, r10
04be78: add64 r1, -0x480
04be80: mov64 r2, r10
04be88: add64 r2, -0x68
04be90: call 0x16e35 ; call 0x103040
04be98: ldxdw r1, [r10 - 0x40]
04bea0: ldxdw r8, [r10 - 0x478]
04bea8: ldxdw r9, [r10 - 0x480]
04beb0: ldxdw r2, [r10 - 0x48]
04beb8: ldxdw r3, [r2 + 0x0]
04bec0: add64 r3, -0x1
04bec8: stxdw [r2 + 0x0], r3
04bed0: jne r3, 0x0, +0x3 ; branch 0x4bef0
04bed8: ldxdw r3, [r2 + 0x8]
04bee0: add64 r3, -0x1
04bee8: stxdw [r2 + 0x8], r3
04bef0: ldxdw r2, [r1 + 0x0]
04bef8: add64 r2, -0x1
04bf00: stxdw [r1 + 0x0], r2
04bf08: jne r2, 0x0, -0x2b7 ; branch 0x4a958
04bf10: ldxdw r2, [r1 + 0x8]
04bf18: add64 r2, -0x1
04bf20: stxdw [r1 + 0x8], r2
04bf28: ja -0x2bb ; branch 0x4a958
