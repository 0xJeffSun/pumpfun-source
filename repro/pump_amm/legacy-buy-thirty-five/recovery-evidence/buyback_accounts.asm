037150: mov64 r6, r1
037158: ldxdw r1, [r5 - 0x1000]
037160: jlt r1, r3, +0x22 ; branch 0x37278
037168: mov64 r1, r10
037170: add64 r1, -0x78
037178: lddw r2, 0x11bfe0 ; rodata b':\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00'
037188: call 0x7c4d ; call 0x753f8
037190: stdw [r10 - 0x50], 0x0
037198: stdw [r10 - 0x58], 0x1
0371a0: stdw [r10 - 0x60], 0x0
0371a8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0371b8: stxdw [r10 - 0x20], r1
0371c0: mov64 r1, r10
0371c8: add64 r1, -0x60
0371d0: stxdw [r10 - 0x28], r1
0371d8: stb [r10 - 0x10], 0x3
0371e0: stdw [r10 - 0x18], 0x20
0371e8: stdw [r10 - 0x38], 0x0
0371f0: stdw [r10 - 0x48], 0x0
0371f8: mov64 r2, r10
037200: add64 r2, -0x48
037208: lddw r1, 0x11bfe0 ; rodata b':\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00'
037218: call 0x8730 ; call 0x7aba0
037220: jeq r0, 0x0, +0x26 ; branch 0x37358
037228: mov64 r3, r10
037230: add64 r3, -0x1
037238: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
037248: mov64 r2, 0x37
037250: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
037260: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
037270: call 0x1b7a4 ; call 0x112f98
037278: mov64 r0, r1
037280: add64 r0, 0x1
037288: jlt r0, r3, +0x35 ; branch 0x37438
037290: mov64 r1, r10
037298: add64 r1, -0x78
0372a0: lddw r2, 0x11bfe0 ; rodata b':\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00'
0372b0: call 0x7c28 ; call 0x753f8
0372b8: stdw [r10 - 0x50], 0x0
0372c0: stdw [r10 - 0x58], 0x1
0372c8: stdw [r10 - 0x60], 0x0
0372d0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0372e0: stxdw [r10 - 0x20], r1
0372e8: mov64 r1, r10
0372f0: add64 r1, -0x60
0372f8: stxdw [r10 - 0x28], r1
037300: stb [r10 - 0x10], 0x3
037308: stdw [r10 - 0x18], 0x20
037310: stdw [r10 - 0x38], 0x0
037318: stdw [r10 - 0x48], 0x0
037320: mov64 r2, r10
037328: add64 r2, -0x48
037330: lddw r1, 0x11bfe0 ; rodata b':\x00\x00\x00U\x00\x00\x009\x00\x00\x00?\x00\x00\x005\x00\x00\x00\x05\x10\x00\x00E\x00\x00\x00B\x00\x00\x00\x12\x00\x00\x00userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00'
037340: call 0x870b ; call 0x7aba0
037348: jeq r0, 0x0, +0x49 ; branch 0x37598
037350: ja -0x26 ; branch 0x37228
037358: ldxdw r1, [r10 - 0x50]
037360: stxdw [r10 - 0xd0], r1
037368: ldxdw r1, [r10 - 0x58]
037370: stxdw [r10 - 0xd8], r1
037378: ldxdw r1, [r10 - 0x60]
037380: stxdw [r10 - 0xe0], r1
037388: ldxdw r1, [r10 - 0x78]
037390: stxdw [r10 - 0xf8], r1
037398: ldxdw r1, [r10 - 0x70]
0373a0: stxdw [r10 - 0xf0], r1
0373a8: ldxdw r1, [r10 - 0x68]
0373b0: stxdw [r10 - 0xe8], r1
0373b8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
0373c8: stxdw [r10 - 0x110], r1
0373d0: stw [r10 - 0x80], 0x17aa
0373d8: stb [r10 - 0xc8], 0x2
0373e0: stw [r10 - 0x100], 0x74
0373e8: stdw [r10 - 0x108], 0x2e
0373f0: stdw [r10 - 0x118], 0x0
0373f8: mov64 r1, r10
037400: add64 r1, -0x128
037408: mov64 r2, r10
037410: add64 r2, -0x118
037418: call 0x19773 ; call 0x102fb8
037420: ldxdw r1, [r10 - 0x128]
037428: ldxdw r2, [r10 - 0x120]
037430: ja +0x47 ; branch 0x37670
037438: mul64 r1, 0x30
037440: mov64 r7, r2
037448: add64 r7, r1
037450: ldxdw r1, [r5 - 0xff0]
037458: ldxdw r3, [r5 - 0xff8]
037460: mul64 r0, 0x30
037468: add64 r2, r0
037470: ldxdw r5, [r7 + 0x0]
037478: ldxdw r0, [r5 + 0x18]
037480: stxdw [r10 - 0x30], r0
037488: ldxdw r0, [r5 + 0x10]
037490: stxdw [r10 - 0x38], r0
037498: ldxdw r0, [r5 + 0x8]
0374a0: stxdw [r10 - 0x40], r0
0374a8: ldxdw r5, [r5 + 0x0]
0374b0: stxdw [r10 - 0x48], r5
0374b8: mov64 r8, r2
0374c0: ldxdw r2, [r2 + 0x0]
0374c8: ldxdw r5, [r2 + 0x18]
0374d0: stxdw [r10 - 0x100], r5
0374d8: ldxdw r5, [r2 + 0x10]
0374e0: stxdw [r10 - 0x108], r5
0374e8: ldxdw r5, [r2 + 0x8]
0374f0: stxdw [r10 - 0x110], r5
0374f8: ldxdw r2, [r2 + 0x0]
037500: stxdw [r10 - 0x118], r2
037508: stxdw [r10 - 0x1000], r3
037510: stxdw [r10 - 0xff8], r1
037518: mov64 r1, r10
037520: add64 r1, -0x148
037528: mov64 r3, r10
037530: add64 r3, -0x48
037538: mov64 r0, r10
037540: add64 r0, -0x118
037548: mov64 r5, r10
037550: mov64 r2, r4
037558: mov64 r4, r0
037560: call 0x5720 ; call 0x62e68
037568: ldxdw r1, [r10 - 0x148]
037570: jne r1, 0x2, +0x23 ; branch 0x37690
037578: stxdw [r6 + 0x10], r8
037580: stxdw [r6 + 0x8], r7
037588: stdw [r6 + 0x0], 0x0
037590: ja +0x1e ; branch 0x37688
037598: ldxdw r1, [r10 - 0x50]
0375a0: stxdw [r10 - 0xd0], r1
0375a8: ldxdw r1, [r10 - 0x58]
0375b0: stxdw [r10 - 0xd8], r1
0375b8: ldxdw r1, [r10 - 0x60]
0375c0: stxdw [r10 - 0xe0], r1
0375c8: ldxdw r1, [r10 - 0x78]
0375d0: stxdw [r10 - 0xf8], r1
0375d8: ldxdw r1, [r10 - 0x70]
0375e0: stxdw [r10 - 0xf0], r1
0375e8: ldxdw r1, [r10 - 0x68]
0375f0: stxdw [r10 - 0xe8], r1
0375f8: lddw r1, 0x11cc9a ; rodata b'programs/pump-amm/src/instructions/swap/buy.rsprograms/pump-amm/src/instruc'
037608: stxdw [r10 - 0x110], r1
037610: stw [r10 - 0x80], 0x17aa
037618: stb [r10 - 0xc8], 0x2
037620: stw [r10 - 0x100], 0x79
037628: stdw [r10 - 0x108], 0x2e
037630: stdw [r10 - 0x118], 0x0
037638: mov64 r1, r10
037640: add64 r1, -0x138
037648: mov64 r2, r10
037650: add64 r2, -0x118
037658: call 0x1972b ; call 0x102fb8
037660: ldxdw r1, [r10 - 0x138]
037668: ldxdw r2, [r10 - 0x130]
037670: stxdw [r6 + 0x10], r2
037678: stxdw [r6 + 0x8], r1
037680: stdw [r6 + 0x0], 0x1
037688: exit
037690: ldxdw r2, [r10 - 0x140]
037698: stxdw [r6 + 0x8], r1
0376a0: stxdw [r6 + 0x10], r2
0376a8: ja -0x6 ; branch 0x37680
