
/home/ahi200/pumpfun-work/20261028-amm-decoder-recovery/fee-ordered-zero-build/symbols.so:	file format elf64-sbf

Disassembly of section .text:

000000000002adf0 <_ZN18pump_amm_recovered5utils12transfer_fee18DecodedTransferFee13calculate_fee17h1e13360b72c05a58E>:
   21950:	mov64 r5, r3
   21951:	mov64 r7, r2
   21952:	mov64 r6, r1
   21953:	mov64 r8, 0x1
   21954:	mov64 r1, 0x0
   21955:	jeq r4, 0x0, +0x2 <LBB212_2>
   21956:	and64 r5, 0xffff
   21957:	jne r5, 0x0, +0x3 <LBB212_3>

000000000002ae30 <LBB212_2>:
   21958:	stxdw [r6 + 0x8], r1
   21959:	stxdw [r6 + 0x0], r8
   21960:	exit

000000000002ae48 <LBB212_3>:
   21961:	mov64 r1, r10
   21962:	add64 r1, -0x10
   21963:	mov64 r8, 0x0
   21964:	mov64 r2, r4
   21965:	mov64 r3, 0x0
   21966:	mov64 r4, r5
   21967:	mov64 r5, 0x0
   21968:	call 0x1f182
   21969:	mov64 r2, 0x1
   21970:	ldxdw r3, [r10 - 0x8]
   21971:	mov64 r1, 0x1
   21972:	jgt r3, 0x270f, +0x1 <LBB212_5>
   21973:	mov64 r1, 0x0

000000000002aeb0 <LBB212_5>:
   21974:	ldxdw r4, [r10 - 0x10]
   21975:	jgt r4, -0x2710, +0x1 <LBB212_7>
   21976:	mov64 r2, 0x0

000000000002aec8 <LBB212_7>:
   21977:	jeq r3, 0x270f, +0x1 <LBB212_9>
   21978:	mov64 r2, r1

000000000002aed8 <LBB212_9>:
   21979:	and64 r2, 0x1
   21980:	jne r2, 0x0, -0x17 <LBB212_2>
   21981:	mov64 r2, r4
   21982:	add64 r2, 0x270f
   21983:	mov64 r8, 0x1
   21984:	mov64 r1, 0x1
   21985:	jlt r2, r4, +0x1 <LBB212_12>
   21986:	mov64 r1, 0x0

000000000002af18 <LBB212_12>:
   21987:	add64 r3, r1
   21988:	mov64 r1, r10
   21989:	add64 r1, -0x20
   21990:	mov64 r4, 0x2710
   21991:	mov64 r5, 0x0
   21992:	call 0x1eec2
   21993:	ldxdw r1, [r10 - 0x20]
   21994:	jlt r1, r7, -0x25 <LBB212_2>
   21995:	mov64 r1, r7
   21996:	ja -0x27 <LBB212_2>
