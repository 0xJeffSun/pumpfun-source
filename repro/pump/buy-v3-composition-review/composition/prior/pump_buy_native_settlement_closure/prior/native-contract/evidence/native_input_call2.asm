   5e000: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5e008: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e010: 07 01 00 00 d8 f6 ff ff      	add64 r1, -0x928
   5e018: 79 a3 b0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa50]
   5e020: 79 a4 50 f5 00 00 00 00      	ldxdw r4, [r10 - 0xab0]
   5e028: 79 a5 88 f5 00 00 00 00      	ldxdw r5, [r10 - 0xa78]
   5e030: 85 10 00 00 ec 5f 00 00      	call 0x5fec
   5e038: 79 a1 e0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x920]
   5e040: 79 a2 d8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x928]
   5e048: 55 02 09 00 02 00 00 00      	jne r2, 0x2, +0x9 <.text+0x5df78>
   5e050: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e058: 07 01 00 00 b8 f6 ff ff      	add64 r1, -0x948
   5e060: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5e068: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   5e070: 79 a4 10 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf0]
   5e078: 85 10 00 00 6e 85 00 00      	call 0x856e
   5e080: 79 a1 c0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x940]
   5e088: 79 a2 b8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x948]
   5e090: 15 02 04 00 02 00 00 00      	jeq r2, 0x2, +0x4 <.text+0x5df98>
   5e098: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5e0a0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   5e0a8: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   5e0b0: 05 00 45 ff 00 00 00 00      	ja -0xbb <.text+0x5d9c0>
