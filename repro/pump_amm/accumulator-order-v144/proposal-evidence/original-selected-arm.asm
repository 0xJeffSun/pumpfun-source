
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   dc938: 07 02 00 00 08 00 00 00      	add64 r2, 0x8
   dc940: 7b 2a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r2
   dc948: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
   dc950: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   dc958: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc960: 07 01 00 00 40 fe ff ff      	add64 r1, -0x1c0
   dc968: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   dc970: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dc978: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dc980: bf 64 00 00 00 00 00 00      	mov64 r4, r6
   dc988: 85 10 00 00 b0 13 00 00      	call 0x13b0
