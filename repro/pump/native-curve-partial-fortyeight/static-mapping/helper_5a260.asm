05a260: mov64 r7, r4
05a268: mov64 r9, r3
05a270: stxdw [r10 - 0x188], r1
05a278: ldxdw r4, [r5 - 0xfe8]
05a280: ldxdw r1, [r5 - 0xff0]
05a288: stxdw [r10 - 0x198], r1
05a290: ldxdw r1, [r5 - 0xff8]
05a298: stxdw [r10 - 0x1a0], r1
05a2a0: ldxdw r6, [r5 - 0x1000]
05a2a8: stxdw [r10 - 0x190], r4
05a2b0: jne r9, 0x0, +0xf5 ; branch 0x5aa60
05a2b8: mov64 r1, 0x2
05a2c0: jeq r4, 0x0, +0x110 ; branch 0x5ab48
05a2c8: ldxdw r5, [r7 + 0x8]
05a2d0: ldxdw r3, [r5 + 0x0]
05a2d8: add64 r3, 0x1
05a2e0: mov64 r4, 0x1
05a2e8: jeq r3, 0x0, +0x1 ; branch 0x5a2f8
05a2f0: mov64 r4, 0x0
05a2f8: ldxdw r1, [r2 + 0x28]
05a300: ldxdw r8, [r7 + 0x0]
05a308: stxdw [r5 + 0x0], r3
05a310: ldxdw r0, [r10 - 0x198]
05a318: jne r4, 0x1, +0x1 ; branch 0x5a328
05a320: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
05a328: ldxdw r9, [r7 + 0x10]
05a330: ldxdw r3, [r9 + 0x0]
05a338: add64 r3, 0x1
05a340: mov64 r4, 0x1
05a348: jeq r3, 0x0, +0x1 ; branch 0x5a358
05a350: mov64 r4, 0x0
05a358: stxdw [r9 + 0x0], r3
05a360: jne r4, 0x1, +0x1 ; branch 0x5a370
05a368: ja -0xa ; branch 0x5a320
05a370: stxdw [r10 - 0x1b8], r8
05a378: ldxdw r1, [r1 + 0x20]
05a380: ldxdw r3, [r1 + 0x8]
05a388: stxdw [r10 - 0x1a8], r3
05a390: ldxdw r3, [r3 + 0x0]
05a398: add64 r3, 0x1
05a3a0: mov64 r4, 0x1
05a3a8: jeq r3, 0x0, +0x1 ; branch 0x5a3b8
05a3b0: mov64 r4, 0x0
05a3b8: ldxb r8, [r7 + 0x2a]
05a3c0: stxdw [r10 - 0x1e8], r8
05a3c8: ldxb r8, [r7 + 0x29]
05a3d0: stxdw [r10 - 0x1e0], r8
05a3d8: ldxb r8, [r7 + 0x28]
05a3e0: stxdw [r10 - 0x1d8], r8
05a3e8: ldxdw r8, [r7 + 0x20]
05a3f0: stxdw [r10 - 0x1d0], r8
05a3f8: ldxdw r7, [r7 + 0x18]
05a400: stxdw [r10 - 0x1c8], r7
05a408: ldxdw r7, [r1 + 0x0]
05a410: stxdw [r10 - 0x1c0], r7
05a418: ldxdw r7, [r10 - 0x1a8]
05a420: stxdw [r7 + 0x0], r3
05a428: jne r4, 0x1, +0x1 ; branch 0x5a438
05a430: ja -0x23 ; branch 0x5a320
05a438: ldxdw r7, [r1 + 0x10]
05a440: ldxdw r3, [r7 + 0x0]
05a448: add64 r3, 0x1
05a450: mov64 r4, 0x1
05a458: jeq r3, 0x0, +0x1 ; branch 0x5a468
05a460: mov64 r4, 0x0
05a468: stxdw [r7 + 0x0], r3
05a470: jne r4, 0x1, +0x1 ; branch 0x5a480
05a478: ja -0x2c ; branch 0x5a320
05a480: ldxdw r3, [r6 + 0x8]
05a488: stxdw [r10 - 0x1b0], r3
05a490: ldxdw r3, [r3 + 0x0]
05a498: add64 r3, 0x1
05a4a0: mov64 r4, 0x1
05a4a8: jeq r3, 0x0, +0x1 ; branch 0x5a4b8
05a4b0: mov64 r4, 0x0
05a4b8: ldxdw r8, [r6 + 0x0]
05a4c0: stxdw [r10 - 0x218], r8
05a4c8: ldxb r8, [r1 + 0x2a]
05a4d0: stxdw [r10 - 0x210], r8
05a4d8: ldxb r8, [r1 + 0x29]
05a4e0: stxdw [r10 - 0x208], r8
05a4e8: ldxb r8, [r1 + 0x28]
05a4f0: stxdw [r10 - 0x200], r8
05a4f8: ldxdw r8, [r1 + 0x20]
05a500: stxdw [r10 - 0x1f8], r8
05a508: ldxdw r1, [r1 + 0x18]
05a510: stxdw [r10 - 0x1f0], r1
05a518: ldxdw r1, [r10 - 0x1b0]
05a520: stxdw [r1 + 0x0], r3
05a528: jne r4, 0x1, +0x1 ; branch 0x5a538
05a530: ja -0x43 ; branch 0x5a320
05a538: ldxdw r8, [r6 + 0x10]
05a540: ldxdw r1, [r8 + 0x0]
05a548: add64 r1, 0x1
05a550: mov64 r3, 0x1
05a558: jeq r1, 0x0, +0x1 ; branch 0x5a568
05a560: mov64 r3, 0x0
05a568: stxdw [r10 - 0x220], r7
05a570: stxdw [r8 + 0x0], r1
05a578: jne r3, 0x1, +0x1 ; branch 0x5a588
05a580: ja -0x4d ; branch 0x5a320
05a588: ldxdw r7, [r2 + 0x20]
05a590: ldxdw r3, [r7 + 0x8]
05a598: ldxdw r1, [r3 + 0x0]
05a5a0: add64 r1, 0x1
05a5a8: mov64 r2, 0x1
05a5b0: jeq r1, 0x0, +0x1 ; branch 0x5a5c0
05a5b8: mov64 r2, 0x0
05a5c0: ldxb r4, [r6 + 0x2a]
05a5c8: stxdw [r10 - 0x240], r4
05a5d0: ldxb r4, [r6 + 0x29]
05a5d8: stxdw [r10 - 0x238], r4
05a5e0: ldxb r4, [r6 + 0x28]
05a5e8: stxdw [r10 - 0x230], r4
05a5f0: ldxdw r4, [r6 + 0x20]
05a5f8: stxdw [r10 - 0x228], r4
05a600: ldxdw r6, [r6 + 0x18]
05a608: ldxdw r4, [r7 + 0x0]
05a610: stxdw [r10 - 0x248], r4
05a618: stxdw [r3 + 0x0], r1
05a620: jne r2, 0x1, +0x1 ; branch 0x5a630
05a628: ja -0x62 ; branch 0x5a320
05a630: ldxdw r4, [r7 + 0x10]
05a638: ldxdw r1, [r4 + 0x0]
05a640: add64 r1, 0x1
05a648: mov64 r2, 0x1
05a650: jeq r1, 0x0, +0x1 ; branch 0x5a660
05a658: mov64 r2, 0x0
05a660: stxdw [r10 - 0x250], r3
05a668: stxdw [r4 + 0x0], r1
05a670: jne r2, 0x1, +0x1 ; branch 0x5a680
05a678: ja -0x6c ; branch 0x5a320
05a680: stxdw [r10 - 0x260], r6
05a688: stxdw [r10 - 0x258], r9
05a690: ldxdw r1, [r0 + 0x8]
05a698: ldxdw r2, [r1 + 0x0]
05a6a0: add64 r2, 0x1
05a6a8: mov64 r3, 0x1
05a6b0: jeq r2, 0x0, +0x1 ; branch 0x5a6c0
05a6b8: mov64 r3, 0x0
05a6c0: ldxdw r6, [r0 + 0x0]
05a6c8: stxdw [r10 - 0x268], r6
05a6d0: ldxb r6, [r7 + 0x2a]
05a6d8: ldxb r9, [r7 + 0x29]
05a6e0: stxdw [r10 - 0x280], r9
05a6e8: ldxb r9, [r7 + 0x28]
05a6f0: stxdw [r10 - 0x278], r9
05a6f8: ldxdw r9, [r7 + 0x20]
05a700: stxdw [r10 - 0x270], r9
05a708: ldxdw r9, [r7 + 0x18]
05a710: stxdw [r1 + 0x0], r2
05a718: jne r3, 0x1, +0x1 ; branch 0x5a728
05a720: ja -0x81 ; branch 0x5a320
05a728: stxdw [r10 - 0x290], r8
05a730: ldxdw r7, [r0 + 0x10]
05a738: ldxdw r2, [r7 + 0x0]
05a740: add64 r2, 0x1
05a748: mov64 r3, 0x1
05a750: jeq r2, 0x0, +0x1 ; branch 0x5a760
05a758: mov64 r3, 0x0
05a760: ldxdw r8, [r10 - 0x1c0]
05a768: ldxdw r8, [r10 - 0x1b8]
05a770: stxdw [r10 - 0x288], r5
05a778: stxdw [r7 + 0x0], r2
05a780: jne r3, 0x1, +0x1 ; branch 0x5a790
05a788: ja -0x8e ; branch 0x5a320
05a790: ldxdw r8, [r0 + 0x18]
05a798: ldxdw r2, [r0 + 0x20]
05a7a0: ldxb r3, [r0 + 0x28]
05a7a8: ldxb r5, [r0 + 0x29]
05a7b0: ldxb r0, [r0 + 0x2a]
05a7b8: stxb [r10 - 0x16], r6
05a7c0: ldxdw r6, [r10 - 0x280]
05a7c8: stxb [r10 - 0x17], r6
05a7d0: ldxdw r6, [r10 - 0x278]
05a7d8: stxb [r10 - 0x18], r6
05a7e0: ldxdw r6, [r10 - 0x270]
05a7e8: stxdw [r10 - 0x20], r6
05a7f0: stxdw [r10 - 0x28], r9
05a7f8: stxdw [r10 - 0x30], r4
05a800: ldxdw r4, [r10 - 0x250]
05a808: stxdw [r10 - 0x38], r4
05a810: ldxdw r4, [r10 - 0x248]
05a818: stxdw [r10 - 0x40], r4
05a820: ldxdw r4, [r10 - 0x240]
05a828: stxb [r10 - 0x46], r4
05a830: ldxdw r4, [r10 - 0x238]
05a838: stxb [r10 - 0x47], r4
05a840: ldxdw r4, [r10 - 0x230]
05a848: stxb [r10 - 0x48], r4
05a850: ldxdw r4, [r10 - 0x228]
05a858: stxdw [r10 - 0x50], r4
05a860: ldxdw r4, [r10 - 0x260]
05a868: stxdw [r10 - 0x58], r4
05a870: ldxdw r4, [r10 - 0x290]
05a878: stxdw [r10 - 0x60], r4
05a880: ldxdw r4, [r10 - 0x1b0]
05a888: stxdw [r10 - 0x68], r4
05a890: ldxdw r4, [r10 - 0x218]
05a898: stxdw [r10 - 0x70], r4
05a8a0: stxb [r10 - 0x76], r0
05a8a8: stxb [r10 - 0x77], r5
05a8b0: stxb [r10 - 0x78], r3
05a8b8: stxdw [r10 - 0x80], r2
05a8c0: stxdw [r10 - 0x88], r8
05a8c8: stxdw [r10 - 0x90], r7
05a8d0: stxdw [r10 - 0x98], r1
05a8d8: ldxdw r1, [r10 - 0x268]
05a8e0: stxdw [r10 - 0xa0], r1
05a8e8: ldxdw r1, [r10 - 0x210]
05a8f0: stxb [r10 - 0xa6], r1
05a8f8: ldxdw r1, [r10 - 0x208]
05a900: stxb [r10 - 0xa7], r1
05a908: ldxdw r1, [r10 - 0x200]
05a910: stxb [r10 - 0xa8], r1
05a918: ldxdw r1, [r10 - 0x1f8]
05a920: stxdw [r10 - 0xb0], r1
05a928: ldxdw r1, [r10 - 0x1f0]
05a930: stxdw [r10 - 0xb8], r1
05a938: ldxdw r1, [r10 - 0x220]
05a940: stxdw [r10 - 0xc0], r1
05a948: ldxdw r1, [r10 - 0x1a8]
05a950: stxdw [r10 - 0xc8], r1
05a958: ldxdw r1, [r10 - 0x1c0]
05a960: stxdw [r10 - 0xd0], r1
05a968: ldxdw r1, [r10 - 0x1e8]
05a970: stxb [r10 - 0xd6], r1
05a978: ldxdw r1, [r10 - 0x1e0]
05a980: stxb [r10 - 0xd7], r1
05a988: ldxdw r1, [r10 - 0x1d8]
05a990: stxb [r10 - 0xd8], r1
05a998: ldxdw r1, [r10 - 0x1d0]
05a9a0: stxdw [r10 - 0xe0], r1
05a9a8: ldxdw r1, [r10 - 0x1c8]
05a9b0: stxdw [r10 - 0xe8], r1
05a9b8: ldxdw r1, [r10 - 0x258]
05a9c0: stxdw [r10 - 0xf0], r1
05a9c8: ldxdw r1, [r10 - 0x288]
05a9d0: stxdw [r10 - 0xf8], r1
05a9d8: ldxdw r1, [r10 - 0x1b8]
05a9e0: stxdw [r10 - 0x100], r1
05a9e8: stdw [r10 - 0x8], 0x0
05a9f0: stdw [r10 - 0x10], 0x8
05a9f8: stdw [r10 - 0x108], 0x0
05aa00: stdw [r10 - 0x110], 0x8
05aa08: stdw [r10 - 0x118], 0x0
05aa10: mov64 r1, r10
05aa18: add64 r1, -0x180
05aa20: mov64 r2, r10
05aa28: add64 r2, -0x118
05aa30: ldxdw r3, [r10 - 0x190]
05aa38: ldxdw r4, [r10 - 0x1a0]
05aa40: call 0x24a50 ; direct target 0x17fcc8
05aa48: ldxdw r3, [r10 - 0x178]
05aa50: ldxdw r1, [r10 - 0x180]
05aa58: ja +0x1d ; branch 0x5ab48
05aa60: ldxdw r2, [r9 + 0x20]
05aa68: ldxdw r1, [r2 + 0x18]
05aa70: stxdw [r10 - 0x138], r1
05aa78: ldxdw r1, [r2 + 0x10]
05aa80: stxdw [r10 - 0x140], r1
05aa88: ldxdw r1, [r2 + 0x8]
05aa90: stxdw [r10 - 0x148], r1
05aa98: stxdw [r10 - 0x1a8], r2
05aaa0: ldxdw r1, [r2 + 0x0]
05aaa8: stxdw [r10 - 0x150], r1
05aab0: ldxdw r8, [r6 + 0x0]
05aab8: ldxdw r1, [r8 + 0x18]
05aac0: stxdw [r10 - 0x100], r1
05aac8: ldxdw r1, [r8 + 0x10]
05aad0: stxdw [r10 - 0x108], r1
05aad8: ldxdw r1, [r8 + 0x8]
05aae0: stxdw [r10 - 0x110], r1
05aae8: ldxdw r1, [r8 + 0x0]
05aaf0: stxdw [r10 - 0x118], r1
05aaf8: mov64 r1, r10
05ab00: add64 r1, -0x150
05ab08: mov64 r2, r10
05ab10: add64 r2, -0x118
05ab18: mov64 r3, 0x20
05ab20: call 0x2b16a ; direct target 0x1b3678
05ab28: mov64 r1, 0x2
05ab30: lsh64 r0, 0x20
05ab38: rsh64 r0, 0x20
05ab40: jne r0, 0x0, +0x4 ; branch 0x5ab68
05ab48: ldxdw r2, [r10 - 0x188]
05ab50: stxdw [r2 + 0x8], r3
05ab58: stxdw [r2 + 0x0], r1
05ab60: exit
05ab68: ldxb r1, [r9 + 0x80]
05ab70: mov64 r2, r10
05ab78: add64 r2, -0x119
05ab80: stxdw [r10 - 0x130], r2
05ab88: stxdw [r10 - 0x140], r9
05ab90: lddw r2, 0x1b683a ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding-curveprograms/pump/src/buy_v2.rsbuybuy_exact_quote_inprograms/pump/src/create_v2.rsquote-con'
05aba0: stxdw [r10 - 0x150], r2
05aba8: stxb [r10 - 0x119], r1
05abb0: mov64 r1, r10
05abb8: add64 r1, -0x150
05abc0: stxdw [r10 - 0x160], r1
05abc8: mov64 r1, 0x2
05abd0: stdw [r10 - 0x128], 0x1
05abd8: stdw [r10 - 0x138], 0x20
05abe0: stdw [r10 - 0x148], 0xd
05abe8: stdw [r10 - 0x158], 0x3
05abf0: ldxdw r2, [r10 - 0x190]
05abf8: jeq r2, 0x0, -0x17 ; branch 0x5ab48
05ac00: ldxdw r4, [r7 + 0x8]
05ac08: ldxdw r1, [r4 + 0x0]
05ac10: add64 r1, 0x1
05ac18: mov64 r2, 0x1
05ac20: jeq r1, 0x0, +0x1 ; branch 0x5ac30
05ac28: mov64 r2, 0x0
05ac30: ldxdw r0, [r7 + 0x0]
05ac38: stxdw [r4 + 0x0], r1
05ac40: ldxdw r5, [r10 - 0x198]
05ac48: jne r2, 0x1, +0x1 ; branch 0x5ac58
05ac50: ja -0x127 ; branch 0x5a320
05ac58: ldxdw r3, [r7 + 0x10]
05ac60: ldxdw r1, [r3 + 0x0]
05ac68: add64 r1, 0x1
05ac70: mov64 r2, 0x1
05ac78: jeq r1, 0x0, +0x1 ; branch 0x5ac88
05ac80: mov64 r2, 0x0
05ac88: stxdw [r3 + 0x0], r1
05ac90: jne r2, 0x1, +0x1 ; branch 0x5aca0
05ac98: ja -0x130 ; branch 0x5a320
05aca0: stxdw [r10 - 0x1c0], r4
05aca8: ldxdw r1, [r9 + 0x28]
05acb0: stxdw [r10 - 0x1b0], r1
05acb8: ldxdw r1, [r1 + 0x0]
05acc0: add64 r1, 0x1
05acc8: mov64 r2, 0x1
05acd0: jeq r1, 0x0, +0x1 ; branch 0x5ace0
05acd8: mov64 r2, 0x0
05ace0: ldxb r4, [r7 + 0x2a]
05ace8: stxdw [r10 - 0x1f0], r4
05acf0: ldxb r4, [r7 + 0x29]
05acf8: stxdw [r10 - 0x1e8], r4
05ad00: ldxb r4, [r7 + 0x28]
05ad08: stxdw [r10 - 0x1e0], r4
05ad10: ldxdw r4, [r7 + 0x20]
05ad18: stxdw [r10 - 0x1d8], r4
05ad20: ldxdw r7, [r7 + 0x18]
05ad28: stxdw [r10 - 0x1d0], r7
05ad30: ldxdw r7, [r10 - 0x1b0]
05ad38: stxdw [r7 + 0x0], r1
05ad40: jne r2, 0x1, +0x1 ; branch 0x5ad50
05ad48: ja -0x146 ; branch 0x5a320
05ad50: ldxdw r4, [r9 + 0x30]
05ad58: ldxdw r1, [r4 + 0x0]
05ad60: add64 r1, 0x1
05ad68: mov64 r2, 0x1
05ad70: jeq r1, 0x0, +0x1 ; branch 0x5ad80
05ad78: mov64 r2, 0x0
05ad80: stxdw [r4 + 0x0], r1
05ad88: jne r2, 0x1, +0x1 ; branch 0x5ad98
05ad90: ja -0x14f ; branch 0x5a320
05ad98: mov64 r5, r0
05ada0: ldxdw r7, [r6 + 0x8]
05ada8: ldxdw r1, [r7 + 0x0]
05adb0: add64 r1, 0x1
05adb8: mov64 r2, 0x1
05adc0: jeq r1, 0x0, +0x1 ; branch 0x5add0
05adc8: mov64 r2, 0x0
05add0: ldxb r0, [r9 + 0x4a]
05add8: stxdw [r10 - 0x218], r0
05ade0: ldxb r0, [r9 + 0x49]
05ade8: stxdw [r10 - 0x210], r0
05adf0: ldxb r0, [r9 + 0x48]
05adf8: stxdw [r10 - 0x208], r0
05ae00: ldxdw r0, [r9 + 0x40]
05ae08: stxdw [r10 - 0x200], r0
05ae10: ldxdw r0, [r9 + 0x38]
05ae18: stxdw [r10 - 0x1f8], r0
05ae20: stxdw [r7 + 0x0], r1
05ae28: jne r2, 0x1, +0x1 ; branch 0x5ae38
05ae30: ja -0x163 ; branch 0x5a320
05ae38: ldxdw r1, [r6 + 0x10]
05ae40: stxdw [r10 - 0x1b8], r1
05ae48: ldxdw r1, [r1 + 0x0]
05ae50: add64 r1, 0x1
05ae58: mov64 r2, 0x1
05ae60: mov64 r0, r5
05ae68: jeq r1, 0x0, +0x1 ; branch 0x5ae78
05ae70: mov64 r2, 0x0
05ae78: ldxdw r5, [r10 - 0x1b8]
05ae80: stxdw [r5 + 0x0], r1
05ae88: ldxdw r5, [r10 - 0x198]
05ae90: jne r2, 0x1, +0x1 ; branch 0x5aea0
05ae98: ja -0x170 ; branch 0x5a320
05aea0: ldxdw r1, [r9 + 0x58]
05aea8: stxdw [r10 - 0x1c8], r1
05aeb0: ldxdw r1, [r1 + 0x0]
05aeb8: add64 r1, 0x1
05aec0: mov64 r2, 0x1
05aec8: jeq r1, 0x0, +0x1 ; branch 0x5aed8
05aed0: mov64 r2, 0x0
05aed8: stxdw [r10 - 0x220], r3
05aee0: ldxdw r3, [r9 + 0x50]
05aee8: stxdw [r10 - 0x248], r3
05aef0: ldxb r3, [r6 + 0x2a]
05aef8: stxdw [r10 - 0x240], r3
05af00: ldxb r3, [r6 + 0x29]
05af08: stxdw [r10 - 0x238], r3
05af10: ldxb r3, [r6 + 0x28]
05af18: stxdw [r10 - 0x230], r3
05af20: ldxdw r3, [r6 + 0x20]
05af28: stxdw [r10 - 0x228], r3
05af30: ldxdw r6, [r6 + 0x18]
05af38: ldxdw r3, [r10 - 0x1c8]
05af40: stxdw [r3 + 0x0], r1
05af48: jne r2, 0x1, +0x1 ; branch 0x5af58
05af50: ja -0x187 ; branch 0x5a320
05af58: ldxdw r3, [r9 + 0x60]
05af60: ldxdw r1, [r3 + 0x0]
05af68: add64 r1, 0x1
05af70: mov64 r2, 0x1
05af78: jeq r1, 0x0, +0x1 ; branch 0x5af88
05af80: mov64 r2, 0x0
05af88: stxdw [r10 - 0x250], r0
05af90: stxdw [r3 + 0x0], r1
05af98: jne r2, 0x1, +0x1 ; branch 0x5afa8
05afa0: ja -0x191 ; branch 0x5a320
05afa8: stxdw [r10 - 0x260], r7
05afb0: stxdw [r10 - 0x258], r4
05afb8: ldxdw r1, [r5 + 0x8]
05afc0: ldxdw r2, [r1 + 0x0]
05afc8: add64 r2, 0x1
05afd0: mov64 r4, 0x1
05afd8: jeq r2, 0x0, +0x1 ; branch 0x5afe8
05afe0: mov64 r4, 0x0
05afe8: ldxdw r0, [r5 + 0x0]
05aff0: ldxb r7, [r9 + 0x7a]
05aff8: stxdw [r10 - 0x280], r7
05b000: ldxb r7, [r9 + 0x79]
05b008: stxdw [r10 - 0x278], r7
05b010: ldxb r7, [r9 + 0x78]
05b018: stxdw [r10 - 0x270], r7
05b020: ldxdw r7, [r9 + 0x70]
05b028: stxdw [r10 - 0x268], r7
05b030: ldxdw r7, [r9 + 0x68]
05b038: stxdw [r1 + 0x0], r2
05b040: jne r4, 0x1, +0x1 ; branch 0x5b050
05b048: ja -0x1a6 ; branch 0x5a320
05b050: stxdw [r10 - 0x290], r7
05b058: stxdw [r10 - 0x288], r0
05b060: ldxdw r9, [r5 + 0x10]
05b068: ldxdw r2, [r9 + 0x0]
05b070: add64 r2, 0x1
05b078: mov64 r4, 0x1
05b080: jeq r2, 0x0, +0x1 ; branch 0x5b090
05b088: mov64 r4, 0x0
05b090: mov64 r7, r6
05b098: ldxdw r0, [r10 - 0x1c0]
05b0a0: stxdw [r9 + 0x0], r2
05b0a8: jne r4, 0x1, +0x1 ; branch 0x5b0b8
05b0b0: ja -0x1b3 ; branch 0x5a320
05b0b8: mov64 r6, r5
05b0c0: ldxdw r2, [r6 + 0x18]
05b0c8: stxdw [r10 - 0x298], r2
05b0d0: ldxdw r2, [r6 + 0x20]
05b0d8: ldxb r4, [r6 + 0x28]
05b0e0: ldxb r5, [r6 + 0x29]
05b0e8: ldxb r6, [r6 + 0x2a]
05b0f0: ldxdw r0, [r10 - 0x280]
05b0f8: stxb [r10 - 0x16], r0
05b100: ldxdw r0, [r10 - 0x278]
05b108: stxb [r10 - 0x17], r0
05b110: ldxdw r0, [r10 - 0x270]
05b118: stxb [r10 - 0x18], r0
05b120: ldxdw r0, [r10 - 0x268]
05b128: stxdw [r10 - 0x20], r0
05b130: ldxdw r0, [r10 - 0x290]
05b138: stxdw [r10 - 0x28], r0
05b140: stxdw [r10 - 0x30], r3
05b148: ldxdw r3, [r10 - 0x1c8]
05b150: stxdw [r10 - 0x38], r3
05b158: ldxdw r3, [r10 - 0x248]
05b160: stxdw [r10 - 0x40], r3
05b168: ldxdw r3, [r10 - 0x240]
05b170: stxb [r10 - 0x46], r3
05b178: ldxdw r3, [r10 - 0x238]
05b180: stxb [r10 - 0x47], r3
05b188: ldxdw r3, [r10 - 0x230]
05b190: stxb [r10 - 0x48], r3
05b198: ldxdw r3, [r10 - 0x228]
05b1a0: stxdw [r10 - 0x50], r3
05b1a8: stxdw [r10 - 0x58], r7
05b1b0: ldxdw r3, [r10 - 0x1b8]
05b1b8: stxdw [r10 - 0x60], r3
05b1c0: ldxdw r3, [r10 - 0x260]
05b1c8: stxdw [r10 - 0x68], r3
05b1d0: stxdw [r10 - 0x70], r8
05b1d8: stxb [r10 - 0x76], r6
05b1e0: stxb [r10 - 0x77], r5
05b1e8: stxb [r10 - 0x78], r4
05b1f0: stxdw [r10 - 0x80], r2
05b1f8: ldxdw r2, [r10 - 0x298]
05b200: stxdw [r10 - 0x88], r2
05b208: stxdw [r10 - 0x90], r9
05b210: stxdw [r10 - 0x98], r1
05b218: ldxdw r1, [r10 - 0x288]
05b220: stxdw [r10 - 0xa0], r1
05b228: ldxdw r1, [r10 - 0x218]
05b230: stxb [r10 - 0xa6], r1
05b238: ldxdw r1, [r10 - 0x210]
05b240: stxb [r10 - 0xa7], r1
05b248: ldxdw r1, [r10 - 0x208]
05b250: stxb [r10 - 0xa8], r1
05b258: ldxdw r1, [r10 - 0x200]
05b260: stxdw [r10 - 0xb0], r1
05b268: ldxdw r1, [r10 - 0x1f8]
05b270: stxdw [r10 - 0xb8], r1
05b278: ldxdw r1, [r10 - 0x258]
05b280: stxdw [r10 - 0xc0], r1
05b288: ldxdw r1, [r10 - 0x1b0]
05b290: stxdw [r10 - 0xc8], r1
05b298: ldxdw r1, [r10 - 0x1a8]
05b2a0: stxdw [r10 - 0xd0], r1
05b2a8: mov64 r1, r10
05b2b0: add64 r1, -0x160
05b2b8: stxdw [r10 - 0x10], r1
05b2c0: ldxdw r1, [r10 - 0x1f0]
05b2c8: stxb [r10 - 0xd6], r1
05b2d0: ldxdw r1, [r10 - 0x1e8]
05b2d8: stxb [r10 - 0xd7], r1
05b2e0: ldxdw r1, [r10 - 0x1e0]
05b2e8: stxb [r10 - 0xd8], r1
05b2f0: ldxdw r1, [r10 - 0x1d8]
05b2f8: stxdw [r10 - 0xe0], r1
05b300: ldxdw r1, [r10 - 0x1d0]
05b308: stxdw [r10 - 0xe8], r1
05b310: ldxdw r1, [r10 - 0x220]
05b318: stxdw [r10 - 0xf0], r1
05b320: ldxdw r1, [r10 - 0x1c0]
05b328: stxdw [r10 - 0xf8], r1
05b330: ldxdw r1, [r10 - 0x250]
05b338: stxdw [r10 - 0x100], r1
05b340: stdw [r10 - 0x8], 0x1
05b348: stdw [r10 - 0x108], 0x0
05b350: stdw [r10 - 0x110], 0x8
05b358: stdw [r10 - 0x118], 0x0
05b360: mov64 r1, r10
05b368: add64 r1, -0x170
05b370: mov64 r2, r10
05b378: add64 r2, -0x118
05b380: ldxdw r3, [r10 - 0x190]
05b388: ldxdw r4, [r10 - 0x1a0]
05b390: call 0x24926 ; direct target 0x17fcc8
05b398: ldxdw r3, [r10 - 0x168]
05b3a0: ldxdw r1, [r10 - 0x170]
05b3a8: ja -0x10d ; branch 0x5ab48
