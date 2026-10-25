  1a7ff0: 25 03 1f 00 10 00 00 00      	jgt r3, 0x10, +0x1f <custom_panic+0x50e38>
  1a7ff8: bf 35 00 00 00 00 00 00      	mov64 r5, r3
  1a8000: 67 05 00 00 04 00 00 00      	lsh64 r5, 0x4
  1a8008: bf 20 00 00 00 00 00 00      	mov64 r0, r2
  1a8010: 05 00 04 00 00 00 00 00      	ja +0x4 <custom_panic+0x50d80>
  1a8018: 07 05 00 00 f0 ff ff ff      	add64 r5, -0x10
  1a8020: 79 06 08 00 00 00 00 00      	ldxdw r6, [r0 + 0x8]
  1a8028: 07 00 00 00 10 00 00 00      	add64 r0, 0x10
  1a8030: 25 06 17 00 20 00 00 00      	jgt r6, 0x20, +0x17 <custom_panic+0x50e38>
  1a8038: 55 05 fb ff 00 00 00 00      	jne r5, 0x0, -0x5 <custom_panic+0x50d60>
  1a8040: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  1a8048: 7a 0a c8 ff 00 00 00 00      	stdw [r10 - 0x38], 0x0
  1a8050: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
  1a8058: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
  1a8060: 7a 0a b0 ff 00 00 00 00      	stdw [r10 - 0x50], 0x0
  1a8068: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  1a8070: 07 05 00 00 b0 ff ff ff      	add64 r5, -0x50
  1a8078: bf 21 00 00 00 00 00 00      	mov64 r1, r2
  1a8080: bf 32 00 00 00 00 00 00      	mov64 r2, r3
  1a8088: bf 43 00 00 00 00 00 00      	mov64 r3, r4
  1a8090: bf 54 00 00 00 00 00 00      	mov64 r4, r5
  1a8098: 85 10 00 00 ff ff ff ff      	call -0x1
  1a80a0: 15 00 0b 00 00 00 00 00      	jeq r0, 0x0, +0xb <custom_panic+0x50e48>
  1a80a8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a80b0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a80b8: 15 00 03 00 01 00 00 00      	jeq r0, 0x1, +0x3 <custom_panic+0x50e20>
  1a80c0: 15 00 01 00 02 00 00 00      	jeq r0, 0x2, +0x1 <custom_panic+0x50e18>
  1a80c8: 05 00 12 00 00 00 00 00      	ja +0x12 <custom_panic+0x50ea8>
  1a80d0: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
  1a80d8: 73 21 01 00 00 00 00 00      	stxb [r1 + 0x1], r2
  1a80e0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a80e8: 05 00 0c 00 00 00 00 00      	ja +0xc <custom_panic+0x50e98>
  1a80f0: 6a 01 00 00 01 00 00 00      	sth [r1 + 0x0], 0x1
  1a80f8: 05 00 0b 00 00 00 00 00      	ja +0xb <custom_panic+0x50ea0>
  1a8100: 79 a2 c8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x38]
  1a8108: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a8110: 7b 21 19 00 00 00 00 00      	stxdw [r1 + 0x19], r2
  1a8118: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
  1a8120: 7b 21 11 00 00 00 00 00      	stxdw [r1 + 0x11], r2
  1a8128: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  1a8130: 7b 21 09 00 00 00 00 00      	stxdw [r1 + 0x9], r2
  1a8138: 79 a2 b0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x50]
  1a8140: 7b 21 01 00 00 00 00 00      	stxdw [r1 + 0x1], r2
  1a8148: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  1a8150: 73 21 00 00 00 00 00 00      	stxb [r1 + 0x0], r2
  1a8158: 95 00 00 00 00 00 00 00      	exit
