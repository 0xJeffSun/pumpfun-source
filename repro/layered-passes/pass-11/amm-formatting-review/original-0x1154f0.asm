
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
  1154f0: 79 14 20 00 00 00 00 00      	ldxdw r4, [r1 + 0x20]
  1154f8: 79 11 28 00 00 00 00 00      	ldxdw r1, [r1 + 0x28]
  115500: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
  115508: bf 41 00 00 00 00 00 00      	mov64 r1, r4
  115510: 8d 00 00 00 05 00 00 00      	callx r5
  115518: 95 00 00 00 00 00 00 00      	exit
