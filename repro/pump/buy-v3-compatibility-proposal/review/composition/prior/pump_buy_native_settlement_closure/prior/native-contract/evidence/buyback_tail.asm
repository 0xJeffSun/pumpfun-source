   59fa0: 95 00 00 00 00 00 00 00      	exit
   59fa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   59fb0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   59fb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   59fc0: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   59fc8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   59fd0: 85 10 00 00 c7 b2 02 00      	call 0x2b2c7
   59fd8: 7b 7a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r7
   59fe0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   59fe8: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   59ff0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   59ff8: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   5a000: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   5a008: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
