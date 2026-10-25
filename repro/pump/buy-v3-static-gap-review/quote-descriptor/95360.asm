
/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/evidence/original/pump/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   95360: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   95368: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   95370: 55 01 02 00 00 00 00 00      	jne r1, 0x0, +0x2 <.text+0x95268>
   95378: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   95380: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x952e0>
   95388: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   95390: 7b 1a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r1
   95398: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   953a0: 7b 1a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r1
   953a8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   953b0: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   953b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   953c0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   953c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   953d0: 07 02 00 00 d8 fe ff ff      	add64 r2, -0x128
   953d8: 85 10 00 00 2d ce 01 00      	call 0x1ce2d
   953e0: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   953e8: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <.text+0x952f0>
   953f0: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   953f8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   95400: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   95408: 05 00 3f 00 00 00 00 00      	ja +0x3f <.text+0x954e8>
   95410: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   95418: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   95420: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5efc
   95430: 85 10 00 00 e9 83 01 00      	call 0x183e9
   95438: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   95440: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   95448: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   95450: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   95460: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   95468: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   95470: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   95478: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   95480: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   95488: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   95490: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   95498: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   954a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   954a8: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   954b0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5efc
   954c0: 85 10 00 00 38 91 01 00      	call 0x19138
   954c8: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x95400>
   954d0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   954d8: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   954e0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   954f0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   954f8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   95508: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   95518: 85 10 00 00 1f 2f 02 00      	call 0x22f1f
   95520: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   95528: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   95530: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   95538: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   95540: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   95548: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   95550: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   95558: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   95560: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   95568: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   95570: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   95578: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   95580: 18 01 00 00 9f 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b729f
   95590: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   95598: 62 0a 88 ff 88 17 00 00      	stw [r10 - 0x78], 0x1788
   955a0: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   955a8: 62 0a 08 ff 42 00 00 00      	stw [r10 - 0xf8], 0x42
   955b0: 7a 0a 00 ff 26 00 00 00      	stdw [r10 - 0x100], 0x26
   955b8: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   955c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   955c8: 07 01 00 00 b8 fe ff ff      	add64 r1, -0x148
   955d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   955d8: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   955e0: 85 10 00 00 a9 0c 02 00      	call 0x20ca9
   955e8: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   955f0: 79 a2 c0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x140]
   955f8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   95600: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   95608: 95 00 00 00 00 00 00 00      	exit
