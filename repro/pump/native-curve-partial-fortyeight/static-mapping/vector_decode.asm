011758: mov64 r6, r1
011760: ldxdw r8, [r2 + 0x8]
011768: jlt r8, 0x4, +0x24 ; branch 0x11890
011770: add64 r8, -0x4
011778: ldxdw r9, [r2 + 0x0]
011780: ldxw r1, [r9 + 0x0]
011788: stxdw [r2 + 0x8], r8
011790: add64 r9, 0x4
011798: stxdw [r2 + 0x0], r9
0117a0: jeq r1, 0x0, +0xa4 ; branch 0x11cc8
0117a8: stxdw [r10 - 0x40], r6
0117b0: mov64 r3, r1
0117b8: jlt r1, 0x100000, +0x1 ; branch 0x117c8
0117c0: mov64 r3, 0x100000
0117c8: stxdw [r10 - 0x30], r1
0117d0: stxdw [r10 - 0x20], r9
0117d8: lddw r1, 0x300000000
0117e8: ldxdw r1, [r1 + 0x0]
0117f0: lddw r4, 0x300008000
011800: jeq r1, 0x0, +0x1 ; branch 0x11810
011808: mov64 r4, r1
011810: mov64 r1, r4
011818: sub64 r1, r3
011820: mov64 r6, 0x0
011828: mov64 r5, 0x1
011830: jgt r1, r4, +0x1 ; branch 0x11840
011838: mov64 r5, 0x0
011840: jne r5, 0x0, +0x1 ; branch 0x11850
011848: mov64 r6, r1
011850: stxdw [r10 - 0x38], r2
011858: lddw r2, 0x300000007
011868: mov64 r1, r6
011870: jgt r1, r2, +0xb ; branch 0x118d0
011878: mov64 r1, 0x1
011880: mov64 r2, r3
011888: call 0x33321 ; direct target 0x1ab198
011890: lddw r1, 0x1bd820 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x87_\x1b\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
0118a0: call 0x32eb7 ; direct target 0x1a8e60
0118a8: stxdw [r6 + 0x8], r0
0118b0: lddw r1, -0x8000000000000000
0118c0: stxdw [r6 + 0x0], r1
0118c8: ja +0xd4 ; branch 0x11f70
0118d0: lddw r2, 0x300000000
0118e0: stxdw [r2 + 0x0], r1
0118e8: mov64 r7, 0x0
0118f0: mov64 r2, 0x0
0118f8: mov64 r9, r3
011900: call 0x343a9 ; direct target 0x1b3650
011908: mov64 r0, r6
011910: mov64 r4, r9
011918: stxdw [r10 - 0x8], r4
011920: stxdw [r10 - 0x18], r4
011928: stxdw [r10 - 0x10], r0
011930: ldxdw r5, [r10 - 0x38]
011938: ldxdw r3, [r10 - 0x20]
011940: ldxdw r6, [r10 - 0x30]
011948: ja +0x5 ; branch 0x11978
011950: and64 r2, 0x1
011958: jne r2, 0x0, +0xc3 ; branch 0x11f78
011960: mov64 r7, r1
011968: jlt r1, r6, +0x1 ; branch 0x11978
011970: ja +0x5d ; branch 0x11c60
011978: jne r7, r4, +0x2a ; branch 0x11ad0
011980: mov64 r9, r4
011988: lsh64 r9, 0x1
011990: jlt r9, r6, +0x1 ; branch 0x119a0
011998: mov64 r9, r6
0119a0: jle r9, r4, +0x23 ; branch 0x11ac0
0119a8: sub64 r9, r4
0119b0: ldxdw r1, [r10 - 0x18]
0119b8: sub64 r1, r4
0119c0: jge r1, r9, +0xb ; branch 0x11a20
0119c8: mov64 r1, r10
0119d0: add64 r1, -0x18
0119d8: mov64 r2, r4
0119e0: mov64 r6, r3
0119e8: mov64 r3, r9
0119f0: call -0x765 ; direct target 0xded0
0119f8: mov64 r3, r6
011a00: ldxdw r6, [r10 - 0x30]
011a08: ldxdw r5, [r10 - 0x38]
011a10: ldxdw r0, [r10 - 0x10]
011a18: ldxdw r4, [r10 - 0x8]
011a20: mov64 r1, r0
011a28: add64 r1, r4
011a30: jlt r9, 0x2, +0xe ; branch 0x11aa8
011a38: add64 r9, -0x1
011a40: mov64 r2, 0x0
011a48: stxdw [r10 - 0x20], r3
011a50: mov64 r3, r9
011a58: stxdw [r10 - 0x28], r4
011a60: mov64 r6, r0
011a68: call 0x3437c ; direct target 0x1b3650
011a70: ldxdw r4, [r10 - 0x28]
011a78: ldxdw r3, [r10 - 0x20]
011a80: ldxdw r5, [r10 - 0x38]
011a88: add64 r4, r9
011a90: add64 r6, r4
011a98: mov64 r1, r6
011aa0: ldxdw r6, [r10 - 0x30]
011aa8: stb [r1 + 0x0], 0x0
011ab0: add64 r4, 0x1
011ab8: mov64 r9, r4
011ac0: stxdw [r10 - 0x8], r9
011ac8: mov64 r4, r9
011ad0: jge r4, r7, +0x5 ; branch 0x11b00
011ad8: mov64 r1, r7
011ae0: mov64 r2, r4
011ae8: lddw r3, 0x1bd8c0 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00\x006\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00\x15\x00\x00\x00\x00\x00\x00\x00N`\x1b\x00\x1d\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00p`\x1b\x00h\x00\x00\x00\x00\x00\x00\x00Y\x02\x00\x000\x00\x00\x00\x00\x00\x00\x00\xd8`\x1b\x00U\x00\x00\x00'
011af8: call 0x33d36 ; direct target 0x1b04b0
011b00: mov64 r9, r4
011b08: sub64 r9, r7
011b10: jlt r9, r8, +0x1 ; branch 0x11b20
011b18: mov64 r9, r8
011b20: ldxdw r0, [r10 - 0x10]
011b28: mov64 r1, r0
011b30: add64 r1, r7
011b38: jne r9, 0x1, +0xc ; branch 0x11ba0
011b40: ldxb r2, [r3 + 0x0]
011b48: stxb [r1 + 0x0], r2
011b50: add64 r8, -0x1
011b58: stxdw [r5 + 0x8], r8
011b60: add64 r3, 0x1
011b68: stxdw [r5 + 0x0], r3
011b70: mov64 r1, r7
011b78: add64 r1, r9
011b80: mov64 r2, 0x1
011b88: jlt r1, r7, -0x48 ; branch 0x11950
011b90: mov64 r2, 0x0
011b98: ja -0x4a ; branch 0x11950
011ba0: mov64 r2, r3
011ba8: stxdw [r10 - 0x28], r8
011bb0: stxdw [r10 - 0x20], r3
011bb8: mov64 r3, r9
011bc0: mov64 r6, r4
011bc8: mov64 r8, r0
011bd0: call 0x34347 ; direct target 0x1b3610
011bd8: mov64 r0, r8
011be0: mov64 r4, r6
011be8: ldxdw r3, [r10 - 0x20]
011bf0: ldxdw r8, [r10 - 0x28]
011bf8: ldxdw r6, [r10 - 0x30]
011c00: ldxdw r5, [r10 - 0x38]
011c08: sub64 r8, r9
011c10: stxdw [r5 + 0x8], r8
011c18: add64 r3, r9
011c20: stxdw [r5 + 0x0], r3
011c28: jne r9, 0x0, -0x18 ; branch 0x11b70
011c30: mov64 r1, 0x14
011c38: lddw r2, 0x1b6034 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'Unexpected length of inputInvalid bool representation: Error/home/runner/work/platform-tools/platfor'
011c48: mov64 r3, 0x1a
011c50: call -0xf55 ; direct target 0xa1b0
011c58: ja +0x7 ; branch 0x11c98
011c60: ldxdw r1, [r10 - 0x18]
011c68: lddw r2, -0x8000000000000000
011c78: jeq r1, r2, +0xd ; branch 0x11ce8
011c80: lddw r2, -0x7fffffffffffffff
011c90: jne r1, r2, +0x48 ; branch 0x11ed8
011c98: lddw r1, -0x8000000000000000
011ca8: ldxdw r2, [r10 - 0x40]
011cb0: stxdw [r2 + 0x0], r1
011cb8: stxdw [r2 + 0x8], r0
011cc0: ja +0x55 ; branch 0x11f70
011cc8: stdw [r6 + 0x10], 0x0
011cd0: stdw [r6 + 0x8], 0x1
011cd8: stdw [r6 + 0x0], 0x0
011ce0: ja +0x51 ; branch 0x11f70
011ce8: mov64 r9, r3
011cf0: lddw r1, 0x300000000
011d00: ldxdw r1, [r1 + 0x0]
011d08: lddw r3, 0x300008000
011d18: jeq r1, 0x0, +0x1 ; branch 0x11d28
011d20: mov64 r3, r1
011d28: mov64 r2, r6
011d30: jlt r6, 0x1000, +0x1 ; branch 0x11d40
011d38: mov64 r2, 0x1000
011d40: mov64 r4, 0x1
011d48: jgt r2, 0x1, +0x1 ; branch 0x11d58
011d50: mov64 r2, 0x1
011d58: mov64 r0, r3
011d60: sub64 r0, r2
011d68: mov64 r1, 0x0
011d70: jgt r0, r3, +0x1 ; branch 0x11d80
011d78: mov64 r4, 0x0
011d80: jne r4, 0x0, +0x1 ; branch 0x11d90
011d88: mov64 r1, r0
011d90: lddw r3, 0x300000008
011da0: jlt r1, r3, +0x3d ; branch 0x11f90
011da8: lddw r3, 0x300000000
011db8: stxdw [r3 + 0x0], r1
011dc0: stxdw [r10 - 0x18], r2
011dc8: mov64 r6, 0x0
011dd0: stxdw [r10 - 0x10], r1
011dd8: add64 r8, -0x1
011de0: stdw [r10 - 0x8], 0x0
011de8: mov64 r3, r9
011df0: ja +0xc ; branch 0x11e58
011df8: mov64 r2, r1
011e00: add64 r2, r6
011e08: stxb [r2 + 0x0], r7
011e10: add64 r8, -0x1
011e18: add64 r6, 0x1
011e20: stxdw [r10 - 0x8], r6
011e28: mov64 r2, r6
011e30: lsh64 r2, 0x20
011e38: rsh64 r2, 0x20
011e40: ldxdw r4, [r10 - 0x30]
011e48: jlt r2, r4, +0x1 ; branch 0x11e58
011e50: ja +0x1c ; branch 0x11f38
011e58: jeq r8, -0x1, +0x13 ; branch 0x11ef8
011e60: mov64 r2, r3
011e68: add64 r2, r6
011e70: ldxb r7, [r2 + 0x0]
011e78: stxdw [r5 + 0x8], r8
011e80: add64 r2, 0x1
011e88: stxdw [r5 + 0x0], r2
011e90: ldxdw r2, [r10 - 0x18]
011e98: jne r6, r2, -0x15 ; branch 0x11df8
011ea0: mov64 r1, r10
011ea8: add64 r1, -0x18
011eb0: call -0x6f4 ; direct target 0xe718
011eb8: mov64 r3, r9
011ec0: ldxdw r5, [r10 - 0x38]
011ec8: ldxdw r1, [r10 - 0x10]
011ed0: ja -0x1c ; branch 0x11df8
011ed8: ldxdw r2, [r10 - 0x40]
011ee0: stxdw [r2 + 0x10], r4
011ee8: stxdw [r2 + 0x8], r0
011ef0: ja +0xe ; branch 0x11f68
011ef8: lddw r1, 0x1bd820 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00\x87_\x1b\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00X\xd2\x00\x00\x00\x00\x00\x00@\xd2\x00\x00\x00\x00\x00\x00X\xac\x00\x00\x00\x00\x00\x00\xf8\xae\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
011f08: call 0x32dea ; direct target 0x1a8e60
011f10: ldxdw r2, [r10 - 0x40]
011f18: stxdw [r2 + 0x8], r0
011f20: lddw r1, -0x8000000000000000
011f30: ja +0x6 ; branch 0x11f68
011f38: ldxdw r1, [r10 - 0x8]
011f40: ldxdw r2, [r10 - 0x40]
011f48: stxdw [r2 + 0x10], r1
011f50: ldxdw r1, [r10 - 0x10]
011f58: stxdw [r2 + 0x8], r1
011f60: ldxdw r1, [r10 - 0x18]
011f68: stxdw [r2 + 0x0], r1
011f70: exit
011f78: lddw r1, 0x1bd8d8 ; relocation {'type': 8, 'symbol': ''} ; referenced bytes b'\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00\x00\x00\x00\x00\xa9\x00\x00\x00\x15\x00\x00\x00\x00\x00\x00\x00N`\x1b\x00\x1d\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00p`\x1b\x00h\x00\x00\x00\x00\x00\x00\x00Y\x02\x00\x000\x00\x00\x00\x00\x00\x00\x00\xd8`\x1b\x00U\x00\x00\x00\x00\x00\x00\x00(\x0c\x00\x00\r\x00\x00\x00\x00\x00\x00\x00z_\x1b\x00\r\x00\x00\x00'
011f88: call 0x3405f ; direct target 0x1b2288
011f90: mov64 r1, 0x1
011f98: call 0x3323f ; direct target 0x1ab198
