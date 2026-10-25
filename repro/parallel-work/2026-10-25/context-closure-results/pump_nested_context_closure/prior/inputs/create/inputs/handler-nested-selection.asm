   21cf8: 79 a1 e0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x720]
   21d00: 07 01 00 00 a8 03 00 00      	add64 r1, 0x3a8
   21d08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   21d10: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   21d18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   21d20: 85 10 00 00 2a 23 03 00      	call 0x3232a
   21d28: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   21d30: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   21d38: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   21d40: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   21d48: 15 00 50 fb 00 00 00 00      	jeq r0, 0x0, -0x4b0 <.text+0x1f6b0>
   21d50: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   21d58: 79 a1 d0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x730]
   21d60: 15 01 02 00 03 00 00 00      	jeq r1, 0x3, +0x2 <.text+0x21c58>
   21d68: 79 a2 b8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x748]
   21d70: 07 02 00 00 90 00 00 00      	add64 r2, 0x90
   21d78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   21d80: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   21d88: 85 10 00 00 ec eb ff ff      	call -0x1414
   21d90: 79 a7 a8 fc 00 00 00 00      	ldxdw r7, [r10 - 0x358]
   21d98: 79 a9 a0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x360]
   21da0: 55 09 44 fe 02 00 00 00      	jne r9, 0x2, -0x1bc <.text+0x20ea8>
   21da8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   21db0: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   21db8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   21dc0: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   21dc8: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   21dd0: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   21dd8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   21de0: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   21de8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   21df0: 07 01 00 00 58 fb ff ff      	add64 r1, -0x4a8
   21df8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   21e00: 07 03 00 00 a0 fc ff ff      	add64 r3, -0x360
   21e08: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   21e10: 85 10 00 00 ea ec ff ff      	call -0x1316
   21e18: 79 a9 60 fb 00 00 00 00      	ldxdw r9, [r10 - 0x4a0]
   21e20: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   21e28: 55 01 b7 00 00 00 00 00      	jne r1, 0x0, +0xb7 <.text+0x222c8>
   21e30: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   21e38: b7 07 00 00 02 00 00 00      	mov64 r7, 0x2
   21e40: 79 a2 68 fb 00 00 00 00      	ldxdw r2, [r10 - 0x498]
   21e48: 7b 2a a8 f8 00 00 00 00      	stxdw [r10 - 0x758], r2
   21e50: 15 09 01 00 00 00 00 00      	jeq r9, 0x0, +0x1 <.text+0x21d40>
   21e58: 05 00 2e fb 00 00 00 00      	ja -0x4d2 <.text+0x1f6b0>
   21e60: 79 a4 e0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x720]
   21e68: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   21e70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   21e78: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   21e80: 79 a2 b8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x748]
   21e88: 79 a3 d0 f8 00 00 00 00      	ldxdw r3, [r10 - 0x730]
   21e90: 85 10 00 00 fc ec ff ff      	call -0x1304
   21e98: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   21ea0: 7b 1a a8 f8 00 00 00 00      	stxdw [r10 - 0x758], r1
   21ea8: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   21eb0: 55 01 b9 00 00 00 00 00      	jne r1, 0x0, +0xb9 <.text+0x22360>
   21eb8: b7 07 00 00 03 00 00 00      	mov64 r7, 0x3
   21ec0: 71 a1 b0 fc 00 00 00 00      	ldxb r1, [r10 - 0x350]
   21ec8: 7b 1a b0 f8 00 00 00 00      	stxdw [r10 - 0x750], r1
   21ed0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   21ed8: 05 00 1e fb 00 00 00 00      	ja -0x4e2 <.text+0x1f6b0>
