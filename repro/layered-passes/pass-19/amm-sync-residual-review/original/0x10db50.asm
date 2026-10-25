
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so:	file format elf64-sbf

Disassembly of section .text:

00000000000ee4b0 <custom_panic>:
  10db50: 7b 5a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r5
  10db58: bf 46 00 00 00 00 00 00      	mov64 r6, r4
  10db60: bf 29 00 00 00 00 00 00      	mov64 r9, r2
  10db68: bf 17 00 00 00 00 00 00      	mov64 r7, r1
  10db70: b7 08 00 00 01 00 00 00      	mov64 r8, 0x1
  10db78: 15 06 0c 00 00 00 00 00      	jeq r6, 0x0, +0xc <custom_panic+0x1f730>
  10db80: 7b 3a e8 ff 00 00 00 00      	stxdw [r10 - 0x18], r3
  10db88: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  10db90: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  10db98: c5 06 1f 00 00 00 00 00      	jslt r6, 0x0, +0x1f <custom_panic+0x1f7e8>
  10dba0: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  10dba8: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  10dbb0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  10dbb8: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  10dbc0: 85 10 00 00 c3 c0 ff ff      	call -0x3f3d
  10dbc8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
  10dbd0: 15 08 18 00 00 00 00 00      	jeq r8, 0x0, +0x18 <custom_panic+0x1f7e8>
  10dbd8: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  10dbe0: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  10dbe8: bf 32 00 00 00 00 00 00      	mov64 r2, r3
  10dbf0: bf 63 00 00 00 00 00 00      	mov64 r3, r6
  10dbf8: 85 10 00 00 93 17 00 00      	call 0x1793
  10dc00: 79 91 00 00 00 00 00 00      	ldxdw r1, [r9 + 0x0]
  10dc08: 7b 17 30 00 00 00 00 00      	stxdw [r7 + 0x30], r1
  10dc10: 79 91 08 00 00 00 00 00      	ldxdw r1, [r9 + 0x8]
  10dc18: 7b 17 38 00 00 00 00 00      	stxdw [r7 + 0x38], r1
  10dc20: 79 91 10 00 00 00 00 00      	ldxdw r1, [r9 + 0x10]
  10dc28: 7b 17 40 00 00 00 00 00      	stxdw [r7 + 0x40], r1
  10dc30: 79 91 18 00 00 00 00 00      	ldxdw r1, [r9 + 0x18]
  10dc38: 7b 17 48 00 00 00 00 00      	stxdw [r7 + 0x48], r1
  10dc40: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
  10dc48: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
  10dc50: 7b 17 10 00 00 00 00 00      	stxdw [r7 + 0x10], r1
  10dc58: 79 21 08 00 00 00 00 00      	ldxdw r1, [r2 + 0x8]
  10dc60: 7b 17 08 00 00 00 00 00      	stxdw [r7 + 0x8], r1
  10dc68: 79 21 00 00 00 00 00 00      	ldxdw r1, [r2 + 0x0]
  10dc70: 7b 17 00 00 00 00 00 00      	stxdw [r7 + 0x0], r1
  10dc78: 7b 87 20 00 00 00 00 00      	stxdw [r7 + 0x20], r8
  10dc80: 7b 67 18 00 00 00 00 00      	stxdw [r7 + 0x18], r6
  10dc88: 7b 67 28 00 00 00 00 00      	stxdw [r7 + 0x28], r6
  10dc90: 95 00 00 00 00 00 00 00      	exit
  10dc98: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
  10dca0: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  10dca8: 85 10 00 00 d3 06 00 00      	call 0x6d3
