	.text
	.file	"probe.bad760b3-cgu.0"
	.section	.text.guard,"ax",@progbits
	.globl	guard
	.p2align	3
	.type	guard,@function
guard:
	mov64 r6, r2
	mov64 r7, r1
	jeq r3, 0, LBB0_3
	ldxdw r1, [r6 + 0]
	jgt r3, r1, LBB0_3
	ldxdw r2, [r6 + 8]
	jge r2, r3, LBB0_4
LBB0_3:
	mov64 r1, 86
	stxw [r7 + 4], r1
	mov64 r1, 1
LBB0_5:
	stxw [r7 + 0], r1
	mov64 r1, r6
	call cleanup
	exit
LBB0_4:
	sub64 r2, r3
	stxdw [r6 + 8], r2
	mov64 r1, r6
	call success
	stxdw [r7 + 8], r0
	mov64 r1, 0
	ja LBB0_5
.Lfunc_end0:
	.size	guard, .Lfunc_end0-guard

