   5a8d0: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   5a8d8: 79 a1 98 fd 00 00 00 00      	ldxdw r1, [r10 - 0x268]
   5a8e0: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   5a8e8: 79 a1 f0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x210]
   5a8f0: 73 1a 5a ff 00 00 00 00      	stxb [r10 - 0xa6], r1
   5a8f8: 79 a1 f8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x208]
   5a900: 73 1a 59 ff 00 00 00 00      	stxb [r10 - 0xa7], r1
   5a908: 79 a1 00 fe 00 00 00 00      	ldxdw r1, [r10 - 0x200]
   5a910: 73 1a 58 ff 00 00 00 00      	stxb [r10 - 0xa8], r1
   5a918: 79 a1 08 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f8]
   5a920: 7b 1a 50 ff 00 00 00 00      	stxdw [r10 - 0xb0], r1
   5a928: 79 a1 10 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1f0]
   5a930: 7b 1a 48 ff 00 00 00 00      	stxdw [r10 - 0xb8], r1
   5a938: 79 a1 e0 fd 00 00 00 00      	ldxdw r1, [r10 - 0x220]
   5a940: 7b 1a 40 ff 00 00 00 00      	stxdw [r10 - 0xc0], r1
   5a948: 79 a1 58 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1a8]
   5a950: 7b 1a 38 ff 00 00 00 00      	stxdw [r10 - 0xc8], r1
   5a958: 79 a1 40 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c0]
   5a960: 7b 1a 30 ff 00 00 00 00      	stxdw [r10 - 0xd0], r1
   5a968: 79 a1 18 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e8]
   5a970: 73 1a 2a ff 00 00 00 00      	stxb [r10 - 0xd6], r1
   5a978: 79 a1 20 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1e0]
   5a980: 73 1a 29 ff 00 00 00 00      	stxb [r10 - 0xd7], r1
   5a988: 79 a1 28 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d8]
   5a990: 73 1a 28 ff 00 00 00 00      	stxb [r10 - 0xd8], r1
   5a998: 79 a1 30 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1d0]
   5a9a0: 7b 1a 20 ff 00 00 00 00      	stxdw [r10 - 0xe0], r1
   5a9a8: 79 a1 38 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1c8]
   5a9b0: 7b 1a 18 ff 00 00 00 00      	stxdw [r10 - 0xe8], r1
   5a9b8: 79 a1 a8 fd 00 00 00 00      	ldxdw r1, [r10 - 0x258]
   5a9c0: 7b 1a 10 ff 00 00 00 00      	stxdw [r10 - 0xf0], r1
   5a9c8: 79 a1 78 fd 00 00 00 00      	ldxdw r1, [r10 - 0x288]
   5a9d0: 7b 1a 08 ff 00 00 00 00      	stxdw [r10 - 0xf8], r1
   5a9d8: 79 a1 48 fe 00 00 00 00      	ldxdw r1, [r10 - 0x1b8]
   5a9e0: 7b 1a 00 ff 00 00 00 00      	stxdw [r10 - 0x100], r1
   5a9e8: 7a 0a f8 ff 00 00 00 00      	stdw [r10 - 0x8], 0x0
   5a9f0: 7a 0a f0 ff 08 00 00 00      	stdw [r10 - 0x10], 0x8
   5a9f8: 7a 0a f8 fe 00 00 00 00      	stdw [r10 - 0x108], 0x0
   5aa00: 7a 0a f0 fe 08 00 00 00      	stdw [r10 - 0x110], 0x8
   5aa08: 7a 0a e8 fe 00 00 00 00      	stdw [r10 - 0x118], 0x0
   5aa10: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   5aa18: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   5aa20: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   5aa28: 07 02 00 00 e8 fe ff ff      	add64 r2, -0x118
   5aa30: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   5aa38: 79 a4 60 fe 00 00 00 00      	ldxdw r4, [r10 - 0x1a0]
   5aa40: 85 10 00 00 50 4a 02 00      	call 0x24a50
   5aa48: 79 a3 88 fe 00 00 00 00      	ldxdw r3, [r10 - 0x178]
   5aa50: 79 a1 80 fe 00 00 00 00      	ldxdw r1, [r10 - 0x180]
   5aa58: 05 00 1d 00 00 00 00 00      	ja +0x1d <.text+0x5aa28>
