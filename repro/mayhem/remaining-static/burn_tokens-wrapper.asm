   7ff08: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   7ff10: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   7ff18: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   7ff20: 18 01 00 00 bb e0 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xae0bb ; data 'Instruction: BurnTokensInstruction: ExtendAccountInstruction: UpdateGlobalParamsInstruction: InitializeMayhemS'
   7ff30: b7 02 00 00 17 00 00 00      	mov64 r2, 0x17
   7ff38: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   7ff40: 62 0a cc fb ff ff ff ff      	stw [r10 - 0x434], -0x1
   7ff48: 7b 7a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r7
   7ff50: 7b 8a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r8
   7ff58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ff60: 07 01 00 00 cc fb ff ff      	add64 r1, -0x434
   7ff68: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   7ff70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7ff78: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   7ff80: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7ff88: 07 03 00 00 d0 fb ff ff      	add64 r3, -0x430
   7ff90: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   7ff98: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   7ffa0: 85 10 00 00 d9 70 ff ff      	call -0x8f27 ; target 0x38670
   7ffa8: 61 a7 f0 fd 00 00 00 00      	ldxw r7, [r10 - 0x210]
   7ffb0: 55 07 03 00 02 00 00 00      	jne r7, 0x2, +0x3 <.text+0x7feb0>
   7ffb8: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   7ffc0: 79 a0 f8 fd 00 00 00 00      	ldxdw r0, [r10 - 0x208]
   7ffc8: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0x7ffb8>
   7ffd0: 61 a1 f4 fd 00 00 00 00      	ldxw r1, [r10 - 0x20c]
   7ffd8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   7ffe0: 79 a9 f8 fd 00 00 00 00      	ldxdw r9, [r10 - 0x208]
   7ffe8: 79 a8 00 fe 00 00 00 00      	ldxdw r8, [r10 - 0x200]
   7fff0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   7fff8: 07 01 00 00 f8 fb ff ff      	add64 r1, -0x408
   80000: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   80008: 07 02 00 00 08 fe ff ff      	add64 r2, -0x1f8
   80010: b7 03 00 00 f8 01 00 00      	mov64 r3, 0x1f8
   80018: 85 10 00 00 ad 54 00 00      	call 0x54ad ; target 0xaa588
   80020: 7b 8a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r8
   80028: 7b 9a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r9
   80030: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   80038: 63 1a e4 fb 00 00 00 00      	stxw [r10 - 0x41c], r1
   80040: 63 7a e0 fb 00 00 00 00      	stxw [r10 - 0x420], r7
   80048: 61 a1 cc fb 00 00 00 00      	ldxw r1, [r10 - 0x434]
   80050: 63 1a 10 fe 00 00 00 00      	stxw [r10 - 0x1f0], r1
   80058: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   80060: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   80068: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   80070: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   80078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   80080: 07 01 00 00 e0 fb ff ff      	add64 r1, -0x420
   80088: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   80090: 7b 6a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r6
   80098: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   800a0: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   800a8: 85 10 00 00 fd 1a ff ff      	call -0xe503 ; target 0xd898
   800b0: 55 00 04 00 02 00 00 00      	jne r0, 0x2, +0x4 <.text+0x7ffb8>
   800b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   800c0: 07 01 00 00 e0 fb ff ff      	add64 r1, -0x420
   800c8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   800d0: 85 10 00 00 dc 75 ff ff      	call -0x8a24 ; target 0x3afb8
   800d8: 95 00 00 00 00 00 00 00      	exit
