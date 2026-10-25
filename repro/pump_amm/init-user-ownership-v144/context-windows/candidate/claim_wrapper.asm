
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-user-ownership-build/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000096b70 <_ZN18pump_amm_recovered9__private8__global22claim_token_incentives17hf041695dae7a7372E>:
   96b70: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   96b78: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   96b80: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   96b88: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   96b90: 18 01 00 00 56 ef 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10ef56
   96ba0: b7 02 00 00 21 00 00 00      	mov64 r2, 0x21
   96ba8: 85 10 00 00 ff ff ff ff      	call -0x1
   96bb0: 72 0a 7f f5 ff 00 00 00      	stb [r10 - 0xa81], 0xff
   96bb8: 6a 0a 7d f5 ff ff 00 00      	sth [r10 - 0xa83], 0xffff
   96bc0: 7b 8a 88 f5 00 00 00 00      	stxdw [r10 - 0xa78], r8
   96bc8: 7b 9a 80 f5 00 00 00 00      	stxdw [r10 - 0xa80], r9
   96bd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96bd8: 07 01 00 00 7d f5 ff ff      	add64 r1, -0xa83
   96be0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   96be8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96bf0: 07 01 00 00 c8 fa ff ff      	add64 r1, -0x538
   96bf8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   96c00: 07 03 00 00 80 f5 ff ff      	add64 r3, -0xa80
   96c08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   96c10: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   96c18: 85 10 00 00 bf 8c ff ff      	call -0x7341
   96c20: 61 a8 c8 fa 00 00 00 00      	ldxw r8, [r10 - 0x538]
   96c28: 15 08 4e 00 02 00 00 00      	jeq r8, 0x2, +0x4e <LBB376_18>
   96c30: 7b 6a 50 f5 00 00 00 00      	stxdw [r10 - 0xab0], r6
   96c38: 61 a1 cc fa 00 00 00 00      	ldxw r1, [r10 - 0x534]
   96c40: 7b 1a 48 f5 00 00 00 00      	stxdw [r10 - 0xab8], r1
   96c48: 79 a6 d0 fa 00 00 00 00      	ldxdw r6, [r10 - 0x530]
   96c50: 79 a9 d8 fa 00 00 00 00      	ldxdw r9, [r10 - 0x528]
   96c58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96c60: 07 01 00 00 a8 f5 ff ff      	add64 r1, -0xa58
   96c68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96c70: 07 02 00 00 e0 fa ff ff      	add64 r2, -0x520
   96c78: b7 03 00 00 20 05 00 00      	mov64 r3, 0x520
   96c80: 85 10 00 00 c6 e8 00 00      	call 0xe8c6
   96c88: 7b 9a a0 f5 00 00 00 00      	stxdw [r10 - 0xa60], r9
   96c90: 7b 6a 98 f5 00 00 00 00      	stxdw [r10 - 0xa68], r6
   96c98: 79 a1 48 f5 00 00 00 00      	ldxdw r1, [r10 - 0xab8]
   96ca0: 63 1a 94 f5 00 00 00 00      	stxw [r10 - 0xa6c], r1
   96ca8: 63 8a 90 f5 00 00 00 00      	stxw [r10 - 0xa70], r8
   96cb0: 69 a1 7d f5 00 00 00 00      	ldxh r1, [r10 - 0xa83]
   96cb8: 6b 1a e8 fa 00 00 00 00      	stxh [r10 - 0x518], r1
   96cc0: 71 a1 7f f5 00 00 00 00      	ldxb r1, [r10 - 0xa81]
   96cc8: 73 1a ea fa 00 00 00 00      	stxb [r10 - 0x516], r1
   96cd0: 79 a1 88 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa78]
   96cd8: 7b 1a e0 fa 00 00 00 00      	stxdw [r10 - 0x520], r1
   96ce0: 79 a1 80 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa80]
   96ce8: 7b 1a d8 fa 00 00 00 00      	stxdw [r10 - 0x528], r1
   96cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96cf8: 07 01 00 00 90 f5 ff ff      	add64 r1, -0xa70
   96d00: 7b 1a d0 fa 00 00 00 00      	stxdw [r10 - 0x530], r1
   96d08: 7b 7a c8 fa 00 00 00 00      	stxdw [r10 - 0x538], r7
   96d10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96d18: 07 01 00 00 68 f5 ff ff      	add64 r1, -0xa98
   96d20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96d28: 07 02 00 00 c8 fa ff ff      	add64 r2, -0x538
   96d30: 85 10 00 00 30 36 00 00      	call 0x3630
   96d38: 79 a1 68 f5 00 00 00 00      	ldxdw r1, [r10 - 0xa98]
   96d40: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <LBB376_2>
   96d48: 05 00 2f 00 00 00 00 00      	ja +0x2f <LBB376_10>

0000000000096d50 <LBB376_2>:
   96d50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   96d58: 07 01 00 00 58 f5 ff ff      	add64 r1, -0xaa8
   96d60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   96d68: 07 02 00 00 90 f5 ff ff      	add64 r2, -0xa70
   96d70: bf 73 00 00 00 00 00 00      	mov64 r3, r7
   96d78: 85 10 00 00 36 94 ff ff      	call -0x6bca
   96d80: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   96d88: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   96d90: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   96d98: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96da0: 79 a2 60 f5 00 00 00 00      	ldxdw r2, [r10 - 0xaa0]
   96da8: 79 a1 58 f5 00 00 00 00      	ldxdw r1, [r10 - 0xaa8]
   96db0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   96db8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB376_4>
   96dc0: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   96dc8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96dd0: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

0000000000096dd8 <LBB376_4>:
   96dd8: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   96de0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96de8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   96df0: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   96df8: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB376_6>
   96e00: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   96e08: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96e10: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

0000000000096e18 <LBB376_6>:
   96e18: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   96e20: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   96e28: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   96e30: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96e38: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   96e40: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB376_8>
   96e48: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   96e50: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96e58: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

0000000000096e60 <LBB376_8>:
   96e60: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   96e68: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96e70: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   96e78: 55 04 06 00 00 00 00 00      	jne r4, 0x0, +0x6 <LBB376_19>

0000000000096e80 <LBB376_9>:
   96e80: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   96e88: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96e90: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
   96e98: 05 00 02 00 00 00 00 00      	ja +0x2 <LBB376_19>

0000000000096ea0 <LBB376_18>:
   96ea0: 79 a2 d8 fa 00 00 00 00      	ldxdw r2, [r10 - 0x528]
   96ea8: 79 a1 d0 fa 00 00 00 00      	ldxdw r1, [r10 - 0x530]

0000000000096eb0 <LBB376_19>:
   96eb0: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   96eb8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   96ec0: 95 00 00 00 00 00 00 00      	exit

0000000000096ec8 <LBB376_10>:
   96ec8: 79 a2 70 f5 00 00 00 00      	ldxdw r2, [r10 - 0xa90]
   96ed0: 79 a3 d0 f7 00 00 00 00      	ldxdw r3, [r10 - 0x830]
   96ed8: 79 a4 c8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x838]
   96ee0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   96ee8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96ef0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   96ef8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB376_12>
   96f00: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   96f08: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96f10: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

0000000000096f18 <LBB376_12>:
   96f18: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   96f20: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96f28: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   96f30: 79 a6 50 f5 00 00 00 00      	ldxdw r6, [r10 - 0xab0]
   96f38: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <LBB376_14>
   96f40: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
   96f48: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96f50: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4

0000000000096f58 <LBB376_14>:
   96f58: 79 a3 00 f8 00 00 00 00      	ldxdw r3, [r10 - 0x800]
   96f60: 79 a4 f8 f7 00 00 00 00      	ldxdw r4, [r10 - 0x808]
   96f68: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
   96f70: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96f78: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
   96f80: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <LBB376_16>
   96f88: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
   96f90: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
   96f98: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5

0000000000096fa0 <LBB376_16>:
   96fa0: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
   96fa8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
   96fb0: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
   96fb8: 55 04 de ff 00 00 00 00      	jne r4, 0x0, -0x22 <LBB376_19>
   96fc0: 05 00 d7 ff 00 00 00 00      	ja -0x29 <LBB376_9>
