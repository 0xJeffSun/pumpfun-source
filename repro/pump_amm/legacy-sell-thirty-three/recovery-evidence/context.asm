0bfa90: mov64 r7, r5
0bfa98: mov64 r9, r3
0bfaa0: mov64 r8, r2
0bfaa8: mov64 r6, r1
0bfab0: mov64 r1, r10
0bfab8: add64 r1, -0x3b8
0bfac0: mov64 r2, r9
0bfac8: call -0x15f0e ; call 0x10260
0bfad0: ldxb r1, [r10 - 0x29a]
0bfad8: jeq r1, 0x2, +0x17 ; branch 0xbfb98
0bfae0: lddw r1, 0x300000000
0bfaf0: ldxdw r1, [r1 + 0x0]
0bfaf8: mov64 r3, r1
0bfb00: add64 r3, -0x120
0bfb08: mov64 r2, 0x0
0bfb10: mov64 r4, 0x1
0bfb18: jgt r3, r1, +0x1 ; branch 0xbfb28
0bfb20: mov64 r4, 0x0
0bfb28: stxdw [r10 - 0xa00], r8
0bfb30: jne r4, 0x0, +0x1 ; branch 0xbfb40
0bfb38: mov64 r2, r3
0bfb40: lddw r8, 0x300007ee0
0bfb50: jeq r1, 0x0, +0x2 ; branch 0xbfb68
0bfb58: and64 r2, -0x8
0bfb60: mov64 r8, r2
0bfb68: lddw r1, 0x300000007
0bfb78: jgt r8, r1, +0xe ; branch 0xbfbf0
0bfb80: mov64 r1, 0x8
0bfb88: mov64 r2, 0x120
0bfb90: call 0xa2f9 ; call 0x111360
0bfb98: ldxdw r3, [r10 - 0x3b0]
0bfba0: ldxdw r2, [r10 - 0x3b8]
0bfba8: mov64 r1, r10
0bfbb0: add64 r1, -0x9f8
0bfbb8: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0bfbc8: mov64 r5, 0x4
0bfbd0: call -0x17bcc ; call 0x1d78
0bfbd8: ldxdw r1, [r10 - 0x9f8]
0bfbe0: ldxdw r2, [r10 - 0x9f0]
0bfbe8: ja +0x113 ; branch 0xc0488
0bfbf0: ldxdw r7, [r7 - 0xff8]
0bfbf8: lddw r1, 0x300000000
0bfc08: stxdw [r1 + 0x0], r8
0bfc10: mov64 r2, r10
0bfc18: add64 r2, -0x3b8
0bfc20: mov64 r1, r8
0bfc28: mov64 r3, 0x120
0bfc30: call 0xb38c ; call 0x119898
0bfc38: mov64 r1, r10
0bfc40: add64 r1, -0x3b8
0bfc48: mov64 r2, r9
0bfc50: call -0x16040 ; call 0xfa58
0bfc58: ldxdw r3, [r10 - 0x3b0]
0bfc60: ldxdw r2, [r10 - 0x3b8]
0bfc68: jeq r2, 0x2, +0x1 ; branch 0xbfc78
0bfc70: ja +0x1e ; branch 0xbfd68
0bfc78: stxdw [r10 - 0x5d8], r3
0bfc80: mov64 r1, r10
0bfc88: add64 r1, -0x3b8
0bfc90: mov64 r2, r9
0bfc98: call -0x15f31 ; call 0x10318
0bfca0: ldxb r1, [r10 - 0x4]
0bfca8: jeq r1, 0x2, +0x20 ; branch 0xbfdb0
0bfcb0: lddw r1, 0x300000000
0bfcc0: ldxdw r5, [r1 + 0x0]
0bfcc8: mov64 r3, r5
0bfcd0: add64 r3, -0x3b8
0bfcd8: mov64 r2, 0x0
0bfce0: mov64 r4, 0x1
0bfce8: jgt r3, r5, +0x1 ; branch 0xbfcf8
0bfcf0: mov64 r4, 0x0
0bfcf8: jne r4, 0x0, +0x1 ; branch 0xbfd08
0bfd00: mov64 r2, r3
0bfd08: lddw r1, 0x300007c48
0bfd18: jeq r5, 0x0, +0x2 ; branch 0xbfd30
0bfd20: and64 r2, -0x8
0bfd28: mov64 r1, r2
0bfd30: stxdw [r10 - 0xa08], r7
0bfd38: lddw r2, 0x300000007
0bfd48: jgt r1, r2, +0x17 ; branch 0xbfe08
0bfd50: mov64 r1, 0x8
0bfd58: mov64 r2, 0x3b8
0bfd60: call 0xa2bf ; call 0x111360
0bfd68: mov64 r1, r10
0bfd70: add64 r1, -0x5e8
0bfd78: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0bfd88: mov64 r5, 0x4
0bfd90: call -0x17c04 ; call 0x1d78
0bfd98: ldxdw r1, [r10 - 0x5e8]
0bfda0: ldxdw r2, [r10 - 0x5e0]
0bfda8: ja +0xdb ; branch 0xc0488
0bfdb0: ldxdw r3, [r10 - 0x3b0]
0bfdb8: ldxdw r2, [r10 - 0x3b8]
0bfdc0: mov64 r1, r10
0bfdc8: add64 r1, -0x9e8
0bfdd0: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0bfde0: mov64 r5, 0xd
0bfde8: call -0x17c0f ; call 0x1d78
0bfdf0: ldxdw r1, [r10 - 0x9e8]
0bfdf8: ldxdw r2, [r10 - 0x9e0]
0bfe00: ja +0xd0 ; branch 0xc0488
0bfe08: lddw r7, 0x300000000
0bfe18: stxdw [r7 + 0x0], r1
0bfe20: mov64 r2, r10
0bfe28: add64 r2, -0x3b8
0bfe30: stxdw [r10 - 0xa10], r1
0bfe38: mov64 r3, 0x3b8
0bfe40: call 0xb34a ; call 0x119898
0bfe48: mov64 r1, r10
0bfe50: add64 r1, -0x3b8
0bfe58: mov64 r2, r9
0bfe60: call -0x17f7c ; call 0x288
0bfe68: ldxw r1, [r10 - 0x3b8]
0bfe70: jeq r1, 0x2, +0x14 ; branch 0xbff18
0bfe78: ldxdw r5, [r7 + 0x0]
0bfe80: mov64 r3, r5
0bfe88: add64 r3, -0x80
0bfe90: mov64 r2, 0x0
0bfe98: mov64 r4, 0x1
0bfea0: jgt r3, r5, +0x1 ; branch 0xbfeb0
0bfea8: mov64 r4, 0x0
0bfeb0: jne r4, 0x0, +0x1 ; branch 0xbfec0
0bfeb8: mov64 r2, r3
0bfec0: lddw r1, 0x300007f80
0bfed0: jeq r5, 0x0, +0x2 ; branch 0xbfee8
0bfed8: and64 r2, -0x8
0bfee0: mov64 r1, r2
0bfee8: lddw r2, 0x300000007
0bfef8: jgt r1, r2, +0xe ; branch 0xbff70
0bff00: mov64 r1, 0x8
0bff08: mov64 r2, 0x80
0bff10: call 0xa289 ; call 0x111360
0bff18: ldxdw r3, [r10 - 0x3a8]
0bff20: ldxdw r2, [r10 - 0x3b0]
0bff28: mov64 r1, r10
0bff30: add64 r1, -0x9d8
0bff38: lddw r4, 0x11e1e0 ; rodata b'base_mintauthoritybase_token_programcoin_creator_vault_atacoin_creator_toke'
0bff48: mov64 r5, 0x9
0bff50: call -0x17c3c ; call 0x1d78
0bff58: ldxdw r1, [r10 - 0x9d8]
0bff60: ldxdw r2, [r10 - 0x9d0]
0bff68: ja +0xa3 ; branch 0xc0488
0bff70: stxdw [r7 + 0x0], r1
0bff78: mov64 r2, r10
0bff80: add64 r2, -0x3b8
0bff88: stxdw [r10 - 0xa18], r1
0bff90: mov64 r3, 0x80
0bff98: call 0xb31f ; call 0x119898
0bffa0: mov64 r1, r10
0bffa8: add64 r1, -0x3b8
0bffb0: mov64 r2, r9
0bffb8: call -0x17fa7 ; call 0x288
0bffc0: ldxw r1, [r10 - 0x3b8]
0bffc8: jeq r1, 0x2, +0x12 ; branch 0xc0060
0bffd0: ldxdw r5, [r7 + 0x0]
0bffd8: mov64 r3, r5
0bffe0: add64 r3, -0x80
0bffe8: mov64 r2, 0x0
0bfff0: mov64 r4, 0x1
0bfff8: jgt r3, r5, +0x1 ; branch 0xc0008
0c0000: mov64 r4, 0x0
0c0008: jne r4, 0x0, +0x1 ; branch 0xc0018
0c0010: mov64 r2, r3
0c0018: lddw r1, 0x300007f80
0c0028: jeq r5, 0x0, +0x2 ; branch 0xc0040
0c0030: and64 r2, -0x8
0c0038: mov64 r1, r2
0c0040: lddw r2, 0x300000007
0c0050: jgt r1, r2, +0xc ; branch 0xc00b8
0c0058: ja -0x2c ; branch 0xbff00
0c0060: ldxdw r3, [r10 - 0x3a8]
0c0068: ldxdw r2, [r10 - 0x3b0]
0c0070: mov64 r1, r10
0c0078: add64 r1, -0x9c8
0c0080: lddw r4, 0x11e1d6 ; rodata b'quote_mintbase_mintauthoritybase_token_programcoin_creator_vault_atacoin_cr'
0c0090: mov64 r5, 0xa
0c0098: call -0x17c65 ; call 0x1d78
0c00a0: ldxdw r1, [r10 - 0x9c8]
0c00a8: ldxdw r2, [r10 - 0x9c0]
0c00b0: ja +0x7a ; branch 0xc0488
0c00b8: stxdw [r7 + 0x0], r1
0c00c0: mov64 r2, r10
0c00c8: add64 r2, -0x3b8
0c00d0: stxdw [r10 - 0xa20], r1
0c00d8: mov64 r3, 0x80
0c00e0: call 0xb2f6 ; call 0x119898
0c00e8: mov64 r1, r10
0c00f0: add64 r1, -0x3b8
0c00f8: mov64 r2, r9
0c0100: call -0x17fe7 ; call 0x1d0
0c0108: ldxw r1, [r10 - 0x308]
0c0110: jeq r1, 0x2, +0x14 ; branch 0xc01b8
0c0118: ldxdw r1, [r7 + 0x0]
0c0120: mov64 r3, r1
0c0128: add64 r3, -0xd8
0c0130: mov64 r2, 0x0
0c0138: mov64 r4, 0x1
0c0140: jgt r3, r1, +0x1 ; branch 0xc0150
0c0148: mov64 r4, 0x0
0c0150: jne r4, 0x0, +0x1 ; branch 0xc0160
0c0158: mov64 r2, r3
0c0160: lddw r7, 0x300007f28
0c0170: jeq r1, 0x0, +0x2 ; branch 0xc0188
0c0178: and64 r2, -0x8
0c0180: mov64 r7, r2
0c0188: lddw r1, 0x300000007
0c0198: jgt r7, r1, +0xe ; branch 0xc0210
0c01a0: mov64 r1, 0x8
0c01a8: mov64 r2, 0xd8
0c01b0: call 0xa235 ; call 0x111360
0c01b8: ldxdw r3, [r10 - 0x3b0]
0c01c0: ldxdw r2, [r10 - 0x3b8]
0c01c8: mov64 r1, r10
0c01d0: add64 r1, -0x9b8
0c01d8: lddw r4, 0x11e2ed ; rodata b'user_base_token_accountuser_quote_token_accounttoken_2022_programprotocol_f'
0c01e8: mov64 r5, 0x17
0c01f0: call -0x17c90 ; call 0x1d78
0c01f8: ldxdw r1, [r10 - 0x9b8]
0c0200: ldxdw r2, [r10 - 0x9b0]
0c0208: ja +0x4f ; branch 0xc0488
0c0210: lddw r1, 0x300000000
0c0220: stxdw [r1 + 0x0], r7
0c0228: mov64 r2, r10
0c0230: add64 r2, -0x3b8
0c0238: mov64 r1, r7
0c0240: mov64 r3, 0xd8
0c0248: call 0xb2c9 ; call 0x119898
0c0250: mov64 r1, r10
0c0258: add64 r1, -0x3b8
0c0260: mov64 r2, r9
0c0268: call -0x17a8c ; call 0x2e10
0c0270: ldxdw r3, [r10 - 0x3b0]
0c0278: ldxdw r2, [r10 - 0x3b8]
0c0280: jeq r2, 0x2, +0x1 ; branch 0xc0290
0c0288: ja +0x25 ; branch 0xc03b8
0c0290: stxdw [r10 - 0xa28], r3
0c0298: mov64 r1, r10
0c02a0: add64 r1, -0x3b8
0c02a8: mov64 r2, r9
0c02b0: call -0x17a95 ; call 0x2e10
0c02b8: ldxdw r3, [r10 - 0x3b0]
0c02c0: ldxdw r2, [r10 - 0x3b8]
0c02c8: jeq r2, 0x2, +0x1 ; branch 0xc02d8
0c02d0: ja +0x25 ; branch 0xc0400
0c02d8: stxdw [r10 - 0xa30], r3
0c02e0: mov64 r1, r10
0c02e8: add64 r1, -0x3b8
0c02f0: mov64 r2, r9
0c02f8: call -0x17a9e ; call 0x2e10
0c0300: ldxdw r3, [r10 - 0x3b0]
0c0308: ldxdw r2, [r10 - 0x3b8]
0c0310: jeq r2, 0x2, +0x1 ; branch 0xc0320
0c0318: ja +0x25 ; branch 0xc0448
0c0320: stxdw [r10 - 0xa38], r3
0c0328: mov64 r1, r10
0c0330: add64 r1, -0x3b8
0c0338: mov64 r2, r9
0c0340: call -0x17bfb ; call 0x2370
0c0348: ldxdw r3, [r10 - 0x3b0]
0c0350: ldxdw r2, [r10 - 0x3b8]
0c0358: ldxb r1, [r10 - 0x38e]
0c0360: jeq r1, 0x2, +0x1 ; branch 0xc0370
0c0368: ja +0x29 ; branch 0xc04b8
0c0370: mov64 r1, r10
0c0378: add64 r1, -0x9a8
0c0380: lddw r4, 0x11e367 ; rodata b'protocol_fee_recipientuser_in_token_accountuser_out_token_accountbuyback_fe'
0c0390: mov64 r5, 0x16
0c0398: call -0x17cc5 ; call 0x1d78
0c03a0: ldxdw r1, [r10 - 0x9a8]
0c03a8: ldxdw r2, [r10 - 0x9a0]
0c03b0: ja +0x1a ; branch 0xc0488
0c03b8: mov64 r1, r10
0c03c0: add64 r1, -0x5f8
0c03c8: lddw r4, 0x11e304 ; rodata b'user_quote_token_accounttoken_2022_programprotocol_fee_recipient_token_acco'
0c03d8: mov64 r5, 0x18
0c03e0: call -0x17cce ; call 0x1d78
0c03e8: ldxdw r1, [r10 - 0x5f8]
0c03f0: ldxdw r2, [r10 - 0x5f0]
0c03f8: ja +0x11 ; branch 0xc0488
0c0400: mov64 r1, r10
0c0408: add64 r1, -0x608
0c0410: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0c0420: mov64 r5, 0x17
0c0428: call -0x17cd7 ; call 0x1d78
0c0430: ldxdw r1, [r10 - 0x608]
0c0438: ldxdw r2, [r10 - 0x600]
0c0440: ja +0x8 ; branch 0xc0488
0c0448: mov64 r1, r10
0c0450: add64 r1, -0x618
0c0458: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0c0468: mov64 r5, 0x18
0c0470: call -0x17ce0 ; call 0x1d78
0c0478: ldxdw r1, [r10 - 0x618]
0c0480: ldxdw r2, [r10 - 0x610]
0c0488: stxdw [r6 + 0x10], r2
0c0490: stxdw [r6 + 0x8], r1
0c0498: lddw r1, -0x8000000000000000
0c04a8: stxdw [r6 + 0x0], r1
0c04b0: exit
0c04b8: ldxh r4, [r10 - 0x390]
0c04c0: stxh [r10 - 0x5a8], r4
0c04c8: ldxdw r4, [r10 - 0x398]
0c04d0: stxdw [r10 - 0x5b0], r4
0c04d8: ldxdw r4, [r10 - 0x3a0]
0c04e0: stxdw [r10 - 0x5b8], r4
0c04e8: ldxdw r4, [r10 - 0x3a8]
0c04f0: stxdw [r10 - 0x5c0], r4
0c04f8: ldxw r4, [r10 - 0x38d]
0c0500: stxw [r10 - 0x5a5], r4
0c0508: ldxb r4, [r10 - 0x389]
0c0510: stxb [r10 - 0x5a1], r4
0c0518: stxb [r10 - 0x5a6], r1
0c0520: stxdw [r10 - 0x5c8], r3
0c0528: stxdw [r10 - 0x5d0], r2
0c0530: ldxdw r1, [r9 + 0x8]
0c0538: jeq r1, 0x0, +0x40 ; branch 0xc0740
0c0540: ldxdw r2, [r9 + 0x0]
0c0548: stxdw [r10 - 0x5a0], r2
0c0550: add64 r1, -0x1
0c0558: stxdw [r9 + 0x8], r1
0c0560: add64 r2, 0x30
0c0568: stxdw [r9 + 0x0], r2
0c0570: mov64 r1, r10
0c0578: add64 r1, -0x3b8
0c0580: mov64 r2, r9
0c0588: call -0x1808e ; call 0x120
0c0590: ldxdw r3, [r10 - 0x3b0]
0c0598: ldxdw r2, [r10 - 0x3b8]
0c05a0: jne r2, 0x2, +0x41 ; branch 0xc07b0
0c05a8: stxdw [r10 - 0xa40], r3
0c05b0: mov64 r1, r10
0c05b8: add64 r1, -0x3b8
0c05c0: mov64 r2, r9
0c05c8: call -0x18096 ; call 0x120
0c05d0: ldxdw r3, [r10 - 0x3b0]
0c05d8: ldxdw r2, [r10 - 0x3b8]
0c05e0: jeq r2, 0x2, +0x1 ; branch 0xc05f0
0c05e8: ja +0x41 ; branch 0xc07f8
0c05f0: stxdw [r10 - 0x598], r3
0c05f8: mov64 r1, r10
0c0600: add64 r1, -0x3b8
0c0608: mov64 r2, r9
0c0610: call -0x15f59 ; call 0x10b50
0c0618: ldxdw r3, [r10 - 0x3b0]
0c0620: ldxdw r2, [r10 - 0x3b8]
0c0628: jeq r2, 0x2, +0x1 ; branch 0xc0638
0c0630: ja +0x41 ; branch 0xc0840
0c0638: stxdw [r10 - 0x590], r3
0c0640: mov64 r1, r10
0c0648: add64 r1, -0x3b8
0c0650: mov64 r2, r9
0c0658: call -0x15fab ; call 0x10908
0c0660: ldxdw r3, [r10 - 0x3b0]
0c0668: ldxdw r2, [r10 - 0x3b8]
0c0670: jeq r2, 0x2, +0x1 ; branch 0xc0680
0c0678: ja +0x41 ; branch 0xc0888
0c0680: stxdw [r10 - 0x588], r3
0c0688: mov64 r1, r10
0c0690: add64 r1, -0x3b8
0c0698: mov64 r2, r9
0c06a0: call -0x17c67 ; call 0x2370
0c06a8: ldxdw r1, [r10 - 0x3b0]
0c06b0: stxdw [r10 - 0xa48], r1
0c06b8: ldxdw r1, [r10 - 0x3b8]
0c06c0: stxdw [r10 - 0xa50], r1
0c06c8: ldxb r1, [r10 - 0x38e]
0c06d0: stxdw [r10 - 0xa60], r1
0c06d8: jeq r1, 0x2, +0x1 ; branch 0xc06e8
0c06e0: ja +0x52 ; branch 0xc0978
0c06e8: mov64 r1, r10
0c06f0: add64 r1, -0x988
0c06f8: ldxdw r2, [r10 - 0xa50]
0c0700: ldxdw r3, [r10 - 0xa48]
0c0708: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0c0718: mov64 r5, 0xf
0c0720: call -0x17d36 ; call 0x1d78
0c0728: ldxdw r1, [r10 - 0x988]
0c0730: ldxdw r2, [r10 - 0x980]
0c0738: ja +0x31 ; branch 0xc08c8
0c0740: mov64 r1, r10
0c0748: add64 r1, -0x998
0c0750: mov64 r2, 0xbbd
0c0758: mov64 r7, r3
0c0760: call 0x8ada ; call 0x105e38
0c0768: mov64 r3, r7
0c0770: ldxdw r1, [r10 - 0x998]
0c0778: ldxdw r2, [r10 - 0x990]
0c0780: stxdw [r6 + 0x10], r2
0c0788: stxdw [r6 + 0x8], r1
0c0790: lddw r1, -0x8000000000000000
0c07a0: stxdw [r6 + 0x0], r1
0c07a8: ja +0x29 ; branch 0xc08f8
0c07b0: mov64 r1, r10
0c07b8: add64 r1, -0x628
0c07c0: lddw r4, 0x11e1f2 ; rodata b'base_token_programcoin_creator_vault_atacoin_creator_token_accountcoin_crea'
0c07d0: mov64 r5, 0x12
0c07d8: call -0x17d4d ; call 0x1d78
0c07e0: ldxdw r1, [r10 - 0x628]
0c07e8: ldxdw r2, [r10 - 0x620]
0c07f0: ja +0x1a ; branch 0xc08c8
0c07f8: mov64 r1, r10
0c0800: add64 r1, -0x638
0c0808: lddw r4, 0x11e1ac ; rodata b'quote_token_programpool_base_token_accountquote_mintbase_mintauthoritybase_'
0c0818: mov64 r5, 0x13
0c0820: call -0x17d56 ; call 0x1d78
0c0828: ldxdw r1, [r10 - 0x638]
0c0830: ldxdw r2, [r10 - 0x630]
0c0838: ja +0x11 ; branch 0xc08c8
0c0840: mov64 r1, r10
0c0848: add64 r1, -0x648
0c0850: lddw r4, 0x11e0d1 ; rodata b'system_programglobal_incentive_token_accountadmintoken_programassociated_to'
0c0860: mov64 r5, 0xe
0c0868: call -0x17d5f ; call 0x1d78
0c0870: ldxdw r1, [r10 - 0x648]
0c0878: ldxdw r2, [r10 - 0x640]
0c0880: ja +0x8 ; branch 0xc08c8
0c0888: mov64 r1, r10
0c0890: add64 r1, -0x658
0c0898: lddw r4, 0x11e10f ; rodata b'associated_token_programprograms/pump-amm/src/instructions/admin/create_con'
0c08a8: mov64 r5, 0x18
0c08b0: call -0x17d68 ; call 0x1d78
0c08b8: ldxdw r1, [r10 - 0x658]
0c08c0: ldxdw r2, [r10 - 0x650]
0c08c8: stxdw [r6 + 0x10], r2
0c08d0: stxdw [r6 + 0x8], r1
0c08d8: lddw r1, -0x8000000000000000
0c08e8: stxdw [r6 + 0x0], r1
0c08f0: ldxdw r3, [r10 - 0x5c8]
0c08f8: ldxdw r2, [r3 + 0x0]
0c0900: add64 r2, -0x1
0c0908: ldxdw r1, [r10 - 0x5c0]
0c0910: stxdw [r3 + 0x0], r2
0c0918: jne r2, 0x0, +0x3 ; branch 0xc0938
0c0920: ldxdw r2, [r3 + 0x8]
0c0928: add64 r2, -0x1
0c0930: stxdw [r3 + 0x8], r2
0c0938: ldxdw r2, [r1 + 0x0]
0c0940: add64 r2, -0x1
0c0948: stxdw [r1 + 0x0], r2
0c0950: jne r2, 0x0, -0x95 ; branch 0xc04b0
0c0958: ldxdw r2, [r1 + 0x8]
0c0960: add64 r2, -0x1
0c0968: stxdw [r1 + 0x8], r2
0c0970: ja -0x99 ; branch 0xc04b0
0c0978: ldxdw r1, [r10 - 0x3a0]
0c0980: stxdw [r10 - 0x578], r1
0c0988: ldxdw r1, [r10 - 0x398]
0c0990: stxdw [r10 - 0x570], r1
0c0998: ldxh r1, [r10 - 0x390]
0c09a0: stxh [r10 - 0x568], r1
0c09a8: ldxw r1, [r10 - 0x38d]
0c09b0: stxw [r10 - 0x580], r1
0c09b8: ldxb r1, [r10 - 0x389]
0c09c0: stxb [r10 - 0x57c], r1
0c09c8: ldxdw r1, [r10 - 0x3a8]
0c09d0: stxdw [r10 - 0xa58], r1
0c09d8: mov64 r1, r10
0c09e0: add64 r1, -0x3b8
0c09e8: mov64 r2, r9
0c09f0: call -0x15f90 ; call 0x10d78
0c09f8: ldxdw r1, [r10 - 0x3b0]
0c0a00: stxdw [r10 - 0xa68], r1
0c0a08: ldxdw r2, [r10 - 0x3b8]
0c0a10: jeq r2, 0x2, +0x1 ; branch 0xc0a20
0c0a18: ja +0x38 ; branch 0xc0be0
0c0a20: ldxdw r1, [r9 + 0x8]
0c0a28: jeq r1, 0x0, +0x40 ; branch 0xc0c30
0c0a30: ldxdw r2, [r9 + 0x0]
0c0a38: stxdw [r10 - 0x560], r2
0c0a40: add64 r1, -0x1
0c0a48: stxdw [r9 + 0x8], r1
0c0a50: add64 r2, 0x30
0c0a58: stxdw [r9 + 0x0], r2
0c0a60: mov64 r1, r10
0c0a68: add64 r1, -0x3b8
0c0a70: mov64 r2, r9
0c0a78: call -0x17ce2 ; call 0x2370
0c0a80: ldxdw r3, [r10 - 0x3b0]
0c0a88: ldxdw r2, [r10 - 0x3b8]
0c0a90: ldxb r1, [r10 - 0x38e]
0c0a98: jeq r1, 0x2, +0x39 ; branch 0xc0c68
0c0aa0: ldxh r4, [r10 - 0x390]
0c0aa8: stxh [r10 - 0x530], r4
0c0ab0: ldxdw r4, [r10 - 0x398]
0c0ab8: stxdw [r10 - 0x538], r4
0c0ac0: ldxdw r4, [r10 - 0x3a0]
0c0ac8: stxdw [r10 - 0x540], r4
0c0ad0: ldxdw r4, [r10 - 0x3a8]
0c0ad8: stxdw [r10 - 0x548], r4
0c0ae0: ldxw r4, [r10 - 0x38d]
0c0ae8: stxw [r10 - 0x52d], r4
0c0af0: ldxb r4, [r10 - 0x389]
0c0af8: stxb [r10 - 0x529], r4
0c0b00: stxb [r10 - 0x52e], r1
0c0b08: stxdw [r10 - 0x550], r3
0c0b10: stxdw [r10 - 0x558], r2
0c0b18: mov64 r1, r10
0c0b20: add64 r1, -0x3b8
0c0b28: mov64 r2, r9
0c0b30: call -0x160ed ; call 0x103d0
0c0b38: ldxdw r1, [r10 - 0x3a8]
0c0b40: stxdw [r10 - 0xa70], r1
0c0b48: ldxdw r1, [r10 - 0x3b0]
0c0b50: stxdw [r10 - 0xa78], r1
0c0b58: ldxdw r1, [r10 - 0x3b8]
0c0b60: lddw r2, -0x8000000000000000
0c0b70: stxdw [r10 - 0xa80], r1
0c0b78: jeq r1, r2, +0x1 ; branch 0xc0b88
0c0b80: ja +0x3c ; branch 0xc0d68
0c0b88: mov64 r1, r10
0c0b90: add64 r1, -0x958
0c0b98: ldxdw r2, [r10 - 0xa78]
0c0ba0: ldxdw r3, [r10 - 0xa70]
0c0ba8: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0c0bb8: mov64 r5, 0xa
0c0bc0: call -0x17dca ; call 0x1d78
0c0bc8: ldxdw r1, [r10 - 0x958]
0c0bd0: ldxdw r2, [r10 - 0x950]
0c0bd8: ja +0x62 ; branch 0xc0ef0
0c0be0: mov64 r1, r10
0c0be8: add64 r1, -0x668
0c0bf0: ldxdw r3, [r10 - 0xa68]
0c0bf8: lddw r4, 0x11e0ca ; rodata b'programsystem_programglobal_incentive_token_accountadmintoken_programassoci'
0c0c08: mov64 r5, 0x7
0c0c10: call -0x17dd4 ; call 0x1d78
0c0c18: ldxdw r1, [r10 - 0x668]
0c0c20: ldxdw r2, [r10 - 0x660]
0c0c28: ja +0xf ; branch 0xc0ca8
0c0c30: mov64 r1, r10
0c0c38: add64 r1, -0x978
0c0c40: mov64 r2, 0xbbd
0c0c48: call 0x8a3d ; call 0x105e38
0c0c50: ldxdw r1, [r10 - 0x978]
0c0c58: ldxdw r2, [r10 - 0x970]
0c0c60: ja +0x8 ; branch 0xc0ca8
0c0c68: mov64 r1, r10
0c0c70: add64 r1, -0x968
0c0c78: lddw r4, 0x11e234 ; rodata b'coin_creator_vault_authoritycoin_creatorsharing-configsharing_configbonding'
0c0c88: mov64 r5, 0x1c
0c0c90: call -0x17de4 ; call 0x1d78
0c0c98: ldxdw r1, [r10 - 0x968]
0c0ca0: ldxdw r2, [r10 - 0x960]
0c0ca8: stxdw [r6 + 0x10], r2
0c0cb0: stxdw [r6 + 0x8], r1
0c0cb8: lddw r1, -0x8000000000000000
0c0cc8: stxdw [r6 + 0x0], r1
0c0cd0: ldxdw r2, [r10 - 0xa48]
0c0cd8: ldxdw r1, [r2 + 0x0]
0c0ce0: add64 r1, -0x1
0c0ce8: stxdw [r2 + 0x0], r1
0c0cf0: jne r1, 0x0, +0x4 ; branch 0xc0d18
0c0cf8: ldxdw r2, [r10 - 0xa48]
0c0d00: ldxdw r1, [r2 + 0x8]
0c0d08: add64 r1, -0x1
0c0d10: stxdw [r2 + 0x8], r1
0c0d18: ldxdw r2, [r10 - 0xa58]
0c0d20: ldxdw r1, [r2 + 0x0]
0c0d28: add64 r1, -0x1
0c0d30: stxdw [r2 + 0x0], r1
0c0d38: jne r1, 0x0, -0x8a ; branch 0xc08f0
0c0d40: ldxdw r2, [r10 - 0xa58]
0c0d48: ldxdw r1, [r2 + 0x8]
0c0d50: add64 r1, -0x1
0c0d58: stxdw [r2 + 0x8], r1
0c0d60: ja -0x8f ; branch 0xc08f0
0c0d68: ldxdw r1, [r10 - 0x398]
0c0d70: stxdw [r10 - 0xaa0], r1
0c0d78: ldxdw r1, [r10 - 0x3a0]
0c0d80: stxdw [r10 - 0xa98], r1
0c0d88: mov64 r1, r10
0c0d90: add64 r1, -0x528
0c0d98: mov64 r2, r10
0c0da0: add64 r2, -0x390
0c0da8: mov64 r3, 0x60
0c0db0: call 0xb15c ; call 0x119898
0c0db8: ldxdw r1, [r10 - 0x330]
0c0dc0: stxdw [r10 - 0xa90], r1
0c0dc8: mov64 r1, r10
0c0dd0: add64 r1, -0x3b8
0c0dd8: mov64 r2, r9
0c0de0: call -0x15fc5 ; call 0x10fc0
0c0de8: ldxdw r1, [r10 - 0x3b0]
0c0df0: stxdw [r10 - 0xa88], r1
0c0df8: ldxdw r2, [r10 - 0x3b8]
0c0e00: jeq r2, 0x2, +0x1 ; branch 0xc0e10
0c0e08: ja +0x13 ; branch 0xc0ea8
0c0e10: mov64 r1, r10
0c0e18: add64 r1, -0x3b8
0c0e20: call 0x8c1f ; call 0x106f20
0c0e28: ldxdw r1, [r10 - 0x3b0]
0c0e30: stxdw [r10 - 0x4b0], r1
0c0e38: ldxdw r1, [r10 - 0x3a8]
0c0e40: stxdw [r10 - 0x4a8], r1
0c0e48: ldxdw r1, [r10 - 0x3a0]
0c0e50: stxdw [r10 - 0x4a0], r1
0c0e58: ldxdw r1, [r10 - 0x3b8]
0c0e60: jeq r1, 0x0, +0x27 ; branch 0xc0fa0
0c0e68: mov64 r1, r10
0c0e70: add64 r1, -0x688
0c0e78: mov64 r2, r10
0c0e80: add64 r2, -0x4b0
0c0e88: call 0x8436 ; call 0x103040
0c0e90: ldxdw r1, [r10 - 0x688]
0c0e98: ldxdw r2, [r10 - 0x680]
0c0ea0: ja +0x9 ; branch 0xc0ef0
0c0ea8: mov64 r1, r10
0c0eb0: add64 r1, -0x678
0c0eb8: ldxdw r3, [r10 - 0xa88]
0c0ec0: lddw r4, 0x11e35c ; rodata b'fee_programprotocol_fee_recipientuser_in_token_accountuser_out_token_accoun'
0c0ed0: mov64 r5, 0xb
0c0ed8: call -0x17e2d ; call 0x1d78
0c0ee0: ldxdw r1, [r10 - 0x678]
0c0ee8: ldxdw r2, [r10 - 0x670]
0c0ef0: stxdw [r6 + 0x10], r2
0c0ef8: stxdw [r6 + 0x8], r1
0c0f00: lddw r1, -0x8000000000000000
0c0f10: stxdw [r6 + 0x0], r1
0c0f18: ldxdw r1, [r10 - 0x548]
0c0f20: ldxdw r2, [r10 - 0x550]
0c0f28: ldxdw r3, [r2 + 0x0]
0c0f30: add64 r3, -0x1
0c0f38: stxdw [r2 + 0x0], r3
0c0f40: jne r3, 0x0, +0x3 ; branch 0xc0f60
0c0f48: ldxdw r3, [r2 + 0x8]
0c0f50: add64 r3, -0x1
0c0f58: stxdw [r2 + 0x8], r3
0c0f60: ldxdw r2, [r1 + 0x0]
0c0f68: add64 r2, -0x1
0c0f70: stxdw [r1 + 0x0], r2
0c0f78: jne r2, 0x0, -0x56 ; branch 0xc0cd0
0c0f80: ldxdw r2, [r1 + 0x8]
0c0f88: add64 r2, -0x1
0c0f90: stxdw [r1 + 0x8], r2
0c0f98: ja -0x5a ; branch 0xc0cd0
0c0fa0: ldxdw r1, [r10 - 0x4a0]
0c0fa8: stxdw [r10 - 0x4b8], r1
0c0fb0: ldxdw r1, [r10 - 0x4a8]
0c0fb8: stxdw [r10 - 0x4c0], r1
0c0fc0: ldxdw r1, [r10 - 0x4b0]
0c0fc8: stxdw [r10 - 0x4c8], r1
0c0fd0: mov64 r1, r10
0c0fd8: add64 r1, -0x598
0c0fe0: stxdw [r10 - 0x388], r1
0c0fe8: mov64 r1, r10
0c0ff0: add64 r1, -0x590
0c0ff8: stxdw [r10 - 0x390], r1
0c1000: ldxdw r1, [r10 - 0xa20]
0c1008: stxdw [r10 - 0x398], r1
0c1010: mov64 r1, r10
0c1018: add64 r1, -0x5d0
0c1020: stxdw [r10 - 0x3a0], r1
0c1028: mov64 r1, r10
0c1030: add64 r1, -0x5d8
0c1038: stxdw [r10 - 0x3a8], r1
0c1040: mov64 r1, r10
0c1048: add64 r1, -0x588
0c1050: stxdw [r10 - 0x3b0], r1
0c1058: mov64 r1, r10
0c1060: add64 r1, -0x5a0
0c1068: stxdw [r10 - 0x3b8], r1
0c1070: mov64 r1, r10
0c1078: add64 r1, -0x468
0c1080: mov64 r2, r10
0c1088: add64 r2, -0x3b8
0c1090: call 0x424 ; call 0xc31b8
0c1098: ldxdw r1, [r10 - 0x460]
0c10a0: stxdw [r10 - 0xaa8], r1
0c10a8: ldxdw r1, [r10 - 0x468]
0c10b0: jeq r1, 0x2, +0x1 ; branch 0xc10c0
0c10b8: ja +0xc1 ; branch 0xc16c8
0c10c0: ldxdw r1, [r10 - 0xaa8]
0c10c8: ldxdw r2, [r1 + 0x20]
0c10d0: ldxb r1, [r2 + 0x29]
0c10d8: jeq r1, 0x0, +0xbf ; branch 0xc16d8
0c10e0: mov64 r9, r10
0c10e8: add64 r9, -0x468
0c10f0: mov64 r1, r9
0c10f8: call -0x165f1 ; call 0xe178
0c1100: mov64 r1, r9
0c1108: call 0x8fb8 ; call 0x108ed0
0c1110: stxdw [r10 - 0xab0], r0
0c1118: ldxdw r1, [r10 - 0xaa8]
0c1120: ldxdw r2, [r1 + 0x20]
0c1128: mov64 r9, r10
0c1130: add64 r9, -0x3b8
0c1138: mov64 r1, r9
0c1140: call -0x165fa ; call 0xe178
0c1148: mov64 r1, r10
0c1150: add64 r1, -0x3d8
0c1158: mov64 r2, r9
0c1160: call 0x8fc6 ; call 0x108f98
0c1168: ldxdw r3, [r10 - 0x3d0]
0c1170: ldxdw r1, [r10 - 0x3d8]
0c1178: lddw r2, -0x7fffffffffffffe6
0c1188: jne r1, r2, +0xb8 ; branch 0xc1750
0c1190: mov64 r1, r10
0c1198: add64 r1, -0x4c8
0c11a0: ldxdw r2, [r10 - 0xab0]
0c11a8: call 0x8bf9 ; call 0x107178
0c11b0: ldxdw r1, [r10 - 0x3a8]
0c11b8: ldxdw r2, [r10 - 0x3b0]
0c11c0: ldxdw r3, [r2 + 0x0]
0c11c8: add64 r3, -0x1
0c11d0: stxdw [r2 + 0x0], r3
0c11d8: jne r3, 0x0, +0x3 ; branch 0xc11f8
0c11e0: ldxdw r3, [r2 + 0x8]
0c11e8: add64 r3, -0x1
0c11f0: stxdw [r2 + 0x8], r3
0c11f8: ldxdw r2, [r1 + 0x0]
0c1200: add64 r2, -0x1
0c1208: stxdw [r1 + 0x0], r2
0c1210: jne r2, 0x0, +0x3 ; branch 0xc1230
0c1218: ldxdw r2, [r1 + 0x8]
0c1220: add64 r2, -0x1
0c1228: stxdw [r1 + 0x8], r2
0c1230: ldxdw r1, [r10 - 0x458]
0c1238: ldxdw r2, [r10 - 0x460]
0c1240: ldxdw r3, [r2 + 0x0]
0c1248: add64 r3, -0x1
0c1250: stxdw [r2 + 0x0], r3
0c1258: jne r3, 0x0, +0x3 ; branch 0xc1278
0c1260: ldxdw r3, [r2 + 0x8]
0c1268: add64 r3, -0x1
0c1270: stxdw [r2 + 0x8], r3
0c1278: ldxdw r2, [r1 + 0x0]
0c1280: add64 r2, -0x1
0c1288: stxdw [r1 + 0x0], r2
0c1290: jne r2, 0x0, +0x3 ; branch 0xc12b0
0c1298: ldxdw r2, [r1 + 0x8]
0c12a0: add64 r2, -0x1
0c12a8: stxdw [r1 + 0x8], r2
0c12b0: jne r0, 0x0, +0x1 ; branch 0xc12c0
0c12b8: ja +0xc3 ; branch 0xc18d8
0c12c0: mov64 r1, r10
0c12c8: add64 r1, -0x3b8
0c12d0: call 0x8b89 ; call 0x106f20
0c12d8: ldxdw r1, [r10 - 0x3b0]
0c12e0: stxdw [r10 - 0x480], r1
0c12e8: ldxdw r1, [r10 - 0x3a8]
0c12f0: stxdw [r10 - 0x478], r1
0c12f8: ldxdw r1, [r10 - 0x3a0]
0c1300: stxdw [r10 - 0x470], r1
0c1308: ldxdw r1, [r10 - 0x3b8]
0c1310: jne r1, 0x0, +0xc7 ; branch 0xc1950
0c1318: ldxdw r1, [r10 - 0x470]
0c1320: stxdw [r10 - 0x488], r1
0c1328: ldxdw r1, [r10 - 0x478]
0c1330: stxdw [r10 - 0x490], r1
0c1338: ldxdw r1, [r10 - 0x480]
0c1340: stxdw [r10 - 0x498], r1
0c1348: mov64 r1, r10
0c1350: add64 r1, -0x598
0c1358: stxdw [r10 - 0x388], r1
0c1360: mov64 r1, r10
0c1368: add64 r1, -0x590
0c1370: stxdw [r10 - 0x390], r1
0c1378: ldxdw r1, [r10 - 0xa20]
0c1380: stxdw [r10 - 0x398], r1
0c1388: mov64 r1, r10
0c1390: add64 r1, -0x558
0c1398: stxdw [r10 - 0x3a0], r1
0c13a0: mov64 r1, r10
0c13a8: add64 r1, -0x5d8
0c13b0: stxdw [r10 - 0x3a8], r1
0c13b8: mov64 r1, r10
0c13c0: add64 r1, -0x588
0c13c8: stxdw [r10 - 0x3b0], r1
0c13d0: mov64 r1, r10
0c13d8: add64 r1, -0x560
0c13e0: stxdw [r10 - 0x3b8], r1
0c13e8: mov64 r1, r10
0c13f0: add64 r1, -0x468
0c13f8: mov64 r2, r10
0c1400: add64 r2, -0x3b8
0c1408: call 0x664 ; call 0xc4730
0c1410: ldxdw r1, [r10 - 0x460]
0c1418: stxdw [r10 - 0xab0], r1
0c1420: ldxdw r1, [r10 - 0x468]
0c1428: jeq r1, 0x2, +0x1 ; branch 0xc1438
0c1430: ja +0xab ; branch 0xc1990
0c1438: ldxdw r1, [r10 - 0xab0]
0c1440: ldxdw r2, [r1 + 0x20]
0c1448: ldxb r1, [r2 + 0x29]
0c1450: jeq r1, 0x0, +0xa9 ; branch 0xc19a0
0c1458: mov64 r9, r10
0c1460: add64 r9, -0x468
0c1468: mov64 r1, r9
0c1470: call -0x16660 ; call 0xe178
0c1478: mov64 r1, r9
0c1480: call 0x8f49 ; call 0x108ed0
0c1488: stxdw [r10 - 0xab8], r0
0c1490: ldxdw r1, [r10 - 0xab0]
0c1498: ldxdw r2, [r1 + 0x20]
0c14a0: mov64 r9, r10
0c14a8: add64 r9, -0x3b8
0c14b0: mov64 r1, r9
0c14b8: call -0x16669 ; call 0xe178
0c14c0: mov64 r1, r10
0c14c8: add64 r1, -0x3d8
0c14d0: mov64 r2, r9
0c14d8: call 0x8f57 ; call 0x108f98
0c14e0: ldxdw r3, [r10 - 0x3d0]
0c14e8: ldxdw r1, [r10 - 0x3d8]
0c14f0: lddw r2, -0x7fffffffffffffe6
0c1500: jne r1, r2, +0xa2 ; branch 0xc1a18
0c1508: mov64 r1, r10
0c1510: add64 r1, -0x498
0c1518: ldxdw r2, [r10 - 0xab8]
0c1520: call 0x8b8a ; call 0x107178
0c1528: ldxdw r1, [r10 - 0x3a8]
0c1530: ldxdw r2, [r10 - 0x3b0]
0c1538: ldxdw r3, [r2 + 0x0]
0c1540: add64 r3, -0x1
0c1548: stxdw [r2 + 0x0], r3
0c1550: jne r3, 0x0, +0x3 ; branch 0xc1570
0c1558: ldxdw r3, [r2 + 0x8]
0c1560: add64 r3, -0x1
0c1568: stxdw [r2 + 0x8], r3
0c1570: ldxdw r2, [r1 + 0x0]
0c1578: add64 r2, -0x1
0c1580: stxdw [r1 + 0x0], r2
0c1588: jne r2, 0x0, +0x3 ; branch 0xc15a8
0c1590: ldxdw r2, [r1 + 0x8]
0c1598: add64 r2, -0x1
0c15a0: stxdw [r1 + 0x8], r2
0c15a8: ldxdw r1, [r10 - 0x458]
0c15b0: ldxdw r2, [r10 - 0x460]
0c15b8: ldxdw r3, [r2 + 0x0]
0c15c0: add64 r3, -0x1
0c15c8: stxdw [r2 + 0x0], r3
0c15d0: jne r3, 0x0, +0x3 ; branch 0xc15f0
0c15d8: ldxdw r3, [r2 + 0x8]
0c15e0: add64 r3, -0x1
0c15e8: stxdw [r2 + 0x8], r3
0c15f0: ldxdw r2, [r1 + 0x0]
0c15f8: add64 r2, -0x1
0c1600: stxdw [r1 + 0x0], r2
0c1608: jne r2, 0x0, +0x3 ; branch 0xc1628
0c1610: ldxdw r2, [r1 + 0x8]
0c1618: add64 r2, -0x1
0c1620: stxdw [r1 + 0x8], r2
0c1628: jne r0, 0x0, +0x1 ; branch 0xc1638
0c1630: ja +0xaa ; branch 0xc1b88
0c1638: ldxdw r1, [r8 + 0x0]
0c1640: ldxb r1, [r1 + 0x29]
0c1648: jne r1, 0x0, +0xb6 ; branch 0xc1c00
0c1650: mov64 r1, r10
0c1658: add64 r1, -0x8f8
0c1660: mov64 r2, 0x7d0
0c1668: call 0x88f9 ; call 0x105e38
0c1670: ldxdw r3, [r10 - 0x8f0]
0c1678: ldxdw r2, [r10 - 0x8f8]
0c1680: mov64 r1, r10
0c1688: add64 r1, -0x908
0c1690: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0c16a0: mov64 r5, 0x4
0c16a8: call -0x17f27 ; call 0x1d78
0c16b0: ldxdw r1, [r10 - 0x908]
0c16b8: ldxdw r2, [r10 - 0x900]
0c16c0: ja -0xfb ; branch 0xc0ef0
0c16c8: ldxdw r2, [r10 - 0xaa8]
0c16d0: ja -0xfd ; branch 0xc0ef0
0c16d8: mov64 r1, r10
0c16e0: add64 r1, -0x938
0c16e8: mov64 r2, 0x7d0
0c16f0: call 0x88e8 ; call 0x105e38
0c16f8: ldxdw r3, [r10 - 0x930]
0c1700: ldxdw r2, [r10 - 0x938]
0c1708: mov64 r1, r10
0c1710: add64 r1, -0x948
0c1718: lddw r4, 0x11e32e ; rodata b'protocol_fee_recipient_token_accountfee_configfee_programprotocol_fee_recip'
0c1728: mov64 r5, 0x24
0c1730: call -0x17f38 ; call 0x1d78
0c1738: ldxdw r1, [r10 - 0x948]
0c1740: ldxdw r2, [r10 - 0x940]
0c1748: ja -0x10c ; branch 0xc0ef0
0c1750: ldxdw r2, [r10 - 0x3c8]
0c1758: stxdw [r10 - 0x3c8], r2
0c1760: stxdw [r10 - 0x3d0], r3
0c1768: stxdw [r10 - 0x3d8], r1
0c1770: mov64 r1, r10
0c1778: add64 r1, -0x698
0c1780: mov64 r2, r10
0c1788: add64 r2, -0x3d8
0c1790: call 0x8315 ; call 0x103040
0c1798: ldxdw r1, [r10 - 0x698]
0c17a0: ldxdw r2, [r10 - 0x690]
0c17a8: stxdw [r6 + 0x10], r2
0c17b0: stxdw [r6 + 0x8], r1
0c17b8: lddw r1, -0x8000000000000000
0c17c8: stxdw [r6 + 0x0], r1
0c17d0: ldxdw r1, [r10 - 0x3a8]
0c17d8: ldxdw r2, [r10 - 0x3b0]
0c17e0: ldxdw r3, [r2 + 0x0]
0c17e8: add64 r3, -0x1
0c17f0: stxdw [r2 + 0x0], r3
0c17f8: jne r3, 0x0, +0x3 ; branch 0xc1818
0c1800: ldxdw r3, [r2 + 0x8]
0c1808: add64 r3, -0x1
0c1810: stxdw [r2 + 0x8], r3
0c1818: ldxdw r2, [r1 + 0x0]
0c1820: add64 r2, -0x1
0c1828: stxdw [r1 + 0x0], r2
0c1830: jne r2, 0x0, +0x3 ; branch 0xc1850
0c1838: ldxdw r2, [r1 + 0x8]
0c1840: add64 r2, -0x1
0c1848: stxdw [r1 + 0x8], r2
0c1850: ldxdw r1, [r10 - 0x458]
0c1858: ldxdw r2, [r10 - 0x460]
0c1860: ldxdw r3, [r2 + 0x0]
0c1868: add64 r3, -0x1
0c1870: stxdw [r2 + 0x0], r3
0c1878: jne r3, 0x0, +0x3 ; branch 0xc1898
0c1880: ldxdw r3, [r2 + 0x8]
0c1888: add64 r3, -0x1
0c1890: stxdw [r2 + 0x8], r3
0c1898: ldxdw r2, [r1 + 0x0]
0c18a0: add64 r2, -0x1
0c18a8: stxdw [r1 + 0x0], r2
0c18b0: jne r2, 0x0, -0x134 ; branch 0xc0f18
0c18b8: ldxdw r2, [r1 + 0x8]
0c18c0: add64 r2, -0x1
0c18c8: stxdw [r1 + 0x8], r2
0c18d0: ja -0x138 ; branch 0xc0f18
0c18d8: mov64 r1, r10
0c18e0: add64 r1, -0x6a8
0c18e8: mov64 r2, 0x7d5
0c18f0: call 0x88a8 ; call 0x105e38
0c18f8: ldxdw r3, [r10 - 0x6a0]
0c1900: ldxdw r2, [r10 - 0x6a8]
0c1908: mov64 r1, r10
0c1910: add64 r1, -0x6b8
0c1918: lddw r4, 0x11e32e ; rodata b'protocol_fee_recipient_token_accountfee_configfee_programprotocol_fee_recip'
0c1928: mov64 r5, 0x24
0c1930: call -0x17f78 ; call 0x1d78
0c1938: ldxdw r1, [r10 - 0x6b8]
0c1940: ldxdw r2, [r10 - 0x6b0]
0c1948: ja -0x14c ; branch 0xc0ef0
0c1950: mov64 r1, r10
0c1958: add64 r1, -0x6c8
0c1960: mov64 r2, r10
0c1968: add64 r2, -0x480
0c1970: call 0x82d9 ; call 0x103040
0c1978: ldxdw r1, [r10 - 0x6c8]
0c1980: ldxdw r2, [r10 - 0x6c0]
0c1988: ja -0x154 ; branch 0xc0ef0
0c1990: ldxdw r2, [r10 - 0xab0]
0c1998: ja -0x156 ; branch 0xc0ef0
0c19a0: mov64 r1, r10
0c19a8: add64 r1, -0x918
0c19b0: mov64 r2, 0x7d0
0c19b8: call 0x888f ; call 0x105e38
0c19c0: ldxdw r3, [r10 - 0x910]
0c19c8: ldxdw r2, [r10 - 0x918]
0c19d0: mov64 r1, r10
0c19d8: add64 r1, -0x928
0c19e0: lddw r4, 0x11e204 ; rodata b'coin_creator_vault_atacoin_creator_token_accountcoin_creator_vault_authorit'
0c19f0: mov64 r5, 0x16
0c19f8: call -0x17f91 ; call 0x1d78
0c1a00: ldxdw r1, [r10 - 0x928]
0c1a08: ldxdw r2, [r10 - 0x920]
0c1a10: ja -0x165 ; branch 0xc0ef0
0c1a18: ldxdw r2, [r10 - 0x3c8]
0c1a20: stxdw [r10 - 0x3c8], r2
0c1a28: stxdw [r10 - 0x3d0], r3
0c1a30: stxdw [r10 - 0x3d8], r1
0c1a38: mov64 r1, r10
0c1a40: add64 r1, -0x6d8
0c1a48: mov64 r2, r10
0c1a50: add64 r2, -0x3d8
0c1a58: call 0x82bc ; call 0x103040
0c1a60: ldxdw r1, [r10 - 0x6d8]
0c1a68: ldxdw r2, [r10 - 0x6d0]
0c1a70: stxdw [r6 + 0x10], r2
0c1a78: stxdw [r6 + 0x8], r1
0c1a80: lddw r1, -0x8000000000000000
0c1a90: stxdw [r6 + 0x0], r1
0c1a98: ldxdw r1, [r10 - 0x3a8]
0c1aa0: ldxdw r2, [r10 - 0x3b0]
0c1aa8: ldxdw r3, [r2 + 0x0]
0c1ab0: add64 r3, -0x1
0c1ab8: stxdw [r2 + 0x0], r3
0c1ac0: jne r3, 0x0, +0x3 ; branch 0xc1ae0
0c1ac8: ldxdw r3, [r2 + 0x8]
0c1ad0: add64 r3, -0x1
0c1ad8: stxdw [r2 + 0x8], r3
0c1ae0: ldxdw r2, [r1 + 0x0]
0c1ae8: add64 r2, -0x1
0c1af0: stxdw [r1 + 0x0], r2
0c1af8: jne r2, 0x0, +0x3 ; branch 0xc1b18
0c1b00: ldxdw r2, [r1 + 0x8]
0c1b08: add64 r2, -0x1
0c1b10: stxdw [r1 + 0x8], r2
0c1b18: ldxdw r1, [r10 - 0x458]
0c1b20: ldxdw r2, [r10 - 0x460]
0c1b28: ldxdw r3, [r2 + 0x0]
0c1b30: add64 r3, -0x1
0c1b38: stxdw [r2 + 0x0], r3
0c1b40: jne r3, 0x0, +0x3 ; branch 0xc1b60
0c1b48: ldxdw r3, [r2 + 0x8]
0c1b50: add64 r3, -0x1
0c1b58: stxdw [r2 + 0x8], r3
0c1b60: ldxdw r2, [r1 + 0x0]
0c1b68: add64 r2, -0x1
0c1b70: stxdw [r1 + 0x0], r2
0c1b78: jne r2, 0x0, -0x18d ; branch 0xc0f18
0c1b80: ja -0x5a ; branch 0xc18b8
0c1b88: mov64 r1, r10
0c1b90: add64 r1, -0x6e8
0c1b98: mov64 r2, 0x7d5
0c1ba0: call 0x8852 ; call 0x105e38
0c1ba8: ldxdw r3, [r10 - 0x6e0]
0c1bb0: ldxdw r2, [r10 - 0x6e8]
0c1bb8: mov64 r1, r10
0c1bc0: add64 r1, -0x6f8
0c1bc8: lddw r4, 0x11e204 ; rodata b'coin_creator_vault_atacoin_creator_token_accountcoin_creator_vault_authorit'
0c1bd8: mov64 r5, 0x16
0c1be0: call -0x17fce ; call 0x1d78
0c1be8: ldxdw r1, [r10 - 0x6f8]
0c1bf0: ldxdw r2, [r10 - 0x6f0]
0c1bf8: ja -0x1a2 ; branch 0xc0ef0
0c1c00: ldxdw r1, [r8 + 0x40]
0c1c08: stxdw [r10 - 0x3c0], r1
0c1c10: ldxdw r1, [r8 + 0x38]
0c1c18: stxdw [r10 - 0x3c8], r1
0c1c20: ldxdw r1, [r8 + 0x30]
0c1c28: stxdw [r10 - 0x3d0], r1
0c1c30: ldxdw r1, [r8 + 0x28]
0c1c38: stxdw [r10 - 0x3d8], r1
0c1c40: ldxdw r1, [r10 - 0xa18]
0c1c48: ldxdw r1, [r1 + 0x58]
0c1c50: ldxdw r1, [r1 + 0x0]
0c1c58: ldxdw r2, [r1 + 0x18]
0c1c60: stxdw [r10 - 0x450], r2
0c1c68: ldxdw r2, [r1 + 0x10]
0c1c70: stxdw [r10 - 0x458], r2
0c1c78: ldxdw r2, [r1 + 0x8]
0c1c80: stxdw [r10 - 0x460], r2
0c1c88: ldxdw r1, [r1 + 0x0]
0c1c90: stxdw [r10 - 0x468], r1
0c1c98: mov64 r1, r10
0c1ca0: add64 r1, -0x3d8
0c1ca8: mov64 r2, r10
0c1cb0: add64 r2, -0x468
0c1cb8: mov64 r3, 0x20
0c1cc0: call 0xaf83 ; call 0x1198e0
0c1cc8: lsh64 r0, 0x20
0c1cd0: rsh64 r0, 0x20
0c1cd8: jne r0, 0x0, +0x42 ; branch 0xc1ef0
0c1ce0: ldxdw r1, [r8 + 0x60]
0c1ce8: stxdw [r10 - 0x3c0], r1
0c1cf0: ldxdw r1, [r8 + 0x58]
0c1cf8: stxdw [r10 - 0x3c8], r1
0c1d00: ldxdw r1, [r8 + 0x50]
0c1d08: stxdw [r10 - 0x3d0], r1
0c1d10: ldxdw r1, [r8 + 0x48]
0c1d18: stxdw [r10 - 0x3d8], r1
0c1d20: ldxdw r1, [r10 - 0xa20]
0c1d28: ldxdw r1, [r1 + 0x58]
0c1d30: ldxdw r1, [r1 + 0x0]
0c1d38: ldxdw r2, [r1 + 0x18]
0c1d40: stxdw [r10 - 0x450], r2
0c1d48: ldxdw r2, [r1 + 0x10]
0c1d50: stxdw [r10 - 0x458], r2
0c1d58: ldxdw r2, [r1 + 0x8]
0c1d60: stxdw [r10 - 0x460], r2
0c1d68: ldxdw r1, [r1 + 0x0]
0c1d70: stxdw [r10 - 0x468], r1
0c1d78: mov64 r1, r10
0c1d80: add64 r1, -0x3d8
0c1d88: mov64 r2, r10
0c1d90: add64 r2, -0x468
0c1d98: mov64 r3, 0x20
0c1da0: call 0xaf67 ; call 0x1198e0
0c1da8: lsh64 r0, 0x20
0c1db0: rsh64 r0, 0x20
0c1db8: jeq r0, 0x0, +0x4c ; branch 0xc2020
0c1dc0: mov64 r1, r10
0c1dc8: add64 r1, -0x738
0c1dd0: mov64 r2, 0x9
0c1dd8: call -0x8e87 ; call 0x7a9a8
0c1de0: ldxdw r3, [r10 - 0x730]
0c1de8: ldxdw r2, [r10 - 0x738]
0c1df0: mov64 r1, r10
0c1df8: add64 r1, -0x748
0c1e00: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0c1e10: mov64 r5, 0x4
0c1e18: call -0x18015 ; call 0x1d78
0c1e20: ldxdw r3, [r10 - 0x740]
0c1e28: ldxdw r2, [r10 - 0x748]
0c1e30: ldxdw r1, [r10 - 0x3c0]
0c1e38: stxdw [r10 - 0x3a0], r1
0c1e40: ldxdw r1, [r10 - 0x3c8]
0c1e48: stxdw [r10 - 0x3a8], r1
0c1e50: ldxdw r1, [r10 - 0x3d0]
0c1e58: stxdw [r10 - 0x3b0], r1
0c1e60: ldxdw r1, [r10 - 0x3d8]
0c1e68: stxdw [r10 - 0x3b8], r1
0c1e70: ldxdw r1, [r10 - 0x468]
0c1e78: stxdw [r10 - 0x398], r1
0c1e80: ldxdw r1, [r10 - 0x460]
0c1e88: stxdw [r10 - 0x390], r1
0c1e90: ldxdw r1, [r10 - 0x458]
0c1e98: stxdw [r10 - 0x388], r1
0c1ea0: ldxdw r1, [r10 - 0x450]
0c1ea8: stxdw [r10 - 0x380], r1
0c1eb0: mov64 r1, r10
0c1eb8: add64 r1, -0x758
0c1ec0: mov64 r4, r10
0c1ec8: add64 r4, -0x3b8
0c1ed0: call 0x825f ; call 0x1031d0
0c1ed8: ldxdw r1, [r10 - 0x758]
0c1ee0: ldxdw r2, [r10 - 0x750]
0c1ee8: ja -0x200 ; branch 0xc0ef0
0c1ef0: mov64 r1, r10
0c1ef8: add64 r1, -0x708
0c1f00: mov64 r2, 0x8
0c1f08: call -0x8ead ; call 0x7a9a8
0c1f10: ldxdw r3, [r10 - 0x700]
0c1f18: ldxdw r2, [r10 - 0x708]
0c1f20: mov64 r1, r10
0c1f28: add64 r1, -0x718
0c1f30: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0c1f40: mov64 r5, 0x4
0c1f48: call -0x1803b ; call 0x1d78
0c1f50: ldxdw r3, [r10 - 0x710]
0c1f58: ldxdw r2, [r10 - 0x718]
0c1f60: ldxdw r1, [r10 - 0x3c0]
0c1f68: stxdw [r10 - 0x3a0], r1
0c1f70: ldxdw r1, [r10 - 0x3c8]
0c1f78: stxdw [r10 - 0x3a8], r1
0c1f80: ldxdw r1, [r10 - 0x3d0]
0c1f88: stxdw [r10 - 0x3b0], r1
0c1f90: ldxdw r1, [r10 - 0x3d8]
0c1f98: stxdw [r10 - 0x3b8], r1
0c1fa0: ldxdw r1, [r10 - 0x468]
0c1fa8: stxdw [r10 - 0x398], r1
0c1fb0: ldxdw r1, [r10 - 0x460]
0c1fb8: stxdw [r10 - 0x390], r1
0c1fc0: ldxdw r1, [r10 - 0x458]
0c1fc8: stxdw [r10 - 0x388], r1
0c1fd0: ldxdw r1, [r10 - 0x450]
0c1fd8: stxdw [r10 - 0x380], r1
0c1fe0: mov64 r1, r10
0c1fe8: add64 r1, -0x728
0c1ff0: mov64 r4, r10
0c1ff8: add64 r4, -0x3b8
0c2000: call 0x8239 ; call 0x1031d0
0c2008: ldxdw r1, [r10 - 0x728]
0c2010: ldxdw r2, [r10 - 0x720]
0c2018: ja -0x226 ; branch 0xc0ef0
0c2020: ldxdw r1, [r8 + 0xa0]
0c2028: stxdw [r10 - 0x3c0], r1
0c2030: ldxdw r1, [r8 + 0x98]
0c2038: stxdw [r10 - 0x3c8], r1
0c2040: ldxdw r1, [r8 + 0x90]
0c2048: stxdw [r10 - 0x3d0], r1
0c2050: ldxdw r1, [r8 + 0x88]
0c2058: stxdw [r10 - 0x3d8], r1
0c2060: ldxdw r1, [r10 - 0xa30]
0c2068: ldxdw r9, [r1 + 0x20]
0c2070: ldxdw r1, [r9 + 0x0]
0c2078: ldxdw r2, [r1 + 0x18]
0c2080: stxdw [r10 - 0x450], r2
0c2088: ldxdw r2, [r1 + 0x10]
0c2090: stxdw [r10 - 0x458], r2
0c2098: ldxdw r2, [r1 + 0x8]
0c20a0: stxdw [r10 - 0x460], r2
0c20a8: ldxdw r1, [r1 + 0x0]
0c20b0: stxdw [r10 - 0x468], r1
0c20b8: mov64 r1, r10
0c20c0: add64 r1, -0x3d8
0c20c8: mov64 r2, r10
0c20d0: add64 r2, -0x468
0c20d8: mov64 r3, 0x20
0c20e0: call 0xaeff ; call 0x1198e0
0c20e8: lsh64 r0, 0x20
0c20f0: rsh64 r0, 0x20
0c20f8: jeq r0, 0x0, +0x26 ; branch 0xc2230
0c2100: mov64 r1, r10
0c2108: add64 r1, -0x768
0c2110: mov64 r2, 0xe
0c2118: call -0x8eef ; call 0x7a9a8
0c2120: ldxdw r3, [r10 - 0x760]
0c2128: ldxdw r2, [r10 - 0x768]
0c2130: mov64 r1, r10
0c2138: add64 r1, -0x778
0c2140: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0c2150: mov64 r5, 0x4
0c2158: call -0x1807d ; call 0x1d78
0c2160: ldxdw r3, [r10 - 0x770]
0c2168: ldxdw r2, [r10 - 0x778]
0c2170: ldxdw r1, [r10 - 0x3c0]
0c2178: stxdw [r10 - 0x3a0], r1
0c2180: ldxdw r1, [r10 - 0x3c8]
0c2188: stxdw [r10 - 0x3a8], r1
0c2190: ldxdw r1, [r10 - 0x3d0]
0c2198: stxdw [r10 - 0x3b0], r1
0c21a0: ldxdw r1, [r10 - 0x3d8]
0c21a8: stxdw [r10 - 0x3b8], r1
0c21b0: ldxdw r1, [r10 - 0x468]
0c21b8: stxdw [r10 - 0x398], r1
0c21c0: ldxdw r1, [r10 - 0x460]
0c21c8: stxdw [r10 - 0x390], r1
0c21d0: ldxdw r1, [r10 - 0x458]
0c21d8: stxdw [r10 - 0x388], r1
0c21e0: ldxdw r1, [r10 - 0x450]
0c21e8: stxdw [r10 - 0x380], r1
0c21f0: mov64 r1, r10
0c21f8: add64 r1, -0x788
0c2200: mov64 r4, r10
0c2208: add64 r4, -0x3b8
0c2210: call 0x81f7 ; call 0x1031d0
0c2218: ldxdw r1, [r10 - 0x788]
0c2220: ldxdw r2, [r10 - 0x780]
0c2228: ja -0x268 ; branch 0xc0ef0
0c2230: ldxdw r1, [r8 + 0xc0]
0c2238: stxdw [r10 - 0x3c0], r1
0c2240: ldxdw r1, [r8 + 0xb8]
0c2248: stxdw [r10 - 0x3c8], r1
0c2250: ldxdw r1, [r8 + 0xb0]
0c2258: stxdw [r10 - 0x3d0], r1
0c2260: ldxdw r1, [r8 + 0xa8]
0c2268: stxdw [r10 - 0x3d8], r1
0c2270: ldxdw r1, [r10 - 0xa38]
0c2278: ldxdw r1, [r1 + 0x20]
0c2280: stxdw [r10 - 0xab8], r1
0c2288: ldxdw r1, [r1 + 0x0]
0c2290: ldxdw r2, [r1 + 0x18]
0c2298: stxdw [r10 - 0x450], r2
0c22a0: ldxdw r2, [r1 + 0x10]
0c22a8: stxdw [r10 - 0x458], r2
0c22b0: ldxdw r2, [r1 + 0x8]
0c22b8: stxdw [r10 - 0x460], r2
0c22c0: ldxdw r1, [r1 + 0x0]
0c22c8: stxdw [r10 - 0x468], r1
0c22d0: mov64 r1, r10
0c22d8: add64 r1, -0x3d8
0c22e0: mov64 r2, r10
0c22e8: add64 r2, -0x468
0c22f0: mov64 r3, 0x20
0c22f8: call 0xaebc ; call 0x1198e0
0c2300: lsh64 r0, 0x20
0c2308: rsh64 r0, 0x20
0c2310: jeq r0, 0x0, +0x26 ; branch 0xc2448
0c2318: mov64 r1, r10
0c2320: add64 r1, -0x798
0c2328: mov64 r2, 0xf
0c2330: call -0x8f32 ; call 0x7a9a8
0c2338: ldxdw r3, [r10 - 0x790]
0c2340: ldxdw r2, [r10 - 0x798]
0c2348: mov64 r1, r10
0c2350: add64 r1, -0x7a8
0c2358: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0c2368: mov64 r5, 0x4
0c2370: call -0x180c0 ; call 0x1d78
0c2378: ldxdw r3, [r10 - 0x7a0]
0c2380: ldxdw r2, [r10 - 0x7a8]
0c2388: ldxdw r1, [r10 - 0x3c0]
0c2390: stxdw [r10 - 0x3a0], r1
0c2398: ldxdw r1, [r10 - 0x3c8]
0c23a0: stxdw [r10 - 0x3a8], r1
0c23a8: ldxdw r1, [r10 - 0x3d0]
0c23b0: stxdw [r10 - 0x3b0], r1
0c23b8: ldxdw r1, [r10 - 0x3d8]
0c23c0: stxdw [r10 - 0x3b8], r1
0c23c8: ldxdw r1, [r10 - 0x468]
0c23d0: stxdw [r10 - 0x398], r1
0c23d8: ldxdw r1, [r10 - 0x460]
0c23e0: stxdw [r10 - 0x390], r1
0c23e8: ldxdw r1, [r10 - 0x458]
0c23f0: stxdw [r10 - 0x388], r1
0c23f8: ldxdw r1, [r10 - 0x450]
0c2400: stxdw [r10 - 0x380], r1
0c2408: mov64 r1, r10
0c2410: add64 r1, -0x7b8
0c2418: mov64 r4, r10
0c2420: add64 r4, -0x3b8
0c2428: call 0x81b4 ; call 0x1031d0
0c2430: ldxdw r1, [r10 - 0x7b8]
0c2438: ldxdw r2, [r10 - 0x7b0]
0c2440: ja -0x2ab ; branch 0xc0ef0
0c2448: ldxdw r1, [r10 - 0x5d8]
0c2450: ldxb r1, [r1 + 0x29]
0c2458: jeq r1, 0x0, +0x25 ; branch 0xc2588
0c2460: ldxdw r1, [r7 + 0x20]
0c2468: ldxb r1, [r1 + 0x29]
0c2470: jne r1, 0x0, +0xf ; branch 0xc24f0
0c2478: mov64 r1, r10
0c2480: add64 r1, -0x8b8
0c2488: mov64 r2, 0x7d0
0c2490: call 0x8734 ; call 0x105e38
0c2498: ldxdw r3, [r10 - 0x8b0]
0c24a0: ldxdw r2, [r10 - 0x8b8]
0c24a8: mov64 r1, r10
0c24b0: add64 r1, -0x8c8
0c24b8: lddw r4, 0x11e2ed ; rodata b'user_base_token_accountuser_quote_token_accounttoken_2022_programprotocol_f'
0c24c8: mov64 r5, 0x17
0c24d0: call -0x180ec ; call 0x1d78
0c24d8: ldxdw r1, [r10 - 0x8c8]
0c24e0: ldxdw r2, [r10 - 0x8c0]
0c24e8: ja -0x2c0 ; branch 0xc0ef0
0c24f0: ldxdw r1, [r10 - 0xa28]
0c24f8: ldxdw r1, [r1 + 0x20]
0c2500: ldxb r1, [r1 + 0x29]
0c2508: jne r1, 0x0, +0x1e ; branch 0xc2600
0c2510: mov64 r1, r10
0c2518: add64 r1, -0x898
0c2520: mov64 r2, 0x7d0
0c2528: call 0x8721 ; call 0x105e38
0c2530: ldxdw r3, [r10 - 0x890]
0c2538: ldxdw r2, [r10 - 0x898]
0c2540: mov64 r1, r10
0c2548: add64 r1, -0x8a8
0c2550: lddw r4, 0x11e304 ; rodata b'user_quote_token_accounttoken_2022_programprotocol_fee_recipient_token_acco'
0c2560: mov64 r5, 0x18
0c2568: call -0x180ff ; call 0x1d78
0c2570: ldxdw r1, [r10 - 0x8a8]
0c2578: ldxdw r2, [r10 - 0x8a0]
0c2580: ja -0x2d3 ; branch 0xc0ef0
0c2588: mov64 r1, r10
0c2590: add64 r1, -0x8d8
0c2598: mov64 r2, 0x7d0
0c25a0: call 0x8712 ; call 0x105e38
0c25a8: ldxdw r3, [r10 - 0x8d0]
0c25b0: ldxdw r2, [r10 - 0x8d8]
0c25b8: mov64 r1, r10
0c25c0: add64 r1, -0x8e8
0c25c8: lddw r4, 0x11c004 ; rodata b'userbaseS\x00\x00\x00\x03\x00\x00\x00\x02\x00\x00\x001\x00\x00\x00Some\x10\x00\x00\x00L\x00\x00\x00O\x00\x00\x00 <= trueM\x00\x00\x00\x06\x00\x00\x00\xd6\x07\x00\x00\x17\x00\x00\x00\x1f\x00\x00\x00\xc5\t\x00\x00\x01\x00\x00'
0c25d8: mov64 r5, 0x4
0c25e0: call -0x1810e ; call 0x1d78
0c25e8: ldxdw r1, [r10 - 0x8e8]
0c25f0: ldxdw r2, [r10 - 0x8e0]
0c25f8: ja -0x2e2 ; branch 0xc0ef0
0c2600: ldxb r1, [r9 + 0x29]
0c2608: jne r1, 0x0, +0xf ; branch 0xc2688
0c2610: mov64 r1, r10
0c2618: add64 r1, -0x878
0c2620: mov64 r2, 0x7d0
0c2628: call 0x8701 ; call 0x105e38
0c2630: ldxdw r3, [r10 - 0x870]
0c2638: ldxdw r2, [r10 - 0x878]
0c2640: mov64 r1, r10
0c2648: add64 r1, -0x888
0c2650: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0c2660: mov64 r5, 0x17
0c2668: call -0x1811f ; call 0x1d78
0c2670: ldxdw r1, [r10 - 0x888]
0c2678: ldxdw r2, [r10 - 0x880]
0c2680: ja -0x2f3 ; branch 0xc0ef0
0c2688: ldxdw r1, [r10 - 0xab8]
0c2690: ldxb r1, [r1 + 0x29]
0c2698: jne r1, 0x0, +0xf ; branch 0xc2718
0c26a0: mov64 r1, r10
0c26a8: add64 r1, -0x858
0c26b0: mov64 r2, 0x7d0
0c26b8: call 0x86ef ; call 0x105e38
0c26c0: ldxdw r3, [r10 - 0x850]
0c26c8: ldxdw r2, [r10 - 0x858]
0c26d0: mov64 r1, r10
0c26d8: add64 r1, -0x868
0c26e0: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0c26f0: mov64 r5, 0x18
0c26f8: call -0x18131 ; call 0x1d78
0c2700: ldxdw r1, [r10 - 0x868]
0c2708: ldxdw r2, [r10 - 0x860]
0c2710: ja -0x305 ; branch 0xc0ef0
0c2718: mov64 r1, r10
0c2720: add64 r1, -0x3b8
0c2728: lddw r2, 0x1229d0 ; rodata b"\x00\x00\x00\x00F\xc6\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00"
0c2738: mov64 r3, 0x1
0c2740: ldxdw r4, [r10 - 0xa00]
0c2748: call 0x9723 ; call 0x10e068
0c2750: ldxdw r1, [r10 - 0x3a0]
0c2758: stxdw [r10 - 0x420], r1
0c2760: ldxdw r1, [r10 - 0x3a8]
0c2768: stxdw [r10 - 0x428], r1
0c2770: ldxdw r1, [r10 - 0x3b0]
0c2778: stxdw [r10 - 0x430], r1
0c2780: ldxdw r1, [r10 - 0x3b8]
0c2788: stxdw [r10 - 0x438], r1
0c2790: ldxb r1, [r10 - 0x398]
0c2798: ldxdw r2, [r10 - 0xa08]
0c27a0: stxb [r2 + 0x0], r1
0c27a8: ldxdw r2, [r10 - 0xa50]
0c27b0: ldxdw r1, [r2 + 0x18]
0c27b8: stxdw [r10 - 0x3a0], r1
0c27c0: ldxdw r1, [r2 + 0x10]
0c27c8: stxdw [r10 - 0x3a8], r1
0c27d0: ldxdw r1, [r2 + 0x8]
0c27d8: stxdw [r10 - 0x3b0], r1
0c27e0: ldxdw r1, [r2 + 0x0]
0c27e8: stxdw [r10 - 0x3b8], r1
0c27f0: mov64 r1, r10
0c27f8: add64 r1, -0x3b8
0c2800: mov64 r2, r10
0c2808: add64 r2, -0x438
0c2810: mov64 r3, 0x20
0c2818: call 0xae18 ; call 0x1198e0
0c2820: lsh64 r0, 0x20
0c2828: rsh64 r0, 0x20
0c2830: jne r0, 0x0, +0x53 ; branch 0xc2ad0
0c2838: mov64 r1, r8
0c2840: add64 r1, 0xc8
0c2848: stxdw [r10 - 0x458], r1
0c2850: lddw r1, 0x11c868 ; rodata b'creator_vaultprograms/pump-amm/src/instructions/coin_creator/migrate_pool_c'
0c2860: stxdw [r10 - 0x468], r1
0c2868: stdw [r10 - 0x450], 0x20
0c2870: stdw [r10 - 0x460], 0xd
0c2878: mov64 r1, r10
0c2880: add64 r1, -0x3b8
0c2888: mov64 r2, r10
0c2890: add64 r2, -0x468
0c2898: mov64 r3, 0x2
0c28a0: ldxdw r4, [r10 - 0xa00]
0c28a8: call 0x96f7 ; call 0x10e068
0c28b0: ldxdw r1, [r10 - 0x3a0]
0c28b8: stxdw [r10 - 0x400], r1
0c28c0: ldxdw r1, [r10 - 0x3a8]
0c28c8: stxdw [r10 - 0x408], r1
0c28d0: ldxdw r1, [r10 - 0x3b0]
0c28d8: stxdw [r10 - 0x410], r1
0c28e0: ldxdw r1, [r10 - 0x3b8]
0c28e8: stxdw [r10 - 0x418], r1
0c28f0: ldxb r1, [r10 - 0x398]
0c28f8: ldxdw r2, [r10 - 0xa08]
0c2900: stxb [r2 + 0x1], r1
0c2908: ldxdw r1, [r10 - 0x558]
0c2910: ldxdw r2, [r1 + 0x0]
0c2918: stxdw [r10 - 0x3b8], r2
0c2920: ldxdw r2, [r1 + 0x8]
0c2928: stxdw [r10 - 0x3b0], r2
0c2930: ldxdw r2, [r1 + 0x10]
0c2938: stxdw [r10 - 0x3a8], r2
0c2940: ldxdw r1, [r1 + 0x18]
0c2948: stxdw [r10 - 0x3a0], r1
0c2950: mov64 r1, r10
0c2958: add64 r1, -0x3b8
0c2960: mov64 r2, r10
0c2968: add64 r2, -0x418
0c2970: mov64 r3, 0x20
0c2978: call 0xadec ; call 0x1198e0
0c2980: lsh64 r0, 0x20
0c2988: rsh64 r0, 0x20
0c2990: jeq r0, 0x0, +0x4e ; branch 0xc2c08
0c2998: mov64 r1, r10
0c29a0: add64 r1, -0x7f8
0c29a8: mov64 r2, 0x7d6
0c29b0: call 0x8690 ; call 0x105e38
0c29b8: ldxdw r3, [r10 - 0x7f0]
0c29c0: ldxdw r2, [r10 - 0x7f8]
0c29c8: mov64 r1, r10
0c29d0: add64 r1, -0x808
0c29d8: lddw r4, 0x11e234 ; rodata b'coin_creator_vault_authoritycoin_creatorsharing-configsharing_configbonding'
0c29e8: mov64 r5, 0x1c
0c29f0: call -0x18190 ; call 0x1d78
0c29f8: ldxdw r3, [r10 - 0x800]
0c2a00: ldxdw r2, [r10 - 0x808]
0c2a08: ldxdw r1, [r10 - 0x558]
0c2a10: ldxdw r4, [r1 + 0x18]
0c2a18: ldxdw r5, [r1 + 0x10]
0c2a20: ldxdw r0, [r1 + 0x8]
0c2a28: ldxdw r1, [r1 + 0x0]
0c2a30: ldxdw r7, [r10 - 0x418]
0c2a38: stxdw [r10 - 0x398], r7
0c2a40: ldxdw r7, [r10 - 0x410]
0c2a48: stxdw [r10 - 0x390], r7
0c2a50: ldxdw r7, [r10 - 0x408]
0c2a58: stxdw [r10 - 0x388], r7
0c2a60: ldxdw r7, [r10 - 0x400]
0c2a68: stxdw [r10 - 0x380], r7
0c2a70: stxdw [r10 - 0x3b8], r1
0c2a78: stxdw [r10 - 0x3b0], r0
0c2a80: stxdw [r10 - 0x3a8], r5
0c2a88: stxdw [r10 - 0x3a0], r4
0c2a90: mov64 r1, r10
0c2a98: add64 r1, -0x818
0c2aa0: mov64 r4, r10
0c2aa8: add64 r4, -0x3b8
0c2ab0: call 0x80e3 ; call 0x1031d0
0c2ab8: ldxdw r1, [r10 - 0x818]
0c2ac0: ldxdw r2, [r10 - 0x810]
0c2ac8: ja -0x37c ; branch 0xc0ef0
0c2ad0: mov64 r1, r10
0c2ad8: add64 r1, -0x7c8
0c2ae0: mov64 r2, 0x7d6
0c2ae8: call 0x8669 ; call 0x105e38
0c2af0: ldxdw r3, [r10 - 0x7c0]
0c2af8: ldxdw r2, [r10 - 0x7c8]
0c2b00: mov64 r1, r10
0c2b08: add64 r1, -0x7d8
0c2b10: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0c2b20: mov64 r5, 0xf
0c2b28: call -0x181b7 ; call 0x1d78
0c2b30: ldxdw r3, [r10 - 0x7d0]
0c2b38: ldxdw r2, [r10 - 0x7d8]
0c2b40: ldxdw r4, [r10 - 0xa50]
0c2b48: ldxdw r1, [r4 + 0x18]
0c2b50: stxdw [r10 - 0x3a0], r1
0c2b58: ldxdw r1, [r4 + 0x10]
0c2b60: stxdw [r10 - 0x3a8], r1
0c2b68: ldxdw r1, [r4 + 0x8]
0c2b70: stxdw [r10 - 0x3b0], r1
0c2b78: ldxdw r1, [r4 + 0x0]
0c2b80: stxdw [r10 - 0x3b8], r1
0c2b88: ldxdw r1, [r10 - 0x438]
0c2b90: stxdw [r10 - 0x398], r1
0c2b98: ldxdw r1, [r10 - 0x430]
0c2ba0: stxdw [r10 - 0x390], r1
0c2ba8: ldxdw r1, [r10 - 0x428]
0c2bb0: stxdw [r10 - 0x388], r1
0c2bb8: ldxdw r1, [r10 - 0x420]
0c2bc0: stxdw [r10 - 0x380], r1
0c2bc8: mov64 r1, r10
0c2bd0: add64 r1, -0x7e8
0c2bd8: mov64 r4, r10
0c2be0: add64 r4, -0x3b8
0c2be8: call 0x80bc ; call 0x1031d0
0c2bf0: ldxdw r1, [r10 - 0x7e8]
0c2bf8: ldxdw r2, [r10 - 0x7e0]
0c2c00: ja -0x3a3 ; branch 0xc0ef0
0c2c08: lddw r1, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0c2c18: stxdw [r10 - 0x3c8], r1
0c2c20: lddw r1, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0c2c30: stxdw [r10 - 0x3d8], r1
0c2c38: stdw [r10 - 0x3c0], 0x20
0c2c40: stdw [r10 - 0x3d0], 0xa
0c2c48: ldxdw r1, [r10 - 0xa88]
0c2c50: ldxdw r1, [r1 + 0x0]
0c2c58: ldxdw r2, [r1 + 0x0]
0c2c60: ldxdw r3, [r1 + 0x8]
0c2c68: ldxdw r4, [r1 + 0x10]
0c2c70: ldxdw r1, [r1 + 0x18]
0c2c78: stxdw [r10 - 0x450], r1
0c2c80: stxdw [r10 - 0x458], r4
0c2c88: stxdw [r10 - 0x460], r3
0c2c90: stxdw [r10 - 0x468], r2
0c2c98: mov64 r1, r10
0c2ca0: add64 r1, -0x3b8
0c2ca8: mov64 r2, r10
0c2cb0: add64 r2, -0x3d8
0c2cb8: mov64 r4, r10
0c2cc0: add64 r4, -0x468
0c2cc8: mov64 r3, 0x2
0c2cd0: call 0x9672 ; call 0x10e068
0c2cd8: ldxdw r1, [r10 - 0x3a0]
0c2ce0: stxdw [r10 - 0x3e0], r1
0c2ce8: ldxdw r1, [r10 - 0x3a8]
0c2cf0: stxdw [r10 - 0x3e8], r1
0c2cf8: ldxdw r1, [r10 - 0x3b0]
0c2d00: stxdw [r10 - 0x3f0], r1
0c2d08: ldxdw r1, [r10 - 0x3b8]
0c2d10: stxdw [r10 - 0x3f8], r1
0c2d18: ldxb r1, [r10 - 0x398]
0c2d20: ldxdw r2, [r10 - 0xa08]
0c2d28: stxb [r2 + 0x2], r1
0c2d30: ldxdw r1, [r10 - 0xa90]
0c2d38: ldxdw r1, [r1 + 0x0]
0c2d40: ldxdw r2, [r1 + 0x18]
0c2d48: stxdw [r10 - 0x3a0], r2
0c2d50: ldxdw r2, [r1 + 0x10]
0c2d58: stxdw [r10 - 0x3a8], r2
0c2d60: ldxdw r2, [r1 + 0x8]
0c2d68: stxdw [r10 - 0x3b0], r2
0c2d70: ldxdw r1, [r1 + 0x0]
0c2d78: stxdw [r10 - 0x3b8], r1
0c2d80: mov64 r1, r10
0c2d88: add64 r1, -0x3b8
0c2d90: mov64 r2, r10
0c2d98: add64 r2, -0x3f8
0c2da0: mov64 r3, 0x20
0c2da8: call 0xad66 ; call 0x1198e0
0c2db0: lsh64 r0, 0x20
0c2db8: rsh64 r0, 0x20
0c2dc0: jeq r0, 0x0, +0x28 ; branch 0xc2f08
0c2dc8: mov64 r1, r10
0c2dd0: add64 r1, -0x828
0c2dd8: mov64 r2, 0x7d6
0c2de0: call 0x860a ; call 0x105e38
0c2de8: ldxdw r3, [r10 - 0x820]
0c2df0: ldxdw r2, [r10 - 0x828]
0c2df8: mov64 r1, r10
0c2e00: add64 r1, -0x838
0c2e08: lddw r4, 0x11e352 ; rodata b'fee_configfee_programprotocol_fee_recipientuser_in_token_accountuser_out_to'
0c2e18: mov64 r5, 0xa
0c2e20: call -0x18216 ; call 0x1d78
0c2e28: ldxdw r3, [r10 - 0x830]
0c2e30: ldxdw r2, [r10 - 0x838]
0c2e38: ldxdw r1, [r10 - 0xa90]
0c2e40: ldxdw r1, [r1 + 0x0]
0c2e48: ldxdw r4, [r1 + 0x18]
0c2e50: stxdw [r10 - 0x3a0], r4
0c2e58: ldxdw r4, [r1 + 0x10]
0c2e60: stxdw [r10 - 0x3a8], r4
0c2e68: ldxdw r4, [r1 + 0x8]
0c2e70: stxdw [r10 - 0x3b0], r4
0c2e78: ldxdw r1, [r1 + 0x0]
0c2e80: stxdw [r10 - 0x3b8], r1
0c2e88: ldxdw r1, [r10 - 0x3f8]
0c2e90: stxdw [r10 - 0x398], r1
0c2e98: ldxdw r1, [r10 - 0x3f0]
0c2ea0: stxdw [r10 - 0x390], r1
0c2ea8: ldxdw r1, [r10 - 0x3e8]
0c2eb0: stxdw [r10 - 0x388], r1
0c2eb8: ldxdw r1, [r10 - 0x3e0]
0c2ec0: stxdw [r10 - 0x380], r1
0c2ec8: mov64 r1, r10
0c2ed0: add64 r1, -0x848
0c2ed8: mov64 r4, r10
0c2ee0: add64 r4, -0x3b8
0c2ee8: call 0x805c ; call 0x1031d0
0c2ef0: ldxdw r1, [r10 - 0x848]
0c2ef8: ldxdw r2, [r10 - 0x840]
0c2f00: ja -0x403 ; branch 0xc0ef0
0c2f08: ldxdw r1, [r10 - 0x5d8]
0c2f10: stxdw [r10 - 0xa00], r1
0c2f18: mov64 r1, r6
0c2f20: add64 r1, 0x90
0c2f28: mov64 r2, r10
0c2f30: add64 r2, -0x5d0
0c2f38: mov64 r3, 0x30
0c2f40: call 0xad2a ; call 0x119898
0c2f48: ldxdw r1, [r10 - 0x598]
0c2f50: stxdw [r10 - 0xa08], r1
0c2f58: ldxdw r1, [r10 - 0x590]
0c2f60: stxdw [r10 - 0xab8], r1
0c2f68: ldxdw r9, [r10 - 0x588]
0c2f70: ldxh r1, [r10 - 0x568]
0c2f78: stxh [r6 + 0xe8], r1
0c2f80: ldxdw r1, [r10 - 0x570]
0c2f88: stxdw [r6 + 0xe0], r1
0c2f90: ldxdw r1, [r10 - 0x578]
0c2f98: stxdw [r6 + 0xd8], r1
0c2fa0: ldxw r1, [r10 - 0x580]
0c2fa8: stxw [r6 + 0xeb], r1
0c2fb0: ldxb r1, [r10 - 0x57c]
0c2fb8: stxb [r6 + 0xef], r1
0c2fc0: mov64 r1, r6
0c2fc8: add64 r1, 0xf0
0c2fd0: mov64 r2, r10
0c2fd8: add64 r2, -0x558
0c2fe0: mov64 r3, 0x30
0c2fe8: call 0xad15 ; call 0x119898
0c2ff0: mov64 r1, r6
0c2ff8: add64 r1, 0x28
0c3000: mov64 r2, r10
0c3008: add64 r2, -0x528
0c3010: mov64 r3, 0x60
0c3018: call 0xad0f ; call 0x119898
0c3020: ldxdw r1, [r10 - 0xa88]
0c3028: stxdw [r6 + 0x1a0], r1
0c3030: ldxdw r1, [r10 - 0xab0]
0c3038: stxdw [r6 + 0x198], r1
0c3040: ldxdw r1, [r10 - 0xa68]
0c3048: stxdw [r6 + 0x190], r1
0c3050: stxdw [r6 + 0x188], r9
0c3058: ldxdw r1, [r10 - 0xab8]
0c3060: stxdw [r6 + 0x180], r1
0c3068: ldxdw r1, [r10 - 0xa08]
0c3070: stxdw [r6 + 0x178], r1
0c3078: ldxdw r1, [r10 - 0xa40]
0c3080: stxdw [r6 + 0x170], r1
0c3088: ldxdw r1, [r10 - 0xaa8]
0c3090: stxdw [r6 + 0x168], r1
0c3098: ldxdw r1, [r10 - 0xa38]
0c30a0: stxdw [r6 + 0x160], r1
0c30a8: ldxdw r1, [r10 - 0xa30]
0c30b0: stxdw [r6 + 0x158], r1
0c30b8: ldxdw r1, [r10 - 0xa28]
0c30c0: stxdw [r6 + 0x150], r1
0c30c8: stxdw [r6 + 0x148], r7
0c30d0: ldxdw r1, [r10 - 0xa20]
0c30d8: stxdw [r6 + 0x140], r1
0c30e0: ldxdw r1, [r10 - 0xa18]
0c30e8: stxdw [r6 + 0x138], r1
0c30f0: ldxdw r1, [r10 - 0xa10]
0c30f8: stxdw [r6 + 0x130], r1
0c3100: ldxdw r1, [r10 - 0xa00]
0c3108: stxdw [r6 + 0x128], r1
0c3110: stxdw [r6 + 0x120], r8
0c3118: ldxdw r1, [r10 - 0xa60]
0c3120: stxb [r6 + 0xea], r1
0c3128: ldxdw r1, [r10 - 0xa58]
0c3130: stxdw [r6 + 0xd0], r1
0c3138: ldxdw r1, [r10 - 0xa48]
0c3140: stxdw [r6 + 0xc8], r1
0c3148: ldxdw r1, [r10 - 0xa50]
0c3150: stxdw [r6 + 0xc0], r1
0c3158: ldxdw r1, [r10 - 0xa90]
0c3160: stxdw [r6 + 0x88], r1
0c3168: ldxdw r1, [r10 - 0xaa0]
0c3170: stxdw [r6 + 0x20], r1
0c3178: ldxdw r1, [r10 - 0xa98]
0c3180: stxdw [r6 + 0x18], r1
0c3188: ldxdw r1, [r10 - 0xa70]
0c3190: stxdw [r6 + 0x10], r1
0c3198: ldxdw r1, [r10 - 0xa78]
0c31a0: stxdw [r6 + 0x8], r1
0c31a8: ldxdw r1, [r10 - 0xa80]
0c31b0: ja -0x5a2 ; branch 0xc04a8
