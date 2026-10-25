   5cf48: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5ce38>
   5cf50: 7b 1a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r1
   5cf58: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cf60: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf68: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <.text+0x5ce60>
   5cf70: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cf78: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf80: 79 a6 48 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6b8]
   5cf88: 79 a7 50 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6b0]
   5cf90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cf98: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
