   9eaf0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9eaf8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9eb00: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9ea88>
   9eb08: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9eb10: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9eb18: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9eb20: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9eb28: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9eb30: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9eb38: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9eb40: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9eb48: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9ea38>
   9eb50: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9eaf0>
   9eb58: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9eb68: 85 10 00 00 5e 14 02 00      	call 0x2145e
   9eb70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9eb78: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   9eb80: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9eb88: 85 10 00 00 19 fa 01 00      	call 0x1fa19
   9eb90: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   9eb98: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9eba0: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9ead0>
   9eba8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ebb8: 85 10 00 00 54 14 02 00      	call 0x21454
   9ebc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ebc8: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   9ebd0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9ebd8: 85 10 00 00 0f fa 01 00      	call 0x1fa0f
   9ebe0: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   9ebe8: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   9ebf0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9ebf8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9ec00: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9ec08: 95 00 00 00 00 00 00 00      	exit
   9ec10: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9ec18: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9ec20: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9ec28: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9ec30: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9ec38: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9ec40: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9ec48: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9eb38>
   9ec50: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9eb88>
   9ec58: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ec68: 85 10 00 00 3e 14 02 00      	call 0x2143e
   9ec70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ec78: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   9ec80: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9ec88: 85 10 00 00 f9 f9 01 00      	call 0x1f9f9
   9ec90: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9ec98: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   9eca0: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9ead0>
   9eca8: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9ecb0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9ecb8: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9ecc0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9ecc8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9ecd0: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9ecd8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9ece0: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9ebd0>
   9ece8: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9ec20>
   9ecf0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ed00: 85 10 00 00 2b 14 02 00      	call 0x2142b
   9ed08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ed10: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   9ed18: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9ed20: 85 10 00 00 e6 f9 01 00      	call 0x1f9e6
   9ed28: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   9ed30: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   9ed38: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9ead0>
   9ed40: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9ed48: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9ed50: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9ed58: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9ed60: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9ed68: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9ed70: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9ed78: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9ec68>
   9ed80: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9ecb8>
   9ed88: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ed98: 85 10 00 00 18 14 02 00      	call 0x21418
   9eda0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9eda8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9edb0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9edb8: 85 10 00 00 d3 f9 01 00      	call 0x1f9d3
   9edc0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   9edc8: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   9edd0: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9ead0>
   9edd8: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9ede0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9ede8: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9edf0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9edf8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9ee00: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9ee08: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9ee10: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9edf8>
   9ee18: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9ee20: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9ee28: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9ee30: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9ee38: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9ee40: 73 4a b7 ff 00 00 00 00      	stxb [r10 - 0x49], r4
   9ee48: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9ee48>
   9ee50: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9ee60: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9ee68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ee70: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9ee78: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   9ee80: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9ee90: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9ee98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9eea0: 07 01 00 00 b7 ff ff ff      	add64 r1, -0x49
   9eea8: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9eeb0: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9eeb8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9eec0: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   9eec8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9eed0: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   9eed8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9eee0: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   9eee8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9eef0: 85 10 00 00 6a 18 02 00      	call 0x2186a
   9eef8: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9ef00: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9ef08: 85 10 00 00 30 d6 fe ff      	call -0x129d0
   9ef10: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9ee10>
   9ef18: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9ef28: 85 10 00 00 e6 13 02 00      	call 0x213e6
   9ef30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ef38: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   9ef40: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9ef48: 85 10 00 00 a1 f9 01 00      	call 0x1f9a1
   9ef50: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   9ef58: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   9ef60: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9ead0>
   9ef68: 7b 0a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r0
   9ef70: 7b 4a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r4
   9ef78: 7b 5a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r5
   9ef80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9ef88: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9ef90: 7b 2a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r2
   9ef98: 85 10 00 00 62 e1 fe ff      	call -0x11e9e
   9efa0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9efa8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9eec8>
   9efb0: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9efb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9efc0: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9efc8: 85 10 00 00 91 f9 01 00      	call 0x1f991
   9efd0: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9efd8: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9efe0: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x9ead0>
   9efe8: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9eff0: 63 1a ab ff 00 00 00 00      	stxw [r10 - 0x55], r1
   9eff8: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9f000: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   9f008: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9f010: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9f018: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9f020: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9f028: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9f030: 73 1a a0 ff 00 00 00 00      	stxb [r10 - 0x60], r1
   9f038: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9f040: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   9f048: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f050: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f058: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f060: 85 10 00 00 00 dc fe ff      	call -0x12400
   9f068: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f070: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9ef90>
   9f078: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9f080: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f088: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9f090: 85 10 00 00 78 f9 01 00      	call 0x1f978
   9f098: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9f0a0: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9f0a8: 05 00 68 ff 00 00 00 00      	ja -0x98 <.text+0x9ead0>
   9f0b0: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   9f0b8: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9f0c0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   9f0c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f0d0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f0d8: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f0e0: 85 10 00 00 f0 db fe ff      	call -0x12410
   9f0e8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f0f0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9f010>
   9f0f8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9f100: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f108: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9f110: 85 10 00 00 68 f9 01 00      	call 0x1f968
   9f118: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9f120: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9f128: 05 00 58 ff 00 00 00 00      	ja -0xa8 <.text+0x9ead0>
   9f130: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   9f138: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9f140: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   9f148: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f150: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f158: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f160: 85 10 00 00 29 e1 fe ff      	call -0x11ed7
   9f168: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f170: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0x9f068>
   9f178: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9f180: 05 00 15 00 00 00 00 00      	ja +0x15 <.text+0x9f110>
   9f188: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   9f190: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9f198: 63 1a b3 ff 00 00 00 00      	stxw [r10 - 0x4d], r1
   9f1a0: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9f1a8: 63 1a b0 ff 00 00 00 00      	stxw [r10 - 0x50], r1
   9f1b0: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9f1b8: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   9f1c0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9f1c8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9f1d0: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9f1d8: 73 1a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r1
   9f1e0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9f1e8: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   9f1f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f1f8: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9f200: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f208: 85 10 00 00 8f db fe ff      	call -0x12471
   9f210: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9f218: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9f220: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
   9f228: 15 01 06 00 00 00 00 00      	jeq r1, 0x0, +0x6 <.text+0x9f140>
   9f230: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f238: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   9f240: 85 10 00 00 42 f9 01 00      	call 0x1f942
   9f248: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   9f250: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9f258: 05 00 32 ff 00 00 00 00      	ja -0xce <.text+0x9ead0>
   9f260: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f268: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f270: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f278: 85 10 00 00 bd db fe ff      	call -0x12443
   9f280: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f288: 55 01 dd ff 00 00 00 00      	jne r1, 0x0, -0x23 <.text+0x9f058>
   9f290: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9f298: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   9f2a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f2a8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9f2b0: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f2b8: 85 10 00 00 b5 db fe ff      	call -0x1244b
   9f2c0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9f2c8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9f1b8>
   9f2d0: 05 00 d4 ff 00 00 00 00      	ja -0x2c <.text+0x9f058>
   9f2d8: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9f2e0: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   9f2e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f2f0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9f2f8: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f300: 85 10 00 00 70 db fe ff      	call -0x12490
   9f308: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9f310: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9f318: 7b 2a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r2
   9f320: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9f210>
   9f328: 05 00 e0 ff 00 00 00 00      	ja -0x20 <.text+0x9f110>
   9f330: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f338: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9f340: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
   9f348: 85 10 00 00 67 db fe ff      	call -0x12499
   9f350: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9f358: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9f360: 55 01 d9 ff 00 00 00 00      	jne r1, 0x0, -0x27 <.text+0x9f110>
   9f368: 61 a1 ab ff 00 00 00 00      	ldxw r1, [r10 - 0x55]
   9f370: 63 16 03 00 00 00 00 00      	stxw [r6 + 0x3], r1
   9f378: 61 a1 a8 ff 00 00 00 00      	ldxw r1, [r10 - 0x58]
   9f380: 63 16 00 00 00 00 00 00      	stxw [r6 + 0x0], r1
   9f388: 71 a1 a0 ff 00 00 00 00      	ldxb r1, [r10 - 0x60]
   9f390: 73 16 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r1
   9f398: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   9f3a0: 7b 16 17 00 00 00 00 00      	stxdw [r6 + 0x17], r1
   9f3a8: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   9f3b0: 7b 16 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r1
   9f3b8: 61 a1 b0 ff 00 00 00 00      	ldxw r1, [r10 - 0x50]
   9f3c0: 63 16 20 00 00 00 00 00      	stxw [r6 + 0x20], r1
   9f3c8: 61 a1 b3 ff 00 00 00 00      	ldxw r1, [r10 - 0x4d]
   9f3d0: 63 16 23 00 00 00 00 00      	stxw [r6 + 0x23], r1
   9f3d8: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   9f3e0: 7b 16 37 00 00 00 00 00      	stxdw [r6 + 0x37], r1
   9f3e8: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   9f3f0: 7b 16 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r1
   9f3f8: 71 a1 c8 ff 00 00 00 00      	ldxb r1, [r10 - 0x38]
   9f400: 79 a3 98 fe 00 00 00 00      	ldxdw r3, [r10 - 0x168]
   9f408: 7b 36 07 00 00 00 00 00      	stxdw [r6 + 0x7], r3
   9f410: 79 a3 80 fe 00 00 00 00      	ldxdw r3, [r10 - 0x180]
   9f418: 7b 36 27 00 00 00 00 00      	stxdw [r6 + 0x27], r3
   9f420: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9f428: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9f430: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9f438: 79 a3 b0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x150]
   9f440: 7b 36 58 00 00 00 00 00      	stxdw [r6 + 0x58], r3
   9f448: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
   9f450: 7b 36 60 00 00 00 00 00      	stxdw [r6 + 0x60], r3
   9f458: 79 a3 78 fe 00 00 00 00      	ldxdw r3, [r10 - 0x188]
   9f460: 7b 36 68 00 00 00 00 00      	stxdw [r6 + 0x68], r3
   9f468: 79 a3 60 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1a0]
   9f470: 7b 36 70 00 00 00 00 00      	stxdw [r6 + 0x70], r3
   9f478: 7b 26 78 00 00 00 00 00      	stxdw [r6 + 0x78], r2
   9f480: 73 16 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r1
   9f488: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9f490: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9f498: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9f4a0: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9f4a8: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   9f4b0: 73 16 9d 00 00 00 00 00      	stxb [r6 + 0x9d], r1
   9f4b8: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
   9f4c0: 73 16 9c 00 00 00 00 00      	stxb [r6 + 0x9c], r1
   9f4c8: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   9f4d0: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9f4d8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   9f4e0: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9f4e8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   9f4f0: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9f4f8: 05 00 e1 fe 00 00 00 00      	ja -0x11f <.text+0x9eae8>
