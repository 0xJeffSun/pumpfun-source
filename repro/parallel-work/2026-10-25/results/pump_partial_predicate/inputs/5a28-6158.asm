    5a28: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    5a30: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    5a38: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    5a40: bf 42 00 00 00 00 00 00      	mov64 r2, r4
    5a48: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    5a50: 85 10 00 00 84 5b 03 00      	call 0x35b84
    5a58: b7 09 00 00 02 00 00 00      	mov64 r9, 0x2
    5a60: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    5a68: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    5a70: 55 00 d9 00 00 00 00 00      	jne r0, 0x0, +0xd9 <.text+0x6020>
    5a78: 79 78 00 00 00 00 00 00      	ldxdw r8, [r7 + 0x0]
    5a80: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    5a88: 85 10 00 00 06 2c 03 00      	call 0x32c06
    5a90: 55 00 d5 00 00 00 00 00      	jne r0, 0x0, +0xd5 <.text+0x6020>
    5a98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5aa0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5aa8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
    5ab0: 85 10 00 00 50 3a 03 00      	call 0x33a50
    5ab8: 79 a8 f0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x10]
    5ac0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
    5ac8: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
    5ad0: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
    5ae0: 5d 32 b5 00 00 00 00 00      	jne r2, r3, +0xb5 <.text+0x5f70>
    5ae8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    5af0: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
    5af8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    5b00: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    5b08: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
    5b10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5b18: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5b20: 18 02 00 00 ef 64 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b64ef
    5b30: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5b38: 85 10 00 00 41 2b 03 00      	call 0x32b41
    5b40: 55 00 b4 00 00 00 00 00      	jne r0, 0x0, +0xb4 <.text+0x5fc8>
    5b48: 79 71 48 00 00 00 00 00      	ldxdw r1, [r7 + 0x48]
    5b50: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5b58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5b60: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5b68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5b70: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5b78: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5b80: 85 10 00 00 38 2b 03 00      	call 0x32b38
    5b88: 55 00 ab 00 00 00 00 00      	jne r0, 0x0, +0xab <.text+0x5fc8>
    5b90: 79 71 50 00 00 00 00 00      	ldxdw r1, [r7 + 0x50]
    5b98: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5ba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ba8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5bb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5bb8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5bc0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5bc8: 85 10 00 00 2f 2b 03 00      	call 0x32b2f
    5bd0: 55 00 a2 00 00 00 00 00      	jne r0, 0x0, +0xa2 <.text+0x5fc8>
    5bd8: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
    5be0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5be8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5bf0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5bf8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5c00: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5c08: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5c10: 85 10 00 00 26 2b 03 00      	call 0x32b26
    5c18: 55 00 99 00 00 00 00 00      	jne r0, 0x0, +0x99 <.text+0x5fc8>
    5c20: 79 71 60 00 00 00 00 00      	ldxdw r1, [r7 + 0x60]
    5c28: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5c30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5c38: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5c40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5c48: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5c50: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5c58: 85 10 00 00 1d 2b 03 00      	call 0x32b1d
    5c60: 55 00 90 00 00 00 00 00      	jne r0, 0x0, +0x90 <.text+0x5fc8>
    5c68: 79 71 68 00 00 00 00 00      	ldxdw r1, [r7 + 0x68]
    5c70: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5c78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5c80: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5c88: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5c90: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5c98: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5ca0: 85 10 00 00 14 2b 03 00      	call 0x32b14
    5ca8: 55 00 87 00 00 00 00 00      	jne r0, 0x0, +0x87 <.text+0x5fc8>
    5cb0: 71 71 a1 00 00 00 00 00      	ldxb r1, [r7 + 0xa1]
    5cb8: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    5cc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5cc8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5cd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5cd8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5ce0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5ce8: 85 10 00 00 0b 2b 03 00      	call 0x32b0b
    5cf0: 55 00 7e 00 00 00 00 00      	jne r0, 0x0, +0x7e <.text+0x5fc8>
    5cf8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    5d00: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
    5d08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5d10: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5d18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    5d20: 85 10 00 00 04 2b 03 00      	call 0x32b04
    5d28: 55 00 77 00 00 00 00 00      	jne r0, 0x0, +0x77 <.text+0x5fc8>
    5d30: 71 71 a2 00 00 00 00 00      	ldxb r1, [r7 + 0xa2]
    5d38: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    5d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5d48: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5d50: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5d58: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5d60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5d68: 85 10 00 00 fb 2a 03 00      	call 0x32afb
    5d70: 55 00 6e 00 00 00 00 00      	jne r0, 0x0, +0x6e <.text+0x5fc8>
    5d78: 71 71 a3 00 00 00 00 00      	ldxb r1, [r7 + 0xa3]
    5d80: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    5d88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5d90: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5d98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5da0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5da8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5db0: 85 10 00 00 f2 2a 03 00      	call 0x32af2
    5db8: 55 00 65 00 00 00 00 00      	jne r0, 0x0, +0x65 <.text+0x5fc8>
    5dc0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    5dc8: 07 02 00 00 28 00 00 00      	add64 r2, 0x28
    5dd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5dd8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5de0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    5de8: 85 10 00 00 eb 2a 03 00      	call 0x32aeb
    5df0: 55 00 5e 00 00 00 00 00      	jne r0, 0x0, +0x5e <.text+0x5fc8>
    5df8: 79 71 70 00 00 00 00 00      	ldxdw r1, [r7 + 0x70]
    5e00: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5e08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5e10: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5e18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5e20: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5e28: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5e30: 85 10 00 00 e2 2a 03 00      	call 0x32ae2
    5e38: 55 00 55 00 00 00 00 00      	jne r0, 0x0, +0x55 <.text+0x5fc8>
    5e40: 71 71 a4 00 00 00 00 00      	ldxb r1, [r7 + 0xa4]
    5e48: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    5e50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5e58: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5e60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5e68: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5e70: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5e78: 85 10 00 00 d9 2a 03 00      	call 0x32ad9
    5e80: 55 00 4c 00 00 00 00 00      	jne r0, 0x0, +0x4c <.text+0x5fc8>
    5e88: 71 71 a5 00 00 00 00 00      	ldxb r1, [r7 + 0xa5]
    5e90: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    5e98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ea0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5ea8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5eb0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5eb8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5ec0: 85 10 00 00 d0 2a 03 00      	call 0x32ad0
    5ec8: 55 00 43 00 00 00 00 00      	jne r0, 0x0, +0x43 <.text+0x5fc8>
    5ed0: 79 71 78 00 00 00 00 00      	ldxdw r1, [r7 + 0x78]
    5ed8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5ee0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ee8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5ef0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5ef8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5f00: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5f08: 85 10 00 00 c7 2a 03 00      	call 0x32ac7
    5f10: 55 00 3a 00 00 00 00 00      	jne r0, 0x0, +0x3a <.text+0x5fc8>
    5f18: 79 71 80 00 00 00 00 00      	ldxdw r1, [r7 + 0x80]
    5f20: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5f28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5f30: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5f38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5f40: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5f48: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5f50: 85 10 00 00 be 2a 03 00      	call 0x32abe
    5f58: 55 00 31 00 00 00 00 00      	jne r0, 0x0, +0x31 <.text+0x5fc8>
    5f60: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    5f68: 07 02 00 00 a0 00 00 00      	add64 r2, 0xa0
    5f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5f78: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5f80: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    5f88: 85 10 00 00 b7 2a 03 00      	call 0x32ab7
    5f90: 55 00 2a 00 00 00 00 00      	jne r0, 0x0, +0x2a <.text+0x5fc8>
    5f98: 79 71 88 00 00 00 00 00      	ldxdw r1, [r7 + 0x88]
    5fa0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5fa8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5fb0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    5fb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    5fc0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    5fc8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    5fd0: 85 10 00 00 ae 2a 03 00      	call 0x32aae
    5fd8: 55 00 21 00 00 00 00 00      	jne r0, 0x0, +0x21 <.text+0x5fc8>
    5fe0: 79 71 90 00 00 00 00 00      	ldxdw r1, [r7 + 0x90]
    5fe8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    5ff0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    5ff8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    6000: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    6008: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    6010: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    6018: 85 10 00 00 a5 2a 03 00      	call 0x32aa5
    6020: 55 00 18 00 00 00 00 00      	jne r0, 0x0, +0x18 <.text+0x5fc8>
    6028: 79 71 98 00 00 00 00 00      	ldxdw r1, [r7 + 0x98]
    6030: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    6038: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    6040: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    6048: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    6050: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    6058: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    6060: 85 10 00 00 9c 2a 03 00      	call 0x32a9c
    6068: 55 00 0f 00 00 00 00 00      	jne r0, 0x0, +0xf <.text+0x5fc8>
    6070: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    6078: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    6080: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
    6088: 05 00 16 00 00 00 00 00      	ja +0x16 <.text+0x6020>
    6090: 7b 8a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r8
    6098: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    60a0: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    60a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    60b0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
    60b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    60c0: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
    60c8: 85 10 00 00 5d 2b 03 00      	call 0x32b5d
    60d0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    60d8: 79 a9 d0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x30]
    60e0: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0x6020>
    60e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    60f0: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
    60f8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
    6100: 85 10 00 00 6a 2b 03 00      	call 0x32b6a
    6108: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
    6110: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
    6118: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
    6120: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
    6128: 7b 38 00 00 00 00 00 00      	stxdw [r8 + 0x0], r3
    6130: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0x6020>
    6138: bf 29 00 00 00 00 00 00      	mov64 r9, r2
    6140: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    6148: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
    6150: 95 00 00 00 00 00 00 00      	exit
