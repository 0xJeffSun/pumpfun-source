
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000005d218 <_ZN159_$LT$pump_amm_recovered..incentives..ClaimTokenIncentives$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..incentives..ClaimTokenIncentivesBumps$GT$$GT$12try_accounts17hdb24ff82e5418163E>:
   5d218: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   5d220: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   5d228: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5d230: 15 01 59 00 00 00 00 00      	jeq r1, 0x0, +0x59 <LBB233_13>
   5d238: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
   5d240: 7b 2a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r2
   5d248: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   5d250: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   5d258: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   5d260: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   5d268: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   5d270: 07 05 00 00 30 00 00 00      	add64 r5, 0x30
   5d278: 7b 5a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r5
   5d280: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   5d288: 7b 53 00 00 00 00 00 00      	stxdw [r3 + 0x0], r5
   5d290: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   5d298: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   5d2a0: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   5d2a8: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   5d2b0: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB233_3>
   5d2b8: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0

000000000005d2c0 <LBB233_3>:
   5d2c0: 7b 6a 58 f5 00 00 00 00      	stxdw [r10 - 0xaa8], r6
   5d2c8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5d2d0: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   5d2d8: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <LBB233_5>

000000000005d2e0 <LBB233_4>:
   5d2e0: 85 10 00 00 ff ff ff ff      	call -0x1

000000000005d2e8 <LBB233_5>:
   5d2e8: 79 27 10 00 00 00 00 00      	ldxdw r7, [r2 + 0x10]
   5d2f0: 79 70 00 00 00 00 00 00      	ldxdw r0, [r7 + 0x0]
   5d2f8: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   5d300: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
   5d308: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB233_7>
   5d310: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0

000000000005d318 <LBB233_7>:
   5d318: 7b 8a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r8
   5d320: 7b 07 00 00 00 00 00 00      	stxdw [r7 + 0x0], r0
   5d328: 55 06 01 00 01 00 00 00      	jne r6, 0x1, +0x1 <LBB233_9>
   5d330: 05 00 f5 ff 00 00 00 00      	ja -0xb <LBB233_4>

000000000005d338 <LBB233_9>:
   5d338: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   5d340: 7b 5a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r5
   5d348: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   5d350: 71 28 28 00 00 00 00 00      	ldxb r8, [r2 + 0x28]
   5d358: 71 25 29 00 00 00 00 00      	ldxb r5, [r2 + 0x29]
   5d360: 71 20 2a 00 00 00 00 00      	ldxb r0, [r2 + 0x2a]
   5d368: 73 0a 4a f8 00 00 00 00      	stxb [r10 - 0x7b6], r0
   5d370: 73 5a 49 f8 00 00 00 00      	stxb [r10 - 0x7b7], r5
   5d378: 73 8a 48 f8 00 00 00 00      	stxb [r10 - 0x7b8], r8
   5d380: 7b 6a 40 f8 00 00 00 00      	stxdw [r10 - 0x7c0], r6
   5d388: 79 a5 50 f5 00 00 00 00      	ldxdw r5, [r10 - 0xab0]
   5d390: 7b 5a 38 f8 00 00 00 00      	stxdw [r10 - 0x7c8], r5
   5d398: 7b 7a 30 f8 00 00 00 00      	stxdw [r10 - 0x7d0], r7
   5d3a0: 7b 9a 28 f8 00 00 00 00      	stxdw [r10 - 0x7d8], r9
   5d3a8: 7b 3a 20 f8 00 00 00 00      	stxdw [r10 - 0x7e0], r3
   5d3b0: 15 04 3b 00 00 00 00 00      	jeq r4, 0x0, +0x3b <LBB233_14>
   5d3b8: 79 a3 40 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac0]
   5d3c0: 7b 3a 50 f8 00 00 00 00      	stxdw [r10 - 0x7b0], r3
   5d3c8: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   5d3d0: 79 a8 48 f5 00 00 00 00      	ldxdw r8, [r10 - 0xab8]
   5d3d8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   5d3e0: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   5d3e8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   5d3f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d3f8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5d400: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d408: 85 10 00 00 f5 61 ff ff      	call -0x9e0b
   5d410: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   5d418: 79 a9 60 f8 00 00 00 00      	ldxdw r9, [r10 - 0x7a0]
   5d420: 79 a7 58 f8 00 00 00 00      	ldxdw r7, [r10 - 0x7a8]
   5d428: 79 a6 58 f5 00 00 00 00      	ldxdw r6, [r10 - 0xaa8]
   5d430: 15 07 36 00 00 00 00 00      	jeq r7, 0x0, +0x36 <LBB233_15>
   5d438: 7b 3a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r3
   5d440: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d448: 07 01 00 00 78 fa ff ff      	add64 r1, -0x588
   5d450: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d458: 07 02 00 00 70 f8 ff ff      	add64 r2, -0x790
   5d460: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   5d468: 85 10 00 00 c9 5b 01 00      	call 0x15bc9
   5d470: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d478: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5d480: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d488: 85 10 00 00 a8 45 ff ff      	call -0xba58
   5d490: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5d498: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5d4a0: 61 a1 08 f9 00 00 00 00      	ldxw r1, [r10 - 0x6f8]
   5d4a8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB233_12>
   5d4b0: 05 00 30 00 00 00 00 00      	ja +0x30 <LBB233_16>

000000000005d4b8 <LBB233_12>:
   5d4b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d4c0: 07 01 00 00 a0 f5 ff ff      	add64 r1, -0xa60
   5d4c8: 18 04 00 00 a7 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10eba7
   5d4d8: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5d4e0: 85 10 00 00 bb 48 ff ff      	call -0xb745
   5d4e8: 79 a1 a0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa60]
   5d4f0: 79 a2 a8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa58]
   5d4f8: 05 00 77 00 00 00 00 00      	ja +0x77 <LBB233_20>

000000000005d500 <LBB233_13>:
   5d500: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d508: 07 01 00 00 70 f5 ff ff      	add64 r1, -0xa90
   5d510: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5d518: 85 10 00 00 8e 34 01 00      	call 0x1348e
   5d520: 79 a3 78 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa88]
   5d528: 79 a2 70 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa90]
   5d530: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d538: 07 01 00 00 60 f5 ff ff      	add64 r1, -0xaa0
   5d540: 18 04 00 00 d4 df 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dfd4
   5d550: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   5d558: 85 10 00 00 ac 48 ff ff      	call -0xb754
   5d560: 79 a1 60 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa0]
   5d568: 79 a2 68 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa98]
   5d570: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5d578: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   5d580: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   5d588: 05 00 78 00 00 00 00 00      	ja +0x78 <LBB233_26>

000000000005d590 <LBB233_14>:
   5d590: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d598: 07 01 00 00 80 f5 ff ff      	add64 r1, -0xa80
   5d5a0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5d5a8: 85 10 00 00 7c 34 01 00      	call 0x1347c
   5d5b0: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   5d5b8: 79 a2 88 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa78]
   5d5c0: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   5d5c8: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   5d5d0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   5d5d8: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   5d5e0: 05 00 5f 00 00 00 00 00      	ja +0x5f <LBB233_22>

000000000005d5e8 <LBB233_15>:
   5d5e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d5f0: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   5d5f8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d600: 18 04 00 00 5c e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e65c
   5d610: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5d618: 85 10 00 00 94 48 ff ff      	call -0xb76c
   5d620: 79 a1 90 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa70]
   5d628: 79 a2 98 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa68]
   5d630: 05 00 50 00 00 00 00 00      	ja +0x50 <LBB233_20>

000000000005d638 <LBB233_16>:
   5d638: 7b 1a 18 f5 00 00 00 00      	stxdw [r10 - 0xae8], r1
   5d640: 7b 2a 20 f5 00 00 00 00      	stxdw [r10 - 0xae0], r2
   5d648: 7b 3a 28 f5 00 00 00 00      	stxdw [r10 - 0xad8], r3
   5d650: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5d658: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   5d660: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5d668: 7b 1a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r1
   5d670: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   5d678: 7b 1a 40 f5 00 00 00 00      	stxdw [r10 - 0xac0], r1
   5d680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d688: 07 01 00 00 f0 fc ff ff      	add64 r1, -0x310
   5d690: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d698: 07 02 00 00 80 f8 ff ff      	add64 r2, -0x780
   5d6a0: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   5d6a8: 85 10 00 00 81 5b 01 00      	call 0x15b81
   5d6b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d6b8: 07 01 00 00 a8 fc ff ff      	add64 r1, -0x358
   5d6c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d6c8: 07 02 00 00 c0 f8 ff ff      	add64 r2, -0x740
   5d6d0: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   5d6d8: 85 10 00 00 7b 5b 01 00      	call 0x15b7b
   5d6e0: 79 a1 0c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f4]
   5d6e8: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5d6f0: 79 a1 14 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6ec]
   5d6f8: 7b 1a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r1
   5d700: 79 a1 1c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e4]
   5d708: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   5d710: 79 a1 24 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6dc]
   5d718: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   5d720: 61 a1 2c f9 00 00 00 00      	ldxw r1, [r10 - 0x6d4]
   5d728: 63 1a a0 fc 00 00 00 00      	stxw [r10 - 0x360], r1
   5d730: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d738: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5d740: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d748: 85 10 00 00 5f 61 ff ff      	call -0x9ea1
   5d750: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5d758: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5d760: 71 a1 b1 f8 00 00 00 00      	ldxb r1, [r10 - 0x74f]
   5d768: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB233_17>
   5d770: 05 00 09 00 00 00 00 00      	ja +0x9 <LBB233_18>

000000000005d778 <LBB233_17>:
   5d778: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d780: 07 01 00 00 b0 f5 ff ff      	add64 r1, -0xa50
   5d788: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5d798: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5d7a0: 85 10 00 00 63 48 ff ff      	call -0xb79d
   5d7a8: 79 a1 b0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa50]
   5d7b0: 79 a2 b8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa48]
   5d7b8: 05 00 1f 00 00 00 00 00      	ja +0x1f <LBB233_20>

000000000005d7c0 <LBB233_18>:
   5d7c0: 7b 1a f8 f4 00 00 00 00      	stxdw [r10 - 0xb08], r1
   5d7c8: 7b 2a 08 f5 00 00 00 00      	stxdw [r10 - 0xaf8], r2
   5d7d0: 7b 3a 00 f5 00 00 00 00      	stxdw [r10 - 0xb00], r3
   5d7d8: 7b 7a 10 f5 00 00 00 00      	stxdw [r10 - 0xaf0], r7
   5d7e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d7e8: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   5d7f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d7f8: 07 02 00 00 68 f8 ff ff      	add64 r2, -0x798
   5d800: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5d808: 85 10 00 00 55 5b 01 00      	call 0x15b55
   5d810: 61 a1 b2 f8 00 00 00 00      	ldxw r1, [r10 - 0x74e]
   5d818: 63 1a 40 fd 00 00 00 00      	stxw [r10 - 0x2c0], r1
   5d820: 69 a1 b6 f8 00 00 00 00      	ldxh r1, [r10 - 0x74a]
   5d828: 6b 1a 44 fd 00 00 00 00      	stxh [r10 - 0x2bc], r1
   5d830: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d838: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5d840: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d848: 85 10 00 00 47 45 ff ff      	call -0xbab9
   5d850: 61 a7 58 f8 00 00 00 00      	ldxw r7, [r10 - 0x7a8]
   5d858: 15 07 01 00 02 00 00 00      	jeq r7, 0x2, +0x1 <LBB233_19>
   5d860: 05 00 1e 00 00 00 00 00      	ja +0x1e <LBB233_27>

000000000005d868 <LBB233_19>:
   5d868: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   5d870: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   5d878: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d880: 07 01 00 00 c0 f5 ff ff      	add64 r1, -0xa40
   5d888: 18 04 00 00 94 e0 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e094
   5d898: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   5d8a0: 85 10 00 00 43 48 ff ff      	call -0xb7bd
   5d8a8: 79 a1 c0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa40]
   5d8b0: 79 a2 c8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa38]

000000000005d8b8 <LBB233_20>:
   5d8b8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5d8c0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   5d8c8: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2

000000000005d8d0 <LBB233_21>:
   5d8d0: 79 a7 30 f8 00 00 00 00      	ldxdw r7, [r10 - 0x7d0]
   5d8d8: 79 a9 28 f8 00 00 00 00      	ldxdw r9, [r10 - 0x7d8]

000000000005d8e0 <LBB233_22>:
   5d8e0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5d8e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d8f0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5d8f8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB233_24>
   5d900: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d908: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d910: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

000000000005d918 <LBB233_24>:
   5d918: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5d920: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d928: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   5d930: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB233_26>
   5d938: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5d940: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d948: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1

000000000005d950 <LBB233_26>:
   5d950: 95 00 00 00 00 00 00 00      	exit

000000000005d958 <LBB233_27>:
   5d958: 7b 9a e8 f4 00 00 00 00      	stxdw [r10 - 0xb18], r9
   5d960: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5d968: 61 a1 5c f8 00 00 00 00      	ldxw r1, [r10 - 0x7a4]
   5d970: 7b 1a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r1
   5d978: 79 a6 60 f8 00 00 00 00      	ldxdw r6, [r10 - 0x7a0]
   5d980: 79 a9 68 f8 00 00 00 00      	ldxdw r9, [r10 - 0x798]
   5d988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d990: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   5d998: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d9a0: 07 02 00 00 70 f8 ff ff      	add64 r2, -0x790
   5d9a8: b7 03 00 00 68 00 00 00      	mov64 r3, 0x68
   5d9b0: 85 10 00 00 20 5b 01 00      	call 0x15b20
   5d9b8: 7b 9a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r9
   5d9c0: 7b 6a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r6
   5d9c8: 79 a1 f0 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb10]
   5d9d0: 63 1a 9c fd 00 00 00 00      	stxw [r10 - 0x264], r1
   5d9d8: 63 7a 98 fd 00 00 00 00      	stxw [r10 - 0x268], r7
   5d9e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d9e8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5d9f0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5d9f8: 85 10 00 00 e4 44 ff ff      	call -0xbb1c
   5da00: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5da08: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5da10: bf 87 00 00 00 00 00 00      	mov64 r7, r8
   5da18: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_28>
   5da20: 05 00 27 00 00 00 00 00      	ja +0x27 <LBB233_32>

000000000005da28 <LBB233_28>:
   5da28: 7b 3a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r3
   5da30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da38: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5da40: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5da48: 85 10 00 00 ef 61 ff ff      	call -0x9e11
   5da50: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5da58: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5da60: 79 a6 58 f5 00 00 00 00      	ldxdw r6, [r10 - 0xaa8]
   5da68: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_29>
   5da70: 05 00 2a 00 00 00 00 00      	ja +0x2a <LBB233_33>

000000000005da78 <LBB233_29>:
   5da78: 7b 3a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r3
   5da80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da88: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5da90: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5da98: 85 10 00 00 9c 61 ff ff      	call -0x9e64
   5daa0: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5daa8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5dab0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_30>
   5dab8: 05 00 2a 00 00 00 00 00      	ja +0x2a <LBB233_34>

000000000005dac0 <LBB233_30>:
   5dac0: 7b 3a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r3
   5dac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dad0: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5dad8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5dae0: 85 10 00 00 4d 48 ff ff      	call -0xb7b3
   5dae8: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5daf0: 79 a8 58 f8 00 00 00 00      	ldxdw r8, [r10 - 0x7a8]
   5daf8: 71 a1 82 f8 00 00 00 00      	ldxb r1, [r10 - 0x77e]
   5db00: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB233_31>
   5db08: 05 00 29 00 00 00 00 00      	ja +0x29 <LBB233_35>

000000000005db10 <LBB233_31>:
   5db10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db18: 07 01 00 00 d0 f5 ff ff      	add64 r1, -0xa30
   5db20: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5db28: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   5db38: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5db40: 85 10 00 00 ef 47 ff ff      	call -0xb811
   5db48: 79 a1 d0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa30]
   5db50: 79 a2 d8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa28]
   5db58: 05 00 ab ff 00 00 00 00      	ja -0x55 <LBB233_20>

000000000005db60 <LBB233_32>:
   5db60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db68: 07 01 00 00 10 f8 ff ff      	add64 r1, -0x7f0
   5db70: 18 04 00 00 c5 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ebc5
   5db80: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   5db88: 85 10 00 00 e6 47 ff ff      	call -0xb81a
   5db90: 79 a1 10 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7f0]
   5db98: 79 a2 18 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e8]
   5dba0: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   5dba8: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   5dbb0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   5dbb8: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   5dbc0: 05 00 a1 ff 00 00 00 00      	ja -0x5f <LBB233_21>

000000000005dbc8 <LBB233_33>:
   5dbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dbd0: 07 01 00 00 00 f8 ff ff      	add64 r1, -0x800
   5dbd8: 18 04 00 00 12 ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea12
   5dbe8: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   5dbf0: 85 10 00 00 d9 47 ff ff      	call -0xb827
   5dbf8: 79 a1 00 f8 00 00 00 00      	ldxdw r1, [r10 - 0x800]
   5dc00: 79 a2 08 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f8]
   5dc08: 05 00 95 ff 00 00 00 00      	ja -0x6b <LBB233_20>

000000000005dc10 <LBB233_34>:
   5dc10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc18: 07 01 00 00 f0 f7 ff ff      	add64 r1, -0x810
   5dc20: 18 04 00 00 e9 ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10eae9
   5dc30: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   5dc38: 85 10 00 00 d0 47 ff ff      	call -0xb830
   5dc40: 79 a1 f0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x810]
   5dc48: 79 a2 f8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x808]
   5dc50: 05 00 8c ff 00 00 00 00      	ja -0x74 <LBB233_20>

000000000005dc58 <LBB233_35>:
   5dc58: 7b 3a f0 f4 00 00 00 00      	stxdw [r10 - 0xb10], r3
   5dc60: 7b 1a e0 f4 00 00 00 00      	stxdw [r10 - 0xb20], r1
   5dc68: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5dc70: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   5dc78: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   5dc80: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   5dc88: 69 a1 80 f8 00 00 00 00      	ldxh r1, [r10 - 0x780]
   5dc90: 6b 1a 48 fe 00 00 00 00      	stxh [r10 - 0x1b8], r1
   5dc98: 61 a1 83 f8 00 00 00 00      	ldxw r1, [r10 - 0x77d]
   5dca0: 63 1a 30 fe 00 00 00 00      	stxw [r10 - 0x1d0], r1
   5dca8: 71 a1 87 f8 00 00 00 00      	ldxb r1, [r10 - 0x779]
   5dcb0: 73 1a 34 fe 00 00 00 00      	stxb [r10 - 0x1cc], r1
   5dcb8: 79 a9 68 f8 00 00 00 00      	ldxdw r9, [r10 - 0x798]
   5dcc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dcc8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5dcd0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5dcd8: 85 10 00 00 e2 61 ff ff      	call -0x9e1e
   5dce0: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5dce8: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5dcf0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_36>
   5dcf8: 05 00 1d 00 00 00 00 00      	ja +0x1d <LBB233_39>

000000000005dd00 <LBB233_36>:
   5dd00: 7b 3a d8 f4 00 00 00 00      	stxdw [r10 - 0xb28], r3
   5dd08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd10: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5dd18: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5dd20: 85 10 00 00 cd 5f ff ff      	call -0xa033
   5dd28: 79 a3 60 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7a0]
   5dd30: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5dd38: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_37>
   5dd40: 05 00 1d 00 00 00 00 00      	ja +0x1d <LBB233_40>

000000000005dd48 <LBB233_37>:
   5dd48: 7b 3a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r3
   5dd50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd58: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5dd60: 85 10 00 00 a2 35 01 00      	call 0x135a2
   5dd68: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   5dd70: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   5dd78: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5dd80: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   5dd88: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5dd90: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   5dd98: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   5dda0: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <LBB233_46>
   5dda8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ddb0: 07 01 00 00 c0 f7 ff ff      	add64 r1, -0x840
   5ddb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ddc0: 07 02 00 00 70 fe ff ff      	add64 r2, -0x190
   5ddc8: 85 10 00 00 b9 2d 01 00      	call 0x12db9
   5ddd0: 79 a1 c0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x840]
   5ddd8: 79 a2 c8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x838]
   5dde0: 05 00 11 00 00 00 00 00      	ja +0x11 <LBB233_41>

000000000005dde8 <LBB233_39>:
   5dde8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ddf0: 07 01 00 00 e0 f7 ff ff      	add64 r1, -0x820
   5ddf8: 18 04 00 00 0b ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea0b
   5de08: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   5de10: 85 10 00 00 95 47 ff ff      	call -0xb86b
   5de18: 79 a1 e0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x820]
   5de20: 79 a2 e8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x818]
   5de28: 05 00 08 00 00 00 00 00      	ja +0x8 <LBB233_41>

000000000005de30 <LBB233_40>:
   5de30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5de38: 07 01 00 00 d0 f7 ff ff      	add64 r1, -0x830
   5de40: 18 04 00 00 d2 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ebd2
   5de50: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   5de58: 85 10 00 00 8c 47 ff ff      	call -0xb874
   5de60: 79 a1 d0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x830]
   5de68: 79 a2 d8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x828]

000000000005de70 <LBB233_41>:
   5de70: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5de78: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   5de80: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2

000000000005de88 <LBB233_42>:
   5de88: 79 a2 f0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb10]
   5de90: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5de98: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5dea0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5dea8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB233_44>
   5deb0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5deb8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5dec0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

000000000005dec8 <LBB233_44>:
   5dec8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5ded0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5ded8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5dee0: 55 01 3d ff 00 00 00 00      	jne r1, 0x0, -0xc3 <LBB233_21>
   5dee8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5def0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5def8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5df00: 05 00 39 ff 00 00 00 00      	ja -0xc7 <LBB233_21>

000000000005df08 <LBB233_46>:
   5df08: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   5df10: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   5df18: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   5df20: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   5df28: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   5df30: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   5df38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5df40: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   5df48: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   5df50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5df58: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   5df60: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   5df68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5df70: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   5df78: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   5df80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5df88: 07 01 00 00 20 f8 ff ff      	add64 r1, -0x7e0
   5df90: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   5df98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfa0: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   5dfa8: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   5dfb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfb8: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   5dfc0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   5dfc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfd0: 07 01 00 00 50 f8 ff ff      	add64 r1, -0x7b0
   5dfd8: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5dfe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfe8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5dff0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5dff8: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   5e000: 85 10 00 00 4f 03 00 00      	call 0x34f
   5e008: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   5e010: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   5e018: 61 a3 08 f9 00 00 00 00      	ldxw r3, [r10 - 0x6f8]
   5e020: 7b 3a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r3
   5e028: 15 03 c8 ff 02 00 00 00      	jeq r3, 0x2, -0x38 <LBB233_41>
   5e030: 7b 2a c0 f4 00 00 00 00      	stxdw [r10 - 0xb40], r2
   5e038: 7b 1a c8 f4 00 00 00 00      	stxdw [r10 - 0xb38], r1
   5e040: 7b 8a d0 f4 00 00 00 00      	stxdw [r10 - 0xb30], r8
   5e048: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5e050: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   5e058: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5e060: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   5e068: 79 a7 78 f8 00 00 00 00      	ldxdw r7, [r10 - 0x788]
   5e070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e078: 07 01 00 00 e8 fe ff ff      	add64 r1, -0x118
   5e080: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e088: 07 02 00 00 80 f8 ff ff      	add64 r2, -0x780
   5e090: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   5e098: 85 10 00 00 43 5a 01 00      	call 0x15a43
   5e0a0: 79 a1 0c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f4]
   5e0a8: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   5e0b0: 79 a1 14 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6ec]
   5e0b8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   5e0c0: 79 a1 1c f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e4]
   5e0c8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   5e0d0: 79 a1 24 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6dc]
   5e0d8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   5e0e0: 61 a1 2c f9 00 00 00 00      	ldxw r1, [r10 - 0x6d4]
   5e0e8: 63 1a e0 fe 00 00 00 00      	stxw [r10 - 0x120], r1
   5e0f0: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   5e0f8: 15 01 a4 00 00 00 00 00      	jeq r1, 0x0, +0xa4 <LBB233_61>
   5e100: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   5e108: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5e110: 07 08 00 00 88 fe ff ff      	add64 r8, -0x178
   5e118: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5e120: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e128: 85 10 00 00 55 5d ff ff      	call -0xa2ab
   5e130: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5e138: 85 10 00 00 45 38 01 00      	call 0x13845
   5e140: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   5e148: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5e150: 07 08 00 00 58 f8 ff ff      	add64 r8, -0x7a8
   5e158: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5e160: 7b 7a b8 f4 00 00 00 00      	stxdw [r10 - 0xb48], r7
   5e168: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5e170: 85 10 00 00 4c 5d ff ff      	call -0xa2b4
   5e178: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e180: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   5e188: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5e190: 85 10 00 00 53 38 01 00      	call 0x13853
   5e198: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
   5e1a0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   5e1a8: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   5e1b8: 5d 21 9b 00 00 00 00 00      	jne r1, r2, +0x9b <LBB233_62>
   5e1c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1c8: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   5e1d0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5e1d8: 85 10 00 00 5e 35 01 00      	call 0x1355e
   5e1e0: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5e1e8: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   5e1f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e1f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e200: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e208: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_51>
   5e210: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e218: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e220: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e228 <LBB233_51>:
   5e228: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e230: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e238: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e240: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_53>
   5e248: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e250: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e258: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005e260 <LBB233_53>:
   5e260: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5e268: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   5e270: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e278: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e280: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e288: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_55>
   5e290: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e298: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e2a0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e2a8 <LBB233_55>:
   5e2a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e2b0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e2b8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e2c0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_57>
   5e2c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e2d0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e2d8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005e2e0 <LBB233_57>:
   5e2e0: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <LBB233_58>
   5e2e8: 05 00 a6 00 00 00 00 00      	ja +0xa6 <LBB233_70>

000000000005e2f0 <LBB233_58>:
   5e2f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e2f8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5e300: 18 02 00 00 d8 43 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1143d8
   5e310: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5e318: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   5e320: 85 10 00 00 3d 42 01 00      	call 0x1423d
   5e328: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5e330: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   5e338: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5e340: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   5e348: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   5e350: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   5e358: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   5e360: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   5e368: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   5e370: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5e378: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   5e380: 79 a1 10 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf0]
   5e388: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   5e390: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5e398: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5e3a0: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5e3a8: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5e3b0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5e3b8: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5e3c0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5e3c8: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5e3d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e3d8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5e3e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e3e8: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   5e3f0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e3f8: 85 10 00 00 e0 59 01 00      	call 0x159e0
   5e400: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e408: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e410: 55 00 90 00 00 00 00 00      	jne r0, 0x0, +0x90 <LBB233_71>
   5e418: 79 a1 50 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab0]
   5e420: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   5e428: 79 a1 e8 f4 00 00 00 00      	ldxdw r1, [r10 - 0xb18]
   5e430: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   5e438: 79 a1 78 fa 00 00 00 00      	ldxdw r1, [r10 - 0x588]
   5e440: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5e448: 79 a1 80 fa 00 00 00 00      	ldxdw r1, [r10 - 0x580]
   5e450: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   5e458: 79 a9 f0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x210]
   5e460: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e468: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e470: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   5e478: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e480: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   5e488: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5e490: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   5e498: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5e4a0: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   5e4a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e4b0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   5e4b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e4c0: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   5e4c8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e4d0: 85 10 00 00 c5 59 01 00      	call 0x159c5
   5e4d8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e4e0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e4e8: 15 00 a0 00 00 00 00 00      	jeq r0, 0x0, +0xa0 <LBB233_75>
   5e4f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e4f8: 07 01 00 00 50 f7 ff ff      	add64 r1, -0x8b0
   5e500: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   5e508: 85 10 00 00 4a eb 00 00      	call 0xeb4a
   5e510: 79 a3 58 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8a8]
   5e518: 79 a2 50 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8b0]
   5e520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e528: 07 01 00 00 40 f7 ff ff      	add64 r1, -0x8c0
   5e530: 18 04 00 00 5c e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e65c
   5e540: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5e548: 85 10 00 00 ae 46 ff ff      	call -0xb952
   5e550: 79 a3 48 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8b8]
   5e558: 79 a2 40 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c0]
   5e560: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   5e568: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5e570: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   5e578: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5e580: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   5e588: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5e590: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   5e598: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5e5a0: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   5e5a8: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5e5b0: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5e5b8: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5e5c0: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5e5c8: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5e5d0: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   5e5d8: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5e5e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e5e8: 07 01 00 00 30 f7 ff ff      	add64 r1, -0x8d0
   5e5f0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e5f8: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5e600: 85 10 00 00 e4 2c 01 00      	call 0x12ce4
   5e608: 79 a1 30 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8d0]
   5e610: 79 a2 38 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c8]
   5e618: 05 00 74 00 00 00 00 00      	ja +0x74 <LBB233_72>

000000000005e620 <LBB233_61>:
   5e620: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e628: 07 01 00 00 f0 f5 ff ff      	add64 r1, -0xa10
   5e630: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5e638: 85 10 00 00 6a 32 01 00      	call 0x1326a
   5e640: 79 a3 f8 f5 00 00 00 00      	ldxdw r3, [r10 - 0xa08]
   5e648: 79 a2 f0 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa10]
   5e650: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e658: 07 01 00 00 e0 f5 ff ff      	add64 r1, -0xa20
   5e660: 18 04 00 00 bd e4 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e4bd
   5e670: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   5e678: 85 10 00 00 88 46 ff ff      	call -0xb978
   5e680: 79 a1 e0 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa20]
   5e688: 79 a2 e8 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa18]
   5e690: 05 00 fb fe 00 00 00 00      	ja -0x105 <LBB233_41>

000000000005e698 <LBB233_62>:
   5e698: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   5e6a0: 7b 2a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r2
   5e6a8: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
   5e6b0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   5e6b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e6c0: 07 01 00 00 b0 f7 ff ff      	add64 r1, -0x850
   5e6c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e6d0: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   5e6d8: 85 10 00 00 97 2c 01 00      	call 0x12c97
   5e6e0: 79 a1 b0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x850]
   5e6e8: 79 a2 b8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x848]
   5e6f0: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   5e6f8: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   5e700: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   5e708: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2
   5e710: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5e718: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   5e720: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e728: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e730: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e738: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_64>
   5e740: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e748: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e750: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e758 <LBB233_64>:
   5e758: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e760: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e768: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e770: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_66>
   5e778: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e780: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e788: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005e790 <LBB233_66>:
   5e790: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5e798: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   5e7a0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e7a8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e7b0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e7b8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_68>
   5e7c0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e7c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e7d0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e7d8 <LBB233_68>:
   5e7d8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e7e0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e7e8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e7f0: 55 02 3d 00 00 00 00 00      	jne r2, 0x0, +0x3d <LBB233_74>
   5e7f8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e800: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e808: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5e810: bf 69 00 00 00 00 00 00      	mov64 r9, r6
   5e818: 05 00 cd fe 00 00 00 00      	ja -0x133 <LBB233_42>

000000000005e820 <LBB233_70>:
   5e820: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e828: 07 01 00 00 a0 f7 ff ff      	add64 r1, -0x860
   5e830: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   5e838: 85 10 00 00 2a 32 01 00      	call 0x1322a
   5e840: 79 a3 a8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x858]
   5e848: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
   5e850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e858: 07 01 00 00 90 f7 ff ff      	add64 r1, -0x870
   5e860: 18 04 00 00 bd e4 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e4bd
   5e870: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   5e878: 85 10 00 00 48 46 ff ff      	call -0xb9b8
   5e880: 79 a1 90 f7 00 00 00 00      	ldxdw r1, [r10 - 0x870]
   5e888: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   5e890: 05 00 25 00 00 00 00 00      	ja +0x25 <LBB233_72>

000000000005e898 <LBB233_71>:
   5e898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e8a0: 07 01 00 00 80 f7 ff ff      	add64 r1, -0x880
   5e8a8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5e8b0: 85 10 00 00 1b 32 01 00      	call 0x1321b
   5e8b8: 79 a3 88 f7 00 00 00 00      	ldxdw r3, [r10 - 0x878]
   5e8c0: 79 a2 80 f7 00 00 00 00      	ldxdw r2, [r10 - 0x880]
   5e8c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e8d0: 07 01 00 00 70 f7 ff ff      	add64 r1, -0x890
   5e8d8: 18 04 00 00 5c e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e65c
   5e8e8: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5e8f0: 85 10 00 00 39 46 ff ff      	call -0xb9c7
   5e8f8: 79 a3 78 f7 00 00 00 00      	ldxdw r3, [r10 - 0x888]
   5e900: 79 a2 70 f7 00 00 00 00      	ldxdw r2, [r10 - 0x890]
   5e908: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5e910: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5e918: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5e920: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5e928: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5e930: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5e938: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5e940: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5e948: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   5e950: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5e958: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   5e960: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5e968: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   5e970: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5e978: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   5e980: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5e988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e990: 07 01 00 00 60 f7 ff ff      	add64 r1, -0x8a0
   5e998: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e9a0: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5e9a8: 85 10 00 00 6f 2c 01 00      	call 0x12c6f
   5e9b0: 79 a1 60 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8a0]
   5e9b8: 79 a2 68 f7 00 00 00 00      	ldxdw r2, [r10 - 0x898]

000000000005e9c0 <LBB233_72>:
   5e9c0: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   5e9c8: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   5e9d0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1

000000000005e9d8 <LBB233_73>:
   5e9d8: 62 03 00 00 02 00 00 00      	stw [r3 + 0x0], 0x2

000000000005e9e0 <LBB233_74>:
   5e9e0: bf 69 00 00 00 00 00 00      	mov64 r9, r6
   5e9e8: 05 00 93 fe 00 00 00 00      	ja -0x16d <LBB233_42>

000000000005e9f0 <LBB233_75>:
   5e9f0: 79 a7 18 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1e8]
   5e9f8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5ea00: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5ea08: 7b 2a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r2
   5ea10: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ea18: 7b 2a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r2
   5ea20: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ea28: 7b 2a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r2
   5ea30: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5ea38: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5ea40: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5ea48: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5ea50: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ea58: 07 02 00 00 58 f8 ff ff      	add64 r2, -0x7a8
   5ea60: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5ea68: 85 10 00 00 12 59 01 00      	call 0x15912
   5ea70: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5ea78: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5ea80: 15 00 07 00 00 00 00 00      	jeq r0, 0x0, +0x7 <LBB233_77>
   5ea88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ea90: 07 01 00 00 20 f7 ff ff      	add64 r1, -0x8e0
   5ea98: b7 02 00 00 e7 07 00 00      	mov64 r2, 0x7e7
   5eaa0: 85 10 00 00 dd 31 01 00      	call 0x131dd
   5eaa8: 79 a1 20 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8e0]
   5eab0: 79 a2 28 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d8]
   5eab8: 05 00 e0 ff 00 00 00 00      	ja -0x20 <LBB233_72>

000000000005eac0 <LBB233_77>:
   5eac0: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   5eac8: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   5ead0: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   5ead8: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   5eae0: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   5eae8: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   5eaf0: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   5eaf8: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   5eb00: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5eb08: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   5eb10: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5eb18: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   5eb20: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5eb28: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   5eb30: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5eb38: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   5eb40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eb48: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   5eb50: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5eb58: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   5eb60: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5eb68: 85 10 00 00 f2 58 01 00      	call 0x158f2
   5eb70: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5eb78: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5eb80: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <LBB233_79>
   5eb88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eb90: 07 01 00 00 10 f7 ff ff      	add64 r1, -0x8f0
   5eb98: b7 02 00 00 df 07 00 00      	mov64 r2, 0x7df
   5eba0: 85 10 00 00 bd 31 01 00      	call 0x131bd
   5eba8: 79 a3 18 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8e8]
   5ebb0: 79 a2 10 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8f0]
   5ebb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ebc0: 07 01 00 00 00 f7 ff ff      	add64 r1, -0x900
   5ebc8: 18 04 00 00 a7 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10eba7
   5ebd8: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5ebe0: 85 10 00 00 db 45 ff ff      	call -0xba25
   5ebe8: 79 a3 08 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8f8]
   5ebf0: 79 a2 00 f7 00 00 00 00      	ldxdw r2, [r10 - 0x900]
   5ebf8: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   5ec00: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5ec08: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   5ec10: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5ec18: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   5ec20: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5ec28: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   5ec30: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5ec38: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   5ec40: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5ec48: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   5ec50: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5ec58: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   5ec60: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5ec68: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   5ec70: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5ec78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ec80: 07 01 00 00 f0 f6 ff ff      	add64 r1, -0x910
   5ec88: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ec90: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5ec98: 85 10 00 00 11 2c 01 00      	call 0x12c11
   5eca0: 79 a1 f0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x910]
   5eca8: 79 a2 f8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x908]
   5ecb0: 05 00 a1 ff 00 00 00 00      	ja -0x5f <LBB233_72>

000000000005ecb8 <LBB233_79>:
   5ecb8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5ecc0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ecc8: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   5ecd0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ecd8: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   5ece0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ece8: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   5ecf0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ecf8: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5ed00: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5ed08: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ed10: 7b 2a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r2
   5ed18: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ed20: 7b 2a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r2
   5ed28: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ed30: 7b 2a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r2
   5ed38: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ed40: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5ed48: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5ed50: 07 08 00 00 e0 ff ff ff      	add64 r8, -0x20
   5ed58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ed60: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   5ed68: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5ed70: 07 03 00 00 88 fe ff ff      	add64 r3, -0x178
   5ed78: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ed80: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5ed88: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5ed90: 85 10 00 00 10 27 01 00      	call 0x12710
   5ed98: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5eda0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5eda8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5edb0: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   5edb8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5edc0: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   5edc8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5edd0: 7b 2a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r2
   5edd8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ede0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5ede8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5edf0: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   5edf8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5ee00: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5ee08: 85 10 00 00 9e 58 01 00      	call 0x1589e
   5ee10: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5ee18: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5ee20: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <LBB233_81>
   5ee28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee30: 07 01 00 00 e0 f6 ff ff      	add64 r1, -0x920
   5ee38: b7 02 00 00 d9 07 00 00      	mov64 r2, 0x7d9
   5ee40: 85 10 00 00 69 31 01 00      	call 0x13169
   5ee48: 79 a3 e8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x918]
   5ee50: 79 a2 e0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x920]
   5ee58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee60: 07 01 00 00 d0 f6 ff ff      	add64 r1, -0x930
   5ee68: 18 04 00 00 a7 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10eba7
   5ee78: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5ee80: 85 10 00 00 87 45 ff ff      	call -0xba79
   5ee88: 79 a3 d8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x928]
   5ee90: 79 a2 d0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x930]
   5ee98: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   5eea0: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5eea8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5eeb0: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5eeb8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5eec0: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5eec8: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   5eed0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5eed8: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   5eee0: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5eee8: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   5eef0: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5eef8: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   5ef00: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5ef08: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   5ef10: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5ef18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ef20: 07 01 00 00 c0 f6 ff ff      	add64 r1, -0x940
   5ef28: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ef30: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5ef38: 85 10 00 00 bd 2b 01 00      	call 0x12bbd
   5ef40: 79 a1 c0 f6 00 00 00 00      	ldxdw r1, [r10 - 0x940]
   5ef48: 79 a2 c8 f6 00 00 00 00      	ldxdw r2, [r10 - 0x938]
   5ef50: 05 00 4d ff 00 00 00 00      	ja -0xb3 <LBB233_72>

000000000005ef58 <LBB233_81>:
   5ef58: 79 a1 40 f5 00 00 00 00      	ldxdw r1, [r10 - 0xac0]
   5ef60: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ef68: 15 01 5c 00 00 00 00 00      	jeq r1, 0x0, +0x5c <LBB233_84>
   5ef70: 79 a1 20 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7e0]
   5ef78: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ef80: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5ef88: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ef90: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ef98: 18 05 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r5, 0x10e58f
   5efa8: 7b 5a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r5
   5efb0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5efb8: 07 05 00 00 88 fe ff ff      	add64 r5, -0x178
   5efc0: 7b 5a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r5
   5efc8: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5efd0: 7b 4a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r4
   5efd8: 7b 3a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r3
   5efe0: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   5efe8: 7a 0a e8 ff 17 00 00 00      	stdw [r10 - 0x18], 0x17
   5eff0: 7a 0a f8 ff 20 00 00 00      	stdw [r10 - 0x8], 0x20
   5eff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f000: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5f008: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f010: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   5f018: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   5f020: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   5f028: 85 10 00 00 9c 40 01 00      	call 0x1409c
   5f030: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5f038: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   5f040: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5f048: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   5f050: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   5f058: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   5f060: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   5f068: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   5f070: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   5f078: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5f080: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   5f088: 79 a1 08 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf8]
   5f090: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   5f098: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5f0a0: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5f0a8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5f0b0: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5f0b8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5f0c0: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5f0c8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5f0d0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5f0d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f0e0: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5f0e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f0f0: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   5f0f8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5f100: 85 10 00 00 3f 58 01 00      	call 0x1583f
   5f108: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5f110: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5f118: 15 00 35 00 00 00 00 00      	jeq r0, 0x0, +0x35 <LBB233_85>
   5f120: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f128: 07 01 00 00 b0 f6 ff ff      	add64 r1, -0x950
   5f130: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5f138: 85 10 00 00 0a 31 01 00      	call 0x1310a
   5f140: 79 a3 b8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x948]
   5f148: 79 a2 b0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x950]
   5f150: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f158: 07 01 00 00 a0 f6 ff ff      	add64 r1, -0x960
   5f160: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5f170: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5f178: 85 10 00 00 28 45 ff ff      	call -0xbad8
   5f180: 79 a3 a8 f6 00 00 00 00      	ldxdw r3, [r10 - 0x958]
   5f188: 79 a2 a0 f6 00 00 00 00      	ldxdw r2, [r10 - 0x960]
   5f190: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5f198: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5f1a0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5f1a8: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5f1b0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5f1b8: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5f1c0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5f1c8: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5f1d0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   5f1d8: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5f1e0: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   5f1e8: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5f1f0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   5f1f8: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5f200: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   5f208: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5f210: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f218: 07 01 00 00 90 f6 ff ff      	add64 r1, -0x970
   5f220: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f228: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5f230: 85 10 00 00 5e 2b 01 00      	call 0x12b5e
   5f238: 79 a1 90 f6 00 00 00 00      	ldxdw r1, [r10 - 0x970]
   5f240: 79 a2 98 f6 00 00 00 00      	ldxdw r2, [r10 - 0x968]
   5f248: 05 00 ee fe 00 00 00 00      	ja -0x112 <LBB233_72>

000000000005f250 <LBB233_84>:
   5f250: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f258: 07 01 00 00 10 f6 ff ff      	add64 r1, -0x9f0
   5f260: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5f268: 85 10 00 00 e4 30 01 00      	call 0x130e4
   5f270: 79 a3 18 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9e8]
   5f278: 79 a2 10 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f0]
   5f280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f288: 07 01 00 00 00 f6 ff ff      	add64 r1, -0xa00
   5f290: 18 04 00 00 a7 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10eba7
   5f2a0: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5f2a8: 85 10 00 00 02 45 ff ff      	call -0xbafe
   5f2b0: 79 a1 00 f6 00 00 00 00      	ldxdw r1, [r10 - 0xa00]
   5f2b8: 79 a2 08 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9f8]
   5f2c0: 05 00 df fe 00 00 00 00      	ja -0x121 <LBB233_72>

000000000005f2c8 <LBB233_85>:
   5f2c8: 79 a1 08 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaf8]
   5f2d0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5f2d8: 15 01 4e 00 00 00 00 00      	jeq r1, 0x0, +0x4e <LBB233_89>
   5f2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f2e8: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5f2f0: 18 02 00 00 38 40 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x114038
   5f300: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5f308: 79 a4 30 f5 00 00 00 00      	ldxdw r4, [r10 - 0xad0]
   5f310: 85 10 00 00 3f 40 01 00      	call 0x1403f
   5f318: 79 a1 70 f8 00 00 00 00      	ldxdw r1, [r10 - 0x790]
   5f320: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   5f328: 79 a1 68 f8 00 00 00 00      	ldxdw r1, [r10 - 0x798]
   5f330: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   5f338: 79 a1 60 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a0]
   5f340: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   5f348: 79 a1 58 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7a8]
   5f350: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   5f358: 71 a1 78 f8 00 00 00 00      	ldxb r1, [r10 - 0x788]
   5f360: 79 a2 38 f5 00 00 00 00      	ldxdw r2, [r10 - 0xac8]
   5f368: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   5f370: 79 a2 d0 f4 00 00 00 00      	ldxdw r2, [r10 - 0xb30]
   5f378: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5f380: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5f388: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5f390: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5f398: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5f3a0: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5f3a8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5f3b0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5f3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f3c0: 07 01 00 00 58 f8 ff ff      	add64 r1, -0x7a8
   5f3c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f3d0: 07 02 00 00 88 fe ff ff      	add64 r2, -0x178
   5f3d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5f3e0: 85 10 00 00 e3 57 01 00      	call 0x157e3
   5f3e8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5f3f0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5f3f8: 15 00 39 00 00 00 00 00      	jeq r0, 0x0, +0x39 <LBB233_90>
   5f400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f408: 07 01 00 00 80 f6 ff ff      	add64 r1, -0x980
   5f410: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5f418: 85 10 00 00 ae 30 01 00      	call 0x130ae
   5f420: 79 a3 88 f6 00 00 00 00      	ldxdw r3, [r10 - 0x978]
   5f428: 79 a2 80 f6 00 00 00 00      	ldxdw r2, [r10 - 0x980]
   5f430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f438: 07 01 00 00 70 f6 ff ff      	add64 r1, -0x990
   5f440: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   5f450: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5f458: 85 10 00 00 cc 44 ff ff      	call -0xbb34
   5f460: 79 a3 78 f6 00 00 00 00      	ldxdw r3, [r10 - 0x988]
   5f468: 79 a2 70 f6 00 00 00 00      	ldxdw r2, [r10 - 0x990]
   5f470: 79 a4 d0 f4 00 00 00 00      	ldxdw r4, [r10 - 0xb30]
   5f478: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   5f480: 7b 1a 70 f8 00 00 00 00      	stxdw [r10 - 0x790], r1
   5f488: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   5f490: 7b 1a 68 f8 00 00 00 00      	stxdw [r10 - 0x798], r1
   5f498: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   5f4a0: 7b 1a 60 f8 00 00 00 00      	stxdw [r10 - 0x7a0], r1
   5f4a8: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5f4b0: 7b 1a 58 f8 00 00 00 00      	stxdw [r10 - 0x7a8], r1
   5f4b8: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   5f4c0: 7b 1a 78 f8 00 00 00 00      	stxdw [r10 - 0x788], r1
   5f4c8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   5f4d0: 7b 1a 80 f8 00 00 00 00      	stxdw [r10 - 0x780], r1
   5f4d8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   5f4e0: 7b 1a 88 f8 00 00 00 00      	stxdw [r10 - 0x778], r1
   5f4e8: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   5f4f0: 7b 1a 90 f8 00 00 00 00      	stxdw [r10 - 0x770], r1
   5f4f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f500: 07 01 00 00 60 f6 ff ff      	add64 r1, -0x9a0
   5f508: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f510: 07 04 00 00 58 f8 ff ff      	add64 r4, -0x7a8
   5f518: 85 10 00 00 01 2b 01 00      	call 0x12b01
   5f520: 79 a1 68 f6 00 00 00 00      	ldxdw r1, [r10 - 0x998]
   5f528: 79 a2 60 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9a0]

000000000005f530 <LBB233_88>:
   5f530: 79 a3 58 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaa8]
   5f538: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   5f540: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   5f548: 05 00 91 fe 00 00 00 00      	ja -0x16f <LBB233_73>

000000000005f550 <LBB233_89>:
   5f550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f558: 07 01 00 00 30 f6 ff ff      	add64 r1, -0x9d0
   5f560: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5f568: 85 10 00 00 84 30 01 00      	call 0x13084
   5f570: 79 a3 38 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9c8]
   5f578: 79 a2 30 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9d0]
   5f580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f588: 07 01 00 00 20 f6 ff ff      	add64 r1, -0x9e0
   5f590: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5f5a0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5f5a8: 85 10 00 00 a2 44 ff ff      	call -0xbb5e
   5f5b0: 79 a1 20 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9e0]
   5f5b8: 79 a2 28 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9d8]
   5f5c0: 05 00 7f fe 00 00 00 00      	ja -0x181 <LBB233_72>

000000000005f5c8 <LBB233_90>:
   5f5c8: 79 a7 50 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1b0]
   5f5d0: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   5f5d8: 15 01 85 00 00 00 00 00      	jeq r1, 0x0, +0x85 <LBB233_92>
   5f5e0: 79 a8 58 f5 00 00 00 00      	ldxdw r8, [r10 - 0xaa8]
   5f5e8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f5f0: 07 01 00 00 30 02 00 00      	add64 r1, 0x230
   5f5f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f600: 07 02 00 00 20 f8 ff ff      	add64 r2, -0x7e0
   5f608: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   5f610: 85 10 00 00 94 57 01 00      	call 0x15794
   5f618: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f620: 07 02 00 00 98 fd ff ff      	add64 r2, -0x268
   5f628: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f630: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   5f638: 85 10 00 00 8f 57 01 00      	call 0x1578f
   5f640: 79 a9 18 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1e8]
   5f648: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   5f650: 7b 1a 38 f5 00 00 00 00      	stxdw [r10 - 0xac8], r1
   5f658: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5f660: 7b 1a 30 f5 00 00 00 00      	stxdw [r10 - 0xad0], r1
   5f668: 69 a1 48 fe 00 00 00 00      	ldxh r1, [r10 - 0x1b8]
   5f670: 6b 18 88 02 00 00 00 00      	stxh [r8 + 0x288], r1
   5f678: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5f680: 7b 18 80 02 00 00 00 00      	stxdw [r8 + 0x280], r1
   5f688: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   5f690: 7b 18 78 02 00 00 00 00      	stxdw [r8 + 0x278], r1
   5f698: 61 a1 30 fe 00 00 00 00      	ldxw r1, [r10 - 0x1d0]
   5f6a0: 63 18 8b 02 00 00 00 00      	stxw [r8 + 0x28b], r1
   5f6a8: 71 a1 34 fe 00 00 00 00      	ldxb r1, [r10 - 0x1cc]
   5f6b0: 73 18 8f 02 00 00 00 00      	stxb [r8 + 0x28f], r1
   5f6b8: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   5f6c0: 7b 18 98 00 00 00 00 00      	stxdw [r8 + 0x98], r1
   5f6c8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   5f6d0: 7b 18 90 00 00 00 00 00      	stxdw [r8 + 0x90], r1
   5f6d8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f6e0: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
   5f6e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f6f0: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5f6f8: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   5f700: 85 10 00 00 76 57 01 00      	call 0x15776
   5f708: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   5f710: 7b 18 34 01 00 00 00 00      	stxdw [r8 + 0x134], r1
   5f718: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   5f720: 7b 18 3c 01 00 00 00 00      	stxdw [r8 + 0x13c], r1
   5f728: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   5f730: 7b 18 44 01 00 00 00 00      	stxdw [r8 + 0x144], r1
   5f738: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   5f740: 7b 18 4c 01 00 00 00 00      	stxdw [r8 + 0x14c], r1
   5f748: 61 a1 e0 fe 00 00 00 00      	ldxw r1, [r10 - 0x120]
   5f750: 63 18 54 01 00 00 00 00      	stxw [r8 + 0x154], r1
   5f758: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f760: 07 01 00 00 08 03 00 00      	add64 r1, 0x308
   5f768: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f770: 07 02 00 00 78 fa ff ff      	add64 r2, -0x588
   5f778: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   5f780: 85 10 00 00 66 57 01 00      	call 0x15766
   5f788: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   5f790: 7b 18 68 01 00 00 00 00      	stxdw [r8 + 0x168], r1
   5f798: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   5f7a0: 7b 18 70 01 00 00 00 00      	stxdw [r8 + 0x170], r1
   5f7a8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f7b0: 07 01 00 00 80 01 00 00      	add64 r1, 0x180
   5f7b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f7c0: 07 02 00 00 f0 fc ff ff      	add64 r2, -0x310
   5f7c8: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   5f7d0: 85 10 00 00 5c 57 01 00      	call 0x1575c
   5f7d8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f7e0: 07 01 00 00 c0 01 00 00      	add64 r1, 0x1c0
   5f7e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f7f0: 07 02 00 00 a8 fc ff ff      	add64 r2, -0x358
   5f7f8: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   5f800: 85 10 00 00 56 57 01 00      	call 0x15756
   5f808: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   5f810: 7b 18 0c 02 00 00 00 00      	stxdw [r8 + 0x20c], r1
   5f818: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   5f820: 7b 18 14 02 00 00 00 00      	stxdw [r8 + 0x214], r1
   5f828: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   5f830: 7b 18 1c 02 00 00 00 00      	stxdw [r8 + 0x21c], r1
   5f838: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   5f840: 7b 18 24 02 00 00 00 00      	stxdw [r8 + 0x224], r1
   5f848: 61 a1 a0 fc 00 00 00 00      	ldxw r1, [r10 - 0x360]
   5f850: 63 18 2c 02 00 00 00 00      	stxw [r8 + 0x22c], r1
   5f858: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5f860: 07 01 00 00 a0 02 00 00      	add64 r1, 0x2a0
   5f868: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f870: 07 02 00 00 48 fd ff ff      	add64 r2, -0x2b8
   5f878: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5f880: 85 10 00 00 46 57 01 00      	call 0x15746
   5f888: 69 a1 44 fd 00 00 00 00      	ldxh r1, [r10 - 0x2bc]
   5f890: 61 a2 40 fd 00 00 00 00      	ldxw r2, [r10 - 0x2c0]
   5f898: 79 a3 48 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab8]
   5f8a0: 63 38 30 01 00 00 00 00      	stxw [r8 + 0x130], r3
   5f8a8: 79 a3 18 f5 00 00 00 00      	ldxdw r3, [r10 - 0xae8]
   5f8b0: 63 38 08 02 00 00 00 00      	stxw [r8 + 0x208], r3
   5f8b8: 79 a3 e0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb20]
   5f8c0: 73 38 8a 02 00 00 00 00      	stxb [r8 + 0x28a], r3
   5f8c8: 79 a3 f8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb08]
   5f8d0: 73 38 e9 02 00 00 00 00      	stxb [r8 + 0x2e9], r3
   5f8d8: 7b 78 30 05 00 00 00 00      	stxdw [r8 + 0x530], r7
   5f8e0: 79 a3 d8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb28]
   5f8e8: 7b 38 28 05 00 00 00 00      	stxdw [r8 + 0x528], r3
   5f8f0: 79 a3 30 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad0]
   5f8f8: 7b 38 20 05 00 00 00 00      	stxdw [r8 + 0x520], r3
   5f900: 79 a3 38 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac8]
   5f908: 7b 38 18 05 00 00 00 00      	stxdw [r8 + 0x518], r3
   5f910: 7b 98 10 05 00 00 00 00      	stxdw [r8 + 0x510], r9
   5f918: 79 a3 50 f5 00 00 00 00      	ldxdw r3, [r10 - 0xab0]
   5f920: 7b 38 00 03 00 00 00 00      	stxdw [r8 + 0x300], r3
   5f928: 79 a3 e8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb18]
   5f930: 7b 38 f8 02 00 00 00 00      	stxdw [r8 + 0x2f8], r3
   5f938: 79 a3 10 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf0]
   5f940: 7b 38 f0 02 00 00 00 00      	stxdw [r8 + 0x2f0], r3
   5f948: 79 a3 00 f5 00 00 00 00      	ldxdw r3, [r10 - 0xb00]
   5f950: 7b 38 98 02 00 00 00 00      	stxdw [r8 + 0x298], r3
   5f958: 79 a3 08 f5 00 00 00 00      	ldxdw r3, [r10 - 0xaf8]
   5f960: 7b 38 90 02 00 00 00 00      	stxdw [r8 + 0x290], r3
   5f968: 7b 68 70 02 00 00 00 00      	stxdw [r8 + 0x270], r6
   5f970: 79 a3 f0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb10]
   5f978: 7b 38 68 02 00 00 00 00      	stxdw [r8 + 0x268], r3
   5f980: 79 a3 d0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb30]
   5f988: 7b 38 60 02 00 00 00 00      	stxdw [r8 + 0x260], r3
   5f990: 79 a3 40 f5 00 00 00 00      	ldxdw r3, [r10 - 0xac0]
   5f998: 7b 38 78 01 00 00 00 00      	stxdw [r8 + 0x178], r3
   5f9a0: 79 a3 28 f5 00 00 00 00      	ldxdw r3, [r10 - 0xad8]
   5f9a8: 7b 38 60 01 00 00 00 00      	stxdw [r8 + 0x160], r3
   5f9b0: 79 a3 20 f5 00 00 00 00      	ldxdw r3, [r10 - 0xae0]
   5f9b8: 7b 38 58 01 00 00 00 00      	stxdw [r8 + 0x158], r3
   5f9c0: 79 a3 b8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb48]
   5f9c8: 7b 38 a0 00 00 00 00 00      	stxdw [r8 + 0xa0], r3
   5f9d0: 79 a3 c0 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb40]
   5f9d8: 7b 38 88 00 00 00 00 00      	stxdw [r8 + 0x88], r3
   5f9e0: 79 a3 c8 f4 00 00 00 00      	ldxdw r3, [r10 - 0xb38]
   5f9e8: 7b 38 80 00 00 00 00 00      	stxdw [r8 + 0x80], r3
   5f9f0: 63 28 ea 02 00 00 00 00      	stxw [r8 + 0x2ea], r2
   5f9f8: 6b 18 ee 02 00 00 00 00      	stxh [r8 + 0x2ee], r1
   5fa00: 05 00 e9 fb 00 00 00 00      	ja -0x417 <LBB233_26>

000000000005fa08 <LBB233_92>:
   5fa08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fa10: 07 01 00 00 50 f6 ff ff      	add64 r1, -0x9b0
   5fa18: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5fa20: 85 10 00 00 ed 2f 01 00      	call 0x12fed
   5fa28: 79 a3 58 f6 00 00 00 00      	ldxdw r3, [r10 - 0x9a8]
   5fa30: 79 a2 50 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9b0]
   5fa38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5fa40: 07 01 00 00 40 f6 ff ff      	add64 r1, -0x9c0
   5fa48: 18 04 00 00 d2 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ebd2
   5fa58: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   5fa60: 85 10 00 00 0b 44 ff ff      	call -0xbbf5
   5fa68: 79 a1 48 f6 00 00 00 00      	ldxdw r1, [r10 - 0x9b8]
   5fa70: 79 a2 40 f6 00 00 00 00      	ldxdw r2, [r10 - 0x9c0]
   5fa78: 05 00 56 ff 00 00 00 00      	ja -0xaa <LBB233_88>
