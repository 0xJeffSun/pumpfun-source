	.text
	.file	"typeid_probe.52b88d9b19d381a5-cgu.0"
	.section	".text._ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E","ax",@progbits
	.p2align	3
	.type	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E,@function
_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E:
	lddw r2, -5131308731546616659
	stxdw [r1 + 8], r2
	lddw r2, -6763004773899171502
	stxdw [r1 + 0], r2
	exit
.Lfunc_end0:
	.size	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E, .Lfunc_end0-_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E

	.section	".text._ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE","ax",@progbits
	.p2align	3
	.type	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE,@function
_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE:
	ldxdw r2, [r1 + 0]
	jeq r2, 0, LBB1_2
	ldxdw r1, [r1 + 8]
	mov64 r3, 1
	call __rust_dealloc
LBB1_2:
	exit
.Lfunc_end1:
	.size	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE, .Lfunc_end1-_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE

	.section	".text._ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E","ax",@progbits
	.p2align	3
	.type	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E,@function
_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E:
	exit
.Lfunc_end2:
	.size	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E, .Lfunc_end2-_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E

	.section	.text._ZN4core5error5Error5cause17h2a470501545b204fE,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error5cause17h2a470501545b204fE,@function
_ZN4core5error5Error5cause17h2a470501545b204fE:
	stdw [r1 + 0], 0
	exit
.Lfunc_end3:
	.size	_ZN4core5error5Error5cause17h2a470501545b204fE, .Lfunc_end3-_ZN4core5error5Error5cause17h2a470501545b204fE

	.section	.text._ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE,@function
_ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE:
	exit
.Lfunc_end4:
	.size	_ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE, .Lfunc_end4-_ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE

	.section	.text._ZN4core5error5Error7type_id17hb6d67d8bc9097c41E,"ax",@progbits
	.p2align	3
	.type	_ZN4core5error5Error7type_id17hb6d67d8bc9097c41E,@function
_ZN4core5error5Error7type_id17hb6d67d8bc9097c41E:
	lddw r2, 1954648689323323831
	stxdw [r1 + 8], r2
	lddw r2, 64771322342497853
	stxdw [r1 + 0], r2
	exit
.Lfunc_end5:
	.size	_ZN4core5error5Error7type_id17hb6d67d8bc9097c41E, .Lfunc_end5-_ZN4core5error5Error7type_id17hb6d67d8bc9097c41E

	.section	.text.tid_fmt_error,"ax",@progbits
	.globl	tid_fmt_error
	.p2align	3
	.type	tid_fmt_error,@function
tid_fmt_error:
	lddw r2, -5131308731546616659
	stxdw [r1 + 8], r2
	lddw r2, -6763004773899171502
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
	call _ZN5alloc5alloc18handle_alloc_error17hdf8d5797c8d8bbffE
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
	call _ZN5alloc5alloc18handle_alloc_error17hdf8d5797c8d8bbffE
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
	call _ZN5alloc7raw_vec12handle_error17h22fdf317f3a37641E
.Lfunc_end9:
	.size	str_err2, .Lfunc_end9-str_err2

	.type	.L__unnamed_1,@object
	.section	.data.rel.ro..L__unnamed_1,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_1:
	.quad	_ZN4core3ptr37drop_in_place$LT$core..fmt..Error$GT$17h29e1352a70afa515E
	.asciz	"\000\000\000\000\000\000\000\000\001\000\000\000\000\000\000"
	.quad	_ZN36_$LT$T$u20$as$u20$core..any..Any$GT$7type_id17h3a284bb169805c91E
	.size	.L__unnamed_1, 32

	.type	.L__unnamed_3,@object
	.section	.data.rel.ro..L__unnamed_3,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_3:
	.quad	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE
	.asciz	"\030\000\000\000\000\000\000\000\b\000\000\000\000\000\000"
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h90a7b52b4b824722E
	.size	.L__unnamed_3, 32

	.type	.L__unnamed_2,@object
	.section	.data.rel.ro..L__unnamed_2,"aw",@progbits
	.p2align	3, 0x0
.L__unnamed_2:
	.quad	_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h10b6ad6eec29120dE
	.asciz	"\030\000\000\000\000\000\000\000\b\000\000\000\000\000\000"
	.quad	_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hec448305f4a90e51E
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h90a7b52b4b824722E
	.quad	.L__unnamed_3
	.quad	_ZN4core5error5Error5cause17h2a470501545b204fE
	.quad	_ZN4core5error5Error7type_id17hb6d67d8bc9097c41E
	.quad	_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17hf25e5ff77ea0398dE
	.quad	_ZN4core5error5Error5cause17h2a470501545b204fE
	.quad	_ZN4core5error5Error7provide17hb4ea6ae7f1c67b3fE
	.size	.L__unnamed_2, 88

