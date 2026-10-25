
evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
  106e38: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  106e40: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
  106e48: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
  106e50: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
  106e58: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
  106e60: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
  106e68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  106e70: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
  106e78: 85 10 00 00 ff ff ff ff      	call -0x1
  106e80: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  106e88: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
  106e90: 55 00 0c 00 00 00 00 00      	jne r0, 0x0, +0xc <custom_panic+0x18a48>
  106e98: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
  106ea0: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
  106ea8: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  106eb0: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
  106eb8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  106ec0: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
  106ec8: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
  106ed0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
  106ed8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
  106ee0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  106ee8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  106ef0: 05 00 03 00 00 00 00 00      	ja +0x3 <custom_panic+0x18a60>
  106ef8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
  106f00: 85 10 00 00 0c 06 00 00      	call 0x60c
  106f08: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  106f10: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
  106f18: 95 00 00 00 00 00 00 00      	exit
