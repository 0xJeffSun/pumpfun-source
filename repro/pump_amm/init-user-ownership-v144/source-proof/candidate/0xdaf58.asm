
work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000daf58 <_ZN145_$LT$pump_amm_recovered..InitUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..InitUserVolumeAccumulatorBumps$GT$$GT$12try_accounts28_$u7b$$u7b$closure$u7d$$u7d$17h9af554612195da7eE>:
   daf58: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   daf60: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   daf68: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   daf70: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   daf78: 79 89 18 00 00 00 00 00      	ldxdw r9, [r8 + 0x18]
   daf80: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   daf88: 18 02 00 00 d0 d9 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10d9d0
   daf98: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dafa0: 85 10 00 00 09 60 00 00      	call 0x6009
   dafa8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dafb0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dafb8: 15 00 15 00 00 00 00 00      	jeq r0, 0x0, +0x15 <LBB496_4>
   dafc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dafc8: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   dafd0: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dafd8: 85 10 00 00 ef 54 fe ff      	call -0x1ab11
   dafe0: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   dafe8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_2>
   daff0: 05 00 0f 03 00 00 00 00      	ja +0x30f <LBB496_105>

00000000000daff8 <LBB496_2>:
   daff8: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   db000: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   db008: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db010: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   db018: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   db028: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   db030: 85 10 00 00 51 4d fe ff      	call -0x1b2af
   db038: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   db040: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]

00000000000db048 <LBB496_3>:
   db048: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   db050: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   db058: 72 07 59 00 02 00 00 00      	stb [r7 + 0x59], 0x2
   db060: 05 00 b1 03 00 00 00 00      	ja +0x3b1 <LBB496_128>

00000000000db068 <LBB496_4>:
   db068: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   db070: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   db078: 85 10 00 00 fb 3d 00 00      	call 0x3dfb
   db080: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   db088: 7b 9a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r9
   db090: 15 07 3e 00 00 00 00 00      	jeq r7, 0x0, +0x3e <LBB496_17>
   db098: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db0a0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db0a8: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   db0b0: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   db0b8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   db0c0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   db0c8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   db0d0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   db0d8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   db0e0: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   db0e8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   db0f0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   db0f8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   db100: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   db108: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   db110: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   db118: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   db120: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   db128: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db130: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   db138: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   db140: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   db148: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   db150: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   db158: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db160: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   db168: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   db170: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   db178: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   db180: 85 10 00 00 cd 5f 00 00      	call 0x5fcd
   db188: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   db190: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   db198: 15 00 df 00 00 00 00 00      	jeq r0, 0x0, +0xdf <LBB496_43>
   db1a0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   db1a8: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   db1b0: 85 10 00 00 cf 3a 00 00      	call 0x3acf
   db1b8: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   db1c0: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <LBB496_8>
   db1c8: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1

00000000000db1d0 <LBB496_8>:
   db1d0: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   db1d8: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   db1e0: 2d 70 01 00 00 00 00 00      	jgt r0, r7, +0x1 <LBB496_9>
   db1e8: 05 00 b5 01 00 00 00 00      	ja +0x1b5 <LBB496_68>

00000000000db1f0 <LBB496_9>:
   db1f0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   db1f8: 1f 72 00 00 00 00 00 00      	sub64 r2, r7
   db200: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   db208: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db210: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <LBB496_11>
   db218: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db220 <LBB496_11>:
   db220: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   db228: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <LBB496_13>
   db230: bf 24 00 00 00 00 00 00      	mov64 r4, r2

00000000000db238 <LBB496_13>:
   db238: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   db240: 79 30 08 00 00 00 00 00      	ldxdw r0, [r3 + 0x8]
   db248: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   db250: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db258: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_15>
   db260: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000db268 <LBB496_15>:
   db268: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   db270: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   db278: 55 01 18 01 01 00 00 00      	jne r1, 0x1, +0x118 <LBB496_46>
   db280: 05 00 0e 00 00 00 00 00      	ja +0xe <LBB496_20>

00000000000db288 <LBB496_17>:
   db288: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   db290: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   db298: 85 10 00 00 b2 3a 00 00      	call 0x3ab2
   db2a0: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   db2a8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db2b0: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   db2b8: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   db2c0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db2c8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db2d0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_19>
   db2d8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db2e0 <LBB496_19>:
   db2e0: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   db2e8: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   db2f0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_21>

00000000000db2f8 <LBB496_20>:
   db2f8: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000db300 <LBB496_21>:
   db300: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   db308: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   db310: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db318: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db320: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_23>
   db328: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db330 <LBB496_23>:
   db330: 7b 7a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r7
   db338: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   db340: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   db348: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_25>
   db350: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB496_20>

00000000000db358 <LBB496_25>:
   db358: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   db360: 79 87 08 00 00 00 00 00      	ldxdw r7, [r8 + 0x8]
   db368: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   db370: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   db378: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db380: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_27>
   db388: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db390 <LBB496_27>:
   db390: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   db398: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   db3a0: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   db3a8: 7b 0a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r0
   db3b0: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   db3b8: 7b 0a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r0
   db3c0: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   db3c8: 7b 0a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r0
   db3d0: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   db3d8: 7b 0a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r0
   db3e0: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   db3e8: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   db3f0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_29>
   db3f8: 05 00 df ff 00 00 00 00      	ja -0x21 <LBB496_20>

00000000000db400 <LBB496_29>:
   db400: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   db408: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   db410: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db418: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   db420: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_31>
   db428: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000db430 <LBB496_31>:
   db430: 7b 7a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r7
   db438: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   db440: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_33>
   db448: 05 00 d5 ff 00 00 00 00      	ja -0x2b <LBB496_20>

00000000000db450 <LBB496_33>:
   db450: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   db458: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   db460: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   db468: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   db470: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db478: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db480: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_35>
   db488: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db490 <LBB496_35>:
   db490: 71 80 2a 00 00 00 00 00      	ldxb r0, [r8 + 0x2a]
   db498: 7b 0a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r0
   db4a0: 71 80 29 00 00 00 00 00      	ldxb r0, [r8 + 0x29]
   db4a8: 7b 0a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r0
   db4b0: 71 80 28 00 00 00 00 00      	ldxb r0, [r8 + 0x28]
   db4b8: 7b 0a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r0
   db4c0: 79 80 20 00 00 00 00 00      	ldxdw r0, [r8 + 0x20]
   db4c8: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   db4d0: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   db4d8: 7b 0a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r0
   db4e0: 79 70 00 00 00 00 00 00      	ldxdw r0, [r7 + 0x0]
   db4e8: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   db4f0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   db4f8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_37>
   db500: 05 00 be ff 00 00 00 00      	ja -0x42 <LBB496_20>

00000000000db508 <LBB496_37>:
   db508: 7b 5a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r5
   db510: 7b 4a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r4
   db518: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   db520: 79 74 10 00 00 00 00 00      	ldxdw r4, [r7 + 0x10]
   db528: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   db530: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   db538: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   db540: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_39>
   db548: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000db550 <LBB496_39>:
   db550: 79 a0 88 fc 00 00 00 00      	ldxdw r0, [r10 - 0x378]
   db558: 79 a5 98 fc 00 00 00 00      	ldxdw r5, [r10 - 0x368]
   db560: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   db568: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_41>
   db570: 05 00 b0 ff 00 00 00 00      	ja -0x50 <LBB496_20>

00000000000db578 <LBB496_41>:
   db578: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   db580: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   db588: 79 71 20 00 00 00 00 00      	ldxdw r1, [r7 + 0x20]
   db590: 7b 1a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r1
   db598: 71 71 28 00 00 00 00 00      	ldxb r1, [r7 + 0x28]
   db5a0: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   db5a8: 71 73 29 00 00 00 00 00      	ldxb r3, [r7 + 0x29]
   db5b0: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   db5b8: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   db5c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db5c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db5d0: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   db5d8: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   db5e0: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   db5e8: 7b 5a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r5
   db5f0: 79 15 08 00 00 00 00 00      	ldxdw r5, [r1 + 0x8]
   db5f8: 7b 5a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r5
   db600: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   db608: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   db610: 79 61 28 00 00 00 00 00      	ldxdw r1, [r6 + 0x28]
   db618: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   db620: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   db628: 07 05 00 00 bf ff ff ff      	add64 r5, -0x41
   db630: 7b 5a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r5
   db638: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   db640: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   db648: 7b 5a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r5
   db650: 18 05 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r5, 0x10e27f
   db660: 7b 5a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r5
   db668: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   db670: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db678: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   db680: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   db688: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db690: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   db698: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   db6a0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   db6a8: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   db6b0: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   db6b8: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   db6c0: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   db6c8: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   db6d0: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   db6d8: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   db6e0: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   db6e8: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   db6f0: 7b 9a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r9
   db6f8: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   db700: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   db708: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   db710: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   db718: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   db720: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   db728: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   db730: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   db738: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   db740: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   db748: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   db750: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   db758: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   db760: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   db768: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   db770: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   db778: 7b 0a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r0
   db780: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   db788: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   db790: 73 7a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r7
   db798: 73 3a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r3
   db7a0: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   db7a8: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   db7b0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   db7b8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   db7c0: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   db7c8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   db7d0: 7b 4a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r4
   db7d8: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   db7e0: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   db7e8: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   db7f0: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   db7f8: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   db800: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   db808: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   db810: 7a 0a c0 fe 01 00 00 00      	stdw [r10 - 0x140], 0x1
   db818: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   db820: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   db828: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   db830: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   db838: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   db840: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db848: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   db850: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   db858: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   db860: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   db868: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   db870: 85 10 00 00 77 35 00 00      	call 0x3577
   db878: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   db880: 15 01 e9 01 02 00 00 00      	jeq r1, 0x2, +0x1e9 <LBB496_103>
   db888: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   db890: 05 00 a7 02 00 00 00 00      	ja +0x2a7 <LBB496_126>

00000000000db898 <LBB496_43>:
   db898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db8a0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   db8a8: 18 02 00 00 b0 dc 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10dcb0
   db8b8: 85 10 00 00 3a 36 00 00      	call 0x363a
   db8c0: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   db8c8: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   db8d0: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   db8d8: 18 01 00 00 18 38 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113818
   db8e8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   db8f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   db8f8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   db900: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   db908: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   db910: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   db918: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   db920: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   db928: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   db930: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   db938: 18 01 00 00 b0 dc 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10dcb0
   db948: 85 10 00 00 f0 37 00 00      	call 0x37f0
   db950: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <LBB496_45>
   db958: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   db960: 07 03 00 00 10 fe ff ff      	add64 r3, -0x1f0
   db968: 18 01 00 00 8e db 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10db8e
   db978: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   db980: 18 04 00 00 48 38 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x113848
   db990: 18 05 00 00 68 38 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x113868
   db9a0: 85 10 00 00 b2 52 00 00      	call 0x52b2

00000000000db9a8 <LBB496_45>:
   db9a8: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   db9b0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   db9b8: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   db9c0: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   db9c8: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   db9d0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   db9d8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   db9e0: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   db9e8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   db9f0: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   db9f8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   dba00: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dba08: 18 01 00 00 45 e1 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10e145
   dba18: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dba20: 62 0a a8 fe 05 10 00 00      	stw [r10 - 0x158], 0x1005
   dba28: 72 0a 60 fe 02 00 00 00      	stb [r10 - 0x1a0], 0x2
   dba30: 62 0a 28 fe c1 01 00 00      	stw [r10 - 0x1d8], 0x1c1
   dba38: 7a 0a 20 fe 0a 00 00 00      	stdw [r10 - 0x1e0], 0xa
   dba40: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dba48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dba50: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   dba58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dba60: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dba68: 85 10 00 00 b2 31 00 00      	call 0x31b2
   dba70: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   dba78: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   dba80: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dba88: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dba90: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dba98: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dbaa0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dbaa8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dbab0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbab8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dbac0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   dbac8: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dbad0: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   dbad8: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dbae0: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   dbae8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dbaf0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dbaf8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dbb00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbb08: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   dbb10: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dbb18: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   dbb20: 85 10 00 00 de 31 00 00      	call 0x31de
   dbb28: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   dbb30: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   dbb38: 05 00 fd 01 00 00 00 00      	ja +0x1fd <LBB496_109>

00000000000dbb40 <LBB496_46>:
   dbb40: 79 39 10 00 00 00 00 00      	ldxdw r9, [r3 + 0x10]
   dbb48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbb50: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbb58: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dbb60: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_48>
   dbb68: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dbb70 <LBB496_48>:
   dbb70: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dbb78: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_50>
   dbb80: 05 00 ee fe 00 00 00 00      	ja -0x112 <LBB496_20>

00000000000dbb88 <LBB496_50>:
   dbb88: 7b 4a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r4
   dbb90: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   dbb98: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dbba0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbba8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dbbb0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_52>
   dbbb8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dbbc0 <LBB496_52>:
   dbbc0: 79 87 00 00 00 00 00 00      	ldxdw r7, [r8 + 0x0]
   dbbc8: 7b 7a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r7
   dbbd0: 71 37 2a 00 00 00 00 00      	ldxb r7, [r3 + 0x2a]
   dbbd8: 7b 7a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r7
   dbbe0: 71 37 29 00 00 00 00 00      	ldxb r7, [r3 + 0x29]
   dbbe8: 7b 7a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r7
   dbbf0: 71 37 28 00 00 00 00 00      	ldxb r7, [r3 + 0x28]
   dbbf8: 7b 7a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r7
   dbc00: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   dbc08: 7b 7a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r7
   dbc10: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   dbc18: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   dbc20: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dbc28: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_54>
   dbc30: 05 00 d8 fe 00 00 00 00      	ja -0x128 <LBB496_20>

00000000000dbc38 <LBB496_54>:
   dbc38: 79 82 10 00 00 00 00 00      	ldxdw r2, [r8 + 0x10]
   dbc40: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dbc48: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbc50: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dbc58: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_56>
   dbc60: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dbc68 <LBB496_56>:
   dbc68: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   dbc70: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dbc78: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_58>
   dbc80: 05 00 ce fe 00 00 00 00      	ja -0x132 <LBB496_20>

00000000000dbc88 <LBB496_58>:
   dbc88: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dbc90: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   dbc98: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   dbca0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dbca8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbcb0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dbcb8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_60>
   dbcc0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000dbcc8 <LBB496_60>:
   dbcc8: 71 87 2a 00 00 00 00 00      	ldxb r7, [r8 + 0x2a]
   dbcd0: 7b 7a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r7
   dbcd8: 71 87 29 00 00 00 00 00      	ldxb r7, [r8 + 0x29]
   dbce0: 7b 7a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r7
   dbce8: 71 87 28 00 00 00 00 00      	ldxb r7, [r8 + 0x28]
   dbcf0: 7b 7a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r7
   dbcf8: 79 87 20 00 00 00 00 00      	ldxdw r7, [r8 + 0x20]
   dbd00: 7b 7a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r7
   dbd08: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   dbd10: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   dbd18: 79 67 00 00 00 00 00 00      	ldxdw r7, [r6 + 0x0]
   dbd20: 7b 7a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r7
   dbd28: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dbd30: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB496_62>
   dbd38: 05 00 b7 fe 00 00 00 00      	ja -0x149 <LBB496_20>

00000000000dbd40 <LBB496_62>:
   dbd40: 7b 9a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r9
   dbd48: 7b 5a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r5
   dbd50: 79 67 10 00 00 00 00 00      	ldxdw r7, [r6 + 0x10]
   dbd58: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   dbd60: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbd68: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   dbd70: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_64>
   dbd78: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000dbd80 <LBB496_64>:
   dbd80: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   dbd88: 79 a5 88 fc 00 00 00 00      	ldxdw r5, [r10 - 0x378]
   dbd90: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   dbd98: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB496_66>
   dbda0: 05 00 aa fe 00 00 00 00      	ja -0x156 <LBB496_20>

00000000000dbda8 <LBB496_66>:
   dbda8: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dbdb0: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   dbdb8: 79 64 20 00 00 00 00 00      	ldxdw r4, [r6 + 0x20]
   dbdc0: 71 65 28 00 00 00 00 00      	ldxb r5, [r6 + 0x28]
   dbdc8: 71 60 29 00 00 00 00 00      	ldxb r0, [r6 + 0x29]
   dbdd0: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   dbdd8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   dbde0: 73 1a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r1
   dbde8: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   dbdf0: 73 1a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r1
   dbdf8: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   dbe00: 73 1a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r1
   dbe08: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   dbe10: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   dbe18: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dbe20: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   dbe28: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   dbe30: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   dbe38: 7b 2a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r2
   dbe40: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   dbe48: 7b 2a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r2
   dbe50: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   dbe58: 73 2a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r2
   dbe60: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   dbe68: 73 2a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r2
   dbe70: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   dbe78: 73 2a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r2
   dbe80: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   dbe88: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   dbe90: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   dbe98: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   dbea0: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   dbea8: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   dbeb0: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   dbeb8: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   dbec0: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   dbec8: 73 6a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r6
   dbed0: 73 0a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r0
   dbed8: 73 5a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r5
   dbee0: 7b 4a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r4
   dbee8: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   dbef0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   dbef8: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   dbf00: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   dbf08: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dbf10: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   dbf18: 7a 0a 90 ff 00 00 00 00      	stdw [r10 - 0x70], 0x0
   dbf20: 7a 0a 88 ff 08 00 00 00      	stdw [r10 - 0x78], 0x8
   dbf28: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   dbf30: 7a 0a e8 fe 08 00 00 00      	stdw [r10 - 0x118], 0x8
   dbf38: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   dbf40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dbf48: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   dbf50: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dbf58: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   dbf60: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   dbf68: 85 10 00 00 00 35 00 00      	call 0x3500
   dbf70: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   dbf78: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   dbf80: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <LBB496_68>
   dbf88: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   dbf90: 05 00 c7 01 00 00 00 00      	ja +0x1c7 <LBB496_126>

00000000000dbf98 <LBB496_68>:
   dbf98: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   dbfa0: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dbfa8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dbfb0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dbfb8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_70>
   dbfc0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dbfc8 <LBB496_70>:
   dbfc8: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   dbfd0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dbfd8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_72>
   dbfe0: 05 00 62 fe 00 00 00 00      	ja -0x19e <LBB496_20>

00000000000dbfe8 <LBB496_72>:
   dbfe8: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   dbff0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dbff8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc000: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc008: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_74>
   dc010: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc018 <LBB496_74>:
   dc018: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dc020: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_76>
   dc028: 05 00 59 fe 00 00 00 00      	ja -0x1a7 <LBB496_20>

00000000000dc030 <LBB496_76>:
   dc030: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   dc038: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   dc040: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   dc048: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dc050: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc058: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc060: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_78>
   dc068: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc070 <LBB496_78>:
   dc070: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   dc078: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   dc080: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   dc088: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   dc090: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   dc098: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   dc0a0: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   dc0a8: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   dc0b0: 79 88 18 00 00 00 00 00      	ldxdw r8, [r8 + 0x18]
   dc0b8: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   dc0c0: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   dc0c8: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dc0d0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_80>
   dc0d8: 05 00 43 fe 00 00 00 00      	ja -0x1bd <LBB496_20>

00000000000dc0e0 <LBB496_80>:
   dc0e0: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   dc0e8: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   dc0f0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc0f8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc100: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_82>
   dc108: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc110 <LBB496_82>:
   dc110: 7b 8a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r8
   dc118: 7b 9a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r9
   dc120: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   dc128: 7b 3a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r3
   dc130: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   dc138: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_84>
   dc140: 05 00 36 fe 00 00 00 00      	ja -0x1ca <LBB496_20>

00000000000dc148 <LBB496_84>:
   dc148: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dc150: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   dc158: 79 79 20 00 00 00 00 00      	ldxdw r9, [r7 + 0x20]
   dc160: 71 72 28 00 00 00 00 00      	ldxb r2, [r7 + 0x28]
   dc168: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   dc170: 71 73 2a 00 00 00 00 00      	ldxb r3, [r7 + 0x2a]
   dc178: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   dc180: 79 86 20 00 00 00 00 00      	ldxdw r6, [r8 + 0x20]
   dc188: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   dc190: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   dc198: 79 60 18 00 00 00 00 00      	ldxdw r0, [r6 + 0x18]
   dc1a0: 7b 0a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r0
   dc1a8: 79 60 10 00 00 00 00 00      	ldxdw r0, [r6 + 0x10]
   dc1b0: 7b 0a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r0
   dc1b8: 79 60 08 00 00 00 00 00      	ldxdw r0, [r6 + 0x8]
   dc1c0: 7b 0a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r0
   dc1c8: 79 60 00 00 00 00 00 00      	ldxdw r0, [r6 + 0x0]
   dc1d0: 7b 0a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r0
   dc1d8: 79 80 28 00 00 00 00 00      	ldxdw r0, [r8 + 0x28]
   dc1e0: 71 08 00 00 00 00 00 00      	ldxb r8, [r0 + 0x0]
   dc1e8: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc1f0: 07 00 00 00 bf ff ff ff      	add64 r0, -0x41
   dc1f8: 7b 0a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r0
   dc200: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc208: 07 00 00 00 98 ff ff ff      	add64 r0, -0x68
   dc210: 7b 0a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r0
   dc218: 18 00 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r0, 0x10e27f
   dc228: 7b 0a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r0
   dc230: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc238: 07 00 00 00 c0 ff ff ff      	add64 r0, -0x40
   dc240: 7b 0a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r0
   dc248: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   dc250: 07 00 00 00 c8 fe ff ff      	add64 r0, -0x138
   dc258: 7b 0a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r0
   dc260: 73 3a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r3
   dc268: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   dc270: 73 2a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r2
   dc278: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   dc280: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dc288: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   dc290: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   dc298: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   dc2a0: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   dc2a8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dc2b0: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   dc2b8: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   dc2c0: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   dc2c8: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   dc2d0: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   dc2d8: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   dc2e0: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   dc2e8: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc2f0: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dc2f8: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc300: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   dc308: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc310: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   dc318: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc320: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   dc328: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc330: 73 8a bf ff 00 00 00 00      	stxb [r10 - 0x41], r8
   dc338: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   dc340: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dc348: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dc350: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   dc358: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   dc360: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   dc368: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   dc370: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dc378: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc380: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   dc388: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc390: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dc398: b7 03 00 00 89 00 00 00      	mov64 r3, 0x89
   dc3a0: 85 10 00 00 2d 33 00 00      	call 0x332d
   dc3a8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   dc3b0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_85>
   dc3b8: 05 00 0c 00 00 00 00 00      	ja +0xc <LBB496_89>

00000000000dc3c0 <LBB496_85>:
   dc3c0: 7b 8a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r8
   dc3c8: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   dc3d0: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   dc3d8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   dc3e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc3e8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc3f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_87>
   dc3f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc400 <LBB496_87>:
   dc400: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   dc408: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dc410: 55 02 03 00 01 00 00 00      	jne r2, 0x1, +0x3 <LBB496_90>
   dc418: 05 00 db fd 00 00 00 00      	ja -0x225 <LBB496_20>

00000000000dc420 <LBB496_89>:
   dc420: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   dc428: 05 00 34 01 00 00 00 00      	ja +0x134 <LBB496_126>

00000000000dc430 <LBB496_90>:
   dc430: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   dc438: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dc440: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc448: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc450: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_92>
   dc458: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc460 <LBB496_92>:
   dc460: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dc468: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_94>
   dc470: 05 00 d0 fd 00 00 00 00      	ja -0x230 <LBB496_20>

00000000000dc478 <LBB496_94>:
   dc478: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   dc480: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   dc488: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc490: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   dc498: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_96>
   dc4a0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000dc4a8 <LBB496_96>:
   dc4a8: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   dc4b0: 7b 5a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r5
   dc4b8: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   dc4c0: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   dc4c8: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   dc4d0: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   dc4d8: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   dc4e0: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   dc4e8: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   dc4f0: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   dc4f8: 79 85 18 00 00 00 00 00      	ldxdw r5, [r8 + 0x18]
   dc500: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   dc508: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   dc510: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB496_98>
   dc518: 05 00 bb fd 00 00 00 00      	ja -0x245 <LBB496_20>

00000000000dc520 <LBB496_98>:
   dc520: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
   dc528: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   dc530: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   dc538: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   dc540: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB496_100>
   dc548: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000dc550 <LBB496_100>:
   dc550: 7b 9a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r9
   dc558: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   dc560: 7b 3a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r3
   dc568: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   dc570: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB496_102>
   dc578: 05 00 af fd 00 00 00 00      	ja -0x251 <LBB496_20>

00000000000dc580 <LBB496_102>:
   dc580: 79 75 18 00 00 00 00 00      	ldxdw r5, [r7 + 0x18]
   dc588: 79 70 20 00 00 00 00 00      	ldxdw r0, [r7 + 0x20]
   dc590: 71 79 28 00 00 00 00 00      	ldxb r9, [r7 + 0x28]
   dc598: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   dc5a0: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   dc5a8: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   dc5b0: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   dc5b8: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   dc5c0: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   dc5c8: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   dc5d0: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   dc5d8: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   dc5e0: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   dc5e8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc5f0: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   dc5f8: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   dc600: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc608: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   dc610: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   dc618: 18 03 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10e27f
   dc628: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   dc630: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc638: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   dc640: 7b 3a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r3
   dc648: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   dc650: 07 03 00 00 c8 fe ff ff      	add64 r3, -0x138
   dc658: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   dc660: 73 7a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r7
   dc668: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   dc670: 73 9a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r9
   dc678: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   dc680: 7b 5a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r5
   dc688: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   dc690: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   dc698: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   dc6a0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   dc6a8: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   dc6b0: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   dc6b8: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   dc6c0: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   dc6c8: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   dc6d0: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   dc6d8: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   dc6e0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dc6e8: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   dc6f0: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dc6f8: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   dc700: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dc708: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   dc710: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc718: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   dc720: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc728: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   dc730: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   dc738: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   dc740: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   dc748: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   dc750: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   dc758: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   dc760: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   dc768: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   dc770: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   dc778: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   dc780: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   dc788: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   dc790: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc798: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   dc7a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc7a8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   dc7b0: 85 10 00 00 1d 33 00 00      	call 0x331d
   dc7b8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   dc7c0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_103>
   dc7c8: 05 00 bf 00 00 00 00 00      	ja +0xbf <LBB496_125>

00000000000dc7d0 <LBB496_103>:
   dc7d0: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   dc7d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc7e0: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   dc7e8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   dc7f0: 85 10 00 00 85 4c fe ff      	call -0x1b37b
   dc7f8: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   dc800: 79 a9 a0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x360]
   dc808: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB496_104>
   dc810: 05 00 0b 00 00 00 00 00      	ja +0xb <LBB496_105>

00000000000dc818 <LBB496_104>:
   dc818: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   dc820: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   dc828: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc830: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   dc838: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dc848: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dc850: 85 10 00 00 4d 4a fe ff      	call -0x1b5b3
   dc858: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   dc860: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   dc868: 05 00 fb fc 00 00 00 00      	ja -0x305 <LBB496_3>

00000000000dc870 <LBB496_105>:
   dc870: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   dc878: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dc880: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   dc888: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   dc890: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   dc898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc8a0: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   dc8a8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   dc8b0: 85 10 00 00 de 5c 00 00      	call 0x5cde
   dc8b8: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   dc8c0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dc8c8: 85 10 00 00 00 3b 00 00      	call 0x3b00
   dc8d0: 15 00 01 00 89 00 00 00      	jeq r0, 0x89, +0x1 <LBB496_106>
   dc8d8: 05 00 30 00 00 00 00 00      	ja +0x30 <LBB496_108>

00000000000dc8e0 <LBB496_106>:
   dc8e0: 79 a8 a8 fc 00 00 00 00      	ldxdw r8, [r10 - 0x358]
   dc8e8: 79 81 30 00 00 00 00 00      	ldxdw r1, [r8 + 0x30]
   dc8f0: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   dc8f8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   dc900: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   dc908: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   dc910: 85 10 00 00 db 5c 00 00      	call 0x5cdb
   dc918: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   dc920: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   dc928: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <LBB496_110>
   dc930: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc938: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   dc940: b7 02 00 00 d4 07 00 00      	mov64 r2, 0x7d4
   dc948: 85 10 00 00 a6 35 00 00      	call 0x35a6
   dc950: 79 a3 10 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f0]
   dc958: 79 a2 08 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f8]
   dc960: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dc968: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   dc970: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dc980: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dc988: 85 10 00 00 26 4a fe ff      	call -0x1b5da
   dc990: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   dc998: 79 a2 f8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x308]
   dc9a0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   dc9a8: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   dc9b0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   dc9b8: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   dc9c0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dc9c8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   dc9d0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dc9d8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dc9e0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   dc9e8: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   dc9f0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   dc9f8: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   dca00: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   dca08: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   dca10: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   dca18: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   dca20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca28: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   dca30: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   dca38: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   dca40: 85 10 00 00 fa 2f 00 00      	call 0x2ffa
   dca48: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   dca50: 79 a2 f0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x310]
   dca58: 05 00 19 00 00 00 00 00      	ja +0x19 <LBB496_109>

00000000000dca60 <LBB496_108>:
   dca60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca68: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   dca70: b7 02 00 00 e3 07 00 00      	mov64 r2, 0x7e3
   dca78: 85 10 00 00 80 35 00 00      	call 0x3580
   dca80: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   dca88: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   dca90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dca98: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   dcaa0: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dcab0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dcab8: 85 10 00 00 00 4a fe ff      	call -0x1b600
   dcac0: 79 a7 30 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2d0]
   dcac8: 79 a9 28 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2d8]
   dcad0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   dcad8: 85 10 00 00 be 3a 00 00      	call 0x3abe
   dcae0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcae8: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   dcaf0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   dcaf8: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   dcb00: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   dcb08: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   dcb10: 85 10 00 00 57 48 fe ff      	call -0x1b7a9
   dcb18: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   dcb20: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]

00000000000dcb28 <LBB496_109>:
   dcb28: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   dcb30: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   dcb38: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dcb40: 05 00 54 00 00 00 00 00      	ja +0x54 <LBB496_127>

00000000000dcb48 <LBB496_110>:
   dcb48: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dcb50: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   dcb58: 85 10 00 00 9a 37 00 00      	call 0x379a
   dcb60: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   dcb68: 79 a6 98 fc 00 00 00 00      	ldxdw r6, [r10 - 0x368]
   dcb70: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   dcb78: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   dcb80: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dcb88: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dcb90: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_112>
   dcb98: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dcba0 <LBB496_112>:
   dcba0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   dcba8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   dcbb0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_114>
   dcbb8: 05 00 e7 fc 00 00 00 00      	ja -0x319 <LBB496_20>

00000000000dcbc0 <LBB496_114>:
   dcbc0: 79 69 10 00 00 00 00 00      	ldxdw r9, [r6 + 0x10]
   dcbc8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   dcbd0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   dcbd8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   dcbe0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB496_116>
   dcbe8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000dcbf0 <LBB496_116>:
   dcbf0: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   dcbf8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB496_118>
   dcc00: 05 00 de fc 00 00 00 00      	ja -0x322 <LBB496_20>

00000000000dcc08 <LBB496_118>:
   dcc08: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   dcc10: 79 63 20 00 00 00 00 00      	ldxdw r3, [r6 + 0x20]
   dcc18: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   dcc20: 71 65 29 00 00 00 00 00      	ldxb r5, [r6 + 0x29]
   dcc28: 71 60 2a 00 00 00 00 00      	ldxb r0, [r6 + 0x2a]
   dcc30: 73 0a 3a fe 00 00 00 00      	stxb [r10 - 0x1c6], r0
   dcc38: 73 5a 39 fe 00 00 00 00      	stxb [r10 - 0x1c7], r5
   dcc40: 73 4a 38 fe 00 00 00 00      	stxb [r10 - 0x1c8], r4
   dcc48: 7b 3a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r3
   dcc50: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   dcc58: 7b 9a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r9
   dcc60: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   dcc68: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   dcc70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcc78: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   dcc80: 85 10 00 00 7a 3a 00 00      	call 0x3a7a
   dcc88: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   dcc90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dcc98: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   dcca0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB496_120>
   dcca8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   dccb0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dccb8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

00000000000dccc0 <LBB496_120>:
   dccc0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   dccc8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dccd0: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   dccd8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB496_122>
   dcce0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   dcce8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   dccf0: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000dccf8 <LBB496_122>:
   dccf8: ad 70 01 00 00 00 00 00      	jlt r0, r7, +0x1 <LBB496_123>
   dcd00: 05 00 0f 00 00 00 00 00      	ja +0xf <LBB496_124>

00000000000dcd08 <LBB496_123>:
   dcd08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd10: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   dcd18: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   dcd20: 85 10 00 00 2b 35 00 00      	call 0x352b
   dcd28: 79 a3 e0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x320]
   dcd30: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   dcd38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   dcd40: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   dcd48: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   dcd58: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   dcd60: 85 10 00 00 ab 49 fe ff      	call -0x1b655
   dcd68: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   dcd70: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   dcd78: 05 00 b5 ff 00 00 00 00      	ja -0x4b <LBB496_109>

00000000000dcd80 <LBB496_124>:
   dcd80: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   dcd88: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   dcd90: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   dcd98: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   dcda0: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   dcda8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   dcdb0: 85 10 00 00 3e 5c 00 00      	call 0x5c3e
   dcdb8: 7b 67 00 00 00 00 00 00      	stxdw [r7 + 0x0], r6
   dcdc0: 05 00 05 00 00 00 00 00      	ja +0x5 <LBB496_128>

00000000000dcdc8 <LBB496_125>:
   dcdc8: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]

00000000000dcdd0 <LBB496_126>:
   dcdd0: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   dcdd8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   dcde0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2

00000000000dcde8 <LBB496_127>:
   dcde8: 72 03 59 00 02 00 00 00      	stb [r3 + 0x59], 0x2

00000000000dcdf0 <LBB496_128>:
   dcdf0: 95 00 00 00 00 00 00 00      	exit
