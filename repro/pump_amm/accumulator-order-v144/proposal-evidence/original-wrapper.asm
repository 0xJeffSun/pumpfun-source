
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   e6710: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   e6718: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   e6720: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   e6728: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   e6730: 18 01 00 00 99 e8 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11e899
   e6740: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   e6748: 85 10 00 00 ff ff ff ff      	call -0x1
   e6750: 6a 0a ee fd ff ff 00 00      	sth [r10 - 0x212], 0xffff
   e6758: 7b 8a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r8
   e6760: 7b 9a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r9
   e6768: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6770: 07 01 00 00 ee fd ff ff      	add64 r1, -0x212
   e6778: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   e6780: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6788: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   e6790: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   e6798: 07 03 00 00 f0 fd ff ff      	add64 r3, -0x210
   e67a0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e67a8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   e67b0: 85 10 00 00 5c d2 ff ff      	call -0x2da4
   e67b8: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   e67c0: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]
   e67c8: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   e67d0: 15 06 94 00 02 00 00 00      	jeq r6, 0x2, +0x94 <.text+0xe6b58>
   e67d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e67e0: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   e67e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e67f0: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   e67f8: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   e6800: b7 03 00 00 ea 00 00 00      	mov64 r3, 0xea
   e6808: 85 10 00 00 11 66 00 00      	call 0x6611
   e6810: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   e6818: 63 1a fb fe 00 00 00 00      	stxw [r10 - 0x105], r1
   e6820: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   e6828: 73 1a ff fe 00 00 00 00      	stxb [r10 - 0x101], r1
   e6830: 73 6a fa fe 00 00 00 00      	stxb [r10 - 0x106], r6
   e6838: 7b 9a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r9
   e6840: 7b 8a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r8
   e6848: 71 a1 ef fd 00 00 00 00      	ldxb r1, [r10 - 0x211]
   e6850: 73 1a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r1
   e6858: 71 a1 ee fd 00 00 00 00      	ldxb r1, [r10 - 0x212]
   e6860: 73 1a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r1
   e6868: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   e6870: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   e6878: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   e6880: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   e6888: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6890: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   e6898: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   e68a0: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   e68a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e68b0: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   e68b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e68c0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   e68c8: 85 10 00 00 f8 ec fe ff      	call -0x11308
   e68d0: 79 a8 d8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x228]
   e68d8: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0xe67c8>
   e68e0: 05 00 41 00 00 00 00 00      	ja +0x41 <.text+0xe69d0>
   e68e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e68f0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   e68f8: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   e6900: 18 03 00 00 3e e5 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x11e53e
   e6910: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   e6918: 85 10 00 00 f3 3b fe ff      	call -0x1c40d
   e6920: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   e6928: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   e6930: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <.text+0xe6860>
   e6938: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   e6940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6948: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   e6950: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   e6960: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   e6968: 85 10 00 00 81 36 fe ff      	call -0x1c97f
   e6970: 79 a9 c0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x240]
   e6978: 79 a8 b8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x248]
   e6980: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   e6988: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   e6990: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6998: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e69a0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e69a8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe68a8>
   e69b0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e69b8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e69c0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e69c8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e69d0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e69d8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e69e0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe68e0>
   e69e8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e69f0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e69f8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6a00: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   e6a08: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   e6a10: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6a18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6a20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6a28: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6928>
   e6a30: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6a38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6a40: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6a48: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6a50: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6a58: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6a60: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6960>
   e6a68: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6a70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6a78: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6a80: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   e6a88: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   e6a90: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6a98: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6aa0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6aa8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe69a8>
   e6ab0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6ab8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6ac0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6ac8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6ad0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6ad8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6ae0: 55 02 32 00 00 00 00 00      	jne r2, 0x0, +0x32 <.text+0xe6b58>
   e6ae8: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xe6b40>
   e6af0: 79 a9 e0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x220]
   e6af8: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   e6b00: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   e6b08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6b10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6b18: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6b20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6a20>
   e6b28: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6b30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6b38: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6b40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6b48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6b50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6b58: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6a58>
   e6b60: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6b68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6b70: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6b78: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   e6b80: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   e6b88: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6b90: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6b98: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6ba0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6aa0>
   e6ba8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6bb0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6bb8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6bc0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6bc8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6bd0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6bd8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6ad8>
   e6be0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6be8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6bf0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6bf8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   e6c00: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   e6c08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6c10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6c18: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6c20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6b20>
   e6c28: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6c30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6c38: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6c40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6c48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6c50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6c58: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6b58>
   e6c60: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6c68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6c70: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6c78: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   e6c80: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   e6c88: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   e6c90: 95 00 00 00 00 00 00 00      	exit
