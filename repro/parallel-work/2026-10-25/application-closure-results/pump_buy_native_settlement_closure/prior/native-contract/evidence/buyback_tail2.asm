   5a010: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5a018: 73 1a ca fe 00 00 00 00      	stxb [r10 - 0x136], r1
   5a020: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   5a028: 73 1a c9 fe 00 00 00 00      	stxb [r10 - 0x137], r1
   5a030: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   5a038: 73 1a c8 fe 00 00 00 00      	stxb [r10 - 0x138], r1
   5a040: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5a048: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   5a050: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   5a058: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   5a060: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   5a068: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   5a070: 7b 6a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r6
   5a078: 7b 9a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r9
   5a080: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5a088: 07 01 00 00 48 ff ff ff      	add64 r1, -0xb8
   5a090: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5a098: 07 02 00 00 60 ff ff ff      	add64 r2, -0xa0
   5a0a0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   5a0a8: 07 03 00 00 a0 fe ff ff      	add64 r3, -0x160
   5a0b0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   5a0b8: 85 10 00 00 89 8c 02 00      	call 0x28c89
   5a0c0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   5a0d0: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   5a0d8: 79 a8 20 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1e0]
   5a0e0: 5d 12 11 00 00 00 00 00      	jne r2, r1, +0x11 <.text+0x5a050>
   5a0e8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   5a0f0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5a0f8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   5a100: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x5a000>
   5a108: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   5a110: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5a118: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   5a120: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   5a128: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   5a130: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5a138: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   5a140: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x5a040>
   5a148: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   5a150: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   5a158: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   5a160: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   5a168: 05 00 c4 ff 00 00 00 00      	ja -0x3c <.text+0x59e70>
   5a170: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   5a178: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   5a180: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   5a188: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   5a190: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   5a198: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   5a1a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5a1a8: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   5a1b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5a1b8: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   5a1c0: 85 10 00 00 3e 83 02 00      	call 0x2833e
   5a1c8: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   5a1d0: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   5a1d8: 79 a3 b0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x150]
   5a1e0: 79 a4 a8 fe 00 00 00 00      	ldxdw r4, [r10 - 0x158]
   5a1e8: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   5a1f0: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   5a1f8: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   5a200: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x5a100>
   5a208: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   5a210: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   5a218: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
   5a220: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   5a228: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   5a230: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   5a238: 55 04 aa ff 00 00 00 00      	jne r4, 0x0, -0x56 <.text+0x59e70>
   5a240: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   5a248: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   5a250: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   5a258: 05 00 a6 ff 00 00 00 00      	ja -0x5a <.text+0x59e70>
