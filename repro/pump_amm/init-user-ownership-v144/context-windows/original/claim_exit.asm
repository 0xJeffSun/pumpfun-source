
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   cc2a0: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   cc2a8: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   cc2b0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   cc2b8: 79 89 a0 00 00 00 00 00      	ldxdw r9, [r8 + 0xa0]
   cc2c0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   cc2c8: 07 01 00 00 80 00 00 00      	add64 r1, 0x80
   cc2d0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   cc2d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   cc2e0: 85 10 00 00 bf 9a 00 00      	call 0x9abf
   cc2e8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   cc2f0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   cc2f8: 55 00 1b 00 00 00 00 00      	jne r0, 0x0, +0x1b <.text+0xcc2b8>
   cc300: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   cc308: 85 10 00 00 87 6d 00 00      	call 0x6d87
   cc310: 55 00 18 00 00 00 00 00      	jne r0, 0x0, +0x18 <.text+0xcc2b8>
   cc318: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc320: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   cc328: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   cc330: 85 10 00 00 dc 79 00 00      	call 0x79dc
   cc338: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   cc340: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   cc348: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   cc358: 5d 32 04 00 00 00 00 00      	jne r2, r3, +0x4 <.text+0xcc260>
   cc360: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   cc368: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   cc370: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   cc378: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0xcc2b8>
   cc380: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   cc388: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   cc390: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
   cc398: 7b 2a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r2
   cc3a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc3a8: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   cc3b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cc3b8: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   cc3c0: 85 10 00 00 8f 6d 00 00      	call 0x6d8f
   cc3c8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   cc3d0: 55 02 3c 00 02 00 00 00      	jne r2, 0x2, +0x3c <.text+0xcc498>
   cc3d8: 79 89 78 01 00 00 00 00      	ldxdw r9, [r8 + 0x178]
   cc3e0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   cc3e8: 07 01 00 00 58 01 00 00      	add64 r1, 0x158
   cc3f0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   cc3f8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   cc400: 85 10 00 00 9b 9a 00 00      	call 0x9a9b
   cc408: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   cc410: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   cc418: 55 00 1c 00 00 00 00 00      	jne r0, 0x0, +0x1c <.text+0xcc3e0>
   cc420: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   cc428: 85 10 00 00 63 6d 00 00      	call 0x6d63
   cc430: 55 00 19 00 00 00 00 00      	jne r0, 0x0, +0x19 <.text+0xcc3e0>
   cc438: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc440: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   cc448: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   cc450: 85 10 00 00 b8 79 00 00      	call 0x79b8
   cc458: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   cc460: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   cc468: 18 03 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r3, -0x7fffffffffffffe6
   cc478: 5d 32 04 00 00 00 00 00      	jne r2, r3, +0x4 <.text+0xcc380>
   cc480: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   cc488: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   cc490: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   cc498: 05 00 0c 00 00 00 00 00      	ja +0xc <.text+0xcc3e0>
   cc4a0: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   cc4a8: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   cc4b0: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
   cc4b8: 7b 2a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r2
   cc4c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc4c8: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   cc4d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   cc4d8: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   cc4e0: 85 10 00 00 6b 6d 00 00      	call 0x6d6b
   cc4e8: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   cc4f0: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0xcc3e0>
   cc4f8: 05 00 21 00 00 00 00 00      	ja +0x21 <.text+0xcc4e8>
   cc500: 07 08 00 00 90 02 00 00      	add64 r8, 0x290
   cc508: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc510: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   cc518: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   cc520: 18 03 00 00 3e e5 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x11e53e
   cc530: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   cc538: 85 10 00 00 6f 70 fe ff      	call -0x18f91
   cc540: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   cc548: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   cc550: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <.text+0xcc480>
   cc558: 79 a3 a0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x60]
   cc560: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc568: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   cc570: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   cc580: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   cc588: 85 10 00 00 fd 6a fe ff      	call -0x19503
   cc590: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   cc598: 79 a3 88 ff 00 00 00 00      	ldxdw r3, [r10 - 0x78]
   cc5a0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   cc5a8: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   cc5b0: 95 00 00 00 00 00 00 00      	exit
   cc5b8: 79 a3 e0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x20]
   cc5c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc5c8: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   cc5d0: 18 04 00 00 f6 c5 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c5f6
   cc5e0: b7 05 00 00 08 00 00 00      	mov64 r5, 0x8
   cc5e8: 85 10 00 00 f1 6a fe ff      	call -0x1950f
   cc5f0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
   cc5f8: 79 a3 c8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x38]
   cc600: 05 00 f3 ff 00 00 00 00      	ja -0xd <.text+0xcc480>
   cc608: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
   cc610: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cc618: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   cc620: 18 04 00 00 df e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0df
   cc630: b7 05 00 00 1e 00 00 00      	mov64 r5, 0x1e
   cc638: 85 10 00 00 e7 6a fe ff      	call -0x19519
   cc640: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   cc648: 79 a3 a8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x58]
   cc650: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0xcc480>
