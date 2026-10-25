   81738: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   81740: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   81748: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   81750: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   81758: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   81760: 18 01 00 00 3e e1 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xae13e ; data 'Instruction: SellV2Instruction: BuyV2Instruction: SellPumpSwapInstruction: BuyPumpSwap'
   81770: b7 02 00 00 13 00 00 00      	mov64 r2, 0x13
   81778: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   81780: a5 09 04 00 10 00 00 00      	jlt r9, 0x10, +0x4 <.text+0x81688>
   81788: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81790: 57 01 00 00 fe ff ff ff      	and64 r1, -0x2
   81798: 15 01 01 00 10 00 00 00      	jeq r1, 0x10, +0x1 <.text+0x81688>
   817a0: 55 01 15 00 12 00 00 00      	jne r1, 0x12, +0x15 <.text+0x81730>
   817a8: 18 01 00 00 20 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1220
   817b8: 85 10 00 00 2e 42 00 00      	call 0x422e ; target 0xa2930
   817c0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   817c8: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   817d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   817d8: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   817e0: a5 02 06 00 02 00 00 00      	jlt r2, 0x2, +0x6 <.text+0x816f8>
   817e8: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x816f8>
   817f0: 79 01 07 00 00 00 00 00      	ldxdw r1, [r0 + 0x7]
   817f8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   81800: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x816f8>
   81808: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
   81810: 8d 00 00 00 02 00 00 00      	callx r2
   81818: b7 01 00 00 66 00 00 00      	mov64 r1, 0x66
   81820: 85 10 00 00 b8 31 00 00      	call 0x31b8 ; target 0x9a5e8
   81828: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   81830: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   81838: bf 80 00 00 00 00 00 00      	mov64 r0, r8
   81840: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81848: 95 00 00 00 00 00 00 00      	exit
   81850: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   81858: 7b 1a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r1
   81860: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   81868: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   81870: 69 81 10 00 00 00 00 00      	ldxh r1, [r8 + 0x10]
   81878: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   81880: 69 81 12 00 00 00 00 00      	ldxh r1, [r8 + 0x12]
   81888: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   81890: b7 01 00 00 ff ff ff ff      	mov64 r1, -0x1
   81898: 73 1a e4 fd 00 00 00 00      	stxb [r10 - 0x21c], r1
   818a0: 63 1a e0 fd 00 00 00 00      	stxw [r10 - 0x220], r1
   818a8: 7b 6a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r6
   818b0: 7b 7a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r7
   818b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   818c0: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   818c8: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   818d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   818d8: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   818e0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   818e8: 7b 9a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r9
   818f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   818f8: 07 01 00 00 08 ff ff ff      	add64 r1, -0xf8
   81900: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   81908: 07 03 00 00 00 fe ff ff      	add64 r3, -0x200
   81910: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   81918: 79 a7 d8 fd 00 00 00 00      	ldxdw r7, [r10 - 0x228]
   81920: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   81928: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   81930: 85 10 00 00 41 c0 ff ff      	call -0x3fbf ; target 0x61b40
   81938: 79 a9 18 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe8]
   81940: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   81948: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   81950: 15 06 dc ff 00 00 00 00      	jeq r6, 0x0, -0x24 <.text+0x81718>
   81958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81960: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   81968: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   81970: 07 02 00 00 20 ff ff ff      	add64 r2, -0xe0
   81978: b7 03 00 00 e0 00 00 00      	mov64 r3, 0xe0
   81980: 85 10 00 00 80 51 00 00      	call 0x5180 ; target 0xaa588
   81988: 7b 9a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r9
   81990: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   81998: 7b 6a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r6
   819a0: 61 a1 e0 fd 00 00 00 00      	ldxw r1, [r10 - 0x220]
   819a8: 63 1a 28 ff 00 00 00 00      	stxw [r10 - 0xd8], r1
   819b0: 71 a1 e4 fd 00 00 00 00      	ldxb r1, [r10 - 0x21c]
   819b8: 73 1a 2c ff 00 00 00 00      	stxb [r10 - 0xd4], r1
   819c0: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   819c8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   819d0: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   819d8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   819e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   819e8: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   819f0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   819f8: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   81a00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81a08: 07 01 00 00 08 ff ff ff      	add64 r1, -0xf8
   81a10: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   81a18: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   81a20: 79 a4 c8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x238]
   81a28: 79 a5 c0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x240]
   81a30: 85 10 00 00 70 4a ff ff      	call -0xb590 ; target 0x26db8
   81a38: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   81a40: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   81a48: 55 08 bd ff 02 00 00 00      	jne r8, 0x2, -0x43 <.text+0x81718>
   81a50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81a58: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   81a60: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   81a68: 85 10 00 00 bf c8 ff ff      	call -0x3741 ; target 0x66068
   81a70: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0x81708>
