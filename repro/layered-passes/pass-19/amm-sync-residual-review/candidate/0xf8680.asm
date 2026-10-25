
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f8680 <_ZN13solana_sysvar5clock71_$LT$impl$u20$solana_sysvar..Sysvar$u20$for$u20$solana_clock..Clock$GT$3get17h44abaf5fc0c8e420E>:
   f8680: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   f8688: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   f8690: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   f8698: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
   f86a0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   f86a8: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
   f86b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f86b8: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   f86c0: 85 10 00 00 ff ff ff ff      	call -0x1
   f86c8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   f86d0: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   f86d8: 55 00 0c 00 00 00 00 00      	jne r0, 0x0, +0xc <LBB14_2>
   f86e0: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   f86e8: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   f86f0: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   f86f8: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   f8700: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f8708: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   f8710: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
   f8718: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f8720: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   f8728: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f8730: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   f8738: 05 00 03 00 00 00 00 00      	ja +0x3 <LBB14_3>

00000000000f8740 <LBB14_2>:
   f8740: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   f8748: 85 10 00 00 34 05 00 00      	call 0x534
   f8750: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1

00000000000f8758 <LBB14_3>:
   f8758: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   f8760: 95 00 00 00 00 00 00 00      	exit
