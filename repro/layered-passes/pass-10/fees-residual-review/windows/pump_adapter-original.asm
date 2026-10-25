
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_fees/deployed.so:	file format elf64-sbf

Disassembly of section .text:

0000000000000120 <.text>:
   39ad0: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
   39ad8: 79 67 00 00 00 00 00 00      	ldxdw r7, [r6 + 0x0]
   39ae0: 07 07 00 00 01 00 00 00      	add64 r7, 0x1
   39ae8: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
   39af0: 15 07 01 00 00 00 00 00      	jeq r7, 0x0, +0x1 <.text+0x399e0>
   39af8: b7 08 00 00 00 00 00 00      	mov64 r8, 0x0
   39b00: 79 20 00 00 00 00 00 00      	ldxdw r0, [r2 + 0x0]
   39b08: 7b 76 00 00 00 00 00 00      	stxdw [r6 + 0x0], r7
   39b10: 55 08 01 00 01 00 00 00      	jne r8, 0x1, +0x1 <.text+0x39a00>
   39b18: 85 10 00 00 ff ff ff ff      	call -0x1
   39b20: 7b 3a b8 fb 00 00 00 00      	stxdw [r10 - 0x448], r3
   39b28: 7b 4a c8 fb 00 00 00 00      	stxdw [r10 - 0x438], r4
   39b30: 7b 0a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r0
   39b38: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   39b40: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   39b48: 07 00 00 00 01 00 00 00      	add64 r0, 0x1
   39b50: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   39b58: 15 00 01 00 00 00 00 00      	jeq r0, 0x0, +0x1 <.text+0x39a48>
   39b60: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   39b68: 7b 6a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r6
   39b70: 7b 1a 00 fc 00 00 00 00      	stxdw [r10 - 0x400], r1
   39b78: 79 57 48 f0 00 00 00 00      	ldxdw r7, [r5 - 0xfb8]
   39b80: 79 53 40 f0 00 00 00 00      	ldxdw r3, [r5 - 0xfc0]
   39b88: 79 51 38 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfc8]
   39b90: 7b 1a c0 fb 00 00 00 00      	stxdw [r10 - 0x440], r1
   39b98: 79 51 30 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfd0]
   39ba0: 7b 1a b0 fb 00 00 00 00      	stxdw [r10 - 0x450], r1
   39ba8: 79 51 28 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfd8]
   39bb0: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
   39bb8: 79 51 20 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfe0]
   39bc0: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
   39bc8: 79 51 18 f0 00 00 00 00      	ldxdw r1, [r5 - 0xfe8]
   39bd0: 7b 1a d8 fb 00 00 00 00      	stxdw [r10 - 0x428], r1
   39bd8: 79 51 10 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff0]
   39be0: 7b 1a d0 fb 00 00 00 00      	stxdw [r10 - 0x430], r1
   39be8: 79 51 08 f0 00 00 00 00      	ldxdw r1, [r5 - 0xff8]
   39bf0: 7b 1a a8 fb 00 00 00 00      	stxdw [r10 - 0x458], r1
   39bf8: 79 58 00 f0 00 00 00 00      	ldxdw r8, [r5 - 0x1000]
   39c00: 7b 09 00 00 00 00 00 00      	stxdw [r9 + 0x0], r0
   39c08: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x39af8>
   39c10: 05 00 e0 ff 00 00 00 00      	ja -0x20 <.text+0x399f8>
   39c18: 79 21 18 00 00 00 00 00      	ldxdw r1, [r2 + 0x18]
   39c20: 7b 1a a0 fb 00 00 00 00      	stxdw [r10 - 0x460], r1
   39c28: 79 21 20 00 00 00 00 00      	ldxdw r1, [r2 + 0x20]
   39c30: 7b 1a 98 fb 00 00 00 00      	stxdw [r10 - 0x468], r1
   39c38: 71 21 28 00 00 00 00 00      	ldxb r1, [r2 + 0x28]
   39c40: 7b 1a 90 fb 00 00 00 00      	stxdw [r10 - 0x470], r1
   39c48: 71 21 29 00 00 00 00 00      	ldxb r1, [r2 + 0x29]
   39c50: 7b 1a 88 fb 00 00 00 00      	stxdw [r10 - 0x478], r1
   39c58: 71 21 2a 00 00 00 00 00      	ldxb r1, [r2 + 0x2a]
   39c60: 7b 1a 80 fb 00 00 00 00      	stxdw [r10 - 0x480], r1
   39c68: bf a6 00 00 00 00 00 00      	mov64 r6, r10
   39c70: 07 06 00 00 18 fc ff ff      	add64 r6, -0x3e8
   39c78: bf 61 00 00 00 00 00 00      	mov64 r1, r6
   39c80: 7b 2a 78 fb 00 00 00 00      	stxdw [r10 - 0x488], r2
   39c88: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   39c90: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39c98: 85 10 00 00 45 11 01 00      	call 0x11145
   39ca0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39ca8: 07 01 00 00 48 fc ff ff      	add64 r1, -0x3b8
   39cb0: 79 a2 b8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x448]
   39cb8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39cc0: 85 10 00 00 40 11 01 00      	call 0x11140
   39cc8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39cd0: 07 01 00 00 78 fc ff ff      	add64 r1, -0x388
   39cd8: 79 a2 c8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x438]
   39ce0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39ce8: 85 10 00 00 3b 11 01 00      	call 0x1113b
   39cf0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39cf8: 07 01 00 00 a8 fc ff ff      	add64 r1, -0x358
   39d00: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   39d08: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39d10: 85 10 00 00 36 11 01 00      	call 0x11136
   39d18: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39d20: 07 01 00 00 d8 fc ff ff      	add64 r1, -0x328
   39d28: 79 a2 a8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x458]
   39d30: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39d38: 85 10 00 00 31 11 01 00      	call 0x11131
   39d40: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39d48: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   39d50: 79 a2 b0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x450]
   39d58: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39d60: 85 10 00 00 2c 11 01 00      	call 0x1112c
   39d68: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39d70: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   39d78: 79 a2 c0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x440]
   39d80: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39d88: 85 10 00 00 27 11 01 00      	call 0x11127
   39d90: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   39d98: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   39da0: 79 73 00 00 00 00 00 00      	ldxdw r3, [r7 + 0x0]
   39da8: 7b 3a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r3
   39db0: 7b 2a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r2
   39db8: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   39dc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39dc8: 07 01 00 00 80 fd ff ff      	add64 r1, -0x280
   39dd0: 79 a2 78 fb 00 00 00 00      	ldxdw r2, [r10 - 0x488]
   39dd8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39de0: 85 10 00 00 1c 11 01 00      	call 0x1111c
   39de8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39df0: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   39df8: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   39e00: b7 03 00 00 50 01 00 00      	mov64 r3, 0x150
   39e08: 85 10 00 00 17 11 01 00      	call 0x11117
   39e10: 79 a1 80 fb 00 00 00 00      	ldxdw r1, [r10 - 0x480]
   39e18: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   39e20: 79 a1 88 fb 00 00 00 00      	ldxdw r1, [r10 - 0x478]
   39e28: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   39e30: 79 a1 90 fb 00 00 00 00      	ldxdw r1, [r10 - 0x470]
   39e38: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   39e40: 79 a1 98 fb 00 00 00 00      	ldxdw r1, [r10 - 0x468]
   39e48: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   39e50: 79 a1 a0 fb 00 00 00 00      	ldxdw r1, [r10 - 0x460]
   39e58: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   39e60: 7b 9a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r9
   39e68: 79 a1 f8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x408]
   39e70: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   39e78: 79 a1 e8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x418]
   39e80: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   39e88: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39e90: 07 01 00 00 30 ff ff ff      	add64 r1, -0xd0
   39e98: 79 a2 d0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x430]
   39ea0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39ea8: 85 10 00 00 03 11 01 00      	call 0x11103
   39eb0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39eb8: 07 01 00 00 60 ff ff ff      	add64 r1, -0xa0
   39ec0: 79 a2 d8 fb 00 00 00 00      	ldxdw r2, [r10 - 0x428]
   39ec8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39ed0: 85 10 00 00 fe 10 01 00      	call 0x110fe
   39ed8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39ee0: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   39ee8: 79 a2 e0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x420]
   39ef0: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39ef8: 85 10 00 00 f9 10 01 00      	call 0x110f9
   39f00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39f08: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   39f10: 79 a2 f0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x410]
   39f18: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   39f20: 85 10 00 00 f4 10 01 00      	call 0x110f4
   39f28: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   39f30: 7a 0a f0 ff 08 00 00 00      	stdw [r10 - 0x10], 0x8
   39f38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   39f40: 07 01 00 00 08 fc ff ff      	add64 r1, -0x3f8
   39f48: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   39f50: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   39f58: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   39f60: 85 10 00 00 bb 97 00 00      	call 0x97bb
   39f68: 79 a1 08 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3f8]
   39f70: 79 a2 10 fc 00 00 00 00      	ldxdw r2, [r10 - 0x3f0]
   39f78: 79 a3 00 fc 00 00 00 00      	ldxdw r3, [r10 - 0x400]
   39f80: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   39f88: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   39f90: 95 00 00 00 00 00 00 00      	exit
