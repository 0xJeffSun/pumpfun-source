   19ec8: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   19ed0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   19ed8: 7b 3a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r3
   19ee0: 18 01 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b683a
   19ef0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   19ef8: 7a 0a 50 fe 20 00 00 00      	stdw [r10 - 0x1b0], 0x20
   19f00: 7a 0a 40 fe 0d 00 00 00      	stdw [r10 - 0x1c0], 0xd
   19f08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   19f10: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   19f18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   19f20: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   19f28: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   19f30: 18 04 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b79df
   19f40: 85 10 00 00 ee 1b 03 00      	call 0x31bee
   19f48: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   19f50: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   19f58: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   19f60: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   19f68: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   19f70: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   19f78: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   19f80: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   19f88: 79 87 00 00 00 00 00 00      	ldxdw r7, [r8 + 0x0]
   19f90: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   19f98: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   19fa0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   19fa8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   19fb0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   19fb8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   19fc0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   19fc8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   19fd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   19fd8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   19fe0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   19fe8: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   19ff0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   19ff8: 85 10 00 00 cf 32 03 00      	call 0x332cf
   1a000: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1a008: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1a010: 55 00 8b 00 00 00 00 00      	jne r0, 0x0, +0x8b <.text+0x1a350>
   1a018: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   1a020: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   1a028: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   1a038: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1a040: 85 10 00 00 c6 32 03 00      	call 0x332c6
   1a048: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1a050: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1a058: 15 00 50 00 00 00 00 00      	jeq r0, 0x0, +0x50 <.text+0x1a1c0>
   1a060: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a068: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1a070: 18 02 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f64
   1a080: 85 10 00 00 5f 7a 02 00      	call 0x27a5f
   1a088: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   1a090: 7a 0a c0 ff 01 00 00 00      	stdw [r10 - 0x40], 0x1
   1a098: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   1a0a0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1a0b0: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   1a0b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a0c0: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   1a0c8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   1a0d0: 72 0a 70 fe 03 00 00 00      	stb [r10 - 0x190], 0x3
   1a0d8: 7a 0a 68 fe 20 00 00 00      	stdw [r10 - 0x198], 0x20
   1a0e0: 7a 0a 48 fe 00 00 00 00      	stdw [r10 - 0x1b8], 0x0
   1a0e8: 7a 0a 38 fe 00 00 00 00      	stdw [r10 - 0x1c8], 0x0
   1a0f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a0f8: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   1a100: 18 01 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f64
   1a110: 85 10 00 00 ae 87 02 00      	call 0x287ae
   1a118: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x1a008>
   1a120: 05 00 81 00 00 00 00 00      	ja +0x81 <.text+0x1a410>
   1a128: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   1a130: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   1a138: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   1a140: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   1a148: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   1a150: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1a158: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1a160: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   1a168: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1a170: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1a178: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1a180: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1a188: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1a198: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a1a0: 62 0a 80 ff d3 17 00 00      	stw [r10 - 0x80], 0x17d3
   1a1a8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   1a1b0: 62 0a 00 ff ba 01 00 00      	stw [r10 - 0x100], 0x1ba
   1a1b8: 7a 0a f8 fe 1e 00 00 00      	stdw [r10 - 0x108], 0x1e
   1a1c0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   1a1c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a1d0: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   1a1d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a1e0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   1a1e8: 85 10 00 00 28 03 03 00      	call 0x30328
   1a1f0: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   1a1f8: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   1a200: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   1a208: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   1a210: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   1a218: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   1a220: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   1a228: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a230: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   1a238: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   1a240: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   1a250: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   1a258: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   1a268: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1a270: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   1a280: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1a288: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   1a298: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1a2a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a2a8: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   1a2b0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   1a2b8: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   1a2c0: 85 10 00 00 de 03 03 00      	call 0x303de
   1a2c8: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   1a2d0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   1a2d8: 05 00 86 00 00 00 00 00      	ja +0x86 <.text+0x1a5f0>
   1a2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a2e8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   1a2f0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   1a2f8: 85 10 00 00 35 11 03 00      	call 0x31135
   1a300: 79 a7 f8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x108]
   1a308: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   1a310: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   1a318: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   1a328: 1d 32 01 00 00 00 00 00      	jeq r2, r3, +0x1 <.text+0x1a218>
   1a330: 05 00 7f 00 00 00 00 00      	ja +0x7f <.text+0x1a610>
   1a338: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   1a340: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
   1a348: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   1a350: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   1a358: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a360: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   1a368: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a370: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   1a378: 85 10 00 00 b9 01 01 00      	call 0x101b9
   1a380: 71 a1 d5 fe 00 00 00 00      	ldxb r1, [r10 - 0x12b]
   1a388: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x1a278>
   1a390: 05 00 7e 00 00 00 00 00      	ja +0x7e <.text+0x1a668>
   1a398: 79 a8 40 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1c0]
   1a3a0: 79 a9 38 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1c8]
   1a3a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a3b0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   1a3b8: 18 02 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f64
   1a3c8: 85 10 00 00 f6 79 02 00      	call 0x279f6
   1a3d0: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   1a3d8: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   1a3e0: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   1a3e8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1a3f8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   1a400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a408: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1a410: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   1a418: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   1a420: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   1a428: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   1a430: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   1a438: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a440: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   1a448: 18 01 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f64
   1a458: 85 10 00 00 45 87 02 00      	call 0x28745
   1a460: 15 00 6a 00 00 00 00 00      	jeq r0, 0x0, +0x6a <.text+0x1a698>
   1a468: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x1a410>
   1a470: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a478: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1a480: 18 02 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f64
   1a490: 85 10 00 00 dd 79 02 00      	call 0x279dd
   1a498: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   1a4a0: 7a 0a c0 ff 01 00 00 00      	stdw [r10 - 0x40], 0x1
   1a4a8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   1a4b0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1a4c0: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   1a4c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a4d0: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   1a4d8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   1a4e0: 72 0a 70 fe 03 00 00 00      	stb [r10 - 0x190], 0x3
   1a4e8: 7a 0a 68 fe 20 00 00 00      	stdw [r10 - 0x198], 0x20
   1a4f0: 7a 0a 48 fe 00 00 00 00      	stdw [r10 - 0x1b8], 0x0
   1a4f8: 7a 0a 38 fe 00 00 00 00      	stdw [r10 - 0x1c8], 0x0
   1a500: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a508: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   1a510: 18 01 00 00 64 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f64
   1a520: 85 10 00 00 2c 87 02 00      	call 0x2872c
   1a528: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x1a460>
   1a530: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   1a538: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   1a540: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   1a550: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   1a558: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   1a568: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   1a578: 85 10 00 00 13 25 03 00      	call 0x32513
   1a580: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   1a588: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   1a590: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   1a598: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   1a5a0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   1a5a8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1a5b0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1a5b8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   1a5c0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1a5c8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1a5d0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1a5d8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1a5e0: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1a5f0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a5f8: 62 0a 80 ff d3 17 00 00      	stw [r10 - 0x80], 0x17d3
   1a600: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   1a608: 62 0a 00 ff b5 01 00 00      	stw [r10 - 0x100], 0x1b5
   1a610: 7a 0a f8 fe 1e 00 00 00      	stdw [r10 - 0x108], 0x1e
   1a618: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   1a620: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a628: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   1a630: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a638: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   1a640: 85 10 00 00 9d 02 03 00      	call 0x3029d
   1a648: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   1a650: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   1a658: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   1a660: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   1a668: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   1a670: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   1a678: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   1a680: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a688: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   1a690: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   1a698: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   1a6a0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   1a6a8: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   1a6b0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1a6b8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   1a6c0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1a6c8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   1a6d0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1a6d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a6e0: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   1a6e8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   1a6f0: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   1a6f8: 85 10 00 00 57 03 03 00      	call 0x30357
   1a700: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   1a708: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   1a710: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   1a718: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   1a720: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   1a728: 95 00 00 00 00 00 00 00      	exit
   1a730: 7b 7a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r7
   1a738: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a740: 7b 2a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r2
   1a748: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a750: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   1a758: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a760: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   1a768: 85 10 00 00 89 02 03 00      	call 0x30289
   1a770: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   1a778: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   1a780: 05 00 f1 ff 00 00 00 00      	ja -0xf <.text+0x1a5f0>
   1a788: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a790: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   1a798: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   1a7a0: b7 03 00 00 a0 00 00 00      	mov64 r3, 0xa0
   1a7a8: 85 10 00 00 cc 31 03 00      	call 0x331cc
   1a7b0: 05 00 28 00 00 00 00 00      	ja +0x28 <.text+0x1a7d8>
   1a7b8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1a7c0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   1a7c8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1a7d0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   1a7d8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1a7e0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1a7e8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   1a7f0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   1a7f8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   1a800: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1a808: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   1a810: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1a818: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1a828: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   1a830: 62 0a 80 ff d3 17 00 00      	stw [r10 - 0x80], 0x17d3
   1a838: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   1a840: 62 0a 00 ff c1 01 00 00      	stw [r10 - 0x100], 0x1c1
   1a848: 7a 0a f8 fe 1e 00 00 00      	stdw [r10 - 0x108], 0x1e
   1a850: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   1a858: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1a860: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   1a868: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1a870: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   1a878: 85 10 00 00 56 02 03 00      	call 0x30256
   1a880: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   1a888: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   1a890: 55 09 05 00 00 00 00 00      	jne r9, 0x0, +0x5 <.text+0x1a7a0>
   1a898: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
   1a8a0: 15 03 00 00 02 00 00 00      	jeq r3, 0x2, +0x0 <.text+0x1a788>
   1a8a8: 71 83 50 00 00 00 00 00      	ldxb r3, [r8 + 0x50]
   1a8b0: 55 03 05 00 00 00 00 00      	jne r3, 0x0, +0x5 <.text+0x1a7c0>
   1a8b8: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0x1a7c0>
   1a8c0: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
   1a8c8: 15 03 00 00 02 00 00 00      	jeq r3, 0x2, +0x0 <.text+0x1a7b0>
   1a8d0: 71 83 38 00 00 00 00 00      	ldxb r3, [r8 + 0x38]
   1a8d8: 55 03 00 00 00 00 00 00      	jne r3, 0x0, +0x0 <.text+0x1a7c0>
   1a8e0: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   1a8e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   1a8f0: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   1a8f8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   1a900: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   1a908: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   1a910: 05 00 c2 ff 00 00 00 00      	ja -0x3e <.text+0x1a608>
