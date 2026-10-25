   7e0b0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   7e0b8: 57 02 00 00 ff 00 00 00      	and64 r2, 0xff
   7e0c0: 55 02 1d 00 00 00 00 00      	jne r2, 0x0, +0x1d <.text+0x7e090>
   7e0c8: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   7e0d0: 55 04 74 00 00 00 00 00      	jne r4, 0x0, +0x74 <.text+0x7e358>
   7e0d8: 57 03 00 00 ff 00 00 00      	and64 r3, 0xff
   7e0e0: 15 03 72 00 00 00 00 00      	jeq r3, 0x0, +0x72 <.text+0x7e358>
   7e0e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e0f0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7e0f8: 18 02 00 00 c4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5dc4
   7e108: 85 10 00 00 4e b2 01 00      	call 0x1b24e
   7e110: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7e118: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7e120: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7e128: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7e138: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7e140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e148: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7e150: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7e158: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7e160: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7e168: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7e170: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7e178: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e180: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7e188: 18 01 00 00 c4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5dc4
   7e198: 85 10 00 00 9d bf 01 00      	call 0x1bf9d
   7e1a0: 15 00 3f 00 00 00 00 00      	jeq r0, 0x0, +0x3f <.text+0x7e280>
   7e1a8: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x7e150>
   7e1b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e1b8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7e1c0: 18 02 00 00 b0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5db0
   7e1d0: 85 10 00 00 35 b2 01 00      	call 0x1b235
   7e1d8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7e1e0: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7e1e8: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7e1f0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7e200: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7e208: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e210: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7e218: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7e220: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7e228: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7e230: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7e238: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7e240: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e248: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7e250: 18 01 00 00 b0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5db0
   7e260: 85 10 00 00 84 bf 01 00      	call 0x1bf84
   7e268: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x7e1a0>
   7e270: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7e278: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7e280: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   7e290: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   7e298: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   7e2a8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   7e2b8: 85 10 00 00 6b 5d 02 00      	call 0x25d6b
   7e2c0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7e2c8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7e2d0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7e2d8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7e2e0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7e2e8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7e2f0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7e2f8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7e300: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7e308: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7e310: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7e318: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7e320: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   7e330: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7e338: 62 0a 80 ff 75 17 00 00      	stw [r10 - 0x80], 0x1775
   7e340: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7e348: 62 0a 00 ff 95 00 00 00      	stw [r10 - 0x100], 0x95
   7e350: 7a 0a f8 fe 1d 00 00 00      	stdw [r10 - 0x108], 0x1d
   7e358: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7e360: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e368: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   7e370: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e378: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7e380: 85 10 00 00 f5 3a 02 00      	call 0x23af5
   7e388: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   7e390: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   7e398: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0x7e358>
   7e3a0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7e3a8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7e3b0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7e3b8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7e3c0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7e3c8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7e3d0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7e3d8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7e3e0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7e3e8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7e3f0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7e3f8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7e400: 18 01 00 00 3b 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b723b
   7e410: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7e418: 62 0a 80 ff ce 17 00 00      	stw [r10 - 0x80], 0x17ce
   7e420: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7e428: 62 0a 00 ff 96 00 00 00      	stw [r10 - 0x100], 0x96
   7e430: 7a 0a f8 fe 1d 00 00 00      	stdw [r10 - 0x108], 0x1d
   7e438: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7e440: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7e448: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   7e450: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7e458: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7e460: 85 10 00 00 d9 3a 02 00      	call 0x23ad9
   7e468: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   7e470: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   7e478: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   7e480: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   7e488: 95 00 00 00 00 00 00 00      	exit
