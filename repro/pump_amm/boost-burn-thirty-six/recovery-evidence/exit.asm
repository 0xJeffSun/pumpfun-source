090068: mov64 r7, r3
090070: mov64 r8, r2
090078: mov64 r6, r1
090080: ldxdw r1, [r8 + 0x18]
090088: ldxdw r9, [r1 + 0x58]
090090: add64 r1, 0x60
090098: mov64 r2, r7
0900a0: mov64 r3, 0x20
0900a8: call 0x11306 ; call 0x1198e0
0900b0: lsh64 r0, 0x20
0900b8: rsh64 r0, 0x20
0900c0: jne r0, 0x0, +0x1b ; branch 0x901a0
0900c8: mov64 r1, r9
0900d0: call 0xe5ce ; call 0x102f48
0900d8: jne r0, 0x0, +0x18 ; branch 0x901a0
0900e0: mov64 r1, r10
0900e8: add64 r1, -0x18
0900f0: mov64 r2, r9
0900f8: call 0xf223 ; call 0x109218
090100: ldxdw r1, [r10 - 0x8]
090108: ldxdw r2, [r10 - 0x18]
090110: lddw r3, -0x7fffffffffffffe6
090120: jne r2, r3, +0x4 ; branch 0x90148
090128: ldxdw r2, [r1 + 0x0]
090130: add64 r2, 0x1
090138: stxdw [r1 + 0x0], r2
090140: ja +0xb ; branch 0x901a0
090148: ldxdw r3, [r10 - 0x10]
090150: stxdw [r10 - 0x8], r1
090158: stxdw [r10 - 0x10], r3
090160: stxdw [r10 - 0x18], r2
090168: mov64 r1, r10
090170: add64 r1, -0x28
090178: mov64 r2, r10
090180: add64 r2, -0x18
090188: call 0xe5d6 ; call 0x103040
090190: ldxdw r2, [r10 - 0x28]
090198: jne r2, 0x2, +0x84 ; branch 0x905c0
0901a0: ldxdw r1, [r8 + 0x28]
0901a8: ldxdw r9, [r1 + 0x20]
0901b0: mov64 r2, r7
0901b8: mov64 r3, 0x20
0901c0: call 0x112e3 ; call 0x1198e0
0901c8: lsh64 r0, 0x20
0901d0: rsh64 r0, 0x20
0901d8: jne r0, 0x0, +0x1c ; branch 0x902c0
0901e0: mov64 r1, r9
0901e8: call 0xe5ab ; call 0x102f48
0901f0: jne r0, 0x0, +0x19 ; branch 0x902c0
0901f8: mov64 r1, r10
090200: add64 r1, -0x18
090208: mov64 r2, r9
090210: call 0xf200 ; call 0x109218
090218: ldxdw r1, [r10 - 0x8]
090220: ldxdw r2, [r10 - 0x18]
090228: lddw r3, -0x7fffffffffffffe6
090238: jne r2, r3, +0x4 ; branch 0x90260
090240: ldxdw r2, [r1 + 0x0]
090248: add64 r2, 0x1
090250: stxdw [r1 + 0x0], r2
090258: ja +0xc ; branch 0x902c0
090260: ldxdw r3, [r10 - 0x10]
090268: stxdw [r10 - 0x8], r1
090270: stxdw [r10 - 0x10], r3
090278: stxdw [r10 - 0x18], r2
090280: mov64 r1, r10
090288: add64 r1, -0x48
090290: mov64 r2, r10
090298: add64 r2, -0x18
0902a0: call 0xe5b3 ; call 0x103040
0902a8: ldxdw r2, [r10 - 0x48]
0902b0: jeq r2, 0x2, +0x1 ; branch 0x902c0
0902b8: ja +0x6a ; branch 0x90610
0902c0: ldxdw r1, [r8 + 0x30]
0902c8: ldxdw r9, [r1 + 0x20]
0902d0: mov64 r2, r7
0902d8: mov64 r3, 0x20
0902e0: call 0x112bf ; call 0x1198e0
0902e8: lsh64 r0, 0x20
0902f0: rsh64 r0, 0x20
0902f8: jne r0, 0x0, +0x1 ; branch 0x90308
090300: ja +0xd ; branch 0x90370
090308: ldxdw r1, [r8 + 0x40]
090310: ldxdw r8, [r1 + 0x20]
090318: mov64 r2, r7
090320: mov64 r3, 0x20
090328: call 0x112b6 ; call 0x1198e0
090330: mov64 r7, 0x2
090338: lsh64 r0, 0x20
090340: rsh64 r0, 0x20
090348: jne r0, 0x0, +0x1 ; branch 0x90358
090350: ja +0x13 ; branch 0x903f0
090358: stxdw [r6 + 0x8], r1
090360: stxdw [r6 + 0x0], r7
090368: exit
090370: mov64 r1, r9
090378: call 0xe579 ; call 0x102f48
090380: jne r0, 0x0, -0x10 ; branch 0x90308
090388: mov64 r1, r10
090390: add64 r1, -0x18
090398: mov64 r2, r9
0903a0: call 0xf1ce ; call 0x109218
0903a8: ldxdw r1, [r10 - 0x8]
0903b0: ldxdw r2, [r10 - 0x18]
0903b8: lddw r3, -0x7fffffffffffffe6
0903c8: jne r2, r3, +0x14 ; branch 0x90470
0903d0: ldxdw r2, [r1 + 0x0]
0903d8: add64 r2, 0x1
0903e0: stxdw [r1 + 0x0], r2
0903e8: ja -0x1d ; branch 0x90308
0903f0: mov64 r1, r8
0903f8: call 0xe569 ; call 0x102f48
090400: jne r0, 0x0, -0x16 ; branch 0x90358
090408: mov64 r1, r10
090410: add64 r1, -0x18
090418: mov64 r2, r8
090420: call 0xf1be ; call 0x109218
090428: ldxdw r1, [r10 - 0x8]
090430: ldxdw r2, [r10 - 0x18]
090438: lddw r3, -0x7fffffffffffffe6
090448: jne r2, r3, +0x19 ; branch 0x90518
090450: ldxdw r2, [r1 + 0x0]
090458: add64 r2, 0x1
090460: stxdw [r1 + 0x0], r2
090468: ja -0x23 ; branch 0x90358
090470: ldxdw r3, [r10 - 0x10]
090478: stxdw [r10 - 0x8], r1
090480: stxdw [r10 - 0x10], r3
090488: stxdw [r10 - 0x18], r2
090490: mov64 r1, r10
090498: add64 r1, -0x68
0904a0: mov64 r2, r10
0904a8: add64 r2, -0x18
0904b0: call 0xe571 ; call 0x103040
0904b8: ldxdw r2, [r10 - 0x68]
0904c0: jeq r2, 0x2, -0x38 ; branch 0x90308
0904c8: ldxdw r3, [r10 - 0x60]
0904d0: mov64 r1, r10
0904d8: add64 r1, -0x78
0904e0: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0904f0: mov64 r5, 0x18
0904f8: call -0x11cf1 ; call 0x1d78
090500: ldxdw r1, [r10 - 0x70]
090508: ldxdw r7, [r10 - 0x78]
090510: ja -0x38 ; branch 0x90358
090518: ldxdw r3, [r10 - 0x10]
090520: stxdw [r10 - 0x8], r1
090528: stxdw [r10 - 0x10], r3
090530: stxdw [r10 - 0x18], r2
090538: mov64 r1, r10
090540: add64 r1, -0x88
090548: mov64 r2, r10
090550: add64 r2, -0x18
090558: call 0xe55c ; call 0x103040
090560: ldxdw r2, [r10 - 0x88]
090568: jeq r2, 0x2, -0x43 ; branch 0x90358
090570: ldxdw r3, [r10 - 0x80]
090578: mov64 r1, r10
090580: add64 r1, -0x98
090588: lddw r4, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
090598: mov64 r5, 0xb
0905a0: call -0x11d06 ; call 0x1d78
0905a8: ldxdw r1, [r10 - 0x90]
0905b0: ldxdw r7, [r10 - 0x98]
0905b8: ja -0x4d ; branch 0x90358
0905c0: ldxdw r3, [r10 - 0x20]
0905c8: mov64 r1, r10
0905d0: add64 r1, -0x38
0905d8: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
0905e8: mov64 r5, 0x9
0905f0: call -0x11d10 ; call 0x1d78
0905f8: ldxdw r1, [r10 - 0x30]
090600: ldxdw r7, [r10 - 0x38]
090608: ja -0x57 ; branch 0x90358
090610: ldxdw r3, [r10 - 0x40]
090618: mov64 r1, r10
090620: add64 r1, -0x58
090628: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
090638: mov64 r5, 0x17
090640: call -0x11d1a ; call 0x1d78
090648: ldxdw r1, [r10 - 0x50]
090650: ldxdw r7, [r10 - 0x58]
090658: ja -0x61 ; branch 0x90358
