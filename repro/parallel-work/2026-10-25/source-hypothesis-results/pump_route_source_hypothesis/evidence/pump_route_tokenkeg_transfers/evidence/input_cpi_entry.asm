  17fcc8: bf 29 00 00 00 00 00 00      	mov64 r9, r2
  17fcd0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
  17fcd8: 79 90 78 00 00 00 00 00      	ldxdw r0, [r9 + 0x78]
  17fce0: 79 96 48 00 00 00 00 00      	ldxdw r6, [r9 + 0x48]
  17fce8: 79 92 18 00 00 00 00 00      	ldxdw r2, [r9 + 0x18]
  17fcf0: 79 91 a8 00 00 00 00 00      	ldxdw r1, [r9 + 0xa8]
  17fcf8: 79 95 d8 00 00 00 00 00      	ldxdw r5, [r9 + 0xd8]
  17fd00: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
  17fd08: 7b 4a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r4
  17fd10: 7b 5a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r5
  17fd18: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
  17fd20: 7a 0a 18 f0 00 00 00 00      	stdw [r10 - 0xfe8], 0x0
  17fd28: 7a 0a 10 f0 08 00 00 00      	stdw [r10 - 0xff0], 0x8
  17fd30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fd38: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
  17fd40: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  17fd48: bf 63 00 00 00 00 00 00      	mov64 r3, r6
  17fd50: bf 04 00 00 00 00 00 00      	mov64 r4, r0
  17fd58: 85 10 00 00 2e 27 00 00      	call 0x272e
  17fd60: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
  17fd68: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
  17fd70: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
  17fd78: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
  17fd80: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
  17fd88: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
  17fd90: 79 a8 40 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc0]
  17fd98: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
  17fda8: 1d 18 72 00 00 00 00 00      	jeq r8, r1, +0x72 <custom_panic+0x28e88>
  17fdb0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
  17fdb8: 07 01 00 00 d8 00 00 00      	add64 r1, 0xd8
  17fdc0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
  17fdc8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
  17fdd0: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
  17fdd8: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
  17fde0: bf 96 00 00 00 00 00 00      	mov64 r6, r9
  17fde8: 07 06 00 00 78 00 00 00      	add64 r6, 0x78
  17fdf0: bf 97 00 00 00 00 00 00      	mov64 r7, r9
  17fdf8: 07 07 00 00 48 00 00 00      	add64 r7, 0x48
  17fe00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fe08: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
  17fe10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  17fe18: 07 02 00 00 60 ff ff ff      	add64 r2, -0xa0
  17fe20: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
  17fe28: 85 10 00 00 fc 66 00 00      	call 0x66fc
  17fe30: 7b 8a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r8
  17fe38: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
  17fe40: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
  17fe48: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
  17fe50: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
  17fe58: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
  17fe60: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
  17fe68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17fe70: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
  17fe78: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
  17fe80: bf 72 00 00 00 00 00 00      	mov64 r2, r7
