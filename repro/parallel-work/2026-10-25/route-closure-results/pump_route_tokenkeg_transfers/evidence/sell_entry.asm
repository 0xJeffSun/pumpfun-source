   8eda0: bf 47 00 00 00 00 00 00      	mov64 r7, r4
   8eda8: bf 30 00 00 00 00 00 00      	mov64 r0, r3
   8edb0: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   8edb8: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   8edc0: 79 94 00 00 00 00 00 00      	ldxdw r4, [r9 + 0x0]
   8edc8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8edd0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8edd8: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8ecc8>
   8ede0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8ede8: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   8edf0: 7b 49 00 00 00 00 00 00      	stxdw [r9 + 0x0], r4
   8edf8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8ece8>
   8ee00: 85 10 00 00 ff ff ff ff      	call -0x1
   8ee08: 7b 6a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r6
   8ee10: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   8ee18: 7b 3a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r3
   8ee20: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   8ee28: 07 08 00 00 01 00 00 00      	add64 r8, 0x1
   8ee30: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   8ee38: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0x8ed28>
   8ee40: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   8ee48: 79 54 20 f0 00 00 00 00      	ldxdw r4, [r5 - 0xfe0]
   8ee50: 7b 4a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r4
   8ee58: 79 54 18 f0 00 00 00 00      	ldxdw r4, [r5 - 0xfe8]
   8ee60: 7b 4a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r4
   8ee68: 79 54 10 f0 00 00 00 00      	ldxdw r4, [r5 - 0xff0]
   8ee70: 79 56 08 f0 00 00 00 00      	ldxdw r6, [r5 - 0xff8]
   8ee78: 7b 6a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r6
   8ee80: 79 51 00 f0 00 00 00 00      	ldxdw r1, [r5 - 0x1000]
   8ee88: 79 a5 d0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x130]
   8ee90: 7b 85 00 00 00 00 00 00      	stxdw [r5 + 0x0], r8
   8ee98: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x8ed88>
   8eea0: 05 00 eb ff 00 00 00 00      	ja -0x15 <.text+0x8ece0>
   8eea8: 79 00 00 00 00 00 00 00      	ldxdw r0, [r0 + 0x0]
   8eeb0: 79 08 08 00 00 00 00 00      	ldxdw r8, [r0 + 0x8]
   8eeb8: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
   8eec0: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   8eec8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   8eed0: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x8edc0>
   8eed8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   8eee0: 71 26 2a 00 00 00 00 00      	ldxb r6, [r2 + 0x2a]
   8eee8: 7b 6a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r6
   8eef0: 71 26 29 00 00 00 00 00      	ldxb r6, [r2 + 0x29]
   8eef8: 7b 6a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r6
