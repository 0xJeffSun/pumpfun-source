   9bc28: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9bc30: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9bc38: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9bbc0>
   9bc40: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9bc48: 79 37 00 00 00 00 00 00      	ldxdw r7, [r3 + 0x0]
   9bc50: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9bc58: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9bc60: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9bc68: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9bc70: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9bc78: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9bc80: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9bb70>
   9bc88: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9bc28>
   9bc90: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9bca0: 85 10 00 00 37 1a 02 00      	call 0x21a37
   9bca8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bcb0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9bcb8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9bcc0: 85 10 00 00 f2 ff 01 00      	call 0x1fff2
   9bcc8: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9bcd0: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9bcd8: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9bc08>
   9bce0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9bcf0: 85 10 00 00 2d 1a 02 00      	call 0x21a2d
   9bcf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bd00: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9bd08: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9bd10: 85 10 00 00 e8 ff 01 00      	call 0x1ffe8
   9bd18: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9bd20: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9bd28: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9bd30: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9bd38: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9bd40: 95 00 00 00 00 00 00 00      	exit
   9bd48: 79 38 08 00 00 00 00 00      	ldxdw r8, [r3 + 0x8]
   9bd50: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9bd58: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9bd60: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9bd68: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9bd70: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9bd78: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9bd80: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9bc70>
   9bd88: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9bcc0>
   9bd90: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9bda0: 85 10 00 00 17 1a 02 00      	call 0x21a17
   9bda8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bdb0: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9bdb8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9bdc0: 85 10 00 00 d2 ff 01 00      	call 0x1ffd2
   9bdc8: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9bdd0: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9bdd8: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9bc08>
   9bde0: 79 39 10 00 00 00 00 00      	ldxdw r9, [r3 + 0x10]
   9bde8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9bdf0: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9bdf8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9be00: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9be08: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9be10: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9be18: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9bd08>
   9be20: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9bd58>
   9be28: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9be38: 85 10 00 00 04 1a 02 00      	call 0x21a04
   9be40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9be48: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9be50: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9be58: 85 10 00 00 bf ff 01 00      	call 0x1ffbf
   9be60: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9be68: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9be70: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9bc08>
   9be78: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9be80: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9be88: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9be90: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9be98: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9bea0: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9bea8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9beb0: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9bda0>
   9beb8: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9bdf0>
   9bec0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9bed0: 85 10 00 00 f1 19 02 00      	call 0x219f1
   9bed8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bee0: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9bee8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9bef0: 85 10 00 00 ac ff 01 00      	call 0x1ffac
   9bef8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9bf00: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9bf08: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9bc08>
   9bf10: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9bf18: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9bf20: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9bf28: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9bf30: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9bf38: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9bf40: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9bf48: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9bf30>
   9bf50: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9bf58: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9bf60: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9bf68: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9bf70: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9bf78: 73 4a a7 ff 00 00 00 00      	stxb [r10 - 0x59], r4
   9bf80: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9bf80>
   9bf88: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9bf98: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9bfa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bfa8: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
   9bfb0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9bfb8: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9bfc8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   9bfd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9bfd8: 07 01 00 00 a7 ff ff ff      	add64 r1, -0x59
   9bfe0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   9bfe8: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   9bff0: 7a 0a c8 ff 01 00 00 00      	stdw [r10 - 0x38], 0x1
   9bff8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9c000: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9c008: 07 07 00 00 a8 ff ff ff      	add64 r7, -0x58
   9c010: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c018: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   9c020: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9c028: 85 10 00 00 43 1e 02 00      	call 0x21e43
   9c030: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9c038: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9c040: 85 10 00 00 09 dc fe ff      	call -0x123f7
   9c048: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9bf48>
   9c050: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9c060: 85 10 00 00 bf 19 02 00      	call 0x219bf
   9c068: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c070: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9c078: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9c080: 85 10 00 00 7a ff 01 00      	call 0x1ff7a
   9c088: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9c090: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9c098: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9bc08>
   9c0a0: 7b 0a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r0
   9c0a8: 7b 4a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r4
   9c0b0: 7b 5a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r5
   9c0b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c0c0: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   9c0c8: 85 10 00 00 3c e7 fe ff      	call -0x118c4
   9c0d0: 71 a1 c0 ff 00 00 00 00      	ldxb r1, [r10 - 0x40]
   9c0d8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9bff8>
   9c0e0: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
   9c0e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c0f0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9c0f8: 85 10 00 00 6b ff 01 00      	call 0x1ff6b
   9c100: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   9c108: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   9c110: 05 00 82 ff 00 00 00 00      	ja -0x7e <.text+0x9bc08>
   9c118: 61 a1 c4 ff 00 00 00 00      	ldxw r1, [r10 - 0x3c]
   9c120: 63 16 03 00 00 00 00 00      	stxw [r6 + 0x3], r1
   9c128: 61 a1 c1 ff 00 00 00 00      	ldxw r1, [r10 - 0x3f]
   9c130: 63 16 00 00 00 00 00 00      	stxw [r6 + 0x0], r1
   9c138: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   9c140: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   9c148: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9c150: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   9c158: 71 a3 e0 ff 00 00 00 00      	ldxb r3, [r10 - 0x20]
   9c160: 73 3a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r3
   9c168: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
   9c170: 73 36 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r3
   9c178: 7b 26 17 00 00 00 00 00      	stxdw [r6 + 0x17], r2
   9c180: 7b 16 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r1
   9c188: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9c190: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   9c198: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   9c1a0: 7b 16 58 00 00 00 00 00      	stxdw [r6 + 0x58], r1
   9c1a8: 7b 96 50 00 00 00 00 00      	stxdw [r6 + 0x50], r9
   9c1b0: 7b 86 48 00 00 00 00 00      	stxdw [r6 + 0x48], r8
   9c1b8: 7b 76 40 00 00 00 00 00      	stxdw [r6 + 0x40], r7
   9c1c0: 7b 46 07 00 00 00 00 00      	stxdw [r6 + 0x7], r4
   9c1c8: 7a 06 20 00 00 00 00 00      	stdw [r6 + 0x20], 0x0
   9c1d0: 7a 06 28 00 00 00 00 00      	stdw [r6 + 0x28], 0x0
   9c1d8: 7a 06 30 00 00 00 00 00      	stdw [r6 + 0x30], 0x0
   9c1e0: 7a 06 38 00 00 00 00 00      	stdw [r6 + 0x38], 0x0
   9c1e8: 7a 06 68 00 00 00 00 00      	stdw [r6 + 0x68], 0x0
   9c1f0: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   9c1f8: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   9c200: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9c208: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9c210: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9c218: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9c220: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   9c228: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9c230: 62 06 9a 00 00 00 00 00      	stw [r6 + 0x9a], 0x0
   9c238: 05 00 60 ff 00 00 00 00      	ja -0xa0 <.text+0x9bc20>
