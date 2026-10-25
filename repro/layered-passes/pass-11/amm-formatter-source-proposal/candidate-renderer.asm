
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/accumulator-order-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000fe510 <_ZN13solana_pubkey15write_as_base5817hd043cde0b90f13b2E>:
   fe510: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   fe518: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   fe520: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   fe528: 62 0a 60 ff 00 00 00 00      	stw [r10 - 0xa0], 0x0
   fe530: 7a 0a 58 ff 00 00 00 00      	stdw [r10 - 0xa8], 0x0
   fe538: 7a 0a 50 ff 00 00 00 00      	stdw [r10 - 0xb0], 0x0
   fe540: 7a 0a 48 ff 00 00 00 00      	stdw [r10 - 0xb8], 0x0
   fe548: 7a 0a 40 ff 00 00 00 00      	stdw [r10 - 0xc0], 0x0
   fe550: 7a 0a 38 ff 00 00 00 00      	stdw [r10 - 0xc8], 0x0
   fe558: 71 24 01 00 00 00 00 00      	ldxb r4, [r2 + 0x1]
   fe560: 71 21 00 00 00 00 00 00      	ldxb r1, [r2 + 0x0]
   fe568: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   fe570: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   fe578: 55 01 5f 00 00 00 00 00      	jne r1, 0x0, +0x5f <LBB31_33>
   fe580: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   fe588: bf 41 00 00 00 00 00 00      	mov64 r1, r4
   fe590: 55 01 5c 00 00 00 00 00      	jne r1, 0x0, +0x5c <LBB31_33>
   fe598: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   fe5a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   fe5a8: 71 21 02 00 00 00 00 00      	ldxb r1, [r2 + 0x2]
   fe5b0: 55 01 58 00 00 00 00 00      	jne r1, 0x0, +0x58 <LBB31_33>
   fe5b8: b7 03 00 00 03 00 00 00      	mov64 r3, 0x3
   fe5c0: 71 21 03 00 00 00 00 00      	ldxb r1, [r2 + 0x3]
   fe5c8: 55 01 55 00 00 00 00 00      	jne r1, 0x0, +0x55 <LBB31_33>
   fe5d0: b7 03 00 00 04 00 00 00      	mov64 r3, 0x4
   fe5d8: 71 21 04 00 00 00 00 00      	ldxb r1, [r2 + 0x4]
   fe5e0: 55 01 52 00 00 00 00 00      	jne r1, 0x0, +0x52 <LBB31_33>
   fe5e8: b7 03 00 00 05 00 00 00      	mov64 r3, 0x5
   fe5f0: 71 21 05 00 00 00 00 00      	ldxb r1, [r2 + 0x5]
   fe5f8: 55 01 4f 00 00 00 00 00      	jne r1, 0x0, +0x4f <LBB31_33>
   fe600: b7 03 00 00 06 00 00 00      	mov64 r3, 0x6
   fe608: 71 21 06 00 00 00 00 00      	ldxb r1, [r2 + 0x6]
   fe610: 55 01 4c 00 00 00 00 00      	jne r1, 0x0, +0x4c <LBB31_33>
   fe618: b7 03 00 00 07 00 00 00      	mov64 r3, 0x7
   fe620: 71 21 07 00 00 00 00 00      	ldxb r1, [r2 + 0x7]
   fe628: 55 01 49 00 00 00 00 00      	jne r1, 0x0, +0x49 <LBB31_33>
   fe630: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   fe638: 71 21 08 00 00 00 00 00      	ldxb r1, [r2 + 0x8]
   fe640: 55 01 46 00 00 00 00 00      	jne r1, 0x0, +0x46 <LBB31_33>
   fe648: b7 03 00 00 09 00 00 00      	mov64 r3, 0x9
   fe650: 71 21 09 00 00 00 00 00      	ldxb r1, [r2 + 0x9]
   fe658: 55 01 43 00 00 00 00 00      	jne r1, 0x0, +0x43 <LBB31_33>
   fe660: b7 03 00 00 0a 00 00 00      	mov64 r3, 0xa
   fe668: 71 21 0a 00 00 00 00 00      	ldxb r1, [r2 + 0xa]
   fe670: 55 01 40 00 00 00 00 00      	jne r1, 0x0, +0x40 <LBB31_33>
   fe678: b7 03 00 00 0b 00 00 00      	mov64 r3, 0xb
   fe680: 71 21 0b 00 00 00 00 00      	ldxb r1, [r2 + 0xb]
   fe688: 55 01 3d 00 00 00 00 00      	jne r1, 0x0, +0x3d <LBB31_33>
   fe690: b7 03 00 00 0c 00 00 00      	mov64 r3, 0xc
   fe698: 71 21 0c 00 00 00 00 00      	ldxb r1, [r2 + 0xc]
   fe6a0: 55 01 3a 00 00 00 00 00      	jne r1, 0x0, +0x3a <LBB31_33>
   fe6a8: b7 03 00 00 0d 00 00 00      	mov64 r3, 0xd
   fe6b0: 71 21 0d 00 00 00 00 00      	ldxb r1, [r2 + 0xd]
   fe6b8: 55 01 37 00 00 00 00 00      	jne r1, 0x0, +0x37 <LBB31_33>
   fe6c0: b7 03 00 00 0e 00 00 00      	mov64 r3, 0xe
   fe6c8: 71 21 0e 00 00 00 00 00      	ldxb r1, [r2 + 0xe]
   fe6d0: 55 01 34 00 00 00 00 00      	jne r1, 0x0, +0x34 <LBB31_33>
   fe6d8: b7 03 00 00 0f 00 00 00      	mov64 r3, 0xf
   fe6e0: 71 21 0f 00 00 00 00 00      	ldxb r1, [r2 + 0xf]
   fe6e8: 55 01 31 00 00 00 00 00      	jne r1, 0x0, +0x31 <LBB31_33>
   fe6f0: b7 03 00 00 10 00 00 00      	mov64 r3, 0x10
   fe6f8: 71 21 10 00 00 00 00 00      	ldxb r1, [r2 + 0x10]
   fe700: 55 01 2e 00 00 00 00 00      	jne r1, 0x0, +0x2e <LBB31_33>
   fe708: b7 03 00 00 11 00 00 00      	mov64 r3, 0x11
   fe710: 71 21 11 00 00 00 00 00      	ldxb r1, [r2 + 0x11]
   fe718: 55 01 2b 00 00 00 00 00      	jne r1, 0x0, +0x2b <LBB31_33>
   fe720: b7 03 00 00 12 00 00 00      	mov64 r3, 0x12
   fe728: 71 21 12 00 00 00 00 00      	ldxb r1, [r2 + 0x12]
   fe730: 55 01 28 00 00 00 00 00      	jne r1, 0x0, +0x28 <LBB31_33>
   fe738: b7 03 00 00 13 00 00 00      	mov64 r3, 0x13
   fe740: 71 21 13 00 00 00 00 00      	ldxb r1, [r2 + 0x13]
   fe748: 55 01 25 00 00 00 00 00      	jne r1, 0x0, +0x25 <LBB31_33>
   fe750: b7 03 00 00 14 00 00 00      	mov64 r3, 0x14
   fe758: 71 21 14 00 00 00 00 00      	ldxb r1, [r2 + 0x14]
   fe760: 55 01 22 00 00 00 00 00      	jne r1, 0x0, +0x22 <LBB31_33>
   fe768: b7 03 00 00 15 00 00 00      	mov64 r3, 0x15
   fe770: 71 21 15 00 00 00 00 00      	ldxb r1, [r2 + 0x15]
   fe778: 55 01 1f 00 00 00 00 00      	jne r1, 0x0, +0x1f <LBB31_33>
   fe780: b7 03 00 00 16 00 00 00      	mov64 r3, 0x16
   fe788: 71 21 16 00 00 00 00 00      	ldxb r1, [r2 + 0x16]
   fe790: 55 01 1c 00 00 00 00 00      	jne r1, 0x0, +0x1c <LBB31_33>
   fe798: b7 03 00 00 17 00 00 00      	mov64 r3, 0x17
   fe7a0: 71 21 17 00 00 00 00 00      	ldxb r1, [r2 + 0x17]
   fe7a8: 55 01 19 00 00 00 00 00      	jne r1, 0x0, +0x19 <LBB31_33>
   fe7b0: b7 03 00 00 18 00 00 00      	mov64 r3, 0x18
   fe7b8: 71 21 18 00 00 00 00 00      	ldxb r1, [r2 + 0x18]
   fe7c0: 55 01 16 00 00 00 00 00      	jne r1, 0x0, +0x16 <LBB31_33>
   fe7c8: b7 03 00 00 19 00 00 00      	mov64 r3, 0x19
   fe7d0: 71 21 19 00 00 00 00 00      	ldxb r1, [r2 + 0x19]
   fe7d8: 55 01 13 00 00 00 00 00      	jne r1, 0x0, +0x13 <LBB31_33>
   fe7e0: b7 03 00 00 1a 00 00 00      	mov64 r3, 0x1a
   fe7e8: 71 21 1a 00 00 00 00 00      	ldxb r1, [r2 + 0x1a]
   fe7f0: 55 01 10 00 00 00 00 00      	jne r1, 0x0, +0x10 <LBB31_33>
   fe7f8: b7 03 00 00 1b 00 00 00      	mov64 r3, 0x1b
   fe800: 71 21 1b 00 00 00 00 00      	ldxb r1, [r2 + 0x1b]
   fe808: 55 01 0d 00 00 00 00 00      	jne r1, 0x0, +0xd <LBB31_33>
   fe810: b7 03 00 00 1c 00 00 00      	mov64 r3, 0x1c
   fe818: 71 21 1c 00 00 00 00 00      	ldxb r1, [r2 + 0x1c]
   fe820: 55 01 0a 00 00 00 00 00      	jne r1, 0x0, +0xa <LBB31_33>
   fe828: b7 03 00 00 1d 00 00 00      	mov64 r3, 0x1d
   fe830: 71 21 1d 00 00 00 00 00      	ldxb r1, [r2 + 0x1d]
   fe838: 55 01 07 00 00 00 00 00      	jne r1, 0x0, +0x7 <LBB31_33>
   fe840: b7 03 00 00 1e 00 00 00      	mov64 r3, 0x1e
   fe848: 71 21 1e 00 00 00 00 00      	ldxb r1, [r2 + 0x1e]
   fe850: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB31_33>
   fe858: b7 03 00 00 1f 00 00 00      	mov64 r3, 0x1f
   fe860: 71 21 1f 00 00 00 00 00      	ldxb r1, [r2 + 0x1f]
   fe868: 55 01 01 00 00 00 00 00      	jne r1, 0x0, +0x1 <LBB31_33>
   fe870: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20

00000000000fe878 <LBB31_33>:
   fe878: 7b 4a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r4
   fe880: 7b 3a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r3
   fe888: 71 21 03 00 00 00 00 00      	ldxb r1, [r2 + 0x3]
   fe890: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   fe898: 71 21 02 00 00 00 00 00      	ldxb r1, [r2 + 0x2]
   fe8a0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   fe8a8: 71 21 07 00 00 00 00 00      	ldxb r1, [r2 + 0x7]
   fe8b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   fe8b8: 71 21 06 00 00 00 00 00      	ldxb r1, [r2 + 0x6]
   fe8c0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   fe8c8: 71 21 05 00 00 00 00 00      	ldxb r1, [r2 + 0x5]
   fe8d0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   fe8d8: 71 21 04 00 00 00 00 00      	ldxb r1, [r2 + 0x4]
   fe8e0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   fe8e8: 71 21 0b 00 00 00 00 00      	ldxb r1, [r2 + 0xb]
   fe8f0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   fe8f8: 71 21 0a 00 00 00 00 00      	ldxb r1, [r2 + 0xa]
   fe900: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   fe908: 71 21 09 00 00 00 00 00      	ldxb r1, [r2 + 0x9]
   fe910: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   fe918: 71 21 08 00 00 00 00 00      	ldxb r1, [r2 + 0x8]
   fe920: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   fe928: 71 21 0f 00 00 00 00 00      	ldxb r1, [r2 + 0xf]
   fe930: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   fe938: 71 21 0e 00 00 00 00 00      	ldxb r1, [r2 + 0xe]
   fe940: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   fe948: 71 21 0d 00 00 00 00 00      	ldxb r1, [r2 + 0xd]
   fe950: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   fe958: 71 21 0c 00 00 00 00 00      	ldxb r1, [r2 + 0xc]
   fe960: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   fe968: 71 21 13 00 00 00 00 00      	ldxb r1, [r2 + 0x13]
   fe970: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   fe978: 71 21 12 00 00 00 00 00      	ldxb r1, [r2 + 0x12]
   fe980: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   fe988: 71 21 11 00 00 00 00 00      	ldxb r1, [r2 + 0x11]
   fe990: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   fe998: 71 21 10 00 00 00 00 00      	ldxb r1, [r2 + 0x10]
   fe9a0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   fe9a8: 71 21 17 00 00 00 00 00      	ldxb r1, [r2 + 0x17]
   fe9b0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   fe9b8: 71 21 16 00 00 00 00 00      	ldxb r1, [r2 + 0x16]
   fe9c0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   fe9c8: 71 29 15 00 00 00 00 00      	ldxb r9, [r2 + 0x15]
   fe9d0: 71 28 14 00 00 00 00 00      	ldxb r8, [r2 + 0x14]
   fe9d8: 71 27 1b 00 00 00 00 00      	ldxb r7, [r2 + 0x1b]
   fe9e0: 71 26 1a 00 00 00 00 00      	ldxb r6, [r2 + 0x1a]
   fe9e8: 71 20 19 00 00 00 00 00      	ldxb r0, [r2 + 0x19]
   fe9f0: 71 25 18 00 00 00 00 00      	ldxb r5, [r2 + 0x18]
   fe9f8: 71 24 1f 00 00 00 00 00      	ldxb r4, [r2 + 0x1f]
   fea00: 71 23 1e 00 00 00 00 00      	ldxb r3, [r2 + 0x1e]
   fea08: 71 21 1d 00 00 00 00 00      	ldxb r1, [r2 + 0x1d]
   fea10: 71 22 1c 00 00 00 00 00      	ldxb r2, [r2 + 0x1c]
   fea18: 73 2a 87 ff 00 00 00 00      	stxb [r10 - 0x79], r2
   fea20: 73 1a 86 ff 00 00 00 00      	stxb [r10 - 0x7a], r1
   fea28: 73 3a 85 ff 00 00 00 00      	stxb [r10 - 0x7b], r3
   fea30: 73 4a 84 ff 00 00 00 00      	stxb [r10 - 0x7c], r4
   fea38: 73 5a 83 ff 00 00 00 00      	stxb [r10 - 0x7d], r5
   fea40: 73 0a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r0
   fea48: 73 6a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r6
   fea50: 73 7a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r7
   fea58: 73 8a 7f ff 00 00 00 00      	stxb [r10 - 0x81], r8
   fea60: 73 9a 7e ff 00 00 00 00      	stxb [r10 - 0x82], r9
   fea68: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   fea70: 73 1a 7d ff 00 00 00 00      	stxb [r10 - 0x83], r1
   fea78: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   fea80: 73 1a 7c ff 00 00 00 00      	stxb [r10 - 0x84], r1
   fea88: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   fea90: 73 1a 7b ff 00 00 00 00      	stxb [r10 - 0x85], r1
   fea98: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   feaa0: 73 1a 7a ff 00 00 00 00      	stxb [r10 - 0x86], r1
   feaa8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   feab0: 73 1a 79 ff 00 00 00 00      	stxb [r10 - 0x87], r1
   feab8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   feac0: 73 1a 78 ff 00 00 00 00      	stxb [r10 - 0x88], r1
   feac8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   fead0: 73 1a 77 ff 00 00 00 00      	stxb [r10 - 0x89], r1
   fead8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   feae0: 73 1a 76 ff 00 00 00 00      	stxb [r10 - 0x8a], r1
   feae8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   feaf0: 73 1a 75 ff 00 00 00 00      	stxb [r10 - 0x8b], r1
   feaf8: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   feb00: 73 1a 74 ff 00 00 00 00      	stxb [r10 - 0x8c], r1
   feb08: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   feb10: 73 1a 73 ff 00 00 00 00      	stxb [r10 - 0x8d], r1
   feb18: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   feb20: 73 1a 72 ff 00 00 00 00      	stxb [r10 - 0x8e], r1
   feb28: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   feb30: 73 1a 71 ff 00 00 00 00      	stxb [r10 - 0x8f], r1
   feb38: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   feb40: 73 1a 70 ff 00 00 00 00      	stxb [r10 - 0x90], r1
   feb48: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   feb50: 73 1a 6f ff 00 00 00 00      	stxb [r10 - 0x91], r1
   feb58: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   feb60: 73 1a 6e ff 00 00 00 00      	stxb [r10 - 0x92], r1
   feb68: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   feb70: 73 1a 6d ff 00 00 00 00      	stxb [r10 - 0x93], r1
   feb78: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   feb80: 73 1a 6c ff 00 00 00 00      	stxb [r10 - 0x94], r1
   feb88: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   feb90: 73 1a 6b ff 00 00 00 00      	stxb [r10 - 0x95], r1
   feb98: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   feba0: 73 1a 6a ff 00 00 00 00      	stxb [r10 - 0x96], r1
   feba8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   febb0: 73 1a 69 ff 00 00 00 00      	stxb [r10 - 0x97], r1
   febb8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   febc0: 73 1a 68 ff 00 00 00 00      	stxb [r10 - 0x98], r1
   febc8: 18 06 00 00 2c 21 11 00 00 00 00 00 00 00 00 00      	lddw r6, 0x11212c
   febd8: 07 06 00 00 10 00 00 00      	add64 r6, 0x10
   febe0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   febe8: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
   febf0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   febf8: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   fec00: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   fec08: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   fec10: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   fec18: 7b 2a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r2
   fec20: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   fec28: bf 15 00 00 00 00 00 00      	mov64 r5, r1
   fec30: b7 09 00 00 00 00 00 00      	mov64 r9, 0x0
   fec38: 05 00 15 00 00 00 00 00      	ja +0x15 <LBB31_34>

00000000000fec40 <LBB31_82>:
   fec40: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   fec48: 55 01 22 00 00 00 00 00      	jne r1, 0x0, +0x22 <LBB31_61>
   fec50: 07 06 00 00 20 00 00 00      	add64 r6, 0x20
   fec58: 07 09 00 00 04 00 00 00      	add64 r9, 0x4
   fec60: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   fec68: 79 a8 f8 fe 00 00 00 00      	ldxdw r8, [r10 - 0x108]
   fec70: 7b 4a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r4
   fec78: 7b 0a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r0
   fec80: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   fec88: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   fec90: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   fec98: 79 a7 f0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x110]
   feca0: 7b 7a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r7
   feca8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   fecb0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   fecb8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   fecc0: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   fecc8: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   fecd0: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   fecd8: 7b 7a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r7
   fece0: 15 09 58 00 20 00 00 00      	jeq r9, 0x20, +0x58 <LBB31_35>

00000000000fece8 <LBB31_34>:
   fece8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   fecf0: 07 02 00 00 68 ff ff ff      	add64 r2, -0x98
   fecf8: bf 93 00 00 00 00 00 00      	mov64 r3, r9
   fed00: 0f 92 00 00 00 00 00 00      	add64 r2, r9
   fed08: 61 27 00 00 00 00 00 00      	ldxw r7, [r2 + 0x0]
   fed10: 61 62 f0 ff 00 00 00 00      	ldxw r2, [r6 - 0x10]
   fed18: 2f 72 00 00 00 00 00 00      	mul64 r2, r7
   fed20: 0f 25 00 00 00 00 00 00      	add64 r5, r2
   fed28: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fed30: 7b 5a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r5
   fed38: ad 15 01 00 00 00 00 00      	jlt r5, r1, +0x1 <LBB31_60>
   fed40: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000fed48 <LBB31_60>:
   fed48: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   fed50: 79 a5 30 ff 00 00 00 00      	ldxdw r5, [r10 - 0xd0]
   fed58: 55 02 03 00 01 00 00 00      	jne r2, 0x1, +0x3 <LBB31_62>

00000000000fed60 <LBB31_61>:
   fed60: 18 01 00 00 40 52 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x115240
   fed70: 85 10 00 00 d8 15 00 00      	call 0x15d8

00000000000fed78 <LBB31_62>:
   fed78: 61 62 f4 ff 00 00 00 00      	ldxw r2, [r6 - 0xc]
   fed80: 2f 72 00 00 00 00 00 00      	mul64 r2, r7
   fed88: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   fed90: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   fed98: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   feda0: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   feda8: ad 81 01 00 00 00 00 00      	jlt r1, r8, +0x1 <LBB31_64>
   fedb0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000fedb8 <LBB31_64>:
   fedb8: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   fedc0: 55 02 f3 ff 00 00 00 00      	jne r2, 0x0, -0xd <LBB31_61>
   fedc8: 61 62 f8 ff 00 00 00 00      	ldxw r2, [r6 - 0x8]
   fedd0: 2f 72 00 00 00 00 00 00      	mul64 r2, r7
   fedd8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   fede0: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   fede8: 0f 24 00 00 00 00 00 00      	add64 r4, r2
   fedf0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fedf8: ad 14 01 00 00 00 00 00      	jlt r4, r1, +0x1 <LBB31_67>
   fee00: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000fee08 <LBB31_67>:
   fee08: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   fee10: 55 02 e9 ff 00 00 00 00      	jne r2, 0x0, -0x17 <LBB31_61>
   fee18: 61 62 fc ff 00 00 00 00      	ldxw r2, [r6 - 0x4]
   fee20: 2f 72 00 00 00 00 00 00      	mul64 r2, r7
   fee28: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   fee30: bf 10 00 00 00 00 00 00      	mov64 r0, r1
   fee38: 0f 20 00 00 00 00 00 00      	add64 r0, r2
   fee40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fee48: ad 10 01 00 00 00 00 00      	jlt r0, r1, +0x1 <LBB31_70>
   fee50: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000fee58 <LBB31_70>:
   fee58: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   fee60: 55 02 df ff 00 00 00 00      	jne r2, 0x0, -0x21 <LBB31_61>
   fee68: 61 62 00 00 00 00 00 00      	ldxw r2, [r6 + 0x0]
   fee70: 2f 72 00 00 00 00 00 00      	mul64 r2, r7
   fee78: 79 a3 18 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe8]
   fee80: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   fee88: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   fee90: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   fee98: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   feea0: ad 31 01 00 00 00 00 00      	jlt r1, r3, +0x1 <LBB31_73>
   feea8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000feeb0 <LBB31_73>:
   feeb0: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   feeb8: 55 02 d4 ff 00 00 00 00      	jne r2, 0x0, -0x2c <LBB31_61>
   feec0: 61 61 04 00 00 00 00 00      	ldxw r1, [r6 + 0x4]
   feec8: 2f 71 00 00 00 00 00 00      	mul64 r1, r7
   feed0: 79 a3 10 ff 00 00 00 00      	ldxdw r3, [r10 - 0xf0]
   feed8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   feee0: 0f 12 00 00 00 00 00 00      	add64 r2, r1
   feee8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   feef0: ad 32 01 00 00 00 00 00      	jlt r2, r3, +0x1 <LBB31_76>
   feef8: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000fef00 <LBB31_76>:
   fef00: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   fef08: 55 01 ca ff 00 00 00 00      	jne r1, 0x0, -0x36 <LBB31_61>
   fef10: 61 61 08 00 00 00 00 00      	ldxw r1, [r6 + 0x8]
   fef18: 2f 71 00 00 00 00 00 00      	mul64 r1, r7
   fef20: 79 a8 08 ff 00 00 00 00      	ldxdw r8, [r10 - 0xf8]
   fef28: bf 83 00 00 00 00 00 00      	mov64 r3, r8
   fef30: 0f 13 00 00 00 00 00 00      	add64 r3, r1
   fef38: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   fef40: ad 83 01 00 00 00 00 00      	jlt r3, r8, +0x1 <LBB31_79>
   fef48: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000fef50 <LBB31_79>:
   fef50: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   fef58: 55 01 c0 ff 00 00 00 00      	jne r1, 0x0, -0x40 <LBB31_61>
   fef60: 61 61 0c 00 00 00 00 00      	ldxw r1, [r6 + 0xc]
   fef68: 2f 71 00 00 00 00 00 00      	mul64 r1, r7
   fef70: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]
   fef78: bf 87 00 00 00 00 00 00      	mov64 r7, r8
   fef80: 0f 17 00 00 00 00 00 00      	add64 r7, r1
   fef88: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   fef90: ad 87 95 ff 00 00 00 00      	jlt r7, r8, -0x6b <LBB31_82>
   fef98: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   fefa0: 05 00 93 ff 00 00 00 00      	ja -0x6d <LBB31_82>

00000000000fefa8 <LBB31_35>:
   fefa8: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   fefb0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   fefb8: 37 01 00 00 a0 35 1f 27      	div64 r1, 0x271f35a0
   fefc0: bf 30 00 00 00 00 00 00      	mov64 r0, r3
   fefc8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   fefd0: 0f 10 00 00 00 00 00 00      	add64 r0, r1
   fefd8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   fefe0: 7b 0a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r0
   fefe8: ad 30 01 00 00 00 00 00      	jlt r0, r3, +0x1 <LBB31_37>
   feff0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000feff8 <LBB31_37>:
   feff8: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   ff000: 79 a6 f8 fe 00 00 00 00      	ldxdw r6, [r10 - 0x108]
   ff008: 79 a3 f0 fe 00 00 00 00      	ldxdw r3, [r10 - 0x110]
   ff010: 55 01 47 01 00 00 00 00      	jne r1, 0x0, +0x147 <LBB31_58>
   ff018: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   ff020: 37 01 00 00 a0 35 1f 27      	div64 r1, 0x271f35a0
   ff028: bf 20 00 00 00 00 00 00      	mov64 r0, r2
   ff030: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   ff038: 0f 10 00 00 00 00 00 00      	add64 r0, r1
   ff040: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   ff048: 7b 0a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r0
   ff050: ad 20 01 00 00 00 00 00      	jlt r0, r2, +0x1 <LBB31_40>
   ff058: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000ff060 <LBB31_40>:
   ff060: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   ff068: 55 01 3c 01 00 00 00 00      	jne r1, 0x0, +0x13c <LBB31_58>
   ff070: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   ff078: 37 02 00 00 a0 35 1f 27      	div64 r2, 0x271f35a0
   ff080: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   ff088: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   ff090: 0f 21 00 00 00 00 00 00      	add64 r1, r2
   ff098: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   ff0a0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   ff0a8: ad 31 01 00 00 00 00 00      	jlt r1, r3, +0x1 <LBB31_43>
   ff0b0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000ff0b8 <LBB31_43>:
   ff0b8: 57 02 00 00 01 00 00 00      	and64 r2, 0x1
   ff0c0: 55 02 31 01 00 00 00 00      	jne r2, 0x0, +0x131 <LBB31_58>
   ff0c8: 79 a9 18 ff 00 00 00 00      	ldxdw r9, [r10 - 0xe8]
   ff0d0: 37 09 00 00 a0 35 1f 27      	div64 r9, 0x271f35a0
   ff0d8: bf 52 00 00 00 00 00 00      	mov64 r2, r5
   ff0e0: 0f 92 00 00 00 00 00 00      	add64 r2, r9
   ff0e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ff0f0: ad 52 01 00 00 00 00 00      	jlt r2, r5, +0x1 <LBB31_46>
   ff0f8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000ff100 <LBB31_46>:
   ff100: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   ff108: 55 03 28 01 00 00 00 00      	jne r3, 0x0, +0x128 <LBB31_58>
   ff110: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   ff118: 37 01 00 00 a0 35 1f 27      	div64 r1, 0x271f35a0
   ff120: bf 40 00 00 00 00 00 00      	mov64 r0, r4
   ff128: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   ff130: 0f 10 00 00 00 00 00 00      	add64 r0, r1
   ff138: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   ff140: ad 40 01 00 00 00 00 00      	jlt r0, r4, +0x1 <LBB31_49>
   ff148: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000ff150 <LBB31_49>:
   ff150: 57 03 00 00 01 00 00 00      	and64 r3, 0x1
   ff158: 55 03 1e 01 00 00 00 00      	jne r3, 0x0, +0x11e <LBB31_58>
   ff160: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   ff168: 37 05 00 00 a0 35 1f 27      	div64 r5, 0x271f35a0
   ff170: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   ff178: 0f 53 00 00 00 00 00 00      	add64 r3, r5
   ff180: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   ff188: ad 63 01 00 00 00 00 00      	jlt r3, r6, +0x1 <LBB31_52>
   ff190: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000ff198 <LBB31_52>:
   ff198: 57 04 00 00 01 00 00 00      	and64 r4, 0x1
   ff1a0: 55 04 15 01 00 00 00 00      	jne r4, 0x0, +0x115 <LBB31_58>
   ff1a8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   ff1b0: 37 04 00 00 a0 35 1f 27      	div64 r4, 0x271f35a0
   ff1b8: 79 a6 30 ff 00 00 00 00      	ldxdw r6, [r10 - 0xd0]
   ff1c0: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   ff1c8: 0f 48 00 00 00 00 00 00      	add64 r8, r4
   ff1d0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   ff1d8: ad 68 01 00 00 00 00 00      	jlt r8, r6, +0x1 <LBB31_55>
   ff1e0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000ff1e8 <LBB31_55>:
   ff1e8: 57 01 00 00 01 00 00 00      	and64 r1, 0x1
   ff1f0: 55 01 0b 01 00 00 00 00      	jne r1, 0x0, +0x10b <LBB31_58>
   ff1f8: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   ff200: 27 01 00 00 a0 35 1f 27      	mul64 r1, 0x271f35a0
   ff208: 79 a6 08 ff 00 00 00 00      	ldxdw r6, [r10 - 0xf8]
   ff210: 27 06 00 00 a0 35 1f 27      	mul64 r6, 0x271f35a0
   ff218: 7b 0a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r0
   ff220: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   ff228: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   ff230: 27 02 00 00 a0 35 1f 27      	mul64 r2, 0x271f35a0
   ff238: 27 09 00 00 a0 35 1f 27      	mul64 r9, 0x271f35a0
   ff240: 79 a0 f0 fe 00 00 00 00      	ldxdw r0, [r10 - 0x110]
   ff248: 27 00 00 00 a0 35 1f 27      	mul64 r0, 0x271f35a0
   ff250: 1f 17 00 00 00 00 00 00      	sub64 r7, r1
   ff258: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   ff260: 1f 61 00 00 00 00 00 00      	sub64 r1, r6
   ff268: 79 a6 20 ff 00 00 00 00      	ldxdw r6, [r10 - 0xe0]
   ff270: 1f 26 00 00 00 00 00 00      	sub64 r6, r2
   ff278: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   ff280: 1f 92 00 00 00 00 00 00      	sub64 r2, r9
   ff288: 79 a9 10 ff 00 00 00 00      	ldxdw r9, [r10 - 0xf0]
   ff290: 1f 09 00 00 00 00 00 00      	sub64 r9, r0
   ff298: 27 04 00 00 a0 35 1f 27      	mul64 r4, 0x271f35a0
   ff2a0: 1f 43 00 00 00 00 00 00      	sub64 r3, r4
   ff2a8: 27 05 00 00 a0 35 1f 27      	mul64 r5, 0x271f35a0
   ff2b0: 79 a4 30 ff 00 00 00 00      	ldxdw r4, [r10 - 0xd0]
   ff2b8: 1f 54 00 00 00 00 00 00      	sub64 r4, r5
   ff2c0: 7b 7a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r7
   ff2c8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   ff2d0: 7b 6a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r6
   ff2d8: 7b 2a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r2
   ff2e0: 7b 9a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r9
   ff2e8: 7b 4a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r4
   ff2f0: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   ff2f8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   ff300: 37 01 00 00 a0 35 1f 27      	div64 r1, 0x271f35a0
   ff308: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   ff310: 27 01 00 00 a0 35 1f 27      	mul64 r1, 0x271f35a0
   ff318: 1f 18 00 00 00 00 00 00      	sub64 r8, r1
   ff320: 7b 8a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r8
   ff328: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   ff330: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ff338: 07 02 00 00 d2 ff ff ff      	add64 r2, -0x2e
   ff340: 7a 0a f5 ff 00 00 00 00      	stdw [r10 - 0xb], 0x0
   ff348: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   ff350: 7a 0a e8 ff 00 00 00 00      	stdw [r10 - 0x18], 0x0
   ff358: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   ff360: 7a 0a d8 ff 00 00 00 00      	stdw [r10 - 0x28], 0x0
   ff368: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0

00000000000ff370 <LBB31_57>:
   ff370: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   ff378: 07 03 00 00 88 ff ff ff      	add64 r3, -0x78
   ff380: 0f 13 00 00 00 00 00 00      	add64 r3, r1
   ff388: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   ff390: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   ff398: 67 04 00 00 20 00 00 00      	lsh64 r4, 0x20
   ff3a0: 77 04 00 00 20 00 00 00      	rsh64 r4, 0x20
   ff3a8: bf 45 00 00 00 00 00 00      	mov64 r5, r4
   ff3b0: 37 05 00 00 10 ad ac 00      	div64 r5, 0xacad10
   ff3b8: 73 52 fe ff 00 00 00 00      	stxb [r2 - 0x2], r5
   ff3c0: bf 45 00 00 00 00 00 00      	mov64 r5, r4
   ff3c8: 37 05 00 00 3a 00 00 00      	div64 r5, 0x3a
   ff3d0: bf 50 00 00 00 00 00 00      	mov64 r0, r5
   ff3d8: 97 00 00 00 3a 00 00 00      	mod64 r0, 0x3a
   ff3e0: 73 02 01 00 00 00 00 00      	stxb [r2 + 0x1], r0
   ff3e8: bf 40 00 00 00 00 00 00      	mov64 r0, r4
   ff3f0: 37 00 00 00 24 0d 00 00      	div64 r0, 0xd24
   ff3f8: 97 00 00 00 3a 00 00 00      	mod64 r0, 0x3a
   ff400: 73 02 00 00 00 00 00 00      	stxb [r2 + 0x0], r0
   ff408: 37 04 00 00 28 fa 02 00      	div64 r4, 0x2fa28
   ff410: 97 04 00 00 3a 00 00 00      	mod64 r4, 0x3a
   ff418: 73 42 ff ff 00 00 00 00      	stxb [r2 - 0x1], r4
   ff420: 27 05 00 00 3a 00 00 00      	mul64 r5, 0x3a
   ff428: 1f 53 00 00 00 00 00 00      	sub64 r3, r5
   ff430: 73 32 02 00 00 00 00 00      	stxb [r2 + 0x2], r3
   ff438: 07 02 00 00 05 00 00 00      	add64 r2, 0x5
   ff440: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   ff448: 55 01 e4 ff 48 00 00 00      	jne r1, 0x48, -0x1c <LBB31_57>
   ff450: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   ff458: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   ff460: 15 01 2c 00 00 00 00 00      	jeq r1, 0x0, +0x2c <LBB31_86>

00000000000ff468 <LBB31_85>:
   ff468: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   ff470: ad 24 be 00 00 00 00 00      	jlt r4, r2, +0xbe <LBB31_135>

00000000000ff478 <LBB31_131>:
   ff478: 1f 24 00 00 00 00 00 00      	sub64 r4, r2
   ff480: 25 04 bf 00 2d 00 00 00      	jgt r4, 0x2d, +0xbf <LBB31_136>
   ff488: 15 04 21 00 2d 00 00 00      	jeq r4, 0x2d, +0x21 <LBB31_143>
   ff490: b7 03 00 00 2d 00 00 00      	mov64 r3, 0x2d
   ff498: 1f 43 00 00 00 00 00 00      	sub64 r3, r4
   ff4a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ff4a8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   ff4b0: 0f 41 00 00 00 00 00 00      	add64 r1, r4
   ff4b8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000ff4c0 <LBB31_134>:
   ff4c0: bf 42 00 00 00 00 00 00      	mov64 r2, r4
   ff4c8: 0f 52 00 00 00 00 00 00      	add64 r2, r5
   ff4d0: 15 02 a5 00 2d 00 00 00      	jeq r2, 0x2d, +0xa5 <LBB31_138>
   ff4d8: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   ff4e0: 0f 52 00 00 00 00 00 00      	add64 r2, r5
   ff4e8: 71 22 00 00 00 00 00 00      	ldxb r2, [r2 + 0x0]
   ff4f0: a5 02 01 00 3a 00 00 00      	jlt r2, 0x3a, +0x1 <LBB31_139>
   ff4f8: 05 00 a5 00 00 00 00 00      	ja +0xa5 <LBB31_140>

00000000000ff500 <LBB31_139>:
   ff500: bf 50 00 00 00 00 00 00      	mov64 r0, r5
   ff508: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   ff510: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   ff518: 07 06 00 00 38 ff ff ff      	add64 r6, -0xc8
   ff520: 0f 56 00 00 00 00 00 00      	add64 r6, r5
   ff528: 18 05 00 00 2c 22 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x11222c
   ff538: 0f 25 00 00 00 00 00 00      	add64 r5, r2
   ff540: 71 52 00 00 00 00 00 00      	ldxb r2, [r5 + 0x0]
   ff548: 73 26 00 00 00 00 00 00      	stxb [r6 + 0x0], r2
   ff550: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   ff558: ad 30 ec ff 00 00 00 00      	jlt r0, r3, -0x14 <LBB31_134>
   ff560: 57 03 00 00 ff 00 00 00      	and64 r3, 0xff
   ff568: a5 03 06 00 2d 00 00 00      	jlt r3, 0x2d, +0x6 <LBB31_144>
   ff570: bf 31 00 00 00 00 00 00      	mov64 r1, r3
   ff578: b7 02 00 00 2c 00 00 00      	mov64 r2, 0x2c
   ff580: 18 03 00 00 e0 52 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1152e0
   ff590: 85 10 00 00 33 11 00 00      	call 0x1133

00000000000ff598 <LBB31_143>:
   ff598: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000ff5a0 <LBB31_144>:
   ff5a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   ff5a8: 07 02 00 00 38 ff ff ff      	add64 r2, -0xc8
   ff5b0: 79 a1 78 fe 00 00 00 00      	ldxdw r1, [r10 - 0x188]
   ff5b8: 85 10 00 00 4b 0f 00 00      	call 0xf4b
   ff5c0: 95 00 00 00 00 00 00 00      	exit

00000000000ff5c8 <LBB31_86>:
   ff5c8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   ff5d0: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   ff5d8: 55 01 d1 ff 00 00 00 00      	jne r1, 0x0, -0x2f <LBB31_85>
   ff5e0: b7 04 00 00 02 00 00 00      	mov64 r4, 0x2
   ff5e8: 71 a1 d2 ff 00 00 00 00      	ldxb r1, [r10 - 0x2e]
   ff5f0: 55 01 ce ff 00 00 00 00      	jne r1, 0x0, -0x32 <LBB31_85>
   ff5f8: b7 04 00 00 03 00 00 00      	mov64 r4, 0x3
   ff600: 71 a1 d3 ff 00 00 00 00      	ldxb r1, [r10 - 0x2d]
   ff608: 55 01 cb ff 00 00 00 00      	jne r1, 0x0, -0x35 <LBB31_85>
   ff610: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   ff618: 71 a1 d4 ff 00 00 00 00      	ldxb r1, [r10 - 0x2c]
   ff620: 55 01 c8 ff 00 00 00 00      	jne r1, 0x0, -0x38 <LBB31_85>
   ff628: b7 04 00 00 05 00 00 00      	mov64 r4, 0x5
   ff630: 71 a1 d5 ff 00 00 00 00      	ldxb r1, [r10 - 0x2b]
   ff638: 55 01 c5 ff 00 00 00 00      	jne r1, 0x0, -0x3b <LBB31_85>
   ff640: b7 04 00 00 06 00 00 00      	mov64 r4, 0x6
   ff648: 71 a1 d6 ff 00 00 00 00      	ldxb r1, [r10 - 0x2a]
   ff650: 55 01 c2 ff 00 00 00 00      	jne r1, 0x0, -0x3e <LBB31_85>
   ff658: b7 04 00 00 07 00 00 00      	mov64 r4, 0x7
   ff660: 71 a1 d7 ff 00 00 00 00      	ldxb r1, [r10 - 0x29]
   ff668: 55 01 bf ff 00 00 00 00      	jne r1, 0x0, -0x41 <LBB31_85>
   ff670: b7 04 00 00 08 00 00 00      	mov64 r4, 0x8
   ff678: 71 a1 d8 ff 00 00 00 00      	ldxb r1, [r10 - 0x28]
   ff680: 55 01 bc ff 00 00 00 00      	jne r1, 0x0, -0x44 <LBB31_85>
   ff688: b7 04 00 00 09 00 00 00      	mov64 r4, 0x9
   ff690: 71 a1 d9 ff 00 00 00 00      	ldxb r1, [r10 - 0x27]
   ff698: 55 01 b9 ff 00 00 00 00      	jne r1, 0x0, -0x47 <LBB31_85>
   ff6a0: b7 04 00 00 0a 00 00 00      	mov64 r4, 0xa
   ff6a8: 71 a1 da ff 00 00 00 00      	ldxb r1, [r10 - 0x26]
   ff6b0: 55 01 b6 ff 00 00 00 00      	jne r1, 0x0, -0x4a <LBB31_85>
   ff6b8: b7 04 00 00 0b 00 00 00      	mov64 r4, 0xb
   ff6c0: 71 a1 db ff 00 00 00 00      	ldxb r1, [r10 - 0x25]
   ff6c8: 55 01 b3 ff 00 00 00 00      	jne r1, 0x0, -0x4d <LBB31_85>
   ff6d0: b7 04 00 00 0c 00 00 00      	mov64 r4, 0xc
   ff6d8: 71 a1 dc ff 00 00 00 00      	ldxb r1, [r10 - 0x24]
   ff6e0: 55 01 b0 ff 00 00 00 00      	jne r1, 0x0, -0x50 <LBB31_85>
   ff6e8: b7 04 00 00 0d 00 00 00      	mov64 r4, 0xd
   ff6f0: 71 a1 dd ff 00 00 00 00      	ldxb r1, [r10 - 0x23]
   ff6f8: 55 01 ad ff 00 00 00 00      	jne r1, 0x0, -0x53 <LBB31_85>
   ff700: b7 04 00 00 0e 00 00 00      	mov64 r4, 0xe
   ff708: 71 a1 de ff 00 00 00 00      	ldxb r1, [r10 - 0x22]
   ff710: 55 01 aa ff 00 00 00 00      	jne r1, 0x0, -0x56 <LBB31_85>
   ff718: b7 04 00 00 0f 00 00 00      	mov64 r4, 0xf
   ff720: 71 a1 df ff 00 00 00 00      	ldxb r1, [r10 - 0x21]
   ff728: 55 01 a7 ff 00 00 00 00      	jne r1, 0x0, -0x59 <LBB31_85>
   ff730: b7 04 00 00 10 00 00 00      	mov64 r4, 0x10
   ff738: 71 a1 e0 ff 00 00 00 00      	ldxb r1, [r10 - 0x20]
   ff740: 55 01 a4 ff 00 00 00 00      	jne r1, 0x0, -0x5c <LBB31_85>
   ff748: b7 04 00 00 11 00 00 00      	mov64 r4, 0x11
   ff750: 71 a1 e1 ff 00 00 00 00      	ldxb r1, [r10 - 0x1f]
   ff758: 55 01 a1 ff 00 00 00 00      	jne r1, 0x0, -0x5f <LBB31_85>
   ff760: b7 04 00 00 12 00 00 00      	mov64 r4, 0x12
   ff768: 71 a1 e2 ff 00 00 00 00      	ldxb r1, [r10 - 0x1e]
   ff770: 55 01 9e ff 00 00 00 00      	jne r1, 0x0, -0x62 <LBB31_85>
   ff778: b7 04 00 00 13 00 00 00      	mov64 r4, 0x13
   ff780: 71 a1 e3 ff 00 00 00 00      	ldxb r1, [r10 - 0x1d]
   ff788: 55 01 9b ff 00 00 00 00      	jne r1, 0x0, -0x65 <LBB31_85>
   ff790: b7 04 00 00 14 00 00 00      	mov64 r4, 0x14
   ff798: 71 a1 e4 ff 00 00 00 00      	ldxb r1, [r10 - 0x1c]
   ff7a0: 55 01 98 ff 00 00 00 00      	jne r1, 0x0, -0x68 <LBB31_85>
   ff7a8: b7 04 00 00 15 00 00 00      	mov64 r4, 0x15
   ff7b0: 71 a1 e5 ff 00 00 00 00      	ldxb r1, [r10 - 0x1b]
   ff7b8: 55 01 95 ff 00 00 00 00      	jne r1, 0x0, -0x6b <LBB31_85>
   ff7c0: b7 04 00 00 16 00 00 00      	mov64 r4, 0x16
   ff7c8: 71 a1 e6 ff 00 00 00 00      	ldxb r1, [r10 - 0x1a]
   ff7d0: 55 01 92 ff 00 00 00 00      	jne r1, 0x0, -0x6e <LBB31_85>
   ff7d8: b7 04 00 00 17 00 00 00      	mov64 r4, 0x17
   ff7e0: 71 a1 e7 ff 00 00 00 00      	ldxb r1, [r10 - 0x19]
   ff7e8: 55 01 8f ff 00 00 00 00      	jne r1, 0x0, -0x71 <LBB31_85>
   ff7f0: b7 04 00 00 18 00 00 00      	mov64 r4, 0x18
   ff7f8: 71 a1 e8 ff 00 00 00 00      	ldxb r1, [r10 - 0x18]
   ff800: 55 01 8c ff 00 00 00 00      	jne r1, 0x0, -0x74 <LBB31_85>
   ff808: b7 04 00 00 19 00 00 00      	mov64 r4, 0x19
   ff810: 71 a1 e9 ff 00 00 00 00      	ldxb r1, [r10 - 0x17]
   ff818: 55 01 89 ff 00 00 00 00      	jne r1, 0x0, -0x77 <LBB31_85>
   ff820: b7 04 00 00 1a 00 00 00      	mov64 r4, 0x1a
   ff828: 71 a1 ea ff 00 00 00 00      	ldxb r1, [r10 - 0x16]
   ff830: 55 01 86 ff 00 00 00 00      	jne r1, 0x0, -0x7a <LBB31_85>
   ff838: b7 04 00 00 1b 00 00 00      	mov64 r4, 0x1b
   ff840: 71 a1 eb ff 00 00 00 00      	ldxb r1, [r10 - 0x15]
   ff848: 55 01 83 ff 00 00 00 00      	jne r1, 0x0, -0x7d <LBB31_85>
   ff850: b7 04 00 00 1c 00 00 00      	mov64 r4, 0x1c
   ff858: 71 a1 ec ff 00 00 00 00      	ldxb r1, [r10 - 0x14]
   ff860: 55 01 80 ff 00 00 00 00      	jne r1, 0x0, -0x80 <LBB31_85>
   ff868: b7 04 00 00 1d 00 00 00      	mov64 r4, 0x1d
   ff870: 71 a1 ed ff 00 00 00 00      	ldxb r1, [r10 - 0x13]
   ff878: 55 01 7d ff 00 00 00 00      	jne r1, 0x0, -0x83 <LBB31_85>
   ff880: b7 04 00 00 1e 00 00 00      	mov64 r4, 0x1e
   ff888: 71 a1 ee ff 00 00 00 00      	ldxb r1, [r10 - 0x12]
   ff890: 55 01 7a ff 00 00 00 00      	jne r1, 0x0, -0x86 <LBB31_85>
   ff898: b7 04 00 00 1f 00 00 00      	mov64 r4, 0x1f
   ff8a0: 71 a1 ef ff 00 00 00 00      	ldxb r1, [r10 - 0x11]
   ff8a8: 55 01 77 ff 00 00 00 00      	jne r1, 0x0, -0x89 <LBB31_85>
   ff8b0: b7 04 00 00 20 00 00 00      	mov64 r4, 0x20
   ff8b8: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   ff8c0: 79 a2 80 fe 00 00 00 00      	ldxdw r2, [r10 - 0x180]
   ff8c8: 55 01 75 ff 00 00 00 00      	jne r1, 0x0, -0x8b <LBB31_131>
   ff8d0: b7 04 00 00 21 00 00 00      	mov64 r4, 0x21
   ff8d8: 71 a1 f1 ff 00 00 00 00      	ldxb r1, [r10 - 0xf]
   ff8e0: 55 01 72 ff 00 00 00 00      	jne r1, 0x0, -0x8e <LBB31_131>
   ff8e8: b7 04 00 00 22 00 00 00      	mov64 r4, 0x22
   ff8f0: 71 a1 f2 ff 00 00 00 00      	ldxb r1, [r10 - 0xe]
   ff8f8: 55 01 6f ff 00 00 00 00      	jne r1, 0x0, -0x91 <LBB31_131>
   ff900: b7 04 00 00 23 00 00 00      	mov64 r4, 0x23
   ff908: 71 a1 f3 ff 00 00 00 00      	ldxb r1, [r10 - 0xd]
   ff910: 55 01 6c ff 00 00 00 00      	jne r1, 0x0, -0x94 <LBB31_131>
   ff918: b7 04 00 00 24 00 00 00      	mov64 r4, 0x24
   ff920: 71 a1 f4 ff 00 00 00 00      	ldxb r1, [r10 - 0xc]
   ff928: 55 01 69 ff 00 00 00 00      	jne r1, 0x0, -0x97 <LBB31_131>
   ff930: b7 04 00 00 25 00 00 00      	mov64 r4, 0x25
   ff938: 71 a1 f5 ff 00 00 00 00      	ldxb r1, [r10 - 0xb]
   ff940: 55 01 66 ff 00 00 00 00      	jne r1, 0x0, -0x9a <LBB31_131>
   ff948: b7 04 00 00 26 00 00 00      	mov64 r4, 0x26
   ff950: 71 a1 f6 ff 00 00 00 00      	ldxb r1, [r10 - 0xa]
   ff958: 55 01 63 ff 00 00 00 00      	jne r1, 0x0, -0x9d <LBB31_131>
   ff960: b7 04 00 00 27 00 00 00      	mov64 r4, 0x27
   ff968: 71 a1 f7 ff 00 00 00 00      	ldxb r1, [r10 - 0x9]
   ff970: 55 01 60 ff 00 00 00 00      	jne r1, 0x0, -0xa0 <LBB31_131>
   ff978: b7 04 00 00 28 00 00 00      	mov64 r4, 0x28
   ff980: 71 a1 f8 ff 00 00 00 00      	ldxb r1, [r10 - 0x8]
   ff988: 55 01 5d ff 00 00 00 00      	jne r1, 0x0, -0xa3 <LBB31_131>
   ff990: b7 04 00 00 29 00 00 00      	mov64 r4, 0x29
   ff998: 71 a1 f9 ff 00 00 00 00      	ldxb r1, [r10 - 0x7]
   ff9a0: 55 01 5a ff 00 00 00 00      	jne r1, 0x0, -0xa6 <LBB31_131>
   ff9a8: b7 04 00 00 2a 00 00 00      	mov64 r4, 0x2a
   ff9b0: 71 a1 fa ff 00 00 00 00      	ldxb r1, [r10 - 0x6]
   ff9b8: 55 01 57 ff 00 00 00 00      	jne r1, 0x0, -0xa9 <LBB31_131>
   ff9c0: b7 04 00 00 2b 00 00 00      	mov64 r4, 0x2b
   ff9c8: 71 a1 fb ff 00 00 00 00      	ldxb r1, [r10 - 0x5]
   ff9d0: 55 01 54 ff 00 00 00 00      	jne r1, 0x0, -0xac <LBB31_131>
   ff9d8: b7 04 00 00 2c 00 00 00      	mov64 r4, 0x2c
   ff9e0: 71 a1 fc ff 00 00 00 00      	ldxb r1, [r10 - 0x4]
   ff9e8: 55 01 51 ff 00 00 00 00      	jne r1, 0x0, -0xaf <LBB31_131>
   ff9f0: b7 04 00 00 2d 00 00 00      	mov64 r4, 0x2d
   ff9f8: 05 00 4f ff 00 00 00 00      	ja -0xb1 <LBB31_131>

00000000000ffa00 <LBB31_138>:
   ffa00: b7 01 00 00 2d 00 00 00      	mov64 r1, 0x2d
   ffa08: b7 02 00 00 2d 00 00 00      	mov64 r2, 0x2d
   ffa10: 18 03 00 00 88 52 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x115288
   ffa20: 85 10 00 00 9f 0a 00 00      	call 0xa9f

00000000000ffa28 <LBB31_140>:
   ffa28: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   ffa30: b7 02 00 00 3a 00 00 00      	mov64 r2, 0x3a
   ffa38: 18 03 00 00 a0 52 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1152a0
   ffa48: 85 10 00 00 9a 0a 00 00      	call 0xa9a

00000000000ffa50 <LBB31_58>:
   ffa50: 18 01 00 00 28 52 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x115228
   ffa60: 85 10 00 00 3a 14 00 00      	call 0x143a

00000000000ffa68 <LBB31_135>:
   ffa68: 18 01 00 00 58 52 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x115258
   ffa78: 85 10 00 00 42 14 00 00      	call 0x1442

00000000000ffa80 <LBB31_136>:
   ffa80: 18 01 00 00 70 52 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x115270
   ffa90: 85 10 00 00 3f 14 00 00      	call 0x143f
