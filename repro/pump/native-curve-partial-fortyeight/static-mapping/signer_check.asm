19b4e0: mov64 r6, r1
19b4e8: mov64 r1, 0x2
19b4f0: ldxb r3, [r2 + 0x28]
19b4f8: jne r3, 0x0, +0x6 ; branch 0x19b530
19b500: mov64 r1, r10
19b508: add64 r1, -0x10
19b510: mov64 r2, 0xbc2
19b518: call 0x7c0 ; direct target 0x19f320
19b520: mov64 r1, 0x0
19b528: ldxdw r2, [r10 - 0x8]
19b530: stxdw [r6 + 0x8], r2
19b538: stxdw [r6 + 0x0], r1
19b540: exit
