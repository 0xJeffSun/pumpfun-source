0e7648: mov64 r6, r5
0e7650: mov64 r8, r4
0e7658: mov64 r9, r3
0e7660: mov64 r7, r2
0e7668: stxdw [r10 - 0x3c0], r1
0e7670: lddw r1, 0x11ca78 ; rodata b'Instruction: Buy\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00AccountNotSignerPermissionDeniedno storage '
0e7680: mov64 r2, 0x10
0e7688: call -0x1
0e7690: ldxdw r1, [r6 - 0xff8]
0e7698: jlt r1, 0x8, +0x7a ; branch 0xe7a70
0e76a0: mov64 r2, r1
0e76a8: and64 r2, -0x8
0e76b0: jeq r2, 0x8, +0x77 ; branch 0xe7a70
0e76b8: ldxdw r2, [r6 - 0x1000]
0e76c0: ldxdw r3, [r2 + 0x0]
0e76c8: mov64 r5, 0x0
0e76d0: ldxdw r4, [r2 + 0x8]
0e76d8: jeq r1, 0x10, +0x4 ; branch 0xe7700
0e76e0: ldxb r1, [r2 + 0x10]
0e76e8: jeq r1, 0x0, +0x2 ; branch 0xe7700
0e76f0: jne r1, 0x1, +0xb8 ; branch 0xe7cb8
0e76f8: mov64 r5, 0x1
0e7700: stxdw [r10 - 0x3d8], r5
0e7708: stxdw [r10 - 0x3d0], r4
0e7710: stxdw [r10 - 0x3c8], r3
0e7718: mov64 r1, -0x1
0e7720: stxb [r10 - 0x384], r1
0e7728: stxw [r10 - 0x388], r1
0e7730: stxdw [r10 - 0x8], r8
0e7738: stxdw [r10 - 0x10], r9
0e7740: mov64 r1, r10
0e7748: add64 r1, -0x388
0e7750: stxdw [r10 - 0xff8], r1
0e7758: mov64 r1, r10
0e7760: add64 r1, -0x1c8
0e7768: mov64 r3, r10
0e7770: add64 r3, -0x10
0e7778: mov64 r5, r10
0e7780: mov64 r2, r7
0e7788: call -0x78f7 ; call 0xaafd8
0e7790: ldxdw r8, [r10 - 0x1b8]
0e7798: ldxdw r6, [r10 - 0x1c0]
0e77a0: ldxdw r9, [r10 - 0x1c8]
0e77a8: lddw r1, -0x8000000000000000
0e77b8: jeq r9, r1, +0x69 ; branch 0xe7b08
0e77c0: mov64 r1, r10
0e77c8: add64 r1, -0x368
0e77d0: mov64 r2, r10
0e77d8: add64 r2, -0x1b0
0e77e0: mov64 r3, 0x1a0
0e77e8: call 0x6415 ; call 0x119898
0e77f0: stxdw [r10 - 0x370], r8
0e77f8: stxdw [r10 - 0x378], r6
0e7800: stxdw [r10 - 0x380], r9
0e7808: ldxw r1, [r10 - 0x388]
0e7810: stxw [r10 - 0x1a8], r1
0e7818: ldxb r1, [r10 - 0x384]
0e7820: stxb [r10 - 0x1a4], r1
0e7828: ldxdw r1, [r10 - 0x8]
0e7830: stxdw [r10 - 0x1b0], r1
0e7838: ldxdw r1, [r10 - 0x10]
0e7840: stxdw [r10 - 0x1b8], r1
0e7848: mov64 r1, r10
0e7850: add64 r1, -0x380
0e7858: stxdw [r10 - 0x1c0], r1
0e7860: stxdw [r10 - 0x1c8], r7
0e7868: mov64 r1, r10
0e7870: add64 r1, -0x398
0e7878: mov64 r2, r10
0e7880: add64 r2, -0x1c8
0e7888: ldxdw r3, [r10 - 0x3c8]
0e7890: ldxdw r4, [r10 - 0x3d0]
0e7898: ldxdw r5, [r10 - 0x3d8]
0e78a0: call -0x1603f ; call 0x376b0
0e78a8: ldxdw r6, [r10 - 0x398]
0e78b0: jeq r6, 0x2, +0x1 ; branch 0xe78c0
0e78b8: ja +0x4d ; branch 0xe7b28
0e78c0: mov64 r1, r10
0e78c8: add64 r1, -0x3a8
0e78d0: mov64 r2, r10
0e78d8: add64 r2, -0x380
0e78e0: mov64 r3, r7
0e78e8: call -0x6cb0 ; call 0xb1370
0e78f0: ldxdw r1, [r10 - 0x2e0]
0e78f8: ldxdw r2, [r10 - 0x2e8]
0e7900: ldxdw r3, [r2 + 0x0]
0e7908: add64 r3, -0x1
0e7910: ldxdw r8, [r10 - 0x3a0]
0e7918: ldxdw r6, [r10 - 0x3a8]
0e7920: stxdw [r2 + 0x0], r3
0e7928: jne r3, 0x0, +0x3 ; branch 0xe7948
0e7930: ldxdw r3, [r2 + 0x8]
0e7938: add64 r3, -0x1
0e7940: stxdw [r2 + 0x8], r3
0e7948: ldxdw r2, [r1 + 0x0]
0e7950: add64 r2, -0x1
0e7958: stxdw [r1 + 0x0], r2
0e7960: jne r2, 0x0, +0x3 ; branch 0xe7980
0e7968: ldxdw r2, [r1 + 0x8]
0e7970: add64 r2, -0x1
0e7978: stxdw [r1 + 0x8], r2
0e7980: ldxdw r1, [r10 - 0x2b0]
0e7988: ldxdw r2, [r10 - 0x2b8]
0e7990: ldxdw r3, [r2 + 0x0]
0e7998: add64 r3, -0x1
0e79a0: stxdw [r2 + 0x0], r3
0e79a8: jne r3, 0x0, +0x3 ; branch 0xe79c8
0e79b0: ldxdw r3, [r2 + 0x8]
0e79b8: add64 r3, -0x1
0e79c0: stxdw [r2 + 0x8], r3
0e79c8: ldxdw r2, [r1 + 0x0]
0e79d0: add64 r2, -0x1
0e79d8: stxdw [r1 + 0x0], r2
0e79e0: jne r2, 0x0, +0x3 ; branch 0xe7a00
0e79e8: ldxdw r2, [r1 + 0x8]
0e79f0: add64 r2, -0x1
0e79f8: stxdw [r1 + 0x8], r2
0e7a00: ldxdw r1, [r10 - 0x280]
0e7a08: ldxdw r2, [r10 - 0x288]
0e7a10: ldxdw r3, [r2 + 0x0]
0e7a18: add64 r3, -0x1
0e7a20: stxdw [r2 + 0x0], r3
0e7a28: jne r3, 0x0, +0x3 ; branch 0xe7a48
0e7a30: ldxdw r3, [r2 + 0x8]
0e7a38: add64 r3, -0x1
0e7a40: stxdw [r2 + 0x8], r3
0e7a48: ldxdw r2, [r1 + 0x0]
0e7a50: add64 r2, -0x1
0e7a58: stxdw [r1 + 0x0], r2
0e7a60: jne r2, 0x0, +0x14 ; branch 0xe7b08
0e7a68: ja +0x45 ; branch 0xe7c98
0e7a70: lddw r1, 0x1221c8 ; rodata b'\x00\x00\x00\x00\xdd\xc0\x11\x00\x1b\x00\x00\x00\x00\x00\x00\x00%\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00'
0e7a80: call 0x4eb1 ; call 0x10f010
0e7a88: mov64 r1, r0
0e7a90: and64 r1, 0x3
0e7a98: mov64 r2, r1
0e7aa0: add64 r2, -0x2
0e7aa8: jlt r2, 0x2, +0x5 ; branch 0xe7ad8
0e7ab0: jeq r1, 0x0, +0x4 ; branch 0xe7ad8
0e7ab8: ldxdw r1, [r0 - 0x1]
0e7ac0: ldxdw r2, [r0 + 0x7]
0e7ac8: ldxdw r2, [r2 + 0x0]
0e7ad0: callx r2
0e7ad8: mov64 r1, r10
0e7ae0: add64 r1, -0x3b8
0e7ae8: mov64 r2, 0x66
0e7af0: call 0x3c68 ; call 0x105e38
0e7af8: ldxdw r8, [r10 - 0x3b0]
0e7b00: ldxdw r6, [r10 - 0x3b8]
0e7b08: ldxdw r1, [r10 - 0x3c0]
0e7b10: stxdw [r1 + 0x8], r8
0e7b18: stxdw [r1 + 0x0], r6
0e7b20: exit
0e7b28: ldxdw r8, [r10 - 0x390]
0e7b30: ldxdw r1, [r10 - 0x2e0]
0e7b38: ldxdw r2, [r10 - 0x2e8]
0e7b40: ldxdw r3, [r2 + 0x0]
0e7b48: add64 r3, -0x1
0e7b50: stxdw [r2 + 0x0], r3
0e7b58: jne r3, 0x0, +0x3 ; branch 0xe7b78
0e7b60: ldxdw r3, [r2 + 0x8]
0e7b68: add64 r3, -0x1
0e7b70: stxdw [r2 + 0x8], r3
0e7b78: ldxdw r2, [r1 + 0x0]
0e7b80: add64 r2, -0x1
0e7b88: stxdw [r1 + 0x0], r2
0e7b90: jne r2, 0x0, +0x3 ; branch 0xe7bb0
0e7b98: ldxdw r2, [r1 + 0x8]
0e7ba0: add64 r2, -0x1
0e7ba8: stxdw [r1 + 0x8], r2
0e7bb0: ldxdw r1, [r10 - 0x2b0]
0e7bb8: ldxdw r2, [r10 - 0x2b8]
0e7bc0: ldxdw r3, [r2 + 0x0]
0e7bc8: add64 r3, -0x1
0e7bd0: stxdw [r2 + 0x0], r3
0e7bd8: jne r3, 0x0, +0x3 ; branch 0xe7bf8
0e7be0: ldxdw r3, [r2 + 0x8]
0e7be8: add64 r3, -0x1
0e7bf0: stxdw [r2 + 0x8], r3
0e7bf8: ldxdw r2, [r1 + 0x0]
0e7c00: add64 r2, -0x1
0e7c08: stxdw [r1 + 0x0], r2
0e7c10: jne r2, 0x0, +0x3 ; branch 0xe7c30
0e7c18: ldxdw r2, [r1 + 0x8]
0e7c20: add64 r2, -0x1
0e7c28: stxdw [r1 + 0x8], r2
0e7c30: ldxdw r1, [r10 - 0x280]
0e7c38: ldxdw r2, [r10 - 0x288]
0e7c40: ldxdw r3, [r2 + 0x0]
0e7c48: add64 r3, -0x1
0e7c50: stxdw [r2 + 0x0], r3
0e7c58: jne r3, 0x0, +0x3 ; branch 0xe7c78
0e7c60: ldxdw r3, [r2 + 0x8]
0e7c68: add64 r3, -0x1
0e7c70: stxdw [r2 + 0x8], r3
0e7c78: ldxdw r2, [r1 + 0x0]
0e7c80: add64 r2, -0x1
0e7c88: stxdw [r1 + 0x0], r2
0e7c90: jne r2, 0x0, -0x32 ; branch 0xe7b08
0e7c98: ldxdw r2, [r1 + 0x8]
0e7ca0: add64 r2, -0x1
0e7ca8: stxdw [r1 + 0x8], r2
0e7cb0: ja -0x36 ; branch 0xe7b08
0e7cb8: stxb [r10 - 0x388], r1
0e7cc0: lddw r1, 0x122298 ; rodata b'\x00\x00\x00\x00\xa4\xc1\x11\x00\x1d\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc6\xc1\x11\x00h\x00\x00\x00\x00\x00\x00\x00Y\x02\x00\x000\x00\x00\x00\x00\x00\x00\x00.\xc2\x11\x00U\x00\x00\x00\x00\x00\x00\x00(\x0c\x00\x00\r\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00'
0e7cd0: stxdw [r10 - 0x1c8], r1
0e7cd8: mov64 r1, r10
0e7ce0: add64 r1, -0x10
0e7ce8: stxdw [r10 - 0x1b8], r1
0e7cf0: lddw r1, 0x119320
0e7d00: stxdw [r10 - 0x8], r1
0e7d08: mov64 r1, r10
0e7d10: add64 r1, -0x388
0e7d18: stxdw [r10 - 0x10], r1
0e7d20: stdw [r10 - 0x1a8], 0x0
0e7d28: stdw [r10 - 0x1c0], 0x1
0e7d30: stdw [r10 - 0x1b0], 0x1
0e7d38: mov64 r6, r10
0e7d40: add64 r6, -0x380
0e7d48: mov64 r2, r10
0e7d50: add64 r2, -0x1c8
0e7d58: mov64 r1, r6
0e7d60: call 0x52d2 ; call 0x1113f8
0e7d68: mov64 r1, 0x15
0e7d70: mov64 r2, r6
0e7d78: call -0x1bf11 ; call 0x84f8
0e7d80: ja -0x60 ; branch 0xe7a88
