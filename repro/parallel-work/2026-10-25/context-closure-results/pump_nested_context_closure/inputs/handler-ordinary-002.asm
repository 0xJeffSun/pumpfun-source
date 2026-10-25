   20aa0: 7b 9a c8 f8 00 00 00 00      	stxdw [r10 - 0x738], r9
   20aa8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   20ab0: 7b 1a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r1
   20ab8: 7a 0a 50 fb 00 00 00 00      	stdw [r10 - 0x4b0], 0x0
   20ac0: 7a 0a 48 fb 00 00 00 00      	stdw [r10 - 0x4b8], 0x0
   20ac8: 7a 0a 40 fb 00 00 00 00      	stdw [r10 - 0x4c0], 0x0
   20ad0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   20ad8: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
   20ae0: 79 a1 c0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x740]
   20ae8: 05 00 2e fc 00 00 00 00      	ja -0x3d2 <.text+0x1eb40>
   20af0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   20af8: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   20b00: 18 02 00 00 4c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f4c
   20b10: 85 10 00 00 0d 6d 02 00      	call 0x26d0d
   20b18: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   20b20: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   20b28: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   20b30: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   20b40: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   20b48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   20b50: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   20b58: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   20b60: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   20b68: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   20b70: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   20b78: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   20b80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   20b88: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   20b90: 18 01 00 00 4c 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5f4c
   20ba0: 85 10 00 00 5c 7a 02 00      	call 0x27a5c
   20ba8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x20a98>
   20bb0: 05 00 55 00 00 00 00 00      	ja +0x55 <.text+0x20d40>
   20bb8: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   20bc0: 7b 1a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r1
   20bc8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   20bd0: 7b 1a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r1
   20bd8: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   20be0: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   20be8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   20bf0: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   20bf8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   20c00: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   20c08: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   20c10: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   20c18: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   20c28: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   20c30: 62 0a 38 fd b0 17 00 00      	stw [r10 - 0x2c8], 0x17b0
   20c38: 72 0a f0 fc 02 00 00 00      	stb [r10 - 0x310], 0x2
   20c40: 62 0a b8 fc d2 00 00 00      	stw [r10 - 0x348], 0xd2
   20c48: 7a 0a b0 fc 1e 00 00 00      	stdw [r10 - 0x350], 0x1e
   20c50: 7a 0a a0 fc 00 00 00 00      	stdw [r10 - 0x360], 0x0
   20c58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   20c60: 07 01 00 00 68 fa ff ff      	add64 r1, -0x598
   20c68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   20c70: 07 02 00 00 a0 fc ff ff      	add64 r2, -0x360
   20c78: 85 10 00 00 d6 f5 02 00      	call 0x2f5d6
   20c80: 79 a7 70 fa 00 00 00 00      	ldxdw r7, [r10 - 0x590]
   20c88: 79 a9 68 fa 00 00 00 00      	ldxdw r9, [r10 - 0x598]
   20c90: 05 00 66 00 00 00 00 00      	ja +0x66 <.text+0x20ea8>
   20c98: 79 17 10 00 00 00 00 00      	ldxdw r7, [r1 + 0x10]
   20ca0: 25 07 01 00 c8 00 00 00      	jgt r7, 0xc8, +0x1 <.text+0x20b90>
   20ca8: 05 00 ae 00 00 00 00 00      	ja +0xae <.text+0x21100>
   20cb0: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   20cb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   20cc0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   20cc8: 18 02 00 00 14 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e14
   20cd8: 85 10 00 00 d4 6c 02 00      	call 0x26cd4
   20ce0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   20ce8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   20cf0: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   20cf8: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   20d08: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   20d10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   20d18: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   20d20: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   20d28: 72 0a 90 fb 03 00 00 00      	stb [r10 - 0x470], 0x3
   20d30: 7a 0a 88 fb 20 00 00 00      	stdw [r10 - 0x478], 0x20
   20d38: 7a 0a 68 fb 00 00 00 00      	stdw [r10 - 0x498], 0x0
   20d40: 7a 0a 58 fb 00 00 00 00      	stdw [r10 - 0x4a8], 0x0
   20d48: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   20d50: 07 02 00 00 58 fb ff ff      	add64 r2, -0x4a8
   20d58: 18 01 00 00 14 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e14
   20d68: 85 10 00 00 23 7a 02 00      	call 0x27a23
   20d70: 15 00 71 00 00 00 00 00      	jeq r0, 0x0, +0x71 <.text+0x20fe0>
   20d78: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x20d40>
