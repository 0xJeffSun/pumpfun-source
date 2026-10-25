
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   d3120: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   d3128: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   d3130: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3138: 15 01 4a 00 00 00 00 00      	jeq r1, 0x0, +0x4a <.text+0xd3270>
   d3140: 7b 2a c8 f9 00 00 00 00      	stxdw [r10 - 0x638], r2
   d3148: 79 55 08 f0 00 00 00 00      	ldxdw r5, [r5 - 0xff8]
   d3150: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3158: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   d3160: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3168: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d3170: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   d3178: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d3180: 79 18 08 00 00 00 00 00      	ldxdw r8, [r1 + 0x8]
   d3188: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   d3190: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d3198: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d31a0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd3090>
   d31a8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d31b0: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   d31b8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   d31c0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd30b0>
   d31c8: 85 10 00 00 ff ff ff ff      	call -0x1
   d31d0: 79 19 10 00 00 00 00 00      	ldxdw r9, [r1 + 0x10]
   d31d8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   d31e0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d31e8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d31f0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd30e0>
   d31f8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d3200: 7b 5a c0 f9 00 00 00 00      	stxdw [r10 - 0x640], r5
   d3208: 7b 4a b8 f9 00 00 00 00      	stxdw [r10 - 0x648], r4
   d3210: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   d3218: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd3108>
   d3220: 05 00 f4 ff 00 00 00 00      	ja -0xc <.text+0xd30a8>
   d3228: 71 12 2a 00 00 00 00 00      	ldxb r2, [r1 + 0x2a]
   d3230: 7b 2a a0 f9 00 00 00 00      	stxdw [r10 - 0x660], r2
   d3238: 71 12 29 00 00 00 00 00      	ldxb r2, [r1 + 0x29]
   d3240: 7b 2a 98 f9 00 00 00 00      	stxdw [r10 - 0x668], r2
   d3248: 71 12 28 00 00 00 00 00      	ldxb r2, [r1 + 0x28]
   d3250: 7b 2a 90 f9 00 00 00 00      	stxdw [r10 - 0x670], r2
   d3258: 79 12 20 00 00 00 00 00      	ldxdw r2, [r1 + 0x20]
   d3260: 7b 2a a8 f9 00 00 00 00      	stxdw [r10 - 0x658], r2
   d3268: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   d3270: 7b 1a b0 f9 00 00 00 00      	stxdw [r10 - 0x650], r1
   d3278: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3280: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3288: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d3290: 85 10 00 00 6e 7a fe ff      	call -0x18592
   d3298: 79 a3 10 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f0]
   d32a0: 79 a2 08 fb 00 00 00 00      	ldxdw r2, [r10 - 0x4f8]
   d32a8: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   d32b0: 15 01 2d 00 00 00 00 00      	jeq r1, 0x0, +0x2d <.text+0xd3300>
   d32b8: 7b 1a 88 f9 00 00 00 00      	stxdw [r10 - 0x678], r1
   d32c0: 7b 2a 70 f9 00 00 00 00      	stxdw [r10 - 0x690], r2
   d32c8: 7b 3a 78 f9 00 00 00 00      	stxdw [r10 - 0x688], r3
   d32d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d32d8: 07 01 00 00 20 fd ff ff      	add64 r1, -0x2e0
   d32e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d32e8: 07 02 00 00 18 fb ff ff      	add64 r2, -0x4e8
   d32f0: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   d32f8: 85 10 00 00 b3 8c 00 00      	call 0x8cb3
   d3300: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3308: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3310: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   d3318: 85 10 00 00 2f 7a fe ff      	call -0x185d1
   d3320: 79 a3 08 fb 00 00 00 00      	ldxdw r3, [r10 - 0x4f8]
   d3328: 79 a2 00 fb 00 00 00 00      	ldxdw r2, [r10 - 0x500]
   d3330: 71 a1 59 fb 00 00 00 00      	ldxb r1, [r10 - 0x4a7]
   d3338: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xd3228>
   d3340: 05 00 24 00 00 00 00 00      	ja +0x24 <.text+0xd3348>
   d3348: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3350: 07 01 00 00 00 fa ff ff      	add64 r1, -0x600
   d3358: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d3368: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d3370: 85 10 00 00 40 5d fe ff      	call -0x1a2c0
   d3378: 79 a1 00 fa 00 00 00 00      	ldxdw r1, [r10 - 0x600]
   d3380: 79 a2 08 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5f8]
   d3388: 05 00 d5 00 00 00 00 00      	ja +0xd5 <.text+0xd3918>
   d3390: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3398: 07 01 00 00 e0 f9 ff ff      	add64 r1, -0x620
   d33a0: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d33a8: 85 10 00 00 51 65 00 00      	call 0x6551
   d33b0: 79 a3 e8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x618]
   d33b8: 79 a2 e0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x620]
   d33c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d33c8: 07 01 00 00 d0 f9 ff ff      	add64 r1, -0x630
   d33d0: 18 04 00 00 04 c0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11c004
   d33e0: b7 05 00 00 04 00 00 00      	mov64 r5, 0x4
   d33e8: 85 10 00 00 31 5d fe ff      	call -0x1a2cf
   d33f0: 79 a1 d0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x630]
   d33f8: 79 a2 d8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x628]
   d3400: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d3408: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d3410: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   d3418: 05 00 d4 00 00 00 00 00      	ja +0xd4 <.text+0xd39a0>
   d3420: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3428: 07 01 00 00 f0 f9 ff ff      	add64 r1, -0x610
   d3430: 18 04 00 00 27 ce 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11ce27
   d3440: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   d3448: 85 10 00 00 25 5d fe ff      	call -0x1a2db
   d3450: 79 a1 f0 f9 00 00 00 00      	ldxdw r1, [r10 - 0x610]
   d3458: 79 a2 f8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x608]
   d3460: 05 00 ba 00 00 00 00 00      	ja +0xba <.text+0xd3918>
   d3468: 7b 1a 48 f9 00 00 00 00      	stxdw [r10 - 0x6b8], r1
   d3470: 7b 2a 58 f9 00 00 00 00      	stxdw [r10 - 0x6a8], r2
   d3478: 7b 3a 50 f9 00 00 00 00      	stxdw [r10 - 0x6b0], r3
   d3480: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3488: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   d3490: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d3498: 07 02 00 00 10 fb ff ff      	add64 r2, -0x4f0
   d34a0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   d34a8: 85 10 00 00 7d 8c 00 00      	call 0x8c7d
   d34b0: 61 a1 5a fb 00 00 00 00      	ldxw r1, [r10 - 0x4a6]
   d34b8: 63 1a 28 ff 00 00 00 00      	stxw [r10 - 0xd8], r1
   d34c0: 69 a1 5e fb 00 00 00 00      	ldxh r1, [r10 - 0x4a2]
   d34c8: 6b 1a 2c ff 00 00 00 00      	stxh [r10 - 0xd4], r1
   d34d0: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   d34d8: 15 02 9d 00 00 00 00 00      	jeq r2, 0x0, +0x9d <.text+0xd38a8>
   d34e0: 7b 8a 60 f9 00 00 00 00      	stxdw [r10 - 0x6a0], r8
   d34e8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d34f0: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   d34f8: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   d3500: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   d3508: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   d3510: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   d3518: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   d3520: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   d3528: 7b 4a 80 f9 00 00 00 00      	stxdw [r10 - 0x680], r4
   d3530: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   d3538: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d3540: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d3548: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xd3438>
   d3550: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   d3558: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   d3560: 79 a8 80 f9 00 00 00 00      	ldxdw r8, [r10 - 0x680]
   d3568: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   d3570: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xd3460>
   d3578: 05 00 89 ff 00 00 00 00      	ja -0x77 <.text+0xd30a8>
   d3580: 7b 0a 30 f9 00 00 00 00      	stxdw [r10 - 0x6d0], r0
   d3588: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   d3590: 7b 4a 68 f9 00 00 00 00      	stxdw [r10 - 0x698], r4
   d3598: 79 44 00 00 00 00 00 00      	ldxdw r4, [r4 + 0x0]
   d35a0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   d35a8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   d35b0: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0xd34a0>
   d35b8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   d35c0: 79 a0 68 f9 00 00 00 00      	ldxdw r0, [r10 - 0x698]
   d35c8: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   d35d0: 79 a8 60 f9 00 00 00 00      	ldxdw r8, [r10 - 0x6a0]
   d35d8: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xd34c8>
   d35e0: 05 00 7c ff 00 00 00 00      	ja -0x84 <.text+0xd30a8>
   d35e8: 15 03 9b 00 00 00 00 00      	jeq r3, 0x0, +0x9b <.text+0xd39a8>
   d35f0: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   d35f8: 7b 3a f8 f8 00 00 00 00      	stxdw [r10 - 0x708], r3
   d3600: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   d3608: 7b 3a f0 f8 00 00 00 00      	stxdw [r10 - 0x710], r3
   d3610: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   d3618: 7b 3a e8 f8 00 00 00 00      	stxdw [r10 - 0x718], r3
   d3620: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   d3628: 7b 3a 00 f9 00 00 00 00      	stxdw [r10 - 0x700], r3
   d3630: 79 10 18 00 00 00 00 00      	ldxdw r0, [r1 + 0x18]
   d3638: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   d3640: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   d3648: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   d3650: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   d3658: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   d3660: 79 14 38 00 00 00 00 00      	ldxdw r4, [r1 + 0x38]
   d3668: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   d3670: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d3678: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d3680: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd3570>
   d3688: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d3690: 79 17 30 00 00 00 00 00      	ldxdw r7, [r1 + 0x30]
   d3698: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   d36a0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd3590>
   d36a8: 05 00 63 ff 00 00 00 00      	ja -0x9d <.text+0xd30a8>
   d36b0: 79 15 40 00 00 00 00 00      	ldxdw r5, [r1 + 0x40]
   d36b8: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   d36c0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   d36c8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d36d0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xd35c0>
   d36d8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   d36e0: 7b 7a d8 f8 00 00 00 00      	stxdw [r10 - 0x728], r7
   d36e8: 7b 0a e0 f8 00 00 00 00      	stxdw [r10 - 0x720], r0
   d36f0: 7b 4a 38 f9 00 00 00 00      	stxdw [r10 - 0x6c8], r4
   d36f8: 79 a4 80 f9 00 00 00 00      	ldxdw r4, [r10 - 0x680]
   d3700: 7b 5a 40 f9 00 00 00 00      	stxdw [r10 - 0x6c0], r5
   d3708: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   d3710: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xd3600>
   d3718: 05 00 55 ff 00 00 00 00      	ja -0xab <.text+0xd30a8>
   d3720: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   d3728: 7b 2a 28 f9 00 00 00 00      	stxdw [r10 - 0x6d8], r2
   d3730: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   d3738: 7b 2a 10 f9 00 00 00 00      	stxdw [r10 - 0x6f0], r2
   d3740: 71 12 58 00 00 00 00 00      	ldxb r2, [r1 + 0x58]
   d3748: 7b 2a 08 f9 00 00 00 00      	stxdw [r10 - 0x6f8], r2
   d3750: 79 12 50 00 00 00 00 00      	ldxdw r2, [r1 + 0x50]
   d3758: 7b 2a 18 f9 00 00 00 00      	stxdw [r10 - 0x6e8], r2
   d3760: 79 11 48 00 00 00 00 00      	ldxdw r1, [r1 + 0x48]
   d3768: 7b 1a 20 f9 00 00 00 00      	stxdw [r10 - 0x6e0], r1
   d3770: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3778: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3780: 18 02 00 00 10 2a 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x122a10
   d3790: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d3798: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   d37a0: 85 10 00 00 18 75 00 00      	call 0x7518
   d37a8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   d37b0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   d37b8: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   d37c0: 7b 1a 90 ff 00 00 00 00      	stxdw [r10 - 0x70], r1
   d37c8: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   d37d0: 7b 1a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r1
   d37d8: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   d37e0: 7b 1a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r1
   d37e8: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   d37f0: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   d37f8: 73 12 00 00 00 00 00 00      	stxb [r2 + 0x0], r1
   d3800: 79 a1 88 f9 00 00 00 00      	ldxdw r1, [r10 - 0x678]
   d3808: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   d3810: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d3818: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d3820: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   d3828: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d3830: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3838: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d3840: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3848: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d3850: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3858: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3860: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d3868: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   d3870: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d3878: 85 10 00 00 0c 8c 00 00      	call 0x8c0c
   d3880: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d3888: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d3890: 15 00 5a 00 00 00 00 00      	jeq r0, 0x0, +0x5a <.text+0xd3a48>
   d3898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d38a0: 07 01 00 00 f0 fa ff ff      	add64 r1, -0x510
   d38a8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   d38b0: 85 10 00 00 b0 64 00 00      	call 0x64b0
   d38b8: 79 a3 f8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x508]
   d38c0: 79 a2 f0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x510]
   d38c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d38d0: 07 01 00 00 e0 fa ff ff      	add64 r1, -0x520
   d38d8: 18 04 00 00 27 ce 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11ce27
   d38e8: b7 05 00 00 19 00 00 00      	mov64 r5, 0x19
   d38f0: 85 10 00 00 90 5c fe ff      	call -0x1a370
   d38f8: 79 a3 e8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x518]
   d3900: 79 a2 e0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x520]
   d3908: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d3910: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d3918: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   d3920: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d3928: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3930: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d3938: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3940: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d3948: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]
   d3950: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   d3958: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   d3960: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   d3968: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   d3970: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   d3978: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   d3980: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   d3988: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3990: 07 01 00 00 d0 fa ff ff      	add64 r1, -0x530
   d3998: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d39a0: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   d39a8: 85 10 00 00 04 5f 00 00      	call 0x5f04
   d39b0: 79 a1 d0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x530]
   d39b8: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   d39c0: 05 00 94 00 00 00 00 00      	ja +0x94 <.text+0xd3d48>
   d39c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d39d0: 07 01 00 00 20 fa ff ff      	add64 r1, -0x5e0
   d39d8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d39e0: 85 10 00 00 8a 64 00 00      	call 0x648a
   d39e8: 79 a3 28 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5d8]
   d39f0: 79 a2 20 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e0]
   d39f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3a00: 07 01 00 00 10 fa ff ff      	add64 r1, -0x5f0
   d3a08: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   d3a18: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   d3a20: 85 10 00 00 6a 5c fe ff      	call -0x1a396
   d3a28: 79 a1 10 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5f0]
   d3a30: 79 a2 18 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5e8]
   d3a38: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d3a40: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d3a48: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   d3a50: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   d3a58: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3a60: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   d3a68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd3968>
   d3a70: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   d3a78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3a80: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   d3a88: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   d3a90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3a98: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   d3aa0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd39a0>
   d3aa8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   d3ab0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3ab8: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1
   d3ac0: 95 00 00 00 00 00 00 00      	exit
   d3ac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3ad0: 07 01 00 00 40 fa ff ff      	add64 r1, -0x5c0
   d3ad8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   d3ae0: 85 10 00 00 6a 64 00 00      	call 0x646a
   d3ae8: 79 a3 48 fa 00 00 00 00      	ldxdw r3, [r10 - 0x5b8]
   d3af0: 79 a2 40 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c0]
   d3af8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3b00: 07 01 00 00 30 fa ff ff      	add64 r1, -0x5d0
   d3b08: 18 04 00 00 ca e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ca
   d3b18: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   d3b20: 85 10 00 00 4a 5c fe ff      	call -0x1a3b6
   d3b28: 79 a4 68 f9 00 00 00 00      	ldxdw r4, [r10 - 0x698]
   d3b30: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   d3b38: 79 a1 30 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5d0]
   d3b40: 79 a2 38 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5c8]
   d3b48: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d3b50: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d3b58: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   d3b60: 05 00 75 00 00 00 00 00      	ja +0x75 <.text+0xd3df0>
   d3b68: 79 a1 08 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f8]
   d3b70: 79 a1 10 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6f0]
   d3b78: 79 a1 18 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e8]
   d3b80: 79 a1 20 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6e0]
   d3b88: 79 a1 28 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6d8]
   d3b90: 79 a2 b8 f9 00 00 00 00      	ldxdw r2, [r10 - 0x648]
   d3b98: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   d3ba0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   d3ba8: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   d3bb0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   d3bb8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d3bc0: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   d3bc8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d3bd0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   d3bd8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3be0: 07 01 00 00 e0 ff ff ff      	add64 r1, -0x20
   d3be8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   d3bf0: 18 01 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11cd4b
   d3c00: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   d3c08: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   d3c10: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   d3c18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3c20: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3c28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d3c30: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   d3c38: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   d3c40: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   d3c48: 85 10 00 00 83 74 00 00      	call 0x7483
   d3c50: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   d3c58: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   d3c60: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   d3c68: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   d3c70: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   d3c78: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   d3c80: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   d3c88: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   d3c90: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   d3c98: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   d3ca0: 73 12 01 00 00 00 00 00      	stxb [r2 + 0x1], r1
   d3ca8: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   d3cb0: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   d3cb8: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d3cc0: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d3cc8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   d3cd0: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d3cd8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3ce0: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d3ce8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3cf0: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d3cf8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3d00: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3d08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d3d10: 07 02 00 00 a0 ff ff ff      	add64 r2, -0x60
   d3d18: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d3d20: 85 10 00 00 77 8b 00 00      	call 0x8b77
   d3d28: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d3d30: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d3d38: 15 00 49 00 00 00 00 00      	jeq r0, 0x0, +0x49 <.text+0xd3e68>
   d3d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3d48: 07 01 00 00 c0 fa ff ff      	add64 r1, -0x540
   d3d50: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   d3d58: 85 10 00 00 1b 64 00 00      	call 0x641b
   d3d60: 79 a3 c8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x538]
   d3d68: 79 a2 c0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x540]
   d3d70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3d78: 07 01 00 00 b0 fa ff ff      	add64 r1, -0x550
   d3d80: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d3d90: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d3d98: 85 10 00 00 fb 5b fe ff      	call -0x1a405
   d3da0: 79 a3 b8 fa 00 00 00 00      	ldxdw r3, [r10 - 0x548]
   d3da8: 79 a2 b0 fa 00 00 00 00      	ldxdw r2, [r10 - 0x550]
   d3db0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   d3db8: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d3dc0: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   d3dc8: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d3dd0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3dd8: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d3de0: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3de8: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d3df0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   d3df8: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   d3e00: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   d3e08: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   d3e10: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   d3e18: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   d3e20: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   d3e28: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   d3e30: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3e38: 07 01 00 00 a0 fa ff ff      	add64 r1, -0x560
   d3e40: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d3e48: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   d3e50: 85 10 00 00 6f 5e 00 00      	call 0x5e6f
   d3e58: 79 a1 a0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x560]
   d3e60: 79 a2 a8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x558]
   d3e68: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d3e70: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d3e78: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   d3e80: 79 a7 38 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6c8]
   d3e88: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   d3e90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3e98: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   d3ea0: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   d3ea8: 79 a4 68 f9 00 00 00 00      	ldxdw r4, [r10 - 0x698]
   d3eb0: 79 a2 40 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6c0]
   d3eb8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd3db8>
   d3ec0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   d3ec8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3ed0: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   d3ed8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d3ee0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3ee8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   d3ef0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd3df0>
   d3ef8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d3f00: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3f08: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   d3f10: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   d3f18: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3f20: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   d3f28: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0xd3e28>
   d3f30: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   d3f38: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3f40: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   d3f48: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d3f50: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3f58: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   d3f60: 55 01 5d ff 00 00 00 00      	jne r1, 0x0, -0xa3 <.text+0xd3930>
   d3f68: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   d3f70: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   d3f78: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1
   d3f80: 05 00 59 ff 00 00 00 00      	ja -0xa7 <.text+0xd3930>
   d3f88: 79 a1 58 f9 00 00 00 00      	ldxdw r1, [r10 - 0x6a8]
   d3f90: 71 11 29 00 00 00 00 00      	ldxb r1, [r1 + 0x29]
   d3f98: 15 01 4f 00 00 00 00 00      	jeq r1, 0x0, +0x4f <.text+0xd40f8>
   d3fa0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d3fa8: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d3fb0: 18 02 00 00 d0 29 12 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1229d0
   d3fc0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   d3fc8: 79 a4 c8 f9 00 00 00 00      	ldxdw r4, [r10 - 0x638]
   d3fd0: 85 10 00 00 12 74 00 00      	call 0x7412
   d3fd8: 79 a1 18 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4e8]
   d3fe0: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   d3fe8: 79 a1 10 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f0]
   d3ff0: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   d3ff8: 79 a1 08 fb 00 00 00 00      	ldxdw r1, [r10 - 0x4f8]
   d4000: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   d4008: 79 a1 00 fb 00 00 00 00      	ldxdw r1, [r10 - 0x500]
   d4010: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   d4018: 71 a1 20 fb 00 00 00 00      	ldxb r1, [r10 - 0x4e0]
   d4020: 79 a2 c0 f9 00 00 00 00      	ldxdw r2, [r10 - 0x640]
   d4028: 73 12 02 00 00 00 00 00      	stxb [r2 + 0x2], r1
   d4030: 79 a2 30 f9 00 00 00 00      	ldxdw r2, [r10 - 0x6d0]
   d4038: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   d4040: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d4048: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
   d4050: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d4058: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   d4060: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d4068: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   d4070: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d4078: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4080: 07 01 00 00 00 fb ff ff      	add64 r1, -0x500
   d4088: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d4090: 07 02 00 00 e0 ff ff ff      	add64 r2, -0x20
   d4098: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   d40a0: 85 10 00 00 07 8b 00 00      	call 0x8b07
   d40a8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   d40b0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   d40b8: 79 a7 38 f9 00 00 00 00      	ldxdw r7, [r10 - 0x6c8]
   d40c0: 15 00 39 00 00 00 00 00      	jeq r0, 0x0, +0x39 <.text+0xd4170>
   d40c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d40d0: 07 01 00 00 90 fa ff ff      	add64 r1, -0x570
   d40d8: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   d40e0: 85 10 00 00 aa 63 00 00      	call 0x63aa
   d40e8: 79 a3 98 fa 00 00 00 00      	ldxdw r3, [r10 - 0x568]
   d40f0: 79 a2 90 fa 00 00 00 00      	ldxdw r2, [r10 - 0x570]
   d40f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4100: 07 01 00 00 80 fa ff ff      	add64 r1, -0x580
   d4108: 18 04 00 00 ad e0 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11e0ad
   d4118: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   d4120: 85 10 00 00 8a 5b fe ff      	call -0x1a476
   d4128: 79 a3 88 fa 00 00 00 00      	ldxdw r3, [r10 - 0x578]
   d4130: 79 a2 80 fa 00 00 00 00      	ldxdw r2, [r10 - 0x580]
   d4138: 79 a4 30 f9 00 00 00 00      	ldxdw r4, [r10 - 0x6d0]
   d4140: 79 41 18 00 00 00 00 00      	ldxdw r1, [r4 + 0x18]
   d4148: 7b 1a 18 fb 00 00 00 00      	stxdw [r10 - 0x4e8], r1
   d4150: 79 41 10 00 00 00 00 00      	ldxdw r1, [r4 + 0x10]
   d4158: 7b 1a 10 fb 00 00 00 00      	stxdw [r10 - 0x4f0], r1
   d4160: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   d4168: 7b 1a 08 fb 00 00 00 00      	stxdw [r10 - 0x4f8], r1
   d4170: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   d4178: 7b 1a 00 fb 00 00 00 00      	stxdw [r10 - 0x500], r1
   d4180: 79 a1 e0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x20]
   d4188: 7b 1a 20 fb 00 00 00 00      	stxdw [r10 - 0x4e0], r1
   d4190: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   d4198: 7b 1a 28 fb 00 00 00 00      	stxdw [r10 - 0x4d8], r1
   d41a0: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
   d41a8: 7b 1a 30 fb 00 00 00 00      	stxdw [r10 - 0x4d0], r1
   d41b0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
   d41b8: 7b 1a 38 fb 00 00 00 00      	stxdw [r10 - 0x4c8], r1
   d41c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d41c8: 07 01 00 00 70 fa ff ff      	add64 r1, -0x590
   d41d0: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   d41d8: 07 04 00 00 00 fb ff ff      	add64 r4, -0x500
   d41e0: 85 10 00 00 fd 5d 00 00      	call 0x5dfd
   d41e8: 79 a1 70 fa 00 00 00 00      	ldxdw r1, [r10 - 0x590]
   d41f0: 79 a2 78 fa 00 00 00 00      	ldxdw r2, [r10 - 0x588]
   d41f8: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   d4200: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   d4208: 72 06 0a 03 02 00 00 00      	stb [r6 + 0x30a], 0x2
   d4210: 05 00 8e ff 00 00 00 00      	ja -0x72 <.text+0xd3d68>
   d4218: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4220: 07 01 00 00 60 fa ff ff      	add64 r1, -0x5a0
   d4228: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   d4230: 85 10 00 00 80 63 00 00      	call 0x6380
   d4238: 79 a3 68 fa 00 00 00 00      	ldxdw r3, [r10 - 0x598]
   d4240: 79 a2 60 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a0]
   d4248: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   d4250: 07 01 00 00 50 fa ff ff      	add64 r1, -0x5b0
   d4258: 18 04 00 00 4b cd 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x11cd4b
   d4268: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   d4270: 85 10 00 00 60 5b fe ff      	call -0x1a4a0
   d4278: 79 a1 50 fa 00 00 00 00      	ldxdw r1, [r10 - 0x5b0]
   d4280: 79 a2 58 fa 00 00 00 00      	ldxdw r2, [r10 - 0x5a8]
   d4288: 05 00 7b ff 00 00 00 00      	ja -0x85 <.text+0xd3d48>
   d4290: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   d4298: 07 01 00 00 18 00 00 00      	add64 r1, 0x18
   d42a0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d42a8: 07 02 00 00 20 fd ff ff      	add64 r2, -0x2e0
   d42b0: b7 03 00 00 08 02 00 00      	mov64 r3, 0x208
   d42b8: 85 10 00 00 bb 8a 00 00      	call 0x8abb
   d42c0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   d42c8: 07 01 00 00 30 02 00 00      	add64 r1, 0x230
   d42d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   d42d8: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   d42e0: b7 03 00 00 49 00 00 00      	mov64 r3, 0x49
   d42e8: 85 10 00 00 b5 8a 00 00      	call 0x8ab5
   d42f0: 69 a1 2c ff 00 00 00 00      	ldxh r1, [r10 - 0xd4]
   d42f8: 61 a2 28 ff 00 00 00 00      	ldxw r2, [r10 - 0xd8]
   d4300: 79 a3 48 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b8]
   d4308: 73 36 79 02 00 00 00 00      	stxb [r6 + 0x279], r3
   d4310: 79 a3 90 f9 00 00 00 00      	ldxdw r3, [r10 - 0x670]
   d4318: 73 36 a8 02 00 00 00 00      	stxb [r6 + 0x2a8], r3
   d4320: 79 a3 98 f9 00 00 00 00      	ldxdw r3, [r10 - 0x668]
   d4328: 73 36 a9 02 00 00 00 00      	stxb [r6 + 0x2a9], r3
   d4330: 79 a3 a0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x660]
   d4338: 73 36 aa 02 00 00 00 00      	stxb [r6 + 0x2aa], r3
   d4340: 79 a3 e8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x718]
   d4348: 73 36 d8 02 00 00 00 00      	stxb [r6 + 0x2d8], r3
   d4350: 79 a3 f0 f8 00 00 00 00      	ldxdw r3, [r10 - 0x710]
   d4358: 73 36 d9 02 00 00 00 00      	stxb [r6 + 0x2d9], r3
   d4360: 79 a3 f8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x708]
   d4368: 73 36 da 02 00 00 00 00      	stxb [r6 + 0x2da], r3
   d4370: 79 a3 08 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f8]
   d4378: 73 36 08 03 00 00 00 00      	stxb [r6 + 0x308], r3
   d4380: 79 a3 10 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6f0]
   d4388: 73 36 09 03 00 00 00 00      	stxb [r6 + 0x309], r3
   d4390: 79 a3 28 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d8]
   d4398: 73 36 0a 03 00 00 00 00      	stxb [r6 + 0x30a], r3
   d43a0: 79 a3 18 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e8]
   d43a8: 7b 36 00 03 00 00 00 00      	stxdw [r6 + 0x300], r3
   d43b0: 79 a3 20 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6e0]
   d43b8: 7b 36 f8 02 00 00 00 00      	stxdw [r6 + 0x2f8], r3
   d43c0: 79 a3 40 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6c0]
   d43c8: 7b 36 f0 02 00 00 00 00      	stxdw [r6 + 0x2f0], r3
   d43d0: 7b 76 e8 02 00 00 00 00      	stxdw [r6 + 0x2e8], r7
   d43d8: 79 a3 d8 f8 00 00 00 00      	ldxdw r3, [r10 - 0x728]
   d43e0: 7b 36 e0 02 00 00 00 00      	stxdw [r6 + 0x2e0], r3
   d43e8: 79 a3 00 f9 00 00 00 00      	ldxdw r3, [r10 - 0x700]
   d43f0: 7b 36 d0 02 00 00 00 00      	stxdw [r6 + 0x2d0], r3
   d43f8: 79 a3 e0 f8 00 00 00 00      	ldxdw r3, [r10 - 0x720]
   d4400: 7b 36 c8 02 00 00 00 00      	stxdw [r6 + 0x2c8], r3
   d4408: 79 a3 68 f9 00 00 00 00      	ldxdw r3, [r10 - 0x698]
   d4410: 7b 36 c0 02 00 00 00 00      	stxdw [r6 + 0x2c0], r3
   d4418: 79 a3 80 f9 00 00 00 00      	ldxdw r3, [r10 - 0x680]
   d4420: 7b 36 b8 02 00 00 00 00      	stxdw [r6 + 0x2b8], r3
   d4428: 79 a3 30 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6d0]
   d4430: 7b 36 b0 02 00 00 00 00      	stxdw [r6 + 0x2b0], r3
   d4438: 79 a3 a8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x658]
   d4440: 7b 36 a0 02 00 00 00 00      	stxdw [r6 + 0x2a0], r3
   d4448: 79 a3 b0 f9 00 00 00 00      	ldxdw r3, [r10 - 0x650]
   d4450: 7b 36 98 02 00 00 00 00      	stxdw [r6 + 0x298], r3
   d4458: 7b 96 90 02 00 00 00 00      	stxdw [r6 + 0x290], r9
   d4460: 7b 86 88 02 00 00 00 00      	stxdw [r6 + 0x288], r8
   d4468: 79 a3 b8 f9 00 00 00 00      	ldxdw r3, [r10 - 0x648]
   d4470: 7b 36 80 02 00 00 00 00      	stxdw [r6 + 0x280], r3
   d4478: 79 a3 50 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6b0]
   d4480: 7b 36 28 02 00 00 00 00      	stxdw [r6 + 0x228], r3
   d4488: 79 a3 58 f9 00 00 00 00      	ldxdw r3, [r10 - 0x6a8]
   d4490: 7b 36 20 02 00 00 00 00      	stxdw [r6 + 0x220], r3
   d4498: 79 a3 78 f9 00 00 00 00      	ldxdw r3, [r10 - 0x688]
   d44a0: 7b 36 10 00 00 00 00 00      	stxdw [r6 + 0x10], r3
   d44a8: 79 a3 70 f9 00 00 00 00      	ldxdw r3, [r10 - 0x690]
   d44b0: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   d44b8: 79 a3 88 f9 00 00 00 00      	ldxdw r3, [r10 - 0x678]
   d44c0: 7b 36 00 00 00 00 00 00      	stxdw [r6 + 0x0], r3
   d44c8: 63 26 7a 02 00 00 00 00      	stxw [r6 + 0x27a], r2
   d44d0: 6b 16 7e 02 00 00 00 00      	stxh [r6 + 0x27e], r1
   d44d8: 05 00 bc fe 00 00 00 00      	ja -0x144 <.text+0xd39a0>
