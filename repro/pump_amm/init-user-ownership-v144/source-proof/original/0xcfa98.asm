
evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   cfa98: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   cfaa0: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   cfaa8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   cfab0: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   cfab8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfac0: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   cfac8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   cfad0: 85 10 00 00 f0 7f fe ff      	call -0x18010
   cfad8: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   cfae0: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   cfae8: 55 02 17 00 02 00 00 00      	jne r2, 0x2, +0x17 <.text+0xcfa88>
   cfaf0: 79 84 08 f0 00 00 00 00      	ldxdw r4, [r8 - 0xff8]
   cfaf8: 7b 3a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r3
   cfb00: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   cfb08: 15 01 5c 00 00 00 00 00      	jeq r1, 0x0, +0x5c <.text+0xcfcd0>
   cfb10: 7b 6a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r6
   cfb18: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   cfb20: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   cfb28: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   cfb30: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   cfb38: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   cfb40: 07 05 00 00 30 00 00 00      	add64 r5, 0x30
   cfb48: 7b 57 00 00 00 00 00 00      	stxdw [r7 + 0x0], r5
   cfb50: 79 28 08 00 00 00 00 00      	ldxdw r8, [r2 + 0x8]
   cfb58: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   cfb60: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   cfb68: b7 09 00 00 01 00 00 00      	mov64 r9, 0x1
   cfb70: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xcfa60>
   cfb78: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   cfb80: 79 26 00 00 00 00 00 00      	ldxdw r6, [r2 + 0x0]
   cfb88: 7b 6a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r6
   cfb90: 7b 08 00 00 00 00 00 00      	stxdw [r8 + 0x0], r0
   cfb98: 55 09 0a 00 01 00 00 00      	jne r9, 0x1, +0xa <.text+0xcfad0>
   cfba0: 85 10 00 00 ff ff ff ff      	call -0x1
   cfba8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfbb0: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   cfbb8: 18 04 00 00 a8 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0a8
   cfbc8: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   cfbd0: 85 10 00 00 34 64 fe ff      	call -0x19bcc
   cfbd8: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   cfbe0: 79 a2 40 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c0]
   cfbe8: 05 00 4e 00 00 00 00 00      	ja +0x4e <.text+0xcfd40>
   cfbf0: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   cfbf8: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   cfc00: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   cfc08: b7 06 00 00 01 00 00 00      	mov64 r6, 0x1
   cfc10: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0xcfb00>
   cfc18: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
   cfc20: 7b 5a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r5
   cfc28: 7b 4a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r4
   cfc30: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   cfc38: 55 06 01 00 01 00 00 00      	jne r6, 0x1, +0x1 <.text+0xcfb28>
   cfc40: 05 00 eb ff 00 00 00 00      	ja -0x15 <.text+0xcfa80>
   cfc48: 79 24 18 00 00 00 00 00      	ldxdw r4, [r2 + 0x18]
   cfc50: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   cfc58: 79 26 20 00 00 00 00 00      	ldxdw r6, [r2 + 0x20]
   cfc60: 71 25 28 00 00 00 00 00      	ldxb r5, [r2 + 0x28]
   cfc68: 71 24 29 00 00 00 00 00      	ldxb r4, [r2 + 0x29]
   cfc70: 71 20 2a 00 00 00 00 00      	ldxb r0, [r2 + 0x2a]
   cfc78: 73 0a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r0
   cfc80: 73 4a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r4
   cfc88: 73 5a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r5
   cfc90: 7b 6a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r6
   cfc98: 79 a4 c0 fc 00 00 00 00      	ldxdw r4, [r10 - 0x340]
   cfca0: 7b 4a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r4
   cfca8: 7b 9a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r9
   cfcb0: 7b 8a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r8
   cfcb8: 79 a4 c8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x338]
   cfcc0: 7b 4a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r4
   cfcc8: 15 03 36 00 00 00 00 00      	jeq r3, 0x0, +0x36 <.text+0xcfd60>
   cfcd0: 79 a3 b8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x348]
   cfcd8: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   cfce0: 07 01 00 00 fe ff ff ff      	add64 r1, -0x2
   cfce8: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   cfcf0: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   cfcf8: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   cfd00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfd08: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   cfd10: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   cfd18: 85 10 00 00 c6 81 fe ff      	call -0x17e3a
   cfd20: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   cfd28: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   cfd30: 55 02 34 00 02 00 00 00      	jne r2, 0x2, +0x34 <.text+0xcfdb8>
   cfd38: 7b 3a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r3
   cfd40: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   cfd48: 79 a9 d0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x330]
   cfd50: 15 02 89 00 00 00 00 00      	jeq r2, 0x0, +0x89 <.text+0xd0080>
   cfd58: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   cfd60: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   cfd68: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   cfd70: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   cfd78: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   cfd80: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   cfd88: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   cfd90: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   cfd98: 7b 4a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r4
   cfda0: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   cfda8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   cfdb0: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   cfdb8: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xcfca8>
   cfdc0: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   cfdc8: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   cfdd0: 79 a6 c8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x338]
   cfdd8: 7b 46 00 00 00 00 00 00      	stxdw [r6 + 0x0], r4
   cfde0: 55 05 2b 00 01 00 00 00      	jne r5, 0x1, +0x2b <.text+0xcfe20>
   cfde8: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0xcfa80>
   cfdf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfdf8: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   cfe00: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   cfe08: 85 10 00 00 05 6c 00 00      	call 0x6c05
   cfe10: 79 a3 f0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x310]
   cfe18: 79 a2 e8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x318]
   cfe20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfe28: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   cfe30: 18 04 00 00 04 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c004
   cfe40: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   cfe48: 85 10 00 00 e5 63 fe ff      	call -0x19c1b
   cfe50: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   cfe58: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]
   cfe60: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   cfe68: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   cfe70: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   cfe78: 95 00 00 00 00 00 00 00      	exit
   cfe80: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfe88: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   cfe90: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   cfe98: 85 10 00 00 f3 6b 00 00      	call 0x6bf3
   cfea0: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   cfea8: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   cfeb0: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   cfeb8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   cfec0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   cfec8: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2
   cfed0: 05 00 11 01 00 00 00 00      	ja +0x111 <.text+0xd0640>
   cfed8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   cfee0: 07 01 00 00 28 fe ff ff      	add64 r1, -0x1d8
   cfee8: 18 04 00 00 d1 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0d1
   cfef8: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   cff00: 85 10 00 00 ce 63 fe ff      	call -0x19c32
   cff08: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   cff10: 79 a2 30 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d0]
   cff18: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   cff20: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   cff28: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   cff30: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2
   cff38: 05 00 02 01 00 00 00 00      	ja +0x102 <.text+0xd0630>
   cff40: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   cff48: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   cff50: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   cff58: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   cff60: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   cff68: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xcfe58>
   cff70: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   cff78: 79 a8 c0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x340]
   cff80: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   cff88: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xcfe78>
   cff90: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0xcfa80>
   cff98: 15 03 52 00 00 00 00 00      	jeq r3, 0x0, +0x52 <.text+0xd0110>
   cffa0: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   cffa8: 7b 3a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r3
   cffb0: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   cffb8: 7b 3a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r3
   cffc0: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   cffc8: 7b 3a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r3
   cffd0: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   cffd8: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   cffe0: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   cffe8: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   cfff0: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   cfff8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d0000: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   d0008: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d0010: 79 12 38 00 00 00 00 00      	ldxdw r2, [r1 + 0x38]
   d0018: 7b 2a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r2
   d0020: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   d0028: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d0030: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d0038: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xcff28>
   d0040: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d0048: 79 14 30 00 00 00 00 00      	ldxdw r4, [r1 + 0x30]
   d0050: 7b 4a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r4
   d0058: 79 a4 b8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x348]
   d0060: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   d0068: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xcff58>
   d0070: 05 00 65 ff 00 00 00 00      	ja -0x9b <.text+0xcfa80>
   d0078: 79 14 40 00 00 00 00 00      	ldxdw r4, [r1 + 0x40]
   d0080: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   d0088: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d0090: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d0098: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xcff88>
   d00a0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d00a8: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   d00b0: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   d00b8: 7b 4a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r4
   d00c0: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   d00c8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xcffb8>
   d00d0: 05 00 59 ff 00 00 00 00      	ja -0xa7 <.text+0xcfa80>
   d00d8: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   d00e0: 7b 2a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r2
   d00e8: 71 19 59 00 00 00 00 00      	ldxb r9, [r1 + 0x59]
   d00f0: 71 17 58 00 00 00 00 00      	ldxb r7, [r1 + 0x58]
   d00f8: 79 16 50 00 00 00 00 00      	ldxdw r6, [r1 + 0x50]
   d0100: 79 18 48 00 00 00 00 00      	ldxdw r8, [r1 + 0x48]
   d0108: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0110: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d0118: 85 10 00 00 c0 6d 00 00      	call 0x6dc0
   d0120: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   d0128: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   d0130: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d0138: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   d0140: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   d0148: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   d0150: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   d0158: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <.text+0xd01a0>
   d0160: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0168: 07 01 00 00 18 fe ff ff      	add64 r1, -0x1e8
   d0170: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0178: 07 02 00 00 b0 fe ff ff      	add64 r2, -0x150
   d0180: 85 10 00 00 d7 65 00 00      	call 0x65d7
   d0188: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   d0190: 79 a2 20 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e0]
   d0198: 05 00 8f 00 00 00 00 00      	ja +0x8f <.text+0xd04f8>
   d01a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d01a8: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   d01b0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d01b8: 85 10 00 00 8f 6b 00 00      	call 0x6b8f
   d01c0: 79 a3 20 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2e0]
   d01c8: 79 a2 18 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e8]
   d01d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d01d8: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   d01e0: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   d01f0: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   d01f8: 85 10 00 00 6f 63 fe ff      	call -0x19c91
   d0200: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   d0208: 79 a2 10 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f0]
   d0210: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   d0218: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d0220: 72 09 fa 00 02 00 00 00      	stb [r9 + 0xfa], 0x2
   d0228: 05 00 a4 00 00 00 00 00      	ja +0xa4 <.text+0xd0630>
   d0230: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0238: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   d0240: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d0248: 85 10 00 00 7d 6b 00 00      	call 0x6b7d
   d0250: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   d0258: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   d0260: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0268: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   d0270: 18 04 00 00 ca e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ca
   d0280: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   d0288: 85 10 00 00 5d 63 fe ff      	call -0x19ca3
   d0290: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   d0298: 79 a2 30 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2d0]
   d02a0: 7b 29 08 00 00 00 00 00      	stxdw [r9 + 0x8], r2
   d02a8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d02b0: 72 09 fa 00 02 00 00 00      	stb [r9 + 0xfa], 0x2
   d02b8: 05 00 80 00 00 00 00 00      	ja +0x80 <.text+0xd05a0>
   d02c0: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   d02c8: 7b 9a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r9
   d02d0: 7b 6a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r6
   d02d8: 7b 8a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r8
   d02e0: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   d02e8: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   d02f0: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   d02f8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   d0300: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   d0308: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   d0310: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   d0318: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   d0320: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   d0328: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   d0330: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   d0338: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d0340: 18 05 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x11cd4b
   d0350: 7b 5a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r5
   d0358: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   d0360: 07 05 00 00 70 ff ff ff      	add64 r5, -0x90
   d0368: 7b 5a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r5
   d0370: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   d0378: 7b 4a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r4
   d0380: 7b 3a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r3
   d0388: 7b 2a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r2
   d0390: 7a 0a f8 fe 17 00 00 00      	stdw [r10 - 0x108], 0x17
   d0398: 7a 0a 08 ff 20 00 00 00      	stdw [r10 - 0xf8], 0x20
   d03a0: 79 a4 48 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1b8]
   d03a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d03b0: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d03b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d03c0: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   d03c8: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   d03d0: 85 10 00 00 92 7b 00 00      	call 0x7b92
   d03d8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   d03e0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   d03e8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d03f0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   d03f8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   d0400: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   d0408: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   d0410: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   d0418: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   d0420: 73 1a ef fe 00 00 00 00      	stxb [r10 - 0x111], r1
   d0428: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   d0430: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   d0438: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   d0440: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d0448: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0450: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   d0458: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   d0460: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   d0468: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   d0470: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   d0478: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   d0480: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   d0488: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0490: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d0498: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d04a0: 07 02 00 00 c8 fe ff ff      	add64 r2, -0x138
   d04a8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d04b0: 85 10 00 00 85 92 00 00      	call 0x9285
   d04b8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d04c0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d04c8: 15 00 61 00 00 00 00 00      	jeq r0, 0x0, +0x61 <.text+0xd06b8>
   d04d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d04d8: 07 01 00 00 08 fe ff ff      	add64 r1, -0x1f8
   d04e0: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   d04e8: 85 10 00 00 29 6b 00 00      	call 0x6b29
   d04f0: 79 a3 10 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f0]
   d04f8: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   d0500: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0508: 07 01 00 00 f8 fd ff ff      	add64 r1, -0x208
   d0510: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d0520: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d0528: 85 10 00 00 09 63 fe ff      	call -0x19cf7
   d0530: 79 a7 00 fe 00 00 00 00      	ldxdw r7, [r10 - 0x200]
   d0538: 79 a3 f8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x208]
   d0540: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   d0548: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   d0550: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   d0558: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   d0560: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   d0568: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0570: 79 a6 c8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x138]
   d0578: 7b 6a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r6
   d0580: 79 a6 d0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x130]
   d0588: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   d0590: 79 a6 d8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x128]
   d0598: 7b 6a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r6
   d05a0: 79 a6 e0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x120]
   d05a8: 7b 6a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r6
   d05b0: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   d05b8: 7b 0a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r0
   d05c0: 7b 5a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r5
   d05c8: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   d05d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d05d8: 07 01 00 00 e8 fd ff ff      	add64 r1, -0x218
   d05e0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d05e8: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   d05f0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   d05f8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   d0600: 85 10 00 00 79 65 00 00      	call 0x6579
   d0608: 79 a1 e8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x218]
   d0610: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]
   d0618: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   d0620: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   d0628: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d0630: 72 03 fa 00 02 00 00 00      	stb [r3 + 0xfa], 0x2
   d0638: 79 a4 a8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x358]
   d0640: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   d0648: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d0650: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0658: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d0660: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <.text+0xd0568>
   d0668: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   d0670: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d0678: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0680: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   d0688: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d0690: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0698: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d06a0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd05a0>
   d06a8: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   d06b0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d06b8: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1
   d06c0: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   d06c8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d06d0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d06d8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d06e0: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <.text+0xd05e8>
   d06e8: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   d06f0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d06f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0700: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   d0708: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   d0710: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d0718: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0720: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d0728: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <.text+0xd0630>
   d0730: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   d0738: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d0740: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0748: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   d0750: 79 a9 68 fe 00 00 00 00      	ldxdw r9, [r10 - 0x198]
   d0758: 79 a8 60 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1a0]
   d0760: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   d0768: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0770: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   d0778: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd0678>
   d0780: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   d0788: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d0790: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   d0798: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d07a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d07a8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d07b0: 55 01 d8 fe 00 00 00 00      	jne r1, 0x0, -0x128 <.text+0xcfd58>
   d07b8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d07c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d07c8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   d07d0: 05 00 d4 fe 00 00 00 00      	ja -0x12c <.text+0xcfd58>
   d07d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d07e0: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   d07e8: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   d07f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d07f8: 07 01 00 00 ef fe ff ff      	add64 r1, -0x111
   d0800: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   d0808: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0810: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   d0818: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   d0820: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0828: 07 01 00 00 90 fe ff ff      	add64 r1, -0x170
   d0830: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   d0838: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0840: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   d0848: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   d0850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0858: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   d0860: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   d0868: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0870: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   d0878: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   d0880: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0888: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d0890: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0898: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   d08a0: 85 10 00 00 3d 01 00 00      	call 0x13d
   d08a8: 79 a8 18 ff 00 00 00 00      	ldxdw r8, [r10 - 0xe8]
   d08b0: 79 a7 10 ff 00 00 00 00      	ldxdw r7, [r10 - 0xf0]
   d08b8: 71 a9 69 ff 00 00 00 00      	ldxb r9, [r10 - 0x97]
   d08c0: 79 a6 d0 fc 00 00 00 00      	ldxdw r6, [r10 - 0x330]
   d08c8: 15 09 5b 00 02 00 00 00      	jeq r9, 0x2, +0x5b <.text+0xd0a88>
   d08d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d08d8: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
   d08e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d08e8: 07 02 00 00 20 ff ff ff      	add64 r2, -0xe0
   d08f0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   d08f8: 85 10 00 00 f3 91 00 00      	call 0x91f3
   d0900: 61 a1 6a ff 00 00 00 00      	ldxw r1, [r10 - 0x96]
   d0908: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   d0910: 69 a1 6e ff 00 00 00 00      	ldxh r1, [r10 - 0x92]
   d0918: 6b 1a ac ff 00 00 00 00      	stxh [r10 - 0x54], r1
   d0920: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   d0928: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <.text+0xd0aa8>
   d0930: 7b 8a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r8
   d0938: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   d0940: 07 08 00 00 70 ff ff ff      	add64 r8, -0x90
   d0948: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d0950: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d0958: 85 10 00 00 03 7b fe ff      	call -0x184fd
   d0960: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d0968: 85 10 00 00 ac 70 00 00      	call 0x70ac
   d0970: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   d0978: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   d0980: 07 08 00 00 10 ff ff ff      	add64 r8, -0xf0
   d0988: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   d0990: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d0998: 85 10 00 00 fb 7a fe ff      	call -0x18505
   d09a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d09a8: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   d09b0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   d09b8: 85 10 00 00 bb 70 00 00      	call 0x70bb
   d09c0: 79 a3 f8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x108]
   d09c8: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   d09d0: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   d09e0: 5d 21 4b 00 00 00 00 00      	jne r1, r2, +0x4b <.text+0xd0b20>
   d09e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d09f0: 07 01 00 00 98 fe ff ff      	add64 r1, -0x168
   d09f8: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   d0a00: 85 10 00 00 ee 6c 00 00      	call 0x6cee
   d0a08: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d0a10: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   d0a18: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   d0a20: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0a28: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   d0a30: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xd0930>
   d0a38: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   d0a40: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0a48: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   d0a50: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0a58: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0a60: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   d0a68: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xd0968>
   d0a70: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   d0a78: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0a80: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   d0a88: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   d0a90: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   d0a98: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   d0aa0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0aa8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   d0ab0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xd09b0>
   d0ab8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   d0ac0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0ac8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   d0ad0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0ad8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0ae0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   d0ae8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xd09e8>
   d0af0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   d0af8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0b00: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   d0b08: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0xd09f8>
   d0b10: 05 00 55 00 00 00 00 00      	ja +0x55 <.text+0xd0ca0>
   d0b18: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   d0b20: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   d0b28: 55 01 61 00 00 00 00 00      	jne r1, 0x0, +0x61 <.text+0xd0d18>
   d0b30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0b38: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   d0b40: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   d0b48: 85 10 00 00 5d 6a 00 00      	call 0x6a5d
   d0b50: 79 a3 80 fd 00 00 00 00      	ldxdw r3, [r10 - 0x280]
   d0b58: 79 a2 78 fd 00 00 00 00      	ldxdw r2, [r10 - 0x288]
   d0b60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0b68: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   d0b70: 18 04 00 00 a8 e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0a8
   d0b80: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   d0b88: 85 10 00 00 3d 62 fe ff      	call -0x19dc3
   d0b90: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   d0b98: 79 a2 70 fd 00 00 00 00      	ldxdw r2, [r10 - 0x290]
   d0ba0: 05 00 d9 00 00 00 00 00      	ja +0xd9 <.text+0xd1150>
   d0ba8: 7b 86 08 00 00 00 00 00      	stxdw [r6 + 0x8], r8
   d0bb0: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   d0bb8: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   d0bc0: 05 00 4e ff 00 00 00 00      	ja -0xb2 <.text+0xd0518>
   d0bc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0bd0: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   d0bd8: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   d0be0: 85 10 00 00 4a 6a 00 00      	call 0x6a4a
   d0be8: 79 a3 60 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2a0]
   d0bf0: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   d0bf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0c00: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   d0c08: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d0c18: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d0c20: 85 10 00 00 2a 62 fe ff      	call -0x19dd6
   d0c28: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   d0c30: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   d0c38: 05 00 c6 00 00 00 00 00      	ja +0xc6 <.text+0xd1150>
   d0c40: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   d0c48: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   d0c50: 7b 3a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r3
   d0c58: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   d0c60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0c68: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   d0c70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0c78: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   d0c80: 85 10 00 00 77 64 00 00      	call 0x6477
   d0c88: 79 a1 d8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x228]
   d0c90: 79 a2 e0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x220]
   d0c98: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d0ca0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d0ca8: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   d0cb0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d0cb8: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   d0cc0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   d0cc8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0cd0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   d0cd8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xd0bd8>
   d0ce0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   d0ce8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0cf0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   d0cf8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0d00: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0d08: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   d0d10: 79 a4 a8 fc 00 00 00 00      	ldxdw r4, [r10 - 0x358]
   d0d18: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xd0c18>
   d0d20: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   d0d28: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0d30: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   d0d38: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   d0d40: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   d0d48: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   d0d50: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0d58: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   d0d60: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xd0c60>
   d0d68: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   d0d70: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d0d78: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   d0d80: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   d0d88: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0d90: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   d0d98: 55 02 14 ff 00 00 00 00      	jne r2, 0x0, -0xec <.text+0xd0520>
   d0da0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   d0da8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   d0db0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   d0db8: 05 00 10 ff 00 00 00 00      	ja -0xf0 <.text+0xd0520>
   d0dc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0dc8: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   d0dd0: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   d0dd8: 85 10 00 00 0b 6a 00 00      	call 0x6a0b
   d0de0: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   d0de8: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   d0df0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0df8: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   d0e00: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d0e10: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d0e18: 85 10 00 00 eb 61 fe ff      	call -0x19e15
   d0e20: 79 a1 b8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x248]
   d0e28: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   d0e30: 05 00 87 00 00 00 00 00      	ja +0x87 <.text+0xd1150>
   d0e38: 79 a4 48 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1b8]
   d0e40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0e48: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d0e50: 18 02 00 00 d0 29 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1229d0
   d0e60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d0e68: 85 10 00 00 3f 7a 00 00      	call 0x7a3f
   d0e70: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   d0e78: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   d0e80: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   d0e88: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   d0e90: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   d0e98: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   d0ea0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   d0ea8: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   d0eb0: 71 a1 30 ff 00 00 00 00      	ldxb r1, [r10 - 0xd0]
   d0eb8: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   d0ec0: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   d0ec8: 79 a2 98 fc 00 00 00 00      	ldxdw r2, [r10 - 0x368]
   d0ed0: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   d0ed8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   d0ee0: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   d0ee8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   d0ef0: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d0ef8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   d0f00: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d0f08: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   d0f10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d0f18: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   d0f20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0f28: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   d0f30: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d0f38: 85 10 00 00 34 91 00 00      	call 0x9134
   d0f40: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d0f48: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d0f50: 55 00 3d 00 00 00 00 00      	jne r0, 0x0, +0x3d <.text+0xd1020>
   d0f58: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   d0f60: 7b 1a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r1
   d0f68: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   d0f70: 07 01 00 00 70 00 00 00      	add64 r1, 0x70
   d0f78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0f80: 07 02 00 00 58 fe ff ff      	add64 r2, -0x1a8
   d0f88: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   d0f90: 85 10 00 00 20 91 00 00      	call 0x9120
   d0f98: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   d0fa0: 7b 1a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r1
   d0fa8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   d0fb0: 07 01 00 00 20 00 00 00      	add64 r1, 0x20
   d0fb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d0fc0: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   d0fc8: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   d0fd0: 85 10 00 00 18 91 00 00      	call 0x9118
   d0fd8: 69 a1 ac ff 00 00 00 00      	ldxh r1, [r10 - 0x54]
   d0fe0: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
   d0fe8: 73 96 69 00 00 00 00 00      	stxb [r6 + 0x69], r9
   d0ff0: 79 a3 78 fc 00 00 00 00      	ldxdw r3, [r10 - 0x388]
   d0ff8: 73 36 c8 00 00 00 00 00      	stxb [r6 + 0xc8], r3
   d1000: 79 a3 80 fc 00 00 00 00      	ldxdw r3, [r10 - 0x380]
   d1008: 73 36 c9 00 00 00 00 00      	stxb [r6 + 0xc9], r3
   d1010: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   d1018: 73 36 ca 00 00 00 00 00      	stxb [r6 + 0xca], r3
   d1020: 79 a3 48 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b8]
   d1028: 73 36 f8 00 00 00 00 00      	stxb [r6 + 0xf8], r3
   d1030: 79 a3 50 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3b0]
   d1038: 73 36 f9 00 00 00 00 00      	stxb [r6 + 0xf9], r3
   d1040: 79 a3 a0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x360]
   d1048: 73 36 fa 00 00 00 00 00      	stxb [r6 + 0xfa], r3
   d1050: 79 a3 58 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a8]
   d1058: 7b 36 f0 00 00 00 00 00      	stxdw [r6 + 0xf0], r3
   d1060: 79 a3 60 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3a0]
   d1068: 7b 36 e8 00 00 00 00 00      	stxdw [r6 + 0xe8], r3
   d1070: 79 a3 a8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x358]
   d1078: 7b 36 e0 00 00 00 00 00      	stxdw [r6 + 0xe0], r3
   d1080: 79 a3 b8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x348]
   d1088: 7b 36 d8 00 00 00 00 00      	stxdw [r6 + 0xd8], r3
   d1090: 79 a3 70 fc 00 00 00 00      	ldxdw r3, [r10 - 0x390]
   d1098: 7b 36 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r3
   d10a0: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   d10a8: 7b 36 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r3
   d10b0: 79 a3 68 fc 00 00 00 00      	ldxdw r3, [r10 - 0x398]
   d10b8: 7b 36 b8 00 00 00 00 00      	stxdw [r6 + 0xb8], r3
   d10c0: 79 a3 c0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x340]
   d10c8: 7b 36 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r3
   d10d0: 79 a3 c8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x338]
   d10d8: 7b 36 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r3
   d10e0: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   d10e8: 7b 36 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r3
   d10f0: 79 a3 38 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3c8]
   d10f8: 7b 36 18 00 00 00 00 00      	stxdw [r6 + 0x18], r3
   d1100: 7b 76 10 00 00 00 00 00      	stxdw [r6 + 0x10], r7
   d1108: 79 a3 40 fc 00 00 00 00      	ldxdw r3, [r10 - 0x3c0]
   d1110: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   d1118: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   d1120: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   d1128: 63 26 6a 00 00 00 00 00      	stxw [r6 + 0x6a], r2
   d1130: 6b 16 6e 00 00 00 00 00      	stxh [r6 + 0x6e], r1
   d1138: 05 00 a7 fd 00 00 00 00      	ja -0x259 <.text+0xcfd58>
   d1140: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1148: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   d1150: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   d1158: 85 10 00 00 9b 69 00 00      	call 0x699b
   d1160: 79 a3 b0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x250]
   d1168: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   d1170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1178: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   d1180: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   d1190: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   d1198: 85 10 00 00 7b 61 fe ff      	call -0x19e85
   d11a0: 79 a3 a0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x260]
   d11a8: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   d11b0: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   d11b8: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   d11c0: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   d11c8: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   d11d0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   d11d8: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   d11e0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   d11e8: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d11f0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   d11f8: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   d1200: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   d1208: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   d1210: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   d1218: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   d1220: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   d1228: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   d1230: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   d1238: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d1240: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   d1248: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d1250: 07 04 00 00 10 ff ff ff      	add64 r4, -0xf0
   d1258: 85 10 00 00 ee 63 00 00      	call 0x63ee
   d1260: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   d1268: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   d1270: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d1278: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d1280: 72 06 fa 00 02 00 00 00      	stb [r6 + 0xfa], 0x2
   d1288: 05 00 75 fe 00 00 00 00      	ja -0x18b <.text+0xd0518>
