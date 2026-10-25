
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so:	file format elf64-sbf

Disassembly of section .text:

0000000000062220 <custom_panic>:
   63c88: bf 23 00 00 00 00 00 00      	mov64 r3, r2
   63c90: bf 16 00 00 00 00 00 00      	mov64 r6, r1
   63c98: 79 39 08 00 00 00 00 00      	ldxdw r9, [r3 + 0x8]
   63ca0: a5 09 9d 00 08 00 00 00      	jlt r9, 0x8, +0x9d <custom_panic+0x1f70>
   63ca8: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   63cb0: 07 01 00 00 f8 ff ff ff      	add64 r1, -0x8
   63cb8: b5 01 66 00 27 00 00 00      	jle r1, 0x27, +0x66 <custom_panic+0x1dd0>
   63cc0: 79 35 00 00 00 00 00 00      	ldxdw r5, [r3 + 0x0]
   63cc8: 79 51 0e 00 00 00 00 00      	ldxdw r1, [r5 + 0xe]
   63cd0: 71 53 16 00 00 00 00 00      	ldxb r3, [r5 + 0x16]
   63cd8: 73 3a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r3
   63ce0: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   63ce8: 15 09 60 00 30 00 00 00      	jeq r9, 0x30, +0x60 <custom_panic+0x1dd0>
   63cf0: 79 a4 c1 ff 00 00 00 00      	ldxdw r4, [r10 - 0x3f]
   63cf8: 71 53 30 00 00 00 00 00      	ldxb r3, [r5 + 0x30]
   63d00: 73 3a a7 ff 00 00 00 00      	stxb [r10 - 0x59], r3
   63d08: 15 03 06 00 00 00 00 00      	jeq r3, 0x0, +0x6 <custom_panic+0x1b20>
   63d10: 55 03 76 00 01 00 00 00      	jne r3, 0x1, +0x76 <custom_panic+0x1ea8>
   63d18: b7 03 00 00 01 00 00 00      	mov64 r3, 0x1
   63d20: bf 90 00 00 00 00 00 00      	mov64 r0, r9
   63d28: 07 00 00 00 cf ff ff ff      	add64 r0, -0x31
   63d30: 25 00 05 00 1f 00 00 00      	jgt r0, 0x1f, +0x5 <custom_panic+0x1b40>
   63d38: 05 00 56 00 00 00 00 00      	ja +0x56 <custom_panic+0x1dd0>
   63d40: b7 03 00 00 00 00 00 00      	mov64 r3, 0x0
   63d48: bf 90 00 00 00 00 00 00      	mov64 r0, r9
   63d50: 07 00 00 00 cf ff ff ff      	add64 r0, -0x31
   63d58: b5 00 52 00 1f 00 00 00      	jle r0, 0x1f, +0x52 <custom_panic+0x1dd0>
   63d60: 79 58 37 00 00 00 00 00      	ldxdw r8, [r5 + 0x37]
   63d68: 71 50 3f 00 00 00 00 00      	ldxb r0, [r5 + 0x3f]
   63d70: 73 0a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r0
   63d78: 7b 8a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r8
   63d80: bf 90 00 00 00 00 00 00      	mov64 r0, r9
   63d88: 07 00 00 00 af ff ff ff      	add64 r0, -0x51
   63d90: b5 00 4b 00 1f 00 00 00      	jle r0, 0x1f, +0x4b <custom_panic+0x1dd0>
   63d98: 79 a2 c1 ff 00 00 00 00      	ldxdw r2, [r10 - 0x3f]
   63da0: 79 50 57 00 00 00 00 00      	ldxdw r0, [r5 + 0x57]
   63da8: 71 57 5f 00 00 00 00 00      	ldxb r7, [r5 + 0x5f]
   63db0: 73 7a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r7
   63db8: 7b 0a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r0
   63dc0: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   63dc8: 07 07 00 00 8f ff ff ff      	add64 r7, -0x71
   63dd0: b5 07 43 00 0f 00 00 00      	jle r7, 0xf, +0x43 <custom_panic+0x1dd0>
   63dd8: bf 97 00 00 00 00 00 00      	mov64 r7, r9
   63de0: 07 07 00 00 7f ff ff ff      	add64 r7, -0x81
   63de8: b5 07 40 00 07 00 00 00      	jle r7, 0x7, +0x40 <custom_panic+0x1dd0>
   63df0: 7b 2a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r2
   63df8: 79 a2 c1 ff 00 00 00 00      	ldxdw r2, [r10 - 0x3f]
   63e00: 7b 2a 88 ff 00 00 00 00      	stxdw [r10 - 0x78], r2
   63e08: 79 52 79 00 00 00 00 00      	ldxdw r2, [r5 + 0x79]
   63e10: 7b 2a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r2
   63e18: 79 52 71 00 00 00 00 00      	ldxdw r2, [r5 + 0x71]
   63e20: 7b 2a 78 ff 00 00 00 00      	stxdw [r10 - 0x88], r2
   63e28: 79 57 81 00 00 00 00 00      	ldxdw r7, [r5 + 0x81]
   63e30: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   63e38: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63e40: 07 02 00 00 77 ff ff ff      	add64 r2, -0x89
   63e48: b5 02 34 00 18 00 00 00      	jle r2, 0x18, +0x34 <custom_panic+0x1dd0>
   63e50: 7b 7a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r7
   63e58: 79 a2 c7 ff 00 00 00 00      	ldxdw r2, [r10 - 0x39]
   63e60: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   63e68: 79 57 8f 00 00 00 00 00      	ldxdw r7, [r5 + 0x8f]
   63e70: 71 52 97 00 00 00 00 00      	ldxb r2, [r5 + 0x97]
   63e78: 73 2a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r2
   63e80: 7b 7a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r7
   63e88: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   63e90: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63e98: 07 02 00 00 5e ff ff ff      	add64 r2, -0xa2
   63ea0: b5 02 29 00 03 00 00 00      	jle r2, 0x3, +0x29 <custom_panic+0x1dd0>
   63ea8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63eb0: 07 02 00 00 5a ff ff ff      	add64 r2, -0xa6
   63eb8: b5 02 26 00 07 00 00 00      	jle r2, 0x7, +0x26 <custom_panic+0x1dd0>
   63ec0: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63ec8: 07 02 00 00 52 ff ff ff      	add64 r2, -0xae
   63ed0: b5 02 23 00 07 00 00 00      	jle r2, 0x7, +0x23 <custom_panic+0x1dd0>
   63ed8: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63ee0: 07 02 00 00 4a ff ff ff      	add64 r2, -0xb6
   63ee8: b5 02 20 00 17 00 00 00      	jle r2, 0x17, +0x20 <custom_panic+0x1dd0>
   63ef0: 79 a2 c1 ff 00 00 00 00      	ldxdw r2, [r10 - 0x3f]
   63ef8: 7b 2a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r2
   63f00: 61 52 a2 00 00 00 00 00      	ldxw r2, [r5 + 0xa2]
   63f08: 7b 2a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r2
   63f10: 79 52 a6 00 00 00 00 00      	ldxdw r2, [r5 + 0xa6]
   63f18: 7b 2a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r2
   63f20: 79 52 ae 00 00 00 00 00      	ldxdw r2, [r5 + 0xae]
   63f28: 7b 2a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r2
   63f30: 79 57 bc 00 00 00 00 00      	ldxdw r7, [r5 + 0xbc]
   63f38: 71 52 c4 00 00 00 00 00      	ldxb r2, [r5 + 0xc4]
   63f40: 73 2a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r2
   63f48: 7b 7a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r7
   63f50: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   63f58: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63f60: 07 02 00 00 32 ff ff ff      	add64 r2, -0xce
   63f68: b5 02 10 00 0f 00 00 00      	jle r2, 0xf, +0x10 <custom_panic+0x1dd0>
   63f70: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   63f78: 07 02 00 00 22 ff ff ff      	add64 r2, -0xde
   63f80: b5 02 0d 00 17 00 00 00      	jle r2, 0x17, +0xd <custom_panic+0x1dd0>
   63f88: 79 a2 c1 ff 00 00 00 00      	ldxdw r2, [r10 - 0x3f]
   63f90: 7b 2a 28 ff 00 00 00 00      	stxdw [r10 - 0xd8], r2
   63f98: 79 52 d6 00 00 00 00 00      	ldxdw r2, [r5 + 0xd6]
   63fa0: 7b 2a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r2
   63fa8: 79 52 ce 00 00 00 00 00      	ldxdw r2, [r5 + 0xce]
   63fb0: 7b 2a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r2
   63fb8: 79 57 e4 00 00 00 00 00      	ldxdw r7, [r5 + 0xe4]
   63fc0: 71 52 ec 00 00 00 00 00      	ldxb r2, [r5 + 0xec]
   63fc8: 73 2a c8 ff 00 00 00 00      	stxb [r10 - 0x38], r2
   63fd0: 7b 7a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r7
   63fd8: 7b 7a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r7
   63fe0: 07 09 00 00 0a ff ff ff      	add64 r9, -0xf6
   63fe8: 25 09 39 00 07 00 00 00      	jgt r9, 0x7, +0x39 <custom_panic+0x1f98>
   63ff0: 18 01 00 00 78 84 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x98478
   64000: 85 10 00 00 fe 4b 00 00      	call 0x4bfe
   64008: bf 07 00 00 00 00 00 00      	mov64 r7, r0
   64010: 7b 7a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r7
   64018: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64020: 07 01 00 00 90 ff ff ff      	add64 r1, -0x70
   64028: b7 02 00 00 bb 0b 00 00      	mov64 r2, 0xbbb
   64030: 85 10 00 00 61 3b 00 00      	call 0x3b61
   64038: 79 a9 98 ff 00 00 00 00      	ldxdw r9, [r10 - 0x68]
   64040: 79 a8 90 ff 00 00 00 00      	ldxdw r8, [r10 - 0x70]
   64048: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64050: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   64058: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   64060: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   64068: a5 02 06 00 02 00 00 00      	jlt r2, 0x2, +0x6 <custom_panic+0x1e80>
   64070: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <custom_panic+0x1e80>
   64078: 79 71 07 00 00 00 00 00      	ldxdw r1, [r7 + 0x7]
   64080: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   64088: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <custom_panic+0x1e80>
   64090: 79 71 ff ff 00 00 00 00      	ldxdw r1, [r7 - 0x1]
   64098: 8d 00 00 00 02 00 00 00      	callx r2
   640a0: 7b 96 08 00 00 00 00 00      	stxdw [r6 + 0x8], r9
   640a8: 7b 86 00 00 00 00 00 00      	stxdw [r6 + 0x0], r8
   640b0: b7 03 00 00 02 00 00 00      	mov64 r3, 0x2
   640b8: 73 36 f5 00 00 00 00 00      	stxb [r6 + 0xf5], r3
   640c0: 95 00 00 00 00 00 00 00      	exit
   640c8: 18 01 00 00 10 85 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x98510
   640d8: 7b 1a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r1
   640e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   640e8: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
   640f0: 7b 1a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r1
   640f8: 18 01 00 00 a0 0d 09 00 00 00 00 00 00 00 00 00      	lddw r1, 0x90da0
   64108: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
   64110: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   64118: 07 01 00 00 a7 ff ff ff      	add64 r1, -0x59
   64120: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
   64128: 7a 0a e0 ff 00 00 00 00      	stdw [r10 - 0x20], 0x0
   64130: 7a 0a c8 ff 01 00 00 00      	stdw [r10 - 0x38], 0x1
   64138: 7a 0a d8 ff 01 00 00 00      	stdw [r10 - 0x28], 0x1
   64140: bf a7 00 00 00 00 00 00      	mov64 r7, r10
   64148: 07 07 00 00 a8 ff ff ff      	add64 r7, -0x58
   64150: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   64158: 07 02 00 00 c0 ff ff ff      	add64 r2, -0x40
   64160: bf 71 00 00 00 00 00 00      	mov64 r1, r7
   64168: 85 10 00 00 f0 4d 00 00      	call 0x4df0
   64170: b7 01 00 00 15 00 00 00      	mov64 r1, 0x15
   64178: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   64180: 85 10 00 00 b0 2f 00 00      	call 0x2fb0
   64188: 05 00 cf ff 00 00 00 00      	ja -0x31 <custom_panic+0x1de8>
   64190: b7 01 00 00 08 00 00 00      	mov64 r1, 0x8
   64198: bf 92 00 00 00 00 00 00      	mov64 r2, r9
   641a0: 18 03 00 00 88 8e 09 00 00 00 00 00 00 00 00 00      	lddw r3, 0x98e88
   641b0: 85 10 00 00 c2 55 00 00      	call 0x55c2
   641b8: bf 52 00 00 00 00 00 00      	mov64 r2, r5
   641c0: 07 02 00 00 17 00 00 00      	add64 r2, 0x17
   641c8: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   641d0: 07 07 00 00 08 00 00 00      	add64 r7, 0x8
   641d8: 7b 7a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r7
   641e0: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   641e8: 07 07 00 00 31 00 00 00      	add64 r7, 0x31
   641f0: 7b 7a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r7
   641f8: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   64200: 07 07 00 00 40 00 00 00      	add64 r7, 0x40
   64208: 7b 7a c8 fe 00 00 00 00      	stxdw [r10 - 0x138], r7
   64210: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   64218: 07 07 00 00 60 00 00 00      	add64 r7, 0x60
   64220: 7b 7a e0 fe 00 00 00 00      	stxdw [r10 - 0x120], r7
   64228: bf 57 00 00 00 00 00 00      	mov64 r7, r5
   64230: 07 07 00 00 51 00 00 00      	add64 r7, 0x51
   64238: 7b 7a d0 fe 00 00 00 00      	stxdw [r10 - 0x130], r7
   64240: 18 09 00 00 ff ff ff ff 00 00 00 00 ff ff ff 00      	lddw r9, 0xffffffffffffff
   64250: 79 a7 60 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa0]
   64258: 5f 97 00 00 00 00 00 00      	and64 r7, r9
   64260: 7b 7a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r7
   64268: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   64270: 07 09 00 00 98 00 00 00      	add64 r9, 0x98
   64278: 7b 9a f0 fe 00 00 00 00      	stxdw [r10 - 0x110], r9
   64280: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   64288: 07 09 00 00 89 00 00 00      	add64 r9, 0x89
   64290: 7b 9a d8 fe 00 00 00 00      	stxdw [r10 - 0x128], r9
   64298: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   642a0: 07 09 00 00 c5 00 00 00      	add64 r9, 0xc5
   642a8: 7b 9a f8 fe 00 00 00 00      	stxdw [r10 - 0x108], r9
   642b0: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   642b8: 07 09 00 00 b6 00 00 00      	add64 r9, 0xb6
   642c0: 7b 9a e8 fe 00 00 00 00      	stxdw [r10 - 0x118], r9
   642c8: 79 a9 c1 ff 00 00 00 00      	ldxdw r9, [r10 - 0x3f]
   642d0: 7b 9a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r9
   642d8: 79 59 f6 00 00 00 00 00      	ldxdw r9, [r5 + 0xf6]
   642e0: 7b 9a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r9
   642e8: 79 a7 b8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x148]
   642f0: 69 79 04 00 00 00 00 00      	ldxh r9, [r7 + 0x4]
   642f8: 6b 96 64 00 00 00 00 00      	stxh [r6 + 0x64], r9
   64300: 61 79 00 00 00 00 00 00      	ldxw r9, [r7 + 0x0]
   64308: 63 96 60 00 00 00 00 00      	stxw [r6 + 0x60], r9
   64310: 71 29 18 00 00 00 00 00      	ldxb r9, [r2 + 0x18]
   64318: 73 96 87 00 00 00 00 00      	stxb [r6 + 0x87], r9
   64320: 79 29 10 00 00 00 00 00      	ldxdw r9, [r2 + 0x10]
   64328: 7b 96 7f 00 00 00 00 00      	stxdw [r6 + 0x7f], r9
   64330: 79 29 08 00 00 00 00 00      	ldxdw r9, [r2 + 0x8]
   64338: 7b 96 77 00 00 00 00 00      	stxdw [r6 + 0x77], r9
   64340: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
   64348: 7b 26 6f 00 00 00 00 00      	stxdw [r6 + 0x6f], r2
   64350: 79 a9 c0 fe 00 00 00 00      	ldxdw r9, [r10 - 0x140]
   64358: 69 92 04 00 00 00 00 00      	ldxh r2, [r9 + 0x4]
   64360: 6b 2a ac ff 00 00 00 00      	stxh [r10 - 0x54], r2
   64368: 61 92 00 00 00 00 00 00      	ldxw r2, [r9 + 0x0]
   64370: 63 2a a8 ff 00 00 00 00      	stxw [r10 - 0x58], r2
   64378: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   64380: 67 02 00 00 38 00 00 00      	lsh64 r2, 0x38
   64388: 79 a7 60 ff 00 00 00 00      	ldxdw r7, [r10 - 0xa0]
   64390: 4f 72 00 00 00 00 00 00      	or64 r2, r7
   64398: 7b 2a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r2
   643a0: 79 a7 c8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x138]
   643a8: 71 72 10 00 00 00 00 00      	ldxb r2, [r7 + 0x10]
   643b0: 73 2a df ff 00 00 00 00      	stxb [r10 - 0x21], r2
   643b8: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   643c0: 7b 2a d7 ff 00 00 00 00      	stxdw [r10 - 0x29], r2
   643c8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   643d0: 7b 2a cf ff 00 00 00 00      	stxdw [r10 - 0x31], r2
   643d8: 79 a7 d0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x130]
   643e0: 69 72 04 00 00 00 00 00      	ldxh r2, [r7 + 0x4]
   643e8: 6b 2a e4 ff 00 00 00 00      	stxh [r10 - 0x1c], r2
   643f0: 61 72 00 00 00 00 00 00      	ldxw r2, [r7 + 0x0]
   643f8: 63 2a e0 ff 00 00 00 00      	stxw [r10 - 0x20], r2
   64400: 79 a7 e0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x120]
   64408: 71 72 10 00 00 00 00 00      	ldxb r2, [r7 + 0x10]
   64410: 73 26 3f 00 00 00 00 00      	stxb [r6 + 0x3f], r2
   64418: 79 72 08 00 00 00 00 00      	ldxdw r2, [r7 + 0x8]
   64420: 7b 26 37 00 00 00 00 00      	stxdw [r6 + 0x37], r2
   64428: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   64430: 7b 26 2f 00 00 00 00 00      	stxdw [r6 + 0x2f], r2
   64438: 79 a7 d8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x128]
   64440: 69 72 04 00 00 00 00 00      	ldxh r2, [r7 + 0x4]
   64448: 6b 26 e0 00 00 00 00 00      	stxh [r6 + 0xe0], r2
   64450: 61 72 00 00 00 00 00 00      	ldxw r2, [r7 + 0x0]
   64458: 63 26 dc 00 00 00 00 00      	stxw [r6 + 0xdc], r2
   64460: 79 a7 f0 fe 00 00 00 00      	ldxdw r7, [r10 - 0x110]
   64468: 69 72 08 00 00 00 00 00      	ldxh r2, [r7 + 0x8]
   64470: 6b 26 f3 00 00 00 00 00      	stxh [r6 + 0xf3], r2
   64478: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   64480: 7b 26 eb 00 00 00 00 00      	stxdw [r6 + 0xeb], r2
   64488: 79 a7 e8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x118]
   64490: 61 72 00 00 00 00 00 00      	ldxw r2, [r7 + 0x0]
   64498: 63 26 a0 00 00 00 00 00      	stxw [r6 + 0xa0], r2
   644a0: 69 72 04 00 00 00 00 00      	ldxh r2, [r7 + 0x4]
   644a8: 6b 26 a4 00 00 00 00 00      	stxh [r6 + 0xa4], r2
   644b0: 79 a7 f8 fe 00 00 00 00      	ldxdw r7, [r10 - 0x108]
   644b8: 79 72 00 00 00 00 00 00      	ldxdw r2, [r7 + 0x0]
   644c0: 7b 26 af 00 00 00 00 00      	stxdw [r6 + 0xaf], r2
   644c8: 71 72 08 00 00 00 00 00      	ldxb r2, [r7 + 0x8]
   644d0: 73 26 b7 00 00 00 00 00      	stxb [r6 + 0xb7], r2
   644d8: 61 52 de 00 00 00 00 00      	ldxw r2, [r5 + 0xde]
   644e0: 63 26 b8 00 00 00 00 00      	stxw [r6 + 0xb8], r2
   644e8: 69 52 e2 00 00 00 00 00      	ldxh r2, [r5 + 0xe2]
   644f0: 6b 26 bc 00 00 00 00 00      	stxh [r6 + 0xbc], r2
   644f8: 71 52 f5 00 00 00 00 00      	ldxb r2, [r5 + 0xf5]
   64500: 73 26 cf 00 00 00 00 00      	stxb [r6 + 0xcf], r2
   64508: 79 52 ed 00 00 00 00 00      	ldxdw r2, [r5 + 0xed]
   64510: 7b 26 c7 00 00 00 00 00      	stxdw [r6 + 0xc7], r2
   64518: 73 8a ae ff 00 00 00 00      	stxb [r10 - 0x52], r8
   64520: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   64528: 7b 2a af ff 00 00 00 00      	stxdw [r10 - 0x51], r2
   64530: 7b 2a c7 ff 00 00 00 00      	stxdw [r10 - 0x39], r2
   64538: 79 a2 a8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x58]
   64540: 7b 2a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r2
   64548: 79 a2 c0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x40]
   64550: 7b 2a 80 ff 00 00 00 00      	stxdw [r10 - 0x80], r2
   64558: 79 a5 c8 ff 00 00 00 00      	ldxdw r5, [r10 - 0x38]
   64560: 79 a7 d0 ff 00 00 00 00      	ldxdw r7, [r10 - 0x30]
   64568: 79 a8 d8 ff 00 00 00 00      	ldxdw r8, [r10 - 0x28]
   64570: 79 a9 de ff 00 00 00 00      	ldxdw r9, [r10 - 0x22]
   64578: 79 a2 10 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf0]
   64580: 7b 26 58 00 00 00 00 00      	stxdw [r6 + 0x58], r2
   64588: 79 a2 18 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe8]
   64590: 7b 26 50 00 00 00 00 00      	stxdw [r6 + 0x50], r2
   64598: 79 a2 70 ff 00 00 00 00      	ldxdw r2, [r10 - 0x90]
   645a0: 7b 26 48 00 00 00 00 00      	stxdw [r6 + 0x48], r2
   645a8: 79 a2 78 ff 00 00 00 00      	ldxdw r2, [r10 - 0x88]
   645b0: 7b 26 40 00 00 00 00 00      	stxdw [r6 + 0x40], r2
   645b8: 7b 96 1e 00 00 00 00 00      	stxdw [r6 + 0x1e], r9
   645c0: 7b 86 18 00 00 00 00 00      	stxdw [r6 + 0x18], r8
   645c8: 7b 76 10 00 00 00 00 00      	stxdw [r6 + 0x10], r7
   645d0: 7b 56 08 00 00 00 00 00      	stxdw [r6 + 0x8], r5
   645d8: 79 a2 80 ff 00 00 00 00      	ldxdw r2, [r10 - 0x80]
   645e0: 7b 26 00 00 00 00 00 00      	stxdw [r6 + 0x0], r2
   645e8: 79 a2 30 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd0]
   645f0: 7b 26 e3 00 00 00 00 00      	stxdw [r6 + 0xe3], r2
   645f8: 79 a2 58 ff 00 00 00 00      	ldxdw r2, [r10 - 0xa8]
   64600: 73 26 e2 00 00 00 00 00      	stxb [r6 + 0xe2], r2
   64608: 79 a2 38 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc8]
   64610: 63 26 d8 00 00 00 00 00      	stxw [r6 + 0xd8], r2
   64618: 79 a2 00 ff 00 00 00 00      	ldxdw r2, [r10 - 0x100]
   64620: 7b 26 d0 00 00 00 00 00      	stxdw [r6 + 0xd0], r2
   64628: 79 a2 08 ff 00 00 00 00      	ldxdw r2, [r10 - 0xf8]
   64630: 7b 26 bf 00 00 00 00 00      	stxdw [r6 + 0xbf], r2
   64638: 79 a2 20 ff 00 00 00 00      	ldxdw r2, [r10 - 0xe0]
   64640: 73 26 be 00 00 00 00 00      	stxb [r6 + 0xbe], r2
   64648: 79 a2 28 ff 00 00 00 00      	ldxdw r2, [r10 - 0xd8]
   64650: 7b 26 a7 00 00 00 00 00      	stxdw [r6 + 0xa7], r2
   64658: 79 a2 40 ff 00 00 00 00      	ldxdw r2, [r10 - 0xc0]
   64660: 73 26 a6 00 00 00 00 00      	stxb [r6 + 0xa6], r2
   64668: 79 a2 48 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb8]
   64670: 7b 26 98 00 00 00 00 00      	stxdw [r6 + 0x98], r2
   64678: 79 a2 50 ff 00 00 00 00      	ldxdw r2, [r10 - 0xb0]
   64680: 7b 26 90 00 00 00 00 00      	stxdw [r6 + 0x90], r2
   64688: 79 a2 68 ff 00 00 00 00      	ldxdw r2, [r10 - 0x98]
   64690: 7b 26 88 00 00 00 00 00      	stxdw [r6 + 0x88], r2
   64698: 7b 46 67 00 00 00 00 00      	stxdw [r6 + 0x67], r4
   646a0: 73 16 66 00 00 00 00 00      	stxb [r6 + 0x66], r1
   646a8: 79 a1 88 ff 00 00 00 00      	ldxdw r1, [r10 - 0x78]
   646b0: 7b 16 27 00 00 00 00 00      	stxdw [r6 + 0x27], r1
   646b8: 73 06 26 00 00 00 00 00      	stxb [r6 + 0x26], r0
   646c0: 05 00 3e ff 00 00 00 00      	ja -0xc2 <custom_panic+0x1e98>
