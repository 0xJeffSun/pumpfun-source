0db958: mov64 r9, r5
0db960: mov64 r7, r3
0db968: mov64 r8, r2
0db970: mov64 r6, r1
0db978: mov64 r1, r10
0db980: add64 r1, -0x440
0db988: mov64 r2, r7
0db990: call -0x190e5 ; direct target 0x13270
0db998: ldxb r1, [r10 - 0x1]
0db9a0: jeq r1, 0x2, +0x17 ; branch 0xdba60
0db9a8: lddw r1, 0x300000000
0db9b8: ldxdw r1, [r1 + 0x0]
0db9c0: mov64 r3, r1
0db9c8: add64 r3, -0x440
0db9d0: mov64 r2, 0x0
0db9d8: mov64 r4, 0x1
0db9e0: jgt r3, r1, +0x1 ; branch 0xdb9f0
0db9e8: mov64 r4, 0x0
0db9f0: stxdw [r10 - 0x758], r8
0db9f8: jne r4, 0x0, +0x1 ; branch 0xdba08
0dba00: mov64 r2, r3
0dba08: lddw r8, 0x300007bc0
0dba18: jeq r1, 0x0, +0x2 ; branch 0xdba30
0dba20: and64 r2, -0x8
0dba28: mov64 r8, r2
0dba30: lddw r1, 0x300000007
0dba40: jgt r8, r1, +0xe ; branch 0xdbab8
0dba48: mov64 r1, 0x8
0dba50: mov64 r2, 0x440
0dba58: call 0x19eea ; direct target 0x1ab1b0
0dba60: ldxdw r3, [r10 - 0x438]
0dba68: ldxdw r2, [r10 - 0x440]
0dba70: mov64 r1, r10
0dba78: add64 r1, -0x748
0dba80: lddw r4, 0x1b7326 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'globalevent_authorityprogram_signeridl_accountprogramsystem_programauthorityfee_recipientassociated_'
0dba90: mov64 r5, 0x6
0dba98: call -0x1b22e ; direct target 0x2930
0dbaa0: ldxdw r1, [r10 - 0x748]
0dbaa8: ldxdw r2, [r10 - 0x740]
0dbab0: ja +0x112 ; branch 0xdc348
0dbab8: ldxdw r1, [r9 - 0xff8]
0dbac0: stxdw [r10 - 0x750], r1
0dbac8: lddw r9, 0x300000000
0dbad8: stxdw [r9 + 0x0], r8
0dbae0: mov64 r2, r10
0dbae8: add64 r2, -0x440
0dbaf0: mov64 r1, r8
0dbaf8: mov64 r3, 0x440
0dbb00: call 0x1af61 ; direct target 0x1b3610
0dbb08: mov64 r1, r10
0dbb10: add64 r1, -0x440
0dbb18: mov64 r2, r7
0dbb20: call -0x190e9 ; direct target 0x133e0
0dbb28: lddw r1, -0x8000000000000000
0dbb38: ldxdw r2, [r10 - 0x440]
0dbb40: jeq r2, r1, +0x14 ; branch 0xdbbe8
0dbb48: ldxdw r1, [r9 + 0x0]
0dbb50: mov64 r3, r1
0dbb58: add64 r3, -0x90
0dbb60: mov64 r2, 0x0
0dbb68: mov64 r4, 0x1
0dbb70: jgt r3, r1, +0x1 ; branch 0xdbb80
0dbb78: mov64 r4, 0x0
0dbb80: jne r4, 0x0, +0x1 ; branch 0xdbb90
0dbb88: mov64 r2, r3
0dbb90: lddw r9, 0x300007f70
0dbba0: jeq r1, 0x0, +0x2 ; branch 0xdbbb8
0dbba8: and64 r2, -0x8
0dbbb0: mov64 r9, r2
0dbbb8: lddw r1, 0x300000007
0dbbc8: jgt r9, r1, +0xe ; branch 0xdbc40
0dbbd0: mov64 r1, 0x8
0dbbd8: mov64 r2, 0x90
0dbbe0: call 0x19eb9 ; direct target 0x1ab1b0
0dbbe8: ldxdw r3, [r10 - 0x430]
0dbbf0: ldxdw r2, [r10 - 0x438]
0dbbf8: mov64 r1, r10
0dbc00: add64 r1, -0x738
0dbc08: lddw r4, 0x1b7491 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'fee_configsharing_configcreator_vaultfee_programassociated_token_programquote_token_programbase_toke'
0dbc18: mov64 r5, 0xa
0dbc20: call -0x1b25f ; direct target 0x2930
0dbc28: ldxdw r1, [r10 - 0x738]
0dbc30: ldxdw r2, [r10 - 0x730]
0dbc38: ja +0xe1 ; branch 0xdc348
0dbc40: lddw r1, 0x300000000
0dbc50: stxdw [r1 + 0x0], r9
0dbc58: mov64 r2, r10
0dbc60: add64 r2, -0x440
0dbc68: mov64 r1, r9
0dbc70: mov64 r3, 0x90
0dbc78: call 0x1af32 ; direct target 0x1b3610
0dbc80: mov64 r1, r10
0dbc88: add64 r1, -0x440
0dbc90: mov64 r2, r7
0dbc98: call -0x192a0 ; direct target 0x127a0
0dbca0: ldxdw r3, [r10 - 0x438]
0dbca8: ldxdw r2, [r10 - 0x440]
0dbcb0: jeq r2, 0x2, +0x1 ; branch 0xdbcc0
0dbcb8: ja +0x2f ; branch 0xdbe38
0dbcc0: stxdw [r10 - 0x760], r3
0dbcc8: mov64 r1, r10
0dbcd0: add64 r1, -0x440
0dbcd8: mov64 r2, r7
0dbce0: call -0x192a9 ; direct target 0x127a0
0dbce8: ldxdw r3, [r10 - 0x438]
0dbcf0: ldxdw r2, [r10 - 0x440]
0dbcf8: jeq r2, 0x2, +0x1 ; branch 0xdbd08
0dbd00: ja +0x2f ; branch 0xdbe80
0dbd08: stxdw [r10 - 0x768], r3
0dbd10: mov64 r1, r10
0dbd18: add64 r1, -0x440
0dbd20: mov64 r2, r7
0dbd28: call -0x192b2 ; direct target 0x127a0
0dbd30: ldxdw r3, [r10 - 0x438]
0dbd38: ldxdw r2, [r10 - 0x440]
0dbd40: jeq r2, 0x2, +0x1 ; branch 0xdbd50
0dbd48: ja +0x2f ; branch 0xdbec8
0dbd50: stxdw [r10 - 0x770], r3
0dbd58: mov64 r1, r10
0dbd60: add64 r1, -0x440
0dbd68: mov64 r2, r7
0dbd70: call -0x1b775 ; direct target 0x1d0
0dbd78: ldxw r1, [r10 - 0x390]
0dbd80: jeq r1, 0x2, +0x31 ; branch 0xdbf10
0dbd88: lddw r1, 0x300000000
0dbd98: ldxdw r5, [r1 + 0x0]
0dbda0: mov64 r3, r5
0dbda8: add64 r3, -0xd8
0dbdb0: mov64 r2, 0x0
0dbdb8: mov64 r4, 0x1
0dbdc0: jgt r3, r5, +0x1 ; branch 0xdbdd0
0dbdc8: mov64 r4, 0x0
0dbdd0: jne r4, 0x0, +0x1 ; branch 0xdbde0
0dbdd8: mov64 r2, r3
0dbde0: lddw r1, 0x300007f28
0dbdf0: jeq r5, 0x0, +0x2 ; branch 0xdbe08
0dbdf8: and64 r2, -0x8
0dbe00: mov64 r1, r2
0dbe08: lddw r2, 0x300000007
0dbe18: jgt r1, r2, +0x29 ; branch 0xdbf68
0dbe20: mov64 r1, 0x8
0dbe28: mov64 r2, 0xd8
0dbe30: call 0x19e6f ; direct target 0x1ab1b0
0dbe38: mov64 r1, r10
0dbe40: add64 r1, -0x518
0dbe48: lddw r4, 0x1b7892 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'pump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsquote_controlQuoteC'
0dbe58: mov64 r5, 0x16
0dbe60: call -0x1b2a7 ; direct target 0x2930
0dbe68: ldxdw r1, [r10 - 0x518]
0dbe70: ldxdw r2, [r10 - 0x510]
0dbe78: ja +0x99 ; branch 0xdc348
0dbe80: mov64 r1, r10
0dbe88: add64 r1, -0x528
0dbe90: lddw r4, 0x1b5e68 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00sell\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00'
0dbea0: mov64 r5, 0x4
0dbea8: call -0x1b2b0 ; direct target 0x2930
0dbeb0: ldxdw r1, [r10 - 0x528]
0dbeb8: ldxdw r2, [r10 - 0x520]
0dbec0: ja +0x90 ; branch 0xdc348
0dbec8: mov64 r1, r10
0dbed0: add64 r1, -0x538
0dbed8: lddw r4, 0x1b6780 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'source_authority0123456789abcdefDataTypeMismatchInvalidProgramIdConfidentialMintBurnAccountprograms/'
0dbee8: mov64 r5, 0x10
0dbef0: call -0x1b2b9 ; direct target 0x2930
0dbef8: ldxdw r1, [r10 - 0x538]
0dbf00: ldxdw r2, [r10 - 0x530]
0dbf08: ja +0x87 ; branch 0xdc348
0dbf10: ldxdw r3, [r10 - 0x438]
0dbf18: ldxdw r2, [r10 - 0x440]
0dbf20: mov64 r1, r10
0dbf28: add64 r1, -0x728
0dbf30: lddw r4, 0x1b7881 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'sourcedestinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsqu'
0dbf40: mov64 r5, 0x6
0dbf48: call -0x1b2c4 ; direct target 0x2930
0dbf50: ldxdw r1, [r10 - 0x728]
0dbf58: ldxdw r2, [r10 - 0x720]
0dbf60: ja +0x7c ; branch 0xdc348
0dbf68: lddw r2, 0x300000000
0dbf78: stxdw [r2 + 0x0], r1
0dbf80: mov64 r2, r10
0dbf88: add64 r2, -0x440
0dbf90: stxdw [r10 - 0x778], r1
0dbf98: mov64 r3, 0xd8
0dbfa0: call 0x1aecd ; direct target 0x1b3610
0dbfa8: mov64 r1, r10
0dbfb0: add64 r1, -0x440
0dbfb8: mov64 r2, r7
0dbfc0: call -0x1b0e4 ; direct target 0x38a8
0dbfc8: ldxdw r3, [r10 - 0x438]
0dbfd0: ldxdw r2, [r10 - 0x440]
0dbfd8: jeq r2, 0x2, +0x1 ; branch 0xdbfe8
0dbfe0: ja +0xa ; branch 0xdc038
0dbfe8: stxdw [r10 - 0x780], r3
0dbff0: ldxdw r1, [r7 + 0x8]
0dbff8: jeq r1, 0x0, +0x10 ; branch 0xdc080
0dc000: add64 r1, -0x1
0dc008: stxdw [r7 + 0x8], r1
0dc010: ldxdw r3, [r7 + 0x0]
0dc018: mov64 r1, r3
0dc020: add64 r1, 0x30
0dc028: stxdw [r7 + 0x0], r1
0dc030: ja +0x11 ; branch 0xdc0c0
0dc038: mov64 r1, r10
0dc040: add64 r1, -0x548
0dc048: lddw r4, 0x1b7887 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'destinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsquote_co'
0dc058: mov64 r5, 0xb
0dc060: call -0x1b2e7 ; direct target 0x2930
0dc068: ldxdw r1, [r10 - 0x548]
0dc070: ldxdw r2, [r10 - 0x540]
0dc078: ja +0x59 ; branch 0xdc348
0dc080: mov64 r1, r10
0dc088: add64 r1, -0x558
0dc090: mov64 r2, 0xbbd
0dc098: call 0x18650 ; direct target 0x19f320
0dc0a0: ldxdw r3, [r10 - 0x550]
0dc0a8: ldxdw r2, [r10 - 0x558]
0dc0b0: jeq r2, 0x2, +0x1 ; branch 0xdc0c0
0dc0b8: ja +0x40 ; branch 0xdc2c0
0dc0c0: stxdw [r10 - 0x788], r3
0dc0c8: mov64 r1, r10
0dc0d0: add64 r1, -0x440
0dc0d8: mov64 r2, r7
0dc0e0: call -0x18f44 ; direct target 0x146c8
0dc0e8: ldxdw r3, [r10 - 0x438]
0dc0f0: ldxdw r2, [r10 - 0x440]
0dc0f8: jeq r2, 0x2, +0x1 ; branch 0xdc108
0dc100: ja +0x25 ; branch 0xdc230
0dc108: stxdw [r10 - 0x790], r3
0dc110: mov64 r1, r10
0dc118: add64 r1, -0x440
0dc120: mov64 r2, r7
0dc128: call -0x19028 ; direct target 0x13ff0
0dc130: ldxdw r3, [r10 - 0x438]
0dc138: ldxdw r2, [r10 - 0x440]
0dc140: jeq r2, 0x2, +0x1 ; branch 0xdc150
0dc148: ja +0x25 ; branch 0xdc278
0dc150: stxdw [r10 - 0x798], r3
0dc158: mov64 r1, r10
0dc160: add64 r1, -0x440
0dc168: mov64 r2, r7
0dc170: call -0x190bf ; direct target 0x13b80
0dc178: ldxdw r3, [r10 - 0x438]
0dc180: ldxdw r2, [r10 - 0x440]
0dc188: jeq r2, 0x2, +0x1 ; branch 0xdc198
0dc190: ja +0x2e ; branch 0xdc308
0dc198: stxdw [r10 - 0x7a0], r3
0dc1a0: mov64 r1, r10
0dc1a8: add64 r1, -0x440
0dc1b0: mov64 r2, r7
0dc1b8: call -0x1b2a3 ; direct target 0x2ca8
0dc1c0: ldxdw r3, [r10 - 0x438]
0dc1c8: ldxdw r2, [r10 - 0x440]
0dc1d0: ldxb r1, [r10 - 0x416]
0dc1d8: jeq r1, 0x2, +0x1 ; branch 0xdc1e8
0dc1e0: ja +0x30 ; branch 0xdc368
0dc1e8: mov64 r1, r10
0dc1f0: add64 r1, -0x718
0dc1f8: lddw r4, 0x1b732c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'event_authorityprogram_signeridl_accountprogramsystem_programauthorityfee_recipientassociated_quote_'
0dc208: mov64 r5, 0xf
0dc210: call -0x1b31d ; direct target 0x2930
0dc218: ldxdw r1, [r10 - 0x718]
0dc220: ldxdw r2, [r10 - 0x710]
0dc228: ja +0x23 ; branch 0xdc348
0dc230: mov64 r1, r10
0dc238: add64 r1, -0x578
0dc240: lddw r4, 0x1b759e ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'token_programnot implemented: admin_set_creator_authoritycurrent_creator_quote_token_accountcreator_'
0dc250: mov64 r5, 0xd
0dc258: call -0x1b326 ; direct target 0x2930
0dc260: ldxdw r1, [r10 - 0x578]
0dc268: ldxdw r2, [r10 - 0x570]
0dc270: ja +0x1a ; branch 0xdc348
0dc278: mov64 r1, r10
0dc280: add64 r1, -0x588
0dc288: lddw r4, 0x1b7853 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'token_2022_programpool_authority_quote_accountsourcedestinationpump_amm_global_configprograms/pump/s'
0dc298: mov64 r5, 0x12
0dc2a0: call -0x1b32f ; direct target 0x2930
0dc2a8: ldxdw r1, [r10 - 0x588]
0dc2b0: ldxdw r2, [r10 - 0x580]
0dc2b8: ja +0x11 ; branch 0xdc348
0dc2c0: mov64 r1, r10
0dc2c8: add64 r1, -0x568
0dc2d0: lddw r4, 0x1b739d ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'buyback_fee_recipientassociated_quote_buyback_fee_recipientbonding_curveassociated_base_bonding_curv'
0dc2e0: mov64 r5, 0x15
0dc2e8: call -0x1b338 ; direct target 0x2930
0dc2f0: ldxdw r1, [r10 - 0x568]
0dc2f8: ldxdw r2, [r10 - 0x560]
0dc300: ja +0x8 ; branch 0xdc348
0dc308: mov64 r1, r10
0dc310: add64 r1, -0x598
0dc318: lddw r4, 0x1b735b ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'system_programauthorityfee_recipientassociated_quote_fee_recipientbuyback_fee_recipientassociated_qu'
0dc328: mov64 r5, 0xe
0dc330: call -0x1b341 ; direct target 0x2930
0dc338: ldxdw r1, [r10 - 0x598]
0dc340: ldxdw r2, [r10 - 0x590]
0dc348: stxdw [r6 + 0x8], r2
0dc350: stxdw [r6 + 0x0], r1
0dc358: stb [r6 + 0x8a], 0x2
0dc360: exit
0dc368: stxdw [r10 - 0x7c0], r1
0dc370: stxdw [r10 - 0x7b8], r2
0dc378: stxdw [r10 - 0x7a8], r3
0dc380: ldxdw r1, [r10 - 0x428]
0dc388: stxdw [r10 - 0x500], r1
0dc390: ldxdw r1, [r10 - 0x420]
0dc398: stxdw [r10 - 0x4f8], r1
0dc3a0: ldxh r1, [r10 - 0x418]
0dc3a8: stxh [r10 - 0x4f0], r1
0dc3b0: ldxw r1, [r10 - 0x415]
0dc3b8: stxw [r10 - 0x508], r1
0dc3c0: ldxb r1, [r10 - 0x411]
0dc3c8: stxb [r10 - 0x504], r1
0dc3d0: ldxdw r1, [r10 - 0x430]
0dc3d8: stxdw [r10 - 0x7b0], r1
0dc3e0: mov64 r1, r10
0dc3e8: add64 r1, -0x440
0dc3f0: mov64 r2, r7
0dc3f8: call -0x191a2 ; direct target 0x136f0
0dc400: ldxdw r7, [r10 - 0x438]
0dc408: ldxdw r2, [r10 - 0x440]
0dc410: jeq r2, 0x2, +0x1 ; branch 0xdc420
0dc418: ja +0x4d ; branch 0xdc688
0dc420: mov64 r1, r10
0dc428: add64 r1, -0x440
0dc430: lddw r2, 0x1bdf10 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00&s\x1b\x00\x06\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x007p\x1b\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00wh\x1b\x00\x1e\x00\x00\x00\x00\x00\x00\x00\x1b\x00\x00\x00\n\x00\x00\x00\x00\x00\x00\x00\xb0h\x1b\x00\x0e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00:u\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00Gu\x1b\x00\t\x00\x00\x00'
0dc440: mov64 r3, 0x1
0dc448: ldxdw r4, [r10 - 0x758]
0dc450: call 0x1974c ; direct target 0x1a7eb8
0dc458: ldxdw r1, [r10 - 0x428]
0dc460: stxdw [r10 - 0x4d0], r1
0dc468: ldxdw r1, [r10 - 0x430]
0dc470: stxdw [r10 - 0x4d8], r1
0dc478: ldxdw r1, [r10 - 0x438]
0dc480: stxdw [r10 - 0x4e0], r1
0dc488: ldxdw r1, [r10 - 0x440]
0dc490: stxdw [r10 - 0x4e8], r1
0dc498: ldxb r1, [r10 - 0x420]
0dc4a0: ldxdw r2, [r10 - 0x750]
0dc4a8: stxb [r2 + 0x0], r1
0dc4b0: ldxdw r1, [r8 + 0x0]
0dc4b8: ldxdw r1, [r1 + 0x0]
0dc4c0: ldxdw r2, [r1 + 0x18]
0dc4c8: stxdw [r10 - 0x428], r2
0dc4d0: ldxdw r2, [r1 + 0x10]
0dc4d8: stxdw [r10 - 0x430], r2
0dc4e0: ldxdw r2, [r1 + 0x8]
0dc4e8: stxdw [r10 - 0x438], r2
0dc4f0: ldxdw r1, [r1 + 0x0]
0dc4f8: stxdw [r10 - 0x440], r1
0dc500: mov64 r1, r10
0dc508: add64 r1, -0x440
0dc510: mov64 r2, r10
0dc518: add64 r2, -0x4e8
0dc520: mov64 r3, 0x20
0dc528: call 0x1ae29 ; direct target 0x1b3678
0dc530: lsh64 r0, 0x20
0dc538: rsh64 r0, 0x20
0dc540: jeq r0, 0x0, +0x45 ; branch 0xdc770
0dc548: mov64 r1, r10
0dc550: add64 r1, -0x5b8
0dc558: mov64 r2, 0x7d6
0dc560: call 0x185b7 ; direct target 0x19f320
0dc568: ldxdw r3, [r10 - 0x5b0]
0dc570: ldxdw r2, [r10 - 0x5b8]
0dc578: mov64 r1, r10
0dc580: add64 r1, -0x5c8
0dc588: lddw r4, 0x1b7326 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'globalevent_authorityprogram_signeridl_accountprogramsystem_programauthorityfee_recipientassociated_'
0dc598: mov64 r5, 0x6
0dc5a0: call -0x1b38f ; direct target 0x2930
0dc5a8: ldxdw r3, [r10 - 0x5c0]
0dc5b0: ldxdw r2, [r10 - 0x5c8]
0dc5b8: ldxdw r1, [r8 + 0x0]
0dc5c0: ldxdw r1, [r1 + 0x0]
0dc5c8: ldxdw r4, [r1 + 0x0]
0dc5d0: ldxdw r5, [r1 + 0x8]
0dc5d8: ldxdw r0, [r1 + 0x10]
0dc5e0: ldxdw r1, [r1 + 0x18]
0dc5e8: ldxdw r7, [r10 - 0x4e8]
0dc5f0: stxdw [r10 - 0x420], r7
0dc5f8: ldxdw r7, [r10 - 0x4e0]
0dc600: stxdw [r10 - 0x418], r7
0dc608: ldxdw r7, [r10 - 0x4d8]
0dc610: stxdw [r10 - 0x410], r7
0dc618: ldxdw r7, [r10 - 0x4d0]
0dc620: stxdw [r10 - 0x408], r7
0dc628: stxdw [r10 - 0x428], r1
0dc630: stxdw [r10 - 0x430], r0
0dc638: stxdw [r10 - 0x438], r5
0dc640: stxdw [r10 - 0x440], r4
0dc648: mov64 r1, r10
0dc650: add64 r1, -0x5d8
0dc658: mov64 r4, r10
0dc660: add64 r4, -0x440
0dc668: call 0x17f69 ; direct target 0x19c1b8
0dc670: ldxdw r1, [r10 - 0x5d8]
0dc678: ldxdw r2, [r10 - 0x5d0]
0dc680: ja +0x9 ; branch 0xdc6d0
0dc688: mov64 r1, r10
0dc690: add64 r1, -0x5a8
0dc698: mov64 r3, r7
0dc6a0: lddw r4, 0x1b7354 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'programsystem_programauthorityfee_recipientassociated_quote_fee_recipientbuyback_fee_recipientassoci'
0dc6b0: mov64 r5, 0x7
0dc6b8: call -0x1b3b2 ; direct target 0x2930
0dc6c0: ldxdw r1, [r10 - 0x5a8]
0dc6c8: ldxdw r2, [r10 - 0x5a0]
0dc6d0: stxdw [r6 + 0x8], r2
0dc6d8: stxdw [r6 + 0x0], r1
0dc6e0: stb [r6 + 0x8a], 0x2
0dc6e8: ldxdw r2, [r10 - 0x7a8]
0dc6f0: ldxdw r3, [r10 - 0x7b0]
0dc6f8: ldxdw r1, [r2 + 0x0]
0dc700: add64 r1, -0x1
0dc708: stxdw [r2 + 0x0], r1
0dc710: jne r1, 0x0, +0x3 ; branch 0xdc730
0dc718: ldxdw r1, [r2 + 0x8]
0dc720: add64 r1, -0x1
0dc728: stxdw [r2 + 0x8], r1
0dc730: ldxdw r1, [r3 + 0x0]
0dc738: add64 r1, -0x1
0dc740: stxdw [r3 + 0x0], r1
0dc748: jne r1, 0x0, -0x7e ; branch 0xdc360
0dc750: ldxdw r1, [r3 + 0x8]
0dc758: add64 r1, -0x1
0dc760: stxdw [r3 + 0x8], r1
0dc768: ja -0x82 ; branch 0xdc360
0dc770: ldxb r1, [r9 + 0x80]
0dc778: mov64 r2, r10
0dc780: add64 r2, -0x461
0dc788: stxdw [r10 - 0x420], r2
0dc790: lddw r2, 0x1b79df ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8cFeeC'
0dc7a0: stxdw [r10 - 0x430], r2
0dc7a8: lddw r2, 0x1b7491 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'fee_configsharing_configcreator_vaultfee_programassociated_token_programquote_token_programbase_toke'
0dc7b8: stxdw [r10 - 0x440], r2
0dc7c0: stxb [r10 - 0x461], r1
0dc7c8: stdw [r10 - 0x418], 0x1
0dc7d0: stdw [r10 - 0x428], 0x20
0dc7d8: stdw [r10 - 0x438], 0xa
0dc7e0: lddw r1, 0x707cc214a46a519c
0dc7f0: stxdw [r10 - 0x448], r1
0dc7f8: lddw r1, 0x401fa42cc9f14c
0dc808: stxdw [r10 - 0x450], r1
0dc810: lddw r1, 0x27155607bcf7a88d
0dc820: stxdw [r10 - 0x458], r1
0dc828: lddw r1, 0x568e5a05a9ff350c
0dc838: stxdw [r10 - 0x460], r1
0dc840: mov64 r1, r10
0dc848: add64 r1, -0x488
0dc850: mov64 r2, r10
0dc858: add64 r2, -0x440
0dc860: mov64 r4, r10
0dc868: add64 r4, -0x460
0dc870: mov64 r3, 0x3
0dc878: call 0x196ee ; direct target 0x1a7ff0
0dc880: ldxb r1, [r10 - 0x488]
0dc888: jeq r1, 0x0, +0xf ; branch 0xdc908
0dc890: mov64 r1, r10
0dc898: add64 r1, -0x5e8
0dc8a0: mov64 r2, 0x7d6
0dc8a8: call 0x1854e ; direct target 0x19f320
0dc8b0: ldxdw r3, [r10 - 0x5e0]
0dc8b8: ldxdw r2, [r10 - 0x5e8]
0dc8c0: mov64 r1, r10
0dc8c8: add64 r1, -0x5f8
0dc8d0: lddw r4, 0x1b7491 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'fee_configsharing_configcreator_vaultfee_programassociated_token_programquote_token_programbase_toke'
0dc8e0: mov64 r5, 0xa
0dc8e8: call -0x1b3f8 ; direct target 0x2930
0dc8f0: ldxdw r1, [r10 - 0x5f8]
0dc8f8: ldxdw r2, [r10 - 0x5f0]
0dc900: ja -0x47 ; branch 0xdc6d0
0dc908: ldxw r1, [r10 - 0x484]
0dc910: stxw [r10 - 0x4c5], r1
0dc918: ldxw r1, [r10 - 0x487]
0dc920: stxw [r10 - 0x4c8], r1
0dc928: ldxdw r1, [r10 - 0x470]
0dc930: stxdw [r10 - 0x4a8], r1
0dc938: stxdw [r10 - 0x4b1], r1
0dc940: ldxb r1, [r10 - 0x468]
0dc948: stxb [r10 - 0x4a9], r1
0dc950: ldxdw r1, [r10 - 0x480]
0dc958: stxdw [r10 - 0x4c1], r1
0dc960: ldxdw r1, [r10 - 0x478]
0dc968: stxdw [r10 - 0x4b9], r1
0dc970: ldxdw r1, [r9 + 0x88]
0dc978: ldxdw r1, [r1 + 0x0]
0dc980: ldxdw r2, [r1 + 0x18]
0dc988: stxdw [r10 - 0x428], r2
0dc990: ldxdw r2, [r1 + 0x10]
0dc998: stxdw [r10 - 0x430], r2
0dc9a0: ldxdw r2, [r1 + 0x8]
0dc9a8: stxdw [r10 - 0x438], r2
0dc9b0: ldxdw r1, [r1 + 0x0]
0dc9b8: stxdw [r10 - 0x440], r1
0dc9c0: mov64 r1, r10
0dc9c8: add64 r1, -0x440
0dc9d0: mov64 r2, r10
0dc9d8: add64 r2, -0x4c8
0dc9e0: mov64 r3, 0x20
0dc9e8: call 0x1ad91 ; direct target 0x1b3678
0dc9f0: lsh64 r0, 0x20
0dc9f8: rsh64 r0, 0x20
0dca00: jeq r0, 0x0, +0x28 ; branch 0xdcb48
0dca08: mov64 r1, r10
0dca10: add64 r1, -0x608
0dca18: mov64 r2, 0x7d6
0dca20: call 0x1851f ; direct target 0x19f320
0dca28: ldxdw r3, [r10 - 0x600]
0dca30: ldxdw r2, [r10 - 0x608]
0dca38: mov64 r1, r10
0dca40: add64 r1, -0x618
0dca48: lddw r4, 0x1b7491 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'fee_configsharing_configcreator_vaultfee_programassociated_token_programquote_token_programbase_toke'
0dca58: mov64 r5, 0xa
0dca60: call -0x1b427 ; direct target 0x2930
0dca68: ldxdw r3, [r10 - 0x610]
0dca70: ldxdw r2, [r10 - 0x618]
0dca78: ldxdw r1, [r9 + 0x88]
0dca80: ldxdw r1, [r1 + 0x0]
0dca88: ldxdw r4, [r1 + 0x0]
0dca90: ldxdw r5, [r1 + 0x8]
0dca98: ldxdw r0, [r1 + 0x10]
0dcaa0: ldxdw r1, [r1 + 0x18]
0dcaa8: ldxdw r7, [r10 - 0x4c8]
0dcab0: stxdw [r10 - 0x420], r7
0dcab8: ldxdw r7, [r10 - 0x4c0]
0dcac0: stxdw [r10 - 0x418], r7
0dcac8: ldxdw r7, [r10 - 0x4b8]
0dcad0: stxdw [r10 - 0x410], r7
0dcad8: ldxdw r7, [r10 - 0x4b0]
0dcae0: stxdw [r10 - 0x408], r7
0dcae8: stxdw [r10 - 0x428], r1
0dcaf0: stxdw [r10 - 0x430], r0
0dcaf8: stxdw [r10 - 0x438], r5
0dcb00: stxdw [r10 - 0x440], r4
0dcb08: mov64 r1, r10
0dcb10: add64 r1, -0x628
0dcb18: mov64 r4, r10
0dcb20: add64 r4, -0x440
0dcb28: call 0x17ed1 ; direct target 0x19c1b8
0dcb30: ldxdw r1, [r10 - 0x628]
0dcb38: ldxdw r2, [r10 - 0x620]
0dcb40: ja -0x8f ; branch 0xdc6d0
0dcb48: lddw r1, 0x63a8e9180c09f8d4
0dcb58: stxdw [r10 - 0x470], r1
0dcb60: lddw r1, -0x4b8e2aa9ce72d60c
0dcb70: stxdw [r10 - 0x478], r1
0dcb78: lddw r1, 0x654065bb18082594
0dcb88: stxdw [r10 - 0x480], r1
0dcb90: lddw r1, 0x76c65e82fcde140c
0dcba0: stxdw [r10 - 0x488], r1
0dcba8: mov64 r1, r10
0dcbb0: add64 r1, -0x440
0dcbb8: mov64 r4, r10
0dcbc0: add64 r4, -0x488
0dcbc8: lddw r2, 0x1bdf88 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00Cv\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf7k\x1b\x004\x00\x00\x00\x00\x00\x00\x00\xd9\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\xf5n\x1b\x00(\x00\x00\x00\x00\x00\x00\x00\x10\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\xeap\x1b\x008\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\xf0\xae\x00\x00\x08\x00\x00\x00'
0dcbd8: mov64 r3, 0x1
0dcbe0: call 0x1965a ; direct target 0x1a7eb8
0dcbe8: ldxdw r1, [r10 - 0x428]
0dcbf0: stxdw [r10 - 0x448], r1
0dcbf8: ldxdw r1, [r10 - 0x430]
0dcc00: stxdw [r10 - 0x450], r1
0dcc08: ldxdw r1, [r10 - 0x438]
0dcc10: stxdw [r10 - 0x458], r1
0dcc18: ldxdw r1, [r10 - 0x440]
0dcc20: stxdw [r10 - 0x460], r1
0dcc28: ldxb r1, [r10 - 0x420]
0dcc30: ldxdw r2, [r10 - 0x750]
0dcc38: stxb [r2 + 0x1], r1
0dcc40: ldxdw r1, [r10 - 0x760]
0dcc48: ldxdw r2, [r1 + 0x0]
0dcc50: ldxdw r1, [r2 + 0x18]
0dcc58: stxdw [r10 - 0x428], r1
0dcc60: ldxdw r1, [r2 + 0x10]
0dcc68: stxdw [r10 - 0x430], r1
0dcc70: ldxdw r1, [r2 + 0x8]
0dcc78: stxdw [r10 - 0x438], r1
0dcc80: stxdw [r10 - 0x7c8], r2
0dcc88: ldxdw r1, [r2 + 0x0]
0dcc90: stxdw [r10 - 0x440], r1
0dcc98: mov64 r1, r10
0dcca0: add64 r1, -0x440
0dcca8: mov64 r2, r10
0dccb0: add64 r2, -0x460
0dccb8: mov64 r3, 0x20
0dccc0: call 0x1ad36 ; direct target 0x1b3678
0dccc8: lsh64 r0, 0x20
0dccd0: rsh64 r0, 0x20
0dccd8: jeq r0, 0x0, +0x27 ; branch 0xdce18
0dcce0: mov64 r1, r10
0dcce8: add64 r1, -0x638
0dccf0: mov64 r2, 0x7d6
0dccf8: call 0x184c4 ; direct target 0x19f320
0dcd00: ldxdw r3, [r10 - 0x630]
0dcd08: ldxdw r2, [r10 - 0x638]
0dcd10: mov64 r1, r10
0dcd18: add64 r1, -0x648
0dcd20: lddw r4, 0x1b7892 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'pump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsquote_controlQuoteC'
0dcd30: mov64 r5, 0x16
0dcd38: call -0x1b482 ; direct target 0x2930
0dcd40: ldxdw r3, [r10 - 0x640]
0dcd48: ldxdw r2, [r10 - 0x648]
0dcd50: ldxdw r4, [r10 - 0x7c8]
0dcd58: ldxdw r1, [r4 + 0x18]
0dcd60: stxdw [r10 - 0x428], r1
0dcd68: ldxdw r1, [r4 + 0x10]
0dcd70: stxdw [r10 - 0x430], r1
0dcd78: ldxdw r1, [r4 + 0x8]
0dcd80: stxdw [r10 - 0x438], r1
0dcd88: ldxdw r1, [r4 + 0x0]
0dcd90: stxdw [r10 - 0x440], r1
0dcd98: ldxdw r1, [r10 - 0x460]
0dcda0: stxdw [r10 - 0x420], r1
0dcda8: ldxdw r1, [r10 - 0x458]
0dcdb0: stxdw [r10 - 0x418], r1
0dcdb8: ldxdw r1, [r10 - 0x450]
0dcdc0: stxdw [r10 - 0x410], r1
0dcdc8: ldxdw r1, [r10 - 0x448]
0dcdd0: stxdw [r10 - 0x408], r1
0dcdd8: mov64 r1, r10
0dcde0: add64 r1, -0x658
0dcde8: mov64 r4, r10
0dcdf0: add64 r4, -0x440
0dcdf8: call 0x17e77 ; direct target 0x19c1b8
0dce00: ldxdw r1, [r10 - 0x658]
0dce08: ldxdw r2, [r10 - 0x650]
0dce10: ja -0xe9 ; branch 0xdc6d0
0dce18: ldxdw r1, [r10 - 0x768]
0dce20: ldxb r1, [r1 + 0x29]
0dce28: jeq r1, 0x0, +0x17 ; branch 0xdcee8
0dce30: ldxdw r1, [r10 - 0x778]
0dce38: ldxdw r1, [r1 + 0x20]
0dce40: ldxb r1, [r1 + 0x29]
0dce48: jeq r1, 0x0, +0x34 ; branch 0xdcff0
0dce50: ldxdw r1, [r10 - 0x780]
0dce58: ldxdw r1, [r1 + 0x20]
0dce60: ldxb r1, [r1 + 0x29]
0dce68: jne r1, 0x0, +0x1e ; branch 0xdcf60
0dce70: mov64 r1, r10
0dce78: add64 r1, -0x6b8
0dce80: mov64 r2, 0x7d0
0dce88: call 0x18492 ; direct target 0x19f320
0dce90: ldxdw r3, [r10 - 0x6b0]
0dce98: ldxdw r2, [r10 - 0x6b8]
0dcea0: mov64 r1, r10
0dcea8: add64 r1, -0x6c8
0dceb0: lddw r4, 0x1b7887 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'destinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsquote_co'
0dcec0: mov64 r5, 0xb
0dcec8: call -0x1b4b4 ; direct target 0x2930
0dced0: ldxdw r1, [r10 - 0x6c8]
0dced8: ldxdw r2, [r10 - 0x6c0]
0dcee0: ja -0x103 ; branch 0xdc6d0
0dcee8: mov64 r1, r10
0dcef0: add64 r1, -0x6f8
0dcef8: mov64 r2, 0x7d0
0dcf00: call 0x18483 ; direct target 0x19f320
0dcf08: ldxdw r3, [r10 - 0x6f0]
0dcf10: ldxdw r2, [r10 - 0x6f8]
0dcf18: mov64 r1, r10
0dcf20: add64 r1, -0x708
0dcf28: lddw r4, 0x1b5e68 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'userbase\x02\x00\x00\x00e\x00\x00\x00S\x00\x00\x00Y\x00\x00\x00\x03\x00\x00\x00SomeL\x00\x00\x00 <= trueM\x00\x00\x00sell\xd6\x07\x00\x00.\x00\x00\x00\x06\x00\x00\x00f\x00\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00)\x00\x00\x00P\x00\x00\x00W\x00\x00\x00i\x00\x00\x00h\x00\x00\x00'
0dcf38: mov64 r5, 0x4
0dcf40: call -0x1b4c3 ; direct target 0x2930
0dcf48: ldxdw r1, [r10 - 0x708]
0dcf50: ldxdw r2, [r10 - 0x700]
0dcf58: ja -0x112 ; branch 0xdc6d0
0dcf60: ldxdw r1, [r10 - 0x788]
0dcf68: ldxb r1, [r1 + 0x29]
0dcf70: jne r1, 0x0, +0x1e ; branch 0xdd068
0dcf78: mov64 r1, r10
0dcf80: add64 r1, -0x698
0dcf88: mov64 r2, 0x7d0
0dcf90: call 0x18471 ; direct target 0x19f320
0dcf98: ldxdw r3, [r10 - 0x690]
0dcfa0: ldxdw r2, [r10 - 0x698]
0dcfa8: mov64 r1, r10
0dcfb0: add64 r1, -0x6a8
0dcfb8: lddw r4, 0x1b739d ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'buyback_fee_recipientassociated_quote_buyback_fee_recipientbonding_curveassociated_base_bonding_curv'
0dcfc8: mov64 r5, 0x15
0dcfd0: call -0x1b4d5 ; direct target 0x2930
0dcfd8: ldxdw r1, [r10 - 0x6a8]
0dcfe0: ldxdw r2, [r10 - 0x6a0]
0dcfe8: ja -0x124 ; branch 0xdc6d0
0dcff0: mov64 r1, r10
0dcff8: add64 r1, -0x6d8
0dd000: mov64 r2, 0x7d0
0dd008: call 0x18462 ; direct target 0x19f320
0dd010: ldxdw r3, [r10 - 0x6d0]
0dd018: ldxdw r2, [r10 - 0x6d8]
0dd020: mov64 r1, r10
0dd028: add64 r1, -0x6e8
0dd030: lddw r4, 0x1b7881 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'sourcedestinationpump_amm_global_configprograms/pump/src/quote_control/initialize_quote_control.rsqu'
0dd040: mov64 r5, 0x6
0dd048: call -0x1b4e4 ; direct target 0x2930
0dd050: ldxdw r1, [r10 - 0x6e8]
0dd058: ldxdw r2, [r10 - 0x6e0]
0dd060: ja -0x133 ; branch 0xdc6d0
0dd068: mov64 r1, r10
0dd070: add64 r1, -0x440
0dd078: lddw r2, 0x1bdbd8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x07h\x1b\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80n\x1b\x00\x1f\x00\x00\x00\x00\x00\x00\x004\x03\x00\x00+\x00\x00\x00\x00\x00\x00\x00\x9fn\x1b\x00)\x00\x00\x00\x00\x00\x00\x00\xe8\x00\x00\x00 \x00\x00\x00\x00\x00\x00\x00Zo\x1b\x00\x19\x00\x00\x00\x00\x00\x00\x00L\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00Zo\x1b\x00\x19\x00\x00\x00'
0dd088: mov64 r3, 0x1
0dd090: ldxdw r4, [r10 - 0x758]
0dd098: call 0x195c3 ; direct target 0x1a7eb8
0dd0a0: ldxdw r1, [r10 - 0x428]
0dd0a8: stxdw [r10 - 0x470], r1
0dd0b0: ldxdw r1, [r10 - 0x430]
0dd0b8: stxdw [r10 - 0x478], r1
0dd0c0: ldxdw r1, [r10 - 0x438]
0dd0c8: stxdw [r10 - 0x480], r1
0dd0d0: ldxdw r1, [r10 - 0x440]
0dd0d8: stxdw [r10 - 0x488], r1
0dd0e0: ldxb r1, [r10 - 0x420]
0dd0e8: ldxdw r2, [r10 - 0x750]
0dd0f0: stxb [r2 + 0x2], r1
0dd0f8: ldxdw r2, [r10 - 0x7b8]
0dd100: ldxdw r1, [r2 + 0x18]
0dd108: stxdw [r10 - 0x428], r1
0dd110: ldxdw r1, [r2 + 0x10]
0dd118: stxdw [r10 - 0x430], r1
0dd120: ldxdw r1, [r2 + 0x8]
0dd128: stxdw [r10 - 0x438], r1
0dd130: ldxdw r1, [r2 + 0x0]
0dd138: stxdw [r10 - 0x440], r1
0dd140: mov64 r1, r10
0dd148: add64 r1, -0x440
0dd150: mov64 r2, r10
0dd158: add64 r2, -0x488
0dd160: mov64 r3, 0x20
0dd168: call 0x1aca1 ; direct target 0x1b3678
0dd170: lsh64 r0, 0x20
0dd178: rsh64 r0, 0x20
0dd180: jne r0, 0x0, +0x28 ; branch 0xdd2c8
0dd188: ldxh r1, [r10 - 0x4f0]
0dd190: stxh [r6 + 0x88], r1
0dd198: ldxdw r1, [r10 - 0x4f8]
0dd1a0: stxdw [r6 + 0x80], r1
0dd1a8: ldxdw r1, [r10 - 0x500]
0dd1b0: stxdw [r6 + 0x78], r1
0dd1b8: ldxw r1, [r10 - 0x508]
0dd1c0: stxw [r6 + 0x8b], r1
0dd1c8: ldxb r1, [r10 - 0x504]
0dd1d0: stxb [r6 + 0x8f], r1
0dd1d8: ldxdw r1, [r10 - 0x7c0]
0dd1e0: stxb [r6 + 0x8a], r1
0dd1e8: ldxdw r1, [r10 - 0x7b0]
0dd1f0: stxdw [r6 + 0x70], r1
0dd1f8: ldxdw r1, [r10 - 0x7a8]
0dd200: stxdw [r6 + 0x68], r1
0dd208: ldxdw r1, [r10 - 0x7b8]
0dd210: stxdw [r6 + 0x60], r1
0dd218: stxdw [r6 + 0x58], r7
0dd220: ldxdw r1, [r10 - 0x7a0]
0dd228: stxdw [r6 + 0x50], r1
0dd230: ldxdw r1, [r10 - 0x798]
0dd238: stxdw [r6 + 0x48], r1
0dd240: ldxdw r1, [r10 - 0x790]
0dd248: stxdw [r6 + 0x40], r1
0dd250: ldxdw r1, [r10 - 0x788]
0dd258: stxdw [r6 + 0x38], r1
0dd260: ldxdw r1, [r10 - 0x780]
0dd268: stxdw [r6 + 0x30], r1
0dd270: ldxdw r1, [r10 - 0x778]
0dd278: stxdw [r6 + 0x28], r1
0dd280: ldxdw r1, [r10 - 0x770]
0dd288: stxdw [r6 + 0x20], r1
0dd290: ldxdw r1, [r10 - 0x768]
0dd298: stxdw [r6 + 0x18], r1
0dd2a0: ldxdw r1, [r10 - 0x760]
0dd2a8: stxdw [r6 + 0x10], r1
0dd2b0: stxdw [r6 + 0x8], r9
0dd2b8: stxdw [r6 + 0x0], r8
0dd2c0: ja -0x1ed ; branch 0xdc360
0dd2c8: mov64 r1, r10
0dd2d0: add64 r1, -0x668
0dd2d8: mov64 r2, 0x7d6
0dd2e0: call 0x18407 ; direct target 0x19f320
0dd2e8: ldxdw r3, [r10 - 0x660]
0dd2f0: ldxdw r2, [r10 - 0x668]
0dd2f8: mov64 r1, r10
0dd300: add64 r1, -0x678
0dd308: lddw r4, 0x1b732c ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'event_authorityprogram_signeridl_accountprogramsystem_programauthorityfee_recipientassociated_quote_'
0dd318: mov64 r5, 0xf
0dd320: call -0x1b53f ; direct target 0x2930
0dd328: ldxdw r3, [r10 - 0x670]
0dd330: ldxdw r2, [r10 - 0x678]
0dd338: ldxdw r4, [r10 - 0x7b8]
0dd340: ldxdw r1, [r4 + 0x18]
0dd348: stxdw [r10 - 0x428], r1
0dd350: ldxdw r1, [r4 + 0x10]
0dd358: stxdw [r10 - 0x430], r1
0dd360: ldxdw r1, [r4 + 0x8]
0dd368: stxdw [r10 - 0x438], r1
0dd370: ldxdw r1, [r4 + 0x0]
0dd378: stxdw [r10 - 0x440], r1
0dd380: ldxdw r1, [r10 - 0x488]
0dd388: stxdw [r10 - 0x420], r1
0dd390: ldxdw r1, [r10 - 0x480]
0dd398: stxdw [r10 - 0x418], r1
0dd3a0: ldxdw r1, [r10 - 0x478]
0dd3a8: stxdw [r10 - 0x410], r1
0dd3b0: ldxdw r1, [r10 - 0x470]
0dd3b8: stxdw [r10 - 0x408], r1
0dd3c0: mov64 r1, r10
0dd3c8: add64 r1, -0x688
0dd3d0: mov64 r4, r10
0dd3d8: add64 r4, -0x440
0dd3e0: call 0x17dba ; direct target 0x19c1b8
0dd3e8: ldxdw r1, [r10 - 0x688]
0dd3f0: ldxdw r2, [r10 - 0x680]
0dd3f8: ja -0x1a6 ; branch 0xdc6d0
