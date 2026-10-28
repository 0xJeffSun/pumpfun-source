
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/base/symbols.so:	file format elf64-sbf

Disassembly of section .text:

0000000000105c30 <_ZN14spl_token_20229extension12transfer_fee11TransferFee13calculate_fee17h71d4da63ba10bcfeE>:
  134022:	mov64 r4, r3
  134023:	mov64 r7, r2
  134024:	mov64 r6, r1
  134025:	mov64 r8, 0x1
  134026:	mov64 r1, 0x0
  134027:	jeq r4, 0x0, +0x24 <LBB153_13>
  134028:	ldxh r2, [r7 + 0x10]
  134029:	jeq r2, 0x0, +0x22 <LBB153_13>
  134030:	mov64 r1, r10
  134031:	add64 r1, -0x10
  134032:	mov64 r8, 0x0
  134033:	mov64 r3, 0x0
  134034:	mov64 r5, 0x0
  134035:	call 0x3bc2
  134036:	mov64 r2, 0x1
  134037:	ldxdw r3, [r10 - 0x8]
  134038:	mov64 r1, 0x1
  134039:	jgt r3, 0x270f, +0x1 <LBB153_4>
  134040:	mov64 r1, 0x0

0000000000105cc8 <LBB153_4>:
  134041:	ldxdw r4, [r10 - 0x10]
  134042:	jgt r4, -0x2710, +0x1 <LBB153_6>
  134043:	mov64 r2, 0x0

0000000000105ce0 <LBB153_6>:
  134044:	jeq r3, 0x270f, +0x1 <LBB153_8>
  134045:	mov64 r2, r1

0000000000105cf0 <LBB153_8>:
  134046:	and64 r2, 0x1
  134047:	jne r2, 0x0, +0x10 <LBB153_13>
  134048:	mov64 r2, r4
  134049:	add64 r2, 0x270f
  134050:	mov64 r8, 0x1
  134051:	mov64 r1, 0x1
  134052:	jlt r2, r4, +0x1 <LBB153_11>
  134053:	mov64 r1, 0x0

0000000000105d30 <LBB153_11>:
  134054:	add64 r3, r1
  134055:	mov64 r1, r10
  134056:	add64 r1, -0x20
  134057:	mov64 r4, 0x2710
  134058:	mov64 r5, 0x0
  134059:	call 0x3902
  134060:	ldxdw r2, [r7 + 0x8]
  134061:	ldxdw r1, [r10 - 0x20]
  134062:	jlt r1, r2, +0x1 <LBB153_13>
  134063:	mov64 r1, r2

0000000000105d80 <LBB153_13>:
  134064:	stxdw [r6 + 0x8], r1
  134065:	stxdw [r6 + 0x0], r8
  134066:	exit
