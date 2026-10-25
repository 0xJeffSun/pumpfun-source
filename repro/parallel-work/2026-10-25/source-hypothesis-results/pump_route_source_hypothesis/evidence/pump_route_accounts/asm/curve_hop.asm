   5b3b0: bf 56 00 00 00 00 00 00      	mov64 r6, r5
   5b3b8: 7b 3a a8 f5 00 00 00 00      	stxdw [r10 - 0xa58], r3
   5b3c0: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5b3c8: 7b 4a c0 f5 00 00 00 00      	stxdw [r10 - 0xa40], r4
   5b3d0: 79 49 10 00 00 00 00 00      	ldxdw r9, [r4 + 0x10]
   5b3d8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   5b3e0: 07 07 00 00 50 00 00 00      	add64 r7, 0x50
   5b3e8: 7b 2a b8 f5 00 00 00 00      	stxdw [r10 - 0xa48], r2
   5b3f0: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   5b3f8: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   5b400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b408: 07 01 00 00 d8 f7 ff ff      	add64 r1, -0x828
   5b410: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5b418: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5b420: 7b 4a b0 f5 00 00 00 00      	stxdw [r10 - 0xa50], r4
   5b428: 85 10 00 00 24 c3 ff ff      	call -0x3cdc
   5b430: 79 a1 d8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x828]
   5b438: 55 01 3c 00 02 00 00 00      	jne r1, 0x2, +0x3c <.text+0x5b500>
   5b440: 7b 8a a0 f5 00 00 00 00      	stxdw [r10 - 0xa60], r8
   5b448: 79 68 28 f0 00 00 00 00      	ldxdw r8, [r6 - 0xfd8]
   5b450: 7b 8a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r8
   5b458: 57 08 00 00 02 00 00 00      	and64 r8, 0x2
   5b460: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5b468: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0x5b358>
   5b470: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5b478: 79 61 20 f0 00 00 00 00      	ldxdw r1, [r6 - 0xfe0]
   5b480: 7b 1a 78 f5 00 00 00 00      	stxdw [r10 - 0xa88], r1
   5b488: 79 61 18 f0 00 00 00 00      	ldxdw r1, [r6 - 0xfe8]
   5b490: 7b 1a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r1
   5b498: 79 61 10 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff0]
   5b4a0: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5b4a8: 79 61 08 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff8]
   5b4b0: 7b 1a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r1
   5b4b8: 79 66 00 f0 00 00 00 00      	ldxdw r6, [r6 - 0x1000]
   5b4c0: 71 93 a3 00 00 00 00 00      	ldxb r3, [r9 + 0xa3]
   5b4c8: 71 92 a1 00 00 00 00 00      	ldxb r2, [r9 + 0xa1]
   5b4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b4d8: 07 01 00 00 c8 f7 ff ff      	add64 r1, -0x838
   5b4e0: 85 10 00 00 79 45 00 00      	call 0x4579
   5b4e8: 79 a1 c8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x838]
   5b4f0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5b3e0>
   5b4f8: 05 00 29 00 00 00 00 00      	ja +0x29 <.text+0x5b528>
   5b500: 71 91 a2 00 00 00 00 00      	ldxb r1, [r9 + 0xa2]
   5b508: 15 01 4c 00 00 00 00 00      	jeq r1, 0x0, +0x4c <.text+0x5b650>
   5b510: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b518: 07 01 00 00 68 fb ff ff      	add64 r1, -0x498
   5b520: 18 02 00 00 d8 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5ed8
   5b530: 85 10 00 00 c9 f7 01 00      	call 0x1f7c9
   5b538: 7a 0a d0 fc 00 00 00 00      	stdw [r10 - 0x330], 0x0
   5b540: 7a 0a c8 fc 01 00 00 00      	stdw [r10 - 0x338], 0x1
   5b548: 7a 0a c0 fc 00 00 00 00      	stdw [r10 - 0x340], 0x0
   5b550: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   5b560: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   5b568: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b570: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5b578: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   5b580: 72 0a d8 fd 03 00 00 00      	stb [r10 - 0x228], 0x3
   5b588: 7a 0a d0 fd 20 00 00 00      	stdw [r10 - 0x230], 0x20
   5b590: 7a 0a b0 fd 00 00 00 00      	stdw [r10 - 0x250], 0x0
   5b598: 7a 0a a0 fd 00 00 00 00      	stdw [r10 - 0x260], 0x0
   5b5a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b5a8: 07 02 00 00 a0 fd ff ff      	add64 r2, -0x260
   5b5b0: 18 01 00 00 d8 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5ed8
   5b5c0: 85 10 00 00 18 05 02 00      	call 0x20518
   5b5c8: 15 00 14 00 00 00 00 00      	jeq r0, 0x0, +0x14 <.text+0x5b550>
   5b5d0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5b5d8: 07 03 00 00 30 f9 ff ff      	add64 r3, -0x6d0
   5b5e0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   5b5f0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   5b5f8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   5b608: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   5b618: 85 10 00 00 ff a2 02 00      	call 0x2a2ff
   5b620: 79 a2 e0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x820]
   5b628: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   5b630: 7b 28 08 00 00 00 00 00      	stxdw [r8 + 0x8], r2
   5b638: 72 08 5a 00 02 00 00 00      	stb [r8 + 0x5a], 0x2
   5b640: 05 00 24 00 00 00 00 00      	ja +0x24 <.text+0x5b648>
   5b648: 79 a2 d0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x830]
   5b650: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5b658: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5b660: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5b668: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0x5b640>
   5b670: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5b678: 7b 1a 78 f9 00 00 00 00      	stxdw [r10 - 0x688], r1
   5b680: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   5b688: 7b 1a 70 f9 00 00 00 00      	stxdw [r10 - 0x690], r1
   5b690: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   5b698: 7b 1a 68 f9 00 00 00 00      	stxdw [r10 - 0x698], r1
   5b6a0: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   5b6a8: 7b 1a 50 f9 00 00 00 00      	stxdw [r10 - 0x6b0], r1
   5b6b0: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   5b6b8: 7b 1a 58 f9 00 00 00 00      	stxdw [r10 - 0x6a8], r1
   5b6c0: 79 a1 78 fb 00 00 00 00      	ldxdw r1, [r10 - 0x488]
   5b6c8: 7b 1a 60 f9 00 00 00 00      	stxdw [r10 - 0x6a0], r1
   5b6d0: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5b6e0: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5b6e8: 62 0a c8 f9 dc 17 00 00      	stw [r10 - 0x638], 0x17dc
   5b6f0: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5b6f8: 62 0a 48 f9 e4 01 00 00      	stw [r10 - 0x6b8], 0x1e4
   5b700: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5b708: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5b710: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b718: 07 01 00 00 b8 f7 ff ff      	add64 r1, -0x848
   5b720: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b728: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5b730: 85 10 00 00 7f 80 02 00      	call 0x2807f
   5b738: 79 a1 b8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x848]
   5b740: 79 a2 c0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x840]
   5b748: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5b750: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5b758: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5b760: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5b768: 95 00 00 00 00 00 00 00      	exit
   5b770: 7b 6a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r6
   5b778: 7a 0a 48 f9 00 00 00 00      	stdw [r10 - 0x6b8], 0x0
   5b780: 7a 0a 40 f9 00 00 00 00      	stdw [r10 - 0x6c0], 0x0
   5b788: 7a 0a 38 f9 00 00 00 00      	stdw [r10 - 0x6c8], 0x0
   5b790: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5b798: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   5b7a0: 07 06 00 00 28 00 00 00      	add64 r6, 0x28
   5b7a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b7b0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5b7b8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5b7c0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5b7c8: 85 10 00 00 d5 af 02 00      	call 0x2afd5
   5b7d0: 7b 0a 70 f5 00 00 00 00      	stxdw [r10 - 0xa90], r0
   5b7d8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5b7e0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5b7e8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5b7f0: 7b 6a 60 f5 00 00 00 00      	stxdw [r10 - 0xaa0], r6
   5b7f8: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5b6e8>
   5b800: 05 00 46 00 00 00 00 00      	ja +0x46 <.text+0x5b918>
   5b808: 7b 8a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r8
   5b810: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5b818: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
   5b820: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5b828: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5b830: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   5b838: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   5b840: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   5b848: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x5b738>
   5b850: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   5b858: 79 28 00 00 00 00 00 00      	ldxdw r8, [r2 + 0x0]
   5b860: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   5b868: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x5b758>
   5b870: 85 10 00 00 ff ff ff ff      	call -0x1
   5b878: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   5b880: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   5b888: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   5b890: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   5b898: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x5b788>
   5b8a0: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0
   5b8a8: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   5b8b0: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <.text+0x5b7a0>
   5b8b8: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0x5b750>
   5b8c0: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   5b8c8: 79 20 20 00 00 00 00 00      	ldxdw r0, [r2 + 0x20]
   5b8d0: 71 26 28 00 00 00 00 00      	ldxb r6, [r2 + 0x28]
   5b8d8: 71 23 29 00 00 00 00 00      	ldxb r3, [r2 + 0x29]
   5b8e0: 71 22 2a 00 00 00 00 00      	ldxb r2, [r2 + 0x2a]
   5b8e8: 73 2a 5a f9 00 00 00 00      	stxb [r10 - 0x6a6], r2
   5b8f0: 73 3a 59 f9 00 00 00 00      	stxb [r10 - 0x6a7], r3
   5b8f8: 73 6a 58 f9 00 00 00 00      	stxb [r10 - 0x6a8], r6
   5b900: 7b 0a 50 f9 00 00 00 00      	stxdw [r10 - 0x6b0], r0
   5b908: 7b 5a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r5
   5b910: 7b 4a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r4
   5b918: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5b920: 7b 8a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r8
   5b928: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5b930: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5b938: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5b940: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5b948: 85 10 00 00 f7 71 00 00      	call 0x71f7
   5b950: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]
   5b958: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5b960: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   5b968: 15 03 52 00 02 00 00 00      	jeq r3, 0x2, +0x52 <.text+0x5bae0>
   5b970: 79 a4 b8 fd 00 00 00 00      	ldxdw r4, [r10 - 0x248]
   5b978: 7b 4a 00 f8 00 00 00 00      	stxdw [r10 - 0x800], r4
   5b980: 7b 2a f8 f7 00 00 00 00      	stxdw [r10 - 0x808], r2
   5b988: 7b 1a f0 f7 00 00 00 00      	stxdw [r10 - 0x810], r1
   5b990: 7b 3a e8 f7 00 00 00 00      	stxdw [r10 - 0x818], r3
   5b998: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5b9a0: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5b9a8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5b9b0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5b9b8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5b9c0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5b8c0>
   5b9c8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5b9d0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5b9d8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5b9e0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5b9e8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5b9f0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5b9f8: 79 a6 c0 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa40]
   5ba00: 79 a8 58 f5 00 00 00 00      	ldxdw r8, [r10 - 0xaa8]
   5ba08: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5b908>
   5ba10: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ba18: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ba20: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5ba28: 7b 9a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r9
   5ba30: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5b948>
   5ba38: 7b 9a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r9
   5ba40: 7a 0a 00 f8 00 00 00 00      	stdw [r10 - 0x800], 0x0
   5ba48: 7a 0a f8 f7 00 00 00 00      	stdw [r10 - 0x808], 0x0
   5ba50: 7a 0a f0 f7 00 00 00 00      	stdw [r10 - 0x810], 0x0
   5ba58: 7a 0a e8 f7 00 00 00 00      	stdw [r10 - 0x818], 0x0
   5ba60: 79 a6 c0 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa40]
   5ba68: 79 a9 b8 f5 00 00 00 00      	ldxdw r9, [r10 - 0xa48]
   5ba70: 79 93 48 00 00 00 00 00      	ldxdw r3, [r9 + 0x48]
   5ba78: 79 92 40 00 00 00 00 00      	ldxdw r2, [r9 + 0x40]
   5ba80: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5ba88: 7b 1a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r1
   5ba90: 79 14 58 00 00 00 00 00      	ldxdw r4, [r1 + 0x58]
   5ba98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5baa0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5baa8: 85 10 00 00 77 f9 ff ff      	call -0x689
   5bab0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5bab8: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   5bac0: 79 a6 30 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6d0]
   5bac8: 71 a2 5a f9 00 00 00 00      	ldxb r2, [r10 - 0x6a6]
   5bad0: 15 02 20 00 02 00 00 00      	jeq r2, 0x2, +0x20 <.text+0x5bab8>
   5bad8: 69 a3 58 f9 00 00 00 00      	ldxh r3, [r10 - 0x6a8]
   5bae0: 6b 3a 30 f8 00 00 00 00      	stxh [r10 - 0x7d0], r3
   5bae8: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   5baf0: 7b 3a 28 f8 00 00 00 00      	stxdw [r10 - 0x7d8], r3
   5baf8: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5bb00: 7b 3a 20 f8 00 00 00 00      	stxdw [r10 - 0x7e0], r3
   5bb08: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5bb10: 7b 3a 18 f8 00 00 00 00      	stxdw [r10 - 0x7e8], r3
   5bb18: 61 a3 5b f9 00 00 00 00      	ldxw r3, [r10 - 0x6a5]
   5bb20: 63 3a 33 f8 00 00 00 00      	stxw [r10 - 0x7cd], r3
   5bb28: 71 a3 5f f9 00 00 00 00      	ldxb r3, [r10 - 0x6a1]
   5bb30: 73 3a 37 f8 00 00 00 00      	stxb [r10 - 0x7c9], r3
   5bb38: 73 2a 32 f8 00 00 00 00      	stxb [r10 - 0x7ce], r2
   5bb40: 7b 1a 10 f8 00 00 00 00      	stxdw [r10 - 0x7f0], r1
   5bb48: 7b 6a 08 f8 00 00 00 00      	stxdw [r10 - 0x7f8], r6
   5bb50: 79 93 48 00 00 00 00 00      	ldxdw r3, [r9 + 0x48]
   5bb58: 79 92 40 00 00 00 00 00      	ldxdw r2, [r9 + 0x40]
   5bb60: 79 49 08 00 00 00 00 00      	ldxdw r9, [r4 + 0x8]
   5bb68: 79 94 58 00 00 00 00 00      	ldxdw r4, [r9 + 0x58]
   5bb70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bb78: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5bb80: 85 10 00 00 5c f9 ff ff      	call -0x6a4
   5bb88: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5bb90: 79 a4 30 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6d0]
   5bb98: 71 a1 5a f9 00 00 00 00      	ldxb r1, [r10 - 0x6a6]
   5bba0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5ba90>
   5bba8: 05 00 1c 00 00 00 00 00      	ja +0x1c <.text+0x5bb70>
   5bbb0: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5bbb8: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   5bbc0: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   5bbc8: 72 01 5a 00 02 00 00 00      	stb [r1 + 0x5a], 0x2
   5bbd0: 05 00 d7 00 00 00 00 00      	ja +0xd7 <.text+0x5c170>
   5bbd8: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5bbe0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5bbe8: 7b 62 00 00 00 00 00 00      	stxdw [r2 + 0x0], r6
   5bbf0: 72 02 5a 00 02 00 00 00      	stb [r2 + 0x5a], 0x2
   5bbf8: 05 00 6d ff 00 00 00 00      	ja -0x93 <.text+0x5b648>
   5bc00: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5bc08: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5bc10: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5bc18: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5bc20: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5bc28: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5bc30: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5bc38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5bc40: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5bc48: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5bb48>
   5bc50: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5bc58: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5bc60: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5bc68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5bc70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5bc78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5bc80: 55 02 5c ff 00 00 00 00      	jne r2, 0x0, -0xa4 <.text+0x5b648>
   5bc88: 05 00 3d 07 00 00 00 00      	ja +0x73d <.text+0x5f558>
   5bc90: 7b 9a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r9
   5bc98: 69 a2 58 f9 00 00 00 00      	ldxh r2, [r10 - 0x6a8]
   5bca0: 6b 2a 60 f8 00 00 00 00      	stxh [r10 - 0x7a0], r2
   5bca8: 79 a2 50 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6b0]
   5bcb0: 7b 2a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r2
   5bcb8: 79 a2 48 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6b8]
   5bcc0: 7b 2a 50 f8 00 00 00 00      	stxdw [r10 - 0x7b0], r2
   5bcc8: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5bcd0: 7b 2a 48 f8 00 00 00 00      	stxdw [r10 - 0x7b8], r2
   5bcd8: 61 a2 5b f9 00 00 00 00      	ldxw r2, [r10 - 0x6a5]
   5bce0: 63 2a 63 f8 00 00 00 00      	stxw [r10 - 0x79d], r2
   5bce8: 71 a2 5f f9 00 00 00 00      	ldxb r2, [r10 - 0x6a1]
   5bcf0: 73 2a 67 f8 00 00 00 00      	stxb [r10 - 0x799], r2
   5bcf8: 73 1a 62 f8 00 00 00 00      	stxb [r10 - 0x79e], r1
   5bd00: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   5bd08: 7b 3a 40 f8 00 00 00 00      	stxdw [r10 - 0x7c0], r3
   5bd10: 7b 4a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r4
   5bd18: 7b 4a 38 f8 00 00 00 00      	stxdw [r10 - 0x7c8], r4
   5bd20: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5bd28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd30: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd38: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5bd40: 7b 2a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r2
   5bd48: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5bd50: 7b 2a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r2
   5bd58: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5bd60: 7b 2a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r2
   5bd68: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bd70: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5bd78: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5bd80: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5bd88: 7b 1a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r1
   5bd90: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5bd98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bda0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5bda8: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   5bdb0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5bdb8: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   5bdc0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5bdc8: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   5bdd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bdd8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5bde0: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   5bde8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5bdf0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bdf8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5be00: 7b 2a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r2
   5be08: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5be10: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   5be18: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5be20: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   5be28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5be30: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5be38: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   5be40: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5be48: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   5be50: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5be58: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   5be60: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5be68: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5be70: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5be78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5be80: 07 01 00 00 a8 f7 ff ff      	add64 r1, -0x858
   5be88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5be90: 07 02 00 00 c0 fc ff ff      	add64 r2, -0x340
   5be98: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5bea0: 07 03 00 00 68 f8 ff ff      	add64 r3, -0x798
   5bea8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5beb0: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5beb8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5bec0: 07 05 00 00 30 f9 ff ff      	add64 r5, -0x6d0
   5bec8: 85 10 00 00 a4 f9 ff ff      	call -0x65c
   5bed0: 79 a1 a8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x858]
   5bed8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5bdc8>
   5bee0: 05 00 60 00 00 00 00 00      	ja +0x60 <.text+0x5c0c8>
   5bee8: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5bef0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5bef8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5bf00: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5bdf0>
   5bf08: 05 00 7e 00 00 00 00 00      	ja +0x7e <.text+0x5c1e0>
   5bf10: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5bf18: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   5bf20: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5bf28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5bf30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bf38: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5bf40: 7b 1a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r1
   5bf48: 85 10 00 00 a5 69 ff ff      	call -0x965b
   5bf50: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5bf58: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   5bf60: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5bf68: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   5bf70: 7b 3a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r3
   5bf78: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5bf80: 7b 3a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r3
   5bf88: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5bf90: 7b 3a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r3
   5bf98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5bfa0: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   5bfa8: 79 a3 38 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac8]
   5bfb0: 79 31 18 00 00 00 00 00      	ldxdw r1, [r3 + 0x18]
   5bfb8: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   5bfc0: 79 31 10 00 00 00 00 00      	ldxdw r1, [r3 + 0x10]
   5bfc8: 7b 1a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r1
   5bfd0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5bfd8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5bfe0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5bfe8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5bff0: bf a9 00 00 00 00 00 00      	mov64 r9, r10
   5bff8: 07 09 00 00 30 f9 ff ff      	add64 r9, -0x6d0
   5c000: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   5c008: 85 10 00 00 8d 69 ff ff      	call -0x9673
   5c010: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c018: 79 a2 b0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa50]
   5c020: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   5c028: 7b 2a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r2
   5c030: 7b 1a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r1
   5c038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c040: 07 01 00 00 38 f8 ff ff      	add64 r1, -0x7c8
   5c048: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5c050: 7b 9a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r9
   5c058: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c060: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5c068: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5c070: 7a 0a 18 f0 00 00 00 00      	stdw [r10 - 0xfe8], 0x0
   5c078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c080: 07 01 00 00 88 f7 ff ff      	add64 r1, -0x878
   5c088: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c090: 07 04 00 00 68 fb ff ff      	add64 r4, -0x498
   5c098: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c0a0: 7b 6a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r6
   5c0a8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5c0b0: 79 a3 28 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad8]
   5c0b8: 85 10 00 00 0a 71 ff ff      	call -0x8ef6
   5c0c0: 79 a1 88 f7 00 00 00 00      	ldxdw r1, [r10 - 0x878]
   5c0c8: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5c0d0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5bfc0>
   5c0d8: 05 00 e6 00 00 00 00 00      	ja +0xe6 <.text+0x5c6f0>
   5c0e0: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5c0e8: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5c0f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c0f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c100: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5c108: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c008>
   5c110: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5c118: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c120: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5c128: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c130: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c138: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c140: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c040>
   5c148: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c150: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c158: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c160: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5c168: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   5c170: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c178: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c180: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5c188: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c088>
   5c190: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5c198: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c1a0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5c1a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c1b0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c1b8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c1c0: 55 02 56 00 00 00 00 00      	jne r2, 0x0, +0x56 <.text+0x5c358>
   5c1c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c1d0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c1d8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c1e0: 05 00 52 00 00 00 00 00      	ja +0x52 <.text+0x5c358>
   5c1e8: 79 a2 b0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x850]
   5c1f0: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5c1f8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5c200: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5c208: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5c210: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5c218: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   5c220: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c228: 79 a1 48 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b8]
   5c230: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   5c238: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c138>
   5c240: 79 32 08 00 00 00 00 00      	ldxdw r2, [r3 + 0x8]
   5c248: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c250: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5c258: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c260: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c268: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c270: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c170>
   5c278: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c280: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c288: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c290: 79 a1 18 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7e8]
   5c298: 79 a2 10 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f0]
   5c2a0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c2a8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c2b0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5c2b8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c1b8>
   5c2c0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5c2c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c2d0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5c2d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c2e0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c2e8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c2f0: 55 02 8e fe 00 00 00 00      	jne r2, 0x0, -0x172 <.text+0x5b648>
   5c2f8: 05 00 6f 06 00 00 00 00      	ja +0x66f <.text+0x5f558>
   5c300: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5c308: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   5c310: 7b 1a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r1
   5c318: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c320: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c328: 7b 2a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r2
   5c330: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c338: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   5c340: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c348: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   5c350: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c358: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5c360: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c368: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c370: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c378: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c380: 7b 2a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r2
   5c388: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c390: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   5c398: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c3a0: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   5c3a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c3b0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5c3b8: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5c3c0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5c3c8: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5c3d0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5c3d8: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5c3e0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5c3e8: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5c3f0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c3f8: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c408: 07 01 00 00 98 f7 ff ff      	add64 r1, -0x868
   5c410: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c418: 07 02 00 00 c0 fc ff ff      	add64 r2, -0x340
   5c420: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5c428: 07 03 00 00 68 f8 ff ff      	add64 r3, -0x798
   5c430: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c438: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5c440: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c448: 07 05 00 00 30 f9 ff ff      	add64 r5, -0x6d0
   5c450: 85 10 00 00 f3 f8 ff ff      	call -0x70d
   5c458: 79 a1 98 f7 00 00 00 00      	ldxdw r1, [r10 - 0x868]
   5c460: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5c468: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5c358>
   5c470: 05 00 f9 00 00 00 00 00      	ja +0xf9 <.text+0x5cb20>
   5c478: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5c480: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5c488: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5c490: 7b 1a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r1
   5c498: 15 01 25 00 00 00 00 00      	jeq r1, 0x0, +0x25 <.text+0x5c4a8>
   5c4a0: 79 63 38 00 00 00 00 00      	ldxdw r3, [r6 + 0x38]
   5c4a8: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   5c4b0: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c4b8: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c4c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c4c8: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   5c4d0: 7b 4a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r4
   5c4d8: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   5c4e0: 7b 4a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r4
   5c4e8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5c4f0: 7b 4a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r4
   5c4f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c500: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5c508: 79 a9 38 f5 00 00 00 00      	ldxdw r9, [r10 - 0xac8]
   5c510: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5c518: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5c520: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5c528: 7b 1a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r1
   5c530: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5c538: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5c540: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5c548: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c558: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5c560: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5c568: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c570: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5c578: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5c580: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5c588: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c590: 07 01 00 00 78 f7 ff ff      	add64 r1, -0x888
   5c598: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5c5a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5c5a8: 85 10 00 00 dc 43 00 00      	call 0x43dc
   5c5b0: 79 a1 78 f7 00 00 00 00      	ldxdw r1, [r10 - 0x888]
   5c5b8: 55 01 d2 00 02 00 00 00      	jne r1, 0x2, +0xd2 <.text+0x5cb30>
   5c5c0: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5c5c8: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5c5d0: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5c5d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c5e0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c5e8: 7b 2a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r2
   5c5f0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c5f8: 7b 2a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r2
   5c600: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c608: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5c610: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c618: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c620: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c628: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5c630: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   5c638: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   5c640: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c648: 85 10 00 00 05 ae 02 00      	call 0x2ae05
   5c650: 79 a9 58 f5 00 00 00 00      	ldxdw r9, [r10 - 0xaa8]
   5c658: 79 92 58 00 00 00 00 00      	ldxdw r2, [r9 + 0x58]
   5c660: 7b 0a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r0
   5c668: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   5c670: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5c678: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5c680: 15 01 57 00 00 00 00 00      	jeq r1, 0x0, +0x57 <.text+0x5c820>
   5c688: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c690: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   5c698: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5c6a0: 7b 2a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r2
   5c6a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5c6b0: 7b 2a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r2
   5c6b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c6c0: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5c6c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5c6d0: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5c6d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c6e0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5c6e8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5c6f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c6f8: 85 10 00 00 ef ad 02 00      	call 0x2adef
   5c700: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5c708: 79 a9 58 f5 00 00 00 00      	ldxdw r9, [r10 - 0xaa8]
   5c710: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5c718: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5c720: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <.text+0x5c820>
   5c728: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c730: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5c738: 18 02 00 00 ec 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5eec
   5c748: 85 10 00 00 86 f5 01 00      	call 0x1f586
   5c750: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c758: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5c760: 18 02 00 00 ec 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5eec
   5c770: 85 10 00 00 38 5c ff ff      	call -0xa3c8
   5c778: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5c788: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5c790: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5c798: 62 0a 48 f9 22 02 00 00      	stw [r10 - 0x6b8], 0x222
   5c7a0: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5c7a8: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5c7b0: 62 0a c8 f9 d2 17 00 00      	stw [r10 - 0x638], 0x17d2
   5c7b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c7c0: 07 01 00 00 68 f7 ff ff      	add64 r1, -0x898
   5c7c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c7d0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5c7d8: 85 10 00 00 6a 7e 02 00      	call 0x27e6a
   5c7e0: 79 a1 68 f7 00 00 00 00      	ldxdw r1, [r10 - 0x898]
   5c7e8: 79 a2 70 f7 00 00 00 00      	ldxdw r2, [r10 - 0x890]
   5c7f0: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5c7f8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5c800: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5c808: 05 00 3f ff 00 00 00 00      	ja -0xc1 <.text+0x5c0e8>
   5c810: 79 a2 90 f7 00 00 00 00      	ldxdw r2, [r10 - 0x870]
   5c818: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5c820: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5c828: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5c830: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5c838: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5c840: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5c848: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c850: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c858: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5c860: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c760>
   5c868: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5c870: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c878: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5c880: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c888: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c890: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c898: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c798>
   5c8a0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c8a8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c8b0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c8b8: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5c8c0: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   5c8c8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c8d0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c8d8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5c8e0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c7e0>
   5c8e8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5c8f0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5c8f8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5c900: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5c908: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c910: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5c918: 55 02 1e ff 00 00 00 00      	jne r2, 0x0, -0xe2 <.text+0x5c0f0>
   5c920: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5c928: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5c930: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5c938: 05 00 1a ff 00 00 00 00      	ja -0xe6 <.text+0x5c0f0>
   5c940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c948: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5c950: 85 10 00 00 64 68 ff ff      	call -0x979c
   5c958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c960: 07 01 00 00 cf f8 ff ff      	add64 r1, -0x731
   5c968: 7b 1a b8 f8 00 00 00 00      	stxdw [r10 - 0x748], r1
   5c970: 18 01 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b683a
   5c980: 7b 1a 98 f8 00 00 00 00      	stxdw [r10 - 0x768], r1
   5c988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c990: 07 01 00 00 98 f8 ff ff      	add64 r1, -0x768
   5c998: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5c9a0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5c9a8: 7b 1a a8 f8 00 00 00 00      	stxdw [r10 - 0x758], r1
   5c9b0: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5c9b8: 73 1a cf f8 00 00 00 00      	stxb [r10 - 0x731], r1
   5c9c0: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5c9c8: 7a 0a c0 f8 01 00 00 00      	stdw [r10 - 0x740], 0x1
   5c9d0: 7a 0a b0 f8 20 00 00 00      	stdw [r10 - 0x750], 0x20
   5c9d8: 7a 0a a0 f8 0d 00 00 00      	stdw [r10 - 0x760], 0xd
   5c9e0: 7a 0a 90 f8 03 00 00 00      	stdw [r10 - 0x770], 0x3
   5c9e8: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5c9f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5c9f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ca00: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5ca08: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c908>
   5ca10: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ca18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ca20: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ca28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ca30: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ca38: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ca40: 79 a3 b8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa48]
   5ca48: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5c948>
   5ca50: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ca58: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ca60: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5ca68: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5ca70: 79 12 88 00 00 00 00 00      	ldxdw r2, [r1 + 0x88]
   5ca78: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5ca80: 07 06 00 00 30 f9 ff ff      	add64 r6, -0x6d0
   5ca88: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5ca90: 85 10 00 00 3c 68 ff ff      	call -0x97c4
   5ca98: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5caa0: 85 10 00 00 f8 8b 02 00      	call 0x28bf8
   5caa8: 7b 0a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r0
   5cab0: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cab8: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5cac0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5cac8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cad0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5cad8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5c9d8>
   5cae0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5cae8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5caf0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5caf8: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   5cb00: 07 06 00 00 08 00 00 00      	add64 r6, 0x8
   5cb08: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5cb10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cb18: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   5cb20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5ca20>
   5cb28: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5cb30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5cb38: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
   5cb40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cb48: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cb50: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5cb58: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cb60: 85 10 00 00 b2 87 00 00      	call 0x87b2
   5cb68: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5cb70: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cb78: 55 01 11 00 00 00 00 00      	jne r1, 0x0, +0x11 <.text+0x5cae8>
   5cb80: 7b 3a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r3
   5cb88: 7b 6a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r6
   5cb90: 79 a9 30 f5 00 00 00 00      	ldxdw r9, [r10 - 0xad0]
   5cb98: 07 09 00 00 20 00 00 00      	add64 r9, 0x20
   5cba0: 79 a6 40 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6c0]
   5cba8: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5cbb0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5cbb8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5cbc0: 15 01 13 00 00 00 00 00      	jeq r1, 0x0, +0x13 <.text+0x5cb40>
   5cbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cbd0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cbd8: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5cbe0: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   5cbe8: 85 10 00 00 29 87 00 00      	call 0x8729
   5cbf0: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5cbf8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cc00: 15 01 1f 00 00 00 00 00      	jeq r1, 0x0, +0x1f <.text+0x5cbe0>
   5cc08: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cc10: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5cc18: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5cc20: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5cc28: 72 02 5a 00 02 00 00 00      	stb [r2 + 0x5a], 0x2
   5cc30: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5cc38: 05 00 bb fe 00 00 00 00      	ja -0x145 <.text+0x5c0f8>
   5cc40: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   5cc48: 05 00 b4 fe 00 00 00 00      	ja -0x14c <.text+0x5c0d0>
   5cc50: 79 a2 80 f7 00 00 00 00      	ldxdw r2, [r10 - 0x880]
   5cc58: 05 00 b2 fe 00 00 00 00      	ja -0x14e <.text+0x5c0d0>
   5cc60: 7b 9a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r9
   5cc68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cc70: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cc78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cc80: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5cc88: 79 a9 88 f5 00 00 00 00      	ldxdw r9, [r10 - 0xa78]
   5cc90: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5cc98: 85 10 00 00 88 70 00 00      	call 0x7088
   5cca0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cca8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cb98>
   5ccb0: 05 00 c1 01 00 00 00 00      	ja +0x1c1 <.text+0x5d9a0>
   5ccb8: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5ccc0: ad 39 01 00 00 00 00 00      	jlt r9, r3, +0x1 <.text+0x5cbb0>
   5ccc8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x5cc20>
   5ccd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ccd8: 07 01 00 00 c8 f5 ff ff      	add64 r1, -0xa38
   5cce0: 85 10 00 00 ec 05 00 00      	call 0x5ec
   5cce8: 79 a1 c8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa38]
   5ccf0: 79 a2 d0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa30]
   5ccf8: 05 00 b9 01 00 00 00 00      	ja +0x1b9 <.text+0x5d9a8>
   5cd00: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cd08: 15 01 2d 00 00 00 00 00      	jeq r1, 0x0, +0x2d <.text+0x5cd58>
   5cd10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cd18: 07 01 00 00 58 f7 ff ff      	add64 r1, -0x8a8
   5cd20: 85 10 00 00 a7 06 00 00      	call 0x6a7
   5cd28: 79 a1 58 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8a8]
   5cd30: 79 a2 60 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8a0]
   5cd38: 05 00 b1 01 00 00 00 00      	ja +0x1b1 <.text+0x5d9a8>
   5cd40: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5cd48: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5cd50: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5cd58: 7b 6a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r6
   5cd60: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5cd68: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5cd70: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5cd78: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5cd80: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   5cd88: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5cd90: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5cd98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cda0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cda8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cdb0: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5cdb8: 85 10 00 00 21 5a 00 00      	call 0x5a21
   5cdc0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5cdc8: 55 01 13 00 00 00 00 00      	jne r1, 0x0, +0x13 <.text+0x5cd48>
   5cdd0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cdd8: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   5cde0: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   5cde8: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5cdf0: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x5cce8>
   5cdf8: 79 a1 48 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b8]
   5ce00: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   5ce08: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <.text+0x5cd00>
   5ce10: 79 a1 50 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b0]
   5ce18: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   5ce20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ce28: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5ce30: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5ce38: 79 a3 f8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb08]
   5ce40: 79 a4 f0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb10]
   5ce48: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   5ce50: 85 10 00 00 0e 47 00 00      	call 0x470e
   5ce58: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5ce60: 15 01 4b 00 00 00 00 00      	jeq r1, 0x0, +0x4b <.text+0x5cfa0>
   5ce68: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5ce70: 05 00 14 00 00 00 00 00      	ja +0x14 <.text+0x5cdf8>
   5ce78: 7b 9a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r9
   5ce80: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5ce88: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ce90: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ce98: 7b 6a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r6
   5cea0: 7b 3a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r3
   5cea8: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5ceb0: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5ceb8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5cec0: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5cec8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5ced0: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5ced8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cee0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cee8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5cef0: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5cef8: 85 10 00 00 f9 59 00 00      	call 0x59f9
   5cf00: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5cf08: 79 a2 30 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d0]
   5cf10: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x5ce08>
   5cf18: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5cf20: 05 00 74 01 00 00 00 00      	ja +0x174 <.text+0x5d9a8>
   5cf28: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5cf30: 7b 2a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r2
   5cf38: 7b 2a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r2
   5cf40: 79 a2 28 f5 00 00 00 00      	ldxdw r2, [r10 - 0xad8]
   5cf48: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x5ce38>
   5cf50: 7b 1a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r1
   5cf58: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cf60: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf68: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <.text+0x5ce60>
   5cf70: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5cf78: 7b 1a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r1
   5cf80: 79 a6 48 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6b8]
   5cf88: 79 a7 50 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6b0]
   5cf90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cf98: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5cfa0: 79 a2 10 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaf0]
   5cfa8: 79 a3 08 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf8]
   5cfb0: 79 a4 00 f5 00 00 00 00      	ldxdw r4, [r10 - 0xb00]
   5cfb8: 85 10 00 00 99 46 00 00      	call 0x4699
   5cfc0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5cfc8: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   5cfd0: 15 08 01 00 00 00 00 00      	jeq r8, 0x0, +0x1 <.text+0x5cec0>
   5cfd8: 7b 7a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r7
   5cfe0: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5cfe8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x5ced8>
   5cff0: 7b 6a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r6
   5cff8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d000: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cef0>
   5d008: 05 00 56 01 00 00 00 00      	ja +0x156 <.text+0x5d9a0>
   5d010: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d018: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   5d020: 15 01 32 00 00 00 00 00      	jeq r1, 0x0, +0x32 <.text+0x5d098>
   5d028: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d030: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d038: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d040: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5d048: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   5d050: 85 10 00 00 11 70 00 00      	call 0x7011
   5d058: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d060: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5cf50>
   5d068: 05 00 4a 01 00 00 00 00      	ja +0x14a <.text+0x5d9a0>
   5d070: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d078: 7b 1a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r1
   5d080: ad 18 01 00 00 00 00 00      	jlt r8, r1, +0x1 <.text+0x5cf70>
   5d088: 05 00 45 00 00 00 00 00      	ja +0x45 <.text+0x5d198>
   5d090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d098: 07 01 00 00 18 f7 ff ff      	add64 r1, -0x8e8
   5d0a0: 85 10 00 00 78 06 00 00      	call 0x678
   5d0a8: 79 a1 18 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8e8]
   5d0b0: 79 a2 20 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8e0]
   5d0b8: 05 00 41 01 00 00 00 00      	ja +0x141 <.text+0x5d9a8>
   5d0c0: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   5d0c8: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   5d0d0: 79 a1 50 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b0]
   5d0d8: 7b 1a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r1
   5d0e0: 79 a4 48 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6b8]
   5d0e8: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5d0f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d0f8: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d100: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d108: 7b 3a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r3
   5d110: 7b 4a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r4
   5d118: 85 10 00 00 6d 46 00 00      	call 0x466d
   5d120: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d128: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d018>
   5d130: 05 00 31 01 00 00 00 00      	ja +0x131 <.text+0x5d9a0>
   5d138: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5d140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d148: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d150: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d158: 7b 3a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r3
   5d160: 85 10 00 00 da 86 00 00      	call 0x86da
   5d168: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5d170: 7b 1a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r1
   5d178: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d180: 15 01 77 00 00 00 00 00      	jeq r1, 0x0, +0x77 <.text+0x5d420>
   5d188: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d190: 79 a2 a0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa60]
   5d198: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5d1a0: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5d1a8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5d1b0: 05 00 4e ff 00 00 00 00      	ja -0xb2 <.text+0x5cb08>
   5d1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d1c0: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5d1c8: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5da0
   5d1d8: 85 10 00 00 34 f4 01 00      	call 0x1f434
   5d1e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d1e8: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5d1f0: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5da0
   5d200: 85 10 00 00 e6 5a ff ff      	call -0xa51a
   5d208: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5d218: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5d220: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5d228: 62 0a 48 f9 ae 02 00 00      	stw [r10 - 0x6b8], 0x2ae
   5d230: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5d238: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5d240: 62 0a c8 f9 86 17 00 00      	stw [r10 - 0x638], 0x1786
   5d248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d250: 07 01 00 00 08 f7 ff ff      	add64 r1, -0x8f8
   5d258: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d260: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5d268: 85 10 00 00 18 7d 02 00      	call 0x27d18
   5d270: 79 a3 10 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8f0]
   5d278: 79 a2 08 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8f8]
   5d280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d288: 07 01 00 00 f8 f6 ff ff      	add64 r1, -0x908
   5d290: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5d298: 85 10 00 00 14 46 ff ff      	call -0xb9ec
   5d2a0: 79 a1 f8 f6 00 00 00 00      	ldxdw r1, [r10 - 0x908]
   5d2a8: 79 a2 00 f7 00 00 00 00      	ldxdw r2, [r10 - 0x900]
   5d2b0: 05 00 02 01 00 00 00 00      	ja +0x102 <.text+0x5d9a8>
   5d2b8: 79 a1 18 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae8]
   5d2c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d2c8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5d2d0: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5d2d8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5d2e0: 85 10 00 00 32 67 ff ff      	call -0x98ce
   5d2e8: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5d2f0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5d2f8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5d300: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5d308: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5d310: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5d318: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d320: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   5d328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d330: 07 01 00 00 48 f7 ff ff      	add64 r1, -0x8b8
   5d338: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5d340: 07 04 00 00 08 f8 ff ff      	add64 r4, -0x7f8
   5d348: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d350: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5d358: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5d360: 85 10 00 00 df f9 ff ff      	call -0x621
   5d368: 79 a1 48 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b8]
   5d370: 55 01 41 00 02 00 00 00      	jne r1, 0x2, +0x41 <.text+0x5d460>
   5d378: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d380: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5d388: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5d390: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d398: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5d3a0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5d2a0>
   5d3a8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5d3b0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d3b8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5d3c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d3c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d3d0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5d3d8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5d2d8>
   5d3e0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5d3e8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d3f0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5d3f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d400: 07 01 00 00 38 f7 ff ff      	add64 r1, -0x8c8
   5d408: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d410: 79 a3 88 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa78]
   5d418: 79 a4 10 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf0]
   5d420: 85 10 00 00 f7 87 00 00      	call 0x87f7
   5d428: 79 a1 38 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8c8]
   5d430: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d320>
   5d438: 05 00 70 00 00 00 00 00      	ja +0x70 <.text+0x5d6a0>
   5d440: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5d448: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5d450: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5d458: 15 01 71 00 00 00 00 00      	jeq r1, 0x0, +0x71 <.text+0x5d6c8>
   5d460: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5d468: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5d358>
   5d470: 05 00 6e 00 00 00 00 00      	ja +0x6e <.text+0x5d6c8>
   5d478: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d480: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   5d488: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5d490: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5d498: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5d4a0: 7b 8a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r8
   5d4a8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5d4b0: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5d4b8: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5d4c0: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5d4c8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5d4d0: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d4d8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5d4e0: 79 a3 c0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa40]
   5d4e8: 07 03 00 00 20 00 00 00      	add64 r3, 0x20
   5d4f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d4f8: 07 01 00 00 28 f7 ff ff      	add64 r1, -0x8d8
   5d500: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d508: 07 02 00 00 38 f8 ff ff      	add64 r2, -0x7c8
   5d510: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5d518: 85 10 00 00 10 63 00 00      	call 0x6310
   5d520: 79 a1 28 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8d8]
   5d528: 15 01 57 00 02 00 00 00      	jeq r1, 0x2, +0x57 <.text+0x5d6c8>
   5d530: 79 a2 30 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d0]
   5d538: 05 00 51 00 00 00 00 00      	ja +0x51 <.text+0x5d6a8>
   5d540: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d548: 15 01 1d 00 00 00 00 00      	jeq r1, 0x0, +0x1d <.text+0x5d518>
   5d550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d558: 07 01 00 00 e8 f6 ff ff      	add64 r1, -0x918
   5d560: 85 10 00 00 1d 05 00 00      	call 0x51d
   5d568: 79 a1 e8 f6 00 00 00 00      	ldxdw r1, [r10 - 0x918]
   5d570: 79 a2 f0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x910]
   5d578: 05 00 a9 00 00 00 00 00      	ja +0xa9 <.text+0x5d9a8>
   5d580: 79 a2 50 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8b0]
   5d588: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5d590: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5d598: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5d5a0: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5d5a8: 79 a1 40 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c0]
   5d5b0: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5d5b8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5d5c0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d5c8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5d5d0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5d4d0>
   5d5d8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5d5e0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d5e8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5d5f0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d5f8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d600: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5d608: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5d508>
   5d610: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5d618: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5d620: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5d628: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5d630: 05 00 7c fd 00 00 00 00      	ja -0x284 <.text+0x5c0f8>
   5d638: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5d640: 15 01 96 00 00 00 00 00      	jeq r1, 0x0, +0x96 <.text+0x5d9d8>
   5d648: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d650: 79 18 58 00 00 00 00 00      	ldxdw r8, [r1 + 0x58]
   5d658: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5d660: 2d 81 01 00 00 00 00 00      	jgt r1, r8, +0x1 <.text+0x5d550>
   5d668: 05 00 b1 00 00 00 00 00      	ja +0xb1 <.text+0x5dad8>
   5d670: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d678: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5d680: 7b 2a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r2
   5d688: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5d690: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5d698: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5d6a0: 7b 2a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r2
   5d6a8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5d6b0: 7b 2a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r2
   5d6b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5d6c0: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5d6c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5d6d0: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5d6d8: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d6e0: 71 11 a2 00 00 00 00 00      	ldxb r1, [r1 + 0xa2]
   5d6e8: 15 01 ce 00 00 00 00 00      	jeq r1, 0x0, +0xce <.text+0x5dc40>
   5d6f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d6f8: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5d700: 18 02 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f40
   5d710: 85 10 00 00 8d f3 01 00      	call 0x1f38d
   5d718: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d720: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5d728: 18 02 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5f40
   5d738: 85 10 00 00 3f 5a ff ff      	call -0xa5c1
   5d740: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5d750: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5d758: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5d760: 62 0a 48 f9 57 02 00 00      	stw [r10 - 0x6b8], 0x257
   5d768: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5d770: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5d778: 62 0a c8 f9 85 17 00 00      	stw [r10 - 0x638], 0x1785
   5d780: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d788: 07 01 00 00 f8 f5 ff ff      	add64 r1, -0xa08
   5d790: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d798: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5d7a0: 85 10 00 00 71 7c 02 00      	call 0x27c71
   5d7a8: 79 a2 00 f6 00 00 00 00      	ldxdw r2, [r10 - 0xa00]
   5d7b0: 79 a1 f8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa08]
   5d7b8: 05 00 61 00 00 00 00 00      	ja +0x61 <.text+0x5d9a8>
   5d7c0: 79 a2 40 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c0]
   5d7c8: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5d7d0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5d7d8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5d7e0: 05 00 5f 00 00 00 00 00      	ja +0x5f <.text+0x5d9c0>
   5d7e8: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5d7f0: 1f 18 00 00 00 00 00 00      	sub64 r8, r1
   5d7f8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5d800: 7b 1a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r1
   5d808: 79 a1 e0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb20]
   5d810: 7b 1a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r1
   5d818: 79 a1 e8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb18]
   5d820: 7b 1a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r1
   5d828: 79 a5 00 f5 00 00 00 00      	ldxdw r5, [r10 - 0xb00]
   5d830: 7b 5a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r5
   5d838: 79 a4 08 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf8]
   5d840: 7b 4a d0 f8 00 00 00 00      	stxdw [r10 - 0x730], r4
   5d848: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   5d850: 7b 1a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r1
   5d858: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5d860: 7b 1a 08 f9 00 00 00 00      	stxdw [r10 - 0x6f8], r1
   5d868: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   5d870: 7b 1a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r1
   5d878: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   5d880: 7b 1a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r1
   5d888: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d890: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5d898: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5d8a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d8a8: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d8b0: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d8b8: 85 10 00 00 63 88 00 00      	call 0x8863
   5d8c0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d8c8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d7b8>
   5d8d0: 05 00 3d 00 00 00 00 00      	ja +0x3d <.text+0x5d9a0>
   5d8d8: 79 a6 38 f9 00 00 00 00      	ldxdw r6, [r10 - 0x6c8]
   5d8e0: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   5d8e8: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5d8f0: 15 01 13 00 00 00 00 00      	jeq r1, 0x0, +0x13 <.text+0x5d870>
   5d8f8: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5d900: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   5d908: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d910: 79 a2 f8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb08]
   5d918: 7b 21 98 00 00 00 00 00      	stxdw [r1 + 0x98], r2
   5d920: 7b 1a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r1
   5d928: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5d930: 7b 21 90 00 00 00 00 00      	stxdw [r1 + 0x90], r2
   5d938: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5d940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d948: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d950: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5d958: 79 a4 f0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb10]
   5d960: 79 a5 d0 f4 00 00 00 00      	ldxdw r5, [r10 - 0xb30]
   5d968: 85 10 00 00 4d 88 00 00      	call 0x884d
   5d970: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5d978: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d868>
   5d980: 05 00 27 00 00 00 00 00      	ja +0x27 <.text+0x5d9a0>
   5d988: 79 a9 38 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6c8]
   5d990: bf 67 00 00 00 00 00 00      	mov64 r7, r6
   5d998: 0f 97 00 00 00 00 00 00      	add64 r7, r9
   5d9a0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5d9a8: ad 67 01 00 00 00 00 00      	jlt r7, r6, +0x1 <.text+0x5d898>
   5d9b0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5d9b8: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5d9c0: 55 01 bd 00 00 00 00 00      	jne r1, 0x0, +0xbd <.text+0x5de90>
   5d9c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d9d0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5d9d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d9e0: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5d9e8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5d9f0: 85 10 00 00 dd 6e 00 00      	call 0x6edd
   5d9f8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5da00: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d8f0>
   5da08: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x5d9a0>
   5da10: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5da18: 7b 1a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r1
   5da20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da28: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5da30: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5da38: 07 02 00 00 e8 f7 ff ff      	add64 r2, -0x818
   5da40: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   5da48: 85 10 00 00 d2 6e 00 00      	call 0x6ed2
   5da50: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5da58: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5d948>
   5da60: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0x5d9a0>
   5da68: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5da70: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   5da78: 7b 2a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r2
   5da80: ad 21 01 00 00 00 00 00      	jlt r1, r2, +0x1 <.text+0x5d970>
   5da88: 05 00 ed 00 00 00 00 00      	ja +0xed <.text+0x5e0d8>
   5da90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da98: 07 01 00 00 28 f6 ff ff      	add64 r1, -0x9d8
   5daa0: 85 10 00 00 ba 05 00 00      	call 0x5ba
   5daa8: 79 a1 28 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9d8]
   5dab0: 79 a2 30 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9d0]
   5dab8: 05 00 01 00 00 00 00 00      	ja +0x1 <.text+0x5d9a8>
   5dac0: 79 a2 38 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c8]
   5dac8: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5dad0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5dad8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5dae0: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5dae8: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5daf0: 05 00 e4 fc 00 00 00 00      	ja -0x31c <.text+0x5c0f8>
   5daf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db00: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5db08: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e34
   5db18: 85 10 00 00 0c f3 01 00      	call 0x1f30c
   5db20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db28: 07 01 00 00 68 f9 ff ff      	add64 r1, -0x698
   5db30: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e34
   5db40: 85 10 00 00 be 59 ff ff      	call -0xa642
   5db48: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6e9f
   5db58: 7b 1a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r1
   5db60: 72 0a 80 f9 02 00 00 00      	stb [r10 - 0x680], 0x2
   5db68: 62 0a 48 f9 4e 02 00 00      	stw [r10 - 0x6b8], 0x24e
   5db70: 7a 0a 40 f9 29 00 00 00      	stdw [r10 - 0x6c0], 0x29
   5db78: 7a 0a 30 f9 00 00 00 00      	stdw [r10 - 0x6d0], 0x0
   5db80: 62 0a c8 f9 84 17 00 00      	stw [r10 - 0x638], 0x1784
   5db88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db90: 07 01 00 00 e8 f5 ff ff      	add64 r1, -0xa18
   5db98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5dba0: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5dba8: 85 10 00 00 f0 7b 02 00      	call 0x27bf0
   5dbb0: 79 a3 f0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa10]
   5dbb8: 79 a2 e8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa18]
   5dbc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dbc8: 07 01 00 00 d8 f5 ff ff      	add64 r1, -0xa28
   5dbd0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   5dbd8: 85 10 00 00 ec 44 ff ff      	call -0xbb14
   5dbe0: 79 a1 d8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa28]
   5dbe8: 79 a2 e0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa20]
   5dbf0: 05 00 da ff 00 00 00 00      	ja -0x26 <.text+0x5d9a8>
   5dbf8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc00: 7b 1a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r1
   5dc08: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc10: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   5dc18: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   5dc20: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   5dc28: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   5dc30: 7b 2a 90 f5 00 00 00 00      	stxdw [r10 - 0xa70], r2
   5dc38: ad 32 01 00 00 00 00 00      	jlt r2, r3, +0x1 <.text+0x5db28>
   5dc40: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dc48: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   5dc50: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5db40>
   5dc58: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x5db70>
   5dc60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc68: 07 01 00 00 08 f6 ff ff      	add64 r1, -0x9f8
   5dc70: 85 10 00 00 7c 04 00 00      	call 0x47c
   5dc78: 79 a1 10 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9f0]
   5dc80: 79 a2 08 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f8]
   5dc88: 05 00 81 00 00 00 00 00      	ja +0x81 <.text+0x5df78>
   5dc90: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5dc98: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5dca0: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5dca8: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <.text+0x5db98>
   5dcb0: 05 00 69 00 00 00 00 00      	ja +0x69 <.text+0x5dee0>
   5dcb8: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5dcc0: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5dcc8: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5dcd0: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5dcd8: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5dce0: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   5dce8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5dcf0: 79 a1 20 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae0]
   5dcf8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5dd00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd08: 07 01 00 00 c8 f6 ff ff      	add64 r1, -0x938
   5dd10: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5dd18: 07 04 00 00 38 f8 ff ff      	add64 r4, -0x7c8
   5dd20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5dd28: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5dd30: 79 a3 80 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa80]
   5dd38: 85 10 00 00 a4 f8 ff ff      	call -0x75c
   5dd40: 79 a1 d0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x930]
   5dd48: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   5dd50: 15 02 5f 00 02 00 00 00      	jeq r2, 0x2, +0x5f <.text+0x5df30>
   5dd58: 05 00 67 00 00 00 00 00      	ja +0x67 <.text+0x5df78>
   5dd60: 79 a2 d8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb28]
   5dd68: 07 02 00 00 88 02 00 00      	add64 r2, 0x288
   5dd70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd78: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5dd80: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5dd88: 85 10 00 00 1d ab 02 00      	call 0x2ab1d
   5dd90: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5dd98: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5dda0: 15 00 29 ff 00 00 00 00      	jeq r0, 0x0, -0xd7 <.text+0x5d5d0>
   5dda8: 79 a2 d8 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb28]
   5ddb0: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5ddb8: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5ddc0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   5ddc8: 79 a1 f0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb10]
   5ddd0: 7b 1a 30 f0 00 00 00 00      	stxdw [r10 - 0xfd0], r1
   5ddd8: 7b 9a 38 f0 00 00 00 00      	stxdw [r10 - 0xfc8], r9
   5dde0: 79 a1 f8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb08]
   5dde8: 7b 1a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r1
   5ddf0: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5ddf8: 7b 1a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r1
   5de00: 79 a1 30 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad0]
   5de08: 7b 1a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r1
   5de10: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5de18: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   5de20: 7b 6a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r6
   5de28: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5de30: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5de38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5de40: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5de48: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5de50: 79 a4 68 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa98]
   5de58: 85 10 00 00 fc f3 ff ff      	call -0xc04
   5de60: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5de68: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5de70: 79 a3 30 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d0]
   5de78: 15 03 89 ff 02 00 00 00      	jeq r3, 0x2, -0x77 <.text+0x5d9a8>
   5de80: 79 a4 70 f9 00 00 00 00      	ldxdw r4, [r10 - 0x690]
   5de88: 7b 4a 20 f9 00 00 00 00      	stxdw [r10 - 0x6e0], r4
   5de90: 79 a4 78 f9 00 00 00 00      	ldxdw r4, [r10 - 0x688]
   5de98: 7b 4a 28 f9 00 00 00 00      	stxdw [r10 - 0x6d8], r4
   5dea0: 79 a4 90 f9 00 00 00 00      	ldxdw r4, [r10 - 0x670]
   5dea8: 7b 4a 10 f9 00 00 00 00      	stxdw [r10 - 0x6f0], r4
   5deb0: 79 a4 98 f9 00 00 00 00      	ldxdw r4, [r10 - 0x668]
   5deb8: 7b 4a 18 f9 00 00 00 00      	stxdw [r10 - 0x6e8], r4
   5dec0: 79 a4 88 f9 00 00 00 00      	ldxdw r4, [r10 - 0x678]
   5dec8: 7b 4a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r4
   5ded0: 79 a4 80 f9 00 00 00 00      	ldxdw r4, [r10 - 0x680]
   5ded8: 7b 4a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r4
   5dee0: 79 a4 68 f9 00 00 00 00      	ldxdw r4, [r10 - 0x698]
   5dee8: 7b 4a d0 f4 00 00 00 00      	stxdw [r10 - 0xb30], r4
   5def0: 79 a4 60 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6a0]
   5def8: 7b 4a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r4
   5df00: 15 03 1b 00 00 00 00 00      	jeq r3, 0x0, +0x1b <.text+0x5dec0>
   5df08: 79 a3 58 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6a8]
   5df10: 7b 3a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r3
   5df18: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   5df20: 7b 3a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r3
   5df28: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5df30: 7b 3a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r3
   5df38: 79 a3 28 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d8]
   5df40: 7b 3a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r3
   5df48: 79 a3 20 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e0]
   5df50: 7b 3a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r3
   5df58: 79 a3 18 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e8]
   5df60: 7b 3a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r3
   5df68: 79 a3 10 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f0]
   5df70: 7b 3a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r3
   5df78: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5df80: 7b 3a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r3
   5df88: 7b 2a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r2
   5df90: 7b 1a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r1
   5df98: 7b 8a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r8
   5dfa0: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5dfa8: 05 00 8c ff 00 00 00 00      	ja -0x74 <.text+0x5daf0>
   5dfb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfb8: 07 01 00 00 18 f6 ff ff      	add64 r1, -0x9e8
   5dfc0: 85 10 00 00 d5 04 00 00      	call 0x4d5
   5dfc8: 79 a1 18 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9e8]
   5dfd0: 79 a2 20 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9e0]
   5dfd8: 05 00 5d ff 00 00 00 00      	ja -0xa3 <.text+0x5d9a8>
   5dfe0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   5dfe8: 7b 1a 68 f5 00 00 00 00      	stxdw [r10 - 0xa98], r1
   5dff0: 7b 8a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r8
   5dff8: 05 00 82 ff 00 00 00 00      	ja -0x7e <.text+0x5daf0>
   5e000: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   5e008: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e010: 07 01 00 00 d8 f6 ff ff      	add64 r1, -0x928
   5e018: 79 a3 b0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa50]
   5e020: 79 a4 50 f5 00 00 00 00      	ldxdw r4, [r10 - 0xab0]
   5e028: 79 a5 88 f5 00 00 00 00      	ldxdw r5, [r10 - 0xa78]
   5e030: 85 10 00 00 ec 5f 00 00      	call 0x5fec
   5e038: 79 a1 e0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x920]
   5e040: 79 a2 d8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x928]
   5e048: 55 02 09 00 02 00 00 00      	jne r2, 0x2, +0x9 <.text+0x5df78>
   5e050: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e058: 07 01 00 00 b8 f6 ff ff      	add64 r1, -0x948
   5e060: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5e068: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   5e070: 79 a4 10 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaf0]
   5e078: 85 10 00 00 6e 85 00 00      	call 0x856e
   5e080: 79 a1 c0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x940]
   5e088: 79 a2 b8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x948]
   5e090: 15 02 04 00 02 00 00 00      	jeq r2, 0x2, +0x4 <.text+0x5df98>
   5e098: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5e0a0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   5e0a8: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   5e0b0: 05 00 45 ff 00 00 00 00      	ja -0xbb <.text+0x5d9c0>
   5e0b8: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5e0c0: 55 01 0d 00 00 00 00 00      	jne r1, 0x0, +0xd <.text+0x5e010>
   5e0c8: 79 a8 88 f5 00 00 00 00      	ldxdw r8, [r10 - 0xa78]
   5e0d0: 1f 98 00 00 00 00 00 00      	sub64 r8, r9
   5e0d8: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5e0e0: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   5e0e8: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5e0f0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5e0f8: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   5e100: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5e108: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   5e110: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5e118: 79 a1 d8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb28]
   5e120: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5e128: 05 00 db fe 00 00 00 00      	ja -0x125 <.text+0x5d6e8>
   5e130: 79 a1 b8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa48]
   5e138: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   5e140: 79 a2 58 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa8]
   5e148: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5e150: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5e158: 79 a3 90 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa70]
   5e160: 7b 3a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r3
   5e168: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5e170: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5e178: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5e180: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e188: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e190: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e198: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1a8: 07 01 00 00 a8 f6 ff ff      	add64 r1, -0x958
   5e1b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e1b8: 07 02 00 00 08 f8 ff ff      	add64 r2, -0x7f8
   5e1c0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e1c8: 79 a3 30 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad0]
   5e1d0: 85 10 00 00 cf 69 00 00      	call 0x69cf
   5e1d8: 79 a1 b0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x950]
   5e1e0: 79 a2 a8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x958]
   5e1e8: 15 02 db ff 02 00 00 00      	jeq r2, 0x2, -0x25 <.text+0x5dfa8>
   5e1f0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x5df78>
   5e1f8: 79 a1 28 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad8]
   5e200: 55 01 1a 00 00 00 00 00      	jne r1, 0x0, +0x1a <.text+0x5e1b8>
   5e208: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5e210: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e218: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e220: 55 01 32 00 00 00 00 00      	jne r1, 0x0, +0x32 <.text+0x5e298>
   5e228: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5e230: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e238: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e240: 15 01 2e 00 00 00 00 00      	jeq r1, 0x0, +0x2e <.text+0x5e298>
   5e248: 79 a1 78 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa88]
   5e250: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <.text+0x5e298>
   5e258: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   5e260: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e268: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e270: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5e278: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e280: 85 10 00 00 3e 65 ff ff      	call -0x9ac2
   5e288: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e290: 07 01 00 00 78 f6 ff ff      	add64 r1, -0x988
   5e298: 79 a2 50 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab0]
   5e2a0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e2a8: 79 a4 90 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa70]
   5e2b0: 85 10 00 00 60 70 00 00      	call 0x7060
   5e2b8: 79 a1 78 f6 00 00 00 00      	ldxdw r1, [r10 - 0x988]
   5e2c0: 15 01 1e 00 02 00 00 00      	jeq r1, 0x2, +0x1e <.text+0x5e298>
   5e2c8: 79 a2 80 f6 00 00 00 00      	ldxdw r2, [r10 - 0x980]
   5e2d0: 05 00 9e fe 00 00 00 00      	ja -0x162 <.text+0x5d6a8>
   5e2d8: 79 a1 70 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa90]
   5e2e0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5e2e8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5e2f0: 15 01 08 01 00 00 00 00      	jeq r1, 0x0, +0x108 <.text+0x5ea18>
   5e2f8: 79 a2 40 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac0]
   5e300: 71 21 30 00 00 00 00 00      	ldxb r1, [r2 + 0x30]
   5e308: 79 22 58 00 00 00 00 00      	ldxdw r2, [r2 + 0x58]
   5e310: 7b 7a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r7
   5e318: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5e320: 07 03 00 00 88 f8 ff ff      	add64 r3, -0x778
   5e328: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   5e330: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e338: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e340: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e348: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e350: 79 a3 c0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa40]
   5e358: 07 03 00 00 20 00 00 00      	add64 r3, 0x20
   5e360: 79 a4 b8 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa48]
   5e368: 07 04 00 00 38 00 00 00      	add64 r4, 0x38
   5e370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e378: 07 01 00 00 88 f6 ff ff      	add64 r1, -0x978
   5e380: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e388: 07 02 00 00 38 f8 ff ff      	add64 r2, -0x7c8
   5e390: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e398: 85 10 00 00 a4 6b 00 00      	call 0x6ba4
   5e3a0: 79 a1 88 f6 00 00 00 00      	ldxdw r1, [r10 - 0x978]
   5e3a8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x5e298>
   5e3b0: 05 00 fb 00 00 00 00 00      	ja +0xfb <.text+0x5ea70>
   5e3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e3c0: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5e3c8: 85 10 00 00 ad 84 02 00      	call 0x284ad
   5e3d0: 79 a1 30 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d0]
   5e3d8: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x5e330>
   5e3e0: 79 a1 38 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6c8]
   5e3e8: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5e3f0: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5e3f8: 7b 3a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r3
   5e400: 7b 2a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r2
   5e408: 7b 1a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r1
   5e410: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e418: 07 01 00 00 68 f6 ff ff      	add64 r1, -0x998
   5e420: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e428: 07 02 00 00 30 f9 ff ff      	add64 r2, -0x6d0
   5e430: 85 10 00 00 f0 7a 02 00      	call 0x27af0
   5e438: 79 a1 68 f6 00 00 00 00      	ldxdw r1, [r10 - 0x998]
   5e440: 79 a2 70 f6 00 00 00 00      	ldxdw r2, [r10 - 0x990]
   5e448: 05 00 cf fe 00 00 00 00      	ja -0x131 <.text+0x5d9a8>
   5e450: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   5e458: 79 a2 30 f5 00 00 00 00      	ldxdw r2, [r10 - 0xad0]
   5e460: 1f 21 00 00 00 00 00 00      	sub64 r1, r2
   5e468: 79 a3 98 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa68]
   5e470: 67 03 00 00 20 00 00 00      	lsh64 r3, 0x20
   5e478: 77 03 00 00 20 00 00 00      	rsh64 r3, 0x20
   5e480: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e488: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0x5e378>
   5e490: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5e498: 79 a9 58 f9 00 00 00 00      	ldxdw r9, [r10 - 0x6a8]
   5e4a0: 79 a6 b8 f5 00 00 00 00      	ldxdw r6, [r10 - 0xa48]
   5e4a8: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   5e4b0: 7a 0a b8 fd 00 00 00 00      	stdw [r10 - 0x248], 0x0
   5e4b8: 7a 0a b0 fd 00 00 00 00      	stdw [r10 - 0x250], 0x0
   5e4c0: 7a 0a a8 fd 00 00 00 00      	stdw [r10 - 0x258], 0x0
   5e4c8: 7a 0a a0 fd 00 00 00 00      	stdw [r10 - 0x260], 0x0
   5e4d0: 7a 0a c0 fd 00 00 00 00      	stdw [r10 - 0x240], 0x0
   5e4d8: 7a 0a c8 fd 00 00 00 00      	stdw [r10 - 0x238], 0x0
   5e4e0: 7a 0a d0 fd 00 00 00 00      	stdw [r10 - 0x230], 0x0
   5e4e8: 7a 0a d8 fd 00 00 00 00      	stdw [r10 - 0x228], 0x0
   5e4f0: 7a 0a e0 fd 00 00 00 00      	stdw [r10 - 0x220], 0x0
   5e4f8: 7a 0a e8 fd 00 00 00 00      	stdw [r10 - 0x218], 0x0
   5e500: 7a 0a f0 fd 00 00 00 00      	stdw [r10 - 0x210], 0x0
   5e508: 7a 0a f8 fd 00 00 00 00      	stdw [r10 - 0x208], 0x0
   5e510: 6a 0a 00 fe 00 00 00 00      	sth [r10 - 0x200], 0x0
   5e518: 79 64 18 00 00 00 00 00      	ldxdw r4, [r6 + 0x18]
   5e520: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e528: 79 45 18 00 00 00 00 00      	ldxdw r5, [r4 + 0x18]
   5e530: 7b 5a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r5
   5e538: 79 45 10 00 00 00 00 00      	ldxdw r5, [r4 + 0x10]
   5e540: 7b 5a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r5
   5e548: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5e550: 7b 5a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r5
   5e558: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e560: 7b 4a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r4
   5e568: 79 a4 58 f5 00 00 00 00      	ldxdw r4, [r10 - 0xaa8]
   5e570: 79 44 58 00 00 00 00 00      	ldxdw r4, [r4 + 0x58]
   5e578: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e580: 79 45 18 00 00 00 00 00      	ldxdw r5, [r4 + 0x18]
   5e588: 7b 5a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r5
   5e590: 79 45 10 00 00 00 00 00      	ldxdw r5, [r4 + 0x10]
   5e598: 7b 5a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r5
   5e5a0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5e5a8: 7b 5a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r5
   5e5b0: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5e5b8: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   5e5c0: 18 04 00 00 c8 6e 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b6ec8
   5e5d0: 7b 4a 40 f0 00 00 00 00      	stxdw [r10 - 0xfc0], r4
   5e5d8: 7b 8a 38 f0 00 00 00 00      	stxdw [r10 - 0xfc8], r8
   5e5e0: 7b 1a 30 f0 00 00 00 00      	stxdw [r10 - 0xfd0], r1
   5e5e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e5f0: 07 01 00 00 d0 f8 ff ff      	add64 r1, -0x730
   5e5f8: 7b 1a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r1
   5e600: 79 a1 10 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf0]
   5e608: 7b 1a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r1
   5e610: 79 a1 88 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa78]
   5e618: 7b 1a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r1
   5e620: 7b 2a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r2
   5e628: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e630: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5e638: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5e640: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e648: 07 01 00 00 68 fb ff ff      	add64 r1, -0x498
   5e650: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e658: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
   5e660: 7b 9a 50 f0 00 00 00 00      	stxdw [r10 - 0xfb0], r9
   5e668: 7a 0a 48 f0 0e 00 00 00      	stdw [r10 - 0xfb8], 0xe
   5e670: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e678: 07 07 00 00 30 f9 ff ff      	add64 r7, -0x6d0
   5e680: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e688: 07 04 00 00 a0 fd ff ff      	add64 r4, -0x260
   5e690: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e698: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e6a0: 79 a2 48 f5 00 00 00 00      	ldxdw r2, [r10 - 0xab8]
   5e6a8: 85 10 00 00 a4 5a 00 00      	call 0x5aa4
   5e6b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6b8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5e6c0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e6c8: 85 10 00 00 bc 07 02 00      	call 0x207bc
   5e6d0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5e6d8: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5e6e0: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5e6e8: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5e6f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6f8: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5e700: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e708: 85 10 00 00 bd 83 02 00      	call 0x283bd
   5e710: 07 06 00 00 60 00 00 00      	add64 r6, 0x60
   5e718: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5e720: 07 08 00 00 d8 fa ff ff      	add64 r8, -0x528
   5e728: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5e730: 7b 6a b8 f5 00 00 00 00      	stxdw [r10 - 0xa48], r6
   5e738: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5e740: 85 10 00 00 a6 64 ff ff      	call -0x9b5a
   5e748: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e750: 07 01 00 00 08 fb ff ff      	add64 r1, -0x4f8
   5e758: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e760: 85 10 00 00 a9 07 02 00      	call 0x207a9
   5e768: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b64bf
   5e778: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b64bf
   5e788: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5e790: 7b 2a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r2
   5e798: 7b 1a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r1
   5e7a0: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   5e7a8: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5e7b0: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5e7b8: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   5e7c0: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   5e7c8: 79 a2 18 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4e8]
   5e7d0: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   5e7d8: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5e7e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e7e8: 07 01 00 00 80 fc ff ff      	add64 r1, -0x380
   5e7f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e7f8: 07 02 00 00 20 fb ff ff      	add64 r2, -0x4e0
   5e800: 85 10 00 00 5c 68 ff ff      	call -0x97a4
   5e808: 79 a7 88 fc 00 00 00 00      	ldxdw r7, [r10 - 0x378]
   5e810: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   5e818: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5e820: b7 01 00 00 22 00 00 00      	mov64 r1, 0x22
   5e828: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5e830: 85 10 00 00 91 5d ff ff      	call -0xa26f
   5e838: 79 a1 d8 fa 00 00 00 00      	ldxdw r1, [r10 - 0x528]
   5e840: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5e848: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5e850: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5e858: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e860: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   5e868: 7b 40 08 00 00 00 00 00      	stxdw [r0 + 0x8], r4
   5e870: 7b 30 10 00 00 00 00 00      	stxdw [r0 + 0x10], r3
   5e878: 7b 20 18 00 00 00 00 00      	stxdw [r0 + 0x18], r2
   5e880: 6a 00 20 00 01 00 00 00      	sth [r0 + 0x20], 0x1
   5e888: 7b 0a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r0
   5e890: 7a 0a c0 fc 01 00 00 00      	stdw [r10 - 0x340], 0x1
   5e898: 7a 0a d0 fc 01 00 00 00      	stdw [r10 - 0x330], 0x1
   5e8a0: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5e8a8: 07 06 00 00 a0 fd ff ff      	add64 r6, -0x260
   5e8b0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e8b8: 07 05 00 00 c0 fc ff ff      	add64 r5, -0x340
   5e8c0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5e8c8: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   5e8d8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e8e0: 79 a4 88 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa78]
   5e8e8: 85 10 00 00 fe 91 02 00      	call 0x291fe
   5e8f0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5e8f8: 07 07 00 00 c0 fc ff ff      	add64 r7, -0x340
   5e900: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5e908: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5e910: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5e918: 85 10 00 00 9e a9 02 00      	call 0x2a99e
   5e920: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e928: 07 01 00 00 68 fb ff ff      	add64 r1, -0x498
   5e930: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   5e938: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e940: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   5e948: 7b 1a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r1
   5e950: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6807
   5e960: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   5e968: 79 a1 a8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa58]
   5e970: 73 1a 88 ff 00 00 00 00      	stxb [r10 - 0x78], r1
   5e978: 7a 0a 60 ff 02 00 00 00      	stdw [r10 - 0xa0], 0x2
   5e980: 7a 0a 80 fb 01 00 00 00      	stdw [r10 - 0x480], 0x1
   5e988: 7a 0a 70 fb 11 00 00 00      	stdw [r10 - 0x490], 0x11
   5e990: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e998: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   5e9a0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5e9a8: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   5e9b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e9b8: 07 01 00 00 50 fb ff ff      	add64 r1, -0x4b0
   5e9c0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5e9c8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5e9d0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5e9d8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5e9e0: 85 10 00 00 69 83 02 00      	call 0x28369
   5e9e8: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5e9f8: 79 a2 50 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4b0]
   5ea00: 1d 12 01 00 00 00 00 00      	jeq r2, r1, +0x1 <.text+0x5e8f0>
   5ea08: 05 00 32 00 00 00 00 00      	ja +0x32 <.text+0x5ea80>
   5ea10: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5ea18: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   5ea20: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5ea28: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ea30: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5ea38: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5e938>
   5ea40: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ea48: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ea50: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ea58: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ea60: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ea68: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ea70: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5e970>
   5ea78: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ea80: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ea88: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5ea90: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5ea98: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5eaa0: 15 01 38 00 00 00 00 00      	jeq r1, 0x0, +0x38 <.text+0x5eb48>
   5eaa8: 79 a1 98 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa68]
   5eab0: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   5eab8: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   5eac0: 15 01 35 01 00 00 00 00      	jeq r1, 0x0, +0x135 <.text+0x5f350>
   5eac8: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5ead0: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5ead8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5eae0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5eae8: 7b 2a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r2
   5eaf0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5eaf8: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   5eb00: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5eb08: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   5eb10: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5eb18: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   5eb20: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5eb28: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   5eb30: 05 00 33 01 00 00 00 00      	ja +0x133 <.text+0x5f3b0>
   5eb38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eb40: 07 01 00 00 98 f6 ff ff      	add64 r1, -0x968
   5eb48: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5eb50: 79 a3 a8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa58]
   5eb58: 79 a4 50 f5 00 00 00 00      	ldxdw r4, [r10 - 0xab0]
   5eb60: bf 75 00 00 00 00 00 00      	mov64 r5, r7
   5eb68: 85 10 00 00 7d f4 ff ff      	call -0xb83
   5eb70: 79 a1 98 f6 00 00 00 00      	ldxdw r1, [r10 - 0x968]
   5eb78: 15 01 d1 fe 02 00 00 00      	jeq r1, 0x2, -0x12f <.text+0x5e0e8>
   5eb80: 79 a2 a0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x960]
   5eb88: 05 00 87 fd 00 00 00 00      	ja -0x279 <.text+0x5d6a8>
   5eb90: 79 a2 90 f6 00 00 00 00      	ldxdw r2, [r10 - 0x970]
   5eb98: 05 00 85 fd 00 00 00 00      	ja -0x27b <.text+0x5d6a8>
   5eba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eba8: 07 01 00 00 58 f6 ff ff      	add64 r1, -0x9a8
   5ebb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ebb8: 07 02 00 00 50 fb ff ff      	add64 r2, -0x4b0
   5ebc0: 85 10 00 00 fe 79 02 00      	call 0x279fe
   5ebc8: 79 a1 58 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9a8]
   5ebd0: 79 a2 60 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9a0]
   5ebd8: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5ebe0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5ebe8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5ebf0: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5ebf8: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5ec00: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   5ec08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5ec10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ec18: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5ec20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5eb20>
   5ec28: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ec30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ec38: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5ec40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ec48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5ec50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5ec58: 55 02 39 fd 00 00 00 00      	jne r2, 0x0, -0x2c7 <.text+0x5d508>
   5ec60: 05 00 35 fd 00 00 00 00      	ja -0x2cb <.text+0x5d4f0>
   5ec68: 79 a3 50 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab0]
   5ec70: 72 03 a1 00 01 00 00 00      	stb [r3 + 0xa1], 0x1
   5ec78: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   5ec80: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5ec88: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ec90: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ec98: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   5eca0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5eca8: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   5ecb0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ecb8: 7b 2a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r2
   5ecc0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ecc8: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   5ecd0: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   5ecd8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ece0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ece8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ecf0: 7b 2a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r2
   5ecf8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ed00: 7b 2a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r2
   5ed08: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ed10: 7b 2a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r2
   5ed18: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ed20: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   5ed28: 7b 3a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r3
   5ed30: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5ed38: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ed40: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ed48: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   5ed50: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ed58: 7b 2a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r2
   5ed60: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ed68: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   5ed70: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ed78: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   5ed80: 79 a2 60 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa0]
   5ed88: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5ed90: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   5ed98: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5eda0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   5eda8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5edb0: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   5edb8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5edc0: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   5edc8: 7b 9a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r9
   5edd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5edd8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5ede0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5ede8: 07 07 00 00 68 fb ff ff      	add64 r7, -0x498
   5edf0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5edf8: 85 10 00 00 7d 09 02 00      	call 0x2097d
   5ee00: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5ee08: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   5ee10: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5ee18: 7b 1a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r1
   5ee20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee28: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   5ee30: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ee38: 85 10 00 00 d7 82 02 00      	call 0x282d7
   5ee40: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5ee48: 07 08 00 00 f0 fb ff ff      	add64 r8, -0x410
   5ee50: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5ee58: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5ee60: 85 10 00 00 c2 63 ff ff      	call -0x9c3e
   5ee68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee70: 07 01 00 00 20 fc ff ff      	add64 r1, -0x3e0
   5ee78: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5ee80: 85 10 00 00 6c 09 02 00      	call 0x2096c
   5ee88: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b64bf
   5ee98: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b64bf
   5eea8: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5eeb0: 7b 2a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r2
   5eeb8: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   5eec0: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5eec8: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   5eed0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   5eed8: 7b 1a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r1
   5eee0: 7b 1a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r1
   5eee8: 79 a2 30 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d0]
   5eef0: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   5eef8: 7b 1a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r1
   5ef00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ef08: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   5ef10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ef18: 07 02 00 00 38 fc ff ff      	add64 r2, -0x3c8
   5ef20: 85 10 00 00 78 67 ff ff      	call -0x9888
   5ef28: 79 a7 60 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa0]
   5ef30: 79 a1 68 ff 00 00 00 00      	ldxdw r1, [r10 - 0x98]
   5ef38: 7b 1a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r1
   5ef40: b7 01 00 00 22 00 00 00      	mov64 r1, 0x22
   5ef48: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5ef50: 85 10 00 00 ad 5c ff ff      	call -0xa353
   5ef58: 79 a1 f0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x410]
   5ef60: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ef68: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5ef70: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ef78: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ef80: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   5ef88: 7b 40 08 00 00 00 00 00      	stxdw [r0 + 0x8], r4
   5ef90: 7b 30 10 00 00 00 00 00      	stxdw [r0 + 0x10], r3
   5ef98: 7b 20 18 00 00 00 00 00      	stxdw [r0 + 0x18], r2
   5efa0: 6a 00 20 00 01 00 00 00      	sth [r0 + 0x20], 0x1
   5efa8: 7b 0a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r0
   5efb0: 7a 0a c0 fc 01 00 00 00      	stdw [r10 - 0x340], 0x1
   5efb8: 7a 0a d0 fc 01 00 00 00      	stdw [r10 - 0x330], 0x1
   5efc0: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5efc8: 07 06 00 00 a0 fd ff ff      	add64 r6, -0x260
   5efd0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5efd8: 07 05 00 00 c0 fc ff ff      	add64 r5, -0x340
   5efe0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5efe8: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   5eff8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5f000: 79 a4 88 f5 00 00 00 00      	ldxdw r4, [r10 - 0xa78]
   5f008: 85 10 00 00 1a 91 02 00      	call 0x2911a
   5f010: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f018: 07 07 00 00 c0 fc ff ff      	add64 r7, -0x340
   5f020: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f028: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5f030: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5f038: 85 10 00 00 ba a8 02 00      	call 0x2a8ba
   5f040: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f048: 07 01 00 00 80 fc ff ff      	add64 r1, -0x380
   5f050: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   5f058: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f060: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   5f068: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   5f070: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6807
   5f080: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5f088: 79 a1 a8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa58]
   5f090: 73 1a a8 fe 00 00 00 00      	stxb [r10 - 0x158], r1
   5f098: 7a 0a 90 ff 02 00 00 00      	stdw [r10 - 0x70], 0x2
   5f0a0: 7a 0a 98 fc 01 00 00 00      	stdw [r10 - 0x368], 0x1
   5f0a8: 7a 0a 88 fc 11 00 00 00      	stdw [r10 - 0x378], 0x11
   5f0b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f0b8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   5f0c0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5f0c8: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   5f0d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f0d8: 07 01 00 00 68 fc ff ff      	add64 r1, -0x398
   5f0e0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f0e8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5f0f0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5f0f8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5f100: 85 10 00 00 85 82 02 00      	call 0x28285
   5f108: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5f118: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   5f120: 5d 12 ae 00 00 00 00 00      	jne r2, r1, +0xae <.text+0x5f578>
   5f128: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5f130: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   5f138: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5f140: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f148: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5f150: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5f050>
   5f158: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5f160: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f168: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5f170: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f178: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f180: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5f188: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5f088>
   5f190: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f198: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f1a0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5f1a8: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   5f1b0: 15 01 1e ff 00 00 00 00      	jeq r1, 0x0, -0xe2 <.text+0x5e988>
   5f1b8: 79 a1 d0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb30]
   5f1c0: 7b 1a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r1
   5f1c8: 79 a1 f0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb10]
   5f1d0: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5f1d8: 79 a1 00 f9 00 00 00 00      	ldxdw r1, [r10 - 0x700]
   5f1e0: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   5f1e8: 79 a1 08 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f8]
   5f1f0: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   5f1f8: 79 a1 f8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb08]
   5f200: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   5f208: 79 a1 38 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac8]
   5f210: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   5f218: 79 a1 f0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x710]
   5f220: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   5f228: 79 a1 f8 f8 00 00 00 00      	ldxdw r1, [r10 - 0x708]
   5f230: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   5f238: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   5f240: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f248: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f250: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f258: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   5f260: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f268: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   5f270: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f278: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   5f280: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f288: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5f290: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   5f298: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5f2a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f2a8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f2b0: 7b 2a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r2
   5f2b8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f2c0: 7b 2a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r2
   5f2c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f2d0: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   5f2d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f2e0: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   5f2e8: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5f2f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f2f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f300: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f308: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
   5f310: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f318: 7b 2a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r2
   5f320: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f328: 7b 2a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r2
   5f330: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f338: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   5f340: 79 a6 60 f5 00 00 00 00      	ldxdw r6, [r10 - 0xaa0]
   5f348: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   5f350: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   5f358: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   5f360: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   5f368: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   5f370: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   5f378: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5f380: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   5f388: 7b 9a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r9
   5f390: 79 a1 30 f5 00 00 00 00      	ldxdw r1, [r10 - 0xad0]
   5f398: 7b 1a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r1
   5f3a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f3a8: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   5f3b0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   5f3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f3c0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   5f3c8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5f3d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f3d8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5f3e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f3e8: 07 02 00 00 80 fc ff ff      	add64 r2, -0x380
   5f3f0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5f3f8: 07 03 00 00 88 fe ff ff      	add64 r3, -0x178
   5f400: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f408: 07 04 00 00 a8 fe ff ff      	add64 r4, -0x158
   5f410: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f418: 85 10 00 00 d0 44 00 00      	call 0x44d0
   5f420: 79 a7 b0 fd 00 00 00 00      	ldxdw r7, [r10 - 0x250]
   5f428: 79 a6 a8 fd 00 00 00 00      	ldxdw r6, [r10 - 0x258]
   5f430: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   5f438: 15 01 64 00 00 00 00 00      	jeq r1, 0x0, +0x64 <.text+0x5f640>
   5f440: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5f448: 7b 71 08 00 00 00 00 00      	stxdw [r1 + 0x8], r7
   5f450: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
   5f458: 72 01 5a 00 02 00 00 00      	stb [r1 + 0x5a], 0x2
   5f460: 79 a3 40 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7c0]
   5f468: 05 00 b5 f9 00 00 00 00      	ja -0x64b <.text+0x5c0f8>
   5f470: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   5f478: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   5f480: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f488: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f490: 7b 2a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r2
   5f498: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5f4a0: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   5f4a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f4b0: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   5f4b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f4c0: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   5f4c8: 79 a1 18 f5 00 00 00 00      	ldxdw r1, [r10 - 0xae8]
   5f4d0: 7b 1a c0 f5 00 00 00 00      	stxdw [r10 - 0xa40], r1
   5f4d8: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5f4e0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f4e8: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5f4f0: 07 06 00 00 d0 ff ff ff      	add64 r6, -0x30
   5f4f8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f500: 85 10 00 00 ee 62 ff ff      	call -0x9d12
   5f508: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
   5f510: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5f518: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   5f520: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
   5f528: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   5f530: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   5f538: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5f540: 79 a2 b0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x50]
   5f548: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5f550: 79 a2 80 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa80]
   5f558: 7b 21 28 00 00 00 00 00      	stxdw [r1 + 0x28], r2
   5f560: 79 a2 90 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa70]
   5f568: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   5f570: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5f578: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   5f580: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5f588: 85 10 00 00 10 a8 02 00      	call 0x2a810
   5f590: 79 a1 48 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b8]
   5f598: 79 a2 40 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7c0]
   5f5a0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5f5a8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f5b0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5f5b8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5f4b8>
   5f5c0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5f5c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f5d0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5f5d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f5e0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f5e8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5f5f0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x5f4f0>
   5f5f8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f600: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f608: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5f610: 79 a1 18 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7e8]
   5f618: 79 a2 10 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f0]
   5f620: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5f628: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f630: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5f638: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5f538>
   5f640: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5f648: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f650: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5f658: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f660: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f668: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5f670: 55 02 1e f8 00 00 00 00      	jne r2, 0x0, -0x7e2 <.text+0x5b648>
   5f678: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5f680: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f688: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5f690: 05 00 1a f8 00 00 00 00      	ja -0x7e6 <.text+0x5b648>
   5f698: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f6a0: 07 01 00 00 48 f6 ff ff      	add64 r1, -0x9b8
   5f6a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f6b0: 07 02 00 00 68 fc ff ff      	add64 r2, -0x398
   5f6b8: 85 10 00 00 9f 78 02 00      	call 0x2789f
   5f6c0: 79 a1 48 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9b8]
   5f6c8: 79 a2 50 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9b0]
   5f6d0: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5f6d8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5f6e0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5f6e8: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5f6f0: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   5f6f8: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   5f700: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5f708: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f710: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5f718: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5f618>
   5f720: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5f728: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5f730: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5f738: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5f740: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5f748: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5f750: 55 02 da fb 00 00 00 00      	jne r2, 0x0, -0x426 <.text+0x5d508>
   5f758: 05 00 d6 fb 00 00 00 00      	ja -0x42a <.text+0x5d4f0>
   5f760: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f768: 07 01 00 00 d0 fc ff ff      	add64 r1, -0x330
   5f770: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f778: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   5f780: b7 03 00 00 d0 00 00 00      	mov64 r3, 0xd0
   5f788: 85 10 00 00 d0 a7 02 00      	call 0x2a7d0
   5f790: 7b 7a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r7
   5f798: 7b 6a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r6
   5f7a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f7a8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   5f7b0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f7b8: 07 07 00 00 c0 fc ff ff      	add64 r7, -0x340
   5f7c0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5f7c8: 85 10 00 00 84 08 02 00      	call 0x20884
   5f7d0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5f7d8: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   5f7e0: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5f7e8: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   5f7f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f7f8: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   5f800: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5f808: 85 10 00 00 9d 81 02 00      	call 0x2819d
   5f810: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5f818: 07 08 00 00 c8 fe ff ff      	add64 r8, -0x138
   5f820: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f828: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5f830: 85 10 00 00 88 62 ff ff      	call -0x9d78
   5f838: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f840: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   5f848: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5f850: 85 10 00 00 73 08 02 00      	call 0x20873
   5f858: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b64bf
   5f868: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b64bf
   5f878: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   5f880: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   5f888: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5f890: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   5f898: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5f8a0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   5f8a8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5f8b0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5f8b8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   5f8c0: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   5f8c8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   5f8d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f8d8: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   5f8e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f8e8: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   5f8f0: 85 10 00 00 3e 66 ff ff      	call -0x99c2
   5f8f8: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]
   5f900: 79 a9 b8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x148]
   5f908: b7 01 00 00 22 00 00 00      	mov64 r1, 0x22
   5f910: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   5f918: 85 10 00 00 74 5b ff ff      	call -0xa48c
   5f920: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   5f928: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5f930: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5f938: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5f940: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5f948: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   5f950: 7b 40 08 00 00 00 00 00      	stxdw [r0 + 0x8], r4
   5f958: 7b 30 10 00 00 00 00 00      	stxdw [r0 + 0x10], r3
   5f960: 7b 20 18 00 00 00 00 00      	stxdw [r0 + 0x18], r2
   5f968: 6a 00 20 00 01 00 00 00      	sth [r0 + 0x20], 0x1
   5f970: 7b 0a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r0
   5f978: 7a 0a 58 ff 01 00 00 00      	stdw [r10 - 0xa8], 0x1
   5f980: 7a 0a 68 ff 01 00 00 00      	stdw [r10 - 0x98], 0x1
   5f988: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   5f990: 07 07 00 00 a0 fd ff ff      	add64 r7, -0x260
   5f998: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5f9a0: 07 05 00 00 58 ff ff ff      	add64 r5, -0xa8
   5f9a8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5f9b0: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b79df
   5f9c0: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   5f9c8: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   5f9d0: 85 10 00 00 e1 8f 02 00      	call 0x28fe1
   5f9d8: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   5f9e0: 07 06 00 00 58 ff ff ff      	add64 r6, -0xa8
   5f9e8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f9f0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5f9f8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5fa00: 85 10 00 00 81 a7 02 00      	call 0x2a781
   5fa08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fa10: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   5fa18: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5fa20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fa28: 07 01 00 00 af ff ff ff      	add64 r1, -0x51
   5fa30: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   5fa38: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6807
   5fa48: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   5fa50: 79 a1 a8 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa58]
   5fa58: 73 1a af ff 00 00 00 00      	stxb [r10 - 0x51], r1
   5fa60: 7a 0a 90 fe 02 00 00 00      	stdw [r10 - 0x170], 0x2
   5fa68: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   5fa70: 7a 0a 90 ff 11 00 00 00      	stdw [r10 - 0x70], 0x11
   5fa78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fa80: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   5fa88: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   5fa90: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   5fa98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5faa0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   5faa8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5fab0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5fab8: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   5fac0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5fac8: 85 10 00 00 4c 81 02 00      	call 0x2814c
   5fad0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5fae0: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   5fae8: 1d 12 01 00 00 00 00 00      	jeq r2, r1, +0x1 <.text+0x5f9d8>
   5faf0: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0x5fa60>
   5faf8: 79 a1 68 ff 00 00 00 00      	ldxdw r1, [r10 - 0x98]
   5fb00: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
   5fb08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5fb10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5fb18: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5fb20: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5fa20>
   5fb28: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5fb30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5fb38: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5fb40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5fb48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5fb50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5fb58: 55 02 e9 fd 00 00 00 00      	jne r2, 0x0, -0x217 <.text+0x5e988>
   5fb60: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5fb68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5fb70: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5fb78: 05 00 e5 fd 00 00 00 00      	ja -0x21b <.text+0x5e988>
   5fb80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fb88: 07 01 00 00 38 f6 ff ff      	add64 r1, -0x9c8
   5fb90: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5fb98: 07 02 00 00 40 ff ff ff      	add64 r2, -0xc0
   5fba0: 85 10 00 00 02 78 02 00      	call 0x27802
   5fba8: 79 a1 38 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9c8]
   5fbb0: 79 a2 40 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9c0]
   5fbb8: 79 a3 a0 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa60]
   5fbc0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5fbc8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5fbd0: 72 03 5a 00 02 00 00 00      	stb [r3 + 0x5a], 0x2
   5fbd8: 79 a1 68 ff 00 00 00 00      	ldxdw r1, [r10 - 0x98]
   5fbe0: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
   5fbe8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5fbf0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5fbf8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5fc00: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x5fb00>
   5fc08: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5fc10: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5fc18: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   5fc20: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5fc28: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5fc30: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5fc38: 55 02 3d fb 00 00 00 00      	jne r2, 0x0, -0x4c3 <.text+0x5d508>
   5fc40: 05 00 39 fb 00 00 00 00      	ja -0x4c7 <.text+0x5d4f0>
