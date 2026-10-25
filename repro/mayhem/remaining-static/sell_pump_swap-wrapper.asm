   81db8: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   81dc0: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   81dc8: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   81dd0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   81dd8: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   81de0: 18 01 00 00 63 e1 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xae163 ; data 'Instruction: SellPumpSwapInstruction: BuyPumpSwap'
   81df0: b7 02 00 00 19 00 00 00      	mov64 r2, 0x19
   81df8: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   81e00: a5 09 04 00 10 00 00 00      	jlt r9, 0x10, +0x4 <.text+0x81d08>
   81e08: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81e10: 57 01 00 00 fe ff ff ff      	and64 r1, -0x2
   81e18: 15 01 01 00 10 00 00 00      	jeq r1, 0x10, +0x1 <.text+0x81d08>
   81e20: 55 01 15 00 12 00 00 00      	jne r1, 0x12, +0x15 <.text+0x81db0>
   81e28: 18 01 00 00 20 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1220
   81e38: 85 10 00 00 5e 41 00 00      	call 0x415e ; target 0xa2930
   81e40: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   81e48: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   81e50: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   81e58: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   81e60: a5 02 06 00 02 00 00 00      	jlt r2, 0x2, +0x6 <.text+0x81d78>
   81e68: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x81d78>
   81e70: 79 01 07 00 00 00 00 00      	ldxdw r1, [r0 + 0x7]
   81e78: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   81e80: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x81d78>
   81e88: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
   81e90: 8d 00 00 00 02 00 00 00      	callx r2
   81e98: b7 01 00 00 66 00 00 00      	mov64 r1, 0x66
   81ea0: 85 10 00 00 e8 30 00 00      	call 0x30e8 ; target 0x9a5e8
   81ea8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   81eb0: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   81eb8: bf 80 00 00 00 00 00 00      	mov64 r0, r8
   81ec0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81ec8: 95 00 00 00 00 00 00 00      	exit
   81ed0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   81ed8: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   81ee0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   81ee8: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   81ef0: 69 81 10 00 00 00 00 00      	ldxh r1, [r8 + 0x10]
   81ef8: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   81f00: 69 81 12 00 00 00 00 00      	ldxh r1, [r8 + 0x12]
   81f08: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   81f10: b7 01 00 00 ff ff ff ff      	mov64 r1, -0x1
   81f18: 73 1a 04 fe 00 00 00 00      	stxb [r10 - 0x1fc], r1
   81f20: 63 1a 00 fe 00 00 00 00      	stxw [r10 - 0x200], r1
   81f28: 7b 6a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r6
   81f30: 7b 7a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r7
   81f38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81f40: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   81f48: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   81f50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81f58: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   81f60: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   81f68: 7b 9a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r9
   81f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81f78: 07 01 00 00 18 ff ff ff      	add64 r1, -0xe8
   81f80: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   81f88: 07 03 00 00 20 fe ff ff      	add64 r3, -0x1e0
   81f90: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   81f98: 79 a7 f8 fd 00 00 00 00      	ldxdw r7, [r10 - 0x208]
   81fa0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   81fa8: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   81fb0: 85 10 00 00 9c 95 ff ff      	call -0x6a64 ; target 0x4cc98
   81fb8: 79 a9 28 ff 00 00 00 00      	ldxdw r9, [r10 - 0xd8]
   81fc0: 79 a8 20 ff 00 00 00 00      	ldxdw r8, [r10 - 0xe0]
   81fc8: 79 a6 18 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe8]
   81fd0: 15 06 dc ff 00 00 00 00      	jeq r6, 0x0, -0x24 <.text+0x81d98>
   81fd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81fe0: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   81fe8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   81ff0: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   81ff8: b7 03 00 00 d0 00 00 00      	mov64 r3, 0xd0
   82000: 85 10 00 00 b0 50 00 00      	call 0x50b0 ; target 0xaa588
   82008: 7b 9a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r9
   82010: 7b 8a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r8
   82018: 7b 6a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r6
   82020: 61 a1 00 fe 00 00 00 00      	ldxw r1, [r10 - 0x200]
   82028: 63 1a 38 ff 00 00 00 00      	stxw [r10 - 0xc8], r1
   82030: 71 a1 04 fe 00 00 00 00      	ldxb r1, [r10 - 0x1fc]
   82038: 73 1a 3c ff 00 00 00 00      	stxb [r10 - 0xc4], r1
   82040: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   82048: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   82050: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   82058: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   82060: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82068: 07 01 00 00 30 fe ff ff      	add64 r1, -0x1d0
   82070: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   82078: 7b 7a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r7
   82080: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   82088: 07 01 00 00 18 ff ff ff      	add64 r1, -0xe8
   82090: 79 a2 d8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x228]
   82098: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   820a0: 79 a4 e8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x218]
   820a8: 79 a5 e0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x220]
   820b0: 85 10 00 00 b6 2a ff ff      	call -0xd54a ; target 0x17668
   820b8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   820c0: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   820c8: 55 08 bd ff 02 00 00 00      	jne r8, 0x2, -0x43 <.text+0x81d98>
   820d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   820d8: 07 01 00 00 30 fe ff ff      	add64 r1, -0x1d0
   820e0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   820e8: 85 10 00 00 91 9e ff ff      	call -0x616f ; target 0x51578
   820f0: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0x81d88>
