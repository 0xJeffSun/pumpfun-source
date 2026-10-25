0dd400: mov64 r7, r3
0dd408: mov64 r8, r2
0dd410: mov64 r6, r1
0dd418: ldxdw r1, [r8 + 0x28]
0dd420: ldxdw r9, [r1 + 0x20]
0dd428: mov64 r2, r7
0dd430: mov64 r3, 0x20
0dd438: call 0x1ac47 ; direct target 0x1b3678
0dd440: lsh64 r0, 0x20
0dd448: rsh64 r0, 0x20
0dd450: jne r0, 0x0, +0x1b ; branch 0xdd530
0dd458: mov64 r1, r9
0dd460: call 0x17ccb ; direct target 0x19bac0
0dd468: jne r0, 0x0, +0x18 ; branch 0xdd530
0dd470: mov64 r1, r10
0dd478: add64 r1, -0x18
0dd480: mov64 r2, r9
0dd488: call 0x18b15 ; direct target 0x1a2d38
0dd490: ldxdw r1, [r10 - 0x8]
0dd498: ldxdw r2, [r10 - 0x18]
0dd4a0: lddw r3, -0x7fffffffffffffe6
0dd4b0: jne r2, r3, +0x4 ; branch 0xdd4d8
0dd4b8: ldxdw r2, [r1 + 0x0]
0dd4c0: add64 r2, 0x1
0dd4c8: stxdw [r1 + 0x0], r2
0dd4d0: ja +0xb ; branch 0xdd530
0dd4d8: ldxdw r3, [r10 - 0x10]
0dd4e0: stxdw [r10 - 0x8], r1
0dd4e8: stxdw [r10 - 0x10], r3
0dd4f0: stxdw [r10 - 0x18], r2
0dd4f8: mov64 r1, r10
0dd500: add64 r1, -0x28
0dd508: mov64 r2, r10
0dd510: add64 r2, -0x18
0dd518: call 0x17cd3 ; direct target 0x19bbb8
0dd520: ldxdw r2, [r10 - 0x28]
0dd528: jne r2, 0x2, +0x2e ; branch 0xdd6a0
0dd530: ldxdw r1, [r8 + 0x30]
0dd538: ldxdw r8, [r1 + 0x20]
0dd540: mov64 r2, r7
0dd548: mov64 r3, 0x20
0dd550: call 0x1ac24 ; direct target 0x1b3678
0dd558: mov64 r7, 0x2
0dd560: lsh64 r0, 0x20
0dd568: rsh64 r0, 0x20
0dd570: jne r0, 0x0, +0x2e ; branch 0xdd6e8
0dd578: mov64 r1, r8
0dd580: call 0x17ca7 ; direct target 0x19bac0
0dd588: jne r0, 0x0, +0x2b ; branch 0xdd6e8
0dd590: mov64 r1, r10
0dd598: add64 r1, -0x18
0dd5a0: mov64 r2, r8
0dd5a8: call 0x18af1 ; direct target 0x1a2d38
0dd5b0: ldxdw r1, [r10 - 0x8]
0dd5b8: ldxdw r2, [r10 - 0x18]
0dd5c0: lddw r3, -0x7fffffffffffffe6
0dd5d0: jne r2, r3, +0x4 ; branch 0xdd5f8
0dd5d8: ldxdw r2, [r1 + 0x0]
0dd5e0: add64 r2, 0x1
0dd5e8: stxdw [r1 + 0x0], r2
0dd5f0: ja +0x1e ; branch 0xdd6e8
0dd5f8: ldxdw r3, [r10 - 0x10]
0dd600: stxdw [r10 - 0x8], r1
0dd608: stxdw [r10 - 0x10], r3
0dd610: stxdw [r10 - 0x18], r2
0dd618: mov64 r1, r10
0dd620: add64 r1, -0x48
0dd628: mov64 r2, r10
0dd630: add64 r2, -0x18
0dd638: call 0x17caf ; direct target 0x19bbb8
0dd640: ldxdw r2, [r10 - 0x48]
0dd648: jeq r2, 0x2, +0x13 ; branch 0xdd6e8
0dd650: ldxdw r3, [r10 - 0x40]
0dd658: mov64 r1, r10
0dd660: add64 r1, -0x58
0dd668: lddw r4, 0x1b7887 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'destinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsquote_co'
0dd678: mov64 r5, 0xb
0dd680: call -0x1b5ab ; direct target 0x2930
0dd688: ldxdw r1, [r10 - 0x50]
0dd690: ldxdw r7, [r10 - 0x58]
0dd698: ja +0x9 ; branch 0xdd6e8
0dd6a0: ldxdw r3, [r10 - 0x20]
0dd6a8: mov64 r1, r10
0dd6b0: add64 r1, -0x38
0dd6b8: lddw r4, 0x1b7881 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'sourcedestinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsqu'
0dd6c8: mov64 r5, 0x6
0dd6d0: call -0x1b5b5 ; direct target 0x2930
0dd6d8: ldxdw r1, [r10 - 0x30]
0dd6e0: ldxdw r7, [r10 - 0x38]
0dd6e8: stxdw [r6 + 0x8], r1
0dd6f0: stxdw [r6 + 0x0], r7
0dd6f8: exit
