   3cf00: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   3cf08: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3cf10: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   3cf18: bf 65 00 00 00 00 00 00      	mov64 r5, r6
   3cf20: 25 06 01 00 a6 00 00 00      	jgt r6, 0xa6, +0x1 <.text+0x3ce10>
   3cf28: b7 05 00 00 a6 00 00 00      	mov64 r5, 0xa6
   3cf30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3cf38: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   3cf40: 79 a3 70 ff 00 00 00 00      	ldxdw r3, [r10 - 0x90]
   3cf48: 85 10 00 00 60 00 00 00      	call 0x60
   3cf50: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   3cf58: 79 a8 90 ff 00 00 00 00      	ldxdw r8, [r10 - 0x70]
   3cf60: 55 08 59 00 02 00 00 00      	jne r8, 0x2, +0x59 <.text+0x3d110>
   3cf68: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   3cf70: 25 06 57 00 a5 00 00 00      	jgt r6, 0xa5, +0x57 <.text+0x3d110>
   3cf78: 79 76 08 00 00 00 00 00      	ldxdw r6, [r7 + 0x8]
   3cf80: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   3cf88: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   3cf90: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3cf98: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x3ce88>
   3cfa0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3cfa8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   3cfb0: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   3cfb8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3cea8>
   3cfc0: 05 00 bb ff 00 00 00 00      	ja -0x45 <.text+0x3cc80>
   3cfc8: 79 79 10 00 00 00 00 00      	ldxdw r9, [r7 + 0x10]
   3cfd0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   3cfd8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   3cfe0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   3cfe8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x3ced8>
   3cff0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   3cff8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   3d000: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x3cef0>
   3d008: 05 00 b2 ff 00 00 00 00      	ja -0x4e <.text+0x3cc80>
   3d010: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   3d018: 79 73 20 00 00 00 00 00      	ldxdw r3, [r7 + 0x20]
   3d020: 71 74 28 00 00 00 00 00      	ldxb r4, [r7 + 0x28]
   3d028: 71 75 29 00 00 00 00 00      	ldxb r5, [r7 + 0x29]
   3d030: 71 70 2a 00 00 00 00 00      	ldxb r0, [r7 + 0x2a]
   3d038: 73 0a e2 ff 00 00 00 00      	stxb [r10 - 0x1e], r0
   3d040: 73 5a e1 ff 00 00 00 00      	stxb [r10 - 0x1f], r5
   3d048: 73 4a e0 ff 00 00 00 00      	stxb [r10 - 0x20], r4
   3d050: 7b 3a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r3
   3d058: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
   3d060: 7b 9a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r9
   3d068: 7b 6a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r6
   3d070: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   3d078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d080: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   3d088: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3d090: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   3d098: b7 03 00 00 a6 00 00 00      	mov64 r3, 0xa6
   3d0a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   3d0a8: 85 10 00 00 a0 cb 02 00      	call 0x2cba0
   3d0b0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   3d0c0: 79 a2 a0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x60]
   3d0c8: 5d 12 0f 00 00 00 00 00      	jne r2, r1, +0xf <.text+0x3d028>
   3d0d0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   3d0d8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3d0e0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   3d0e8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x3cfe8>
   3d0f0: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   3d0f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3d100: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   3d108: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   3d110: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3d118: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   3d120: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x3d020>
   3d128: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   3d130: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   3d138: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   3d140: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x3d110>
   3d148: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   3d150: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   3d158: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   3d160: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   3d168: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   3d170: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   3d178: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3d180: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   3d188: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3d190: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   3d198: 85 10 00 00 43 bd 02 00      	call 0x2bd43
   3d1a0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   3d1a8: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
