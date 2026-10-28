
/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   59593:	mov64 r6, r1
   59594:	ldxdw r1, [r2 + 0x0]
   59595:	jne r1, 0x0, +0x3 <.text+0x74558>
   59596:	stdw [r6 + 0x0], 0x2
   59597:	stdw [r6 + 0x8], 0x0
   59598:	ja +0x50 <.text+0x747d8>
   59599:	ldxdw r1, [r2 + 0x18]
   59600:	stxdw [r10 - 0x118], r1
   59601:	ldxdw r1, [r2 + 0x10]
   59602:	stxdw [r10 - 0x120], r1
   59603:	ldxdw r1, [r2 + 0x8]
   59604:	stxdw [r10 - 0x128], r1
   59605:	mov64 r1, r10
   59606:	add64 r1, -0x138
   59607:	mov64 r2, r10
   59608:	add64 r2, -0x128
   59609:	call 0xfcd2
   59610:	ldxdw r1, [r10 - 0x138]
   59611:	jeq r1, 0x0, +0x4 <.text+0x745e0>
   59612:	ldxdw r1, [r10 - 0x130]
   59613:	stxdw [r6 + 0x8], r1
   59614:	stdw [r6 + 0x0], 0x2
   59615:	ja +0x3f <.text+0x747d8>
   59616:	mov64 r1, r10
   59617:	add64 r1, -0x70
   59618:	lddw r2, 0x11c040
   59620:	call 0x19a
   59621:	stdw [r10 - 0x48], 0x0
   59622:	stdw [r10 - 0x50], 0x1
   59623:	stdw [r10 - 0x58], 0x0
   59624:	lddw r1, 0x1221e0
   59626:	stxdw [r10 - 0x18], r1
   59627:	mov64 r1, r10
   59628:	add64 r1, -0x58
   59629:	stxdw [r10 - 0x20], r1
   59630:	stb [r10 - 0x8], 0x3
   59631:	stdw [r10 - 0x10], 0x20
   59632:	stdw [r10 - 0x30], 0x0
   59633:	stdw [r10 - 0x40], 0x0
   59634:	mov64 r2, r10
   59635:	add64 r2, -0x40
   59636:	lddw r1, 0x11c040
   59638:	call 0xc7d
   59639:	jeq r0, 0x0, +0xa <.text+0x746f0>
   59640:	mov64 r3, r10
   59641:	add64 r3, -0x110
   59642:	lddw r1, 0x11c0fa
   59644:	mov64 r2, 0x37
   59645:	lddw r4, 0x122210
   59647:	lddw r5, 0x122230
   59649:	call 0x13cf1
   59650:	ldxdw r1, [r10 - 0x48]
   59651:	stxdw [r10 - 0xc8], r1
   59652:	ldxdw r1, [r10 - 0x50]
   59653:	stxdw [r10 - 0xd0], r1
   59654:	ldxdw r1, [r10 - 0x58]
   59655:	stxdw [r10 - 0xd8], r1
   59656:	ldxdw r1, [r10 - 0x70]
   59657:	stxdw [r10 - 0xf0], r1
   59658:	ldxdw r1, [r10 - 0x68]
   59659:	stxdw [r10 - 0xe8], r1
   59660:	ldxdw r1, [r10 - 0x60]
   59661:	stxdw [r10 - 0xe0], r1
   59662:	lddw r1, 0x11d044
   59664:	stxdw [r10 - 0x108], r1
   59665:	stw [r10 - 0x78], 0x1787
   59666:	stb [r10 - 0xc0], 0x2
   59667:	stw [r10 - 0xf8], 0x31
   59668:	stdw [r10 - 0x100], 0x2b
   59669:	stdw [r10 - 0x110], 0x0
   59670:	mov64 r1, r10
   59671:	add64 r1, -0x148
   59672:	mov64 r2, r10
   59673:	add64 r2, -0x110
   59674:	call 0x11cdc
   59675:	ldxdw r1, [r10 - 0x148]
   59676:	ldxdw r2, [r10 - 0x140]
   59677:	stxdw [r6 + 0x8], r2
   59678:	stxdw [r6 + 0x0], r1
   59679:	exit
