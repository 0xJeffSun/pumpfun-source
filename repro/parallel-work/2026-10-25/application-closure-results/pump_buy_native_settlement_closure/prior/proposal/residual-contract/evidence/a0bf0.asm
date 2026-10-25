   a0bf0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   a0bf8: 79 21 40 00 00 00 00 00      	ldxdw r1, [r2 + 0x40]
   a0c00: 3d 31 22 00 00 00 00 00      	jge r1, r3, +0x22 <.text+0xa0bf8>
   a0c08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0c10: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a0c18: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a0c28: 85 10 00 00 ea 6c 01 00      	call 0x16cea
   a0c30: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a0c38: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a0c40: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a0c48: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0c58: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0c60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0c68: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a0c70: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a0c78: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a0c80: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a0c88: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a0c90: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a0c98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0ca0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a0ca8: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a0cb8: 85 10 00 00 39 7a 01 00      	call 0x17a39
   a0cc0: 15 00 28 00 00 00 00 00      	jeq r0, 0x0, +0x28 <.text+0xa0ce8>
   a0cc8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a0cd0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   a0cd8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   a0ce8: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   a0cf0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   a0d00: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   a0d10: 85 10 00 00 20 18 02 00      	call 0x21820
   a0d18: 1f 31 00 00 00 00 00 00      	sub64 r1, r3
   a0d20: 7b 12 40 00 00 00 00 00      	stxdw [r2 + 0x40], r1
   a0d28: 79 21 50 00 00 00 00 00      	ldxdw r1, [r2 + 0x50]
   a0d30: ad 31 01 00 00 00 00 00      	jlt r1, r3, +0x1 <.text+0xa0c20>
   a0d38: 05 00 35 00 00 00 00 00      	ja +0x35 <.text+0xa0dc8>
   a0d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0d48: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a0d50: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a0d60: 85 10 00 00 c3 6c 01 00      	call 0x16cc3
   a0d68: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a0d70: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a0d78: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a0d80: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0d90: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0d98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0da0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a0da8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a0db0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a0db8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a0dc0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a0dc8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a0dd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0dd8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a0de0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a0df0: 85 10 00 00 12 7a 01 00      	call 0x17a12
   a0df8: 15 00 4a 00 00 00 00 00      	jeq r0, 0x0, +0x4a <.text+0xa0f30>
   a0e00: 05 00 d8 ff 00 00 00 00      	ja -0x28 <.text+0xa0ba8>
   a0e08: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a0e10: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a0e18: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a0e20: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a0e28: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a0e30: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a0e38: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a0e40: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a0e48: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a0e50: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a0e58: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a0e60: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a0e68: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a0e78: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a0e80: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a0e88: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a0e90: 62 0a 00 ff c0 09 00 00      	stw [r10 - 0x100], 0x9c0
   a0e98: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a0ea0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a0ea8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0eb0: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   a0eb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a0ec0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a0ec8: 85 10 00 00 8c f5 01 00      	call 0x1f58c
   a0ed0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   a0ed8: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   a0ee0: 05 00 9c 00 00 00 00 00      	ja +0x9c <.text+0xa12a8>
   a0ee8: 1f 31 00 00 00 00 00 00      	sub64 r1, r3
   a0ef0: 7b 12 50 00 00 00 00 00      	stxdw [r2 + 0x50], r1
   a0ef8: 79 25 48 00 00 00 00 00      	ldxdw r5, [r2 + 0x48]
   a0f00: bf 51 00 00 00 00 00 00      	mov64 r1, r5
   a0f08: 0f 41 00 00 00 00 00 00      	add64 r1, r4
   a0f10: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   a0f18: ad 51 01 00 00 00 00 00      	jlt r1, r5, +0x1 <.text+0xa0e08>
   a0f20: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   a0f28: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   a0f30: 55 03 3f 00 00 00 00 00      	jne r3, 0x0, +0x3f <.text+0xa1010>
   a0f38: 7b 12 48 00 00 00 00 00      	stxdw [r2 + 0x48], r1
   a0f40: 79 25 58 00 00 00 00 00      	ldxdw r5, [r2 + 0x58]
   a0f48: bf 51 00 00 00 00 00 00      	mov64 r1, r5
   a0f50: 0f 41 00 00 00 00 00 00      	add64 r1, r4
   a0f58: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   a0f60: ad 51 01 00 00 00 00 00      	jlt r1, r5, +0x1 <.text+0xa0e50>
   a0f68: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   a0f70: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   a0f78: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0xa0e68>
   a0f80: 05 00 6a 00 00 00 00 00      	ja +0x6a <.text+0xa11b8>
   a0f88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0f90: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a0f98: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a0fa8: 85 10 00 00 7a 6c 01 00      	call 0x16c7a
   a0fb0: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a0fb8: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a0fc0: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a0fc8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a0fd8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a0fe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a0fe8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a0ff0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a0ff8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a1000: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a1008: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a1010: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a1018: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a1020: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a1028: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a1038: 85 10 00 00 c9 79 01 00      	call 0x179c9
   a1040: 15 00 55 00 00 00 00 00      	jeq r0, 0x0, +0x55 <.text+0xa11d0>
   a1048: 05 00 8f ff 00 00 00 00      	ja -0x71 <.text+0xa0ba8>
   a1050: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a1058: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a1060: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a1068: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a1070: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a1078: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a1080: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a1088: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a1090: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a1098: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a10a0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a10a8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a10b0: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a10c0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a10c8: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a10d0: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a10d8: 62 0a 00 ff c5 09 00 00      	stw [r10 - 0x100], 0x9c5
   a10e0: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a10e8: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a10f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a10f8: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   a1100: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a1108: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a1110: 85 10 00 00 43 f5 01 00      	call 0x1f543
   a1118: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   a1120: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   a1128: 05 00 53 00 00 00 00 00      	ja +0x53 <.text+0xa12a8>
   a1130: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1138: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   a1140: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a1150: 85 10 00 00 45 6c 01 00      	call 0x16c45
   a1158: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   a1160: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   a1168: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   a1170: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a1180: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a1188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1190: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   a1198: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   a11a0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   a11a8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   a11b0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   a11b8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a11c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a11c8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   a11d0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a11e0: 85 10 00 00 94 79 01 00      	call 0x17994
   a11e8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xa10d8>
   a11f0: 05 00 5a ff 00 00 00 00      	ja -0xa6 <.text+0xa0ba8>
   a11f8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a1200: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a1208: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a1210: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a1218: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a1220: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a1228: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a1230: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a1238: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a1240: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a1248: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a1250: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a1258: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a1268: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a1270: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a1278: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a1280: 62 0a 00 ff ca 09 00 00      	stw [r10 - 0x100], 0x9ca
   a1288: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a1290: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a1298: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a12a0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   a12a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a12b0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a12b8: 85 10 00 00 0e f5 01 00      	call 0x1f50e
   a12c0: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   a12c8: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   a12d0: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0xa12a8>
   a12d8: 7b 12 58 00 00 00 00 00      	stxdw [r2 + 0x58], r1
   a12e0: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   a12e8: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0xa12a8>
   a12f0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a12f8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a1300: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a1308: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a1310: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a1318: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a1320: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   a1328: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   a1330: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a1338: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a1340: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a1348: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a1350: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a1360: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   a1368: 62 0a 80 ff 88 17 00 00      	stw [r10 - 0x80], 0x1788
   a1370: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   a1378: 62 0a 00 ff cf 09 00 00      	stw [r10 - 0x100], 0x9cf
   a1380: 7a 0a f8 fe 18 00 00 00      	stdw [r10 - 0x108], 0x18
   a1388: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   a1390: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a1398: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   a13a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a13a8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   a13b0: 85 10 00 00 ef f4 01 00      	call 0x1f4ef
   a13b8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   a13c0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   a13c8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a13d0: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   a13d8: 95 00 00 00 00 00 00 00      	exit
