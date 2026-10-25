
evidence/original/pump/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000001572b8 <custom_panic>:
  17c548: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
  17c550: 69 28 10 00 00 00 00 00      	ldxh r8, [r2 + 0x10]
  17c558: bf 34 00 00 00 00 00 00      	mov64 r4, r3
  17c560: 15 08 02 00 00 00 00 00      	jeq r8, 0x0, +0x2 <custom_panic+0x252c0>
  17c568: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
  17c570: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <custom_panic+0x252d8>
  17c578: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
  17c580: 7b 71 00 00 00 00 00 00      	stxdw [r1 + 0x0], r7
  17c588: 95 00 00 00 00 00 00 00      	exit
  17c590: 55 08 0b 00 10 27 00 00      	jne r8, 0x2710, +0xb <custom_panic+0x25338>
  17c598: 79 25 08 00 00 00 00 00      	ldxdw r5, [r2 + 0x8]
  17c5a0: bf 54 00 00 00 00 00 00      	mov64 r4, r5
  17c5a8: 0f 34 00 00 00 00 00 00      	add64 r4, r3
  17c5b0: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  17c5b8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  17c5c0: ad 54 01 00 00 00 00 00      	jlt r4, r5, +0x1 <custom_panic+0x25318>
  17c5c8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  17c5d0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
  17c5d8: 55 02 f3 ff 00 00 00 00      	jne r2, 0x0, -0xd <custom_panic+0x252c0>
  17c5e0: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
  17c5e8: 05 00 f1 ff 00 00 00 00      	ja -0xf <custom_panic+0x252c0>
  17c5f0: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  17c5f8: a5 08 01 00 11 27 00 00      	jlt r8, 0x2711, +0x1 <custom_panic+0x25350>
  17c600: 05 00 ee ff 00 00 00 00      	ja -0x12 <custom_panic+0x252c0>
  17c608: 7b 2a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r2
  17c610: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
  17c618: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17c620: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
  17c628: b7 06 00 00 10 27 00 00      	mov64 r6, 0x2710
  17c630: 7b 3a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r3
  17c638: bf 32 00 00 00 00 00 00      	mov64 r2, r3
  17c640: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
  17c648: b7 04 00 00 10 27 00 00      	mov64 r4, 0x2710
  17c650: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  17c658: 85 10 00 00 ed 71 00 00      	call 0x71ed
  17c660: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
  17c668: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
  17c670: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  17c678: ad 81 01 00 00 00 00 00      	jlt r1, r8, +0x1 <custom_panic+0x253d0>
  17c680: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  17c688: 79 a3 f8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x8]
  17c690: 1f 23 00 00 00 00 00 00      	sub64 r3, r2
  17c698: 1f 81 00 00 00 00 00 00      	sub64 r1, r8
  17c6a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
  17c6a8: 07 02 00 00 0f 27 00 00      	add64 r2, 0x270f
  17c6b0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
  17c6b8: ad 12 01 00 00 00 00 00      	jlt r2, r1, +0x1 <custom_panic+0x25410>
  17c6c0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
  17c6c8: 0f 43 00 00 00 00 00 00      	add64 r3, r4
  17c6d0: 1f 86 00 00 00 00 00 00      	sub64 r6, r8
  17c6d8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
  17c6e0: 25 08 01 00 10 27 00 00      	jgt r8, 0x2710, +0x1 <custom_panic+0x25438>
  17c6e8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  17c6f0: 87 05 00 00 00 00 00 00      	neg64 r5
  17c6f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17c700: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
  17c708: bf 64 00 00 00 00 00 00      	mov64 r4, r6
  17c710: 85 10 00 00 2e 6f 00 00      	call 0x6f2e
  17c718: 79 a4 e0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x20]
  17c720: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
  17c728: ad 24 01 00 00 00 00 00      	jlt r4, r2, +0x1 <custom_panic+0x25480>
  17c730: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
  17c738: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  17c740: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
  17c748: 79 a5 d8 ff 00 00 00 00      	ldxdw r5, [r10 - 0x28]
  17c750: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <custom_panic+0x254a8>
  17c758: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
  17c760: 57 09 00 00 01 00 00 00      	and64 r9, 0x1
  17c768: 55 09 c1 ff 00 00 00 00      	jne r9, 0x0, -0x3f <custom_panic+0x252c0>
  17c770: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
  17c778: ad 24 01 00 00 00 00 00      	jlt r4, r2, +0x1 <custom_panic+0x254d0>
  17c780: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
  17c788: bf 30 00 00 00 00 00 00      	mov64 r0, r3
  17c790: 1f 60 00 00 00 00 00 00      	sub64 r0, r6
  17c798: bf 47 00 00 00 00 00 00      	mov64 r7, r4
  17c7a0: 1f 27 00 00 00 00 00 00      	sub64 r7, r2
  17c7a8: 79 55 08 00 00 00 00 00      	ldxdw r5, [r5 + 0x8]
  17c7b0: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
  17c7b8: 3d 57 01 00 00 00 00 00      	jge r7, r5, +0x1 <custom_panic+0x25510>
  17c7c0: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
  17c7c8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <custom_panic+0x25520>
  17c7d0: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
  17c7d8: 57 06 00 00 01 00 00 00      	and64 r6, 0x1
  17c7e0: 55 06 04 00 00 00 00 00      	jne r6, 0x0, +0x4 <custom_panic+0x25550>
  17c7e8: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
  17c7f0: 15 03 b0 ff 00 00 00 00      	jeq r3, 0x0, -0x50 <custom_panic+0x252c0>
  17c7f8: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  17c800: 05 00 ae ff 00 00 00 00      	ja -0x52 <custom_panic+0x252c0>
  17c808: bf 24 00 00 00 00 00 00      	mov64 r4, r2
  17c810: 0f 54 00 00 00 00 00 00      	add64 r4, r5
  17c818: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  17c820: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  17c828: ad 24 01 00 00 00 00 00      	jlt r4, r2, +0x1 <custom_panic+0x25580>
  17c830: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
  17c838: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
  17c840: 55 03 a6 ff 00 00 00 00      	jne r3, 0x0, -0x5a <custom_panic+0x252c0>
  17c848: 05 00 b2 ff 00 00 00 00      	ja -0x4e <custom_panic+0x25328>
