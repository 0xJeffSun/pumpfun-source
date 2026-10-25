   9d008: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9d010: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9d018: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9cfa0>
   9d020: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9d028: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9d030: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d038: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9d040: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d048: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d050: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9d058: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d060: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9cf50>
   9d068: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9d008>
   9d070: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d080: 85 10 00 00 bb 17 02 00      	call 0x217bb
   9d088: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d090: 07 01 00 00 08 ff ff ff      	add64 r1, -0xf8
   9d098: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d0a0: 85 10 00 00 76 fd 01 00      	call 0x1fd76
   9d0a8: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   9d0b0: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   9d0b8: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9cfe8>
   9d0c0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d0d0: 85 10 00 00 b1 17 02 00      	call 0x217b1
   9d0d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d0e0: 07 01 00 00 f8 fe ff ff      	add64 r1, -0x108
   9d0e8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d0f0: 85 10 00 00 6c fd 01 00      	call 0x1fd6c
   9d0f8: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   9d100: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   9d108: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9d110: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9d118: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9d120: 95 00 00 00 00 00 00 00      	exit
   9d128: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9d130: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d138: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9d140: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d148: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d150: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9d158: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d160: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d050>
   9d168: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9d0a0>
   9d170: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d180: 85 10 00 00 9b 17 02 00      	call 0x2179b
   9d188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d190: 07 01 00 00 18 ff ff ff      	add64 r1, -0xe8
   9d198: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d1a0: 85 10 00 00 56 fd 01 00      	call 0x1fd56
   9d1a8: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   9d1b0: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   9d1b8: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9cfe8>
   9d1c0: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9d1c8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d1d0: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9d1d8: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d1e0: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d1e8: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9d1f0: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d1f8: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d0e8>
   9d200: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9d138>
   9d208: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d218: 85 10 00 00 88 17 02 00      	call 0x21788
   9d220: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d228: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   9d230: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d238: 85 10 00 00 43 fd 01 00      	call 0x1fd43
   9d240: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   9d248: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   9d250: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9cfe8>
   9d258: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9d260: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d268: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9d270: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d278: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d280: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9d288: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d290: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9d180>
   9d298: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9d1d0>
   9d2a0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d2b0: 85 10 00 00 75 17 02 00      	call 0x21775
   9d2b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d2c0: 07 01 00 00 38 ff ff ff      	add64 r1, -0xc8
   9d2c8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d2d0: 85 10 00 00 30 fd 01 00      	call 0x1fd30
   9d2d8: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   9d2e0: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   9d2e8: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9cfe8>
   9d2f0: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9d2f8: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9d300: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9d308: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9d310: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9d318: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9d320: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9d328: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9d310>
   9d330: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9d338: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9d340: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9d348: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9d350: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9d358: 73 4a b7 ff 00 00 00 00      	stxb [r10 - 0x49], r4
   9d360: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9d360>
   9d368: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9d378: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9d380: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d388: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   9d390: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   9d398: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9d3a8: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   9d3b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d3b8: 07 01 00 00 b7 ff ff ff      	add64 r1, -0x49
   9d3c0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9d3c8: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9d3d0: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9d3d8: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   9d3e0: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9d3e8: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   9d3f0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9d3f8: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   9d400: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9d408: 85 10 00 00 c7 1b 02 00      	call 0x21bc7
   9d410: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9d418: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9d420: 85 10 00 00 8d d9 fe ff      	call -0x12673
   9d428: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9d328>
   9d430: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9d440: 85 10 00 00 43 17 02 00      	call 0x21743
   9d448: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d450: 07 01 00 00 48 ff ff ff      	add64 r1, -0xb8
   9d458: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9d460: 85 10 00 00 fe fc 01 00      	call 0x1fcfe
   9d468: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   9d470: 79 a2 50 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb0]
   9d478: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9cfe8>
   9d480: 7b 0a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r0
   9d488: 7b 4a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r4
   9d490: 7b 5a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r5
   9d498: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d4a0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9d4a8: 7b 2a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r2
   9d4b0: 85 10 00 00 bf e4 fe ff      	call -0x11b41
   9d4b8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9d4c0: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9d3e0>
   9d4c8: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9d4d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d4d8: 07 01 00 00 88 ff ff ff      	add64 r1, -0x78
   9d4e0: 85 10 00 00 ee fc 01 00      	call 0x1fcee
   9d4e8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   9d4f0: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   9d4f8: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x9cfe8>
   9d500: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9d508: 63 1a b3 ff 00 00 00 00      	stxw [r10 - 0x4d], r1
   9d510: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9d518: 63 1a b0 ff 00 00 00 00      	stxw [r10 - 0x50], r1
   9d520: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9d528: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9d530: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9d538: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   9d540: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9d548: 73 1a a8 ff 00 00 00 00      	stxb [r10 - 0x58], r1
   9d550: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9d558: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   9d560: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d568: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9d570: 79 a2 f0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x110]
   9d578: 85 10 00 00 5d df fe ff      	call -0x120a3
   9d580: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9d588: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9d4a8>
   9d590: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9d598: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d5a0: 07 01 00 00 78 ff ff ff      	add64 r1, -0x88
   9d5a8: 85 10 00 00 d5 fc 01 00      	call 0x1fcd5
   9d5b0: 79 a1 78 ff 00 00 00 00      	ldxdw r1, [r10 - 0x88]
   9d5b8: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   9d5c0: 05 00 68 ff 00 00 00 00      	ja -0x98 <.text+0x9cfe8>
   9d5c8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   9d5d0: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9d5d8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   9d5e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d5e8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9d5f0: 79 a2 f0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x110]
   9d5f8: 85 10 00 00 4d df fe ff      	call -0x120b3
   9d600: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9d608: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9d528>
   9d610: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9d618: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d620: 07 01 00 00 68 ff ff ff      	add64 r1, -0x98
   9d628: 85 10 00 00 c5 fc 01 00      	call 0x1fcc5
   9d630: 79 a1 68 ff 00 00 00 00      	ldxdw r1, [r10 - 0x98]
   9d638: 79 a2 70 ff 00 00 00 00      	ldxdw r2, [r10 - 0x90]
   9d640: 05 00 58 ff 00 00 00 00      	ja -0xa8 <.text+0x9cfe8>
   9d648: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   9d650: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9d658: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   9d660: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d668: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9d670: 79 a2 f0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x110]
   9d678: 85 10 00 00 86 e4 fe ff      	call -0x11b7a
   9d680: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9d688: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9d5a8>
   9d690: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9d698: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9d6a0: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   9d6a8: 85 10 00 00 b5 fc 01 00      	call 0x1fcb5
   9d6b0: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   9d6b8: 79 a2 60 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa0]
   9d6c0: 05 00 48 ff 00 00 00 00      	ja -0xb8 <.text+0x9cfe8>
   9d6c8: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9d6d0: 63 16 23 00 00 00 00 00      	stxw [r6 + 0x23], r1
   9d6d8: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9d6e0: 63 16 20 00 00 00 00 00      	stxw [r6 + 0x20], r1
   9d6e8: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9d6f0: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   9d6f8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
   9d700: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   9d708: 71 a3 f0 ff 00 00 00 00      	ldxb r3, [r10 - 0x10]
   9d710: 73 3a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r3
   9d718: 79 a4 d8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x28]
   9d720: 73 36 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r3
   9d728: 7b 26 37 00 00 00 00 00      	stxdw [r6 + 0x37], r2
   9d730: 7b 16 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r1
   9d738: 61 a1 b0 ff 00 00 00 00      	ldxw r1, [r10 - 0x50]
   9d740: 63 16 00 00 00 00 00 00      	stxw [r6 + 0x0], r1
   9d748: 61 a1 b3 ff 00 00 00 00      	ldxw r1, [r10 - 0x4d]
   9d750: 63 16 03 00 00 00 00 00      	stxw [r6 + 0x3], r1
   9d758: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   9d760: 7b 16 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r1
   9d768: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   9d770: 7b 16 17 00 00 00 00 00      	stxdw [r6 + 0x17], r1
   9d778: 71 a1 a8 ff 00 00 00 00      	ldxb r1, [r10 - 0x58]
   9d780: 73 16 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r1
   9d788: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   9d790: 7b 16 60 00 00 00 00 00      	stxdw [r6 + 0x60], r1
   9d798: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   9d7a0: 7b 16 58 00 00 00 00 00      	stxdw [r6 + 0x58], r1
   9d7a8: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9d7b0: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9d7b8: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9d7c0: 7b 46 27 00 00 00 00 00      	stxdw [r6 + 0x27], r4
   9d7c8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   9d7d0: 7b 16 07 00 00 00 00 00      	stxdw [r6 + 0x7], r1
   9d7d8: 7a 06 68 00 00 00 00 00      	stdw [r6 + 0x68], 0x0
   9d7e0: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   9d7e8: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   9d7f0: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9d7f8: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9d800: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9d808: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9d810: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   9d818: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9d820: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   9d828: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9d830: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9d838: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9d840: 6a 06 9c 00 00 00 00 00      	sth [r6 + 0x9c], 0x0
   9d848: 05 00 1a ff 00 00 00 00      	ja -0xe6 <.text+0x9d000>
