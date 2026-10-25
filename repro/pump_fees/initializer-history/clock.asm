   b10f0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   b10f8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   b1100: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   b1108: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
   b1110: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   b1118: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
   b1120: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b1128: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   b1130: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_get_clock_sysvar
   b1138: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   b1140: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   b1148: 55 00 0c 00 00 00 00 00      	jne r0, 0x0, +0xc <custom_panic+0xf860> ; branch 0xb11b0
   b1150: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   b1158: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   b1160: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   b1168: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   b1170: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   b1178: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   b1180: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
   b1188: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   b1190: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   b1198: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   b11a0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   b11a8: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0xf878> ; branch 0xb11c8
   b11b0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   b11b8: 85 10 00 00 fb 04 00 00      	call 0x4fb ; target 0xb3998
   b11c0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   b11c8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b11d0: 95 00 00 00 00 00 00 00      	exit
