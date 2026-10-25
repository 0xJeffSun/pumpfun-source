
/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/evidence/original/pump/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000001572b8 <custom_panic>:
  17c3d8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
  17c3e0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
  17c3e8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  17c3f0: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  17c3f8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  17c400: 15 04 02 00 00 00 00 00      	jeq r4, 0x0, +0x2 <custom_panic+0x25160>
  17c408: 69 72 10 00 00 00 00 00      	ldxh r2, [r7 + 0x10]
  17c410: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <custom_panic+0x25178>
  17c418: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
  17c420: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
  17c428: 95 00 00 00 00 00 00 00      	exit
  17c430: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17c438: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
  17c440: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
  17c448: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
  17c450: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  17c458: 85 10 00 00 2d 72 00 00      	call 0x722d
  17c460: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  17c468: 79 a3 f8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x8]
  17c470: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  17c478: 25 03 01 00 0f 27 00 00      	jgt r3, 0x270f, +0x1 <custom_panic+0x251d0>
  17c480: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  17c488: 79 a4 f0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x10]
  17c490: 25 04 01 00 f0 d8 ff ff      	jgt r4, -0x2710, +0x1 <custom_panic+0x251e8>
  17c498: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  17c4a0: 15 03 01 00 0f 27 00 00      	jeq r3, 0x270f, +0x1 <custom_panic+0x251f8>
  17c4a8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
  17c4b0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
  17c4b8: 55 02 eb ff 00 00 00 00      	jne r2, 0x0, -0x15 <custom_panic+0x25160>
  17c4c0: bf 42 00 00 00 00 00 00      	mov64 r2, r4
  17c4c8: 07 02 00 00 0f 27 00 00      	add64 r2, 0x270f
  17c4d0: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  17c4d8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  17c4e0: ad 42 01 00 00 00 00 00      	jlt r2, r4, +0x1 <custom_panic+0x25238>
  17c4e8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  17c4f0: 0f 13 00 00 00 00 00 00      	add64 r3, r1
  17c4f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  17c500: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
  17c508: b7 04 00 00 10 27 00 00      	mov64 r4, 0x2710
  17c510: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  17c518: 85 10 00 00 6d 6f 00 00      	call 0x6f6d
  17c520: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
  17c528: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
  17c530: ad 21 dc ff 00 00 00 00      	jlt r1, r2, -0x24 <custom_panic+0x25160>
  17c538: bf 21 00 00 00 00 00 00      	mov64 r1, r2
  17c540: 05 00 da ff 00 00 00 00      	ja -0x26 <custom_panic+0x25160>
