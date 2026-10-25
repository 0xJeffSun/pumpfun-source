
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   e70b8: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   e70c0: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   e70c8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   e70d0: 7b 1a 90 f9 00 00 00 00      	stxdw [r10 - 0x670], r1
   e70d8: 18 01 00 00 e6 e8 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11e8e6
   e70e8: b7 02 00 00 26 00 00 00      	mov64 r2, 0x26
   e70f0: 85 10 00 00 ff ff ff ff      	call -0x1
   e70f8: 72 0a cf f9 ff 00 00 00      	stb [r10 - 0x631], 0xff
   e7100: 6a 0a cd f9 ff ff 00 00      	sth [r10 - 0x633], 0xffff
   e7108: 7b 8a d8 f9 00 00 00 00      	stxdw [r10 - 0x628], r8
   e7110: 7b 9a d0 f9 00 00 00 00      	stxdw [r10 - 0x630], r9
   e7118: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7120: 07 01 00 00 cd f9 ff ff      	add64 r1, -0x633
   e7128: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   e7130: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7138: 07 01 00 00 f0 fc ff ff      	add64 r1, -0x310
   e7140: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   e7148: 07 03 00 00 d0 f9 ff ff      	add64 r3, -0x630
   e7150: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e7158: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   e7160: 85 10 00 00 f7 d7 ff ff      	call -0x2809
   e7168: 79 a9 f8 fc 00 00 00 00      	ldxdw r9, [r10 - 0x308]
   e7170: 79 a8 f0 fc 00 00 00 00      	ldxdw r8, [r10 - 0x310]
   e7178: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   e7180: 15 06 94 00 02 00 00 00      	jeq r6, 0x2, +0x94 <.text+0xe7508>
   e7188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7190: 07 01 00 00 f0 f9 ff ff      	add64 r1, -0x610
   e7198: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e71a0: 07 02 00 00 00 fd ff ff      	add64 r2, -0x300
   e71a8: b7 03 00 00 fa 02 00 00      	mov64 r3, 0x2fa
   e71b0: 85 10 00 00 dc 64 00 00      	call 0x64dc
   e71b8: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   e71c0: 63 1a eb fc 00 00 00 00      	stxw [r10 - 0x315], r1
   e71c8: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   e71d0: 73 1a ef fc 00 00 00 00      	stxb [r10 - 0x311], r1
   e71d8: 73 6a ea fc 00 00 00 00      	stxb [r10 - 0x316], r6
   e71e0: 7b 9a e8 f9 00 00 00 00      	stxdw [r10 - 0x618], r9
   e71e8: 7b 8a e0 f9 00 00 00 00      	stxdw [r10 - 0x620], r8
   e71f0: 69 a1 cd f9 00 00 00 00      	ldxh r1, [r10 - 0x633]
   e71f8: 6b 1a 10 fd 00 00 00 00      	stxh [r10 - 0x2f0], r1
   e7200: 71 a1 cf f9 00 00 00 00      	ldxb r1, [r10 - 0x631]
   e7208: 73 1a 12 fd 00 00 00 00      	stxb [r10 - 0x2ee], r1
   e7210: 79 a1 d8 f9 00 00 00 00      	ldxdw r1, [r10 - 0x628]
   e7218: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   e7220: 79 a1 d0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x630]
   e7228: 7b 1a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r1
   e7230: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7238: 07 01 00 00 e0 f9 ff ff      	add64 r1, -0x620
   e7240: 7b 1a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r1
   e7248: 7b 7a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r7
   e7250: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7258: 07 01 00 00 b8 f9 ff ff      	add64 r1, -0x648
   e7260: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e7268: 07 02 00 00 f0 fc ff ff      	add64 r2, -0x310
   e7270: 85 10 00 00 35 ed fe ff      	call -0x112cb
   e7278: 79 a8 b8 f9 00 00 00 00      	ldxdw r8, [r10 - 0x648]
   e7280: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0xe7170>
   e7288: 05 00 42 00 00 00 00 00      	ja +0x42 <.text+0xe7380>
   e7290: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e7298: 07 01 00 00 a8 f9 ff ff      	add64 r1, -0x658
   e72a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e72a8: 07 02 00 00 00 fc ff ff      	add64 r2, -0x400
   e72b0: 18 03 00 00 3e e5 11 00 00 00 00 00 00 00 00 00      	lddw r3, 0x11e53e
   e72c0: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   e72c8: 85 10 00 00 bd 3a fe ff      	call -0x1c543
   e72d0: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   e72d8: 79 a2 a8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x658]
   e72e0: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <.text+0xe7210>
   e72e8: 79 a3 b0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x650]
   e72f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e72f8: 07 01 00 00 98 f9 ff ff      	add64 r1, -0x668
   e7300: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   e7310: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   e7318: 85 10 00 00 4b 35 fe ff      	call -0x1cab5
   e7320: 79 a9 a0 f9 00 00 00 00      	ldxdw r9, [r10 - 0x660]
   e7328: 79 a8 98 f9 00 00 00 00      	ldxdw r8, [r10 - 0x668]
   e7330: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   e7338: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   e7340: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e7348: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7350: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e7358: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe7258>
   e7360: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e7368: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7370: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e7378: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e7380: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7388: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7390: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe7290>
   e7398: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e73a0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e73a8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e73b0: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   e73b8: 79 a2 98 fc 00 00 00 00      	ldxdw r2, [r10 - 0x368]
   e73c0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e73c8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e73d0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e73d8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe72d8>
   e73e0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e73e8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e73f0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e73f8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e7400: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7408: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7410: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe7310>
   e7418: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7420: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7428: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e7430: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   e7438: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   e7440: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e7448: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7450: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e7458: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe7358>
   e7460: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e7468: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7470: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e7478: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e7480: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7488: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7490: 55 02 32 00 00 00 00 00      	jne r2, 0x0, +0x32 <.text+0xe7508>
   e7498: 05 00 2e 00 00 00 00 00      	ja +0x2e <.text+0xe74f0>
   e74a0: 79 a9 c0 f9 00 00 00 00      	ldxdw r9, [r10 - 0x640]
   e74a8: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   e74b0: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   e74b8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e74c0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e74c8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e74d0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe73d0>
   e74d8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e74e0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e74e8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e74f0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e74f8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7500: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7508: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe7408>
   e7510: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7518: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7520: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e7528: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   e7530: 79 a2 98 fc 00 00 00 00      	ldxdw r2, [r10 - 0x368]
   e7538: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e7540: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7548: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e7550: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe7450>
   e7558: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e7560: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7568: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e7570: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e7578: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7580: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7588: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe7488>
   e7590: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7598: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e75a0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e75a8: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   e75b0: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   e75b8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e75c0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e75c8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e75d0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe74d0>
   e75d8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e75e0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e75e8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e75f0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e75f8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7600: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7608: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe7508>
   e7610: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7618: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7620: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e7628: 79 a1 90 f9 00 00 00 00      	ldxdw r1, [r10 - 0x670]
   e7630: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   e7638: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   e7640: 95 00 00 00 00 00 00 00      	exit
