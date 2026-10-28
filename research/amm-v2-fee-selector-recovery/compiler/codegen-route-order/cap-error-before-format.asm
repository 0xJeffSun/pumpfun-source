
/home/ahi200/pumpfun-work/20261028-amm-v2-selector/codegen-route-order/cap-error-before-format.o:	file format elf64-sbf

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
   21509:	jne r1, 0x0, +0x4a <LBB194_4>
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
   21549:	jgt r8, 0x9cf, +0x44 <LBB194_6>
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
   21573:	jeq r0, 0x0, +0xc <LBB194_23>
   21574:	mov64 r3, r10
   21575:	add64 r3, -0xf8
   21576:	lddw r1, 0x0
   21578:	mov64 r2, 0x37
   21579:	lddw r4, 0x0
   21581:	lddw r5, 0x0
   21583:	call -0x1

000000000002a280 <LBB194_4>:
   21584:	ldxdw r1, [r10 - 0xe8]
   21585:	ja +0x1c <LBB194_5>

000000000002a290 <LBB194_23>:
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

000000000002a368 <LBB194_24>:
   21613:	ldxdw r7, [r10 - 0x138]

000000000002a370 <LBB194_5>:
   21614:	stxdw [r7 + 0x10], r1
   21615:	stxdw [r7 + 0x8], r2
   21616:	stdw [r7 + 0x0], 0x1

000000000002a388 <LBB194_28>:
   21617:	exit

000000000002a390 <LBB194_6>:
   21618:	lsh64 r0, 0x20
   21619:	rsh64 r0, 0x20
   21620:	jeq r0, 0x0, +0x3 <LBB194_8>

000000000002a3a8 <LBB194_7>:
   21621:	add64 r7, 0x50
   21622:	mov64 r1, r7
   21623:	ja +0x3e <LBB194_22>

000000000002a3c0 <LBB194_8>:
   21624:	mov64 r6, r9
   21625:	add64 r6, 0x40
   21626:	mov64 r1, r6
   21627:	lddw r2, 0x0
   21629:	mov64 r3, 0x20
   21630:	call -0x1
   21631:	lsh64 r0, 0x20
   21632:	rsh64 r0, 0x20
   21633:	jeq r0, 0x0, +0x2a <LBB194_21>
   21634:	mov64 r1, r6
   21635:	lddw r2, 0x0
   21637:	mov64 r3, 0x20
   21638:	call -0x1
   21639:	lsh64 r0, 0x20
   21640:	rsh64 r0, 0x20
   21641:	jeq r0, 0x0, +0x22 <LBB194_21>
   21642:	mov64 r1, r6
   21643:	lddw r2, 0x0
   21645:	mov64 r3, 0x20
   21646:	call -0x1
   21647:	lsh64 r0, 0x20
   21648:	rsh64 r0, 0x20
   21649:	jeq r0, 0x0, +0xb <LBB194_12>
   21650:	jgt r8, 0x1000, +0x1 <LBB194_17>
   21651:	ja +0x8 <LBB194_20>

000000000002a4a0 <LBB194_17>:
   21652:	mov64 r1, r7
   21653:	add64 r1, 0x68
   21654:	ldxdw r2, [r7 + 0x68]
   21655:	jne r2, 0x0, +0x1e <LBB194_22>
   21656:	ldxdw r2, [r7 + 0x70]
   21657:	jne r2, 0x0, +0x1c <LBB194_22>
   21658:	ldxdw r2, [r7 + 0x78]
   21659:	jne r2, 0x0, +0x1a <LBB194_22>

000000000002a4e0 <LBB194_20>:
   21660:	ja -0x28 <LBB194_7>

000000000002a4e8 <LBB194_12>:
   21661:	ldxdw r2, [r7 + 0x20]
   21662:	jgt r8, 0xfe8, +0x1 <LBB194_14>
   21663:	mov64 r2, 0x8

000000000002a500 <LBB194_14>:
   21664:	ldxdw r3, [r7 + 0x28]
   21665:	ldxdw r4, [r10 - 0x150]
   21666:	jgt r8, 0xfe8, +0x1 <LBB194_16>
   21667:	mov64 r3, 0x0

000000000002a520 <LBB194_16>:
   21668:	mov64 r1, r10
   21669:	add64 r1, -0xf8
   21670:	ldxdw r5, [r10 - 0x158]
   21671:	call -0x11b
   21672:	ldxdw r1, [r10 - 0xf0]
   21673:	ldxdw r2, [r10 - 0xf8]
   21674:	jeq r2, 0x2, +0xb <LBB194_22>
   21675:	ja -0x3f <LBB194_24>

000000000002a560 <LBB194_21>:
   21676:	ldxdw r3, [r7 + 0x10]
   21677:	ldxdw r2, [r7 + 0x8]
   21678:	mov64 r1, r10
   21679:	add64 r1, -0xf8
   21680:	ldxdw r4, [r10 - 0x150]
   21681:	ldxdw r5, [r10 - 0x158]
   21682:	call -0x126
   21683:	ldxdw r1, [r10 - 0xf0]
   21684:	ldxdw r2, [r10 - 0xf8]
   21685:	jne r2, 0x2, -0x49 <LBB194_24>

000000000002a5b0 <LBB194_22>:
   21686:	ldxdw r0, [r1 + 0x10]
   21687:	ldxdw r3, [r1 + 0x8]
   21688:	ldxdw r4, [r1 + 0x0]
   21689:	ldxdw r1, [r10 - 0x148]
   21690:	ldxb r5, [r1 + 0x3ac]
   21691:	ldxdw r1, [r10 - 0x138]
   21692:	jeq r5, 0x0, +0x3 <LBB194_27>
   21693:	ldxdw r5, [r9 + 0xf8]
   21694:	jeq r5, 0x0, +0x1 <LBB194_27>
   21695:	mov64 r0, r5

000000000002a600 <LBB194_27>:
   21696:	stxdw [r10 - 0x1000], r3
   21697:	stxdw [r10 - 0xff8], r0
   21698:	mov64 r5, r10
   21699:	mov64 r2, r9
   21700:	ldxdw r3, [r10 - 0x140]
   21701:	call -0x296
   21702:	ja -0x56 <LBB194_28>
