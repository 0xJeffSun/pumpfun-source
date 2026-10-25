  1a2d38: 18 03 00 00 0b 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7ffffffffffffff5
  1a2d48: 79 22 10 00 00 00 00 00      	ldxdw r2, [r2 + 0x10]
  1a2d50: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
  1a2d58: 55 04 08 00 00 00 00 00      	jne r4, 0x0, +0x8 <custom_panic+0x4bae8>
  1a2d60: bf 23 00 00 00 00 00 00      	mov64 r3, r2
  1a2d68: 07 03 00 00 10 00 00 00      	add64 r3, 0x10
  1a2d70: 7a 02 10 00 ff ff ff ff      	stdw [r2 + 0x10], -0x1
  1a2d78: 7b 31 10 00 00 00 00 00      	stxdw [r1 + 0x10], r3
  1a2d80: 07 02 00 00 18 00 00 00      	add64 r2, 0x18
  1a2d88: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  1a2d90: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
  1a2da0: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
  1a2da8: 95 00 00 00 00 00 00 00      	exit
