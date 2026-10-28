
work/amm-private-events-sweep-combined-20261027/build/artifacts/pump_amm_recovered.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   db8d0: 7b 5a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r5
   db8d8: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   db8e0: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   db8e8: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   db8f0: 71 27 21 00 00 00 00 00      	ldxb r7, [r2 + 0x21]
   db8f8: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
   db900: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   db908: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db910: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   db918: 7b 2a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r2
   db920: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   db928: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   db930: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   db938: 7b 2a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r2
   db940: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db948: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   db950: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   db958: 07 01 00 00 38 04 00 00      	add64 r1, 0x438
   db960: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   db968: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   db970: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   db978: 85 10 00 00 7b 88 00 00      	call 0x887b
   db980: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   db988: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   db990: 15 00 3e 00 00 00 00 00      	jeq r0, 0x0, +0x3e <.text+0xdba68>
   db998: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db9a0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   db9a8: 18 02 00 00 24 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122424
   db9b8: 85 10 00 00 98 14 00 00      	call 0x1498
   db9c0: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   db9c8: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   db9d0: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   db9d8: 18 01 00 00 30 84 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x128430
   db9e8: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   db9f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db9f8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dba00: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   dba08: 72 0a 68 ff 03 00 00 00      	stb [r10 - 0x98], 0x3
   dba10: 7a 0a 60 ff 20 00 00 00      	stdw [r10 - 0xa0], 0x20
   dba18: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   dba20: 7a 0a 30 ff 00 00 00 00      	stdw [r10 - 0xd0], 0x0
   dba28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dba30: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dba38: 18 01 00 00 24 24 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122424
   dba48: 85 10 00 00 7b 1f 00 00      	call 0x1f7b
   dba50: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xdb988>
   dba58: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dba60: 07 03 00 00 a0 fe ff ff      	add64 r3, -0x160
   dba68: 18 01 00 00 72 25 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122572
   dba78: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   dba80: 18 04 00 00 60 84 12 00 00 00 00 00 00 00 00 00      	lddw r4, 0x128460
   dba90: 18 05 00 00 80 84 12 00 00 00 00 00 00 00 00 00      	lddw r5, 0x128480
   dbaa0: 85 10 00 00 2d 7b 00 00      	call 0x7b2d
   dbaa8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dbab0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbab8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dbac0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbac8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   dbad0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dbad8: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dbae0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dbae8: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   dbaf0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dbaf8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dbb00: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dbb08: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dbb18: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dbb20: 62 0a 98 fe 8c 17 00 00      	stw [r10 - 0x168], 0x178c
   dbb28: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dbb30: 62 0a 18 fe 38 00 00 00      	stw [r10 - 0x1e8], 0x38
   dbb38: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dbb40: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dbb48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbb50: 07 01 00 00 d0 fd ff ff      	add64 r1, -0x230
   dbb58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbb60: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dbb68: 85 10 00 00 18 5b 00 00      	call 0x5b18
   dbb70: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   dbb78: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   dbb80: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0xdbd30>
   dbb88: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   dbb90: 7b 7a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r7
   dbb98: 71 61 4b 05 00 00 00 00      	ldxb r1, [r6 + 0x54b]
   dbba0: bf 65 00 00 00 00 00 00      	mov64 r5, r6
   dbba8: 55 01 20 00 00 00 00 00      	jne r1, 0x0, +0x20 <.text+0xdbb90>
   dbbb0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   dbbb8: 79 12 08 f0 00 00 00 00      	ldxdw r2, [r1 - 0xff8]
   dbbc0: 79 13 00 f0 00 00 00 00      	ldxdw r3, [r1 - 0x1000]
   dbbc8: 71 51 4e 05 00 00 00 00      	ldxb r1, [r5 + 0x54e]
   dbbd0: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <.text+0xdbd50>
   dbbd8: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   dbbe0: 55 08 54 00 00 00 00 00      	jne r8, 0x0, +0x54 <.text+0xdbd68>
   dbbe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbbf0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   dbbf8: 18 02 00 00 00 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122400
   dbc08: 85 10 00 00 4e 14 00 00      	call 0x144e
   dbc10: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   dbc18: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   dbc20: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   dbc28: 18 01 00 00 30 84 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x128430
   dbc38: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   dbc40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbc48: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dbc50: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   dbc58: 72 0a 68 ff 03 00 00 00      	stb [r10 - 0x98], 0x3
   dbc60: 7a 0a 60 ff 20 00 00 00      	stdw [r10 - 0xa0], 0x20
   dbc68: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   dbc70: 7a 0a 30 ff 00 00 00 00      	stdw [r10 - 0xd0], 0x0
   dbc78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbc80: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dbc88: 18 01 00 00 00 24 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122400
   dbc98: 85 10 00 00 31 1f 00 00      	call 0x1f31
   dbca0: 15 00 71 00 00 00 00 00      	jeq r0, 0x0, +0x71 <.text+0xdbf10>
   dbca8: 05 00 b5 ff 00 00 00 00      	ja -0x4b <.text+0xdb938>
   dbcb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbcb8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   dbcc0: 18 02 00 00 30 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122430
   dbcd0: 85 10 00 00 35 14 00 00      	call 0x1435
   dbcd8: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   dbce0: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   dbce8: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   dbcf0: 18 01 00 00 30 84 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x128430
   dbd00: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   dbd08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbd10: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dbd18: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   dbd20: 72 0a 68 ff 03 00 00 00      	stb [r10 - 0x98], 0x3
   dbd28: 7a 0a 60 ff 20 00 00 00      	stdw [r10 - 0xa0], 0x20
   dbd30: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   dbd38: 7a 0a 30 ff 00 00 00 00      	stdw [r10 - 0xd0], 0x0
   dbd40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbd48: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dbd50: 18 01 00 00 30 24 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122430
   dbd60: 85 10 00 00 18 1f 00 00      	call 0x1f18
   dbd68: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xdbc58>
   dbd70: 05 00 9c ff 00 00 00 00      	ja -0x64 <.text+0xdb938>
   dbd78: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dbd80: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbd88: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dbd90: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbd98: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   dbda0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dbda8: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dbdb0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dbdb8: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   dbdc0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dbdc8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dbdd0: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dbdd8: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dbde8: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dbdf0: 62 0a 98 fe bb 17 00 00      	stw [r10 - 0x168], 0x17bb
   dbdf8: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dbe00: 62 0a 18 fe 39 00 00 00      	stw [r10 - 0x1e8], 0x39
   dbe08: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dbe10: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dbe18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbe20: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   dbe28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbe30: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dbe38: 85 10 00 00 be 5a 00 00      	call 0x5abe
   dbe40: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   dbe48: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   dbe50: 79 a3 08 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f8]
   dbe58: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   dbe60: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   dbe68: 95 00 00 00 00 00 00 00      	exit
   dbe70: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   dbe78: 55 08 01 00 00 00 00 00      	jne r8, 0x0, +0x1 <.text+0xdbd68>
   dbe80: 05 00 95 00 00 00 00 00      	ja +0x95 <.text+0xdc210>
   dbe88: 7b 3a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r3
   dbe90: 7b 2a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r2
   dbe98: 18 01 00 00 1a 30 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x12301a
   dbea8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   dbeb0: bf 51 00 00 00 00 00 00      	mov64 r1, r5
   dbeb8: 07 01 00 00 58 04 00 00      	add64 r1, 0x458
   dbec0: 7b 1a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r1
   dbec8: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   dbed0: 7a 0a 48 ff 20 00 00 00      	stdw [r10 - 0xb8], 0x20
   dbed8: 7a 0a 38 ff 0e 00 00 00      	stdw [r10 - 0xc8], 0xe
   dbee0: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   dbee8: 07 06 00 00 00 fe ff ff      	add64 r6, -0x200
   dbef0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbef8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dbf00: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   dbf08: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   dbf10: 18 04 00 00 b4 36 12 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1236b4
   dbf20: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   dbf28: 85 10 00 00 b6 70 00 00      	call 0x70b6
   dbf30: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   dbf38: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   dbf40: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dbf48: 85 10 00 00 c1 87 00 00      	call 0x87c1
   dbf50: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dbf58: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dbf60: 15 00 a4 00 00 00 00 00      	jeq r0, 0x0, +0xa4 <.text+0xdc368>
   dbf68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbf70: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   dbf78: 18 02 00 00 a0 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1224a0
   dbf88: 85 10 00 00 de 13 00 00      	call 0x13de
   dbf90: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   dbf98: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   dbfa0: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   dbfa8: 18 01 00 00 30 84 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x128430
   dbfb8: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   dbfc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbfc8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dbfd0: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   dbfd8: 72 0a 68 ff 03 00 00 00      	stb [r10 - 0x98], 0x3
   dbfe0: 7a 0a 60 ff 20 00 00 00      	stdw [r10 - 0xa0], 0x20
   dbfe8: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   dbff0: 7a 0a 30 ff 00 00 00 00      	stdw [r10 - 0xd0], 0x0
   dbff8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc000: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dc008: 18 01 00 00 a0 24 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1224a0
   dc018: 85 10 00 00 c1 1e 00 00      	call 0x1ec1
   dc020: 15 00 1d 00 00 00 00 00      	jeq r0, 0x0, +0x1d <.text+0xdbff0>
   dc028: 05 00 45 ff 00 00 00 00      	ja -0xbb <.text+0xdb938>
   dc030: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dc038: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc040: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dc048: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc050: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   dc058: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc060: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dc068: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dc070: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   dc078: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc080: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dc088: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc090: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc0a0: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc0a8: 62 0a 98 fe ba 17 00 00      	stw [r10 - 0x168], 0x17ba
   dc0b0: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc0b8: 62 0a 18 fe 3a 00 00 00      	stw [r10 - 0x1e8], 0x3a
   dc0c0: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc0c8: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc0d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc0d8: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   dc0e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc0e8: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc0f0: 85 10 00 00 67 5a 00 00      	call 0x5a67
   dc0f8: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   dc100: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]
   dc108: 05 00 a8 ff 00 00 00 00      	ja -0x58 <.text+0xdbd30>
   dc110: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dc118: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc120: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   dc128: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc130: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   dc138: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc140: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   dc148: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dc150: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   dc158: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc160: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dc168: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc170: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc180: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc188: 62 0a 98 fe bc 17 00 00      	stw [r10 - 0x168], 0x17bc
   dc190: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc198: 62 0a 18 fe 3c 00 00 00      	stw [r10 - 0x1e8], 0x3c
   dc1a0: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc1a8: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc1b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc1b8: 07 01 00 00 90 fd ff ff      	add64 r1, -0x270
   dc1c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc1c8: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc1d0: 85 10 00 00 4b 5a 00 00      	call 0x5a4b
   dc1d8: 79 a6 98 fd 00 00 00 00      	ldxdw r6, [r10 - 0x268]
   dc1e0: 79 a8 90 fd 00 00 00 00      	ldxdw r8, [r10 - 0x270]
   dc1e8: 79 a1 f0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x310]
   dc1f0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   dc1f8: 18 01 00 00 1a 30 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x12301a
   dc208: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   dc210: 7a 0a b0 ff 20 00 00 00      	stdw [r10 - 0x50], 0x20
   dc218: 7a 0a a0 ff 0e 00 00 00      	stdw [r10 - 0x60], 0xe
   dc220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc228: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   dc230: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc238: 07 02 00 00 98 ff ff ff      	add64 r2, -0x68
   dc240: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   dc248: 18 04 00 00 b4 36 12 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1236b4
   dc258: 85 10 00 00 50 70 00 00      	call 0x7050
   dc260: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   dc268: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc270: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   dc278: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc280: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   dc288: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc290: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   dc298: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dc2a0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   dc2a8: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   dc2b0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   dc2b8: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc2c0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   dc2c8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dc2d0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dc2d8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dc2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc2e8: 07 01 00 00 80 fd ff ff      	add64 r1, -0x280
   dc2f0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dc2f8: 07 04 00 00 00 fe ff ff      	add64 r4, -0x200
   dc300: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dc308: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   dc310: 85 10 00 00 66 5a 00 00      	call 0x5a66
   dc318: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   dc320: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]
   dc328: 05 00 64 ff 00 00 00 00      	ja -0x9c <.text+0xdbd30>
   dc330: 7b 2a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r2
   dc338: 71 56 4c 05 00 00 00 00      	ldxb r6, [r5 + 0x54c]
   dc340: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dc348: 55 06 01 00 00 00 00 00      	jne r6, 0x0, +0x1 <.text+0xdc238>
   dc350: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dc358: 15 03 01 00 01 00 00 00      	jeq r3, 0x1, +0x1 <.text+0xdc248>
   dc360: 05 00 6d 00 00 00 00 00      	ja +0x6d <.text+0xdc5b0>
   dc368: 7b 3a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r3
   dc370: bf 51 00 00 00 00 00 00      	mov64 r1, r5
   dc378: 07 01 00 00 78 04 00 00      	add64 r1, 0x478
   dc380: 7b 5a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r5
   dc388: bf 49 00 00 00 00 00 00      	mov64 r9, r4
   dc390: 85 10 00 00 b9 9c fe ff      	call -0x16347
   dc398: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   dc3a0: 79 a9 f0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x310]
   dc3a8: 55 00 27 00 00 00 00 00      	jne r0, 0x0, +0x27 <.text+0xdc3c8>
   dc3b0: 15 06 40 00 00 00 00 00      	jeq r6, 0x0, +0x40 <.text+0xdc498>
   dc3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc3c0: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   dc3c8: 18 02 00 00 fc 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1224fc
   dc3d8: 85 10 00 00 54 13 00 00      	call 0x1354
   dc3e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc3e8: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   dc3f0: 18 02 00 00 fc 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1224fc
   dc400: 85 10 00 00 56 58 fe ff      	call -0x1a7aa
   dc408: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc418: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc420: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc428: 62 0a 18 fe 41 00 00 00      	stw [r10 - 0x1e8], 0x41
   dc430: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc438: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc440: 62 0a 98 fe b7 17 00 00      	stw [r10 - 0x168], 0x17b7
   dc448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc450: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   dc458: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc460: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc468: 85 10 00 00 f8 59 00 00      	call 0x59f8
   dc470: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   dc478: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   dc480: 05 00 39 ff 00 00 00 00      	ja -0xc7 <.text+0xdbd30>
   dc488: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dc490: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   dc498: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   dc4a0: 15 03 01 00 01 00 00 00      	jeq r3, 0x1, +0x1 <.text+0xdc390>
   dc4a8: 05 00 44 00 00 00 00 00      	ja +0x44 <.text+0xdc5b0>
   dc4b0: bf 51 00 00 00 00 00 00      	mov64 r1, r5
   dc4b8: 07 01 00 00 78 04 00 00      	add64 r1, 0x478
   dc4c0: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   dc4c8: 85 10 00 00 92 9c fe ff      	call -0x1636e
   dc4d0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   dc4d8: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xdc3c8>
   dc4e0: 05 00 1a 00 00 00 00 00      	ja +0x1a <.text+0xdc498>
   dc4e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc4f0: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   dc4f8: 18 02 00 00 ac 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1224ac
   dc508: 85 10 00 00 2e 13 00 00      	call 0x132e
   dc510: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc518: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   dc520: 18 02 00 00 ac 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1224ac
   dc530: 85 10 00 00 30 58 fe ff      	call -0x1a7d0
   dc538: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc548: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc550: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc558: 62 0a 18 fe 40 00 00 00      	stw [r10 - 0x1e8], 0x40
   dc560: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc568: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc570: 62 0a 98 fe bd 17 00 00      	stw [r10 - 0x168], 0x17bd
   dc578: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc580: 07 01 00 00 10 fd ff ff      	add64 r1, -0x2f0
   dc588: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc590: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc598: 85 10 00 00 d2 59 00 00      	call 0x59d2
   dc5a0: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   dc5a8: 79 a2 10 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f0]
   dc5b0: 05 00 13 ff 00 00 00 00      	ja -0xed <.text+0xdbd30>
   dc5b8: 71 91 2c 04 00 00 00 00      	ldxb r1, [r9 + 0x42c]
   dc5c0: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   dc5c8: 15 01 0f 01 00 00 00 00      	jeq r1, 0x0, +0x10f <.text+0xdcd28>
   dc5d0: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   dc5d8: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   dc5e0: 55 01 1a 00 00 00 00 00      	jne r1, 0x0, +0x1a <.text+0xdc598>
   dc5e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc5f0: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   dc5f8: 18 02 00 00 74 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122474
   dc608: 85 10 00 00 0e 13 00 00      	call 0x130e
   dc610: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc618: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   dc620: 18 02 00 00 74 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122474
   dc630: 85 10 00 00 10 58 fe ff      	call -0x1a7f0
   dc638: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc648: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc650: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc658: 62 0a 18 fe 43 00 00 00      	stw [r10 - 0x1e8], 0x43
   dc660: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc668: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc670: 62 0a 98 fe b5 17 00 00      	stw [r10 - 0x168], 0x17b5
   dc678: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc680: 07 01 00 00 30 fd ff ff      	add64 r1, -0x2d0
   dc688: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc690: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc698: 85 10 00 00 b2 59 00 00      	call 0x59b2
   dc6a0: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   dc6a8: 79 a2 30 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2d0]
   dc6b0: 05 00 f3 fe 00 00 00 00      	ja -0x10d <.text+0xdbd30>
   dc6b8: 79 51 20 04 00 00 00 00      	ldxdw r1, [r5 + 0x420]
   dc6c0: 79 a2 e8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x318]
   dc6c8: ad 21 e3 ff 00 00 00 00      	jlt r1, r2, -0x1d <.text+0xdc4c8>
   dc6d0: 79 51 40 05 00 00 00 00      	ldxdw r1, [r5 + 0x540]
   dc6d8: 15 01 1a 00 00 00 00 00      	jeq r1, 0x0, +0x1a <.text+0xdc690>
   dc6e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc6e8: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   dc6f0: 18 02 00 00 38 25 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122538
   dc700: 85 10 00 00 ef 12 00 00      	call 0x12ef
   dc708: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc710: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   dc718: 18 02 00 00 38 25 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122538
   dc728: 85 10 00 00 f1 57 fe ff      	call -0x1a80f
   dc730: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dc740: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dc748: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dc750: 62 0a 18 fe 45 00 00 00      	stw [r10 - 0x1e8], 0x45
   dc758: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dc760: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dc768: 62 0a 98 fe c1 17 00 00      	stw [r10 - 0x168], 0x17c1
   dc770: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc778: 07 01 00 00 70 fd ff ff      	add64 r1, -0x290
   dc780: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc788: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dc790: 85 10 00 00 93 59 00 00      	call 0x5993
   dc798: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   dc7a0: 79 a2 70 fd 00 00 00 00      	ldxdw r2, [r10 - 0x290]
   dc7a8: 05 00 d4 fe 00 00 00 00      	ja -0x12c <.text+0xdbd30>
   dc7b0: bf 46 00 00 00 00 00 00      	mov64 r6, r4
   dc7b8: 7b 3a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r3
   dc7c0: 79 52 30 04 00 00 00 00      	ldxdw r2, [r5 + 0x430]
   dc7c8: 79 54 00 00 00 00 00 00      	ldxdw r4, [r5 + 0x0]
   dc7d0: 79 53 10 00 00 00 00 00      	ldxdw r3, [r5 + 0x10]
   dc7d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc7e0: 07 01 00 00 60 fd ff ff      	add64 r1, -0x2a0
   dc7e8: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   dc7f0: 85 10 00 00 0c c9 fe ff      	call -0x136f4
   dc7f8: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   dc800: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   dc808: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xdc6f8>
   dc810: 05 00 c7 fe 00 00 00 00      	ja -0x139 <.text+0xdbd30>
   dc818: 79 91 10 05 00 00 00 00      	ldxdw r1, [r9 + 0x510]
   dc820: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   dc828: 79 91 08 05 00 00 00 00      	ldxdw r1, [r9 + 0x508]
   dc830: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   dc838: 79 91 00 05 00 00 00 00      	ldxdw r1, [r9 + 0x500]
   dc840: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   dc848: 79 91 f8 04 00 00 00 00      	ldxdw r1, [r9 + 0x4f8]
   dc850: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   dc858: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dc860: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
   dc868: 79 73 08 00 00 00 00 00      	ldxdw r3, [r7 + 0x8]
   dc870: 79 74 00 00 00 00 00 00      	ldxdw r4, [r7 + 0x0]
   dc878: 57 06 00 00 01 00 00 00      	and64 r6, 0x1
   dc880: 73 69 4c 05 00 00 00 00      	stxb [r9 + 0x54c], r6
   dc888: 7b 49 f8 04 00 00 00 00      	stxdw [r9 + 0x4f8], r4
   dc890: 7b 39 00 05 00 00 00 00      	stxdw [r9 + 0x500], r3
   dc898: 7b 29 08 05 00 00 00 00      	stxdw [r9 + 0x508], r2
   dc8a0: 7b 19 10 05 00 00 00 00      	stxdw [r9 + 0x510], r1
   dc8a8: 73 89 4e 05 00 00 00 00      	stxb [r9 + 0x54e], r8
   dc8b0: 72 09 4d 05 00 00 00 00      	stb [r9 + 0x54d], 0x0
   dc8b8: 79 96 30 05 00 00 00 00      	ldxdw r6, [r9 + 0x530]
   dc8c0: 79 a1 00 fd 00 00 00 00      	ldxdw r1, [r10 - 0x300]
   dc8c8: 55 01 02 00 01 00 00 00      	jne r1, 0x1, +0x2 <.text+0xdc7c0>
   dc8d0: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   dc8d8: 7b 19 30 05 00 00 00 00      	stxdw [r9 + 0x530], r1
   dc8e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc8e8: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   dc8f0: 85 10 00 00 37 61 00 00      	call 0x6137
   dc8f8: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   dc900: 55 01 c2 00 00 00 00 00      	jne r1, 0x0, +0xc2 <.text+0xdcdf8>
   dc908: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   dc910: 79 92 58 04 00 00 00 00      	ldxdw r2, [r9 + 0x458]
   dc918: 7b 2a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r2
   dc920: 79 92 60 04 00 00 00 00      	ldxdw r2, [r9 + 0x460]
   dc928: 7b 2a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r2
   dc930: 79 92 68 04 00 00 00 00      	ldxdw r2, [r9 + 0x468]
   dc938: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   dc940: 79 92 70 04 00 00 00 00      	ldxdw r2, [r9 + 0x470]
   dc948: 7b 2a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r2
   dc950: 79 92 30 04 00 00 00 00      	ldxdw r2, [r9 + 0x430]
   dc958: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   dc960: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   dc968: 7b 3a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r3
   dc970: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   dc978: 7b 3a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r3
   dc980: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   dc988: 7b 3a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r3
   dc990: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   dc998: 7b 2a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r2
   dc9a0: 79 92 30 05 00 00 00 00      	ldxdw r2, [r9 + 0x530]
   dc9a8: 71 93 4c 05 00 00 00 00      	ldxb r3, [r9 + 0x54c]
   dc9b0: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   dc9b8: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   dc9c0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc9c8: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   dc9d0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc9d8: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   dc9e0: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   dc9e8: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   dc9f0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dc9f8: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dca00: 79 74 10 00 00 00 00 00      	ldxdw r4, [r7 + 0x10]
   dca08: 79 75 08 00 00 00 00 00      	ldxdw r5, [r7 + 0x8]
   dca10: 79 70 00 00 00 00 00 00      	ldxdw r0, [r7 + 0x0]
   dca18: 73 8a 98 fe 00 00 00 00      	stxb [r10 - 0x168], r8
   dca20: 73 3a 99 fe 00 00 00 00      	stxb [r10 - 0x167], r3
   dca28: 7b 6a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r6
   dca30: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   dca38: 7b 0a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r0
   dca40: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   dca48: 7b 4a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r4
   dca50: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   dca58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca60: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   dca68: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   dca70: 07 06 00 00 00 fe ff ff      	add64 r6, -0x200
   dca78: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   dca80: 85 10 00 00 58 75 ff ff      	call -0x8aa8
   dca88: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   dca90: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   dca98: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   dcaa0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   dcaa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcab0: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   dcab8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dcac0: 85 10 00 00 86 60 00 00      	call 0x6086
   dcac8: 07 09 00 00 18 00 00 00      	add64 r9, 0x18
   dcad0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   dcad8: 07 07 00 00 a0 fe ff ff      	add64 r7, -0x160
   dcae0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   dcae8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dcaf0: 85 10 00 00 bd 62 fe ff      	call -0x19d43
   dcaf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcb00: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   dcb08: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   dcb10: 85 10 00 00 46 75 ff ff      	call -0x8aba
   dcb18: 18 01 00 00 94 2b 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122b94
   dcb28: 18 02 00 00 94 2b 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122b94
   dcb38: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   dcb40: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   dcb48: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dcb50: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   dcb58: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dcb60: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   dcb68: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   dcb70: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   dcb78: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   dcb80: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   dcb88: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   dcb90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcb98: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   dcba0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcba8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   dcbb0: 85 10 00 00 d7 65 fe ff      	call -0x19a29
   dcbb8: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   dcbc0: 79 a9 f8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x108]
   dcbc8: b7 01 00 00 22 00 00 00      	mov64 r1, 0x22
   dcbd0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dcbd8: 85 10 00 00 da 5c fe ff      	call -0x1a326
   dcbe0: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   dcbe8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   dcbf0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   dcbf8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   dcc00: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   dcc08: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   dcc10: 7b 40 08 00 00 00 00 00      	stxdw [r0 + 0x8], r4
   dcc18: 7b 30 10 00 00 00 00 00      	stxdw [r0 + 0x10], r3
   dcc20: 7b 20 18 00 00 00 00 00      	stxdw [r0 + 0x18], r2
   dcc28: 6a 00 20 00 01 00 00 00      	sth [r0 + 0x20], 0x1
   dcc30: 7b 0a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r0
   dcc38: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   dcc40: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   dcc48: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   dcc50: 07 06 00 00 30 ff ff ff      	add64 r6, -0xd0
   dcc58: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   dcc60: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   dcc68: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   dcc70: 18 02 00 00 df 37 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1237df
   dcc80: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   dcc88: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   dcc90: 85 10 00 00 66 6e 00 00      	call 0x6e66
   dcc98: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   dcca0: 07 08 00 00 98 ff ff ff      	add64 r8, -0x68
   dcca8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dccb0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dccb8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   dccc0: 85 10 00 00 09 86 00 00      	call 0x8609
   dccc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dccd0: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   dccd8: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   dcce0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcce8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dccf0: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   dccf8: 18 01 00 00 f2 2c 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122cf2
   dcd08: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   dcd10: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   dcd18: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   dcd20: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   dcd28: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   dcd30: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   dcd38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd40: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   dcd48: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   dcd50: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   dcd58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd60: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   dcd68: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   dcd70: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   dcd78: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   dcd80: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dcd88: 85 10 00 00 34 60 00 00      	call 0x6034
   dcd90: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   dcda0: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   dcda8: 1d 12 01 00 00 00 00 00      	jeq r2, r1, +0x1 <.text+0xdcc98>
   dcdb0: 05 00 3a 00 00 00 00 00      	ja +0x3a <.text+0xdce68>
   dcdb8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   dcdc0: 79 a2 a0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x60]
   dcdc8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   dcdd0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dcdd8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   dcde0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xdcce0>
   dcde8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   dcdf0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dcdf8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   dce00: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   dce08: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dce10: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   dce18: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xdcd18>
   dce20: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   dce28: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dce30: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   dce38: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   dce40: 05 00 01 fe 00 00 00 00      	ja -0x1ff <.text+0xdbd30>
   dce48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dce50: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   dce58: 18 02 00 00 5c 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x12245c
   dce68: 85 10 00 00 02 12 00 00      	call 0x1202
   dce70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dce78: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   dce80: 18 02 00 00 5c 24 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x12245c
   dce90: 85 10 00 00 04 57 fe ff      	call -0x1a8fc
   dce98: 18 01 00 00 cc 2f 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x122fcc
   dcea8: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   dceb0: 72 0a 50 fe 02 00 00 00      	stb [r10 - 0x1b0], 0x2
   dceb8: 62 0a 18 fe 42 00 00 00      	stw [r10 - 0x1e8], 0x42
   dcec0: 7a 0a 10 fe 2d 00 00 00      	stdw [r10 - 0x1f0], 0x2d
   dcec8: 7a 0a 00 fe 00 00 00 00      	stdw [r10 - 0x200], 0x0
   dced0: 62 0a 98 fe b4 17 00 00      	stw [r10 - 0x168], 0x17b4
   dced8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcee0: 07 01 00 00 20 fd ff ff      	add64 r1, -0x2e0
   dcee8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcef0: 07 02 00 00 00 fe ff ff      	add64 r2, -0x200
   dcef8: 85 10 00 00 a6 58 00 00      	call 0x58a6
   dcf00: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   dcf08: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]
   dcf10: 05 00 e7 fd 00 00 00 00      	ja -0x219 <.text+0xdbd30>
   dcf18: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   dcf20: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   dcf28: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   dcf30: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   dcf38: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   dcf40: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   dcf48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf50: 07 01 00 00 50 fd ff ff      	add64 r1, -0x2b0
   dcf58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcf60: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   dcf68: 85 10 00 00 a9 58 00 00      	call 0x58a9
   dcf70: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   dcf78: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   dcf80: 05 00 d9 fd 00 00 00 00      	ja -0x227 <.text+0xdbd30>
   dcf88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcf90: 07 01 00 00 40 fd ff ff      	add64 r1, -0x2c0
   dcf98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcfa0: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   dcfa8: 85 10 00 00 a1 58 00 00      	call 0x58a1
   dcfb0: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   dcfb8: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   dcfc0: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   dcfc8: 79 a4 a0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x60]
   dcfd0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   dcfd8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   dcfe0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   dcfe8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0xdcee8>
   dcff0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   dcff8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   dd000: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   dd008: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   dd010: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   dd018: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   dd020: 55 04 c5 fd 00 00 00 00      	jne r4, 0x0, -0x23b <.text+0xdbd30>
   dd028: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   dd030: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   dd038: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   dd040: 05 00 c1 fd 00 00 00 00      	ja -0x23f <.text+0xdbd30>
