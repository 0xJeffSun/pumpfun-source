   b3b90: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   b3b98: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   b3ba0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   b3ba8: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   b3bb0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   b3bb8: 85 10 00 00 c6 dd 01 00      	call 0x1ddc6
   b3bc0: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   b3bc8: 7b 7a f0 fc 00 00 00 00      	stxdw [r10 - 0x310], r7
   b3bd0: 7b 6a e8 fc 00 00 00 00      	stxdw [r10 - 0x318], r6
   b3bd8: 55 09 0f 00 00 00 00 00      	jne r9, 0x0, +0xf <.text+0xb3b38>
   b3be0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   b3be8: b7 02 00 00 a6 00 00 00      	mov64 r2, 0xa6
   b3bf0: 85 10 00 00 de d9 01 00      	call 0x1d9de
   b3bf8: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   b3c00: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b3c08: 79 19 08 00 00 00 00 00      	ldxdw r9, [r1 + 0x8]
   b3c10: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   b3c18: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b3c20: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b3c28: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb3b18>
   b3c30: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b3c38: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   b3c40: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   b3c48: 55 03 3d 00 01 00 00 00      	jne r3, 0x1, +0x3d <.text+0xb3d18>
   b3c50: 85 10 00 00 ff ff ff ff      	call -0x1
   b3c58: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   b3c60: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b3c68: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   b3c70: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   b3c78: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   b3c80: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   b3c88: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   b3c90: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   b3c98: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   b3ca0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   b3ca8: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   b3cb0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   b3cb8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   b3cc0: 79 77 00 00 00 00 00 00      	ldxdw r7, [r7 + 0x0]
   b3cc8: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   b3cd0: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   b3cd8: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   b3ce0: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   b3ce8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   b3cf0: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   b3cf8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   b3d00: 7b 1a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r1
   b3d08: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b3d10: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   b3d18: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b3d20: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   b3d28: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   b3d30: 85 10 00 00 28 ff 01 00      	call 0x1ff28
   b3d38: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   b3d40: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   b3d48: 15 00 ce 00 00 00 00 00      	jeq r0, 0x0, +0xce <.text+0xb42a0>
   b3d50: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   b3d58: b7 02 00 00 a6 00 00 00      	mov64 r2, 0xa6
   b3d60: 85 10 00 00 b0 d9 01 00      	call 0x1d9b0
   b3d68: bf 67 00 00 00 00 00 00      	mov64 r7, r6
   b3d70: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <.text+0xb3c60>
   b3d78: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   b3d80: 79 a5 f0 fc 00 00 00 00      	ldxdw r5, [r10 - 0x310]
   b3d88: 7b 7a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r7
   b3d90: 2d 90 01 00 00 00 00 00      	jgt r0, r9, +0x1 <.text+0xb3c80>
   b3d98: 05 00 a6 01 00 00 00 00      	ja +0x1a6 <.text+0xb49b0>
   b3da0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   b3da8: 1f 92 00 00 00 00 00 00      	sub64 r2, r9
   b3db0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   b3db8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b3dc0: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <.text+0xb3cb0>
   b3dc8: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b3dd0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b3dd8: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0xb3cc8>
   b3de0: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   b3de8: 79 a0 d8 fc 00 00 00 00      	ldxdw r0, [r10 - 0x328]
   b3df0: 79 03 08 00 00 00 00 00      	ldxdw r3, [r0 + 0x8]
   b3df8: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   b3e00: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b3e08: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb3cf8>
   b3e10: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   b3e18: 79 08 00 00 00 00 00 00      	ldxdw r8, [r0 + 0x0]
   b3e20: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   b3e28: 55 01 0a 01 01 00 00 00      	jne r1, 0x1, +0x10a <.text+0xb4560>
   b3e30: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0xb3b30>
   b3e38: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   b3e40: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   b3e48: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b3e50: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b3e58: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb3d48>
   b3e60: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b3e68: 7b 0a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r0
   b3e70: 7b 5a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r5
   b3e78: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   b3e80: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb3d70>
   b3e88: 05 00 b8 ff 00 00 00 00      	ja -0x48 <.text+0xb3b30>
   b3e90: 79 70 08 00 00 00 00 00      	ldxdw r0, [r7 + 0x8]
   b3e98: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   b3ea0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b3ea8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   b3eb0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb3da0>
   b3eb8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   b3ec0: 79 74 00 00 00 00 00 00      	ldxdw r4, [r7 + 0x0]
   b3ec8: 7b 4a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r4
   b3ed0: 71 14 2a 00 00 00 00 00      	ldxb r4, [r1 + 0x2a]
   b3ed8: 7b 4a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r4
   b3ee0: 71 14 29 00 00 00 00 00      	ldxb r4, [r1 + 0x29]
   b3ee8: 7b 4a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r4
   b3ef0: 71 14 28 00 00 00 00 00      	ldxb r4, [r1 + 0x28]
   b3ef8: 7b 4a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r4
   b3f00: 79 14 20 00 00 00 00 00      	ldxdw r4, [r1 + 0x20]
   b3f08: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   b3f10: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   b3f18: 7b 1a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r1
   b3f20: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   b3f28: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xb3e18>
   b3f30: 05 00 a3 ff 00 00 00 00      	ja -0x5d <.text+0xb3b30>
   b3f38: 79 77 10 00 00 00 00 00      	ldxdw r7, [r7 + 0x10]
   b3f40: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   b3f48: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b3f50: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b3f58: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb3e48>
   b3f60: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b3f68: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   b3f70: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb3e60>
   b3f78: 05 00 9a ff 00 00 00 00      	ja -0x66 <.text+0xb3b30>
   b3f80: 7b 3a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r3
   b3f88: 7b 8a e0 fc 00 00 00 00      	stxdw [r10 - 0x320], r8
   b3f90: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   b3f98: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   b3fa0: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   b3fa8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   b3fb0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b3fb8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b3fc0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb3eb0>
   b3fc8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b3fd0: 79 a3 f0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x310]
   b3fd8: 71 34 2a 00 00 00 00 00      	ldxb r4, [r3 + 0x2a]
   b3fe0: 7b 4a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r4
   b3fe8: 71 34 29 00 00 00 00 00      	ldxb r4, [r3 + 0x29]
   b3ff0: 7b 4a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r4
   b3ff8: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   b4000: 7b 4a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r4
   b4008: 79 34 20 00 00 00 00 00      	ldxdw r4, [r3 + 0x20]
   b4010: 7b 4a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r4
   b4018: 79 34 18 00 00 00 00 00      	ldxdw r4, [r3 + 0x18]
   b4020: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   b4028: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   b4030: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb3f20>
   b4038: 05 00 82 ff 00 00 00 00      	ja -0x7e <.text+0xb3b30>
   b4040: 7b 3a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r3
   b4048: 79 65 10 00 00 00 00 00      	ldxdw r5, [r6 + 0x10]
   b4050: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   b4058: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4060: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4068: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb3f58>
   b4070: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4078: 7b 9a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r9
   b4080: 79 a3 d8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x328]
   b4088: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   b4090: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb3f80>
   b4098: 05 00 76 ff 00 00 00 00      	ja -0x8a <.text+0xb3b30>
   b40a0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   b40a8: 7b 1a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r1
   b40b0: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   b40b8: 7b 1a 58 fc 00 00 00 00      	stxdw [r10 - 0x3a8], r1
   b40c0: 71 61 28 00 00 00 00 00      	ldxb r1, [r6 + 0x28]
   b40c8: 7b 1a 50 fc 00 00 00 00      	stxdw [r10 - 0x3b0], r1
   b40d0: 71 69 29 00 00 00 00 00      	ldxb r9, [r6 + 0x29]
   b40d8: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   b40e0: 79 a2 e0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x320]
   b40e8: 79 23 20 00 00 00 00 00      	ldxdw r3, [r2 + 0x20]
   b40f0: 79 33 58 00 00 00 00 00      	ldxdw r3, [r3 + 0x58]
   b40f8: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   b4100: 79 31 18 00 00 00 00 00      	ldxdw r1, [r3 + 0x18]
   b4108: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   b4110: 79 31 10 00 00 00 00 00      	ldxdw r1, [r3 + 0x10]
   b4118: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   b4120: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   b4128: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   b4130: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   b4138: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   b4140: 79 21 28 00 00 00 00 00      	ldxdw r1, [r2 + 0x28]
   b4148: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   b4150: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4158: 07 03 00 00 17 ff ff ff      	add64 r3, -0xe9
   b4160: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   b4168: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4170: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   b4178: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   b4180: 18 03 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1b683a
   b4190: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   b4198: 73 1a 17 ff 00 00 00 00      	stxb [r10 - 0xe9], r1
   b41a0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b41a8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   b41b0: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   b41b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b41c0: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   b41c8: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   b41d0: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   b41d8: 73 1a 0a fe 00 00 00 00      	stxb [r10 - 0x1f6], r1
   b41e0: 79 a1 80 fc 00 00 00 00      	ldxdw r1, [r10 - 0x380]
   b41e8: 73 1a 09 fe 00 00 00 00      	stxb [r10 - 0x1f7], r1
   b41f0: 79 a1 88 fc 00 00 00 00      	ldxdw r1, [r10 - 0x378]
   b41f8: 73 1a 08 fe 00 00 00 00      	stxb [r10 - 0x1f8], r1
   b4200: 79 a1 90 fc 00 00 00 00      	ldxdw r1, [r10 - 0x370]
   b4208: 7b 1a 00 fe 00 00 00 00      	stxdw [r10 - 0x200], r1
   b4210: 7b 4a f8 fd 00 00 00 00      	stxdw [r10 - 0x208], r4
   b4218: 7b 7a f0 fd 00 00 00 00      	stxdw [r10 - 0x210], r7
   b4220: 7b 0a e8 fd 00 00 00 00      	stxdw [r10 - 0x218], r0
   b4228: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   b4230: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   b4238: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   b4240: 73 1a da fd 00 00 00 00      	stxb [r10 - 0x226], r1
   b4248: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   b4250: 73 1a d9 fd 00 00 00 00      	stxb [r10 - 0x227], r1
   b4258: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   b4260: 73 1a d8 fd 00 00 00 00      	stxb [r10 - 0x228], r1
   b4268: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   b4270: 7b 1a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r1
   b4278: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   b4280: 7b 1a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r1
   b4288: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   b4290: 7b 1a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r1
   b4298: 79 a1 70 fc 00 00 00 00      	ldxdw r1, [r10 - 0x390]
   b42a0: 7b 1a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r1
   b42a8: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   b42b0: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   b42b8: 73 6a aa fd 00 00 00 00      	stxb [r10 - 0x256], r6
   b42c0: 73 9a a9 fd 00 00 00 00      	stxb [r10 - 0x257], r9
   b42c8: 79 a1 50 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3b0]
   b42d0: 73 1a a8 fd 00 00 00 00      	stxb [r10 - 0x258], r1
   b42d8: 79 a1 58 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a8]
   b42e0: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   b42e8: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   b42f0: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   b42f8: 7b 5a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r5
   b4300: 7b 8a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r8
   b4308: 79 a1 68 fc 00 00 00 00      	ldxdw r1, [r10 - 0x398]
   b4310: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   b4318: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   b4320: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   b4328: 7a 0a c8 ff 0d 00 00 00      	stdw [r10 - 0x38], 0xd
   b4330: 7a 0a 28 fe 03 00 00 00      	stdw [r10 - 0x1d8], 0x3
   b4338: 7a 0a 18 fe 01 00 00 00      	stdw [r10 - 0x1e8], 0x1
   b4340: 7a 0a 78 fd 00 00 00 00      	stdw [r10 - 0x288], 0x0
   b4348: 7a 0a 70 fd 08 00 00 00      	stdw [r10 - 0x290], 0x8
   b4350: 7a 0a 68 fd 00 00 00 00      	stdw [r10 - 0x298], 0x0
   b4358: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   b4360: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   b4368: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4370: 07 01 00 00 08 fd ff ff      	add64 r1, -0x2f8
   b4378: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b4380: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   b4388: 79 a3 d8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x328]
   b4390: b7 04 00 00 a6 00 00 00      	mov64 r4, 0xa6
   b4398: 85 10 00 00 36 d3 01 00      	call 0x1d336
   b43a0: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   b43a8: 15 01 e9 01 02 00 00 00      	jeq r1, 0x2, +0x1e9 <.text+0xb51d8>
   b43b0: 79 a2 10 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2f0]
   b43b8: 05 00 1e 02 00 00 00 00      	ja +0x21e <.text+0xb5390>
   b43c0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b43c8: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   b43d0: 18 02 00 00 5c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r2, 0x1b5e5c
   b43e0: 85 10 00 00 69 d4 01 00      	call 0x1d469
   b43e8: 7a 0a 00 ff 00 00 00 00      	stdw [r10 - 0x100], 0x0
   b43f0: 7a 0a f8 fe 01 00 00 00      	stdw [r10 - 0x108], 0x1
   b43f8: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   b4400: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd838
   b4410: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   b4418: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4420: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   b4428: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   b4430: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   b4438: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   b4440: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   b4448: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   b4450: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b4458: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   b4460: 18 01 00 00 5c 5e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5e5c
   b4470: 85 10 00 00 1f d6 01 00      	call 0x1d61f
   b4478: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0xb43b0>
   b4480: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4488: 07 03 00 00 68 fd ff ff      	add64 r3, -0x298
   b4490: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b5fa4
   b44a0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   b44a8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bd868
   b44b8: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bd888
   b44c8: 85 10 00 00 29 f1 01 00      	call 0x1f129
   b44d0: 79 a1 00 ff 00 00 00 00      	ldxdw r1, [r10 - 0x100]
   b44d8: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   b44e0: 79 a1 f8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x108]
   b44e8: 7b 1a a8 fd 00 00 00 00      	stxdw [r10 - 0x258], r1
   b44f0: 79 a1 f0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x110]
   b44f8: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   b4500: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   b4508: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   b4510: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   b4518: 7b 1a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r1
   b4520: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   b4528: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   b4530: 18 01 00 00 77 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b6877
   b4540: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   b4548: 62 0a 00 fe 05 10 00 00      	stw [r10 - 0x200], 0x1005
   b4550: 72 0a b8 fd 02 00 00 00      	stb [r10 - 0x248], 0x2
   b4558: 62 0a 80 fd 1b 00 00 00      	stw [r10 - 0x280], 0x1b
   b4560: 7a 0a 78 fd 1e 00 00 00      	stdw [r10 - 0x288], 0x1e
   b4568: 7a 0a 68 fd 00 00 00 00      	stdw [r10 - 0x298], 0x0
   b4570: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4578: 07 01 00 00 28 fd ff ff      	add64 r1, -0x2d8
   b4580: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b4588: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   b4590: 85 10 00 00 b3 ce 01 00      	call 0x1ceb3
   b4598: 79 a3 30 fd 00 00 00 00      	ldxdw r3, [r10 - 0x2d0]
   b45a0: 79 a2 28 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2d8]
   b45a8: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   b45b0: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   b45b8: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   b45c0: 7b 1a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r1
   b45c8: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   b45d0: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   b45d8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   b45e0: 7b 1a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r1
   b45e8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   b45f0: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   b45f8: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   b4600: 7b 1a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r1
   b4608: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   b4610: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   b4618: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   b4620: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   b4628: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4630: 07 01 00 00 18 fd ff ff      	add64 r1, -0x2e8
   b4638: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   b4640: 07 04 00 00 68 fd ff ff      	add64 r4, -0x298
   b4648: 85 10 00 00 6d cf 01 00      	call 0x1cf6d
   b4650: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   b4658: 79 a2 20 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2e0]
   b4660: 79 a3 e8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x318]
   b4668: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   b4670: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   b4678: 05 00 c9 01 00 00 00 00      	ja +0x1c9 <.text+0xb53a8>
   b4680: 79 09 10 00 00 00 00 00      	ldxdw r9, [r0 + 0x10]
   b4688: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   b4690: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4698: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b46a0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4590>
   b46a8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b46b0: 7b 4a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r4
   b46b8: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   b46c0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb45b0>
   b46c8: 05 00 b0 fe 00 00 00 00      	ja -0x150 <.text+0xb3b30>
   b46d0: 79 56 08 00 00 00 00 00      	ldxdw r6, [r5 + 0x8]
   b46d8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   b46e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b46e8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b46f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb45e0>
   b46f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4700: 79 54 00 00 00 00 00 00      	ldxdw r4, [r5 + 0x0]
   b4708: 7b 4a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r4
   b4710: 71 04 2a 00 00 00 00 00      	ldxb r4, [r0 + 0x2a]
   b4718: 7b 4a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r4
   b4720: 71 04 29 00 00 00 00 00      	ldxb r4, [r0 + 0x29]
   b4728: 7b 4a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r4
   b4730: 71 04 28 00 00 00 00 00      	ldxb r4, [r0 + 0x28]
   b4738: 7b 4a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r4
   b4740: 79 04 20 00 00 00 00 00      	ldxdw r4, [r0 + 0x20]
   b4748: 7b 4a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r4
   b4750: 79 00 18 00 00 00 00 00      	ldxdw r0, [r0 + 0x18]
   b4758: 7b 6a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r6
   b4760: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b4768: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb4658>
   b4770: 05 00 9b fe 00 00 00 00      	ja -0x165 <.text+0xb3b30>
   b4778: 79 56 10 00 00 00 00 00      	ldxdw r6, [r5 + 0x10]
   b4780: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   b4788: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4790: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4798: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4688>
   b47a0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b47a8: 7b 0a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r0
   b47b0: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b47b8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb46a8>
   b47c0: 05 00 91 fe 00 00 00 00      	ja -0x16f <.text+0xb3b30>
   b47c8: 7b 9a 88 fc 00 00 00 00      	stxdw [r10 - 0x378], r9
   b47d0: 7b 8a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r8
   b47d8: 7b 3a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r3
   b47e0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   b47e8: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   b47f0: 79 02 08 00 00 00 00 00      	ldxdw r2, [r0 + 0x8]
   b47f8: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   b4800: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4808: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b4810: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4700>
   b4818: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b4820: 71 59 2a 00 00 00 00 00      	ldxb r9, [r5 + 0x2a]
   b4828: 71 57 29 00 00 00 00 00      	ldxb r7, [r5 + 0x29]
   b4830: 71 54 28 00 00 00 00 00      	ldxb r4, [r5 + 0x28]
   b4838: 7b 4a 80 fc 00 00 00 00      	stxdw [r10 - 0x380], r4
   b4840: 79 58 20 00 00 00 00 00      	ldxdw r8, [r5 + 0x20]
   b4848: 79 55 18 00 00 00 00 00      	ldxdw r5, [r5 + 0x18]
   b4850: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   b4858: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   b4860: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb4750>
   b4868: 05 00 7c fe 00 00 00 00      	ja -0x184 <.text+0xb3b30>
   b4870: 7b 9a 68 fc 00 00 00 00      	stxdw [r10 - 0x398], r9
   b4878: 7b 7a 70 fc 00 00 00 00      	stxdw [r10 - 0x390], r7
   b4880: 7b 4a 78 fc 00 00 00 00      	stxdw [r10 - 0x388], r4
   b4888: 79 07 10 00 00 00 00 00      	ldxdw r7, [r0 + 0x10]
   b4890: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   b4898: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b48a0: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b48a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4798>
   b48b0: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b48b8: bf 89 00 00 00 00 00 00      	mov64 r9, r8
   b48c0: 79 a4 d0 fc 00 00 00 00      	ldxdw r4, [r10 - 0x330]
   b48c8: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   b48d0: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0xb47c0>
   b48d8: 05 00 6e fe 00 00 00 00      	ja -0x192 <.text+0xb3b30>
   b48e0: 79 01 18 00 00 00 00 00      	ldxdw r1, [r0 + 0x18]
   b48e8: 7b 1a 60 fc 00 00 00 00      	stxdw [r10 - 0x3a0], r1
   b48f0: 79 01 20 00 00 00 00 00      	ldxdw r1, [r0 + 0x20]
   b48f8: 71 03 28 00 00 00 00 00      	ldxb r3, [r0 + 0x28]
   b4900: 71 04 29 00 00 00 00 00      	ldxb r4, [r0 + 0x29]
   b4908: 71 00 2a 00 00 00 00 00      	ldxb r0, [r0 + 0x2a]
   b4910: 79 a8 68 fc 00 00 00 00      	ldxdw r8, [r10 - 0x398]
   b4918: 73 8a da fe 00 00 00 00      	stxb [r10 - 0x126], r8
   b4920: 79 a8 70 fc 00 00 00 00      	ldxdw r8, [r10 - 0x390]
   b4928: 73 8a d9 fe 00 00 00 00      	stxb [r10 - 0x127], r8
   b4930: 79 a8 80 fc 00 00 00 00      	ldxdw r8, [r10 - 0x380]
   b4938: 73 8a d8 fe 00 00 00 00      	stxb [r10 - 0x128], r8
   b4940: 7b 9a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r9
   b4948: 7b 5a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r5
   b4950: 7b 6a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r6
   b4958: 79 a6 d8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x328]
   b4960: 7b 6a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r6
   b4968: 79 a6 a8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x358]
   b4970: 7b 6a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r6
   b4978: 79 a6 b0 fc 00 00 00 00      	ldxdw r6, [r10 - 0x350]
   b4980: 73 6a aa fe 00 00 00 00      	stxb [r10 - 0x156], r6
   b4988: 79 a6 b8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x348]
   b4990: 73 6a a9 fe 00 00 00 00      	stxb [r10 - 0x157], r6
   b4998: 79 a6 c0 fc 00 00 00 00      	ldxdw r6, [r10 - 0x340]
   b49a0: 73 6a a8 fe 00 00 00 00      	stxb [r10 - 0x158], r6
   b49a8: 79 a6 c8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x338]
   b49b0: 7b 6a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r6
   b49b8: 79 a6 a0 fc 00 00 00 00      	ldxdw r6, [r10 - 0x360]
   b49c0: 7b 6a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r6
   b49c8: 79 a6 88 fc 00 00 00 00      	ldxdw r6, [r10 - 0x378]
   b49d0: 7b 6a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r6
   b49d8: 79 a6 98 fc 00 00 00 00      	ldxdw r6, [r10 - 0x368]
   b49e0: 7b 6a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r6
   b49e8: 79 a6 90 fc 00 00 00 00      	ldxdw r6, [r10 - 0x370]
   b49f0: 7b 6a 80 fe 00 00 00 00      	stxdw [r10 - 0x180], r6
   b49f8: 73 0a 7a fe 00 00 00 00      	stxb [r10 - 0x186], r0
   b4a00: 73 4a 79 fe 00 00 00 00      	stxb [r10 - 0x187], r4
   b4a08: 73 3a 78 fe 00 00 00 00      	stxb [r10 - 0x188], r3
   b4a10: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   b4a18: 79 a1 60 fc 00 00 00 00      	ldxdw r1, [r10 - 0x3a0]
   b4a20: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   b4a28: 7b 7a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r7
   b4a30: 7b 2a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r2
   b4a38: 79 a1 78 fc 00 00 00 00      	ldxdw r1, [r10 - 0x388]
   b4a40: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   b4a48: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   b4a50: 7a 0a e0 fe 08 00 00 00      	stdw [r10 - 0x120], 0x8
   b4a58: 7a 0a 48 fe 00 00 00 00      	stdw [r10 - 0x1b8], 0x0
   b4a60: 7a 0a 40 fe 08 00 00 00      	stdw [r10 - 0x1c0], 0x8
   b4a68: 7a 0a 38 fe 00 00 00 00      	stdw [r10 - 0x1c8], 0x0
   b4a70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4a78: 07 01 00 00 58 fd ff ff      	add64 r1, -0x2a8
   b4a80: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b4a88: 07 02 00 00 38 fe ff ff      	add64 r2, -0x1c8
   b4a90: 79 a3 d0 fc 00 00 00 00      	ldxdw r3, [r10 - 0x330]
   b4a98: 85 10 00 00 be d2 01 00      	call 0x1d2be
   b4aa0: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   b4aa8: 79 a5 f0 fc 00 00 00 00      	ldxdw r5, [r10 - 0x310]
   b4ab0: 79 a7 e0 fc 00 00 00 00      	ldxdw r7, [r10 - 0x320]
   b4ab8: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <.text+0xb49b0>
   b4ac0: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   b4ac8: 05 00 3c 01 00 00 00 00      	ja +0x13c <.text+0xb5390>
   b4ad0: 79 53 08 00 00 00 00 00      	ldxdw r3, [r5 + 0x8]
   b4ad8: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   b4ae0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4ae8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4af0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb49e0>
   b4af8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4b00: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   b4b08: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   b4b10: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb4a00>
   b4b18: 05 00 26 fe 00 00 00 00      	ja -0x1da <.text+0xb3b30>
   b4b20: 79 56 10 00 00 00 00 00      	ldxdw r6, [r5 + 0x10]
   b4b28: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   b4b30: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4b38: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4b40: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4a30>
   b4b48: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4b50: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b4b58: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb4a48>
   b4b60: 05 00 1d fe 00 00 00 00      	ja -0x1e3 <.text+0xb3b30>
   b4b68: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   b4b70: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   b4b78: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
   b4b80: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   b4b88: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4b90: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4b98: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4a88>
   b4ba0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4ba8: 71 58 2a 00 00 00 00 00      	ldxb r8, [r5 + 0x2a]
   b4bb0: 7b 8a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r8
   b4bb8: 71 58 29 00 00 00 00 00      	ldxb r8, [r5 + 0x29]
   b4bc0: 7b 8a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r8
   b4bc8: 71 58 28 00 00 00 00 00      	ldxb r8, [r5 + 0x28]
   b4bd0: 7b 8a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r8
   b4bd8: 79 58 20 00 00 00 00 00      	ldxdw r8, [r5 + 0x20]
   b4be0: 7b 8a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r8
   b4be8: 79 58 18 00 00 00 00 00      	ldxdw r8, [r5 + 0x18]
   b4bf0: 79 95 00 00 00 00 00 00      	ldxdw r5, [r9 + 0x0]
   b4bf8: 7b 5a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r5
   b4c00: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   b4c08: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb4af8>
   b4c10: 05 00 07 fe 00 00 00 00      	ja -0x1f9 <.text+0xb3b30>
   b4c18: 79 95 10 00 00 00 00 00      	ldxdw r5, [r9 + 0x10]
   b4c20: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   b4c28: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   b4c30: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   b4c38: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0xb4b28>
   b4c40: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b4c48: 7b 8a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r8
   b4c50: 7b 6a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r6
   b4c58: 7b 0a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r0
   b4c60: 7b 3a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r3
   b4c68: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   b4c70: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0xb4b60>
   b4c78: 05 00 fa fd 00 00 00 00      	ja -0x206 <.text+0xb3b30>
   b4c80: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   b4c88: 7b 1a 90 fc 00 00 00 00      	stxdw [r10 - 0x370], r1
   b4c90: 79 97 20 00 00 00 00 00      	ldxdw r7, [r9 + 0x20]
   b4c98: 71 98 28 00 00 00 00 00      	ldxb r8, [r9 + 0x28]
   b4ca0: 71 90 29 00 00 00 00 00      	ldxb r0, [r9 + 0x29]
   b4ca8: 71 92 2a 00 00 00 00 00      	ldxb r2, [r9 + 0x2a]
   b4cb0: 79 a1 e0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x320]
   b4cb8: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   b4cc0: 79 66 58 00 00 00 00 00      	ldxdw r6, [r6 + 0x58]
   b4cc8: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   b4cd0: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   b4cd8: 7b 3a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r3
   b4ce0: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   b4ce8: 7b 3a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r3
   b4cf0: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   b4cf8: 7b 3a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r3
   b4d00: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   b4d08: 7b 3a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r3
   b4d10: 79 13 28 00 00 00 00 00      	ldxdw r3, [r1 + 0x28]
   b4d18: 71 31 00 00 00 00 00 00      	ldxb r1, [r3 + 0x0]
   b4d20: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4d28: 07 03 00 00 17 ff ff ff      	add64 r3, -0xe9
   b4d30: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   b4d38: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4d40: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   b4d48: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   b4d50: 18 03 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1b683a
   b4d60: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   b4d68: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4d70: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   b4d78: 7b 3a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r3
   b4d80: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   b4d88: 07 03 00 00 20 fe ff ff      	add64 r3, -0x1e0
   b4d90: 7b 3a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r3
   b4d98: 73 2a da fd 00 00 00 00      	stxb [r10 - 0x226], r2
   b4da0: 73 0a d9 fd 00 00 00 00      	stxb [r10 - 0x227], r0
   b4da8: 73 8a d8 fd 00 00 00 00      	stxb [r10 - 0x228], r8
   b4db0: 7b 7a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r7
   b4db8: 79 a2 90 fc 00 00 00 00      	ldxdw r2, [r10 - 0x370]
   b4dc0: 7b 2a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r2
   b4dc8: 7b 5a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r5
   b4dd0: 7b 4a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r4
   b4dd8: 79 a2 b8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x348]
   b4de0: 7b 2a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r2
   b4de8: 79 a2 c0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x340]
   b4df0: 73 2a aa fd 00 00 00 00      	stxb [r10 - 0x256], r2
   b4df8: 79 a2 c8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x338]
   b4e00: 73 2a a9 fd 00 00 00 00      	stxb [r10 - 0x257], r2
   b4e08: 79 a2 d0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x330]
   b4e10: 73 2a a8 fd 00 00 00 00      	stxb [r10 - 0x258], r2
   b4e18: 79 a2 d8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x328]
   b4e20: 7b 2a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r2
   b4e28: 79 a2 98 fc 00 00 00 00      	ldxdw r2, [r10 - 0x368]
   b4e30: 7b 2a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r2
   b4e38: 79 a2 a0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x360]
   b4e40: 7b 2a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r2
   b4e48: 79 a2 b0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x350]
   b4e50: 7b 2a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r2
   b4e58: 79 a2 a8 fc 00 00 00 00      	ldxdw r2, [r10 - 0x358]
   b4e60: 7b 2a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r2
   b4e68: 7b 1a d8 fc 00 00 00 00      	stxdw [r10 - 0x328], r1
   b4e70: 73 1a 17 ff 00 00 00 00      	stxb [r10 - 0xe9], r1
   b4e78: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   b4e80: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   b4e88: 7a 0a c8 ff 0d 00 00 00      	stdw [r10 - 0x38], 0xd
   b4e90: 7a 0a 28 fe 03 00 00 00      	stdw [r10 - 0x1d8], 0x3
   b4e98: 7a 0a e8 fd 01 00 00 00      	stdw [r10 - 0x218], 0x1
   b4ea0: 7a 0a 78 fd 00 00 00 00      	stdw [r10 - 0x288], 0x0
   b4ea8: 7a 0a 70 fd 08 00 00 00      	stdw [r10 - 0x290], 0x8
   b4eb0: 7a 0a 68 fd 00 00 00 00      	stdw [r10 - 0x298], 0x0
   b4eb8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b4ec0: 07 01 00 00 48 fd ff ff      	add64 r1, -0x2b8
   b4ec8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b4ed0: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   b4ed8: b7 03 00 00 a6 00 00 00      	mov64 r3, 0xa6
   b4ee0: 85 10 00 00 e9 d0 01 00      	call 0x1d0e9
   b4ee8: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   b4ef0: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xb4de0>
   b4ef8: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0xb4e38>
   b4f00: 79 a1 f0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x310]
   b4f08: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   b4f10: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   b4f18: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b4f20: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   b4f28: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb4e18>
   b4f30: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   b4f38: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   b4f40: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   b4f48: 55 03 03 00 01 00 00 00      	jne r3, 0x1, +0x3 <.text+0xb4e48>
   b4f50: 05 00 9f fd 00 00 00 00      	ja -0x261 <.text+0xb3b30>
   b4f58: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   b4f60: 05 00 a9 00 00 00 00 00      	ja +0xa9 <.text+0xb5390>
   b4f68: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   b4f70: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   b4f78: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b4f80: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b4f88: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb4e78>
   b4f90: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b4f98: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   b4fa0: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0xb4e90>
   b4fa8: 05 00 94 fd 00 00 00 00      	ja -0x26c <.text+0xb3b30>
   b4fb0: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
   b4fb8: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   b4fc0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   b4fc8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   b4fd0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0xb4ec0>
   b4fd8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   b4fe0: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   b4fe8: 7b 0a b0 fc 00 00 00 00      	stxdw [r10 - 0x350], r0
   b4ff0: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   b4ff8: 7b 0a b8 fc 00 00 00 00      	stxdw [r10 - 0x348], r0
   b5000: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   b5008: 7b 0a c0 fc 00 00 00 00      	stxdw [r10 - 0x340], r0
   b5010: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   b5018: 7b 0a c8 fc 00 00 00 00      	stxdw [r10 - 0x338], r0
   b5020: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   b5028: 7b 0a d0 fc 00 00 00 00      	stxdw [r10 - 0x330], r0
   b5030: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   b5038: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   b5040: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0xb4f30>
   b5048: 05 00 80 fd 00 00 00 00      	ja -0x280 <.text+0xb3b30>
   b5050: 79 92 10 00 00 00 00 00      	ldxdw r2, [r9 + 0x10]
   b5058: 79 25 00 00 00 00 00 00      	ldxdw r5, [r2 + 0x0]
   b5060: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   b5068: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   b5070: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0xb4f60>
   b5078: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0
   b5080: 7b 1a 98 fc 00 00 00 00      	stxdw [r10 - 0x368], r1
   b5088: 7b 8a a0 fc 00 00 00 00      	stxdw [r10 - 0x360], r8
   b5090: 7b 7a a8 fc 00 00 00 00      	stxdw [r10 - 0x358], r7
   b5098: 7b 52 00 00 00 00 00 00      	stxdw [r2 + 0x0], r5
   b50a0: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <.text+0xb4f90>
   b50a8: 05 00 74 fd 00 00 00 00      	ja -0x28c <.text+0xb3b30>
   b50b0: 79 95 18 00 00 00 00 00      	ldxdw r5, [r9 + 0x18]
   b50b8: 79 90 20 00 00 00 00 00      	ldxdw r0, [r9 + 0x20]
   b50c0: 71 97 28 00 00 00 00 00      	ldxb r7, [r9 + 0x28]
   b50c8: 71 98 29 00 00 00 00 00      	ldxb r8, [r9 + 0x29]
   b50d0: 71 99 2a 00 00 00 00 00      	ldxb r9, [r9 + 0x2a]
   b50d8: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   b50e0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   b50e8: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   b50f0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   b50f8: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   b5100: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   b5108: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   b5110: 7b 1a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r1
   b5118: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5120: 07 01 00 00 17 ff ff ff      	add64 r1, -0xe9
   b5128: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   b5130: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5138: 07 01 00 00 f0 fe ff ff      	add64 r1, -0x110
   b5140: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   b5148: 18 01 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b683a
   b5158: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   b5160: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5168: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   b5170: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   b5178: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5180: 07 01 00 00 20 fe ff ff      	add64 r1, -0x1e0
   b5188: 7b 1a e0 fd 00 00 00 00      	stxdw [r10 - 0x220], r1
   b5190: 73 9a da fd 00 00 00 00      	stxb [r10 - 0x226], r9
   b5198: 73 8a d9 fd 00 00 00 00      	stxb [r10 - 0x227], r8
   b51a0: 73 7a d8 fd 00 00 00 00      	stxb [r10 - 0x228], r7
   b51a8: 7b 0a d0 fd 00 00 00 00      	stxdw [r10 - 0x230], r0
   b51b0: 7b 5a c8 fd 00 00 00 00      	stxdw [r10 - 0x238], r5
   b51b8: 7b 2a c0 fd 00 00 00 00      	stxdw [r10 - 0x240], r2
   b51c0: 7b 4a b8 fd 00 00 00 00      	stxdw [r10 - 0x248], r4
   b51c8: 79 a1 b0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x350]
   b51d0: 7b 1a b0 fd 00 00 00 00      	stxdw [r10 - 0x250], r1
   b51d8: 79 a1 b8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x348]
   b51e0: 73 1a aa fd 00 00 00 00      	stxb [r10 - 0x256], r1
   b51e8: 79 a1 c0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x340]
   b51f0: 73 1a a9 fd 00 00 00 00      	stxb [r10 - 0x257], r1
   b51f8: 79 a1 c8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x338]
   b5200: 73 1a a8 fd 00 00 00 00      	stxb [r10 - 0x258], r1
   b5208: 79 a1 d0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x330]
   b5210: 7b 1a a0 fd 00 00 00 00      	stxdw [r10 - 0x260], r1
   b5218: 79 a1 98 fc 00 00 00 00      	ldxdw r1, [r10 - 0x368]
   b5220: 7b 1a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r1
   b5228: 7b 3a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r3
   b5230: 79 a1 a8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x358]
   b5238: 7b 1a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r1
   b5240: 79 a1 a0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x360]
   b5248: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   b5250: 79 a1 d8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x328]
   b5258: 73 1a 17 ff 00 00 00 00      	stxb [r10 - 0xe9], r1
   b5260: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   b5268: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   b5270: 7a 0a c8 ff 0d 00 00 00      	stdw [r10 - 0x38], 0xd
   b5278: 7a 0a 28 fe 03 00 00 00      	stdw [r10 - 0x1d8], 0x3
   b5280: 7a 0a e8 fd 01 00 00 00      	stdw [r10 - 0x218], 0x1
   b5288: 7a 0a 78 fd 00 00 00 00      	stdw [r10 - 0x288], 0x0
   b5290: 7a 0a 70 fd 08 00 00 00      	stdw [r10 - 0x290], 0x8
   b5298: 7a 0a 68 fd 00 00 00 00      	stdw [r10 - 0x298], 0x0
   b52a0: 79 a1 e0 fc 00 00 00 00      	ldxdw r1, [r10 - 0x320]
   b52a8: 79 11 30 00 00 00 00 00      	ldxdw r1, [r1 + 0x30]
   b52b0: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   b52b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b52c0: 07 01 00 00 38 fd ff ff      	add64 r1, -0x2c8
   b52c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b52d0: 07 02 00 00 68 fd ff ff      	add64 r2, -0x298
   b52d8: 85 10 00 00 dc d0 01 00      	call 0x1d0dc
   b52e0: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   b52e8: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xb51d8>
   b52f0: 05 00 36 00 00 00 00 00      	ja +0x36 <.text+0xb5388>
   b52f8: 79 a6 e8 fc 00 00 00 00      	ldxdw r6, [r10 - 0x318]
   b5300: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5308: 07 01 00 00 18 ff ff ff      	add64 r1, -0xe8
   b5310: 79 a2 f0 fc 00 00 00 00      	ldxdw r2, [r10 - 0x310]
   b5318: 85 10 00 00 e3 9d fe ff      	call -0x1621d
   b5320: 71 a1 bd ff 00 00 00 00      	ldxb r1, [r10 - 0x43]
   b5328: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0xb5218>
   b5330: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0xb5280>
   b5338: 79 a3 20 ff 00 00 00 00      	ldxdw r3, [r10 - 0xe0]
   b5340: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   b5348: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   b5350: 07 01 00 00 f8 fc ff ff      	add64 r1, -0x308
   b5358: 18 04 00 00 d8 73 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1b73d8
   b5368: b7 05 00 00 0d 00 00 00      	mov64 r5, 0xd
   b5370: 85 10 00 00 b7 9a fe ff      	call -0x16549
   b5378: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   b5380: 79 a2 00 fd 00 00 00 00      	ldxdw r2, [r10 - 0x300]
   b5388: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   b5390: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   b5398: 05 00 25 00 00 00 00 00      	ja +0x25 <.text+0xb53a8>
   b53a0: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   b53b0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   b53b8: bf 13 00 00 00 00 00 00      	mov64 r3, r1
   b53c0: 07 03 00 00 58 ff ff ff      	add64 r3, -0xa8
   b53c8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   b53d0: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   b53d8: 2d 13 01 00 00 00 00 00      	jgt r3, r1, +0x1 <.text+0xb52c8>
   b53e0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   b53e8: 55 04 01 00 00 00 00 00      	jne r4, 0x0, +0x1 <.text+0xb52d8>
   b53f0: bf 32 00 00 00 00 00 00      	mov64 r2, r3
   b53f8: 18 07 00 00 58 7f 00 00 00 00 00 00 03 00 00 00      	lddw r7, 0x300007f58
   b5408: 15 01 02 00 00 00 00 00      	jeq r1, 0x0, +0x2 <.text+0xb5300>
   b5410: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
   b5418: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   b5420: 18 01 00 00 07 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000007
   b5430: 2d 17 03 00 00 00 00 00      	jgt r7, r1, +0x3 <.text+0xb5330>
   b5438: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   b5440: b7 02 00 00 a8 00 00 00      	mov64 r2, 0xa8
   b5448: 85 10 00 00 ac eb 01 00      	call 0x1ebac
   b5450: 18 01 00 00 00 00 00 00 00 00 00 00 03 00 00 00      	lddw r1, 0x300000000
   b5460: 7b 71 00 00 00 00 00 00      	stxdw [r1 + 0x0], r7
   b5468: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   b5470: 07 02 00 00 18 ff ff ff      	add64 r2, -0xe8
   b5478: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   b5480: b7 03 00 00 a8 00 00 00      	mov64 r3, 0xa8
   b5488: 85 10 00 00 30 fc 01 00      	call 0x1fc30
   b5490: 7b 76 08 00 00 00 00 00      	stxdw [r6 + 0x8], r7
   b5498: 7a 06 00 00 02 00 00 00      	stdw [r6 + 0x0], 0x2
   b54a0: 05 00 04 00 00 00 00 00      	ja +0x4 <.text+0xb53a8>
   b54a8: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   b54b0: 79 a3 e8 fc 00 00 00 00      	ldxdw r3, [r10 - 0x318]
   b54b8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   b54c0: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
   b54c8: 95 00 00 00 00 00 00 00      	exit
