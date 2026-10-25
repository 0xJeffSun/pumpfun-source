0a0538: bf 34 00 00 00 00 00 00  mov64 r4, r3
0a0540: bf 16 00 00 00 00 00 00  mov64 r6, r1
0a0548: 79 21 40 00 00 00 00 00  ldxdw r1, [r2 + 0x40]
0a0550: bf 17 00 00 00 00 00 00  mov64 r7, r1
0a0558: 0f 47 00 00 00 00 00 00  add64 r7, r4
0a0560: b7 08 00 00 01 00 00 00  mov64 r8, 0x1
0a0568: ad 17 01 00 00 00 00 00  jlt r7, r1, +0x1 <.text+0xa0458> ; branch 0xa0578
0a0570: b7 08 00 00 00 00 00 00  mov64 r8, 0x0
0a0578: bf 71 00 00 00 00 00 00  mov64 r1, r7
0a0580: 4f 81 00 00 00 00 00 00  or64 r1, r8
0a0588: 15 01 13 00 00 00 00 00  jeq r1, 0x0, +0x13 <.text+0xa0508> ; branch 0xa0628
0a0590: 79 22 48 00 00 00 00 00  ldxdw r2, [r2 + 0x48]
0a0598: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a05a0: 07 01 00 00 e0 fe ff ff  add64 r1, -0x120
0a05a8: b7 09 00 00 00 00 00 00  mov64 r9, 0x0
0a05b0: b7 03 00 00 00 00 00 00  mov64 r3, 0x0
0a05b8: b7 05 00 00 00 00 00 00  mov64 r5, 0x0
0a05c0: 85 10 00 00 00 2a 02 00  call 0x22a00 ; direct target 0x1b55c8
0a05c8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a05d0: 07 01 00 00 d0 fe ff ff  add64 r1, -0x130
0a05d8: 79 a2 e0 fe 00 00 00 00  ldxdw r2, [r10 - 0x120]
0a05e0: 79 a3 e8 fe 00 00 00 00  ldxdw r3, [r10 - 0x118]
0a05e8: bf 74 00 00 00 00 00 00  mov64 r4, r7
0a05f0: bf 85 00 00 00 00 00 00  mov64 r5, r8
0a05f8: 85 10 00 00 51 27 02 00  call 0x22751 ; direct target 0x1b4088
0a0600: 79 a1 d8 fe 00 00 00 00  ldxdw r1, [r10 - 0x128]
0a0608: 7b 16 10 00 00 00 00 00  stxdw [r6 + 0x10], r1
0a0610: 79 a1 d0 fe 00 00 00 00  ldxdw r1, [r10 - 0x130]
0a0618: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
0a0620: 05 00 40 00 00 00 00 00  ja +0x40 <.text+0xa0708> ; branch 0xa0828
0a0628: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a0630: 07 01 00 00 90 ff ff ff  add64 r1, -0x70
0a0638: 18 02 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5f54
0a0648: 85 10 00 00 a6 6d 01 00  call 0x16da6 ; direct target 0x157380
0a0650: 7a 0a b8 ff 00 00 00 00  stdw [r10 - 0x48], 0x0
0a0658: 7a 0a b0 ff 01 00 00 00  stdw [r10 - 0x50], 0x1
0a0660: 7a 0a a8 ff 00 00 00 00  stdw [r10 - 0x58], 0x0
0a0668: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
0a0678: 7b 1a e8 ff 00 00 00 00  stxdw [r10 - 0x18], r1
0a0680: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a0688: 07 01 00 00 a8 ff ff ff  add64 r1, -0x58
0a0690: 7b 1a e0 ff 00 00 00 00  stxdw [r10 - 0x20], r1
0a0698: 72 0a f8 ff 03 00 00 00  stb [r10 - 0x8], 0x3
0a06a0: 7a 0a f0 ff 20 00 00 00  stdw [r10 - 0x10], 0x20
0a06a8: 7a 0a d0 ff 00 00 00 00  stdw [r10 - 0x30], 0x0
0a06b0: 7a 0a c0 ff 00 00 00 00  stdw [r10 - 0x40], 0x0
0a06b8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a06c0: 07 02 00 00 c0 ff ff ff  add64 r2, -0x40
0a06c8: 18 01 00 00 54 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5f54
0a06d8: 85 10 00 00 f5 7a 01 00  call 0x17af5 ; direct target 0x15de88
0a06e0: 15 00 0a 00 00 00 00 00  jeq r0, 0x0, +0xa <.text+0xa0618> ; branch 0xa0738
0a06e8: bf a3 00 00 00 00 00 00  mov64 r3, r10
0a06f0: 07 03 00 00 f0 fe ff ff  add64 r3, -0x110
0a06f8: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
0a0708: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
0a0710: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
0a0720: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
0a0730: 85 10 00 00 dc 18 02 00  call 0x218dc ; direct target 0x1ace18
0a0738: 79 a1 b8 ff 00 00 00 00  ldxdw r1, [r10 - 0x48]
0a0740: 7b 1a 38 ff 00 00 00 00  stxdw [r10 - 0xc8], r1
0a0748: 79 a1 b0 ff 00 00 00 00  ldxdw r1, [r10 - 0x50]
0a0750: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
0a0758: 79 a1 a8 ff 00 00 00 00  ldxdw r1, [r10 - 0x58]
0a0760: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
0a0768: 79 a1 90 ff 00 00 00 00  ldxdw r1, [r10 - 0x70]
0a0770: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
0a0778: 79 a1 98 ff 00 00 00 00  ldxdw r1, [r10 - 0x68]
0a0780: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
0a0788: 79 a1 a0 ff 00 00 00 00  ldxdw r1, [r10 - 0x60]
0a0790: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
0a0798: 18 01 00 00 c5 72 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b72c5
0a07a8: 7b 1a f8 fe 00 00 00 00  stxdw [r10 - 0x108], r1
0a07b0: 62 0a 88 ff 8a 17 00 00  stw [r10 - 0x78], 0x178a
0a07b8: 72 0a 40 ff 02 00 00 00  stb [r10 - 0xc0], 0x2
0a07c0: 62 0a 08 ff 96 09 00 00  stw [r10 - 0xf8], 0x996
0a07c8: 7a 0a 00 ff 18 00 00 00  stdw [r10 - 0x100], 0x18
0a07d0: 7a 0a f0 fe 00 00 00 00  stdw [r10 - 0x110], 0x0
0a07d8: bf a1 00 00 00 00 00 00  mov64 r1, r10
0a07e0: 07 01 00 00 c0 fe ff ff  add64 r1, -0x140
0a07e8: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a07f0: 07 02 00 00 f0 fe ff ff  add64 r2, -0x110
0a07f8: 85 10 00 00 66 f6 01 00  call 0x1f666 ; direct target 0x19bb30
0a0800: 79 a1 c0 fe 00 00 00 00  ldxdw r1, [r10 - 0x140]
0a0808: 79 a2 c8 fe 00 00 00 00  ldxdw r2, [r10 - 0x138]
0a0810: 7b 26 10 00 00 00 00 00  stxdw [r6 + 0x10], r2
0a0818: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
0a0820: b7 09 00 00 01 00 00 00  mov64 r9, 0x1
0a0828: 7b 96 00 00 00 00 00 00  stxdw [r6 + 0x0], r9
0a0830: 95 00 00 00 00 00 00 00  exit
