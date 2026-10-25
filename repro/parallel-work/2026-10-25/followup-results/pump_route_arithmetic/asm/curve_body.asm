05b3b0: bf 56 00 00 00 00 00 00  mov64 r6, r5
05b3b8: 7b 3a a8 f5 00 00 00 00  stxdw [r10 - 0xa58], r3
05b3c0: bf 18 00 00 00 00 00 00  mov64 r8, r1
05b3c8: 7b 4a c0 f5 00 00 00 00  stxdw [r10 - 0xa40], r4
05b3d0: 79 49 10 00 00 00 00 00  ldxdw r9, [r4 + 0x10]
05b3d8: bf 27 00 00 00 00 00 00  mov64 r7, r2
05b3e0: 07 07 00 00 50 00 00 00  add64 r7, 0x50
05b3e8: 7b 2a b8 f5 00 00 00 00  stxdw [r10 - 0xa48], r2
05b3f0: bf 24 00 00 00 00 00 00  mov64 r4, r2
05b3f8: 07 04 00 00 18 00 00 00  add64 r4, 0x18
05b400: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b408: 07 01 00 00 d8 f7 ff ff  add64 r1, -0x828
05b410: bf 92 00 00 00 00 00 00  mov64 r2, r9
05b418: bf 73 00 00 00 00 00 00  mov64 r3, r7
05b420: 7b 4a b0 f5 00 00 00 00  stxdw [r10 - 0xa50], r4
05b428: 85 10 00 00 24 c3 ff ff  call -0x3cdc ; direct target 0x3cd50
05b430: 79 a1 d8 f7 00 00 00 00  ldxdw r1, [r10 - 0x828]
05b438: 55 01 3c 00 02 00 00 00  jne r1, 0x2, +0x3c <.text+0x5b500> ; branch 0x5b620
05b440: 7b 8a a0 f5 00 00 00 00  stxdw [r10 - 0xa60], r8
05b448: 79 68 28 f0 00 00 00 00  ldxdw r8, [r6 - 0xfd8]
05b450: 7b 8a 90 f5 00 00 00 00  stxdw [r10 - 0xa70], r8
05b458: 57 08 00 00 02 00 00 00  and64 r8, 0x2
05b460: b7 04 00 00 01 00 00 00  mov64 r4, 0x1
05b468: 15 08 01 00 00 00 00 00  jeq r8, 0x0, +0x1 <.text+0x5b358> ; branch 0x5b478
05b470: b7 04 00 00 00 00 00 00  mov64 r4, 0x0
05b478: 79 61 20 f0 00 00 00 00  ldxdw r1, [r6 - 0xfe0]
05b480: 7b 1a 78 f5 00 00 00 00  stxdw [r10 - 0xa88], r1
05b488: 79 61 18 f0 00 00 00 00  ldxdw r1, [r6 - 0xfe8]
05b490: 7b 1a 80 f5 00 00 00 00  stxdw [r10 - 0xa80], r1
05b498: 79 61 10 f0 00 00 00 00  ldxdw r1, [r6 - 0xff0]
05b4a0: 7b 1a 88 f5 00 00 00 00  stxdw [r10 - 0xa78], r1
05b4a8: 79 61 08 f0 00 00 00 00  ldxdw r1, [r6 - 0xff8]
05b4b0: 7b 1a 98 f5 00 00 00 00  stxdw [r10 - 0xa68], r1
05b4b8: 79 66 00 f0 00 00 00 00  ldxdw r6, [r6 - 0x1000]
05b4c0: 71 93 a3 00 00 00 00 00  ldxb r3, [r9 + 0xa3]
05b4c8: 71 92 a1 00 00 00 00 00  ldxb r2, [r9 + 0xa1]
05b4d0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b4d8: 07 01 00 00 c8 f7 ff ff  add64 r1, -0x838
05b4e0: 85 10 00 00 79 45 00 00  call 0x4579 ; direct target 0x7e0b0
05b4e8: 79 a1 c8 f7 00 00 00 00  ldxdw r1, [r10 - 0x838]
05b4f0: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5b3e0> ; branch 0x5b500
05b4f8: 05 00 29 00 00 00 00 00  ja +0x29 <.text+0x5b528> ; branch 0x5b648
05b500: 71 91 a2 00 00 00 00 00  ldxb r1, [r9 + 0xa2]
05b508: 15 01 4c 00 00 00 00 00  jeq r1, 0x0, +0x4c <.text+0x5b650> ; branch 0x5b770
05b510: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b518: 07 01 00 00 68 fb ff ff  add64 r1, -0x498
05b520: 18 02 00 00 d8 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5ed8
05b530: 85 10 00 00 c9 f7 01 00  call 0x1f7c9 ; direct target 0x157380
05b538: 7a 0a d0 fc 00 00 00 00  stdw [r10 - 0x330], 0x0
05b540: 7a 0a c8 fc 01 00 00 00  stdw [r10 - 0x338], 0x1
05b548: 7a 0a c0 fc 00 00 00 00  stdw [r10 - 0x340], 0x0
05b550: 18 01 00 00 38 d8 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1bd838
05b560: 7b 1a c8 fd 00 00 00 00  stxdw [r10 - 0x238], r1
05b568: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b570: 07 01 00 00 c0 fc ff ff  add64 r1, -0x340
05b578: 7b 1a c0 fd 00 00 00 00  stxdw [r10 - 0x240], r1
05b580: 72 0a d8 fd 03 00 00 00  stb [r10 - 0x228], 0x3
05b588: 7a 0a d0 fd 20 00 00 00  stdw [r10 - 0x230], 0x20
05b590: 7a 0a b0 fd 00 00 00 00  stdw [r10 - 0x250], 0x0
05b598: 7a 0a a0 fd 00 00 00 00  stdw [r10 - 0x260], 0x0
05b5a0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05b5a8: 07 02 00 00 a0 fd ff ff  add64 r2, -0x260
05b5b0: 18 01 00 00 d8 5e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5ed8
05b5c0: 85 10 00 00 18 05 02 00  call 0x20518 ; direct target 0x15de88
05b5c8: 15 00 14 00 00 00 00 00  jeq r0, 0x0, +0x14 <.text+0x5b550> ; branch 0x5b670
05b5d0: bf a3 00 00 00 00 00 00  mov64 r3, r10
05b5d8: 07 03 00 00 30 f9 ff ff  add64 r3, -0x6d0
05b5e0: 18 01 00 00 a4 5f 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b5fa4
05b5f0: b7 02 00 00 37 00 00 00  mov64 r2, 0x37
05b5f8: 18 04 00 00 68 d8 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1bd868
05b608: 18 05 00 00 88 d8 1b 00 00 00 00 00 00 00 00 00  lddw r5, 0x1bd888
05b618: 85 10 00 00 ff a2 02 00  call 0x2a2ff ; direct target 0x1ace18
05b620: 79 a2 e0 f7 00 00 00 00  ldxdw r2, [r10 - 0x820]
05b628: 7b 18 00 00 00 00 00 00  stxdw [r8 + 0x0], r1
05b630: 7b 28 08 00 00 00 00 00  stxdw [r8 + 0x8], r2
05b638: 72 08 5a 00 02 00 00 00  stb [r8 + 0x5a], 0x2
05b640: 05 00 24 00 00 00 00 00  ja +0x24 <.text+0x5b648> ; branch 0x5b768
05b648: 79 a2 d0 f7 00 00 00 00  ldxdw r2, [r10 - 0x830]
05b650: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05b658: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05b660: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05b668: 05 00 1e 00 00 00 00 00  ja +0x1e <.text+0x5b640> ; branch 0x5b760
05b670: 79 a1 d0 fc 00 00 00 00  ldxdw r1, [r10 - 0x330]
05b678: 7b 1a 78 f9 00 00 00 00  stxdw [r10 - 0x688], r1
05b680: 79 a1 c8 fc 00 00 00 00  ldxdw r1, [r10 - 0x338]
05b688: 7b 1a 70 f9 00 00 00 00  stxdw [r10 - 0x690], r1
05b690: 79 a1 c0 fc 00 00 00 00  ldxdw r1, [r10 - 0x340]
05b698: 7b 1a 68 f9 00 00 00 00  stxdw [r10 - 0x698], r1
05b6a0: 79 a1 68 fb 00 00 00 00  ldxdw r1, [r10 - 0x498]
05b6a8: 7b 1a 50 f9 00 00 00 00  stxdw [r10 - 0x6b0], r1
05b6b0: 79 a1 70 fb 00 00 00 00  ldxdw r1, [r10 - 0x490]
05b6b8: 7b 1a 58 f9 00 00 00 00  stxdw [r10 - 0x6a8], r1
05b6c0: 79 a1 78 fb 00 00 00 00  ldxdw r1, [r10 - 0x488]
05b6c8: 7b 1a 60 f9 00 00 00 00  stxdw [r10 - 0x6a0], r1
05b6d0: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6e9f
05b6e0: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05b6e8: 62 0a c8 f9 dc 17 00 00  stw [r10 - 0x638], 0x17dc
05b6f0: 72 0a 80 f9 02 00 00 00  stb [r10 - 0x680], 0x2
05b6f8: 62 0a 48 f9 e4 01 00 00  stw [r10 - 0x6b8], 0x1e4
05b700: 7a 0a 40 f9 29 00 00 00  stdw [r10 - 0x6c0], 0x29
05b708: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05b710: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b718: 07 01 00 00 b8 f7 ff ff  add64 r1, -0x848
05b720: bf a2 00 00 00 00 00 00  mov64 r2, r10
05b728: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05b730: 85 10 00 00 7f 80 02 00  call 0x2807f ; direct target 0x19bb30
05b738: 79 a1 b8 f7 00 00 00 00  ldxdw r1, [r10 - 0x848]
05b740: 79 a2 c0 f7 00 00 00 00  ldxdw r2, [r10 - 0x840]
05b748: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05b750: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05b758: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05b760: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05b768: 95 00 00 00 00 00 00 00  exit
05b770: 7b 6a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r6
05b778: 7a 0a 48 f9 00 00 00 00  stdw [r10 - 0x6b8], 0x0
05b780: 7a 0a 40 f9 00 00 00 00  stdw [r10 - 0x6c0], 0x0
05b788: 7a 0a 38 f9 00 00 00 00  stdw [r10 - 0x6c8], 0x0
05b790: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05b798: bf 96 00 00 00 00 00 00  mov64 r6, r9
05b7a0: 07 06 00 00 28 00 00 00  add64 r6, 0x28
05b7a8: bf a2 00 00 00 00 00 00  mov64 r2, r10
05b7b0: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05b7b8: bf 61 00 00 00 00 00 00  mov64 r1, r6
05b7c0: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
05b7c8: 85 10 00 00 d5 af 02 00  call 0x2afd5 ; direct target 0x1b3678
05b7d0: 7b 0a 70 f5 00 00 00 00  stxdw [r10 - 0xa90], r0
05b7d8: bf 01 00 00 00 00 00 00  mov64 r1, r0
05b7e0: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05b7e8: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05b7f0: 7b 6a 60 f5 00 00 00 00  stxdw [r10 - 0xaa0], r6
05b7f8: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x5b6e8> ; branch 0x5b808
05b800: 05 00 46 00 00 00 00 00  ja +0x46 <.text+0x5b918> ; branch 0x5ba38
05b808: 7b 8a 58 f5 00 00 00 00  stxdw [r10 - 0xaa8], r8
05b810: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05b818: 79 11 08 00 00 00 00 00  ldxdw r1, [r1 + 0x8]
05b820: 79 12 58 00 00 00 00 00  ldxdw r2, [r1 + 0x58]
05b828: 79 21 08 00 00 00 00 00  ldxdw r1, [r2 + 0x8]
05b830: 79 14 00 00 00 00 00 00  ldxdw r4, [r1 + 0x0]
05b838: 07 04 00 00 01 00 00 00  add64 r4, 0x1
05b840: b7 05 00 00 01 00 00 00  mov64 r5, 0x1
05b848: 15 04 01 00 00 00 00 00  jeq r4, 0x0, +0x1 <.text+0x5b738> ; branch 0x5b858
05b850: b7 05 00 00 00 00 00 00  mov64 r5, 0x0
05b858: 79 28 00 00 00 00 00 00  ldxdw r8, [r2 + 0x0]
05b860: 7b 41 00 00 00 00 00 00  stxdw [r1 + 0x0], r4
05b868: 55 05 01 00 01 00 00 00  jne r5, 0x1, +0x1 <.text+0x5b758> ; branch 0x5b878
05b870: 85 10 00 00 ff ff ff ff  call -0x1 ; direct target 0x5b870
05b878: 79 24 10 00 00 00 00 00  ldxdw r4, [r2 + 0x10]
05b880: 79 45 00 00 00 00 00 00  ldxdw r5, [r4 + 0x0]
05b888: 07 05 00 00 01 00 00 00  add64 r5, 0x1
05b890: b7 00 00 00 01 00 00 00  mov64 r0, 0x1
05b898: 15 05 01 00 00 00 00 00  jeq r5, 0x0, +0x1 <.text+0x5b788> ; branch 0x5b8a8
05b8a0: b7 00 00 00 00 00 00 00  mov64 r0, 0x0
05b8a8: 7b 54 00 00 00 00 00 00  stxdw [r4 + 0x0], r5
05b8b0: 55 00 01 00 01 00 00 00  jne r0, 0x1, +0x1 <.text+0x5b7a0> ; branch 0x5b8c0
05b8b8: 05 00 f6 ff 00 00 00 00  ja -0xa <.text+0x5b750> ; branch 0x5b870
05b8c0: 79 25 18 00 00 00 00 00  ldxdw r5, [r2 + 0x18]
05b8c8: 79 20 20 00 00 00 00 00  ldxdw r0, [r2 + 0x20]
05b8d0: 71 26 28 00 00 00 00 00  ldxb r6, [r2 + 0x28]
05b8d8: 71 23 29 00 00 00 00 00  ldxb r3, [r2 + 0x29]
05b8e0: 71 22 2a 00 00 00 00 00  ldxb r2, [r2 + 0x2a]
05b8e8: 73 2a 5a f9 00 00 00 00  stxb [r10 - 0x6a6], r2
05b8f0: 73 3a 59 f9 00 00 00 00  stxb [r10 - 0x6a7], r3
05b8f8: 73 6a 58 f9 00 00 00 00  stxb [r10 - 0x6a8], r6
05b900: 7b 0a 50 f9 00 00 00 00  stxdw [r10 - 0x6b0], r0
05b908: 7b 5a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r5
05b910: 7b 4a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r4
05b918: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05b920: 7b 8a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r8
05b928: bf a1 00 00 00 00 00 00  mov64 r1, r10
05b930: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05b938: bf a2 00 00 00 00 00 00  mov64 r2, r10
05b940: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05b948: 85 10 00 00 f7 71 00 00  call 0x71f7 ; direct target 0x94908
05b950: 79 a2 b0 fd 00 00 00 00  ldxdw r2, [r10 - 0x250]
05b958: 79 a1 a8 fd 00 00 00 00  ldxdw r1, [r10 - 0x258]
05b960: 79 a3 a0 fd 00 00 00 00  ldxdw r3, [r10 - 0x260]
05b968: 15 03 52 00 02 00 00 00  jeq r3, 0x2, +0x52 <.text+0x5bae0> ; branch 0x5bc00
05b970: 79 a4 b8 fd 00 00 00 00  ldxdw r4, [r10 - 0x248]
05b978: 7b 4a 00 f8 00 00 00 00  stxdw [r10 - 0x800], r4
05b980: 7b 2a f8 f7 00 00 00 00  stxdw [r10 - 0x808], r2
05b988: 7b 1a f0 f7 00 00 00 00  stxdw [r10 - 0x810], r1
05b990: 7b 3a e8 f7 00 00 00 00  stxdw [r10 - 0x818], r3
05b998: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05b9a0: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05b9a8: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05b9b0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05b9b8: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05b9c0: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5b8c0> ; branch 0x5b9e0
05b9c8: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05b9d0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05b9d8: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05b9e0: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05b9e8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05b9f0: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05b9f8: 79 a6 c0 f5 00 00 00 00  ldxdw r6, [r10 - 0xa40]
05ba00: 79 a8 58 f5 00 00 00 00  ldxdw r8, [r10 - 0xaa8]
05ba08: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5b908> ; branch 0x5ba28
05ba10: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ba18: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ba20: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05ba28: 7b 9a 50 f5 00 00 00 00  stxdw [r10 - 0xab0], r9
05ba30: 05 00 06 00 00 00 00 00  ja +0x6 <.text+0x5b948> ; branch 0x5ba68
05ba38: 7b 9a 50 f5 00 00 00 00  stxdw [r10 - 0xab0], r9
05ba40: 7a 0a 00 f8 00 00 00 00  stdw [r10 - 0x800], 0x0
05ba48: 7a 0a f8 f7 00 00 00 00  stdw [r10 - 0x808], 0x0
05ba50: 7a 0a f0 f7 00 00 00 00  stdw [r10 - 0x810], 0x0
05ba58: 7a 0a e8 f7 00 00 00 00  stdw [r10 - 0x818], 0x0
05ba60: 79 a6 c0 f5 00 00 00 00  ldxdw r6, [r10 - 0xa40]
05ba68: 79 a9 b8 f5 00 00 00 00  ldxdw r9, [r10 - 0xa48]
05ba70: 79 93 48 00 00 00 00 00  ldxdw r3, [r9 + 0x48]
05ba78: 79 92 40 00 00 00 00 00  ldxdw r2, [r9 + 0x40]
05ba80: 79 61 00 00 00 00 00 00  ldxdw r1, [r6 + 0x0]
05ba88: 7b 1a 58 f5 00 00 00 00  stxdw [r10 - 0xaa8], r1
05ba90: 79 14 58 00 00 00 00 00  ldxdw r4, [r1 + 0x58]
05ba98: bf a1 00 00 00 00 00 00  mov64 r1, r10
05baa0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05baa8: 85 10 00 00 77 f9 ff ff  call -0x689 ; direct target 0x58668
05bab0: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05bab8: bf 64 00 00 00 00 00 00  mov64 r4, r6
05bac0: 79 a6 30 f9 00 00 00 00  ldxdw r6, [r10 - 0x6d0]
05bac8: 71 a2 5a f9 00 00 00 00  ldxb r2, [r10 - 0x6a6]
05bad0: 15 02 20 00 02 00 00 00  jeq r2, 0x2, +0x20 <.text+0x5bab8> ; branch 0x5bbd8
05bad8: 69 a3 58 f9 00 00 00 00  ldxh r3, [r10 - 0x6a8]
05bae0: 6b 3a 30 f8 00 00 00 00  stxh [r10 - 0x7d0], r3
05bae8: 79 a3 50 f9 00 00 00 00  ldxdw r3, [r10 - 0x6b0]
05baf0: 7b 3a 28 f8 00 00 00 00  stxdw [r10 - 0x7d8], r3
05baf8: 79 a3 48 f9 00 00 00 00  ldxdw r3, [r10 - 0x6b8]
05bb00: 7b 3a 20 f8 00 00 00 00  stxdw [r10 - 0x7e0], r3
05bb08: 79 a3 40 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c0]
05bb10: 7b 3a 18 f8 00 00 00 00  stxdw [r10 - 0x7e8], r3
05bb18: 61 a3 5b f9 00 00 00 00  ldxw r3, [r10 - 0x6a5]
05bb20: 63 3a 33 f8 00 00 00 00  stxw [r10 - 0x7cd], r3
05bb28: 71 a3 5f f9 00 00 00 00  ldxb r3, [r10 - 0x6a1]
05bb30: 73 3a 37 f8 00 00 00 00  stxb [r10 - 0x7c9], r3
05bb38: 73 2a 32 f8 00 00 00 00  stxb [r10 - 0x7ce], r2
05bb40: 7b 1a 10 f8 00 00 00 00  stxdw [r10 - 0x7f0], r1
05bb48: 7b 6a 08 f8 00 00 00 00  stxdw [r10 - 0x7f8], r6
05bb50: 79 93 48 00 00 00 00 00  ldxdw r3, [r9 + 0x48]
05bb58: 79 92 40 00 00 00 00 00  ldxdw r2, [r9 + 0x40]
05bb60: 79 49 08 00 00 00 00 00  ldxdw r9, [r4 + 0x8]
05bb68: 79 94 58 00 00 00 00 00  ldxdw r4, [r9 + 0x58]
05bb70: bf a1 00 00 00 00 00 00  mov64 r1, r10
05bb78: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05bb80: 85 10 00 00 5c f9 ff ff  call -0x6a4 ; direct target 0x58668
05bb88: 79 a3 38 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c8]
05bb90: 79 a4 30 f9 00 00 00 00  ldxdw r4, [r10 - 0x6d0]
05bb98: 71 a1 5a f9 00 00 00 00  ldxb r1, [r10 - 0x6a6]
05bba0: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5ba90> ; branch 0x5bbb0
05bba8: 05 00 1c 00 00 00 00 00  ja +0x1c <.text+0x5bb70> ; branch 0x5bc90
05bbb0: 79 a1 a0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa60]
05bbb8: 7b 31 08 00 00 00 00 00  stxdw [r1 + 0x8], r3
05bbc0: 7b 41 00 00 00 00 00 00  stxdw [r1 + 0x0], r4
05bbc8: 72 01 5a 00 02 00 00 00  stb [r1 + 0x5a], 0x2
05bbd0: 05 00 d7 00 00 00 00 00  ja +0xd7 <.text+0x5c170> ; branch 0x5c290
05bbd8: 79 a2 a0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa60]
05bbe0: 7b 12 08 00 00 00 00 00  stxdw [r2 + 0x8], r1
05bbe8: 7b 62 00 00 00 00 00 00  stxdw [r2 + 0x0], r6
05bbf0: 72 02 5a 00 02 00 00 00  stb [r2 + 0x5a], 0x2
05bbf8: 05 00 6d ff 00 00 00 00  ja -0x93 <.text+0x5b648> ; branch 0x5b768
05bc00: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05bc08: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05bc10: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05bc18: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05bc20: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05bc28: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05bc30: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05bc38: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05bc40: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05bc48: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5bb48> ; branch 0x5bc68
05bc50: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05bc58: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05bc60: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05bc68: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05bc70: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05bc78: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05bc80: 55 02 5c ff 00 00 00 00  jne r2, 0x0, -0xa4 <.text+0x5b648> ; branch 0x5b768
05bc88: 05 00 3d 07 00 00 00 00  ja +0x73d <.text+0x5f558> ; branch 0x5f678
05bc90: 7b 9a 40 f5 00 00 00 00  stxdw [r10 - 0xac0], r9
05bc98: 69 a2 58 f9 00 00 00 00  ldxh r2, [r10 - 0x6a8]
05bca0: 6b 2a 60 f8 00 00 00 00  stxh [r10 - 0x7a0], r2
05bca8: 79 a2 50 f9 00 00 00 00  ldxdw r2, [r10 - 0x6b0]
05bcb0: 7b 2a 58 f8 00 00 00 00  stxdw [r10 - 0x7a8], r2
05bcb8: 79 a2 48 f9 00 00 00 00  ldxdw r2, [r10 - 0x6b8]
05bcc0: 7b 2a 50 f8 00 00 00 00  stxdw [r10 - 0x7b0], r2
05bcc8: 79 a2 40 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c0]
05bcd0: 7b 2a 48 f8 00 00 00 00  stxdw [r10 - 0x7b8], r2
05bcd8: 61 a2 5b f9 00 00 00 00  ldxw r2, [r10 - 0x6a5]
05bce0: 63 2a 63 f8 00 00 00 00  stxw [r10 - 0x79d], r2
05bce8: 71 a2 5f f9 00 00 00 00  ldxb r2, [r10 - 0x6a1]
05bcf0: 73 2a 67 f8 00 00 00 00  stxb [r10 - 0x799], r2
05bcf8: 73 1a 62 f8 00 00 00 00  stxb [r10 - 0x79e], r1
05bd00: 7b 3a 48 f5 00 00 00 00  stxdw [r10 - 0xab8], r3
05bd08: 7b 3a 40 f8 00 00 00 00  stxdw [r10 - 0x7c0], r3
05bd10: 7b 4a 38 f5 00 00 00 00  stxdw [r10 - 0xac8], r4
05bd18: 7b 4a 38 f8 00 00 00 00  stxdw [r10 - 0x7c8], r4
05bd20: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05bd28: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bd30: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bd38: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05bd40: 7b 2a 80 f8 00 00 00 00  stxdw [r10 - 0x780], r2
05bd48: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05bd50: 7b 2a 78 f8 00 00 00 00  stxdw [r10 - 0x788], r2
05bd58: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05bd60: 7b 2a 70 f8 00 00 00 00  stxdw [r10 - 0x790], r2
05bd68: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bd70: 7b 1a 68 f8 00 00 00 00  stxdw [r10 - 0x798], r1
05bd78: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05bd80: 79 11 18 00 00 00 00 00  ldxdw r1, [r1 + 0x18]
05bd88: 7b 1a 30 f5 00 00 00 00  stxdw [r10 - 0xad0], r1
05bd90: 79 11 20 00 00 00 00 00  ldxdw r1, [r1 + 0x20]
05bd98: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bda0: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05bda8: 7b 2a d8 fc 00 00 00 00  stxdw [r10 - 0x328], r2
05bdb0: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05bdb8: 7b 2a d0 fc 00 00 00 00  stxdw [r10 - 0x330], r2
05bdc0: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05bdc8: 7b 2a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r2
05bdd0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bdd8: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05bde0: 79 a1 58 f5 00 00 00 00  ldxdw r1, [r10 - 0xaa8]
05bde8: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05bdf0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bdf8: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05be00: 7b 2a b8 fd 00 00 00 00  stxdw [r10 - 0x248], r2
05be08: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05be10: 7b 2a b0 fd 00 00 00 00  stxdw [r10 - 0x250], r2
05be18: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05be20: 7b 2a a8 fd 00 00 00 00  stxdw [r10 - 0x258], r2
05be28: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05be30: 7b 1a a0 fd 00 00 00 00  stxdw [r10 - 0x260], r1
05be38: 79 61 18 00 00 00 00 00  ldxdw r1, [r6 + 0x18]
05be40: 7b 1a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r1
05be48: 79 61 10 00 00 00 00 00  ldxdw r1, [r6 + 0x10]
05be50: 7b 1a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r1
05be58: 79 61 08 00 00 00 00 00  ldxdw r1, [r6 + 0x8]
05be60: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05be68: 79 61 00 00 00 00 00 00  ldxdw r1, [r6 + 0x0]
05be70: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05be78: bf a1 00 00 00 00 00 00  mov64 r1, r10
05be80: 07 01 00 00 a8 f7 ff ff  add64 r1, -0x858
05be88: bf a2 00 00 00 00 00 00  mov64 r2, r10
05be90: 07 02 00 00 c0 fc ff ff  add64 r2, -0x340
05be98: bf a3 00 00 00 00 00 00  mov64 r3, r10
05bea0: 07 03 00 00 68 f8 ff ff  add64 r3, -0x798
05bea8: bf a4 00 00 00 00 00 00  mov64 r4, r10
05beb0: 07 04 00 00 a0 fd ff ff  add64 r4, -0x260
05beb8: bf a5 00 00 00 00 00 00  mov64 r5, r10
05bec0: 07 05 00 00 30 f9 ff ff  add64 r5, -0x6d0
05bec8: 85 10 00 00 a4 f9 ff ff  call -0x65c ; direct target 0x58bf0
05bed0: 79 a1 a8 f7 00 00 00 00  ldxdw r1, [r10 - 0x858]
05bed8: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5bdc8> ; branch 0x5bee8
05bee0: 05 00 60 00 00 00 00 00  ja +0x60 <.text+0x5c0c8> ; branch 0x5c1e8
05bee8: 79 a1 70 f5 00 00 00 00  ldxdw r1, [r10 - 0xa90]
05bef0: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05bef8: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05bf00: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x5bdf0> ; branch 0x5bf10
05bf08: 05 00 7e 00 00 00 00 00  ja +0x7e <.text+0x5c1e0> ; branch 0x5c300
05bf10: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05bf18: 79 16 20 00 00 00 00 00  ldxdw r6, [r1 + 0x20]
05bf20: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05bf28: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05bf30: bf a1 00 00 00 00 00 00  mov64 r1, r10
05bf38: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05bf40: 7b 1a 28 f5 00 00 00 00  stxdw [r10 - 0xad8], r1
05bf48: 85 10 00 00 a5 69 ff ff  call -0x965b ; direct target 0x10c78
05bf50: 79 a1 40 f5 00 00 00 00  ldxdw r1, [r10 - 0xac0]
05bf58: 79 12 58 00 00 00 00 00  ldxdw r2, [r1 + 0x58]
05bf60: 79 21 00 00 00 00 00 00  ldxdw r1, [r2 + 0x0]
05bf68: 79 13 18 00 00 00 00 00  ldxdw r3, [r1 + 0x18]
05bf70: 7b 3a 80 fb 00 00 00 00  stxdw [r10 - 0x480], r3
05bf78: 79 13 10 00 00 00 00 00  ldxdw r3, [r1 + 0x10]
05bf80: 7b 3a 78 fb 00 00 00 00  stxdw [r10 - 0x488], r3
05bf88: 79 13 08 00 00 00 00 00  ldxdw r3, [r1 + 0x8]
05bf90: 7b 3a 70 fb 00 00 00 00  stxdw [r10 - 0x490], r3
05bf98: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05bfa0: 7b 1a 68 fb 00 00 00 00  stxdw [r10 - 0x498], r1
05bfa8: 79 a3 38 f5 00 00 00 00  ldxdw r3, [r10 - 0xac8]
05bfb0: 79 31 18 00 00 00 00 00  ldxdw r1, [r3 + 0x18]
05bfb8: 7b 1a d8 fc 00 00 00 00  stxdw [r10 - 0x328], r1
05bfc0: 79 31 10 00 00 00 00 00  ldxdw r1, [r3 + 0x10]
05bfc8: 7b 1a d0 fc 00 00 00 00  stxdw [r10 - 0x330], r1
05bfd0: 79 31 08 00 00 00 00 00  ldxdw r1, [r3 + 0x8]
05bfd8: 7b 1a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r1
05bfe0: 79 31 00 00 00 00 00 00  ldxdw r1, [r3 + 0x0]
05bfe8: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05bff0: bf a9 00 00 00 00 00 00  mov64 r9, r10
05bff8: 07 09 00 00 30 f9 ff ff  add64 r9, -0x6d0
05c000: bf 91 00 00 00 00 00 00  mov64 r1, r9
05c008: 85 10 00 00 8d 69 ff ff  call -0x9673 ; direct target 0x10c78
05c010: 79 71 00 00 00 00 00 00  ldxdw r1, [r7 + 0x0]
05c018: 79 a2 b0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa50]
05c020: 79 22 00 00 00 00 00 00  ldxdw r2, [r2 + 0x0]
05c028: 7b 2a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r2
05c030: 7b 1a 28 f0 00 00 00 00  stxdw [r10 - 0xfd8], r1
05c038: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c040: 07 01 00 00 38 f8 ff ff  add64 r1, -0x7c8
05c048: 7b 1a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r1
05c050: 7b 9a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r9
05c058: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c060: 07 01 00 00 c0 fc ff ff  add64 r1, -0x340
05c068: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05c070: 7a 0a 18 f0 00 00 00 00  stdw [r10 - 0xfe8], 0x0
05c078: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c080: 07 01 00 00 88 f7 ff ff  add64 r1, -0x878
05c088: bf a4 00 00 00 00 00 00  mov64 r4, r10
05c090: 07 04 00 00 68 fb ff ff  add64 r4, -0x498
05c098: bf a5 00 00 00 00 00 00  mov64 r5, r10
05c0a0: 7b 6a 20 f5 00 00 00 00  stxdw [r10 - 0xae0], r6
05c0a8: bf 62 00 00 00 00 00 00  mov64 r2, r6
05c0b0: 79 a3 28 f5 00 00 00 00  ldxdw r3, [r10 - 0xad8]
05c0b8: 85 10 00 00 0a 71 ff ff  call -0x8ef6 ; direct target 0x14910
05c0c0: 79 a1 88 f7 00 00 00 00  ldxdw r1, [r10 - 0x878]
05c0c8: 79 a6 b8 f5 00 00 00 00  ldxdw r6, [r10 - 0xa48]
05c0d0: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5bfc0> ; branch 0x5c0e0
05c0d8: 05 00 e6 00 00 00 00 00  ja +0xe6 <.text+0x5c6f0> ; branch 0x5c810
05c0e0: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05c0e8: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05c0f0: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c0f8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c100: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05c108: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c008> ; branch 0x5c128
05c110: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05c118: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c120: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05c128: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c130: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c138: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c140: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5c040> ; branch 0x5c160
05c148: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c150: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c158: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05c160: 79 a1 b0 fd 00 00 00 00  ldxdw r1, [r10 - 0x250]
05c168: 79 a2 a8 fd 00 00 00 00  ldxdw r2, [r10 - 0x258]
05c170: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c178: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c180: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05c188: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c088> ; branch 0x5c1a8
05c190: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05c198: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c1a0: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05c1a8: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c1b0: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c1b8: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c1c0: 55 02 56 00 00 00 00 00  jne r2, 0x0, +0x56 <.text+0x5c358> ; branch 0x5c478
05c1c8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c1d0: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c1d8: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05c1e0: 05 00 52 00 00 00 00 00  ja +0x52 <.text+0x5c358> ; branch 0x5c478
05c1e8: 79 a2 b0 f7 00 00 00 00  ldxdw r2, [r10 - 0x850]
05c1f0: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05c1f8: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05c200: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05c208: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05c210: 79 a3 48 f5 00 00 00 00  ldxdw r3, [r10 - 0xab8]
05c218: 79 32 00 00 00 00 00 00  ldxdw r2, [r3 + 0x0]
05c220: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c228: 79 a1 48 f8 00 00 00 00  ldxdw r1, [r10 - 0x7b8]
05c230: 7b 23 00 00 00 00 00 00  stxdw [r3 + 0x0], r2
05c238: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5c138> ; branch 0x5c258
05c240: 79 32 08 00 00 00 00 00  ldxdw r2, [r3 + 0x8]
05c248: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c250: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05c258: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c260: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c268: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c270: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5c170> ; branch 0x5c290
05c278: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c280: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c288: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05c290: 79 a1 18 f8 00 00 00 00  ldxdw r1, [r10 - 0x7e8]
05c298: 79 a2 10 f8 00 00 00 00  ldxdw r2, [r10 - 0x7f0]
05c2a0: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c2a8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c2b0: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05c2b8: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c1b8> ; branch 0x5c2d8
05c2c0: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05c2c8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c2d0: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05c2d8: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c2e0: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c2e8: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c2f0: 55 02 8e fe 00 00 00 00  jne r2, 0x0, -0x172 <.text+0x5b648> ; branch 0x5b768
05c2f8: 05 00 6f 06 00 00 00 00  ja +0x66f <.text+0x5f558> ; branch 0x5f678
05c300: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05c308: 79 11 20 00 00 00 00 00  ldxdw r1, [r1 + 0x20]
05c310: 7b 1a 20 f5 00 00 00 00  stxdw [r10 - 0xae0], r1
05c318: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c320: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05c328: 7b 2a d8 fc 00 00 00 00  stxdw [r10 - 0x328], r2
05c330: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05c338: 7b 2a d0 fc 00 00 00 00  stxdw [r10 - 0x330], r2
05c340: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c348: 7b 2a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r2
05c350: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c358: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05c360: 79 a1 40 f5 00 00 00 00  ldxdw r1, [r10 - 0xac0]
05c368: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05c370: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c378: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05c380: 7b 2a b8 fd 00 00 00 00  stxdw [r10 - 0x248], r2
05c388: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05c390: 7b 2a b0 fd 00 00 00 00  stxdw [r10 - 0x250], r2
05c398: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c3a0: 7b 2a a8 fd 00 00 00 00  stxdw [r10 - 0x258], r2
05c3a8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c3b0: 7b 1a a0 fd 00 00 00 00  stxdw [r10 - 0x260], r1
05c3b8: 79 a2 38 f5 00 00 00 00  ldxdw r2, [r10 - 0xac8]
05c3c0: 79 21 18 00 00 00 00 00  ldxdw r1, [r2 + 0x18]
05c3c8: 7b 1a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r1
05c3d0: 79 21 10 00 00 00 00 00  ldxdw r1, [r2 + 0x10]
05c3d8: 7b 1a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r1
05c3e0: 79 21 08 00 00 00 00 00  ldxdw r1, [r2 + 0x8]
05c3e8: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05c3f0: 79 21 00 00 00 00 00 00  ldxdw r1, [r2 + 0x0]
05c3f8: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05c400: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c408: 07 01 00 00 98 f7 ff ff  add64 r1, -0x868
05c410: bf a2 00 00 00 00 00 00  mov64 r2, r10
05c418: 07 02 00 00 c0 fc ff ff  add64 r2, -0x340
05c420: bf a3 00 00 00 00 00 00  mov64 r3, r10
05c428: 07 03 00 00 68 f8 ff ff  add64 r3, -0x798
05c430: bf a4 00 00 00 00 00 00  mov64 r4, r10
05c438: 07 04 00 00 a0 fd ff ff  add64 r4, -0x260
05c440: bf a5 00 00 00 00 00 00  mov64 r5, r10
05c448: 07 05 00 00 30 f9 ff ff  add64 r5, -0x6d0
05c450: 85 10 00 00 f3 f8 ff ff  call -0x70d ; direct target 0x58bf0
05c458: 79 a1 98 f7 00 00 00 00  ldxdw r1, [r10 - 0x868]
05c460: 79 a6 b8 f5 00 00 00 00  ldxdw r6, [r10 - 0xa48]
05c468: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5c358> ; branch 0x5c478
05c470: 05 00 f9 00 00 00 00 00  ja +0xf9 <.text+0x5cb20> ; branch 0x5cc40
05c478: 79 a3 98 f5 00 00 00 00  ldxdw r3, [r10 - 0xa68]
05c480: 79 a1 90 f5 00 00 00 00  ldxdw r1, [r10 - 0xa70]
05c488: 57 01 00 00 01 00 00 00  and64 r1, 0x1
05c490: 7b 1a 28 f5 00 00 00 00  stxdw [r10 - 0xad8], r1
05c498: 15 01 25 00 00 00 00 00  jeq r1, 0x0, +0x25 <.text+0x5c4a8> ; branch 0x5c5c8
05c4a0: 79 63 38 00 00 00 00 00  ldxdw r3, [r6 + 0x38]
05c4a8: 79 62 00 00 00 00 00 00  ldxdw r2, [r6 + 0x0]
05c4b0: 79 a1 40 f5 00 00 00 00  ldxdw r1, [r10 - 0xac0]
05c4b8: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05c4c0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c4c8: 79 14 18 00 00 00 00 00  ldxdw r4, [r1 + 0x18]
05c4d0: 7b 4a b8 fd 00 00 00 00  stxdw [r10 - 0x248], r4
05c4d8: 79 14 10 00 00 00 00 00  ldxdw r4, [r1 + 0x10]
05c4e0: 7b 4a b0 fd 00 00 00 00  stxdw [r10 - 0x250], r4
05c4e8: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05c4f0: 7b 4a a8 fd 00 00 00 00  stxdw [r10 - 0x258], r4
05c4f8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c500: 7b 1a a0 fd 00 00 00 00  stxdw [r10 - 0x260], r1
05c508: 79 a9 38 f5 00 00 00 00  ldxdw r9, [r10 - 0xac8]
05c510: 79 91 18 00 00 00 00 00  ldxdw r1, [r9 + 0x18]
05c518: 7b 1a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r1
05c520: 79 91 10 00 00 00 00 00  ldxdw r1, [r9 + 0x10]
05c528: 7b 1a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r1
05c530: 79 91 08 00 00 00 00 00  ldxdw r1, [r9 + 0x8]
05c538: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05c540: 79 91 00 00 00 00 00 00  ldxdw r1, [r9 + 0x0]
05c548: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05c550: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c558: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05c560: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05c568: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c570: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05c578: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05c580: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05c588: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c590: 07 01 00 00 78 f7 ff ff  add64 r1, -0x888
05c598: bf a5 00 00 00 00 00 00  mov64 r5, r10
05c5a0: b7 04 00 00 00 00 00 00  mov64 r4, 0x0
05c5a8: 85 10 00 00 dc 43 00 00  call 0x43dc ; direct target 0x7e490
05c5b0: 79 a1 78 f7 00 00 00 00  ldxdw r1, [r10 - 0x888]
05c5b8: 55 01 d2 00 02 00 00 00  jne r1, 0x2, +0xd2 <.text+0x5cb30> ; branch 0x5cc50
05c5c0: 79 a3 98 f5 00 00 00 00  ldxdw r3, [r10 - 0xa68]
05c5c8: 79 a1 40 f5 00 00 00 00  ldxdw r1, [r10 - 0xac0]
05c5d0: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05c5d8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c5e0: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05c5e8: 7b 2a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r2
05c5f0: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05c5f8: 7b 2a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r2
05c600: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c608: 7b 2a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r2
05c610: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c618: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05c620: bf a2 00 00 00 00 00 00  mov64 r2, r10
05c628: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05c630: bf 31 00 00 00 00 00 00  mov64 r1, r3
05c638: bf 36 00 00 00 00 00 00  mov64 r6, r3
05c640: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
05c648: 85 10 00 00 05 ae 02 00  call 0x2ae05 ; direct target 0x1b3678
05c650: 79 a9 58 f5 00 00 00 00  ldxdw r9, [r10 - 0xaa8]
05c658: 79 92 58 00 00 00 00 00  ldxdw r2, [r9 + 0x58]
05c660: 7b 0a 98 f5 00 00 00 00  stxdw [r10 - 0xa68], r0
05c668: bf 01 00 00 00 00 00 00  mov64 r1, r0
05c670: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05c678: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05c680: 15 01 57 00 00 00 00 00  jeq r1, 0x0, +0x57 <.text+0x5c820> ; branch 0x5c940
05c688: 79 21 00 00 00 00 00 00  ldxdw r1, [r2 + 0x0]
05c690: bf 29 00 00 00 00 00 00  mov64 r9, r2
05c698: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05c6a0: 7b 2a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r2
05c6a8: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05c6b0: 7b 2a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r2
05c6b8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c6c0: 7b 2a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r2
05c6c8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05c6d0: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05c6d8: bf a2 00 00 00 00 00 00  mov64 r2, r10
05c6e0: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05c6e8: bf 61 00 00 00 00 00 00  mov64 r1, r6
05c6f0: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
05c6f8: 85 10 00 00 ef ad 02 00  call 0x2adef ; direct target 0x1b3678
05c700: bf 92 00 00 00 00 00 00  mov64 r2, r9
05c708: 79 a9 58 f5 00 00 00 00  ldxdw r9, [r10 - 0xaa8]
05c710: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
05c718: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
05c720: 15 00 43 00 00 00 00 00  jeq r0, 0x0, +0x43 <.text+0x5c820> ; branch 0x5c940
05c728: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c730: 07 01 00 00 50 f9 ff ff  add64 r1, -0x6b0
05c738: 18 02 00 00 ec 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5eec
05c748: 85 10 00 00 86 f5 01 00  call 0x1f586 ; direct target 0x157380
05c750: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c758: 07 01 00 00 68 f9 ff ff  add64 r1, -0x698
05c760: 18 02 00 00 ec 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5eec
05c770: 85 10 00 00 38 5c ff ff  call -0xa3c8 ; direct target 0xa938
05c778: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6e9f
05c788: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05c790: 72 0a 80 f9 02 00 00 00  stb [r10 - 0x680], 0x2
05c798: 62 0a 48 f9 22 02 00 00  stw [r10 - 0x6b8], 0x222
05c7a0: 7a 0a 40 f9 29 00 00 00  stdw [r10 - 0x6c0], 0x29
05c7a8: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05c7b0: 62 0a c8 f9 d2 17 00 00  stw [r10 - 0x638], 0x17d2
05c7b8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c7c0: 07 01 00 00 68 f7 ff ff  add64 r1, -0x898
05c7c8: bf a2 00 00 00 00 00 00  mov64 r2, r10
05c7d0: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05c7d8: 85 10 00 00 6a 7e 02 00  call 0x27e6a ; direct target 0x19bb30
05c7e0: 79 a1 68 f7 00 00 00 00  ldxdw r1, [r10 - 0x898]
05c7e8: 79 a2 70 f7 00 00 00 00  ldxdw r2, [r10 - 0x890]
05c7f0: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05c7f8: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05c800: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05c808: 05 00 3f ff 00 00 00 00  ja -0xc1 <.text+0x5c0e8> ; branch 0x5c208
05c810: 79 a2 90 f7 00 00 00 00  ldxdw r2, [r10 - 0x870]
05c818: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05c820: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05c828: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05c830: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05c838: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05c840: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05c848: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c850: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c858: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05c860: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c760> ; branch 0x5c880
05c868: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05c870: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c878: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05c880: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c888: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c890: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c898: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5c798> ; branch 0x5c8b8
05c8a0: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c8a8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c8b0: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05c8b8: 79 a1 b0 fd 00 00 00 00  ldxdw r1, [r10 - 0x250]
05c8c0: 79 a2 a8 fd 00 00 00 00  ldxdw r2, [r10 - 0x258]
05c8c8: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c8d0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c8d8: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05c8e0: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c7e0> ; branch 0x5c900
05c8e8: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05c8f0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05c8f8: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05c900: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05c908: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c910: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05c918: 55 02 1e ff 00 00 00 00  jne r2, 0x0, -0xe2 <.text+0x5c0f0> ; branch 0x5c210
05c920: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05c928: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05c930: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05c938: 05 00 1a ff 00 00 00 00  ja -0xe6 <.text+0x5c0f0> ; branch 0x5c210
05c940: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c948: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05c950: 85 10 00 00 64 68 ff ff  call -0x979c ; direct target 0x10c78
05c958: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c960: 07 01 00 00 cf f8 ff ff  add64 r1, -0x731
05c968: 7b 1a b8 f8 00 00 00 00  stxdw [r10 - 0x748], r1
05c970: 18 01 00 00 3a 68 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b683a
05c980: 7b 1a 98 f8 00 00 00 00  stxdw [r10 - 0x768], r1
05c988: bf a1 00 00 00 00 00 00  mov64 r1, r10
05c990: 07 01 00 00 98 f8 ff ff  add64 r1, -0x768
05c998: 7b 1a 88 f8 00 00 00 00  stxdw [r10 - 0x778], r1
05c9a0: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05c9a8: 7b 1a a8 f8 00 00 00 00  stxdw [r10 - 0x758], r1
05c9b0: 79 a1 68 f5 00 00 00 00  ldxdw r1, [r10 - 0xa98]
05c9b8: 73 1a cf f8 00 00 00 00  stxb [r10 - 0x731], r1
05c9c0: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05c9c8: 7a 0a c0 f8 01 00 00 00  stdw [r10 - 0x740], 0x1
05c9d0: 7a 0a b0 f8 20 00 00 00  stdw [r10 - 0x750], 0x20
05c9d8: 7a 0a a0 f8 0d 00 00 00  stdw [r10 - 0x760], 0xd
05c9e0: 7a 0a 90 f8 03 00 00 00  stdw [r10 - 0x770], 0x3
05c9e8: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05c9f0: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05c9f8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ca00: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05ca08: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c908> ; branch 0x5ca28
05ca10: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05ca18: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ca20: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05ca28: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05ca30: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ca38: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05ca40: 79 a3 b8 f5 00 00 00 00  ldxdw r3, [r10 - 0xa48]
05ca48: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5c948> ; branch 0x5ca68
05ca50: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ca58: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ca60: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05ca68: 79 31 08 00 00 00 00 00  ldxdw r1, [r3 + 0x8]
05ca70: 79 12 88 00 00 00 00 00  ldxdw r2, [r1 + 0x88]
05ca78: bf a6 00 00 00 00 00 00  mov64 r6, r10
05ca80: 07 06 00 00 30 f9 ff ff  add64 r6, -0x6d0
05ca88: bf 61 00 00 00 00 00 00  mov64 r1, r6
05ca90: 85 10 00 00 3c 68 ff ff  call -0x97c4 ; direct target 0x10c78
05ca98: bf 61 00 00 00 00 00 00  mov64 r1, r6
05caa0: 85 10 00 00 f8 8b 02 00  call 0x28bf8 ; direct target 0x1a2a68
05caa8: 7b 0a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r0
05cab0: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05cab8: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05cac0: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05cac8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05cad0: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05cad8: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5c9d8> ; branch 0x5caf8
05cae0: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05cae8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05caf0: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05caf8: 79 a6 50 f5 00 00 00 00  ldxdw r6, [r10 - 0xab0]
05cb00: 07 06 00 00 08 00 00 00  add64 r6, 0x8
05cb08: 79 13 00 00 00 00 00 00  ldxdw r3, [r1 + 0x0]
05cb10: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05cb18: 7b 31 00 00 00 00 00 00  stxdw [r1 + 0x0], r3
05cb20: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5ca20> ; branch 0x5cb40
05cb28: 79 13 08 00 00 00 00 00  ldxdw r3, [r1 + 0x8]
05cb30: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05cb38: 7b 31 08 00 00 00 00 00  stxdw [r1 + 0x8], r3
05cb40: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cb48: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cb50: bf 62 00 00 00 00 00 00  mov64 r2, r6
05cb58: bf 93 00 00 00 00 00 00  mov64 r3, r9
05cb60: 85 10 00 00 b2 87 00 00  call 0x87b2 ; direct target 0xa08f8
05cb68: 79 a3 38 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c8]
05cb70: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05cb78: 55 01 11 00 00 00 00 00  jne r1, 0x0, +0x11 <.text+0x5cae8> ; branch 0x5cc08
05cb80: 7b 3a 38 f5 00 00 00 00  stxdw [r10 - 0xac8], r3
05cb88: 7b 6a 48 f5 00 00 00 00  stxdw [r10 - 0xab8], r6
05cb90: 79 a9 30 f5 00 00 00 00  ldxdw r9, [r10 - 0xad0]
05cb98: 07 09 00 00 20 00 00 00  add64 r9, 0x20
05cba0: 79 a6 40 f9 00 00 00 00  ldxdw r6, [r10 - 0x6c0]
05cba8: 79 a1 98 f5 00 00 00 00  ldxdw r1, [r10 - 0xa68]
05cbb0: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05cbb8: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05cbc0: 15 01 13 00 00 00 00 00  jeq r1, 0x0, +0x13 <.text+0x5cb40> ; branch 0x5cc60
05cbc8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cbd0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cbd8: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05cbe0: 79 a3 88 f5 00 00 00 00  ldxdw r3, [r10 - 0xa78]
05cbe8: 85 10 00 00 29 87 00 00  call 0x8729 ; direct target 0xa0538
05cbf0: 79 a3 38 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c8]
05cbf8: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05cc00: 15 01 1f 00 00 00 00 00  jeq r1, 0x0, +0x1f <.text+0x5cbe0> ; branch 0x5cd00
05cc08: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05cc10: 79 a2 a0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa60]
05cc18: 7b 12 08 00 00 00 00 00  stxdw [r2 + 0x8], r1
05cc20: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05cc28: 72 02 5a 00 02 00 00 00  stb [r2 + 0x5a], 0x2
05cc30: 79 a3 40 f8 00 00 00 00  ldxdw r3, [r10 - 0x7c0]
05cc38: 05 00 bb fe 00 00 00 00  ja -0x145 <.text+0x5c0f8> ; branch 0x5c218
05cc40: 79 a2 a0 f7 00 00 00 00  ldxdw r2, [r10 - 0x860]
05cc48: 05 00 b4 fe 00 00 00 00  ja -0x14c <.text+0x5c0d0> ; branch 0x5c1f0
05cc50: 79 a2 80 f7 00 00 00 00  ldxdw r2, [r10 - 0x880]
05cc58: 05 00 b2 fe 00 00 00 00  ja -0x14e <.text+0x5c0d0> ; branch 0x5c1f0
05cc60: 7b 9a 18 f5 00 00 00 00  stxdw [r10 - 0xae8], r9
05cc68: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cc70: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cc78: bf a2 00 00 00 00 00 00  mov64 r2, r10
05cc80: 07 02 00 00 e8 f7 ff ff  add64 r2, -0x818
05cc88: 79 a9 88 f5 00 00 00 00  ldxdw r9, [r10 - 0xa78]
05cc90: bf 93 00 00 00 00 00 00  mov64 r3, r9
05cc98: 85 10 00 00 88 70 00 00  call 0x7088 ; direct target 0x950e0
05cca0: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05cca8: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5cb98> ; branch 0x5ccb8
05ccb0: 05 00 c1 01 00 00 00 00  ja +0x1c1 <.text+0x5d9a0> ; branch 0x5dac0
05ccb8: 79 a3 38 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c8]
05ccc0: ad 39 01 00 00 00 00 00  jlt r9, r3, +0x1 <.text+0x5cbb0> ; branch 0x5ccd0
05ccc8: 05 00 0e 00 00 00 00 00  ja +0xe <.text+0x5cc20> ; branch 0x5cd40
05ccd0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05ccd8: 07 01 00 00 c8 f5 ff ff  add64 r1, -0xa38
05cce0: 85 10 00 00 ec 05 00 00  call 0x5ec ; direct target 0x5fc48
05cce8: 79 a1 c8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa38]
05ccf0: 79 a2 d0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa30]
05ccf8: 05 00 b9 01 00 00 00 00  ja +0x1b9 <.text+0x5d9a8> ; branch 0x5dac8
05cd00: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05cd08: 15 01 2d 00 00 00 00 00  jeq r1, 0x0, +0x2d <.text+0x5cd58> ; branch 0x5ce78
05cd10: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cd18: 07 01 00 00 58 f7 ff ff  add64 r1, -0x8a8
05cd20: 85 10 00 00 a7 06 00 00  call 0x6a7 ; direct target 0x60260
05cd28: 79 a1 58 f7 00 00 00 00  ldxdw r1, [r10 - 0x8a8]
05cd30: 79 a2 60 f7 00 00 00 00  ldxdw r2, [r10 - 0x8a0]
05cd38: 05 00 b1 01 00 00 00 00  ja +0x1b1 <.text+0x5d9a8> ; branch 0x5dac8
05cd40: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05cd48: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05cd50: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05cd58: 7b 6a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r6
05cd60: 79 a1 38 f5 00 00 00 00  ldxdw r1, [r10 - 0xac8]
05cd68: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05cd70: 79 a1 68 f5 00 00 00 00  ldxdw r1, [r10 - 0xa98]
05cd78: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05cd80: bf 39 00 00 00 00 00 00  mov64 r9, r3
05cd88: 7b 3a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r3
05cd90: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05cd98: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cda0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cda8: bf a5 00 00 00 00 00 00  mov64 r5, r10
05cdb0: 79 a3 48 f5 00 00 00 00  ldxdw r3, [r10 - 0xab8]
05cdb8: 85 10 00 00 21 5a 00 00  call 0x5a21 ; direct target 0x89ec8
05cdc0: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05cdc8: 55 01 13 00 00 00 00 00  jne r1, 0x0, +0x13 <.text+0x5cd48> ; branch 0x5ce68
05cdd0: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05cdd8: 7b 1a f0 f4 00 00 00 00  stxdw [r10 - 0xb10], r1
05cde0: 7b 1a f8 f4 00 00 00 00  stxdw [r10 - 0xb08], r1
05cde8: 79 a1 28 f5 00 00 00 00  ldxdw r1, [r10 - 0xad8]
05cdf0: 15 01 02 00 00 00 00 00  jeq r1, 0x0, +0x2 <.text+0x5cce8> ; branch 0x5ce08
05cdf8: 79 a1 48 f9 00 00 00 00  ldxdw r1, [r10 - 0x6b8]
05ce00: 7b 1a f8 f4 00 00 00 00  stxdw [r10 - 0xb08], r1
05ce08: 15 08 02 00 00 00 00 00  jeq r8, 0x0, +0x2 <.text+0x5cd00> ; branch 0x5ce20
05ce10: 79 a1 50 f9 00 00 00 00  ldxdw r1, [r10 - 0x6b0]
05ce18: 7b 1a f0 f4 00 00 00 00  stxdw [r10 - 0xb10], r1
05ce20: bf a1 00 00 00 00 00 00  mov64 r1, r10
05ce28: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05ce30: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05ce38: 79 a3 f8 f4 00 00 00 00  ldxdw r3, [r10 - 0xb08]
05ce40: 79 a4 f0 f4 00 00 00 00  ldxdw r4, [r10 - 0xb10]
05ce48: bf 95 00 00 00 00 00 00  mov64 r5, r9
05ce50: 85 10 00 00 0e 47 00 00  call 0x470e ; direct target 0x806c8
05ce58: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05ce60: 15 01 4b 00 00 00 00 00  jeq r1, 0x0, +0x4b <.text+0x5cfa0> ; branch 0x5d0c0
05ce68: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05ce70: 05 00 14 00 00 00 00 00  ja +0x14 <.text+0x5cdf8> ; branch 0x5cf18
05ce78: 7b 9a 18 f5 00 00 00 00  stxdw [r10 - 0xae8], r9
05ce80: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05ce88: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05ce90: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05ce98: 7b 6a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r6
05cea0: 7b 3a 10 f5 00 00 00 00  stxdw [r10 - 0xaf0], r3
05cea8: 7b 3a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r3
05ceb0: 79 a1 38 f5 00 00 00 00  ldxdw r1, [r10 - 0xac8]
05ceb8: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05cec0: 79 a1 68 f5 00 00 00 00  ldxdw r1, [r10 - 0xa98]
05cec8: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05ced0: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05ced8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cee0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cee8: bf a5 00 00 00 00 00 00  mov64 r5, r10
05cef0: 79 a3 48 f5 00 00 00 00  ldxdw r3, [r10 - 0xab8]
05cef8: 85 10 00 00 f9 59 00 00  call 0x59f9 ; direct target 0x89ec8
05cf00: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05cf08: 79 a2 30 f9 00 00 00 00  ldxdw r2, [r10 - 0x6d0]
05cf10: 15 02 02 00 00 00 00 00  jeq r2, 0x0, +0x2 <.text+0x5ce08> ; branch 0x5cf28
05cf18: 79 a2 40 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c0]
05cf20: 05 00 74 01 00 00 00 00  ja +0x174 <.text+0x5d9a8> ; branch 0x5dac8
05cf28: b7 02 00 00 00 00 00 00  mov64 r2, 0x0
05cf30: 7b 2a e8 f4 00 00 00 00  stxdw [r10 - 0xb18], r2
05cf38: 7b 2a 08 f5 00 00 00 00  stxdw [r10 - 0xaf8], r2
05cf40: 79 a2 28 f5 00 00 00 00  ldxdw r2, [r10 - 0xad8]
05cf48: 15 02 01 00 00 00 00 00  jeq r2, 0x0, +0x1 <.text+0x5ce38> ; branch 0x5cf58
05cf50: 7b 1a 08 f5 00 00 00 00  stxdw [r10 - 0xaf8], r1
05cf58: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05cf60: 7b 1a 00 f5 00 00 00 00  stxdw [r10 - 0xb00], r1
05cf68: 15 08 02 00 00 00 00 00  jeq r8, 0x0, +0x2 <.text+0x5ce60> ; branch 0x5cf80
05cf70: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05cf78: 7b 1a 00 f5 00 00 00 00  stxdw [r10 - 0xb00], r1
05cf80: 79 a6 48 f9 00 00 00 00  ldxdw r6, [r10 - 0x6b8]
05cf88: 79 a7 50 f9 00 00 00 00  ldxdw r7, [r10 - 0x6b0]
05cf90: bf a1 00 00 00 00 00 00  mov64 r1, r10
05cf98: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05cfa0: 79 a2 10 f5 00 00 00 00  ldxdw r2, [r10 - 0xaf0]
05cfa8: 79 a3 08 f5 00 00 00 00  ldxdw r3, [r10 - 0xaf8]
05cfb0: 79 a4 00 f5 00 00 00 00  ldxdw r4, [r10 - 0xb00]
05cfb8: 85 10 00 00 99 46 00 00  call 0x4699 ; direct target 0x80488
05cfc0: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05cfc8: 7b 1a e0 f4 00 00 00 00  stxdw [r10 - 0xb20], r1
05cfd0: 15 08 01 00 00 00 00 00  jeq r8, 0x0, +0x1 <.text+0x5cec0> ; branch 0x5cfe0
05cfd8: 7b 7a e0 f4 00 00 00 00  stxdw [r10 - 0xb20], r7
05cfe0: 79 a1 28 f5 00 00 00 00  ldxdw r1, [r10 - 0xad8]
05cfe8: 15 01 01 00 00 00 00 00  jeq r1, 0x0, +0x1 <.text+0x5ced8> ; branch 0x5cff8
05cff0: 7b 6a e8 f4 00 00 00 00  stxdw [r10 - 0xb18], r6
05cff8: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d000: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5cef0> ; branch 0x5d010
05d008: 05 00 56 01 00 00 00 00  ja +0x156 <.text+0x5d9a0> ; branch 0x5dac0
05d010: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05d018: bf 18 00 00 00 00 00 00  mov64 r8, r1
05d020: 15 01 32 00 00 00 00 00  jeq r1, 0x0, +0x32 <.text+0x5d098> ; branch 0x5d1b8
05d028: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d030: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d038: bf a2 00 00 00 00 00 00  mov64 r2, r10
05d040: 07 02 00 00 e8 f7 ff ff  add64 r2, -0x818
05d048: bf 83 00 00 00 00 00 00  mov64 r3, r8
05d050: 85 10 00 00 11 70 00 00  call 0x7011 ; direct target 0x950e0
05d058: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d060: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5cf50> ; branch 0x5d070
05d068: 05 00 4a 01 00 00 00 00  ja +0x14a <.text+0x5d9a0> ; branch 0x5dac0
05d070: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05d078: 7b 1a 90 f5 00 00 00 00  stxdw [r10 - 0xa70], r1
05d080: ad 18 01 00 00 00 00 00  jlt r8, r1, +0x1 <.text+0x5cf70> ; branch 0x5d090
05d088: 05 00 45 00 00 00 00 00  ja +0x45 <.text+0x5d198> ; branch 0x5d2b8
05d090: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d098: 07 01 00 00 18 f7 ff ff  add64 r1, -0x8e8
05d0a0: 85 10 00 00 78 06 00 00  call 0x678 ; direct target 0x60468
05d0a8: 79 a1 18 f7 00 00 00 00  ldxdw r1, [r10 - 0x8e8]
05d0b0: 79 a2 20 f7 00 00 00 00  ldxdw r2, [r10 - 0x8e0]
05d0b8: 05 00 41 01 00 00 00 00  ja +0x141 <.text+0x5d9a8> ; branch 0x5dac8
05d0c0: 79 a1 58 f9 00 00 00 00  ldxdw r1, [r10 - 0x6a8]
05d0c8: 7b 1a e0 f4 00 00 00 00  stxdw [r10 - 0xb20], r1
05d0d0: 79 a1 50 f9 00 00 00 00  ldxdw r1, [r10 - 0x6b0]
05d0d8: 7b 1a e8 f4 00 00 00 00  stxdw [r10 - 0xb18], r1
05d0e0: 79 a4 48 f9 00 00 00 00  ldxdw r4, [r10 - 0x6b8]
05d0e8: 79 a3 40 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c0]
05d0f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d0f8: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d100: bf 92 00 00 00 00 00 00  mov64 r2, r9
05d108: 7b 3a 08 f5 00 00 00 00  stxdw [r10 - 0xaf8], r3
05d110: 7b 4a 00 f5 00 00 00 00  stxdw [r10 - 0xb00], r4
05d118: 85 10 00 00 6d 46 00 00  call 0x466d ; direct target 0x80488
05d120: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d128: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d018> ; branch 0x5d138
05d130: 05 00 31 01 00 00 00 00  ja +0x131 <.text+0x5d9a0> ; branch 0x5dac0
05d138: 79 a3 38 f9 00 00 00 00  ldxdw r3, [r10 - 0x6c8]
05d140: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d148: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d150: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05d158: 7b 3a 10 f5 00 00 00 00  stxdw [r10 - 0xaf0], r3
05d160: 85 10 00 00 da 86 00 00  call 0x86da ; direct target 0xa0838
05d168: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05d170: 7b 1a d8 f4 00 00 00 00  stxdw [r10 - 0xb28], r1
05d178: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d180: 15 01 77 00 00 00 00 00  jeq r1, 0x0, +0x77 <.text+0x5d420> ; branch 0x5d540
05d188: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05d190: 79 a2 a0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa60]
05d198: 7b 12 08 00 00 00 00 00  stxdw [r2 + 0x8], r1
05d1a0: 79 a1 d8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb28]
05d1a8: 7b 12 00 00 00 00 00 00  stxdw [r2 + 0x0], r1
05d1b0: 05 00 4e ff 00 00 00 00  ja -0xb2 <.text+0x5cb08> ; branch 0x5cc28
05d1b8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d1c0: 07 01 00 00 50 f9 ff ff  add64 r1, -0x6b0
05d1c8: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5da0
05d1d8: 85 10 00 00 34 f4 01 00  call 0x1f434 ; direct target 0x157380
05d1e0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d1e8: 07 01 00 00 68 f9 ff ff  add64 r1, -0x698
05d1f0: 18 02 00 00 a0 5d 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5da0
05d200: 85 10 00 00 e6 5a ff ff  call -0xa51a ; direct target 0xa938
05d208: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6e9f
05d218: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05d220: 72 0a 80 f9 02 00 00 00  stb [r10 - 0x680], 0x2
05d228: 62 0a 48 f9 ae 02 00 00  stw [r10 - 0x6b8], 0x2ae
05d230: 7a 0a 40 f9 29 00 00 00  stdw [r10 - 0x6c0], 0x29
05d238: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05d240: 62 0a c8 f9 86 17 00 00  stw [r10 - 0x638], 0x1786
05d248: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d250: 07 01 00 00 08 f7 ff ff  add64 r1, -0x8f8
05d258: bf a2 00 00 00 00 00 00  mov64 r2, r10
05d260: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05d268: 85 10 00 00 18 7d 02 00  call 0x27d18 ; direct target 0x19bb30
05d270: 79 a3 10 f7 00 00 00 00  ldxdw r3, [r10 - 0x8f0]
05d278: 79 a2 08 f7 00 00 00 00  ldxdw r2, [r10 - 0x8f8]
05d280: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d288: 07 01 00 00 f8 f6 ff ff  add64 r1, -0x908
05d290: b7 04 00 00 00 00 00 00  mov64 r4, 0x0
05d298: 85 10 00 00 14 46 ff ff  call -0xb9ec ; direct target 0x340
05d2a0: 79 a1 f8 f6 00 00 00 00  ldxdw r1, [r10 - 0x908]
05d2a8: 79 a2 00 f7 00 00 00 00  ldxdw r2, [r10 - 0x900]
05d2b0: 05 00 02 01 00 00 00 00  ja +0x102 <.text+0x5d9a8> ; branch 0x5dac8
05d2b8: 79 a1 18 f5 00 00 00 00  ldxdw r1, [r10 - 0xae8]
05d2c0: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05d2c8: bf a7 00 00 00 00 00 00  mov64 r7, r10
05d2d0: 07 07 00 00 30 f9 ff ff  add64 r7, -0x6d0
05d2d8: bf 71 00 00 00 00 00 00  mov64 r1, r7
05d2e0: 85 10 00 00 32 67 ff ff  call -0x98ce ; direct target 0x10c78
05d2e8: 79 a2 58 f5 00 00 00 00  ldxdw r2, [r10 - 0xaa8]
05d2f0: 71 21 30 00 00 00 00 00  ldxb r1, [r2 + 0x30]
05d2f8: 79 22 58 00 00 00 00 00  ldxdw r2, [r2 + 0x58]
05d300: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05d308: 79 a2 88 f5 00 00 00 00  ldxdw r2, [r10 - 0xa78]
05d310: 7b 2a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r2
05d318: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05d320: 7b 7a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r7
05d328: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d330: 07 01 00 00 48 f7 ff ff  add64 r1, -0x8b8
05d338: bf a4 00 00 00 00 00 00  mov64 r4, r10
05d340: 07 04 00 00 08 f8 ff ff  add64 r4, -0x7f8
05d348: bf a5 00 00 00 00 00 00  mov64 r5, r10
05d350: 79 a2 b8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa48]
05d358: 79 a3 80 f5 00 00 00 00  ldxdw r3, [r10 - 0xa80]
05d360: 85 10 00 00 df f9 ff ff  call -0x621 ; direct target 0x5a260
05d368: 79 a1 48 f7 00 00 00 00  ldxdw r1, [r10 - 0x8b8]
05d370: 55 01 41 00 02 00 00 00  jne r1, 0x2, +0x41 <.text+0x5d460> ; branch 0x5d580
05d378: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05d380: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05d388: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05d390: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05d398: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05d3a0: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5d2a0> ; branch 0x5d3c0
05d3a8: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05d3b0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05d3b8: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05d3c0: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05d3c8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05d3d0: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05d3d8: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5d2d8> ; branch 0x5d3f8
05d3e0: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05d3e8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05d3f0: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05d3f8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d400: 07 01 00 00 38 f7 ff ff  add64 r1, -0x8c8
05d408: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05d410: 79 a3 88 f5 00 00 00 00  ldxdw r3, [r10 - 0xa78]
05d418: 79 a4 10 f5 00 00 00 00  ldxdw r4, [r10 - 0xaf0]
05d420: 85 10 00 00 f7 87 00 00  call 0x87f7 ; direct target 0xa13e0
05d428: 79 a1 38 f7 00 00 00 00  ldxdw r1, [r10 - 0x8c8]
05d430: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d320> ; branch 0x5d440
05d438: 05 00 70 00 00 00 00 00  ja +0x70 <.text+0x5d6a0> ; branch 0x5d7c0
05d440: 79 a1 70 f5 00 00 00 00  ldxdw r1, [r10 - 0xa90]
05d448: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05d450: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05d458: 15 01 71 00 00 00 00 00  jeq r1, 0x0, +0x71 <.text+0x5d6c8> ; branch 0x5d7e8
05d460: 79 a1 78 f5 00 00 00 00  ldxdw r1, [r10 - 0xa88]
05d468: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x5d358> ; branch 0x5d478
05d470: 05 00 6e 00 00 00 00 00  ja +0x6e <.text+0x5d6c8> ; branch 0x5d7e8
05d478: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05d480: 79 14 30 00 00 00 00 00  ldxdw r4, [r1 + 0x30]
05d488: 79 a2 40 f5 00 00 00 00  ldxdw r2, [r10 - 0xac0]
05d490: 71 21 30 00 00 00 00 00  ldxb r1, [r2 + 0x30]
05d498: 79 22 58 00 00 00 00 00  ldxdw r2, [r2 + 0x58]
05d4a0: 7b 8a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r8
05d4a8: bf a3 00 00 00 00 00 00  mov64 r3, r10
05d4b0: 07 03 00 00 88 f8 ff ff  add64 r3, -0x778
05d4b8: 7b 3a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r3
05d4c0: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05d4c8: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05d4d0: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05d4d8: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05d4e0: 79 a3 c0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa40]
05d4e8: 07 03 00 00 20 00 00 00  add64 r3, 0x20
05d4f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d4f8: 07 01 00 00 28 f7 ff ff  add64 r1, -0x8d8
05d500: bf a2 00 00 00 00 00 00  mov64 r2, r10
05d508: 07 02 00 00 38 f8 ff ff  add64 r2, -0x7c8
05d510: bf a5 00 00 00 00 00 00  mov64 r5, r10
05d518: 85 10 00 00 10 63 00 00  call 0x6310 ; direct target 0x8eda0
05d520: 79 a1 28 f7 00 00 00 00  ldxdw r1, [r10 - 0x8d8]
05d528: 15 01 57 00 02 00 00 00  jeq r1, 0x2, +0x57 <.text+0x5d6c8> ; branch 0x5d7e8
05d530: 79 a2 30 f7 00 00 00 00  ldxdw r2, [r10 - 0x8d0]
05d538: 05 00 51 00 00 00 00 00  ja +0x51 <.text+0x5d6a8> ; branch 0x5d7c8
05d540: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05d548: 15 01 1d 00 00 00 00 00  jeq r1, 0x0, +0x1d <.text+0x5d518> ; branch 0x5d638
05d550: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d558: 07 01 00 00 e8 f6 ff ff  add64 r1, -0x918
05d560: 85 10 00 00 1d 05 00 00  call 0x51d ; direct target 0x5fe50
05d568: 79 a1 e8 f6 00 00 00 00  ldxdw r1, [r10 - 0x918]
05d570: 79 a2 f0 f6 00 00 00 00  ldxdw r2, [r10 - 0x910]
05d578: 05 00 a9 00 00 00 00 00  ja +0xa9 <.text+0x5d9a8> ; branch 0x5dac8
05d580: 79 a2 50 f7 00 00 00 00  ldxdw r2, [r10 - 0x8b0]
05d588: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05d590: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05d598: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05d5a0: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05d5a8: 79 a1 40 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c0]
05d5b0: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05d5b8: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05d5c0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05d5c8: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05d5d0: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5d4d0> ; branch 0x5d5f0
05d5d8: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05d5e0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05d5e8: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05d5f0: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05d5f8: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05d600: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05d608: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5d508> ; branch 0x5d628
05d610: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05d618: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05d620: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05d628: 79 a3 40 f8 00 00 00 00  ldxdw r3, [r10 - 0x7c0]
05d630: 05 00 7c fd 00 00 00 00  ja -0x284 <.text+0x5c0f8> ; branch 0x5c218
05d638: 79 a1 d8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb28]
05d640: 15 01 96 00 00 00 00 00  jeq r1, 0x0, +0x96 <.text+0x5d9d8> ; branch 0x5daf8
05d648: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05d650: 79 18 58 00 00 00 00 00  ldxdw r8, [r1 + 0x58]
05d658: 79 a1 d8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb28]
05d660: 2d 81 01 00 00 00 00 00  jgt r1, r8, +0x1 <.text+0x5d550> ; branch 0x5d670
05d668: 05 00 b1 00 00 00 00 00  ja +0xb1 <.text+0x5dad8> ; branch 0x5dbf8
05d670: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05d678: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05d680: 7b 2a d8 f4 00 00 00 00  stxdw [r10 - 0xb28], r2
05d688: 79 11 18 00 00 00 00 00  ldxdw r1, [r1 + 0x18]
05d690: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05d698: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05d6a0: 7b 2a 48 f9 00 00 00 00  stxdw [r10 - 0x6b8], r2
05d6a8: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05d6b0: 7b 2a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r2
05d6b8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05d6c0: 7b 2a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r2
05d6c8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05d6d0: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05d6d8: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05d6e0: 71 11 a2 00 00 00 00 00  ldxb r1, [r1 + 0xa2]
05d6e8: 15 01 ce 00 00 00 00 00  jeq r1, 0x0, +0xce <.text+0x5dc40> ; branch 0x5dd60
05d6f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d6f8: 07 01 00 00 50 f9 ff ff  add64 r1, -0x6b0
05d700: 18 02 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5f40
05d710: 85 10 00 00 8d f3 01 00  call 0x1f38d ; direct target 0x157380
05d718: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d720: 07 01 00 00 68 f9 ff ff  add64 r1, -0x698
05d728: 18 02 00 00 40 5f 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5f40
05d738: 85 10 00 00 3f 5a ff ff  call -0xa5c1 ; direct target 0xa938
05d740: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6e9f
05d750: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05d758: 72 0a 80 f9 02 00 00 00  stb [r10 - 0x680], 0x2
05d760: 62 0a 48 f9 57 02 00 00  stw [r10 - 0x6b8], 0x257
05d768: 7a 0a 40 f9 29 00 00 00  stdw [r10 - 0x6c0], 0x29
05d770: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05d778: 62 0a c8 f9 85 17 00 00  stw [r10 - 0x638], 0x1785
05d780: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d788: 07 01 00 00 f8 f5 ff ff  add64 r1, -0xa08
05d790: bf a2 00 00 00 00 00 00  mov64 r2, r10
05d798: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05d7a0: 85 10 00 00 71 7c 02 00  call 0x27c71 ; direct target 0x19bb30
05d7a8: 79 a2 00 f6 00 00 00 00  ldxdw r2, [r10 - 0xa00]
05d7b0: 79 a1 f8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa08]
05d7b8: 05 00 61 00 00 00 00 00  ja +0x61 <.text+0x5d9a8> ; branch 0x5dac8
05d7c0: 79 a2 40 f7 00 00 00 00  ldxdw r2, [r10 - 0x8c0]
05d7c8: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05d7d0: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05d7d8: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05d7e0: 05 00 5f 00 00 00 00 00  ja +0x5f <.text+0x5d9c0> ; branch 0x5dae0
05d7e8: 79 a1 90 f5 00 00 00 00  ldxdw r1, [r10 - 0xa70]
05d7f0: 1f 18 00 00 00 00 00 00  sub64 r8, r1
05d7f8: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05d800: 7b 1a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r1
05d808: 79 a1 e0 f4 00 00 00 00  ldxdw r1, [r10 - 0xb20]
05d810: 7b 1a e8 f8 00 00 00 00  stxdw [r10 - 0x718], r1
05d818: 79 a1 e8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb18]
05d820: 7b 1a e0 f8 00 00 00 00  stxdw [r10 - 0x720], r1
05d828: 79 a5 00 f5 00 00 00 00  ldxdw r5, [r10 - 0xb00]
05d830: 7b 5a d8 f8 00 00 00 00  stxdw [r10 - 0x728], r5
05d838: 79 a4 08 f5 00 00 00 00  ldxdw r4, [r10 - 0xaf8]
05d840: 7b 4a d0 f8 00 00 00 00  stxdw [r10 - 0x730], r4
05d848: 79 a1 a0 fd 00 00 00 00  ldxdw r1, [r10 - 0x260]
05d850: 7b 1a 00 f9 00 00 00 00  stxdw [r10 - 0x700], r1
05d858: 79 a1 a8 fd 00 00 00 00  ldxdw r1, [r10 - 0x258]
05d860: 7b 1a 08 f9 00 00 00 00  stxdw [r10 - 0x6f8], r1
05d868: 79 a1 c0 fc 00 00 00 00  ldxdw r1, [r10 - 0x340]
05d870: 7b 1a f0 f8 00 00 00 00  stxdw [r10 - 0x710], r1
05d878: 79 a1 c8 fc 00 00 00 00  ldxdw r1, [r10 - 0x338]
05d880: 7b 1a f8 f8 00 00 00 00  stxdw [r10 - 0x708], r1
05d888: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05d890: 79 13 00 00 00 00 00 00  ldxdw r3, [r1 + 0x0]
05d898: 07 03 00 00 08 00 00 00  add64 r3, 0x8
05d8a0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d8a8: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d8b0: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05d8b8: 85 10 00 00 63 88 00 00  call 0x8863 ; direct target 0xa1bd8
05d8c0: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d8c8: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d7b8> ; branch 0x5d8d8
05d8d0: 05 00 3d 00 00 00 00 00  ja +0x3d <.text+0x5d9a0> ; branch 0x5dac0
05d8d8: 79 a6 38 f9 00 00 00 00  ldxdw r6, [r10 - 0x6c8]
05d8e0: b7 09 00 00 00 00 00 00  mov64 r9, 0x0
05d8e8: 79 a1 68 f5 00 00 00 00  ldxdw r1, [r10 - 0xa98]
05d8f0: 15 01 13 00 00 00 00 00  jeq r1, 0x0, +0x13 <.text+0x5d870> ; branch 0x5d990
05d8f8: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05d900: 79 13 00 00 00 00 00 00  ldxdw r3, [r1 + 0x0]
05d908: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05d910: 79 a2 f8 f4 00 00 00 00  ldxdw r2, [r10 - 0xb08]
05d918: 7b 21 98 00 00 00 00 00  stxdw [r1 + 0x98], r2
05d920: 7b 1a 50 f5 00 00 00 00  stxdw [r10 - 0xab0], r1
05d928: 79 a2 38 f5 00 00 00 00  ldxdw r2, [r10 - 0xac8]
05d930: 7b 21 90 00 00 00 00 00  stxdw [r1 + 0x90], r2
05d938: 07 03 00 00 08 00 00 00  add64 r3, 0x8
05d940: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d948: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d950: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05d958: 79 a4 f0 f4 00 00 00 00  ldxdw r4, [r10 - 0xb10]
05d960: 79 a5 d0 f4 00 00 00 00  ldxdw r5, [r10 - 0xb30]
05d968: 85 10 00 00 4d 88 00 00  call 0x884d ; direct target 0xa1bd8
05d970: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05d978: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d868> ; branch 0x5d988
05d980: 05 00 27 00 00 00 00 00  ja +0x27 <.text+0x5d9a0> ; branch 0x5dac0
05d988: 79 a9 38 f9 00 00 00 00  ldxdw r9, [r10 - 0x6c8]
05d990: bf 67 00 00 00 00 00 00  mov64 r7, r6
05d998: 0f 97 00 00 00 00 00 00  add64 r7, r9
05d9a0: b7 01 00 00 01 00 00 00  mov64 r1, 0x1
05d9a8: ad 67 01 00 00 00 00 00  jlt r7, r6, +0x1 <.text+0x5d898> ; branch 0x5d9b8
05d9b0: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05d9b8: 57 01 00 00 01 00 00 00  and64 r1, 0x1
05d9c0: 55 01 bd 00 00 00 00 00  jne r1, 0x0, +0xbd <.text+0x5de90> ; branch 0x5dfb0
05d9c8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05d9d0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05d9d8: bf a2 00 00 00 00 00 00  mov64 r2, r10
05d9e0: 07 02 00 00 e8 f7 ff ff  add64 r2, -0x818
05d9e8: bf 73 00 00 00 00 00 00  mov64 r3, r7
05d9f0: 85 10 00 00 dd 6e 00 00  call 0x6edd ; direct target 0x950e0
05d9f8: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05da00: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d8f0> ; branch 0x5da10
05da08: 05 00 16 00 00 00 00 00  ja +0x16 <.text+0x5d9a0> ; branch 0x5dac0
05da10: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05da18: 7b 1a 80 f5 00 00 00 00  stxdw [r10 - 0xa80], r1
05da20: bf a1 00 00 00 00 00 00  mov64 r1, r10
05da28: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05da30: bf a2 00 00 00 00 00 00  mov64 r2, r10
05da38: 07 02 00 00 e8 f7 ff ff  add64 r2, -0x818
05da40: bf 93 00 00 00 00 00 00  mov64 r3, r9
05da48: 85 10 00 00 d2 6e 00 00  call 0x6ed2 ; direct target 0x950e0
05da50: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05da58: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5d948> ; branch 0x5da68
05da60: 05 00 0b 00 00 00 00 00  ja +0xb <.text+0x5d9a0> ; branch 0x5dac0
05da68: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05da70: 79 a1 80 f5 00 00 00 00  ldxdw r1, [r10 - 0xa80]
05da78: 7b 2a 30 f5 00 00 00 00  stxdw [r10 - 0xad0], r2
05da80: ad 21 01 00 00 00 00 00  jlt r1, r2, +0x1 <.text+0x5d970> ; branch 0x5da90
05da88: 05 00 ed 00 00 00 00 00  ja +0xed <.text+0x5e0d8> ; branch 0x5e1f8
05da90: bf a1 00 00 00 00 00 00  mov64 r1, r10
05da98: 07 01 00 00 28 f6 ff ff  add64 r1, -0x9d8
05daa0: 85 10 00 00 ba 05 00 00  call 0x5ba ; direct target 0x60878
05daa8: 79 a1 28 f6 00 00 00 00  ldxdw r1, [r10 - 0x9d8]
05dab0: 79 a2 30 f6 00 00 00 00  ldxdw r2, [r10 - 0x9d0]
05dab8: 05 00 01 00 00 00 00 00  ja +0x1 <.text+0x5d9a8> ; branch 0x5dac8
05dac0: 79 a2 38 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c8]
05dac8: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05dad0: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05dad8: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05dae0: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05dae8: 79 a3 40 f8 00 00 00 00  ldxdw r3, [r10 - 0x7c0]
05daf0: 05 00 e4 fc 00 00 00 00  ja -0x31c <.text+0x5c0f8> ; branch 0x5c218
05daf8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05db00: 07 01 00 00 50 f9 ff ff  add64 r1, -0x6b0
05db08: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5e34
05db18: 85 10 00 00 0c f3 01 00  call 0x1f30c ; direct target 0x157380
05db20: bf a1 00 00 00 00 00 00  mov64 r1, r10
05db28: 07 01 00 00 68 f9 ff ff  add64 r1, -0x698
05db30: 18 02 00 00 34 5e 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b5e34
05db40: 85 10 00 00 be 59 ff ff  call -0xa642 ; direct target 0xa938
05db48: 18 01 00 00 9f 6e 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6e9f
05db58: 7b 1a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r1
05db60: 72 0a 80 f9 02 00 00 00  stb [r10 - 0x680], 0x2
05db68: 62 0a 48 f9 4e 02 00 00  stw [r10 - 0x6b8], 0x24e
05db70: 7a 0a 40 f9 29 00 00 00  stdw [r10 - 0x6c0], 0x29
05db78: 7a 0a 30 f9 00 00 00 00  stdw [r10 - 0x6d0], 0x0
05db80: 62 0a c8 f9 84 17 00 00  stw [r10 - 0x638], 0x1784
05db88: bf a1 00 00 00 00 00 00  mov64 r1, r10
05db90: 07 01 00 00 e8 f5 ff ff  add64 r1, -0xa18
05db98: bf a2 00 00 00 00 00 00  mov64 r2, r10
05dba0: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05dba8: 85 10 00 00 f0 7b 02 00  call 0x27bf0 ; direct target 0x19bb30
05dbb0: 79 a3 f0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa10]
05dbb8: 79 a2 e8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa18]
05dbc0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05dbc8: 07 01 00 00 d8 f5 ff ff  add64 r1, -0xa28
05dbd0: b7 04 00 00 00 00 00 00  mov64 r4, 0x0
05dbd8: 85 10 00 00 ec 44 ff ff  call -0xbb14 ; direct target 0x340
05dbe0: 79 a1 d8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa28]
05dbe8: 79 a2 e0 f5 00 00 00 00  ldxdw r2, [r10 - 0xa20]
05dbf0: 05 00 da ff 00 00 00 00  ja -0x26 <.text+0x5d9a8> ; branch 0x5dac8
05dbf8: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05dc00: 7b 1a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r1
05dc08: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05dc10: 79 a3 d8 f4 00 00 00 00  ldxdw r3, [r10 - 0xb28]
05dc18: bf 32 00 00 00 00 00 00  mov64 r2, r3
05dc20: 0f 12 00 00 00 00 00 00  add64 r2, r1
05dc28: b7 01 00 00 01 00 00 00  mov64 r1, 0x1
05dc30: 7b 2a 90 f5 00 00 00 00  stxdw [r10 - 0xa70], r2
05dc38: ad 32 01 00 00 00 00 00  jlt r2, r3, +0x1 <.text+0x5db28> ; branch 0x5dc48
05dc40: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05dc48: 57 01 00 00 01 00 00 00  and64 r1, 0x1
05dc50: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x5db40> ; branch 0x5dc60
05dc58: 05 00 06 00 00 00 00 00  ja +0x6 <.text+0x5db70> ; branch 0x5dc90
05dc60: bf a1 00 00 00 00 00 00  mov64 r1, r10
05dc68: 07 01 00 00 08 f6 ff ff  add64 r1, -0x9f8
05dc70: 85 10 00 00 7c 04 00 00  call 0x47c ; direct target 0x60058
05dc78: 79 a1 10 f6 00 00 00 00  ldxdw r1, [r10 - 0x9f0]
05dc80: 79 a2 08 f6 00 00 00 00  ldxdw r2, [r10 - 0x9f8]
05dc88: 05 00 81 00 00 00 00 00  ja +0x81 <.text+0x5df78> ; branch 0x5e098
05dc90: 79 a1 70 f5 00 00 00 00  ldxdw r1, [r10 - 0xa90]
05dc98: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05dca0: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05dca8: 55 01 01 00 00 00 00 00  jne r1, 0x0, +0x1 <.text+0x5db98> ; branch 0x5dcb8
05dcb0: 05 00 69 00 00 00 00 00  ja +0x69 <.text+0x5dee0> ; branch 0x5e000
05dcb8: 79 a2 40 f5 00 00 00 00  ldxdw r2, [r10 - 0xac0]
05dcc0: 71 21 30 00 00 00 00 00  ldxb r1, [r2 + 0x30]
05dcc8: 79 22 58 00 00 00 00 00  ldxdw r2, [r2 + 0x58]
05dcd0: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05dcd8: 79 a2 88 f5 00 00 00 00  ldxdw r2, [r10 - 0xa78]
05dce0: 7b 2a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r2
05dce8: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05dcf0: 79 a1 20 f5 00 00 00 00  ldxdw r1, [r10 - 0xae0]
05dcf8: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05dd00: bf a1 00 00 00 00 00 00  mov64 r1, r10
05dd08: 07 01 00 00 c8 f6 ff ff  add64 r1, -0x938
05dd10: bf a4 00 00 00 00 00 00  mov64 r4, r10
05dd18: 07 04 00 00 38 f8 ff ff  add64 r4, -0x7c8
05dd20: bf a5 00 00 00 00 00 00  mov64 r5, r10
05dd28: 79 a2 b8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa48]
05dd30: 79 a3 80 f5 00 00 00 00  ldxdw r3, [r10 - 0xa80]
05dd38: 85 10 00 00 a4 f8 ff ff  call -0x75c ; direct target 0x5a260
05dd40: 79 a1 d0 f6 00 00 00 00  ldxdw r1, [r10 - 0x930]
05dd48: 79 a2 c8 f6 00 00 00 00  ldxdw r2, [r10 - 0x938]
05dd50: 15 02 5f 00 02 00 00 00  jeq r2, 0x2, +0x5f <.text+0x5df30> ; branch 0x5e050
05dd58: 05 00 67 00 00 00 00 00  ja +0x67 <.text+0x5df78> ; branch 0x5e098
05dd60: 79 a2 d8 f4 00 00 00 00  ldxdw r2, [r10 - 0xb28]
05dd68: 07 02 00 00 88 02 00 00  add64 r2, 0x288
05dd70: bf a1 00 00 00 00 00 00  mov64 r1, r10
05dd78: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05dd80: b7 03 00 00 20 00 00 00  mov64 r3, 0x20
05dd88: 85 10 00 00 1d ab 02 00  call 0x2ab1d ; direct target 0x1b3678
05dd90: 67 00 00 00 20 00 00 00  lsh64 r0, 0x20
05dd98: 77 00 00 00 20 00 00 00  rsh64 r0, 0x20
05dda0: 15 00 29 ff 00 00 00 00  jeq r0, 0x0, -0xd7 <.text+0x5d5d0> ; branch 0x5d6f0
05dda8: 79 a2 d8 f4 00 00 00 00  ldxdw r2, [r10 - 0xb28]
05ddb0: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05ddb8: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05ddc0: 79 13 08 00 00 00 00 00  ldxdw r3, [r1 + 0x8]
05ddc8: 79 a1 f0 f4 00 00 00 00  ldxdw r1, [r10 - 0xb10]
05ddd0: 7b 1a 30 f0 00 00 00 00  stxdw [r10 - 0xfd0], r1
05ddd8: 7b 9a 38 f0 00 00 00 00  stxdw [r10 - 0xfc8], r9
05dde0: 79 a1 f8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb08]
05dde8: 7b 1a 28 f0 00 00 00 00  stxdw [r10 - 0xfd8], r1
05ddf0: 79 a1 90 f5 00 00 00 00  ldxdw r1, [r10 - 0xa70]
05ddf8: 7b 1a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r1
05de00: 79 a1 30 f5 00 00 00 00  ldxdw r1, [r10 - 0xad0]
05de08: 7b 1a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r1
05de10: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05de18: 7b 1a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r1
05de20: 7b 6a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r6
05de28: 79 a1 38 f5 00 00 00 00  ldxdw r1, [r10 - 0xac8]
05de30: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05de38: bf a1 00 00 00 00 00 00  mov64 r1, r10
05de40: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05de48: bf a5 00 00 00 00 00 00  mov64 r5, r10
05de50: 79 a4 68 f5 00 00 00 00  ldxdw r4, [r10 - 0xa98]
05de58: 85 10 00 00 fc f3 ff ff  call -0xc04 ; direct target 0x57e40
05de60: 79 a2 40 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c0]
05de68: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05de70: 79 a3 30 f9 00 00 00 00  ldxdw r3, [r10 - 0x6d0]
05de78: 15 03 89 ff 02 00 00 00  jeq r3, 0x2, -0x77 <.text+0x5d9a8> ; branch 0x5dac8
05de80: 79 a4 70 f9 00 00 00 00  ldxdw r4, [r10 - 0x690]
05de88: 7b 4a 20 f9 00 00 00 00  stxdw [r10 - 0x6e0], r4
05de90: 79 a4 78 f9 00 00 00 00  ldxdw r4, [r10 - 0x688]
05de98: 7b 4a 28 f9 00 00 00 00  stxdw [r10 - 0x6d8], r4
05dea0: 79 a4 90 f9 00 00 00 00  ldxdw r4, [r10 - 0x670]
05dea8: 7b 4a 10 f9 00 00 00 00  stxdw [r10 - 0x6f0], r4
05deb0: 79 a4 98 f9 00 00 00 00  ldxdw r4, [r10 - 0x668]
05deb8: 7b 4a 18 f9 00 00 00 00  stxdw [r10 - 0x6e8], r4
05dec0: 79 a4 88 f9 00 00 00 00  ldxdw r4, [r10 - 0x678]
05dec8: 7b 4a f8 f4 00 00 00 00  stxdw [r10 - 0xb08], r4
05ded0: 79 a4 80 f9 00 00 00 00  ldxdw r4, [r10 - 0x680]
05ded8: 7b 4a 38 f5 00 00 00 00  stxdw [r10 - 0xac8], r4
05dee0: 79 a4 68 f9 00 00 00 00  ldxdw r4, [r10 - 0x698]
05dee8: 7b 4a d0 f4 00 00 00 00  stxdw [r10 - 0xb30], r4
05def0: 79 a4 60 f9 00 00 00 00  ldxdw r4, [r10 - 0x6a0]
05def8: 7b 4a f0 f4 00 00 00 00  stxdw [r10 - 0xb10], r4
05df00: 15 03 1b 00 00 00 00 00  jeq r3, 0x0, +0x1b <.text+0x5dec0> ; branch 0x5dfe0
05df08: 79 a3 58 f9 00 00 00 00  ldxdw r3, [r10 - 0x6a8]
05df10: 7b 3a 10 f5 00 00 00 00  stxdw [r10 - 0xaf0], r3
05df18: 79 a3 50 f9 00 00 00 00  ldxdw r3, [r10 - 0x6b0]
05df20: 7b 3a e0 f4 00 00 00 00  stxdw [r10 - 0xb20], r3
05df28: 79 a3 48 f9 00 00 00 00  ldxdw r3, [r10 - 0x6b8]
05df30: 7b 3a e8 f4 00 00 00 00  stxdw [r10 - 0xb18], r3
05df38: 79 a3 28 f9 00 00 00 00  ldxdw r3, [r10 - 0x6d8]
05df40: 7b 3a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r3
05df48: 79 a3 20 f9 00 00 00 00  ldxdw r3, [r10 - 0x6e0]
05df50: 7b 3a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r3
05df58: 79 a3 18 f9 00 00 00 00  ldxdw r3, [r10 - 0x6e8]
05df60: 7b 3a 70 fb 00 00 00 00  stxdw [r10 - 0x490], r3
05df68: 79 a3 10 f9 00 00 00 00  ldxdw r3, [r10 - 0x6f0]
05df70: 7b 3a 68 fb 00 00 00 00  stxdw [r10 - 0x498], r3
05df78: b7 03 00 00 01 00 00 00  mov64 r3, 0x1
05df80: 7b 3a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r3
05df88: 7b 2a 00 f5 00 00 00 00  stxdw [r10 - 0xb00], r2
05df90: 7b 1a 08 f5 00 00 00 00  stxdw [r10 - 0xaf8], r1
05df98: 7b 8a d8 f4 00 00 00 00  stxdw [r10 - 0xb28], r8
05dfa0: 79 a1 38 f5 00 00 00 00  ldxdw r1, [r10 - 0xac8]
05dfa8: 05 00 8c ff 00 00 00 00  ja -0x74 <.text+0x5daf0> ; branch 0x5dc10
05dfb0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05dfb8: 07 01 00 00 18 f6 ff ff  add64 r1, -0x9e8
05dfc0: 85 10 00 00 d5 04 00 00  call 0x4d5 ; direct target 0x60670
05dfc8: 79 a1 18 f6 00 00 00 00  ldxdw r1, [r10 - 0x9e8]
05dfd0: 79 a2 20 f6 00 00 00 00  ldxdw r2, [r10 - 0x9e0]
05dfd8: 05 00 5d ff 00 00 00 00  ja -0xa3 <.text+0x5d9a8> ; branch 0x5dac8
05dfe0: b7 01 00 00 00 00 00 00  mov64 r1, 0x0
05dfe8: 7b 1a 68 f5 00 00 00 00  stxdw [r10 - 0xa98], r1
05dff0: 7b 8a d8 f4 00 00 00 00  stxdw [r10 - 0xb28], r8
05dff8: 05 00 82 ff 00 00 00 00  ja -0x7e <.text+0x5daf0> ; branch 0x5dc10
05e000: 79 72 00 00 00 00 00 00  ldxdw r2, [r7 + 0x0]
05e008: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e010: 07 01 00 00 d8 f6 ff ff  add64 r1, -0x928
05e018: 79 a3 b0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa50]
05e020: 79 a4 50 f5 00 00 00 00  ldxdw r4, [r10 - 0xab0]
05e028: 79 a5 88 f5 00 00 00 00  ldxdw r5, [r10 - 0xa78]
05e030: 85 10 00 00 ec 5f 00 00  call 0x5fec ; direct target 0x8df98
05e038: 79 a1 e0 f6 00 00 00 00  ldxdw r1, [r10 - 0x920]
05e040: 79 a2 d8 f6 00 00 00 00  ldxdw r2, [r10 - 0x928]
05e048: 55 02 09 00 02 00 00 00  jne r2, 0x2, +0x9 <.text+0x5df78> ; branch 0x5e098
05e050: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e058: 07 01 00 00 b8 f6 ff ff  add64 r1, -0x948
05e060: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05e068: 79 a3 d8 f4 00 00 00 00  ldxdw r3, [r10 - 0xb28]
05e070: 79 a4 10 f5 00 00 00 00  ldxdw r4, [r10 - 0xaf0]
05e078: 85 10 00 00 6e 85 00 00  call 0x856e ; direct target 0xa0bf0
05e080: 79 a1 c0 f6 00 00 00 00  ldxdw r1, [r10 - 0x940]
05e088: 79 a2 b8 f6 00 00 00 00  ldxdw r2, [r10 - 0x948]
05e090: 15 02 04 00 02 00 00 00  jeq r2, 0x2, +0x4 <.text+0x5df98> ; branch 0x5e0b8
05e098: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05e0a0: 7b 23 00 00 00 00 00 00  stxdw [r3 + 0x0], r2
05e0a8: 7b 13 08 00 00 00 00 00  stxdw [r3 + 0x8], r1
05e0b0: 05 00 45 ff 00 00 00 00  ja -0xbb <.text+0x5d9c0> ; branch 0x5dae0
05e0b8: 79 a1 78 f5 00 00 00 00  ldxdw r1, [r10 - 0xa88]
05e0c0: 55 01 0d 00 00 00 00 00  jne r1, 0x0, +0xd <.text+0x5e010> ; branch 0x5e130
05e0c8: 79 a8 88 f5 00 00 00 00  ldxdw r8, [r10 - 0xa78]
05e0d0: 1f 98 00 00 00 00 00 00  sub64 r8, r9
05e0d8: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05e0e0: 7b 1a a8 fd 00 00 00 00  stxdw [r10 - 0x258], r1
05e0e8: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05e0f0: 7b 1a a0 fd 00 00 00 00  stxdw [r10 - 0x260], r1
05e0f8: 79 a1 68 fb 00 00 00 00  ldxdw r1, [r10 - 0x498]
05e100: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05e108: 79 a1 70 fb 00 00 00 00  ldxdw r1, [r10 - 0x490]
05e110: 7b 1a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r1
05e118: 79 a1 d8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb28]
05e120: 7b 1a 88 f5 00 00 00 00  stxdw [r10 - 0xa78], r1
05e128: 05 00 db fe 00 00 00 00  ja -0x125 <.text+0x5d6e8> ; branch 0x5d808
05e130: 79 a1 b8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa48]
05e138: 79 14 30 00 00 00 00 00  ldxdw r4, [r1 + 0x30]
05e140: 79 a2 58 f5 00 00 00 00  ldxdw r2, [r10 - 0xaa8]
05e148: 71 21 30 00 00 00 00 00  ldxb r1, [r2 + 0x30]
05e150: 79 22 58 00 00 00 00 00  ldxdw r2, [r2 + 0x58]
05e158: 79 a3 90 f5 00 00 00 00  ldxdw r3, [r10 - 0xa70]
05e160: 7b 3a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r3
05e168: bf a3 00 00 00 00 00 00  mov64 r3, r10
05e170: 07 03 00 00 88 f8 ff ff  add64 r3, -0x778
05e178: 7b 3a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r3
05e180: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05e188: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05e190: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05e198: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05e1a0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e1a8: 07 01 00 00 a8 f6 ff ff  add64 r1, -0x958
05e1b0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05e1b8: 07 02 00 00 08 f8 ff ff  add64 r2, -0x7f8
05e1c0: bf a5 00 00 00 00 00 00  mov64 r5, r10
05e1c8: 79 a3 30 f5 00 00 00 00  ldxdw r3, [r10 - 0xad0]
05e1d0: 85 10 00 00 cf 69 00 00  call 0x69cf ; direct target 0x93050
05e1d8: 79 a1 b0 f6 00 00 00 00  ldxdw r1, [r10 - 0x950]
05e1e0: 79 a2 a8 f6 00 00 00 00  ldxdw r2, [r10 - 0x958]
05e1e8: 15 02 db ff 02 00 00 00  jeq r2, 0x2, -0x25 <.text+0x5dfa8> ; branch 0x5e0c8
05e1f0: 05 00 d4 ff 00 00 00 00  ja -0x2c <.text+0x5df78> ; branch 0x5e098
05e1f8: 79 a1 28 f5 00 00 00 00  ldxdw r1, [r10 - 0xad8]
05e200: 55 01 1a 00 00 00 00 00  jne r1, 0x0, +0x1a <.text+0x5e1b8> ; branch 0x5e2d8
05e208: 79 a1 70 f5 00 00 00 00  ldxdw r1, [r10 - 0xa90]
05e210: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05e218: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05e220: 55 01 32 00 00 00 00 00  jne r1, 0x0, +0x32 <.text+0x5e298> ; branch 0x5e3b8
05e228: 79 a1 98 f5 00 00 00 00  ldxdw r1, [r10 - 0xa68]
05e230: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05e238: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05e240: 15 01 2e 00 00 00 00 00  jeq r1, 0x0, +0x2e <.text+0x5e298> ; branch 0x5e3b8
05e248: 79 a1 78 f5 00 00 00 00  ldxdw r1, [r10 - 0xa88]
05e250: 15 01 2c 00 00 00 00 00  jeq r1, 0x0, +0x2c <.text+0x5e298> ; branch 0x5e3b8
05e258: 79 a1 b0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa50]
05e260: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05e268: bf a7 00 00 00 00 00 00  mov64 r7, r10
05e270: 07 07 00 00 30 f9 ff ff  add64 r7, -0x6d0
05e278: bf 71 00 00 00 00 00 00  mov64 r1, r7
05e280: 85 10 00 00 3e 65 ff ff  call -0x9ac2 ; direct target 0x10c78
05e288: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e290: 07 01 00 00 78 f6 ff ff  add64 r1, -0x988
05e298: 79 a2 50 f5 00 00 00 00  ldxdw r2, [r10 - 0xab0]
05e2a0: bf 73 00 00 00 00 00 00  mov64 r3, r7
05e2a8: 79 a4 90 f5 00 00 00 00  ldxdw r4, [r10 - 0xa70]
05e2b0: 85 10 00 00 60 70 00 00  call 0x7060 ; direct target 0x965b8
05e2b8: 79 a1 78 f6 00 00 00 00  ldxdw r1, [r10 - 0x988]
05e2c0: 15 01 1e 00 02 00 00 00  jeq r1, 0x2, +0x1e <.text+0x5e298> ; branch 0x5e3b8
05e2c8: 79 a2 80 f6 00 00 00 00  ldxdw r2, [r10 - 0x980]
05e2d0: 05 00 9e fe 00 00 00 00  ja -0x162 <.text+0x5d6a8> ; branch 0x5d7c8
05e2d8: 79 a1 70 f5 00 00 00 00  ldxdw r1, [r10 - 0xa90]
05e2e0: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05e2e8: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05e2f0: 15 01 08 01 00 00 00 00  jeq r1, 0x0, +0x108 <.text+0x5ea18> ; branch 0x5eb38
05e2f8: 79 a2 40 f5 00 00 00 00  ldxdw r2, [r10 - 0xac0]
05e300: 71 21 30 00 00 00 00 00  ldxb r1, [r2 + 0x30]
05e308: 79 22 58 00 00 00 00 00  ldxdw r2, [r2 + 0x58]
05e310: 7b 7a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r7
05e318: bf a3 00 00 00 00 00 00  mov64 r3, r10
05e320: 07 03 00 00 88 f8 ff ff  add64 r3, -0x778
05e328: 7b 3a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r3
05e330: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05e338: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05e340: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05e348: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05e350: 79 a3 c0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa40]
05e358: 07 03 00 00 20 00 00 00  add64 r3, 0x20
05e360: 79 a4 b8 f5 00 00 00 00  ldxdw r4, [r10 - 0xa48]
05e368: 07 04 00 00 38 00 00 00  add64 r4, 0x38
05e370: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e378: 07 01 00 00 88 f6 ff ff  add64 r1, -0x978
05e380: bf a2 00 00 00 00 00 00  mov64 r2, r10
05e388: 07 02 00 00 38 f8 ff ff  add64 r2, -0x7c8
05e390: bf a5 00 00 00 00 00 00  mov64 r5, r10
05e398: 85 10 00 00 a4 6b 00 00  call 0x6ba4 ; direct target 0x940c0
05e3a0: 79 a1 88 f6 00 00 00 00  ldxdw r1, [r10 - 0x978]
05e3a8: 15 01 01 00 02 00 00 00  jeq r1, 0x2, +0x1 <.text+0x5e298> ; branch 0x5e3b8
05e3b0: 05 00 fb 00 00 00 00 00  ja +0xfb <.text+0x5ea70> ; branch 0x5eb90
05e3b8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e3c0: 07 01 00 00 30 f9 ff ff  add64 r1, -0x6d0
05e3c8: 85 10 00 00 ad 84 02 00  call 0x284ad ; direct target 0x1a0938
05e3d0: 79 a1 30 f9 00 00 00 00  ldxdw r1, [r10 - 0x6d0]
05e3d8: 15 01 0e 00 00 00 00 00  jeq r1, 0x0, +0xe <.text+0x5e330> ; branch 0x5e450
05e3e0: 79 a1 38 f9 00 00 00 00  ldxdw r1, [r10 - 0x6c8]
05e3e8: 79 a2 40 f9 00 00 00 00  ldxdw r2, [r10 - 0x6c0]
05e3f0: 79 a3 48 f9 00 00 00 00  ldxdw r3, [r10 - 0x6b8]
05e3f8: 7b 3a 40 f9 00 00 00 00  stxdw [r10 - 0x6c0], r3
05e400: 7b 2a 38 f9 00 00 00 00  stxdw [r10 - 0x6c8], r2
05e408: 7b 1a 30 f9 00 00 00 00  stxdw [r10 - 0x6d0], r1
05e410: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e418: 07 01 00 00 68 f6 ff ff  add64 r1, -0x998
05e420: bf a2 00 00 00 00 00 00  mov64 r2, r10
05e428: 07 02 00 00 30 f9 ff ff  add64 r2, -0x6d0
05e430: 85 10 00 00 f0 7a 02 00  call 0x27af0 ; direct target 0x19bbb8
05e438: 79 a1 68 f6 00 00 00 00  ldxdw r1, [r10 - 0x998]
05e440: 79 a2 70 f6 00 00 00 00  ldxdw r2, [r10 - 0x990]
05e448: 05 00 cf fe 00 00 00 00  ja -0x131 <.text+0x5d9a8> ; branch 0x5dac8
05e450: 79 a1 80 f5 00 00 00 00  ldxdw r1, [r10 - 0xa80]
05e458: 79 a2 30 f5 00 00 00 00  ldxdw r2, [r10 - 0xad0]
05e460: 1f 21 00 00 00 00 00 00  sub64 r1, r2
05e468: 79 a3 98 f5 00 00 00 00  ldxdw r3, [r10 - 0xa68]
05e470: 67 03 00 00 20 00 00 00  lsh64 r3, 0x20
05e478: 77 03 00 00 20 00 00 00  rsh64 r3, 0x20
05e480: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05e488: 15 03 01 00 00 00 00 00  jeq r3, 0x0, +0x1 <.text+0x5e378> ; branch 0x5e498
05e490: b7 02 00 00 00 00 00 00  mov64 r2, 0x0
05e498: 79 a9 58 f9 00 00 00 00  ldxdw r9, [r10 - 0x6a8]
05e4a0: 79 a6 b8 f5 00 00 00 00  ldxdw r6, [r10 - 0xa48]
05e4a8: 79 63 00 00 00 00 00 00  ldxdw r3, [r6 + 0x0]
05e4b0: 7a 0a b8 fd 00 00 00 00  stdw [r10 - 0x248], 0x0
05e4b8: 7a 0a b0 fd 00 00 00 00  stdw [r10 - 0x250], 0x0
05e4c0: 7a 0a a8 fd 00 00 00 00  stdw [r10 - 0x258], 0x0
05e4c8: 7a 0a a0 fd 00 00 00 00  stdw [r10 - 0x260], 0x0
05e4d0: 7a 0a c0 fd 00 00 00 00  stdw [r10 - 0x240], 0x0
05e4d8: 7a 0a c8 fd 00 00 00 00  stdw [r10 - 0x238], 0x0
05e4e0: 7a 0a d0 fd 00 00 00 00  stdw [r10 - 0x230], 0x0
05e4e8: 7a 0a d8 fd 00 00 00 00  stdw [r10 - 0x228], 0x0
05e4f0: 7a 0a e0 fd 00 00 00 00  stdw [r10 - 0x220], 0x0
05e4f8: 7a 0a e8 fd 00 00 00 00  stdw [r10 - 0x218], 0x0
05e500: 7a 0a f0 fd 00 00 00 00  stdw [r10 - 0x210], 0x0
05e508: 7a 0a f8 fd 00 00 00 00  stdw [r10 - 0x208], 0x0
05e510: 6a 0a 00 fe 00 00 00 00  sth [r10 - 0x200], 0x0
05e518: 79 64 18 00 00 00 00 00  ldxdw r4, [r6 + 0x18]
05e520: 79 44 00 00 00 00 00 00  ldxdw r4, [r4 + 0x0]
05e528: 79 45 18 00 00 00 00 00  ldxdw r5, [r4 + 0x18]
05e530: 7b 5a 80 fb 00 00 00 00  stxdw [r10 - 0x480], r5
05e538: 79 45 10 00 00 00 00 00  ldxdw r5, [r4 + 0x10]
05e540: 7b 5a 78 fb 00 00 00 00  stxdw [r10 - 0x488], r5
05e548: 79 45 08 00 00 00 00 00  ldxdw r5, [r4 + 0x8]
05e550: 7b 5a 70 fb 00 00 00 00  stxdw [r10 - 0x490], r5
05e558: 79 44 00 00 00 00 00 00  ldxdw r4, [r4 + 0x0]
05e560: 7b 4a 68 fb 00 00 00 00  stxdw [r10 - 0x498], r4
05e568: 79 a4 58 f5 00 00 00 00  ldxdw r4, [r10 - 0xaa8]
05e570: 79 44 58 00 00 00 00 00  ldxdw r4, [r4 + 0x58]
05e578: 79 44 00 00 00 00 00 00  ldxdw r4, [r4 + 0x0]
05e580: 79 45 18 00 00 00 00 00  ldxdw r5, [r4 + 0x18]
05e588: 7b 5a d8 fc 00 00 00 00  stxdw [r10 - 0x328], r5
05e590: 79 45 10 00 00 00 00 00  ldxdw r5, [r4 + 0x10]
05e598: 7b 5a d0 fc 00 00 00 00  stxdw [r10 - 0x330], r5
05e5a0: 79 45 08 00 00 00 00 00  ldxdw r5, [r4 + 0x8]
05e5a8: 7b 5a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r5
05e5b0: 79 44 00 00 00 00 00 00  ldxdw r4, [r4 + 0x0]
05e5b8: 7b 4a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r4
05e5c0: 18 04 00 00 c8 6e 1b 00 00 00 00 00 00 00 00 00  lddw r4, 0x1b6ec8
05e5d0: 7b 4a 40 f0 00 00 00 00  stxdw [r10 - 0xfc0], r4
05e5d8: 7b 8a 38 f0 00 00 00 00  stxdw [r10 - 0xfc8], r8
05e5e0: 7b 1a 30 f0 00 00 00 00  stxdw [r10 - 0xfd0], r1
05e5e8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e5f0: 07 01 00 00 d0 f8 ff ff  add64 r1, -0x730
05e5f8: 7b 1a 28 f0 00 00 00 00  stxdw [r10 - 0xfd8], r1
05e600: 79 a1 10 f5 00 00 00 00  ldxdw r1, [r10 - 0xaf0]
05e608: 7b 1a 20 f0 00 00 00 00  stxdw [r10 - 0xfe0], r1
05e610: 79 a1 88 f5 00 00 00 00  ldxdw r1, [r10 - 0xa78]
05e618: 7b 1a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r1
05e620: 7b 2a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r2
05e628: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e630: 07 01 00 00 c0 fc ff ff  add64 r1, -0x340
05e638: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05e640: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e648: 07 01 00 00 68 fb ff ff  add64 r1, -0x498
05e650: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05e658: 07 03 00 00 08 00 00 00  add64 r3, 0x8
05e660: 7b 9a 50 f0 00 00 00 00  stxdw [r10 - 0xfb0], r9
05e668: 7a 0a 48 f0 0e 00 00 00  stdw [r10 - 0xfb8], 0xe
05e670: bf a7 00 00 00 00 00 00  mov64 r7, r10
05e678: 07 07 00 00 30 f9 ff ff  add64 r7, -0x6d0
05e680: bf a4 00 00 00 00 00 00  mov64 r4, r10
05e688: 07 04 00 00 a0 fd ff ff  add64 r4, -0x260
05e690: bf a5 00 00 00 00 00 00  mov64 r5, r10
05e698: bf 71 00 00 00 00 00 00  mov64 r1, r7
05e6a0: 79 a2 48 f5 00 00 00 00  ldxdw r2, [r10 - 0xab8]
05e6a8: 85 10 00 00 a4 5a 00 00  call 0x5aa4 ; direct target 0x8bbd0
05e6b0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e6b8: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05e6c0: bf 72 00 00 00 00 00 00  mov64 r2, r7
05e6c8: 85 10 00 00 bc 07 02 00  call 0x207bc ; direct target 0x1624b0
05e6d0: 79 a1 b0 fd 00 00 00 00  ldxdw r1, [r10 - 0x250]
05e6d8: 7b 1a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r1
05e6e0: 79 a1 a8 fd 00 00 00 00  ldxdw r1, [r10 - 0x258]
05e6e8: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05e6f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e6f8: 07 01 00 00 c0 fc ff ff  add64 r1, -0x340
05e700: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05e708: 85 10 00 00 bd 83 02 00  call 0x283bd ; direct target 0x1a04f8
05e710: 07 06 00 00 60 00 00 00  add64 r6, 0x60
05e718: bf a8 00 00 00 00 00 00  mov64 r8, r10
05e720: 07 08 00 00 d8 fa ff ff  add64 r8, -0x528
05e728: bf 81 00 00 00 00 00 00  mov64 r1, r8
05e730: 7b 6a b8 f5 00 00 00 00  stxdw [r10 - 0xa48], r6
05e738: bf 62 00 00 00 00 00 00  mov64 r2, r6
05e740: 85 10 00 00 a6 64 ff ff  call -0x9b5a ; direct target 0x10c78
05e748: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e750: 07 01 00 00 08 fb ff ff  add64 r1, -0x4f8
05e758: bf 72 00 00 00 00 00 00  mov64 r2, r7
05e760: 85 10 00 00 a9 07 02 00  call 0x207a9 ; direct target 0x1624b0
05e768: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b64bf
05e778: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b64bf
05e788: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05e790: 7b 2a 48 fb 00 00 00 00  stxdw [r10 - 0x4b8], r2
05e798: 7b 1a 40 fb 00 00 00 00  stxdw [r10 - 0x4c0], r1
05e7a0: 79 a1 08 fb 00 00 00 00  ldxdw r1, [r10 - 0x4f8]
05e7a8: 7b 1a 30 fb 00 00 00 00  stxdw [r10 - 0x4d0], r1
05e7b0: 79 a1 10 fb 00 00 00 00  ldxdw r1, [r10 - 0x4f0]
05e7b8: 7b 1a 28 fb 00 00 00 00  stxdw [r10 - 0x4d8], r1
05e7c0: 7b 1a 20 fb 00 00 00 00  stxdw [r10 - 0x4e0], r1
05e7c8: 79 a2 18 fb 00 00 00 00  ldxdw r2, [r10 - 0x4e8]
05e7d0: 0f 21 00 00 00 00 00 00  add64 r1, r2
05e7d8: 7b 1a 38 fb 00 00 00 00  stxdw [r10 - 0x4c8], r1
05e7e0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e7e8: 07 01 00 00 80 fc ff ff  add64 r1, -0x380
05e7f0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05e7f8: 07 02 00 00 20 fb ff ff  add64 r2, -0x4e0
05e800: 85 10 00 00 5c 68 ff ff  call -0x97a4 ; direct target 0x12ae8
05e808: 79 a7 88 fc 00 00 00 00  ldxdw r7, [r10 - 0x378]
05e810: 79 a1 90 fc 00 00 00 00  ldxdw r1, [r10 - 0x370]
05e818: 7b 1a 88 f5 00 00 00 00  stxdw [r10 - 0xa78], r1
05e820: b7 01 00 00 22 00 00 00  mov64 r1, 0x22
05e828: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05e830: 85 10 00 00 91 5d ff ff  call -0xa26f ; direct target 0xd4c0
05e838: 79 a1 d8 fa 00 00 00 00  ldxdw r1, [r10 - 0x528]
05e840: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05e848: 79 13 10 00 00 00 00 00  ldxdw r3, [r1 + 0x10]
05e850: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05e858: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05e860: 7b 10 00 00 00 00 00 00  stxdw [r0 + 0x0], r1
05e868: 7b 40 08 00 00 00 00 00  stxdw [r0 + 0x8], r4
05e870: 7b 30 10 00 00 00 00 00  stxdw [r0 + 0x10], r3
05e878: 7b 20 18 00 00 00 00 00  stxdw [r0 + 0x18], r2
05e880: 6a 00 20 00 01 00 00 00  sth [r0 + 0x20], 0x1
05e888: 7b 0a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r0
05e890: 7a 0a c0 fc 01 00 00 00  stdw [r10 - 0x340], 0x1
05e898: 7a 0a d0 fc 01 00 00 00  stdw [r10 - 0x330], 0x1
05e8a0: bf a6 00 00 00 00 00 00  mov64 r6, r10
05e8a8: 07 06 00 00 a0 fd ff ff  add64 r6, -0x260
05e8b0: bf a5 00 00 00 00 00 00  mov64 r5, r10
05e8b8: 07 05 00 00 c0 fc ff ff  add64 r5, -0x340
05e8c0: bf 61 00 00 00 00 00 00  mov64 r1, r6
05e8c8: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b79df
05e8d8: bf 73 00 00 00 00 00 00  mov64 r3, r7
05e8e0: 79 a4 88 f5 00 00 00 00  ldxdw r4, [r10 - 0xa78]
05e8e8: 85 10 00 00 fe 91 02 00  call 0x291fe ; direct target 0x1a78e0
05e8f0: bf a7 00 00 00 00 00 00  mov64 r7, r10
05e8f8: 07 07 00 00 c0 fc ff ff  add64 r7, -0x340
05e900: bf 71 00 00 00 00 00 00  mov64 r1, r7
05e908: bf 82 00 00 00 00 00 00  mov64 r2, r8
05e910: b7 03 00 00 30 00 00 00  mov64 r3, 0x30
05e918: 85 10 00 00 9e a9 02 00  call 0x2a99e ; direct target 0x1b3610
05e920: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e928: 07 01 00 00 68 fb ff ff  add64 r1, -0x498
05e930: 7b 1a 58 ff 00 00 00 00  stxdw [r10 - 0xa8], r1
05e938: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e940: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
05e948: 7b 1a 78 fb 00 00 00 00  stxdw [r10 - 0x488], r1
05e950: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6807
05e960: 7b 1a 68 fb 00 00 00 00  stxdw [r10 - 0x498], r1
05e968: 79 a1 a8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa58]
05e970: 73 1a 88 ff 00 00 00 00  stxb [r10 - 0x78], r1
05e978: 7a 0a 60 ff 02 00 00 00  stdw [r10 - 0xa0], 0x2
05e980: 7a 0a 80 fb 01 00 00 00  stdw [r10 - 0x480], 0x1
05e988: 7a 0a 70 fb 11 00 00 00  stdw [r10 - 0x490], 0x11
05e990: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e998: 07 01 00 00 58 ff ff ff  add64 r1, -0xa8
05e9a0: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05e9a8: 7a 0a 08 f0 01 00 00 00  stdw [r10 - 0xff8], 0x1
05e9b0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05e9b8: 07 01 00 00 50 fb ff ff  add64 r1, -0x4b0
05e9c0: bf a5 00 00 00 00 00 00  mov64 r5, r10
05e9c8: bf 62 00 00 00 00 00 00  mov64 r2, r6
05e9d0: bf 73 00 00 00 00 00 00  mov64 r3, r7
05e9d8: b7 04 00 00 01 00 00 00  mov64 r4, 0x1
05e9e0: 85 10 00 00 69 83 02 00  call 0x28369 ; direct target 0x1a0530
05e9e8: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80  lddw r1, -0x7fffffffffffffe6
05e9f8: 79 a2 50 fb 00 00 00 00  ldxdw r2, [r10 - 0x4b0]
05ea00: 1d 12 01 00 00 00 00 00  jeq r2, r1, +0x1 <.text+0x5e8f0> ; branch 0x5ea10
05ea08: 05 00 32 00 00 00 00 00  ja +0x32 <.text+0x5ea80> ; branch 0x5eba0
05ea10: 79 a1 d0 fc 00 00 00 00  ldxdw r1, [r10 - 0x330]
05ea18: 79 a2 c8 fc 00 00 00 00  ldxdw r2, [r10 - 0x338]
05ea20: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05ea28: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ea30: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05ea38: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5e938> ; branch 0x5ea58
05ea40: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05ea48: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ea50: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05ea58: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05ea60: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ea68: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05ea70: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5e970> ; branch 0x5ea90
05ea78: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ea80: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ea88: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05ea90: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05ea98: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05eaa0: 15 01 38 00 00 00 00 00  jeq r1, 0x0, +0x38 <.text+0x5eb48> ; branch 0x5ec68
05eaa8: 79 a1 98 f5 00 00 00 00  ldxdw r1, [r10 - 0xa68]
05eab0: 67 01 00 00 20 00 00 00  lsh64 r1, 0x20
05eab8: 77 01 00 00 20 00 00 00  rsh64 r1, 0x20
05eac0: 15 01 35 01 00 00 00 00  jeq r1, 0x0, +0x135 <.text+0x5f350> ; branch 0x5f470
05eac8: 79 a1 40 f5 00 00 00 00  ldxdw r1, [r10 - 0xac0]
05ead0: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05ead8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05eae0: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05eae8: 7b 2a c8 ff 00 00 00 00  stxdw [r10 - 0x38], r2
05eaf0: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05eaf8: 7b 2a c0 ff 00 00 00 00  stxdw [r10 - 0x40], r2
05eb00: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05eb08: 7b 2a b8 ff 00 00 00 00  stxdw [r10 - 0x48], r2
05eb10: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05eb18: 7b 1a b0 ff 00 00 00 00  stxdw [r10 - 0x50], r1
05eb20: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05eb28: 07 01 00 00 20 00 00 00  add64 r1, 0x20
05eb30: 05 00 33 01 00 00 00 00  ja +0x133 <.text+0x5f3b0> ; branch 0x5f4d0
05eb38: bf a1 00 00 00 00 00 00  mov64 r1, r10
05eb40: 07 01 00 00 98 f6 ff ff  add64 r1, -0x968
05eb48: 79 a2 b8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa48]
05eb50: 79 a3 a8 f5 00 00 00 00  ldxdw r3, [r10 - 0xa58]
05eb58: 79 a4 50 f5 00 00 00 00  ldxdw r4, [r10 - 0xab0]
05eb60: bf 75 00 00 00 00 00 00  mov64 r5, r7
05eb68: 85 10 00 00 7d f4 ff ff  call -0xb83 ; direct target 0x58f58
05eb70: 79 a1 98 f6 00 00 00 00  ldxdw r1, [r10 - 0x968]
05eb78: 15 01 d1 fe 02 00 00 00  jeq r1, 0x2, -0x12f <.text+0x5e0e8> ; branch 0x5e208
05eb80: 79 a2 a0 f6 00 00 00 00  ldxdw r2, [r10 - 0x960]
05eb88: 05 00 87 fd 00 00 00 00  ja -0x279 <.text+0x5d6a8> ; branch 0x5d7c8
05eb90: 79 a2 90 f6 00 00 00 00  ldxdw r2, [r10 - 0x970]
05eb98: 05 00 85 fd 00 00 00 00  ja -0x27b <.text+0x5d6a8> ; branch 0x5d7c8
05eba0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05eba8: 07 01 00 00 58 f6 ff ff  add64 r1, -0x9a8
05ebb0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05ebb8: 07 02 00 00 50 fb ff ff  add64 r2, -0x4b0
05ebc0: 85 10 00 00 fe 79 02 00  call 0x279fe ; direct target 0x19bbb8
05ebc8: 79 a1 58 f6 00 00 00 00  ldxdw r1, [r10 - 0x9a8]
05ebd0: 79 a2 60 f6 00 00 00 00  ldxdw r2, [r10 - 0x9a0]
05ebd8: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05ebe0: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05ebe8: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05ebf0: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05ebf8: 79 a1 d0 fc 00 00 00 00  ldxdw r1, [r10 - 0x330]
05ec00: 79 a2 c8 fc 00 00 00 00  ldxdw r2, [r10 - 0x338]
05ec08: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05ec10: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ec18: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05ec20: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5eb20> ; branch 0x5ec40
05ec28: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05ec30: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05ec38: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05ec40: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05ec48: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05ec50: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05ec58: 55 02 39 fd 00 00 00 00  jne r2, 0x0, -0x2c7 <.text+0x5d508> ; branch 0x5d628
05ec60: 05 00 35 fd 00 00 00 00  ja -0x2cb <.text+0x5d4f0> ; branch 0x5d610
05ec68: 79 a3 50 f5 00 00 00 00  ldxdw r3, [r10 - 0xab0]
05ec70: 72 03 a1 00 01 00 00 00  stb [r3 + 0xa1], 0x1
05ec78: 79 a1 58 f5 00 00 00 00  ldxdw r1, [r10 - 0xaa8]
05ec80: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05ec88: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ec90: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05ec98: 7b 2a a0 fb 00 00 00 00  stxdw [r10 - 0x460], r2
05eca0: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05eca8: 7b 2a 98 fb 00 00 00 00  stxdw [r10 - 0x468], r2
05ecb0: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ecb8: 7b 2a 90 fb 00 00 00 00  stxdw [r10 - 0x470], r2
05ecc0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ecc8: 7b 1a 88 fb 00 00 00 00  stxdw [r10 - 0x478], r1
05ecd0: 79 a1 b0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa50]
05ecd8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ece0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ece8: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05ecf0: 7b 2a 80 fb 00 00 00 00  stxdw [r10 - 0x480], r2
05ecf8: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05ed00: 7b 2a 78 fb 00 00 00 00  stxdw [r10 - 0x488], r2
05ed08: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ed10: 7b 2a 70 fb 00 00 00 00  stxdw [r10 - 0x490], r2
05ed18: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ed20: 7b 1a 68 fb 00 00 00 00  stxdw [r10 - 0x498], r1
05ed28: 7b 3a 50 f5 00 00 00 00  stxdw [r10 - 0xab0], r3
05ed30: 79 31 00 00 00 00 00 00  ldxdw r1, [r3 + 0x0]
05ed38: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ed40: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05ed48: 7b 2a c0 fb 00 00 00 00  stxdw [r10 - 0x440], r2
05ed50: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05ed58: 7b 2a b8 fb 00 00 00 00  stxdw [r10 - 0x448], r2
05ed60: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05ed68: 7b 2a b0 fb 00 00 00 00  stxdw [r10 - 0x450], r2
05ed70: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ed78: 7b 1a a8 fb 00 00 00 00  stxdw [r10 - 0x458], r1
05ed80: 79 a2 60 f5 00 00 00 00  ldxdw r2, [r10 - 0xaa0]
05ed88: 79 21 18 00 00 00 00 00  ldxdw r1, [r2 + 0x18]
05ed90: 7b 1a e0 fb 00 00 00 00  stxdw [r10 - 0x420], r1
05ed98: 79 21 10 00 00 00 00 00  ldxdw r1, [r2 + 0x10]
05eda0: 7b 1a d8 fb 00 00 00 00  stxdw [r10 - 0x428], r1
05eda8: 79 21 08 00 00 00 00 00  ldxdw r1, [r2 + 0x8]
05edb0: 7b 1a d0 fb 00 00 00 00  stxdw [r10 - 0x430], r1
05edb8: 79 21 00 00 00 00 00 00  ldxdw r1, [r2 + 0x0]
05edc0: 7b 1a c8 fb 00 00 00 00  stxdw [r10 - 0x438], r1
05edc8: 7b 9a e8 fb 00 00 00 00  stxdw [r10 - 0x418], r9
05edd0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05edd8: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05ede0: bf a7 00 00 00 00 00 00  mov64 r7, r10
05ede8: 07 07 00 00 68 fb ff ff  add64 r7, -0x498
05edf0: bf 72 00 00 00 00 00 00  mov64 r2, r7
05edf8: 85 10 00 00 7d 09 02 00  call 0x2097d ; direct target 0x1639e8
05ee00: 79 a1 b0 fd 00 00 00 00  ldxdw r1, [r10 - 0x250]
05ee08: 7b 1a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r1
05ee10: 79 a1 a8 fd 00 00 00 00  ldxdw r1, [r10 - 0x258]
05ee18: 7b 1a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r1
05ee20: bf a1 00 00 00 00 00 00  mov64 r1, r10
05ee28: 07 01 00 00 c0 fc ff ff  add64 r1, -0x340
05ee30: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05ee38: 85 10 00 00 d7 82 02 00  call 0x282d7 ; direct target 0x1a04f8
05ee40: bf a8 00 00 00 00 00 00  mov64 r8, r10
05ee48: 07 08 00 00 f0 fb ff ff  add64 r8, -0x410
05ee50: bf 81 00 00 00 00 00 00  mov64 r1, r8
05ee58: 79 a2 b8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa48]
05ee60: 85 10 00 00 c2 63 ff ff  call -0x9c3e ; direct target 0x10c78
05ee68: bf a1 00 00 00 00 00 00  mov64 r1, r10
05ee70: 07 01 00 00 20 fc ff ff  add64 r1, -0x3e0
05ee78: bf 72 00 00 00 00 00 00  mov64 r2, r7
05ee80: 85 10 00 00 6c 09 02 00  call 0x2096c ; direct target 0x1639e8
05ee88: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b64bf
05ee98: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b64bf
05eea8: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05eeb0: 7b 2a 60 fc 00 00 00 00  stxdw [r10 - 0x3a0], r2
05eeb8: 7b 1a 58 fc 00 00 00 00  stxdw [r10 - 0x3a8], r1
05eec0: 79 a1 20 fc 00 00 00 00  ldxdw r1, [r10 - 0x3e0]
05eec8: 7b 1a 48 fc 00 00 00 00  stxdw [r10 - 0x3b8], r1
05eed0: 79 a1 28 fc 00 00 00 00  ldxdw r1, [r10 - 0x3d8]
05eed8: 7b 1a 40 fc 00 00 00 00  stxdw [r10 - 0x3c0], r1
05eee0: 7b 1a 38 fc 00 00 00 00  stxdw [r10 - 0x3c8], r1
05eee8: 79 a2 30 fc 00 00 00 00  ldxdw r2, [r10 - 0x3d0]
05eef0: 0f 21 00 00 00 00 00 00  add64 r1, r2
05eef8: 7b 1a 50 fc 00 00 00 00  stxdw [r10 - 0x3b0], r1
05ef00: bf a1 00 00 00 00 00 00  mov64 r1, r10
05ef08: 07 01 00 00 58 ff ff ff  add64 r1, -0xa8
05ef10: bf a2 00 00 00 00 00 00  mov64 r2, r10
05ef18: 07 02 00 00 38 fc ff ff  add64 r2, -0x3c8
05ef20: 85 10 00 00 78 67 ff ff  call -0x9888 ; direct target 0x12ae8
05ef28: 79 a7 60 ff 00 00 00 00  ldxdw r7, [r10 - 0xa0]
05ef30: 79 a1 68 ff 00 00 00 00  ldxdw r1, [r10 - 0x98]
05ef38: 7b 1a 88 f5 00 00 00 00  stxdw [r10 - 0xa78], r1
05ef40: b7 01 00 00 22 00 00 00  mov64 r1, 0x22
05ef48: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05ef50: 85 10 00 00 ad 5c ff ff  call -0xa353 ; direct target 0xd4c0
05ef58: 79 a1 f0 fb 00 00 00 00  ldxdw r1, [r10 - 0x410]
05ef60: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05ef68: 79 13 10 00 00 00 00 00  ldxdw r3, [r1 + 0x10]
05ef70: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05ef78: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05ef80: 7b 10 00 00 00 00 00 00  stxdw [r0 + 0x0], r1
05ef88: 7b 40 08 00 00 00 00 00  stxdw [r0 + 0x8], r4
05ef90: 7b 30 10 00 00 00 00 00  stxdw [r0 + 0x10], r3
05ef98: 7b 20 18 00 00 00 00 00  stxdw [r0 + 0x18], r2
05efa0: 6a 00 20 00 01 00 00 00  sth [r0 + 0x20], 0x1
05efa8: 7b 0a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r0
05efb0: 7a 0a c0 fc 01 00 00 00  stdw [r10 - 0x340], 0x1
05efb8: 7a 0a d0 fc 01 00 00 00  stdw [r10 - 0x330], 0x1
05efc0: bf a6 00 00 00 00 00 00  mov64 r6, r10
05efc8: 07 06 00 00 a0 fd ff ff  add64 r6, -0x260
05efd0: bf a5 00 00 00 00 00 00  mov64 r5, r10
05efd8: 07 05 00 00 c0 fc ff ff  add64 r5, -0x340
05efe0: bf 61 00 00 00 00 00 00  mov64 r1, r6
05efe8: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b79df
05eff8: bf 73 00 00 00 00 00 00  mov64 r3, r7
05f000: 79 a4 88 f5 00 00 00 00  ldxdw r4, [r10 - 0xa78]
05f008: 85 10 00 00 1a 91 02 00  call 0x2911a ; direct target 0x1a78e0
05f010: bf a7 00 00 00 00 00 00  mov64 r7, r10
05f018: 07 07 00 00 c0 fc ff ff  add64 r7, -0x340
05f020: bf 71 00 00 00 00 00 00  mov64 r1, r7
05f028: bf 82 00 00 00 00 00 00  mov64 r2, r8
05f030: b7 03 00 00 30 00 00 00  mov64 r3, 0x30
05f038: 85 10 00 00 ba a8 02 00  call 0x2a8ba ; direct target 0x1b3610
05f040: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f048: 07 01 00 00 80 fc ff ff  add64 r1, -0x380
05f050: 7b 1a 88 ff 00 00 00 00  stxdw [r10 - 0x78], r1
05f058: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f060: 07 01 00 00 a8 fe ff ff  add64 r1, -0x158
05f068: 7b 1a 90 fc 00 00 00 00  stxdw [r10 - 0x370], r1
05f070: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6807
05f080: 7b 1a 80 fc 00 00 00 00  stxdw [r10 - 0x380], r1
05f088: 79 a1 a8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa58]
05f090: 73 1a a8 fe 00 00 00 00  stxb [r10 - 0x158], r1
05f098: 7a 0a 90 ff 02 00 00 00  stdw [r10 - 0x70], 0x2
05f0a0: 7a 0a 98 fc 01 00 00 00  stdw [r10 - 0x368], 0x1
05f0a8: 7a 0a 88 fc 11 00 00 00  stdw [r10 - 0x378], 0x11
05f0b0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f0b8: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
05f0c0: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05f0c8: 7a 0a 08 f0 01 00 00 00  stdw [r10 - 0xff8], 0x1
05f0d0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f0d8: 07 01 00 00 68 fc ff ff  add64 r1, -0x398
05f0e0: bf a5 00 00 00 00 00 00  mov64 r5, r10
05f0e8: bf 62 00 00 00 00 00 00  mov64 r2, r6
05f0f0: bf 73 00 00 00 00 00 00  mov64 r3, r7
05f0f8: b7 04 00 00 01 00 00 00  mov64 r4, 0x1
05f100: 85 10 00 00 85 82 02 00  call 0x28285 ; direct target 0x1a0530
05f108: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80  lddw r1, -0x7fffffffffffffe6
05f118: 79 a2 68 fc 00 00 00 00  ldxdw r2, [r10 - 0x398]
05f120: 5d 12 ae 00 00 00 00 00  jne r2, r1, +0xae <.text+0x5f578> ; branch 0x5f698
05f128: 79 a1 d0 fc 00 00 00 00  ldxdw r1, [r10 - 0x330]
05f130: 79 a2 c8 fc 00 00 00 00  ldxdw r2, [r10 - 0x338]
05f138: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05f140: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f148: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05f150: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5f050> ; branch 0x5f170
05f158: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05f160: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f168: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05f170: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05f178: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f180: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05f188: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5f088> ; branch 0x5f1a8
05f190: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f198: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f1a0: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05f1a8: 79 a1 68 f5 00 00 00 00  ldxdw r1, [r10 - 0xa98]
05f1b0: 15 01 1e ff 00 00 00 00  jeq r1, 0x0, -0xe2 <.text+0x5e988> ; branch 0x5eaa8
05f1b8: 79 a1 d0 f4 00 00 00 00  ldxdw r1, [r10 - 0xb30]
05f1c0: 7b 1a 88 fc 00 00 00 00  stxdw [r10 - 0x378], r1
05f1c8: 79 a1 f0 f4 00 00 00 00  ldxdw r1, [r10 - 0xb10]
05f1d0: 7b 1a 80 fc 00 00 00 00  stxdw [r10 - 0x380], r1
05f1d8: 79 a1 00 f9 00 00 00 00  ldxdw r1, [r10 - 0x700]
05f1e0: 7b 1a 90 fc 00 00 00 00  stxdw [r10 - 0x370], r1
05f1e8: 79 a1 08 f9 00 00 00 00  ldxdw r1, [r10 - 0x6f8]
05f1f0: 7b 1a 98 fc 00 00 00 00  stxdw [r10 - 0x368], r1
05f1f8: 79 a1 f8 f4 00 00 00 00  ldxdw r1, [r10 - 0xb08]
05f200: 7b 1a a8 fc 00 00 00 00  stxdw [r10 - 0x358], r1
05f208: 79 a1 38 f5 00 00 00 00  ldxdw r1, [r10 - 0xac8]
05f210: 7b 1a a0 fc 00 00 00 00  stxdw [r10 - 0x360], r1
05f218: 79 a1 f0 f8 00 00 00 00  ldxdw r1, [r10 - 0x710]
05f220: 7b 1a b0 fc 00 00 00 00  stxdw [r10 - 0x350], r1
05f228: 79 a1 f8 f8 00 00 00 00  ldxdw r1, [r10 - 0x708]
05f230: 7b 1a b8 fc 00 00 00 00  stxdw [r10 - 0x348], r1
05f238: 79 a1 b0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa50]
05f240: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f248: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f250: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05f258: 7b 2a a0 fe 00 00 00 00  stxdw [r10 - 0x160], r2
05f260: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05f268: 7b 2a 98 fe 00 00 00 00  stxdw [r10 - 0x168], r2
05f270: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f278: 7b 2a 90 fe 00 00 00 00  stxdw [r10 - 0x170], r2
05f280: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f288: 7b 1a 88 fe 00 00 00 00  stxdw [r10 - 0x178], r1
05f290: 79 a1 58 f5 00 00 00 00  ldxdw r1, [r10 - 0xaa8]
05f298: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05f2a0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f2a8: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05f2b0: 7b 2a c0 fe 00 00 00 00  stxdw [r10 - 0x140], r2
05f2b8: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05f2c0: 7b 2a b8 fe 00 00 00 00  stxdw [r10 - 0x148], r2
05f2c8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f2d0: 7b 2a b0 fe 00 00 00 00  stxdw [r10 - 0x150], r2
05f2d8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f2e0: 7b 1a a8 fe 00 00 00 00  stxdw [r10 - 0x158], r1
05f2e8: 79 a1 50 f5 00 00 00 00  ldxdw r1, [r10 - 0xab0]
05f2f0: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f2f8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f300: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05f308: 7b 2a a0 ff 00 00 00 00  stxdw [r10 - 0x60], r2
05f310: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05f318: 7b 2a 98 ff 00 00 00 00  stxdw [r10 - 0x68], r2
05f320: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f328: 7b 2a 90 ff 00 00 00 00  stxdw [r10 - 0x70], r2
05f330: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f338: 7b 1a 88 ff 00 00 00 00  stxdw [r10 - 0x78], r1
05f340: 79 a6 60 f5 00 00 00 00  ldxdw r6, [r10 - 0xaa0]
05f348: 79 61 18 00 00 00 00 00  ldxdw r1, [r6 + 0x18]
05f350: 7b 1a 70 ff 00 00 00 00  stxdw [r10 - 0x90], r1
05f358: 79 61 10 00 00 00 00 00  ldxdw r1, [r6 + 0x10]
05f360: 7b 1a 68 ff 00 00 00 00  stxdw [r10 - 0x98], r1
05f368: 79 61 08 00 00 00 00 00  ldxdw r1, [r6 + 0x8]
05f370: 7b 1a 60 ff 00 00 00 00  stxdw [r10 - 0xa0], r1
05f378: 79 61 00 00 00 00 00 00  ldxdw r1, [r6 + 0x0]
05f380: 7b 1a 58 ff 00 00 00 00  stxdw [r10 - 0xa8], r1
05f388: 7b 9a 10 f0 00 00 00 00  stxdw [r10 - 0xff0], r9
05f390: 79 a1 30 f5 00 00 00 00  ldxdw r1, [r10 - 0xad0]
05f398: 7b 1a 18 f0 00 00 00 00  stxdw [r10 - 0xfe8], r1
05f3a0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f3a8: 07 01 00 00 58 ff ff ff  add64 r1, -0xa8
05f3b0: 7b 1a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r1
05f3b8: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f3c0: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
05f3c8: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05f3d0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f3d8: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05f3e0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05f3e8: 07 02 00 00 80 fc ff ff  add64 r2, -0x380
05f3f0: bf a3 00 00 00 00 00 00  mov64 r3, r10
05f3f8: 07 03 00 00 88 fe ff ff  add64 r3, -0x178
05f400: bf a4 00 00 00 00 00 00  mov64 r4, r10
05f408: 07 04 00 00 a8 fe ff ff  add64 r4, -0x158
05f410: bf a5 00 00 00 00 00 00  mov64 r5, r10
05f418: 85 10 00 00 d0 44 00 00  call 0x44d0 ; direct target 0x81aa0
05f420: 79 a7 b0 fd 00 00 00 00  ldxdw r7, [r10 - 0x250]
05f428: 79 a6 a8 fd 00 00 00 00  ldxdw r6, [r10 - 0x258]
05f430: 79 a1 a0 fd 00 00 00 00  ldxdw r1, [r10 - 0x260]
05f438: 15 01 64 00 00 00 00 00  jeq r1, 0x0, +0x64 <.text+0x5f640> ; branch 0x5f760
05f440: 79 a1 a0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa60]
05f448: 7b 71 08 00 00 00 00 00  stxdw [r1 + 0x8], r7
05f450: 7b 61 00 00 00 00 00 00  stxdw [r1 + 0x0], r6
05f458: 72 01 5a 00 02 00 00 00  stb [r1 + 0x5a], 0x2
05f460: 79 a3 40 f8 00 00 00 00  ldxdw r3, [r10 - 0x7c0]
05f468: 05 00 b5 f9 00 00 00 00  ja -0x64b <.text+0x5c0f8> ; branch 0x5c218
05f470: 79 a1 58 f5 00 00 00 00  ldxdw r1, [r10 - 0xaa8]
05f478: 79 11 58 00 00 00 00 00  ldxdw r1, [r1 + 0x58]
05f480: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f488: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05f490: 7b 2a c8 ff 00 00 00 00  stxdw [r10 - 0x38], r2
05f498: 79 12 10 00 00 00 00 00  ldxdw r2, [r1 + 0x10]
05f4a0: 7b 2a c0 ff 00 00 00 00  stxdw [r10 - 0x40], r2
05f4a8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f4b0: 7b 2a b8 ff 00 00 00 00  stxdw [r10 - 0x48], r2
05f4b8: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f4c0: 7b 1a b0 ff 00 00 00 00  stxdw [r10 - 0x50], r1
05f4c8: 79 a1 18 f5 00 00 00 00  ldxdw r1, [r10 - 0xae8]
05f4d0: 7b 1a c0 f5 00 00 00 00  stxdw [r10 - 0xa40], r1
05f4d8: 79 a1 c0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa40]
05f4e0: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05f4e8: bf a6 00 00 00 00 00 00  mov64 r6, r10
05f4f0: 07 06 00 00 d0 ff ff ff  add64 r6, -0x30
05f4f8: bf 61 00 00 00 00 00 00  mov64 r1, r6
05f500: 85 10 00 00 ee 62 ff ff  call -0x9d12 ; direct target 0x10c78
05f508: 79 a2 c8 ff 00 00 00 00  ldxdw r2, [r10 - 0x38]
05f510: 79 a1 a0 f5 00 00 00 00  ldxdw r1, [r10 - 0xa60]
05f518: 7b 21 18 00 00 00 00 00  stxdw [r1 + 0x18], r2
05f520: 79 a2 c0 ff 00 00 00 00  ldxdw r2, [r10 - 0x40]
05f528: 7b 21 10 00 00 00 00 00  stxdw [r1 + 0x10], r2
05f530: 79 a2 b8 ff 00 00 00 00  ldxdw r2, [r10 - 0x48]
05f538: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05f540: 79 a2 b0 ff 00 00 00 00  ldxdw r2, [r10 - 0x50]
05f548: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05f550: 79 a2 80 f5 00 00 00 00  ldxdw r2, [r10 - 0xa80]
05f558: 7b 21 28 00 00 00 00 00  stxdw [r1 + 0x28], r2
05f560: 79 a2 90 f5 00 00 00 00  ldxdw r2, [r10 - 0xa70]
05f568: 7b 21 20 00 00 00 00 00  stxdw [r1 + 0x20], r2
05f570: 07 01 00 00 30 00 00 00  add64 r1, 0x30
05f578: bf 62 00 00 00 00 00 00  mov64 r2, r6
05f580: b7 03 00 00 30 00 00 00  mov64 r3, 0x30
05f588: 85 10 00 00 10 a8 02 00  call 0x2a810 ; direct target 0x1b3610
05f590: 79 a1 48 f8 00 00 00 00  ldxdw r1, [r10 - 0x7b8]
05f598: 79 a2 40 f8 00 00 00 00  ldxdw r2, [r10 - 0x7c0]
05f5a0: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05f5a8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f5b0: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05f5b8: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5f4b8> ; branch 0x5f5d8
05f5c0: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05f5c8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f5d0: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05f5d8: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05f5e0: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f5e8: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05f5f0: 55 02 03 00 00 00 00 00  jne r2, 0x0, +0x3 <.text+0x5f4f0> ; branch 0x5f610
05f5f8: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f600: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f608: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05f610: 79 a1 18 f8 00 00 00 00  ldxdw r1, [r10 - 0x7e8]
05f618: 79 a2 10 f8 00 00 00 00  ldxdw r2, [r10 - 0x7f0]
05f620: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05f628: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f630: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05f638: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5f538> ; branch 0x5f658
05f640: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05f648: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f650: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05f658: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05f660: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f668: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05f670: 55 02 1e f8 00 00 00 00  jne r2, 0x0, -0x7e2 <.text+0x5b648> ; branch 0x5b768
05f678: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05f680: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f688: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05f690: 05 00 1a f8 00 00 00 00  ja -0x7e6 <.text+0x5b648> ; branch 0x5b768
05f698: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f6a0: 07 01 00 00 48 f6 ff ff  add64 r1, -0x9b8
05f6a8: bf a2 00 00 00 00 00 00  mov64 r2, r10
05f6b0: 07 02 00 00 68 fc ff ff  add64 r2, -0x398
05f6b8: 85 10 00 00 9f 78 02 00  call 0x2789f ; direct target 0x19bbb8
05f6c0: 79 a1 48 f6 00 00 00 00  ldxdw r1, [r10 - 0x9b8]
05f6c8: 79 a2 50 f6 00 00 00 00  ldxdw r2, [r10 - 0x9b0]
05f6d0: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05f6d8: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05f6e0: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05f6e8: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05f6f0: 79 a1 d0 fc 00 00 00 00  ldxdw r1, [r10 - 0x330]
05f6f8: 79 a2 c8 fc 00 00 00 00  ldxdw r2, [r10 - 0x338]
05f700: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05f708: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f710: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05f718: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5f618> ; branch 0x5f738
05f720: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05f728: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05f730: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05f738: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05f740: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05f748: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05f750: 55 02 da fb 00 00 00 00  jne r2, 0x0, -0x426 <.text+0x5d508> ; branch 0x5d628
05f758: 05 00 d6 fb 00 00 00 00  ja -0x42a <.text+0x5d4f0> ; branch 0x5d610
05f760: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f768: 07 01 00 00 d0 fc ff ff  add64 r1, -0x330
05f770: bf a2 00 00 00 00 00 00  mov64 r2, r10
05f778: 07 02 00 00 b8 fd ff ff  add64 r2, -0x248
05f780: b7 03 00 00 d0 00 00 00  mov64 r3, 0xd0
05f788: 85 10 00 00 d0 a7 02 00  call 0x2a7d0 ; direct target 0x1b3610
05f790: 7b 7a c8 fc 00 00 00 00  stxdw [r10 - 0x338], r7
05f798: 7b 6a c0 fc 00 00 00 00  stxdw [r10 - 0x340], r6
05f7a0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f7a8: 07 01 00 00 a0 fd ff ff  add64 r1, -0x260
05f7b0: bf a7 00 00 00 00 00 00  mov64 r7, r10
05f7b8: 07 07 00 00 c0 fc ff ff  add64 r7, -0x340
05f7c0: bf 72 00 00 00 00 00 00  mov64 r2, r7
05f7c8: 85 10 00 00 84 08 02 00  call 0x20884 ; direct target 0x163bf0
05f7d0: 79 a1 b0 fd 00 00 00 00  ldxdw r1, [r10 - 0x250]
05f7d8: 7b 1a 60 ff 00 00 00 00  stxdw [r10 - 0xa0], r1
05f7e0: 79 a1 a8 fd 00 00 00 00  ldxdw r1, [r10 - 0x258]
05f7e8: 7b 1a 58 ff 00 00 00 00  stxdw [r10 - 0xa8], r1
05f7f0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f7f8: 07 01 00 00 58 ff ff ff  add64 r1, -0xa8
05f800: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05f808: 85 10 00 00 9d 81 02 00  call 0x2819d ; direct target 0x1a04f8
05f810: bf a8 00 00 00 00 00 00  mov64 r8, r10
05f818: 07 08 00 00 c8 fe ff ff  add64 r8, -0x138
05f820: bf 81 00 00 00 00 00 00  mov64 r1, r8
05f828: 79 a2 b8 f5 00 00 00 00  ldxdw r2, [r10 - 0xa48]
05f830: 85 10 00 00 88 62 ff ff  call -0x9d78 ; direct target 0x10c78
05f838: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f840: 07 01 00 00 f8 fe ff ff  add64 r1, -0x108
05f848: bf 72 00 00 00 00 00 00  mov64 r2, r7
05f850: 85 10 00 00 73 08 02 00  call 0x20873 ; direct target 0x163bf0
05f858: 18 01 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b64bf
05f868: 18 02 00 00 bf 64 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b64bf
05f878: 07 02 00 00 08 00 00 00  add64 r2, 0x8
05f880: 7b 2a 38 ff 00 00 00 00  stxdw [r10 - 0xc8], r2
05f888: 7b 1a 30 ff 00 00 00 00  stxdw [r10 - 0xd0], r1
05f890: 79 a1 f8 fe 00 00 00 00  ldxdw r1, [r10 - 0x108]
05f898: 7b 1a 20 ff 00 00 00 00  stxdw [r10 - 0xe0], r1
05f8a0: 79 a1 00 ff 00 00 00 00  ldxdw r1, [r10 - 0x100]
05f8a8: 7b 1a 18 ff 00 00 00 00  stxdw [r10 - 0xe8], r1
05f8b0: 7b 1a 10 ff 00 00 00 00  stxdw [r10 - 0xf0], r1
05f8b8: 79 a2 08 ff 00 00 00 00  ldxdw r2, [r10 - 0xf8]
05f8c0: 0f 21 00 00 00 00 00 00  add64 r1, r2
05f8c8: 7b 1a 28 ff 00 00 00 00  stxdw [r10 - 0xd8], r1
05f8d0: bf a1 00 00 00 00 00 00  mov64 r1, r10
05f8d8: 07 01 00 00 a8 fe ff ff  add64 r1, -0x158
05f8e0: bf a2 00 00 00 00 00 00  mov64 r2, r10
05f8e8: 07 02 00 00 10 ff ff ff  add64 r2, -0xf0
05f8f0: 85 10 00 00 3e 66 ff ff  call -0x99c2 ; direct target 0x12ae8
05f8f8: 79 a6 b0 fe 00 00 00 00  ldxdw r6, [r10 - 0x150]
05f900: 79 a9 b8 fe 00 00 00 00  ldxdw r9, [r10 - 0x148]
05f908: b7 01 00 00 22 00 00 00  mov64 r1, 0x22
05f910: b7 02 00 00 01 00 00 00  mov64 r2, 0x1
05f918: 85 10 00 00 74 5b ff ff  call -0xa48c ; direct target 0xd4c0
05f920: 79 a1 c8 fe 00 00 00 00  ldxdw r1, [r10 - 0x138]
05f928: 79 12 18 00 00 00 00 00  ldxdw r2, [r1 + 0x18]
05f930: 79 13 10 00 00 00 00 00  ldxdw r3, [r1 + 0x10]
05f938: 79 14 08 00 00 00 00 00  ldxdw r4, [r1 + 0x8]
05f940: 79 11 00 00 00 00 00 00  ldxdw r1, [r1 + 0x0]
05f948: 7b 10 00 00 00 00 00 00  stxdw [r0 + 0x0], r1
05f950: 7b 40 08 00 00 00 00 00  stxdw [r0 + 0x8], r4
05f958: 7b 30 10 00 00 00 00 00  stxdw [r0 + 0x10], r3
05f960: 7b 20 18 00 00 00 00 00  stxdw [r0 + 0x18], r2
05f968: 6a 00 20 00 01 00 00 00  sth [r0 + 0x20], 0x1
05f970: 7b 0a 60 ff 00 00 00 00  stxdw [r10 - 0xa0], r0
05f978: 7a 0a 58 ff 01 00 00 00  stdw [r10 - 0xa8], 0x1
05f980: 7a 0a 68 ff 01 00 00 00  stdw [r10 - 0x98], 0x1
05f988: bf a7 00 00 00 00 00 00  mov64 r7, r10
05f990: 07 07 00 00 a0 fd ff ff  add64 r7, -0x260
05f998: bf a5 00 00 00 00 00 00  mov64 r5, r10
05f9a0: 07 05 00 00 58 ff ff ff  add64 r5, -0xa8
05f9a8: bf 71 00 00 00 00 00 00  mov64 r1, r7
05f9b0: 18 02 00 00 df 79 1b 00 00 00 00 00 00 00 00 00  lddw r2, 0x1b79df
05f9c0: bf 63 00 00 00 00 00 00  mov64 r3, r6
05f9c8: bf 94 00 00 00 00 00 00  mov64 r4, r9
05f9d0: 85 10 00 00 e1 8f 02 00  call 0x28fe1 ; direct target 0x1a78e0
05f9d8: bf a6 00 00 00 00 00 00  mov64 r6, r10
05f9e0: 07 06 00 00 58 ff ff ff  add64 r6, -0xa8
05f9e8: bf 61 00 00 00 00 00 00  mov64 r1, r6
05f9f0: bf 82 00 00 00 00 00 00  mov64 r2, r8
05f9f8: b7 03 00 00 30 00 00 00  mov64 r3, 0x30
05fa00: 85 10 00 00 81 a7 02 00  call 0x2a781 ; direct target 0x1b3610
05fa08: bf a1 00 00 00 00 00 00  mov64 r1, r10
05fa10: 07 01 00 00 88 ff ff ff  add64 r1, -0x78
05fa18: 7b 1a 88 fe 00 00 00 00  stxdw [r10 - 0x178], r1
05fa20: bf a1 00 00 00 00 00 00  mov64 r1, r10
05fa28: 07 01 00 00 af ff ff ff  add64 r1, -0x51
05fa30: 7b 1a 98 ff 00 00 00 00  stxdw [r10 - 0x68], r1
05fa38: 18 01 00 00 07 68 1b 00 00 00 00 00 00 00 00 00  lddw r1, 0x1b6807
05fa48: 7b 1a 88 ff 00 00 00 00  stxdw [r10 - 0x78], r1
05fa50: 79 a1 a8 f5 00 00 00 00  ldxdw r1, [r10 - 0xa58]
05fa58: 73 1a af ff 00 00 00 00  stxb [r10 - 0x51], r1
05fa60: 7a 0a 90 fe 02 00 00 00  stdw [r10 - 0x170], 0x2
05fa68: 7a 0a a0 ff 01 00 00 00  stdw [r10 - 0x60], 0x1
05fa70: 7a 0a 90 ff 11 00 00 00  stdw [r10 - 0x70], 0x11
05fa78: bf a1 00 00 00 00 00 00  mov64 r1, r10
05fa80: 07 01 00 00 88 fe ff ff  add64 r1, -0x178
05fa88: 7b 1a 00 f0 00 00 00 00  stxdw [r10 - 0x1000], r1
05fa90: 7a 0a 08 f0 01 00 00 00  stdw [r10 - 0xff8], 0x1
05fa98: bf a1 00 00 00 00 00 00  mov64 r1, r10
05faa0: 07 01 00 00 40 ff ff ff  add64 r1, -0xc0
05faa8: bf a5 00 00 00 00 00 00  mov64 r5, r10
05fab0: bf 72 00 00 00 00 00 00  mov64 r2, r7
05fab8: bf 63 00 00 00 00 00 00  mov64 r3, r6
05fac0: b7 04 00 00 01 00 00 00  mov64 r4, 0x1
05fac8: 85 10 00 00 4c 81 02 00  call 0x2814c ; direct target 0x1a0530
05fad0: 18 01 00 00 1a 00 00 00 00 00 00 00 00 00 00 80  lddw r1, -0x7fffffffffffffe6
05fae0: 79 a2 40 ff 00 00 00 00  ldxdw r2, [r10 - 0xc0]
05fae8: 1d 12 01 00 00 00 00 00  jeq r2, r1, +0x1 <.text+0x5f9d8> ; branch 0x5faf8
05faf0: 05 00 11 00 00 00 00 00  ja +0x11 <.text+0x5fa60> ; branch 0x5fb80
05faf8: 79 a1 68 ff 00 00 00 00  ldxdw r1, [r10 - 0x98]
05fb00: 79 a2 60 ff 00 00 00 00  ldxdw r2, [r10 - 0xa0]
05fb08: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05fb10: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05fb18: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05fb20: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5fa20> ; branch 0x5fb40
05fb28: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05fb30: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05fb38: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05fb40: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05fb48: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05fb50: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05fb58: 55 02 e9 fd 00 00 00 00  jne r2, 0x0, -0x217 <.text+0x5e988> ; branch 0x5eaa8
05fb60: 79 12 08 00 00 00 00 00  ldxdw r2, [r1 + 0x8]
05fb68: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05fb70: 7b 21 08 00 00 00 00 00  stxdw [r1 + 0x8], r2
05fb78: 05 00 e5 fd 00 00 00 00  ja -0x21b <.text+0x5e988> ; branch 0x5eaa8
05fb80: bf a1 00 00 00 00 00 00  mov64 r1, r10
05fb88: 07 01 00 00 38 f6 ff ff  add64 r1, -0x9c8
05fb90: bf a2 00 00 00 00 00 00  mov64 r2, r10
05fb98: 07 02 00 00 40 ff ff ff  add64 r2, -0xc0
05fba0: 85 10 00 00 02 78 02 00  call 0x27802 ; direct target 0x19bbb8
05fba8: 79 a1 38 f6 00 00 00 00  ldxdw r1, [r10 - 0x9c8]
05fbb0: 79 a2 40 f6 00 00 00 00  ldxdw r2, [r10 - 0x9c0]
05fbb8: 79 a3 a0 f5 00 00 00 00  ldxdw r3, [r10 - 0xa60]
05fbc0: 7b 23 08 00 00 00 00 00  stxdw [r3 + 0x8], r2
05fbc8: 7b 13 00 00 00 00 00 00  stxdw [r3 + 0x0], r1
05fbd0: 72 03 5a 00 02 00 00 00  stb [r3 + 0x5a], 0x2
05fbd8: 79 a1 68 ff 00 00 00 00  ldxdw r1, [r10 - 0x98]
05fbe0: 79 a2 60 ff 00 00 00 00  ldxdw r2, [r10 - 0xa0]
05fbe8: 79 23 00 00 00 00 00 00  ldxdw r3, [r2 + 0x0]
05fbf0: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05fbf8: 7b 32 00 00 00 00 00 00  stxdw [r2 + 0x0], r3
05fc00: 55 03 03 00 00 00 00 00  jne r3, 0x0, +0x3 <.text+0x5fb00> ; branch 0x5fc20
05fc08: 79 23 08 00 00 00 00 00  ldxdw r3, [r2 + 0x8]
05fc10: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
05fc18: 7b 32 08 00 00 00 00 00  stxdw [r2 + 0x8], r3
05fc20: 79 12 00 00 00 00 00 00  ldxdw r2, [r1 + 0x0]
05fc28: 07 02 00 00 ff ff ff ff  add64 r2, -0x1
05fc30: 7b 21 00 00 00 00 00 00  stxdw [r1 + 0x0], r2
05fc38: 55 02 3d fb 00 00 00 00  jne r2, 0x0, -0x4c3 <.text+0x5d508> ; branch 0x5d628
05fc40: 05 00 39 fb 00 00 00 00  ja -0x4c7 <.text+0x5d4f0> ; branch 0x5d610
