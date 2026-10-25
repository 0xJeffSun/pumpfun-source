  1a2ca8: 18 03 00 00 0b 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7ffffffffffffff5
  1a2cb8: 79 22 10 00 00 00 00 00      	ldxdw r2, [r2 + 0x10]
  1a2cc0: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
  1a2cc8: 18 05 00 00 fe ff ff ff 00 00 00 00 ff ff ff 7f      	lddw r5, 0x7ffffffffffffffe
  1a2cd8: 2d 54 09 00 00 00 00 00      	jgt r4, r5, +0x9 <custom_panic+0x4ba70>
  1a2ce0: bf 23 00 00 00 00 00 00      	mov64 r3, r2
  1a2ce8: 07 03 00 00 10 00 00 00      	add64 r3, 0x10
  1a2cf0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
  1a2cf8: 7b 42 10 00 00 00 00 00      	stxdw [r2 + 0x10], r4
  1a2d00: 7b 31 10 00 00 00 00 00      	stxdw [r1 + 0x10], r3
  1a2d08: 07 02 00 00 18 00 00 00      	add64 r2, 0x18
  1a2d10: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  1a2d18: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
  1a2d28: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
  1a2d30: 95 00 00 00 00 00 00 00      	exit
