   a2188: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   a2190: 79 23 78 00 00 00 00 00      	ldxdw r3, [r2 + 0x78]
   a2198: 79 24 70 00 00 00 00 00      	ldxdw r4, [r2 + 0x70]
   a21a0: bf 41 00 00 00 00 00 00      	mov64 r1, r4
   a21a8: 0f 31 00 00 00 00 00 00      	add64 r1, r3
   a21b0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   a21b8: ad 41 01 00 00 00 00 00      	jlt r1, r4, +0x1 <.text+0xa20a8>
   a21c0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   a21c8: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   a21d0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xa20d0>
   a21d8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   a21e0: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   a21e8: 05 00 3f 00 00 00 00 00      	ja +0x3f <.text+0xa22c8>
   a21f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a21f8: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   a2200: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   a2210: 85 10 00 00 2d 6a 01 00      	call 0x16a2d
   a2218: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   a2220: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   a2228: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   a2230: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   a2240: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   a2248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a2250: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   a2258: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   a2260: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   a2268: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   a2270: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   a2278: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   a2280: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a2288: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   a2290: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   a22a0: 85 10 00 00 7c 77 01 00      	call 0x1777c
   a22a8: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xa21e0>
   a22b0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   a22b8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   a22c0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   a22d0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   a22d8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   a22e8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   a22f8: 85 10 00 00 63 15 02 00      	call 0x21563
   a2300: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   a2308: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   a2310: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   a2318: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   a2320: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   a2328: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   a2330: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   a2338: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   a2340: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   a2348: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   a2350: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   a2358: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   a2360: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
   a2370: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   a2378: 62 0a 88 ff 88 17 00 00      	stw [r10 - 0x78], 0x1788
   a2380: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   a2388: 62 0a 08 ff 02 0a 00 00      	stw [r10 - 0xf8], 0xa02
   a2390: 7a 0a 00 ff 18 00 00 00      	stdw [r10 - 0x100], 0x18
   a2398: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   a23a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   a23a8: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   a23b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   a23b8: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   a23c0: 85 10 00 00 ed f2 01 00      	call 0x1f2ed
   a23c8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   a23d0: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   a23d8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   a23e0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   a23e8: 95 00 00 00 00 00 00 00      	exit
