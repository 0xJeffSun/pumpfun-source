
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   cf7d0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   cf7d8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   cf7e0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   cf7e8: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   cf7f0: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   cf7f8: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   cf800: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0xcf6f0>
   cf808: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0
   cf810: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   cf818: 7b 51 00 00 00 00 00 00      	stxdw [r1 + 0x0], r5
   cf820: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <.text+0xcf710>
   cf828: 85 10 00 00 ff ff ff ff      	call -0x1
   cf830: 79 35 10 00 00 00 00 00      	ldxdw r5, [r3 + 0x10]
   cf838: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   cf840: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   cf848: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   cf850: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xcf740>
   cf858: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0
   cf860: 7b 05 00 00 00 00 00 00      	stxdw [r5 + 0x0], r0
   cf868: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <.text+0xcf758>
   cf870: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0xcf708>
   cf878: 79 30 18 00 00 00 00 00      	ldxdw r0, [r3 + 0x18]
   cf880: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   cf888: 71 38 28 00 00 00 00 00      	ldxb r8, [r3 + 0x28]
   cf890: 71 39 29 00 00 00 00 00      	ldxb r9, [r3 + 0x29]
   cf898: 71 33 2a 00 00 00 00 00      	ldxb r3, [r3 + 0x2a]
   cf8a0: 73 3a ca ff 00 00 00 00      	stxb [r10 - 0x36], r3
   cf8a8: 73 9a c9 ff 00 00 00 00      	stxb [r10 - 0x37], r9
   cf8b0: 73 8a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r8
   cf8b8: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   cf8c0: 7b 0a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r0
   cf8c8: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   cf8d0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   cf8d8: 7b 4a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r4
   cf8e0: 79 22 08 00 00 00 00 00      	ldxdw r2, [r2 + 0x8]
   cf8e8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   cf8f0: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   cf8f8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   cf900: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   cf908: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xcf7f8>
   cf910: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   cf918: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   cf920: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   cf928: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xcf818>
   cf930: 05 00 de ff 00 00 00 00      	ja -0x22 <.text+0xcf708>
   cf938: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   cf940: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   cf948: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   cf950: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   cf958: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0xcf848>
   cf960: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0
   cf968: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   cf970: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <.text+0xcf860>
   cf978: 05 00 d5 ff 00 00 00 00      	ja -0x2b <.text+0xcf708>
   cf980: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   cf988: 79 20 20 00 00 00 00 00      	ldxdw r0, [r2 + 0x20]
   cf990: 71 27 28 00 00 00 00 00      	ldxb r7, [r2 + 0x28]
   cf998: 71 28 29 00 00 00 00 00      	ldxb r8, [r2 + 0x29]
   cf9a0: 71 22 2a 00 00 00 00 00      	ldxb r2, [r2 + 0x2a]
   cf9a8: 73 2a fa ff 00 00 00 00      	stxb [r10 - 0x6], r2
   cf9b0: 73 8a f9 ff 00 00 00 00      	stxb [r10 - 0x7], r8
   cf9b8: 73 7a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r7
   cf9c0: 7b 0a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r0
   cf9c8: 7b 5a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r5
   cf9d0: 7b 4a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r4
   cf9d8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   cf9e0: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   cf9e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cf9f0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   cf9f8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cfa00: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   cfa08: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   cfa10: 07 03 00 00 a0 ff ff ff      	add64 r3, -0x60
   cfa18: 85 10 00 00 1a 66 00 00      	call 0x661a
   cfa20: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   cfa28: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   cfa30: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <.text+0xcf960>
   cfa38: 79 a3 98 ff 00 00 00 00      	ldxdw r3, [r10 - 0x68]
   cfa40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfa48: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   cfa50: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   cfa60: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   cfa68: 85 10 00 00 61 64 fe ff      	call -0x19b9f
   cfa70: 79 a3 88 ff 00 00 00 00      	ldxdw r3, [r10 - 0x78]
   cfa78: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   cfa80: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   cfa88: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   cfa90: 95 00 00 00 00 00 00 00      	exit
