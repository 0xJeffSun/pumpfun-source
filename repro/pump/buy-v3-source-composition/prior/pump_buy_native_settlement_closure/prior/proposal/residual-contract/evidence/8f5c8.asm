   8f5c8: bf 47 00 00 00 00 00 00      	mov64 r7, r4
   8f5d0: bf 30 00 00 00 00 00 00      	mov64 r0, r3
   8f5d8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   8f5e0: b7 04 00 00 02 00 00 00      	mov64 r4, 0x2
   8f5e8: 79 58 18 f0 00 00 00 00      	ldxdw r8, [r5 - 0xfe8]
   8f5f0: 15 08 00 01 00 00 00 00      	jeq r8, 0x0, +0x100 <.text+0x8fcd8>
   8f5f8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   8f600: 79 32 08 00 00 00 00 00      	ldxdw r2, [r3 + 0x8]
   8f608: 7b 2a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r2
   8f610: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   8f618: 07 06 00 00 01 00 00 00      	add64 r6, 0x1
   8f620: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   8f628: 15 06 01 00 00 00 00 00      	jeq r6, 0x0, +0x1 <.text+0x8f518>
   8f630: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   8f638: 79 52 20 f0 00 00 00 00      	ldxdw r2, [r5 - 0xfe0]
   8f640: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   8f648: 79 59 10 f0 00 00 00 00      	ldxdw r9, [r5 - 0xff0]
   8f650: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
   8f658: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   8f660: 79 52 00 f0 00 00 00 00      	ldxdw r2, [r5 - 0x1000]
   8f668: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   8f670: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   8f678: 7b 5a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r5
   8f680: 79 a5 c8 fe 00 00 00 00      	ldxdw r5, [r10 - 0x138]
   8f688: 7b 65 00 00 00 00 00 00      	stxdw [r5 + 0x0], r6
   8f690: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x8f580>
   8f698: 85 10 00 00 ff ff ff ff      	call -0x1
   8f6a0: 79 32 10 00 00 00 00 00      	ldxdw r2, [r3 + 0x10]
   8f6a8: 79 25 00 00 00 00 00 00      	ldxdw r5, [r2 + 0x0]
   8f6b0: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   8f6b8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   8f6c0: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x8f5b0>
   8f6c8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   8f6d0: 7b 52 00 00 00 00 00 00      	stxdw [r2 + 0x0], r5
   8f6d8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x8f5c8>
   8f6e0: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0x8f578>
   8f6e8: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   8f6f0: 79 00 20 00 00 00 00 00      	ldxdw r0, [r0 + 0x20]
   8f6f8: 79 04 08 00 00 00 00 00      	ldxdw r4, [r0 + 0x8]
   8f700: 7b 4a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r4
   8f708: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   8f710: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8f718: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   8f720: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8f610>
   8f728: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   8f730: 71 32 2a 00 00 00 00 00      	ldxb r2, [r3 + 0x2a]
   8f738: 7b 2a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r2
   8f740: 71 32 29 00 00 00 00 00      	ldxb r2, [r3 + 0x29]
   8f748: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   8f750: 71 32 28 00 00 00 00 00      	ldxb r2, [r3 + 0x28]
   8f758: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
   8f760: 79 32 20 00 00 00 00 00      	ldxdw r2, [r3 + 0x20]
   8f768: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
   8f770: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   8f778: 7b 3a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r3
   8f780: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   8f788: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   8f790: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   8f798: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x8f688>
   8f7a0: 05 00 de ff 00 00 00 00      	ja -0x22 <.text+0x8f578>
   8f7a8: 79 05 10 00 00 00 00 00      	ldxdw r5, [r0 + 0x10]
   8f7b0: 79 53 00 00 00 00 00 00      	ldxdw r3, [r5 + 0x0]
   8f7b8: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   8f7c0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   8f7c8: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x8f6b8>
   8f7d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   8f7d8: 7b 5a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r5
   8f7e0: 7b 35 00 00 00 00 00 00      	stxdw [r5 + 0x0], r3
   8f7e8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x8f6d8>
   8f7f0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x8f578>
   8f7f8: 7b 8a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r8
   8f800: 79 73 20 00 00 00 00 00      	ldxdw r3, [r7 + 0x20]
   8f808: 79 37 08 00 00 00 00 00      	ldxdw r7, [r3 + 0x8]
   8f810: 79 74 00 00 00 00 00 00      	ldxdw r4, [r7 + 0x0]
   8f818: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8f820: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   8f828: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8f718>
   8f830: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   8f838: 71 06 2a 00 00 00 00 00      	ldxb r6, [r0 + 0x2a]
   8f840: 7b 6a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r6
   8f848: 71 06 29 00 00 00 00 00      	ldxb r6, [r0 + 0x29]
   8f850: 7b 6a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r6
   8f858: 71 06 28 00 00 00 00 00      	ldxb r6, [r0 + 0x28]
   8f860: 7b 6a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r6
   8f868: 79 06 20 00 00 00 00 00      	ldxdw r6, [r0 + 0x20]
   8f870: 7b 6a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r6
   8f878: 79 00 18 00 00 00 00 00      	ldxdw r0, [r0 + 0x18]
   8f880: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   8f888: 7b 47 00 00 00 00 00 00      	stxdw [r7 + 0x0], r4
   8f890: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x8f780>
   8f898: 05 00 bf ff 00 00 00 00      	ja -0x41 <.text+0x8f578>
   8f8a0: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
   8f8a8: 7b 4a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r4
   8f8b0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   8f8b8: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   8f8c0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   8f8c8: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x8f7b8>
   8f8d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   8f8d8: 7b 0a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r0
   8f8e0: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   8f8e8: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   8f8f0: 7b 52 00 00 00 00 00 00      	stxdw [r2 + 0x0], r5
   8f8f8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x8f7e8>
   8f900: 05 00 b2 ff 00 00 00 00      	ja -0x4e <.text+0x8f578>
   8f908: 79 a2 a0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x160]
   8f910: 79 20 00 00 00 00 00 00      	ldxdw r0, [r2 + 0x0]
   8f918: 79 05 08 00 00 00 00 00      	ldxdw r5, [r0 + 0x8]
   8f920: 79 54 00 00 00 00 00 00      	ldxdw r4, [r5 + 0x0]
   8f928: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8f930: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   8f938: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8f828>
   8f940: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   8f948: 71 36 2a 00 00 00 00 00      	ldxb r6, [r3 + 0x2a]
   8f950: 7b 6a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r6
   8f958: 71 36 29 00 00 00 00 00      	ldxb r6, [r3 + 0x29]
   8f960: 7b 6a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r6
   8f968: 71 36 28 00 00 00 00 00      	ldxb r6, [r3 + 0x28]
   8f970: 7b 6a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r6
   8f978: 79 36 20 00 00 00 00 00      	ldxdw r6, [r3 + 0x20]
   8f980: 7b 6a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r6
   8f988: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   8f990: 7b 3a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r3
   8f998: 79 03 00 00 00 00 00 00      	ldxdw r3, [r0 + 0x0]
   8f9a0: 7b 3a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r3
   8f9a8: 7b 5a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r5
   8f9b0: 7b 45 00 00 00 00 00 00      	stxdw [r5 + 0x0], r4
   8f9b8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x8f8a8>
   8f9c0: 05 00 9a ff 00 00 00 00      	ja -0x66 <.text+0x8f578>
   8f9c8: 79 05 10 00 00 00 00 00      	ldxdw r5, [r0 + 0x10]
   8f9d0: 79 53 00 00 00 00 00 00      	ldxdw r3, [r5 + 0x0]
   8f9d8: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   8f9e0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   8f9e8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   8f9f0: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x8f8e0>
   8f9f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   8fa00: 7b 35 00 00 00 00 00 00      	stxdw [r5 + 0x0], r3
   8fa08: 79 a3 b0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x150]
   8fa10: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x8f900>
   8fa18: 05 00 8f ff 00 00 00 00      	ja -0x71 <.text+0x8f578>
   8fa20: 7b 7a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r7
   8fa28: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   8fa30: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   8fa38: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8fa40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   8fa48: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8f938>
   8fa50: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   8fa58: 79 97 00 00 00 00 00 00      	ldxdw r7, [r9 + 0x0]
   8fa60: 7b 7a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r7
   8fa68: 71 08 2a 00 00 00 00 00      	ldxb r8, [r0 + 0x2a]
   8fa70: 71 06 29 00 00 00 00 00      	ldxb r6, [r0 + 0x29]
   8fa78: 7b 6a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r6
   8fa80: 71 07 28 00 00 00 00 00      	ldxb r7, [r0 + 0x28]
   8fa88: 79 06 20 00 00 00 00 00      	ldxdw r6, [r0 + 0x20]
   8fa90: 7b 6a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r6
   8fa98: 79 00 18 00 00 00 00 00      	ldxdw r0, [r0 + 0x18]
   8faa0: 7b 0a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r0
   8faa8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   8fab0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x8f9a0>
   8fab8: 05 00 7b ff 00 00 00 00      	ja -0x85 <.text+0x8f578>
   8fac0: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   8fac8: 79 90 10 00 00 00 00 00      	ldxdw r0, [r9 + 0x10]
   8fad0: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   8fad8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   8fae0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   8fae8: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x8f9d8>
   8faf0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   8faf8: 79 a6 a8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x158]
   8fb00: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   8fb08: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   8fb10: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x8fa00>
   8fb18: 05 00 6f ff 00 00 00 00      	ja -0x91 <.text+0x8f578>
   8fb20: 79 92 18 00 00 00 00 00      	ldxdw r2, [r9 + 0x18]
   8fb28: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
   8fb30: 71 94 28 00 00 00 00 00      	ldxb r4, [r9 + 0x28]
   8fb38: 71 96 29 00 00 00 00 00      	ldxb r6, [r9 + 0x29]
   8fb40: 71 99 2a 00 00 00 00 00      	ldxb r9, [r9 + 0x2a]
   8fb48: 73 8a ea ff 00 00 00 00      	stxb [r10 - 0x16], r8
   8fb50: 79 a8 d0 fd 00 00 00 00      	ldxdw r8, [r10 - 0x230]
   8fb58: 73 8a e9 ff 00 00 00 00      	stxb [r10 - 0x17], r8
   8fb60: 73 7a e8 ff 00 00 00 00      	stxb [r10 - 0x18], r7
   8fb68: 79 a7 d8 fd 00 00 00 00      	ldxdw r7, [r10 - 0x228]
   8fb70: 7b 7a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r7
   8fb78: 79 a7 e0 fd 00 00 00 00      	ldxdw r7, [r10 - 0x220]
   8fb80: 7b 7a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r7
   8fb88: 7b 5a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r5
   8fb90: 79 a5 a0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x160]
   8fb98: 7b 5a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r5
   8fba0: 79 a5 f8 fd 00 00 00 00      	ldxdw r5, [r10 - 0x208]
   8fba8: 7b 5a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r5
   8fbb0: 79 a5 00 fe 00 00 00 00      	ldxdw r5, [r10 - 0x200]
   8fbb8: 73 5a ba ff 00 00 00 00      	stxb [r10 - 0x46], r5
   8fbc0: 79 a5 08 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1f8]
   8fbc8: 73 5a b9 ff 00 00 00 00      	stxb [r10 - 0x47], r5
   8fbd0: 79 a5 10 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1f0]
   8fbd8: 73 5a b8 ff 00 00 00 00      	stxb [r10 - 0x48], r5
   8fbe0: 79 a5 18 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1e8]
   8fbe8: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   8fbf0: 79 a5 20 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1e0]
   8fbf8: 7b 5a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r5
   8fc00: 79 a5 b8 fe 00 00 00 00      	ldxdw r5, [r10 - 0x148]
   8fc08: 7b 5a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r5
   8fc10: 79 a5 f0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x210]
   8fc18: 7b 5a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r5
   8fc20: 79 a5 c8 fd 00 00 00 00      	ldxdw r5, [r10 - 0x238]
   8fc28: 7b 5a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r5
   8fc30: 73 9a 8a ff 00 00 00 00      	stxb [r10 - 0x76], r9
   8fc38: 73 6a 89 ff 00 00 00 00      	stxb [r10 - 0x77], r6
   8fc40: 73 4a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r4
   8fc48: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   8fc50: 7b 2a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r2
   8fc58: 7b 0a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r0
   8fc60: 7b 3a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r3
   8fc68: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   8fc70: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   8fc78: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   8fc80: 73 1a 5a ff 00 00 00 00      	stxb [r10 - 0xa6], r1
   8fc88: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   8fc90: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   8fc98: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   8fca0: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   8fca8: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   8fcb0: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   8fcb8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   8fcc0: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   8fcc8: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   8fcd0: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   8fcd8: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   8fce0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   8fce8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   8fcf0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   8fcf8: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   8fd00: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   8fd08: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   8fd10: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   8fd18: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   8fd20: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   8fd28: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   8fd30: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   8fd38: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   8fd40: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   8fd48: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   8fd50: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   8fd58: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   8fd60: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   8fd68: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   8fd70: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   8fd78: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   8fd80: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   8fd88: 7a 0a f8 ff 01 00 00 00      	stdw [r10 - 0x8], 0x1
   8fd90: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   8fd98: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   8fda0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   8fda8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   8fdb0: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   8fdb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   8fdc0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   8fdc8: 79 a3 b0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x150]
   8fdd0: 79 a4 98 fe 00 00 00 00      	ldxdw r4, [r10 - 0x168]
   8fdd8: 85 10 00 00 dd df 01 00      	call 0x1dfdd
   8fde0: 79 a3 e0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x120]
   8fde8: 79 a4 d8 fe 00 00 00 00      	ldxdw r4, [r10 - 0x128]
   8fdf0: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   8fdf8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   8fe00: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   8fe08: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   8fe10: 95 00 00 00 00 00 00 00      	exit
