05f470: 79 a1 58 f5 00 00 00 00       	ldxdw r1, [r10 - 0xaa8]
05f478: 79 11 58 00 00 00 00 00       	ldxdw r1, [r1 + 0x58]
05f480: 79 11 00 00 00 00 00 00       	ldxdw r1, [r1 + 0x0]
05f488: 79 12 18 00 00 00 00 00       	ldxdw r2, [r1 + 0x18]
05f490: 7b 2a c8 ff 00 00 00 00       	stxdw [r10 - 0x38], r2
05f498: 79 12 10 00 00 00 00 00       	ldxdw r2, [r1 + 0x10]
05f4a0: 7b 2a c0 ff 00 00 00 00       	stxdw [r10 - 0x40], r2
05f4a8: 79 12 08 00 00 00 00 00       	ldxdw r2, [r1 + 0x8]
05f4b0: 7b 2a b8 ff 00 00 00 00       	stxdw [r10 - 0x48], r2
05f4b8: 79 11 00 00 00 00 00 00       	ldxdw r1, [r1 + 0x0]
05f4c0: 7b 1a b0 ff 00 00 00 00       	stxdw [r10 - 0x50], r1
05f4c8: 79 a1 18 f5 00 00 00 00       	ldxdw r1, [r10 - 0xae8]
05f4d0: 7b 1a c0 f5 00 00 00 00       	stxdw [r10 - 0xa40], r1
05f4d8: 79 a1 c0 f5 00 00 00 00       	ldxdw r1, [r10 - 0xa40]
05f4e0: 79 12 00 00 00 00 00 00       	ldxdw r2, [r1 + 0x0]
05f4e8: bf a6 00 00 00 00 00 00       	mov64 r6, r10
05f4f0: 07 06 00 00 d0 ff ff ff       	add64 r6, -0x30
05f4f8: bf 61 00 00 00 00 00 00       	mov64 r1, r6
05f500: 85 10 00 00 ee 62 ff ff       	call -0x9d12 ; target 0x10c78
05f508: 79 a2 c8 ff 00 00 00 00       	ldxdw r2, [r10 - 0x38]
05f510: 79 a1 a0 f5 00 00 00 00       	ldxdw r1, [r10 - 0xa60]
05f518: 7b 21 18 00 00 00 00 00       	stxdw [r1 + 0x18], r2
05f520: 79 a2 c0 ff 00 00 00 00       	ldxdw r2, [r10 - 0x40]
05f528: 7b 21 10 00 00 00 00 00       	stxdw [r1 + 0x10], r2
05f530: 79 a2 b8 ff 00 00 00 00       	ldxdw r2, [r10 - 0x48]
05f538: 7b 21 08 00 00 00 00 00       	stxdw [r1 + 0x8], r2
05f540: 79 a2 b0 ff 00 00 00 00       	ldxdw r2, [r10 - 0x50]
05f548: 7b 21 00 00 00 00 00 00       	stxdw [r1 + 0x0], r2
05f550: 79 a2 80 f5 00 00 00 00       	ldxdw r2, [r10 - 0xa80]
05f558: 7b 21 28 00 00 00 00 00       	stxdw [r1 + 0x28], r2
05f560: 79 a2 90 f5 00 00 00 00       	ldxdw r2, [r10 - 0xa70]
05f568: 7b 21 20 00 00 00 00 00       	stxdw [r1 + 0x20], r2
05f570: 07 01 00 00 30 00 00 00       	add64 r1, 0x30
05f578: bf 62 00 00 00 00 00 00       	mov64 r2, r6
05f580: b7 03 00 00 30 00 00 00       	mov64 r3, 0x30
05f588: 85 10 00 00 10 a8 02 00       	call 0x2a810 ; target 0x1b3610
05f590: 79 a1 48 f8 00 00 00 00       	ldxdw r1, [r10 - 0x7b8]
05f598: 79 a2 40 f8 00 00 00 00       	ldxdw r2, [r10 - 0x7c0]
05f5a0: 79 23 00 00 00 00 00 00       	ldxdw r3, [r2 + 0x0]
05f5a8: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
05f5b0: 7b 32 00 00 00 00 00 00       	stxdw [r2 + 0x0], r3
05f5b8: 55 03 03 00 00 00 00 00       	jne r3, 0x0, +0x3 <.text+0x5f4b8> ; branch 0x5f5d8
05f5c0: 79 23 08 00 00 00 00 00       	ldxdw r3, [r2 + 0x8]
05f5c8: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
05f5d0: 7b 32 08 00 00 00 00 00       	stxdw [r2 + 0x8], r3
05f5d8: 79 12 00 00 00 00 00 00       	ldxdw r2, [r1 + 0x0]
05f5e0: 07 02 00 00 ff ff ff ff       	add64 r2, -0x1
05f5e8: 7b 21 00 00 00 00 00 00       	stxdw [r1 + 0x0], r2
05f5f0: 55 02 03 00 00 00 00 00       	jne r2, 0x0, +0x3 <.text+0x5f4f0> ; branch 0x5f610
05f5f8: 79 12 08 00 00 00 00 00       	ldxdw r2, [r1 + 0x8]
05f600: 07 02 00 00 ff ff ff ff       	add64 r2, -0x1
05f608: 7b 21 08 00 00 00 00 00       	stxdw [r1 + 0x8], r2
05f610: 79 a1 18 f8 00 00 00 00       	ldxdw r1, [r10 - 0x7e8]
05f618: 79 a2 10 f8 00 00 00 00       	ldxdw r2, [r10 - 0x7f0]
05f620: 79 23 00 00 00 00 00 00       	ldxdw r3, [r2 + 0x0]
05f628: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
05f630: 7b 32 00 00 00 00 00 00       	stxdw [r2 + 0x0], r3
05f638: 55 03 03 00 00 00 00 00       	jne r3, 0x0, +0x3 <.text+0x5f538> ; branch 0x5f658
05f640: 79 23 08 00 00 00 00 00       	ldxdw r3, [r2 + 0x8]
05f648: 07 03 00 00 ff ff ff ff       	add64 r3, -0x1
05f650: 7b 32 08 00 00 00 00 00       	stxdw [r2 + 0x8], r3
05f658: 79 12 00 00 00 00 00 00       	ldxdw r2, [r1 + 0x0]
05f660: 07 02 00 00 ff ff ff ff       	add64 r2, -0x1
05f668: 7b 21 00 00 00 00 00 00       	stxdw [r1 + 0x0], r2
05f670: 55 02 1e f8 00 00 00 00       	jne r2, 0x0, -0x7e2 <.text+0x5b648> ; branch 0x5b768
05f678: 79 12 08 00 00 00 00 00       	ldxdw r2, [r1 + 0x8]
05f680: 07 02 00 00 ff ff ff ff       	add64 r2, -0x1
05f688: 7b 21 08 00 00 00 00 00       	stxdw [r1 + 0x8], r2
05f690: 05 00 1a f8 00 00 00 00       	ja -0x7e6 <.text+0x5b648> ; branch 0x5b768
05f698: bf a1 00 00 00 00 00 00       	mov64 r1, r10
05f6a0: 07 01 00 00 48 f6 ff ff       	add64 r1, -0x9b8
05f6a8: bf a2 00 00 00 00 00 00       	mov64 r2, r10
05f6b0: 07 02 00 00 68 fc ff ff       	add64 r2, -0x398
05f6b8: 85 10 00 00 9f 78 02 00       	call 0x2789f ; target 0x19bbb8
