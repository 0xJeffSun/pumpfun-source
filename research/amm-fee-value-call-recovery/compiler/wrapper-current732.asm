
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/fee-crate-resolved/symbols.so:	file format elf64-sbf

Disassembly of section .text:

0000000000029ea0 <_ZN18pump_amm_recovered5utils12transfer_fee13calculate_fee17h0d57d0183e3de2caE>:
   21460:	mov64 r6, r1
   21461:	ldxdw r1, [r2 + 0x0]
   21462:	jne r1, 0x0, +0x3 <LBB207_7>
   21463:	stdw [r6 + 0x0], 0x2
   21464:	stdw [r6 + 0x8], 0x0
   21465:	ja +0x49 <LBB207_2>

0000000000029ed0 <LBB207_7>:
   21466:	add64 r2, 0x8
   21467:	mov64 r1, r10
   21468:	add64 r1, -0x120
   21469:	call 0x1a271
   21470:	ldxdw r1, [r10 - 0x120]
   21471:	jeq r1, 0x0, +0x4 <LBB207_3>
   21472:	ldxdw r1, [r10 - 0x118]
   21473:	stxdw [r6 + 0x8], r1
   21474:	stdw [r6 + 0x0], 0x2
   21475:	ja +0x3f <LBB207_2>

0000000000029f20 <LBB207_3>:
   21476:	mov64 r1, r10
   21477:	add64 r1, -0x70
   21478:	lddw r2, 0x124298
   21480:	call 0x17ba2
   21481:	stdw [r10 - 0x48], 0x0
   21482:	stdw [r10 - 0x50], 0x1
   21483:	stdw [r10 - 0x58], 0x0
   21484:	lddw r1, 0x12a270
   21486:	stxdw [r10 - 0x18], r1
   21487:	mov64 r1, r10
   21488:	add64 r1, -0x58
   21489:	stxdw [r10 - 0x20], r1
   21490:	stb [r10 - 0x8], 0x3
   21491:	stdw [r10 - 0x10], 0x20
   21492:	stdw [r10 - 0x30], 0x0
   21493:	stdw [r10 - 0x40], 0x0
   21494:	mov64 r2, r10
   21495:	add64 r2, -0x40
   21496:	lddw r1, 0x124298
   21498:	call 0x18685
   21499:	jeq r0, 0x0, +0xa <LBB207_5>
   21500:	mov64 r3, r10
   21501:	add64 r3, -0x110
   21502:	lddw r1, 0x124352
   21504:	mov64 r2, 0x37
   21505:	lddw r4, 0x12a2a0
   21507:	lddw r5, 0x12a2c0
   21509:	call 0x1e238

000000000002a030 <LBB207_5>:
   21510:	ldxdw r1, [r10 - 0x48]
   21511:	stxdw [r10 - 0xc8], r1
   21512:	ldxdw r1, [r10 - 0x50]
   21513:	stxdw [r10 - 0xd0], r1
   21514:	ldxdw r1, [r10 - 0x58]
   21515:	stxdw [r10 - 0xd8], r1
   21516:	ldxdw r1, [r10 - 0x70]
   21517:	stxdw [r10 - 0xf0], r1
   21518:	ldxdw r1, [r10 - 0x68]
   21519:	stxdw [r10 - 0xe8], r1
   21520:	ldxdw r1, [r10 - 0x60]
   21521:	stxdw [r10 - 0xe0], r1
   21522:	lddw r1, 0x124a67
   21524:	stxdw [r10 - 0x108], r1
   21525:	stw [r10 - 0x78], 0x1787
   21526:	stb [r10 - 0xc0], 0x2
   21527:	stw [r10 - 0xf8], 0x31
   21528:	stdw [r10 - 0x100], 0x2b
   21529:	stdw [r10 - 0x110], 0x0
   21530:	mov64 r1, r10
   21531:	add64 r1, -0x130
   21532:	mov64 r2, r10
   21533:	add64 r2, -0x110
   21534:	call 0x1c223
   21535:	ldxdw r1, [r10 - 0x130]
   21536:	ldxdw r2, [r10 - 0x128]
   21537:	stxdw [r6 + 0x8], r2
   21538:	stxdw [r6 + 0x0], r1

000000000002a118 <LBB207_2>:
   21539:	exit
