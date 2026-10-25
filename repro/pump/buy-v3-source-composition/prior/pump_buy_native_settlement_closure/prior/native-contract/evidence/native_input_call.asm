   5db00: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5db08: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e34
   5db18: 85 10 00 00 0c f3 01 00      	call 0x1f30c
   5db20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db28: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5db30: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e34
   5db40: 85 10 00 00 be 59 ff ff      	call -0xa642
   5db48: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5db58: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5db60: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5db68: 62 0a 48 f9 4e 02 00 00      	stw [r10 - 0x6b8], 0x24e
   5db70: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5db78: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5db80: 62 0a c8 f9 84 17 00 00      	stw [r10 - 0x638], 0x1784
   5db88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db90: 07 01 00 00 e8 f5 ff ff      	add64 r1, -0xa18
   5db98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5dba0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5dba8: 85 10 00 00 f0 7b 02 00      	call 0x27bf0
   5dbb0: 79 a3 f0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa10]
   5dbb8: 79 a2 e8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa18]
   5dbc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dbc8: 07 01 00 00 d8 f5 ff ff      	add64 r1, -0xa28
   5dbd0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5dbd8: 85 10 00 00 ec 44 ff ff      	call -0xbb14
   5dbe0: 79 a1 d8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa28]
   5dbe8: 79 a2 e0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa20]
   5dbf0: 05 00 da ff 00 00 00 00      	ja -0x26 <.text+0x5d9a8>
   5dbf8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc00: 7b 1a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r1
   5dc08: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc10: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   5dc18: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5dc20: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   5dc28: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5dc30: 7b 2a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r2
   5dc38: ad 32 01 00 00 00 00 00      	jlt r2, r3, +0x1 <.text+0x5db28>
   5dc40: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc48: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5dc50: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5db40>
   5dc58: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5db70>
   5dc60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc68: 07 01 00 00 08 f6 ff ff      	add64 r1, -0x9f8
   5dc70: 85 10 00 00 7c 04 00 00      	call 0x47c
   5dc78: 79 a1 10 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9f0]
   5dc80: 79 a2 08 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f8]
   5dc88: 05 00 81 00 00 00 00 00      	ja +0x81 <.text+0x5df78>
   5dc90: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5dc98: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5dca0: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5dca8: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5db98>
   5dcb0: 05 00 69 00 00 00 00 00      	ja +0x69 <.text+0x5dee0>
   5dcb8: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5dcc0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5dcc8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5dcd0: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5dcd8: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5dce0: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5dce8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5dcf0: 79 a1 20 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae0]
   5dcf8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5dd00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd08: 07 01 00 00 c8 f6 ff ff      	add64 r1, -0x938
   5dd10: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5dd18: 07 04 00 00 38 f8 ff ff      	add64 r4, -0x7c8
   5dd20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5dd28: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5dd30: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5dd38: 85 10 00 00 a4 f8 ff ff      	call -0x75c
   5dd40: 79 a1 d0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x930]
