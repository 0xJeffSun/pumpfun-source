0e0bf8: mov64 r7, r5
0e0c00: mov64 r8, r4
0e0c08: mov64 r9, r3
0e0c10: stxdw [r10 - 0xae8], r2
0e0c18: mov64 r6, r1
0e0c20: lddw r1, 0x11e718 ; rodata b'Instruction: CreateConfigInstruction: DisableInstruction: UpdateAdminInstru'
0e0c30: mov64 r2, 0x19
0e0c38: call -0x1
0e0c40: ldxdw r1, [r7 - 0x1000]
0e0c48: stxdw [r10 - 0xa90], r1
0e0c50: ldxdw r2, [r7 - 0xff8]
0e0c58: stxdw [r10 - 0xa88], r2
0e0c60: jlt r2, 0x8, +0x37 ; branch 0xe0e20
0e0c68: ldxdw r7, [r1 + 0x0]
0e0c70: mov64 r3, r1
0e0c78: add64 r3, 0x8
0e0c80: stxdw [r10 - 0xa90], r3
0e0c88: mov64 r3, r2
0e0c90: add64 r3, -0x8
0e0c98: stxdw [r10 - 0xa88], r3
0e0ca0: jlt r3, 0x8, +0x2f ; branch 0xe0e20
0e0ca8: stxdw [r10 - 0xaf0], r6
0e0cb0: add64 r2, -0x10
0e0cb8: ldxdw r6, [r1 + 0x8]
0e0cc0: stxdw [r10 - 0xa88], r2
0e0cc8: add64 r1, 0x10
0e0cd0: stxdw [r10 - 0xa90], r1
0e0cd8: mov64 r1, r10
0e0ce0: add64 r1, -0x658
0e0ce8: mov64 r2, r10
0e0cf0: add64 r2, -0xa90
0e0cf8: call -0x1a682 ; call 0xd8f0
0e0d00: ldxb r1, [r10 - 0x658]
0e0d08: jeq r1, 0x0, +0x2 ; branch 0xe0d20
0e0d10: ldxdw r0, [r10 - 0x650]
0e0d18: ja +0x13 ; branch 0xe0db8
0e0d20: stxdw [r10 - 0xb00], r6
0e0d28: stxdw [r10 - 0xaf8], r7
0e0d30: ldxw r1, [r10 - 0x654]
0e0d38: stxw [r10 - 0x15], r1
0e0d40: ldxw r1, [r10 - 0x657]
0e0d48: stxw [r10 - 0x18], r1
0e0d50: ldxdw r7, [r10 - 0x650]
0e0d58: mov64 r1, r10
0e0d60: add64 r1, -0x110
0e0d68: mov64 r2, r10
0e0d70: add64 r2, -0x648
0e0d78: mov64 r3, 0xf1
0e0d80: call 0x7162 ; call 0x119898
0e0d88: ldxdw r3, [r10 - 0xa88]
0e0d90: jlt r3, 0x8, +0x1 ; branch 0xe0da0
0e0d98: ja +0x6 ; branch 0xe0dd0
0e0da0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e0db0: call 0x5c4b ; call 0x10f010
0e0db8: stxdw [r10 - 0xaa0], r0
0e0dc0: ldxdw r6, [r10 - 0xaf0]
0e0dc8: ja +0xe ; branch 0xe0e40
0e0dd0: ldxdw r1, [r10 - 0xa90]
0e0dd8: ldxdw r4, [r1 + 0x0]
0e0de0: mov64 r2, r1
0e0de8: add64 r2, 0x8
0e0df0: stxdw [r10 - 0xa90], r2
0e0df8: add64 r3, -0x8
0e0e00: stxdw [r10 - 0xa88], r3
0e0e08: ldxdw r6, [r10 - 0xaf0]
0e0e10: jlt r3, 0x20, +0x1 ; branch 0xe0e20
0e0e18: ja +0x17 ; branch 0xe0ed8
0e0e20: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e0e30: call 0x5c3b ; call 0x10f010
0e0e38: stxdw [r10 - 0xaa0], r0
0e0e40: mov64 r1, r0
0e0e48: and64 r1, 0x3
0e0e50: mov64 r2, r1
0e0e58: add64 r2, -0x2
0e0e60: jlt r2, 0x2, +0x5 ; branch 0xe0e90
0e0e68: jeq r1, 0x0, +0x4 ; branch 0xe0e90
0e0e70: ldxdw r1, [r0 - 0x1]
0e0e78: ldxdw r2, [r0 + 0x7]
0e0e80: ldxdw r2, [r2 + 0x0]
0e0e88: callx r2
0e0e90: mov64 r1, r10
0e0e98: add64 r1, -0xae0
0e0ea0: mov64 r2, 0x66
0e0ea8: call 0x49f1 ; call 0x105e38
0e0eb0: ldxdw r8, [r10 - 0xad8]
0e0eb8: ldxdw r7, [r10 - 0xae0]
0e0ec0: stxdw [r6 + 0x8], r8
0e0ec8: stxdw [r6 + 0x0], r7
0e0ed0: exit
0e0ed8: stxdw [r10 - 0xb18], r4
0e0ee0: ldxdw r4, [r1 + 0xe]
0e0ee8: stxdw [r10 - 0xb08], r4
0e0ef0: ldxb r3, [r1 + 0x16]
0e0ef8: stxb [r10 - 0x8], r3
0e0f00: ldxh r3, [r2 + 0x4]
0e0f08: stxh [r10 - 0x554], r3
0e0f10: ldxw r2, [r2 + 0x0]
0e0f18: stxw [r10 - 0x558], r2
0e0f20: stxdw [r10 - 0x10], r4
0e0f28: ldxdw r2, [r10 - 0xf]
0e0f30: stxdw [r10 - 0xb10], r2
0e0f38: ldxdw r2, [r1 + 0x17]
0e0f40: stxdw [r10 - 0x121], r2
0e0f48: ldxdw r2, [r1 + 0x1f]
0e0f50: stxdw [r10 - 0x119], r2
0e0f58: ldxb r1, [r1 + 0x27]
0e0f60: stxb [r10 - 0x111], r1
0e0f68: ldxw r1, [r10 - 0x18]
0e0f70: stxw [r10 - 0xaa0], r1
0e0f78: ldxw r1, [r10 - 0x15]
0e0f80: stxw [r10 - 0xa9d], r1
0e0f88: mov64 r1, r10
0e0f90: add64 r1, -0x649
0e0f98: mov64 r2, r10
0e0fa0: add64 r2, -0x110
0e0fa8: mov64 r3, 0xf1
0e0fb0: call 0x711c ; call 0x119898
0e0fb8: stxdw [r10 - 0xa99], r7
0e0fc0: stxdw [r10 - 0x651], r7
0e0fc8: ldxdw r1, [r10 - 0xaa0]
0e0fd0: stxdw [r10 - 0x658], r1
0e0fd8: mov64 r7, r10
0e0fe0: add64 r7, -0xa80
0e0fe8: mov64 r2, r10
0e0ff0: add64 r2, -0x658
0e0ff8: mov64 r1, r7
0e1000: mov64 r3, 0x106
0e1008: call 0x7111 ; call 0x119898
0e1010: mov64 r1, r10
0e1018: add64 r1, -0x230
0e1020: mov64 r2, r7
0e1028: mov64 r3, 0x100
0e1030: call 0x710c ; call 0x119898
0e1038: ldxdw r1, [r10 - 0xb10]
0e1040: stxdw [r10 - 0x129], r1
0e1048: ldxdw r1, [r10 - 0xb08]
0e1050: stxb [r10 - 0x12a], r1
0e1058: ldxw r1, [r10 - 0x980]
0e1060: stxw [r10 - 0x130], r1
0e1068: ldxh r1, [r10 - 0x97c]
0e1070: stxh [r10 - 0x12c], r1
0e1078: sth [r10 - 0xa90], 0xffff
0e1080: stxdw [r10 - 0x108], r8
0e1088: stxdw [r10 - 0x110], r9
0e1090: mov64 r1, r10
0e1098: add64 r1, -0xa90
0e10a0: stxdw [r10 - 0xff8], r1
0e10a8: mov64 r1, r10
0e10b0: add64 r1, -0x658
0e10b8: mov64 r3, r10
0e10c0: add64 r3, -0x110
0e10c8: mov64 r5, r10
0e10d0: ldxdw r2, [r10 - 0xae8]
0e10d8: call -0xc025 ; call 0x80fb8
0e10e0: ldxdw r8, [r10 - 0x650]
0e10e8: ldxdw r7, [r10 - 0x658]
0e10f0: ldxb r9, [r10 - 0x234]
0e10f8: jeq r9, 0x2, -0x48 ; branch 0xe0ec0
0e1100: mov64 r1, r10
0e1108: add64 r1, -0xa70
0e1110: mov64 r2, r10
0e1118: add64 r2, -0x648
0e1120: mov64 r3, 0x414
0e1128: call 0x70ed ; call 0x119898
0e1130: ldxh r1, [r10 - 0x233]
0e1138: stxh [r10 - 0x65b], r1
0e1140: ldxb r1, [r10 - 0x231]
0e1148: stxb [r10 - 0x659], r1
0e1150: stxb [r10 - 0x65c], r9
0e1158: stxdw [r10 - 0xa78], r8
0e1160: stxdw [r10 - 0xa80], r7
0e1168: ldxb r1, [r10 - 0xa8f]
0e1170: stxb [r10 - 0x637], r1
0e1178: ldxb r1, [r10 - 0xa90]
0e1180: stxb [r10 - 0x638], r1
0e1188: ldxdw r1, [r10 - 0x108]
0e1190: stxdw [r10 - 0x640], r1
0e1198: ldxdw r1, [r10 - 0x110]
0e11a0: stxdw [r10 - 0x648], r1
0e11a8: mov64 r1, r10
0e11b0: add64 r1, -0xa80
0e11b8: stxdw [r10 - 0x650], r1
0e11c0: ldxdw r8, [r10 - 0xae8]
0e11c8: stxdw [r10 - 0x658], r8
0e11d0: ldxdw r1, [r10 - 0xb18]
0e11d8: stxdw [r10 - 0xff8], r1
0e11e0: mov64 r1, r10
0e11e8: add64 r1, -0x130
0e11f0: stxdw [r10 - 0xff0], r1
0e11f8: mov64 r1, r10
0e1200: add64 r1, -0x230
0e1208: stxdw [r10 - 0x1000], r1
0e1210: mov64 r1, r10
0e1218: add64 r1, -0xab0
0e1220: mov64 r2, r10
0e1228: add64 r2, -0x658
0e1230: mov64 r5, r10
0e1238: ldxdw r3, [r10 - 0xaf8]
0e1240: ldxdw r4, [r10 - 0xb00]
0e1248: call -0x19499 ; call 0x16d88
0e1250: ldxdw r7, [r10 - 0xab0]
0e1258: mov64 r4, r8
0e1260: jeq r7, 0x2, +0x1 ; branch 0xe1270
0e1268: ja +0x31 ; branch 0xe13f8
0e1270: mov64 r1, r10
0e1278: add64 r1, -0xac0
0e1280: mov64 r2, r10
0e1288: add64 r2, -0xa10
0e1290: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0e12a0: call -0x1b875 ; call 0x4f00
0e12a8: mov64 r7, 0x2
0e12b0: ldxdw r2, [r10 - 0xac0]
0e12b8: jeq r2, 0x2, +0x9 ; branch 0xe1308
0e12c0: ldxdw r3, [r10 - 0xab8]
0e12c8: mov64 r1, r10
0e12d0: add64 r1, -0xad0
0e12d8: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0e12e8: mov64 r5, 0xd
0e12f0: call -0x1beb0 ; call 0x1d78
0e12f8: ldxdw r8, [r10 - 0xac8]
0e1300: ldxdw r7, [r10 - 0xad0]
0e1308: ldxdw r1, [r10 - 0xa60]
0e1310: ldxdw r2, [r10 - 0xa68]
0e1318: ldxdw r3, [r2 + 0x0]
0e1320: add64 r3, -0x1
0e1328: stxdw [r2 + 0x0], r3
0e1330: jne r3, 0x0, +0x3 ; branch 0xe1350
0e1338: ldxdw r3, [r2 + 0x8]
0e1340: add64 r3, -0x1
0e1348: stxdw [r2 + 0x8], r3
0e1350: ldxdw r2, [r1 + 0x0]
0e1358: add64 r2, -0x1
0e1360: stxdw [r1 + 0x0], r2
0e1368: jne r2, 0x0, +0x3 ; branch 0xe1388
0e1370: ldxdw r2, [r1 + 0x8]
0e1378: add64 r2, -0x1
0e1380: stxdw [r1 + 0x8], r2
0e1388: ldxdw r1, [r10 - 0xa30]
0e1390: ldxdw r2, [r10 - 0xa38]
0e1398: ldxdw r3, [r2 + 0x0]
0e13a0: add64 r3, -0x1
0e13a8: stxdw [r2 + 0x0], r3
0e13b0: jne r3, 0x0, +0x3 ; branch 0xe13d0
0e13b8: ldxdw r3, [r2 + 0x8]
0e13c0: add64 r3, -0x1
0e13c8: stxdw [r2 + 0x8], r3
0e13d0: ldxdw r2, [r1 + 0x0]
0e13d8: add64 r2, -0x1
0e13e0: stxdw [r1 + 0x0], r2
0e13e8: jne r2, 0x0, -0xa6 ; branch 0xe0ec0
0e13f0: ja +0x1e ; branch 0xe14e8
0e13f8: ldxdw r8, [r10 - 0xaa8]
0e1400: ldxdw r1, [r10 - 0xa60]
0e1408: ldxdw r2, [r10 - 0xa68]
0e1410: ldxdw r3, [r2 + 0x0]
0e1418: add64 r3, -0x1
0e1420: stxdw [r2 + 0x0], r3
0e1428: jne r3, 0x0, +0x3 ; branch 0xe1448
0e1430: ldxdw r3, [r2 + 0x8]
0e1438: add64 r3, -0x1
0e1440: stxdw [r2 + 0x8], r3
0e1448: ldxdw r2, [r1 + 0x0]
0e1450: add64 r2, -0x1
0e1458: stxdw [r1 + 0x0], r2
0e1460: jne r2, 0x0, +0x3 ; branch 0xe1480
0e1468: ldxdw r2, [r1 + 0x8]
0e1470: add64 r2, -0x1
0e1478: stxdw [r1 + 0x8], r2
0e1480: ldxdw r1, [r10 - 0xa30]
0e1488: ldxdw r2, [r10 - 0xa38]
0e1490: ldxdw r3, [r2 + 0x0]
0e1498: add64 r3, -0x1
0e14a0: stxdw [r2 + 0x0], r3
0e14a8: jne r3, 0x0, +0x3 ; branch 0xe14c8
0e14b0: ldxdw r3, [r2 + 0x8]
0e14b8: add64 r3, -0x1
0e14c0: stxdw [r2 + 0x8], r3
0e14c8: ldxdw r2, [r1 + 0x0]
0e14d0: add64 r2, -0x1
0e14d8: stxdw [r1 + 0x0], r2
0e14e0: jne r2, 0x0, -0xc5 ; branch 0xe0ec0
0e14e8: ldxdw r2, [r1 + 0x8]
0e14f0: add64 r2, -0x1
0e14f8: stxdw [r1 + 0x8], r2
0e1500: ja -0xc9 ; branch 0xe0ec0
