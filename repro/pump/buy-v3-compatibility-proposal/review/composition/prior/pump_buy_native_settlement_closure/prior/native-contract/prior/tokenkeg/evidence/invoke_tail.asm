  1a0720: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  1a0728: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  1a0730: 1d 83 d6 ff 00 00 00 00      	jeq r3, r8, -0x2a <custom_panic+0x49330>
  1a0738: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  1a0740: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
  1a0748: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
  1a0750: 7b 24 08 00 00 00 00 00      	stxdw [r4 + 0x8], r2
  1a0758: 7b 34 00 00 00 00 00 00      	stxdw [r4 + 0x0], r3
  1a0760: 05 00 20 00 00 00 00 00      	ja +0x20 <custom_panic+0x495b0>
  1a0768: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a0770: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  1a0778: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a0780: 85 10 00 00 95 04 00 00      	call 0x495
  1a0788: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  1a0790: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  1a0798: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
  1a07a8: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <custom_panic+0x49500>
  1a07b0: 05 00 17 00 00 00 00 00      	ja +0x17 <custom_panic+0x495b8>
  1a07b8: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
  1a07c0: 07 02 00 00 01 00 00 00      	add64 r2, 0x1
  1a07c8: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  1a07d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a07d8: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  1a07e0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a07e8: 85 10 00 00 a9 04 00 00      	call 0x4a9
  1a07f0: b7 02 00 00 01 00 00 00      	mov64 r2, 0x1
  1a07f8: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  1a0800: 79 a3 e8 ff 00 00 00 00      	ldxdw r3, [r10 - 0x18]
  1a0808: 1d 83 bb ff 00 00 00 00      	jeq r3, r8, -0x45 <custom_panic+0x49330>
  1a0810: 05 00 e4 ff 00 00 00 00      	ja -0x1c <custom_panic+0x49480>
  1a0818: 79 a1 a0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x60]
  1a0820: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
  1a0828: 79 a1 a8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x58]
  1a0830: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
  1a0838: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  1a0840: 79 a1 b0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x50]
  1a0848: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  1a0850: 79 a3 c0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x40]
  1a0858: 79 a4 c8 ff 00 00 00 00      	ldxdw r4, [r10 - 0x38]
  1a0860: 85 10 00 00 a1 02 00 00      	call 0x2a1
  1a0868: 95 00 00 00 00 00 00 00      	exit
  1a0870: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
  1a0878: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
  1a0880: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
  1a0888: 7b 34 08 00 00 00 00 00      	stxdw [r4 + 0x8], r3
  1a0890: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
  1a0898: 05 00 f9 ff 00 00 00 00      	ja -0x7 <custom_panic+0x495b0>
