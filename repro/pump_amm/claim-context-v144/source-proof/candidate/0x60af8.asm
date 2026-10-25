
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/formatter-restoration-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000060af8 <_ZN98_$LT$pump_amm_recovered..incentives..ClaimTokenIncentives$u20$as$u20$anchor_lang..AccountsExit$GT$4exit17h57ddbe89f2c9539fE>:
   60af8: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   60b00: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   60b08: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   60b10: 79 89 a0 00 00 00 00 00      	ldxdw r9, [r8 + 0xa0]
   60b18: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   60b20: 07 01 00 00 80 00 00 00      	add64 r1, 0x80
   60b28: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   60b30: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   60b38: 85 10 00 00 22 53 01 00      	call 0x15322
   60b40: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   60b48: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   60b50: 55 00 1b 00 00 00 00 00      	jne r0, 0x0, +0x1b <LBB237_5>
   60b58: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   60b60: 85 10 00 00 11 26 01 00      	call 0x12611
   60b68: 55 00 18 00 00 00 00 00      	jne r0, 0x0, +0x18 <LBB237_5>
   60b70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60b78: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   60b80: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   60b88: 85 10 00 00 8e 31 01 00      	call 0x1318e
   60b90: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   60b98: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   60ba0: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   60bb0: 5d 32 04 00 00 00 00 00      	jne r2, r3, +0x4 <LBB237_4>
   60bb8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   60bc0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   60bc8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   60bd0: 05 00 0b 00 00 00 00 00      	ja +0xb <LBB237_5>

0000000000060bd8 <LBB237_4>:
   60bd8: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   60be0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   60be8: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
   60bf0: 7b 2a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r2
   60bf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60c00: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   60c08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60c10: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   60c18: 85 10 00 00 19 26 01 00      	call 0x12619
   60c20: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   60c28: 55 02 3c 00 02 00 00 00      	jne r2, 0x2, +0x3c <LBB237_11>

0000000000060c30 <LBB237_5>:
   60c30: 79 89 78 01 00 00 00 00      	ldxdw r9, [r8 + 0x178]
   60c38: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   60c40: 07 01 00 00 58 01 00 00      	add64 r1, 0x158
   60c48: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   60c50: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   60c58: 85 10 00 00 fe 52 01 00      	call 0x152fe
   60c60: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   60c68: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   60c70: 55 00 1c 00 00 00 00 00      	jne r0, 0x0, +0x1c <LBB237_9>
   60c78: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   60c80: 85 10 00 00 ed 25 01 00      	call 0x125ed
   60c88: 55 00 19 00 00 00 00 00      	jne r0, 0x0, +0x19 <LBB237_9>
   60c90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60c98: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   60ca0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   60ca8: 85 10 00 00 6a 31 01 00      	call 0x1316a
   60cb0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   60cb8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   60cc0: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   60cd0: 5d 32 04 00 00 00 00 00      	jne r2, r3, +0x4 <LBB237_10>
   60cd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   60ce0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   60ce8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   60cf0: 05 00 0c 00 00 00 00 00      	ja +0xc <LBB237_9>

0000000000060cf8 <LBB237_10>:
   60cf8: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   60d00: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   60d08: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
   60d10: 7b 2a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r2
   60d18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60d20: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   60d28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   60d30: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   60d38: 85 10 00 00 f5 25 01 00      	call 0x125f5
   60d40: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   60d48: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <LBB237_9>
   60d50: 05 00 21 00 00 00 00 00      	ja +0x21 <LBB237_12>

0000000000060d58 <LBB237_9>:
   60d58: 07 08 00 00 30 02 00 00      	add64 r8, 0x230
   60d60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60d68: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   60d70: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   60d78: 18 03 00 00 a4 de 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10dea4
   60d88: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   60d90: 85 10 00 00 f8 47 ff ff      	call -0xb808
   60d98: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   60da0: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   60da8: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <LBB237_14>
   60db0: 79 a3 a0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x60]
   60db8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60dc0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   60dc8: 18 04 00 00 df d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d6df
   60dd8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   60de0: 85 10 00 00 9b 41 ff ff      	call -0xbe65
   60de8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   60df0: 79 a3 88 ff 00 00 00 00      	ldxdw r3, [r10 - 0x78]

0000000000060df8 <LBB237_14>:
   60df8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   60e00: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   60e08: 95 00 00 00 00 00 00 00      	exit

0000000000060e10 <LBB237_11>:
   60e10: 79 a3 e0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x20]
   60e18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60e20: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   60e28: 18 04 00 00 0d d6 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10d60d
   60e38: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   60e40: 85 10 00 00 8f 41 ff ff      	call -0xbe71
   60e48: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   60e50: 79 a3 c8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x38]
   60e58: 05 00 f3 ff 00 00 00 00      	ja -0xd <LBB237_14>

0000000000060e60 <LBB237_12>:
   60e60: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
   60e68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   60e70: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   60e78: 18 04 00 00 d7 dc 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10dcd7
   60e88: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   60e90: 85 10 00 00 85 41 ff ff      	call -0xbe7b
   60e98: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   60ea0: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   60ea8: 05 00 e9 ff 00 00 00 00      	ja -0x17 <LBB237_14>
