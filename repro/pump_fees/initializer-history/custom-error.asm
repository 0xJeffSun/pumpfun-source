   46c58: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   46c60: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   46c68: 63 7a ec fe 00 00 00 00      	stxw [r10 - 0x114], r7
   46c70: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   46c78: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   46c80: bf a8 00 00 00 00 00 00      	mov64 r8, r10
   46c88: 07 08 00 00 ec fe ff ff      	add64 r8, -0x114
   46c90: bf 82 00 00 00 00 00 00      	mov64 r2, r8
   46c98: 85 10 00 00 9e fb ff ff      	call -0x462 ; target 0x44990
   46ca0: 7a 0a b8 ff 00 00 00 00      	stdw [r10 - 0x48], 0x0
   46ca8: 7a 0a b0 ff 01 00 00 00      	stdw [r10 - 0x50], 0x1
   46cb0: 7a 0a a8 ff 00 00 00 00      	stdw [r10 - 0x58], 0x0
   46cb8: 18 01 00 00 f8 87 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc87f8
   46cc8: 7b 1a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r1
   46cd0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   46cd8: 07 01 00 00 a8 ff ff ff      	add64 r1, -0x58
   46ce0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
   46ce8: 72 0a f8 ff 03 00 00 00      	stb [r10 - 0x8], 0x3
   46cf0: 7a 0a f0 ff 20 00 00 00      	stdw [r10 - 0x10], 0x20
   46cf8: 7a 0a d0 ff 00 00 00 00      	stdw [r10 - 0x30], 0x0
   46d00: 7a 0a c0 ff 00 00 00 00      	stdw [r10 - 0x40], 0x0
   46d08: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   46d10: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   46d18: bf 81 00 00 00 00 00 00      	mov64 r1, r8
   46d20: 85 10 00 00 25 00 00 00      	call 0x25 ; target 0x46e50
   46d28: 15 00 0a 00 00 00 00 00      	jeq r0, 0x0, +0xa <.text+0x46c60> ; branch 0x46d80
   46d30: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   46d38: 07 03 00 00 f0 fe ff ff      	add64 r3, -0x110
   46d40: 18 01 00 00 7d 38 0c 00 00 00 00 00 00 00 00 00      	lddw r1, 0xc387d ; data 'a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rus'
   46d50: b7 02 00 00 37 00 00 00      	mov64 r2, 0x37
   46d58: 18 04 00 00 28 88 0c 00 00 00 00 00 00 00 00 00      	lddw r4, 0xc8828
   46d68: 18 05 00 00 48 88 0c 00 00 00 00 00 00 00 00 00      	lddw r5, 0xc8848
   46d78: 85 10 00 00 18 eb 00 00      	call 0xeb18 ; target 0xbc640
   46d80: 79 a1 b8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x48]
   46d88: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   46d90: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
   46d98: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   46da0: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
   46da8: 7b 1a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r1
   46db0: 79 a1 90 ff 00 00 00 00      	ldxdw r1, [r10 - 0x70]
   46db8: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   46dc0: 79 a1 98 ff 00 00 00 00      	ldxdw r1, [r10 - 0x68]
   46dc8: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   46dd0: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
   46dd8: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   46de0: 07 07 00 00 70 17 00 00      	add64 r7, 0x1770
   46de8: 63 7a 88 ff 00 00 00 00      	stxw [r10 - 0x78], r7
   46df0: 72 0a 40 ff 02 00 00 00      	stb [r10 - 0xc0], 0x2
   46df8: 7a 0a f0 fe 02 00 00 00      	stdw [r10 - 0x110], 0x2
   46e00: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   46e08: 07 01 00 00 d8 fe ff ff      	add64 r1, -0x128
   46e10: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   46e18: 07 02 00 00 f0 fe ff ff      	add64 r2, -0x110
   46e20: 85 10 00 00 89 cc 00 00      	call 0xcc89 ; target 0xad270
   46e28: 79 a1 d8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x128]
   46e30: 79 a2 e0 fe 00 00 00 00      	ldxdw r2, [r10 - 0x120]
   46e38: 7b 26 08 00 00 00 00 00      	stxdw [r6 + 0x8], r2
   46e40: 7b 16 00 00 00 00 00 00      	stxdw [r6 + 0x0], r1
   46e48: 95 00 00 00 00 00 00 00      	exit
