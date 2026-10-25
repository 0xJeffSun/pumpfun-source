089b48: 55 03 23 00 00 00 00 00  jne r3, 0x0, +0x23 <.text+0x89b48> ; branch 0x89c68
089b50: bf 16 00 00 00 00 00 00  mov64 r6, r1
089b58: bf a1 00 00 00 00 00 00  mov64 r1, r10
089b60: 07 01 00 00 90 ff ff ff  add64 r1, -0x70
089b68: 18 02 00 00 30 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5e30
089b78: 85 10 00 00 00 9b 01 00  call 0x19b00 ; direct target 0x157380
089b80: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
089b88: 7a 0a b0 ff 01 00 00 00  stdw [r10 - 0x50], 0x1
089b90: 7a 0a a8 ff 00 00 00 00  stdw [r10 - 0x58], 0x0
089b98: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
089ba8: 7b 1a e8 ff 00 00 00 00  stxdw [r10 - 0x18], r1
089bb0: bf a1 00 00 00 00 00 00  mov64 r1, r10
089bb8: 07 01 00 00 a8 ff ff ff  add64 r1, -0x58
089bc0: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
089bc8: 72 0a f8 ff 03 00 00 00  stb [r10 - 0x8], 0x3
089bd0: 7a 0a f0 ff 20 00 00 00  stdw [r10 - 0x10], 0x20
089bd8: 7a 0a d0 ff 00 00 00 00  stdw [r10 - 0x30], 0x0
089be0: 7a 0a c0 ff 00 00 00 00  stdw [r10 - 0x40], 0x0
089be8: bf a2 00 00 00 00 00 00  mov64 r2, r10
089bf0: 07 02 00 00 c0 ff ff ff  add64 r2, -0x40
089bf8: 18 01 00 00 30 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5e30
089c08: 85 10 00 00 4f a8 01 00  call 0x1a84f ; direct target 0x15de88
089c10: 15 00 2d 00 00 00 00 00  jeq r0, 0x0, +0x2d <.text+0x89c60> ; branch 0x89d80
089c18: bf a3 00 00 00 00 00 00  mov64 r3, r10
089c20: 07 03 00 00 f0 fe ff ff  add64 r3, -0x110
089c28: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
089c38: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
089c40: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
089c50: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
089c60: 85 10 00 00 36 46 02 00  call 0x24636 ; direct target 0x1ace18
089c68: 79 27 00 00 00 00 00 00  ldxdw r7, [r2 + 0x0]
089c70: b7 06 00 00 01 00 00 00  mov64 r6, 0x1
089c78: b7 00 00 00 01 00 00 00  mov64 r0, 0x1
089c80: 2d 47 01 00 00 00 00 00  jgt r7, r4, +0x1 <.text+0x89b70> ; branch 0x89c90
089c88: b7 00 00 00 00 00 00 00  mov64 r0, 0x0
089c90: 79 27 08 00 00 00 00 00  ldxdw r7, [r2 + 0x8]
089c98: 2d 57 01 00 00 00 00 00  jgt r7, r5, +0x1 <.text+0x89b88> ; branch 0x89ca8
089ca0: b7 06 00 00 00 00 00 00  mov64 r6, 0x0
089ca8: 1d 57 01 00 00 00 00 00  jeq r7, r5, +0x1 <.text+0x89b98> ; branch 0x89cb8
089cb0: bf 60 00 00 00 00 00 00  mov64 r0, r6
089cb8: 57 00 00 00 01 00 00 00  and64 r0, 0x1
089cc0: 55 00 39 00 00 00 00 00  jne r0, 0x0, +0x39 <.text+0x89d70> ; branch 0x89e90
089cc8: 27 03 00 00 28 00 00 00  mul64 r3, 0x28
089cd0: 05 00 06 00 00 00 00 00  ja +0x6 <.text+0x89be8> ; branch 0x89d08
089cd8: 07 03 00 00 d8 ff ff ff  add64 r3, -0x28
089ce0: 57 00 00 00 01 00 00 00  and64 r0, 0x1
089ce8: 55 00 03 00 00 00 00 00  jne r0, 0x0, +0x3 <.text+0x89be8> ; branch 0x89d08
089cf0: bf 20 00 00 00 00 00 00  mov64 r0, r2
089cf8: 0f 30 00 00 00 00 00 00  add64 r0, r3
089d00: 05 00 2f 00 00 00 00 00  ja +0x2f <.text+0x89d60> ; branch 0x89e80
089d08: b7 00 00 00 00 00 00 00  mov64 r0, 0x0
089d10: 15 03 2d 00 00 00 00 00  jeq r3, 0x0, +0x2d <.text+0x89d60> ; branch 0x89e80
089d18: bf 27 00 00 00 00 00 00  mov64 r7, r2
089d20: 0f 37 00 00 00 00 00 00  add64 r7, r3
089d28: 79 78 d8 ff 00 00 00 00  ldxdw r8, [r7 - 0x28]
089d30: b7 06 00 00 01 00 00 00  mov64 r6, 0x1
089d38: b7 00 00 00 01 00 00 00  mov64 r0, 0x1
089d40: 2d 48 01 00 00 00 00 00  jgt r8, r4, +0x1 <.text+0x89c30> ; branch 0x89d50
089d48: b7 00 00 00 00 00 00 00  mov64 r0, 0x0
089d50: 79 77 e0 ff 00 00 00 00  ldxdw r7, [r7 - 0x20]
089d58: 2d 57 01 00 00 00 00 00  jgt r7, r5, +0x1 <.text+0x89c48> ; branch 0x89d68
089d60: b7 06 00 00 00 00 00 00  mov64 r6, 0x0
089d68: 1d 57 ed ff 00 00 00 00  jeq r7, r5, -0x13 <.text+0x89bb8> ; branch 0x89cd8
089d70: bf 60 00 00 00 00 00 00  mov64 r0, r6
089d78: 05 00 eb ff 00 00 00 00  ja -0x15 <.text+0x89bb8> ; branch 0x89cd8
089d80: 79 a1 b8 ff 00 00 00 00  ldxdw r1, [r10 - 0x48]
089d88: 7b 1a 38 ff 00 00 00 00  stxdw [r10 - 0xc8], r1
089d90: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
089d98: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
089da0: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
089da8: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
089db0: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
089db8: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
089dc0: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
089dc8: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
089dd0: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
089dd8: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
089de0: 18 01 00 00 82 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b7282
089df0: 7b 1a f8 fe 00 00 00 00  stxdw [r10 - 0x108], r1
089df8: 62 0a 88 ff d0 17 00 00  stw [r10 - 0x78], 0x17d0
089e00: 72 0a 40 ff 02 00 00 00  stb [r10 - 0xc0], 0x2
089e08: 62 0a 08 ff a2 00 00 00  stw [r10 - 0xf8], 0xa2
089e10: 7a 0a 00 ff 1d 00 00 00  stdw [r10 - 0x100], 0x1d
089e18: 7a 0a f0 fe 00 00 00 00  stdw [r10 - 0x110], 0x0
089e20: bf a1 00 00 00 00 00 00  mov64 r1, r10
089e28: 07 01 00 00 e0 fe ff ff  add64 r1, -0x120
089e30: bf a2 00 00 00 00 00 00  mov64 r2, r10
089e38: 07 02 00 00 f0 fe ff ff  add64 r2, -0x110
089e40: 85 10 00 00 9d 23 02 00  call 0x2239d ; direct target 0x19bb30
089e48: 79 a2 e0 fe 00 00 00 00  ldxdw r2, [r10 - 0x120]
089e50: 79 a3 e8 fe 00 00 00 00  ldxdw r3, [r10 - 0x118]
089e58: bf 61 00 00 00 00 00 00  mov64 r1, r6
089e60: 7b 31 10 00 00 00 00 00  stxdw [r1 + 0x10], r3
089e68: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
089e70: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
089e78: 05 00 07 00 00 00 00 00  ja +0x7 <.text+0x89d98> ; branch 0x89eb8
089e80: 15 00 01 00 00 00 00 00  jeq r0, 0x0, +0x1 <.text+0x89d70> ; branch 0x89e90
089e88: bf 02 00 00 00 00 00 00  mov64 r2, r0
089e90: 79 23 18 00 00 00 00 00  ldxdw r3, [r2 + 0x18]
089e98: 79 22 20 00 00 00 00 00  ldxdw r2, [r2 + 0x20]
089ea0: 7b 21 10 00 00 00 00 00  stxdw [r1 + 0x10], r2
089ea8: 7b 31 08 00 00 00 00 00  stxdw [r1 + 0x8], r3
089eb0: b7 02 00 00 00 00 00 00  mov64 r2, 0x0
089eb8: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
089ec0: 95 00 00 00 00 00 00 00  exit
