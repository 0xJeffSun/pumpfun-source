17c850: mov64 r6, r3
17c858: mov64 r0, r2
17c860: jeq r6, 0x52, +0xc ; branch 0x17c8c8
17c868: jlt r6, 0xa7, +0x9 ; branch 0x17c8b8
17c870: mov64 r2, 0x0
17c878: mov64 r3, r0
17c880: add64 r3, 0x52
17c888: jeq r2, 0x53, +0x9 ; branch 0x17c8d8
17c890: mov64 r4, r3
17c898: add64 r4, r2
17c8a0: add64 r2, 0x1
17c8a8: ldxb r4, [r4 + 0x0]
17c8b0: jeq r4, 0x0, -0x6 ; branch 0x17c888
17c8b8: stdw [r1 + 0x0], 0x2
17c8c0: ja +0x1 ; branch 0x17c8d0
17c8c8: stdw [r1 + 0x0], 0x0
17c8d0: exit
17c8d8: ldxb r2, [r0 + 0xa5]
17c8e0: jne r2, 0x1, -0x6 ; branch 0x17c8b8
17c8e8: mov64 r8, 0x0
17c8f0: add64 r0, 0xa6
17c8f8: add64 r6, -0xa6
17c900: mov64 r2, r0
17c908: mov64 r3, r6
17c910: mov64 r4, 0x0
17c918: ja +0x8 ; branch 0x17c960
17c920: and64 r2, 0x1
17c928: jne r2, 0x0, -0xf ; branch 0x17c8b8
17c930: mov64 r2, r0
17c938: add64 r2, r5
17c940: mov64 r3, r6
17c948: sub64 r3, r5
17c950: mov64 r8, r5
17c958: jlt r6, r5, -0x15 ; branch 0x17c8b8
17c960: jgt r3, 0x1, +0xe ; branch 0x17c9d8
17c968: ldxdw r2, [r10 - 0x8]
17c970: stxh [r1 + 0x30], r2
17c978: ldxdw r2, [r10 - 0x10]
17c980: stxdw [r1 + 0x28], r2
17c988: ldxdw r2, [r10 - 0x18]
17c990: stxdw [r1 + 0x20], r2
17c998: ldxdw r2, [r10 - 0x20]
17c9a0: stxh [r1 + 0x18], r2
17c9a8: ldxdw r2, [r10 - 0x28]
17c9b0: stxdw [r1 + 0x10], r2
17c9b8: ldxdw r2, [r10 - 0x30]
17c9c0: stxdw [r1 + 0x8], r2
17c9c8: stxdw [r1 + 0x0], r4
17c9d0: ja -0x21 ; branch 0x17c8d0
17c9d8: ldxh r5, [r2 + 0x0]
17c9e0: jne r5, 0x0, +0x1 ; branch 0x17c9f0
17c9e8: ja -0x11 ; branch 0x17c968
17c9f0: jgt r3, 0x3, +0x1 ; branch 0x17ca00
17c9f8: ja -0x29 ; branch 0x17c8b8
17ca00: ldxh r9, [r2 + 0x2]
17ca08: mov64 r7, r9
17ca10: add64 r7, 0x4
17ca18: jle r7, r3, +0x1 ; branch 0x17ca28
17ca20: ja -0x2e ; branch 0x17c8b8
17ca28: jeq r5, 0x1, +0x6 ; branch 0x17ca60
17ca30: mov64 r5, r8
17ca38: add64 r5, r7
17ca40: mov64 r2, 0x1
17ca48: jlt r5, r8, -0x26 ; branch 0x17c920
17ca50: mov64 r2, 0x0
17ca58: ja -0x28 ; branch 0x17c920
17ca60: jne r4, 0x1, +0x1 ; branch 0x17ca70
17ca68: ja -0x37 ; branch 0x17c8b8
17ca70: jlt r9, 0x6c, -0x38 ; branch 0x17c8b8
17ca78: mov64 r4, 0x1
17ca80: ldxh r3, [r2 + 0x6e]
17ca88: stxdw [r10 - 0x8], r3
17ca90: ldxdw r3, [r2 + 0x66]
17ca98: stxdw [r10 - 0x10], r3
17caa0: ldxdw r3, [r2 + 0x5e]
17caa8: stxdw [r10 - 0x18], r3
17cab0: ldxh r3, [r2 + 0x5c]
17cab8: stxdw [r10 - 0x20], r3
17cac0: ldxdw r3, [r2 + 0x54]
17cac8: stxdw [r10 - 0x28], r3
17cad0: ldxdw r2, [r2 + 0x4c]
17cad8: stxdw [r10 - 0x30], r2
17cae0: ja -0x17 ; branch 0x17ca30
