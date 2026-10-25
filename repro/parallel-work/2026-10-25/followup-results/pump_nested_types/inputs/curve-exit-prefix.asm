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
