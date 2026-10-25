00d8f0: mov64 r6, r1
00d8f8: ldxdw r0, [r2 + 0x8]
00d900: jlt r0, 0x20, +0xf9 ; branch 0xe0d0
00d908: ldxdw r3, [r2 + 0x0]
00d910: mov64 r5, r0
00d918: add64 r5, -0x20
00d920: stxdw [r2 + 0x8], r5
00d928: mov64 r1, r3
00d930: add64 r1, 0x20
00d938: stxdw [r2 + 0x0], r1
00d940: ldxdw r4, [r3 + 0x6]
00d948: ldxb r7, [r3 + 0xe]
00d950: stxb [r10 - 0x8], r7
00d958: stxdw [r10 - 0x10], r4
00d960: jlt r5, 0x20, +0xed ; branch 0xe0d0
00d968: ldxdw r5, [r10 - 0xf]
00d970: stxdw [r10 - 0x18], r5
00d978: mov64 r7, r0
00d980: add64 r7, -0x40
00d988: stxdw [r2 + 0x8], r7
00d990: mov64 r5, r3
00d998: add64 r5, 0x40
00d9a0: stxdw [r2 + 0x0], r5
00d9a8: ldxdw r8, [r3 + 0x26]
00d9b0: ldxb r9, [r3 + 0x2e]
00d9b8: stxb [r10 - 0x8], r9
00d9c0: stxdw [r10 - 0x20], r8
00d9c8: stxdw [r10 - 0x10], r8
00d9d0: jlt r7, 0x20, +0xdf ; branch 0xe0d0
00d9d8: ldxdw r7, [r10 - 0xf]
00d9e0: stxdw [r10 - 0x28], r7
00d9e8: mov64 r7, r0
00d9f0: add64 r7, -0x60
00d9f8: stxdw [r2 + 0x8], r7
00da00: mov64 r8, r3
00da08: add64 r8, 0x60
00da10: stxdw [r10 - 0x38], r8
00da18: stxdw [r2 + 0x0], r8
00da20: ldxdw r9, [r3 + 0x46]
00da28: ldxb r8, [r3 + 0x4e]
00da30: stxb [r10 - 0x8], r8
00da38: stxdw [r10 - 0x30], r9
00da40: stxdw [r10 - 0x10], r9
00da48: jlt r7, 0x20, +0xd0 ; branch 0xe0d0
00da50: ldxdw r7, [r10 - 0xf]
00da58: stxdw [r10 - 0x40], r7
00da60: mov64 r8, r0
00da68: add64 r8, -0x80
00da70: stxdw [r2 + 0x8], r8
00da78: mov64 r7, r3
00da80: add64 r7, 0x80
00da88: stxdw [r10 - 0x50], r7
00da90: stxdw [r2 + 0x0], r7
00da98: ldxdw r9, [r3 + 0x66]
00daa0: ldxb r7, [r3 + 0x6e]
00daa8: stxb [r10 - 0x8], r7
00dab0: stxdw [r10 - 0x48], r9
00dab8: stxdw [r10 - 0x10], r9
00dac0: jlt r8, 0x20, +0xc1 ; branch 0xe0d0
00dac8: ldxdw r7, [r10 - 0xf]
00dad0: stxdw [r10 - 0x58], r7
00dad8: mov64 r7, r0
00dae0: add64 r7, -0xa0
00dae8: stxdw [r2 + 0x8], r7
00daf0: mov64 r8, r3
00daf8: add64 r8, 0xa0
00db00: stxdw [r10 - 0x68], r8
00db08: stxdw [r2 + 0x0], r8
00db10: ldxdw r9, [r3 + 0x86]
00db18: ldxb r8, [r3 + 0x8e]
00db20: stxb [r10 - 0x8], r8
00db28: stxdw [r10 - 0x60], r9
00db30: stxdw [r10 - 0x10], r9
00db38: jlt r7, 0x20, +0xb2 ; branch 0xe0d0
00db40: ldxdw r7, [r10 - 0xf]
00db48: stxdw [r10 - 0x70], r7
00db50: mov64 r7, r0
00db58: add64 r7, -0xc0
00db60: stxdw [r2 + 0x8], r7
00db68: mov64 r8, r3
00db70: add64 r8, 0xc0
00db78: stxdw [r10 - 0x80], r8
00db80: stxdw [r2 + 0x0], r8
00db88: ldxdw r9, [r3 + 0xa6]
00db90: ldxb r8, [r3 + 0xae]
00db98: stxb [r10 - 0x8], r8
00dba0: stxdw [r10 - 0x78], r9
00dba8: stxdw [r10 - 0x10], r9
00dbb0: jlt r7, 0x20, +0xa3 ; branch 0xe0d0
00dbb8: ldxdw r7, [r10 - 0xf]
00dbc0: stxdw [r10 - 0x88], r7
00dbc8: mov64 r7, r0
00dbd0: add64 r7, -0xe0
00dbd8: stxdw [r2 + 0x8], r7
00dbe0: mov64 r8, r3
00dbe8: add64 r8, 0xe0
00dbf0: stxdw [r10 - 0x90], r8
00dbf8: stxdw [r2 + 0x0], r8
00dc00: ldxdw r9, [r3 + 0xc6]
00dc08: ldxb r8, [r3 + 0xce]
00dc10: stxb [r10 - 0x8], r8
00dc18: stxdw [r10 - 0x98], r9
00dc20: stxdw [r10 - 0x10], r9
00dc28: jlt r7, 0x20, +0x94 ; branch 0xe0d0
00dc30: mov64 r8, r3
00dc38: add64 r8, 0xf
00dc40: mov64 r9, r3
00dc48: add64 r9, 0x2f
00dc50: mov64 r7, r3
00dc58: add64 r7, 0x4f
00dc60: stxdw [r10 - 0xc0], r7
00dc68: mov64 r7, r3
00dc70: add64 r7, 0x6f
00dc78: stxdw [r10 - 0xb8], r7
00dc80: mov64 r7, r3
00dc88: add64 r7, 0x8f
00dc90: stxdw [r10 - 0xb0], r7
00dc98: mov64 r7, r3
00dca0: add64 r7, 0xaf
00dca8: stxdw [r10 - 0xa8], r7
00dcb0: ldxdw r7, [r10 - 0xf]
00dcb8: stxdw [r10 - 0xa0], r7
00dcc0: add64 r0, -0x100
00dcc8: stxdw [r2 + 0x8], r0
00dcd0: mov64 r0, r3
00dcd8: add64 r0, 0x100
00dce0: stxdw [r2 + 0x0], r0
00dce8: ldxdw r2, [r3 + 0xe6]
00dcf0: ldxb r0, [r3 + 0xee]
00dcf8: stxb [r10 - 0x8], r0
00dd00: stxdw [r10 - 0x10], r2
00dd08: ldxdw r0, [r10 - 0xf]
00dd10: ldxb r7, [r3 + 0xff]
00dd18: stxb [r6 + 0x100], r7
00dd20: ldxdw r7, [r3 + 0xf7]
00dd28: stxdw [r6 + 0xf8], r7
00dd30: ldxdw r7, [r3 + 0xef]
00dd38: stxdw [r6 + 0xf0], r7
00dd40: ldxb r7, [r8 + 0x10]
00dd48: stxb [r6 + 0x20], r7
00dd50: ldxdw r7, [r8 + 0x8]
00dd58: stxdw [r6 + 0x18], r7
00dd60: ldxdw r7, [r8 + 0x0]
00dd68: stxdw [r6 + 0x10], r7
00dd70: ldxb r7, [r9 + 0x10]
00dd78: stxb [r6 + 0x40], r7
00dd80: ldxdw r7, [r9 + 0x8]
00dd88: stxdw [r6 + 0x38], r7
00dd90: ldxdw r7, [r9 + 0x0]
00dd98: stxdw [r6 + 0x30], r7
00dda0: ldxdw r8, [r10 - 0xc0]
00dda8: ldxdw r7, [r8 + 0x0]
00ddb0: stxdw [r6 + 0x50], r7
00ddb8: ldxdw r7, [r8 + 0x8]
00ddc0: stxdw [r6 + 0x58], r7
00ddc8: ldxb r7, [r8 + 0x10]
00ddd0: stxb [r6 + 0x60], r7
00ddd8: ldxdw r8, [r10 - 0xb8]
00dde0: ldxdw r7, [r8 + 0x8]
00dde8: stxdw [r6 + 0x78], r7
00ddf0: ldxb r7, [r8 + 0x10]
00ddf8: stxb [r6 + 0x80], r7
00de00: ldxdw r7, [r8 + 0x0]
00de08: stxdw [r6 + 0x70], r7
00de10: ldxdw r8, [r10 - 0xb0]
00de18: ldxdw r7, [r8 + 0x0]
00de20: stxdw [r6 + 0x90], r7
00de28: ldxdw r7, [r8 + 0x8]
00de30: stxdw [r6 + 0x98], r7
00de38: ldxb r7, [r8 + 0x10]
00de40: stxb [r6 + 0xa0], r7
00de48: ldxdw r8, [r10 - 0xa8]
00de50: ldxdw r7, [r8 + 0x0]
00de58: stxdw [r6 + 0xb0], r7
00de60: ldxdw r7, [r8 + 0x8]
00de68: stxdw [r6 + 0xb8], r7
00de70: ldxb r7, [r8 + 0x10]
00de78: stxb [r6 + 0xc0], r7
00de80: ldxdw r7, [r3 + 0xcf]
00de88: stxdw [r6 + 0xd0], r7
00de90: ldxb r7, [r3 + 0xdf]
00de98: stxb [r6 + 0xe0], r7
00dea0: ldxdw r7, [r3 + 0xd7]
00dea8: stxdw [r6 + 0xd8], r7
00deb0: ldxh r7, [r3 + 0x4]
00deb8: stxh [r6 + 0x5], r7
00dec0: ldxw r3, [r3 + 0x0]
00dec8: stxw [r6 + 0x1], r3
00ded0: ldxdw r3, [r10 - 0x18]
00ded8: stxdw [r6 + 0x8], r3
00dee0: stxb [r6 + 0x7], r4
00dee8: ldxh r3, [r1 + 0x4]
00def0: stxh [r6 + 0x25], r3
00def8: ldxw r1, [r1 + 0x0]
00df00: stxw [r6 + 0x21], r1
00df08: ldxdw r1, [r10 - 0x28]
00df10: stxdw [r6 + 0x28], r1
00df18: ldxdw r1, [r10 - 0x20]
00df20: stxb [r6 + 0x27], r1
00df28: ldxh r1, [r5 + 0x4]
00df30: stxh [r6 + 0x45], r1
00df38: ldxw r1, [r5 + 0x0]
00df40: stxw [r6 + 0x41], r1
00df48: ldxdw r1, [r10 - 0x40]
00df50: stxdw [r6 + 0x48], r1
00df58: ldxdw r1, [r10 - 0x30]
00df60: stxb [r6 + 0x47], r1
00df68: ldxdw r3, [r10 - 0x38]
00df70: ldxh r1, [r3 + 0x4]
00df78: stxh [r6 + 0x65], r1
00df80: ldxw r1, [r3 + 0x0]
00df88: stxw [r6 + 0x61], r1
00df90: ldxdw r1, [r10 - 0x58]
00df98: stxdw [r6 + 0x68], r1
00dfa0: ldxdw r1, [r10 - 0x48]
00dfa8: stxb [r6 + 0x67], r1
00dfb0: ldxdw r3, [r10 - 0x50]
00dfb8: ldxh r1, [r3 + 0x4]
00dfc0: stxh [r6 + 0x85], r1
00dfc8: ldxw r1, [r3 + 0x0]
00dfd0: stxw [r6 + 0x81], r1
00dfd8: ldxdw r1, [r10 - 0x70]
00dfe0: stxdw [r6 + 0x88], r1
00dfe8: ldxdw r1, [r10 - 0x60]
00dff0: stxb [r6 + 0x87], r1
00dff8: ldxdw r3, [r10 - 0x68]
00e000: ldxh r1, [r3 + 0x4]
00e008: stxh [r6 + 0xa5], r1
00e010: ldxw r1, [r3 + 0x0]
00e018: stxw [r6 + 0xa1], r1
00e020: ldxdw r1, [r10 - 0x88]
00e028: stxdw [r6 + 0xa8], r1
00e030: ldxdw r1, [r10 - 0x78]
00e038: stxb [r6 + 0xa7], r1
00e040: ldxdw r3, [r10 - 0x80]
00e048: ldxh r1, [r3 + 0x4]
00e050: stxh [r6 + 0xc5], r1
00e058: ldxw r1, [r3 + 0x0]
00e060: stxw [r6 + 0xc1], r1
00e068: ldxdw r1, [r10 - 0xa0]
00e070: stxdw [r6 + 0xc8], r1
00e078: ldxdw r1, [r10 - 0x98]
00e080: stxb [r6 + 0xc7], r1
00e088: ldxdw r3, [r10 - 0x90]
00e090: ldxh r1, [r3 + 0x4]
00e098: stxh [r6 + 0xe5], r1
00e0a0: ldxw r1, [r3 + 0x0]
00e0a8: stxw [r6 + 0xe1], r1
00e0b0: stxb [r6 + 0xe7], r2
00e0b8: mov64 r1, 0x0
00e0c0: mov64 r2, 0xe8
00e0c8: ja +0x5 ; branch 0xe0f8
00e0d0: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
00e0e0: call 0x201e5 ; call 0x10f010
00e0e8: mov64 r1, 0x1
00e0f0: mov64 r2, 0x8
00e0f8: mov64 r3, r6
00e100: add64 r3, r2
00e108: stxdw [r3 + 0x0], r0
00e110: stxb [r6 + 0x0], r1
00e118: exit
00e120: stxdw [r10 - 0x8], r1
00e128: mov64 r4, r10
00e130: add64 r4, -0x8
00e138: mov64 r1, r2
00e140: lddw r2, 0x11c2ed ; rodata b'TryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstru'
00e150: mov64 r3, 0xf
00e158: lddw r5, 0x1222d8 ; rodata b'\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x18\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00}\x02\x00\x00\x15\x00\x00\x00\x00\x00\x00\x00\xfc\xc2\x11\x00\x1a\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
00e168: call 0x20f0d ; call 0x1159d8
00e170: exit
