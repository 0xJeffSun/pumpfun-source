   81a78: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   81a80: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   81a88: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   81a90: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   81a98: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   81aa0: 18 01 00 00 51 e1 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xae151 ; data 'Instruction: BuyV2Instruction: SellPumpSwapInstruction: BuyPumpSwap'
   81ab0: b7 02 00 00 12 00 00 00      	mov64 r2, 0x12
   81ab8: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   81ac0: a5 09 04 00 10 00 00 00      	jlt r9, 0x10, +0x4 <.text+0x819c8>
   81ac8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81ad0: 57 01 00 00 fe ff ff ff      	and64 r1, -0x2
   81ad8: 15 01 01 00 10 00 00 00      	jeq r1, 0x10, +0x1 <.text+0x819c8>
   81ae0: 55 01 15 00 12 00 00 00      	jne r1, 0x12, +0x15 <.text+0x81a70>
   81ae8: 18 01 00 00 20 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1220
   81af8: 85 10 00 00 c6 41 00 00      	call 0x41c6 ; target 0xa2930
   81b00: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   81b08: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   81b10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   81b18: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   81b20: a5 02 06 00 02 00 00 00      	jlt r2, 0x2, +0x6 <.text+0x81a38>
   81b28: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x81a38>
   81b30: 79 01 07 00 00 00 00 00      	ldxdw r1, [r0 + 0x7]
   81b38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   81b40: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x81a38>
   81b48: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
   81b50: 8d 00 00 00 02 00 00 00      	callx r2
   81b58: b7 01 00 00 66 00 00 00      	mov64 r1, 0x66
   81b60: 85 10 00 00 50 31 00 00      	call 0x3150 ; target 0x9a5e8
   81b68: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   81b70: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   81b78: bf 80 00 00 00 00 00 00      	mov64 r0, r8
   81b80: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81b88: 95 00 00 00 00 00 00 00      	exit
   81b90: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   81b98: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   81ba0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   81ba8: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   81bb0: 69 81 10 00 00 00 00 00      	ldxh r1, [r8 + 0x10]
   81bb8: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   81bc0: 69 81 12 00 00 00 00 00      	ldxh r1, [r8 + 0x12]
   81bc8: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   81bd0: b7 01 00 00 ff ff ff ff      	mov64 r1, -0x1
   81bd8: 73 1a d4 fd 00 00 00 00      	stxb [r10 - 0x22c], r1
   81be0: 63 1a d0 fd 00 00 00 00      	stxw [r10 - 0x230], r1
   81be8: 7b 6a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r6
   81bf0: 7b 7a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r7
   81bf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81c00: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   81c08: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   81c10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81c18: 07 01 00 00 d0 fd ff ff      	add64 r1, -0x230
   81c20: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   81c28: 7b 9a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r9
   81c30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81c38: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   81c40: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   81c48: 07 03 00 00 f0 fd ff ff      	add64 r3, -0x210
   81c50: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   81c58: 79 a7 c8 fd 00 00 00 00      	ldxdw r7, [r10 - 0x238]
   81c60: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   81c68: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   81c70: 85 10 00 00 4c b5 ff ff      	call -0x4ab4 ; target 0x5c6d8
   81c78: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   81c80: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   81c88: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   81c90: 15 06 dc ff 00 00 00 00      	jeq r6, 0x0, -0x24 <.text+0x81a58>
   81c98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81ca0: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   81ca8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   81cb0: 07 02 00 00 18 ff ff ff      	add64 r2, -0xe8
   81cb8: b7 03 00 00 e8 00 00 00      	mov64 r3, 0xe8
   81cc0: 85 10 00 00 18 51 00 00      	call 0x5118 ; target 0xaa588
   81cc8: 7b 9a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r9
   81cd0: 7b 8a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r8
   81cd8: 7b 6a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r6
   81ce0: 61 a1 d0 fd 00 00 00 00      	ldxw r1, [r10 - 0x230]
   81ce8: 63 1a 20 ff 00 00 00 00      	stxw [r10 - 0xe0], r1
   81cf0: 71 a1 d4 fd 00 00 00 00      	ldxb r1, [r10 - 0x22c]
   81cf8: 73 1a 24 ff 00 00 00 00      	stxb [r10 - 0xdc], r1
   81d00: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   81d08: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   81d10: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   81d18: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   81d20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81d28: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   81d30: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   81d38: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   81d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81d48: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   81d50: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   81d58: 79 a3 c0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x240]
   81d60: 79 a4 b8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x248]
   81d68: 79 a5 b0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x250]
   81d70: 85 10 00 00 ed 40 ff ff      	call -0xbf13 ; target 0x224e0
   81d78: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   81d80: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   81d88: 55 08 bd ff 02 00 00 00      	jne r8, 0x2, -0x43 <.text+0x81a58>
   81d90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81d98: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   81da0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   81da8: 85 10 00 00 c5 bd ff ff      	call -0x423b ; target 0x60bd8
   81db0: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0x81a48>
