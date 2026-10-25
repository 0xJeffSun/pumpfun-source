
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000005bbf0 <_ZN169_$LT$pump_amm_recovered..incentives..SyncUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..incentives..SyncUserVolumeAccumulatorBumps$GT$$GT$12try_accounts17h180d9cfac99be4a2E>:
   5bbf0: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   5bbf8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   5bc00: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5bc08: 15 01 4a 00 00 00 00 00      	jeq r1, 0x0, +0x4a <LBB226_12>
   5bc10: 7b 2a c8 f9 00 00 00 00      	stxdw [r10 - 0x638], r2
   5bc18: 79 55 08 f0 00 00 00 00      	ldxdw r5, [r5 - 0xff8]
   5bc20: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5bc28: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   5bc30: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5bc38: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5bc40: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   5bc48: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   5bc50: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   5bc58: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   5bc60: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5bc68: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5bc70: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB226_3>
   5bc78: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000005bc80 <LBB226_3>:
   5bc80: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   5bc88: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   5bc90: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB226_5>

000000000005bc98 <LBB226_4>:
   5bc98: 85 10 00 00 ff ff ff ff      	call -0x1

000000000005bca0 <LBB226_5>:
   5bca0: 79 19 10 00 00 00 00 00      	ldxdw r9, [r1 + 0x10]
   5bca8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   5bcb0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5bcb8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5bcc0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB226_7>
   5bcc8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000005bcd0 <LBB226_7>:
   5bcd0: 7b 5a c0 f9 00 00 00 00      	stxdw [r10 - 0x640], r5
   5bcd8: 7b 4a b8 f9 00 00 00 00      	stxdw [r10 - 0x648], r4
   5bce0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   5bce8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB226_9>
   5bcf0: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB226_4>

000000000005bcf8 <LBB226_9>:
   5bcf8: 71 12 2a 00 00 00 00 00      	ldxb r2, [r1 + 0x2a]
   5bd00: 7b 2a a0 f9 00 00 00 00      	stxdw [r10 - 0x660], r2
   5bd08: 71 12 29 00 00 00 00 00      	ldxb r2, [r1 + 0x29]
   5bd10: 7b 2a 98 f9 00 00 00 00      	stxdw [r10 - 0x668], r2
   5bd18: 71 12 28 00 00 00 00 00      	ldxb r2, [r1 + 0x28]
   5bd20: 7b 2a 90 f9 00 00 00 00      	stxdw [r10 - 0x670], r2
   5bd28: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
   5bd30: 7b 2a a8 f9 00 00 00 00      	stxdw [r10 - 0x658], r2
   5bd38: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   5bd40: 7b 1a b0 f9 00 00 00 00      	stxdw [r10 - 0x650], r1
   5bd48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bd50: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5bd58: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5bd60: 85 10 00 00 ca 64 ff ff      	call -0x9b36
   5bd68: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   5bd70: 79 a2 08 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4f8]
   5bd78: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   5bd80: 15 01 2d 00 00 00 00 00      	jeq r1, 0x0, +0x2d <LBB226_13>
   5bd88: 7b 1a 88 f9 00 00 00 00      	stxdw [r10 - 0x678], r1
   5bd90: 7b 2a 70 f9 00 00 00 00      	stxdw [r10 - 0x690], r2
   5bd98: 7b 3a 78 f9 00 00 00 00      	stxdw [r10 - 0x688], r3
   5bda0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bda8: 07 01 00 00 20 fd ff ff      	add64 r1, -0x2e0
   5bdb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5bdb8: 07 02 00 00 18 fb ff ff      	add64 r2, -0x4e8
   5bdc0: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   5bdc8: 85 10 00 00 9d 5e 01 00      	call 0x15e9d
   5bdd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bdd8: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5bde0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   5bde8: 85 10 00 00 8b 64 ff ff      	call -0x9b75
   5bdf0: 79 a3 08 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f8]
   5bdf8: 79 a2 00 fb 00 00 00 00      	ldxdw r2, [r10 - 0x500]
   5be00: 71 a1 59 fb 00 00 00 00      	ldxb r1, [r10 - 0x4a7]
   5be08: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB226_11>
   5be10: 05 00 24 00 00 00 00 00      	ja +0x24 <LBB226_14>

000000000005be18 <LBB226_11>:
   5be18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5be20: 07 01 00 00 00 fa ff ff      	add64 r1, -0x600
   5be28: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5be38: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5be40: 85 10 00 00 8f 4b ff ff      	call -0xb471
   5be48: 79 a1 00 fa 00 00 00 00      	ldxdw r1, [r10 - 0x600]
   5be50: 79 a2 08 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5f8]
   5be58: 05 00 d5 00 00 00 00 00      	ja +0xd5 <LBB226_35>

000000000005be60 <LBB226_12>:
   5be60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5be68: 07 01 00 00 e0 f9 ff ff      	add64 r1, -0x620
   5be70: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5be78: 85 10 00 00 62 37 01 00      	call 0x13762
   5be80: 79 a3 e8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x618]
   5be88: 79 a2 e0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x620]
   5be90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5be98: 07 01 00 00 d0 f9 ff ff      	add64 r1, -0x630
   5bea0: 18 04 00 00 d4 df 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dfd4
   5beb0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   5beb8: 85 10 00 00 80 4b ff ff      	call -0xb480
   5bec0: 79 a1 d0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x630]
   5bec8: 79 a2 d8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x628]
   5bed0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5bed8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5bee0: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   5bee8: 05 00 d4 00 00 00 00 00      	ja +0xd4 <LBB226_40>

000000000005bef0 <LBB226_13>:
   5bef0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bef8: 07 01 00 00 f0 f9 ff ff      	add64 r1, -0x610
   5bf00: 18 04 00 00 5c e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e65c
   5bf10: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5bf18: 85 10 00 00 74 4b ff ff      	call -0xb48c
   5bf20: 79 a1 f0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x610]
   5bf28: 79 a2 f8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x608]
   5bf30: 05 00 ba 00 00 00 00 00      	ja +0xba <LBB226_35>

000000000005bf38 <LBB226_14>:
   5bf38: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   5bf40: 7b 2a 58 f9 00 00 00 00      	stxdw [r10 - 0x6a8], r2
   5bf48: 7b 3a 50 f9 00 00 00 00      	stxdw [r10 - 0x6b0], r3
   5bf50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5bf58: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   5bf60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5bf68: 07 02 00 00 10 fb ff ff      	add64 r2, -0x4f0
   5bf70: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5bf78: 85 10 00 00 67 5e 01 00      	call 0x15e67
   5bf80: 61 a1 5a fb 00 00 00 00      	ldxw r1, [r10 - 0x4a6]
   5bf88: 63 1a 28 ff 00 00 00 00      	stxw [r10 - 0xd8], r1
   5bf90: 69 a1 5e fb 00 00 00 00      	ldxh r1, [r10 - 0x4a2]
   5bf98: 6b 1a 2c ff 00 00 00 00      	stxh [r10 - 0xd4], r1
   5bfa0: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   5bfa8: 15 02 9d 00 00 00 00 00      	jeq r2, 0x0, +0x9d <LBB226_34>
   5bfb0: 7b 8a 60 f9 00 00 00 00      	stxdw [r10 - 0x6a0], r8
   5bfb8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5bfc0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   5bfc8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   5bfd0: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   5bfd8: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   5bfe0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   5bfe8: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   5bff0: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   5bff8: 7b 4a 80 f9 00 00 00 00      	stxdw [r10 - 0x680], r4
   5c000: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5c008: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   5c010: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   5c018: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB226_17>
   5c020: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

000000000005c028 <LBB226_17>:
   5c028: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   5c030: 79 a8 80 f9 00 00 00 00      	ldxdw r8, [r10 - 0x680]
   5c038: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   5c040: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB226_19>
   5c048: 05 00 89 ff 00 00 00 00      	ja -0x77 <LBB226_4>

000000000005c050 <LBB226_19>:
   5c050: 7b 0a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r0
   5c058: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   5c060: 7b 4a 68 f9 00 00 00 00      	stxdw [r10 - 0x698], r4
   5c068: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   5c070: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   5c078: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   5c080: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB226_21>
   5c088: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

000000000005c090 <LBB226_21>:
   5c090: 79 a0 68 f9 00 00 00 00      	ldxdw r0, [r10 - 0x698]
   5c098: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   5c0a0: 79 a8 60 f9 00 00 00 00      	ldxdw r8, [r10 - 0x6a0]
   5c0a8: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB226_23>
   5c0b0: 05 00 7c ff 00 00 00 00      	ja -0x84 <LBB226_4>

000000000005c0b8 <LBB226_23>:
   5c0b8: 15 03 9b 00 00 00 00 00      	jeq r3, 0x0, +0x9b <LBB226_41>
   5c0c0: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   5c0c8: 7b 3a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r3
   5c0d0: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   5c0d8: 7b 3a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r3
   5c0e0: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   5c0e8: 7b 3a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r3
   5c0f0: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   5c0f8: 7b 3a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r3
   5c100: 79 10 18 00 00 00 00 00      	ldxdw r0, [r1 + 0x18]
   5c108: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   5c110: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   5c118: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   5c120: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   5c128: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   5c130: 79 14 38 00 00 00 00 00      	ldxdw r4, [r1 + 0x38]
   5c138: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   5c140: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5c148: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5c150: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB226_26>
   5c158: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000005c160 <LBB226_26>:
   5c160: 79 17 30 00 00 00 00 00      	ldxdw r7, [r1 + 0x30]
   5c168: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   5c170: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB226_28>
   5c178: 05 00 63 ff 00 00 00 00      	ja -0x9d <LBB226_4>

000000000005c180 <LBB226_28>:
   5c180: 79 15 40 00 00 00 00 00      	ldxdw r5, [r1 + 0x40]
   5c188: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   5c190: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   5c198: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5c1a0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB226_30>
   5c1a8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000005c1b0 <LBB226_30>:
   5c1b0: 7b 7a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r7
   5c1b8: 7b 0a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r0
   5c1c0: 7b 4a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r4
   5c1c8: 79 a4 80 f9 00 00 00 00      	ldxdw r4, [r10 - 0x680]
   5c1d0: 7b 5a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r5
   5c1d8: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   5c1e0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB226_32>
   5c1e8: 05 00 55 ff 00 00 00 00      	ja -0xab <LBB226_4>

000000000005c1f0 <LBB226_32>:
   5c1f0: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   5c1f8: 7b 2a 28 f9 00 00 00 00      	stxdw [r10 - 0x6d8], r2
   5c200: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   5c208: 7b 2a 10 f9 00 00 00 00      	stxdw [r10 - 0x6f0], r2
   5c210: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   5c218: 7b 2a 08 f9 00 00 00 00      	stxdw [r10 - 0x6f8], r2
   5c220: 79 12 50 00 00 00 00 00      	ldxdw r2, [r1 + 0x50]
   5c228: 7b 2a 18 f9 00 00 00 00      	stxdw [r10 - 0x6e8], r2
   5c230: 79 11 48 00 00 00 00 00      	ldxdw r1, [r1 + 0x48]
   5c238: 7b 1a 20 f9 00 00 00 00      	stxdw [r10 - 0x6e0], r1
   5c240: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c248: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5c250: 18 02 00 00 20 44 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x114420
   5c260: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5c268: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   5c270: 85 10 00 00 53 46 01 00      	call 0x14653
   5c278: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   5c280: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   5c288: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5c290: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   5c298: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   5c2a0: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   5c2a8: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   5c2b0: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   5c2b8: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   5c2c0: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   5c2c8: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   5c2d0: 79 a1 88 f9 00 00 00 00      	ldxdw r1, [r10 - 0x678]
   5c2d8: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   5c2e0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5c2e8: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5c2f0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5c2f8: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5c300: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5c308: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5c310: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c318: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5c320: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c328: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5c330: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c338: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   5c340: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c348: 85 10 00 00 f6 5d 01 00      	call 0x15df6
   5c350: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5c358: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5c360: 15 00 5a 00 00 00 00 00      	jeq r0, 0x0, +0x5a <LBB226_42>
   5c368: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c370: 07 01 00 00 f0 fa ff ff      	add64 r1, -0x510
   5c378: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5c380: 85 10 00 00 c1 36 01 00      	call 0x136c1
   5c388: 79 a3 f8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x508]
   5c390: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   5c398: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c3a0: 07 01 00 00 e0 fa ff ff      	add64 r1, -0x520
   5c3a8: 18 04 00 00 5c e6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e65c
   5c3b8: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   5c3c0: 85 10 00 00 df 4a ff ff      	call -0xb521
   5c3c8: 79 a3 e8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x518]
   5c3d0: 79 a2 e0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x520]
   5c3d8: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5c3e0: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5c3e8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5c3f0: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5c3f8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5c400: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5c408: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c410: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5c418: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   5c420: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   5c428: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   5c430: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   5c438: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   5c440: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5c448: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   5c450: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5c458: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c460: 07 01 00 00 d0 fa ff ff      	add64 r1, -0x530
   5c468: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c470: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   5c478: 85 10 00 00 15 31 01 00      	call 0x13115
   5c480: 79 a1 d0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x530]
   5c488: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   5c490: 05 00 94 00 00 00 00 00      	ja +0x94 <LBB226_44>

000000000005c498 <LBB226_34>:
   5c498: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c4a0: 07 01 00 00 20 fa ff ff      	add64 r1, -0x5e0
   5c4a8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5c4b0: 85 10 00 00 9b 36 01 00      	call 0x1369b
   5c4b8: 79 a3 28 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5d8]
   5c4c0: 79 a2 20 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e0]
   5c4c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c4d0: 07 01 00 00 10 fa ff ff      	add64 r1, -0x5f0
   5c4d8: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   5c4e8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5c4f0: 85 10 00 00 b9 4a ff ff      	call -0xb547
   5c4f8: 79 a1 10 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5f0]
   5c500: 79 a2 18 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e8]

000000000005c508 <LBB226_35>:
   5c508: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5c510: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5c518: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2

000000000005c520 <LBB226_36>:
   5c520: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   5c528: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c530: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   5c538: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB226_38>
   5c540: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   5c548: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c550: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

000000000005c558 <LBB226_38>:
   5c558: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   5c560: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c568: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   5c570: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB226_40>
   5c578: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   5c580: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c588: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

000000000005c590 <LBB226_40>:
   5c590: 95 00 00 00 00 00 00 00      	exit

000000000005c598 <LBB226_41>:
   5c598: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c5a0: 07 01 00 00 40 fa ff ff      	add64 r1, -0x5c0
   5c5a8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   5c5b0: 85 10 00 00 7b 36 01 00      	call 0x1367b
   5c5b8: 79 a3 48 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5b8]
   5c5c0: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]
   5c5c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c5d0: 07 01 00 00 30 fa ff ff      	add64 r1, -0x5d0
   5c5d8: 18 04 00 00 0b ea 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10ea0b
   5c5e8: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   5c5f0: 85 10 00 00 99 4a ff ff      	call -0xb567
   5c5f8: 79 a4 68 f9 00 00 00 00      	ldxdw r4, [r10 - 0x698]
   5c600: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   5c608: 79 a1 30 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5d0]
   5c610: 79 a2 38 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c8]
   5c618: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5c620: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5c628: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   5c630: 05 00 75 00 00 00 00 00      	ja +0x75 <LBB226_49>

000000000005c638 <LBB226_42>:
   5c638: 79 a1 08 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f8]
   5c640: 79 a1 10 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f0]
   5c648: 79 a1 18 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e8]
   5c650: 79 a1 20 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e0]
   5c658: 79 a1 28 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d8]
   5c660: 79 a2 b8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x648]
   5c668: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5c670: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   5c678: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5c680: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5c688: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5c690: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   5c698: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c6a0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   5c6a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c6b0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   5c6b8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   5c6c0: 18 01 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e58f
   5c6d0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   5c6d8: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   5c6e0: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   5c6e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c6f0: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5c6f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c700: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   5c708: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   5c710: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   5c718: 85 10 00 00 be 45 01 00      	call 0x145be
   5c720: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   5c728: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   5c730: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5c738: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   5c740: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   5c748: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   5c750: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   5c758: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   5c760: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   5c768: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   5c770: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   5c778: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   5c780: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   5c788: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5c790: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5c798: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5c7a0: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5c7a8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5c7b0: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5c7b8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c7c0: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5c7c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c7d0: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5c7d8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5c7e0: 07 02 00 00 a0 ff ff ff      	add64 r2, -0x60
   5c7e8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5c7f0: 85 10 00 00 61 5d 01 00      	call 0x15d61
   5c7f8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5c800: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5c808: 15 00 49 00 00 00 00 00      	jeq r0, 0x0, +0x49 <LBB226_53>
   5c810: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c818: 07 01 00 00 c0 fa ff ff      	add64 r1, -0x540
   5c820: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5c828: 85 10 00 00 2c 36 01 00      	call 0x1362c
   5c830: 79 a3 c8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x538]
   5c838: 79 a2 c0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x540]
   5c840: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c848: 07 01 00 00 b0 fa ff ff      	add64 r1, -0x550
   5c850: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5c860: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5c868: 85 10 00 00 4a 4a ff ff      	call -0xb5b6
   5c870: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   5c878: 79 a2 b0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x550]
   5c880: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   5c888: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5c890: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   5c898: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5c8a0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5c8a8: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5c8b0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c8b8: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5c8c0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   5c8c8: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   5c8d0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   5c8d8: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   5c8e0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   5c8e8: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5c8f0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   5c8f8: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5c900: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5c908: 07 01 00 00 a0 fa ff ff      	add64 r1, -0x560
   5c910: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5c918: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   5c920: 85 10 00 00 80 30 01 00      	call 0x13080
   5c928: 79 a1 a0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x560]
   5c930: 79 a2 a8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x558]

000000000005c938 <LBB226_44>:
   5c938: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5c940: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5c948: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   5c950: 79 a7 38 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6c8]

000000000005c958 <LBB226_45>:
   5c958: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   5c960: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c968: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   5c970: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   5c978: 79 a4 68 f9 00 00 00 00      	ldxdw r4, [r10 - 0x698]
   5c980: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   5c988: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB226_47>
   5c990: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   5c998: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c9a0: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1

000000000005c9a8 <LBB226_47>:
   5c9a8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5c9b0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c9b8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5c9c0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB226_49>
   5c9c8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5c9d0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c9d8: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

000000000005c9e0 <LBB226_49>:
   5c9e0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   5c9e8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5c9f0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   5c9f8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB226_51>
   5ca00: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   5ca08: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5ca10: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1

000000000005ca18 <LBB226_51>:
   5ca18: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5ca20: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5ca28: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   5ca30: 55 01 5d ff 00 00 00 00      	jne r1, 0x0, -0xa3 <LBB226_36>
   5ca38: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   5ca40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5ca48: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1
   5ca50: 05 00 59 ff 00 00 00 00      	ja -0xa7 <LBB226_36>

000000000005ca58 <LBB226_53>:
   5ca58: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   5ca60: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   5ca68: 15 01 4f 00 00 00 00 00      	jeq r1, 0x0, +0x4f <LBB226_56>
   5ca70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ca78: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5ca80: 18 02 00 00 80 40 11 00 00 00 00 00 00 00 00 00      	lddw r2, 0x114080
   5ca90: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   5ca98: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   5caa0: 85 10 00 00 4d 45 01 00      	call 0x1454d
   5caa8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   5cab0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   5cab8: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   5cac0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5cac8: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   5cad0: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   5cad8: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   5cae0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   5cae8: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   5caf0: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   5caf8: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   5cb00: 79 a2 30 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d0]
   5cb08: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   5cb10: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5cb18: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   5cb20: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5cb28: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5cb30: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5cb38: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5cb40: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5cb48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cb50: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   5cb58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cb60: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   5cb68: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   5cb70: 85 10 00 00 f1 5c 01 00      	call 0x15cf1
   5cb78: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   5cb80: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   5cb88: 79 a7 38 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6c8]
   5cb90: 15 00 39 00 00 00 00 00      	jeq r0, 0x0, +0x39 <LBB226_57>
   5cb98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cba0: 07 01 00 00 90 fa ff ff      	add64 r1, -0x570
   5cba8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   5cbb0: 85 10 00 00 bb 35 01 00      	call 0x135bb
   5cbb8: 79 a3 98 fa 00 00 00 00      	ldxdw r3, [r10 - 0x568]
   5cbc0: 79 a2 90 fa 00 00 00 00      	ldxdw r2, [r10 - 0x570]
   5cbc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cbd0: 07 01 00 00 80 fa ff ff      	add64 r1, -0x580
   5cbd8: 18 04 00 00 fc e9 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e9fc
   5cbe8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   5cbf0: 85 10 00 00 d9 49 ff ff      	call -0xb627
   5cbf8: 79 a3 88 fa 00 00 00 00      	ldxdw r3, [r10 - 0x578]
   5cc00: 79 a2 80 fa 00 00 00 00      	ldxdw r2, [r10 - 0x580]
   5cc08: 79 a4 30 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6d0]
   5cc10: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   5cc18: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   5cc20: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   5cc28: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   5cc30: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   5cc38: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   5cc40: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   5cc48: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   5cc50: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   5cc58: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   5cc60: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   5cc68: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   5cc70: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   5cc78: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   5cc80: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   5cc88: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   5cc90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cc98: 07 01 00 00 70 fa ff ff      	add64 r1, -0x590
   5cca0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   5cca8: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   5ccb0: 85 10 00 00 0e 30 01 00      	call 0x1300e
   5ccb8: 79 a1 70 fa 00 00 00 00      	ldxdw r1, [r10 - 0x590]
   5ccc0: 79 a2 78 fa 00 00 00 00      	ldxdw r2, [r10 - 0x588]
   5ccc8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   5ccd0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5ccd8: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   5cce0: 05 00 8e ff 00 00 00 00      	ja -0x72 <LBB226_45>

000000000005cce8 <LBB226_56>:
   5cce8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5ccf0: 07 01 00 00 60 fa ff ff      	add64 r1, -0x5a0
   5ccf8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   5cd00: 85 10 00 00 91 35 01 00      	call 0x13591
   5cd08: 79 a3 68 fa 00 00 00 00      	ldxdw r3, [r10 - 0x598]
   5cd10: 79 a2 60 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a0]
   5cd18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5cd20: 07 01 00 00 50 fa ff ff      	add64 r1, -0x5b0
   5cd28: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   5cd38: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   5cd40: 85 10 00 00 af 49 ff ff      	call -0xb651
   5cd48: 79 a1 50 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b0]
   5cd50: 79 a2 58 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a8]
   5cd58: 05 00 7b ff 00 00 00 00      	ja -0x85 <LBB226_44>

000000000005cd60 <LBB226_57>:
   5cd60: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5cd68: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   5cd70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cd78: 07 02 00 00 20 fd ff ff      	add64 r2, -0x2e0
   5cd80: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   5cd88: 85 10 00 00 a5 5c 01 00      	call 0x15ca5
   5cd90: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   5cd98: 07 01 00 00 30 02 00 00      	add64 r1, 0x230
   5cda0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5cda8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   5cdb0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   5cdb8: 85 10 00 00 9f 5c 01 00      	call 0x15c9f
   5cdc0: 69 a1 2c ff 00 00 00 00      	ldxh r1, [r10 - 0xd4]
   5cdc8: 61 a2 28 ff 00 00 00 00      	ldxw r2, [r10 - 0xd8]
   5cdd0: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   5cdd8: 73 36 79 02 00 00 00 00      	stxb [r6 + 0x279], r3
   5cde0: 79 a3 90 f9 00 00 00 00      	ldxdw r3, [r10 - 0x670]
   5cde8: 73 36 a8 02 00 00 00 00      	stxb [r6 + 0x2a8], r3
   5cdf0: 79 a3 98 f9 00 00 00 00      	ldxdw r3, [r10 - 0x668]
   5cdf8: 73 36 a9 02 00 00 00 00      	stxb [r6 + 0x2a9], r3
   5ce00: 79 a3 a0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x660]
   5ce08: 73 36 aa 02 00 00 00 00      	stxb [r6 + 0x2aa], r3
   5ce10: 79 a3 e8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x718]
   5ce18: 73 36 d8 02 00 00 00 00      	stxb [r6 + 0x2d8], r3
   5ce20: 79 a3 f0 f8 00 00 00 00      	ldxdw r3, [r10 - 0x710]
   5ce28: 73 36 d9 02 00 00 00 00      	stxb [r6 + 0x2d9], r3
   5ce30: 79 a3 f8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x708]
   5ce38: 73 36 da 02 00 00 00 00      	stxb [r6 + 0x2da], r3
   5ce40: 79 a3 08 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f8]
   5ce48: 73 36 08 03 00 00 00 00      	stxb [r6 + 0x308], r3
   5ce50: 79 a3 10 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f0]
   5ce58: 73 36 09 03 00 00 00 00      	stxb [r6 + 0x309], r3
   5ce60: 79 a3 28 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d8]
   5ce68: 73 36 0a 03 00 00 00 00      	stxb [r6 + 0x30a], r3
   5ce70: 79 a3 18 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e8]
   5ce78: 7b 36 00 03 00 00 00 00      	stxdw [r6 + 0x300], r3
   5ce80: 79 a3 20 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e0]
   5ce88: 7b 36 f8 02 00 00 00 00      	stxdw [r6 + 0x2f8], r3
   5ce90: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   5ce98: 7b 36 f0 02 00 00 00 00      	stxdw [r6 + 0x2f0], r3
   5cea0: 7b 76 e8 02 00 00 00 00      	stxdw [r6 + 0x2e8], r7
   5cea8: 79 a3 d8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x728]
   5ceb0: 7b 36 e0 02 00 00 00 00      	stxdw [r6 + 0x2e0], r3
   5ceb8: 79 a3 00 f9 00 00 00 00      	ldxdw r3, [r10 - 0x700]
   5cec0: 7b 36 d0 02 00 00 00 00      	stxdw [r6 + 0x2d0], r3
   5cec8: 79 a3 e0 f8 00 00 00 00      	ldxdw r3, [r10 - 0x720]
   5ced0: 7b 36 c8 02 00 00 00 00      	stxdw [r6 + 0x2c8], r3
   5ced8: 79 a3 68 f9 00 00 00 00      	ldxdw r3, [r10 - 0x698]
   5cee0: 7b 36 c0 02 00 00 00 00      	stxdw [r6 + 0x2c0], r3
   5cee8: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   5cef0: 7b 36 b8 02 00 00 00 00      	stxdw [r6 + 0x2b8], r3
   5cef8: 79 a3 30 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d0]
   5cf00: 7b 36 b0 02 00 00 00 00      	stxdw [r6 + 0x2b0], r3
   5cf08: 79 a3 a8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x658]
   5cf10: 7b 36 a0 02 00 00 00 00      	stxdw [r6 + 0x2a0], r3
   5cf18: 79 a3 b0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x650]
   5cf20: 7b 36 98 02 00 00 00 00      	stxdw [r6 + 0x298], r3
   5cf28: 7b 96 90 02 00 00 00 00      	stxdw [r6 + 0x290], r9
   5cf30: 7b 86 88 02 00 00 00 00      	stxdw [r6 + 0x288], r8
   5cf38: 79 a3 b8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x648]
   5cf40: 7b 36 80 02 00 00 00 00      	stxdw [r6 + 0x280], r3
   5cf48: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   5cf50: 7b 36 28 02 00 00 00 00      	stxdw [r6 + 0x228], r3
   5cf58: 79 a3 58 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6a8]
   5cf60: 7b 36 20 02 00 00 00 00      	stxdw [r6 + 0x220], r3
   5cf68: 79 a3 78 f9 00 00 00 00      	ldxdw r3, [r10 - 0x688]
   5cf70: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   5cf78: 79 a3 70 f9 00 00 00 00      	ldxdw r3, [r10 - 0x690]
   5cf80: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   5cf88: 79 a3 88 f9 00 00 00 00      	ldxdw r3, [r10 - 0x678]
   5cf90: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   5cf98: 63 26 7a 02 00 00 00 00      	stxw [r6 + 0x27a], r2
   5cfa0: 6b 16 7e 02 00 00 00 00      	stxh [r6 + 0x27e], r1
   5cfa8: 05 00 bc fe 00 00 00 00      	ja -0x144 <LBB226_40>
