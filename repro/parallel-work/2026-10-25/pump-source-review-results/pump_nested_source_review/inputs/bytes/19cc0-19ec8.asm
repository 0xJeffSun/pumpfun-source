   19cc0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   19cc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   19cd0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   19cd8: 18 02 00 00 0c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f0c
   19ce8: 85 10 00 00 d2 7a 02 00      	call 0x27ad2
   19cf0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   19cf8: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   19d00: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   19d08: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   19d18: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   19d20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   19d28: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   19d30: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   19d38: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   19d40: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   19d48: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   19d50: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   19d58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   19d60: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   19d68: 18 01 00 00 0c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f0c
   19d78: 85 10 00 00 21 88 02 00      	call 0x28821
   19d80: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x19cb8>
   19d88: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   19d90: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   19d98: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   19da8: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   19db0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   19dc0: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   19dd0: 85 10 00 00 08 26 03 00      	call 0x32608
   19dd8: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   19de0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   19de8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   19df0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   19df8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   19e00: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   19e08: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   19e10: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   19e18: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   19e20: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   19e28: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   19e30: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   19e38: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   19e48: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   19e50: 62 0a 88 ff dd 17 00 00      	stw [r10 - 0x78], 0x17dd
   19e58: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   19e60: 62 0a 08 ff 9c 01 00 00      	stw [r10 - 0xf8], 0x19c
   19e68: 7a 0a 00 ff 1e 00 00 00      	stdw [r10 - 0x100], 0x1e
   19e70: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   19e78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   19e80: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   19e88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   19e90: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   19e98: 85 10 00 00 92 03 03 00      	call 0x30392
   19ea0: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   19ea8: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   19eb0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   19eb8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   19ec0: 95 00 00 00 00 00 00 00      	exit
