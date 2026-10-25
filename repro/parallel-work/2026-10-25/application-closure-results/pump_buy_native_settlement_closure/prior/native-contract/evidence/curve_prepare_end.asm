   3d1b0: 79 a8 80 ff 00 00 00 00      	ldxdw r8, [r10 - 0x80]
   3d1b8: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
   3d1c0: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   3d1c8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   3d1d0: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   3d1d8: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0x3d0d8>
   3d1e0: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   3d1e8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   3d1f0: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   3d1f8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   3d200: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   3d208: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   3d210: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x3d110>
   3d218: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   3d220: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   3d228: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   3d230: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
   3d238: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   3d240: 7b 82 00 00 00 00 00 00      	stxdw [r2 + 0x0], r8
   3d248: 95 00 00 00 00 00 00 00      	exit
