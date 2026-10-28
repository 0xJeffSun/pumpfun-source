
/home/ahi200/pumpfun-work/20261028-amm-v2-selector/codegen-route/control.o:	file format elf64-sbf

Disassembly of section .text:

0000000000029fc0 <_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE>:
   21496:	mov64 r8, r5
   21497:	stxdw [r10 - 0x130], r4
   21498:	mov64 r9, r3
   21499:	mov64 r6, r2
   21500:	mov64 r7, r1
   21501:	ldxdw r3, [r8 - 0xff8]
   21502:	ldxdw r4, [r8 - 0xff0]
   21503:	ldxdw r5, [r8 - 0xfe8]
   21504:	mov64 r1, r10
   21505:	add64 r1, -0xf8
   21506:	call -0x1
   21507:	ldxdw r2, [r10 - 0xf0]
   21508:	ldxdw r1, [r10 - 0xf8]
   21509:	jne r1, 0x0, +0x4a <LBB194_20>
   21510:	stxdw [r10 - 0x150], r2
   21511:	stxdw [r10 - 0x138], r7
   21512:	ldxdw r7, [r10 - 0x130]
   21513:	stxdw [r10 - 0x148], r9
   21514:	ldxdw r1, [r8 - 0xfe0]
   21515:	stxdw [r10 - 0x140], r1
   21516:	ldxdw r8, [r8 - 0x1000]
   21517:	ldxdw r1, [r10 - 0xe8]
   21518:	stxdw [r10 - 0x158], r1
   21519:	mov64 r1, r6
   21520:	add64 r1, 0x20
   21521:	stxdw [r10 - 0x30], r1
   21522:	lddw r1, 0x0
   21524:	stxdw [r10 - 0x40], r1
   21525:	stdw [r10 - 0x28], 0x20
   21526:	stdw [r10 - 0x38], 0xe
   21527:	mov64 r1, r10
   21528:	add64 r1, -0xf8
   21529:	mov64 r2, r10
   21530:	add64 r2, -0x40
   21531:	mov64 r3, 0x2
   21532:	lddw r4, 0x0
   21534:	call -0x1
   21535:	ldxdw r1, [r10 - 0xe0]
   21536:	stxdw [r10 - 0x100], r1
   21537:	ldxdw r1, [r10 - 0xe8]
   21538:	stxdw [r10 - 0x108], r1
   21539:	ldxdw r1, [r10 - 0xf0]
   21540:	stxdw [r10 - 0x110], r1
   21541:	ldxdw r1, [r10 - 0xf8]
   21542:	stxdw [r10 - 0x118], r1
   21543:	mov64 r2, r10
   21544:	add64 r2, -0x118
   21545:	mov64 r9, r6
   21546:	mov64 r1, r6
   21547:	mov64 r3, 0x20
   21548:	call -0x1
   21549:	jgt r8, 0x9cf, +0x44 <LBB194_4>
   21550:	mov64 r1, r10
   21551:	add64 r1, -0x58
   21552:	lddw r2, 0x0
   21554:	call -0x1
   21555:	stdw [r10 - 0x108], 0x0
   21556:	stdw [r10 - 0x110], 0x1
   21557:	stdw [r10 - 0x118], 0x0
   21558:	lddw r1, 0x0
   21560:	stxdw [r10 - 0x18], r1
   21561:	mov64 r1, r10
   21562:	add64 r1, -0x118
   21563:	stxdw [r10 - 0x20], r1
   21564:	stb [r10 - 0x8], 0x3
   21565:	stdw [r10 - 0x10], 0x20
   21566:	stdw [r10 - 0x30], 0x0
   21567:	stdw [r10 - 0x40], 0x0
   21568:	mov64 r2, r10
   21569:	add64 r2, -0x40
   21570:	lddw r1, 0x0
   21572:	call -0x1
   21573:	jeq r0, 0x0, +0xc <LBB194_22>
   21574:	mov64 r3, r10
   21575:	add64 r3, -0xf8
   21576:	lddw r1, 0x0
   21578:	mov64 r2, 0x37
   21579:	lddw r4, 0x0
   21581:	lddw r5, 0x0
   21583:	call -0x1

000000000002a280 <LBB194_20>:
   21584:	ldxdw r1, [r10 - 0xe8]
   21585:	ja +0x1c <LBB194_21>

000000000002a290 <LBB194_22>:
   21586:	ldxdw r1, [r10 - 0x108]
   21587:	stxdw [r10 - 0xb0], r1
   21588:	ldxdw r1, [r10 - 0x110]
   21589:	stxdw [r10 - 0xb8], r1
   21590:	ldxdw r1, [r10 - 0x118]
   21591:	stxdw [r10 - 0xc0], r1
   21592:	ldxdw r1, [r10 - 0x58]
   21593:	stxdw [r10 - 0xd8], r1
   21594:	ldxdw r1, [r10 - 0x50]
   21595:	stxdw [r10 - 0xd0], r1
   21596:	ldxdw r1, [r10 - 0x48]
   21597:	stxdw [r10 - 0xc8], r1
   21598:	lddw r1, 0x0
   21600:	stxdw [r10 - 0xf0], r1
   21601:	stw [r10 - 0x60], 0x17c3
   21602:	stb [r10 - 0xa8], 0x2
   21603:	stw [r10 - 0xe0], 0xb8
   21604:	stdw [r10 - 0xe8], 0x23
   21605:	stdw [r10 - 0xf8], 0x0
   21606:	mov64 r1, r10
   21607:	add64 r1, -0x128
   21608:	mov64 r2, r10
   21609:	add64 r2, -0xf8
   21610:	call -0x1
   21611:	ldxdw r1, [r10 - 0x120]
   21612:	ldxdw r2, [r10 - 0x128]

000000000002a368 <LBB194_23>:
   21613:	ldxdw r7, [r10 - 0x138]

000000000002a370 <LBB194_21>:
   21614:	stxdw [r7 + 0x10], r1
   21615:	stxdw [r7 + 0x8], r2
   21616:	stdw [r7 + 0x0], 0x1

000000000002a388 <LBB194_27>:
   21617:	exit

000000000002a390 <LBB194_4>:
   21618:	lsh64 r0, 0x20
   21619:	rsh64 r0, 0x20
   21620:	jeq r0, 0x0, +0x13 <LBB194_7>

000000000002a3a8 <LBB194_5>:
   21621:	add64 r7, 0x50
   21622:	mov64 r1, r7

000000000002a3b8 <LBB194_6>:
   21623:	ldxdw r0, [r1 + 0x10]
   21624:	ldxdw r3, [r1 + 0x8]
   21625:	ldxdw r4, [r1 + 0x0]
   21626:	ldxdw r1, [r10 - 0x148]
   21627:	ldxb r5, [r1 + 0x3ac]
   21628:	ldxdw r1, [r10 - 0x138]
   21629:	jeq r5, 0x0, +0x3 <LBB194_26>
   21630:	ldxdw r5, [r9 + 0xf8]
   21631:	jeq r5, 0x0, +0x1 <LBB194_26>
   21632:	mov64 r0, r5

000000000002a408 <LBB194_26>:
   21633:	stxdw [r10 - 0x1000], r3
   21634:	stxdw [r10 - 0xff8], r0
   21635:	mov64 r5, r10
   21636:	mov64 r2, r9
   21637:	ldxdw r3, [r10 - 0x140]
   21638:	call -0x257
   21639:	ja -0x17 <LBB194_27>

000000000002a440 <LBB194_7>:
   21640:	mov64 r6, r9
   21641:	add64 r6, 0x40
   21642:	mov64 r1, r6
   21643:	lddw r2, 0x0
   21645:	mov64 r3, 0x20
   21646:	call -0x1
   21647:	lsh64 r0, 0x20
   21648:	rsh64 r0, 0x20
   21649:	jeq r0, 0x0, +0x8 <LBB194_9>
   21650:	mov64 r1, r6
   21651:	lddw r2, 0x0
   21653:	mov64 r3, 0x20
   21654:	call -0x1
   21655:	lsh64 r0, 0x20
   21656:	rsh64 r0, 0x20
   21657:	jne r0, 0x0, +0xb <LBB194_10>

000000000002a4d0 <LBB194_9>:
   21658:	ldxdw r3, [r7 + 0x10]
   21659:	ldxdw r2, [r7 + 0x8]
   21660:	mov64 r1, r10
   21661:	add64 r1, -0xf8
   21662:	ldxdw r4, [r10 - 0x150]
   21663:	ldxdw r5, [r10 - 0x158]
   21664:	call -0x114
   21665:	ldxdw r1, [r10 - 0xf0]
   21666:	ldxdw r2, [r10 - 0xf8]
   21667:	jeq r2, 0x2, -0x2d <LBB194_6>
   21668:	ja -0x38 <LBB194_23>

000000000002a528 <LBB194_10>:
   21669:	mov64 r1, r6
   21670:	lddw r2, 0x0
   21672:	mov64 r3, 0x20
   21673:	call -0x1
   21674:	lsh64 r0, 0x20
   21675:	rsh64 r0, 0x20
   21676:	jeq r0, 0x0, +0xb <LBB194_12>
   21677:	jgt r8, 0x1000, +0x1 <LBB194_17>
   21678:	ja -0x3a <LBB194_5>

000000000002a578 <LBB194_17>:
   21679:	mov64 r1, r7
   21680:	add64 r1, 0x68
   21681:	ldxdw r2, [r7 + 0x68]
   21682:	jne r2, 0x0, -0x3c <LBB194_6>
   21683:	ldxdw r2, [r7 + 0x70]
   21684:	jne r2, 0x0, -0x3e <LBB194_6>
   21685:	ldxdw r2, [r7 + 0x78]
   21686:	jeq r2, 0x0, -0x42 <LBB194_5>
   21687:	ja -0x41 <LBB194_6>

000000000002a5c0 <LBB194_12>:
   21688:	ldxdw r2, [r7 + 0x20]
   21689:	jgt r8, 0xfe8, +0x1 <LBB194_14>
   21690:	mov64 r2, 0x8

000000000002a5d8 <LBB194_14>:
   21691:	ldxdw r3, [r7 + 0x28]
   21692:	ldxdw r4, [r10 - 0x150]
   21693:	jgt r8, 0xfe8, +0x1 <LBB194_16>
   21694:	mov64 r3, 0x0

000000000002a5f8 <LBB194_16>:
   21695:	mov64 r1, r10
   21696:	add64 r1, -0xf8
   21697:	ldxdw r5, [r10 - 0x158]
   21698:	call -0x136
   21699:	ldxdw r1, [r10 - 0xf0]
   21700:	ldxdw r2, [r10 - 0xf8]
   21701:	jeq r2, 0x2, -0x4f <LBB194_6>
   21702:	ja -0x5a <LBB194_23>
