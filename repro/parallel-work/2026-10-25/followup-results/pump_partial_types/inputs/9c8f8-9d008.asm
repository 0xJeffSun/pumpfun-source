   9c8f8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9c900: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9c908: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9c890>
   9c910: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c918: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9c920: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9c928: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9c930: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9c938: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9c940: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9c948: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9c950: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9c840>
   9c958: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9c8f8>
   9c960: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9c970: 85 10 00 00 9d 18 02 00      	call 0x2189d
   9c978: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c980: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9c988: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9c990: 85 10 00 00 58 fe 01 00      	call 0x1fe58
   9c998: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9c9a0: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9c9a8: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9c8d8>
   9c9b0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9c9c0: 85 10 00 00 93 18 02 00      	call 0x21893
   9c9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c9d0: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9c9d8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9c9e0: 85 10 00 00 4e fe 01 00      	call 0x1fe4e
   9c9e8: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9c9f0: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9c9f8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9ca00: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9ca08: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9ca10: 95 00 00 00 00 00 00 00      	exit
   9ca18: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9ca20: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9ca28: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9ca30: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9ca38: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9ca40: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9ca48: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9ca50: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9c940>
   9ca58: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9c990>
   9ca60: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ca70: 85 10 00 00 7d 18 02 00      	call 0x2187d
   9ca78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ca80: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9ca88: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9ca90: 85 10 00 00 38 fe 01 00      	call 0x1fe38
   9ca98: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9caa0: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9caa8: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9c8d8>
   9cab0: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9cab8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9cac0: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9cac8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9cad0: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9cad8: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9cae0: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9cae8: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9c9d8>
   9caf0: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9ca28>
   9caf8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9cb08: 85 10 00 00 6a 18 02 00      	call 0x2186a
   9cb10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cb18: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9cb20: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9cb28: 85 10 00 00 25 fe 01 00      	call 0x1fe25
   9cb30: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9cb38: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9cb40: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9c8d8>
   9cb48: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9cb50: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9cb58: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9cb60: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9cb68: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9cb70: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9cb78: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9cb80: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9ca70>
   9cb88: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9cac0>
   9cb90: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9cba0: 85 10 00 00 57 18 02 00      	call 0x21857
   9cba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cbb0: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9cbb8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9cbc0: 85 10 00 00 12 fe 01 00      	call 0x1fe12
   9cbc8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9cbd0: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9cbd8: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9c8d8>
   9cbe0: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9cbe8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9cbf0: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9cbf8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9cc00: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9cc08: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9cc10: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9cc18: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9cc00>
   9cc20: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9cc28: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9cc30: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9cc38: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9cc40: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9cc48: 73 4a a7 ff 00 00 00 00      	stxb [r10 - 0x59], r4
   9cc50: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9cc50>
   9cc58: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9cc68: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9cc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cc78: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
   9cc80: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9cc88: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9cc98: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   9cca0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cca8: 07 01 00 00 a7 ff ff ff      	add64 r1, -0x59
   9ccb0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   9ccb8: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   9ccc0: 7a 0a c8 ff 01 00 00 00      	stdw [r10 - 0x38], 0x1
   9ccc8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9ccd0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9ccd8: 07 07 00 00 a8 ff ff ff      	add64 r7, -0x58
   9cce0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9cce8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   9ccf0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9ccf8: 85 10 00 00 a9 1c 02 00      	call 0x21ca9
   9cd00: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9cd08: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9cd10: 85 10 00 00 6f da fe ff      	call -0x12591
   9cd18: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9cc18>
   9cd20: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9cd30: 85 10 00 00 25 18 02 00      	call 0x21825
   9cd38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cd40: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9cd48: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9cd50: 85 10 00 00 e0 fd 01 00      	call 0x1fde0
   9cd58: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9cd60: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9cd68: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9c8d8>
   9cd70: 7b 4a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r4
   9cd78: 7b 0a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r0
   9cd80: 7b 5a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r5
   9cd88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9cd90: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   9cd98: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   9cda0: 85 10 00 00 a1 e5 fe ff      	call -0x11a5f
   9cda8: 71 a1 c0 ff 00 00 00 00      	ldxb r1, [r10 - 0x40]
   9cdb0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9cca0>
   9cdb8: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x9cd80>
   9cdc0: 61 a1 c4 ff 00 00 00 00      	ldxw r1, [r10 - 0x3c]
   9cdc8: 63 1a a3 ff 00 00 00 00      	stxw [r10 - 0x5d], r1
   9cdd0: 61 a1 c1 ff 00 00 00 00      	ldxw r1, [r10 - 0x3f]
   9cdd8: 63 1a a0 ff 00 00 00 00      	stxw [r10 - 0x60], r1
   9cde0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   9cde8: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   9cdf0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9cdf8: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   9ce00: 71 a1 e0 ff 00 00 00 00      	ldxb r1, [r10 - 0x20]
   9ce08: 73 1a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r1
   9ce10: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   9ce18: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   9ce20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ce28: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   9ce30: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9ce38: 85 10 00 00 45 e0 fe ff      	call -0x11fbb
   9ce40: 71 a1 c0 ff 00 00 00 00      	ldxb r1, [r10 - 0x40]
   9ce48: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9cd38>
   9ce50: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9cd80>
   9ce58: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   9ce60: 71 a1 c1 ff 00 00 00 00      	ldxb r1, [r10 - 0x3f]
   9ce68: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   9ce70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ce78: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   9ce80: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9ce88: 85 10 00 00 3b e0 fe ff      	call -0x11fc5
   9ce90: 71 a1 c0 ff 00 00 00 00      	ldxb r1, [r10 - 0x40]
   9ce98: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9cdb8>
   9cea0: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
   9cea8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ceb0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9ceb8: 85 10 00 00 b3 fd 01 00      	call 0x1fdb3
   9cec0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   9cec8: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   9ced0: 05 00 64 ff 00 00 00 00      	ja -0x9c <.text+0x9c8d8>
   9ced8: 71 a1 c1 ff 00 00 00 00      	ldxb r1, [r10 - 0x3f]
   9cee0: 7a 06 38 00 00 00 00 00      	stdw [r6 + 0x38], 0x0
   9cee8: 7a 06 30 00 00 00 00 00      	stdw [r6 + 0x30], 0x0
   9cef0: 7a 06 28 00 00 00 00 00      	stdw [r6 + 0x28], 0x0
   9cef8: 7a 06 20 00 00 00 00 00      	stdw [r6 + 0x20], 0x0
   9cf00: 61 a2 a0 ff 00 00 00 00      	ldxw r2, [r10 - 0x60]
   9cf08: 63 26 00 00 00 00 00 00      	stxw [r6 + 0x0], r2
   9cf10: 61 a2 a3 ff 00 00 00 00      	ldxw r2, [r10 - 0x5d]
   9cf18: 63 26 03 00 00 00 00 00      	stxw [r6 + 0x3], r2
   9cf20: 79 a2 a8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x58]
   9cf28: 7b 26 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r2
   9cf30: 79 a2 b0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x50]
   9cf38: 7b 26 17 00 00 00 00 00      	stxdw [r6 + 0x17], r2
   9cf40: 71 a2 b8 ff 00 00 00 00      	ldxb r2, [r10 - 0x48]
   9cf48: 73 26 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r2
   9cf50: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   9cf58: 7b 26 60 00 00 00 00 00      	stxdw [r6 + 0x60], r2
   9cf60: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   9cf68: 7b 26 58 00 00 00 00 00      	stxdw [r6 + 0x58], r2
   9cf70: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9cf78: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9cf80: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9cf88: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   9cf90: 7b 26 07 00 00 00 00 00      	stxdw [r6 + 0x7], r2
   9cf98: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9cfa0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   9cfa8: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9cfb0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   9cfb8: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9cfc0: 7a 06 68 00 00 00 00 00      	stdw [r6 + 0x68], 0x0
   9cfc8: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   9cfd0: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   9cfd8: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9cfe0: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9cfe8: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9cff0: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9cff8: 6a 06 9c 00 00 00 00 00      	sth [r6 + 0x9c], 0x0
   9d000: 05 00 41 ff 00 00 00 00      	ja -0xbf <.text+0x9c8f0>
