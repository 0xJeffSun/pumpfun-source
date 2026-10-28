
/home/ahi200/pumpfun-work/20261028-amm-v2-selector/codegen-error-merge/merge-guard.o:	file format elf64-sbf

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
   21550:	ja +0x18 <LBB194_4>

000000000002a178 <LBB194_6>:
   21551:	lsh64 r0, 0x20
   21552:	rsh64 r0, 0x20
   21553:	jeq r0, 0x0, +0x57 <LBB194_27>

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
   21562:	jeq r5, 0x0, +0x3 <LBB194_25>
   21563:	ldxdw r5, [r9 + 0xf8]
   21564:	jeq r5, 0x0, +0x1 <LBB194_25>
   21565:	mov64 r0, r5

000000000002a1f0 <LBB194_25>:
   21566:	stxdw [r10 - 0x1000], r3
   21567:	stxdw [r10 - 0xff8], r0
   21568:	mov64 r5, r10
   21569:	mov64 r2, r9
   21570:	ldxdw r3, [r10 - 0x140]
   21571:	call -0x214
   21572:	ja +0x43 <LBB194_26>

000000000002a228 <LBB194_2>:
   21573:	ldxdw r1, [r10 - 0xe8]
   21574:	ja +0x3e <LBB194_3>

000000000002a238 <LBB194_4>:
   21575:	mov64 r1, r10
   21576:	add64 r1, -0x58
   21577:	lddw r2, 0x0
   21579:	call -0x1
   21580:	stdw [r10 - 0x108], 0x0
   21581:	stdw [r10 - 0x110], 0x1
   21582:	stdw [r10 - 0x118], 0x0
   21583:	lddw r1, 0x0
   21585:	stxdw [r10 - 0x18], r1
   21586:	mov64 r1, r10
   21587:	add64 r1, -0x118
   21588:	stxdw [r10 - 0x20], r1
   21589:	stb [r10 - 0x8], 0x3
   21590:	stdw [r10 - 0x10], 0x20
   21591:	stdw [r10 - 0x30], 0x0
   21592:	stdw [r10 - 0x40], 0x0
   21593:	mov64 r2, r10
   21594:	add64 r2, -0x40
   21595:	lddw r1, 0x0
   21597:	call -0x1
   21598:	jeq r0, 0x0, +0xa <LBB194_21>
   21599:	mov64 r3, r10
   21600:	add64 r3, -0xf8
   21601:	lddw r1, 0x0
   21603:	mov64 r2, 0x37
   21604:	lddw r4, 0x0
   21606:	lddw r5, 0x0
   21608:	call -0x1

000000000002a348 <LBB194_21>:
   21609:	ldxdw r1, [r10 - 0x108]
   21610:	stxdw [r10 - 0xb0], r1
   21611:	ldxdw r1, [r10 - 0x110]
   21612:	stxdw [r10 - 0xb8], r1
   21613:	ldxdw r1, [r10 - 0x118]
   21614:	stxdw [r10 - 0xc0], r1
   21615:	ldxdw r1, [r10 - 0x58]
   21616:	stxdw [r10 - 0xd8], r1
   21617:	ldxdw r1, [r10 - 0x50]
   21618:	stxdw [r10 - 0xd0], r1
   21619:	ldxdw r1, [r10 - 0x48]
   21620:	stxdw [r10 - 0xc8], r1
   21621:	lddw r1, 0x0
   21623:	stxdw [r10 - 0xf0], r1
   21624:	stw [r10 - 0x60], 0x17c3
   21625:	stb [r10 - 0xa8], 0x2
   21626:	stw [r10 - 0xe0], 0xb8
   21627:	stdw [r10 - 0xe8], 0x23
   21628:	stdw [r10 - 0xf8], 0x0
   21629:	mov64 r1, r10
   21630:	add64 r1, -0x128
   21631:	mov64 r2, r10
   21632:	add64 r2, -0xf8
   21633:	call -0x1
   21634:	ldxdw r1, [r10 - 0x120]
   21635:	ldxdw r2, [r10 - 0x128]

000000000002a420 <LBB194_22>:
   21636:	ldxdw r7, [r10 - 0x138]

000000000002a428 <LBB194_3>:
   21637:	stxdw [r7 + 0x10], r1
   21638:	stxdw [r7 + 0x8], r2
   21639:	stdw [r7 + 0x0], 0x1

000000000002a440 <LBB194_26>:
   21640:	exit

000000000002a448 <LBB194_27>:
   21641:	mov64 r6, r9
   21642:	add64 r6, 0x40
   21643:	mov64 r1, r6
   21644:	lddw r2, 0x0
   21646:	mov64 r3, 0x20
   21647:	call -0x1
   21648:	lsh64 r0, 0x20
   21649:	rsh64 r0, 0x20
   21650:	jeq r0, 0x0, +0x8 <LBB194_10>
   21651:	mov64 r1, r6
   21652:	lddw r2, 0x0
   21654:	mov64 r3, 0x20
   21655:	call -0x1
   21656:	lsh64 r0, 0x20
   21657:	rsh64 r0, 0x20
   21658:	jne r0, 0x0, +0xb <LBB194_11>

000000000002a4d8 <LBB194_10>:
   21659:	ldxdw r3, [r7 + 0x10]
   21660:	ldxdw r2, [r7 + 0x8]
   21661:	mov64 r1, r10
   21662:	add64 r1, -0xf8
   21663:	ldxdw r4, [r10 - 0x150]
   21664:	ldxdw r5, [r10 - 0x158]
   21665:	call -0x115
   21666:	ldxdw r1, [r10 - 0xf0]
   21667:	ldxdw r2, [r10 - 0xf8]
   21668:	jeq r2, 0x2, -0x71 <LBB194_8>
   21669:	ja -0x22 <LBB194_22>

000000000002a530 <LBB194_11>:
   21670:	mov64 r1, r6
   21671:	lddw r2, 0x0
   21673:	mov64 r3, 0x20
   21674:	call -0x1
   21675:	lsh64 r0, 0x20
   21676:	rsh64 r0, 0x20
   21677:	jeq r0, 0x0, +0xb <LBB194_13>
   21678:	jgt r8, 0x1000, +0x1 <LBB194_18>
   21679:	ja -0x7e <LBB194_7>

000000000002a580 <LBB194_18>:
   21680:	mov64 r1, r7
   21681:	add64 r1, 0x68
   21682:	ldxdw r2, [r7 + 0x68]
   21683:	jne r2, 0x0, -0x80 <LBB194_8>
   21684:	ldxdw r2, [r7 + 0x70]
   21685:	jne r2, 0x0, -0x82 <LBB194_8>
   21686:	ldxdw r2, [r7 + 0x78]
   21687:	jeq r2, 0x0, -0x86 <LBB194_7>
   21688:	ja -0x85 <LBB194_8>

000000000002a5c8 <LBB194_13>:
   21689:	ldxdw r2, [r7 + 0x20]
   21690:	jgt r8, 0xfe8, +0x1 <LBB194_15>
   21691:	mov64 r2, 0x8

000000000002a5e0 <LBB194_15>:
   21692:	ldxdw r3, [r7 + 0x28]
   21693:	ldxdw r4, [r10 - 0x150]
   21694:	jgt r8, 0xfe8, +0x1 <LBB194_17>
   21695:	mov64 r3, 0x0

000000000002a600 <LBB194_17>:
   21696:	mov64 r1, r10
   21697:	add64 r1, -0xf8
   21698:	ldxdw r5, [r10 - 0x158]
   21699:	call -0x137
   21700:	ldxdw r1, [r10 - 0xf0]
   21701:	ldxdw r2, [r10 - 0xf8]
   21702:	jeq r2, 0x2, -0x93 <LBB194_8>
   21703:	ja -0x44 <LBB194_22>
