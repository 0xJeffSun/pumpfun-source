   48378: bf 58 00 00 00 00 00 00      	mov64 r8, r5
   48380: bf 37 00 00 00 00 00 00      	mov64 r7, r3
   48388: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   48390: 7b 2a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r2
   48398: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   483a0: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   483a8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   483b0: 85 10 00 00 4f 91 ff ff      	call -0x6eb1 ; target 0x10e30
   483b8: 79 a3 28 ff 00 00 00 00      	ldxdw r3, [r10 - 0xd8]
   483c0: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   483c8: 55 02 2a 00 02 00 00 00      	jne r2, 0x2, +0x2a <.text+0x48400> ; branch 0x48520
   483d0: 79 89 08 f0 00 00 00 00      	ldxdw r9, [r8 - 0xff8]
   483d8: 7b 3a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r3
   483e0: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   483e8: 15 01 2f 00 00 00 00 00      	jeq r1, 0x0, +0x2f <.text+0x48448> ; branch 0x48568
   483f0: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   483f8: 7b 2a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r2
   48400: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48408: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   48410: 07 02 00 00 30 00 00 00      	add64 r2, 0x30
   48418: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   48420: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48428: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   48430: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   48438: 85 10 00 00 d3 92 ff ff      	call -0x6d2d ; target 0x11ad8
   48440: 79 a3 28 ff 00 00 00 00      	ldxdw r3, [r10 - 0xd8]
   48448: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   48450: 55 02 29 00 02 00 00 00      	jne r2, 0x2, +0x29 <.text+0x48480> ; branch 0x485a0
   48458: 7b 3a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r3
   48460: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   48468: 55 02 34 00 00 00 00 00      	jne r2, 0x0, +0x34 <.text+0x484f0> ; branch 0x48610
   48470: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48478: 07 01 00 00 e0 fc ff ff      	add64 r1, -0x320
   48480: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   48488: 85 10 00 00 8c cf 00 00      	call 0xcf8c ; target 0xb00f0
   48490: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]
   48498: 15 02 01 00 02 00 00 00      	jeq r2, 0x2, +0x1 <.text+0x48388> ; branch 0x484a8
   484a0: 05 00 94 00 00 00 00 00      	ja +0x94 <.text+0x48828> ; branch 0x48948
   484a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   484b0: 07 01 00 00 c0 fc ff ff      	add64 r1, -0x340
   484b8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   484c0: 85 10 00 00 85 cf 00 00      	call 0xcf85 ; target 0xb00f0
   484c8: 79 a3 c8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x338]
   484d0: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   484d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   484e0: 07 01 00 00 b0 fc ff ff      	add64 r1, -0x350
   484e8: 18 04 00 00 24 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a24 ; data 'event_authorityprogramsystem_programconfig_program_idprograms/pump-fees/src/instructions/admin/initialize_fee_'
   484f8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   48500: 85 10 00 00 10 72 ff ff      	call -0x8df0 ; target 0x1588
   48508: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   48510: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   48518: 05 00 18 00 00 00 00 00      	ja +0x18 <.text+0x484c0> ; branch 0x485e0
   48520: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48528: 07 01 00 00 30 fe ff ff      	add64 r1, -0x1d0
   48530: 18 04 00 00 9b 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a9b ; data 'adminprograms/pump-fees/src/instructions/admin/initialize_fee_program_global.rsfee-program-globalfee_program_g'
   48540: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   48548: 85 10 00 00 07 72 ff ff      	call -0x8df9 ; target 0x1588
   48550: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   48558: 79 a2 38 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1c8]
   48560: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x484c0> ; branch 0x485e0
   48568: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48570: 07 01 00 00 a0 fc ff ff      	add64 r1, -0x360
   48578: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   48580: 85 10 00 00 6d cf 00 00      	call 0xcf6d ; target 0xb00f0
   48588: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   48590: 79 a2 a8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x358]
   48598: 05 00 08 00 00 00 00 00      	ja +0x8 <.text+0x484c0> ; branch 0x485e0
   485a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   485a8: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   485b0: 18 04 00 00 3a 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a3a ; data 'system_programconfig_program_idprograms/pump-fees/src/instructions/admin/initialize_fee_config.rsadminprograms'
   485c0: b7 05 00 00 0e 00 00 00      	mov64 r5, 0xe
   485c8: 85 10 00 00 f7 71 ff ff      	call -0x8e09 ; target 0x1588
   485d0: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   485d8: 79 a2 28 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1d8]
   485e0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   485e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   485f0: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   48600: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   48608: 95 00 00 00 00 00 00 00      	exit
   48610: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   48618: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   48620: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   48628: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   48630: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   48638: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   48640: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   48648: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   48650: 15 03 ca ff 00 00 00 00      	jeq r3, 0x0, -0x36 <.text+0x48388> ; branch 0x484a8
   48658: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   48660: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   48668: 07 03 00 00 30 00 00 00      	add64 r3, 0x30
   48670: 7b 37 00 00 00 00 00 00      	stxdw [r7 + 0x0], r3
   48678: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   48680: 07 03 00 00 fe ff ff ff      	add64 r3, -0x2
   48688: 7b 37 08 00 00 00 00 00      	stxdw [r7 + 0x8], r3
   48690: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   48698: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   486a0: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   486a8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   486b0: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x485a0> ; branch 0x486c0
   486b8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   486c0: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   486c8: 7b 8a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r8
   486d0: 7b 40 00 00 00 00 00 00      	stxdw [r0 + 0x0], r4
   486d8: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x485c8> ; branch 0x486e8
   486e0: 85 10 00 00 ff ff ff ff      	call -0x1 ; external abort
   486e8: 79 18 10 00 00 00 00 00      	ldxdw r8, [r1 + 0x10]
   486f0: 79 84 00 00 00 00 00 00      	ldxdw r4, [r8 + 0x0]
   486f8: 07 04 00 00 01 00 00 00      	add64 r4, 0x1
   48700: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   48708: 15 04 01 00 00 00 00 00      	jeq r4, 0x0, +0x1 <.text+0x485f8> ; branch 0x48718
   48710: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   48718: 7b 48 00 00 00 00 00 00      	stxdw [r8 + 0x0], r4
   48720: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x48610> ; branch 0x48730
   48728: 05 00 f6 ff 00 00 00 00      	ja -0xa <.text+0x485c0> ; branch 0x486e0
   48730: 15 03 4c 00 00 00 00 00      	jeq r3, 0x0, +0x4c <.text+0x48878> ; branch 0x48998
   48738: 71 13 2a 00 00 00 00 00      	ldxb r3, [r1 + 0x2a]
   48740: 7b 3a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r3
   48748: 71 13 29 00 00 00 00 00      	ldxb r3, [r1 + 0x29]
   48750: 7b 3a 48 fc 00 00 00 00      	stxdw [r10 - 0x3b8], r3
   48758: 71 13 28 00 00 00 00 00      	ldxb r3, [r1 + 0x28]
   48760: 7b 3a 40 fc 00 00 00 00      	stxdw [r10 - 0x3c0], r3
   48768: 79 13 20 00 00 00 00 00      	ldxdw r3, [r1 + 0x20]
   48770: 7b 3a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r3
   48778: 79 15 18 00 00 00 00 00      	ldxdw r5, [r1 + 0x18]
   48780: 07 02 00 00 fd ff ff ff      	add64 r2, -0x3
   48788: 7b 27 08 00 00 00 00 00      	stxdw [r7 + 0x8], r2
   48790: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   48798: 07 02 00 00 60 00 00 00      	add64 r2, 0x60
   487a0: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   487a8: 79 14 38 00 00 00 00 00      	ldxdw r4, [r1 + 0x38]
   487b0: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   487b8: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   487c0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   487c8: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x486b8> ; branch 0x487d8
   487d0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   487d8: 79 17 30 00 00 00 00 00      	ldxdw r7, [r1 + 0x30]
   487e0: 7b 7a 38 fc 00 00 00 00      	stxdw [r10 - 0x3c8], r7
   487e8: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   487f0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x486e0> ; branch 0x48800
   487f8: 05 00 dc ff 00 00 00 00      	ja -0x24 <.text+0x485c0> ; branch 0x486e0
   48800: 79 17 40 00 00 00 00 00      	ldxdw r7, [r1 + 0x40]
   48808: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   48810: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   48818: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   48820: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x48710> ; branch 0x48830
   48828: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   48830: 7b 9a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r9
   48838: 7b 8a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r8
   48840: 7b 5a 30 fc 00 00 00 00      	stxdw [r10 - 0x3d0], r5
   48848: 7b 4a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r4
   48850: 7b 0a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r0
   48858: 7b 7a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r7
   48860: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   48868: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x48758> ; branch 0x48878
   48870: 05 00 cd ff 00 00 00 00      	ja -0x33 <.text+0x485c0> ; branch 0x486e0
   48878: 71 12 5a 00 00 00 00 00      	ldxb r2, [r1 + 0x5a]
   48880: 7b 2a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r2
   48888: 71 12 59 00 00 00 00 00      	ldxb r2, [r1 + 0x59]
   48890: 7b 2a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r2
   48898: 71 19 58 00 00 00 00 00      	ldxb r9, [r1 + 0x58]
   488a0: 79 18 50 00 00 00 00 00      	ldxdw r8, [r1 + 0x50]
   488a8: 79 17 48 00 00 00 00 00      	ldxdw r7, [r1 + 0x48]
   488b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   488b8: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   488c0: 85 10 00 00 22 d1 00 00      	call 0xd122 ; target 0xb11d8
   488c8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   488d0: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   488d8: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   488e0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   488e8: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   488f0: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   488f8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   48900: 15 01 28 00 00 00 00 00      	jeq r1, 0x0, +0x28 <.text+0x48928> ; branch 0x48a48
   48908: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48910: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   48918: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   48920: 07 02 00 00 80 fe ff ff      	add64 r2, -0x180
   48928: 85 10 00 00 39 c9 00 00      	call 0xc939 ; target 0xad2f8
   48930: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   48938: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]
   48940: 05 00 8a 00 00 00 00 00      	ja +0x8a <.text+0x48c78> ; branch 0x48d98
   48948: 79 a3 e8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x318]
   48950: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48958: 07 01 00 00 d0 fc ff ff      	add64 r1, -0x330
   48960: 18 04 00 00 48 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a48 ; data 'config_program_idprograms/pump-fees/src/instructions/admin/initialize_fee_config.rsadminprograms/pump-fees/src'
   48970: b7 05 00 00 11 00 00 00      	mov64 r5, 0x11
   48978: 85 10 00 00 81 71 ff ff      	call -0x8e7f ; target 0x1588
   48980: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   48988: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   48990: 05 00 89 ff 00 00 00 00      	ja -0x77 <.text+0x484c0> ; branch 0x485e0
   48998: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   489a0: 07 01 00 00 00 fd ff ff      	add64 r1, -0x300
   489a8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
   489b0: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   489b8: 85 10 00 00 e6 ce 00 00      	call 0xcee6 ; target 0xb00f0
   489c0: 79 a3 08 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2f8]
   489c8: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   489d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   489d8: 07 01 00 00 f0 fc ff ff      	add64 r1, -0x310
   489e0: 18 04 00 00 33 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a33 ; data 'programsystem_programconfig_program_idprograms/pump-fees/src/instructions/admin/initialize_fee_config.rsadminp'
   489f0: b7 05 00 00 07 00 00 00      	mov64 r5, 0x7
   489f8: 85 10 00 00 71 71 ff ff      	call -0x8e8f ; target 0x1588
   48a00: bf 74 00 00 00 00 00 00      	mov64 r4, r7
   48a08: 79 a1 f0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x310]
   48a10: 79 a2 f8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x308]
   48a18: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   48a20: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   48a28: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   48a38: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   48a40: 05 00 81 00 00 00 00 00      	ja +0x81 <.text+0x48d30> ; branch 0x48e50
   48a48: 7b 9a 18 fc 00 00 00 00      	stxdw [r10 - 0x3e8], r9
   48a50: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   48a58: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   48a60: 7b 8a 20 fc 00 00 00 00      	stxdw [r10 - 0x3e0], r8
   48a68: 7b 7a 28 fc 00 00 00 00      	stxdw [r10 - 0x3d8], r7
   48a70: 79 a1 90 fe 00 00 00 00      	ldxdw r1, [r10 - 0x170]
   48a78: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   48a80: 79 a1 88 fe 00 00 00 00      	ldxdw r1, [r10 - 0x178]
   48a88: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   48a90: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   48a98: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   48aa0: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   48aa8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   48ab0: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   48ab8: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   48ac0: 79 14 08 00 00 00 00 00      	ldxdw r4, [r1 + 0x8]
   48ac8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   48ad0: 18 05 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r5, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   48ae0: 7b 5a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r5
   48ae8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   48af0: 07 05 00 00 c0 fe ff ff      	add64 r5, -0x140
   48af8: 7b 5a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r5
   48b00: 7b 1a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r1
   48b08: 7b 4a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r4
   48b10: 7b 3a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r3
   48b18: 7b 2a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r2
   48b20: 7a 0a b8 ff 0a 00 00 00      	stdw [r10 - 0x48], 0xa
   48b28: 7a 0a c8 ff 20 00 00 00      	stdw [r10 - 0x38], 0x20
   48b30: 79 a4 40 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1c0]
   48b38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48b40: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   48b48: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   48b50: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   48b58: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   48b60: 85 10 00 00 e6 dd 00 00      	call 0xdde6 ; target 0xb7a98
   48b68: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   48b70: 7b 1a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r1
   48b78: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   48b80: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   48b88: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   48b90: 7b 1a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r1
   48b98: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   48ba0: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   48ba8: 71 a1 40 ff 00 00 00 00      	ldxb r1, [r10 - 0xc0]
   48bb0: 73 1a bf fe 00 00 00 00      	stxb [r10 - 0x141], r1
   48bb8: 79 a9 60 fc 00 00 00 00      	ldxdw r9, [r10 - 0x3a0]
   48bc0: 73 19 00 00 00 00 00 00      	stxb [r9 + 0x0], r1
   48bc8: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   48bd0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   48bd8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   48be0: 7b 2a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r2
   48be8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   48bf0: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   48bf8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   48c00: 7b 2a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r2
   48c08: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   48c10: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   48c18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48c20: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   48c28: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   48c30: 07 02 00 00 98 fe ff ff      	add64 r2, -0x168
   48c38: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   48c40: 85 10 00 00 5d f3 00 00      	call 0xf35d ; target 0xc2730
   48c48: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   48c50: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   48c58: 15 00 4d 00 00 00 00 00      	jeq r0, 0x0, +0x4d <.text+0x48da8> ; branch 0x48ec8
   48c60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48c68: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   48c70: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   48c78: 85 10 00 00 8e ce 00 00      	call 0xce8e ; target 0xb00f0
   48c80: 79 a3 08 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1f8]
   48c88: 79 a2 00 fe 00 00 00 00      	ldxdw r2, [r10 - 0x200]
   48c90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48c98: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   48ca0: 18 04 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   48cb0: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   48cb8: 85 10 00 00 19 71 ff ff      	call -0x8ee7 ; target 0x1588
   48cc0: 79 a3 f8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x208]
   48cc8: 79 a2 f0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x210]
   48cd0: 79 a1 50 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b0]
   48cd8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   48ce0: 79 14 18 00 00 00 00 00      	ldxdw r4, [r1 + 0x18]
   48ce8: 79 15 10 00 00 00 00 00      	ldxdw r5, [r1 + 0x10]
   48cf0: 79 10 08 00 00 00 00 00      	ldxdw r0, [r1 + 0x8]
   48cf8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   48d00: 79 a9 98 fe 00 00 00 00      	ldxdw r9, [r10 - 0x168]
   48d08: 7b 9a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r9
   48d10: 79 a9 a0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x160]
   48d18: 7b 9a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r9
   48d20: 79 a9 a8 fe 00 00 00 00      	ldxdw r9, [r10 - 0x158]
   48d28: 7b 9a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r9
   48d30: 79 a9 b0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x150]
   48d38: 7b 9a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r9
   48d40: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   48d48: 7b 0a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r0
   48d50: 7b 5a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r5
   48d58: 7b 4a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r4
   48d60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48d68: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   48d70: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   48d78: 07 04 00 00 20 ff ff ff      	add64 r4, -0xe0
   48d80: 85 10 00 00 e0 c8 00 00      	call 0xc8e0 ; target 0xad488
   48d88: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   48d90: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   48d98: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   48da0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   48da8: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   48db8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   48dc0: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   48dc8: 79 a5 90 fc 00 00 00 00      	ldxdw r5, [r10 - 0x370]
   48dd0: 79 a7 88 fc 00 00 00 00      	ldxdw r7, [r10 - 0x378]
   48dd8: 79 a8 80 fc 00 00 00 00      	ldxdw r8, [r10 - 0x380]
   48de0: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   48de8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48df0: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   48df8: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x48cf8> ; branch 0x48e18
   48e00: 79 51 08 00 00 00 00 00      	ldxdw r1, [r5 + 0x8]
   48e08: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e10: 7b 15 08 00 00 00 00 00      	stxdw [r5 + 0x8], r1
   48e18: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   48e20: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e28: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   48e30: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x48d30> ; branch 0x48e50
   48e38: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   48e40: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e48: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
   48e50: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   48e58: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e60: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   48e68: 55 01 03 00 00 00 00 00      	jne r1, 0x0, +0x3 <.text+0x48d68> ; branch 0x48e88
   48e70: 79 41 08 00 00 00 00 00      	ldxdw r1, [r4 + 0x8]
   48e78: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e80: 7b 14 08 00 00 00 00 00      	stxdw [r4 + 0x8], r1
   48e88: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   48e90: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48e98: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   48ea0: 55 01 ec fe 00 00 00 00      	jne r1, 0x0, -0x114 <.text+0x484e8> ; branch 0x48608
   48ea8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   48eb0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   48eb8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   48ec0: 05 00 e8 fe 00 00 00 00      	ja -0x118 <.text+0x484e8> ; branch 0x48608
   48ec8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48ed0: 07 01 00 00 40 fe ff ff      	add64 r1, -0x1c0
   48ed8: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   48ee0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48ee8: 07 01 00 00 bf fe ff ff      	add64 r1, -0x141
   48ef0: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   48ef8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f00: 07 01 00 00 60 fe ff ff      	add64 r1, -0x1a0
   48f08: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   48f10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f18: 07 01 00 00 58 fe ff ff      	add64 r1, -0x1a8
   48f20: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   48f28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f30: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   48f38: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   48f40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f48: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   48f50: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   48f58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f60: 07 01 00 00 50 fe ff ff      	add64 r1, -0x1b0
   48f68: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   48f70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   48f78: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   48f80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   48f88: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   48f90: 85 10 00 00 87 01 00 00      	call 0x187 ; target 0x49bd0
   48f98: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   48fa0: 79 a7 28 ff 00 00 00 00      	ldxdw r7, [r10 - 0xd8]
   48fa8: 79 a3 20 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe0]
   48fb0: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   48fc0: 79 a8 80 fc 00 00 00 00      	ldxdw r8, [r10 - 0x380]
   48fc8: 1d 13 01 00 00 00 00 00      	jeq r3, r1, +0x1 <.text+0x48eb8> ; branch 0x48fd8
   48fd0: 05 00 03 00 00 00 00 00      	ja +0x3 <.text+0x48ed0> ; branch 0x48ff0
   48fd8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   48fe0: 7b 76 08 00 00 00 00 00      	stxdw [r6 + 0x8], r7
   48fe8: 05 00 73 00 00 00 00 00      	ja +0x73 <.text+0x49268> ; branch 0x49388
   48ff0: 7b 3a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r3
   48ff8: 7b 2a 08 fc 00 00 00 00      	stxdw [r10 - 0x3f8], r2
   49000: 79 a1 40 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc0]
   49008: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   49010: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   49018: 7b 1a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r1
   49020: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49028: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   49030: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   49038: 07 02 00 00 48 ff ff ff      	add64 r2, -0xb8
   49040: b7 03 00 00 60 00 00 00      	mov64 r3, 0x60
   49048: 85 10 00 00 cf f2 00 00      	call 0xf2cf ; target 0xc26c8
   49050: 79 a2 a8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x58]
   49058: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   49060: 15 01 52 00 00 00 00 00      	jeq r1, 0x0, +0x52 <.text+0x491d8> ; branch 0x492f8
   49068: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
   49070: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49078: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
   49080: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   49088: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   49090: 85 10 00 00 b3 8c ff ff      	call -0x734d ; target 0xf630
   49098: 79 a1 10 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f0]
   490a0: 85 10 00 00 0b d3 00 00      	call 0xd30b ; target 0xb2900
   490a8: 7b 0a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r0
   490b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   490b8: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   490c0: 7b 1a 10 fc 00 00 00 00      	stxdw [r10 - 0x3f0], r1
   490c8: 7b 7a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r7
   490d0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   490d8: 85 10 00 00 aa 8c ff ff      	call -0x7356 ; target 0xf630
   490e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   490e8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
   490f0: 79 a2 10 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f0]
   490f8: 85 10 00 00 19 d3 00 00      	call 0xd319 ; target 0xb29c8
   49100: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
   49108: 79 a1 e8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x18]
   49110: 18 02 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r2, -0x7fffffffffffffe6
   49120: 79 a7 88 fc 00 00 00 00      	ldxdw r7, [r10 - 0x378]
   49128: 1d 21 01 00 00 00 00 00      	jeq r1, r2, +0x1 <.text+0x49018> ; branch 0x49138
   49130: 05 00 4f 00 00 00 00 00      	ja +0x4f <.text+0x49290> ; branch 0x493b0
   49138: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49140: 07 01 00 00 68 fe ff ff      	add64 r1, -0x198
   49148: 79 a2 e8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x418]
   49150: 85 10 00 00 5b d0 00 00      	call 0xd05b ; target 0xb1430
   49158: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   49160: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   49168: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   49170: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49178: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   49180: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x49080> ; branch 0x491a0
   49188: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   49190: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49198: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   491a0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   491a8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   491b0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   491b8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x490b8> ; branch 0x491d8
   491c0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   491c8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   491d0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   491d8: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   491e0: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   491e8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   491f0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   491f8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   49200: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x49100> ; branch 0x49220
   49208: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   49210: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49218: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   49220: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   49228: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   49230: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   49238: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x49138> ; branch 0x49258
   49240: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   49248: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   49250: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   49258: 55 00 01 00 00 00 00 00      	jne r0, 0x0, +0x1 <.text+0x49148> ; branch 0x49268
   49260: 05 00 5c 00 00 00 00 00      	ja +0x5c <.text+0x49428> ; branch 0x49548
   49268: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   49270: 71 12 29 00 00 00 00 00      	ldxb r2, [r1 + 0x29]
   49278: 55 02 68 00 00 00 00 00      	jne r2, 0x0, +0x68 <.text+0x494a0> ; branch 0x495c0
   49280: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49288: 07 01 00 00 40 fd ff ff      	add64 r1, -0x2c0
   49290: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   49298: 85 10 00 00 ca cd 00 00      	call 0xcdca ; target 0xb00f0
   492a0: 79 a3 48 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2b8]
   492a8: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   492b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   492b8: 07 01 00 00 30 fd ff ff      	add64 r1, -0x2d0
   492c0: 18 04 00 00 9b 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a9b ; data 'adminprograms/pump-fees/src/instructions/admin/initialize_fee_program_global.rsfee-program-globalfee_program_g'
   492d0: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   492d8: 85 10 00 00 55 70 ff ff      	call -0x8fab ; target 0x1588
   492e0: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   492e8: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   492f0: 05 00 dd 00 00 00 00 00      	ja +0xdd <.text+0x498c0> ; branch 0x499e0
   492f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49300: 07 01 00 00 20 fd ff ff      	add64 r1, -0x2e0
   49308: b7 02 00 00 d0 07 00 00      	mov64 r2, 0x7d0
   49310: 85 10 00 00 bb cd 00 00      	call 0xcdbb ; target 0xb00f0
   49318: 79 a3 28 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d8]
   49320: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]
   49328: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49330: 07 01 00 00 10 fd ff ff      	add64 r1, -0x2f0
   49338: 18 04 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   49348: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   49350: 85 10 00 00 46 70 ff ff      	call -0x8fba ; target 0x1588
   49358: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   49360: 79 a2 18 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e8]
   49368: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   49370: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   49378: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   49388: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   49390: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   49398: 79 a5 90 fc 00 00 00 00      	ldxdw r5, [r10 - 0x370]
   493a0: 79 a7 88 fc 00 00 00 00      	ldxdw r7, [r10 - 0x378]
   493a8: 05 00 46 ff 00 00 00 00      	ja -0xba <.text+0x48cc0> ; branch 0x48de0
   493b0: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
   493b8: 7b 2a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r2
   493c0: 7b 3a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r3
   493c8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   493d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   493d8: 07 01 00 00 d0 fd ff ff      	add64 r1, -0x230
   493e0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   493e8: 07 02 00 00 e8 ff ff ff      	add64 r2, -0x18
   493f0: 85 10 00 00 e0 c7 00 00      	call 0xc7e0 ; target 0xad2f8
   493f8: 79 a1 d0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x230]
   49400: 79 a2 d8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x228]
   49408: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   49410: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   49418: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   49428: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   49430: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   49438: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   49440: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   49448: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49450: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   49458: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x49358> ; branch 0x49478
   49460: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   49468: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49470: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   49478: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   49480: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   49488: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   49490: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   49498: 79 a5 90 fc 00 00 00 00      	ldxdw r5, [r10 - 0x370]
   494a0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0x493a0> ; branch 0x494c0
   494a8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   494b0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   494b8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   494c0: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   494c8: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
   494d0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   494d8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   494e0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   494e8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0x493e8> ; branch 0x49508
   494f0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   494f8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   49500: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   49508: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   49510: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   49518: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   49520: 55 02 17 ff 00 00 00 00      	jne r2, 0x0, -0xe9 <.text+0x48cc0> ; branch 0x48de0
   49528: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   49530: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   49538: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   49540: 05 00 13 ff 00 00 00 00      	ja -0xed <.text+0x48cc0> ; branch 0x48de0
   49548: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49550: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   49558: b7 02 00 00 d5 07 00 00      	mov64 r2, 0x7d5
   49560: 85 10 00 00 71 cd 00 00      	call 0xcd71 ; target 0xb00f0
   49568: 79 a3 c8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x238]
   49570: 79 a2 c0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x240]
   49578: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49580: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   49588: 18 04 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   49598: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   495a0: 85 10 00 00 fc 6f ff ff      	call -0x9004 ; target 0x1588
   495a8: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   495b0: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   495b8: 05 00 84 00 00 00 00 00      	ja +0x84 <.text+0x498c0> ; branch 0x499e0
   495c0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   495c8: 79 12 18 00 00 00 00 00      	ldxdw r2, [r1 + 0x18]
   495d0: 7b 2a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r2
   495d8: 79 12 10 00 00 00 00 00      	ldxdw r2, [r1 + 0x10]
   495e0: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   495e8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   495f0: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
   495f8: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   49600: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   49608: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49610: 07 01 00 00 b0 ff ff ff      	add64 r1, -0x50
   49618: 18 02 00 00 e0 36 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc36e0 ; data 'm'
   49628: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   49630: 85 10 00 00 1f f2 00 00      	call 0xf21f ; target 0xc2730
   49638: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   49640: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   49648: 55 00 49 00 00 00 00 00      	jne r0, 0x0, +0x49 <.text+0x49778> ; branch 0x49898
   49650: 79 a4 40 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1c0]
   49658: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49660: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   49668: 18 02 00 00 e8 8b 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc8be8
   49678: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   49680: 85 10 00 00 82 dc 00 00      	call 0xdc82 ; target 0xb7a98
   49688: 79 a1 38 ff 00 00 00 00      	ldxdw r1, [r10 - 0xc8]
   49690: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   49698: 79 a1 30 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd0]
   496a0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   496a8: 79 a1 28 ff 00 00 00 00      	ldxdw r1, [r10 - 0xd8]
   496b0: 7b 1a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r1
   496b8: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   496c0: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   496c8: 71 a1 40 ff 00 00 00 00      	ldxb r1, [r10 - 0xc0]
   496d0: 73 19 01 00 00 00 00 00      	stxb [r9 + 0x1], r1
   496d8: 79 a9 78 fc 00 00 00 00      	ldxdw r9, [r10 - 0x388]
   496e0: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   496e8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   496f0: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   496f8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   49700: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   49708: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   49710: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   49718: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   49720: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49728: 07 01 00 00 20 ff ff ff      	add64 r1, -0xe0
   49730: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   49738: 07 02 00 00 b0 ff ff ff      	add64 r2, -0x50
   49740: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   49748: 85 10 00 00 fc f1 00 00      	call 0xf1fc ; target 0xc2730
   49750: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   49758: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   49760: 15 00 57 00 00 00 00 00      	jeq r0, 0x0, +0x57 <.text+0x49900> ; branch 0x49a20
   49768: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49770: 07 01 00 00 70 fd ff ff      	add64 r1, -0x290
   49778: b7 02 00 00 d6 07 00 00      	mov64 r2, 0x7d6
   49780: 85 10 00 00 2d cd 00 00      	call 0xcd2d ; target 0xb00f0
   49788: 79 a3 78 fd 00 00 00 00      	ldxdw r3, [r10 - 0x288]
   49790: 79 a2 70 fd 00 00 00 00      	ldxdw r2, [r10 - 0x290]
   49798: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   497a0: 07 01 00 00 60 fd ff ff      	add64 r1, -0x2a0
   497a8: 18 04 00 00 24 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a24 ; data 'event_authorityprogramsystem_programconfig_program_idprograms/pump-fees/src/instructions/admin/initialize_fee_'
   497b8: b7 05 00 00 0f 00 00 00      	mov64 r5, 0xf
   497c0: 85 10 00 00 b8 6f ff ff      	call -0x9048 ; target 0x1588
   497c8: 79 a3 68 fd 00 00 00 00      	ldxdw r3, [r10 - 0x298]
   497d0: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   497d8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   497e0: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   497e8: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
   497f0: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   497f8: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
   49800: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   49808: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   49810: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   49818: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   49820: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   49828: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   49830: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   49838: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   49840: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   49848: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   49850: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   49858: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49860: 07 01 00 00 50 fd ff ff      	add64 r1, -0x2b0
   49868: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   49870: 07 04 00 00 20 ff ff ff      	add64 r4, -0xe0
   49878: 85 10 00 00 81 c7 00 00      	call 0xc781 ; target 0xad488
   49880: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   49888: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   49890: 05 00 29 00 00 00 00 00      	ja +0x29 <.text+0x498c0> ; branch 0x499e0
   49898: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   498a0: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   498a8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   498b0: 85 10 00 00 74 fa ff ff      	call -0x58c ; target 0x46c58
   498b8: 79 a3 a8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x258]
   498c0: 79 a2 a0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x260]
   498c8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   498d0: 07 01 00 00 90 fd ff ff      	add64 r1, -0x270
   498d8: 18 04 00 00 9b 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc4a9b ; data 'adminprograms/pump-fees/src/instructions/admin/initialize_fee_program_global.rsfee-program-globalfee_program_g'
   498e8: b7 05 00 00 05 00 00 00      	mov64 r5, 0x5
   498f0: 85 10 00 00 92 6f ff ff      	call -0x906e ; target 0x1588
   498f8: 79 a3 98 fd 00 00 00 00      	ldxdw r3, [r10 - 0x268]
   49900: 79 a2 90 fd 00 00 00 00      	ldxdw r2, [r10 - 0x270]
   49908: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
   49910: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   49918: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
   49920: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   49928: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   49930: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   49938: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   49940: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   49948: 18 01 00 00 6d 01 a6 70 00 00 00 00 14 5f 09 62      	lddw r1, 0x62095f1470a6016d
   49958: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   49960: 18 01 00 00 8d a1 33 91 00 00 00 00 66 95 19 1c      	lddw r1, 0x1c1995669133a18d
   49970: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   49978: 18 01 00 00 72 6c e9 4c 00 00 00 00 f4 ed fd 53      	lddw r1, 0x53fdedf44ce96c72
   49988: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   49990: 18 01 00 00 5e 54 1e 6a 00 00 00 00 d7 a6 06 53      	lddw r1, 0x5306a6d76a1e545e
   499a0: 7b 1a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r1
   499a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   499b0: 07 01 00 00 80 fd ff ff      	add64 r1, -0x280
   499b8: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   499c0: 07 04 00 00 20 ff ff ff      	add64 r4, -0xe0
   499c8: 85 10 00 00 57 c7 00 00      	call 0xc757 ; target 0xad488
   499d0: 79 a1 80 fd 00 00 00 00      	ldxdw r1, [r10 - 0x280]
   499d8: 79 a2 88 fd 00 00 00 00      	ldxdw r2, [r10 - 0x278]
   499e0: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   499e8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   499f0: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   49a00: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   49a08: 79 a4 98 fc 00 00 00 00      	ldxdw r4, [r10 - 0x368]
   49a10: 79 a5 90 fc 00 00 00 00      	ldxdw r5, [r10 - 0x370]
   49a18: 05 00 78 fe 00 00 00 00      	ja -0x188 <.text+0x48cc0> ; branch 0x48de0
   49a20: 79 a9 48 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1b8]
   49a28: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   49a30: 07 01 00 00 28 00 00 00      	add64 r1, 0x28
   49a38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   49a40: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   49a48: b7 03 00 00 60 00 00 00      	mov64 r3, 0x60
   49a50: 85 10 00 00 8e f1 00 00      	call 0xf18e ; target 0xc26c8
   49a58: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   49a60: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   49a68: 7b 26 f8 00 00 00 00 00      	stxdw [r6 + 0xf8], r2
   49a70: 79 a2 40 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3c0]
   49a78: 73 26 b8 00 00 00 00 00      	stxb [r6 + 0xb8], r2
   49a80: 79 a2 48 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b8]
   49a88: 73 26 b9 00 00 00 00 00      	stxb [r6 + 0xb9], r2
   49a90: 79 a2 50 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3b0]
   49a98: 73 26 ba 00 00 00 00 00      	stxb [r6 + 0xba], r2
   49aa0: 79 a2 18 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3e8]
   49aa8: 73 26 e8 00 00 00 00 00      	stxb [r6 + 0xe8], r2
   49ab0: 79 a2 68 fc 00 00 00 00      	ldxdw r2, [r10 - 0x398]
   49ab8: 73 26 e9 00 00 00 00 00      	stxb [r6 + 0xe9], r2
   49ac0: 79 a2 70 fc 00 00 00 00      	ldxdw r2, [r10 - 0x390]
   49ac8: 73 26 ea 00 00 00 00 00      	stxb [r6 + 0xea], r2
   49ad0: 7b 16 00 01 00 00 00 00      	stxdw [r6 + 0x100], r1
   49ad8: 7b 96 f0 00 00 00 00 00      	stxdw [r6 + 0xf0], r9
   49ae0: 79 a1 20 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3e0]
   49ae8: 7b 16 e0 00 00 00 00 00      	stxdw [r6 + 0xe0], r1
   49af0: 79 a1 28 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d8]
   49af8: 7b 16 d8 00 00 00 00 00      	stxdw [r6 + 0xd8], r1
   49b00: 7b 76 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r7
   49b08: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   49b10: 7b 16 c8 00 00 00 00 00      	stxdw [r6 + 0xc8], r1
   49b18: 79 a1 38 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3c8]
   49b20: 7b 16 c0 00 00 00 00 00      	stxdw [r6 + 0xc0], r1
   49b28: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   49b30: 7b 16 b0 00 00 00 00 00      	stxdw [r6 + 0xb0], r1
   49b38: 79 a1 30 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3d0]
   49b40: 7b 16 a8 00 00 00 00 00      	stxdw [r6 + 0xa8], r1
   49b48: 7b 86 a0 00 00 00 00 00      	stxdw [r6 + 0xa0], r8
   49b50: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   49b58: 7b 16 98 00 00 00 00 00      	stxdw [r6 + 0x98], r1
   49b60: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   49b68: 7b 16 90 00 00 00 00 00      	stxdw [r6 + 0x90], r1
   49b70: 79 a1 d8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x428]
   49b78: 7b 16 88 00 00 00 00 00      	stxdw [r6 + 0x88], r1
   49b80: 79 a1 f0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x410]
   49b88: 7b 16 20 00 00 00 00 00      	stxdw [r6 + 0x20], r1
   49b90: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   49b98: 7b 16 18 00 00 00 00 00      	stxdw [r6 + 0x18], r1
   49ba0: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   49ba8: 7b 16 10 00 00 00 00 00      	stxdw [r6 + 0x10], r1
   49bb0: 79 a1 e0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x420]
   49bb8: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   49bc0: 79 a1 00 fc 00 00 00 00      	ldxdw r1, [r10 - 0x400]
   49bc8: 05 00 46 fd 00 00 00 00      	ja -0x2ba <.text+0x484e0> ; branch 0x48600
