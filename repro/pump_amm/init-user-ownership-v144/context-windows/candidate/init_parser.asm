
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000d9a80 <_ZN145_$LT$pump_amm_recovered..InitUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..InitUserVolumeAccumulatorBumps$GT$$GT$12try_accounts17h07462e47ba871cc6E>:
   d9a80: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   d9a88: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   d9a90: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   d9a98: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   d9aa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9aa8: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d9ab0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d9ab8: 85 10 00 00 1a 68 fe ff      	call -0x197e6
   d9ac0: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   d9ac8: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   d9ad0: 55 02 17 00 02 00 00 00      	jne r2, 0x2, +0x17 <LBB495_6>
   d9ad8: 79 84 08 f0 00 00 00 00      	ldxdw r4, [r8 - 0xff8]
   d9ae0: 7b 3a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r3
   d9ae8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d9af0: 15 01 5c 00 00 00 00 00      	jeq r1, 0x0, +0x5c <LBB495_18>
   d9af8: 7b 6a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r6
   d9b00: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   d9b08: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d9b10: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   d9b18: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   d9b20: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   d9b28: 07 05 00 00 30 00 00 00      	add64 r5, 0x30
   d9b30: 7b 57 00 00 00 00 00 00      	stxdw [r7 + 0x0], r5
   d9b38: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   d9b40: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   d9b48: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   d9b50: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
   d9b58: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB495_4>
   d9b60: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0

00000000000d9b68 <LBB495_4>:
   d9b68: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   d9b70: 7b 6a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r6
   d9b78: 7b 08 00 00 00 00 00 00      	stxdw [r8 + 0x0], r0
   d9b80: 55 09 0a 00 01 00 00 00      	jne r9, 0x1, +0xa <LBB495_7>

00000000000d9b88 <LBB495_5>:
   d9b88: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000d9b90 <LBB495_6>:
   d9b90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9b98: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   d9ba0: 18 04 00 00 d2 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ebd2
   d9bb0: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   d9bb8: 85 10 00 00 e0 4f fe ff      	call -0x1b020
   d9bc0: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   d9bc8: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   d9bd0: 05 00 4e 00 00 00 00 00      	ja +0x4e <LBB495_19>

00000000000d9bd8 <LBB495_7>:
   d9bd8: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   d9be0: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   d9be8: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   d9bf0: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
   d9bf8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB495_9>
   d9c00: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0

00000000000d9c08 <LBB495_9>:
   d9c08: 7b 5a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r5
   d9c10: 7b 4a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r4
   d9c18: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   d9c20: 55 06 01 00 01 00 00 00      	jne r6, 0x1, +0x1 <LBB495_11>
   d9c28: 05 00 eb ff 00 00 00 00      	ja -0x15 <LBB495_5>

00000000000d9c30 <LBB495_11>:
   d9c30: 79 24 18 00 00 00 00 00      	ldxdw r4, [r2 + 0x18]
   d9c38: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   d9c40: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   d9c48: 71 25 28 00 00 00 00 00      	ldxb r5, [r2 + 0x28]
   d9c50: 71 24 29 00 00 00 00 00      	ldxb r4, [r2 + 0x29]
   d9c58: 71 20 2a 00 00 00 00 00      	ldxb r0, [r2 + 0x2a]
   d9c60: 73 0a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r0
   d9c68: 73 4a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r4
   d9c70: 73 5a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r5
   d9c78: 7b 6a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r6
   d9c80: 79 a4 c0 fc 00 00 00 00      	ldxdw r4, [r10 - 0x340]
   d9c88: 7b 4a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r4
   d9c90: 7b 9a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r9
   d9c98: 7b 8a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r8
   d9ca0: 79 a4 c8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x338]
   d9ca8: 7b 4a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r4
   d9cb0: 15 03 36 00 00 00 00 00      	jeq r3, 0x0, +0x36 <LBB495_21>
   d9cb8: 79 a3 b8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x348]
   d9cc0: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   d9cc8: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   d9cd0: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   d9cd8: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   d9ce0: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d9ce8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9cf0: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d9cf8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d9d00: 85 10 00 00 98 69 fe ff      	call -0x19668
   d9d08: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   d9d10: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   d9d18: 55 02 34 00 02 00 00 00      	jne r2, 0x2, +0x34 <LBB495_22>
   d9d20: 7b 3a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r3
   d9d28: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   d9d30: 79 a9 d0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x330]
   d9d38: 15 02 89 00 00 00 00 00      	jeq r2, 0x0, +0x89 <LBB495_38>
   d9d40: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d9d48: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   d9d50: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   d9d58: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   d9d60: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   d9d68: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d9d70: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   d9d78: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   d9d80: 7b 4a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r4
   d9d88: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   d9d90: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d9d98: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d9da0: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB495_16>
   d9da8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000d9db0 <LBB495_16>:
   d9db0: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   d9db8: 79 a6 c8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x338]
   d9dc0: 7b 46 00 00 00 00 00 00      	stxdw [r6 + 0x0], r4
   d9dc8: 55 05 2b 00 01 00 00 00      	jne r5, 0x1, +0x2b <LBB495_23>
   d9dd0: 05 00 b6 ff 00 00 00 00      	ja -0x4a <LBB495_5>

00000000000d9dd8 <LBB495_18>:
   d9dd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9de0: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   d9de8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9df0: 85 10 00 00 73 3b 00 00      	call 0x3b73
   d9df8: 79 a3 f0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x310]
   d9e00: 79 a2 e8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x318]
   d9e08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9e10: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   d9e18: 18 04 00 00 d4 df 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dfd4
   d9e28: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   d9e30: 85 10 00 00 91 4f fe ff      	call -0x1b06f
   d9e38: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   d9e40: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]

00000000000d9e48 <LBB495_19>:
   d9e48: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d9e50: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d9e58: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2

00000000000d9e60 <LBB495_20>:
   d9e60: 95 00 00 00 00 00 00 00      	exit

00000000000d9e68 <LBB495_21>:
   d9e68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9e70: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   d9e78: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d9e80: 85 10 00 00 61 3b 00 00      	call 0x3b61
   d9e88: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   d9e90: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   d9e98: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   d9ea0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   d9ea8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d9eb0: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2
   d9eb8: 05 00 11 01 00 00 00 00      	ja +0x111 <LBB495_53>

00000000000d9ec0 <LBB495_22>:
   d9ec0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d9ec8: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   d9ed0: 18 04 00 00 12 ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea12
   d9ee0: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   d9ee8: 85 10 00 00 7a 4f fe ff      	call -0x1b086
   d9ef0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   d9ef8: 79 a2 30 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d0]
   d9f00: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   d9f08: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   d9f10: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d9f18: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2
   d9f20: 05 00 02 01 00 00 00 00      	ja +0x102 <LBB495_52>

00000000000d9f28 <LBB495_23>:
   d9f28: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   d9f30: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   d9f38: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   d9f40: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d9f48: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d9f50: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB495_25>
   d9f58: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000d9f60 <LBB495_25>:
   d9f60: 79 a8 c0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x340]
   d9f68: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   d9f70: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB495_27>
   d9f78: 05 00 81 ff 00 00 00 00      	ja -0x7f <LBB495_5>

00000000000d9f80 <LBB495_27>:
   d9f80: 15 03 52 00 00 00 00 00      	jeq r3, 0x0, +0x52 <LBB495_39>
   d9f88: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   d9f90: 7b 3a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r3
   d9f98: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   d9fa0: 7b 3a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r3
   d9fa8: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   d9fb0: 7b 3a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r3
   d9fb8: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   d9fc0: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   d9fc8: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   d9fd0: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   d9fd8: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   d9fe0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d9fe8: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   d9ff0: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d9ff8: 79 12 38 00 00 00 00 00      	ldxdw r2, [r1 + 0x38]
   da000: 7b 2a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r2
   da008: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   da010: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   da018: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   da020: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB495_30>
   da028: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000da030 <LBB495_30>:
   da030: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   da038: 7b 4a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r4
   da040: 79 a4 b8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x348]
   da048: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   da050: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB495_32>
   da058: 05 00 65 ff 00 00 00 00      	ja -0x9b <LBB495_5>

00000000000da060 <LBB495_32>:
   da060: 79 14 40 00 00 00 00 00      	ldxdw r4, [r1 + 0x40]
   da068: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   da070: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   da078: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   da080: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB495_34>
   da088: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000da090 <LBB495_34>:
   da090: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   da098: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   da0a0: 7b 4a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r4
   da0a8: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   da0b0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB495_36>
   da0b8: 05 00 59 ff 00 00 00 00      	ja -0xa7 <LBB495_5>

00000000000da0c0 <LBB495_36>:
   da0c0: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   da0c8: 7b 2a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r2
   da0d0: 71 19 59 00 00 00 00 00      	ldxb r9, [r1 + 0x59]
   da0d8: 71 17 58 00 00 00 00 00      	ldxb r7, [r1 + 0x58]
   da0e0: 79 16 50 00 00 00 00 00      	ldxdw r6, [r1 + 0x50]
   da0e8: 79 18 48 00 00 00 00 00      	ldxdw r8, [r1 + 0x48]
   da0f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da0f8: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da100: 85 10 00 00 2e 3d 00 00      	call 0x3d2e
   da108: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   da110: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   da118: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da120: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   da128: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   da130: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   da138: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   da140: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <LBB495_40>
   da148: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da150: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   da158: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da160: 07 02 00 00 b0 fe ff ff      	add64 r2, -0x150
   da168: 85 10 00 00 45 35 00 00      	call 0x3545
   da170: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   da178: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   da180: 05 00 8f 00 00 00 00 00      	ja +0x8f <LBB495_42>

00000000000da188 <LBB495_38>:
   da188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da190: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   da198: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   da1a0: 85 10 00 00 fd 3a 00 00      	call 0x3afd
   da1a8: 79 a3 20 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2e0]
   da1b0: 79 a2 18 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e8]
   da1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da1c0: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   da1c8: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   da1d8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   da1e0: 85 10 00 00 1b 4f fe ff      	call -0x1b0e5
   da1e8: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   da1f0: 79 a2 10 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f0]
   da1f8: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   da200: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   da208: 72 09 fa 00 02 00 00 00      	stb [r9 + 0xfa], 0x2
   da210: 05 00 a4 00 00 00 00 00      	ja +0xa4 <LBB495_52>

00000000000da218 <LBB495_39>:
   da218: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da220: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   da228: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   da230: 85 10 00 00 eb 3a 00 00      	call 0x3aeb
   da238: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   da240: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   da248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da250: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   da258: 18 04 00 00 0b ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea0b
   da268: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   da270: 85 10 00 00 09 4f fe ff      	call -0x1b0f7
   da278: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   da280: 79 a2 30 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2d0]
   da288: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   da290: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   da298: 72 09 fa 00 02 00 00 00      	stb [r9 + 0xfa], 0x2
   da2a0: 05 00 80 00 00 00 00 00      	ja +0x80 <LBB495_48>

00000000000da2a8 <LBB495_40>:
   da2a8: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   da2b0: 7b 9a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r9
   da2b8: 7b 6a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r6
   da2c0: 7b 8a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r8
   da2c8: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   da2d0: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   da2d8: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   da2e0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   da2e8: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   da2f0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   da2f8: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   da300: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   da308: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   da310: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   da318: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   da320: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da328: 18 05 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r5, 0x10e58f
   da338: 7b 5a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r5
   da340: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   da348: 07 05 00 00 70 ff ff ff      	add64 r5, -0x90
   da350: 7b 5a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r5
   da358: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   da360: 7b 4a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r4
   da368: 7b 3a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r3
   da370: 7b 2a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r2
   da378: 7a 0a f8 fe 17 00 00 00      	stdw [r10 - 0x108], 0x17
   da380: 7a 0a 08 ff 20 00 00 00      	stdw [r10 - 0xf8], 0x20
   da388: 79 a4 48 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1b8]
   da390: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da398: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da3a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da3a8: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   da3b0: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   da3b8: 85 10 00 00 2a 4a 00 00      	call 0x4a2a
   da3c0: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   da3c8: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   da3d0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da3d8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   da3e0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   da3e8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   da3f0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   da3f8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   da400: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   da408: 73 1a ef fe 00 00 00 00      	stxb [r10 - 0x111], r1
   da410: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   da418: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   da420: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   da428: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da430: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da438: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   da440: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   da448: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   da450: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   da458: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   da460: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   da468: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   da470: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da478: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da480: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da488: 07 02 00 00 c8 fe ff ff      	add64 r2, -0x138
   da490: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   da498: 85 10 00 00 cc 61 00 00      	call 0x61cc
   da4a0: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   da4a8: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   da4b0: 15 00 61 00 00 00 00 00      	jeq r0, 0x0, +0x61 <LBB495_57>
   da4b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4c0: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   da4c8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   da4d0: 85 10 00 00 97 3a 00 00      	call 0x3a97
   da4d8: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   da4e0: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   da4e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da4f0: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   da4f8: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   da508: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   da510: 85 10 00 00 b5 4e fe ff      	call -0x1b14b
   da518: 79 a7 00 fe 00 00 00 00      	ldxdw r7, [r10 - 0x200]
   da520: 79 a3 f8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x208]
   da528: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   da530: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   da538: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   da540: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   da548: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   da550: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   da558: 79 a6 c8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x138]
   da560: 7b 6a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r6
   da568: 79 a6 d0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x130]
   da570: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   da578: 79 a6 d8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x128]
   da580: 7b 6a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r6
   da588: 79 a6 e0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x120]
   da590: 7b 6a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r6
   da598: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   da5a0: 7b 0a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r0
   da5a8: 7b 5a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r5
   da5b0: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   da5b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da5c0: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   da5c8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   da5d0: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   da5d8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   da5e0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   da5e8: 85 10 00 00 e7 34 00 00      	call 0x34e7
   da5f0: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   da5f8: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]

00000000000da600 <LBB495_42>:
   da600: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   da608: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   da610: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   da618: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2

00000000000da620 <LBB495_43>:
   da620: 79 a4 a8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x358]

00000000000da628 <LBB495_44>:
   da628: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   da630: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   da638: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da640: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   da648: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB495_46>
   da650: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   da658: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   da660: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da668: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000da670 <LBB495_46>:
   da670: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   da678: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da680: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   da688: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB495_48>
   da690: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   da698: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da6a0: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1

00000000000da6a8 <LBB495_48>:
   da6a8: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   da6b0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   da6b8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da6c0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   da6c8: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB495_50>
   da6d0: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   da6d8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   da6e0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da6e8: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000da6f0 <LBB495_50>:
   da6f0: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   da6f8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   da700: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da708: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   da710: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB495_52>
   da718: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   da720: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   da728: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da730: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000da738 <LBB495_52>:
   da738: 79 a9 68 fe 00 00 00 00      	ldxdw r9, [r10 - 0x198]
   da740: 79 a8 60 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1a0]

00000000000da748 <LBB495_53>:
   da748: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   da750: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da758: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   da760: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB495_55>
   da768: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   da770: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da778: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000da780 <LBB495_55>:
   da780: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   da788: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da790: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   da798: 55 01 d8 fe 00 00 00 00      	jne r1, 0x0, -0x128 <LBB495_20>
   da7a0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   da7a8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   da7b0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   da7b8: 05 00 d4 fe 00 00 00 00      	ja -0x12c <LBB495_20>

00000000000da7c0 <LBB495_57>:
   da7c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da7c8: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   da7d0: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   da7d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da7e0: 07 01 00 00 ef fe ff ff      	add64 r1, -0x111
   da7e8: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   da7f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da7f8: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   da800: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   da808: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da810: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   da818: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   da820: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da828: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   da830: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   da838: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da840: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   da848: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   da850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da858: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   da860: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   da868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da870: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   da878: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da880: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   da888: 85 10 00 00 3d 01 00 00      	call 0x13d
   da890: 79 a8 18 ff 00 00 00 00      	ldxdw r8, [r10 - 0xe8]
   da898: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   da8a0: 71 a9 69 ff 00 00 00 00      	ldxb r9, [r10 - 0x97]
   da8a8: 79 a6 d0 fc 00 00 00 00      	ldxdw r6, [r10 - 0x330]
   da8b0: 15 09 5b 00 02 00 00 00      	jeq r9, 0x2, +0x5b <LBB495_71>
   da8b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da8c0: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
   da8c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   da8d0: 07 02 00 00 20 ff ff ff      	add64 r2, -0xe0
   da8d8: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   da8e0: 85 10 00 00 3a 61 00 00      	call 0x613a
   da8e8: 61 a1 6a ff 00 00 00 00      	ldxw r1, [r10 - 0x96]
   da8f0: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   da8f8: 69 a1 6e ff 00 00 00 00      	ldxh r1, [r10 - 0x92]
   da900: 6b 1a ac ff 00 00 00 00      	stxh [r10 - 0x54], r1
   da908: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   da910: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <LBB495_72>
   da918: 7b 8a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r8
   da920: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   da928: 07 08 00 00 70 ff ff ff      	add64 r8, -0x90
   da930: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   da938: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   da940: 85 10 00 00 52 64 fe ff      	call -0x19bae
   da948: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   da950: 85 10 00 00 42 3f 00 00      	call 0x3f42
   da958: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   da960: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   da968: 07 08 00 00 10 ff ff ff      	add64 r8, -0xf0
   da970: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   da978: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   da980: 85 10 00 00 4a 64 fe ff      	call -0x19bb6
   da988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da990: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   da998: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   da9a0: 85 10 00 00 51 3f 00 00      	call 0x3f51
   da9a8: 79 a3 f8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x108]
   da9b0: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   da9b8: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   da9c8: 5d 21 4b 00 00 00 00 00      	jne r1, r2, +0x4b <LBB495_73>
   da9d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   da9d8: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   da9e0: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   da9e8: 85 10 00 00 5c 3c 00 00      	call 0x3c5c
   da9f0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   da9f8: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   daa00: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   daa08: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daa10: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   daa18: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_62>
   daa20: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   daa28: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daa30: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000daa38 <LBB495_62>:
   daa38: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   daa40: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daa48: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   daa50: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_64>
   daa58: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   daa60: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daa68: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000daa70 <LBB495_64>:
   daa70: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   daa78: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   daa80: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   daa88: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daa90: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   daa98: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_66>
   daaa0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   daaa8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   daab0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000daab8 <LBB495_66>:
   daab8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   daac0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daac8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   daad0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_68>
   daad8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   daae0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   daae8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000daaf0 <LBB495_68>:
   daaf0: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <LBB495_69>
   daaf8: 05 00 55 00 00 00 00 00      	ja +0x55 <LBB495_81>

00000000000dab00 <LBB495_69>:
   dab00: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   dab08: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   dab10: 55 01 61 00 00 00 00 00      	jne r1, 0x0, +0x61 <LBB495_82>
   dab18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dab20: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   dab28: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dab30: 85 10 00 00 cb 39 00 00      	call 0x39cb
   dab38: 79 a3 80 fd 00 00 00 00      	ldxdw r3, [r10 - 0x280]
   dab40: 79 a2 78 fd 00 00 00 00      	ldxdw r2, [r10 - 0x288]
   dab48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dab50: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   dab58: 18 04 00 00 d2 eb 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ebd2
   dab68: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   dab70: 85 10 00 00 e9 4d fe ff      	call -0x1b217
   dab78: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   dab80: 79 a2 70 fd 00 00 00 00      	ldxdw r2, [r10 - 0x290]
   dab88: 05 00 d9 00 00 00 00 00      	ja +0xd9 <LBB495_85>

00000000000dab90 <LBB495_71>:
   dab90: 7b 86 08 00 00 00 00 00      	stxdw [r6 + 0x8], r8
   dab98: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   daba0: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   daba8: 05 00 4e ff 00 00 00 00      	ja -0xb2 <LBB495_43>

00000000000dabb0 <LBB495_72>:
   dabb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dabb8: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   dabc0: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   dabc8: 85 10 00 00 b8 39 00 00      	call 0x39b8
   dabd0: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   dabd8: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   dabe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dabe8: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   dabf0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dac00: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dac08: 85 10 00 00 d6 4d fe ff      	call -0x1b22a
   dac10: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   dac18: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   dac20: 05 00 c6 00 00 00 00 00      	ja +0xc6 <LBB495_85>

00000000000dac28 <LBB495_73>:
   dac28: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   dac30: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   dac38: 7b 3a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r3
   dac40: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   dac48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dac50: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   dac58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dac60: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   dac68: 85 10 00 00 e5 33 00 00      	call 0x33e5
   dac70: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   dac78: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   dac80: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   dac88: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   dac90: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   dac98: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   daca0: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   daca8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   dacb0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dacb8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   dacc0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_75>
   dacc8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   dacd0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dacd8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000dace0 <LBB495_75>:
   dace0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   dace8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dacf0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   dacf8: 79 a4 a8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x358]
   dad00: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB495_77>
   dad08: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   dad10: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dad18: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

00000000000dad20 <LBB495_77>:
   dad20: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   dad28: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   dad30: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   dad38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dad40: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   dad48: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB495_79>
   dad50: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   dad58: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   dad60: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

00000000000dad68 <LBB495_79>:
   dad68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   dad70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dad78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   dad80: 55 02 14 ff 00 00 00 00      	jne r2, 0x0, -0xec <LBB495_44>
   dad88: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   dad90: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   dad98: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   dada0: 05 00 10 ff 00 00 00 00      	ja -0xf0 <LBB495_44>

00000000000dada8 <LBB495_81>:
   dada8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dadb0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   dadb8: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   dadc0: 85 10 00 00 79 39 00 00      	call 0x3979
   dadc8: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   dadd0: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   dadd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dade0: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   dade8: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   dadf8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dae00: 85 10 00 00 97 4d fe ff      	call -0x1b269
   dae08: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   dae10: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   dae18: 05 00 87 00 00 00 00 00      	ja +0x87 <LBB495_85>

00000000000dae20 <LBB495_82>:
   dae20: 79 a4 48 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1b8]
   dae28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dae30: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   dae38: 18 02 00 00 38 40 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x114038
   dae48: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dae50: 85 10 00 00 d7 48 00 00      	call 0x48d7
   dae58: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   dae60: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   dae68: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   dae70: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   dae78: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   dae80: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   dae88: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   dae90: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   dae98: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   daea0: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   daea8: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   daeb0: 79 a2 98 fc 00 00 00 00      	ldxdw r2, [r10 - 0x368]
   daeb8: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   daec0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   daec8: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   daed0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   daed8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   daee0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   daee8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   daef0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   daef8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   daf00: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   daf08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   daf10: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   daf18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   daf20: 85 10 00 00 7b 60 00 00      	call 0x607b
   daf28: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   daf30: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   daf38: 55 00 3d 00 00 00 00 00      	jne r0, 0x0, +0x3d <LBB495_84>
   daf40: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   daf48: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   daf50: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   daf58: 07 01 00 00 70 00 00 00      	add64 r1, 0x70
   daf60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   daf68: 07 02 00 00 58 fe ff ff      	add64 r2, -0x1a8
   daf70: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   daf78: 85 10 00 00 67 60 00 00      	call 0x6067
   daf80: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   daf88: 7b 1a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r1
   daf90: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   daf98: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   dafa0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dafa8: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   dafb0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   dafb8: 85 10 00 00 5f 60 00 00      	call 0x605f
   dafc0: 69 a1 ac ff 00 00 00 00      	ldxh r1, [r10 - 0x54]
   dafc8: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
   dafd0: 73 96 69 00 00 00 00 00      	stxb [r6 + 0x69], r9
   dafd8: 79 a3 78 fc 00 00 00 00      	ldxdw r3, [r10 - 0x388]
   dafe0: 73 36 c8 00 00 00 00 00      	stxb [r6 + 0xc8], r3
   dafe8: 79 a3 80 fc 00 00 00 00      	ldxdw r3, [r10 - 0x380]
   daff0: 73 36 c9 00 00 00 00 00      	stxb [r6 + 0xc9], r3
   daff8: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   db000: 73 36 ca 00 00 00 00 00      	stxb [r6 + 0xca], r3
   db008: 79 a3 48 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b8]
   db010: 73 36 f8 00 00 00 00 00      	stxb [r6 + 0xf8], r3
   db018: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   db020: 73 36 f9 00 00 00 00 00      	stxb [r6 + 0xf9], r3
   db028: 79 a3 a0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x360]
   db030: 73 36 fa 00 00 00 00 00      	stxb [r6 + 0xfa], r3
   db038: 79 a3 58 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a8]
   db040: 7b 36 f0 00 00 00 00 00      	stxdw [r6 + 0xf0], r3
   db048: 79 a3 60 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a0]
   db050: 7b 36 e8 00 00 00 00 00      	stxdw [r6 + 0xe8], r3
   db058: 79 a3 a8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x358]
   db060: 7b 36 e0 00 00 00 00 00      	stxdw [r6 + 0xe0], r3
   db068: 79 a3 b8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x348]
   db070: 7b 36 d8 00 00 00 00 00      	stxdw [r6 + 0xd8], r3
   db078: 79 a3 70 fc 00 00 00 00      	ldxdw r3, [r10 - 0x390]
   db080: 7b 36 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r3
   db088: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   db090: 7b 36 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r3
   db098: 79 a3 68 fc 00 00 00 00      	ldxdw r3, [r10 - 0x398]
   db0a0: 7b 36 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r3
   db0a8: 79 a3 c0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x340]
   db0b0: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   db0b8: 79 a3 c8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x338]
   db0c0: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   db0c8: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   db0d0: 7b 36 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r3
   db0d8: 79 a3 38 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3c8]
   db0e0: 7b 36 18 00 00 00 00 00      	stxdw [r6 + 0x18], r3
   db0e8: 7b 76 10 00 00 00 00 00      	stxdw [r6 + 0x10], r7
   db0f0: 79 a3 40 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3c0]
   db0f8: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   db100: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   db108: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   db110: 63 26 6a 00 00 00 00 00      	stxw [r6 + 0x6a], r2
   db118: 6b 16 6e 00 00 00 00 00      	stxh [r6 + 0x6e], r1
   db120: 05 00 a7 fd 00 00 00 00      	ja -0x259 <LBB495_20>

00000000000db128 <LBB495_84>:
   db128: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db130: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   db138: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   db140: 85 10 00 00 09 39 00 00      	call 0x3909
   db148: 79 a3 b0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x250]
   db150: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   db158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db160: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   db168: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   db178: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   db180: 85 10 00 00 27 4d fe ff      	call -0x1b2d9
   db188: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   db190: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   db198: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   db1a0: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   db1a8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   db1b0: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   db1b8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   db1c0: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   db1c8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   db1d0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   db1d8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   db1e0: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   db1e8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   db1f0: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   db1f8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   db200: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   db208: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   db210: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   db218: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   db220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db228: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   db230: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   db238: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   db240: 85 10 00 00 5c 33 00 00      	call 0x335c
   db248: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   db250: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]

00000000000db258 <LBB495_85>:
   db258: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   db260: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   db268: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   db270: 05 00 75 fe 00 00 00 00      	ja -0x18b <LBB495_43>
