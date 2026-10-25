  1a7eb8: bf 40 00 00 00 00 00 00      	mov64 r0, r4
  1a7ec0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  1a7ec8: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  1a7ed0: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
  1a7ed8: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
  1a7ee0: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
  1a7ee8: 72 0a ff ff ff 00 00 00      	stb [r10 - 0x1], 0xff
  1a7ef0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
  1a7ef8: 07 04 00 00 c8 ff ff ff      	add64 r4, -0x38
  1a7f00: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  1a7f08: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  1a7f10: bf 21 00 00 00 00 00 00      	mov64 r1, r2
  1a7f18: bf 32 00 00 00 00 00 00      	mov64 r2, r3
  1a7f20: bf 03 00 00 00 00 00 00      	mov64 r3, r0
  1a7f28: 85 10 00 00 ff ff ff ff      	call -0x1
  1a7f30: 15 00 0c 00 00 00 00 00      	jeq r0, 0x0, +0xc <custom_panic+0x50ce0>
  1a7f38: 18 01 00 00 c0 f8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bf8c0
  1a7f48: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
  1a7f50: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
  1a7f58: 7a 0a d0 ff 01 00 00 00      	stdw [r10 - 0x30], 0x1
  1a7f60: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  1a7f68: 7a 0a d8 ff 08 00 00 00      	stdw [r10 - 0x28], 0x8
  1a7f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a7f78: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
  1a7f80: 18 02 00 00 d0 f8 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1bf8d0
  1a7f90: 85 10 00 00 1f 09 00 00      	call 0x91f
  1a7f98: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
  1a7fa0: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
  1a7fa8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
  1a7fb0: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
  1a7fb8: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
  1a7fc0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
  1a7fc8: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
  1a7fd0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  1a7fd8: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
  1a7fe0: 73 16 20 00 00 00 00 00      	stxb [r6 + 0x20], r1
  1a7fe8: 95 00 00 00 00 00 00 00      	exit
