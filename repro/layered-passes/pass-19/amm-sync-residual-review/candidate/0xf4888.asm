
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f4888 <_ZN107_$LT$anchor_lang..error..Error$u20$as$u20$core..convert..From$LT$solana_program_error..ProgramError$GT$$GT$4from17h601239ccb49b5123E>:
   f4888: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   f4890: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   f4898: b7 01 00 00 80 00 00 00      	mov64 r1, 0x80
   f48a0: b7 02 00 00 08 00 00 00      	mov64 r2, 0x8
   f48a8: 85 10 00 00 e8 b1 ff ff      	call -0x4e18
   f48b0: 55 00 03 00 00 00 00 00      	jne r0, 0x0, +0x3 <LBB69_2>
   f48b8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   f48c0: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   f48c8: 85 10 00 00 b7 1d 00 00      	call 0x1db7

00000000000f48d0 <LBB69_2>:
   f48d0: 7a 00 00 00 02 00 00 00      	stdw [r0 + 0x0], 0x2
   f48d8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   f48e0: 7b 10 20 00 00 00 00 00      	stxdw [r0 + 0x20], r1
   f48e8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   f48f0: 7b 10 28 00 00 00 00 00      	stxdw [r0 + 0x28], r1
   f48f8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   f4900: 7b 10 30 00 00 00 00 00      	stxdw [r0 + 0x30], r1
   f4908: 72 00 38 00 02 00 00 00      	stb [r0 + 0x38], 0x2
   f4910: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   f4918: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   f4920: 95 00 00 00 00 00 00 00      	exit
