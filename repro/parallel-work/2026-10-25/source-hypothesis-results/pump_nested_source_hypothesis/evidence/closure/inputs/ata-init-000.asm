   b54d0: 79 20 00 00 00 00 00 00      	ldxdw r0, [r2 + 0x0]
   b54d8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   b54e0: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   b54e8: 79 36 08 00 00 00 00 00      	ldxdw r6, [r3 + 0x8]
   b54f0: 79 64 00 00 00 00 00 00      	ldxdw r4, [r6 + 0x0]
   b54f8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   b5500: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   b5508: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xb53f8>
   b5510: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   b5518: 79 07 00 00 00 00 00 00      	ldxdw r7, [r0 + 0x0]
   b5520: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   b5528: 7b 46 00 00 00 00 00 00      	stxdw [r6 + 0x0], r4
   b5530: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xb5420>
   b5538: 85 10 00 00 ff ff ff ff      	call -0x1
   b5540: 79 30 10 00 00 00 00 00      	ldxdw r0, [r3 + 0x10]
   b5548: 79 05 00 00 00 00 00 00      	ldxdw r5, [r0 + 0x0]
   b5550: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   b5558: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b5560: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0xb5450>
   b5568: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b5570: 7b 50 00 00 00 00 00 00      	stxdw [r0 + 0x0], r5
   b5578: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb5468>
   b5580: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0xb5418>
   b5588: 7b 6a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r6
   b5590: 7b 1a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r1
   b5598: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   b55a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b55a8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   b55b0: 7b 4a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r4
   b55b8: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   b55c0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   b55c8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   b55d0: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xb54c0>
   b55d8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   b55e0: 71 39 2a 00 00 00 00 00      	ldxb r9, [r3 + 0x2a]
   b55e8: 7b 9a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r9
   b55f0: 71 39 29 00 00 00 00 00      	ldxb r9, [r3 + 0x29]
   b55f8: 7b 9a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r9
   b5600: 71 39 28 00 00 00 00 00      	ldxb r9, [r3 + 0x28]
   b5608: 7b 9a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r9
   b5610: 79 39 20 00 00 00 00 00      	ldxdw r9, [r3 + 0x20]
   b5618: 7b 9a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r9
   b5620: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   b5628: 7b 3a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r3
   b5630: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   b5638: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   b5640: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   b5648: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xb5538>
   b5650: 05 00 dc ff 00 00 00 00      	ja -0x24 <.text+0xb5418>
   b5658: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   b5660: 79 53 00 00 00 00 00 00      	ldxdw r3, [r5 + 0x0]
   b5668: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   b5670: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b5678: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0xb5568>
   b5680: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b5688: 7b 35 00 00 00 00 00 00      	stxdw [r5 + 0x0], r3
   b5690: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb5580>
   b5698: 05 00 d3 ff 00 00 00 00      	ja -0x2d <.text+0xb5418>
   b56a0: 7b 9a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r9
   b56a8: 79 73 08 00 00 00 00 00      	ldxdw r3, [r7 + 0x8]
   b56b0: 7b 3a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r3
   b56b8: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   b56c0: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   b56c8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b56d0: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0xb55c0>
   b56d8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b56e0: 79 79 00 00 00 00 00 00      	ldxdw r9, [r7 + 0x0]
   b56e8: 7b 9a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r9
   b56f0: 71 19 2a 00 00 00 00 00      	ldxb r9, [r1 + 0x2a]
   b56f8: 7b 9a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r9
   b5700: 71 19 29 00 00 00 00 00      	ldxb r9, [r1 + 0x29]
   b5708: 7b 9a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r9
   b5710: 71 19 28 00 00 00 00 00      	ldxb r9, [r1 + 0x28]
   b5718: 7b 9a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r9
   b5720: 79 19 20 00 00 00 00 00      	ldxdw r9, [r1 + 0x20]
   b5728: 7b 9a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r9
   b5730: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   b5738: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   b5740: 79 a1 80 fd 00 00 00 00      	ldxdw r1, [r10 - 0x280]
   b5748: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   b5750: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb5640>
   b5758: 05 00 bb ff 00 00 00 00      	ja -0x45 <.text+0xb5418>
   b5760: 79 74 10 00 00 00 00 00      	ldxdw r4, [r7 + 0x10]
   b5768: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   b5770: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b5778: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b5780: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb5670>
   b5788: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b5790: 7b 4a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r4
   b5798: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   b57a0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb5690>
   b57a8: 05 00 b1 ff 00 00 00 00      	ja -0x4f <.text+0xb5418>
   b57b0: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   b57b8: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   b57c0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   b57c8: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   b57d0: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   b57d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b57e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b57e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b57f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb56e0>
   b57f8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b5800: 71 78 2a 00 00 00 00 00      	ldxb r8, [r7 + 0x2a]
   b5808: 7b 8a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r8
   b5810: 71 78 29 00 00 00 00 00      	ldxb r8, [r7 + 0x29]
   b5818: 7b 8a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r8
   b5820: 71 78 28 00 00 00 00 00      	ldxb r8, [r7 + 0x28]
   b5828: 7b 8a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r8
   b5830: 79 78 20 00 00 00 00 00      	ldxdw r8, [r7 + 0x20]
   b5838: 7b 8a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r8
   b5840: 79 78 18 00 00 00 00 00      	ldxdw r8, [r7 + 0x18]
   b5848: 7b 8a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r8
   b5850: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   b5858: 7b 8a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r8
   b5860: 79 a8 78 fd 00 00 00 00      	ldxdw r8, [r10 - 0x288]
   b5868: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   b5870: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb5760>
   b5878: 05 00 97 ff 00 00 00 00      	ja -0x69 <.text+0xb5418>
   b5880: 79 31 10 00 00 00 00 00      	ldxdw r1, [r3 + 0x10]
   b5888: 7b 1a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r1
   b5890: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b5898: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b58a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b58a8: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   b58b0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb57a0>
   b58b8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b58c0: 7b 0a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r0
   b58c8: 79 a0 68 fd 00 00 00 00      	ldxdw r0, [r10 - 0x298]
   b58d0: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   b58d8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb57c8>
   b58e0: 05 00 8a ff 00 00 00 00      	ja -0x76 <.text+0xb5418>
   b58e8: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   b58f0: 79 21 20 00 00 00 00 00      	ldxdw r1, [r2 + 0x20]
   b58f8: 79 10 58 00 00 00 00 00      	ldxdw r0, [r1 + 0x58]
   b5900: 79 06 08 00 00 00 00 00      	ldxdw r6, [r0 + 0x8]
   b5908: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   b5910: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b5918: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b5920: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb5810>
   b5928: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b5930: 71 35 2a 00 00 00 00 00      	ldxb r5, [r3 + 0x2a]
   b5938: 7b 5a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r5
   b5940: 71 35 29 00 00 00 00 00      	ldxb r5, [r3 + 0x29]
   b5948: 7b 5a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r5
   b5950: 71 35 28 00 00 00 00 00      	ldxb r5, [r3 + 0x28]
   b5958: 7b 5a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r5
   b5960: 79 35 20 00 00 00 00 00      	ldxdw r5, [r3 + 0x20]
   b5968: 7b 5a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r5
   b5970: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   b5978: 7b 3a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r3
   b5980: 79 03 00 00 00 00 00 00      	ldxdw r3, [r0 + 0x0]
   b5988: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   b5990: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b5998: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb5888>
   b59a0: 05 00 72 ff 00 00 00 00      	ja -0x8e <.text+0xb5418>
   b59a8: 79 04 10 00 00 00 00 00      	ldxdw r4, [r0 + 0x10]
   b59b0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   b59b8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b59c0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b59c8: bf 95 00 00 00 00 00 00      	mov64 r5, r9
   b59d0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb58c0>
   b59d8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b59e0: 7b 8a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r8
   b59e8: 7b 4a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r4
   b59f0: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   b59f8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb58e8>
   b5a00: 05 00 66 ff 00 00 00 00      	ja -0x9a <.text+0xb5418>
   b5a08: 79 21 28 00 00 00 00 00      	ldxdw r1, [r2 + 0x28]
   b5a10: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   b5a18: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   b5a20: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   b5a28: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b5a30: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b5a38: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb5928>
   b5a40: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b5a48: 71 09 2a 00 00 00 00 00      	ldxb r9, [r0 + 0x2a]
   b5a50: 7b 9a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r9
   b5a58: 71 09 29 00 00 00 00 00      	ldxb r9, [r0 + 0x29]
   b5a60: 7b 9a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r9
   b5a68: 71 09 28 00 00 00 00 00      	ldxb r9, [r0 + 0x28]
   b5a70: 7b 9a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r9
   b5a78: 79 09 20 00 00 00 00 00      	ldxdw r9, [r0 + 0x20]
   b5a80: 7b 9a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r9
   b5a88: 79 09 18 00 00 00 00 00      	ldxdw r9, [r0 + 0x18]
   b5a90: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   b5a98: 7b 0a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r0
   b5aa0: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   b5aa8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb5998>
   b5ab0: 05 00 50 ff 00 00 00 00      	ja -0xb0 <.text+0xb5418>
   b5ab8: 7b 6a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r6
   b5ac0: 79 80 10 00 00 00 00 00      	ldxdw r0, [r8 + 0x10]
   b5ac8: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
   b5ad0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b5ad8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b5ae0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb59d0>
   b5ae8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b5af0: 79 a6 70 fd 00 00 00 00      	ldxdw r6, [r10 - 0x290]
   b5af8: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
   b5b00: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb59f0>
   b5b08: 05 00 45 ff 00 00 00 00      	ja -0xbb <.text+0xb5418>
   b5b10: 7b 5a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r5
   b5b18: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   b5b20: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   b5b28: 79 62 08 00 00 00 00 00      	ldxdw r2, [r6 + 0x8]
   b5b30: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   b5b38: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b5b40: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b5b48: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb5a38>
   b5b50: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b5b58: 7b 7a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r7
   b5b60: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   b5b68: 7b 5a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r5
   b5b70: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   b5b78: 7b 5a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r5
   b5b80: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   b5b88: 7b 5a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r5
   b5b90: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   b5b98: 7b 5a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r5
   b5ba0: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   b5ba8: 79 65 00 00 00 00 00 00      	ldxdw r5, [r6 + 0x0]
   b5bb0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   b5bb8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb5aa8>
   b5bc0: 05 00 2e ff 00 00 00 00      	ja -0xd2 <.text+0xb5418>
   b5bc8: 7b 7a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r7
   b5bd0: 7b 4a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r4
   b5bd8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   b5be0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   b5be8: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
   b5bf0: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   b5bf8: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0xb5ae8>
   b5c00: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
   b5c08: bf 94 00 00 00 00 00 00      	mov64 r4, r9
   b5c10: 79 a8 50 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2b0]
   b5c18: 79 a8 58 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2a8]
   b5c20: 79 a8 60 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2a0]
   b5c28: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   b5c30: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <.text+0xb5b20>
   b5c38: 05 00 1f ff 00 00 00 00      	ja -0xe1 <.text+0xb5418>
   b5c40: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   b5c48: 79 67 20 00 00 00 00 00      	ldxdw r7, [r6 + 0x20]
   b5c50: 71 68 28 00 00 00 00 00      	ldxb r8, [r6 + 0x28]
   b5c58: 71 69 29 00 00 00 00 00      	ldxb r9, [r6 + 0x29]
   b5c60: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   b5c68: 73 6a 12 ff 00 00 00 00      	stxb [r10 - 0xee], r6
   b5c70: 73 9a 11 ff 00 00 00 00      	stxb [r10 - 0xef], r9
   b5c78: 73 8a 10 ff 00 00 00 00      	stxb [r10 - 0xf0], r8
   b5c80: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   b5c88: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   b5c90: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   b5c98: 7b 2a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r2
   b5ca0: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   b5ca8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   b5cb0: 73 1a e2 fe 00 00 00 00      	stxb [r10 - 0x11e], r1
   b5cb8: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   b5cc0: 73 1a e1 fe 00 00 00 00      	stxb [r10 - 0x11f], r1
   b5cc8: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   b5cd0: 73 1a e0 fe 00 00 00 00      	stxb [r10 - 0x120], r1
   b5cd8: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   b5ce0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   b5ce8: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   b5cf0: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   b5cf8: 7b 0a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r0
   b5d00: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   b5d08: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   b5d10: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   b5d18: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   b5d20: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   b5d28: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   b5d30: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   b5d38: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   b5d40: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   b5d48: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   b5d50: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   b5d58: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   b5d60: 7b 4a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r4
   b5d68: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   b5d70: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   b5d78: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   b5d80: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   b5d88: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   b5d90: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   b5d98: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   b5da0: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   b5da8: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   b5db0: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   b5db8: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   b5dc0: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   b5dc8: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   b5dd0: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   b5dd8: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   b5de0: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   b5de8: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   b5df0: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   b5df8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   b5e00: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   b5e08: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   b5e10: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   b5e18: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   b5e20: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   b5e28: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   b5e30: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   b5e38: 79 a1 e0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x320]
   b5e40: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   b5e48: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   b5e50: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   b5e58: 79 a1 f0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x310]
   b5e60: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   b5e68: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   b5e70: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   b5e78: 79 a1 80 fd 00 00 00 00      	ldxdw r1, [r10 - 0x280]
   b5e80: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   b5e88: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   b5e90: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   b5e98: 79 a1 00 fd 00 00 00 00      	ldxdw r1, [r10 - 0x300]
   b5ea0: 73 1a 22 fe 00 00 00 00      	stxb [r10 - 0x1de], r1
   b5ea8: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   b5eb0: 73 1a 21 fe 00 00 00 00      	stxb [r10 - 0x1df], r1
   b5eb8: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   b5ec0: 73 1a 20 fe 00 00 00 00      	stxb [r10 - 0x1e0], r1
   b5ec8: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   b5ed0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   b5ed8: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   b5ee0: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   b5ee8: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   b5ef0: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   b5ef8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   b5f00: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   b5f08: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   b5f10: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   b5f18: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   b5f20: 73 1a f2 fd 00 00 00 00      	stxb [r10 - 0x20e], r1
   b5f28: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   b5f30: 73 1a f1 fd 00 00 00 00      	stxb [r10 - 0x20f], r1
   b5f38: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   b5f40: 73 1a f0 fd 00 00 00 00      	stxb [r10 - 0x210], r1
   b5f48: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   b5f50: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   b5f58: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   b5f60: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   b5f68: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   b5f70: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   b5f78: 79 a1 70 fd 00 00 00 00      	ldxdw r1, [r10 - 0x290]
   b5f80: 7b 1a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r1
   b5f88: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   b5f90: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   b5f98: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   b5fa0: 7a 0a 18 ff 08 00 00 00      	stdw [r10 - 0xe8], 0x8
   b5fa8: 7a 0a c0 fd 00 00 00 00      	stdw [r10 - 0x240], 0x0
   b5fb0: 7a 0a b8 fd 08 00 00 00      	stdw [r10 - 0x248], 0x8
   b5fb8: 7a 0a b0 fd 00 00 00 00      	stdw [r10 - 0x250], 0x0
   b5fc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5fc8: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   b5fd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b5fd8: 07 02 00 00 b0 fd ff ff      	add64 r2, -0x250
   b5fe0: 85 10 00 00 14 90 01 00      	call 0x19014
   b5fe8: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   b5ff0: 55 01 15 00 02 00 00 00      	jne r1, 0x2, +0x15 <.text+0xb5f80>
   b5ff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b6000: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   b6008: 79 a2 10 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f0]
   b6010: 85 10 00 00 c6 99 fe ff      	call -0x1663a
   b6018: 61 a1 d8 ff 00 00 00 00      	ldxw r1, [r10 - 0x28]
   b6020: 79 a6 60 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2a0]
   b6028: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xb5f18>
   b6030: 05 00 12 00 00 00 00 00      	ja +0x12 <.text+0xb5fa8>
   b6038: 79 a3 30 ff 00 00 00 00      	ldxdw r3, [r10 - 0xd0]
   b6040: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   b6048: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b6050: 07 01 00 00 90 fd ff ff      	add64 r1, -0x270
   b6058: 18 04 00 00 11 75 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b7511
   b6068: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   b6070: 85 10 00 00 17 99 fe ff      	call -0x166e9
   b6078: 79 a1 90 fd 00 00 00 00      	ldxdw r1, [r10 - 0x270]
   b6080: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   b6088: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   b6090: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b6098: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xb60a8>
   b60a0: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   b60a8: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   b60b0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   b60b8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   b60c0: 05 00 20 00 00 00 00 00      	ja +0x20 <.text+0xb60a8>
   b60c8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   b60d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b60e0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   b60e8: 07 03 00 00 28 ff ff ff      	add64 r3, -0xd8
   b60f0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b60f8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b6100: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xb5ff0>
   b6108: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b6110: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xb6000>
   b6118: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   b6120: 18 07 00 00 28 7f 00 00 00 00 00 00 03 00 00 00      	lddw r7, 0x300007f28
   b6130: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xb6028>
   b6138: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   b6140: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   b6148: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   b6158: 2d 17 03 00 00 00 00 00      	jgt r7, r1, +0x3 <.text+0xb6058>
   b6160: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   b6168: b7 02 00 00 d8 00 00 00      	mov64 r2, 0xd8
   b6170: 85 10 00 00 07 ea 01 00      	call 0x1ea07
   b6178: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   b6188: 7b 71 00 00 00 00 00 00      	stxdw [r1 + 0x0], r7
   b6190: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b6198: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   b61a0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   b61a8: b7 03 00 00 d8 00 00 00      	mov64 r3, 0xd8
   b61b0: 85 10 00 00 8b fa 01 00      	call 0x1fa8b
   b61b8: 7b 76 08 00 00 00 00 00      	stxdw [r6 + 0x8], r7
   b61c0: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   b61c8: 95 00 00 00 00 00 00 00      	exit
