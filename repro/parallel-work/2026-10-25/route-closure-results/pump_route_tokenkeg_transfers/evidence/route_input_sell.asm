   5d2b8: 79 a1 18 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae8]
   5d2c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d2c8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5d2d0: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5d2d8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5d2e0: 85 10 00 00 32 67 ff ff      	call -0x98ce
   5d2e8: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5d2f0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5d2f8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5d300: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5d308: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5d310: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5d318: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d320: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d330: 07 01 00 00 48 f7 ff ff      	add64 r1, -0x8b8
   5d338: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5d340: 07 04 00 00 08 f8 ff ff      	add64 r4, -0x7f8
   5d348: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d350: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5d358: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5d360: 85 10 00 00 df f9 ff ff      	call -0x621
   5d368: 79 a1 48 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b8]
   5d370: 55 01 41 00 02 00 00 00      	jne r1, 0x2, +0x41 <.text+0x5d460>
   5d378: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d380: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
