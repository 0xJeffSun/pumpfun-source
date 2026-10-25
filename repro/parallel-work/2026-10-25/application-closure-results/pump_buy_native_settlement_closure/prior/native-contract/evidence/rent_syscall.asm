  1a0a20: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  1a0a28: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 40      	lddw r1, 0x4000000000000000
  1a0a38: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  1a0a40: 72 0a f8 ff 32 00 00 00      	stb [r10 - 0x8], 0x32
  1a0a48: 7a 0a e8 ff 98 0d 00 00      	stdw [r10 - 0x18], 0xd98
  1a0a50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a0a58: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  1a0a60: 85 10 00 00 ff ff ff ff      	call -0x1
  1a0a68: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a0a70: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
  1a0a78: 55 00 08 00 00 00 00 00      	jne r0, 0x0, +0x8 <custom_panic+0x49808>
  1a0a80: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
  1a0a88: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
  1a0a90: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  1a0a98: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  1a0aa0: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  1a0aa8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  1a0ab0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  1a0ab8: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0x49820>
  1a0ac0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
  1a0ac8: 85 10 00 00 f7 05 00 00      	call 0x5f7
  1a0ad0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  1a0ad8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  1a0ae0: 95 00 00 00 00 00 00 00      	exit
