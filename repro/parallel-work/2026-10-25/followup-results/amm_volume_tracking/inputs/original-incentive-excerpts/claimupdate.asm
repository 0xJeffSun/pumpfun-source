06d408: ldxdw r0, [r2 + 0x200]
06d410: ldxdw r7, [r3 + 0x38]
06d418: jsge r7, r0, +0x1 ; branch 0x6d428
06d420: jslt r4, r0, +0x14 ; branch 0x6d4c8
06d428: jsgt r4, -0x1, +0xa ; branch 0x6d480
06d430: mov64 r3, r10
06d438: add64 r3, -0x1
06d440: lddw r1, 0x11d013 ; rodata b'SVM is 64-bitprograms/pump-amm/src/utils/token.rsprograms/pump-amm/src/util'
06d450: mov64 r2, 0xd
06d458: lddw r4, 0x1225b8 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xe1\x00\x00\x00\x00\x00\x00\x9f\xce\x11\x00,\x00\x00\x00\x00\x00\x00\x00\x84\x01\x00\x00-\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x006\x00\x00'
06d468: lddw r5, 0x122740 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x8e\x01\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00 \xd0\x11\x00$\x00\x00\x00\x00\x00\x00\x00U\x01\x00\x00$\x00\x00\x00\x00\x00\x00\x00\xc9\xd7\x11\x00/\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf8\xd7\x11\x00G\x00\x00'
06d478: call 0x14b63 ; call 0x112f98
06d480: jsgt r0, -0x1, +0x1 ; branch 0x6d490
06d488: ja -0xc ; branch 0x6d430
06d490: mov64 r6, 0x2
06d498: stxdw [r10 - 0x150], r6
06d4a0: jlt r4, r0, +0xb2 ; branch 0x6da38
06d4a8: ldxdw r8, [r2 + 0x210]
06d4b0: jeq r8, 0x0, +0xb0 ; branch 0x6da38
06d4b8: jsgt r8, -0x1, +0x4 ; branch 0x6d4e0
06d4c0: ja -0x13 ; branch 0x6d430
06d4c8: stb [r3 + 0x51], 0x0
06d4d0: stdw [r3 + 0x28], 0x0
06d4d8: ja -0x17 ; branch 0x6d428
06d4e0: jsgt r7, -0x1, +0x1 ; branch 0x6d4f0
06d4e8: ja -0x18 ; branch 0x6d430
06d4f0: mov64 r6, r4
06d4f8: sub64 r6, r0
06d500: div64 r6, r8
06d508: jlt r7, r0, +0x81 ; branch 0x6d918
06d510: sub64 r7, r0
06d518: div64 r7, r8
06d520: stxdw [r10 - 0x168], r1
06d528: mov64 r1, r2
06d530: mov64 r9, r3
06d538: stxdw [r10 - 0x170], r4
06d540: stxdw [r10 - 0x160], r5
06d548: stxdw [r10 - 0x158], r2
06d550: call 0x3ce ; call 0x6f3c8
06d558: ldxdw r2, [r10 - 0x158]
06d560: ldxdw r5, [r10 - 0x160]
06d568: ldxdw r4, [r10 - 0x170]
06d570: mov64 r3, r9
06d578: ldxdw r1, [r10 - 0x168]
06d580: jge r7, r6, +0x72 ; branch 0x6d918
06d588: jgt r7, r0, +0x71 ; branch 0x6d918
06d590: jgt r7, 0x1d, +0xa0 ; branch 0x6da98
06d598: lsh64 r7, 0x3
06d5a0: mov64 r8, r2
06d5a8: add64 r8, r7
06d5b0: ldxdw r7, [r8 + 0x110]
06d5b8: jeq r7, 0x0, +0x6b ; branch 0x6d918
06d5c0: ldxdw r0, [r3 + 0x30]
06d5c8: jeq r0, 0x0, +0x69 ; branch 0x6d918
06d5d0: ldxdw r4, [r8 + 0x20]
06d5d8: mov64 r1, r10
06d5e0: add64 r1, -0x128
06d5e8: mov64 r2, r0
06d5f0: mov64 r3, 0x0
06d5f8: mov64 r5, 0x0
06d600: call 0x15c45 ; call 0x11b830
06d608: mov64 r1, r10
06d610: add64 r1, -0x138
06d618: ldxdw r2, [r10 - 0x128]
06d620: ldxdw r3, [r10 - 0x120]
06d628: mov64 r4, r7
06d630: mov64 r5, 0x0
06d638: call 0x15996 ; call 0x11a2f0
06d640: ldxdw r1, [r10 - 0x130]
06d648: jne r1, 0x0, +0x16 ; branch 0x6d700
06d650: ldxdw r1, [r10 - 0x138]
06d658: mov64 r3, r9
06d660: ldxdw r2, [r3 + 0x20]
06d668: mov64 r0, r2
06d670: add64 r0, r1
06d678: mov64 r7, 0x1
06d680: jlt r0, r2, +0x1 ; branch 0x6d690
06d688: mov64 r7, 0x0
06d690: and64 r7, 0x1
06d698: ldxdw r1, [r10 - 0x168]
06d6a0: ldxdw r4, [r10 - 0x170]
06d6a8: ldxdw r5, [r10 - 0x160]
06d6b0: ldxdw r2, [r10 - 0x158]
06d6b8: jne r7, 0x0, +0x86 ; branch 0x6daf0
06d6c0: mov64 r7, 0x1
06d6c8: jne r0, 0x0, +0x1 ; branch 0x6d6d8
06d6d0: mov64 r7, 0x0
06d6d8: stxdw [r3 + 0x20], r0
06d6e0: stxdw [r3 + 0x38], r4
06d6e8: stxb [r3 + 0x50], r7
06d6f0: stdw [r3 + 0x30], 0x0
06d6f8: ja +0x43 ; branch 0x6d918
06d700: mov64 r1, r10
06d708: add64 r1, -0x78
06d710: lddw r2, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
06d720: call 0xf9a ; call 0x753f8
06d728: stdw [r10 - 0x50], 0x0
06d730: stdw [r10 - 0x58], 0x1
06d738: stdw [r10 - 0x60], 0x0
06d740: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
06d750: stxdw [r10 - 0x20], r1
06d758: mov64 r1, r10
06d760: add64 r1, -0x60
06d768: stxdw [r10 - 0x28], r1
06d770: stb [r10 - 0x10], 0x3
06d778: stdw [r10 - 0x18], 0x20
06d780: stdw [r10 - 0x38], 0x0
06d788: stdw [r10 - 0x48], 0x0
06d790: mov64 r2, r10
06d798: add64 r2, -0x48
06d7a0: lddw r1, 0x11c07c ; rodata b'\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00None\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00min'
06d7b0: call 0x1a7d ; call 0x7aba0
06d7b8: jeq r0, 0x0, +0xa ; branch 0x6d810
06d7c0: mov64 r3, r10
06d7c8: add64 r3, -0x1
06d7d0: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
06d7e0: mov64 r2, 0x37
06d7e8: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
06d7f8: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
06d808: call 0x14af1 ; call 0x112f98
06d810: ldxdw r1, [r10 - 0x50]
06d818: stxdw [r10 - 0xd0], r1
06d820: ldxdw r1, [r10 - 0x58]
06d828: stxdw [r10 - 0xd8], r1
06d830: ldxdw r1, [r10 - 0x60]
06d838: stxdw [r10 - 0xe0], r1
06d840: ldxdw r1, [r10 - 0x78]
06d848: stxdw [r10 - 0xf8], r1
06d850: ldxdw r1, [r10 - 0x70]
06d858: stxdw [r10 - 0xf0], r1
06d860: ldxdw r1, [r10 - 0x68]
06d868: stxdw [r10 - 0xe8], r1
06d870: lddw r1, 0x11cf5e ; rodata b'programs/pump-amm/src/state/volume_accumulator.rsUnexpected overflowcurrent'
06d880: stxdw [r10 - 0x110], r1
06d888: stw [r10 - 0x80], 0x1788
06d890: stb [r10 - 0xc8], 0x2
06d898: stw [r10 - 0x100], 0x68
06d8a0: stdw [r10 - 0x108], 0x31
06d8a8: stdw [r10 - 0x118], 0x0
06d8b0: mov64 r1, r10
06d8b8: add64 r1, -0x148
06d8c0: mov64 r2, r10
06d8c8: add64 r2, -0x118
06d8d0: call 0x12adc ; call 0x102fb8
06d8d8: ldxdw r0, [r10 - 0x148]
06d8e0: ldxdw r1, [r10 - 0x168]
06d8e8: mov64 r3, r9
06d8f0: ldxdw r4, [r10 - 0x170]
06d8f8: ldxdw r5, [r10 - 0x160]
06d900: ldxdw r2, [r10 - 0x158]
06d908: jeq r0, 0x2, +0x1 ; branch 0x6d918
06d910: ja +0x28 ; branch 0x6da58
06d918: ldxdw r0, [r2 + 0x208]
06d920: jslt r0, r4, +0x22 ; branch 0x6da38
06d928: jgt r6, 0x1d, +0x28 ; branch 0x6da70
06d930: lsh64 r6, 0x3
06d938: add64 r2, r6
06d940: ldxdw r7, [r2 + 0x110]
06d948: mov64 r0, r7
06d950: add64 r0, r5
06d958: mov64 r6, 0x1
06d960: jlt r0, r7, +0x1 ; branch 0x6d970
06d968: mov64 r6, 0x0
06d970: and64 r6, 0x1
06d978: jne r6, 0x0, +0x28 ; branch 0x6dac0
06d980: add64 r2, 0x110
06d988: stxdw [r2 + 0x0], r0
06d990: ldxdw r0, [r3 + 0x30]
06d998: mov64 r2, r0
06d9a0: add64 r2, r5
06d9a8: mov64 r5, 0x1
06d9b0: jlt r2, r0, +0x1 ; branch 0x6d9c0
06d9b8: mov64 r5, 0x0
06d9c0: jne r5, 0x1, +0x6 ; branch 0x6d9f8
06d9c8: lddw r1, 0x11cf37 ; rodata b'Overflowing user accumulator sol volumeprograms/pump-amm/src/state/volume_a'
06d9d8: mov64 r2, 0x27
06d9e0: lddw r3, 0x1225f0 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x006\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00O\x00\x00\x00\x11\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00m\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00'
06d9f0: call 0x14996 ; call 0x1126a8
06d9f8: ldxdw r0, [r3 + 0x20]
06da00: or64 r0, r2
06da08: mov64 r5, 0x1
06da10: jne r0, 0x0, +0x1 ; branch 0x6da20
06da18: mov64 r5, 0x0
06da20: stxdw [r3 + 0x30], r2
06da28: stxdw [r3 + 0x38], r4
06da30: stxb [r3 + 0x50], r5
06da38: stxdw [r1 + 0x8], r9
06da40: ldxdw r2, [r10 - 0x150]
06da48: stxdw [r1 + 0x0], r2
06da50: exit
06da58: ldxdw r9, [r10 - 0x140]
06da60: stxdw [r10 - 0x150], r0
06da68: ja -0x7 ; branch 0x6da38
06da70: mov64 r1, r6
06da78: mov64 r2, 0x1e
06da80: lddw r3, 0x122710 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x87\x01\x00\x00+\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x89\x01\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x8e\x01\x00\x00\x1c\x00\x00\x00\x00\x00\x00'
06da90: call 0x14a16 ; call 0x112b48
06da98: mov64 r1, r7
06daa0: mov64 r2, 0x1e
06daa8: lddw r3, 0x122608 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00O\x00\x00\x00\x11\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00m\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x89\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00'
06dab8: call 0x14a11 ; call 0x112b48
06dac0: lddw r1, 0x11cffd ; rodata b'Overflowing sol volumeSVM is 64-bitprograms/pump-amm/src/utils/token.rsprog'
06dad0: mov64 r2, 0x16
06dad8: lddw r3, 0x122728 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x89\x01\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x8e\x01\x00\x00\x1c\x00\x00\x00\x00\x00\x00\x00 \xd0\x11\x00$\x00\x00\x00\x00\x00\x00\x00U\x01\x00\x00$\x00\x00\x00\x00\x00\x00'
06dae8: call 0x14977 ; call 0x1126a8
06daf0: lddw r1, 0x11cf8f ; rodata b'Unexpected overflowcurrent_timestamp should be bigger than start_timeend_ti'
06db00: mov64 r2, 0x13
06db08: lddw r3, 0x122620 ; rodata b'\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00m\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x89\x00\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x0f\x01\x00\x00\r\x00\x00\x00\x00\x00\x00'
06db18: call 0x14971 ; call 0x1126a8
