    d898: bf 17 00 00 00 00 00 00      	mov64 r7, r1
    d8a0: 79 78 08 00 00 00 00 00      	ldxdw r8, [r7 + 0x8]
    d8a8: 79 86 a8 01 00 00 00 00      	ldxdw r6, [r8 + 0x1a8]
    d8b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    d8b8: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
    d8c0: 85 10 00 00 e1 22 01 00      	call 0x122e1 ; target 0x9efd0
    d8c8: 61 a1 b0 fe 00 00 00 00      	ldxw r1, [r10 - 0x150]
    d8d0: 15 01 99 02 01 00 00 00      	jeq r1, 0x1, +0x299 <.text+0xec80>
    d8d8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
    d8e0: dd 16 2a 00 00 00 00 00      	jsle r6, r1, +0x2a <.text+0xd918>
    d8e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    d8f0: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
    d8f8: 18 02 00 00 60 d0 0a 00 00 00 00 00 00 00 00 00      	lddw r2, 0xad060
    d908: 85 10 00 00 b8 41 00 00      	call 0x41b8 ; target 0x2e6d0
    d910: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
    d918: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
    d920: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
    d928: 18 01 00 00 38 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1238
    d938: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
    d940: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    d948: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
    d950: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
    d958: 18 01 00 00 20 00 00 e0 00 00 00 00 00 00 00 00      	lddw r1, 0xe0000020
    d968: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
    d970: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    d978: 07 02 00 00 c8 ff ff ff      	add64 r2, -0x38
    d980: 18 01 00 00 60 d0 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad060
    d990: 85 10 00 00 88 44 00 00      	call 0x4488 ; target 0x2fdd8
    d998: 55 00 8c 02 00 00 00 00      	jne r0, 0x0, +0x28c <.text+0xece0>
    d9a0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
    d9a8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
    d9b0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
    d9b8: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
    d9c0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
    d9c8: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
    d9d0: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
    d9d8: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
    d9e0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
    d9e8: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
    d9f0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
    d9f8: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
    da00: 18 01 00 00 c4 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad4c4 ; data 'programs/mayhem-program/src/instructions/burn.rscalled `Result::unwrap()` on an `Err` valueAccount already has'
    da10: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
    da18: 62 0a 48 ff 75 17 00 00      	stw [r10 - 0xb8], 0x1775
    da20: 72 0a 00 ff 02 00 00 00      	stb [r10 - 0x100], 0x2
    da28: 62 0a c8 fe 4e 00 00 00      	stw [r10 - 0x138], 0x4e
    da30: 05 00 2b 00 00 00 00 00      	ja +0x2b <.text+0xda70>
    da38: 71 81 c0 01 00 00 00 00      	ldxb r1, [r8 + 0x1c0]
    da40: 55 01 2f 00 02 00 00 00      	jne r1, 0x2, +0x2f <.text+0xdaa0>
    da48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    da50: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
    da58: 18 02 00 00 5c d0 0a 00 00 00 00 00 00 00 00 00      	lddw r2, 0xad05c
    da68: 85 10 00 00 8c 41 00 00      	call 0x418c ; target 0x2e6d0
    da70: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
    da78: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
    da80: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
    da88: 18 01 00 00 38 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1238
    da98: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
    daa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    daa8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
    dab0: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
    dab8: 18 01 00 00 20 00 00 e0 00 00 00 00 00 00 00 00      	lddw r1, 0xe0000020
    dac8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
    dad0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    dad8: 07 02 00 00 c8 ff ff ff      	add64 r2, -0x38
    dae0: 18 01 00 00 5c d0 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad05c
    daf0: 85 10 00 00 5c 44 00 00      	call 0x445c ; target 0x2fdd8
    daf8: 55 00 60 02 00 00 00 00      	jne r0, 0x0, +0x260 <.text+0xece0>
    db00: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
    db08: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
    db10: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
    db18: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
    db20: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
    db28: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
    db30: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
    db38: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
    db40: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
    db48: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
    db50: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
    db58: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
    db60: 18 01 00 00 c4 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad4c4 ; data 'programs/mayhem-program/src/instructions/burn.rscalled `Result::unwrap()` on an `Err` valueAccount already has'
    db70: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
    db78: 62 0a 48 ff 74 17 00 00      	stw [r10 - 0xb8], 0x1774
    db80: 72 0a 00 ff 02 00 00 00      	stb [r10 - 0x100], 0x2
    db88: 62 0a c8 fe 52 00 00 00      	stw [r10 - 0x138], 0x52
    db90: 7a 0a c0 fe 30 00 00 00      	stdw [r10 - 0x140], 0x30
    db98: 7a 0a b0 fe 00 00 00 00      	stdw [r10 - 0x150], 0x0
    dba0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    dba8: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
    dbb0: 85 10 00 00 9e 13 01 00      	call 0x1139e ; target 0x978a8
    dbb8: 95 00 00 00 00 00 00 00      	exit
    dbc0: 79 81 e8 00 00 00 00 00      	ldxdw r1, [r8 + 0xe8]
    dbc8: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
    dbd0: 79 81 f8 01 00 00 00 00      	ldxdw r1, [r8 + 0x1f8]
    dbd8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    dbe0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
    dbe8: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
    dbf0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
    dbf8: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
    dc00: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    dc08: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
    dc10: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    dc18: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
    dc20: 79 82 58 00 00 00 00 00      	ldxdw r2, [r8 + 0x58]
    dc28: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
    dc30: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
    dc38: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    dc40: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    dc48: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xdb38>
    dc50: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    dc58: 79 25 00 00 00 00 00 00      	ldxdw r5, [r2 + 0x0]
    dc60: 7b 5a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r5
    dc68: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
    dc70: 15 03 24 02 01 00 00 00      	jeq r3, 0x1, +0x224 <.text+0xec78>
    dc78: 79 20 10 00 00 00 00 00      	ldxdw r0, [r2 + 0x10]
    dc80: 79 01 00 00 00 00 00 00      	ldxdw r1, [r0 + 0x0]
    dc88: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    dc90: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    dc98: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xdb88>
    dca0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    dca8: 7b 10 00 00 00 00 00 00      	stxdw [r0 + 0x0], r1
    dcb0: 15 03 1c 02 01 00 00 00      	jeq r3, 0x1, +0x21c <.text+0xec78>
    dcb8: 79 86 a0 00 00 00 00 00      	ldxdw r6, [r8 + 0xa0]
    dcc0: 79 65 08 00 00 00 00 00      	ldxdw r5, [r6 + 0x8]
    dcc8: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
    dcd0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    dcd8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    dce0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xdbd0>
    dce8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    dcf0: 71 29 2a 00 00 00 00 00      	ldxb r9, [r2 + 0x2a]
    dcf8: 7b 9a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r9
    dd00: 71 29 29 00 00 00 00 00      	ldxb r9, [r2 + 0x29]
    dd08: 7b 9a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r9
    dd10: 71 29 28 00 00 00 00 00      	ldxb r9, [r2 + 0x28]
    dd18: 7b 9a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r9
    dd20: 79 29 20 00 00 00 00 00      	ldxdw r9, [r2 + 0x20]
    dd28: 7b 9a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r9
    dd30: 79 22 18 00 00 00 00 00      	ldxdw r2, [r2 + 0x18]
    dd38: 79 69 00 00 00 00 00 00      	ldxdw r9, [r6 + 0x0]
    dd40: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
    dd48: 15 03 09 02 01 00 00 00      	jeq r3, 0x1, +0x209 <.text+0xec78>
    dd50: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
    dd58: 7b 5a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r5
    dd60: 79 65 10 00 00 00 00 00      	ldxdw r5, [r6 + 0x10]
    dd68: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
    dd70: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    dd78: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
    dd80: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xdc70>
    dd88: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
    dd90: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
    dd98: 15 02 ff 01 01 00 00 00      	jeq r2, 0x1, +0x1ff <.text+0xec78>
    dda0: 7b 0a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r0
    dda8: 7b 8a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r8
    ddb0: 79 88 c8 01 00 00 00 00      	ldxdw r8, [r8 + 0x1c8]
    ddb8: 79 80 08 00 00 00 00 00      	ldxdw r0, [r8 + 0x8]
    ddc0: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
    ddc8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
    ddd0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    ddd8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xdcc8>
    dde0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    dde8: 71 61 2a 00 00 00 00 00      	ldxb r1, [r6 + 0x2a]
    ddf0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
    ddf8: 71 61 29 00 00 00 00 00      	ldxb r1, [r6 + 0x29]
    de00: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
    de08: 71 61 28 00 00 00 00 00      	ldxb r1, [r6 + 0x28]
    de10: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
    de18: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
    de20: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
    de28: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
    de30: 79 86 00 00 00 00 00 00      	ldxdw r6, [r8 + 0x0]
    de38: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
    de40: 15 03 ea 01 01 00 00 00      	jeq r3, 0x1, +0x1ea <.text+0xec78>
    de48: 7b 6a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r6
    de50: 79 82 10 00 00 00 00 00      	ldxdw r2, [r8 + 0x10]
    de58: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
    de60: 07 03 00 00 01 00 00 00      	add64 r3, 0x1
    de68: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
    de70: 15 03 01 00 00 00 00 00      	jeq r3, 0x0, +0x1 <.text+0xdd60>
    de78: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
    de80: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
    de88: 15 06 e1 01 01 00 00 00      	jeq r6, 0x1, +0x1e1 <.text+0xec78>
    de90: 79 83 18 00 00 00 00 00      	ldxdw r3, [r8 + 0x18]
    de98: 79 86 20 00 00 00 00 00      	ldxdw r6, [r8 + 0x20]
    dea0: 7b 5a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r5
    dea8: 7b 9a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r9
    deb0: 71 89 28 00 00 00 00 00      	ldxb r9, [r8 + 0x28]
    deb8: bf 15 00 00 00 00 00 00      	mov64 r5, r1
    dec0: 71 81 29 00 00 00 00 00      	ldxb r1, [r8 + 0x29]
    dec8: 71 88 2a 00 00 00 00 00      	ldxb r8, [r8 + 0x2a]
    ded0: 71 77 21 00 00 00 00 00      	ldxb r7, [r7 + 0x21]
    ded8: 7b 4a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r4
    dee0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
    dee8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
    def0: 7b 4a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r4
    def8: 18 04 00 00 a9 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r4, 0xad4a9
    df08: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
    df10: 73 7a ff ff 00 00 00 00      	stxb [r10 - 0x1], r7
    df18: bf a4 00 00 00 00 00 00      	mov64 r4, r10
    df20: 07 04 00 00 c8 ff ff ff      	add64 r4, -0x38
    df28: 7b 4a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r4
    df30: 73 8a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r8
    df38: 73 1a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r1
    df40: 73 9a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r9
    df48: 7b 6a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r6
    df50: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
    df58: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
    df60: 7b 0a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r0
    df68: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
    df70: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
    df78: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
    df80: 73 1a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r1
    df88: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
    df90: 73 1a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r1
    df98: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
    dfa0: 73 1a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r1
    dfa8: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
    dfb0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
    dfb8: 7b 5a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r5
    dfc0: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
    dfc8: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
    dfd0: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
    dfd8: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
    dfe0: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
    dfe8: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
    dff0: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
    dff8: 73 1a f2 fe 00 00 00 00      	stxb [r10 - 0x10e], r1
    e000: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
    e008: 73 1a f1 fe 00 00 00 00      	stxb [r10 - 0x10f], r1
    e010: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
    e018: 73 1a f0 fe 00 00 00 00      	stxb [r10 - 0x110], r1
    e020: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
    e028: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
    e030: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
    e038: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
    e040: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
    e048: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
    e050: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
    e058: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
    e060: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
    e068: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
    e070: 7a 0a e0 ff 01 00 00 00      	stdw [r10 - 0x20], 0x1
    e078: 7a 0a d0 ff 09 00 00 00      	stdw [r10 - 0x30], 0x9
    e080: 7a 0a 90 ff 02 00 00 00      	stdw [r10 - 0x70], 0x2
    e088: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    e090: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
    e098: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
    e0a0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
    e0a8: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
    e0b0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
    e0b8: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
    e0c0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
    e0c8: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
    e0d0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
    e0d8: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
    e0e0: 7a 0a c0 fe 00 00 00 00      	stdw [r10 - 0x140], 0x0
    e0e8: 7a 0a b8 fe 08 00 00 00      	stdw [r10 - 0x148], 0x8
    e0f0: 7a 0a b0 fe 00 00 00 00      	stdw [r10 - 0x150], 0x0
    e0f8: 7a 0a 60 ff 01 00 00 00      	stdw [r10 - 0xa0], 0x1
    e100: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    e108: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
    e110: 79 a8 a8 fe 00 00 00 00      	ldxdw r8, [r10 - 0x158]
    e118: bf 82 00 00 00 00 00 00      	mov64 r2, r8
    e120: 85 10 00 00 53 05 01 00      	call 0x10553 ; target 0x90bc0
    e128: 55 00 51 ff 02 00 00 00      	jne r0, 0x2, -0xaf <.text+0xda98>
    e130: 79 a7 20 fe 00 00 00 00      	ldxdw r7, [r10 - 0x1e0]
    e138: 7b 87 b8 01 00 00 00 00      	stxdw [r7 + 0x1b8], r8
    e140: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
    e148: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e150: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
    e158: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
    e160: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
    e168: 7b 2a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r2
    e170: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    e178: 7b 2a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r2
    e180: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e188: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
    e190: 79 71 58 01 00 00 00 00      	ldxdw r1, [r7 + 0x158]
    e198: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e1a0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
    e1a8: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
    e1b0: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
    e1b8: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
    e1c0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    e1c8: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
    e1d0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e1d8: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
    e1e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    e1e8: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
    e1f0: 85 10 00 00 bb 21 01 00      	call 0x121bb ; target 0x9efd0
    e1f8: 61 a1 c8 ff 00 00 00 00      	ldxw r1, [r10 - 0x38]
    e200: 15 01 89 01 01 00 00 00      	jeq r1, 0x1, +0x189 <.text+0xed30>
    e208: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
    e210: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
    e218: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
    e220: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
    e228: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
    e230: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
    e238: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
    e240: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
    e248: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
    e250: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
    e258: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
    e260: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
    e268: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
    e270: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
    e278: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
    e280: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
    e288: 79 a6 f0 ff 00 00 00 00      	ldxdw r6, [r10 - 0x10]
    e290: 85 10 00 00 6b ea 00 00      	call 0xea6b ; target 0x835f0
    e298: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
    e2a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    e2b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    e2b8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
    e2c0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
    e2c8: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
    e2d0: bd 21 08 00 00 00 00 00      	jle r1, r2, +0x8 <.text+0xe1f8>
    e2d8: 15 04 09 00 00 00 00 00      	jeq r4, 0x0, +0x9 <.text+0xe208>
    e2e0: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
    e2f0: 55 02 0a 00 00 00 00 00      	jne r2, 0x0, +0xa <.text+0xe228>
    e2f8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
    e308: 2d 21 0b 00 00 00 00 00      	jgt r1, r2, +0xb <.text+0xe248>
    e310: 05 00 ae 00 00 00 00 00      	ja +0xae <.text+0xe768>
    e318: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
    e320: 55 04 f7 ff 00 00 00 00      	jne r4, 0x0, -0x9 <.text+0xe1c0>
    e328: bf 13 00 00 00 00 00 00      	mov64 r3, r1
    e330: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
    e340: 15 02 f6 ff 00 00 00 00      	jeq r2, 0x0, -0xa <.text+0xe1d8>
    e348: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    e350: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
    e360: bd 21 a4 00 00 00 00 00      	jle r1, r2, +0xa4 <.text+0xe768>
    e368: bf a9 00 00 00 00 00 00      	mov64 r9, r10
    e370: 07 09 00 00 d0 fe ff ff      	add64 r9, -0x130
    e378: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
    e388: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
    e390: 7b 81 08 00 00 00 00 00      	stxdw [r1 + 0x8], r8
    e398: 18 02 00 00 21 59 2f 75 00 00 00 00 52 7c ee fa      	lddw r2, -0x51183ad8ad0a6df
    e3a8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
    e3b0: 79 a2 b0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x150]
    e3b8: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
    e3c0: 79 a2 b8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x148]
    e3c8: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
    e3d0: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
    e3d8: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
    e3e0: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
    e3e8: 7b 21 28 00 00 00 00 00      	stxdw [r1 + 0x28], r2
    e3f0: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
    e3f8: 7b 21 30 00 00 00 00 00      	stxdw [r1 + 0x30], r2
    e400: 79 92 08 00 00 00 00 00      	ldxdw r2, [r9 + 0x8]
    e408: 7b 21 38 00 00 00 00 00      	stxdw [r1 + 0x38], r2
    e410: 79 92 10 00 00 00 00 00      	ldxdw r2, [r9 + 0x10]
    e418: 7b 21 40 00 00 00 00 00      	stxdw [r1 + 0x40], r2
    e420: 79 92 18 00 00 00 00 00      	ldxdw r2, [r9 + 0x18]
    e428: 7b 21 48 00 00 00 00 00      	stxdw [r1 + 0x48], r2
    e430: 7b 61 50 00 00 00 00 00      	stxdw [r1 + 0x50], r6
    e438: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
    e440: 7a 0a d0 ff 58 00 00 00      	stdw [r10 - 0x30], 0x58
    e448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    e450: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
    e458: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
    e460: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
    e468: 85 10 00 00 ad 16 01 00      	call 0x116ad ; target 0x999d8
    e470: 79 71 00 02 00 00 00 00      	ldxdw r1, [r7 + 0x200]
    e478: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
    e480: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
    e488: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
    e490: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xe380>
    e498: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
    e4a0: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
    e4a8: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
    e4b0: 15 06 1c 01 01 00 00 00      	jeq r6, 0x1, +0x11c <.text+0xec78>
    e4b8: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
    e4c0: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
    e4c8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
    e4d0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    e4d8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xe3c8>
    e4e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    e4e8: 7b 4a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r4
    e4f0: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
    e4f8: 15 03 13 01 01 00 00 00      	jeq r3, 0x1, +0x113 <.text+0xec78>
    e500: 7b 5a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r5
    e508: 71 12 2a 00 00 00 00 00      	ldxb r2, [r1 + 0x2a]
    e510: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
    e518: 71 12 29 00 00 00 00 00      	ldxb r2, [r1 + 0x29]
    e520: 7b 2a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r2
    e528: 71 12 28 00 00 00 00 00      	ldxb r2, [r1 + 0x28]
    e530: 7b 2a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r2
    e538: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
    e540: 7b 2a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r2
    e548: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
    e550: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
    e558: 79 71 58 00 00 00 00 00      	ldxdw r1, [r7 + 0x58]
    e560: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e568: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
    e570: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
    e578: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
    e580: 7b 2a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r2
    e588: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    e590: 7b 2a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r2
    e598: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e5a0: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
    e5a8: 79 71 58 01 00 00 00 00      	ldxdw r1, [r7 + 0x158]
    e5b0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e5b8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
    e5c0: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
    e5c8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
    e5d0: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
    e5d8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
    e5e0: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
    e5e8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e5f0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
    e5f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
    e600: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
    e608: 85 10 00 00 38 21 01 00      	call 0x12138 ; target 0x9efd0
    e610: 61 a1 c8 ff 00 00 00 00      	ldxw r1, [r10 - 0x38]
    e618: 15 01 12 01 01 00 00 00      	jeq r1, 0x1, +0x112 <.text+0xed90>
    e620: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
    e628: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
    e630: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
    e638: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
    e640: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
    e648: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
    e650: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
    e658: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
    e660: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
    e668: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
    e670: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
    e678: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
    e680: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
    e688: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
    e690: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
    e698: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
    e6a0: 79 a6 f0 ff 00 00 00 00      	ldxdw r6, [r10 - 0x10]
    e6a8: 85 10 00 00 e8 e9 00 00      	call 0xe9e8 ; target 0x835f0
    e6b0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
    e6c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
    e6c8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
    e6d0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
    e6d8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
    e6e0: 07 03 00 00 00 ff ff ff      	add64 r3, -0x100
    e6e8: bd 13 28 00 00 00 00 00      	jle r3, r1, +0x28 <.text+0xe710>
    e6f0: 15 04 29 00 00 00 00 00      	jeq r4, 0x0, +0x29 <.text+0xe720>
    e6f8: 18 07 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r7, 0x300007f00
    e708: 55 01 2a 00 00 00 00 00      	jne r1, 0x0, +0x2a <.text+0xe740>
    e710: 7b 8a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r8
    e718: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
    e728: bd 17 2b 00 00 00 00 00      	jle r7, r1, +0x2b <.text+0xe768>
    e730: 18 08 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r8, 0x300000000
    e740: 7b 78 00 00 00 00 00 00      	stxdw [r8 + 0x0], r7
    e748: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
    e750: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
    e758: 18 01 00 00 21 59 2f 75 00 00 00 00 52 7c ee fa      	lddw r1, -0x51183ad8ad0a6df
    e768: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
    e770: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
    e778: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
    e780: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
    e788: 7b 17 18 00 00 00 00 00      	stxdw [r7 + 0x18], r1
    e790: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
    e798: 7b 17 20 00 00 00 00 00      	stxdw [r7 + 0x20], r1
    e7a0: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
    e7a8: 7b 17 28 00 00 00 00 00      	stxdw [r7 + 0x28], r1
    e7b0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
    e7b8: 7b 17 30 00 00 00 00 00      	stxdw [r7 + 0x30], r1
    e7c0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
    e7c8: 7b 17 38 00 00 00 00 00      	stxdw [r7 + 0x38], r1
    e7d0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
    e7d8: 7b 17 40 00 00 00 00 00      	stxdw [r7 + 0x40], r1
    e7e0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
    e7e8: 7b 17 48 00 00 00 00 00      	stxdw [r7 + 0x48], r1
    e7f0: 7b 67 50 00 00 00 00 00      	stxdw [r7 + 0x50], r6
    e7f8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    e800: b7 06 00 00 60 00 00 00      	mov64 r6, 0x60
    e808: 75 06 14 00 00 00 00 00      	jsge r6, 0x0, +0x14 <.text+0xe790>
    e810: b7 02 00 00 60 00 00 00      	mov64 r2, 0x60
    e818: 18 03 00 00 78 13 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1378
    e828: 85 10 00 00 03 2a 01 00      	call 0x12a03 ; target 0xa3848
    e830: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
    e838: 55 04 d7 ff 00 00 00 00      	jne r4, 0x0, -0x29 <.text+0xe5d8>
    e840: bf 32 00 00 00 00 00 00      	mov64 r2, r3
    e848: 18 07 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r7, 0x300007f00
    e858: 15 01 d6 ff 00 00 00 00      	jeq r1, 0x0, -0x2a <.text+0xe5f0>
    e860: bf 27 00 00 00 00 00 00      	mov64 r7, r2
    e868: 7b 8a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r8
    e870: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
    e880: 2d 17 d5 ff 00 00 00 00      	jgt r7, r1, -0x2b <.text+0xe610>
    e888: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
    e890: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
    e898: 18 03 00 00 98 19 0b 00 00 00 00 00 00 00 00 00      	lddw r3, 0xb1998
    e8a8: 85 10 00 00 f3 29 01 00      	call 0x129f3 ; target 0xa3848
    e8b0: 85 10 00 00 a7 e9 00 00      	call 0xe9a7 ; target 0x835f0
    e8b8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
    e8c0: 18 03 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300008000
    e8d0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xe7c0>
    e8d8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
    e8e0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
    e8e8: 1f 62 00 00 00 00 00 00      	sub64 r2, r6
    e8f0: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
    e8f8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
    e900: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
    e908: bd 32 05 00 00 00 00 00      	jle r2, r3, +0x5 <.text+0xe818>
    e910: 15 04 06 00 00 00 00 00      	jeq r4, 0x0, +0x6 <.text+0xe828>
    e918: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
    e928: 2d 26 07 00 00 00 00 00      	jgt r6, r2, +0x7 <.text+0xe848>
    e930: 05 00 db ff 00 00 00 00      	ja -0x25 <.text+0xe6f0>
    e938: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
    e940: 55 04 fa ff 00 00 00 00      	jne r4, 0x0, -0x6 <.text+0xe7f8>
    e948: bf 26 00 00 00 00 00 00      	mov64 r6, r2
    e950: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
    e960: bd 26 d5 ff 00 00 00 00      	jle r6, r2, -0x2b <.text+0xe6f0>
    e968: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
    e978: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
    e980: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
    e990: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
    e998: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
    e9a0: bf 62 00 00 00 00 00 00      	mov64 r2, r6
    e9a8: 0f 12 00 00 00 00 00 00      	add64 r2, r1
    e9b0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
    e9b8: 0f 13 00 00 00 00 00 00      	add64 r3, r1
    e9c0: 71 33 00 00 00 00 00 00      	ldxb r3, [r3 + 0x0]
    e9c8: 73 32 08 00 00 00 00 00      	stxb [r2 + 0x8], r3
    e9d0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
    e9d8: 55 01 f8 ff 58 00 00 00      	jne r1, 0x58, -0x8 <.text+0xe880>
    e9e0: 85 10 00 00 81 e9 00 00      	call 0xe981 ; target 0x835f0
    e9e8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
    e9f8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
    ea00: bf 21 00 00 00 00 00 00      	mov64 r1, r2
    ea08: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
    ea10: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
    ea18: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
    ea20: 79 a8 20 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1e0]
    ea28: bd 21 40 00 00 00 00 00      	jle r1, r2, +0x40 <.text+0xeb10>
    ea30: 15 04 41 00 00 00 00 00      	jeq r4, 0x0, +0x41 <.text+0xeb20>
    ea38: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
    ea48: 55 02 42 00 00 00 00 00      	jne r2, 0x0, +0x42 <.text+0xeb40>
    ea50: 18 02 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000008
    ea60: ad 21 43 00 00 00 00 00      	jlt r1, r2, +0x43 <.text+0xeb60>
    ea68: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
    ea78: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
    ea80: 79 a7 68 fe 00 00 00 00      	ldxdw r7, [r10 - 0x198]
    ea88: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
    ea90: 79 73 08 00 00 00 00 00      	ldxdw r3, [r7 + 0x8]
    ea98: 79 74 10 00 00 00 00 00      	ldxdw r4, [r7 + 0x10]
    eaa0: 79 75 18 00 00 00 00 00      	ldxdw r5, [r7 + 0x18]
    eaa8: 7b 51 18 00 00 00 00 00      	stxdw [r1 + 0x18], r5
    eab0: 7b 41 10 00 00 00 00 00      	stxdw [r1 + 0x10], r4
    eab8: 7b 31 08 00 00 00 00 00      	stxdw [r1 + 0x8], r3
    eac0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
    eac8: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
    ead0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
    ead8: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
    eae0: 7a 0a c8 ff 01 00 00 00      	stdw [r10 - 0x38], 0x1
    eae8: bf a9 00 00 00 00 00 00      	mov64 r9, r10
    eaf0: 07 09 00 00 b0 fe ff ff      	add64 r9, -0x150
    eaf8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
    eb00: 07 05 00 00 c8 ff ff ff      	add64 r5, -0x38
    eb08: bf 91 00 00 00 00 00 00      	mov64 r1, r9
    eb10: 18 02 00 00 ed de 0a 00 00 00 00 00 00 00 00 00      	lddw r2, 0xadeed
    eb20: bf 63 00 00 00 00 00 00      	mov64 r3, r6
    eb28: b7 04 00 00 60 00 00 00      	mov64 r4, 0x60
    eb30: 85 10 00 00 ad 23 01 00      	call 0x123ad ; target 0xa08a0
    eb38: 79 a1 70 fe 00 00 00 00      	ldxdw r1, [r10 - 0x190]
    eb40: 73 1a f2 ff 00 00 00 00      	stxb [r10 - 0xe], r1
    eb48: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
    eb50: 73 1a f1 ff 00 00 00 00      	stxb [r10 - 0xf], r1
    eb58: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
    eb60: 73 1a f0 ff 00 00 00 00      	stxb [r10 - 0x10], r1
    eb68: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
    eb70: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
    eb78: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
    eb80: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
    eb88: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
    eb90: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
    eb98: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
    eba0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
    eba8: 7b 7a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r7
    ebb0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    ebb8: 07 02 00 00 c8 ff ff ff      	add64 r2, -0x38
    ebc0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
    ebc8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
    ebd0: 18 04 00 00 b0 13 0b 00 00 00 00 00 00 00 00 00      	lddw r4, 0xb13b0
    ebe0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
    ebe8: 85 10 00 00 25 19 01 00      	call 0x11925 ; target 0x9b518
    ebf0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
    ebf8: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    ec00: 67 01 00 00 20 00 00 00      	lsh64 r1, 0x20
    ec08: 77 01 00 00 20 00 00 00      	rsh64 r1, 0x20
    ec10: 55 01 10 00 1a 00 00 00      	jne r1, 0x1a, +0x10 <.text+0xeb78>
    ec18: b7 00 00 00 02 00 00 00      	mov64 r0, 0x2
    ec20: 79 a3 a0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x160]
    ec28: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0xeb90>
    ec30: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
    ec38: 55 04 bf ff 00 00 00 00      	jne r4, 0x0, -0x41 <.text+0xe918>
    ec40: bf 13 00 00 00 00 00 00      	mov64 r3, r1
    ec48: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
    ec58: 15 02 be ff 00 00 00 00      	jeq r2, 0x0, -0x42 <.text+0xe930>
    ec60: bf 31 00 00 00 00 00 00      	mov64 r1, r3
    ec68: 18 02 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000008
    ec78: 3d 21 bd ff 00 00 00 00      	jge r1, r2, -0x43 <.text+0xe948>
    ec80: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
    ec88: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
    ec90: 85 10 00 00 7a 29 01 00      	call 0x1297a ; target 0xa3868
    ec98: bf 01 00 00 00 00 00 00      	mov64 r1, r0
    eca0: 85 10 00 00 91 11 01 00      	call 0x11191 ; target 0x97930
    eca8: 79 a3 d0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x30]
    ecb0: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
    ecb8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
    ecc0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
    ecc8: 55 02 08 00 00 00 00 00      	jne r2, 0x0, +0x8 <.text+0xebf0>
    ecd0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    ecd8: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
    ece0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    ece8: bf 21 00 00 00 00 00 00      	mov64 r1, r2
    ecf0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
    ecf8: 85 10 00 00 d5 22 01 00      	call 0x122d5 ; target 0xa03a8
    ed00: bf 61 00 00 00 00 00 00      	mov64 r1, r6
    ed08: bf 70 00 00 00 00 00 00      	mov64 r0, r7
    ed10: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
    ed18: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
    ed20: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
    ed28: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
    ed30: 55 03 08 00 00 00 00 00      	jne r3, 0x0, +0x8 <.text+0xec58>
    ed38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    ed40: 07 02 00 00 d8 ff ff ff      	add64 r2, -0x28
    ed48: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    ed50: bf 21 00 00 00 00 00 00      	mov64 r1, r2
    ed58: bf 07 00 00 00 00 00 00      	mov64 r7, r0
    ed60: 85 10 00 00 be 22 01 00      	call 0x122be ; target 0xa0358
    ed68: bf 61 00 00 00 00 00 00      	mov64 r1, r6
    ed70: bf 70 00 00 00 00 00 00      	mov64 r0, r7
    ed78: 55 00 c7 fd 02 00 00 00      	jne r0, 0x2, -0x239 <.text+0xda98>
    ed80: 72 08 c0 01 02 00 00 00      	stb [r8 + 0x1c0], 0x2
    ed88: b7 00 00 00 02 00 00 00      	mov64 r0, 0x2
    ed90: 05 00 c4 fd 00 00 00 00      	ja -0x23c <.text+0xda98>
    ed98: 85 10 00 00 ff ff ff ff      	call -0x1 ; external abort
    eda0: 79 a1 b4 fe 00 00 00 00      	ldxdw r1, [r10 - 0x14c]
    eda8: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
    edb0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    edb8: 07 03 00 00 c8 ff ff ff      	add64 r3, -0x38
    edc0: 18 01 00 00 f4 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad4f4 ; data 'called `Result::unwrap()` on an `Err` valueAccount already has more than Account already has the correct sizep'
    edd0: b7 02 00 00 2b 00 00 00      	mov64 r2, 0x2b
    edd8: 18 04 00 00 c0 13 0b 00 00 00 00 00 00 00 00 00      	lddw r4, 0xb13c0
    ede8: 18 05 00 00 10 14 0b 00 00 00 00 00 00 00 00 00      	lddw r5, 0xb1410
    edf8: 85 10 00 00 7d 2b 01 00      	call 0x12b7d ; target 0xa49e8
    ee00: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    ee08: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
    ee10: 18 01 00 00 19 d0 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad019 ; data 'a Display implementation returned an error unexpectedlyfalse'
    ee20: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
    ee28: 18 04 00 00 68 12 0b 00 00 00 00 00 00 00 00 00      	lddw r4, 0xb1268
    ee38: 18 05 00 00 88 12 0b 00 00 00 00 00 00 00 00 00      	lddw r5, 0xb1288
    ee48: 85 10 00 00 73 2b 01 00      	call 0x12b73 ; target 0xa49e8
    ee50: 79 a1 cc ff 00 00 00 00      	ldxdw r1, [r10 - 0x34]
    ee58: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
    ee60: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    ee68: 07 03 00 00 b0 fe ff ff      	add64 r3, -0x150
    ee70: 18 01 00 00 f4 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad4f4 ; data 'called `Result::unwrap()` on an `Err` valueAccount already has more than Account already has the correct sizep'
    ee80: b7 02 00 00 2b 00 00 00      	mov64 r2, 0x2b
    ee88: 18 04 00 00 c0 13 0b 00 00 00 00 00 00 00 00 00      	lddw r4, 0xb13c0
    ee98: 18 05 00 00 f8 13 0b 00 00 00 00 00 00 00 00 00      	lddw r5, 0xb13f8
    eea8: 85 10 00 00 67 2b 01 00      	call 0x12b67 ; target 0xa49e8
    eeb0: 79 a1 cc ff 00 00 00 00      	ldxdw r1, [r10 - 0x34]
    eeb8: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
    eec0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
    eec8: 07 03 00 00 b0 fe ff ff      	add64 r3, -0x150
    eed0: 18 01 00 00 f4 d4 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xad4f4 ; data 'called `Result::unwrap()` on an `Err` valueAccount already has more than Account already has the correct sizep'
    eee0: b7 02 00 00 2b 00 00 00      	mov64 r2, 0x2b
    eee8: 18 04 00 00 c0 13 0b 00 00 00 00 00 00 00 00 00      	lddw r4, 0xb13c0
    eef8: 18 05 00 00 e0 13 0b 00 00 00 00 00 00 00 00 00      	lddw r5, 0xb13e0
    ef08: 85 10 00 00 5b 2b 01 00      	call 0x12b5b ; target 0xa49e8
