06c328: mov64 r6, r1
06c330: ldxdw r4, [r2 + 0xe0]
06c338: mov64 r1, r3
06c340: add64 r1, r4
06c348: mov64 r4, 0x1
06c350: jlt r1, r3, +0x1 ; branch 0x6c360
06c358: mov64 r4, 0x0
06c360: ldxdw r3, [r2 + 0xe8]
06c368: mov64 r2, r3
06c370: add64 r2, r4
06c378: xor64 r3, -0x1
06c380: and64 r3, r2
06c388: jslt r3, 0x0, +0x0 ; branch 0x6c390
06c390: jslt r3, 0x0, +0x1b ; branch 0x6c470
06c398: jne r2, 0x0, +0x1 ; branch 0x6c3a8
06c3a0: ja +0x57 ; branch 0x6c660
06c3a8: mov64 r1, r10
06c3b0: add64 r1, -0x78
06c3b8: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06c3c8: call 0x1205 ; call 0x753f8
06c3d0: stdw [r10 - 0x50], 0x0
06c3d8: stdw [r10 - 0x58], 0x1
06c3e0: stdw [r10 - 0x60], 0x0
06c3e8: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
06c3f8: stxdw [r10 - 0x20], r1
06c400: mov64 r1, r10
06c408: add64 r1, -0x60
06c410: stxdw [r10 - 0x28], r1
06c418: stb [r10 - 0x10], 0x3
06c420: stdw [r10 - 0x18], 0x20
06c428: stdw [r10 - 0x38], 0x0
06c430: stdw [r10 - 0x48], 0x0
06c438: mov64 r2, r10
06c440: add64 r2, -0x48
06c448: lddw r1, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06c458: call 0x1ce8 ; call 0x7aba0
06c460: jeq r0, 0x0, +0x42 ; branch 0x6c678
06c468: ja +0x18 ; branch 0x6c530
06c470: mov64 r1, r10
06c478: add64 r1, -0x78
06c480: lddw r2, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06c490: call 0x11ec ; call 0x753f8
06c498: stdw [r10 - 0x50], 0x0
06c4a0: stdw [r10 - 0x58], 0x1
06c4a8: stdw [r10 - 0x60], 0x0
06c4b0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
06c4c0: stxdw [r10 - 0x20], r1
06c4c8: mov64 r1, r10
06c4d0: add64 r1, -0x60
06c4d8: stxdw [r10 - 0x28], r1
06c4e0: stb [r10 - 0x10], 0x3
06c4e8: stdw [r10 - 0x18], 0x20
06c4f0: stdw [r10 - 0x38], 0x0
06c4f8: stdw [r10 - 0x48], 0x0
06c500: mov64 r2, r10
06c508: add64 r2, -0x48
06c510: lddw r1, 0x11c040 ; rodata b'\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x002\x00\x00\x00%\x00\x00\x00 \x00\x00\x00\x19\x00\x00\x00+\x00\x00\x00;\x00\x00\x00=\x00\x00\x00<\x00\x00\x00\x18\x00\x00\x00G\x00\x00\x00\x0b\x00\x00\x00Non'
06c520: call 0x1ccf ; call 0x7aba0
06c528: jeq r0, 0x0, +0xa ; branch 0x6c580
06c530: mov64 r3, r10
06c538: add64 r3, -0x1
06c540: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
06c550: mov64 r2, 0x37
06c558: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
06c568: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
06c578: call 0x14d43 ; call 0x112f98
06c580: ldxdw r1, [r10 - 0x50]
06c588: stxdw [r10 - 0xd0], r1
06c590: ldxdw r1, [r10 - 0x58]
06c598: stxdw [r10 - 0xd8], r1
06c5a0: ldxdw r1, [r10 - 0x60]
06c5a8: stxdw [r10 - 0xe0], r1
06c5b0: ldxdw r1, [r10 - 0x78]
06c5b8: stxdw [r10 - 0xf8], r1
06c5c0: ldxdw r1, [r10 - 0x70]
06c5c8: stxdw [r10 - 0xf0], r1
06c5d0: ldxdw r1, [r10 - 0x68]
06c5d8: stxdw [r10 - 0xe8], r1
06c5e0: lddw r1, 0x11cf14 ; rodata b'programs/pump-amm/src/state/pool.rsOverflowing user accumulator sol volumep'
06c5f0: stxdw [r10 - 0x110], r1
06c5f8: stw [r10 - 0x80], 0x1787
06c600: stb [r10 - 0xc8], 0x2
06c608: stw [r10 - 0x100], 0x1b7
06c610: stdw [r10 - 0x108], 0x23
06c618: stdw [r10 - 0x118], 0x0
06c620: mov64 r1, r10
06c628: add64 r1, -0x138
06c630: mov64 r2, r10
06c638: add64 r2, -0x118
06c640: call 0x12d2e ; call 0x102fb8
06c648: ldxdw r1, [r10 - 0x138]
06c650: ldxdw r2, [r10 - 0x130]
06c658: ja +0x1e ; branch 0x6c750
06c660: stxdw [r6 + 0x8], r1
06c668: stdw [r6 + 0x0], 0x2
06c670: ja +0x1d ; branch 0x6c760
06c678: ldxdw r1, [r10 - 0x50]
06c680: stxdw [r10 - 0xd0], r1
06c688: ldxdw r1, [r10 - 0x58]
06c690: stxdw [r10 - 0xd8], r1
06c698: ldxdw r1, [r10 - 0x60]
06c6a0: stxdw [r10 - 0xe0], r1
06c6a8: ldxdw r1, [r10 - 0x78]
06c6b0: stxdw [r10 - 0xf8], r1
06c6b8: ldxdw r1, [r10 - 0x70]
06c6c0: stxdw [r10 - 0xf0], r1
06c6c8: ldxdw r1, [r10 - 0x68]
06c6d0: stxdw [r10 - 0xe8], r1
06c6d8: lddw r1, 0x11cf14 ; rodata b'programs/pump-amm/src/state/pool.rsOverflowing user accumulator sol volumep'
06c6e8: stxdw [r10 - 0x110], r1
06c6f0: stw [r10 - 0x80], 0x1787
06c6f8: stb [r10 - 0xc8], 0x2
06c700: stw [r10 - 0x100], 0x1b8
06c708: stdw [r10 - 0x108], 0x23
06c710: stdw [r10 - 0x118], 0x0
06c718: mov64 r1, r10
06c720: add64 r1, -0x128
06c728: mov64 r2, r10
06c730: add64 r2, -0x118
06c738: call 0x12d0f ; call 0x102fb8
06c740: ldxdw r1, [r10 - 0x128]
06c748: ldxdw r2, [r10 - 0x120]
06c750: stxdw [r6 + 0x8], r2
06c758: stxdw [r6 + 0x0], r1
06c760: exit
