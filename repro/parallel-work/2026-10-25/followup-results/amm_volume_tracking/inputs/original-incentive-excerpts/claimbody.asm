05a570: mov64 r9, r2
05a578: mov64 r7, r1
05a580: ldxdw r8, [r9 + 0x8]
05a588: mov64 r1, r10
05a590: add64 r1, -0xd0
05a598: call 0x15913 ; call 0x106e38
05a5a0: ldxdw r1, [r10 - 0xd0]
05a5a8: jne r1, 0x0, +0x27 ; branch 0x5a6e8
05a5b0: ldxdw r6, [r10 - 0xa8]
05a5b8: ldxdw r1, [r8 + 0x230]
05a5c0: ldxdw r2, [r1 + 0x8]
05a5c8: ldxdw r3, [r1 + 0x10]
05a5d0: ldxdw r4, [r1 + 0x18]
05a5d8: ldxdw r1, [r1 + 0x0]
05a5e0: stxdw [r8 + 0x298], r1
05a5e8: stxdw [r8 + 0x2b0], r4
05a5f0: stxdw [r8 + 0x2a8], r3
05a5f8: stxdw [r8 + 0x2a0], r2
05a600: mov64 r2, r8
05a608: add64 r2, 0x2f8
05a610: mov64 r3, r8
05a618: add64 r3, 0x298
05a620: mov64 r1, r10
05a628: add64 r1, -0x130
05a630: mov64 r4, r6
05a638: mov64 r5, 0x0
05a640: call 0x25b8 ; call 0x6d408
05a648: ldxdw r1, [r10 - 0x130]
05a650: jeq r1, 0x2, +0x1 ; branch 0x5a660
05a658: ja +0x1f ; branch 0x5a758
05a660: ldxdw r1, [r8 + 0x2b8]
05a668: stxdw [r10 - 0x158], r1
05a670: jeq r1, 0x0, +0x79 ; branch 0x5aa40
05a678: stxdw [r10 - 0x178], r6
05a680: ldxdw r1, [r8 + 0x2f0]
05a688: ldxdw r2, [r1 + 0x8]
05a690: ldxdw r4, [r2 + 0x0]
05a698: add64 r4, 0x1
05a6a0: mov64 r5, 0x1
05a6a8: jeq r4, 0x0, +0x1 ; branch 0x5a6b8
05a6b0: mov64 r5, 0x0
05a6b8: ldxdw r3, [r8 + 0x510]
05a6c0: ldxdw r0, [r1 + 0x0]
05a6c8: stxdw [r10 - 0x160], r2
05a6d0: stxdw [r2 + 0x0], r4
05a6d8: jne r5, 0x1, +0x11 ; branch 0x5a768
05a6e0: call -0x1
05a6e8: ldxdw r1, [r10 - 0xc8]
05a6f0: ldxdw r2, [r10 - 0xc0]
05a6f8: ldxdw r3, [r10 - 0xb8]
05a700: stxdw [r10 - 0xc0], r3
05a708: stxdw [r10 - 0xc8], r2
05a710: stxdw [r10 - 0xd0], r1
05a718: mov64 r1, r10
05a720: add64 r1, -0x120
05a728: mov64 r2, r10
05a730: add64 r2, -0xd0
05a738: call 0x15120 ; call 0x103040
05a740: ldxdw r2, [r10 - 0x118]
05a748: ldxdw r1, [r10 - 0x120]
05a750: ja +0x1c7 ; branch 0x5b590
05a758: ldxdw r2, [r10 - 0x128]
05a760: ja +0x1c5 ; branch 0x5b590
05a768: ldxdw r6, [r1 + 0x10]
05a770: ldxdw r4, [r6 + 0x0]
05a778: add64 r4, 0x1
05a780: mov64 r5, 0x1
05a788: jeq r4, 0x0, +0x1 ; branch 0x5a798
05a790: mov64 r5, 0x0
05a798: stxdw [r10 - 0x170], r0
05a7a0: stxdw [r10 - 0x168], r3
05a7a8: stxdw [r10 - 0x188], r7
05a7b0: stxdw [r6 + 0x0], r4
05a7b8: jne r5, 0x1, +0x1 ; branch 0x5a7c8
05a7c0: ja -0x1d ; branch 0x5a6e0
05a7c8: mov64 r5, r8
05a7d0: add64 r5, 0x80
05a7d8: mov64 r4, r8
05a7e0: add64 r4, 0x158
05a7e8: ldxdw r0, [r1 + 0x18]
05a7f0: ldxdw r3, [r1 + 0x20]
05a7f8: ldxb r2, [r1 + 0x28]
05a800: ldxb r7, [r1 + 0x29]
05a808: ldxb r1, [r1 + 0x2a]
05a810: stxb [r10 - 0xa6], r1
05a818: stxb [r10 - 0xa7], r7
05a820: stxb [r10 - 0xa8], r2
05a828: stxdw [r10 - 0xb0], r3
05a830: stxdw [r10 - 0xb8], r0
05a838: stxdw [r10 - 0x180], r6
05a840: stxdw [r10 - 0xc0], r6
05a848: ldxdw r6, [r10 - 0x160]
05a850: stxdw [r10 - 0xc8], r6
05a858: ldxdw r1, [r10 - 0x170]
05a860: stxdw [r10 - 0xd0], r1
05a868: ldxb r1, [r9 + 0x20]
05a870: mov64 r2, r10
05a878: add64 r2, -0x28
05a880: stxdw [r10 - 0x100], r2
05a888: lddw r2, 0x11ce27 ; rodata b'global_volume_accumulatorprograms/pump-amm/src/instructions/token_incentive'
05a898: stxdw [r10 - 0x110], r2
05a8a0: stxb [r10 - 0x28], r1
05a8a8: mov64 r1, r10
05a8b0: add64 r1, -0x110
05a8b8: stxdw [r10 - 0x68], r1
05a8c0: stdw [r10 - 0xf8], 0x1
05a8c8: stdw [r10 - 0x108], 0x19
05a8d0: stdw [r10 - 0x60], 0x2
05a8d8: mov64 r1, r10
05a8e0: add64 r1, -0x68
05a8e8: stxdw [r10 - 0xfe8], r1
05a8f0: ldxdw r1, [r10 - 0x158]
05a8f8: stxdw [r10 - 0xff0], r1
05a900: mov64 r1, r10
05a908: add64 r1, -0xd0
05a910: stxdw [r10 - 0xff8], r1
05a918: stxdw [r10 - 0x1000], r5
05a920: stdw [r10 - 0xfe0], 0x1
05a928: mov64 r1, r10
05a930: add64 r1, -0x140
05a938: mov64 r5, r10
05a940: ldxdw r2, [r10 - 0x168]
05a948: mov64 r3, r8
05a950: call 0x2fcc ; call 0x727b8
05a958: ldxdw r1, [r10 - 0x140]
05a960: jne r1, 0x2, +0x21 ; branch 0x5aa70
05a968: ldxdw r1, [r6 + 0x0]
05a970: add64 r1, -0x1
05a978: stxdw [r6 + 0x0], r1
05a980: jne r1, 0x0, +0x3 ; branch 0x5a9a0
05a988: ldxdw r1, [r6 + 0x8]
05a990: add64 r1, -0x1
05a998: stxdw [r6 + 0x8], r1
05a9a0: ldxdw r2, [r10 - 0x180]
05a9a8: ldxdw r1, [r2 + 0x0]
05a9b0: add64 r1, -0x1
05a9b8: stxdw [r2 + 0x0], r1
05a9c0: jne r1, 0x0, +0x3 ; branch 0x5a9e0
05a9c8: ldxdw r1, [r2 + 0x8]
05a9d0: add64 r1, -0x1
05a9d8: stxdw [r2 + 0x8], r1
05a9e0: ldxdw r1, [r8 + 0x2b8]
05a9e8: ldxdw r2, [r8 + 0x2c0]
05a9f0: mov64 r0, r2
05a9f8: add64 r0, r1
05aa00: mov64 r1, 0x1
05aa08: ldxdw r5, [r10 - 0x178]
05aa10: jlt r0, r2, +0x1 ; branch 0x5aa20
05aa18: mov64 r1, 0x0
05aa20: jne r1, 0x1, +0x1b ; branch 0x5ab00
05aa28: lddw r1, 0x122638 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x89\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x0f\x01\x00\x00\r\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x1d\x01\x00\x00\x0e\x00\x00\x00\x00\x00\x00'
05aa38: call 0x16f88 ; call 0x112680
05aa40: lddw r1, 0x11ce15 ; rodata b'No tokens to claimglobal_volume_accumulatorprograms/pump-amm/src/instructio'
05aa50: mov64 r2, 0x12
05aa58: call -0x1
05aa60: mov64 r1, 0x2
05aa68: ja +0x164 ; branch 0x5b590
05aa70: ldxdw r2, [r10 - 0x138]
05aa78: ldxdw r3, [r6 + 0x0]
05aa80: add64 r3, -0x1
05aa88: stxdw [r6 + 0x0], r3
05aa90: ldxdw r7, [r10 - 0x188]
05aa98: jne r3, 0x0, +0x3 ; branch 0x5aab8
05aaa0: ldxdw r3, [r6 + 0x8]
05aaa8: add64 r3, -0x1
05aab0: stxdw [r6 + 0x8], r3
05aab8: ldxdw r4, [r10 - 0x180]
05aac0: ldxdw r3, [r4 + 0x0]
05aac8: add64 r3, -0x1
05aad0: stxdw [r4 + 0x0], r3
05aad8: jne r3, 0x0, +0x156 ; branch 0x5b590
05aae0: ldxdw r3, [r4 + 0x8]
05aae8: add64 r3, -0x1
05aaf0: stxdw [r4 + 0x8], r3
05aaf8: ja +0x152 ; branch 0x5b590
05ab00: stxdw [r8 + 0x2d0], r5
05ab08: mov64 r1, 0x0
05ab10: mov64 r2, 0x1
05ab18: mov64 r3, 0x1
05ab20: jne r0, 0x0, +0x1 ; branch 0x5ab30
05ab28: mov64 r3, 0x0
05ab30: stxb [r8 + 0x2e9], r3
05ab38: ldxdw r6, [r8 + 0x2c8]
05ab40: mov64 r3, 0x1
05ab48: jne r6, 0x0, +0x1 ; branch 0x5ab58
05ab50: mov64 r3, 0x0
05ab58: stxb [r8 + 0x2e8], r3
05ab60: stxdw [r8 + 0x2c0], r0
05ab68: stdw [r8 + 0x2b8], 0x0
05ab70: ldxdw r3, [r8 + 0x230]
05ab78: ldxdw r4, [r3 + 0x18]
05ab80: stxdw [r10 - 0xf8], r4
05ab88: ldxdw r4, [r3 + 0x10]
05ab90: stxdw [r10 - 0x100], r4
05ab98: ldxdw r4, [r3 + 0x8]
05aba0: stxdw [r10 - 0x108], r4
05aba8: ldxdw r3, [r3 + 0x0]
05abb0: stxdw [r10 - 0x110], r3
05abb8: ldxdw r3, [r8 + 0x58]
05abc0: ldxdw r3, [r3 + 0x0]
05abc8: ldxdw r4, [r3 + 0x18]
05abd0: stxdw [r10 - 0xd8], r4
05abd8: ldxdw r4, [r3 + 0x10]
05abe0: stxdw [r10 - 0xe0], r4
05abe8: ldxdw r4, [r3 + 0x8]
05abf0: stxdw [r10 - 0xe8], r4
05abf8: ldxdw r3, [r3 + 0x0]
05ac00: stxdw [r10 - 0xf0], r3
05ac08: lddw r3, 0x300000000
05ac18: ldxdw r3, [r3 + 0x0]
05ac20: mov64 r4, r3
05ac28: add64 r4, -0x100
05ac30: jgt r4, r3, +0x1 ; branch 0x5ac40
05ac38: mov64 r2, 0x0
05ac40: jne r2, 0x0, +0x1 ; branch 0x5ac50
05ac48: mov64 r1, r4
05ac50: lddw r2, 0x300007f00
05ac60: jeq r3, 0x0, +0x1 ; branch 0x5ac70
05ac68: mov64 r2, r1
05ac70: lddw r1, 0x300000007
05ac80: jgt r2, r1, +0x3 ; branch 0x5aca0
05ac88: mov64 r1, 0x1
05ac90: mov64 r2, 0x100
05ac98: call 0x16cd5 ; call 0x111348
05aca0: mov64 r7, r10
05aca8: add64 r7, -0xf0
05acb0: lddw r1, 0x300000000
05acc0: stxdw [r1 + 0x0], r2
05acc8: lddw r1, -0x1731a432ce0953b1
05acd8: stxdw [r2 + 0x0], r1
05ace0: ldxdw r1, [r10 - 0x110]
05ace8: stxdw [r2 + 0x8], r1
05acf0: ldxdw r1, [r10 - 0x108]
05acf8: stxdw [r2 + 0x10], r1
05ad00: ldxdw r1, [r10 - 0x100]
05ad08: stxdw [r2 + 0x18], r1
05ad10: ldxdw r1, [r10 - 0xf8]
05ad18: stxdw [r2 + 0x20], r1
05ad20: ldxdw r1, [r7 + 0x0]
05ad28: stxdw [r2 + 0x28], r1
05ad30: ldxdw r1, [r7 + 0x8]
05ad38: stxdw [r2 + 0x30], r1
05ad40: ldxdw r1, [r7 + 0x10]
05ad48: stxdw [r2 + 0x38], r1
05ad50: ldxdw r1, [r7 + 0x18]
05ad58: stxdw [r2 + 0x40], r1
05ad60: stxdw [r10 - 0x170], r6
05ad68: stxdw [r2 + 0x60], r6
05ad70: stxdw [r10 - 0x168], r0
05ad78: stxdw [r2 + 0x58], r0
05ad80: stxdw [r2 + 0x50], r5
05ad88: ldxdw r1, [r10 - 0x158]
05ad90: stxdw [r2 + 0x48], r1
05ad98: stxdw [r10 - 0xd0], r2
05ada0: stdw [r10 - 0xc8], 0x68
05ada8: mov64 r1, r10
05adb0: add64 r1, -0xd0
05adb8: mov64 r6, 0x1
05adc0: mov64 r2, 0x1
05adc8: call 0x15796 ; call 0x106a80
05add0: ldxdw r3, [r8 + 0x268]
05add8: ldxdw r1, [r3 + 0x0]
05ade0: add64 r1, 0x1
05ade8: jeq r1, 0x0, +0x1 ; branch 0x5adf8
05adf0: mov64 r6, 0x0
05adf8: ldxdw r2, [r8 + 0x260]
05ae00: stxdw [r10 - 0x180], r2
05ae08: stxdw [r3 + 0x0], r1
05ae10: jne r6, 0x1, +0x1 ; branch 0x5ae20
05ae18: ja -0xe8 ; branch 0x5a6e0
05ae20: ldxdw r4, [r8 + 0x270]
05ae28: ldxdw r1, [r4 + 0x0]
05ae30: add64 r1, 0x1
05ae38: mov64 r2, 0x1
05ae40: jeq r1, 0x0, +0x1 ; branch 0x5ae50
05ae48: mov64 r2, 0x0
05ae50: stxdw [r10 - 0x190], r3
05ae58: stxdw [r10 - 0x160], r4
05ae60: stxdw [r4 + 0x0], r1
05ae68: ldxdw r5, [r10 - 0x178]
05ae70: jne r2, 0x1, +0x1 ; branch 0x5ae80
05ae78: ja -0xf4 ; branch 0x5a6e0
05ae80: lddw r1, 0x300000000
05ae90: ldxdw r1, [r1 + 0x0]
05ae98: mov64 r2, r1
05aea0: add64 r2, -0x100
05aea8: mov64 r3, 0x0
05aeb0: mov64 r4, 0x1
05aeb8: jgt r2, r1, +0x1 ; branch 0x5aec8
05aec0: mov64 r4, 0x0
05aec8: jne r4, 0x0, +0x1 ; branch 0x5aed8
05aed0: mov64 r3, r2
05aed8: lddw r2, 0x300007f00
05aee8: jeq r1, 0x0, +0x1 ; branch 0x5aef8
05aef0: mov64 r2, r3
05aef8: lddw r1, 0x300000007
05af08: jgt r2, r1, +0x1 ; branch 0x5af18
05af10: ja -0x52 ; branch 0x5ac88
05af18: ldxb r1, [r9 + 0x22]
05af20: stxdw [r10 - 0x198], r1
05af28: ldxb r1, [r8 + 0x28a]
05af30: stxdw [r10 - 0x1b0], r1
05af38: ldxb r1, [r8 + 0x289]
05af40: stxdw [r10 - 0x1a8], r1
05af48: ldxb r1, [r8 + 0x288]
05af50: stxdw [r10 - 0x1a0], r1
05af58: ldxdw r9, [r8 + 0x280]
05af60: ldxdw r6, [r8 + 0x278]
05af68: lddw r3, 0x300000000
05af78: stxdw [r3 + 0x0], r2
05af80: lddw r1, -0x1731a432ce0953b1
05af90: stxdw [r2 + 0x0], r1
05af98: ldxdw r1, [r10 - 0x110]
05afa0: stxdw [r2 + 0x8], r1
05afa8: ldxdw r1, [r10 - 0x108]
05afb0: stxdw [r2 + 0x10], r1
05afb8: ldxdw r1, [r10 - 0x100]
05afc0: stxdw [r2 + 0x18], r1
05afc8: ldxdw r1, [r10 - 0xf8]
05afd0: stxdw [r2 + 0x20], r1
05afd8: ldxdw r1, [r7 + 0x0]
05afe0: stxdw [r2 + 0x28], r1
05afe8: ldxdw r1, [r7 + 0x8]
05aff0: stxdw [r2 + 0x30], r1
05aff8: ldxdw r1, [r7 + 0x10]
05b000: stxdw [r2 + 0x38], r1
05b008: ldxdw r1, [r7 + 0x18]
05b010: stxdw [r2 + 0x40], r1
05b018: ldxdw r1, [r10 - 0x170]
05b020: stxdw [r2 + 0x60], r1
05b028: ldxdw r1, [r10 - 0x168]
05b030: stxdw [r2 + 0x58], r1
05b038: stxdw [r2 + 0x50], r5
05b040: ldxdw r1, [r10 - 0x158]
05b048: stxdw [r2 + 0x48], r1
05b050: mov64 r1, 0x0
05b058: mov64 r4, 0x70
05b060: jslt r4, 0x0, +0xa8 ; branch 0x5b5a8
05b068: ldxdw r1, [r3 + 0x0]
05b070: lddw r0, 0x300008000
05b080: jeq r1, 0x0, +0x1 ; branch 0x5b090
05b088: mov64 r0, r1
05b090: mov64 r5, r0
05b098: sub64 r5, r4
05b0a0: mov64 r3, 0x0
05b0a8: mov64 r1, 0x1
05b0b0: mov64 r4, 0x1
05b0b8: jgt r5, r0, +0x1 ; branch 0x5b0c8
05b0c0: mov64 r4, 0x0
05b0c8: jne r4, 0x0, +0x1 ; branch 0x5b0d8
05b0d0: mov64 r3, r5
05b0d8: lddw r4, 0x300000008
05b0e8: jlt r3, r4, +0x97 ; branch 0x5b5a8
05b0f0: lddw r1, 0x300000000
05b100: stxdw [r1 + 0x0], r3
05b108: lddw r1, 0x1d9acb512ea545e4
05b118: stxdw [r3 + 0x0], r1
05b120: mov64 r1, 0x0
05b128: mov64 r4, r3
05b130: add64 r4, r1
05b138: mov64 r5, r2
05b140: add64 r5, r1
05b148: ldxb r5, [r5 + 0x0]
05b150: stxb [r4 + 0x8], r5
05b158: add64 r1, 0x1
05b160: jeq r1, 0x68, +0x1 ; branch 0x5b170
05b168: ja -0x9 ; branch 0x5b128
05b170: lddw r1, 0x300000000
05b180: ldxdw r2, [r1 + 0x0]
05b188: mov64 r1, r2
05b190: add64 r1, -0x22
05b198: mov64 r4, 0x0
05b1a0: mov64 r5, 0x1
05b1a8: jgt r1, r2, +0x1 ; branch 0x5b1b8
05b1b0: mov64 r5, 0x0
05b1b8: jne r5, 0x0, +0x1 ; branch 0x5b1c8
05b1c0: mov64 r4, r1
05b1c8: lddw r1, 0x300007fde
05b1d8: jeq r2, 0x0, +0x1 ; branch 0x5b1e8
05b1e0: mov64 r1, r4
05b1e8: lddw r2, 0x300000007
05b1f8: jgt r1, r2, +0x3 ; branch 0x5b218
05b200: mov64 r1, 0x1
05b208: mov64 r2, 0x22
05b210: call 0x16c29 ; call 0x111360
05b218: lddw r2, 0x300000000
05b228: stxdw [r2 + 0x0], r1
05b230: ldxdw r8, [r10 - 0x180]
05b238: ldxdw r2, [r8 + 0x0]
05b240: ldxdw r4, [r8 + 0x8]
05b248: ldxdw r5, [r8 + 0x10]
05b250: ldxdw r0, [r8 + 0x18]
05b258: stxdw [r1 + 0x18], r0
05b260: stxdw [r1 + 0x10], r5
05b268: stxdw [r1 + 0x8], r4
05b270: stxdw [r1 + 0x0], r2
05b278: sth [r1 + 0x20], 0x1
05b280: stxdw [r10 - 0x60], r1
05b288: stdw [r10 - 0x58], 0x1
05b290: stdw [r10 - 0x68], 0x1
05b298: mov64 r7, r10
05b2a0: add64 r7, -0xd0
05b2a8: mov64 r5, r10
05b2b0: add64 r5, -0x68
05b2b8: mov64 r1, r7
05b2c0: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
05b2d0: mov64 r4, 0x70
05b2d8: call 0x1650e ; call 0x10db50
05b2e0: ldxdw r1, [r10 - 0x1b0]
05b2e8: stxb [r10 - 0x3e], r1
05b2f0: ldxdw r1, [r10 - 0x1a8]
05b2f8: stxb [r10 - 0x3f], r1
05b300: ldxdw r1, [r10 - 0x1a0]
05b308: stxb [r10 - 0x40], r1
05b310: stxdw [r10 - 0x48], r9
05b318: stxdw [r10 - 0x50], r6
05b320: ldxdw r1, [r10 - 0x160]
05b328: stxdw [r10 - 0x58], r1
05b330: ldxdw r6, [r10 - 0x190]
05b338: stxdw [r10 - 0x60], r6
05b340: stxdw [r10 - 0x68], r8
05b348: mov64 r1, r10
05b350: add64 r1, -0x28
05b358: stxdw [r10 - 0x38], r1
05b360: mov64 r1, r10
05b368: add64 r1, -0x1
05b370: stxdw [r10 - 0x18], r1
05b378: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
05b388: stxdw [r10 - 0x28], r1
05b390: ldxdw r1, [r10 - 0x198]
05b398: stxb [r10 - 0x1], r1
05b3a0: stdw [r10 - 0x30], 0x2
05b3a8: stdw [r10 - 0x10], 0x1
05b3b0: stdw [r10 - 0x20], 0x11
05b3b8: mov64 r1, r10
05b3c0: add64 r1, -0x38
05b3c8: stxdw [r10 - 0x1000], r1
05b3d0: stdw [r10 - 0xff8], 0x1
05b3d8: mov64 r1, r10
05b3e0: add64 r1, -0x80
05b3e8: mov64 r3, r10
05b3f0: add64 r3, -0x68
05b3f8: mov64 r5, r10
05b400: mov64 r2, r7
05b408: mov64 r4, 0x1
05b410: call 0x156d4 ; call 0x106ab8
05b418: lddw r1, -0x7fffffffffffffe6
05b428: ldxdw r2, [r10 - 0x80]
05b430: jeq r2, r1, +0x1 ; branch 0x5b440
05b438: ja +0x12 ; branch 0x5b4d0
05b440: ldxdw r1, [r6 + 0x0]
05b448: add64 r1, -0x1
05b450: stxdw [r6 + 0x0], r1
05b458: ldxdw r7, [r10 - 0x188]
05b460: jne r1, 0x0, +0x3 ; branch 0x5b480
05b468: ldxdw r1, [r6 + 0x8]
05b470: add64 r1, -0x1
05b478: stxdw [r6 + 0x8], r1
05b480: ldxdw r2, [r10 - 0x160]
05b488: ldxdw r1, [r2 + 0x0]
05b490: add64 r1, -0x1
05b498: stxdw [r2 + 0x0], r1
05b4a0: jne r1, 0x0, +0x3 ; branch 0x5b4c0
05b4a8: ldxdw r1, [r2 + 0x8]
05b4b0: add64 r1, -0x1
05b4b8: stxdw [r2 + 0x8], r1
05b4c0: mov64 r1, 0x2
05b4c8: ja +0x18 ; branch 0x5b590
05b4d0: mov64 r1, r10
05b4d8: add64 r1, -0x150
05b4e0: mov64 r2, r10
05b4e8: add64 r2, -0x80
05b4f0: call 0x14f69 ; call 0x103040
05b4f8: ldxdw r3, [r10 - 0x58]
05b500: ldxdw r2, [r10 - 0x148]
05b508: ldxdw r1, [r10 - 0x150]
05b510: ldxdw r4, [r10 - 0x60]
05b518: ldxdw r5, [r4 + 0x0]
05b520: add64 r5, -0x1
05b528: stxdw [r4 + 0x0], r5
05b530: ldxdw r7, [r10 - 0x188]
05b538: jne r5, 0x0, +0x3 ; branch 0x5b558
05b540: ldxdw r5, [r4 + 0x8]
05b548: add64 r5, -0x1
05b550: stxdw [r4 + 0x8], r5
05b558: ldxdw r4, [r3 + 0x0]
05b560: add64 r4, -0x1
05b568: stxdw [r3 + 0x0], r4
05b570: jne r4, 0x0, +0x3 ; branch 0x5b590
05b578: ldxdw r4, [r3 + 0x8]
05b580: add64 r4, -0x1
05b588: stxdw [r3 + 0x8], r4
05b590: stxdw [r7 + 0x8], r2
05b598: stxdw [r7 + 0x0], r1
05b5a0: exit
05b5a8: mov64 r2, 0x70
05b5b0: call 0x16bb2 ; call 0x111348
