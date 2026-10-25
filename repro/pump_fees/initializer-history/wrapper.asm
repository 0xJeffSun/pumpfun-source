   96b90: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   96b98: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   96ba0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   96ba8: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   96bb0: 18 01 00 00 e0 35 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc35e0 ; data 'Instruction: InitializeFeeConfig'
   96bc0: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   96bc8: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   96bd0: 6a 0a de fd ff ff 00 00      	sth [r10 - 0x222], 0xffff
   96bd8: 7b 8a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r8
   96be0: 7b 9a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r9
   96be8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96bf0: 07 01 00 00 de fd ff ff      	add64 r1, -0x222
   96bf8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   96c00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96c08: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   96c10: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   96c18: 07 03 00 00 e0 fd ff ff      	add64 r3, -0x220
   96c20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   96c28: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   96c30: 85 10 00 00 e8 62 ff ff      	call -0x9d18 ; target 0x48378
   96c38: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   96c40: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]
   96c48: 79 a6 f8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x108]
   96c50: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   96c60: 1d 16 70 00 00 00 00 00      	jeq r6, r1, +0x70 <.text+0x96ec8> ; branch 0x96fe8
   96c68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96c70: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   96c78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96c80: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   96c88: b7 03 00 00 f0 00 00 00      	mov64 r3, 0xf0
   96c90: 85 10 00 00 46 57 00 00      	call 0x5746 ; target 0xc26c8
   96c98: 7b 9a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r9
   96ca0: 7b 8a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r8
   96ca8: 7b 6a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r6
   96cb0: 71 a1 df fd 00 00 00 00      	ldxb r1, [r10 - 0x221]
   96cb8: 73 1a 19 ff 00 00 00 00      	stxb [r10 - 0xe7], r1
   96cc0: 71 a1 de fd 00 00 00 00      	ldxb r1, [r10 - 0x222]
   96cc8: 73 1a 18 ff 00 00 00 00      	stxb [r10 - 0xe8], r1
   96cd0: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   96cd8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   96ce0: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   96ce8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   96cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96cf8: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   96d00: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   96d08: 7b 7a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r7
   96d10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96d18: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   96d20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96d28: 07 02 00 00 f8 fe ff ff      	add64 r2, -0x108
   96d30: 85 10 00 00 ba fa fe ff      	call -0x10546 ; target 0x14308
   96d38: 79 a8 c8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x238]
   96d40: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0x96c30> ; branch 0x96d50
   96d48: 05 00 32 00 00 00 00 00      	ja +0x32 <.text+0x96dc0> ; branch 0x96ee0
   96d50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96d58: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   96d60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96d68: 07 02 00 00 f0 fd ff ff      	add64 r2, -0x210
   96d70: 18 03 00 00 ad 4e 0c 00 00 00 00 00 00 00 00 00      	lddw r3, 0xc4ead
   96d80: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   96d88: 85 10 00 00 1e de fe ff      	call -0x121e2 ; target 0x5e80
   96d90: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   96d98: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   96da0: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <.text+0x96cd0> ; branch 0x96df0
   96da8: 79 a3 c0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x240]
   96db0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96db8: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   96dc0: 18 04 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   96dd0: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   96dd8: 85 10 00 00 f5 d4 fe ff      	call -0x12b0b ; target 0x1588
   96de0: 79 a9 b0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x250]
   96de8: 79 a8 a8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x258]
   96df0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   96df8: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   96e00: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   96e08: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96e10: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   96e18: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x96d18> ; branch 0x96e38
   96e20: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   96e28: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96e30: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   96e38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   96e40: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96e48: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   96e50: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x96d50> ; branch 0x96e70
   96e58: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   96e60: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96e68: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   96e70: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   96e78: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   96e80: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   96e88: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96e90: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   96e98: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x96d98> ; branch 0x96eb8
   96ea0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   96ea8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96eb0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   96eb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   96ec0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96ec8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   96ed0: 55 02 22 00 00 00 00 00      	jne r2, 0x0, +0x22 <.text+0x96ec8> ; branch 0x96fe8
   96ed8: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0x96eb0> ; branch 0x96fd0
   96ee0: 79 a9 d0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x230]
   96ee8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   96ef0: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   96ef8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   96f00: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96f08: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   96f10: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x96e10> ; branch 0x96f30
   96f18: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   96f20: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96f28: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   96f30: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   96f38: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96f40: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   96f48: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x96e48> ; branch 0x96f68
   96f50: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   96f58: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96f60: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   96f68: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   96f70: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   96f78: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   96f80: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96f88: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   96f90: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x96e90> ; branch 0x96fb0
   96f98: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   96fa0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   96fa8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   96fb0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   96fb8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96fc0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   96fc8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x96ec8> ; branch 0x96fe8
   96fd0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   96fd8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   96fe0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   96fe8: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   96ff0: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   96ff8: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   97000: 95 00 00 00 00 00 00 00      	exit
