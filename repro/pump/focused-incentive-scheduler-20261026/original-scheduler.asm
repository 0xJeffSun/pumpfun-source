   7c720: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   7c728: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   7c730: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   7c738: 79 56 00 f0 00 00 00 00      	ldxdw r6, [r5 - 0x1000]
   7c740: 7b 68 10 02 00 00 00 00      	stxdw [r8 + 0x210], r6
   7c748: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
   7c750: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   7c758: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   7c760: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   7c768: 7b 28 08 00 00 00 00 00      	stxdw [r8 + 0x8], r2
   7c770: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   7c778: 7b 28 10 00 00 00 00 00      	stxdw [r8 + 0x10], r2
   7c780: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   7c788: 7b 18 18 00 00 00 00 00      	stxdw [r8 + 0x18], r1
   7c790: 79 57 20 f0 00 00 00 00      	ldxdw r7, [r5 - 0xfe0]
   7c798: 79 51 18 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfe8]
   7c7a0: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   7c7a8: 79 51 10 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff0]
   7c7b0: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   7c7b8: 15 09 01 00 00 00 00 00      	jeq r9, 0x0, +0x1 <.text+0x7c6a8>
   7c7c0: 55 04 22 00 00 00 00 00      	jne r4, 0x0, +0x22 <.text+0x7c7b8>
   7c7c8: b7 09 00 00 02 00 00 00      	mov64 r9, 0x2
   7c7d0: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   7c7d8: 15 01 af 02 00 00 00 00      	jeq r1, 0x0, +0x2af <.text+0x7dc38>
   7c7e0: 79 81 00 02 00 00 00 00      	ldxdw r1, [r8 + 0x200]
   7c7e8: cd 17 5d 00 00 00 00 00      	jslt r7, r1, +0x5d <.text+0x7c9b8>
   7c7f0: 79 82 08 02 00 00 00 00      	ldxdw r2, [r8 + 0x208]
   7c7f8: 79 a6 c0 fd 00 00 00 00      	ldxdw r6, [r10 - 0x240]
   7c800: cd 72 01 00 00 00 00 00      	jslt r2, r7, +0x1 <.text+0x7c6f0>
   7c808: 05 00 ad 00 00 00 00 00      	ja +0xad <.text+0x7cc58>
   7c810: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7c818: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7c820: 18 02 00 00 d8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5dd8
   7c830: 85 10 00 00 69 b5 01 00      	call 0x1b569
   7c838: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7c840: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7c848: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7c850: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7c860: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7c868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7c870: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7c878: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7c880: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7c888: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7c890: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7c898: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7c8a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7c8a8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7c8b0: 18 01 00 00 d8 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5dd8
   7c8c0: 85 10 00 00 b8 c2 01 00      	call 0x1c2b8
   7c8c8: 15 00 b3 00 00 00 00 00      	jeq r0, 0x0, +0xb3 <.text+0x7cd48>
   7c8d0: 05 00 63 02 00 00 00 00      	ja +0x263 <.text+0x7dad0>
   7c8d8: 79 81 00 02 00 00 00 00      	ldxdw r1, [r8 + 0x200]
   7c8e0: 1d 91 0a 00 00 00 00 00      	jeq r1, r9, +0xa <.text+0x7c818>
   7c8e8: cd 97 01 00 00 00 00 00      	jslt r7, r9, +0x1 <.text+0x7c7d8>
   7c8f0: 05 00 47 02 00 00 00 00      	ja +0x247 <.text+0x7da10>
   7c8f8: 7b 98 00 02 00 00 00 00      	stxdw [r8 + 0x200], r9
   7c900: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7c908: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   7c910: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   7c918: b7 03 00 00 e0 01 00 00      	mov64 r3, 0x1e0
   7c920: 7b 4a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r4
   7c928: 85 10 00 00 a4 6d 02 00      	call 0x26da4
   7c930: 79 a4 a8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x258]
   7c938: 6d 74 01 00 00 00 00 00      	jsgt r4, r7, +0x1 <.text+0x7c828>
   7c940: 05 00 48 00 00 00 00 00      	ja +0x48 <.text+0x7ca68>
   7c948: 7b 4a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r4
   7c950: 6d 94 01 00 00 00 00 00      	jsgt r4, r9, +0x1 <.text+0x7c840>
   7c958: 05 00 db 00 00 00 00 00      	ja +0xdb <.text+0x7cf18>
   7c960: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   7c968: c7 03 00 00 3f 00 00 00      	arsh64 r3, 0x3f
   7c970: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7c978: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   7c980: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   7c988: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   7c990: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   7c998: 85 10 00 00 85 71 02 00      	call 0x27185
   7c9a0: 79 a5 78 fe 00 00 00 00      	ldxdw r5, [r10 - 0x188]
   7c9a8: bf 52 00 00 00 00 00 00      	mov64 r2, r5
   7c9b0: c7 02 00 00 3f 00 00 00      	arsh64 r2, 0x3f
   7c9b8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   7c9c0: 79 a3 80 fe 00 00 00 00      	ldxdw r3, [r10 - 0x180]
   7c9c8: 5d 23 01 00 00 00 00 00      	jne r3, r2, +0x1 <.text+0x7c8b8>
   7c9d0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   7c9d8: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   7c9e0: 55 01 aa 02 00 00 00 00      	jne r1, 0x0, +0x2aa <.text+0x7de18>
   7c9e8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   7c9f0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   7c9f8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   7ca00: 79 a4 a8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x258]
   7ca08: 65 09 01 00 00 00 00 00      	jsgt r9, 0x0, +0x1 <.text+0x7c8f8>
   7ca10: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   7ca18: bf 49 00 00 00 00 00 00      	mov64 r9, r4
   7ca20: 1f 39 00 00 00 00 00 00      	sub64 r9, r3
   7ca28: cd 49 01 00 00 00 00 00      	jslt r9, r4, +0x1 <.text+0x7c918>
   7ca30: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   7ca38: af 21 00 00 00 00 00 00      	xor64 r1, r2
   7ca40: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   7ca48: 55 01 a3 02 00 00 00 00      	jne r1, 0x0, +0x2a3 <.text+0x7de48>
   7ca50: 6d 95 01 00 00 00 00 00      	jsgt r5, r9, +0x1 <.text+0x7c940>
   7ca58: 05 00 3c 01 00 00 00 00      	ja +0x13c <.text+0x7d320>
   7ca60: 7b 48 08 02 00 00 00 00      	stxdw [r8 + 0x208], r4
   7ca68: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   7ca70: 6d 17 01 00 00 00 00 00      	jsgt r7, r1, +0x1 <.text+0x7c960>
   7ca78: 05 00 a9 ff 00 00 00 00      	ja -0x57 <.text+0x7c6a8>
   7ca80: 65 07 b4 01 ff ff ff ff      	jsgt r7, -0x1, +0x1b4 <.text+0x7d708>
   7ca88: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7ca90: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7ca98: 18 01 00 00 2e 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b722e
   7caa8: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   7cab0: 18 04 00 00 48 de 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bde48
   7cac0: 18 05 00 00 68 de 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bde68
   7cad0: 85 10 00 00 68 60 02 00      	call 0x26068
   7cad8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7cae0: 85 10 00 00 9c 02 00 00      	call 0x29c
   7cae8: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   7caf0: 79 a5 c0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x240]
   7caf8: a5 01 51 00 1e 00 00 00      	jlt r1, 0x1e, +0x51 <.text+0x7cc68>
   7cb00: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   7cb08: 07 08 00 00 20 00 00 00      	add64 r8, 0x20
   7cb10: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0x7ca18>
   7cb18: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   7cb20: 3d 01 e5 01 00 00 00 00      	jge r1, r0, +0x1e5 <.text+0x7d930>
   7cb28: 0f 41 00 00 00 00 00 00      	add64 r1, r4
   7cb30: 2d 01 e3 01 00 00 00 00      	jgt r1, r0, +0x1e3 <.text+0x7d930>
   7cb38: 25 01 6b 02 1d 00 00 00      	jgt r1, 0x1d, +0x26b <.text+0x7dd78>
   7cb40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   7cb48: 67 02 00 00 03 00 00 00      	lsh64 r2, 0x3
   7cb50: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   7cb58: 0f 23 00 00 00 00 00 00      	add64 r3, r2
   7cb60: 7b 53 00 00 00 00 00 00      	stxdw [r3 + 0x0], r5
   7cb68: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   7cb70: ad 01 f4 ff 00 00 00 00      	jlt r1, r0, -0xc <.text+0x7c9f8>
   7cb78: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   7cb80: 05 00 f2 ff 00 00 00 00      	ja -0xe <.text+0x7c9f8>
   7cb88: bf 46 00 00 00 00 00 00      	mov64 r6, r4
   7cb90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cb98: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7cba0: 18 02 00 00 e0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ee0
   7cbb0: 85 10 00 00 f9 b4 01 00      	call 0x1b4f9
   7cbb8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7cbc0: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7cbc8: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7cbd0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7cbe0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7cbe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cbf0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7cbf8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7cc00: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7cc08: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7cc10: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7cc18: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7cc20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7cc28: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7cc30: 18 01 00 00 e0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ee0
   7cc40: 85 10 00 00 48 c2 01 00      	call 0x1c248
   7cc48: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x7cb38>
   7cc50: 05 00 f3 01 00 00 00 00      	ja +0x1f3 <.text+0x7dad0>
   7cc58: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7cc60: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7cc68: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7cc70: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7cc78: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7cc80: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7cc88: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7cc90: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7cc98: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7cca0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7cca8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7ccb0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7ccb8: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7ccc8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7ccd0: 62 0a 80 ff 90 17 00 00      	stw [r10 - 0x80], 0x1790
   7ccd8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7cce0: 62 0a 00 ff 71 01 00 00      	stw [r10 - 0x100], 0x171
   7cce8: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7ccf0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7ccf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cd00: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   7cd08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7cd10: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7cd18: 85 10 00 00 c2 3d 02 00      	call 0x23dc2
   7cd20: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   7cd28: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   7cd30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cd38: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   7cd40: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   7cd48: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   7cd50: 85 10 00 00 84 0a ff ff      	call -0xf57c
   7cd58: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
   7cd60: 79 a9 a8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x158]
   7cd68: 15 09 4b ff 02 00 00 00      	jeq r9, 0x2, -0xb5 <.text+0x7c6a8>
   7cd70: 05 00 fc 01 00 00 00 00      	ja +0x1fc <.text+0x7dc38>
   7cd78: 65 07 39 00 ff ff ff ff      	jsgt r7, -0x1, +0x39 <.text+0x7ce28>
   7cd80: 05 00 a0 ff 00 00 00 00      	ja -0x60 <.text+0x7c968>
   7cd88: ad 10 01 00 00 00 00 00      	jlt r0, r1, +0x1 <.text+0x7cc78>
   7cd90: 05 00 91 00 00 00 00 00      	ja +0x91 <.text+0x7d100>
   7cd98: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   7cda0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cda8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7cdb0: 18 02 00 00 dc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5edc
   7cdc0: 85 10 00 00 b7 b4 01 00      	call 0x1b4b7
   7cdc8: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7cdd0: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7cdd8: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7cde0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7cdf0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7cdf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ce00: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7ce08: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7ce10: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7ce18: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7ce20: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7ce28: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7ce30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7ce38: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7ce40: 18 01 00 00 dc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5edc
   7ce50: 85 10 00 00 06 c2 01 00      	call 0x1c206
   7ce58: 15 00 7d 00 00 00 00 00      	jeq r0, 0x0, +0x7d <.text+0x7d128>
   7ce60: 05 00 b1 01 00 00 00 00      	ja +0x1b1 <.text+0x7dad0>
   7ce68: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7ce70: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7ce78: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7ce80: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7ce88: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7ce90: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7ce98: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7cea0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7cea8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7ceb0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7ceb8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7cec0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7cec8: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7ced8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7cee0: 62 0a 80 ff 94 17 00 00      	stw [r10 - 0x80], 0x1794
   7cee8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7cef0: 62 0a 00 ff 29 01 00 00      	stw [r10 - 0x100], 0x129
   7cef8: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7cf00: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7cf08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7cf10: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   7cf18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7cf20: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7cf28: 85 10 00 00 80 3d 02 00      	call 0x23d80
   7cf30: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]
   7cf38: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   7cf40: 05 00 61 01 00 00 00 00      	ja +0x161 <.text+0x7d930>
   7cf48: 65 01 01 00 ff ff ff ff      	jsgt r1, -0x1, +0x1 <.text+0x7ce38>
   7cf50: 05 00 66 ff 00 00 00 00      	ja -0x9a <.text+0x7c968>
   7cf58: ad 17 f5 01 00 00 00 00      	jlt r7, r1, +0x1f5 <.text+0x7dde8>
   7cf60: 79 82 10 02 00 00 00 00      	ldxdw r2, [r8 + 0x210]
   7cf68: 15 02 f3 01 00 00 00 00      	jeq r2, 0x0, +0x1f3 <.text+0x7dde8>
   7cf70: 65 02 01 00 ff ff ff ff      	jsgt r2, -0x1, +0x1 <.text+0x7ce60>
   7cf78: 05 00 61 ff 00 00 00 00      	ja -0x9f <.text+0x7c968>
   7cf80: 1f 17 00 00 00 00 00 00      	sub64 r7, r1
   7cf88: 3f 27 00 00 00 00 00 00      	div64 r7, r2
   7cf90: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7cf98: 85 10 00 00 05 02 00 00      	call 0x205
   7cfa0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   7cfa8: a5 01 76 00 1e 00 00 00      	jlt r1, 0x1e, +0x76 <.text+0x7d240>
   7cfb0: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   7cfb8: 2d 07 52 01 00 00 00 00      	jgt r7, r0, +0x152 <.text+0x7d930>
   7cfc0: 07 08 00 00 20 00 00 00      	add64 r8, 0x20
   7cfc8: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x7cec8>
   7cfd0: 3d 07 4f 01 00 00 00 00      	jge r7, r0, +0x14f <.text+0x7d930>
   7cfd8: 0f 17 00 00 00 00 00 00      	add64 r7, r1
   7cfe0: 2d 07 4d 01 00 00 00 00      	jgt r7, r0, +0x14d <.text+0x7d930>
   7cfe8: 25 07 d9 01 1d 00 00 00      	jgt r7, 0x1d, +0x1d9 <.text+0x7dd98>
   7cff0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   7cff8: 67 01 00 00 03 00 00 00      	lsh64 r1, 0x3
   7d000: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   7d008: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   7d010: 7b 62 00 00 00 00 00 00      	stxdw [r2 + 0x0], r6
   7d018: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   7d020: ad 07 f5 ff 00 00 00 00      	jlt r7, r0, -0xb <.text+0x7ceb0>
   7d028: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   7d030: 05 00 f3 ff 00 00 00 00      	ja -0xd <.text+0x7ceb0>
   7d038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d040: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7d048: 18 02 00 00 6c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f6c
   7d058: 85 10 00 00 64 b4 01 00      	call 0x1b464
   7d060: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7d068: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7d070: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7d078: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7d088: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7d090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d098: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7d0a0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7d0a8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7d0b0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7d0b8: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7d0c0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7d0c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d0d0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7d0d8: 18 01 00 00 6c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f6c
   7d0e8: 85 10 00 00 b3 c1 01 00      	call 0x1c1b3
   7d0f0: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x7cfe0>
   7d0f8: 05 00 5e 01 00 00 00 00      	ja +0x15e <.text+0x7dad0>
   7d100: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7d108: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7d110: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7d118: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7d120: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7d128: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7d130: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7d138: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7d140: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7d148: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7d150: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7d158: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7d160: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7d170: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7d178: 62 0a 80 ff 91 17 00 00      	stw [r10 - 0x80], 0x1791
   7d180: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7d188: 62 0a 00 ff 73 01 00 00      	stw [r10 - 0x100], 0x173
   7d190: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7d198: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7d1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d1a8: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   7d1b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d1b8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7d1c0: 85 10 00 00 2d 3d 02 00      	call 0x23d2d
   7d1c8: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   7d1d0: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   7d1d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d1e0: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   7d1e8: 79 a4 a8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x258]
   7d1f0: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   7d1f8: 85 10 00 00 ef 09 ff ff      	call -0xf611
   7d200: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   7d208: 79 a9 88 fe 00 00 00 00      	ldxdw r9, [r10 - 0x178]
   7d210: 15 09 b6 fe 02 00 00 00      	jeq r9, 0x2, -0x14a <.text+0x7c6a8>
   7d218: 05 00 67 01 00 00 00 00      	ja +0x167 <.text+0x7dc38>
   7d220: 67 01 00 00 03 00 00 00      	lsh64 r1, 0x3
   7d228: 0f 18 00 00 00 00 00 00      	add64 r8, r1
   7d230: 7b 58 20 00 00 00 00 00      	stxdw [r8 + 0x20], r5
   7d238: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   7d240: 05 00 01 01 00 00 00 00      	ja +0x101 <.text+0x7d930>
   7d248: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7d250: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7d258: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7d260: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7d268: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7d270: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7d278: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7d280: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7d288: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7d290: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7d298: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7d2a0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7d2a8: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7d2b8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7d2c0: 62 0a 80 ff 95 17 00 00      	stw [r10 - 0x80], 0x1795
   7d2c8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7d2d0: 62 0a 00 ff 35 01 00 00      	stw [r10 - 0x100], 0x135
   7d2d8: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7d2e0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7d2e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d2f0: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   7d2f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d300: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7d308: 85 10 00 00 04 3d 02 00      	call 0x23d04
   7d310: 79 a3 e0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x220]
   7d318: 79 a2 d8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x228]
   7d320: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d328: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   7d330: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   7d338: 79 a5 b0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x250]
   7d340: 85 10 00 00 1f 09 ff ff      	call -0xf6e1
   7d348: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   7d350: 79 a3 c8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x238]
   7d358: 05 00 de 00 00 00 00 00      	ja +0xde <.text+0x7d930>
   7d360: ad 10 01 00 00 00 00 00      	jlt r0, r1, +0x1 <.text+0x7d250>
   7d368: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0x7d518>
   7d370: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   7d378: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d380: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7d388: 18 02 00 00 dc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5edc
   7d398: 85 10 00 00 fc b3 01 00      	call 0x1b3fc
   7d3a0: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7d3a8: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7d3b0: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7d3b8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7d3c8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7d3d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d3d8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7d3e0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7d3e8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7d3f0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7d3f8: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7d400: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7d408: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d410: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7d418: 18 01 00 00 dc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5edc
   7d428: 85 10 00 00 4b c1 01 00      	call 0x1c14b
   7d430: 15 00 5b 00 00 00 00 00      	jeq r0, 0x0, +0x5b <.text+0x7d5f0>
   7d438: 05 00 f6 00 00 00 00 00      	ja +0xf6 <.text+0x7dad0>
   7d440: bf 56 00 00 00 00 00 00      	mov64 r6, r5
   7d448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d450: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7d458: 18 02 00 00 0c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e0c
   7d468: 85 10 00 00 e2 b3 01 00      	call 0x1b3e2
   7d470: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7d478: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7d480: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7d488: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7d498: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7d4a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d4a8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7d4b0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7d4b8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7d4c0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7d4c8: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7d4d0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7d4d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d4e0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7d4e8: 18 01 00 00 0c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e0c
   7d4f8: 85 10 00 00 31 c1 01 00      	call 0x1c131
   7d500: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x7d3f0>
   7d508: 05 00 dc 00 00 00 00 00      	ja +0xdc <.text+0x7dad0>
   7d510: 07 06 00 00 ff ff ff ff      	add64 r6, -0x1
   7d518: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7d520: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7d528: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7d530: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7d538: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7d540: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7d548: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7d550: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7d558: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7d560: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7d568: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7d570: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7d578: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7d588: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7d590: 62 0a 80 ff 92 17 00 00      	stw [r10 - 0x80], 0x1792
   7d598: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7d5a0: 62 0a 00 ff 75 01 00 00      	stw [r10 - 0x100], 0x175
   7d5a8: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7d5b0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7d5b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d5c0: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   7d5c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d5d0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7d5d8: 85 10 00 00 aa 3c 02 00      	call 0x23caa
   7d5e0: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   7d5e8: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   7d5f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d5f8: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   7d600: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   7d608: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   7d610: 85 10 00 00 6c 09 ff ff      	call -0xf694
   7d618: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   7d620: 79 a9 58 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1a8]
   7d628: 15 09 33 fe 02 00 00 00      	jeq r9, 0x2, -0x1cd <.text+0x7c6a8>
   7d630: 05 00 e4 00 00 00 00 00      	ja +0xe4 <.text+0x7dc38>
   7d638: 2d 17 01 00 00 00 00 00      	jgt r7, r1, +0x1 <.text+0x7d528>
   7d640: 05 00 5a 00 00 00 00 00      	ja +0x5a <.text+0x7d7f8>
   7d648: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d650: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7d658: 18 02 00 00 dc 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ddc
   7d668: 85 10 00 00 a2 b3 01 00      	call 0x1b3a2
   7d670: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7d678: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7d680: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7d688: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7d698: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7d6a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d6a8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7d6b0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7d6b8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7d6c0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7d6c8: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7d6d0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7d6d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d6e0: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7d6e8: 18 01 00 00 dc 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ddc
   7d6f8: 85 10 00 00 f1 c0 01 00      	call 0x1c0f1
   7d700: 15 00 47 00 00 00 00 00      	jeq r0, 0x0, +0x47 <.text+0x7d820>
   7d708: 05 00 9c 00 00 00 00 00      	ja +0x9c <.text+0x7dad0>
   7d710: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7d718: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7d720: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7d728: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7d730: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7d738: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7d740: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7d748: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7d750: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7d758: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7d760: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7d768: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7d770: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7d780: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7d788: 62 0a 80 ff 95 17 00 00      	stw [r10 - 0x80], 0x1795
   7d790: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7d798: 62 0a 00 ff 51 01 00 00      	stw [r10 - 0x100], 0x151
   7d7a0: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7d7a8: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7d7b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d7b8: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   7d7c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d7c8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7d7d0: 85 10 00 00 6b 3c 02 00      	call 0x23c6b
   7d7d8: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   7d7e0: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   7d7e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d7f0: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   7d7f8: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   7d800: 79 a5 b0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x250]
   7d808: 85 10 00 00 86 08 ff ff      	call -0xf77a
   7d810: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   7d818: 79 a3 f8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x208]
   7d820: 05 00 45 00 00 00 00 00      	ja +0x45 <.text+0x7d930>
   7d828: 65 01 01 00 ff ff ff ff      	jsgt r1, -0x1, +0x1 <.text+0x7d718>
   7d830: 05 00 4a fe 00 00 00 00      	ja -0x1b6 <.text+0x7c968>
   7d838: ad 17 eb 00 00 00 00 00      	jlt r7, r1, +0xeb <.text+0x7de78>
   7d840: 15 06 ea 00 00 00 00 00      	jeq r6, 0x0, +0xea <.text+0x7de78>
   7d848: 65 06 01 00 ff ff ff ff      	jsgt r6, -0x1, +0x1 <.text+0x7d738>
   7d850: 05 00 46 fe 00 00 00 00      	ja -0x1ba <.text+0x7c968>
   7d858: bf 79 00 00 00 00 00 00      	mov64 r9, r7
   7d860: 1f 39 00 00 00 00 00 00      	sub64 r9, r3
   7d868: 3f 69 00 00 00 00 00 00      	div64 r9, r6
   7d870: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7d878: 85 10 00 00 e9 00 00 00      	call 0xe9
   7d880: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   7d888: bd 96 3b 00 00 00 00 00      	jle r6, r9, +0x3b <.text+0x7d948>
   7d890: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   7d898: 07 01 00 00 10 01 00 00      	add64 r1, 0x110
   7d8a0: 07 09 00 00 01 00 00 00      	add64 r9, 0x1
   7d8a8: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x7d7a8>
   7d8b0: 3d 69 e2 fd 00 00 00 00      	jge r9, r6, -0x21e <.text+0x7c6a8>
   7d8b8: 0f 29 00 00 00 00 00 00      	add64 r9, r2
   7d8c0: 2d 69 e0 fd 00 00 00 00      	jgt r9, r6, -0x220 <.text+0x7c6a8>
   7d8c8: 25 09 c2 00 1d 00 00 00      	jgt r9, 0x1d, +0xc2 <.text+0x7ddc0>
   7d8d0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   7d8d8: 67 02 00 00 03 00 00 00      	lsh64 r2, 0x3
   7d8e0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   7d8e8: 0f 23 00 00 00 00 00 00      	add64 r3, r2
   7d8f0: 7a 03 00 00 00 00 00 00      	stdw [r3 + 0x0], 0x0
   7d8f8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   7d900: ad 69 f5 ff 00 00 00 00      	jlt r9, r6, -0xb <.text+0x7d790>
   7d908: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   7d910: 05 00 f3 ff 00 00 00 00      	ja -0xd <.text+0x7d790>
   7d918: 67 01 00 00 03 00 00 00      	lsh64 r1, 0x3
   7d920: 0f 18 00 00 00 00 00 00      	add64 r8, r1
   7d928: 7b 68 20 00 00 00 00 00      	stxdw [r8 + 0x20], r6
   7d930: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   7d938: 05 00 22 00 00 00 00 00      	ja +0x22 <.text+0x7d930>
   7d940: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7d948: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7d950: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7d958: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7d960: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7d968: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7d970: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7d978: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7d980: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7d988: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7d990: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7d998: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7d9a0: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7d9b0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7d9b8: 62 0a 80 ff 96 17 00 00      	stw [r10 - 0x80], 0x1796
   7d9c0: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7d9c8: 62 0a 00 ff 52 01 00 00      	stw [r10 - 0x100], 0x152
   7d9d0: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7d9d8: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7d9e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7d9e8: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   7d9f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7d9f8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7da00: 85 10 00 00 25 3c 02 00      	call 0x23c25
   7da08: 79 a3 30 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d0]
   7da10: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   7da18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7da20: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   7da28: 79 a4 b0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x250]
   7da30: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   7da38: 85 10 00 00 40 08 ff ff      	call -0xf7c0
   7da40: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   7da48: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   7da50: 15 03 60 00 02 00 00 00      	jeq r3, 0x2, +0x60 <.text+0x7dc38>
   7da58: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   7da60: 05 00 5e 00 00 00 00 00      	ja +0x5e <.text+0x7dc38>
   7da68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7da70: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7da78: 18 02 00 00 28 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f28
   7da88: 85 10 00 00 1e b3 01 00      	call 0x1b31e
   7da90: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7da98: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7daa0: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7daa8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7dab8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7dac0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7dac8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7dad0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7dad8: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7dae0: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7dae8: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7daf0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7daf8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7db00: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7db08: 18 01 00 00 28 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f28
   7db18: 85 10 00 00 6d c0 01 00      	call 0x1c06d
   7db20: 15 00 4a 00 00 00 00 00      	jeq r0, 0x0, +0x4a <.text+0x7dc58>
   7db28: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x7dad0>
   7db30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7db38: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   7db40: 18 02 00 00 b0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5eb0
   7db50: 85 10 00 00 05 b3 01 00      	call 0x1b305
   7db58: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
   7db60: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   7db68: 7a 0a a0 ff 00 00 00 00      	stdw [r10 - 0x60], 0x0
   7db70: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   7db80: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   7db88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7db90: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   7db98: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   7dba0: 72 0a f0 ff 03 00 00 00      	stb [r10 - 0x10], 0x3
   7dba8: 7a 0a e8 ff 20 00 00 00      	stdw [r10 - 0x18], 0x20
   7dbb0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   7dbb8: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   7dbc0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7dbc8: 07 02 00 00 b8 ff ff ff      	add64 r2, -0x48
   7dbd0: 18 01 00 00 b0 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5eb0
   7dbe0: 85 10 00 00 54 c0 01 00      	call 0x1c054
   7dbe8: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x7db20>
   7dbf0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7dbf8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7dc00: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   7dc10: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   7dc18: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   7dc28: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   7dc38: 85 10 00 00 3b 5e 02 00      	call 0x25e3b
   7dc40: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7dc48: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7dc50: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7dc58: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7dc60: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7dc68: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7dc70: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7dc78: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7dc80: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7dc88: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7dc90: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7dc98: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7dca0: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7dcb0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7dcb8: 62 0a 80 ff 8f 17 00 00      	stw [r10 - 0x80], 0x178f
   7dcc0: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7dcc8: 62 0a 00 ff 67 01 00 00      	stw [r10 - 0x100], 0x167
   7dcd0: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7dcd8: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7dce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7dce8: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   7dcf0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7dcf8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7dd00: 85 10 00 00 c5 3b 02 00      	call 0x23bc5
   7dd08: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   7dd10: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   7dd18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7dd20: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   7dd28: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   7dd30: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   7dd38: 85 10 00 00 87 08 ff ff      	call -0xf779
   7dd40: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   7dd48: 79 a9 c8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x138]
   7dd50: 15 09 4e fd 02 00 00 00      	jeq r9, 0x2, -0x2b2 <.text+0x7c6a8>
   7dd58: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   7dd60: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   7dd68: 7b 91 00 00 00 00 00 00      	stxdw [r1 + 0x0], r9
   7dd70: 95 00 00 00 00 00 00 00      	exit
   7dd78: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   7dd80: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   7dd88: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   7dd90: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   7dd98: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   7dda0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   7dda8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   7ddb0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   7ddb8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   7ddc0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   7ddc8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   7ddd0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   7ddd8: 18 01 00 00 ea 70 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b70ea
   7dde8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   7ddf0: 62 0a 80 ff 93 17 00 00      	stw [r10 - 0x80], 0x1793
   7ddf8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   7de00: 62 0a 00 ff 8a 01 00 00      	stw [r10 - 0x100], 0x18a
   7de08: 7a 0a f8 fe 38 00 00 00      	stdw [r10 - 0x108], 0x38
   7de10: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   7de18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7de20: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   7de28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   7de30: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   7de38: 85 10 00 00 9e 3b 02 00      	call 0x23b9e
   7de40: 79 a3 50 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b0]
   7de48: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   7de50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7de58: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   7de60: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   7de68: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   7de70: 85 10 00 00 b9 07 ff ff      	call -0xf847
   7de78: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   7de80: 79 a9 38 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1c8]
   7de88: 15 09 27 fd 02 00 00 00      	jeq r9, 0x2, -0x2d9 <.text+0x7c6a8>
   7de90: 05 00 d8 ff 00 00 00 00      	ja -0x28 <.text+0x7dc38>
   7de98: b7 02 00 00 1e 00 00 00      	mov64 r2, 0x1e
   7dea0: 18 03 00 00 58 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdd58
   7deb0: 85 10 00 00 62 5d 02 00      	call 0x25d62
   7deb8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   7dec0: b7 02 00 00 1e 00 00 00      	mov64 r2, 0x1e
   7dec8: 18 03 00 00 88 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdd88
   7ded8: 85 10 00 00 5d 5d 02 00      	call 0x25d5d
   7dee0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   7dee8: b7 02 00 00 1e 00 00 00      	mov64 r2, 0x1e
   7def0: 18 03 00 00 b8 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bddb8
   7df00: 85 10 00 00 58 5d 02 00      	call 0x25d58
   7df08: 18 01 00 00 bd 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b71bd
   7df18: b7 02 00 00 32 00 00 00      	mov64 r2, 0x32
   7df20: 18 03 00 00 70 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdd70
   7df30: 85 10 00 00 be 5c 02 00      	call 0x25cbe
   7df38: 18 01 00 00 22 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b7122
   7df48: b7 02 00 00 13 00 00 00      	mov64 r2, 0x13
   7df50: 18 03 00 00 e8 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdde8
   7df60: 85 10 00 00 b8 5c 02 00      	call 0x25cb8
   7df68: 18 01 00 00 22 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b7122
   7df78: b7 02 00 00 13 00 00 00      	mov64 r2, 0x13
   7df80: 18 03 00 00 d0 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bddd0
   7df90: 85 10 00 00 b2 5c 02 00      	call 0x25cb2
   7df98: 18 01 00 00 bd 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b71bd
   7dfa8: b7 02 00 00 32 00 00 00      	mov64 r2, 0x32
   7dfb0: 18 03 00 00 a0 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdda0
   7dfc0: 85 10 00 00 ac 5c 02 00      	call 0x25cac
   7dfc8: 79 10 08 02 00 00 00 00      	ldxdw r0, [r1 + 0x208]
   7dfd0: 65 00 0a 00 ff ff ff ff      	jsgt r0, -0x1, +0xa <.text+0x7df08>
   7dfd8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7dfe0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7dfe8: 18 01 00 00 2e 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b722e
   7dff8: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   7e000: 18 04 00 00 48 de 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bde48
   7e010: 18 05 00 00 68 de 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bde68
   7e020: 85 10 00 00 be 5d 02 00      	call 0x25dbe
   7e028: 79 12 00 02 00 00 00 00      	ldxdw r2, [r1 + 0x200]
   7e030: 65 02 01 00 ff ff ff ff      	jsgt r2, -0x1, +0x1 <.text+0x7df20>
   7e038: 05 00 f3 ff 00 00 00 00      	ja -0xd <.text+0x7deb8>
   7e040: ad 20 07 00 00 00 00 00      	jlt r0, r2, +0x7 <.text+0x7df60>
   7e048: 79 11 10 02 00 00 00 00      	ldxdw r1, [r1 + 0x210]
   7e050: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x7df60>
   7e058: 65 01 01 00 ff ff ff ff      	jsgt r1, -0x1, +0x1 <.text+0x7df48>
   7e060: 05 00 ee ff 00 00 00 00      	ja -0x12 <.text+0x7deb8>
   7e068: 1f 20 00 00 00 00 00 00      	sub64 r0, r2
   7e070: 3f 10 00 00 00 00 00 00      	div64 r0, r1
   7e078: 95 00 00 00 00 00 00 00      	exit
   7e080: 18 01 00 00 ef 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b71ef
   7e090: b7 02 00 00 29 00 00 00      	mov64 r2, 0x29
   7e098: 18 03 00 00 00 de 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bde00
   7e0a8: 85 10 00 00 8f 5c 02 00      	call 0x25c8f
