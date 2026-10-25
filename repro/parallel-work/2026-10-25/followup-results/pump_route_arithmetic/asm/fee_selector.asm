089ec8: bf 47 00 00 00 00 00 00  mov64 r7, r4
089ed0: bf 16 00 00 00 00 00 00  mov64 r6, r1
089ed8: 79 59 00 f0 00 00 00 00  ldxdw r9, [r5 - 0x1000]
089ee0: 25 09 22 00 cf 09 00 00  jgt r9, 0x9cf, +0x22 <.text+0x89ed8> ; branch 0x89ff8
089ee8: bf a1 00 00 00 00 00 00  mov64 r1, r10
089ef0: 07 01 00 00 90 ff ff ff  add64 r1, -0x70
089ef8: 18 02 00 00 5c 5f 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5f5c
089f08: 85 10 00 00 8e 9a 01 00  call 0x19a8e ; direct target 0x157380
089f10: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
089f18: 7a 0a b0 ff 01 00 00 00  stdw [r10 - 0x50], 0x1
089f20: 7a 0a a8 ff 00 00 00 00  stdw [r10 - 0x58], 0x0
089f28: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
089f38: 7b 1a e8 ff 00 00 00 00  stxdw [r10 - 0x18], r1
089f40: bf a1 00 00 00 00 00 00  mov64 r1, r10
089f48: 07 01 00 00 a8 ff ff ff  add64 r1, -0x58
089f50: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
089f58: 72 0a f8 ff 03 00 00 00  stb [r10 - 0x8], 0x3
089f60: 7a 0a f0 ff 20 00 00 00  stdw [r10 - 0x10], 0x20
089f68: 7a 0a d0 ff 00 00 00 00  stdw [r10 - 0x30], 0x0
089f70: 7a 0a c0 ff 00 00 00 00  stdw [r10 - 0x40], 0x0
089f78: bf a2 00 00 00 00 00 00  mov64 r2, r10
089f80: 07 02 00 00 c0 ff ff ff  add64 r2, -0x40
089f88: 18 01 00 00 5c 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5f5c
089f98: 85 10 00 00 dd a7 01 00  call 0x1a7dd ; direct target 0x15de88
089fa0: 15 00 49 00 00 00 00 00  jeq r0, 0x0, +0x49 <.text+0x8a0d0> ; branch 0x8a1f0
089fa8: bf a3 00 00 00 00 00 00  mov64 r3, r10
089fb0: 07 03 00 00 f0 fe ff ff  add64 r3, -0x110
089fb8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
089fc8: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
089fd0: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
089fe0: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
089ff0: 85 10 00 00 c4 45 02 00  call 0x245c4 ; direct target 0x1ace18
089ff8: 7b 2a a0 fe 00 00 00 00  stxdw [r10 - 0x160], r2
08a000: 79 51 10 f0 00 00 00 00  ldxdw r1, [r5 - 0xff0]
08a008: 7b 1a c0 fe 00 00 00 00  stxdw [r10 - 0x140], r1
08a010: 79 51 08 f0 00 00 00 00  ldxdw r1, [r5 - 0xff8]
08a018: 7b 1a b8 fe 00 00 00 00  stxdw [r10 - 0x148], r1
08a020: 7b 3a a8 fe 00 00 00 00  stxdw [r10 - 0x158], r3
08a028: bf 38 00 00 00 00 00 00  mov64 r8, r3
08a030: 07 08 00 00 20 00 00 00  add64 r8, 0x20
08a038: 79 51 18 f0 00 00 00 00  ldxdw r1, [r5 - 0xfe8]
08a040: 7b 1a b0 fe 00 00 00 00  stxdw [r10 - 0x150], r1
08a048: 7a 0a 08 ff 00 00 00 00  stdw [r10 - 0xf8], 0x0
08a050: 7a 0a 00 ff 00 00 00 00  stdw [r10 - 0x100], 0x0
08a058: 7a 0a f8 fe 00 00 00 00  stdw [r10 - 0x108], 0x0
08a060: 7a 0a f0 fe 00 00 00 00  stdw [r10 - 0x110], 0x0
08a068: bf a2 00 00 00 00 00 00  mov64 r2, r10
08a070: 07 02 00 00 f0 fe ff ff  add64 r2, -0x110
08a078: bf 81 00 00 00 00 00 00  mov64 r1, r8
08a080: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
08a088: 85 10 00 00 bd 52 02 00  call 0x252bd ; direct target 0x1b3678
08a090: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
08a098: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
08a0a0: 15 00 47 00 00 00 00 00  jeq r0, 0x0, +0x47 <.text+0x8a1c0> ; branch 0x8a2e0
08a0a8: bf 81 00 00 00 00 00 00  mov64 r1, r8
08a0b0: 18 02 00 00 c8 5c 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5cc8
08a0c0: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
08a0c8: 85 10 00 00 b5 52 02 00  call 0x252b5 ; direct target 0x1b3678
08a0d0: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
08a0d8: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
08a0e0: 15 00 3f 00 00 00 00 00  jeq r0, 0x0, +0x3f <.text+0x8a1c0> ; branch 0x8a2e0
08a0e8: bf 81 00 00 00 00 00 00  mov64 r1, r8
08a0f0: 18 02 00 00 88 5a 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5a88
08a100: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
08a108: 85 10 00 00 ad 52 02 00  call 0x252ad ; direct target 0x1b3678
08a110: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
08a118: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
08a120: 15 00 37 00 00 00 00 00  jeq r0, 0x0, +0x37 <.text+0x8a1c0> ; branch 0x8a2e0
08a128: 18 01 00 00 28 5d 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5d28
08a138: bf 82 00 00 00 00 00 00  mov64 r2, r8
08a140: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
08a148: 85 10 00 00 a5 52 02 00  call 0x252a5 ; direct target 0x1b3678
08a150: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
08a158: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
08a160: 15 00 72 00 00 00 00 00  jeq r0, 0x0, +0x72 <.text+0x8a3d8> ; branch 0x8a4f8
08a168: 25 09 01 00 00 10 00 00  jgt r9, 0x1000, +0x1 <.text+0x8a058> ; branch 0x8a178
08a170: 05 00 08 00 00 00 00 00  ja +0x8 <.text+0x8a098> ; branch 0x8a1b8
08a178: bf 71 00 00 00 00 00 00  mov64 r1, r7
08a180: 07 01 00 00 68 00 00 00  add64 r1, 0x68
08a188: 79 72 68 00 00 00 00 00  ldxdw r2, [r7 + 0x68]
08a190: 55 02 06 00 00 00 00 00  jne r2, 0x0, +0x6 <.text+0x8a0a8> ; branch 0x8a1c8
08a198: 79 72 70 00 00 00 00 00  ldxdw r2, [r7 + 0x70]
08a1a0: 55 02 04 00 00 00 00 00  jne r2, 0x0, +0x4 <.text+0x8a0a8> ; branch 0x8a1c8
08a1a8: 79 72 78 00 00 00 00 00  ldxdw r2, [r7 + 0x78]
08a1b0: 55 02 02 00 00 00 00 00  jne r2, 0x0, +0x2 <.text+0x8a0a8> ; branch 0x8a1c8
08a1b8: 07 07 00 00 50 00 00 00  add64 r7, 0x50
08a1c0: bf 71 00 00 00 00 00 00  mov64 r1, r7
08a1c8: 79 17 08 00 00 00 00 00  ldxdw r7, [r1 + 0x8]
08a1d0: 79 11 10 00 00 00 00 00  ldxdw r1, [r1 + 0x10]
08a1d8: 7b 1a e8 fe 00 00 00 00  stxdw [r10 - 0x118], r1
08a1e0: 7b 7a e0 fe 00 00 00 00  stxdw [r10 - 0x120], r7
08a1e8: 05 00 2f 00 00 00 00 00  ja +0x2f <.text+0x8a248> ; branch 0x8a368
08a1f0: 79 a1 b8 ff 00 00 00 00  ldxdw r1, [r10 - 0x48]
08a1f8: 7b 1a 38 ff 00 00 00 00  stxdw [r10 - 0xc8], r1
08a200: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
08a208: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
08a210: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
08a218: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
08a220: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
08a228: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
08a230: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
08a238: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
08a240: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
08a248: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
08a250: 18 01 00 00 82 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b7282
08a260: 7b 1a f8 fe 00 00 00 00  stxdw [r10 - 0x108], r1
08a268: 62 0a 88 ff d1 17 00 00  stw [r10 - 0x78], 0x17d1
08a270: 72 0a 40 ff 02 00 00 00  stb [r10 - 0xc0], 0x2
08a278: 62 0a 08 ff b7 00 00 00  stw [r10 - 0xf8], 0xb7
08a280: 7a 0a 00 ff 1d 00 00 00  stdw [r10 - 0x100], 0x1d
08a288: 7a 0a f0 fe 00 00 00 00  stdw [r10 - 0x110], 0x0
08a290: bf a1 00 00 00 00 00 00  mov64 r1, r10
08a298: 07 01 00 00 c8 fe ff ff  add64 r1, -0x138
08a2a0: bf a2 00 00 00 00 00 00  mov64 r2, r10
08a2a8: 07 02 00 00 f0 fe ff ff  add64 r2, -0x110
08a2b0: 85 10 00 00 0f 23 02 00  call 0x2230f ; direct target 0x19bb30
08a2b8: 79 a1 d0 fe 00 00 00 00  ldxdw r1, [r10 - 0x130]
08a2c0: 7b 1a e8 fe 00 00 00 00  stxdw [r10 - 0x118], r1
08a2c8: 79 a7 c8 fe 00 00 00 00  ldxdw r7, [r10 - 0x138]
08a2d0: 7b 7a e0 fe 00 00 00 00  stxdw [r10 - 0x120], r7
08a2d8: 05 00 0b 00 00 00 00 00  ja +0xb <.text+0x8a218> ; branch 0x8a338
08a2e0: 79 73 10 00 00 00 00 00  ldxdw r3, [r7 + 0x10]
08a2e8: 79 72 08 00 00 00 00 00  ldxdw r2, [r7 + 0x8]
08a2f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
08a2f8: 07 01 00 00 d8 fe ff ff  add64 r1, -0x128
08a300: 79 a4 b8 fe 00 00 00 00  ldxdw r4, [r10 - 0x148]
08a308: 79 a5 c0 fe 00 00 00 00  ldxdw r5, [r10 - 0x140]
08a310: 85 10 00 00 06 ff ff ff  call -0xfa ; direct target 0x89b48
08a318: 79 a7 e0 fe 00 00 00 00  ldxdw r7, [r10 - 0x120]
08a320: 79 a1 d8 fe 00 00 00 00  ldxdw r1, [r10 - 0x128]
08a328: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x8a218> ; branch 0x8a338
08a330: 05 00 06 00 00 00 00 00  ja +0x6 <.text+0x8a248> ; branch 0x8a368
08a338: 79 a1 e8 fe 00 00 00 00  ldxdw r1, [r10 - 0x118]
08a340: 7b 16 10 00 00 00 00 00  stxdw [r6 + 0x10], r1
08a348: 7b 76 08 00 00 00 00 00  stxdw [r6 + 0x8], r7
08a350: b7 09 00 00 01 00 00 00  mov64 r9, 0x1
08a358: 7b 96 00 00 00 00 00 00  stxdw [r6 + 0x0], r9
08a360: 95 00 00 00 00 00 00 00  exit
08a368: 79 a8 e8 fe 00 00 00 00  ldxdw r8, [r10 - 0x118]
08a370: 79 a1 a0 fe 00 00 00 00  ldxdw r1, [r10 - 0x160]
08a378: 71 11 36 04 00 00 00 00  ldxb r1, [r1 + 0x436]
08a380: 15 01 04 00 00 00 00 00  jeq r1, 0x0, +0x4 <.text+0x8a288> ; branch 0x8a3a8
08a388: 79 a1 a8 fe 00 00 00 00  ldxdw r1, [r10 - 0x158]
08a390: 79 11 68 00 00 00 00 00  ldxdw r1, [r1 + 0x68]
08a398: 15 01 01 00 00 00 00 00  jeq r1, 0x0, +0x1 <.text+0x8a288> ; branch 0x8a3a8
08a3a0: bf 18 00 00 00 00 00 00  mov64 r8, r1
08a3a8: bf a1 00 00 00 00 00 00  mov64 r1, r10
08a3b0: 07 01 00 00 f0 fe ff ff  add64 r1, -0x110
08a3b8: 79 a2 b0 fe 00 00 00 00  ldxdw r2, [r10 - 0x150]
08a3c0: bf 73 00 00 00 00 00 00  mov64 r3, r7
08a3c8: 85 10 00 00 78 fd ff ff  call -0x288 ; direct target 0x88f90
08a3d0: 79 a1 f0 fe 00 00 00 00  ldxdw r1, [r10 - 0x110]
08a3d8: 55 01 1f 00 02 00 00 00  jne r1, 0x2, +0x1f <.text+0x8a3b8> ; branch 0x8a4d8
08a3e0: 79 a1 f8 fe 00 00 00 00  ldxdw r1, [r10 - 0x108]
08a3e8: 7b 1a c0 fe 00 00 00 00  stxdw [r10 - 0x140], r1
08a3f0: 7a 0a 08 ff 00 00 00 00  stdw [r10 - 0xf8], 0x0
08a3f8: 7a 0a 00 ff 00 00 00 00  stdw [r10 - 0x100], 0x0
08a400: 7a 0a f8 fe 00 00 00 00  stdw [r10 - 0x108], 0x0
08a408: 7a 0a f0 fe 00 00 00 00  stdw [r10 - 0x110], 0x0
08a410: bf a2 00 00 00 00 00 00  mov64 r2, r10
08a418: 07 02 00 00 f0 fe ff ff  add64 r2, -0x110
08a420: 79 a1 a8 fe 00 00 00 00  ldxdw r1, [r10 - 0x158]
08a428: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
08a430: 85 10 00 00 48 52 02 00  call 0x25248 ; direct target 0x1b3678
08a438: b7 09 00 00 00 00 00 00  mov64 r9, 0x0
08a440: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
08a448: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
08a450: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
08a458: 15 00 09 00 00 00 00 00  jeq r0, 0x0, +0x9 <.text+0x8a388> ; branch 0x8a4a8
08a460: bf a1 00 00 00 00 00 00  mov64 r1, r10
08a468: 07 01 00 00 f0 fe ff ff  add64 r1, -0x110
08a470: 79 a2 b0 fe 00 00 00 00  ldxdw r2, [r10 - 0x150]
08a478: bf 83 00 00 00 00 00 00  mov64 r3, r8
08a480: 85 10 00 00 61 fd ff ff  call -0x29f ; direct target 0x88f90
08a488: 79 a1 f0 fe 00 00 00 00  ldxdw r1, [r10 - 0x110]
08a490: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x8a380> ; branch 0x8a4a0
08a498: 05 00 07 00 00 00 00 00  ja +0x7 <.text+0x8a3b8> ; branch 0x8a4d8
08a4a0: 79 a1 f8 fe 00 00 00 00  ldxdw r1, [r10 - 0x108]
08a4a8: 7b 86 20 00 00 00 00 00  stxdw [r6 + 0x20], r8
08a4b0: 7b 76 18 00 00 00 00 00  stxdw [r6 + 0x18], r7
08a4b8: 7b 16 10 00 00 00 00 00  stxdw [r6 + 0x10], r1
08a4c0: 79 a1 c0 fe 00 00 00 00  ldxdw r1, [r10 - 0x140]
08a4c8: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
08a4d0: 05 00 d0 ff 00 00 00 00  ja -0x30 <.text+0x8a238> ; branch 0x8a358
08a4d8: 79 a2 f8 fe 00 00 00 00  ldxdw r2, [r10 - 0x108]
08a4e0: 7b 26 10 00 00 00 00 00  stxdw [r6 + 0x10], r2
08a4e8: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
08a4f0: 05 00 cb ff 00 00 00 00  ja -0x35 <.text+0x8a230> ; branch 0x8a350
08a4f8: 79 72 20 00 00 00 00 00  ldxdw r2, [r7 + 0x20]
08a500: 25 09 01 00 e8 0f 00 00  jgt r9, 0xfe8, +0x1 <.text+0x8a3f0> ; branch 0x8a510
08a508: b7 02 00 00 08 00 00 00  mov64 r2, 0x8
08a510: 79 73 28 00 00 00 00 00  ldxdw r3, [r7 + 0x28]
08a518: 25 09 ba ff e8 0f 00 00  jgt r9, 0xfe8, -0x46 <.text+0x8a1d0> ; branch 0x8a2f0
08a520: b7 03 00 00 00 00 00 00  mov64 r3, 0x0
08a528: 05 00 b8 ff 00 00 00 00  ja -0x48 <.text+0x8a1d0> ; branch 0x8a2f0
