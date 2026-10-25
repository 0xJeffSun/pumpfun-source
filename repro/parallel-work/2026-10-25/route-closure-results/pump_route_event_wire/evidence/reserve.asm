    ded0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    ded8: bf 24 00 00 00 00 00 00      	mov64 r4, r2
    dee0: 0f 34 00 00 00 00 00 00      	add64 r4, r3
    dee8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    def0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    def8: ad 24 01 00 00 00 00 00      	jlt r4, r2, +0x1 <.text+0xdde8>
    df00: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    df08: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
    df10: 55 03 1b 00 00 00 00 00      	jne r3, 0x0, +0x1b <.text+0xded0>
    df18: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
    df20: bf 17 00 00 00 00 00 00      	mov64 r7, r1
    df28: 67 07 00 00 01 00 00 00      	lsh64 r7, 0x1
    df30: 2d 47 01 00 00 00 00 00      	jgt r7, r4, +0x1 <.text+0xde20>
    df38: bf 47 00 00 00 00 00 00      	mov64 r7, r4
    df40: 25 07 01 00 08 00 00 00      	jgt r7, 0x8, +0x1 <.text+0xde30>
    df48: b7 07 00 00 08 00 00 00      	mov64 r7, 0x8
    df50: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    df58: bf 72 00 00 00 00 00 00      	mov64 r2, r7
    df60: a7 02 00 00 ff ff ff ff      	xor64 r2, -0x1
    df68: 77 02 00 00 3f 00 00 00      	rsh64 r2, 0x3f
    df70: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <.text+0xde78>
    df78: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
    df80: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
    df88: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
    df90: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    df98: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
    dfa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    dfa8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
    dfb0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
    dfb8: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
    dfc0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
    dfc8: 85 10 00 00 15 ff ff ff      	call -0xeb
    dfd0: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
    dfd8: 15 01 03 00 00 00 00 00      	jeq r1, 0x0, +0x3 <.text+0xded8>
    dfe0: 79 a2 e0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x20]
    dfe8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    dff0: 85 10 00 00 34 3a 03 00      	call 0x33a34
    dff8: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
    e000: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
    e008: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    e010: 95 00 00 00 00 00 00 00      	exit
