  1b3678: 62 0a fc ff 00 00 00 00      	stw [r10 - 0x4], 0x0
  1b3680: bf a4 00 00 00 00 00 00      	mov64 r4, r10
  1b3688: 07 04 00 00 fc ff ff ff      	add64 r4, -0x4
  1b3690: 85 10 00 00 ff ff ff ff      	call -0x1
  1b3698: 61 a0 fc ff 00 00 00 00      	ldxw r0, [r10 - 0x4]
  1b36a0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
  1b36a8: c7 00 00 00 20 00 00 00      	arsh64 r0, 0x20
  1b36b0: 95 00 00 00 00 00 00 00      	exit
