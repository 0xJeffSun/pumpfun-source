
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-init-logical-module-build/source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   e6c98: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   e6ca0: bf 39 00 00 00 00 00 00      	mov64 r9, r3
   e6ca8: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   e6cb0: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   e6cb8: 18 01 00 00 bf e8 11 00 00 00 00 00 00 00 00 00      	lddw r1, 0x11e8bf
   e6cc8: b7 02 00 00 27 00 00 00      	mov64 r2, 0x27
   e6cd0: 85 10 00 00 ff ff ff ff      	call -0x1
   e6cd8: 6a 0a 5e fe ff ff 00 00      	sth [r10 - 0x1a2], 0xffff
   e6ce0: 7b 8a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r8
   e6ce8: 7b 9a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r9
   e6cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6cf8: 07 01 00 00 5e fe ff ff      	add64 r1, -0x1a2
   e6d00: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   e6d08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6d10: 07 01 00 00 38 ff ff ff      	add64 r1, -0xc8
   e6d18: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   e6d20: 07 03 00 00 60 fe ff ff      	add64 r3, -0x1a0
   e6d28: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e6d30: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   e6d38: 85 10 00 00 57 cf ff ff      	call -0x30a9
   e6d40: 79 a9 40 ff 00 00 00 00      	ldxdw r9, [r10 - 0xc0]
   e6d48: 79 a8 38 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc8]
   e6d50: 71 a6 fa ff 00 00 00 00      	ldxb r6, [r10 - 0x6]
   e6d58: 15 06 67 00 02 00 00 00      	jeq r6, 0x2, +0x67 <.text+0xe6f78>
   e6d60: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6d68: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   e6d70: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e6d78: 07 02 00 00 48 ff ff ff      	add64 r2, -0xb8
   e6d80: b7 03 00 00 b2 00 00 00      	mov64 r3, 0xb2
   e6d88: 85 10 00 00 61 65 00 00      	call 0x6561
   e6d90: 61 a1 fb ff 00 00 00 00      	ldxw r1, [r10 - 0x5]
   e6d98: 63 1a 33 ff 00 00 00 00      	stxw [r10 - 0xcd], r1
   e6da0: 71 a1 ff ff 00 00 00 00      	ldxb r1, [r10 - 0x1]
   e6da8: 73 1a 37 ff 00 00 00 00      	stxb [r10 - 0xc9], r1
   e6db0: 73 6a 32 ff 00 00 00 00      	stxb [r10 - 0xce], r6
   e6db8: 7b 9a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r9
   e6dc0: 7b 8a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r8
   e6dc8: 71 a1 5f fe 00 00 00 00      	ldxb r1, [r10 - 0x1a1]
   e6dd0: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   e6dd8: 71 a1 5e fe 00 00 00 00      	ldxb r1, [r10 - 0x1a2]
   e6de0: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   e6de8: 79 a1 68 fe 00 00 00 00      	ldxdw r1, [r10 - 0x198]
   e6df0: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   e6df8: 79 a1 60 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a0]
   e6e00: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   e6e08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6e10: 07 01 00 00 70 fe ff ff      	add64 r1, -0x190
   e6e18: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   e6e20: 7b 7a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r7
   e6e28: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6e30: 07 01 00 00 48 fe ff ff      	add64 r1, -0x1b8
   e6e38: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e6e40: 07 02 00 00 38 ff ff ff      	add64 r2, -0xc8
   e6e48: 85 10 00 00 e8 ea fe ff      	call -0x11518
   e6e50: 79 a8 48 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1b8]
   e6e58: 15 08 01 00 02 00 00 00      	jeq r8, 0x2, +0x1 <.text+0xe6d48>
   e6e60: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xe6e70>
   e6e68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6e70: 07 01 00 00 38 fe ff ff      	add64 r1, -0x1c8
   e6e78: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e6e80: 07 02 00 00 70 fe ff ff      	add64 r2, -0x190
   e6e88: 85 10 00 00 28 d1 ff ff      	call -0x2ed8
   e6e90: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   e6e98: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   e6ea0: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6ea8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6eb0: 79 a9 40 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1c0]
   e6eb8: 79 a8 38 fe 00 00 00 00      	ldxdw r8, [r10 - 0x1c8]
   e6ec0: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6ec8: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6dc8>
   e6ed0: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6ed8: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6ee0: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6ee8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6ef0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6ef8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6f00: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6e00>
   e6f08: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6f10: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6f18: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6f20: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   e6f28: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   e6f30: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6f38: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6f40: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6f48: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6e48>
   e6f50: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6f58: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6f60: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6f68: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6f70: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6f78: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6f80: 55 02 22 00 00 00 00 00      	jne r2, 0x0, +0x22 <.text+0xe6f78>
   e6f88: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0xe6f60>
   e6f90: 79 a9 50 fe 00 00 00 00      	ldxdw r9, [r10 - 0x1b0]
   e6f98: 79 a1 e8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x118]
   e6fa0: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   e6fa8: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e6fb0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6fb8: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e6fc0: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6ec0>
   e6fc8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e6fd0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e6fd8: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e6fe0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6fe8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6ff0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6ff8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6ef8>
   e7000: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7008: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7010: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e7018: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   e7020: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   e7028: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
   e7030: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7038: 7b 32 00 00 00 00 00 00      	stxdw [r2 + 0x0], r3
   e7040: 55 03 03 00 00 00 00 00      	jne r3, 0x0, +0x3 <.text+0xe6f40>
   e7048: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
   e7050: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   e7058: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
   e7060: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e7068: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7070: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e7078: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <.text+0xe6f78>
   e7080: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e7088: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e7090: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e7098: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   e70a0: 7b 91 08 00 00 00 00 00      	stxdw [r1 + 0x8], r9
   e70a8: 7b 81 00 00 00 00 00 00      	stxdw [r1 + 0x0], r8
   e70b0: 95 00 00 00 00 00 00 00      	exit
