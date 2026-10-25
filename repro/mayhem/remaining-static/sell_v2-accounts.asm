   61b40: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   61b48: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   61b50: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   61b58: 7b 2a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r2
   61b60: 7b 1a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r1
   61b68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   61b70: 07 01 00 00 68 fc ff ff      	add64 r1, -0x398
   61b78: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   61b80: 85 10 00 00 95 50 ff ff      	call -0xaf6b ; target 0xa030
   61b88: 79 a6 70 fc 00 00 00 00      	ldxdw r6, [r10 - 0x390]
   61b90: 79 a8 68 fc 00 00 00 00      	ldxdw r8, [r10 - 0x398]
   61b98: 55 08 2e 00 02 00 00 00      	jne r8, 0x2, +0x2e <.text+0x61bf0>
   61ba0: 79 71 10 f0 00 00 00 00      	ldxdw r1, [r7 - 0xff0]
   61ba8: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   61bb0: 79 78 08 f0 00 00 00 00      	ldxdw r8, [r7 - 0xff8]
   61bb8: 79 77 00 f0 00 00 00 00      	ldxdw r7, [r7 - 0x1000]
   61bc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   61bc8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   61bd0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   61bd8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   61be0: 85 10 00 00 dd 50 ff ff      	call -0xaf23 ; target 0xa2d0
   61be8: 71 a1 fd ff 00 00 00 00      	ldxb r1, [r10 - 0x3]
   61bf0: 55 01 54 00 02 00 00 00      	jne r1, 0x2, +0x54 <.text+0x61d78>
   61bf8: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   61c00: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   61c08: 85 10 00 00 3c 43 00 00      	call 0x433c ; target 0x835f0
   61c10: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   61c20: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   61c28: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   61c30: 07 01 00 00 f3 ff ff ff      	add64 r1, -0xd
   61c38: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   61c40: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   61c48: 2d 21 60 00 00 00 00 00      	jgt r1, r2, +0x60 <.text+0x61e30>
   61c50: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   61c58: 15 04 5f 00 00 00 00 00      	jeq r4, 0x0, +0x5f <.text+0x61e38>
   61c60: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   61c70: 15 02 60 00 00 00 00 00      	jeq r2, 0x0, +0x60 <.text+0x61e58>
   61c78: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   61c80: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   61c90: 15 06 5f 00 01 00 00 00      	jeq r6, 0x1, +0x5f <.text+0x61e70>
   61c98: bd 21 5f 00 00 00 00 00      	jle r1, r2, +0x5f <.text+0x61e78>
   61ca0: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   61cb0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   61cb8: 18 02 00 00 6c 5f 70 61 00 00 00 00 72 61 6d 73      	lddw r2, 0x736d617261705f6c
   61cc8: 7b 21 05 00 00 00 00 00      	stxdw [r1 + 0x5], r2
   61cd0: 18 02 00 00 67 6c 6f 62 00 00 00 00 61 6c 5f 70      	lddw r2, 0x705f6c61626f6c67
   61ce0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   61ce8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   61cf0: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   61cf8: 7a 07 18 00 0d 00 00 00      	stdw [r7 + 0x18], 0xd
   61d00: 7a 07 08 00 0d 00 00 00      	stdw [r7 + 0x8], 0xd
   61d08: 05 00 df 00 00 00 00 00      	ja +0xdf <.text+0x622e8>
   61d10: 85 10 00 00 1b 43 00 00      	call 0x431b ; target 0x835f0
   61d18: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   61d28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   61d30: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   61d38: 07 01 00 00 fa ff ff ff      	add64 r1, -0x6
   61d40: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   61d48: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   61d50: 2d 21 10 00 00 00 00 00      	jgt r1, r2, +0x10 <.text+0x61cb8>
   61d58: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   61d60: 15 04 0f 00 00 00 00 00      	jeq r4, 0x0, +0xf <.text+0x61cc0>
   61d68: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   61d78: 15 02 10 00 00 00 00 00      	jeq r2, 0x0, +0x10 <.text+0x61ce0>
   61d80: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   61d88: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   61d90: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   61d98: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   61da8: 2d 21 0f 00 00 00 00 00      	jgt r1, r2, +0xf <.text+0x61d08>
   61db0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   61db8: b7 02 00 00 06 00 00 00      	mov64 r2, 0x6
   61dc0: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   61dd0: 85 10 00 00 4e 83 00 00      	call 0x834e ; target 0xa3848
   61dd8: 55 04 f1 ff 00 00 00 00      	jne r4, 0x0, -0xf <.text+0x61c48>
   61de0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   61de8: 18 01 00 00 fa 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffa
   61df8: 55 02 f0 ff 00 00 00 00      	jne r2, 0x0, -0x10 <.text+0x61c60>
   61e00: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   61e08: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   61e10: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   61e20: bd 21 f1 ff 00 00 00 00      	jle r1, r2, -0xf <.text+0x61c90>
   61e28: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   61e38: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   61e40: 6a 01 04 00 65 72 00 00      	sth [r1 + 0x4], 0x7265
   61e48: 62 01 00 00 74 72 61 64      	stw [r1 + 0x0], 0x64617274
   61e50: 79 62 00 00 00 00 00 00      	ldxdw r2, [r6 + 0x0]
   61e58: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   61e60: 7a 06 18 00 06 00 00 00      	stdw [r6 + 0x18], 0x6
   61e68: 7a 06 08 00 06 00 00 00      	stdw [r6 + 0x8], 0x6
   61e70: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   61e78: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   61e80: 7b 61 10 00 00 00 00 00      	stxdw [r1 + 0x10], r6
   61e88: 7b 81 08 00 00 00 00 00      	stxdw [r1 + 0x8], r8
   61e90: 05 00 b2 00 00 00 00 00      	ja +0xb2 <.text+0x62308>
   61e98: 85 10 00 00 ea 42 00 00      	call 0x42ea ; target 0x835f0
   61ea0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   61eb0: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   61eb8: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   61ec0: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   61ec8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   61ed0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   61ed8: 2d 53 1c 00 00 00 00 00      	jgt r3, r5, +0x1c <.text+0x61ea0>
   61ee0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   61ee8: 15 04 1b 00 00 00 00 00      	jeq r4, 0x0, +0x1b <.text+0x61ea8>
   61ef0: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   61f00: 15 05 1c 00 00 00 00 00      	jeq r5, 0x0, +0x1c <.text+0x61ec8>
   61f08: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   61f10: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   61f18: 7b 8a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r8
   61f20: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   61f30: 2d 21 1a 00 00 00 00 00      	jgt r1, r2, +0x1a <.text+0x61ee8>
   61f38: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   61f40: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   61f48: 85 10 00 00 23 83 00 00      	call 0x8323 ; target 0xa3868
   61f50: 55 04 a1 ff 00 00 00 00      	jne r4, 0x0, -0x5f <.text+0x61b40>
   61f58: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   61f60: 18 01 00 00 f3 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff3
   61f70: 55 02 a0 ff 00 00 00 00      	jne r2, 0x0, -0x60 <.text+0x61b58>
   61f78: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   61f88: 55 06 a1 ff 01 00 00 00      	jne r6, 0x1, -0x5f <.text+0x61b78>
   61f90: 2d 21 a1 ff 00 00 00 00      	jgt r1, r2, -0x5f <.text+0x61b80>
   61f98: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   61fa0: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   61fa8: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   61fb8: 85 10 00 00 11 83 00 00      	call 0x8311 ; target 0xa3848
   61fc0: 55 04 e5 ff 00 00 00 00      	jne r4, 0x0, -0x1b <.text+0x61dd0>
   61fc8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   61fd0: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   61fe0: 55 05 e4 ff 00 00 00 00      	jne r5, 0x0, -0x1c <.text+0x61de8>
   61fe8: 7b 8a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r8
   61ff0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62000: bd 21 e6 ff 00 00 00 00      	jle r1, r2, -0x1a <.text+0x61e18>
   62008: 18 08 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300000000
   62018: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   62020: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   62028: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   62030: 7b 1a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r1
   62038: b7 03 00 00 00 01 00 00      	mov64 r3, 0x100
   62040: 85 10 00 00 a8 90 00 00      	call 0x90a8 ; target 0xaa588
   62048: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62050: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   62058: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62060: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62068: 85 10 00 00 19 50 ff ff      	call -0xafe7 ; target 0xa138
   62070: 71 a1 69 ff 00 00 00 00      	ldxb r1, [r10 - 0x97]
   62078: 55 01 1f 00 02 00 00 00      	jne r1, 0x2, +0x1f <.text+0x62058>
   62080: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   62088: 79 a6 00 ff 00 00 00 00      	ldxdw r6, [r10 - 0x100]
   62090: 85 10 00 00 ab 42 00 00      	call 0x42ab ; target 0x835f0
   62098: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   620a0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   620a8: 07 01 00 00 f4 ff ff ff      	add64 r1, -0xc
   620b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   620b8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   620c0: 2d 21 2a 00 00 00 00 00      	jgt r1, r2, +0x2a <.text+0x620f8>
   620c8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   620d0: 15 04 29 00 00 00 00 00      	jeq r4, 0x0, +0x29 <.text+0x62100>
   620d8: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   620e8: 15 02 2a 00 00 00 00 00      	jeq r2, 0x0, +0x2a <.text+0x62120>
   620f0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   620f8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62108: 15 06 29 00 01 00 00 00      	jeq r6, 0x1, +0x29 <.text+0x62138>
   62110: bd 21 29 00 00 00 00 00      	jle r1, r2, +0x29 <.text+0x62140>
   62118: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   62128: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   62130: 18 02 00 00 6d 61 79 68 00 00 00 00 65 6d 5f 73      	lddw r2, 0x735f6d656879616d
   62140: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   62148: 62 01 08 00 74 61 74 65      	stw [r1 + 0x8], 0x65746174
   62150: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   62158: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   62160: 7a 07 18 00 0c 00 00 00      	stdw [r7 + 0x18], 0xc
   62168: 7a 07 08 00 0c 00 00 00      	stdw [r7 + 0x8], 0xc
   62170: 05 00 52 00 00 00 00 00      	ja +0x52 <.text+0x622e8>
   62178: 85 10 00 00 8e 42 00 00      	call 0x428e ; target 0x835f0
   62180: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   62188: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   62190: 07 03 00 00 90 ff ff ff      	add64 r3, -0x70
   62198: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   621a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   621a8: 2d 53 1b 00 00 00 00 00      	jgt r3, r5, +0x1b <.text+0x62168>
   621b0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   621b8: 15 04 1a 00 00 00 00 00      	jeq r4, 0x0, +0x1a <.text+0x62170>
   621c0: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   621d0: 15 05 1b 00 00 00 00 00      	jeq r5, 0x0, +0x1b <.text+0x62190>
   621d8: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   621e0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   621e8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   621f8: 2d 21 19 00 00 00 00 00      	jgt r1, r2, +0x19 <.text+0x621a8>
   62200: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   62208: b7 02 00 00 70 00 00 00      	mov64 r2, 0x70
   62210: 85 10 00 00 ca 82 00 00      	call 0x82ca ; target 0xa3868
   62218: 55 04 d7 ff 00 00 00 00      	jne r4, 0x0, -0x29 <.text+0x61fb8>
   62220: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   62228: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   62238: 55 02 d6 ff 00 00 00 00      	jne r2, 0x0, -0x2a <.text+0x61fd0>
   62240: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62250: 55 06 d7 ff 01 00 00 00      	jne r6, 0x1, -0x29 <.text+0x61ff0>
   62258: 2d 21 d7 ff 00 00 00 00      	jgt r1, r2, -0x29 <.text+0x61ff8>
   62260: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   62268: b7 02 00 00 0c 00 00 00      	mov64 r2, 0xc
   62270: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   62280: 85 10 00 00 b8 82 00 00      	call 0x82b8 ; target 0xa3848
   62288: 55 04 e6 ff 00 00 00 00      	jne r4, 0x0, -0x1a <.text+0x620a0>
   62290: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   62298: 18 01 00 00 90 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f90
   622a8: 55 05 e5 ff 00 00 00 00      	jne r5, 0x0, -0x1b <.text+0x620b8>
   622b0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   622c0: bd 21 e7 ff 00 00 00 00      	jle r1, r2, -0x19 <.text+0x620e0>
   622c8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   622d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   622d8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   622e0: 7b 1a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r1
   622e8: b7 03 00 00 70 00 00 00      	mov64 r3, 0x70
   622f0: 85 10 00 00 52 90 00 00      	call 0x9052 ; target 0xaa588
   622f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62300: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   62308: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62310: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62318: 85 10 00 00 3a 41 ff ff      	call -0xbec6 ; target 0x2cf0
   62320: 61 a1 00 ff 00 00 00 00      	ldxw r1, [r10 - 0x100]
   62328: 55 01 21 00 02 00 00 00      	jne r1, 0x2, +0x21 <.text+0x62318>
   62330: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   62338: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   62340: 85 10 00 00 55 42 00 00      	call 0x4255 ; target 0x835f0
   62348: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   62350: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   62358: 07 01 00 00 fc ff ff ff      	add64 r1, -0x4
   62360: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   62368: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   62370: 2d 21 2d 00 00 00 00 00      	jgt r1, r2, +0x2d <.text+0x623c0>
   62378: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   62380: 15 04 2c 00 00 00 00 00      	jeq r4, 0x0, +0x2c <.text+0x623c8>
   62388: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   62398: 15 02 2d 00 00 00 00 00      	jeq r2, 0x0, +0x2d <.text+0x623e8>
   623a0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   623a8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   623b8: 15 06 2c 00 01 00 00 00      	jeq r6, 0x1, +0x2c <.text+0x62400>
   623c0: bd 21 2c 00 00 00 00 00      	jle r1, r2, +0x2c <.text+0x62408>
   623c8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   623d8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   623e0: 62 01 00 00 6d 69 6e 74      	stw [r1 + 0x0], 0x746e696d
   623e8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   623f0: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   623f8: 7a 07 18 00 04 00 00 00      	stdw [r7 + 0x18], 0x4
   62400: 7a 07 08 00 04 00 00 00      	stdw [r7 + 0x8], 0x4
   62408: 7a 07 00 00 01 00 00 00      	stdw [r7 + 0x0], 0x1
   62410: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   62418: 7b 71 10 00 00 00 00 00      	stxdw [r1 + 0x10], r7
   62420: 7b 61 08 00 00 00 00 00      	stxdw [r1 + 0x8], r6
   62428: 7a 01 00 00 00 00 00 00      	stdw [r1 + 0x0], 0x0
   62430: 95 00 00 00 00 00 00 00      	exit
   62438: 85 10 00 00 36 42 00 00      	call 0x4236 ; target 0x835f0
   62440: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   62448: bf 53 00 00 00 00 00 00      	mov64 r3, r5
   62450: 07 03 00 00 80 ff ff ff      	add64 r3, -0x80
   62458: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   62460: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   62468: 2d 53 1c 00 00 00 00 00      	jgt r3, r5, +0x1c <.text+0x62430>
   62470: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   62478: 79 a8 50 fc 00 00 00 00      	ldxdw r8, [r10 - 0x3b0]
   62480: 15 04 1b 00 00 00 00 00      	jeq r4, 0x0, +0x1b <.text+0x62440>
   62488: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   62498: 15 05 1c 00 00 00 00 00      	jeq r5, 0x0, +0x1c <.text+0x62460>
   624a0: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   624a8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   624b0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   624c0: 2d 21 1a 00 00 00 00 00      	jgt r1, r2, +0x1a <.text+0x62478>
   624c8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   624d0: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   624d8: 85 10 00 00 71 82 00 00      	call 0x8271 ; target 0xa3868
   624e0: 55 04 d4 ff 00 00 00 00      	jne r4, 0x0, -0x2c <.text+0x62268>
   624e8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   624f0: 18 01 00 00 fc 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ffc
   62500: 55 02 d3 ff 00 00 00 00      	jne r2, 0x0, -0x2d <.text+0x62280>
   62508: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62518: 55 06 d4 ff 01 00 00 00      	jne r6, 0x1, -0x2c <.text+0x622a0>
   62520: 2d 21 d4 ff 00 00 00 00      	jgt r1, r2, -0x2c <.text+0x622a8>
   62528: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   62530: b7 02 00 00 04 00 00 00      	mov64 r2, 0x4
   62538: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   62548: 85 10 00 00 5f 82 00 00      	call 0x825f ; target 0xa3848
   62550: 79 a8 50 fc 00 00 00 00      	ldxdw r8, [r10 - 0x3b0]
   62558: 55 04 e5 ff 00 00 00 00      	jne r4, 0x0, -0x1b <.text+0x62368>
   62560: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   62568: 18 01 00 00 80 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f80
   62578: 55 05 e4 ff 00 00 00 00      	jne r5, 0x0, -0x1c <.text+0x62380>
   62580: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62590: bd 21 e6 ff 00 00 00 00      	jle r1, r2, -0x1a <.text+0x623a8>
   62598: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   625a8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   625b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   625b8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   625c0: 7b 1a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r1
   625c8: b7 03 00 00 80 00 00 00      	mov64 r3, 0x80
   625d0: 85 10 00 00 f6 8f 00 00      	call 0x8ff6 ; target 0xaa588
   625d8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   625e0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x62500>
   625e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   625f0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   625f8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   62600: 7b 1a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r1
   62608: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   62610: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   62618: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0x62520>
   62620: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   62628: 85 10 00 00 f7 6f 00 00      	call 0x6ff7 ; target 0x9a5e8
   62630: 55 00 47 00 02 00 00 00      	jne r0, 0x2, +0x47 <.text+0x62750>
   62638: 7b 1a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r1
   62640: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62648: 07 01 00 00 78 fc ff ff      	add64 r1, -0x388
   62650: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62658: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62660: 85 10 00 00 e1 4f ff ff      	call -0xb01f ; target 0xa570
   62668: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   62670: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   62678: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x62570>
   62680: 7b 2a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r2
   62688: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x625a0>
   62690: 18 03 00 00 96 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb96 ; data 'associated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event'
   626a0: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   626a8: 85 10 00 00 cc 42 ff ff      	call -0xbd34 ; target 0x3d10
   626b0: 55 00 8e 05 02 00 00 00      	jne r0, 0x2, +0x58e <.text+0x65208>
   626b8: 7b 1a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r1
   626c0: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   626c8: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   626d0: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   626d8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   626e0: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   626e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   626f0: 07 01 00 00 88 fc ff ff      	add64 r1, -0x378
   626f8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62700: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   62708: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62710: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   62718: 85 10 00 00 32 45 ff ff      	call -0xbace ; target 0x50b0
   62720: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   62728: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   62730: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x62628>
   62738: 7b 2a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r2
   62740: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x62658>
   62748: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   62758: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   62760: 85 10 00 00 b5 42 ff ff      	call -0xbd4b ; target 0x3d10
   62768: 55 00 77 05 02 00 00 00      	jne r0, 0x2, +0x577 <.text+0x65208>
   62770: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   62778: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   62780: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   62788: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   62790: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   62798: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   627a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   627a8: 07 01 00 00 98 fc ff ff      	add64 r1, -0x368
   627b0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   627b8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   627c0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   627c8: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   627d0: 85 10 00 00 1b 45 ff ff      	call -0xbae5 ; target 0x50b0
   627d8: 79 a2 a0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x360]
   627e0: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   627e8: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x62700>
   627f0: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   62800: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   62808: 85 10 00 00 a0 42 ff ff      	call -0xbd60 ; target 0x3d10
   62810: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62818: 55 00 fc 01 02 00 00 00      	jne r0, 0x2, +0x1fc <.text+0x636e0>
   62820: 7b 2a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r2
   62828: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   62830: 15 01 36 00 00 00 00 00      	jeq r1, 0x0, +0x36 <.text+0x628c8>
   62838: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62840: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62848: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   62850: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   62858: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   62860: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   62868: 05 00 3c 00 00 00 00 00      	ja +0x3c <.text+0x62930>
   62870: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   62878: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   62880: 85 10 00 00 ad 41 00 00      	call 0x41ad ; target 0x835f0
   62888: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   62898: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   628a0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   628a8: 07 01 00 00 f6 ff ff ff      	add64 r1, -0xa
   628b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   628b8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   628c0: 2d 21 1d 00 00 00 00 00      	jgt r1, r2, +0x1d <.text+0x62890>
   628c8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   628d0: 15 04 1c 00 00 00 00 00      	jeq r4, 0x0, +0x1c <.text+0x62898>
   628d8: 18 01 00 00 f6 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff6
   628e8: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   628f0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x627e0>
   628f8: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   62900: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   62908: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   62910: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   62920: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   62928: bd 21 9a 05 00 00 00 00      	jle r1, r2, +0x59a <.text+0x654e0>
   62930: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   62940: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   62948: 18 02 00 00 71 75 6f 74 00 00 00 00 65 5f 6d 69      	lddw r2, 0x696d5f65746f7571
   62958: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   62960: 6a 01 08 00 6e 74 00 00      	sth [r1 + 0x8], 0x746e
   62968: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   62970: 7b 13 10 00 00 00 00 00      	stxdw [r3 + 0x10], r1
   62978: 7a 03 18 00 0a 00 00 00      	stdw [r3 + 0x18], 0xa
   62980: 7a 03 08 00 0a 00 00 00      	stdw [r3 + 0x8], 0xa
   62988: 7a 03 00 00 01 00 00 00      	stdw [r3 + 0x0], 0x1
   62990: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   62998: 7b 31 10 00 00 00 00 00      	stxdw [r1 + 0x10], r3
   629a0: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   629a8: 05 00 4f ff 00 00 00 00      	ja -0xb1 <.text+0x62308>
   629b0: 55 04 e4 ff 00 00 00 00      	jne r4, 0x0, -0x1c <.text+0x627b8>
   629b8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   629c0: 18 01 00 00 f6 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff6
   629d0: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   629d8: 55 02 e3 ff 00 00 00 00      	jne r2, 0x0, -0x1d <.text+0x627d8>
   629e0: 05 00 e3 ff 00 00 00 00      	ja -0x1d <.text+0x627e0>
   629e8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   629f0: 85 10 00 00 7e 6f 00 00      	call 0x6f7e ; target 0x9a5e8
   629f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62a00: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x628f8>
   62a08: 7b 2a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r2
   62a10: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x62930>
   62a18: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   62a20: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   62a30: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   62a38: 85 10 00 00 5a 42 ff ff      	call -0xbda6 ; target 0x3d10
   62a40: 55 00 1c 05 02 00 00 00      	jne r0, 0x2, +0x51c <.text+0x65208>
   62a48: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   62a50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62a58: 07 01 00 00 a8 fc ff ff      	add64 r1, -0x358
   62a60: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62a68: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62a70: 85 10 00 00 2d 4f ff ff      	call -0xb0d3 ; target 0xa3e0
   62a78: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   62a80: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   62a88: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x62980>
   62a90: 7b 2a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r2
   62a98: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x629b0>
   62aa0: 18 03 00 00 f4 da 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadaf4 ; data 'system_programglobal-paramsglobal_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogra'
   62ab0: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   62ab8: 85 10 00 00 4a 42 ff ff      	call -0xbdb6 ; target 0x3d10
   62ac0: 55 00 0c 05 02 00 00 00      	jne r0, 0x2, +0x50c <.text+0x65208>
   62ac8: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   62ad0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62ad8: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   62ae0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62ae8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62af0: 85 10 00 00 8f 4f ff ff      	call -0xb071 ; target 0xa770
   62af8: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   62b00: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   62b08: 55 01 02 00 02 00 00 00      	jne r1, 0x2, +0x2 <.text+0x62a00>
   62b10: 7b 2a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r2
   62b18: 05 00 06 00 00 00 00 00      	ja +0x6 <.text+0x62a30>
   62b20: 18 03 00 00 89 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb89 ; data 'token_programassociated_token_programadmin_quote_atamayhem_statemayhem_token_vaultbonding_curveglobalpump_prog'
   62b30: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   62b38: 85 10 00 00 3a 42 ff ff      	call -0xbdc6 ; target 0x3d10
   62b40: 55 00 fc 04 02 00 00 00      	jne r0, 0x2, +0x4fc <.text+0x65208>
   62b48: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   62b50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62b58: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   62b60: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62b68: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62b70: 85 10 00 00 b5 3a ff ff      	call -0xc54b ; target 0x120
   62b78: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   62b80: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   62b88: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x62aa0>
   62b90: 18 03 00 00 5b dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc5b ; data 'quote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotocol_fee_'
   62ba0: b7 04 00 00 13 00 00 00      	mov64 r4, 0x13
   62ba8: 85 10 00 00 2c 42 ff ff      	call -0xbdd4 ; target 0x3d10
   62bb0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62bb8: 55 00 88 01 02 00 00 00      	jne r0, 0x2, +0x188 <.text+0x636e0>
   62bc0: 7b 2a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r2
   62bc8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   62bd0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x62af0>
   62bd8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62be0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62be8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   62bf0: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   62bf8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   62c00: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   62c08: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x62b58>
   62c10: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   62c18: 85 10 00 00 39 6f 00 00      	call 0x6f39 ; target 0x9a5e8
   62c20: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62c28: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x62b20>
   62c30: 7b 2a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r2
   62c38: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x62b58>
   62c40: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   62c48: 18 03 00 00 e8 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbe8 ; data 'globalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atat'
   62c58: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   62c60: 85 10 00 00 15 42 ff ff      	call -0xbdeb ; target 0x3d10
   62c68: 55 00 d7 04 02 00 00 00      	jne r0, 0x2, +0x4d7 <.text+0x65208>
   62c70: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   62c78: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   62c80: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   62c88: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   62c90: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   62c98: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   62ca0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62ca8: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   62cb0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62cb8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   62cc0: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62cc8: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   62cd0: 85 10 00 00 46 44 ff ff      	call -0xbbba ; target 0x4f08
   62cd8: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]
   62ce0: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   62ce8: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x62c00>
   62cf0: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   62d00: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   62d08: 85 10 00 00 00 42 ff ff      	call -0xbe00 ; target 0x3d10
   62d10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62d18: 55 00 5c 01 02 00 00 00      	jne r0, 0x2, +0x15c <.text+0x636e0>
   62d20: 7b 2a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r2
   62d28: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   62d30: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x62c88>
   62d38: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   62d40: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   62d48: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   62d50: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   62d58: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62d60: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62d68: 15 01 0c 00 00 00 00 00      	jeq r1, 0x0, +0xc <.text+0x62cb0>
   62d70: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   62d78: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   62d80: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   62d88: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   62d90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62d98: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62da0: 05 00 13 00 00 00 00 00      	ja +0x13 <.text+0x62d20>
   62da8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   62db0: 85 10 00 00 06 6f 00 00      	call 0x6f06 ; target 0x9a5e8
   62db8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62dc0: 55 00 54 00 02 00 00 00      	jne r0, 0x2, +0x54 <.text+0x62f48>
   62dc8: 7b 2a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r2
   62dd0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   62dd8: 85 10 00 00 01 6f 00 00      	call 0x6f01 ; target 0x9a5e8
   62de0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62de8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x62ce0>
   62df0: 7b 2a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r2
   62df8: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x62d60>
   62e00: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   62e08: 18 03 00 00 37 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc37 ; data 'fee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountp'
   62e18: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   62e20: 85 10 00 00 dd 41 ff ff      	call -0xbe23 ; target 0x3d10
   62e28: 55 00 9f 04 02 00 00 00      	jne r0, 0x2, +0x49f <.text+0x65208>
   62e30: 7b 1a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r1
   62e38: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   62e40: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x62d60>
   62e48: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62e50: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62e58: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   62e60: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   62e68: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   62e70: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   62e78: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x62dc8>
   62e80: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   62e88: 85 10 00 00 eb 6e 00 00      	call 0x6eeb ; target 0x9a5e8
   62e90: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   62e98: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x62d90>
   62ea0: 7b 2a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r2
   62ea8: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x62dc8>
   62eb0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   62eb8: 18 03 00 00 44 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc44 ; data 'fee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_tok'
   62ec8: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   62ed0: 85 10 00 00 c7 41 ff ff      	call -0xbe39 ; target 0x3d10
   62ed8: 55 00 89 04 02 00 00 00      	jne r0, 0x2, +0x489 <.text+0x65208>
   62ee0: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   62ee8: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   62ef0: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   62ef8: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   62f00: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   62f08: 7b 7a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r7
   62f10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   62f18: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   62f20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   62f28: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   62f30: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   62f38: 79 a4 58 fc 00 00 00 00      	ldxdw r4, [r10 - 0x3a8]
   62f40: 85 10 00 00 2d 44 ff ff      	call -0xbbd3 ; target 0x50b0
   62f48: 79 a8 f0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x310]
   62f50: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   62f58: 15 01 07 00 02 00 00 00      	jeq r1, 0x2, +0x7 <.text+0x62e78>
   62f60: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   62f68: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   62f78: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   62f80: 85 10 00 00 b1 41 ff ff      	call -0xbe4f ; target 0x3d10
   62f88: bf 18 00 00 00 00 00 00      	mov64 r8, r1
   62f90: 55 00 24 00 02 00 00 00      	jne r0, 0x2, +0x24 <.text+0x62f98>
   62f98: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   62fa0: 15 01 0e 00 00 00 00 00      	jeq r1, 0x0, +0xe <.text+0x62ef8>
   62fa8: 79 97 00 00 00 00 00 00      	ldxdw r7, [r9 + 0x0]
   62fb0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   62fb8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   62fc0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   62fc8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   62fd0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   62fd8: 15 01 0b 00 00 00 00 00      	jeq r1, 0x0, +0xb <.text+0x62f18>
   62fe0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   62fe8: 7b 2a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r2
   62ff0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   62ff8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   63000: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   63008: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   63010: 05 00 1f 00 00 00 00 00      	ja +0x1f <.text+0x62ff0>
   63018: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63020: 85 10 00 00 b8 6e 00 00      	call 0x6eb8 ; target 0x9a5e8
   63028: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   63030: 55 00 55 00 02 00 00 00      	jne r0, 0x2, +0x55 <.text+0x631c0>
   63038: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63040: 85 10 00 00 b4 6e 00 00      	call 0x6eb4 ; target 0x9a5e8
   63048: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63050: 55 00 0f 00 02 00 00 00      	jne r0, 0x2, +0xf <.text+0x62fb0>
   63058: 7b 2a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r2
   63060: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x63030>
   63068: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63070: 18 03 00 00 31 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade31 ; data 'associated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsharing_configassociated_us'
   63080: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   63088: 85 10 00 00 90 41 ff ff      	call -0xbe70 ; target 0x3d10
   63090: 55 00 52 04 02 00 00 00      	jne r0, 0x2, +0x452 <.text+0x65208>
   63098: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   630a0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   630a8: 55 01 98 ff 00 00 00 00      	jne r1, 0x0, -0x68 <.text+0x62c50>
   630b0: 05 00 a3 ff 00 00 00 00      	ja -0x5d <.text+0x62cb0>
   630b8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   630c0: 7b 81 10 00 00 00 00 00      	stxdw [r1 + 0x10], r8
   630c8: 05 00 e8 00 00 00 00 00      	ja +0xe8 <.text+0x636f0>
   630d0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   630d8: 18 03 00 00 6c de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade6c ; data 'associated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpected variant tag: payermint_auth'
   630e8: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   630f0: 85 10 00 00 83 41 ff ff      	call -0xbe7d ; target 0x3d10
   630f8: 55 00 45 04 02 00 00 00      	jne r0, 0x2, +0x445 <.text+0x65208>
   63100: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   63108: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63110: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x63030>
   63118: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   63120: 7b 2a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r2
   63128: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   63130: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   63138: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   63140: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   63148: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x630a0>
   63150: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63158: 85 10 00 00 91 6e 00 00      	call 0x6e91 ; target 0x9a5e8
   63160: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63168: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x63060>
   63170: 7b 2a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r2
   63178: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x630e0>
   63180: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63188: 18 03 00 00 84 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade84
   63198: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   631a0: 85 10 00 00 6d 41 ff ff      	call -0xbe93 ; target 0x3d10
   631a8: 55 00 2f 04 02 00 00 00      	jne r0, 0x2, +0x42f <.text+0x65208>
   631b0: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   631b8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   631c0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x630e0>
   631c8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   631d0: 7b 2a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r2
   631d8: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   631e0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   631e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   631f0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   631f8: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x63150>
   63200: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63208: 85 10 00 00 7b 6e 00 00      	call 0x6e7b ; target 0x9a5e8
   63210: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63218: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x63110>
   63220: 7b 2a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r2
   63228: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x63190>
   63230: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63238: 18 03 00 00 fa db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbfa ; data 'pump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_p'
   63248: b7 04 00 00 14 00 00 00      	mov64 r4, 0x14
   63250: 85 10 00 00 57 41 ff ff      	call -0xbea9 ; target 0x3d10
   63258: 55 00 19 04 02 00 00 00      	jne r0, 0x2, +0x419 <.text+0x65208>
   63260: 7b 1a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r1
   63268: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63270: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x63190>
   63278: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   63280: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   63288: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   63290: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   63298: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   632a0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   632a8: 05 00 19 00 00 00 00 00      	ja +0x19 <.text+0x63258>
   632b0: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   632b8: 85 10 00 00 65 6e 00 00      	call 0x6e65 ; target 0x9a5e8
   632c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   632c8: 55 00 0d 00 02 00 00 00      	jne r0, 0x2, +0xd <.text+0x63218>
   632d0: 7b 2a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r2
   632d8: 05 00 1b 00 00 00 00 00      	ja +0x1b <.text+0x63298>
   632e0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   632e8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   632f0: 18 03 00 00 f5 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddf5 ; data 'creator_vaultmayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bond'
   63300: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   63308: 85 10 00 00 40 41 ff ff      	call -0xbec0 ; target 0x3d10
   63310: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   63318: 55 00 5b 00 02 00 00 00      	jne r0, 0x2, +0x5b <.text+0x634d8>
   63320: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63328: 55 01 96 ff 00 00 00 00      	jne r1, 0x0, -0x6a <.text+0x62ec0>
   63330: 05 00 a0 ff 00 00 00 00      	ja -0x60 <.text+0x62f18>
   63338: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63340: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   63350: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   63358: 85 10 00 00 36 41 ff ff      	call -0xbeca ; target 0x3d10
   63360: 55 00 f8 03 02 00 00 00      	jne r0, 0x2, +0x3f8 <.text+0x65208>
   63368: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   63370: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63378: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x63298>
   63380: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   63388: 7b 2a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r2
   63390: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   63398: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   633a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   633a8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   633b0: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x63308>
   633b8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   633c0: 85 10 00 00 44 6e 00 00      	call 0x6e44 ; target 0x9a5e8
   633c8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   633d0: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x632c8>
   633d8: 7b 2a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r2
   633e0: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x63348>
   633e8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   633f0: 18 03 00 00 6b dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd6b ; data 'user_volume_accumulatorfee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpoo'
   63400: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   63408: 85 10 00 00 20 41 ff ff      	call -0xbee0 ; target 0x3d10
   63410: 55 00 e2 03 02 00 00 00      	jne r0, 0x2, +0x3e2 <.text+0x65208>
   63418: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   63420: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63428: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x63348>
   63430: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   63438: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   63440: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   63448: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   63450: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   63458: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   63460: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x633b8>
   63468: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63470: 85 10 00 00 2e 6e 00 00      	call 0x6e2e ; target 0x9a5e8
   63478: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63480: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x63378>
   63488: 7b 2a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r2
   63490: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x633f8>
   63498: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   634a0: 18 03 00 00 92 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade92
   634b0: b7 04 00 00 22 00 00 00      	mov64 r4, 0x22
   634b8: 85 10 00 00 0a 41 ff ff      	call -0xbef6 ; target 0x3d10
   634c0: 55 00 cc 03 02 00 00 00      	jne r0, 0x2, +0x3cc <.text+0x65208>
   634c8: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   634d0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   634d8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x633f8>
   634e0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   634e8: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   634f0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   634f8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   63500: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   63508: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   63510: 05 00 0e 00 00 00 00 00      	ja +0xe <.text+0x63468>
   63518: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63520: 85 10 00 00 18 6e 00 00      	call 0x6e18 ; target 0x9a5e8
   63528: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63530: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x63428>
   63538: 7b 2a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r2
   63540: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x634a8>
   63548: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63550: 18 03 00 00 82 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd82 ; data 'fee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_'
   63560: b7 04 00 00 0a 00 00 00      	mov64 r4, 0xa
   63568: 85 10 00 00 f4 40 ff ff      	call -0xbf0c ; target 0x3d10
   63570: 55 00 b6 03 02 00 00 00      	jne r0, 0x2, +0x3b6 <.text+0x65208>
   63578: 7b 1a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r1
   63580: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63588: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x634a8>
   63590: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   63598: 7b 2a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r2
   635a0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   635a8: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   635b0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   635b8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   635c0: 05 00 11 00 00 00 00 00      	ja +0x11 <.text+0x63530>
   635c8: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   635d0: 85 10 00 00 02 6e 00 00      	call 0x6e02 ; target 0x9a5e8
   635d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   635e0: 55 00 05 00 02 00 00 00      	jne r0, 0x2, +0x5 <.text+0x634f0>
   635e8: 7b 2a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r2
   635f0: 05 00 13 00 00 00 00 00      	ja +0x13 <.text+0x63570>
   635f8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   63600: 7b 71 10 00 00 00 00 00      	stxdw [r1 + 0x10], r7
   63608: 05 00 40 00 00 00 00 00      	ja +0x40 <.text+0x636f0>
   63610: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63618: 18 03 00 00 8c dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd8c ; data 'fee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreat'
   63628: b7 04 00 00 0b 00 00 00      	mov64 r4, 0xb
   63630: 85 10 00 00 db 40 ff ff      	call -0xbf25 ; target 0x3d10
   63638: 55 00 9d 03 02 00 00 00      	jne r0, 0x2, +0x39d <.text+0x65208>
   63640: 7b 1a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r1
   63648: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   63650: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x63570>
   63658: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   63660: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   63668: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   63670: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   63678: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   63680: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   63688: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x635d8>
   63690: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63698: 85 10 00 00 e9 6d 00 00      	call 0x6de9 ; target 0x9a5e8
   636a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   636a8: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x635a0>
   636b0: 7b 2a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r2
   636b8: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x635d8>
   636c0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   636c8: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   636d8: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   636e0: 85 10 00 00 c5 40 ff ff      	call -0xbf3b ; target 0x3d10
   636e8: 55 00 87 03 02 00 00 00      	jne r0, 0x2, +0x387 <.text+0x65208>
   636f0: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   636f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63700: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   63708: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   63710: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   63718: 85 10 00 00 4a 4e ff ff      	call -0xb1b6 ; target 0xa970
   63720: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   63728: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   63730: 15 01 06 00 02 00 00 00      	jeq r1, 0x2, +0x6 <.text+0x63648>
   63738: 18 03 00 00 5c db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb5c ; data 'programsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statem'
   63748: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   63750: 85 10 00 00 b7 40 ff ff      	call -0xbf49 ; target 0x3d10
   63758: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63760: 55 00 13 00 02 00 00 00      	jne r0, 0x2, +0x13 <.text+0x636e0>
   63768: 7b 2a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r2
   63770: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   63778: 7b 7a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r7
   63780: 15 03 13 00 00 00 00 00      	jeq r3, 0x0, +0x13 <.text+0x63700>
   63788: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   63790: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63798: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   637a0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   637a8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   637b0: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   637b8: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   637c0: 15 03 10 00 00 00 00 00      	jeq r3, 0x0, +0x10 <.text+0x63728>
   637c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   637d0: 7b 39 08 00 00 00 00 00      	stxdw [r9 + 0x8], r3
   637d8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   637e0: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   637e8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
   637f0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   637f8: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x63790>
   63800: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   63808: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   63810: 7b 01 08 00 00 00 00 00      	stxdw [r1 + 0x8], r0
   63818: 05 00 81 fd 00 00 00 00      	ja -0x27f <.text+0x62308>
   63820: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63828: 85 10 00 00 b7 6d 00 00      	call 0x6db7 ; target 0x9a5e8
   63830: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63838: 55 00 6c 00 02 00 00 00      	jne r0, 0x2, +0x6c <.text+0x63a80>
   63840: 7b 2a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r2
   63848: b7 01 00 00 bd 0b 00 00      	mov64 r1, 0xbbd
   63850: 85 10 00 00 b2 6d 00 00      	call 0x6db2 ; target 0x9a5e8
   63858: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63860: 55 00 02 00 02 00 00 00      	jne r0, 0x2, +0x2 <.text+0x63758>
   63868: 7b 2a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r2
   63870: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x63790>
   63878: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63880: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   63890: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   63898: 85 10 00 00 8e 40 ff ff      	call -0xbf72 ; target 0x3d10
   638a0: 55 00 50 03 02 00 00 00      	jne r0, 0x2, +0x350 <.text+0x65208>
   638a8: 7b 1a 68 fb 00 00 00 00      	stxdw [r10 - 0x498], r1
   638b0: 18 01 00 00 40 13 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1340
   638c0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   638c8: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   638d0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   638d8: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   638e0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   638e8: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   638f0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   638f8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   63900: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   63908: 7a 0a 28 ff 00 00 00 00      	stdw [r10 - 0xd8], 0x0
   63910: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   63918: 07 07 00 00 08 fd ff ff      	add64 r7, -0x2f8
   63920: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63928: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   63930: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   63938: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   63940: 85 10 00 00 88 8d 00 00      	call 0x8d88 ; target 0xaa588
   63948: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   63950: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63958: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63960: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63968: 7b 2a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r2
   63970: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63978: 7b 2a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r2
   63980: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63988: 7b 2a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r2
   63990: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63998: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   639a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   639a8: 07 02 00 00 38 fd ff ff      	add64 r2, -0x2c8
   639b0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   639b8: 85 10 00 00 36 4e ff ff      	call -0xb1ca ; target 0xab70
   639c0: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x638e8>
   639c8: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   639d0: 85 10 00 00 82 6d 00 00      	call 0x6d82 ; target 0x9a5e8
   639d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   639e0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   639e8: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   639f8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   63a00: 05 00 55 00 00 00 00 00      	ja +0x55 <.text+0x63b90>
   63a08: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   63a10: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63a18: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63a20: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63a28: 7b 2a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r2
   63a30: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63a38: 7b 2a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r2
   63a40: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63a48: 7b 2a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r2
   63a50: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63a58: 7b 1a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r1
   63a60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63a68: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   63a70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63a78: 07 02 00 00 58 fd ff ff      	add64 r2, -0x2a8
   63a80: 85 10 00 00 1d 4e ff ff      	call -0xb1e3 ; target 0xab70
   63a88: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x639b0>
   63a90: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   63a98: 85 10 00 00 69 6d 00 00      	call 0x6d69 ; target 0x9a5e8
   63aa0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63aa8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63ab0: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   63ac0: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   63ac8: 05 00 3c 00 00 00 00 00      	ja +0x3c <.text+0x63b90>
   63ad0: 7b 8a 60 fb 00 00 00 00      	stxdw [r10 - 0x4a0], r8
   63ad8: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   63ae0: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   63ae8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63af0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63af8: 7b 2a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r2
   63b00: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63b08: 7b 2a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r2
   63b10: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63b18: 7b 2a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r2
   63b20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63b28: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   63b30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63b38: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   63b40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63b48: 07 02 00 00 78 fd ff ff      	add64 r2, -0x288
   63b50: 85 10 00 00 03 4e ff ff      	call -0xb1fd ; target 0xab70
   63b58: 15 00 12 00 00 00 00 00      	jeq r0, 0x0, +0x12 <.text+0x63ad0>
   63b60: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   63b68: 85 10 00 00 4f 6d 00 00      	call 0x6d4f ; target 0x9a5e8
   63b70: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63b78: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63b80: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   63b90: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   63b98: 05 00 22 00 00 00 00 00      	ja +0x22 <.text+0x63b90>
   63ba0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63ba8: 18 03 00 00 9e dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd9e ; data 'buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_bas'
   63bb8: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   63bc0: 85 10 00 00 29 40 ff ff      	call -0xbfd7 ; target 0x3d10
   63bc8: 55 00 eb 02 02 00 00 00      	jne r0, 0x2, +0x2eb <.text+0x65208>
   63bd0: 79 93 08 00 00 00 00 00      	ldxdw r3, [r9 + 0x8]
   63bd8: 7b 1a 70 fb 00 00 00 00      	stxdw [r10 - 0x490], r1
   63be0: 55 03 7c ff 00 00 00 00      	jne r3, 0x0, -0x84 <.text+0x636a8>
   63be8: 05 00 8b ff 00 00 00 00      	ja -0x75 <.text+0x63728>
   63bf0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   63bf8: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   63c00: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63c08: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63c10: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   63c18: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63c20: 7b 2a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r2
   63c28: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63c30: 7b 2a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r2
   63c38: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63c40: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   63c48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63c50: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   63c58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63c60: 07 02 00 00 98 fd ff ff      	add64 r2, -0x268
   63c68: 85 10 00 00 e0 4d ff ff      	call -0xb220 ; target 0xab70
   63c70: 15 00 0d 00 00 00 00 00      	jeq r0, 0x0, +0xd <.text+0x63bc0>
   63c78: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   63c80: 85 10 00 00 2c 6d 00 00      	call 0x6d2c ; target 0x9a5e8
   63c88: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63c90: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63c98: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   63ca8: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   63cb0: 85 10 00 00 0b 40 ff ff      	call -0xbff5 ; target 0x3d10
   63cb8: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   63cc0: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   63cc8: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   63cd0: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   63cd8: 05 00 ea fc 00 00 00 00      	ja -0x316 <.text+0x62310>
   63ce0: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   63ce8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63cf0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63cf8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63d00: 7b 2a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r2
   63d08: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63d10: 7b 2a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r2
   63d18: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63d20: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   63d28: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63d30: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   63d38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63d40: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   63d48: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63d50: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   63d58: 85 10 00 00 c2 4d ff ff      	call -0xb23e ; target 0xab70
   63d60: 15 00 07 00 00 00 00 00      	jeq r0, 0x0, +0x7 <.text+0x63c80>
   63d68: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   63d70: 85 10 00 00 0e 6d 00 00      	call 0x6d0e ; target 0x9a5e8
   63d78: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63d80: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63d88: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   63d98: 05 00 8b ff 00 00 00 00      	ja -0x75 <.text+0x638d8>
   63da0: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   63da8: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   63db0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63db8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   63dc0: 7b 2a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r2
   63dc8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   63dd0: 7b 2a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r2
   63dd8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   63de0: 7b 2a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r2
   63de8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63df0: 7b 1a d8 fd 00 00 00 00      	stxdw [r10 - 0x228], r1
   63df8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63e00: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   63e08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63e10: 07 02 00 00 d8 fd ff ff      	add64 r2, -0x228
   63e18: 85 10 00 00 aa 4d ff ff      	call -0xb256 ; target 0xab70
   63e20: 15 00 08 00 00 00 00 00      	jeq r0, 0x0, +0x8 <.text+0x63d48>
   63e28: b7 01 00 00 f8 07 00 00      	mov64 r1, 0x7f8
   63e30: 85 10 00 00 f6 6c 00 00      	call 0x6cf6 ; target 0x9a5e8
   63e38: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   63e40: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   63e48: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   63e58: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   63e60: 05 00 97 02 00 00 00 00      	ja +0x297 <.text+0x65200>
   63e68: 71 61 29 00 00 00 00 00      	ldxb r1, [r6 + 0x29]
   63e70: 15 01 8e 02 00 00 00 00      	jeq r1, 0x0, +0x28e <.text+0x651c8>
   63e78: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   63e80: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   63e88: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   63e90: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   63e98: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   63ea0: 18 01 00 00 50 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1950
   63eb0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   63eb8: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   63ec0: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   63ec8: 55 00 01 03 00 00 00 00      	jne r0, 0x0, +0x301 <.text+0x655b8>
   63ed0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   63ed8: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   63ee0: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   63ee8: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   63ef0: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   63ef8: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   63f00: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   63f08: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   63f10: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   63f18: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   63f20: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   63f28: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   63f30: 5d 73 83 02 00 00 00 00      	jne r3, r7, +0x283 <.text+0x65230>
   63f38: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   63f40: 5d 93 81 02 00 00 00 00      	jne r3, r9, +0x281 <.text+0x65230>
   63f48: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   63f50: 5d 83 7f 02 00 00 00 00      	jne r3, r8, +0x27f <.text+0x65230>
   63f58: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   63f60: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   63f68: 5d 32 7c 02 00 00 00 00      	jne r2, r3, +0x27c <.text+0x65230>
   63f70: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   63f78: 15 01 98 02 00 00 00 00      	jeq r1, 0x0, +0x298 <.text+0x65320>
   63f80: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   63f88: 79 21 40 00 00 00 00 00      	ldxdw r1, [r2 + 0x40]
   63f90: 7b 1a 48 fb 00 00 00 00      	stxdw [r10 - 0x4b8], r1
   63f98: 79 21 38 00 00 00 00 00      	ldxdw r1, [r2 + 0x38]
   63fa0: 7b 1a 50 fb 00 00 00 00      	stxdw [r10 - 0x4b0], r1
   63fa8: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   63fb0: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   63fb8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   63fc0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   63fc8: 7b 3a 40 fb 00 00 00 00      	stxdw [r10 - 0x4c0], r3
   63fd0: 79 17 10 00 00 00 00 00      	ldxdw r7, [r1 + 0x10]
   63fd8: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   63fe0: 79 22 28 00 00 00 00 00      	ldxdw r2, [r2 + 0x28]
   63fe8: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   63ff0: 7b 2a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r2
   63ff8: 5d 92 90 02 00 00 00 00      	jne r2, r9, +0x290 <.text+0x65360>
   64000: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   64008: 5d 81 8e 02 00 00 00 00      	jne r1, r8, +0x28e <.text+0x65360>
   64010: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   64018: 5d 71 8c 02 00 00 00 00      	jne r1, r7, +0x28c <.text+0x65360>
   64020: 79 a1 48 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b8]
   64028: 79 a2 40 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4c0]
   64030: 5d 21 89 02 00 00 00 00      	jne r1, r2, +0x289 <.text+0x65360>
   64038: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   64040: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   64048: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64050: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64058: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64060: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   64068: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64070: 18 05 00 00 0e dc 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xadc0e ; data 'mayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_pro'
   64080: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   64088: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64090: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   64098: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   640a0: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   640a8: 7b 4a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r4
   640b0: 7b 3a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r3
   640b8: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   640c0: 7a 0a e0 fe 0c 00 00 00      	stdw [r10 - 0x120], 0xc
   640c8: 7a 0a f0 fe 20 00 00 00      	stdw [r10 - 0x110], 0x20
   640d0: 72 0a 78 fe ff 00 00 00      	stb [r10 - 0x188], 0xff
   640d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   640e0: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   640e8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   640f0: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   640f8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64100: 07 05 00 00 78 fe ff ff      	add64 r5, -0x188
   64108: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   64110: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   64118: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   64120: 55 00 b6 02 00 00 00 00      	jne r0, 0x0, +0x2b6 <.text+0x655b8>
   64128: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64130: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   64138: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   64140: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   64148: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   64150: 71 a1 78 fe 00 00 00 00      	ldxb r1, [r10 - 0x188]
   64158: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   64160: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   64168: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   64170: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64178: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64180: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   64188: 5d 73 75 02 00 00 00 00      	jne r3, r7, +0x275 <.text+0x65418>
   64190: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   64198: 5d 93 73 02 00 00 00 00      	jne r3, r9, +0x273 <.text+0x65418>
   641a0: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   641a8: 5d 83 71 02 00 00 00 00      	jne r3, r8, +0x271 <.text+0x65418>
   641b0: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   641b8: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   641c0: 5d 32 6e 02 00 00 00 00      	jne r2, r3, +0x26e <.text+0x65418>
   641c8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   641d0: 15 01 77 02 00 00 00 00      	jeq r1, 0x0, +0x277 <.text+0x65470>
   641d8: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   641e0: 79 17 20 00 00 00 00 00      	ldxdw r7, [r1 + 0x20]
   641e8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   641f0: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   641f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64200: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   64208: 85 10 00 00 70 4a ff ff      	call -0xb590 ; target 0x9590
   64210: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64218: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   64220: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   64228: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   64230: 5d 34 73 02 00 00 00 00      	jne r4, r3, +0x273 <.text+0x654b0>
   64238: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64240: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   64248: 5d 34 70 02 00 00 00 00      	jne r4, r3, +0x270 <.text+0x654b0>
   64250: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   64258: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   64260: 5d 34 6d 02 00 00 00 00      	jne r4, r3, +0x26d <.text+0x654b0>
   64268: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64270: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   64278: 5d 12 6a 02 00 00 00 00      	jne r2, r1, +0x26a <.text+0x654b0>
   64280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64288: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   64290: 85 10 00 00 89 47 ff ff      	call -0xb877 ; target 0x7ee0
   64298: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   642a0: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   642a8: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   642b0: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   642b8: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   642c0: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   642c8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   642d0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   642d8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   642e0: 7b 2a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r2
   642e8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   642f0: 7b 2a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r2
   642f8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   64300: 7b 2a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r2
   64308: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64310: 7b 1a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r1
   64318: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   64320: 5d 17 60 02 00 00 00 00      	jne r7, r1, +0x260 <.text+0x65508>
   64328: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   64330: 5d 18 5e 02 00 00 00 00      	jne r8, r1, +0x25e <.text+0x65508>
   64338: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   64340: 5d 19 5c 02 00 00 00 00      	jne r9, r1, +0x25c <.text+0x65508>
   64348: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   64350: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   64358: 5d 12 59 02 00 00 00 00      	jne r2, r1, +0x259 <.text+0x65508>
   64360: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   64368: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   64370: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   64378: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   64380: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   64388: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   64390: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   64398: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   643a0: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   643a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   643b0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   643b8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   643c0: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   643c8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   643d0: 85 10 00 00 37 4a ff ff      	call -0xb5c9 ; target 0x9590
   643d8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   643e0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   643e8: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   643f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   643f8: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   64400: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64408: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   64410: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64418: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   64420: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64428: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   64430: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64438: 07 02 00 00 f8 fd ff ff      	add64 r2, -0x208
   64440: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   64448: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   64450: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64458: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   64460: 85 10 00 00 03 63 00 00      	call 0x6303 ; target 0x95c80
   64468: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64470: 85 10 00 00 4d 47 ff ff      	call -0xb8b3 ; target 0x7ee0
   64478: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   64480: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   64488: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64490: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   64498: 7b 3a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r3
   644a0: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   644a8: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   644b0: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   644b8: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]
   644c0: 5d 27 4e 02 00 00 00 00      	jne r7, r2, +0x24e <.text+0x65618>
   644c8: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   644d0: 5d 28 4c 02 00 00 00 00      	jne r8, r2, +0x24c <.text+0x65618>
   644d8: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   644e0: 5d 29 4a 02 00 00 00 00      	jne r9, r2, +0x24a <.text+0x65618>
   644e8: 79 a2 30 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d0]
   644f0: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   644f8: 5d 23 47 02 00 00 00 00      	jne r3, r2, +0x247 <.text+0x65618>
   64500: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64508: 15 01 5c 02 00 00 00 00      	jeq r1, 0x0, +0x25c <.text+0x656d0>
   64510: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   64518: 79 17 20 00 00 00 00 00      	ldxdw r7, [r1 + 0x20]
   64520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64528: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   64530: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   64538: 85 10 00 00 0a 4a ff ff      	call -0xb5f6 ; target 0x9590
   64540: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64548: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   64550: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   64558: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   64560: 5d 34 0d 02 00 00 00 00      	jne r4, r3, +0x20d <.text+0x654b0>
   64568: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64570: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   64578: 5d 34 0a 02 00 00 00 00      	jne r4, r3, +0x20a <.text+0x654b0>
   64580: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   64588: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   64590: 5d 34 07 02 00 00 00 00      	jne r4, r3, +0x207 <.text+0x654b0>
   64598: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   645a0: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   645a8: 5d 12 04 02 00 00 00 00      	jne r2, r1, +0x204 <.text+0x654b0>
   645b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   645b8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   645c0: 85 10 00 00 23 47 ff ff      	call -0xb8dd ; target 0x7ee0
   645c8: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   645d0: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   645d8: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   645e0: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   645e8: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   645f0: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   645f8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   64600: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64608: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   64610: 7b 2a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r2
   64618: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64620: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   64628: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   64630: 7b 2a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r2
   64638: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64640: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   64648: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   64650: 5d 17 3b 02 00 00 00 00      	jne r7, r1, +0x23b <.text+0x65710>
   64658: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   64660: 5d 18 39 02 00 00 00 00      	jne r8, r1, +0x239 <.text+0x65710>
   64668: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   64670: 5d 19 37 02 00 00 00 00      	jne r9, r1, +0x237 <.text+0x65710>
   64678: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   64680: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   64688: 5d 12 34 02 00 00 00 00      	jne r2, r1, +0x234 <.text+0x65710>
   64690: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   64698: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   646a0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   646a8: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   646b0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   646b8: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   646c0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   646c8: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   646d0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   646d8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   646e0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   646e8: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   646f0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   646f8: 85 10 00 00 d2 49 ff ff      	call -0xb62e ; target 0x9590
   64700: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64708: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64710: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   64718: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   64720: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   64728: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64730: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   64738: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64740: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   64748: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64750: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   64758: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64760: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   64768: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   64770: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   64778: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64780: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   64788: 85 10 00 00 9e 62 00 00      	call 0x629e ; target 0x95c80
   64790: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64798: 85 10 00 00 e8 46 ff ff      	call -0xb918 ; target 0x7ee0
   647a0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   647a8: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   647b0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   647b8: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   647c0: 7b 3a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r3
   647c8: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   647d0: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   647d8: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   647e0: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   647e8: 5d 27 1e 02 00 00 00 00      	jne r7, r2, +0x21e <.text+0x657c0>
   647f0: 79 a2 60 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a0]
   647f8: 5d 28 1c 02 00 00 00 00      	jne r8, r2, +0x21c <.text+0x657c0>
   64800: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   64808: 5d 29 1a 02 00 00 00 00      	jne r9, r2, +0x21a <.text+0x657c0>
   64810: 79 a2 70 fe 00 00 00 00      	ldxdw r2, [r10 - 0x190]
   64818: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   64820: 5d 23 17 02 00 00 00 00      	jne r3, r2, +0x217 <.text+0x657c0>
   64828: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64830: 15 01 2b 02 00 00 00 00      	jeq r1, 0x0, +0x22b <.text+0x65870>
   64838: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   64840: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64848: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   64850: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64858: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   64860: 18 01 00 00 88 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1988
   64870: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   64878: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   64880: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   64888: 55 00 c9 01 00 00 00 00      	jne r0, 0x0, +0x1c9 <.text+0x655b8>
   64890: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64898: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   648a0: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   648a8: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   648b0: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   648b8: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   648c0: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   648c8: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   648d0: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   648d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   648e0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   648e8: 5d 72 1c 02 00 00 00 00      	jne r2, r7, +0x21c <.text+0x658b0>
   648f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   648f8: 5d 82 1a 02 00 00 00 00      	jne r2, r8, +0x21a <.text+0x658b0>
   64900: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64908: 5d 92 18 02 00 00 00 00      	jne r2, r9, +0x218 <.text+0x658b0>
   64910: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64918: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   64920: 5d 21 15 02 00 00 00 00      	jne r1, r2, +0x215 <.text+0x658b0>
   64928: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   64930: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64938: 15 01 2b 02 00 00 00 00      	jeq r1, 0x0, +0x22b <.text+0x65978>
   64940: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   64948: 79 11 58 00 00 00 00 00      	ldxdw r1, [r1 + 0x58]
   64950: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64958: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64960: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64968: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   64970: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64978: 18 05 00 00 1a dc 0a 00 00 00 00 00 00 00 00 00      	lddw r5, 0xadc1a ; data 'bonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_c'
   64988: 7b 5a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r5
   64990: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64998: 07 05 00 00 d8 fe ff ff      	add64 r5, -0x128
   649a0: 7b 5a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r5
   649a8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   649b0: 7b 4a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r4
   649b8: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   649c0: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   649c8: 7a 0a 80 fe 0d 00 00 00      	stdw [r10 - 0x180], 0xd
   649d0: 7a 0a 90 fe 20 00 00 00      	stdw [r10 - 0x170], 0x20
   649d8: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   649e8: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   649f0: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   64a00: 7b 1a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r1
   64a08: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   64a18: 7b 1a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r1
   64a20: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   64a30: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   64a38: 72 0a ff fe ff 00 00 00      	stb [r10 - 0x101], 0xff
   64a40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64a48: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   64a50: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   64a58: 07 03 00 00 08 fd ff ff      	add64 r3, -0x2f8
   64a60: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64a68: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   64a70: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64a78: 07 05 00 00 ff fe ff ff      	add64 r5, -0x101
   64a80: b7 02 00 00 02 00 00 00      	mov64 r2, 0x2
   64a88: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   64a90: 55 00 88 01 00 00 00 00      	jne r0, 0x0, +0x188 <.text+0x655b8>
   64a98: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64aa0: 7b 1a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r1
   64aa8: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   64ab0: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   64ab8: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   64ac0: 71 a1 ff fe 00 00 00 00      	ldxb r1, [r10 - 0x101]
   64ac8: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   64ad0: 73 12 03 00 00 00 00 00      	stxb [r2 + 0x3], r1
   64ad8: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   64ae0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64ae8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64af0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   64af8: 5d 73 fb 01 00 00 00 00      	jne r3, r7, +0x1fb <.text+0x659b8>
   64b00: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   64b08: 5d 93 f9 01 00 00 00 00      	jne r3, r9, +0x1f9 <.text+0x659b8>
   64b10: 79 23 10 00 00 00 00 00      	ldxdw r3, [r2 + 0x10]
   64b18: 5d 83 f7 01 00 00 00 00      	jne r3, r8, +0x1f7 <.text+0x659b8>
   64b20: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   64b28: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   64b30: 5d 32 f4 01 00 00 00 00      	jne r2, r3, +0x1f4 <.text+0x659b8>
   64b38: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64b40: 15 01 fd 01 00 00 00 00      	jeq r1, 0x0, +0x1fd <.text+0x65a10>
   64b48: 79 a1 d0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x430]
   64b50: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64b58: 15 01 01 02 00 00 00 00      	jeq r1, 0x0, +0x201 <.text+0x65a48>
   64b60: 79 a1 c8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x438]
   64b68: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64b70: 15 01 06 02 00 00 00 00      	jeq r1, 0x0, +0x206 <.text+0x65a88>
   64b78: 79 a1 c0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x440]
   64b80: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64b88: 15 01 0a 02 00 00 00 00      	jeq r1, 0x0, +0x20a <.text+0x65ac0>
   64b90: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   64b98: 79 17 20 00 00 00 00 00      	ldxdw r7, [r1 + 0x20]
   64ba0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   64ba8: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   64bb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64bb8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   64bc0: 85 10 00 00 39 49 ff ff      	call -0xb6c7 ; target 0x9590
   64bc8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64bd0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   64bd8: 79 72 18 00 00 00 00 00      	ldxdw r2, [r7 + 0x18]
   64be0: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
   64be8: 5d 34 3c 01 00 00 00 00      	jne r4, r3, +0x13c <.text+0x654b0>
   64bf0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64bf8: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
   64c00: 5d 34 39 01 00 00 00 00      	jne r4, r3, +0x139 <.text+0x654b0>
   64c08: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   64c10: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   64c18: 5d 34 36 01 00 00 00 00      	jne r4, r3, +0x136 <.text+0x654b0>
   64c20: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64c28: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
   64c30: 5d 12 33 01 00 00 00 00      	jne r2, r1, +0x133 <.text+0x654b0>
   64c38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64c40: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   64c48: 85 10 00 00 52 46 ff ff      	call -0xb9ae ; target 0x7ee0
   64c50: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   64c58: 79 12 60 00 00 00 00 00      	ldxdw r2, [r1 + 0x60]
   64c60: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   64c68: 79 19 58 00 00 00 00 00      	ldxdw r9, [r1 + 0x58]
   64c70: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   64c78: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   64c80: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   64c88: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64c90: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64c98: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   64ca0: 7b 2a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r2
   64ca8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64cb0: 7b 2a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r2
   64cb8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   64cc0: 7b 2a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r2
   64cc8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64cd0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   64cd8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   64ce0: 5d 17 e7 01 00 00 00 00      	jne r7, r1, +0x1e7 <.text+0x65b00>
   64ce8: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   64cf0: 5d 18 e5 01 00 00 00 00      	jne r8, r1, +0x1e5 <.text+0x65b00>
   64cf8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   64d00: 5d 19 e3 01 00 00 00 00      	jne r9, r1, +0x1e3 <.text+0x65b00>
   64d08: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   64d10: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   64d18: 5d 12 e0 01 00 00 00 00      	jne r2, r1, +0x1e0 <.text+0x65b00>
   64d20: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   64d28: 79 12 58 00 00 00 00 00      	ldxdw r2, [r1 + 0x58]
   64d30: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   64d38: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   64d40: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   64d48: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   64d50: 7b 3a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r3
   64d58: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   64d60: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   64d68: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64d70: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   64d78: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   64d80: 07 07 00 00 00 ff ff ff      	add64 r7, -0x100
   64d88: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64d90: 85 10 00 00 ff 48 ff ff      	call -0xb701 ; target 0x9590
   64d98: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   64da0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64da8: 7b 2a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r2
   64db0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   64db8: 7b 2a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r2
   64dc0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   64dc8: 7b 2a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r2
   64dd0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   64dd8: 7b 1a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r1
   64de0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64de8: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   64df0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64df8: 07 02 00 00 98 fe ff ff      	add64 r2, -0x168
   64e00: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   64e08: 07 03 00 00 d8 fe ff ff      	add64 r3, -0x128
   64e10: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64e18: 07 04 00 00 08 fd ff ff      	add64 r4, -0x2f8
   64e20: 85 10 00 00 cb 61 00 00      	call 0x61cb ; target 0x95c80
   64e28: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64e30: 85 10 00 00 15 46 ff ff      	call -0xb9eb ; target 0x7ee0
   64e38: 79 a1 60 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a0]
   64e40: 79 11 20 00 00 00 00 00      	ldxdw r1, [r1 + 0x20]
   64e48: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64e50: 79 23 18 00 00 00 00 00      	ldxdw r3, [r2 + 0x18]
   64e58: 7b 3a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r3
   64e60: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   64e68: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   64e70: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
   64e78: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   64e80: 5d 27 c9 01 00 00 00 00      	jne r7, r2, +0x1c9 <.text+0x65bb0>
   64e88: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   64e90: 5d 28 c7 01 00 00 00 00      	jne r8, r2, +0x1c7 <.text+0x65bb0>
   64e98: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   64ea0: 5d 29 c5 01 00 00 00 00      	jne r9, r2, +0x1c5 <.text+0x65bb0>
   64ea8: 79 a2 d0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x130]
   64eb0: 79 a3 58 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4a8]
   64eb8: 5d 23 c2 01 00 00 00 00      	jne r3, r2, +0x1c2 <.text+0x65bb0>
   64ec0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64ec8: 15 01 d6 01 00 00 00 00      	jeq r1, 0x0, +0x1d6 <.text+0x65c60>
   64ed0: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   64ed8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64ee0: 15 01 d5 01 00 00 00 00      	jeq r1, 0x0, +0x1d5 <.text+0x65c70>
   64ee8: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   64ef0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64ef8: 15 01 d9 01 00 00 00 00      	jeq r1, 0x0, +0x1d9 <.text+0x65ca8>
   64f00: 79 a1 b0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x450]
   64f08: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   64f10: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   64f18: 7b 2a 58 fb 00 00 00 00      	stxdw [r10 - 0x4a8], r2
   64f20: 79 19 10 00 00 00 00 00      	ldxdw r9, [r1 + 0x10]
   64f28: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   64f30: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   64f38: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   64f48: 5d 17 d6 01 00 00 00 00      	jne r7, r1, +0x1d6 <.text+0x65ce0>
   64f50: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   64f60: 5d 18 d3 01 00 00 00 00      	jne r8, r1, +0x1d3 <.text+0x65ce0>
   64f68: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   64f78: 5d 19 d0 01 00 00 00 00      	jne r9, r1, +0x1d0 <.text+0x65ce0>
   64f80: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   64f90: 79 a2 58 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a8]
   64f98: 5d 12 cc 01 00 00 00 00      	jne r2, r1, +0x1cc <.text+0x65ce0>
   64fa0: 79 a1 a8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x458]
   64fa8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64fb0: 15 01 e3 01 00 00 00 00      	jeq r1, 0x0, +0x1e3 <.text+0x65db0>
   64fb8: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   64fc0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   64fc8: 15 01 e7 01 00 00 00 00      	jeq r1, 0x0, +0x1e7 <.text+0x65de8>
   64fd0: 72 0a 08 fd ff 00 00 00      	stb [r10 - 0x2f8], 0xff
   64fd8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   64fe0: 07 04 00 00 00 ff ff ff      	add64 r4, -0x100
   64fe8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   64ff0: 07 05 00 00 08 fd ff ff      	add64 r5, -0x2f8
   64ff8: 18 01 00 00 78 19 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1978
   65008: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   65010: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   65018: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_try_find_program_address
   65020: 55 00 d6 00 00 00 00 00      	jne r0, 0x0, +0xd6 <.text+0x655b8>
   65028: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   65030: 7b 1a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r1
   65038: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   65040: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   65048: 79 a7 00 ff 00 00 00 00      	ldxdw r7, [r10 - 0x100]
   65050: 71 a1 08 fd 00 00 00 00      	ldxb r1, [r10 - 0x2f8]
   65058: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   65060: 73 12 04 00 00 00 00 00      	stxb [r2 + 0x4], r1
   65068: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   65070: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   65078: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   65080: 5d 72 d8 01 00 00 00 00      	jne r2, r7, +0x1d8 <.text+0x65e28>
   65088: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   65090: 5d 82 d6 01 00 00 00 00      	jne r2, r8, +0x1d6 <.text+0x65e28>
   65098: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   650a0: 5d 92 d4 01 00 00 00 00      	jne r2, r9, +0x1d4 <.text+0x65e28>
   650a8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   650b0: 79 a2 50 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b0]
   650b8: 5d 21 d1 01 00 00 00 00      	jne r1, r2, +0x1d1 <.text+0x65e28>
   650c0: 79 a1 70 fb 00 00 00 00      	ldxdw r1, [r10 - 0x490]
   650c8: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   650d0: 15 01 e3 01 00 00 00 00      	jeq r1, 0x0, +0x1e3 <.text+0x65ed0>
   650d8: 79 a1 68 fb 00 00 00 00      	ldxdw r1, [r10 - 0x498]
   650e0: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   650e8: 15 01 e7 01 00 00 00 00      	jeq r1, 0x0, +0x1e7 <.text+0x65f08>
   650f0: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   650f8: 79 a2 68 fb 00 00 00 00      	ldxdw r2, [r10 - 0x498]
   65100: 7b 21 f0 00 00 00 00 00      	stxdw [r1 + 0xf0], r2
   65108: 79 a2 70 fb 00 00 00 00      	ldxdw r2, [r10 - 0x490]
   65110: 7b 21 e8 00 00 00 00 00      	stxdw [r1 + 0xe8], r2
   65118: 79 a2 78 fb 00 00 00 00      	ldxdw r2, [r10 - 0x488]
   65120: 7b 21 e0 00 00 00 00 00      	stxdw [r1 + 0xe0], r2
   65128: 79 a2 88 fb 00 00 00 00      	ldxdw r2, [r10 - 0x478]
   65130: 7b 21 d8 00 00 00 00 00      	stxdw [r1 + 0xd8], r2
   65138: 79 a2 90 fb 00 00 00 00      	ldxdw r2, [r10 - 0x470]
   65140: 7b 21 d0 00 00 00 00 00      	stxdw [r1 + 0xd0], r2
   65148: 79 a2 98 fb 00 00 00 00      	ldxdw r2, [r10 - 0x468]
   65150: 7b 21 c8 00 00 00 00 00      	stxdw [r1 + 0xc8], r2
   65158: 79 a2 a0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x460]
   65160: 7b 21 c0 00 00 00 00 00      	stxdw [r1 + 0xc0], r2
   65168: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   65170: 7b 21 b8 00 00 00 00 00      	stxdw [r1 + 0xb8], r2
   65178: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   65180: 7b 21 b0 00 00 00 00 00      	stxdw [r1 + 0xb0], r2
   65188: 79 a2 b8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x448]
   65190: 7b 21 a8 00 00 00 00 00      	stxdw [r1 + 0xa8], r2
   65198: 79 a2 48 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b8]
   651a0: 7b 21 a0 00 00 00 00 00      	stxdw [r1 + 0xa0], r2
   651a8: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   651b0: 7b 21 98 00 00 00 00 00      	stxdw [r1 + 0x98], r2
   651b8: 79 a2 80 fb 00 00 00 00      	ldxdw r2, [r10 - 0x480]
   651c0: 7b 21 90 00 00 00 00 00      	stxdw [r1 + 0x90], r2
   651c8: 79 a2 60 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4a0]
   651d0: 7b 21 88 00 00 00 00 00      	stxdw [r1 + 0x88], r2
   651d8: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   651e0: 7b 21 80 00 00 00 00 00      	stxdw [r1 + 0x80], r2
   651e8: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   651f0: 7b 21 78 00 00 00 00 00      	stxdw [r1 + 0x78], r2
   651f8: 79 a2 d0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x430]
   65200: 7b 21 70 00 00 00 00 00      	stxdw [r1 + 0x70], r2
   65208: 79 a2 d8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x428]
   65210: 7b 21 68 00 00 00 00 00      	stxdw [r1 + 0x68], r2
   65218: 79 a2 e0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x420]
   65220: 7b 21 60 00 00 00 00 00      	stxdw [r1 + 0x60], r2
   65228: 79 a2 e8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x418]
   65230: 7b 21 58 00 00 00 00 00      	stxdw [r1 + 0x58], r2
   65238: 79 a2 f0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x410]
   65240: 7b 21 50 00 00 00 00 00      	stxdw [r1 + 0x50], r2
   65248: 79 a2 f8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x408]
   65250: 7b 21 48 00 00 00 00 00      	stxdw [r1 + 0x48], r2
   65258: 79 a2 00 fc 00 00 00 00      	ldxdw r2, [r10 - 0x400]
   65260: 7b 21 40 00 00 00 00 00      	stxdw [r1 + 0x40], r2
   65268: 79 a2 08 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f8]
   65270: 7b 21 38 00 00 00 00 00      	stxdw [r1 + 0x38], r2
   65278: 79 a2 10 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f0]
   65280: 7b 21 30 00 00 00 00 00      	stxdw [r1 + 0x30], r2
   65288: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   65290: 7b 21 28 00 00 00 00 00      	stxdw [r1 + 0x28], r2
   65298: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   652a0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   652a8: 79 a2 28 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d8]
   652b0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   652b8: 79 a2 30 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3d0]
   652c0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   652c8: 79 a2 38 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c8]
   652d0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   652d8: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
   652e0: 05 00 29 fa 00 00 00 00      	ja -0x5d7 <.text+0x62310>
   652e8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   652f0: 85 10 00 00 5e 6a 00 00      	call 0x6a5e ; target 0x9a5e8
   652f8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65300: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65308: 18 03 00 00 55 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc55 ; data 'traderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_token_accountprotoco'
   65318: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   65320: 85 10 00 00 3d 3d ff ff      	call -0xc2c3 ; target 0x3d10
   65328: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   65330: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   65338: 7b 02 08 00 00 00 00 00      	stxdw [r2 + 0x8], r0
   65340: 7a 02 00 00 00 00 00 00      	stdw [r2 + 0x0], 0x0
   65348: 05 00 1c fa 00 00 00 00      	ja -0x5e4 <.text+0x62310>
   65350: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   65358: 85 10 00 00 51 6a 00 00      	call 0x6a51 ; target 0x9a5e8
   65360: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65368: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65370: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   65380: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   65388: 85 10 00 00 30 3d ff ff      	call -0xc2d0 ; target 0x3d10
   65390: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65398: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   653a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   653a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   653b0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   653b8: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   653c0: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   653c8: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   653d0: 7b 7a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r7
   653d8: 7b 9a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r9
   653e0: 7b 8a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r8
   653e8: 79 a6 58 fb 00 00 00 00      	ldxdw r6, [r10 - 0x4a8]
   653f0: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   653f8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65400: 7b 5a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r5
   65408: 7b 4a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r4
   65410: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   65418: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   65420: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
   65428: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65430: 85 10 00 00 b8 64 00 00      	call 0x64b8 ; target 0x979f8
   65438: 05 00 dd ff 00 00 00 00      	ja -0x23 <.text+0x65208>
   65440: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65448: 85 10 00 00 33 6a 00 00      	call 0x6a33 ; target 0x9a5e8
   65450: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65458: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65460: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   65470: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   65478: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x65200>
   65480: b7 01 00 00 d1 07 00 00      	mov64 r1, 0x7d1
   65488: 85 10 00 00 2b 6a 00 00      	call 0x6a2b ; target 0x9a5e8
   65490: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65498: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   654a0: 18 03 00 00 0f db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb0f ; data 'global_paramsprograms/mayhem-program/src/instructions/admin.rsevent_authorityprogramsol_vaultquote_mintsol_vau'
   654b0: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   654b8: 85 10 00 00 0a 3d ff ff      	call -0xc2f6 ; target 0x3d10
   654c0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   654c8: 79 a1 40 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c0]
   654d0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   654d8: 7b 7a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r7
   654e0: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   654e8: 7b 9a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r9
   654f0: 79 a1 48 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b8]
   654f8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65500: 79 a1 50 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4b0]
   65508: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   65510: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65518: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   65520: 79 a1 38 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4c8]
   65528: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   65530: 05 00 dc ff 00 00 00 00      	ja -0x24 <.text+0x652f8>
   65538: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   65540: 85 10 00 00 14 6a 00 00      	call 0x6a14 ; target 0x9a5e8
   65548: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65550: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65558: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   65568: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   65570: 85 10 00 00 f3 3c ff ff      	call -0xc30d ; target 0x3d10
   65578: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65580: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   65588: 05 00 c2 ff 00 00 00 00      	ja -0x3e <.text+0x65280>
   65590: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65598: 85 10 00 00 09 6a 00 00      	call 0x6a09 ; target 0x9a5e8
   655a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   655a8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   655b0: 18 03 00 00 bd db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbbd ; data 'mayhem_statemayhem_token_vaultbonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveacco'
   655c0: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   655c8: 05 00 aa ff 00 00 00 00      	ja -0x56 <.text+0x65200>
   655d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   655d8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   655e0: 85 10 00 00 1f 45 ff ff      	call -0xbae1 ; target 0x7ee0
   655e8: b7 01 00 00 e7 07 00 00      	mov64 r1, 0x7e7
   655f0: 85 10 00 00 fe 69 00 00      	call 0x69fe ; target 0x9a5e8
   655f8: 05 00 a5 ff 00 00 00 00      	ja -0x5b <.text+0x65208>
   65600: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   65608: b7 02 00 00 0a 00 00 00      	mov64 r2, 0xa
   65610: 18 03 00 00 60 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1360
   65620: 85 10 00 00 44 7c 00 00      	call 0x7c44 ; target 0xa3848
   65628: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   65630: 85 10 00 00 f6 69 00 00      	call 0x69f6 ; target 0x9a5e8
   65638: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65640: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65648: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   65658: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   65660: 85 10 00 00 d5 3c ff ff      	call -0xc32b ; target 0x3d10
   65668: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65670: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65678: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65680: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65688: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65690: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   65698: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   656a0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   656a8: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   656b0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   656b8: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   656c0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   656c8: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   656d0: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0x656c0>
   656d8: 18 01 00 00 f8 11 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb11f8
   656e8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   656f0: 7a 0a 20 ff 00 00 00 00      	stdw [r10 - 0xe0], 0x0
   656f8: 7a 0a 08 ff 01 00 00 00      	stdw [r10 - 0xf8], 0x1
   65700: 7a 0a 18 ff 00 00 00 00      	stdw [r10 - 0xe8], 0x0
   65708: 7a 0a 10 ff 08 00 00 00      	stdw [r10 - 0xf0], 0x8
   65710: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   65718: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   65720: 18 02 00 00 08 12 0b 00 00 00 00 00 00 00 00 00      	lddw r2, 0xb1208
   65730: 85 10 00 00 2a 7e 00 00      	call 0x7e2a ; target 0xa4888
   65738: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   65740: 85 10 00 00 d4 69 00 00      	call 0x69d4 ; target 0x9a5e8
   65748: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65750: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65758: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   65768: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   65770: 85 10 00 00 b3 3c ff ff      	call -0xc34d ; target 0x3d10
   65778: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65780: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65788: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65790: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65798: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   657a0: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   657a8: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   657b0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   657b8: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   657c0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   657c8: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   657d0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   657d8: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   657e0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   657e8: 05 00 85 ff 00 00 00 00      	ja -0x7b <.text+0x652f8>
   657f0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   657f8: 85 10 00 00 bd 69 00 00      	call 0x69bd ; target 0x9a5e8
   65800: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65808: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65810: 18 03 00 00 02 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade02 ; data 'mayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveasso'
   65820: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   65828: 05 00 5e ff 00 00 00 00      	ja -0xa2 <.text+0x65200>
   65830: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   65838: 85 10 00 00 b5 69 00 00      	call 0x69b5 ; target 0x9a5e8
   65840: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65848: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65850: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   65860: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   65868: 85 10 00 00 94 3c ff ff      	call -0xc36c ; target 0x3d10
   65870: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65878: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65880: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65888: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65890: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65898: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   658a0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   658a8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   658b0: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   658b8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   658c0: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   658c8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   658d0: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   658d8: 05 00 e0 ff 00 00 00 00      	ja -0x20 <.text+0x656c0>
   658e0: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   658e8: 85 10 00 00 9f 69 00 00      	call 0x699f ; target 0x9a5e8
   658f0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   658f8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65900: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   65910: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   65918: 85 10 00 00 7e 3c ff ff      	call -0xc382 ; target 0x3d10
   65920: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65928: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65930: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65938: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65940: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65948: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   65950: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   65958: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   65960: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   65968: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   65970: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   65978: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   65980: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   65988: 05 00 ca ff 00 00 00 00      	ja -0x36 <.text+0x656c0>
   65990: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65998: 85 10 00 00 89 69 00 00      	call 0x6989 ; target 0x9a5e8
   659a0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   659a8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   659b0: 18 03 00 00 19 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade19 ; data 'mayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsha'
   659c0: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   659c8: 05 00 2a ff 00 00 00 00      	ja -0xd6 <.text+0x65200>
   659d0: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   659d8: 85 10 00 00 81 69 00 00      	call 0x6981 ; target 0x9a5e8
   659e0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   659e8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   659f0: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   65a00: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   65a08: 85 10 00 00 60 3c ff ff      	call -0xc3a0 ; target 0x3d10
   65a10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65a18: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   65a20: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   65a28: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   65a30: 7b 3a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r3
   65a38: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   65a40: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   65a48: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   65a50: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   65a58: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   65a60: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   65a68: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65a70: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   65a78: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   65a80: 7b 8a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r8
   65a88: 7b 7a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r7
   65a90: 05 00 30 ff 00 00 00 00      	ja -0xd0 <.text+0x652f8>
   65a98: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65aa0: 85 10 00 00 68 69 00 00      	call 0x6968 ; target 0x9a5e8
   65aa8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65ab0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65ab8: 18 03 00 00 63 db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb63 ; data 'sol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_atamayhem_statemayhem_t'
   65ac8: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   65ad0: 05 00 09 ff 00 00 00 00      	ja -0xf7 <.text+0x65200>
   65ad8: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   65ae0: 85 10 00 00 60 69 00 00      	call 0x6960 ; target 0x9a5e8
   65ae8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65af0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65af8: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   65b08: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   65b10: 85 10 00 00 3f 3c ff ff      	call -0xc3c1 ; target 0x3d10
   65b18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65b20: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   65b28: 05 00 0e ff 00 00 00 00      	ja -0xf2 <.text+0x65280>
   65b30: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65b38: 85 10 00 00 55 69 00 00      	call 0x6955 ; target 0x9a5e8
   65b40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65b48: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65b50: 18 03 00 00 db db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbdb ; data 'bonding_curveglobalpump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_r'
   65b60: 05 00 21 ff 00 00 00 00      	ja -0xdf <.text+0x65350>
   65b68: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65b70: 85 10 00 00 4e 69 00 00      	call 0x694e ; target 0x9a5e8
   65b78: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65b80: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65b88: 18 03 00 00 31 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade31 ; data 'associated_quote_bonding_curveassociated_base_bonding_curveassociated_creator_vaultsharing_configassociated_us'
   65b98: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   65ba0: 05 00 ef fe 00 00 00 00      	ja -0x111 <.text+0x65200>
   65ba8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65bb0: 85 10 00 00 46 69 00 00      	call 0x6946 ; target 0x9a5e8
   65bb8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65bc0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65bc8: 18 03 00 00 37 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc37 ; data 'fee_recipientfee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountp'
   65bd8: 05 00 12 ff 00 00 00 00      	ja -0xee <.text+0x65350>
   65be0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65be8: 85 10 00 00 3f 69 00 00      	call 0x693f ; target 0x9a5e8
   65bf0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65bf8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65c00: 18 03 00 00 44 dc 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadc44 ; data 'fee_recipient_atatraderquote_token_programbase_token_programglobal_configpool_base_token_accountpool_quote_tok'
   65c10: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   65c18: 05 00 e0 fe 00 00 00 00      	ja -0x120 <.text+0x65200>
   65c20: b7 01 00 00 df 07 00 00      	mov64 r1, 0x7df
   65c28: 85 10 00 00 37 69 00 00      	call 0x6937 ; target 0x9a5e8
   65c30: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65c38: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65c40: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   65c50: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   65c58: 85 10 00 00 16 3c ff ff      	call -0xc3ea ; target 0x3d10
   65c60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65c68: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65c70: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65c78: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65c80: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65c88: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   65c90: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   65c98: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   65ca0: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   65ca8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   65cb0: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   65cb8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   65cc0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   65cc8: 05 00 62 ff 00 00 00 00      	ja -0x9e <.text+0x656c0>
   65cd0: b7 01 00 00 d9 07 00 00      	mov64 r1, 0x7d9
   65cd8: 85 10 00 00 21 69 00 00      	call 0x6921 ; target 0x9a5e8
   65ce0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65ce8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65cf0: 18 03 00 00 4f de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade4f ; data 'associated_base_bonding_curveassociated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpecte'
   65d00: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   65d08: 85 10 00 00 00 3c ff ff      	call -0xc400 ; target 0x3d10
   65d10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65d18: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65d20: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65d28: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65d30: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65d38: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   65d40: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   65d48: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   65d50: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   65d58: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   65d60: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   65d68: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   65d70: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   65d78: 05 00 4c ff 00 00 00 00      	ja -0xb4 <.text+0x656c0>
   65d80: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65d88: 05 00 14 fc 00 00 00 00      	ja -0x3ec <.text+0x63d10>
   65d90: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65d98: 85 10 00 00 09 69 00 00      	call 0x6909 ; target 0x9a5e8
   65da0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65da8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65db0: 18 03 00 00 f5 dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddf5 ; data 'creator_vaultmayhem_base_token_vaultmayhem_quote_token_vaultassociated_quote_bonding_curveassociated_base_bond'
   65dc0: 05 00 d5 fe 00 00 00 00      	ja -0x12b <.text+0x65350>
   65dc8: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65dd0: 85 10 00 00 02 69 00 00      	call 0x6902 ; target 0x9a5e8
   65dd8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65de0: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65de8: 18 03 00 00 6c de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade6c ; data 'associated_creator_vaultsharing_configassociated_user_volume_accumulatorUnexpected variant tag: payermint_auth'
   65df8: 05 00 78 ff 00 00 00 00      	ja -0x88 <.text+0x658a0>
   65e00: b7 01 00 00 dc 07 00 00      	mov64 r1, 0x7dc
   65e08: 85 10 00 00 fb 68 00 00      	call 0x68fb ; target 0x9a5e8
   65e10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65e18: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65e20: 18 03 00 00 ee db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadbee ; data 'pump_programpump_event_authoritymayhem-statebonding-curveaccountwsol_mintfee_recipientfee_recipient_atatraderq'
   65e30: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   65e38: 85 10 00 00 da 3b ff ff      	call -0xc426 ; target 0x3d10
   65e40: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65e48: 18 01 00 00 01 56 e0 f6 00 00 00 00 93 66 5a cf      	lddw r1, -0x30a5996c091fa9ff
   65e58: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   65e60: 79 a1 58 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4a8]
   65e68: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   65e70: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   65e78: 7b 8a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r8
   65e80: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   65e88: 18 01 00 00 44 db 15 68 00 00 00 00 bf 17 5b aa      	lddw r1, -0x55a4e84097ea24bc
   65e98: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   65ea0: 18 01 00 00 51 89 cb 97 00 00 00 00 f5 d2 ff 3b      	lddw r1, 0x3bffd2f597cb8951
   65eb0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   65eb8: 18 01 00 00 65 5d 2b b6 00 00 00 00 fd 6d 18 b0      	lddw r1, -0x4fe7920249d4a29b
   65ec8: 05 00 22 ff 00 00 00 00      	ja -0xde <.text+0x656c0>
   65ed0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65ed8: 85 10 00 00 e1 68 00 00      	call 0x68e1 ; target 0x9a5e8
   65ee0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65ee8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65ef0: 18 03 00 00 6b dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd6b ; data 'user_volume_accumulatorfee_configfee_programpool_v2buyback_recipientbuyback_recipient_atamayhem_quote_vaultpoo'
   65f00: 05 00 23 ff 00 00 00 00      	ja -0xdd <.text+0x65700>
   65f08: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65f10: 85 10 00 00 da 68 00 00      	call 0x68da ; target 0x9a5e8
   65f18: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65f20: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65f28: 18 03 00 00 92 de 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xade92
   65f38: b7 04 00 00 22 00 00 00      	mov64 r4, 0x22
   65f40: 05 00 7b fe 00 00 00 00      	ja -0x185 <.text+0x65200>
   65f48: b7 01 00 00 d6 07 00 00      	mov64 r1, 0x7d6
   65f50: 85 10 00 00 d2 68 00 00      	call 0x68d2 ; target 0x9a5e8
   65f58: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65f60: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   65f68: 18 03 00 00 4d db 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadb4d ; data 'event_authorityprogramsol_vaultquote_mintsol_vault_quote_atatoken_programassociated_token_programadmin_quote_a'
   65f78: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   65f80: 85 10 00 00 b1 3b ff ff      	call -0xc44f ; target 0x3d10
   65f88: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   65f90: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   65f98: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   65fa0: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   65fa8: 7b 3a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r3
   65fb0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   65fb8: 7b 3a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r3
   65fc0: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   65fc8: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   65fd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   65fd8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   65fe0: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   65fe8: 05 00 50 ff 00 00 00 00      	ja -0xb0 <.text+0x65950>
   65ff0: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   65ff8: 85 10 00 00 bd 68 00 00      	call 0x68bd ; target 0x9a5e8
   66000: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   66008: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   66010: 18 03 00 00 9e dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xadd9e ; data 'buyback_recipientbuyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_bas'
   66020: 05 00 7d ff 00 00 00 00      	ja -0x83 <.text+0x65af0>
   66028: b7 01 00 00 d0 07 00 00      	mov64 r1, 0x7d0
   66030: 85 10 00 00 b6 68 00 00      	call 0x68b6 ; target 0x9a5e8
   66038: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   66040: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   66048: 18 03 00 00 af dd 0a 00 00 00 00 00 00 00 00 00      	lddw r3, 0xaddaf ; data 'buyback_recipient_atamayhem_quote_vaultpool-v2associated_bonding_curvecreator_vaultmayhem_base_token_vaultmayh'
   66058: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   66060: 05 00 57 fe 00 00 00 00      	ja -0x1a9 <.text+0x65200>
