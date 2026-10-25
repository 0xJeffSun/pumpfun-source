    d068: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    d070: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
    d078: 15 03 0d 00 00 00 00 00      	jeq r3, 0x0, +0xd <.text+0xcfc8>
    d080: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
    d088: 79 24 00 00 00 00 00 00      	ldxdw r4, [r2 + 0x0]
    d090: 71 41 00 00 00 00 00 00      	ldxb r1, [r4 + 0x0]
    d098: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
    d0a0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
    d0a8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
    d0b0: 73 1a a7 ff 00 00 00 00      	stxb [r10 - 0x59], r1
    d0b8: 15 01 0b 00 00 00 00 00      	jeq r1, 0x0, +0xb <.text+0xcff8>
    d0c0: 15 01 01 00 01 00 00 00      	jeq r1, 0x1, +0x1 <.text+0xcfb0>
    d0c8: 05 00 0c 00 00 00 00 00      	ja +0xc <.text+0xd010>
    d0d0: 72 06 01 00 01 00 00 00      	stb [r6 + 0x1], 0x1
    d0d8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    d0e0: 05 00 23 00 00 00 00 00      	ja +0x23 <.text+0xd0e0>
    d0e8: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
    d0f8: 85 10 00 00 ac 37 03 00      	call 0x337ac
    d100: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
    d108: 72 06 00 00 01 00 00 00      	stb [r6 + 0x0], 0x1
    d110: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0xd0e8>
    d118: 72 06 01 00 00 00 00 00      	stb [r6 + 0x1], 0x0
    d120: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    d128: 05 00 1a 00 00 00 00 00      	ja +0x1a <.text+0xd0e0>
    d130: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
    d140: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
    d148: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    d150: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
    d158: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
    d160: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
    d170: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    d178: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    d180: 07 01 00 00 a7 ff ff ff      	add64 r1, -0x59
    d188: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
    d190: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
    d198: 7a 0a c8 ff 01 00 00 00      	stdw [r10 - 0x38], 0x1
    d1a0: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
    d1a8: bf a7 00 00 00 00 00 00      	mov64 r7, r10
    d1b0: 07 07 00 00 a8 ff ff ff      	add64 r7, -0x58
    d1b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    d1c0: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
    d1c8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
    d1d0: 85 10 00 00 0e 3c 03 00      	call 0x33c0e
    d1d8: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
    d1e0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    d1e8: 85 10 00 00 d4 f9 ff ff      	call -0x62c
    d1f0: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
    d1f8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
