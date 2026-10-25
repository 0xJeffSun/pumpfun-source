  15fdd0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  15fdd8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
  15fde0: a5 01 27 00 08 00 00 00      	jlt r1, 0x8, +0x27 <custom_panic+0x8c68>
  15fde8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
  15fdf0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
  15fdf8: 18 03 00 00 a7 e8 e8 b1 00 00 00 00 c8 6c 72 7f      	lddw r3, 0x7f726cc8b1e8e8a7
  15fe08: 1d 31 50 00 00 00 00 00      	jeq r1, r3, +0x50 <custom_panic+0x8dd8>
  15fe10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  15fe18: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
  15fe20: 18 02 00 00 14 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f14
  15fe30: 85 10 00 00 1f 7d 00 00      	call 0x7d1f
  15fe38: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
  15fe40: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
  15fe48: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
  15fe50: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
  15fe60: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
  15fe68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  15fe70: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  15fe78: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  15fe80: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
  15fe88: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
  15fe90: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
  15fe98: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
  15fea0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  15fea8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
  15feb0: 18 01 00 00 14 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f14
  15fec0: 85 10 00 00 d5 7e 00 00      	call 0x7ed5
  15fec8: 15 00 11 00 00 00 00 00      	jeq r0, 0x0, +0x11 <custom_panic+0x8ca0>
  15fed0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
  15fed8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
  15fee0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
  15fef0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
  15fef8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
  15ff08: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
  15ff18: 85 10 00 00 df 99 00 00      	call 0x99df
  15ff20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  15ff28: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
  15ff30: b7 02 00 00 b9 0b 00 00      	mov64 r2, 0xbb9
  15ff38: 85 10 00 00 7c 7e 00 00      	call 0x7e7c
  15ff40: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
  15ff48: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
  15ff50: 05 00 23 00 00 00 00 00      	ja +0x23 <custom_panic+0x8db8>
  15ff58: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
  15ff60: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
  15ff68: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
  15ff70: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
  15ff78: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  15ff80: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
  15ff88: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
  15ff90: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
  15ff98: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
  15ffa0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
  15ffa8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
  15ffb0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
  15ffb8: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b72c5
  15ffc8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
  15ffd0: 62 0a 88 ff ba 0b 00 00      	stw [r10 - 0x78], 0xbba
  15ffd8: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
  15ffe0: 62 0a 08 ff 17 07 00 00      	stw [r10 - 0xf8], 0x717
  15ffe8: 7a 0a 00 ff 18 00 00 00      	stdw [r10 - 0x100], 0x18
  15fff0: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
  15fff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  160000: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
  160008: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  160010: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
  160018: 85 10 00 00 62 77 00 00      	call 0x7762
  160020: 79 a3 e8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x118]
  160028: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
  160030: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  160038: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
  160040: 18 04 00 00 a1 7a 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7aa1
  160050: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
  160058: 85 10 00 00 1a 45 fd ff      	call -0x2bae6
  160060: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
  160068: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
  160070: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
  160078: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  160080: 72 06 37 04 02 00 00 00      	stb [r6 + 0x437], 0x2
  160088: 95 00 00 00 00 00 00 00      	exit
  160090: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  160098: 85 10 00 00 01 00 00 00      	call 0x1
  1600a0: 05 00 fc ff 00 00 00 00      	ja -0x4 <custom_panic+0x8dd0>
