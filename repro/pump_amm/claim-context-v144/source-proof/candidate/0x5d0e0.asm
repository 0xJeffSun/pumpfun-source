
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/formatter-restoration-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000005d0e0 <_ZN159_$LT$pump_amm_recovered..incentives..ClaimTokenIncentives$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..incentives..ClaimTokenIncentivesBumps$GT$$GT$12try_accounts17hdb24ff82e5418163E>:
   5d0e0: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   5d0e8: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   5d0f0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   5d0f8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d100: 55 01 10 00 00 00 00 00      	jne r1, 0x0, +0x10 <LBB233_2>
   5d108: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d110: 07 01 00 00 c0 f7 ff ff      	add64 r1, -0x840
   5d118: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5d120: 85 10 00 00 37 33 01 00      	call 0x13337
   5d128: 79 a2 c0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x840]
   5d130: 15 02 38 00 02 00 00 00      	jeq r2, 0x2, +0x38 <LBB233_3>
   5d138: 79 a3 c8 f7 00 00 00 00      	ldxdw r3, [r10 - 0x838]
   5d140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d148: 07 01 00 00 b0 f7 ff ff      	add64 r1, -0x850
   5d150: 18 04 00 00 24 d1 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d124
   5d160: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   5d168: 85 10 00 00 2a 49 ff ff      	call -0xb6d6
   5d170: 79 a1 b0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x850]
   5d178: 79 a2 b8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x848]
   5d180: 05 00 44 01 00 00 00 00      	ja +0x144 <LBB233_39>

000000000005d188 <LBB233_2>:
   5d188: 79 57 08 f0 00 00 00 00      	ldxdw r7, [r5 - 0xff8]
   5d190: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5d198: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   5d1a0: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   5d1a8: 7b 39 00 00 00 00 00 00      	stxdw [r9 + 0x0], r3
   5d1b0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5d1b8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5d1c0: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   5d1c8: 7b 2a 70 fa 00 00 00 00      	stxdw [r10 - 0x590], r2
   5d1d0: 15 03 24 00 00 00 00 00      	jeq r3, 0x0, +0x24 <LBB233_3>
   5d1d8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5d1e0: 7b 2a 78 fa 00 00 00 00      	stxdw [r10 - 0x588], r2
   5d1e8: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   5d1f0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d1f8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5d200: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5d208: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d210: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d218: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d220: 85 10 00 00 32 62 ff ff      	call -0x9dce
   5d228: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5d230: 15 01 3a 00 00 00 00 00      	jeq r1, 0x0, +0x3a <LBB233_14>
   5d238: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5d248: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5d250: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5d258: 07 03 00 00 e0 fd ff ff      	add64 r3, -0x220
   5d260: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   5d268: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5d270: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <LBB233_7>
   5d278: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

000000000005d280 <LBB233_7>:
   5d280: 7b 8a 90 f7 00 00 00 00      	stxdw [r10 - 0x870], r8
   5d288: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB233_9>
   5d290: bf 32 00 00 00 00 00 00      	mov64 r2, r3

000000000005d298 <LBB233_9>:
   5d298: 18 08 00 00 e0 7d 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300007de0
   5d2a8: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <LBB233_11>
   5d2b0: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   5d2b8: bf 28 00 00 00 00 00 00      	mov64 r8, r2

000000000005d2c0 <LBB233_11>:
   5d2c0: 7b 7a 98 f7 00 00 00 00      	stxdw [r10 - 0x868], r7
   5d2c8: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   5d2d8: 2d 18 0a 00 00 00 00 00      	jgt r8, r1, +0xa <LBB233_13>
   5d2e0: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   5d2e8: b7 02 00 00 20 02 00 00      	mov64 r2, 0x220
   5d2f0: 85 10 00 00 fe 4a 01 00      	call 0x14afe

000000000005d2f8 <LBB233_3>:
   5d2f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d300: 07 01 00 00 a0 f7 ff ff      	add64 r1, -0x860
   5d308: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5d310: 85 10 00 00 f9 32 01 00      	call 0x132f9
   5d318: 79 a1 a0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x860]
   5d320: 79 a2 a8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x858]
   5d328: 05 00 0f 01 00 00 00 00      	ja +0x10f <LBB233_39>

000000000005d330 <LBB233_13>:
   5d330: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   5d340: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   5d348: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d350: 07 02 00 00 e0 fd ff ff      	add64 r2, -0x220
   5d358: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5d360: b7 03 00 00 20 02 00 00      	mov64 r3, 0x220
   5d368: 85 10 00 00 13 5a 01 00      	call 0x15a13
   5d370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d378: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d380: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d388: 85 10 00 00 c8 45 ff ff      	call -0xba38
   5d390: 79 a7 e8 fd 00 00 00 00      	ldxdw r7, [r10 - 0x218]
   5d398: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d3a0: 61 a1 90 fe 00 00 00 00      	ldxw r1, [r10 - 0x170]
   5d3a8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB233_16>
   5d3b0: 05 00 15 00 00 00 00 00      	ja +0x15 <LBB233_15>

000000000005d3b8 <LBB233_16>:
   5d3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d3c0: 07 01 00 00 e0 f7 ff ff      	add64 r1, -0x820
   5d3c8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5d3d0: 18 04 00 00 d7 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcd7
   5d3e0: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5d3e8: 85 10 00 00 da 48 ff ff      	call -0xb726
   5d3f0: 79 a1 e0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x820]
   5d3f8: 79 a2 e8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x818]
   5d400: 05 00 f4 00 00 00 00 00      	ja +0xf4 <LBB233_39>

000000000005d408 <LBB233_14>:
   5d408: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   5d410: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   5d418: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d420: 07 01 00 00 d0 f7 ff ff      	add64 r1, -0x830
   5d428: 18 04 00 00 89 d7 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d789
   5d438: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5d440: 85 10 00 00 cf 48 ff ff      	call -0xb731
   5d448: 79 a1 d0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x830]
   5d450: 79 a2 d8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x828]
   5d458: 05 00 e9 00 00 00 00 00      	ja +0xe9 <LBB233_39>

000000000005d460 <LBB233_15>:
   5d460: 7b 1a 78 f7 00 00 00 00      	stxdw [r10 - 0x888], r1
   5d468: 7b 2a 80 f7 00 00 00 00      	stxdw [r10 - 0x880], r2
   5d470: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5d478: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5d480: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5d488: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5d490: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   5d498: 7b 1a 88 f7 00 00 00 00      	stxdw [r10 - 0x878], r1
   5d4a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d4a8: 07 01 00 00 f0 fa ff ff      	add64 r1, -0x510
   5d4b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d4b8: 07 02 00 00 08 fe ff ff      	add64 r2, -0x1f8
   5d4c0: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   5d4c8: 85 10 00 00 e7 59 01 00      	call 0x159e7
   5d4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d4d8: 07 01 00 00 a8 fa ff ff      	add64 r1, -0x558
   5d4e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d4e8: 07 02 00 00 48 fe ff ff      	add64 r2, -0x1b8
   5d4f0: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   5d4f8: 85 10 00 00 e1 59 01 00      	call 0x159e1
   5d500: 79 a1 94 fe 00 00 00 00      	ldxdw r1, [r10 - 0x16c]
   5d508: 7b 1a 80 fa 00 00 00 00      	stxdw [r10 - 0x580], r1
   5d510: 79 a1 9c fe 00 00 00 00      	ldxdw r1, [r10 - 0x164]
   5d518: 7b 1a 88 fa 00 00 00 00      	stxdw [r10 - 0x578], r1
   5d520: 79 a1 a4 fe 00 00 00 00      	ldxdw r1, [r10 - 0x15c]
   5d528: 7b 1a 90 fa 00 00 00 00      	stxdw [r10 - 0x570], r1
   5d530: 79 a1 ac fe 00 00 00 00      	ldxdw r1, [r10 - 0x154]
   5d538: 7b 1a 98 fa 00 00 00 00      	stxdw [r10 - 0x568], r1
   5d540: 61 a1 b4 fe 00 00 00 00      	ldxw r1, [r10 - 0x14c]
   5d548: 63 1a a0 fa 00 00 00 00      	stxw [r10 - 0x560], r1
   5d550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d558: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d560: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d568: 85 10 00 00 9b 61 ff ff      	call -0x9e65
   5d570: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   5d578: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d580: 71 a1 39 fe 00 00 00 00      	ldxb r1, [r10 - 0x1c7]
   5d588: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB233_18>
   5d590: 05 00 09 00 00 00 00 00      	ja +0x9 <LBB233_17>

000000000005d598 <LBB233_18>:
   5d598: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d5a0: 07 01 00 00 f0 f7 ff ff      	add64 r1, -0x810
   5d5a8: 18 04 00 00 df d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d6df
   5d5b8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5d5c0: 85 10 00 00 9f 48 ff ff      	call -0xb761
   5d5c8: 79 a1 f0 f7 00 00 00 00      	ldxdw r1, [r10 - 0x810]
   5d5d0: 79 a2 f8 f7 00 00 00 00      	ldxdw r2, [r10 - 0x808]
   5d5d8: 05 00 b9 00 00 00 00 00      	ja +0xb9 <LBB233_39>

000000000005d5e0 <LBB233_17>:
   5d5e0: 7b 1a 58 f7 00 00 00 00      	stxdw [r10 - 0x8a8], r1
   5d5e8: 7b 2a 70 f7 00 00 00 00      	stxdw [r10 - 0x890], r2
   5d5f0: 7b 3a 60 f7 00 00 00 00      	stxdw [r10 - 0x8a0], r3
   5d5f8: 7b 7a 68 f7 00 00 00 00      	stxdw [r10 - 0x898], r7
   5d600: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d608: 07 01 00 00 48 fb ff ff      	add64 r1, -0x4b8
   5d610: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d618: 07 02 00 00 f0 fd ff ff      	add64 r2, -0x210
   5d620: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5d628: 85 10 00 00 bb 59 01 00      	call 0x159bb
   5d630: 61 a1 3a fe 00 00 00 00      	ldxw r1, [r10 - 0x1c6]
   5d638: 63 1a 40 fb 00 00 00 00      	stxw [r10 - 0x4c0], r1
   5d640: 69 a1 3e fe 00 00 00 00      	ldxh r1, [r10 - 0x1c2]
   5d648: 6b 1a 44 fb 00 00 00 00      	stxh [r10 - 0x4bc], r1
   5d650: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d658: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d660: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d668: 85 10 00 00 83 45 ff ff      	call -0xba7d
   5d670: 61 a7 e0 fd 00 00 00 00      	ldxw r7, [r10 - 0x220]
   5d678: 15 07 01 00 02 00 00 00      	jeq r7, 0x2, +0x1 <LBB233_20>
   5d680: 05 00 0b 00 00 00 00 00      	ja +0xb <LBB233_19>

000000000005d688 <LBB233_20>:
   5d688: 79 a3 f0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x210]
   5d690: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   5d698: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d6a0: 07 01 00 00 00 f8 ff ff      	add64 r1, -0x800
   5d6a8: 18 04 00 00 e4 d1 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d1e4
   5d6b8: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   5d6c0: 85 10 00 00 7f 48 ff ff      	call -0xb781
   5d6c8: 79 a1 00 f8 00 00 00 00      	ldxdw r1, [r10 - 0x800]
   5d6d0: 79 a2 08 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7f8]
   5d6d8: 05 00 99 00 00 00 00 00      	ja +0x99 <LBB233_39>

000000000005d6e0 <LBB233_19>:
   5d6e0: 7b 8a 40 f7 00 00 00 00      	stxdw [r10 - 0x8c0], r8
   5d6e8: 61 a1 e4 fd 00 00 00 00      	ldxw r1, [r10 - 0x21c]
   5d6f0: 7b 1a 50 f7 00 00 00 00      	stxdw [r10 - 0x8b0], r1
   5d6f8: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5d700: 7b 1a 48 f7 00 00 00 00      	stxdw [r10 - 0x8b8], r1
   5d708: 79 a8 f0 fd 00 00 00 00      	ldxdw r8, [r10 - 0x210]
   5d710: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d718: 07 01 00 00 b0 fb ff ff      	add64 r1, -0x450
   5d720: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5d728: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   5d730: b7 03 00 00 68 00 00 00      	mov64 r3, 0x68
   5d738: 85 10 00 00 99 59 01 00      	call 0x15999
   5d740: 7b 8a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r8
   5d748: 79 a1 48 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b8]
   5d750: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   5d758: 79 a1 50 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8b0]
   5d760: 63 1a 9c fb 00 00 00 00      	stxw [r10 - 0x464], r1
   5d768: 63 7a 98 fb 00 00 00 00      	stxw [r10 - 0x468], r7
   5d770: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d778: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d780: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d788: 85 10 00 00 32 45 ff ff      	call -0xbace
   5d790: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   5d798: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d7a0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_21>
   5d7a8: 05 00 1c 00 00 00 00 00      	ja +0x1c <LBB233_22>

000000000005d7b0 <LBB233_21>:
   5d7b0: 7b 3a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r3
   5d7b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d7c0: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d7c8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d7d0: 85 10 00 00 3e 62 ff ff      	call -0x9dc2
   5d7d8: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   5d7e0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d7e8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_23>
   5d7f0: 05 00 1c 00 00 00 00 00      	ja +0x1c <LBB233_24>

000000000005d7f8 <LBB233_23>:
   5d7f8: 7b 3a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r3
   5d800: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d808: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d810: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d818: 85 10 00 00 ec 61 ff ff      	call -0x9e14
   5d820: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   5d828: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d830: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_25>
   5d838: 05 00 1c 00 00 00 00 00      	ja +0x1c <LBB233_29>

000000000005d840 <LBB233_25>:
   5d840: 7b 3a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r3
   5d848: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5d850: 15 01 22 00 00 00 00 00      	jeq r1, 0x0, +0x22 <LBB233_28>
   5d858: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5d860: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   5d868: 79 97 00 00 00 00 00 00      	ldxdw r7, [r9 + 0x0]
   5d870: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   5d878: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   5d880: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5d888: 05 00 23 00 00 00 00 00      	ja +0x23 <LBB233_27>

000000000005d890 <LBB233_22>:
   5d890: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d898: 07 01 00 00 60 fa ff ff      	add64 r1, -0x5a0
   5d8a0: 18 04 00 00 f5 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcf5
   5d8b0: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   5d8b8: 85 10 00 00 40 48 ff ff      	call -0xb7c0
   5d8c0: 79 a1 60 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5a0]
   5d8c8: 79 a2 68 fa 00 00 00 00      	ldxdw r2, [r10 - 0x598]
   5d8d0: 05 00 5a 00 00 00 00 00      	ja +0x5a <LBB233_39>

000000000005d8d8 <LBB233_24>:
   5d8d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d8e0: 07 01 00 00 50 fa ff ff      	add64 r1, -0x5b0
   5d8e8: 18 04 00 00 42 db 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10db42
   5d8f8: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   5d900: 85 10 00 00 37 48 ff ff      	call -0xb7c9
   5d908: 79 a1 50 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b0]
   5d910: 79 a2 58 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a8]
   5d918: 05 00 51 00 00 00 00 00      	ja +0x51 <LBB233_39>

000000000005d920 <LBB233_29>:
   5d920: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d928: 07 01 00 00 40 fa ff ff      	add64 r1, -0x5c0
   5d930: 18 04 00 00 19 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dc19
   5d940: b7 05 00 00 18 00 00 00      	mov64 r5, 0x18
   5d948: 85 10 00 00 2e 48 ff ff      	call -0xb7d2
   5d950: 79 a1 40 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c0]
   5d958: 79 a2 48 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5b8]
   5d960: 05 00 48 00 00 00 00 00      	ja +0x48 <LBB233_39>

000000000005d968 <LBB233_28>:
   5d968: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d970: 07 01 00 00 30 fa ff ff      	add64 r1, -0x5d0
   5d978: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5d980: 85 10 00 00 2b 32 01 00      	call 0x1322b
   5d988: 79 a7 38 fa 00 00 00 00      	ldxdw r7, [r10 - 0x5c8]
   5d990: 79 a2 30 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5d0]
   5d998: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_27>
   5d9a0: 05 00 37 00 00 00 00 00      	ja +0x37 <LBB233_30>

000000000005d9a8 <LBB233_27>:
   5d9a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d9b0: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d9b8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5d9c0: 85 10 00 00 45 62 ff ff      	call -0x9dbb
   5d9c8: 79 a8 e8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x218]
   5d9d0: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5d9d8: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_31>
   5d9e0: 05 00 1c 00 00 00 00 00      	ja +0x1c <LBB233_32>

000000000005d9e8 <LBB233_31>:
   5d9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5d9f0: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5d9f8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5da00: 85 10 00 00 31 60 ff ff      	call -0x9fcf
   5da08: 79 a3 e8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x218]
   5da10: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   5da18: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB233_33>
   5da20: 05 00 1e 00 00 00 00 00      	ja +0x1e <LBB233_34>

000000000005da28 <LBB233_33>:
   5da28: 7b 3a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r3
   5da30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da38: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5da40: 85 10 00 00 30 34 01 00      	call 0x13430
   5da48: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5da50: 7b 1a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r1
   5da58: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5da60: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   5da68: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5da70: 7b 1a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r1
   5da78: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5da80: 15 01 28 00 00 00 00 00      	jeq r1, 0x0, +0x28 <LBB233_35>
   5da88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5da90: 07 01 00 00 f0 f9 ff ff      	add64 r1, -0x610
   5da98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5daa0: 07 02 00 00 50 fc ff ff      	add64 r2, -0x3b0
   5daa8: 85 10 00 00 47 2c 01 00      	call 0x12c47
   5dab0: 79 a1 f0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x610]
   5dab8: 79 a2 f8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x608]
   5dac0: 05 00 1c 00 00 00 00 00      	ja +0x1c <LBB233_39>

000000000005dac8 <LBB233_32>:
   5dac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dad0: 07 01 00 00 10 fa ff ff      	add64 r1, -0x5f0
   5dad8: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   5dae0: 18 04 00 00 3b db 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10db3b
   5daf0: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   5daf8: 85 10 00 00 f8 47 ff ff      	call -0xb808
   5db00: 79 a1 10 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5f0]
   5db08: 79 a2 18 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e8]
   5db10: 05 00 12 00 00 00 00 00      	ja +0x12 <LBB233_39>

000000000005db18 <LBB233_34>:
   5db18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db20: 07 01 00 00 00 fa ff ff      	add64 r1, -0x600
   5db28: 18 04 00 00 02 dd 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dd02
   5db38: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   5db40: 85 10 00 00 ef 47 ff ff      	call -0xb811
   5db48: 79 a1 00 fa 00 00 00 00      	ldxdw r1, [r10 - 0x600]
   5db50: 79 a2 08 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5f8]
   5db58: 05 00 09 00 00 00 00 00      	ja +0x9 <LBB233_39>

000000000005db60 <LBB233_30>:
   5db60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5db68: 07 01 00 00 20 fa ff ff      	add64 r1, -0x5e0
   5db70: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   5db78: 18 04 00 00 2c db 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10db2c
   5db88: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5db90: 85 10 00 00 e5 47 ff ff      	call -0xb81b
   5db98: 79 a1 20 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5e0]
   5dba0: 79 a2 28 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5d8]

000000000005dba8 <LBB233_39>:
   5dba8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5dbb0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1

000000000005dbb8 <LBB233_82>:
   5dbb8: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2

000000000005dbc0 <LBB233_83>:
   5dbc0: 95 00 00 00 00 00 00 00      	exit

000000000005dbc8 <LBB233_35>:
   5dbc8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   5dbd0: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   5dbd8: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   5dbe0: 7b 1a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r1
   5dbe8: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   5dbf0: 7b 1a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r1
   5dbf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc00: 07 01 00 00 18 fc ff ff      	add64 r1, -0x3e8
   5dc08: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   5dc10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc18: 07 01 00 00 20 fc ff ff      	add64 r1, -0x3e0
   5dc20: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   5dc28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc30: 07 01 00 00 98 fb ff ff      	add64 r1, -0x468
   5dc38: 7b 1a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r1
   5dc40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc48: 07 01 00 00 70 fa ff ff      	add64 r1, -0x590
   5dc50: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5dc58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc60: 07 01 00 00 30 fc ff ff      	add64 r1, -0x3d0
   5dc68: 7b 1a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r1
   5dc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc78: 07 01 00 00 28 fc ff ff      	add64 r1, -0x3d8
   5dc80: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   5dc88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dc90: 07 01 00 00 78 fa ff ff      	add64 r1, -0x588
   5dc98: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5dca0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dca8: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5dcb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5dcb8: 07 02 00 00 68 fc ff ff      	add64 r2, -0x398
   5dcc0: 85 10 00 00 2e 03 00 00      	call 0x32e
   5dcc8: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   5dcd0: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5dcd8: 61 a3 90 fe 00 00 00 00      	ldxw r3, [r10 - 0x170]
   5dce0: 15 03 d8 ff 02 00 00 00      	jeq r3, 0x2, -0x28 <LBB233_39>
   5dce8: 7b 3a 38 f7 00 00 00 00      	stxdw [r10 - 0x8c8], r3
   5dcf0: 7b 2a 48 f7 00 00 00 00      	stxdw [r10 - 0x8b8], r2
   5dcf8: 7b 1a 50 f7 00 00 00 00      	stxdw [r10 - 0x8b0], r1
   5dd00: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5dd08: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   5dd10: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5dd18: 7b 1a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r1
   5dd20: 79 a9 00 fe 00 00 00 00      	ldxdw r9, [r10 - 0x200]
   5dd28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dd30: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   5dd38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5dd40: 07 02 00 00 08 fe ff ff      	add64 r2, -0x1f8
   5dd48: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   5dd50: 85 10 00 00 d6 58 01 00      	call 0x158d6
   5dd58: 79 a1 94 fe 00 00 00 00      	ldxdw r1, [r10 - 0x16c]
   5dd60: 7b 1a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r1
   5dd68: 79 a1 9c fe 00 00 00 00      	ldxdw r1, [r10 - 0x164]
   5dd70: 7b 1a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r1
   5dd78: 79 a1 a4 fe 00 00 00 00      	ldxdw r1, [r10 - 0x15c]
   5dd80: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   5dd88: 79 a1 ac fe 00 00 00 00      	ldxdw r1, [r10 - 0x154]
   5dd90: 7b 1a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r1
   5dd98: 61 a1 b4 fe 00 00 00 00      	ldxw r1, [r10 - 0x14c]
   5dda0: 63 1a c0 fc 00 00 00 00      	stxw [r10 - 0x340], r1
   5dda8: 71 91 29 00 00 00 00 00      	ldxb r1, [r9 + 0x29]
   5ddb0: 15 01 a6 00 00 00 00 00      	jeq r1, 0x0, +0xa6 <LBB233_40>
   5ddb8: 7b 8a 28 f7 00 00 00 00      	stxdw [r10 - 0x8d8], r8
   5ddc0: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5ddc8: 07 08 00 00 68 fc ff ff      	add64 r8, -0x398
   5ddd0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5ddd8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5dde0: 85 10 00 00 be 5d ff ff      	call -0xa242
   5dde8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5ddf0: 85 10 00 00 d8 36 01 00      	call 0x136d8
   5ddf8: 7b 0a 30 f7 00 00 00 00      	stxdw [r10 - 0x8d0], r0
   5de00: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   5de08: 07 08 00 00 e0 fd ff ff      	add64 r8, -0x220
   5de10: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   5de18: 7b 9a 20 f7 00 00 00 00      	stxdw [r10 - 0x8e0], r9
   5de20: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5de28: 85 10 00 00 b5 5d ff ff      	call -0xa24b
   5de30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5de38: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   5de40: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   5de48: 85 10 00 00 e6 36 01 00      	call 0x136e6
   5de50: 79 a3 c8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x238]
   5de58: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   5de60: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   5de70: 5d 21 9d 00 00 00 00 00      	jne r1, r2, +0x9d <LBB233_51>
   5de78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5de80: 07 01 00 00 38 fc ff ff      	add64 r1, -0x3c8
   5de88: 79 a2 30 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d0]
   5de90: 85 10 00 00 f1 33 01 00      	call 0x133f1
   5de98: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5dea0: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   5dea8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5deb0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5deb8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5dec0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_44>
   5dec8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5ded0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5ded8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005dee0 <LBB233_44>:
   5dee0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5dee8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5def0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5def8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_46>
   5df00: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5df08: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5df10: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005df18 <LBB233_46>:
   5df18: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5df20: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   5df28: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5df30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5df38: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5df40: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_48>
   5df48: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5df50: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5df58: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005df60 <LBB233_48>:
   5df60: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5df68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5df70: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5df78: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_50>
   5df80: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5df88: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5df90: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005df98 <LBB233_50>:
   5df98: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <LBB233_60>
   5dfa0: 05 00 a6 00 00 00 00 00      	ja +0xa6 <LBB233_59>

000000000005dfa8 <LBB233_60>:
   5dfa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5dfb0: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5dfb8: 18 02 00 00 f8 34 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1134f8
   5dfc8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5dfd0: 79 a4 90 f7 00 00 00 00      	ldxdw r4, [r10 - 0x870]
   5dfd8: 85 10 00 00 d0 40 01 00      	call 0x140d0
   5dfe0: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5dfe8: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   5dff0: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5dff8: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   5e000: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5e008: 7b 1a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r1
   5e010: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5e018: 7b 1a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r1
   5e020: 71 a1 00 fe 00 00 00 00      	ldxb r1, [r10 - 0x200]
   5e028: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   5e030: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   5e038: 79 a1 40 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8c0]
   5e040: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e048: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   5e050: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5e058: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e060: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5e068: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5e070: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e078: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5e080: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e088: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5e090: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e098: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5e0a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e0a8: 07 02 00 00 60 fd ff ff      	add64 r2, -0x2a0
   5e0b0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e0b8: 85 10 00 00 72 58 01 00      	call 0x15872
   5e0c0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e0c8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e0d0: 55 00 8f 00 00 00 00 00      	jne r0, 0x0, +0x8f <LBB233_62>
   5e0d8: 79 a2 40 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8c0]
   5e0e0: 79 21 20 00 00 00 00 00      	ldxdw r1, [r2 + 0x20]
   5e0e8: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   5e0f0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5e0f8: 7b 1a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r1
   5e100: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5e108: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   5e110: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5e118: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   5e120: 79 a1 f0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x410]
   5e128: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   5e130: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5e138: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5e140: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5e148: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   5e150: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5e158: 7b 1a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r1
   5e160: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5e168: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5e170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e178: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   5e180: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e188: 07 02 00 00 68 fc ff ff      	add64 r2, -0x398
   5e190: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e198: 85 10 00 00 56 58 01 00      	call 0x15856
   5e1a0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e1a8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e1b0: 15 00 9c 00 00 00 00 00      	jeq r0, 0x0, +0x9c <LBB233_63>
   5e1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1c0: 07 01 00 00 80 f9 ff ff      	add64 r1, -0x680
   5e1c8: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   5e1d0: 85 10 00 00 1f ea 00 00      	call 0xea1f
   5e1d8: 79 a3 88 f9 00 00 00 00      	ldxdw r3, [r10 - 0x678]
   5e1e0: 79 a2 80 f9 00 00 00 00      	ldxdw r2, [r10 - 0x680]
   5e1e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e1f0: 07 01 00 00 70 f9 ff ff      	add64 r1, -0x690
   5e1f8: 18 04 00 00 89 d7 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d789
   5e208: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5e210: 85 10 00 00 15 47 ff ff      	call -0xb8eb
   5e218: 79 a3 78 f9 00 00 00 00      	ldxdw r3, [r10 - 0x688]
   5e220: 79 a2 70 f9 00 00 00 00      	ldxdw r2, [r10 - 0x690]
   5e228: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   5e230: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e238: 79 a1 d0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x230]
   5e240: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5e248: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   5e250: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5e258: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   5e260: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5e268: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   5e270: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   5e278: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   5e280: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   5e288: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5e290: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5e298: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   5e2a0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   5e2a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e2b0: 07 01 00 00 60 f9 ff ff      	add64 r1, -0x6a0
   5e2b8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e2c0: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5e2c8: 85 10 00 00 75 2b 01 00      	call 0x12b75
   5e2d0: 79 a1 60 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a0]
   5e2d8: 79 a2 68 f9 00 00 00 00      	ldxdw r2, [r10 - 0x698]
   5e2e0: 05 00 18 ff 00 00 00 00      	ja -0xe8 <LBB233_39>

000000000005e2e8 <LBB233_40>:
   5e2e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e2f0: 07 01 00 00 20 f8 ff ff      	add64 r1, -0x7e0
   5e2f8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5e300: 85 10 00 00 fb 30 01 00      	call 0x130fb
   5e308: 79 a3 28 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7d8]
   5e310: 79 a2 20 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e0]
   5e318: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e320: 07 01 00 00 10 f8 ff ff      	add64 r1, -0x7f0
   5e328: 18 04 00 00 0d d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d60d
   5e338: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   5e340: 85 10 00 00 ef 46 ff ff      	call -0xb911
   5e348: 79 a1 10 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7f0]
   5e350: 79 a2 18 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7e8]
   5e358: 05 00 09 ff 00 00 00 00      	ja -0xf7 <LBB233_39>

000000000005e360 <LBB233_51>:
   5e360: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   5e368: 7b 2a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r2
   5e370: 7b 3a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r3
   5e378: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   5e380: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e388: 07 01 00 00 e0 f9 ff ff      	add64 r1, -0x620
   5e390: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e398: 07 02 00 00 c0 fd ff ff      	add64 r2, -0x240
   5e3a0: 85 10 00 00 28 2b 01 00      	call 0x12b28
   5e3a8: 79 a1 e0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x620]
   5e3b0: 79 a2 e8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x618]
   5e3b8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   5e3c0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   5e3c8: 62 06 00 00 02 00 00 00      	stw [r6 + 0x0], 0x2
   5e3d0: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5e3d8: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   5e3e0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e3e8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e3f0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e3f8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_53>
   5e400: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e408: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e410: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e418 <LBB233_53>:
   5e418: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e420: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e428: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e430: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB233_55>
   5e438: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e440: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e448: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000005e450 <LBB233_55>:
   5e450: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5e458: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   5e460: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   5e468: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e470: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   5e478: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB233_57>
   5e480: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   5e488: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5e490: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000005e498 <LBB233_57>:
   5e498: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e4a0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e4a8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   5e4b0: 55 02 e1 fe 00 00 00 00      	jne r2, 0x0, -0x11f <LBB233_83>
   5e4b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5e4c0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   5e4c8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   5e4d0: 05 00 dd fe 00 00 00 00      	ja -0x123 <LBB233_83>

000000000005e4d8 <LBB233_59>:
   5e4d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e4e0: 07 01 00 00 d0 f9 ff ff      	add64 r1, -0x630
   5e4e8: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   5e4f0: 85 10 00 00 bd 30 01 00      	call 0x130bd
   5e4f8: 79 a3 d8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x628]
   5e500: 79 a2 d0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x630]
   5e508: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e510: 07 01 00 00 c0 f9 ff ff      	add64 r1, -0x640
   5e518: 18 04 00 00 0d d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d60d
   5e528: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   5e530: 85 10 00 00 b1 46 ff ff      	call -0xb94f
   5e538: 79 a1 c0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x640]
   5e540: 79 a2 c8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x638]
   5e548: 05 00 cb fe 00 00 00 00      	ja -0x135 <LBB233_39>

000000000005e550 <LBB233_62>:
   5e550: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e558: 07 01 00 00 b0 f9 ff ff      	add64 r1, -0x650
   5e560: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5e568: 85 10 00 00 ae 30 01 00      	call 0x130ae
   5e570: 79 a3 b8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x648]
   5e578: 79 a2 b0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x650]
   5e580: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e588: 07 01 00 00 a0 f9 ff ff      	add64 r1, -0x660
   5e590: 18 04 00 00 89 d7 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d789
   5e5a0: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5e5a8: 85 10 00 00 a2 46 ff ff      	call -0xb95e
   5e5b0: 79 a3 a8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x658]
   5e5b8: 79 a2 a0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x660]
   5e5c0: 79 a1 40 f7 00 00 00 00      	ldxdw r1, [r10 - 0x8c0]
   5e5c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e5d0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5e5d8: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   5e5e0: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   5e5e8: 79 10 10 00 00 00 00 00      	ldxdw r0, [r1 + 0x10]
   5e5f0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5e5f8: 79 a7 60 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2a0]
   5e600: 7b 7a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r7
   5e608: 79 a7 68 fd 00 00 00 00      	ldxdw r7, [r10 - 0x298]
   5e610: 7b 7a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r7
   5e618: 79 a7 70 fd 00 00 00 00      	ldxdw r7, [r10 - 0x290]
   5e620: 7b 7a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r7
   5e628: 79 a7 78 fd 00 00 00 00      	ldxdw r7, [r10 - 0x288]
   5e630: 7b 7a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r7
   5e638: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e640: 7b 0a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r0
   5e648: 7b 5a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r5
   5e650: 7b 4a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r4
   5e658: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e660: 07 01 00 00 90 f9 ff ff      	add64 r1, -0x670
   5e668: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e670: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5e678: 85 10 00 00 ff 2a 01 00      	call 0x12aff
   5e680: 79 a1 90 f9 00 00 00 00      	ldxdw r1, [r10 - 0x670]
   5e688: 79 a2 98 f9 00 00 00 00      	ldxdw r2, [r10 - 0x668]
   5e690: 05 00 a2 fe 00 00 00 00      	ja -0x15e <LBB233_39>

000000000005e698 <LBB233_63>:
   5e698: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   5e6a0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   5e6a8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5e6b0: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5e6b8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5e6c0: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5e6c8: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5e6d0: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5e6d8: 7b 2a 30 f7 00 00 00 00      	stxdw [r10 - 0x8d0], r2
   5e6e0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5e6e8: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e6f0: 79 a1 88 f7 00 00 00 00      	ldxdw r1, [r10 - 0x878]
   5e6f8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5e700: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e708: 07 02 00 00 e0 fd ff ff      	add64 r2, -0x220
   5e710: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e718: 85 10 00 00 a6 57 01 00      	call 0x157a6
   5e720: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e728: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e730: 15 00 07 00 00 00 00 00      	jeq r0, 0x0, +0x7 <LBB233_65>
   5e738: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e740: 07 01 00 00 50 f9 ff ff      	add64 r1, -0x6b0
   5e748: b7 02 00 00 e7 07 00 00      	mov64 r2, 0x7e7
   5e750: 85 10 00 00 71 30 01 00      	call 0x13071
   5e758: 79 a1 50 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6b0]
   5e760: 79 a2 58 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6a8]
   5e768: 05 00 87 fe 00 00 00 00      	ja -0x179 <LBB233_39>

000000000005e770 <LBB233_65>:
   5e770: 79 a1 28 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d8]
   5e778: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   5e780: 79 a1 20 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e0]
   5e788: 7b 1a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r1
   5e790: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   5e798: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   5e7a0: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5e7a8: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   5e7b0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5e7b8: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   5e7c0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5e7c8: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   5e7d0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5e7d8: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   5e7e0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5e7e8: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5e7f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e7f8: 07 01 00 00 80 fd ff ff      	add64 r1, -0x280
   5e800: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5e808: 07 02 00 00 a0 fd ff ff      	add64 r2, -0x260
   5e810: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5e818: 85 10 00 00 86 57 01 00      	call 0x15786
   5e820: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5e828: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5e830: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <LBB233_67>
   5e838: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e840: 07 01 00 00 40 f9 ff ff      	add64 r1, -0x6c0
   5e848: b7 02 00 00 df 07 00 00      	mov64 r2, 0x7df
   5e850: 85 10 00 00 51 30 01 00      	call 0x13051
   5e858: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5e860: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5e868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e870: 07 01 00 00 30 f9 ff ff      	add64 r1, -0x6d0
   5e878: 18 04 00 00 d7 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcd7
   5e888: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5e890: 85 10 00 00 45 46 ff ff      	call -0xb9bb
   5e898: 79 a3 38 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c8]
   5e8a0: 79 a2 30 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d0]
   5e8a8: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   5e8b0: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e8b8: 79 a1 90 fd 00 00 00 00      	ldxdw r1, [r10 - 0x270]
   5e8c0: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5e8c8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   5e8d0: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5e8d8: 79 a1 80 fd 00 00 00 00      	ldxdw r1, [r10 - 0x280]
   5e8e0: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5e8e8: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   5e8f0: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   5e8f8: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5e900: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   5e908: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5e910: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5e918: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   5e920: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   5e928: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5e930: 07 01 00 00 20 f9 ff ff      	add64 r1, -0x6e0
   5e938: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5e940: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5e948: 85 10 00 00 a5 2a 01 00      	call 0x12aa5
   5e950: 79 a1 20 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e0]
   5e958: 79 a2 28 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d8]
   5e960: 05 00 48 fe 00 00 00 00      	ja -0x1b8 <LBB233_39>

000000000005e968 <LBB233_67>:
   5e968: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   5e970: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5e978: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   5e980: 7b 1a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r1
   5e988: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5e990: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   5e998: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5e9a0: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5e9a8: 79 a2 30 f7 00 00 00 00      	ldxdw r2, [r10 - 0x8d0]
   5e9b0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5e9b8: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5e9c0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5e9c8: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5e9d0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5e9d8: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5e9e0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5e9e8: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5e9f0: bf a9 00 00 00 00 00 00      	mov64 r9, r10
   5e9f8: 07 09 00 00 c0 fd ff ff      	add64 r9, -0x240
   5ea00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ea08: 07 02 00 00 a0 fd ff ff      	add64 r2, -0x260
   5ea10: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5ea18: 07 03 00 00 68 fc ff ff      	add64 r3, -0x398
   5ea20: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ea28: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5ea30: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   5ea38: 85 10 00 00 a5 25 01 00      	call 0x125a5
   5ea40: 79 a1 88 f7 00 00 00 00      	ldxdw r1, [r10 - 0x878]
   5ea48: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ea50: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ea58: 7b 2a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r2
   5ea60: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   5ea68: 7b 2a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r2
   5ea70: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   5ea78: 7b 2a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r2
   5ea80: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ea88: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5ea90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ea98: 07 01 00 00 68 fc ff ff      	add64 r1, -0x398
   5eaa0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   5eaa8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5eab0: 85 10 00 00 33 57 01 00      	call 0x15733
   5eab8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5eac0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5eac8: 15 00 26 00 00 00 00 00      	jeq r0, 0x0, +0x26 <LBB233_69>
   5ead0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ead8: 07 01 00 00 10 f9 ff ff      	add64 r1, -0x6f0
   5eae0: b7 02 00 00 d9 07 00 00      	mov64 r2, 0x7d9
   5eae8: 85 10 00 00 fe 2f 01 00      	call 0x12ffe
   5eaf0: 79 a3 18 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e8]
   5eaf8: 79 a2 10 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6f0]
   5eb00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eb08: 07 01 00 00 00 f9 ff ff      	add64 r1, -0x700
   5eb10: 18 04 00 00 d7 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcd7
   5eb20: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5eb28: 85 10 00 00 f2 45 ff ff      	call -0xba0e
   5eb30: 79 a3 08 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f8]
   5eb38: 79 a2 00 f9 00 00 00 00      	ldxdw r2, [r10 - 0x700]
   5eb40: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   5eb48: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5eb50: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5eb58: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5eb60: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   5eb68: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5eb70: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   5eb78: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5eb80: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   5eb88: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   5eb90: 79 a1 c8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x238]
   5eb98: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   5eba0: 79 a1 d0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x230]
   5eba8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5ebb0: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   5ebb8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   5ebc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ebc8: 07 01 00 00 f0 f8 ff ff      	add64 r1, -0x710
   5ebd0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5ebd8: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5ebe0: 85 10 00 00 52 2a 01 00      	call 0x12a52
   5ebe8: 79 a1 f0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x710]
   5ebf0: 79 a2 f8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x708]
   5ebf8: 05 00 f5 fd 00 00 00 00      	ja -0x20b <LBB233_39>

000000000005ec00 <LBB233_69>:
   5ec00: 79 a1 88 f7 00 00 00 00      	ldxdw r1, [r10 - 0x878]
   5ec08: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ec10: 15 01 5d 00 00 00 00 00      	jeq r1, 0x0, +0x5d <LBB233_71>
   5ec18: 79 a1 70 fa 00 00 00 00      	ldxdw r1, [r10 - 0x590]
   5ec20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ec28: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   5ec30: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   5ec38: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5ec40: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   5ec48: 18 05 00 00 df d6 10 00 00 00 00 00 00 00 00 00      	lddw r5, 0x10d6df
   5ec58: 7b 5a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r5
   5ec60: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   5ec68: 07 05 00 00 68 fc ff ff      	add64 r5, -0x398
   5ec70: 7b 5a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r5
   5ec78: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5ec80: 7b 4a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r4
   5ec88: 7b 3a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r3
   5ec90: 7b 2a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r2
   5ec98: 7a 0a c8 fd 17 00 00 00      	stdw [r10 - 0x238], 0x17
   5eca0: 7a 0a d8 fd 20 00 00 00      	stdw [r10 - 0x228], 0x20
   5eca8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ecb0: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5ecb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5ecc0: 07 02 00 00 c0 fd ff ff      	add64 r2, -0x240
   5ecc8: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   5ecd0: 79 a4 90 f7 00 00 00 00      	ldxdw r4, [r10 - 0x870]
   5ecd8: 85 10 00 00 30 3f 01 00      	call 0x13f30
   5ece0: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5ece8: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   5ecf0: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5ecf8: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   5ed00: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5ed08: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   5ed10: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5ed18: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   5ed20: 71 a1 00 fe 00 00 00 00      	ldxb r1, [r10 - 0x200]
   5ed28: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   5ed30: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   5ed38: 79 a1 70 f7 00 00 00 00      	ldxdw r1, [r10 - 0x890]
   5ed40: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   5ed48: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5ed50: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5ed58: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5ed60: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5ed68: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5ed70: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5ed78: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5ed80: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5ed88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ed90: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5ed98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5eda0: 07 02 00 00 a0 fd ff ff      	add64 r2, -0x260
   5eda8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5edb0: 85 10 00 00 d3 56 01 00      	call 0x156d3
   5edb8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5edc0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5edc8: 15 00 35 00 00 00 00 00      	jeq r0, 0x0, +0x35 <LBB233_73>
   5edd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5edd8: 07 01 00 00 e0 f8 ff ff      	add64 r1, -0x720
   5ede0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5ede8: 85 10 00 00 9e 2f 01 00      	call 0x12f9e
   5edf0: 79 a3 e8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x718]
   5edf8: 79 a2 e0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x720]
   5ee00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ee08: 07 01 00 00 d0 f8 ff ff      	add64 r1, -0x730
   5ee10: 18 04 00 00 df d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d6df
   5ee20: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5ee28: 85 10 00 00 92 45 ff ff      	call -0xba6e
   5ee30: 79 a3 d8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x728]
   5ee38: 79 a2 d0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x730]
   5ee40: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5ee48: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5ee50: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5ee58: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5ee60: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5ee68: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5ee70: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5ee78: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5ee80: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   5ee88: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   5ee90: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5ee98: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   5eea0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   5eea8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5eeb0: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   5eeb8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   5eec0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5eec8: 07 01 00 00 c0 f8 ff ff      	add64 r1, -0x740
   5eed0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5eed8: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5eee0: 85 10 00 00 f2 29 01 00      	call 0x129f2
   5eee8: 79 a1 c0 f8 00 00 00 00      	ldxdw r1, [r10 - 0x740]
   5eef0: 79 a2 c8 f8 00 00 00 00      	ldxdw r2, [r10 - 0x738]
   5eef8: 05 00 95 fd 00 00 00 00      	ja -0x26b <LBB233_39>

000000000005ef00 <LBB233_71>:
   5ef00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ef08: 07 01 00 00 40 f8 ff ff      	add64 r1, -0x7c0
   5ef10: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5ef18: 85 10 00 00 78 2f 01 00      	call 0x12f78
   5ef20: 79 a3 48 f8 00 00 00 00      	ldxdw r3, [r10 - 0x7b8]
   5ef28: 79 a2 40 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7c0]
   5ef30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ef38: 07 01 00 00 30 f8 ff ff      	add64 r1, -0x7d0
   5ef40: 18 04 00 00 d7 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcd7
   5ef50: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   5ef58: 85 10 00 00 6c 45 ff ff      	call -0xba94
   5ef60: 79 a1 30 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7d0]
   5ef68: 79 a2 38 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7c8]
   5ef70: 05 00 86 fd 00 00 00 00      	ja -0x27a <LBB233_39>

000000000005ef78 <LBB233_73>:
   5ef78: 79 a1 70 f7 00 00 00 00      	ldxdw r1, [r10 - 0x890]
   5ef80: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ef88: 15 01 4c 00 00 00 00 00      	jeq r1, 0x0, +0x4c <LBB233_75>
   5ef90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ef98: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5efa0: 18 02 00 00 58 31 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x113158
   5efb0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5efb8: 79 a4 90 f7 00 00 00 00      	ldxdw r4, [r10 - 0x870]
   5efc0: 85 10 00 00 d3 3e 01 00      	call 0x13ed3
   5efc8: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5efd0: 7b 1a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r1
   5efd8: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5efe0: 7b 1a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r1
   5efe8: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   5eff0: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   5eff8: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5f000: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   5f008: 71 a1 00 fe 00 00 00 00      	ldxb r1, [r10 - 0x200]
   5f010: 79 a2 98 f7 00 00 00 00      	ldxdw r2, [r10 - 0x868]
   5f018: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   5f020: 79 79 00 00 00 00 00 00      	ldxdw r9, [r7 + 0x0]
   5f028: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5f030: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5f038: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5f040: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5f048: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5f050: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5f058: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5f060: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5f068: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f070: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   5f078: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f080: 07 02 00 00 68 fc ff ff      	add64 r2, -0x398
   5f088: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5f090: 85 10 00 00 77 56 01 00      	call 0x15677
   5f098: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5f0a0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5f0a8: 15 00 37 00 00 00 00 00      	jeq r0, 0x0, +0x37 <LBB233_77>
   5f0b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f0b8: 07 01 00 00 b0 f8 ff ff      	add64 r1, -0x750
   5f0c0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5f0c8: 85 10 00 00 42 2f 01 00      	call 0x12f42
   5f0d0: 79 a3 b8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x748]
   5f0d8: 79 a2 b0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x750]
   5f0e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f0e8: 07 01 00 00 a0 f8 ff ff      	add64 r1, -0x760
   5f0f0: 18 04 00 00 2c db 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10db2c
   5f100: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5f108: 85 10 00 00 36 45 ff ff      	call -0xbaca
   5f110: 79 a3 a8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x758]
   5f118: 79 a2 a0 f8 00 00 00 00      	ldxdw r2, [r10 - 0x760]
   5f120: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   5f128: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   5f130: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   5f138: 7b 1a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r1
   5f140: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5f148: 7b 1a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r1
   5f150: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5f158: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   5f160: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   5f168: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   5f170: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   5f178: 7b 1a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r1
   5f180: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   5f188: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   5f190: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   5f198: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   5f1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f1a8: 07 01 00 00 90 f8 ff ff      	add64 r1, -0x770
   5f1b0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5f1b8: 07 04 00 00 e0 fd ff ff      	add64 r4, -0x220
   5f1c0: 85 10 00 00 96 29 01 00      	call 0x12996
   5f1c8: 79 a1 98 f8 00 00 00 00      	ldxdw r1, [r10 - 0x768]
   5f1d0: 79 a2 90 f8 00 00 00 00      	ldxdw r2, [r10 - 0x770]

000000000005f1d8 <LBB233_81>:
   5f1d8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5f1e0: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   5f1e8: 05 00 39 fd 00 00 00 00      	ja -0x2c7 <LBB233_82>

000000000005f1f0 <LBB233_75>:
   5f1f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f1f8: 07 01 00 00 60 f8 ff ff      	add64 r1, -0x7a0
   5f200: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5f208: 85 10 00 00 1a 2f 01 00      	call 0x12f1a
   5f210: 79 a3 68 f8 00 00 00 00      	ldxdw r3, [r10 - 0x798]
   5f218: 79 a2 60 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a0]
   5f220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f228: 07 01 00 00 50 f8 ff ff      	add64 r1, -0x7b0
   5f230: 18 04 00 00 df d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d6df
   5f240: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5f248: 85 10 00 00 0e 45 ff ff      	call -0xbaf2
   5f250: 79 a1 50 f8 00 00 00 00      	ldxdw r1, [r10 - 0x7b0]
   5f258: 79 a2 58 f8 00 00 00 00      	ldxdw r2, [r10 - 0x7a8]
   5f260: 05 00 28 fd 00 00 00 00      	ja -0x2d8 <LBB233_39>

000000000005f268 <LBB233_77>:
   5f268: 79 a9 30 fc 00 00 00 00      	ldxdw r9, [r10 - 0x3d0]
   5f270: 71 91 29 00 00 00 00 00      	ldxb r1, [r9 + 0x29]
   5f278: 15 01 68 00 00 00 00 00      	jeq r1, 0x0, +0x68 <LBB233_78>
   5f280: 79 a8 70 fa 00 00 00 00      	ldxdw r8, [r10 - 0x590]
   5f288: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f290: 07 02 00 00 98 fb ff ff      	add64 r2, -0x468
   5f298: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f2a0: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   5f2a8: 85 10 00 00 2b 56 01 00      	call 0x1562b
   5f2b0: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   5f2b8: 7b 1a 98 f7 00 00 00 00      	stxdw [r10 - 0x868], r1
   5f2c0: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   5f2c8: 7b 1a 90 f7 00 00 00 00      	stxdw [r10 - 0x870], r1
   5f2d0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   5f2d8: 7b 1a 30 f7 00 00 00 00      	stxdw [r10 - 0x8d0], r1
   5f2e0: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   5f2e8: 7b 16 90 00 00 00 00 00      	stxdw [r6 + 0x90], r1
   5f2f0: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   5f2f8: 7b 16 98 00 00 00 00 00      	stxdw [r6 + 0x98], r1
   5f300: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f308: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
   5f310: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f318: 07 02 00 00 c8 fc ff ff      	add64 r2, -0x338
   5f320: b7 03 00 00 88 00 00 00      	mov64 r3, 0x88
   5f328: 85 10 00 00 1b 56 01 00      	call 0x1561b
   5f330: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   5f338: 7b 16 34 01 00 00 00 00      	stxdw [r6 + 0x134], r1
   5f340: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   5f348: 7b 16 3c 01 00 00 00 00      	stxdw [r6 + 0x13c], r1
   5f350: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   5f358: 7b 16 44 01 00 00 00 00      	stxdw [r6 + 0x144], r1
   5f360: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   5f368: 7b 16 4c 01 00 00 00 00      	stxdw [r6 + 0x14c], r1
   5f370: 61 a1 c0 fc 00 00 00 00      	ldxw r1, [r10 - 0x340]
   5f378: 63 16 54 01 00 00 00 00      	stxw [r6 + 0x154], r1
   5f380: 79 a1 30 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4d0]
   5f388: 7b 16 68 01 00 00 00 00      	stxdw [r6 + 0x168], r1
   5f390: 79 a1 38 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c8]
   5f398: 7b 16 70 01 00 00 00 00      	stxdw [r6 + 0x170], r1
   5f3a0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f3a8: 07 01 00 00 80 01 00 00      	add64 r1, 0x180
   5f3b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f3b8: 07 02 00 00 f0 fa ff ff      	add64 r2, -0x510
   5f3c0: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   5f3c8: 85 10 00 00 07 56 01 00      	call 0x15607
   5f3d0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f3d8: 07 01 00 00 c0 01 00 00      	add64 r1, 0x1c0
   5f3e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f3e8: 07 02 00 00 a8 fa ff ff      	add64 r2, -0x558
   5f3f0: b7 03 00 00 48 00 00 00      	mov64 r3, 0x48
   5f3f8: 85 10 00 00 01 56 01 00      	call 0x15601
   5f400: 79 a1 80 fa 00 00 00 00      	ldxdw r1, [r10 - 0x580]
   5f408: 7b 16 0c 02 00 00 00 00      	stxdw [r6 + 0x20c], r1
   5f410: 79 a1 88 fa 00 00 00 00      	ldxdw r1, [r10 - 0x578]
   5f418: 7b 16 14 02 00 00 00 00      	stxdw [r6 + 0x214], r1
   5f420: 79 a1 90 fa 00 00 00 00      	ldxdw r1, [r10 - 0x570]
   5f428: 7b 16 1c 02 00 00 00 00      	stxdw [r6 + 0x21c], r1
   5f430: 79 a1 98 fa 00 00 00 00      	ldxdw r1, [r10 - 0x568]
   5f438: 7b 16 24 02 00 00 00 00      	stxdw [r6 + 0x224], r1
   5f440: 61 a1 a0 fa 00 00 00 00      	ldxw r1, [r10 - 0x560]
   5f448: 63 16 2c 02 00 00 00 00      	stxw [r6 + 0x22c], r1
   5f450: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5f458: 07 01 00 00 40 02 00 00      	add64 r1, 0x240
   5f460: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5f468: 07 02 00 00 48 fb ff ff      	add64 r2, -0x4b8
   5f470: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5f478: 85 10 00 00 f1 55 01 00      	call 0x155f1
   5f480: 69 a1 44 fb 00 00 00 00      	ldxh r1, [r10 - 0x4bc]
   5f488: 61 a2 40 fb 00 00 00 00      	ldxw r2, [r10 - 0x4c0]
   5f490: 79 a3 38 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8c8]
   5f498: 63 36 30 01 00 00 00 00      	stxw [r6 + 0x130], r3
   5f4a0: 79 a3 78 f7 00 00 00 00      	ldxdw r3, [r10 - 0x888]
   5f4a8: 63 36 08 02 00 00 00 00      	stxw [r6 + 0x208], r3
   5f4b0: 79 a3 58 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8a8]
   5f4b8: 73 36 89 02 00 00 00 00      	stxb [r6 + 0x289], r3
   5f4c0: 7b 96 c8 02 00 00 00 00      	stxdw [r6 + 0x2c8], r9
   5f4c8: 79 a3 28 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8d8]
   5f4d0: 7b 36 c0 02 00 00 00 00      	stxdw [r6 + 0x2c0], r3
   5f4d8: 7b 76 b8 02 00 00 00 00      	stxdw [r6 + 0x2b8], r7
   5f4e0: 79 a3 30 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8d0]
   5f4e8: 7b 36 b0 02 00 00 00 00      	stxdw [r6 + 0x2b0], r3
   5f4f0: 79 a3 90 f7 00 00 00 00      	ldxdw r3, [r10 - 0x870]
   5f4f8: 7b 36 a8 02 00 00 00 00      	stxdw [r6 + 0x2a8], r3
   5f500: 79 a3 98 f7 00 00 00 00      	ldxdw r3, [r10 - 0x868]
   5f508: 7b 36 a0 02 00 00 00 00      	stxdw [r6 + 0x2a0], r3
   5f510: 79 a3 40 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8c0]
   5f518: 7b 36 98 02 00 00 00 00      	stxdw [r6 + 0x298], r3
   5f520: 7b 86 90 02 00 00 00 00      	stxdw [r6 + 0x290], r8
   5f528: 79 a3 60 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8a0]
   5f530: 7b 36 38 02 00 00 00 00      	stxdw [r6 + 0x238], r3
   5f538: 79 a3 70 f7 00 00 00 00      	ldxdw r3, [r10 - 0x890]
   5f540: 7b 36 30 02 00 00 00 00      	stxdw [r6 + 0x230], r3
   5f548: 79 a3 88 f7 00 00 00 00      	ldxdw r3, [r10 - 0x878]
   5f550: 7b 36 78 01 00 00 00 00      	stxdw [r6 + 0x178], r3
   5f558: 79 a3 68 f7 00 00 00 00      	ldxdw r3, [r10 - 0x898]
   5f560: 7b 36 60 01 00 00 00 00      	stxdw [r6 + 0x160], r3
   5f568: 79 a3 80 f7 00 00 00 00      	ldxdw r3, [r10 - 0x880]
   5f570: 7b 36 58 01 00 00 00 00      	stxdw [r6 + 0x158], r3
   5f578: 79 a3 20 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8e0]
   5f580: 7b 36 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r3
   5f588: 79 a3 48 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8b8]
   5f590: 7b 36 88 00 00 00 00 00      	stxdw [r6 + 0x88], r3
   5f598: 79 a3 50 f7 00 00 00 00      	ldxdw r3, [r10 - 0x8b0]
   5f5a0: 7b 36 80 00 00 00 00 00      	stxdw [r6 + 0x80], r3
   5f5a8: 63 26 8a 02 00 00 00 00      	stxw [r6 + 0x28a], r2
   5f5b0: 6b 16 8e 02 00 00 00 00      	stxh [r6 + 0x28e], r1
   5f5b8: 05 00 c0 fc 00 00 00 00      	ja -0x340 <LBB233_83>

000000000005f5c0 <LBB233_78>:
   5f5c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f5c8: 07 01 00 00 80 f8 ff ff      	add64 r1, -0x780
   5f5d0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5f5d8: 85 10 00 00 a0 2e 01 00      	call 0x12ea0
   5f5e0: 79 a3 88 f8 00 00 00 00      	ldxdw r3, [r10 - 0x778]
   5f5e8: 79 a2 80 f8 00 00 00 00      	ldxdw r2, [r10 - 0x780]
   5f5f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5f5f8: 07 01 00 00 70 f8 ff ff      	add64 r1, -0x790
   5f600: 18 04 00 00 02 dd 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dd02
   5f610: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   5f618: 85 10 00 00 94 44 ff ff      	call -0xbb6c
   5f620: 79 a1 78 f8 00 00 00 00      	ldxdw r1, [r10 - 0x788]
   5f628: 79 a2 70 f8 00 00 00 00      	ldxdw r2, [r10 - 0x790]
   5f630: 05 00 74 ff 00 00 00 00      	ja -0x8c <LBB233_81>
