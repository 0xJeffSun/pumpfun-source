0b8f18: mov64 r7, r3
0b8f20: mov64 r8, r2
0b8f28: mov64 r6, r1
0b8f30: ldxdw r2, [r8 + 0x10]
0b8f38: mov64 r1, r10
0b8f40: add64 r1, -0x28
0b8f48: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0b8f58: mov64 r4, r7
0b8f60: call -0x169ab ; call 0x4210
0b8f68: ldxdw r2, [r10 - 0x28]
0b8f70: jne r2, 0x2, +0x18 ; branch 0xb9038
0b8f78: ldxdw r1, [r8 + 0x18]
0b8f80: ldxdw r9, [r1 + 0x20]
0b8f88: mov64 r2, r7
0b8f90: mov64 r3, 0x20
0b8f98: call 0xc128 ; call 0x1198e0
0b8fa0: lsh64 r0, 0x20
0b8fa8: rsh64 r0, 0x20
0b8fb0: jne r0, 0x0, +0x26 ; branch 0xb90e8
0b8fb8: mov64 r1, r9
0b8fc0: call 0x93f0 ; call 0x102f48
0b8fc8: jne r0, 0x0, +0x23 ; branch 0xb90e8
0b8fd0: mov64 r1, r10
0b8fd8: add64 r1, -0x18
0b8fe0: mov64 r2, r9
0b8fe8: call 0xa045 ; call 0x109218
0b8ff0: ldxdw r1, [r10 - 0x8]
0b8ff8: ldxdw r2, [r10 - 0x18]
0b9000: lddw r3, -0x7fffffffffffffe6
0b9010: jne r2, r3, +0xe ; branch 0xb9088
0b9018: ldxdw r2, [r1 + 0x0]
0b9020: add64 r2, 0x1
0b9028: stxdw [r1 + 0x0], r2
0b9030: ja +0x16 ; branch 0xb90e8
0b9038: ldxdw r3, [r10 - 0x20]
0b9040: mov64 r1, r10
0b9048: add64 r1, -0x38
0b9050: lddw r4, 0x11bf8c ; rodata b'poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkindD\x00\x00'
0b9060: mov64 r5, 0x4
0b9068: call -0x16e5f ; call 0x1d78
0b9070: ldxdw r1, [r10 - 0x30]
0b9078: ldxdw r7, [r10 - 0x38]
0b9080: ja +0x16 ; branch 0xb9138
0b9088: ldxdw r3, [r10 - 0x10]
0b9090: stxdw [r10 - 0x8], r1
0b9098: stxdw [r10 - 0x10], r3
0b90a0: stxdw [r10 - 0x18], r2
0b90a8: mov64 r1, r10
0b90b0: add64 r1, -0x48
0b90b8: mov64 r2, r10
0b90c0: add64 r2, -0x18
0b90c8: call 0x93ee ; call 0x103040
0b90d0: ldxdw r2, [r10 - 0x48]
0b90d8: jeq r2, 0x2, +0x1 ; branch 0xb90e8
0b90e0: ja +0x32 ; branch 0xb9278
0b90e8: ldxdw r1, [r8 + 0x20]
0b90f0: ldxdw r8, [r1 + 0x20]
0b90f8: mov64 r2, r7
0b9100: mov64 r3, 0x20
0b9108: call 0xc0fa ; call 0x1198e0
0b9110: mov64 r7, 0x2
0b9118: lsh64 r0, 0x20
0b9120: rsh64 r0, 0x20
0b9128: jne r0, 0x0, +0x1 ; branch 0xb9138
0b9130: ja +0x3 ; branch 0xb9150
0b9138: stxdw [r6 + 0x8], r1
0b9140: stxdw [r6 + 0x0], r7
0b9148: exit
0b9150: mov64 r1, r8
0b9158: call 0x93bd ; call 0x102f48
0b9160: jne r0, 0x0, -0x6 ; branch 0xb9138
0b9168: mov64 r1, r10
0b9170: add64 r1, -0x18
0b9178: mov64 r2, r8
0b9180: call 0xa012 ; call 0x109218
0b9188: ldxdw r1, [r10 - 0x8]
0b9190: ldxdw r2, [r10 - 0x18]
0b9198: lddw r3, -0x7fffffffffffffe6
0b91a8: jne r2, r3, +0x4 ; branch 0xb91d0
0b91b0: ldxdw r2, [r1 + 0x0]
0b91b8: add64 r2, 0x1
0b91c0: stxdw [r1 + 0x0], r2
0b91c8: ja -0x13 ; branch 0xb9138
0b91d0: ldxdw r3, [r10 - 0x10]
0b91d8: stxdw [r10 - 0x8], r1
0b91e0: stxdw [r10 - 0x10], r3
0b91e8: stxdw [r10 - 0x18], r2
0b91f0: mov64 r1, r10
0b91f8: add64 r1, -0x68
0b9200: mov64 r2, r10
0b9208: add64 r2, -0x18
0b9210: call 0x93c5 ; call 0x103040
0b9218: ldxdw r2, [r10 - 0x68]
0b9220: jeq r2, 0x2, -0x1e ; branch 0xb9138
0b9228: ldxdw r3, [r10 - 0x60]
0b9230: mov64 r1, r10
0b9238: add64 r1, -0x78
0b9240: lddw r4, 0x11e17f ; rodata b'pool_quote_token_accountboost_vault_authorityquote_token_programpool_base_t'
0b9250: mov64 r5, 0x18
0b9258: call -0x16e9d ; call 0x1d78
0b9260: ldxdw r1, [r10 - 0x70]
0b9268: ldxdw r7, [r10 - 0x78]
0b9270: ja -0x28 ; branch 0xb9138
0b9278: ldxdw r3, [r10 - 0x40]
0b9280: mov64 r1, r10
0b9288: add64 r1, -0x58
0b9290: lddw r4, 0x11e1bf ; rodata b'pool_base_token_accountquote_mintbase_mintauthoritybase_token_programcoin_c'
0b92a0: mov64 r5, 0x17
0b92a8: call -0x16ea7 ; call 0x1d78
0b92b0: ldxdw r1, [r10 - 0x50]
0b92b8: ldxdw r7, [r10 - 0x58]
0b92c0: ja -0x32 ; branch 0xb9138
