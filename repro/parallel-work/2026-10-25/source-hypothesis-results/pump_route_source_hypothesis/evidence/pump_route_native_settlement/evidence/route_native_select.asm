   5cbe0: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   5cbe8: 85 10 00 00 29 87 00 00      	call 0x8729
   5cbf0: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5cbf8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cc00: 15 01 1f 00 00 00 00 00      	jeq r1, 0x0, +0x1f <.text+0x5cbe0>
   5cc08: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cc10: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5cc18: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5cc20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5cc28: 72 02 5a 00 02 00 00 00      	stb [r2 + 0x5a], 0x2
   5cc30: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5cc38: 05 00 bb fe 00 00 00 00      	ja -0x145 <.text+0x5c0f8>
   5cc40: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   5cc48: 05 00 b4 fe 00 00 00 00      	ja -0x14c <.text+0x5c0d0>
   5cc50: 79 a2 80 f7 00 00 00 00      	ldxdw r2, [r10 - 0x880]
   5cc58: 05 00 b2 fe 00 00 00 00      	ja -0x14e <.text+0x5c0d0>
   5cc60: 7b 9a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r9
   5cc68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cc70: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cc78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cc80: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5cc88: 79 a9 88 f5 00 00 00 00      	ldxdw r9, [r10 - 0xa78]
   5cc90: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cc98: 85 10 00 00 88 70 00 00      	call 0x7088
   5cca0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cca8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cb98>
   5ccb0: 05 00 c1 01 00 00 00 00      	ja +0x1c1 <.text+0x5d9a0>
   5ccb8: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5ccc0: ad 39 01 00 00 00 00 00      	jlt r9, r3, +0x1 <.text+0x5cbb0>
   5ccc8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5cc20>
   5ccd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ccd8: 07 01 00 00 c8 f5 ff ff      	add64 r1, -0xa38
   5cce0: 85 10 00 00 ec 05 00 00      	call 0x5ec
   5cce8: 79 a1 c8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa38]
   5ccf0: 79 a2 d0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa30]
   5ccf8: 05 00 b9 01 00 00 00 00      	ja +0x1b9 <.text+0x5d9a8>
   5cd00: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cd08: 15 01 2d 00 00 00 00 00      	jeq r1, 0x0, +0x2d <.text+0x5cd58>
   5cd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cd18: 07 01 00 00 58 f7 ff ff      	add64 r1, -0x8a8
