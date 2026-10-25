  1862f0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
  1862f8: 18 08 00 00 03 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7ffffffffffffffd
  186308: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
  186310: 15 09 63 00 63 01 00 00      	jeq r9, 0x163, +0x63 <custom_panic+0x2f378>
  186318: a5 09 62 00 52 00 00 00      	jlt r9, 0x52, +0x62 <custom_panic+0x2f378>
  186320: 79 27 00 00 00 00 00 00      	ldxdw r7, [r2 + 0x0]
  186328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  186330: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
  186338: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  186340: b7 03 00 00 52 00 00 00      	mov64 r3, 0x52
  186348: 85 10 00 00 ae 1b 00 00      	call 0x1bae
  186350: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
  186358: 15 02 15 00 02 00 00 00      	jeq r2, 0x2, +0x15 <custom_panic+0x2f150>
  186360: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
  186368: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
  186370: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
  186378: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
  186380: 71 a1 d8 ff 00 00 00 00      	ldxb r1, [r10 - 0x28]
  186388: 73 1a a0 ff 00 00 00 00      	stxb [r10 - 0x60], r1
  186390: 79 a1 da ff 00 00 00 00      	ldxdw r1, [r10 - 0x26]
  186398: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
  1863a0: 79 a1 e2 ff 00 00 00 00      	ldxdw r1, [r10 - 0x1e]
  1863a8: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
  1863b0: 79 a1 ea ff 00 00 00 00      	ldxdw r1, [r10 - 0x16]
  1863b8: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
  1863c0: 79 a1 f2 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe]
  1863c8: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
  1863d0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  1863d8: 7b 1a 86 ff 00 00 00 00      	stxdw [r10 - 0x7a], r1
  1863e0: 71 a3 d9 ff 00 00 00 00      	ldxb r3, [r10 - 0x27]
  1863e8: 55 03 08 00 00 00 00 00      	jne r3, 0x0, +0x8 <custom_panic+0x2f178>
  1863f0: 18 08 00 00 09 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7ffffffffffffff7
  186400: 05 00 44 00 00 00 00 00      	ja +0x44 <custom_panic+0x2f370>
  186408: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
  186410: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
  186418: 79 a7 b8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x48]
  186420: 79 a8 b0 ff 00 00 00 00      	ldxdw r8, [r10 - 0x50]
  186428: 05 00 3f 00 00 00 00 00      	ja +0x3f <custom_panic+0x2f370>
