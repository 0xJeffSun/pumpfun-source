  1a1d70: bf 48 00 00 00 00 00 00      	mov64 r8, r4
  1a1d78: 7b 3a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r3
  1a1d80: bf 13 00 00 00 00 00 00      	mov64 r3, r1
  1a1d88: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
  1a1d90: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
  1a1d98: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  1a1da0: 79 51 00 f0 00 00 00 00      	ldxdw r1, [r5 - 0x1000]
  1a1da8: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  1a1db0: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
  1a1db8: 79 27 10 00 00 00 00 00      	ldxdw r7, [r2 + 0x10]
  1a1dc0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  1a1dc8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
  1a1dd0: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
  1a1dd8: 7b 7a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r7
  1a1de0: 15 07 28 00 00 00 00 00      	jeq r7, 0x0, +0x28 <custom_panic+0x4ac70>
  1a1de8: 7b 8a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r8
  1a1df0: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
  1a1df8: bf 76 00 00 00 00 00 00      	mov64 r6, r7
  1a1e00: 27 06 00 00 22 00 00 00      	mul64 r6, 0x22
  1a1e08: 18 01 00 00 c3 c3 c3 c3 00 00 00 00 c3 c3 c3 03      	lddw r1, 0x3c3c3c3c3c3c3c3
  1a1e18: 2d 17 5f 00 00 00 00 00      	jgt r7, r1, +0x5f <custom_panic+0x4ae60>
  1a1e20: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  1a1e28: 79 19 08 00 00 00 00 00      	ldxdw r9, [r1 + 0x8]
  1a1e30: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  1a1e38: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a1e40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a1e48: 85 10 00 00 33 6a ff ff      	call -0x95cd
  1a1e50: 15 00 58 00 00 00 00 00      	jeq r0, 0x0, +0x58 <custom_panic+0x4ae60>
  1a1e58: 7b 0a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r0
  1a1e60: bf 01 00 00 00 00 00 00      	mov64 r1, r0
  1a1e68: 07 01 00 00 21 00 00 00      	add64 r1, 0x21
  1a1e70: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a1e78: 15 06 11 00 00 00 00 00      	jeq r6, 0x0, +0x11 <custom_panic+0x4ac50>
  1a1e80: 79 93 00 00 00 00 00 00      	ldxdw r3, [r9 + 0x0]
  1a1e88: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
  1a1e90: 79 95 10 00 00 00 00 00      	ldxdw r5, [r9 + 0x10]
  1a1e98: 79 90 18 00 00 00 00 00      	ldxdw r0, [r9 + 0x18]
  1a1ea0: 71 98 21 00 00 00 00 00      	ldxb r8, [r9 + 0x21]
  1a1ea8: 71 97 20 00 00 00 00 00      	ldxb r7, [r9 + 0x20]
  1a1eb0: 73 71 ff ff 00 00 00 00      	stxb [r1 - 0x1], r7
  1a1eb8: 73 81 00 00 00 00 00 00      	stxb [r1 + 0x0], r8
  1a1ec0: 7b 01 f7 ff 00 00 00 00      	stxdw [r1 - 0x9], r0
  1a1ec8: 7b 51 ef ff 00 00 00 00      	stxdw [r1 - 0x11], r5
  1a1ed0: 7b 41 e7 ff 00 00 00 00      	stxdw [r1 - 0x19], r4
  1a1ed8: 7b 31 df ff 00 00 00 00      	stxdw [r1 - 0x21], r3
