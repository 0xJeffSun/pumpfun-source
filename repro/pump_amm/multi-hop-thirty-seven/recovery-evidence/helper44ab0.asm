044ab0: mov64 r7, r2
044ab8: mov64 r6, r1
044ac0: ldxdw r1, [r7 + 0x10]
044ac8: ldxdw r4, [r1 + 0x20]
044ad0: ldxdw r1, [r7 + 0x0]
044ad8: ldxdw r2, [r1 + 0x0]
044ae0: ldxdw r1, [r7 + 0x18]
044ae8: ldxdw r1, [r1 + 0x0]
044af0: ldxdw r5, [r7 + 0x20]
044af8: ldxdw r5, [r5 + 0x0]
044b00: ldxdw r0, [r7 + 0x28]
044b08: ldxdw r8, [r0 + 0x0]
044b10: ldxdw r0, [r7 + 0x8]
044b18: ldxdw r9, [r7 + 0x30]
044b20: ldxdw r9, [r9 + 0x0]
044b28: stxdw [r10 - 0xfe8], r9
044b30: stxdw [r10 - 0xfe0], r3
044b38: stxdw [r10 - 0xff0], r8
044b40: stxdw [r10 - 0xff8], r5
044b48: stxdw [r10 - 0x1000], r1
044b50: add64 r0, 0x8
044b58: add64 r2, 0x8
044b60: mov64 r1, r10
044b68: add64 r1, -0x38
044b70: mov64 r5, r10
044b78: mov64 r3, r0
044b80: call -0x6160 ; call 0x14088
044b88: ldxdw r1, [r10 - 0x38]
044b90: jne r1, 0x0, +0x1f ; branch 0x44c90
044b98: ldxdw r2, [r7 + 0x38]
044ba0: ldxh r1, [r2 + 0x0]
044ba8: mov64 r4, r1
044bb0: lsh64 r4, 0x37
044bb8: arsh64 r4, 0x3f
044bc0: ldxdw r3, [r10 - 0x20]
044bc8: mov64 r5, r4
044bd0: and64 r5, r3
044bd8: ldxdw r3, [r10 - 0x8]
044be0: and64 r4, r3
044be8: ldxb r2, [r2 + 0x2]
044bf0: ldxdw r3, [r10 - 0x30]
044bf8: ldxdw r0, [r10 - 0x28]
044c00: ldxdw r7, [r10 - 0x10]
044c08: ldxdw r8, [r10 - 0x18]
044c10: stxdw [r6 + 0x30], r4
044c18: stxdw [r6 + 0x18], r5
044c20: lsh64 r2, 0x3f
044c28: arsh64 r2, 0x3f
044c30: mov64 r4, r2
044c38: and64 r4, r8
044c40: stxdw [r6 + 0x20], r4
044c48: and64 r1, 0x1
044c50: neg64 r1
044c58: mov64 r4, r1
044c60: and64 r4, r7
044c68: stxdw [r6 + 0x28], r4
044c70: and64 r1, r0
044c78: and64 r2, r3
044c80: mov64 r3, 0x0
044c88: ja +0x3 ; branch 0x44ca8
044c90: mov64 r3, 0x1
044c98: ldxdw r1, [r10 - 0x28]
044ca0: ldxdw r2, [r10 - 0x30]
044ca8: stxdw [r6 + 0x10], r1
044cb0: stxdw [r6 + 0x8], r2
044cb8: stxdw [r6 + 0x0], r3
044cc0: exit
