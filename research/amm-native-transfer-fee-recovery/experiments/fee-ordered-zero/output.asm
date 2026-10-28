
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/fee-ordered-zero/input.o:	file format elf64-sbf

Disassembly of section .text.fee_return:

0000000000000000 <fee_return>:
       0:	mov64 r4, r3
       1:	mov64 r7, r2
       2:	mov64 r6, r1
       3:	mov64 r8, 0x1
       4:	mov64 r1, 0x0
       5:	jeq r4, 0x0, +0x2 <LBB0_2>
       6:	ldxh r2, [r7 + 0x10]
       7:	jne r2, 0x0, +0x3 <LBB0_3>

0000000000000040 <LBB0_2>:
       8:	stxdw [r6 + 0x8], r1
       9:	stxdw [r6 + 0x0], r8
      10:	exit

0000000000000058 <LBB0_3>:
      11:	mov64 r1, r10
      12:	add64 r1, -0x10
      13:	mov64 r8, 0x0
      14:	mov64 r3, 0x0
      15:	mov64 r5, 0x0
      16:	call -0x1
      17:	mov64 r2, 0x1
      18:	ldxdw r3, [r10 - 0x8]
      19:	mov64 r1, 0x1
      20:	jgt r3, 0x270f, +0x1 <LBB0_5>
      21:	mov64 r1, 0x0

00000000000000b0 <LBB0_5>:
      22:	ldxdw r4, [r10 - 0x10]
      23:	jgt r4, -0x2710, +0x1 <LBB0_7>
      24:	mov64 r2, 0x0

00000000000000c8 <LBB0_7>:
      25:	jeq r3, 0x270f, +0x1 <LBB0_9>
      26:	mov64 r2, r1

00000000000000d8 <LBB0_9>:
      27:	and64 r2, 0x1
      28:	jne r2, 0x0, -0x15 <LBB0_2>
      29:	mov64 r2, r4
      30:	add64 r2, 0x270f
      31:	mov64 r8, 0x1
      32:	mov64 r1, 0x1
      33:	jlt r2, r4, +0x1 <LBB0_12>
      34:	mov64 r1, 0x0

0000000000000118 <LBB0_12>:
      35:	add64 r3, r1
      36:	mov64 r1, r10
      37:	add64 r1, -0x20
      38:	mov64 r4, 0x2710
      39:	mov64 r5, 0x0
      40:	call -0x1
      41:	ldxdw r2, [r7 + 0x8]
      42:	ldxdw r1, [r10 - 0x20]
      43:	jlt r1, r2, -0x24 <LBB0_2>
      44:	mov64 r1, r2
      45:	ja -0x26 <LBB0_2>
