
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   ce7f8: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   ce800: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   ce808: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   ce810: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   ce818: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ce820: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   ce828: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   ce830: 85 10 00 00 44 82 fe ff      	call -0x17dbc
   ce838: 79 a7 f0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x110]
   ce840: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   ce848: 55 02 15 00 02 00 00 00      	jne r2, 0x2, +0x15 <.text+0xce7d8>
   ce850: 79 81 08 f0 00 00 00 00      	ldxdw r1, [r8 - 0xff8]
   ce858: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   ce860: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ce868: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   ce870: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   ce878: 85 10 00 00 83 83 fe ff      	call -0x17c7d
   ce880: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   ce888: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   ce890: 71 a1 41 ff 00 00 00 00      	ldxb r1, [r10 - 0xbf]
   ce898: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xce788>
   ce8a0: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0xce840>
   ce8a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ce8b0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   ce8b8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   ce8c0: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   ce8d0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   ce8d8: 85 10 00 00 93 66 fe ff      	call -0x1996d
   ce8e0: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   ce8e8: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   ce8f0: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0xce820>
   ce8f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ce900: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   ce908: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   ce910: 18 04 00 00 04 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c004
   ce920: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   ce928: 85 10 00 00 89 66 fe ff      	call -0x19977
   ce930: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   ce938: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   ce940: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   ce948: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   ce950: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   ce958: 95 00 00 00 00 00 00 00      	exit
   ce960: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   ce968: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   ce970: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ce978: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   ce980: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ce988: 07 02 00 00 f8 fe ff ff      	add64 r2, -0x108
   ce990: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   ce998: 85 10 00 00 df 95 00 00      	call 0x95df
   ce9a0: 61 a1 42 ff 00 00 00 00      	ldxw r1, [r10 - 0xbe]
   ce9a8: 63 1a 48 ff 00 00 00 00      	stxw [r10 - 0xb8], r1
   ce9b0: 69 a1 46 ff 00 00 00 00      	ldxh r1, [r10 - 0xba]
   ce9b8: 6b 1a 4c ff 00 00 00 00      	stxh [r10 - 0xb4], r1
   ce9c0: 79 92 08 00 00 00 00 00      	ldxdw r2, [r9 + 0x8]
   ce9c8: 15 02 b1 00 00 00 00 00      	jeq r2, 0x0, +0xb1 <.text+0xcee38>
   ce9d0: 7b 8a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r8
   ce9d8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   ce9e0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   ce9e8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   ce9f0: 7b 39 00 00 00 00 00 00      	stxdw [r9 + 0x0], r3
   ce9f8: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   cea00: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   cea08: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   cea10: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   cea18: 79 84 00 00 00 00 00 00      	ldxdw r4, [r8 + 0x0]
   cea20: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   cea28: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   cea30: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xce920>
   cea38: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   cea40: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   cea48: 7b 0a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r0
   cea50: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   cea58: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xce948>
   cea60: 85 10 00 00 ff ff ff ff      	call -0x1
   cea68: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   cea70: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   cea78: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   cea80: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   cea88: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xce978>
   cea90: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   cea98: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   ceaa0: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xce990>
   ceaa8: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0xce940>
   ceab0: 15 03 a3 00 00 00 00 00      	jeq r3, 0x0, +0xa3 <.text+0xceeb0>
   ceab8: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   ceac0: 7b 3a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r3
   ceac8: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   cead0: 7b 3a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r3
   cead8: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   ceae0: 7b 3a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r3
   ceae8: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   ceaf0: 7b 3a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r3
   ceaf8: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   ceb00: 7b 3a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r3
   ceb08: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   ceb10: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   ceb18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   ceb20: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   ceb28: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   ceb30: 79 19 38 00 00 00 00 00      	ldxdw r9, [r1 + 0x38]
   ceb38: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   ceb40: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   ceb48: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ceb50: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xcea40>
   ceb58: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   ceb60: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   ceb68: 7b 4a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r4
   ceb70: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   ceb78: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   ceb80: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xcea70>
   ceb88: 05 00 da ff 00 00 00 00      	ja -0x26 <.text+0xce940>
   ceb90: 79 15 40 00 00 00 00 00      	ldxdw r5, [r1 + 0x40]
   ceb98: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   ceba0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   ceba8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   cebb0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xceaa0>
   cebb8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   cebc0: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   cebc8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xceab8>
   cebd0: 05 00 d1 ff 00 00 00 00      	ja -0x2f <.text+0xce940>
   cebd8: 7b 5a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r5
   cebe0: 7b 0a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r0
   cebe8: 71 72 29 00 00 00 00 00      	ldxb r2, [r7 + 0x29]
   cebf0: 15 02 8f 00 00 00 00 00      	jeq r2, 0x0, +0x8f <.text+0xcef50>
   cebf8: 7b 9a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r9
   cec00: 7b 8a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r8
   cec08: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   cec10: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   cec18: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   cec20: 7b 2a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r2
   cec28: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   cec30: 7b 2a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r2
   cec38: 79 12 50 00 00 00 00 00      	ldxdw r2, [r1 + 0x50]
   cec40: 7b 2a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r2
   cec48: 79 11 48 00 00 00 00 00      	ldxdw r1, [r1 + 0x48]
   cec50: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   cec58: 79 79 00 00 00 00 00 00      	ldxdw r9, [r7 + 0x0]
   cec60: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   cec68: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   cec70: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   cec78: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   cec80: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   cec88: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   cec90: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   cec98: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   ceca0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ceca8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   cecb0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   cecb8: 18 01 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd4b
   cecc8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   cecd0: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   cecd8: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   cece0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cece8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   cecf0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cecf8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   ced00: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   ced08: 85 10 00 00 6b 7e 00 00      	call 0x7e6b
   ced10: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   ced18: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   ced20: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   ced28: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   ced30: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   ced38: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   ced40: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   ced48: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   ced50: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   ced58: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   ced60: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   ced68: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   ced70: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   ced78: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   ced80: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   ced88: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   ced90: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   ced98: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   ceda0: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ceda8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   cedb0: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   cedb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cedc0: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   cedc8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cedd0: 07 02 00 00 a0 ff ff ff      	add64 r2, -0x60
   cedd8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   cede0: 85 10 00 00 5f 95 00 00      	call 0x955f
   cede8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   cedf0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   cedf8: 15 00 7e 00 00 00 00 00      	jeq r0, 0x0, +0x7e <.text+0xcf0d0>
   cee00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cee08: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   cee10: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   cee18: 85 10 00 00 03 6e 00 00      	call 0x6e03
   cee20: 79 a3 d0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x130]
   cee28: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   cee30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cee38: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   cee40: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   cee50: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   cee58: 85 10 00 00 e3 65 fe ff      	call -0x19a1d
   cee60: 79 a3 c0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x140]
   cee68: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   cee70: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   cee78: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   cee80: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   cee88: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   cee90: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   cee98: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ceea0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   ceea8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   ceeb0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   ceeb8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   ceec0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   ceec8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   ceed0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   ceed8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   ceee0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   ceee8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   ceef0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ceef8: 07 01 00 00 a8 fe ff ff      	add64 r1, -0x158
   cef00: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   cef08: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   cef10: 85 10 00 00 57 68 00 00      	call 0x6857
   cef18: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   cef20: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
   cef28: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   cef30: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   cef38: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   cef40: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   cef48: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   cef50: 05 00 34 00 00 00 00 00      	ja +0x34 <.text+0xcefd8>
   cef58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cef60: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   cef68: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   cef70: 85 10 00 00 d8 6d 00 00      	call 0x6dd8
   cef78: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   cef80: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   cef88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cef90: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   cef98: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   cefa8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   cefb0: 85 10 00 00 b8 65 fe ff      	call -0x19a48
   cefb8: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   cefc0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   cefc8: 05 00 2e ff 00 00 00 00      	ja -0xd2 <.text+0xce820>
   cefd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cefd8: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   cefe0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   cefe8: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   ceff0: 85 10 00 00 c8 6d 00 00      	call 0x6dc8
   ceff8: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   cf000: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   cf008: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf010: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   cf018: 18 04 00 00 ca e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ca
   cf028: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   cf030: 85 10 00 00 a8 65 fe ff      	call -0x19a58
   cf038: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   cf040: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   cf048: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   cf050: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   cf058: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   cf060: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   cf068: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0xcf058>
   cf070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf078: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   cf080: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   cf088: 85 10 00 00 b5 6d 00 00      	call 0x6db5
   cf090: 79 a3 30 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d0]
   cf098: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   cf0a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf0a8: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   cf0b0: 18 04 00 00 04 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c004
   cf0c0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   cf0c8: 85 10 00 00 95 65 fe ff      	call -0x19a6b
   cf0d0: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   cf0d8: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   cf0e0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   cf0e8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   cf0f0: 72 06 c2 00 02 00 00 00      	stb [r6 + 0xc2], 0x2
   cf0f8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   cf100: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf108: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   cf110: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   cf118: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   cf120: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xcf020>
   cf128: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   cf130: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf138: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   cf140: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   cf148: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf150: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   cf158: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xcf058>
   cf160: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   cf168: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf170: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   cf178: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   cf180: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf188: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   cf190: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xcf090>
   cf198: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   cf1a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf1a8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   cf1b0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   cf1b8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf1c0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   cf1c8: 55 01 f1 fe 00 00 00 00      	jne r1, 0x0, -0x10f <.text+0xce838>
   cf1d0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   cf1d8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   cf1e0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   cf1e8: 05 00 ed fe 00 00 00 00      	ja -0x113 <.text+0xce838>
   cf1f0: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   cf1f8: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   cf200: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   cf208: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   cf210: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   cf218: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   cf220: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   cf228: 15 01 66 00 00 00 00 00      	jeq r1, 0x0, +0x66 <.text+0xcf440>
   cf230: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   cf238: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   cf240: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   cf248: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   cf250: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   cf258: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   cf260: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   cf268: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   cf270: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   cf278: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   cf280: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   cf288: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   cf290: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   cf298: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   cf2a0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   cf2a8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   cf2b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf2b8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   cf2c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cf2c8: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   cf2d0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   cf2d8: 85 10 00 00 c0 94 00 00      	call 0x94c0
   cf2e0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   cf2e8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   cf2f0: 15 00 5c 00 00 00 00 00      	jeq r0, 0x0, +0x5c <.text+0xcf4b8>
   cf2f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf300: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   cf308: 18 02 00 00 d0 29 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1229d0
   cf318: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   cf320: 79 a4 c0 fd 00 00 00 00      	ldxdw r4, [r10 - 0x240]
   cf328: 85 10 00 00 a7 7d 00 00      	call 0x7da7
   cf330: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   cf338: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   cf340: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   cf348: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   cf350: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   cf358: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   cf360: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   cf368: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   cf370: 71 a1 08 ff 00 00 00 00      	ldxb r1, [r10 - 0xf8]
   cf378: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   cf380: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   cf388: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   cf390: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   cf398: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   cf3a0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   cf3a8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   cf3b0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   cf3b8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   cf3c0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   cf3c8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   cf3d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf3d8: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   cf3e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cf3e8: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   cf3f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   cf3f8: 85 10 00 00 9c 94 00 00      	call 0x949c
   cf400: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   cf408: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   cf410: 79 a8 80 fd 00 00 00 00      	ldxdw r8, [r10 - 0x280]
   cf418: 79 a9 78 fd 00 00 00 00      	ldxdw r9, [r10 - 0x288]
   cf420: 15 00 45 00 00 00 00 00      	jeq r0, 0x0, +0x45 <.text+0xcf530>
   cf428: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf430: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   cf438: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   cf440: 85 10 00 00 3e 6d 00 00      	call 0x6d3e
   cf448: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   cf450: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   cf458: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf460: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   cf468: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   cf478: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   cf480: 85 10 00 00 1e 65 fe ff      	call -0x19ae2
   cf488: 79 a3 90 fe 00 00 00 00      	ldxdw r3, [r10 - 0x170]
   cf490: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   cf498: 79 a4 90 fd 00 00 00 00      	ldxdw r4, [r10 - 0x270]
   cf4a0: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   cf4a8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   cf4b0: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   cf4b8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   cf4c0: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   cf4c8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   cf4d0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   cf4d8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   cf4e0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   cf4e8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   cf4f0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   cf4f8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   cf500: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   cf508: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   cf510: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   cf518: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   cf520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf528: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   cf530: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   cf538: 07 04 00 00 e8 fe ff ff      	add64 r4, -0x118
   cf540: 85 10 00 00 91 67 00 00      	call 0x6791
   cf548: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   cf550: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   cf558: 05 00 70 ff 00 00 00 00      	ja -0x90 <.text+0xcefc0>
   cf560: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf568: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   cf570: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   cf578: 85 10 00 00 17 6d 00 00      	call 0x6d17
   cf580: 79 a3 50 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1b0]
   cf588: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   cf590: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf598: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   cf5a0: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   cf5b0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   cf5b8: 85 10 00 00 f7 64 fe ff      	call -0x19b09
   cf5c0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   cf5c8: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   cf5d0: 05 00 2a ff 00 00 00 00      	ja -0xd6 <.text+0xcee08>
   cf5d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf5e0: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   cf5e8: b7 02 00 00 db 07 00 00      	mov64 r2, 0x7db
   cf5f0: 85 10 00 00 08 6d 00 00      	call 0x6d08
   cf5f8: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   cf600: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   cf608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf610: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   cf618: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   cf628: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   cf630: 85 10 00 00 e8 64 fe ff      	call -0x19b18
   cf638: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   cf640: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   cf648: 05 00 1b ff 00 00 00 00      	ja -0xe5 <.text+0xcee08>
   cf650: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   cf658: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   cf660: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cf668: 07 02 00 00 50 ff ff ff      	add64 r2, -0xb0
   cf670: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   cf678: 85 10 00 00 43 94 00 00      	call 0x9443
   cf680: 69 a1 4c ff 00 00 00 00      	ldxh r1, [r10 - 0xb4]
   cf688: 61 a2 48 ff 00 00 00 00      	ldxw r2, [r10 - 0xb8]
   cf690: 79 a3 a8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x258]
   cf698: 73 36 61 00 00 00 00 00      	stxb [r6 + 0x61], r3
   cf6a0: 79 a3 50 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b0]
   cf6a8: 73 36 90 00 00 00 00 00      	stxb [r6 + 0x90], r3
   cf6b0: 79 a3 58 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a8]
   cf6b8: 73 36 91 00 00 00 00 00      	stxb [r6 + 0x91], r3
   cf6c0: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   cf6c8: 73 36 92 00 00 00 00 00      	stxb [r6 + 0x92], r3
   cf6d0: 79 a3 20 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2e0]
   cf6d8: 73 36 c0 00 00 00 00 00      	stxb [r6 + 0xc0], r3
   cf6e0: 79 a3 28 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d8]
   cf6e8: 73 36 c1 00 00 00 00 00      	stxb [r6 + 0xc1], r3
   cf6f0: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   cf6f8: 73 36 c2 00 00 00 00 00      	stxb [r6 + 0xc2], r3
   cf700: 79 a3 30 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d0]
   cf708: 7b 36 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r3
   cf710: 79 a3 38 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c8]
   cf718: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   cf720: 79 a3 98 fd 00 00 00 00      	ldxdw r3, [r10 - 0x268]
   cf728: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   cf730: 7b 96 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r9
   cf738: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   cf740: 7b 36 98 00 00 00 00 00      	stxdw [r6 + 0x98], r3
   cf748: 79 a3 68 fd 00 00 00 00      	ldxdw r3, [r10 - 0x298]
   cf750: 7b 36 88 00 00 00 00 00      	stxdw [r6 + 0x88], r3
   cf758: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   cf760: 7b 36 80 00 00 00 00 00      	stxdw [r6 + 0x80], r3
   cf768: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   cf770: 7b 36 78 00 00 00 00 00      	stxdw [r6 + 0x78], r3
   cf778: 7b 86 70 00 00 00 00 00      	stxdw [r6 + 0x70], r8
   cf780: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   cf788: 7b 36 68 00 00 00 00 00      	stxdw [r6 + 0x68], r3
   cf790: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   cf798: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   cf7a0: 79 a3 b0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x250]
   cf7a8: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   cf7b0: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   cf7b8: 63 26 62 00 00 00 00 00      	stxw [r6 + 0x62], r2
   cf7c0: 6b 16 66 00 00 00 00 00      	stxh [r6 + 0x66], r1
   cf7c8: 05 00 31 fe 00 00 00 00      	ja -0x1cf <.text+0xce838>
