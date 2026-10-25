0376b0: mov64 r9, r1
0376b8: ldxdw r6, [r2 + 0x8]
0376c0: ldxdw r1, [r6 + 0x130]
0376c8: ldxb r1, [r1 + 0x3b0]
0376d0: and64 r1, 0x8
0376d8: jne r1, 0x0, +0xb5 ; branch 0x37c88
0376e0: stxdw [r10 - 0x570], r4
0376e8: stxdw [r10 - 0x580], r5
0376f0: stxdw [r10 - 0x568], r3
0376f8: stxdw [r10 - 0x578], r2
037700: ldxdw r1, [r6 + 0x120]
037708: ldxdw r2, [r1 + 0x0]
037710: ldxdw r4, [r6 + 0x128]
037718: ldxdw r3, [r6 + 0x180]
037720: mov64 r1, r10
037728: add64 r1, -0x400
037730: call 0x411e ; call 0x58028
037738: ldxdw r8, [r10 - 0x400]
037740: jeq r8, 0x2, +0x1 ; branch 0x37750
037748: ja +0x50 ; branch 0x379d0
037750: ldxdw r3, [r6 + 0x90]
037758: ldxdw r2, [r6 + 0x130]
037760: ldxdw r1, [r6 + 0x120]
037768: ldxb r4, [r1 + 0x11b]
037770: mov64 r1, r10
037778: add64 r1, -0x410
037780: call 0x42d0 ; call 0x58e08
037788: ldxdw r8, [r10 - 0x410]
037790: jeq r8, 0x2, +0x1 ; branch 0x377a0
037798: ja +0x48 ; branch 0x379e0
0377a0: ldxdw r1, [r10 - 0x568]
0377a8: jeq r1, 0x0, +0x48 ; branch 0x379f0
0377b0: ldxdw r1, [r10 - 0x570]
0377b8: jeq r1, 0x0, +0x80 ; branch 0x37bc0
0377c0: ldxdw r1, [r6 + 0x158]
0377c8: ldxdw r1, [r1 + 0x68]
0377d0: stxdw [r10 - 0x588], r1
0377d8: ldxdw r1, [r6 + 0x150]
0377e0: ldxdw r1, [r1 + 0x68]
0377e8: stxdw [r10 - 0x590], r1
0377f0: ldxdw r1, [r6 + 0x148]
0377f8: ldxdw r1, [r1 + 0x68]
037800: stxdw [r10 - 0x598], r1
037808: ldxdw r1, [r6 + 0x160]
037810: ldxdw r7, [r1 + 0x68]
037818: ldxdw r2, [r6 + 0x120]
037820: add64 r2, 0x8
037828: mov64 r1, r10
037830: add64 r1, -0x3c0
037838: mov64 r3, r7
037840: call 0x6891 ; call 0x6bcd0
037848: ldxdw r8, [r10 - 0x3c0]
037850: jeq r8, 0x2, +0x1 ; branch 0x37860
037858: ja +0x192 ; branch 0x384f0
037860: ldxdw r2, [r6 + 0x120]
037868: add64 r2, 0x8
037870: mov64 r1, r10
037878: add64 r1, -0x3c0
037880: stxdw [r10 - 0x5a0], r7
037888: mov64 r3, r7
037890: call 0x6952 ; call 0x6c328
037898: ldxdw r8, [r10 - 0x3c0]
0378a0: jeq r8, 0x2, +0x1 ; branch 0x378b0
0378a8: ja +0x188 ; branch 0x384f0
0378b0: ldxdw r4, [r10 - 0x3b8]
0378b8: mov64 r1, r10
0378c0: add64 r1, -0x3c0
0378c8: ldxdw r2, [r10 - 0x568]
0378d0: ldxdw r7, [r10 - 0x588]
0378d8: mov64 r3, r7
0378e0: stxdw [r10 - 0x5a8], r4
0378e8: call -0x4be5 ; call 0x119c8
0378f0: ldxdw r8, [r10 - 0x3c0]
0378f8: jeq r8, 0x2, +0x1 ; branch 0x37908
037900: ja +0x17d ; branch 0x384f0
037908: mov64 r5, r7
037910: ldxdw r7, [r10 - 0x3b8]
037918: ldxdw r3, [r6 + 0x130]
037920: ldxdw r2, [r6 + 0x120]
037928: ldxdw r1, [r6 + 0x190]
037930: ldxdw r4, [r6 + 0x138]
037938: ldxdw r0, [r10 - 0x5a8]
037940: stxdw [r10 - 0xfe0], r0
037948: stxdw [r10 - 0xfe8], r5
037950: stxdw [r10 - 0xff0], r4
037958: stxdw [r10 - 0xff8], r1
037960: mov64 r1, r6
037968: add64 r1, 0x1b0
037970: stxdw [r10 - 0x1000], r1
037978: stxdw [r10 - 0xfd8], r7
037980: mov64 r1, r10
037988: add64 r1, -0x3c0
037990: mov64 r5, r10
037998: mov64 r4, r6
0379a0: call -0x48aa ; call 0x13458
0379a8: ldxdw r8, [r10 - 0x3b8]
0379b0: ldxdw r1, [r10 - 0x3c0]
0379b8: jeq r1, 0x0, +0xba ; branch 0x37f90
0379c0: ldxdw r1, [r10 - 0x3b0]
0379c8: ja +0x94 ; branch 0x37e70
0379d0: ldxdw r1, [r10 - 0x3f8]
0379d8: ja +0x92 ; branch 0x37e70
0379e0: ldxdw r1, [r10 - 0x408]
0379e8: ja +0x90 ; branch 0x37e70
0379f0: mov64 r1, r10
0379f8: add64 r1, -0x20
037a00: lddw r2, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
037a10: call 0x7b3c ; call 0x753f8
037a18: stdw [r10 - 0x40], 0x0
037a20: stdw [r10 - 0x48], 0x1
037a28: stdw [r10 - 0x50], 0x0
037a30: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
037a40: stxdw [r10 - 0x90], r1
037a48: mov64 r1, r10
037a50: add64 r1, -0x50
037a58: stxdw [r10 - 0x98], r1
037a60: stb [r10 - 0x80], 0x3
037a68: stdw [r10 - 0x88], 0x20
037a70: stdw [r10 - 0xa8], 0x0
037a78: stdw [r10 - 0xb8], 0x0
037a80: mov64 r2, r10
037a88: add64 r2, -0xb8
037a90: lddw r1, 0x11c04c ; rodata b'\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00'
037aa0: call 0x861f ; call 0x7aba0
037aa8: jeq r0, 0x0, +0x1 ; branch 0x37ab8
037ab0: ja +0x52 ; branch 0x37d48
037ab8: ldxdw r1, [r10 - 0x40]
037ac0: stxdw [r10 - 0x378], r1
037ac8: ldxdw r1, [r10 - 0x48]
037ad0: stxdw [r10 - 0x380], r1
037ad8: ldxdw r1, [r10 - 0x50]
037ae0: stxdw [r10 - 0x388], r1
037ae8: ldxdw r1, [r10 - 0x20]
037af0: stxdw [r10 - 0x3a0], r1
037af8: ldxdw r1, [r10 - 0x18]
037b00: stxdw [r10 - 0x398], r1
037b08: ldxdw r1, [r10 - 0x10]
037b10: stxdw [r10 - 0x390], r1
037b18: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
037b28: stxdw [r10 - 0x3b8], r1
037b30: stw [r10 - 0x328], 0x1771
037b38: stb [r10 - 0x370], 0x2
037b40: stw [r10 - 0x3a8], 0x146
037b48: stdw [r10 - 0x3b0], 0x2e
037b50: stdw [r10 - 0x3c0], 0x0
037b58: mov64 r1, r10
037b60: add64 r1, -0x550
037b68: mov64 r2, r10
037b70: add64 r2, -0x3c0
037b78: call 0x19687 ; call 0x102fb8
037b80: ldxdw r3, [r10 - 0x548]
037b88: ldxdw r2, [r10 - 0x550]
037b90: mov64 r1, r10
037b98: add64 r1, -0x560
037ba0: call -0x6f0d ; call 0x340
037ba8: ldxdw r1, [r10 - 0x558]
037bb0: ldxdw r8, [r10 - 0x560]
037bb8: ja +0x56 ; branch 0x37e70
037bc0: mov64 r1, r10
037bc8: add64 r1, -0x20
037bd0: lddw r2, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
037be0: call 0x7b02 ; call 0x753f8
037be8: stdw [r10 - 0x40], 0x0
037bf0: stdw [r10 - 0x48], 0x1
037bf8: stdw [r10 - 0x50], 0x0
037c00: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
037c10: stxdw [r10 - 0x90], r1
037c18: mov64 r1, r10
037c20: add64 r1, -0x50
037c28: stxdw [r10 - 0x98], r1
037c30: stb [r10 - 0x80], 0x3
037c38: stdw [r10 - 0x88], 0x20
037c40: stdw [r10 - 0xa8], 0x0
037c48: stdw [r10 - 0xb8], 0x0
037c50: mov64 r2, r10
037c58: add64 r2, -0xb8
037c60: lddw r1, 0x11c014 ; rodata b'\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00'
037c70: call 0x85e5 ; call 0x7aba0
037c78: jeq r0, 0x0, +0x41 ; branch 0x37e88
037c80: ja +0x18 ; branch 0x37d48
037c88: mov64 r1, r10
037c90: add64 r1, -0x20
037c98: lddw r2, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
037ca8: call 0x7ae9 ; call 0x753f8
037cb0: stdw [r10 - 0x40], 0x0
037cb8: stdw [r10 - 0x48], 0x1
037cc0: stdw [r10 - 0x50], 0x0
037cc8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
037cd8: stxdw [r10 - 0x90], r1
037ce0: mov64 r1, r10
037ce8: add64 r1, -0x50
037cf0: stxdw [r10 - 0x98], r1
037cf8: stb [r10 - 0x80], 0x3
037d00: stdw [r10 - 0x88], 0x20
037d08: stdw [r10 - 0xa8], 0x0
037d10: stdw [r10 - 0xb8], 0x0
037d18: mov64 r2, r10
037d20: add64 r2, -0xb8
037d28: lddw r1, 0x11bfd8 ; rodata b'\x14\x00\x00\x00\x13\x00\x00\x00:\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00'
037d38: call 0x85cc ; call 0x7aba0
037d40: jeq r0, 0x0, +0xa ; branch 0x37d98
037d48: mov64 r3, r10
037d50: add64 r3, -0x160
037d58: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
037d68: mov64 r2, 0x37
037d70: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
037d80: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
037d90: call 0x1b640 ; call 0x112f98
037d98: ldxdw r1, [r10 - 0x40]
037da0: stxdw [r10 - 0x378], r1
037da8: ldxdw r1, [r10 - 0x48]
037db0: stxdw [r10 - 0x380], r1
037db8: ldxdw r1, [r10 - 0x50]
037dc0: stxdw [r10 - 0x388], r1
037dc8: ldxdw r1, [r10 - 0x20]
037dd0: stxdw [r10 - 0x3a0], r1
037dd8: ldxdw r1, [r10 - 0x18]
037de0: stxdw [r10 - 0x398], r1
037de8: ldxdw r1, [r10 - 0x10]
037df0: stxdw [r10 - 0x390], r1
037df8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
037e08: stxdw [r10 - 0x3b8], r1
037e10: stw [r10 - 0x328], 0x1784
037e18: stb [r10 - 0x370], 0x2
037e20: stw [r10 - 0x3a8], 0x13d
037e28: stdw [r10 - 0x3b0], 0x2e
037e30: stdw [r10 - 0x3c0], 0x0
037e38: mov64 r1, r10
037e40: add64 r1, -0x3f0
037e48: mov64 r2, r10
037e50: add64 r2, -0x3c0
037e58: call 0x1962b ; call 0x102fb8
037e60: ldxdw r1, [r10 - 0x3e8]
037e68: ldxdw r8, [r10 - 0x3f0]
037e70: stxdw [r9 + 0x8], r1
037e78: stxdw [r9 + 0x0], r8
037e80: exit
037e88: ldxdw r1, [r10 - 0x40]
037e90: stxdw [r10 - 0x378], r1
037e98: ldxdw r1, [r10 - 0x48]
037ea0: stxdw [r10 - 0x380], r1
037ea8: ldxdw r1, [r10 - 0x50]
037eb0: stxdw [r10 - 0x388], r1
037eb8: ldxdw r1, [r10 - 0x20]
037ec0: stxdw [r10 - 0x3a0], r1
037ec8: ldxdw r1, [r10 - 0x18]
037ed0: stxdw [r10 - 0x398], r1
037ed8: ldxdw r1, [r10 - 0x10]
037ee0: stxdw [r10 - 0x390], r1
037ee8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
037ef8: stxdw [r10 - 0x3b8], r1
037f00: stw [r10 - 0x328], 0x1772
037f08: stb [r10 - 0x370], 0x2
037f10: stw [r10 - 0x3a8], 0x147
037f18: stdw [r10 - 0x3b0], 0x2e
037f20: stdw [r10 - 0x3c0], 0x0
037f28: mov64 r1, r10
037f30: add64 r1, -0x530
037f38: mov64 r2, r10
037f40: add64 r2, -0x3c0
037f48: call 0x1960d ; call 0x102fb8
037f50: ldxdw r3, [r10 - 0x528]
037f58: ldxdw r2, [r10 - 0x530]
037f60: mov64 r1, r10
037f68: add64 r1, -0x540
037f70: call -0x6f87 ; call 0x340
037f78: ldxdw r1, [r10 - 0x538]
037f80: ldxdw r8, [r10 - 0x540]
037f88: ja -0x24 ; branch 0x37e70
037f90: stxdw [r10 - 0x5b0], r7
037f98: ldxdw r1, [r10 - 0x3a0]
037fa0: stxdw [r10 - 0x5b8], r1
037fa8: ldxdw r1, [r10 - 0x3b0]
037fb0: stxdw [r10 - 0x5a8], r1
037fb8: ldxdw r1, [r10 - 0x3a8]
037fc0: stxdw [r10 - 0x5c0], r1
037fc8: ldxdw r1, [r10 - 0x398]
037fd0: stxdw [r10 - 0x5c8], r1
037fd8: ldxdw r1, [r10 - 0x390]
037fe0: stxdw [r10 - 0x5d0], r1
037fe8: ldxdw r1, [r6 + 0x130]
037ff0: ldxdw r2, [r6 + 0x128]
037ff8: ldxdw r2, [r2 + 0x0]
038000: ldxdw r3, [r2 + 0x18]
038008: stxdw [r10 - 0x3a8], r3
038010: ldxdw r3, [r2 + 0x10]
038018: stxdw [r10 - 0x3b0], r3
038020: ldxdw r3, [r2 + 0x8]
038028: stxdw [r10 - 0x3b8], r3
038030: ldxdw r2, [r2 + 0x0]
038038: stxdw [r10 - 0x3c0], r2
038040: add64 r1, 0x248
038048: mov64 r2, r10
038050: add64 r2, -0x3c0
038058: mov64 r3, 0x20
038060: call 0x1c30f ; call 0x1198e0
038068: lsh64 r0, 0x20
038070: rsh64 r0, 0x20
038078: mov64 r7, 0x0
038080: jeq r0, 0x0, +0x1 ; branch 0x38090
038088: ldxdw r7, [r10 - 0x5d0]
038090: mov64 r4, 0x0
038098: jeq r0, 0x0, +0x1 ; branch 0x380a8
0380a0: ldxdw r4, [r10 - 0x5c8]
0380a8: mov64 r3, 0x0
0380b0: jeq r0, 0x0, +0x1 ; branch 0x380c0
0380b8: ldxdw r3, [r10 - 0x5c0]
0380c0: mov64 r5, 0x0
0380c8: jeq r0, 0x0, +0x1 ; branch 0x380d8
0380d0: ldxdw r5, [r10 - 0x5a8]
0380d8: mov64 r1, 0x0
0380e0: stxdw [r10 - 0x5a8], r1
0380e8: jeq r0, 0x0, +0x2 ; branch 0x38100
0380f0: ldxdw r1, [r10 - 0x5b8]
0380f8: stxdw [r10 - 0x5a8], r1
038100: mov64 r1, 0x0
038108: jeq r0, 0x0, +0x1 ; branch 0x38118
038110: mov64 r1, r8
038118: stxdw [r10 - 0x5b8], r1
038120: mov64 r1, 0x1
038128: ldxdw r2, [r10 - 0x5b0]
038130: mov64 r8, r2
038138: ldxdw r0, [r10 - 0x5a8]
038140: add64 r8, r0
038148: jlt r8, r2, +0x1 ; branch 0x38158
038150: mov64 r1, 0x0
038158: and64 r1, 0x1
038160: jne r1, 0x0, +0x1 ; branch 0x38170
038168: ja +0x6 ; branch 0x381a0
038170: mov64 r1, r10
038178: add64 r1, -0x520
038180: call 0x37f ; call 0x39d80
038188: ldxdw r1, [r10 - 0x518]
038190: ldxdw r8, [r10 - 0x520]
038198: ja -0x66 ; branch 0x37e70
0381a0: mov64 r1, r8
0381a8: add64 r1, r7
0381b0: mov64 r2, 0x1
0381b8: jlt r1, r8, +0x1 ; branch 0x381c8
0381c0: mov64 r2, 0x0
0381c8: and64 r2, 0x1
0381d0: jne r2, 0x0, +0x1 ; branch 0x381e0
0381d8: ja +0x6 ; branch 0x38210
0381e0: mov64 r1, r10
0381e8: add64 r1, -0x510
0381f0: call 0x3b2 ; call 0x39f88
0381f8: ldxdw r1, [r10 - 0x508]
038200: ldxdw r8, [r10 - 0x510]
038208: ja -0x74 ; branch 0x37e70
038210: mov64 r0, r1
038218: add64 r0, r4
038220: mov64 r2, 0x1
038228: jlt r0, r1, +0x1 ; branch 0x38238
038230: mov64 r2, 0x0
038238: and64 r2, 0x1
038240: jne r2, 0x0, +0x1 ; branch 0x38250
038248: ja +0x6 ; branch 0x38280
038250: mov64 r1, r10
038258: add64 r1, -0x500
038260: call 0x3e5 ; call 0x3a190
038268: ldxdw r1, [r10 - 0x4f8]
038270: ldxdw r8, [r10 - 0x500]
038278: ja -0x82 ; branch 0x37e70
038280: stxdw [r10 - 0x5c8], r0
038288: stxdw [r10 - 0x5c0], r8
038290: stxdw [r10 - 0x5e0], r5
038298: stxdw [r10 - 0x5d0], r4
0382a0: stxdw [r10 - 0x5d8], r3
0382a8: ldxdw r1, [r6 + 0x140]
0382b0: ldxdw r2, [r1 + 0x58]
0382b8: mov64 r8, r10
0382c0: add64 r8, -0x3c0
0382c8: mov64 r1, r8
0382d0: call -0x542c ; call 0xe178
0382d8: mov64 r1, r10
0382e0: add64 r1, -0xb8
0382e8: mov64 r2, r8
0382f0: call 0x77c6 ; call 0x74128
0382f8: ldxdw r1, [r10 - 0xa8]
038300: ldxdw r8, [r10 - 0xb0]
038308: ldxdw r2, [r10 - 0xb8]
038310: jeq r2, 0x2, +0x1 ; branch 0x38320
038318: ja +0xe ; branch 0x38390
038320: ldxdw r2, [r10 - 0x3b0]
038328: ldxdw r3, [r10 - 0x3b8]
038330: ldxdw r4, [r3 + 0x0]
038338: add64 r4, -0x1
038340: stxdw [r3 + 0x0], r4
038348: jne r4, 0x0, +0x3 ; branch 0x38368
038350: ldxdw r4, [r3 + 0x8]
038358: add64 r4, -0x1
038360: stxdw [r3 + 0x8], r4
038368: ldxdw r3, [r2 + 0x0]
038370: add64 r3, -0x1
038378: stxdw [r2 + 0x0], r3
038380: jne r3, 0x0, -0xa3 ; branch 0x37e70
038388: ja +0x33a ; branch 0x39d60
038390: ldxdw r3, [r10 - 0xa0]
038398: stxdw [r10 - 0x3c8], r3
0383a0: stxdw [r10 - 0x3d0], r1
0383a8: stxdw [r10 - 0x3d8], r8
0383b0: stxdw [r10 - 0x3e0], r2
0383b8: ldxdw r1, [r10 - 0x3b0]
0383c0: ldxdw r2, [r10 - 0x3b8]
0383c8: ldxdw r3, [r2 + 0x0]
0383d0: add64 r3, -0x1
0383d8: stxdw [r2 + 0x0], r3
0383e0: jne r3, 0x0, +0x3 ; branch 0x38400
0383e8: ldxdw r3, [r2 + 0x8]
0383f0: add64 r3, -0x1
0383f8: stxdw [r2 + 0x8], r3
038400: ldxdw r2, [r1 + 0x0]
038408: add64 r2, -0x1
038410: stxdw [r1 + 0x0], r2
038418: ldxdw r8, [r10 - 0x5c0]
038420: jne r2, 0x0, +0x3 ; branch 0x38440
038428: ldxdw r2, [r1 + 0x8]
038430: add64 r2, -0x1
038438: stxdw [r1 + 0x8], r2
038440: mov64 r1, r10
038448: add64 r1, -0x3c0
038450: mov64 r2, r10
038458: add64 r2, -0x3e0
038460: mov64 r3, r8
038468: call 0x78e2 ; call 0x74b80
038470: mov64 r1, r8
038478: ldxdw r8, [r10 - 0x3c0]
038480: jeq r8, 0x2, +0x1 ; branch 0x38490
038488: ja +0xc ; branch 0x384f0
038490: stxdw [r10 - 0x5f0], r7
038498: ldxdw r2, [r10 - 0x588]
0384a0: ldxdw r2, [r10 - 0x3b8]
0384a8: stxdw [r10 - 0x5e8], r2
0384b0: jlt r2, r1, +0x1 ; branch 0x384c0
0384b8: ja +0x8 ; branch 0x38500
0384c0: mov64 r1, r10
0384c8: add64 r1, -0x4f0
0384d0: call 0x3d8 ; call 0x3a398
0384d8: ldxdw r1, [r10 - 0x4e8]
0384e0: ldxdw r8, [r10 - 0x4f0]
0384e8: ja -0xd0 ; branch 0x37e70
0384f0: ldxdw r1, [r10 - 0x3b8]
0384f8: ja -0xd2 ; branch 0x37e70
038500: ldxdw r2, [r10 - 0x5e8]
038508: ldxdw r1, [r10 - 0x5c0]
038510: sub64 r2, r1
038518: ldxdw r3, [r10 - 0x5c8]
038520: mov64 r7, r3
038528: stxdw [r10 - 0x5f8], r2
038530: add64 r7, r2
038538: mov64 r1, 0x1
038540: jlt r7, r3, +0x1 ; branch 0x38550
038548: mov64 r1, 0x0
038550: and64 r1, 0x1
038558: jne r1, 0x0, +0x24 ; branch 0x38680
038560: ldxdw r1, [r10 - 0x570]
038568: jgt r7, r1, +0x1 ; branch 0x38578
038570: ja +0x27 ; branch 0x386b0
038578: mov64 r1, r10
038580: add64 r1, -0x3a0
038588: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
038598: call 0x79cb ; call 0x753f8
0385a0: mov64 r1, r10
0385a8: add64 r1, -0x388
0385b0: lddw r2, 0x11bf74 ; rodata b'\x04\x00\x00\x00\x07\x00\x00\x00*\x00\x00\x00(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kin'
0385c0: call -0x5fc5 ; call 0x87a0
0385c8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
0385d8: stxdw [r10 - 0x3b8], r1
0385e0: stb [r10 - 0x370], 0x2
0385e8: stw [r10 - 0x3a8], 0x195
0385f0: stdw [r10 - 0x3b0], 0x2e
0385f8: stdw [r10 - 0x3c0], 0x0
038600: stw [r10 - 0x328], 0x1774
038608: mov64 r1, r10
038610: add64 r1, -0x4c0
038618: mov64 r2, r10
038620: add64 r2, -0x3c0
038628: call 0x19531 ; call 0x102fb8
038630: ldxdw r3, [r10 - 0x4b8]
038638: ldxdw r2, [r10 - 0x4c0]
038640: mov64 r1, r10
038648: add64 r1, -0x4d0
038650: ldxdw r4, [r10 - 0x570]
038658: mov64 r5, r7
038660: call -0x6dc5 ; call 0x1840
038668: ldxdw r8, [r10 - 0x4d0]
038670: ldxdw r1, [r10 - 0x4c8]
038678: ja -0x102 ; branch 0x37e70
038680: mov64 r1, r10
038688: add64 r1, -0x4e0
038690: call 0xf5b9 ; call 0xb3460
038698: ldxdw r1, [r10 - 0x4d8]
0386a0: ldxdw r8, [r10 - 0x4e0]
0386a8: ja -0x108 ; branch 0x37e70
0386b0: ldxdw r4, [r6 + 0x158]
0386b8: ldxdw r3, [r6 + 0x138]
0386c0: ldxdw r2, [r6 + 0x170]
0386c8: ldxdw r1, [r6 + 0x148]
0386d0: ldxdw r5, [r6 + 0x120]
0386d8: ldxdw r0, [r10 - 0x568]
0386e0: stxdw [r10 - 0xff8], r0
0386e8: stxdw [r10 - 0xff0], r5
0386f0: stxdw [r10 - 0x1000], r1
0386f8: mov64 r1, r10
038700: add64 r1, -0x420
038708: mov64 r5, r10
038710: call 0x7342 ; call 0x72128
038718: ldxdw r8, [r10 - 0x420]
038720: jeq r8, 0x2, +0x1 ; branch 0x38730
038728: ja +0x38 ; branch 0x388f0
038730: ldxdw r4, [r6 + 0x150]
038738: ldxdw r3, [r6 + 0x140]
038740: ldxdw r2, [r6 + 0x178]
038748: ldxdw r1, [r6 + 0x160]
038750: ldxdw r5, [r6 + 0x128]
038758: ldxdw r0, [r10 - 0x5e8]
038760: stxdw [r10 - 0xff0], r0
038768: stxdw [r10 - 0xff8], r5
038770: stxdw [r10 - 0x1000], r1
038778: stdw [r10 - 0xfe8], 0x8
038780: stdw [r10 - 0xfe0], 0x0
038788: mov64 r1, r10
038790: add64 r1, -0x430
038798: mov64 r5, r10
0387a0: call 0x7402 ; call 0x727b8
0387a8: ldxdw r8, [r10 - 0x430]
0387b0: jeq r8, 0x2, +0x1 ; branch 0x387c0
0387b8: ja +0x28 ; branch 0x38900
0387c0: ldxdw r1, [r6 + 0x120]
0387c8: ldxb r4, [r1 + 0x11b]
0387d0: ldxdw r2, [r6 + 0x130]
0387d8: add64 r2, 0x8
0387e0: mov64 r1, r10
0387e8: add64 r1, -0x440
0387f0: ldxdw r3, [r10 - 0x5d0]
0387f8: call 0x589b ; call 0x64cd8
038800: ldxdw r2, [r6 + 0x178]
038808: ldxdw r3, [r6 + 0x140]
038810: ldxdw r4, [r6 + 0x150]
038818: ldxdw r1, [r6 + 0x168]
038820: ldxdw r5, [r6 + 0x128]
038828: ldxdw r0, [r10 - 0x440]
038830: stxdw [r10 - 0x5e8], r0
038838: ldxdw r0, [r10 - 0x438]
038840: stxdw [r10 - 0xff0], r0
038848: stxdw [r10 - 0xff8], r5
038850: stxdw [r10 - 0x1000], r1
038858: stdw [r10 - 0xfe8], 0x8
038860: stdw [r10 - 0xfe0], 0x0
038868: mov64 r1, r10
038870: add64 r1, -0x450
038878: mov64 r5, r10
038880: call 0x73e6 ; call 0x727b8
038888: ldxdw r8, [r10 - 0x450]
038890: jeq r8, 0x2, +0x1 ; branch 0x388a0
038898: ja +0xe ; branch 0x38910
0388a0: ldxdw r1, [r10 - 0x5f0]
0388a8: jne r1, 0x0, +0xe ; branch 0x38920
0388b0: mov64 r1, 0x0
0388b8: stxdw [r10 - 0x608], r1
0388c0: ldxdw r1, [r10 - 0x578]
0388c8: ldxdw r7, [r1 + 0x18]
0388d0: ldxdw r1, [r1 + 0x10]
0388d8: stxdw [r10 - 0x600], r1
0388e0: mov64 r1, 0x0
0388e8: ja +0x69 ; branch 0x38c38
0388f0: ldxdw r1, [r10 - 0x418]
0388f8: ja -0x152 ; branch 0x37e70
038900: ldxdw r1, [r10 - 0x428]
038908: ja -0x154 ; branch 0x37e70
038910: ldxdw r1, [r10 - 0x448]
038918: ja -0x156 ; branch 0x37e70
038920: ldxdw r1, [r10 - 0x578]
038928: ldxdw r7, [r1 + 0x18]
038930: ldxdw r1, [r1 + 0x10]
038938: stxdw [r10 - 0x600], r1
038940: ldxdw r1, [r6 + 0x120]
038948: ldxb r1, [r1 + 0x11c]
038950: jne r1, 0x0, +0x2c ; branch 0x38ab8
038958: ldxdw r1, [r6 + 0x138]
038960: ldxdw r1, [r1 + 0x58]
038968: ldxdw r1, [r1 + 0x0]
038970: ldxdw r2, [r1 + 0x18]
038978: stxdw [r10 - 0x3a8], r2
038980: ldxdw r2, [r1 + 0x10]
038988: stxdw [r10 - 0x3b0], r2
038990: ldxdw r2, [r1 + 0x8]
038998: stxdw [r10 - 0x3b8], r2
0389a0: ldxdw r1, [r1 + 0x0]
0389a8: stxdw [r10 - 0x3c0], r1
0389b0: mov64 r1, r10
0389b8: add64 r1, -0x470
0389c0: mov64 r4, r10
0389c8: add64 r4, -0x3c0
0389d0: mov64 r2, 0x0
0389d8: stxdw [r10 - 0x608], r2
0389e0: ldxdw r2, [r10 - 0x600]
0389e8: mov64 r3, r7
0389f0: mov64 r5, 0x0
0389f8: call 0x2c12 ; call 0x4ea90
038a00: ldxdw r8, [r10 - 0x470]
038a08: jeq r8, 0x2, +0x1 ; branch 0x38a18
038a10: ja +0xb2 ; branch 0x38fa8
038a18: ldxdw r4, [r6 + 0x150]
038a20: ldxdw r3, [r6 + 0x140]
038a28: ldxdw r2, [r6 + 0x178]
038a30: ldxdw r1, [r6 + 0x198]
038a38: ldxdw r5, [r6 + 0x128]
038a40: ldxdw r0, [r10 - 0x5f0]
038a48: stxdw [r10 - 0xff0], r0
038a50: stxdw [r10 - 0xff8], r5
038a58: stxdw [r10 - 0x1000], r1
038a60: stdw [r10 - 0xfe8], 0x8
038a68: stdw [r10 - 0xfe0], 0x0
038a70: mov64 r1, r10
038a78: add64 r1, -0x480
038a80: mov64 r5, r10
038a88: call 0x73a5 ; call 0x727b8
038a90: mov64 r1, 0x1
038a98: ldxdw r8, [r10 - 0x480]
038aa0: jeq r8, 0x2, +0x32 ; branch 0x38c38
038aa8: ldxdw r1, [r10 - 0x478]
038ab0: ja -0x189 ; branch 0x37e70
038ab8: ldxdw r1, [r6 + 0x1a8]
038ac0: stxdw [r10 - 0x608], r1
038ac8: ldxdw r1, [r6 + 0x150]
038ad0: stxdw [r10 - 0x610], r1
038ad8: ldxdw r3, [r6 + 0x140]
038ae0: ldxdw r4, [r6 + 0x138]
038ae8: ldxdw r4, [r4 + 0x58]
038af0: ldxdw r4, [r4 + 0x0]
038af8: ldxdw r5, [r4 + 0x18]
038b00: stxdw [r10 - 0x3a8], r5
038b08: ldxdw r5, [r4 + 0x10]
038b10: stxdw [r10 - 0x3b0], r5
038b18: ldxdw r5, [r4 + 0x8]
038b20: stxdw [r10 - 0x3b8], r5
038b28: ldxdw r4, [r4 + 0x0]
038b30: stxdw [r10 - 0x3c0], r4
038b38: ldxb r5, [r3 + 0x30]
038b40: ldxdw r3, [r3 + 0x58]
038b48: ldxdw r4, [r6 + 0x128]
038b50: ldxdw r0, [r6 + 0x178]
038b58: ldxdw r8, [r6 + 0x180]
038b60: ldxdw r1, [r6 + 0x188]
038b68: ldxdw r2, [r10 - 0x5f0]
038b70: stxdw [r10 - 0xfc8], r2
038b78: mov64 r2, r10
038b80: add64 r2, -0x3c0
038b88: stxdw [r10 - 0xfc0], r2
038b90: stxdw [r10 - 0xfd0], r1
038b98: stxdw [r10 - 0xfd8], r8
038ba0: stxdw [r10 - 0xfe0], r0
038ba8: stxdw [r10 - 0xfe8], r3
038bb0: stxdw [r10 - 0xff0], r5
038bb8: ldxdw r1, [r10 - 0x610]
038bc0: stxdw [r10 - 0xff8], r1
038bc8: ldxdw r1, [r10 - 0x608]
038bd0: stxdw [r10 - 0x1000], r1
038bd8: mov64 r1, r10
038be0: add64 r1, -0x460
038be8: mov64 r5, r10
038bf0: ldxdw r2, [r10 - 0x600]
038bf8: mov64 r3, r7
038c00: call -0x74c ; call 0x351a8
038c08: ldxdw r8, [r10 - 0x460]
038c10: jeq r8, 0x2, +0x1 ; branch 0x38c20
038c18: ja +0x48 ; branch 0x38e60
038c20: mov64 r1, 0x2
038c28: mov64 r2, 0x1
038c30: stxdw [r10 - 0x608], r2
038c38: ldxdw r4, [r6 + 0x130]
038c40: ldxdw r2, [r6 + 0x140]
038c48: ldxdw r2, [r2 + 0x58]
038c50: ldxdw r2, [r2 + 0x0]
038c58: ldxdw r3, [r2 + 0x18]
038c60: stxdw [r10 - 0xa0], r3
038c68: ldxdw r3, [r2 + 0x10]
038c70: stxdw [r10 - 0xa8], r3
038c78: ldxdw r3, [r2 + 0x8]
038c80: stxdw [r10 - 0xb0], r3
038c88: ldxdw r2, [r2 + 0x0]
038c90: stxdw [r10 - 0xb8], r2
038c98: ldxdw r2, [r6 + 0x178]
038ca0: ldxdw r2, [r2 + 0x0]
038ca8: ldxdw r3, [r2 + 0x18]
038cb0: stxdw [r10 - 0x3a8], r3
038cb8: ldxdw r3, [r2 + 0x10]
038cc0: stxdw [r10 - 0x3b0], r3
038cc8: ldxdw r3, [r2 + 0x8]
038cd0: stxdw [r10 - 0x3b8], r3
038cd8: ldxdw r2, [r2 + 0x0]
038ce0: stxdw [r10 - 0x3c0], r2
038ce8: mov64 r2, r10
038cf0: add64 r2, -0xb8
038cf8: stxdw [r10 - 0xff8], r2
038d00: mov64 r2, r10
038d08: add64 r2, -0x3c0
038d10: stxdw [r10 - 0xff0], r2
038d18: stxdw [r10 - 0x1000], r1
038d20: add64 r4, 0x8
038d28: mov64 r1, r10
038d30: add64 r1, -0x50
038d38: mov64 r5, r10
038d40: ldxdw r2, [r10 - 0x600]
038d48: mov64 r3, r7
038d50: call -0x381 ; call 0x37150
038d58: ldxdw r1, [r10 - 0x40]
038d60: ldxdw r2, [r10 - 0x50]
038d68: jeq r2, 0x0, +0x2 ; branch 0x38d80
038d70: ldxdw r8, [r10 - 0x48]
038d78: ja -0x1e2 ; branch 0x37e70
038d80: ldxdw r2, [r10 - 0x5e8]
038d88: jeq r2, 0x0, +0x1c ; branch 0x38e70
038d90: mov64 r5, r6
038d98: add64 r5, 0x180
038da0: ldxdw r0, [r10 - 0x48]
038da8: ldxdw r4, [r6 + 0x150]
038db0: ldxdw r3, [r6 + 0x140]
038db8: ldxdw r2, [r6 + 0x178]
038dc0: ldxdw r8, [r6 + 0x128]
038dc8: ldxdw r7, [r10 - 0x5e8]
038dd0: stxdw [r10 - 0xfd8], r7
038dd8: mov64 r7, r6
038de0: add64 r7, 0x188
038de8: stxdw [r10 - 0xfe0], r7
038df0: stxdw [r10 - 0xfe8], r5
038df8: stxdw [r10 - 0xff0], r8
038e00: stxdw [r10 - 0xff8], r1
038e08: stxdw [r10 - 0x1000], r0
038e10: stdw [r10 - 0xfd0], 0x8
038e18: stdw [r10 - 0xfc8], 0x0
038e20: mov64 r1, r10
038e28: add64 r1, -0x490
038e30: mov64 r5, r10
038e38: call 0x6d4b ; call 0x6f898
038e40: ldxdw r8, [r10 - 0x490]
038e48: jeq r8, 0x2, +0x4 ; branch 0x38e70
038e50: ldxdw r1, [r10 - 0x488]
038e58: ja -0x1fe ; branch 0x37e70
038e60: ldxdw r1, [r10 - 0x458]
038e68: ja -0x200 ; branch 0x37e70
038e70: ldxdw r1, [r6 + 0x128]
038e78: ldxdw r1, [r1 + 0x0]
038e80: ldxdw r2, [r1 + 0x0]
038e88: ldxdw r3, [r1 + 0x8]
038e90: ldxdw r4, [r1 + 0x10]
038e98: ldxdw r1, [r1 + 0x18]
038ea0: ldxdw r5, [r6 + 0x1a8]
038ea8: stxdw [r5 + 0x20], r1
038eb0: stxdw [r5 + 0x18], r4
038eb8: stxdw [r5 + 0x10], r3
038ec0: stxdw [r5 + 0x8], r2
038ec8: ldxdw r1, [r6 + 0x1a8]
038ed0: ldxdw r2, [r1 + 0x40]
038ed8: stxdw [r10 - 0x618], r2
038ee0: ldxdw r2, [r1 + 0x38]
038ee8: stxdw [r10 - 0x610], r2
038ef0: ldxdw r2, [r1 + 0x30]
038ef8: stxdw [r10 - 0x600], r2
038f00: ldxdw r1, [r1 + 0x28]
038f08: stxdw [r10 - 0x620], r1
038f10: mov64 r1, r10
038f18: add64 r1, -0xb8
038f20: call 0x19be2 ; call 0x106e38
038f28: ldxdw r1, [r10 - 0xb8]
038f30: jeq r1, 0x0, +0x10 ; branch 0x38fb8
038f38: ldxdw r1, [r10 - 0xb0]
038f40: ldxdw r2, [r10 - 0xa8]
038f48: ldxdw r3, [r10 - 0xa0]
038f50: stxdw [r10 - 0xa8], r3
038f58: stxdw [r10 - 0xb0], r2
038f60: stxdw [r10 - 0xb8], r1
038f68: mov64 r1, r10
038f70: add64 r1, -0x4a0
038f78: mov64 r2, r10
038f80: add64 r2, -0xb8
038f88: call 0x19416 ; call 0x103040
038f90: ldxdw r1, [r10 - 0x498]
038f98: ldxdw r8, [r10 - 0x4a0]
038fa0: ja -0x227 ; branch 0x37e70
038fa8: ldxdw r1, [r10 - 0x468]
038fb0: ja -0x229 ; branch 0x37e70
038fb8: ldxdw r1, [r10 - 0x90]
038fc0: stxdw [r10 - 0x650], r1
038fc8: ldxdw r1, [r6 + 0x120]
038fd0: ldxdw r2, [r1 + 0x0]
038fd8: ldxdw r2, [r2 + 0x0]
038fe0: ldxdw r3, [r2 + 0x18]
038fe8: stxdw [r10 - 0x1a8], r3
038ff0: ldxdw r3, [r2 + 0x10]
038ff8: stxdw [r10 - 0x1b0], r3
039000: ldxdw r3, [r2 + 0x8]
039008: stxdw [r10 - 0x1b8], r3
039010: ldxdw r2, [r2 + 0x0]
039018: stxdw [r10 - 0x1c0], r2
039020: ldxdw r2, [r6 + 0x128]
039028: ldxdw r2, [r2 + 0x0]
039030: ldxdw r3, [r2 + 0x18]
039038: stxdw [r10 - 0x188], r3
039040: ldxdw r3, [r2 + 0x10]
039048: stxdw [r10 - 0x190], r3
039050: ldxdw r3, [r2 + 0x8]
039058: stxdw [r10 - 0x198], r3
039060: ldxdw r2, [r2 + 0x0]
039068: stxdw [r10 - 0x1a0], r2
039070: ldxdw r2, [r6 + 0x148]
039078: ldxdw r2, [r2 + 0x20]
039080: ldxdw r2, [r2 + 0x0]
039088: ldxdw r3, [r2 + 0x18]
039090: stxdw [r10 - 0x168], r3
039098: ldxdw r3, [r2 + 0x10]
0390a0: stxdw [r10 - 0x170], r3
0390a8: ldxdw r3, [r2 + 0x8]
0390b0: stxdw [r10 - 0x178], r3
0390b8: ldxdw r2, [r2 + 0x0]
0390c0: stxdw [r10 - 0x180], r2
0390c8: ldxdw r2, [r6 + 0x150]
0390d0: ldxdw r2, [r2 + 0x20]
0390d8: ldxdw r2, [r2 + 0x0]
0390e0: ldxdw r3, [r2 + 0x18]
0390e8: stxdw [r10 - 0x148], r3
0390f0: ldxdw r3, [r2 + 0x10]
0390f8: stxdw [r10 - 0x150], r3
039100: ldxdw r3, [r2 + 0x8]
039108: stxdw [r10 - 0x158], r3
039110: ldxdw r2, [r2 + 0x0]
039118: stxdw [r10 - 0x160], r2
039120: ldxdw r2, [r6 + 0x90]
039128: ldxdw r3, [r2 + 0x18]
039130: stxdw [r10 - 0x8], r3
039138: ldxdw r3, [r2 + 0x10]
039140: stxdw [r10 - 0x10], r3
039148: ldxdw r3, [r2 + 0x8]
039150: stxdw [r10 - 0x18], r3
039158: ldxdw r2, [r2 + 0x0]
039160: stxdw [r10 - 0x20], r2
039168: ldxdw r2, [r6 + 0x168]
039170: ldxdw r2, [r2 + 0x20]
039178: ldxdw r2, [r2 + 0x0]
039180: ldxdw r3, [r2 + 0x18]
039188: stxdw [r10 - 0x38], r3
039190: ldxdw r3, [r2 + 0x10]
039198: stxdw [r10 - 0x40], r3
0391a0: ldxdw r3, [r2 + 0x8]
0391a8: stxdw [r10 - 0x48], r3
0391b0: ldxdw r2, [r2 + 0x0]
0391b8: stxdw [r10 - 0x50], r2
0391c0: ldxdw r2, [r1 + 0xe0]
0391c8: stxdw [r10 - 0xa0], r2
0391d0: ldxdw r2, [r1 + 0xd8]
0391d8: stxdw [r10 - 0xa8], r2
0391e0: ldxdw r2, [r1 + 0xd0]
0391e8: stxdw [r10 - 0xb0], r2
0391f0: ldxdw r2, [r1 + 0xc8]
0391f8: stxdw [r10 - 0xb8], r2
039200: lddw r2, 0x300000000
039210: ldxdw r2, [r2 + 0x0]
039218: mov64 r3, 0x0
039220: stxdw [r10 - 0x628], r3
039228: mov64 r4, 0x1
039230: mov64 r3, r2
039238: add64 r3, -0x3
039240: jgt r3, r2, +0x1 ; branch 0x39250
039248: mov64 r4, 0x0
039250: mov64 r5, 0x0
039258: jne r4, 0x0, +0x1 ; branch 0x39268
039260: mov64 r5, r3
039268: lddw r7, 0x300007ffd
039278: jeq r2, 0x0, +0x1 ; branch 0x39288
039280: mov64 r7, r5
039288: mov64 r2, 0x0
039290: stxdw [r10 - 0x638], r2
039298: ldxdw r2, [r10 - 0x608]
0392a0: jne r2, 0x0, +0x2 ; branch 0x392b8
0392a8: ldxdw r2, [r10 - 0x5f0]
0392b0: stxdw [r10 - 0x638], r2
0392b8: mov64 r2, 0x0
0392c0: stxdw [r10 - 0x640], r2
0392c8: ldxdw r2, [r10 - 0x608]
0392d0: jne r2, 0x0, +0x2 ; branch 0x392e8
0392d8: ldxdw r2, [r10 - 0x5d8]
0392e0: stxdw [r10 - 0x640], r2
0392e8: ldxb r1, [r1 + 0x11e]
0392f0: mov64 r2, 0x0
0392f8: stxdw [r10 - 0x630], r2
039300: jeq r1, 0x0, +0x2 ; branch 0x39318
039308: ldxdw r2, [r10 - 0x5f0]
039310: stxdw [r10 - 0x630], r2
039318: jeq r1, 0x0, +0x2 ; branch 0x39330
039320: ldxdw r1, [r10 - 0x5d8]
039328: stxdw [r10 - 0x628], r1
039330: lddw r1, 0x300000007
039340: jgt r7, r1, +0x3 ; branch 0x39360
039348: mov64 r1, 0x1
039350: mov64 r2, 0x3
039358: call 0x1affd ; call 0x111348
039360: lddw r1, 0x300000000
039370: mov64 r2, r7
039378: stxdw [r1 + 0x0], r2
039380: stb [r2 + 0x2], 0x79
039388: sth [r2 + 0x0], 0x7562
039390: mov64 r1, 0x0
039398: stxdw [r10 - 0x648], r1
0393a0: ldxdw r1, [r10 - 0x608]
0393a8: jne r1, 0x0, +0x2 ; branch 0x393c0
0393b0: mov64 r1, 0x0
0393b8: stxdw [r10 - 0x5f0], r1
0393c0: ldxdw r1, [r10 - 0x608]
0393c8: jne r1, 0x0, +0x2 ; branch 0x393e0
0393d0: mov64 r1, 0x0
0393d8: stxdw [r10 - 0x5d8], r1
0393e0: ldxdw r1, [r6 + 0x120]
0393e8: ldxb r1, [r1 + 0x11b]
0393f0: jeq r1, 0x0, +0x1 ; branch 0x39400
0393f8: ja +0x3 ; branch 0x39418
039400: ldxdw r1, [r6 + 0x130]
039408: ldxdw r1, [r1 + 0x3a0]
039410: stxdw [r10 - 0x648], r1
039418: mov64 r1, r10
039420: add64 r1, -0x140
039428: mov64 r2, r10
039430: add64 r2, -0x3e0
039438: ldxdw r3, [r10 - 0x5e8]
039440: call 0x7697 ; call 0x74900
039448: ldxdw r8, [r10 - 0x140]
039450: jne r8, 0x2, +0x10b ; branch 0x39cb0
039458: ldxdw r1, [r10 - 0x138]
039460: stxdw [r10 - 0x5e8], r1
039468: ldxdw r1, [r6 + 0x120]
039470: ldxdw r2, [r1 + 0xf0]
039478: stxdw [r10 - 0x608], r2
039480: ldxdw r8, [r1 + 0xe8]
039488: add64 r1, 0x8
039490: call 0x65b6 ; call 0x6c248
039498: lddw r1, 0x38d7ea4c68000
0394a8: ldxdw r2, [r6 + 0x120]
0394b0: ldxb r3, [r2 + 0x11b]
0394b8: jeq r3, 0x0, +0x1 ; branch 0x394c8
0394c0: ja +0x2 ; branch 0x394d8
0394c8: ldxdw r1, [r6 + 0x138]
0394d0: ldxdw r1, [r1 + 0x28]
0394d8: ldxdw r2, [r2 + 0x110]
0394e0: ldxdw r3, [r10 - 0x5c8]
0394e8: stxdw [r10 - 0x340], r3
0394f0: ldxdw r3, [r10 - 0x5c0]
0394f8: stxdw [r10 - 0x348], r3
039500: ldxdw r3, [r10 - 0x5d0]
039508: stxdw [r10 - 0x350], r3
039510: ldxdw r3, [r10 - 0x5e0]
039518: stxdw [r10 - 0x358], r3
039520: ldxdw r3, [r10 - 0x5a8]
039528: stxdw [r10 - 0x360], r3
039530: ldxdw r3, [r10 - 0x5b8]
039538: stxdw [r10 - 0x368], r3
039540: ldxdw r3, [r10 - 0x5b0]
039548: stxdw [r10 - 0x370], r3
039550: ldxdw r3, [r10 - 0x5a0]
039558: stxdw [r10 - 0x378], r3
039560: ldxdw r3, [r10 - 0x588]
039568: stxdw [r10 - 0x380], r3
039570: ldxdw r3, [r10 - 0x590]
039578: stxdw [r10 - 0x388], r3
039580: ldxdw r3, [r10 - 0x598]
039588: stxdw [r10 - 0x390], r3
039590: ldxdw r3, [r10 - 0x570]
039598: stxdw [r10 - 0x398], r3
0395a0: ldxdw r3, [r10 - 0x650]
0395a8: stxdw [r10 - 0x3a8], r3
0395b0: ldxdw r3, [r10 - 0x1c0]
0395b8: stxdw [r10 - 0x338], r3
0395c0: ldxdw r3, [r10 - 0x1b8]
0395c8: stxdw [r10 - 0x330], r3
0395d0: ldxdw r3, [r10 - 0x1b0]
0395d8: stxdw [r10 - 0x328], r3
0395e0: ldxdw r3, [r10 - 0x1a8]
0395e8: stxdw [r10 - 0x320], r3
0395f0: ldxdw r4, [r10 - 0x568]
0395f8: stxdw [r10 - 0x3a0], r4
039600: ldxdw r3, [r10 - 0x188]
039608: stxdw [r10 - 0x300], r3
039610: ldxdw r3, [r10 - 0x190]
039618: stxdw [r10 - 0x308], r3
039620: ldxdw r3, [r10 - 0x198]
039628: stxdw [r10 - 0x310], r3
039630: ldxdw r3, [r10 - 0x1a0]
039638: stxdw [r10 - 0x318], r3
039640: ldxdw r3, [r10 - 0x180]
039648: stxdw [r10 - 0x2f8], r3
039650: ldxdw r3, [r10 - 0x178]
039658: stxdw [r10 - 0x2f0], r3
039660: ldxdw r3, [r10 - 0x170]
039668: stxdw [r10 - 0x2e8], r3
039670: ldxdw r3, [r10 - 0x168]
039678: stxdw [r10 - 0x2e0], r3
039680: ldxdw r3, [r10 - 0x160]
039688: stxdw [r10 - 0x2d8], r3
039690: ldxdw r3, [r10 - 0x158]
039698: stxdw [r10 - 0x2d0], r3
0396a0: ldxdw r3, [r10 - 0x150]
0396a8: stxdw [r10 - 0x2c8], r3
0396b0: ldxdw r3, [r10 - 0x148]
0396b8: stxdw [r10 - 0x2c0], r3
0396c0: ldxdw r3, [r10 - 0x8]
0396c8: stxdw [r10 - 0x2a0], r3
0396d0: ldxdw r3, [r10 - 0x10]
0396d8: stxdw [r10 - 0x2a8], r3
0396e0: ldxdw r3, [r10 - 0x18]
0396e8: stxdw [r10 - 0x2b0], r3
0396f0: ldxdw r3, [r10 - 0x20]
0396f8: stxdw [r10 - 0x2b8], r3
039700: ldxdw r3, [r10 - 0x38]
039708: stxdw [r10 - 0x280], r3
039710: ldxdw r3, [r10 - 0x40]
039718: stxdw [r10 - 0x288], r3
039720: ldxdw r3, [r10 - 0x48]
039728: stxdw [r10 - 0x290], r3
039730: ldxdw r3, [r10 - 0x50]
039738: stxdw [r10 - 0x298], r3
039740: ldxdw r3, [r10 - 0xa0]
039748: stxdw [r10 - 0x260], r3
039750: ldxdw r3, [r10 - 0xa8]
039758: stxdw [r10 - 0x268], r3
039760: ldxdw r3, [r10 - 0xb0]
039768: stxdw [r10 - 0x270], r3
039770: ldxdw r3, [r10 - 0xb8]
039778: stxdw [r10 - 0x278], r3
039780: ldxdw r3, [r10 - 0x580]
039788: stxb [r10 - 0x1c8], r3
039790: ldxdw r3, [r10 - 0x638]
039798: stxdw [r10 - 0x250], r3
0397a0: ldxdw r3, [r10 - 0x640]
0397a8: stxdw [r10 - 0x258], r3
0397b0: stxdw [r10 - 0x228], r4
0397b8: ldxdw r3, [r10 - 0x618]
0397c0: stxdw [r10 - 0x230], r3
0397c8: ldxdw r3, [r10 - 0x610]
0397d0: stxdw [r10 - 0x238], r3
0397d8: ldxdw r3, [r10 - 0x600]
0397e0: stxdw [r10 - 0x240], r3
0397e8: ldxdw r3, [r10 - 0x620]
0397f0: stxdw [r10 - 0x248], r3
0397f8: ldxdw r3, [r10 - 0x608]
039800: stxdw [r10 - 0x1f8], r3
039808: stxdw [r10 - 0x200], r8
039810: stxb [r10 - 0x1c7], r0
039818: ldxdw r3, [r10 - 0x5e8]
039820: stxdw [r10 - 0x208], r3
039828: ldxdw r3, [r10 - 0x648]
039830: stxdw [r10 - 0x210], r3
039838: ldxdw r3, [r10 - 0x5f0]
039840: stxdw [r10 - 0x218], r3
039848: ldxdw r3, [r10 - 0x5d8]
039850: stxdw [r10 - 0x220], r3
039858: stxdw [r10 - 0x3b8], r7
039860: stdw [r10 - 0x3b0], 0x3
039868: stdw [r10 - 0x3c0], 0x3
039870: ldxdw r3, [r10 - 0x5f8]
039878: stxdw [r10 - 0x1d0], r3
039880: stxdw [r10 - 0x1d8], r2
039888: ldxdw r2, [r10 - 0x630]
039890: stxdw [r10 - 0x1e0], r2
039898: ldxdw r2, [r10 - 0x628]
0398a0: stxdw [r10 - 0x1e8], r2
0398a8: stxdw [r10 - 0x1f0], r1
0398b0: mov64 r1, r10
0398b8: add64 r1, -0xb8
0398c0: mov64 r7, r10
0398c8: add64 r7, -0x3c0
0398d0: mov64 r2, r7
0398d8: call 0xf077 ; call 0xb1c98
0398e0: ldxdw r1, [r10 - 0xa8]
0398e8: stxdw [r10 - 0x48], r1
0398f0: ldxdw r1, [r10 - 0xb0]
0398f8: stxdw [r10 - 0x50], r1
039900: mov64 r1, r10
039908: add64 r1, -0x50
039910: mov64 r2, 0x1
039918: call 0x19a2c ; call 0x106a80
039920: add64 r6, 0xc0
039928: mov64 r1, r10
039930: add64 r1, -0x130
039938: stxdw [r10 - 0x570], r1
039940: mov64 r2, r6
039948: call -0x56fb ; call 0xe178
039950: ldxdw r1, [r10 - 0x578]
039958: ldxb r1, [r1 + 0x20]
039960: stxdw [r10 - 0x568], r1
039968: mov64 r1, r10
039970: add64 r1, -0x100
039978: mov64 r2, r7
039980: call 0xf062 ; call 0xb1c98
039988: lddw r1, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
039998: lddw r2, 0x11c606 ; rodata b'\xe4E\xa5.Q\xcb\x9a\x1d\xf1\x9am\x04\x11\xb1m\xbc\xca*\xf6+\x8e\xbe\x1e\xffDeadlockdeadlock\x95\x08\x9c\xca\xa0\xfc\xb0\xd9lamportsend_time__event_aut'
0399a8: add64 r2, 0x8
0399b0: stxdw [r10 - 0xc0], r2
0399b8: stxdw [r10 - 0xc8], r1
0399c0: ldxdw r1, [r10 - 0x100]
0399c8: stxdw [r10 - 0xd8], r1
0399d0: ldxdw r1, [r10 - 0xf8]
0399d8: stxdw [r10 - 0xe0], r1
0399e0: stxdw [r10 - 0xe8], r1
0399e8: ldxdw r2, [r10 - 0xf0]
0399f0: add64 r1, r2
0399f8: stxdw [r10 - 0xd0], r1
039a00: mov64 r1, r10
039a08: add64 r1, -0x160
039a10: mov64 r2, r10
039a18: add64 r2, -0xe8
039a20: call -0x538c ; call 0xfdc8
039a28: ldxdw r6, [r10 - 0x158]
039a30: ldxdw r8, [r10 - 0x150]
039a38: mov64 r1, 0x22
039a40: mov64 r2, 0x1
039a48: call -0x5d1d ; call 0xb168
039a50: ldxdw r1, [r10 - 0x130]
039a58: ldxdw r2, [r1 + 0x18]
039a60: ldxdw r3, [r1 + 0x10]
039a68: ldxdw r4, [r1 + 0x8]
039a70: ldxdw r1, [r1 + 0x0]
039a78: stxdw [r0 + 0x0], r1
039a80: stxdw [r0 + 0x8], r4
039a88: stxdw [r0 + 0x10], r3
039a90: stxdw [r0 + 0x18], r2
039a98: sth [r0 + 0x20], 0x1
039aa0: stxdw [r10 - 0x48], r0
039aa8: stdw [r10 - 0x50], 0x1
039ab0: stdw [r10 - 0x40], 0x1
039ab8: mov64 r7, r10
039ac0: add64 r7, -0xb8
039ac8: mov64 r5, r10
039ad0: add64 r5, -0x50
039ad8: mov64 r1, r7
039ae0: lddw r2, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
039af0: mov64 r3, r6
039af8: mov64 r4, r8
039b00: call 0x1a809 ; call 0x10db50
039b08: mov64 r8, r10
039b10: add64 r8, -0x50
039b18: mov64 r1, r8
039b20: ldxdw r2, [r10 - 0x570]
039b28: mov64 r3, 0x30
039b30: call 0x1bfac ; call 0x119898
039b38: mov64 r1, r10
039b40: add64 r1, -0x20
039b48: stxdw [r10 - 0x180], r1
039b50: mov64 r1, r10
039b58: add64 r1, -0x1a0
039b60: stxdw [r10 - 0x10], r1
039b68: lddw r1, 0x11c646 ; rodata b'__event_authorityGlobalVolumeAccumulator=programs/pump-amm/src/instructions'
039b78: stxdw [r10 - 0x20], r1
039b80: ldxdw r1, [r10 - 0x568]
039b88: stxb [r10 - 0x1a0], r1
039b90: stdw [r10 - 0x178], 0x2
039b98: stdw [r10 - 0x8], 0x1
039ba0: stdw [r10 - 0x18], 0x11
039ba8: mov64 r1, r10
039bb0: add64 r1, -0x180
039bb8: stxdw [r10 - 0x1000], r1
039bc0: stdw [r10 - 0xff8], 0x1
039bc8: mov64 r1, r10
039bd0: add64 r1, -0x68
039bd8: mov64 r5, r10
039be0: mov64 r2, r7
039be8: mov64 r3, r8
039bf0: mov64 r4, 0x1
039bf8: call 0x199d7 ; call 0x106ab8
039c00: lddw r1, -0x7fffffffffffffe6
039c10: ldxdw r2, [r10 - 0x68]
039c18: jne r2, r1, +0x14 ; branch 0x39cc0
039c20: ldxdw r1, [r10 - 0x40]
039c28: ldxdw r2, [r10 - 0x48]
039c30: ldxdw r3, [r2 + 0x0]
039c38: add64 r3, -0x1
039c40: stxdw [r2 + 0x0], r3
039c48: jne r3, 0x0, +0x3 ; branch 0x39c68
039c50: ldxdw r3, [r2 + 0x8]
039c58: add64 r3, -0x1
039c60: stxdw [r2 + 0x8], r3
039c68: ldxdw r2, [r1 + 0x0]
039c70: add64 r2, -0x1
039c78: stxdw [r1 + 0x0], r2
039c80: jne r2, 0x0, +0x3 ; branch 0x39ca0
039c88: ldxdw r2, [r1 + 0x8]
039c90: add64 r2, -0x1
039c98: stxdw [r1 + 0x8], r2
039ca0: mov64 r8, 0x2
039ca8: ja -0x3c8 ; branch 0x37e70
039cb0: ldxdw r1, [r10 - 0x138]
039cb8: ja -0x3ca ; branch 0x37e70
039cc0: mov64 r1, r10
039cc8: add64 r1, -0x4b0
039cd0: mov64 r2, r10
039cd8: add64 r2, -0x68
039ce0: call 0x1926b ; call 0x103040
039ce8: ldxdw r2, [r10 - 0x40]
039cf0: ldxdw r1, [r10 - 0x4a8]
039cf8: ldxdw r8, [r10 - 0x4b0]
039d00: ldxdw r3, [r10 - 0x48]
039d08: ldxdw r4, [r3 + 0x0]
039d10: add64 r4, -0x1
039d18: stxdw [r3 + 0x0], r4
039d20: jne r4, 0x0, +0x3 ; branch 0x39d40
039d28: ldxdw r4, [r3 + 0x8]
039d30: add64 r4, -0x1
039d38: stxdw [r3 + 0x8], r4
039d40: ldxdw r3, [r2 + 0x0]
039d48: add64 r3, -0x1
039d50: stxdw [r2 + 0x0], r3
039d58: jne r3, 0x0, -0x3de ; branch 0x37e70
039d60: ldxdw r3, [r2 + 0x8]
039d68: add64 r3, -0x1
039d70: stxdw [r2 + 0x8], r3
039d78: ja -0x3e2 ; branch 0x37e70
