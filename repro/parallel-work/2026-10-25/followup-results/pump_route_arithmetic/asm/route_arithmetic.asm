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
