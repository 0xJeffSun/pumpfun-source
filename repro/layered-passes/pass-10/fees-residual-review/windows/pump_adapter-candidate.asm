
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_fees/v2-caller-v144/symbols.so:	file format elf64-sbf

Disassembly of section .text:

000000000001ab38 <_ZN19pump_fees_candidate14sharing_update26v2_distribute_creator_fees17hfc27bb52953e2974E>:
   1ab38: 79 24 58 01 00 00 00 00      	ldxdw r4, [r2 + 0x158]
   1ab40: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   1ab48: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   1ab50: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   1ab58: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB168_2>
   1ab60: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

000000000001ab68 <LBB168_2>:
   1ab68: 79 26 50 01 00 00 00 00      	ldxdw r6, [r2 + 0x150]
   1ab70: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   1ab78: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB168_4>

000000000001ab80 <LBB168_3>:
   1ab80: 85 10 00 00 ff ff ff ff      	call -0x1

000000000001ab88 <LBB168_4>:
   1ab88: 79 25 60 01 00 00 00 00      	ldxdw r5, [r2 + 0x160]
   1ab90: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   1ab98: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   1aba0: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   1aba8: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB168_6>
   1abb0: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0

000000000001abb8 <LBB168_6>:
   1abb8: 7b 6a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r6
   1abc0: 7b 1a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r1
   1abc8: 7b 05 00 00 00 00 00 00      	stxdw [r5 + 0x0], r0
   1abd0: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <LBB168_8>
   1abd8: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB168_3>

000000000001abe0 <LBB168_8>:
   1abe0: 79 20 68 01 00 00 00 00      	ldxdw r0, [r2 + 0x168]
   1abe8: 79 27 70 01 00 00 00 00      	ldxdw r7, [r2 + 0x170]
   1abf0: 71 28 78 01 00 00 00 00      	ldxb r8, [r2 + 0x178]
   1abf8: 71 29 79 01 00 00 00 00      	ldxb r9, [r2 + 0x179]
   1ac00: 71 26 7a 01 00 00 00 00      	ldxb r6, [r2 + 0x17a]
   1ac08: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   1ac10: 7b 1a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r1
   1ac18: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   1ac20: 79 33 10 00 00 00 00 00      	ldxdw r3, [r3 + 0x10]
   1ac28: 73 6a aa fd 00 00 00 00      	stxb [r10 - 0x256], r6
   1ac30: 73 9a a9 fd 00 00 00 00      	stxb [r10 - 0x257], r9
   1ac38: 73 8a a8 fd 00 00 00 00      	stxb [r10 - 0x258], r8
   1ac40: 7b 7a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r7
   1ac48: 7b 0a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r0
   1ac50: 7b 5a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r5
   1ac58: 7b 4a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r4
   1ac60: 79 a4 48 fd 00 00 00 00      	ldxdw r4, [r10 - 0x2b8]
   1ac68: 7b 4a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r4
   1ac70: 7b 3a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r3
   1ac78: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   1ac80: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   1ac88: 7b 1a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r1
   1ac90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1ac98: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   1aca0: b7 03 00 00 40 02 00 00      	mov64 r3, 0x240
   1aca8: 85 10 00 00 58 44 01 00      	call 0x14458
   1acb0: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   1acb8: 7a 0a f0 ff 08 00 00 00      	stdw [r10 - 0x10], 0x8
   1acc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1acc8: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   1acd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1acd8: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   1ace0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   1ace8: 85 10 00 00 16 82 00 00      	call 0x8216
   1acf0: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   1acf8: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   1ad00: 79 a3 50 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b0]
   1ad08: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   1ad10: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   1ad18: 95 00 00 00 00 00 00 00      	exit
