
/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder/baseline780/symbols.so:	file format elf64-sbf

Disassembly of section .text:

000000000011f938 <_ZN98_$LT$pump_recovered..pump_fees..accounts..FeeConfig$u20$as$u20$anchor_lang..AccountDeserialize$GT$25try_deserialize_unchecked17ha6db59aefe4d57f4E>:
  147239:	mov64 r3, r2
  147240:	mov64 r6, r1
  147241:	ldxdw r2, [r3 + 0x8]
  147242:	jgt r2, 0x7, +0x4 <LBB621_2>
  147243:	mov64 r1, 0x8
  147244:	lddw r3, 0x1a9520
  147246:	call 0xf778

000000000011f978 <LBB621_2>:
  147247:	ldxdw r1, [r3 + 0x0]
  147248:	add64 r2, -0x8
  147249:	stxdw [r10 - 0x90], r2
  147250:	add64 r1, 0x8
  147251:	stxdw [r10 - 0x98], r1
  147252:	mov64 r1, r10
  147253:	add64 r1, -0x88
  147254:	mov64 r2, r10
  147255:	add64 r2, -0x98
  147256:	call 0x8e8c
  147257:	lddw r1, -0x8000000000000000
  147259:	ldxdw r2, [r10 - 0x88]
  147260:	jeq r2, r1, +0x6 <LBB621_4>
  147261:	mov64 r2, r10
  147262:	add64 r2, -0x88
  147263:	mov64 r1, r6
  147264:	mov64 r3, 0x88
  147265:	call 0xfda7
  147266:	ja +0x16 <LBB621_8>

000000000011fa18 <LBB621_4>:
  147267:	ldxdw r7, [r10 - 0x80]
  147268:	mov64 r1, r10
  147269:	add64 r1, -0xa8
  147270:	mov64 r2, 0xbbb
  147271:	call 0xd136
  147272:	ldxdw r9, [r10 - 0xa0]
  147273:	ldxdw r8, [r10 - 0xa8]
  147274:	mov64 r1, r7
  147275:	and64 r1, 0x3
  147276:	mov64 r2, r1
  147277:	add64 r2, -0x2
  147278:	jlt r2, 0x2, +0x5 <LBB621_7>
  147279:	jeq r1, 0x0, +0x4 <LBB621_7>
  147280:	ldxdw r1, [r7 - 0x1]
  147281:	ldxdw r2, [r7 + 0x7]
  147282:	ldxdw r2, [r2 + 0x0]
  147283:	callx r2

000000000011faa0 <LBB621_7>:
  147284:	stxdw [r6 + 0x10], r9
  147285:	stxdw [r6 + 0x8], r8
  147286:	lddw r1, -0x8000000000000000
  147288:	stxdw [r6 + 0x0], r1

000000000011fac8 <LBB621_8>:
  147289:	exit
