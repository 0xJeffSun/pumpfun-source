080fb8: mov64 r8, r5
080fc0: mov64 r7, r3
080fc8: mov64 r6, r1
080fd0: stxdw [r10 - 0x828], r2
080fd8: mov64 r1, r10
080fe0: add64 r1, -0x7b0
080fe8: mov64 r2, r7
080ff0: call -0xe2b4 ; call 0xfa58
080ff8: ldxdw r3, [r10 - 0x7a8]
081000: ldxdw r2, [r10 - 0x7b0]
081008: jne r2, 0x2, +0x26 ; branch 0x81140
081010: ldxdw r9, [r8 - 0xff8]
081018: stxdw [r10 - 0x820], r3
081020: ldxdw r1, [r7 + 0x8]
081028: jeq r1, 0x0, +0x2b ; branch 0x81188
081030: ldxdw r2, [r7 + 0x0]
081038: stxdw [r10 - 0x818], r2
081040: add64 r1, -0x1
081048: stxdw [r7 + 0x8], r1
081050: add64 r2, 0x30
081058: stxdw [r7 + 0x0], r2
081060: mov64 r1, r10
081068: add64 r1, -0x7b0
081070: mov64 r2, r7
081078: call -0xe0a6 ; call 0x10b50
081080: ldxdw r3, [r10 - 0x7a8]
081088: ldxdw r2, [r10 - 0x7b0]
081090: jne r2, 0x2, +0x25 ; branch 0x811c0
081098: stxdw [r10 - 0x810], r3
0810a0: ldxdw r2, [r7 + 0x8]
0810a8: jeq r2, 0x0, +0x7e ; branch 0x814a0
0810b0: ldxdw r1, [r7 + 0x0]
0810b8: mov64 r3, r1
0810c0: add64 r3, 0x30
0810c8: stxdw [r7 + 0x0], r3
0810d0: mov64 r3, r2
0810d8: add64 r3, -0x1
0810e0: stxdw [r7 + 0x8], r3
0810e8: ldxdw r0, [r1 + 0x8]
0810f0: ldxdw r4, [r0 + 0x0]
0810f8: add64 r4, 0x1
081100: mov64 r5, 0x1
081108: jeq r4, 0x0, +0x1 ; branch 0x81118
081110: mov64 r5, 0x0
081118: ldxdw r8, [r1 + 0x0]
081120: stxdw [r10 - 0x9d0], r8
081128: stxdw [r0 + 0x0], r4
081130: jne r5, 0x1, +0x1a ; branch 0x81208
081138: call -0x1
081140: mov64 r1, r10
081148: add64 r1, -0x838
081150: lddw r4, 0x11e0fd ; rodata b'admintoken_programassociated_token_programprograms/pump-amm/src/instruction'
081160: mov64 r5, 0x5
081168: call -0xfe7f ; call 0x1d78
081170: ldxdw r1, [r10 - 0x838]
081178: ldxdw r2, [r10 - 0x830]
081180: ja +0x71 ; branch 0x81510
081188: mov64 r1, r10
081190: add64 r1, -0x9a8
081198: mov64 r2, 0xbbd
0811a0: call 0x10992 ; call 0x105e38
0811a8: ldxdw r1, [r10 - 0x9a8]
0811b0: ldxdw r2, [r10 - 0x9a0]
0811b8: ja +0x6a ; branch 0x81510
0811c0: mov64 r1, r10
0811c8: add64 r1, -0x848
0811d0: lddw r4, 0x11e0d1 ; rodata b'system_programglobal_incentive_token_accountadmintoken_programassociated_to'
0811e0: mov64 r5, 0xe
0811e8: call -0xfe8f ; call 0x1d78
0811f0: ldxdw r1, [r10 - 0x848]
0811f8: ldxdw r2, [r10 - 0x840]
081200: ja +0x61 ; branch 0x81510
081208: ldxdw r8, [r1 + 0x10]
081210: ldxdw r4, [r8 + 0x0]
081218: add64 r4, 0x1
081220: mov64 r5, 0x1
081228: jeq r4, 0x0, +0x1 ; branch 0x81238
081230: mov64 r5, 0x0
081238: stxdw [r8 + 0x0], r4
081240: jne r5, 0x1, +0x1 ; branch 0x81250
081248: ja -0x23 ; branch 0x81138
081250: jeq r3, 0x0, +0x5b ; branch 0x81530
081258: stxdw [r10 - 0x9d8], r9
081260: ldxb r3, [r1 + 0x2a]
081268: stxdw [r10 - 0x9f8], r3
081270: ldxb r3, [r1 + 0x29]
081278: stxdw [r10 - 0xa00], r3
081280: ldxb r3, [r1 + 0x28]
081288: stxdw [r10 - 0xa08], r3
081290: ldxdw r3, [r1 + 0x20]
081298: stxdw [r10 - 0x9f0], r3
0812a0: ldxdw r5, [r1 + 0x18]
0812a8: add64 r2, -0x2
0812b0: stxdw [r7 + 0x8], r2
0812b8: mov64 r2, r1
0812c0: add64 r2, 0x60
0812c8: stxdw [r7 + 0x0], r2
0812d0: ldxdw r9, [r1 + 0x38]
0812d8: ldxdw r2, [r9 + 0x0]
0812e0: add64 r2, 0x1
0812e8: mov64 r3, 0x1
0812f0: jeq r2, 0x0, +0x1 ; branch 0x81300
0812f8: mov64 r3, 0x0
081300: ldxdw r4, [r1 + 0x30]
081308: stxdw [r10 - 0xa10], r4
081310: stxdw [r9 + 0x0], r2
081318: jne r3, 0x1, +0x1 ; branch 0x81328
081320: ja -0x3e ; branch 0x81138
081328: ldxdw r4, [r1 + 0x40]
081330: ldxdw r2, [r4 + 0x0]
081338: add64 r2, 0x1
081340: mov64 r3, 0x1
081348: jeq r2, 0x0, +0x1 ; branch 0x81358
081350: mov64 r3, 0x0
081358: stxdw [r10 - 0x9b0], r9
081360: stxdw [r10 - 0x9c8], r8
081368: stxdw [r10 - 0xa18], r5
081370: stxdw [r10 - 0x9b8], r0
081378: stxdw [r10 - 0x9c0], r4
081380: stxdw [r4 + 0x0], r2
081388: jne r3, 0x1, +0x1 ; branch 0x81398
081390: ja -0x4c ; branch 0x81138
081398: ldxb r2, [r1 + 0x5a]
0813a0: stxdw [r10 - 0x9e0], r2
0813a8: ldxb r2, [r1 + 0x59]
0813b0: stxdw [r10 - 0x9e8], r2
0813b8: ldxb r9, [r1 + 0x58]
0813c0: ldxdw r7, [r1 + 0x50]
0813c8: ldxdw r8, [r1 + 0x48]
0813d0: mov64 r1, r10
0813d8: add64 r1, -0x7b0
0813e0: call 0x10b67 ; call 0x106f20
0813e8: ldxdw r1, [r10 - 0x7a8]
0813f0: stxdw [r10 - 0x7f0], r1
0813f8: ldxdw r1, [r10 - 0x7a0]
081400: stxdw [r10 - 0x7e8], r1
081408: ldxdw r1, [r10 - 0x798]
081410: stxdw [r10 - 0x7e0], r1
081418: ldxdw r1, [r10 - 0x7b0]
081420: jeq r1, 0x0, +0x35 ; branch 0x815d0
081428: mov64 r1, r10
081430: add64 r1, -0x858
081438: mov64 r2, r10
081440: add64 r2, -0x7f0
081448: call 0x1037e ; call 0x103040
081450: ldxdw r1, [r10 - 0x858]
081458: ldxdw r2, [r10 - 0x850]
081460: stxdw [r6 + 0x8], r2
081468: stxdw [r6 + 0x0], r1
081470: stb [r6 + 0x424], 0x2
081478: ldxdw r4, [r10 - 0x9b8]
081480: ldxdw r5, [r10 - 0x9c0]
081488: ldxdw r8, [r10 - 0x9c8]
081490: ldxdw r7, [r10 - 0x9b0]
081498: ja +0x1df ; branch 0x82398
0814a0: mov64 r1, r10
0814a8: add64 r1, -0x988
0814b0: mov64 r2, 0xbbd
0814b8: call 0x1092f ; call 0x105e38
0814c0: ldxdw r3, [r10 - 0x980]
0814c8: ldxdw r2, [r10 - 0x988]
0814d0: mov64 r1, r10
0814d8: add64 r1, -0x998
0814e0: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
0814f0: mov64 r5, 0xf
0814f8: call -0xfef1 ; call 0x1d78
081500: ldxdw r1, [r10 - 0x998]
081508: ldxdw r2, [r10 - 0x990]
081510: stxdw [r6 + 0x8], r2
081518: stxdw [r6 + 0x0], r1
081520: stb [r6 + 0x424], 0x2
081528: exit
081530: mov64 r1, r10
081538: add64 r1, -0x968
081540: mov64 r2, 0xbbd
081548: mov64 r7, r0
081550: call 0x1091c ; call 0x105e38
081558: ldxdw r3, [r10 - 0x960]
081560: ldxdw r2, [r10 - 0x968]
081568: mov64 r1, r10
081570: add64 r1, -0x978
081578: lddw r4, 0x11e0ca ; rodata b'programsystem_programglobal_incentive_token_accountadmintoken_programassoci'
081588: mov64 r5, 0x7
081590: call -0xff04 ; call 0x1d78
081598: mov64 r4, r7
0815a0: ldxdw r1, [r10 - 0x978]
0815a8: ldxdw r2, [r10 - 0x970]
0815b0: stxdw [r6 + 0x8], r2
0815b8: stxdw [r6 + 0x0], r1
0815c0: stb [r6 + 0x424], 0x2
0815c8: ja +0x1c7 ; branch 0x82408
0815d0: stxdw [r10 - 0xa30], r9
0815d8: ldxdw r1, [r10 - 0x9e8]
0815e0: ldxdw r1, [r10 - 0x9e0]
0815e8: stxdw [r10 - 0xa28], r7
0815f0: stxdw [r10 - 0xa20], r8
0815f8: ldxdw r1, [r10 - 0x9b0]
081600: ldxdw r1, [r10 - 0x7e0]
081608: stxdw [r10 - 0x7f8], r1
081610: ldxdw r1, [r10 - 0x7e8]
081618: stxdw [r10 - 0x800], r1
081620: ldxdw r1, [r10 - 0x7f0]
081628: stxdw [r10 - 0x808], r1
081630: ldxdw r4, [r10 - 0x828]
081638: mov64 r1, r10
081640: add64 r1, -0x7b0
081648: lddw r2, 0x122a00 ; rodata b"\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x9a\xcc\x11\x00.\x00\x00\x00\x00\x00\x00\x00\xe9\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00^\xcf\x11\x001\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00"
081658: mov64 r3, 0x1
081660: call 0x11940 ; call 0x10e068
081668: ldxdw r1, [r10 - 0x798]
081670: stxdw [r10 - 0x7c0], r1
081678: ldxdw r1, [r10 - 0x7a0]
081680: stxdw [r10 - 0x7c8], r1
081688: ldxdw r1, [r10 - 0x7a8]
081690: stxdw [r10 - 0x7d0], r1
081698: ldxdw r1, [r10 - 0x7b0]
0816a0: stxdw [r10 - 0x7d8], r1
0816a8: ldxb r1, [r10 - 0x790]
0816b0: stxb [r10 - 0x7b1], r1
0816b8: ldxdw r8, [r10 - 0x9d8]
0816c0: stxb [r8 + 0x0], r1
0816c8: ldxdw r7, [r10 - 0x818]
0816d0: ldxdw r1, [r7 + 0x0]
0816d8: ldxdw r2, [r1 + 0x0]
0816e0: stxdw [r10 - 0x7b0], r2
0816e8: ldxdw r2, [r1 + 0x8]
0816f0: stxdw [r10 - 0x7a8], r2
0816f8: ldxdw r2, [r1 + 0x10]
081700: stxdw [r10 - 0x7a0], r2
081708: ldxdw r1, [r1 + 0x18]
081710: stxdw [r10 - 0x798], r1
081718: mov64 r1, r10
081720: add64 r1, -0x7b0
081728: mov64 r2, r10
081730: add64 r2, -0x7d8
081738: mov64 r3, 0x20
081740: call 0x13033 ; call 0x1198e0
081748: lsh64 r0, 0x20
081750: rsh64 r0, 0x20
081758: jeq r0, 0x0, +0x2e ; branch 0x818d0
081760: mov64 r1, r10
081768: add64 r1, -0x868
081770: mov64 r2, 0x7d6
081778: call 0x108d7 ; call 0x105e38
081780: ldxdw r3, [r10 - 0x860]
081788: ldxdw r2, [r10 - 0x868]
081790: mov64 r1, r10
081798: add64 r1, -0x878
0817a0: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
0817b0: mov64 r5, 0xd
0817b8: call -0xff49 ; call 0x1d78
0817c0: ldxdw r3, [r10 - 0x870]
0817c8: ldxdw r2, [r10 - 0x878]
0817d0: ldxdw r1, [r7 + 0x0]
0817d8: ldxdw r4, [r1 + 0x18]
0817e0: stxdw [r10 - 0x798], r4
0817e8: ldxdw r4, [r1 + 0x10]
0817f0: stxdw [r10 - 0x7a0], r4
0817f8: ldxdw r4, [r1 + 0x8]
081800: stxdw [r10 - 0x7a8], r4
081808: ldxdw r1, [r1 + 0x0]
081810: stxdw [r10 - 0x7b0], r1
081818: ldxdw r1, [r10 - 0x7d8]
081820: stxdw [r10 - 0x790], r1
081828: ldxdw r1, [r10 - 0x7d0]
081830: stxdw [r10 - 0x788], r1
081838: ldxdw r1, [r10 - 0x7c8]
081840: stxdw [r10 - 0x780], r1
081848: ldxdw r1, [r10 - 0x7c0]
081850: stxdw [r10 - 0x778], r1
081858: mov64 r1, r10
081860: add64 r1, -0x888
081868: mov64 r4, r10
081870: add64 r4, -0x7b0
081878: call 0x1032a ; call 0x1031d0
081880: ldxdw r1, [r10 - 0x888]
081888: ldxdw r2, [r10 - 0x880]
081890: stxdw [r6 + 0x8], r2
081898: stxdw [r6 + 0x0], r1
0818a0: stb [r6 + 0x424], 0x2
0818a8: ldxdw r4, [r10 - 0x9b8]
0818b0: ldxdw r7, [r10 - 0x9b0]
0818b8: ldxdw r5, [r10 - 0x9c0]
0818c0: ldxdw r8, [r10 - 0x9c8]
0818c8: ja +0x159 ; branch 0x82398
0818d0: mov64 r1, r10
0818d8: add64 r1, -0x828
0818e0: stxdw [r10 - 0x20], r1
0818e8: mov64 r1, r10
0818f0: add64 r1, -0x7b1
0818f8: stxdw [r10 - 0x28], r1
081900: mov64 r1, r10
081908: add64 r1, -0x810
081910: stxdw [r10 - 0x30], r1
081918: mov64 r1, r10
081920: add64 r1, -0x820
081928: stxdw [r10 - 0x38], r1
081930: mov64 r1, r10
081938: add64 r1, -0x808
081940: stxdw [r10 - 0x40], r1
081948: mov64 r1, r10
081950: add64 r1, -0x818
081958: stxdw [r10 - 0x48], r1
081960: mov64 r1, r10
081968: add64 r1, -0x7b0
081970: mov64 r2, r10
081978: add64 r2, -0x48
081980: call 0x195 ; call 0x82630
081988: ldxdw r1, [r10 - 0x7a8]
081990: ldxdw r9, [r10 - 0x7b0]
081998: ldxb r2, [r10 - 0x3fc]
0819a0: ldxdw r8, [r10 - 0x9c8]
0819a8: jeq r2, 0x2, +0x5e ; branch 0x81ca0
0819b0: stxdw [r10 - 0xa48], r2
0819b8: stxdw [r10 - 0xa40], r1
0819c0: mov64 r1, r10
0819c8: add64 r1, -0x3f0
0819d0: mov64 r2, r10
0819d8: add64 r2, -0x7a0
0819e0: mov64 r3, 0x3a4
0819e8: call 0x12fd5 ; call 0x119898
0819f0: ldxh r1, [r10 - 0x3fb]
0819f8: stxh [r10 - 0x3f4], r1
081a00: ldxb r1, [r10 - 0x3f9]
081a08: stxb [r10 - 0x3f2], r1
081a10: ldxb r1, [r9 + 0x29]
081a18: ldxdw r7, [r10 - 0x9b0]
081a20: jeq r1, 0x0, +0x55 ; branch 0x81cd0
081a28: mov64 r1, r10
081a30: add64 r1, -0x48
081a38: stxdw [r10 - 0xa38], r1
081a40: mov64 r2, r9
081a48: call -0xe71b ; call 0xe178
081a50: ldxdw r1, [r10 - 0xa38]
081a58: call 0x10e8e ; call 0x108ed0
081a60: stxdw [r10 - 0xa50], r0
081a68: mov64 r1, r10
081a70: add64 r1, -0x7b0
081a78: stxdw [r10 - 0xa38], r1
081a80: stxdw [r10 - 0xa58], r9
081a88: mov64 r2, r9
081a90: call -0xe724 ; call 0xe178
081a98: mov64 r1, r10
081aa0: add64 r1, -0x18
081aa8: ldxdw r2, [r10 - 0xa38]
081ab0: call 0x10e9c ; call 0x108f98
081ab8: ldxdw r3, [r10 - 0x10]
081ac0: ldxdw r1, [r10 - 0x18]
081ac8: lddw r2, -0x7fffffffffffffe6
081ad8: jne r1, r2, +0x4d ; branch 0x81d48
081ae0: mov64 r1, r10
081ae8: add64 r1, -0x808
081af0: ldxdw r2, [r10 - 0xa50]
081af8: call 0x10acf ; call 0x107178
081b00: ldxdw r1, [r10 - 0x7a0]
081b08: ldxdw r2, [r10 - 0x7a8]
081b10: ldxdw r3, [r2 + 0x0]
081b18: add64 r3, -0x1
081b20: stxdw [r2 + 0x0], r3
081b28: jne r3, 0x0, +0x3 ; branch 0x81b48
081b30: ldxdw r3, [r2 + 0x8]
081b38: add64 r3, -0x1
081b40: stxdw [r2 + 0x8], r3
081b48: ldxdw r2, [r1 + 0x0]
081b50: add64 r2, -0x1
081b58: stxdw [r1 + 0x0], r2
081b60: jne r2, 0x0, +0x3 ; branch 0x81b80
081b68: ldxdw r2, [r1 + 0x8]
081b70: add64 r2, -0x1
081b78: stxdw [r1 + 0x8], r2
081b80: ldxdw r1, [r10 - 0x38]
081b88: ldxdw r2, [r10 - 0x40]
081b90: ldxdw r3, [r2 + 0x0]
081b98: add64 r3, -0x1
081ba0: stxdw [r2 + 0x0], r3
081ba8: jne r3, 0x0, +0x3 ; branch 0x81bc8
081bb0: ldxdw r3, [r2 + 0x8]
081bb8: add64 r3, -0x1
081bc0: stxdw [r2 + 0x8], r3
081bc8: ldxdw r2, [r1 + 0x0]
081bd0: add64 r2, -0x1
081bd8: stxdw [r1 + 0x0], r2
081be0: jne r2, 0x0, +0x3 ; branch 0x81c00
081be8: ldxdw r2, [r1 + 0x8]
081bf0: add64 r2, -0x1
081bf8: stxdw [r1 + 0x8], r2
081c00: jne r0, 0x0, +0x1 ; branch 0x81c10
081c08: ja +0x58 ; branch 0x81ed0
081c10: ldxdw r1, [r10 - 0x820]
081c18: ldxb r2, [r1 + 0x29]
081c20: jne r2, 0x0, +0x64 ; branch 0x81f48
081c28: mov64 r1, r10
081c30: add64 r1, -0x928
081c38: mov64 r2, 0x7d0
081c40: call 0x1083e ; call 0x105e38
081c48: ldxdw r3, [r10 - 0x920]
081c50: ldxdw r2, [r10 - 0x928]
081c58: mov64 r1, r10
081c60: add64 r1, -0x938
081c68: lddw r4, 0x11e0fd ; rodata b'admintoken_programassociated_token_programprograms/pump-amm/src/instruction'
081c78: mov64 r5, 0x5
081c80: call -0xffe2 ; call 0x1d78
081c88: ldxdw r1, [r10 - 0x938]
081c90: ldxdw r2, [r10 - 0x930]
081c98: ja +0xda ; branch 0x82370
081ca0: stxdw [r6 + 0x8], r1
081ca8: stxdw [r6 + 0x0], r9
081cb0: stb [r6 + 0x424], 0x2
081cb8: ldxdw r4, [r10 - 0x9b8]
081cc0: ldxdw r7, [r10 - 0x9b0]
081cc8: ja +0xd8 ; branch 0x82390
081cd0: mov64 r1, r10
081cd8: add64 r1, -0x948
081ce0: mov64 r2, 0x7d0
081ce8: call 0x10829 ; call 0x105e38
081cf0: ldxdw r3, [r10 - 0x940]
081cf8: ldxdw r2, [r10 - 0x948]
081d00: mov64 r1, r10
081d08: add64 r1, -0x958
081d10: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
081d20: mov64 r5, 0xd
081d28: call -0xfff7 ; call 0x1d78
081d30: ldxdw r1, [r10 - 0x958]
081d38: ldxdw r2, [r10 - 0x950]
081d40: ja +0xc5 ; branch 0x82370
081d48: ldxdw r2, [r10 - 0x8]
081d50: stxdw [r10 - 0x8], r2
081d58: stxdw [r10 - 0x10], r3
081d60: stxdw [r10 - 0x18], r1
081d68: mov64 r1, r10
081d70: add64 r1, -0x898
081d78: mov64 r2, r10
081d80: add64 r2, -0x18
081d88: call 0x10256 ; call 0x103040
081d90: ldxdw r1, [r10 - 0x898]
081d98: ldxdw r2, [r10 - 0x890]
081da0: stxdw [r6 + 0x8], r2
081da8: stxdw [r6 + 0x0], r1
081db0: stb [r6 + 0x424], 0x2
081db8: ldxdw r1, [r10 - 0x7a0]
081dc0: ldxdw r2, [r10 - 0x7a8]
081dc8: ldxdw r3, [r2 + 0x0]
081dd0: add64 r3, -0x1
081dd8: stxdw [r2 + 0x0], r3
081de0: jne r3, 0x0, +0x3 ; branch 0x81e00
081de8: ldxdw r3, [r2 + 0x8]
081df0: add64 r3, -0x1
081df8: stxdw [r2 + 0x8], r3
081e00: ldxdw r2, [r1 + 0x0]
081e08: add64 r2, -0x1
081e10: stxdw [r1 + 0x0], r2
081e18: ldxdw r4, [r10 - 0x9b8]
081e20: ldxdw r5, [r10 - 0x9c0]
081e28: jne r2, 0x0, +0x3 ; branch 0x81e48
081e30: ldxdw r2, [r1 + 0x8]
081e38: add64 r2, -0x1
081e40: stxdw [r1 + 0x8], r2
081e48: ldxdw r1, [r10 - 0x38]
081e50: ldxdw r2, [r10 - 0x40]
081e58: ldxdw r3, [r2 + 0x0]
081e60: add64 r3, -0x1
081e68: stxdw [r2 + 0x0], r3
081e70: jne r3, 0x0, +0x3 ; branch 0x81e90
081e78: ldxdw r3, [r2 + 0x8]
081e80: add64 r3, -0x1
081e88: stxdw [r2 + 0x8], r3
081e90: ldxdw r2, [r1 + 0x0]
081e98: add64 r2, -0x1
081ea0: stxdw [r1 + 0x0], r2
081ea8: jne r2, 0x0, +0x9d ; branch 0x82398
081eb0: ldxdw r2, [r1 + 0x8]
081eb8: add64 r2, -0x1
081ec0: stxdw [r1 + 0x8], r2
081ec8: ja +0x99 ; branch 0x82398
081ed0: mov64 r1, r10
081ed8: add64 r1, -0x8a8
081ee0: mov64 r2, 0x7d5
081ee8: call 0x107e9 ; call 0x105e38
081ef0: ldxdw r3, [r10 - 0x8a0]
081ef8: ldxdw r2, [r10 - 0x8a8]
081f00: mov64 r1, r10
081f08: add64 r1, -0x8b8
081f10: lddw r4, 0x11cd0f ; rodata b'global_configprograms/pump-amm/src/instructions/swap/sell.rsuser_volume_acc'
081f20: mov64 r5, 0xd
081f28: call -0x10037 ; call 0x1d78
081f30: ldxdw r1, [r10 - 0x8b8]
081f38: ldxdw r2, [r10 - 0x8b0]
081f40: ja +0x85 ; branch 0x82370
081f48: ldxdw r1, [r1 + 0x0]
081f50: ldxdw r2, [r1 + 0x18]
081f58: stxdw [r10 - 0x30], r2
081f60: ldxdw r2, [r1 + 0x10]
081f68: stxdw [r10 - 0x38], r2
081f70: ldxdw r2, [r1 + 0x8]
081f78: stxdw [r10 - 0x40], r2
081f80: ldxdw r1, [r1 + 0x0]
081f88: stxdw [r10 - 0x48], r1
081f90: mov64 r1, r10
081f98: add64 r1, -0x48
081fa0: lddw r2, 0x11be50 ; rodata b'm\x01\xa6p\x14_\tb\x8d\xa13\x91f\x95\x19\x1crl\xe9L\xf4\xed\xfdS^T\x1ej\xd7\xa6\x06S\x0cE\xf7\xdf\x8d\x9er\x95b\x84\x93?m\x98\xb7W\x03.\x83\xdf\x84`O\xb5\xe1\x17\xff\xf6\x1d[\x12\xf9\x06\xdd\xf6\xe1\xeeu\x8f\xde\x18B]'
081fb0: mov64 r3, 0x20
081fb8: call 0x12f24 ; call 0x1198e0
081fc0: lsh64 r0, 0x20
081fc8: rsh64 r0, 0x20
081fd0: jne r0, 0x0, +0x4a ; branch 0x82228
081fd8: ldxdw r4, [r10 - 0x828]
081fe0: mov64 r1, r10
081fe8: add64 r1, -0x7b0
081ff0: lddw r2, 0x1229d0 ; rodata b"\x00\x00\x00\x00F\xc6\x11\x00\x11\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00@\x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\xf9\x10\x00\x00\x00\x00\x00\x0f\xcd\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'\xce\x11\x00\x19\x00\x00"
082000: mov64 r3, 0x1
082008: call 0x1180b ; call 0x10e068
082010: ldxdw r1, [r10 - 0x798]
082018: stxdw [r10 - 0x30], r1
082020: ldxdw r1, [r10 - 0x7a0]
082028: stxdw [r10 - 0x38], r1
082030: ldxdw r1, [r10 - 0x7a8]
082038: stxdw [r10 - 0x40], r1
082040: ldxdw r1, [r10 - 0x7b0]
082048: stxdw [r10 - 0x48], r1
082050: ldxb r1, [r10 - 0x790]
082058: ldxdw r2, [r10 - 0x9d8]
082060: stxb [r2 + 0x1], r1
082068: ldxdw r9, [r10 - 0x9d0]
082070: ldxdw r1, [r9 + 0x18]
082078: stxdw [r10 - 0x798], r1
082080: ldxdw r1, [r9 + 0x10]
082088: stxdw [r10 - 0x7a0], r1
082090: ldxdw r1, [r9 + 0x8]
082098: stxdw [r10 - 0x7a8], r1
0820a0: ldxdw r1, [r9 + 0x0]
0820a8: stxdw [r10 - 0x7b0], r1
0820b0: mov64 r1, r10
0820b8: add64 r1, -0x7b0
0820c0: mov64 r2, r10
0820c8: add64 r2, -0x48
0820d0: mov64 r3, 0x20
0820d8: call 0x12f00 ; call 0x1198e0
0820e0: lsh64 r0, 0x20
0820e8: rsh64 r0, 0x20
0820f0: jeq r0, 0x0, +0x71 ; branch 0x82480
0820f8: mov64 r1, r10
082100: add64 r1, -0x8f8
082108: mov64 r2, 0x7d6
082110: call 0x107a4 ; call 0x105e38
082118: ldxdw r3, [r10 - 0x8f0]
082120: ldxdw r2, [r10 - 0x8f8]
082128: mov64 r1, r10
082130: add64 r1, -0x908
082138: lddw r4, 0x11e0ad ; rodata b'event_authoritypool_authorityprogramsystem_programglobal_incentive_token_ac'
082148: mov64 r5, 0xf
082150: call -0x1007c ; call 0x1d78
082158: ldxdw r3, [r10 - 0x900]
082160: ldxdw r2, [r10 - 0x908]
082168: ldxdw r1, [r9 + 0x18]
082170: stxdw [r10 - 0x798], r1
082178: ldxdw r1, [r9 + 0x10]
082180: stxdw [r10 - 0x7a0], r1
082188: ldxdw r1, [r9 + 0x8]
082190: stxdw [r10 - 0x7a8], r1
082198: ldxdw r1, [r9 + 0x0]
0821a0: stxdw [r10 - 0x7b0], r1
0821a8: ldxdw r1, [r10 - 0x48]
0821b0: stxdw [r10 - 0x790], r1
0821b8: ldxdw r1, [r10 - 0x40]
0821c0: stxdw [r10 - 0x788], r1
0821c8: ldxdw r1, [r10 - 0x38]
0821d0: stxdw [r10 - 0x780], r1
0821d8: ldxdw r1, [r10 - 0x30]
0821e0: stxdw [r10 - 0x778], r1
0821e8: mov64 r1, r10
0821f0: add64 r1, -0x918
0821f8: mov64 r4, r10
082200: add64 r4, -0x7b0
082208: call 0x101f8 ; call 0x1031d0
082210: ldxdw r1, [r10 - 0x918]
082218: ldxdw r2, [r10 - 0x910]
082220: ja +0x29 ; branch 0x82370
082228: mov64 r1, r10
082230: add64 r1, -0x8c8
082238: mov64 r2, 0x5
082240: call -0xf14 ; call 0x7a9a8
082248: ldxdw r3, [r10 - 0x8c0]
082250: ldxdw r2, [r10 - 0x8c8]
082258: mov64 r1, r10
082260: add64 r1, -0x8d8
082268: lddw r4, 0x11e0fd ; rodata b'admintoken_programassociated_token_programprograms/pump-amm/src/instruction'
082278: mov64 r5, 0x5
082280: call -0x100a2 ; call 0x1d78
082288: ldxdw r3, [r10 - 0x8d0]
082290: ldxdw r2, [r10 - 0x8d8]
082298: ldxdw r1, [r10 - 0x30]
0822a0: stxdw [r10 - 0x798], r1
0822a8: ldxdw r1, [r10 - 0x38]
0822b0: stxdw [r10 - 0x7a0], r1
0822b8: ldxdw r1, [r10 - 0x40]
0822c0: stxdw [r10 - 0x7a8], r1
0822c8: ldxdw r1, [r10 - 0x48]
0822d0: stxdw [r10 - 0x7b0], r1
0822d8: lddw r1, 0x62095f1470a6016d
0822e8: stxdw [r10 - 0x790], r1
0822f0: lddw r1, 0x1c1995669133a18d
082300: stxdw [r10 - 0x788], r1
082308: lddw r1, 0x53fdedf44ce96c72
082318: stxdw [r10 - 0x780], r1
082320: lddw r1, 0x5306a6d76a1e545e
082330: stxdw [r10 - 0x778], r1
082338: mov64 r1, r10
082340: add64 r1, -0x8e8
082348: mov64 r4, r10
082350: add64 r4, -0x7b0
082358: call 0x101ce ; call 0x1031d0
082360: ldxdw r1, [r10 - 0x8e8]
082368: ldxdw r2, [r10 - 0x8e0]
082370: stxdw [r6 + 0x8], r2
082378: stxdw [r6 + 0x0], r1
082380: stb [r6 + 0x424], 0x2
082388: ldxdw r4, [r10 - 0x9b8]
082390: ldxdw r5, [r10 - 0x9c0]
082398: ldxdw r1, [r7 + 0x0]
0823a0: add64 r1, -0x1
0823a8: stxdw [r7 + 0x0], r1
0823b0: jne r1, 0x0, +0x3 ; branch 0x823d0
0823b8: ldxdw r1, [r7 + 0x8]
0823c0: add64 r1, -0x1
0823c8: stxdw [r7 + 0x8], r1
0823d0: ldxdw r1, [r5 + 0x0]
0823d8: add64 r1, -0x1
0823e0: stxdw [r5 + 0x0], r1
0823e8: jne r1, 0x0, +0x3 ; branch 0x82408
0823f0: ldxdw r1, [r5 + 0x8]
0823f8: add64 r1, -0x1
082400: stxdw [r5 + 0x8], r1
082408: ldxdw r1, [r4 + 0x0]
082410: add64 r1, -0x1
082418: stxdw [r4 + 0x0], r1
082420: jne r1, 0x0, +0x3 ; branch 0x82440
082428: ldxdw r1, [r4 + 0x8]
082430: add64 r1, -0x1
082438: stxdw [r4 + 0x8], r1
082440: ldxdw r1, [r8 + 0x0]
082448: add64 r1, -0x1
082450: stxdw [r8 + 0x0], r1
082458: jne r1, 0x0, -0x1e7 ; branch 0x81528
082460: ldxdw r1, [r8 + 0x8]
082468: add64 r1, -0x1
082470: stxdw [r8 + 0x8], r1
082478: ja -0x1eb ; branch 0x81528
082480: ldxdw r1, [r10 - 0x820]
082488: stxdw [r10 - 0x9d8], r1
082490: ldxdw r1, [r10 - 0x810]
082498: stxdw [r10 - 0xa38], r1
0824a0: mov64 r1, r6
0824a8: add64 r1, 0x80
0824b0: mov64 r2, r10
0824b8: add64 r2, -0x3f0
0824c0: mov64 r3, 0x3a4
0824c8: call 0x12e79 ; call 0x119898
0824d0: ldxb r1, [r10 - 0x3f2]
0824d8: ldxh r2, [r10 - 0x3f4]
0824e0: ldxdw r3, [r10 - 0xa08]
0824e8: stxb [r6 + 0x38], r3
0824f0: ldxdw r3, [r10 - 0xa00]
0824f8: stxb [r6 + 0x39], r3
082500: ldxdw r3, [r10 - 0x9f8]
082508: stxb [r6 + 0x3a], r3
082510: ldxdw r3, [r10 - 0xa30]
082518: stxb [r6 + 0x68], r3
082520: ldxdw r3, [r10 - 0x9e8]
082528: stxb [r6 + 0x69], r3
082530: ldxdw r3, [r10 - 0x9e0]
082538: stxb [r6 + 0x6a], r3
082540: ldxdw r3, [r10 - 0xa48]
082548: stxb [r6 + 0x424], r3
082550: ldxdw r3, [r10 - 0xa40]
082558: stxdw [r6 + 0x78], r3
082560: ldxdw r3, [r10 - 0xa58]
082568: stxdw [r6 + 0x70], r3
082570: ldxdw r3, [r10 - 0xa28]
082578: stxdw [r6 + 0x60], r3
082580: ldxdw r3, [r10 - 0xa20]
082588: stxdw [r6 + 0x58], r3
082590: ldxdw r3, [r10 - 0x9c0]
082598: stxdw [r6 + 0x50], r3
0825a0: stxdw [r6 + 0x48], r7
0825a8: ldxdw r3, [r10 - 0xa10]
0825b0: stxdw [r6 + 0x40], r3
0825b8: ldxdw r3, [r10 - 0x9f0]
0825c0: stxdw [r6 + 0x30], r3
0825c8: ldxdw r3, [r10 - 0xa18]
0825d0: stxdw [r6 + 0x28], r3
0825d8: stxdw [r6 + 0x20], r8
0825e0: ldxdw r3, [r10 - 0x9b8]
0825e8: stxdw [r6 + 0x18], r3
0825f0: stxdw [r6 + 0x10], r9
0825f8: ldxdw r3, [r10 - 0xa38]
082600: stxdw [r6 + 0x8], r3
082608: ldxdw r3, [r10 - 0x9d8]
082610: stxdw [r6 + 0x0], r3
082618: stxh [r6 + 0x425], r2
082620: stxb [r6 + 0x427], r1
082628: ja -0x221 ; branch 0x81528
