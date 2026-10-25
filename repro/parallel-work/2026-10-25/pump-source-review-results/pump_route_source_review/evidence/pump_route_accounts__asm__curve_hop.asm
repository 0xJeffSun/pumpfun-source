   5b3b0: bf 56 00 00 00 00 00 00      	mov64 r6, r5
   5b3b8: 7b 3a a8 f5 00 00 00 00      	stxdw [r10 - 0xa58], r3
   5b3c0: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5b3c8: 7b 4a c0 f5 00 00 00 00      	stxdw [r10 - 0xa40], r4
   5b3d0: 79 49 10 00 00 00 00 00      	ldxdw r9, [r4 + 0x10]
   5b3d8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   5b3e0: 07 07 00 00 50 00 00 00      	add64 r7, 0x50
   5b3e8: 7b 2a b8 f5 00 00 00 00      	stxdw [r10 - 0xa48], r2
   5b3f0: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   5b3f8: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   5b400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b408: 07 01 00 00 d8 f7 ff ff      	add64 r1, -0x828
   5b410: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5b418: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5b420: 7b 4a b0 f5 00 00 00 00      	stxdw [r10 - 0xa50], r4
   5b428: 85 10 00 00 24 c3 ff ff      	call -0x3cdc
   5b430: 79 a1 d8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x828]
   5b438: 55 01 3c 00 02 00 00 00      	jne r1, 0x2, +0x3c <.text+0x5b500>
   5b440: 7b 8a a0 f5 00 00 00 00      	stxdw [r10 - 0xa60], r8
   5b448: 79 68 28 f0 00 00 00 00      	ldxdw r8, [r6 - 0xfd8]
   5b450: 7b 8a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r8
   5b458: 57 08 00 00 02 00 00 00      	and64 r8, 0x2
   5b460: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5b468: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0x5b358>
   5b470: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5b478: 79 61 20 f0 00 00 00 00      	ldxdw r1, [r6 - 0xfe0]
   5b480: 7b 1a 78 f5 00 00 00 00      	stxdw [r10 - 0xa88], r1
   5b488: 79 61 18 f0 00 00 00 00      	ldxdw r1, [r6 - 0xfe8]
   5b490: 7b 1a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r1
   5b498: 79 61 10 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff0]
   5b4a0: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5b4a8: 79 61 08 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff8]
   5b4b0: 7b 1a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r1
   5b4b8: 79 66 00 f0 00 00 00 00      	ldxdw r6, [r6 - 0x1000]
   5b4c0: 71 93 a3 00 00 00 00 00      	ldxb r3, [r9 + 0xa3]
   5b4c8: 71 92 a1 00 00 00 00 00      	ldxb r2, [r9 + 0xa1]
   5b4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b4d8: 07 01 00 00 c8 f7 ff ff      	add64 r1, -0x838
   5b4e0: 85 10 00 00 79 45 00 00      	call 0x4579
   5b4e8: 79 a1 c8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x838]
   5b4f0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5b3e0>
   5b4f8: 05 00 29 00 00 00 00 00      	ja +0x29 <.text+0x5b528>
   5b500: 71 91 a2 00 00 00 00 00      	ldxb r1, [r9 + 0xa2]
   5b770: 7b 6a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r6
   5b778: 7a 0a 48 f9 00 00 00 00      	stdw [r10 - 0x6b8], 0x0
   5b780: 7a 0a 40 f9 00 00 00 00      	stdw [r10 - 0x6c0], 0x0
   5b788: 7a 0a 38 f9 00 00 00 00      	stdw [r10 - 0x6c8], 0x0
   5b790: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5b798: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   5b7a0: 07 06 00 00 28 00 00 00      	add64 r6, 0x28
   5b7a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b7b0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5b7b8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5b7c0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5b7c8: 85 10 00 00 d5 af 02 00      	call 0x2afd5
   5b7d0: 7b 0a 70 f5 00 00 00 00      	stxdw [r10 - 0xa90], r0
   5b7d8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5b7e0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5b7e8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5b7f0: 7b 6a 60 f5 00 00 00 00      	stxdw [r10 - 0xaa0], r6
   5b7f8: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5b6e8>
   5b800: 05 00 46 00 00 00 00 00      	ja +0x46 <.text+0x5b918>
   5ba80: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5ba88: 7b 1a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r1
   5ba90: 79 14 58 00 00 00 00 00      	ldxdw r4, [r1 + 0x58]
   5ba98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5baa0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5baa8: 85 10 00 00 77 f9 ff ff      	call -0x689
   5bab0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5bab8: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   5bac0: 79 a6 30 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6d0]
   5bac8: 71 a2 5a f9 00 00 00 00      	ldxb r2, [r10 - 0x6a6]
   5bad0: 15 02 20 00 02 00 00 00      	jeq r2, 0x2, +0x20 <.text+0x5bab8>
   5bad8: 69 a3 58 f9 00 00 00 00      	ldxh r3, [r10 - 0x6a8]
   5bae0: 6b 3a 30 f8 00 00 00 00      	stxh [r10 - 0x7d0], r3
   5bae8: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   5baf0: 7b 3a 28 f8 00 00 00 00      	stxdw [r10 - 0x7d8], r3
   5baf8: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5bb00: 7b 3a 20 f8 00 00 00 00      	stxdw [r10 - 0x7e0], r3
   5bb08: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5bb10: 7b 3a 18 f8 00 00 00 00      	stxdw [r10 - 0x7e8], r3
   5bb18: 61 a3 5b f9 00 00 00 00      	ldxw r3, [r10 - 0x6a5]
   5bb20: 63 3a 33 f8 00 00 00 00      	stxw [r10 - 0x7cd], r3
   5bb28: 71 a3 5f f9 00 00 00 00      	ldxb r3, [r10 - 0x6a1]
   5bb30: 73 3a 37 f8 00 00 00 00      	stxb [r10 - 0x7c9], r3
   5bb38: 73 2a 32 f8 00 00 00 00      	stxb [r10 - 0x7ce], r2
   5bb40: 7b 1a 10 f8 00 00 00 00      	stxdw [r10 - 0x7f0], r1
   5bb48: 7b 6a 08 f8 00 00 00 00      	stxdw [r10 - 0x7f8], r6
   5bb50: 79 93 48 00 00 00 00 00      	ldxdw r3, [r9 + 0x48]
   5bb58: 79 92 40 00 00 00 00 00      	ldxdw r2, [r9 + 0x40]
   5bb60: 79 49 08 00 00 00 00 00      	ldxdw r9, [r4 + 0x8]
   5bb68: 79 94 58 00 00 00 00 00      	ldxdw r4, [r9 + 0x58]
   5bb70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bb78: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5bb80: 85 10 00 00 5c f9 ff ff      	call -0x6a4
   5bb88: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5bb90: 79 a4 30 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6d0]
   5bb98: 71 a1 5a f9 00 00 00 00      	ldxb r1, [r10 - 0x6a6]
   5bba0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5ba90>
   5bba8: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x5bb70>
   5bbb0: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5bbb8: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   5bbc0: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   5bbc8: 72 01 5a 00 02 00 00 00      	stb [r1 + 0x5a], 0x2
   5bbd0: 05 00 d7 00 00 00 00 00      	ja +0xd7 <.text+0x5c170>
   5bbd8: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5bbe0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5bbe8: 7b 62 00 00 00 00 00 00      	stxdw [r2 + 0x0], r6
   5bbf0: 72 02 5a 00 02 00 00 00      	stb [r2 + 0x5a], 0x2
   5bbf8: 05 00 6d ff 00 00 00 00      	ja -0x93 <.text+0x5b648>
   5bc00: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5bc08: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5bc10: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5bc18: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5bc20: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5bc28: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5bc30: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5bc38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5bc40: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5bc48: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5bb48>
   5bc50: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5bc58: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5bc60: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5bc68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5bc70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5bc78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5bc80: 55 02 5c ff 00 00 00 00      	jne r2, 0x0, -0xa4 <.text+0x5b648>
   5bc88: 05 00 3d 07 00 00 00 00      	ja +0x73d <.text+0x5f558>
   5bc90: 7b 9a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r9
   5bc98: 69 a2 58 f9 00 00 00 00      	ldxh r2, [r10 - 0x6a8]
   5bca0: 6b 2a 60 f8 00 00 00 00      	stxh [r10 - 0x7a0], r2
   5bca8: 79 a2 50 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6b0]
   5bcb0: 7b 2a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r2
   5bcb8: 79 a2 48 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6b8]
   5bcc0: 7b 2a 50 f8 00 00 00 00      	stxdw [r10 - 0x7b0], r2
   5bcc8: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5bcd0: 7b 2a 48 f8 00 00 00 00      	stxdw [r10 - 0x7b8], r2
   5bcd8: 61 a2 5b f9 00 00 00 00      	ldxw r2, [r10 - 0x6a5]
   5bce0: 63 2a 63 f8 00 00 00 00      	stxw [r10 - 0x79d], r2
   5bce8: 71 a2 5f f9 00 00 00 00      	ldxb r2, [r10 - 0x6a1]
   5bcf0: 73 2a 67 f8 00 00 00 00      	stxb [r10 - 0x799], r2
   5bcf8: 73 1a 62 f8 00 00 00 00      	stxb [r10 - 0x79e], r1
   5bd00: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   5bd08: 7b 3a 40 f8 00 00 00 00      	stxdw [r10 - 0x7c0], r3
   5bd10: 7b 4a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r4
   5bd18: 7b 4a 38 f8 00 00 00 00      	stxdw [r10 - 0x7c8], r4
   5bd20: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5bd28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd30: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd38: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5bd40: 7b 2a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r2
   5bd48: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5bd50: 7b 2a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r2
   5bd58: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5bd60: 7b 2a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r2
   5bd68: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd70: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5bd78: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5bd80: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5bd88: 7b 1a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r1
   5bd90: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5bd98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bda0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5bda8: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   5bdb0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5bdb8: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   5bdc0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5bdc8: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   5bdd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bdd8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5bde0: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   5bde8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5bdf0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bdf8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5be00: 7b 2a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r2
   5be08: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5be10: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   5be18: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5be20: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   5be28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5be30: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5be38: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   5be40: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5be48: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   5be50: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5be58: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   5be60: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5be68: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5be70: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5be78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5be80: 07 01 00 00 a8 f7 ff ff      	add64 r1, -0x858
   5be88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5be90: 07 02 00 00 c0 fc ff ff      	add64 r2, -0x340
   5be98: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5bea0: 07 03 00 00 68 f8 ff ff      	add64 r3, -0x798
   5bea8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5beb0: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5beb8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5bec0: 07 05 00 00 30 f9 ff ff      	add64 r5, -0x6d0
   5bec8: 85 10 00 00 a4 f9 ff ff      	call -0x65c
   5bed0: 79 a1 a8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x858]
   5bed8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5bdc8>
   5bee0: 05 00 60 00 00 00 00 00      	ja +0x60 <.text+0x5c0c8>
   5bee8: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5bef0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5bef8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5bf00: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5bdf0>
   5bf08: 05 00 7e 00 00 00 00 00      	ja +0x7e <.text+0x5c1e0>
   5bf10: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5bf18: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   5bf20: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5bf28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5bf30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bf38: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5bf40: 7b 1a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r1
   5bf48: 85 10 00 00 a5 69 ff ff      	call -0x965b
   5bf50: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5bf58: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5bf60: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5bf68: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5bf70: 7b 3a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r3
   5bf78: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5bf80: 7b 3a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r3
   5bf88: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5bf90: 7b 3a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r3
   5bf98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bfa0: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   5bfa8: 79 a3 38 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac8]
   5bfb0: 79 31 18 00 00 00 00 00      	ldxdw r1, [r3 + 0x18]
   5bfb8: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   5bfc0: 79 31 10 00 00 00 00 00      	ldxdw r1, [r3 + 0x10]
   5bfc8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   5bfd0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5bfd8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5bfe0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5bfe8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5bff0: bf a9 00 00 00 00 00 00      	mov64 r9, r10
   5bff8: 07 09 00 00 30 f9 ff ff      	add64 r9, -0x6d0
   5c000: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   5c008: 85 10 00 00 8d 69 ff ff      	call -0x9673
   5c010: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c018: 79 a2 b0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa50]
   5c020: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   5c028: 7b 2a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r2
   5c030: 7b 1a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r1
   5c038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c040: 07 01 00 00 38 f8 ff ff      	add64 r1, -0x7c8
   5c048: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5c050: 7b 9a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r9
   5c058: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c060: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5c068: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5c070: 7a 0a 18 f0 00 00 00 00      	stdw [r10 - 0xfe8], 0x0
   5c078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c080: 07 01 00 00 88 f7 ff ff      	add64 r1, -0x878
   5c088: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c090: 07 04 00 00 68 fb ff ff      	add64 r4, -0x498
   5c098: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c0a0: 7b 6a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r6
   5c0a8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5c0b0: 79 a3 28 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad8]
   5c0b8: 85 10 00 00 0a 71 ff ff      	call -0x8ef6
   5c0c0: 79 a1 88 f7 00 00 00 00      	ldxdw r1, [r10 - 0x878]
   5c0c8: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5c0d0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5bfc0>
   5c0d8: 05 00 e6 00 00 00 00 00      	ja +0xe6 <.text+0x5c6f0>
   5c300: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5c308: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5c310: 7b 1a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r1
   5c318: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c320: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c328: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   5c330: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c338: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   5c340: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c348: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   5c350: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c358: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5c360: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c368: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c370: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c378: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c380: 7b 2a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r2
   5c388: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c390: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   5c398: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c3a0: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   5c3a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c3b0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5c3b8: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5c3c0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5c3c8: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5c3d0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5c3d8: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5c3e0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5c3e8: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5c3f0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c3f8: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c408: 07 01 00 00 98 f7 ff ff      	add64 r1, -0x868
   5c410: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c418: 07 02 00 00 c0 fc ff ff      	add64 r2, -0x340
   5c420: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5c428: 07 03 00 00 68 f8 ff ff      	add64 r3, -0x798
   5c430: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c438: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5c440: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c448: 07 05 00 00 30 f9 ff ff      	add64 r5, -0x6d0
   5c450: 85 10 00 00 f3 f8 ff ff      	call -0x70d
   5c458: 79 a1 98 f7 00 00 00 00      	ldxdw r1, [r10 - 0x868]
   5c460: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5c468: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5c358>
   5c470: 05 00 f9 00 00 00 00 00      	ja +0xf9 <.text+0x5cb20>
   5c478: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5c480: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5c488: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5c490: 7b 1a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r1
   5c498: 15 01 25 00 00 00 00 00      	jeq r1, 0x0, +0x25 <.text+0x5c4a8>
   5c4a0: 79 63 38 00 00 00 00 00      	ldxdw r3, [r6 + 0x38]
   5c4a8: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   5c4b0: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c4b8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c4c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c4c8: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   5c4d0: 7b 4a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r4
   5c4d8: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   5c4e0: 7b 4a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r4
   5c4e8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5c4f0: 7b 4a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r4
   5c4f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c500: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5c508: 79 a9 38 f5 00 00 00 00      	ldxdw r9, [r10 - 0xac8]
   5c510: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5c518: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5c520: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5c528: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5c530: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5c538: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5c540: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5c548: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c558: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5c560: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5c568: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c570: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5c578: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5c580: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5c588: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c590: 07 01 00 00 78 f7 ff ff      	add64 r1, -0x888
   5c598: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c5a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5c5a8: 85 10 00 00 dc 43 00 00      	call 0x43dc
   5c5b0: 79 a1 78 f7 00 00 00 00      	ldxdw r1, [r10 - 0x888]
   5c5b8: 55 01 d2 00 02 00 00 00      	jne r1, 0x2, +0xd2 <.text+0x5cb30>
   5c5c0: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5c5c8: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c5d0: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c5d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c5e0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c5e8: 7b 2a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r2
   5c5f0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c5f8: 7b 2a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r2
   5c600: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c608: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5c610: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c618: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c620: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c628: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5c630: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5c638: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   5c640: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c648: 85 10 00 00 05 ae 02 00      	call 0x2ae05
   5c650: 79 a9 58 f5 00 00 00 00      	ldxdw r9, [r10 - 0xaa8]
   5c658: 79 92 58 00 00 00 00 00      	ldxdw r2, [r9 + 0x58]
   5c660: 7b 0a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r0
   5c668: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5c670: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5c678: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5c680: 15 01 57 00 00 00 00 00      	jeq r1, 0x0, +0x57 <.text+0x5c820>
   5c688: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c690: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   5c698: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c6a0: 7b 2a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r2
   5c6a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c6b0: 7b 2a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r2
   5c6b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c6c0: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5c6c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c6d0: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c6d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c6e0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5c6e8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5c6f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c6f8: 85 10 00 00 ef ad 02 00      	call 0x2adef
   5c700: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5c708: 79 a9 58 f5 00 00 00 00      	ldxdw r9, [r10 - 0xaa8]
   5c710: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5c718: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5c720: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <.text+0x5c820>
   5c940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c948: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5c950: 85 10 00 00 64 68 ff ff      	call -0x979c
   5c958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c960: 07 01 00 00 cf f8 ff ff      	add64 r1, -0x731
   5c968: 7b 1a b8 f8 00 00 00 00      	stxdw [r10 - 0x748], r1
   5c970: 18 01 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b683a
   5c980: 7b 1a 98 f8 00 00 00 00      	stxdw [r10 - 0x768], r1
   5c988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c990: 07 01 00 00 98 f8 ff ff      	add64 r1, -0x768
   5c998: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5c9a0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5c9a8: 7b 1a a8 f8 00 00 00 00      	stxdw [r10 - 0x758], r1
   5c9b0: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5c9b8: 73 1a cf f8 00 00 00 00      	stxb [r10 - 0x731], r1
   5c9c0: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5c9c8: 7a 0a c0 f8 01 00 00 00      	stdw [r10 - 0x740], 0x1
   5c9d0: 7a 0a b0 f8 20 00 00 00      	stdw [r10 - 0x750], 0x20
   5c9d8: 7a 0a a0 f8 0d 00 00 00      	stdw [r10 - 0x760], 0xd
   5c9e0: 7a 0a 90 f8 03 00 00 00      	stdw [r10 - 0x770], 0x3
   5c9e8: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5c9f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c9f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ca00: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5ca08: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c908>
   5ca10: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ca18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ca20: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ca28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ca30: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ca38: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ca40: 79 a3 b8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa48]
   5ca48: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c948>
   5ca50: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ca58: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ca60: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5ca68: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5ca70: 79 12 88 00 00 00 00 00      	ldxdw r2, [r1 + 0x88]
   5ca78: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5ca80: 07 06 00 00 30 f9 ff ff      	add64 r6, -0x6d0
   5ca88: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5ca90: 85 10 00 00 3c 68 ff ff      	call -0x97c4
   5ca98: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5caa0: 85 10 00 00 f8 8b 02 00      	call 0x28bf8
   5caa8: 7b 0a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r0
   5cab0: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cab8: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5cac0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5cac8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cad0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5cad8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c9d8>
   5cae0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5cae8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5caf0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5caf8: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   5cb00: 07 06 00 00 08 00 00 00      	add64 r6, 0x8
   5cb08: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5cb10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cb18: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   5cb20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5ca20>
   5cb28: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5cb30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cb38: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   5cb40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cb48: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cb50: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5cb58: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cb60: 85 10 00 00 b2 87 00 00      	call 0x87b2
   5cb68: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5cb70: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cb78: 55 01 11 00 00 00 00 00      	jne r1, 0x0, +0x11 <.text+0x5cae8>
   5cb80: 7b 3a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r3
   5cb88: 7b 6a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r6
   5cb90: 79 a9 30 f5 00 00 00 00      	ldxdw r9, [r10 - 0xad0]
   5cb98: 07 09 00 00 20 00 00 00      	add64 r9, 0x20
   5cba0: 79 a6 40 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6c0]
   5cba8: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5cbb0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5cbb8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5cbc0: 15 01 13 00 00 00 00 00      	jeq r1, 0x0, +0x13 <.text+0x5cb40>
   5cbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cbd0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cbd8: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5cbe0: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   5cbe8: 85 10 00 00 29 87 00 00      	call 0x8729
   5cbf0: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5cbf8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cc00: 15 01 1f 00 00 00 00 00      	jeq r1, 0x0, +0x1f <.text+0x5cbe0>
   5cc08: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cc10: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5cc18: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5cc20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5cc28: 72 02 5a 00 02 00 00 00      	stb [r2 + 0x5a], 0x2
   5cc30: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5cc38: 05 00 bb fe 00 00 00 00      	ja -0x145 <.text+0x5c0f8>
   5cc40: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   5cc48: 05 00 b4 fe 00 00 00 00      	ja -0x14c <.text+0x5c0d0>
   5cc50: 79 a2 80 f7 00 00 00 00      	ldxdw r2, [r10 - 0x880]
   5cc58: 05 00 b2 fe 00 00 00 00      	ja -0x14e <.text+0x5c0d0>
   5cc60: 7b 9a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r9
   5cc68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cc70: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cc78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cc80: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5cc88: 79 a9 88 f5 00 00 00 00      	ldxdw r9, [r10 - 0xa78]
   5cc90: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cc98: 85 10 00 00 88 70 00 00      	call 0x7088
   5cca0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cca8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cb98>
   5ccb0: 05 00 c1 01 00 00 00 00      	ja +0x1c1 <.text+0x5d9a0>
   5ccb8: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5ccc0: ad 39 01 00 00 00 00 00      	jlt r9, r3, +0x1 <.text+0x5cbb0>
   5ccc8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5cc20>
   5ccd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ccd8: 07 01 00 00 c8 f5 ff ff      	add64 r1, -0xa38
   5cd00: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cd08: 15 01 2d 00 00 00 00 00      	jeq r1, 0x0, +0x2d <.text+0x5cd58>
   5cd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cd18: 07 01 00 00 58 f7 ff ff      	add64 r1, -0x8a8
   5cd20: 85 10 00 00 a7 06 00 00      	call 0x6a7
   5cd28: 79 a1 58 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8a8]
   5cd30: 79 a2 60 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8a0]
   5cd38: 05 00 b1 01 00 00 00 00      	ja +0x1b1 <.text+0x5d9a8>
   5cd40: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5cd48: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5cd50: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5cd58: 7b 6a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r6
   5cd60: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5cd68: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5cd70: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5cd78: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5cd80: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   5cd88: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5cd90: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5cd98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cda0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cda8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cdb0: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5cdb8: 85 10 00 00 21 5a 00 00      	call 0x5a21
   5cdc0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cdc8: 55 01 13 00 00 00 00 00      	jne r1, 0x0, +0x13 <.text+0x5cd48>
   5cdd0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cdd8: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   5cde0: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   5cde8: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5cdf0: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x5cce8>
   5cdf8: 79 a1 48 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b8]
   5ce00: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   5ce08: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <.text+0x5cd00>
   5ce10: 79 a1 50 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b0]
   5ce18: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   5ce20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ce28: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5ce30: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5ce38: 79 a3 f8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb08]
   5ce40: 79 a4 f0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb10]
   5ce48: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   5ce50: 85 10 00 00 0e 47 00 00      	call 0x470e
   5ce58: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5ce60: 15 01 4b 00 00 00 00 00      	jeq r1, 0x0, +0x4b <.text+0x5cfa0>
   5ce68: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5ce70: 05 00 14 00 00 00 00 00      	ja +0x14 <.text+0x5cdf8>
   5ce78: 7b 9a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r9
   5ce80: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5ce88: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ce90: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ce98: 7b 6a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r6
   5cea0: 7b 3a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r3
   5cea8: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5ceb0: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5ceb8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5cec0: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5cec8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5ced0: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5ced8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cee0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cee8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cef0: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5cef8: 85 10 00 00 f9 59 00 00      	call 0x59f9
   5cf00: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5cf08: 79 a2 30 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d0]
   5cf10: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x5ce08>
   5cf18: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5cf20: 05 00 74 01 00 00 00 00      	ja +0x174 <.text+0x5d9a8>
   5cf28: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5cf30: 7b 2a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r2
   5cf38: 7b 2a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r2
   5cf40: 79 a2 28 f5 00 00 00 00      	ldxdw r2, [r10 - 0xad8]
   5cf48: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5ce38>
   5cf50: 7b 1a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r1
   5cf58: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cf60: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf68: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <.text+0x5ce60>
   5cf70: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cf78: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf80: 79 a6 48 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6b8]
   5cf88: 79 a7 50 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6b0]
   5cf90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cf98: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cfa0: 79 a2 10 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaf0]
   5cfa8: 79 a3 08 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf8]
   5cfb0: 79 a4 00 f5 00 00 00 00      	ldxdw r4, [r10 - 0xb00]
   5cfb8: 85 10 00 00 99 46 00 00      	call 0x4699
   5cfc0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cfc8: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   5cfd0: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0x5cec0>
   5cfd8: 7b 7a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r7
   5cfe0: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5cfe8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ced8>
   5cff0: 7b 6a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r6
   5cff8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d000: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cef0>
   5d008: 05 00 56 01 00 00 00 00      	ja +0x156 <.text+0x5d9a0>
   5d010: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d018: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5d020: 15 01 32 00 00 00 00 00      	jeq r1, 0x0, +0x32 <.text+0x5d098>
   5d028: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d030: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d038: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d040: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5d048: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   5d050: 85 10 00 00 11 70 00 00      	call 0x7011
   5d058: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d060: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cf50>
   5d068: 05 00 4a 01 00 00 00 00      	ja +0x14a <.text+0x5d9a0>
   5d070: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d078: 7b 1a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r1
   5d080: ad 18 01 00 00 00 00 00      	jlt r8, r1, +0x1 <.text+0x5cf70>
   5d088: 05 00 45 00 00 00 00 00      	ja +0x45 <.text+0x5d198>
   5d090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d098: 07 01 00 00 18 f7 ff ff      	add64 r1, -0x8e8
   5d0a0: 85 10 00 00 78 06 00 00      	call 0x678
   5d0a8: 79 a1 18 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8e8]
   5d0b0: 79 a2 20 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8e0]
   5d0b8: 05 00 41 01 00 00 00 00      	ja +0x141 <.text+0x5d9a8>
   5d0c0: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   5d0c8: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   5d0d0: 79 a1 50 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b0]
   5d0d8: 7b 1a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r1
   5d0e0: 79 a4 48 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6b8]
   5d0e8: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5d0f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d0f8: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d100: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d108: 7b 3a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r3
   5d110: 7b 4a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r4
   5d118: 85 10 00 00 6d 46 00 00      	call 0x466d
   5d120: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d128: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d018>
   5d130: 05 00 31 01 00 00 00 00      	ja +0x131 <.text+0x5d9a0>
   5d138: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5d140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d148: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d150: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d158: 7b 3a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r3
   5d160: 85 10 00 00 da 86 00 00      	call 0x86da
   5d168: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d170: 7b 1a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r1
   5d178: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d180: 15 01 77 00 00 00 00 00      	jeq r1, 0x0, +0x77 <.text+0x5d420>
   5d188: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d190: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5d198: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5d1a0: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5d1a8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5d1b0: 05 00 4e ff 00 00 00 00      	ja -0xb2 <.text+0x5cb08>
   5d1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d1c0: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5d1c8: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5da0
   5d1d8: 85 10 00 00 34 f4 01 00      	call 0x1f434
   5d1e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d1e8: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5d1f0: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5da0
   5d200: 85 10 00 00 e6 5a ff ff      	call -0xa51a
   5d208: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5d218: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5d220: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5d228: 62 0a 48 f9 ae 02 00 00      	stw [r10 - 0x6b8], 0x2ae
   5d230: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5d238: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5d240: 62 0a c8 f9 86 17 00 00      	stw [r10 - 0x638], 0x1786
   5d248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d250: 07 01 00 00 08 f7 ff ff      	add64 r1, -0x8f8
   5d258: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d260: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5d268: 85 10 00 00 18 7d 02 00      	call 0x27d18
   5d270: 79 a3 10 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8f0]
   5d278: 79 a2 08 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8f8]
   5d280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d288: 07 01 00 00 f8 f6 ff ff      	add64 r1, -0x908
   5d290: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5d298: 85 10 00 00 14 46 ff ff      	call -0xb9ec
   5d2a0: 79 a1 f8 f6 00 00 00 00      	ldxdw r1, [r10 - 0x908]
   5d2a8: 79 a2 00 f7 00 00 00 00      	ldxdw r2, [r10 - 0x900]
   5d2b0: 05 00 02 01 00 00 00 00      	ja +0x102 <.text+0x5d9a8>
   5d2b8: 79 a1 18 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae8]
   5d2c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d2c8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5d2d0: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5d2d8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5d2e0: 85 10 00 00 32 67 ff ff      	call -0x98ce
   5d2e8: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5d2f0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5d2f8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5d300: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5d308: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5d310: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5d318: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d320: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d330: 07 01 00 00 48 f7 ff ff      	add64 r1, -0x8b8
   5d338: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5d340: 07 04 00 00 08 f8 ff ff      	add64 r4, -0x7f8
   5d348: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d350: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5d358: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5d360: 85 10 00 00 df f9 ff ff      	call -0x621
   5d368: 79 a1 48 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b8]
   5d370: 55 01 41 00 02 00 00 00      	jne r1, 0x2, +0x41 <.text+0x5d460>
   5d378: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d380: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5d388: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5d390: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d398: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5d3a0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5d2a0>
   5d3a8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5d3b0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d3b8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5d3c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d3c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d3d0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5d3d8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5d2d8>
   5d3e0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5d3e8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d3f0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5d3f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d400: 07 01 00 00 38 f7 ff ff      	add64 r1, -0x8c8
   5d408: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d410: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   5d418: 79 a4 10 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf0]
   5d420: 85 10 00 00 f7 87 00 00      	call 0x87f7
   5d428: 79 a1 38 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8c8]
   5d430: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d320>
   5d438: 05 00 70 00 00 00 00 00      	ja +0x70 <.text+0x5d6a0>
   5d440: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5d448: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5d450: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5d458: 15 01 71 00 00 00 00 00      	jeq r1, 0x0, +0x71 <.text+0x5d6c8>
   5d460: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5d468: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5d358>
   5d470: 05 00 6e 00 00 00 00 00      	ja +0x6e <.text+0x5d6c8>
   5d478: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d480: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   5d488: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5d490: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5d498: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5d4a0: 7b 8a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r8
   5d4a8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5d4b0: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5d4b8: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5d4c0: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5d4c8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d4d0: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d4d8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5d4e0: 79 a3 c0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa40]
   5d4e8: 07 03 00 00 20 00 00 00      	add64 r3, 0x20
   5d4f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d4f8: 07 01 00 00 28 f7 ff ff      	add64 r1, -0x8d8
   5d500: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d508: 07 02 00 00 38 f8 ff ff      	add64 r2, -0x7c8
   5d510: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d518: 85 10 00 00 10 63 00 00      	call 0x6310
   5d520: 79 a1 28 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8d8]
   5d528: 15 01 57 00 02 00 00 00      	jeq r1, 0x2, +0x57 <.text+0x5d6c8>
   5d530: 79 a2 30 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d0]
   5d538: 05 00 51 00 00 00 00 00      	ja +0x51 <.text+0x5d6a8>
   5d540: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d7e8: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5d7f0: 1f 18 00 00 00 00 00 00      	sub64 r8, r1
   5d7f8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5d800: 7b 1a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r1
   5d808: 79 a1 e0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb20]
   5d810: 7b 1a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r1
   5d818: 79 a1 e8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb18]
   5d820: 7b 1a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r1
   5d828: 79 a5 00 f5 00 00 00 00      	ldxdw r5, [r10 - 0xb00]
   5d830: 7b 5a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r5
   5d838: 79 a4 08 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf8]
   5d840: 7b 4a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r4
   5d848: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   5d850: 7b 1a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r1
   5d858: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5d860: 7b 1a 08 f9 00 00 00 00      	stxdw [r10 - 0x6f8], r1
   5d868: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   5d870: 7b 1a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r1
   5d878: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   5d880: 7b 1a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r1
   5d888: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d890: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5d898: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5d8a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d8a8: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d8b0: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d8b8: 85 10 00 00 63 88 00 00      	call 0x8863
   5d8c0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d8c8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d7b8>
   5d8d0: 05 00 3d 00 00 00 00 00      	ja +0x3d <.text+0x5d9a0>
   5d8d8: 79 a6 38 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6c8]
   5d8e0: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   5d8e8: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5d8f0: 15 01 13 00 00 00 00 00      	jeq r1, 0x0, +0x13 <.text+0x5d870>
   5d8f8: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d900: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5d908: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d910: 79 a2 f8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb08]
   5d918: 7b 21 98 00 00 00 00 00      	stxdw [r1 + 0x98], r2
   5d920: 7b 1a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r1
   5d928: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5d930: 7b 21 90 00 00 00 00 00      	stxdw [r1 + 0x90], r2
   5d938: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5d940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d948: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d950: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d958: 79 a4 f0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb10]
   5d960: 79 a5 d0 f4 00 00 00 00      	ldxdw r5, [r10 - 0xb30]
   5d968: 85 10 00 00 4d 88 00 00      	call 0x884d
   5d970: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d978: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d868>
   5d980: 05 00 27 00 00 00 00 00      	ja +0x27 <.text+0x5d9a0>
   5d988: 79 a9 38 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6c8]
   5d990: bf 67 00 00 00 00 00 00      	mov64 r7, r6
   5d998: 0f 97 00 00 00 00 00 00      	add64 r7, r9
   5d9a0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5d9a8: ad 67 01 00 00 00 00 00      	jlt r7, r6, +0x1 <.text+0x5d898>
   5d9b0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5d9b8: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5d9c0: 55 01 bd 00 00 00 00 00      	jne r1, 0x0, +0xbd <.text+0x5de90>
   5d9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d9d0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d9d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d9e0: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5d9e8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5d9f0: 85 10 00 00 dd 6e 00 00      	call 0x6edd
   5d9f8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5da00: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d8f0>
   5da08: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x5d9a0>
   5da10: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5da18: 7b 1a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r1
   5da20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da28: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5da30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5da38: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5da40: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5da48: 85 10 00 00 d2 6e 00 00      	call 0x6ed2
   5da50: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5da58: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d948>
   5da60: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0x5d9a0>
   5da68: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5da70: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
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
   5dd48: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   5dd50: 15 02 5f 00 02 00 00 00      	jeq r2, 0x2, +0x5f <.text+0x5df30>
   5dd58: 05 00 67 00 00 00 00 00      	ja +0x67 <.text+0x5df78>
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
   5e0b8: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5e0c0: 55 01 0d 00 00 00 00 00      	jne r1, 0x0, +0xd <.text+0x5e010>
   5e0c8: 79 a8 88 f5 00 00 00 00      	ldxdw r8, [r10 - 0xa78]
   5e0d0: 1f 98 00 00 00 00 00 00      	sub64 r8, r9
   5e0d8: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5e0e0: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   5e0e8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5e0f0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5e0f8: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   5e100: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5e108: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   5e110: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5e118: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5e120: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5e128: 05 00 db fe 00 00 00 00      	ja -0x125 <.text+0x5d6e8>
   5e130: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5e138: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   5e140: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5e148: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5e150: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5e158: 79 a3 90 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa70]
   5e160: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5e168: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5e170: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5e178: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5e180: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e188: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e190: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e198: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1a8: 07 01 00 00 a8 f6 ff ff      	add64 r1, -0x958
   5e1b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e1b8: 07 02 00 00 08 f8 ff ff      	add64 r2, -0x7f8
   5e1c0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e1c8: 79 a3 30 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad0]
   5e1d0: 85 10 00 00 cf 69 00 00      	call 0x69cf
   5e1d8: 79 a1 b0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x950]
   5e1e0: 79 a2 a8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x958]
   5e1e8: 15 02 db ff 02 00 00 00      	jeq r2, 0x2, -0x25 <.text+0x5dfa8>
   5e1f0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x5df78>
   5e1f8: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5e200: 55 01 1a 00 00 00 00 00      	jne r1, 0x0, +0x1a <.text+0x5e1b8>
   5e208: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5e210: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e218: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e220: 55 01 32 00 00 00 00 00      	jne r1, 0x0, +0x32 <.text+0x5e298>
   5e228: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5e230: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e238: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e240: 15 01 2e 00 00 00 00 00      	jeq r1, 0x0, +0x2e <.text+0x5e298>
   5e248: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5e250: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <.text+0x5e298>
   5e258: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   5e260: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e268: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e270: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5e278: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e280: 85 10 00 00 3e 65 ff ff      	call -0x9ac2
   5e288: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e290: 07 01 00 00 78 f6 ff ff      	add64 r1, -0x988
   5e298: 79 a2 50 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab0]
   5e2a0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e2a8: 79 a4 90 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa70]
   5e2b0: 85 10 00 00 60 70 00 00      	call 0x7060
   5e2b8: 79 a1 78 f6 00 00 00 00      	ldxdw r1, [r10 - 0x988]
   5e2c0: 15 01 1e 00 02 00 00 00      	jeq r1, 0x2, +0x1e <.text+0x5e298>
   5e2c8: 79 a2 80 f6 00 00 00 00      	ldxdw r2, [r10 - 0x980]
   5e2d0: 05 00 9e fe 00 00 00 00      	ja -0x162 <.text+0x5d6a8>
   5e2d8: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5e2e0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e2e8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e2f0: 15 01 08 01 00 00 00 00      	jeq r1, 0x0, +0x108 <.text+0x5ea18>
   5e2f8: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5e300: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5e308: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5e310: 7b 7a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r7
   5e318: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5e320: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5e328: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5e330: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e338: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e340: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e348: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e350: 79 a3 c0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa40]
   5e358: 07 03 00 00 20 00 00 00      	add64 r3, 0x20
   5e360: 79 a4 b8 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa48]
   5e368: 07 04 00 00 38 00 00 00      	add64 r4, 0x38
   5e370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e378: 07 01 00 00 88 f6 ff ff      	add64 r1, -0x978
   5e380: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e388: 07 02 00 00 38 f8 ff ff      	add64 r2, -0x7c8
   5e390: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e398: 85 10 00 00 a4 6b 00 00      	call 0x6ba4
   5e3a0: 79 a1 88 f6 00 00 00 00      	ldxdw r1, [r10 - 0x978]
   5e3a8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5e298>
   5e3b0: 05 00 fb 00 00 00 00 00      	ja +0xfb <.text+0x5ea70>
   5e3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e3c0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5e3c8: 85 10 00 00 ad 84 02 00      	call 0x284ad
   5e3d0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5e3d8: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x5e330>
   5e3e0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5e3e8: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5e3f0: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5e3f8: 7b 3a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r3
   5e400: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5e408: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5e410: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e418: 07 01 00 00 68 f6 ff ff      	add64 r1, -0x998
   5e420: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e428: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5e430: 85 10 00 00 f0 7a 02 00      	call 0x27af0
   5e438: 79 a1 68 f6 00 00 00 00      	ldxdw r1, [r10 - 0x998]
   5e440: 79 a2 70 f6 00 00 00 00      	ldxdw r2, [r10 - 0x990]
   5e448: 05 00 cf fe 00 00 00 00      	ja -0x131 <.text+0x5d9a8>
   5eb40: 07 01 00 00 98 f6 ff ff      	add64 r1, -0x968
   5eb48: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5eb50: 79 a3 a8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa58]
   5eb58: 79 a4 50 f5 00 00 00 00      	ldxdw r4, [r10 - 0xab0]
   5eb60: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   5eb68: 85 10 00 00 7d f4 ff ff      	call -0xb83
   5eb70: 79 a1 98 f6 00 00 00 00      	ldxdw r1, [r10 - 0x968]
   5eb78: 15 01 d1 fe 02 00 00 00      	jeq r1, 0x2, -0x12f <.text+0x5e0e8>
