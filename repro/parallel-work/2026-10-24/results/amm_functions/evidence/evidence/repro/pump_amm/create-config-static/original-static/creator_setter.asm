061b00: mov64 r7, r3
061b08: mov64 r6, r1
061b10: jgt r7, 0x3e8, +0x3 ; branch 0x61b30
061b18: stxdw [r2 + 0x390], r7
061b20: mov64 r1, 0x2
061b28: ja +0x44 ; branch 0x61d50
061b30: mov64 r1, r10
061b38: add64 r1, -0x70
061b40: lddw r2, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
061b50: call 0x2714 ; call 0x753f8
061b58: stdw [r10 - 0x48], 0x0
061b60: stdw [r10 - 0x50], 0x1
061b68: stdw [r10 - 0x58], 0x0
061b70: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
061b80: stxdw [r10 - 0x18], r1
061b88: mov64 r1, r10
061b90: add64 r1, -0x58
061b98: stxdw [r10 - 0x20], r1
061ba0: stb [r10 - 0x8], 0x3
061ba8: stdw [r10 - 0x10], 0x20
061bb0: stdw [r10 - 0x30], 0x0
061bb8: stdw [r10 - 0x40], 0x0
061bc0: mov64 r2, r10
061bc8: add64 r2, -0x40
061bd0: lddw r1, 0x11bf88 ; rodata b'\x00\x00\x00\x00poolA\x00\x00\x00\'\x00\x00\x00$\x00\x00\x00code\x0c\x00\x00\x00\xca\t\x00\x00R\x00\x00\x00\x1c\x00\x00\x00K\x00\x00\x00"\x00\x00\x00\x1e\x00\x00\x00Kind3\x00\x00\x00C\x00\x00\x007\x00\x00\x00fromkin'
061be0: call 0x31f7 ; call 0x7aba0
061be8: jeq r0, 0x0, +0xa ; branch 0x61c40
061bf0: mov64 r3, r10
061bf8: add64 r3, -0x110
061c00: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
061c10: mov64 r2, 0x37
061c18: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
061c28: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
061c38: call 0x1626b ; call 0x112f98
061c40: ldxdw r1, [r10 - 0x48]
061c48: stxdw [r10 - 0xc8], r1
061c50: ldxdw r1, [r10 - 0x50]
061c58: stxdw [r10 - 0xd0], r1
061c60: ldxdw r1, [r10 - 0x58]
061c68: stxdw [r10 - 0xd8], r1
061c70: ldxdw r1, [r10 - 0x70]
061c78: stxdw [r10 - 0xf0], r1
061c80: ldxdw r1, [r10 - 0x68]
061c88: stxdw [r10 - 0xe8], r1
061c90: ldxdw r1, [r10 - 0x60]
061c98: stxdw [r10 - 0xe0], r1
061ca0: lddw r1, 0x11ce9f ; rodata b'programs/pump-amm/src/state/global_config.rsbuyback_fee never exceeds proto'
061cb0: stxdw [r10 - 0x108], r1
061cb8: stw [r10 - 0x78], 0x1770
061cc0: stb [r10 - 0xc0], 0x2
061cc8: stw [r10 - 0xf8], 0xf3
061cd0: stdw [r10 - 0x100], 0x2c
061cd8: stdw [r10 - 0x110], 0x0
061ce0: mov64 r1, r10
061ce8: add64 r1, -0x120
061cf0: mov64 r2, r10
061cf8: add64 r2, -0x110
061d00: call 0x14256 ; call 0x102fb8
061d08: ldxdw r3, [r10 - 0x118]
061d10: ldxdw r2, [r10 - 0x120]
061d18: mov64 r1, r10
061d20: add64 r1, -0x130
061d28: mov64 r4, 0x3e8
061d30: mov64 r5, r7
061d38: call -0xc0a0 ; call 0x1840
061d40: ldxdw r2, [r10 - 0x128]
061d48: ldxdw r1, [r10 - 0x130]
061d50: stxdw [r6 + 0x8], r2
061d58: stxdw [r6 + 0x0], r1
061d60: exit
