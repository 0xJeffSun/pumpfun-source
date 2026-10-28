
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/fee-borrowed-zero/input.o:	file format elf64-sbf

Disassembly of section .text.fee_return:

0000000000000000 <fee_return>:
       0:	mov64 r4, r3
       1:	mov64 r7, r2
       2:	mov64 r6, r1
       3:	mov64 r9, 0x1
       4:	mov64 r8, 0x0
       5:	jeq r4, 0x0, +0x25 <LBB0_13>
       6:	ldxh r1, [r7 + 0x10]
       7:	mov64 r2, r1
       8:	jeq r2, 0x0, +0x22 <LBB0_13>
       9:	mov64 r1, r10
      10:	add64 r1, -0x10
      11:	mov64 r3, 0x0
      12:	mov64 r5, 0x0
      13:	call -0x1
      14:	mov64 r2, 0x1
      15:	ldxdw r3, [r10 - 0x8]
      16:	mov64 r4, 0x1
      17:	jgt r3, 0x270f, +0x1 <LBB0_4>
      18:	mov64 r4, 0x0

0000000000000098 <LBB0_4>:
      19:	ldxdw r1, [r10 - 0x10]
      20:	jgt r1, -0x2710, +0x1 <LBB0_6>
      21:	mov64 r2, 0x0

00000000000000b0 <LBB0_6>:
      22:	jeq r3, 0x270f, +0x1 <LBB0_8>
      23:	mov64 r2, r4

00000000000000c0 <LBB0_8>:
      24:	and64 r2, 0x1
      25:	mov64 r9, 0x0
      26:	jne r2, 0x0, +0x10 <LBB0_13>
      27:	mov64 r2, r1
      28:	add64 r2, 0x270f
      29:	mov64 r9, 0x1
      30:	mov64 r4, 0x1
      31:	jlt r2, r1, +0x1 <LBB0_11>
      32:	mov64 r4, 0x0

0000000000000108 <LBB0_11>:
      33:	add64 r3, r4
      34:	mov64 r1, r10
      35:	add64 r1, -0x20
      36:	mov64 r4, 0x2710
      37:	mov64 r5, 0x0
      38:	call -0x1
      39:	ldxdw r1, [r7 + 0x8]
      40:	ldxdw r8, [r10 - 0x20]
      41:	jlt r8, r1, +0x1 <LBB0_13>
      42:	mov64 r8, r1

0000000000000158 <LBB0_13>:
      43:	stxdw [r6 + 0x8], r8
      44:	stxdw [r6 + 0x0], r9
      45:	exit
