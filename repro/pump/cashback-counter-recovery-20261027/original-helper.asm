
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   7bec0: 55 04 10 00 00 00 00 00      	jne r4, 0x0, +0x10 <.text+0x7be28>
   7bec8: 79 25 58 00 00 00 00 00      	ldxdw r5, [r2 + 0x58]
   7bed0: bf 54 00 00 00 00 00 00      	mov64 r4, r5
   7bed8: 0f 34 00 00 00 00 00 00      	add64 r4, r3
   7bee0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   7bee8: ad 54 01 00 00 00 00 00      	jlt r4, r5, +0x1 <.text+0x7bdd8>
   7bef0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   7bef8: 07 02 00 00 58 00 00 00      	add64 r2, 0x58
   7bf00: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   7bf08: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0x7bdf8>
   7bf10: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x7be70>
   7bf18: 18 01 00 00 72 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b7172
   7bf28: b7 02 00 00 29 00 00 00      	mov64 r2, 0x29
   7bf30: 18 03 00 00 28 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdd28
   7bf40: 85 10 00 00 bc 60 02 00      	call 0x260bc
   7bf48: 79 25 48 00 00 00 00 00      	ldxdw r5, [r2 + 0x48]
   7bf50: bf 54 00 00 00 00 00 00      	mov64 r4, r5
   7bf58: 0f 34 00 00 00 00 00 00      	add64 r4, r3
   7bf60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   7bf68: ad 54 01 00 00 00 00 00      	jlt r4, r5, +0x1 <.text+0x7be58>
   7bf70: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   7bf78: 07 02 00 00 48 00 00 00      	add64 r2, 0x48
   7bf80: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   7bf88: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x7be88>
   7bf90: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   7bf98: 7a 01 00 00 02 00 00 00      	stdw [r1 + 0x0], 0x2
   7bfa0: 95 00 00 00 00 00 00 00      	exit
   7bfa8: 18 01 00 00 9b 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b719b
   7bfb8: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   7bfc0: 18 03 00 00 40 dd 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bdd40
   7bfd0: 85 10 00 00 aa 60 02 00      	call 0x260aa
