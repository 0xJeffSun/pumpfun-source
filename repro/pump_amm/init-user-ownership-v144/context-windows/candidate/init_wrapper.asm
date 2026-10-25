
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000009bff0 <_ZN18pump_amm_recovered9__private8__global28init_user_volume_accumulator17h3ed2282938aa228dE>:
   9bff0: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   9bff8: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   9c000: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   9c008: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   9c010: 18 01 00 00 46 f1 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10f146
   9c020: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   9c028: 85 10 00 00 ff ff ff ff      	call -0x1
   9c030: 6a 0a ee fd ff ff 00 00      	sth [r10 - 0x212], 0xffff
   9c038: 7b 8a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r8
   9c040: 7b 9a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r9
   9c048: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c050: 07 01 00 00 ee fd ff ff      	add64 r1, -0x212
   9c058: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   9c060: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c068: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9c070: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   9c078: 07 03 00 00 f0 fd ff ff      	add64 r3, -0x210
   9c080: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   9c088: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9c090: 85 10 00 00 3d 7b 00 00      	call 0x7b3d
   9c098: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   9c0a0: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]
   9c0a8: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   9c0b0: 15 06 94 00 02 00 00 00      	jeq r6, 0x2, +0x94 <LBB394_28>
   9c0b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c0c0: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   9c0c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c0d0: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   9c0d8: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   9c0e0: b7 03 00 00 ea 00 00 00      	mov64 r3, 0xea
   9c0e8: 85 10 00 00 39 de 00 00      	call 0xde39
   9c0f0: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   9c0f8: 63 1a fb fe 00 00 00 00      	stxw [r10 - 0x105], r1
   9c100: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   9c108: 73 1a ff fe 00 00 00 00      	stxb [r10 - 0x101], r1
   9c110: 73 6a fa fe 00 00 00 00      	stxb [r10 - 0x106], r6
   9c118: 7b 9a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r9
   9c120: 7b 8a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r8
   9c128: 71 a1 ef fd 00 00 00 00      	ldxb r1, [r10 - 0x211]
   9c130: 73 1a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r1
   9c138: 71 a1 ee fd 00 00 00 00      	ldxb r1, [r10 - 0x212]
   9c140: 73 1a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r1
   9c148: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   9c150: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   9c158: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   9c160: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   9c168: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c170: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   9c178: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   9c180: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   9c188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c190: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   9c198: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9c1a0: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   9c1a8: 85 10 00 00 83 4e 00 00      	call 0x4e83
   9c1b0: 79 a8 d8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x228]
   9c1b8: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <LBB394_2>
   9c1c0: 05 00 41 00 00 00 00 00      	ja +0x41 <LBB394_16>

000000000009c1c8 <LBB394_2>:
   9c1c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c1d0: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   9c1d8: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   9c1e0: 18 03 00 00 74 ed 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10ed74
   9c1f0: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   9c1f8: 85 10 00 00 6b d1 fe ff      	call -0x12e95
   9c200: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   9c208: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   9c210: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <LBB394_4>
   9c218: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   9c220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9c228: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   9c230: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   9c240: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   9c248: 85 10 00 00 0e cb fe ff      	call -0x134f2
   9c250: 79 a9 c0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x240]
   9c258: 79 a8 b8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x248]

000000000009c260 <LBB394_4>:
   9c260: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   9c268: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   9c270: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c278: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c280: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c288: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_6>
   9c290: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c298: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c2a0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c2a8 <LBB394_6>:
   9c2a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c2b0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c2b8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c2c0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB394_8>
   9c2c8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c2d0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c2d8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c2e0 <LBB394_8>:
   9c2e0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9c2e8: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   9c2f0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c2f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c300: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c308: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_10>
   9c310: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c318: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c320: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c328 <LBB394_10>:
   9c328: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c330: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c338: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c340: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB394_12>
   9c348: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c350: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c358: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c360 <LBB394_12>:
   9c360: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9c368: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9c370: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c378: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c380: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c388: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_14>
   9c390: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c398: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c3a0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c3a8 <LBB394_14>:
   9c3a8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c3b0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c3b8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c3c0: 55 02 32 00 00 00 00 00      	jne r2, 0x0, +0x32 <LBB394_28>
   9c3c8: 05 00 2e 00 00 00 00 00      	ja +0x2e <LBB394_27>

000000000009c3d0 <LBB394_16>:
   9c3d0: 79 a9 e0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x220]
   9c3d8: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   9c3e0: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   9c3e8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c3f0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c3f8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c400: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_18>
   9c408: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c410: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c418: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c420 <LBB394_18>:
   9c420: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c428: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c430: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c438: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB394_20>
   9c440: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c448: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c450: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c458 <LBB394_20>:
   9c458: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9c460: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   9c468: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c470: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c478: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c480: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_22>
   9c488: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c490: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c498: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c4a0 <LBB394_22>:
   9c4a0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c4a8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c4b0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c4b8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB394_24>
   9c4c0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c4c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c4d0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c4d8 <LBB394_24>:
   9c4d8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9c4e0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9c4e8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9c4f0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c4f8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9c500: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB394_26>
   9c508: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9c510: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9c518: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009c520 <LBB394_26>:
   9c520: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9c528: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c530: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9c538: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB394_28>

000000000009c540 <LBB394_27>:
   9c540: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9c548: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9c550: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009c558 <LBB394_28>:
   9c558: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   9c560: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   9c568: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   9c570: 95 00 00 00 00 00 00 00      	exit
