08d7d0: mov64 r7, r5
08d7d8: mov64 r8, r3
08d7e0: mov64 r9, r2
08d7e8: mov64 r6, r1
08d7f0: mov64 r1, r10
08d7f8: add64 r1, -0x3b8
08d800: mov64 r2, r8
08d808: call -0xfab6 ; call 0x10260
08d810: ldxb r1, [r10 - 0x29a]
08d818: jeq r1, 0x2, +0x17 ; branch 0x8d8d8
08d820: lddw r1, 0x300000000
08d830: ldxdw r1, [r1 + 0x0]
08d838: mov64 r3, r1
08d840: add64 r3, -0x120
08d848: mov64 r2, 0x0
08d850: mov64 r4, 0x1
08d858: jgt r3, r1, +0x1 ; branch 0x8d868
08d860: mov64 r4, 0x0
08d868: stxdw [r10 - 0x800], r9
08d870: jne r4, 0x0, +0x1 ; branch 0x8d880
08d878: mov64 r2, r3
08d880: lddw r9, 0x300007ee0
08d890: jeq r1, 0x0, +0x2 ; branch 0x8d8a8
08d898: and64 r2, -0x8
08d8a0: mov64 r9, r2
08d8a8: lddw r1, 0x300000007
08d8b8: jgt r9, r1, +0xe ; branch 0x8d930
08d8c0: mov64 r1, 0x8
08d8c8: mov64 r2, 0x120
08d8d0: call 0x10751 ; call 0x111360
08d8d8: ldxdw r3, [r10 - 0x3b0]
08d8e0: ldxdw r2, [r10 - 0x3b8]
08d8e8: mov64 r1, r10
08d8f0: add64 r1, -0x7f8
08d8f8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
08d908: mov64 r5, 0x4
08d910: call -0x11774 ; call 0x1d78
08d918: ldxdw r1, [r10 - 0x7f8]
08d920: ldxdw r2, [r10 - 0x7f0]
08d928: ja +0x143 ; branch 0x8e348
08d930: ldxdw r1, [r7 - 0xff8]
08d938: stxdw [r10 - 0x808], r1
08d940: lddw r1, 0x300000000
08d950: stxdw [r1 + 0x0], r9
08d958: mov64 r2, r10
08d960: add64 r2, -0x3b8
08d968: mov64 r1, r9
08d970: mov64 r3, 0x120
08d978: call 0x117e3 ; call 0x119898
08d980: mov64 r1, r10
08d988: add64 r1, -0x3b8
08d990: mov64 r2, r8
08d998: call -0xfbe9 ; call 0xfa58
08d9a0: ldxdw r7, [r10 - 0x3b0]
08d9a8: ldxdw r2, [r10 - 0x3b8]
08d9b0: jeq r2, 0x2, +0x1 ; branch 0x8d9c0
08d9b8: ja +0x1d ; branch 0x8daa8
08d9c0: mov64 r1, r10
08d9c8: add64 r1, -0x3b8
08d9d0: mov64 r2, r8
08d9d8: call -0xfad9 ; call 0x10318
08d9e0: ldxb r1, [r10 - 0x4]
08d9e8: jeq r1, 0x2, +0x21 ; branch 0x8daf8
08d9f0: lddw r1, 0x300000000
08da00: ldxdw r5, [r1 + 0x0]
08da08: mov64 r3, r5
08da10: add64 r3, -0x3b8
08da18: mov64 r2, 0x0
08da20: mov64 r4, 0x1
08da28: jgt r3, r5, +0x1 ; branch 0x8da38
08da30: mov64 r4, 0x0
08da38: jne r4, 0x0, +0x1 ; branch 0x8da48
08da40: mov64 r2, r3
08da48: lddw r1, 0x300007c48
08da58: jeq r5, 0x0, +0x2 ; branch 0x8da70
08da60: and64 r2, -0x8
08da68: mov64 r1, r2
08da70: stxdw [r10 - 0x810], r7
08da78: lddw r2, 0x300000007
08da88: jgt r1, r2, +0x18 ; branch 0x8db50
08da90: mov64 r1, 0x8
08da98: mov64 r2, 0x3b8
08daa0: call 0x10717 ; call 0x111360
08daa8: mov64 r1, r10
08dab0: add64 r1, -0x4c8
08dab8: mov64 r3, r7
08dac0: lddw r4, 0x11e1e9 ; rodata b'authoritybase_token_programcoin_creator_vault_atacoin_creator_token_account'
08dad0: mov64 r5, 0x9
08dad8: call -0x117ad ; call 0x1d78
08dae0: ldxdw r1, [r10 - 0x4c8]
08dae8: ldxdw r2, [r10 - 0x4c0]
08daf0: ja +0x10a ; branch 0x8e348
08daf8: ldxdw r3, [r10 - 0x3b0]
08db00: ldxdw r2, [r10 - 0x3b8]
08db08: mov64 r1, r10
08db10: add64 r1, -0x7e8
08db18: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
08db28: mov64 r5, 0xd
08db30: call -0x117b8 ; call 0x1d78
08db38: ldxdw r1, [r10 - 0x7e8]
08db40: ldxdw r2, [r10 - 0x7e0]
08db48: ja +0xff ; branch 0x8e348
08db50: lddw r7, 0x300000000
08db60: stxdw [r7 + 0x0], r1
08db68: mov64 r2, r10
08db70: add64 r2, -0x3b8
08db78: stxdw [r10 - 0x818], r1
08db80: mov64 r3, 0x3b8
08db88: call 0x117a1 ; call 0x119898
08db90: mov64 r1, r10
08db98: add64 r1, -0x3b8
08dba0: mov64 r2, r8
08dba8: call -0x11b25 ; call 0x288
08dbb0: ldxw r1, [r10 - 0x3b8]
08dbb8: jeq r1, 0x2, +0x14 ; branch 0x8dc60
08dbc0: ldxdw r5, [r7 + 0x0]
08dbc8: mov64 r3, r5
08dbd0: add64 r3, -0x80
08dbd8: mov64 r2, 0x0
08dbe0: mov64 r4, 0x1
08dbe8: jgt r3, r5, +0x1 ; branch 0x8dbf8
08dbf0: mov64 r4, 0x0
08dbf8: jne r4, 0x0, +0x1 ; branch 0x8dc08
08dc00: mov64 r2, r3
08dc08: lddw r1, 0x300007f80
08dc18: jeq r5, 0x0, +0x2 ; branch 0x8dc30
08dc20: and64 r2, -0x8
08dc28: mov64 r1, r2
08dc30: lddw r2, 0x300000007
08dc40: jgt r1, r2, +0xe ; branch 0x8dcb8
08dc48: mov64 r1, 0x8
08dc50: mov64 r2, 0x80
08dc58: call 0x106e0 ; call 0x111360
08dc60: ldxdw r3, [r10 - 0x3a8]
08dc68: ldxdw r2, [r10 - 0x3b0]
08dc70: mov64 r1, r10
08dc78: add64 r1, -0x7d8
08dc80: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
08dc90: mov64 r5, 0x9
08dc98: call -0x117e5 ; call 0x1d78
08dca0: ldxdw r1, [r10 - 0x7d8]
08dca8: ldxdw r2, [r10 - 0x7d0]
08dcb0: ja +0xd2 ; branch 0x8e348
08dcb8: stxdw [r7 + 0x0], r1
08dcc0: mov64 r2, r10
08dcc8: add64 r2, -0x3b8
08dcd0: stxdw [r10 - 0x820], r1
08dcd8: mov64 r3, 0x80
08dce0: call 0x11776 ; call 0x119898
08dce8: mov64 r1, r10
08dcf0: add64 r1, -0x3b8
08dcf8: mov64 r2, r8
08dd00: call -0x11b50 ; call 0x288
08dd08: ldxw r1, [r10 - 0x3b8]
08dd10: jeq r1, 0x2, +0x12 ; branch 0x8dda8
08dd18: ldxdw r5, [r7 + 0x0]
08dd20: mov64 r3, r5
08dd28: add64 r3, -0x80
08dd30: mov64 r2, 0x0
08dd38: mov64 r4, 0x1
08dd40: jgt r3, r5, +0x1 ; branch 0x8dd50
08dd48: mov64 r4, 0x0
08dd50: jne r4, 0x0, +0x1 ; branch 0x8dd60
08dd58: mov64 r2, r3
08dd60: lddw r1, 0x300007f80
08dd70: jeq r5, 0x0, +0x2 ; branch 0x8dd88
08dd78: and64 r2, -0x8
08dd80: mov64 r1, r2
08dd88: lddw r2, 0x300000007
08dd98: jgt r1, r2, +0xc ; branch 0x8de00
08dda0: ja -0x2c ; branch 0x8dc48
08dda8: ldxdw r3, [r10 - 0x3a8]
08ddb0: ldxdw r2, [r10 - 0x3b0]
08ddb8: mov64 r1, r10
08ddc0: add64 r1, -0x7c8
08ddc8: lddw r4, 0x11e1d6 ; rodata b'quote_mintbase_mintauthoritybase_token_programcoin_creator_vault_atacoin_cr'
08ddd8: mov64 r5, 0xa
08dde0: call -0x1180e ; call 0x1d78
08dde8: ldxdw r1, [r10 - 0x7c8]
08ddf0: ldxdw r2, [r10 - 0x7c0]
08ddf8: ja +0xa9 ; branch 0x8e348
08de00: stxdw [r7 + 0x0], r1
08de08: mov64 r2, r10
08de10: add64 r2, -0x3b8
08de18: stxdw [r10 - 0x828], r1
08de20: mov64 r3, 0x80
08de28: call 0x1174d ; call 0x119898
08de30: mov64 r1, r10
08de38: add64 r1, -0x3b8
08de40: mov64 r2, r8
08de48: call -0x11b90 ; call 0x1d0
08de50: ldxw r1, [r10 - 0x308]
08de58: jeq r1, 0x2, +0x14 ; branch 0x8df00
08de60: ldxdw r1, [r7 + 0x0]
08de68: mov64 r3, r1
08de70: add64 r3, -0xd8
08de78: mov64 r2, 0x0
08de80: mov64 r4, 0x1
08de88: jgt r3, r1, +0x1 ; branch 0x8de98
08de90: mov64 r4, 0x0
08de98: jne r4, 0x0, +0x1 ; branch 0x8dea8
08dea0: mov64 r2, r3
08dea8: lddw r7, 0x300007f28
08deb8: jeq r1, 0x0, +0x2 ; branch 0x8ded0
08dec0: and64 r2, -0x8
08dec8: mov64 r7, r2
08ded0: lddw r1, 0x300000007
08dee0: jgt r7, r1, +0xe ; branch 0x8df58
08dee8: mov64 r1, 0x8
08def0: mov64 r2, 0xd8
08def8: call 0x1068c ; call 0x111360
08df00: ldxdw r3, [r10 - 0x3b0]
08df08: ldxdw r2, [r10 - 0x3b8]
08df10: mov64 r1, r10
08df18: add64 r1, -0x7b8
08df20: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
08df30: mov64 r5, 0x17
08df38: call -0x11839 ; call 0x1d78
08df40: ldxdw r1, [r10 - 0x7b8]
08df48: ldxdw r2, [r10 - 0x7b0]
08df50: ja +0x7e ; branch 0x8e348
08df58: lddw r1, 0x300000000
08df68: stxdw [r1 + 0x0], r7
08df70: mov64 r2, r10
08df78: add64 r2, -0x3b8
08df80: mov64 r1, r7
08df88: mov64 r3, 0xd8
08df90: call 0x11720 ; call 0x119898
08df98: mov64 r1, r10
08dfa0: add64 r1, -0x3b8
08dfa8: mov64 r2, r8
08dfb0: call -0x11635 ; call 0x2e10
08dfb8: ldxdw r3, [r10 - 0x3b0]
08dfc0: ldxdw r2, [r10 - 0x3b8]
08dfc8: jeq r2, 0x2, +0x1 ; branch 0x8dfd8
08dfd0: ja +0xa ; branch 0x8e028
08dfd8: stxdw [r10 - 0x830], r3
08dfe0: ldxdw r1, [r8 + 0x8]
08dfe8: jeq r1, 0x0, +0x10 ; branch 0x8e070
08dff0: add64 r1, -0x1
08dff8: stxdw [r8 + 0x8], r1
08e000: ldxdw r3, [r8 + 0x0]
08e008: mov64 r1, r3
08e010: add64 r1, 0x30
08e018: stxdw [r8 + 0x0], r1
08e020: ja +0x11 ; branch 0x8e0b0
08e028: mov64 r1, r10
08e030: add64 r1, -0x4d8
08e038: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
08e048: mov64 r5, 0x18
08e050: call -0x1185c ; call 0x1d78
08e058: ldxdw r1, [r10 - 0x4d8]
08e060: ldxdw r2, [r10 - 0x4d0]
08e068: ja +0x5b ; branch 0x8e348
08e070: mov64 r1, r10
08e078: add64 r1, -0x4e8
08e080: mov64 r2, 0xbbd
08e088: call 0xefb5 ; call 0x105e38
08e090: ldxdw r3, [r10 - 0x4e0]
08e098: ldxdw r2, [r10 - 0x4e8]
08e0a0: jeq r2, 0x2, +0x1 ; branch 0x8e0b0
08e0a8: ja +0x42 ; branch 0x8e2c0
08e0b0: stxdw [r10 - 0x838], r3
08e0b8: mov64 r1, r10
08e0c0: add64 r1, -0x3b8
08e0c8: mov64 r2, r8
08e0d0: call -0x11659 ; call 0x2e10
08e0d8: ldxdw r3, [r10 - 0x3b0]
08e0e0: ldxdw r2, [r10 - 0x3b8]
08e0e8: jeq r2, 0x2, +0x1 ; branch 0x8e0f8
08e0f0: ja +0x27 ; branch 0x8e230
08e0f8: stxdw [r10 - 0x840], r3
08e100: mov64 r1, r10
08e108: add64 r1, -0x3b8
08e110: mov64 r2, r8
08e118: call -0x11c00 ; call 0x120
08e120: ldxdw r3, [r10 - 0x3b0]
08e128: ldxdw r2, [r10 - 0x3b8]
08e130: jeq r2, 0x2, +0x1 ; branch 0x8e140
08e138: ja +0x27 ; branch 0x8e278
08e140: stxdw [r10 - 0x848], r3
08e148: mov64 r1, r10
08e150: add64 r1, -0x3b8
08e158: mov64 r2, r8
08e160: call -0x11c09 ; call 0x120
08e168: ldxdw r3, [r10 - 0x3b0]
08e170: ldxdw r2, [r10 - 0x3b8]
08e178: jeq r2, 0x2, +0x1 ; branch 0x8e188
08e180: ja +0x30 ; branch 0x8e308
08e188: stxdw [r10 - 0x858], r3
08e190: stxdw [r10 - 0x850], r7
08e198: mov64 r1, r10
08e1a0: add64 r1, -0x3b8
08e1a8: mov64 r2, r8
08e1b0: call -0x117c9 ; call 0x2370
08e1b8: ldxdw r7, [r10 - 0x3b0]
08e1c0: ldxdw r2, [r10 - 0x3b8]
08e1c8: ldxb r1, [r10 - 0x38e]
08e1d0: jeq r1, 0x2, +0x1 ; branch 0x8e1e0
08e1d8: ja +0x31 ; branch 0x8e368
08e1e0: mov64 r1, r10
08e1e8: add64 r1, -0x7a8
08e1f0: mov64 r3, r7
08e1f8: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
08e208: mov64 r5, 0xf
08e210: call -0x11894 ; call 0x1d78
08e218: ldxdw r1, [r10 - 0x7a8]
08e220: ldxdw r2, [r10 - 0x7a0]
08e228: ja +0x23 ; branch 0x8e348
08e230: mov64 r1, r10
08e238: add64 r1, -0x508
08e240: lddw r4, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
08e250: mov64 r5, 0xb
08e258: call -0x1189d ; call 0x1d78
08e260: ldxdw r1, [r10 - 0x508]
08e268: ldxdw r2, [r10 - 0x500]
08e270: ja +0x1a ; branch 0x8e348
08e278: mov64 r1, r10
08e280: add64 r1, -0x518
08e288: lddw r4, 0x11e1f2 ; rodata b'base_token_programcoin_creator_vault_atacoin_creator_token_accountcoin_crea'
08e298: mov64 r5, 0x12
08e2a0: call -0x118a6 ; call 0x1d78
08e2a8: ldxdw r1, [r10 - 0x518]
08e2b0: ldxdw r2, [r10 - 0x510]
08e2b8: ja +0x11 ; branch 0x8e348
08e2c0: mov64 r1, r10
08e2c8: add64 r1, -0x4f8
08e2d0: lddw r4, 0x11e197 ; rodata b'boost_vault_authorityquote_token_programpool_base_token_accountquote_mintba'
08e2e0: mov64 r5, 0x15
08e2e8: call -0x118af ; call 0x1d78
08e2f0: ldxdw r1, [r10 - 0x4f8]
08e2f8: ldxdw r2, [r10 - 0x4f0]
08e300: ja +0x8 ; branch 0x8e348
08e308: mov64 r1, r10
08e310: add64 r1, -0x528
08e318: lddw r4, 0x11e1ac ; rodata b'quote_token_programpool_base_token_accountquote_mintbase_mintauthoritybase_'
08e328: mov64 r5, 0x13
08e330: call -0x118b8 ; call 0x1d78
08e338: ldxdw r1, [r10 - 0x528]
08e340: ldxdw r2, [r10 - 0x520]
08e348: stxdw [r6 + 0x8], r2
08e350: stxdw [r6 + 0x0], r1
08e358: stb [r6 + 0xb2], 0x2
08e360: exit
08e368: stxdw [r10 - 0x870], r1
08e370: stxdw [r10 - 0x868], r2
08e378: ldxdw r1, [r10 - 0x3a0]
08e380: stxdw [r10 - 0x4b0], r1
08e388: ldxdw r1, [r10 - 0x398]
08e390: stxdw [r10 - 0x4a8], r1
08e398: ldxh r1, [r10 - 0x390]
08e3a0: stxh [r10 - 0x4a0], r1
08e3a8: ldxw r1, [r10 - 0x38d]
08e3b0: stxw [r10 - 0x4b8], r1
08e3b8: ldxb r1, [r10 - 0x389]
08e3c0: stxb [r10 - 0x4b4], r1
08e3c8: ldxdw r1, [r10 - 0x3a8]
08e3d0: stxdw [r10 - 0x860], r1
08e3d8: mov64 r1, r10
08e3e0: add64 r1, -0x3b8
08e3e8: mov64 r2, r8
08e3f0: call -0x11811 ; call 0x2370
08e3f8: ldxdw r3, [r10 - 0x3b0]
08e400: ldxdw r2, [r10 - 0x3b8]
08e408: ldxb r8, [r10 - 0x38e]
08e410: jeq r8, 0x2, +0x1 ; branch 0x8e420
08e418: ja +0xd ; branch 0x8e488
08e420: mov64 r1, r10
08e428: add64 r1, -0x798
08e430: lddw r4, 0x11e0ca ; rodata b'programsystem_programglobal_incentive_token_accountadmintoken_programassoci'
08e440: mov64 r5, 0x7
08e448: call -0x118db ; call 0x1d78
08e450: ldxdw r1, [r10 - 0x798]
08e458: ldxdw r2, [r10 - 0x790]
08e460: stxdw [r6 + 0x8], r2
08e468: stxdw [r6 + 0x0], r1
08e470: stb [r6 + 0xb2], 0x2
08e478: ldxdw r2, [r10 - 0x860]
08e480: ja +0x12e ; branch 0x8edf8
08e488: stxdw [r10 - 0x888], r2
08e490: stxdw [r10 - 0x878], r3
08e498: ldxdw r1, [r10 - 0x3a0]
08e4a0: stxdw [r10 - 0x490], r1
08e4a8: ldxdw r1, [r10 - 0x398]
08e4b0: stxdw [r10 - 0x488], r1
08e4b8: ldxh r1, [r10 - 0x390]
08e4c0: stxh [r10 - 0x480], r1
08e4c8: ldxw r1, [r10 - 0x38d]
08e4d0: stxw [r10 - 0x498], r1
08e4d8: ldxb r1, [r10 - 0x389]
08e4e0: stxb [r10 - 0x494], r1
08e4e8: ldxdw r1, [r10 - 0x3a8]
08e4f0: stxdw [r10 - 0x880], r1
08e4f8: ldxdw r1, [r9 + 0x40]
08e500: stxdw [r10 - 0x3e0], r1
08e508: ldxdw r1, [r9 + 0x38]
08e510: stxdw [r10 - 0x3e8], r1
08e518: ldxdw r1, [r9 + 0x30]
08e520: stxdw [r10 - 0x3f0], r1
08e528: ldxdw r1, [r9 + 0x28]
08e530: stxdw [r10 - 0x3f8], r1
08e538: ldxdw r1, [r10 - 0x820]
08e540: ldxdw r1, [r1 + 0x58]
08e548: ldxdw r1, [r1 + 0x0]
08e550: ldxdw r2, [r1 + 0x18]
08e558: stxdw [r10 - 0x3c0], r2
08e560: ldxdw r2, [r1 + 0x10]
08e568: stxdw [r10 - 0x3c8], r2
08e570: ldxdw r2, [r1 + 0x8]
08e578: stxdw [r10 - 0x3d0], r2
08e580: ldxdw r1, [r1 + 0x0]
08e588: stxdw [r10 - 0x3d8], r1
08e590: mov64 r1, r10
08e598: add64 r1, -0x3f8
08e5a0: mov64 r2, r10
08e5a8: add64 r2, -0x3d8
08e5b0: mov64 r3, 0x20
08e5b8: call 0x11664 ; call 0x1198e0
08e5c0: lsh64 r0, 0x20
08e5c8: rsh64 r0, 0x20
08e5d0: jeq r0, 0x0, +0x29 ; branch 0x8e720
08e5d8: mov64 r1, r10
08e5e0: add64 r1, -0x538
08e5e8: mov64 r2, 0x8
08e5f0: call -0x278a ; call 0x7a9a8
08e5f8: ldxdw r3, [r10 - 0x530]
08e600: ldxdw r2, [r10 - 0x538]
08e608: mov64 r1, r10
08e610: add64 r1, -0x548
08e618: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
08e628: mov64 r5, 0x4
08e630: call -0x11918 ; call 0x1d78
08e638: ldxdw r3, [r10 - 0x540]
08e640: ldxdw r2, [r10 - 0x548]
08e648: ldxdw r1, [r10 - 0x3e0]
08e650: stxdw [r10 - 0x3a0], r1
08e658: ldxdw r1, [r10 - 0x3e8]
08e660: stxdw [r10 - 0x3a8], r1
08e668: ldxdw r1, [r10 - 0x3f0]
08e670: stxdw [r10 - 0x3b0], r1
08e678: ldxdw r1, [r10 - 0x3f8]
08e680: stxdw [r10 - 0x3b8], r1
08e688: ldxdw r1, [r10 - 0x3d8]
08e690: stxdw [r10 - 0x398], r1
08e698: ldxdw r1, [r10 - 0x3d0]
08e6a0: stxdw [r10 - 0x390], r1
08e6a8: ldxdw r1, [r10 - 0x3c8]
08e6b0: stxdw [r10 - 0x388], r1
08e6b8: ldxdw r1, [r10 - 0x3c0]
08e6c0: stxdw [r10 - 0x380], r1
08e6c8: mov64 r1, r10
08e6d0: add64 r1, -0x558
08e6d8: mov64 r4, r10
08e6e0: add64 r4, -0x3b8
08e6e8: call 0xe95c ; call 0x1031d0
08e6f0: ldxdw r1, [r10 - 0x558]
08e6f8: ldxdw r2, [r10 - 0x550]
08e700: stxdw [r6 + 0x8], r2
08e708: stxdw [r6 + 0x0], r1
08e710: stb [r6 + 0xb2], 0x2
08e718: ja +0xca ; branch 0x8ed70
08e720: stxdw [r10 - 0x890], r7
08e728: ldxdw r1, [r9 + 0x60]
08e730: stxdw [r10 - 0x3e0], r1
08e738: ldxdw r1, [r9 + 0x58]
08e740: stxdw [r10 - 0x3e8], r1
08e748: ldxdw r1, [r9 + 0x50]
08e750: stxdw [r10 - 0x3f0], r1
08e758: ldxdw r1, [r9 + 0x48]
08e760: stxdw [r10 - 0x3f8], r1
08e768: ldxdw r1, [r10 - 0x828]
08e770: ldxdw r1, [r1 + 0x58]
08e778: ldxdw r1, [r1 + 0x0]
08e780: ldxdw r2, [r1 + 0x18]
08e788: stxdw [r10 - 0x3c0], r2
08e790: ldxdw r2, [r1 + 0x10]
08e798: stxdw [r10 - 0x3c8], r2
08e7a0: ldxdw r2, [r1 + 0x8]
08e7a8: stxdw [r10 - 0x3d0], r2
08e7b0: ldxdw r1, [r1 + 0x0]
08e7b8: stxdw [r10 - 0x3d8], r1
08e7c0: mov64 r1, r10
08e7c8: add64 r1, -0x3f8
08e7d0: mov64 r2, r10
08e7d8: add64 r2, -0x3d8
08e7e0: mov64 r3, 0x20
08e7e8: call 0x1161e ; call 0x1198e0
08e7f0: lsh64 r0, 0x20
08e7f8: rsh64 r0, 0x20
08e800: jeq r0, 0x0, +0x26 ; branch 0x8e938
08e808: mov64 r1, r10
08e810: add64 r1, -0x568
08e818: mov64 r2, 0x9
08e820: call -0x27d0 ; call 0x7a9a8
08e828: ldxdw r3, [r10 - 0x560]
08e830: ldxdw r2, [r10 - 0x568]
08e838: mov64 r1, r10
08e840: add64 r1, -0x578
08e848: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
08e858: mov64 r5, 0x4
08e860: call -0x1195e ; call 0x1d78
08e868: ldxdw r3, [r10 - 0x570]
08e870: ldxdw r2, [r10 - 0x578]
08e878: ldxdw r1, [r10 - 0x3e0]
08e880: stxdw [r10 - 0x3a0], r1
08e888: ldxdw r1, [r10 - 0x3e8]
08e890: stxdw [r10 - 0x3a8], r1
08e898: ldxdw r1, [r10 - 0x3f0]
08e8a0: stxdw [r10 - 0x3b0], r1
08e8a8: ldxdw r1, [r10 - 0x3f8]
08e8b0: stxdw [r10 - 0x3b8], r1
08e8b8: ldxdw r1, [r10 - 0x3d8]
08e8c0: stxdw [r10 - 0x398], r1
08e8c8: ldxdw r1, [r10 - 0x3d0]
08e8d0: stxdw [r10 - 0x390], r1
08e8d8: ldxdw r1, [r10 - 0x3c8]
08e8e0: stxdw [r10 - 0x388], r1
08e8e8: ldxdw r1, [r10 - 0x3c0]
08e8f0: stxdw [r10 - 0x380], r1
08e8f8: mov64 r1, r10
08e900: add64 r1, -0x588
08e908: mov64 r4, r10
08e910: add64 r4, -0x3b8
08e918: call 0xe916 ; call 0x1031d0
08e920: ldxdw r1, [r10 - 0x588]
08e928: ldxdw r2, [r10 - 0x580]
08e930: ja +0x83 ; branch 0x8ed50
08e938: ldxdw r1, [r9 + 0xa0]
08e940: stxdw [r10 - 0x3e0], r1
08e948: ldxdw r1, [r9 + 0x98]
08e950: stxdw [r10 - 0x3e8], r1
08e958: ldxdw r1, [r9 + 0x90]
08e960: stxdw [r10 - 0x3f0], r1
08e968: ldxdw r1, [r9 + 0x88]
08e970: stxdw [r10 - 0x3f8], r1
08e978: ldxdw r1, [r10 - 0x850]
08e980: ldxdw r1, [r1 + 0x20]
08e988: ldxdw r1, [r1 + 0x0]
08e990: ldxdw r2, [r1 + 0x18]
08e998: stxdw [r10 - 0x3c0], r2
08e9a0: ldxdw r2, [r1 + 0x10]
08e9a8: stxdw [r10 - 0x3c8], r2
08e9b0: ldxdw r2, [r1 + 0x8]
08e9b8: stxdw [r10 - 0x3d0], r2
08e9c0: ldxdw r1, [r1 + 0x0]
08e9c8: stxdw [r10 - 0x3d8], r1
08e9d0: mov64 r1, r10
08e9d8: add64 r1, -0x3f8
08e9e0: mov64 r2, r10
08e9e8: add64 r2, -0x3d8
08e9f0: mov64 r3, 0x20
08e9f8: call 0x115dc ; call 0x1198e0
08ea00: lsh64 r0, 0x20
08ea08: rsh64 r0, 0x20
08ea10: jeq r0, 0x0, +0x26 ; branch 0x8eb48
08ea18: mov64 r1, r10
08ea20: add64 r1, -0x598
08ea28: mov64 r2, 0xe
08ea30: call -0x2812 ; call 0x7a9a8
08ea38: ldxdw r3, [r10 - 0x590]
08ea40: ldxdw r2, [r10 - 0x598]
08ea48: mov64 r1, r10
08ea50: add64 r1, -0x5a8
08ea58: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
08ea68: mov64 r5, 0x4
08ea70: call -0x119a0 ; call 0x1d78
08ea78: ldxdw r3, [r10 - 0x5a0]
08ea80: ldxdw r2, [r10 - 0x5a8]
08ea88: ldxdw r1, [r10 - 0x3e0]
08ea90: stxdw [r10 - 0x3a0], r1
08ea98: ldxdw r1, [r10 - 0x3e8]
08eaa0: stxdw [r10 - 0x3a8], r1
08eaa8: ldxdw r1, [r10 - 0x3f0]
08eab0: stxdw [r10 - 0x3b0], r1
08eab8: ldxdw r1, [r10 - 0x3f8]
08eac0: stxdw [r10 - 0x3b8], r1
08eac8: ldxdw r1, [r10 - 0x3d8]
08ead0: stxdw [r10 - 0x398], r1
08ead8: ldxdw r1, [r10 - 0x3d0]
08eae0: stxdw [r10 - 0x390], r1
08eae8: ldxdw r1, [r10 - 0x3c8]
08eaf0: stxdw [r10 - 0x388], r1
08eaf8: ldxdw r1, [r10 - 0x3c0]
08eb00: stxdw [r10 - 0x380], r1
08eb08: mov64 r1, r10
08eb10: add64 r1, -0x5b8
08eb18: mov64 r4, r10
08eb20: add64 r4, -0x3b8
08eb28: call 0xe8d4 ; call 0x1031d0
08eb30: ldxdw r1, [r10 - 0x5b8]
08eb38: ldxdw r2, [r10 - 0x5b0]
08eb40: ja +0x41 ; branch 0x8ed50
08eb48: ldxdw r1, [r9 + 0xc0]
08eb50: stxdw [r10 - 0x3e0], r1
08eb58: ldxdw r1, [r9 + 0xb8]
08eb60: stxdw [r10 - 0x3e8], r1
08eb68: ldxdw r1, [r9 + 0xb0]
08eb70: stxdw [r10 - 0x3f0], r1
08eb78: ldxdw r1, [r9 + 0xa8]
08eb80: stxdw [r10 - 0x3f8], r1
08eb88: ldxdw r1, [r10 - 0x830]
08eb90: ldxdw r1, [r1 + 0x20]
08eb98: ldxdw r1, [r1 + 0x0]
08eba0: ldxdw r2, [r1 + 0x18]
08eba8: stxdw [r10 - 0x3c0], r2
08ebb0: ldxdw r2, [r1 + 0x10]
08ebb8: stxdw [r10 - 0x3c8], r2
08ebc0: ldxdw r2, [r1 + 0x8]
08ebc8: stxdw [r10 - 0x3d0], r2
08ebd0: ldxdw r1, [r1 + 0x0]
08ebd8: stxdw [r10 - 0x3d8], r1
08ebe0: mov64 r1, r10
08ebe8: add64 r1, -0x3f8
08ebf0: mov64 r2, r10
08ebf8: add64 r2, -0x3d8
08ec00: mov64 r3, 0x20
08ec08: call 0x1159a ; call 0x1198e0
08ec10: lsh64 r0, 0x20
08ec18: rsh64 r0, 0x20
08ec20: jeq r0, 0x0, +0x49 ; branch 0x8ee70
08ec28: mov64 r1, r10
08ec30: add64 r1, -0x5c8
08ec38: mov64 r2, 0xf
08ec40: call -0x2854 ; call 0x7a9a8
08ec48: ldxdw r3, [r10 - 0x5c0]
08ec50: ldxdw r2, [r10 - 0x5c8]
08ec58: mov64 r1, r10
08ec60: add64 r1, -0x5d8
08ec68: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
08ec78: mov64 r5, 0x4
08ec80: call -0x119e2 ; call 0x1d78
08ec88: ldxdw r3, [r10 - 0x5d0]
08ec90: ldxdw r2, [r10 - 0x5d8]
08ec98: ldxdw r1, [r10 - 0x3e0]
08eca0: stxdw [r10 - 0x3a0], r1
08eca8: ldxdw r1, [r10 - 0x3e8]
08ecb0: stxdw [r10 - 0x3a8], r1
08ecb8: ldxdw r1, [r10 - 0x3f0]
08ecc0: stxdw [r10 - 0x3b0], r1
08ecc8: ldxdw r1, [r10 - 0x3f8]
08ecd0: stxdw [r10 - 0x3b8], r1
08ecd8: ldxdw r1, [r10 - 0x3d8]
08ece0: stxdw [r10 - 0x398], r1
08ece8: ldxdw r1, [r10 - 0x3d0]
08ecf0: stxdw [r10 - 0x390], r1
08ecf8: ldxdw r1, [r10 - 0x3c8]
08ed00: stxdw [r10 - 0x388], r1
08ed08: ldxdw r1, [r10 - 0x3c0]
08ed10: stxdw [r10 - 0x380], r1
08ed18: mov64 r1, r10
08ed20: add64 r1, -0x5e8
08ed28: mov64 r4, r10
08ed30: add64 r4, -0x3b8
08ed38: call 0xe892 ; call 0x1031d0
08ed40: ldxdw r1, [r10 - 0x5e8]
08ed48: ldxdw r2, [r10 - 0x5e0]
08ed50: stxdw [r6 + 0x8], r2
08ed58: stxdw [r6 + 0x0], r1
08ed60: stb [r6 + 0xb2], 0x2
08ed68: ldxdw r7, [r10 - 0x890]
08ed70: ldxdw r3, [r10 - 0x878]
08ed78: ldxdw r1, [r3 + 0x0]
08ed80: add64 r1, -0x1
08ed88: stxdw [r3 + 0x0], r1
08ed90: ldxdw r2, [r10 - 0x860]
08ed98: jne r1, 0x0, +0x3 ; branch 0x8edb8
08eda0: ldxdw r1, [r3 + 0x8]
08eda8: add64 r1, -0x1
08edb0: stxdw [r3 + 0x8], r1
08edb8: ldxdw r3, [r10 - 0x880]
08edc0: ldxdw r1, [r3 + 0x0]
08edc8: add64 r1, -0x1
08edd0: stxdw [r3 + 0x0], r1
08edd8: jne r1, 0x0, +0x3 ; branch 0x8edf8
08ede0: ldxdw r1, [r3 + 0x8]
08ede8: add64 r1, -0x1
08edf0: stxdw [r3 + 0x8], r1
08edf8: ldxdw r1, [r7 + 0x0]
08ee00: add64 r1, -0x1
08ee08: stxdw [r7 + 0x0], r1
08ee10: jne r1, 0x0, +0x3 ; branch 0x8ee30
08ee18: ldxdw r1, [r7 + 0x8]
08ee20: add64 r1, -0x1
08ee28: stxdw [r7 + 0x8], r1
08ee30: ldxdw r1, [r2 + 0x0]
08ee38: add64 r1, -0x1
08ee40: stxdw [r2 + 0x0], r1
08ee48: jne r1, 0x0, -0x15e ; branch 0x8e360
08ee50: ldxdw r1, [r2 + 0x8]
08ee58: add64 r1, -0x1
08ee60: stxdw [r2 + 0x8], r1
08ee68: ja -0x162 ; branch 0x8e360
08ee70: ldxdw r1, [r10 - 0x810]
08ee78: ldxb r1, [r1 + 0x29]
08ee80: jeq r1, 0x0, +0x4f ; branch 0x8f100
08ee88: mov64 r1, r10
08ee90: add64 r1, -0x3b8
08ee98: lddw r2, 0x122a00 ; rodata b"\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9a\xcc\x11\x00.\x00\x00\x00\x00\x00\x00\x00\xe9\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00"
08eea8: mov64 r3, 0x1
08eeb0: ldxdw r4, [r10 - 0x800]
08eeb8: call 0xfe35 ; call 0x10e068
08eec0: ldxdw r1, [r10 - 0x3a0]
08eec8: stxdw [r10 - 0x460], r1
08eed0: ldxdw r1, [r10 - 0x3a8]
08eed8: stxdw [r10 - 0x468], r1
08eee0: ldxdw r1, [r10 - 0x3b0]
08eee8: stxdw [r10 - 0x470], r1
08eef0: ldxdw r1, [r10 - 0x3b8]
08eef8: stxdw [r10 - 0x478], r1
08ef00: ldxb r1, [r10 - 0x398]
08ef08: ldxdw r2, [r10 - 0x808]
08ef10: stxb [r2 + 0x0], r1
08ef18: ldxdw r1, [r10 - 0x818]
08ef20: ldxdw r1, [r1 + 0x0]
08ef28: ldxdw r1, [r1 + 0x0]
08ef30: ldxdw r2, [r1 + 0x18]
08ef38: stxdw [r10 - 0x3a0], r2
08ef40: ldxdw r2, [r1 + 0x10]
08ef48: stxdw [r10 - 0x3a8], r2
08ef50: ldxdw r2, [r1 + 0x8]
08ef58: stxdw [r10 - 0x3b0], r2
08ef60: ldxdw r1, [r1 + 0x0]
08ef68: stxdw [r10 - 0x3b8], r1
08ef70: mov64 r1, r10
08ef78: add64 r1, -0x3b8
08ef80: mov64 r2, r10
08ef88: add64 r2, -0x478
08ef90: mov64 r3, 0x20
08ef98: call 0x11528 ; call 0x1198e0
08efa0: lsh64 r0, 0x20
08efa8: rsh64 r0, 0x20
08efb0: jeq r0, 0x0, +0x38 ; branch 0x8f178
08efb8: mov64 r1, r10
08efc0: add64 r1, -0x5f8
08efc8: mov64 r2, 0x7d6
08efd0: call 0xedcc ; call 0x105e38
08efd8: ldxdw r3, [r10 - 0x5f0]
08efe0: ldxdw r2, [r10 - 0x5f8]
08efe8: mov64 r1, r10
08eff0: add64 r1, -0x608
08eff8: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
08f008: mov64 r5, 0xd
08f010: call -0x11a54 ; call 0x1d78
08f018: ldxdw r3, [r10 - 0x600]
08f020: ldxdw r2, [r10 - 0x608]
08f028: ldxdw r1, [r10 - 0x818]
08f030: ldxdw r1, [r1 + 0x0]
08f038: ldxdw r1, [r1 + 0x0]
08f040: ldxdw r4, [r1 + 0x0]
08f048: ldxdw r5, [r1 + 0x8]
08f050: ldxdw r0, [r1 + 0x10]
08f058: ldxdw r1, [r1 + 0x18]
08f060: ldxdw r7, [r10 - 0x478]
08f068: stxdw [r10 - 0x398], r7
08f070: ldxdw r7, [r10 - 0x470]
08f078: stxdw [r10 - 0x390], r7
08f080: ldxdw r7, [r10 - 0x468]
08f088: stxdw [r10 - 0x388], r7
08f090: ldxdw r7, [r10 - 0x460]
08f098: stxdw [r10 - 0x380], r7
08f0a0: stxdw [r10 - 0x3a0], r1
08f0a8: stxdw [r10 - 0x3a8], r0
08f0b0: stxdw [r10 - 0x3b0], r5
08f0b8: stxdw [r10 - 0x3b8], r4
08f0c0: mov64 r1, r10
08f0c8: add64 r1, -0x618
08f0d0: mov64 r4, r10
08f0d8: add64 r4, -0x3b8
08f0e0: call 0xe81d ; call 0x1031d0
08f0e8: ldxdw r1, [r10 - 0x618]
08f0f0: ldxdw r2, [r10 - 0x610]
08f0f8: ja -0x76 ; branch 0x8ed50
08f100: mov64 r1, r10
08f108: add64 r1, -0x778
08f110: mov64 r2, 0x7d0
08f118: call 0xeda3 ; call 0x105e38
08f120: ldxdw r3, [r10 - 0x770]
08f128: ldxdw r2, [r10 - 0x778]
08f130: mov64 r1, r10
08f138: add64 r1, -0x788
08f140: lddw r4, 0x11e1e9 ; rodata b'authoritybase_token_programcoin_creator_vault_atacoin_creator_token_account'
08f150: mov64 r5, 0x9
08f158: call -0x11a7d ; call 0x1d78
08f160: ldxdw r1, [r10 - 0x788]
08f168: ldxdw r2, [r10 - 0x780]
08f170: ja -0x85 ; branch 0x8ed50
08f178: ldxdw r1, [r10 - 0x820]
08f180: ldxdw r1, [r1 + 0x58]
08f188: ldxb r1, [r1 + 0x29]
08f190: jeq r1, 0x0, +0x17 ; branch 0x8f250
08f198: ldxdw r1, [r10 - 0x850]
08f1a0: ldxdw r1, [r1 + 0x20]
08f1a8: ldxb r1, [r1 + 0x29]
08f1b0: jeq r1, 0x0, +0x75 ; branch 0x8f560
08f1b8: ldxdw r1, [r10 - 0x830]
08f1c0: ldxdw r1, [r1 + 0x20]
08f1c8: ldxb r1, [r1 + 0x29]
08f1d0: jne r1, 0x0, +0x1e ; branch 0x8f2c8
08f1d8: mov64 r1, r10
08f1e0: add64 r1, -0x718
08f1e8: mov64 r2, 0x7d0
08f1f0: call 0xed88 ; call 0x105e38
08f1f8: ldxdw r3, [r10 - 0x710]
08f200: ldxdw r2, [r10 - 0x718]
08f208: mov64 r1, r10
08f210: add64 r1, -0x728
08f218: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
08f228: mov64 r5, 0x18
08f230: call -0x11a98 ; call 0x1d78
08f238: ldxdw r1, [r10 - 0x728]
08f240: ldxdw r2, [r10 - 0x720]
08f248: ja -0xa0 ; branch 0x8ed50
08f250: mov64 r1, r10
08f258: add64 r1, -0x758
08f260: mov64 r2, 0x7d0
08f268: call 0xed79 ; call 0x105e38
08f270: ldxdw r3, [r10 - 0x750]
08f278: ldxdw r2, [r10 - 0x758]
08f280: mov64 r1, r10
08f288: add64 r1, -0x768
08f290: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
08f2a0: mov64 r5, 0x9
08f2a8: call -0x11aa7 ; call 0x1d78
08f2b0: ldxdw r1, [r10 - 0x768]
08f2b8: ldxdw r2, [r10 - 0x760]
08f2c0: ja -0xaf ; branch 0x8ed50
08f2c8: ldxdw r1, [r9 + 0x0]
08f2d0: ldxdw r1, [r1 + 0x0]
08f2d8: ldxdw r2, [r1 + 0x0]
08f2e0: ldxdw r3, [r1 + 0x8]
08f2e8: ldxdw r4, [r1 + 0x10]
08f2f0: ldxdw r1, [r1 + 0x18]
08f2f8: lddw r5, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
08f308: stxdw [r10 - 0x3f8], r5
08f310: mov64 r5, r10
08f318: add64 r5, -0x3d8
08f320: stxdw [r10 - 0x3e8], r5
08f328: stxdw [r10 - 0x3c0], r1
08f330: stxdw [r10 - 0x3c8], r4
08f338: stxdw [r10 - 0x3d0], r3
08f340: stxdw [r10 - 0x3d8], r2
08f348: stdw [r10 - 0x3f0], 0xb
08f350: stdw [r10 - 0x3e0], 0x20
08f358: mov64 r1, r10
08f360: add64 r1, -0x3b8
08f368: mov64 r2, r10
08f370: add64 r2, -0x3f8
08f378: mov64 r3, 0x2
08f380: ldxdw r4, [r10 - 0x800]
08f388: call 0xfd9b ; call 0x10e068
08f390: ldxdw r1, [r10 - 0x3a0]
08f398: stxdw [r10 - 0x440], r1
08f3a0: ldxdw r1, [r10 - 0x3a8]
08f3a8: stxdw [r10 - 0x448], r1
08f3b0: ldxdw r1, [r10 - 0x3b0]
08f3b8: stxdw [r10 - 0x450], r1
08f3c0: ldxdw r1, [r10 - 0x3b8]
08f3c8: stxdw [r10 - 0x458], r1
08f3d0: ldxb r1, [r10 - 0x398]
08f3d8: ldxdw r2, [r10 - 0x808]
08f3e0: stxb [r2 + 0x1], r1
08f3e8: ldxdw r1, [r10 - 0x838]
08f3f0: ldxdw r7, [r1 + 0x0]
08f3f8: ldxdw r1, [r7 + 0x18]
08f400: stxdw [r10 - 0x3a0], r1
08f408: ldxdw r1, [r7 + 0x10]
08f410: stxdw [r10 - 0x3a8], r1
08f418: ldxdw r1, [r7 + 0x8]
08f420: stxdw [r10 - 0x3b0], r1
08f428: ldxdw r1, [r7 + 0x0]
08f430: stxdw [r10 - 0x3b8], r1
08f438: mov64 r1, r10
08f440: add64 r1, -0x3b8
08f448: mov64 r2, r10
08f450: add64 r2, -0x458
08f458: mov64 r3, 0x20
08f460: call 0x1148f ; call 0x1198e0
08f468: lsh64 r0, 0x20
08f470: rsh64 r0, 0x20
08f478: jne r0, 0x0, +0x2b ; branch 0x8f5d8
08f480: ldxdw r1, [r10 - 0x840]
08f488: ldxdw r1, [r1 + 0x20]
08f490: ldxdw r2, [r10 - 0x858]
08f498: ldxdw r3, [r2 + 0x0]
08f4a0: ldxdw r2, [r3 + 0x18]
08f4a8: stxdw [r10 - 0x3a0], r2
08f4b0: ldxdw r2, [r3 + 0x10]
08f4b8: stxdw [r10 - 0x3a8], r2
08f4c0: ldxdw r2, [r3 + 0x8]
08f4c8: stxdw [r10 - 0x3b0], r2
08f4d0: stxdw [r10 - 0x898], r3
08f4d8: ldxdw r2, [r3 + 0x0]
08f4e0: stxdw [r10 - 0x3b8], r2
08f4e8: ldxdw r1, [r1 + 0x18]
08f4f0: mov64 r2, r10
08f4f8: add64 r2, -0x3b8
08f500: mov64 r3, 0x20
08f508: call 0x1147a ; call 0x1198e0
08f510: lsh64 r0, 0x20
08f518: rsh64 r0, 0x20
08f520: jeq r0, 0x0, +0x3c ; branch 0x8f708
08f528: mov64 r1, r10
08f530: add64 r1, -0x658
08f538: mov64 r2, 0x7e7
08f540: call 0xed1e ; call 0x105e38
08f548: ldxdw r1, [r10 - 0x658]
08f550: ldxdw r2, [r10 - 0x650]
08f558: ja -0x102 ; branch 0x8ed50
08f560: mov64 r1, r10
08f568: add64 r1, -0x738
08f570: mov64 r2, 0x7d0
08f578: call 0xed17 ; call 0x105e38
08f580: ldxdw r3, [r10 - 0x730]
08f588: ldxdw r2, [r10 - 0x738]
08f590: mov64 r1, r10
08f598: add64 r1, -0x748
08f5a0: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
08f5b0: mov64 r5, 0x17
08f5b8: call -0x11b09 ; call 0x1d78
08f5c0: ldxdw r1, [r10 - 0x748]
08f5c8: ldxdw r2, [r10 - 0x740]
08f5d0: ja -0x111 ; branch 0x8ed50
08f5d8: mov64 r1, r10
08f5e0: add64 r1, -0x628
08f5e8: mov64 r2, 0x7d6
08f5f0: call 0xed08 ; call 0x105e38
08f5f8: ldxdw r3, [r10 - 0x620]
08f600: ldxdw r2, [r10 - 0x628]
08f608: mov64 r1, r10
08f610: add64 r1, -0x638
08f618: lddw r4, 0x11e197 ; rodata b'boost_vault_authorityquote_token_programpool_base_token_accountquote_mintba'
08f628: mov64 r5, 0x15
08f630: call -0x11b18 ; call 0x1d78
08f638: ldxdw r3, [r10 - 0x630]
08f640: ldxdw r2, [r10 - 0x638]
08f648: ldxdw r1, [r7 + 0x18]
08f650: stxdw [r10 - 0x3a0], r1
08f658: ldxdw r1, [r7 + 0x10]
08f660: stxdw [r10 - 0x3a8], r1
08f668: ldxdw r1, [r7 + 0x8]
08f670: stxdw [r10 - 0x3b0], r1
08f678: ldxdw r1, [r7 + 0x0]
08f680: stxdw [r10 - 0x3b8], r1
08f688: ldxdw r1, [r10 - 0x458]
08f690: stxdw [r10 - 0x398], r1
08f698: ldxdw r1, [r10 - 0x450]
08f6a0: stxdw [r10 - 0x390], r1
08f6a8: ldxdw r1, [r10 - 0x448]
08f6b0: stxdw [r10 - 0x388], r1
08f6b8: ldxdw r1, [r10 - 0x440]
08f6c0: stxdw [r10 - 0x380], r1
08f6c8: mov64 r1, r10
08f6d0: add64 r1, -0x648
08f6d8: mov64 r4, r10
08f6e0: add64 r4, -0x3b8
08f6e8: call 0xe75c ; call 0x1031d0
08f6f0: ldxdw r1, [r10 - 0x648]
08f6f8: ldxdw r2, [r10 - 0x640]
08f700: ja -0x137 ; branch 0x8ed50
08f708: ldxdw r2, [r10 - 0x840]
08f710: ldxdw r1, [r2 + 0x60]
08f718: stxdw [r10 - 0x420], r1
08f720: ldxdw r1, [r2 + 0x58]
08f728: stxdw [r10 - 0x428], r1
08f730: ldxdw r1, [r2 + 0x50]
08f738: stxdw [r10 - 0x430], r1
08f740: ldxdw r1, [r2 + 0x48]
08f748: stxdw [r10 - 0x438], r1
08f750: ldxdw r1, [r7 + 0x18]
08f758: stxdw [r10 - 0x400], r1
08f760: ldxdw r1, [r7 + 0x10]
08f768: stxdw [r10 - 0x408], r1
08f770: ldxdw r1, [r7 + 0x8]
08f778: stxdw [r10 - 0x410], r1
08f780: ldxdw r1, [r7 + 0x0]
08f788: stxdw [r10 - 0x418], r1
08f790: mov64 r1, r10
08f798: add64 r1, -0x438
08f7a0: mov64 r2, r10
08f7a8: add64 r2, -0x418
08f7b0: mov64 r3, 0x20
08f7b8: call 0x11424 ; call 0x1198e0
08f7c0: lsh64 r0, 0x20
08f7c8: rsh64 r0, 0x20
08f7d0: jeq r0, 0x0, +0x26 ; branch 0x8f908
08f7d8: mov64 r1, r10
08f7e0: add64 r1, -0x668
08f7e8: mov64 r2, 0x7df
08f7f0: call 0xecc8 ; call 0x105e38
08f7f8: ldxdw r3, [r10 - 0x660]
08f800: ldxdw r2, [r10 - 0x668]
08f808: mov64 r1, r10
08f810: add64 r1, -0x678
08f818: lddw r4, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
08f828: mov64 r5, 0xb
08f830: call -0x11b58 ; call 0x1d78
08f838: ldxdw r3, [r10 - 0x670]
08f840: ldxdw r2, [r10 - 0x678]
08f848: ldxdw r1, [r10 - 0x420]
08f850: stxdw [r10 - 0x3a0], r1
08f858: ldxdw r1, [r10 - 0x428]
08f860: stxdw [r10 - 0x3a8], r1
08f868: ldxdw r1, [r10 - 0x430]
08f870: stxdw [r10 - 0x3b0], r1
08f878: ldxdw r1, [r10 - 0x438]
08f880: stxdw [r10 - 0x3b8], r1
08f888: ldxdw r1, [r10 - 0x418]
08f890: stxdw [r10 - 0x398], r1
08f898: ldxdw r1, [r10 - 0x410]
08f8a0: stxdw [r10 - 0x390], r1
08f8a8: ldxdw r1, [r10 - 0x408]
08f8b0: stxdw [r10 - 0x388], r1
08f8b8: ldxdw r1, [r10 - 0x400]
08f8c0: stxdw [r10 - 0x380], r1
08f8c8: mov64 r1, r10
08f8d0: add64 r1, -0x688
08f8d8: mov64 r4, r10
08f8e0: add64 r4, -0x3b8
08f8e8: call 0xe71c ; call 0x1031d0
08f8f0: ldxdw r1, [r10 - 0x688]
08f8f8: ldxdw r2, [r10 - 0x680]
08f900: ja -0x177 ; branch 0x8ed50
08f908: ldxdw r1, [r10 - 0x828]
08f910: ldxdw r1, [r1 + 0x58]
08f918: ldxdw r1, [r1 + 0x0]
08f920: ldxdw r2, [r1 + 0x18]
08f928: stxdw [r10 - 0x3c0], r2
08f930: ldxdw r2, [r1 + 0x10]
08f938: stxdw [r10 - 0x3c8], r2
08f940: ldxdw r2, [r1 + 0x8]
08f948: stxdw [r10 - 0x3d0], r2
08f950: ldxdw r1, [r1 + 0x0]
08f958: stxdw [r10 - 0x3d8], r1
08f960: ldxdw r2, [r10 - 0x898]
08f968: ldxdw r1, [r2 + 0x18]
08f970: stxdw [r10 - 0x3a0], r1
08f978: ldxdw r1, [r2 + 0x10]
08f980: stxdw [r10 - 0x3a8], r1
08f988: ldxdw r1, [r2 + 0x8]
08f990: stxdw [r10 - 0x3b0], r1
08f998: ldxdw r1, [r2 + 0x0]
08f9a0: stxdw [r10 - 0x3b8], r1
08f9a8: mov64 r1, r10
08f9b0: add64 r1, -0x3f8
08f9b8: stxdw [r10 - 0x898], r1
08f9c0: mov64 r2, r10
08f9c8: add64 r2, -0x418
08f9d0: mov64 r3, r10
08f9d8: add64 r3, -0x3d8
08f9e0: mov64 r4, r10
08f9e8: add64 r4, -0x3b8
08f9f0: call 0xe1ec ; call 0x100958
08f9f8: ldxdw r1, [r10 - 0x840]
08fa00: ldxdw r7, [r1 + 0x20]
08fa08: ldxdw r1, [r7 + 0x0]
08fa10: ldxdw r2, [r1 + 0x18]
08fa18: stxdw [r10 - 0x3c0], r2
08fa20: ldxdw r2, [r1 + 0x10]
08fa28: stxdw [r10 - 0x3c8], r2
08fa30: ldxdw r2, [r1 + 0x8]
08fa38: stxdw [r10 - 0x3d0], r2
08fa40: ldxdw r1, [r1 + 0x0]
08fa48: stxdw [r10 - 0x3d8], r1
08fa50: mov64 r1, r10
08fa58: add64 r1, -0x3d8
08fa60: ldxdw r2, [r10 - 0x898]
08fa68: mov64 r3, 0x20
08fa70: call 0x113cd ; call 0x1198e0
08fa78: lsh64 r0, 0x20
08fa80: rsh64 r0, 0x20
08fa88: jeq r0, 0x0, +0x26 ; branch 0x8fbc0
08fa90: mov64 r1, r10
08fa98: add64 r1, -0x698
08faa0: mov64 r2, 0x7d9
08faa8: call 0xec71 ; call 0x105e38
08fab0: ldxdw r3, [r10 - 0x690]
08fab8: ldxdw r2, [r10 - 0x698]
08fac0: mov64 r1, r10
08fac8: add64 r1, -0x6a8
08fad0: lddw r4, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
08fae0: mov64 r5, 0xb
08fae8: call -0x11baf ; call 0x1d78
08faf0: ldxdw r3, [r10 - 0x6a0]
08faf8: ldxdw r2, [r10 - 0x6a8]
08fb00: ldxdw r1, [r10 - 0x3c0]
08fb08: stxdw [r10 - 0x3a0], r1
08fb10: ldxdw r1, [r10 - 0x3c8]
08fb18: stxdw [r10 - 0x3a8], r1
08fb20: ldxdw r1, [r10 - 0x3d0]
08fb28: stxdw [r10 - 0x3b0], r1
08fb30: ldxdw r1, [r10 - 0x3d8]
08fb38: stxdw [r10 - 0x3b8], r1
08fb40: ldxdw r1, [r10 - 0x3f8]
08fb48: stxdw [r10 - 0x398], r1
08fb50: ldxdw r1, [r10 - 0x3f0]
08fb58: stxdw [r10 - 0x390], r1
08fb60: ldxdw r1, [r10 - 0x3e8]
08fb68: stxdw [r10 - 0x388], r1
08fb70: ldxdw r1, [r10 - 0x3e0]
08fb78: stxdw [r10 - 0x380], r1
08fb80: mov64 r1, r10
08fb88: add64 r1, -0x6b8
08fb90: mov64 r4, r10
08fb98: add64 r4, -0x3b8
08fba0: call 0xe6c5 ; call 0x1031d0
08fba8: ldxdw r1, [r10 - 0x6b8]
08fbb0: ldxdw r2, [r10 - 0x6b0]
08fbb8: ja -0x1ce ; branch 0x8ed50
08fbc0: ldxb r1, [r7 + 0x29]
08fbc8: jeq r1, 0x0, +0x4b ; branch 0x8fe28
08fbd0: mov64 r1, r10
08fbd8: add64 r1, -0x3b8
08fbe0: lddw r2, 0x1229d0 ; rodata b"\x00\x00\x00\x00F\xc6\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00"
08fbf0: mov64 r3, 0x1
08fbf8: ldxdw r4, [r10 - 0x800]
08fc00: call 0xfc8c ; call 0x10e068
08fc08: ldxdw r1, [r10 - 0x3a0]
08fc10: stxdw [r10 - 0x3c0], r1
08fc18: ldxdw r1, [r10 - 0x3a8]
08fc20: stxdw [r10 - 0x3c8], r1
08fc28: ldxdw r1, [r10 - 0x3b0]
08fc30: stxdw [r10 - 0x3d0], r1
08fc38: ldxdw r1, [r10 - 0x3b8]
08fc40: stxdw [r10 - 0x3d8], r1
08fc48: ldxb r1, [r10 - 0x398]
08fc50: ldxdw r2, [r10 - 0x808]
08fc58: stxb [r2 + 0x2], r1
08fc60: ldxdw r2, [r10 - 0x868]
08fc68: ldxdw r1, [r2 + 0x18]
08fc70: stxdw [r10 - 0x3a0], r1
08fc78: ldxdw r1, [r2 + 0x10]
08fc80: stxdw [r10 - 0x3a8], r1
08fc88: ldxdw r1, [r2 + 0x8]
08fc90: stxdw [r10 - 0x3b0], r1
08fc98: ldxdw r1, [r2 + 0x0]
08fca0: stxdw [r10 - 0x3b8], r1
08fca8: mov64 r1, r10
08fcb0: add64 r1, -0x3b8
08fcb8: mov64 r2, r10
08fcc0: add64 r2, -0x3d8
08fcc8: mov64 r3, 0x20
08fcd0: call 0x11381 ; call 0x1198e0
08fcd8: lsh64 r0, 0x20
08fce0: rsh64 r0, 0x20
08fce8: jeq r0, 0x0, +0x36 ; branch 0x8fea0
08fcf0: mov64 r1, r10
08fcf8: add64 r1, -0x6c8
08fd00: mov64 r2, 0x7d6
08fd08: call 0xec25 ; call 0x105e38
08fd10: ldxdw r3, [r10 - 0x6c0]
08fd18: ldxdw r2, [r10 - 0x6c8]
08fd20: mov64 r1, r10
08fd28: add64 r1, -0x6d8
08fd30: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
08fd40: mov64 r5, 0xf
08fd48: call -0x11bfb ; call 0x1d78
08fd50: ldxdw r3, [r10 - 0x6d0]
08fd58: ldxdw r2, [r10 - 0x6d8]
08fd60: ldxdw r4, [r10 - 0x868]
08fd68: ldxdw r1, [r4 + 0x18]
08fd70: stxdw [r10 - 0x3a0], r1
08fd78: ldxdw r1, [r4 + 0x10]
08fd80: stxdw [r10 - 0x3a8], r1
08fd88: ldxdw r1, [r4 + 0x8]
08fd90: stxdw [r10 - 0x3b0], r1
08fd98: ldxdw r1, [r4 + 0x0]
08fda0: stxdw [r10 - 0x3b8], r1
08fda8: ldxdw r1, [r10 - 0x3d8]
08fdb0: stxdw [r10 - 0x398], r1
08fdb8: ldxdw r1, [r10 - 0x3d0]
08fdc0: stxdw [r10 - 0x390], r1
08fdc8: ldxdw r1, [r10 - 0x3c8]
08fdd0: stxdw [r10 - 0x388], r1
08fdd8: ldxdw r1, [r10 - 0x3c0]
08fde0: stxdw [r10 - 0x380], r1
08fde8: mov64 r1, r10
08fdf0: add64 r1, -0x6e8
08fdf8: mov64 r4, r10
08fe00: add64 r4, -0x3b8
08fe08: call 0xe678 ; call 0x1031d0
08fe10: ldxdw r1, [r10 - 0x6e8]
08fe18: ldxdw r2, [r10 - 0x6e0]
08fe20: ja -0x21b ; branch 0x8ed50
08fe28: mov64 r1, r10
08fe30: add64 r1, -0x6f8
08fe38: mov64 r2, 0x7d0
08fe40: call 0xebfe ; call 0x105e38
08fe48: ldxdw r3, [r10 - 0x6f0]
08fe50: ldxdw r2, [r10 - 0x6f8]
08fe58: mov64 r1, r10
08fe60: add64 r1, -0x708
08fe68: lddw r4, 0x11c7f4 ; rodata b'boost_vaultprograms/pump-amm/src/instructions/coin_creator/collect_coin_cre'
08fe78: mov64 r5, 0xb
08fe80: call -0x11c22 ; call 0x1d78
08fe88: ldxdw r1, [r10 - 0x708]
08fe90: ldxdw r2, [r10 - 0x700]
08fe98: ja -0x22a ; branch 0x8ed50
08fea0: ldxh r1, [r10 - 0x4a0]
08fea8: stxh [r6 + 0x80], r1
08feb0: ldxdw r1, [r10 - 0x4a8]
08feb8: stxdw [r6 + 0x78], r1
08fec0: ldxdw r1, [r10 - 0x4b0]
08fec8: stxdw [r6 + 0x70], r1
08fed0: ldxb r1, [r10 - 0x4b4]
08fed8: stxb [r6 + 0x87], r1
08fee0: ldxw r1, [r10 - 0x4b8]
08fee8: stxw [r6 + 0x83], r1
08fef0: ldxdw r1, [r10 - 0x490]
08fef8: stxdw [r6 + 0xa0], r1
08ff00: ldxdw r1, [r10 - 0x488]
08ff08: stxdw [r6 + 0xa8], r1
08ff10: ldxh r1, [r10 - 0x480]
08ff18: stxh [r6 + 0xb0], r1
08ff20: ldxb r1, [r10 - 0x494]
08ff28: stxb [r6 + 0xb7], r1
08ff30: ldxw r1, [r10 - 0x498]
08ff38: stxw [r6 + 0xb3], r1
08ff40: ldxdw r1, [r10 - 0x870]
08ff48: stxb [r6 + 0x82], r1
08ff50: stxdw [r6 + 0x0], r9
08ff58: ldxdw r1, [r10 - 0x810]
08ff60: stxdw [r6 + 0x8], r1
08ff68: ldxdw r1, [r10 - 0x818]
08ff70: stxdw [r6 + 0x10], r1
08ff78: ldxdw r1, [r10 - 0x820]
08ff80: stxdw [r6 + 0x18], r1
08ff88: ldxdw r1, [r10 - 0x828]
08ff90: stxdw [r6 + 0x20], r1
08ff98: ldxdw r1, [r10 - 0x850]
08ffa0: stxdw [r6 + 0x28], r1
08ffa8: ldxdw r1, [r10 - 0x830]
08ffb0: stxdw [r6 + 0x30], r1
08ffb8: ldxdw r1, [r10 - 0x838]
08ffc0: stxdw [r6 + 0x38], r1
08ffc8: ldxdw r1, [r10 - 0x840]
08ffd0: stxdw [r6 + 0x40], r1
08ffd8: ldxdw r1, [r10 - 0x848]
08ffe0: stxdw [r6 + 0x48], r1
08ffe8: ldxdw r1, [r10 - 0x858]
08fff0: stxdw [r6 + 0x50], r1
08fff8: ldxdw r1, [r10 - 0x868]
090000: stxdw [r6 + 0x58], r1
090008: ldxdw r1, [r10 - 0x890]
090010: stxdw [r6 + 0x60], r1
090018: ldxdw r1, [r10 - 0x860]
090020: stxdw [r6 + 0x68], r1
090028: ldxdw r1, [r10 - 0x888]
090030: stxdw [r6 + 0x88], r1
090038: ldxdw r1, [r10 - 0x878]
090040: stxdw [r6 + 0x90], r1
090048: ldxdw r1, [r10 - 0x880]
090050: stxdw [r6 + 0x98], r1
090058: stxb [r6 + 0xb2], r8
090060: ja -0x3a1 ; branch 0x8e360
