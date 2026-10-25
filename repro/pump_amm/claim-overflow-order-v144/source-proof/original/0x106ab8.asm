
evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
  106ab8: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
  106ac0: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
  106ac8: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
  106ad0: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
  106ad8: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
  106ae0: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
  106ae8: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
  106af0: 79 52 00 f0 00 00 00 00      	ldxdw r2, [r5 - 0x1000]
  106af8: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
  106b00: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <custom_panic+0x188f0>
  106b08: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  106b10: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
  106b18: 27 01 00 00 22 00 00 00      	mul64 r1, 0x22
  106b20: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  106b28: 0f 12 00 00 00 00 00 00      	add64 r2, r1
  106b30: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
  106b38: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
  106b40: 27 01 00 00 30 00 00 00      	mul64 r1, 0x30
  106b48: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  106b50: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
  106b58: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
  106b60: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
  106b68: 05 00 05 00 00 00 00 00      	ja +0x5 <custom_panic+0x186e8>
  106b70: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
  106b78: 0f 23 00 00 00 00 00 00      	add64 r3, r2
  106b80: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
  106b88: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
  106b90: 1d 16 41 00 00 00 00 00      	jeq r6, r1, +0x41 <custom_panic+0x188f0>
  106b98: bf 68 00 00 00 00 00 00      	mov64 r8, r6
  106ba0: 07 06 00 00 22 00 00 00      	add64 r6, 0x22
  106ba8: 79 a9 e0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x20]
  106bb0: 79 a7 d8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x28]
  106bb8: 15 09 f9 ff 00 00 00 00      	jeq r9, 0x0, -0x7 <custom_panic+0x186d8>
  106bc0: 79 72 30 00 00 00 00 00      	ldxdw r2, [r7 + 0x30]
  106bc8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  106bd0: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
  106bd8: 85 10 00 00 a0 25 00 00      	call 0x25a0
  106be0: 07 09 00 00 d0 ff ff ff      	add64 r9, -0x30
  106be8: 07 07 00 00 30 00 00 00      	add64 r7, 0x30
  106bf0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
  106bf8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
  106c00: 55 00 f6 ff 00 00 00 00      	jne r0, 0x0, -0xa <custom_panic+0x18708>
  106c08: 71 81 21 00 00 00 00 00      	ldxb r1, [r8 + 0x21]
  106c10: 55 01 1b 00 00 00 00 00      	jne r1, 0x0, +0x1b <custom_panic+0x18840>
  106c18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  106c20: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  106c28: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  106c30: 85 10 00 00 89 04 00 00      	call 0x489
  106c38: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  106c40: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  106c48: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
  106c58: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <custom_panic+0x187b8>
  106c60: 05 00 32 00 00 00 00 00      	ja +0x32 <custom_panic+0x18948>
  106c68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
  106c70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
  106c78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  106c80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  106c88: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  106c90: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  106c98: 85 10 00 00 9d 04 00 00      	call 0x49d
  106ca0: b7 02 00 00 ff ff ff ff      	mov64 r2, -0x1
  106ca8: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  106cb0: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  106cb8: 1d 83 d6 ff 00 00 00 00      	jeq r3, r8, -0x2a <custom_panic+0x186c0>
  106cc0: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  106cc8: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
  106cd0: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
  106cd8: 7b 24 08 00 00 00 00 00      	stxdw [r4 + 0x8], r2
  106ce0: 7b 34 00 00 00 00 00 00      	stxdw [r4 + 0x0], r3
  106ce8: 05 00 20 00 00 00 00 00      	ja +0x20 <custom_panic+0x18940>
  106cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  106cf8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  106d00: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  106d08: 85 10 00 00 80 04 00 00      	call 0x480
  106d10: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  106d18: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  106d20: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
  106d30: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <custom_panic+0x18890>
  106d38: 05 00 17 00 00 00 00 00      	ja +0x17 <custom_panic+0x18948>
  106d40: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
  106d48: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
  106d50: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  106d58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  106d60: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  106d68: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  106d70: 85 10 00 00 94 04 00 00      	call 0x494
  106d78: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  106d80: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  106d88: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  106d90: 1d 83 bb ff 00 00 00 00      	jeq r3, r8, -0x45 <custom_panic+0x186c0>
  106d98: 05 00 e4 ff 00 00 00 00      	ja -0x1c <custom_panic+0x18810>
  106da0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
  106da8: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
  106db0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  106db8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
  106dc0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  106dc8: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
  106dd0: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  106dd8: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
  106de0: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
  106de8: 85 10 00 00 8e 02 00 00      	call 0x28e
  106df0: 95 00 00 00 00 00 00 00      	exit
  106df8: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
  106e00: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
  106e08: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
  106e10: 7b 34 08 00 00 00 00 00      	stxdw [r4 + 0x8], r3
  106e18: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
  106e20: 05 00 f9 ff 00 00 00 00      	ja -0x7 <custom_panic+0x18940>
