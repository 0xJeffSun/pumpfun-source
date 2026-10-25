
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/formatter-restoration-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000096638 <_ZN18pump_amm_recovered9__private8__global22claim_token_incentives17hf041695dae7a7372E>:
   96638: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   96640: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   96648: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   96650: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   96658: 18 01 00 00 86 e0 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e086
   96668: b7 02 00 00 21 00 00 00      	mov64 r2, 0x21
   96670: 85 10 00 00 ff ff ff ff      	call -0x1
   96678: 72 0a 4f fa ff 00 00 00      	stb [r10 - 0x5b1], 0xff
   96680: 6a 0a 4d fa ff ff 00 00      	sth [r10 - 0x5b3], 0xffff
   96688: 7b 8a 58 fa 00 00 00 00      	stxdw [r10 - 0x5a8], r8
   96690: 7b 9a 50 fa 00 00 00 00      	stxdw [r10 - 0x5b0], r9
   96698: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   966a0: 07 01 00 00 4d fa ff ff      	add64 r1, -0x5b3
   966a8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   966b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   966b8: 07 01 00 00 30 fd ff ff      	add64 r1, -0x2d0
   966c0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   966c8: 07 03 00 00 50 fa ff ff      	add64 r3, -0x5b0
   966d0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   966d8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   966e0: 85 10 00 00 3f 8d ff ff      	call -0x72c1
   966e8: 61 a8 30 fd 00 00 00 00      	ldxw r8, [r10 - 0x2d0]
   966f0: 15 08 2d 00 02 00 00 00      	jeq r8, 0x2, +0x2d <LBB376_2>
   966f8: 7b 6a 20 fa 00 00 00 00      	stxdw [r10 - 0x5e0], r6
   96700: 61 a1 34 fd 00 00 00 00      	ldxw r1, [r10 - 0x2cc]
   96708: 7b 1a 18 fa 00 00 00 00      	stxdw [r10 - 0x5e8], r1
   96710: 79 a6 38 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2c8]
   96718: 79 a9 40 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2c0]
   96720: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96728: 07 01 00 00 78 fa ff ff      	add64 r1, -0x588
   96730: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96738: 07 02 00 00 48 fd ff ff      	add64 r2, -0x2b8
   96740: b7 03 00 00 b8 02 00 00      	mov64 r3, 0x2b8
   96748: 85 10 00 00 97 e7 00 00      	call 0xe797
   96750: 7b 9a 70 fa 00 00 00 00      	stxdw [r10 - 0x590], r9
   96758: 7b 6a 68 fa 00 00 00 00      	stxdw [r10 - 0x598], r6
   96760: 79 a1 18 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5e8]
   96768: 63 1a 64 fa 00 00 00 00      	stxw [r10 - 0x59c], r1
   96770: 63 8a 60 fa 00 00 00 00      	stxw [r10 - 0x5a0], r8
   96778: 69 a1 4d fa 00 00 00 00      	ldxh r1, [r10 - 0x5b3]
   96780: 6b 1a 50 fd 00 00 00 00      	stxh [r10 - 0x2b0], r1
   96788: 71 a1 4f fa 00 00 00 00      	ldxb r1, [r10 - 0x5b1]
   96790: 73 1a 52 fd 00 00 00 00      	stxb [r10 - 0x2ae], r1
   96798: 79 a1 58 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5a8]
   967a0: 7b 1a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r1
   967a8: 79 a1 50 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b0]
   967b0: 7b 1a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r1
   967b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   967c0: 07 01 00 00 60 fa ff ff      	add64 r1, -0x5a0
   967c8: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   967d0: 7b 7a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r7
   967d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   967e0: 07 01 00 00 38 fa ff ff      	add64 r1, -0x5c8
   967e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   967f0: 07 02 00 00 30 fd ff ff      	add64 r2, -0x2d0
   967f8: 85 10 00 00 b2 35 00 00      	call 0x35b2
   96800: 79 a1 38 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5c8]
   96808: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB376_3>
   96810: 05 00 0c 00 00 00 00 00      	ja +0xc <LBB376_4>

0000000000096818 <LBB376_3>:
   96818: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96820: 07 01 00 00 28 fa ff ff      	add64 r1, -0x5d8
   96828: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96830: 07 02 00 00 60 fa ff ff      	add64 r2, -0x5a0
   96838: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   96840: 85 10 00 00 56 94 ff ff      	call -0x6baa
   96848: 79 a2 30 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5d0]
   96850: 79 a1 28 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5d8]
   96858: 05 00 04 00 00 00 00 00      	ja +0x4 <LBB376_5>

0000000000096860 <LBB376_2>:
   96860: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   96868: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   96870: 05 00 02 00 00 00 00 00      	ja +0x2 <LBB376_6>

0000000000096878 <LBB376_4>:
   96878: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]

0000000000096880 <LBB376_5>:
   96880: 79 a6 20 fa 00 00 00 00      	ldxdw r6, [r10 - 0x5e0]

0000000000096888 <LBB376_6>:
   96888: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   96890: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   96898: 95 00 00 00 00 00 00 00      	exit
