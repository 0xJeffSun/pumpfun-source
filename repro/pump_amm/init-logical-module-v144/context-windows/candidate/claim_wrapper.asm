
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000009a1f8 <_ZN18pump_amm_recovered9__private8__global22claim_token_incentives17hf041695dae7a7372E>:
   9a1f8: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   9a200: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   9a208: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   9a210: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9a218: 18 01 00 00 97 ef 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10ef97
   9a228: b7 02 00 00 21 00 00 00      	mov64 r2, 0x21
   9a230: 85 10 00 00 ff ff ff ff      	call -0x1
   9a238: 72 0a 7f f5 ff 00 00 00      	stb [r10 - 0xa81], 0xff
   9a240: 6a 0a 7d f5 ff ff 00 00      	sth [r10 - 0xa83], 0xffff
   9a248: 7b 8a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r8
   9a250: 7b 9a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r9
   9a258: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a260: 07 01 00 00 7d f5 ff ff      	add64 r1, -0xa83
   9a268: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   9a270: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a278: 07 01 00 00 c8 fa ff ff      	add64 r1, -0x538
   9a280: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   9a288: 07 03 00 00 80 f5 ff ff      	add64 r3, -0xa80
   9a290: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   9a298: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9a2a0: 85 10 00 00 bf 8c ff ff      	call -0x7341
   9a2a8: 61 a8 c8 fa 00 00 00 00      	ldxw r8, [r10 - 0x538]
   9a2b0: 15 08 4e 00 02 00 00 00      	jeq r8, 0x2, +0x4e <LBB383_18>
   9a2b8: 7b 6a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r6
   9a2c0: 61 a1 cc fa 00 00 00 00      	ldxw r1, [r10 - 0x534]
   9a2c8: 7b 1a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r1
   9a2d0: 79 a6 d0 fa 00 00 00 00      	ldxdw r6, [r10 - 0x530]
   9a2d8: 79 a9 d8 fa 00 00 00 00      	ldxdw r9, [r10 - 0x528]
   9a2e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a2e8: 07 01 00 00 a8 f5 ff ff      	add64 r1, -0xa58
   9a2f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9a2f8: 07 02 00 00 e0 fa ff ff      	add64 r2, -0x520
   9a300: b7 03 00 00 20 05 00 00      	mov64 r3, 0x520
   9a308: 85 10 00 00 f5 e1 00 00      	call 0xe1f5
   9a310: 7b 9a a0 f5 00 00 00 00      	stxdw [r10 - 0xa60], r9
   9a318: 7b 6a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r6
   9a320: 79 a1 48 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab8]
   9a328: 63 1a 94 f5 00 00 00 00      	stxw [r10 - 0xa6c], r1
   9a330: 63 8a 90 f5 00 00 00 00      	stxw [r10 - 0xa70], r8
   9a338: 69 a1 7d f5 00 00 00 00      	ldxh r1, [r10 - 0xa83]
   9a340: 6b 1a e8 fa 00 00 00 00      	stxh [r10 - 0x518], r1
   9a348: 71 a1 7f f5 00 00 00 00      	ldxb r1, [r10 - 0xa81]
   9a350: 73 1a ea fa 00 00 00 00      	stxb [r10 - 0x516], r1
   9a358: 79 a1 88 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa78]
   9a360: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   9a368: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   9a370: 7b 1a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r1
   9a378: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a380: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   9a388: 7b 1a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r1
   9a390: 7b 7a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r7
   9a398: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a3a0: 07 01 00 00 68 f5 ff ff      	add64 r1, -0xa98
   9a3a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9a3b0: 07 02 00 00 c8 fa ff ff      	add64 r2, -0x538
   9a3b8: 85 10 00 00 30 36 00 00      	call 0x3630
   9a3c0: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   9a3c8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB383_2>
   9a3d0: 05 00 2f 00 00 00 00 00      	ja +0x2f <LBB383_10>

000000000009a3d8 <LBB383_2>:
   9a3d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9a3e0: 07 01 00 00 58 f5 ff ff      	add64 r1, -0xaa8
   9a3e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9a3f0: 07 02 00 00 90 f5 ff ff      	add64 r2, -0xa70
   9a3f8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   9a400: 85 10 00 00 36 94 ff ff      	call -0x6bca
   9a408: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   9a410: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   9a418: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   9a420: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a428: 79 a2 60 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa0]
   9a430: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   9a438: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   9a440: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB383_4>
   9a448: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   9a450: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a458: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

000000000009a460 <LBB383_4>:
   9a460: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   9a468: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a470: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   9a478: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   9a480: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB383_6>
   9a488: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   9a490: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a498: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

000000000009a4a0 <LBB383_6>:
   9a4a0: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   9a4a8: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   9a4b0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   9a4b8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a4c0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   9a4c8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB383_8>
   9a4d0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   9a4d8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a4e0: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

000000000009a4e8 <LBB383_8>:
   9a4e8: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   9a4f0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a4f8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   9a500: 55 04 06 00 00 00 00 00      	jne r4, 0x0, +0x6 <LBB383_19>

000000000009a508 <LBB383_9>:
   9a508: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   9a510: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a518: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   9a520: 05 00 02 00 00 00 00 00      	ja +0x2 <LBB383_19>

000000000009a528 <LBB383_18>:
   9a528: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   9a530: 79 a1 d0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x530]

000000000009a538 <LBB383_19>:
   9a538: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9a540: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9a548: 95 00 00 00 00 00 00 00      	exit

000000000009a550 <LBB383_10>:
   9a550: 79 a2 70 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa90]
   9a558: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   9a560: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   9a568: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   9a570: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a578: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   9a580: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB383_12>
   9a588: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   9a590: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a598: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

000000000009a5a0 <LBB383_12>:
   9a5a0: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   9a5a8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a5b0: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   9a5b8: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   9a5c0: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB383_14>
   9a5c8: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   9a5d0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a5d8: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

000000000009a5e0 <LBB383_14>:
   9a5e0: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   9a5e8: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   9a5f0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   9a5f8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a600: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   9a608: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB383_16>
   9a610: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   9a618: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   9a620: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

000000000009a628 <LBB383_16>:
   9a628: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   9a630: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   9a638: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   9a640: 55 04 de ff 00 00 00 00      	jne r4, 0x0, -0x22 <LBB383_19>
   9a648: 05 00 d7 ff 00 00 00 00      	ja -0x29 <LBB383_9>
