04ea90: mov64 r7, r5
04ea98: mov64 r8, r2
04eaa0: mov64 r6, r1
04eaa8: jlt r7, r3, +0x22 ; branch 0x4ebc0
04eab0: mov64 r1, r10
04eab8: add64 r1, -0x60
04eac0: lddw r2, 0x11c0ac ; rodata b'>\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffe'
04ead0: call 0x4d24 ; call 0x753f8
04ead8: stdw [r10 - 0x128], 0x0
04eae0: stdw [r10 - 0x130], 0x1
04eae8: stdw [r10 - 0x138], 0x0
04eaf0: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04eb00: stxdw [r10 - 0x20], r1
04eb08: mov64 r1, r10
04eb10: add64 r1, -0x138
04eb18: stxdw [r10 - 0x28], r1
04eb20: stb [r10 - 0x10], 0x3
04eb28: stdw [r10 - 0x18], 0x20
04eb30: stdw [r10 - 0x38], 0x0
04eb38: stdw [r10 - 0x48], 0x0
04eb40: mov64 r2, r10
04eb48: add64 r2, -0x48
04eb50: lddw r1, 0x11c0ac ; rodata b'>\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffe'
04eb60: call 0x5807 ; call 0x7aba0
04eb68: jeq r0, 0x0, +0x4e ; branch 0x4ede0
04eb70: mov64 r3, r10
04eb78: add64 r3, -0x1
04eb80: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
04eb90: mov64 r2, 0x37
04eb98: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
04eba8: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
04ebb8: call 0x1887b ; call 0x112f98
04ebc0: stxdw [r10 - 0x38], r4
04ebc8: lddw r1, 0x11cd62 ; rodata b'pool-v2programs/pump-amm/src/instructions/swap/trade_v2.rsbuy_v2buy_exact_q'
04ebd8: stxdw [r10 - 0x48], r1
04ebe0: stdw [r10 - 0x30], 0x20
04ebe8: stdw [r10 - 0x40], 0x7
04ebf0: mov64 r1, r10
04ebf8: add64 r1, -0x118
04ec00: mov64 r2, r10
04ec08: add64 r2, -0x48
04ec10: mov64 r9, 0x2
04ec18: mov64 r3, 0x2
04ec20: lddw r4, 0x11e53e ; rodata b'\x0c\x14\xde\xfc\x82^\xc6v\x94%\x08\x18\xbbe@e\xf4)\x8d1V\xd5q\xb4\xd4\xf8\t\x0c\x18\xe9\xa8c\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15h\xbf\x17[\xaaQ\x89\xcb\x97\xf5\xd2\xff;e]+\xb6\xfdm\x18\xb0\x01V\xe0\xf6\x93fZ\xcfD\xdb\x15'
04ec30: call 0x17e86 ; call 0x10e068
04ec38: ldxdw r1, [r10 - 0x100]
04ec40: stxdw [r10 - 0x120], r1
04ec48: ldxdw r1, [r10 - 0x108]
04ec50: stxdw [r10 - 0x128], r1
04ec58: ldxdw r1, [r10 - 0x110]
04ec60: stxdw [r10 - 0x130], r1
04ec68: ldxdw r1, [r10 - 0x118]
04ec70: stxdw [r10 - 0x138], r1
04ec78: mul64 r7, 0x30
04ec80: add64 r8, r7
04ec88: ldxdw r1, [r8 + 0x0]
04ec90: ldxdw r2, [r1 + 0x18]
04ec98: stxdw [r10 - 0x100], r2
04eca0: ldxdw r2, [r1 + 0x10]
04eca8: stxdw [r10 - 0x108], r2
04ecb0: ldxdw r2, [r1 + 0x8]
04ecb8: stxdw [r10 - 0x110], r2
04ecc0: ldxdw r1, [r1 + 0x0]
04ecc8: stxdw [r10 - 0x118], r1
04ecd0: mov64 r1, r10
04ecd8: add64 r1, -0x118
04ece0: mov64 r2, r10
04ece8: add64 r2, -0x138
04ecf0: mov64 r3, 0x20
04ecf8: call 0x1957c ; call 0x1198e0
04ed00: lsh64 r0, 0x20
04ed08: rsh64 r0, 0x20
04ed10: jeq r0, 0x0, +0x51 ; branch 0x4efa0
04ed18: mov64 r1, r10
04ed20: add64 r1, -0x78
04ed28: lddw r2, 0x11c0ac ; rodata b'>\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffe'
04ed38: call 0x4cd7 ; call 0x753f8
04ed40: stdw [r10 - 0x50], 0x0
04ed48: stdw [r10 - 0x58], 0x1
04ed50: stdw [r10 - 0x60], 0x0
04ed58: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
04ed68: stxdw [r10 - 0x20], r1
04ed70: mov64 r1, r10
04ed78: add64 r1, -0x60
04ed80: stxdw [r10 - 0x28], r1
04ed88: stb [r10 - 0x10], 0x3
04ed90: stdw [r10 - 0x18], 0x20
04ed98: stdw [r10 - 0x38], 0x0
04eda0: stdw [r10 - 0x48], 0x0
04eda8: mov64 r2, r10
04edb0: add64 r2, -0x48
04edb8: lddw r1, 0x11c0ac ; rodata b'>\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/mod.rsfailed to fill whole buffe'
04edc8: call 0x57ba ; call 0x7aba0
04edd0: jeq r0, 0x0, +0x1d ; branch 0x4eec0
04edd8: ja -0x4e ; branch 0x4eb70
04ede0: ldxdw r1, [r10 - 0x128]
04ede8: stxdw [r10 - 0xd0], r1
04edf0: ldxdw r1, [r10 - 0x130]
04edf8: stxdw [r10 - 0xd8], r1
04ee00: ldxdw r1, [r10 - 0x138]
04ee08: stxdw [r10 - 0xe0], r1
04ee10: ldxdw r1, [r10 - 0x60]
04ee18: stxdw [r10 - 0xf8], r1
04ee20: ldxdw r1, [r10 - 0x58]
04ee28: stxdw [r10 - 0xf0], r1
04ee30: ldxdw r1, [r10 - 0x50]
04ee38: stxdw [r10 - 0xe8], r1
04ee40: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04ee50: stxdw [r10 - 0x110], r1
04ee58: stw [r10 - 0x80], 0x17ae
04ee60: stb [r10 - 0xc8], 0x2
04ee68: stw [r10 - 0x100], 0x208
04ee70: stdw [r10 - 0x108], 0x2f
04ee78: stdw [r10 - 0x118], 0x0
04ee80: mov64 r1, r10
04ee88: add64 r1, -0x148
04ee90: mov64 r2, r10
04ee98: add64 r2, -0x118
04eea0: call 0x16822 ; call 0x102fb8
04eea8: ldxdw r1, [r10 - 0x140]
04eeb0: ldxdw r9, [r10 - 0x148]
04eeb8: ja +0x1c ; branch 0x4efa0
04eec0: ldxdw r1, [r10 - 0x50]
04eec8: stxdw [r10 - 0xd0], r1
04eed0: ldxdw r1, [r10 - 0x58]
04eed8: stxdw [r10 - 0xd8], r1
04eee0: ldxdw r1, [r10 - 0x60]
04eee8: stxdw [r10 - 0xe0], r1
04eef0: ldxdw r1, [r10 - 0x78]
04eef8: stxdw [r10 - 0xf8], r1
04ef00: ldxdw r1, [r10 - 0x70]
04ef08: stxdw [r10 - 0xf0], r1
04ef10: ldxdw r1, [r10 - 0x68]
04ef18: stxdw [r10 - 0xe8], r1
04ef20: lddw r1, 0x11cd1c ; rodata b'programs/pump-amm/src/instructions/swap/sell.rsuser_volume_accumulatorpool-'
04ef30: stxdw [r10 - 0x110], r1
04ef38: stw [r10 - 0x80], 0x17ae
04ef40: stb [r10 - 0xc8], 0x2
04ef48: stw [r10 - 0x100], 0x20e
04ef50: stdw [r10 - 0x108], 0x2f
04ef58: stdw [r10 - 0x118], 0x0
04ef60: mov64 r1, r10
04ef68: add64 r1, -0x158
04ef70: mov64 r2, r10
04ef78: add64 r2, -0x118
04ef80: call 0x16806 ; call 0x102fb8
04ef88: ldxdw r1, [r10 - 0x150]
04ef90: ldxdw r9, [r10 - 0x158]
04ef98: ja +0x0 ; branch 0x4efa0
04efa0: stxdw [r6 + 0x8], r1
04efa8: stxdw [r6 + 0x0], r9
04efb0: exit
