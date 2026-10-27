   11ca8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   11cb0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   11cb8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   11cc0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   11cc8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   11cd0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   11cd8: 18 01 00 00 22 c5 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c522
   11ce8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   11cf0: 62 0a 80 ff 80 17 00 00      	stw [r10 - 0x80], 0x1780
   11cf8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   11d00: 62 0a 00 ff 15 00 00 00      	stw [r10 - 0x100], 0x15
   11d08: 7a 0a f8 fe 2f 00 00 00      	stdw [r10 - 0x108], 0x2f
   11d10: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   11d18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   11d20: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   11d28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   11d30: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   11d38: 85 10 00 00 4f e2 01 00      	call 0x1e24f
   11d40: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   11d48: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   11d50: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x11d20>
   11d58: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   11d60: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0x11d20>
   11d68: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   11d70: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   11d78: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   11d80: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   130e0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   130e8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   130f0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   130f8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   13100: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   13108: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   13110: 18 01 00 00 51 c5 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c551
   13120: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   13128: 62 0a 80 ff 89 17 00 00      	stw [r10 - 0x80], 0x1789
   13130: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   13138: 62 0a 00 ff 15 00 00 00      	stw [r10 - 0x100], 0x15
   13140: 7a 0a f8 fe 23 00 00 00      	stdw [r10 - 0x108], 0x23
   13148: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   13150: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   13158: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   13160: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   13168: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   13170: 85 10 00 00 c8 df 01 00      	call 0x1dfc8
   13178: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   13180: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   13188: 05 00 df ff 00 00 00 00      	ja -0x21 <.text+0x12f68>
   13190: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   13198: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   131a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   131a8: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   131b0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   131b8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   35710: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   35718: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   35720: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   35728: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   35730: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   35738: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   35740: 18 01 00 00 9a cc 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cc9a
   35750: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   35758: 62 0a d8 fe ab 17 00 00      	stw [r10 - 0x128], 0x17ab
   35760: 72 0a 90 fe 02 00 00 00      	stb [r10 - 0x170], 0x2
   35768: 62 0a 58 fe 2c 00 00 00      	stw [r10 - 0x1a8], 0x2c
   35770: 7a 0a 50 fe 2e 00 00 00      	stdw [r10 - 0x1b0], 0x2e
   35778: 7a 0a 40 fe 00 00 00 00      	stdw [r10 - 0x1c0], 0x0
   35780: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   35788: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   35790: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   35798: 07 02 00 00 40 fe ff ff      	add64 r2, -0x1c0
   357a0: 85 10 00 00 02 9b 01 00      	call 0x19b02
   357a8: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   357b0: 79 a2 48 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b8]
   357b8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   357c0: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   357c8: 95 00 00 00 00 00 00 00      	exit
   357d0: 79 a6 00 fd 00 00 00 00      	ldxdw r6, [r10 - 0x300]
   357d8: 7b 7a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r7
   357e0: 79 a7 f8 fc 00 00 00 00      	ldxdw r7, [r10 - 0x308]
   357e8: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   36de8: 85 10 00 00 c1 7c 00 00      	call 0x7cc1
   36df0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   36df8: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   36e00: 18 02 00 00 40 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c040
   36e10: 85 10 00 00 31 a3 ff ff      	call -0x5ccf
   36e18: 18 01 00 00 9a cc 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cc9a
   36e28: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   36e30: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   36e38: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   36e40: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   36e48: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   36e50: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   36e58: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   36e60: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   36e68: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   36e70: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   36e78: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   36e80: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   36e88: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   36e90: 62 0a d8 fe 87 17 00 00      	stw [r10 - 0x128], 0x1787
   36e98: 72 0a 90 fe 02 00 00 00      	stb [r10 - 0x170], 0x2
   36ea0: 62 0a 58 fe 62 00 00 00      	stw [r10 - 0x1a8], 0x62
   36ea8: 7a 0a 50 fe 2e 00 00 00      	stdw [r10 - 0x1b0], 0x2e
   36eb0: 7a 0a 40 fe 00 00 00 00      	stdw [r10 - 0x1c0], 0x0
   36eb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   36ec0: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   36ec8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   36ed0: 07 02 00 00 40 fe ff ff      	add64 r2, -0x1c0
   36ed8: 85 10 00 00 1b 98 01 00      	call 0x1981b
   37038: 85 10 00 00 77 7c 00 00      	call 0x7c77
   37040: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   37048: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   37050: 18 02 00 00 40 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c040
   37060: 85 10 00 00 e7 a2 ff ff      	call -0x5d19
   37068: 18 01 00 00 9a cc 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cc9a
   37078: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   37080: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   37088: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   37090: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   37098: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   370a0: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   370a8: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   370b0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   370b8: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   370c0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   370c8: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   370d0: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   370d8: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   370e0: 62 0a d8 fe 87 17 00 00      	stw [r10 - 0x128], 0x1787
   370e8: 72 0a 90 fe 02 00 00 00      	stb [r10 - 0x170], 0x2
   370f0: 62 0a 58 fe 62 00 00 00      	stw [r10 - 0x1a8], 0x62
   370f8: 7a 0a 50 fe 2e 00 00 00      	stdw [r10 - 0x1b0], 0x2e
   37100: 7a 0a 40 fe 00 00 00 00      	stdw [r10 - 0x1c0], 0x0
   37108: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   37110: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   37118: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   37120: 07 02 00 00 40 fe ff ff      	add64 r2, -0x1c0
   37128: 85 10 00 00 d1 97 01 00      	call 0x197d1
   37388: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   37390: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   37398: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   373a0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   373a8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   373b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   373b8: 18 01 00 00 9a cc 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cc9a
   373c8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   373d0: 62 0a 80 ff aa 17 00 00      	stw [r10 - 0x80], 0x17aa
   373d8: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   373e0: 62 0a 00 ff 74 00 00 00      	stw [r10 - 0x100], 0x74
   373e8: 7a 0a f8 fe 2e 00 00 00      	stdw [r10 - 0x108], 0x2e
   373f0: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   373f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   37400: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   37408: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   37410: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   37418: 85 10 00 00 73 97 01 00      	call 0x19773
   37420: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   37428: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   37430: 05 00 47 00 00 00 00 00      	ja +0x47 <.text+0x37550>
   37438: 27 01 00 00 30 00 00 00      	mul64 r1, 0x30
   37440: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   37448: 0f 17 00 00 00 00 00 00      	add64 r7, r1
   37450: 79 51 10 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff0]
   37458: 79 53 08 f0 00 00 00 00      	ldxdw r3, [r5 - 0xff8]
   37460: 27 00 00 00 30 00 00 00      	mul64 r0, 0x30
   375c8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   375d0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   375d8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   375e0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   375e8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   375f0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   375f8: 18 01 00 00 9a cc 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cc9a
   37608: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   37610: 62 0a 80 ff aa 17 00 00      	stw [r10 - 0x80], 0x17aa
   37618: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   37620: 62 0a 00 ff 79 00 00 00      	stw [r10 - 0x100], 0x79
   37628: 7a 0a f8 fe 2e 00 00 00      	stdw [r10 - 0x108], 0x2e
   37630: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   37638: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   37640: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   37648: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   37650: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   37658: 85 10 00 00 2b 97 01 00      	call 0x1972b
   37660: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   37668: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   37670: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   37678: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   37680: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   37688: 95 00 00 00 00 00 00 00      	exit
   37690: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   37698: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   376a0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   4c280: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   4c288: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   4c290: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   4c298: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   4c2a0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   4c2a8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   4c2b0: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4c2c0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   4c2c8: 62 0a 88 ff 87 17 00 00      	stw [r10 - 0x78], 0x1787
   4c2d0: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   4c2d8: 62 0a 08 ff b3 00 00 00      	stw [r10 - 0xf8], 0xb3
   4c2e0: 7a 0a 00 ff 2f 00 00 00      	stdw [r10 - 0x100], 0x2f
   4c2e8: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   4c2f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c2f8: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   4c300: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4c308: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   4c310: 85 10 00 00 94 6d 01 00      	call 0x16d94
   4c318: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   4c320: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   4c328: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   4c330: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   4c338: 95 00 00 00 00 00 00 00      	exit
   4c340: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   4c348: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c350: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   4c358: 18 02 00 00 40 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c040
   4c978: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4c980: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   4c988: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   4c990: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   4c998: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   4c9a0: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   4c9a8: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4c9b8: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   4c9c0: 62 0a e8 fd ab 17 00 00      	stw [r10 - 0x218], 0x17ab
   4c9c8: 72 0a a0 fd 02 00 00 00      	stb [r10 - 0x260], 0x2
   4c9d0: 62 0a 68 fd 7a 01 00 00      	stw [r10 - 0x298], 0x17a
   4c9d8: 7a 0a 60 fd 2f 00 00 00      	stdw [r10 - 0x2a0], 0x2f
   4c9e0: 7a 0a 50 fd 00 00 00 00      	stdw [r10 - 0x2b0], 0x0
   4c9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c9f0: 07 01 00 00 f0 fa ff ff      	add64 r1, -0x510
   4c9f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ca00: 07 02 00 00 50 fd ff ff      	add64 r2, -0x2b0
   4ca08: 85 10 00 00 b5 6c 01 00      	call 0x16cb5
   4ca10: 79 a9 f8 fa 00 00 00 00      	ldxdw r9, [r10 - 0x508]
   4ca18: 79 a8 f0 fa 00 00 00 00      	ldxdw r8, [r10 - 0x510]
   4ca20: 05 00 d1 00 00 00 00 00      	ja +0xd1 <.text+0x4cf90>
   4ca28: 7b 6a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r6
   4ca30: 7b 3a 90 fa 00 00 00 00      	stxdw [r10 - 0x570], r3
   4ca38: 79 51 38 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfc8]
   4ca40: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   4ca48: 79 51 30 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfd0]
   4ca50: 7b 1a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r1
   4ce58: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4ce60: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   4ce68: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   4ce70: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   4ce78: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   4ce80: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   4ce88: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4ce98: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   4cea0: 62 0a e8 fd ab 17 00 00      	stw [r10 - 0x218], 0x17ab
   4cea8: 72 0a a0 fd 02 00 00 00      	stb [r10 - 0x260], 0x2
   4ceb0: 62 0a 68 fd 7f 01 00 00      	stw [r10 - 0x298], 0x17f
   4ceb8: 7a 0a 60 fd 2f 00 00 00      	stdw [r10 - 0x2a0], 0x2f
   4cec0: 7a 0a 50 fd 00 00 00 00      	stdw [r10 - 0x2b0], 0x0
   4cec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ced0: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   4ced8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4cee0: 07 02 00 00 50 fd ff ff      	add64 r2, -0x2b0
   4cee8: 85 10 00 00 19 6c 01 00      	call 0x16c19
   4cef0: 79 a9 08 fb 00 00 00 00      	ldxdw r9, [r10 - 0x4f8]
   4cef8: 79 a8 00 fb 00 00 00 00      	ldxdw r8, [r10 - 0x500]
   4cf00: 05 00 35 00 00 00 00 00      	ja +0x35 <.text+0x4cf90>
   4cf08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4cf10: 07 01 00 00 90 fc ff ff      	add64 r1, -0x370
   4cf18: 18 02 00 00 78 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c078
   4cf28: 85 10 00 00 99 50 00 00      	call 0x5099
   4cf30: 7a 0a e0 fc 00 00 00 00      	stdw [r10 - 0x320], 0x0
   4e3e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e3e8: 07 01 00 00 50 fd ff ff      	add64 r1, -0x2b0
   4e3f0: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   4e3f8: 85 10 00 00 22 68 ff ff      	call -0x97de
   4e400: 79 a9 58 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2a8]
   4e408: 79 a8 50 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2b0]
   4e410: 61 a6 00 fe 00 00 00 00      	ldxw r6, [r10 - 0x200]
   4e418: 15 06 cc 00 02 00 00 00      	jeq r6, 0x2, +0xcc <.text+0x4e960>
   4e420: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e428: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   4e430: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4e438: 07 02 00 00 60 fd ff ff      	add64 r2, -0x2a0
   4e440: b7 03 00 00 a0 00 00 00      	mov64 r3, 0xa0
   4e448: 85 10 00 00 89 96 01 00      	call 0x19689
   4e600: 85 10 00 00 be 4d 00 00      	call 0x4dbe
   4e608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e610: 07 01 00 00 90 fc ff ff      	add64 r1, -0x370
   4e618: 18 02 00 00 40 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c040
   4e628: 85 10 00 00 2e 74 ff ff      	call -0x8bd2
   4e630: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4e640: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   4e648: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   4e650: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   4e658: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   4e660: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   4e668: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   4e670: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   4e678: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4e680: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   4e688: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   4e690: 7b 1a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r1
   4e698: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   4e6a0: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   4e6a8: 62 0a e8 fd 87 17 00 00      	stw [r10 - 0x218], 0x1787
   4e6b0: 72 0a a0 fd 02 00 00 00      	stb [r10 - 0x260], 0x2
   4e6b8: 62 0a 68 fd f6 01 00 00      	stw [r10 - 0x298], 0x1f6
   4e6c0: 7a 0a 60 fd 2f 00 00 00      	stdw [r10 - 0x2a0], 0x2f
   4e6c8: 7a 0a 50 fd 00 00 00 00      	stdw [r10 - 0x2b0], 0x0
   4e6d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e6d8: 07 01 00 00 30 fb ff ff      	add64 r1, -0x4d0
   4e6e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4e6e8: 07 02 00 00 50 fd ff ff      	add64 r2, -0x2b0
   4e6f0: 85 10 00 00 18 69 01 00      	call 0x16918
   4e828: 85 10 00 00 79 4d 00 00      	call 0x4d79
   4e830: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e838: 07 01 00 00 90 fc ff ff      	add64 r1, -0x370
   4e840: 18 02 00 00 40 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c040
   4e850: 85 10 00 00 e9 73 ff ff      	call -0x8c17
   4e858: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4e868: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   4e870: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   4e878: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   4e880: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   4e888: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   4e890: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   4e898: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   4e8a0: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4e8a8: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   4e8b0: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   4e8b8: 7b 1a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r1
   4e8c0: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   4e8c8: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   4e8d0: 62 0a e8 fd 87 17 00 00      	stw [r10 - 0x218], 0x1787
   4e8d8: 72 0a a0 fd 02 00 00 00      	stb [r10 - 0x260], 0x2
   4e8e0: 62 0a 68 fd f6 01 00 00      	stw [r10 - 0x298], 0x1f6
   4e8e8: 7a 0a 60 fd 2f 00 00 00      	stdw [r10 - 0x2a0], 0x2f
   4e8f0: 7a 0a 50 fd 00 00 00 00      	stdw [r10 - 0x2b0], 0x0
   4e8f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4e900: 07 01 00 00 60 fb ff ff      	add64 r1, -0x4a0
   4e908: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4e910: 07 02 00 00 50 fd ff ff      	add64 r2, -0x2b0
   4e918: 85 10 00 00 d3 68 01 00      	call 0x168d3
   4ee10: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   4ee18: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   4ee20: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   4ee28: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   4ee30: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   4ee38: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   4ee40: 18 01 00 00 1c cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd1c
   4ee50: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   4ee58: 62 0a 80 ff ae 17 00 00      	stw [r10 - 0x80], 0x17ae
   4ee60: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   4ee68: 62 0a 00 ff 08 02 00 00      	stw [r10 - 0x100], 0x208
   4ee70: 7a 0a f8 fe 2f 00 00 00      	stdw [r10 - 0x108], 0x2f
   4ee78: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   4ee80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4ee88: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   4ee90: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4ee98: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   4eea0: 85 10 00 00 22 68 01 00      	call 0x16822
   4eea8: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   4eeb0: 79 a9 b8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x148]
   4eeb8: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x4ee80>
   4eec0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   4eec8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   4eed0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   4eed8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   4eee0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   4eee8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6b998: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6b9a0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6b9a8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6b9b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6b9b8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6b9c0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6b9c8: 18 01 00 00 14 cf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cf14
   6b9d8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   6b9e0: 62 0a 88 ff 89 17 00 00      	stw [r10 - 0x78], 0x1789
   6b9e8: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   6b9f0: 62 0a 08 ff 82 01 00 00      	stw [r10 - 0xf8], 0x182
   6b9f8: 7a 0a 00 ff 23 00 00 00      	stdw [r10 - 0x100], 0x23
   6ba00: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   6ba08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6ba10: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   6ba18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6ba20: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   6ba28: 85 10 00 00 b1 2e 01 00      	call 0x12eb1
   6ba30: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   6ba38: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   6ba40: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   6ba48: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   6ba50: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   6ba58: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   6ba60: 95 00 00 00 00 00 00 00      	exit
   6ba68: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   6ba70: 79 23 08 01 00 00 00 00      	ldxdw r3, [r2 + 0x108]
   6bc10: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6bc18: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6bc20: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6bc28: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6bc30: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6bc38: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6bc40: 18 01 00 00 14 cf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cf14
   6bc50: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   6bc58: 62 0a 88 ff 87 17 00 00      	stw [r10 - 0x78], 0x1787
   6bc60: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   6bc68: 62 0a 08 ff 98 01 00 00      	stw [r10 - 0xf8], 0x198
   6bc70: 7a 0a 00 ff 23 00 00 00      	stdw [r10 - 0x100], 0x23
   6bc78: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   6bc80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6bc88: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   6bc90: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6bc98: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   6bca0: 85 10 00 00 62 2e 01 00      	call 0x12e62
   6bca8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   6bcb0: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   6bcb8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   6bcc0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   6bcc8: 95 00 00 00 00 00 00 00      	exit
   6bcd0: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   6bcd8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   6bce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6bce8: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   6be90: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6be98: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6bea0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6bea8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6beb0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   6beb8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   6bec0: 18 01 00 00 14 cf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cf14
   6bed0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   6bed8: 62 0a 88 ff 87 17 00 00      	stw [r10 - 0x78], 0x1787
   6bee0: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   6bee8: 62 0a 08 ff a1 01 00 00      	stw [r10 - 0xf8], 0x1a1
   6bef0: 7a 0a 00 ff 23 00 00 00      	stdw [r10 - 0x100], 0x23
   6bef8: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   6bf00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6bf08: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   6bf10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6bf18: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   6bf20: 85 10 00 00 12 2e 01 00      	call 0x12e12
   6bf28: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   6bf30: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   6bf38: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   6bf40: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   6bf48: 95 00 00 00 00 00 00 00      	exit
   6bf50: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   6bf58: 79 27 e8 00 00 00 00 00      	ldxdw r7, [r2 + 0xe8]
   6bf60: 79 28 e0 00 00 00 00 00      	ldxdw r8, [r2 + 0xe0]
   6bf68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6c5b0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   6c5b8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   6c5c0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   6c5c8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   6c5d0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   6c5d8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   6c5e0: 18 01 00 00 14 cf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cf14
   6c5f0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   6c5f8: 62 0a 80 ff 87 17 00 00      	stw [r10 - 0x80], 0x1787
   6c600: 72 0a 38 ff 02 00 00 00      	stb [r10 - 0xc8], 0x2
   6c608: 62 0a 00 ff b7 01 00 00      	stw [r10 - 0x100], 0x1b7
   6c610: 7a 0a f8 fe 23 00 00 00      	stdw [r10 - 0x108], 0x23
   6c618: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   6c620: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   6c628: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   6c630: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   6c638: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   6c640: 85 10 00 00 2e 2d 01 00      	call 0x12d2e
   6c648: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   6c650: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   6c658: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0x6c630>
   6c660: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   6c668: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   6c670: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x6c640>
   6c678: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   6c680: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   6c688: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
