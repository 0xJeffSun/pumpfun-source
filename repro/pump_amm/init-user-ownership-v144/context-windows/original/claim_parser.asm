
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   c8588: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   c8590: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   c8598: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   c85a0: 15 01 59 00 00 00 00 00      	jeq r1, 0x0, +0x59 <.text+0xc8750>
   c85a8: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
   c85b0: 7b 2a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r2
   c85b8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   c85c0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   c85c8: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   c85d0: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   c85d8: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   c85e0: 07 05 00 00 30 00 00 00      	add64 r5, 0x30
   c85e8: 7b 5a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r5
   c85f0: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   c85f8: 7b 53 00 00 00 00 00 00      	stxdw [r3 + 0x0], r5
   c8600: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   c8608: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   c8610: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   c8618: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   c8620: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xc8510>
   c8628: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
   c8630: 7b 6a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r6
   c8638: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   c8640: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   c8648: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <.text+0xc8538>
   c8650: 85 10 00 00 ff ff ff ff      	call -0x1
   c8658: 79 27 10 00 00 00 00 00      	ldxdw r7, [r2 + 0x10]
   c8660: 79 70 00 00 00 00 00 00      	ldxdw r0, [r7 + 0x0]
   c8668: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   c8670: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
   c8678: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xc8568>
   c8680: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
   c8688: 7b 8a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r8
   c8690: 7b 07 00 00 00 00 00 00      	stxdw [r7 + 0x0], r0
   c8698: 55 06 01 00 01 00 00 00      	jne r6, 0x1, +0x1 <.text+0xc8588>
   c86a0: 05 00 f5 ff 00 00 00 00      	ja -0xb <.text+0xc8530>
   c86a8: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   c86b0: 7b 5a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r5
   c86b8: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   c86c0: 71 28 28 00 00 00 00 00      	ldxb r8, [r2 + 0x28]
   c86c8: 71 25 29 00 00 00 00 00      	ldxb r5, [r2 + 0x29]
   c86d0: 71 20 2a 00 00 00 00 00      	ldxb r0, [r2 + 0x2a]
   c86d8: 73 0a 4a f8 00 00 00 00      	stxb [r10 - 0x7b6], r0
   c86e0: 73 5a 49 f8 00 00 00 00      	stxb [r10 - 0x7b7], r5
   c86e8: 73 8a 48 f8 00 00 00 00      	stxb [r10 - 0x7b8], r8
   c86f0: 7b 6a 40 f8 00 00 00 00      	stxdw [r10 - 0x7c0], r6
   c86f8: 79 a5 50 f5 00 00 00 00      	ldxdw r5, [r10 - 0xab0]
   c8700: 7b 5a 38 f8 00 00 00 00      	stxdw [r10 - 0x7c8], r5
   c8708: 7b 7a 30 f8 00 00 00 00      	stxdw [r10 - 0x7d0], r7
   c8710: 7b 9a 28 f8 00 00 00 00      	stxdw [r10 - 0x7d8], r9
   c8718: 7b 3a 20 f8 00 00 00 00      	stxdw [r10 - 0x7e0], r3
   c8720: 15 04 3b 00 00 00 00 00      	jeq r4, 0x0, +0x3b <.text+0xc87e0>
   c8728: 79 a3 40 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac0]
   c8730: 7b 3a 50 f8 00 00 00 00      	stxdw [r10 - 0x7b0], r3
   c8738: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   c8740: 79 a8 48 f5 00 00 00 00      	ldxdw r8, [r10 - 0xab8]
   c8748: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   c8750: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   c8758: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   c8760: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8768: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8770: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c8778: 85 10 00 00 d1 8f fe ff      	call -0x1702f
   c8780: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   c8788: 79 a9 60 f8 00 00 00 00      	ldxdw r9, [r10 - 0x7a0]
   c8790: 79 a7 58 f8 00 00 00 00      	ldxdw r7, [r10 - 0x7a8]
   c8798: 79 a6 58 f5 00 00 00 00      	ldxdw r6, [r10 - 0xaa8]
   c87a0: 15 07 36 00 00 00 00 00      	jeq r7, 0x0, +0x36 <.text+0xc8838>
   c87a8: 7b 3a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r3
   c87b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c87b8: 07 01 00 00 78 fa ff ff      	add64 r1, -0x588
   c87c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c87c8: 07 02 00 00 70 f8 ff ff      	add64 r2, -0x790
   c87d0: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   c87d8: 85 10 00 00 17 a2 00 00      	call 0xa217
   c87e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c87e8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c87f0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c87f8: 85 10 00 00 3a 6f fe ff      	call -0x190c6
   c8800: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8808: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c8810: 61 a1 08 f9 00 00 00 00      	ldxw r1, [r10 - 0x6f8]
   c8818: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xc8708>
   c8820: 05 00 30 00 00 00 00 00      	ja +0x30 <.text+0xc8888>
   c8828: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8830: 07 01 00 00 a0 f5 ff ff      	add64 r1, -0xa60
   c8838: 18 04 00 00 df e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0df
   c8848: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   c8850: 85 10 00 00 a4 72 fe ff      	call -0x18d5c
   c8858: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   c8860: 79 a2 a8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa58]
   c8868: 05 00 77 00 00 00 00 00      	ja +0x77 <.text+0xc8b08>
   c8870: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8878: 07 01 00 00 70 f5 ff ff      	add64 r1, -0xa90
   c8880: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   c8888: 85 10 00 00 b5 7a 00 00      	call 0x7ab5
   c8890: 79 a3 78 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa88]
   c8898: 79 a2 70 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa90]
   c88a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c88a8: 07 01 00 00 60 f5 ff ff      	add64 r1, -0xaa0
   c88b0: 18 04 00 00 04 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c004
   c88c0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   c88c8: 85 10 00 00 95 72 fe ff      	call -0x18d6b
   c88d0: 79 a1 60 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa0]
   c88d8: 79 a2 68 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa98]
   c88e0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   c88e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   c88f0: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   c88f8: 05 00 78 00 00 00 00 00      	ja +0x78 <.text+0xc8ba0>
   c8900: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8908: 07 01 00 00 80 f5 ff ff      	add64 r1, -0xa80
   c8910: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   c8918: 85 10 00 00 a3 7a 00 00      	call 0x7aa3
   c8920: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   c8928: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   c8930: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   c8938: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   c8940: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   c8948: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   c8950: 05 00 5f 00 00 00 00 00      	ja +0x5f <.text+0xc8b30>
   c8958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8960: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   c8968: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   c8970: 18 04 00 00 27 ce 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11ce27
   c8980: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   c8988: 85 10 00 00 7d 72 fe ff      	call -0x18d83
   c8990: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   c8998: 79 a2 98 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa68]
   c89a0: 05 00 50 00 00 00 00 00      	ja +0x50 <.text+0xc8b08>
   c89a8: 7b 1a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r1
   c89b0: 7b 2a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r2
   c89b8: 7b 3a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r3
   c89c0: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   c89c8: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   c89d0: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c89d8: 7b 1a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r1
   c89e0: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   c89e8: 7b 1a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r1
   c89f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c89f8: 07 01 00 00 f0 fc ff ff      	add64 r1, -0x310
   c8a00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c8a08: 07 02 00 00 80 f8 ff ff      	add64 r2, -0x780
   c8a10: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   c8a18: 85 10 00 00 cf a1 00 00      	call 0xa1cf
   c8a20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8a28: 07 01 00 00 a8 fc ff ff      	add64 r1, -0x358
   c8a30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c8a38: 07 02 00 00 c0 f8 ff ff      	add64 r2, -0x740
   c8a40: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   c8a48: 85 10 00 00 c9 a1 00 00      	call 0xa1c9
   c8a50: 79 a1 0c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f4]
   c8a58: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   c8a60: 79 a1 14 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6ec]
   c8a68: 7b 1a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r1
   c8a70: 79 a1 1c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e4]
   c8a78: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   c8a80: 79 a1 24 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6dc]
   c8a88: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   c8a90: 61 a1 2c f9 00 00 00 00      	ldxw r1, [r10 - 0x6d4]
   c8a98: 63 1a a0 fc 00 00 00 00      	stxw [r10 - 0x360], r1
   c8aa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8aa8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8ab0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c8ab8: 85 10 00 00 3b 8f fe ff      	call -0x170c5
   c8ac0: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8ac8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c8ad0: 71 a1 b1 f8 00 00 00 00      	ldxb r1, [r10 - 0x74f]
   c8ad8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xc89c8>
   c8ae0: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0xc8a10>
   c8ae8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8af0: 07 01 00 00 b0 f5 ff ff      	add64 r1, -0xa50
   c8af8: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   c8b08: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   c8b10: 85 10 00 00 4c 72 fe ff      	call -0x18db4
   c8b18: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   c8b20: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   c8b28: 05 00 1f 00 00 00 00 00      	ja +0x1f <.text+0xc8b08>
   c8b30: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   c8b38: 7b 2a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r2
   c8b40: 7b 3a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r3
   c8b48: 7b 7a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r7
   c8b50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8b58: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   c8b60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c8b68: 07 02 00 00 68 f8 ff ff      	add64 r2, -0x798
   c8b70: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   c8b78: 85 10 00 00 a3 a1 00 00      	call 0xa1a3
   c8b80: 61 a1 b2 f8 00 00 00 00      	ldxw r1, [r10 - 0x74e]
   c8b88: 63 1a 40 fd 00 00 00 00      	stxw [r10 - 0x2c0], r1
   c8b90: 69 a1 b6 f8 00 00 00 00      	ldxh r1, [r10 - 0x74a]
   c8b98: 6b 1a 44 fd 00 00 00 00      	stxh [r10 - 0x2bc], r1
   c8ba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8ba8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8bb0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c8bb8: 85 10 00 00 d9 6e fe ff      	call -0x19127
   c8bc0: 61 a7 58 f8 00 00 00 00      	ldxw r7, [r10 - 0x7a8]
   c8bc8: 15 07 01 00 02 00 00 00      	jeq r7, 0x2, +0x1 <.text+0xc8ab8>
   c8bd0: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0xc8ba8>
   c8bd8: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   c8be0: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   c8be8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8bf0: 07 01 00 00 c0 f5 ff ff      	add64 r1, -0xa40
   c8bf8: 18 04 00 00 c4 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c0c4
   c8c08: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   c8c10: 85 10 00 00 2c 72 fe ff      	call -0x18dd4
   c8c18: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   c8c20: 79 a2 c8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa38]
   c8c28: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   c8c30: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   c8c38: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   c8c40: 79 a7 30 f8 00 00 00 00      	ldxdw r7, [r10 - 0x7d0]
   c8c48: 79 a9 28 f8 00 00 00 00      	ldxdw r9, [r10 - 0x7d8]
   c8c50: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   c8c58: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c8c60: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   c8c68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xc8b68>
   c8c70: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   c8c78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c8c80: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   c8c88: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   c8c90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c8c98: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   c8ca0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xc8ba0>
   c8ca8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   c8cb0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c8cb8: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   c8cc0: 95 00 00 00 00 00 00 00      	exit
   c8cc8: 7b 9a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r9
   c8cd0: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   c8cd8: 61 a1 5c f8 00 00 00 00      	ldxw r1, [r10 - 0x7a4]
   c8ce0: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   c8ce8: 79 a6 60 f8 00 00 00 00      	ldxdw r6, [r10 - 0x7a0]
   c8cf0: 79 a9 68 f8 00 00 00 00      	ldxdw r9, [r10 - 0x798]
   c8cf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8d00: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   c8d08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c8d10: 07 02 00 00 70 f8 ff ff      	add64 r2, -0x790
   c8d18: b7 03 00 00 68 00 00 00      	mov64 r3, 0x68
   c8d20: 85 10 00 00 6e a1 00 00      	call 0xa16e
   c8d28: 7b 9a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r9
   c8d30: 7b 6a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r6
   c8d38: 79 a1 f0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb10]
   c8d40: 63 1a 9c fd 00 00 00 00      	stxw [r10 - 0x264], r1
   c8d48: 63 7a 98 fd 00 00 00 00      	stxw [r10 - 0x268], r7
   c8d50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8d58: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8d60: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c8d68: 85 10 00 00 76 6e fe ff      	call -0x1918a
   c8d70: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8d78: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c8d80: bf 87 00 00 00 00 00 00      	mov64 r7, r8
   c8d88: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xc8c78>
   c8d90: 05 00 27 00 00 00 00 00      	ja +0x27 <.text+0xc8db0>
   c8d98: 7b 3a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r3
   c8da0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8da8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8db0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c8db8: 85 10 00 00 b2 8f fe ff      	call -0x1704e
   c8dc0: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8dc8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c8dd0: 79 a6 58 f5 00 00 00 00      	ldxdw r6, [r10 - 0xaa8]
   c8dd8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xc8cc8>
   c8de0: 05 00 2a 00 00 00 00 00      	ja +0x2a <.text+0xc8e18>
   c8de8: 7b 3a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r3
   c8df0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8df8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8e00: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c8e08: 85 10 00 00 5f 8f fe ff      	call -0x170a1
   c8e10: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8e18: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c8e20: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xc8d10>
   c8e28: 05 00 2a 00 00 00 00 00      	ja +0x2a <.text+0xc8e60>
   c8e30: 7b 3a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r3
   c8e38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8e40: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c8e48: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c8e50: 85 10 00 00 a3 72 fe ff      	call -0x18d5d
   c8e58: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c8e60: 79 a8 58 f8 00 00 00 00      	ldxdw r8, [r10 - 0x7a8]
   c8e68: 71 a1 82 f8 00 00 00 00      	ldxb r1, [r10 - 0x77e]
   c8e70: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xc8d60>
   c8e78: 05 00 29 00 00 00 00 00      	ja +0x29 <.text+0xc8ea8>
   c8e80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8e88: 07 01 00 00 d0 f5 ff ff      	add64 r1, -0xa30
   c8e90: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c8e98: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   c8ea8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   c8eb0: 85 10 00 00 d8 71 fe ff      	call -0x18e28
   c8eb8: 79 a1 d0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa30]
   c8ec0: 79 a2 d8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa28]
   c8ec8: 05 00 ab ff 00 00 00 00      	ja -0x55 <.text+0xc8b08>
   c8ed0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8ed8: 07 01 00 00 10 f8 ff ff      	add64 r1, -0x7f0
   c8ee0: 18 04 00 00 02 e1 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e102
   c8ef0: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   c8ef8: 85 10 00 00 cf 71 fe ff      	call -0x18e31
   c8f00: 79 a1 10 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7f0]
   c8f08: 79 a2 18 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e8]
   c8f10: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   c8f18: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   c8f20: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   c8f28: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   c8f30: 05 00 a1 ff 00 00 00 00      	ja -0x5f <.text+0xc8b20>
   c8f38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8f40: 07 01 00 00 00 f8 ff ff      	add64 r1, -0x800
   c8f48: 18 04 00 00 d1 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0d1
   c8f58: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   c8f60: 85 10 00 00 c2 71 fe ff      	call -0x18e3e
   c8f68: 79 a1 00 f8 00 00 00 00      	ldxdw r1, [r10 - 0x800]
   c8f70: 79 a2 08 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f8]
   c8f78: 05 00 95 ff 00 00 00 00      	ja -0x6b <.text+0xc8b08>
   c8f80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c8f88: 07 01 00 00 f0 f7 ff ff      	add64 r1, -0x810
   c8f90: 18 04 00 00 0f e1 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e10f
   c8fa0: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   c8fa8: 85 10 00 00 b9 71 fe ff      	call -0x18e47
   c8fb0: 79 a1 f0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x810]
   c8fb8: 79 a2 f8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x808]
   c8fc0: 05 00 8c ff 00 00 00 00      	ja -0x74 <.text+0xc8b08>
   c8fc8: 7b 3a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r3
   c8fd0: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   c8fd8: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   c8fe0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   c8fe8: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   c8ff0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   c8ff8: 69 a1 80 f8 00 00 00 00      	ldxh r1, [r10 - 0x780]
   c9000: 6b 1a 48 fe 00 00 00 00      	stxh [r10 - 0x1b8], r1
   c9008: 61 a1 83 f8 00 00 00 00      	ldxw r1, [r10 - 0x77d]
   c9010: 63 1a 30 fe 00 00 00 00      	stxw [r10 - 0x1d0], r1
   c9018: 71 a1 87 f8 00 00 00 00      	ldxb r1, [r10 - 0x779]
   c9020: 73 1a 34 fe 00 00 00 00      	stxb [r10 - 0x1cc], r1
   c9028: 79 a9 68 f8 00 00 00 00      	ldxdw r9, [r10 - 0x798]
   c9030: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9038: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c9040: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c9048: 85 10 00 00 a5 8f fe ff      	call -0x1705b
   c9050: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c9058: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c9060: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xc8f50>
   c9068: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0xc9038>
   c9070: 7b 3a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r3
   c9078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9080: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c9088: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c9090: 85 10 00 00 38 8d fe ff      	call -0x172c8
   c9098: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   c90a0: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   c90a8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xc8f98>
   c90b0: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0xc9080>
   c90b8: 7b 3a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r3
   c90c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c90c8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c90d0: 85 10 00 00 c9 7b 00 00      	call 0x7bc9
   c90d8: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   c90e0: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   c90e8: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c90f0: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   c90f8: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   c9100: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   c9108: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   c9110: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <.text+0xc9158>
   c9118: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9120: 07 01 00 00 c0 f7 ff ff      	add64 r1, -0x840
   c9128: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9130: 07 02 00 00 70 fe ff ff      	add64 r2, -0x190
   c9138: 85 10 00 00 e0 73 00 00      	call 0x73e0
   c9140: 79 a1 c0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x840]
   c9148: 79 a2 c8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x838]
   c9150: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0xc90c0>
   c9158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9160: 07 01 00 00 e0 f7 ff ff      	add64 r1, -0x820
   c9168: 18 04 00 00 ca e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ca
   c9178: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   c9180: 85 10 00 00 7e 71 fe ff      	call -0x18e82
   c9188: 79 a1 e0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x820]
   c9190: 79 a2 e8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x818]
   c9198: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0xc90c0>
   c91a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c91a8: 07 01 00 00 d0 f7 ff ff      	add64 r1, -0x830
   c91b0: 18 04 00 00 a8 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0a8
   c91c0: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   c91c8: 85 10 00 00 75 71 fe ff      	call -0x18e8b
   c91d0: 79 a1 d0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x830]
   c91d8: 79 a2 d8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x828]
   c91e0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   c91e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   c91f0: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   c91f8: 79 a2 f0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb10]
   c9200: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   c9208: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c9210: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   c9218: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xc9118>
   c9220: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   c9228: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c9230: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   c9238: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   c9240: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c9248: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   c9250: 55 01 3d ff 00 00 00 00      	jne r1, 0x0, -0xc3 <.text+0xc8b20>
   c9258: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   c9260: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   c9268: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   c9270: 05 00 39 ff 00 00 00 00      	ja -0xc7 <.text+0xc8b20>
   c9278: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   c9280: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   c9288: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   c9290: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   c9298: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   c92a0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   c92a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c92b0: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   c92b8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   c92c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c92c8: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   c92d0: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   c92d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c92e0: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   c92e8: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   c92f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c92f8: 07 01 00 00 20 f8 ff ff      	add64 r1, -0x7e0
   c9300: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   c9308: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9310: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   c9318: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   c9320: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9328: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   c9330: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   c9338: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9340: 07 01 00 00 50 f8 ff ff      	add64 r1, -0x7b0
   c9348: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   c9350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9358: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c9360: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9368: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   c9370: 85 10 00 00 4f 03 00 00      	call 0x34f
   c9378: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   c9380: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   c9388: 61 a3 08 f9 00 00 00 00      	ldxw r3, [r10 - 0x6f8]
   c9390: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   c9398: 15 03 c8 ff 02 00 00 00      	jeq r3, 0x2, -0x38 <.text+0xc90c0>
   c93a0: 7b 2a c0 f4 00 00 00 00      	stxdw [r10 - 0xb40], r2
   c93a8: 7b 1a c8 f4 00 00 00 00      	stxdw [r10 - 0xb38], r1
   c93b0: 7b 8a d0 f4 00 00 00 00      	stxdw [r10 - 0xb30], r8
   c93b8: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   c93c0: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   c93c8: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c93d0: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   c93d8: 79 a7 78 f8 00 00 00 00      	ldxdw r7, [r10 - 0x788]
   c93e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c93e8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   c93f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c93f8: 07 02 00 00 80 f8 ff ff      	add64 r2, -0x780
   c9400: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   c9408: 85 10 00 00 91 a0 00 00      	call 0xa091
   c9410: 79 a1 0c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f4]
   c9418: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   c9420: 79 a1 14 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6ec]
   c9428: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   c9430: 79 a1 1c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e4]
   c9438: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   c9440: 79 a1 24 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6dc]
   c9448: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   c9450: 61 a1 2c f9 00 00 00 00      	ldxw r1, [r10 - 0x6d4]
   c9458: 63 1a e0 fe 00 00 00 00      	stxw [r10 - 0x120], r1
   c9460: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   c9468: 15 01 a4 00 00 00 00 00      	jeq r1, 0x0, +0xa4 <.text+0xc9870>
   c9470: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   c9478: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   c9480: 07 08 00 00 88 fe ff ff      	add64 r8, -0x178
   c9488: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   c9490: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c9498: 85 10 00 00 9b 89 fe ff      	call -0x17665
   c94a0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   c94a8: 85 10 00 00 44 7f 00 00      	call 0x7f44
   c94b0: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   c94b8: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   c94c0: 07 08 00 00 58 f8 ff ff      	add64 r8, -0x7a8
   c94c8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   c94d0: 7b 7a b8 f4 00 00 00 00      	stxdw [r10 - 0xb48], r7
   c94d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   c94e0: 85 10 00 00 92 89 fe ff      	call -0x1766e
   c94e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c94f0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   c94f8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   c9500: 85 10 00 00 52 7f 00 00      	call 0x7f52
   c9508: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   c9510: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   c9518: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   c9528: 5d 21 9b 00 00 00 00 00      	jne r1, r2, +0x9b <.text+0xc98e8>
   c9530: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9538: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   c9540: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   c9548: 85 10 00 00 85 7b 00 00      	call 0x7b85
   c9550: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c9558: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   c9560: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   c9568: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9570: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   c9578: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xc9478>
   c9580: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   c9588: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9590: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   c9598: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c95a0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c95a8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   c95b0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xc94b0>
   c95b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c95c0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c95c8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   c95d0: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   c95d8: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   c95e0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   c95e8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c95f0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   c95f8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xc94f8>
   c9600: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   c9608: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9610: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   c9618: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c9620: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9628: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   c9630: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xc9530>
   c9638: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c9640: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9648: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   c9650: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xc9540>
   c9658: 05 00 a6 00 00 00 00 00      	ja +0xa6 <.text+0xc9a70>
   c9660: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9668: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c9670: 18 02 00 00 10 2a 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122a10
   c9680: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   c9688: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   c9690: 85 10 00 00 3a 89 00 00      	call 0x893a
   c9698: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   c96a0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   c96a8: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c96b0: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   c96b8: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   c96c0: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   c96c8: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   c96d0: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   c96d8: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   c96e0: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   c96e8: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   c96f0: 79 a1 10 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf0]
   c96f8: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   c9700: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   c9708: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   c9710: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   c9718: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   c9720: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   c9728: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   c9730: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   c9738: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   c9740: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9748: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   c9750: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9758: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   c9760: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   c9768: 85 10 00 00 2e a0 00 00      	call 0xa02e
   c9770: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   c9778: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   c9780: 55 00 90 00 00 00 00 00      	jne r0, 0x0, +0x90 <.text+0xc9ae8>
   c9788: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   c9790: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   c9798: 79 a1 e8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb18]
   c97a0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   c97a8: 79 a1 78 fa 00 00 00 00      	ldxdw r1, [r10 - 0x588]
   c97b0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   c97b8: 79 a1 80 fa 00 00 00 00      	ldxdw r1, [r10 - 0x580]
   c97c0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   c97c8: 79 a9 f0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x210]
   c97d0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   c97d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c97e0: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   c97e8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c97f0: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   c97f8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   c9800: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   c9808: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   c9810: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   c9818: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9820: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   c9828: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9830: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   c9838: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   c9840: 85 10 00 00 13 a0 00 00      	call 0xa013
   c9848: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   c9850: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   c9858: 15 00 a0 00 00 00 00 00      	jeq r0, 0x0, +0xa0 <.text+0xc9c40>
   c9860: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9868: 07 01 00 00 50 f7 ff ff      	add64 r1, -0x8b0
   c9870: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   c9878: 85 10 00 00 25 62 ff ff      	call -0x9ddb
   c9880: 79 a3 58 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8a8]
   c9888: 79 a2 50 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8b0]
   c9890: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9898: 07 01 00 00 40 f7 ff ff      	add64 r1, -0x8c0
   c98a0: 18 04 00 00 27 ce 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11ce27
   c98b0: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   c98b8: 85 10 00 00 97 70 fe ff      	call -0x18f69
   c98c0: 79 a3 48 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8b8]
   c98c8: 79 a2 40 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c0]
   c98d0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   c98d8: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   c98e0: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   c98e8: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   c98f0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   c98f8: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   c9900: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   c9908: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   c9910: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   c9918: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   c9920: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   c9928: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   c9930: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   c9938: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   c9940: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   c9948: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   c9950: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9958: 07 01 00 00 30 f7 ff ff      	add64 r1, -0x8d0
   c9960: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   c9968: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   c9970: 85 10 00 00 0b 73 00 00      	call 0x730b
   c9978: 79 a1 30 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8d0]
   c9980: 79 a2 38 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c8]
   c9988: 05 00 74 00 00 00 00 00      	ja +0x74 <.text+0xc9c10>
   c9990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9998: 07 01 00 00 f0 f5 ff ff      	add64 r1, -0xa10
   c99a0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   c99a8: 85 10 00 00 91 78 00 00      	call 0x7891
   c99b0: 79 a3 f8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa08]
   c99b8: 79 a2 f0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa10]
   c99c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c99c8: 07 01 00 00 e0 f5 ff ff      	add64 r1, -0xa20
   c99d0: 18 04 00 00 f6 c5 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c5f6
   c99e0: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   c99e8: 85 10 00 00 71 70 fe ff      	call -0x18f8f
   c99f0: 79 a1 e0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa20]
   c99f8: 79 a2 e8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa18]
   c9a00: 05 00 fb fe 00 00 00 00      	ja -0x105 <.text+0xc90c0>
   c9a08: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   c9a10: 7b 2a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r2
   c9a18: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
   c9a20: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   c9a28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9a30: 07 01 00 00 b0 f7 ff ff      	add64 r1, -0x850
   c9a38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9a40: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   c9a48: 85 10 00 00 be 72 00 00      	call 0x72be
   c9a50: 79 a1 b0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x850]
   c9a58: 79 a2 b8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x848]
   c9a60: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   c9a68: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   c9a70: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   c9a78: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   c9a80: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   c9a88: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   c9a90: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   c9a98: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9aa0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   c9aa8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xc99a8>
   c9ab0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   c9ab8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9ac0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   c9ac8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c9ad0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9ad8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   c9ae0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xc99e0>
   c9ae8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c9af0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9af8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   c9b00: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   c9b08: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   c9b10: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   c9b18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9b20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   c9b28: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xc9a28>
   c9b30: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   c9b38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   c9b40: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   c9b48: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c9b50: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9b58: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   c9b60: 55 02 3d 00 00 00 00 00      	jne r2, 0x0, +0x3d <.text+0xc9c30>
   c9b68: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c9b70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   c9b78: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   c9b80: bf 69 00 00 00 00 00 00      	mov64 r9, r6
   c9b88: 05 00 cd fe 00 00 00 00      	ja -0x133 <.text+0xc90d8>
   c9b90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9b98: 07 01 00 00 a0 f7 ff ff      	add64 r1, -0x860
   c9ba0: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   c9ba8: 85 10 00 00 51 78 00 00      	call 0x7851
   c9bb0: 79 a3 a8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x858]
   c9bb8: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   c9bc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9bc8: 07 01 00 00 90 f7 ff ff      	add64 r1, -0x870
   c9bd0: 18 04 00 00 f6 c5 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c5f6
   c9be0: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   c9be8: 85 10 00 00 31 70 fe ff      	call -0x18fcf
   c9bf0: 79 a1 90 f7 00 00 00 00      	ldxdw r1, [r10 - 0x870]
   c9bf8: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   c9c00: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xc9c10>
   c9c08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9c10: 07 01 00 00 80 f7 ff ff      	add64 r1, -0x880
   c9c18: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   c9c20: 85 10 00 00 42 78 00 00      	call 0x7842
   c9c28: 79 a3 88 f7 00 00 00 00      	ldxdw r3, [r10 - 0x878]
   c9c30: 79 a2 80 f7 00 00 00 00      	ldxdw r2, [r10 - 0x880]
   c9c38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9c40: 07 01 00 00 70 f7 ff ff      	add64 r1, -0x890
   c9c48: 18 04 00 00 27 ce 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11ce27
   c9c58: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   c9c60: 85 10 00 00 22 70 fe ff      	call -0x18fde
   c9c68: 79 a3 78 f7 00 00 00 00      	ldxdw r3, [r10 - 0x888]
   c9c70: 79 a2 70 f7 00 00 00 00      	ldxdw r2, [r10 - 0x890]
   c9c78: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   c9c80: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   c9c88: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   c9c90: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   c9c98: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   c9ca0: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   c9ca8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   c9cb0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   c9cb8: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   c9cc0: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   c9cc8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   c9cd0: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   c9cd8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   c9ce0: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   c9ce8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   c9cf0: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   c9cf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9d00: 07 01 00 00 60 f7 ff ff      	add64 r1, -0x8a0
   c9d08: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   c9d10: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   c9d18: 85 10 00 00 96 72 00 00      	call 0x7296
   c9d20: 79 a1 60 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8a0]
   c9d28: 79 a2 68 f7 00 00 00 00      	ldxdw r2, [r10 - 0x898]
   c9d30: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   c9d38: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   c9d40: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   c9d48: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   c9d50: bf 69 00 00 00 00 00 00      	mov64 r9, r6
   c9d58: 05 00 93 fe 00 00 00 00      	ja -0x16d <.text+0xc90d8>
   c9d60: 79 a7 18 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1e8]
   c9d68: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   c9d70: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   c9d78: 7b 2a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r2
   c9d80: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   c9d88: 7b 2a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r2
   c9d90: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   c9d98: 7b 2a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r2
   c9da0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   c9da8: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   c9db0: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   c9db8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   c9dc0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9dc8: 07 02 00 00 58 f8 ff ff      	add64 r2, -0x7a8
   c9dd0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   c9dd8: 85 10 00 00 60 9f 00 00      	call 0x9f60
   c9de0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   c9de8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   c9df0: 15 00 07 00 00 00 00 00      	jeq r0, 0x0, +0x7 <.text+0xc9d10>
   c9df8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9e00: 07 01 00 00 20 f7 ff ff      	add64 r1, -0x8e0
   c9e08: b7 02 00 00 e7 07 00 00      	mov64 r2, 0x7e7
   c9e10: 85 10 00 00 04 78 00 00      	call 0x7804
   c9e18: 79 a1 20 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8e0]
   c9e20: 79 a2 28 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d8]
   c9e28: 05 00 e0 ff 00 00 00 00      	ja -0x20 <.text+0xc9c10>
   c9e30: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   c9e38: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   c9e40: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   c9e48: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   c9e50: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   c9e58: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   c9e60: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   c9e68: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   c9e70: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   c9e78: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   c9e80: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   c9e88: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   c9e90: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   c9e98: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   c9ea0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   c9ea8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   c9eb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9eb8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   c9ec0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   c9ec8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   c9ed0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   c9ed8: 85 10 00 00 40 9f 00 00      	call 0x9f40
   c9ee0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   c9ee8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   c9ef0: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <.text+0xc9f08>
   c9ef8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9f00: 07 01 00 00 10 f7 ff ff      	add64 r1, -0x8f0
   c9f08: b7 02 00 00 df 07 00 00      	mov64 r2, 0x7df
   c9f10: 85 10 00 00 e4 77 00 00      	call 0x77e4
   c9f18: 79 a3 18 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8e8]
   c9f20: 79 a2 10 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8f0]
   c9f28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9f30: 07 01 00 00 00 f7 ff ff      	add64 r1, -0x900
   c9f38: 18 04 00 00 df e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0df
   c9f48: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   c9f50: 85 10 00 00 c4 6f fe ff      	call -0x1903c
   c9f58: 79 a3 08 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8f8]
   c9f60: 79 a2 00 f7 00 00 00 00      	ldxdw r2, [r10 - 0x900]
   c9f68: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   c9f70: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   c9f78: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   c9f80: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   c9f88: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   c9f90: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   c9f98: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   c9fa0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   c9fa8: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   c9fb0: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   c9fb8: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   c9fc0: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   c9fc8: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   c9fd0: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   c9fd8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   c9fe0: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   c9fe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   c9ff0: 07 01 00 00 f0 f6 ff ff      	add64 r1, -0x910
   c9ff8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ca000: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   ca008: 85 10 00 00 38 72 00 00      	call 0x7238
   ca010: 79 a1 f0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x910]
   ca018: 79 a2 f8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x908]
   ca020: 05 00 a1 ff 00 00 00 00      	ja -0x5f <.text+0xc9c10>
   ca028: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ca030: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ca038: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   ca040: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ca048: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   ca050: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ca058: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   ca060: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ca068: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   ca070: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   ca078: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ca080: 7b 2a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r2
   ca088: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ca090: 7b 2a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r2
   ca098: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ca0a0: 7b 2a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r2
   ca0a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ca0b0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca0b8: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   ca0c0: 07 08 00 00 e0 ff ff ff      	add64 r8, -0x20
   ca0c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca0d0: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   ca0d8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   ca0e0: 07 03 00 00 88 fe ff ff      	add64 r3, -0x178
   ca0e8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ca0f0: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   ca0f8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   ca100: 85 10 00 00 0a 6d 00 00      	call 0x6d0a
   ca108: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   ca110: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ca118: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ca120: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   ca128: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ca130: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   ca138: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ca140: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   ca148: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ca150: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   ca158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca160: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   ca168: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   ca170: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ca178: 85 10 00 00 ec 9e 00 00      	call 0x9eec
   ca180: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ca188: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ca190: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <.text+0xca1a8>
   ca198: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca1a0: 07 01 00 00 e0 f6 ff ff      	add64 r1, -0x920
   ca1a8: b7 02 00 00 d9 07 00 00      	mov64 r2, 0x7d9
   ca1b0: 85 10 00 00 90 77 00 00      	call 0x7790
   ca1b8: 79 a3 e8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x918]
   ca1c0: 79 a2 e0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x920]
   ca1c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca1d0: 07 01 00 00 d0 f6 ff ff      	add64 r1, -0x930
   ca1d8: 18 04 00 00 df e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0df
   ca1e8: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   ca1f0: 85 10 00 00 70 6f fe ff      	call -0x19090
   ca1f8: 79 a3 d8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x928]
   ca200: 79 a2 d0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x930]
   ca208: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   ca210: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   ca218: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   ca220: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   ca228: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   ca230: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   ca238: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   ca240: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca248: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   ca250: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   ca258: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   ca260: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   ca268: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   ca270: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   ca278: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   ca280: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   ca288: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca290: 07 01 00 00 c0 f6 ff ff      	add64 r1, -0x940
   ca298: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ca2a0: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   ca2a8: 85 10 00 00 e4 71 00 00      	call 0x71e4
   ca2b0: 79 a1 c0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x940]
   ca2b8: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   ca2c0: 05 00 4d ff 00 00 00 00      	ja -0xb3 <.text+0xc9c10>
   ca2c8: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   ca2d0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   ca2d8: 15 01 5c 00 00 00 00 00      	jeq r1, 0x0, +0x5c <.text+0xca4a0>
   ca2e0: 79 a1 20 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7e0]
   ca2e8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ca2f0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   ca2f8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   ca300: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ca308: 18 05 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x11cd4b
   ca318: 7b 5a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r5
   ca320: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   ca328: 07 05 00 00 88 fe ff ff      	add64 r5, -0x178
   ca330: 7b 5a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r5
   ca338: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   ca340: 7b 4a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r4
   ca348: 7b 3a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r3
   ca350: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   ca358: 7a 0a e8 ff 17 00 00 00      	stdw [r10 - 0x18], 0x17
   ca360: 7a 0a f8 ff 20 00 00 00      	stdw [r10 - 0x8], 0x20
   ca368: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca370: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   ca378: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca380: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   ca388: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   ca390: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   ca398: 85 10 00 00 99 87 00 00      	call 0x8799
   ca3a0: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   ca3a8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   ca3b0: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   ca3b8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   ca3c0: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   ca3c8: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   ca3d0: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   ca3d8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   ca3e0: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   ca3e8: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   ca3f0: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   ca3f8: 79 a1 08 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf8]
   ca400: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   ca408: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   ca410: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   ca418: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   ca420: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   ca428: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   ca430: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   ca438: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   ca440: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca450: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   ca458: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca460: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   ca468: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ca470: 85 10 00 00 8d 9e 00 00      	call 0x9e8d
   ca478: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ca480: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ca488: 15 00 35 00 00 00 00 00      	jeq r0, 0x0, +0x35 <.text+0xca518>
   ca490: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca498: 07 01 00 00 b0 f6 ff ff      	add64 r1, -0x950
   ca4a0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ca4a8: 85 10 00 00 31 77 00 00      	call 0x7731
   ca4b0: 79 a3 b8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x948]
   ca4b8: 79 a2 b0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x950]
   ca4c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca4c8: 07 01 00 00 a0 f6 ff ff      	add64 r1, -0x960
   ca4d0: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   ca4e0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ca4e8: 85 10 00 00 11 6f fe ff      	call -0x190ef
   ca4f0: 79 a3 a8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x958]
   ca4f8: 79 a2 a0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x960]
   ca500: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   ca508: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   ca510: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   ca518: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   ca520: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   ca528: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   ca530: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   ca538: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca540: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   ca548: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   ca550: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   ca558: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   ca560: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   ca568: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   ca570: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   ca578: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   ca580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca588: 07 01 00 00 90 f6 ff ff      	add64 r1, -0x970
   ca590: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ca598: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   ca5a0: 85 10 00 00 85 71 00 00      	call 0x7185
   ca5a8: 79 a1 90 f6 00 00 00 00      	ldxdw r1, [r10 - 0x970]
   ca5b0: 79 a2 98 f6 00 00 00 00      	ldxdw r2, [r10 - 0x968]
   ca5b8: 05 00 ee fe 00 00 00 00      	ja -0x112 <.text+0xc9c10>
   ca5c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca5c8: 07 01 00 00 10 f6 ff ff      	add64 r1, -0x9f0
   ca5d0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   ca5d8: 85 10 00 00 0b 77 00 00      	call 0x770b
   ca5e0: 79 a3 18 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9e8]
   ca5e8: 79 a2 10 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f0]
   ca5f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca5f8: 07 01 00 00 00 f6 ff ff      	add64 r1, -0xa00
   ca600: 18 04 00 00 df e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0df
   ca610: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   ca618: 85 10 00 00 eb 6e fe ff      	call -0x19115
   ca620: 79 a1 00 f6 00 00 00 00      	ldxdw r1, [r10 - 0xa00]
   ca628: 79 a2 08 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f8]
   ca630: 05 00 df fe 00 00 00 00      	ja -0x121 <.text+0xc9c10>
   ca638: 79 a1 08 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf8]
   ca640: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   ca648: 15 01 4e 00 00 00 00 00      	jeq r1, 0x0, +0x4e <.text+0xca7a0>
   ca650: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca658: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   ca660: 18 02 00 00 d0 29 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1229d0
   ca670: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ca678: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   ca680: 85 10 00 00 3c 87 00 00      	call 0x873c
   ca688: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   ca690: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   ca698: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   ca6a0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   ca6a8: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   ca6b0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   ca6b8: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   ca6c0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   ca6c8: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   ca6d0: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   ca6d8: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   ca6e0: 79 a2 d0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb30]
   ca6e8: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   ca6f0: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   ca6f8: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   ca700: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   ca708: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   ca710: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   ca718: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   ca720: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca728: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca730: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   ca738: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca740: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   ca748: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ca750: 85 10 00 00 31 9e 00 00      	call 0x9e31
   ca758: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ca760: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ca768: 15 00 39 00 00 00 00 00      	jeq r0, 0x0, +0x39 <.text+0xca818>
   ca770: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca778: 07 01 00 00 80 f6 ff ff      	add64 r1, -0x980
   ca780: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ca788: 85 10 00 00 d5 76 00 00      	call 0x76d5
   ca790: 79 a3 88 f6 00 00 00 00      	ldxdw r3, [r10 - 0x978]
   ca798: 79 a2 80 f6 00 00 00 00      	ldxdw r2, [r10 - 0x980]
   ca7a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca7a8: 07 01 00 00 70 f6 ff ff      	add64 r1, -0x990
   ca7b0: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   ca7c0: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   ca7c8: 85 10 00 00 b5 6e fe ff      	call -0x1914b
   ca7d0: 79 a3 78 f6 00 00 00 00      	ldxdw r3, [r10 - 0x988]
   ca7d8: 79 a2 70 f6 00 00 00 00      	ldxdw r2, [r10 - 0x990]
   ca7e0: 79 a4 d0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb30]
   ca7e8: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   ca7f0: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   ca7f8: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   ca800: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   ca808: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   ca810: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   ca818: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   ca820: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   ca828: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   ca830: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   ca838: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   ca840: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   ca848: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   ca850: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   ca858: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   ca860: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   ca868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca870: 07 01 00 00 60 f6 ff ff      	add64 r1, -0x9a0
   ca878: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   ca880: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   ca888: 85 10 00 00 28 71 00 00      	call 0x7128
   ca890: 79 a1 68 f6 00 00 00 00      	ldxdw r1, [r10 - 0x998]
   ca898: 79 a2 60 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9a0]
   ca8a0: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   ca8a8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   ca8b0: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   ca8b8: 05 00 91 fe 00 00 00 00      	ja -0x16f <.text+0xc9c28>
   ca8c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca8c8: 07 01 00 00 30 f6 ff ff      	add64 r1, -0x9d0
   ca8d0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   ca8d8: 85 10 00 00 ab 76 00 00      	call 0x76ab
   ca8e0: 79 a3 38 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9c8]
   ca8e8: 79 a2 30 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9d0]
   ca8f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ca8f8: 07 01 00 00 20 f6 ff ff      	add64 r1, -0x9e0
   ca900: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   ca910: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ca918: 85 10 00 00 8b 6e fe ff      	call -0x19175
   ca920: 79 a1 20 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9e0]
   ca928: 79 a2 28 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9d8]
   ca930: 05 00 7f fe 00 00 00 00      	ja -0x181 <.text+0xc9c10>
   ca938: 79 a7 50 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1b0]
   ca940: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   ca948: 15 01 85 00 00 00 00 00      	jeq r1, 0x0, +0x85 <.text+0xcac58>
   ca950: 79 a8 58 f5 00 00 00 00      	ldxdw r8, [r10 - 0xaa8]
   ca958: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   ca960: 07 01 00 00 30 02 00 00      	add64 r1, 0x230
   ca968: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca970: 07 02 00 00 20 f8 ff ff      	add64 r2, -0x7e0
   ca978: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   ca980: 85 10 00 00 e2 9d 00 00      	call 0x9de2
   ca988: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ca990: 07 02 00 00 98 fd ff ff      	add64 r2, -0x268
   ca998: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   ca9a0: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   ca9a8: 85 10 00 00 dd 9d 00 00      	call 0x9ddd
   ca9b0: 79 a9 18 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1e8]
   ca9b8: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   ca9c0: 7b 1a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r1
   ca9c8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   ca9d0: 7b 1a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r1
   ca9d8: 69 a1 48 fe 00 00 00 00      	ldxh r1, [r10 - 0x1b8]
   ca9e0: 6b 18 88 02 00 00 00 00      	stxh [r8 + 0x288], r1
   ca9e8: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   ca9f0: 7b 18 80 02 00 00 00 00      	stxdw [r8 + 0x280], r1
   ca9f8: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   caa00: 7b 18 78 02 00 00 00 00      	stxdw [r8 + 0x278], r1
   caa08: 61 a1 30 fe 00 00 00 00      	ldxw r1, [r10 - 0x1d0]
   caa10: 63 18 8b 02 00 00 00 00      	stxw [r8 + 0x28b], r1
   caa18: 71 a1 34 fe 00 00 00 00      	ldxb r1, [r10 - 0x1cc]
   caa20: 73 18 8f 02 00 00 00 00      	stxb [r8 + 0x28f], r1
   caa28: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   caa30: 7b 18 98 00 00 00 00 00      	stxdw [r8 + 0x98], r1
   caa38: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   caa40: 7b 18 90 00 00 00 00 00      	stxdw [r8 + 0x90], r1
   caa48: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   caa50: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
   caa58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   caa60: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   caa68: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   caa70: 85 10 00 00 c4 9d 00 00      	call 0x9dc4
   caa78: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   caa80: 7b 18 34 01 00 00 00 00      	stxdw [r8 + 0x134], r1
   caa88: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   caa90: 7b 18 3c 01 00 00 00 00      	stxdw [r8 + 0x13c], r1
   caa98: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   caaa0: 7b 18 44 01 00 00 00 00      	stxdw [r8 + 0x144], r1
   caaa8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   caab0: 7b 18 4c 01 00 00 00 00      	stxdw [r8 + 0x14c], r1
   caab8: 61 a1 e0 fe 00 00 00 00      	ldxw r1, [r10 - 0x120]
   caac0: 63 18 54 01 00 00 00 00      	stxw [r8 + 0x154], r1
   caac8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   caad0: 07 01 00 00 08 03 00 00      	add64 r1, 0x308
   caad8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   caae0: 07 02 00 00 78 fa ff ff      	add64 r2, -0x588
   caae8: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   caaf0: 85 10 00 00 b4 9d 00 00      	call 0x9db4
   caaf8: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   cab00: 7b 18 68 01 00 00 00 00      	stxdw [r8 + 0x168], r1
   cab08: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   cab10: 7b 18 70 01 00 00 00 00      	stxdw [r8 + 0x170], r1
   cab18: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   cab20: 07 01 00 00 80 01 00 00      	add64 r1, 0x180
   cab28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cab30: 07 02 00 00 f0 fc ff ff      	add64 r2, -0x310
   cab38: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   cab40: 85 10 00 00 aa 9d 00 00      	call 0x9daa
   cab48: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   cab50: 07 01 00 00 c0 01 00 00      	add64 r1, 0x1c0
   cab58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cab60: 07 02 00 00 a8 fc ff ff      	add64 r2, -0x358
   cab68: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   cab70: 85 10 00 00 a4 9d 00 00      	call 0x9da4
   cab78: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   cab80: 7b 18 0c 02 00 00 00 00      	stxdw [r8 + 0x20c], r1
   cab88: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   cab90: 7b 18 14 02 00 00 00 00      	stxdw [r8 + 0x214], r1
   cab98: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   caba0: 7b 18 1c 02 00 00 00 00      	stxdw [r8 + 0x21c], r1
   caba8: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   cabb0: 7b 18 24 02 00 00 00 00      	stxdw [r8 + 0x224], r1
   cabb8: 61 a1 a0 fc 00 00 00 00      	ldxw r1, [r10 - 0x360]
   cabc0: 63 18 2c 02 00 00 00 00      	stxw [r8 + 0x22c], r1
   cabc8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   cabd0: 07 01 00 00 a0 02 00 00      	add64 r1, 0x2a0
   cabd8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cabe0: 07 02 00 00 48 fd ff ff      	add64 r2, -0x2b8
   cabe8: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   cabf0: 85 10 00 00 94 9d 00 00      	call 0x9d94
   cabf8: 69 a1 44 fd 00 00 00 00      	ldxh r1, [r10 - 0x2bc]
   cac00: 61 a2 40 fd 00 00 00 00      	ldxw r2, [r10 - 0x2c0]
   cac08: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   cac10: 63 38 30 01 00 00 00 00      	stxw [r8 + 0x130], r3
   cac18: 79 a3 18 f5 00 00 00 00      	ldxdw r3, [r10 - 0xae8]
   cac20: 63 38 08 02 00 00 00 00      	stxw [r8 + 0x208], r3
   cac28: 79 a3 e0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb20]
   cac30: 73 38 8a 02 00 00 00 00      	stxb [r8 + 0x28a], r3
   cac38: 79 a3 f8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb08]
   cac40: 73 38 e9 02 00 00 00 00      	stxb [r8 + 0x2e9], r3
   cac48: 7b 78 30 05 00 00 00 00      	stxdw [r8 + 0x530], r7
   cac50: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   cac58: 7b 38 28 05 00 00 00 00      	stxdw [r8 + 0x528], r3
   cac60: 79 a3 30 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad0]
   cac68: 7b 38 20 05 00 00 00 00      	stxdw [r8 + 0x520], r3
   cac70: 79 a3 38 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac8]
   cac78: 7b 38 18 05 00 00 00 00      	stxdw [r8 + 0x518], r3
   cac80: 7b 98 10 05 00 00 00 00      	stxdw [r8 + 0x510], r9
   cac88: 79 a3 50 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab0]
   cac90: 7b 38 00 03 00 00 00 00      	stxdw [r8 + 0x300], r3
   cac98: 79 a3 e8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb18]
   caca0: 7b 38 f8 02 00 00 00 00      	stxdw [r8 + 0x2f8], r3
   caca8: 79 a3 10 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf0]
   cacb0: 7b 38 f0 02 00 00 00 00      	stxdw [r8 + 0x2f0], r3
   cacb8: 79 a3 00 f5 00 00 00 00      	ldxdw r3, [r10 - 0xb00]
   cacc0: 7b 38 98 02 00 00 00 00      	stxdw [r8 + 0x298], r3
   cacc8: 79 a3 08 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf8]
   cacd0: 7b 38 90 02 00 00 00 00      	stxdw [r8 + 0x290], r3
   cacd8: 7b 68 70 02 00 00 00 00      	stxdw [r8 + 0x270], r6
   cace0: 79 a3 f0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb10]
   cace8: 7b 38 68 02 00 00 00 00      	stxdw [r8 + 0x268], r3
   cacf0: 79 a3 d0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb30]
   cacf8: 7b 38 60 02 00 00 00 00      	stxdw [r8 + 0x260], r3
   cad00: 79 a3 40 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac0]
   cad08: 7b 38 78 01 00 00 00 00      	stxdw [r8 + 0x178], r3
   cad10: 79 a3 28 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad8]
   cad18: 7b 38 60 01 00 00 00 00      	stxdw [r8 + 0x160], r3
   cad20: 79 a3 20 f5 00 00 00 00      	ldxdw r3, [r10 - 0xae0]
   cad28: 7b 38 58 01 00 00 00 00      	stxdw [r8 + 0x158], r3
   cad30: 79 a3 b8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb48]
   cad38: 7b 38 a0 00 00 00 00 00      	stxdw [r8 + 0xa0], r3
   cad40: 79 a3 c0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb40]
   cad48: 7b 38 88 00 00 00 00 00      	stxdw [r8 + 0x88], r3
   cad50: 79 a3 c8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb38]
   cad58: 7b 38 80 00 00 00 00 00      	stxdw [r8 + 0x80], r3
   cad60: 63 28 ea 02 00 00 00 00      	stxw [r8 + 0x2ea], r2
   cad68: 6b 18 ee 02 00 00 00 00      	stxh [r8 + 0x2ee], r1
   cad70: 05 00 e9 fb 00 00 00 00      	ja -0x417 <.text+0xc8ba0>
   cad78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cad80: 07 01 00 00 50 f6 ff ff      	add64 r1, -0x9b0
   cad88: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   cad90: 85 10 00 00 14 76 00 00      	call 0x7614
   cad98: 79 a3 58 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9a8]
   cada0: 79 a2 50 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9b0]
   cada8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cadb0: 07 01 00 00 40 f6 ff ff      	add64 r1, -0x9c0
   cadb8: 18 04 00 00 a8 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0a8
   cadc8: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   cadd0: 85 10 00 00 f4 6d fe ff      	call -0x1920c
   cadd8: 79 a1 48 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9b8]
   cade0: 79 a2 40 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9c0]
   cade8: 05 00 56 ff 00 00 00 00      	ja -0xaa <.text+0xca780>
