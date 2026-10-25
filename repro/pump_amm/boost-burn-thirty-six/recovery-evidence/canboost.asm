06c248: mov64 r2, r1
06c250: mov64 r1, r10
06c258: add64 r1, -0x18
06c260: call -0x63 ; call 0x6bf50
06c268: ldxdw r1, [r10 - 0x8]
06c270: ldxdw r2, [r10 - 0x10]
06c278: mov64 r3, r2
06c280: or64 r3, r1
06c288: mov64 r0, 0x1
06c290: jne r3, 0x0, +0x1 ; branch 0x6c2a0
06c298: mov64 r0, 0x0
06c2a0: ldxdw r3, [r10 - 0x18]
06c2a8: jne r3, 0x0, +0x2 ; branch 0x6c2c0
06c2b0: and64 r0, 0x1
06c2b8: exit
06c2c0: jne r2, 0x0, +0x6 ; branch 0x6c2f8
06c2c8: ldxdw r2, [r1 + 0x0]
06c2d0: jeq r2, 0x2, +0x0 ; branch 0x6c2d8
06c2d8: mov64 r0, 0x0
06c2e0: ldxb r1, [r1 + 0x50]
06c2e8: jne r1, 0x0, -0x8 ; branch 0x6c2b0
06c2f0: ja -0x9 ; branch 0x6c2b0
06c2f8: ldxdw r2, [r1 + 0x0]
06c300: jeq r2, 0x2, +0x0 ; branch 0x6c308
06c308: mov64 r0, 0x0
06c310: ldxb r1, [r1 + 0x38]
06c318: jne r1, 0x0, -0xe ; branch 0x6c2b0
06c320: ja -0xf ; branch 0x6c2b0
