   90bc0: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   90bc8: 79 74 18 00 00 00 00 00      	ldxdw r4, [r7 + 0x18]
   90bd0: 79 73 48 00 00 00 00 00      	ldxdw r3, [r7 + 0x48]
   90bd8: 79 71 78 00 00 00 00 00      	ldxdw r1, [r7 + 0x78]
   90be0: 7b 2a 18 f0 00 00 00 00      	stxdw [r10 - 0xfe8], r2
   90be8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   90bf0: 7a 0a 10 f0 00 00 00 00      	stdw [r10 - 0xff0], 0x0
   90bf8: 7a 0a 08 f0 08 00 00 00      	stdw [r10 - 0xff8], 0x8
   90c00: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   90c08: 07 02 00 00 b8 00 00 00      	add64 r2, 0xb8
   90c10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   90c18: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   90c20: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   90c28: 85 10 00 00 1c 05 00 00      	call 0x51c ; target 0x93510
   90c30: 61 a3 7c ff 00 00 00 00      	ldxw r3, [r10 - 0x84]
   90c38: 61 a8 78 ff 00 00 00 00      	ldxw r8, [r10 - 0x88]
   90c40: 79 a9 70 ff 00 00 00 00      	ldxdw r9, [r10 - 0x90]
   90c48: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   90c58: 7b 7a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r7
   90c60: 5d 19 4e 00 00 00 00 00      	jne r9, r1, +0x4e <custom_panic+0xd9b8>
   90c68: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   90c70: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   90c78: 85 10 00 00 96 0d 00 00      	call 0xd96 ; target 0x97930
   90c80: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   90c88: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   90c90: 79 71 20 00 00 00 00 00      	ldxdw r1, [r7 + 0x20]
   90c98: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90ca0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90ca8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90cb0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd7b0>
   90cb8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90cc0: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   90cc8: 85 10 00 00 db 1e 00 00      	call 0x1edb ; target 0xa03a8
   90cd0: 79 71 28 00 00 00 00 00      	ldxdw r1, [r7 + 0x28]
   90cd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90ce0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90ce8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90cf0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd7f0>
   90cf8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90d00: 07 01 00 00 28 00 00 00      	add64 r1, 0x28
   90d08: 85 10 00 00 c9 1e 00 00      	call 0x1ec9 ; target 0xa0358
   90d10: 79 71 50 00 00 00 00 00      	ldxdw r1, [r7 + 0x50]
   90d18: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90d20: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90d28: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90d30: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd830>
   90d38: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90d40: 07 01 00 00 50 00 00 00      	add64 r1, 0x50
   90d48: 85 10 00 00 cb 1e 00 00      	call 0x1ecb ; target 0xa03a8
   90d50: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
   90d58: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90d60: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90d68: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90d70: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd870>
   90d78: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90d80: 07 01 00 00 58 00 00 00      	add64 r1, 0x58
   90d88: 85 10 00 00 b9 1e 00 00      	call 0x1eb9 ; target 0xa0358
   90d90: 79 71 80 00 00 00 00 00      	ldxdw r1, [r7 + 0x80]
   90d98: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90da0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90da8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90db0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd8b0>
   90db8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90dc0: 07 01 00 00 80 00 00 00      	add64 r1, 0x80
   90dc8: 85 10 00 00 bb 1e 00 00      	call 0x1ebb ; target 0xa03a8
   90dd0: 79 71 88 00 00 00 00 00      	ldxdw r1, [r7 + 0x88]
   90dd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90de0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90de8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90df0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd8f0>
   90df8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   90e00: 07 01 00 00 88 00 00 00      	add64 r1, 0x88
   90e08: 85 10 00 00 a9 1e 00 00      	call 0x1ea9 ; target 0xa0358
   90e10: 79 78 08 00 00 00 00 00      	ldxdw r8, [r7 + 0x8]
   90e18: 79 77 10 00 00 00 00 00      	ldxdw r7, [r7 + 0x10]
   90e20: 15 07 47 00 00 00 00 00      	jeq r7, 0x0, +0x47 <custom_panic+0xdb40>
   90e28: bf 89 00 00 00 00 00 00      	mov64 r9, r8
   90e30: 07 09 00 00 10 00 00 00      	add64 r9, 0x10
   90e38: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0xd938>
   90e40: 07 09 00 00 30 00 00 00      	add64 r9, 0x30
   90e48: 07 07 00 00 ff ff ff ff      	add64 r7, -0x1
   90e50: 15 07 41 00 00 00 00 00      	jeq r7, 0x0, +0x41 <custom_panic+0xdb40>
   90e58: 79 91 f8 ff 00 00 00 00      	ldxdw r1, [r9 - 0x8]
   90e60: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90e68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90e70: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90e78: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xd978>
   90e80: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   90e88: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
   90e90: 85 10 00 00 a2 1e 00 00      	call 0x1ea2 ; target 0xa03a8
   90e98: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   90ea0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   90ea8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   90eb0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   90eb8: 55 02 f0 ff 00 00 00 00      	jne r2, 0x0, -0x10 <custom_panic+0xd920>
   90ec0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   90ec8: 85 10 00 00 91 1e 00 00      	call 0x1e91 ; target 0xa0358
   90ed0: 05 00 ed ff 00 00 00 00      	ja -0x13 <custom_panic+0xd920>
   90ed8: 07 07 00 00 78 00 00 00      	add64 r7, 0x78
   90ee0: 7b 7a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r7
   90ee8: 79 a7 18 ff 00 00 00 00      	ldxdw r7, [r10 - 0xe8]
   90ef0: 07 07 00 00 48 00 00 00      	add64 r7, 0x48
   90ef8: 79 a6 18 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe8]
   90f00: 07 06 00 00 18 00 00 00      	add64 r6, 0x18
   90f08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   90f10: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   90f18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   90f20: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   90f28: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   90f30: b7 03 00 00 40 00 00 00      	mov64 r3, 0x40
   90f38: 85 10 00 00 c9 32 00 00      	call 0x32c9 ; target 0xaa588
   90f40: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   90f48: 63 1a 2c ff 00 00 00 00      	stxw [r10 - 0xd4], r1
   90f50: 63 8a 28 ff 00 00 00 00      	stxw [r10 - 0xd8], r8
   90f58: 7b 9a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r9
   90f60: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   90f68: 07 08 00 00 70 ff ff ff      	add64 r8, -0x90
   90f70: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   90f78: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   90f80: 79 a7 18 ff 00 00 00 00      	ldxdw r7, [r10 - 0xe8]
   90f88: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   90f90: 85 10 00 00 be 32 00 00      	call 0x32be ; target 0xaa588
   90f98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   90fa0: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   90fa8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   90fb0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   90fb8: 85 10 00 00 b9 32 00 00      	call 0x32b9 ; target 0xaa588
   90fc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   90fc8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   90fd0: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   90fd8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   90fe0: 85 10 00 00 b4 32 00 00      	call 0x32b4 ; target 0xaa588
   90fe8: 79 74 a8 00 00 00 00 00      	ldxdw r4, [r7 + 0xa8]
   90ff0: 79 75 b0 00 00 00 00 00      	ldxdw r5, [r7 + 0xb0]
   90ff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   91000: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   91008: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   91010: b7 03 00 00 03 00 00 00      	mov64 r3, 0x3
   91018: 85 10 00 00 9f 14 00 00      	call 0x149f ; target 0x9b518
   91020: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   91028: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   91030: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
   91038: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
   91040: 55 01 09 00 1a 00 00 00      	jne r1, 0x1a, +0x9 <custom_panic+0xdb70>
   91048: b7 06 00 00 02 00 00 00      	mov64 r6, 0x2
   91050: 55 09 0e 00 00 00 00 00      	jne r9, 0x0, +0xe <custom_panic+0xdba8>
   91058: 05 00 12 00 00 00 00 00      	ja +0x12 <custom_panic+0xdbd0>
   91060: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   91068: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   91070: 15 02 37 00 00 00 00 00      	jeq r2, 0x0, +0x37 <custom_panic+0xdd10>
   91078: 27 02 00 00 30 00 00 00      	mul64 r2, 0x30
   91080: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   91088: 05 00 32 00 00 00 00 00      	ja +0x32 <custom_panic+0xdd00>
   91090: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   91098: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   910a0: 85 10 00 00 11 0d 00 00      	call 0xd11 ; target 0x97930
   910a8: bf 06 00 00 00 00 00 00      	mov64 r6, r0
   910b0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   910b8: 79 a9 20 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe0]
   910c0: 15 09 05 00 00 00 00 00      	jeq r9, 0x0, +0x5 <custom_panic+0xdbd0>
   910c8: 27 09 00 00 22 00 00 00      	mul64 r9, 0x22
   910d0: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   910d8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   910e0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   910e8: 85 10 00 00 36 e4 ff ff      	call -0x1bca ; target 0x832a0
   910f0: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   910f8: 15 02 03 00 00 00 00 00      	jeq r2, 0x0, +0x3 <custom_panic+0xdbf8>
   91100: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   91108: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   91110: 85 10 00 00 31 e4 ff ff      	call -0x1bcf ; target 0x832a0
   91118: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   91120: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   91128: 85 10 00 00 7c fd ff ff      	call -0x284 ; target 0x8fd10
   91130: 79 79 08 00 00 00 00 00      	ldxdw r9, [r7 + 0x8]
   91138: 79 77 10 00 00 00 00 00      	ldxdw r7, [r7 + 0x10]
   91140: 15 07 16 00 00 00 00 00      	jeq r7, 0x0, +0x16 <custom_panic+0xdcd8>
   91148: bf 98 00 00 00 00 00 00      	mov64 r8, r9
   91150: 07 08 00 00 10 00 00 00      	add64 r8, 0x10
   91158: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0xdc58>
   91160: 07 08 00 00 30 00 00 00      	add64 r8, 0x30
   91168: 07 07 00 00 ff ff ff ff      	add64 r7, -0x1
   91170: 15 07 10 00 00 00 00 00      	jeq r7, 0x0, +0x10 <custom_panic+0xdcd8>
   91178: 79 81 f8 ff 00 00 00 00      	ldxdw r1, [r8 - 0x8]
   91180: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   91188: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   91190: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   91198: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0xdc98>
   911a0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   911a8: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
   911b0: 85 10 00 00 3e 1e 00 00      	call 0x1e3e ; target 0xa03a8
   911b8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   911c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   911c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   911d0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   911d8: 55 02 f0 ff 00 00 00 00      	jne r2, 0x0, -0x10 <custom_panic+0xdc40>
   911e0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   911e8: 85 10 00 00 2d 1e 00 00      	call 0x1e2d ; target 0xa0358
   911f0: 05 00 ed ff 00 00 00 00      	ja -0x13 <custom_panic+0xdc40>
   911f8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   91200: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   91208: 15 02 04 00 00 00 00 00      	jeq r2, 0x0, +0x4 <custom_panic+0xdd10>
   91210: 27 02 00 00 30 00 00 00      	mul64 r2, 0x30
   91218: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   91220: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   91228: 85 10 00 00 0e e4 ff ff      	call -0x1bf2 ; target 0x832a0
   91230: bf 60 00 00 00 00 00 00      	mov64 r0, r6
   91238: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   91240: 95 00 00 00 00 00 00 00      	exit
