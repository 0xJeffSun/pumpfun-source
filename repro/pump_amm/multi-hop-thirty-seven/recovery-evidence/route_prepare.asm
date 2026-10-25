045940: stxdw [r10 - 0x510], r4
045948: stxdw [r10 - 0x558], r2
045950: mov64 r8, r1
045958: stxb [r10 - 0x421], r3
045960: mov64 r1, r10
045968: add64 r1, -0x421
045970: stxdw [r10 - 0x410], r1
045978: lddw r1, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
045988: stxdw [r10 - 0x420], r1
045990: ldxdw r7, [r5 - 0xfe0]
045998: ldxdw r6, [r5 - 0xfe8]
0459a0: ldxdw r9, [r5 - 0xff0]
0459a8: ldxdw r4, [r5 - 0xff8]
0459b0: ldxdw r0, [r5 - 0x1000]
0459b8: stdw [r10 - 0x408], 0x1
0459c0: stdw [r10 - 0x418], 0xd
0459c8: ldxdw r1, [r5 - 0xfd8]
0459d0: stxdw [r10 - 0x570], r4
0459d8: stxdw [r10 - 0x538], r0
0459e0: jne r1, 0x0, +0x25 ; branch 0x45b10
0459e8: mov64 r2, r0
0459f0: add64 r2, -0x5
0459f8: mov64 r1, 0x0
045a00: mov64 r3, 0x1
045a08: jgt r2, r0, +0x1 ; branch 0x45a18
045a10: mov64 r3, 0x0
045a18: jne r3, 0x0, +0x1 ; branch 0x45a28
045a20: mov64 r1, r2
045a28: ldxdw r2, [r10 - 0x538]
045a30: sub64 r2, r1
045a38: jgt r2, 0x1, +0x1 ; branch 0x45a48
045a40: ja +0x81b ; branch 0x49b20
045a48: mul64 r1, 0x30
045a50: ldxdw r2, [r10 - 0x510]
045a58: add64 r2, r1
045a60: ldxdw r1, [r2 + 0x30]
045a68: ldxdw r2, [r1 + 0x18]
045a70: stxdw [r10 - 0x308], r2
045a78: ldxdw r2, [r1 + 0x10]
045a80: stxdw [r10 - 0x310], r2
045a88: ldxdw r2, [r1 + 0x8]
045a90: stxdw [r10 - 0x318], r2
045a98: ldxdw r1, [r1 + 0x0]
045aa0: stxdw [r10 - 0x320], r1
045aa8: mov64 r1, r10
045ab0: add64 r1, -0x320
045ab8: lddw r2, 0x11beb0 ; rodata b'\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction: UpdateBuybackConfigAn owner co'
045ac8: mov64 r3, 0x20
045ad0: call 0x1a7c1 ; call 0x1198e0
045ad8: lsh64 r0, 0x20
045ae0: rsh64 r0, 0x20
045ae8: mov64 r3, 0x0
045af0: mov64 r2, 0x1
045af8: jeq r0, 0x0, +0x1e ; branch 0x45bf0
045b00: mov64 r2, 0x0
045b08: ja +0x1c ; branch 0x45bf0
045b10: jgt r0, 0x4, +0x5 ; branch 0x45b40
045b18: mov64 r1, 0x5
045b20: ldxdw r2, [r10 - 0x538]
045b28: lddw r3, 0x122538 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00/\x03\x00\x00:\x00\x00\x00\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb7\x01\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb8\x01\x00\x00\r\x00\x00\x00\x00\x00\x00'
045b38: call 0x1a178 ; call 0x116700
045b40: ldxdw r1, [r10 - 0x510]
045b48: ldxdw r1, [r1 + 0x30]
045b50: ldxdw r2, [r1 + 0x18]
045b58: stxdw [r10 - 0x308], r2
045b60: ldxdw r2, [r1 + 0x10]
045b68: stxdw [r10 - 0x310], r2
045b70: ldxdw r2, [r1 + 0x8]
045b78: stxdw [r10 - 0x318], r2
045b80: ldxdw r1, [r1 + 0x0]
045b88: stxdw [r10 - 0x320], r1
045b90: mov64 r1, r10
045b98: add64 r1, -0x320
045ba0: lddw r2, 0x11beb0 ; rodata b'\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction: UpdateBuybackConfigAn owner co'
045bb0: mov64 r3, 0x20
045bb8: call 0x1a7a4 ; call 0x1198e0
045bc0: lsh64 r0, 0x20
045bc8: rsh64 r0, 0x20
045bd0: mov64 r2, 0x0
045bd8: mov64 r3, 0x1
045be0: jeq r0, 0x0, +0x1 ; branch 0x45bf0
045be8: mov64 r3, 0x0
045bf0: ldxb r1, [r6 + 0x0]
045bf8: jeq r1, 0x0, +0x5d ; branch 0x45ee8
045c00: jeq r1, 0x1, +0x44 ; branch 0x45e28
045c08: mov64 r1, r10
045c10: add64 r1, -0x50
045c18: lddw r2, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
045c28: call 0x5ef9 ; call 0x753f8
045c30: stdw [r10 - 0x3f0], 0x0
045c38: stdw [r10 - 0x3f8], 0x1
045c40: stdw [r10 - 0x400], 0x0
045c48: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
045c58: stxdw [r10 - 0x358], r1
045c60: mov64 r1, r10
045c68: add64 r1, -0x400
045c70: stxdw [r10 - 0x360], r1
045c78: stb [r10 - 0x348], 0x3
045c80: stdw [r10 - 0x350], 0x20
045c88: stdw [r10 - 0x370], 0x0
045c90: stdw [r10 - 0x380], 0x0
045c98: mov64 r2, r10
045ca0: add64 r2, -0x380
045ca8: lddw r1, 0x11c09c ; rodata b'\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to '
045cb8: call 0x69dc ; call 0x7aba0
045cc0: jeq r0, 0x0, +0x1 ; branch 0x45cd0
045cc8: ja +0x6e9 ; branch 0x49418
045cd0: ldxdw r1, [r10 - 0x3f0]
045cd8: stxdw [r10 - 0x2d8], r1
045ce0: ldxdw r1, [r10 - 0x3f8]
045ce8: stxdw [r10 - 0x2e0], r1
045cf0: ldxdw r1, [r10 - 0x400]
045cf8: stxdw [r10 - 0x2e8], r1
045d00: ldxdw r1, [r10 - 0x50]
045d08: stxdw [r10 - 0x300], r1
045d10: ldxdw r1, [r10 - 0x48]
045d18: stxdw [r10 - 0x2f8], r1
045d20: ldxdw r1, [r10 - 0x40]
045d28: stxdw [r10 - 0x2f0], r1
045d30: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
045d40: stxdw [r10 - 0x318], r1
045d48: stw [r10 - 0x288], 0x178b
045d50: stb [r10 - 0x2d0], 0x2
045d58: stw [r10 - 0x308], 0x346
045d60: stdw [r10 - 0x310], 0x39
045d68: stdw [r10 - 0x320], 0x0
045d70: mov64 r1, r10
045d78: add64 r1, -0x438
045d80: mov64 r2, r10
045d88: add64 r2, -0x320
045d90: call 0x17a44 ; call 0x102fb8
045d98: ldxdw r1, [r10 - 0x438]
045da0: ldxdw r2, [r10 - 0x430]
045da8: stxdw [r8 + 0x8], r2
045db0: stxdw [r8 + 0x0], r1
045db8: ldxdw r1, [r7 + 0x10]
045dc0: ldxdw r2, [r7 + 0x8]
045dc8: ldxdw r3, [r2 + 0x0]
045dd0: add64 r3, -0x1
045dd8: stxdw [r2 + 0x0], r3
045de0: jne r3, 0x0, +0x3 ; branch 0x45e00
045de8: ldxdw r3, [r2 + 0x8]
045df0: add64 r3, -0x1
045df8: stxdw [r2 + 0x8], r3
045e00: ldxdw r2, [r1 + 0x0]
045e08: add64 r2, -0x1
045e10: stxdw [r1 + 0x0], r2
045e18: jeq r2, 0x0, +0x130 ; branch 0x467a0
045e20: ja +0x762 ; branch 0x49938
045e28: stxdw [r10 - 0x5c0], r3
045e30: stxdw [r10 - 0x5b8], r2
045e38: stxdw [r10 - 0x578], r9
045e40: stxdw [r10 - 0x550], r8
045e48: stxdw [r10 - 0x548], r7
045e50: ldxb r2, [r6 + 0x1]
045e58: mov64 r1, 0x20
045e60: jeq r2, 0x0, +0x1 ; branch 0x45e70
045e68: mov64 r1, 0x18
045e70: ldxdw r0, [r6 + 0x8]
045e78: mov64 r2, r0
045e80: add64 r2, r1
045e88: ldxdw r1, [r2 + 0x0]
045e90: ldxdw r9, [r1 + 0x20]
045e98: ldxdw r1, [r9 + 0x8]
045ea0: ldxdw r3, [r1 + 0x0]
045ea8: add64 r3, 0x1
045eb0: mov64 r4, 0x1
045eb8: jeq r3, 0x0, +0x1 ; branch 0x45ec8
045ec0: mov64 r4, 0x0
045ec8: ldxdw r2, [r9 + 0x0]
045ed0: stxdw [r1 + 0x0], r3
045ed8: jne r4, 0x1, +0x13 ; branch 0x45f78
045ee0: ja +0x11 ; branch 0x45f70
045ee8: stxdw [r10 - 0x5c0], r3
045ef0: stxdw [r10 - 0x5b8], r2
045ef8: stxdw [r10 - 0x578], r9
045f00: stxdw [r10 - 0x550], r8
045f08: stxdw [r10 - 0x548], r7
045f10: ldxdw r0, [r10 - 0x558]
045f18: ldxdw r1, [r0 + 0x8]
045f20: ldxdw r9, [r1 + 0x20]
045f28: ldxdw r1, [r9 + 0x8]
045f30: ldxdw r3, [r1 + 0x0]
045f38: add64 r3, 0x1
045f40: mov64 r4, 0x1
045f48: jeq r3, 0x0, +0x1 ; branch 0x45f58
045f50: mov64 r4, 0x0
045f58: ldxdw r2, [r9 + 0x0]
045f60: stxdw [r1 + 0x0], r3
045f68: jne r4, 0x1, +0xa ; branch 0x45fc0
045f70: call -0x1
045f78: ldxdw r3, [r9 + 0x10]
045f80: ldxdw r4, [r3 + 0x0]
045f88: add64 r4, 0x1
045f90: mov64 r5, 0x1
045f98: jeq r4, 0x0, +0x1 ; branch 0x45fa8
045fa0: mov64 r5, 0x0
045fa8: stxdw [r3 + 0x0], r4
045fb0: jne r5, 0x1, +0xa ; branch 0x46008
045fb8: ja -0xa ; branch 0x45f70
045fc0: ldxdw r3, [r9 + 0x10]
045fc8: ldxdw r4, [r3 + 0x0]
045fd0: add64 r4, 0x1
045fd8: mov64 r5, 0x1
045fe0: jeq r4, 0x0, +0x1 ; branch 0x45ff0
045fe8: mov64 r5, 0x0
045ff0: stxdw [r3 + 0x0], r4
045ff8: jne r5, 0x1, +0x18 ; branch 0x460c0
046000: ja -0x13 ; branch 0x45f70
046008: stxdw [r10 - 0x568], r0
046010: ldxdw r4, [r0 + 0x10]
046018: ldxdw r4, [r4 + 0x0]
046020: ldxdw r5, [r4 + 0x8]
046028: stxdw [r10 - 0x540], r5
046030: ldxdw r5, [r5 + 0x0]
046038: add64 r5, 0x1
046040: mov64 r7, 0x1
046048: jeq r5, 0x0, +0x1 ; branch 0x46058
046050: mov64 r7, 0x0
046058: ldxb r0, [r9 + 0x2a]
046060: stxdw [r10 - 0x518], r0
046068: ldxb r0, [r9 + 0x29]
046070: stxdw [r10 - 0x520], r0
046078: ldxb r6, [r9 + 0x28]
046080: ldxdw r8, [r9 + 0x20]
046088: ldxdw r9, [r9 + 0x18]
046090: ldxdw r0, [r4 + 0x0]
046098: stxdw [r10 - 0x580], r0
0460a0: ldxdw r0, [r10 - 0x540]
0460a8: stxdw [r0 + 0x0], r5
0460b0: jne r7, 0x1, +0x16 ; branch 0x46168
0460b8: ja -0x2a ; branch 0x45f70
0460c0: ldxdw r4, [r0 + 0x0]
0460c8: ldxdw r5, [r4 + 0x8]
0460d0: stxdw [r10 - 0x540], r5
0460d8: ldxdw r5, [r5 + 0x0]
0460e0: add64 r5, 0x1
0460e8: mov64 r7, 0x1
0460f0: jeq r5, 0x0, +0x1 ; branch 0x46100
0460f8: mov64 r7, 0x0
046100: ldxb r0, [r9 + 0x2a]
046108: stxdw [r10 - 0x518], r0
046110: ldxb r0, [r9 + 0x29]
046118: stxdw [r10 - 0x520], r0
046120: ldxb r6, [r9 + 0x28]
046128: ldxdw r8, [r9 + 0x20]
046130: ldxdw r9, [r9 + 0x18]
046138: ldxdw r0, [r4 + 0x0]
046140: stxdw [r10 - 0x580], r0
046148: ldxdw r0, [r10 - 0x540]
046150: stxdw [r0 + 0x0], r5
046158: jne r7, 0x1, +0xf ; branch 0x461d8
046160: ja -0x3f ; branch 0x45f70
046168: ldxdw r5, [r4 + 0x10]
046170: stxdw [r10 - 0x560], r5
046178: ldxdw r7, [r5 + 0x0]
046180: add64 r7, 0x1
046188: mov64 r5, 0x1
046190: jeq r7, 0x0, +0x1 ; branch 0x461a0
046198: mov64 r5, 0x0
0461a0: ldxdw r0, [r10 - 0x568]
0461a8: add64 r0, 0x10
0461b0: stxdw [r10 - 0x568], r0
0461b8: ldxdw r0, [r10 - 0x560]
0461c0: stxdw [r0 + 0x0], r7
0461c8: jne r5, 0x1, +0xd ; branch 0x46238
0461d0: ja -0x4d ; branch 0x45f70
0461d8: ldxdw r5, [r4 + 0x10]
0461e0: ldxdw r7, [r5 + 0x0]
0461e8: add64 r7, 0x1
0461f0: stxdw [r10 - 0x560], r5
0461f8: stxdw [r5 + 0x0], r7
046200: mov64 r5, 0x0
046208: stxdw [r10 - 0x568], r5
046210: mov64 r5, 0x1
046218: jeq r7, 0x0, +0x1 ; branch 0x46228
046220: mov64 r5, 0x0
046228: jne r5, 0x1, +0x1 ; branch 0x46238
046230: ja -0x59 ; branch 0x45f70
046238: ldxdw r5, [r4 + 0x18]
046240: stxdw [r10 - 0x588], r5
046248: ldxdw r5, [r4 + 0x20]
046250: stxdw [r10 - 0x590], r5
046258: ldxb r5, [r4 + 0x28]
046260: stxdw [r10 - 0x598], r5
046268: ldxb r5, [r4 + 0x29]
046270: stxdw [r10 - 0x5a0], r5
046278: ldxb r4, [r4 + 0x2a]
046280: stxdw [r10 - 0x5a8], r4
046288: ldxdw r4, [r10 - 0x518]
046290: stxb [r10 - 0x3d6], r4
046298: ldxdw r4, [r10 - 0x520]
0462a0: stxb [r10 - 0x3d7], r4
0462a8: stxb [r10 - 0x3d8], r6
0462b0: stxdw [r10 - 0x3e0], r8
0462b8: stxdw [r10 - 0x3e8], r9
0462c0: stxdw [r10 - 0x3f0], r3
0462c8: stxdw [r10 - 0x3f8], r1
0462d0: stxdw [r10 - 0x400], r2
0462d8: ldxdw r1, [r2 + 0x18]
0462e0: stxdw [r10 - 0x368], r1
0462e8: ldxdw r1, [r2 + 0x10]
0462f0: stxdw [r10 - 0x370], r1
0462f8: ldxdw r1, [r2 + 0x8]
046300: stxdw [r10 - 0x378], r1
046308: ldxdw r1, [r2 + 0x0]
046310: stxdw [r10 - 0x380], r1
046318: ldxdw r7, [r10 - 0x548]
046320: ldxdw r1, [r7 + 0x0]
046328: ldxdw r2, [r1 + 0x18]
046330: stxdw [r10 - 0x308], r2
046338: ldxdw r2, [r1 + 0x10]
046340: stxdw [r10 - 0x310], r2
046348: ldxdw r2, [r1 + 0x8]
046350: stxdw [r10 - 0x318], r2
046358: ldxdw r1, [r1 + 0x0]
046360: stxdw [r10 - 0x320], r1
046368: mov64 r1, r10
046370: add64 r1, -0x380
046378: mov64 r2, r10
046380: add64 r2, -0x320
046388: mov64 r3, 0x20
046390: call 0x1a6a9 ; call 0x1198e0
046398: mov64 r9, r0
0463a0: mov64 r1, r10
0463a8: add64 r1, -0x320
0463b0: mov64 r2, r10
0463b8: add64 r2, -0x400
0463c0: call 0x185b8 ; call 0x109188
0463c8: ldxdw r6, [r10 - 0x310]
0463d0: ldxdw r1, [r10 - 0x318]
0463d8: ldxdw r2, [r10 - 0x320]
0463e0: lddw r3, -0x7fffffffffffffe6
0463f0: jne r2, r3, +0x11 ; branch 0x46480
0463f8: ldxdw r2, [r1 + 0x0]
046400: ldxdw r1, [r1 + 0x8]
046408: stxdw [r10 - 0x378], r1
046410: stxdw [r10 - 0x380], r2
046418: mov64 r1, r10
046420: add64 r1, -0x320
046428: mov64 r2, r10
046430: add64 r2, -0x380
046438: call 0x1629b ; call 0xf7918
046440: ldxw r1, [r10 - 0x298]
046448: ldxdw r8, [r10 - 0x550]
046450: jeq r1, 0x2, +0x35 ; branch 0x46600
046458: ldxdw r2, [r10 - 0x2e0]
046460: ldxdw r1, [r6 + 0x0]
046468: add64 r1, -0x1
046470: stxdw [r6 + 0x0], r1
046478: ja +0xd ; branch 0x464e8
046480: stxdw [r10 - 0x310], r6
046488: stxdw [r10 - 0x318], r1
046490: stxdw [r10 - 0x320], r2
046498: mov64 r1, r10
0464a0: add64 r1, -0x448
0464a8: mov64 r2, r10
0464b0: add64 r2, -0x320
0464b8: call 0x17970 ; call 0x103040
0464c0: ldxdw r2, [r10 - 0x440]
0464c8: ldxdw r1, [r10 - 0x448]
0464d0: mov64 r4, r2
0464d8: ldxdw r8, [r10 - 0x550]
0464e0: jne r1, 0x2, +0x28 ; branch 0x46628
0464e8: mov64 r1, r9
0464f0: lsh64 r1, 0x20
0464f8: rsh64 r1, 0x20
046500: mov64 r4, r2
046508: stxdw [r10 - 0x5b0], r9
046510: jeq r1, 0x0, +0x5f ; branch 0x46810
046518: mov64 r9, r2
046520: mov64 r1, r10
046528: add64 r1, -0x320
046530: mov64 r2, r7
046538: call 0x18589 ; call 0x109188
046540: ldxdw r6, [r10 - 0x310]
046548: ldxdw r1, [r10 - 0x318]
046550: ldxdw r2, [r10 - 0x320]
046558: lddw r3, -0x7fffffffffffffe6
046568: jne r2, r3, +0x47 ; branch 0x467a8
046570: ldxdw r2, [r1 + 0x0]
046578: ldxdw r1, [r1 + 0x8]
046580: stxdw [r10 - 0x378], r1
046588: stxdw [r10 - 0x380], r2
046590: mov64 r1, r10
046598: add64 r1, -0x320
0465a0: mov64 r2, r10
0465a8: add64 r2, -0x380
0465b0: call 0x1626c ; call 0xf7918
0465b8: ldxw r1, [r10 - 0x298]
0465c0: jeq r1, 0x2, +0x7 ; branch 0x46600
0465c8: ldxdw r4, [r10 - 0x2e0]
0465d0: ldxdw r1, [r6 + 0x0]
0465d8: add64 r1, -0x1
0465e0: stxdw [r6 + 0x0], r1
0465e8: mov64 r2, r9
0465f0: ldxdw r9, [r10 - 0x5b0]
0465f8: ja +0x42 ; branch 0x46810
046600: ldxdw r4, [r10 - 0x318]
046608: ldxdw r1, [r10 - 0x320]
046610: ldxdw r2, [r6 + 0x0]
046618: add64 r2, -0x1
046620: stxdw [r6 + 0x0], r2
046628: stxdw [r8 + 0x8], r4
046630: stxdw [r8 + 0x0], r1
046638: ldxdw r2, [r10 - 0x540]
046640: ldxdw r1, [r2 + 0x0]
046648: add64 r1, -0x1
046650: stxdw [r2 + 0x0], r1
046658: jne r1, 0x0, +0x3 ; branch 0x46678
046660: ldxdw r1, [r2 + 0x8]
046668: add64 r1, -0x1
046670: stxdw [r2 + 0x8], r1
046678: ldxdw r2, [r10 - 0x560]
046680: ldxdw r1, [r2 + 0x0]
046688: add64 r1, -0x1
046690: stxdw [r2 + 0x0], r1
046698: jne r1, 0x0, +0x3 ; branch 0x466b8
0466a0: ldxdw r1, [r2 + 0x8]
0466a8: add64 r1, -0x1
0466b0: stxdw [r2 + 0x8], r1
0466b8: ldxdw r1, [r10 - 0x3f0]
0466c0: ldxdw r2, [r10 - 0x3f8]
0466c8: ldxdw r3, [r2 + 0x0]
0466d0: add64 r3, -0x1
0466d8: stxdw [r2 + 0x0], r3
0466e0: jne r3, 0x0, +0x3 ; branch 0x46700
0466e8: ldxdw r3, [r2 + 0x8]
0466f0: add64 r3, -0x1
0466f8: stxdw [r2 + 0x8], r3
046700: ldxdw r2, [r1 + 0x0]
046708: add64 r2, -0x1
046710: stxdw [r1 + 0x0], r2
046718: jne r2, 0x0, +0x3 ; branch 0x46738
046720: ldxdw r2, [r1 + 0x8]
046728: add64 r2, -0x1
046730: stxdw [r1 + 0x8], r2
046738: ldxdw r1, [r7 + 0x10]
046740: ldxdw r2, [r7 + 0x8]
046748: ldxdw r3, [r2 + 0x0]
046750: add64 r3, -0x1
046758: stxdw [r2 + 0x0], r3
046760: jne r3, 0x0, +0x3 ; branch 0x46780
046768: ldxdw r3, [r2 + 0x8]
046770: add64 r3, -0x1
046778: stxdw [r2 + 0x8], r3
046780: ldxdw r2, [r1 + 0x0]
046788: add64 r2, -0x1
046790: stxdw [r1 + 0x0], r2
046798: jne r2, 0x0, +0x633 ; branch 0x49938
0467a0: ja +0x62f ; branch 0x49920
0467a8: stxdw [r10 - 0x310], r6
0467b0: stxdw [r10 - 0x318], r1
0467b8: stxdw [r10 - 0x320], r2
0467c0: mov64 r1, r10
0467c8: add64 r1, -0x458
0467d0: mov64 r2, r10
0467d8: add64 r2, -0x320
0467e0: call 0x1790b ; call 0x103040
0467e8: ldxdw r4, [r10 - 0x450]
0467f0: ldxdw r1, [r10 - 0x458]
0467f8: mov64 r2, r9
046800: ldxdw r9, [r10 - 0x5b0]
046808: jne r1, 0x2, -0x3d ; branch 0x46628
046810: stxdw [r10 - 0x908], r2
046818: ldxdw r5, [r10 - 0x558]
046820: ldxdw r2, [r5 + 0x60]
046828: ldxdw r0, [r2 + 0x8]
046830: ldxdw r1, [r0 + 0x0]
046838: add64 r1, 0x1
046840: mov64 r3, 0x1
046848: jeq r1, 0x0, +0x1 ; branch 0x46858
046850: mov64 r3, 0x0
046858: ldxdw r6, [r2 + 0x0]
046860: stxdw [r0 + 0x0], r1
046868: jne r3, 0x1, +0x1 ; branch 0x46878
046870: ja -0x121 ; branch 0x45f70
046878: ldxdw r9, [r2 + 0x10]
046880: ldxdw r1, [r9 + 0x0]
046888: add64 r1, 0x1
046890: mov64 r3, 0x1
046898: jeq r1, 0x0, +0x1 ; branch 0x468a8
0468a0: mov64 r3, 0x0
0468a8: stxdw [r10 - 0x910], r4
0468b0: stxdw [r9 + 0x0], r1
0468b8: jne r3, 0x1, +0x1 ; branch 0x468c8
0468c0: ja -0x12b ; branch 0x45f70
0468c8: stxdw [r10 - 0x600], r6
0468d0: ldxdw r1, [r5 + 0x68]
0468d8: ldxdw r3, [r1 + 0x8]
0468e0: stxdw [r10 - 0x5c8], r3
0468e8: ldxdw r3, [r3 + 0x0]
0468f0: add64 r3, 0x1
0468f8: mov64 r4, 0x1
046900: jeq r3, 0x0, +0x1 ; branch 0x46910
046908: mov64 r4, 0x0
046910: ldxb r6, [r2 + 0x2a]
046918: stxdw [r10 - 0x680], r6
046920: ldxb r6, [r2 + 0x29]
046928: stxdw [r10 - 0x678], r6
046930: ldxb r6, [r2 + 0x28]
046938: stxdw [r10 - 0x670], r6
046940: ldxdw r6, [r2 + 0x20]
046948: stxdw [r10 - 0x668], r6
046950: ldxdw r2, [r2 + 0x18]
046958: stxdw [r10 - 0x660], r2
046960: ldxdw r6, [r1 + 0x0]
046968: ldxdw r2, [r10 - 0x5c8]
046970: stxdw [r2 + 0x0], r3
046978: jne r4, 0x1, +0x1 ; branch 0x46988
046980: ja -0x143 ; branch 0x45f70
046988: ldxdw r4, [r1 + 0x10]
046990: ldxdw r2, [r4 + 0x0]
046998: add64 r2, 0x1
0469a0: mov64 r3, 0x1
0469a8: jeq r2, 0x0, +0x1 ; branch 0x469b8
0469b0: mov64 r3, 0x0
0469b8: stxdw [r10 - 0x688], r4
0469c0: stxdw [r4 + 0x0], r2
0469c8: jne r3, 0x1, +0x1 ; branch 0x469d8
0469d0: ja -0x14d ; branch 0x45f70
0469d8: stxdw [r10 - 0x610], r6
0469e0: ldxdw r2, [r5 + 0x18]
0469e8: ldxdw r2, [r2 + 0x0]
0469f0: ldxdw r3, [r2 + 0x8]
0469f8: stxdw [r10 - 0x5d0], r3
046a00: ldxdw r3, [r3 + 0x0]
046a08: add64 r3, 0x1
046a10: mov64 r4, 0x1
046a18: jeq r3, 0x0, +0x1 ; branch 0x46a28
046a20: mov64 r4, 0x0
046a28: ldxb r6, [r1 + 0x2a]
046a30: stxdw [r10 - 0x6b0], r6
046a38: ldxb r6, [r1 + 0x29]
046a40: stxdw [r10 - 0x6a8], r6
046a48: ldxb r6, [r1 + 0x28]
046a50: stxdw [r10 - 0x6a0], r6
046a58: ldxdw r6, [r1 + 0x20]
046a60: stxdw [r10 - 0x698], r6
046a68: ldxdw r1, [r1 + 0x18]
046a70: stxdw [r10 - 0x690], r1
046a78: ldxdw r6, [r2 + 0x0]
046a80: ldxdw r1, [r10 - 0x5d0]
046a88: stxdw [r1 + 0x0], r3
046a90: jne r4, 0x1, +0x1 ; branch 0x46aa0
046a98: ja -0x166 ; branch 0x45f70
046aa0: ldxdw r4, [r2 + 0x10]
046aa8: ldxdw r1, [r4 + 0x0]
046ab0: add64 r1, 0x1
046ab8: mov64 r3, 0x1
046ac0: jeq r1, 0x0, +0x1 ; branch 0x46ad0
046ac8: mov64 r3, 0x0
046ad0: stxdw [r10 - 0x6b8], r4
046ad8: stxdw [r4 + 0x0], r1
046ae0: jne r3, 0x1, +0x1 ; branch 0x46af0
046ae8: ja -0x170 ; branch 0x45f70
046af0: stxdw [r10 - 0x618], r6
046af8: ldxdw r1, [r5 + 0x0]
046b00: ldxdw r3, [r1 + 0x8]
046b08: stxdw [r10 - 0x5d8], r3
046b10: ldxdw r3, [r3 + 0x0]
046b18: add64 r3, 0x1
046b20: mov64 r4, 0x1
046b28: jeq r3, 0x0, +0x1 ; branch 0x46b38
046b30: mov64 r4, 0x0
046b38: ldxb r6, [r2 + 0x2a]
046b40: stxdw [r10 - 0x6e0], r6
046b48: ldxb r6, [r2 + 0x29]
046b50: stxdw [r10 - 0x6d8], r6
046b58: ldxb r6, [r2 + 0x28]
046b60: stxdw [r10 - 0x6d0], r6
046b68: ldxdw r6, [r2 + 0x20]
046b70: stxdw [r10 - 0x6c8], r6
046b78: ldxdw r2, [r2 + 0x18]
046b80: stxdw [r10 - 0x6c0], r2
046b88: ldxdw r6, [r1 + 0x0]
046b90: ldxdw r2, [r10 - 0x5d8]
046b98: stxdw [r2 + 0x0], r3
046ba0: jne r4, 0x1, +0x1 ; branch 0x46bb0
046ba8: ja -0x188 ; branch 0x45f70
046bb0: ldxdw r4, [r1 + 0x10]
046bb8: ldxdw r2, [r4 + 0x0]
046bc0: add64 r2, 0x1
046bc8: mov64 r3, 0x1
046bd0: jeq r2, 0x0, +0x1 ; branch 0x46be0
046bd8: mov64 r3, 0x0
046be0: stxdw [r4 + 0x0], r2
046be8: jne r3, 0x1, +0x1 ; branch 0x46bf8
046bf0: ja -0x191 ; branch 0x45f70
046bf8: stxdw [r10 - 0x628], r6
046c00: ldxdw r2, [r10 - 0x3f8]
046c08: stxdw [r10 - 0x5e0], r2
046c10: ldxdw r2, [r2 + 0x0]
046c18: add64 r2, 0x1
046c20: mov64 r3, 0x1
046c28: jeq r2, 0x0, +0x1 ; branch 0x46c38
046c30: mov64 r3, 0x0
046c38: ldxb r6, [r1 + 0x2a]
046c40: stxdw [r10 - 0x708], r6
046c48: ldxb r6, [r1 + 0x29]
046c50: stxdw [r10 - 0x700], r6
046c58: ldxb r6, [r1 + 0x28]
046c60: stxdw [r10 - 0x6f8], r6
046c68: ldxdw r6, [r1 + 0x20]
046c70: stxdw [r10 - 0x6f0], r6
046c78: ldxdw r1, [r1 + 0x18]
046c80: stxdw [r10 - 0x6e8], r1
046c88: ldxdw r6, [r10 - 0x400]
046c90: ldxdw r1, [r10 - 0x5e0]
046c98: stxdw [r1 + 0x0], r2
046ca0: jne r3, 0x1, +0x1 ; branch 0x46cb0
046ca8: ja -0x1a8 ; branch 0x45f70
046cb0: ldxdw r3, [r10 - 0x3f0]
046cb8: ldxdw r1, [r3 + 0x0]
046cc0: add64 r1, 0x1
046cc8: mov64 r2, 0x1
046cd0: jeq r1, 0x0, +0x1 ; branch 0x46ce0
046cd8: mov64 r2, 0x0
046ce0: stxdw [r3 + 0x0], r1
046ce8: jne r2, 0x1, +0x1 ; branch 0x46cf8
046cf0: ja -0x1b1 ; branch 0x45f70
046cf8: stxdw [r10 - 0x638], r6
046d00: ldxdw r1, [r7 + 0x8]
046d08: stxdw [r10 - 0x5e8], r1
046d10: ldxdw r1, [r1 + 0x0]
046d18: add64 r1, 0x1
046d20: mov64 r2, 0x1
046d28: jeq r1, 0x0, +0x1 ; branch 0x46d38
046d30: mov64 r2, 0x0
046d38: ldxdw r6, [r7 + 0x0]
046d40: stxdw [r10 - 0x738], r6
046d48: ldxb r6, [r10 - 0x3d6]
046d50: stxdw [r10 - 0x730], r6
046d58: ldxb r6, [r10 - 0x3d7]
046d60: stxdw [r10 - 0x728], r6
046d68: ldxb r6, [r10 - 0x3d8]
046d70: stxdw [r10 - 0x720], r6
046d78: ldxdw r6, [r10 - 0x3e0]
046d80: stxdw [r10 - 0x718], r6
046d88: ldxdw r6, [r10 - 0x3e8]
046d90: stxdw [r10 - 0x710], r6
046d98: ldxdw r6, [r10 - 0x5e8]
046da0: stxdw [r6 + 0x0], r1
046da8: jne r2, 0x1, +0x1 ; branch 0x46db8
046db0: ja -0x1c9 ; branch 0x45f70
046db8: ldxdw r6, [r7 + 0x10]
046dc0: ldxdw r1, [r6 + 0x0]
046dc8: add64 r1, 0x1
046dd0: mov64 r2, 0x1
046dd8: jeq r1, 0x0, +0x1 ; branch 0x46de8
046de0: mov64 r2, 0x0
046de8: stxdw [r10 - 0x630], r0
046df0: stxdw [r10 - 0x740], r3
046df8: stxdw [r6 + 0x0], r1
046e00: jne r2, 0x1, +0x1 ; branch 0x46e10
046e08: ja -0x1d4 ; branch 0x45f70
046e10: mov64 r0, r8
046e18: ldxdw r1, [r5 + 0x30]
046e20: ldxdw r2, [r1 + 0x8]
046e28: stxdw [r10 - 0x5f0], r2
046e30: ldxdw r2, [r2 + 0x0]
046e38: add64 r2, 0x1
046e40: mov64 r3, 0x1
046e48: jeq r2, 0x0, +0x1 ; branch 0x46e58
046e50: mov64 r3, 0x0
046e58: ldxb r8, [r7 + 0x2a]
046e60: stxdw [r10 - 0x768], r8
046e68: ldxb r8, [r7 + 0x29]
046e70: stxdw [r10 - 0x760], r8
046e78: ldxb r8, [r7 + 0x28]
046e80: stxdw [r10 - 0x758], r8
046e88: ldxdw r8, [r7 + 0x20]
046e90: stxdw [r10 - 0x750], r8
046e98: ldxdw r8, [r7 + 0x18]
046ea0: stxdw [r10 - 0x748], r8
046ea8: ldxdw r8, [r1 + 0x0]
046eb0: stxdw [r10 - 0x770], r8
046eb8: ldxdw r8, [r10 - 0x5f0]
046ec0: stxdw [r8 + 0x0], r2
046ec8: jne r3, 0x1, +0x1 ; branch 0x46ed8
046ed0: ja -0x1ed ; branch 0x45f70
046ed8: ldxdw r2, [r1 + 0x10]
046ee0: stxdw [r10 - 0x5f8], r2
046ee8: ldxdw r2, [r2 + 0x0]
046ef0: add64 r2, 0x1
046ef8: mov64 r3, 0x1
046f00: mov64 r8, r0
046f08: jeq r2, 0x0, +0x1 ; branch 0x46f18
046f10: mov64 r3, 0x0
046f18: stxdw [r10 - 0x778], r4
046f20: ldxdw r4, [r10 - 0x5f8]
046f28: stxdw [r4 + 0x0], r2
046f30: jne r3, 0x1, +0x1 ; branch 0x46f40
046f38: ja -0x1fa ; branch 0x45f70
046f40: ldxdw r2, [r5 + 0x38]
046f48: ldxdw r3, [r2 + 0x8]
046f50: stxdw [r10 - 0x608], r3
046f58: ldxdw r3, [r3 + 0x0]
046f60: add64 r3, 0x1
046f68: mov64 r4, 0x1
046f70: jeq r3, 0x0, +0x1 ; branch 0x46f80
046f78: mov64 r4, 0x0
046f80: ldxb r0, [r1 + 0x2a]
046f88: stxdw [r10 - 0x7a0], r0
046f90: ldxb r0, [r1 + 0x29]
046f98: stxdw [r10 - 0x798], r0
046fa0: ldxb r0, [r1 + 0x28]
046fa8: stxdw [r10 - 0x790], r0
046fb0: ldxdw r0, [r1 + 0x20]
046fb8: stxdw [r10 - 0x788], r0
046fc0: ldxdw r1, [r1 + 0x18]
046fc8: stxdw [r10 - 0x780], r1
046fd0: ldxdw r1, [r2 + 0x0]
046fd8: stxdw [r10 - 0x7a8], r1
046fe0: ldxdw r1, [r10 - 0x608]
046fe8: stxdw [r1 + 0x0], r3
046ff0: jne r4, 0x1, +0x1 ; branch 0x47000
046ff8: ja -0x212 ; branch 0x45f70
047000: ldxdw r4, [r2 + 0x10]
047008: ldxdw r1, [r4 + 0x0]
047010: add64 r1, 0x1
047018: mov64 r3, 0x1
047020: jeq r1, 0x0, +0x1 ; branch 0x47030
047028: mov64 r3, 0x0
047030: stxdw [r10 - 0x7b0], r4
047038: stxdw [r4 + 0x0], r1
047040: jne r3, 0x1, +0x1 ; branch 0x47050
047048: ja -0x21c ; branch 0x45f70
047050: ldxdw r1, [r5 + 0x40]
047058: ldxdw r3, [r1 + 0x8]
047060: stxdw [r10 - 0x620], r3
047068: ldxdw r3, [r3 + 0x0]
047070: add64 r3, 0x1
047078: mov64 r4, 0x1
047080: jeq r3, 0x0, +0x1 ; branch 0x47090
047088: mov64 r4, 0x0
047090: ldxb r0, [r2 + 0x2a]
047098: stxdw [r10 - 0x7d8], r0
0470a0: ldxb r0, [r2 + 0x29]
0470a8: stxdw [r10 - 0x7d0], r0
0470b0: ldxb r0, [r2 + 0x28]
0470b8: stxdw [r10 - 0x7c8], r0
0470c0: ldxdw r0, [r2 + 0x20]
0470c8: stxdw [r10 - 0x7c0], r0
0470d0: ldxdw r2, [r2 + 0x18]
0470d8: stxdw [r10 - 0x7b8], r2
0470e0: ldxdw r2, [r1 + 0x0]
0470e8: stxdw [r10 - 0x7e0], r2
0470f0: ldxdw r2, [r10 - 0x620]
0470f8: stxdw [r2 + 0x0], r3
047100: jne r4, 0x1, +0x1 ; branch 0x47110
047108: ja -0x234 ; branch 0x45f70
047110: stxdw [r10 - 0x648], r6
047118: ldxdw r4, [r1 + 0x10]
047120: ldxdw r2, [r4 + 0x0]
047128: add64 r2, 0x1
047130: mov64 r3, 0x1
047138: jeq r2, 0x0, +0x1 ; branch 0x47148
047140: mov64 r3, 0x0
047148: mov64 r6, r9
047150: stxdw [r10 - 0x7e8], r4
047158: stxdw [r4 + 0x0], r2
047160: jne r3, 0x1, +0x1 ; branch 0x47170
047168: ja -0x240 ; branch 0x45f70
047170: mov64 r9, r8
047178: ldxdw r2, [r5 + 0x48]
047180: ldxdw r0, [r2 + 0x8]
047188: ldxdw r3, [r0 + 0x0]
047190: add64 r3, 0x1
047198: mov64 r4, 0x1
0471a0: jeq r3, 0x0, +0x1 ; branch 0x471b0
0471a8: mov64 r4, 0x0
0471b0: ldxb r8, [r1 + 0x2a]
0471b8: stxdw [r10 - 0x810], r8
0471c0: ldxb r8, [r1 + 0x29]
0471c8: stxdw [r10 - 0x808], r8
0471d0: ldxb r8, [r1 + 0x28]
0471d8: stxdw [r10 - 0x800], r8
0471e0: ldxdw r8, [r1 + 0x20]
0471e8: stxdw [r10 - 0x7f8], r8
0471f0: ldxdw r1, [r1 + 0x18]
0471f8: stxdw [r10 - 0x7f0], r1
047200: ldxdw r1, [r2 + 0x0]
047208: stxdw [r10 - 0x818], r1
047210: stxdw [r0 + 0x0], r3
047218: jne r4, 0x1, +0x1 ; branch 0x47228
047220: ja -0x257 ; branch 0x45f70
047228: ldxdw r4, [r2 + 0x10]
047230: ldxdw r1, [r4 + 0x0]
047238: add64 r1, 0x1
047240: mov64 r3, 0x1
047248: jeq r1, 0x0, +0x1 ; branch 0x47258
047250: mov64 r3, 0x0
047258: stxdw [r10 - 0x820], r4
047260: stxdw [r4 + 0x0], r1
047268: jne r3, 0x1, +0x1 ; branch 0x47278
047270: ja -0x261 ; branch 0x45f70
047278: ldxdw r1, [r5 + 0x70]
047280: ldxdw r3, [r1 + 0x8]
047288: stxdw [r10 - 0x640], r3
047290: ldxdw r3, [r3 + 0x0]
047298: add64 r3, 0x1
0472a0: mov64 r4, 0x1
0472a8: jeq r3, 0x0, +0x1 ; branch 0x472b8
0472b0: mov64 r4, 0x0
0472b8: ldxb r8, [r2 + 0x2a]
0472c0: stxdw [r10 - 0x850], r8
0472c8: ldxb r8, [r2 + 0x29]
0472d0: stxdw [r10 - 0x848], r8
0472d8: ldxb r8, [r2 + 0x28]
0472e0: stxdw [r10 - 0x840], r8
0472e8: ldxdw r8, [r2 + 0x20]
0472f0: stxdw [r10 - 0x838], r8
0472f8: ldxdw r2, [r2 + 0x18]
047300: stxdw [r10 - 0x830], r2
047308: ldxdw r2, [r1 + 0x0]
047310: stxdw [r10 - 0x828], r2
047318: ldxdw r2, [r10 - 0x640]
047320: stxdw [r2 + 0x0], r3
047328: jne r4, 0x1, +0x1 ; branch 0x47338
047330: ja -0x279 ; branch 0x45f70
047338: ldxdw r4, [r1 + 0x10]
047340: ldxdw r2, [r4 + 0x0]
047348: add64 r2, 0x1
047350: mov64 r3, 0x1
047358: jeq r2, 0x0, +0x1 ; branch 0x47368
047360: mov64 r3, 0x0
047368: stxdw [r10 - 0x858], r4
047370: stxdw [r4 + 0x0], r2
047378: jne r3, 0x1, +0x1 ; branch 0x47388
047380: ja -0x283 ; branch 0x45f70
047388: stxdw [r10 - 0x890], r0
047390: ldxdw r2, [r5 + 0x58]
047398: ldxdw r3, [r2 + 0x8]
0473a0: stxdw [r10 - 0x650], r3
0473a8: ldxdw r3, [r3 + 0x0]
0473b0: add64 r3, 0x1
0473b8: mov64 r4, 0x1
0473c0: jeq r3, 0x0, +0x1 ; branch 0x473d0
0473c8: mov64 r4, 0x0
0473d0: ldxb r0, [r1 + 0x2a]
0473d8: stxdw [r10 - 0x868], r0
0473e0: ldxb r0, [r1 + 0x29]
0473e8: stxdw [r10 - 0x870], r0
0473f0: ldxb r0, [r1 + 0x28]
0473f8: stxdw [r10 - 0x878], r0
047400: ldxdw r0, [r1 + 0x20]
047408: stxdw [r10 - 0x880], r0
047410: ldxdw r1, [r1 + 0x18]
047418: stxdw [r10 - 0x888], r1
047420: ldxdw r1, [r2 + 0x0]
047428: stxdw [r10 - 0x860], r1
047430: ldxdw r1, [r10 - 0x650]
047438: stxdw [r1 + 0x0], r3
047440: jne r4, 0x1, +0x1 ; branch 0x47450
047448: ja -0x29c ; branch 0x45f70
047450: ldxdw r4, [r2 + 0x10]
047458: ldxdw r1, [r4 + 0x0]
047460: add64 r1, 0x1
047468: mov64 r3, 0x1
047470: ldxdw r0, [r10 - 0x630]
047478: jeq r1, 0x0, +0x1 ; branch 0x47488
047480: mov64 r3, 0x0
047488: stxdw [r10 - 0x898], r4
047490: stxdw [r4 + 0x0], r1
047498: jne r3, 0x1, +0x1 ; branch 0x474a8
0474a0: ja -0x2a7 ; branch 0x45f70
0474a8: ldxdw r1, [r5 + 0x58]
0474b0: ldxdw r3, [r1 + 0x8]
0474b8: stxdw [r10 - 0x658], r3
0474c0: ldxdw r3, [r3 + 0x0]
0474c8: add64 r3, 0x1
0474d0: mov64 r4, 0x1
0474d8: jeq r3, 0x0, +0x1 ; branch 0x474e8
0474e0: mov64 r4, 0x0
0474e8: ldxb r5, [r2 + 0x2a]
0474f0: stxdw [r10 - 0x8a0], r5
0474f8: ldxb r5, [r2 + 0x29]
047500: stxdw [r10 - 0x8a8], r5
047508: ldxb r5, [r2 + 0x28]
047510: stxdw [r10 - 0x8b0], r5
047518: ldxdw r5, [r2 + 0x20]
047520: stxdw [r10 - 0x8b8], r5
047528: ldxdw r2, [r2 + 0x18]
047530: stxdw [r10 - 0x8c0], r2
047538: ldxdw r2, [r1 + 0x0]
047540: stxdw [r10 - 0x8c8], r2
047548: ldxdw r2, [r10 - 0x658]
047550: stxdw [r2 + 0x0], r3
047558: jne r4, 0x1, +0x1 ; branch 0x47568
047560: ja -0x2bf ; branch 0x45f70
047568: ldxdw r2, [r10 - 0x648]
047570: ldxdw r2, [r10 - 0x638]
047578: ldxdw r2, [r10 - 0x628]
047580: ldxdw r2, [r10 - 0x618]
047588: ldxdw r2, [r10 - 0x610]
047590: stxdw [r10 - 0x8d0], r6
047598: ldxdw r2, [r10 - 0x600]
0475a0: ldxdw r5, [r1 + 0x10]
0475a8: ldxdw r2, [r5 + 0x0]
0475b0: add64 r2, 0x1
0475b8: mov64 r3, 0x1
0475c0: jeq r2, 0x0, +0x1 ; branch 0x475d0
0475c8: mov64 r3, 0x0
0475d0: ldxdw r4, [r10 - 0x5b0]
0475d8: stxdw [r10 - 0x550], r9
0475e0: stxdw [r10 - 0x548], r7
0475e8: stxdw [r10 - 0x8d8], r5
0475f0: stxdw [r5 + 0x0], r2
0475f8: jne r3, 0x1, +0x1 ; branch 0x47608
047600: ja -0x2d3 ; branch 0x45f70
047608: mov64 r2, 0x8
047610: stxdw [r10 - 0x528], r2
047618: ldxb r2, [r1 + 0x2a]
047620: stxdw [r10 - 0x900], r2
047628: ldxb r2, [r1 + 0x29]
047630: stxdw [r10 - 0x8f8], r2
047638: ldxb r2, [r1 + 0x28]
047640: stxdw [r10 - 0x8f0], r2
047648: ldxdw r2, [r1 + 0x20]
047650: stxdw [r10 - 0x8e8], r2
047658: ldxdw r1, [r1 + 0x18]
047660: stxdw [r10 - 0x8e0], r1
047668: ldxdw r1, [r10 - 0x538]
047670: ldxdw r2, [r10 - 0x510]
047678: jeq r1, 0x0, +0x56 ; branch 0x47930
047680: mov64 r1, 0x0
047688: ldxdw r6, [r10 - 0x538]
047690: mov64 r3, r6
047698: mul64 r3, 0x30
0476a0: stxdw [r10 - 0x530], r3
0476a8: lddw r3, 0x2aaaaaaaaaaaaaa
0476b8: jgt r6, r3, +0x490 ; branch 0x49b40
0476c0: lddw r1, 0x300000000
0476d0: ldxdw r1, [r1 + 0x0]
0476d8: lddw r4, 0x300008000
0476e8: jeq r1, 0x0, +0x1 ; branch 0x476f8
0476f0: mov64 r4, r1
0476f8: mov64 r1, r4
047700: ldxdw r3, [r10 - 0x530]
047708: sub64 r1, r3
047710: mov64 r3, 0x0
047718: mov64 r5, 0x1
047720: jgt r1, r4, +0x1 ; branch 0x47730
047728: mov64 r5, 0x0
047730: jne r5, 0x0, +0x1 ; branch 0x47740
047738: mov64 r3, r1
047740: mov64 r1, 0x8
047748: and64 r3, -0x8
047750: lddw r4, 0x300000008
047760: jlt r3, r4, +0x47b ; branch 0x49b40
047768: lddw r1, 0x300000000
047778: stxdw [r10 - 0x528], r3
047780: stxdw [r1 + 0x0], r3
047788: mov64 r1, 0x0
047790: ja +0x3 ; branch 0x477b0
047798: stxdw [r9 + 0x0], r7
0477a0: jne r5, 0x1, +0x14 ; branch 0x47848
0477a8: ja -0x308 ; branch 0x45f70
0477b0: ldxdw r3, [r10 - 0x530]
0477b8: jeq r3, r1, +0x2e ; branch 0x47930
0477c0: ldxdw r3, [r2 + 0x8]
0477c8: ldxdw r7, [r3 + 0x0]
0477d0: add64 r7, 0x1
0477d8: mov64 r9, 0x1
0477e0: jeq r7, 0x0, +0x1 ; branch 0x477f0
0477e8: mov64 r9, 0x0
0477f0: ldxdw r0, [r2 + 0x0]
0477f8: stxdw [r3 + 0x0], r7
047800: jne r9, 0x1, +0x1 ; branch 0x47810
047808: ja -0x314 ; branch 0x45f70
047810: ldxdw r9, [r2 + 0x10]
047818: ldxdw r7, [r9 + 0x0]
047820: add64 r7, 0x1
047828: mov64 r5, 0x1
047830: jeq r7, 0x0, -0x14 ; branch 0x47798
047838: mov64 r5, 0x0
047840: ja -0x16 ; branch 0x47798
047848: add64 r6, -0x1
047850: ldxdw r4, [r10 - 0x528]
047858: mov64 r5, r4
047860: add64 r5, r1
047868: mov64 r7, r2
047870: add64 r7, 0x30
047878: ldxdw r8, [r2 + 0x18]
047880: stxdw [r10 - 0x510], r8
047888: ldxdw r8, [r2 + 0x20]
047890: stxdw [r10 - 0x518], r8
047898: ldxb r8, [r2 + 0x28]
0478a0: stxdw [r10 - 0x520], r8
0478a8: ldxb r8, [r2 + 0x29]
0478b0: ldxb r2, [r2 + 0x2a]
0478b8: stxdw [r5 + 0x0], r0
0478c0: add64 r4, r1
0478c8: stxb [r4 + 0x2a], r2
0478d0: stxb [r4 + 0x29], r8
0478d8: ldxdw r2, [r10 - 0x520]
0478e0: stxb [r4 + 0x28], r2
0478e8: ldxdw r2, [r10 - 0x518]
0478f0: stxdw [r4 + 0x20], r2
0478f8: ldxdw r2, [r10 - 0x510]
047900: stxdw [r4 + 0x18], r2
047908: stxdw [r4 + 0x10], r9
047910: stxdw [r4 + 0x8], r3
047918: add64 r1, 0x30
047920: mov64 r2, r7
047928: jne r6, 0x0, -0x30 ; branch 0x477b0
047930: ldxdw r1, [r10 - 0x568]
047938: jne r1, 0x0, +0x142 ; branch 0x48350
047940: ldxw r1, [r10 - 0x38e]
047948: stxw [r10 - 0x2ad], r1
047950: ldxb r1, [r10 - 0x38a]
047958: stxb [r10 - 0x2a9], r1
047960: ldxw r1, [r10 - 0x393]
047968: stxw [r10 - 0x27d], r1
047970: ldxb r1, [r10 - 0x38f]
047978: stxb [r10 - 0x279], r1
047980: ldxw r1, [r10 - 0x398]
047988: stxw [r10 - 0x24d], r1
047990: ldxb r1, [r10 - 0x394]
047998: stxb [r10 - 0x249], r1
0479a0: mov64 r1, r10
0479a8: add64 r1, -0x420
0479b0: stxdw [r10 - 0x380], r1
0479b8: stdw [r10 - 0x378], 0x2
0479c0: ldxb r1, [r10 - 0x399]
0479c8: stxb [r10 - 0x219], r1
0479d0: ldxw r1, [r10 - 0x39d]
0479d8: stxw [r10 - 0x21d], r1
0479e0: ldxb r1, [r10 - 0x39e]
0479e8: stxb [r10 - 0x1e9], r1
0479f0: ldxw r1, [r10 - 0x3a2]
0479f8: stxw [r10 - 0x1ed], r1
047a00: ldxb r1, [r10 - 0x3a3]
047a08: stxb [r10 - 0x1b9], r1
047a10: ldxw r1, [r10 - 0x3a7]
047a18: stxw [r10 - 0x1bd], r1
047a20: ldxb r1, [r10 - 0x3a8]
047a28: stxb [r10 - 0x189], r1
047a30: ldxw r1, [r10 - 0x3ac]
047a38: stxw [r10 - 0x18d], r1
047a40: ldxb r1, [r10 - 0x3ad]
047a48: stxb [r10 - 0x159], r1
047a50: ldxw r1, [r10 - 0x3b1]
047a58: stxw [r10 - 0x15d], r1
047a60: ldxb r1, [r10 - 0x3b2]
047a68: stxb [r10 - 0x129], r1
047a70: ldxw r1, [r10 - 0x3b6]
047a78: stxw [r10 - 0x12d], r1
047a80: ldxb r1, [r10 - 0x3b7]
047a88: stxb [r10 - 0xf9], r1
047a90: ldxw r1, [r10 - 0x3bb]
047a98: stxw [r10 - 0xfd], r1
047aa0: ldxb r1, [r10 - 0x3bc]
047aa8: stxb [r10 - 0x4c], r1
047ab0: ldxw r1, [r10 - 0x3c0]
047ab8: stxw [r10 - 0x50], r1
047ac0: ldxb r1, [r10 - 0x3c1]
047ac8: stxb [r10 - 0x14], r1
047ad0: ldxw r1, [r10 - 0x3c5]
047ad8: stxw [r10 - 0x18], r1
047ae0: ldxb r1, [r10 - 0x3c6]
047ae8: stxb [r10 - 0x2c], r1
047af0: ldxw r1, [r10 - 0x3ca]
047af8: stxw [r10 - 0x30], r1
047b00: ldxb r1, [r10 - 0x385]
047b08: stxb [r10 - 0x2d9], r1
047b10: ldxw r1, [r10 - 0x389]
047b18: stxw [r10 - 0x2dd], r1
047b20: ldxdw r1, [r10 - 0x850]
047b28: stxb [r10 - 0xce], r1
047b30: ldxdw r1, [r10 - 0x848]
047b38: stxb [r10 - 0xcf], r1
047b40: ldxdw r1, [r10 - 0x840]
047b48: stxb [r10 - 0xd0], r1
047b50: ldxdw r1, [r10 - 0x838]
047b58: stxdw [r10 - 0xd8], r1
047b60: ldxdw r1, [r10 - 0x830]
047b68: stxdw [r10 - 0xe0], r1
047b70: ldxdw r1, [r10 - 0x820]
047b78: stxdw [r10 - 0xe8], r1
047b80: ldxdw r1, [r10 - 0x890]
047b88: stxdw [r10 - 0xf0], r1
047b90: ldxdw r1, [r10 - 0x818]
047b98: stxdw [r10 - 0xf8], r1
047ba0: ldxdw r1, [r10 - 0x810]
047ba8: stxb [r10 - 0xfe], r1
047bb0: ldxdw r1, [r10 - 0x808]
047bb8: stxb [r10 - 0xff], r1
047bc0: ldxdw r1, [r10 - 0x800]
047bc8: stxb [r10 - 0x100], r1
047bd0: ldxdw r1, [r10 - 0x7f8]
047bd8: stxdw [r10 - 0x108], r1
047be0: ldxdw r1, [r10 - 0x7f0]
047be8: stxdw [r10 - 0x110], r1
047bf0: ldxdw r1, [r10 - 0x7e8]
047bf8: stxdw [r10 - 0x118], r1
047c00: ldxdw r1, [r10 - 0x620]
047c08: stxdw [r10 - 0x120], r1
047c10: ldxdw r1, [r10 - 0x7e0]
047c18: stxdw [r10 - 0x128], r1
047c20: ldxdw r1, [r10 - 0x7d8]
047c28: stxb [r10 - 0x12e], r1
047c30: ldxdw r1, [r10 - 0x7d0]
047c38: stxb [r10 - 0x12f], r1
047c40: ldxdw r1, [r10 - 0x7c8]
047c48: stxb [r10 - 0x130], r1
047c50: ldxdw r1, [r10 - 0x7c0]
047c58: stxdw [r10 - 0x138], r1
047c60: ldxdw r1, [r10 - 0x7b8]
047c68: stxdw [r10 - 0x140], r1
047c70: ldxdw r1, [r10 - 0x7b0]
047c78: stxdw [r10 - 0x148], r1
047c80: ldxdw r1, [r10 - 0x608]
047c88: stxdw [r10 - 0x150], r1
047c90: ldxdw r1, [r10 - 0x7a8]
047c98: stxdw [r10 - 0x158], r1
047ca0: ldxdw r1, [r10 - 0x7a0]
047ca8: stxb [r10 - 0x15e], r1
047cb0: ldxdw r1, [r10 - 0x798]
047cb8: stxb [r10 - 0x15f], r1
047cc0: ldxdw r1, [r10 - 0x790]
047cc8: stxb [r10 - 0x160], r1
047cd0: ldxdw r1, [r10 - 0x788]
047cd8: stxdw [r10 - 0x168], r1
047ce0: ldxdw r1, [r10 - 0x780]
047ce8: stxdw [r10 - 0x170], r1
047cf0: ldxdw r1, [r10 - 0x5f8]
047cf8: stxdw [r10 - 0x178], r1
047d00: ldxdw r1, [r10 - 0x5f0]
047d08: stxdw [r10 - 0x180], r1
047d10: ldxdw r1, [r10 - 0x770]
047d18: stxdw [r10 - 0x188], r1
047d20: ldxdw r1, [r10 - 0x768]
047d28: stxb [r10 - 0x18e], r1
047d30: ldxdw r1, [r10 - 0x760]
047d38: stxb [r10 - 0x18f], r1
047d40: ldxdw r1, [r10 - 0x758]
047d48: stxb [r10 - 0x190], r1
047d50: ldxdw r1, [r10 - 0x750]
047d58: stxdw [r10 - 0x198], r1
047d60: ldxdw r1, [r10 - 0x748]
047d68: stxdw [r10 - 0x1a0], r1
047d70: ldxdw r1, [r10 - 0x648]
047d78: stxdw [r10 - 0x1a8], r1
047d80: ldxdw r1, [r10 - 0x5e8]
047d88: stxdw [r10 - 0x1b0], r1
047d90: ldxdw r1, [r10 - 0x738]
047d98: stxdw [r10 - 0x1b8], r1
047da0: ldxdw r1, [r10 - 0x730]
047da8: stxb [r10 - 0x1be], r1
047db0: ldxdw r1, [r10 - 0x728]
047db8: stxb [r10 - 0x1bf], r1
047dc0: ldxdw r1, [r10 - 0x720]
047dc8: stxb [r10 - 0x1c0], r1
047dd0: ldxdw r1, [r10 - 0x718]
047dd8: stxdw [r10 - 0x1c8], r1
047de0: ldxdw r1, [r10 - 0x710]
047de8: stxdw [r10 - 0x1d0], r1
047df0: ldxdw r1, [r10 - 0x740]
047df8: stxdw [r10 - 0x1d8], r1
047e00: ldxdw r1, [r10 - 0x5e0]
047e08: stxdw [r10 - 0x1e0], r1
047e10: ldxdw r1, [r10 - 0x638]
047e18: stxdw [r10 - 0x1e8], r1
047e20: ldxdw r1, [r10 - 0x5a8]
047e28: stxb [r10 - 0x1ee], r1
047e30: ldxdw r1, [r10 - 0x5a0]
047e38: stxb [r10 - 0x1ef], r1
047e40: ldxdw r1, [r10 - 0x598]
047e48: stxb [r10 - 0x1f0], r1
047e50: ldxdw r1, [r10 - 0x590]
047e58: stxdw [r10 - 0x1f8], r1
047e60: ldxdw r1, [r10 - 0x588]
047e68: stxdw [r10 - 0x200], r1
047e70: ldxdw r1, [r10 - 0x560]
047e78: stxdw [r10 - 0x208], r1
047e80: ldxdw r1, [r10 - 0x540]
047e88: stxdw [r10 - 0x210], r1
047e90: ldxdw r1, [r10 - 0x580]
047e98: stxdw [r10 - 0x218], r1
047ea0: ldxdw r1, [r10 - 0x708]
047ea8: stxb [r10 - 0x21e], r1
047eb0: ldxdw r1, [r10 - 0x700]
047eb8: stxb [r10 - 0x21f], r1
047ec0: ldxdw r1, [r10 - 0x6f8]
047ec8: stxb [r10 - 0x220], r1
047ed0: ldxdw r1, [r10 - 0x6f0]
047ed8: stxdw [r10 - 0x228], r1
047ee0: ldxdw r1, [r10 - 0x6e8]
047ee8: stxdw [r10 - 0x230], r1
047ef0: ldxdw r1, [r10 - 0x778]
047ef8: stxdw [r10 - 0x238], r1
047f00: ldxdw r1, [r10 - 0x5d8]
047f08: stxdw [r10 - 0x240], r1
047f10: ldxdw r1, [r10 - 0x628]
047f18: stxdw [r10 - 0x248], r1
047f20: ldxdw r1, [r10 - 0x6e0]
047f28: stxb [r10 - 0x24e], r1
047f30: ldxdw r1, [r10 - 0x6d8]
047f38: stxb [r10 - 0x24f], r1
047f40: ldxdw r1, [r10 - 0x6d0]
047f48: stxb [r10 - 0x250], r1
047f50: ldxdw r1, [r10 - 0x6c8]
047f58: stxdw [r10 - 0x258], r1
047f60: ldxdw r1, [r10 - 0x6c0]
047f68: stxdw [r10 - 0x260], r1
047f70: ldxdw r1, [r10 - 0x6b8]
047f78: stxdw [r10 - 0x268], r1
047f80: ldxdw r1, [r10 - 0x5d0]
047f88: stxdw [r10 - 0x270], r1
047f90: ldxdw r1, [r10 - 0x618]
047f98: stxdw [r10 - 0x278], r1
047fa0: ldxdw r1, [r10 - 0x6b0]
047fa8: stxb [r10 - 0x27e], r1
047fb0: ldxdw r1, [r10 - 0x6a8]
047fb8: stxb [r10 - 0x27f], r1
047fc0: ldxdw r1, [r10 - 0x6a0]
047fc8: stxb [r10 - 0x280], r1
047fd0: ldxdw r1, [r10 - 0x698]
047fd8: stxdw [r10 - 0x288], r1
047fe0: ldxdw r1, [r10 - 0x690]
047fe8: stxdw [r10 - 0x290], r1
047ff0: ldxdw r1, [r10 - 0x688]
047ff8: stxdw [r10 - 0x298], r1
048000: ldxdw r1, [r10 - 0x5c8]
048008: stxdw [r10 - 0x2a0], r1
048010: ldxdw r1, [r10 - 0x610]
048018: stxdw [r10 - 0x2a8], r1
048020: ldxdw r1, [r10 - 0x680]
048028: stxb [r10 - 0x2ae], r1
048030: ldxdw r1, [r10 - 0x678]
048038: stxb [r10 - 0x2af], r1
048040: ldxdw r1, [r10 - 0x670]
048048: stxb [r10 - 0x2b0], r1
048050: ldxdw r1, [r10 - 0x668]
048058: stxdw [r10 - 0x2b8], r1
048060: ldxdw r1, [r10 - 0x660]
048068: stxdw [r10 - 0x2c0], r1
048070: ldxdw r1, [r10 - 0x8d0]
048078: stxdw [r10 - 0x2c8], r1
048080: ldxdw r1, [r10 - 0x630]
048088: stxdw [r10 - 0x2d0], r1
048090: ldxdw r1, [r10 - 0x600]
048098: stxdw [r10 - 0x2d8], r1
0480a0: ldxdw r1, [r10 - 0x900]
0480a8: stxb [r10 - 0x2de], r1
0480b0: ldxdw r1, [r10 - 0x8f8]
0480b8: stxb [r10 - 0x2df], r1
0480c0: ldxdw r1, [r10 - 0x8f0]
0480c8: stxb [r10 - 0x2e0], r1
0480d0: ldxdw r1, [r10 - 0x8e8]
0480d8: stxdw [r10 - 0x2e8], r1
0480e0: ldxdw r1, [r10 - 0x8e0]
0480e8: stxdw [r10 - 0x2f0], r1
0480f0: ldxdw r1, [r10 - 0x8d8]
0480f8: stxdw [r10 - 0x2f8], r1
048100: ldxdw r1, [r10 - 0x658]
048108: stxdw [r10 - 0x300], r1
048110: ldxdw r1, [r10 - 0x8c8]
048118: stxdw [r10 - 0x308], r1
048120: ldxdw r1, [r10 - 0x528]
048128: stxdw [r10 - 0x318], r1
048130: ldxdw r1, [r10 - 0x538]
048138: stxdw [r10 - 0x310], r1
048140: stxdw [r10 - 0x320], r1
048148: ldxdw r1, [r10 - 0x878]
048150: stxb [r10 - 0xa0], r1
048158: ldxdw r1, [r10 - 0x870]
048160: stxb [r10 - 0x9f], r1
048168: ldxdw r1, [r10 - 0x868]
048170: stxb [r10 - 0x9e], r1
048178: ldxdw r1, [r10 - 0x880]
048180: stxdw [r10 - 0xa8], r1
048188: ldxdw r1, [r10 - 0x888]
048190: stxdw [r10 - 0xb0], r1
048198: ldxdw r1, [r10 - 0x858]
0481a0: stxdw [r10 - 0xb8], r1
0481a8: ldxdw r1, [r10 - 0x640]
0481b0: stxdw [r10 - 0xc0], r1
0481b8: ldxdw r1, [r10 - 0x828]
0481c0: stxdw [r10 - 0xc8], r1
0481c8: ldxdw r1, [r10 - 0x8b0]
0481d0: stxb [r10 - 0x70], r1
0481d8: ldxdw r1, [r10 - 0x8a8]
0481e0: stxb [r10 - 0x6f], r1
0481e8: ldxdw r1, [r10 - 0x8a0]
0481f0: stxb [r10 - 0x6e], r1
0481f8: ldxdw r1, [r10 - 0x8b8]
048200: stxdw [r10 - 0x78], r1
048208: ldxdw r1, [r10 - 0x8c0]
048210: stxdw [r10 - 0x80], r1
048218: ldxdw r1, [r10 - 0x898]
048220: stxdw [r10 - 0x88], r1
048228: ldxdw r1, [r10 - 0x650]
048230: stxdw [r10 - 0x90], r1
048238: ldxdw r1, [r10 - 0x860]
048240: stxdw [r10 - 0x98], r1
048248: ldxb r1, [r10 - 0x4c]
048250: stxb [r10 - 0xc9], r1
048258: ldxw r1, [r10 - 0x50]
048260: stxw [r10 - 0xcd], r1
048268: ldxw r1, [r10 - 0x18]
048270: stxw [r10 - 0x9d], r1
048278: ldxb r1, [r10 - 0x14]
048280: stxb [r10 - 0x99], r1
048288: ldxb r1, [r10 - 0x2c]
048290: stxb [r10 - 0x69], r1
048298: ldxw r1, [r10 - 0x30]
0482a0: stxw [r10 - 0x6d], r1
0482a8: mov64 r1, r10
0482b0: add64 r1, -0x380
0482b8: stxdw [r10 - 0x68], r1
0482c0: stdw [r10 - 0x60], 0x1
0482c8: mov64 r1, r10
0482d0: add64 r1, -0x488
0482d8: mov64 r2, r10
0482e0: add64 r2, -0x320
0482e8: ldxdw r3, [r10 - 0x578]
0482f0: ldxdw r4, [r10 - 0x570]
0482f8: call 0x11ec6 ; call 0xd7930
048300: ldxdw r1, [r10 - 0x488]
048308: ldxdw r9, [r10 - 0x548]
048310: jeq r1, 0x2, +0x1 ; branch 0x48320
048318: ja +0x1d5 ; branch 0x491c8
048320: mov64 r1, r10
048328: add64 r1, -0x498
048330: call 0x1202f ; call 0xd84b0
048338: ldxdw r8, [r10 - 0x490]
048340: ldxdw r6, [r10 - 0x498]
048348: ja +0x161 ; branch 0x48e58
048350: ldxdw r1, [r1 + 0x0]
048358: ldxh r2, [r1 + 0x118]
048360: stxh [r10 - 0x384], r2
048368: ldxb r2, [r1 + 0x11a]
048370: stxb [r10 - 0x381], r2
048378: mov64 r2, r10
048380: add64 r2, -0x381
048388: stxdw [r10 - 0x330], r2
048390: mov64 r2, r1
048398: add64 r2, 0x48
0483a0: stxdw [r10 - 0x340], r2
0483a8: mov64 r2, r1
0483b0: add64 r2, 0x28
0483b8: stxdw [r10 - 0x350], r2
0483c0: add64 r1, 0x8
0483c8: stxdw [r10 - 0x360], r1
0483d0: mov64 r1, r10
0483d8: add64 r1, -0x384
0483e0: stxdw [r10 - 0x370], r1
0483e8: lddw r1, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0483f8: stxdw [r10 - 0x380], r1
048400: stdw [r10 - 0x328], 0x1
048408: stdw [r10 - 0x338], 0x20
048410: stdw [r10 - 0x348], 0x20
048418: stdw [r10 - 0x358], 0x20
048420: stdw [r10 - 0x368], 0x2
048428: stdw [r10 - 0x378], 0x4
048430: mov64 r1, r10
048438: add64 r1, -0x380
048440: stxdw [r10 - 0x40], r1
048448: mov64 r1, r10
048450: add64 r1, -0x420
048458: stxdw [r10 - 0x50], r1
048460: stdw [r10 - 0x38], 0x6
048468: stdw [r10 - 0x48], 0x2
048470: ldxw r1, [r10 - 0x38e]
048478: stxw [r10 - 0x2ad], r1
048480: ldxb r1, [r10 - 0x38a]
048488: stxb [r10 - 0x2a9], r1
048490: ldxw r1, [r10 - 0x393]
048498: stxw [r10 - 0x27d], r1
0484a0: ldxb r1, [r10 - 0x38f]
0484a8: stxb [r10 - 0x279], r1
0484b0: ldxw r1, [r10 - 0x398]
0484b8: stxw [r10 - 0x24d], r1
0484c0: ldxb r1, [r10 - 0x394]
0484c8: stxb [r10 - 0x249], r1
0484d0: ldxb r1, [r10 - 0x399]
0484d8: stxb [r10 - 0x219], r1
0484e0: ldxw r1, [r10 - 0x39d]
0484e8: stxw [r10 - 0x21d], r1
0484f0: ldxb r1, [r10 - 0x39e]
0484f8: stxb [r10 - 0x1e9], r1
048500: ldxw r1, [r10 - 0x3a2]
048508: stxw [r10 - 0x1ed], r1
048510: ldxb r1, [r10 - 0x3a3]
048518: stxb [r10 - 0x1b9], r1
048520: ldxw r1, [r10 - 0x3a7]
048528: stxw [r10 - 0x1bd], r1
048530: ldxb r1, [r10 - 0x3a8]
048538: stxb [r10 - 0x189], r1
048540: ldxw r1, [r10 - 0x3ac]
048548: stxw [r10 - 0x18d], r1
048550: ldxb r1, [r10 - 0x3ad]
048558: stxb [r10 - 0x159], r1
048560: ldxw r1, [r10 - 0x3b1]
048568: stxw [r10 - 0x15d], r1
048570: ldxb r1, [r10 - 0x3b2]
048578: stxb [r10 - 0x129], r1
048580: ldxw r1, [r10 - 0x3b6]
048588: stxw [r10 - 0x12d], r1
048590: ldxb r1, [r10 - 0x3b7]
048598: stxb [r10 - 0xf9], r1
0485a0: ldxw r1, [r10 - 0x3bb]
0485a8: stxw [r10 - 0xfd], r1
0485b0: ldxb r1, [r10 - 0x3bc]
0485b8: stxb [r10 - 0x14], r1
0485c0: ldxw r1, [r10 - 0x3c0]
0485c8: stxw [r10 - 0x18], r1
0485d0: ldxb r1, [r10 - 0x3c1]
0485d8: stxb [r10 - 0x2c], r1
0485e0: ldxw r1, [r10 - 0x3c5]
0485e8: stxw [r10 - 0x30], r1
0485f0: ldxb r1, [r10 - 0x3c6]
0485f8: stxb [r10 - 0x54], r1
048600: ldxw r1, [r10 - 0x3ca]
048608: stxw [r10 - 0x58], r1
048610: ldxb r1, [r10 - 0x385]
048618: stxb [r10 - 0x2d9], r1
048620: ldxw r1, [r10 - 0x389]
048628: stxw [r10 - 0x2dd], r1
048630: ldxdw r1, [r10 - 0x850]
048638: stxb [r10 - 0xce], r1
048640: ldxdw r1, [r10 - 0x848]
048648: stxb [r10 - 0xcf], r1
048650: ldxdw r1, [r10 - 0x840]
048658: stxb [r10 - 0xd0], r1
048660: ldxdw r1, [r10 - 0x838]
048668: stxdw [r10 - 0xd8], r1
048670: ldxdw r1, [r10 - 0x830]
048678: stxdw [r10 - 0xe0], r1
048680: ldxdw r1, [r10 - 0x820]
048688: stxdw [r10 - 0xe8], r1
048690: ldxdw r1, [r10 - 0x890]
048698: stxdw [r10 - 0xf0], r1
0486a0: ldxdw r1, [r10 - 0x818]
0486a8: stxdw [r10 - 0xf8], r1
0486b0: ldxdw r1, [r10 - 0x810]
0486b8: stxb [r10 - 0xfe], r1
0486c0: ldxdw r1, [r10 - 0x808]
0486c8: stxb [r10 - 0xff], r1
0486d0: ldxdw r1, [r10 - 0x800]
0486d8: stxb [r10 - 0x100], r1
0486e0: ldxdw r1, [r10 - 0x7f8]
0486e8: stxdw [r10 - 0x108], r1
0486f0: ldxdw r1, [r10 - 0x7f0]
0486f8: stxdw [r10 - 0x110], r1
048700: ldxdw r1, [r10 - 0x7e8]
048708: stxdw [r10 - 0x118], r1
048710: ldxdw r1, [r10 - 0x620]
048718: stxdw [r10 - 0x120], r1
048720: ldxdw r1, [r10 - 0x7e0]
048728: stxdw [r10 - 0x128], r1
048730: ldxdw r1, [r10 - 0x7d8]
048738: stxb [r10 - 0x12e], r1
048740: ldxdw r1, [r10 - 0x7d0]
048748: stxb [r10 - 0x12f], r1
048750: ldxdw r1, [r10 - 0x7c8]
048758: stxb [r10 - 0x130], r1
048760: ldxdw r1, [r10 - 0x7c0]
048768: stxdw [r10 - 0x138], r1
048770: ldxdw r1, [r10 - 0x7b8]
048778: stxdw [r10 - 0x140], r1
048780: ldxdw r1, [r10 - 0x7b0]
048788: stxdw [r10 - 0x148], r1
048790: ldxdw r1, [r10 - 0x608]
048798: stxdw [r10 - 0x150], r1
0487a0: ldxdw r1, [r10 - 0x7a8]
0487a8: stxdw [r10 - 0x158], r1
0487b0: ldxdw r1, [r10 - 0x7a0]
0487b8: stxb [r10 - 0x15e], r1
0487c0: ldxdw r1, [r10 - 0x798]
0487c8: stxb [r10 - 0x15f], r1
0487d0: ldxdw r1, [r10 - 0x790]
0487d8: stxb [r10 - 0x160], r1
0487e0: ldxdw r1, [r10 - 0x788]
0487e8: stxdw [r10 - 0x168], r1
0487f0: ldxdw r1, [r10 - 0x780]
0487f8: stxdw [r10 - 0x170], r1
048800: ldxdw r1, [r10 - 0x5f8]
048808: stxdw [r10 - 0x178], r1
048810: ldxdw r1, [r10 - 0x5f0]
048818: stxdw [r10 - 0x180], r1
048820: ldxdw r1, [r10 - 0x770]
048828: stxdw [r10 - 0x188], r1
048830: ldxdw r1, [r10 - 0x768]
048838: stxb [r10 - 0x18e], r1
048840: ldxdw r1, [r10 - 0x760]
048848: stxb [r10 - 0x18f], r1
048850: ldxdw r1, [r10 - 0x758]
048858: stxb [r10 - 0x190], r1
048860: ldxdw r1, [r10 - 0x750]
048868: stxdw [r10 - 0x198], r1
048870: ldxdw r1, [r10 - 0x748]
048878: stxdw [r10 - 0x1a0], r1
048880: ldxdw r1, [r10 - 0x648]
048888: stxdw [r10 - 0x1a8], r1
048890: ldxdw r1, [r10 - 0x5e8]
048898: stxdw [r10 - 0x1b0], r1
0488a0: ldxdw r1, [r10 - 0x738]
0488a8: stxdw [r10 - 0x1b8], r1
0488b0: ldxdw r1, [r10 - 0x730]
0488b8: stxb [r10 - 0x1be], r1
0488c0: ldxdw r1, [r10 - 0x728]
0488c8: stxb [r10 - 0x1bf], r1
0488d0: ldxdw r1, [r10 - 0x720]
0488d8: stxb [r10 - 0x1c0], r1
0488e0: ldxdw r1, [r10 - 0x718]
0488e8: stxdw [r10 - 0x1c8], r1
0488f0: ldxdw r1, [r10 - 0x710]
0488f8: stxdw [r10 - 0x1d0], r1
048900: ldxdw r1, [r10 - 0x740]
048908: stxdw [r10 - 0x1d8], r1
048910: ldxdw r1, [r10 - 0x5e0]
048918: stxdw [r10 - 0x1e0], r1
048920: ldxdw r1, [r10 - 0x638]
048928: stxdw [r10 - 0x1e8], r1
048930: ldxdw r1, [r10 - 0x5a8]
048938: stxb [r10 - 0x1ee], r1
048940: ldxdw r1, [r10 - 0x5a0]
048948: stxb [r10 - 0x1ef], r1
048950: ldxdw r1, [r10 - 0x598]
048958: stxb [r10 - 0x1f0], r1
048960: ldxdw r1, [r10 - 0x590]
048968: stxdw [r10 - 0x1f8], r1
048970: ldxdw r1, [r10 - 0x588]
048978: stxdw [r10 - 0x200], r1
048980: ldxdw r1, [r10 - 0x560]
048988: stxdw [r10 - 0x208], r1
048990: ldxdw r1, [r10 - 0x540]
048998: stxdw [r10 - 0x210], r1
0489a0: ldxdw r1, [r10 - 0x580]
0489a8: stxdw [r10 - 0x218], r1
0489b0: ldxdw r1, [r10 - 0x708]
0489b8: stxb [r10 - 0x21e], r1
0489c0: ldxdw r1, [r10 - 0x700]
0489c8: stxb [r10 - 0x21f], r1
0489d0: ldxdw r1, [r10 - 0x6f8]
0489d8: stxb [r10 - 0x220], r1
0489e0: ldxdw r1, [r10 - 0x6f0]
0489e8: stxdw [r10 - 0x228], r1
0489f0: ldxdw r1, [r10 - 0x6e8]
0489f8: stxdw [r10 - 0x230], r1
048a00: ldxdw r1, [r10 - 0x778]
048a08: stxdw [r10 - 0x238], r1
048a10: ldxdw r1, [r10 - 0x5d8]
048a18: stxdw [r10 - 0x240], r1
048a20: ldxdw r1, [r10 - 0x628]
048a28: stxdw [r10 - 0x248], r1
048a30: ldxdw r1, [r10 - 0x6e0]
048a38: stxb [r10 - 0x24e], r1
048a40: ldxdw r1, [r10 - 0x6d8]
048a48: stxb [r10 - 0x24f], r1
048a50: ldxdw r1, [r10 - 0x6d0]
048a58: stxb [r10 - 0x250], r1
048a60: ldxdw r1, [r10 - 0x6c8]
048a68: stxdw [r10 - 0x258], r1
048a70: ldxdw r1, [r10 - 0x6c0]
048a78: stxdw [r10 - 0x260], r1
048a80: ldxdw r1, [r10 - 0x6b8]
048a88: stxdw [r10 - 0x268], r1
048a90: ldxdw r1, [r10 - 0x5d0]
048a98: stxdw [r10 - 0x270], r1
048aa0: ldxdw r1, [r10 - 0x618]
048aa8: stxdw [r10 - 0x278], r1
048ab0: ldxdw r1, [r10 - 0x6b0]
048ab8: stxb [r10 - 0x27e], r1
048ac0: ldxdw r1, [r10 - 0x6a8]
048ac8: stxb [r10 - 0x27f], r1
048ad0: ldxdw r1, [r10 - 0x6a0]
048ad8: stxb [r10 - 0x280], r1
048ae0: ldxdw r1, [r10 - 0x698]
048ae8: stxdw [r10 - 0x288], r1
048af0: ldxdw r1, [r10 - 0x690]
048af8: stxdw [r10 - 0x290], r1
048b00: ldxdw r1, [r10 - 0x688]
048b08: stxdw [r10 - 0x298], r1
048b10: ldxdw r1, [r10 - 0x5c8]
048b18: stxdw [r10 - 0x2a0], r1
048b20: ldxdw r1, [r10 - 0x610]
048b28: stxdw [r10 - 0x2a8], r1
048b30: ldxdw r1, [r10 - 0x680]
048b38: stxb [r10 - 0x2ae], r1
048b40: ldxdw r1, [r10 - 0x678]
048b48: stxb [r10 - 0x2af], r1
048b50: ldxdw r1, [r10 - 0x670]
048b58: stxb [r10 - 0x2b0], r1
048b60: ldxdw r1, [r10 - 0x668]
048b68: stxdw [r10 - 0x2b8], r1
048b70: ldxdw r1, [r10 - 0x660]
048b78: stxdw [r10 - 0x2c0], r1
048b80: ldxdw r1, [r10 - 0x8d0]
048b88: stxdw [r10 - 0x2c8], r1
048b90: ldxdw r1, [r10 - 0x630]
048b98: stxdw [r10 - 0x2d0], r1
048ba0: ldxdw r1, [r10 - 0x600]
048ba8: stxdw [r10 - 0x2d8], r1
048bb0: ldxdw r1, [r10 - 0x900]
048bb8: stxb [r10 - 0x2de], r1
048bc0: ldxdw r1, [r10 - 0x8f8]
048bc8: stxb [r10 - 0x2df], r1
048bd0: ldxdw r1, [r10 - 0x8f0]
048bd8: stxb [r10 - 0x2e0], r1
048be0: ldxdw r1, [r10 - 0x8e8]
048be8: stxdw [r10 - 0x2e8], r1
048bf0: ldxdw r1, [r10 - 0x8e0]
048bf8: stxdw [r10 - 0x2f0], r1
048c00: ldxdw r1, [r10 - 0x8d8]
048c08: stxdw [r10 - 0x2f8], r1
048c10: ldxdw r1, [r10 - 0x658]
048c18: stxdw [r10 - 0x300], r1
048c20: ldxdw r1, [r10 - 0x8c8]
048c28: stxdw [r10 - 0x308], r1
048c30: ldxdw r1, [r10 - 0x528]
048c38: stxdw [r10 - 0x318], r1
048c40: ldxdw r1, [r10 - 0x538]
048c48: stxdw [r10 - 0x310], r1
048c50: stxdw [r10 - 0x320], r1
048c58: ldxdw r1, [r10 - 0x828]
048c60: stxdw [r10 - 0xc8], r1
048c68: ldxdw r1, [r10 - 0x640]
048c70: stxdw [r10 - 0xc0], r1
048c78: ldxdw r1, [r10 - 0x858]
048c80: stxdw [r10 - 0xb8], r1
048c88: ldxdw r1, [r10 - 0x888]
048c90: stxdw [r10 - 0xb0], r1
048c98: ldxdw r1, [r10 - 0x880]
048ca0: stxdw [r10 - 0xa8], r1
048ca8: ldxdw r1, [r10 - 0x868]
048cb0: stxb [r10 - 0x9e], r1
048cb8: ldxdw r1, [r10 - 0x870]
048cc0: stxb [r10 - 0x9f], r1
048cc8: ldxdw r1, [r10 - 0x878]
048cd0: stxb [r10 - 0xa0], r1
048cd8: ldxdw r1, [r10 - 0x860]
048ce0: stxdw [r10 - 0x98], r1
048ce8: ldxdw r1, [r10 - 0x650]
048cf0: stxdw [r10 - 0x90], r1
048cf8: ldxdw r1, [r10 - 0x898]
048d00: stxdw [r10 - 0x88], r1
048d08: ldxdw r1, [r10 - 0x8c0]
048d10: stxdw [r10 - 0x80], r1
048d18: ldxdw r1, [r10 - 0x8b8]
048d20: stxdw [r10 - 0x78], r1
048d28: ldxdw r1, [r10 - 0x8a0]
048d30: stxb [r10 - 0x6e], r1
048d38: ldxdw r1, [r10 - 0x8a8]
048d40: stxb [r10 - 0x6f], r1
048d48: ldxdw r1, [r10 - 0x8b0]
048d50: stxb [r10 - 0x70], r1
048d58: ldxb r1, [r10 - 0x14]
048d60: stxb [r10 - 0xc9], r1
048d68: ldxw r1, [r10 - 0x18]
048d70: stxw [r10 - 0xcd], r1
048d78: ldxw r1, [r10 - 0x30]
048d80: stxw [r10 - 0x9d], r1
048d88: ldxb r1, [r10 - 0x2c]
048d90: stxb [r10 - 0x99], r1
048d98: mov64 r1, r10
048da0: add64 r1, -0x50
048da8: stxdw [r10 - 0x68], r1
048db0: ldxb r1, [r10 - 0x54]
048db8: stxb [r10 - 0x69], r1
048dc0: ldxw r1, [r10 - 0x58]
048dc8: stxw [r10 - 0x6d], r1
048dd0: stdw [r10 - 0x60], 0x2
048dd8: mov64 r1, r10
048de0: add64 r1, -0x468
048de8: mov64 r2, r10
048df0: add64 r2, -0x320
048df8: ldxdw r3, [r10 - 0x578]
048e00: ldxdw r4, [r10 - 0x570]
048e08: call 0x11d64 ; call 0xd7930
048e10: ldxdw r1, [r10 - 0x468]
048e18: ldxdw r9, [r10 - 0x548]
048e20: jeq r1, 0x2, +0x1 ; branch 0x48e30
048e28: ja +0x69 ; branch 0x49178
048e30: mov64 r1, r10
048e38: add64 r1, -0x478
048e40: call 0x11ecd ; call 0xd84b0
048e48: ldxdw r8, [r10 - 0x470]
048e50: ldxdw r6, [r10 - 0x478]
048e58: ldxdw r1, [r10 - 0x558]
048e60: ldxdw r1, [r1 + 0x30]
048e68: ldxdw r1, [r1 + 0x0]
048e70: ldxdw r2, [r1 + 0x18]
048e78: stxdw [r10 - 0x38], r2
048e80: ldxdw r2, [r1 + 0x10]
048e88: stxdw [r10 - 0x40], r2
048e90: ldxdw r2, [r1 + 0x8]
048e98: stxdw [r10 - 0x48], r2
048ea0: ldxdw r1, [r1 + 0x0]
048ea8: stxdw [r10 - 0x50], r1
048eb0: ldxdw r1, [r10 - 0x400]
048eb8: ldxdw r2, [r1 + 0x0]
048ec0: stxdw [r10 - 0x320], r2
048ec8: ldxdw r2, [r1 + 0x8]
048ed0: stxdw [r10 - 0x318], r2
048ed8: ldxdw r2, [r1 + 0x10]
048ee0: stxdw [r10 - 0x310], r2
048ee8: ldxdw r1, [r1 + 0x18]
048ef0: stxdw [r10 - 0x308], r1
048ef8: mov64 r7, r10
048f00: add64 r7, -0x50
048f08: mov64 r2, r10
048f10: add64 r2, -0x320
048f18: mov64 r1, r7
048f20: mov64 r3, 0x20
048f28: call 0x1a136 ; call 0x1198e0
048f30: ldxdw r1, [r9 + 0x0]
048f38: ldxdw r2, [r1 + 0x18]
048f40: stxdw [r10 - 0x308], r2
048f48: ldxdw r2, [r1 + 0x10]
048f50: stxdw [r10 - 0x310], r2
048f58: ldxdw r2, [r1 + 0x8]
048f60: stxdw [r10 - 0x318], r2
048f68: ldxdw r1, [r1 + 0x0]
048f70: stxdw [r10 - 0x320], r1
048f78: lsh64 r0, 0x20
048f80: rsh64 r0, 0x20
048f88: mov64 r9, r8
048f90: jeq r0, 0x0, +0x1 ; branch 0x48fa0
048f98: mov64 r9, 0x0
048fa0: mov64 r2, r10
048fa8: add64 r2, -0x320
048fb0: mov64 r1, r7
048fb8: mov64 r3, 0x20
048fc0: call 0x1a123 ; call 0x1198e0
048fc8: lsh64 r0, 0x20
048fd0: rsh64 r0, 0x20
048fd8: jeq r0, 0x0, +0x1 ; branch 0x48fe8
048fe0: mov64 r8, 0x0
048fe8: ldxdw r1, [r10 - 0x5c0]
048ff0: and64 r1, 0x1
048ff8: ldxdw r3, [r10 - 0x5b8]
049000: ldxdw r4, [r10 - 0x908]
049008: jne r1, 0x0, +0x1 ; branch 0x49018
049010: ja +0x2e ; branch 0x49188
049018: ldxdw r2, [r10 - 0x5b0]
049020: lsh64 r2, 0x20
049028: rsh64 r2, 0x20
049030: mov64 r1, 0x1
049038: jeq r2, 0x0, +0x1 ; branch 0x49048
049040: mov64 r1, 0x0
049048: or64 r1, r3
049050: and64 r1, 0x1
049058: ldxdw r9, [r10 - 0x548]
049060: jne r1, 0x0, +0x1 ; branch 0x49070
049068: ja +0x30 ; branch 0x491f0
049070: ldxdw r1, [r10 - 0x550]
049078: stxdw [r1 + 0x8], r6
049080: stdw [r1 + 0x0], 0x2
049088: ldxdw r1, [r10 - 0x3f0]
049090: ldxdw r2, [r10 - 0x3f8]
049098: ldxdw r3, [r2 + 0x0]
0490a0: add64 r3, -0x1
0490a8: stxdw [r2 + 0x0], r3
0490b0: jne r3, 0x0, +0x3 ; branch 0x490d0
0490b8: ldxdw r3, [r2 + 0x8]
0490c0: add64 r3, -0x1
0490c8: stxdw [r2 + 0x8], r3
0490d0: ldxdw r2, [r1 + 0x0]
0490d8: add64 r2, -0x1
0490e0: stxdw [r1 + 0x0], r2
0490e8: jne r2, 0x0, +0x3 ; branch 0x49108
0490f0: ldxdw r2, [r1 + 0x8]
0490f8: add64 r2, -0x1
049100: stxdw [r1 + 0x8], r2
049108: ldxdw r1, [r9 + 0x10]
049110: ldxdw r2, [r9 + 0x8]
049118: ldxdw r3, [r2 + 0x0]
049120: add64 r3, -0x1
049128: stxdw [r2 + 0x0], r3
049130: jne r3, 0x0, +0x3 ; branch 0x49150
049138: ldxdw r3, [r2 + 0x8]
049140: add64 r3, -0x1
049148: stxdw [r2 + 0x8], r3
049150: ldxdw r2, [r1 + 0x0]
049158: add64 r2, -0x1
049160: stxdw [r1 + 0x0], r2
049168: jne r2, 0x0, +0xf9 ; branch 0x49938
049170: ja +0xf5 ; branch 0x49920
049178: ldxdw r2, [r10 - 0x460]
049180: ja +0x9 ; branch 0x491d0
049188: ldxdw r1, [r10 - 0x5b0]
049190: lsh64 r1, 0x20
049198: rsh64 r1, 0x20
0491a0: jeq r1, 0x0, +0x23 ; branch 0x492c0
0491a8: ldxdw r1, [r10 - 0x578]
0491b0: jlt r4, r1, +0x34 ; branch 0x49358
0491b8: sub64 r4, r1
0491c0: ja +0x2a ; branch 0x49318
0491c8: ldxdw r2, [r10 - 0x480]
0491d0: ldxdw r3, [r10 - 0x550]
0491d8: stxdw [r3 + 0x0], r1
0491e0: stxdw [r3 + 0x8], r2
0491e8: ja +0xc9 ; branch 0x49838
0491f0: mov64 r1, r10
0491f8: add64 r1, -0x320
049200: mov64 r2, r9
049208: call 0x17fef ; call 0x109188
049210: ldxdw r7, [r10 - 0x310]
049218: ldxdw r1, [r10 - 0x318]
049220: ldxdw r2, [r10 - 0x320]
049228: lddw r3, -0x7fffffffffffffe6
049238: jne r2, r3, +0x65 ; branch 0x49568
049240: ldxdw r2, [r1 + 0x0]
049248: ldxdw r1, [r1 + 0x8]
049250: stxdw [r10 - 0x378], r1
049258: stxdw [r10 - 0x380], r2
049260: mov64 r1, r10
049268: add64 r1, -0x320
049270: mov64 r2, r10
049278: add64 r2, -0x380
049280: call 0x15cd2 ; call 0xf7918
049288: ldxw r1, [r10 - 0x298]
049290: jeq r1, 0x2, +0xac ; branch 0x497f8
049298: ldxdw r1, [r10 - 0x2e0]
0492a0: ldxdw r2, [r7 + 0x0]
0492a8: add64 r2, -0x1
0492b0: stxdw [r7 + 0x0], r2
0492b8: ja +0x60 ; branch 0x495c0
0492c0: ldxdw r1, [r10 - 0x578]
0492c8: jlt r4, r1, +0x11 ; branch 0x49358
0492d0: sub64 r4, r1
0492d8: mov64 r1, r4
0492e0: add64 r1, r6
0492e8: mov64 r2, 0x1
0492f0: jlt r1, r4, +0x1 ; branch 0x49300
0492f8: mov64 r2, 0x0
049300: and64 r2, 0x1
049308: jne r2, 0x0, +0x9 ; branch 0x49358
049310: mov64 r4, r1
049318: mov64 r7, r4
049320: add64 r7, r9
049328: mov64 r1, 0x1
049330: jlt r7, r4, +0x1 ; branch 0x49340
049338: mov64 r1, 0x0
049340: and64 r1, 0x1
049348: jne r1, 0x0, +0x1 ; branch 0x49358
049350: ja +0x5f ; branch 0x49650
049358: mov64 r1, r10
049360: add64 r1, -0x30
049368: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
049378: call 0x580f ; call 0x753f8
049380: stdw [r10 - 0x8], 0x0
049388: stdw [r10 - 0x10], 0x1
049390: stdw [r10 - 0x18], 0x0
049398: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0493a8: stxdw [r10 - 0x358], r1
0493b0: mov64 r1, r10
0493b8: add64 r1, -0x18
0493c0: stxdw [r10 - 0x360], r1
0493c8: stb [r10 - 0x348], 0x3
0493d0: stdw [r10 - 0x350], 0x20
0493d8: stdw [r10 - 0x370], 0x0
0493e0: stdw [r10 - 0x380], 0x0
0493e8: mov64 r2, r10
0493f0: add64 r2, -0x380
0493f8: lddw r1, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
049408: call 0x62f2 ; call 0x7aba0
049410: jeq r0, 0x0, +0xa ; branch 0x49468
049418: mov64 r3, r10
049420: add64 r3, -0x58
049428: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
049438: mov64 r2, 0x37
049440: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
049450: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
049460: call 0x19366 ; call 0x112f98
049468: ldxdw r1, [r10 - 0x8]
049470: stxdw [r10 - 0x2d8], r1
049478: ldxdw r1, [r10 - 0x10]
049480: stxdw [r10 - 0x2e0], r1
049488: ldxdw r1, [r10 - 0x18]
049490: stxdw [r10 - 0x2e8], r1
049498: ldxdw r1, [r10 - 0x30]
0494a0: stxdw [r10 - 0x300], r1
0494a8: ldxdw r1, [r10 - 0x28]
0494b0: stxdw [r10 - 0x2f8], r1
0494b8: ldxdw r1, [r10 - 0x20]
0494c0: stxdw [r10 - 0x2f0], r1
0494c8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
0494d8: stxdw [r10 - 0x318], r1
0494e0: stw [r10 - 0x288], 0x1787
0494e8: stb [r10 - 0x2d0], 0x2
0494f0: stw [r10 - 0x308], 0x3a0
0494f8: stdw [r10 - 0x310], 0x39
049500: stdw [r10 - 0x320], 0x0
049508: mov64 r1, r10
049510: add64 r1, -0x4c8
049518: mov64 r2, r10
049520: add64 r2, -0x320
049528: call 0x17351 ; call 0x102fb8
049530: ldxdw r1, [r10 - 0x4c8]
049538: ldxdw r2, [r10 - 0x4c0]
049540: ldxdw r3, [r10 - 0x550]
049548: stxdw [r3 + 0x8], r2
049550: stxdw [r3 + 0x0], r1
049558: ldxdw r9, [r10 - 0x548]
049560: ja +0x5a ; branch 0x49838
049568: stxdw [r10 - 0x310], r7
049570: stxdw [r10 - 0x318], r1
049578: stxdw [r10 - 0x320], r2
049580: mov64 r1, r10
049588: add64 r1, -0x4d8
049590: mov64 r2, r10
049598: add64 r2, -0x320
0495a0: call 0x17353 ; call 0x103040
0495a8: ldxdw r1, [r10 - 0x4d0]
0495b0: ldxdw r2, [r10 - 0x4d8]
0495b8: jne r2, 0x2, +0x4c ; branch 0x49820
0495c0: ldxdw r4, [r10 - 0x910]
0495c8: mov64 r2, r4
0495d0: add64 r2, r6
0495d8: mov64 r3, 0x1
0495e0: jlt r2, r4, +0x1 ; branch 0x495f0
0495e8: mov64 r3, 0x0
0495f0: and64 r3, 0x1
0495f8: jne r3, 0x0, +0x1 ; branch 0x49608
049600: ja +0x67 ; branch 0x49940
049608: mov64 r1, r10
049610: add64 r1, -0x508
049618: call 0xdf95 ; call 0xb92c8
049620: ldxdw r1, [r10 - 0x508]
049628: ldxdw r2, [r10 - 0x500]
049630: ldxdw r3, [r10 - 0x550]
049638: stxdw [r3 + 0x8], r2
049640: stxdw [r3 + 0x0], r1
049648: ja +0x3d ; branch 0x49838
049650: mov64 r9, r3
049658: mov64 r1, r10
049660: add64 r1, -0x320
049668: mov64 r2, r10
049670: add64 r2, -0x400
049678: call -0x7d7 ; call 0x457c8
049680: ldxdw r1, [r10 - 0x320]
049688: jne r1, 0x2, +0x87 ; branch 0x49ac8
049690: ldxdw r1, [r10 - 0x318]
049698: mov64 r3, r9
0496a0: jeq r1, r7, -0xd2 ; branch 0x49018
0496a8: mov64 r1, r10
0496b0: add64 r1, -0x300
0496b8: lddw r2, 0x11bfe4 ; rodata b'U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <='
0496c8: call 0x57a5 ; call 0x753f8
0496d0: mov64 r1, r10
0496d8: add64 r1, -0x2e8
0496e0: lddw r2, 0x11bfe4 ; rodata b'U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <='
0496f0: call -0x81eb ; call 0x87a0
0496f8: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
049708: stxdw [r10 - 0x318], r1
049710: stb [r10 - 0x2d0], 0x2
049718: stw [r10 - 0x308], 0x3a1
049720: stdw [r10 - 0x310], 0x39
049728: stdw [r10 - 0x320], 0x0
049730: stw [r10 - 0x288], 0x17c5
049738: mov64 r1, r10
049740: add64 r1, -0x4a8
049748: mov64 r2, r10
049750: add64 r2, -0x320
049758: call 0x1730b ; call 0x102fb8
049760: ldxdw r8, [r10 - 0x4a0]
049768: ldxdw r9, [r10 - 0x4a8]
049770: mov64 r1, r10
049778: add64 r1, -0x320
049780: mov64 r2, r10
049788: add64 r2, -0x400
049790: call -0x7fa ; call 0x457c8
049798: ldxdw r1, [r10 - 0x320]
0497a0: jne r1, 0x2, +0x66 ; branch 0x49ad8
0497a8: ldxdw r4, [r10 - 0x318]
0497b0: mov64 r1, r10
0497b8: add64 r1, -0x4b8
0497c0: mov64 r2, r9
0497c8: mov64 r3, r8
0497d0: mov64 r5, r7
0497d8: call -0x8ff4 ; call 0x1840
0497e0: ldxdw r1, [r10 - 0x4b8]
0497e8: ldxdw r2, [r10 - 0x4b0]
0497f0: ja -0x57 ; branch 0x49540
0497f8: ldxdw r1, [r10 - 0x318]
049800: ldxdw r2, [r10 - 0x320]
049808: ldxdw r3, [r7 + 0x0]
049810: add64 r3, -0x1
049818: stxdw [r7 + 0x0], r3
049820: ldxdw r3, [r10 - 0x550]
049828: stxdw [r3 + 0x8], r1
049830: stxdw [r3 + 0x0], r2
049838: ldxdw r1, [r10 - 0x3f0]
049840: ldxdw r2, [r10 - 0x3f8]
049848: ldxdw r3, [r2 + 0x0]
049850: add64 r3, -0x1
049858: stxdw [r2 + 0x0], r3
049860: jne r3, 0x0, +0x3 ; branch 0x49880
049868: ldxdw r3, [r2 + 0x8]
049870: add64 r3, -0x1
049878: stxdw [r2 + 0x8], r3
049880: ldxdw r2, [r1 + 0x0]
049888: add64 r2, -0x1
049890: stxdw [r1 + 0x0], r2
049898: jne r2, 0x0, +0x3 ; branch 0x498b8
0498a0: ldxdw r2, [r1 + 0x8]
0498a8: add64 r2, -0x1
0498b0: stxdw [r1 + 0x8], r2
0498b8: ldxdw r1, [r9 + 0x10]
0498c0: ldxdw r2, [r9 + 0x8]
0498c8: ldxdw r3, [r2 + 0x0]
0498d0: add64 r3, -0x1
0498d8: stxdw [r2 + 0x0], r3
0498e0: jne r3, 0x0, +0x3 ; branch 0x49900
0498e8: ldxdw r3, [r2 + 0x8]
0498f0: add64 r3, -0x1
0498f8: stxdw [r2 + 0x8], r3
049900: ldxdw r2, [r1 + 0x0]
049908: add64 r2, -0x1
049910: stxdw [r1 + 0x0], r2
049918: jne r2, 0x0, +0x3 ; branch 0x49938
049920: ldxdw r2, [r1 + 0x8]
049928: add64 r2, -0x1
049930: stxdw [r1 + 0x8], r2
049938: exit
049940: mov64 r7, r2
049948: add64 r7, r8
049950: mov64 r3, 0x1
049958: jlt r7, r2, +0x1 ; branch 0x49968
049960: mov64 r3, 0x0
049968: and64 r3, 0x1
049970: jne r3, 0x0, -0x6e ; branch 0x49608
049978: jeq r1, r7, -0x122 ; branch 0x49070
049980: mov64 r1, r10
049988: add64 r1, -0x300
049990: lddw r2, 0x11bfe4 ; rodata b'U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <='
0499a0: call 0x574a ; call 0x753f8
0499a8: mov64 r1, r10
0499b0: add64 r1, -0x2e8
0499b8: lddw r2, 0x11bfe4 ; rodata b'U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <='
0499c8: call -0x8246 ; call 0x87a0
0499d0: lddw r1, 0x11ccc8 ; rodata b'programs/pump-amm/src/instructions/swap/multi_hop_swap.rsmulti_hop_swapglob'
0499e0: stxdw [r10 - 0x318], r1
0499e8: stb [r10 - 0x2d0], 0x2
0499f0: stw [r10 - 0x308], 0x3a8
0499f8: stdw [r10 - 0x310], 0x39
049a00: stdw [r10 - 0x320], 0x0
049a08: stw [r10 - 0x288], 0x17c5
049a10: mov64 r1, r10
049a18: add64 r1, -0x4e8
049a20: mov64 r2, r10
049a28: add64 r2, -0x320
049a30: call 0x172b0 ; call 0x102fb8
049a38: ldxdw r8, [r10 - 0x4e0]
049a40: mov64 r2, r9
049a48: ldxdw r9, [r10 - 0x4e8]
049a50: mov64 r1, r10
049a58: add64 r1, -0x320
049a60: call -0x854 ; call 0x457c8
049a68: ldxdw r1, [r10 - 0x320]
049a70: jne r1, 0x2, +0xc ; branch 0x49ad8
049a78: ldxdw r4, [r10 - 0x318]
049a80: mov64 r1, r10
049a88: add64 r1, -0x4f8
049a90: mov64 r2, r9
049a98: mov64 r3, r8
049aa0: mov64 r5, r7
049aa8: call -0x904e ; call 0x1840
049ab0: ldxdw r1, [r10 - 0x4f8]
049ab8: ldxdw r2, [r10 - 0x4f0]
049ac0: ja -0xb1 ; branch 0x49540
049ac8: ldxdw r2, [r10 - 0x318]
049ad0: ja -0xb3 ; branch 0x49540
049ad8: ldxdw r2, [r10 - 0x318]
049ae0: ldxdw r3, [r10 - 0x550]
049ae8: stxdw [r3 + 0x8], r2
049af0: stxdw [r3 + 0x0], r1
049af8: mov64 r1, r9
049b00: mov64 r2, r8
049b08: call -0x7fee ; call 0x9ba0
049b10: ldxdw r9, [r10 - 0x548]
049b18: ja -0x5d ; branch 0x49838
049b20: mov64 r1, 0x1
049b28: lddw r3, 0x122520 ; rodata b'\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00.\x03\x00\x00-\x00\x00\x00\x00\x00\x00\x00\xc8\xcc\x11\x009\x00\x00\x00\x00\x00\x00\x00/\x03\x00\x00:\x00\x00\x00\x00\x00\x00\x00\x1c\xcd\x11\x00/\x00\x00\x00\x00\x00\x00\x00\xb7\x01\x00\x00\r\x00\x00\x00\x00\x00\x00'
049b38: call 0x19201 ; call 0x112b48
049b40: ldxdw r2, [r10 - 0x530]
049b48: call 0x18eff ; call 0x111348
