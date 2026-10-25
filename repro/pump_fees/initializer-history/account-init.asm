   49bd0: bf 28 00 00 00 00 00 00      	mov64 r8, r2
   49bd8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   49be0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   49be8: 79 17 00 00 00 00 00 00      	ldxdw r7, [r1 + 0x0]
   49bf0: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   49bf8: 85 10 00 00 a0 d1 00 00      	call 0xd1a0 ; target 0xb2900
   49c00: bf 09 00 00 00 00 00 00      	mov64 r9, r0
   49c08: 7b 7a 98 fd 00 00 00 00      	stxdw [r10 - 0x268], r7
   49c10: 7b 6a 90 fd 00 00 00 00      	stxdw [r10 - 0x270], r6
   49c18: 55 09 0f 00 00 00 00 00      	jne r9, 0x0, +0xf <.text+0x49b78> ; branch 0x49c98
   49c20: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   49c28: b7 02 00 00 d0 09 00 00      	mov64 r2, 0x9d0
   49c30: 85 10 00 00 cd ce 00 00      	call 0xcecd ; target 0xb12a0
   49c38: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   49c40: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   49c48: 79 19 08 00 00 00 00 00      	ldxdw r9, [r1 + 0x8]
   49c50: 79 92 00 00 00 00 00 00      	ldxdw r2, [r9 + 0x0]
   49c58: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   49c60: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   49c68: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x49b58> ; branch 0x49c78
   49c70: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   49c78: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   49c80: 7b 29 00 00 00 00 00 00      	stxdw [r9 + 0x0], r2
   49c88: 55 03 3d 00 01 00 00 00      	jne r3, 0x1, +0x3d <.text+0x49d58> ; branch 0x49e78
   49c90: 85 10 00 00 ff ff ff ff      	call -0x1 ; external abort
   49c98: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   49ca0: 79 11 00 00 00 00 00 00      	ldxdw r1, [r1 + 0x0]
   49ca8: bf 86 00 00 00 00 00 00      	mov64 r6, r8
   49cb0: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   49cb8: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   49cc0: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   49cc8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
   49cd0: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   49cd8: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   49ce0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   49ce8: 7b 1a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r1
   49cf0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   49cf8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   49d00: 79 77 00 00 00 00 00 00      	ldxdw r7, [r7 + 0x0]
   49d08: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   49d10: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   49d18: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   49d20: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   49d28: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   49d30: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   49d38: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   49d40: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   49d48: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   49d50: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   49d58: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   49d60: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   49d68: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
   49d70: 85 10 00 00 37 f1 00 00      	call 0xf137 ; target 0xc2730
   49d78: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
   49d80: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
   49d88: 15 00 ce 00 00 00 00 00      	jeq r0, 0x0, +0xce <.text+0x4a2e0> ; branch 0x4a400
   49d90: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   49d98: b7 02 00 00 d0 09 00 00      	mov64 r2, 0x9d0
   49da0: 85 10 00 00 9f ce 00 00      	call 0xce9f ; target 0xb12a0
   49da8: bf 67 00 00 00 00 00 00      	mov64 r7, r6
   49db0: 25 00 01 00 01 00 00 00      	jgt r0, 0x1, +0x1 <.text+0x49ca0> ; branch 0x49dc0
   49db8: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   49dc0: 79 a5 98 fd 00 00 00 00      	ldxdw r5, [r10 - 0x268]
   49dc8: 7b 7a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r7
   49dd0: 2d 90 01 00 00 00 00 00      	jgt r0, r9, +0x1 <.text+0x49cc0> ; branch 0x49de0
   49dd8: 05 00 a9 01 00 00 00 00      	ja +0x1a9 <.text+0x4aa08> ; branch 0x4ab28
   49de0: bf 02 00 00 00 00 00 00      	mov64 r2, r0
   49de8: 1f 92 00 00 00 00 00 00      	sub64 r2, r9
   49df0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
   49df8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   49e00: 2d 02 01 00 00 00 00 00      	jgt r2, r0, +0x1 <.text+0x49cf0> ; branch 0x49e10
   49e08: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   49e10: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   49e18: 55 03 01 00 00 00 00 00      	jne r3, 0x0, +0x1 <.text+0x49d08> ; branch 0x49e28
   49e20: bf 24 00 00 00 00 00 00      	mov64 r4, r2
   49e28: 79 a0 80 fd 00 00 00 00      	ldxdw r0, [r10 - 0x280]
   49e30: 79 03 08 00 00 00 00 00      	ldxdw r3, [r0 + 0x8]
   49e38: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   49e40: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   49e48: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x49d38> ; branch 0x49e58
   49e50: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
   49e58: 79 08 00 00 00 00 00 00      	ldxdw r8, [r0 + 0x0]
   49e60: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   49e68: 55 01 0d 01 01 00 00 00      	jne r1, 0x1, +0x10d <.text+0x4a5b8> ; branch 0x4a6d8
   49e70: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x49b70> ; branch 0x49c90
   49e78: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   49e80: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   49e88: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   49e90: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   49e98: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x49d88> ; branch 0x49ea8
   49ea0: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   49ea8: 7b 0a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r0
   49eb0: 7b 5a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r5
   49eb8: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   49ec0: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x49db0> ; branch 0x49ed0
   49ec8: 05 00 b8 ff 00 00 00 00      	ja -0x48 <.text+0x49b70> ; branch 0x49c90
   49ed0: 79 70 08 00 00 00 00 00      	ldxdw r0, [r7 + 0x8]
   49ed8: 79 02 00 00 00 00 00 00      	ldxdw r2, [r0 + 0x0]
   49ee0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   49ee8: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   49ef0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x49de0> ; branch 0x49f00
   49ef8: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   49f00: 79 74 00 00 00 00 00 00      	ldxdw r4, [r7 + 0x0]
   49f08: 7b 4a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r4
   49f10: 71 14 2a 00 00 00 00 00      	ldxb r4, [r1 + 0x2a]
   49f18: 7b 4a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r4
   49f20: 71 14 29 00 00 00 00 00      	ldxb r4, [r1 + 0x29]
   49f28: 7b 4a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r4
   49f30: 71 14 28 00 00 00 00 00      	ldxb r4, [r1 + 0x28]
   49f38: 7b 4a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r4
   49f40: 79 14 20 00 00 00 00 00      	ldxdw r4, [r1 + 0x20]
   49f48: 7b 4a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r4
   49f50: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   49f58: 7b 1a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r1
   49f60: 7b 20 00 00 00 00 00 00      	stxdw [r0 + 0x0], r2
   49f68: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x49e58> ; branch 0x49f78
   49f70: 05 00 a3 ff 00 00 00 00      	ja -0x5d <.text+0x49b70> ; branch 0x49c90
   49f78: 79 77 10 00 00 00 00 00      	ldxdw r7, [r7 + 0x10]
   49f80: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   49f88: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   49f90: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   49f98: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x49e88> ; branch 0x49fa8
   49fa0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   49fa8: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   49fb0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x49ea0> ; branch 0x49fc0
   49fb8: 05 00 9a ff 00 00 00 00      	ja -0x66 <.text+0x49b70> ; branch 0x49c90
   49fc0: 7b 3a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r3
   49fc8: 7b 8a 88 fd 00 00 00 00      	stxdw [r10 - 0x278], r8
   49fd0: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   49fd8: 79 16 00 00 00 00 00 00      	ldxdw r6, [r1 + 0x0]
   49fe0: 79 68 08 00 00 00 00 00      	ldxdw r8, [r6 + 0x8]
   49fe8: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   49ff0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   49ff8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4a000: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x49ef0> ; branch 0x4a010
   4a008: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4a010: 79 a3 98 fd 00 00 00 00      	ldxdw r3, [r10 - 0x268]
   4a018: 71 34 2a 00 00 00 00 00      	ldxb r4, [r3 + 0x2a]
   4a020: 7b 4a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r4
   4a028: 71 34 29 00 00 00 00 00      	ldxb r4, [r3 + 0x29]
   4a030: 7b 4a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r4
   4a038: 71 34 28 00 00 00 00 00      	ldxb r4, [r3 + 0x28]
   4a040: 7b 4a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r4
   4a048: 79 34 20 00 00 00 00 00      	ldxdw r4, [r3 + 0x20]
   4a050: 7b 4a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r4
   4a058: 79 34 18 00 00 00 00 00      	ldxdw r4, [r3 + 0x18]
   4a060: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   4a068: 7b 18 00 00 00 00 00 00      	stxdw [r8 + 0x0], r1
   4a070: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x49f60> ; branch 0x4a080
   4a078: 05 00 82 ff 00 00 00 00      	ja -0x7e <.text+0x49b70> ; branch 0x49c90
   4a080: 7b 3a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r3
   4a088: 79 65 10 00 00 00 00 00      	ldxdw r5, [r6 + 0x10]
   4a090: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   4a098: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a0a0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4a0a8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x49f98> ; branch 0x4a0b8
   4a0b0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4a0b8: 7b 9a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r9
   4a0c0: 79 a3 80 fd 00 00 00 00      	ldxdw r3, [r10 - 0x280]
   4a0c8: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   4a0d0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x49fc0> ; branch 0x4a0e0
   4a0d8: 05 00 76 ff 00 00 00 00      	ja -0x8a <.text+0x49b70> ; branch 0x49c90
   4a0e0: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4a0e8: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   4a0f0: 79 61 20 00 00 00 00 00      	ldxdw r1, [r6 + 0x20]
   4a0f8: 7b 1a 00 fd 00 00 00 00      	stxdw [r10 - 0x300], r1
   4a100: 71 61 28 00 00 00 00 00      	ldxb r1, [r6 + 0x28]
   4a108: 7b 1a f8 fc 00 00 00 00      	stxdw [r10 - 0x308], r1
   4a110: 71 69 29 00 00 00 00 00      	ldxb r9, [r6 + 0x29]
   4a118: 71 66 2a 00 00 00 00 00      	ldxb r6, [r6 + 0x2a]
   4a120: 79 a2 88 fd 00 00 00 00      	ldxdw r2, [r10 - 0x278]
   4a128: 79 23 20 00 00 00 00 00      	ldxdw r3, [r2 + 0x20]
   4a130: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   4a138: 79 33 00 00 00 00 00 00      	ldxdw r3, [r3 + 0x0]
   4a140: 79 31 18 00 00 00 00 00      	ldxdw r1, [r3 + 0x18]
   4a148: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   4a150: 79 31 10 00 00 00 00 00      	ldxdw r1, [r3 + 0x10]
   4a158: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   4a160: 79 31 08 00 00 00 00 00      	ldxdw r1, [r3 + 0x8]
   4a168: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   4a170: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   4a178: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   4a180: 79 21 28 00 00 00 00 00      	ldxdw r1, [r2 + 0x28]
   4a188: 71 11 00 00 00 00 00 00      	ldxb r1, [r1 + 0x0]
   4a190: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4a198: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   4a1a0: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   4a1a8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4a1b0: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   4a1b8: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   4a1c0: 18 03 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r3, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   4a1d0: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   4a1d8: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   4a1e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a1e8: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   4a1f0: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   4a1f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a200: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   4a208: 7b 1a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r1
   4a210: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   4a218: 73 1a b2 fe 00 00 00 00      	stxb [r10 - 0x14e], r1
   4a220: 79 a1 28 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d8]
   4a228: 73 1a b1 fe 00 00 00 00      	stxb [r10 - 0x14f], r1
   4a230: 79 a1 30 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2d0]
   4a238: 73 1a b0 fe 00 00 00 00      	stxb [r10 - 0x150], r1
   4a240: 79 a1 38 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c8]
   4a248: 7b 1a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r1
   4a250: 7b 4a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r4
   4a258: 7b 7a 98 fe 00 00 00 00      	stxdw [r10 - 0x168], r7
   4a260: 7b 0a 90 fe 00 00 00 00      	stxdw [r10 - 0x170], r0
   4a268: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   4a270: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   4a278: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   4a280: 73 1a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r1
   4a288: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   4a290: 73 1a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r1
   4a298: 79 a1 60 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a0]
   4a2a0: 73 1a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r1
   4a2a8: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   4a2b0: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   4a2b8: 79 a1 70 fd 00 00 00 00      	ldxdw r1, [r10 - 0x290]
   4a2c0: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   4a2c8: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   4a2d0: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   4a2d8: 79 a1 18 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e8]
   4a2e0: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   4a2e8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   4a2f0: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4a2f8: 73 6a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r6
   4a300: 73 9a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r9
   4a308: 79 a1 f8 fc 00 00 00 00      	ldxdw r1, [r10 - 0x308]
   4a310: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   4a318: 79 a1 00 fd 00 00 00 00      	ldxdw r1, [r10 - 0x300]
   4a320: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4a328: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   4a330: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4a338: 7b 5a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r5
   4a340: 7b 8a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r8
   4a348: 79 a1 10 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f0]
   4a350: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4a358: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4a360: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4a368: 7a 0a c8 ff 0a 00 00 00      	stdw [r10 - 0x38], 0xa
   4a370: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4a378: 7a 0a c0 fe 01 00 00 00      	stdw [r10 - 0x140], 0x1
   4a380: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4a388: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4a390: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4a398: 79 21 30 00 00 00 00 00      	ldxdw r1, [r2 + 0x30]
   4a3a0: 79 15 00 00 00 00 00 00      	ldxdw r5, [r1 + 0x0]
   4a3a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a3b0: 07 01 00 00 b0 fd ff ff      	add64 r1, -0x250
   4a3b8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4a3c0: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4a3c8: 79 a3 80 fd 00 00 00 00      	ldxdw r3, [r10 - 0x280]
   4a3d0: b7 04 00 00 d0 09 00 00      	mov64 r4, 0x9d0
   4a3d8: 85 10 00 00 58 c9 00 00      	call 0xc958 ; target 0xaeea0
   4a3e0: 79 a1 b0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x250]
   4a3e8: 15 01 ec 01 02 00 00 00      	jeq r1, 0x2, +0x1ec <.text+0x4b230> ; branch 0x4b350
   4a3f0: 79 a2 b8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x248]
   4a3f8: 05 00 09 02 00 00 00 00      	ja +0x209 <.text+0x4b328> ; branch 0x4b448
   4a400: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a408: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   4a410: 18 02 00 00 40 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r2, 0xc3e40
   4a420: 85 10 00 00 1b ca 00 00      	call 0xca1b ; target 0xaf500
   4a428: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   4a430: 7a 0a a0 ff 01 00 00 00      	stdw [r10 - 0x60], 0x1
   4a438: 7a 0a 98 ff 00 00 00 00      	stdw [r10 - 0x68], 0x0
   4a440: 18 01 00 00 f8 87 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc87f8
   4a450: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   4a458: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a460: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   4a468: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   4a470: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   4a478: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   4a480: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   4a488: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   4a490: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4a498: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   4a4a0: 18 01 00 00 40 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc3e40
   4a4b0: 85 10 00 00 d1 cb 00 00      	call 0xcbd1 ; target 0xb0340
   4a4b8: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x4a3f0> ; branch 0x4a510
   4a4c0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4a4c8: 07 03 00 00 10 fe ff ff      	add64 r3, -0x1f0
   4a4d0: 18 01 00 00 7d 38 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc387d ; data 'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rus'
   4a4e0: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   4a4e8: 18 04 00 00 28 88 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc8828
   4a4f8: 18 05 00 00 48 88 0c 00 00 00 00 00 00 00 00 00      	lddw r5, 0xc8848
   4a508: 85 10 00 00 26 e4 00 00      	call 0xe426 ; target 0xbc640
   4a510: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   4a518: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4a520: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   4a528: 7b 1a 50 fe 00 00 00 00      	stxdw [r10 - 0x1b0], r1
   4a530: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   4a538: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4a540: 79 a1 c8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x138]
   4a548: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4a550: 79 a1 d0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x130]
   4a558: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4a560: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   4a568: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4a570: 18 01 00 00 59 4a 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc4a59 ; data 'programs/pump-fees/src/instructions/admin/initialize_fee_config.rsadminprograms/pump-fees/src/instructions/adm'
   4a580: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4a588: 62 0a a8 fe 05 10 00 00      	stw [r10 - 0x158], 0x1005
   4a590: 72 0a 60 fe 02 00 00 00      	stb [r10 - 0x1a0], 0x2
   4a598: 62 0a 28 fe 06 00 00 00      	stw [r10 - 0x1d8], 0x6
   4a5a0: 7a 0a 20 fe 42 00 00 00      	stdw [r10 - 0x1e0], 0x42
   4a5a8: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4a5b0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a5b8: 07 01 00 00 d0 fd ff ff      	add64 r1, -0x230
   4a5c0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4a5c8: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4a5d0: 85 10 00 00 93 c5 00 00      	call 0xc593 ; target 0xad270
   4a5d8: 79 a3 d8 fd 00 00 00 00      	ldxdw r3, [r10 - 0x228]
   4a5e0: 79 a2 d0 fd 00 00 00 00      	ldxdw r2, [r10 - 0x230]
   4a5e8: 79 81 18 00 00 00 00 00      	ldxdw r1, [r8 + 0x18]
   4a5f0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4a5f8: 79 81 10 00 00 00 00 00      	ldxdw r1, [r8 + 0x10]
   4a600: 7b 1a 20 fe 00 00 00 00      	stxdw [r10 - 0x1e0], r1
   4a608: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   4a610: 7b 1a 18 fe 00 00 00 00      	stxdw [r10 - 0x1e8], r1
   4a618: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   4a620: 7b 1a 10 fe 00 00 00 00      	stxdw [r10 - 0x1f0], r1
   4a628: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   4a630: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4a638: 79 71 08 00 00 00 00 00      	ldxdw r1, [r7 + 0x8]
   4a640: 7b 1a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r1
   4a648: 79 71 10 00 00 00 00 00      	ldxdw r1, [r7 + 0x10]
   4a650: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4a658: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   4a660: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4a668: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4a670: 07 01 00 00 c0 fd ff ff      	add64 r1, -0x240
   4a678: bf a4 00 00 00 00 00 00      	mov64 r4, r10
   4a680: 07 04 00 00 10 fe ff ff      	add64 r4, -0x1f0
   4a688: 85 10 00 00 bf c5 00 00      	call 0xc5bf ; target 0xad488
   4a690: 79 a1 c0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x240]
   4a698: 79 a2 c8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x238]
   4a6a0: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   4a6a8: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   4a6b0: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   4a6b8: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   4a6c8: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4a6d0: 05 00 b4 01 00 00 00 00      	ja +0x1b4 <.text+0x4b358> ; branch 0x4b478
   4a6d8: 79 09 10 00 00 00 00 00      	ldxdw r9, [r0 + 0x10]
   4a6e0: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
   4a6e8: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a6f0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4a6f8: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4a5e8> ; branch 0x4a708
   4a700: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4a708: 7b 4a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r4
   4a710: 7b 19 00 00 00 00 00 00      	stxdw [r9 + 0x0], r1
   4a718: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4a608> ; branch 0x4a728
   4a720: 05 00 ad fe 00 00 00 00      	ja -0x153 <.text+0x49b70> ; branch 0x49c90
   4a728: 79 56 08 00 00 00 00 00      	ldxdw r6, [r5 + 0x8]
   4a730: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4a738: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a740: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4a748: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4a638> ; branch 0x4a758
   4a750: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4a758: 79 54 00 00 00 00 00 00      	ldxdw r4, [r5 + 0x0]
   4a760: 7b 4a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r4
   4a768: 71 04 2a 00 00 00 00 00      	ldxb r4, [r0 + 0x2a]
   4a770: 7b 4a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r4
   4a778: 71 04 29 00 00 00 00 00      	ldxb r4, [r0 + 0x29]
   4a780: 7b 4a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r4
   4a788: 71 04 28 00 00 00 00 00      	ldxb r4, [r0 + 0x28]
   4a790: 7b 4a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r4
   4a798: 79 04 20 00 00 00 00 00      	ldxdw r4, [r0 + 0x20]
   4a7a0: 7b 4a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r4
   4a7a8: 79 00 18 00 00 00 00 00      	ldxdw r0, [r0 + 0x18]
   4a7b0: 7b 6a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r6
   4a7b8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   4a7c0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4a6b0> ; branch 0x4a7d0
   4a7c8: 05 00 98 fe 00 00 00 00      	ja -0x168 <.text+0x49b70> ; branch 0x49c90
   4a7d0: 79 56 10 00 00 00 00 00      	ldxdw r6, [r5 + 0x10]
   4a7d8: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4a7e0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a7e8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4a7f0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4a6e0> ; branch 0x4a800
   4a7f8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4a800: 7b 0a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r0
   4a808: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   4a810: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4a700> ; branch 0x4a820
   4a818: 05 00 8e fe 00 00 00 00      	ja -0x172 <.text+0x49b70> ; branch 0x49c90
   4a820: 7b 9a 30 fd 00 00 00 00      	stxdw [r10 - 0x2d0], r9
   4a828: 7b 8a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r8
   4a830: 7b 3a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r3
   4a838: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   4a840: 79 10 00 00 00 00 00 00      	ldxdw r0, [r1 + 0x0]
   4a848: 79 02 08 00 00 00 00 00      	ldxdw r2, [r0 + 0x8]
   4a850: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
   4a858: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a860: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4a868: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4a758> ; branch 0x4a878
   4a870: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4a878: 71 59 2a 00 00 00 00 00      	ldxb r9, [r5 + 0x2a]
   4a880: 71 57 29 00 00 00 00 00      	ldxb r7, [r5 + 0x29]
   4a888: 71 54 28 00 00 00 00 00      	ldxb r4, [r5 + 0x28]
   4a890: 7b 4a 28 fd 00 00 00 00      	stxdw [r10 - 0x2d8], r4
   4a898: 79 58 20 00 00 00 00 00      	ldxdw r8, [r5 + 0x20]
   4a8a0: 79 55 18 00 00 00 00 00      	ldxdw r5, [r5 + 0x18]
   4a8a8: 79 04 00 00 00 00 00 00      	ldxdw r4, [r0 + 0x0]
   4a8b0: 7b 12 00 00 00 00 00 00      	stxdw [r2 + 0x0], r1
   4a8b8: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x4a7a8> ; branch 0x4a8c8
   4a8c0: 05 00 79 fe 00 00 00 00      	ja -0x187 <.text+0x49b70> ; branch 0x49c90
   4a8c8: 7b 9a 10 fd 00 00 00 00      	stxdw [r10 - 0x2f0], r9
   4a8d0: 7b 7a 18 fd 00 00 00 00      	stxdw [r10 - 0x2e8], r7
   4a8d8: 7b 4a 20 fd 00 00 00 00      	stxdw [r10 - 0x2e0], r4
   4a8e0: 79 07 10 00 00 00 00 00      	ldxdw r7, [r0 + 0x10]
   4a8e8: 79 71 00 00 00 00 00 00      	ldxdw r1, [r7 + 0x0]
   4a8f0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4a8f8: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4a900: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4a7f0> ; branch 0x4a910
   4a908: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4a910: bf 89 00 00 00 00 00 00      	mov64 r9, r8
   4a918: 79 a4 78 fd 00 00 00 00      	ldxdw r4, [r10 - 0x288]
   4a920: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
   4a928: 55 03 01 00 01 00 00 00      	jne r3, 0x1, +0x1 <.text+0x4a818> ; branch 0x4a938
   4a930: 05 00 6b fe 00 00 00 00      	ja -0x195 <.text+0x49b70> ; branch 0x49c90
   4a938: 79 01 18 00 00 00 00 00      	ldxdw r1, [r0 + 0x18]
   4a940: 7b 1a 08 fd 00 00 00 00      	stxdw [r10 - 0x2f8], r1
   4a948: 79 01 20 00 00 00 00 00      	ldxdw r1, [r0 + 0x20]
   4a950: 71 03 28 00 00 00 00 00      	ldxb r3, [r0 + 0x28]
   4a958: 71 04 29 00 00 00 00 00      	ldxb r4, [r0 + 0x29]
   4a960: 71 00 2a 00 00 00 00 00      	ldxb r0, [r0 + 0x2a]
   4a968: 79 a8 10 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2f0]
   4a970: 73 8a 82 ff 00 00 00 00      	stxb [r10 - 0x7e], r8
   4a978: 79 a8 18 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2e8]
   4a980: 73 8a 81 ff 00 00 00 00      	stxb [r10 - 0x7f], r8
   4a988: 79 a8 28 fd 00 00 00 00      	ldxdw r8, [r10 - 0x2d8]
   4a990: 73 8a 80 ff 00 00 00 00      	stxb [r10 - 0x80], r8
   4a998: 7b 9a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r9
   4a9a0: 7b 5a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r5
   4a9a8: 7b 6a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r6
   4a9b0: 79 a6 80 fd 00 00 00 00      	ldxdw r6, [r10 - 0x280]
   4a9b8: 7b 6a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r6
   4a9c0: 79 a6 50 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2b0]
   4a9c8: 7b 6a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r6
   4a9d0: 79 a6 58 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2a8]
   4a9d8: 73 6a 52 ff 00 00 00 00      	stxb [r10 - 0xae], r6
   4a9e0: 79 a6 60 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2a0]
   4a9e8: 73 6a 51 ff 00 00 00 00      	stxb [r10 - 0xaf], r6
   4a9f0: 79 a6 68 fd 00 00 00 00      	ldxdw r6, [r10 - 0x298]
   4a9f8: 73 6a 50 ff 00 00 00 00      	stxb [r10 - 0xb0], r6
   4aa00: 79 a6 70 fd 00 00 00 00      	ldxdw r6, [r10 - 0x290]
   4aa08: 7b 6a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r6
   4aa10: 79 a6 48 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2b8]
   4aa18: 7b 6a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r6
   4aa20: 79 a6 30 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2d0]
   4aa28: 7b 6a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r6
   4aa30: 79 a6 40 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2c0]
   4aa38: 7b 6a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r6
   4aa40: 79 a6 38 fd 00 00 00 00      	ldxdw r6, [r10 - 0x2c8]
   4aa48: 7b 6a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r6
   4aa50: 73 0a 22 ff 00 00 00 00      	stxb [r10 - 0xde], r0
   4aa58: 73 4a 21 ff 00 00 00 00      	stxb [r10 - 0xdf], r4
   4aa60: 73 3a 20 ff 00 00 00 00      	stxb [r10 - 0xe0], r3
   4aa68: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   4aa70: 79 a1 08 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2f8]
   4aa78: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   4aa80: 7b 7a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r7
   4aa88: 7b 2a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r2
   4aa90: 79 a1 20 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2e0]
   4aa98: 7b 1a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r1
   4aaa0: 7a 0a 90 ff 00 00 00 00      	stdw [r10 - 0x70], 0x0
   4aaa8: 7a 0a 88 ff 08 00 00 00      	stdw [r10 - 0x78], 0x8
   4aab0: 7a 0a f0 fe 00 00 00 00      	stdw [r10 - 0x110], 0x0
   4aab8: 7a 0a e8 fe 08 00 00 00      	stdw [r10 - 0x118], 0x8
   4aac0: 7a 0a e0 fe 00 00 00 00      	stdw [r10 - 0x120], 0x0
   4aac8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4aad0: 07 01 00 00 00 fe ff ff      	add64 r1, -0x200
   4aad8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4aae0: 07 02 00 00 e0 fe ff ff      	add64 r2, -0x120
   4aae8: 79 a3 78 fd 00 00 00 00      	ldxdw r3, [r10 - 0x288]
   4aaf0: 85 10 00 00 dd c8 00 00      	call 0xc8dd ; target 0xaf1e0
   4aaf8: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   4ab00: 79 a5 98 fd 00 00 00 00      	ldxdw r5, [r10 - 0x268]
   4ab08: 79 a7 88 fd 00 00 00 00      	ldxdw r7, [r10 - 0x278]
   4ab10: 15 01 02 00 02 00 00 00      	jeq r1, 0x2, +0x2 <.text+0x4aa08> ; branch 0x4ab28
   4ab18: 79 a2 08 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1f8]
   4ab20: 05 00 24 01 00 00 00 00      	ja +0x124 <.text+0x4b328> ; branch 0x4b448
   4ab28: 79 53 08 00 00 00 00 00      	ldxdw r3, [r5 + 0x8]
   4ab30: 79 31 00 00 00 00 00 00      	ldxdw r1, [r3 + 0x0]
   4ab38: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ab40: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ab48: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4aa38> ; branch 0x4ab58
   4ab50: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4ab58: 79 50 00 00 00 00 00 00      	ldxdw r0, [r5 + 0x0]
   4ab60: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4ab68: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4aa58> ; branch 0x4ab78
   4ab70: 05 00 23 fe 00 00 00 00      	ja -0x1dd <.text+0x49b70> ; branch 0x49c90
   4ab78: 79 56 10 00 00 00 00 00      	ldxdw r6, [r5 + 0x10]
   4ab80: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4ab88: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ab90: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ab98: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4aa88> ; branch 0x4aba8
   4aba0: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4aba8: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   4abb0: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4aaa0> ; branch 0x4abc0
   4abb8: 05 00 1a fe 00 00 00 00      	ja -0x1e6 <.text+0x49b70> ; branch 0x49c90
   4abc0: 79 71 18 00 00 00 00 00      	ldxdw r1, [r7 + 0x18]
   4abc8: 79 19 00 00 00 00 00 00      	ldxdw r9, [r1 + 0x0]
   4abd0: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
   4abd8: 79 41 00 00 00 00 00 00      	ldxdw r1, [r4 + 0x0]
   4abe0: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4abe8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4abf0: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4aae0> ; branch 0x4ac00
   4abf8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4ac00: 71 58 2a 00 00 00 00 00      	ldxb r8, [r5 + 0x2a]
   4ac08: 7b 8a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r8
   4ac10: 71 58 29 00 00 00 00 00      	ldxb r8, [r5 + 0x29]
   4ac18: 7b 8a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r8
   4ac20: 71 58 28 00 00 00 00 00      	ldxb r8, [r5 + 0x28]
   4ac28: 7b 8a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r8
   4ac30: 79 58 20 00 00 00 00 00      	ldxdw r8, [r5 + 0x20]
   4ac38: 7b 8a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r8
   4ac40: 79 58 18 00 00 00 00 00      	ldxdw r8, [r5 + 0x18]
   4ac48: 79 95 00 00 00 00 00 00      	ldxdw r5, [r9 + 0x0]
   4ac50: 7b 5a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r5
   4ac58: 7b 14 00 00 00 00 00 00      	stxdw [r4 + 0x0], r1
   4ac60: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4ab50> ; branch 0x4ac70
   4ac68: 05 00 04 fe 00 00 00 00      	ja -0x1fc <.text+0x49b70> ; branch 0x49c90
   4ac70: 79 95 10 00 00 00 00 00      	ldxdw r5, [r9 + 0x10]
   4ac78: 79 51 00 00 00 00 00 00      	ldxdw r1, [r5 + 0x0]
   4ac80: 07 01 00 00 01 00 00 00      	add64 r1, 0x1
   4ac88: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
   4ac90: 15 01 01 00 00 00 00 00      	jeq r1, 0x0, +0x1 <.text+0x4ab80> ; branch 0x4aca0
   4ac98: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
   4aca0: 7b 8a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r8
   4aca8: 7b 6a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r6
   4acb0: 7b 0a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r0
   4acb8: 7b 3a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r3
   4acc0: 7b 15 00 00 00 00 00 00      	stxdw [r5 + 0x0], r1
   4acc8: 55 02 01 00 01 00 00 00      	jne r2, 0x1, +0x1 <.text+0x4abb8> ; branch 0x4acd8
   4acd0: 05 00 f7 fd 00 00 00 00      	ja -0x209 <.text+0x49b70> ; branch 0x49c90
   4acd8: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
   4ace0: 7b 1a 38 fd 00 00 00 00      	stxdw [r10 - 0x2c8], r1
   4ace8: 79 97 20 00 00 00 00 00      	ldxdw r7, [r9 + 0x20]
   4acf0: 71 98 28 00 00 00 00 00      	ldxb r8, [r9 + 0x28]
   4acf8: 71 90 29 00 00 00 00 00      	ldxb r0, [r9 + 0x29]
   4ad00: 71 92 2a 00 00 00 00 00      	ldxb r2, [r9 + 0x2a]
   4ad08: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   4ad10: 79 16 20 00 00 00 00 00      	ldxdw r6, [r1 + 0x20]
   4ad18: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   4ad20: 79 66 00 00 00 00 00 00      	ldxdw r6, [r6 + 0x0]
   4ad28: 79 63 18 00 00 00 00 00      	ldxdw r3, [r6 + 0x18]
   4ad30: 7b 3a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r3
   4ad38: 79 63 10 00 00 00 00 00      	ldxdw r3, [r6 + 0x10]
   4ad40: 7b 3a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r3
   4ad48: 79 63 08 00 00 00 00 00      	ldxdw r3, [r6 + 0x8]
   4ad50: 7b 3a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r3
   4ad58: 79 63 00 00 00 00 00 00      	ldxdw r3, [r6 + 0x0]
   4ad60: 7b 3a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r3
   4ad68: 79 13 28 00 00 00 00 00      	ldxdw r3, [r1 + 0x28]
   4ad70: 71 31 00 00 00 00 00 00      	ldxb r1, [r3 + 0x0]
   4ad78: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4ad80: 07 03 00 00 bf ff ff ff      	add64 r3, -0x41
   4ad88: 7b 3a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r3
   4ad90: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4ad98: 07 03 00 00 98 ff ff ff      	add64 r3, -0x68
   4ada0: 7b 3a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r3
   4ada8: 18 03 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r3, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   4adb8: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
   4adc0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4adc8: 07 03 00 00 c0 ff ff ff      	add64 r3, -0x40
   4add0: 7b 3a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r3
   4add8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   4ade0: 07 03 00 00 c8 fe ff ff      	add64 r3, -0x138
   4ade8: 7b 3a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r3
   4adf0: 73 2a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r2
   4adf8: 73 0a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r0
   4ae00: 73 8a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r8
   4ae08: 7b 7a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r7
   4ae10: 79 a2 38 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c8]
   4ae18: 7b 2a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r2
   4ae20: 7b 5a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r5
   4ae28: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   4ae30: 79 a2 60 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a0]
   4ae38: 7b 2a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r2
   4ae40: 79 a2 68 fd 00 00 00 00      	ldxdw r2, [r10 - 0x298]
   4ae48: 73 2a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r2
   4ae50: 79 a2 70 fd 00 00 00 00      	ldxdw r2, [r10 - 0x290]
   4ae58: 73 2a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r2
   4ae60: 79 a2 78 fd 00 00 00 00      	ldxdw r2, [r10 - 0x288]
   4ae68: 73 2a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r2
   4ae70: 79 a2 80 fd 00 00 00 00      	ldxdw r2, [r10 - 0x280]
   4ae78: 7b 2a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r2
   4ae80: 79 a2 40 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2c0]
   4ae88: 7b 2a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r2
   4ae90: 79 a2 48 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b8]
   4ae98: 7b 2a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r2
   4aea0: 79 a2 58 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2a8]
   4aea8: 7b 2a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r2
   4aeb0: 79 a2 50 fd 00 00 00 00      	ldxdw r2, [r10 - 0x2b0]
   4aeb8: 7b 2a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r2
   4aec0: 7b 1a 80 fd 00 00 00 00      	stxdw [r10 - 0x280], r1
   4aec8: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   4aed0: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4aed8: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4aee0: 7a 0a c8 ff 0a 00 00 00      	stdw [r10 - 0x38], 0xa
   4aee8: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4aef0: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   4aef8: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4af00: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4af08: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4af10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4af18: 07 01 00 00 f0 fd ff ff      	add64 r1, -0x210
   4af20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4af28: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4af30: b7 03 00 00 d0 09 00 00      	mov64 r3, 0x9d0
   4af38: 85 10 00 00 08 c7 00 00      	call 0xc708 ; target 0xae780
   4af40: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   4af48: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x4ae38> ; branch 0x4af58
   4af50: 05 00 0b 00 00 00 00 00      	ja +0xb <.text+0x4ae90> ; branch 0x4afb0
   4af58: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   4af60: 79 17 08 00 00 00 00 00      	ldxdw r7, [r1 + 0x8]
   4af68: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   4af70: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4af78: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   4af80: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x4ae70> ; branch 0x4af90
   4af88: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   4af90: 79 18 00 00 00 00 00 00      	ldxdw r8, [r1 + 0x0]
   4af98: 7b 27 00 00 00 00 00 00      	stxdw [r7 + 0x0], r2
   4afa0: 55 03 03 00 01 00 00 00      	jne r3, 0x1, +0x3 <.text+0x4aea0> ; branch 0x4afc0
   4afa8: 05 00 9c fd 00 00 00 00      	ja -0x264 <.text+0x49b70> ; branch 0x49c90
   4afb0: 79 a2 f8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x208]
   4afb8: 05 00 91 00 00 00 00 00      	ja +0x91 <.text+0x4b328> ; branch 0x4b448
   4afc0: 79 13 10 00 00 00 00 00      	ldxdw r3, [r1 + 0x10]
   4afc8: 79 32 00 00 00 00 00 00      	ldxdw r2, [r3 + 0x0]
   4afd0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4afd8: b7 04 00 00 01 00 00 00      	mov64 r4, 0x1
   4afe0: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x4aed0> ; branch 0x4aff0
   4afe8: b7 04 00 00 00 00 00 00      	mov64 r4, 0x0
   4aff0: 7b 23 00 00 00 00 00 00      	stxdw [r3 + 0x0], r2
   4aff8: 55 04 01 00 01 00 00 00      	jne r4, 0x1, +0x1 <.text+0x4aee8> ; branch 0x4b008
   4b000: 05 00 91 fd 00 00 00 00      	ja -0x26f <.text+0x49b70> ; branch 0x49c90
   4b008: 79 94 08 00 00 00 00 00      	ldxdw r4, [r9 + 0x8]
   4b010: 79 42 00 00 00 00 00 00      	ldxdw r2, [r4 + 0x0]
   4b018: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
   4b020: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
   4b028: 15 02 01 00 00 00 00 00      	jeq r2, 0x0, +0x1 <.text+0x4af18> ; branch 0x4b038
   4b030: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
   4b038: 79 90 00 00 00 00 00 00      	ldxdw r0, [r9 + 0x0]
   4b040: 7b 0a 58 fd 00 00 00 00      	stxdw [r10 - 0x2a8], r0
   4b048: 71 10 2a 00 00 00 00 00      	ldxb r0, [r1 + 0x2a]
   4b050: 7b 0a 60 fd 00 00 00 00      	stxdw [r10 - 0x2a0], r0
   4b058: 71 10 29 00 00 00 00 00      	ldxb r0, [r1 + 0x29]
   4b060: 7b 0a 68 fd 00 00 00 00      	stxdw [r10 - 0x298], r0
   4b068: 71 10 28 00 00 00 00 00      	ldxb r0, [r1 + 0x28]
   4b070: 7b 0a 70 fd 00 00 00 00      	stxdw [r10 - 0x290], r0
   4b078: 79 10 20 00 00 00 00 00      	ldxdw r0, [r1 + 0x20]
   4b080: 7b 0a 78 fd 00 00 00 00      	stxdw [r10 - 0x288], r0
   4b088: 79 11 18 00 00 00 00 00      	ldxdw r1, [r1 + 0x18]
   4b090: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
   4b098: 55 05 01 00 01 00 00 00      	jne r5, 0x1, +0x1 <.text+0x4af88> ; branch 0x4b0a8
   4b0a0: 05 00 7d fd 00 00 00 00      	ja -0x283 <.text+0x49b70> ; branch 0x49c90
   4b0a8: 79 92 10 00 00 00 00 00      	ldxdw r2, [r9 + 0x10]
   4b0b0: 79 25 00 00 00 00 00 00      	ldxdw r5, [r2 + 0x0]
   4b0b8: 07 05 00 00 01 00 00 00      	add64 r5, 0x1
   4b0c0: b7 00 00 00 01 00 00 00      	mov64 r0, 0x1
   4b0c8: 15 05 01 00 00 00 00 00      	jeq r5, 0x0, +0x1 <.text+0x4afb8> ; branch 0x4b0d8
   4b0d0: b7 00 00 00 00 00 00 00      	mov64 r0, 0x0
   4b0d8: 7b 1a 40 fd 00 00 00 00      	stxdw [r10 - 0x2c0], r1
   4b0e0: 7b 8a 48 fd 00 00 00 00      	stxdw [r10 - 0x2b8], r8
   4b0e8: 7b 7a 50 fd 00 00 00 00      	stxdw [r10 - 0x2b0], r7
   4b0f0: 7b 52 00 00 00 00 00 00      	stxdw [r2 + 0x0], r5
   4b0f8: 55 00 01 00 01 00 00 00      	jne r0, 0x1, +0x1 <.text+0x4afe8> ; branch 0x4b108
   4b100: 05 00 71 fd 00 00 00 00      	ja -0x28f <.text+0x49b70> ; branch 0x49c90
   4b108: 79 95 18 00 00 00 00 00      	ldxdw r5, [r9 + 0x18]
   4b110: 79 90 20 00 00 00 00 00      	ldxdw r0, [r9 + 0x20]
   4b118: 71 97 28 00 00 00 00 00      	ldxb r7, [r9 + 0x28]
   4b120: 71 98 29 00 00 00 00 00      	ldxb r8, [r9 + 0x29]
   4b128: 71 99 2a 00 00 00 00 00      	ldxb r9, [r9 + 0x2a]
   4b130: 79 61 18 00 00 00 00 00      	ldxdw r1, [r6 + 0x18]
   4b138: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
   4b140: 79 61 10 00 00 00 00 00      	ldxdw r1, [r6 + 0x10]
   4b148: 7b 1a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r1
   4b150: 79 61 08 00 00 00 00 00      	ldxdw r1, [r6 + 0x8]
   4b158: 7b 1a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r1
   4b160: 79 61 00 00 00 00 00 00      	ldxdw r1, [r6 + 0x0]
   4b168: 7b 1a 98 ff 00 00 00 00      	stxdw [r10 - 0x68], r1
   4b170: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b178: 07 01 00 00 bf ff ff ff      	add64 r1, -0x41
   4b180: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   4b188: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b190: 07 01 00 00 98 ff ff ff      	add64 r1, -0x68
   4b198: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   4b1a0: 18 01 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   4b1b0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   4b1b8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b1c0: 07 01 00 00 c0 ff ff ff      	add64 r1, -0x40
   4b1c8: 7b 1a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r1
   4b1d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b1d8: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   4b1e0: 7b 1a 88 fe 00 00 00 00      	stxdw [r10 - 0x178], r1
   4b1e8: 73 9a 82 fe 00 00 00 00      	stxb [r10 - 0x17e], r9
   4b1f0: 73 8a 81 fe 00 00 00 00      	stxb [r10 - 0x17f], r8
   4b1f8: 73 7a 80 fe 00 00 00 00      	stxb [r10 - 0x180], r7
   4b200: 7b 0a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r0
   4b208: 7b 5a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r5
   4b210: 7b 2a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r2
   4b218: 7b 4a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r4
   4b220: 79 a1 58 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a8]
   4b228: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   4b230: 79 a1 60 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2a0]
   4b238: 73 1a 52 fe 00 00 00 00      	stxb [r10 - 0x1ae], r1
   4b240: 79 a1 68 fd 00 00 00 00      	ldxdw r1, [r10 - 0x298]
   4b248: 73 1a 51 fe 00 00 00 00      	stxb [r10 - 0x1af], r1
   4b250: 79 a1 70 fd 00 00 00 00      	ldxdw r1, [r10 - 0x290]
   4b258: 73 1a 50 fe 00 00 00 00      	stxb [r10 - 0x1b0], r1
   4b260: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   4b268: 7b 1a 48 fe 00 00 00 00      	stxdw [r10 - 0x1b8], r1
   4b270: 79 a1 40 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2c0]
   4b278: 7b 1a 40 fe 00 00 00 00      	stxdw [r10 - 0x1c0], r1
   4b280: 7b 3a 38 fe 00 00 00 00      	stxdw [r10 - 0x1c8], r3
   4b288: 79 a1 50 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b0]
   4b290: 7b 1a 30 fe 00 00 00 00      	stxdw [r10 - 0x1d0], r1
   4b298: 79 a1 48 fd 00 00 00 00      	ldxdw r1, [r10 - 0x2b8]
   4b2a0: 7b 1a 28 fe 00 00 00 00      	stxdw [r10 - 0x1d8], r1
   4b2a8: 79 a1 80 fd 00 00 00 00      	ldxdw r1, [r10 - 0x280]
   4b2b0: 73 1a bf ff 00 00 00 00      	stxb [r10 - 0x41], r1
   4b2b8: 7a 0a e8 ff 01 00 00 00      	stdw [r10 - 0x18], 0x1
   4b2c0: 7a 0a d8 ff 20 00 00 00      	stdw [r10 - 0x28], 0x20
   4b2c8: 7a 0a c8 ff 0a 00 00 00      	stdw [r10 - 0x38], 0xa
   4b2d0: 7a 0a d0 fe 03 00 00 00      	stdw [r10 - 0x130], 0x3
   4b2d8: 7a 0a 90 fe 01 00 00 00      	stdw [r10 - 0x170], 0x1
   4b2e0: 7a 0a 20 fe 00 00 00 00      	stdw [r10 - 0x1e0], 0x0
   4b2e8: 7a 0a 18 fe 08 00 00 00      	stdw [r10 - 0x1e8], 0x8
   4b2f0: 7a 0a 10 fe 00 00 00 00      	stdw [r10 - 0x1f0], 0x0
   4b2f8: 79 a1 88 fd 00 00 00 00      	ldxdw r1, [r10 - 0x278]
   4b300: 79 11 30 00 00 00 00 00      	ldxdw r1, [r1 + 0x30]
   4b308: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
   4b310: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b318: 07 01 00 00 e0 fd ff ff      	add64 r1, -0x220
   4b320: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b328: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4b330: 85 10 00 00 fb c6 00 00      	call 0xc6fb ; target 0xaeb10
   4b338: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   4b340: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x4b230> ; branch 0x4b350
   4b348: 05 00 1e 00 00 00 00 00      	ja +0x1e <.text+0x4b320> ; branch 0x4b440
   4b350: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b358: 07 01 00 00 10 fe ff ff      	add64 r1, -0x1f0
   4b360: 79 a2 98 fd 00 00 00 00      	ldxdw r2, [r10 - 0x268]
   4b368: 85 10 00 00 8c 72 ff ff      	call -0x8d74 ; target 0x47d0
   4b370: 18 06 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r6, -0x8000000000000000
   4b380: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   4b388: 1d 61 01 00 00 00 00 00      	jeq r1, r6, +0x1 <.text+0x4b278> ; branch 0x4b398
   4b390: 05 00 0f 00 00 00 00 00      	ja +0xf <.text+0x4b2f0> ; branch 0x4b410
   4b398: 79 a3 20 fe 00 00 00 00      	ldxdw r3, [r10 - 0x1e0]
   4b3a0: 79 a2 18 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1e8]
   4b3a8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   4b3b0: 07 01 00 00 a0 fd ff ff      	add64 r1, -0x260
   4b3b8: 18 04 00 00 b8 3e 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc3eb8 ; data 'fee_config__event_authorityFee config account already has more than Fee config account already has the correct'
   4b3c8: b7 05 00 00 0a 00 00 00      	mov64 r5, 0xa
   4b3d0: 85 10 00 00 36 6c ff ff      	call -0x93ca ; target 0x1588
   4b3d8: 79 a1 a0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x260]
   4b3e0: 79 a2 a8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x258]
   4b3e8: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   4b3f0: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   4b3f8: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   4b400: 7b 63 00 00 00 00 00 00      	stxdw [r3 + 0x0], r6
   4b408: 05 00 0d 00 00 00 00 00      	ja +0xd <.text+0x4b358> ; branch 0x4b478
   4b410: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   4b418: 07 02 00 00 10 fe ff ff      	add64 r2, -0x1f0
   4b420: 79 a1 90 fd 00 00 00 00      	ldxdw r1, [r10 - 0x270]
   4b428: b7 03 00 00 90 00 00 00      	mov64 r3, 0x90
   4b430: 85 10 00 00 52 ee 00 00      	call 0xee52 ; target 0xc26c8
   4b438: 05 00 07 00 00 00 00 00      	ja +0x7 <.text+0x4b358> ; branch 0x4b478
   4b440: 79 a2 e8 fd 00 00 00 00      	ldxdw r2, [r10 - 0x218]
   4b448: 79 a3 90 fd 00 00 00 00      	ldxdw r3, [r10 - 0x270]
   4b450: 7b 13 08 00 00 00 00 00      	stxdw [r3 + 0x8], r1
   4b458: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
   4b468: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
   4b470: 7b 23 10 00 00 00 00 00      	stxdw [r3 + 0x10], r2
   4b478: 95 00 00 00 00 00 00 00      	exit
