
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000fecd8 <_ZN18solana_instruction11Instruction14new_with_bytes17hc25f8c1d9b23d99dE>:
   fecd8: 7b 5a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r5
   fece0: bf 46 00 00 00 00 00 00      	mov64 r6, r4
   fece8: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   fecf0: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   fecf8: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   fed00: 15 06 0c 00 00 00 00 00      	jeq r6, 0x0, +0xc <LBB12_4>
   fed08: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
   fed10: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   fed18: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   fed20: c5 06 1f 00 00 00 00 00      	jslt r6, 0x0, +0x1f <LBB12_5>
   fed28: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   fed30: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   fed38: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   fed40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fed48: 85 10 00 00 54 9d ff ff      	call -0x62ac
   fed50: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   fed58: 15 08 18 00 00 00 00 00      	jeq r8, 0x0, +0x18 <LBB12_5>
   fed60: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]

00000000000fed68 <LBB12_4>:
   fed68: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   fed70: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   fed78: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   fed80: 85 10 00 00 44 18 00 00      	call 0x1844
   fed88: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   fed90: 7b 17 30 00 00 00 00 00      	stxdw [r7 + 0x30], r1
   fed98: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   feda0: 7b 17 38 00 00 00 00 00      	stxdw [r7 + 0x38], r1
   feda8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   fedb0: 7b 17 40 00 00 00 00 00      	stxdw [r7 + 0x40], r1
   fedb8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   fedc0: 7b 17 48 00 00 00 00 00      	stxdw [r7 + 0x48], r1
   fedc8: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   fedd0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   fedd8: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
   fede0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   fede8: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   fedf0: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   fedf8: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   fee00: 7b 87 20 00 00 00 00 00      	stxdw [r7 + 0x20], r8
   fee08: 7b 67 18 00 00 00 00 00      	stxdw [r7 + 0x18], r6
   fee10: 7b 67 28 00 00 00 00 00      	stxdw [r7 + 0x28], r6
   fee18: 95 00 00 00 00 00 00 00      	exit

00000000000fee20 <LBB12_5>:
   fee20: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   fee28: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   fee30: 85 10 00 00 07 09 00 00      	call 0x907
