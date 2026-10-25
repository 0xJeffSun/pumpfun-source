
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f41b8 <_ZN107_$LT$anchor_lang..error..Error$u20$as$u20$core..convert..From$LT$solana_program_error..ProgramError$GT$$GT$4from17h601239ccb49b5123E>:
   f41b8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   f41c0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   f41c8: b7 01 00 00 80 00 00 00      	mov64 r1, 0x80
   f41d0: b7 02 00 00 08 00 00 00      	mov64 r2, 0x8
   f41d8: 85 10 00 00 e8 b1 ff ff      	call -0x4e18
   f41e0: 55 00 03 00 00 00 00 00      	jne r0, 0x0, +0x3 <LBB69_2>
   f41e8: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   f41f0: b7 02 00 00 80 00 00 00      	mov64 r2, 0x80
   f41f8: 85 10 00 00 b7 1d 00 00      	call 0x1db7

00000000000f4200 <LBB69_2>:
   f4200: 7a 00 00 00 02 00 00 00      	stdw [r0 + 0x0], 0x2
   f4208: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   f4210: 7b 10 20 00 00 00 00 00      	stxdw [r0 + 0x20], r1
   f4218: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   f4220: 7b 10 28 00 00 00 00 00      	stxdw [r0 + 0x28], r1
   f4228: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   f4230: 7b 10 30 00 00 00 00 00      	stxdw [r0 + 0x30], r1
   f4238: 72 00 38 00 02 00 00 00      	stb [r0 + 0x38], 0x2
   f4240: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
   f4248: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1
   f4250: 95 00 00 00 00 00 00 00      	exit
