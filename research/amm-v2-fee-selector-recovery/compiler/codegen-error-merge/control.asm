
/home/ahi200/pumpfun-work/20261028-amm-v2-selector/codegen-error-merge/control.o:	file format elf64-sbf

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
   21509:	jne r1, 0x0, +0x3f <LBB194_2>
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
   21549:	jgt r8, 0x9cf, +0x1 <LBB194_6>
   21550:	ja +0x1a <LBB194_4>

000000000002a178 <LBB194_6>:
   21551:	lsh64 r0, 0x20
   21552:	rsh64 r0, 0x20
   21553:	jeq r0, 0x0, +0x59 <LBB194_28>

000000000002a190 <LBB194_7>:
   21554:	add64 r7, 0x50
   21555:	mov64 r1, r7

000000000002a1a0 <LBB194_8>:
   21556:	ldxdw r0, [r1 + 0x10]
   21557:	ldxdw r3, [r1 + 0x8]
   21558:	ldxdw r4, [r1 + 0x0]
   21559:	ldxdw r1, [r10 - 0x148]
   21560:	ldxb r5, [r1 + 0x3ac]
   21561:	ldxdw r1, [r10 - 0x138]
   21562:	jeq r5, 0x0, +0x3 <LBB194_24>
   21563:	ldxdw r5, [r9 + 0xf8]
   21564:	jeq r5, 0x0, +0x1 <LBB194_24>
   21565:	mov64 r0, r5

000000000002a1f0 <LBB194_24>:
   21566:	stxdw [r10 - 0x1000], r3
   21567:	stxdw [r10 - 0xff8], r0
   21568:	mov64 r5, r10
   21569:	mov64 r2, r9
   21570:	ldxdw r3, [r10 - 0x140]
   21571:	call -0x214
   21572:	ja +0x45 <LBB194_27>

000000000002a228 <LBB194_2>:
   21573:	ldxdw r1, [r10 - 0xe8]

000000000002a230 <LBB194_3>:
   21574:	stxdw [r7 + 0x10], r1
   21575:	stxdw [r7 + 0x8], r2
   21576:	ja +0x40 <LBB194_26>

000000000002a248 <LBB194_4>:
   21577:	mov64 r1, r10
   21578:	add64 r1, -0x58
   21579:	lddw r2, 0x0
   21581:	call -0x1
   21582:	stdw [r10 - 0x108], 0x0
   21583:	stdw [r10 - 0x110], 0x1
   21584:	stdw [r10 - 0x118], 0x0
   21585:	lddw r1, 0x0
   21587:	stxdw [r10 - 0x18], r1
   21588:	mov64 r1, r10
   21589:	add64 r1, -0x118
   21590:	stxdw [r10 - 0x20], r1
   21591:	stb [r10 - 0x8], 0x3
   21592:	stdw [r10 - 0x10], 0x20
   21593:	stdw [r10 - 0x30], 0x0
   21594:	stdw [r10 - 0x40], 0x0
   21595:	mov64 r2, r10
   21596:	add64 r2, -0x40
   21597:	lddw r1, 0x0
   21599:	call -0x1
   21600:	jeq r0, 0x0, +0xa <LBB194_25>
   21601:	mov64 r3, r10
   21602:	add64 r3, -0xf8
   21603:	lddw r1, 0x0
   21605:	mov64 r2, 0x37
   21606:	lddw r4, 0x0
   21608:	lddw r5, 0x0
   21610:	call -0x1

000000000002a358 <LBB194_25>:
   21611:	ldxdw r1, [r10 - 0x108]
   21612:	stxdw [r10 - 0xb0], r1
   21613:	ldxdw r1, [r10 - 0x110]
   21614:	stxdw [r10 - 0xb8], r1
   21615:	ldxdw r1, [r10 - 0x118]
   21616:	stxdw [r10 - 0xc0], r1
   21617:	ldxdw r1, [r10 - 0x58]
   21618:	stxdw [r10 - 0xd8], r1
   21619:	ldxdw r1, [r10 - 0x50]
   21620:	stxdw [r10 - 0xd0], r1
   21621:	ldxdw r1, [r10 - 0x48]
   21622:	stxdw [r10 - 0xc8], r1
   21623:	lddw r1, 0x0
   21625:	stxdw [r10 - 0xf0], r1
   21626:	stw [r10 - 0x60], 0x17c3
   21627:	stb [r10 - 0xa8], 0x2
   21628:	stw [r10 - 0xe0], 0xb8
   21629:	stdw [r10 - 0xe8], 0x23
   21630:	stdw [r10 - 0xf8], 0x0
   21631:	mov64 r1, r10
   21632:	add64 r1, -0x128
   21633:	mov64 r2, r10
   21634:	add64 r2, -0xf8
   21635:	call -0x1
   21636:	ldxdw r1, [r10 - 0x128]
   21637:	ldxdw r2, [r10 - 0x120]
   21638:	ldxdw r7, [r10 - 0x138]
   21639:	stxdw [r7 + 0x10], r2
   21640:	stxdw [r7 + 0x8], r1

000000000002a448 <LBB194_26>:
   21641:	stdw [r7 + 0x0], 0x1

000000000002a450 <LBB194_27>:
   21642:	exit

000000000002a458 <LBB194_28>:
   21643:	mov64 r6, r9
   21644:	add64 r6, 0x40
   21645:	mov64 r1, r6
   21646:	lddw r2, 0x0
   21648:	mov64 r3, 0x20
   21649:	call -0x1
   21650:	lsh64 r0, 0x20
   21651:	rsh64 r0, 0x20
   21652:	jeq r0, 0x0, +0x8 <LBB194_10>
   21653:	mov64 r1, r6
   21654:	lddw r2, 0x0
   21656:	mov64 r3, 0x20
   21657:	call -0x1
   21658:	lsh64 r0, 0x20
   21659:	rsh64 r0, 0x20
   21660:	jne r0, 0x0, +0xc <LBB194_11>

000000000002a4e8 <LBB194_10>:
   21661:	ldxdw r3, [r7 + 0x10]
   21662:	ldxdw r2, [r7 + 0x8]
   21663:	mov64 r1, r10
   21664:	add64 r1, -0xf8
   21665:	ldxdw r4, [r10 - 0x150]
   21666:	ldxdw r5, [r10 - 0x158]
   21667:	call -0x117
   21668:	ldxdw r1, [r10 - 0xf0]
   21669:	ldxdw r2, [r10 - 0xf8]
   21670:	jeq r2, 0x2, -0x73 <LBB194_8>

000000000002a538 <LBB194_21>:
   21671:	ldxdw r7, [r10 - 0x138]
   21672:	ja -0x63 <LBB194_3>

000000000002a548 <LBB194_11>:
   21673:	mov64 r1, r6
   21674:	lddw r2, 0x0
   21676:	mov64 r3, 0x20
   21677:	call -0x1
   21678:	lsh64 r0, 0x20
   21679:	rsh64 r0, 0x20
   21680:	jeq r0, 0x0, +0xb <LBB194_13>
   21681:	jgt r8, 0x1000, +0x1 <LBB194_18>
   21682:	ja -0x81 <LBB194_7>

000000000002a598 <LBB194_18>:
   21683:	mov64 r1, r7
   21684:	add64 r1, 0x68
   21685:	ldxdw r2, [r7 + 0x68]
   21686:	jne r2, 0x0, -0x83 <LBB194_8>
   21687:	ldxdw r2, [r7 + 0x70]
   21688:	jne r2, 0x0, -0x85 <LBB194_8>
   21689:	ldxdw r2, [r7 + 0x78]
   21690:	jeq r2, 0x0, -0x89 <LBB194_7>
   21691:	ja -0x88 <LBB194_8>

000000000002a5e0 <LBB194_13>:
   21692:	ldxdw r2, [r7 + 0x20]
   21693:	jgt r8, 0xfe8, +0x1 <LBB194_15>
   21694:	mov64 r2, 0x8

000000000002a5f8 <LBB194_15>:
   21695:	ldxdw r3, [r7 + 0x28]
   21696:	ldxdw r4, [r10 - 0x150]
   21697:	jgt r8, 0xfe8, +0x1 <LBB194_17>
   21698:	mov64 r3, 0x0

000000000002a618 <LBB194_17>:
   21699:	mov64 r1, r10
   21700:	add64 r1, -0xf8
   21701:	ldxdw r5, [r10 - 0x158]
   21702:	call -0x13a
   21703:	ldxdw r1, [r10 - 0xf0]
   21704:	ldxdw r2, [r10 - 0xf8]
   21705:	jeq r2, 0x2, -0x96 <LBB194_8>
   21706:	ja -0x24 <LBB194_21>
