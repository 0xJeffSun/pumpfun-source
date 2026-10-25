  1a0870: 79 a3 f0 ff 00 00 00 00      	ldxdw r3, [r10 - 0x10]
  1a0878: 79 a4 b0 ff 00 00 00 00      	ldxdw r4, [r10 - 0x50]
  1a0880: 7b 14 10 00 00 00 00 00      	stxdw [r4 + 0x10], r1
  1a0888: 7b 34 08 00 00 00 00 00      	stxdw [r4 + 0x8], r3
  1a0890: 7b 24 00 00 00 00 00 00      	stxdw [r4 + 0x0], r2
  1a0898: 05 00 f9 ff 00 00 00 00      	ja -0x7 <custom_panic+0x495b0>
