    47d0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    47d8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    47e0: 79 78 18 00 00 00 00 00      	ldxdw r8, [r7 + 0x18]
    47e8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    47f0: 18 02 00 00 a0 36 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc36a0
    4800: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    4808: 85 10 00 00 e4 7b 01 00      	call 0x17be4 ; target 0xc2730
    4810: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    4818: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    4820: 15 00 2a 00 00 00 00 00      	jeq r0, 0x0, +0x2a <.text+0x4858> ; branch 0x4978
    4828: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    4830: 18 02 00 00 ad 4e 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc4ead
    4840: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    4848: 85 10 00 00 dc 7b 01 00      	call 0x17bdc ; target 0xc2730
    4850: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    4858: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    4860: 15 00 2c 00 00 00 00 00      	jeq r0, 0x0, +0x2c <.text+0x48a8> ; branch 0x49c8
    4868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4870: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
    4878: b7 02 00 00 bf 0b 00 00      	mov64 r2, 0xbbf
    4880: 85 10 00 00 0d 57 01 00      	call 0x1570d ; target 0xb00f0
    4888: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
    4890: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
    4898: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
    48a0: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
    48a8: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
    48b0: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
    48b8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
    48c0: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
    48c8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    48d0: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
    48d8: 18 01 00 00 0c 35 ff a9 00 00 00 00 05 5a 8e 56      	lddw r1, 0x568e5a05a9ff350c
    48e8: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
    48f0: 18 01 00 00 8d a8 f7 bc 00 00 00 00 07 56 15 27      	lddw r1, 0x27155607bcf7a88d
    4900: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
    4908: 18 01 00 00 4c f1 c9 2c 00 00 00 00 a4 1f 40 00      	lddw r1, 0x401fa42cc9f14c
    4918: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
    4920: 18 01 00 00 9c 51 6a a4 00 00 00 00 14 c2 7c 70      	lddw r1, 0x707cc214a46a519c
    4930: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
    4938: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4940: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
    4948: bf a4 00 00 00 00 00 00      	mov64 r4, r10
    4950: 07 04 00 00 60 ff ff ff      	add64 r4, -0xa0
    4958: 85 10 00 00 65 51 01 00      	call 0x15165 ; target 0xad488
    4960: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
    4968: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
    4970: 05 00 2c 00 00 00 00 00      	ja +0x2c <.text+0x49b8> ; branch 0x4ad8
    4978: bf 71 00 00 00 00 00 00      	mov64 r1, r7
    4980: 85 10 00 00 ef 5b 01 00      	call 0x15bef ; target 0xb2900
    4988: 55 00 d3 ff 00 00 00 00      	jne r0, 0x0, -0x2d <.text+0x4708> ; branch 0x4828
    4990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4998: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
    49a0: b7 02 00 00 c4 0b 00 00      	mov64 r2, 0xbc4
    49a8: 85 10 00 00 e8 56 01 00      	call 0x156e8 ; target 0xb00f0
    49b0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
    49b8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
    49c0: 05 00 22 00 00 00 00 00      	ja +0x22 <.text+0x49b8> ; branch 0x4ad8
    49c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    49d0: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
    49d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    49e0: 85 10 00 00 3a 5c 01 00      	call 0x15c3a ; target 0xb2bb8
    49e8: 79 a8 70 ff 00 00 00 00      	ldxdw r8, [r10 - 0x90]
    49f0: 79 a1 68 ff 00 00 00 00      	ldxdw r1, [r10 - 0x98]
    49f8: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
    4a00: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
    4a10: 1d 32 01 00 00 00 00 00      	jeq r2, r3, +0x1 <.text+0x4900> ; branch 0x4a20
    4a18: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x4968> ; branch 0x4a88
    4a20: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    4a28: 25 02 1b 00 07 00 00 00      	jgt r2, 0x7, +0x1b <.text+0x49e8> ; branch 0x4b08
    4a30: 18 01 00 00 03 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7ffffffffffffffd
    4a40: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    4a48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4a50: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
    4a58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4a60: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
    4a68: 85 10 00 00 11 51 01 00      	call 0x15111 ; target 0xad2f8
    4a70: 79 a9 18 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe8]
    4a78: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
    4a80: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0x4a70> ; branch 0x4b90
    4a88: 7b 8a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r8
    4a90: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
    4a98: 7b 2a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r2
    4aa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4aa8: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
    4ab0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4ab8: 07 02 00 00 60 ff ff ff      	add64 r2, -0xa0
    4ac0: 85 10 00 00 06 51 01 00      	call 0x15106 ; target 0xad2f8
    4ac8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
    4ad0: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
    4ad8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
    4ae0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    4ae8: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
    4af8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
    4b00: 95 00 00 00 00 00 00 00      	exit
    4b08: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    4b10: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4b18: 7b 2a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r2
    4b20: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
    4b28: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
    4b30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4b38: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
    4b40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4b48: 07 02 00 00 50 ff ff ff      	add64 r2, -0xb0
    4b50: 85 10 00 00 33 74 00 00      	call 0x7433 ; target 0x3ecf0
    4b58: 79 a9 70 ff 00 00 00 00      	ldxdw r9, [r10 - 0x90]
    4b60: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
    4b68: 79 a3 60 ff 00 00 00 00      	ldxdw r3, [r10 - 0xa0]
    4b70: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
    4b80: 1d 13 01 00 00 00 00 00      	jeq r3, r1, +0x1 <.text+0x4a70> ; branch 0x4b90
    4b88: 05 00 05 00 00 00 00 00      	ja +0x5 <.text+0x4a98> ; branch 0x4bb8
    4b90: 7b 96 10 00 00 00 00 00      	stxdw [r6 + 0x10], r9
    4b98: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
    4ba0: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
    4bb0: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x4b00> ; branch 0x4c20
    4bb8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
    4bc0: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
    4bc8: 7b 2a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r2
    4bd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4bd8: 07 02 00 00 78 ff ff ff      	add64 r2, -0x88
    4be0: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
    4be8: b7 03 00 00 70 00 00 00      	mov64 r3, 0x70
    4bf0: 85 10 00 00 5a 7b 01 00      	call 0x17b5a ; target 0xc26c8
    4bf8: 7b 76 88 00 00 00 00 00      	stxdw [r6 + 0x88], r7
    4c00: 7b 96 10 00 00 00 00 00      	stxdw [r6 + 0x10], r9
    4c08: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
    4c10: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    4c18: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
    4c20: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
    4c28: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    4c30: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
    4c38: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
    4c40: 05 00 d7 ff 00 00 00 00      	ja -0x29 <.text+0x49e0> ; branch 0x4b00
