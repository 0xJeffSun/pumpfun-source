0de4b8: mov64 r8, r3
0de4c0: mov64 r7, r2
0de4c8: mov64 r6, r1
0de4d0: ldxdw r2, [r7 + 0x10]
0de4d8: mov64 r1, r10
0de4e0: add64 r1, -0x28
0de4e8: lddw r3, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
0de4f8: mov64 r4, r8
0de500: call -0x1b15c ; direct target 0x5a28
0de508: ldxdw r2, [r10 - 0x28]
0de510: jne r2, 0x2, +0x19 ; branch 0xde5e0
0de518: ldxdw r1, [r7 + 0x18]
0de520: ldxdw r7, [r1 + 0x20]
0de528: mov64 r2, r8
0de530: mov64 r3, 0x20
0de538: call 0x1aa27 ; direct target 0x1b3678
0de540: mov64 r8, 0x2
0de548: lsh64 r0, 0x20
0de550: rsh64 r0, 0x20
0de558: jne r0, 0x0, +0x19 ; branch 0xde628
0de560: mov64 r1, r7
0de568: call 0x17aaa ; direct target 0x19bac0
0de570: jne r0, 0x0, +0x16 ; branch 0xde628
0de578: mov64 r1, r10
0de580: add64 r1, -0x18
0de588: mov64 r2, r7
0de590: call 0x188f4 ; direct target 0x1a2d38
0de598: ldxdw r1, [r10 - 0x8]
0de5a0: ldxdw r2, [r10 - 0x18]
0de5a8: lddw r3, -0x7fffffffffffffe6
0de5b8: jne r2, r3, +0x10 ; branch 0xde640
0de5c0: ldxdw r2, [r1 + 0x0]
0de5c8: add64 r2, 0x1
0de5d0: stxdw [r1 + 0x0], r2
0de5d8: ja +0x9 ; branch 0xde628
0de5e0: ldxdw r3, [r10 - 0x20]
0de5e8: mov64 r1, r10
0de5f0: add64 r1, -0x38
0de5f8: lddw r4, 0x1b73d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding_curveassociated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociat'
0de608: mov64 r5, 0xd
0de610: call -0x1b79d ; direct target 0x2930
0de618: ldxdw r1, [r10 - 0x30]
0de620: ldxdw r8, [r10 - 0x38]
0de628: stxdw [r6 + 0x8], r1
0de630: stxdw [r6 + 0x0], r8
0de638: exit
0de640: ldxdw r3, [r10 - 0x10]
0de648: stxdw [r10 - 0x8], r1
0de650: stxdw [r10 - 0x10], r3
0de658: stxdw [r10 - 0x18], r2
0de660: mov64 r1, r10
0de668: add64 r1, -0x48
0de670: mov64 r2, r10
0de678: add64 r2, -0x18
0de680: call 0x17aa6 ; direct target 0x19bbb8
0de688: ldxdw r2, [r10 - 0x48]
0de690: jeq r2, 0x2, -0xe ; branch 0xde628
0de698: ldxdw r3, [r10 - 0x40]
0de6a0: mov64 r1, r10
0de6a8: add64 r1, -0x58
0de6b0: lddw r4, 0x1b73e5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'associated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociated_quote_user'
0de6c0: mov64 r5, 0x1d
0de6c8: call -0x1b7b4 ; direct target 0x2930
0de6d0: ldxdw r1, [r10 - 0x50]
0de6d8: ldxdw r8, [r10 - 0x58]
0de6e0: ja -0x18 ; branch 0xde628
