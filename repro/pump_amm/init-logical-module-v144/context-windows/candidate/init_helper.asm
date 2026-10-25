
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000004a998 <_ZN269_$LT$pump_amm_recovered..instructions..token_incentives..init_user_volume_accumulator..InitUserVolumeAccumulator$u20$as$u20$anchor_lang..Accounts$LT$pump_amm_recovered..instructions..token_incentives..init_user_volume_accumulator..InitUserVolumeAccumulatorBumps$GT$$GT$12try_accounts28_$u7b$$u7b$closure$u7d$$u7d$17h3bebcc9ca4e1db6aE>:
   4a998: bf 26 00 00 00 00 00 00      	mov64 r6, r2
   4a9a0: bf 17 00 00 00 00 00 00      	mov64 r7, r1
   4a9a8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4a9b0: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   4a9b8: 79 89 18 00 00 00 00 00      	ldxdw r9, [r8 + 0x18]
   4a9c0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   4a9c8: 18 02 00 00 e0 dc 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10dce0
   4a9d8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   4a9e0: 85 10 00 00 23 81 01 00      	call 0x18123
   4a9e8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   4a9f0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   4a9f8: 15 00 15 00 00 00 00 00      	jeq r0, 0x0, +0x15 <LBB193_4>
   4aa00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4aa08: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   4aa10: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4aa18: 85 10 00 00 a7 75 ff ff      	call -0x8a59
   4aa20: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   4aa28: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB193_2>
   4aa30: 05 00 0d 03 00 00 00 00      	ja +0x30d <LBB193_105>

000000000004aa38 <LBB193_2>:
   4aa38: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   4aa40: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   4aa48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4aa50: 07 01 00 00 a8 fd ff ff      	add64 r1, -0x258
   4aa58: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   4aa68: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   4aa70: 85 10 00 00 09 6e ff ff      	call -0x91f7
   4aa78: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   4aa80: 79 a2 b0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x250]

000000000004aa88 <LBB193_3>:
   4aa88: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   4aa90: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   4aa98: 72 07 59 00 02 00 00 00      	stb [r7 + 0x59], 0x2
   4aaa0: 05 00 af 03 00 00 00 00      	ja +0x3af <LBB193_128>

000000000004aaa8 <LBB193_4>:
   4aaa8: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   4aab0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4aab8: 85 10 00 00 15 5f 01 00      	call 0x15f15
   4aac0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   4aac8: 7b 9a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r9
   4aad0: 15 07 3e 00 00 00 00 00      	jeq r7, 0x0, +0x3e <LBB193_17>
   4aad8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   4aae0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4aae8: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   4aaf0: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   4aaf8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   4ab00: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   4ab08: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   4ab10: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   4ab18: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4ab20: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   4ab28: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4ab30: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   4ab38: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4ab40: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   4ab48: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   4ab50: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   4ab58: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4ab60: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4ab68: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   4ab70: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   4ab78: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   4ab80: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4ab88: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4ab90: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   4ab98: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4aba0: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   4aba8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4abb0: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4abb8: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   4abc0: 85 10 00 00 e7 80 01 00      	call 0x180e7
   4abc8: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   4abd0: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   4abd8: 15 00 de 00 00 00 00 00      	jeq r0, 0x0, +0xde <LBB193_43>
   4abe0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   4abe8: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   4abf0: 85 10 00 00 e9 5b 01 00      	call 0x15be9
   4abf8: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   4ac00: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <LBB193_8>
   4ac08: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1

000000000004ac10 <LBB193_8>:
   4ac10: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   4ac18: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   4ac20: 2d 70 01 00 00 00 00 00      	jgt r0, r7, +0x1 <LBB193_9>
   4ac28: 05 00 b4 01 00 00 00 00      	ja +0x1b4 <LBB193_68>

000000000004ac30 <LBB193_9>:
   4ac30: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   4ac38: 1f 72 00 00 00 00 00 00      	sub64 r2, r7
   4ac40: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   4ac48: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4ac50: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <LBB193_11>
   4ac58: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004ac60 <LBB193_11>:
   4ac60: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4ac68: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <LBB193_13>
   4ac70: bf 24 00 00 00 00 00 00      	mov64 r4, r2

000000000004ac78 <LBB193_13>:
   4ac78: 79 a3 90 fc 00 00 00 00      	ldxdw r3, [r10 - 0x370]
   4ac80: 79 30 08 00 00 00 00 00      	ldxdw r0, [r3 + 0x8]
   4ac88: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   4ac90: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4ac98: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_15>
   4aca0: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0

000000000004aca8 <LBB193_15>:
   4aca8: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   4acb0: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   4acb8: 55 01 17 01 01 00 00 00      	jne r1, 0x1, +0x117 <LBB193_46>
   4acc0: 05 00 0e 00 00 00 00 00      	ja +0xe <LBB193_20>

000000000004acc8 <LBB193_17>:
   4acc8: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   4acd0: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   4acd8: 85 10 00 00 cc 5b 01 00      	call 0x15bcc
   4ace0: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   4ace8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4acf0: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   4acf8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4ad00: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4ad08: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4ad10: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_19>
   4ad18: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004ad20 <LBB193_19>:
   4ad20: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   4ad28: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   4ad30: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_21>

000000000004ad38 <LBB193_20>:
   4ad38: 85 10 00 00 ff ff ff ff      	call -0x1

000000000004ad40 <LBB193_21>:
   4ad40: 79 14 10 00 00 00 00 00      	ldxdw r4, [r1 + 0x10]
   4ad48: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   4ad50: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4ad58: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4ad60: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_23>
   4ad68: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004ad70 <LBB193_23>:
   4ad70: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   4ad78: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   4ad80: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   4ad88: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_25>
   4ad90: 05 00 f4 ff 00 00 00 00      	ja -0xc <LBB193_20>

000000000004ad98 <LBB193_25>:
   4ad98: 7b 7a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r7
   4ada0: 79 85 08 00 00 00 00 00      	ldxdw r5, [r8 + 0x8]
   4ada8: 79 52 00 00 00 00 00 00      	ldxdw r2, [r5 + 0x0]
   4adb0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4adb8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4adc0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_27>
   4adc8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004add0 <LBB193_27>:
   4add0: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   4add8: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   4ade0: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   4ade8: 7b 0a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r0
   4adf0: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   4adf8: 7b 0a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r0
   4ae00: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   4ae08: 7b 0a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r0
   4ae10: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   4ae18: 7b 0a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r0
   4ae20: 79 17 18 00 00 00 00 00      	ldxdw r7, [r1 + 0x18]
   4ae28: 7b 25 00 00 00 00 00 00      	stxdw [r5 + 0x0], r2
   4ae30: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_29>
   4ae38: 05 00 df ff 00 00 00 00      	ja -0x21 <LBB193_20>

000000000004ae40 <LBB193_29>:
   4ae40: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   4ae48: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4ae50: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ae58: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ae60: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_31>
   4ae68: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004ae70 <LBB193_31>:
   4ae70: 7b 5a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r5
   4ae78: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4ae80: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_33>
   4ae88: 05 00 d5 ff 00 00 00 00      	ja -0x2b <LBB193_20>

000000000004ae90 <LBB193_33>:
   4ae90: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4ae98: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   4aea0: 79 52 08 00 00 00 00 00      	ldxdw r2, [r5 + 0x8]
   4aea8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   4aeb0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4aeb8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4aec0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_35>
   4aec8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004aed0 <LBB193_35>:
   4aed0: 71 80 2a 00 00 00 00 00      	ldxb r0, [r8 + 0x2a]
   4aed8: 7b 0a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r0
   4aee0: 71 80 29 00 00 00 00 00      	ldxb r0, [r8 + 0x29]
   4aee8: 7b 0a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r0
   4aef0: 71 80 28 00 00 00 00 00      	ldxb r0, [r8 + 0x28]
   4aef8: 7b 0a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r0
   4af00: 79 80 20 00 00 00 00 00      	ldxdw r0, [r8 + 0x20]
   4af08: 7b 0a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r0
   4af10: 79 80 18 00 00 00 00 00      	ldxdw r0, [r8 + 0x18]
   4af18: 7b 0a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r0
   4af20: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   4af28: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   4af30: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4af38: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_37>
   4af40: 05 00 be ff 00 00 00 00      	ja -0x42 <LBB193_20>

000000000004af48 <LBB193_37>:
   4af48: 7b 7a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r7
   4af50: 7b 4a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r4
   4af58: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4af60: 79 54 10 00 00 00 00 00      	ldxdw r4, [r5 + 0x10]
   4af68: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   4af70: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4af78: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4af80: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_39>
   4af88: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004af90 <LBB193_39>:
   4af90: 79 a0 88 fc 00 00 00 00      	ldxdw r0, [r10 - 0x378]
   4af98: 79 a7 98 fc 00 00 00 00      	ldxdw r7, [r10 - 0x368]
   4afa0: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   4afa8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_41>
   4afb0: 05 00 b0 ff 00 00 00 00      	ja -0x50 <LBB193_20>

000000000004afb8 <LBB193_41>:
   4afb8: 79 51 18 00 00 00 00 00      	ldxdw r1, [r5 + 0x18]
   4afc0: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   4afc8: 79 51 20 00 00 00 00 00      	ldxdw r1, [r5 + 0x20]
   4afd0: 7b 1a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r1
   4afd8: 71 51 28 00 00 00 00 00      	ldxb r1, [r5 + 0x28]
   4afe0: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   4afe8: 71 57 29 00 00 00 00 00      	ldxb r7, [r5 + 0x29]
   4aff0: 71 55 2a 00 00 00 00 00      	ldxb r5, [r5 + 0x2a]
   4aff8: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   4b000: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4b008: 79 13 18 00 00 00 00 00      	ldxdw r3, [r1 + 0x18]
   4b010: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   4b018: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   4b020: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   4b028: 79 13 08 00 00 00 00 00      	ldxdw r3, [r1 + 0x8]
   4b030: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   4b038: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   4b040: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   4b048: 79 61 28 00 00 00 00 00      	ldxdw r1, [r6 + 0x28]
   4b050: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   4b058: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4b060: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   4b068: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   4b070: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4b078: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   4b080: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   4b088: 18 03 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10e58f
   4b098: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   4b0a0: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   4b0a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b0b0: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   4b0b8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   4b0c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b0c8: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   4b0d0: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   4b0d8: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   4b0e0: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   4b0e8: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   4b0f0: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   4b0f8: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   4b100: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   4b108: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   4b110: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   4b118: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   4b120: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   4b128: 7b 9a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r9
   4b130: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   4b138: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   4b140: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   4b148: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   4b150: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   4b158: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   4b160: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   4b168: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   4b170: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   4b178: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   4b180: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   4b188: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   4b190: 79 a1 18 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e8]
   4b198: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   4b1a0: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   4b1a8: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   4b1b0: 7b 0a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r0
   4b1b8: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4b1c0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4b1c8: 73 5a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r5
   4b1d0: 73 7a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r7
   4b1d8: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   4b1e0: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   4b1e8: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   4b1f0: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4b1f8: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   4b200: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4b208: 7b 4a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r4
   4b210: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   4b218: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   4b220: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4b228: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4b230: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4b238: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   4b240: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4b248: 7a 0a c0 fe 01 00 00 00      	stdw [r10 - 0x140], 0x1
   4b250: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4b258: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4b260: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4b268: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   4b270: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   4b278: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b280: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   4b288: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b290: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4b298: 79 a3 98 fc 00 00 00 00      	ldxdw r3, [r10 - 0x368]
   4b2a0: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   4b2a8: 85 10 00 00 92 56 01 00      	call 0x15692
   4b2b0: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   4b2b8: 15 01 e8 01 02 00 00 00      	jeq r1, 0x2, +0x1e8 <LBB193_103>
   4b2c0: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   4b2c8: 05 00 a6 02 00 00 00 00      	ja +0x2a6 <LBB193_126>

000000000004b2d0 <LBB193_43>:
   4b2d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b2d8: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   4b2e0: 18 02 00 00 c0 df 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10dfc0
   4b2f0: 85 10 00 00 55 57 01 00      	call 0x15755
   4b2f8: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   4b300: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   4b308: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   4b310: 18 01 00 00 70 3b 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x113b70
   4b320: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   4b328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b330: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   4b338: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   4b340: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   4b348: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   4b350: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   4b358: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   4b360: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b368: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   4b370: 18 01 00 00 c0 df 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10dfc0
   4b380: 85 10 00 00 0b 59 01 00      	call 0x1590b
   4b388: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <LBB193_45>
   4b390: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4b398: 07 03 00 00 10 fe ff ff      	add64 r3, -0x1f0
   4b3a0: 18 01 00 00 9e de 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10de9e
   4b3b0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   4b3b8: 18 04 00 00 a0 3b 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x113ba0
   4b3c8: 18 05 00 00 c0 3b 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x113bc0
   4b3d8: 85 10 00 00 cd 73 01 00      	call 0x173cd

000000000004b3e0 <LBB193_45>:
   4b3e0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   4b3e8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4b3f0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   4b3f8: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   4b400: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   4b408: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4b410: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   4b418: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4b420: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   4b428: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4b430: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   4b438: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4b440: 18 01 00 00 20 ea 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10ea20
   4b450: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4b458: 62 0a a8 fe 05 10 00 00      	stw [r10 - 0x158], 0x1005
   4b460: 72 0a 60 fe 02 00 00 00      	stb [r10 - 0x1a0], 0x2
   4b468: 62 0a 28 fe 04 00 00 00      	stw [r10 - 0x1d8], 0x4
   4b470: 7a 0a 20 fe 41 00 00 00      	stdw [r10 - 0x1e0], 0x41
   4b478: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4b480: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b488: 07 01 00 00 68 fd ff ff      	add64 r1, -0x298
   4b490: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b498: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4b4a0: 85 10 00 00 cd 52 01 00      	call 0x152cd
   4b4a8: 79 a3 70 fd 00 00 00 00      	ldxdw r3, [r10 - 0x290]
   4b4b0: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   4b4b8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   4b4c0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4b4c8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   4b4d0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   4b4d8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4b4e0: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4b4e8: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4b4f0: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   4b4f8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4b500: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4b508: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   4b510: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4b518: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   4b520: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4b528: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4b530: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4b538: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b540: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   4b548: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4b550: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   4b558: 85 10 00 00 f9 52 01 00      	call 0x152f9
   4b560: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   4b568: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   4b570: 05 00 fc 01 00 00 00 00      	ja +0x1fc <LBB193_109>

000000000004b578 <LBB193_46>:
   4b578: 79 39 10 00 00 00 00 00      	ldxdw r9, [r3 + 0x10]
   4b580: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4b588: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b590: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4b598: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_48>
   4b5a0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004b5a8 <LBB193_48>:
   4b5a8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4b5b0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_50>
   4b5b8: 05 00 ef fe 00 00 00 00      	ja -0x111 <LBB193_20>

000000000004b5c0 <LBB193_50>:
   4b5c0: 7b 4a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r4
   4b5c8: 79 84 08 00 00 00 00 00      	ldxdw r4, [r8 + 0x8]
   4b5d0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   4b5d8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b5e0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4b5e8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_52>
   4b5f0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004b5f8 <LBB193_52>:
   4b5f8: 79 87 00 00 00 00 00 00      	ldxdw r7, [r8 + 0x0]
   4b600: 7b 7a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r7
   4b608: 71 37 2a 00 00 00 00 00      	ldxb r7, [r3 + 0x2a]
   4b610: 7b 7a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r7
   4b618: 71 37 29 00 00 00 00 00      	ldxb r7, [r3 + 0x29]
   4b620: 7b 7a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r7
   4b628: 71 37 28 00 00 00 00 00      	ldxb r7, [r3 + 0x28]
   4b630: 7b 7a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r7
   4b638: 79 37 20 00 00 00 00 00      	ldxdw r7, [r3 + 0x20]
   4b640: 7b 7a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r7
   4b648: 79 33 18 00 00 00 00 00      	ldxdw r3, [r3 + 0x18]
   4b650: 7b 3a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r3
   4b658: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   4b660: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_54>
   4b668: 05 00 d9 fe 00 00 00 00      	ja -0x127 <LBB193_20>

000000000004b670 <LBB193_54>:
   4b670: 79 82 10 00 00 00 00 00      	ldxdw r2, [r8 + 0x10]
   4b678: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   4b680: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b688: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4b690: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_56>
   4b698: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004b6a0 <LBB193_56>:
   4b6a0: 7b 4a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r4
   4b6a8: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4b6b0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_58>
   4b6b8: 05 00 cf fe 00 00 00 00      	ja -0x131 <LBB193_20>

000000000004b6c0 <LBB193_58>:
   4b6c0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4b6c8: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   4b6d0: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   4b6d8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   4b6e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b6e8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4b6f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_60>
   4b6f8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

000000000004b700 <LBB193_60>:
   4b700: 71 87 2a 00 00 00 00 00      	ldxb r7, [r8 + 0x2a]
   4b708: 7b 7a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r7
   4b710: 71 87 29 00 00 00 00 00      	ldxb r7, [r8 + 0x29]
   4b718: 7b 7a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r7
   4b720: 71 87 28 00 00 00 00 00      	ldxb r7, [r8 + 0x28]
   4b728: 7b 7a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r7
   4b730: 79 87 20 00 00 00 00 00      	ldxdw r7, [r8 + 0x20]
   4b738: 7b 7a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r7
   4b740: 79 87 18 00 00 00 00 00      	ldxdw r7, [r8 + 0x18]
   4b748: 7b 7a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r7
   4b750: 79 67 00 00 00 00 00 00      	ldxdw r7, [r6 + 0x0]
   4b758: 7b 7a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r7
   4b760: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4b768: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB193_62>
   4b770: 05 00 b8 fe 00 00 00 00      	ja -0x148 <LBB193_20>

000000000004b778 <LBB193_62>:
   4b778: 7b 9a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r9
   4b780: 7b 5a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r5
   4b788: 79 67 10 00 00 00 00 00      	ldxdw r7, [r6 + 0x10]
   4b790: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   4b798: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b7a0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4b7a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_64>
   4b7b0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0

000000000004b7b8 <LBB193_64>:
   4b7b8: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   4b7c0: 79 a5 88 fc 00 00 00 00      	ldxdw r5, [r10 - 0x378]
   4b7c8: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   4b7d0: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <LBB193_66>
   4b7d8: 05 00 ab fe 00 00 00 00      	ja -0x155 <LBB193_20>

000000000004b7e0 <LBB193_66>:
   4b7e0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4b7e8: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   4b7f0: 79 64 20 00 00 00 00 00      	ldxdw r4, [r6 + 0x20]
   4b7f8: 71 65 28 00 00 00 00 00      	ldxb r5, [r6 + 0x28]
   4b800: 71 60 29 00 00 00 00 00      	ldxb r0, [r6 + 0x29]
   4b808: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   4b810: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   4b818: 73 1a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r1
   4b820: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   4b828: 73 1a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r1
   4b830: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   4b838: 73 1a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r1
   4b840: 79 a1 40 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c0]
   4b848: 7b 1a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r1
   4b850: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   4b858: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   4b860: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   4b868: 79 a2 58 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a8]
   4b870: 7b 2a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r2
   4b878: 79 a2 60 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3a0]
   4b880: 7b 2a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r2
   4b888: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   4b890: 73 2a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r2
   4b898: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   4b8a0: 73 2a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r2
   4b8a8: 79 a2 78 fc 00 00 00 00      	ldxdw r2, [r10 - 0x388]
   4b8b0: 73 2a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r2
   4b8b8: 79 a2 80 fc 00 00 00 00      	ldxdw r2, [r10 - 0x380]
   4b8c0: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   4b8c8: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   4b8d0: 7b 2a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r2
   4b8d8: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   4b8e0: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   4b8e8: 7b 9a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r9
   4b8f0: 79 a2 20 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e0]
   4b8f8: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   4b900: 73 6a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r6
   4b908: 73 0a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r0
   4b910: 73 5a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r5
   4b918: 7b 4a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r4
   4b920: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   4b928: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   4b930: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   4b938: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   4b940: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   4b948: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   4b950: 7a 0a 90 ff 00 00 00 00      	stdw [r10 - 0x70], 0x0
   4b958: 7a 0a 88 ff 08 00 00 00      	stdw [r10 - 0x78], 0x8
   4b960: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   4b968: 7a 0a e8 fe 08 00 00 00      	stdw [r10 - 0x118], 0x8
   4b970: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   4b978: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b980: 07 01 00 00 98 fd ff ff      	add64 r1, -0x268
   4b988: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b990: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   4b998: 79 a3 88 fc 00 00 00 00      	ldxdw r3, [r10 - 0x378]
   4b9a0: 85 10 00 00 1b 56 01 00      	call 0x1561b
   4b9a8: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   4b9b0: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   4b9b8: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <LBB193_68>
   4b9c0: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   4b9c8: 05 00 c6 01 00 00 00 00      	ja +0x1c6 <LBB193_126>

000000000004b9d0 <LBB193_68>:
   4b9d0: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   4b9d8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   4b9e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4b9e8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4b9f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_70>
   4b9f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004ba00 <LBB193_70>:
   4ba00: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   4ba08: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4ba10: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_72>
   4ba18: 05 00 63 fe 00 00 00 00      	ja -0x19d <LBB193_20>

000000000004ba20 <LBB193_72>:
   4ba20: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   4ba28: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4ba30: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ba38: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ba40: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_74>
   4ba48: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004ba50 <LBB193_74>:
   4ba50: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4ba58: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_76>
   4ba60: 05 00 5a fe 00 00 00 00      	ja -0x1a6 <LBB193_20>

000000000004ba68 <LBB193_76>:
   4ba68: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4ba70: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   4ba78: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   4ba80: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   4ba88: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ba90: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ba98: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_78>
   4baa0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004baa8 <LBB193_78>:
   4baa8: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   4bab0: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   4bab8: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   4bac0: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   4bac8: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   4bad0: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   4bad8: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   4bae0: 7b 5a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r5
   4bae8: 79 88 18 00 00 00 00 00      	ldxdw r8, [r8 + 0x18]
   4baf0: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   4baf8: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   4bb00: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   4bb08: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_80>
   4bb10: 05 00 44 fe 00 00 00 00      	ja -0x1bc <LBB193_20>

000000000004bb18 <LBB193_80>:
   4bb18: 79 75 10 00 00 00 00 00      	ldxdw r5, [r7 + 0x10]
   4bb20: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   4bb28: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4bb30: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4bb38: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_82>
   4bb40: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004bb48 <LBB193_82>:
   4bb48: 7b 8a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r8
   4bb50: 7b 9a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r9
   4bb58: 7b 0a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r0
   4bb60: 7b 3a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r3
   4bb68: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   4bb70: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_84>
   4bb78: 05 00 37 fe 00 00 00 00      	ja -0x1c9 <LBB193_20>

000000000004bb80 <LBB193_84>:
   4bb80: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   4bb88: 7b 1a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r1
   4bb90: 79 79 20 00 00 00 00 00      	ldxdw r9, [r7 + 0x20]
   4bb98: 71 72 28 00 00 00 00 00      	ldxb r2, [r7 + 0x28]
   4bba0: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   4bba8: 71 73 2a 00 00 00 00 00      	ldxb r3, [r7 + 0x2a]
   4bbb0: bf 68 00 00 00 00 00 00      	mov64 r8, r6
   4bbb8: 79 86 20 00 00 00 00 00      	ldxdw r6, [r8 + 0x20]
   4bbc0: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   4bbc8: 79 60 18 00 00 00 00 00      	ldxdw r0, [r6 + 0x18]
   4bbd0: 7b 0a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r0
   4bbd8: 79 60 10 00 00 00 00 00      	ldxdw r0, [r6 + 0x10]
   4bbe0: 7b 0a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r0
   4bbe8: 79 60 08 00 00 00 00 00      	ldxdw r0, [r6 + 0x8]
   4bbf0: 7b 0a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r0
   4bbf8: 79 60 00 00 00 00 00 00      	ldxdw r0, [r6 + 0x0]
   4bc00: 7b 0a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r0
   4bc08: 79 80 28 00 00 00 00 00      	ldxdw r0, [r8 + 0x28]
   4bc10: 71 08 00 00 00 00 00 00      	ldxb r8, [r0 + 0x0]
   4bc18: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   4bc20: 07 00 00 00 bf ff ff ff      	add64 r0, -0x41
   4bc28: 7b 0a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r0
   4bc30: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   4bc38: 07 00 00 00 98 ff ff ff      	add64 r0, -0x68
   4bc40: 7b 0a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r0
   4bc48: 18 00 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r0, 0x10e58f
   4bc58: 7b 0a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r0
   4bc60: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   4bc68: 07 00 00 00 c0 ff ff ff      	add64 r0, -0x40
   4bc70: 7b 0a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r0
   4bc78: bf a0 00 00 00 00 00 00      	mov64 r0, r10
   4bc80: 07 00 00 00 c8 fe ff ff      	add64 r0, -0x138
   4bc88: 7b 0a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r0
   4bc90: 73 3a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r3
   4bc98: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   4bca0: 73 2a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r2
   4bca8: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   4bcb0: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   4bcb8: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   4bcc0: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   4bcc8: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   4bcd0: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   4bcd8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4bce0: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   4bce8: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   4bcf0: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   4bcf8: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   4bd00: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   4bd08: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   4bd10: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4bd18: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4bd20: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   4bd28: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4bd30: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   4bd38: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4bd40: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   4bd48: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4bd50: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   4bd58: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4bd60: 73 8a bf ff 00 00 00 00      	stxb [r10 - 0x41], r8
   4bd68: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4bd70: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4bd78: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   4bd80: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4bd88: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   4bd90: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4bd98: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4bda0: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4bda8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4bdb0: 07 01 00 00 88 fd ff ff      	add64 r1, -0x278
   4bdb8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4bdc0: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4bdc8: b7 03 00 00 89 00 00 00      	mov64 r3, 0x89
   4bdd0: 85 10 00 00 49 54 01 00      	call 0x15449
   4bdd8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   4bde0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB193_85>
   4bde8: 05 00 0c 00 00 00 00 00      	ja +0xc <LBB193_89>

000000000004bdf0 <LBB193_85>:
   4bdf0: 7b 8a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r8
   4bdf8: 79 a8 98 fc 00 00 00 00      	ldxdw r8, [r10 - 0x368]
   4be00: 79 83 08 00 00 00 00 00      	ldxdw r3, [r8 + 0x8]
   4be08: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   4be10: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4be18: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4be20: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_87>
   4be28: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004be30 <LBB193_87>:
   4be30: 79 80 00 00 00 00 00 00      	ldxdw r0, [r8 + 0x0]
   4be38: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4be40: 55 02 03 00 01 00 00 00      	jne r2, 0x1, +0x3 <LBB193_90>
   4be48: 05 00 dd fd 00 00 00 00      	ja -0x223 <LBB193_20>

000000000004be50 <LBB193_89>:
   4be50: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   4be58: 05 00 34 01 00 00 00 00      	ja +0x134 <LBB193_126>

000000000004be60 <LBB193_90>:
   4be60: 79 89 10 00 00 00 00 00      	ldxdw r9, [r8 + 0x10]
   4be68: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4be70: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4be78: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4be80: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_92>
   4be88: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004be90 <LBB193_92>:
   4be90: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4be98: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_94>
   4bea0: 05 00 d2 fd 00 00 00 00      	ja -0x22e <LBB193_20>

000000000004bea8 <LBB193_94>:
   4bea8: 79 74 08 00 00 00 00 00      	ldxdw r4, [r7 + 0x8]
   4beb0: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   4beb8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4bec0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4bec8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_96>
   4bed0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0

000000000004bed8 <LBB193_96>:
   4bed8: 79 75 00 00 00 00 00 00      	ldxdw r5, [r7 + 0x0]
   4bee0: 7b 5a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r5
   4bee8: 71 85 2a 00 00 00 00 00      	ldxb r5, [r8 + 0x2a]
   4bef0: 7b 5a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r5
   4bef8: 71 85 29 00 00 00 00 00      	ldxb r5, [r8 + 0x29]
   4bf00: 7b 5a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r5
   4bf08: 71 85 28 00 00 00 00 00      	ldxb r5, [r8 + 0x28]
   4bf10: 7b 5a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r5
   4bf18: 79 85 20 00 00 00 00 00      	ldxdw r5, [r8 + 0x20]
   4bf20: 7b 5a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r5
   4bf28: 79 85 18 00 00 00 00 00      	ldxdw r5, [r8 + 0x18]
   4bf30: 7b 5a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r5
   4bf38: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   4bf40: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <LBB193_98>
   4bf48: 05 00 bd fd 00 00 00 00      	ja -0x243 <LBB193_20>

000000000004bf50 <LBB193_98>:
   4bf50: 79 72 10 00 00 00 00 00      	ldxdw r2, [r7 + 0x10]
   4bf58: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   4bf60: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4bf68: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   4bf70: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <LBB193_100>
   4bf78: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0

000000000004bf80 <LBB193_100>:
   4bf80: 7b 9a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r9
   4bf88: 7b 0a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r0
   4bf90: 7b 3a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r3
   4bf98: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4bfa0: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <LBB193_102>
   4bfa8: 05 00 b1 fd 00 00 00 00      	ja -0x24f <LBB193_20>

000000000004bfb0 <LBB193_102>:
   4bfb0: 79 75 18 00 00 00 00 00      	ldxdw r5, [r7 + 0x18]
   4bfb8: 79 70 20 00 00 00 00 00      	ldxdw r0, [r7 + 0x20]
   4bfc0: 71 79 28 00 00 00 00 00      	ldxb r9, [r7 + 0x28]
   4bfc8: 71 71 29 00 00 00 00 00      	ldxb r1, [r7 + 0x29]
   4bfd0: 71 77 2a 00 00 00 00 00      	ldxb r7, [r7 + 0x2a]
   4bfd8: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   4bfe0: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   4bfe8: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   4bff0: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   4bff8: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   4c000: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   4c008: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   4c010: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   4c018: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4c020: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   4c028: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   4c030: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4c038: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   4c040: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   4c048: 18 03 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r3, 0x10e58f
   4c058: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   4c060: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4c068: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   4c070: 7b 3a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r3
   4c078: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4c080: 07 03 00 00 c8 fe ff ff      	add64 r3, -0x138
   4c088: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   4c090: 73 7a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r7
   4c098: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   4c0a0: 73 9a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r9
   4c0a8: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   4c0b0: 7b 5a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r5
   4c0b8: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   4c0c0: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   4c0c8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   4c0d0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4c0d8: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   4c0e0: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   4c0e8: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   4c0f0: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   4c0f8: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   4c100: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   4c108: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   4c110: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4c118: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   4c120: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4c128: 79 a1 48 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b8]
   4c130: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4c138: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   4c140: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4c148: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   4c150: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4c158: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   4c160: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   4c168: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4c170: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4c178: 7a 0a c8 ff 17 00 00 00      	stdw [r10 - 0x38], 0x17
   4c180: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4c188: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   4c190: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4c198: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4c1a0: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4c1a8: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   4c1b0: 79 61 30 00 00 00 00 00      	ldxdw r1, [r6 + 0x30]
   4c1b8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   4c1c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c1c8: 07 01 00 00 78 fd ff ff      	add64 r1, -0x288
   4c1d0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4c1d8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4c1e0: 85 10 00 00 39 54 01 00      	call 0x15439
   4c1e8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   4c1f0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB193_103>
   4c1f8: 05 00 bf 00 00 00 00 00      	ja +0xbf <LBB193_125>

000000000004c200 <LBB193_103>:
   4c200: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   4c208: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c210: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   4c218: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   4c220: 85 10 00 00 3f 6d ff ff      	call -0x92c1
   4c228: 71 a1 69 fe 00 00 00 00      	ldxb r1, [r10 - 0x197]
   4c230: 79 a9 a0 fc 00 00 00 00      	ldxdw r9, [r10 - 0x360]
   4c238: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB193_104>
   4c240: 05 00 0b 00 00 00 00 00      	ja +0xb <LBB193_105>

000000000004c248 <LBB193_104>:
   4c248: 79 a3 18 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e8]
   4c250: 79 a2 10 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f0]
   4c258: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c260: 07 01 00 00 b8 fc ff ff      	add64 r1, -0x348
   4c268: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   4c278: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   4c280: 85 10 00 00 07 6b ff ff      	call -0x94f9
   4c288: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   4c290: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   4c298: 05 00 fd fc 00 00 00 00      	ja -0x303 <LBB193_3>

000000000004c2a0 <LBB193_105>:
   4c2a0: 7b 6a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r6
   4c2a8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4c2b0: 07 02 00 00 18 fe ff ff      	add64 r2, -0x1e8
   4c2b8: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   4c2c0: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   4c2c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c2d0: 07 01 00 00 b8 fd ff ff      	add64 r1, -0x248
   4c2d8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   4c2e0: 85 10 00 00 fa 7d 01 00      	call 0x17dfa
   4c2e8: 7b 7a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r7
   4c2f0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4c2f8: 85 10 00 00 1c 5c 01 00      	call 0x15c1c
   4c300: 15 00 01 00 89 00 00 00      	jeq r0, 0x89, +0x1 <LBB193_106>
   4c308: 05 00 30 00 00 00 00 00      	ja +0x30 <LBB193_108>

000000000004c310 <LBB193_106>:
   4c310: 79 a8 a8 fc 00 00 00 00      	ldxdw r8, [r10 - 0x358]
   4c318: 79 81 30 00 00 00 00 00      	ldxdw r1, [r8 + 0x30]
   4c320: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   4c328: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   4c330: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   4c338: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   4c340: 85 10 00 00 f7 7d 01 00      	call 0x17df7
   4c348: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   4c350: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   4c358: 15 00 43 00 00 00 00 00      	jeq r0, 0x0, +0x43 <LBB193_110>
   4c360: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c368: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   4c370: b7 02 00 00 d4 07 00 00      	mov64 r2, 0x7d4
   4c378: 85 10 00 00 c2 56 01 00      	call 0x156c2
   4c380: 79 a3 10 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f0]
   4c388: 79 a2 08 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f8]
   4c390: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c398: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   4c3a0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   4c3b0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   4c3b8: 85 10 00 00 e0 6a ff ff      	call -0x9520
   4c3c0: 79 a3 00 fd 00 00 00 00      	ldxdw r3, [r10 - 0x300]
   4c3c8: 79 a2 f8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x308]
   4c3d0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   4c3d8: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4c3e0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   4c3e8: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   4c3f0: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4c3f8: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4c400: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4c408: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   4c410: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   4c418: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4c420: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   4c428: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4c430: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   4c438: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4c440: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   4c448: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4c450: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c458: 07 01 00 00 e8 fc ff ff      	add64 r1, -0x318
   4c460: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4c468: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   4c470: 85 10 00 00 16 51 01 00      	call 0x15116
   4c478: 79 a1 e8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x318]
   4c480: 79 a2 f0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x310]
   4c488: 05 00 19 00 00 00 00 00      	ja +0x19 <LBB193_109>

000000000004c490 <LBB193_108>:
   4c490: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c498: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   4c4a0: b7 02 00 00 e3 07 00 00      	mov64 r2, 0x7e3
   4c4a8: 85 10 00 00 9c 56 01 00      	call 0x1569c
   4c4b0: 79 a3 40 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2c0]
   4c4b8: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   4c4c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c4c8: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   4c4d0: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   4c4e0: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   4c4e8: 85 10 00 00 ba 6a ff ff      	call -0x9546
   4c4f0: 79 a7 30 fd 00 00 00 00      	ldxdw r7, [r10 - 0x2d0]
   4c4f8: 79 a9 28 fd 00 00 00 00      	ldxdw r9, [r10 - 0x2d8]
   4c500: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   4c508: 85 10 00 00 da 5b 01 00      	call 0x15bda
   4c510: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c518: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   4c520: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   4c528: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   4c530: b7 04 00 00 89 00 00 00      	mov64 r4, 0x89
   4c538: bf 05 00 00 00 00 00 00      	mov64 r5, r0
   4c540: 85 10 00 00 11 69 ff ff      	call -0x96ef
   4c548: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   4c550: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]

000000000004c558 <LBB193_109>:
   4c558: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   4c560: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   4c568: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4c570: 05 00 54 00 00 00 00 00      	ja +0x54 <LBB193_127>

000000000004c578 <LBB193_110>:
   4c578: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   4c580: b7 02 00 00 89 00 00 00      	mov64 r2, 0x89
   4c588: 85 10 00 00 b6 58 01 00      	call 0x158b6
   4c590: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   4c598: 79 a6 98 fc 00 00 00 00      	ldxdw r6, [r10 - 0x368]
   4c5a0: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   4c5a8: 79 82 00 00 00 00 00 00      	ldxdw r2, [r8 + 0x0]
   4c5b0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4c5b8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4c5c0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_112>
   4c5c8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004c5d0 <LBB193_112>:
   4c5d0: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4c5d8: 7b 28 00 00 00 00 00 00      	stxdw [r8 + 0x0], r2
   4c5e0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_114>
   4c5e8: 05 00 e9 fc 00 00 00 00      	ja -0x317 <LBB193_20>

000000000004c5f0 <LBB193_114>:
   4c5f0: 79 69 10 00 00 00 00 00      	ldxdw r9, [r6 + 0x10]
   4c5f8: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   4c600: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4c608: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4c610: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <LBB193_116>
   4c618: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0

000000000004c620 <LBB193_116>:
   4c620: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   4c628: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <LBB193_118>
   4c630: 05 00 e0 fc 00 00 00 00      	ja -0x320 <LBB193_20>

000000000004c638 <LBB193_118>:
   4c638: 79 62 18 00 00 00 00 00      	ldxdw r2, [r6 + 0x18]
   4c640: 79 63 20 00 00 00 00 00      	ldxdw r3, [r6 + 0x20]
   4c648: 71 64 28 00 00 00 00 00      	ldxb r4, [r6 + 0x28]
   4c650: 71 65 29 00 00 00 00 00      	ldxb r5, [r6 + 0x29]
   4c658: 71 60 2a 00 00 00 00 00      	ldxb r0, [r6 + 0x2a]
   4c660: 73 0a 3a fe 00 00 00 00      	stxb [r10 - 0x1c6], r0
   4c668: 73 5a 39 fe 00 00 00 00      	stxb [r10 - 0x1c7], r5
   4c670: 73 4a 38 fe 00 00 00 00      	stxb [r10 - 0x1c8], r4
   4c678: 7b 3a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r3
   4c680: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   4c688: 7b 9a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r9
   4c690: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   4c698: 7b 8a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r8
   4c6a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c6a8: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   4c6b0: 85 10 00 00 96 5b 01 00      	call 0x15b96
   4c6b8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   4c6c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4c6c8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   4c6d0: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB193_120>
   4c6d8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   4c6e0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4c6e8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1

000000000004c6f0 <LBB193_120>:
   4c6f0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4c6f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4c700: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4c708: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <LBB193_122>
   4c710: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   4c718: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   4c720: 7b 19 08 00 00 00 00 00      	stxdw [r9 + 0x8], r1

000000000004c728 <LBB193_122>:
   4c728: ad 70 01 00 00 00 00 00      	jlt r0, r7, +0x1 <LBB193_123>
   4c730: 05 00 0f 00 00 00 00 00      	ja +0xf <LBB193_124>

000000000004c738 <LBB193_123>:
   4c738: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c740: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   4c748: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   4c750: 85 10 00 00 47 56 01 00      	call 0x15647
   4c758: 79 a3 e0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x320]
   4c760: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   4c768: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4c770: 07 01 00 00 c8 fc ff ff      	add64 r1, -0x338
   4c778: 18 04 00 00 8f e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e58f
   4c788: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   4c790: 85 10 00 00 65 6a ff ff      	call -0x959b
   4c798: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   4c7a0: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   4c7a8: 05 00 b5 ff 00 00 00 00      	ja -0x4b <LBB193_109>

000000000004c7b0 <LBB193_124>:
   4c7b0: 79 a7 b0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x350]
   4c7b8: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   4c7c0: 07 01 00 00 08 00 00 00      	add64 r1, 0x8
   4c7c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4c7d0: 07 02 00 00 b8 fd ff ff      	add64 r2, -0x248
   4c7d8: b7 03 00 00 58 00 00 00      	mov64 r3, 0x58
   4c7e0: 85 10 00 00 5a 7d 01 00      	call 0x17d5a
   4c7e8: 7b 67 00 00 00 00 00 00      	stxdw [r7 + 0x0], r6
   4c7f0: 05 00 05 00 00 00 00 00      	ja +0x5 <LBB193_128>

000000000004c7f8 <LBB193_125>:
   4c7f8: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]

000000000004c800 <LBB193_126>:
   4c800: 79 a3 b0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x350]
   4c808: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4c810: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2

000000000004c818 <LBB193_127>:
   4c818: 72 03 59 00 02 00 00 00      	stb [r3 + 0x59], 0x2

000000000004c820 <LBB193_128>:
   4c820: 95 00 00 00 00 00 00 00      	exit
