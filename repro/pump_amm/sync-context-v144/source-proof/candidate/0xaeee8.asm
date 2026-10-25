
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/claim-self-transfer-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000aeee8 <_ZN18pump_amm_recovered18pump_amm_recovered28sync_user_volume_accumulator17h15f98f9be68dbd67E>:
   aeee8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   aeef0: 71 27 22 00 00 00 00 00      	ldxb r7, [r2 + 0x22]
   aeef8: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   aef00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   aef08: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   aef10: 85 10 00 00 86 92 00 00      	call 0x9286
   aef18: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   aef20: 55 01 35 00 00 00 00 00      	jne r1, 0x0, +0x35 <LBB413_12>
   aef28: 7b 7a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r7
   aef30: b7 08 00 00 02 00 00 00      	mov64 r8, 0x2
   aef38: 79 a7 58 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa8]
   aef40: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   aef48: 79 12 08 02 00 00 00 00      	ldxdw r2, [r1 + 0x208]
   aef50: cd 27 01 00 00 00 00 00      	jslt r7, r2, +0x1 <LBB413_2>
   aef58: 05 00 3b 00 00 00 00 00      	ja +0x3b <LBB413_13>

00000000000aef60 <LBB413_2>:
   aef60: 79 93 50 00 00 00 00 00      	ldxdw r3, [r9 + 0x50]
   aef68: cd 23 01 00 00 00 00 00      	jslt r3, r2, +0x1 <LBB413_3>
   aef70: 05 00 38 00 00 00 00 00      	ja +0x38 <LBB413_13>

00000000000aef78 <LBB413_3>:
   aef78: 79 95 40 00 00 00 00 00      	ldxdw r5, [r9 + 0x40]
   aef80: 72 09 69 00 00 00 00 00      	stb [r9 + 0x69], 0x0
   aef88: 7a 09 40 00 00 00 00 00      	stdw [r9 + 0x40], 0x0
   aef90: 15 05 34 00 00 00 00 00      	jeq r5, 0x0, +0x34 <LBB413_13>
   aef98: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   aefa0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   aefa8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   aefb0: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   aefb8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   aefc0: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   aefc8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   aefd0: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   aefd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   aefe0: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   aefe8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   aeff0: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   aeff8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   af000: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   af008: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   af010: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af018: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af020: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af028: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af038: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af040: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af048: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af050: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af058: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af060: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_6>
   af068: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af070 <LBB413_6>:
   af070: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_8>
   af078: bf 13 00 00 00 00 00 00      	mov64 r3, r1

00000000000af080 <LBB413_8>:
   af080: 18 01 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007f00
   af090: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_10>
   af098: bf 31 00 00 00 00 00 00      	mov64 r1, r3

00000000000af0a0 <LBB413_10>:
   af0a0: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af0b0: 2d 21 13 00 00 00 00 00      	jgt r1, r2, +0x13 <LBB413_14>

00000000000af0b8 <LBB413_11>:
   af0b8: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af0c0: b7 02 00 00 00 01 00 00      	mov64 r2, 0x100
   af0c8: 85 10 00 00 4d a8 00 00      	call 0xa84d

00000000000af0d0 <LBB413_12>:
   af0d0: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   af0d8: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af0e0: 79 a3 48 ff 00 00 00 00      	ldxdw r3, [r10 - 0xb8]
   af0e8: 7b 3a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r3
   af0f0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   af0f8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   af100: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af108: 07 01 00 00 00 ff ff ff      	add64 r1, -0x100
   af110: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af118: 07 02 00 00 30 ff ff ff      	add64 r2, -0xd0
   af120: 85 10 00 00 85 8a 00 00      	call 0x8a85
   af128: 79 a1 08 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf8]
   af130: 79 a8 00 ff 00 00 00 00      	ldxdw r8, [r10 - 0x100]

00000000000af138 <LBB413_13>:
   af138: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   af140: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   af148: 95 00 00 00 00 00 00 00      	exit

00000000000af150 <LBB413_14>:
   af150: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af160: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af168: 18 02 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r2, -0xa4ae8b8358853b
   af178: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af180: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   af188: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   af190: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   af198: 7b 21 10 00 00 00 00 00      	stxdw [r1 + 0x10], r2
   af1a0: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   af1a8: 7b 21 18 00 00 00 00 00      	stxdw [r1 + 0x18], r2
   af1b0: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   af1b8: 7b 21 20 00 00 00 00 00      	stxdw [r1 + 0x20], r2
   af1c0: 7b 71 38 00 00 00 00 00      	stxdw [r1 + 0x38], r7
   af1c8: 7b 5a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r5
   af1d0: 7b 51 28 00 00 00 00 00      	stxdw [r1 + 0x28], r5
   af1d8: 7a 01 30 00 00 00 00 00      	stdw [r1 + 0x30], 0x0
   af1e0: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   af1e8: 7a 0a a0 ff 40 00 00 00      	stdw [r10 - 0x60], 0x40
   af1f0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af1f8: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   af200: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af208: 85 10 00 00 b0 91 00 00      	call 0x91b0
   af210: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   af218: 79 95 78 00 00 00 00 00      	ldxdw r5, [r9 + 0x78]
   af220: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   af228: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af230: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_16>
   af238: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

00000000000af240 <LBB413_16>:
   af240: 79 92 70 00 00 00 00 00      	ldxdw r2, [r9 + 0x70]
   af248: 7b 2a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r2
   af250: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   af258: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB413_18>

00000000000af260 <LBB413_17>:
   af260: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000af268 <LBB413_18>:
   af268: 79 93 80 00 00 00 00 00      	ldxdw r3, [r9 + 0x80]
   af270: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af278: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af280: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   af288: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_20>
   af290: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

00000000000af298 <LBB413_20>:
   af298: 7b 3a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r3
   af2a0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af2a8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB413_22>
   af2b0: 05 00 f5 ff 00 00 00 00      	ja -0xb <LBB413_17>

00000000000af2b8 <LBB413_22>:
   af2b8: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af2c8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   af2d0: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   af2d8: 07 02 00 00 00 ff ff ff      	add64 r2, -0x100
   af2e0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af2e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af2f0: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_24>
   af2f8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af300 <LBB413_24>:
   af300: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_26>
   af308: bf 23 00 00 00 00 00 00      	mov64 r3, r2

00000000000af310 <LBB413_26>:
   af310: 18 02 00 00 00 7f 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300007f00
   af320: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_28>
   af328: bf 32 00 00 00 00 00 00      	mov64 r2, r3

00000000000af330 <LBB413_28>:
   af330: 7b 5a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r5
   af338: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   af348: 2d 12 01 00 00 00 00 00      	jgt r2, r1, +0x1 <LBB413_30>
   af350: 05 00 ac ff 00 00 00 00      	ja -0x54 <LBB413_11>

00000000000af358 <LBB413_30>:
   af358: 71 91 9a 00 00 00 00 00      	ldxb r1, [r9 + 0x9a]
   af360: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   af368: 71 91 99 00 00 00 00 00      	ldxb r1, [r9 + 0x99]
   af370: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   af378: 71 91 98 00 00 00 00 00      	ldxb r1, [r9 + 0x98]
   af380: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   af388: 79 91 90 00 00 00 00 00      	ldxdw r1, [r9 + 0x90]
   af390: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   af398: 79 99 88 00 00 00 00 00      	ldxdw r9, [r9 + 0x88]
   af3a0: 18 03 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r3, 0x300000000
   af3b0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   af3b8: 18 01 00 00 c5 7a a7 7c 00 00 00 00 74 51 5b ff      	lddw r1, -0xa4ae8b8358853b
   af3c8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af3d0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   af3d8: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1
   af3e0: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   af3e8: 7b 12 10 00 00 00 00 00      	stxdw [r2 + 0x10], r1
   af3f0: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   af3f8: 7b 12 18 00 00 00 00 00      	stxdw [r2 + 0x18], r1
   af400: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   af408: 7b 12 20 00 00 00 00 00      	stxdw [r2 + 0x20], r1
   af410: 7b 72 38 00 00 00 00 00      	stxdw [r2 + 0x38], r7
   af418: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   af420: 7b 12 28 00 00 00 00 00      	stxdw [r2 + 0x28], r1
   af428: 7a 02 30 00 00 00 00 00      	stdw [r2 + 0x30], 0x0
   af430: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   af438: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af440: c5 04 a3 00 00 00 00 00      	jslt r4, 0x0, +0xa3 <LBB413_58>
   af448: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   af450: 18 00 00 00 00 80 00 00 00 00 00 00 03 00 00 00      	lddw r0, 0x300008000
   af460: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB413_33>
   af468: bf 10 00 00 00 00 00 00      	mov64 r0, r1

00000000000af470 <LBB413_33>:
   af470: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   af478: 1f 45 00 00 00 00 00 00      	sub64 r5, r4
   af480: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   af488: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af490: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af498: 2d 05 01 00 00 00 00 00      	jgt r5, r0, +0x1 <LBB413_35>
   af4a0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

00000000000af4a8 <LBB413_35>:
   af4a8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <LBB413_37>
   af4b0: bf 53 00 00 00 00 00 00      	mov64 r3, r5

00000000000af4b8 <LBB413_37>:
   af4b8: 18 04 00 00 08 00 00 00 00 00 00 00 03 00 00 00      	lddw r4, 0x300000008
   af4c8: ad 43 92 00 00 00 00 00      	jlt r3, r4, +0x92 <LBB413_58>
   af4d0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af4e0: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
   af4e8: 18 01 00 00 e4 45 a5 2e 00 00 00 00 51 cb 9a 1d      	lddw r1, 0x1d9acb512ea545e4
   af4f8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   af500: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

00000000000af508 <LBB413_39>:
   af508: bf 34 00 00 00 00 00 00      	mov64 r4, r3
   af510: 0f 14 00 00 00 00 00 00      	add64 r4, r1
   af518: bf 25 00 00 00 00 00 00      	mov64 r5, r2
   af520: 0f 15 00 00 00 00 00 00      	add64 r5, r1
   af528: 71 55 00 00 00 00 00 00      	ldxb r5, [r5 + 0x0]
   af530: 73 54 08 00 00 00 00 00      	stxb [r4 + 0x8], r5
   af538: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   af540: 15 01 01 00 40 00 00 00      	jeq r1, 0x40, +0x1 <LBB413_40>
   af548: 05 00 f7 ff 00 00 00 00      	ja -0x9 <LBB413_39>

00000000000af550 <LBB413_40>:
   af550: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   af560: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   af568: bf 21 00 00 00 00 00 00      	mov64 r1, r2
   af570: 07 01 00 00 de ff ff ff      	add64 r1, -0x22
   af578: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   af580: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   af588: 2d 21 01 00 00 00 00 00      	jgt r1, r2, +0x1 <LBB413_42>
   af590: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000af598 <LBB413_42>:
   af598: 55 05 01 00 00 00 00 00      	jne r5, 0x0, +0x1 <LBB413_44>
   af5a0: bf 14 00 00 00 00 00 00      	mov64 r4, r1

00000000000af5a8 <LBB413_44>:
   af5a8: 18 01 00 00 de 7f 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300007fde
   af5b8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB413_46>
   af5c0: bf 41 00 00 00 00 00 00      	mov64 r1, r4

00000000000af5c8 <LBB413_46>:
   af5c8: 18 02 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000007
   af5d8: 2d 21 03 00 00 00 00 00      	jgt r1, r2, +0x3 <LBB413_48>
   af5e0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   af5e8: b7 02 00 00 22 00 00 00      	mov64 r2, 0x22
   af5f0: 85 10 00 00 ab a7 00 00      	call 0xa7ab

00000000000af5f8 <LBB413_48>:
   af5f8: 18 02 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r2, 0x300000000
   af608: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af610: 79 a7 d0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x130]
   af618: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   af620: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   af628: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   af630: 79 70 18 00 00 00 00 00      	ldxdw r0, [r7 + 0x18]
   af638: 7b 01 18 00 00 00 00 00      	stxdw [r1 + 0x18], r0
   af640: 7b 51 10 00 00 00 00 00      	stxdw [r1 + 0x10], r5
   af648: 7b 41 08 00 00 00 00 00      	stxdw [r1 + 0x8], r4
   af650: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   af658: 6a 01 20 00 01 00 00 00      	sth [r1 + 0x20], 0x1
   af660: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   af668: 7a 0a a8 ff 01 00 00 00      	stdw [r10 - 0x58], 0x1
   af670: 7a 0a 98 ff 01 00 00 00      	stdw [r10 - 0x68], 0x1
   af678: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af680: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   af688: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   af690: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   af698: 07 05 00 00 98 ff ff ff      	add64 r5, -0x68
   af6a0: 18 02 00 00 0c e7 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10e70c
   af6b0: b7 04 00 00 48 00 00 00      	mov64 r4, 0x48
   af6b8: 85 10 00 00 5c 9e 00 00      	call 0x9e5c
   af6c0: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   af6c8: 73 1a c2 ff 00 00 00 00      	stxb [r10 - 0x3e], r1
   af6d0: 79 a1 b0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x150]
   af6d8: 73 1a c1 ff 00 00 00 00      	stxb [r10 - 0x3f], r1
   af6e0: 79 a1 b8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x148]
   af6e8: 73 1a c0 ff 00 00 00 00      	stxb [r10 - 0x40], r1
   af6f0: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   af6f8: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   af700: 7b 9a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r9
   af708: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   af710: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   af718: 79 a9 c8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x138]
   af720: 7b 9a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r9
   af728: 7b 7a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r7
   af730: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af738: 07 01 00 00 d8 ff ff ff      	add64 r1, -0x28
   af740: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   af748: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af750: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af758: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   af760: 18 01 00 00 01 df 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10df01
   af770: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   af778: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   af780: 73 1a ff ff 00 00 00 00      	stxb [r10 - 0x1], r1
   af788: 7a 0a d0 ff 02 00 00 00      	stdw [r10 - 0x30], 0x2
   af790: 7a 0a f0 ff 01 00 00 00      	stdw [r10 - 0x10], 0x1
   af798: 7a 0a e0 ff 11 00 00 00      	stdw [r10 - 0x20], 0x11
   af7a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af7a8: 07 01 00 00 c8 ff ff ff      	add64 r1, -0x38
   af7b0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   af7b8: 7a 0a 08 f0 01 00 00 00      	stdw [r10 - 0xff8], 0x1
   af7c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af7c8: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   af7d0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   af7d8: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   af7e0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   af7e8: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   af7f0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   af7f8: 85 10 00 00 f9 90 00 00      	call 0x90f9
   af800: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   af810: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   af818: 5d 12 10 00 00 00 00 00      	jne r2, r1, +0x10 <LBB413_54>
   af820: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   af828: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af830: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   af838: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_51>
   af840: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   af848: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af850: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

00000000000af858 <LBB413_51>:
   af858: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   af860: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   af868: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af870: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   af878: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB413_53>
   af880: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   af888: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   af890: 7b 12 08 00 00 00 00 00      	stxdw [r2 + 0x8], r1

00000000000af898 <LBB413_53>:
   af898: 05 00 13 ff 00 00 00 00      	ja -0xed <LBB413_13>

00000000000af8a0 <LBB413_54>:
   af8a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   af8a8: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   af8b0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   af8b8: 07 02 00 00 80 ff ff ff      	add64 r2, -0x80
   af8c0: 85 10 00 00 91 89 00 00      	call 0x8991
   af8c8: 79 a2 a8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x58]
   af8d0: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   af8d8: 79 a8 f0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x110]
   af8e0: 79 a3 a0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x60]
   af8e8: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   af8f0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   af8f8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   af900: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB413_56>
   af908: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   af910: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   af918: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

00000000000af920 <LBB413_56>:
   af920: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   af928: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   af930: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   af938: 55 03 ff fe 00 00 00 00      	jne r3, 0x0, -0x101 <LBB413_13>
   af940: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   af948: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   af950: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   af958: 05 00 fb fe 00 00 00 00      	ja -0x105 <LBB413_13>

00000000000af960 <LBB413_58>:
   af960: b7 02 00 00 48 00 00 00      	mov64 r2, 0x48
   af968: 85 10 00 00 39 a7 00 00      	call 0xa739
