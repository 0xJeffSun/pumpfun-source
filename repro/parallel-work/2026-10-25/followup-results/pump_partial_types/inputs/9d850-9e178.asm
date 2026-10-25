   9d850: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9d858: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9d860: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9d7e8>
   9d868: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9d870: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9d878: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d880: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9d888: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d890: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d898: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9d8a0: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d8a8: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d798>
   9d8b0: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9d850>
   9d8b8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d8c8: 85 10 00 00 b2 16 02 00      	call 0x216b2
   9d8d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d8d8: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   9d8e0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d8e8: 85 10 00 00 6d fc 01 00      	call 0x1fc6d
   9d8f0: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   9d8f8: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   9d900: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9d830>
   9d908: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d918: 85 10 00 00 a8 16 02 00      	call 0x216a8
   9d920: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d928: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   9d930: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d938: 85 10 00 00 63 fc 01 00      	call 0x1fc63
   9d940: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9d948: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   9d950: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9d958: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9d960: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9d968: 95 00 00 00 00 00 00 00      	exit
   9d970: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9d978: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d980: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9d988: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d990: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d998: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9d9a0: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d9a8: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d898>
   9d9b0: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9d8e8>
   9d9b8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d9c8: 85 10 00 00 92 16 02 00      	call 0x21692
   9d9d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d9d8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9d9e0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d9e8: 85 10 00 00 4d fc 01 00      	call 0x1fc4d
   9d9f0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   9d9f8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   9da00: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9d830>
   9da08: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9da10: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9da18: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9da20: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9da28: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9da30: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9da38: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9da40: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d930>
   9da48: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9d980>
   9da50: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9da60: 85 10 00 00 7f 16 02 00      	call 0x2167f
   9da68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9da70: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   9da78: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9da80: 85 10 00 00 3a fc 01 00      	call 0x1fc3a
   9da88: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   9da90: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   9da98: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9d830>
   9daa0: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9daa8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9dab0: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9dab8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9dac0: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9dac8: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9dad0: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9dad8: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d9c8>
   9dae0: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9da18>
   9dae8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9daf8: 85 10 00 00 6c 16 02 00      	call 0x2166c
   9db00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9db08: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   9db10: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9db18: 85 10 00 00 27 fc 01 00      	call 0x1fc27
   9db20: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   9db28: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9db30: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9d830>
   9db38: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9db40: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9db48: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9db50: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9db58: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9db60: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9db68: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9db70: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9db58>
   9db78: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9db80: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9db88: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9db90: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9db98: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9dba0: 73 4a b7 ff 00 00 00 00      	stxb [r10 - 0x49], r4
   9dba8: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9dba8>
   9dbb0: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9dbc0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9dbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dbd0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9dbd8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   9dbe0: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9dbf0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9dbf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dc00: 07 01 00 00 b7 ff ff ff      	add64 r1, -0x49
   9dc08: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9dc10: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9dc18: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9dc20: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   9dc28: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9dc30: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   9dc38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9dc40: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   9dc48: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9dc50: 85 10 00 00 be 1a 02 00      	call 0x21abe
   9dc58: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9dc60: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9dc68: 85 10 00 00 84 d8 fe ff      	call -0x1277c
   9dc70: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9db70>
   9dc78: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9dc88: 85 10 00 00 3a 16 02 00      	call 0x2163a
   9dc90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dc98: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9dca0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9dca8: 85 10 00 00 f5 fb 01 00      	call 0x1fbf5
   9dcb0: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9dcb8: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9dcc0: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9d830>
   9dcc8: 7b 0a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r0
   9dcd0: 7b 4a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r4
   9dcd8: 7b 5a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r5
   9dce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dce8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9dcf0: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   9dcf8: 85 10 00 00 b6 e3 fe ff      	call -0x11c4a
   9dd00: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9dd08: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9dc28>
   9dd10: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9dd18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dd20: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9dd28: 85 10 00 00 e5 fb 01 00      	call 0x1fbe5
   9dd30: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9dd38: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9dd40: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x9d830>
   9dd48: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9dd50: 63 1a ab ff 00 00 00 00      	stxw [r10 - 0x55], r1
   9dd58: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9dd60: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   9dd68: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9dd70: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9dd78: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9dd80: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9dd88: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9dd90: 73 1a a0 ff 00 00 00 00      	stxb [r10 - 0x60], r1
   9dd98: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9dda0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   9dda8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ddb0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9ddb8: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9ddc0: 85 10 00 00 54 de fe ff      	call -0x121ac
   9ddc8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9ddd0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9dcf0>
   9ddd8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9dde0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dde8: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9ddf0: 85 10 00 00 cc fb 01 00      	call 0x1fbcc
   9ddf8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9de00: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9de08: 05 00 68 ff 00 00 00 00      	ja -0x98 <.text+0x9d830>
   9de10: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   9de18: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9de20: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   9de28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9de30: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9de38: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9de40: 85 10 00 00 44 de fe ff      	call -0x121bc
   9de48: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9de50: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9dd70>
   9de58: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9de60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9de68: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9de70: 85 10 00 00 bc fb 01 00      	call 0x1fbbc
   9de78: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9de80: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9de88: 05 00 58 ff 00 00 00 00      	ja -0xa8 <.text+0x9d830>
   9de90: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9de98: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9dea0: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   9dea8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9deb0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9deb8: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9dec0: 85 10 00 00 7d e3 fe ff      	call -0x11c83
   9dec8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9ded0: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x9ddc8>
   9ded8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9dee0: 05 00 14 00 00 00 00 00      	ja +0x14 <.text+0x9de68>
   9dee8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   9def0: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9def8: 63 1a b3 ff 00 00 00 00      	stxw [r10 - 0x4d], r1
   9df00: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9df08: 63 1a b0 ff 00 00 00 00      	stxw [r10 - 0x50], r1
   9df10: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9df18: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   9df20: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9df28: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9df30: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9df38: 73 1a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r1
   9df40: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9df48: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   9df50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9df58: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9df60: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9df68: 85 10 00 00 e3 dd fe ff      	call -0x1221d
   9df70: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9df78: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9df80: 15 01 06 00 00 00 00 00      	jeq r1, 0x0, +0x6 <.text+0x9de98>
   9df88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9df90: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9df98: 85 10 00 00 97 fb 01 00      	call 0x1fb97
   9dfa0: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9dfa8: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9dfb0: 05 00 33 ff 00 00 00 00      	ja -0xcd <.text+0x9d830>
   9dfb8: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   9dfc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9dfc8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9dfd0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9dfd8: 85 10 00 00 11 de fe ff      	call -0x121ef
   9dfe0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9dfe8: 55 01 dd ff 00 00 00 00      	jne r1, 0x0, -0x23 <.text+0x9ddb8>
   9dff0: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9dff8: 61 a2 ab ff 00 00 00 00      	ldxw r2, [r10 - 0x55]
   9e000: 63 26 03 00 00 00 00 00      	stxw [r6 + 0x3], r2
   9e008: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
   9e010: 63 26 00 00 00 00 00 00      	stxw [r6 + 0x0], r2
   9e018: 71 a2 a0 ff 00 00 00 00      	ldxb r2, [r10 - 0x60]
   9e020: 73 26 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r2
   9e028: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   9e030: 7b 26 17 00 00 00 00 00      	stxdw [r6 + 0x17], r2
   9e038: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   9e040: 7b 26 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r2
   9e048: 61 a2 b0 ff 00 00 00 00      	ldxw r2, [r10 - 0x50]
   9e050: 63 26 20 00 00 00 00 00      	stxw [r6 + 0x20], r2
   9e058: 61 a2 b3 ff 00 00 00 00      	ldxw r2, [r10 - 0x4d]
   9e060: 63 26 23 00 00 00 00 00      	stxw [r6 + 0x23], r2
   9e068: 71 a3 c8 ff 00 00 00 00      	ldxb r3, [r10 - 0x38]
   9e070: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
   9e078: 79 a4 b8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x48]
   9e080: 79 a5 b8 fe 00 00 00 00      	ldxdw r5, [r10 - 0x148]
   9e088: 7b 56 07 00 00 00 00 00      	stxdw [r6 + 0x7], r5
   9e090: 79 a5 a0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x160]
   9e098: 7b 56 27 00 00 00 00 00      	stxdw [r6 + 0x27], r5
   9e0a0: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9e0a8: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9e0b0: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9e0b8: 79 a5 d0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x130]
   9e0c0: 7b 56 58 00 00 00 00 00      	stxdw [r6 + 0x58], r5
   9e0c8: 79 a5 c0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x140]
   9e0d0: 7b 56 60 00 00 00 00 00      	stxdw [r6 + 0x60], r5
   9e0d8: 7b 46 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r4
   9e0e0: 7b 26 37 00 00 00 00 00      	stxdw [r6 + 0x37], r2
   9e0e8: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   9e0f0: 7b 26 68 00 00 00 00 00      	stxdw [r6 + 0x68], r2
   9e0f8: 73 36 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r3
   9e100: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9e108: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   9e110: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   9e118: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9e120: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9e128: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9e130: 73 16 9c 00 00 00 00 00      	stxb [r6 + 0x9c], r1
   9e138: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   9e140: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9e148: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9e150: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9e158: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   9e160: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9e168: 72 06 9d 00 00 00 00 00      	stb [r6 + 0x9d], 0x0
   9e170: 05 00 fe fe 00 00 00 00      	ja -0x102 <.text+0x9d848>
