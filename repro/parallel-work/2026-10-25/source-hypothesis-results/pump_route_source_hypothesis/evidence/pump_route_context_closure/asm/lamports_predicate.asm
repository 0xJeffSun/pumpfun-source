  1a29f0: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
  1a29f8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
  1a2a00: 18 03 00 00 fe ff ff ff 00 00 00 00 ff ff ff 7f      	lddw r3, 0x7ffffffffffffffe
  1a2a10: 2d 32 07 00 00 00 00 00      	jgt r2, r3, +0x7 <custom_panic+0x4b798>
  1a2a18: bf 23 00 00 00 00 00 00      	mov64 r3, r2
  1a2a20: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
  1a2a28: 7b 31 10 00 00 00 00 00      	stxdw [r1 + 0x10], r3
  1a2a30: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
  1a2a38: 79 30 00 00 00 00 00 00      	ldxdw r0, [r3 + 0x0]
  1a2a40: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
  1a2a48: 95 00 00 00 00 00 00 00      	exit
  1a2a50: 18 01 00 00 40 f6 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bf640
  1a2a60: 85 10 00 00 14 12 00 00      	call 0x1214
