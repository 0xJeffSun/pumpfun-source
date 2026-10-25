058e08: mov64 r7, r2
058e10: stxdw [r10 - 0x148], r1
058e18: ldxdw r1, [r3 + 0x18]
058e20: stxdw [r10 - 0x118], r1
058e28: ldxdw r1, [r3 + 0x10]
058e30: stxdw [r10 - 0x120], r1
058e38: ldxdw r1, [r3 + 0x8]
058e40: stxdw [r10 - 0x128], r1
058e48: ldxdw r1, [r3 + 0x0]
058e50: stxdw [r10 - 0x130], r1
058e58: and64 r4, 0xff
058e60: jne r4, 0x0, +0x21 ; branch 0x58f70
058e68: mov64 r8, 0x0
058e70: mov64 r9, 0x8
058e78: add64 r7, 0x8
058e80: mov64 r6, 0x8
058e88: ja +0x6 ; branch 0x58ec0
058e90: mov64 r8, r9
058e98: mov64 r9, r1
058ea0: sub64 r9, r8
058ea8: mov64 r6, r1
058eb0: jgt r1, r8, +0x1 ; branch 0x58ec0
058eb8: ja +0x6b ; branch 0x59218
058ec0: rsh64 r9, 0x1
058ec8: add64 r9, r8
058ed0: mov64 r2, r9
058ed8: lsh64 r2, 0x5
058ee0: mov64 r1, r7
058ee8: add64 r1, r2
058ef0: mov64 r2, r10
058ef8: add64 r2, -0x130
058f00: mov64 r3, 0x20
058f08: call 0x1813a ; call 0x1198e0
058f10: lsh64 r0, 0x20
058f18: mov64 r1, r0
058f20: rsh64 r1, 0x20
058f28: jeq r1, 0x0, +0x22 ; branch 0x59040
058f30: arsh64 r0, 0x20
058f38: mov64 r1, r9
058f40: jsgt r0, 0x0, +0x1 ; branch 0x58f50
058f48: mov64 r1, r6
058f50: add64 r9, 0x1
058f58: jslt r0, 0x0, -0x1a ; branch 0x58e90
058f60: mov64 r9, r8
058f68: ja -0x1c ; branch 0x58e90
058f70: ldxdw r1, [r7 + 0x280]
058f78: stxdw [r10 - 0xf8], r1
058f80: ldxdw r1, [r7 + 0x278]
058f88: stxdw [r10 - 0x100], r1
058f90: ldxdw r1, [r7 + 0x270]
058f98: stxdw [r10 - 0x108], r1
058fa0: ldxdw r1, [r7 + 0x268]
058fa8: stxdw [r10 - 0x110], r1
058fb0: mov64 r1, r10
058fb8: add64 r1, -0x130
058fc0: mov64 r2, r10
058fc8: add64 r2, -0x110
058fd0: mov64 r3, 0x20
058fd8: call 0x18120 ; call 0x1198e0
058fe0: lsh64 r0, 0x20
058fe8: rsh64 r0, 0x20
058ff0: jeq r0, 0x0, +0x9 ; branch 0x59040
058ff8: mov64 r1, r7
059000: add64 r1, 0x288
059008: mov64 r2, r10
059010: add64 r2, -0x130
059018: mov64 r3, 0x20
059020: call 0x18117 ; call 0x1198e0
059028: lsh64 r0, 0x20
059030: rsh64 r0, 0x20
059038: jne r0, 0x0, +0x5 ; branch 0x59068
059040: mov64 r1, 0x2
059048: ldxdw r3, [r10 - 0x148]
059050: stxdw [r3 + 0x8], r2
059058: stxdw [r3 + 0x0], r1
059060: exit
059068: mov64 r1, r7
059070: add64 r1, 0x2a8
059078: mov64 r2, r10
059080: add64 r2, -0x130
059088: mov64 r3, 0x20
059090: call 0x18109 ; call 0x1198e0
059098: lsh64 r0, 0x20
0590a0: rsh64 r0, 0x20
0590a8: jeq r0, 0x0, -0xe ; branch 0x59040
0590b0: mov64 r1, r7
0590b8: add64 r1, 0x2c8
0590c0: mov64 r2, r10
0590c8: add64 r2, -0x130
0590d0: mov64 r3, 0x20
0590d8: call 0x18100 ; call 0x1198e0
0590e0: lsh64 r0, 0x20
0590e8: rsh64 r0, 0x20
0590f0: jeq r0, 0x0, -0x17 ; branch 0x59040
0590f8: mov64 r1, r7
059100: add64 r1, 0x2e8
059108: mov64 r2, r10
059110: add64 r2, -0x130
059118: mov64 r3, 0x20
059120: call 0x180f7 ; call 0x1198e0
059128: lsh64 r0, 0x20
059130: rsh64 r0, 0x20
059138: jeq r0, 0x0, -0x20 ; branch 0x59040
059140: mov64 r1, r7
059148: add64 r1, 0x308
059150: mov64 r2, r10
059158: add64 r2, -0x130
059160: mov64 r3, 0x20
059168: call 0x180ee ; call 0x1198e0
059170: lsh64 r0, 0x20
059178: rsh64 r0, 0x20
059180: jeq r0, 0x0, -0x29 ; branch 0x59040
059188: mov64 r1, r7
059190: add64 r1, 0x328
059198: mov64 r2, r10
0591a0: add64 r2, -0x130
0591a8: mov64 r3, 0x20
0591b0: call 0x180e5 ; call 0x1198e0
0591b8: lsh64 r0, 0x20
0591c0: rsh64 r0, 0x20
0591c8: jeq r0, 0x0, -0x32 ; branch 0x59040
0591d0: add64 r7, 0x348
0591d8: mov64 r2, r10
0591e0: add64 r2, -0x130
0591e8: mov64 r1, r7
0591f0: mov64 r3, 0x20
0591f8: call 0x180dc ; call 0x1198e0
059200: lsh64 r0, 0x20
059208: rsh64 r0, 0x20
059210: jeq r0, 0x0, -0x3b ; branch 0x59040
059218: mov64 r1, r10
059220: add64 r1, -0x70
059228: lddw r2, 0x11c08c ; rodata b'\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/'
059238: call 0x3837 ; call 0x753f8
059240: stdw [r10 - 0x48], 0x0
059248: stdw [r10 - 0x50], 0x1
059250: stdw [r10 - 0x58], 0x0
059258: lddw r1, 0x1221e0 ; rodata b'\x00\x00\x00\x000\x9b\x00\x00\x18\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xaf\x00\x00\x00\x00\x00\x00P\xac\x00\x00\x00\x00\x00\x00\x98\x89\x00\x00\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
059268: stxdw [r10 - 0x18], r1
059270: mov64 r1, r10
059278: add64 r1, -0x58
059280: stxdw [r10 - 0x20], r1
059288: stb [r10 - 0x8], 0x3
059290: stdw [r10 - 0x10], 0x20
059298: stdw [r10 - 0x30], 0x0
0592a0: stdw [r10 - 0x40], 0x0
0592a8: mov64 r2, r10
0592b0: add64 r2, -0x40
0592b8: lddw r1, 0x11c08c ; rodata b'\r\x00\x00\x006\x00\x00\x00\xba\x0b\x00\x000\x00\x00\x00\x1b\x00\x00\x00#\x00\x00\x00\x11\x00\x00\x00    >\x00\x00\x00N\x00\x00\x00data\x15\x00\x00\x00Q\x00\x00\x00,\x00\x00\x00mint8\x00\x00\x00!\x00\x00\x00src/de/'
0592c8: call 0x431a ; call 0x7aba0
0592d0: jeq r0, 0x0, +0xa ; branch 0x59328
0592d8: mov64 r3, r10
0592e0: add64 r3, -0x110
0592e8: lddw r1, 0x11c0fa ; rodata b'a Display implementation returned an error unexpectedly/home/runner/work/pl'
0592f8: mov64 r2, 0x37
059300: lddw r4, 0x122210 ; rodata b'\x00\x00\x00\x00(\x9b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \xac\x00\x00\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00'
059310: lddw r5, 0x122230 ; rodata b'\x00\x00\x00\x001\xc1\x11\x00T\x00\x00\x00\x00\x00\x00\x00\xff\t\x00\x00\x0e\x00\x00\x00\x00\x00\x00\x00 \x9b\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`\x86\x00\x00\x00\x00\x00\x00\xd0\xc0\x11\x00\r\x00\x00\x00\x00\x00\x00\x00\xa1\x00\x00'
059320: call 0x1738e ; call 0x112f98
059328: ldxdw r1, [r10 - 0x48]
059330: stxdw [r10 - 0xc8], r1
059338: ldxdw r1, [r10 - 0x50]
059340: stxdw [r10 - 0xd0], r1
059348: ldxdw r1, [r10 - 0x58]
059350: stxdw [r10 - 0xd8], r1
059358: ldxdw r1, [r10 - 0x70]
059360: stxdw [r10 - 0xf0], r1
059368: ldxdw r1, [r10 - 0x68]
059370: stxdw [r10 - 0xe8], r1
059378: ldxdw r1, [r10 - 0x60]
059380: stxdw [r10 - 0xe0], r1
059388: lddw r1, 0x11cdb7 ; rodata b'programs/pump-amm/src/instructions/swap/mod.rsprograms/pump-amm/src/instruc'
059398: stxdw [r10 - 0x108], r1
0593a0: stw [r10 - 0x78], 0x177d
0593a8: stb [r10 - 0xc0], 0x2
0593b0: stw [r10 - 0xf8], 0xa4
0593b8: stdw [r10 - 0x100], 0x2e
0593c0: stdw [r10 - 0x110], 0x0
0593c8: mov64 r1, r10
0593d0: add64 r1, -0x140
0593d8: mov64 r2, r10
0593e0: add64 r2, -0x110
0593e8: call 0x15379 ; call 0x102fb8
0593f0: ldxdw r2, [r10 - 0x138]
0593f8: ldxdw r1, [r10 - 0x140]
059400: ja -0x78 ; branch 0x59048
