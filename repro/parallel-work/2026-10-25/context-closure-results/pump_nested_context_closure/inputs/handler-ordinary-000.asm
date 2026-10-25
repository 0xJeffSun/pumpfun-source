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
   1ed00: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   1ed08: 18 02 00 00 94 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e94
   1ed18: 85 10 00 00 cc 70 02 00      	call 0x270cc
   1ed20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1ed28: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   1ed30: 18 02 00 00 94 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e94
   1ed40: 85 10 00 00 7e d7 ff ff      	call -0x2882
   1ed48: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1ed58: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1ed60: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1ed68: 62 0a b8 fc 06 03 00 00      	stw [r10 - 0x348], 0x306
   1ed70: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1ed78: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1ed80: 62 0a 38 fd bd 17 00 00      	stw [r10 - 0x2c8], 0x17bd
   1ed88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1ed90: 07 01 00 00 28 fa ff ff      	add64 r1, -0x5d8
   1ed98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1eda0: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1eda8: 85 10 00 00 b0 f9 02 00      	call 0x2f9b0
   1edb0: 79 a7 30 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5d0]
   1edb8: 79 a9 28 fa 00 00 00 00      	ldxdw r9, [r10 - 0x5d8]
   1edc0: 05 00 40 04 00 00 00 00      	ja +0x440 <.text+0x20ea8>
   1edc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1edd0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1edd8: 18 02 00 00 04 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e04
   1ede8: 85 10 00 00 b2 70 02 00      	call 0x270b2
   1edf0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   1edf8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   1ee00: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1ee08: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1ee18: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   1ee20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1ee28: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   1ee30: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   1ee38: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   1ee40: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   1ee48: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1ee50: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1ee58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1ee60: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   1ee68: 18 01 00 00 04 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e04
   1ee78: 85 10 00 00 01 7e 02 00      	call 0x27e01
   1ee80: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x1ed70>
   1ee88: 05 00 fa 03 00 00 00 00      	ja +0x3fa <.text+0x20d40>
   1ee90: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   1ee98: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   1eea0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   1eea8: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   1eeb0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   1eeb8: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1eec0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1eec8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1eed0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1eed8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1eee0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1eee8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1eef0: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1ef00: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1ef08: 62 0a 38 fd 8e 17 00 00      	stw [r10 - 0x2c8], 0x178e
   1ef10: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1ef18: 62 0a b8 fc dc 02 00 00      	stw [r10 - 0x348], 0x2dc
   1ef20: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1ef28: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1ef30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1ef38: 07 01 00 00 58 f9 ff ff      	add64 r1, -0x6a8
   1ef40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1ef48: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1ef50: 85 10 00 00 7b f9 02 00      	call 0x2f97b
   1ef58: 79 a3 60 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6a0]
   1ef60: 79 a2 58 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6a8]
   1ef68: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   1ef70: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   1ef78: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   1ef80: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   1ef88: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   1ef90: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1ef98: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   1efa0: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   1efa8: 7a 0a c0 fc 00 00 00 00      	stdw [r10 - 0x340], 0x0
   1efb0: 7a 0a c8 fc 00 00 00 00      	stdw [r10 - 0x338], 0x0
   1efb8: 7a 0a d0 fc 00 00 00 00      	stdw [r10 - 0x330], 0x0
   1efc0: 7a 0a d8 fc 00 00 00 00      	stdw [r10 - 0x328], 0x0
   1efc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1efd0: 07 01 00 00 48 f9 ff ff      	add64 r1, -0x6b8
   1efd8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   1efe0: 07 04 00 00 a0 fc ff ff      	add64 r4, -0x360
   1efe8: 85 10 00 00 39 fa 02 00      	call 0x2fa39
   1eff0: 79 a7 50 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6b0]
   1eff8: 79 a9 48 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6b8]
   1f000: 05 00 f8 03 00 00 00 00      	ja +0x3f8 <.text+0x20ea8>
   1f008: 7b 2a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r2
   1f010: 25 02 8b 00 02 00 00 00      	jgt r2, 0x2, +0x8b <.text+0x1f350>
   1f018: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f020: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1f028: 18 02 00 00 20 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f20
   1f038: 85 10 00 00 68 70 02 00      	call 0x27068
   1f040: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   1f048: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   1f050: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1f058: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1f068: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   1f070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f078: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   1f080: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   1f088: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   1f090: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   1f098: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1f0a0: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1f0a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f0b0: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   1f0b8: 18 01 00 00 20 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f20
   1f0c8: 85 10 00 00 b7 7d 02 00      	call 0x27db7
   1f0d0: 15 00 4f 01 00 00 00 00      	jeq r0, 0x0, +0x14f <.text+0x1fa30>
   1f0d8: 05 00 b0 03 00 00 00 00      	ja +0x3b0 <.text+0x20d40>
   1f0e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f0e8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1f0f0: 18 02 00 00 a0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ea0
   1f100: 85 10 00 00 4f 70 02 00      	call 0x2704f
   1f108: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   1f110: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   1f118: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1f120: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1f130: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   1f138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f140: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   1f148: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   1f150: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   1f158: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   1f160: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1f168: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1f170: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f178: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   1f180: 18 01 00 00 a0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ea0
   1f190: 85 10 00 00 9e 7d 02 00      	call 0x27d9e
   1f198: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x1f088>
   1f1a0: 05 00 97 03 00 00 00 00      	ja +0x397 <.text+0x20d40>
   1f1a8: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   1f1b0: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   1f1b8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   1f1c0: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   1f1c8: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   1f1d0: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1f1d8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1f1e0: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1f1e8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1f1f0: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1f1f8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1f200: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1f208: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1f218: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1f220: 62 0a 38 fd 9e 17 00 00      	stw [r10 - 0x2c8], 0x179e
   1f228: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1f230: 62 0a b8 fc e2 02 00 00      	stw [r10 - 0x348], 0x2e2
   1f238: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1f240: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1f248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f250: 07 01 00 00 78 f9 ff ff      	add64 r1, -0x688
   1f258: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f260: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1f268: 85 10 00 00 18 f9 02 00      	call 0x2f918
   1f270: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   1f278: 79 a2 78 f9 00 00 00 00      	ldxdw r2, [r10 - 0x688]
   1f280: 79 71 f8 00 00 00 00 00      	ldxdw r1, [r7 + 0xf8]
   1f288: 71 14 3b 04 00 00 00 00      	ldxb r4, [r1 + 0x43b]
   1f290: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f298: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   1f2a0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   1f2a8: 85 10 00 00 87 c4 ff ff      	call -0x3b79
   1f2b0: 79 a7 70 f9 00 00 00 00      	ldxdw r7, [r10 - 0x690]
   1f2b8: 79 a9 68 f9 00 00 00 00      	ldxdw r9, [r10 - 0x698]
   1f2c0: 05 00 a0 03 00 00 00 00      	ja +0x3a0 <.text+0x20ea8>
   1f2c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f2d0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   1f2d8: 18 02 00 00 b8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5db8
   1f2e8: 85 10 00 00 12 70 02 00      	call 0x27012
   1f2f0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   1f2f8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   1f300: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1f308: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   1f318: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   1f320: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f328: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   1f330: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   1f338: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   1f340: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   1f348: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1f350: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1f358: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f360: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   1f368: 18 01 00 00 b8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5db8
   1f378: 85 10 00 00 61 7d 02 00      	call 0x27d61
   1f380: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x1f270>
   1f388: 05 00 5a 03 00 00 00 00      	ja +0x35a <.text+0x20d40>
   1f390: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   1f398: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   1f3a0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   1f3a8: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   1f3b0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   1f3b8: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1f3c0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1f3c8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1f3d0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1f3d8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1f3e0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1f3e8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1f3f0: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1f400: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1f408: 62 0a 38 fd c4 17 00 00      	stw [r10 - 0x2c8], 0x17c4
   1f410: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1f418: 62 0a b8 fc cf 02 00 00      	stw [r10 - 0x348], 0x2cf
   1f420: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1f428: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1f430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f438: 07 01 00 00 38 f9 ff ff      	add64 r1, -0x6c8
   1f440: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f448: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1f450: 85 10 00 00 db f8 02 00      	call 0x2f8db
   1f458: 79 a7 40 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6c0]
   1f460: 79 a9 38 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6c8]
   1f468: 05 00 6b 03 00 00 00 00      	ja +0x36b <.text+0x20ea8>
   1f470: 7b 3a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r3
   1f478: 7b 1a c0 f8 00 00 00 00      	stxdw [r10 - 0x740], r1
   1f480: 79 11 10 00 00 00 00 00      	ldxdw r1, [r1 + 0x10]
   1f488: 7b 1a b8 f8 00 00 00 00      	stxdw [r10 - 0x748], r1
   1f490: 79 11 60 00 00 00 00 00      	ldxdw r1, [r1 + 0x60]
   1f498: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   1f4a0: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   1f4a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   1f4b0: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   1f4b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   1f4c0: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   1f4c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1f4d0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   1f4d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f4e0: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   1f4e8: 18 02 00 00 28 5b 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5b28
   1f4f8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f500: 85 10 00 00 2e 28 03 00      	call 0x3282e
   1f508: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f510: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f518: 15 00 09 00 00 00 00 00      	jeq r0, 0x0, +0x9 <.text+0x1f448>
   1f520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f528: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   1f530: 18 02 00 00 a8 5c 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ca8
   1f540: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f548: 85 10 00 00 25 28 03 00      	call 0x32825
   1f550: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f558: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f560: 55 00 77 01 00 00 00 00      	jne r0, 0x0, +0x177 <.text+0x20000>
   1f568: 79 a2 b8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x748]
   1f570: 71 21 8a 00 00 00 00 00      	ldxb r1, [r2 + 0x8a]
   1f578: 15 01 ae 02 00 00 00 00      	jeq r1, 0x0, +0x2ae <.text+0x209d0>
   1f580: 7b 7a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r7
   1f588: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   1f590: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   1f598: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   1f5a0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   1f5a8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   1f5b0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   1f5b8: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   1f5c0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   1f5c8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   1f5d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f5d8: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   1f5e0: 18 02 00 00 c8 5c 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5cc8
   1f5f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f5f8: 85 10 00 00 0f 28 03 00      	call 0x3280f
   1f600: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f608: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f610: 15 00 91 02 00 00 00 00      	jeq r0, 0x0, +0x291 <.text+0x20980>
   1f618: 7a 0a b8 fc 00 00 00 00      	stdw [r10 - 0x348], 0x0
   1f620: 7a 0a b0 fc 00 00 00 00      	stdw [r10 - 0x350], 0x0
   1f628: 7a 0a a8 fc 00 00 00 00      	stdw [r10 - 0x358], 0x0
   1f630: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1f638: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f640: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   1f648: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f650: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1f658: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f660: 85 10 00 00 02 28 03 00      	call 0x32802
   1f668: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f670: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f678: 15 00 84 02 00 00 00 00      	jeq r0, 0x0, +0x284 <.text+0x20980>
   1f680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f688: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   1f690: 18 02 00 00 88 5a 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5a88
   1f6a0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f6a8: 85 10 00 00 f9 27 03 00      	call 0x327f9
   1f6b0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f6b8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f6c0: 15 00 60 04 00 00 00 00      	jeq r0, 0x0, +0x460 <.text+0x218a8>
   1f6c8: 7b 9a c8 f8 00 00 00 00      	stxdw [r10 - 0x738], r9
   1f6d0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   1f6d8: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   1f6e0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   1f6e8: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   1f6f0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   1f6f8: 7b 1a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r1
   1f700: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   1f708: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   1f710: 7a 0a b8 fc 00 00 00 00      	stdw [r10 - 0x348], 0x0
   1f718: 7a 0a b0 fc 00 00 00 00      	stdw [r10 - 0x350], 0x0
   1f720: 7a 0a a8 fc 00 00 00 00      	stdw [r10 - 0x358], 0x0
   1f728: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1f730: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f738: 07 01 00 00 58 fb ff ff      	add64 r1, -0x4a8
   1f740: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f748: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1f750: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f758: 85 10 00 00 e3 27 03 00      	call 0x327e3
   1f760: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f768: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f770: 15 00 09 00 00 00 00 00      	jeq r0, 0x0, +0x9 <.text+0x1f6a0>
   1f778: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f780: 07 01 00 00 58 fb ff ff      	add64 r1, -0x4a8
   1f788: 18 02 00 00 c8 5c 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5cc8
   1f798: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f7a0: 85 10 00 00 da 27 03 00      	call 0x327da
   1f7a8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f7b0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f7b8: 55 00 a7 04 00 00 00 00      	jne r0, 0x0, +0x4a7 <.text+0x21bd8>
   1f7c0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   1f7c8: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   1f7d0: 7b 1a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r1
   1f7d8: 79 a1 b8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x748]
   1f7e0: 79 19 18 00 00 00 00 00      	ldxdw r9, [r1 + 0x18]
   1f7e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f7f0: 07 02 00 00 98 fe ff ff      	add64 r2, -0x168
   1f7f8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   1f800: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f808: 85 10 00 00 cd 27 03 00      	call 0x327cd
   1f810: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f818: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f820: 55 00 69 04 00 00 00 00      	jne r0, 0x0, +0x469 <.text+0x21a50>
   1f828: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   1f830: 18 02 00 00 a8 5c 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ca8
   1f840: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f848: 85 10 00 00 c5 27 03 00      	call 0x327c5
   1f850: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f858: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f860: 15 00 e8 04 00 00 00 00      	jeq r0, 0x0, +0x4e8 <.text+0x21e88>
   1f868: 79 a1 b8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x748]
   1f870: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   1f878: 07 09 00 00 30 00 00 00      	add64 r9, 0x30
   1f880: 79 a1 d8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x728]
   1f888: 79 11 e8 00 00 00 00 00      	ldxdw r1, [r1 + 0xe8]
   1f890: 7b 1a a0 f8 00 00 00 00      	stxdw [r10 - 0x760], r1
   1f898: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1f8a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1f8a8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   1f8b0: 7b 2a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r2
   1f8b8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   1f8c0: 7b 2a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r2
   1f8c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   1f8d0: 7b 2a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r2
   1f8d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   1f8e0: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   1f8e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f8f0: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   1f8f8: 7b 1a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r1
   1f900: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f908: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1f910: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   1f918: 07 03 00 00 b8 fe ff ff      	add64 r3, -0x148
   1f920: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   1f928: 07 04 00 00 98 fe ff ff      	add64 r4, -0x168
   1f930: 85 10 00 00 15 f3 02 00      	call 0x2f315
   1f938: 7b 9a 98 f8 00 00 00 00      	stxdw [r10 - 0x768], r9
   1f940: 79 99 00 00 00 00 00 00      	ldxdw r9, [r9 + 0x0]
   1f948: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   1f950: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   1f958: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   1f960: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   1f968: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   1f970: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1f978: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   1f980: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   1f988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f990: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   1f998: 79 a2 e0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x720]
   1f9a0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   1f9a8: 85 10 00 00 99 27 03 00      	call 0x32799
   1f9b0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   1f9b8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   1f9c0: 15 00 cd 04 00 00 00 00      	jeq r0, 0x0, +0x4cd <.text+0x21f10>
   1f9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f9d0: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   1f9d8: 18 02 00 00 c8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5dc8
   1f9e8: 85 10 00 00 32 6f 02 00      	call 0x26f32
   1f9f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f9f8: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   1fa00: 18 02 00 00 c8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5dc8
   1fa10: 85 10 00 00 e4 d5 ff ff      	call -0x2a1c
   1fa18: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1fa28: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1fa30: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1fa38: 62 0a b8 fc 02 01 00 00      	stw [r10 - 0x348], 0x102
   1fa40: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1fa48: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1fa50: 62 0a 38 fd b1 17 00 00      	stw [r10 - 0x2c8], 0x17b1
   1fa58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1fa60: 07 01 00 00 b8 fa ff ff      	add64 r1, -0x548
   1fa68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1fa70: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1fa78: 85 10 00 00 16 f8 02 00      	call 0x2f816
   1fa80: 79 a3 c0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x540]
   1fa88: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   1fa90: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   1fa98: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   1faa0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   1faa8: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   1fab0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   1fab8: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1fac0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   1fac8: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   1fad0: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   1fad8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1fae0: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   1fae8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1faf0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   1faf8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1fb00: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   1fb08: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1fb10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1fb18: 07 01 00 00 a8 fa ff ff      	add64 r1, -0x558
   1fb20: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   1fb28: 07 04 00 00 a0 fc ff ff      	add64 r4, -0x360
   1fb30: 85 10 00 00 d0 f8 02 00      	call 0x2f8d0
   1fb38: 79 a7 b0 fa 00 00 00 00      	ldxdw r7, [r10 - 0x550]
   1fb40: 79 a9 a8 fa 00 00 00 00      	ldxdw r9, [r10 - 0x558]
   1fb48: 05 00 8f 02 00 00 00 00      	ja +0x28f <.text+0x20ea8>
   1fb50: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   1fb58: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   1fb60: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   1fb68: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   1fb70: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   1fb78: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   1fb80: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1fb88: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1fb90: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1fb98: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   1fba0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1fba8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   1fbb0: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   1fbc0: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   1fbc8: 62 0a 38 fd 8b 17 00 00      	stw [r10 - 0x2c8], 0x178b
   1fbd0: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   1fbd8: 62 0a b8 fc c6 00 00 00      	stw [r10 - 0x348], 0xc6
   1fbe0: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   1fbe8: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1fbf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1fbf8: 07 01 00 00 58 fa ff ff      	add64 r1, -0x5a8
   1fc00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1fc08: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1fc10: 85 10 00 00 e3 f7 02 00      	call 0x2f7e3
   1fc18: 79 a7 60 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5a0]
   1fc20: 79 a9 58 fa 00 00 00 00      	ldxdw r9, [r10 - 0x5a8]
   1fc28: 79 a1 d0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x730]
   1fc30: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   1fc38: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   1fc40: 07 08 00 00 78 ff ff ff      	add64 r8, -0x88
   1fc48: 62 0a 78 ff 03 00 00 00      	stw [r10 - 0x88], 0x3
   1fc50: 55 09 35 00 00 00 00 00      	jne r9, 0x0, +0x35 <.text+0x1fce0>
   1fc58: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   1fc60: 7a 0a 60 fb 01 00 00 00      	stdw [r10 - 0x4a0], 0x1
   1fc68: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   1fc70: 18 06 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r6, 0x1bd838
   1fc80: 7b 6a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r6
   1fc88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1fc90: 07 01 00 00 58 fb ff ff      	add64 r1, -0x4a8
   1fc98: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   1fca0: 72 0a d8 fc 03 00 00 00      	stb [r10 - 0x328], 0x3
   1fca8: 7a 0a d0 fc 20 00 00 00      	stdw [r10 - 0x330], 0x20
   1fcb0: 7a 0a b0 fc 00 00 00 00      	stdw [r10 - 0x350], 0x0
   1fcb8: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   1fcc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1fcc8: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   1fcd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1fcd8: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   1fce0: 85 10 00 00 99 26 03 00      	call 0x32699
   1fce8: 15 00 bb 00 00 00 00 00      	jeq r0, 0x0, +0xbb <.text+0x201a8>
   1fcf0: 05 00 2d 02 00 00 00 00      	ja +0x22d <.text+0x20d40>
