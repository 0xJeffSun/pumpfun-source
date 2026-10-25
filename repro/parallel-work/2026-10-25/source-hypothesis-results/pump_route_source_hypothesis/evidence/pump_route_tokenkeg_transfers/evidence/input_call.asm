   5b2a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b2b0: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   5b2b8: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5b2c0: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   5b2c8: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   5b2d0: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   5b2d8: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   5b2e0: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   5b2e8: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   5b2f0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5b2f8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5b300: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   5b308: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5b310: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5b318: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5b320: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5b328: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   5b330: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5b338: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5b340: 7a 0a f8 ff 01 00 00 00      	stdw [r10 - 0x8], 0x1
   5b348: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   5b350: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   5b358: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   5b360: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b368: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   5b370: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b378: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5b380: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   5b388: 79 a4 60 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1a0]
   5b390: 85 10 00 00 26 49 02 00      	call 0x24926
   5b398: 79 a3 98 fe 00 00 00 00      	ldxdw r3, [r10 - 0x168]
   5b3a0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5b3a8: 05 00 f3 fe 00 00 00 00      	ja -0x10d <.text+0x5aa28>
