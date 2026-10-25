   15fc8: 7b 6a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r6
   15fd0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   15fd8: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   15fe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   15fe8: 07 01 00 00 60 fd ff ff      	add64 r1, -0x2a0
   15ff0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   15ff8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   16000: 85 10 00 00 76 0b 03 00      	call 0x30b76
   16008: 79 a7 68 fd 00 00 00 00      	ldxdw r7, [r10 - 0x298]
   16010: 79 a8 60 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2a0]
   16018: 05 00 23 fe 00 00 00 00      	ja -0x1dd <.text+0x15018>
