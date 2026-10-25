  1a2a68: 79 11 10 00 00 00 00 00      	ldxdw r1, [r1 + 0x10]
  1a2a70: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
  1a2a78: 18 03 00 00 fe ff ff ff 00 00 00 00 ff ff ff 7f      	lddw r3, 0x7ffffffffffffffe
  1a2a88: 2d 32 02 00 00 00 00 00      	jgt r2, r3, +0x2 <custom_panic+0x4b7e8>
  1a2a90: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
  1a2a98: 95 00 00 00 00 00 00 00      	exit
  1a2aa0: 18 01 00 00 58 f6 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bf658
  1a2ab0: 85 10 00 00 0a 12 00 00      	call 0x120a
