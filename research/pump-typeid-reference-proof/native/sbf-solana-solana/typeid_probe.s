	.text
	.file	"typeid_probe.52b88d9b19d381a5-cgu.0"
	.section	".text._ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE","ax",@progbits
	.p2align	3
	.type	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE,@function
_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE:
	lddw r2, -3970628502521997310
	stxdw [r1 + 8], r2
	lddw r2, 3846482895840292529
	stxdw [r1 + 0], r2
	exit
.Lfunc_end0:
	.size	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE, .Lfunc_end0-_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE

	.section	".text._ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE","ax",@progbits
	.p2align	3
	.type	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE,@function
_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE:
	ldxdw r2, [r1 + 0]
	jeq r2, 0, LBB1_2
	ldxdw r1, [r1 + 8]
	mov64 r3, 1
	call __rust_dealloc
LBB1_2:
	exit
.Lfunc_end1:
	.size	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE, .Lfunc_end1-_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE

	.section	".text._ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E","ax",@progbits
	.p2align	3
	.type	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E,@function
_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E:
	exit
.Lfunc_end2:
	.size	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E, .Lfunc_end2-_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E

	.section	.text._ZN4core5error5Error5cause17hdf222bdf90d1a7d3E,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E,@function
_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E:
	stdw [r1 + 0], 0
	exit
.Lfunc_end3:
	.size	_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E, .Lfunc_end3-_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E

	.section	.text._ZN4core5error5Error7provide17h5fd432c4b2d4dc35E,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error7provide17h5fd432c4b2d4dc35E,@function
_ZN4core5error5Error7provide17h5fd432c4b2d4dc35E:
	exit
.Lfunc_end4:
	.size	_ZN4core5error5Error7provide17h5fd432c4b2d4dc35E, .Lfunc_end4-_ZN4core5error5Error7provide17h5fd432c4b2d4dc35E

	.section	.text._ZN4core5error5Error7type_id17h688ce2034e0e3898E,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error7type_id17h688ce2034e0e3898E,@function
_ZN4core5error5Error7type_id17h688ce2034e0e3898E:
	lddw r2, -8038184673626092711
	stxdw [r1 + 8], r2
	lddw r2, -7919747170321686333
	stxdw [r1 + 0], r2
	exit
.Lfunc_end5:
	.size	_ZN4core5error5Error7type_id17h688ce2034e0e3898E, .Lfunc_end5-_ZN4core5error5Error7type_id17h688ce2034e0e3898E

	.section	.text.tid_fmt_error,"ax",@progbits
	.globl	tid_fmt_error
	.p2align	3
	.type	tid_fmt_error,@function
tid_fmt_error:
	lddw r2, -3970628502521997310
	stxdw [r1 + 8], r2
	lddw r2, 3846482895840292529
	stxdw [r1 + 0], r2
	exit
.Lfunc_end6:
	.size	tid_fmt_error, .Lfunc_end6-tid_fmt_error

	.section	.text.any_fmt_error,"ax",@progbits
	.globl	any_fmt_error
	.p2align	3
	.type	any_fmt_error,@function
any_fmt_error:
	lddw r2, .L__unnamed_1
	stxdw [r1 + 8], r2
	stdw [r1 + 0], 1
	exit
.Lfunc_end7:
	.size	any_fmt_error, .Lfunc_end7-any_fmt_error

	.section	.text.str_err,"ax",@progbits
	.globl	str_err
	.p2align	3
	.type	str_err,@function
str_err:
	mov64 r7, r2
	mov64 r6, r1
	mov64 r1, 24
	mov64 r2, 8
	call __rust_alloc
	jne r0, 0, LBB8_2
	mov64 r1, 8
	mov64 r2, 24
	call _ZN5alloc5alloc18handle_alloc_error17h2639b51fed40df27E
LBB8_2:
	ldxdw r1, [r7 + 16]
	stxdw [r0 + 16], r1
	ldxdw r1, [r7 + 8]
	stxdw [r0 + 8], r1
	ldxdw r1, [r7 + 0]
	stxdw [r0 + 0], r1
	lddw r1, .L__unnamed_2
	stxdw [r6 + 8], r1
	stxdw [r6 + 0], r0
	exit
.Lfunc_end8:
	.size	str_err, .Lfunc_end8-str_err

	.section	.text.str_err2,"ax",@progbits
	.globl	str_err2
	.p2align	3
	.type	str_err2,@function
str_err2:
	mov64 r6, r3
	mov64 r7, r1
	mov64 r8, 1
	jeq r6, 0, LBB9_4
	stxdw [r10 - 8], r2
	mov64 r9, 0
	jslt r6, 0, LBB9_7
	mov64 r9, 1
	mov64 r1, r6
	mov64 r2, 1
	call __rust_alloc
	mov64 r8, r0
	jeq r8, 0, LBB9_7
	ldxdw r2, [r10 - 8]
LBB9_4:
	mov64 r1, r8
	mov64 r3, r6
	call memcpy
	mov64 r1, 24
	mov64 r2, 8
	call __rust_alloc
	jne r0, 0, LBB9_6
	mov64 r1, 8
	mov64 r2, 24
	call _ZN5alloc5alloc18handle_alloc_error17h2639b51fed40df27E
LBB9_6:
	stxdw [r0 + 8], r8
	stxdw [r0 + 16], r6
	stxdw [r0 + 0], r6
	lddw r1, .L__unnamed_2
	stxdw [r7 + 8], r1
	stxdw [r7 + 0], r0
	exit
LBB9_7:
	mov64 r1, r9
	mov64 r2, r6
	call _ZN5alloc7raw_vec12handle_error17had0bf08cb416e59aE
.Lfunc_end9:
	.size	str_err2, .Lfunc_end9-str_err2

	.type	.L__unnamed_1,@object
	.section	.data.rel.ro..L__unnamed_1,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_1:
	.quad	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17hf1bee6fc90c64001E
	.asciz	"\000\000\000\000\000\000\000\000\001\000\000\000\000\000\000"
	.quad	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h893252c96d9299afE
	.size	.L__unnamed_1, 32

	.type	.L__unnamed_3,@object
	.section	.data.rel.ro..L__unnamed_3,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_3:
	.quad	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE
	.asciz	"\030\000\000\000\000\000\000\000\b\000\000\000\000\000\000"
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17ha903e47335f9322bE
	.size	.L__unnamed_3, 32

	.type	.L__unnamed_2,@object
	.section	.data.rel.ro..L__unnamed_2,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_2:
	.quad	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17he357c50f894df2beE
	.asciz	"\030\000\000\000\000\000\000\000\b\000\000\000\000\000\000"
	.quad	_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17h7efa36fade732230E
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17ha903e47335f9322bE
	.quad	.L__unnamed_3
	.quad	_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E
	.quad	_ZN4core5error5Error7type_id17h688ce2034e0e3898E
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17h225d49144b71bafaE
	.quad	_ZN4core5error5Error5cause17hdf222bdf90d1a7d3E
	.quad	_ZN4core5error5Error7provide17h5fd432c4b2d4dc35E
	.size	.L__unnamed_2, 88

