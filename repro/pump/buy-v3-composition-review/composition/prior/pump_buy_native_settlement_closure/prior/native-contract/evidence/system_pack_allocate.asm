  1a4838: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  1a4840: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  1a4848: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a4850: 85 10 00 00 f2 64 ff ff      	call -0x9b0e
  1a4858: 15 00 54 03 00 00 00 00      	jeq r0, 0x0, +0x354 <custom_panic+0x4f048>
  1a4860: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  1a4868: 7b 0a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r0
  1a4870: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  1a4878: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
  1a4880: 65 06 21 00 05 00 00 00      	jsgt r6, 0x5, +0x21 <custom_panic+0x4d6d8>
  1a4888: 79 a4 d8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x28]
  1a4890: 65 06 69 00 02 00 00 00      	jsgt r6, 0x2, +0x69 <custom_panic+0x4d928>
  1a4898: 15 06 d0 00 00 00 00 00      	jeq r6, 0x0, +0xd0 <custom_panic+0x4dc68>
  1a48a0: 15 06 b0 02 01 00 00 00      	jeq r6, 0x1, +0x2b0 <custom_panic+0x4eb70>
  1a48a8: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  1a48b0: 25 01 08 00 03 00 00 00      	jgt r1, 0x3, +0x8 <custom_panic+0x4d640>
  1a48b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a48c0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
  1a48c8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  1a48d0: b7 03 00 00 04 00 00 00      	mov64 r3, 0x4
  1a48d8: 85 10 00 00 0c 04 00 00      	call 0x40c
