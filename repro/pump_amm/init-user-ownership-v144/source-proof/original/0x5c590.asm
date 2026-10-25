
evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   5c590: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   5c598: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   5c5a0: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   5c5a8: 79 81 48 00 00 00 00 00      	ldxdw r1, [r8 + 0x48]
   5c5b0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   5c5b8: 79 81 40 00 00 00 00 00      	ldxdw r1, [r8 + 0x40]
   5c5c0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   5c5c8: 79 87 38 00 00 00 00 00      	ldxdw r7, [r8 + 0x38]
   5c5d0: 79 89 30 00 00 00 00 00      	ldxdw r9, [r8 + 0x30]
   5c5d8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5c5e0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c5e8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c5f0: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   5c5f8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c600: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
   5c608: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c610: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   5c618: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c620: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   5c628: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c630: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   5c638: 85 10 00 00 ff 54 01 00      	call 0x154ff
   5c640: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   5c648: 55 01 26 00 00 00 00 00      	jne r1, 0x0, +0x26 <.text+0x5c660>
   5c650: 7b 9a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r9
   5c658: 7b 6a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r6
   5c660: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   5c668: 79 a0 d8 fe 00 00 00 00      	ldxdw r0, [r10 - 0x128]
   5c670: 7b 7a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r7
   5c678: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   5c680: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5c688: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   5c690: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5c698: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   5c6a0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5c6a8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   5c6b0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   5c6b8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5c6c8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c6d0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5c6d8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5c6e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5c6e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5c6f0: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <.text+0x5c5e0>
   5c6f8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5c700: 79 a5 c8 fe 00 00 00 00      	ldxdw r5, [r10 - 0x138]
   5c708: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   5c710: 79 a0 e0 fe 00 00 00 00      	ldxdw r0, [r10 - 0x120]
   5c718: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0x5c608>
   5c720: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5c728: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   5c738: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5c628>
   5c740: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5c748: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5c758: 79 a4 d0 fe 00 00 00 00      	ldxdw r4, [r10 - 0x130]
   5c760: 2d 21 12 00 00 00 00 00      	jgt r1, r2, +0x12 <.text+0x5c6d8>
   5c768: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5c770: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   5c778: 85 10 00 00 79 69 01 00      	call 0x16979
   5c780: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   5c788: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   5c790: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   5c798: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   5c7a0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   5c7a8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5c7b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c7b8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   5c7c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c7c8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   5c7d0: 85 10 00 00 0d 4d 01 00      	call 0x14d0d
   5c7d8: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   5c7e0: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   5c7e8: 79 a0 e8 fe 00 00 00 00      	ldxdw r0, [r10 - 0x118]
   5c7f0: 05 00 0e 01 00 00 00 00      	ja +0x10e <.text+0x5cf48>
   5c7f8: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   5c800: 79 a3 58 ff 00 00 00 00      	ldxdw r3, [r10 - 0xa8]
   5c808: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5c818: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5c820: 18 02 00 00 92 9f bd ac 00 00 00 00 92 58 38 f4      	lddw r2, -0xbc7a76d5342606e
   5c830: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c838: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   5c840: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c848: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   5c850: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   5c858: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   5c860: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   5c868: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   5c870: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   5c878: 7b 01 48 00 00 00 00 00      	stxdw [r1 + 0x48], r0
   5c880: 7b 71 40 00 00 00 00 00      	stxdw [r1 + 0x40], r7
   5c888: 7b 51 38 00 00 00 00 00      	stxdw [r1 + 0x38], r5
   5c890: 7b 41 30 00 00 00 00 00      	stxdw [r1 + 0x30], r4
   5c898: 7b 3a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r3
   5c8a0: 7b 31 28 00 00 00 00 00      	stxdw [r1 + 0x28], r3
   5c8a8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5c8b0: 7a 0a 38 ff 50 00 00 00      	stdw [r10 - 0xc8], 0x50
   5c8b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c8c0: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   5c8c8: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
   5c8d0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5c8d8: 85 10 00 00 34 54 01 00      	call 0x15434
   5c8e0: 79 85 70 00 00 00 00 00      	ldxdw r5, [r8 + 0x70]
   5c8e8: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   5c8f0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5c8f8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5c7e8>
   5c900: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   5c908: 79 86 68 00 00 00 00 00      	ldxdw r6, [r8 + 0x68]
   5c910: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   5c918: 55 09 01 00 01 00 00 00      	jne r9, 0x1, +0x1 <.text+0x5c808>
   5c920: 85 10 00 00 ff ff ff ff      	call -0x1
   5c928: 79 80 78 00 00 00 00 00      	ldxdw r0, [r8 + 0x78]
   5c930: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
   5c938: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5c940: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5c948: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5c838>
   5c950: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5c958: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   5c960: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x5c850>
   5c968: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0x5c800>
   5c970: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5c980: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c988: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5c990: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   5c998: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5c9a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5c9a8: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <.text+0x5c898>
   5c9b0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5c9b8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0x5c8a8>
   5c9c0: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   5c9c8: 7b 0a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r0
   5c9d0: 18 02 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300007f00
   5c9e0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5c8d0>
   5c9e8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5c9f0: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   5c9f8: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   5ca08: 79 a3 b8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x148]
   5ca10: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <.text+0x5c900>
   5ca18: 05 00 a9 ff 00 00 00 00      	ja -0x57 <.text+0x5c648>
   5ca20: 71 31 21 00 00 00 00 00      	ldxb r1, [r3 + 0x21]
   5ca28: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   5ca30: 71 81 92 00 00 00 00 00      	ldxb r1, [r8 + 0x92]
   5ca38: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   5ca40: 71 81 91 00 00 00 00 00      	ldxb r1, [r8 + 0x91]
   5ca48: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   5ca50: 71 81 90 00 00 00 00 00      	ldxb r1, [r8 + 0x90]
   5ca58: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   5ca60: 79 81 88 00 00 00 00 00      	ldxdw r1, [r8 + 0x88]
   5ca68: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   5ca70: 79 88 80 00 00 00 00 00      	ldxdw r8, [r8 + 0x80]
   5ca78: 18 03 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300000000
   5ca88: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   5ca90: 18 01 00 00 92 9f bd ac 00 00 00 00 92 58 38 f4      	lddw r1, -0xbc7a76d5342606e
   5caa0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5caa8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   5cab0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5cab8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   5cac0: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   5cac8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   5cad0: 7b 12 18 00 00 00 00 00      	stxdw [r2 + 0x18], r1
   5cad8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   5cae0: 7b 12 20 00 00 00 00 00      	stxdw [r2 + 0x20], r1
   5cae8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   5caf0: 7b 12 48 00 00 00 00 00      	stxdw [r2 + 0x48], r1
   5caf8: 7b 72 40 00 00 00 00 00      	stxdw [r2 + 0x40], r7
   5cb00: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   5cb08: 7b 12 38 00 00 00 00 00      	stxdw [r2 + 0x38], r1
   5cb10: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   5cb18: 7b 12 30 00 00 00 00 00      	stxdw [r2 + 0x30], r1
   5cb20: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   5cb28: 7b 12 28 00 00 00 00 00      	stxdw [r2 + 0x28], r1
   5cb30: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cb38: b7 04 00 00 58 00 00 00      	mov64 r4, 0x58
   5cb40: c5 04 a7 00 00 00 00 00      	jslt r4, 0x0, +0xa7 <.text+0x5cf60>
   5cb48: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5cb50: 18 00 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r0, 0x300008000
   5cb60: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ca50>
   5cb68: bf 10 00 00 00 00 00 00      	mov64 r0, r1
   5cb70: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   5cb78: 1f 45 00 00 00 00 00 00      	sub64 r5, r4
   5cb80: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   5cb88: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5cb90: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5cb98: 2d 05 01 00 00 00 00 00      	jgt r5, r0, +0x1 <.text+0x5ca88>
   5cba0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cba8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0x5ca98>
   5cbb0: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   5cbb8: 18 04 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r4, 0x300000008
   5cbc8: ad 43 96 00 00 00 00 00      	jlt r3, r4, +0x96 <.text+0x5cf60>
   5cbd0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5cbe0: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   5cbe8: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
   5cbf8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5cc00: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cc08: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   5cc10: 0f 14 00 00 00 00 00 00      	add64 r4, r1
   5cc18: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   5cc20: 0f 15 00 00 00 00 00 00      	add64 r5, r1
   5cc28: 71 55 00 00 00 00 00 00      	ldxb r5, [r5 + 0x0]
   5cc30: 73 54 08 00 00 00 00 00      	stxb [r4 + 0x8], r5
   5cc38: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   5cc40: 15 01 01 00 50 00 00 00      	jeq r1, 0x50, +0x1 <.text+0x5cb30>
   5cc48: 05 00 f7 ff 00 00 00 00      	ja -0x9 <.text+0x5cae8>
   5cc50: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5cc60: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5cc68: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   5cc70: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
   5cc78: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5cc80: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   5cc88: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <.text+0x5cb78>
   5cc90: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   5cc98: 55 05 01 00 00 00 00 00      	jne r5, 0x0, +0x1 <.text+0x5cb88>
   5cca0: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   5cca8: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
   5ccb8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5cba8>
   5ccc0: bf 41 00 00 00 00 00 00      	mov64 r1, r4
   5ccc8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   5ccd8: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <.text+0x5cbd8>
   5cce0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5cce8: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   5ccf0: 85 10 00 00 cd 68 01 00      	call 0x168cd
   5ccf8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   5cd08: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5cd10: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   5cd18: 79 64 08 00 00 00 00 00      	ldxdw r4, [r6 + 0x8]
   5cd20: 79 65 10 00 00 00 00 00      	ldxdw r5, [r6 + 0x10]
   5cd28: 79 60 18 00 00 00 00 00      	ldxdw r0, [r6 + 0x18]
   5cd30: 7b 01 18 00 00 00 00 00      	stxdw [r1 + 0x18], r0
   5cd38: 7b 51 10 00 00 00 00 00      	stxdw [r1 + 0x10], r5
   5cd40: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   5cd48: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5cd50: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
   5cd58: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   5cd60: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   5cd68: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   5cd70: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5cd78: 07 07 00 00 30 ff ff ff      	add64 r7, -0xd0
   5cd80: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cd88: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   5cd90: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5cd98: 18 02 00 00 3e e5 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11e53e
   5cda8: b7 04 00 00 58 00 00 00      	mov64 r4, 0x58
   5cdb0: 85 10 00 00 b3 61 01 00      	call 0x161b3
   5cdb8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5cdc0: 73 1a c2 ff 00 00 00 00      	stxb [r10 - 0x3e], r1
   5cdc8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5cdd0: 73 1a c1 ff 00 00 00 00      	stxb [r10 - 0x3f], r1
   5cdd8: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   5cde0: 73 1a c0 ff 00 00 00 00      	stxb [r10 - 0x40], r1
   5cde8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   5cdf0: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   5cdf8: 7b 8a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r8
   5ce00: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   5ce08: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   5ce10: 7b 9a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r9
   5ce18: 7b 6a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r6
   5ce20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ce28: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   5ce30: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   5ce38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ce40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5ce48: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   5ce50: 18 01 00 00 46 c6 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c646
   5ce60: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   5ce68: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   5ce70: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   5ce78: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   5ce80: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   5ce88: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   5ce90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ce98: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   5cea0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5cea8: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   5ceb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ceb8: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   5cec0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5cec8: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   5ced0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5ced8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5cee0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5cee8: 85 10 00 00 79 53 01 00      	call 0x15379
   5cef0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5cf00: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   5cf08: 1d 12 01 00 00 00 00 00      	jeq r2, r1, +0x1 <.text+0x5cdf8>
   5cf10: 05 00 12 00 00 00 00 00      	ja +0x12 <.text+0x5ce88>
   5cf18: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5cf20: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5cf28: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5cf30: 79 a0 e8 fe 00 00 00 00      	ldxdw r0, [r10 - 0x118]
   5cf38: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x5ce38>
   5cf40: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5cf48: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5cf50: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5cf58: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   5cf60: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5cf68: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5cf70: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5cf78: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x5ce78>
   5cf80: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5cf88: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5cf90: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5cf98: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   5cfa0: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x5cf48>
   5cfa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cfb0: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   5cfb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cfc0: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   5cfc8: 85 10 00 00 0e 4c 01 00      	call 0x14c0e
   5cfd0: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   5cfd8: 79 a2 f0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x110]
   5cfe0: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   5cfe8: 79 a4 a0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x60]
   5cff0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   5cff8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   5d000: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   5d008: 79 a0 e8 fe 00 00 00 00      	ldxdw r0, [r10 - 0x118]
   5d010: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x5cf10>
   5d018: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5d020: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   5d028: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   5d030: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   5d038: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   5d040: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   5d048: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0x5cf48>
   5d050: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   5d058: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   5d060: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   5d068: 7b 10 08 00 00 00 00 00      	stxdw [r0 + 0x8], r1
   5d070: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   5d078: 95 00 00 00 00 00 00 00      	exit
   5d080: b7 02 00 00 58 00 00 00      	mov64 r2, 0x58
   5d088: 85 10 00 00 57 68 01 00      	call 0x16857
