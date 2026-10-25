
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/formatter-restoration-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000001d50 <_ZN11anchor_lang8accounts12account_info93_$LT$impl$u20$anchor_lang..Accounts$LT$B$GT$$u20$for$u20$solana_account_info..AccountInfo$GT$12try_accounts17h1d4ebc44d5b7916aE>:
    1d50: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    1d58: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
    1d60: 55 01 0a 00 00 00 00 00      	jne r1, 0x0, +0xa <LBB9_2>
    1d68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    1d70: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
    1d78: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
    1d80: 85 10 00 00 ab e9 01 00      	call 0x1e9ab
    1d88: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
    1d90: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
    1d98: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
    1da0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
    1da8: b7 05 00 00 02 00 00 00      	mov64 r5, 0x2
    1db0: 05 00 25 00 00 00 00 00      	ja +0x25 <LBB9_11>

0000000000001db8 <LBB9_2>:
    1db8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
    1dc0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
    1dc8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
    1dd0: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    1dd8: 07 01 00 00 30 00 00 00      	add64 r1, 0x30
    1de0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
    1de8: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
    1df0: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
    1df8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
    1e00: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
    1e08: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB9_4>
    1e10: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

0000000000001e18 <LBB9_4>:
    1e18: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
    1e20: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
    1e28: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB9_6>

0000000000001e30 <LBB9_5>:
    1e30: 85 10 00 00 ff ff ff ff      	call -0x1

0000000000001e38 <LBB9_6>:
    1e38: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
    1e40: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
    1e48: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
    1e50: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
    1e58: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB9_8>
    1e60: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

0000000000001e68 <LBB9_8>:
    1e68: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
    1e70: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB9_10>
    1e78: 05 00 f6 ff 00 00 00 00      	ja -0xa <LBB9_5>

0000000000001e80 <LBB9_10>:
    1e80: 71 35 2a 00 00 00 00 00      	ldxb r5, [r3 + 0x2a]
    1e88: 79 30 18 00 00 00 00 00      	ldxdw r0, [r3 + 0x18]
    1e90: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
    1e98: 71 38 28 00 00 00 00 00      	ldxb r8, [r3 + 0x28]
    1ea0: 71 33 29 00 00 00 00 00      	ldxb r3, [r3 + 0x29]
    1ea8: 73 36 29 00 00 00 00 00      	stxb [r6 + 0x29], r3
    1eb0: 73 86 28 00 00 00 00 00      	stxb [r6 + 0x28], r8
    1eb8: 7b 76 20 00 00 00 00 00      	stxdw [r6 + 0x20], r7
    1ec0: 7b 06 18 00 00 00 00 00      	stxdw [r6 + 0x18], r0
    1ec8: 7b 46 10 00 00 00 00 00      	stxdw [r6 + 0x10], r4
    1ed0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    1ed8: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2

0000000000001ee0 <LBB9_11>:
    1ee0: 73 56 2a 00 00 00 00 00      	stxb [r6 + 0x2a], r5
    1ee8: 95 00 00 00 00 00 00 00      	exit
