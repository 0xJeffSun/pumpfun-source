
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   e62b8: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   e62c0: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   e62c8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   e62d0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   e62d8: 18 01 00 00 78 e8 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11e878
   e62e8: b7 02 00 00 21 00 00 00      	mov64 r2, 0x21
   e62f0: 85 10 00 00 ff ff ff ff      	call -0x1
   e62f8: 72 0a 7f f5 ff 00 00 00      	stb [r10 - 0xa81], 0xff
   e6300: 6a 0a 7d f5 ff ff 00 00      	sth [r10 - 0xa83], 0xffff
   e6308: 7b 8a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r8
   e6310: 7b 9a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r9
   e6318: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6320: 07 01 00 00 7d f5 ff ff      	add64 r1, -0xa83
   e6328: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   e6330: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6338: 07 01 00 00 c8 fa ff ff      	add64 r1, -0x538
   e6340: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   e6348: 07 03 00 00 80 f5 ff ff      	add64 r3, -0xa80
   e6350: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e6358: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   e6360: 85 10 00 00 44 c4 ff ff      	call -0x3bbc
   e6368: 61 a8 c8 fa 00 00 00 00      	ldxw r8, [r10 - 0x538]
   e6370: 15 08 4e 00 02 00 00 00      	jeq r8, 0x2, +0x4e <.text+0xe64c8>
   e6378: 7b 6a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r6
   e6380: 61 a1 cc fa 00 00 00 00      	ldxw r1, [r10 - 0x534]
   e6388: 7b 1a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r1
   e6390: 79 a6 d0 fa 00 00 00 00      	ldxdw r6, [r10 - 0x530]
   e6398: 79 a9 d8 fa 00 00 00 00      	ldxdw r9, [r10 - 0x528]
   e63a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e63a8: 07 01 00 00 a8 f5 ff ff      	add64 r1, -0xa58
   e63b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e63b8: 07 02 00 00 e0 fa ff ff      	add64 r2, -0x520
   e63c0: b7 03 00 00 20 05 00 00      	mov64 r3, 0x520
   e63c8: 85 10 00 00 99 66 00 00      	call 0x6699
   e63d0: 7b 9a a0 f5 00 00 00 00      	stxdw [r10 - 0xa60], r9
   e63d8: 7b 6a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r6
   e63e0: 79 a1 48 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab8]
   e63e8: 63 1a 94 f5 00 00 00 00      	stxw [r10 - 0xa6c], r1
   e63f0: 63 8a 90 f5 00 00 00 00      	stxw [r10 - 0xa70], r8
   e63f8: 69 a1 7d f5 00 00 00 00      	ldxh r1, [r10 - 0xa83]
   e6400: 6b 1a e8 fa 00 00 00 00      	stxh [r10 - 0x518], r1
   e6408: 71 a1 7f f5 00 00 00 00      	ldxb r1, [r10 - 0xa81]
   e6410: 73 1a ea fa 00 00 00 00      	stxb [r10 - 0x516], r1
   e6418: 79 a1 88 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa78]
   e6420: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   e6428: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   e6430: 7b 1a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r1
   e6438: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6440: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   e6448: 7b 1a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r1
   e6450: 7b 7a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r7
   e6458: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6460: 07 01 00 00 68 f5 ff ff      	add64 r1, -0xa98
   e6468: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e6470: 07 02 00 00 c8 fa ff ff      	add64 r2, -0x538
   e6478: 85 10 00 00 1e e8 fe ff      	call -0x117e2
   e6480: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   e6488: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xe6378>
   e6490: 05 00 2f 00 00 00 00 00      	ja +0x2f <.text+0xe64f0>
   e6498: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e64a0: 07 01 00 00 58 f5 ff ff      	add64 r1, -0xaa8
   e64a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e64b0: 07 02 00 00 90 f5 ff ff      	add64 r2, -0xa70
   e64b8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   e64c0: 85 10 00 00 bb cb ff ff      	call -0x3445
   e64c8: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   e64d0: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   e64d8: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   e64e0: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e64e8: 79 a2 60 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa0]
   e64f0: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   e64f8: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   e6500: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0xe6400>
   e6508: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   e6510: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e6518: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   e6520: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   e6528: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e6530: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   e6538: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   e6540: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0xe6440>
   e6548: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   e6550: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e6558: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   e6560: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   e6568: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   e6570: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   e6578: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e6580: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   e6588: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0xe6488>
   e6590: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   e6598: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e65a0: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   e65a8: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   e65b0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e65b8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   e65c0: 55 04 06 00 00 00 00 00      	jne r4, 0x0, +0x6 <.text+0xe64d8>
   e65c8: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   e65d0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e65d8: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   e65e0: 05 00 02 00 00 00 00 00      	ja +0x2 <.text+0xe64d8>
   e65e8: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   e65f0: 79 a1 d0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x530]
   e65f8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   e6600: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   e6608: 95 00 00 00 00 00 00 00      	exit
   e6610: 79 a2 70 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa90]
   e6618: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   e6620: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   e6628: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   e6630: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e6638: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   e6640: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0xe6540>
   e6648: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   e6650: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e6658: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   e6660: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   e6668: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e6670: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   e6678: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   e6680: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0xe6580>
   e6688: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   e6690: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e6698: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   e66a0: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   e66a8: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   e66b0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   e66b8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e66c0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   e66c8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0xe65c8>
   e66d0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   e66d8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   e66e0: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   e66e8: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   e66f0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   e66f8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   e6700: 55 04 de ff 00 00 00 00      	jne r4, 0x0, -0x22 <.text+0xe64d8>
   e6708: 05 00 d7 ff 00 00 00 00      	ja -0x29 <.text+0xe64a8>
