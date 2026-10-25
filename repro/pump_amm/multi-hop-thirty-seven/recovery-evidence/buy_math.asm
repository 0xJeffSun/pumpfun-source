050f00: mov64 r9, r4
050f08: mov64 r7, r3
050f10: mov64 r3, r2
050f18: stxdw [r10 - 0x188], r1
050f20: stdw [r10 - 0xe0], 0x0
050f28: stdw [r10 - 0xe8], 0x0
050f30: stdw [r10 - 0xf0], 0x0
050f38: stdw [r10 - 0xf8], 0x0
050f40: add64 r3, 0xc0
050f48: mov64 r2, r10
050f50: add64 r2, -0xf8
050f58: mov64 r1, r3
050f60: mov64 r3, 0x20
050f68: call 0x1912e ; call 0x1198e0
050f70: ldxdw r3, [r7 + 0x0]
050f78: ldxdw r2, [r7 + 0x8]
050f80: mov64 r5, r2
050f88: add64 r5, r3
050f90: mov64 r1, 0x1
050f98: mov64 r4, 0x1
050fa0: stxdw [r10 - 0x190], r2
050fa8: jlt r5, r2, +0x1 ; branch 0x50fb8
050fb0: mov64 r4, 0x0
050fb8: mov64 r6, -0x1
050fc0: mov64 r2, -0x1
050fc8: jne r4, 0x0, +0x1 ; branch 0x50fd8
050fd0: mov64 r2, r5
050fd8: lsh64 r0, 0x20
050fe0: rsh64 r0, 0x20
050fe8: ldxdw r4, [r7 + 0x10]
050ff0: mov64 r7, 0x0
050ff8: jeq r0, 0x0, +0x1 ; branch 0x51008
051000: mov64 r7, r4
051008: stxdw [r10 - 0x198], r4
051010: mov64 r4, r2
051018: add64 r4, r7
051020: jlt r4, r2, +0x1 ; branch 0x51030
051028: mov64 r1, 0x0
051030: jne r1, 0x0, +0x1 ; branch 0x51040
051038: mov64 r6, r4
051040: mov64 r8, r9
051048: jeq r6, 0x0, +0x15 ; branch 0x510f8
051050: jeq r8, 0x0, +0x55 ; branch 0x51300
051058: stxdw [r10 - 0x1a0], r3
051060: mov64 r1, r10
051068: add64 r1, -0x120
051070: mov64 r2, r8
051078: mov64 r3, 0x0
051080: mov64 r4, 0x2710
051088: mov64 r5, 0x0
051090: call 0x194f3 ; call 0x11b830
051098: mov64 r4, r6
0510a0: add64 r4, 0x2710
0510a8: mov64 r5, 0x1
0510b0: jlt r4, r6, +0x1 ; branch 0x510c0
0510b8: mov64 r5, 0x0
0510c0: mov64 r1, r10
0510c8: add64 r1, -0x130
0510d0: ldxdw r2, [r10 - 0x120]
0510d8: ldxdw r3, [r10 - 0x118]
0510e0: call 0x19241 ; call 0x11a2f0
0510e8: ldxdw r9, [r10 - 0x130]
0510f0: ldxdw r3, [r10 - 0x1a0]
0510f8: jeq r9, 0x0, +0x40 ; branch 0x51300
051100: mov64 r1, r10
051108: add64 r1, -0xf8
051110: mov64 r2, r9
051118: mov64 r6, r3
051120: call -0x7bf3 ; call 0x13190
051128: ldxdw r1, [r10 - 0xf8]
051130: jeq r1, 0x2, +0x1 ; branch 0x51140
051138: ja +0x7b ; branch 0x51518
051140: ldxdw r1, [r10 - 0xf0]
051148: stxdw [r10 - 0x1a0], r1
051150: mov64 r1, r10
051158: add64 r1, -0xf8
051160: mov64 r2, r9
051168: ldxdw r3, [r10 - 0x190]
051170: call -0x7bfd ; call 0x13190
051178: ldxdw r1, [r10 - 0xf8]
051180: jeq r1, 0x2, +0x1 ; branch 0x51190
051188: ja +0x71 ; branch 0x51518
051190: ldxdw r1, [r10 - 0xf0]
051198: stxdw [r10 - 0x1a8], r1
0511a0: mov64 r1, r10
0511a8: add64 r1, -0xf8
0511b0: mov64 r2, r9
0511b8: mov64 r3, r7
0511c0: call -0x7c07 ; call 0x13190
0511c8: ldxdw r1, [r10 - 0xf8]
0511d0: jeq r1, 0x2, +0x1 ; branch 0x511e0
0511d8: ja +0x67 ; branch 0x51518
0511e0: ldxdw r2, [r10 - 0xf0]
0511e8: ldxdw r1, [r10 - 0x1a8]
0511f0: mov64 r7, r1
0511f8: stxdw [r10 - 0xe8], r1
051200: ldxdw r1, [r10 - 0x1a0]
051208: stxdw [r10 - 0xf0], r1
051210: stxdw [r10 - 0xf8], r9
051218: stxdw [r10 - 0x1b0], r2
051220: stxdw [r10 - 0xe0], r2
051228: mov64 r1, r10
051230: add64 r1, -0x40
051238: mov64 r2, r10
051240: add64 r2, -0xf8
051248: call -0x267 ; call 0x4ff18
051250: ldxdw r1, [r10 - 0x40]
051258: jeq r1, 0x2, +0x1 ; branch 0x51268
051260: ja +0x5e ; branch 0x51558
051268: ldxdw r3, [r10 - 0x38]
051270: jgt r3, r8, +0x1 ; branch 0x51280
051278: ja +0x7e ; branch 0x51670
051280: mov64 r2, r3
051288: sub64 r2, r8
051290: mov64 r1, 0x0
051298: mov64 r4, 0x1
0512a0: jgt r2, r3, +0x1 ; branch 0x512b0
0512a8: mov64 r4, 0x0
0512b0: jne r4, 0x0, +0x1 ; branch 0x512c0
0512b8: mov64 r1, r2
0512c0: jge r9, r1, +0x54 ; branch 0x51568
0512c8: mov64 r1, r10
0512d0: add64 r1, -0x160
0512d8: mov64 r2, 0x27
0512e0: call 0x52d8 ; call 0x7a9a8
0512e8: ldxdw r1, [r10 - 0x160]
0512f0: ldxdw r2, [r10 - 0x158]
0512f8: ja +0x44 ; branch 0x51520
051300: mov64 r1, r10
051308: add64 r1, -0x110
051310: lddw r2, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
051320: call 0x481a ; call 0x753f8
051328: stdw [r10 - 0x48], 0x0
051330: stdw [r10 - 0x50], 0x1
051338: stdw [r10 - 0x58], 0x0
051340: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
051350: stxdw [r10 - 0x18], r1
051358: mov64 r1, r10
051360: add64 r1, -0x58
051368: stxdw [r10 - 0x20], r1
051370: stb [r10 - 0x8], 0x3
051378: stdw [r10 - 0x10], 0x20
051380: stdw [r10 - 0x30], 0x0
051388: stdw [r10 - 0x40], 0x0
051390: mov64 r2, r10
051398: add64 r2, -0x40
0513a0: lddw r1, 0x11bf94 ; rodata b'\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00\x00\x14\x00\x00\x00\x13\x00\x00'
0513b0: call 0x52fd ; call 0x7aba0
0513b8: jeq r0, 0x0, +0xa ; branch 0x51410
0513c0: mov64 r3, r10
0513c8: add64 r3, -0xf8
0513d0: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0513e0: mov64 r2, 0x37
0513e8: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
0513f8: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
051408: call 0x18371 ; call 0x112f98
051410: ldxdw r1, [r10 - 0x48]
051418: stxdw [r10 - 0xb0], r1
051420: ldxdw r1, [r10 - 0x50]
051428: stxdw [r10 - 0xb8], r1
051430: ldxdw r1, [r10 - 0x58]
051438: stxdw [r10 - 0xc0], r1
051440: ldxdw r1, [r10 - 0x110]
051448: stxdw [r10 - 0xd8], r1
051450: ldxdw r1, [r10 - 0x108]
051458: stxdw [r10 - 0xd0], r1
051460: ldxdw r1, [r10 - 0x100]
051468: stxdw [r10 - 0xc8], r1
051470: lddw r1, 0x11cd69 ; rodata b'programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_quote_in'
051480: stxdw [r10 - 0xf0], r1
051488: stw [r10 - 0x60], 0x1797
051490: stb [r10 - 0xa8], 0x2
051498: stw [r10 - 0xe0], 0x148
0514a0: stdw [r10 - 0xe8], 0x33
0514a8: stdw [r10 - 0xf8], 0x0
0514b0: mov64 r1, r10
0514b8: add64 r1, -0x170
0514c0: mov64 r2, r10
0514c8: add64 r2, -0xf8
0514d0: call 0x1635c ; call 0x102fb8
0514d8: ldxdw r3, [r10 - 0x168]
0514e0: ldxdw r2, [r10 - 0x170]
0514e8: mov64 r1, r10
0514f0: add64 r1, -0x180
0514f8: call -0xa238 ; call 0x340
051500: ldxdw r1, [r10 - 0x180]
051508: ldxdw r2, [r10 - 0x178]
051510: ja +0x1 ; branch 0x51520
051518: ldxdw r2, [r10 - 0xf0]
051520: ldxdw r3, [r10 - 0x188]
051528: stxdw [r3 + 0x10], r2
051530: mov64 r2, r3
051538: stxdw [r2 + 0x8], r1
051540: mov64 r1, 0x1
051548: stxdw [r2 + 0x0], r1
051550: exit
051558: ldxdw r2, [r10 - 0x38]
051560: ja -0x9 ; branch 0x51520
051568: sub64 r9, r1
051570: jne r9, 0x0, +0x1f ; branch 0x51670
051578: mov64 r1, r10
051580: add64 r1, -0xd8
051588: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
051598: call 0x47cb ; call 0x753f8
0515a0: mov64 r1, r10
0515a8: add64 r1, -0xc0
0515b0: lddw r2, 0x11bf80 ; rodata b'(\x00\x00\x00T\x00\x00\x00\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00'
0515c0: call -0x91c5 ; call 0x87a0
0515c8: lddw r1, 0x11cd69 ; rodata b'programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_quote_in'
0515d8: stxdw [r10 - 0xf0], r1
0515e0: stb [r10 - 0xa8], 0x2
0515e8: stw [r10 - 0xe0], 0x15a
0515f0: stdw [r10 - 0xe8], 0x33
0515f8: stdw [r10 - 0xf8], 0x0
051600: stw [r10 - 0x60], 0x1798
051608: mov64 r1, r10
051610: add64 r1, -0x140
051618: mov64 r2, r10
051620: add64 r2, -0xf8
051628: call 0x16331 ; call 0x102fb8
051630: ldxdw r3, [r10 - 0x138]
051638: ldxdw r2, [r10 - 0x140]
051640: mov64 r1, r10
051648: add64 r1, -0x150
051650: call -0xa263 ; call 0x340
051658: ldxdw r1, [r10 - 0x150]
051660: ldxdw r2, [r10 - 0x148]
051668: ja -0x2a ; branch 0x51520
051670: ldxdw r2, [r10 - 0x188]
051678: ldxdw r1, [r10 - 0x1b0]
051680: stxdw [r2 + 0x38], r1
051688: stxdw [r2 + 0x30], r7
051690: ldxdw r1, [r10 - 0x1a0]
051698: stxdw [r2 + 0x28], r1
0516a0: ldxdw r1, [r10 - 0x198]
0516a8: stxdw [r2 + 0x20], r1
0516b0: ldxdw r1, [r10 - 0x190]
0516b8: stxdw [r2 + 0x18], r1
0516c0: stxdw [r2 + 0x10], r6
0516c8: stxdw [r2 + 0x8], r9
0516d0: mov64 r1, 0x0
0516d8: ja -0x33 ; branch 0x51548
