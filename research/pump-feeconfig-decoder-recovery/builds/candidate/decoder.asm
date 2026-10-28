
/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder/local-feeconfig-rebuilt/symbols.so:	file format elf64-sbf

Disassembly of section .text:

000000000011fe80 <_ZN98_$LT$pump_recovered..pump_fees..accounts..FeeConfig$u20$as$u20$anchor_lang..AccountDeserialize$GT$25try_deserialize_unchecked17ha6db59aefe4d57f4E>:
  147408:	mov64 r3, r2
  147409:	mov64 r6, r1
  147410:	ldxdw r2, [r3 + 0x8]
  147411:	jgt r2, 0x7, +0x4 <LBB622_2>
  147412:	mov64 r1, 0x8
  147413:	lddw r3, 0x1a9820
  147415:	call 0xf72f

000000000011fec0 <LBB622_2>:
  147416:	ldxdw r1, [r3 + 0x0]
  147417:	mov64 r3, r1
  147418:	add64 r3, 0x8
  147419:	stxdw [r10 - 0x48], r3
  147420:	mov64 r4, r2
  147421:	add64 r4, -0x8
  147422:	stxdw [r10 - 0x40], r4
  147423:	jeq r4, 0x0, +0x67 <LBB622_12>
  147424:	jlt r4, 0x21, +0x66 <LBB622_12>
  147425:	ldxb r4, [r3 + 0x0]
  147426:	ldxdw r8, [r1 + 0xf]
  147427:	ldxb r3, [r1 + 0x17]
  147428:	stxb [r10 - 0x10], r3
  147429:	ldxw r3, [r1 + 0x9]
  147430:	stxw [r10 - 0x20], r3
  147431:	ldxh r3, [r1 + 0xd]
  147432:	stxh [r10 - 0x1c], r3
  147433:	stxdw [r10 - 0x18], r8
  147434:	ldxdw r9, [r10 - 0x17]
  147435:	ldxdw r3, [r1 + 0x18]
  147436:	stxdw [r10 - 0x38], r3
  147437:	ldxdw r3, [r1 + 0x20]
  147438:	stxdw [r10 - 0x30], r3
  147439:	ldxb r3, [r1 + 0x28]
  147440:	stxb [r10 - 0x28], r3
  147441:	mov64 r3, r2
  147442:	add64 r3, -0x29
  147443:	jlt r3, 0x8, +0x53 <LBB622_12>
  147444:	mov64 r3, r2
  147445:	add64 r3, -0x31
  147446:	jlt r3, 0x8, +0x50 <LBB622_12>
  147447:	mov64 r3, r2
  147448:	add64 r3, -0x39
  147449:	jlt r3, 0x8, +0x4d <LBB622_12>
  147450:	stxdw [r10 - 0x60], r4
  147451:	ldxdw r3, [r1 + 0x29]
  147452:	stxdw [r10 - 0x68], r3
  147453:	ldxdw r3, [r1 + 0x31]
  147454:	stxdw [r10 - 0x70], r3
  147455:	add64 r2, -0x41
  147456:	ldxdw r3, [r1 + 0x39]
  147457:	stxdw [r10 - 0x78], r3
  147458:	stxdw [r10 - 0x40], r2
  147459:	add64 r1, 0x41
  147460:	stxdw [r10 - 0x48], r1
  147461:	mov64 r1, r10
  147462:	add64 r1, -0x18
  147463:	mov64 r2, r10
  147464:	add64 r2, -0x48
  147465:	call -0x216ff
  147466:	ldxdw r7, [r10 - 0x10]
  147467:	ldxdw r1, [r10 - 0x18]
  147468:	lddw r2, -0x8000000000000000
  147470:	jeq r1, r2, +0x3c <LBB622_15>
  147471:	stxdw [r10 - 0x80], r1
  147472:	ldxdw r1, [r10 - 0x8]
  147473:	stxdw [r10 - 0x88], r1
  147474:	mov64 r1, r10
  147475:	add64 r1, -0x18
  147476:	mov64 r2, r10
  147477:	add64 r2, -0x48
  147478:	call -0x2170c
  147479:	ldxdw r1, [r10 - 0x10]
  147480:	ldxdw r2, [r10 - 0x18]
  147481:	lddw r3, -0x8000000000000000
  147483:	jeq r2, r3, +0x45 <LBB622_14>
  147484:	ldxdw r3, [r10 - 0x40]
  147485:	jlt r3, 0x8, +0x29 <LBB622_12>
  147486:	and64 r3, -0x8
  147487:	jeq r3, 0x8, +0x27 <LBB622_12>
  147488:	jeq r3, 0x10, +0x26 <LBB622_12>
  147489:	ldxdw r3, [r10 - 0x8]
  147490:	stxdw [r10 - 0x90], r3
  147491:	ldxdw r4, [r10 - 0x48]
  147492:	ldxdw r5, [r4 + 0x0]
  147493:	ldxdw r0, [r4 + 0x8]
  147494:	ldxdw r4, [r4 + 0x10]
  147495:	ldxh r3, [r10 - 0x1c]
  147496:	stxh [r6 + 0x34], r3
  147497:	ldxw r3, [r10 - 0x20]
  147498:	stxw [r6 + 0x30], r3
  147499:	ldxdw r3, [r10 - 0x38]
  147500:	stxdw [r6 + 0x3f], r3
  147501:	ldxdw r3, [r10 - 0x30]
  147502:	stxdw [r6 + 0x47], r3
  147503:	ldxb r3, [r10 - 0x28]
  147504:	stxb [r6 + 0x4f], r3
  147505:	ldxdw r3, [r10 - 0x60]
  147506:	stxb [r6 + 0x80], r3
  147507:	stxdw [r6 + 0x78], r4
  147508:	stxdw [r6 + 0x70], r0
  147509:	stxdw [r6 + 0x68], r5
  147510:	ldxdw r3, [r10 - 0x78]
  147511:	stxdw [r6 + 0x60], r3
  147512:	ldxdw r3, [r10 - 0x70]
  147513:	stxdw [r6 + 0x58], r3
  147514:	ldxdw r3, [r10 - 0x68]
  147515:	stxdw [r6 + 0x50], r3
  147516:	stxdw [r6 + 0x37], r9
  147517:	stxb [r6 + 0x36], r8
  147518:	ldxdw r3, [r10 - 0x90]
  147519:	stxdw [r6 + 0x28], r3
  147520:	stxdw [r6 + 0x20], r1
  147521:	stxdw [r6 + 0x18], r2
  147522:	ldxdw r1, [r10 - 0x88]
  147523:	stxdw [r6 + 0x10], r1
  147524:	stxdw [r6 + 0x8], r7
  147525:	ldxdw r1, [r10 - 0x80]
  147526:	ja +0x18 <LBB622_19>

0000000000120238 <LBB622_12>:
  147527:	lddw r1, 0x1a8bd8
  147529:	call 0xe3fe
  147530:	mov64 r7, r0

0000000000120258 <LBB622_15>:
  147531:	mov64 r1, r10
  147532:	add64 r1, -0x58
  147533:	mov64 r2, 0xbbb
  147534:	call 0xd08f
  147535:	ldxdw r9, [r10 - 0x50]
  147536:	ldxdw r8, [r10 - 0x58]
  147537:	mov64 r1, r7
  147538:	and64 r1, 0x3
  147539:	mov64 r2, r1
  147540:	add64 r2, -0x2
  147541:	jlt r2, 0x2, +0x5 <LBB622_18>
  147542:	jeq r1, 0x0, +0x4 <LBB622_18>
  147543:	ldxdw r1, [r7 - 0x1]
  147544:	ldxdw r2, [r7 + 0x7]
  147545:	ldxdw r2, [r2 + 0x0]
  147546:	callx r2

00000000001202d8 <LBB622_18>:
  147547:	stxdw [r6 + 0x10], r9
  147548:	stxdw [r6 + 0x8], r8
  147549:	lddw r1, -0x8000000000000000

00000000001202f8 <LBB622_19>:
  147551:	stxdw [r6 + 0x0], r1
  147552:	exit

0000000000120308 <LBB622_14>:
  147553:	mov64 r7, r1
  147554:	ja -0x18 <LBB622_15>
