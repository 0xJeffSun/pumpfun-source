0727b8: mov64 r8, r2
0727c0: mov64 r9, 0x2
0727c8: ldxdw r0, [r5 - 0xff0]
0727d0: jeq r0, 0x0, +0x125 ; branch 0x73100
0727d8: stxdw [r10 - 0x168], r3
0727e0: stxdw [r10 - 0x178], r0
0727e8: stxdw [r10 - 0x160], r1
0727f0: ldxdw r1, [r5 - 0xfe0]
0727f8: stxdw [r10 - 0x188], r1
072800: ldxdw r1, [r5 - 0xfe8]
072808: stxdw [r10 - 0x180], r1
072810: ldxdw r0, [r5 - 0xff8]
072818: ldxdw r1, [r5 - 0x1000]
072820: ldxdw r6, [r4 + 0x20]
072828: ldxdw r2, [r6 + 0x0]
072830: ldxdw r3, [r2 + 0x18]
072838: stxdw [r10 - 0x120], r3
072840: ldxdw r3, [r2 + 0x10]
072848: stxdw [r10 - 0x128], r3
072850: ldxdw r3, [r2 + 0x8]
072858: stxdw [r10 - 0x130], r3
072860: ldxdw r2, [r2 + 0x0]
072868: stxdw [r10 - 0x138], r2
072870: ldxdw r7, [r1 + 0x20]
072878: ldxdw r1, [r7 + 0x0]
072880: ldxdw r2, [r1 + 0x18]
072888: stxdw [r10 - 0x100], r2
072890: ldxdw r2, [r1 + 0x10]
072898: stxdw [r10 - 0x108], r2
0728a0: ldxdw r2, [r1 + 0x8]
0728a8: stxdw [r10 - 0x110], r2
0728b0: ldxdw r1, [r1 + 0x0]
0728b8: stxdw [r10 - 0x118], r1
0728c0: add64 r4, 0x48
0728c8: stxdw [r10 - 0x170], r0
0728d0: ldxdw r5, [r0 + 0x0]
0728d8: mov64 r1, r10
0728e0: add64 r1, -0x148
0728e8: mov64 r2, r10
0728f0: add64 r2, -0x138
0728f8: mov64 r0, r10
072900: add64 r0, -0x118
072908: mov64 r3, r4
072910: mov64 r4, r0
072918: stxdw [r10 - 0x190], r5
072920: call -0x664 ; call 0x6f608
072928: ldxdw r9, [r10 - 0x148]
072930: jeq r9, 0x2, +0x1 ; branch 0x72940
072938: ja +0xa ; branch 0x72990
072940: ldxdw r9, [r8 + 0x8]
072948: ldxdw r1, [r9 + 0x0]
072950: add64 r1, 0x1
072958: mov64 r2, 0x1
072960: jeq r1, 0x0, +0x1 ; branch 0x72970
072968: mov64 r2, 0x0
072970: ldxdw r3, [r8 + 0x0]
072978: stxdw [r9 + 0x0], r1
072980: jne r2, 0x1, +0x3 ; branch 0x729a0
072988: call -0x1
072990: ldxdw r2, [r10 - 0x140]
072998: ja +0xeb ; branch 0x730f8
0729a0: ldxdw r4, [r8 + 0x10]
0729a8: ldxdw r1, [r4 + 0x0]
0729b0: add64 r1, 0x1
0729b8: mov64 r2, 0x1
0729c0: jeq r1, 0x0, +0x1 ; branch 0x729d0
0729c8: mov64 r2, 0x0
0729d0: stxdw [r4 + 0x0], r1
0729d8: jne r2, 0x1, +0x1 ; branch 0x729e8
0729e0: ja -0xc ; branch 0x72988
0729e8: stxdw [r10 - 0x1a8], r3
0729f0: ldxdw r0, [r6 + 0x8]
0729f8: ldxdw r1, [r0 + 0x0]
072a00: add64 r1, 0x1
072a08: mov64 r2, 0x1
072a10: jeq r1, 0x0, +0x1 ; branch 0x72a20
072a18: mov64 r2, 0x0
072a20: ldxdw r3, [r6 + 0x0]
072a28: stxdw [r10 - 0x1d8], r3
072a30: ldxb r3, [r8 + 0x2a]
072a38: stxdw [r10 - 0x1d0], r3
072a40: ldxb r3, [r8 + 0x29]
072a48: stxdw [r10 - 0x1c8], r3
072a50: ldxb r3, [r8 + 0x28]
072a58: stxdw [r10 - 0x1c0], r3
072a60: ldxdw r3, [r8 + 0x20]
072a68: ldxdw r8, [r8 + 0x18]
072a70: stxdw [r0 + 0x0], r1
072a78: jne r2, 0x1, +0x1 ; branch 0x72a88
072a80: ja -0x20 ; branch 0x72988
072a88: ldxdw r1, [r6 + 0x10]
072a90: stxdw [r10 - 0x198], r1
072a98: ldxdw r1, [r1 + 0x0]
072aa0: add64 r1, 0x1
072aa8: mov64 r2, 0x1
072ab0: jeq r1, 0x0, +0x1 ; branch 0x72ac0
072ab8: mov64 r2, 0x0
072ac0: stxdw [r10 - 0x1e0], r3
072ac8: ldxdw r3, [r10 - 0x198]
072ad0: stxdw [r3 + 0x0], r1
072ad8: jne r2, 0x1, +0x1 ; branch 0x72ae8
072ae0: ja -0x2c ; branch 0x72988
072ae8: ldxdw r1, [r10 - 0x168]
072af0: ldxdw r1, [r1 + 0x58]
072af8: ldxdw r2, [r1 + 0x8]
072b00: stxdw [r10 - 0x1a0], r2
072b08: ldxdw r2, [r2 + 0x0]
072b10: add64 r2, 0x1
072b18: mov64 r3, 0x1
072b20: jeq r2, 0x0, +0x1 ; branch 0x72b30
072b28: mov64 r3, 0x0
072b30: ldxb r5, [r6 + 0x2a]
072b38: stxdw [r10 - 0x208], r5
072b40: ldxb r5, [r6 + 0x29]
072b48: stxdw [r10 - 0x200], r5
072b50: ldxb r5, [r6 + 0x28]
072b58: stxdw [r10 - 0x1f8], r5
072b60: ldxdw r5, [r6 + 0x20]
072b68: stxdw [r10 - 0x1f0], r5
072b70: ldxdw r6, [r6 + 0x18]
072b78: stxdw [r10 - 0x1e8], r6
072b80: ldxdw r5, [r1 + 0x0]
072b88: ldxdw r6, [r10 - 0x1a0]
072b90: stxdw [r6 + 0x0], r2
072b98: jne r3, 0x1, +0x1 ; branch 0x72ba8
072ba0: ja -0x44 ; branch 0x72988
072ba8: ldxdw r2, [r1 + 0x10]
072bb0: stxdw [r10 - 0x1b0], r2
072bb8: ldxdw r2, [r2 + 0x0]
072bc0: add64 r2, 0x1
072bc8: mov64 r3, 0x1
072bd0: ldxdw r6, [r10 - 0x170]
072bd8: jeq r2, 0x0, +0x1 ; branch 0x72be8
072be0: mov64 r3, 0x0
072be8: stxdw [r10 - 0x1b8], r9
072bf0: stxdw [r10 - 0x210], r0
072bf8: ldxdw r0, [r10 - 0x1b0]
072c00: stxdw [r0 + 0x0], r2
072c08: jne r3, 0x1, +0x1 ; branch 0x72c18
072c10: ja -0x52 ; branch 0x72988
072c18: mov64 r9, r8
072c20: ldxdw r0, [r7 + 0x8]
072c28: ldxdw r2, [r0 + 0x0]
072c30: add64 r2, 0x1
072c38: mov64 r3, 0x1
072c40: jeq r2, 0x0, +0x1 ; branch 0x72c50
072c48: mov64 r3, 0x0
072c50: ldxdw r8, [r7 + 0x0]
072c58: stxdw [r10 - 0x240], r8
072c60: ldxb r8, [r1 + 0x2a]
072c68: stxdw [r10 - 0x238], r8
072c70: ldxb r8, [r1 + 0x29]
072c78: stxdw [r10 - 0x230], r8
072c80: ldxb r8, [r1 + 0x28]
072c88: stxdw [r10 - 0x228], r8
072c90: ldxdw r8, [r1 + 0x20]
072c98: stxdw [r10 - 0x220], r8
072ca0: ldxdw r1, [r1 + 0x18]
072ca8: stxdw [r10 - 0x218], r1
072cb0: stxdw [r0 + 0x0], r2
072cb8: jne r3, 0x1, +0x1 ; branch 0x72cc8
072cc0: ja -0x68 ; branch 0x72988
072cc8: ldxdw r1, [r7 + 0x10]
072cd0: ldxdw r2, [r1 + 0x0]
072cd8: add64 r2, 0x1
072ce0: mov64 r3, 0x1
072ce8: jeq r2, 0x0, +0x1 ; branch 0x72cf8
072cf0: mov64 r3, 0x0
072cf8: stxdw [r10 - 0x248], r4
072d00: stxdw [r1 + 0x0], r2
072d08: jne r3, 0x1, +0x1 ; branch 0x72d18
072d10: ja -0x72 ; branch 0x72988
072d18: stxdw [r10 - 0x268], r1
072d20: stxdw [r10 - 0x260], r0
072d28: stxdw [r10 - 0x258], r5
072d30: stxdw [r10 - 0x250], r9
072d38: ldxdw r3, [r6 + 0x8]
072d40: ldxdw r2, [r3 + 0x0]
072d48: add64 r2, 0x1
072d50: mov64 r4, 0x1
072d58: jeq r2, 0x0, +0x1 ; branch 0x72d68
072d60: mov64 r4, 0x0
072d68: ldxdw r5, [r10 - 0x1a8]
072d70: ldxb r1, [r7 + 0x2a]
072d78: stxdw [r10 - 0x270], r1
072d80: ldxb r9, [r7 + 0x29]
072d88: ldxb r1, [r7 + 0x28]
072d90: ldxdw r0, [r7 + 0x20]
072d98: ldxdw r8, [r7 + 0x18]
072da0: stxdw [r3 + 0x0], r2
072da8: ldxdw r7, [r10 - 0x1b8]
072db0: jne r4, 0x1, +0x1 ; branch 0x72dc0
072db8: ja -0x87 ; branch 0x72988
072dc0: ldxdw r2, [r6 + 0x10]
072dc8: ldxdw r4, [r2 + 0x0]
072dd0: add64 r4, 0x1
072dd8: mov64 r5, 0x1
072de0: jeq r4, 0x0, +0x1 ; branch 0x72df0
072de8: mov64 r5, 0x0
072df0: stxdw [r10 - 0x278], r9
072df8: stxdw [r2 + 0x0], r4
072e00: jne r5, 0x1, +0x1 ; branch 0x72e10
072e08: ja -0x91 ; branch 0x72988
072e10: ldxdw r4, [r6 + 0x18]
072e18: ldxdw r5, [r6 + 0x20]
072e20: mov64 r9, r6
072e28: ldxb r6, [r9 + 0x28]
072e30: ldxb r7, [r9 + 0x29]
072e38: ldxb r9, [r9 + 0x2a]
072e40: stxb [r10 - 0x16], r9
072e48: stxb [r10 - 0x17], r7
072e50: stxb [r10 - 0x18], r6
072e58: stxdw [r10 - 0x20], r5
072e60: stxdw [r10 - 0x28], r4
072e68: stxdw [r10 - 0x30], r2
072e70: stxdw [r10 - 0x38], r3
072e78: ldxdw r2, [r10 - 0x190]
072e80: stxdw [r10 - 0x40], r2
072e88: ldxdw r2, [r10 - 0x270]
072e90: stxb [r10 - 0x46], r2
072e98: ldxdw r2, [r10 - 0x278]
072ea0: stxb [r10 - 0x47], r2
072ea8: stxb [r10 - 0x48], r1
072eb0: stxdw [r10 - 0x50], r0
072eb8: stxdw [r10 - 0x58], r8
072ec0: ldxdw r1, [r10 - 0x268]
072ec8: stxdw [r10 - 0x60], r1
072ed0: ldxdw r1, [r10 - 0x260]
072ed8: stxdw [r10 - 0x68], r1
072ee0: ldxdw r1, [r10 - 0x240]
072ee8: stxdw [r10 - 0x70], r1
072ef0: ldxdw r1, [r10 - 0x238]
072ef8: stxb [r10 - 0x76], r1
072f00: ldxdw r1, [r10 - 0x230]
072f08: stxb [r10 - 0x77], r1
072f10: ldxdw r1, [r10 - 0x228]
072f18: stxb [r10 - 0x78], r1
072f20: ldxdw r1, [r10 - 0x220]
072f28: stxdw [r10 - 0x80], r1
072f30: ldxdw r1, [r10 - 0x218]
072f38: stxdw [r10 - 0x88], r1
072f40: ldxdw r1, [r10 - 0x1b0]
072f48: stxdw [r10 - 0x90], r1
072f50: ldxdw r1, [r10 - 0x1a0]
072f58: stxdw [r10 - 0x98], r1
072f60: ldxdw r1, [r10 - 0x258]
072f68: stxdw [r10 - 0xa0], r1
072f70: ldxdw r1, [r10 - 0x208]
072f78: stxb [r10 - 0xa6], r1
072f80: ldxdw r1, [r10 - 0x200]
072f88: stxb [r10 - 0xa7], r1
072f90: ldxdw r1, [r10 - 0x1f8]
072f98: stxb [r10 - 0xa8], r1
072fa0: ldxdw r1, [r10 - 0x1f0]
072fa8: stxdw [r10 - 0xb0], r1
072fb0: ldxdw r1, [r10 - 0x1e8]
072fb8: stxdw [r10 - 0xb8], r1
072fc0: ldxdw r1, [r10 - 0x198]
072fc8: stxdw [r10 - 0xc0], r1
072fd0: ldxdw r1, [r10 - 0x210]
072fd8: stxdw [r10 - 0xc8], r1
072fe0: ldxdw r1, [r10 - 0x1d8]
072fe8: stxdw [r10 - 0xd0], r1
072ff0: ldxdw r1, [r10 - 0x188]
072ff8: stxdw [r10 - 0x8], r1
073000: ldxdw r1, [r10 - 0x180]
073008: stxdw [r10 - 0x10], r1
073010: ldxdw r1, [r10 - 0x1d0]
073018: stxb [r10 - 0xd6], r1
073020: ldxdw r1, [r10 - 0x1c8]
073028: stxb [r10 - 0xd7], r1
073030: ldxdw r1, [r10 - 0x1c0]
073038: stxb [r10 - 0xd8], r1
073040: ldxdw r1, [r10 - 0x1e0]
073048: stxdw [r10 - 0xe0], r1
073050: ldxdw r1, [r10 - 0x250]
073058: stxdw [r10 - 0xe8], r1
073060: ldxdw r1, [r10 - 0x248]
073068: stxdw [r10 - 0xf0], r1
073070: ldxdw r1, [r10 - 0x1b8]
073078: stxdw [r10 - 0xf8], r1
073080: ldxdw r1, [r10 - 0x1a8]
073088: stxdw [r10 - 0x100], r1
073090: stdw [r10 - 0x108], 0x0
073098: stdw [r10 - 0x110], 0x8
0730a0: stdw [r10 - 0x118], 0x0
0730a8: ldxdw r1, [r10 - 0x168]
0730b0: ldxb r4, [r1 + 0x30]
0730b8: mov64 r1, r10
0730c0: add64 r1, -0x158
0730c8: mov64 r2, r10
0730d0: add64 r2, -0x118
0730d8: ldxdw r3, [r10 - 0x178]
0730e0: call 0x10329 ; call 0xf4a30
0730e8: ldxdw r2, [r10 - 0x150]
0730f0: ldxdw r9, [r10 - 0x158]
0730f8: ldxdw r1, [r10 - 0x160]
073100: stxdw [r1 + 0x8], r2
073108: stxdw [r1 + 0x0], r9
073110: exit
