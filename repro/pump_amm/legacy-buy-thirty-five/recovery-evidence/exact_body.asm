03a5a0: mov64 r6, r1
03a5a8: ldxdw r7, [r2 + 0x8]
03a5b0: ldxdw r1, [r7 + 0x130]
03a5b8: ldxb r1, [r1 + 0x3b0]
03a5c0: and64 r1, 0x8
03a5c8: jne r1, 0x0, +0xad ; branch 0x3ab38
03a5d0: stxdw [r10 - 0x658], r3
03a5d8: stxdw [r10 - 0x668], r5
03a5e0: stxdw [r10 - 0x650], r4
03a5e8: stxdw [r10 - 0x660], r2
03a5f0: ldxdw r1, [r7 + 0x120]
03a5f8: ldxdw r2, [r1 + 0x0]
03a600: ldxdw r4, [r7 + 0x128]
03a608: ldxdw r3, [r7 + 0x180]
03a610: mov64 r1, r10
03a618: add64 r1, -0x408
03a620: call 0x3b40 ; call 0x58028
03a628: ldxdw r8, [r10 - 0x408]
03a630: jeq r8, 0x2, +0x1 ; branch 0x3a640
03a638: ja +0x1a ; branch 0x3a710
03a640: ldxdw r3, [r7 + 0x90]
03a648: ldxdw r2, [r7 + 0x130]
03a650: ldxdw r1, [r7 + 0x120]
03a658: ldxb r4, [r1 + 0x11b]
03a660: mov64 r1, r10
03a668: add64 r1, -0x418
03a670: call 0x3cf2 ; call 0x58e08
03a678: ldxdw r8, [r10 - 0x418]
03a680: jeq r8, 0x2, +0x1 ; branch 0x3a690
03a688: ja +0x12 ; branch 0x3a720
03a690: ldxdw r1, [r10 - 0x650]
03a698: jeq r1, 0x0, +0x40 ; branch 0x3a8a0
03a6a0: ldxdw r1, [r10 - 0x658]
03a6a8: jeq r1, 0x0, +0x78 ; branch 0x3aa70
03a6b0: ldxdw r1, [r7 + 0x140]
03a6b8: ldxdw r2, [r1 + 0x58]
03a6c0: ldxdw r1, [r2 + 0x8]
03a6c8: ldxdw r4, [r1 + 0x0]
03a6d0: add64 r4, 0x1
03a6d8: mov64 r5, 0x1
03a6e0: jeq r4, 0x0, +0x1 ; branch 0x3a6f0
03a6e8: mov64 r5, 0x0
03a6f0: ldxdw r3, [r2 + 0x0]
03a6f8: stxdw [r1 + 0x0], r4
03a700: jne r5, 0x1, +0x5 ; branch 0x3a730
03a708: call -0x1
03a710: ldxdw r1, [r10 - 0x400]
03a718: ja +0xc0 ; branch 0x3ad20
03a720: ldxdw r1, [r10 - 0x410]
03a728: ja +0xbe ; branch 0x3ad20
03a730: ldxdw r4, [r2 + 0x10]
03a738: ldxdw r5, [r4 + 0x0]
03a740: add64 r5, 0x1
03a748: mov64 r0, 0x1
03a750: jeq r5, 0x0, +0x1 ; branch 0x3a760
03a758: mov64 r0, 0x0
03a760: stxdw [r4 + 0x0], r5
03a768: jne r0, 0x1, +0x1 ; branch 0x3a778
03a770: ja -0xe ; branch 0x3a708
03a778: ldxdw r5, [r2 + 0x18]
03a780: ldxdw r0, [r2 + 0x20]
03a788: ldxb r8, [r2 + 0x28]
03a790: ldxb r9, [r2 + 0x29]
03a798: ldxb r2, [r2 + 0x2a]
03a7a0: stxb [r10 - 0x396], r2
03a7a8: stxb [r10 - 0x397], r9
03a7b0: stxb [r10 - 0x398], r8
03a7b8: stxdw [r10 - 0x3a0], r0
03a7c0: stxdw [r10 - 0x3a8], r5
03a7c8: stxdw [r10 - 0x3b0], r4
03a7d0: stxdw [r10 - 0x3b8], r1
03a7d8: stxdw [r10 - 0x3c0], r3
03a7e0: mov64 r1, r10
03a7e8: add64 r1, -0xb8
03a7f0: mov64 r2, r10
03a7f8: add64 r2, -0x3c0
03a800: call 0x7324 ; call 0x74128
03a808: ldxdw r1, [r10 - 0xa8]
03a810: ldxdw r8, [r10 - 0xb0]
03a818: ldxdw r2, [r10 - 0xb8]
03a820: jeq r2, 0x2, +0x1 ; branch 0x3a830
03a828: ja +0xc2 ; branch 0x3ae40
03a830: ldxdw r2, [r10 - 0x3b0]
03a838: ldxdw r3, [r10 - 0x3b8]
03a840: ldxdw r4, [r3 + 0x0]
03a848: add64 r4, -0x1
03a850: stxdw [r3 + 0x0], r4
03a858: jne r4, 0x0, +0x3 ; branch 0x3a878
03a860: ldxdw r4, [r3 + 0x8]
03a868: add64 r4, -0x1
03a870: stxdw [r3 + 0x8], r4
03a878: ldxdw r3, [r2 + 0x0]
03a880: add64 r3, -0x1
03a888: stxdw [r2 + 0x0], r3
03a890: jne r3, 0x0, +0x91 ; branch 0x3ad20
03a898: ja +0x5ed ; branch 0x3d808
03a8a0: mov64 r1, r10
03a8a8: add64 r1, -0x20
03a8b0: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
03a8c0: call 0x7566 ; call 0x753f8
03a8c8: stdw [r10 - 0x40], 0x0
03a8d0: stdw [r10 - 0x48], 0x1
03a8d8: stdw [r10 - 0x50], 0x0
03a8e0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03a8f0: stxdw [r10 - 0x90], r1
03a8f8: mov64 r1, r10
03a900: add64 r1, -0x50
03a908: stxdw [r10 - 0x98], r1
03a910: stb [r10 - 0x80], 0x3
03a918: stdw [r10 - 0x88], 0x20
03a920: stdw [r10 - 0xa8], 0x0
03a928: stdw [r10 - 0xb8], 0x0
03a930: mov64 r2, r10
03a938: add64 r2, -0xb8
03a940: lddw r1, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
03a950: call 0x8049 ; call 0x7aba0
03a958: jeq r0, 0x0, +0x1 ; branch 0x3a968
03a960: ja +0x52 ; branch 0x3abf8
03a968: ldxdw r1, [r10 - 0x40]
03a970: stxdw [r10 - 0x378], r1
03a978: ldxdw r1, [r10 - 0x48]
03a980: stxdw [r10 - 0x380], r1
03a988: ldxdw r1, [r10 - 0x50]
03a990: stxdw [r10 - 0x388], r1
03a998: ldxdw r1, [r10 - 0x20]
03a9a0: stxdw [r10 - 0x3a0], r1
03a9a8: ldxdw r1, [r10 - 0x18]
03a9b0: stxdw [r10 - 0x398], r1
03a9b8: ldxdw r1, [r10 - 0x10]
03a9c0: stxdw [r10 - 0x390], r1
03a9c8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03a9d8: stxdw [r10 - 0x3b8], r1
03a9e0: stw [r10 - 0x328], 0x1771
03a9e8: stb [r10 - 0x370], 0x2
03a9f0: stw [r10 - 0x3a8], 0x27c
03a9f8: stdw [r10 - 0x3b0], 0x2e
03aa00: stdw [r10 - 0x3c0], 0x0
03aa08: mov64 r1, r10
03aa10: add64 r1, -0x638
03aa18: mov64 r2, r10
03aa20: add64 r2, -0x3c0
03aa28: call 0x190b1 ; call 0x102fb8
03aa30: ldxdw r3, [r10 - 0x630]
03aa38: ldxdw r2, [r10 - 0x638]
03aa40: mov64 r1, r10
03aa48: add64 r1, -0x648
03aa50: call -0x74e3 ; call 0x340
03aa58: ldxdw r1, [r10 - 0x640]
03aa60: ldxdw r8, [r10 - 0x648]
03aa68: ja +0x56 ; branch 0x3ad20
03aa70: mov64 r1, r10
03aa78: add64 r1, -0x20
03aa80: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
03aa90: call 0x752c ; call 0x753f8
03aa98: stdw [r10 - 0x40], 0x0
03aaa0: stdw [r10 - 0x48], 0x1
03aaa8: stdw [r10 - 0x50], 0x0
03aab0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03aac0: stxdw [r10 - 0x90], r1
03aac8: mov64 r1, r10
03aad0: add64 r1, -0x50
03aad8: stxdw [r10 - 0x98], r1
03aae0: stb [r10 - 0x80], 0x3
03aae8: stdw [r10 - 0x88], 0x20
03aaf0: stdw [r10 - 0xa8], 0x0
03aaf8: stdw [r10 - 0xb8], 0x0
03ab00: mov64 r2, r10
03ab08: add64 r2, -0xb8
03ab10: lddw r1, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
03ab20: call 0x800f ; call 0x7aba0
03ab28: jeq r0, 0x0, +0x41 ; branch 0x3ad38
03ab30: ja +0x18 ; branch 0x3abf8
03ab38: mov64 r1, r10
03ab40: add64 r1, -0x20
03ab48: lddw r2, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
03ab58: call 0x7513 ; call 0x753f8
03ab60: stdw [r10 - 0x40], 0x0
03ab68: stdw [r10 - 0x48], 0x1
03ab70: stdw [r10 - 0x50], 0x0
03ab78: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
03ab88: stxdw [r10 - 0x90], r1
03ab90: mov64 r1, r10
03ab98: add64 r1, -0x50
03aba0: stxdw [r10 - 0x98], r1
03aba8: stb [r10 - 0x80], 0x3
03abb0: stdw [r10 - 0x88], 0x20
03abb8: stdw [r10 - 0xa8], 0x0
03abc0: stdw [r10 - 0xb8], 0x0
03abc8: mov64 r2, r10
03abd0: add64 r2, -0xb8
03abd8: lddw r1, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
03abe8: call 0x7ff6 ; call 0x7aba0
03abf0: jeq r0, 0x0, +0xa ; branch 0x3ac48
03abf8: mov64 r3, r10
03ac00: add64 r3, -0x160
03ac08: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
03ac18: mov64 r2, 0x37
03ac20: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
03ac30: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
03ac40: call 0x1b06a ; call 0x112f98
03ac48: ldxdw r1, [r10 - 0x40]
03ac50: stxdw [r10 - 0x378], r1
03ac58: ldxdw r1, [r10 - 0x48]
03ac60: stxdw [r10 - 0x380], r1
03ac68: ldxdw r1, [r10 - 0x50]
03ac70: stxdw [r10 - 0x388], r1
03ac78: ldxdw r1, [r10 - 0x20]
03ac80: stxdw [r10 - 0x3a0], r1
03ac88: ldxdw r1, [r10 - 0x18]
03ac90: stxdw [r10 - 0x398], r1
03ac98: ldxdw r1, [r10 - 0x10]
03aca0: stxdw [r10 - 0x390], r1
03aca8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03acb8: stxdw [r10 - 0x3b8], r1
03acc0: stw [r10 - 0x328], 0x1784
03acc8: stb [r10 - 0x370], 0x2
03acd0: stw [r10 - 0x3a8], 0x271
03acd8: stdw [r10 - 0x3b0], 0x2e
03ace0: stdw [r10 - 0x3c0], 0x0
03ace8: mov64 r1, r10
03acf0: add64 r1, -0x3f8
03acf8: mov64 r2, r10
03ad00: add64 r2, -0x3c0
03ad08: call 0x19055 ; call 0x102fb8
03ad10: ldxdw r1, [r10 - 0x3f0]
03ad18: ldxdw r8, [r10 - 0x3f8]
03ad20: stxdw [r6 + 0x8], r1
03ad28: stxdw [r6 + 0x0], r8
03ad30: exit
03ad38: ldxdw r1, [r10 - 0x40]
03ad40: stxdw [r10 - 0x378], r1
03ad48: ldxdw r1, [r10 - 0x48]
03ad50: stxdw [r10 - 0x380], r1
03ad58: ldxdw r1, [r10 - 0x50]
03ad60: stxdw [r10 - 0x388], r1
03ad68: ldxdw r1, [r10 - 0x20]
03ad70: stxdw [r10 - 0x3a0], r1
03ad78: ldxdw r1, [r10 - 0x18]
03ad80: stxdw [r10 - 0x398], r1
03ad88: ldxdw r1, [r10 - 0x10]
03ad90: stxdw [r10 - 0x390], r1
03ad98: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03ada8: stxdw [r10 - 0x3b8], r1
03adb0: stw [r10 - 0x328], 0x1772
03adb8: stb [r10 - 0x370], 0x2
03adc0: stw [r10 - 0x3a8], 0x27e
03adc8: stdw [r10 - 0x3b0], 0x2e
03add0: stdw [r10 - 0x3c0], 0x0
03add8: mov64 r1, r10
03ade0: add64 r1, -0x618
03ade8: mov64 r2, r10
03adf0: add64 r2, -0x3c0
03adf8: call 0x19037 ; call 0x102fb8
03ae00: ldxdw r3, [r10 - 0x610]
03ae08: ldxdw r2, [r10 - 0x618]
03ae10: mov64 r1, r10
03ae18: add64 r1, -0x628
03ae20: call -0x755d ; call 0x340
03ae28: ldxdw r1, [r10 - 0x620]
03ae30: ldxdw r8, [r10 - 0x628]
03ae38: ja -0x24 ; branch 0x3ad20
03ae40: ldxdw r3, [r10 - 0xa0]
03ae48: stxdw [r10 - 0x3d0], r3
03ae50: stxdw [r10 - 0x3d8], r1
03ae58: stxdw [r10 - 0x3e0], r8
03ae60: stxdw [r10 - 0x3e8], r2
03ae68: ldxdw r1, [r10 - 0x3b0]
03ae70: ldxdw r2, [r10 - 0x3b8]
03ae78: ldxdw r3, [r2 + 0x0]
03ae80: add64 r3, -0x1
03ae88: stxdw [r2 + 0x0], r3
03ae90: jne r3, 0x0, +0x3 ; branch 0x3aeb0
03ae98: ldxdw r3, [r2 + 0x8]
03aea0: add64 r3, -0x1
03aea8: stxdw [r2 + 0x8], r3
03aeb0: ldxdw r2, [r1 + 0x0]
03aeb8: add64 r2, -0x1
03aec0: stxdw [r1 + 0x0], r2
03aec8: ldxdw r3, [r10 - 0x658]
03aed0: jne r2, 0x0, +0x3 ; branch 0x3aef0
03aed8: ldxdw r2, [r1 + 0x8]
03aee0: add64 r2, -0x1
03aee8: stxdw [r1 + 0x8], r2
03aef0: mov64 r1, r10
03aef8: add64 r1, -0x3c0
03af00: mov64 r2, r10
03af08: add64 r2, -0x3e8
03af10: call 0x733d ; call 0x74900
03af18: ldxdw r8, [r10 - 0x3c0]
03af20: jeq r8, 0x2, +0x1 ; branch 0x3af30
03af28: ja +0x211 ; branch 0x3bfb8
03af30: ldxdw r1, [r10 - 0x3b8]
03af38: jeq r1, 0x0, +0x38 ; branch 0x3b100
03af40: stxdw [r10 - 0x670], r1
03af48: ldxdw r1, [r7 + 0x158]
03af50: ldxdw r1, [r1 + 0x68]
03af58: stxdw [r10 - 0x678], r1
03af60: ldxdw r1, [r7 + 0x150]
03af68: ldxdw r1, [r1 + 0x68]
03af70: stxdw [r10 - 0x680], r1
03af78: ldxdw r1, [r7 + 0x148]
03af80: ldxdw r1, [r1 + 0x68]
03af88: stxdw [r10 - 0x688], r1
03af90: ldxdw r1, [r7 + 0x160]
03af98: ldxdw r9, [r1 + 0x68]
03afa0: ldxdw r2, [r7 + 0x120]
03afa8: add64 r2, 0x8
03afb0: mov64 r1, r10
03afb8: add64 r1, -0x3c0
03afc0: mov64 r3, r9
03afc8: call 0x61a0 ; call 0x6bcd0
03afd0: ldxdw r8, [r10 - 0x3c0]
03afd8: jeq r8, 0x2, +0x1 ; branch 0x3afe8
03afe0: ja +0x1fa ; branch 0x3bfb8
03afe8: ldxdw r2, [r7 + 0x120]
03aff0: add64 r2, 0x8
03aff8: mov64 r1, r10
03b000: add64 r1, -0x3c0
03b008: stxdw [r10 - 0x690], r9
03b010: mov64 r3, r9
03b018: call 0x6261 ; call 0x6c328
03b020: ldxdw r8, [r10 - 0x3c0]
03b028: jeq r8, 0x2, +0x1 ; branch 0x3b038
03b030: ja +0x1f0 ; branch 0x3bfb8
03b038: ldxdw r9, [r10 - 0x3b8]
03b040: ldxdw r3, [r7 + 0x130]
03b048: ldxdw r2, [r7 + 0x120]
03b050: ldxdw r1, [r7 + 0x190]
03b058: ldxdw r4, [r7 + 0x138]
03b060: ldxdw r5, [r10 - 0x670]
03b068: stxdw [r10 - 0xfd8], r5
03b070: ldxdw r5, [r10 - 0x678]
03b078: stxdw [r10 - 0xfe8], r5
03b080: stxdw [r10 - 0xff0], r4
03b088: stxdw [r10 - 0xff8], r1
03b090: mov64 r1, r7
03b098: add64 r1, 0x1b0
03b0a0: stxdw [r10 - 0x1000], r1
03b0a8: stxdw [r10 - 0xfe0], r9
03b0b0: mov64 r1, r10
03b0b8: add64 r1, -0x3c0
03b0c0: mov64 r5, r10
03b0c8: mov64 r4, r7
03b0d0: call -0x4f90 ; call 0x13458
03b0d8: ldxdw r8, [r10 - 0x3b8]
03b0e0: ldxdw r1, [r10 - 0x3c0]
03b0e8: jeq r1, 0x0, +0x21 ; branch 0x3b1f8
03b0f0: ldxdw r1, [r10 - 0x3b0]
03b0f8: ja -0x7c ; branch 0x3ad20
03b100: mov64 r1, r10
03b108: add64 r1, -0x3a0
03b110: lddw r2, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
03b120: call 0x745a ; call 0x753f8
03b128: mov64 r1, r10
03b130: add64 r1, -0x388
03b138: lddw r2, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
03b148: call -0x6536 ; call 0x87a0
03b150: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03b160: stxdw [r10 - 0x3b8], r1
03b168: stb [r10 - 0x370], 0x2
03b170: stw [r10 - 0x3a8], 0x286
03b178: stdw [r10 - 0x3b0], 0x2e
03b180: stdw [r10 - 0x3c0], 0x0
03b188: stw [r10 - 0x328], 0x1797
03b190: mov64 r1, r10
03b198: add64 r1, -0x5f8
03b1a0: mov64 r2, r10
03b1a8: add64 r2, -0x3c0
03b1b0: call 0x18fc0 ; call 0x102fb8
03b1b8: ldxdw r3, [r10 - 0x5f0]
03b1c0: ldxdw r2, [r10 - 0x5f8]
03b1c8: mov64 r1, r10
03b1d0: add64 r1, -0x608
03b1d8: call -0x75d4 ; call 0x340
03b1e0: ldxdw r1, [r10 - 0x600]
03b1e8: ldxdw r8, [r10 - 0x608]
03b1f0: ja -0x9b ; branch 0x3ad20
03b1f8: ldxdw r1, [r10 - 0x3a8]
03b200: stxdw [r10 - 0x6a8], r1
03b208: ldxdw r1, [r10 - 0x3b0]
03b210: stxdw [r10 - 0x698], r1
03b218: ldxdw r1, [r7 + 0x130]
03b220: ldxdw r2, [r7 + 0x128]
03b228: ldxdw r2, [r2 + 0x0]
03b230: ldxdw r3, [r2 + 0x18]
03b238: stxdw [r10 - 0x3a8], r3
03b240: ldxdw r3, [r2 + 0x10]
03b248: stxdw [r10 - 0x3b0], r3
03b250: ldxdw r3, [r2 + 0x8]
03b258: stxdw [r10 - 0x3b8], r3
03b260: ldxdw r2, [r2 + 0x0]
03b268: stxdw [r10 - 0x3c0], r2
03b270: add64 r1, 0x248
03b278: mov64 r2, r10
03b280: add64 r2, -0x3c0
03b288: mov64 r3, 0x20
03b290: call 0x1bcc9 ; call 0x1198e0
03b298: lsh64 r0, 0x20
03b2a0: rsh64 r0, 0x20
03b2a8: mov64 r2, 0x0
03b2b0: jeq r0, 0x0, +0x1 ; branch 0x3b2c0
03b2b8: mov64 r2, r8
03b2c0: mov64 r3, 0x0
03b2c8: jeq r0, 0x0, +0x1 ; branch 0x3b2d8
03b2d0: ldxdw r3, [r10 - 0x698]
03b2d8: mov64 r1, r3
03b2e0: stxdw [r10 - 0x6a0], r2
03b2e8: add64 r1, r2
03b2f0: mov64 r2, 0x1
03b2f8: jlt r1, r3, +0x1 ; branch 0x3b308
03b300: mov64 r2, 0x0
03b308: mov64 r8, -0x1
03b310: jne r2, 0x0, +0x1 ; branch 0x3b320
03b318: mov64 r8, r1
03b320: stxdw [r10 - 0x6b0], r3
03b328: mov64 r1, 0x0
03b330: stxdw [r10 - 0x698], r1
03b338: jeq r0, 0x0, +0x2 ; branch 0x3b350
03b340: ldxdw r1, [r10 - 0x6a8]
03b348: stxdw [r10 - 0x698], r1
03b350: ldxdw r1, [r7 + 0x120]
03b358: stdw [r10 - 0x3a8], 0x0
03b360: stdw [r10 - 0x3b0], 0x0
03b368: stdw [r10 - 0x3b8], 0x0
03b370: stdw [r10 - 0x3c0], 0x0
03b378: add64 r1, 0xc8
03b380: mov64 r2, r10
03b388: add64 r2, -0x3c0
03b390: mov64 r3, 0x20
03b398: call 0x1bca8 ; call 0x1198e0
03b3a0: lsh64 r0, 0x20
03b3a8: rsh64 r0, 0x20
03b3b0: mov64 r2, 0x0
03b3b8: jeq r0, 0x0, +0x1 ; branch 0x3b3c8
03b3c0: ldxdw r2, [r10 - 0x698]
03b3c8: mov64 r1, r8
03b3d0: add64 r1, r2
03b3d8: mov64 r2, 0x1
03b3e0: jlt r1, r8, +0x1 ; branch 0x3b3f0
03b3e8: mov64 r2, 0x0
03b3f0: stxdw [r10 - 0x6a8], r9
03b3f8: mov64 r8, -0x1
03b400: jne r2, 0x0, +0x1 ; branch 0x3b410
03b408: mov64 r8, r1
03b410: ldxdw r2, [r10 - 0x670]
03b418: mov64 r9, r2
03b420: jeq r8, 0x0, +0x12 ; branch 0x3b4b8
03b428: mov64 r1, r10
03b430: add64 r1, -0x428
03b438: mov64 r3, 0x0
03b440: mov64 r4, 0x2710
03b448: mov64 r5, 0x0
03b450: call 0x1c07b ; call 0x11b830
03b458: mov64 r4, r8
03b460: add64 r4, 0x2710
03b468: mov64 r5, 0x1
03b470: jlt r4, r8, +0x1 ; branch 0x3b480
03b478: mov64 r5, 0x0
03b480: mov64 r1, r10
03b488: add64 r1, -0x438
03b490: ldxdw r2, [r10 - 0x428]
03b498: ldxdw r3, [r10 - 0x420]
03b4a0: call 0x1bdc9 ; call 0x11a2f0
03b4a8: ldxdw r9, [r10 - 0x438]
03b4b0: jeq r9, 0x0, +0x40 ; branch 0x3b6b8
03b4b8: mov64 r1, r10
03b4c0: add64 r1, -0x3c0
03b4c8: mov64 r2, r9
03b4d0: ldxdw r3, [r10 - 0x6a0]
03b4d8: call -0x506a ; call 0x13190
03b4e0: ldxdw r8, [r10 - 0x3c0]
03b4e8: jeq r8, 0x2, +0x1 ; branch 0x3b4f8
03b4f0: ja +0x158 ; branch 0x3bfb8
03b4f8: ldxdw r1, [r10 - 0x3b8]
03b500: stxdw [r10 - 0x3c8], r1
03b508: mov64 r1, r10
03b510: add64 r1, -0x3c0
03b518: stxdw [r10 - 0x6b8], r9
03b520: mov64 r2, r9
03b528: ldxdw r3, [r10 - 0x6b0]
03b530: call -0x5075 ; call 0x13190
03b538: ldxdw r8, [r10 - 0x3c0]
03b540: jeq r8, 0x2, +0x1 ; branch 0x3b550
03b548: ja +0x14d ; branch 0x3bfb8
03b550: ldxdw r9, [r10 - 0x3b8]
03b558: ldxdw r1, [r7 + 0x120]
03b560: stdw [r10 - 0x3a8], 0x0
03b568: stdw [r10 - 0x3b0], 0x0
03b570: stdw [r10 - 0x3b8], 0x0
03b578: stdw [r10 - 0x3c0], 0x0
03b580: add64 r1, 0xc8
03b588: mov64 r2, r10
03b590: add64 r2, -0x3c0
03b598: mov64 r3, 0x20
03b5a0: call 0x1bc67 ; call 0x1198e0
03b5a8: lsh64 r0, 0x20
03b5b0: rsh64 r0, 0x20
03b5b8: mov64 r1, 0x0
03b5c0: jeq r0, 0x0, +0x9 ; branch 0x3b610
03b5c8: mov64 r1, r10
03b5d0: add64 r1, -0x3c0
03b5d8: ldxdw r2, [r10 - 0x6b8]
03b5e0: ldxdw r3, [r10 - 0x698]
03b5e8: call -0x508c ; call 0x13190
03b5f0: ldxdw r8, [r10 - 0x3c0]
03b5f8: jeq r8, 0x2, +0x1 ; branch 0x3b608
03b600: ja +0x136 ; branch 0x3bfb8
03b608: ldxdw r1, [r10 - 0x3b8]
03b610: stxdw [r10 - 0x6c0], r1
03b618: ldxdw r1, [r10 - 0x698]
03b620: stxdw [r10 - 0x698], r1
03b628: ldxdw r1, [r10 - 0x678]
03b630: ldxdw r3, [r10 - 0x3c8]
03b638: mov64 r1, r3
03b640: stxdw [r10 - 0x6c8], r9
03b648: add64 r1, r9
03b650: mov64 r2, 0x1
03b658: jlt r1, r3, +0x1 ; branch 0x3b668
03b660: mov64 r2, 0x0
03b668: and64 r2, 0x1
03b670: jne r2, 0x0, +0x1 ; branch 0x3b680
03b678: ja +0x26 ; branch 0x3b7b0
03b680: mov64 r1, r10
03b688: add64 r1, -0x5e8
03b690: mov64 r2, 0x17
03b698: call 0x7e61 ; call 0x7a9a8
03b6a0: ldxdw r1, [r10 - 0x5e0]
03b6a8: ldxdw r8, [r10 - 0x5e8]
03b6b0: ja -0x133 ; branch 0x3ad20
03b6b8: mov64 r1, r10
03b6c0: add64 r1, -0x3a0
03b6c8: lddw r2, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
03b6d8: call 0x73a3 ; call 0x753f8
03b6e0: mov64 r1, r10
03b6e8: add64 r1, -0x388
03b6f0: lddw r2, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
03b700: call -0x65ed ; call 0x87a0
03b708: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03b718: stxdw [r10 - 0x3b8], r1
03b720: stb [r10 - 0x370], 0x2
03b728: stw [r10 - 0x3a8], 0x2bc
03b730: stdw [r10 - 0x3b0], 0x2e
03b738: stdw [r10 - 0x3c0], 0x0
03b740: stw [r10 - 0x328], 0x1797
03b748: mov64 r1, r10
03b750: add64 r1, -0x448
03b758: mov64 r2, r10
03b760: add64 r2, -0x3c0
03b768: call 0x18f09 ; call 0x102fb8
03b770: ldxdw r3, [r10 - 0x440]
03b778: ldxdw r2, [r10 - 0x448]
03b780: mov64 r1, r10
03b788: add64 r1, -0x458
03b790: call -0x768b ; call 0x340
03b798: ldxdw r1, [r10 - 0x450]
03b7a0: ldxdw r8, [r10 - 0x458]
03b7a8: ja -0x152 ; branch 0x3ad20
03b7b0: mov64 r2, r1
03b7b8: ldxdw r3, [r10 - 0x6c0]
03b7c0: add64 r2, r3
03b7c8: mov64 r3, 0x1
03b7d0: jlt r2, r1, +0x1 ; branch 0x3b7e0
03b7d8: mov64 r3, 0x0
03b7e0: and64 r3, 0x1
03b7e8: jne r3, 0x0, -0x2e ; branch 0x3b680
03b7f0: ldxdw r3, [r10 - 0x6b8]
03b7f8: mov64 r1, r3
03b800: add64 r1, r2
03b808: mov64 r2, 0x1
03b810: jlt r1, r3, +0x1 ; branch 0x3b820
03b818: mov64 r2, 0x0
03b820: and64 r2, 0x1
03b828: jne r2, 0x0, +0x15 ; branch 0x3b8d8
03b830: ldxdw r2, [r10 - 0x670]
03b838: jgt r1, r2, +0x1 ; branch 0x3b848
03b840: ja +0x3c ; branch 0x3ba28
03b848: mov64 r3, r1
03b850: ldxdw r2, [r10 - 0x670]
03b858: sub64 r3, r2
03b860: mov64 r2, 0x0
03b868: mov64 r4, 0x1
03b870: jgt r3, r1, +0x1 ; branch 0x3b880
03b878: mov64 r4, 0x0
03b880: jne r4, 0x0, +0x1 ; branch 0x3b890
03b888: mov64 r2, r3
03b890: ldxdw r1, [r10 - 0x6b8]
03b898: jge r1, r2, +0xe ; branch 0x3b910
03b8a0: mov64 r1, r10
03b8a8: add64 r1, -0x5c8
03b8b0: mov64 r2, 0x27
03b8b8: call 0x7e1d ; call 0x7a9a8
03b8c0: ldxdw r1, [r10 - 0x5c0]
03b8c8: ldxdw r8, [r10 - 0x5c8]
03b8d0: ja -0x177 ; branch 0x3ad20
03b8d8: mov64 r1, r10
03b8e0: add64 r1, -0x5d8
03b8e8: mov64 r2, 0x17
03b8f0: call 0x7e16 ; call 0x7a9a8
03b8f8: ldxdw r1, [r10 - 0x5d0]
03b900: ldxdw r8, [r10 - 0x5d8]
03b908: ja -0x17e ; branch 0x3ad20
03b910: ldxdw r1, [r10 - 0x6b8]
03b918: sub64 r1, r2
03b920: stxdw [r10 - 0x6b8], r1
03b928: jne r1, 0x0, +0x1f ; branch 0x3ba28
03b930: mov64 r1, r10
03b938: add64 r1, -0x3a0
03b940: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03b950: call 0x7354 ; call 0x753f8
03b958: mov64 r1, r10
03b960: add64 r1, -0x388
03b968: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03b978: call -0x663c ; call 0x87a0
03b980: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03b990: stxdw [r10 - 0x3b8], r1
03b998: stb [r10 - 0x370], 0x2
03b9a0: stw [r10 - 0x3a8], 0x2dd
03b9a8: stdw [r10 - 0x3b0], 0x2e
03b9b0: stdw [r10 - 0x3c0], 0x0
03b9b8: stw [r10 - 0x328], 0x1798
03b9c0: mov64 r1, r10
03b9c8: add64 r1, -0x5a8
03b9d0: mov64 r2, r10
03b9d8: add64 r2, -0x3c0
03b9e0: call 0x18eba ; call 0x102fb8
03b9e8: ldxdw r3, [r10 - 0x5a0]
03b9f0: ldxdw r2, [r10 - 0x5a8]
03b9f8: mov64 r1, r10
03ba00: add64 r1, -0x5b8
03ba08: call -0x76da ; call 0x340
03ba10: ldxdw r1, [r10 - 0x5b0]
03ba18: ldxdw r8, [r10 - 0x5b8]
03ba20: ja -0x1a1 ; branch 0x3ad20
03ba28: mov64 r1, r10
03ba30: add64 r1, -0x3c0
03ba38: mov64 r2, r10
03ba40: add64 r2, -0x3e8
03ba48: mov64 r3, r10
03ba50: add64 r3, -0x3c8
03ba58: ldxdw r4, [r10 - 0x6b8]
03ba60: call 0x3b8 ; call 0x3d828
03ba68: ldxdw r8, [r10 - 0x3c0]
03ba70: jeq r8, 0x2, +0x1 ; branch 0x3ba80
03ba78: ja +0xa7 ; branch 0x3bfb8
03ba80: ldxdw r3, [r10 - 0x3b8]
03ba88: mov64 r2, r3
03ba90: ldxdw r1, [r10 - 0x6c8]
03ba98: add64 r2, r1
03baa0: mov64 r1, 0x1
03baa8: jlt r2, r3, +0x1 ; branch 0x3bab8
03bab0: mov64 r1, 0x0
03bab8: and64 r1, 0x1
03bac0: jne r1, 0x0, +0x1 ; branch 0x3bad0
03bac8: ja +0x7 ; branch 0x3bb08
03bad0: mov64 r1, r10
03bad8: add64 r1, -0x598
03bae0: mov64 r2, 0x17
03bae8: call 0x7dd7 ; call 0x7a9a8
03baf0: ldxdw r1, [r10 - 0x590]
03baf8: ldxdw r8, [r10 - 0x598]
03bb00: ja -0x1bd ; branch 0x3ad20
03bb08: mov64 r1, r2
03bb10: ldxdw r3, [r10 - 0x6c0]
03bb18: add64 r1, r3
03bb20: mov64 r3, 0x1
03bb28: jlt r1, r2, +0x1 ; branch 0x3bb38
03bb30: mov64 r3, 0x0
03bb38: and64 r3, 0x1
03bb40: jne r3, 0x0, -0xf ; branch 0x3bad0
03bb48: ldxdw r2, [r10 - 0x658]
03bb50: jgt r1, r2, +0x12 ; branch 0x3bbe8
03bb58: ldxdw r1, [r10 - 0x3c8]
03bb60: ldxdw r2, [r10 - 0x6b8]
03bb68: mov64 r3, r2
03bb70: add64 r3, r1
03bb78: mov64 r1, 0x1
03bb80: stxdw [r10 - 0x670], r3
03bb88: jlt r3, r2, +0x1 ; branch 0x3bb98
03bb90: mov64 r1, 0x0
03bb98: and64 r1, 0x1
03bba0: jne r1, 0x0, +0x1 ; branch 0x3bbb0
03bba8: ja +0x19 ; branch 0x3bc78
03bbb0: mov64 r1, r10
03bbb8: add64 r1, -0x558
03bbc0: mov64 r2, 0x17
03bbc8: call 0x7dbb ; call 0x7a9a8
03bbd0: ldxdw r1, [r10 - 0x550]
03bbd8: ldxdw r8, [r10 - 0x558]
03bbe0: ja -0x1d9 ; branch 0x3ad20
03bbe8: mov64 r3, r1
03bbf0: ldxdw r2, [r10 - 0x658]
03bbf8: sub64 r3, r2
03bc00: mov64 r2, 0x0
03bc08: mov64 r4, 0x1
03bc10: jgt r3, r1, +0x1 ; branch 0x3bc20
03bc18: mov64 r4, 0x0
03bc20: jne r4, 0x0, +0x1 ; branch 0x3bc30
03bc28: mov64 r2, r3
03bc30: ldxdw r1, [r10 - 0x6b8]
03bc38: jge r1, r2, +0x1e ; branch 0x3bd30
03bc40: mov64 r1, r10
03bc48: add64 r1, -0x588
03bc50: mov64 r2, 0x27
03bc58: call 0x7da9 ; call 0x7a9a8
03bc60: ldxdw r1, [r10 - 0x580]
03bc68: ldxdw r8, [r10 - 0x588]
03bc70: ja -0x1eb ; branch 0x3ad20
03bc78: mov64 r1, r10
03bc80: add64 r1, -0x3c0
03bc88: mov64 r2, r10
03bc90: add64 r2, -0x3e8
03bc98: mov64 r3, r10
03bca0: add64 r3, -0x3c8
03bca8: ldxdw r4, [r10 - 0x6b8]
03bcb0: call 0x36e ; call 0x3d828
03bcb8: ldxdw r8, [r10 - 0x3c0]
03bcc0: jeq r8, 0x2, +0x1 ; branch 0x3bcd0
03bcc8: ja +0x5d ; branch 0x3bfb8
03bcd0: ldxdw r1, [r10 - 0x3b8]
03bcd8: stxdw [r10 - 0x6d0], r1
03bce0: ldxdw r2, [r10 - 0x670]
03bce8: jlt r1, r2, +0x1 ; branch 0x3bcf8
03bcf0: ja +0x2a ; branch 0x3be48
03bcf8: mov64 r1, r10
03bd00: add64 r1, -0x548
03bd08: mov64 r2, 0x17
03bd10: call 0x7d92 ; call 0x7a9a8
03bd18: ldxdw r1, [r10 - 0x540]
03bd20: ldxdw r8, [r10 - 0x548]
03bd28: ja -0x202 ; branch 0x3ad20
03bd30: ldxdw r1, [r10 - 0x6b8]
03bd38: sub64 r1, r2
03bd40: stxdw [r10 - 0x6b8], r1
03bd48: jne r1, 0x0, -0x3f ; branch 0x3bb58
03bd50: mov64 r1, r10
03bd58: add64 r1, -0x3a0
03bd60: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03bd70: call 0x72d0 ; call 0x753f8
03bd78: mov64 r1, r10
03bd80: add64 r1, -0x388
03bd88: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03bd98: call -0x66c0 ; call 0x87a0
03bda0: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03bdb0: stxdw [r10 - 0x3b8], r1
03bdb8: stb [r10 - 0x370], 0x2
03bdc0: stw [r10 - 0x3a8], 0x2f2
03bdc8: stdw [r10 - 0x3b0], 0x2e
03bdd0: stdw [r10 - 0x3c0], 0x0
03bdd8: stw [r10 - 0x328], 0x1798
03bde0: mov64 r1, r10
03bde8: add64 r1, -0x568
03bdf0: mov64 r2, r10
03bdf8: add64 r2, -0x3c0
03be00: call 0x18e36 ; call 0x102fb8
03be08: ldxdw r3, [r10 - 0x560]
03be10: ldxdw r2, [r10 - 0x568]
03be18: mov64 r1, r10
03be20: add64 r1, -0x578
03be28: call -0x775e ; call 0x340
03be30: ldxdw r1, [r10 - 0x570]
03be38: ldxdw r8, [r10 - 0x578]
03be40: ja -0x225 ; branch 0x3ad20
03be48: mov64 r1, r10
03be50: add64 r1, -0x3c0
03be58: ldxdw r2, [r10 - 0x6b8]
03be60: ldxdw r3, [r10 - 0x678]
03be68: ldxdw r4, [r10 - 0x6a8]
03be70: call -0x536d ; call 0x12310
03be78: ldxdw r8, [r10 - 0x3c0]
03be80: jne r8, 0x2, +0x26 ; branch 0x3bfb8
03be88: ldxdw r2, [r10 - 0x3b8]
03be90: ldxdw r1, [r10 - 0x650]
03be98: stxdw [r10 - 0x6a8], r2
03bea0: jlt r2, r1, +0x1 ; branch 0x3beb0
03bea8: ja +0x23 ; branch 0x3bfc8
03beb0: mov64 r1, r10
03beb8: add64 r1, -0x3a0
03bec0: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03bed0: call 0x72a4 ; call 0x753f8
03bed8: mov64 r1, r10
03bee0: add64 r1, -0x388
03bee8: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
03bef8: call -0x66ec ; call 0x87a0
03bf00: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03bf10: stxdw [r10 - 0x3b8], r1
03bf18: stb [r10 - 0x370], 0x2
03bf20: stw [r10 - 0x3a8], 0x308
03bf28: stdw [r10 - 0x3b0], 0x2e
03bf30: stdw [r10 - 0x3c0], 0x0
03bf38: stw [r10 - 0x328], 0x1798
03bf40: mov64 r1, r10
03bf48: add64 r1, -0x528
03bf50: mov64 r2, r10
03bf58: add64 r2, -0x3c0
03bf60: call 0x18e0a ; call 0x102fb8
03bf68: ldxdw r3, [r10 - 0x520]
03bf70: ldxdw r2, [r10 - 0x528]
03bf78: mov64 r1, r10
03bf80: add64 r1, -0x538
03bf88: ldxdw r4, [r10 - 0x6a8]
03bf90: ldxdw r5, [r10 - 0x650]
03bf98: call -0x74ec ; call 0x1840
03bfa0: ldxdw r1, [r10 - 0x530]
03bfa8: ldxdw r8, [r10 - 0x538]
03bfb0: ja -0x253 ; branch 0x3ad20
03bfb8: ldxdw r1, [r10 - 0x3b8]
03bfc0: ja -0x255 ; branch 0x3ad20
03bfc8: ldxdw r1, [r10 - 0x678]
03bfd0: ldxdw r2, [r10 - 0x6a8]
03bfd8: jlt r1, r2, +0x1 ; branch 0x3bfe8
03bfe0: ja +0x21 ; branch 0x3c0f0
03bfe8: mov64 r1, r10
03bff0: add64 r1, -0x3a0
03bff8: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
03c008: call 0x727d ; call 0x753f8
03c010: mov64 r1, r10
03c018: add64 r1, -0x388
03c020: lddw r2, 0x11c010 ; rodata b'\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00'
03c030: call -0x6713 ; call 0x87a0
03c038: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
03c048: stxdw [r10 - 0x3b8], r1
03c050: stb [r10 - 0x370], 0x2
03c058: stw [r10 - 0x3a8], 0x30d
03c060: stdw [r10 - 0x3b0], 0x2e
03c068: stdw [r10 - 0x3c0], 0x0
03c070: stw [r10 - 0x328], 0x1773
03c078: mov64 r1, r10
03c080: add64 r1, -0x508
03c088: mov64 r2, r10
03c090: add64 r2, -0x3c0
03c098: call 0x18de3 ; call 0x102fb8
03c0a0: ldxdw r3, [r10 - 0x500]
03c0a8: ldxdw r2, [r10 - 0x508]
03c0b0: mov64 r1, r10
03c0b8: add64 r1, -0x518
03c0c0: ldxdw r4, [r10 - 0x678]
03c0c8: ldxdw r5, [r10 - 0x6a8]
03c0d0: call -0x7513 ; call 0x1840
03c0d8: ldxdw r1, [r10 - 0x510]
03c0e0: ldxdw r8, [r10 - 0x518]
03c0e8: ja -0x27a ; branch 0x3ad20
03c0f0: ldxdw r4, [r7 + 0x158]
03c0f8: ldxdw r3, [r7 + 0x138]
03c100: ldxdw r2, [r7 + 0x170]
03c108: ldxdw r1, [r7 + 0x148]
03c110: ldxdw r5, [r7 + 0x120]
03c118: ldxdw r0, [r10 - 0x6a8]
03c120: stxdw [r10 - 0xff8], r0
03c128: stxdw [r10 - 0xff0], r5
03c130: stxdw [r10 - 0x1000], r1
03c138: mov64 r1, r10
03c140: add64 r1, -0x468
03c148: mov64 r5, r10
03c150: call 0x6bfa ; call 0x72128
03c158: ldxdw r8, [r10 - 0x468]
03c160: jeq r8, 0x2, +0x1 ; branch 0x3c170
03c168: ja +0x39 ; branch 0x3c338
03c170: ldxdw r4, [r7 + 0x150]
03c178: ldxdw r3, [r7 + 0x140]
03c180: ldxdw r2, [r7 + 0x178]
03c188: ldxdw r1, [r7 + 0x160]
03c190: ldxdw r5, [r7 + 0x128]
03c198: ldxdw r0, [r10 - 0x6d0]
03c1a0: stxdw [r10 - 0xff0], r0
03c1a8: stxdw [r10 - 0xff8], r5
03c1b0: stxdw [r10 - 0x1000], r1
03c1b8: stdw [r10 - 0xfe8], 0x8
03c1c0: stdw [r10 - 0xfe0], 0x0
03c1c8: mov64 r1, r10
03c1d0: add64 r1, -0x478
03c1d8: mov64 r5, r10
03c1e0: call 0x6cba ; call 0x727b8
03c1e8: ldxdw r8, [r10 - 0x478]
03c1f0: jeq r8, 0x2, +0x1 ; branch 0x3c200
03c1f8: ja +0x29 ; branch 0x3c348
03c200: ldxdw r1, [r7 + 0x120]
03c208: ldxb r4, [r1 + 0x11b]
03c210: ldxdw r2, [r7 + 0x130]
03c218: add64 r2, 0x8
03c220: mov64 r1, r10
03c228: add64 r1, -0x488
03c230: ldxdw r3, [r10 - 0x6c8]
03c238: call 0x5153 ; call 0x64cd8
03c240: ldxdw r2, [r7 + 0x178]
03c248: ldxdw r3, [r7 + 0x140]
03c250: ldxdw r4, [r7 + 0x150]
03c258: ldxdw r1, [r7 + 0x168]
03c260: ldxdw r5, [r7 + 0x128]
03c268: ldxdw r0, [r10 - 0x488]
03c270: stxdw [r10 - 0x6d8], r0
03c278: ldxdw r0, [r10 - 0x480]
03c280: stxdw [r10 - 0xff0], r0
03c288: stxdw [r10 - 0xff8], r5
03c290: stxdw [r10 - 0x1000], r1
03c298: stdw [r10 - 0xfe8], 0x8
03c2a0: stdw [r10 - 0xfe0], 0x0
03c2a8: mov64 r1, r10
03c2b0: add64 r1, -0x498
03c2b8: mov64 r5, r10
03c2c0: call 0x6c9e ; call 0x727b8
03c2c8: ldxdw r8, [r10 - 0x498]
03c2d0: jeq r8, 0x2, +0x1 ; branch 0x3c2e0
03c2d8: ja +0xf ; branch 0x3c358
03c2e0: ldxdw r1, [r10 - 0x6c0]
03c2e8: jne r1, 0x0, +0xf ; branch 0x3c368
03c2f0: mov64 r1, 0x0
03c2f8: stxdw [r10 - 0x6f0], r1
03c300: ldxdw r1, [r10 - 0x660]
03c308: ldxdw r2, [r1 + 0x18]
03c310: stxdw [r10 - 0x6e0], r2
03c318: ldxdw r1, [r1 + 0x10]
03c320: stxdw [r10 - 0x6e8], r1
03c328: mov64 r1, 0x0
03c330: ja +0x68 ; branch 0x3c678
03c338: ldxdw r1, [r10 - 0x460]
03c340: ja -0x2c5 ; branch 0x3ad20
03c348: ldxdw r1, [r10 - 0x470]
03c350: ja -0x2c7 ; branch 0x3ad20
03c358: ldxdw r1, [r10 - 0x490]
03c360: ja -0x2c9 ; branch 0x3ad20
03c368: ldxdw r1, [r10 - 0x660]
03c370: ldxdw r2, [r1 + 0x18]
03c378: stxdw [r10 - 0x6e0], r2
03c380: ldxdw r1, [r1 + 0x10]
03c388: stxdw [r10 - 0x6e8], r1
03c390: ldxdw r1, [r7 + 0x120]
03c398: ldxb r1, [r1 + 0x11c]
03c3a0: jeq r1, 0x0, +0x2f ; branch 0x3c520
03c3a8: ldxdw r1, [r7 + 0x1a8]
03c3b0: stxdw [r10 - 0x6f0], r1
03c3b8: ldxdw r2, [r7 + 0x150]
03c3c0: ldxdw r3, [r7 + 0x140]
03c3c8: ldxdw r4, [r7 + 0x138]
03c3d0: ldxdw r4, [r4 + 0x58]
03c3d8: ldxdw r4, [r4 + 0x0]
03c3e0: ldxdw r5, [r4 + 0x18]
03c3e8: stxdw [r10 - 0x3a8], r5
03c3f0: ldxdw r5, [r4 + 0x10]
03c3f8: stxdw [r10 - 0x3b0], r5
03c400: ldxdw r5, [r4 + 0x8]
03c408: stxdw [r10 - 0x3b8], r5
03c410: ldxdw r4, [r4 + 0x0]
03c418: stxdw [r10 - 0x3c0], r4
03c420: ldxb r5, [r3 + 0x30]
03c428: ldxdw r3, [r3 + 0x58]
03c430: ldxdw r4, [r7 + 0x128]
03c438: ldxdw r0, [r7 + 0x178]
03c440: ldxdw r8, [r7 + 0x180]
03c448: ldxdw r9, [r7 + 0x188]
03c450: ldxdw r1, [r10 - 0x6c0]
03c458: stxdw [r10 - 0xfc8], r1
03c460: mov64 r1, r10
03c468: add64 r1, -0x3c0
03c470: stxdw [r10 - 0xfc0], r1
03c478: stxdw [r10 - 0xfd0], r9
03c480: stxdw [r10 - 0xfd8], r8
03c488: stxdw [r10 - 0xfe0], r0
03c490: stxdw [r10 - 0xfe8], r3
03c498: stxdw [r10 - 0xff0], r5
03c4a0: stxdw [r10 - 0xff8], r2
03c4a8: ldxdw r1, [r10 - 0x6f0]
03c4b0: stxdw [r10 - 0x1000], r1
03c4b8: mov64 r1, r10
03c4c0: add64 r1, -0x4a8
03c4c8: mov64 r5, r10
03c4d0: ldxdw r2, [r10 - 0x6e8]
03c4d8: ldxdw r3, [r10 - 0x6e0]
03c4e0: call -0xe68 ; call 0x351a8
03c4e8: ldxdw r8, [r10 - 0x4a8]
03c4f0: jeq r8, 0x2, +0x1 ; branch 0x3c500
03c4f8: ja +0x74 ; branch 0x3c8a0
03c500: mov64 r1, 0x2
03c508: mov64 r2, 0x1
03c510: stxdw [r10 - 0x6f0], r2
03c518: ja +0x2b ; branch 0x3c678
03c520: ldxdw r1, [r7 + 0x138]
03c528: ldxdw r1, [r1 + 0x58]
03c530: ldxdw r1, [r1 + 0x0]
03c538: ldxdw r2, [r1 + 0x18]
03c540: stxdw [r10 - 0x3a8], r2
03c548: ldxdw r2, [r1 + 0x10]
03c550: stxdw [r10 - 0x3b0], r2
03c558: ldxdw r2, [r1 + 0x8]
03c560: stxdw [r10 - 0x3b8], r2
03c568: ldxdw r1, [r1 + 0x0]
03c570: stxdw [r10 - 0x3c0], r1
03c578: mov64 r1, r10
03c580: add64 r1, -0x4b8
03c588: mov64 r4, r10
03c590: add64 r4, -0x3c0
03c598: mov64 r2, 0x0
03c5a0: stxdw [r10 - 0x6f0], r2
03c5a8: ldxdw r2, [r10 - 0x6e8]
03c5b0: ldxdw r3, [r10 - 0x6e0]
03c5b8: mov64 r5, 0x0
03c5c0: call 0x2499 ; call 0x4ea90
03c5c8: ldxdw r8, [r10 - 0x4b8]
03c5d0: jeq r8, 0x2, +0x1 ; branch 0x3c5e0
03c5d8: ja +0x81 ; branch 0x3c9e8
03c5e0: ldxdw r4, [r7 + 0x150]
03c5e8: ldxdw r3, [r7 + 0x140]
03c5f0: ldxdw r2, [r7 + 0x178]
03c5f8: ldxdw r1, [r7 + 0x198]
03c600: ldxdw r5, [r7 + 0x128]
03c608: ldxdw r0, [r10 - 0x6c0]
03c610: stxdw [r10 - 0xff0], r0
03c618: stxdw [r10 - 0xff8], r5
03c620: stxdw [r10 - 0x1000], r1
03c628: stdw [r10 - 0xfe8], 0x8
03c630: stdw [r10 - 0xfe0], 0x0
03c638: mov64 r1, r10
03c640: add64 r1, -0x4c8
03c648: mov64 r5, r10
03c650: call 0x6c2c ; call 0x727b8
03c658: mov64 r1, 0x1
03c660: ldxdw r8, [r10 - 0x4c8]
03c668: jeq r8, 0x2, +0x1 ; branch 0x3c678
03c670: ja +0x21a ; branch 0x3d748
03c678: ldxdw r4, [r7 + 0x130]
03c680: ldxdw r2, [r7 + 0x140]
03c688: ldxdw r2, [r2 + 0x58]
03c690: ldxdw r2, [r2 + 0x0]
03c698: ldxdw r3, [r2 + 0x18]
03c6a0: stxdw [r10 - 0xa0], r3
03c6a8: ldxdw r3, [r2 + 0x10]
03c6b0: stxdw [r10 - 0xa8], r3
03c6b8: ldxdw r3, [r2 + 0x8]
03c6c0: stxdw [r10 - 0xb0], r3
03c6c8: ldxdw r2, [r2 + 0x0]
03c6d0: stxdw [r10 - 0xb8], r2
03c6d8: ldxdw r2, [r7 + 0x178]
03c6e0: ldxdw r2, [r2 + 0x0]
03c6e8: ldxdw r3, [r2 + 0x18]
03c6f0: stxdw [r10 - 0x3a8], r3
03c6f8: ldxdw r3, [r2 + 0x10]
03c700: stxdw [r10 - 0x3b0], r3
03c708: ldxdw r3, [r2 + 0x8]
03c710: stxdw [r10 - 0x3b8], r3
03c718: ldxdw r2, [r2 + 0x0]
03c720: stxdw [r10 - 0x3c0], r2
03c728: mov64 r2, r10
03c730: add64 r2, -0xb8
03c738: stxdw [r10 - 0xff8], r2
03c740: mov64 r2, r10
03c748: add64 r2, -0x3c0
03c750: stxdw [r10 - 0xff0], r2
03c758: stxdw [r10 - 0x1000], r1
03c760: add64 r4, 0x8
03c768: mov64 r1, r10
03c770: add64 r1, -0x50
03c778: mov64 r5, r10
03c780: ldxdw r2, [r10 - 0x6e8]
03c788: ldxdw r3, [r10 - 0x6e0]
03c790: call -0xac9 ; call 0x37150
03c798: ldxdw r1, [r10 - 0x40]
03c7a0: ldxdw r2, [r10 - 0x50]
03c7a8: jeq r2, 0x0, +0x2 ; branch 0x3c7c0
03c7b0: ldxdw r8, [r10 - 0x48]
03c7b8: ja -0x354 ; branch 0x3ad20
03c7c0: ldxdw r2, [r10 - 0x6d8]
03c7c8: jeq r2, 0x0, +0x1c ; branch 0x3c8b0
03c7d0: mov64 r5, r7
03c7d8: add64 r5, 0x180
03c7e0: ldxdw r0, [r10 - 0x48]
03c7e8: ldxdw r4, [r7 + 0x150]
03c7f0: ldxdw r3, [r7 + 0x140]
03c7f8: ldxdw r2, [r7 + 0x178]
03c800: ldxdw r8, [r7 + 0x128]
03c808: ldxdw r9, [r10 - 0x6d8]
03c810: stxdw [r10 - 0xfd8], r9
03c818: mov64 r9, r7
03c820: add64 r9, 0x188
03c828: stxdw [r10 - 0xfe0], r9
03c830: stxdw [r10 - 0xfe8], r5
03c838: stxdw [r10 - 0xff0], r8
03c840: stxdw [r10 - 0xff8], r1
03c848: stxdw [r10 - 0x1000], r0
03c850: stdw [r10 - 0xfd0], 0x8
03c858: stdw [r10 - 0xfc8], 0x0
03c860: mov64 r1, r10
03c868: add64 r1, -0x4d8
03c870: mov64 r5, r10
03c878: call 0x6603 ; call 0x6f898
03c880: ldxdw r8, [r10 - 0x4d8]
03c888: jeq r8, 0x2, +0x4 ; branch 0x3c8b0
03c890: ldxdw r1, [r10 - 0x4d0]
03c898: ja -0x370 ; branch 0x3ad20
03c8a0: ldxdw r1, [r10 - 0x4a0]
03c8a8: ja -0x372 ; branch 0x3ad20
03c8b0: ldxdw r1, [r7 + 0x128]
03c8b8: ldxdw r1, [r1 + 0x0]
03c8c0: ldxdw r2, [r1 + 0x0]
03c8c8: ldxdw r3, [r1 + 0x8]
03c8d0: ldxdw r4, [r1 + 0x10]
03c8d8: ldxdw r1, [r1 + 0x18]
03c8e0: ldxdw r5, [r7 + 0x1a8]
03c8e8: stxdw [r5 + 0x20], r1
03c8f0: stxdw [r5 + 0x18], r4
03c8f8: stxdw [r5 + 0x10], r3
03c900: stxdw [r5 + 0x8], r2
03c908: ldxdw r1, [r7 + 0x1a8]
03c910: ldxdw r2, [r1 + 0x40]
03c918: stxdw [r10 - 0x6f8], r2
03c920: ldxdw r2, [r1 + 0x38]
03c928: stxdw [r10 - 0x6e8], r2
03c930: ldxdw r2, [r1 + 0x30]
03c938: stxdw [r10 - 0x6e0], r2
03c940: ldxdw r1, [r1 + 0x28]
03c948: stxdw [r10 - 0x700], r1
03c950: mov64 r1, r10
03c958: add64 r1, -0xb8
03c960: call 0x1949a ; call 0x106e38
03c968: ldxdw r1, [r10 - 0xb8]
03c970: jeq r1, 0x0, +0x10 ; branch 0x3c9f8
03c978: ldxdw r1, [r10 - 0xb0]
03c980: ldxdw r2, [r10 - 0xa8]
03c988: ldxdw r3, [r10 - 0xa0]
03c990: stxdw [r10 - 0xa8], r3
03c998: stxdw [r10 - 0xb0], r2
03c9a0: stxdw [r10 - 0xb8], r1
03c9a8: mov64 r1, r10
03c9b0: add64 r1, -0x4e8
03c9b8: mov64 r2, r10
03c9c0: add64 r2, -0xb8
03c9c8: call 0x18cce ; call 0x103040
03c9d0: ldxdw r1, [r10 - 0x4e0]
03c9d8: ldxdw r8, [r10 - 0x4e8]
03c9e0: ja -0x399 ; branch 0x3ad20
03c9e8: ldxdw r1, [r10 - 0x4b0]
03c9f0: ja -0x39b ; branch 0x3ad20
03c9f8: ldxdw r1, [r10 - 0x90]
03ca00: stxdw [r10 - 0x730], r1
03ca08: ldxdw r1, [r10 - 0x3c8]
03ca10: stxdw [r10 - 0x738], r1
03ca18: ldxdw r1, [r7 + 0x120]
03ca20: ldxdw r2, [r1 + 0x0]
03ca28: ldxdw r2, [r2 + 0x0]
03ca30: ldxdw r3, [r2 + 0x18]
03ca38: stxdw [r10 - 0x1a8], r3
03ca40: ldxdw r3, [r2 + 0x10]
03ca48: stxdw [r10 - 0x1b0], r3
03ca50: ldxdw r3, [r2 + 0x8]
03ca58: stxdw [r10 - 0x1b8], r3
03ca60: ldxdw r2, [r2 + 0x0]
03ca68: stxdw [r10 - 0x1c0], r2
03ca70: ldxdw r2, [r7 + 0x128]
03ca78: ldxdw r2, [r2 + 0x0]
03ca80: ldxdw r3, [r2 + 0x18]
03ca88: stxdw [r10 - 0x188], r3
03ca90: ldxdw r3, [r2 + 0x10]
03ca98: stxdw [r10 - 0x190], r3
03caa0: ldxdw r3, [r2 + 0x8]
03caa8: stxdw [r10 - 0x198], r3
03cab0: ldxdw r2, [r2 + 0x0]
03cab8: stxdw [r10 - 0x1a0], r2
03cac0: ldxdw r2, [r7 + 0x148]
03cac8: ldxdw r2, [r2 + 0x20]
03cad0: ldxdw r2, [r2 + 0x0]
03cad8: ldxdw r3, [r2 + 0x18]
03cae0: stxdw [r10 - 0x168], r3
03cae8: ldxdw r3, [r2 + 0x10]
03caf0: stxdw [r10 - 0x170], r3
03caf8: ldxdw r3, [r2 + 0x8]
03cb00: stxdw [r10 - 0x178], r3
03cb08: ldxdw r2, [r2 + 0x0]
03cb10: stxdw [r10 - 0x180], r2
03cb18: ldxdw r2, [r7 + 0x150]
03cb20: ldxdw r2, [r2 + 0x20]
03cb28: ldxdw r2, [r2 + 0x0]
03cb30: ldxdw r3, [r2 + 0x18]
03cb38: stxdw [r10 - 0x148], r3
03cb40: ldxdw r3, [r2 + 0x10]
03cb48: stxdw [r10 - 0x150], r3
03cb50: ldxdw r3, [r2 + 0x8]
03cb58: stxdw [r10 - 0x158], r3
03cb60: ldxdw r2, [r2 + 0x0]
03cb68: stxdw [r10 - 0x160], r2
03cb70: ldxdw r2, [r7 + 0x90]
03cb78: ldxdw r3, [r2 + 0x18]
03cb80: stxdw [r10 - 0x8], r3
03cb88: ldxdw r3, [r2 + 0x10]
03cb90: stxdw [r10 - 0x10], r3
03cb98: ldxdw r3, [r2 + 0x8]
03cba0: stxdw [r10 - 0x18], r3
03cba8: ldxdw r2, [r2 + 0x0]
03cbb0: stxdw [r10 - 0x20], r2
03cbb8: ldxdw r2, [r7 + 0x168]
03cbc0: ldxdw r2, [r2 + 0x20]
03cbc8: ldxdw r2, [r2 + 0x0]
03cbd0: ldxdw r3, [r2 + 0x18]
03cbd8: stxdw [r10 - 0x38], r3
03cbe0: ldxdw r3, [r2 + 0x10]
03cbe8: stxdw [r10 - 0x40], r3
03cbf0: ldxdw r3, [r2 + 0x8]
03cbf8: stxdw [r10 - 0x48], r3
03cc00: ldxdw r2, [r2 + 0x0]
03cc08: stxdw [r10 - 0x50], r2
03cc10: ldxdw r2, [r1 + 0xe0]
03cc18: stxdw [r10 - 0xa0], r2
03cc20: ldxdw r2, [r1 + 0xd8]
03cc28: stxdw [r10 - 0xa8], r2
03cc30: ldxdw r2, [r1 + 0xd0]
03cc38: stxdw [r10 - 0xb0], r2
03cc40: ldxdw r2, [r1 + 0xc8]
03cc48: stxdw [r10 - 0xb8], r2
03cc50: lddw r2, 0x300000000
03cc60: ldxdw r2, [r2 + 0x0]
03cc68: mov64 r3, 0x0
03cc70: stxdw [r10 - 0x708], r3
03cc78: mov64 r4, 0x1
03cc80: mov64 r3, r2
03cc88: add64 r3, -0x12
03cc90: jgt r3, r2, +0x1 ; branch 0x3cca0
03cc98: mov64 r4, 0x0
03cca0: mov64 r5, 0x0
03cca8: jne r4, 0x0, +0x1 ; branch 0x3ccb8
03ccb0: mov64 r5, r3
03ccb8: lddw r9, 0x300007fee
03ccc8: jeq r2, 0x0, +0x1 ; branch 0x3ccd8
03ccd0: mov64 r9, r5
03ccd8: mov64 r2, 0x0
03cce0: stxdw [r10 - 0x718], r2
03cce8: ldxdw r2, [r10 - 0x6f0]
03ccf0: jne r2, 0x0, +0x2 ; branch 0x3cd08
03ccf8: ldxdw r2, [r10 - 0x6c0]
03cd00: stxdw [r10 - 0x718], r2
03cd08: mov64 r2, 0x0
03cd10: stxdw [r10 - 0x720], r2
03cd18: ldxdw r2, [r10 - 0x6f0]
03cd20: jne r2, 0x0, +0x2 ; branch 0x3cd38
03cd28: ldxdw r2, [r10 - 0x698]
03cd30: stxdw [r10 - 0x720], r2
03cd38: ldxb r1, [r1 + 0x11e]
03cd40: mov64 r2, 0x0
03cd48: stxdw [r10 - 0x710], r2
03cd50: jeq r1, 0x0, +0x2 ; branch 0x3cd68
03cd58: ldxdw r2, [r10 - 0x6c0]
03cd60: stxdw [r10 - 0x710], r2
03cd68: jeq r1, 0x0, +0x2 ; branch 0x3cd80
03cd70: ldxdw r1, [r10 - 0x698]
03cd78: stxdw [r10 - 0x708], r1
03cd80: lddw r1, 0x300000007
03cd90: jgt r9, r1, +0x3 ; branch 0x3cdb0
03cd98: mov64 r1, 0x1
03cda0: mov64 r2, 0x12
03cda8: call 0x1a8b3 ; call 0x111348
03cdb0: lddw r1, 0x300000000
03cdc0: mov64 r2, r9
03cdc8: stxdw [r1 + 0x0], r2
03cdd0: lddw r1, 0x5f65746f75715f74
03cde0: stxdw [r2 + 0x8], r1
03cde8: lddw r1, 0x636178655f797562
03cdf8: stxdw [r2 + 0x0], r1
03ce00: sth [r2 + 0x10], 0x6e69
03ce08: mov64 r1, 0x0
03ce10: stxdw [r10 - 0x728], r1
03ce18: ldxdw r1, [r10 - 0x6f0]
03ce20: jne r1, 0x0, +0x2 ; branch 0x3ce38
03ce28: mov64 r1, 0x0
03ce30: stxdw [r10 - 0x6c0], r1
03ce38: ldxdw r1, [r10 - 0x6f0]
03ce40: jne r1, 0x0, +0x2 ; branch 0x3ce58
03ce48: mov64 r1, 0x0
03ce50: stxdw [r10 - 0x698], r1
03ce58: ldxdw r1, [r7 + 0x120]
03ce60: ldxb r1, [r1 + 0x11b]
03ce68: jeq r1, 0x0, +0x1 ; branch 0x3ce78
03ce70: ja +0x3 ; branch 0x3ce90
03ce78: ldxdw r1, [r7 + 0x130]
03ce80: ldxdw r1, [r1 + 0x3a0]
03ce88: stxdw [r10 - 0x728], r1
03ce90: mov64 r1, r10
03ce98: add64 r1, -0x140
03cea0: mov64 r2, r10
03cea8: add64 r2, -0x3e8
03ceb0: ldxdw r3, [r10 - 0x6d8]
03ceb8: call 0x6f48 ; call 0x74900
03cec0: ldxdw r8, [r10 - 0x140]
03cec8: jne r8, 0x2, +0x111 ; branch 0x3d758
03ced0: ldxdw r1, [r10 - 0x6d0]
03ced8: ldxdw r2, [r10 - 0x670]
03cee0: sub64 r1, r2
03cee8: stxdw [r10 - 0x6d0], r1
03cef0: ldxdw r1, [r10 - 0x138]
03cef8: stxdw [r10 - 0x6d8], r1
03cf00: ldxdw r1, [r7 + 0x120]
03cf08: ldxdw r2, [r1 + 0xf0]
03cf10: stxdw [r10 - 0x6f0], r2
03cf18: ldxdw r8, [r1 + 0xe8]
03cf20: add64 r1, 0x8
03cf28: call 0x5e63 ; call 0x6c248
03cf30: lddw r1, 0x38d7ea4c68000
03cf40: ldxdw r2, [r7 + 0x120]
03cf48: ldxb r3, [r2 + 0x11b]
03cf50: jeq r3, 0x0, +0x1 ; branch 0x3cf60
03cf58: ja +0x2 ; branch 0x3cf70
03cf60: ldxdw r1, [r7 + 0x138]
03cf68: ldxdw r1, [r1 + 0x28]
03cf70: ldxdw r2, [r2 + 0x110]
03cf78: ldxdw r3, [r10 - 0x6b8]
03cf80: stxdw [r10 - 0x340], r3
03cf88: ldxdw r3, [r10 - 0x670]
03cf90: stxdw [r10 - 0x348], r3
03cf98: ldxdw r3, [r10 - 0x6c8]
03cfa0: stxdw [r10 - 0x350], r3
03cfa8: ldxdw r3, [r10 - 0x6b0]
03cfb0: stxdw [r10 - 0x358], r3
03cfb8: ldxdw r3, [r10 - 0x738]
03cfc0: stxdw [r10 - 0x360], r3
03cfc8: ldxdw r3, [r10 - 0x6a0]
03cfd0: stxdw [r10 - 0x368], r3
03cfd8: ldxdw r3, [r10 - 0x690]
03cfe0: stxdw [r10 - 0x378], r3
03cfe8: ldxdw r3, [r10 - 0x678]
03cff0: stxdw [r10 - 0x380], r3
03cff8: ldxdw r3, [r10 - 0x680]
03d000: stxdw [r10 - 0x388], r3
03d008: ldxdw r3, [r10 - 0x688]
03d010: stxdw [r10 - 0x390], r3
03d018: ldxdw r3, [r10 - 0x658]
03d020: stxdw [r10 - 0x370], r3
03d028: stxdw [r10 - 0x398], r3
03d030: ldxdw r3, [r10 - 0x6a8]
03d038: stxdw [r10 - 0x3a0], r3
03d040: ldxdw r3, [r10 - 0x730]
03d048: stxdw [r10 - 0x3a8], r3
03d050: ldxdw r3, [r10 - 0x1c0]
03d058: stxdw [r10 - 0x338], r3
03d060: ldxdw r3, [r10 - 0x1b8]
03d068: stxdw [r10 - 0x330], r3
03d070: ldxdw r3, [r10 - 0x1b0]
03d078: stxdw [r10 - 0x328], r3
03d080: ldxdw r3, [r10 - 0x1a8]
03d088: stxdw [r10 - 0x320], r3
03d090: ldxdw r3, [r10 - 0x188]
03d098: stxdw [r10 - 0x300], r3
03d0a0: ldxdw r3, [r10 - 0x190]
03d0a8: stxdw [r10 - 0x308], r3
03d0b0: ldxdw r3, [r10 - 0x198]
03d0b8: stxdw [r10 - 0x310], r3
03d0c0: ldxdw r3, [r10 - 0x1a0]
03d0c8: stxdw [r10 - 0x318], r3
03d0d0: ldxdw r3, [r10 - 0x180]
03d0d8: stxdw [r10 - 0x2f8], r3
03d0e0: ldxdw r3, [r10 - 0x178]
03d0e8: stxdw [r10 - 0x2f0], r3
03d0f0: ldxdw r3, [r10 - 0x170]
03d0f8: stxdw [r10 - 0x2e8], r3
03d100: ldxdw r3, [r10 - 0x168]
03d108: stxdw [r10 - 0x2e0], r3
03d110: ldxdw r3, [r10 - 0x160]
03d118: stxdw [r10 - 0x2d8], r3
03d120: ldxdw r3, [r10 - 0x158]
03d128: stxdw [r10 - 0x2d0], r3
03d130: ldxdw r3, [r10 - 0x150]
03d138: stxdw [r10 - 0x2c8], r3
03d140: ldxdw r3, [r10 - 0x148]
03d148: stxdw [r10 - 0x2c0], r3
03d150: ldxdw r3, [r10 - 0x8]
03d158: stxdw [r10 - 0x2a0], r3
03d160: ldxdw r3, [r10 - 0x10]
03d168: stxdw [r10 - 0x2a8], r3
03d170: ldxdw r3, [r10 - 0x18]
03d178: stxdw [r10 - 0x2b0], r3
03d180: ldxdw r3, [r10 - 0x20]
03d188: stxdw [r10 - 0x2b8], r3
03d190: ldxdw r3, [r10 - 0x38]
03d198: stxdw [r10 - 0x280], r3
03d1a0: ldxdw r3, [r10 - 0x40]
03d1a8: stxdw [r10 - 0x288], r3
03d1b0: ldxdw r3, [r10 - 0x48]
03d1b8: stxdw [r10 - 0x290], r3
03d1c0: ldxdw r3, [r10 - 0x50]
03d1c8: stxdw [r10 - 0x298], r3
03d1d0: ldxdw r3, [r10 - 0xa0]
03d1d8: stxdw [r10 - 0x260], r3
03d1e0: ldxdw r3, [r10 - 0xa8]
03d1e8: stxdw [r10 - 0x268], r3
03d1f0: ldxdw r3, [r10 - 0xb0]
03d1f8: stxdw [r10 - 0x270], r3
03d200: ldxdw r3, [r10 - 0xb8]
03d208: stxdw [r10 - 0x278], r3
03d210: ldxdw r3, [r10 - 0x668]
03d218: stxb [r10 - 0x1c8], r3
03d220: ldxdw r3, [r10 - 0x718]
03d228: stxdw [r10 - 0x250], r3
03d230: ldxdw r3, [r10 - 0x720]
03d238: stxdw [r10 - 0x258], r3
03d240: ldxdw r3, [r10 - 0x650]
03d248: stxdw [r10 - 0x228], r3
03d250: ldxdw r3, [r10 - 0x6f8]
03d258: stxdw [r10 - 0x230], r3
03d260: ldxdw r3, [r10 - 0x6e8]
03d268: stxdw [r10 - 0x238], r3
03d270: ldxdw r3, [r10 - 0x6e0]
03d278: stxdw [r10 - 0x240], r3
03d280: ldxdw r3, [r10 - 0x700]
03d288: stxdw [r10 - 0x248], r3
03d290: ldxdw r3, [r10 - 0x6f0]
03d298: stxdw [r10 - 0x1f8], r3
03d2a0: stxdw [r10 - 0x200], r8
03d2a8: stxb [r10 - 0x1c7], r0
03d2b0: ldxdw r3, [r10 - 0x6d8]
03d2b8: stxdw [r10 - 0x208], r3
03d2c0: ldxdw r3, [r10 - 0x728]
03d2c8: stxdw [r10 - 0x210], r3
03d2d0: ldxdw r3, [r10 - 0x6c0]
03d2d8: stxdw [r10 - 0x218], r3
03d2e0: ldxdw r3, [r10 - 0x698]
03d2e8: stxdw [r10 - 0x220], r3
03d2f0: stxdw [r10 - 0x3b8], r9
03d2f8: stdw [r10 - 0x3b0], 0x12
03d300: stdw [r10 - 0x3c0], 0x12
03d308: ldxdw r3, [r10 - 0x6d0]
03d310: stxdw [r10 - 0x1d0], r3
03d318: stxdw [r10 - 0x1d8], r2
03d320: ldxdw r2, [r10 - 0x710]
03d328: stxdw [r10 - 0x1e0], r2
03d330: ldxdw r2, [r10 - 0x708]
03d338: stxdw [r10 - 0x1e8], r2
03d340: stxdw [r10 - 0x1f0], r1
03d348: mov64 r1, r10
03d350: add64 r1, -0xb8
03d358: mov64 r8, r10
03d360: add64 r8, -0x3c0
03d368: mov64 r2, r8
03d370: call 0xe924 ; call 0xb1c98
03d378: ldxdw r1, [r10 - 0xa8]
03d380: stxdw [r10 - 0x48], r1
03d388: ldxdw r1, [r10 - 0xb0]
03d390: stxdw [r10 - 0x50], r1
03d398: mov64 r1, r10
03d3a0: add64 r1, -0x50
03d3a8: mov64 r2, 0x1
03d3b0: call 0x192d9 ; call 0x106a80
03d3b8: add64 r7, 0xc0
03d3c0: mov64 r1, r10
03d3c8: add64 r1, -0x130
03d3d0: stxdw [r10 - 0x658], r1
03d3d8: mov64 r2, r7
03d3e0: call -0x5e4e ; call 0xe178
03d3e8: ldxdw r1, [r10 - 0x660]
03d3f0: ldxb r1, [r1 + 0x20]
03d3f8: stxdw [r10 - 0x650], r1
03d400: mov64 r1, r10
03d408: add64 r1, -0x100
03d410: mov64 r2, r8
03d418: call 0xe90f ; call 0xb1c98
03d420: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
03d430: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
03d440: add64 r2, 0x8
03d448: stxdw [r10 - 0xc0], r2
03d450: stxdw [r10 - 0xc8], r1
03d458: ldxdw r1, [r10 - 0x100]
03d460: stxdw [r10 - 0xd8], r1
03d468: ldxdw r1, [r10 - 0xf8]
03d470: stxdw [r10 - 0xe0], r1
03d478: stxdw [r10 - 0xe8], r1
03d480: ldxdw r2, [r10 - 0xf0]
03d488: add64 r1, r2
03d490: stxdw [r10 - 0xd0], r1
03d498: mov64 r1, r10
03d4a0: add64 r1, -0x160
03d4a8: mov64 r2, r10
03d4b0: add64 r2, -0xe8
03d4b8: call -0x5adf ; call 0xfdc8
03d4c0: ldxdw r9, [r10 - 0x158]
03d4c8: ldxdw r8, [r10 - 0x150]
03d4d0: mov64 r1, 0x22
03d4d8: mov64 r2, 0x1
03d4e0: call -0x6470 ; call 0xb168
03d4e8: ldxdw r1, [r10 - 0x130]
03d4f0: ldxdw r2, [r1 + 0x18]
03d4f8: ldxdw r3, [r1 + 0x10]
03d500: ldxdw r4, [r1 + 0x8]
03d508: ldxdw r1, [r1 + 0x0]
03d510: stxdw [r0 + 0x0], r1
03d518: stxdw [r0 + 0x8], r4
03d520: stxdw [r0 + 0x10], r3
03d528: stxdw [r0 + 0x18], r2
03d530: sth [r0 + 0x20], 0x1
03d538: stxdw [r10 - 0x48], r0
03d540: stdw [r10 - 0x50], 0x1
03d548: stdw [r10 - 0x40], 0x1
03d550: mov64 r7, r10
03d558: add64 r7, -0xb8
03d560: mov64 r5, r10
03d568: add64 r5, -0x50
03d570: mov64 r1, r7
03d578: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
03d588: mov64 r3, r9
03d590: mov64 r4, r8
03d598: call 0x1a0b6 ; call 0x10db50
03d5a0: mov64 r8, r10
03d5a8: add64 r8, -0x50
03d5b0: mov64 r1, r8
03d5b8: ldxdw r2, [r10 - 0x658]
03d5c0: mov64 r3, 0x30
03d5c8: call 0x1b859 ; call 0x119898
03d5d0: mov64 r1, r10
03d5d8: add64 r1, -0x20
03d5e0: stxdw [r10 - 0x180], r1
03d5e8: mov64 r1, r10
03d5f0: add64 r1, -0x1a0
03d5f8: stxdw [r10 - 0x10], r1
03d600: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
03d610: stxdw [r10 - 0x20], r1
03d618: ldxdw r1, [r10 - 0x650]
03d620: stxb [r10 - 0x1a0], r1
03d628: stdw [r10 - 0x178], 0x2
03d630: stdw [r10 - 0x8], 0x1
03d638: stdw [r10 - 0x18], 0x11
03d640: mov64 r1, r10
03d648: add64 r1, -0x180
03d650: stxdw [r10 - 0x1000], r1
03d658: stdw [r10 - 0xff8], 0x1
03d660: mov64 r1, r10
03d668: add64 r1, -0x68
03d670: mov64 r5, r10
03d678: mov64 r2, r7
03d680: mov64 r3, r8
03d688: mov64 r4, 0x1
03d690: call 0x19284 ; call 0x106ab8
03d698: lddw r1, -0x7fffffffffffffe6
03d6a8: ldxdw r2, [r10 - 0x68]
03d6b0: jne r2, r1, +0x16 ; branch 0x3d768
03d6b8: ldxdw r1, [r10 - 0x40]
03d6c0: ldxdw r2, [r10 - 0x48]
03d6c8: ldxdw r3, [r2 + 0x0]
03d6d0: add64 r3, -0x1
03d6d8: stxdw [r2 + 0x0], r3
03d6e0: jne r3, 0x0, +0x3 ; branch 0x3d700
03d6e8: ldxdw r3, [r2 + 0x8]
03d6f0: add64 r3, -0x1
03d6f8: stxdw [r2 + 0x8], r3
03d700: ldxdw r2, [r1 + 0x0]
03d708: add64 r2, -0x1
03d710: stxdw [r1 + 0x0], r2
03d718: jne r2, 0x0, +0x3 ; branch 0x3d738
03d720: ldxdw r2, [r1 + 0x8]
03d728: add64 r2, -0x1
03d730: stxdw [r1 + 0x8], r2
03d738: mov64 r8, 0x2
03d740: ja -0x545 ; branch 0x3ad20
03d748: ldxdw r1, [r10 - 0x4c0]
03d750: ja -0x547 ; branch 0x3ad20
03d758: ldxdw r1, [r10 - 0x138]
03d760: ja -0x549 ; branch 0x3ad20
03d768: mov64 r1, r10
03d770: add64 r1, -0x4f8
03d778: mov64 r2, r10
03d780: add64 r2, -0x68
03d788: call 0x18b16 ; call 0x103040
03d790: ldxdw r2, [r10 - 0x40]
03d798: ldxdw r1, [r10 - 0x4f0]
03d7a0: ldxdw r8, [r10 - 0x4f8]
03d7a8: ldxdw r3, [r10 - 0x48]
03d7b0: ldxdw r4, [r3 + 0x0]
03d7b8: add64 r4, -0x1
03d7c0: stxdw [r3 + 0x0], r4
03d7c8: jne r4, 0x0, +0x3 ; branch 0x3d7e8
03d7d0: ldxdw r4, [r3 + 0x8]
03d7d8: add64 r4, -0x1
03d7e0: stxdw [r3 + 0x8], r4
03d7e8: ldxdw r3, [r2 + 0x0]
03d7f0: add64 r3, -0x1
03d7f8: stxdw [r2 + 0x0], r3
03d800: jne r3, 0x0, -0x55d ; branch 0x3ad20
03d808: ldxdw r3, [r2 + 0x8]
03d810: add64 r3, -0x1
03d818: stxdw [r2 + 0x8], r3
03d820: ja -0x561 ; branch 0x3ad20
