058028: stxdw [r10 - 0x138], r3
058030: mov64 r7, r2
058038: mov64 r6, r1
058040: ldxdw r1, [r7 + 0x8]
058048: ldxdw r3, [r1 + 0x0]
058050: add64 r3, 0x1
058058: mov64 r5, 0x1
058060: jeq r3, 0x0, +0x1 ; branch 0x58070
058068: mov64 r5, 0x0
058070: ldxdw r2, [r7 + 0x0]
058078: stxdw [r1 + 0x0], r3
058080: jne r5, 0x1, +0x1 ; branch 0x58090
058088: call -0x1
058090: ldxdw r3, [r7 + 0x10]
058098: ldxdw r0, [r3 + 0x0]
0580a0: add64 r0, 0x1
0580a8: mov64 r5, 0x1
0580b0: jeq r0, 0x0, +0x1 ; branch 0x580c0
0580b8: mov64 r5, 0x0
0580c0: stxdw [r10 - 0x140], r4
0580c8: stxdw [r3 + 0x0], r0
0580d0: jne r5, 0x1, +0x1 ; branch 0x580e0
0580d8: ja -0xb ; branch 0x58088
0580e0: ldxdw r4, [r7 + 0x18]
0580e8: ldxdw r5, [r7 + 0x20]
0580f0: ldxb r0, [r7 + 0x28]
0580f8: ldxb r8, [r7 + 0x29]
058100: ldxb r9, [r7 + 0x2a]
058108: stxb [r10 - 0xbe], r9
058110: stxb [r10 - 0xbf], r8
058118: stxb [r10 - 0xc0], r0
058120: stxdw [r10 - 0xc8], r5
058128: stxdw [r10 - 0xd0], r4
058130: stxdw [r10 - 0xd8], r3
058138: stxdw [r10 - 0xe0], r1
058140: stxdw [r10 - 0xe8], r2
058148: mov64 r1, r10
058150: add64 r1, -0xe8
058158: call 0x161bd ; call 0x108f48
058160: ldxdw r1, [r10 - 0xd8]
058168: ldxdw r2, [r10 - 0xe0]
058170: ldxdw r3, [r2 + 0x0]
058178: add64 r3, -0x1
058180: stxdw [r2 + 0x0], r3
058188: jne r3, 0x0, +0x3 ; branch 0x581a8
058190: ldxdw r3, [r2 + 0x8]
058198: add64 r3, -0x1
0581a0: stxdw [r2 + 0x8], r3
0581a8: ldxdw r2, [r1 + 0x0]
0581b0: add64 r2, -0x1
0581b8: stxdw [r1 + 0x0], r2
0581c0: jne r2, 0x0, +0x3 ; branch 0x581e0
0581c8: ldxdw r2, [r1 + 0x8]
0581d0: add64 r2, -0x1
0581d8: stxdw [r1 + 0x8], r2
0581e0: mov64 r5, 0x2
0581e8: jgt r0, 0x11e, +0x5b ; branch 0x584c8
0581f0: ldxdw r1, [r7 + 0x8]
0581f8: ldxdw r3, [r1 + 0x0]
058200: add64 r3, 0x1
058208: mov64 r4, 0x1
058210: jeq r3, 0x0, +0x1 ; branch 0x58220
058218: mov64 r4, 0x0
058220: ldxdw r2, [r7 + 0x0]
058228: stxdw [r1 + 0x0], r3
058230: jne r4, 0x1, +0x1 ; branch 0x58240
058238: ja -0x37 ; branch 0x58088
058240: ldxdw r3, [r7 + 0x10]
058248: ldxdw r4, [r3 + 0x0]
058250: add64 r4, 0x1
058258: mov64 r5, 0x1
058260: jeq r4, 0x0, +0x1 ; branch 0x58270
058268: mov64 r5, 0x0
058270: stxdw [r3 + 0x0], r4
058278: jne r5, 0x1, +0x1 ; branch 0x58288
058280: ja -0x40 ; branch 0x58088
058288: ldxdw r4, [r7 + 0x18]
058290: ldxdw r5, [r7 + 0x20]
058298: ldxb r0, [r7 + 0x28]
0582a0: ldxb r9, [r7 + 0x29]
0582a8: ldxb r8, [r7 + 0x2a]
0582b0: stxb [r10 - 0xbe], r8
0582b8: stxb [r10 - 0xbf], r9
0582c0: stxb [r10 - 0xc0], r0
0582c8: stxdw [r10 - 0xc8], r5
0582d0: stxdw [r10 - 0xd0], r4
0582d8: stxdw [r10 - 0xd8], r3
0582e0: stxdw [r10 - 0xe0], r1
0582e8: stxdw [r10 - 0xe8], r2
0582f0: mov64 r1, r10
0582f8: add64 r1, -0xe8
058300: call 0x16188 ; call 0x108f48
058308: ldxdw r1, [r10 - 0xd8]
058310: ldxdw r2, [r10 - 0xe0]
058318: ldxdw r3, [r2 + 0x0]
058320: add64 r3, -0x1
058328: stxdw [r2 + 0x0], r3
058330: jne r3, 0x0, +0x3 ; branch 0x58350
058338: ldxdw r3, [r2 + 0x8]
058340: add64 r3, -0x1
058348: stxdw [r2 + 0x8], r3
058350: ldxdw r2, [r1 + 0x0]
058358: add64 r2, -0x1
058360: stxdw [r1 + 0x0], r2
058368: mov64 r5, 0x2
058370: jne r2, 0x0, +0x3 ; branch 0x58390
058378: ldxdw r2, [r1 + 0x8]
058380: add64 r2, -0x1
058388: stxdw [r1 + 0x8], r2
058390: jgt r0, 0x11e, +0x26 ; branch 0x584c8
058398: mov64 r1, r10
0583a0: add64 r1, -0xe8
0583a8: call 0x15d6e ; call 0x106f20
0583b0: ldxdw r1, [r10 - 0xe0]
0583b8: stxdw [r10 - 0x100], r1
0583c0: ldxdw r1, [r10 - 0xd8]
0583c8: stxdw [r10 - 0xf8], r1
0583d0: ldxdw r1, [r10 - 0xd0]
0583d8: stxdw [r10 - 0xf0], r1
0583e0: ldxdw r1, [r10 - 0xe8]
0583e8: jne r1, 0x0, +0x14 ; branch 0x58490
0583f0: ldxdw r1, [r10 - 0xf0]
0583f8: stxdw [r10 - 0x8], r1
058400: ldxdw r1, [r10 - 0xf8]
058408: stxdw [r10 - 0x10], r1
058410: ldxdw r1, [r10 - 0x100]
058418: stxdw [r10 - 0x18], r1
058420: mov64 r1, r10
058428: add64 r1, -0x18
058430: mov64 r2, 0x11f
058438: call 0x15d75 ; call 0x106fe8
058440: ldxdw r1, [r7 + 0x8]
058448: ldxdw r3, [r1 + 0x0]
058450: add64 r3, 0x1
058458: mov64 r4, 0x1
058460: jeq r3, 0x0, +0x1 ; branch 0x58470
058468: mov64 r4, 0x0
058470: ldxdw r2, [r7 + 0x0]
058478: stxdw [r1 + 0x0], r3
058480: jne r4, 0x1, +0xb ; branch 0x584e0
058488: ja -0x81 ; branch 0x58088
058490: mov64 r1, r10
058498: add64 r1, -0x110
0584a0: mov64 r2, r10
0584a8: add64 r2, -0x100
0584b0: call 0x15571 ; call 0x103040
0584b8: ldxdw r1, [r10 - 0x108]
0584c0: ldxdw r5, [r10 - 0x110]
0584c8: stxdw [r6 + 0x8], r1
0584d0: stxdw [r6 + 0x0], r5
0584d8: exit
0584e0: ldxdw r3, [r7 + 0x10]
0584e8: ldxdw r4, [r3 + 0x0]
0584f0: add64 r4, 0x1
0584f8: mov64 r5, 0x1
058500: jeq r4, 0x0, +0x1 ; branch 0x58510
058508: mov64 r5, 0x0
058510: stxdw [r10 - 0x148], r0
058518: stxdw [r3 + 0x0], r4
058520: jne r5, 0x1, +0x1 ; branch 0x58530
058528: ja -0x95 ; branch 0x58088
058530: ldxdw r4, [r7 + 0x18]
058538: ldxdw r5, [r7 + 0x20]
058540: ldxb r0, [r7 + 0x28]
058548: ldxb r8, [r7 + 0x29]
058550: ldxb r9, [r7 + 0x2a]
058558: stxb [r10 - 0xbe], r9
058560: stxb [r10 - 0xbf], r8
058568: stxb [r10 - 0xc0], r0
058570: stxdw [r10 - 0xc8], r5
058578: stxdw [r10 - 0xd0], r4
058580: stxdw [r10 - 0xd8], r3
058588: stxdw [r10 - 0xe0], r1
058590: stxdw [r10 - 0xe8], r2
058598: mov64 r1, r10
0585a0: add64 r1, -0xe8
0585a8: call 0x16124 ; call 0x108ed0
0585b0: ldxdw r1, [r10 - 0xd8]
0585b8: ldxdw r2, [r10 - 0xe0]
0585c0: ldxdw r3, [r2 + 0x0]
0585c8: add64 r3, -0x1
0585d0: stxdw [r2 + 0x0], r3
0585d8: jne r3, 0x0, +0x3 ; branch 0x585f8
0585e0: ldxdw r3, [r2 + 0x8]
0585e8: add64 r3, -0x1
0585f0: stxdw [r2 + 0x8], r3
0585f8: ldxdw r2, [r1 + 0x0]
058600: add64 r2, -0x1
058608: stxdw [r1 + 0x0], r2
058610: ldxdw r4, [r10 - 0x148]
058618: jne r2, 0x0, +0x3 ; branch 0x58638
058620: ldxdw r2, [r1 + 0x8]
058628: add64 r2, -0x1
058630: stxdw [r1 + 0x8], r2
058638: jgt r4, r0, +0x1 ; branch 0x58648
058640: ja +0x9e ; branch 0x58b38
058648: mov64 r2, r4
058650: sub64 r2, r0
058658: mov64 r1, 0x1
058660: mov64 r3, 0x1
058668: jgt r2, r4, +0x1 ; branch 0x58678
058670: mov64 r3, 0x0
058678: mov64 r5, 0x0
058680: ldxdw r4, [r10 - 0x140]
058688: jne r3, 0x0, +0x1 ; branch 0x58698
058690: mov64 r5, r2
058698: ldxdw r3, [r10 - 0x138]
0586a0: ldxdw r0, [r3 + 0x8]
0586a8: ldxdw r2, [r0 + 0x0]
0586b0: add64 r2, 0x1
0586b8: jeq r2, 0x0, +0x1 ; branch 0x586c8
0586c0: mov64 r1, 0x0
0586c8: ldxdw r8, [r3 + 0x0]
0586d0: stxdw [r0 + 0x0], r2
0586d8: jne r1, 0x1, +0x1 ; branch 0x586e8
0586e0: ja -0xcc ; branch 0x58088
0586e8: ldxdw r9, [r3 + 0x10]
0586f0: ldxdw r1, [r9 + 0x0]
0586f8: add64 r1, 0x1
058700: mov64 r2, 0x1
058708: jeq r1, 0x0, +0x1 ; branch 0x58718
058710: mov64 r2, 0x0
058718: stxdw [r9 + 0x0], r1
058720: jne r2, 0x1, +0x1 ; branch 0x58730
058728: ja -0xd5 ; branch 0x58088
058730: ldxdw r1, [r4 + 0x8]
058738: stxdw [r10 - 0x148], r1
058740: ldxdw r1, [r1 + 0x0]
058748: add64 r1, 0x1
058750: mov64 r2, 0x1
058758: jeq r1, 0x0, +0x1 ; branch 0x58768
058760: mov64 r2, 0x0
058768: stxdw [r10 - 0x158], r9
058770: ldxdw r9, [r4 + 0x0]
058778: stxdw [r10 - 0x180], r9
058780: ldxb r9, [r3 + 0x2a]
058788: stxdw [r10 - 0x178], r9
058790: ldxb r9, [r3 + 0x29]
058798: stxdw [r10 - 0x170], r9
0587a0: ldxb r9, [r3 + 0x28]
0587a8: stxdw [r10 - 0x168], r9
0587b0: ldxdw r9, [r3 + 0x20]
0587b8: stxdw [r10 - 0x160], r9
0587c0: ldxdw r3, [r3 + 0x18]
0587c8: stxdw [r10 - 0x138], r3
0587d0: ldxdw r3, [r10 - 0x148]
0587d8: stxdw [r3 + 0x0], r1
0587e0: jne r2, 0x1, +0x1 ; branch 0x587f0
0587e8: ja -0xed ; branch 0x58088
0587f0: ldxdw r9, [r4 + 0x10]
0587f8: ldxdw r1, [r9 + 0x0]
058800: add64 r1, 0x1
058808: mov64 r2, 0x1
058810: jeq r1, 0x0, +0x1 ; branch 0x58820
058818: mov64 r2, 0x0
058820: stxdw [r10 - 0x150], r5
058828: stxdw [r9 + 0x0], r1
058830: jne r2, 0x1, +0x1 ; branch 0x58840
058838: ja -0xf7 ; branch 0x58088
058840: mov64 r5, r8
058848: ldxdw r2, [r7 + 0x8]
058850: ldxdw r1, [r2 + 0x0]
058858: add64 r1, 0x1
058860: mov64 r3, 0x1
058868: jeq r1, 0x0, +0x1 ; branch 0x58878
058870: mov64 r3, 0x0
058878: ldxdw r8, [r7 + 0x0]
058880: stxdw [r10 - 0x1a8], r8
058888: ldxb r8, [r4 + 0x2a]
058890: stxdw [r10 - 0x1a0], r8
058898: ldxb r8, [r4 + 0x29]
0588a0: stxdw [r10 - 0x198], r8
0588a8: ldxb r8, [r4 + 0x28]
0588b0: stxdw [r10 - 0x190], r8
0588b8: ldxdw r8, [r4 + 0x20]
0588c0: stxdw [r10 - 0x188], r8
0588c8: ldxdw r4, [r4 + 0x18]
0588d0: stxdw [r10 - 0x140], r4
0588d8: stxdw [r2 + 0x0], r1
0588e0: jne r3, 0x1, +0x1 ; branch 0x588f0
0588e8: ja -0x10d ; branch 0x58088
0588f0: ldxdw r1, [r7 + 0x10]
0588f8: ldxdw r3, [r1 + 0x0]
058900: add64 r3, 0x1
058908: mov64 r4, 0x1
058910: jeq r3, 0x0, +0x1 ; branch 0x58920
058918: mov64 r4, 0x0
058920: stxdw [r10 - 0x1b8], r5
058928: stxdw [r10 - 0x1b0], r0
058930: ldxdw r5, [r10 - 0x150]
058938: stxdw [r1 + 0x0], r3
058940: jne r4, 0x1, +0x1 ; branch 0x58950
058948: ja -0x119 ; branch 0x58088
058950: ldxdw r3, [r7 + 0x18]
058958: ldxdw r4, [r7 + 0x20]
058960: ldxb r8, [r7 + 0x28]
058968: ldxb r0, [r7 + 0x29]
058970: ldxb r5, [r7 + 0x2a]
058978: stxb [r10 - 0x46], r5
058980: stxb [r10 - 0x47], r0
058988: stxb [r10 - 0x48], r8
058990: stxdw [r10 - 0x50], r4
058998: stxdw [r10 - 0x58], r3
0589a0: stxdw [r10 - 0x60], r1
0589a8: stxdw [r10 - 0x68], r2
0589b0: ldxdw r1, [r10 - 0x1a8]
0589b8: stxdw [r10 - 0x70], r1
0589c0: ldxdw r1, [r10 - 0x1a0]
0589c8: stxb [r10 - 0x76], r1
0589d0: ldxdw r1, [r10 - 0x198]
0589d8: stxb [r10 - 0x77], r1
0589e0: ldxdw r1, [r10 - 0x190]
0589e8: stxb [r10 - 0x78], r1
0589f0: ldxdw r1, [r10 - 0x188]
0589f8: stxdw [r10 - 0x80], r1
058a00: ldxdw r1, [r10 - 0x140]
058a08: stxdw [r10 - 0x88], r1
058a10: stxdw [r10 - 0x90], r9
058a18: ldxdw r1, [r10 - 0x148]
058a20: stxdw [r10 - 0x98], r1
058a28: ldxdw r1, [r10 - 0x180]
058a30: stxdw [r10 - 0xa0], r1
058a38: ldxdw r1, [r10 - 0x178]
058a40: stxb [r10 - 0xa6], r1
058a48: ldxdw r1, [r10 - 0x170]
058a50: stxb [r10 - 0xa7], r1
058a58: ldxdw r1, [r10 - 0x168]
058a60: stxb [r10 - 0xa8], r1
058a68: ldxdw r1, [r10 - 0x160]
058a70: stxdw [r10 - 0xb0], r1
058a78: ldxdw r1, [r10 - 0x138]
058a80: stxdw [r10 - 0xb8], r1
058a88: ldxdw r1, [r10 - 0x158]
058a90: stxdw [r10 - 0xc0], r1
058a98: ldxdw r1, [r10 - 0x1b0]
058aa0: stxdw [r10 - 0xc8], r1
058aa8: ldxdw r1, [r10 - 0x1b8]
058ab0: stxdw [r10 - 0xd0], r1
058ab8: stdw [r10 - 0x38], 0x0
058ac0: stdw [r10 - 0x40], 0x8
058ac8: stdw [r10 - 0xd8], 0x0
058ad0: stdw [r10 - 0xe0], 0x8
058ad8: stdw [r10 - 0xe8], 0x0
058ae0: mov64 r1, r10
058ae8: add64 r1, -0x120
058af0: mov64 r2, r10
058af8: add64 r2, -0xe8
058b00: ldxdw r3, [r10 - 0x150]
058b08: call 0x15883 ; call 0x104f28
058b10: ldxdw r2, [r10 - 0x120]
058b18: jeq r2, 0x2, +0x3 ; branch 0x58b38
058b20: ldxdw r1, [r10 - 0x118]
058b28: mov64 r5, r2
058b30: ja -0xce ; branch 0x584c8
058b38: ldxdw r8, [r7 + 0x8]
058b40: ldxdw r2, [r8 + 0x0]
058b48: add64 r2, 0x1
058b50: mov64 r3, 0x1
058b58: jeq r2, 0x0, +0x1 ; branch 0x58b68
058b60: mov64 r3, 0x0
058b68: ldxdw r1, [r7 + 0x0]
058b70: stxdw [r8 + 0x0], r2
058b78: jne r3, 0x1, +0x1 ; branch 0x58b88
058b80: ja -0x160 ; branch 0x58088
058b88: ldxdw r9, [r7 + 0x10]
058b90: ldxdw r2, [r9 + 0x0]
058b98: add64 r2, 0x1
058ba0: mov64 r3, 0x1
058ba8: jeq r2, 0x0, +0x1 ; branch 0x58bb8
058bb0: mov64 r3, 0x0
058bb8: stxdw [r9 + 0x0], r2
058bc0: jne r3, 0x1, +0x1 ; branch 0x58bd0
058bc8: ja -0x169 ; branch 0x58088
058bd0: ldxdw r2, [r7 + 0x18]
058bd8: ldxdw r3, [r7 + 0x20]
058be0: ldxb r4, [r7 + 0x28]
058be8: ldxb r5, [r7 + 0x29]
058bf0: ldxb r0, [r7 + 0x2a]
058bf8: stxb [r10 - 0xbe], r0
058c00: stxb [r10 - 0xbf], r5
058c08: stxb [r10 - 0xc0], r4
058c10: stxdw [r10 - 0xc8], r3
058c18: stxdw [r10 - 0xd0], r2
058c20: stxdw [r10 - 0xd8], r9
058c28: stxdw [r10 - 0xe0], r8
058c30: stxdw [r10 - 0xe8], r1
058c38: mov64 r1, r10
058c40: add64 r1, -0x30
058c48: mov64 r2, r10
058c50: add64 r2, -0xe8
058c58: mov64 r3, 0x11f
058c60: mov64 r4, 0x0
058c68: call 0x160c4 ; call 0x109290
058c70: lddw r1, -0x7fffffffffffffe6
058c80: ldxdw r2, [r10 - 0x30]
058c88: jeq r2, r1, +0x1 ; branch 0x58c98
058c90: ja +0x10 ; branch 0x58d18
058c98: ldxdw r1, [r8 + 0x0]
058ca0: add64 r1, -0x1
058ca8: stxdw [r8 + 0x0], r1
058cb0: jne r1, 0x0, +0x3 ; branch 0x58cd0
058cb8: ldxdw r1, [r8 + 0x8]
058cc0: add64 r1, -0x1
058cc8: stxdw [r8 + 0x8], r1
058cd0: ldxdw r1, [r9 + 0x0]
058cd8: add64 r1, -0x1
058ce0: stxdw [r9 + 0x0], r1
058ce8: jne r1, 0x0, +0x3 ; branch 0x58d08
058cf0: ldxdw r1, [r9 + 0x8]
058cf8: add64 r1, -0x1
058d00: stxdw [r9 + 0x8], r1
058d08: mov64 r5, 0x2
058d10: ja -0x10a ; branch 0x584c8
058d18: ldxdw r1, [r10 - 0x20]
058d20: stxdw [r10 - 0x8], r1
058d28: ldxdw r1, [r10 - 0x28]
058d30: stxdw [r10 - 0x10], r1
058d38: ldxdw r1, [r10 - 0x30]
058d40: stxdw [r10 - 0x18], r1
058d48: mov64 r1, r10
058d50: add64 r1, -0x130
058d58: mov64 r2, r10
058d60: add64 r2, -0x18
058d68: call 0x1545a ; call 0x103040
058d70: ldxdw r2, [r10 - 0xd8]
058d78: ldxdw r1, [r10 - 0x128]
058d80: ldxdw r5, [r10 - 0x130]
058d88: ldxdw r3, [r10 - 0xe0]
058d90: ldxdw r4, [r3 + 0x0]
058d98: add64 r4, -0x1
058da0: stxdw [r3 + 0x0], r4
058da8: jne r4, 0x0, +0x3 ; branch 0x58dc8
058db0: ldxdw r4, [r3 + 0x8]
058db8: add64 r4, -0x1
058dc0: stxdw [r3 + 0x8], r4
058dc8: ldxdw r3, [r2 + 0x0]
058dd0: add64 r3, -0x1
058dd8: stxdw [r2 + 0x0], r3
058de0: jne r3, 0x0, -0x124 ; branch 0x584c8
058de8: ldxdw r3, [r2 + 0x8]
058df0: add64 r3, -0x1
058df8: stxdw [r2 + 0x8], r3
058e00: ja -0x128 ; branch 0x584c8
