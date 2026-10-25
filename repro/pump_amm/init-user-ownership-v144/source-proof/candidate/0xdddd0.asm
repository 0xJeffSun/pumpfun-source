
work/amm-sync-log-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000dddd0 <_ZN92_$LT$pump_amm_recovered..CloseUserVolumeAccumulator$u20$as$u20$anchor_lang..AccountsExit$GT$4exit17h6b0166a174c80ad6E>:
   dddd0: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   dddd8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ddde0: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   ddde8: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   dddf0: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   dddf8: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   dde00: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB505_2>
   dde08: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

00000000000dde10 <LBB505_2>:
   dde10: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   dde18: 7b 51 00 00 00 00 00 00      	stxdw [r1 + 0x0], r5
   dde20: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB505_4>

00000000000dde28 <LBB505_3>:
   dde28: 85 10 00 00 ff ff ff ff      	call -0x1

00000000000dde30 <LBB505_4>:
   dde30: 79 35 10 00 00 00 00 00      	ldxdw r5, [r3 + 0x10]
   dde38: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   dde40: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   dde48: b7 07 00 00 01 00 00 00      	mov64 r7, 0x1
   dde50: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <LBB505_6>
   dde58: b7 07 00 00 00 00 00 00      	mov64 r7, 0x0

00000000000dde60 <LBB505_6>:
   dde60: 7b 05 00 00 00 00 00 00      	stxdw [r5 + 0x0], r0
   dde68: 55 07 01 00 01 00 00 00      	jne r7, 0x1, +0x1 <LBB505_8>
   dde70: 05 00 f6 ff 00 00 00 00      	ja -0xa <LBB505_3>

00000000000dde78 <LBB505_8>:
   dde78: 79 30 18 00 00 00 00 00      	ldxdw r0, [r3 + 0x18]
   dde80: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   dde88: 71 38 28 00 00 00 00 00      	ldxb r8, [r3 + 0x28]
   dde90: 71 39 29 00 00 00 00 00      	ldxb r9, [r3 + 0x29]
   dde98: 71 33 2a 00 00 00 00 00      	ldxb r3, [r3 + 0x2a]
   ddea0: 73 3a ca ff 00 00 00 00      	stxb [r10 - 0x36], r3
   ddea8: 73 9a c9 ff 00 00 00 00      	stxb [r10 - 0x37], r9
   ddeb0: 73 8a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r8
   ddeb8: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   ddec0: 7b 0a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r0
   ddec8: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   dded0: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   dded8: 7b 4a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r4
   ddee0: 79 22 08 00 00 00 00 00      	ldxdw r2, [r2 + 0x8]
   ddee8: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   ddef0: 79 14 00 00 00 00 00 00      	ldxdw r4, [r1 + 0x0]
   ddef8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   ddf00: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   ddf08: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <LBB505_10>
   ddf10: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

00000000000ddf18 <LBB505_10>:
   ddf18: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   ddf20: 7b 41 00 00 00 00 00 00      	stxdw [r1 + 0x0], r4
   ddf28: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB505_12>
   ddf30: 05 00 de ff 00 00 00 00      	ja -0x22 <LBB505_3>

00000000000ddf38 <LBB505_12>:
   ddf38: 79 24 10 00 00 00 00 00      	ldxdw r4, [r2 + 0x10]
   ddf40: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   ddf48: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   ddf50: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   ddf58: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <LBB505_14>
   ddf60: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0

00000000000ddf68 <LBB505_14>:
   ddf68: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   ddf70: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <LBB505_16>
   ddf78: 05 00 d5 ff 00 00 00 00      	ja -0x2b <LBB505_3>

00000000000ddf80 <LBB505_16>:
   ddf80: 79 25 18 00 00 00 00 00      	ldxdw r5, [r2 + 0x18]
   ddf88: 79 20 20 00 00 00 00 00      	ldxdw r0, [r2 + 0x20]
   ddf90: 71 27 28 00 00 00 00 00      	ldxb r7, [r2 + 0x28]
   ddf98: 71 28 29 00 00 00 00 00      	ldxb r8, [r2 + 0x29]
   ddfa0: 71 22 2a 00 00 00 00 00      	ldxb r2, [r2 + 0x2a]
   ddfa8: 73 2a fa ff 00 00 00 00      	stxb [r10 - 0x6], r2
   ddfb0: 73 8a f9 ff 00 00 00 00      	stxb [r10 - 0x7], r8
   ddfb8: 73 7a f8 ff 00 00 00 00      	stxb [r10 - 0x8], r7
   ddfc0: 7b 0a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r0
   ddfc8: 7b 5a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r5
   ddfd0: 7b 4a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r4
   ddfd8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   ddfe0: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   ddfe8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   ddff0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   ddff8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   de000: 07 02 00 00 d0 ff ff ff      	add64 r2, -0x30
   de008: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   de010: 07 03 00 00 a0 ff ff ff      	add64 r3, -0x60
   de018: 85 10 00 00 63 2c 00 00      	call 0x2c63
   de020: b7 01 00 00 02 00 00 00      	mov64 r1, 0x2
   de028: 79 a2 90 ff 00 00 00 00      	ldxdw r2, [r10 - 0x70]
   de030: 15 02 09 00 02 00 00 00      	jeq r2, 0x2, +0x9 <LBB505_18>
   de038: 79 a3 98 ff 00 00 00 00      	ldxdw r3, [r10 - 0x68]
   de040: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   de048: 07 01 00 00 80 ff ff ff      	add64 r1, -0x80
   de050: 18 04 00 00 7f e2 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e27f
   de060: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   de068: 85 10 00 00 4a 47 fe ff      	call -0x1b8b6
   de070: 79 a3 88 ff 00 00 00 00      	ldxdw r3, [r10 - 0x78]
   de078: 79 a1 80 ff 00 00 00 00      	ldxdw r1, [r10 - 0x80]

00000000000de080 <LBB505_18>:
   de080: 7b 36 08 00 00 00 00 00      	stxdw [r6 + 0x8], r3
   de088: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   de090: 95 00 00 00 00 00 00 00      	exit
