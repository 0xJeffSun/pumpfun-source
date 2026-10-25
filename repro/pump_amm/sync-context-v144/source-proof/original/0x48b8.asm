
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
    48b8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    48c0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    48c8: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    48d0: bf 42 00 00 00 00 00 00      	mov64 r2, r4
    48d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    48e0: 85 10 00 00 ff 29 02 00      	call 0x229ff
    48e8: b7 09 00 00 02 00 00 00      	mov64 r9, 0x2
    48f0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
    48f8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
    4900: 55 00 94 00 00 00 00 00      	jne r0, 0x0, +0x94 <.text+0x4c88>
    4908: 79 78 00 00 00 00 00 00      	ldxdw r8, [r7 + 0x0]
    4910: bf 81 00 00 00 00 00 00      	mov64 r1, r8
    4918: 85 10 00 00 c5 fc 01 00      	call 0x1fcc5
    4920: 55 00 90 00 00 00 00 00      	jne r0, 0x0, +0x90 <.text+0x4c88>
    4928: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4930: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4938: bf 82 00 00 00 00 00 00      	mov64 r2, r8
    4940: 85 10 00 00 1a 09 02 00      	call 0x2091a
    4948: 79 a8 f0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x10]
    4950: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
    4958: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
    4960: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
    4970: 5d 32 13 00 00 00 00 00      	jne r2, r3, +0x13 <.text+0x48f0>
    4978: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    4980: 79 11 08 00 00 00 00 00      	ldxdw r1, [r1 + 0x8]
    4988: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    4990: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    4998: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
    49a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    49a8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    49b0: 18 02 00 00 fe c5 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x11c5fe
    49c0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    49c8: 85 10 00 00 00 fc 01 00      	call 0x1fc00
    49d0: 15 00 12 00 00 00 00 00      	jeq r0, 0x0, +0x12 <.text+0x4948>
    49d8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    49e0: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
    49e8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
    49f0: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
    49f8: a5 02 6a 00 02 00 00 00      	jlt r2, 0x2, +0x6a <.text+0x4c30>
    4a00: 15 01 69 00 00 00 00 00      	jeq r1, 0x0, +0x69 <.text+0x4c30>
    4a08: 05 00 64 00 00 00 00 00      	ja +0x64 <.text+0x4c10>
    4a10: 7b 8a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r8
    4a18: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    4a20: 7b 2a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r2
    4a28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4a30: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
    4a38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4a40: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
    4a48: 85 10 00 00 be fc 01 00      	call 0x1fcbe
    4a50: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    4a58: 79 a9 d0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x30]
    4a60: 05 00 68 00 00 00 00 00      	ja +0x68 <.text+0x4c88>
    4a68: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    4a70: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
    4a78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4a80: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4a88: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
    4a90: 85 10 00 00 e7 fb 01 00      	call 0x1fbe7
    4a98: 55 00 4c 00 00 00 00 00      	jne r0, 0x0, +0x4c <.text+0x4be0>
    4aa0: 71 71 58 00 00 00 00 00      	ldxb r1, [r7 + 0x58]
    4aa8: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    4ab0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4ab8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4ac0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4ac8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4ad0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    4ad8: 85 10 00 00 de fb 01 00      	call 0x1fbde
    4ae0: 55 00 43 00 00 00 00 00      	jne r0, 0x0, +0x43 <.text+0x4be0>
    4ae8: 79 71 28 00 00 00 00 00      	ldxdw r1, [r7 + 0x28]
    4af0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4af8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4b00: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4b08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4b10: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4b18: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4b20: 85 10 00 00 d5 fb 01 00      	call 0x1fbd5
    4b28: 55 00 3a 00 00 00 00 00      	jne r0, 0x0, +0x3a <.text+0x4be0>
    4b30: 79 71 30 00 00 00 00 00      	ldxdw r1, [r7 + 0x30]
    4b38: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4b40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4b48: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4b50: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4b58: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4b60: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4b68: 85 10 00 00 cc fb 01 00      	call 0x1fbcc
    4b70: 55 00 31 00 00 00 00 00      	jne r0, 0x0, +0x31 <.text+0x4be0>
    4b78: 79 71 38 00 00 00 00 00      	ldxdw r1, [r7 + 0x38]
    4b80: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4b88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4b90: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4b98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4ba0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4ba8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4bb0: 85 10 00 00 c3 fb 01 00      	call 0x1fbc3
    4bb8: 55 00 28 00 00 00 00 00      	jne r0, 0x0, +0x28 <.text+0x4be0>
    4bc0: 79 71 40 00 00 00 00 00      	ldxdw r1, [r7 + 0x40]
    4bc8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4bd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4bd8: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4be0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4be8: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4bf0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4bf8: 85 10 00 00 ba fb 01 00      	call 0x1fbba
    4c00: 55 00 1f 00 00 00 00 00      	jne r0, 0x0, +0x1f <.text+0x4be0>
    4c08: 71 71 59 00 00 00 00 00      	ldxb r1, [r7 + 0x59]
    4c10: 73 1a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r1
    4c18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4c20: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4c28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4c30: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4c38: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    4c40: 85 10 00 00 b1 fb 01 00      	call 0x1fbb1
    4c48: 55 00 16 00 00 00 00 00      	jne r0, 0x0, +0x16 <.text+0x4be0>
    4c50: 79 71 48 00 00 00 00 00      	ldxdw r1, [r7 + 0x48]
    4c58: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4c60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4c68: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4c70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4c78: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4c80: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4c88: 85 10 00 00 a8 fb 01 00      	call 0x1fba8
    4c90: 55 00 0d 00 00 00 00 00      	jne r0, 0x0, +0xd <.text+0x4be0>
    4c98: 79 71 50 00 00 00 00 00      	ldxdw r1, [r7 + 0x50]
    4ca0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    4ca8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4cb0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
    4cb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    4cc0: 07 02 00 00 f8 ff ff ff      	add64 r2, -0x8
    4cc8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
    4cd0: 85 10 00 00 9f fb 01 00      	call 0x1fb9f
    4cd8: 55 00 04 00 00 00 00 00      	jne r0, 0x0, +0x4 <.text+0x4be0>
    4ce0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    4ce8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    4cf0: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
    4cf8: 05 00 15 00 00 00 00 00      	ja +0x15 <.text+0x4c88>
    4d00: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    4d08: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
    4d10: bf 12 00 00 00 00 00 00      	mov64 r2, r1
    4d18: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
    4d20: a5 02 05 00 02 00 00 00      	jlt r2, 0x2, +0x5 <.text+0x4c30>
    4d28: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <.text+0x4c30>
    4d30: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
    4d38: 79 02 07 00 00 00 00 00      	ldxdw r2, [r0 + 0x7]
    4d40: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
    4d48: 8d 00 00 00 02 00 00 00      	callx r2
    4d50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    4d58: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
    4d60: b7 02 00 00 bc 0b 00 00      	mov64 r2, 0xbbc
    4d68: 85 10 00 00 19 02 02 00      	call 0x20219
    4d70: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
    4d78: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
    4d80: 79 83 00 00 00 00 00 00      	ldxdw r3, [r8 + 0x0]
    4d88: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
    4d90: 7b 38 00 00 00 00 00 00      	stxdw [r8 + 0x0], r3
    4d98: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0x4c88>
    4da0: bf 29 00 00 00 00 00 00      	mov64 r9, r2
    4da8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    4db0: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
    4db8: 95 00 00 00 00 00 00 00      	exit
