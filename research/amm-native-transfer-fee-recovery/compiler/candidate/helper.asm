
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/fee-crate-resolved/symbols.so:	file format elf64-sbf

Disassembly of section .text:

00000000000fb278 <_ZN19native_transfer_fee18DecodedTransferFee13calculate_fee17h0bbfa4719ba871fbE>:
  128591:	mov64 r4, r3
  128592:	mov64 r7, r2
  128593:	mov64 r6, r1
  128594:	mov64 r8, 0x1
  128595:	mov64 r1, 0x0
  128596:	jeq r4, 0x0, +0x2 <LBB0_2>
  128597:	ldxh r2, [r7 + 0x10]
  128598:	jne r2, 0x0, +0x3 <LBB0_3>

00000000000fb2b8 <LBB0_2>:
  128599:	stxdw [r6 + 0x8], r1
  128600:	stxdw [r6 + 0x0], r8
  128601:	exit

00000000000fb2d0 <LBB0_3>:
  128602:	mov64 r1, r10
  128603:	add64 r1, -0x10
  128604:	mov64 r8, 0x0
  128605:	mov64 r3, 0x0
  128606:	mov64 r5, 0x0
  128607:	call 0x50f1
  128608:	mov64 r2, 0x1
  128609:	ldxdw r3, [r10 - 0x8]
  128610:	mov64 r1, 0x1
  128611:	jgt r3, 0x270f, +0x1 <LBB0_5>
  128612:	mov64 r1, 0x0

00000000000fb328 <LBB0_5>:
  128613:	ldxdw r4, [r10 - 0x10]
  128614:	jgt r4, -0x2710, +0x1 <LBB0_7>
  128615:	mov64 r2, 0x0

00000000000fb340 <LBB0_7>:
  128616:	jeq r3, 0x270f, +0x1 <LBB0_9>
  128617:	mov64 r2, r1

00000000000fb350 <LBB0_9>:
  128618:	and64 r2, 0x1
  128619:	jne r2, 0x0, -0x15 <LBB0_2>
  128620:	mov64 r2, r4
  128621:	add64 r2, 0x270f
  128622:	mov64 r8, 0x1
  128623:	mov64 r1, 0x1
  128624:	jlt r2, r4, +0x1 <LBB0_12>
  128625:	mov64 r1, 0x0

00000000000fb390 <LBB0_12>:
  128626:	add64 r3, r1
  128627:	mov64 r1, r10
  128628:	add64 r1, -0x20
  128629:	mov64 r4, 0x2710
  128630:	mov64 r5, 0x0
  128631:	call 0x4e31
  128632:	ldxdw r2, [r7 + 0x8]
  128633:	ldxdw r1, [r10 - 0x20]
  128634:	jlt r1, r2, -0x24 <LBB0_2>
  128635:	mov64 r1, r2
  128636:	ja -0x26 <LBB0_2>
