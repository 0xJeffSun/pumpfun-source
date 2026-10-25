   db958: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   db960: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   db968: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   db970: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   db978: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db980: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   db988: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   db990: 85 10 00 00 1b 6f fe ff      	call -0x190e5
   db998: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   db9a0: 15 01 17 00 02 00 00 00      	jeq r1, 0x2, +0x17 <.text+0xdb940>
   db9a8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   db9b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db9c0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   db9c8: 07 03 00 00 c0 fb ff ff      	add64 r3, -0x440
   db9d0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   db9d8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   db9e0: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xdb8d0>
   db9e8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   db9f0: 7b 8a a8 f8 00 00 00 00      	stxdw [r10 - 0x758], r8
   db9f8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdb8e8>
   dba00: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dba08: 18 08 00 00 c0 7b 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300007bc0
   dba18: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xdb910>
   dba20: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dba28: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   dba30: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   dba40: 2d 18 0e 00 00 00 00 00      	jgt r8, r1, +0xe <.text+0xdb998>
   dba48: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   dba50: b7 02 00 00 40 04 00 00      	mov64 r2, 0x440
   dba58: 85 10 00 00 ea 9e 01 00      	call 0x19eea
   dba60: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dba68: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dba70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dba78: 07 01 00 00 b8 f8 ff ff      	add64 r1, -0x748
   dba80: 18 04 00 00 26 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7326
   dba90: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   dba98: 85 10 00 00 d2 4d fe ff      	call -0x1b22e
   dbaa0: 79 a1 b8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x748]
   dbaa8: 79 a2 c0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x740]
   dbab0: 05 00 12 01 00 00 00 00      	ja +0x112 <.text+0xdc228>
   dbab8: 79 91 08 f0 00 00 00 00      	ldxdw r1, [r9 - 0xff8]
   dbac0: 7b 1a b0 f8 00 00 00 00      	stxdw [r10 - 0x750], r1
   dbac8: 18 09 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r9, 0x300000000
   dbad8: 7b 89 00 00 00 00 00 00      	stxdw [r9 + 0x0], r8
   dbae0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbae8: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   dbaf0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dbaf8: b7 03 00 00 40 04 00 00      	mov64 r3, 0x440
   dbb00: 85 10 00 00 61 af 01 00      	call 0x1af61
   dbb08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbb10: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbb18: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbb20: 85 10 00 00 17 6f fe ff      	call -0x190e9
   dbb28: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   dbb38: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbb40: 1d 12 14 00 00 00 00 00      	jeq r2, r1, +0x14 <.text+0xdbac8>
   dbb48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbb50: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   dbb58: 07 03 00 00 70 ff ff ff      	add64 r3, -0x90
   dbb60: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   dbb68: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dbb70: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xdba60>
   dbb78: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dbb80: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdba70>
   dbb88: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dbb90: 18 09 00 00 70 7f 00 00 00 00 00 00 03 00 00 00      	lddw r9, 0x300007f70
   dbba0: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xdba98>
   dbba8: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dbbb0: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   dbbb8: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   dbbc8: 2d 19 0e 00 00 00 00 00      	jgt r9, r1, +0xe <.text+0xdbb20>
   dbbd0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   dbbd8: b7 02 00 00 90 00 00 00      	mov64 r2, 0x90
   dbbe0: 85 10 00 00 b9 9e 01 00      	call 0x19eb9
   dbbe8: 79 a3 d0 fb 00 00 00 00      	ldxdw r3, [r10 - 0x430]
   dbbf0: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   dbbf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbc00: 07 01 00 00 c8 f8 ff ff      	add64 r1, -0x738
   dbc08: 18 04 00 00 91 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7491
   dbc18: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   dbc20: 85 10 00 00 a1 4d fe ff      	call -0x1b25f
   dbc28: 79 a1 c8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x738]
   dbc30: 79 a2 d0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x730]
   dbc38: 05 00 e1 00 00 00 00 00      	ja +0xe1 <.text+0xdc228>
   dbc40: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   dbc50: 7b 91 00 00 00 00 00 00      	stxdw [r1 + 0x0], r9
   dbc58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbc60: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   dbc68: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   dbc70: b7 03 00 00 90 00 00 00      	mov64 r3, 0x90
   dbc78: 85 10 00 00 32 af 01 00      	call 0x1af32
   dbc80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbc88: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbc90: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbc98: 85 10 00 00 60 6d fe ff      	call -0x192a0
   dbca0: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dbca8: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbcb0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbba0>
   dbcb8: 05 00 2f 00 00 00 00 00      	ja +0x2f <.text+0xdbd18>
   dbcc0: 7b 3a a0 f8 00 00 00 00      	stxdw [r10 - 0x760], r3
   dbcc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbcd0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbcd8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbce0: 85 10 00 00 57 6d fe ff      	call -0x192a9
   dbce8: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dbcf0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbcf8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbbe8>
   dbd00: 05 00 2f 00 00 00 00 00      	ja +0x2f <.text+0xdbd60>
   dbd08: 7b 3a 98 f8 00 00 00 00      	stxdw [r10 - 0x768], r3
   dbd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbd18: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbd20: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbd28: 85 10 00 00 4e 6d fe ff      	call -0x192b2
   dbd30: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dbd38: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbd40: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbc30>
   dbd48: 05 00 2f 00 00 00 00 00      	ja +0x2f <.text+0xdbda8>
   dbd50: 7b 3a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r3
