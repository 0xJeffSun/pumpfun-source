1030e0: mov64 r6, r1
1030e8: mov64 r1, r10
1030f0: add64 r1, -0x18
1030f8: call 0xe62 ; call 0x10a410
103100: mov64 r1, 0x80
103108: mov64 r2, 0x8
103110: call -0x29e7 ; call 0xee1e0
103118: jne r0, 0x0, +0x3 ; branch 0x103138
103120: mov64 r1, 0x8
103128: mov64 r2, 0x80
103130: call 0x1c45 ; call 0x111360
103138: stdw [r0 + 0x0], 0x2
103140: ldxdw r1, [r10 - 0x18]
103148: stxdw [r0 + 0x20], r1
103150: ldxdw r1, [r10 - 0x10]
103158: stxdw [r0 + 0x28], r1
103160: ldxdw r1, [r10 - 0x8]
103168: stxdw [r0 + 0x30], r1
103170: stb [r0 + 0x38], 0x2
103178: stxdw [r6 + 0x8], r0
103180: stdw [r6 + 0x0], 0x1
103188: exit
