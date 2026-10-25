   38670: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   38678: bf 38 00 00 00 00 00 00      	mov64 r8, r3
   38680: 7b 2a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r2
   38688: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   38690: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38698: 07 01 00 00 20 fb ff ff      	add64 r1, -0x4e0
   386a0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   386a8: 85 10 00 00 51 a3 ff ff      	call -0x5caf ; target 0xa138
   386b0: 79 a9 28 fb 00 00 00 00      	ldxdw r9, [r10 - 0x4d8]
   386b8: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   386c0: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   386c8: 71 a1 89 fb 00 00 00 00      	ldxb r1, [r10 - 0x477]
   386d0: 55 01 1a 00 02 00 00 00      	jne r1, 0x2, +0x1a <.text+0x38688>
   386d8: 85 10 00 00 e2 95 00 00      	call 0x95e2 ; target 0x835f0
   386e0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   386f0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   386f8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   38700: 07 01 00 00 f4 ff ff ff      	add64 r1, -0xc
   38708: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   38710: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   38718: 2d 21 44 00 00 00 00 00      	jgt r1, r2, +0x44 <.text+0x38820>
   38720: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   38728: 79 a5 18 fb 00 00 00 00      	ldxdw r5, [r10 - 0x4e8]
   38730: 15 04 43 00 00 00 00 00      	jeq r4, 0x0, +0x43 <.text+0x38830>
   38738: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   38748: 15 02 44 00 00 00 00 00      	jeq r2, 0x0, +0x44 <.text+0x38850>
   38750: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   38758: bf 52 00 00 00 00 00 00      	mov64 r2, r5
   38760: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   38768: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   38778: 2d 21 43 00 00 00 00 00      	jgt r1, r2, +0x43 <.text+0x38878>
   38780: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   38788: b7 02 00 00 0c 00 00 00      	mov64 r2, 0xc
   38790: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   387a0: 85 10 00 00 14 d6 00 00      	call 0xd614 ; target 0xa3848
   387a8: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   387b0: 79 77 08 f0 00 00 00 00      	ldxdw r7, [r7 - 0xff8]
   387b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   387c0: 07 01 00 00 98 fb ff ff      	add64 r1, -0x468
   387c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   387d0: 07 02 00 00 30 fb ff ff      	add64 r2, -0x4d0
   387d8: b7 03 00 00 59 00 00 00      	mov64 r3, 0x59
   387e0: 85 10 00 00 b4 e3 00 00      	call 0xe3b4 ; target 0xaa588
   387e8: 61 a1 8a fb 00 00 00 00      	ldxw r1, [r10 - 0x476]
   387f0: 63 1a 90 fb 00 00 00 00      	stxw [r10 - 0x470], r1
   387f8: 69 a1 8e fb 00 00 00 00      	ldxh r1, [r10 - 0x472]
   38800: 6b 1a 94 fb 00 00 00 00      	stxh [r10 - 0x46c], r1
   38808: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38810: 07 01 00 00 f8 fb ff ff      	add64 r1, -0x408
   38818: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   38820: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   38828: 85 10 00 00 98 94 ff ff      	call -0x6b68 ; target 0x2cf0
   38830: 61 a1 f8 fb 00 00 00 00      	ldxw r1, [r10 - 0x408]
   38838: 55 01 3a 00 02 00 00 00      	jne r1, 0x2, +0x3a <.text+0x388f0>
   38840: 79 a8 08 fc 00 00 00 00      	ldxdw r8, [r10 - 0x3f8]
   38848: 79 a7 00 fc 00 00 00 00      	ldxdw r7, [r10 - 0x400]
   38850: 85 10 00 00 b3 95 00 00      	call 0x95b3 ; target 0x835f0
   38858: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   38868: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   38870: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   38878: 07 01 00 00 fc ff ff ff      	add64 r1, -0x4
   38880: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   38888: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   38890: 2d 21 79 00 00 00 00 00      	jgt r1, r2, +0x79 <.text+0x38b40>
   38898: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   388a0: 15 04 78 00 00 00 00 00      	jeq r4, 0x0, +0x78 <.text+0x38b48>
   388a8: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   388b8: 15 02 79 00 00 00 00 00      	jeq r2, 0x0, +0x79 <.text+0x38b68>
   388c0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   388c8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   388d8: 15 07 78 00 01 00 00 00      	jeq r7, 0x1, +0x78 <.text+0x38b80>
   388e0: bd 21 78 00 00 00 00 00      	jle r1, r2, +0x78 <.text+0x38b88>
   388e8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   388f8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   38900: 62 01 00 00 6d 69 6e 74      	stw [r1 + 0x0], 0x746e696d
   38908: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   38910: 7b 18 10 00 00 00 00 00      	stxdw [r8 + 0x10], r1
   38918: 7a 08 18 00 04 00 00 00      	stdw [r8 + 0x18], 0x4
   38920: 7a 08 08 00 04 00 00 00      	stdw [r8 + 0x8], 0x4
   38928: 7a 08 00 00 01 00 00 00      	stdw [r8 + 0x0], 0x1
   38930: 7b 86 10 00 00 00 00 00      	stxdw [r6 + 0x10], r8
   38938: 05 00 61 00 00 00 00 00      	ja +0x61 <.text+0x38b28>
   38940: 79 a5 18 fb 00 00 00 00      	ldxdw r5, [r10 - 0x4e8]
   38948: 55 04 bd ff 00 00 00 00      	jne r4, 0x0, -0x43 <.text+0x38618>
   38950: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   38958: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   38968: 55 02 bc ff 00 00 00 00      	jne r2, 0x0, -0x44 <.text+0x38630>
   38970: bf 52 00 00 00 00 00 00      	mov64 r2, r5
   38978: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   38980: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   38990: bd 21 bd ff 00 00 00 00      	jle r1, r2, -0x43 <.text+0x38660>
   38998: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   389a8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   389b0: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 73      	lddw r2, 0x735f6d656879616d
   389c0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   389c8: 62 01 08 00 74 61 74 65      	stw [r1 + 0x8], 0x65746174
   389d0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   389d8: 7b 19 10 00 00 00 00 00      	stxdw [r9 + 0x10], r1
   389e0: 7a 09 18 00 0c 00 00 00      	stdw [r9 + 0x18], 0xc
   389e8: 7a 09 08 00 0c 00 00 00      	stdw [r9 + 0x8], 0xc
   389f0: 7a 09 00 00 01 00 00 00      	stdw [r9 + 0x0], 0x1
   389f8: 7b 96 10 00 00 00 00 00      	stxdw [r6 + 0x10], r9
   38a00: 7b 56 08 00 00 00 00 00      	stxdw [r6 + 0x8], r5
   38a08: 05 00 48 00 00 00 00 00      	ja +0x48 <.text+0x38b30>
   38a10: 7b 7a f0 fa 00 00 00 00      	stxdw [r10 - 0x510], r7
   38a18: 7b 1a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r1
   38a20: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   38a28: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   38a30: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   38a38: 7b 1a e8 fa 00 00 00 00      	stxdw [r10 - 0x518], r1
   38a40: 61 a1 fc fb 00 00 00 00      	ldxw r1, [r10 - 0x404]
   38a48: 7b 1a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r1
   38a50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38a58: 07 01 00 00 98 fc ff ff      	add64 r1, -0x368
   38a60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   38a68: 07 02 00 00 10 fc ff ff      	add64 r2, -0x3f0
   38a70: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   38a78: 85 10 00 00 61 e3 00 00      	call 0xe361 ; target 0xaa588
   38a80: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   38a88: 7b 1a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r1
   38a90: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   38a98: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   38aa0: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   38aa8: 7b 1a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r1
   38ab0: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   38ab8: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   38ac0: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   38ac8: 7b 1a f8 fa 00 00 00 00      	stxdw [r10 - 0x508], r1
   38ad0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38ad8: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   38ae0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   38ae8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   38af0: 85 10 00 00 50 94 ff ff      	call -0x6bb0 ; target 0x2d78
   38af8: 79 a1 e0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x320]
   38b00: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   38b08: 79 a7 d8 fc 00 00 00 00      	ldxdw r7, [r10 - 0x328]
   38b10: 61 a1 88 fd 00 00 00 00      	ldxw r1, [r10 - 0x278]
   38b18: 55 01 36 00 02 00 00 00      	jne r1, 0x2, +0x36 <.text+0x38bb0>
   38b20: 85 10 00 00 59 95 00 00      	call 0x9559 ; target 0x835f0
   38b28: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   38b38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   38b40: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   38b48: 07 01 00 00 ee ff ff ff      	add64 r1, -0x12
   38b50: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   38b58: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   38b60: 2d 21 5d 00 00 00 00 00      	jgt r1, r2, +0x5d <.text+0x38d30>
   38b68: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   38b70: 15 04 5c 00 00 00 00 00      	jeq r4, 0x0, +0x5c <.text+0x38d38>
   38b78: 18 01 00 00 ee 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fee
   38b88: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x38a78>
   38b90: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   38b98: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   38ba0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   38ba8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   38bb8: 79 a3 00 fb 00 00 00 00      	ldxdw r3, [r10 - 0x500]
   38bc0: bd 21 26 04 00 00 00 00      	jle r1, r2, +0x426 <.text+0x3abd8>
   38bc8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   38bd8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   38be0: 18 02 00 00 6f 6b 65 6e 00 00 00 00 5f 76 61 75      	lddw r2, 0x7561765f6e656b6f
   38bf0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   38bf8: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 74      	lddw r2, 0x745f6d656879616d
   38c08: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   38c10: 6a 01 10 00 6c 74 00 00      	sth [r1 + 0x10], 0x746c
   38c18: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   38c20: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   38c28: 7a 03 18 00 12 00 00 00      	stdw [r3 + 0x18], 0x12
   38c30: 7a 03 08 00 12 00 00 00      	stdw [r3 + 0x8], 0x12
   38c38: 7a 03 00 00 01 00 00 00      	stdw [r3 + 0x0], 0x1
   38c40: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   38c48: 7b 76 08 00 00 00 00 00      	stxdw [r6 + 0x8], r7
   38c50: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   38c58: 95 00 00 00 00 00 00 00      	exit
   38c60: 55 04 88 ff 00 00 00 00      	jne r4, 0x0, -0x78 <.text+0x38788>
   38c68: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   38c70: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   38c80: 55 02 87 ff 00 00 00 00      	jne r2, 0x0, -0x79 <.text+0x387a0>
   38c88: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   38c98: 55 07 88 ff 01 00 00 00      	jne r7, 0x1, -0x78 <.text+0x387c0>
   38ca0: 2d 21 88 ff 00 00 00 00      	jgt r1, r2, -0x78 <.text+0x387c8>
   38ca8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   38cb0: b7 02 00 00 04 00 00 00      	mov64 r2, 0x4
   38cb8: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   38cc8: 85 10 00 00 6f d5 00 00      	call 0xd56f ; target 0xa3848
   38cd0: 7b 1a a0 fa 00 00 00 00      	stxdw [r10 - 0x560], r1
   38cd8: 79 a1 f0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x310]
   38ce0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   38ce8: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   38cf0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   38cf8: 79 a1 00 fd 00 00 00 00      	ldxdw r1, [r10 - 0x300]
   38d00: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   38d08: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   38d10: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   38d18: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   38d20: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   38d28: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   38d30: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   38d38: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   38d40: 7b 1a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r1
   38d48: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   38d50: 7b 1a c0 fa 00 00 00 00      	stxdw [r10 - 0x540], r1
   38d58: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   38d60: 7b 1a b8 fa 00 00 00 00      	stxdw [r10 - 0x548], r1
   38d68: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   38d70: 7b 1a b0 fa 00 00 00 00      	stxdw [r10 - 0x550], r1
   38d78: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   38d80: 7b 1a a8 fa 00 00 00 00      	stxdw [r10 - 0x558], r1
   38d88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38d90: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   38d98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   38da0: 07 02 00 00 40 fd ff ff      	add64 r2, -0x2c0
   38da8: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   38db0: 85 10 00 00 fa e2 00 00      	call 0xe2fa ; target 0xaa588
   38db8: 61 a1 ac fd 00 00 00 00      	ldxw r1, [r10 - 0x254]
   38dc0: 63 1a d0 fd 00 00 00 00      	stxw [r10 - 0x230], r1
   38dc8: 79 a1 a4 fd 00 00 00 00      	ldxdw r1, [r10 - 0x25c]
   38dd0: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   38dd8: 79 a1 9c fd 00 00 00 00      	ldxdw r1, [r10 - 0x264]
   38de0: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   38de8: 79 a1 94 fd 00 00 00 00      	ldxdw r1, [r10 - 0x26c]
   38df0: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   38df8: 79 a1 8c fd 00 00 00 00      	ldxdw r1, [r10 - 0x274]
   38e00: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   38e08: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   38e10: 15 01 0d 00 00 00 00 00      	jeq r1, 0x0, +0xd <.text+0x38d60>
   38e18: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   38e20: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   38e28: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   38e30: 7b 1a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r1
   38e38: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   38e40: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   38e48: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x38d80>
   38e50: 55 04 a4 ff 00 00 00 00      	jne r4, 0x0, -0x5c <.text+0x38a58>
   38e58: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   38e60: 18 01 00 00 ee 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fee
   38e70: 55 02 a3 ff 00 00 00 00      	jne r2, 0x0, -0x5d <.text+0x38a70>
   38e78: 05 00 a3 ff 00 00 00 00      	ja -0x5d <.text+0x38a78>
   38e80: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   38e88: 85 10 00 00 eb c2 00 00      	call 0xc2eb ; target 0x9a5e8
   38e90: 55 00 70 00 02 00 00 00      	jne r0, 0x2, +0x70 <.text+0x390f8>
   38e98: 7b 1a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r1
   38ea0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   38ea8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   38eb0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   38eb8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   38ec0: 85 10 00 00 5f a2 ff ff      	call -0x5da1 ; target 0xa1c0
   38ec8: 71 a1 f9 ff 00 00 00 00      	ldxb r1, [r10 - 0x7]
   38ed0: 55 01 23 00 02 00 00 00      	jne r1, 0x2, +0x23 <.text+0x38ed0>
   38ed8: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
   38ee0: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
   38ee8: 85 10 00 00 e0 94 00 00      	call 0x94e0 ; target 0x835f0
   38ef0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   38f00: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   38f08: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   38f10: 07 01 00 00 f3 ff ff ff      	add64 r1, -0xd
   38f18: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   38f20: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   38f28: 2d 21 2e 00 00 00 00 00      	jgt r1, r2, +0x2e <.text+0x38f80>
   38f30: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   38f38: 15 04 2d 00 00 00 00 00      	jeq r4, 0x0, +0x2d <.text+0x38f88>
   38f40: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   38f50: 15 02 2e 00 00 00 00 00      	jeq r2, 0x0, +0x2e <.text+0x38fa8>
   38f58: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   38f60: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   38f70: 15 07 2d 00 01 00 00 00      	jeq r7, 0x1, +0x2d <.text+0x38fc0>
   38f78: bd 21 2d 00 00 00 00 00      	jle r1, r2, +0x2d <.text+0x38fc8>
   38f80: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   38f90: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   38f98: 18 02 00 00 6e 67 5f 63 00 00 00 00 75 72 76 65      	lddw r2, 0x65767275635f676e
   38fa8: 7b 21 05 00 00 00 00 00      	stxdw [r1 + 0x5], r2
   38fb0: 18 02 00 00 62 6f 6e 64 00 00 00 00 69 6e 67 5f      	lddw r2, 0x5f676e69646e6f62
   38fc0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   38fc8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   38fd0: 7b 18 10 00 00 00 00 00      	stxdw [r8 + 0x10], r1
   38fd8: 7a 08 18 00 0d 00 00 00      	stdw [r8 + 0x18], 0xd
   38fe0: 7a 08 08 00 0d 00 00 00      	stdw [r8 + 0x8], 0xd
   38fe8: 05 00 27 ff 00 00 00 00      	ja -0xd9 <.text+0x38808>
   38ff0: 85 10 00 00 bf 94 00 00      	call 0x94bf ; target 0x835f0
   38ff8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   39008: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   39010: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   39018: 07 03 00 00 a8 ff ff ff      	add64 r3, -0x58
   39020: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   39028: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   39030: 2d 53 1b 00 00 00 00 00      	jgt r3, r5, +0x1b <.text+0x38ff0>
   39038: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   39040: 15 04 1a 00 00 00 00 00      	jeq r4, 0x0, +0x1a <.text+0x38ff8>
   39048: 18 01 00 00 a8 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fa8
   39058: 15 05 1b 00 00 00 00 00      	jeq r5, 0x0, +0x1b <.text+0x39018>
   39060: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   39068: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   39070: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   39080: 2d 21 19 00 00 00 00 00      	jgt r1, r2, +0x19 <.text+0x39030>
   39088: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   39090: b7 02 00 00 58 00 00 00      	mov64 r2, 0x58
   39098: 85 10 00 00 f9 d4 00 00      	call 0xd4f9 ; target 0xa3868
   390a0: 55 04 d3 ff 00 00 00 00      	jne r4, 0x0, -0x2d <.text+0x38e20>
   390a8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   390b0: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   390c0: 55 02 d2 ff 00 00 00 00      	jne r2, 0x0, -0x2e <.text+0x38e38>
   390c8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   390d8: 55 07 d3 ff 01 00 00 00      	jne r7, 0x1, -0x2d <.text+0x38e58>
   390e0: 2d 21 d3 ff 00 00 00 00      	jgt r1, r2, -0x2d <.text+0x38e60>
   390e8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   390f0: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   390f8: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   39108: 85 10 00 00 e7 d4 00 00      	call 0xd4e7 ; target 0xa3848
   39110: 55 04 e6 ff 00 00 00 00      	jne r4, 0x0, -0x1a <.text+0x38f28>
   39118: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   39120: 18 01 00 00 a8 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fa8
   39130: 55 05 e5 ff 00 00 00 00      	jne r5, 0x0, -0x1b <.text+0x38f40>
   39138: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   39148: bd 21 e7 ff 00 00 00 00      	jle r1, r2, -0x19 <.text+0x38f68>
   39150: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   39160: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   39168: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39170: 07 02 00 00 a8 ff ff ff      	add64 r2, -0x58
   39178: 7b 1a 90 fa 00 00 00 00      	stxdw [r10 - 0x570], r1
   39180: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   39188: 85 10 00 00 7f e2 00 00      	call 0xe27f ; target 0xaa588
   39190: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   39198: 15 01 3d 00 00 00 00 00      	jeq r1, 0x0, +0x3d <.text+0x39268>
   391a0: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   391a8: 7b 2a 88 fa 00 00 00 00      	stxdw [r10 - 0x578], r2
   391b0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   391b8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   391c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   391c8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   391d0: 15 01 3b 00 00 00 00 00      	jeq r1, 0x0, +0x3b <.text+0x39290>
   391d8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   391e0: 7b 2a 80 fa 00 00 00 00      	stxdw [r10 - 0x580], r2
   391e8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   391f0: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   391f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   39200: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   39208: 55 01 48 00 00 00 00 00      	jne r1, 0x0, +0x48 <.text+0x39330>
   39210: 05 00 38 00 00 00 00 00      	ja +0x38 <.text+0x392b8>
   39218: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   39220: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   39228: 85 10 00 00 78 94 00 00      	call 0x9478 ; target 0x835f0
   39230: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   39240: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   39248: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   39250: 07 01 00 00 f7 ff ff ff      	add64 r1, -0x9
   39258: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   39260: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   39268: 2d 21 1c 00 00 00 00 00      	jgt r1, r2, +0x1c <.text+0x39230>
   39270: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   39278: 15 04 1b 00 00 00 00 00      	jeq r4, 0x0, +0x1b <.text+0x39238>
   39280: 18 01 00 00 f7 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff7
   39290: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   39298: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x39188>
   392a0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   392a8: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   392b0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   392b8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   392c8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   392d0: bd 21 81 03 00 00 00 00      	jle r1, r2, +0x381 <.text+0x3adc0>
   392d8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   392e8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   392f0: 18 02 00 00 73 6f 6c 5f 00 00 00 00 76 61 75 6c      	lddw r2, 0x6c7561765f6c6f73
   39300: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   39308: 72 01 08 00 74 00 00 00      	stb [r1 + 0x8], 0x74
   39310: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   39318: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   39320: 7a 03 18 00 09 00 00 00      	stdw [r3 + 0x18], 0x9
   39328: 7a 03 08 00 09 00 00 00      	stdw [r3 + 0x8], 0x9
   39330: 7a 03 00 00 01 00 00 00      	stdw [r3 + 0x0], 0x1
   39338: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   39340: 7b 46 08 00 00 00 00 00      	stxdw [r6 + 0x8], r4
   39348: 05 00 20 ff 00 00 00 00      	ja -0xe0 <.text+0x38b30>
   39350: 55 04 e5 ff 00 00 00 00      	jne r4, 0x0, -0x1b <.text+0x39160>
   39358: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   39360: 18 01 00 00 f7 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff7
   39370: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   39378: 55 02 e4 ff 00 00 00 00      	jne r2, 0x0, -0x1c <.text+0x39180>
   39380: 05 00 e4 ff 00 00 00 00      	ja -0x1c <.text+0x39188>
   39388: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   39390: 85 10 00 00 4a c2 00 00      	call 0xc24a ; target 0x9a5e8
   39398: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   393a0: 55 00 55 00 02 00 00 00      	jne r0, 0x2, +0x55 <.text+0x39530>
   393a8: 7b 2a 88 fa 00 00 00 00      	stxdw [r10 - 0x578], r2
   393b0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   393b8: 85 10 00 00 45 c2 00 00      	call 0xc245 ; target 0x9a5e8
   393c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   393c8: 55 00 07 00 02 00 00 00      	jne r0, 0x2, +0x7 <.text+0x392e8>
   393d0: 7b 2a 80 fa 00 00 00 00      	stxdw [r10 - 0x580], r2
   393d8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   393e0: 85 10 00 00 40 c2 00 00      	call 0xc240 ; target 0x9a5e8
   393e8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   393f0: 55 00 12 00 02 00 00 00      	jne r0, 0x2, +0x12 <.text+0x39368>
   393f8: 7b 2a 78 fa 00 00 00 00      	stxdw [r10 - 0x588], r2
   39400: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x393a0>
   39408: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39410: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   39420: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   39428: 85 10 00 00 1c 95 ff ff      	call -0x6ae4 ; target 0x3d10
   39430: 55 00 af 02 02 00 00 00      	jne r0, 0x2, +0x2af <.text+0x3a890>
   39438: 7b 1a 80 fa 00 00 00 00      	stxdw [r10 - 0x580], r1
   39440: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   39448: 15 01 f1 ff 00 00 00 00      	jeq r1, 0x0, -0xf <.text+0x392b8>
   39450: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   39458: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   39460: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   39468: 7b 1a 78 fa 00 00 00 00      	stxdw [r10 - 0x588], r1
   39470: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   39478: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   39480: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x393a0>
   39488: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39490: 18 03 00 00 fa db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbfa ; data 'pump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_p'
   394a0: b7 04 00 00 14 00 00 00      	mov64 r4, 0x14
   394a8: 85 10 00 00 0c 95 ff ff      	call -0x6af4 ; target 0x3d10
   394b0: 55 00 9f 02 02 00 00 00      	jne r0, 0x2, +0x29f <.text+0x3a890>
   394b8: 7b 1a 78 fa 00 00 00 00      	stxdw [r10 - 0x588], r1
   394c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   394c8: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   394d0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   394d8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   394e0: 85 10 00 00 df a1 ff ff      	call -0x5e21 ; target 0xa3e0
   394e8: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   394f0: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   394f8: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x393f0>
   39500: 7b 2a 70 fa 00 00 00 00      	stxdw [r10 - 0x590], r2
   39508: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x39420>
   39510: 18 03 00 00 f4 da 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadaf4 ; data 'system_programglobal-paramsglobal_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogra'
   39520: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   39528: 85 10 00 00 fc 94 ff ff      	call -0x6b04 ; target 0x3d10
   39530: 55 00 8f 02 02 00 00 00      	jne r0, 0x2, +0x28f <.text+0x3a890>
   39538: 7b 1a 70 fa 00 00 00 00      	stxdw [r10 - 0x590], r1
   39540: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39548: 07 01 00 00 60 fe ff ff      	add64 r1, -0x1a0
   39550: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   39558: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   39560: 85 10 00 00 77 8d ff ff      	call -0x7289 ; target 0x120
   39568: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   39570: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   39578: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x39490>
   39580: 18 03 00 00 89 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb89 ; data 'token_programassociated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_prog'
   39590: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   39598: 85 10 00 00 ee 94 ff ff      	call -0x6b12 ; target 0x3d10
   395a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   395a8: 55 00 2a 00 02 00 00 00      	jne r0, 0x2, +0x2a <.text+0x395e0>
   395b0: 7b 2a 68 fa 00 00 00 00      	stxdw [r10 - 0x598], r2
   395b8: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   395c0: 15 03 1b 00 00 00 00 00      	jeq r3, 0x0, +0x1b <.text+0x39580>
   395c8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   395d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   395d8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   395e0: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   395e8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   395f0: 7b 38 08 00 00 00 00 00      	stxdw [r8 + 0x8], r3
   395f8: 7b 1a 60 fa 00 00 00 00      	stxdw [r10 - 0x5a0], r1
   39600: 15 03 18 00 00 00 00 00      	jeq r3, 0x0, +0x18 <.text+0x395a8>
   39608: 7b 7a 58 fa 00 00 00 00      	stxdw [r10 - 0x5a8], r7
   39610: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   39618: 7b 38 08 00 00 00 00 00      	stxdw [r8 + 0x8], r3
   39620: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   39628: 7b 1a 50 fa 00 00 00 00      	stxdw [r10 - 0x5b0], r1
   39630: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   39638: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   39640: 79 a8 18 fb 00 00 00 00      	ldxdw r8, [r10 - 0x4e8]
   39648: 05 00 20 00 00 00 00 00      	ja +0x20 <.text+0x39630>
   39650: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39658: 18 03 00 00 e8 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbe8 ; data 'globalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atat'
   39668: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   39670: 85 10 00 00 d3 94 ff ff      	call -0x6b2d ; target 0x3d10
   39678: 55 00 66 02 02 00 00 00      	jne r0, 0x2, +0x266 <.text+0x3a890>
   39680: 7b 1a 88 fa 00 00 00 00      	stxdw [r10 - 0x578], r1
   39688: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   39690: 55 01 68 ff 00 00 00 00      	jne r1, 0x0, -0x98 <.text+0x390b8>
   39698: 05 00 a2 ff 00 00 00 00      	ja -0x5e <.text+0x39290>
   396a0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   396a8: 85 10 00 00 e7 c1 00 00      	call 0xc1e7 ; target 0x9a5e8
   396b0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   396b8: 55 00 6e 00 02 00 00 00      	jne r0, 0x2, +0x6e <.text+0x39910>
   396c0: 7b 2a 60 fa 00 00 00 00      	stxdw [r10 - 0x5a0], r2
   396c8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   396d0: 85 10 00 00 e2 c1 00 00      	call 0xc1e2 ; target 0x9a5e8
   396d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   396e0: 79 a8 18 fb 00 00 00 00      	ldxdw r8, [r10 - 0x4e8]
   396e8: 55 00 04 00 02 00 00 00      	jne r0, 0x2, +0x4 <.text+0x395f0>
   396f0: 7b 2a 50 fa 00 00 00 00      	stxdw [r10 - 0x5b0], r2
   396f8: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x39628>
   39700: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   39708: 05 00 55 02 00 00 00 00      	ja +0x255 <.text+0x3a898>
   39710: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39718: 18 03 00 00 5c db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb5c ; data 'programsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statem'
   39728: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   39730: 85 10 00 00 bb 94 ff ff      	call -0x6b45 ; target 0x3d10
   39738: 55 00 4e 02 02 00 00 00      	jne r0, 0x2, +0x24e <.text+0x3a890>
   39740: 7b 1a 50 fa 00 00 00 00      	stxdw [r10 - 0x5b0], r1
   39748: 7b 7a 58 fa 00 00 00 00      	stxdw [r10 - 0x5a8], r7
   39750: 18 01 00 00 40 13 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1340
   39760: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39768: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   39770: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39778: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   39780: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39788: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   39790: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39798: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   397a0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   397a8: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   397b0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   397b8: 07 07 00 00 70 fe ff ff      	add64 r7, -0x190
   397c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   397c8: 07 02 00 00 a8 ff ff ff      	add64 r2, -0x58
   397d0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   397d8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   397e0: 85 10 00 00 b4 e1 00 00      	call 0xe1b4 ; target 0xaa588
   397e8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   397f0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   397f8: 7b 2a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r2
   39800: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39808: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   39810: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39818: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   39820: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39828: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   39830: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39838: 07 02 00 00 a0 fe ff ff      	add64 r2, -0x160
   39840: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   39848: 85 10 00 00 64 a2 ff ff      	call -0x5d9c ; target 0xab70
   39850: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x39778>
   39858: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   39860: 85 10 00 00 b0 c1 00 00      	call 0xc1b0 ; target 0x9a5e8
   39868: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   39870: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39878: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   39888: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   39890: 05 00 2f 00 00 00 00 00      	ja +0x2f <.text+0x398f0>
   39898: 79 a7 f8 fa 00 00 00 00      	ldxdw r7, [r10 - 0x508]
   398a0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   398a8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   398b0: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   398b8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   398c0: 7b 2a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r2
   398c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   398d0: 7b 2a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r2
   398d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   398e0: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   398e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   398f0: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   398f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39900: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   39908: 85 10 00 00 4c a2 ff ff      	call -0x5db4 ; target 0xab70
   39910: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x39838>
   39918: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   39920: 85 10 00 00 98 c1 00 00      	call 0xc198 ; target 0x9a5e8
   39928: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   39930: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39938: 18 03 00 00 bc d0 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xad0bc ; data 'mintInvalid bool representation: Error'
   39948: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   39950: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x398f0>
   39958: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   39960: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39968: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39970: 7b 2a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r2
   39978: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39980: 7b 2a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r2
   39988: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39990: 7b 2a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r2
   39998: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   399a0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   399a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   399b0: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   399b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   399c0: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   399c8: 85 10 00 00 34 a2 ff ff      	call -0x5dcc ; target 0xab70
   399d0: 15 00 15 00 00 00 00 00      	jeq r0, 0x0, +0x15 <.text+0x39960>
   399d8: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   399e0: 85 10 00 00 80 c1 00 00      	call 0xc180 ; target 0x9a5e8
   399e8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   399f0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   399f8: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   39a08: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   39a10: 85 10 00 00 5f 94 ff ff      	call -0x6ba1 ; target 0x3d10
   39a18: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   39a20: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   39a28: 05 00 44 fe 00 00 00 00      	ja -0x1bc <.text+0x38b30>
   39a30: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39a38: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   39a48: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   39a50: 85 10 00 00 57 94 ff ff      	call -0x6ba9 ; target 0x3d10
   39a58: 55 00 ea 01 02 00 00 00      	jne r0, 0x2, +0x1ea <.text+0x3a890>
   39a60: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   39a68: 7b 1a 60 fa 00 00 00 00      	stxdw [r10 - 0x5a0], r1
   39a70: 55 03 72 ff 00 00 00 00      	jne r3, 0x0, -0x8e <.text+0x394e8>
   39a78: 05 00 89 ff 00 00 00 00      	ja -0x77 <.text+0x395a8>
   39a80: 79 a1 90 fa 00 00 00 00      	ldxdw r1, [r10 - 0x570]
   39a88: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39a90: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39a98: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39aa0: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   39aa8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39ab0: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   39ab8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39ac0: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   39ac8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39ad0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   39ad8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39ae0: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   39ae8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39af0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   39af8: 85 10 00 00 0e a2 ff ff      	call -0x5df2 ; target 0xab70
   39b00: 15 00 09 00 00 00 00 00      	jeq r0, 0x0, +0x9 <.text+0x39a30>
   39b08: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   39b10: 85 10 00 00 5a c1 00 00      	call 0xc15a ; target 0x9a5e8
   39b18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   39b20: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   39b28: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   39b38: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   39b40: 85 10 00 00 39 94 ff ff      	call -0x6bc7 ; target 0x3d10
   39b48: 05 00 cc 01 00 00 00 00      	ja +0x1cc <.text+0x3a890>
   39b50: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   39b58: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39b60: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   39b68: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39b70: 7b 2a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r2
   39b78: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39b80: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
   39b88: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39b90: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   39b98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39ba0: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   39ba8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   39bb0: 18 01 00 00 0e dc 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xadc0e ; data 'mayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_pro'
   39bc0: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   39bc8: 7a 0a 98 ff 20 00 00 00      	stdw [r10 - 0x68], 0x20
   39bd0: 7a 0a 88 ff 0c 00 00 00      	stdw [r10 - 0x78], 0xc
   39bd8: 72 0a 60 ff ff 00 00 00      	stb [r10 - 0xa0], 0xff
   39be0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39be8: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   39bf0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   39bf8: 07 04 00 00 a8 ff ff ff      	add64 r4, -0x58
   39c00: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   39c08: 07 05 00 00 60 ff ff ff      	add64 r5, -0xa0
   39c10: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   39c18: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   39c20: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   39c28: 55 00 ed 01 00 00 00 00      	jne r0, 0x0, +0x1ed <.text+0x3aa78>
   39c30: 79 a4 c0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x40]
   39c38: 79 a3 b8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x48]
   39c40: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
   39c48: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
   39c50: 71 a1 60 ff 00 00 00 00      	ldxb r1, [r10 - 0xa0]
   39c58: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   39c60: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   39c68: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   39c70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39c78: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   39c80: 5d 72 6f 01 00 00 00 00      	jne r2, r7, +0x16f <.text+0x3a6e0>
   39c88: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39c90: 5d 82 6d 01 00 00 00 00      	jne r2, r8, +0x16d <.text+0x3a6e0>
   39c98: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39ca0: 5d 32 6b 01 00 00 00 00      	jne r2, r3, +0x16b <.text+0x3a6e0>
   39ca8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   39cb0: 5d 41 69 01 00 00 00 00      	jne r1, r4, +0x169 <.text+0x3a6e0>
   39cb8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   39cc0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   39cc8: 15 01 85 01 00 00 00 00      	jeq r1, 0x0, +0x185 <.text+0x3a7d8>
   39cd0: 79 a2 f8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x508]
   39cd8: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   39ce0: 15 01 8b 01 00 00 00 00      	jeq r1, 0x0, +0x18b <.text+0x3a820>
   39ce8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39cf0: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   39cf8: 85 10 00 00 12 9f ff ff      	call -0x60ee ; target 0x9590
   39d00: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   39d08: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   39d10: 79 a2 c8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x538]
   39d18: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   39d20: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   39d28: 5d 34 8b 01 00 00 00 00      	jne r4, r3, +0x18b <.text+0x3a868>
   39d30: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   39d38: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   39d40: 5d 34 88 01 00 00 00 00      	jne r4, r3, +0x188 <.text+0x3a868>
   39d48: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   39d50: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   39d58: 5d 34 85 01 00 00 00 00      	jne r4, r3, +0x185 <.text+0x3a868>
   39d60: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   39d68: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   39d70: 5d 12 82 01 00 00 00 00      	jne r2, r1, +0x182 <.text+0x3a868>
   39d78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39d80: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   39d88: 85 10 00 00 2a 9c ff ff      	call -0x63d6 ; target 0x7ee0
   39d90: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   39d98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39da0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39da8: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   39db0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39db8: 7b 2a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r2
   39dc0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39dc8: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   39dd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39dd8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   39de0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   39de8: 79 a2 c0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x540]
   39df0: 5d 12 7a 01 00 00 00 00      	jne r2, r1, +0x17a <.text+0x3a8a8>
   39df8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   39e00: 79 a2 b8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x548]
   39e08: 5d 12 77 01 00 00 00 00      	jne r2, r1, +0x177 <.text+0x3a8a8>
   39e10: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   39e18: 79 a2 b0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x550]
   39e20: 5d 12 74 01 00 00 00 00      	jne r2, r1, +0x174 <.text+0x3a8a8>
   39e28: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   39e30: 79 a2 a8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x558]
   39e38: 5d 12 71 01 00 00 00 00      	jne r2, r1, +0x171 <.text+0x3a8a8>
   39e40: 79 a2 f8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x508]
   39e48: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   39e50: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   39e58: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   39e60: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   39e68: 7b 3a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r3
   39e70: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   39e78: 7b 3a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r3
   39e80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39e88: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   39e90: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   39e98: 07 07 00 00 a8 ff ff ff      	add64 r7, -0x58
   39ea0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   39ea8: 85 10 00 00 dc 9e ff ff      	call -0x6124 ; target 0x9590
   39eb0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   39eb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   39ec0: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
   39ec8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   39ed0: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
   39ed8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39ee0: 7b 2a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r2
   39ee8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   39ef0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   39ef8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39f00: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   39f08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39f10: 07 02 00 00 20 ff ff ff      	add64 r2, -0xe0
   39f18: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   39f20: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   39f28: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   39f30: 07 04 00 00 70 fe ff ff      	add64 r4, -0x190
   39f38: 85 10 00 00 a8 b7 00 00      	call 0xb7a8 ; target 0x95c80
   39f40: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   39f48: 85 10 00 00 f2 9b ff ff      	call -0x640e ; target 0x7ee0
   39f50: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   39f58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   39f60: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   39f68: 7b 2a 40 fa 00 00 00 00      	stxdw [r10 - 0x5c0], r2
   39f70: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   39f78: 7b 2a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r2
   39f80: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   39f88: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   39f90: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   39f98: 5d 17 5e 01 00 00 00 00      	jne r7, r1, +0x15e <.text+0x3a970>
   39fa0: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   39fa8: 5d 18 5c 01 00 00 00 00      	jne r8, r1, +0x15c <.text+0x3a970>
   39fb0: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   39fb8: 79 a2 48 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5b8]
   39fc0: 5d 12 59 01 00 00 00 00      	jne r2, r1, +0x159 <.text+0x3a970>
   39fc8: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   39fd0: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]
   39fd8: 5d 12 56 01 00 00 00 00      	jne r2, r1, +0x156 <.text+0x3a970>
   39fe0: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   39fe8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   39ff0: 15 01 6b 01 00 00 00 00      	jeq r1, 0x0, +0x16b <.text+0x3aa30>
   39ff8: 72 0a 70 fe ff 00 00 00      	stb [r10 - 0x190], 0xff
   3a000: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   3a008: 07 04 00 00 a8 ff ff ff      	add64 r4, -0x58
   3a010: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   3a018: 07 05 00 00 70 fe ff ff      	add64 r5, -0x190
   3a020: 18 01 00 00 88 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1988
   3a030: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   3a038: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   3a040: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   3a048: 55 00 69 01 00 00 00 00      	jne r0, 0x0, +0x169 <.text+0x3aa78>
   3a050: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   3a058: 7b 1a 40 fa 00 00 00 00      	stxdw [r10 - 0x5c0], r1
   3a060: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   3a068: 7b 1a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r1
   3a070: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
   3a078: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
   3a080: 71 a1 70 fe 00 00 00 00      	ldxb r1, [r10 - 0x190]
   3a088: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   3a090: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   3a098: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   3a0a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a0a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   3a0b0: 5d 72 68 01 00 00 00 00      	jne r2, r7, +0x168 <.text+0x3aad8>
   3a0b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   3a0c0: 5d 82 66 01 00 00 00 00      	jne r2, r8, +0x166 <.text+0x3aad8>
   3a0c8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   3a0d0: 79 a3 48 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5b8]
   3a0d8: 5d 32 63 01 00 00 00 00      	jne r2, r3, +0x163 <.text+0x3aad8>
   3a0e0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   3a0e8: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]
   3a0f0: 5d 21 60 01 00 00 00 00      	jne r1, r2, +0x160 <.text+0x3aad8>
   3a0f8: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   3a100: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   3a108: 15 01 74 01 00 00 00 00      	jeq r1, 0x0, +0x174 <.text+0x3ab90>
   3a110: 79 a1 f8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x508]
   3a118: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a120: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   3a128: 7b 2a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r2
   3a130: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   3a138: 7b 2a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r2
   3a140: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   3a148: 7b 2a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r2
   3a150: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a158: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   3a160: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3a168: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   3a170: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   3a178: 18 01 00 00 1a dc 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xadc1a ; data 'bonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_c'
   3a188: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   3a190: 7a 0a 78 ff 20 00 00 00      	stdw [r10 - 0x88], 0x20
   3a198: 7a 0a 68 ff 0d 00 00 00      	stdw [r10 - 0x98], 0xd
   3a1a0: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   3a1b0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   3a1b8: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   3a1c8: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   3a1d0: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   3a1e0: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   3a1e8: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   3a1f8: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   3a200: 72 0a a7 ff ff 00 00 00      	stb [r10 - 0x59], 0xff
   3a208: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3a210: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   3a218: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   3a220: 07 03 00 00 70 fe ff ff      	add64 r3, -0x190
   3a228: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   3a230: 07 04 00 00 a8 ff ff ff      	add64 r4, -0x58
   3a238: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   3a240: 07 05 00 00 a7 ff ff ff      	add64 r5, -0x59
   3a248: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   3a250: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   3a258: 55 00 27 01 00 00 00 00      	jne r0, 0x0, +0x127 <.text+0x3aa78>
   3a260: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   3a268: 7b 1a 40 fa 00 00 00 00      	stxdw [r10 - 0x5c0], r1
   3a270: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   3a278: 7b 1a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r1
   3a280: 79 a7 b0 ff 00 00 00 00      	ldxdw r7, [r10 - 0x50]
   3a288: 79 a8 a8 ff 00 00 00 00      	ldxdw r8, [r10 - 0x58]
   3a290: 71 a1 a7 ff 00 00 00 00      	ldxb r1, [r10 - 0x59]
   3a298: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   3a2a0: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   3a2a8: 79 a1 90 fa 00 00 00 00      	ldxdw r1, [r10 - 0x570]
   3a2b0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a2b8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   3a2c0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   3a2c8: 5d 83 4a 01 00 00 00 00      	jne r3, r8, +0x14a <.text+0x3ac00>
   3a2d0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   3a2d8: 5d 73 48 01 00 00 00 00      	jne r3, r7, +0x148 <.text+0x3ac00>
   3a2e0: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   3a2e8: 79 a4 48 fa 00 00 00 00      	ldxdw r4, [r10 - 0x5b8]
   3a2f0: 5d 43 45 01 00 00 00 00      	jne r3, r4, +0x145 <.text+0x3ac00>
   3a2f8: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   3a300: 79 a3 40 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5c0]
   3a308: 5d 32 42 01 00 00 00 00      	jne r2, r3, +0x142 <.text+0x3ac00>
   3a310: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   3a318: 15 01 5b 01 00 00 00 00      	jeq r1, 0x0, +0x15b <.text+0x3acd8>
   3a320: 79 a1 80 fa 00 00 00 00      	ldxdw r1, [r10 - 0x580]
   3a328: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a330: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   3a338: 7b 2a 40 fa 00 00 00 00      	stxdw [r10 - 0x5c0], r2
   3a340: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   3a348: 7b 2a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r2
   3a350: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   3a358: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   3a360: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   3a370: 5d 17 52 01 00 00 00 00      	jne r7, r1, +0x152 <.text+0x3ace8>
   3a378: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   3a388: 5d 18 4f 01 00 00 00 00      	jne r8, r1, +0x14f <.text+0x3ace8>
   3a390: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   3a3a0: 79 a2 48 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5b8]
   3a3a8: 5d 12 4b 01 00 00 00 00      	jne r2, r1, +0x14b <.text+0x3ace8>
   3a3b0: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   3a3c0: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]
   3a3c8: 5d 12 47 01 00 00 00 00      	jne r2, r1, +0x147 <.text+0x3ace8>
   3a3d0: 72 0a 70 fe ff 00 00 00      	stb [r10 - 0x190], 0xff
   3a3d8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   3a3e0: 07 04 00 00 a8 ff ff ff      	add64 r4, -0x58
   3a3e8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   3a3f0: 07 05 00 00 70 fe ff ff      	add64 r5, -0x190
   3a3f8: 18 01 00 00 78 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1978
   3a408: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   3a410: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   3a418: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   3a420: 55 00 ee 00 00 00 00 00      	jne r0, 0x0, +0xee <.text+0x3aa78>
   3a428: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   3a430: 7b 1a 48 fa 00 00 00 00      	stxdw [r10 - 0x5b8], r1
   3a438: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   3a440: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   3a448: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
   3a450: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
   3a458: 71 a1 70 fe 00 00 00 00      	ldxb r1, [r10 - 0x190]
   3a460: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   3a468: 73 12 03 00 00 00 00 00      	stxb [r2 + 0x3], r1
   3a470: 79 a1 60 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5a0]
   3a478: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a480: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   3a488: 5d 72 4f 01 00 00 00 00      	jne r2, r7, +0x14f <.text+0x3ade8>
   3a490: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   3a498: 5d 82 4d 01 00 00 00 00      	jne r2, r8, +0x14d <.text+0x3ade8>
   3a4a0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   3a4a8: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   3a4b0: 5d 32 4a 01 00 00 00 00      	jne r2, r3, +0x14a <.text+0x3ade8>
   3a4b8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   3a4c0: 79 a2 48 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5b8]
   3a4c8: 5d 21 47 01 00 00 00 00      	jne r1, r2, +0x147 <.text+0x3ade8>
   3a4d0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   3a4d8: 07 01 00 00 68 01 00 00      	add64 r1, 0x168
   3a4e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3a4e8: 07 02 00 00 98 fb ff ff      	add64 r2, -0x468
   3a4f0: b7 03 00 00 59 00 00 00      	mov64 r3, 0x59
   3a4f8: 85 10 00 00 11 e0 00 00      	call 0xe011 ; target 0xaa588
   3a500: 61 a1 90 fb 00 00 00 00      	ldxw r1, [r10 - 0x470]
   3a508: 63 16 c2 01 00 00 00 00      	stxw [r6 + 0x1c2], r1
   3a510: 69 a1 94 fb 00 00 00 00      	ldxh r1, [r10 - 0x46c]
   3a518: 6b 16 c6 01 00 00 00 00      	stxh [r6 + 0x1c6], r1
   3a520: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   3a528: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   3a530: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3a538: 07 02 00 00 98 fc ff ff      	add64 r2, -0x368
   3a540: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   3a548: 85 10 00 00 07 e0 00 00      	call 0xe007 ; target 0xaa588
   3a550: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   3a558: 7b 16 78 00 00 00 00 00      	stxdw [r6 + 0x78], r1
   3a560: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   3a568: 7b 16 70 00 00 00 00 00      	stxdw [r6 + 0x70], r1
   3a570: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   3a578: 7b 16 68 00 00 00 00 00      	stxdw [r6 + 0x68], r1
   3a580: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   3a588: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   3a590: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   3a598: 7b 16 90 00 00 00 00 00      	stxdw [r6 + 0x90], r1
   3a5a0: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   3a5a8: 7b 16 98 00 00 00 00 00      	stxdw [r6 + 0x98], r1
   3a5b0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   3a5b8: 7b 16 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r1
   3a5c0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   3a5c8: 7b 16 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r1
   3a5d0: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   3a5d8: 7b 16 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r1
   3a5e0: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   3a5e8: 7b 16 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r1
   3a5f0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   3a5f8: 07 01 00 00 e8 00 00 00      	add64 r1, 0xe8
   3a600: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3a608: 07 02 00 00 d8 fd ff ff      	add64 r2, -0x228
   3a610: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   3a618: 85 10 00 00 ed df 00 00      	call 0xdfed ; target 0xaa588
   3a620: 61 a1 d0 fd 00 00 00 00      	ldxw r1, [r10 - 0x230]
   3a628: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   3a630: 79 a3 c0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x240]
   3a638: 79 a4 b8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x248]
   3a640: 79 a5 b0 fd 00 00 00 00      	ldxdw r5, [r10 - 0x250]
   3a648: 79 a0 d8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x528]
   3a650: 63 06 00 00 00 00 00 00      	stxw [r6 + 0x0], r0
   3a658: 79 a0 d0 fa 00 00 00 00      	ldxdw r0, [r10 - 0x530]
   3a660: 63 06 04 00 00 00 00 00      	stxw [r6 + 0x4], r0
   3a668: 79 a0 a0 fa 00 00 00 00      	ldxdw r0, [r10 - 0x560]
   3a670: 63 06 30 01 00 00 00 00      	stxw [r6 + 0x130], r0
   3a678: 79 a0 08 fb 00 00 00 00      	ldxdw r0, [r10 - 0x4f8]
   3a680: 73 06 c1 01 00 00 00 00      	stxb [r6 + 0x1c1], r0
   3a688: 79 a0 50 fa 00 00 00 00      	ldxdw r0, [r10 - 0x5b0]
   3a690: 7b 06 08 02 00 00 00 00      	stxdw [r6 + 0x208], r0
   3a698: 79 a0 60 fa 00 00 00 00      	ldxdw r0, [r10 - 0x5a0]
   3a6a0: 7b 06 00 02 00 00 00 00      	stxdw [r6 + 0x200], r0
   3a6a8: 79 a0 68 fa 00 00 00 00      	ldxdw r0, [r10 - 0x598]
   3a6b0: 7b 06 f8 01 00 00 00 00      	stxdw [r6 + 0x1f8], r0
   3a6b8: 79 a0 70 fa 00 00 00 00      	ldxdw r0, [r10 - 0x590]
   3a6c0: 7b 06 f0 01 00 00 00 00      	stxdw [r6 + 0x1f0], r0
   3a6c8: 79 a0 78 fa 00 00 00 00      	ldxdw r0, [r10 - 0x588]
   3a6d0: 7b 06 e8 01 00 00 00 00      	stxdw [r6 + 0x1e8], r0
   3a6d8: 79 a0 80 fa 00 00 00 00      	ldxdw r0, [r10 - 0x580]
   3a6e0: 7b 06 e0 01 00 00 00 00      	stxdw [r6 + 0x1e0], r0
   3a6e8: 79 a0 88 fa 00 00 00 00      	ldxdw r0, [r10 - 0x578]
   3a6f0: 7b 06 d8 01 00 00 00 00      	stxdw [r6 + 0x1d8], r0
   3a6f8: 79 a0 90 fa 00 00 00 00      	ldxdw r0, [r10 - 0x570]
   3a700: 7b 06 d0 01 00 00 00 00      	stxdw [r6 + 0x1d0], r0
   3a708: 79 a0 98 fa 00 00 00 00      	ldxdw r0, [r10 - 0x568]
   3a710: 7b 06 c8 01 00 00 00 00      	stxdw [r6 + 0x1c8], r0
   3a718: 7b 96 60 01 00 00 00 00      	stxdw [r6 + 0x160], r9
   3a720: 79 a0 18 fb 00 00 00 00      	ldxdw r0, [r10 - 0x4e8]
   3a728: 7b 06 58 01 00 00 00 00      	stxdw [r6 + 0x158], r0
   3a730: 79 a0 a8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x558]
   3a738: 7b 06 e0 00 00 00 00 00      	stxdw [r6 + 0xe0], r0
   3a740: 79 a0 b0 fa 00 00 00 00      	ldxdw r0, [r10 - 0x550]
   3a748: 7b 06 d8 00 00 00 00 00      	stxdw [r6 + 0xd8], r0
   3a750: 79 a0 b8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x548]
   3a758: 7b 06 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r0
   3a760: 79 a0 c0 fa 00 00 00 00      	ldxdw r0, [r10 - 0x540]
   3a768: 7b 06 c8 00 00 00 00 00      	stxdw [r6 + 0xc8], r0
   3a770: 79 a0 c8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x538]
   3a778: 7b 06 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r0
   3a780: 79 a0 00 fb 00 00 00 00      	ldxdw r0, [r10 - 0x500]
   3a788: 7b 06 88 00 00 00 00 00      	stxdw [r6 + 0x88], r0
   3a790: 79 a0 58 fa 00 00 00 00      	ldxdw r0, [r10 - 0x5a8]
   3a798: 7b 06 80 00 00 00 00 00      	stxdw [r6 + 0x80], r0
   3a7a0: 79 a0 f8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x508]
   3a7a8: 7b 06 58 00 00 00 00 00      	stxdw [r6 + 0x58], r0
   3a7b0: 79 a0 e0 fa 00 00 00 00      	ldxdw r0, [r10 - 0x520]
   3a7b8: 7b 06 10 00 00 00 00 00      	stxdw [r6 + 0x10], r0
   3a7c0: 79 a0 e8 fa 00 00 00 00      	ldxdw r0, [r10 - 0x518]
   3a7c8: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   3a7d0: 7b 56 34 01 00 00 00 00      	stxdw [r6 + 0x134], r5
   3a7d8: 7b 46 3c 01 00 00 00 00      	stxdw [r6 + 0x13c], r4
   3a7e0: 7b 36 44 01 00 00 00 00      	stxdw [r6 + 0x144], r3
   3a7e8: 7b 26 4c 01 00 00 00 00      	stxdw [r6 + 0x14c], r2
   3a7f0: 63 16 54 01 00 00 00 00      	stxw [r6 + 0x154], r1
   3a7f8: 05 00 8b fc 00 00 00 00      	ja -0x375 <.text+0x38b38>
   3a800: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   3a808: 7b 3a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r3
   3a810: bf 49 00 00 00 00 00 00      	mov64 r9, r4
   3a818: 85 10 00 00 b9 bf 00 00      	call 0xbfb9 ; target 0x9a5e8
   3a820: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3a828: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3a830: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   3a840: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   3a848: 85 10 00 00 98 92 ff ff      	call -0x6d68 ; target 0x3d10
   3a850: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3a858: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   3a860: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a868: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   3a870: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   3a878: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   3a880: 7b 3a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r3
   3a888: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   3a890: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   3a898: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3a8a0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   3a8a8: 7b 9a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r9
   3a8b0: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   3a8b8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   3a8c0: 7b 8a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r8
   3a8c8: 7b 7a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r7
   3a8d0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   3a8d8: 07 03 00 00 a8 ff ff ff      	add64 r3, -0x58
   3a8e0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3a8e8: 85 10 00 00 21 ba 00 00      	call 0xba21 ; target 0x979f8
   3a8f0: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x3a890>
   3a8f8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   3a900: 85 10 00 00 9c bf 00 00      	call 0xbf9c ; target 0x9a5e8
   3a908: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3a910: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3a918: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   3a928: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   3a930: 85 10 00 00 7b 92 ff ff      	call -0x6d85 ; target 0x3d10
   3a938: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x3a890>
   3a940: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   3a948: 85 10 00 00 93 bf 00 00      	call 0xbf93 ; target 0x9a5e8
   3a950: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3a958: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3a960: 18 03 00 00 bc d0 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xad0bc ; data 'mintInvalid bool representation: Error'
   3a970: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   3a978: 85 10 00 00 72 92 ff ff      	call -0x6d8e ; target 0x3d10
   3a980: 05 00 05 00 00 00 00 00      	ja +0x5 <.text+0x3a890>
   3a988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3a990: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   3a998: 85 10 00 00 a8 9a ff ff      	call -0x6558 ; target 0x7ee0
   3a9a0: b7 01 00 00 e7 07 00 00      	mov64 r1, 0x7e7
   3a9a8: 85 10 00 00 87 bf 00 00      	call 0xbf87 ; target 0x9a5e8
   3a9b0: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   3a9b8: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   3a9c0: 05 00 51 fc 00 00 00 00      	ja -0x3af <.text+0x38b30>
   3a9c8: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   3a9d0: 85 10 00 00 82 bf 00 00      	call 0xbf82 ; target 0x9a5e8
   3a9d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3a9e0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3a9e8: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   3a9f8: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   3aa00: 85 10 00 00 61 92 ff ff      	call -0x6d9f ; target 0x3d10
   3aa08: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3aa10: 79 a1 a8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x558]
   3aa18: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   3aa20: 79 a1 b0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x550]
   3aa28: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   3aa30: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   3aa38: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   3aa40: 79 a1 c0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x540]
   3aa48: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   3aa50: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   3aa58: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   3aa60: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   3aa68: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   3aa70: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   3aa78: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   3aa80: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   3aa88: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x3aa20>
   3aa90: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   3aa98: 85 10 00 00 69 bf 00 00      	call 0xbf69 ; target 0x9a5e8
   3aaa0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3aaa8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3aab0: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   3aac0: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   3aac8: 85 10 00 00 48 92 ff ff      	call -0x6db8 ; target 0x3d10
   3aad0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3aad8: 79 a1 40 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c0]
   3aae0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   3aae8: 79 a1 48 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b8]
   3aaf0: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   3aaf8: 7b 8a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r8
   3ab00: 7b 7a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r7
   3ab08: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   3ab10: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   3ab18: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   3ab20: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   3ab28: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   3ab30: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   3ab38: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   3ab40: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   3ab48: 05 00 b0 ff 00 00 00 00      	ja -0x50 <.text+0x3a7b0>
   3ab50: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   3ab58: 85 10 00 00 51 bf 00 00      	call 0xbf51 ; target 0x9a5e8
   3ab60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ab68: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3ab70: 18 03 00 00 c9 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbc9 ; data 'mayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mint'
   3ab80: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   3ab88: 85 10 00 00 30 92 ff ff      	call -0x6dd0 ; target 0x3d10
   3ab90: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x3a890>
   3ab98: 18 01 00 00 f8 11 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb11f8
   3aba8: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   3abb0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
   3abb8: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   3abc0: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   3abc8: 7a 0a b8 ff 08 00 00 00      	stdw [r10 - 0x48], 0x8
   3abd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3abd8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   3abe0: 18 02 00 00 08 12 0b 00 00 00 00 00 00 00 00 00      	lddw r2, 0xb1208
   3abf0: 85 10 00 00 92 d3 00 00      	call 0xd392 ; target 0xa4888
   3abf8: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   3ac00: 85 10 00 00 3c bf 00 00      	call 0xbf3c ; target 0x9a5e8
   3ac08: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ac10: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3ac18: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   3ac28: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   3ac30: 85 10 00 00 1b 92 ff ff      	call -0x6de5 ; target 0x3d10
   3ac38: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ac40: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   3ac48: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3ac50: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   3ac58: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   3ac60: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   3ac68: 7b 3a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r3
   3ac70: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   3ac78: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   3ac80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3ac88: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   3ac90: 79 a1 40 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c0]
   3ac98: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   3aca0: 79 a1 48 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b8]
   3aca8: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x3a798>
   3acb0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   3acb8: 85 10 00 00 25 bf 00 00      	call 0xbf25 ; target 0x9a5e8
   3acc0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3acc8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3acd0: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   3ace0: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   3ace8: 85 10 00 00 04 92 ff ff      	call -0x6dfc ; target 0x3d10
   3acf0: 05 00 97 ff 00 00 00 00      	ja -0x69 <.text+0x3a890>
   3acf8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   3ad00: b7 02 00 00 12 00 00 00      	mov64 r2, 0x12
   3ad08: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   3ad18: 85 10 00 00 65 d1 00 00      	call 0xd165 ; target 0xa3848
   3ad20: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   3ad28: 85 10 00 00 17 bf 00 00      	call 0xbf17 ; target 0x9a5e8
   3ad30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ad38: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3ad40: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   3ad50: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   3ad58: 85 10 00 00 f6 91 ff ff      	call -0x6e0a ; target 0x3d10
   3ad60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ad68: 79 a1 90 fa 00 00 00 00      	ldxdw r1, [r10 - 0x570]
   3ad70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3ad78: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3ad80: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   3ad88: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   3ad90: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   3ad98: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   3ada0: 7b 8a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r8
   3ada8: 7b 7a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r7
   3adb0: 79 a7 48 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5b8]
   3adb8: 7b 7a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r7
   3adc0: 79 a7 40 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5c0]
   3adc8: 7b 7a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r7
   3add0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   3add8: 7b 5a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r5
   3ade0: 7b 4a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r4
   3ade8: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   3adf0: 05 00 5b ff 00 00 00 00      	ja -0xa5 <.text+0x3a7b0>
   3adf8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   3ae00: 05 00 a1 fd 00 00 00 00      	ja -0x25f <.text+0x399f0>
   3ae08: b7 01 00 00 dc 07 00 00      	mov64 r1, 0x7dc
   3ae10: 85 10 00 00 fa be 00 00      	call 0xbefa ; target 0x9a5e8
   3ae18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ae20: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3ae28: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   3ae38: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   3ae40: 85 10 00 00 d9 91 ff ff      	call -0x6e27 ; target 0x3d10
   3ae48: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3ae50: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   3ae60: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   3ae68: 79 a1 40 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c0]
   3ae70: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   3ae78: 79 a1 48 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b8]
   3ae80: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   3ae88: 7b 8a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r8
   3ae90: 7b 7a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r7
   3ae98: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   3aea8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   3aeb0: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   3aec0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   3aec8: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   3aed8: 05 00 8c ff 00 00 00 00      	ja -0x74 <.text+0x3aa20>
   3aee0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   3aee8: b7 02 00 00 09 00 00 00      	mov64 r2, 0x9
   3aef0: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   3af00: 85 10 00 00 28 d1 00 00      	call 0xd128 ; target 0xa3848
   3af08: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   3af10: 85 10 00 00 da be 00 00      	call 0xbeda ; target 0x9a5e8
   3af18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3af20: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   3af28: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   3af38: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   3af40: 85 10 00 00 b9 91 ff ff      	call -0x6e47 ; target 0x3d10
   3af48: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   3af50: 79 a1 60 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5a0]
   3af58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3af60: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   3af68: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   3af70: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   3af78: 7b 3a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r3
   3af80: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   3af88: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   3af90: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   3af98: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   3afa0: 79 a1 48 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b8]
   3afa8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   3afb0: 05 00 1f ff 00 00 00 00      	ja -0xe1 <.text+0x3a790>
