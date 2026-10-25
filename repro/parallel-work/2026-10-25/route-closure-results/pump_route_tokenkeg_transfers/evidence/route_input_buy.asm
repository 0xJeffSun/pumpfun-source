   5dcb8: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5dcc0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5dcc8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5dcd0: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5dcd8: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5dce0: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5dce8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5dcf0: 79 a1 20 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae0]
   5dcf8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5dd00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd08: 07 01 00 00 c8 f6 ff ff      	add64 r1, -0x938
   5dd10: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5dd18: 07 04 00 00 38 f8 ff ff      	add64 r4, -0x7c8
   5dd20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5dd28: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5dd30: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5dd38: 85 10 00 00 a4 f8 ff ff      	call -0x75c
   5dd40: 79 a1 d0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x930]
   5dd48: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   5dd50: 15 02 5f 00 02 00 00 00      	jeq r2, 0x2, +0x5f <.text+0x5df30>
   5dd58: 05 00 67 00 00 00 00 00      	ja +0x67 <.text+0x5df78>
