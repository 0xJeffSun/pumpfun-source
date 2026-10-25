016d88: mov64 r7, r5
016d90: mov64 r8, r4
016d98: stxdw [r10 - 0x2d0], r1
016da0: stxdw [r10 - 0x2d8], r2
016da8: ldxdw r9, [r2 + 0x8]
016db0: ldxdw r1, [r9 + 0x0]
016db8: ldxdw r1, [r1 + 0x0]
016dc0: ldxdw r2, [r1 + 0x18]
016dc8: stxdw [r10 - 0x250], r2
016dd0: ldxdw r2, [r1 + 0x10]
016dd8: stxdw [r10 - 0x258], r2
016de0: ldxdw r2, [r1 + 0x8]
016de8: stxdw [r10 - 0x260], r2
016df0: ldxdw r2, [r1 + 0x0]
016df8: stxdw [r10 - 0x268], r2
016e00: ldxdw r2, [r1 + 0x0]
016e08: ldxdw r5, [r1 + 0x8]
016e10: ldxdw r4, [r1 + 0x10]
016e18: ldxdw r1, [r1 + 0x18]
016e20: stxdw [r9 + 0x290], r1
016e28: stxdw [r9 + 0x288], r4
016e30: stxdw [r9 + 0x280], r5
016e38: stxdw [r9 + 0x278], r2
016e40: mov64 r6, r9
016e48: add64 r6, 0x78
016e50: mov64 r1, r10
016e58: add64 r1, -0x278
016e60: mov64 r2, r6
016e68: stxdw [r10 - 0x2e0], r3
016e70: call 0x94f7 ; call 0x61630
016e78: ldxdw r1, [r10 - 0x278]
016e80: jne r1, 0x2, +0x3b ; branch 0x17060
016e88: ldxdw r1, [r7 - 0xff0]
016e90: stxdw [r10 - 0x2f0], r1
016e98: ldxdw r1, [r7 - 0xff8]
016ea0: stxdw [r10 - 0x2e8], r1
016ea8: ldxdw r7, [r7 - 0x1000]
016eb0: mov64 r1, r10
016eb8: add64 r1, -0x288
016ec0: mov64 r2, r6
016ec8: mov64 r3, r8
016ed0: call 0x9538 ; call 0x61898
016ed8: ldxdw r1, [r10 - 0x288]
016ee0: jeq r1, 0x2, +0x1 ; branch 0x16ef0
016ee8: ja +0x30 ; branch 0x17070
016ef0: mov64 r1, r10
016ef8: add64 r1, -0x298
016f00: mov64 r2, r6
016f08: mov64 r3, r7
016f10: call 0x95ca ; call 0x61d68
016f18: ldxdw r1, [r10 - 0x298]
016f20: jeq r1, 0x2, +0x1 ; branch 0x16f30
016f28: ja +0x2a ; branch 0x17080
016f30: mov64 r1, r10
016f38: add64 r1, -0x2a8
016f40: mov64 r2, r6
016f48: ldxdw r3, [r10 - 0x2e8]
016f50: call 0x9575 ; call 0x61b00
016f58: ldxdw r1, [r10 - 0x2a8]
016f60: jeq r1, 0x2, +0x1 ; branch 0x16f70
016f68: ja +0x24 ; branch 0x17090
016f70: stxdw [r10 - 0x2f8], r7
016f78: stb [r9 + 0x420], 0x0
016f80: ldxdw r7, [r10 - 0x2f0]
016f88: ldxdw r1, [r7 + 0x0]
016f90: stxdw [r9 + 0x298], r1
016f98: ldxdw r1, [r7 + 0x8]
016fa0: stxdw [r9 + 0x2a0], r1
016fa8: ldxdw r1, [r7 + 0x10]
016fb0: stxdw [r9 + 0x2a8], r1
016fb8: ldxdw r1, [r7 + 0x18]
016fc0: stxdw [r9 + 0x2b0], r1
016fc8: mov64 r1, r10
016fd0: add64 r1, -0xd0
016fd8: call 0x1dfcb ; call 0x106e38
016fe0: ldxdw r1, [r10 - 0xd0]
016fe8: jeq r1, 0x0, +0x19 ; branch 0x170b8
016ff0: ldxdw r1, [r10 - 0xc8]
016ff8: ldxdw r2, [r10 - 0xc0]
017000: ldxdw r3, [r10 - 0xb8]
017008: stxdw [r10 - 0xc0], r3
017010: stxdw [r10 - 0xc8], r2
017018: stxdw [r10 - 0xd0], r1
017020: mov64 r1, r10
017028: add64 r1, -0x2b8
017030: mov64 r2, r10
017038: add64 r2, -0xd0
017040: call 0x1d7ff ; call 0x103040
017048: ldxdw r2, [r10 - 0x2b0]
017050: ldxdw r1, [r10 - 0x2b8]
017058: ja +0x7 ; branch 0x17098
017060: ldxdw r2, [r10 - 0x270]
017068: ja +0x5 ; branch 0x17098
017070: ldxdw r2, [r10 - 0x280]
017078: ja +0x3 ; branch 0x17098
017080: ldxdw r2, [r10 - 0x290]
017088: ja +0x1 ; branch 0x17098
017090: ldxdw r2, [r10 - 0x2a0]
017098: ldxdw r3, [r10 - 0x2d0]
0170a0: stxdw [r3 + 0x8], r2
0170a8: stxdw [r3 + 0x0], r1
0170b0: exit
0170b8: ldxdw r1, [r10 - 0xa8]
0170c0: stxdw [r10 - 0x108], r1
0170c8: ldxdw r1, [r10 - 0x268]
0170d0: stxdw [r10 - 0x148], r1
0170d8: ldxdw r1, [r10 - 0x260]
0170e0: stxdw [r10 - 0x140], r1
0170e8: ldxdw r1, [r10 - 0x258]
0170f0: stxdw [r10 - 0x138], r1
0170f8: ldxdw r1, [r10 - 0x250]
017100: stxdw [r10 - 0x130], r1
017108: stxdw [r10 - 0xf8], r8
017110: ldxdw r1, [r10 - 0x2e0]
017118: stxdw [r10 - 0x100], r1
017120: mov64 r6, r10
017128: add64 r6, -0x248
017130: mov64 r1, r6
017138: ldxdw r2, [r10 - 0x2f8]
017140: mov64 r3, 0x100
017148: call 0x204e9 ; call 0x119898
017150: ldxdw r1, [r10 - 0x2e8]
017158: stxdw [r10 - 0xf0], r1
017160: ldxdw r1, [r7 + 0x0]
017168: stxdw [r10 - 0x128], r1
017170: ldxdw r1, [r7 + 0x8]
017178: stxdw [r10 - 0x120], r1
017180: ldxdw r1, [r7 + 0x10]
017188: stxdw [r10 - 0x118], r1
017190: ldxdw r1, [r7 + 0x18]
017198: stxdw [r10 - 0x110], r1
0171a0: mov64 r1, r10
0171a8: add64 r1, -0xd0
0171b0: mov64 r2, r6
0171b8: call 0xd96f ; call 0x83d38
0171c0: ldxdw r1, [r10 - 0xc0]
0171c8: stxdw [r10 - 0x60], r1
0171d0: ldxdw r1, [r10 - 0xc8]
0171d8: stxdw [r10 - 0x68], r1
0171e0: mov64 r1, r10
0171e8: add64 r1, -0x68
0171f0: mov64 r6, 0x1
0171f8: mov64 r2, 0x1
017200: call 0x1df0f ; call 0x106a80
017208: ldxdw r3, [r9 + 0x18]
017210: ldxdw r1, [r3 + 0x0]
017218: add64 r1, 0x1
017220: jeq r1, 0x0, +0x1 ; branch 0x17230
017228: mov64 r6, 0x0
017230: ldxdw r7, [r9 + 0x10]
017238: stxdw [r3 + 0x0], r1
017240: jne r6, 0x1, +0x1 ; branch 0x17250
017248: call -0x1
017250: ldxdw r8, [r9 + 0x20]
017258: ldxdw r1, [r8 + 0x0]
017260: add64 r1, 0x1
017268: mov64 r2, 0x1
017270: jeq r1, 0x0, +0x1 ; branch 0x17280
017278: mov64 r2, 0x0
017280: stxdw [r10 - 0x2e0], r3
017288: stxdw [r8 + 0x0], r1
017290: jne r2, 0x1, +0x1 ; branch 0x172a0
017298: ja -0xb ; branch 0x17248
0172a0: ldxdw r1, [r10 - 0x2d8]
0172a8: ldxb r1, [r1 + 0x21]
0172b0: stxdw [r10 - 0x2d8], r1
0172b8: ldxb r1, [r9 + 0x3a]
0172c0: stxdw [r10 - 0x300], r1
0172c8: ldxb r1, [r9 + 0x39]
0172d0: stxdw [r10 - 0x2f8], r1
0172d8: ldxb r1, [r9 + 0x38]
0172e0: stxdw [r10 - 0x2f0], r1
0172e8: ldxdw r1, [r9 + 0x30]
0172f0: stxdw [r10 - 0x2e8], r1
0172f8: ldxdw r9, [r9 + 0x28]
017300: mov64 r1, r10
017308: add64 r1, -0xe8
017310: mov64 r2, r10
017318: add64 r2, -0x248
017320: call 0xd942 ; call 0x83d38
017328: ldxdw r5, [r10 - 0xd8]
017330: mov64 r2, r5
017338: add64 r2, 0x8
017340: mov64 r1, 0x1
017348: jlt r2, r5, +0x1 ; branch 0x17358
017350: mov64 r1, 0x0
017358: and64 r1, 0x1
017360: jne r1, 0x0, +0xb3 ; branch 0x17900
017368: ldxdw r0, [r10 - 0xe0]
017370: mov64 r3, 0x1
017378: jeq r2, 0x0, +0x1c ; branch 0x17460
017380: stxdw [r10 - 0x308], r8
017388: mov64 r1, 0x0
017390: jslt r2, 0x0, +0xac ; branch 0x178f8
017398: mov64 r8, r9
0173a0: lddw r1, 0x300000000
0173b0: ldxdw r1, [r1 + 0x0]
0173b8: lddw r6, 0x300008000
0173c8: jeq r1, 0x0, +0x1 ; branch 0x173d8
0173d0: mov64 r6, r1
0173d8: mov64 r4, r6
0173e0: sub64 r4, r2
0173e8: mov64 r3, 0x0
0173f0: mov64 r1, 0x1
0173f8: mov64 r9, 0x1
017400: jgt r4, r6, +0x1 ; branch 0x17410
017408: mov64 r9, 0x0
017410: jne r9, 0x0, +0x1 ; branch 0x17420
017418: mov64 r3, r4
017420: lddw r4, 0x300000008
017430: mov64 r9, r8
017438: jlt r3, r4, +0x97 ; branch 0x178f8
017440: lddw r1, 0x300000000
017450: stxdw [r1 + 0x0], r3
017458: ldxdw r8, [r10 - 0x308]
017460: lddw r1, 0x1d9acb512ea545e4
017470: stxdw [r3 + 0x0], r1
017478: mov64 r4, 0x8
017480: jeq r5, 0x0, +0xd ; branch 0x174f0
017488: mov64 r4, 0x0
017490: mov64 r1, r3
017498: add64 r1, 0x8
0174a0: mov64 r2, r1
0174a8: add64 r2, r4
0174b0: mov64 r6, r0
0174b8: add64 r6, r4
0174c0: ldxb r6, [r6 + 0x0]
0174c8: stxb [r2 + 0x0], r6
0174d0: add64 r4, 0x1
0174d8: jeq r5, r4, +0x1 ; branch 0x174e8
0174e0: ja -0x9 ; branch 0x174a0
0174e8: add64 r4, 0x8
0174f0: lddw r1, 0x300000000
017500: ldxdw r2, [r1 + 0x0]
017508: mov64 r1, r2
017510: add64 r1, -0x22
017518: mov64 r5, 0x0
017520: mov64 r0, 0x1
017528: jgt r1, r2, +0x1 ; branch 0x17538
017530: mov64 r0, 0x0
017538: jne r0, 0x0, +0x1 ; branch 0x17548
017540: mov64 r5, r1
017548: lddw r1, 0x300007fde
017558: jeq r2, 0x0, +0x1 ; branch 0x17568
017560: mov64 r1, r5
017568: lddw r2, 0x300000007
017578: jgt r1, r2, +0x3 ; branch 0x17598
017580: mov64 r1, 0x1
017588: mov64 r2, 0x22
017590: call 0x1f3b9 ; call 0x111360
017598: lddw r2, 0x300000000
0175a8: stxdw [r2 + 0x0], r1
0175b0: ldxdw r2, [r7 + 0x0]
0175b8: ldxdw r5, [r7 + 0x8]
0175c0: ldxdw r0, [r7 + 0x10]
0175c8: ldxdw r6, [r7 + 0x18]
0175d0: stxdw [r1 + 0x18], r6
0175d8: stxdw [r1 + 0x10], r0
0175e0: stxdw [r1 + 0x8], r5
0175e8: stxdw [r1 + 0x0], r2
0175f0: sth [r1 + 0x20], 0x1
0175f8: stxdw [r10 - 0x60], r1
017600: stdw [r10 - 0x58], 0x1
017608: stdw [r10 - 0x68], 0x1
017610: mov64 r6, r10
017618: add64 r6, -0xd0
017620: mov64 r5, r10
017628: add64 r5, -0x68
017630: mov64 r1, r6
017638: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
017648: call 0x1eca0 ; call 0x10db50
017650: ldxdw r1, [r10 - 0x300]
017658: stxb [r10 - 0x3e], r1
017660: ldxdw r1, [r10 - 0x2f8]
017668: stxb [r10 - 0x3f], r1
017670: ldxdw r1, [r10 - 0x2f0]
017678: stxb [r10 - 0x40], r1
017680: ldxdw r1, [r10 - 0x2e8]
017688: stxdw [r10 - 0x48], r1
017690: stxdw [r10 - 0x50], r9
017698: stxdw [r10 - 0x58], r8
0176a0: ldxdw r9, [r10 - 0x2e0]
0176a8: stxdw [r10 - 0x60], r9
0176b0: stxdw [r10 - 0x68], r7
0176b8: mov64 r1, r10
0176c0: add64 r1, -0x28
0176c8: stxdw [r10 - 0x38], r1
0176d0: mov64 r1, r10
0176d8: add64 r1, -0x1
0176e0: stxdw [r10 - 0x18], r1
0176e8: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
0176f8: stxdw [r10 - 0x28], r1
017700: ldxdw r1, [r10 - 0x2d8]
017708: stxb [r10 - 0x1], r1
017710: stdw [r10 - 0x30], 0x2
017718: stdw [r10 - 0x10], 0x1
017720: stdw [r10 - 0x20], 0x11
017728: mov64 r1, r10
017730: add64 r1, -0x38
017738: stxdw [r10 - 0x1000], r1
017740: stdw [r10 - 0xff8], 0x1
017748: mov64 r1, r10
017750: add64 r1, -0x80
017758: mov64 r3, r10
017760: add64 r3, -0x68
017768: mov64 r5, r10
017770: mov64 r2, r6
017778: mov64 r4, 0x1
017780: call 0x1de66 ; call 0x106ab8
017788: lddw r1, -0x7fffffffffffffe6
017798: ldxdw r2, [r10 - 0x80]
0177a0: jeq r2, r1, +0x1 ; branch 0x177b0
0177a8: ja +0x11 ; branch 0x17838
0177b0: ldxdw r1, [r9 + 0x0]
0177b8: add64 r1, -0x1
0177c0: stxdw [r9 + 0x0], r1
0177c8: jne r1, 0x0, +0x3 ; branch 0x177e8
0177d0: ldxdw r1, [r9 + 0x8]
0177d8: add64 r1, -0x1
0177e0: stxdw [r9 + 0x8], r1
0177e8: ldxdw r1, [r8 + 0x0]
0177f0: add64 r1, -0x1
0177f8: stxdw [r8 + 0x0], r1
017800: ldxdw r3, [r10 - 0x2d0]
017808: jne r1, 0x0, +0x3 ; branch 0x17828
017810: ldxdw r1, [r8 + 0x8]
017818: add64 r1, -0x1
017820: stxdw [r8 + 0x8], r1
017828: mov64 r1, 0x2
017830: ja -0xf3 ; branch 0x170a0
017838: mov64 r1, r10
017840: add64 r1, -0x2c8
017848: mov64 r2, r10
017850: add64 r2, -0x80
017858: call 0x1d6fc ; call 0x103040
017860: ldxdw r2, [r10 - 0x2c0]
017868: ldxdw r1, [r10 - 0x2c8]
017870: ldxdw r3, [r10 - 0x58]
017878: ldxdw r4, [r10 - 0x60]
017880: ldxdw r5, [r4 + 0x0]
017888: add64 r5, -0x1
017890: stxdw [r4 + 0x0], r5
017898: jne r5, 0x0, +0x3 ; branch 0x178b8
0178a0: ldxdw r5, [r4 + 0x8]
0178a8: add64 r5, -0x1
0178b0: stxdw [r4 + 0x8], r5
0178b8: ldxdw r4, [r3 + 0x0]
0178c0: add64 r4, -0x1
0178c8: stxdw [r3 + 0x0], r4
0178d0: jne r4, 0x0, -0x108 ; branch 0x17098
0178d8: ldxdw r4, [r3 + 0x8]
0178e0: add64 r4, -0x1
0178e8: stxdw [r3 + 0x8], r4
0178f0: ja -0x10c ; branch 0x17098
0178f8: call 0x1f349 ; call 0x111348
017900: lddw r1, 0x1220d0 ; rodata b'\x00\x00\x00\x00X\xbc\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00i\xbc\x11\x00g\x00\x00\x00\x00\x00\x00\x00;\x00\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x18\x02\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 N\r\x00\x00\x00\x00'
017910: stxdw [r10 - 0xd0], r1
017918: stdw [r10 - 0xb0], 0x0
017920: stdw [r10 - 0xc8], 0x1
017928: stdw [r10 - 0xb8], 0x0
017930: stdw [r10 - 0xc0], 0x8
017938: mov64 r1, r10
017940: add64 r1, -0xd0
017948: lddw r2, 0x1220e0 ; rodata b'\x00\x00\x00\x00i\xbc\x11\x00g\x00\x00\x00\x00\x00\x00\x00;\x00\x00\x00\x12\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x18\x02\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 N\r\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
017958: call 0x1f616 ; call 0x112a10
