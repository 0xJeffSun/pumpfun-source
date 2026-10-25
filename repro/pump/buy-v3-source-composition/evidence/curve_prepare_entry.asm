   3cd50: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   3cd58: 79 78 08 00 00 00 00 00      	ldxdw r8, [r7 + 0x8]
   3cd60: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   3cd68: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   3cd70: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   3cd78: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x3cc68>
   3cd80: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   3cd88: 79 76 00 00 00 00 00 00      	ldxdw r6, [r7 + 0x0]
   3cd90: 7b 08 00 00 00 00 00 00      	stxdw [r8 + 0x0], r0
   3cd98: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x3cc88>
   3cda0: 85 10 00 00 ff ff ff ff      	call -0x1
   3cda8: 79 79 10 00 00 00 00 00      	ldxdw r9, [r7 + 0x10]
   3cdb0: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   3cdb8: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   3cdc0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   3cdc8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x3ccb8>
   3cdd0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   3cdd8: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   3cde0: 7b 3a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r3
   3cde8: 7b 4a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r4
   3cdf0: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   3cdf8: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   3ce00: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x3ccf0>
   3ce08: 05 00 f2 ff 00 00 00 00      	ja -0xe <.text+0x3cc80>
   3ce10: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   3ce18: 79 73 20 00 00 00 00 00      	ldxdw r3, [r7 + 0x20]
   3ce20: 71 74 28 00 00 00 00 00      	ldxb r4, [r7 + 0x28]
   3ce28: 71 75 29 00 00 00 00 00      	ldxb r5, [r7 + 0x29]
   3ce30: 71 70 2a 00 00 00 00 00      	ldxb r0, [r7 + 0x2a]
   3ce38: 73 0a e2 ff 00 00 00 00      	stxb [r10 - 0x1e], r0
   3ce40: 73 5a e1 ff 00 00 00 00      	stxb [r10 - 0x1f], r5
   3ce48: 73 4a e0 ff 00 00 00 00      	stxb [r10 - 0x20], r4
   3ce50: 7b 3a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r3
   3ce58: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
   3ce60: 7b 9a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r9
   3ce68: 7b 6a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r6
   3ce70: 7b 8a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r8
   3ce78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3ce80: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   3ce88: 85 10 00 00 7b cb 02 00      	call 0x2cb7b
   3ce90: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   3ce98: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   3cea0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3cea8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   3ceb0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x3cdb0>
   3ceb8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   3cec0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3cec8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   3ced0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   3ced8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3cee0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   3cee8: 79 a4 78 ff 00 00 00 00      	ldxdw r4, [r10 - 0x88]
   3cef0: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   3cef8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x3cdf8>
   3cf00: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   3cf08: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3cf10: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   3cf18: bf 65 00 00 00 00 00 00      	mov64 r5, r6
   3cf20: 25 06 01 00 a6 00 00 00      	jgt r6, 0xa6, +0x1 <.text+0x3ce10>
   3cf28: b7 05 00 00 a6 00 00 00      	mov64 r5, 0xa6
   3cf30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3cf38: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   3cf40: 79 a3 70 ff 00 00 00 00      	ldxdw r3, [r10 - 0x90]
   3cf48: 85 10 00 00 60 00 00 00      	call 0x60
   3cf50: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   3cf58: 79 a8 90 ff 00 00 00 00      	ldxdw r8, [r10 - 0x70]
   3cf60: 55 08 59 00 02 00 00 00      	jne r8, 0x2, +0x59 <.text+0x3d110>
   3cf68: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   3cf70: 25 06 57 00 a5 00 00 00      	jgt r6, 0xa5, +0x57 <.text+0x3d110>
