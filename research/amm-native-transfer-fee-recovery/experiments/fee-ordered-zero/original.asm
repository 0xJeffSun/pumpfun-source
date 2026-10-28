
/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
  124332:	mov64 r4, r3
  124333:	mov64 r7, r2
  124334:	mov64 r6, r1
  124335:	mov64 r8, 0x1
  124336:	mov64 r1, 0x0
  124337:	jeq r4, 0x0, +0x2 <custom_panic+0x48f0>
  124338:	ldxh r2, [r7 + 0x10]
  124339:	jne r2, 0x0, +0x3 <custom_panic+0x4908>
  124340:	stxdw [r6 + 0x8], r1
  124341:	stxdw [r6 + 0x0], r8
  124342:	exit
  124343:	mov64 r1, r10
  124344:	add64 r1, -0x10
  124345:	mov64 r8, 0x0
  124346:	mov64 r3, 0x0
  124347:	mov64 r5, 0x0
  124348:	call 0x5149
  124349:	mov64 r2, 0x1
  124350:	ldxdw r3, [r10 - 0x8]
  124351:	mov64 r1, 0x1
  124352:	jgt r3, 0x270f, +0x1 <custom_panic+0x4960>
  124353:	mov64 r1, 0x0
  124354:	ldxdw r4, [r10 - 0x10]
  124355:	jgt r4, -0x2710, +0x1 <custom_panic+0x4978>
  124356:	mov64 r2, 0x0
  124357:	jeq r3, 0x270f, +0x1 <custom_panic+0x4988>
  124358:	mov64 r2, r1
  124359:	and64 r2, 0x1
  124360:	jne r2, 0x0, -0x15 <custom_panic+0x48f0>
  124361:	mov64 r2, r4
  124362:	add64 r2, 0x270f
  124363:	mov64 r8, 0x1
  124364:	mov64 r1, 0x1
  124365:	jlt r2, r4, +0x1 <custom_panic+0x49c8>
  124366:	mov64 r1, 0x0
  124367:	add64 r3, r1
  124368:	mov64 r1, r10
  124369:	add64 r1, -0x20
  124370:	mov64 r4, 0x2710
  124371:	mov64 r5, 0x0
  124372:	call 0x4e89
  124373:	ldxdw r2, [r7 + 0x8]
  124374:	ldxdw r1, [r10 - 0x20]
  124375:	jlt r1, r2, -0x24 <custom_panic+0x48f0>
  124376:	mov64 r1, r2
  124377:	ja -0x26 <custom_panic+0x48f0>
