    ce88: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    ce90: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
    ce98: a5 01 08 00 08 00 00 00      	jlt r1, 0x8, +0x8 <.text+0xcdc0>
    cea0: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
    cea8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
    ceb0: 79 30 00 00 00 00 00 00      	ldxdw r0, [r3 + 0x0]
    ceb8: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
    cec0: 07 03 00 00 08 00 00 00      	add64 r3, 0x8
    cec8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
    ced0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    ced8: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0xcde0>
    cee0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
    cef0: 85 10 00 00 ed 37 03 00      	call 0x337ed
    cef8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
    cf00: 7b 06 08 00 00 00 00 00      	stxdw [r6 + 0x8], r0
    cf08: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
    cf10: 95 00 00 00 00 00 00 00      	exit
