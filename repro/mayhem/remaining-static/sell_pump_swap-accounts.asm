   4cc98: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   4cca0: 7b 4a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r4
   4cca8: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   4ccb0: 7b 2a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r2
   4ccb8: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   4ccc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ccc8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   4ccd0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4ccd8: 85 10 00 00 6a 7a ff ff      	call -0x8596 ; target 0xa030
   4cce0: 79 a6 c8 fb 00 00 00 00      	ldxdw r6, [r10 - 0x438]
   4cce8: 79 a8 c0 fb 00 00 00 00      	ldxdw r8, [r10 - 0x440]
   4ccf0: 55 08 2f 00 02 00 00 00      	jne r8, 0x2, +0x2f <.text+0x4cd50>
   4ccf8: 79 71 10 f0 00 00 00 00      	ldxdw r1, [r7 - 0xff0]
   4cd00: 7b 1a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r1
   4cd08: 79 78 08 f0 00 00 00 00      	ldxdw r8, [r7 - 0xff8]
   4cd10: 79 77 00 f0 00 00 00 00      	ldxdw r7, [r7 - 0x1000]
   4cd18: 7b 6a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r6
   4cd20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4cd28: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4cd30: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4cd38: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4cd40: 85 10 00 00 b1 7a ff ff      	call -0x854f ; target 0xa2d0
   4cd48: 71 a1 fd ff 00 00 00 00      	ldxb r1, [r10 - 0x3]
   4cd50: 55 01 54 00 02 00 00 00      	jne r1, 0x2, +0x54 <.text+0x4ced8>
   4cd58: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   4cd60: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   4cd68: 85 10 00 00 10 6d 00 00      	call 0x6d10 ; target 0x835f0
   4cd70: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   4cd80: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4cd88: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4cd90: 07 01 00 00 f3 ff ff ff      	add64 r1, -0xd
   4cd98: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4cda0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4cda8: 2d 21 60 00 00 00 00 00      	jgt r1, r2, +0x60 <.text+0x4cf90>
   4cdb0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4cdb8: 15 04 5f 00 00 00 00 00      	jeq r4, 0x0, +0x5f <.text+0x4cf98>
   4cdc0: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   4cdd0: 15 02 60 00 00 00 00 00      	jeq r2, 0x0, +0x60 <.text+0x4cfb8>
   4cdd8: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   4cde0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4cdf0: 15 06 5f 00 01 00 00 00      	jeq r6, 0x1, +0x5f <.text+0x4cfd0>
   4cdf8: bd 21 5f 00 00 00 00 00      	jle r1, r2, +0x5f <.text+0x4cfd8>
   4ce00: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4ce10: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4ce18: 18 02 00 00 6c 5f 70 61 00 00 00 00 72 61 6d 73      	lddw r2, 0x736d617261705f6c
   4ce28: 7b 21 05 00 00 00 00 00      	stxdw [r1 + 0x5], r2
   4ce30: 18 02 00 00 67 6c 6f 62 00 00 00 00 61 6c 5f 70      	lddw r2, 0x705f6c61626f6c67
   4ce40: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   4ce48: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4ce50: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   4ce58: 7a 07 18 00 0d 00 00 00      	stdw [r7 + 0x18], 0xd
   4ce60: 7a 07 08 00 0d 00 00 00      	stdw [r7 + 0x8], 0xd
   4ce68: 05 00 38 01 00 00 00 00      	ja +0x138 <.text+0x4d710>
   4ce70: 85 10 00 00 ef 6c 00 00      	call 0x6cef ; target 0x835f0
   4ce78: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   4ce88: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4ce90: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4ce98: 07 01 00 00 fa ff ff ff      	add64 r1, -0x6
   4cea0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4cea8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4ceb0: 2d 21 10 00 00 00 00 00      	jgt r1, r2, +0x10 <.text+0x4ce18>
   4ceb8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4cec0: 15 04 0f 00 00 00 00 00      	jeq r4, 0x0, +0xf <.text+0x4ce20>
   4cec8: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   4ced8: 15 02 10 00 00 00 00 00      	jeq r2, 0x0, +0x10 <.text+0x4ce40>
   4cee0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   4cee8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4cef0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   4cef8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4cf08: 2d 21 0f 00 00 00 00 00      	jgt r1, r2, +0xf <.text+0x4ce68>
   4cf10: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4cf18: b7 02 00 00 06 00 00 00      	mov64 r2, 0x6
   4cf20: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   4cf30: 85 10 00 00 22 ad 00 00      	call 0xad22 ; target 0xa3848
   4cf38: 55 04 f1 ff 00 00 00 00      	jne r4, 0x0, -0xf <.text+0x4cda8>
   4cf40: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4cf48: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   4cf58: 55 02 f0 ff 00 00 00 00      	jne r2, 0x0, -0x10 <.text+0x4cdc0>
   4cf60: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4cf68: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   4cf70: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4cf80: bd 21 f1 ff 00 00 00 00      	jle r1, r2, -0xf <.text+0x4cdf0>
   4cf88: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4cf98: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4cfa0: 6a 01 04 00 65 72 00 00      	sth [r1 + 0x4], 0x7265
   4cfa8: 62 01 00 00 74 72 61 64      	stw [r1 + 0x0], 0x64617274
   4cfb0: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   4cfb8: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   4cfc0: 7a 06 18 00 06 00 00 00      	stdw [r6 + 0x18], 0x6
   4cfc8: 7a 06 08 00 06 00 00 00      	stdw [r6 + 0x8], 0x6
   4cfd0: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   4cfd8: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4cfe0: 7b 61 10 00 00 00 00 00      	stxdw [r1 + 0x10], r6
   4cfe8: 7b 81 08 00 00 00 00 00      	stxdw [r1 + 0x8], r8
   4cff0: 05 00 0b 01 00 00 00 00      	ja +0x10b <.text+0x4d730>
   4cff8: 85 10 00 00 be 6c 00 00      	call 0x6cbe ; target 0x835f0
   4d000: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   4d010: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   4d018: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   4d020: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   4d028: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4d030: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d038: 2d 53 1c 00 00 00 00 00      	jgt r3, r5, +0x1c <.text+0x4d000>
   4d040: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d048: 15 04 1b 00 00 00 00 00      	jeq r4, 0x0, +0x1b <.text+0x4d008>
   4d050: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   4d060: 15 05 1c 00 00 00 00 00      	jeq r5, 0x0, +0x1c <.text+0x4d028>
   4d068: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   4d070: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d078: 7b 8a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r8
   4d080: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d090: 2d 21 1a 00 00 00 00 00      	jgt r1, r2, +0x1a <.text+0x4d048>
   4d098: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   4d0a0: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   4d0a8: 85 10 00 00 f7 ac 00 00      	call 0xacf7 ; target 0xa3868
   4d0b0: 55 04 a1 ff 00 00 00 00      	jne r4, 0x0, -0x5f <.text+0x4cca0>
   4d0b8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4d0c0: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   4d0d0: 55 02 a0 ff 00 00 00 00      	jne r2, 0x0, -0x60 <.text+0x4ccb8>
   4d0d8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d0e8: 55 06 a1 ff 01 00 00 00      	jne r6, 0x1, -0x5f <.text+0x4ccd8>
   4d0f0: 2d 21 a1 ff 00 00 00 00      	jgt r1, r2, -0x5f <.text+0x4cce0>
   4d0f8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4d100: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   4d108: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   4d118: 85 10 00 00 e5 ac 00 00      	call 0xace5 ; target 0xa3848
   4d120: 55 04 e5 ff 00 00 00 00      	jne r4, 0x0, -0x1b <.text+0x4cf30>
   4d128: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   4d130: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   4d140: 55 05 e4 ff 00 00 00 00      	jne r5, 0x0, -0x1c <.text+0x4cf48>
   4d148: 7b 8a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r8
   4d150: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d160: bd 21 e6 ff 00 00 00 00      	jle r1, r2, -0x1a <.text+0x4cf78>
   4d168: 18 08 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300000000
   4d178: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   4d180: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4d188: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4d190: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   4d198: b7 03 00 00 00 01 00 00      	mov64 r3, 0x100
   4d1a0: 85 10 00 00 7c ba 00 00      	call 0xba7c ; target 0xaa588
   4d1a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4d1b0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4d1b8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4d1c0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4d1c8: 85 10 00 00 ed 79 ff ff      	call -0x8613 ; target 0xa138
   4d1d0: 71 a1 69 ff 00 00 00 00      	ldxb r1, [r10 - 0x97]
   4d1d8: 55 01 1f 00 02 00 00 00      	jne r1, 0x2, +0x1f <.text+0x4d1b8>
   4d1e0: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   4d1e8: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   4d1f0: 85 10 00 00 7f 6c 00 00      	call 0x6c7f ; target 0x835f0
   4d1f8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   4d200: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d208: 07 01 00 00 f4 ff ff ff      	add64 r1, -0xc
   4d210: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4d218: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d220: 2d 21 2a 00 00 00 00 00      	jgt r1, r2, +0x2a <.text+0x4d258>
   4d228: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d230: 15 04 29 00 00 00 00 00      	jeq r4, 0x0, +0x29 <.text+0x4d260>
   4d238: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   4d248: 15 02 2a 00 00 00 00 00      	jeq r2, 0x0, +0x2a <.text+0x4d280>
   4d250: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   4d258: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d268: 15 06 29 00 01 00 00 00      	jeq r6, 0x1, +0x29 <.text+0x4d298>
   4d270: bd 21 29 00 00 00 00 00      	jle r1, r2, +0x29 <.text+0x4d2a0>
   4d278: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4d288: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4d290: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 73      	lddw r2, 0x735f6d656879616d
   4d2a0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   4d2a8: 62 01 08 00 74 61 74 65      	stw [r1 + 0x8], 0x65746174
   4d2b0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4d2b8: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   4d2c0: 7a 07 18 00 0c 00 00 00      	stdw [r7 + 0x18], 0xc
   4d2c8: 7a 07 08 00 0c 00 00 00      	stdw [r7 + 0x8], 0xc
   4d2d0: 05 00 ab 00 00 00 00 00      	ja +0xab <.text+0x4d710>
   4d2d8: 85 10 00 00 62 6c 00 00      	call 0x6c62 ; target 0x835f0
   4d2e0: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   4d2e8: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   4d2f0: 07 03 00 00 90 ff ff ff      	add64 r3, -0x70
   4d2f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4d300: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d308: 2d 53 1b 00 00 00 00 00      	jgt r3, r5, +0x1b <.text+0x4d2c8>
   4d310: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d318: 15 04 1a 00 00 00 00 00      	jeq r4, 0x0, +0x1a <.text+0x4d2d0>
   4d320: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   4d330: 15 05 1b 00 00 00 00 00      	jeq r5, 0x0, +0x1b <.text+0x4d2f0>
   4d338: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   4d340: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d348: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d358: 2d 21 19 00 00 00 00 00      	jgt r1, r2, +0x19 <.text+0x4d308>
   4d360: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   4d368: b7 02 00 00 70 00 00 00      	mov64 r2, 0x70
   4d370: 85 10 00 00 9e ac 00 00      	call 0xac9e ; target 0xa3868
   4d378: 55 04 d7 ff 00 00 00 00      	jne r4, 0x0, -0x29 <.text+0x4d118>
   4d380: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4d388: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   4d398: 55 02 d6 ff 00 00 00 00      	jne r2, 0x0, -0x2a <.text+0x4d130>
   4d3a0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d3b0: 55 06 d7 ff 01 00 00 00      	jne r6, 0x1, -0x29 <.text+0x4d150>
   4d3b8: 2d 21 d7 ff 00 00 00 00      	jgt r1, r2, -0x29 <.text+0x4d158>
   4d3c0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4d3c8: b7 02 00 00 0c 00 00 00      	mov64 r2, 0xc
   4d3d0: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   4d3e0: 85 10 00 00 8c ac 00 00      	call 0xac8c ; target 0xa3848
   4d3e8: 55 04 e6 ff 00 00 00 00      	jne r4, 0x0, -0x1a <.text+0x4d200>
   4d3f0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   4d3f8: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   4d408: 55 05 e5 ff 00 00 00 00      	jne r5, 0x0, -0x1b <.text+0x4d218>
   4d410: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d420: bd 21 e7 ff 00 00 00 00      	jle r1, r2, -0x19 <.text+0x4d240>
   4d428: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   4d430: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4d438: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4d440: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   4d448: b7 03 00 00 70 00 00 00      	mov64 r3, 0x70
   4d450: 85 10 00 00 26 ba 00 00      	call 0xba26 ; target 0xaa588
   4d458: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4d460: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4d468: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4d470: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4d478: 85 10 00 00 0e 6b ff ff      	call -0x94f2 ; target 0x2cf0
   4d480: 61 a1 00 ff 00 00 00 00      	ldxw r1, [r10 - 0x100]
   4d488: 55 01 1c 00 02 00 00 00      	jne r1, 0x2, +0x1c <.text+0x4d450>
   4d490: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   4d498: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   4d4a0: 85 10 00 00 29 6c 00 00      	call 0x6c29 ; target 0x835f0
   4d4a8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   4d4b0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d4b8: 07 01 00 00 fc ff ff ff      	add64 r1, -0x4
   4d4c0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4d4c8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d4d0: 2d 21 27 00 00 00 00 00      	jgt r1, r2, +0x27 <.text+0x4d4f0>
   4d4d8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d4e0: 15 04 26 00 00 00 00 00      	jeq r4, 0x0, +0x26 <.text+0x4d4f8>
   4d4e8: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   4d4f8: 15 02 27 00 00 00 00 00      	jeq r2, 0x0, +0x27 <.text+0x4d518>
   4d500: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   4d508: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d518: 15 06 26 00 01 00 00 00      	jeq r6, 0x1, +0x26 <.text+0x4d530>
   4d520: bd 21 26 00 00 00 00 00      	jle r1, r2, +0x26 <.text+0x4d538>
   4d528: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4d538: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4d540: 62 01 00 00 6d 69 6e 74      	stw [r1 + 0x0], 0x746e696d
   4d548: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4d550: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   4d558: 7a 07 18 00 04 00 00 00      	stdw [r7 + 0x18], 0x4
   4d560: 7a 07 08 00 04 00 00 00      	stdw [r7 + 0x8], 0x4
   4d568: 05 00 58 00 00 00 00 00      	ja +0x58 <.text+0x4d710>
   4d570: 85 10 00 00 0f 6c 00 00      	call 0x6c0f ; target 0x835f0
   4d578: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   4d580: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   4d588: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   4d590: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4d598: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d5a0: 2d 53 1b 00 00 00 00 00      	jgt r3, r5, +0x1b <.text+0x4d560>
   4d5a8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d5b0: 15 04 1a 00 00 00 00 00      	jeq r4, 0x0, +0x1a <.text+0x4d568>
   4d5b8: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   4d5c8: 15 05 1b 00 00 00 00 00      	jeq r5, 0x0, +0x1b <.text+0x4d588>
   4d5d0: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   4d5d8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d5e0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d5f0: 2d 21 19 00 00 00 00 00      	jgt r1, r2, +0x19 <.text+0x4d5a0>
   4d5f8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   4d600: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   4d608: 85 10 00 00 4b ac 00 00      	call 0xac4b ; target 0xa3868
   4d610: 55 04 da ff 00 00 00 00      	jne r4, 0x0, -0x26 <.text+0x4d3c8>
   4d618: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4d620: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   4d630: 55 02 d9 ff 00 00 00 00      	jne r2, 0x0, -0x27 <.text+0x4d3e0>
   4d638: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d648: 55 06 da ff 01 00 00 00      	jne r6, 0x1, -0x26 <.text+0x4d400>
   4d650: 2d 21 da ff 00 00 00 00      	jgt r1, r2, -0x26 <.text+0x4d408>
   4d658: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4d660: b7 02 00 00 04 00 00 00      	mov64 r2, 0x4
   4d668: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   4d678: 85 10 00 00 39 ac 00 00      	call 0xac39 ; target 0xa3848
   4d680: 55 04 e6 ff 00 00 00 00      	jne r4, 0x0, -0x1a <.text+0x4d498>
   4d688: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   4d690: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   4d6a0: 55 05 e5 ff 00 00 00 00      	jne r5, 0x0, -0x1b <.text+0x4d4b0>
   4d6a8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d6b8: bd 21 e7 ff 00 00 00 00      	jle r1, r2, -0x19 <.text+0x4d4d8>
   4d6c0: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   4d6c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4d6d0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4d6d8: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   4d6e0: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   4d6e8: 85 10 00 00 d3 b9 00 00      	call 0xb9d3 ; target 0xaa588
   4d6f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4d6f8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4d700: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4d708: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4d710: 85 10 00 00 cc 6a ff ff      	call -0x9534 ; target 0x2d78
   4d718: 61 a1 b0 ff 00 00 00 00      	ldxw r1, [r10 - 0x50]
   4d720: 55 01 27 00 02 00 00 00      	jne r1, 0x2, +0x27 <.text+0x4d740>
   4d728: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   4d730: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   4d738: 85 10 00 00 d6 6b 00 00      	call 0x6bd6 ; target 0x835f0
   4d740: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   4d748: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d750: 07 01 00 00 ee ff ff ff      	add64 r1, -0x12
   4d758: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4d760: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d768: 2d 21 33 00 00 00 00 00      	jgt r1, r2, +0x33 <.text+0x4d7e8>
   4d770: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d778: 15 04 32 00 00 00 00 00      	jeq r4, 0x0, +0x32 <.text+0x4d7f0>
   4d780: 18 01 00 00 ee 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fee
   4d790: 15 02 33 00 00 00 00 00      	jeq r2, 0x0, +0x33 <.text+0x4d810>
   4d798: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   4d7a0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d7b0: 15 06 32 00 01 00 00 00      	jeq r6, 0x1, +0x32 <.text+0x4d828>
   4d7b8: bd 21 32 00 00 00 00 00      	jle r1, r2, +0x32 <.text+0x4d830>
   4d7c0: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4d7d0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4d7d8: 18 02 00 00 6f 6b 65 6e 00 00 00 00 5f 76 61 75      	lddw r2, 0x7561765f6e656b6f
   4d7e8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   4d7f0: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 74      	lddw r2, 0x745f6d656879616d
   4d800: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   4d808: 6a 01 10 00 6c 74 00 00      	sth [r1 + 0x10], 0x746c
   4d810: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4d818: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   4d820: 7a 07 18 00 12 00 00 00      	stdw [r7 + 0x18], 0x12
   4d828: 7a 07 08 00 12 00 00 00      	stdw [r7 + 0x8], 0x12
   4d830: 7a 07 00 00 01 00 00 00      	stdw [r7 + 0x0], 0x1
   4d838: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4d840: 7b 71 10 00 00 00 00 00      	stxdw [r1 + 0x10], r7
   4d848: 7b 61 08 00 00 00 00 00      	stxdw [r1 + 0x8], r6
   4d850: 7a 01 00 00 00 00 00 00      	stdw [r1 + 0x0], 0x0
   4d858: 95 00 00 00 00 00 00 00      	exit
   4d860: 85 10 00 00 b1 6b 00 00      	call 0x6bb1 ; target 0x835f0
   4d868: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   4d870: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   4d878: 07 03 00 00 28 ff ff ff      	add64 r3, -0xd8
   4d880: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4d888: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4d890: 2d 53 1c 00 00 00 00 00      	jgt r3, r5, +0x1c <.text+0x4d858>
   4d898: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4d8a0: 79 a8 90 fb 00 00 00 00      	ldxdw r8, [r10 - 0x470]
   4d8a8: 15 04 1b 00 00 00 00 00      	jeq r4, 0x0, +0x1b <.text+0x4d868>
   4d8b0: 18 01 00 00 28 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f28
   4d8c0: 15 05 1c 00 00 00 00 00      	jeq r5, 0x0, +0x1c <.text+0x4d888>
   4d8c8: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   4d8d0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4d8d8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d8e8: 2d 21 1a 00 00 00 00 00      	jgt r1, r2, +0x1a <.text+0x4d8a0>
   4d8f0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   4d8f8: b7 02 00 00 d8 00 00 00      	mov64 r2, 0xd8
   4d900: 85 10 00 00 ec ab 00 00      	call 0xabec ; target 0xa3868
   4d908: 55 04 ce ff 00 00 00 00      	jne r4, 0x0, -0x32 <.text+0x4d660>
   4d910: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4d918: 18 01 00 00 ee 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fee
   4d928: 55 02 cd ff 00 00 00 00      	jne r2, 0x0, -0x33 <.text+0x4d678>
   4d930: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d940: 55 06 ce ff 01 00 00 00      	jne r6, 0x1, -0x32 <.text+0x4d698>
   4d948: 2d 21 ce ff 00 00 00 00      	jgt r1, r2, -0x32 <.text+0x4d6a0>
   4d950: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4d958: b7 02 00 00 12 00 00 00      	mov64 r2, 0x12
   4d960: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   4d970: 85 10 00 00 da ab 00 00      	call 0xabda ; target 0xa3848
   4d978: 79 a8 90 fb 00 00 00 00      	ldxdw r8, [r10 - 0x470]
   4d980: 55 04 e5 ff 00 00 00 00      	jne r4, 0x0, -0x1b <.text+0x4d790>
   4d988: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   4d990: 18 01 00 00 28 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f28
   4d9a0: 55 05 e4 ff 00 00 00 00      	jne r5, 0x0, -0x1c <.text+0x4d7a8>
   4d9a8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   4d9b8: bd 21 e6 ff 00 00 00 00      	jle r1, r2, -0x1a <.text+0x4d7d0>
   4d9c0: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   4d9d0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4d9d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4d9e0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4d9e8: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   4d9f0: b7 03 00 00 d8 00 00 00      	mov64 r3, 0xd8
   4d9f8: 85 10 00 00 71 b9 00 00      	call 0xb971 ; target 0xaa588
   4da00: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4da08: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x4d960>
   4da10: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4da18: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   4da20: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   4da28: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   4da30: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   4da38: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   4da40: 07 04 00 00 30 00 00 00      	add64 r4, 0x30
   4da48: 7b 49 00 00 00 00 00 00      	stxdw [r9 + 0x0], r4
   4da50: 15 03 0c 00 00 00 00 00      	jeq r3, 0x0, +0xc <.text+0x4d998>
   4da58: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   4da60: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4da68: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   4da70: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4da78: 05 00 13 00 00 00 00 00      	ja +0x13 <.text+0x4d9f8>
   4da80: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4da88: 85 10 00 00 6b 99 00 00      	call 0x996b ; target 0x9a5e8
   4da90: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   4da98: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   4daa0: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   4daa8: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   4dab0: 05 00 b4 ff 00 00 00 00      	ja -0x4c <.text+0x4d738>
   4dab8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4dac0: 85 10 00 00 64 99 00 00      	call 0x9964 ; target 0x9a5e8
   4dac8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   4dad0: 15 00 08 00 02 00 00 00      	jeq r0, 0x2, +0x8 <.text+0x4d9f8>
   4dad8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4dae0: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   4dae8: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   4daf8: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   4db00: 85 10 00 00 41 6c ff ff      	call -0x93bf ; target 0x3d10
   4db08: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   4db10: 55 00 76 00 02 00 00 00      	jne r0, 0x2, +0x76 <.text+0x4dda8>
   4db18: 7b 4a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r4
   4db20: 7b 4a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r4
   4db28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4db30: 07 01 00 00 e8 fb ff ff      	add64 r1, -0x418
   4db38: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4db40: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4db48: 85 10 00 00 12 79 ff ff      	call -0x86ee ; target 0xa3e0
   4db50: 79 a2 f0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x410]
   4db58: 79 a1 e8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x418]
   4db60: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4da78>
   4db68: 18 03 00 00 f4 da 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadaf4 ; data 'system_programglobal-paramsglobal_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogra'
   4db78: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   4db80: 85 10 00 00 31 6c ff ff      	call -0x93cf ; target 0x3d10
   4db88: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4db90: 55 00 7b 01 02 00 00 00      	jne r0, 0x2, +0x17b <.text+0x4e650>
   4db98: 7b 2a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r2
   4dba0: 7b 2a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r2
   4dba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4dbb0: 07 01 00 00 00 fc ff ff      	add64 r1, -0x400
   4dbb8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4dbc0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4dbc8: 85 10 00 00 aa 64 ff ff      	call -0x9b56 ; target 0x120
   4dbd0: 79 a2 08 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f8]
   4dbd8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   4dbe0: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4daf8>
   4dbe8: 18 03 00 00 5b dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc5b ; data 'quote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotocol_fee_'
   4dbf8: b7 04 00 00 13 00 00 00      	mov64 r4, 0x13
   4dc00: 85 10 00 00 21 6c ff ff      	call -0x93df ; target 0x3d10
   4dc08: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4dc10: 55 00 6b 01 02 00 00 00      	jne r0, 0x2, +0x16b <.text+0x4e650>
   4dc18: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   4dc20: 7b 2a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r2
   4dc28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4dc30: 07 01 00 00 10 fc ff ff      	add64 r1, -0x3f0
   4dc38: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4dc40: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4dc48: 85 10 00 00 64 79 ff ff      	call -0x869c ; target 0xa770
   4dc50: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   4dc58: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   4dc60: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x4db58>
   4dc68: 7b 2a 50 fb 00 00 00 00      	stxdw [r10 - 0x4b0], r2
   4dc70: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x4db88>
   4dc78: 18 03 00 00 6e dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc6e ; data 'base_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotocol_fee_recipientprotocol_f'
   4dc88: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   4dc90: 85 10 00 00 0f 6c ff ff      	call -0x93f1 ; target 0x3d10
   4dc98: 55 00 be ff 02 00 00 00      	jne r0, 0x2, -0x42 <.text+0x4d970>
   4dca0: 7b 1a 50 fb 00 00 00 00      	stxdw [r10 - 0x4b0], r1
   4dca8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4dcb0: 07 01 00 00 28 fc ff ff      	add64 r1, -0x3d8
   4dcb8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4dcc0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4dcc8: 85 10 00 00 14 79 ff ff      	call -0x86ec ; target 0xa570
   4dcd0: 79 a2 30 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d0]
   4dcd8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   4dce0: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4dbf8>
   4dce8: 18 03 00 00 96 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb96 ; data 'associated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event'
   4dcf8: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   4dd00: 85 10 00 00 01 6c ff ff      	call -0x93ff ; target 0x3d10
   4dd08: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4dd10: 55 00 4b 01 02 00 00 00      	jne r0, 0x2, +0x14b <.text+0x4e650>
   4dd18: 7b 2a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r2
   4dd20: 7b 2a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r2
   4dd28: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4dd30: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4dd38: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4dd40: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4dd48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4dd50: 07 01 00 00 38 fc ff ff      	add64 r1, -0x3c8
   4dd58: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4dd60: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4dd68: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4dd70: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4dd78: 85 10 00 00 fc 6d ff ff      	call -0x9204 ; target 0x4d60
   4dd80: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   4dd88: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   4dd90: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x4dc88>
   4dd98: 7b 2a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r2
   4dda0: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x4dcb8>
   4dda8: 18 03 00 00 6c d0 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xad06c
   4ddb8: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   4ddc0: 85 10 00 00 e9 6b ff ff      	call -0x9417 ; target 0x3d10
   4ddc8: 55 00 98 ff 02 00 00 00      	jne r0, 0x2, -0x68 <.text+0x4d970>
   4ddd0: 7b 1a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r1
   4ddd8: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4dde0: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4dde8: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4ddf0: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4ddf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4de00: 07 01 00 00 48 fc ff ff      	add64 r1, -0x3b8
   4de08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4de10: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4de18: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4de20: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4de28: 85 10 00 00 7c 6d ff ff      	call -0x9284 ; target 0x4a10
   4de30: 79 a2 50 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b0]
   4de38: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   4de40: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4dd58>
   4de48: 18 03 00 00 80 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc80 ; data 'global_configpool_base_token_accountpool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token'
   4de58: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   4de60: 85 10 00 00 d5 6b ff ff      	call -0x942b ; target 0x3d10
   4de68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4de70: 55 00 1f 01 02 00 00 00      	jne r0, 0x2, +0x11f <.text+0x4e650>
   4de78: 7b 2a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r2
   4de80: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4de88: 15 01 0a 00 00 00 00 00      	jeq r1, 0x0, +0xa <.text+0x4ddc0>
   4de90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4de98: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4dea0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4dea8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   4deb0: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   4deb8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4dec0: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x4de18>
   4dec8: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4ded0: 7b 41 10 00 00 00 00 00      	stxdw [r1 + 0x10], r4
   4ded8: 05 00 14 01 00 00 00 00      	ja +0x114 <.text+0x4e660>
   4dee0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4dee8: 85 10 00 00 df 98 00 00      	call 0x98df ; target 0x9a5e8
   4def0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4def8: 15 00 07 00 02 00 00 00      	jeq r0, 0x2, +0x7 <.text+0x4de18>
   4df00: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4df08: 18 03 00 00 6c db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb6c ; data 'quote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_token_vaul'
   4df18: b7 04 00 00 0a 00 00 00      	mov64 r4, 0xa
   4df20: 85 10 00 00 bd 6b ff ff      	call -0x9443 ; target 0x3d10
   4df28: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4df30: 55 00 07 01 02 00 00 00      	jne r0, 0x2, +0x107 <.text+0x4e650>
   4df38: 7b 2a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r2
   4df40: 7b 2a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r2
   4df48: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4df50: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4df58: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4df60: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4df68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4df70: 07 01 00 00 60 fc ff ff      	add64 r1, -0x3a0
   4df78: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4df80: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4df88: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4df90: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4df98: 85 10 00 00 22 6e ff ff      	call -0x91de ; target 0x50b0
   4dfa0: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   4dfa8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   4dfb0: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x4dea8>
   4dfb8: 7b 2a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r2
   4dfc0: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x4ded8>
   4dfc8: 18 03 00 00 8d dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc8d ; data 'pool_base_token_accountpool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_'
   4dfd8: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   4dfe0: 85 10 00 00 a5 6b ff ff      	call -0x945b ; target 0x3d10
   4dfe8: 55 00 54 ff 02 00 00 00      	jne r0, 0x2, -0xac <.text+0x4d970>
   4dff0: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   4dff8: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4e000: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4e008: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4e010: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4e018: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e020: 07 01 00 00 70 fc ff ff      	add64 r1, -0x390
   4e028: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4e030: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4e038: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4e040: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4e048: 85 10 00 00 0c 6e ff ff      	call -0x91f4 ; target 0x50b0
   4e050: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   4e058: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   4e060: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4df78>
   4e068: 18 03 00 00 a4 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadca4 ; data 'pool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_swap_event_authoritypum'
   4e078: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   4e080: 85 10 00 00 91 6b ff ff      	call -0x946f ; target 0x3d10
   4e088: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e090: 55 00 db 00 02 00 00 00      	jne r0, 0x2, +0xdb <.text+0x4e650>
   4e098: 7b 2a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r2
   4e0a0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e0a8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x4dfc8>
   4e0b0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e0b8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e0c0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4e0c8: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   4e0d0: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   4e0d8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4e0e0: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x4e030>
   4e0e8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e0f0: 85 10 00 00 9e 98 00 00      	call 0x989e ; target 0x9a5e8
   4e0f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e100: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x4dff8>
   4e108: 7b 2a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r2
   4e110: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x4e030>
   4e118: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e120: 18 03 00 00 bc dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcbc ; data 'protocol_fee_recipientprotocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creat'
   4e130: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   4e138: 85 10 00 00 7a 6b ff ff      	call -0x9486 ; target 0x3d10
   4e140: 55 00 29 ff 02 00 00 00      	jne r0, 0x2, -0xd7 <.text+0x4d970>
   4e148: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   4e150: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4e158: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4e160: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4e168: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4e170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e178: 07 01 00 00 80 fc ff ff      	add64 r1, -0x380
   4e180: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4e188: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4e190: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4e198: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4e1a0: 85 10 00 00 e1 6d ff ff      	call -0x921f ; target 0x50b0
   4e1a8: 79 a2 88 fc 00 00 00 00      	ldxdw r2, [r10 - 0x378]
   4e1b0: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   4e1b8: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4e0d0>
   4e1c0: 18 03 00 00 d2 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcd2 ; data 'protocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creat'
   4e1d0: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   4e1d8: 85 10 00 00 66 6b ff ff      	call -0x949a ; target 0x3d10
   4e1e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e1e8: 55 00 b0 00 02 00 00 00      	jne r0, 0x2, +0xb0 <.text+0x4e650>
   4e1f0: 7b 2a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r2
   4e1f8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e200: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x4e158>
   4e208: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4e210: 7b 2a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r2
   4e218: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e220: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e228: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e230: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e238: 15 01 0c 00 00 00 00 00      	jeq r1, 0x0, +0xc <.text+0x4e180>
   4e240: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e248: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e250: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4e258: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   4e260: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   4e268: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4e270: 05 00 12 00 00 00 00 00      	ja +0x12 <.text+0x4e1e8>
   4e278: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e280: 85 10 00 00 6c 98 00 00      	call 0x986c ; target 0x9a5e8
   4e288: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e290: 55 00 3d 00 02 00 00 00      	jne r0, 0x2, +0x3d <.text+0x4e360>
   4e298: 7b 2a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r2
   4e2a0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e2a8: 85 10 00 00 67 98 00 00      	call 0x9867 ; target 0x9a5e8
   4e2b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e2b8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x4e1b0>
   4e2c0: 7b 2a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r2
   4e2c8: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x4e1e8>
   4e2d0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e2d8: 18 03 00 00 0f dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd0f ; data 'pump_swap_programcoin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumu'
   4e2e8: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   4e2f0: 85 10 00 00 43 6b ff ff      	call -0x94bd ; target 0x3d10
   4e2f8: 55 00 f2 fe 02 00 00 00      	jne r0, 0x2, -0x10e <.text+0x4d970>
   4e300: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   4e308: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   4e310: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   4e318: 7b 8a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r8
   4e320: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   4e328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e330: 07 01 00 00 90 fc ff ff      	add64 r1, -0x370
   4e338: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4e340: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   4e348: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4e350: 79 a4 a0 fb 00 00 00 00      	ldxdw r4, [r10 - 0x460]
   4e358: 85 10 00 00 aa 6d ff ff      	call -0x9256 ; target 0x50b0
   4e360: 79 a7 98 fc 00 00 00 00      	ldxdw r7, [r10 - 0x368]
   4e368: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4e370: 15 01 07 00 02 00 00 00      	jeq r1, 0x2, +0x7 <.text+0x4e290>
   4e378: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   4e380: 18 03 00 00 20 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd20 ; data 'coin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumulatorfee_configfe'
   4e390: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   4e398: 85 10 00 00 2e 6b ff ff      	call -0x94d2 ; target 0x3d10
   4e3a0: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   4e3a8: 55 00 a2 00 02 00 00 00      	jne r0, 0x2, +0xa2 <.text+0x4e7a0>
   4e3b0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e3b8: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x4e310>
   4e3c0: 79 98 00 00 00 00 00 00      	ldxdw r8, [r9 + 0x0]
   4e3c8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4e3d0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e3d8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e3e0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e3e8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e3f0: 15 01 0b 00 00 00 00 00      	jeq r1, 0x0, +0xb <.text+0x4e330>
   4e3f8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4e400: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   4e408: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e410: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e418: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e420: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e428: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x4e3f0>
   4e430: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e438: 85 10 00 00 35 98 00 00      	call 0x9835 ; target 0x9a5e8
   4e440: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   4e448: 55 00 68 00 02 00 00 00      	jne r0, 0x2, +0x68 <.text+0x4e670>
   4e450: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e458: 85 10 00 00 31 98 00 00      	call 0x9831 ; target 0x9a5e8
   4e460: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e468: 55 00 0c 00 02 00 00 00      	jne r0, 0x2, +0xc <.text+0x4e3b0>
   4e470: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   4e478: 05 00 1a 00 00 00 00 00      	ja +0x1a <.text+0x4e430>
   4e480: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e488: 18 03 00 00 f6 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcf6 ; data 'pump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accu'
   4e498: b7 04 00 00 19 00 00 00      	mov64 r4, 0x19
   4e4a0: 85 10 00 00 0d 6b ff ff      	call -0x94f3 ; target 0x3d10
   4e4a8: 55 00 bc fe 02 00 00 00      	jne r0, 0x2, -0x144 <.text+0x4d970>
   4e4b0: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   4e4b8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e4c0: 55 01 af ff 00 00 00 00      	jne r1, 0x0, -0x51 <.text+0x4e120>
   4e4c8: 05 00 ba ff 00 00 00 00      	ja -0x46 <.text+0x4e180>
   4e4d0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e4d8: 18 03 00 00 82 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd82 ; data 'fee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_'
   4e4e8: b7 04 00 00 0a 00 00 00      	mov64 r4, 0xa
   4e4f0: 85 10 00 00 03 6b ff ff      	call -0x94fd ; target 0x3d10
   4e4f8: 55 00 b2 fe 02 00 00 00      	jne r0, 0x2, -0x14e <.text+0x4d970>
   4e500: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   4e508: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e510: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x4e430>
   4e518: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4e520: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   4e528: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e530: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e538: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e540: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e548: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x4e4a0>
   4e550: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e558: 85 10 00 00 11 98 00 00      	call 0x9811 ; target 0x9a5e8
   4e560: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e568: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x4e460>
   4e570: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   4e578: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x4e4e0>
   4e580: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e588: 18 03 00 00 8c dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd8c ; data 'fee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreat'
   4e598: b7 04 00 00 0b 00 00 00      	mov64 r4, 0xb
   4e5a0: 85 10 00 00 ed 6a ff ff      	call -0x9513 ; target 0x3d10
   4e5a8: 55 00 9c fe 02 00 00 00      	jne r0, 0x2, -0x164 <.text+0x4d970>
   4e5b0: 7b 1a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r1
   4e5b8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e5c0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x4e4e0>
   4e5c8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e5d0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e5d8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4e5e0: 7b 1a f8 fa 00 00 00 00      	stxdw [r10 - 0x508], r1
   4e5e8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   4e5f0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4e5f8: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x4e548>
   4e600: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e608: 85 10 00 00 fb 97 00 00      	call 0x97fb ; target 0x9a5e8
   4e610: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e618: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x4e510>
   4e620: 7b 2a f8 fa 00 00 00 00      	stxdw [r10 - 0x508], r2
   4e628: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x4e548>
   4e630: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e638: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   4e648: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   4e650: 85 10 00 00 d7 6a ff ff      	call -0x9529 ; target 0x3d10
   4e658: 55 00 86 fe 02 00 00 00      	jne r0, 0x2, -0x17a <.text+0x4d970>
   4e660: 7b 1a f8 fa 00 00 00 00      	stxdw [r10 - 0x508], r1
   4e668: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e670: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   4e678: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4e680: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   4e688: 85 10 00 00 5c 78 ff ff      	call -0x87a4 ; target 0xa970
   4e690: 79 a2 a8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x358]
   4e698: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   4e6a0: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x4e5b8>
   4e6a8: 18 03 00 00 5c db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb5c ; data 'programsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statem'
   4e6b8: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   4e6c0: 85 10 00 00 c9 6a ff ff      	call -0x9537 ; target 0x3d10
   4e6c8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e6d0: 55 00 13 00 02 00 00 00      	jne r0, 0x2, +0x13 <.text+0x4e650>
   4e6d8: 7b 2a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r2
   4e6e0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e6e8: 7b 7a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r7
   4e6f0: 7b 8a f0 fa 00 00 00 00      	stxdw [r10 - 0x510], r8
   4e6f8: 15 01 1d 00 00 00 00 00      	jeq r1, 0x0, +0x1d <.text+0x4e6c8>
   4e700: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4e708: 7b 2a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r2
   4e710: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e718: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e720: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e728: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e730: 15 01 1b 00 00 00 00 00      	jeq r1, 0x0, +0x1b <.text+0x4e6f0>
   4e738: 79 97 00 00 00 00 00 00      	ldxdw r7, [r9 + 0x0]
   4e740: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   4e748: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   4e750: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4e758: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e760: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e768: 05 00 22 00 00 00 00 00      	ja +0x22 <.text+0x4e760>
   4e770: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4e778: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   4e780: 7b 01 08 00 00 00 00 00      	stxdw [r1 + 0x8], r0
   4e788: 05 00 18 fe 00 00 00 00      	ja -0x1e8 <.text+0x4d730>
   4e790: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e798: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4e7a0: 18 03 00 00 36 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd36 ; data 'coin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumulatorfee_configfee_programpool_v2buybac'
   4e7b0: b7 04 00 00 1c 00 00 00      	mov64 r4, 0x1c
   4e7b8: 85 10 00 00 aa 6a ff ff      	call -0x9556 ; target 0x3d10
   4e7c0: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   4e7c8: 55 00 82 00 02 00 00 00      	jne r0, 0x2, +0x82 <.text+0x4eac0>
   4e7d0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e7d8: 55 01 83 ff 00 00 00 00      	jne r1, 0x0, -0x7d <.text+0x4e2d8>
   4e7e0: 05 00 8d ff 00 00 00 00      	ja -0x73 <.text+0x4e330>
   4e7e8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e7f0: 85 10 00 00 be 97 00 00      	call 0x97be ; target 0x9a5e8
   4e7f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4e800: 55 00 7e 00 02 00 00 00      	jne r0, 0x2, +0x7e <.text+0x4ead8>
   4e808: 7b 2a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r2
   4e810: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e818: 85 10 00 00 b9 97 00 00      	call 0x97b9 ; target 0x9a5e8
   4e820: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   4e828: 15 00 15 00 02 00 00 00      	jeq r0, 0x2, +0x15 <.text+0x4e7b8>
   4e830: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e838: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   4e840: 18 03 00 00 9e dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd9e ; data 'buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_bas'
   4e850: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   4e858: 85 10 00 00 96 6a ff ff      	call -0x956a ; target 0x3d10
   4e860: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   4e868: 55 00 0a 00 02 00 00 00      	jne r0, 0x2, +0xa <.text+0x4e7a0>
   4e870: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4e878: 79 a8 f0 fa 00 00 00 00      	ldxdw r8, [r10 - 0x510]
   4e880: 15 01 0a 00 00 00 00 00      	jeq r1, 0x0, +0xa <.text+0x4e7b8>
   4e888: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4e890: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   4e898: 79 98 00 00 00 00 00 00      	ldxdw r8, [r9 + 0x0]
   4e8a0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4e8a8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   4e8b0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4e8b8: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x4e818>
   4e8c0: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4e8c8: 7b 71 10 00 00 00 00 00      	stxdw [r1 + 0x10], r7
   4e8d0: 05 00 d5 ff 00 00 00 00      	ja -0x2b <.text+0x4e660>
   4e8d8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   4e8e0: 85 10 00 00 a0 97 00 00      	call 0x97a0 ; target 0x9a5e8
   4e8e8: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   4e8f0: 15 00 08 00 02 00 00 00      	jeq r0, 0x2, +0x8 <.text+0x4e818>
   4e8f8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4e900: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4e908: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   4e918: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   4e920: 85 10 00 00 7d 6a ff ff      	call -0x9583 ; target 0x3d10
   4e928: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   4e930: 55 00 55 00 02 00 00 00      	jne r0, 0x2, +0x55 <.text+0x4eac0>
   4e938: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e940: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4e948: 85 10 00 00 ea a0 00 00      	call 0xa0ea ; target 0x9f0a0
   4e950: 61 a1 00 ff 00 00 00 00      	ldxw r1, [r10 - 0x100]
   4e958: 55 01 04 00 01 00 00 00      	jne r1, 0x1, +0x4 <.text+0x4e860>
   4e960: 61 a2 08 ff 00 00 00 00      	ldxw r2, [r10 - 0xf8]
   4e968: 61 a1 04 ff 00 00 00 00      	ldxw r1, [r10 - 0xfc]
   4e970: 85 10 00 00 f7 91 00 00      	call 0x91f7 ; target 0x97930
   4e978: 05 00 22 fe 00 00 00 00      	ja -0x1de <.text+0x4d970>
   4e980: 7b 8a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r8
   4e988: 7b 7a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r7
   4e990: 79 a1 0c ff 00 00 00 00      	ldxdw r1, [r10 - 0xf4]
   4e998: 7b 1a b4 fc 00 00 00 00      	stxdw [r10 - 0x34c], r1
   4e9a0: 79 a1 14 ff 00 00 00 00      	ldxdw r1, [r10 - 0xec]
   4e9a8: 7b 1a bc fc 00 00 00 00      	stxdw [r10 - 0x344], r1
   4e9b0: 61 a1 1c ff 00 00 00 00      	ldxw r1, [r10 - 0xe4]
   4e9b8: 63 1a c4 fc 00 00 00 00      	stxw [r10 - 0x33c], r1
   4e9c0: 61 a1 08 ff 00 00 00 00      	ldxw r1, [r10 - 0xf8]
   4e9c8: 63 1a b0 fc 00 00 00 00      	stxw [r10 - 0x350], r1
   4e9d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e9d8: 07 01 00 00 f8 fb ff ff      	add64 r1, -0x408
   4e9e0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   4e9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e9f0: 07 01 00 00 e0 fb ff ff      	add64 r1, -0x420
   4e9f8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   4ea00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea08: 07 01 00 00 58 fc ff ff      	add64 r1, -0x3a8
   4ea10: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   4ea18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea20: 07 01 00 00 d8 fb ff ff      	add64 r1, -0x428
   4ea28: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   4ea30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea38: 07 01 00 00 b8 fb ff ff      	add64 r1, -0x448
   4ea40: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   4ea48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea50: 07 01 00 00 20 fc ff ff      	add64 r1, -0x3e0
   4ea58: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   4ea60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea68: 07 01 00 00 d0 fb ff ff      	add64 r1, -0x430
   4ea70: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   4ea78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ea80: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4ea88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ea90: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4ea98: 85 10 00 00 82 f8 ff ff      	call -0x77e ; target 0x4aeb0
   4eaa0: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   4eaa8: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   4eab0: 55 01 33 00 02 00 00 00      	jne r1, 0x2, +0x33 <.text+0x4eb30>
   4eab8: 7b 3a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r3
   4eac0: 79 32 20 00 00 00 00 00      	ldxdw r2, [r3 + 0x20]
   4eac8: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   4ead0: 15 01 37 00 00 00 00 00      	jeq r1, 0x0, +0x37 <.text+0x4eb70>
   4ead8: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   4eae0: 07 08 00 00 c8 fc ff ff      	add64 r8, -0x338
   4eae8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4eaf0: 85 10 00 00 53 75 ff ff      	call -0x8aad ; target 0x9590
   4eaf8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4eb00: 85 10 00 00 1e a3 00 00      	call 0xa31e ; target 0xa03f8
   4eb08: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   4eb10: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   4eb18: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
   4eb20: bf a9 00 00 00 00 00 00      	mov64 r9, r10
   4eb28: 07 09 00 00 00 ff ff ff      	add64 r9, -0x100
   4eb30: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   4eb38: 85 10 00 00 4a 75 ff ff      	call -0x8ab6 ; target 0x9590
   4eb40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4eb48: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   4eb50: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   4eb58: 85 10 00 00 2c a3 00 00      	call 0xa32c ; target 0xa04c0
   4eb60: 61 a1 d8 fe 00 00 00 00      	ldxw r1, [r10 - 0x128]
   4eb68: 55 01 2d 00 01 00 00 00      	jne r1, 0x1, +0x2d <.text+0x4ebb8>
   4eb70: 61 a2 e0 fe 00 00 00 00      	ldxw r2, [r10 - 0x120]
   4eb78: 61 a1 dc fe 00 00 00 00      	ldxw r1, [r10 - 0x124]
   4eb80: 85 10 00 00 b5 91 00 00      	call 0x91b5 ; target 0x97930
   4eb88: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   4eb90: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   4eb98: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   4eba0: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   4eba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ebb0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4ebb8: 85 10 00 00 64 72 ff ff      	call -0x8d9c ; target 0x7ee0
   4ebc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ebc8: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4ebd0: 85 10 00 00 61 72 ff ff      	call -0x8d9f ; target 0x7ee0
   4ebd8: 05 00 8f fd 00 00 00 00      	ja -0x271 <.text+0x4d738>
   4ebe0: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4ebe8: 7b 81 10 00 00 00 00 00      	stxdw [r1 + 0x10], r8
   4ebf0: 05 00 71 ff 00 00 00 00      	ja -0x8f <.text+0x4e660>
   4ebf8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4ec00: 18 03 00 00 97 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd97 ; data 'pool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmay'
   4ec10: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   4ec18: 85 10 00 00 1e 6a ff ff      	call -0x95e2 ; target 0x3d10
   4ec20: 7b 1a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r1
   4ec28: 55 00 09 00 02 00 00 00      	jne r0, 0x2, +0x9 <.text+0x4eb58>
   4ec30: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4ec38: 79 a8 f0 fa 00 00 00 00      	ldxdw r8, [r10 - 0x510]
   4ec40: 55 01 5e ff 00 00 00 00      	jne r1, 0x0, -0xa2 <.text+0x4e618>
   4ec48: 05 00 78 ff 00 00 00 00      	ja -0x88 <.text+0x4e6f0>
   4ec50: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   4ec58: 7b 32 10 00 00 00 00 00      	stxdw [r2 + 0x10], r3
   4ec60: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   4ec68: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   4ec70: 05 00 7c fd 00 00 00 00      	ja -0x284 <.text+0x4d738>
   4ec78: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   4ec80: 79 a2 e8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x518]
   4ec88: 05 00 5d ff 00 00 00 00      	ja -0xa3 <.text+0x4e658>
   4ec90: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   4ec98: 85 10 00 00 29 97 00 00      	call 0x9729 ; target 0x9a5e8
   4eca0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4eca8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4ecb0: 18 03 00 00 c4 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddc4 ; data 'mayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayhem_quote_token_vaulta'
   4ecc0: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   4ecc8: 85 10 00 00 08 6a ff ff      	call -0x95f8 ; target 0x3d10
   4ecd0: 05 00 b7 fd 00 00 00 00      	ja -0x249 <.text+0x4d970>
   4ecd8: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   4ece0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ece8: 07 01 00 00 b0 fc ff ff      	add64 r1, -0x350
   4ecf0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4ecf8: 85 10 00 00 b9 a0 00 00      	call 0xa0b9 ; target 0x9f2c8
   4ed00: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   4ed08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ed10: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4ed18: 85 10 00 00 38 72 ff ff      	call -0x8dc8 ; target 0x7ee0
   4ed20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ed28: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4ed30: 85 10 00 00 35 72 ff ff      	call -0x8dcb ; target 0x7ee0
   4ed38: 15 08 2b 00 00 00 00 00      	jeq r8, 0x0, +0x2b <.text+0x4ed78>
   4ed40: 18 01 00 00 40 13 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1340
   4ed50: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4ed58: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   4ed60: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4ed68: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   4ed70: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4ed78: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   4ed80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ed88: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   4ed90: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   4ed98: 7a 0a 28 ff 00 00 00 00      	stdw [r10 - 0xd8], 0x0
   4eda0: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   4eda8: 07 08 00 00 c8 fc ff ff      	add64 r8, -0x338
   4edb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4edb8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   4edc0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4edc8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   4edd0: 85 10 00 00 f6 b6 00 00      	call 0xb6f6 ; target 0xaa588
   4edd8: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   4ede0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ede8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4edf0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4edf8: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   4ee00: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4ee08: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   4ee10: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4ee18: 7b 2a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r2
   4ee20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ee28: 7b 1a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r1
   4ee30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ee38: 07 02 00 00 f8 fc ff ff      	add64 r2, -0x308
   4ee40: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4ee48: 85 10 00 00 a4 77 ff ff      	call -0x885c ; target 0xab70
   4ee50: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x4ed88>
   4ee58: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4ee60: 85 10 00 00 f0 96 00 00      	call 0x96f0 ; target 0x9a5e8
   4ee68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4ee70: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4ee78: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   4ee88: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   4ee90: 05 00 b0 00 00 00 00 00      	ja +0xb0 <.text+0x4f2f8>
   4ee98: b7 01 00 00 d5 07 00 00      	mov64 r1, 0x7d5
   4eea0: 05 00 be ff 00 00 00 00      	ja -0x42 <.text+0x4eb78>
   4eea8: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   4eeb0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4eeb8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4eec0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4eec8: 7b 2a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r2
   4eed0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4eed8: 7b 2a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r2
   4eee0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4eee8: 7b 2a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r2
   4eef0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4eef8: 7b 1a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r1
   4ef00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ef08: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4ef10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ef18: 07 02 00 00 18 fd ff ff      	add64 r2, -0x2e8
   4ef20: 85 10 00 00 89 77 ff ff      	call -0x8877 ; target 0xab70
   4ef28: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4ee50>
   4ef30: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4ef38: 85 10 00 00 d5 96 00 00      	call 0x96d5 ; target 0x9a5e8
   4ef40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4ef48: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4ef50: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   4ef60: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   4ef68: 05 00 95 00 00 00 00 00      	ja +0x95 <.text+0x4f2f8>
   4ef70: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   4ef78: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4ef80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ef88: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4ef90: 7b 2a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r2
   4ef98: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4efa0: 7b 2a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r2
   4efa8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4efb0: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   4efb8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4efc0: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   4efc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4efd0: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4efd8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4efe0: 07 02 00 00 38 fd ff ff      	add64 r2, -0x2c8
   4efe8: 85 10 00 00 70 77 ff ff      	call -0x8890 ; target 0xab70
   4eff0: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4ef18>
   4eff8: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f000: 85 10 00 00 bc 96 00 00      	call 0x96bc ; target 0x9a5e8
   4f008: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f010: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f018: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   4f028: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   4f030: 05 00 7c 00 00 00 00 00      	ja +0x7c <.text+0x4f2f8>
   4f038: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   4f040: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4f048: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f050: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f058: 7b 2a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r2
   4f060: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f068: 7b 2a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r2
   4f070: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f078: 7b 2a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r2
   4f080: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f088: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   4f090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f098: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f0a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f0a8: 07 02 00 00 58 fd ff ff      	add64 r2, -0x2a8
   4f0b0: 85 10 00 00 57 77 ff ff      	call -0x88a9 ; target 0xab70
   4f0b8: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4efe0>
   4f0c0: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f0c8: 85 10 00 00 a3 96 00 00      	call 0x96a3 ; target 0x9a5e8
   4f0d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f0d8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f0e0: 18 03 00 00 c4 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddc4 ; data 'mayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayhem_quote_token_vaulta'
   4f0f0: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   4f0f8: 05 00 63 00 00 00 00 00      	ja +0x63 <.text+0x4f2f8>
   4f100: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   4f108: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f110: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f118: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f120: 7b 2a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r2
   4f128: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f130: 7b 2a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r2
   4f138: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f140: 7b 2a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r2
   4f148: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f150: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   4f158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f160: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f168: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f170: 07 02 00 00 78 fd ff ff      	add64 r2, -0x288
   4f178: 85 10 00 00 3e 77 ff ff      	call -0x88c2 ; target 0xab70
   4f180: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4f0a8>
   4f188: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f190: 85 10 00 00 8a 96 00 00      	call 0x968a ; target 0x9a5e8
   4f198: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f1a0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f1a8: 18 03 00 00 6c d0 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xad06c
   4f1b8: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   4f1c0: 05 00 4a 00 00 00 00 00      	ja +0x4a <.text+0x4f2f8>
   4f1c8: 79 a1 28 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d8]
   4f1d0: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4f1d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f1e0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f1e8: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   4f1f0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f1f8: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   4f200: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f208: 7b 2a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r2
   4f210: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f218: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   4f220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f228: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f230: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f238: 07 02 00 00 98 fd ff ff      	add64 r2, -0x268
   4f240: 85 10 00 00 25 77 ff ff      	call -0x88db ; target 0xab70
   4f248: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4f170>
   4f250: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f258: 85 10 00 00 71 96 00 00      	call 0x9671 ; target 0x9a5e8
   4f260: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f268: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f270: 18 03 00 00 8d dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc8d ; data 'pool_base_token_accountpool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_'
   4f280: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   4f288: 05 00 31 00 00 00 00 00      	ja +0x31 <.text+0x4f2f8>
   4f290: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   4f298: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4f2a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f2a8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f2b0: 7b 2a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r2
   4f2b8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f2c0: 7b 2a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r2
   4f2c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f2d0: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   4f2d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f2e0: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   4f2e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f2f0: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f2f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f300: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   4f308: 85 10 00 00 0c 77 ff ff      	call -0x88f4 ; target 0xab70
   4f310: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x4f238>
   4f318: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f320: 85 10 00 00 58 96 00 00      	call 0x9658 ; target 0x9a5e8
   4f328: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f330: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f338: 18 03 00 00 a4 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadca4 ; data 'pool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_swap_event_authoritypum'
   4f348: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   4f350: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x4f2f8>
   4f358: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   4f360: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4f368: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f370: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f378: 7b 2a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r2
   4f380: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f388: 7b 2a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r2
   4f390: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f398: 7b 2a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r2
   4f3a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f3a8: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   4f3b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f3b8: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f3c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f3c8: 07 02 00 00 d8 fd ff ff      	add64 r2, -0x228
   4f3d0: 85 10 00 00 f3 76 ff ff      	call -0x890d ; target 0xab70
   4f3d8: 15 00 0d 00 00 00 00 00      	jeq r0, 0x0, +0xd <.text+0x4f328>
   4f3e0: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f3e8: 85 10 00 00 3f 96 00 00      	call 0x963f ; target 0x9a5e8
   4f3f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f3f8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f400: 18 03 00 00 d2 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcd2 ; data 'protocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creat'
   4f410: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   4f418: 85 10 00 00 1e 69 ff ff      	call -0x96e2 ; target 0x3d10
   4f420: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   4f428: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   4f430: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   4f438: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   4f440: 05 00 82 fc 00 00 00 00      	ja -0x37e <.text+0x4d738>
   4f448: 79 a1 e0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x520]
   4f450: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4f458: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f460: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f468: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   4f470: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f478: 7b 2a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r2
   4f480: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f488: 7b 2a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r2
   4f490: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f498: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   4f4a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f4a8: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4f4b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4f4b8: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   4f4c0: 85 10 00 00 d5 76 ff ff      	call -0x892b ; target 0xab70
   4f4c8: 15 00 09 00 00 00 00 00      	jeq r0, 0x0, +0x9 <.text+0x4f3f8>
   4f4d0: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   4f4d8: 85 10 00 00 21 96 00 00      	call 0x9621 ; target 0x9a5e8
   4f4e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   4f4e8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   4f4f0: 18 03 00 00 20 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd20 ; data 'coin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumulatorfee_configfe'
   4f500: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   4f508: 85 10 00 00 00 69 ff ff      	call -0x9700 ; target 0x3d10
   4f510: 05 00 af fc 00 00 00 00      	ja -0x351 <.text+0x4d970>
   4f518: 71 61 29 00 00 00 00 00      	ldxb r1, [r6 + 0x29]
   4f520: 15 01 66 02 00 00 00 00      	jeq r1, 0x0, +0x266 <.text+0x50738>
   4f528: 72 0a c8 fc ff 00 00 00      	stb [r10 - 0x338], 0xff
   4f530: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4f538: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   4f540: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4f548: 07 05 00 00 c8 fc ff ff      	add64 r5, -0x338
   4f550: 18 01 00 00 50 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1950
   4f560: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4f568: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   4f570: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   4f578: 55 00 d1 02 00 00 00 00      	jne r0, 0x0, +0x2d1 <.text+0x50ae8>
   4f580: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   4f588: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   4f590: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   4f598: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   4f5a0: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   4f5a8: 71 a1 c8 fc 00 00 00 00      	ldxb r1, [r10 - 0x338]
   4f5b0: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   4f5b8: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   4f5c0: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   4f5c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f5d0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4f5d8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   4f5e0: 5d 73 57 02 00 00 00 00      	jne r3, r7, +0x257 <.text+0x50780>
   4f5e8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   4f5f0: 5d 93 55 02 00 00 00 00      	jne r3, r9, +0x255 <.text+0x50780>
   4f5f8: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   4f600: 5d 83 53 02 00 00 00 00      	jne r3, r8, +0x253 <.text+0x50780>
   4f608: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   4f610: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   4f618: 5d 32 50 02 00 00 00 00      	jne r2, r3, +0x250 <.text+0x50780>
   4f620: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4f628: 15 01 6c 02 00 00 00 00      	jeq r1, 0x0, +0x26c <.text+0x50870>
   4f630: 79 a2 88 fb 00 00 00 00      	ldxdw r2, [r10 - 0x478]
   4f638: 79 21 40 00 00 00 00 00      	ldxdw r1, [r2 + 0x40]
   4f640: 7b 1a a8 fa 00 00 00 00      	stxdw [r10 - 0x558], r1
   4f648: 79 21 38 00 00 00 00 00      	ldxdw r1, [r2 + 0x38]
   4f650: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   4f658: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   4f660: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   4f668: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4f670: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   4f678: 7b 3a a0 fa 00 00 00 00      	stxdw [r10 - 0x560], r3
   4f680: 79 17 10 00 00 00 00 00      	ldxdw r7, [r1 + 0x10]
   4f688: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   4f690: 79 22 28 00 00 00 00 00      	ldxdw r2, [r2 + 0x28]
   4f698: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   4f6a0: 7b 2a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r2
   4f6a8: 5d 92 65 02 00 00 00 00      	jne r2, r9, +0x265 <.text+0x508b8>
   4f6b0: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   4f6b8: 5d 81 63 02 00 00 00 00      	jne r1, r8, +0x263 <.text+0x508b8>
   4f6c0: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   4f6c8: 5d 71 61 02 00 00 00 00      	jne r1, r7, +0x261 <.text+0x508b8>
   4f6d0: 79 a1 a8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x558]
   4f6d8: 79 a2 a0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x560]
   4f6e0: 5d 21 5e 02 00 00 00 00      	jne r1, r2, +0x25e <.text+0x508b8>
   4f6e8: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   4f6f0: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   4f6f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f700: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4f708: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   4f710: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   4f718: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4f720: 18 05 00 00 0e dc 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xadc0e ; data 'mayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_pro'
   4f730: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   4f738: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4f740: 07 05 00 00 c8 fc ff ff      	add64 r5, -0x338
   4f748: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   4f750: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   4f758: 7b 4a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r4
   4f760: 7b 3a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r3
   4f768: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   4f770: 7a 0a e0 fe 0c 00 00 00      	stdw [r10 - 0x120], 0xc
   4f778: 7a 0a f0 fe 20 00 00 00      	stdw [r10 - 0x110], 0x20
   4f780: 72 0a ff fe ff 00 00 00      	stb [r10 - 0x101], 0xff
   4f788: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f790: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   4f798: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4f7a0: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   4f7a8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4f7b0: 07 05 00 00 ff fe ff ff      	add64 r5, -0x101
   4f7b8: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   4f7c0: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   4f7c8: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   4f7d0: 55 00 86 02 00 00 00 00      	jne r0, 0x0, +0x286 <.text+0x50ae8>
   4f7d8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   4f7e0: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   4f7e8: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   4f7f0: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   4f7f8: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   4f800: 71 a1 ff fe 00 00 00 00      	ldxb r1, [r10 - 0x101]
   4f808: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   4f810: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   4f818: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   4f820: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f828: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4f830: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   4f838: 5d 73 4a 02 00 00 00 00      	jne r3, r7, +0x24a <.text+0x50970>
   4f840: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   4f848: 5d 93 48 02 00 00 00 00      	jne r3, r9, +0x248 <.text+0x50970>
   4f850: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   4f858: 5d 83 46 02 00 00 00 00      	jne r3, r8, +0x246 <.text+0x50970>
   4f860: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   4f868: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   4f870: 5d 32 43 02 00 00 00 00      	jne r2, r3, +0x243 <.text+0x50970>
   4f878: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4f880: 15 01 4c 02 00 00 00 00      	jeq r1, 0x0, +0x24c <.text+0x509c8>
   4f888: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   4f890: 79 17 20 00 00 00 00 00      	ldxdw r7, [r1 + 0x20]
   4f898: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   4f8a0: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   4f8a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f8b0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4f8b8: 85 10 00 00 9a 73 ff ff      	call -0x8c66 ; target 0x9590
   4f8c0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   4f8c8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   4f8d0: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   4f8d8: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   4f8e0: 5d 34 49 02 00 00 00 00      	jne r4, r3, +0x249 <.text+0x50a10>
   4f8e8: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   4f8f0: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   4f8f8: 5d 34 46 02 00 00 00 00      	jne r4, r3, +0x246 <.text+0x50a10>
   4f900: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   4f908: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   4f910: 5d 34 43 02 00 00 00 00      	jne r4, r3, +0x243 <.text+0x50a10>
   4f918: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4f920: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   4f928: 5d 12 40 02 00 00 00 00      	jne r2, r1, +0x240 <.text+0x50a10>
   4f930: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4f938: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   4f940: 85 10 00 00 b3 70 ff ff      	call -0x8f4d ; target 0x7ee0
   4f948: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   4f950: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   4f958: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   4f960: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   4f968: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   4f970: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   4f978: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   4f980: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f988: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4f990: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   4f998: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4f9a0: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   4f9a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4f9b0: 7b 2a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r2
   4f9b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4f9c0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4f9c8: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   4f9d0: 5d 17 30 02 00 00 00 00      	jne r7, r1, +0x230 <.text+0x50a38>
   4f9d8: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   4f9e0: 5d 18 2e 02 00 00 00 00      	jne r8, r1, +0x22e <.text+0x50a38>
   4f9e8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   4f9f0: 5d 19 2c 02 00 00 00 00      	jne r9, r1, +0x22c <.text+0x50a38>
   4f9f8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   4fa00: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   4fa08: 5d 12 29 02 00 00 00 00      	jne r2, r1, +0x229 <.text+0x50a38>
   4fa10: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   4fa18: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   4fa20: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   4fa28: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   4fa30: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   4fa38: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   4fa40: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   4fa48: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   4fa50: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   4fa58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4fa60: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   4fa68: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   4fa70: 07 08 00 00 00 ff ff ff      	add64 r8, -0x100
   4fa78: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4fa80: 85 10 00 00 61 73 ff ff      	call -0x8c9f ; target 0x9590
   4fa88: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   4fa90: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4fa98: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   4faa0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4faa8: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   4fab0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4fab8: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   4fac0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4fac8: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   4fad0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4fad8: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   4fae0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4fae8: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   4faf0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4faf8: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   4fb00: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4fb08: 07 04 00 00 c8 fc ff ff      	add64 r4, -0x338
   4fb10: 85 10 00 00 2d 8c 00 00      	call 0x8c2d ; target 0x95c80
   4fb18: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4fb20: 85 10 00 00 77 70 ff ff      	call -0x8f89 ; target 0x7ee0
   4fb28: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   4fb30: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4fb38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4fb40: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   4fb48: 7b 3a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r3
   4fb50: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   4fb58: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   4fb60: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   4fb68: 79 a2 38 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c8]
   4fb70: 5d 27 1e 02 00 00 00 00      	jne r7, r2, +0x21e <.text+0x50b48>
   4fb78: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   4fb80: 5d 28 1c 02 00 00 00 00      	jne r8, r2, +0x21c <.text+0x50b48>
   4fb88: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   4fb90: 5d 29 1a 02 00 00 00 00      	jne r9, r2, +0x21a <.text+0x50b48>
   4fb98: 79 a2 50 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b0]
   4fba0: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   4fba8: 5d 23 17 02 00 00 00 00      	jne r3, r2, +0x217 <.text+0x50b48>
   4fbb0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fbb8: 15 01 2c 02 00 00 00 00      	jeq r1, 0x0, +0x22c <.text+0x50c00>
   4fbc0: 72 0a c8 fc ff 00 00 00      	stb [r10 - 0x338], 0xff
   4fbc8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4fbd0: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   4fbd8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   4fbe0: 07 05 00 00 c8 fc ff ff      	add64 r5, -0x338
   4fbe8: 18 01 00 00 88 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1988
   4fbf8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4fc00: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   4fc08: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   4fc10: 55 00 fe 01 00 00 00 00      	jne r0, 0x0, +0x1fe <.text+0x50ae8>
   4fc18: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   4fc20: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   4fc28: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   4fc30: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   4fc38: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   4fc40: 71 a1 c8 fc 00 00 00 00      	ldxb r1, [r10 - 0x338]
   4fc48: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   4fc50: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   4fc58: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   4fc60: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4fc68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4fc70: 5d 72 1c 02 00 00 00 00      	jne r2, r7, +0x21c <.text+0x50c38>
   4fc78: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4fc80: 5d 82 1a 02 00 00 00 00      	jne r2, r8, +0x21a <.text+0x50c38>
   4fc88: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4fc90: 5d 92 18 02 00 00 00 00      	jne r2, r9, +0x218 <.text+0x50c38>
   4fc98: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4fca0: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   4fca8: 5d 21 15 02 00 00 00 00      	jne r1, r2, +0x215 <.text+0x50c38>
   4fcb0: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   4fcb8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fcc0: 15 01 2b 02 00 00 00 00      	jeq r1, 0x0, +0x22b <.text+0x50d00>
   4fcc8: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   4fcd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4fcd8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4fce0: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   4fce8: 79 19 10 00 00 00 00 00      	ldxdw r9, [r1 + 0x10]
   4fcf0: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   4fcf8: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   4fd00: 18 01 00 00 06 dd f6 e1 00 00 00 00 d7 65 a1 93      	lddw r1, -0x6c5e9a281e0922fa
   4fd10: 5d 17 2a 02 00 00 00 00      	jne r7, r1, +0x22a <.text+0x50d48>
   4fd18: 18 01 00 00 d9 cb e1 46 00 00 00 00 ce eb 79 ac      	lddw r1, -0x53861431b91e3427
   4fd28: 5d 18 27 02 00 00 00 00      	jne r8, r1, +0x227 <.text+0x50d48>
   4fd30: 18 01 00 00 1c b4 85 ed 00 00 00 00 5f 5b 37 91      	lddw r1, -0x6ec8a4a0127a4be4
   4fd40: 5d 19 24 02 00 00 00 00      	jne r9, r1, +0x224 <.text+0x50d48>
   4fd48: 18 01 00 00 3a 8c f5 85 00 00 00 00 7e ff 00 a9      	lddw r1, -0x56ff00817a0a73c6
   4fd58: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   4fd60: 5d 12 20 02 00 00 00 00      	jne r2, r1, +0x220 <.text+0x50d48>
   4fd68: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   4fd70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4fd78: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fd80: 15 01 36 02 00 00 00 00      	jeq r1, 0x0, +0x236 <.text+0x50e18>
   4fd88: 79 a1 28 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d8]
   4fd90: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4fd98: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fda0: 15 01 3b 02 00 00 00 00      	jeq r1, 0x0, +0x23b <.text+0x50e60>
   4fda8: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   4fdb0: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4fdb8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fdc0: 15 01 40 02 00 00 00 00      	jeq r1, 0x0, +0x240 <.text+0x50ea8>
   4fdc8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   4fdd0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   4fdd8: 15 01 46 02 00 00 00 00      	jeq r1, 0x0, +0x246 <.text+0x50ef0>
   4fde0: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   4fde8: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   4fdf0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4fdf8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   4fe00: 18 03 00 00 06 dd f6 e1 00 00 00 00 d7 65 a1 93      	lddw r3, -0x6c5e9a281e0922fa
   4fe10: 5d 32 a6 01 00 00 00 00      	jne r2, r3, +0x1a6 <.text+0x50a28>
   4fe18: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4fe20: 18 03 00 00 d9 cb e1 46 00 00 00 00 ce eb 79 ac      	lddw r3, -0x53861431b91e3427
   4fe30: 5d 32 a2 01 00 00 00 00      	jne r2, r3, +0x1a2 <.text+0x50a28>
   4fe38: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4fe40: 18 03 00 00 1c b4 85 ed 00 00 00 00 5f 5b 37 91      	lddw r3, -0x6ec8a4a0127a4be4
   4fe50: 5d 32 9e 01 00 00 00 00      	jne r2, r3, +0x19e <.text+0x50a28>
   4fe58: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4fe60: 18 02 00 00 3a 8c f5 85 00 00 00 00 7e ff 00 a9      	lddw r2, -0x56ff00817a0a73c6
   4fe70: 5d 21 9a 01 00 00 00 00      	jne r1, r2, +0x19a <.text+0x50a28>
   4fe78: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   4fe80: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   4fe88: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   4fe90: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   4fe98: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   4fea0: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   4fea8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   4feb0: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   4feb8: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   4fec0: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   4fec8: 79 42 10 00 00 00 00 00      	ldxdw r2, [r4 + 0x10]
   4fed0: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   4fed8: 79 43 08 00 00 00 00 00      	ldxdw r3, [r4 + 0x8]
   4fee0: 7b 3a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r3
   4fee8: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   4fef0: 7b 4a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r4
   4fef8: 5d 47 29 02 00 00 00 00      	jne r7, r4, +0x229 <.text+0x50f28>
   4ff00: 5d 38 28 02 00 00 00 00      	jne r8, r3, +0x228 <.text+0x50f28>
   4ff08: 5d 29 27 02 00 00 00 00      	jne r9, r2, +0x227 <.text+0x50f28>
   4ff10: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   4ff18: 5d 12 25 02 00 00 00 00      	jne r2, r1, +0x225 <.text+0x50f28>
   4ff20: 79 a1 30 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d0]
   4ff28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ff30: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4ff38: 7b 2a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r2
   4ff40: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4ff48: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   4ff50: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4ff58: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   4ff60: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ff68: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   4ff70: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   4ff78: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ff80: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   4ff88: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   4ff90: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   4ff98: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   4ffa0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   4ffa8: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   4ffb0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4ffb8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   4ffc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ffc8: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   4ffd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ffd8: 07 02 00 00 58 fe ff ff      	add64 r2, -0x1a8
   4ffe0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4ffe8: 07 03 00 00 c8 fc ff ff      	add64 r3, -0x338
   4fff0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4fff8: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   50000: 85 10 00 00 8f 8b 00 00      	call 0x8b8f ; target 0x95c80
   50008: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   50010: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   50018: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   50020: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   50028: 7b 3a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r3
   50030: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   50038: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   50040: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   50048: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   50050: 5d 27 14 02 00 00 00 00      	jne r7, r2, +0x214 <.text+0x50fd8>
   50058: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   50060: 5d 28 12 02 00 00 00 00      	jne r8, r2, +0x212 <.text+0x50fd8>
   50068: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   50070: 5d 29 10 02 00 00 00 00      	jne r9, r2, +0x210 <.text+0x50fd8>
   50078: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   50080: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   50088: 5d 23 0d 02 00 00 00 00      	jne r3, r2, +0x20d <.text+0x50fd8>
   50090: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   50098: 15 01 21 02 00 00 00 00      	jeq r1, 0x0, +0x221 <.text+0x51088>
   500a0: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   500a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   500b0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   500b8: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   500c0: 79 19 10 00 00 00 00 00      	ldxdw r9, [r1 + 0x10]
   500c8: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   500d0: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   500d8: 18 01 00 00 0c 14 de fc 00 00 00 00 82 5e c6 76      	lddw r1, 0x76c65e82fcde140c
   500e8: 5d 17 20 02 00 00 00 00      	jne r7, r1, +0x220 <.text+0x510d0>
   500f0: 18 01 00 00 94 25 08 18 00 00 00 00 bb 65 40 65      	lddw r1, 0x654065bb18082594
   50100: 5d 18 1d 02 00 00 00 00      	jne r8, r1, +0x21d <.text+0x510d0>
   50108: 18 01 00 00 f4 29 8d 31 00 00 00 00 56 d5 71 b4      	lddw r1, -0x4b8e2aa9ce72d60c
   50118: 5d 19 1a 02 00 00 00 00      	jne r9, r1, +0x21a <.text+0x510d0>
   50120: 18 01 00 00 d4 f8 09 0c 00 00 00 00 18 e9 a8 63      	lddw r1, 0x63a8e9180c09f8d4
   50130: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   50138: 5d 12 16 02 00 00 00 00      	jne r2, r1, +0x216 <.text+0x510d0>
   50140: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   50148: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50150: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   50158: 79 a2 e0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x520]
   50160: 79 22 20 00 00 00 00 00      	ldxdw r2, [r2 + 0x20]
   50168: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   50170: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   50178: 5d 34 39 01 00 00 00 00      	jne r4, r3, +0x139 <.text+0x50a28>
   50180: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   50188: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   50190: 5d 34 36 01 00 00 00 00      	jne r4, r3, +0x136 <.text+0x50a28>
   50198: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   501a0: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   501a8: 5d 34 33 01 00 00 00 00      	jne r4, r3, +0x133 <.text+0x50a28>
   501b0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   501b8: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   501c0: 5d 12 30 01 00 00 00 00      	jne r2, r1, +0x130 <.text+0x50a28>
   501c8: 79 a1 e0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x520]
   501d0: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   501d8: 7b 2a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r2
   501e0: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   501e8: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   501f0: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   501f8: 79 a1 f0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x510]
   50200: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   50208: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   50210: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   50218: 79 42 10 00 00 00 00 00      	ldxdw r2, [r4 + 0x10]
   50220: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   50228: 79 43 08 00 00 00 00 00      	ldxdw r3, [r4 + 0x8]
   50230: 7b 3a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r3
   50238: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   50240: 7b 4a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r4
   50248: 5d 47 0e 02 00 00 00 00      	jne r7, r4, +0x20e <.text+0x511a0>
   50250: 5d 38 0d 02 00 00 00 00      	jne r8, r3, +0x20d <.text+0x511a0>
   50258: 5d 29 0c 02 00 00 00 00      	jne r9, r2, +0x20c <.text+0x511a0>
   50260: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   50268: 5d 12 0a 02 00 00 00 00      	jne r2, r1, +0x20a <.text+0x511a0>
   50270: 79 a1 30 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d0]
   50278: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50280: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   50288: 7b 2a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r2
   50290: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   50298: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   502a0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   502a8: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   502b0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   502b8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   502c0: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   502c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   502d0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   502d8: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   502e0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   502e8: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   502f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   502f8: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   50300: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50308: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   50310: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   50318: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   50320: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   50328: 07 02 00 00 98 fe ff ff      	add64 r2, -0x168
   50330: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   50338: 07 03 00 00 c8 fc ff ff      	add64 r3, -0x338
   50340: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   50348: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   50350: 85 10 00 00 25 8b 00 00      	call 0x8b25 ; target 0x95c80
   50358: 79 a1 e0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x520]
   50360: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   50368: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   50370: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   50378: 7b 3a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r3
   50380: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   50388: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   50390: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   50398: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   503a0: 5d 27 f9 01 00 00 00 00      	jne r7, r2, +0x1f9 <.text+0x51250>
   503a8: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   503b0: 5d 28 f7 01 00 00 00 00      	jne r8, r2, +0x1f7 <.text+0x51250>
   503b8: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   503c0: 5d 29 f5 01 00 00 00 00      	jne r9, r2, +0x1f5 <.text+0x51250>
   503c8: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   503d0: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   503d8: 5d 23 f2 01 00 00 00 00      	jne r3, r2, +0x1f2 <.text+0x51250>
   503e0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   503e8: 15 01 06 02 00 00 00 00      	jeq r1, 0x0, +0x206 <.text+0x51300>
   503f0: 72 0a c8 fc ff 00 00 00      	stb [r10 - 0x338], 0xff
   503f8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   50400: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   50408: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   50410: 07 05 00 00 c8 fc ff ff      	add64 r5, -0x338
   50418: 18 01 00 00 78 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1978
   50428: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   50430: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   50438: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   50440: 55 00 f8 00 00 00 00 00      	jne r0, 0x0, +0xf8 <.text+0x50ae8>
   50448: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   50450: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   50458: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   50460: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   50468: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   50470: 71 a1 c8 fc 00 00 00 00      	ldxb r1, [r10 - 0x338]
   50478: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   50480: 73 12 03 00 00 00 00 00      	stxb [r2 + 0x3], r1
   50488: 79 a1 f8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x508]
   50490: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50498: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   504a0: 5d 72 f1 01 00 00 00 00      	jne r2, r7, +0x1f1 <.text+0x51310>
   504a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   504b0: 5d 82 ef 01 00 00 00 00      	jne r2, r8, +0x1ef <.text+0x51310>
   504b8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   504c0: 5d 92 ed 01 00 00 00 00      	jne r2, r9, +0x1ed <.text+0x51310>
   504c8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   504d0: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   504d8: 5d 21 ea 01 00 00 00 00      	jne r1, r2, +0x1ea <.text+0x51310>
   504e0: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   504e8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   504f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   504f8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   50500: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   50508: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   50510: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   50518: 18 05 00 00 d6 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xaddd6 ; data 'pool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bo'
   50528: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   50530: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   50538: 07 05 00 00 c8 fc ff ff      	add64 r5, -0x338
   50540: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   50548: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   50550: 7b 4a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r4
   50558: 7b 3a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r3
   50560: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   50568: 7a 0a e0 fe 07 00 00 00      	stdw [r10 - 0x120], 0x7
   50570: 7a 0a f0 fe 20 00 00 00      	stdw [r10 - 0x110], 0x20
   50578: 72 0a ff fe ff 00 00 00      	stb [r10 - 0x101], 0xff
   50580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   50588: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   50590: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   50598: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   505a0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   505a8: 07 05 00 00 ff fe ff ff      	add64 r5, -0x101
   505b0: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   505b8: 79 a3 a8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x458]
   505c0: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   505c8: 55 00 c7 00 00 00 00 00      	jne r0, 0x0, +0xc7 <.text+0x50ae8>
   505d0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   505d8: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   505e0: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   505e8: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   505f0: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   505f8: 71 a1 ff fe 00 00 00 00      	ldxb r1, [r10 - 0x101]
   50600: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   50608: 73 12 04 00 00 00 00 00      	stxb [r2 + 0x4], r1
   50610: 79 a1 e8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x518]
   50618: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50620: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   50628: 5d 72 cb 01 00 00 00 00      	jne r2, r7, +0x1cb <.text+0x51368>
   50630: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   50638: 5d 82 c9 01 00 00 00 00      	jne r2, r8, +0x1c9 <.text+0x51368>
   50640: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   50648: 5d 92 c7 01 00 00 00 00      	jne r2, r9, +0x1c7 <.text+0x51368>
   50650: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   50658: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   50660: 5d 21 c4 01 00 00 00 00      	jne r1, r2, +0x1c4 <.text+0x51368>
   50668: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   50670: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   50678: 15 01 d6 01 00 00 00 00      	jeq r1, 0x0, +0x1d6 <.text+0x51410>
   50680: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   50688: 79 a2 c8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x538]
   50690: 7b 21 e0 00 00 00 00 00      	stxdw [r1 + 0xe0], r2
   50698: 79 a2 d0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x530]
   506a0: 7b 21 d8 00 00 00 00 00      	stxdw [r1 + 0xd8], r2
   506a8: 79 a2 e8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x518]
   506b0: 7b 21 d0 00 00 00 00 00      	stxdw [r1 + 0xd0], r2
   506b8: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   506c0: 7b 21 c8 00 00 00 00 00      	stxdw [r1 + 0xc8], r2
   506c8: 79 a2 f8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x508]
   506d0: 7b 21 c0 00 00 00 00 00      	stxdw [r1 + 0xc0], r2
   506d8: 79 a2 98 fb 00 00 00 00      	ldxdw r2, [r10 - 0x468]
   506e0: 7b 21 b8 00 00 00 00 00      	stxdw [r1 + 0xb8], r2
   506e8: 79 a2 a0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x460]
   506f0: 7b 21 b0 00 00 00 00 00      	stxdw [r1 + 0xb0], r2
   506f8: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   50700: 7b 21 a8 00 00 00 00 00      	stxdw [r1 + 0xa8], r2
   50708: 79 a2 e0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x520]
   50710: 7b 21 a0 00 00 00 00 00      	stxdw [r1 + 0xa0], r2
   50718: 79 a2 00 fb 00 00 00 00      	ldxdw r2, [r10 - 0x500]
   50720: 7b 21 98 00 00 00 00 00      	stxdw [r1 + 0x98], r2
   50728: 79 a2 08 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4f8]
   50730: 7b 21 90 00 00 00 00 00      	stxdw [r1 + 0x90], r2
   50738: 79 a2 10 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4f0]
   50740: 7b 21 88 00 00 00 00 00      	stxdw [r1 + 0x88], r2
   50748: 79 a2 18 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4e8]
   50750: 7b 21 80 00 00 00 00 00      	stxdw [r1 + 0x80], r2
   50758: 79 a2 20 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4e0]
   50760: 7b 21 78 00 00 00 00 00      	stxdw [r1 + 0x78], r2
   50768: 79 a2 28 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4d8]
   50770: 7b 21 70 00 00 00 00 00      	stxdw [r1 + 0x70], r2
   50778: 79 a2 30 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4d0]
   50780: 7b 21 68 00 00 00 00 00      	stxdw [r1 + 0x68], r2
   50788: 79 a2 38 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4c8]
   50790: 7b 21 60 00 00 00 00 00      	stxdw [r1 + 0x60], r2
   50798: 79 a2 40 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4c0]
   507a0: 7b 21 58 00 00 00 00 00      	stxdw [r1 + 0x58], r2
   507a8: 79 a2 48 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b8]
   507b0: 7b 21 50 00 00 00 00 00      	stxdw [r1 + 0x50], r2
   507b8: 79 a2 50 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b0]
   507c0: 7b 21 48 00 00 00 00 00      	stxdw [r1 + 0x48], r2
   507c8: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   507d0: 7b 21 40 00 00 00 00 00      	stxdw [r1 + 0x40], r2
   507d8: 79 a2 60 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a0]
   507e0: 7b 21 38 00 00 00 00 00      	stxdw [r1 + 0x38], r2
   507e8: 79 a2 68 fb 00 00 00 00      	ldxdw r2, [r10 - 0x498]
   507f0: 7b 21 30 00 00 00 00 00      	stxdw [r1 + 0x30], r2
   507f8: 79 a2 c0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x540]
   50800: 7b 21 28 00 00 00 00 00      	stxdw [r1 + 0x28], r2
   50808: 79 a2 70 fb 00 00 00 00      	ldxdw r2, [r10 - 0x490]
   50810: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   50818: 79 a2 78 fb 00 00 00 00      	ldxdw r2, [r10 - 0x488]
   50820: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   50828: 79 a2 80 fb 00 00 00 00      	ldxdw r2, [r10 - 0x480]
   50830: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   50838: 79 a2 88 fb 00 00 00 00      	ldxdw r2, [r10 - 0x478]
   50840: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   50848: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
   50850: 05 00 00 fa 00 00 00 00      	ja -0x600 <.text+0x4d738>
   50858: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50860: 85 10 00 00 b0 93 00 00      	call 0x93b0 ; target 0x9a5e8
   50868: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50870: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50878: 18 03 00 00 55 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc55 ; data 'traderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotoco'
   50888: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   50890: 85 10 00 00 8f 66 ff ff      	call -0x9971 ; target 0x3d10
   50898: 05 00 3e fa 00 00 00 00      	ja -0x5c2 <.text+0x4d970>
   508a0: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   508a8: 85 10 00 00 a7 93 00 00      	call 0x93a7 ; target 0x9a5e8
   508b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   508b8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   508c0: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   508d0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   508d8: 85 10 00 00 86 66 ff ff      	call -0x997a ; target 0x3d10
   508e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   508e8: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   508f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   508f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50900: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   50908: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   50910: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   50918: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   50920: 7b 7a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r7
   50928: 7b 9a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r9
   50930: 7b 8a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r8
   50938: 79 a6 b8 fa 00 00 00 00      	ldxdw r6, [r10 - 0x548]
   50940: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   50948: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   50950: 7b 5a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r5
   50958: 7b 4a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r4
   50960: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   50968: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   50970: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   50978: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50980: 85 10 00 00 0e 8e 00 00      	call 0x8e0e ; target 0x979f8
   50988: 05 00 20 fa 00 00 00 00      	ja -0x5e0 <.text+0x4d970>
   50990: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50998: 85 10 00 00 89 93 00 00      	call 0x9389 ; target 0x9a5e8
   509a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   509a8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   509b0: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   509c0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   509c8: 85 10 00 00 68 66 ff ff      	call -0x9998 ; target 0x3d10
   509d0: 05 00 17 fa 00 00 00 00      	ja -0x5e9 <.text+0x4d970>
   509d8: b7 01 00 00 d1 07 00 00      	mov64 r1, 0x7d1
   509e0: 85 10 00 00 80 93 00 00      	call 0x9380 ; target 0x9a5e8
   509e8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   509f0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   509f8: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   50a08: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   50a10: 85 10 00 00 5f 66 ff ff      	call -0x99a1 ; target 0x3d10
   50a18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50a20: 79 a1 a0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x560]
   50a28: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   50a30: 7b 7a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r7
   50a38: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   50a40: 7b 9a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r9
   50a48: 79 a1 a8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x558]
   50a50: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   50a58: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   50a60: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   50a68: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   50a70: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   50a78: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   50a80: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   50a88: 05 00 db ff 00 00 00 00      	ja -0x25 <.text+0x50848>
   50a90: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   50a98: 85 10 00 00 69 93 00 00      	call 0x9369 ; target 0x9a5e8
   50aa0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50aa8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50ab0: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   50ac0: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   50ac8: 85 10 00 00 48 66 ff ff      	call -0x99b8 ; target 0x3d10
   50ad0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50ad8: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   50ae0: 05 00 c1 ff 00 00 00 00      	ja -0x3f <.text+0x507d0>
   50ae8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50af0: 85 10 00 00 5e 93 00 00      	call 0x935e ; target 0x9a5e8
   50af8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50b00: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50b08: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   50b18: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   50b20: 85 10 00 00 3d 66 ff ff      	call -0x99c3 ; target 0x3d10
   50b28: 05 00 ec f9 00 00 00 00      	ja -0x614 <.text+0x4d970>
   50b30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   50b38: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   50b40: 85 10 00 00 73 6e ff ff      	call -0x918d ; target 0x7ee0
   50b48: b7 01 00 00 e7 07 00 00      	mov64 r1, 0x7e7
   50b50: 05 00 e6 f9 00 00 00 00      	ja -0x61a <.text+0x4d968>
   50b58: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   50b60: 85 10 00 00 50 93 00 00      	call 0x9350 ; target 0x9a5e8
   50b68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50b70: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50b78: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   50b88: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   50b90: 85 10 00 00 2f 66 ff ff      	call -0x99d1 ; target 0x3d10
   50b98: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50ba0: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   50ba8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   50bb0: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   50bb8: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   50bc0: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   50bc8: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   50bd0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   50bd8: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   50be0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   50be8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   50bf0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   50bf8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   50c00: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0x50bf0>
   50c08: 18 01 00 00 f8 11 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb11f8
   50c18: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   50c20: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   50c28: 7a 0a 08 ff 01 00 00 00      	stdw [r10 - 0xf8], 0x1
   50c30: 7a 0a 18 ff 00 00 00 00      	stdw [r10 - 0xe8], 0x0
   50c38: 7a 0a 10 ff 08 00 00 00      	stdw [r10 - 0xf0], 0x8
   50c40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   50c48: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   50c50: 18 02 00 00 08 12 0b 00 00 00 00 00 00 00 00 00      	lddw r2, 0xb1208
   50c60: 85 10 00 00 84 a7 00 00      	call 0xa784 ; target 0xa4888
   50c68: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   50c70: 85 10 00 00 2e 93 00 00      	call 0x932e ; target 0x9a5e8
   50c78: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50c80: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50c88: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   50c98: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   50ca0: 85 10 00 00 0d 66 ff ff      	call -0x99f3 ; target 0x3d10
   50ca8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50cb0: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   50cb8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   50cc0: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   50cc8: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   50cd0: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   50cd8: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   50ce0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   50ce8: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   50cf0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   50cf8: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   50d00: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   50d08: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   50d10: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   50d18: 05 00 89 ff 00 00 00 00      	ja -0x77 <.text+0x50848>
   50d20: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50d28: 85 10 00 00 17 93 00 00      	call 0x9317 ; target 0x9a5e8
   50d30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50d38: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50d40: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   50d50: 05 00 ed fb 00 00 00 00      	ja -0x413 <.text+0x4eba0>
   50d58: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   50d60: 85 10 00 00 10 93 00 00      	call 0x9310 ; target 0x9a5e8
   50d68: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50d70: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50d78: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   50d88: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   50d90: 85 10 00 00 ef 65 ff ff      	call -0x9a11 ; target 0x3d10
   50d98: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50da0: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   50da8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50db0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   50db8: 7b 3a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r3
   50dc0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   50dc8: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   50dd0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   50dd8: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   50de0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   50de8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   50df0: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   50df8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   50e00: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   50e08: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   50e10: 7b 7a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r7
   50e18: 05 00 69 ff 00 00 00 00      	ja -0x97 <.text+0x50848>
   50e20: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50e28: 85 10 00 00 f7 92 00 00      	call 0x92f7 ; target 0x9a5e8
   50e30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50e38: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50e40: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   50e50: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   50e58: 85 10 00 00 d6 65 ff ff      	call -0x9a2a ; target 0x3d10
   50e60: 05 00 85 f9 00 00 00 00      	ja -0x67b <.text+0x4d970>
   50e68: b7 01 00 00 dc 07 00 00      	mov64 r1, 0x7dc
   50e70: 85 10 00 00 ee 92 00 00      	call 0x92ee ; target 0x9a5e8
   50e78: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50e80: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50e88: 18 03 00 00 5b dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc5b ; data 'quote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotocol_fee_'
   50e98: b7 04 00 00 13 00 00 00      	mov64 r4, 0x13
   50ea0: 85 10 00 00 cd 65 ff ff      	call -0x9a33 ; target 0x3d10
   50ea8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50eb0: 18 01 00 00 06 dd f6 e1 00 00 00 00 d7 65 a1 93      	lddw r1, -0x6c5e9a281e0922fa
   50ec0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   50ec8: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   50ed0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   50ed8: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   50ee0: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   50ee8: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   50ef0: 18 01 00 00 d9 cb e1 46 00 00 00 00 ce eb 79 ac      	lddw r1, -0x53861431b91e3427
   50f00: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   50f08: 18 01 00 00 1c b4 85 ed 00 00 00 00 5f 5b 37 91      	lddw r1, -0x6ec8a4a0127a4be4
   50f18: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   50f20: 18 01 00 00 3a 8c f5 85 00 00 00 00 7e ff 00 a9      	lddw r1, -0x56ff00817a0a73c6
   50f30: 05 00 bb ff 00 00 00 00      	ja -0x45 <.text+0x50bf0>
   50f38: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50f40: 85 10 00 00 d4 92 00 00      	call 0x92d4 ; target 0x9a5e8
   50f48: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50f50: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50f58: 18 03 00 00 6c d0 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xad06c
   50f68: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   50f70: 85 10 00 00 b3 65 ff ff      	call -0x9a4d ; target 0x3d10
   50f78: 05 00 62 f9 00 00 00 00      	ja -0x69e <.text+0x4d970>
   50f80: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50f88: 85 10 00 00 cb 92 00 00      	call 0x92cb ; target 0x9a5e8
   50f90: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50f98: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50fa0: 18 03 00 00 8d dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc8d ; data 'pool_base_token_accountpool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_'
   50fb0: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   50fb8: 85 10 00 00 aa 65 ff ff      	call -0x9a56 ; target 0x3d10
   50fc0: 05 00 59 f9 00 00 00 00      	ja -0x6a7 <.text+0x4d970>
   50fc8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   50fd0: 85 10 00 00 c2 92 00 00      	call 0x92c2 ; target 0x9a5e8
   50fd8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   50fe0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   50fe8: 18 03 00 00 a4 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadca4 ; data 'pool_quote_token_accountprotocol_fee_recipientprotocol_fee_recipient_token_accountpump_swap_event_authoritypum'
   50ff8: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   51000: 85 10 00 00 a1 65 ff ff      	call -0x9a5f ; target 0x3d10
   51008: 05 00 50 f9 00 00 00 00      	ja -0x6b0 <.text+0x4d970>
   51010: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   51018: 85 10 00 00 b9 92 00 00      	call 0x92b9 ; target 0x9a5e8
   51020: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51028: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51030: 18 03 00 00 bc dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcbc ; data 'protocol_fee_recipientprotocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creat'
   51040: 05 00 97 fc 00 00 00 00      	ja -0x369 <.text+0x4f3e0>
   51048: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   51050: 85 10 00 00 b2 92 00 00      	call 0x92b2 ; target 0x9a5e8
   51058: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51060: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51068: 18 03 00 00 d2 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcd2 ; data 'protocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creat'
   51078: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   51080: 85 10 00 00 91 65 ff ff      	call -0x9a6f ; target 0x3d10
   51088: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51090: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   51098: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   510a0: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   510a8: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   510b0: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   510b8: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   510c0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   510c8: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   510d0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   510d8: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   510e0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   510e8: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   510f0: 05 00 83 ff 00 00 00 00      	ja -0x7d <.text+0x50bf0>
   510f8: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   51100: 85 10 00 00 9c 92 00 00      	call 0x929c ; target 0x9a5e8
   51108: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51110: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51118: 18 03 00 00 d2 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcd2 ; data 'protocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creat'
   51128: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   51130: 85 10 00 00 7b 65 ff ff      	call -0x9a85 ; target 0x3d10
   51138: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51140: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   51148: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   51150: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   51158: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   51160: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   51168: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   51170: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   51178: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   51180: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   51188: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   51190: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   51198: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   511a0: 05 00 6d ff 00 00 00 00      	ja -0x93 <.text+0x50bf0>
   511a8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   511b0: 85 10 00 00 86 92 00 00      	call 0x9286 ; target 0x9a5e8
   511b8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   511c0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   511c8: 18 03 00 00 d2 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadcd2 ; data 'protocol_fee_recipient_token_accountpump_swap_event_authoritypump_swap_programcoin_creator_vault_atacoin_creat'
   511d8: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   511e0: 85 10 00 00 65 65 ff ff      	call -0x9a9b ; target 0x3d10
   511e8: 05 00 14 f9 00 00 00 00      	ja -0x6ec <.text+0x4d970>
   511f0: b7 01 00 00 dc 07 00 00      	mov64 r1, 0x7dc
   511f8: 85 10 00 00 7d 92 00 00      	call 0x927d ; target 0x9a5e8
   51200: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51208: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51210: 18 03 00 00 0f dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd0f ; data 'pump_swap_programcoin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumu'
   51220: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   51228: 85 10 00 00 5c 65 ff ff      	call -0x9aa4 ; target 0x3d10
   51230: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51238: 18 01 00 00 0c 14 de fc 00 00 00 00 82 5e c6 76      	lddw r1, 0x76c65e82fcde140c
   51248: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   51250: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   51258: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   51260: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   51268: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   51270: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   51278: 18 01 00 00 94 25 08 18 00 00 00 00 bb 65 40 65      	lddw r1, 0x654065bb18082594
   51288: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   51290: 18 01 00 00 f4 29 8d 31 00 00 00 00 56 d5 71 b4      	lddw r1, -0x4b8e2aa9ce72d60c
   512a0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   512a8: 18 01 00 00 d4 f8 09 0c 00 00 00 00 18 e9 a8 63      	lddw r1, 0x63a8e9180c09f8d4
   512b8: 05 00 4a ff 00 00 00 00      	ja -0xb6 <.text+0x50bf0>
   512c0: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   512c8: 85 10 00 00 63 92 00 00      	call 0x9263 ; target 0x9a5e8
   512d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   512d8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   512e0: 18 03 00 00 20 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd20 ; data 'coin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumulatorfee_configfe'
   512f0: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   512f8: 85 10 00 00 42 65 ff ff      	call -0x9abe ; target 0x3d10
   51300: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51308: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   51310: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   51318: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   51320: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   51328: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   51330: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   51338: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   51340: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   51348: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   51350: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   51358: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   51360: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   51368: 05 00 34 ff 00 00 00 00      	ja -0xcc <.text+0x50bf0>
   51370: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   51378: 85 10 00 00 4d 92 00 00      	call 0x924d ; target 0x9a5e8
   51380: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51388: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51390: 18 03 00 00 20 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd20 ; data 'coin_creator_vault_atacoin_creator_vault_authorityglobal_volume_accumulatoruser_volume_accumulatorfee_configfe'
   513a0: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   513a8: 85 10 00 00 2c 65 ff ff      	call -0x9ad4 ; target 0x3d10
   513b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   513b8: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   513c0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   513c8: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   513d0: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   513d8: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   513e0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   513e8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   513f0: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   513f8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   51400: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   51408: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   51410: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   51418: 05 00 1e ff 00 00 00 00      	ja -0xe2 <.text+0x50bf0>
   51420: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   51428: 05 00 15 fc 00 00 00 00      	ja -0x3eb <.text+0x4f3b8>
   51430: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   51438: 85 10 00 00 35 92 00 00      	call 0x9235 ; target 0x9a5e8
   51440: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51448: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51450: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   51460: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   51468: 85 10 00 00 14 65 ff ff      	call -0x9aec ; target 0x3d10
   51470: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51478: 79 a1 f8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x508]
   51480: 05 00 24 ff 00 00 00 00      	ja -0xdc <.text+0x50c88>
   51488: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   51490: 85 10 00 00 2a 92 00 00      	call 0x922a ; target 0x9a5e8
   51498: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   514a0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   514a8: 18 03 00 00 97 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd97 ; data 'pool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmay'
   514b8: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   514c0: 85 10 00 00 09 65 ff ff      	call -0x9af7 ; target 0x3d10
   514c8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   514d0: 79 a1 e8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x518]
   514d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   514e0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   514e8: 7b 3a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r3
   514f0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   514f8: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   51500: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   51508: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   51510: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   51518: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   51520: 79 a1 a8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x458]
   51528: 05 00 19 ff 00 00 00 00      	ja -0xe7 <.text+0x50cd8>
   51530: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   51538: 85 10 00 00 15 92 00 00      	call 0x9215 ; target 0x9a5e8
   51540: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   51548: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   51550: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   51560: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   51568: 85 10 00 00 f4 64 ff ff      	call -0x9b0c ; target 0x3d10
   51570: 05 00 a3 f8 00 00 00 00      	ja -0x75d <.text+0x4d970>
