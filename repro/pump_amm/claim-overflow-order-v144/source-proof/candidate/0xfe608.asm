
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000fe608 <_ZN18solana_instruction11Instruction14new_with_bytes17hc25f8c1d9b23d99dE>:
   fe608: 7b 5a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r5
   fe610: bf 46 00 00 00 00 00 00      	mov64 r6, r4
   fe618: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   fe620: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   fe628: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   fe630: 15 06 0c 00 00 00 00 00      	jeq r6, 0x0, +0xc <LBB12_4>
   fe638: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
   fe640: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   fe648: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   fe650: c5 06 1f 00 00 00 00 00      	jslt r6, 0x0, +0x1f <LBB12_5>
   fe658: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   fe660: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   fe668: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   fe670: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fe678: 85 10 00 00 54 9d ff ff      	call -0x62ac
   fe680: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   fe688: 15 08 18 00 00 00 00 00      	jeq r8, 0x0, +0x18 <LBB12_5>
   fe690: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]

00000000000fe698 <LBB12_4>:
   fe698: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   fe6a0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   fe6a8: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   fe6b0: 85 10 00 00 44 18 00 00      	call 0x1844
   fe6b8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   fe6c0: 7b 17 30 00 00 00 00 00      	stxdw [r7 + 0x30], r1
   fe6c8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   fe6d0: 7b 17 38 00 00 00 00 00      	stxdw [r7 + 0x38], r1
   fe6d8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   fe6e0: 7b 17 40 00 00 00 00 00      	stxdw [r7 + 0x40], r1
   fe6e8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   fe6f0: 7b 17 48 00 00 00 00 00      	stxdw [r7 + 0x48], r1
   fe6f8: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   fe700: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   fe708: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   fe710: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   fe718: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   fe720: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   fe728: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   fe730: 7b 87 20 00 00 00 00 00      	stxdw [r7 + 0x20], r8
   fe738: 7b 67 18 00 00 00 00 00      	stxdw [r7 + 0x18], r6
   fe740: 7b 67 28 00 00 00 00 00      	stxdw [r7 + 0x28], r6
   fe748: 95 00 00 00 00 00 00 00      	exit

00000000000fe750 <LBB12_5>:
   fe750: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   fe758: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   fe760: 85 10 00 00 07 09 00 00      	call 0x907
