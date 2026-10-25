
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000f7fb0 <_ZN13solana_sysvar5clock71_$LT$impl$u20$solana_sysvar..Sysvar$u20$for$u20$solana_clock..Clock$GT$3get17h44abaf5fc0c8e420E>:
   f7fb0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   f7fb8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   f7fc0: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   f7fc8: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
   f7fd0: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   f7fd8: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
   f7fe0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   f7fe8: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   f7ff0: 85 10 00 00 ff ff ff ff      	call -0x1
   f7ff8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   f8000: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   f8008: 55 00 0c 00 00 00 00 00      	jne r0, 0x0, +0xc <LBB14_2>
   f8010: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   f8018: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   f8020: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   f8028: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   f8030: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   f8038: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   f8040: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
   f8048: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   f8050: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   f8058: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   f8060: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   f8068: 05 00 03 00 00 00 00 00      	ja +0x3 <LBB14_3>

00000000000f8070 <LBB14_2>:
   f8070: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   f8078: 85 10 00 00 34 05 00 00      	call 0x534
   f8080: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1

00000000000f8088 <LBB14_3>:
   f8088: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   f8090: 95 00 00 00 00 00 00 00      	exit
