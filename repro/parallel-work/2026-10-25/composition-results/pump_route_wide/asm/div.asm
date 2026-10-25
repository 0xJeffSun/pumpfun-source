1b4088: bf 16 00 00 00 00 00 00  mov64 r6, r1
1b4090: bf a1 00 00 00 00 00 00  mov64 r1, r10
1b4098: 07 01 00 00 e0 ff ff ff  add64 r1, -0x20
1b40a0: 85 10 00 00 05 00 00 00  call 0x5 ; call target 0x1b40d0
1b40a8: 79 a1 e0 ff 00 00 00 00  ldxdw r1, [r10 - 0x20]
1b40b0: 79 a2 e8 ff 00 00 00 00  ldxdw r2, [r10 - 0x18]
1b40b8: 7b 26 08 00 00 00 00 00  stxdw [r6 + 0x8], r2
1b40c0: 7b 16 00 00 00 00 00 00  stxdw [r6 + 0x0], r1
1b40c8: 95 00 00 00 00 00 00 00  exit
