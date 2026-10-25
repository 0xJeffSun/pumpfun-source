   64b80: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   64b88: 62 0a 98 ff d7 17 00 00      	stw [r10 - 0x68], 0x17d7
   64b90: 72 0a 50 ff 02 00 00 00      	stb [r10 - 0xb0], 0x2
   64b98: 62 0a 18 ff 6d 01 00 00      	stw [r10 - 0xe8], 0x16d
   64ba0: 7a 0a 10 ff 1f 00 00 00      	stdw [r10 - 0xf0], 0x1f
   64ba8: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   64bb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64bb8: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   64bc0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64bc8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   64bd0: 85 10 00 00 eb 6d 02 00      	call 0x26deb
   64bd8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   64be0: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   64be8: 05 00 c6 00 00 00 00 00      	ja +0xc6 <.text+0x65100>
   64bf0: 15 07 01 00 63 01 00 00      	jeq r7, 0x163, +0x1 <.text+0x64ae0>
   64bf8: 05 00 3c 00 00 00 00 00      	ja +0x3c <.text+0x64cc0>
   64c00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64c08: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   64c10: 18 02 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e54
   64c20: 85 10 00 00 eb e4 01 00      	call 0x1e4eb
   64c28: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   64c30: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   64c38: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   64c40: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   64c50: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   64c58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64c60: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   64c68: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   64c70: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   64c78: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   64c80: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   64c88: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   64c90: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64c98: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   64ca0: 18 01 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e54
   64cb0: 85 10 00 00 3a f2 01 00      	call 0x1f23a
   64cb8: 15 00 2d 00 00 00 00 00      	jeq r0, 0x0, +0x2d <.text+0x64d08>
   64cc0: 05 00 a4 ff 00 00 00 00      	ja -0x5c <.text+0x648c8>
   64cc8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   64cd0: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   64cd8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   64ce0: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   64ce8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   64cf0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   64cf8: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   64d00: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   64d08: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   64d10: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   64d18: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   64d20: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   64d28: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   64d38: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   64d40: 62 0a 98 ff d7 17 00 00      	stw [r10 - 0x68], 0x17d7
   64d48: 72 0a 50 ff 02 00 00 00      	stb [r10 - 0xb0], 0x2
   64d50: 62 0a 18 ff 6e 01 00 00      	stw [r10 - 0xe8], 0x16e
   64d58: 7a 0a 10 ff 1f 00 00 00      	stdw [r10 - 0xf0], 0x1f
   64d60: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   64d68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64d70: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   64d78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64d80: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   64d88: 85 10 00 00 b4 6d 02 00      	call 0x26db4
   64d90: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   64d98: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   64da0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64da8: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   64db0: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   64db8: b7 05 00 00 a5 00 00 00      	mov64 r5, 0xa5
   64dc0: 85 10 00 00 cf 39 ff ff      	call -0xc631
   64dc8: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   64dd0: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   64dd8: 05 00 88 00 00 00 00 00      	ja +0x88 <.text+0x65100>
   64de0: 71 98 6c 00 00 00 00 00      	ldxb r8, [r9 + 0x6c]
   64de8: 55 08 2a 00 01 00 00 00      	jne r8, 0x1, +0x2a <.text+0x64e20>
   64df0: 15 07 02 00 a5 00 00 00      	jeq r7, 0xa5, +0x2 <.text+0x64ce8>
   64df8: 71 97 a5 00 00 00 00 00      	ldxb r7, [r9 + 0xa5]
   64e00: 55 07 63 00 02 00 00 00      	jne r7, 0x2, +0x63 <.text+0x65000>
   64e08: 79 91 40 00 00 00 00 00      	ldxdw r1, [r9 + 0x40]
   64e10: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   64e18: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   64e20: 05 00 81 00 00 00 00 00      	ja +0x81 <.text+0x65110>
   64e28: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   64e30: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   64e38: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   64e40: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   64e48: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   64e50: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   64e58: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   64e60: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   64e68: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   64e70: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   64e78: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   64e80: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   64e88: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   64e98: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   64ea0: 62 0a 98 ff d7 17 00 00      	stw [r10 - 0x68], 0x17d7
   64ea8: 72 0a 50 ff 02 00 00 00      	stb [r10 - 0xb0], 0x2
   64eb0: 62 0a 18 ff 73 01 00 00      	stw [r10 - 0xe8], 0x173
   64eb8: 7a 0a 10 ff 1f 00 00 00      	stdw [r10 - 0xf0], 0x1f
   64ec0: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   64ec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64ed0: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   64ed8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64ee0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   64ee8: 85 10 00 00 88 6d 02 00      	call 0x26d88
   64ef0: 79 a3 90 fe 00 00 00 00      	ldxdw r3, [r10 - 0x170]
   64ef8: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   64f00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64f08: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   64f10: b7 04 00 00 63 01 00 00      	mov64 r4, 0x163
   64f18: b7 05 00 00 63 01 00 00      	mov64 r5, 0x163
   64f20: 85 10 00 00 a3 39 ff ff      	call -0xc65d
   64f28: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   64f30: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   64f38: 05 00 5c 00 00 00 00 00      	ja +0x5c <.text+0x65100>
   64f40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64f48: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   64f50: 18 02 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e54
   64f60: 85 10 00 00 83 e4 01 00      	call 0x1e483
   64f68: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   64f70: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   64f78: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   64f80: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   64f90: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   64f98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64fa0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   64fa8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   64fb0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   64fb8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   64fc0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   64fc8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   64fd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64fd8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   64fe0: 18 01 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e54
   64ff0: 85 10 00 00 d2 f1 01 00      	call 0x1f1d2
   64ff8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x64ee8>
   65000: 05 00 3c ff 00 00 00 00      	ja -0xc4 <.text+0x648c8>
   65008: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   65010: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   65018: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   65020: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   65028: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   65030: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   65038: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   65040: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   65048: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   65050: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   65058: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   65060: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   65068: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   65078: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   65080: 62 0a 98 ff d7 17 00 00      	stw [r10 - 0x68], 0x17d7
   65088: 72 0a 50 ff 02 00 00 00      	stb [r10 - 0xb0], 0x2
   65090: 62 0a 18 ff 74 01 00 00      	stw [r10 - 0xe8], 0x174
   65098: 7a 0a 10 ff 1f 00 00 00      	stdw [r10 - 0xf0], 0x1f
   650a0: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   650a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   650b0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   650b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   650c0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   650c8: 85 10 00 00 4c 6d 02 00      	call 0x26d4c
   650d0: 79 a3 d0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x130]
   650d8: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   650e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   650e8: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   650f0: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   650f8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   65100: 85 10 00 00 ee 36 ff ff      	call -0xc912
   65108: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   65110: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   65118: 05 00 20 00 00 00 00 00      	ja +0x20 <.text+0x65100>
   65120: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   65128: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   65130: 18 02 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e54
   65140: 85 10 00 00 47 e4 01 00      	call 0x1e447
   65148: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   65150: 07 01 00 00 38 ff ff ff      	add64 r1, -0xc8
   65158: 18 02 00 00 54 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e54
   65168: 85 10 00 00 f9 4a ff ff      	call -0xb507
   65170: 18 01 00 00 d6 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6ed6
   65180: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   65188: 72 0a 50 ff 02 00 00 00      	stb [r10 - 0xb0], 0x2
   65190: 62 0a 18 ff 7a 01 00 00      	stw [r10 - 0xe8], 0x17a
   65198: 7a 0a 10 ff 1f 00 00 00      	stdw [r10 - 0xf0], 0x1f
   651a0: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   651a8: 62 0a 98 ff d7 17 00 00      	stw [r10 - 0x68], 0x17d7
   651b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   651b8: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   651c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   651c8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   651d0: 85 10 00 00 2b 6d 02 00      	call 0x26d2b
   651d8: 79 a3 b0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x150]
   651e0: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   651e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   651f0: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   651f8: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   65200: b7 05 00 00 02 00 00 00      	mov64 r5, 0x2
   65208: 85 10 00 00 cd 36 ff ff      	call -0xc933
   65210: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   65218: 79 a2 a0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x160]
   65220: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   65228: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   65230: 95 00 00 00 00 00 00 00      	exit
