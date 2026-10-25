   5eb38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eb40: 07 01 00 00 98 f6 ff ff      	add64 r1, -0x968
   5eb48: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5eb50: 79 a3 a8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa58]
   5eb58: 79 a4 50 f5 00 00 00 00      	ldxdw r4, [r10 - 0xab0]
   5eb60: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   5eb68: 85 10 00 00 7d f4 ff ff      	call -0xb83
   5eb70: 79 a1 98 f6 00 00 00 00      	ldxdw r1, [r10 - 0x968]
   5eb78: 15 01 d1 fe 02 00 00 00      	jeq r1, 0x2, -0x12f <.text+0x5e0e8>
   5eb80: 79 a2 a0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x960]
   5eb88: 05 00 87 fd 00 00 00 00      	ja -0x279 <.text+0x5d6a8>
   5eb90: 79 a2 90 f6 00 00 00 00      	ldxdw r2, [r10 - 0x970]
