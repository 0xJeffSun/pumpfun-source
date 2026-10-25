
work/amm-claim-context-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000001f7f8 <_ZN18pump_amm_recovered10incentives5claim28_$u7b$$u7b$closure$u7d$$u7d$17h724ccd435bcc3043E>:
   1f7f8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   1f800: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f808: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   1f810: 18 02 00 00 70 d6 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10d670
   1f820: 85 10 00 00 39 5d 01 00      	call 0x15d39
   1f828: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   1f830: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   1f838: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   1f840: 18 01 00 00 28 31 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113128
   1f850: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   1f858: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f860: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   1f868: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   1f870: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   1f878: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   1f880: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   1f888: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   1f890: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f898: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   1f8a0: 18 01 00 00 70 d6 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10d670
   1f8b0: 85 10 00 00 1c 68 01 00      	call 0x1681c
   1f8b8: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <LBB133_2>
   1f8c0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   1f8c8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   1f8d0: 18 01 00 00 be d4 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10d4be
   1f8e0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   1f8e8: 18 04 00 00 58 31 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x113158
   1f8f8: 18 05 00 00 78 31 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x113178
   1f908: 85 10 00 00 eb c9 01 00      	call 0x1c9eb

000000000001f910 <LBB133_2>:
   1f910: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   1f918: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   1f920: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   1f928: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   1f930: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   1f938: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   1f940: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   1f948: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   1f950: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   1f958: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   1f960: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   1f968: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   1f970: 18 01 00 00 d5 db 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10dbd5
   1f980: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   1f988: 62 0a 88 ff 88 17 00 00      	stw [r10 - 0x78], 0x1788
   1f990: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   1f998: 62 0a 08 ff 82 00 00 00      	stw [r10 - 0xf8], 0x82
   1f9a0: 7a 0a 00 ff 11 00 00 00      	stdw [r10 - 0x100], 0x11
   1f9a8: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   1f9b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   1f9b8: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   1f9c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   1f9c8: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   1f9d0: 85 10 00 00 eb a8 01 00      	call 0x1a8eb
   1f9d8: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   1f9e0: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   1f9e8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   1f9f0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   1f9f8: 95 00 00 00 00 00 00 00      	exit
