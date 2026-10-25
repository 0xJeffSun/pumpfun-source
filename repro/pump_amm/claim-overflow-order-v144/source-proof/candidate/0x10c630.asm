
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000010c630 <__udivti3>:
  10c630: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  10c638: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  10c640: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
  10c648: 85 10 00 00 a1 fc ff ff      	call -0x35f
  10c650: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
  10c658: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  10c660: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
  10c668: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  10c670: 95 00 00 00 00 00 00 00      	exit
