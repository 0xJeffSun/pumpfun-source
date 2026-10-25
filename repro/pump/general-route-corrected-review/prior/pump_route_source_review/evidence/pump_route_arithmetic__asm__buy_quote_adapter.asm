0a0838: 55 03 0c 00 00 00 00 00  jne r3, 0x0, +0xc <.text+0xa0780> ; branch 0xa08a0
0a0840: bf a2 00 00 00 00 00 00  mov64 r2, r10
0a0848: 07 02 00 00 f0 ff ff ff  add64 r2, -0x10
0a0850: bf 16 00 00 00 00 00 00  mov64 r6, r1
0a0858: bf 21 00 00 00 00 00 00  mov64 r1, r2
0a0860: b7 02 00 00 18 00 00 00  mov64 r2, 0x18
0a0868: 85 10 00 00 84 7a 01 00  call 0x17a84 ; direct target 0x15dc90
0a0870: 79 a1 f0 ff 00 00 00 00  ldxdw r1, [r10 - 0x10]
0a0878: 79 a2 f8 ff 00 00 00 00  ldxdw r2, [r10 - 0x8]
0a0880: 7b 26 10 00 00 00 00 00  stxdw [r6 + 0x10], r2
0a0888: 7b 16 08 00 00 00 00 00  stxdw [r6 + 0x8], r1
0a0890: 7a 06 00 00 01 00 00 00  stdw [r6 + 0x0], 0x1
0a0898: 05 00 0a 00 00 00 00 00  ja +0xa <.text+0xa07d0> ; branch 0xa08f0
0a08a0: 79 24 48 00 00 00 00 00  ldxdw r4, [r2 + 0x48]
0a08a8: 79 22 40 00 00 00 00 00  ldxdw r2, [r2 + 0x40]
0a08b0: 7b 2a 08 f0 00 00 00 00  stxdw [r10 - 0xff8], r2
0a08b8: 07 03 00 00 ff ff ff ff  add64 r3, -0x1
0a08c0: 7a 0a 10 f0 00 00 00 00  stdw [r10 - 0xff0], 0x0
0a08c8: 7a 0a 00 f0 00 00 00 00  stdw [r10 - 0x1000], 0x0
0a08d0: bf a5 00 00 00 00 00 00  mov64 r5, r10
0a08d8: bf 32 00 00 00 00 00 00  mov64 r2, r3
0a08e0: b7 03 00 00 00 00 00 00  mov64 r3, 0x0
0a08e8: 85 10 00 00 f8 ce ff ff  call -0x3108 ; direct target 0x880b0
0a08f0: 95 00 00 00 00 00 00 00  exit
