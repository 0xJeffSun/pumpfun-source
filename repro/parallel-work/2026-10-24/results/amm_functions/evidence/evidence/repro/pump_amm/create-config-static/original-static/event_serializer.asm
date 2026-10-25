083d38: mov64 r7, r2
083d40: mov64 r6, r1
083d48: lddw r1, 0x300000000
083d58: ldxdw r2, [r1 + 0x0]
083d60: mov64 r1, r2
083d68: add64 r1, -0x100
083d70: mov64 r3, 0x0
083d78: mov64 r4, 0x1
083d80: jgt r1, r2, +0x1 ; branch 0x83d90
083d88: mov64 r4, 0x0
083d90: jne r4, 0x0, +0x1 ; branch 0x83da0
083d98: mov64 r3, r1
083da0: lddw r1, 0x300007f00
083db0: jeq r2, 0x0, +0x1 ; branch 0x83dc0
083db8: mov64 r1, r3
083dc0: lddw r2, 0x300000008
083dd0: jlt r1, r2, +0x46 ; branch 0x84008
083dd8: lddw r2, 0x300000000
083de8: stxdw [r2 + 0x0], r1
083df0: stxdw [r10 - 0x10], r1
083df8: stdw [r10 - 0x18], 0x100
083e00: lddw r2, 0x1651e2378159346b
083e10: stxdw [r1 + 0x0], r2
083e18: ldxdw r2, [r7 + 0x140]
083e20: stxdw [r1 + 0x8], r2
083e28: ldxdw r2, [r7 + 0x100]
083e30: stxdw [r1 + 0x10], r2
083e38: ldxdw r2, [r7 + 0x108]
083e40: stxdw [r1 + 0x18], r2
083e48: ldxdw r2, [r7 + 0x110]
083e50: stxdw [r1 + 0x20], r2
083e58: ldxdw r2, [r7 + 0x118]
083e60: stxdw [r1 + 0x28], r2
083e68: ldxdw r2, [r7 + 0x148]
083e70: stxdw [r1 + 0x30], r2
083e78: ldxdw r2, [r7 + 0x150]
083e80: stxdw [r1 + 0x38], r2
083e88: stdw [r10 - 0x8], 0x40
083e90: mov64 r2, r10
083e98: add64 r2, -0x18
083ea0: mov64 r1, r7
083ea8: call -0xee81 ; call 0xcaa8
083eb0: ldxdw r3, [r10 - 0x18]
083eb8: ldxdw r2, [r10 - 0x8]
083ec0: mov64 r1, r3
083ec8: sub64 r1, r2
083ed0: ldxdw r8, [r7 + 0x158]
083ed8: jgt r1, 0x7, +0x6 ; branch 0x83f10
083ee0: mov64 r1, r10
083ee8: add64 r1, -0x18
083ef0: mov64 r3, 0x8
083ef8: call -0xf0f4 ; call 0xb760
083f00: ldxdw r3, [r10 - 0x18]
083f08: ldxdw r2, [r10 - 0x8]
083f10: ldxdw r1, [r10 - 0x10]
083f18: mov64 r4, r1
083f20: add64 r4, r2
083f28: stxdw [r4 + 0x0], r8
083f30: add64 r2, 0x8
083f38: stxdw [r10 - 0x8], r2
083f40: sub64 r3, r2
083f48: jgt r3, 0x1f, +0x6 ; branch 0x83f80
083f50: mov64 r1, r10
083f58: add64 r1, -0x18
083f60: mov64 r3, 0x20
083f68: call -0xf102 ; call 0xb760
083f70: ldxdw r1, [r10 - 0x10]
083f78: ldxdw r2, [r10 - 0x8]
083f80: add64 r1, r2
083f88: ldxdw r3, [r7 + 0x138]
083f90: stxdw [r1 + 0x18], r3
083f98: ldxdw r3, [r7 + 0x130]
083fa0: stxdw [r1 + 0x10], r3
083fa8: ldxdw r3, [r7 + 0x128]
083fb0: stxdw [r1 + 0x8], r3
083fb8: ldxdw r3, [r7 + 0x120]
083fc0: stxdw [r1 + 0x0], r3
083fc8: add64 r2, 0x20
083fd0: stxdw [r10 - 0x8], r2
083fd8: stxdw [r6 + 0x10], r2
083fe0: ldxdw r1, [r10 - 0x10]
083fe8: stxdw [r6 + 0x8], r1
083ff0: ldxdw r1, [r10 - 0x18]
083ff8: stxdw [r6 + 0x0], r1
084000: exit
084008: mov64 r1, 0x1
084010: mov64 r2, 0x100
084018: call 0x11a65 ; call 0x111348
