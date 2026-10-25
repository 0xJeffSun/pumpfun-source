   3ecf0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   3ecf8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   3ed00: a5 01 42 00 c8 09 00 00      	jlt r1, 0x9c8, +0x42 <.text+0x3edf8> ; branch 0x3ef18
   3ed08: a5 01 01 00 e1 0f 00 00      	jlt r1, 0xfe1, +0x1 <.text+0x3ebf8> ; branch 0x3ed18
   3ed10: 05 00 50 00 00 00 00 00      	ja +0x50 <.text+0x3ee78> ; branch 0x3ef98
   3ed18: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   3ed20: 71 34 00 00 00 00 00 00      	ldxb r4, [r3 + 0x0]
   3ed28: 7b 4a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r4
   3ed30: 79 37 07 00 00 00 00 00      	ldxdw r7, [r3 + 0x7]
   3ed38: 71 34 0f 00 00 00 00 00      	ldxb r4, [r3 + 0xf]
   3ed40: 73 4a f0 ff 00 00 00 00      	stxb [r10 - 0x10], r4
   3ed48: 61 34 01 00 00 00 00 00      	ldxw r4, [r3 + 0x1]
   3ed50: 63 4a e0 ff 00 00 00 00      	stxw [r10 - 0x20], r4
   3ed58: 69 34 05 00 00 00 00 00      	ldxh r4, [r3 + 0x5]
   3ed60: 6b 4a e4 ff 00 00 00 00      	stxh [r10 - 0x1c], r4
   3ed68: 7b 7a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r7
   3ed70: 79 a4 e9 ff 00 00 00 00      	ldxdw r4, [r10 - 0x17]
   3ed78: 7b 4a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r4
   3ed80: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
   3ed88: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   3ed90: 79 34 18 00 00 00 00 00      	ldxdw r4, [r3 + 0x18]
   3ed98: 7b 4a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r4
   3eda0: 71 34 20 00 00 00 00 00      	ldxb r4, [r3 + 0x20]
   3eda8: 73 4a d8 ff 00 00 00 00      	stxb [r10 - 0x28], r4
   3edb0: 07 01 00 00 c7 ff ff ff      	add64 r1, -0x39
   3edb8: 79 38 21 00 00 00 00 00      	ldxdw r8, [r3 + 0x21]
   3edc0: 79 34 29 00 00 00 00 00      	ldxdw r4, [r3 + 0x29]
   3edc8: 7b 4a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r4
   3edd0: 79 34 31 00 00 00 00 00      	ldxdw r4, [r3 + 0x31]
   3edd8: 7b 4a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r4
   3ede0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   3ede8: 07 03 00 00 39 00 00 00      	add64 r3, 0x39
   3edf0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   3edf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3ee00: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   3ee08: 85 10 00 00 d3 a1 ff ff      	call -0x5e2d ; target 0xfca8
   3ee10: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   3ee18: 79 a9 e8 ff 00 00 00 00      	ldxdw r9, [r10 - 0x18]
   3ee20: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   3ee30: 1d 19 66 00 00 00 00 00      	jeq r9, r1, +0x66 <.text+0x3f048> ; branch 0x3f168
   3ee38: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   3ee40: 69 a3 e4 ff 00 00 00 00      	ldxh r3, [r10 - 0x1c]
   3ee48: 6b 36 34 00 00 00 00 00      	stxh [r6 + 0x34], r3
   3ee50: 61 a3 e0 ff 00 00 00 00      	ldxw r3, [r10 - 0x20]
   3ee58: 63 36 30 00 00 00 00 00      	stxw [r6 + 0x30], r3
   3ee60: 79 a3 d0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x30]
   3ee68: 7b 36 47 00 00 00 00 00      	stxdw [r6 + 0x47], r3
   3ee70: 71 a3 d8 ff 00 00 00 00      	ldxb r3, [r10 - 0x28]
   3ee78: 73 36 4f 00 00 00 00 00      	stxb [r6 + 0x4f], r3
   3ee80: 79 a3 c8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x38]
   3ee88: 79 a4 50 ff 00 00 00 00      	ldxdw r4, [r10 - 0xb0]
   3ee90: 73 46 80 00 00 00 00 00      	stxb [r6 + 0x80], r4
   3ee98: 79 a4 48 ff 00 00 00 00      	ldxdw r4, [r10 - 0xb8]
   3eea0: 7b 46 37 00 00 00 00 00      	stxdw [r6 + 0x37], r4
   3eea8: 7b 86 50 00 00 00 00 00      	stxdw [r6 + 0x50], r8
   3eeb0: 79 a4 40 ff 00 00 00 00      	ldxdw r4, [r10 - 0xc0]
   3eeb8: 7b 46 58 00 00 00 00 00      	stxdw [r6 + 0x58], r4
   3eec0: 79 a4 38 ff 00 00 00 00      	ldxdw r4, [r10 - 0xc8]
   3eec8: 7b 46 60 00 00 00 00 00      	stxdw [r6 + 0x60], r4
   3eed0: 73 76 36 00 00 00 00 00      	stxb [r6 + 0x36], r7
   3eed8: 7b 36 3f 00 00 00 00 00      	stxdw [r6 + 0x3f], r3
   3eee0: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   3eee8: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   3eef0: 7a 06 18 00 00 00 00 00      	stdw [r6 + 0x18], 0x0
   3eef8: 7a 06 20 00 08 00 00 00      	stdw [r6 + 0x20], 0x8
   3ef00: 7a 06 28 00 00 00 00 00      	stdw [r6 + 0x28], 0x0
   3ef08: 7a 06 68 00 00 00 00 00      	stdw [r6 + 0x68], 0x0
   3ef10: 05 00 4f 00 00 00 00 00      	ja +0x4f <.text+0x3f070> ; branch 0x3f190
   3ef18: 18 01 00 00 03 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7ffffffffffffffd
   3ef28: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   3ef30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3ef38: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   3ef40: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   3ef48: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   3ef50: 85 10 00 00 74 dc 00 00      	call 0xdc74 ; target 0xad2f8
   3ef58: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   3ef60: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
   3ef68: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   3ef70: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   3ef78: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   3ef88: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   3ef90: 05 00 af 00 00 00 00 00      	ja +0xaf <.text+0x3f3f0> ; branch 0x3f510
   3ef98: a5 01 01 00 f9 0f 00 00      	jlt r1, 0xff9, +0x1 <.text+0x3ee88> ; branch 0x3efa8
   3efa0: 05 00 41 00 00 00 00 00      	ja +0x41 <.text+0x3f090> ; branch 0x3f1b0
   3efa8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   3efb0: 71 34 00 00 00 00 00 00      	ldxb r4, [r3 + 0x0]
   3efb8: 7b 4a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r4
   3efc0: 79 35 07 00 00 00 00 00      	ldxdw r5, [r3 + 0x7]
   3efc8: 71 34 0f 00 00 00 00 00      	ldxb r4, [r3 + 0xf]
   3efd0: 73 4a f0 ff 00 00 00 00      	stxb [r10 - 0x10], r4
   3efd8: 61 34 01 00 00 00 00 00      	ldxw r4, [r3 + 0x1]
   3efe0: 63 4a e0 ff 00 00 00 00      	stxw [r10 - 0x20], r4
   3efe8: 69 34 05 00 00 00 00 00      	ldxh r4, [r3 + 0x5]
   3eff0: 6b 4a e4 ff 00 00 00 00      	stxh [r10 - 0x1c], r4
   3eff8: 7b 5a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r5
   3f000: 7b 5a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r5
   3f008: 79 a4 e9 ff 00 00 00 00      	ldxdw r4, [r10 - 0x17]
   3f010: 7b 4a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r4
   3f018: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
   3f020: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   3f028: 79 34 18 00 00 00 00 00      	ldxdw r4, [r3 + 0x18]
   3f030: 7b 4a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r4
   3f038: 71 34 20 00 00 00 00 00      	ldxb r4, [r3 + 0x20]
   3f040: 73 4a d8 ff 00 00 00 00      	stxb [r10 - 0x28], r4
   3f048: 07 01 00 00 c7 ff ff ff      	add64 r1, -0x39
   3f050: 79 34 21 00 00 00 00 00      	ldxdw r4, [r3 + 0x21]
   3f058: 7b 4a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r4
   3f060: 79 34 29 00 00 00 00 00      	ldxdw r4, [r3 + 0x29]
   3f068: 7b 4a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r4
   3f070: 79 34 31 00 00 00 00 00      	ldxdw r4, [r3 + 0x31]
   3f078: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   3f080: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   3f088: 07 03 00 00 39 00 00 00      	add64 r3, 0x39
   3f090: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   3f098: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f0a0: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   3f0a8: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   3f0b0: 85 10 00 00 7e a1 ff ff      	call -0x5e82 ; target 0xfca8
   3f0b8: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   3f0c0: 79 a9 e8 ff 00 00 00 00      	ldxdw r9, [r10 - 0x18]
   3f0c8: 18 07 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r7, -0x8000000000000000
   3f0d8: 1d 79 52 00 00 00 00 00      	jeq r9, r7, +0x52 <.text+0x3f250> ; branch 0x3f370
   3f0e0: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   3f0e8: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   3f0f0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   3f0f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f100: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   3f108: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   3f110: 85 10 00 00 72 a1 ff ff      	call -0x5e8e ; target 0xfca8
   3f118: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   3f120: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   3f128: 1d 71 01 00 00 00 00 00      	jeq r1, r7, +0x1 <.text+0x3f018> ; branch 0x3f138
   3f130: 05 00 59 00 00 00 00 00      	ja +0x59 <.text+0x3f2e0> ; branch 0x3f400
   3f138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f140: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   3f148: 85 10 00 00 49 dc 00 00      	call 0xdc49 ; target 0xad398
   3f150: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   3f158: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   3f160: 05 00 c0 ff 00 00 00 00      	ja -0x40 <.text+0x3ee48> ; branch 0x3ef68
   3f168: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f170: 07 01 00 00 68 ff ff ff      	add64 r1, -0x98
   3f178: 85 10 00 00 43 dc 00 00      	call 0xdc43 ; target 0xad398
   3f180: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   3f188: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   3f190: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   3f198: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   3f1a0: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
   3f1a8: 05 00 6c 00 00 00 00 00      	ja +0x6c <.text+0x3f3f0> ; branch 0x3f510
   3f1b0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   3f1b8: 71 34 00 00 00 00 00 00      	ldxb r4, [r3 + 0x0]
   3f1c0: 7b 4a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r4
   3f1c8: 79 35 07 00 00 00 00 00      	ldxdw r5, [r3 + 0x7]
   3f1d0: 71 34 0f 00 00 00 00 00      	ldxb r4, [r3 + 0xf]
   3f1d8: 73 4a f0 ff 00 00 00 00      	stxb [r10 - 0x10], r4
   3f1e0: 61 34 01 00 00 00 00 00      	ldxw r4, [r3 + 0x1]
   3f1e8: 63 4a e0 ff 00 00 00 00      	stxw [r10 - 0x20], r4
   3f1f0: 69 34 05 00 00 00 00 00      	ldxh r4, [r3 + 0x5]
   3f1f8: 6b 4a e4 ff 00 00 00 00      	stxh [r10 - 0x1c], r4
   3f200: 7b 5a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r5
   3f208: 7b 5a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r5
   3f210: 79 a4 e9 ff 00 00 00 00      	ldxdw r4, [r10 - 0x17]
   3f218: 7b 4a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r4
   3f220: 79 34 10 00 00 00 00 00      	ldxdw r4, [r3 + 0x10]
   3f228: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
   3f230: 79 34 18 00 00 00 00 00      	ldxdw r4, [r3 + 0x18]
   3f238: 7b 4a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r4
   3f240: 71 34 20 00 00 00 00 00      	ldxb r4, [r3 + 0x20]
   3f248: 73 4a d8 ff 00 00 00 00      	stxb [r10 - 0x28], r4
   3f250: 07 01 00 00 c7 ff ff ff      	add64 r1, -0x39
   3f258: 79 34 21 00 00 00 00 00      	ldxdw r4, [r3 + 0x21]
   3f260: 7b 4a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r4
   3f268: 79 34 29 00 00 00 00 00      	ldxdw r4, [r3 + 0x29]
   3f270: 7b 4a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r4
   3f278: 79 34 31 00 00 00 00 00      	ldxdw r4, [r3 + 0x31]
   3f280: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   3f288: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   3f290: 07 03 00 00 39 00 00 00      	add64 r3, 0x39
   3f298: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   3f2a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f2a8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   3f2b0: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   3f2b8: 85 10 00 00 3d a1 ff ff      	call -0x5ec3 ; target 0xfca8
   3f2c0: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   3f2c8: 79 a7 e8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x18]
   3f2d0: 18 09 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r9, -0x8000000000000000
   3f2e0: 1d 97 1a 00 00 00 00 00      	jeq r7, r9, +0x1a <.text+0x3f298> ; branch 0x3f3b8
   3f2e8: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   3f2f0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   3f2f8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   3f300: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f308: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   3f310: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   3f318: 85 10 00 00 31 a1 ff ff      	call -0x5ecf ; target 0xfca8
   3f320: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
   3f328: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   3f330: 1d 91 01 00 00 00 00 00      	jeq r1, r9, +0x1 <.text+0x3f220> ; branch 0x3f340
   3f338: 05 00 3b 00 00 00 00 00      	ja +0x3b <.text+0x3f3f8> ; branch 0x3f518
   3f340: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f348: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   3f350: 85 10 00 00 08 dc 00 00      	call 0xdc08 ; target 0xad398
   3f358: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   3f360: 79 a2 b0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x50]
   3f368: 05 00 7f ff 00 00 00 00      	ja -0x81 <.text+0x3ee48> ; branch 0x3ef68
   3f370: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f378: 07 01 00 00 78 ff ff ff      	add64 r1, -0x88
   3f380: 85 10 00 00 02 dc 00 00      	call 0xdc02 ; target 0xad398
   3f388: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   3f390: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   3f398: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   3f3a0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   3f3a8: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   3f3b0: 05 00 2b 00 00 00 00 00      	ja +0x2b <.text+0x3f3f0> ; branch 0x3f510
   3f3b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f3c0: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   3f3c8: 85 10 00 00 f9 db 00 00      	call 0xdbf9 ; target 0xad398
   3f3d0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   3f3d8: 79 a2 a0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x60]
   3f3e0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   3f3e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   3f3f0: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
   3f3f8: 05 00 22 00 00 00 00 00      	ja +0x22 <.text+0x3f3f0> ; branch 0x3f510
   3f400: 79 a3 f8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x8]
   3f408: 69 a4 e4 ff 00 00 00 00      	ldxh r4, [r10 - 0x1c]
   3f410: 6b 46 34 00 00 00 00 00      	stxh [r6 + 0x34], r4
   3f418: 61 a4 e0 ff 00 00 00 00      	ldxw r4, [r10 - 0x20]
   3f420: 63 46 30 00 00 00 00 00      	stxw [r6 + 0x30], r4
   3f428: 79 a4 d0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x30]
   3f430: 7b 46 47 00 00 00 00 00      	stxdw [r6 + 0x47], r4
   3f438: 71 a4 d8 ff 00 00 00 00      	ldxb r4, [r10 - 0x28]
   3f440: 73 46 4f 00 00 00 00 00      	stxb [r6 + 0x4f], r4
   3f448: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
   3f450: 7b 96 00 00 00 00 00 00      	stxdw [r6 + 0x0], r9
   3f458: 79 a5 20 ff 00 00 00 00      	ldxdw r5, [r10 - 0xe0]
   3f460: 7b 56 08 00 00 00 00 00      	stxdw [r6 + 0x8], r5
   3f468: 79 a5 18 ff 00 00 00 00      	ldxdw r5, [r10 - 0xe8]
   3f470: 7b 56 10 00 00 00 00 00      	stxdw [r6 + 0x10], r5
   3f478: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
   3f480: 7b 26 20 00 00 00 00 00      	stxdw [r6 + 0x20], r2
   3f488: 7b 36 28 00 00 00 00 00      	stxdw [r6 + 0x28], r3
   3f490: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   3f498: 7b 16 37 00 00 00 00 00      	stxdw [r6 + 0x37], r1
   3f4a0: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   3f4a8: 7b 16 50 00 00 00 00 00      	stxdw [r6 + 0x50], r1
   3f4b0: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   3f4b8: 7b 16 58 00 00 00 00 00      	stxdw [r6 + 0x58], r1
   3f4c0: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   3f4c8: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   3f4d0: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   3f4d8: 73 16 36 00 00 00 00 00      	stxb [r6 + 0x36], r1
   3f4e0: 7b 46 3f 00 00 00 00 00      	stxdw [r6 + 0x3f], r4
   3f4e8: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   3f4f0: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   3f4f8: 7a 06 68 00 00 00 00 00      	stdw [r6 + 0x68], 0x0
   3f500: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   3f508: 73 16 80 00 00 00 00 00      	stxb [r6 + 0x80], r1
   3f510: 95 00 00 00 00 00 00 00      	exit
   3f518: 79 80 08 00 00 00 00 00      	ldxdw r0, [r8 + 0x8]
   3f520: a5 00 14 00 08 00 00 00      	jlt r0, 0x8, +0x14 <.text+0x3f4a8> ; branch 0x3f5c8
   3f528: 79 a3 f8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x8]
   3f530: 79 85 00 00 00 00 00 00      	ldxdw r5, [r8 + 0x0]
   3f538: 79 54 00 00 00 00 00 00      	ldxdw r4, [r5 + 0x0]
   3f540: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   3f548: 07 09 00 00 08 00 00 00      	add64 r9, 0x8
   3f550: 7b 98 00 00 00 00 00 00      	stxdw [r8 + 0x0], r9
   3f558: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   3f560: 07 09 00 00 f8 ff ff ff      	add64 r9, -0x8
   3f568: 7b 98 08 00 00 00 00 00      	stxdw [r8 + 0x8], r9
   3f570: a5 09 0a 00 08 00 00 00      	jlt r9, 0x8, +0xa <.text+0x3f4a8> ; branch 0x3f5c8
   3f578: 79 59 08 00 00 00 00 00      	ldxdw r9, [r5 + 0x8]
   3f580: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   3f588: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   3f590: 07 09 00 00 10 00 00 00      	add64 r9, 0x10
   3f598: 7b 98 00 00 00 00 00 00      	stxdw [r8 + 0x0], r9
   3f5a0: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   3f5a8: 07 09 00 00 f0 ff ff ff      	add64 r9, -0x10
   3f5b0: 7b 98 08 00 00 00 00 00      	stxdw [r8 + 0x8], r9
   3f5b8: a5 09 01 00 08 00 00 00      	jlt r9, 0x8, +0x1 <.text+0x3f4a8> ; branch 0x3f5c8
   3f5c0: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x3f4f8> ; branch 0x3f618
   3f5c8: 18 01 00 00 e0 87 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc87e0
   3f5d8: 85 10 00 00 8c f2 00 00      	call 0xf28c ; target 0xb8a40
   3f5e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   3f5e8: 07 01 00 00 b8 ff ff ff      	add64 r1, -0x48
   3f5f0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   3f5f8: 85 10 00 00 b3 db 00 00      	call 0xdbb3 ; target 0xad398
   3f600: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   3f608: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
   3f610: 05 00 2a ff 00 00 00 00      	ja -0xd6 <.text+0x3ee48> ; branch 0x3ef68
   3f618: 07 00 00 00 e8 ff ff ff      	add64 r0, -0x18
   3f620: 79 59 10 00 00 00 00 00      	ldxdw r9, [r5 + 0x10]
   3f628: 7b 08 08 00 00 00 00 00      	stxdw [r8 + 0x8], r0
   3f630: 07 05 00 00 18 00 00 00      	add64 r5, 0x18
   3f638: 7b 58 00 00 00 00 00 00      	stxdw [r8 + 0x0], r5
   3f640: 69 a5 e4 ff 00 00 00 00      	ldxh r5, [r10 - 0x1c]
   3f648: 6b 56 34 00 00 00 00 00      	stxh [r6 + 0x34], r5
   3f650: 61 a5 e0 ff 00 00 00 00      	ldxw r5, [r10 - 0x20]
   3f658: 63 56 30 00 00 00 00 00      	stxw [r6 + 0x30], r5
   3f660: 79 a5 c8 ff 00 00 00 00      	ldxdw r5, [r10 - 0x38]
   3f668: 7b 56 3f 00 00 00 00 00      	stxdw [r6 + 0x3f], r5
   3f670: 79 a5 d0 ff 00 00 00 00      	ldxdw r5, [r10 - 0x30]
   3f678: 7b 56 47 00 00 00 00 00      	stxdw [r6 + 0x47], r5
   3f680: 71 a5 d8 ff 00 00 00 00      	ldxb r5, [r10 - 0x28]
   3f688: 73 56 4f 00 00 00 00 00      	stxb [r6 + 0x4f], r5
   3f690: 79 a5 48 ff 00 00 00 00      	ldxdw r5, [r10 - 0xb8]
   3f698: 73 56 80 00 00 00 00 00      	stxb [r6 + 0x80], r5
   3f6a0: 7b 96 78 00 00 00 00 00      	stxdw [r6 + 0x78], r9
   3f6a8: 79 a5 10 ff 00 00 00 00      	ldxdw r5, [r10 - 0xf0]
   3f6b0: 7b 56 70 00 00 00 00 00      	stxdw [r6 + 0x70], r5
   3f6b8: 7b 46 68 00 00 00 00 00      	stxdw [r6 + 0x68], r4
   3f6c0: 79 a4 28 ff 00 00 00 00      	ldxdw r4, [r10 - 0xd8]
   3f6c8: 7b 46 60 00 00 00 00 00      	stxdw [r6 + 0x60], r4
   3f6d0: 79 a4 30 ff 00 00 00 00      	ldxdw r4, [r10 - 0xd0]
   3f6d8: 7b 46 58 00 00 00 00 00      	stxdw [r6 + 0x58], r4
   3f6e0: 79 a4 38 ff 00 00 00 00      	ldxdw r4, [r10 - 0xc8]
   3f6e8: 7b 46 50 00 00 00 00 00      	stxdw [r6 + 0x50], r4
   3f6f0: 79 a4 40 ff 00 00 00 00      	ldxdw r4, [r10 - 0xc0]
   3f6f8: 7b 46 37 00 00 00 00 00      	stxdw [r6 + 0x37], r4
   3f700: 79 a4 50 ff 00 00 00 00      	ldxdw r4, [r10 - 0xb0]
   3f708: 73 46 36 00 00 00 00 00      	stxb [r6 + 0x36], r4
   3f710: 7b 36 28 00 00 00 00 00      	stxdw [r6 + 0x28], r3
   3f718: 7b 26 20 00 00 00 00 00      	stxdw [r6 + 0x20], r2
   3f720: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
   3f728: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   3f730: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   3f738: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   3f740: 05 00 8b ff 00 00 00 00      	ja -0x75 <.text+0x3f280> ; branch 0x3f3a0
