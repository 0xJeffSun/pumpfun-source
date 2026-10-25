  17fe88: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
  17fe90: 85 10 00 00 ef 66 00 00      	call 0x66ef
  17fe98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fea0: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
  17fea8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  17feb0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
  17feb8: 85 10 00 00 ea 66 00 00      	call 0x66ea
  17fec0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fec8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
  17fed0: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
  17fed8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
  17fee0: 85 10 00 00 e5 66 00 00      	call 0x66e5
  17fee8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fef0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
  17fef8: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
  17ff00: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
  17ff08: 85 10 00 00 e0 66 00 00      	call 0x66e0
  17ff10: 79 91 10 01 00 00 00 00      	ldxdw r1, [r9 + 0x110]
  17ff18: 79 92 08 01 00 00 00 00      	ldxdw r2, [r9 + 0x108]
  17ff20: 7b 2a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r2
  17ff28: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
  17ff30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17ff38: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
  17ff40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  17ff48: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
  17ff50: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  17ff58: 79 a3 80 fe 00 00 00 00      	ldxdw r3, [r10 - 0x180]
  17ff60: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
  17ff68: 85 10 00 00 b8 40 00 00      	call 0x40b8
  17ff70: b7 06 00 00 02 00 00 00      	mov64 r6, 0x2
  17ff78: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
  17ff88: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
  17ff90: 1d 12 08 00 00 00 00 00      	jeq r2, r1, +0x8 <custom_panic+0x28d20>
  17ff98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17ffa0: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
  17ffa8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  17ffb0: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
  17ffb8: 85 10 00 00 7f 37 00 00      	call 0x377f
  17ffc0: 79 a8 c0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x140]
  17ffc8: 79 a7 b8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x148]
  17ffd0: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
  17ffd8: 15 08 05 00 00 00 00 00      	jeq r8, 0x0, +0x5 <custom_panic+0x28d50>
  17ffe0: 27 08 00 00 22 00 00 00      	mul64 r8, 0x22
  17ffe8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
  17fff0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
  17fff8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  180000: 85 10 00 00 16 ae ff ff      	call -0x51ea
  180008: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
  180010: 15 02 03 00 00 00 00 00      	jeq r2, 0x0, +0x3 <custom_panic+0x28d78>
  180018: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
  180020: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  180028: 85 10 00 00 11 ae ff ff      	call -0x51ef
  180030: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  180038: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
  180040: 85 10 00 00 d9 f9 ff ff      	call -0x627
  180048: bf 91 00 00 00 00 00 00      	mov64 r1, r9
  180050: 85 10 00 00 54 fb ff ff      	call -0x4ac
  180058: 79 98 28 00 00 00 00 00      	ldxdw r8, [r9 + 0x28]
  180060: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
  180068: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
  180070: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
  180078: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  180080: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <custom_panic+0x28e08>
  180088: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
  180090: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
  180098: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  1800a0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x28e08>
  1800a8: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
  1800b0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
  1800b8: 85 10 00 00 ff ad ff ff      	call -0x5201
  1800c0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
  1800c8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
  1800d0: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
  1800d8: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <custom_panic+0x28e68>
  1800e0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
  1800e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
  1800f0: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
  1800f8: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <custom_panic+0x28e68>
  180100: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  180108: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
  180110: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
  180118: 85 10 00 00 f3 ad ff ff      	call -0x520d
  180120: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
  180128: 7b 71 08 00 00 00 00 00      	stxdw [r1 + 0x8], r7
  180130: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
  180138: 95 00 00 00 00 00 00 00      	exit
