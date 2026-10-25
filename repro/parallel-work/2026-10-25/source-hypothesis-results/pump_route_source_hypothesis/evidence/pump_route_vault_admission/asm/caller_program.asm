   5ba28: 7b 9a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r9
   5ba30: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5b948>
   5ba38: 7b 9a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r9
   5ba40: 7a 0a 00 f8 00 00 00 00      	stdw [r10 - 0x800], 0x0
   5ba48: 7a 0a f8 f7 00 00 00 00      	stdw [r10 - 0x808], 0x0
   5ba50: 7a 0a f0 f7 00 00 00 00      	stdw [r10 - 0x810], 0x0
   5ba58: 7a 0a e8 f7 00 00 00 00      	stdw [r10 - 0x818], 0x0
   5ba60: 79 a6 c0 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa40]
   5ba68: 79 a9 b8 f5 00 00 00 00      	ldxdw r9, [r10 - 0xa48]
   5ba70: 79 93 48 00 00 00 00 00      	ldxdw r3, [r9 + 0x48]
   5ba78: 79 92 40 00 00 00 00 00      	ldxdw r2, [r9 + 0x40]
   5ba80: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5ba88: 7b 1a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r1
   5ba90: 79 14 58 00 00 00 00 00      	ldxdw r4, [r1 + 0x58]
   5ba98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5baa0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5baa8: 85 10 00 00 77 f9 ff ff      	call -0x689
   5bab0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5bab8: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   5bac0: 79 a6 30 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6d0]
   5bac8: 71 a2 5a f9 00 00 00 00      	ldxb r2, [r10 - 0x6a6]
   5bad0: 15 02 20 00 02 00 00 00      	jeq r2, 0x2, +0x20 <.text+0x5bab8>
   5bad8: 69 a3 58 f9 00 00 00 00      	ldxh r3, [r10 - 0x6a8]
   5bae0: 6b 3a 30 f8 00 00 00 00      	stxh [r10 - 0x7d0], r3
   5bae8: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   5baf0: 7b 3a 28 f8 00 00 00 00      	stxdw [r10 - 0x7d8], r3
   5baf8: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5bb00: 7b 3a 20 f8 00 00 00 00      	stxdw [r10 - 0x7e0], r3
   5bb08: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5bb10: 7b 3a 18 f8 00 00 00 00      	stxdw [r10 - 0x7e8], r3
   5bb18: 61 a3 5b f9 00 00 00 00      	ldxw r3, [r10 - 0x6a5]
   5bb20: 63 3a 33 f8 00 00 00 00      	stxw [r10 - 0x7cd], r3
   5bb28: 71 a3 5f f9 00 00 00 00      	ldxb r3, [r10 - 0x6a1]
   5bb30: 73 3a 37 f8 00 00 00 00      	stxb [r10 - 0x7c9], r3
   5bb38: 73 2a 32 f8 00 00 00 00      	stxb [r10 - 0x7ce], r2
   5bb40: 7b 1a 10 f8 00 00 00 00      	stxdw [r10 - 0x7f0], r1
   5bb48: 7b 6a 08 f8 00 00 00 00      	stxdw [r10 - 0x7f8], r6
   5bb50: 79 93 48 00 00 00 00 00      	ldxdw r3, [r9 + 0x48]
   5bb58: 79 92 40 00 00 00 00 00      	ldxdw r2, [r9 + 0x40]
   5bb60: 79 49 08 00 00 00 00 00      	ldxdw r9, [r4 + 0x8]
   5bb68: 79 94 58 00 00 00 00 00      	ldxdw r4, [r9 + 0x58]
   5bb70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bb78: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5bb80: 85 10 00 00 5c f9 ff ff      	call -0x6a4
   5bb88: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5bb90: 79 a4 30 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6d0]
   5bb98: 71 a1 5a f9 00 00 00 00      	ldxb r1, [r10 - 0x6a6]
   5bba0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5ba90>
   5bba8: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x5bb70>
   5bbb0: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5bbb8: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   5bbc0: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   5bbc8: 72 01 5a 00 02 00 00 00      	stb [r1 + 0x5a], 0x2
   5bbd0: 05 00 d7 00 00 00 00 00      	ja +0xd7 <.text+0x5c170>
