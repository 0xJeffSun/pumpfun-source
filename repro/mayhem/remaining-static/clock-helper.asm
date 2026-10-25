   9efd0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9efd8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   9efe0: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9efe8: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
   9eff0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   9eff8: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
   9f000: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f008: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   9f010: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_get_clock_sysvar
   9f018: 15 00 03 00 00 00 00 00      	jeq r0, 0x0, +0x3 <custom_panic+0x1bb18>
   9f020: 62 06 04 00 10 00 00 00      	stw [r6 + 0x4], 0x10
   9f028: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   9f030: 05 00 0b 00 00 00 00 00      	ja +0xb <custom_panic+0x1bb70>
   9f038: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   9f040: 7b 16 28 00 00 00 00 00      	stxdw [r6 + 0x28], r1
   9f048: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   9f050: 7b 16 20 00 00 00 00 00      	stxdw [r6 + 0x20], r1
   9f058: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9f060: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
   9f068: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9f070: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   9f078: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9f080: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   9f088: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   9f090: 63 16 00 00 00 00 00 00      	stxw [r6 + 0x0], r1
   9f098: 95 00 00 00 00 00 00 00      	exit
