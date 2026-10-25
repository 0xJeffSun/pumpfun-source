   dd700: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   dd708: bf 38 00 00 00 00 00 00      	mov64 r8, r3
   dd710: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   dd718: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   dd720: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd728: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   dd730: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dd738: 85 10 00 00 69 45 fe ff      	call -0x1ba97
   dd740: 61 a1 28 ff 00 00 00 00      	ldxw r1, [r10 - 0xd8]
   dd748: 15 01 17 00 02 00 00 00      	jeq r1, 0x2, +0x17 <.text+0xdd6e8>
   dd750: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   dd760: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dd768: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   dd770: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   dd778: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   dd780: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dd788: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xdd678>
   dd790: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dd798: 7b 7a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r7
   dd7a0: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdd690>
   dd7a8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dd7b0: 18 07 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r7, 0x300007f80
   dd7c0: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xdd6b8>
   dd7c8: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dd7d0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   dd7d8: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   dd7e8: 2d 17 0e 00 00 00 00 00      	jgt r7, r1, +0xe <.text+0xdd740>
   dd7f0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   dd7f8: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   dd800: 85 10 00 00 35 9b 01 00      	call 0x19b35
   dd808: 79 a3 38 ff 00 00 00 00      	ldxdw r3, [r10 - 0xc8]
   dd810: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   dd818: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd820: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   dd828: 18 04 00 00 08 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7508
   dd838: b7 05 00 00 09 00 00 00      	mov64 r5, 0x9
   dd840: 85 10 00 00 1d 4a fe ff      	call -0x1b5e3
   dd848: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   dd850: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   dd858: 05 00 82 00 00 00 00 00      	ja +0x82 <.text+0xddb50>
   dd860: 79 91 08 f0 00 00 00 00      	ldxdw r1, [r9 - 0xff8]
   dd868: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   dd870: 18 09 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r9, 0x300000000
   dd880: 7b 79 00 00 00 00 00 00      	stxdw [r9 + 0x0], r7
   dd888: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd890: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   dd898: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   dd8a0: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   dd8a8: 85 10 00 00 ac ab 01 00      	call 0x1abac
   dd8b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd8b8: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   dd8c0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dd8c8: 85 10 00 00 37 45 fe ff      	call -0x1bac9
   dd8d0: 61 a1 28 ff 00 00 00 00      	ldxw r1, [r10 - 0xd8]
   dd8d8: 15 01 12 00 02 00 00 00      	jeq r1, 0x2, +0x12 <.text+0xdd850>
   dd8e0: 79 95 00 00 00 00 00 00      	ldxdw r5, [r9 + 0x0]
   dd8e8: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   dd8f0: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   dd8f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   dd900: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dd908: 2d 53 01 00 00 00 00 00      	jgt r3, r5, +0x1 <.text+0xdd7f8>
   dd910: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dd918: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdd808>
   dd920: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dd928: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   dd938: 15 05 02 00 00 00 00 00      	jeq r5, 0x0, +0x2 <.text+0xdd830>
   dd940: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dd948: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   dd950: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   dd960: 2d 21 0c 00 00 00 00 00      	jgt r1, r2, +0xc <.text+0xdd8a8>
   dd968: 05 00 d0 ff 00 00 00 00      	ja -0x30 <.text+0xdd6d0>
   dd970: 79 a3 38 ff 00 00 00 00      	ldxdw r3, [r10 - 0xc8]
   dd978: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   dd980: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd988: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   dd990: 18 04 00 00 fe 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b74fe
   dd9a0: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   dd9a8: 85 10 00 00 f0 49 fe ff      	call -0x1b610
   dd9b0: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   dd9b8: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   dd9c0: 05 00 55 00 00 00 00 00      	ja +0x55 <.text+0xddb50>
   dd9c8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dd9d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd9d8: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   dd9e0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   dd9e8: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   dd9f0: 85 10 00 00 83 ab 01 00      	call 0x1ab83
   dd9f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dda00: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   dda08: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dda10: 85 10 00 00 c6 6a fe ff      	call -0x1953a
   dda18: 71 a1 cd ff 00 00 00 00      	ldxb r1, [r10 - 0x33]
   dda20: 15 01 14 00 02 00 00 00      	jeq r1, 0x2, +0x14 <.text+0xdd9a8>
   dda28: 79 95 00 00 00 00 00 00      	ldxdw r5, [r9 + 0x0]
   dda30: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   dda38: 07 03 00 00 58 ff ff ff      	add64 r3, -0xa8
   dda40: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   dda48: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dda50: 2d 53 01 00 00 00 00 00      	jgt r3, r5, +0x1 <.text+0xdd940>
   dda58: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dda60: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdd950>
   dda68: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dda70: 18 01 00 00 58 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f58
   dda80: 15 05 02 00 00 00 00 00      	jeq r5, 0x0, +0x2 <.text+0xdd978>
   dda88: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dda90: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   dda98: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   ddaa8: 2d 21 0e 00 00 00 00 00      	jgt r1, r2, +0xe <.text+0xdda00>
   ddab0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   ddab8: b7 02 00 00 a8 00 00 00      	mov64 r2, 0xa8
   ddac0: 85 10 00 00 dd 9a 01 00      	call 0x19add
   ddac8: 79 a3 30 ff 00 00 00 00      	ldxdw r3, [r10 - 0xd0]
   ddad0: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   ddad8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddae0: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   ddae8: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   ddaf8: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   ddb00: 85 10 00 00 c5 49 fe ff      	call -0x1b63b
   ddb08: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   ddb10: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   ddb18: 05 00 2a 00 00 00 00 00      	ja +0x2a <.text+0xddb50>
   ddb20: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   ddb28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddb30: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   ddb38: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   ddb40: b7 03 00 00 a8 00 00 00      	mov64 r3, 0xa8
   ddb48: 85 10 00 00 58 ab 01 00      	call 0x1ab58
   ddb50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddb58: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   ddb60: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   ddb68: 85 10 00 00 cc 44 fe ff      	call -0x1bb34
   ddb70: 61 a1 d8 ff 00 00 00 00      	ldxw r1, [r10 - 0x28]
   ddb78: 15 01 14 00 02 00 00 00      	jeq r1, 0x2, +0x14 <.text+0xddb00>
   ddb80: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ddb88: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   ddb90: 07 03 00 00 28 ff ff ff      	add64 r3, -0xd8
   ddb98: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   ddba0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   ddba8: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xdda98>
   ddbb0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   ddbb8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xddaa8>
   ddbc0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   ddbc8: 18 09 00 00 28 7f 00 00 00 00 00 00 03 00 00 00      	lddw r9, 0x300007f28
   ddbd8: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xddad0>
   ddbe0: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   ddbe8: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   ddbf0: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   ddc00: 2d 19 11 00 00 00 00 00      	jgt r9, r1, +0x11 <.text+0xddb70>
   ddc08: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   ddc10: b7 02 00 00 d8 00 00 00      	mov64 r2, 0xd8
   ddc18: 85 10 00 00 b2 9a 01 00      	call 0x19ab2
   ddc20: 79 a3 30 ff 00 00 00 00      	ldxdw r3, [r10 - 0xd0]
   ddc28: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   ddc30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddc38: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   ddc40: 18 04 00 00 e5 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73e5
   ddc50: b7 05 00 00 1d 00 00 00      	mov64 r5, 0x1d
   ddc58: 85 10 00 00 9a 49 fe ff      	call -0x1b666
   ddc60: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   ddc68: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]
   ddc70: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   ddc78: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   ddc80: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
   ddc88: 95 00 00 00 00 00 00 00      	exit
   ddc90: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   ddca0: 7b 91 00 00 00 00 00 00      	stxdw [r1 + 0x0], r9
   ddca8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddcb0: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   ddcb8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   ddcc0: b7 03 00 00 d8 00 00 00      	mov64 r3, 0xd8
   ddcc8: 85 10 00 00 28 ab 01 00      	call 0x1ab28
   ddcd0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   ddcd8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0xddbf8>
   ddce0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   ddce8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   ddcf0: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
   ddcf8: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   ddd00: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   ddd08: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   ddd10: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0xddc38>
   ddd18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddd20: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   ddd28: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   ddd30: 85 10 00 00 bd 82 01 00      	call 0x182bd
   ddd38: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   ddd40: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   ddd48: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xddc38>
   ddd50: 05 00 a7 00 00 00 00 00      	ja +0xa7 <.text+0xde170>
   ddd58: 7b 3a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r3
   ddd60: 7b 9a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r9
   ddd68: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
   ddd70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ddd78: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   ddd80: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   ddd88: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   ddd90: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   ddd98: 18 05 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1b683a
   ddda8: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   dddb0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   dddb8: 07 05 00 00 08 ff ff ff      	add64 r5, -0xf8
   dddc0: 7b 5a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r5
   dddc8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dddd0: 7b 4a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r4
   dddd8: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   ddde0: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   ddde8: 7a 0a f0 fe 0d 00 00 00      	stdw [r10 - 0x110], 0xd
   dddf0: 7a 0a 00 ff 20 00 00 00      	stdw [r10 - 0x100], 0x20
   dddf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dde00: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   dde08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dde10: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   dde18: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   dde20: 79 a4 b0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x250]
   dde28: 85 10 00 00 11 94 01 00      	call 0x19411
   dde30: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   dde38: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   dde40: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   dde48: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   dde50: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   dde58: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   dde60: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   dde68: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   dde70: 71 a1 48 ff 00 00 00 00      	ldxb r1, [r10 - 0xb8]
   dde78: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   dde80: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   dde88: 79 a9 98 fd 00 00 00 00      	ldxdw r9, [r10 - 0x268]
   dde90: 79 98 00 00 00 00 00 00      	ldxdw r8, [r9 + 0x0]
   dde98: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   ddea0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   ddea8: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   ddeb0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   ddeb8: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   ddec0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   ddec8: 7b 2a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r2
   dded0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dded8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   ddee0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddee8: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   ddef0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ddef8: 07 02 00 00 c8 fe ff ff      	add64 r2, -0x138
   ddf00: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   ddf08: 85 10 00 00 ed aa 01 00      	call 0x1aaed
   ddf10: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   ddf18: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   ddf20: 15 00 2a 00 00 00 00 00      	jeq r0, 0x0, +0x2a <.text+0xddf58>
   ddf28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddf30: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   ddf38: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   ddf40: 85 10 00 00 7b 82 01 00      	call 0x1827b
   ddf48: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   ddf50: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   ddf58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddf60: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   ddf68: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   ddf78: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   ddf80: 85 10 00 00 35 49 fe ff      	call -0x1b6cb
   ddf88: 79 a3 90 fe 00 00 00 00      	ldxdw r3, [r10 - 0x170]
   ddf90: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   ddf98: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ddfa0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   ddfa8: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   ddfb0: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   ddfb8: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   ddfc0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   ddfc8: 79 a7 c8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x138]
   ddfd0: 7b 7a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r7
   ddfd8: 79 a7 d0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x130]
   ddfe0: 7b 7a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r7
   ddfe8: 79 a7 d8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x128]
   ddff0: 7b 7a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r7
   ddff8: 79 a7 e0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x120]
   de000: 7b 7a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r7
   de008: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   de010: 7b 0a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r0
   de018: 7b 5a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r5
   de020: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   de028: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de030: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   de038: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   de040: 07 04 00 00 28 ff ff ff      	add64 r4, -0xd8
   de048: 85 10 00 00 2d 7c 01 00      	call 0x17c2d
   de050: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   de058: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   de060: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   de068: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   de070: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0xddb60>
   de078: 71 81 29 00 00 00 00 00      	ldxb r1, [r8 + 0x29]
   de080: 15 01 4a 00 00 00 00 00      	jeq r1, 0x0, +0x4a <.text+0xde1b8>
   de088: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   de090: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   de098: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   de0a0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   de0a8: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   de0b0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   de0b8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   de0c0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   de0c8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   de0d0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   de0d8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   de0e0: 79 a8 98 fd 00 00 00 00      	ldxdw r8, [r10 - 0x268]
   de0e8: 07 08 00 00 28 00 00 00      	add64 r8, 0x28
   de0f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de0f8: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   de100: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   de108: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   de110: 85 10 00 00 ac aa 01 00      	call 0x1aaac
   de118: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   de120: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   de128: 15 00 44 00 00 00 00 00      	jeq r0, 0x0, +0x44 <.text+0xde230>
   de130: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   de138: 7a 0a 38 ff 00 00 00 00      	stdw [r10 - 0xc8], 0x0
   de140: 7a 0a 30 ff 00 00 00 00      	stdw [r10 - 0xd0], 0x0
   de148: 7a 0a 28 ff 00 00 00 00      	stdw [r10 - 0xd8], 0x0
   de150: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   de158: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   de160: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   de168: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   de170: 85 10 00 00 a0 aa 01 00      	call 0x1aaa0
   de178: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   de180: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   de188: 55 00 11 00 00 00 00 00      	jne r0, 0x0, +0x11 <.text+0xde0f8>
   de190: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   de198: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   de1a0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   de1a8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   de1b0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   de1b8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   de1c0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   de1c8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   de1d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de1d8: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   de1e0: 18 02 00 00 c8 5c 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5cc8
   de1f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   de1f8: 85 10 00 00 8f aa 01 00      	call 0x1aa8f
   de200: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   de208: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   de210: 15 00 27 00 00 00 00 00      	jeq r0, 0x0, +0x27 <.text+0xde230>
   de218: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de220: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   de228: b7 02 00 00 04 00 00 00      	mov64 r2, 0x4
   de230: 85 10 00 00 4b ff 00 00      	call 0xff4b
   de238: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   de240: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   de248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de250: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   de258: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   de268: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   de270: 85 10 00 00 d7 48 fe ff      	call -0x1b729
   de278: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   de280: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   de288: 05 00 ba ff 00 00 00 00      	ja -0x46 <.text+0xddf40>
   de290: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de298: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   de2a0: 18 04 00 00 02 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7402
   de2b0: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   de2b8: 85 10 00 00 ce 48 fe ff      	call -0x1b732
   de2c0: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   de2c8: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
   de2d0: 05 00 33 ff 00 00 00 00      	ja -0xcd <.text+0xddb50>
   de2d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de2e0: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   de2e8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   de2f0: 85 10 00 00 05 82 01 00      	call 0x18205
   de2f8: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   de300: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   de308: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de310: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   de318: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   de328: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   de330: 85 10 00 00 bf 48 fe ff      	call -0x1b741
   de338: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   de340: 79 a2 f8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x208]
   de348: 05 00 a2 ff 00 00 00 00      	ja -0x5e <.text+0xddf40>
   de350: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   de358: 79 21 20 00 00 00 00 00      	ldxdw r1, [r2 + 0x20]
   de360: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   de368: 55 01 0f 00 00 00 00 00      	jne r1, 0x0, +0xf <.text+0xde2c8>
   de370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de378: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   de380: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   de388: 85 10 00 00 f2 81 01 00      	call 0x181f2
   de390: 79 a3 30 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d0]
   de398: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   de3a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de3a8: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   de3b0: 18 04 00 00 e5 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73e5
   de3c0: b7 05 00 00 1d 00 00 00      	mov64 r5, 0x1d
   de3c8: 85 10 00 00 ac 48 fe ff      	call -0x1b754
   de3d0: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   de3d8: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]
   de3e0: 05 00 8f ff 00 00 00 00      	ja -0x71 <.text+0xddf40>
   de3e8: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   de3f0: 71 31 29 00 00 00 00 00      	ldxb r1, [r3 + 0x29]
   de3f8: 55 01 0f 00 00 00 00 00      	jne r1, 0x0, +0xf <.text+0xde358>
   de400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de408: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   de410: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   de418: 85 10 00 00 e0 81 01 00      	call 0x181e0
   de420: 79 a3 50 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b0]
   de428: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   de430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de438: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   de440: 18 04 00 00 02 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7402
   de450: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   de458: 85 10 00 00 9a 48 fe ff      	call -0x1b766
   de460: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   de468: 79 a2 38 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c8]
   de470: 05 00 7d ff 00 00 00 00      	ja -0x83 <.text+0xddf40>
   de478: 7b 36 20 00 00 00 00 00      	stxdw [r6 + 0x20], r3
   de480: 7b 26 18 00 00 00 00 00      	stxdw [r6 + 0x18], r2
   de488: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   de490: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   de498: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   de4a0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   de4a8: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   de4b0: 05 00 fa fe 00 00 00 00      	ja -0x106 <.text+0xddb68>
