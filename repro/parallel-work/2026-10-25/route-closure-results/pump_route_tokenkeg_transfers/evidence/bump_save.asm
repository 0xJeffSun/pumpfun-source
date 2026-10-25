   5b498: 79 61 10 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff0]
   5b4a0: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5b4a8: 79 61 08 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff8]
   5b4b0: 7b 1a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r1
   5b4b8: 79 66 00 f0 00 00 00 00      	ldxdw r6, [r6 - 0x1000]
   5b4c0: 71 93 a3 00 00 00 00 00      	ldxb r3, [r9 + 0xa3]
   5b4c8: 71 92 a1 00 00 00 00 00      	ldxb r2, [r9 + 0xa1]
   5b4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b4d8: 07 01 00 00 c8 f7 ff ff      	add64 r1, -0x838
   5b4e0: 85 10 00 00 79 45 00 00      	call 0x4579
   5b4e8: 79 a1 c8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x838]
