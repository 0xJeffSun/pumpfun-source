0b7a50: mov64 r7, r3
0b7a58: mov64 r8, r2
0b7a60: mov64 r6, r1
0b7a68: ldxdw r1, [r8 + 0x8]
0b7a70: ldxdw r9, [r1 + 0x20]
0b7a78: mov64 r2, r7
0b7a80: mov64 r3, 0x20
0b7a88: call 0xc3ca ; call 0x1198e0
0b7a90: lsh64 r0, 0x20
0b7a98: rsh64 r0, 0x20
0b7aa0: jne r0, 0x0, +0x1b ; branch 0xb7b80
0b7aa8: mov64 r1, r9
0b7ab0: call 0x9692 ; call 0x102f48
0b7ab8: jne r0, 0x0, +0x18 ; branch 0xb7b80
0b7ac0: mov64 r1, r10
0b7ac8: add64 r1, -0x18
0b7ad0: mov64 r2, r9
0b7ad8: call 0xa2e7 ; call 0x109218
0b7ae0: ldxdw r1, [r10 - 0x8]
0b7ae8: ldxdw r2, [r10 - 0x18]
0b7af0: lddw r3, -0x7fffffffffffffe6
0b7b00: jne r2, r3, +0x4 ; branch 0xb7b28
0b7b08: ldxdw r2, [r1 + 0x0]
0b7b10: add64 r2, 0x1
0b7b18: stxdw [r1 + 0x0], r2
0b7b20: ja +0xb ; branch 0xb7b80
0b7b28: ldxdw r3, [r10 - 0x10]
0b7b30: stxdw [r10 - 0x8], r1
0b7b38: stxdw [r10 - 0x10], r3
0b7b40: stxdw [r10 - 0x18], r2
0b7b48: mov64 r1, r10
0b7b50: add64 r1, -0x28
0b7b58: mov64 r2, r10
0b7b60: add64 r2, -0x18
0b7b68: call 0x969a ; call 0x103040
0b7b70: ldxdw r2, [r10 - 0x28]
0b7b78: jne r2, 0x2, +0x3a ; branch 0xb7d50
0b7b80: ldxdw r1, [r8 + 0x10]
0b7b88: ldxdw r9, [r1 + 0x20]
0b7b90: mov64 r2, r7
0b7b98: mov64 r3, 0x20
0b7ba0: call 0xc3a7 ; call 0x1198e0
0b7ba8: lsh64 r0, 0x20
0b7bb0: rsh64 r0, 0x20
0b7bb8: jne r0, 0x0, +0x1c ; branch 0xb7ca0
0b7bc0: mov64 r1, r9
0b7bc8: call 0x966f ; call 0x102f48
0b7bd0: jne r0, 0x0, +0x19 ; branch 0xb7ca0
0b7bd8: mov64 r1, r10
0b7be0: add64 r1, -0x18
0b7be8: mov64 r2, r9
0b7bf0: call 0xa2c4 ; call 0x109218
0b7bf8: ldxdw r1, [r10 - 0x8]
0b7c00: ldxdw r2, [r10 - 0x18]
0b7c08: lddw r3, -0x7fffffffffffffe6
0b7c18: jne r2, r3, +0x4 ; branch 0xb7c40
0b7c20: ldxdw r2, [r1 + 0x0]
0b7c28: add64 r2, 0x1
0b7c30: stxdw [r1 + 0x0], r2
0b7c38: ja +0xc ; branch 0xb7ca0
0b7c40: ldxdw r3, [r10 - 0x10]
0b7c48: stxdw [r10 - 0x8], r1
0b7c50: stxdw [r10 - 0x10], r3
0b7c58: stxdw [r10 - 0x18], r2
0b7c60: mov64 r1, r10
0b7c68: add64 r1, -0x48
0b7c70: mov64 r2, r10
0b7c78: add64 r2, -0x18
0b7c80: call 0x9677 ; call 0x103040
0b7c88: ldxdw r2, [r10 - 0x48]
0b7c90: jeq r2, 0x2, +0x1 ; branch 0xb7ca0
0b7c98: ja +0x20 ; branch 0xb7da0
0b7ca0: ldxdw r2, [r8 + 0x28]
0b7ca8: mov64 r1, r10
0b7cb0: add64 r1, -0x68
0b7cb8: lddw r3, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
0b7cc8: mov64 r4, r7
0b7cd0: call -0x16684 ; call 0x48b8
0b7cd8: mov64 r3, 0x2
0b7ce0: ldxdw r2, [r10 - 0x68]
0b7ce8: jeq r2, 0x2, +0x9 ; branch 0xb7d38
0b7cf0: ldxdw r3, [r10 - 0x60]
0b7cf8: mov64 r1, r10
0b7d00: add64 r1, -0x78
0b7d08: lddw r4, 0x11cd4b ; rodata b'user_volume_accumulatorpool-v2programs/pump-amm/src/instructions/swap/trade'
0b7d18: mov64 r5, 0x17
0b7d20: call -0x16bf6 ; call 0x1d78
0b7d28: ldxdw r1, [r10 - 0x70]
0b7d30: ldxdw r3, [r10 - 0x78]
0b7d38: stxdw [r6 + 0x8], r1
0b7d40: stxdw [r6 + 0x0], r3
0b7d48: exit
0b7d50: ldxdw r3, [r10 - 0x20]
0b7d58: mov64 r1, r10
0b7d60: add64 r1, -0x38
0b7d68: lddw r4, 0x11e37d ; rodata b'user_in_token_accountuser_out_token_accountbuyback_fee_recipientpump_event_'
0b7d78: mov64 r5, 0x15
0b7d80: call -0x16c02 ; call 0x1d78
0b7d88: ldxdw r1, [r10 - 0x30]
0b7d90: ldxdw r3, [r10 - 0x38]
0b7d98: ja -0xd ; branch 0xb7d38
0b7da0: ldxdw r3, [r10 - 0x40]
0b7da8: mov64 r1, r10
0b7db0: add64 r1, -0x58
0b7db8: lddw r4, 0x11e392 ; rodata b'user_out_token_accountbuyback_fee_recipientpump_event_authoritypump_fee_con'
0b7dc8: mov64 r5, 0x16
0b7dd0: call -0x16c0c ; call 0x1d78
0b7dd8: ldxdw r1, [r10 - 0x50]
0b7de0: ldxdw r3, [r10 - 0x58]
0b7de8: ja -0x17 ; branch 0xb7d38
