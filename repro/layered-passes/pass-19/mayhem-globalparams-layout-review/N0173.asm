
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so:	file format elf64-sbf

Disassembly of section .text:

0000000000062220 <custom_panic>:
   63870: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   63878: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   63880: 35 01 09 00 08 00 00 00      	jge r1, 0x8, +0x9 <custom_panic+0x16b0>
   63888: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63890: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   63898: b7 02 00 00 b9 0b 00 00      	mov64 r2, 0xbb9
   638a0: 85 10 00 00 53 3c 00 00      	call 0x3c53
   638a8: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   638b0: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   638b8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   638c0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   638c8: 05 00 57 00 00 00 00 00      	ja +0x57 <custom_panic+0x1968>
   638d0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   638d8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   638e0: 18 03 00 00 79 c1 f8 57 00 00 00 00 c3 38 4c 0b      	lddw r3, 0xb4c38c357f8c179
   638f0: 1d 31 54 00 00 00 00 00      	jeq r1, r3, +0x54 <custom_panic+0x1978>
   638f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63900: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   63908: 18 02 00 00 7c 4a 09 00 00 00 00 00 00 00 00 00      	lddw r2, 0x94a7c
   63918: 85 10 00 00 c4 3a 00 00      	call 0x3ac4
   63920: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   63928: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   63930: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   63938: 18 01 00 00 90 84 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x98490
   63948: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   63950: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63958: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   63960: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   63968: 18 01 00 00 20 00 00 e0 00 00 00 00 00 00 00 00      	lddw r1, 0xe0000020
   63978: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   63980: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63988: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   63990: 18 01 00 00 7c 4a 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x94a7c
   639a0: 85 10 00 00 7d 3c 00 00      	call 0x3c7d
   639a8: 55 00 51 00 00 00 00 00      	jne r0, 0x0, +0x51 <custom_panic+0x1a18>
   639b0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   639b8: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   639c0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   639c8: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   639d0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   639d8: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   639e0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   639e8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   639f0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   639f8: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   63a00: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   63a08: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   63a10: 18 01 00 00 72 4e 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x94e72
   63a20: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   63a28: 62 0a b0 ff ba 0b 00 00      	stw [r10 - 0x50], 0xbba
   63a30: 72 0a 68 ff 02 00 00 00      	stb [r10 - 0x98], 0x2
   63a38: 62 0a 30 ff e9 00 00 00      	stw [r10 - 0xd0], 0xe9
   63a40: 7a 0a 28 ff 0a 00 00 00      	stdw [r10 - 0xd8], 0xa
   63a48: 7a 0a 18 ff 00 00 00 00      	stdw [r10 - 0xe8], 0x0
   63a50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   63a58: 07 01 00 00 08 ff ff ff      	add64 r1, -0xf8
   63a60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   63a68: 07 02 00 00 18 ff ff ff      	add64 r2, -0xe8
   63a70: 85 10 00 00 54 36 00 00      	call 0x3654
   63a78: 79 a8 10 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf0]
   63a80: 79 a7 08 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf8]
   63a88: 85 10 00 00 2c 29 00 00      	call 0x292c
   63a90: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   63aa0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   63aa8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   63ab0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   63ab8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   63ac0: 07 01 00 00 f4 ff ff ff      	add64 r1, -0xc
   63ac8: bd 21 1c 00 00 00 00 00      	jle r1, r2, +0x1c <custom_panic+0x1990>
   63ad0: 15 04 1d 00 00 00 00 00      	jeq r4, 0x0, +0x1d <custom_panic+0x19a0>
   63ad8: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   63ae8: 55 02 1e 00 00 00 00 00      	jne r2, 0x0, +0x1e <custom_panic+0x19c0>
   63af0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   63af8: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   63b00: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   63b10: bd 21 1f 00 00 00 00 00      	jle r1, r2, +0x1f <custom_panic+0x19f0>
   63b18: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   63b28: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   63b30: 18 02 00 00 47 6c 6f 62 00 00 00 00 61 6c 50 61      	lddw r2, 0x61506c61626f6c47
   63b40: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   63b48: 62 01 08 00 72 61 6d 73      	stw [r1 + 0x8], 0x736d6172
   63b50: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   63b58: 7b 18 10 00 00 00 00 00      	stxdw [r8 + 0x10], r1
   63b60: 7a 08 18 00 0c 00 00 00      	stdw [r8 + 0x18], 0xc
   63b68: 7a 08 08 00 0c 00 00 00      	stdw [r8 + 0x8], 0xc
   63b70: 7a 08 00 00 01 00 00 00      	stdw [r8 + 0x0], 0x1
   63b78: 7b 86 08 00 00 00 00 00      	stxdw [r6 + 0x8], r8
   63b80: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   63b88: 72 06 f5 00 02 00 00 00      	stb [r6 + 0xf5], 0x2
   63b90: 95 00 00 00 00 00 00 00      	exit
   63b98: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   63ba0: 85 10 00 00 1c 00 00 00      	call 0x1c
   63ba8: 05 00 fc ff 00 00 00 00      	ja -0x4 <custom_panic+0x1970>
   63bb0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   63bb8: 55 04 e3 ff 00 00 00 00      	jne r4, 0x0, -0x1d <custom_panic+0x18b8>
   63bc0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   63bc8: 18 01 00 00 f4 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007ff4
   63bd8: 15 02 e2 ff 00 00 00 00      	jeq r2, 0x0, -0x1e <custom_panic+0x18d0>
   63be0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   63be8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   63bf0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   63bf8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   63c08: 2d 21 e1 ff 00 00 00 00      	jgt r1, r2, -0x1f <custom_panic+0x18f8>
   63c10: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   63c18: b7 02 00 00 0c 00 00 00      	mov64 r2, 0xc
   63c20: 18 03 00 00 b8 85 09 00 00 00 00 00 00 00 00 00      	lddw r3, 0x985b8
   63c30: 85 10 00 00 80 4e 00 00      	call 0x4e80
   63c38: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   63c40: 07 03 00 00 18 ff ff ff      	add64 r3, -0xe8
   63c48: 18 01 00 00 f6 49 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x949f6
   63c58: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   63c60: 18 04 00 00 c0 84 09 00 00 00 00 00 00 00 00 00      	lddw r4, 0x984c0
   63c70: 18 05 00 00 e0 84 09 00 00 00 00 00 00 00 00 00      	lddw r5, 0x984e0
   63c80: 85 10 00 00 bc 50 00 00      	call 0x50bc
