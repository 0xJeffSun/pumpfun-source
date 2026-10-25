  185ed0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  185ed8: 18 01 00 00 03 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7ffffffffffffffd
  185ee8: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
  185ef0: 15 09 4f 00 63 01 00 00      	jeq r9, 0x163, +0x4f <custom_panic+0x2eeb8>
  185ef8: a5 09 4e 00 a5 00 00 00      	jlt r9, 0xa5, +0x4e <custom_panic+0x2eeb8>
  185f00: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
  185f08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  185f10: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
  185f18: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  185f20: b7 03 00 00 a5 00 00 00      	mov64 r3, 0xa5
  185f28: 85 10 00 00 8b 1c 00 00      	call 0x1c8b
  185f30: 79 a3 60 ff 00 00 00 00      	ldxdw r3, [r10 - 0xa0]
  185f38: 79 a4 58 ff 00 00 00 00      	ldxdw r4, [r10 - 0xa8]
  185f40: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
  185f48: 61 a8 d8 ff 00 00 00 00      	ldxw r8, [r10 - 0x28]
  185f50: 15 08 43 00 02 00 00 00      	jeq r8, 0x2, +0x43 <custom_panic+0x2eeb8>
  185f58: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
  185f60: 7b 3a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r3
  185f68: 7b 4a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r4
  185f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  185f78: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
  185f80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  185f88: 07 02 00 00 68 ff ff ff      	add64 r2, -0x98
  185f90: b7 03 00 00 54 00 00 00      	mov64 r3, 0x54
  185f98: 85 10 00 00 ce 5a 00 00      	call 0x5ace
  185fa0: 79 a1 bd ff 00 00 00 00      	ldxdw r1, [r10 - 0x43]
  185fa8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
  185fb0: 79 a1 c5 ff 00 00 00 00      	ldxdw r1, [r10 - 0x3b]
  185fb8: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
  185fc0: 79 a1 cd ff 00 00 00 00      	ldxdw r1, [r10 - 0x33]
  185fc8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
  185fd0: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
  185fd8: 63 1a ef fe 00 00 00 00      	stxw [r10 - 0x111], r1
  185fe0: 79 a1 dc ff 00 00 00 00      	ldxdw r1, [r10 - 0x24]
  185fe8: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
  185ff0: 79 a1 e4 ff 00 00 00 00      	ldxdw r1, [r10 - 0x1c]
  185ff8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
  186000: 79 a1 ec ff 00 00 00 00      	ldxdw r1, [r10 - 0x14]
  186008: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
  186010: 79 a1 f4 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc]
  186018: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
  186020: 61 a1 fc ff 00 00 00 00      	ldxw r1, [r10 - 0x4]
  186028: 63 1a d0 fe 00 00 00 00      	stxw [r10 - 0x130], r1
  186030: 71 a1 bc ff 00 00 00 00      	ldxb r1, [r10 - 0x44]
  186038: 55 01 05 00 00 00 00 00      	jne r1, 0x0, +0x5 <custom_panic+0x2edb0>
  186040: 18 01 00 00 09 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7ffffffffffffff7
  186050: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
  186058: 79 a4 f8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x208]
  186060: 05 00 21 00 00 00 00 00      	ja +0x21 <custom_panic+0x2eeb8>
  186068: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
  186070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  186078: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
  186080: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  186088: 07 02 00 00 f8 fe ff ff      	add64 r2, -0x108
  186090: b7 03 00 00 54 00 00 00      	mov64 r3, 0x54
  186098: 85 10 00 00 ae 5a 00 00      	call 0x5aae
  1860a0: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
  1860a8: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
  1860b0: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
  1860b8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
  1860c0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
  1860c8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
  1860d0: 61 a1 ef fe 00 00 00 00      	ldxw r1, [r10 - 0x111]
  1860d8: 63 1a 4f fe 00 00 00 00      	stxw [r10 - 0x1b1], r1
  1860e0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
  1860e8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
  1860f0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
  1860f8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
  186100: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
  186108: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
  186110: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
  186118: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
  186120: 61 a1 d0 fe 00 00 00 00      	ldxw r1, [r10 - 0x130]
  186128: 63 1a 30 fe 00 00 00 00      	stxw [r10 - 0x1d0], r1
  186130: 15 09 16 00 a5 00 00 00      	jeq r9, 0xa5, +0x16 <custom_panic+0x2ef30>
