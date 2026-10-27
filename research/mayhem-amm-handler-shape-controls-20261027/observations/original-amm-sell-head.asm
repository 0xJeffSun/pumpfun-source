
evidence/original/mayhem/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   17668:      	mov64 r6, r5
   17670:      	mov64 r7, r4
   17678:      	stxdw [r10 - 0x6d0], r3
   17680:      	stxdw [r10 - 0x6c8], r2
   17688:      	mov64 r8, r1
   17690:      	ldxdw r9, [r8 + 0x8]
   17698:      	ldxdw r2, [r9 + 0x8]
   176a0:      	ldxdw r1, [r9 + 0x10]
   176a8:      	add64 r1, 0x8
   176b0:      	add64 r2, 0x8
   176b8:      	call 0x2ccb
   176c0:      	jne r0, 0x2, +0x14f <.text+0x18020>
   176c8:      	stxdw [r10 - 0x6e0], r8
   176d0:      	stxdw [r10 - 0x6d8], r6
   176d8:      	ldxdw r1, [r9 + 0x78]
   176e0:      	ldxdw r3, [r1 + 0x68]
   176e8:      	ldxdw r1, [r9 + 0x58]
   176f0:      	ldxdw r2, [r1 + 0xe8]
   176f8:      	mov64 r8, r3
   17700:      	add64 r8, r2
   17708:      	mov64 r2, 0x1
   17710:      	jlt r8, r3, +0x1 <.text+0x17600>
   17718:      	mov64 r2, 0x0
   17720:      	ldxdw r1, [r1 + 0xf0]
   17728:      	mov64 r6, r1
   17730:      	add64 r6, r2
   17738:      	xor64 r1, -0x1
   17740:      	and64 r1, r6
   17748:      	jslt r1, 0x0, +0x4f <.text+0x178a8>
   17750:      	jne r6, 0x0, +0x4e <.text+0x178a8>
   17758:      	ldxdw r3, [r9 + 0x8]
   17760:      	ldxdw r1, [r9 + 0x10]
   17768:      	ldxdw r2, [r9 + 0x68]
   17770:      	ldxdw r2, [r2 + 0x0]
   17778:      	ldxdw r4, [r2 + 0x18]
   17780:      	stxdw [r10 - 0x6a8], r4
   17788:      	ldxdw r4, [r2 + 0x10]
   17790:      	stxdw [r10 - 0x6b0], r4
   17798:      	ldxdw r4, [r2 + 0x8]
   177a0:      	stxdw [r10 - 0x6b8], r4
   177a8:      	ldxdw r2, [r2 + 0x0]
   177b0:      	stxdw [r10 - 0x6c0], r2
   177b8:      	add64 r1, 0x8
   177c0:      	add64 r3, 0x8
   177c8:      	mov64 r4, r10
   177d0:      	add64 r4, -0x6c0
   177d8:      	mov64 r2, r8
   177e0:      	call 0x2d3b
   177e8:      	jne r0, 0x2, +0x12a <.text+0x18020>
   177f0:      	mov64 r1, 0x2
   177f8:      	stxdw [r10 - 0x6f0], r1
   17800:      	stxdw [r10 - 0x6f8], r9
   17808:      	ldxdw r1, [r9 + 0x70]
   17810:      	ldxdw r9, [r1 + 0x68]
   17818:      	jeq r9, 0x0, +0xf8 <.text+0x17ec0>
   17820:      	mov64 r1, r8
   17828:      	mov64 r2, r6
   17830:      	lddw r3, 0x38d7ea4c68000
   17840:      	mov64 r4, 0x0
   17848:      	call 0x129e6
   17850:      	mov64 r2, r1
   17858:      	mov64 r1, r0
   17860:      	stxdw [r10 - 0x708], r9
   17868:      	mov64 r3, r9
   17870:      	mov64 r4, 0x0
   17878:      	call 0x125b6
   17880:      	stxdw [r10 - 0x700], r0
   17888:      	stxdw [r10 - 0x6e8], r1
   17890:      	and64 r7, 0xffff
   17898:      	ldxdw r1, [r10 - 0x6d0]
   178a0:      	mov64 r2, 0x0
   178a8:      	mov64 r3, r7
   178b0:      	mov64 r4, 0x0
   178b8:      	call 0x129d8
   178c0:      	mov64 r6, r0
   178c8:      	mov64 r9, r1
   178d0:      	ldxdw r1, [r10 - 0x6c8]
   178d8:      	mov64 r2, 0x0
   178e0:      	mov64 r3, r7
   178e8:      	mov64 r4, 0x0
   178f0:      	call 0x129d1
   178f8:      	mov64 r2, r1
   17900:      	add64 r2, r6
   17908:      	mov64 r4, 0x1
   17910:      	mov64 r3, 0x1
   17918:      	jne r9, 0x0, +0x1 <.text+0x17808>
   17920:      	mov64 r3, 0x0
   17928:      	jlt r2, r1, +0x1 <.text+0x17818>
   17930:      	mov64 r4, 0x0
   17938:      	or64 r3, r4
   17940:      	and64 r3, 0x1
   17948:      	ldxdw r6, [r10 - 0x6f8]
   17950:      	ldxdw r7, [r10 - 0x6d0]
   17958:      	jne r3, 0x0, +0xd0 <.text+0x17ec0>
   17960:      	mov64 r1, r0
   17968:      	mov64 r3, 0x2710
   17970:      	mov64 r4, 0x0
   17978:      	call 0x12596
   17980:      	mov64 r3, 0x1
   17988:      	mov64 r2, 0x1
   17990:      	ldxdw r4, [r10 - 0x6c8]
   17998:      	jge r4, r0, +0x2b <.text+0x179d8>
   179a0:      	jge r7, r1, +0x2c <.text+0x179e8>
   179a8:      	jne r7, r1, +0x2d <.text+0x179f8>
   179b0:      	and64 r2, 0x1
   179b8:      	jeq r2, 0x0, +0x2e <.text+0x17a10>
   179c0:      	ja +0xc3 <.text+0x17ec0>
   179c8:      	stw [r10 - 0xe8], 0x2
   179d0:      	mov64 r1, r10
   179d8:      	add64 r1, -0xc8
   179e0:      	mov64 r6, r10
   179e8:      	add64 r6, -0xe8
   179f0:      	mov64 r2, r6
   179f8:      	call 0x2d9a
   17a00:      	stdw [r10 - 0x20], 0x0
   17a08:      	stdw [r10 - 0x28], 0x1
   17a10:      	stdw [r10 - 0x30], 0x0
   17a18:      	lddw r1, 0xb1238
   17a28:      	stxdw [r10 - 0x170], r1
   17a30:      	mov64 r1, r10
   17a38:      	add64 r1, -0x30
   17a40:      	stxdw [r10 - 0x178], r1
   17a48:      	lddw r1, 0xe0000020
   17a58:      	stxdw [r10 - 0x168], r1
   17a60:      	mov64 r2, r10
   17a68:      	add64 r2, -0x178
   17a70:      	mov64 r1, r6
   17a78:      	call 0x306b
   17a80:      	jne r0, 0x0, +0x7c7 <.text+0x1b7a0>
   17a88:      	ldxdw r1, [r10 - 0x20]
   17a90:      	stxdw [r10 - 0x678], r1
   17a98:      	ldxdw r1, [r10 - 0x28]
   17aa0:      	stxdw [r10 - 0x680], r1
   17aa8:      	ldxdw r1, [r10 - 0x30]
   17ab0:      	stxdw [r10 - 0x688], r1
   17ab8:      	ldxdw r1, [r10 - 0xc8]
   17ac0:      	stxdw [r10 - 0x6a0], r1
   17ac8:      	ldxdw r1, [r10 - 0xc0]
   17ad0:      	stxdw [r10 - 0x698], r1
   17ad8:      	ldxdw r1, [r10 - 0xb8]
   17ae0:      	stxdw [r10 - 0x690], r1
   17ae8:      	stw [r10 - 0x628], 0x1772
   17af0:      	ja +0xc4 <.text+0x17ff8>
   17af8:      	mov64 r2, 0x0
   17b00:      	jlt r7, r1, -0x2c <.text+0x17888>
   17b08:      	mov64 r3, 0x0
   17b10:      	jeq r7, r1, -0x2d <.text+0x17890>
   17b18:      	mov64 r2, r3
   17b20:      	and64 r2, 0x1
   17b28:      	jne r2, 0x0, +0x96 <.text+0x17ec0>
   17b30:      	ldxdw r5, [r10 - 0x6c8]
   17b38:      	mov64 r4, r5
   17b40:      	add64 r4, r0
   17b48:      	mov64 r3, 0x1
   17b50:      	mov64 r2, 0x1
   17b58:      	jge r4, r5, +0x8 <.text+0x17a80>
   17b60:      	mov64 r4, r7
   17b68:      	add64 r4, r1
   17b70:      	add64 r4, r2
   17b78:      	jge r4, r7, +0x9 <.text+0x17aa8>
   17b80:      	jne r4, r7, +0xa <.text+0x17ab8>
   17b88:      	and64 r2, 0x1
   17b90:      	jeq r2, 0x0, +0xb <.text+0x17ad0>
   17b98:      	ja +0x88 <.text+0x17ec0>
   17ba0:      	mov64 r2, 0x0
   17ba8:      	mov64 r4, r7
   17bb0:      	add64 r4, r1
   17bb8:      	add64 r4, r2
   17bc0:      	jlt r4, r7, -0x9 <.text+0x17a60>
   17bc8:      	mov64 r3, 0x0
   17bd0:      	jeq r4, r7, -0xa <.text+0x17a68>
   17bd8:      	mov64 r2, r3
   17be0:      	and64 r2, 0x1
   17be8:      	jne r2, 0x0, +0x7e <.text+0x17ec0>
   17bf0:      	mov64 r3, r0
   17bf8:      	mov64 r4, 0x1
   17c00:      	ldxdw r5, [r10 - 0x6c8]
   17c08:      	jlt r5, r3, +0x1 <.text+0x17af8>
   17c10:      	mov64 r4, 0x0
   17c18:      	mov64 r2, r6
   17c20:      	mov64 r5, r7
   17c28:      	sub64 r5, r1
   17c30:      	sub64 r5, r4
   17c38:      	ldxdw r6, [r10 - 0x6c8]
   17c40:      	sub64 r6, r0
   17c48:      	mov64 r4, 0x1
   17c50:      	ldxdw r9, [r10 - 0x700]
   17c58:      	jge r9, r6, +0x5a <.text+0x17e10>
   17c60:      	mov64 r6, 0x1
   17c68:      	ldxdw r9, [r10 - 0x6e8]
   17c70:      	jge r9, r5, +0x5b <.text+0x17e30>
   17c78:      	ldxdw r9, [r10 - 0x6e8]
   17c80:      	jne r9, r5, +0x5c <.text+0x17e48>
   17c88:      	ldxdw r5, [r10 - 0x6c8]
   17c90:      	add64 r0, r5
   17c98:      	mov64 r5, 0x1
   17ca0:      	jlt r0, r3, +0x1 <.text+0x17b90>
   17ca8:      	mov64 r5, 0x0
   17cb0:      	mov64 r3, 0xc
   17cb8:      	stxdw [r10 - 0x6f0], r3
   17cc0:      	and64 r4, 0x1
   17cc8:      	mov64 r9, r2
   17cd0:      	jne r4, 0x0, +0x61 <.text+0x17ec0>
   17cd8:      	add64 r1, r7
   17ce0:      	add64 r1, r5
   17ce8:      	mov64 r3, 0x1
   17cf0:      	mov64 r2, 0x1
   17cf8:      	ldxdw r4, [r10 - 0x700]
   17d00:      	jgt r4, r0, +0x52 <.text+0x17e78>
   17d08:      	ldxdw r4, [r10 - 0x6e8]
   17d10:      	jgt r4, r1, +0x53 <.text+0x17e90>
   17d18:      	ldxdw r4, [r10 - 0x6e8]
   17d20:      	jne r4, r1, +0x54 <.text+0x17ea8>
   17d28:      	and64 r2, 0x1
   17d30:      	jeq r2, 0x0, +0x55 <.text+0x17ec0>
   17d38:      	ldxdw r1, [r9 + 0x20]
   17d40:      	ldxdw r1, [r1 + 0x68]
   17d48:      	ldxdw r2, [r9 + 0x8]
   17d50:      	ldxdw r3, [r9 + 0x68]
   17d58:      	ldxdw r3, [r3 + 0x0]
   17d60:      	ldxdw r4, [r3 + 0x18]
   17d68:      	stxdw [r10 - 0x6a8], r4
   17d70:      	ldxdw r4, [r3 + 0x10]
   17d78:      	stxdw [r10 - 0x6b0], r4
   17d80:      	ldxdw r4, [r3 + 0x8]
   17d88:      	stxdw [r10 - 0x6b8], r4
   17d90:      	ldxdw r3, [r3 + 0x0]
   17d98:      	stxdw [r10 - 0x6c0], r3
   17da0:      	mov64 r3, r10
   17da8:      	add64 r3, -0x6c0
   17db0:      	stxdw [r10 - 0xff0], r3
   17db8:      	ldxdw r3, [r10 - 0x6d8]
   17dc0:      	stxdw [r10 - 0xff8], r3
   17dc8:      	stxdw [r10 - 0x1000], r1
   17dd0:      	add64 r2, 0x8
   17dd8:      	mov64 r1, r10
   17de0:      	add64 r1, -0x178
   17de8:      	mov64 r5, r10
   17df0:      	ldxdw r3, [r10 - 0x708]
   17df8:      	mov64 r4, r8
   17e00:      	call 0x2b56
   17e08:      	ldxdw r1, [r10 - 0x168]
   17e10:      	ldxdw r0, [r10 - 0x170]
   17e18:      	ldxdw r2, [r10 - 0x178]
