
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-claim-overflow-order-build/publication/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

00000000000e5b80 <_ZN10anchor_spl10token_202216transfer_checked17h34e36c74a4d76378E>:
   e5b80: bf 29 00 00 00 00 00 00      	mov64 r9, r2
   e5b88: 7b 1a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r1
   e5b90: 79 90 78 00 00 00 00 00      	ldxdw r0, [r9 + 0x78]
   e5b98: 79 96 48 00 00 00 00 00      	ldxdw r6, [r9 + 0x48]
   e5ba0: 79 92 18 00 00 00 00 00      	ldxdw r2, [r9 + 0x18]
   e5ba8: 79 91 a8 00 00 00 00 00      	ldxdw r1, [r9 + 0xa8]
   e5bb0: 79 95 d8 00 00 00 00 00      	ldxdw r5, [r9 + 0xd8]
   e5bb8: 7b 3a 20 f0 00 00 00 00      	stxdw [r10 - 0xfe0], r3
   e5bc0: 7b 4a 28 f0 00 00 00 00      	stxdw [r10 - 0xfd8], r4
   e5bc8: 7b 5a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r5
   e5bd0: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
   e5bd8: 7a 0a 18 f0 00 00 00 00      	stdw [r10 - 0xfe8], 0x0
   e5be0: 7a 0a 10 f0 08 00 00 00      	stdw [r10 - 0xff0], 0x8
   e5be8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5bf0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   e5bf8: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e5c00: bf 63 00 00 00 00 00 00      	mov64 r3, r6
   e5c08: bf 04 00 00 00 00 00 00      	mov64 r4, r0
   e5c10: 85 10 00 00 55 16 00 00      	call 0x1655
   e5c18: 79 a1 48 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb8]
   e5c20: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   e5c28: 79 a1 50 ff 00 00 00 00      	ldxdw r1, [r10 - 0xb0]
   e5c30: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   e5c38: 79 a1 58 ff 00 00 00 00      	ldxdw r1, [r10 - 0xa8]
   e5c40: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   e5c48: 79 a8 40 ff 00 00 00 00      	ldxdw r8, [r10 - 0xc0]
   e5c50: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   e5c60: 1d 18 72 00 00 00 00 00      	jeq r8, r1, +0x72 <LBB48_2>
   e5c68: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   e5c70: 07 01 00 00 d8 00 00 00      	add64 r1, 0xd8
   e5c78: 7b 1a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r1
   e5c80: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   e5c88: 07 01 00 00 a8 00 00 00      	add64 r1, 0xa8
   e5c90: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   e5c98: bf 96 00 00 00 00 00 00      	mov64 r6, r9
   e5ca0: 07 06 00 00 78 00 00 00      	add64 r6, 0x78
   e5ca8: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   e5cb0: 07 07 00 00 48 00 00 00      	add64 r7, 0x48
   e5cb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5cc0: 07 01 00 00 e0 fe ff ff      	add64 r1, -0x120
   e5cc8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e5cd0: 07 02 00 00 60 ff ff ff      	add64 r2, -0xa0
   e5cd8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   e5ce0: 85 10 00 00 7e 49 00 00      	call 0x497e
   e5ce8: 7b 8a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r8
   e5cf0: 79 a1 10 ff 00 00 00 00      	ldxdw r1, [r10 - 0xf0]
   e5cf8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   e5d00: 79 a1 18 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe8]
   e5d08: 7b 1a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r1
   e5d10: 79 a1 20 ff 00 00 00 00      	ldxdw r1, [r10 - 0xe0]
   e5d18: 7b 1a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r1
   e5d20: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5d28: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   e5d30: 7b 1a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r1
   e5d38: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   e5d40: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   e5d48: 85 10 00 00 71 49 00 00      	call 0x4971
   e5d50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5d58: 07 01 00 00 70 ff ff ff      	add64 r1, -0x90
   e5d60: bf 62 00 00 00 00 00 00      	mov64 r2, r6
   e5d68: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   e5d70: 85 10 00 00 6c 49 00 00      	call 0x496c
   e5d78: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5d80: 07 01 00 00 a0 ff ff ff      	add64 r1, -0x60
   e5d88: 79 a2 88 fe 00 00 00 00      	ldxdw r2, [r10 - 0x178]
   e5d90: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   e5d98: 85 10 00 00 67 49 00 00      	call 0x4967
   e5da0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5da8: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
   e5db0: 79 a2 90 fe 00 00 00 00      	ldxdw r2, [r10 - 0x170]
   e5db8: b7 03 00 00 30 00 00 00      	mov64 r3, 0x30
   e5dc0: 85 10 00 00 62 49 00 00      	call 0x4962
   e5dc8: 79 91 10 01 00 00 00 00      	ldxdw r1, [r9 + 0x110]
   e5dd0: 79 92 08 01 00 00 00 00      	ldxdw r2, [r9 + 0x108]
   e5dd8: 7b 2a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r2
   e5de0: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   e5de8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5df0: 07 01 00 00 28 ff ff ff      	add64 r1, -0xd8
   e5df8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e5e00: 07 02 00 00 c0 fe ff ff      	add64 r2, -0x140
   e5e08: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   e5e10: 79 a3 80 fe 00 00 00 00      	ldxdw r3, [r10 - 0x180]
   e5e18: b7 04 00 00 04 00 00 00      	mov64 r4, 0x4
   e5e20: 85 10 00 00 c1 23 00 00      	call 0x23c1
   e5e28: b7 06 00 00 02 00 00 00      	mov64 r6, 0x2
   e5e30: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x7fffffffffffffe6
   e5e40: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   e5e48: 1d 12 08 00 00 00 00 00      	jeq r2, r1, +0x8 <LBB48_33>
   e5e50: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5e58: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   e5e60: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e5e68: 07 02 00 00 28 ff ff ff      	add64 r2, -0xd8
   e5e70: 85 10 00 00 68 1c 00 00      	call 0x1c68
   e5e78: 79 a8 c0 fe 00 00 00 00      	ldxdw r8, [r10 - 0x140]
   e5e80: 79 a7 b8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x148]
   e5e88: 79 a6 b0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x150]

00000000000e5e90 <LBB48_33>:
   e5e90: 15 08 05 00 00 00 00 00      	jeq r8, 0x0, +0x5 <LBB48_35>
   e5e98: 27 08 00 00 22 00 00 00      	mul64 r8, 0x22
   e5ea0: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   e5ea8: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   e5eb0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   e5eb8: 85 10 00 00 66 ce ff ff      	call -0x319a

00000000000e5ec0 <LBB48_35>:
   e5ec0: 79 a2 d8 fe 00 00 00 00      	ldxdw r2, [r10 - 0x128]
   e5ec8: 15 02 03 00 00 00 00 00      	jeq r2, 0x0, +0x3 <LBB48_37>
   e5ed0: 79 a1 e0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x120]
   e5ed8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   e5ee0: 85 10 00 00 61 ce ff ff      	call -0x319f

00000000000e5ee8 <LBB48_37>:
   e5ee8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e5ef0: 07 01 00 00 40 ff ff ff      	add64 r1, -0xc0
   e5ef8: 85 10 00 00 7d fd ff ff      	call -0x283
   e5f00: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   e5f08: 85 10 00 00 79 fe ff ff      	call -0x187
   e5f10: 79 98 28 00 00 00 00 00      	ldxdw r8, [r9 + 0x28]
   e5f18: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
   e5f20: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e5f28: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e5f30: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e5f38: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_40>
   e5f40: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e5f48: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e5f50: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e5f58: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_40>
   e5f60: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e5f68: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e5f70: 85 10 00 00 4f ce ff ff      	call -0x31b1

00000000000e5f78 <LBB48_40>:
   e5f78: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e5f80: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e5f88: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e5f90: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <LBB48_43>
   e5f98: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e5fa0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e5fa8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e5fb0: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB48_43>

00000000000e5fb8 <LBB48_42>:
   e5fb8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   e5fc0: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   e5fc8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e5fd0: 85 10 00 00 43 ce ff ff      	call -0x31bd

00000000000e5fd8 <LBB48_43>:
   e5fd8: 79 a1 98 fe 00 00 00 00      	ldxdw r1, [r10 - 0x168]
   e5fe0: 7b 71 08 00 00 00 00 00      	stxdw [r1 + 0x8], r7
   e5fe8: 7b 61 00 00 00 00 00 00      	stxdw [r1 + 0x0], r6
   e5ff0: 95 00 00 00 00 00 00 00      	exit

00000000000e5ff8 <LBB48_2>:
   e5ff8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   e6000: 07 01 00 00 a0 fe ff ff      	add64 r1, -0x160
   e6008: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   e6010: 07 02 00 00 10 ff ff ff      	add64 r2, -0xf0
   e6018: 85 10 00 00 33 1c 00 00      	call 0x1c33
   e6020: 79 a7 a8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x158]
   e6028: 79 a6 a0 fe 00 00 00 00      	ldxdw r6, [r10 - 0x160]
   e6030: 79 98 58 00 00 00 00 00      	ldxdw r8, [r9 + 0x58]
   e6038: 79 91 50 00 00 00 00 00      	ldxdw r1, [r9 + 0x50]
   e6040: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6048: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6050: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6058: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_5>
   e6060: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6068: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6070: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6078: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_5>
   e6080: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e6088: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e6090: 85 10 00 00 2b ce ff ff      	call -0x31d5

00000000000e6098 <LBB48_5>:
   e6098: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e60a0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e60a8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e60b0: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <LBB48_8>
   e60b8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e60c0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e60c8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e60d0: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB48_8>
   e60d8: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   e60e0: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   e60e8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e60f0: 85 10 00 00 1f ce ff ff      	call -0x31e1

00000000000e60f8 <LBB48_8>:
   e60f8: 79 98 88 00 00 00 00 00      	ldxdw r8, [r9 + 0x88]
   e6100: 79 91 80 00 00 00 00 00      	ldxdw r1, [r9 + 0x80]
   e6108: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6110: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6118: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6120: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_11>
   e6128: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6130: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6138: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6140: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_11>
   e6148: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e6150: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e6158: 85 10 00 00 12 ce ff ff      	call -0x31ee

00000000000e6160 <LBB48_11>:
   e6160: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e6168: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6170: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e6178: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <LBB48_14>
   e6180: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e6188: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6190: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e6198: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB48_14>
   e61a0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   e61a8: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   e61b0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e61b8: 85 10 00 00 06 ce ff ff      	call -0x31fa

00000000000e61c0 <LBB48_14>:
   e61c0: 79 98 b8 00 00 00 00 00      	ldxdw r8, [r9 + 0xb8]
   e61c8: 79 91 b0 00 00 00 00 00      	ldxdw r1, [r9 + 0xb0]
   e61d0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e61d8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e61e0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e61e8: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_17>
   e61f0: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e61f8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6200: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e6208: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_17>
   e6210: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e6218: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e6220: 85 10 00 00 f9 cd ff ff      	call -0x3207

00000000000e6228 <LBB48_17>:
   e6228: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e6230: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6238: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e6240: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <LBB48_20>
   e6248: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e6250: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6258: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e6260: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB48_20>
   e6268: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   e6270: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   e6278: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e6280: 85 10 00 00 ed cd ff ff      	call -0x3213

00000000000e6288 <LBB48_20>:
   e6288: 79 98 e8 00 00 00 00 00      	ldxdw r8, [r9 + 0xe8]
   e6290: 79 91 e0 00 00 00 00 00      	ldxdw r1, [r9 + 0xe0]
   e6298: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e62a0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e62a8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e62b0: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_23>
   e62b8: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e62c0: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e62c8: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e62d0: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_23>
   e62d8: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e62e0: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e62e8: 85 10 00 00 e0 cd ff ff      	call -0x3220

00000000000e62f0 <LBB48_23>:
   e62f0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e62f8: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6300: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e6308: 55 01 08 00 00 00 00 00      	jne r1, 0x0, +0x8 <LBB48_26>
   e6310: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e6318: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e6320: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e6328: 55 01 04 00 00 00 00 00      	jne r1, 0x0, +0x4 <LBB48_26>
   e6330: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   e6338: b7 02 00 00 28 00 00 00      	mov64 r2, 0x28
   e6340: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e6348: 85 10 00 00 d4 cd ff ff      	call -0x322c

00000000000e6350 <LBB48_26>:
   e6350: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   e6358: 85 10 00 00 ef fd ff ff      	call -0x211
   e6360: 79 98 28 00 00 00 00 00      	ldxdw r8, [r9 + 0x28]
   e6368: 79 91 20 00 00 00 00 00      	ldxdw r1, [r9 + 0x20]
   e6370: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   e6378: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e6380: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
   e6388: 55 02 07 00 00 00 00 00      	jne r2, 0x0, +0x7 <LBB48_29>
   e6390: 79 12 08 00 00 00 00 00      	ldxdw r2, [r1 + 0x8]
   e6398: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
   e63a0: 7b 21 08 00 00 00 00 00      	stxdw [r1 + 0x8], r2
   e63a8: 55 02 03 00 00 00 00 00      	jne r2, 0x0, +0x3 <LBB48_29>
   e63b0: b7 02 00 00 20 00 00 00      	mov64 r2, 0x20
   e63b8: b7 03 00 00 08 00 00 00      	mov64 r3, 0x8
   e63c0: 85 10 00 00 c5 cd ff ff      	call -0x323b

00000000000e63c8 <LBB48_29>:
   e63c8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   e63d0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e63d8: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   e63e0: 55 01 7e ff 00 00 00 00      	jne r1, 0x0, -0x82 <LBB48_43>
   e63e8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   e63f0: 07 01 00 00 ff ff ff ff      	add64 r1, -0x1
   e63f8: 7b 18 08 00 00 00 00 00      	stxdw [r8 + 0x8], r1
   e6400: 55 01 7a ff 00 00 00 00      	jne r1, 0x0, -0x86 <LBB48_43>
   e6408: 05 00 75 ff 00 00 00 00      	ja -0x8b <LBB48_42>
