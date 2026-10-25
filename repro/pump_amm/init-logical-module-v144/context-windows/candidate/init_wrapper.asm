
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000009f678 <_ZN18pump_amm_recovered9__private8__global28init_user_volume_accumulator17h3ed2282938aa228dE>:
   9f678: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   9f680: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   9f688: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   9f690: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   9f698: 18 01 00 00 87 f1 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10f187
   9f6a8: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   9f6b0: 85 10 00 00 ff ff ff ff      	call -0x1
   9f6b8: 6a 0a ee fd ff ff 00 00      	sth [r10 - 0x212], 0xffff
   9f6c0: 7b 8a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r8
   9f6c8: 7b 9a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r9
   9f6d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f6d8: 07 01 00 00 ee fd ff ff      	add64 r1, -0x212
   9f6e0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   9f6e8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f6f0: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9f6f8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   9f700: 07 03 00 00 f0 fd ff ff      	add64 r3, -0x210
   9f708: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   9f710: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9f718: 85 10 00 00 50 53 ff ff      	call -0xacb0
   9f720: 79 a9 08 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf8]
   9f728: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]
   9f730: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   9f738: 15 06 94 00 02 00 00 00      	jeq r6, 0x2, +0x94 <LBB401_28>
   9f740: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f748: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   9f750: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9f758: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   9f760: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   9f768: b7 03 00 00 ea 00 00 00      	mov64 r3, 0xea
   9f770: 85 10 00 00 68 d7 00 00      	call 0xd768
   9f778: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   9f780: 63 1a fb fe 00 00 00 00      	stxw [r10 - 0x105], r1
   9f788: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   9f790: 73 1a ff fe 00 00 00 00      	stxb [r10 - 0x101], r1
   9f798: 73 6a fa fe 00 00 00 00      	stxb [r10 - 0x106], r6
   9f7a0: 7b 9a 08 fe 00 00 00 00      	stxdw [r10 - 0x1f8], r9
   9f7a8: 7b 8a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r8
   9f7b0: 71 a1 ef fd 00 00 00 00      	ldxb r1, [r10 - 0x211]
   9f7b8: 73 1a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r1
   9f7c0: 71 a1 ee fd 00 00 00 00      	ldxb r1, [r10 - 0x212]
   9f7c8: 73 1a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r1
   9f7d0: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   9f7d8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   9f7e0: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   9f7e8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   9f7f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f7f8: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   9f800: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   9f808: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   9f810: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f818: 07 01 00 00 d8 fd ff ff      	add64 r1, -0x228
   9f820: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9f828: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   9f830: 85 10 00 00 83 4e 00 00      	call 0x4e83
   9f838: 79 a8 d8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x228]
   9f840: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <LBB401_2>
   9f848: 05 00 41 00 00 00 00 00      	ja +0x41 <LBB401_16>

000000000009f850 <LBB401_2>:
   9f850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f858: 07 01 00 00 c8 fd ff ff      	add64 r1, -0x238
   9f860: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   9f868: 18 03 00 00 b5 ed 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10edb5
   9f878: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   9f880: 85 10 00 00 9a ca fe ff      	call -0x13566
   9f888: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   9f890: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   9f898: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <LBB401_4>
   9f8a0: 79 a3 d0 fd 00 00 00 00      	ldxdw r3, [r10 - 0x230]
   9f8a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9f8b0: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   9f8b8: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   9f8c8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   9f8d0: 85 10 00 00 3d c4 fe ff      	call -0x13bc3
   9f8d8: 79 a9 c0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x240]
   9f8e0: 79 a8 b8 fd 00 00 00 00      	ldxdw r8, [r10 - 0x248]

000000000009f8e8 <LBB401_4>:
   9f8e8: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   9f8f0: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   9f8f8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9f900: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9f908: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9f910: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_6>
   9f918: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9f920: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9f928: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009f930 <LBB401_6>:
   9f930: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9f938: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9f940: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9f948: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB401_8>
   9f950: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9f958: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9f960: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009f968 <LBB401_8>:
   9f968: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9f970: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   9f978: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9f980: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9f988: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9f990: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_10>
   9f998: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9f9a0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9f9a8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009f9b0 <LBB401_10>:
   9f9b0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9f9b8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9f9c0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9f9c8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB401_12>
   9f9d0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9f9d8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9f9e0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009f9e8 <LBB401_12>:
   9f9e8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9f9f0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9f9f8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fa00: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fa08: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fa10: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_14>
   9fa18: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fa20: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fa28: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009fa30 <LBB401_14>:
   9fa30: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fa38: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fa40: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fa48: 55 02 32 00 00 00 00 00      	jne r2, 0x0, +0x32 <LBB401_28>
   9fa50: 05 00 2e 00 00 00 00 00      	ja +0x2e <LBB401_27>

000000000009fa58 <LBB401_16>:
   9fa58: 79 a9 e0 fd 00 00 00 00      	ldxdw r9, [r10 - 0x220]
   9fa60: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   9fa68: 79 a2 78 fe 00 00 00 00      	ldxdw r2, [r10 - 0x188]
   9fa70: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fa78: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fa80: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fa88: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_18>
   9fa90: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fa98: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9faa0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009faa8 <LBB401_18>:
   9faa8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fab0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fab8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fac0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB401_20>
   9fac8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9fad0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fad8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009fae0 <LBB401_20>:
   9fae0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9fae8: 79 a2 a8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x158]
   9faf0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9faf8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fb00: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fb08: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_22>
   9fb10: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fb18: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fb20: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009fb28 <LBB401_22>:
   9fb28: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fb30: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fb38: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fb40: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB401_24>
   9fb48: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9fb50: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fb58: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009fb60 <LBB401_24>:
   9fb60: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9fb68: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9fb70: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9fb78: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fb80: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9fb88: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <LBB401_26>
   9fb90: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   9fb98: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   9fba0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3

000000000009fba8 <LBB401_26>:
   9fba8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   9fbb0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fbb8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   9fbc0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB401_28>

000000000009fbc8 <LBB401_27>:
   9fbc8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   9fbd0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   9fbd8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2

000000000009fbe0 <LBB401_28>:
   9fbe0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   9fbe8: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   9fbf0: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   9fbf8: 95 00 00 00 00 00 00 00      	exit
