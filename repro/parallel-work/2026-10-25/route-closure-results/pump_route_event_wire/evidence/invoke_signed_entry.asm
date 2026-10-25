  1a1d70: bf 48 00 00 00 00 00 00      	mov64 r8, r4
  1a1d78: 7b 3a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r3
  1a1d80: bf 13 00 00 00 00 00 00      	mov64 r3, r1
  1a1d88: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
  1a1d90: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
  1a1d98: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  1a1da0: 79 51 00 f0 00 00 00 00      	ldxdw r1, [r5 - 0x1000]
  1a1da8: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  1a1db0: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
  1a1db8: 79 27 10 00 00 00 00 00      	ldxdw r7, [r2 + 0x10]
  1a1dc0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  1a1dc8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
  1a1dd0: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
  1a1dd8: 7b 7a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r7
  1a1de0: 15 07 28 00 00 00 00 00      	jeq r7, 0x0, +0x28 <custom_panic+0x4ac70>
  1a1de8: 7b 8a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r8
  1a1df0: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
  1a1df8: bf 76 00 00 00 00 00 00      	mov64 r6, r7
  1a1e00: 27 06 00 00 22 00 00 00      	mul64 r6, 0x22
  1a1e08: 18 01 00 00 c3 c3 c3 c3 00 00 00 00 c3 c3 c3 03      	lddw r1, 0x3c3c3c3c3c3c3c3
  1a1e18: 2d 17 5f 00 00 00 00 00      	jgt r7, r1, +0x5f <custom_panic+0x4ae60>
  1a1e20: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  1a1e28: 79 19 08 00 00 00 00 00      	ldxdw r9, [r1 + 0x8]
  1a1e30: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  1a1e38: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a1e40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a1e48: 85 10 00 00 33 6a ff ff      	call -0x95cd
  1a1e50: 15 00 58 00 00 00 00 00      	jeq r0, 0x0, +0x58 <custom_panic+0x4ae60>
  1a1e58: 7b 0a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r0
  1a1e60: bf 01 00 00 00 00 00 00      	mov64 r1, r0
  1a1e68: 07 01 00 00 21 00 00 00      	add64 r1, 0x21
  1a1e70: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a1e78: 15 06 11 00 00 00 00 00      	jeq r6, 0x0, +0x11 <custom_panic+0x4ac50>
  1a1e80: 79 93 00 00 00 00 00 00      	ldxdw r3, [r9 + 0x0]
  1a1e88: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
  1a1e90: 79 95 10 00 00 00 00 00      	ldxdw r5, [r9 + 0x10]
  1a1e98: 79 90 18 00 00 00 00 00      	ldxdw r0, [r9 + 0x18]
  1a1ea0: 71 98 21 00 00 00 00 00      	ldxb r8, [r9 + 0x21]
  1a1ea8: 71 97 20 00 00 00 00 00      	ldxb r7, [r9 + 0x20]
  1a1eb0: 73 71 ff ff 00 00 00 00      	stxb [r1 - 0x1], r7
  1a1eb8: 73 81 00 00 00 00 00 00      	stxb [r1 + 0x0], r8
  1a1ec0: 7b 01 f7 ff 00 00 00 00      	stxdw [r1 - 0x9], r0
  1a1ec8: 7b 51 ef ff 00 00 00 00      	stxdw [r1 - 0x11], r5
  1a1ed0: 7b 41 e7 ff 00 00 00 00      	stxdw [r1 - 0x19], r4
  1a1ed8: 7b 31 df ff 00 00 00 00      	stxdw [r1 - 0x21], r3
  1a1ee0: 07 01 00 00 22 00 00 00      	add64 r1, 0x22
  1a1ee8: 07 06 00 00 de ff ff ff      	add64 r6, -0x22
  1a1ef0: 07 09 00 00 22 00 00 00      	add64 r9, 0x22
  1a1ef8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
  1a1f00: 55 02 ee ff 00 00 00 00      	jne r2, 0x0, -0x12 <custom_panic+0x4abc0>
  1a1f08: 79 a3 a0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x60]
  1a1f10: 79 a8 70 ff 00 00 00 00      	ldxdw r8, [r10 - 0x90]
  1a1f18: 79 a7 98 ff 00 00 00 00      	ldxdw r7, [r10 - 0x68]
  1a1f20: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
  1a1f28: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  1a1f30: 79 19 20 00 00 00 00 00      	ldxdw r9, [r1 + 0x20]
  1a1f38: 79 16 28 00 00 00 00 00      	ldxdw r6, [r1 + 0x28]
  1a1f40: 15 06 07 00 00 00 00 00      	jeq r6, 0x0, +0x7 <custom_panic+0x4acc8>
  1a1f48: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
  1a1f50: c5 06 3b 00 00 00 00 00      	jslt r6, 0x0, +0x3b <custom_panic+0x4ae78>
  1a1f58: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
  1a1f60: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a1f68: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a1f70: 85 10 00 00 0e 6a ff ff      	call -0x95f2
  1a1f78: 15 00 36 00 00 00 00 00      	jeq r0, 0x0, +0x36 <custom_panic+0x4ae78>
  1a1f80: 79 a7 a8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x58]
  1a1f88: 07 07 00 00 30 00 00 00      	add64 r7, 0x30
  1a1f90: bf 01 00 00 00 00 00 00      	mov64 r1, r0
  1a1f98: bf 92 00 00 00 00 00 00      	mov64 r2, r9
  1a1fa0: bf 63 00 00 00 00 00 00      	mov64 r3, r6
  1a1fa8: bf 09 00 00 00 00 00 00      	mov64 r9, r0
  1a1fb0: 85 10 00 00 cb 22 00 00      	call 0x22cb
  1a1fb8: 7b 6a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r6
  1a1fc0: 7b 6a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r6
  1a1fc8: 7b 9a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r9
  1a1fd0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
  1a1fd8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
  1a1fe0: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
  1a1fe8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
  1a1ff0: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
  1a1ff8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
  1a2000: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  1a2008: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
  1a2010: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
  1a2018: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
  1a2020: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  1a2028: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
  1a2030: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
  1a2038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a2040: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
  1a2048: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
  1a2050: bf 83 00 00 00 00 00 00      	mov64 r3, r8
  1a2058: 79 a4 78 ff 00 00 00 00      	ldxdw r4, [r10 - 0x88]
  1a2060: 79 a5 80 ff 00 00 00 00      	ldxdw r5, [r10 - 0x80]
  1a2068: 85 10 00 00 ff ff ff ff      	call -0x1
  1a2070: 55 00 05 00 00 00 00 00      	jne r0, 0x0, +0x5 <custom_panic+0x4ade8>
  1a2078: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
  1a2088: 79 a2 a0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x60]
  1a2090: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
  1a2098: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0x4ae00>
  1a20a0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
  1a20a8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
  1a20b0: 85 10 00 00 3a 03 00 00      	call 0x33a
  1a20b8: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  1a20c0: 15 02 04 00 00 00 00 00      	jeq r2, 0x0, +0x4 <custom_panic+0x4ae30>
  1a20c8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
  1a20d0: 27 02 00 00 22 00 00 00      	mul64 r2, 0x22
  1a20d8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  1a20e0: 85 10 00 00 fa 69 ff ff      	call -0x9606
  1a20e8: 79 a2 d0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x30]
  1a20f0: 15 02 03 00 00 00 00 00      	jeq r2, 0x0, +0x3 <custom_panic+0x4ae58>
  1a20f8: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
  1a2100: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
  1a2108: 85 10 00 00 f5 69 ff ff      	call -0x960b
  1a2110: 95 00 00 00 00 00 00 00      	exit
  1a2118: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  1a2120: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  1a2128: 85 10 00 00 0d 12 00 00      	call 0x120d
  1a2130: bf 71 00 00 00 00 00 00      	mov64 r1, r7
  1a2138: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  1a2140: 85 10 00 00 0a 12 00 00      	call 0x120a
