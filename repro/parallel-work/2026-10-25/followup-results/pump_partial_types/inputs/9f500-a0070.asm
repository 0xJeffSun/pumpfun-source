   9f500: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9f508: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9f510: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9f498>
   9f518: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9f520: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9f528: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9f530: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9f538: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9f540: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9f548: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9f550: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9f558: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9f448>
   9f560: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9f500>
   9f568: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f578: 85 10 00 00 1c 13 02 00      	call 0x2131c
   9f580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f588: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   9f590: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f598: 85 10 00 00 d7 f8 01 00      	call 0x1f8d7
   9f5a0: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   9f5a8: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   9f5b0: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9f4e0>
   9f5b8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f5c8: 85 10 00 00 12 13 02 00      	call 0x21312
   9f5d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f5d8: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   9f5e0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f5e8: 85 10 00 00 cd f8 01 00      	call 0x1f8cd
   9f5f0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   9f5f8: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   9f600: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9f608: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9f610: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9f618: 95 00 00 00 00 00 00 00      	exit
   9f620: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9f628: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9f630: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9f638: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9f640: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9f648: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9f650: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9f658: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9f548>
   9f660: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9f598>
   9f668: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f678: 85 10 00 00 fc 12 02 00      	call 0x212fc
   9f680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f688: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   9f690: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f698: 85 10 00 00 b7 f8 01 00      	call 0x1f8b7
   9f6a0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9f6a8: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f6b0: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9f4e0>
   9f6b8: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9f6c0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9f6c8: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9f6d0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9f6d8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9f6e0: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9f6e8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9f6f0: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9f5e0>
   9f6f8: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9f630>
   9f700: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f710: 85 10 00 00 e9 12 02 00      	call 0x212e9
   9f718: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f720: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   9f728: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f730: 85 10 00 00 a4 f8 01 00      	call 0x1f8a4
   9f738: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   9f740: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   9f748: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9f4e0>
   9f750: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9f758: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9f760: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9f768: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9f770: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9f778: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9f780: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9f788: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9f678>
   9f790: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9f6c8>
   9f798: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f7a8: 85 10 00 00 d6 12 02 00      	call 0x212d6
   9f7b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f7b8: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   9f7c0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f7c8: 85 10 00 00 91 f8 01 00      	call 0x1f891
   9f7d0: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   9f7d8: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9f7e0: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9f4e0>
   9f7e8: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9f7f0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9f7f8: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9f800: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9f808: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9f810: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9f818: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9f820: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9f808>
   9f828: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9f830: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9f838: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9f840: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9f848: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9f850: 73 4a b7 ff 00 00 00 00      	stxb [r10 - 0x49], r4
   9f858: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9f858>
   9f860: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9f870: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9f878: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f880: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9f888: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   9f890: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9f8a0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9f8a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f8b0: 07 01 00 00 b7 ff ff ff      	add64 r1, -0x49
   9f8b8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9f8c0: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9f8c8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9f8d0: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   9f8d8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9f8e0: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   9f8e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9f8f0: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   9f8f8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9f900: 85 10 00 00 28 17 02 00      	call 0x21728
   9f908: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9f910: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9f918: 85 10 00 00 ee d4 fe ff      	call -0x12b12
   9f920: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9f820>
   9f928: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9f938: 85 10 00 00 a4 12 02 00      	call 0x212a4
   9f940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f948: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   9f950: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9f958: 85 10 00 00 5f f8 01 00      	call 0x1f85f
   9f960: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9f968: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   9f970: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9f4e0>
   9f978: 7b 4a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r4
   9f980: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   9f988: 7b 5a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r5
   9f990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f998: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f9a0: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   9f9a8: 85 10 00 00 20 e0 fe ff      	call -0x11fe0
   9f9b0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f9b8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9f8d8>
   9f9c0: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9f9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f9d0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9f9d8: 85 10 00 00 4f f8 01 00      	call 0x1f84f
   9f9e0: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9f9e8: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9f9f0: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x9f4e0>
   9f9f8: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9fa00: 63 1a ab ff 00 00 00 00      	stxw [r10 - 0x55], r1
   9fa08: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9fa10: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   9fa18: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9fa20: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9fa28: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9fa30: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9fa38: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9fa40: 73 1a a0 ff 00 00 00 00      	stxb [r10 - 0x60], r1
   9fa48: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9fa50: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   9fa58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fa60: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9fa68: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fa70: 85 10 00 00 be da fe ff      	call -0x12542
   9fa78: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9fa80: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9f9a0>
   9fa88: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9fa90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fa98: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9faa0: 85 10 00 00 36 f8 01 00      	call 0x1f836
   9faa8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9fab0: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9fab8: 05 00 68 ff 00 00 00 00      	ja -0x98 <.text+0x9f4e0>
   9fac0: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   9fac8: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9fad0: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   9fad8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fae0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9fae8: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9faf0: 85 10 00 00 ae da fe ff      	call -0x12552
   9faf8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9fb00: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9fa20>
   9fb08: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9fb10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fb18: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9fb20: 85 10 00 00 26 f8 01 00      	call 0x1f826
   9fb28: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9fb30: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9fb38: 05 00 58 ff 00 00 00 00      	ja -0xa8 <.text+0x9f4e0>
   9fb40: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   9fb48: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9fb50: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   9fb58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fb60: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9fb68: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fb70: 85 10 00 00 e7 df fe ff      	call -0x12019
   9fb78: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9fb80: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x9fa78>
   9fb88: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9fb90: 05 00 15 00 00 00 00 00      	ja +0x15 <.text+0x9fb20>
   9fb98: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   9fba0: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9fba8: 63 1a b3 ff 00 00 00 00      	stxw [r10 - 0x4d], r1
   9fbb0: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9fbb8: 63 1a b0 ff 00 00 00 00      	stxw [r10 - 0x50], r1
   9fbc0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9fbc8: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   9fbd0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9fbd8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9fbe0: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9fbe8: 73 1a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r1
   9fbf0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9fbf8: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   9fc00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fc08: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9fc10: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fc18: 85 10 00 00 4d da fe ff      	call -0x125b3
   9fc20: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9fc28: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9fc30: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   9fc38: 15 01 06 00 00 00 00 00      	jeq r1, 0x0, +0x6 <.text+0x9fb50>
   9fc40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fc48: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   9fc50: 85 10 00 00 00 f8 01 00      	call 0x1f800
   9fc58: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   9fc60: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   9fc68: 05 00 32 ff 00 00 00 00      	ja -0xce <.text+0x9f4e0>
   9fc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fc78: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9fc80: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fc88: 85 10 00 00 7b da fe ff      	call -0x12585
   9fc90: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9fc98: 55 01 dd ff 00 00 00 00      	jne r1, 0x0, -0x23 <.text+0x9fa68>
   9fca0: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9fca8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   9fcb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fcb8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9fcc0: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fcc8: 85 10 00 00 73 da fe ff      	call -0x1258d
   9fcd0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9fcd8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9fbc8>
   9fce0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x9fa68>
   9fce8: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9fcf0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   9fcf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fd00: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9fd08: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fd10: 85 10 00 00 2e da fe ff      	call -0x125d2
   9fd18: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9fd20: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9fd28: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   9fd30: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9fc20>
   9fd38: 05 00 e0 ff 00 00 00 00      	ja -0x20 <.text+0x9fb20>
   9fd40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fd48: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9fd50: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fd58: 85 10 00 00 25 da fe ff      	call -0x125db
   9fd60: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9fd68: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9fd70: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   9fd78: 55 01 d8 ff 00 00 00 00      	jne r1, 0x0, -0x28 <.text+0x9fb20>
   9fd80: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   9fd88: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
   9fd90: 15 01 56 00 00 00 00 00      	jeq r1, 0x0, +0x56 <.text+0x9ff28>
   9fd98: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   9fda0: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fda8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fdb0: 71 34 00 00 00 00 00 00      	ldxb r4, [r3 + 0x0]
   9fdb8: 7b 4a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r4
   9fdc0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9fdc8: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   9fdd0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fdd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fde0: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   9fde8: 85 10 00 00 13 da fe ff      	call -0x125ed
   9fdf0: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9fdf8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   9fe00: 7b 2a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r2
   9fe08: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9fcf8>
   9fe10: 05 00 c5 ff 00 00 00 00      	ja -0x3b <.text+0x9fb20>
   9fe18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fe20: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   9fe28: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fe30: 85 10 00 00 0a da fe ff      	call -0x125f6
   9fe38: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   9fe40: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   9fe48: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   9fe50: 55 01 bd ff 00 00 00 00      	jne r1, 0x0, -0x43 <.text+0x9fb20>
   9fe58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9fe60: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9fe68: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   9fe70: 85 10 00 00 02 da fe ff      	call -0x125fe
   9fe78: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   9fe80: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   9fe88: 55 01 b6 ff 00 00 00 00      	jne r1, 0x0, -0x4a <.text+0x9fb20>
   9fe90: 61 a1 ab ff 00 00 00 00      	ldxw r1, [r10 - 0x55]
   9fe98: 63 16 03 00 00 00 00 00      	stxw [r6 + 0x3], r1
   9fea0: 61 a1 a8 ff 00 00 00 00      	ldxw r1, [r10 - 0x58]
   9fea8: 63 16 00 00 00 00 00 00      	stxw [r6 + 0x0], r1
   9feb0: 71 a1 a0 ff 00 00 00 00      	ldxb r1, [r10 - 0x60]
   9feb8: 73 16 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r1
   9fec0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   9fec8: 7b 16 17 00 00 00 00 00      	stxdw [r6 + 0x17], r1
   9fed0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   9fed8: 7b 16 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r1
   9fee0: 61 a1 b0 ff 00 00 00 00      	ldxw r1, [r10 - 0x50]
   9fee8: 63 16 20 00 00 00 00 00      	stxw [r6 + 0x20], r1
   9fef0: 61 a1 b3 ff 00 00 00 00      	ldxw r1, [r10 - 0x4d]
   9fef8: 63 16 23 00 00 00 00 00      	stxw [r6 + 0x23], r1
   9ff00: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   9ff08: 7b 16 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r1
   9ff10: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   9ff18: 7b 16 37 00 00 00 00 00      	stxdw [r6 + 0x37], r1
   9ff20: 71 a1 c8 ff 00 00 00 00      	ldxb r1, [r10 - 0x38]
   9ff28: 73 16 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r1
   9ff30: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   9ff38: 73 16 98 00 00 00 00 00      	stxb [r6 + 0x98], r1
   9ff40: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   9ff48: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9ff50: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   9ff58: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9ff60: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   9ff68: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9ff70: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   9ff78: 73 16 9c 00 00 00 00 00      	stxb [r6 + 0x9c], r1
   9ff80: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   9ff88: 7b 16 07 00 00 00 00 00      	stxdw [r6 + 0x7], r1
   9ff90: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   9ff98: 7b 16 27 00 00 00 00 00      	stxdw [r6 + 0x27], r1
   9ffa0: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9ffa8: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9ffb0: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9ffb8: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   9ffc0: 7b 16 58 00 00 00 00 00      	stxdw [r6 + 0x58], r1
   9ffc8: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   9ffd0: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   9ffd8: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   9ffe0: 7b 16 68 00 00 00 00 00      	stxdw [r6 + 0x68], r1
   9ffe8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   9fff0: 7b 16 70 00 00 00 00 00      	stxdw [r6 + 0x70], r1
   9fff8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   a0000: 7b 16 78 00 00 00 00 00      	stxdw [r6 + 0x78], r1
   a0008: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   a0010: 7b 16 80 00 00 00 00 00      	stxdw [r6 + 0x80], r1
   a0018: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   a0020: 7b 16 88 00 00 00 00 00      	stxdw [r6 + 0x88], r1
   a0028: 7b 26 90 00 00 00 00 00      	stxdw [r6 + 0x90], r2
   a0030: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   a0038: 73 16 9d 00 00 00 00 00      	stxb [r6 + 0x9d], r1
   a0040: 05 00 ba fe 00 00 00 00      	ja -0x146 <.text+0x9f4f8>
   a0048: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   a0058: 85 10 00 00 c0 11 02 00      	call 0x211c0
   a0060: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   a0068: 05 00 7a ff 00 00 00 00      	ja -0x86 <.text+0x9fb20>
