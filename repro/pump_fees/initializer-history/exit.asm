    5e80: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    5e88: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    5e90: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    5e98: bf 42 00 00 00 00 00 00      	mov64 r2, r4
    5ea0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    5ea8: 85 10 00 00 10 79 01 00      	call 0x17910 ; target 0xc2730
    5eb0: b7 09 00 00 02 00 00 00      	mov64 r9, 0x2
    5eb8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    5ec0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    5ec8: 55 00 6f 00 00 00 00 00      	jne r0, 0x0, +0x6f <.text+0x6128> ; branch 0x6248
    5ed0: 79 78 88 00 00 00 00 00      	ldxdw r8, [r7 + 0x88]
    5ed8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    5ee0: 85 10 00 00 63 4e 01 00      	call 0x14e63 ; target 0xad200
    5ee8: 55 00 6b 00 00 00 00 00      	jne r0, 0x0, +0x6b <.text+0x6128> ; branch 0x6248
    5ef0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ef8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5f00: bf 82 00 00 00 00 00 00      	mov64 r2, r8
    5f08: 85 10 00 00 a7 59 01 00      	call 0x159a7 ; target 0xb2c48
    5f10: 79 a8 f0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x10]
    5f18: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
    5f20: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
    5f28: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
    5f38: 5d 32 4b 00 00 00 00 00      	jne r2, r3, +0x4b <.text+0x6078> ; branch 0x6198
    5f40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    5f48: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
    5f50: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    5f58: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    5f60: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
    5f68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5f70: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5f78: 18 02 00 00 b7 3d 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc3db7
    5f88: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5f90: 85 10 00 00 9e 4d 01 00      	call 0x14d9e ; target 0xacc88
    5f98: 55 00 4a 00 00 00 00 00      	jne r0, 0x0, +0x4a <.text+0x60d0> ; branch 0x61f0
    5fa0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    5fa8: 07 02 00 00 80 00 00 00      	add64 r2, 0x80
    5fb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5fb8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5fc0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5fc8: 85 10 00 00 97 4d 01 00      	call 0x14d97 ; target 0xacc88
    5fd0: 55 00 43 00 00 00 00 00      	jne r0, 0x0, +0x43 <.text+0x60d0> ; branch 0x61f0
    5fd8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    5fe0: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
    5fe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ff0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5ff8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    6000: 85 10 00 00 90 4d 01 00      	call 0x14d90 ; target 0xacc88
    6008: 55 00 3c 00 00 00 00 00      	jne r0, 0x0, +0x3c <.text+0x60d0> ; branch 0x61f0
    6010: 79 71 50 00 00 00 00 00      	ldxdw r1, [r7 + 0x50]
    6018: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    6020: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    6028: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    6030: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    6038: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    6040: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    6048: 85 10 00 00 87 4d 01 00      	call 0x14d87 ; target 0xacc88
    6050: 55 00 33 00 00 00 00 00      	jne r0, 0x0, +0x33 <.text+0x60d0> ; branch 0x61f0
    6058: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
    6060: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    6068: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    6070: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    6078: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    6080: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    6088: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    6090: 85 10 00 00 7e 4d 01 00      	call 0x14d7e ; target 0xacc88
    6098: 55 00 2a 00 00 00 00 00      	jne r0, 0x0, +0x2a <.text+0x60d0> ; branch 0x61f0
    60a0: 79 71 60 00 00 00 00 00      	ldxdw r1, [r7 + 0x60]
    60a8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    60b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    60b8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    60c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    60c8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    60d0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    60d8: 85 10 00 00 75 4d 01 00      	call 0x14d75 ; target 0xacc88
    60e0: 55 00 21 00 00 00 00 00      	jne r0, 0x0, +0x21 <.text+0x60d0> ; branch 0x61f0
    60e8: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
    60f0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
    60f8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    6100: 07 03 00 00 e0 ff ff ff      	add64 r3, -0x20
    6108: 85 10 00 00 6d 12 00 00      	call 0x126d ; target 0xf478
    6110: 55 00 1b 00 00 00 00 00      	jne r0, 0x0, +0x1b <.text+0x60d0> ; branch 0x61f0
    6118: 79 72 28 00 00 00 00 00      	ldxdw r2, [r7 + 0x28]
    6120: 79 71 20 00 00 00 00 00      	ldxdw r1, [r7 + 0x20]
    6128: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    6130: 07 03 00 00 e0 ff ff ff      	add64 r3, -0x20
    6138: 85 10 00 00 67 12 00 00      	call 0x1267 ; target 0xf478
    6140: 55 00 15 00 00 00 00 00      	jne r0, 0x0, +0x15 <.text+0x60d0> ; branch 0x61f0
    6148: 07 07 00 00 68 00 00 00      	add64 r7, 0x68
    6150: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    6158: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
    6160: bf 71 00 00 00 00 00 00      	mov64 r1, r7
    6168: 85 10 00 00 c9 10 00 00      	call 0x10c9 ; target 0xe7b8
    6170: 55 00 0f 00 00 00 00 00      	jne r0, 0x0, +0xf <.text+0x60d0> ; branch 0x61f0
    6178: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    6180: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    6188: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
    6190: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x6128> ; branch 0x6248
    6198: 7b 8a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r8
    61a0: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    61a8: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    61b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    61b8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
    61c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    61c8: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
    61d0: 85 10 00 00 24 4e 01 00      	call 0x14e24 ; target 0xad2f8
    61d8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    61e0: 79 a9 d0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x30]
    61e8: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0x6128> ; branch 0x6248
    61f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    61f8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
    6200: bf 02 00 00 00 00 00 00      	mov64 r2, r0
    6208: 85 10 00 00 31 4e 01 00      	call 0x14e31 ; target 0xad398
    6210: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
    6218: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
    6220: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
    6228: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
    6230: 7b 38 00 00 00 00 00 00      	stxdw [r8 + 0x0], r3
    6238: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0x6128> ; branch 0x6248
    6240: bf 29 00 00 00 00 00 00      	mov64 r9, r2
    6248: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    6250: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
    6258: 95 00 00 00 00 00 00 00      	exit
