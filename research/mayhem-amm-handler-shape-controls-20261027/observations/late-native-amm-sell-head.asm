
/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/work/mayhem-priority-20261027/fast-root-sell-late-native-build/symbols.so:	file format elf64-sbf

Disassembly of section .text:

00000000000151f8 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E>:
   151f8:      	mov64 r8, r5
   15200:      	mov64 r6, r4
   15208:      	stxdw [r10 - 0x620], r3
   15210:      	stxdw [r10 - 0x618], r2
   15218:      	mov64 r9, r1
   15220:      	ldxdw r7, [r9 + 0x8]
   15228:      	ldxdw r2, [r7 + 0x8]
   15230:      	ldxdw r1, [r7 + 0x10]
   15238:      	add64 r1, 0x8
   15240:      	add64 r2, 0x8
   15248:      	call -0x1005
   15250:      	jne r0, 0x2, +0x70 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3e0>
   15258:      	stxdw [r10 - 0x638], r9
   15260:      	stxdw [r10 - 0x630], r8
   15268:      	ldxdw r1, [r7 + 0x78]
   15270:      	ldxdw r3, [r1 + 0x68]
   15278:      	stxdw [r10 - 0x628], r7
   15280:      	ldxdw r1, [r7 + 0x58]
   15288:      	ldxdw r2, [r1 + 0xe8]
   15290:      	mov64 r8, r3
   15298:      	add64 r8, r2
   152a0:      	mov64 r2, 0x1
   152a8:      	jlt r8, r3, +0x1 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0xc0>
   152b0:      	mov64 r2, 0x0
   152b8:      	ldxdw r1, [r1 + 0xf0]
   152c0:      	mov64 r9, r1
   152c8:      	add64 r9, r2
   152d0:      	xor64 r1, -0x1
   152d8:      	and64 r1, r9
   152e0:      	jslt r1, 0x0, +0x34 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x290>
   152e8:      	jne r9, 0x0, +0x33 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x290>
   152f0:      	ldxdw r7, [r10 - 0x628]
   152f8:      	ldxdw r3, [r7 + 0x8]
   15300:      	ldxdw r1, [r7 + 0x10]
   15308:      	ldxdw r2, [r7 + 0x68]
   15310:      	ldxdw r2, [r2 + 0x0]
   15318:      	ldxdw r4, [r2 + 0x18]
   15320:      	stxdw [r10 - 0x5d0], r4
   15328:      	ldxdw r4, [r2 + 0x10]
   15330:      	stxdw [r10 - 0x5d8], r4
   15338:      	ldxdw r4, [r2 + 0x8]
   15340:      	stxdw [r10 - 0x5e0], r4
   15348:      	ldxdw r2, [r2 + 0x0]
   15350:      	stxdw [r10 - 0x5e8], r2
   15358:      	add64 r1, 0x8
   15360:      	add64 r3, 0x8
   15368:      	mov64 r4, r10
   15370:      	add64 r4, -0x5e8
   15378:      	mov64 r2, r8
   15380:      	call -0xf97
   15388:      	jne r0, 0x2, +0x49 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3e0>
   15390:      	ldxdw r1, [r7 + 0x70]
   15398:      	ldxdw r1, [r1 + 0x68]
   153a0:      	jeq r1, 0x0, +0x68 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x4f0>
   153a8:      	stxdw [r10 - 0x650], r1
   153b0:      	and64 r6, 0xffff
   153b8:      	ldxdw r7, [r10 - 0x620]
   153c0:      	mov64 r1, r7
   153c8:      	mov64 r2, 0x0
   153d0:      	mov64 r3, r6
   153d8:      	mov64 r4, 0x0
   153e0:      	call 0x128e9
   153e8:      	stxdw [r10 - 0x648], r0
   153f0:      	stxdw [r10 - 0x640], r1
   153f8:      	ldxdw r1, [r10 - 0x618]
   15400:      	mov64 r2, 0x0
   15408:      	mov64 r3, r6
   15410:      	mov64 r4, 0x0
   15418:      	call 0x128e2
   15420:      	mov64 r2, r1
   15428:      	ldxdw r3, [r10 - 0x648]
   15430:      	add64 r2, r3
   15438:      	mov64 r4, 0x1
   15440:      	mov64 r3, 0x1
   15448:      	ldxdw r5, [r10 - 0x640]
   15450:      	jne r5, 0x0, +0x31 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3e8>
   15458:      	mov64 r3, 0x0
   15460:      	jge r2, r1, +0x30 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3f0>
   15468:      	or64 r3, r4
   15470:      	and64 r3, 0x1
   15478:      	jeq r3, 0x0, +0x31 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x410>
   15480:      	ja +0x4c <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x4f0>
   15488:      	stw [r10 - 0x608], 0x2
   15490:      	mov64 r1, r10
   15498:      	add64 r1, -0xc8
   154a0:      	mov64 r6, r10
   154a8:      	add64 r6, -0x608
   154b0:      	mov64 r2, r6
   154b8:      	call 0xbdfa
   154c0:      	stdw [r10 - 0x20], 0x0
   154c8:      	stdw [r10 - 0x28], 0x1
   154d0:      	stdw [r10 - 0x30], 0x0
   154d8:      	lddw r1, 0xae660
   154e8:      	stxdw [r10 - 0x150], r1
   154f0:      	mov64 r1, r10
   154f8:      	add64 r1, -0x30
   15500:      	stxdw [r10 - 0x158], r1
   15508:      	lddw r1, 0xe0000020
   15518:      	stxdw [r10 - 0x148], r1
   15520:      	mov64 r2, r10
   15528:      	add64 r2, -0x158
   15530:      	mov64 r1, r6
   15538:      	call 0xc102
   15540:      	jne r0, 0x0, +0x637 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3508>
   15548:      	ldxdw r1, [r10 - 0x20]
   15550:      	stxdw [r10 - 0x5a0], r1
   15558:      	ldxdw r1, [r10 - 0x28]
   15560:      	stxdw [r10 - 0x5a8], r1
   15568:      	ldxdw r1, [r10 - 0x30]
   15570:      	stxdw [r10 - 0x5b0], r1
   15578:      	ldxdw r1, [r10 - 0xc8]
   15580:      	stxdw [r10 - 0x5c8], r1
   15588:      	ldxdw r1, [r10 - 0xc0]
   15590:      	stxdw [r10 - 0x5c0], r1
   15598:      	ldxdw r1, [r10 - 0xb8]
   155a0:      	stxdw [r10 - 0x5b8], r1
   155a8:      	stw [r10 - 0x550], 0x1772
   155b0:      	stb [r10 - 0x598], 0x2
   155b8:      	stdw [r10 - 0x5e8], 0x2
   155c0:      	mov64 r1, r10
   155c8:      	add64 r1, -0x5e8
   155d0:      	call 0xfed0
   155d8:      	exit
   155e0:      	jlt r2, r1, -0x30 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x270>
   155e8:      	mov64 r4, 0x0
   155f0:      	or64 r3, r4
   155f8:      	and64 r3, 0x1
   15600:      	jne r3, 0x0, +0x1c <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x4f0>
   15608:      	mov64 r1, r0
   15610:      	mov64 r3, 0x2710
   15618:      	mov64 r4, 0x0
   15620:      	call 0x12477
   15628:      	mov64 r6, 0x1
   15630:      	mov64 r3, 0x1
   15638:      	jlt r7, r1, +0x3d <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x630>
   15640:      	mov64 r3, 0x0
   15648:      	ldxdw r2, [r10 - 0x618]
   15650:      	stxdw [r10 - 0x648], r0
   15658:      	jge r2, r0, +0x3c <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x648>
   15660:      	stxdw [r10 - 0x658], r6
   15668:      	stxdw [r10 - 0x640], r1
   15670:      	jeq r7, r1, +0x1 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x488>
   15678:      	mov64 r6, r3
   15680:      	mov64 r1, r8
   15688:      	mov64 r2, r9
   15690:      	lddw r3, 0x38d7ea4c68000
   156a0:      	mov64 r4, 0x0
   156a8:      	call 0x12890
   156b0:      	mov64 r2, r1
   156b8:      	mov64 r1, r0
   156c0:      	ldxdw r3, [r10 - 0x650]
   156c8:      	mov64 r4, 0x0
   156d0:      	call 0x12461
   156d8:      	and64 r6, 0x1
   156e0:      	jeq r6, 0x0, +0x30 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x670>
   156e8:      	mov64 r9, 0x2
   156f0:      	stxw [r10 - 0x608], r9
   156f8:      	mov64 r1, r10
   15700:      	add64 r1, -0xc8
   15708:      	mov64 r6, r10
   15710:      	add64 r6, -0x608
   15718:      	mov64 r2, r6
   15720:      	call 0xbdad
   15728:      	stdw [r10 - 0x20], 0x0
   15730:      	stdw [r10 - 0x28], 0x1
   15738:      	stdw [r10 - 0x30], 0x0
   15740:      	lddw r1, 0xae660
   15750:      	stxdw [r10 - 0x150], r1
   15758:      	mov64 r1, r10
   15760:      	add64 r1, -0x30
   15768:      	stxdw [r10 - 0x158], r1
   15770:      	lddw r1, 0xe0000020
   15780:      	stxdw [r10 - 0x148], r1
   15788:      	mov64 r2, r10
   15790:      	add64 r2, -0x158
   15798:      	mov64 r1, r6
   157a0:      	call 0xc0b5
   157a8:      	jne r0, 0x0, +0x5ea <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3508>
   157b0:      	ldxdw r1, [r10 - 0x20]
   157b8:      	stxdw [r10 - 0x5a0], r1
   157c0:      	ldxdw r1, [r10 - 0x28]
   157c8:      	stxdw [r10 - 0x5a8], r1
   157d0:      	ldxdw r1, [r10 - 0x30]
   157d8:      	stxdw [r10 - 0x5b0], r1
   157e0:      	ldxdw r1, [r10 - 0xc8]
   157e8:      	stxdw [r10 - 0x5c8], r1
   157f0:      	ldxdw r1, [r10 - 0xc0]
   157f8:      	stxdw [r10 - 0x5c0], r1
   15800:      	ldxdw r1, [r10 - 0xb8]
   15808:      	stxdw [r10 - 0x5b8], r1
   15810:      	or64 r9, 0x1770
   15818:      	stxw [r10 - 0x550], r9
   15820:      	ja -0x4f <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x3b8>
   15828:      	ldxdw r2, [r10 - 0x618]
   15830:      	stxdw [r10 - 0x648], r0
   15838:      	jlt r2, r0, -0x3c <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x468>
   15840:      	mov64 r6, 0x0
   15848:      	stxdw [r10 - 0x658], r6
   15850:      	stxdw [r10 - 0x640], r1
   15858:      	jne r7, r1, -0x3d <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x480>
   15860:      	ja -0x3d <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x488>
   15868:      	ldxdw r5, [r10 - 0x618]
   15870:      	mov64 r4, r5
   15878:      	ldxdw r6, [r10 - 0x648]
   15880:      	add64 r4, r6
   15888:      	mov64 r3, 0x1
   15890:      	mov64 r2, 0x1
   15898:      	mov64 r9, 0x2
   158a0:      	jlt r4, r5, +0x1 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x6b8>
   158a8:      	mov64 r2, 0x0
   158b0:      	mov64 r4, r7
   158b8:      	ldxdw r5, [r10 - 0x640]
   158c0:      	add64 r4, r5
   158c8:      	add64 r4, r2
   158d0:      	jlt r4, r7, +0x5 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x708>
   158d8:      	mov64 r3, 0x0
   158e0:      	jne r4, r7, +0x4 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x710>
   158e8:      	and64 r2, 0x1
   158f0:      	jeq r2, 0x0, +0x5 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x728>
   158f8:      	ja -0x42 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x4f8>
   15900:      	jeq r4, r7, -0x4 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x6f0>
   15908:      	mov64 r2, r3
   15910:      	and64 r2, 0x1
   15918:      	jne r2, 0x0, -0x46 <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x4f8>
   15920:      	mov64 r4, r7
   15928:      	sub64 r4, r5
   15930:      	ldxdw r2, [r10 - 0x658]
   15938:      	sub64 r4, r2
   15940:      	ldxdw r5, [r10 - 0x618]
   15948:      	sub64 r5, r6
   15950:      	mov64 r2, 0x1
   15958:      	mov64 r3, 0x1
   15960:      	jlt r0, r5, +0xe <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x7e0>
   15968:      	mov64 r3, 0x0
   15970:      	mov64 r5, 0x1
   15978:      	jge r1, r4, +0xd <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x7f0>
   15980:      	jeq r1, r4, +0xe <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x800>
   15988:      	mov64 r3, r5
   15990:      	mov64 r4, r6
   15998:      	ldxdw r5, [r10 - 0x618]
   159a0:      	add64 r4, r5
   159a8:      	jge r4, r6, +0xd <_ZN16mayhem_recovered12instructions14sell_pump_swap7handler17h10bab539394e4073E+0x820>
   159b0:      	mov64 r9, 0xc
