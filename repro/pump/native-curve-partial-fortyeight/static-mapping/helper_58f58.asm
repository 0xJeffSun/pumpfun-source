058f58: mov64 r9, r2
058f60: mov64 r8, r1
058f68: mov64 r1, 0x2
058f70: jeq r5, 0x0, +0x203 ; branch 0x59f90
058f78: ldxdw r1, [r9 + 0x38]
058f80: ldxdw r6, [r1 + 0x8]
058f88: ldxdw r2, [r6 + 0x0]
058f90: add64 r2, 0x1
058f98: mov64 r7, 0x1
058fa0: jeq r2, 0x0, +0x1 ; branch 0x58fb0
058fa8: mov64 r7, 0x0
058fb0: ldxdw r0, [r1 + 0x0]
058fb8: stxdw [r10 - 0x1b0], r0
058fc0: stxdw [r6 + 0x0], r2
058fc8: jne r7, 0x1, +0x1 ; branch 0x58fd8
058fd0: call -0x1 ; relocation {'type': 10, 'symbol': 'abort'}
058fd8: ldxdw r0, [r1 + 0x10]
058fe0: ldxdw r2, [r0 + 0x0]
058fe8: add64 r2, 0x1
058ff0: mov64 r7, 0x1
058ff8: jeq r2, 0x0, +0x1 ; branch 0x59008
059000: mov64 r7, 0x0
059008: stxdw [r10 - 0x1f0], r3
059010: stxdw [r10 - 0x1a8], r0
059018: stxdw [r0 + 0x0], r2
059020: jne r7, 0x1, +0x1 ; branch 0x59030
059028: ja -0xc ; branch 0x58fd0
059030: ldxdw r2, [r4 + 0x0]
059038: ldxdw r7, [r2 + 0x8]
059040: ldxdw r3, [r7 + 0x0]
059048: add64 r3, 0x1
059050: mov64 r0, 0x1
059058: jeq r3, 0x0, +0x1 ; branch 0x59068
059060: mov64 r0, 0x0
059068: stxdw [r10 - 0x1e0], r8
059070: ldxb r8, [r1 + 0x2a]
059078: stxdw [r10 - 0x1d8], r8
059080: ldxb r8, [r1 + 0x29]
059088: stxdw [r10 - 0x1d0], r8
059090: ldxb r8, [r1 + 0x28]
059098: stxdw [r10 - 0x1c8], r8
0590a0: ldxdw r8, [r1 + 0x20]
0590a8: stxdw [r10 - 0x1c0], r8
0590b0: ldxdw r1, [r1 + 0x18]
0590b8: stxdw [r10 - 0x1b8], r1
0590c0: ldxdw r1, [r2 + 0x0]
0590c8: stxdw [r10 - 0x1e8], r1
0590d0: stxdw [r7 + 0x0], r3
0590d8: jne r0, 0x1, +0x1 ; branch 0x590e8
0590e0: ja -0x23 ; branch 0x58fd0
0590e8: ldxdw r8, [r2 + 0x10]
0590f0: ldxdw r1, [r8 + 0x0]
0590f8: add64 r1, 0x1
059100: mov64 r3, 0x1
059108: jeq r1, 0x0, +0x1 ; branch 0x59118
059110: mov64 r3, 0x0
059118: stxdw [r8 + 0x0], r1
059120: ldxdw r0, [r10 - 0x1a8]
059128: jne r3, 0x1, +0x1 ; branch 0x59138
059130: ja -0x2d ; branch 0x58fd0
059138: ldxb r1, [r2 + 0x2a]
059140: stxdw [r10 - 0x210], r1
059148: ldxb r1, [r2 + 0x29]
059150: stxdw [r10 - 0x208], r1
059158: ldxb r1, [r2 + 0x28]
059160: stxdw [r10 - 0x200], r1
059168: ldxdw r1, [r2 + 0x20]
059170: stxdw [r10 - 0x1f8], r1
059178: ldxdw r3, [r2 + 0x18]
059180: ldxdw r2, [r6 + 0x0]
059188: add64 r2, 0x1
059190: stxdw [r6 + 0x0], r2
059198: mov64 r1, 0x1
0591a0: jeq r2, 0x0, +0x1 ; branch 0x591b0
0591a8: mov64 r1, 0x0
0591b0: jne r1, 0x1, +0x1 ; branch 0x591c0
0591b8: ja -0x3e ; branch 0x58fd0
0591c0: ldxdw r2, [r0 + 0x0]
0591c8: add64 r2, 0x1
0591d0: stxdw [r0 + 0x0], r2
0591d8: mov64 r1, 0x1
0591e0: jeq r2, 0x0, +0x1 ; branch 0x591f0
0591e8: mov64 r1, 0x0
0591f0: stxdw [r10 - 0x218], r3
0591f8: jne r1, 0x1, +0x1 ; branch 0x59208
059200: ja -0x47 ; branch 0x58fd0
059208: ldxdw r1, [r10 - 0x1d8]
059210: stxb [r10 - 0x136], r1
059218: ldxdw r1, [r10 - 0x1d0]
059220: stxb [r10 - 0x137], r1
059228: ldxdw r1, [r10 - 0x1c8]
059230: stxb [r10 - 0x138], r1
059238: ldxdw r1, [r10 - 0x1c0]
059240: stxdw [r10 - 0x140], r1
059248: ldxdw r1, [r10 - 0x1b8]
059250: stxdw [r10 - 0x148], r1
059258: stxdw [r10 - 0x150], r0
059260: stxdw [r10 - 0x158], r6
059268: ldxdw r1, [r10 - 0x1b0]
059270: stxdw [r10 - 0x160], r1
059278: mov64 r1, r10
059280: add64 r1, -0x170
059288: mov64 r3, r10
059290: add64 r3, -0x160
059298: mov64 r2, r4
0592a0: mov64 r4, r5
0592a8: call 0x7a61 ; direct target 0x965b8
0592b0: ldxdw r1, [r10 - 0x170]
0592b8: jeq r1, 0x2, +0x1 ; branch 0x592c8
0592c0: ja +0x15 ; branch 0x59370
0592c8: lddw r1, 0x300000000
0592d8: ldxdw r1, [r1 + 0x0]
0592e0: mov64 r2, r1
0592e8: add64 r2, -0x66
0592f0: mov64 r3, 0x0
0592f8: mov64 r4, 0x1
059300: jgt r2, r1, +0x1 ; branch 0x59310
059308: mov64 r4, 0x0
059310: jne r4, 0x0, +0x1 ; branch 0x59320
059318: mov64 r3, r2
059320: lddw r2, 0x300007f9a
059330: jeq r1, 0x0, +0x1 ; branch 0x59340
059338: mov64 r2, r3
059340: lddw r1, 0x300000007
059350: jgt r2, r1, +0x14 ; branch 0x593f8
059358: mov64 r1, 0x1
059360: mov64 r2, 0x66
059368: call 0x2a3c8 ; direct target 0x1ab1b0
059370: ldxdw r2, [r10 - 0x168]
059378: ldxdw r3, [r7 + 0x0]
059380: add64 r3, -0x1
059388: stxdw [r7 + 0x0], r3
059390: jne r3, 0x0, +0x3 ; branch 0x593b0
059398: ldxdw r3, [r7 + 0x8]
0593a0: add64 r3, -0x1
0593a8: stxdw [r7 + 0x8], r3
0593b0: ldxdw r3, [r8 + 0x0]
0593b8: add64 r3, -0x1
0593c0: stxdw [r8 + 0x0], r3
0593c8: ldxdw r0, [r10 - 0x1a8]
0593d0: jne r3, 0x0, +0x168 ; branch 0x59f18
0593d8: ldxdw r3, [r8 + 0x8]
0593e0: add64 r3, -0x1
0593e8: stxdw [r8 + 0x8], r3
0593f0: ja +0x164 ; branch 0x59f18
0593f8: lddw r1, 0x300000000
059408: stxdw [r1 + 0x0], r2
059410: ldxdw r1, [r9 + 0x60]
059418: ldxdw r3, [r10 - 0x1e8]
059420: ldxdw r4, [r3 + 0x18]
059428: stxdw [r10 - 0x20], r4
059430: ldxdw r4, [r3 + 0x10]
059438: stxdw [r10 - 0x28], r4
059440: ldxdw r4, [r3 + 0x8]
059448: stxdw [r10 - 0x30], r4
059450: ldxdw r4, [r3 + 0x0]
059458: stxdw [r10 - 0x38], r4
059460: ldxdw r3, [r10 - 0x1b0]
059468: ldxdw r4, [r3 + 0x18]
059470: stxdw [r10 - 0x148], r4
059478: ldxdw r4, [r3 + 0x10]
059480: stxdw [r10 - 0x150], r4
059488: ldxdw r4, [r3 + 0x8]
059490: stxdw [r10 - 0x158], r4
059498: ldxdw r4, [r3 + 0x0]
0594a0: stxdw [r10 - 0x160], r4
0594a8: ldxdw r4, [r1 + 0x0]
0594b0: ldxdw r5, [r1 + 0x8]
0594b8: ldxdw r0, [r1 + 0x10]
0594c0: ldxdw r3, [r1 + 0x18]
0594c8: stxdw [r2 + 0x18], r3
0594d0: stxdw [r2 + 0x10], r0
0594d8: stxdw [r2 + 0x8], r5
0594e0: stxdw [r2 + 0x0], r4
0594e8: sth [r2 + 0x20], 0x1
0594f0: ldxdw r3, [r10 - 0x38]
0594f8: stxdw [r2 + 0x22], r3
059500: ldxdw r3, [r10 - 0x30]
059508: stxdw [r2 + 0x2a], r3
059510: ldxdw r3, [r10 - 0x28]
059518: stxdw [r2 + 0x32], r3
059520: ldxdw r3, [r10 - 0x20]
059528: stxdw [r2 + 0x3a], r3
059530: sth [r2 + 0x42], 0x100
059538: ldxdw r3, [r10 - 0x160]
059540: stxdw [r2 + 0x44], r3
059548: ldxdw r3, [r10 - 0x158]
059550: stxdw [r2 + 0x4c], r3
059558: ldxdw r3, [r10 - 0x150]
059560: stxdw [r2 + 0x54], r3
059568: ldxdw r3, [r10 - 0x148]
059570: stxdw [r2 + 0x5c], r3
059578: sth [r2 + 0x64], 0x100
059580: lddw r3, 0x300000000
059590: ldxdw r4, [r3 + 0x0]
059598: mov64 r5, 0x0
0595a0: mov64 r0, 0x1
0595a8: mov64 r3, r4
0595b0: add64 r3, -0x8
0595b8: jgt r3, r4, +0x1 ; branch 0x595c8
0595c0: mov64 r0, 0x0
0595c8: jne r0, 0x0, +0x1 ; branch 0x595d8
0595d0: mov64 r5, r3
0595d8: lddw r3, 0x300007ff8
0595e8: jeq r4, 0x0, +0x1 ; branch 0x595f8
0595f0: mov64 r3, r5
0595f8: lddw r4, 0x300000007
059608: jgt r3, r4, +0x3 ; branch 0x59628
059610: mov64 r1, 0x1
059618: mov64 r2, 0x8
059620: call 0x2a36e ; direct target 0x1ab198
059628: lddw r4, 0x300000000
059638: stxdw [r4 + 0x0], r3
059640: lddw r4, 0x1d9acb512ea545e4
059650: stxdw [r3 + 0x0], r4
059658: lddw r4, -0x4fe7920249d4a29b
059668: stxdw [r10 - 0x58], r4
059670: lddw r4, 0x3bffd2f597cb8951
059680: stxdw [r10 - 0x60], r4
059688: lddw r4, -0x55a4e84097ea24bc
059698: stxdw [r10 - 0x68], r4
0596a0: lddw r4, -0x30a5996c091fa9ff
0596b0: stxdw [r10 - 0x70], r4
0596b8: stxdw [r10 - 0x80], r3
0596c0: stxdw [r10 - 0x98], r2
0596c8: stdw [r10 - 0x78], 0x8
0596d0: stdw [r10 - 0x88], 0x8
0596d8: stdw [r10 - 0x90], 0x3
0596e0: stdw [r10 - 0xa0], 0x3
0596e8: ldxdw r2, [r9 + 0x68]
0596f0: ldxdw r3, [r2 + 0x0]
0596f8: add64 r3, 0x1
059700: mov64 r4, 0x1
059708: jeq r3, 0x0, +0x1 ; branch 0x59718
059710: mov64 r4, 0x0
059718: stxdw [r2 + 0x0], r3
059720: jne r4, 0x1, +0x1 ; branch 0x59730
059728: ja -0xec ; branch 0x58fd0
059730: ldxdw r3, [r9 + 0x70]
059738: ldxdw r4, [r3 + 0x0]
059740: add64 r4, 0x1
059748: mov64 r5, 0x1
059750: jeq r4, 0x0, +0x1 ; branch 0x59760
059758: mov64 r5, 0x0
059760: stxdw [r3 + 0x0], r4
059768: jne r5, 0x1, +0x1 ; branch 0x59778
059770: ja -0xf5 ; branch 0x58fd0
059778: ldxb r4, [r9 + 0x8a]
059780: stxdw [r10 - 0x230], r4
059788: ldxb r4, [r9 + 0x89]
059790: stxdw [r10 - 0x228], r4
059798: ldxb r0, [r9 + 0x88]
0597a0: ldxdw r5, [r9 + 0x80]
0597a8: ldxdw r4, [r9 + 0x78]
0597b0: stxdw [r10 - 0x220], r4
0597b8: ldxdw r4, [r6 + 0x0]
0597c0: add64 r4, 0x1
0597c8: stxdw [r6 + 0x0], r4
0597d0: mov64 r9, 0x1
0597d8: jeq r4, 0x0, +0x1 ; branch 0x597e8
0597e0: mov64 r9, 0x0
0597e8: jne r9, 0x1, +0x1 ; branch 0x597f8
0597f0: ja -0x105 ; branch 0x58fd0
0597f8: ldxdw r9, [r10 - 0x1a8]
059800: ldxdw r4, [r9 + 0x0]
059808: add64 r4, 0x1
059810: stxdw [r9 + 0x0], r4
059818: mov64 r9, 0x1
059820: jeq r4, 0x0, +0x1 ; branch 0x59830
059828: mov64 r9, 0x0
059830: jne r9, 0x1, +0x1 ; branch 0x59840
059838: ja -0x10e ; branch 0x58fd0
059840: ldxdw r4, [r10 - 0x1d8]
059848: stxb [r10 - 0xd6], r4
059850: ldxdw r4, [r10 - 0x1d0]
059858: stxb [r10 - 0xd7], r4
059860: ldxdw r4, [r10 - 0x1c8]
059868: stxb [r10 - 0xd8], r4
059870: ldxdw r4, [r10 - 0x1c0]
059878: stxdw [r10 - 0xe0], r4
059880: ldxdw r4, [r10 - 0x1b8]
059888: stxdw [r10 - 0xe8], r4
059890: ldxdw r4, [r10 - 0x1a8]
059898: stxdw [r10 - 0xf0], r4
0598a0: stxdw [r10 - 0xf8], r6
0598a8: ldxdw r9, [r10 - 0x1b0]
0598b0: stxdw [r10 - 0x100], r9
0598b8: ldxdw r4, [r10 - 0x210]
0598c0: stxb [r10 - 0x106], r4
0598c8: ldxdw r4, [r10 - 0x208]
0598d0: stxb [r10 - 0x107], r4
0598d8: ldxdw r4, [r10 - 0x200]
0598e0: stxb [r10 - 0x108], r4
0598e8: ldxdw r4, [r10 - 0x1f8]
0598f0: stxdw [r10 - 0x110], r4
0598f8: ldxdw r4, [r10 - 0x218]
059900: stxdw [r10 - 0x118], r4
059908: stxdw [r10 - 0x120], r8
059910: stxdw [r10 - 0x128], r7
059918: ldxdw r4, [r10 - 0x1e8]
059920: stxdw [r10 - 0x130], r4
059928: ldxdw r4, [r10 - 0x230]
059930: stxb [r10 - 0x136], r4
059938: ldxdw r4, [r10 - 0x228]
059940: stxb [r10 - 0x137], r4
059948: stxb [r10 - 0x138], r0
059950: stxdw [r10 - 0x140], r5
059958: ldxdw r4, [r10 - 0x220]
059960: stxdw [r10 - 0x148], r4
059968: stxdw [r10 - 0x150], r3
059970: stxdw [r10 - 0x158], r2
059978: stxdw [r10 - 0x160], r1
059980: mov64 r1, r10
059988: add64 r1, -0x38
059990: stxdw [r10 - 0xd0], r1
059998: mov64 r1, r10
0599a0: add64 r1, -0xb9
0599a8: stxdw [r10 - 0x28], r1
0599b0: lddw r1, 0x1b6807 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'__event_authorityanchor:idlprograms/pump/src/buy.rsbonding-curveprograms/pump/src/buy_v2.rsbuybuy_ex'
0599c0: stxdw [r10 - 0x38], r1
0599c8: ldxdw r1, [r10 - 0x1f0]
0599d0: stxb [r10 - 0xb9], r1
0599d8: stdw [r10 - 0xc8], 0x2
0599e0: stdw [r10 - 0x20], 0x1
0599e8: stdw [r10 - 0x30], 0x11
0599f0: mov64 r1, r10
0599f8: add64 r1, -0xd0
059a00: stxdw [r10 - 0x1000], r1
059a08: stdw [r10 - 0xff8], 0x1
059a10: mov64 r1, r10
059a18: add64 r1, -0xb8
059a20: mov64 r2, r10
059a28: add64 r2, -0xa0
059a30: mov64 r3, r10
059a38: add64 r3, -0x160
059a40: mov64 r5, r10
059a48: mov64 r4, 0x3
059a50: call 0x28d5b ; direct target 0x1a0530
059a58: lddw r1, -0x7fffffffffffffe6
059a68: ldxdw r2, [r10 - 0xb8]
059a70: jne r2, r1, +0x56 ; branch 0x59d28
059a78: ldxdw r1, [r10 - 0x150]
059a80: ldxdw r2, [r10 - 0x158]
059a88: ldxdw r3, [r2 + 0x0]
059a90: add64 r3, -0x1
059a98: stxdw [r2 + 0x0], r3
059aa0: jne r3, 0x0, +0x3 ; branch 0x59ac0
059aa8: ldxdw r3, [r2 + 0x8]
059ab0: add64 r3, -0x1
059ab8: stxdw [r2 + 0x8], r3
059ac0: ldxdw r2, [r1 + 0x0]
059ac8: add64 r2, -0x1
059ad0: stxdw [r1 + 0x0], r2
059ad8: jne r2, 0x0, +0x3 ; branch 0x59af8
059ae0: ldxdw r2, [r1 + 0x8]
059ae8: add64 r2, -0x1
059af0: stxdw [r1 + 0x8], r2
059af8: ldxdw r1, [r10 - 0x120]
059b00: ldxdw r2, [r10 - 0x128]
059b08: ldxdw r3, [r2 + 0x0]
059b10: add64 r3, -0x1
059b18: stxdw [r2 + 0x0], r3
059b20: jne r3, 0x0, +0x3 ; branch 0x59b40
059b28: ldxdw r3, [r2 + 0x8]
059b30: add64 r3, -0x1
059b38: stxdw [r2 + 0x8], r3
059b40: ldxdw r2, [r1 + 0x0]
059b48: add64 r2, -0x1
059b50: stxdw [r1 + 0x0], r2
059b58: jne r2, 0x0, +0x3 ; branch 0x59b78
059b60: ldxdw r2, [r1 + 0x8]
059b68: add64 r2, -0x1
059b70: stxdw [r1 + 0x8], r2
059b78: ldxdw r1, [r10 - 0xf0]
059b80: ldxdw r2, [r10 - 0xf8]
059b88: ldxdw r3, [r2 + 0x0]
059b90: add64 r3, -0x1
059b98: stxdw [r2 + 0x0], r3
059ba0: jne r3, 0x0, +0x3 ; branch 0x59bc0
059ba8: ldxdw r3, [r2 + 0x8]
059bb0: add64 r3, -0x1
059bb8: stxdw [r2 + 0x8], r3
059bc0: ldxdw r2, [r1 + 0x0]
059bc8: add64 r2, -0x1
059bd0: stxdw [r1 + 0x0], r2
059bd8: jne r2, 0x0, +0x3 ; branch 0x59bf8
059be0: ldxdw r2, [r1 + 0x8]
059be8: add64 r2, -0x1
059bf0: stxdw [r1 + 0x8], r2
059bf8: lddw r1, -0x56ff00817a0a73c6
059c08: stxdw [r10 - 0x20], r1
059c10: lddw r1, -0x6ec8a4a0127a4be4
059c20: stxdw [r10 - 0x28], r1
059c28: lddw r1, -0x53861431b91e3427
059c38: stxdw [r10 - 0x30], r1
059c40: lddw r1, -0x6c5e9a281e0922fa
059c50: stxdw [r10 - 0x38], r1
059c58: mov64 r1, r10
059c60: add64 r1, -0x160
059c68: mov64 r2, r10
059c70: add64 r2, -0x38
059c78: mov64 r3, r9
059c80: call 0x27828 ; direct target 0x195dc8
059c88: ldxdw r1, [r10 - 0x158]
059c90: stxdw [r10 - 0x50], r1
059c98: ldxdw r1, [r10 - 0x150]
059ca0: stxdw [r10 - 0x48], r1
059ca8: ldxdw r1, [r10 - 0x148]
059cb0: stxdw [r10 - 0x40], r1
059cb8: ldxdw r7, [r10 - 0x160]
059cc0: lddw r1, -0x8000000000000000
059cd0: jeq r7, r1, +0x1 ; branch 0x59ce0
059cd8: ja +0x59 ; branch 0x59fa8
059ce0: mov64 r1, r10
059ce8: add64 r1, -0x1a0
059cf0: mov64 r2, r10
059cf8: add64 r2, -0x50
059d00: call 0x283d6 ; direct target 0x19bbb8
059d08: ldxdw r2, [r10 - 0x198]
059d10: ldxdw r1, [r10 - 0x1a0]
059d18: ldxdw r0, [r10 - 0x1a8]
059d20: ja +0x3e ; branch 0x59f18
059d28: ldxdw r1, [r10 - 0xa8]
059d30: stxdw [r10 - 0x8], r1
059d38: ldxdw r1, [r10 - 0xb0]
059d40: stxdw [r10 - 0x10], r1
059d48: ldxdw r1, [r10 - 0xb8]
059d50: stxdw [r10 - 0x18], r1
059d58: mov64 r1, r10
059d60: add64 r1, -0x180
059d68: mov64 r2, r10
059d70: add64 r2, -0x18
059d78: call 0x283c7 ; direct target 0x19bbb8
059d80: ldxdw r2, [r10 - 0x178]
059d88: ldxdw r3, [r10 - 0x150]
059d90: ldxdw r1, [r10 - 0x180]
059d98: ldxdw r4, [r10 - 0x158]
059da0: ldxdw r5, [r4 + 0x0]
059da8: add64 r5, -0x1
059db0: stxdw [r4 + 0x0], r5
059db8: jne r5, 0x0, +0x3 ; branch 0x59dd8
059dc0: ldxdw r5, [r4 + 0x8]
059dc8: add64 r5, -0x1
059dd0: stxdw [r4 + 0x8], r5
059dd8: ldxdw r4, [r3 + 0x0]
059de0: add64 r4, -0x1
059de8: stxdw [r3 + 0x0], r4
059df0: ldxdw r0, [r10 - 0x1a8]
059df8: jne r4, 0x0, +0x3 ; branch 0x59e18
059e00: ldxdw r4, [r3 + 0x8]
059e08: add64 r4, -0x1
059e10: stxdw [r3 + 0x8], r4
059e18: ldxdw r3, [r10 - 0x120]
059e20: ldxdw r4, [r10 - 0x128]
059e28: ldxdw r5, [r4 + 0x0]
059e30: add64 r5, -0x1
059e38: stxdw [r4 + 0x0], r5
059e40: jne r5, 0x0, +0x3 ; branch 0x59e60
059e48: ldxdw r5, [r4 + 0x8]
059e50: add64 r5, -0x1
059e58: stxdw [r4 + 0x8], r5
059e60: ldxdw r4, [r3 + 0x0]
059e68: add64 r4, -0x1
059e70: stxdw [r3 + 0x0], r4
059e78: jne r4, 0x0, +0x3 ; branch 0x59e98
059e80: ldxdw r4, [r3 + 0x8]
059e88: add64 r4, -0x1
059e90: stxdw [r3 + 0x8], r4
059e98: ldxdw r3, [r10 - 0xf0]
059ea0: ldxdw r4, [r10 - 0xf8]
059ea8: ldxdw r5, [r4 + 0x0]
059eb0: add64 r5, -0x1
059eb8: stxdw [r4 + 0x0], r5
059ec0: jne r5, 0x0, +0x3 ; branch 0x59ee0
059ec8: ldxdw r5, [r4 + 0x8]
059ed0: add64 r5, -0x1
059ed8: stxdw [r4 + 0x8], r5
059ee0: ldxdw r4, [r3 + 0x0]
059ee8: add64 r4, -0x1
059ef0: stxdw [r3 + 0x0], r4
059ef8: jne r4, 0x0, +0x3 ; branch 0x59f18
059f00: ldxdw r4, [r3 + 0x8]
059f08: add64 r4, -0x1
059f10: stxdw [r3 + 0x8], r4
059f18: ldxdw r3, [r6 + 0x0]
059f20: add64 r3, -0x1
059f28: stxdw [r6 + 0x0], r3
059f30: jne r3, 0x0, +0x3 ; branch 0x59f50
059f38: ldxdw r3, [r6 + 0x8]
059f40: add64 r3, -0x1
059f48: stxdw [r6 + 0x8], r3
059f50: ldxdw r3, [r0 + 0x0]
059f58: add64 r3, -0x1
059f60: stxdw [r0 + 0x0], r3
059f68: ldxdw r8, [r10 - 0x1e0]
059f70: jne r3, 0x0, +0x3 ; branch 0x59f90
059f78: ldxdw r3, [r0 + 0x8]
059f80: add64 r3, -0x1
059f88: stxdw [r0 + 0x8], r3
059f90: stxdw [r8 + 0x8], r2
059f98: stxdw [r8 + 0x0], r1
059fa0: exit
059fa8: mov64 r1, r10
059fb0: add64 r1, -0x80
059fb8: mov64 r2, r10
059fc0: add64 r2, -0x140
059fc8: mov64 r3, 0x30
059fd0: call 0x2b2c7 ; direct target 0x1b3610
059fd8: stxdw [r10 - 0xa0], r7
059fe0: ldxdw r1, [r10 - 0x50]
059fe8: stxdw [r10 - 0x98], r1
059ff0: ldxdw r1, [r10 - 0x48]
059ff8: stxdw [r10 - 0x90], r1
05a000: ldxdw r1, [r10 - 0x40]
05a008: stxdw [r10 - 0x88], r1
05a010: ldxdw r1, [r10 - 0x1d8]
05a018: stxb [r10 - 0x136], r1
05a020: ldxdw r1, [r10 - 0x1d0]
05a028: stxb [r10 - 0x137], r1
05a030: ldxdw r1, [r10 - 0x1c8]
05a038: stxb [r10 - 0x138], r1
05a040: ldxdw r1, [r10 - 0x1c0]
05a048: stxdw [r10 - 0x140], r1
05a050: ldxdw r1, [r10 - 0x1b8]
05a058: stxdw [r10 - 0x148], r1
05a060: ldxdw r1, [r10 - 0x1a8]
05a068: stxdw [r10 - 0x150], r1
05a070: stxdw [r10 - 0x158], r6
05a078: stxdw [r10 - 0x160], r9
05a080: mov64 r1, r10
05a088: add64 r1, -0xb8
05a090: mov64 r2, r10
05a098: add64 r2, -0xa0
05a0a0: mov64 r3, r10
05a0a8: add64 r3, -0x160
05a0b0: mov64 r4, 0x1
05a0b8: call 0x28c89 ; direct target 0x1a0508
05a0c0: lddw r1, -0x7fffffffffffffe6
05a0d0: ldxdw r2, [r10 - 0xb8]
05a0d8: ldxdw r8, [r10 - 0x1e0]
05a0e0: jne r2, r1, +0x11 ; branch 0x5a170
05a0e8: ldxdw r1, [r6 + 0x0]
05a0f0: add64 r1, -0x1
05a0f8: stxdw [r6 + 0x0], r1
05a100: jne r1, 0x0, +0x3 ; branch 0x5a120
05a108: ldxdw r1, [r6 + 0x8]
05a110: add64 r1, -0x1
05a118: stxdw [r6 + 0x8], r1
05a120: ldxdw r2, [r10 - 0x1a8]
05a128: ldxdw r1, [r2 + 0x0]
05a130: add64 r1, -0x1
05a138: stxdw [r2 + 0x0], r1
05a140: jne r1, 0x0, +0x3 ; branch 0x5a160
05a148: ldxdw r1, [r2 + 0x8]
05a150: add64 r1, -0x1
05a158: stxdw [r2 + 0x8], r1
05a160: mov64 r1, 0x2
05a168: ja -0x3c ; branch 0x59f90
05a170: ldxdw r1, [r10 - 0xa8]
05a178: stxdw [r10 - 0x8], r1
05a180: ldxdw r1, [r10 - 0xb0]
05a188: stxdw [r10 - 0x10], r1
05a190: ldxdw r1, [r10 - 0xb8]
05a198: stxdw [r10 - 0x18], r1
05a1a0: mov64 r1, r10
05a1a8: add64 r1, -0x190
05a1b0: mov64 r2, r10
05a1b8: add64 r2, -0x18
05a1c0: call 0x2833e ; direct target 0x19bbb8
05a1c8: ldxdw r2, [r10 - 0x188]
05a1d0: ldxdw r1, [r10 - 0x190]
05a1d8: ldxdw r3, [r10 - 0x150]
05a1e0: ldxdw r4, [r10 - 0x158]
05a1e8: ldxdw r5, [r4 + 0x0]
05a1f0: add64 r5, -0x1
05a1f8: stxdw [r4 + 0x0], r5
05a200: jne r5, 0x0, +0x3 ; branch 0x5a220
05a208: ldxdw r5, [r4 + 0x8]
05a210: add64 r5, -0x1
05a218: stxdw [r4 + 0x8], r5
05a220: ldxdw r4, [r3 + 0x0]
05a228: add64 r4, -0x1
05a230: stxdw [r3 + 0x0], r4
05a238: jne r4, 0x0, -0x56 ; branch 0x59f90
05a240: ldxdw r4, [r3 + 0x8]
05a248: add64 r4, -0x1
05a250: stxdw [r3 + 0x8], r4
05a258: ja -0x5a ; branch 0x59f90
