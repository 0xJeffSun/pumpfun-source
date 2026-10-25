
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   10608: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   10610: 55 03 0c 00 00 00 00 00      	jne r3, 0x0, +0xc <.text+0x10558>
   10618: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   10620: 07 02 00 00 f0 ff ff ff      	add64 r2, -0x10
   10628: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   10630: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   10638: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   10640: 85 10 00 00 fe ea 01 00      	call 0x1eafe
   10648: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   10650: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   10658: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   10660: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   10668: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
   10670: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0x10598>
   10678: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   10680: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   10688: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   10690: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   10698: 07 04 00 00 30 00 00 00      	add64 r4, 0x30
   106a0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   106a8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   106b0: 85 10 00 00 56 eb ff ff      	call -0x14aa
   106b8: 95 00 00 00 00 00 00 00      	exit
