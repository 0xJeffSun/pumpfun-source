
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/claim-self-transfer-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

0000000000057c28 <_ZN107_$LT$pump_amm_recovered..incentives..GlobalVolumeAccumulator$u20$as$u20$anchor_lang..AccountDeserialize$GT$15try_deserialize17h6c2de2f8f465d12cE>:
   57c28: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   57c30: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
   57c38: a5 01 27 00 08 00 00 00      	jlt r1, 0x8, +0x27 <LBB217_2>
   57c40: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   57c48: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   57c50: 18 03 00 00 ca 2a f6 2b 00 00 00 00 8e be 1e ff      	lddw r3, -0xe14171d409d536
   57c60: 1d 31 50 00 00 00 00 00      	jeq r1, r3, +0x50 <LBB217_3>
   57c68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   57c70: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   57c78: 18 02 00 00 1c da 10 00 00 00 00 00 00 00 00 00      	lddw r2, 0x10da1c
   57c88: 85 10 00 00 59 3d 01 00      	call 0x13d59
   57c90: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   57c98: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   57ca0: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   57ca8: 18 01 00 00 c0 34 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1134c0
   57cb8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   57cc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   57cc8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   57cd0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   57cd8: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   57ce0: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   57ce8: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   57cf0: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   57cf8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   57d00: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   57d08: 18 01 00 00 1c da 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10da1c
   57d18: 85 10 00 00 0f 3f 01 00      	call 0x13f0f
   57d20: 15 00 11 00 00 00 00 00      	jeq r0, 0x0, +0x11 <LBB217_6>
   57d28: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   57d30: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   57d38: 18 01 00 00 56 d8 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10d856
   57d48: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   57d50: 18 04 00 00 f0 34 11 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1134f0
   57d60: 18 05 00 00 10 35 11 00 00 00 00 00 00 00 00 00      	lddw r5, 0x113510
   57d70: 85 10 00 00 d1 59 01 00      	call 0x159d1

0000000000057d78 <LBB217_2>:
   57d78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   57d80: 07 01 00 00 c0 fe ff ff      	add64 r1, -0x140
   57d88: b7 02 00 00 b9 0b 00 00      	mov64 r2, 0xbb9
   57d90: 85 10 00 00 b6 3e 01 00      	call 0x13eb6
   57d98: 79 a1 c0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x140]
   57da0: 79 a2 c8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x138]
   57da8: 05 00 23 00 00 00 00 00      	ja +0x23 <LBB217_7>

0000000000057db0 <LBB217_6>:
   57db0: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   57db8: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   57dc0: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   57dc8: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   57dd0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   57dd8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   57de0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   57de8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   57df0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   57df8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   57e00: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   57e08: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   57e10: 18 01 00 00 6d df 10 00 00 00 00 00 00 00 00 00      	lddw r1, 0x10df6d
   57e20: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   57e28: 62 0a 88 ff ba 0b 00 00      	stw [r10 - 0x78], 0xbba
   57e30: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   57e38: 62 0a 08 ff 04 00 00 00      	stw [r10 - 0xf8], 0x4
   57e40: 7a 0a 00 ff 11 00 00 00      	stdw [r10 - 0x100], 0x11
   57e48: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   57e50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   57e58: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   57e60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   57e68: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   57e70: 85 10 00 00 ca 38 01 00      	call 0x138ca
   57e78: 79 a3 e8 fe 00 00 00 00      	ldxdw r3, [r10 - 0x118]
   57e80: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   57e88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   57e90: 07 01 00 00 d0 fe ff ff      	add64 r1, -0x130
   57e98: 18 04 00 00 28 e5 10 00 00 00 00 00 00 00 00 00      	lddw r4, 0x10e528
   57ea8: b7 05 00 00 17 00 00 00      	mov64 r5, 0x17
   57eb0: 85 10 00 00 81 53 ff ff      	call -0xac7f
   57eb8: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   57ec0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]

0000000000057ec8 <LBB217_7>:
   57ec8: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
   57ed0: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
   57ed8: 7a 06 00 00 01 00 00 00      	stdw [r6 + 0x0], 0x1

0000000000057ee0 <LBB217_8>:
   57ee0: 95 00 00 00 00 00 00 00      	exit

0000000000057ee8 <LBB217_3>:
   57ee8: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   57ef0: 85 10 00 00 01 00 00 00      	call 0x1
   57ef8: 05 00 fc ff 00 00 00 00      	ja -0x4 <LBB217_8>
