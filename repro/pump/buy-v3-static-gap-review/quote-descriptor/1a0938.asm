
/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/evidence/original/pump/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000001572b8 <custom_panic>:
  1a0938: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  1a0940: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
  1a0948: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
  1a0950: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
  1a0958: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  1a0960: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
  1a0968: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a0970: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
  1a0978: 85 10 00 00 ff ff ff ff      	call -0x1
  1a0980: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a0988: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
  1a0990: 55 00 0c 00 00 00 00 00      	jne r0, 0x0, +0xc <custom_panic+0x49740>
  1a0998: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
  1a09a0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
  1a09a8: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  1a09b0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
  1a09b8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  1a09c0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
  1a09c8: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
  1a09d0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  1a09d8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
  1a09e0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  1a09e8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  1a09f0: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0x49758>
  1a09f8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
  1a0a00: 85 10 00 00 10 06 00 00      	call 0x610
  1a0a08: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  1a0a10: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  1a0a18: 95 00 00 00 00 00 00 00      	exit
