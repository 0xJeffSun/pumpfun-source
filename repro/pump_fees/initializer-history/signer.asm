   acb80: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   acb88: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   acb90: 71 23 28 00 00 00 00 00      	ldxb r3, [r2 + 0x28]
   acb98: 55 03 06 00 00 00 00 00      	jne r3, 0x0, +0x6 <custom_panic+0xb280> ; branch 0xacbd0
   acba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   acba8: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
   acbb0: b7 02 00 00 c2 0b 00 00      	mov64 r2, 0xbc2
   acbb8: 85 10 00 00 a6 06 00 00      	call 0x6a6 ; target 0xb00f0
   acbc0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   acbc8: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   acbd0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   acbd8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   acbe0: 95 00 00 00 00 00 00 00      	exit
