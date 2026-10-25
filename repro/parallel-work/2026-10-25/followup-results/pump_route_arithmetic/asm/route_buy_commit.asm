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
