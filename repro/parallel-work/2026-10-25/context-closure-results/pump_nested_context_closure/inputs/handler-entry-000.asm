   1e7c0: 7b 1a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r1
   1e7c8: 79 56 28 f0 00 00 00 00      	ldxdw r6, [r5 - 0xfd8]
   1e7d0: 79 51 20 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfe0]
   1e7d8: 7b 1a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r1
   1e7e0: 79 50 18 f0 00 00 00 00      	ldxdw r0, [r5 - 0xfe8]
   1e7e8: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
   1e7f0: 79 59 00 f0 00 00 00 00      	ldxdw r9, [r5 - 0x1000]
   1e7f8: 79 58 10 f0 00 00 00 00      	ldxdw r8, [r5 - 0xff0]
   1e800: 55 08 af 04 00 00 00 00      	jne r8, 0x0, +0x4af <.text+0x20c60>
   1e808: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0x1e6f8>
   1e810: 05 00 19 00 00 00 00 00      	ja +0x19 <.text+0x1e7c0>
   1e818: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1e820: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1e828: 18 02 00 00 f4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5df4
   1e838: 85 10 00 00 68 71 02 00      	call 0x27168
   1e840: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   1e848: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   1e850: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1e858: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1e868: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   1e870: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1e878: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   1e880: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   1e888: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   1e890: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   1e898: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1e8a0: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1e8a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1e8b0: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   1e8b8: 18 01 00 00 f4 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5df4
   1e8c8: 85 10 00 00 b7 7e 02 00      	call 0x27eb7
   1e8d0: 15 00 2c 00 00 00 00 00      	jeq r0, 0x0, +0x2c <.text+0x1e918>
   1e8d8: 05 00 b0 04 00 00 00 00      	ja +0x4b0 <.text+0x20d40>
   1e8e0: 55 06 01 00 00 00 00 00      	jne r6, 0x0, +0x1 <.text+0x1e7d0>
   1e8e8: 05 00 45 00 00 00 00 00      	ja +0x45 <.text+0x1e9f8>
   1e8f0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   1e8f8: 79 15 f8 00 00 00 00 00      	ldxdw r5, [r1 + 0xf8]
   1e900: 71 55 3f 04 00 00 00 00      	ldxb r5, [r5 + 0x43f]
   1e908: 15 05 37 01 00 00 00 00      	jeq r5, 0x0, +0x137 <.text+0x1f1a8>
   1e910: 7b 3a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r3
   1e918: 7b 4a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r4
   1e920: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   1e928: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   1e930: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1e938: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   1e940: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   1e948: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   1e950: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   1e958: 18 05 00 00 be 68 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1b68be
   1e968: 7b 5a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r5
   1e970: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   1e978: 07 05 00 00 58 fb ff ff      	add64 r5, -0x4a8
   1e980: 7b 5a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r5
   1e988: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   1e990: 7b 4a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r4
   1e998: 7b 3a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r3
   1e9a0: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   1e9a8: 7a 0a d8 ff 0e 00 00 00      	stdw [r10 - 0x28], 0xe
   1e9b0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   1e9b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1e9c0: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   1e9c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1e9d0: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   1e9d8: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   1e9e0: 18 04 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b79df
   1e9f0: 85 10 00 00 98 12 03 00      	call 0x31298
   1e9f8: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   1ea00: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   1ea08: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   1ea10: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   1ea18: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   1ea20: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   1ea28: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   1ea30: 05 00 26 00 00 00 00 00      	ja +0x26 <.text+0x1ea48>
   1ea38: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   1ea40: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   1ea48: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   1ea50: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   1ea58: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   1ea60: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1ea68: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1ea70: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1ea78: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1ea80: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1ea88: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1ea90: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1ea98: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1eaa8: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1eab0: 62 0a 38 fd c2 17 00 00      	stw [r10 - 0x2c8], 0x17c2
   1eab8: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1eac0: 62 0a b8 fc cc 02 00 00      	stw [r10 - 0x348], 0x2cc
   1eac8: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1ead0: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1ead8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1eae0: 07 01 00 00 28 f9 ff ff      	add64 r1, -0x6d8
   1eae8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1eaf0: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1eaf8: 85 10 00 00 06 fa 02 00      	call 0x2fa06
   1eb00: 79 a7 30 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6d0]
   1eb08: 79 a9 28 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6d8]
   1eb10: 05 00 96 04 00 00 00 00      	ja +0x496 <.text+0x20ea8>
   1eb18: 7b 3a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r3
   1eb20: 7b 4a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r4
   1eb28: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   1eb30: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   1eb38: 7b 2a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r2
   1eb40: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   1eb48: 7b 2a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r2
   1eb50: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   1eb58: 7b 2a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r2
   1eb60: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1eb68: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   1eb70: 7a 0a b8 fc 00 00 00 00      	stdw [r10 - 0x348], 0x0
   1eb78: 7a 0a b0 fc 00 00 00 00      	stdw [r10 - 0x350], 0x0
   1eb80: 7a 0a a8 fc 00 00 00 00      	stdw [r10 - 0x358], 0x0
   1eb88: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1eb90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1eb98: 07 01 00 00 08 fb ff ff      	add64 r1, -0x4f8
   1eba0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1eba8: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1ebb0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1ebb8: 85 10 00 00 57 29 03 00      	call 0x32957
   1ebc0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1ebc8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1ebd0: 15 00 3e 00 00 00 00 00      	jeq r0, 0x0, +0x3e <.text+0x1eca8>
   1ebd8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   1ebe0: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   1ebe8: 79 73 f8 00 00 00 00 00      	ldxdw r3, [r7 + 0xf8]
   1ebf0: 71 32 3b 04 00 00 00 00      	ldxb r2, [r3 + 0x43b]
   1ebf8: 15 02 9c 00 00 00 00 00      	jeq r2, 0x0, +0x9c <.text+0x1efc0>
   1ec00: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   1ec08: 55 02 7f 00 00 00 00 00      	jne r2, 0x0, +0x7f <.text+0x1eee8>
   1ec10: 7b 3a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r3
   1ec18: 7b 9a c8 f8 00 00 00 00      	stxdw [r10 - 0x738], r9
   1ec20: 7b 7a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r7
   1ec28: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   1ec30: 7b 2a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r2
   1ec38: 7a 0a 50 fb 00 00 00 00      	stdw [r10 - 0x4b0], 0x0
   1ec40: 7a 0a 48 fb 00 00 00 00      	stdw [r10 - 0x4b8], 0x0
   1ec48: 7a 0a 40 fb 00 00 00 00      	stdw [r10 - 0x4c0], 0x0
   1ec50: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   1ec58: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
   1ec60: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
   1ec68: 79 a2 40 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4c0]
   1ec70: 7b 2a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r2
   1ec78: 79 a2 48 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b8]
   1ec80: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   1ec88: 79 a2 50 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b0]
   1ec90: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   1ec98: 55 08 0b 02 00 00 00 00      	jne r8, 0x0, +0x20b <.text+0x1fbd8>
   1eca0: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   1eca8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   1ecb0: 79 a3 f8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x708]
   1ecb8: 79 a5 b0 f8 00 00 00 00      	ldxdw r5, [r10 - 0x750]
   1ecc0: 15 03 6f 02 00 00 00 00      	jeq r3, 0x0, +0x26f <.text+0x1ff20>
   1ecc8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   1ecd0: 57 02 00 00 02 00 00 00      	and64 r2, 0x2
   1ecd8: 55 02 6c 02 02 00 00 00      	jne r2, 0x2, +0x26c <.text+0x1ff20>
   1ece0: 79 a4 e0 f8 00 00 00 00      	ldxdw r4, [r10 - 0x720]
   1ece8: 71 42 3e 04 00 00 00 00      	ldxb r2, [r4 + 0x43e]
   1ecf0: 55 02 4c 02 00 00 00 00      	jne r2, 0x0, +0x24c <.text+0x1fe38>
   1ecf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
