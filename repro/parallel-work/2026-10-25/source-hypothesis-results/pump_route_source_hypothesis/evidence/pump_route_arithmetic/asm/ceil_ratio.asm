088908: bf 30 00 00 00 00 00 00  mov64 r0, r3
088910: bf 23 00 00 00 00 00 00  mov64 r3, r2
088918: bf 16 00 00 00 00 00 00  mov64 r6, r1
088920: 0f 42 00 00 00 00 00 00  add64 r2, r4
088928: b7 07 00 00 01 00 00 00  mov64 r7, 0x1
088930: b7 01 00 00 01 00 00 00  mov64 r1, 0x1
088938: ad 32 01 00 00 00 00 00  jlt r2, r3, +0x1 <.text+0x88828> ; branch 0x88948
088940: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
088948: bf 03 00 00 00 00 00 00  mov64 r3, r0
088950: 0f 53 00 00 00 00 00 00  add64 r3, r5
088958: 0f 13 00 00 00 00 00 00  add64 r3, r1
088960: ad 03 01 00 00 00 00 00  jlt r3, r0, +0x1 <.text+0x88850> ; branch 0x88970
088968: b7 07 00 00 00 00 00 00  mov64 r7, 0x0
088970: 1d 03 01 00 00 00 00 00  jeq r3, r0, +0x1 <.text+0x88860> ; branch 0x88980
088978: bf 71 00 00 00 00 00 00  mov64 r1, r7
088980: 57 01 00 00 01 00 00 00  and64 r1, 0x1
088988: 55 01 62 00 00 00 00 00  jne r1, 0x0, +0x62 <.text+0x88b80> ; branch 0x88ca0
088990: bf 21 00 00 00 00 00 00  mov64 r1, r2
088998: 4f 31 00 00 00 00 00 00  or64 r1, r3
0889a0: 15 01 11 00 00 00 00 00  jeq r1, 0x0, +0x11 <.text+0x88910> ; branch 0x88a30
0889a8: bf 41 00 00 00 00 00 00  mov64 r1, r4
0889b0: 4f 51 00 00 00 00 00 00  or64 r1, r5
0889b8: 15 01 43 00 00 00 00 00  jeq r1, 0x0, +0x43 <.text+0x88ab8> ; branch 0x88bd8
0889c0: b7 07 00 00 00 00 00 00  mov64 r7, 0x0
0889c8: b7 01 00 00 01 00 00 00  mov64 r1, 0x1
0889d0: 15 02 01 00 00 00 00 00  jeq r2, 0x0, +0x1 <.text+0x888c0> ; branch 0x889e0
0889d8: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
0889e0: 1f 13 00 00 00 00 00 00  sub64 r3, r1
0889e8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
0889f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
0889f8: 07 01 00 00 d8 fe ff ff  add64 r1, -0x128
088a00: 85 10 00 00 d0 56 02 00  call 0x256d0 ; direct target 0x1b4088
088a08: 79 a1 e0 fe 00 00 00 00  ldxdw r1, [r10 - 0x120]
088a10: 7b 16 10 00 00 00 00 00  stxdw [r6 + 0x10], r1
088a18: 79 a1 d8 fe 00 00 00 00  ldxdw r1, [r10 - 0x128]
088a20: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
088a28: 05 00 8e 00 00 00 00 00  ja +0x8e <.text+0x88d80> ; branch 0x88ea0
088a30: bf a1 00 00 00 00 00 00  mov64 r1, r10
088a38: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
088a40: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
088a50: 85 10 00 00 25 9d 01 00  call 0x19d25 ; direct target 0x157380
088a58: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
088a60: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
088a68: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
088a70: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
088a80: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
088a88: bf a1 00 00 00 00 00 00  mov64 r1, r10
088a90: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
088a98: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
088aa0: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
088aa8: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
088ab0: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
088ab8: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
088ac0: bf a2 00 00 00 00 00 00  mov64 r2, r10
088ac8: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
088ad0: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
088ae0: 85 10 00 00 74 aa 01 00  call 0x1aa74 ; direct target 0x15de88
088ae8: 15 00 01 00 00 00 00 00  jeq r0, 0x0, +0x1 <.text+0x889d8> ; branch 0x88af8
088af0: 05 00 4d 00 00 00 00 00  ja +0x4d <.text+0x88c40> ; branch 0x88d60
088af8: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
088b00: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
088b08: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
088b10: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
088b18: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
088b20: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
088b28: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
088b30: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
088b38: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
088b40: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
088b48: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
088b50: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
088b58: 18 01 00 00 82 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b7282
088b68: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
088b70: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
088b78: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
088b80: 62 0a 00 ff 11 00 00 00  stw [r10 - 0x100], 0x11
088b88: 7a 0a f8 fe 1d 00 00 00  stdw [r10 - 0x108], 0x1d
088b90: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
088b98: bf a1 00 00 00 00 00 00  mov64 r1, r10
088ba0: 07 01 00 00 b8 fe ff ff  add64 r1, -0x148
088ba8: bf a2 00 00 00 00 00 00  mov64 r2, r10
088bb0: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
088bb8: 85 10 00 00 ee 25 02 00  call 0x225ee ; direct target 0x19bb30
088bc0: 79 a1 b8 fe 00 00 00 00  ldxdw r1, [r10 - 0x148]
088bc8: 79 a2 c0 fe 00 00 00 00  ldxdw r2, [r10 - 0x140]
088bd0: 05 00 56 00 00 00 00 00  ja +0x56 <.text+0x88d68> ; branch 0x88e88
088bd8: bf a1 00 00 00 00 00 00  mov64 r1, r10
088be0: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
088be8: 18 02 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5f54
088bf8: 85 10 00 00 f0 9c 01 00  call 0x19cf0 ; direct target 0x157380
088c00: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
088c08: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
088c10: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
088c18: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
088c28: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
088c30: bf a1 00 00 00 00 00 00  mov64 r1, r10
088c38: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
088c40: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
088c48: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
088c50: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
088c58: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
088c60: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
088c68: bf a2 00 00 00 00 00 00  mov64 r2, r10
088c70: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
088c78: 18 01 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5f54
088c88: 85 10 00 00 3f aa 01 00  call 0x1aa3f ; direct target 0x15de88
088c90: 15 00 43 00 00 00 00 00  jeq r0, 0x0, +0x43 <.text+0x88d90> ; branch 0x88eb0
088c98: 05 00 18 00 00 00 00 00  ja +0x18 <.text+0x88c40> ; branch 0x88d60
088ca0: bf a1 00 00 00 00 00 00  mov64 r1, r10
088ca8: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
088cb0: 18 02 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5efc
088cc0: 85 10 00 00 d7 9c 01 00  call 0x19cd7 ; direct target 0x157380
088cc8: 7a 0a b0 ff 00 00 00 00  stdw [r10 - 0x50], 0x0
088cd0: 7a 0a a8 ff 01 00 00 00  stdw [r10 - 0x58], 0x1
088cd8: 7a 0a a0 ff 00 00 00 00  stdw [r10 - 0x60], 0x0
088ce0: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
088cf0: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
088cf8: bf a1 00 00 00 00 00 00  mov64 r1, r10
088d00: 07 01 00 00 a0 ff ff ff  add64 r1, -0x60
088d08: 7b 1a d8 ff 00 00 00 00  stxdw [r10 - 0x28], r1
088d10: 72 0a f0 ff 03 00 00 00  stb [r10 - 0x10], 0x3
088d18: 7a 0a e8 ff 20 00 00 00  stdw [r10 - 0x18], 0x20
088d20: 7a 0a c8 ff 00 00 00 00  stdw [r10 - 0x38], 0x0
088d28: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
088d30: bf a2 00 00 00 00 00 00  mov64 r2, r10
088d38: 07 02 00 00 b8 ff ff ff  add64 r2, -0x48
088d40: 18 01 00 00 fc 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5efc
088d50: 85 10 00 00 26 aa 01 00  call 0x1aa26 ; direct target 0x15de88
088d58: 15 00 0a 00 00 00 00 00  jeq r0, 0x0, +0xa <.text+0x88c90> ; branch 0x88db0
088d60: bf a3 00 00 00 00 00 00  mov64 r3, r10
088d68: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
088d70: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
088d80: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
088d88: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
088d98: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
088da8: 85 10 00 00 0d 48 02 00  call 0x2480d ; direct target 0x1ace18
088db0: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
088db8: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
088dc0: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
088dc8: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
088dd0: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
088dd8: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
088de0: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
088de8: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
088df0: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
088df8: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
088e00: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
088e08: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
088e10: 18 01 00 00 82 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b7282
088e20: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
088e28: 62 0a 80 ff 88 17 00 00  stw [r10 - 0x80], 0x1788
088e30: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
088e38: 62 0a 00 ff 0f 00 00 00  stw [r10 - 0x100], 0xf
088e40: 7a 0a f8 fe 1d 00 00 00  stdw [r10 - 0x108], 0x1d
088e48: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
088e50: bf a1 00 00 00 00 00 00  mov64 r1, r10
088e58: 07 01 00 00 a8 fe ff ff  add64 r1, -0x158
088e60: bf a2 00 00 00 00 00 00  mov64 r2, r10
088e68: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
088e70: 85 10 00 00 97 25 02 00  call 0x22597 ; direct target 0x19bb30
088e78: 79 a1 a8 fe 00 00 00 00  ldxdw r1, [r10 - 0x158]
088e80: 79 a2 b0 fe 00 00 00 00  ldxdw r2, [r10 - 0x150]
088e88: 7b 26 10 00 00 00 00 00  stxdw [r6 + 0x10], r2
088e90: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
088e98: b7 07 00 00 01 00 00 00  mov64 r7, 0x1
088ea0: 7b 76 00 00 00 00 00 00  stxdw [r6 + 0x0], r7
088ea8: 95 00 00 00 00 00 00 00  exit
088eb0: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
088eb8: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
088ec0: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
088ec8: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
088ed0: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
088ed8: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
088ee0: 79 a1 88 ff 00 00 00 00  ldxdw r1, [r10 - 0x78]
088ee8: 7b 1a 08 ff 00 00 00 00  stxdw [r10 - 0xf8], r1
088ef0: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
088ef8: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
088f00: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
088f08: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
088f10: 18 01 00 00 82 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b7282
088f20: 7b 1a f0 fe 00 00 00 00  stxdw [r10 - 0x110], r1
088f28: 62 0a 80 ff 8a 17 00 00  stw [r10 - 0x80], 0x178a
088f30: 72 0a 38 ff 02 00 00 00  stb [r10 - 0xc8], 0x2
088f38: 62 0a 00 ff 13 00 00 00  stw [r10 - 0x100], 0x13
088f40: 7a 0a f8 fe 1d 00 00 00  stdw [r10 - 0x108], 0x1d
088f48: 7a 0a e8 fe 00 00 00 00  stdw [r10 - 0x118], 0x0
088f50: bf a1 00 00 00 00 00 00  mov64 r1, r10
088f58: 07 01 00 00 c8 fe ff ff  add64 r1, -0x138
088f60: bf a2 00 00 00 00 00 00  mov64 r2, r10
088f68: 07 02 00 00 e8 fe ff ff  add64 r2, -0x118
088f70: 85 10 00 00 77 25 02 00  call 0x22577 ; direct target 0x19bb30
088f78: 79 a1 c8 fe 00 00 00 00  ldxdw r1, [r10 - 0x138]
088f80: 79 a2 d0 fe 00 00 00 00  ldxdw r2, [r10 - 0x130]
088f88: 05 00 df ff 00 00 00 00  ja -0x21 <.text+0x88d68> ; branch 0x88e88
