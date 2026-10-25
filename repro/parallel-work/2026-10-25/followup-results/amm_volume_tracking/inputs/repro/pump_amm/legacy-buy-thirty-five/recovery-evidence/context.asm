0aafd8: mov64 r9, r5
0aafe0: mov64 r7, r3
0aafe8: mov64 r6, r1
0aaff0: stxdw [r10 - 0x660], r2
0aaff8: mov64 r1, r10
0ab000: add64 r1, -0x3b8
0ab008: mov64 r2, r7
0ab010: call -0x135b7 ; call 0x10260
0ab018: ldxb r1, [r10 - 0x29a]
0ab020: jeq r1, 0x2, +0x16 ; branch 0xab0d8
0ab028: lddw r1, 0x300000000
0ab038: ldxdw r1, [r1 + 0x0]
0ab040: mov64 r3, r1
0ab048: add64 r3, -0x120
0ab050: mov64 r2, 0x0
0ab058: mov64 r4, 0x1
0ab060: jgt r3, r1, +0x1 ; branch 0xab070
0ab068: mov64 r4, 0x0
0ab070: jne r4, 0x0, +0x1 ; branch 0xab080
0ab078: mov64 r2, r3
0ab080: lddw r8, 0x300007ee0
0ab090: jeq r1, 0x0, +0x2 ; branch 0xab0a8
0ab098: and64 r2, -0x8
0ab0a0: mov64 r8, r2
0ab0a8: lddw r1, 0x300000007
0ab0b8: jgt r8, r1, +0xe ; branch 0xab130
0ab0c0: mov64 r1, 0x8
0ab0c8: mov64 r2, 0x120
0ab0d0: call 0xcc51 ; call 0x111360
0ab0d8: ldxdw r3, [r10 - 0x3b0]
0ab0e0: ldxdw r2, [r10 - 0x3b8]
0ab0e8: mov64 r1, r10
0ab0f0: add64 r1, -0xb60
0ab0f8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0ab108: mov64 r5, 0x4
0ab110: call -0x15274 ; call 0x1d78
0ab118: ldxdw r1, [r10 - 0xb60]
0ab120: ldxdw r2, [r10 - 0xb58]
0ab128: ja +0x113 ; branch 0xab9c8
0ab130: ldxdw r9, [r9 - 0xff8]
0ab138: lddw r1, 0x300000000
0ab148: stxdw [r1 + 0x0], r8
0ab150: mov64 r2, r10
0ab158: add64 r2, -0x3b8
0ab160: mov64 r1, r8
0ab168: mov64 r3, 0x120
0ab170: call 0xdce4 ; call 0x119898
0ab178: mov64 r1, r10
0ab180: add64 r1, -0x3b8
0ab188: mov64 r2, r7
0ab190: call -0x136e8 ; call 0xfa58
0ab198: ldxdw r3, [r10 - 0x3b0]
0ab1a0: ldxdw r2, [r10 - 0x3b8]
0ab1a8: jeq r2, 0x2, +0x1 ; branch 0xab1b8
0ab1b0: ja +0x1e ; branch 0xab2a8
0ab1b8: stxdw [r10 - 0x658], r3
0ab1c0: mov64 r1, r10
0ab1c8: add64 r1, -0x3b8
0ab1d0: mov64 r2, r7
0ab1d8: call -0x135d9 ; call 0x10318
0ab1e0: ldxb r1, [r10 - 0x4]
0ab1e8: jeq r1, 0x2, +0x20 ; branch 0xab2f0
0ab1f0: lddw r1, 0x300000000
0ab200: ldxdw r5, [r1 + 0x0]
0ab208: mov64 r3, r5
0ab210: add64 r3, -0x3b8
0ab218: mov64 r2, 0x0
0ab220: mov64 r4, 0x1
0ab228: jgt r3, r5, +0x1 ; branch 0xab238
0ab230: mov64 r4, 0x0
0ab238: jne r4, 0x0, +0x1 ; branch 0xab248
0ab240: mov64 r2, r3
0ab248: lddw r1, 0x300007c48
0ab258: jeq r5, 0x0, +0x2 ; branch 0xab270
0ab260: and64 r2, -0x8
0ab268: mov64 r1, r2
0ab270: stxdw [r10 - 0xb68], r9
0ab278: lddw r2, 0x300000007
0ab288: jgt r1, r2, +0x17 ; branch 0xab348
0ab290: mov64 r1, 0x8
0ab298: mov64 r2, 0x3b8
0ab2a0: call 0xcc17 ; call 0x111360
0ab2a8: mov64 r1, r10
0ab2b0: add64 r1, -0x670
0ab2b8: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0ab2c8: mov64 r5, 0x4
0ab2d0: call -0x152ac ; call 0x1d78
0ab2d8: ldxdw r1, [r10 - 0x670]
0ab2e0: ldxdw r2, [r10 - 0x668]
0ab2e8: ja +0xdb ; branch 0xab9c8
0ab2f0: ldxdw r3, [r10 - 0x3b0]
0ab2f8: ldxdw r2, [r10 - 0x3b8]
0ab300: mov64 r1, r10
0ab308: add64 r1, -0xb50
0ab310: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0ab320: mov64 r5, 0xd
0ab328: call -0x152b7 ; call 0x1d78
0ab330: ldxdw r1, [r10 - 0xb50]
0ab338: ldxdw r2, [r10 - 0xb48]
0ab340: ja +0xd0 ; branch 0xab9c8
0ab348: lddw r9, 0x300000000
0ab358: stxdw [r9 + 0x0], r1
0ab360: mov64 r2, r10
0ab368: add64 r2, -0x3b8
0ab370: stxdw [r10 - 0xb70], r1
0ab378: mov64 r3, 0x3b8
0ab380: call 0xdca2 ; call 0x119898
0ab388: mov64 r1, r10
0ab390: add64 r1, -0x3b8
0ab398: mov64 r2, r7
0ab3a0: call -0x15624 ; call 0x288
0ab3a8: ldxw r1, [r10 - 0x3b8]
0ab3b0: jeq r1, 0x2, +0x14 ; branch 0xab458
0ab3b8: ldxdw r5, [r9 + 0x0]
0ab3c0: mov64 r3, r5
0ab3c8: add64 r3, -0x80
0ab3d0: mov64 r2, 0x0
0ab3d8: mov64 r4, 0x1
0ab3e0: jgt r3, r5, +0x1 ; branch 0xab3f0
0ab3e8: mov64 r4, 0x0
0ab3f0: jne r4, 0x0, +0x1 ; branch 0xab400
0ab3f8: mov64 r2, r3
0ab400: lddw r1, 0x300007f80
0ab410: jeq r5, 0x0, +0x2 ; branch 0xab428
0ab418: and64 r2, -0x8
0ab420: mov64 r1, r2
0ab428: lddw r2, 0x300000007
0ab438: jgt r1, r2, +0xe ; branch 0xab4b0
0ab440: mov64 r1, 0x8
0ab448: mov64 r2, 0x80
0ab450: call 0xcbe1 ; call 0x111360
0ab458: ldxdw r3, [r10 - 0x3a8]
0ab460: ldxdw r2, [r10 - 0x3b0]
0ab468: mov64 r1, r10
0ab470: add64 r1, -0xb40
0ab478: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
0ab488: mov64 r5, 0x9
0ab490: call -0x152e4 ; call 0x1d78
0ab498: ldxdw r1, [r10 - 0xb40]
0ab4a0: ldxdw r2, [r10 - 0xb38]
0ab4a8: ja +0xa3 ; branch 0xab9c8
0ab4b0: stxdw [r9 + 0x0], r1
0ab4b8: mov64 r2, r10
0ab4c0: add64 r2, -0x3b8
0ab4c8: stxdw [r10 - 0xb78], r1
0ab4d0: mov64 r3, 0x80
0ab4d8: call 0xdc77 ; call 0x119898
0ab4e0: mov64 r1, r10
0ab4e8: add64 r1, -0x3b8
0ab4f0: mov64 r2, r7
0ab4f8: call -0x1564f ; call 0x288
0ab500: ldxw r1, [r10 - 0x3b8]
0ab508: jeq r1, 0x2, +0x12 ; branch 0xab5a0
0ab510: ldxdw r5, [r9 + 0x0]
0ab518: mov64 r3, r5
0ab520: add64 r3, -0x80
0ab528: mov64 r2, 0x0
0ab530: mov64 r4, 0x1
0ab538: jgt r3, r5, +0x1 ; branch 0xab548
0ab540: mov64 r4, 0x0
0ab548: jne r4, 0x0, +0x1 ; branch 0xab558
0ab550: mov64 r2, r3
0ab558: lddw r1, 0x300007f80
0ab568: jeq r5, 0x0, +0x2 ; branch 0xab580
0ab570: and64 r2, -0x8
0ab578: mov64 r1, r2
0ab580: lddw r2, 0x300000007
0ab590: jgt r1, r2, +0xc ; branch 0xab5f8
0ab598: ja -0x2c ; branch 0xab440
0ab5a0: ldxdw r3, [r10 - 0x3a8]
0ab5a8: ldxdw r2, [r10 - 0x3b0]
0ab5b0: mov64 r1, r10
0ab5b8: add64 r1, -0xb30
0ab5c0: lddw r4, 0x11e1d6 ; rodata b'quote_mintbase_mintauthoritybase_token_programcoin_creator_vault_atacoin_cr'
0ab5d0: mov64 r5, 0xa
0ab5d8: call -0x1530d ; call 0x1d78
0ab5e0: ldxdw r1, [r10 - 0xb30]
0ab5e8: ldxdw r2, [r10 - 0xb28]
0ab5f0: ja +0x7a ; branch 0xab9c8
0ab5f8: stxdw [r9 + 0x0], r1
0ab600: mov64 r2, r10
0ab608: add64 r2, -0x3b8
0ab610: stxdw [r10 - 0xb80], r1
0ab618: mov64 r3, 0x80
0ab620: call 0xdc4e ; call 0x119898
0ab628: mov64 r1, r10
0ab630: add64 r1, -0x3b8
0ab638: mov64 r2, r7
0ab640: call -0x1568f ; call 0x1d0
0ab648: ldxw r1, [r10 - 0x308]
0ab650: jeq r1, 0x2, +0x14 ; branch 0xab6f8
0ab658: ldxdw r1, [r9 + 0x0]
0ab660: mov64 r3, r1
0ab668: add64 r3, -0xd8
0ab670: mov64 r2, 0x0
0ab678: mov64 r4, 0x1
0ab680: jgt r3, r1, +0x1 ; branch 0xab690
0ab688: mov64 r4, 0x0
0ab690: jne r4, 0x0, +0x1 ; branch 0xab6a0
0ab698: mov64 r2, r3
0ab6a0: lddw r9, 0x300007f28
0ab6b0: jeq r1, 0x0, +0x2 ; branch 0xab6c8
0ab6b8: and64 r2, -0x8
0ab6c0: mov64 r9, r2
0ab6c8: lddw r1, 0x300000007
0ab6d8: jgt r9, r1, +0xe ; branch 0xab750
0ab6e0: mov64 r1, 0x8
0ab6e8: mov64 r2, 0xd8
0ab6f0: call 0xcb8d ; call 0x111360
0ab6f8: ldxdw r3, [r10 - 0x3b0]
0ab700: ldxdw r2, [r10 - 0x3b8]
0ab708: mov64 r1, r10
0ab710: add64 r1, -0xb20
0ab718: lddw r4, 0x11e2ed ; rodata b'user_base_token_accountuser_quote_token_accounttoken_2022_programprotocol_f'
0ab728: mov64 r5, 0x17
0ab730: call -0x15338 ; call 0x1d78
0ab738: ldxdw r1, [r10 - 0xb20]
0ab740: ldxdw r2, [r10 - 0xb18]
0ab748: ja +0x4f ; branch 0xab9c8
0ab750: lddw r1, 0x300000000
0ab760: stxdw [r1 + 0x0], r9
0ab768: mov64 r2, r10
0ab770: add64 r2, -0x3b8
0ab778: mov64 r1, r9
0ab780: mov64 r3, 0xd8
0ab788: call 0xdc21 ; call 0x119898
0ab790: mov64 r1, r10
0ab798: add64 r1, -0x3b8
0ab7a0: mov64 r2, r7
0ab7a8: call -0x15134 ; call 0x2e10
0ab7b0: ldxdw r3, [r10 - 0x3b0]
0ab7b8: ldxdw r2, [r10 - 0x3b8]
0ab7c0: jeq r2, 0x2, +0x1 ; branch 0xab7d0
0ab7c8: ja +0x25 ; branch 0xab8f8
0ab7d0: stxdw [r10 - 0xb88], r3
0ab7d8: mov64 r1, r10
0ab7e0: add64 r1, -0x3b8
0ab7e8: mov64 r2, r7
0ab7f0: call -0x1513d ; call 0x2e10
0ab7f8: ldxdw r3, [r10 - 0x3b0]
0ab800: ldxdw r2, [r10 - 0x3b8]
0ab808: jeq r2, 0x2, +0x1 ; branch 0xab818
0ab810: ja +0x25 ; branch 0xab940
0ab818: stxdw [r10 - 0xb90], r3
0ab820: mov64 r1, r10
0ab828: add64 r1, -0x3b8
0ab830: mov64 r2, r7
0ab838: call -0x15146 ; call 0x2e10
0ab840: ldxdw r3, [r10 - 0x3b0]
0ab848: ldxdw r2, [r10 - 0x3b8]
0ab850: jeq r2, 0x2, +0x1 ; branch 0xab860
0ab858: ja +0x25 ; branch 0xab988
0ab860: stxdw [r10 - 0xb98], r3
0ab868: mov64 r1, r10
0ab870: add64 r1, -0x3b8
0ab878: mov64 r2, r7
0ab880: call -0x152a3 ; call 0x2370
0ab888: ldxdw r3, [r10 - 0x3b0]
0ab890: ldxdw r2, [r10 - 0x3b8]
0ab898: ldxb r1, [r10 - 0x38e]
0ab8a0: jeq r1, 0x2, +0x1 ; branch 0xab8b0
0ab8a8: ja +0x29 ; branch 0xab9f8
0ab8b0: mov64 r1, r10
0ab8b8: add64 r1, -0xb10
0ab8c0: lddw r4, 0x11e367 ; rodata b'protocol_fee_recipientuser_in_token_accountuser_out_token_accountbuyback_fe'
0ab8d0: mov64 r5, 0x16
0ab8d8: call -0x1536d ; call 0x1d78
0ab8e0: ldxdw r1, [r10 - 0xb10]
0ab8e8: ldxdw r2, [r10 - 0xb08]
0ab8f0: ja +0x1a ; branch 0xab9c8
0ab8f8: mov64 r1, r10
0ab900: add64 r1, -0x680
0ab908: lddw r4, 0x11e304 ; rodata b'user_quote_token_accounttoken_2022_programprotocol_fee_recipient_token_acco'
0ab918: mov64 r5, 0x18
0ab920: call -0x15376 ; call 0x1d78
0ab928: ldxdw r1, [r10 - 0x680]
0ab930: ldxdw r2, [r10 - 0x678]
0ab938: ja +0x11 ; branch 0xab9c8
0ab940: mov64 r1, r10
0ab948: add64 r1, -0x690
0ab950: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0ab960: mov64 r5, 0x17
0ab968: call -0x1537f ; call 0x1d78
0ab970: ldxdw r1, [r10 - 0x690]
0ab978: ldxdw r2, [r10 - 0x688]
0ab980: ja +0x8 ; branch 0xab9c8
0ab988: mov64 r1, r10
0ab990: add64 r1, -0x6a0
0ab998: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0ab9a8: mov64 r5, 0x18
0ab9b0: call -0x15388 ; call 0x1d78
0ab9b8: ldxdw r1, [r10 - 0x6a0]
0ab9c0: ldxdw r2, [r10 - 0x698]
0ab9c8: stxdw [r6 + 0x10], r2
0ab9d0: stxdw [r6 + 0x8], r1
0ab9d8: lddw r1, -0x8000000000000000
0ab9e8: stxdw [r6 + 0x0], r1
0ab9f0: exit
0ab9f8: ldxh r4, [r10 - 0x390]
0aba00: stxh [r10 - 0x628], r4
0aba08: ldxdw r4, [r10 - 0x398]
0aba10: stxdw [r10 - 0x630], r4
0aba18: ldxdw r4, [r10 - 0x3a0]
0aba20: stxdw [r10 - 0x638], r4
0aba28: ldxdw r4, [r10 - 0x3a8]
0aba30: stxdw [r10 - 0x640], r4
0aba38: ldxw r4, [r10 - 0x38d]
0aba40: stxw [r10 - 0x625], r4
0aba48: ldxb r4, [r10 - 0x389]
0aba50: stxb [r10 - 0x621], r4
0aba58: stxb [r10 - 0x626], r1
0aba60: stxdw [r10 - 0x648], r3
0aba68: stxdw [r10 - 0x650], r2
0aba70: ldxdw r1, [r7 + 0x8]
0aba78: jeq r1, 0x0, +0x40 ; branch 0xabc80
0aba80: ldxdw r2, [r7 + 0x0]
0aba88: stxdw [r10 - 0x620], r2
0aba90: add64 r1, -0x1
0aba98: stxdw [r7 + 0x8], r1
0abaa0: add64 r2, 0x30
0abaa8: stxdw [r7 + 0x0], r2
0abab0: mov64 r1, r10
0abab8: add64 r1, -0x3b8
0abac0: mov64 r2, r7
0abac8: call -0x15736 ; call 0x120
0abad0: ldxdw r3, [r10 - 0x3b0]
0abad8: ldxdw r2, [r10 - 0x3b8]
0abae0: jne r2, 0x2, +0x41 ; branch 0xabcf0
0abae8: stxdw [r10 - 0xba0], r3
0abaf0: mov64 r1, r10
0abaf8: add64 r1, -0x3b8
0abb00: mov64 r2, r7
0abb08: call -0x1573e ; call 0x120
0abb10: ldxdw r3, [r10 - 0x3b0]
0abb18: ldxdw r2, [r10 - 0x3b8]
0abb20: jeq r2, 0x2, +0x1 ; branch 0xabb30
0abb28: ja +0x41 ; branch 0xabd38
0abb30: stxdw [r10 - 0x618], r3
0abb38: mov64 r1, r10
0abb40: add64 r1, -0x3b8
0abb48: mov64 r2, r7
0abb50: call -0x13601 ; call 0x10b50
0abb58: ldxdw r3, [r10 - 0x3b0]
0abb60: ldxdw r2, [r10 - 0x3b8]
0abb68: jeq r2, 0x2, +0x1 ; branch 0xabb78
0abb70: ja +0x41 ; branch 0xabd80
0abb78: stxdw [r10 - 0x610], r3
0abb80: mov64 r1, r10
0abb88: add64 r1, -0x3b8
0abb90: mov64 r2, r7
0abb98: call -0x13653 ; call 0x10908
0abba0: ldxdw r3, [r10 - 0x3b0]
0abba8: ldxdw r2, [r10 - 0x3b8]
0abbb0: jeq r2, 0x2, +0x1 ; branch 0xabbc0
0abbb8: ja +0x41 ; branch 0xabdc8
0abbc0: stxdw [r10 - 0x608], r3
0abbc8: mov64 r1, r10
0abbd0: add64 r1, -0x3b8
0abbd8: mov64 r2, r7
0abbe0: call -0x1530f ; call 0x2370
0abbe8: ldxdw r1, [r10 - 0x3b0]
0abbf0: stxdw [r10 - 0xba8], r1
0abbf8: ldxdw r1, [r10 - 0x3b8]
0abc00: stxdw [r10 - 0xbb0], r1
0abc08: ldxb r1, [r10 - 0x38e]
0abc10: stxdw [r10 - 0xbc0], r1
0abc18: jeq r1, 0x2, +0x1 ; branch 0xabc28
0abc20: ja +0x52 ; branch 0xabeb8
0abc28: mov64 r1, r10
0abc30: add64 r1, -0xaf0
0abc38: ldxdw r2, [r10 - 0xbb0]
0abc40: ldxdw r3, [r10 - 0xba8]
0abc48: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0abc58: mov64 r5, 0xf
0abc60: call -0x153de ; call 0x1d78
0abc68: ldxdw r1, [r10 - 0xaf0]
0abc70: ldxdw r2, [r10 - 0xae8]
0abc78: ja +0x31 ; branch 0xabe08
0abc80: mov64 r1, r10
0abc88: add64 r1, -0xb00
0abc90: mov64 r2, 0xbbd
0abc98: mov64 r7, r3
0abca0: call 0xb432 ; call 0x105e38
0abca8: mov64 r3, r7
0abcb0: ldxdw r1, [r10 - 0xb00]
0abcb8: ldxdw r2, [r10 - 0xaf8]
0abcc0: stxdw [r6 + 0x10], r2
0abcc8: stxdw [r6 + 0x8], r1
0abcd0: lddw r1, -0x8000000000000000
0abce0: stxdw [r6 + 0x0], r1
0abce8: ja +0x29 ; branch 0xabe38
0abcf0: mov64 r1, r10
0abcf8: add64 r1, -0x6b0
0abd00: lddw r4, 0x11e1f2 ; rodata b'base_token_programcoin_creator_vault_atacoin_creator_token_accountcoin_crea'
0abd10: mov64 r5, 0x12
0abd18: call -0x153f5 ; call 0x1d78
0abd20: ldxdw r1, [r10 - 0x6b0]
0abd28: ldxdw r2, [r10 - 0x6a8]
0abd30: ja +0x1a ; branch 0xabe08
0abd38: mov64 r1, r10
0abd40: add64 r1, -0x6c0
0abd48: lddw r4, 0x11e1ac ; rodata b'quote_token_programpool_base_token_accountquote_mintbase_mintauthoritybase_'
0abd58: mov64 r5, 0x13
0abd60: call -0x153fe ; call 0x1d78
0abd68: ldxdw r1, [r10 - 0x6c0]
0abd70: ldxdw r2, [r10 - 0x6b8]
0abd78: ja +0x11 ; branch 0xabe08
0abd80: mov64 r1, r10
0abd88: add64 r1, -0x6d0
0abd90: lddw r4, 0x11e0d1 ; rodata b'system_programglobal_incentive_token_accountadmintoken_programassociated_to'
0abda0: mov64 r5, 0xe
0abda8: call -0x15407 ; call 0x1d78
0abdb0: ldxdw r1, [r10 - 0x6d0]
0abdb8: ldxdw r2, [r10 - 0x6c8]
0abdc0: ja +0x8 ; branch 0xabe08
0abdc8: mov64 r1, r10
0abdd0: add64 r1, -0x6e0
0abdd8: lddw r4, 0x11e10f ; rodata b'associated_token_programprograms/pump-amm/src/instructions/admin/create_con'
0abde8: mov64 r5, 0x18
0abdf0: call -0x15410 ; call 0x1d78
0abdf8: ldxdw r1, [r10 - 0x6e0]
0abe00: ldxdw r2, [r10 - 0x6d8]
0abe08: stxdw [r6 + 0x10], r2
0abe10: stxdw [r6 + 0x8], r1
0abe18: lddw r1, -0x8000000000000000
0abe28: stxdw [r6 + 0x0], r1
0abe30: ldxdw r3, [r10 - 0x648]
0abe38: ldxdw r2, [r3 + 0x0]
0abe40: add64 r2, -0x1
0abe48: ldxdw r1, [r10 - 0x640]
0abe50: stxdw [r3 + 0x0], r2
0abe58: jne r2, 0x0, +0x3 ; branch 0xabe78
0abe60: ldxdw r2, [r3 + 0x8]
0abe68: add64 r2, -0x1
0abe70: stxdw [r3 + 0x8], r2
0abe78: ldxdw r2, [r1 + 0x0]
0abe80: add64 r2, -0x1
0abe88: stxdw [r1 + 0x0], r2
0abe90: jne r2, 0x0, -0x95 ; branch 0xab9f0
0abe98: ldxdw r2, [r1 + 0x8]
0abea0: add64 r2, -0x1
0abea8: stxdw [r1 + 0x8], r2
0abeb0: ja -0x99 ; branch 0xab9f0
0abeb8: ldxdw r1, [r10 - 0x3a0]
0abec0: stxdw [r10 - 0x5f8], r1
0abec8: ldxdw r1, [r10 - 0x398]
0abed0: stxdw [r10 - 0x5f0], r1
0abed8: ldxh r1, [r10 - 0x390]
0abee0: stxh [r10 - 0x5e8], r1
0abee8: ldxw r1, [r10 - 0x38d]
0abef0: stxw [r10 - 0x600], r1
0abef8: ldxb r1, [r10 - 0x389]
0abf00: stxb [r10 - 0x5fc], r1
0abf08: ldxdw r1, [r10 - 0x3a8]
0abf10: stxdw [r10 - 0xbb8], r1
0abf18: mov64 r1, r10
0abf20: add64 r1, -0x3b8
0abf28: mov64 r2, r7
0abf30: call -0x13638 ; call 0x10d78
0abf38: ldxdw r1, [r10 - 0x3b0]
0abf40: stxdw [r10 - 0xbc8], r1
0abf48: ldxdw r2, [r10 - 0x3b8]
0abf50: jeq r2, 0x2, +0x1 ; branch 0xabf60
0abf58: ja +0x65 ; branch 0xac288
0abf60: ldxdw r1, [r7 + 0x8]
0abf68: jeq r1, 0x0, +0x6d ; branch 0xac2d8
0abf70: ldxdw r2, [r7 + 0x0]
0abf78: stxdw [r10 - 0x5e0], r2
0abf80: add64 r1, -0x1
0abf88: stxdw [r7 + 0x8], r1
0abf90: add64 r2, 0x30
0abf98: stxdw [r7 + 0x0], r2
0abfa0: mov64 r1, r10
0abfa8: add64 r1, -0x3b8
0abfb0: mov64 r2, r7
0abfb8: call -0x1538a ; call 0x2370
0abfc0: ldxdw r3, [r10 - 0x3b0]
0abfc8: ldxdw r2, [r10 - 0x3b8]
0abfd0: ldxb r1, [r10 - 0x38e]
0abfd8: jeq r1, 0x2, +0x66 ; branch 0xac310
0abfe0: ldxh r4, [r10 - 0x390]
0abfe8: stxh [r10 - 0x5b0], r4
0abff0: ldxdw r4, [r10 - 0x398]
0abff8: stxdw [r10 - 0x5b8], r4
0ac000: ldxdw r4, [r10 - 0x3a0]
0ac008: stxdw [r10 - 0x5c0], r4
0ac010: ldxdw r4, [r10 - 0x3a8]
0ac018: stxdw [r10 - 0x5c8], r4
0ac020: ldxw r4, [r10 - 0x38d]
0ac028: stxw [r10 - 0x5ad], r4
0ac030: ldxb r4, [r10 - 0x389]
0ac038: stxb [r10 - 0x5a9], r4
0ac040: stxb [r10 - 0x5ae], r1
0ac048: stxdw [r10 - 0x5d0], r3
0ac050: stxdw [r10 - 0x5d8], r2
0ac058: mov64 r1, r10
0ac060: add64 r1, -0x3b8
0ac068: mov64 r2, r7
0ac070: call -0x151f3 ; call 0x30e0
0ac078: ldxdw r1, [r10 - 0x3b0]
0ac080: stxdw [r10 - 0xbd0], r1
0ac088: ldxdw r2, [r10 - 0x3b8]
0ac090: jeq r2, 0x2, +0x1 ; branch 0xac0a0
0ac098: ja +0x6e ; branch 0xac410
0ac0a0: ldxdw r1, [r7 + 0x8]
0ac0a8: jeq r1, 0x0, +0x76 ; branch 0xac460
0ac0b0: ldxdw r2, [r7 + 0x0]
0ac0b8: stxdw [r10 - 0x5a8], r2
0ac0c0: add64 r1, -0x1
0ac0c8: stxdw [r7 + 0x8], r1
0ac0d0: add64 r2, 0x30
0ac0d8: stxdw [r7 + 0x0], r2
0ac0e0: mov64 r1, r10
0ac0e8: add64 r1, -0x3b8
0ac0f0: mov64 r2, r7
0ac0f8: call -0x137a6 ; call 0x103d0
0ac100: ldxdw r1, [r10 - 0x3a8]
0ac108: stxdw [r10 - 0xbd8], r1
0ac110: ldxdw r1, [r10 - 0x3b0]
0ac118: stxdw [r10 - 0xbe0], r1
0ac120: ldxdw r1, [r10 - 0x3b8]
0ac128: lddw r2, -0x8000000000000000
0ac138: stxdw [r10 - 0xbe8], r1
0ac140: jeq r1, r2, +0x6a ; branch 0xac498
0ac148: ldxdw r1, [r10 - 0x398]
0ac150: stxdw [r10 - 0xc08], r1
0ac158: ldxdw r1, [r10 - 0x3a0]
0ac160: stxdw [r10 - 0xc00], r1
0ac168: mov64 r1, r10
0ac170: add64 r1, -0x5a0
0ac178: mov64 r2, r10
0ac180: add64 r2, -0x390
0ac188: mov64 r3, 0x60
0ac190: call 0xdae0 ; call 0x119898
0ac198: ldxdw r1, [r10 - 0x330]
0ac1a0: stxdw [r10 - 0xbf8], r1
0ac1a8: mov64 r1, r10
0ac1b0: add64 r1, -0x3b8
0ac1b8: mov64 r2, r7
0ac1c0: call -0x13641 ; call 0x10fc0
0ac1c8: ldxdw r1, [r10 - 0x3b0]
0ac1d0: stxdw [r10 - 0xbf0], r1
0ac1d8: ldxdw r2, [r10 - 0x3b8]
0ac1e0: jeq r2, 0x2, +0x1 ; branch 0xac1f0
0ac1e8: ja +0x60 ; branch 0xac4f0
0ac1f0: mov64 r1, r10
0ac1f8: add64 r1, -0x3b8
0ac200: call 0xb5a3 ; call 0x106f20
0ac208: ldxdw r1, [r10 - 0x3b0]
0ac210: stxdw [r10 - 0x528], r1
0ac218: ldxdw r1, [r10 - 0x3a8]
0ac220: stxdw [r10 - 0x520], r1
0ac228: ldxdw r1, [r10 - 0x3a0]
0ac230: stxdw [r10 - 0x518], r1
0ac238: ldxdw r1, [r10 - 0x3b8]
0ac240: jeq r1, 0x0, +0x74 ; branch 0xac5e8
0ac248: mov64 r1, r10
0ac250: add64 r1, -0x720
0ac258: mov64 r2, r10
0ac260: add64 r2, -0x528
0ac268: call 0xadba ; call 0x103040
0ac270: ldxdw r1, [r10 - 0x720]
0ac278: ldxdw r2, [r10 - 0x718]
0ac280: ja +0x56 ; branch 0xac538
0ac288: mov64 r1, r10
0ac290: add64 r1, -0x6f0
0ac298: ldxdw r3, [r10 - 0xbc8]
0ac2a0: lddw r4, 0x11e0ca ; rodata b'programsystem_programglobal_incentive_token_accountadmintoken_programassoci'
0ac2b0: mov64 r5, 0x7
0ac2b8: call -0x154a9 ; call 0x1d78
0ac2c0: ldxdw r1, [r10 - 0x6f0]
0ac2c8: ldxdw r2, [r10 - 0x6e8]
0ac2d0: ja +0xf ; branch 0xac350
0ac2d8: mov64 r1, r10
0ac2e0: add64 r1, -0xae0
0ac2e8: mov64 r2, 0xbbd
0ac2f0: call 0xb368 ; call 0x105e38
0ac2f8: ldxdw r1, [r10 - 0xae0]
0ac300: ldxdw r2, [r10 - 0xad8]
0ac308: ja +0x8 ; branch 0xac350
0ac310: mov64 r1, r10
0ac318: add64 r1, -0xad0
0ac320: lddw r4, 0x11e234 ; rodata b'coin_creator_vault_authoritycoin_creatorsharing-configsharing_configbonding'
0ac330: mov64 r5, 0x1c
0ac338: call -0x154b9 ; call 0x1d78
0ac340: ldxdw r1, [r10 - 0xad0]
0ac348: ldxdw r2, [r10 - 0xac8]
0ac350: stxdw [r6 + 0x10], r2
0ac358: stxdw [r6 + 0x8], r1
0ac360: lddw r1, -0x8000000000000000
0ac370: stxdw [r6 + 0x0], r1
0ac378: ldxdw r2, [r10 - 0xba8]
0ac380: ldxdw r1, [r2 + 0x0]
0ac388: add64 r1, -0x1
0ac390: stxdw [r2 + 0x0], r1
0ac398: jne r1, 0x0, +0x4 ; branch 0xac3c0
0ac3a0: ldxdw r9, [r10 - 0xba8]
0ac3a8: ldxdw r1, [r9 + 0x8]
0ac3b0: add64 r1, -0x1
0ac3b8: stxdw [r9 + 0x8], r1
0ac3c0: ldxdw r2, [r10 - 0xbb8]
0ac3c8: ldxdw r1, [r2 + 0x0]
0ac3d0: add64 r1, -0x1
0ac3d8: stxdw [r2 + 0x0], r1
0ac3e0: jne r1, 0x0, -0xb7 ; branch 0xabe30
0ac3e8: ldxdw r2, [r10 - 0xbb8]
0ac3f0: ldxdw r1, [r2 + 0x8]
0ac3f8: add64 r1, -0x1
0ac400: stxdw [r2 + 0x8], r1
0ac408: ja -0xbc ; branch 0xabe30
0ac410: mov64 r1, r10
0ac418: add64 r1, -0x700
0ac420: ldxdw r3, [r10 - 0xbd0]
0ac428: lddw r4, 0x11ce27 ; rodata b'global_volume_accumulatorprograms/pump-amm/src/instructions/token_incentive'
0ac438: mov64 r5, 0x19
0ac440: call -0x154da ; call 0x1d78
0ac448: ldxdw r1, [r10 - 0x700]
0ac450: ldxdw r2, [r10 - 0x6f8]
0ac458: ja +0x1b ; branch 0xac538
0ac460: mov64 r1, r10
0ac468: add64 r1, -0xac0
0ac470: mov64 r2, 0xbbd
0ac478: call 0xb337 ; call 0x105e38
0ac480: ldxdw r1, [r10 - 0xac0]
0ac488: ldxdw r2, [r10 - 0xab8]
0ac490: ja +0x14 ; branch 0xac538
0ac498: mov64 r1, r10
0ac4a0: add64 r1, -0xab0
0ac4a8: ldxdw r2, [r10 - 0xbe0]
0ac4b0: ldxdw r3, [r10 - 0xbd8]
0ac4b8: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0ac4c8: mov64 r5, 0xa
0ac4d0: call -0x154ec ; call 0x1d78
0ac4d8: ldxdw r1, [r10 - 0xab0]
0ac4e0: ldxdw r2, [r10 - 0xaa8]
0ac4e8: ja +0x9 ; branch 0xac538
0ac4f0: mov64 r1, r10
0ac4f8: add64 r1, -0x710
0ac500: ldxdw r3, [r10 - 0xbf0]
0ac508: lddw r4, 0x11e35c ; rodata b'fee_programprotocol_fee_recipientuser_in_token_accountuser_out_token_accoun'
0ac518: mov64 r5, 0xb
0ac520: call -0x154f6 ; call 0x1d78
0ac528: ldxdw r1, [r10 - 0x710]
0ac530: ldxdw r2, [r10 - 0x708]
0ac538: stxdw [r6 + 0x10], r2
0ac540: stxdw [r6 + 0x8], r1
0ac548: lddw r1, -0x8000000000000000
0ac558: stxdw [r6 + 0x0], r1
0ac560: ldxdw r1, [r10 - 0x5c8]
0ac568: ldxdw r2, [r10 - 0x5d0]
0ac570: ldxdw r3, [r2 + 0x0]
0ac578: add64 r3, -0x1
0ac580: stxdw [r2 + 0x0], r3
0ac588: jne r3, 0x0, +0x3 ; branch 0xac5a8
0ac590: ldxdw r3, [r2 + 0x8]
0ac598: add64 r3, -0x1
0ac5a0: stxdw [r2 + 0x8], r3
0ac5a8: ldxdw r2, [r1 + 0x0]
0ac5b0: add64 r2, -0x1
0ac5b8: stxdw [r1 + 0x0], r2
0ac5c0: jne r2, 0x0, -0x4a ; branch 0xac378
0ac5c8: ldxdw r2, [r1 + 0x8]
0ac5d0: add64 r2, -0x1
0ac5d8: stxdw [r1 + 0x8], r2
0ac5e0: ja -0x4e ; branch 0xac378
0ac5e8: ldxdw r1, [r10 - 0x518]
0ac5f0: stxdw [r10 - 0x530], r1
0ac5f8: ldxdw r1, [r10 - 0x520]
0ac600: stxdw [r10 - 0x538], r1
0ac608: ldxdw r1, [r10 - 0x528]
0ac610: stxdw [r10 - 0x540], r1
0ac618: mov64 r1, r10
0ac620: add64 r1, -0x618
0ac628: stxdw [r10 - 0x388], r1
0ac630: mov64 r1, r10
0ac638: add64 r1, -0x610
0ac640: stxdw [r10 - 0x390], r1
0ac648: ldxdw r1, [r10 - 0xb80]
0ac650: stxdw [r10 - 0x398], r1
0ac658: mov64 r1, r10
0ac660: add64 r1, -0x650
0ac668: stxdw [r10 - 0x3a0], r1
0ac670: mov64 r1, r10
0ac678: add64 r1, -0x658
0ac680: stxdw [r10 - 0x3a8], r1
0ac688: mov64 r1, r10
0ac690: add64 r1, -0x608
0ac698: stxdw [r10 - 0x3b0], r1
0ac6a0: mov64 r1, r10
0ac6a8: add64 r1, -0x620
0ac6b0: stxdw [r10 - 0x3b8], r1
0ac6b8: mov64 r1, r10
0ac6c0: add64 r1, -0x488
0ac6c8: mov64 r2, r10
0ac6d0: add64 r2, -0x3b8
0ac6d8: call 0x2d5b ; call 0xc31b8
0ac6e0: ldxdw r1, [r10 - 0x480]
0ac6e8: stxdw [r10 - 0xc10], r1
0ac6f0: ldxdw r1, [r10 - 0x488]
0ac6f8: jeq r1, 0x2, +0x1 ; branch 0xac708
0ac700: ja +0x120 ; branch 0xad008
0ac708: ldxdw r1, [r10 - 0xc10]
0ac710: ldxdw r2, [r1 + 0x20]
0ac718: ldxb r1, [r2 + 0x29]
0ac720: jeq r1, 0x0, +0x11e ; branch 0xad018
0ac728: mov64 r7, r10
0ac730: add64 r7, -0x488
0ac738: mov64 r1, r7
0ac740: call -0x13cba ; call 0xe178
0ac748: mov64 r1, r7
0ac750: call 0xb8ef ; call 0x108ed0
0ac758: stxdw [r10 - 0xc18], r0
0ac760: ldxdw r1, [r10 - 0xc10]
0ac768: ldxdw r2, [r1 + 0x20]
0ac770: mov64 r7, r10
0ac778: add64 r7, -0x3b8
0ac780: mov64 r1, r7
0ac788: call -0x13cc3 ; call 0xe178
0ac790: mov64 r1, r10
0ac798: add64 r1, -0x3d8
0ac7a0: mov64 r2, r7
0ac7a8: call 0xb8fd ; call 0x108f98
0ac7b0: ldxdw r3, [r10 - 0x3d0]
0ac7b8: ldxdw r1, [r10 - 0x3d8]
0ac7c0: lddw r2, -0x7fffffffffffffe6
0ac7d0: jne r1, r2, +0x117 ; branch 0xad090
0ac7d8: mov64 r1, r10
0ac7e0: add64 r1, -0x540
0ac7e8: ldxdw r2, [r10 - 0xc18]
0ac7f0: call 0xb530 ; call 0x107178
0ac7f8: ldxdw r1, [r10 - 0x3a8]
0ac800: ldxdw r2, [r10 - 0x3b0]
0ac808: ldxdw r3, [r2 + 0x0]
0ac810: add64 r3, -0x1
0ac818: stxdw [r2 + 0x0], r3
0ac820: jne r3, 0x0, +0x3 ; branch 0xac840
0ac828: ldxdw r3, [r2 + 0x8]
0ac830: add64 r3, -0x1
0ac838: stxdw [r2 + 0x8], r3
0ac840: ldxdw r2, [r1 + 0x0]
0ac848: add64 r2, -0x1
0ac850: stxdw [r1 + 0x0], r2
0ac858: jne r2, 0x0, +0x3 ; branch 0xac878
0ac860: ldxdw r2, [r1 + 0x8]
0ac868: add64 r2, -0x1
0ac870: stxdw [r1 + 0x8], r2
0ac878: ldxdw r1, [r10 - 0x478]
0ac880: ldxdw r2, [r10 - 0x480]
0ac888: ldxdw r3, [r2 + 0x0]
0ac890: add64 r3, -0x1
0ac898: stxdw [r2 + 0x0], r3
0ac8a0: jne r3, 0x0, +0x3 ; branch 0xac8c0
0ac8a8: ldxdw r3, [r2 + 0x8]
0ac8b0: add64 r3, -0x1
0ac8b8: stxdw [r2 + 0x8], r3
0ac8c0: ldxdw r2, [r1 + 0x0]
0ac8c8: add64 r2, -0x1
0ac8d0: stxdw [r1 + 0x0], r2
0ac8d8: jne r2, 0x0, +0x3 ; branch 0xac8f8
0ac8e0: ldxdw r2, [r1 + 0x8]
0ac8e8: add64 r2, -0x1
0ac8f0: stxdw [r1 + 0x8], r2
0ac8f8: jne r0, 0x0, +0x1 ; branch 0xac908
0ac900: ja +0x122 ; branch 0xad218
0ac908: mov64 r1, r10
0ac910: add64 r1, -0x3b8
0ac918: call 0xb4c0 ; call 0x106f20
0ac920: ldxdw r1, [r10 - 0x3b0]
0ac928: stxdw [r10 - 0x4f8], r1
0ac930: ldxdw r1, [r10 - 0x3a8]
0ac938: stxdw [r10 - 0x4f0], r1
0ac940: ldxdw r1, [r10 - 0x3a0]
0ac948: stxdw [r10 - 0x4e8], r1
0ac950: ldxdw r1, [r10 - 0x3b8]
0ac958: jne r1, 0x0, +0x126 ; branch 0xad290
0ac960: ldxdw r1, [r10 - 0x4e8]
0ac968: stxdw [r10 - 0x500], r1
0ac970: ldxdw r1, [r10 - 0x4f0]
0ac978: stxdw [r10 - 0x508], r1
0ac980: ldxdw r1, [r10 - 0x4f8]
0ac988: stxdw [r10 - 0x510], r1
0ac990: mov64 r1, r10
0ac998: add64 r1, -0x618
0ac9a0: stxdw [r10 - 0x388], r1
0ac9a8: mov64 r1, r10
0ac9b0: add64 r1, -0x610
0ac9b8: stxdw [r10 - 0x390], r1
0ac9c0: ldxdw r1, [r10 - 0xb80]
0ac9c8: stxdw [r10 - 0x398], r1
0ac9d0: mov64 r1, r10
0ac9d8: add64 r1, -0x5d8
0ac9e0: stxdw [r10 - 0x3a0], r1
0ac9e8: mov64 r1, r10
0ac9f0: add64 r1, -0x658
0ac9f8: stxdw [r10 - 0x3a8], r1
0aca00: mov64 r1, r10
0aca08: add64 r1, -0x608
0aca10: stxdw [r10 - 0x3b0], r1
0aca18: mov64 r1, r10
0aca20: add64 r1, -0x5e0
0aca28: stxdw [r10 - 0x3b8], r1
0aca30: mov64 r1, r10
0aca38: add64 r1, -0x488
0aca40: mov64 r2, r10
0aca48: add64 r2, -0x3b8
0aca50: call 0x2f9b ; call 0xc4730
0aca58: ldxdw r1, [r10 - 0x480]
0aca60: stxdw [r10 - 0xc18], r1
0aca68: ldxdw r1, [r10 - 0x488]
0aca70: jeq r1, 0x2, +0x1 ; branch 0xaca80
0aca78: ja +0x10a ; branch 0xad2d0
0aca80: ldxdw r1, [r10 - 0xc18]
0aca88: ldxdw r2, [r1 + 0x20]
0aca90: ldxb r1, [r2 + 0x29]
0aca98: jeq r1, 0x0, +0x108 ; branch 0xad2e0
0acaa0: mov64 r7, r10
0acaa8: add64 r7, -0x488
0acab0: mov64 r1, r7
0acab8: call -0x13d29 ; call 0xe178
0acac0: mov64 r1, r7
0acac8: call 0xb880 ; call 0x108ed0
0acad0: stxdw [r10 - 0xc20], r0
0acad8: ldxdw r1, [r10 - 0xc18]
0acae0: ldxdw r2, [r1 + 0x20]
0acae8: mov64 r7, r10
0acaf0: add64 r7, -0x3b8
0acaf8: mov64 r1, r7
0acb00: call -0x13d32 ; call 0xe178
0acb08: mov64 r1, r10
0acb10: add64 r1, -0x3d8
0acb18: mov64 r2, r7
0acb20: call 0xb88e ; call 0x108f98
0acb28: ldxdw r3, [r10 - 0x3d0]
0acb30: ldxdw r1, [r10 - 0x3d8]
0acb38: lddw r2, -0x7fffffffffffffe6
0acb48: jne r1, r2, +0x101 ; branch 0xad358
0acb50: mov64 r1, r10
0acb58: add64 r1, -0x510
0acb60: ldxdw r2, [r10 - 0xc20]
0acb68: call 0xb4c1 ; call 0x107178
0acb70: ldxdw r1, [r10 - 0x3a8]
0acb78: ldxdw r2, [r10 - 0x3b0]
0acb80: ldxdw r3, [r2 + 0x0]
0acb88: add64 r3, -0x1
0acb90: stxdw [r2 + 0x0], r3
0acb98: jne r3, 0x0, +0x3 ; branch 0xacbb8
0acba0: ldxdw r3, [r2 + 0x8]
0acba8: add64 r3, -0x1
0acbb0: stxdw [r2 + 0x8], r3
0acbb8: ldxdw r2, [r1 + 0x0]
0acbc0: add64 r2, -0x1
0acbc8: stxdw [r1 + 0x0], r2
0acbd0: jne r2, 0x0, +0x3 ; branch 0xacbf0
0acbd8: ldxdw r2, [r1 + 0x8]
0acbe0: add64 r2, -0x1
0acbe8: stxdw [r1 + 0x8], r2
0acbf0: ldxdw r1, [r10 - 0x478]
0acbf8: ldxdw r2, [r10 - 0x480]
0acc00: ldxdw r3, [r2 + 0x0]
0acc08: add64 r3, -0x1
0acc10: stxdw [r2 + 0x0], r3
0acc18: jne r3, 0x0, +0x3 ; branch 0xacc38
0acc20: ldxdw r3, [r2 + 0x8]
0acc28: add64 r3, -0x1
0acc30: stxdw [r2 + 0x8], r3
0acc38: ldxdw r2, [r1 + 0x0]
0acc40: add64 r2, -0x1
0acc48: stxdw [r1 + 0x0], r2
0acc50: jne r2, 0x0, +0x3 ; branch 0xacc70
0acc58: ldxdw r2, [r1 + 0x8]
0acc60: add64 r2, -0x1
0acc68: stxdw [r1 + 0x8], r2
0acc70: jne r0, 0x0, +0x1 ; branch 0xacc80
0acc78: ja +0x109 ; branch 0xad4c8
0acc80: mov64 r1, r10
0acc88: add64 r1, -0x3b8
0acc90: call 0xb451 ; call 0x106f20
0acc98: ldxdw r1, [r10 - 0x3b0]
0acca0: stxdw [r10 - 0x4c8], r1
0acca8: ldxdw r1, [r10 - 0x3a8]
0accb0: stxdw [r10 - 0x4c0], r1
0accb8: ldxdw r1, [r10 - 0x3a0]
0accc0: stxdw [r10 - 0x4b8], r1
0accc8: ldxdw r1, [r10 - 0x3b8]
0accd0: jne r1, 0x0, +0x10d ; branch 0xad540
0accd8: ldxdw r1, [r10 - 0x4b8]
0acce0: stxdw [r10 - 0x4d0], r1
0acce8: ldxdw r1, [r10 - 0x4c0]
0accf0: stxdw [r10 - 0x4d8], r1
0accf8: ldxdw r1, [r10 - 0x4c8]
0acd00: stxdw [r10 - 0x4e0], r1
0acd08: ldxdw r1, [r10 - 0x658]
0acd10: ldxdw r1, [r1 + 0x0]
0acd18: ldxdw r2, [r1 + 0x18]
0acd20: ldxdw r3, [r1 + 0x10]
0acd28: ldxdw r4, [r1 + 0x8]
0acd30: ldxdw r1, [r1 + 0x0]
0acd38: lddw r5, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0acd48: stxdw [r10 - 0x3d8], r5
0acd50: mov64 r5, r10
0acd58: add64 r5, -0x488
0acd60: stxdw [r10 - 0x3c8], r5
0acd68: stxdw [r10 - 0x488], r1
0acd70: stxdw [r10 - 0x480], r4
0acd78: stxdw [r10 - 0x478], r3
0acd80: stxdw [r10 - 0x470], r2
0acd88: stdw [r10 - 0x3d0], 0x17
0acd90: stdw [r10 - 0x3c0], 0x20
0acd98: ldxdw r4, [r10 - 0x660]
0acda0: mov64 r1, r10
0acda8: add64 r1, -0x3b8
0acdb0: mov64 r2, r10
0acdb8: add64 r2, -0x3d8
0acdc0: mov64 r3, 0x2
0acdc8: call 0xc253 ; call 0x10e068
0acdd0: ldxdw r1, [r10 - 0x3a0]
0acdd8: stxdw [r10 - 0x498], r1
0acde0: ldxdw r1, [r10 - 0x3a8]
0acde8: stxdw [r10 - 0x4a0], r1
0acdf0: ldxdw r1, [r10 - 0x3b0]
0acdf8: stxdw [r10 - 0x4a8], r1
0ace00: ldxdw r1, [r10 - 0x3b8]
0ace08: stxdw [r10 - 0x4b0], r1
0ace10: ldxb r1, [r10 - 0x398]
0ace18: stxb [r10 - 0x489], r1
0ace20: ldxdw r2, [r10 - 0xb68]
0ace28: stxb [r2 + 0x3], r1
0ace30: ldxdw r1, [r10 - 0x5a8]
0ace38: ldxdw r1, [r1 + 0x0]
0ace40: ldxdw r2, [r1 + 0x0]
0ace48: stxdw [r10 - 0x3b8], r2
0ace50: ldxdw r2, [r1 + 0x8]
0ace58: stxdw [r10 - 0x3b0], r2
0ace60: ldxdw r2, [r1 + 0x10]
0ace68: stxdw [r10 - 0x3a8], r2
0ace70: ldxdw r1, [r1 + 0x18]
0ace78: stxdw [r10 - 0x3a0], r1
0ace80: mov64 r1, r10
0ace88: add64 r1, -0x3b8
0ace90: mov64 r2, r10
0ace98: add64 r2, -0x4b0
0acea0: mov64 r3, 0x20
0acea8: call 0xd946 ; call 0x1198e0
0aceb0: lsh64 r0, 0x20
0aceb8: rsh64 r0, 0x20
0acec0: jeq r0, 0x0, +0xd7 ; branch 0xad580
0acec8: mov64 r1, r10
0aced0: add64 r1, -0x7b0
0aced8: mov64 r2, 0x7d6
0acee0: call 0xb1ea ; call 0x105e38
0acee8: ldxdw r3, [r10 - 0x7a8]
0acef0: ldxdw r2, [r10 - 0x7b0]
0acef8: mov64 r1, r10
0acf00: add64 r1, -0x7c0
0acf08: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0acf18: mov64 r5, 0x17
0acf20: call -0x15636 ; call 0x1d78
0acf28: ldxdw r3, [r10 - 0x7b8]
0acf30: ldxdw r2, [r10 - 0x7c0]
0acf38: ldxdw r1, [r10 - 0x5a8]
0acf40: ldxdw r1, [r1 + 0x0]
0acf48: ldxdw r4, [r1 + 0x18]
0acf50: ldxdw r5, [r1 + 0x10]
0acf58: ldxdw r0, [r1 + 0x8]
0acf60: ldxdw r1, [r1 + 0x0]
0acf68: ldxdw r7, [r10 - 0x4b0]
0acf70: stxdw [r10 - 0x398], r7
0acf78: ldxdw r7, [r10 - 0x4a8]
0acf80: stxdw [r10 - 0x390], r7
0acf88: ldxdw r7, [r10 - 0x4a0]
0acf90: stxdw [r10 - 0x388], r7
0acf98: ldxdw r7, [r10 - 0x498]
0acfa0: stxdw [r10 - 0x380], r7
0acfa8: stxdw [r10 - 0x3b8], r1
0acfb0: stxdw [r10 - 0x3b0], r0
0acfb8: stxdw [r10 - 0x3a8], r5
0acfc0: stxdw [r10 - 0x3a0], r4
0acfc8: mov64 r1, r10
0acfd0: add64 r1, -0x7d0
0acfd8: mov64 r4, r10
0acfe0: add64 r4, -0x3b8
0acfe8: call 0xac3c ; call 0x1031d0
0acff0: ldxdw r1, [r10 - 0x7d0]
0acff8: ldxdw r2, [r10 - 0x7c8]
0ad000: ja -0x15a ; branch 0xac538
0ad008: ldxdw r2, [r10 - 0xc10]
0ad010: ja -0x15c ; branch 0xac538
0ad018: mov64 r1, r10
0ad020: add64 r1, -0xa90
0ad028: mov64 r2, 0x7d0
0ad030: call 0xb1c0 ; call 0x105e38
0ad038: ldxdw r3, [r10 - 0xa88]
0ad040: ldxdw r2, [r10 - 0xa90]
0ad048: mov64 r1, r10
0ad050: add64 r1, -0xaa0
0ad058: lddw r4, 0x11e32e ; rodata b'protocol_fee_recipient_token_accountfee_configfee_programprotocol_fee_recip'
0ad068: mov64 r5, 0x24
0ad070: call -0x15660 ; call 0x1d78
0ad078: ldxdw r1, [r10 - 0xaa0]
0ad080: ldxdw r2, [r10 - 0xa98]
0ad088: ja -0x16b ; branch 0xac538
0ad090: ldxdw r2, [r10 - 0x3c8]
0ad098: stxdw [r10 - 0x3c8], r2
0ad0a0: stxdw [r10 - 0x3d0], r3
0ad0a8: stxdw [r10 - 0x3d8], r1
0ad0b0: mov64 r1, r10
0ad0b8: add64 r1, -0x730
0ad0c0: mov64 r2, r10
0ad0c8: add64 r2, -0x3d8
0ad0d0: call 0xabed ; call 0x103040
0ad0d8: ldxdw r1, [r10 - 0x730]
0ad0e0: ldxdw r2, [r10 - 0x728]
0ad0e8: stxdw [r6 + 0x10], r2
0ad0f0: stxdw [r6 + 0x8], r1
0ad0f8: lddw r1, -0x8000000000000000
0ad108: stxdw [r6 + 0x0], r1
0ad110: ldxdw r1, [r10 - 0x3a8]
0ad118: ldxdw r2, [r10 - 0x3b0]
0ad120: ldxdw r3, [r2 + 0x0]
0ad128: add64 r3, -0x1
0ad130: stxdw [r2 + 0x0], r3
0ad138: jne r3, 0x0, +0x3 ; branch 0xad158
0ad140: ldxdw r3, [r2 + 0x8]
0ad148: add64 r3, -0x1
0ad150: stxdw [r2 + 0x8], r3
0ad158: ldxdw r2, [r1 + 0x0]
0ad160: add64 r2, -0x1
0ad168: stxdw [r1 + 0x0], r2
0ad170: jne r2, 0x0, +0x3 ; branch 0xad190
0ad178: ldxdw r2, [r1 + 0x8]
0ad180: add64 r2, -0x1
0ad188: stxdw [r1 + 0x8], r2
0ad190: ldxdw r1, [r10 - 0x478]
0ad198: ldxdw r2, [r10 - 0x480]
0ad1a0: ldxdw r3, [r2 + 0x0]
0ad1a8: add64 r3, -0x1
0ad1b0: stxdw [r2 + 0x0], r3
0ad1b8: jne r3, 0x0, +0x3 ; branch 0xad1d8
0ad1c0: ldxdw r3, [r2 + 0x8]
0ad1c8: add64 r3, -0x1
0ad1d0: stxdw [r2 + 0x8], r3
0ad1d8: ldxdw r2, [r1 + 0x0]
0ad1e0: add64 r2, -0x1
0ad1e8: stxdw [r1 + 0x0], r2
0ad1f0: jne r2, 0x0, -0x193 ; branch 0xac560
0ad1f8: ldxdw r2, [r1 + 0x8]
0ad200: add64 r2, -0x1
0ad208: stxdw [r1 + 0x8], r2
0ad210: ja -0x197 ; branch 0xac560
0ad218: mov64 r1, r10
0ad220: add64 r1, -0x740
0ad228: mov64 r2, 0x7d5
0ad230: call 0xb180 ; call 0x105e38
0ad238: ldxdw r3, [r10 - 0x738]
0ad240: ldxdw r2, [r10 - 0x740]
0ad248: mov64 r1, r10
0ad250: add64 r1, -0x750
0ad258: lddw r4, 0x11e32e ; rodata b'protocol_fee_recipient_token_accountfee_configfee_programprotocol_fee_recip'
0ad268: mov64 r5, 0x24
0ad270: call -0x156a0 ; call 0x1d78
0ad278: ldxdw r1, [r10 - 0x750]
0ad280: ldxdw r2, [r10 - 0x748]
0ad288: ja -0x1ab ; branch 0xac538
0ad290: mov64 r1, r10
0ad298: add64 r1, -0x760
0ad2a0: mov64 r2, r10
0ad2a8: add64 r2, -0x4f8
0ad2b0: call 0xabb1 ; call 0x103040
0ad2b8: ldxdw r1, [r10 - 0x760]
0ad2c0: ldxdw r2, [r10 - 0x758]
0ad2c8: ja -0x1b3 ; branch 0xac538
0ad2d0: ldxdw r2, [r10 - 0xc18]
0ad2d8: ja -0x1b5 ; branch 0xac538
0ad2e0: mov64 r1, r10
0ad2e8: add64 r1, -0xa70
0ad2f0: mov64 r2, 0x7d0
0ad2f8: call 0xb167 ; call 0x105e38
0ad300: ldxdw r3, [r10 - 0xa68]
0ad308: ldxdw r2, [r10 - 0xa70]
0ad310: mov64 r1, r10
0ad318: add64 r1, -0xa80
0ad320: lddw r4, 0x11e204 ; rodata b'coin_creator_vault_atacoin_creator_token_accountcoin_creator_vault_authorit'
0ad330: mov64 r5, 0x16
0ad338: call -0x156b9 ; call 0x1d78
0ad340: ldxdw r1, [r10 - 0xa80]
0ad348: ldxdw r2, [r10 - 0xa78]
0ad350: ja -0x1c4 ; branch 0xac538
0ad358: ldxdw r2, [r10 - 0x3c8]
0ad360: stxdw [r10 - 0x3c8], r2
0ad368: stxdw [r10 - 0x3d0], r3
0ad370: stxdw [r10 - 0x3d8], r1
0ad378: mov64 r1, r10
0ad380: add64 r1, -0x770
0ad388: mov64 r2, r10
0ad390: add64 r2, -0x3d8
0ad398: call 0xab94 ; call 0x103040
0ad3a0: ldxdw r1, [r10 - 0x770]
0ad3a8: ldxdw r2, [r10 - 0x768]
0ad3b0: stxdw [r6 + 0x10], r2
0ad3b8: stxdw [r6 + 0x8], r1
0ad3c0: lddw r1, -0x8000000000000000
0ad3d0: stxdw [r6 + 0x0], r1
0ad3d8: ldxdw r1, [r10 - 0x3a8]
0ad3e0: ldxdw r2, [r10 - 0x3b0]
0ad3e8: ldxdw r3, [r2 + 0x0]
0ad3f0: add64 r3, -0x1
0ad3f8: stxdw [r2 + 0x0], r3
0ad400: jne r3, 0x0, +0x3 ; branch 0xad420
0ad408: ldxdw r3, [r2 + 0x8]
0ad410: add64 r3, -0x1
0ad418: stxdw [r2 + 0x8], r3
0ad420: ldxdw r2, [r1 + 0x0]
0ad428: add64 r2, -0x1
0ad430: stxdw [r1 + 0x0], r2
0ad438: jne r2, 0x0, +0x3 ; branch 0xad458
0ad440: ldxdw r2, [r1 + 0x8]
0ad448: add64 r2, -0x1
0ad450: stxdw [r1 + 0x8], r2
0ad458: ldxdw r1, [r10 - 0x478]
0ad460: ldxdw r2, [r10 - 0x480]
0ad468: ldxdw r3, [r2 + 0x0]
0ad470: add64 r3, -0x1
0ad478: stxdw [r2 + 0x0], r3
0ad480: jne r3, 0x0, +0x3 ; branch 0xad4a0
0ad488: ldxdw r3, [r2 + 0x8]
0ad490: add64 r3, -0x1
0ad498: stxdw [r2 + 0x8], r3
0ad4a0: ldxdw r2, [r1 + 0x0]
0ad4a8: add64 r2, -0x1
0ad4b0: stxdw [r1 + 0x0], r2
0ad4b8: jne r2, 0x0, -0x1ec ; branch 0xac560
0ad4c0: ja -0x5a ; branch 0xad1f8
0ad4c8: mov64 r1, r10
0ad4d0: add64 r1, -0x780
0ad4d8: mov64 r2, 0x7d5
0ad4e0: call 0xb12a ; call 0x105e38
0ad4e8: ldxdw r3, [r10 - 0x778]
0ad4f0: ldxdw r2, [r10 - 0x780]
0ad4f8: mov64 r1, r10
0ad500: add64 r1, -0x790
0ad508: lddw r4, 0x11e204 ; rodata b'coin_creator_vault_atacoin_creator_token_accountcoin_creator_vault_authorit'
0ad518: mov64 r5, 0x16
0ad520: call -0x156f6 ; call 0x1d78
0ad528: ldxdw r1, [r10 - 0x790]
0ad530: ldxdw r2, [r10 - 0x788]
0ad538: ja -0x201 ; branch 0xac538
0ad540: mov64 r1, r10
0ad548: add64 r1, -0x7a0
0ad550: mov64 r2, r10
0ad558: add64 r2, -0x4c8
0ad560: call 0xab5b ; call 0x103040
0ad568: ldxdw r1, [r10 - 0x7a0]
0ad570: ldxdw r2, [r10 - 0x798]
0ad578: ja -0x209 ; branch 0xac538
0ad580: mov64 r1, r10
0ad588: add64 r1, -0x660
0ad590: stxdw [r10 - 0x390], r1
0ad598: mov64 r1, r10
0ad5a0: add64 r1, -0x489
0ad5a8: stxdw [r10 - 0x398], r1
0ad5b0: mov64 r1, r10
0ad5b8: add64 r1, -0x610
0ad5c0: stxdw [r10 - 0x3a0], r1
0ad5c8: mov64 r1, r10
0ad5d0: add64 r1, -0x658
0ad5d8: stxdw [r10 - 0x3a8], r1
0ad5e0: mov64 r1, r10
0ad5e8: add64 r1, -0x4e0
0ad5f0: stxdw [r10 - 0x3b0], r1
0ad5f8: mov64 r1, r10
0ad600: add64 r1, -0x5a8
0ad608: stxdw [r10 - 0x3b8], r1
0ad610: mov64 r1, r10
0ad618: add64 r1, -0x488
0ad620: mov64 r2, r10
0ad628: add64 r2, -0x3b8
0ad630: call 0x3af ; call 0xaf3b0
0ad638: ldxdw r1, [r10 - 0x480]
0ad640: stxdw [r10 - 0xc20], r1
0ad648: ldxdw r1, [r10 - 0x488]
0ad650: jeq r1, 0x2, +0x1 ; branch 0xad660
0ad658: ja +0x52 ; branch 0xad8f0
0ad660: ldxdw r1, [r10 - 0xc20]
0ad668: ldxdw r2, [r1 + 0x0]
0ad670: ldxb r1, [r2 + 0x29]
0ad678: jeq r1, 0x0, +0x50 ; branch 0xad900
0ad680: mov64 r7, r10
0ad688: add64 r7, -0x488
0ad690: mov64 r1, r7
0ad698: call -0x13ea5 ; call 0xe178
0ad6a0: mov64 r1, r7
0ad6a8: call 0xb704 ; call 0x108ed0
0ad6b0: stxdw [r10 - 0xc28], r0
0ad6b8: ldxdw r1, [r10 - 0xc20]
0ad6c0: ldxdw r2, [r1 + 0x0]
0ad6c8: mov64 r7, r10
0ad6d0: add64 r7, -0x3b8
0ad6d8: mov64 r1, r7
0ad6e0: call -0x13eae ; call 0xe178
0ad6e8: mov64 r1, r10
0ad6f0: add64 r1, -0x3d8
0ad6f8: mov64 r2, r7
0ad700: call 0xb712 ; call 0x108f98
0ad708: ldxdw r3, [r10 - 0x3d0]
0ad710: ldxdw r1, [r10 - 0x3d8]
0ad718: lddw r2, -0x7fffffffffffffe6
0ad728: jne r1, r2, +0x49 ; branch 0xad978
0ad730: mov64 r1, r10
0ad738: add64 r1, -0x4e0
0ad740: ldxdw r2, [r10 - 0xc28]
0ad748: call 0xb345 ; call 0x107178
0ad750: ldxdw r1, [r10 - 0x3a8]
0ad758: ldxdw r2, [r10 - 0x3b0]
0ad760: ldxdw r3, [r2 + 0x0]
0ad768: add64 r3, -0x1
0ad770: stxdw [r2 + 0x0], r3
0ad778: jne r3, 0x0, +0x3 ; branch 0xad798
0ad780: ldxdw r3, [r2 + 0x8]
0ad788: add64 r3, -0x1
0ad790: stxdw [r2 + 0x8], r3
0ad798: ldxdw r2, [r1 + 0x0]
0ad7a0: add64 r2, -0x1
0ad7a8: stxdw [r1 + 0x0], r2
0ad7b0: jne r2, 0x0, +0x3 ; branch 0xad7d0
0ad7b8: ldxdw r2, [r1 + 0x8]
0ad7c0: add64 r2, -0x1
0ad7c8: stxdw [r1 + 0x8], r2
0ad7d0: ldxdw r1, [r10 - 0x478]
0ad7d8: ldxdw r2, [r10 - 0x480]
0ad7e0: ldxdw r3, [r2 + 0x0]
0ad7e8: add64 r3, -0x1
0ad7f0: stxdw [r2 + 0x0], r3
0ad7f8: jne r3, 0x0, +0x3 ; branch 0xad818
0ad800: ldxdw r3, [r2 + 0x8]
0ad808: add64 r3, -0x1
0ad810: stxdw [r2 + 0x8], r3
0ad818: ldxdw r2, [r1 + 0x0]
0ad820: add64 r2, -0x1
0ad828: stxdw [r1 + 0x0], r2
0ad830: jne r2, 0x0, +0x3 ; branch 0xad850
0ad838: ldxdw r2, [r1 + 0x8]
0ad840: add64 r2, -0x1
0ad848: stxdw [r1 + 0x8], r2
0ad850: jne r0, 0x0, +0x1 ; branch 0xad860
0ad858: ja +0x51 ; branch 0xadae8
0ad860: ldxdw r1, [r8 + 0x0]
0ad868: ldxb r1, [r1 + 0x29]
0ad870: jne r1, 0x0, +0x5d ; branch 0xadb60
0ad878: mov64 r1, r10
0ad880: add64 r1, -0xa30
0ad888: mov64 r2, 0x7d0
0ad890: call 0xb0b4 ; call 0x105e38
0ad898: ldxdw r3, [r10 - 0xa28]
0ad8a0: ldxdw r2, [r10 - 0xa30]
0ad8a8: mov64 r1, r10
0ad8b0: add64 r1, -0xa40
0ad8b8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0ad8c8: mov64 r5, 0x4
0ad8d0: call -0x1576c ; call 0x1d78
0ad8d8: ldxdw r1, [r10 - 0xa40]
0ad8e0: ldxdw r2, [r10 - 0xa38]
0ad8e8: ja -0x277 ; branch 0xac538
0ad8f0: ldxdw r2, [r10 - 0xc20]
0ad8f8: ja -0x279 ; branch 0xac538
0ad900: mov64 r1, r10
0ad908: add64 r1, -0xa50
0ad910: mov64 r2, 0x7d0
0ad918: call 0xb0a3 ; call 0x105e38
0ad920: ldxdw r3, [r10 - 0xa48]
0ad928: ldxdw r2, [r10 - 0xa50]
0ad930: mov64 r1, r10
0ad938: add64 r1, -0xa60
0ad940: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0ad950: mov64 r5, 0x17
0ad958: call -0x1577d ; call 0x1d78
0ad960: ldxdw r1, [r10 - 0xa60]
0ad968: ldxdw r2, [r10 - 0xa58]
0ad970: ja -0x288 ; branch 0xac538
0ad978: ldxdw r2, [r10 - 0x3c8]
0ad980: stxdw [r10 - 0x3c8], r2
0ad988: stxdw [r10 - 0x3d0], r3
0ad990: stxdw [r10 - 0x3d8], r1
0ad998: mov64 r1, r10
0ad9a0: add64 r1, -0x7e0
0ad9a8: mov64 r2, r10
0ad9b0: add64 r2, -0x3d8
0ad9b8: call 0xaad0 ; call 0x103040
0ad9c0: ldxdw r1, [r10 - 0x7e0]
0ad9c8: ldxdw r2, [r10 - 0x7d8]
0ad9d0: stxdw [r6 + 0x10], r2
0ad9d8: stxdw [r6 + 0x8], r1
0ad9e0: lddw r1, -0x8000000000000000
0ad9f0: stxdw [r6 + 0x0], r1
0ad9f8: ldxdw r1, [r10 - 0x3a8]
0ada00: ldxdw r2, [r10 - 0x3b0]
0ada08: ldxdw r3, [r2 + 0x0]
0ada10: add64 r3, -0x1
0ada18: stxdw [r2 + 0x0], r3
0ada20: jne r3, 0x0, +0x3 ; branch 0xada40
0ada28: ldxdw r3, [r2 + 0x8]
0ada30: add64 r3, -0x1
0ada38: stxdw [r2 + 0x8], r3
0ada40: ldxdw r2, [r1 + 0x0]
0ada48: add64 r2, -0x1
0ada50: stxdw [r1 + 0x0], r2
0ada58: jne r2, 0x0, +0x3 ; branch 0xada78
0ada60: ldxdw r2, [r1 + 0x8]
0ada68: add64 r2, -0x1
0ada70: stxdw [r1 + 0x8], r2
0ada78: ldxdw r1, [r10 - 0x478]
0ada80: ldxdw r2, [r10 - 0x480]
0ada88: ldxdw r3, [r2 + 0x0]
0ada90: add64 r3, -0x1
0ada98: stxdw [r2 + 0x0], r3
0adaa0: jne r3, 0x0, +0x3 ; branch 0xadac0
0adaa8: ldxdw r3, [r2 + 0x8]
0adab0: add64 r3, -0x1
0adab8: stxdw [r2 + 0x8], r3
0adac0: ldxdw r2, [r1 + 0x0]
0adac8: add64 r2, -0x1
0adad0: stxdw [r1 + 0x0], r2
0adad8: jne r2, 0x0, -0x2b0 ; branch 0xac560
0adae0: ja -0x11e ; branch 0xad1f8
0adae8: mov64 r1, r10
0adaf0: add64 r1, -0x7f0
0adaf8: mov64 r2, 0x7d5
0adb00: call 0xb066 ; call 0x105e38
0adb08: ldxdw r3, [r10 - 0x7e8]
0adb10: ldxdw r2, [r10 - 0x7f0]
0adb18: mov64 r1, r10
0adb20: add64 r1, -0x800
0adb28: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0adb38: mov64 r5, 0x17
0adb40: call -0x157ba ; call 0x1d78
0adb48: ldxdw r1, [r10 - 0x800]
0adb50: ldxdw r2, [r10 - 0x7f8]
0adb58: ja -0x2c5 ; branch 0xac538
0adb60: ldxdw r1, [r8 + 0x40]
0adb68: stxdw [r10 - 0x3c0], r1
0adb70: ldxdw r1, [r8 + 0x38]
0adb78: stxdw [r10 - 0x3c8], r1
0adb80: ldxdw r1, [r8 + 0x30]
0adb88: stxdw [r10 - 0x3d0], r1
0adb90: ldxdw r1, [r8 + 0x28]
0adb98: stxdw [r10 - 0x3d8], r1
0adba0: ldxdw r1, [r10 - 0xb78]
0adba8: ldxdw r1, [r1 + 0x58]
0adbb0: ldxdw r1, [r1 + 0x0]
0adbb8: ldxdw r2, [r1 + 0x18]
0adbc0: stxdw [r10 - 0x470], r2
0adbc8: ldxdw r2, [r1 + 0x10]
0adbd0: stxdw [r10 - 0x478], r2
0adbd8: ldxdw r2, [r1 + 0x8]
0adbe0: stxdw [r10 - 0x480], r2
0adbe8: ldxdw r1, [r1 + 0x0]
0adbf0: stxdw [r10 - 0x488], r1
0adbf8: mov64 r1, r10
0adc00: add64 r1, -0x3d8
0adc08: mov64 r2, r10
0adc10: add64 r2, -0x488
0adc18: mov64 r3, 0x20
0adc20: call 0xd797 ; call 0x1198e0
0adc28: lsh64 r0, 0x20
0adc30: rsh64 r0, 0x20
0adc38: jne r0, 0x0, +0x42 ; branch 0xade50
0adc40: ldxdw r1, [r8 + 0x60]
0adc48: stxdw [r10 - 0x3c0], r1
0adc50: ldxdw r1, [r8 + 0x58]
0adc58: stxdw [r10 - 0x3c8], r1
0adc60: ldxdw r1, [r8 + 0x50]
0adc68: stxdw [r10 - 0x3d0], r1
0adc70: ldxdw r1, [r8 + 0x48]
0adc78: stxdw [r10 - 0x3d8], r1
0adc80: ldxdw r1, [r10 - 0xb80]
0adc88: ldxdw r1, [r1 + 0x58]
0adc90: ldxdw r1, [r1 + 0x0]
0adc98: ldxdw r2, [r1 + 0x18]
0adca0: stxdw [r10 - 0x470], r2
0adca8: ldxdw r2, [r1 + 0x10]
0adcb0: stxdw [r10 - 0x478], r2
0adcb8: ldxdw r2, [r1 + 0x8]
0adcc0: stxdw [r10 - 0x480], r2
0adcc8: ldxdw r1, [r1 + 0x0]
0adcd0: stxdw [r10 - 0x488], r1
0adcd8: mov64 r1, r10
0adce0: add64 r1, -0x3d8
0adce8: mov64 r2, r10
0adcf0: add64 r2, -0x488
0adcf8: mov64 r3, 0x20
0add00: call 0xd77b ; call 0x1198e0
0add08: lsh64 r0, 0x20
0add10: rsh64 r0, 0x20
0add18: jeq r0, 0x0, +0x4c ; branch 0xadf80
0add20: mov64 r1, r10
0add28: add64 r1, -0x840
0add30: mov64 r2, 0x9
0add38: call -0x6673 ; call 0x7a9a8
0add40: ldxdw r3, [r10 - 0x838]
0add48: ldxdw r2, [r10 - 0x840]
0add50: mov64 r1, r10
0add58: add64 r1, -0x850
0add60: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0add70: mov64 r5, 0x4
0add78: call -0x15801 ; call 0x1d78
0add80: ldxdw r3, [r10 - 0x848]
0add88: ldxdw r2, [r10 - 0x850]
0add90: ldxdw r1, [r10 - 0x3c0]
0add98: stxdw [r10 - 0x3a0], r1
0adda0: ldxdw r1, [r10 - 0x3c8]
0adda8: stxdw [r10 - 0x3a8], r1
0addb0: ldxdw r1, [r10 - 0x3d0]
0addb8: stxdw [r10 - 0x3b0], r1
0addc0: ldxdw r1, [r10 - 0x3d8]
0addc8: stxdw [r10 - 0x3b8], r1
0addd0: ldxdw r1, [r10 - 0x488]
0addd8: stxdw [r10 - 0x398], r1
0adde0: ldxdw r1, [r10 - 0x480]
0adde8: stxdw [r10 - 0x390], r1
0addf0: ldxdw r1, [r10 - 0x478]
0addf8: stxdw [r10 - 0x388], r1
0ade00: ldxdw r1, [r10 - 0x470]
0ade08: stxdw [r10 - 0x380], r1
0ade10: mov64 r1, r10
0ade18: add64 r1, -0x860
0ade20: mov64 r4, r10
0ade28: add64 r4, -0x3b8
0ade30: call 0xaa73 ; call 0x1031d0
0ade38: ldxdw r1, [r10 - 0x860]
0ade40: ldxdw r2, [r10 - 0x858]
0ade48: ja -0x323 ; branch 0xac538
0ade50: mov64 r1, r10
0ade58: add64 r1, -0x810
0ade60: mov64 r2, 0x8
0ade68: call -0x6699 ; call 0x7a9a8
0ade70: ldxdw r3, [r10 - 0x808]
0ade78: ldxdw r2, [r10 - 0x810]
0ade80: mov64 r1, r10
0ade88: add64 r1, -0x820
0ade90: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0adea0: mov64 r5, 0x4
0adea8: call -0x15827 ; call 0x1d78
0adeb0: ldxdw r3, [r10 - 0x818]
0adeb8: ldxdw r2, [r10 - 0x820]
0adec0: ldxdw r1, [r10 - 0x3c0]
0adec8: stxdw [r10 - 0x3a0], r1
0aded0: ldxdw r1, [r10 - 0x3c8]
0aded8: stxdw [r10 - 0x3a8], r1
0adee0: ldxdw r1, [r10 - 0x3d0]
0adee8: stxdw [r10 - 0x3b0], r1
0adef0: ldxdw r1, [r10 - 0x3d8]
0adef8: stxdw [r10 - 0x3b8], r1
0adf00: ldxdw r1, [r10 - 0x488]
0adf08: stxdw [r10 - 0x398], r1
0adf10: ldxdw r1, [r10 - 0x480]
0adf18: stxdw [r10 - 0x390], r1
0adf20: ldxdw r1, [r10 - 0x478]
0adf28: stxdw [r10 - 0x388], r1
0adf30: ldxdw r1, [r10 - 0x470]
0adf38: stxdw [r10 - 0x380], r1
0adf40: mov64 r1, r10
0adf48: add64 r1, -0x830
0adf50: mov64 r4, r10
0adf58: add64 r4, -0x3b8
0adf60: call 0xaa4d ; call 0x1031d0
0adf68: ldxdw r1, [r10 - 0x830]
0adf70: ldxdw r2, [r10 - 0x828]
0adf78: ja -0x349 ; branch 0xac538
0adf80: ldxdw r1, [r8 + 0xa0]
0adf88: stxdw [r10 - 0x3c0], r1
0adf90: ldxdw r1, [r8 + 0x98]
0adf98: stxdw [r10 - 0x3c8], r1
0adfa0: ldxdw r1, [r8 + 0x90]
0adfa8: stxdw [r10 - 0x3d0], r1
0adfb0: ldxdw r1, [r8 + 0x88]
0adfb8: stxdw [r10 - 0x3d8], r1
0adfc0: ldxdw r1, [r10 - 0xb90]
0adfc8: ldxdw r7, [r1 + 0x20]
0adfd0: ldxdw r1, [r7 + 0x0]
0adfd8: ldxdw r2, [r1 + 0x18]
0adfe0: stxdw [r10 - 0x470], r2
0adfe8: ldxdw r2, [r1 + 0x10]
0adff0: stxdw [r10 - 0x478], r2
0adff8: ldxdw r2, [r1 + 0x8]
0ae000: stxdw [r10 - 0x480], r2
0ae008: ldxdw r1, [r1 + 0x0]
0ae010: stxdw [r10 - 0x488], r1
0ae018: mov64 r1, r10
0ae020: add64 r1, -0x3d8
0ae028: mov64 r2, r10
0ae030: add64 r2, -0x488
0ae038: mov64 r3, 0x20
0ae040: call 0xd713 ; call 0x1198e0
0ae048: lsh64 r0, 0x20
0ae050: rsh64 r0, 0x20
0ae058: jeq r0, 0x0, +0x26 ; branch 0xae190
0ae060: mov64 r1, r10
0ae068: add64 r1, -0x870
0ae070: mov64 r2, 0xe
0ae078: call -0x66db ; call 0x7a9a8
0ae080: ldxdw r3, [r10 - 0x868]
0ae088: ldxdw r2, [r10 - 0x870]
0ae090: mov64 r1, r10
0ae098: add64 r1, -0x880
0ae0a0: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0ae0b0: mov64 r5, 0x4
0ae0b8: call -0x15869 ; call 0x1d78
0ae0c0: ldxdw r3, [r10 - 0x878]
0ae0c8: ldxdw r2, [r10 - 0x880]
0ae0d0: ldxdw r1, [r10 - 0x3c0]
0ae0d8: stxdw [r10 - 0x3a0], r1
0ae0e0: ldxdw r1, [r10 - 0x3c8]
0ae0e8: stxdw [r10 - 0x3a8], r1
0ae0f0: ldxdw r1, [r10 - 0x3d0]
0ae0f8: stxdw [r10 - 0x3b0], r1
0ae100: ldxdw r1, [r10 - 0x3d8]
0ae108: stxdw [r10 - 0x3b8], r1
0ae110: ldxdw r1, [r10 - 0x488]
0ae118: stxdw [r10 - 0x398], r1
0ae120: ldxdw r1, [r10 - 0x480]
0ae128: stxdw [r10 - 0x390], r1
0ae130: ldxdw r1, [r10 - 0x478]
0ae138: stxdw [r10 - 0x388], r1
0ae140: ldxdw r1, [r10 - 0x470]
0ae148: stxdw [r10 - 0x380], r1
0ae150: mov64 r1, r10
0ae158: add64 r1, -0x890
0ae160: mov64 r4, r10
0ae168: add64 r4, -0x3b8
0ae170: call 0xaa0b ; call 0x1031d0
0ae178: ldxdw r1, [r10 - 0x890]
0ae180: ldxdw r2, [r10 - 0x888]
0ae188: ja -0x38b ; branch 0xac538
0ae190: ldxdw r1, [r8 + 0xc0]
0ae198: stxdw [r10 - 0x3c0], r1
0ae1a0: ldxdw r1, [r8 + 0xb8]
0ae1a8: stxdw [r10 - 0x3c8], r1
0ae1b0: ldxdw r1, [r8 + 0xb0]
0ae1b8: stxdw [r10 - 0x3d0], r1
0ae1c0: ldxdw r1, [r8 + 0xa8]
0ae1c8: stxdw [r10 - 0x3d8], r1
0ae1d0: ldxdw r1, [r10 - 0xb98]
0ae1d8: ldxdw r1, [r1 + 0x20]
0ae1e0: stxdw [r10 - 0xc28], r1
0ae1e8: ldxdw r1, [r1 + 0x0]
0ae1f0: ldxdw r2, [r1 + 0x18]
0ae1f8: stxdw [r10 - 0x470], r2
0ae200: ldxdw r2, [r1 + 0x10]
0ae208: stxdw [r10 - 0x478], r2
0ae210: ldxdw r2, [r1 + 0x8]
0ae218: stxdw [r10 - 0x480], r2
0ae220: ldxdw r1, [r1 + 0x0]
0ae228: stxdw [r10 - 0x488], r1
0ae230: mov64 r1, r10
0ae238: add64 r1, -0x3d8
0ae240: mov64 r2, r10
0ae248: add64 r2, -0x488
0ae250: mov64 r3, 0x20
0ae258: call 0xd6d0 ; call 0x1198e0
0ae260: lsh64 r0, 0x20
0ae268: rsh64 r0, 0x20
0ae270: jeq r0, 0x0, +0x26 ; branch 0xae3a8
0ae278: mov64 r1, r10
0ae280: add64 r1, -0x8a0
0ae288: mov64 r2, 0xf
0ae290: call -0x671e ; call 0x7a9a8
0ae298: ldxdw r3, [r10 - 0x898]
0ae2a0: ldxdw r2, [r10 - 0x8a0]
0ae2a8: mov64 r1, r10
0ae2b0: add64 r1, -0x8b0
0ae2b8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0ae2c8: mov64 r5, 0x4
0ae2d0: call -0x158ac ; call 0x1d78
0ae2d8: ldxdw r3, [r10 - 0x8a8]
0ae2e0: ldxdw r2, [r10 - 0x8b0]
0ae2e8: ldxdw r1, [r10 - 0x3c0]
0ae2f0: stxdw [r10 - 0x3a0], r1
0ae2f8: ldxdw r1, [r10 - 0x3c8]
0ae300: stxdw [r10 - 0x3a8], r1
0ae308: ldxdw r1, [r10 - 0x3d0]
0ae310: stxdw [r10 - 0x3b0], r1
0ae318: ldxdw r1, [r10 - 0x3d8]
0ae320: stxdw [r10 - 0x3b8], r1
0ae328: ldxdw r1, [r10 - 0x488]
0ae330: stxdw [r10 - 0x398], r1
0ae338: ldxdw r1, [r10 - 0x480]
0ae340: stxdw [r10 - 0x390], r1
0ae348: ldxdw r1, [r10 - 0x478]
0ae350: stxdw [r10 - 0x388], r1
0ae358: ldxdw r1, [r10 - 0x470]
0ae360: stxdw [r10 - 0x380], r1
0ae368: mov64 r1, r10
0ae370: add64 r1, -0x8c0
0ae378: mov64 r4, r10
0ae380: add64 r4, -0x3b8
0ae388: call 0xa9c8 ; call 0x1031d0
0ae390: ldxdw r1, [r10 - 0x8c0]
0ae398: ldxdw r2, [r10 - 0x8b8]
0ae3a0: ja -0x3ce ; branch 0xac538
0ae3a8: ldxdw r1, [r10 - 0x658]
0ae3b0: ldxb r1, [r1 + 0x29]
0ae3b8: jeq r1, 0x0, +0x25 ; branch 0xae4e8
0ae3c0: ldxdw r1, [r9 + 0x20]
0ae3c8: ldxb r1, [r1 + 0x29]
0ae3d0: jne r1, 0x0, +0xf ; branch 0xae450
0ae3d8: mov64 r1, r10
0ae3e0: add64 r1, -0x9f0
0ae3e8: mov64 r2, 0x7d0
0ae3f0: call 0xaf48 ; call 0x105e38
0ae3f8: ldxdw r3, [r10 - 0x9e8]
0ae400: ldxdw r2, [r10 - 0x9f0]
0ae408: mov64 r1, r10
0ae410: add64 r1, -0xa00
0ae418: lddw r4, 0x11e2ed ; rodata b'user_base_token_accountuser_quote_token_accounttoken_2022_programprotocol_f'
0ae428: mov64 r5, 0x17
0ae430: call -0x158d8 ; call 0x1d78
0ae438: ldxdw r1, [r10 - 0xa00]
0ae440: ldxdw r2, [r10 - 0x9f8]
0ae448: ja -0x3e3 ; branch 0xac538
0ae450: ldxdw r1, [r10 - 0xb88]
0ae458: ldxdw r1, [r1 + 0x20]
0ae460: ldxb r1, [r1 + 0x29]
0ae468: jne r1, 0x0, +0x1e ; branch 0xae560
0ae470: mov64 r1, r10
0ae478: add64 r1, -0x9d0
0ae480: mov64 r2, 0x7d0
0ae488: call 0xaf35 ; call 0x105e38
0ae490: ldxdw r3, [r10 - 0x9c8]
0ae498: ldxdw r2, [r10 - 0x9d0]
0ae4a0: mov64 r1, r10
0ae4a8: add64 r1, -0x9e0
0ae4b0: lddw r4, 0x11e304 ; rodata b'user_quote_token_accounttoken_2022_programprotocol_fee_recipient_token_acco'
0ae4c0: mov64 r5, 0x18
0ae4c8: call -0x158eb ; call 0x1d78
0ae4d0: ldxdw r1, [r10 - 0x9e0]
0ae4d8: ldxdw r2, [r10 - 0x9d8]
0ae4e0: ja -0x3f6 ; branch 0xac538
0ae4e8: mov64 r1, r10
0ae4f0: add64 r1, -0xa10
0ae4f8: mov64 r2, 0x7d0
0ae500: call 0xaf26 ; call 0x105e38
0ae508: ldxdw r3, [r10 - 0xa08]
0ae510: ldxdw r2, [r10 - 0xa10]
0ae518: mov64 r1, r10
0ae520: add64 r1, -0xa20
0ae528: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0ae538: mov64 r5, 0x4
0ae540: call -0x158fa ; call 0x1d78
0ae548: ldxdw r1, [r10 - 0xa20]
0ae550: ldxdw r2, [r10 - 0xa18]
0ae558: ja -0x405 ; branch 0xac538
0ae560: ldxb r1, [r7 + 0x29]
0ae568: jne r1, 0x0, +0xf ; branch 0xae5e8
0ae570: mov64 r1, r10
0ae578: add64 r1, -0x9b0
0ae580: mov64 r2, 0x7d0
0ae588: call 0xaf15 ; call 0x105e38
0ae590: ldxdw r3, [r10 - 0x9a8]
0ae598: ldxdw r2, [r10 - 0x9b0]
0ae5a0: mov64 r1, r10
0ae5a8: add64 r1, -0x9c0
0ae5b0: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0ae5c0: mov64 r5, 0x17
0ae5c8: call -0x1590b ; call 0x1d78
0ae5d0: ldxdw r1, [r10 - 0x9c0]
0ae5d8: ldxdw r2, [r10 - 0x9b8]
0ae5e0: ja -0x416 ; branch 0xac538
0ae5e8: ldxdw r1, [r10 - 0xc28]
0ae5f0: ldxb r1, [r1 + 0x29]
0ae5f8: jne r1, 0x0, +0xf ; branch 0xae678
0ae600: mov64 r1, r10
0ae608: add64 r1, -0x990
0ae610: mov64 r2, 0x7d0
0ae618: call 0xaf03 ; call 0x105e38
0ae620: ldxdw r3, [r10 - 0x988]
0ae628: ldxdw r2, [r10 - 0x990]
0ae630: mov64 r1, r10
0ae638: add64 r1, -0x9a0
0ae640: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0ae650: mov64 r5, 0x18
0ae658: call -0x1591d ; call 0x1d78
0ae660: ldxdw r1, [r10 - 0x9a0]
0ae668: ldxdw r2, [r10 - 0x998]
0ae670: ja -0x428 ; branch 0xac538
0ae678: ldxdw r4, [r10 - 0x660]
0ae680: mov64 r1, r10
0ae688: add64 r1, -0x3b8
0ae690: lddw r2, 0x1229d0 ; rodata b"\x00\x00\x00\x00F\xc6\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00"
0ae6a0: mov64 r3, 0x1
0ae6a8: call 0xbf37 ; call 0x10e068
0ae6b0: ldxdw r1, [r10 - 0x3a0]
0ae6b8: stxdw [r10 - 0x440], r1
0ae6c0: ldxdw r1, [r10 - 0x3a8]
0ae6c8: stxdw [r10 - 0x448], r1
0ae6d0: ldxdw r1, [r10 - 0x3b0]
0ae6d8: stxdw [r10 - 0x450], r1
0ae6e0: ldxdw r1, [r10 - 0x3b8]
0ae6e8: stxdw [r10 - 0x458], r1
0ae6f0: ldxb r1, [r10 - 0x398]
0ae6f8: ldxdw r2, [r10 - 0xb68]
0ae700: stxb [r2 + 0x0], r1
0ae708: ldxdw r2, [r10 - 0xbb0]
0ae710: ldxdw r1, [r2 + 0x18]
0ae718: stxdw [r10 - 0x3a0], r1
0ae720: ldxdw r1, [r2 + 0x10]
0ae728: stxdw [r10 - 0x3a8], r1
0ae730: ldxdw r1, [r2 + 0x8]
0ae738: stxdw [r10 - 0x3b0], r1
0ae740: ldxdw r1, [r2 + 0x0]
0ae748: stxdw [r10 - 0x3b8], r1
0ae750: mov64 r1, r10
0ae758: add64 r1, -0x3b8
0ae760: mov64 r2, r10
0ae768: add64 r2, -0x458
0ae770: mov64 r3, 0x20
0ae778: call 0xd62c ; call 0x1198e0
0ae780: lsh64 r0, 0x20
0ae788: rsh64 r0, 0x20
0ae790: jne r0, 0x0, +0x53 ; branch 0xaea30
0ae798: mov64 r1, r8
0ae7a0: add64 r1, 0xc8
0ae7a8: stxdw [r10 - 0x478], r1
0ae7b0: lddw r1, 0x11c868 ; rodata b'creator_vaultprograms/pump-amm/src/instructions/coin_creator/migrate_pool_c'
0ae7c0: stxdw [r10 - 0x488], r1
0ae7c8: stdw [r10 - 0x470], 0x20
0ae7d0: stdw [r10 - 0x480], 0xd
0ae7d8: ldxdw r4, [r10 - 0x660]
0ae7e0: mov64 r1, r10
0ae7e8: add64 r1, -0x3b8
0ae7f0: mov64 r2, r10
0ae7f8: add64 r2, -0x488
0ae800: mov64 r3, 0x2
0ae808: call 0xbf0b ; call 0x10e068
0ae810: ldxdw r1, [r10 - 0x3a0]
0ae818: stxdw [r10 - 0x420], r1
0ae820: ldxdw r1, [r10 - 0x3a8]
0ae828: stxdw [r10 - 0x428], r1
0ae830: ldxdw r1, [r10 - 0x3b0]
0ae838: stxdw [r10 - 0x430], r1
0ae840: ldxdw r1, [r10 - 0x3b8]
0ae848: stxdw [r10 - 0x438], r1
0ae850: ldxb r1, [r10 - 0x398]
0ae858: ldxdw r2, [r10 - 0xb68]
0ae860: stxb [r2 + 0x1], r1
0ae868: ldxdw r1, [r10 - 0x5d8]
0ae870: ldxdw r2, [r1 + 0x0]
0ae878: stxdw [r10 - 0x3b8], r2
0ae880: ldxdw r2, [r1 + 0x8]
0ae888: stxdw [r10 - 0x3b0], r2
0ae890: ldxdw r2, [r1 + 0x10]
0ae898: stxdw [r10 - 0x3a8], r2
0ae8a0: ldxdw r1, [r1 + 0x18]
0ae8a8: stxdw [r10 - 0x3a0], r1
0ae8b0: mov64 r1, r10
0ae8b8: add64 r1, -0x3b8
0ae8c0: mov64 r2, r10
0ae8c8: add64 r2, -0x438
0ae8d0: mov64 r3, 0x20
0ae8d8: call 0xd600 ; call 0x1198e0
0ae8e0: lsh64 r0, 0x20
0ae8e8: rsh64 r0, 0x20
0ae8f0: jeq r0, 0x0, +0x4e ; branch 0xaeb68
0ae8f8: mov64 r1, r10
0ae900: add64 r1, -0x900
0ae908: mov64 r2, 0x7d6
0ae910: call 0xaea4 ; call 0x105e38
0ae918: ldxdw r3, [r10 - 0x8f8]
0ae920: ldxdw r2, [r10 - 0x900]
0ae928: mov64 r1, r10
0ae930: add64 r1, -0x910
0ae938: lddw r4, 0x11e234 ; rodata b'coin_creator_vault_authoritycoin_creatorsharing-configsharing_configbonding'
0ae948: mov64 r5, 0x1c
0ae950: call -0x1597c ; call 0x1d78
0ae958: ldxdw r3, [r10 - 0x908]
0ae960: ldxdw r2, [r10 - 0x910]
0ae968: ldxdw r1, [r10 - 0x5d8]
0ae970: ldxdw r4, [r1 + 0x18]
0ae978: ldxdw r5, [r1 + 0x10]
0ae980: ldxdw r0, [r1 + 0x8]
0ae988: ldxdw r1, [r1 + 0x0]
0ae990: ldxdw r7, [r10 - 0x438]
0ae998: stxdw [r10 - 0x398], r7
0ae9a0: ldxdw r7, [r10 - 0x430]
0ae9a8: stxdw [r10 - 0x390], r7
0ae9b0: ldxdw r7, [r10 - 0x428]
0ae9b8: stxdw [r10 - 0x388], r7
0ae9c0: ldxdw r7, [r10 - 0x420]
0ae9c8: stxdw [r10 - 0x380], r7
0ae9d0: stxdw [r10 - 0x3b8], r1
0ae9d8: stxdw [r10 - 0x3b0], r0
0ae9e0: stxdw [r10 - 0x3a8], r5
0ae9e8: stxdw [r10 - 0x3a0], r4
0ae9f0: mov64 r1, r10
0ae9f8: add64 r1, -0x920
0aea00: mov64 r4, r10
0aea08: add64 r4, -0x3b8
0aea10: call 0xa8f7 ; call 0x1031d0
0aea18: ldxdw r1, [r10 - 0x920]
0aea20: ldxdw r2, [r10 - 0x918]
0aea28: ja -0x49f ; branch 0xac538
0aea30: mov64 r1, r10
0aea38: add64 r1, -0x8d0
0aea40: mov64 r2, 0x7d6
0aea48: call 0xae7d ; call 0x105e38
0aea50: ldxdw r3, [r10 - 0x8c8]
0aea58: ldxdw r2, [r10 - 0x8d0]
0aea60: mov64 r1, r10
0aea68: add64 r1, -0x8e0
0aea70: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0aea80: mov64 r5, 0xf
0aea88: call -0x159a3 ; call 0x1d78
0aea90: ldxdw r3, [r10 - 0x8d8]
0aea98: ldxdw r2, [r10 - 0x8e0]
0aeaa0: ldxdw r4, [r10 - 0xbb0]
0aeaa8: ldxdw r1, [r4 + 0x18]
0aeab0: stxdw [r10 - 0x3a0], r1
0aeab8: ldxdw r1, [r4 + 0x10]
0aeac0: stxdw [r10 - 0x3a8], r1
0aeac8: ldxdw r1, [r4 + 0x8]
0aead0: stxdw [r10 - 0x3b0], r1
0aead8: ldxdw r1, [r4 + 0x0]
0aeae0: stxdw [r10 - 0x3b8], r1
0aeae8: ldxdw r1, [r10 - 0x458]
0aeaf0: stxdw [r10 - 0x398], r1
0aeaf8: ldxdw r1, [r10 - 0x450]
0aeb00: stxdw [r10 - 0x390], r1
0aeb08: ldxdw r1, [r10 - 0x448]
0aeb10: stxdw [r10 - 0x388], r1
0aeb18: ldxdw r1, [r10 - 0x440]
0aeb20: stxdw [r10 - 0x380], r1
0aeb28: mov64 r1, r10
0aeb30: add64 r1, -0x8f0
0aeb38: mov64 r4, r10
0aeb40: add64 r4, -0x3b8
0aeb48: call 0xa8d0 ; call 0x1031d0
0aeb50: ldxdw r1, [r10 - 0x8f0]
0aeb58: ldxdw r2, [r10 - 0x8e8]
0aeb60: ja -0x4c6 ; branch 0xac538
0aeb68: ldxdw r4, [r10 - 0x660]
0aeb70: mov64 r1, r10
0aeb78: add64 r1, -0x3b8
0aeb80: lddw r2, 0x122a10 ; rodata b"\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9a\xcc\x11\x00.\x00\x00\x00\x00\x00\x00\x00\xe9\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00"
0aeb90: mov64 r3, 0x1
0aeb98: call 0xbe99 ; call 0x10e068
0aeba0: ldxdw r1, [r10 - 0x3a0]
0aeba8: stxdw [r10 - 0x400], r1
0aebb0: ldxdw r1, [r10 - 0x3a8]
0aebb8: stxdw [r10 - 0x408], r1
0aebc0: ldxdw r1, [r10 - 0x3b0]
0aebc8: stxdw [r10 - 0x410], r1
0aebd0: ldxdw r1, [r10 - 0x3b8]
0aebd8: stxdw [r10 - 0x418], r1
0aebe0: ldxb r1, [r10 - 0x398]
0aebe8: ldxdw r2, [r10 - 0xb68]
0aebf0: stxb [r2 + 0x2], r1
0aebf8: ldxdw r1, [r10 - 0xbd0]
0aec00: ldxdw r1, [r1 + 0x0]
0aec08: ldxdw r1, [r1 + 0x0]
0aec10: ldxdw r2, [r1 + 0x18]
0aec18: stxdw [r10 - 0x3a0], r2
0aec20: ldxdw r2, [r1 + 0x10]
0aec28: stxdw [r10 - 0x3a8], r2
0aec30: ldxdw r2, [r1 + 0x8]
0aec38: stxdw [r10 - 0x3b0], r2
0aec40: ldxdw r1, [r1 + 0x0]
0aec48: stxdw [r10 - 0x3b8], r1
0aec50: mov64 r1, r10
0aec58: add64 r1, -0x3b8
0aec60: mov64 r2, r10
0aec68: add64 r2, -0x418
0aec70: mov64 r3, 0x20
0aec78: call 0xd58c ; call 0x1198e0
0aec80: lsh64 r0, 0x20
0aec88: rsh64 r0, 0x20
0aec90: jeq r0, 0x0, +0x29 ; branch 0xaede0
0aec98: mov64 r1, r10
0aeca0: add64 r1, -0x930
0aeca8: mov64 r2, 0x7d6
0aecb0: call 0xae30 ; call 0x105e38
0aecb8: ldxdw r3, [r10 - 0x928]
0aecc0: ldxdw r2, [r10 - 0x930]
0aecc8: mov64 r1, r10
0aecd0: add64 r1, -0x940
0aecd8: lddw r4, 0x11ce27 ; rodata b'global_volume_accumulatorprograms/pump-amm/src/instructions/token_incentive'
0aece8: mov64 r5, 0x19
0aecf0: call -0x159f0 ; call 0x1d78
0aecf8: ldxdw r3, [r10 - 0x938]
0aed00: ldxdw r2, [r10 - 0x940]
0aed08: ldxdw r1, [r10 - 0xbd0]
0aed10: ldxdw r1, [r1 + 0x0]
0aed18: ldxdw r1, [r1 + 0x0]
0aed20: ldxdw r4, [r1 + 0x0]
0aed28: ldxdw r5, [r1 + 0x8]
0aed30: ldxdw r0, [r1 + 0x10]
0aed38: ldxdw r1, [r1 + 0x18]
0aed40: ldxdw r7, [r10 - 0x418]
0aed48: stxdw [r10 - 0x398], r7
0aed50: ldxdw r7, [r10 - 0x410]
0aed58: stxdw [r10 - 0x390], r7
0aed60: ldxdw r7, [r10 - 0x408]
0aed68: stxdw [r10 - 0x388], r7
0aed70: ldxdw r7, [r10 - 0x400]
0aed78: stxdw [r10 - 0x380], r7
0aed80: stxdw [r10 - 0x3a0], r1
0aed88: stxdw [r10 - 0x3a8], r0
0aed90: stxdw [r10 - 0x3b0], r5
0aed98: stxdw [r10 - 0x3b8], r4
0aeda0: mov64 r1, r10
0aeda8: add64 r1, -0x950
0aedb0: mov64 r4, r10
0aedb8: add64 r4, -0x3b8
0aedc0: call 0xa881 ; call 0x1031d0
0aedc8: ldxdw r1, [r10 - 0x950]
0aedd0: ldxdw r2, [r10 - 0x948]
0aedd8: ja -0x515 ; branch 0xac538
0aede0: lddw r1, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0aedf0: stxdw [r10 - 0x3c8], r1
0aedf8: lddw r1, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0aee08: stxdw [r10 - 0x3d8], r1
0aee10: stdw [r10 - 0x3c0], 0x20
0aee18: stdw [r10 - 0x3d0], 0xa
0aee20: ldxdw r1, [r10 - 0xbf0]
0aee28: ldxdw r1, [r1 + 0x0]
0aee30: ldxdw r2, [r1 + 0x0]
0aee38: ldxdw r3, [r1 + 0x8]
0aee40: ldxdw r4, [r1 + 0x10]
0aee48: ldxdw r1, [r1 + 0x18]
0aee50: stxdw [r10 - 0x470], r1
0aee58: stxdw [r10 - 0x478], r4
0aee60: stxdw [r10 - 0x480], r3
0aee68: stxdw [r10 - 0x488], r2
0aee70: mov64 r1, r10
0aee78: add64 r1, -0x3b8
0aee80: mov64 r2, r10
0aee88: add64 r2, -0x3d8
0aee90: mov64 r4, r10
0aee98: add64 r4, -0x488
0aeea0: mov64 r3, 0x2
0aeea8: call 0xbe37 ; call 0x10e068
0aeeb0: ldxdw r1, [r10 - 0x3a0]
0aeeb8: stxdw [r10 - 0x3e0], r1
0aeec0: ldxdw r1, [r10 - 0x3a8]
0aeec8: stxdw [r10 - 0x3e8], r1
0aeed0: ldxdw r1, [r10 - 0x3b0]
0aeed8: stxdw [r10 - 0x3f0], r1
0aeee0: ldxdw r1, [r10 - 0x3b8]
0aeee8: stxdw [r10 - 0x3f8], r1
0aeef0: ldxb r1, [r10 - 0x398]
0aeef8: ldxdw r2, [r10 - 0xb68]
0aef00: stxb [r2 + 0x4], r1
0aef08: ldxdw r1, [r10 - 0xbf8]
0aef10: ldxdw r1, [r1 + 0x0]
0aef18: ldxdw r2, [r1 + 0x18]
0aef20: stxdw [r10 - 0x3a0], r2
0aef28: ldxdw r2, [r1 + 0x10]
0aef30: stxdw [r10 - 0x3a8], r2
0aef38: ldxdw r2, [r1 + 0x8]
0aef40: stxdw [r10 - 0x3b0], r2
0aef48: ldxdw r1, [r1 + 0x0]
0aef50: stxdw [r10 - 0x3b8], r1
0aef58: mov64 r1, r10
0aef60: add64 r1, -0x3b8
0aef68: mov64 r2, r10
0aef70: add64 r2, -0x3f8
0aef78: mov64 r3, 0x20
0aef80: call 0xd52b ; call 0x1198e0
0aef88: lsh64 r0, 0x20
0aef90: rsh64 r0, 0x20
0aef98: jeq r0, 0x0, +0x28 ; branch 0xaf0e0
0aefa0: mov64 r1, r10
0aefa8: add64 r1, -0x960
0aefb0: mov64 r2, 0x7d6
0aefb8: call 0xadcf ; call 0x105e38
0aefc0: ldxdw r3, [r10 - 0x958]
0aefc8: ldxdw r2, [r10 - 0x960]
0aefd0: mov64 r1, r10
0aefd8: add64 r1, -0x970
0aefe0: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0aeff0: mov64 r5, 0xa
0aeff8: call -0x15a51 ; call 0x1d78
0af000: ldxdw r3, [r10 - 0x968]
0af008: ldxdw r2, [r10 - 0x970]
0af010: ldxdw r1, [r10 - 0xbf8]
0af018: ldxdw r1, [r1 + 0x0]
0af020: ldxdw r4, [r1 + 0x18]
0af028: stxdw [r10 - 0x3a0], r4
0af030: ldxdw r4, [r1 + 0x10]
0af038: stxdw [r10 - 0x3a8], r4
0af040: ldxdw r4, [r1 + 0x8]
0af048: stxdw [r10 - 0x3b0], r4
0af050: ldxdw r1, [r1 + 0x0]
0af058: stxdw [r10 - 0x3b8], r1
0af060: ldxdw r1, [r10 - 0x3f8]
0af068: stxdw [r10 - 0x398], r1
0af070: ldxdw r1, [r10 - 0x3f0]
0af078: stxdw [r10 - 0x390], r1
0af080: ldxdw r1, [r10 - 0x3e8]
0af088: stxdw [r10 - 0x388], r1
0af090: ldxdw r1, [r10 - 0x3e0]
0af098: stxdw [r10 - 0x380], r1
0af0a0: mov64 r1, r10
0af0a8: add64 r1, -0x980
0af0b0: mov64 r4, r10
0af0b8: add64 r4, -0x3b8
0af0c0: call 0xa821 ; call 0x1031d0
0af0c8: ldxdw r1, [r10 - 0x980]
0af0d0: ldxdw r2, [r10 - 0x978]
0af0d8: ja -0x575 ; branch 0xac538
0af0e0: ldxdw r1, [r10 - 0x658]
0af0e8: stxdw [r10 - 0xb68], r1
0af0f0: mov64 r1, r6
0af0f8: add64 r1, 0x90
0af100: mov64 r2, r10
0af108: add64 r2, -0x650
0af110: mov64 r3, 0x30
0af118: call 0xd4ef ; call 0x119898
0af120: ldxdw r1, [r10 - 0x618]
0af128: stxdw [r10 - 0xc28], r1
0af130: ldxdw r1, [r10 - 0x610]
0af138: stxdw [r10 - 0xc30], r1
0af140: ldxdw r7, [r10 - 0x608]
0af148: ldxh r1, [r10 - 0x5e8]
0af150: stxh [r6 + 0xe8], r1
0af158: ldxdw r1, [r10 - 0x5f0]
0af160: stxdw [r6 + 0xe0], r1
0af168: ldxdw r1, [r10 - 0x5f8]
0af170: stxdw [r6 + 0xd8], r1
0af178: ldxw r1, [r10 - 0x600]
0af180: stxw [r6 + 0xeb], r1
0af188: ldxb r1, [r10 - 0x5fc]
0af190: stxb [r6 + 0xef], r1
0af198: mov64 r1, r6
0af1a0: add64 r1, 0xf0
0af1a8: mov64 r2, r10
0af1b0: add64 r2, -0x5d8
0af1b8: mov64 r3, 0x30
0af1c0: call 0xd4da ; call 0x119898
0af1c8: mov64 r1, r6
0af1d0: add64 r1, 0x28
0af1d8: mov64 r2, r10
0af1e0: add64 r2, -0x5a0
0af1e8: mov64 r3, 0x60
0af1f0: call 0xd4d4 ; call 0x119898
0af1f8: ldxdw r1, [r10 - 0xbf0]
0af200: stxdw [r6 + 0x1b0], r1
0af208: ldxdw r1, [r10 - 0xc20]
0af210: stxdw [r6 + 0x1a8], r1
0af218: ldxdw r1, [r10 - 0xbd0]
0af220: stxdw [r6 + 0x1a0], r1
0af228: ldxdw r1, [r10 - 0xc18]
0af230: stxdw [r6 + 0x198], r1
0af238: ldxdw r1, [r10 - 0xbc8]
0af240: stxdw [r6 + 0x190], r1
0af248: stxdw [r6 + 0x188], r7
0af250: ldxdw r1, [r10 - 0xc30]
0af258: stxdw [r6 + 0x180], r1
0af260: ldxdw r1, [r10 - 0xc28]
0af268: stxdw [r6 + 0x178], r1
0af270: ldxdw r1, [r10 - 0xba0]
0af278: stxdw [r6 + 0x170], r1
0af280: ldxdw r1, [r10 - 0xc10]
0af288: stxdw [r6 + 0x168], r1
0af290: ldxdw r1, [r10 - 0xb98]
0af298: stxdw [r6 + 0x160], r1
0af2a0: ldxdw r1, [r10 - 0xb90]
0af2a8: stxdw [r6 + 0x158], r1
0af2b0: ldxdw r1, [r10 - 0xb88]
0af2b8: stxdw [r6 + 0x150], r1
0af2c0: stxdw [r6 + 0x148], r9
0af2c8: ldxdw r1, [r10 - 0xb80]
0af2d0: stxdw [r6 + 0x140], r1
0af2d8: ldxdw r1, [r10 - 0xb78]
0af2e0: stxdw [r6 + 0x138], r1
0af2e8: ldxdw r1, [r10 - 0xb70]
0af2f0: stxdw [r6 + 0x130], r1
0af2f8: ldxdw r1, [r10 - 0xb68]
0af300: stxdw [r6 + 0x128], r1
0af308: stxdw [r6 + 0x120], r8
0af310: ldxdw r1, [r10 - 0xbc0]
0af318: stxb [r6 + 0xea], r1
0af320: ldxdw r1, [r10 - 0xbb8]
0af328: stxdw [r6 + 0xd0], r1
0af330: ldxdw r1, [r10 - 0xba8]
0af338: stxdw [r6 + 0xc8], r1
0af340: ldxdw r1, [r10 - 0xbb0]
0af348: stxdw [r6 + 0xc0], r1
0af350: ldxdw r1, [r10 - 0xbf8]
0af358: stxdw [r6 + 0x88], r1
0af360: ldxdw r1, [r10 - 0xc08]
0af368: stxdw [r6 + 0x20], r1
0af370: ldxdw r1, [r10 - 0xc00]
0af378: stxdw [r6 + 0x18], r1
0af380: ldxdw r1, [r10 - 0xbd8]
0af388: stxdw [r6 + 0x10], r1
0af390: ldxdw r1, [r10 - 0xbe0]
0af398: stxdw [r6 + 0x8], r1
0af3a0: ldxdw r1, [r10 - 0xbe8]
0af3a8: ja -0x739 ; branch 0xab9e8
