   9e178: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   9e180: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   9e188: a5 01 14 00 08 00 00 00      	jlt r1, 0x8, +0x14 <.text+0x9e110>
   9e190: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   9e198: 79 38 00 00 00 00 00 00      	ldxdw r8, [r3 + 0x0]
   9e1a0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9e1a8: 07 04 00 00 08 00 00 00      	add64 r4, 0x8
   9e1b0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9e1b8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9e1c0: 07 04 00 00 f8 ff ff ff      	add64 r4, -0x8
   9e1c8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9e1d0: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9e0c0>
   9e1d8: 05 00 17 00 00 00 00 00      	ja +0x17 <.text+0x9e178>
   9e1e0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e1f0: 85 10 00 00 8d 15 02 00      	call 0x2158d
   9e1f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e200: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   9e208: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e210: 85 10 00 00 48 fb 01 00      	call 0x1fb48
   9e218: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   9e220: 79 a2 f8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x108]
   9e228: 05 00 09 00 00 00 00 00      	ja +0x9 <.text+0x9e158>
   9e230: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e240: 85 10 00 00 83 15 02 00      	call 0x21583
   9e248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e250: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   9e258: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e260: 85 10 00 00 3e fb 01 00      	call 0x1fb3e
   9e268: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   9e270: 79 a2 e8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x118]
   9e278: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   9e280: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   9e288: 72 06 9d 00 02 00 00 00      	stb [r6 + 0x9d], 0x2
   9e290: 95 00 00 00 00 00 00 00      	exit
   9e298: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   9e2a0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9e2a8: 07 04 00 00 10 00 00 00      	add64 r4, 0x10
   9e2b0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9e2b8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9e2c0: 07 04 00 00 f0 ff ff ff      	add64 r4, -0x10
   9e2c8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9e2d0: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9e1c0>
   9e2d8: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9e210>
   9e2e0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e2f0: 85 10 00 00 6d 15 02 00      	call 0x2156d
   9e2f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e300: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   9e308: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e310: 85 10 00 00 28 fb 01 00      	call 0x1fb28
   9e318: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   9e320: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   9e328: 05 00 e9 ff 00 00 00 00      	ja -0x17 <.text+0x9e158>
   9e330: 79 37 10 00 00 00 00 00      	ldxdw r7, [r3 + 0x10]
   9e338: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9e340: 07 04 00 00 18 00 00 00      	add64 r4, 0x18
   9e348: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9e350: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9e358: 07 04 00 00 e8 ff ff ff      	add64 r4, -0x18
   9e360: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9e368: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9e258>
   9e370: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9e2a8>
   9e378: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e388: 85 10 00 00 5a 15 02 00      	call 0x2155a
   9e390: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e398: 07 01 00 00 10 ff ff ff      	add64 r1, -0xf0
   9e3a0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e3a8: 85 10 00 00 15 fb 01 00      	call 0x1fb15
   9e3b0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   9e3b8: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   9e3c0: 05 00 d6 ff 00 00 00 00      	ja -0x2a <.text+0x9e158>
   9e3c8: 79 35 18 00 00 00 00 00      	ldxdw r5, [r3 + 0x18]
   9e3d0: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9e3d8: 07 04 00 00 20 00 00 00      	add64 r4, 0x20
   9e3e0: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9e3e8: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9e3f0: 07 04 00 00 e0 ff ff ff      	add64 r4, -0x20
   9e3f8: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9e400: a5 04 01 00 08 00 00 00      	jlt r4, 0x8, +0x1 <.text+0x9e2f0>
   9e408: 05 00 0a 00 00 00 00 00      	ja +0xa <.text+0x9e340>
   9e410: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e420: 85 10 00 00 47 15 02 00      	call 0x21547
   9e428: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e430: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   9e438: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e440: 85 10 00 00 02 fb 01 00      	call 0x1fb02
   9e448: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   9e450: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   9e458: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x9e158>
   9e460: 79 30 20 00 00 00 00 00      	ldxdw r0, [r3 + 0x20]
   9e468: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   9e470: 07 04 00 00 28 00 00 00      	add64 r4, 0x28
   9e478: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
   9e480: bf 14 00 00 00 00 00 00      	mov64 r4, r1
   9e488: 07 04 00 00 d8 ff ff ff      	add64 r4, -0x28
   9e490: 7b 42 08 00 00 00 00 00      	stxdw [r2 + 0x8], r4
   9e498: 15 04 20 00 00 00 00 00      	jeq r4, 0x0, +0x20 <.text+0x9e480>
   9e4a0: 07 01 00 00 d7 ff ff ff      	add64 r1, -0x29
   9e4a8: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   9e4b0: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   9e4b8: 07 03 00 00 29 00 00 00      	add64 r3, 0x29
   9e4c0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   9e4c8: 73 4a b7 ff 00 00 00 00      	stxb [r10 - 0x49], r4
   9e4d0: a5 04 23 00 02 00 00 00      	jlt r4, 0x2, +0x23 <.text+0x9e4d0>
   9e4d8: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
   9e4e8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   9e4f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e4f8: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   9e500: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   9e508: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
   9e518: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9e520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e528: 07 01 00 00 b7 ff ff ff      	add64 r1, -0x49
   9e530: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9e538: 7a 0a f0 ff 00 00 00 00      	stdw [r10 - 0x10], 0x0
   9e540: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   9e548: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   9e550: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   9e558: 07 07 00 00 b8 ff ff ff      	add64 r7, -0x48
   9e560: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   9e568: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   9e570: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   9e578: 85 10 00 00 99 19 02 00      	call 0x21999
   9e580: b7 01 00 00 14 00 00 00      	mov64 r1, 0x14
   9e588: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   9e590: 85 10 00 00 5f d7 fe ff      	call -0x128a1
   9e598: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x9e498>
   9e5a0: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
   9e5b0: 85 10 00 00 15 15 02 00      	call 0x21515
   9e5b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e5c0: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   9e5c8: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   9e5d0: 85 10 00 00 d0 fa 01 00      	call 0x1fad0
   9e5d8: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   9e5e0: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   9e5e8: 05 00 91 ff 00 00 00 00      	ja -0x6f <.text+0x9e158>
   9e5f0: 7b 0a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r0
   9e5f8: 7b 4a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r4
   9e600: 7b 5a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r5
   9e608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e610: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e618: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   9e620: 85 10 00 00 91 e2 fe ff      	call -0x11d6f
   9e628: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e630: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9e550>
   9e638: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9e640: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e648: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   9e650: 85 10 00 00 c0 fa 01 00      	call 0x1fac0
   9e658: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   9e660: 79 a2 88 ff 00 00 00 00      	ldxdw r2, [r10 - 0x78]
   9e668: 05 00 81 ff 00 00 00 00      	ja -0x7f <.text+0x9e158>
   9e670: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9e678: 63 1a ab ff 00 00 00 00      	stxw [r10 - 0x55], r1
   9e680: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9e688: 63 1a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r1
   9e690: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9e698: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   9e6a0: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9e6a8: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   9e6b0: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9e6b8: 73 1a a0 ff 00 00 00 00      	stxb [r10 - 0x60], r1
   9e6c0: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9e6c8: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   9e6d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e6d8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e6e0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e6e8: 85 10 00 00 2f dd fe ff      	call -0x122d1
   9e6f0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e6f8: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9e618>
   9e700: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9e708: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e710: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   9e718: 85 10 00 00 a7 fa 01 00      	call 0x1faa7
   9e720: 79 a1 70 ff 00 00 00 00      	ldxdw r1, [r10 - 0x90]
   9e728: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   9e730: 05 00 68 ff 00 00 00 00      	ja -0x98 <.text+0x9e158>
   9e738: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   9e740: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9e748: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   9e750: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e758: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e760: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e768: 85 10 00 00 1f dd fe ff      	call -0x122e1
   9e770: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e778: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9e698>
   9e780: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9e788: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e790: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   9e798: 85 10 00 00 97 fa 01 00      	call 0x1fa97
   9e7a0: 79 a1 60 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa0]
   9e7a8: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   9e7b0: 05 00 58 ff 00 00 00 00      	ja -0xa8 <.text+0x9e158>
   9e7b8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9e7c0: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9e7c8: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   9e7d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e7d8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e7e0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e7e8: 85 10 00 00 58 e2 fe ff      	call -0x11da8
   9e7f0: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e7f8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9e6e8>
   9e800: 05 00 24 00 00 00 00 00      	ja +0x24 <.text+0x9e808>
   9e808: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   9e810: 61 a1 d4 ff 00 00 00 00      	ldxw r1, [r10 - 0x2c]
   9e818: 63 1a b3 ff 00 00 00 00      	stxw [r10 - 0x4d], r1
   9e820: 61 a1 d1 ff 00 00 00 00      	ldxw r1, [r10 - 0x2f]
   9e828: 63 1a b0 ff 00 00 00 00      	stxw [r10 - 0x50], r1
   9e830: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   9e838: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   9e840: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   9e848: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   9e850: 71 a1 f0 ff 00 00 00 00      	ldxb r1, [r10 - 0x10]
   9e858: 73 1a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r1
   9e860: 79 a1 d8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x28]
   9e868: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   9e870: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e878: 07 01 00 00 50 ff ff ff      	add64 r1, -0xb0
   9e880: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e888: 85 10 00 00 bf dc fe ff      	call -0x12341
   9e890: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   9e898: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   9e8a0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x9e790>
   9e8a8: 05 00 10 00 00 00 00 00      	ja +0x10 <.text+0x9e810>
   9e8b0: 7b 2a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r2
   9e8b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e8c0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e8c8: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e8d0: 85 10 00 00 f2 dc fe ff      	call -0x1230e
   9e8d8: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e8e0: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <.text+0x9e808>
   9e8e8: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9e8f0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   9e8f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e900: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   9e908: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   9e910: 85 10 00 00 ea dc fe ff      	call -0x12316
   9e918: 71 a1 d0 ff 00 00 00 00      	ldxb r1, [r10 - 0x30]
   9e920: 15 01 07 00 00 00 00 00      	jeq r1, 0x0, +0x7 <.text+0x9e840>
   9e928: 79 a2 d8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x28]
   9e930: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   9e938: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   9e940: 85 10 00 00 62 fa 01 00      	call 0x1fa62
   9e948: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   9e950: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   9e958: 05 00 23 ff 00 00 00 00      	ja -0xdd <.text+0x9e158>
   9e960: 71 a1 d1 ff 00 00 00 00      	ldxb r1, [r10 - 0x2f]
   9e968: 61 a2 ab ff 00 00 00 00      	ldxw r2, [r10 - 0x55]
   9e970: 63 26 03 00 00 00 00 00      	stxw [r6 + 0x3], r2
   9e978: 61 a2 a8 ff 00 00 00 00      	ldxw r2, [r10 - 0x58]
   9e980: 63 26 00 00 00 00 00 00      	stxw [r6 + 0x0], r2
   9e988: 71 a2 a0 ff 00 00 00 00      	ldxb r2, [r10 - 0x60]
   9e990: 73 26 1f 00 00 00 00 00      	stxb [r6 + 0x1f], r2
   9e998: 79 a2 98 ff 00 00 00 00      	ldxdw r2, [r10 - 0x68]
   9e9a0: 7b 26 17 00 00 00 00 00      	stxdw [r6 + 0x17], r2
   9e9a8: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   9e9b0: 7b 26 0f 00 00 00 00 00      	stxdw [r6 + 0xf], r2
   9e9b8: 61 a2 b0 ff 00 00 00 00      	ldxw r2, [r10 - 0x50]
   9e9c0: 63 26 20 00 00 00 00 00      	stxw [r6 + 0x20], r2
   9e9c8: 61 a2 b3 ff 00 00 00 00      	ldxw r2, [r10 - 0x4d]
   9e9d0: 63 26 23 00 00 00 00 00      	stxw [r6 + 0x23], r2
   9e9d8: 71 a3 c8 ff 00 00 00 00      	ldxb r3, [r10 - 0x38]
   9e9e0: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
   9e9e8: 79 a4 b8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x48]
   9e9f0: 79 a5 b8 fe 00 00 00 00      	ldxdw r5, [r10 - 0x148]
   9e9f8: 7b 56 07 00 00 00 00 00      	stxdw [r6 + 0x7], r5
   9ea00: 79 a5 a0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x160]
   9ea08: 7b 56 27 00 00 00 00 00      	stxdw [r6 + 0x27], r5
   9ea10: 7b 86 40 00 00 00 00 00      	stxdw [r6 + 0x40], r8
   9ea18: 7b 96 48 00 00 00 00 00      	stxdw [r6 + 0x48], r9
   9ea20: 7b 76 50 00 00 00 00 00      	stxdw [r6 + 0x50], r7
   9ea28: 79 a5 d0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x130]
   9ea30: 7b 56 58 00 00 00 00 00      	stxdw [r6 + 0x58], r5
   9ea38: 79 a5 c0 fe 00 00 00 00      	ldxdw r5, [r10 - 0x140]
   9ea40: 7b 56 60 00 00 00 00 00      	stxdw [r6 + 0x60], r5
   9ea48: 7b 46 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r4
   9ea50: 7b 26 37 00 00 00 00 00      	stxdw [r6 + 0x37], r2
   9ea58: 79 a2 98 fe 00 00 00 00      	ldxdw r2, [r10 - 0x168]
   9ea60: 7b 26 68 00 00 00 00 00      	stxdw [r6 + 0x68], r2
   9ea68: 73 36 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r3
   9ea70: 72 06 98 00 00 00 00 00      	stb [r6 + 0x98], 0x0
   9ea78: 7a 06 70 00 00 00 00 00      	stdw [r6 + 0x70], 0x0
   9ea80: 7a 06 78 00 00 00 00 00      	stdw [r6 + 0x78], 0x0
   9ea88: 7a 06 80 00 00 00 00 00      	stdw [r6 + 0x80], 0x0
   9ea90: 7a 06 88 00 00 00 00 00      	stdw [r6 + 0x88], 0x0
   9ea98: 7a 06 90 00 00 00 00 00      	stdw [r6 + 0x90], 0x0
   9eaa0: 73 16 9d 00 00 00 00 00      	stxb [r6 + 0x9d], r1
   9eaa8: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   9eab0: 73 16 9c 00 00 00 00 00      	stxb [r6 + 0x9c], r1
   9eab8: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   9eac0: 73 16 9b 00 00 00 00 00      	stxb [r6 + 0x9b], r1
   9eac8: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   9ead0: 73 16 9a 00 00 00 00 00      	stxb [r6 + 0x9a], r1
   9ead8: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   9eae0: 73 16 99 00 00 00 00 00      	stxb [r6 + 0x99], r1
   9eae8: 05 00 f4 fe 00 00 00 00      	ja -0x10c <.text+0x9e170>
