
work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000009c478 <_ZN18pump_amm_recovered9__private8__global29close_user_volume_accumulator17hbe3d60380608f4b1E>:
   9c478: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   9c480: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   9c488: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   9c490: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   9c498: 18 01 00 00 5c ee 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10ee5c
   9c4a8: b7 02 00 00 27 00 00 00      	mov64 r2, 0x27
   9c4b0: 85 10 00 00 ff ff ff ff      	call -0x1
   9c4b8: 6a 0a 5e fe ff ff 00 00      	sth [r10 - 0x1a2], 0xffff
   9c4c0: 7b 8a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r8
   9c4c8: 7b 9a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r9
   9c4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c4d8: 07 01 00 00 5e fe ff ff      	add64 r1, -0x1a2
   9c4e0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   9c4e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c4f0: 07 01 00 00 38 ff ff ff      	add64 r1, -0xc8
   9c4f8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   9c500: 07 03 00 00 60 fe ff ff      	add64 r3, -0x1a0
   9c508: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   9c510: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9c518: 85 10 00 00 1b 81 00 00      	call 0x811b
   9c520: 79 a9 40 ff 00 00 00 00      	ldxdw r9, [r10 - 0xc0]
   9c528: 79 a8 38 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc8]
   9c530: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   9c538: 15 06 67 00 02 00 00 00      	jeq r6, 0x2, +0x67 <LBB395_18>
   9c540: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c548: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   9c550: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c558: 07 02 00 00 48 ff ff ff      	add64 r2, -0xb8
   9c560: b7 03 00 00 b2 00 00 00      	mov64 r3, 0xb2
   9c568: 85 10 00 00 47 dd 00 00      	call 0xdd47
   9c570: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   9c578: 63 1a 33 ff 00 00 00 00      	stxw [r10 - 0xcd], r1
   9c580: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   9c588: 73 1a 37 ff 00 00 00 00      	stxb [r10 - 0xc9], r1
   9c590: 73 6a 32 ff 00 00 00 00      	stxb [r10 - 0xce], r6
   9c598: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   9c5a0: 7b 8a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r8
   9c5a8: 71 a1 5f fe 00 00 00 00      	ldxb r1, [r10 - 0x1a1]
   9c5b0: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   9c5b8: 71 a1 5e fe 00 00 00 00      	ldxb r1, [r10 - 0x1a2]
   9c5c0: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   9c5c8: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   9c5d0: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   9c5d8: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   9c5e0: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   9c5e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c5f0: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   9c5f8: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   9c600: 7b 7a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r7
   9c608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c610: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   9c618: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c620: 07 02 00 00 38 ff ff ff      	add64 r2, -0xc8
   9c628: 85 10 00 00 47 4f 00 00      	call 0x4f47
   9c630: 79 a8 48 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1b8]
   9c638: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <LBB395_2>
   9c640: 05 00 25 00 00 00 00 00      	ja +0x25 <LBB395_10>

000000000009c648 <LBB395_2>:
   9c648: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c650: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   9c658: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c660: 07 02 00 00 70 fe ff ff      	add64 r2, -0x190
   9c668: 85 10 00 00 ec 82 00 00      	call 0x82ec
   9c670: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   9c678: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   9c680: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c688: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c690: 79 a9 40 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1c0]
   9c698: 79 a8 38 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1c8]
   9c6a0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c6a8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB395_4>
   9c6b0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c6b8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c6c0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c6c8 <LBB395_4>:
   9c6c8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c6d0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c6d8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c6e0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB395_6>
   9c6e8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c6f0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c6f8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c700 <LBB395_6>:
   9c700: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9c708: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   9c710: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c718: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c720: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c728: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB395_8>
   9c730: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c738: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c740: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c748 <LBB395_8>:
   9c748: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c750: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c758: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c760: 55 02 22 00 00 00 00 00      	jne r2, 0x0, +0x22 <LBB395_18>
   9c768: 05 00 1e 00 00 00 00 00      	ja +0x1e <LBB395_17>

000000000009c770 <LBB395_10>:
   9c770: 79 a9 50 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1b0]
   9c778: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   9c780: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   9c788: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c790: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c798: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c7a0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB395_12>
   9c7a8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c7b0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c7b8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c7c0 <LBB395_12>:
   9c7c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c7c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c7d0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c7d8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB395_14>
   9c7e0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c7e8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c7f0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c7f8 <LBB395_14>:
   9c7f8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9c800: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   9c808: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c810: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c818: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c820: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB395_16>
   9c828: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c830: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c838: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c840 <LBB395_16>:
   9c840: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c848: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c850: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c858: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB395_18>

000000000009c860 <LBB395_17>:
   9c860: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c868: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c870: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c878 <LBB395_18>:
   9c878: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   9c880: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   9c888: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   9c890: 95 00 00 00 00 00 00 00      	exit
