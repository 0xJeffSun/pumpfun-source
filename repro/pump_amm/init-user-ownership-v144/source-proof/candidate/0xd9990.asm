
work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000d9990 <_ZN145_$LT$pump_amm_recovered..InitUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..InitUserVolumeAccumulatorBumps$GT$$GT$12try_accounts17h07462e47ba871cc6E>:
   d9990: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   d9998: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   d99a0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   d99a8: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
   d99b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d99b8: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d99c0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d99c8: 85 10 00 00 38 68 fe ff      	call -0x197c8
   d99d0: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   d99d8: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   d99e0: 55 02 14 00 02 00 00 00      	jne r2, 0x2, +0x14 <LBB495_4>
   d99e8: 79 89 08 f0 00 00 00 00      	ldxdw r9, [r8 - 0xff8]
   d99f0: 7b 3a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r3
   d99f8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d9a00: 55 01 19 00 00 00 00 00      	jne r1, 0x0, +0x19 <LBB495_5>
   d9a08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9a10: 07 01 00 00 20 fd ff ff      	add64 r1, -0x2e0
   d9a18: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9a20: 85 10 00 00 8b 3b 00 00      	call 0x3b8b
   d9a28: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]
   d9a30: 15 02 3e 00 02 00 00 00      	jeq r2, 0x2, +0x3e <LBB495_12>
   d9a38: 79 a3 28 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d8]
   d9a40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9a48: 07 01 00 00 10 fd ff ff      	add64 r1, -0x2f0
   d9a50: 18 04 00 00 c4 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcc4
   d9a60: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   d9a68: 85 10 00 00 0a 50 fe ff      	call -0x1aff6
   d9a70: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   d9a78: 79 a2 18 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e8]
   d9a80: 05 00 9e 00 00 00 00 00      	ja +0x9e <LBB495_30>

00000000000d9a88 <LBB495_4>:
   d9a88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9a90: 07 01 00 00 60 fe ff ff      	add64 r1, -0x1a0
   d9a98: 18 04 00 00 c2 e8 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e8c2
   d9aa8: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   d9ab0: 85 10 00 00 01 50 fe ff      	call -0x1afff
   d9ab8: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   d9ac0: 79 a2 68 fe 00 00 00 00      	ldxdw r2, [r10 - 0x198]
   d9ac8: 05 00 95 00 00 00 00 00      	ja +0x95 <LBB495_30>

00000000000d9ad0 <LBB495_5>:
   d9ad0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   d9ad8: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   d9ae0: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   d9ae8: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   d9af0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   d9af8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d9b00: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   d9b08: 7b 2a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r2
   d9b10: 15 03 22 00 00 00 00 00      	jeq r3, 0x0, +0x22 <LBB495_12>
   d9b18: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   d9b20: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
   d9b28: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   d9b30: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   d9b38: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   d9b40: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d9b48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9b50: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d9b58: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d9b60: 85 10 00 00 cc 69 fe ff      	call -0x19634
   d9b68: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   d9b70: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   d9b78: 55 02 1c 00 02 00 00 00      	jne r2, 0x2, +0x1c <LBB495_13>
   d9b80: 7b 3a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r3
   d9b88: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   d9b90: 15 02 6e 00 00 00 00 00      	jeq r2, 0x0, +0x6e <LBB495_29>
   d9b98: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d9ba0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   d9ba8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   d9bb0: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   d9bb8: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   d9bc0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d9bc8: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   d9bd0: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   d9bd8: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   d9be0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d9be8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d9bf0: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB495_10>
   d9bf8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000d9c00 <LBB495_10>:
   d9c00: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   d9c08: 7b 8a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r8
   d9c10: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   d9c18: 55 05 11 00 01 00 00 00      	jne r5, 0x1, +0x11 <LBB495_14>

00000000000d9c20 <LBB495_11>:
   d9c20: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000d9c28 <LBB495_12>:
   d9c28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9c30: 07 01 00 00 00 fd ff ff      	add64 r1, -0x300
   d9c38: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9c40: 85 10 00 00 47 3b 00 00      	call 0x3b47
   d9c48: 79 a1 00 fd 00 00 00 00      	ldxdw r1, [r10 - 0x300]
   d9c50: 79 a2 08 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f8]
   d9c58: 05 00 63 00 00 00 00 00      	ja +0x63 <LBB495_30>

00000000000d9c60 <LBB495_13>:
   d9c60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9c68: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   d9c70: 18 04 00 00 02 e7 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e702
   d9c80: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   d9c88: 85 10 00 00 c6 4f fe ff      	call -0x1b03a
   d9c90: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   d9c98: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   d9ca0: 05 00 5a 00 00 00 00 00      	ja +0x5a <LBB495_30>

00000000000d9ca8 <LBB495_14>:
   d9ca8: 79 18 10 00 00 00 00 00      	ldxdw r8, [r1 + 0x10]
   d9cb0: 79 84 00 00 00 00 00 00      	ldxdw r4, [r8 + 0x0]
   d9cb8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d9cc0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d9cc8: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB495_16>
   d9cd0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000d9cd8 <LBB495_16>:
   d9cd8: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   d9ce0: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB495_18>
   d9ce8: 05 00 e6 ff 00 00 00 00      	ja -0x1a <LBB495_11>

00000000000d9cf0 <LBB495_18>:
   d9cf0: 15 03 54 00 00 00 00 00      	jeq r3, 0x0, +0x54 <LBB495_32>
   d9cf8: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   d9d00: 7b 3a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r3
   d9d08: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   d9d10: 7b 3a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r3
   d9d18: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   d9d20: 7b 3a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r3
   d9d28: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   d9d30: 7b 3a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r3
   d9d38: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   d9d40: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   d9d48: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   d9d50: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d9d58: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   d9d60: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d9d68: 79 14 38 00 00 00 00 00      	ldxdw r4, [r1 + 0x38]
   d9d70: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   d9d78: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d9d80: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d9d88: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB495_21>
   d9d90: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000d9d98 <LBB495_21>:
   d9d98: 79 17 30 00 00 00 00 00      	ldxdw r7, [r1 + 0x30]
   d9da0: 7b 7a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r7
   d9da8: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   d9db0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB495_23>
   d9db8: 05 00 cc ff 00 00 00 00      	ja -0x34 <LBB495_11>

00000000000d9dc0 <LBB495_23>:
   d9dc0: 79 17 40 00 00 00 00 00      	ldxdw r7, [r1 + 0x40]
   d9dc8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   d9dd0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d9dd8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d9de0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB495_25>
   d9de8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000d9df0 <LBB495_25>:
   d9df0: 7b 8a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r8
   d9df8: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   d9e00: 7b 4a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r4
   d9e08: 7b 0a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r0
   d9e10: 7b 7a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r7
   d9e18: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d9e20: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB495_27>
   d9e28: 05 00 be ff 00 00 00 00      	ja -0x42 <LBB495_11>

00000000000d9e30 <LBB495_27>:
   d9e30: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   d9e38: 7b 2a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r2
   d9e40: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   d9e48: 7b 2a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r2
   d9e50: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   d9e58: 7b 2a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r2
   d9e60: 79 17 50 00 00 00 00 00      	ldxdw r7, [r1 + 0x50]
   d9e68: 79 18 48 00 00 00 00 00      	ldxdw r8, [r1 + 0x48]
   d9e70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9e78: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d9e80: 85 10 00 00 1c 3d 00 00      	call 0x3d1c
   d9e88: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   d9e90: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   d9e98: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d9ea0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   d9ea8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   d9eb0: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   d9eb8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   d9ec0: 15 01 2e 00 00 00 00 00      	jeq r1, 0x0, +0x2e <LBB495_33>
   d9ec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9ed0: 07 01 00 00 40 fe ff ff      	add64 r1, -0x1c0
   d9ed8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d9ee0: 07 02 00 00 b0 fe ff ff      	add64 r2, -0x150
   d9ee8: 85 10 00 00 33 35 00 00      	call 0x3533
   d9ef0: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   d9ef8: 79 a2 48 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1b8]
   d9f00: 05 00 8f 00 00 00 00 00      	ja +0x8f <LBB495_35>

00000000000d9f08 <LBB495_29>:
   d9f08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9f10: 07 01 00 00 40 fd ff ff      	add64 r1, -0x2c0
   d9f18: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9f20: 85 10 00 00 eb 3a 00 00      	call 0x3aeb
   d9f28: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   d9f30: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   d9f38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9f40: 07 01 00 00 30 fd ff ff      	add64 r1, -0x2d0
   d9f48: 18 04 00 00 ec e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6ec
   d9f58: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   d9f60: 85 10 00 00 6b 4f fe ff      	call -0x1b095
   d9f68: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   d9f70: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]

00000000000d9f78 <LBB495_30>:
   d9f78: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d9f80: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d9f88: 72 06 d2 00 02 00 00 00      	stb [r6 + 0xd2], 0x2

00000000000d9f90 <LBB495_31>:
   d9f90: 95 00 00 00 00 00 00 00      	exit

00000000000d9f98 <LBB495_32>:
   d9f98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9fa0: 07 01 00 00 60 fd ff ff      	add64 r1, -0x2a0
   d9fa8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9fb0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   d9fb8: 85 10 00 00 d8 3a 00 00      	call 0x3ad8
   d9fc0: 79 a3 68 fd 00 00 00 00      	ldxdw r3, [r10 - 0x298]
   d9fc8: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   d9fd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9fd8: 07 01 00 00 50 fd ff ff      	add64 r1, -0x2b0
   d9fe0: 18 04 00 00 fb e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6fb
   d9ff0: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   d9ff8: 85 10 00 00 58 4f fe ff      	call -0x1b0a8
   da000: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   da008: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   da010: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   da018: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   da020: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   da028: 72 06 d2 00 02 00 00 00      	stb [r6 + 0xd2], 0x2
   da030: 05 00 7e 00 00 00 00 00      	ja +0x7e <LBB495_40>

00000000000da038 <LBB495_33>:
   da038: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   da040: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   da048: 7b 7a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r7
   da050: 7b 8a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r8
   da058: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   da060: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   da068: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   da070: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   da078: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   da080: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   da088: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   da090: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   da098: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da0a0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   da0a8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   da0b0: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   da0b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da0c0: 18 05 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r5, 0x10e27f
   da0d0: 7b 5a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r5
   da0d8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   da0e0: 07 05 00 00 70 ff ff ff      	add64 r5, -0x90
   da0e8: 7b 5a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r5
   da0f0: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   da0f8: 7b 4a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r4
   da100: 7b 3a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r3
   da108: 7b 2a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r2
   da110: 7a 0a f8 fe 17 00 00 00      	stdw [r10 - 0x108], 0x17
   da118: 7a 0a 08 ff 20 00 00 00      	stdw [r10 - 0xf8], 0x20
   da120: 79 a4 70 fe 00 00 00 00      	ldxdw r4, [r10 - 0x190]
   da128: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da130: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da138: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da140: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   da148: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   da150: 85 10 00 00 15 4a 00 00      	call 0x4a15
   da158: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   da160: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   da168: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da170: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   da178: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   da180: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   da188: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   da190: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   da198: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   da1a0: 73 1a ef fe 00 00 00 00      	stxb [r10 - 0x111], r1
   da1a8: 73 19 00 00 00 00 00 00      	stxb [r9 + 0x0], r1
   da1b0: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   da1b8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da1c0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da1c8: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   da1d0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   da1d8: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   da1e0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   da1e8: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   da1f0: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   da1f8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   da200: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da208: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da210: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da218: 07 02 00 00 c8 fe ff ff      	add64 r2, -0x138
   da220: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   da228: 85 10 00 00 b8 61 00 00      	call 0x61b8
   da230: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   da238: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   da240: 15 00 4b 00 00 00 00 00      	jeq r0, 0x0, +0x4b <LBB495_44>
   da248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da250: 07 01 00 00 30 fe ff ff      	add64 r1, -0x1d0
   da258: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   da260: 85 10 00 00 83 3a 00 00      	call 0x3a83
   da268: 79 a3 38 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1c8]
   da270: 79 a2 30 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d0]
   da278: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da280: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   da288: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   da298: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   da2a0: 85 10 00 00 03 4f fe ff      	call -0x1b0fd
   da2a8: 79 a3 28 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1d8]
   da2b0: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   da2b8: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   da2c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da2c8: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   da2d0: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   da2d8: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   da2e0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da2e8: 79 a9 c8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x138]
   da2f0: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   da2f8: 79 a9 d0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x130]
   da300: 7b 9a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r9
   da308: 79 a9 d8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x128]
   da310: 7b 9a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r9
   da318: 79 a9 e0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x120]
   da320: 7b 9a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r9
   da328: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   da330: 7b 0a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r0
   da338: 7b 5a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r5
   da340: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   da348: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da350: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   da358: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   da360: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   da368: 85 10 00 00 d5 34 00 00      	call 0x34d5
   da370: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   da378: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]

00000000000da380 <LBB495_35>:
   da380: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   da388: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   da390: 72 06 d2 00 02 00 00 00      	stb [r6 + 0xd2], 0x2
   da398: 79 a4 f8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x308]
   da3a0: 79 a5 f0 fc 00 00 00 00      	ldxdw r5, [r10 - 0x310]
   da3a8: 79 a7 e8 fc 00 00 00 00      	ldxdw r7, [r10 - 0x318]
   da3b0: 79 a8 e0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x320]

00000000000da3b8 <LBB495_36>:
   da3b8: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   da3c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da3c8: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   da3d0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB495_38>
   da3d8: 79 51 08 00 00 00 00 00      	ldxdw r1, [r5 + 0x8]
   da3e0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da3e8: 7b 15 08 00 00 00 00 00      	stxdw [r5 + 0x8], r1

00000000000da3f0 <LBB495_38>:
   da3f0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   da3f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da400: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   da408: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB495_40>
   da410: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   da418: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da420: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1

00000000000da428 <LBB495_40>:
   da428: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   da430: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da438: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   da440: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB495_42>
   da448: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   da450: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da458: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1

00000000000da460 <LBB495_42>:
   da460: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   da468: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da470: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   da478: 55 01 62 ff 00 00 00 00      	jne r1, 0x0, -0x9e <LBB495_31>
   da480: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   da488: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da490: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   da498: 05 00 5e ff 00 00 00 00      	ja -0xa2 <LBB495_31>

00000000000da4a0 <LBB495_44>:
   da4a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4a8: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   da4b0: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   da4b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4c0: 07 01 00 00 ef fe ff ff      	add64 r1, -0x111
   da4c8: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   da4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4d8: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   da4e0: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   da4e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4f0: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   da4f8: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   da500: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da508: 07 01 00 00 78 fe ff ff      	add64 r1, -0x188
   da510: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   da518: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da520: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   da528: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   da530: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da538: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   da540: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   da548: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da550: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da558: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da560: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   da568: 85 10 00 00 3d 01 00 00      	call 0x13d
   da570: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   da578: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   da580: 71 a3 69 ff 00 00 00 00      	ldxb r3, [r10 - 0x97]
   da588: 79 a7 e8 fc 00 00 00 00      	ldxdw r7, [r10 - 0x318]
   da590: 79 a8 e0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x320]
   da598: 15 03 5d 00 02 00 00 00      	jeq r3, 0x2, +0x5d <LBB495_58>
   da5a0: 7b 3a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r3
   da5a8: 7b 1a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r1
   da5b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da5b8: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
   da5c0: 7b 2a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r2
   da5c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da5d0: 07 02 00 00 20 ff ff ff      	add64 r2, -0xe0
   da5d8: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   da5e0: 85 10 00 00 38 61 00 00      	call 0x6138
   da5e8: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   da5f0: 61 a1 6a ff 00 00 00 00      	ldxw r1, [r10 - 0x96]
   da5f8: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   da600: 69 a1 6e ff 00 00 00 00      	ldxh r1, [r10 - 0x92]
   da608: 6b 1a ac ff 00 00 00 00      	stxh [r10 - 0x54], r1
   da610: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   da618: 15 01 50 00 00 00 00 00      	jeq r1, 0x0, +0x50 <LBB495_59>
   da620: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da628: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   da630: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   da638: 85 10 00 00 b3 64 fe ff      	call -0x19b4d
   da640: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   da648: 85 10 00 00 41 3f 00 00      	call 0x3f41
   da650: 7b 0a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r0
   da658: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da660: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da668: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   da670: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   da678: 85 10 00 00 ab 64 fe ff      	call -0x19b55
   da680: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da688: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   da690: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   da698: 85 10 00 00 50 3f 00 00      	call 0x3f50
   da6a0: 79 a3 f8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x108]
   da6a8: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   da6b0: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   da6c0: 5d 21 4a 00 00 00 00 00      	jne r1, r2, +0x4a <LBB495_60>
   da6c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da6d0: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   da6d8: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   da6e0: 85 10 00 00 5b 3c 00 00      	call 0x3c5b
   da6e8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da6f0: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   da6f8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   da700: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da708: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   da710: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_49>
   da718: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   da720: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da728: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000da730 <LBB495_49>:
   da730: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da738: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   da740: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   da748: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_51>
   da750: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   da758: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   da760: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000da768 <LBB495_51>:
   da768: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   da770: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   da778: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   da780: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da788: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   da790: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_53>
   da798: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   da7a0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da7a8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000da7b0 <LBB495_53>:
   da7b0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da7b8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   da7c0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   da7c8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_55>
   da7d0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   da7d8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   da7e0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000da7e8 <LBB495_55>:
   da7e8: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <LBB495_56>
   da7f0: 05 00 55 00 00 00 00 00      	ja +0x55 <LBB495_68>

00000000000da7f8 <LBB495_56>:
   da7f8: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   da800: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   da808: 55 01 61 00 00 00 00 00      	jne r1, 0x0, +0x61 <LBB495_69>
   da810: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da818: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   da820: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   da828: 85 10 00 00 ca 39 00 00      	call 0x39ca
   da830: 79 a3 a8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x258]
   da838: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   da840: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da848: 07 01 00 00 90 fd ff ff      	add64 r1, -0x270
   da850: 18 04 00 00 c2 e8 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e8c2
   da860: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   da868: 85 10 00 00 4a 4e fe ff      	call -0x1b1b6
   da870: 79 a1 90 fd 00 00 00 00      	ldxdw r1, [r10 - 0x270]
   da878: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   da880: 05 00 d4 00 00 00 00 00      	ja +0xd4 <LBB495_72>

00000000000da888 <LBB495_58>:
   da888: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   da890: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   da898: 05 00 d3 00 00 00 00 00      	ja +0xd3 <LBB495_73>

00000000000da8a0 <LBB495_59>:
   da8a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da8a8: 07 01 00 00 80 fd ff ff      	add64 r1, -0x280
   da8b0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   da8b8: 85 10 00 00 b8 39 00 00      	call 0x39b8
   da8c0: 79 a3 88 fd 00 00 00 00      	ldxdw r3, [r10 - 0x278]
   da8c8: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]
   da8d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da8d8: 07 01 00 00 70 fd ff ff      	add64 r1, -0x290
   da8e0: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   da8f0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   da8f8: 85 10 00 00 38 4e fe ff      	call -0x1b1c8
   da900: 79 a1 70 fd 00 00 00 00      	ldxdw r1, [r10 - 0x290]
   da908: 79 a2 78 fd 00 00 00 00      	ldxdw r2, [r10 - 0x288]
   da910: 05 00 c2 00 00 00 00 00      	ja +0xc2 <LBB495_72>

00000000000da918 <LBB495_60>:
   da918: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   da920: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   da928: 7b 3a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r3
   da930: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   da938: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da940: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   da948: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da950: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   da958: 85 10 00 00 e5 33 00 00      	call 0x33e5
   da960: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   da968: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   da970: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   da978: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   da980: 72 06 d2 00 02 00 00 00      	stb [r6 + 0xd2], 0x2
   da988: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da990: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   da998: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   da9a0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da9a8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   da9b0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_62>
   da9b8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   da9c0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   da9c8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000da9d0 <LBB495_62>:
   da9d0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da9d8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   da9e0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   da9e8: 79 a4 f8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x308]
   da9f0: 79 a5 f0 fc 00 00 00 00      	ldxdw r5, [r10 - 0x310]
   da9f8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_64>
   daa00: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   daa08: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daa10: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000daa18 <LBB495_64>:
   daa18: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   daa20: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   daa28: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   daa30: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daa38: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   daa40: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_66>
   daa48: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   daa50: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daa58: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000daa60 <LBB495_66>:
   daa60: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   daa68: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daa70: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   daa78: 55 02 27 ff 00 00 00 00      	jne r2, 0x0, -0xd9 <LBB495_36>
   daa80: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   daa88: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daa90: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   daa98: 05 00 23 ff 00 00 00 00      	ja -0xdd <LBB495_36>

00000000000daaa0 <LBB495_68>:
   daaa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   daaa8: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   daab0: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   daab8: 85 10 00 00 78 39 00 00      	call 0x3978
   daac0: 79 a3 f8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x208]
   daac8: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]
   daad0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   daad8: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   daae0: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   daaf0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   daaf8: 85 10 00 00 f8 4d fe ff      	call -0x1b208
   dab00: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   dab08: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   dab10: 05 00 82 00 00 00 00 00      	ja +0x82 <LBB495_72>

00000000000dab18 <LBB495_69>:
   dab18: 79 a4 70 fe 00 00 00 00      	ldxdw r4, [r10 - 0x190]
   dab20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dab28: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   dab30: 18 02 00 00 28 3d 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x113d28
   dab40: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dab48: 85 10 00 00 d6 48 00 00      	call 0x48d6
   dab50: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   dab58: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   dab60: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   dab68: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   dab70: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   dab78: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   dab80: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dab88: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   dab90: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   dab98: 73 19 01 00 00 00 00 00      	stxb [r9 + 0x1], r1
   daba0: 79 a9 d8 fc 00 00 00 00      	ldxdw r9, [r10 - 0x328]
   daba8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dabb0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   dabb8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dabc0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dabc8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dabd0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   dabd8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dabe0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dabe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dabf0: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   dabf8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dac00: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   dac08: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dac10: 85 10 00 00 7b 60 00 00      	call 0x607b
   dac18: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dac20: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dac28: 55 00 3a 00 00 00 00 00      	jne r0, 0x0, +0x3a <LBB495_71>
   dac30: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   dac38: 7b 1a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r1
   dac40: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   dac48: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   dac50: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   dac58: 7b 1a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r1
   dac60: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   dac68: 07 01 00 00 28 00 00 00      	add64 r1, 0x28
   dac70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dac78: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   dac80: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   dac88: 85 10 00 00 63 60 00 00      	call 0x6063
   dac90: 69 a1 ac ff 00 00 00 00      	ldxh r1, [r10 - 0x54]
   dac98: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
   daca0: 79 a3 60 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a0]
   daca8: 73 36 71 00 00 00 00 00      	stxb [r6 + 0x71], r3
   dacb0: 79 a3 a0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x360]
   dacb8: 73 36 a0 00 00 00 00 00      	stxb [r6 + 0xa0], r3
   dacc0: 79 a3 a8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x358]
   dacc8: 73 36 a1 00 00 00 00 00      	stxb [r6 + 0xa1], r3
   dacd0: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   dacd8: 73 36 a2 00 00 00 00 00      	stxb [r6 + 0xa2], r3
   dace0: 79 a3 c0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x340]
   dace8: 73 36 d0 00 00 00 00 00      	stxb [r6 + 0xd0], r3
   dacf0: 79 a3 c8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x338]
   dacf8: 73 36 d1 00 00 00 00 00      	stxb [r6 + 0xd1], r3
   dad00: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   dad08: 73 36 d2 00 00 00 00 00      	stxb [r6 + 0xd2], r3
   dad10: 79 a3 80 fc 00 00 00 00      	ldxdw r3, [r10 - 0x380]
   dad18: 7b 36 c8 00 00 00 00 00      	stxdw [r6 + 0xc8], r3
   dad20: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   dad28: 7b 36 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r3
   dad30: 7b 76 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r7
   dad38: 79 a3 f0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x310]
   dad40: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   dad48: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   dad50: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   dad58: 79 a3 b8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x348]
   dad60: 7b 36 98 00 00 00 00 00      	stxdw [r6 + 0x98], r3
   dad68: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   dad70: 7b 36 90 00 00 00 00 00      	stxdw [r6 + 0x90], r3
   dad78: 7b 86 88 00 00 00 00 00      	stxdw [r6 + 0x88], r8
   dad80: 79 a3 f8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x308]
   dad88: 7b 36 80 00 00 00 00 00      	stxdw [r6 + 0x80], r3
   dad90: 7b 96 78 00 00 00 00 00      	stxdw [r6 + 0x78], r9
   dad98: 79 a3 68 fc 00 00 00 00      	ldxdw r3, [r10 - 0x398]
   dada0: 7b 36 20 00 00 00 00 00      	stxdw [r6 + 0x20], r3
   dada8: 79 a3 78 fc 00 00 00 00      	ldxdw r3, [r10 - 0x388]
   dadb0: 7b 36 18 00 00 00 00 00      	stxdw [r6 + 0x18], r3
   dadb8: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   dadc0: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   dadc8: 79 a3 58 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a8]
   dadd0: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   dadd8: 79 a3 70 fc 00 00 00 00      	ldxdw r3, [r10 - 0x390]
   dade0: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   dade8: 63 26 72 00 00 00 00 00      	stxw [r6 + 0x72], r2
   dadf0: 6b 16 76 00 00 00 00 00      	stxh [r6 + 0x76], r1
   dadf8: 05 00 32 fe 00 00 00 00      	ja -0x1ce <LBB495_31>

00000000000dae00 <LBB495_71>:
   dae00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dae08: 07 01 00 00 d0 fd ff ff      	add64 r1, -0x230
   dae10: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   dae18: 85 10 00 00 0c 39 00 00      	call 0x390c
   dae20: 79 a3 d8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x228]
   dae28: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   dae30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dae38: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   dae40: 18 04 00 00 ec e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e6ec
   dae50: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   dae58: 85 10 00 00 8c 4d fe ff      	call -0x1b274
   dae60: 79 a3 c8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x238]
   dae68: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   dae70: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dae78: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   dae80: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dae88: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   dae90: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dae98: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   daea0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   daea8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   daeb0: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   daeb8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   daec0: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   daec8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   daed0: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   daed8: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   daee0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   daee8: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   daef0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   daef8: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   daf00: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   daf08: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   daf10: 85 10 00 00 60 33 00 00      	call 0x3360
   daf18: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   daf20: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]

00000000000daf28 <LBB495_72>:
   daf28: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   daf30: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1

00000000000daf38 <LBB495_73>:
   daf38: 72 06 d2 00 02 00 00 00      	stb [r6 + 0xd2], 0x2
   daf40: 79 a4 f8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x308]
   daf48: 79 a5 f0 fc 00 00 00 00      	ldxdw r5, [r10 - 0x310]
   daf50: 05 00 8c fe 00 00 00 00      	ja -0x174 <LBB495_36>
