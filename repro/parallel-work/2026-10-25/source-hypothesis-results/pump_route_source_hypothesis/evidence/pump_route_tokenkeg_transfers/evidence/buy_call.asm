   5e130: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5e138: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   5e140: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5e148: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5e150: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5e158: 79 a3 90 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa70]
   5e160: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5e168: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5e170: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5e178: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5e180: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e188: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e190: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e198: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1a8: 07 01 00 00 a8 f6 ff ff      	add64 r1, -0x958
   5e1b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e1b8: 07 02 00 00 08 f8 ff ff      	add64 r2, -0x7f8
   5e1c0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e1c8: 79 a3 30 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad0]
   5e1d0: 85 10 00 00 cf 69 00 00      	call 0x69cf
   5e1d8: 79 a1 b0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x950]
   5e1e0: 79 a2 a8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x958]
   5e1e8: 15 02 db ff 02 00 00 00      	jeq r2, 0x2, -0x25 <.text+0x5dfa8>
   5e1f0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x5df78>
   5e1f8: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
