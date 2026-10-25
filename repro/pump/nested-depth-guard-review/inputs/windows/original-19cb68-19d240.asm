  19cb68: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  19cb70: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
  19cb78: 15 01 69 00 00 00 00 00      	jeq r1, 0x0, +0x69 <custom_panic+0x45c10>
  19cb80: 15 01 3a 00 01 00 00 00      	jeq r1, 0x1, +0x3a <custom_panic+0x45aa0>
  19cb88: 18 01 00 00 98 ed 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bed98
  19cb98: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
  19cba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19cba8: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
  19cbb0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
  19cbb8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cbc0: 07 01 00 00 38 00 00 00      	add64 r1, 0x38
  19cbc8: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  19cbd0: 18 01 00 00 30 31 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3130
  19cbe0: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
  19cbe8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cbf0: 07 01 00 00 98 00 00 00      	add64 r1, 0x98
  19cbf8: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  19cc00: 18 01 00 00 e0 a9 19 00 00 00 00 00 00 00 00 00      	lddw r1, 0x19a9e0
  19cc10: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  19cc18: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
  19cc20: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cc28: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
  19cc30: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
  19cc38: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  19cc40: 7a 0a c8 ff 04 00 00 00      	stdw [r10 - 0x38], 0x4
  19cc48: 7a 0a d8 ff 03 00 00 00      	stdw [r10 - 0x28], 0x3
  19cc50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19cc58: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  19cc60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  19cc68: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
  19cc70: 85 10 00 00 ba 1c 00 00      	call 0x1cba
  19cc78: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
  19cc80: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
  19cc88: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  19cc90: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  19cc98: 85 10 00 00 ff ff ff ff      	call -0x1
  19cca0: 15 07 04 00 00 00 00 00      	jeq r7, 0x0, +0x4 <custom_panic+0x45a10>
  19cca8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  19ccb0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  19ccb8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  19ccc0: 85 10 00 00 7e 74 ff ff      	call -0x8b82
  19ccc8: 71 61 50 00 00 00 00 00      	ldxb r1, [r6 + 0x50]
  19ccd0: 15 01 6d 00 00 00 00 00      	jeq r1, 0x0, +0x6d <custom_panic+0x45d88>
  19ccd8: 15 01 ab 00 02 00 00 00      	jeq r1, 0x2, +0xab <custom_panic+0x45f80>
  19cce0: 18 01 00 00 fc a6 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1ba6fc
  19ccf0: b7 02 00 00 05 00 00 00      	mov64 r2, 0x5
  19ccf8: 85 10 00 00 ff ff ff ff      	call -0x1
  19cd00: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cd08: 07 01 00 00 51 00 00 00      	add64 r1, 0x51
  19cd10: 85 10 00 00 95 16 00 00      	call 0x1695
  19cd18: 18 01 00 00 01 a7 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1ba701
  19cd28: b7 02 00 00 06 00 00 00      	mov64 r2, 0x6
  19cd30: 85 10 00 00 ff ff ff ff      	call -0x1
  19cd38: 07 06 00 00 71 00 00 00      	add64 r6, 0x71
  19cd40: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cd48: 85 10 00 00 8e 16 00 00      	call 0x168e
  19cd50: 05 00 9c 00 00 00 00 00      	ja +0x9c <custom_panic+0x45f80>
  19cd58: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cd60: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
  19cd68: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
  19cd70: 18 01 00 00 38 ee 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bee38
  19cd80: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
  19cd88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19cd90: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
  19cd98: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
  19cda0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cda8: 07 01 00 00 38 00 00 00      	add64 r1, 0x38
  19cdb0: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
  19cdb8: 18 01 00 00 30 31 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3130
  19cdc8: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  19cdd0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cdd8: 07 01 00 00 98 00 00 00      	add64 r1, 0x98
  19cde0: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  19cde8: 18 01 00 00 e0 a9 19 00 00 00 00 00 00 00 00 00      	lddw r1, 0x19a9e0
  19cdf8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
  19ce00: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
  19ce08: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19ce10: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
  19ce18: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  19ce20: 18 01 00 00 18 9b 19 00 00 00 00 00 00 00 00 00      	lddw r1, 0x199b18
  19ce30: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
  19ce38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19ce40: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
  19ce48: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
  19ce50: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  19ce58: 7a 0a c8 ff 05 00 00 00      	stdw [r10 - 0x38], 0x5
  19ce60: 7a 0a d8 ff 04 00 00 00      	stdw [r10 - 0x28], 0x4
  19ce68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19ce70: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  19ce78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  19ce80: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
  19ce88: 85 10 00 00 77 1c 00 00      	call 0x1c77
  19ce90: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
  19ce98: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
  19cea0: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  19cea8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  19ceb0: 85 10 00 00 ff ff ff ff      	call -0x1
  19ceb8: 15 07 c1 ff 00 00 00 00      	jeq r7, 0x0, -0x3f <custom_panic+0x45a10>
  19cec0: 05 00 bc ff 00 00 00 00      	ja -0x44 <custom_panic+0x459f0>
  19cec8: 18 01 00 00 d8 ed 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bedd8
  19ced8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
  19cee0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19cee8: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
  19cef0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
  19cef8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cf00: 07 01 00 00 38 00 00 00      	add64 r1, 0x38
  19cf08: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
  19cf10: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cf18: 07 01 00 00 98 00 00 00      	add64 r1, 0x98
  19cf20: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
  19cf28: 18 01 00 00 e0 a9 19 00 00 00 00 00 00 00 00 00      	lddw r1, 0x19a9e0
  19cf38: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
  19cf40: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  19cf48: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cf50: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
  19cf58: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  19cf60: 18 01 00 00 30 31 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3130
  19cf70: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
  19cf78: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
  19cf80: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cf88: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
  19cf90: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  19cf98: 18 01 00 00 f0 9a 19 00 00 00 00 00 00 00 00 00      	lddw r1, 0x199af0
  19cfa8: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
  19cfb0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19cfb8: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
  19cfc0: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
  19cfc8: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  19cfd0: 7a 0a c8 ff 06 00 00 00      	stdw [r10 - 0x38], 0x6
  19cfd8: 7a 0a d8 ff 05 00 00 00      	stdw [r10 - 0x28], 0x5
  19cfe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19cfe8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  19cff0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  19cff8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
  19d000: 85 10 00 00 48 1c 00 00      	call 0x1c48
  19d008: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
  19d010: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
  19d018: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  19d020: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  19d028: 85 10 00 00 ff ff ff ff      	call -0x1
  19d030: 15 07 92 ff 00 00 00 00      	jeq r7, 0x0, -0x6e <custom_panic+0x45a10>
  19d038: 05 00 8d ff 00 00 00 00      	ja -0x73 <custom_panic+0x459f0>
  19d040: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  19d048: 07 01 00 00 58 00 00 00      	add64 r1, 0x58
  19d050: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  19d058: 07 06 00 00 70 00 00 00      	add64 r6, 0x70
  19d060: 7b 6a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r6
  19d068: 18 01 00 00 78 ed 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bed78
  19d078: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
  19d080: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d088: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  19d090: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  19d098: 18 08 00 00 18 9b 19 00 00 00 00 00 00 00 00 00      	lddw r8, 0x199b18
  19d0a8: 7b 8a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r8
  19d0b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d0b8: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
  19d0c0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
  19d0c8: 7a 0a 78 ff 00 00 00 00      	stdw [r10 - 0x88], 0x0
  19d0d0: 7a 0a 60 ff 01 00 00 00      	stdw [r10 - 0xa0], 0x1
  19d0d8: 7a 0a 70 ff 01 00 00 00      	stdw [r10 - 0x90], 0x1
  19d0e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d0e8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
  19d0f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  19d0f8: 07 02 00 00 58 ff ff ff      	add64 r2, -0xa8
  19d100: 85 10 00 00 28 1c 00 00      	call 0x1c28
  19d108: 79 a6 c0 ff 00 00 00 00      	ldxdw r6, [r10 - 0x40]
  19d110: 79 a7 c8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x38]
  19d118: 79 a2 d0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x30]
  19d120: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  19d128: 85 10 00 00 ff ff ff ff      	call -0x1
  19d130: 15 06 04 00 00 00 00 00      	jeq r6, 0x0, +0x4 <custom_panic+0x45ea0>
  19d138: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  19d140: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  19d148: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  19d150: 85 10 00 00 ec 73 ff ff      	call -0x8c14
  19d158: 18 01 00 00 88 ed 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bed88
  19d168: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
  19d170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d178: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  19d180: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  19d188: 7b 8a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r8
  19d190: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d198: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
  19d1a0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
  19d1a8: 7a 0a 78 ff 00 00 00 00      	stdw [r10 - 0x88], 0x0
  19d1b0: 7a 0a 60 ff 01 00 00 00      	stdw [r10 - 0xa0], 0x1
  19d1b8: 7a 0a 70 ff 01 00 00 00      	stdw [r10 - 0x90], 0x1
  19d1c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  19d1c8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
  19d1d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  19d1d8: 07 02 00 00 58 ff ff ff      	add64 r2, -0xa8
  19d1e0: 85 10 00 00 0c 1c 00 00      	call 0x1c0c
  19d1e8: 79 a6 c0 ff 00 00 00 00      	ldxdw r6, [r10 - 0x40]
  19d1f0: 79 a7 c8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x38]
  19d1f8: 79 a2 d0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x30]
  19d200: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  19d208: 85 10 00 00 ff ff ff ff      	call -0x1
  19d210: 15 06 04 00 00 00 00 00      	jeq r6, 0x0, +0x4 <custom_panic+0x45f80>
  19d218: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  19d220: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  19d228: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  19d230: 85 10 00 00 d0 73 ff ff      	call -0x8c30
  19d238: 95 00 00 00 00 00 00 00      	exit
