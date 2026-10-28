
/home/ahi200/pumpfun-work/20261028-amm-select-resume/hop-codegen-qualified2/PLC.o:	file format elf64-sbf

Disassembly of section .text:

0000000000045128 <_ZN18pump_amm_recovered12instructions4swap14multi_hop_swap14apply_hop_fees17hc089821ee832d2d0E>:
   35365:	mov64 r7, r2
   35366:	mov64 r6, r1
   35367:	ldxdw r1, [r7 + 0x10]
   35368:	ldxdw r4, [r1 + 0x20]
   35369:	ldxdw r1, [r7 + 0x0]
   35370:	ldxdw r2, [r1 + 0x0]
   35371:	ldxdw r1, [r7 + 0x18]
   35372:	ldxdw r1, [r1 + 0x0]
   35373:	ldxdw r5, [r7 + 0x20]
   35374:	ldxdw r5, [r5 + 0x0]
   35375:	ldxdw r0, [r7 + 0x28]
   35376:	ldxdw r8, [r0 + 0x0]
   35377:	ldxdw r0, [r7 + 0x8]
   35378:	ldxdw r9, [r7 + 0x30]
   35379:	ldxdw r9, [r9 + 0x0]
   35380:	stxdw [r10 - 0xfe8], r9
   35381:	stxdw [r10 - 0xfe0], r3
   35382:	stxdw [r10 - 0xff0], r8
   35383:	stxdw [r10 - 0xff8], r5
   35384:	stxdw [r10 - 0x1000], r1
   35385:	add64 r0, 0x8
   35386:	add64 r2, 0x8
   35387:	mov64 r1, r10
   35388:	add64 r1, -0x38
   35389:	mov64 r5, r10
   35390:	mov64 r3, r0
   35391:	call -0x1
   35392:	ldxdw r1, [r10 - 0x38]
   35393:	jne r1, 0x0, +0x1f <LBB259_2>
   35394:	ldxdw r2, [r7 + 0x38]
   35395:	ldxh r1, [r2 + 0x0]
   35396:	mov64 r4, r1
   35397:	lsh64 r4, 0x37
   35398:	arsh64 r4, 0x3f
   35399:	ldxdw r3, [r10 - 0x20]
   35400:	mov64 r5, r4
   35401:	and64 r5, r3
   35402:	ldxdw r3, [r10 - 0x8]
   35403:	and64 r4, r3
   35404:	ldxb r2, [r2 + 0x2]
   35405:	ldxdw r3, [r10 - 0x28]
   35406:	ldxdw r0, [r10 - 0x30]
   35407:	ldxdw r7, [r10 - 0x10]
   35408:	ldxdw r8, [r10 - 0x18]
   35409:	stxdw [r6 + 0x30], r4
   35410:	stxdw [r6 + 0x18], r5
   35411:	lsh64 r2, 0x3f
   35412:	arsh64 r2, 0x3f
   35413:	mov64 r4, r2
   35414:	and64 r4, r8
   35415:	stxdw [r6 + 0x20], r4
   35416:	and64 r1, 0x1
   35417:	neg64 r1
   35418:	mov64 r4, r1
   35419:	and64 r4, r7
   35420:	stxdw [r6 + 0x28], r4
   35421:	and64 r2, r0
   35422:	and64 r1, r3
   35423:	mov64 r3, 0x0
   35424:	ja +0x3 <LBB259_3>

0000000000045308 <LBB259_2>:
   35425:	mov64 r3, 0x1
   35426:	ldxdw r1, [r10 - 0x28]
   35427:	ldxdw r2, [r10 - 0x30]

0000000000045320 <LBB259_3>:
   35428:	stxdw [r6 + 0x10], r1
   35429:	stxdw [r6 + 0x8], r2
   35430:	stxdw [r6 + 0x0], r3
   35431:	exit
