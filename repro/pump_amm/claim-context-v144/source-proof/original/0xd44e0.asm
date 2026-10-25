
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   d44e0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   d44e8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d44f0: a5 01 27 00 08 00 00 00      	jlt r1, 0x8, +0x27 <.text+0xd4510>
   d44f8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d4500: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d4508: 18 03 00 00 ca 2a f6 2b 00 00 00 00 8e be 1e ff      	lddw r3, -0xe14171d409d536
   d4518: 1d 31 50 00 00 00 00 00      	jeq r1, r3, +0x50 <.text+0xd4680>
   d4520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4528: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   d4530: 18 02 00 00 94 c0 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c094
   d4540: 85 10 00 00 a0 61 00 00      	call 0x61a0
   d4548: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   d4550: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   d4558: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   d4560: 18 01 00 00 e0 21 12 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1221e0
   d4570: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   d4578: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4580: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   d4588: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   d4590: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   d4598: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   d45a0: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   d45a8: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   d45b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d45b8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   d45c0: 18 01 00 00 94 c0 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c094
   d45d0: 85 10 00 00 56 63 00 00      	call 0x6356
   d45d8: 15 00 11 00 00 00 00 00      	jeq r0, 0x0, +0x11 <.text+0xd4548>
   d45e0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   d45e8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   d45f0: 18 01 00 00 fa c0 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11c0fa
   d4600: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   d4608: 18 04 00 00 10 22 12 00 00 00 00 00 00 00 00 00      	lddw r4, 0x122210
   d4618: 18 05 00 00 30 22 12 00 00 00 00 00 00 00 00 00      	lddw r5, 0x122230
   d4628: 85 10 00 00 2d 7d 00 00      	call 0x7d2d
   d4630: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4638: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   d4640: b7 02 00 00 b9 0b 00 00      	mov64 r2, 0xbb9
   d4648: 85 10 00 00 fd 62 00 00      	call 0x62fd
   d4650: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   d4658: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   d4660: 05 00 23 00 00 00 00 00      	ja +0x23 <.text+0xd4660>
   d4668: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   d4670: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   d4678: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   d4680: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   d4688: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   d4690: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   d4698: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   d46a0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   d46a8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   d46b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   d46b8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   d46c0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   d46c8: 18 01 00 00 5e cf 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cf5e
   d46d8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   d46e0: 62 0a 88 ff ba 0b 00 00      	stw [r10 - 0x78], 0xbba
   d46e8: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   d46f0: 62 0a 08 ff 08 00 00 00      	stw [r10 - 0xf8], 0x8
   d46f8: 7a 0a 00 ff 31 00 00 00      	stdw [r10 - 0x100], 0x31
   d4700: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   d4708: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4710: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   d4718: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4720: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   d4728: 85 10 00 00 11 5d 00 00      	call 0x5d11
   d4730: 79 a3 e8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x118]
   d4738: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   d4740: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4748: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   d4750: 18 04 00 00 ab e4 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e4ab
   d4760: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d4768: 85 10 00 00 c1 5a fe ff      	call -0x1a53f
   d4770: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   d4778: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   d4780: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   d4788: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   d4790: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   d4798: 95 00 00 00 00 00 00 00      	exit
   d47a0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   d47a8: 85 10 00 00 01 00 00 00      	call 0x1
   d47b0: 05 00 fc ff 00 00 00 00      	ja -0x4 <.text+0xd4678>
