  1a46a8: 7b 4a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r4
  1a46b0: bf 19 00 00 00 00 00 00      	mov64 r9, r1
  1a46b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a46c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
  1a46c8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  1a46d0: 79 36 00 00 00 00 00 00      	ldxdw r6, [r3 + 0x0]
  1a46d8: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
  1a46e8: af 16 00 00 00 00 00 00      	xor64 r6, r1
  1a46f0: a5 06 01 00 0d 00 00 00      	jlt r6, 0xd, +0x1 <custom_panic+0x4d448>
  1a46f8: b7 06 00 00 03 00 00 00      	mov64 r6, 0x3
  1a4700: b7 07 00 00 0c 00 00 00      	mov64 r7, 0xc
  1a4708: 7b 3a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r3
  1a4710: 7b 2a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r2
  1a4718: 65 06 05 00 05 00 00 00      	jsgt r6, 0x5, +0x5 <custom_panic+0x4d490>
  1a4720: 65 06 94 00 02 00 00 00      	jsgt r6, 0x2, +0x94 <custom_panic+0x4d910>
  1a4728: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
  1a4730: 15 06 16 00 00 00 00 00      	jeq r6, 0x0, +0x16 <custom_panic+0x4d530>
  1a4738: 15 06 14 00 01 00 00 00      	jeq r6, 0x1, +0x14 <custom_panic+0x4d528>
  1a4740: 05 00 1e 00 00 00 00 00      	ja +0x1e <custom_panic+0x4d580>
