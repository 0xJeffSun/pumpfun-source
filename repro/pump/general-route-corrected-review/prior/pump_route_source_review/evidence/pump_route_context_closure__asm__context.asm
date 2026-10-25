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
   dbd58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbd60: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbd68: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbd70: 85 10 00 00 8b 48 fe ff      	call -0x1b775
   dbd78: 61 a1 70 fc 00 00 00 00      	ldxw r1, [r10 - 0x390]
   dbd80: 15 01 31 00 02 00 00 00      	jeq r1, 0x2, +0x31 <.text+0xdbdf0>
   dbd88: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   dbd98: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   dbda0: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   dbda8: 07 03 00 00 28 ff ff ff      	add64 r3, -0xd8
   dbdb0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   dbdb8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dbdc0: 2d 53 01 00 00 00 00 00      	jgt r3, r5, +0x1 <.text+0xdbcb0>
   dbdc8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dbdd0: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xdbcc0>
   dbdd8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   dbde0: 18 01 00 00 28 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f28
   dbdf0: 15 05 02 00 00 00 00 00      	jeq r5, 0x0, +0x2 <.text+0xdbce8>
   dbdf8: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   dbe00: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   dbe08: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   dbe18: 2d 21 29 00 00 00 00 00      	jgt r1, r2, +0x29 <.text+0xdbe48>
   dbe20: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   dbe28: b7 02 00 00 d8 00 00 00      	mov64 r2, 0xd8
   dbe30: 85 10 00 00 6f 9e 01 00      	call 0x19e6f
   dbe38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbe40: 07 01 00 00 e8 fa ff ff      	add64 r1, -0x518
   dbe48: 18 04 00 00 92 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7892
   dbe58: b7 05 00 00 16 00 00 00      	mov64 r5, 0x16
   dbe60: 85 10 00 00 59 4d fe ff      	call -0x1b2a7
   dbe68: 79 a1 e8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x518]
   dbe70: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   dbe78: 05 00 99 00 00 00 00 00      	ja +0x99 <.text+0xdc228>
   dbe80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbe88: 07 01 00 00 d8 fa ff ff      	add64 r1, -0x528
   dbe90: 18 04 00 00 68 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5e68
   dbea0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dbea8: 85 10 00 00 50 4d fe ff      	call -0x1b2b0
   dbeb0: 79 a1 d8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x528]
   dbeb8: 79 a2 e0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x520]
   dbec0: 05 00 90 00 00 00 00 00      	ja +0x90 <.text+0xdc228>
   dbec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbed0: 07 01 00 00 c8 fa ff ff      	add64 r1, -0x538
   dbed8: 18 04 00 00 80 67 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b6780
   dbee8: b7 05 00 00 10 00 00 00      	mov64 r5, 0x10
   dbef0: 85 10 00 00 47 4d fe ff      	call -0x1b2b9
   dbef8: 79 a1 c8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x538]
   dbf00: 79 a2 d0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x530]
   dbf08: 05 00 87 00 00 00 00 00      	ja +0x87 <.text+0xdc228>
   dbf10: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dbf18: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbf20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbf28: 07 01 00 00 d8 f8 ff ff      	add64 r1, -0x728
   dbf30: 18 04 00 00 81 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7881
   dbf40: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   dbf48: 85 10 00 00 3c 4d fe ff      	call -0x1b2c4
   dbf50: 79 a1 d8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x728]
   dbf58: 79 a2 e0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x720]
   dbf60: 05 00 7c 00 00 00 00 00      	ja +0x7c <.text+0xdc228>
   dbf68: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   dbf78: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dbf80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbf88: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   dbf90: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   dbf98: b7 03 00 00 d8 00 00 00      	mov64 r3, 0xd8
   dbfa0: 85 10 00 00 cd ae 01 00      	call 0x1aecd
   dbfa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbfb0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dbfb8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dbfc0: 85 10 00 00 1c 4f fe ff      	call -0x1b0e4
   dbfc8: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dbfd0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dbfd8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbec8>
   dbfe0: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0xdbf18>
   dbfe8: 7b 3a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r3
   dbff0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   dbff8: 15 01 10 00 00 00 00 00      	jeq r1, 0x0, +0x10 <.text+0xdbf60>
   dc000: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dc008: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   dc010: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   dc018: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   dc020: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   dc028: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   dc030: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0xdbfa0>
   dc038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc040: 07 01 00 00 b8 fa ff ff      	add64 r1, -0x548
   dc048: 18 04 00 00 87 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7887
   dc058: b7 05 00 00 0b 00 00 00      	mov64 r5, 0xb
   dc060: 85 10 00 00 19 4d fe ff      	call -0x1b2e7
   dc068: 79 a1 b8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x548]
   dc070: 79 a2 c0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x540]
   dc078: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0xdc228>
   dc080: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc088: 07 01 00 00 a8 fa ff ff      	add64 r1, -0x558
   dc090: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   dc098: 85 10 00 00 50 86 01 00      	call 0x18650
   dc0a0: 79 a3 b0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x550]
   dc0a8: 79 a2 a8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x558]
   dc0b0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbfa0>
   dc0b8: 05 00 40 00 00 00 00 00      	ja +0x40 <.text+0xdc1a0>
   dc0c0: 7b 3a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r3
   dc0c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc0d0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc0d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc0e0: 85 10 00 00 bc 70 fe ff      	call -0x18f44
   dc0e8: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dc0f0: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dc0f8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdbfe8>
   dc100: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xdc110>
   dc108: 7b 3a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r3
   dc110: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc118: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc120: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc128: 85 10 00 00 d8 6f fe ff      	call -0x19028
   dc130: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dc138: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dc140: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdc030>
   dc148: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xdc158>
   dc150: 7b 3a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r3
   dc158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc160: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc168: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc170: 85 10 00 00 41 6f fe ff      	call -0x190bf
   dc178: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dc180: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dc188: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdc078>
   dc190: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xdc1e8>
   dc198: 7b 3a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r3
   dc1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc1a8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc1b0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc1b8: 85 10 00 00 5d 4d fe ff      	call -0x1b2a3
   dc1c0: 79 a3 c8 fb 00 00 00 00      	ldxdw r3, [r10 - 0x438]
   dc1c8: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dc1d0: 71 a1 ea fb 00 00 00 00      	ldxb r1, [r10 - 0x416]
   dc1d8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xdc0c8>
   dc1e0: 05 00 30 00 00 00 00 00      	ja +0x30 <.text+0xdc248>
   dc1e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc1f0: 07 01 00 00 e8 f8 ff ff      	add64 r1, -0x718
   dc1f8: 18 04 00 00 2c 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b732c
   dc208: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dc210: 85 10 00 00 e3 4c fe ff      	call -0x1b31d
   dc218: 79 a1 e8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x718]
   dc220: 79 a2 f0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x710]
   dc228: 05 00 23 00 00 00 00 00      	ja +0x23 <.text+0xdc228>
   dc230: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc238: 07 01 00 00 88 fa ff ff      	add64 r1, -0x578
   dc240: 18 04 00 00 9e 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b759e
   dc250: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   dc258: 85 10 00 00 da 4c fe ff      	call -0x1b326
   dc260: 79 a1 88 fa 00 00 00 00      	ldxdw r1, [r10 - 0x578]
   dc268: 79 a2 90 fa 00 00 00 00      	ldxdw r2, [r10 - 0x570]
   dc270: 05 00 1a 00 00 00 00 00      	ja +0x1a <.text+0xdc228>
   dc278: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc280: 07 01 00 00 78 fa ff ff      	add64 r1, -0x588
   dc288: 18 04 00 00 53 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7853
   dc298: b7 05 00 00 12 00 00 00      	mov64 r5, 0x12
   dc2a0: 85 10 00 00 d1 4c fe ff      	call -0x1b32f
   dc2a8: 79 a1 78 fa 00 00 00 00      	ldxdw r1, [r10 - 0x588]
   dc2b0: 79 a2 80 fa 00 00 00 00      	ldxdw r2, [r10 - 0x580]
   dc2b8: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0xdc228>
   dc2c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc2c8: 07 01 00 00 98 fa ff ff      	add64 r1, -0x568
   dc2d0: 18 04 00 00 9d 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b739d
   dc2e0: b7 05 00 00 15 00 00 00      	mov64 r5, 0x15
   dc2e8: 85 10 00 00 c8 4c fe ff      	call -0x1b338
   dc2f0: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   dc2f8: 79 a2 a0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x560]
   dc300: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0xdc228>
   dc308: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc310: 07 01 00 00 68 fa ff ff      	add64 r1, -0x598
   dc318: 18 04 00 00 5b 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b735b
   dc328: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   dc330: 85 10 00 00 bf 4c fe ff      	call -0x1b341
   dc338: 79 a1 68 fa 00 00 00 00      	ldxdw r1, [r10 - 0x598]
   dc340: 79 a2 70 fa 00 00 00 00      	ldxdw r2, [r10 - 0x590]
   dc348: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dc350: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dc358: 72 06 8a 00 02 00 00 00      	stb [r6 + 0x8a], 0x2
   dc360: 95 00 00 00 00 00 00 00      	exit
   dc368: 7b 1a 40 f8 00 00 00 00      	stxdw [r10 - 0x7c0], r1
   dc370: 7b 2a 48 f8 00 00 00 00      	stxdw [r10 - 0x7b8], r2
   dc378: 7b 3a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r3
   dc380: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   dc388: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   dc390: 79 a1 e0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x420]
   dc398: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   dc3a0: 69 a1 e8 fb 00 00 00 00      	ldxh r1, [r10 - 0x418]
   dc3a8: 6b 1a 10 fb 00 00 00 00      	stxh [r10 - 0x4f0], r1
   dc3b0: 61 a1 eb fb 00 00 00 00      	ldxw r1, [r10 - 0x415]
   dc3b8: 63 1a f8 fa 00 00 00 00      	stxw [r10 - 0x508], r1
   dc3c0: 71 a1 ef fb 00 00 00 00      	ldxb r1, [r10 - 0x411]
   dc3c8: 73 1a fc fa 00 00 00 00      	stxb [r10 - 0x504], r1
   dc3d0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   dc3d8: 7b 1a 50 f8 00 00 00 00      	stxdw [r10 - 0x7b0], r1
   dc3e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc3e8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc3f0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc3f8: 85 10 00 00 5e 6e fe ff      	call -0x191a2
   dc400: 79 a7 c8 fb 00 00 00 00      	ldxdw r7, [r10 - 0x438]
   dc408: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   dc410: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdc300>
   dc418: 05 00 4d 00 00 00 00 00      	ja +0x4d <.text+0xdc568>
   dc420: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc428: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc430: 18 02 00 00 10 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf10
   dc440: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dc448: 79 a4 a8 f8 00 00 00 00      	ldxdw r4, [r10 - 0x758]
   dc450: 85 10 00 00 4c 97 01 00      	call 0x1974c
   dc458: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   dc460: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   dc468: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   dc470: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   dc478: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   dc480: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   dc488: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   dc490: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   dc498: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   dc4a0: 79 a2 b0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x750]
   dc4a8: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   dc4b0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dc4b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dc4c0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   dc4c8: 7b 2a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r2
   dc4d0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   dc4d8: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   dc4e0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   dc4e8: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   dc4f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dc4f8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dc500: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc508: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc510: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc518: 07 02 00 00 18 fb ff ff      	add64 r2, -0x4e8
   dc520: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dc528: 85 10 00 00 29 ae 01 00      	call 0x1ae29
   dc530: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dc538: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dc540: 15 00 45 00 00 00 00 00      	jeq r0, 0x0, +0x45 <.text+0xdc650>
   dc548: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc550: 07 01 00 00 48 fa ff ff      	add64 r1, -0x5b8
   dc558: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dc560: 85 10 00 00 b7 85 01 00      	call 0x185b7
   dc568: 79 a3 50 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5b0]
   dc570: 79 a2 48 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5b8]
   dc578: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc580: 07 01 00 00 38 fa ff ff      	add64 r1, -0x5c8
   dc588: 18 04 00 00 26 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7326
   dc598: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   dc5a0: 85 10 00 00 71 4c fe ff      	call -0x1b38f
   dc5a8: 79 a3 40 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5c0]
   dc5b0: 79 a2 38 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c8]
   dc5b8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dc5c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dc5c8: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   dc5d0: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   dc5d8: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   dc5e0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   dc5e8: 79 a7 18 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4e8]
   dc5f0: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   dc5f8: 79 a7 20 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4e0]
   dc600: 7b 7a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r7
   dc608: 79 a7 28 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4d8]
   dc610: 7b 7a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r7
   dc618: 79 a7 30 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4d0]
   dc620: 7b 7a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r7
   dc628: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dc630: 7b 0a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r0
   dc638: 7b 5a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r5
   dc640: 7b 4a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r4
   dc648: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc650: 07 01 00 00 28 fa ff ff      	add64 r1, -0x5d8
   dc658: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dc660: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   dc668: 85 10 00 00 69 7f 01 00      	call 0x17f69
   dc670: 79 a1 28 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5d8]
   dc678: 79 a2 30 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5d0]
   dc680: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0xdc5b0>
   dc688: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc690: 07 01 00 00 58 fa ff ff      	add64 r1, -0x5a8
   dc698: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dc6a0: 18 04 00 00 54 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7354
   dc6b0: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   dc6b8: 85 10 00 00 4e 4c fe ff      	call -0x1b3b2
   dc6c0: 79 a1 58 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5a8]
   dc6c8: 79 a2 60 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a0]
   dc6d0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dc6d8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dc6e0: 72 06 8a 00 02 00 00 00      	stb [r6 + 0x8a], 0x2
   dc6e8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   dc6f0: 79 a3 50 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7b0]
   dc6f8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dc700: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dc708: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dc710: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xdc610>
   dc718: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dc720: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dc728: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   dc730: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dc738: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dc740: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dc748: 55 01 82 ff 00 00 00 00      	jne r1, 0x0, -0x7e <.text+0xdc240>
   dc750: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   dc758: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dc760: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   dc768: 05 00 7e ff 00 00 00 00      	ja -0x82 <.text+0xdc240>
   dc770: 71 91 80 00 00 00 00 00      	ldxb r1, [r9 + 0x80]
   dc778: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc780: 07 02 00 00 9f fb ff ff      	add64 r2, -0x461
   dc788: 7b 2a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r2
   dc790: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   dc7a0: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   dc7a8: 18 02 00 00 91 74 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b7491
   dc7b8: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   dc7c0: 73 1a 9f fb 00 00 00 00      	stxb [r10 - 0x461], r1
   dc7c8: 7a 0a e8 fb 01 00 00 00      	stdw [r10 - 0x418], 0x1
   dc7d0: 7a 0a d8 fb 20 00 00 00      	stdw [r10 - 0x428], 0x20
   dc7d8: 7a 0a c8 fb 0a 00 00 00      	stdw [r10 - 0x438], 0xa
   dc7e0: 18 01 00 00 9c 51 6a a4 00 00 00 00 14 c2 7c 70      	lddw r1, 0x707cc214a46a519c
   dc7f0: 7b 1a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r1
   dc7f8: 18 01 00 00 4c f1 c9 2c 00 00 00 00 a4 1f 40 00      	lddw r1, 0x401fa42cc9f14c
   dc808: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   dc810: 18 01 00 00 8d a8 f7 bc 00 00 00 00 07 56 15 27      	lddw r1, 0x27155607bcf7a88d
   dc820: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   dc828: 18 01 00 00 0c 35 ff a9 00 00 00 00 05 5a 8e 56      	lddw r1, 0x568e5a05a9ff350c
   dc838: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   dc840: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc848: 07 01 00 00 78 fb ff ff      	add64 r1, -0x488
   dc850: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc858: 07 02 00 00 c0 fb ff ff      	add64 r2, -0x440
   dc860: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dc868: 07 04 00 00 a0 fb ff ff      	add64 r4, -0x460
   dc870: b7 03 00 00 03 00 00 00      	mov64 r3, 0x3
   dc878: 85 10 00 00 ee 96 01 00      	call 0x196ee
   dc880: 71 a1 78 fb 00 00 00 00      	ldxb r1, [r10 - 0x488]
   dc888: 15 01 0f 00 00 00 00 00      	jeq r1, 0x0, +0xf <.text+0xdc7e8>
   dc890: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc898: 07 01 00 00 18 fa ff ff      	add64 r1, -0x5e8
   dc8a0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dc8a8: 85 10 00 00 4e 85 01 00      	call 0x1854e
   dc8b0: 79 a3 20 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5e0]
   dc8b8: 79 a2 18 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e8]
   dc8c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc8c8: 07 01 00 00 08 fa ff ff      	add64 r1, -0x5f8
   dc8d0: 18 04 00 00 91 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7491
   dc8e0: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   dc8e8: 85 10 00 00 08 4c fe ff      	call -0x1b3f8
   dc8f0: 79 a1 08 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5f8]
   dc8f8: 79 a2 10 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5f0]
   dc900: 05 00 b9 ff 00 00 00 00      	ja -0x47 <.text+0xdc5b0>
   dc908: 61 a1 7c fb 00 00 00 00      	ldxw r1, [r10 - 0x484]
   dc910: 63 1a 3b fb 00 00 00 00      	stxw [r10 - 0x4c5], r1
   dc918: 61 a1 79 fb 00 00 00 00      	ldxw r1, [r10 - 0x487]
   dc920: 63 1a 38 fb 00 00 00 00      	stxw [r10 - 0x4c8], r1
   dc928: 79 a1 90 fb 00 00 00 00      	ldxdw r1, [r10 - 0x470]
   dc930: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   dc938: 7b 1a 4f fb 00 00 00 00      	stxdw [r10 - 0x4b1], r1
   dc940: 71 a1 98 fb 00 00 00 00      	ldxb r1, [r10 - 0x468]
   dc948: 73 1a 57 fb 00 00 00 00      	stxb [r10 - 0x4a9], r1
   dc950: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   dc958: 7b 1a 3f fb 00 00 00 00      	stxdw [r10 - 0x4c1], r1
   dc960: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   dc968: 7b 1a 47 fb 00 00 00 00      	stxdw [r10 - 0x4b9], r1
   dc970: 79 91 88 00 00 00 00 00      	ldxdw r1, [r9 + 0x88]
   dc978: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dc980: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   dc988: 7b 2a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r2
   dc990: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   dc998: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   dc9a0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   dc9a8: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   dc9b0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dc9b8: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dc9c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc9c8: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dc9d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc9d8: 07 02 00 00 38 fb ff ff      	add64 r2, -0x4c8
   dc9e0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dc9e8: 85 10 00 00 91 ad 01 00      	call 0x1ad91
   dc9f0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dc9f8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dca00: 15 00 28 00 00 00 00 00      	jeq r0, 0x0, +0x28 <.text+0xdca28>
   dca08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca10: 07 01 00 00 f8 f9 ff ff      	add64 r1, -0x608
   dca18: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dca20: 85 10 00 00 1f 85 01 00      	call 0x1851f
   dca28: 79 a3 00 fa 00 00 00 00      	ldxdw r3, [r10 - 0x600]
   dca30: 79 a2 f8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x608]
   dca38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca40: 07 01 00 00 e8 f9 ff ff      	add64 r1, -0x618
   dca48: 18 04 00 00 91 74 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7491
   dca58: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   dca60: 85 10 00 00 d9 4b fe ff      	call -0x1b427
   dca68: 79 a3 f0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x610]
   dca70: 79 a2 e8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x618]
   dca78: 79 91 88 00 00 00 00 00      	ldxdw r1, [r9 + 0x88]
   dca80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dca88: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   dca90: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   dca98: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   dcaa0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   dcaa8: 79 a7 38 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4c8]
   dcab0: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   dcab8: 79 a7 40 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4c0]
   dcac0: 7b 7a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r7
   dcac8: 79 a7 48 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4b8]
   dcad0: 7b 7a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r7
   dcad8: 79 a7 50 fb 00 00 00 00      	ldxdw r7, [r10 - 0x4b0]
   dcae0: 7b 7a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r7
   dcae8: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dcaf0: 7b 0a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r0
   dcaf8: 7b 5a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r5
   dcb00: 7b 4a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r4
   dcb08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcb10: 07 01 00 00 d8 f9 ff ff      	add64 r1, -0x628
   dcb18: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dcb20: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   dcb28: 85 10 00 00 d1 7e 01 00      	call 0x17ed1
   dcb30: 79 a1 d8 f9 00 00 00 00      	ldxdw r1, [r10 - 0x628]
   dcb38: 79 a2 e0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x620]
   dcb40: 05 00 71 ff 00 00 00 00      	ja -0x8f <.text+0xdc5b0>
   dcb48: 18 01 00 00 d4 f8 09 0c 00 00 00 00 18 e9 a8 63      	lddw r1, 0x63a8e9180c09f8d4
   dcb58: 7b 1a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r1
   dcb60: 18 01 00 00 f4 29 8d 31 00 00 00 00 56 d5 71 b4      	lddw r1, -0x4b8e2aa9ce72d60c
   dcb70: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   dcb78: 18 01 00 00 94 25 08 18 00 00 00 00 bb 65 40 65      	lddw r1, 0x654065bb18082594
   dcb88: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   dcb90: 18 01 00 00 0c 14 de fc 00 00 00 00 82 5e c6 76      	lddw r1, 0x76c65e82fcde140c
   dcba0: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   dcba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcbb0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dcbb8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dcbc0: 07 04 00 00 78 fb ff ff      	add64 r4, -0x488
   dcbc8: 18 02 00 00 88 df 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdf88
   dcbd8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dcbe0: 85 10 00 00 5a 96 01 00      	call 0x1965a
   dcbe8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   dcbf0: 7b 1a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r1
   dcbf8: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   dcc00: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   dcc08: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   dcc10: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   dcc18: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   dcc20: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   dcc28: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   dcc30: 79 a2 b0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x750]
   dcc38: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   dcc40: 79 a1 a0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x760]
   dcc48: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   dcc50: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   dcc58: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dcc60: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   dcc68: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   dcc70: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dcc78: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   dcc80: 7b 2a 38 f8 00 00 00 00      	stxdw [r10 - 0x7c8], r2
   dcc88: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dcc90: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dcc98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcca0: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dcca8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dccb0: 07 02 00 00 a0 fb ff ff      	add64 r2, -0x460
   dccb8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dccc0: 85 10 00 00 36 ad 01 00      	call 0x1ad36
   dccc8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dccd0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dccd8: 15 00 27 00 00 00 00 00      	jeq r0, 0x0, +0x27 <.text+0xdccf8>
   dcce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcce8: 07 01 00 00 c8 f9 ff ff      	add64 r1, -0x638
   dccf0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dccf8: 85 10 00 00 c4 84 01 00      	call 0x184c4
   dcd00: 79 a3 d0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x630]
   dcd08: 79 a2 c8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x638]
   dcd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd18: 07 01 00 00 b8 f9 ff ff      	add64 r1, -0x648
   dcd20: 18 04 00 00 92 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7892
   dcd30: b7 05 00 00 16 00 00 00      	mov64 r5, 0x16
   dcd38: 85 10 00 00 7e 4b fe ff      	call -0x1b482
   dcd40: 79 a3 c0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x640]
   dcd48: 79 a2 b8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x648]
   dcd50: 79 a4 38 f8 00 00 00 00      	ldxdw r4, [r10 - 0x7c8]
   dcd58: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   dcd60: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dcd68: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   dcd70: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   dcd78: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   dcd80: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   dcd88: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dcd90: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dcd98: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   dcda0: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   dcda8: 79 a1 a8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x458]
   dcdb0: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   dcdb8: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   dcdc0: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   dcdc8: 79 a1 b8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x448]
   dcdd0: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   dcdd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcde0: 07 01 00 00 a8 f9 ff ff      	add64 r1, -0x658
   dcde8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dcdf0: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   dcdf8: 85 10 00 00 77 7e 01 00      	call 0x17e77
   dce00: 79 a1 a8 f9 00 00 00 00      	ldxdw r1, [r10 - 0x658]
   dce08: 79 a2 b0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x650]
   dce10: 05 00 17 ff 00 00 00 00      	ja -0xe9 <.text+0xdc5b0>
   dce18: 79 a1 98 f8 00 00 00 00      	ldxdw r1, [r10 - 0x768]
   dce20: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dce28: 15 01 17 00 00 00 00 00      	jeq r1, 0x0, +0x17 <.text+0xdcdc8>
   dce30: 79 a1 88 f8 00 00 00 00      	ldxdw r1, [r10 - 0x778]
   dce38: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   dce40: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dce48: 15 01 34 00 00 00 00 00      	jeq r1, 0x0, +0x34 <.text+0xdced0>
   dce50: 79 a1 80 f8 00 00 00 00      	ldxdw r1, [r10 - 0x780]
   dce58: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   dce60: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dce68: 55 01 1e 00 00 00 00 00      	jne r1, 0x0, +0x1e <.text+0xdce40>
   dce70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dce78: 07 01 00 00 48 f9 ff ff      	add64 r1, -0x6b8
   dce80: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dce88: 85 10 00 00 92 84 01 00      	call 0x18492
   dce90: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   dce98: 79 a2 48 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6b8]
   dcea0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcea8: 07 01 00 00 38 f9 ff ff      	add64 r1, -0x6c8
   dceb0: 18 04 00 00 87 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7887
   dcec0: b7 05 00 00 0b 00 00 00      	mov64 r5, 0xb
   dcec8: 85 10 00 00 4c 4b fe ff      	call -0x1b4b4
   dced0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   dced8: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   dcee0: 05 00 fd fe 00 00 00 00      	ja -0x103 <.text+0xdc5b0>
   dcee8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcef0: 07 01 00 00 08 f9 ff ff      	add64 r1, -0x6f8
   dcef8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dcf00: 85 10 00 00 83 84 01 00      	call 0x18483
   dcf08: 79 a3 10 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f0]
   dcf10: 79 a2 08 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6f8]
   dcf18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf20: 07 01 00 00 f8 f8 ff ff      	add64 r1, -0x708
   dcf28: 18 04 00 00 68 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b5e68
   dcf38: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   dcf40: 85 10 00 00 3d 4b fe ff      	call -0x1b4c3
   dcf48: 79 a1 f8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x708]
   dcf50: 79 a2 00 f9 00 00 00 00      	ldxdw r2, [r10 - 0x700]
   dcf58: 05 00 ee fe 00 00 00 00      	ja -0x112 <.text+0xdc5b0>
   dcf60: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   dcf68: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dcf70: 55 01 1e 00 00 00 00 00      	jne r1, 0x0, +0x1e <.text+0xdcf48>
   dcf78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf80: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   dcf88: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dcf90: 85 10 00 00 71 84 01 00      	call 0x18471
   dcf98: 79 a3 70 f9 00 00 00 00      	ldxdw r3, [r10 - 0x690]
   dcfa0: 79 a2 68 f9 00 00 00 00      	ldxdw r2, [r10 - 0x698]
   dcfa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcfb0: 07 01 00 00 58 f9 ff ff      	add64 r1, -0x6a8
   dcfb8: 18 04 00 00 9d 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b739d
   dcfc8: b7 05 00 00 15 00 00 00      	mov64 r5, 0x15
   dcfd0: 85 10 00 00 2b 4b fe ff      	call -0x1b4d5
   dcfd8: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   dcfe0: 79 a2 60 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6a0]
   dcfe8: 05 00 dc fe 00 00 00 00      	ja -0x124 <.text+0xdc5b0>
   dcff0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcff8: 07 01 00 00 28 f9 ff ff      	add64 r1, -0x6d8
   dd000: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dd008: 85 10 00 00 62 84 01 00      	call 0x18462
   dd010: 79 a3 30 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d0]
   dd018: 79 a2 28 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d8]
   dd020: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd028: 07 01 00 00 18 f9 ff ff      	add64 r1, -0x6e8
   dd030: 18 04 00 00 81 78 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7881
   dd040: b7 05 00 00 06 00 00 00      	mov64 r5, 0x6
   dd048: 85 10 00 00 1c 4b fe ff      	call -0x1b4e4
   dd050: 79 a1 18 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e8]
   dd058: 79 a2 20 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6e0]
   dd060: 05 00 cd fe 00 00 00 00      	ja -0x133 <.text+0xdc5b0>
   dd068: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd070: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dd078: 18 02 00 00 d8 db 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bdbd8
   dd088: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dd090: 79 a4 a8 f8 00 00 00 00      	ldxdw r4, [r10 - 0x758]
   dd098: 85 10 00 00 c3 95 01 00      	call 0x195c3
   dd0a0: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   dd0a8: 7b 1a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r1
   dd0b0: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   dd0b8: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   dd0c0: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   dd0c8: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   dd0d0: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   dd0d8: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   dd0e0: 71 a1 e0 fb 00 00 00 00      	ldxb r1, [r10 - 0x420]
   dd0e8: 79 a2 b0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x750]
   dd0f0: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   dd0f8: 79 a2 48 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7b8]
   dd100: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   dd108: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dd110: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   dd118: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   dd120: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   dd128: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   dd130: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dd138: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dd140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd148: 07 01 00 00 c0 fb ff ff      	add64 r1, -0x440
   dd150: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dd158: 07 02 00 00 78 fb ff ff      	add64 r2, -0x488
   dd160: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dd168: 85 10 00 00 a1 ac 01 00      	call 0x1aca1
   dd170: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dd178: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dd180: 55 00 28 00 00 00 00 00      	jne r0, 0x0, +0x28 <.text+0xdd1a8>
   dd188: 69 a1 10 fb 00 00 00 00      	ldxh r1, [r10 - 0x4f0]
   dd190: 6b 16 88 00 00 00 00 00      	stxh [r6 + 0x88], r1
   dd198: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   dd1a0: 7b 16 80 00 00 00 00 00      	stxdw [r6 + 0x80], r1
   dd1a8: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   dd1b0: 7b 16 78 00 00 00 00 00      	stxdw [r6 + 0x78], r1
   dd1b8: 61 a1 f8 fa 00 00 00 00      	ldxw r1, [r10 - 0x508]
   dd1c0: 63 16 8b 00 00 00 00 00      	stxw [r6 + 0x8b], r1
   dd1c8: 71 a1 fc fa 00 00 00 00      	ldxb r1, [r10 - 0x504]
   dd1d0: 73 16 8f 00 00 00 00 00      	stxb [r6 + 0x8f], r1
   dd1d8: 79 a1 40 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7c0]
   dd1e0: 73 16 8a 00 00 00 00 00      	stxb [r6 + 0x8a], r1
   dd1e8: 79 a1 50 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b0]
   dd1f0: 7b 16 70 00 00 00 00 00      	stxdw [r6 + 0x70], r1
   dd1f8: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   dd200: 7b 16 68 00 00 00 00 00      	stxdw [r6 + 0x68], r1
   dd208: 79 a1 48 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b8]
   dd210: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   dd218: 7b 76 58 00 00 00 00 00      	stxdw [r6 + 0x58], r7
   dd220: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   dd228: 7b 16 50 00 00 00 00 00      	stxdw [r6 + 0x50], r1
   dd230: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   dd238: 7b 16 48 00 00 00 00 00      	stxdw [r6 + 0x48], r1
   dd240: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   dd248: 7b 16 40 00 00 00 00 00      	stxdw [r6 + 0x40], r1
   dd250: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   dd258: 7b 16 38 00 00 00 00 00      	stxdw [r6 + 0x38], r1
   dd260: 79 a1 80 f8 00 00 00 00      	ldxdw r1, [r10 - 0x780]
   dd268: 7b 16 30 00 00 00 00 00      	stxdw [r6 + 0x30], r1
   dd270: 79 a1 88 f8 00 00 00 00      	ldxdw r1, [r10 - 0x778]
   dd278: 7b 16 28 00 00 00 00 00      	stxdw [r6 + 0x28], r1
   dd280: 79 a1 90 f8 00 00 00 00      	ldxdw r1, [r10 - 0x770]
   dd288: 7b 16 20 00 00 00 00 00      	stxdw [r6 + 0x20], r1
   dd290: 79 a1 98 f8 00 00 00 00      	ldxdw r1, [r10 - 0x768]
   dd298: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
   dd2a0: 79 a1 a0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x760]
   dd2a8: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   dd2b0: 7b 96 08 00 00 00 00 00      	stxdw [r6 + 0x8], r9
   dd2b8: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   dd2c0: 05 00 13 fe 00 00 00 00      	ja -0x1ed <.text+0xdc240>
   dd2c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd2d0: 07 01 00 00 98 f9 ff ff      	add64 r1, -0x668
   dd2d8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dd2e0: 85 10 00 00 07 84 01 00      	call 0x18407
   dd2e8: 79 a3 a0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x660]
   dd2f0: 79 a2 98 f9 00 00 00 00      	ldxdw r2, [r10 - 0x668]
   dd2f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd300: 07 01 00 00 88 f9 ff ff      	add64 r1, -0x678
   dd308: 18 04 00 00 2c 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b732c
   dd318: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dd320: 85 10 00 00 c1 4a fe ff      	call -0x1b53f
   dd328: 79 a3 90 f9 00 00 00 00      	ldxdw r3, [r10 - 0x670]
   dd330: 79 a2 88 f9 00 00 00 00      	ldxdw r2, [r10 - 0x678]
   dd338: 79 a4 48 f8 00 00 00 00      	ldxdw r4, [r10 - 0x7b8]
   dd340: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   dd348: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   dd350: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   dd358: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   dd360: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   dd368: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   dd370: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dd378: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   dd380: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   dd388: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   dd390: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   dd398: 7b 1a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r1
   dd3a0: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   dd3a8: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   dd3b0: 79 a1 90 fb 00 00 00 00      	ldxdw r1, [r10 - 0x470]
   dd3b8: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   dd3c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dd3c8: 07 01 00 00 78 f9 ff ff      	add64 r1, -0x688
   dd3d0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dd3d8: 07 04 00 00 c0 fb ff ff      	add64 r4, -0x440
   dd3e0: 85 10 00 00 ba 7d 01 00      	call 0x17dba
   dd3e8: 79 a1 78 f9 00 00 00 00      	ldxdw r1, [r10 - 0x688]
   dd3f0: 79 a2 80 f9 00 00 00 00      	ldxdw r2, [r10 - 0x680]
   dd3f8: 05 00 5a fe 00 00 00 00      	ja -0x1a6 <.text+0xdc5b0>
