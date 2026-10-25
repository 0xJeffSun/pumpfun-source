0dd700: mov64 r9, r5
0dd708: mov64 r8, r3
0dd710: mov64 r7, r2
0dd718: mov64 r6, r1
0dd720: mov64 r1, r10
0dd728: add64 r1, -0xd8
0dd730: mov64 r2, r8
0dd738: call -0x1ba97 ; direct target 0x288
0dd740: ldxw r1, [r10 - 0xd8]
0dd748: jeq r1, 0x2, +0x17 ; branch 0xdd808
0dd750: lddw r1, 0x300000000
0dd760: ldxdw r1, [r1 + 0x0]
0dd768: mov64 r3, r1
0dd770: add64 r3, -0x80
0dd778: mov64 r2, 0x0
0dd780: mov64 r4, 0x1
0dd788: jgt r3, r1, +0x1 ; branch 0xdd798
0dd790: mov64 r4, 0x0
0dd798: stxdw [r10 - 0x250], r7
0dd7a0: jne r4, 0x0, +0x1 ; branch 0xdd7b0
0dd7a8: mov64 r2, r3
0dd7b0: lddw r7, 0x300007f80
0dd7c0: jeq r1, 0x0, +0x2 ; branch 0xdd7d8
0dd7c8: and64 r2, -0x8
0dd7d0: mov64 r7, r2
0dd7d8: lddw r1, 0x300000007
0dd7e8: jgt r7, r1, +0xe ; branch 0xdd860
0dd7f0: mov64 r1, 0x8
0dd7f8: mov64 r2, 0x80
0dd800: call 0x19b35 ; direct target 0x1ab1b0
0dd808: ldxdw r3, [r10 - 0xc8]
0dd810: ldxdw r2, [r10 - 0xd0]
0dd818: mov64 r1, r10
0dd820: add64 r1, -0x248
0dd828: lddw r4, 0x1b7508 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'base_mintassociated_bonding_curvemayhem_program_idglobal-paramssol-vaultsol_vaultmayhem-statemayhem_'
0dd838: mov64 r5, 0x9
0dd840: call -0x1b5e3 ; direct target 0x2930
0dd848: ldxdw r1, [r10 - 0x248]
0dd850: ldxdw r2, [r10 - 0x240]
0dd858: ja +0x82 ; branch 0xddc70
0dd860: ldxdw r1, [r9 - 0xff8]
0dd868: stxdw [r10 - 0x258], r1
0dd870: lddw r9, 0x300000000
0dd880: stxdw [r9 + 0x0], r7
0dd888: mov64 r2, r10
0dd890: add64 r2, -0xd8
0dd898: mov64 r1, r7
0dd8a0: mov64 r3, 0x80
0dd8a8: call 0x1abac ; direct target 0x1b3610
0dd8b0: mov64 r1, r10
0dd8b8: add64 r1, -0xd8
0dd8c0: mov64 r2, r8
0dd8c8: call -0x1bac9 ; direct target 0x288
0dd8d0: ldxw r1, [r10 - 0xd8]
0dd8d8: jeq r1, 0x2, +0x12 ; branch 0xdd970
0dd8e0: ldxdw r5, [r9 + 0x0]
0dd8e8: mov64 r3, r5
0dd8f0: add64 r3, -0x80
0dd8f8: mov64 r2, 0x0
0dd900: mov64 r4, 0x1
0dd908: jgt r3, r5, +0x1 ; branch 0xdd918
0dd910: mov64 r4, 0x0
0dd918: jne r4, 0x0, +0x1 ; branch 0xdd928
0dd920: mov64 r2, r3
0dd928: lddw r1, 0x300007f80
0dd938: jeq r5, 0x0, +0x2 ; branch 0xdd950
0dd940: and64 r2, -0x8
0dd948: mov64 r1, r2
0dd950: lddw r2, 0x300000007
0dd960: jgt r1, r2, +0xc ; branch 0xdd9c8
0dd968: ja -0x30 ; branch 0xdd7f0
0dd970: ldxdw r3, [r10 - 0xc8]
0dd978: ldxdw r2, [r10 - 0xd0]
0dd980: mov64 r1, r10
0dd988: add64 r1, -0x238
0dd990: lddw r4, 0x1b74fe ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'quote_mintbase_mintassociated_bonding_curvemayhem_program_idglobal-paramssol-vaultsol_vaultmayhem-st'
0dd9a0: mov64 r5, 0xa
0dd9a8: call -0x1b610 ; direct target 0x2930
0dd9b0: ldxdw r1, [r10 - 0x238]
0dd9b8: ldxdw r2, [r10 - 0x230]
0dd9c0: ja +0x55 ; branch 0xddc70
0dd9c8: stxdw [r9 + 0x0], r1
0dd9d0: mov64 r2, r10
0dd9d8: add64 r2, -0xd8
0dd9e0: stxdw [r10 - 0x260], r1
0dd9e8: mov64 r3, 0x80
0dd9f0: call 0x1ab83 ; direct target 0x1b3610
0dd9f8: mov64 r1, r10
0dda00: add64 r1, -0xd8
0dda08: mov64 r2, r8
0dda10: call -0x1953a ; direct target 0x13048
0dda18: ldxb r1, [r10 - 0x33]
0dda20: jeq r1, 0x2, +0x14 ; branch 0xddac8
0dda28: ldxdw r5, [r9 + 0x0]
0dda30: mov64 r3, r5
0dda38: add64 r3, -0xa8
0dda40: mov64 r2, 0x0
0dda48: mov64 r4, 0x1
0dda50: jgt r3, r5, +0x1 ; branch 0xdda60
0dda58: mov64 r4, 0x0
0dda60: jne r4, 0x0, +0x1 ; branch 0xdda70
0dda68: mov64 r2, r3
0dda70: lddw r1, 0x300007f58
0dda80: jeq r5, 0x0, +0x2 ; branch 0xdda98
0dda88: and64 r2, -0x8
0dda90: mov64 r1, r2
0dda98: lddw r2, 0x300000007
0ddaa8: jgt r1, r2, +0xe ; branch 0xddb20
0ddab0: mov64 r1, 0x8
0ddab8: mov64 r2, 0xa8
0ddac0: call 0x19add ; direct target 0x1ab1b0
0ddac8: ldxdw r3, [r10 - 0xd0]
0ddad0: ldxdw r2, [r10 - 0xd8]
0ddad8: mov64 r1, r10
0ddae0: add64 r1, -0x228
0ddae8: lddw r4, 0x1b73d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding_curveassociated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociat'
0ddaf8: mov64 r5, 0xd
0ddb00: call -0x1b63b ; direct target 0x2930
0ddb08: ldxdw r1, [r10 - 0x228]
0ddb10: ldxdw r2, [r10 - 0x220]
0ddb18: ja +0x2a ; branch 0xddc70
0ddb20: stxdw [r9 + 0x0], r1
0ddb28: mov64 r2, r10
0ddb30: add64 r2, -0xd8
0ddb38: stxdw [r10 - 0x268], r1
0ddb40: mov64 r3, 0xa8
0ddb48: call 0x1ab58 ; direct target 0x1b3610
0ddb50: mov64 r1, r10
0ddb58: add64 r1, -0xd8
0ddb60: mov64 r2, r8
0ddb68: call -0x1bb34 ; direct target 0x1d0
0ddb70: ldxw r1, [r10 - 0x28]
0ddb78: jeq r1, 0x2, +0x14 ; branch 0xddc20
0ddb80: ldxdw r1, [r9 + 0x0]
0ddb88: mov64 r3, r1
0ddb90: add64 r3, -0xd8
0ddb98: mov64 r2, 0x0
0ddba0: mov64 r4, 0x1
0ddba8: jgt r3, r1, +0x1 ; branch 0xddbb8
0ddbb0: mov64 r4, 0x0
0ddbb8: jne r4, 0x0, +0x1 ; branch 0xddbc8
0ddbc0: mov64 r2, r3
0ddbc8: lddw r9, 0x300007f28
0ddbd8: jeq r1, 0x0, +0x2 ; branch 0xddbf0
0ddbe0: and64 r2, -0x8
0ddbe8: mov64 r9, r2
0ddbf0: lddw r1, 0x300000007
0ddc00: jgt r9, r1, +0x11 ; branch 0xddc90
0ddc08: mov64 r1, 0x8
0ddc10: mov64 r2, 0xd8
0ddc18: call 0x19ab2 ; direct target 0x1ab1b0
0ddc20: ldxdw r3, [r10 - 0xd0]
0ddc28: ldxdw r2, [r10 - 0xd8]
0ddc30: mov64 r1, r10
0ddc38: add64 r1, -0x218
0ddc40: lddw r4, 0x1b73e5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'associated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociated_quote_user'
0ddc50: mov64 r5, 0x1d
0ddc58: call -0x1b666 ; direct target 0x2930
0ddc60: ldxdw r1, [r10 - 0x218]
0ddc68: ldxdw r2, [r10 - 0x210]
0ddc70: stxdw [r6 + 0x10], r2
0ddc78: stxdw [r6 + 0x8], r1
0ddc80: stdw [r6 + 0x0], 0x0
0ddc88: exit
0ddc90: lddw r1, 0x300000000
0ddca0: stxdw [r1 + 0x0], r9
0ddca8: mov64 r2, r10
0ddcb0: add64 r2, -0xd8
0ddcb8: mov64 r1, r9
0ddcc0: mov64 r3, 0xd8
0ddcc8: call 0x1ab28 ; direct target 0x1b3610
0ddcd0: ldxdw r1, [r8 + 0x8]
0ddcd8: jeq r1, 0x0, +0x7 ; branch 0xddd18
0ddce0: add64 r1, -0x1
0ddce8: stxdw [r8 + 0x8], r1
0ddcf0: ldxdw r3, [r8 + 0x0]
0ddcf8: mov64 r1, r3
0ddd00: add64 r1, 0x30
0ddd08: stxdw [r8 + 0x0], r1
0ddd10: ja +0x8 ; branch 0xddd58
0ddd18: mov64 r1, r10
0ddd20: add64 r1, -0x148
0ddd28: mov64 r2, 0xbbd
0ddd30: call 0x182bd ; direct target 0x19f320
0ddd38: ldxdw r3, [r10 - 0x140]
0ddd40: ldxdw r2, [r10 - 0x148]
0ddd48: jeq r2, 0x2, +0x1 ; branch 0xddd58
0ddd50: ja +0xa7 ; branch 0xde290
0ddd58: stxdw [r10 - 0x278], r3
0ddd60: stxdw [r10 - 0x270], r9
0ddd68: ldxdw r1, [r7 + 0x58]
0ddd70: ldxdw r1, [r1 + 0x0]
0ddd78: ldxdw r2, [r1 + 0x0]
0ddd80: ldxdw r3, [r1 + 0x8]
0ddd88: ldxdw r4, [r1 + 0x10]
0ddd90: ldxdw r1, [r1 + 0x18]
0ddd98: lddw r5, 0x1b683a ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding-curveprograms/pump/src/buy_v2.rsbuybuy_exact_quote_inprograms/pump/src/create_v2.rsquote-con'
0ddda8: stxdw [r10 - 0x118], r5
0dddb0: mov64 r5, r10
0dddb8: add64 r5, -0xf8
0dddc0: stxdw [r10 - 0x108], r5
0dddc8: stxdw [r10 - 0xe0], r1
0dddd0: stxdw [r10 - 0xe8], r4
0dddd8: stxdw [r10 - 0xf0], r3
0ddde0: stxdw [r10 - 0xf8], r2
0ddde8: stdw [r10 - 0x110], 0xd
0dddf0: stdw [r10 - 0x100], 0x20
0dddf8: mov64 r1, r10
0dde00: add64 r1, -0xd8
0dde08: mov64 r2, r10
0dde10: add64 r2, -0x118
0dde18: mov64 r3, 0x2
0dde20: ldxdw r4, [r10 - 0x250]
0dde28: call 0x19411 ; direct target 0x1a7eb8
0dde30: ldxdw r1, [r10 - 0xc0]
0dde38: stxdw [r10 - 0x120], r1
0dde40: ldxdw r1, [r10 - 0xc8]
0dde48: stxdw [r10 - 0x128], r1
0dde50: ldxdw r1, [r10 - 0xd0]
0dde58: stxdw [r10 - 0x130], r1
0dde60: ldxdw r1, [r10 - 0xd8]
0dde68: stxdw [r10 - 0x138], r1
0dde70: ldxb r1, [r10 - 0xb8]
0dde78: ldxdw r2, [r10 - 0x258]
0dde80: stxb [r2 + 0x0], r1
0dde88: ldxdw r9, [r10 - 0x268]
0dde90: ldxdw r8, [r9 + 0x0]
0dde98: ldxdw r1, [r8 + 0x0]
0ddea0: ldxdw r2, [r1 + 0x18]
0ddea8: stxdw [r10 - 0xc0], r2
0ddeb0: ldxdw r2, [r1 + 0x10]
0ddeb8: stxdw [r10 - 0xc8], r2
0ddec0: ldxdw r2, [r1 + 0x8]
0ddec8: stxdw [r10 - 0xd0], r2
0dded0: ldxdw r1, [r1 + 0x0]
0dded8: stxdw [r10 - 0xd8], r1
0ddee0: mov64 r1, r10
0ddee8: add64 r1, -0xd8
0ddef0: mov64 r2, r10
0ddef8: add64 r2, -0x138
0ddf00: mov64 r3, 0x20
0ddf08: call 0x1aaed ; direct target 0x1b3678
0ddf10: lsh64 r0, 0x20
0ddf18: rsh64 r0, 0x20
0ddf20: jeq r0, 0x0, +0x2a ; branch 0xde078
0ddf28: mov64 r1, r10
0ddf30: add64 r1, -0x168
0ddf38: mov64 r2, 0x7d6
0ddf40: call 0x1827b ; direct target 0x19f320
0ddf48: ldxdw r3, [r10 - 0x160]
0ddf50: ldxdw r2, [r10 - 0x168]
0ddf58: mov64 r1, r10
0ddf60: add64 r1, -0x178
0ddf68: lddw r4, 0x1b73d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding_curveassociated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociat'
0ddf78: mov64 r5, 0xd
0ddf80: call -0x1b6cb ; direct target 0x2930
0ddf88: ldxdw r3, [r10 - 0x170]
0ddf90: ldxdw r2, [r10 - 0x178]
0ddf98: ldxdw r1, [r9 + 0x0]
0ddfa0: ldxdw r1, [r1 + 0x0]
0ddfa8: ldxdw r4, [r1 + 0x0]
0ddfb0: ldxdw r5, [r1 + 0x8]
0ddfb8: ldxdw r0, [r1 + 0x10]
0ddfc0: ldxdw r1, [r1 + 0x18]
0ddfc8: ldxdw r7, [r10 - 0x138]
0ddfd0: stxdw [r10 - 0xb8], r7
0ddfd8: ldxdw r7, [r10 - 0x130]
0ddfe0: stxdw [r10 - 0xb0], r7
0ddfe8: ldxdw r7, [r10 - 0x128]
0ddff0: stxdw [r10 - 0xa8], r7
0ddff8: ldxdw r7, [r10 - 0x120]
0de000: stxdw [r10 - 0xa0], r7
0de008: stxdw [r10 - 0xc0], r1
0de010: stxdw [r10 - 0xc8], r0
0de018: stxdw [r10 - 0xd0], r5
0de020: stxdw [r10 - 0xd8], r4
0de028: mov64 r1, r10
0de030: add64 r1, -0x188
0de038: mov64 r4, r10
0de040: add64 r4, -0xd8
0de048: call 0x17c2d ; direct target 0x19c1b8
0de050: ldxdw r1, [r10 - 0x180]
0de058: ldxdw r2, [r10 - 0x188]
0de060: stxdw [r6 + 0x8], r2
0de068: stxdw [r6 + 0x10], r1
0de070: ja -0x7f ; branch 0xddc80
0de078: ldxb r1, [r8 + 0x29]
0de080: jeq r1, 0x0, +0x4a ; branch 0xde2d8
0de088: ldxdw r1, [r10 - 0x260]
0de090: ldxdw r1, [r1 + 0x58]
0de098: ldxdw r9, [r1 + 0x0]
0de0a0: ldxdw r1, [r9 + 0x18]
0de0a8: stxdw [r10 - 0xc0], r1
0de0b0: ldxdw r1, [r9 + 0x10]
0de0b8: stxdw [r10 - 0xc8], r1
0de0c0: ldxdw r1, [r9 + 0x8]
0de0c8: stxdw [r10 - 0xd0], r1
0de0d0: ldxdw r1, [r9 + 0x0]
0de0d8: stxdw [r10 - 0xd8], r1
0de0e0: ldxdw r8, [r10 - 0x268]
0de0e8: add64 r8, 0x28
0de0f0: mov64 r1, r10
0de0f8: add64 r1, -0xd8
0de100: mov64 r2, r8
0de108: mov64 r3, 0x20
0de110: call 0x1aaac ; direct target 0x1b3678
0de118: lsh64 r0, 0x20
0de120: rsh64 r0, 0x20
0de128: jeq r0, 0x0, +0x44 ; branch 0xde350
0de130: stdw [r10 - 0xc0], 0x0
0de138: stdw [r10 - 0xc8], 0x0
0de140: stdw [r10 - 0xd0], 0x0
0de148: stdw [r10 - 0xd8], 0x0
0de150: mov64 r2, r10
0de158: add64 r2, -0xd8
0de160: mov64 r1, r8
0de168: mov64 r3, 0x20
0de170: call 0x1aaa0 ; direct target 0x1b3678
0de178: lsh64 r0, 0x20
0de180: rsh64 r0, 0x20
0de188: jne r0, 0x0, +0x11 ; branch 0xde218
0de190: ldxdw r1, [r9 + 0x18]
0de198: stxdw [r10 - 0xc0], r1
0de1a0: ldxdw r1, [r9 + 0x10]
0de1a8: stxdw [r10 - 0xc8], r1
0de1b0: ldxdw r1, [r9 + 0x8]
0de1b8: stxdw [r10 - 0xd0], r1
0de1c0: ldxdw r1, [r9 + 0x0]
0de1c8: stxdw [r10 - 0xd8], r1
0de1d0: mov64 r1, r10
0de1d8: add64 r1, -0xd8
0de1e0: lddw r2, 0x1b5cc8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x06\x9b\x88W\xfe\xab\x81\x84\xfbh\x7fcF\x18\xc05\xda\xc49\xdc\x1a\xeb;U\x98\xa0\xf0\x00\x00\x00\x00\x01Instruction: UpdateBuybackConfigAn owner constraint was violated\xc6\xfaz\xf3'
0de1f0: mov64 r3, 0x20
0de1f8: call 0x1aa8f ; direct target 0x1b3678
0de200: lsh64 r0, 0x20
0de208: rsh64 r0, 0x20
0de210: jeq r0, 0x0, +0x27 ; branch 0xde350
0de218: mov64 r1, r10
0de220: add64 r1, -0x198
0de228: mov64 r2, 0x4
0de230: call 0xff4b ; direct target 0x15dc90
0de238: ldxdw r3, [r10 - 0x190]
0de240: ldxdw r2, [r10 - 0x198]
0de248: mov64 r1, r10
0de250: add64 r1, -0x1a8
0de258: lddw r4, 0x1b73d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding_curveassociated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociat'
0de268: mov64 r5, 0xd
0de270: call -0x1b729 ; direct target 0x2930
0de278: ldxdw r1, [r10 - 0x1a0]
0de280: ldxdw r2, [r10 - 0x1a8]
0de288: ja -0x46 ; branch 0xde060
0de290: mov64 r1, r10
0de298: add64 r1, -0x158
0de2a0: lddw r4, 0x1b7402 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'associated_quote_bonding_curveassociated_base_userassociated_quote_userassociated_creator_vaultshari'
0de2b0: mov64 r5, 0x1e
0de2b8: call -0x1b732 ; direct target 0x2930
0de2c0: ldxdw r1, [r10 - 0x158]
0de2c8: ldxdw r2, [r10 - 0x150]
0de2d0: ja -0xcd ; branch 0xddc70
0de2d8: mov64 r1, r10
0de2e0: add64 r1, -0x1f8
0de2e8: mov64 r2, 0x7d0
0de2f0: call 0x18205 ; direct target 0x19f320
0de2f8: ldxdw r3, [r10 - 0x1f0]
0de300: ldxdw r2, [r10 - 0x1f8]
0de308: mov64 r1, r10
0de310: add64 r1, -0x208
0de318: lddw r4, 0x1b73d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'bonding_curveassociated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociat'
0de328: mov64 r5, 0xd
0de330: call -0x1b741 ; direct target 0x2930
0de338: ldxdw r1, [r10 - 0x200]
0de340: ldxdw r2, [r10 - 0x208]
0de348: ja -0x5e ; branch 0xde060
0de350: ldxdw r2, [r10 - 0x270]
0de358: ldxdw r1, [r2 + 0x20]
0de360: ldxb r1, [r1 + 0x29]
0de368: jne r1, 0x0, +0xf ; branch 0xde3e8
0de370: mov64 r1, r10
0de378: add64 r1, -0x1d8
0de380: mov64 r2, 0x7d0
0de388: call 0x181f2 ; direct target 0x19f320
0de390: ldxdw r3, [r10 - 0x1d0]
0de398: ldxdw r2, [r10 - 0x1d8]
0de3a0: mov64 r1, r10
0de3a8: add64 r1, -0x1e8
0de3b0: lddw r4, 0x1b73e5 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'associated_base_bonding_curveassociated_quote_bonding_curveassociated_base_userassociated_quote_user'
0de3c0: mov64 r5, 0x1d
0de3c8: call -0x1b754 ; direct target 0x2930
0de3d0: ldxdw r1, [r10 - 0x1e0]
0de3d8: ldxdw r2, [r10 - 0x1e8]
0de3e0: ja -0x71 ; branch 0xde060
0de3e8: ldxdw r3, [r10 - 0x278]
0de3f0: ldxb r1, [r3 + 0x29]
0de3f8: jne r1, 0x0, +0xf ; branch 0xde478
0de400: mov64 r1, r10
0de408: add64 r1, -0x1b8
0de410: mov64 r2, 0x7d0
0de418: call 0x181e0 ; direct target 0x19f320
0de420: ldxdw r3, [r10 - 0x1b0]
0de428: ldxdw r2, [r10 - 0x1b8]
0de430: mov64 r1, r10
0de438: add64 r1, -0x1c8
0de440: lddw r4, 0x1b7402 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'associated_quote_bonding_curveassociated_base_userassociated_quote_userassociated_creator_vaultshari'
0de450: mov64 r5, 0x1e
0de458: call -0x1b766 ; direct target 0x2930
0de460: ldxdw r1, [r10 - 0x1c0]
0de468: ldxdw r2, [r10 - 0x1c8]
0de470: ja -0x83 ; branch 0xde060
0de478: stxdw [r6 + 0x20], r3
0de480: stxdw [r6 + 0x18], r2
0de488: ldxdw r1, [r10 - 0x268]
0de490: stxdw [r6 + 0x10], r1
0de498: ldxdw r1, [r10 - 0x260]
0de4a0: stxdw [r6 + 0x8], r1
0de4a8: stxdw [r6 + 0x0], r7
0de4b0: ja -0x106 ; branch 0xddc88
