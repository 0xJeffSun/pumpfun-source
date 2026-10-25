  1a0530: 7b 4a c8 ff 00 00 00 00      	stxdw [r10 - 0x38], r4
  1a0538: 7b 3a c0 ff 00 00 00 00      	stxdw [r10 - 0x40], r3
  1a0540: 7b 1a b0 ff 00 00 00 00      	stxdw [r10 - 0x50], r1
  1a0548: 7b 2a b8 ff 00 00 00 00      	stxdw [r10 - 0x48], r2
  1a0550: 79 21 10 00 00 00 00 00      	ldxdw r1, [r2 + 0x10]
  1a0558: 79 52 08 f0 00 00 00 00      	ldxdw r2, [r5 - 0xff8]
  1a0560: 7b 2a a8 ff 00 00 00 00      	stxdw [r10 - 0x58], r2
  1a0568: 79 52 00 f0 00 00 00 00      	ldxdw r2, [r5 - 0x1000]
  1a0570: 7b 2a a0 ff 00 00 00 00      	stxdw [r10 - 0x60], r2
  1a0578: 15 01 53 00 00 00 00 00      	jeq r1, 0x0, +0x53 <custom_panic+0x49560>
  1a0580: 79 a2 b8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x48]
  1a0588: 79 26 08 00 00 00 00 00      	ldxdw r6, [r2 + 0x8]
  1a0590: 27 01 00 00 22 00 00 00      	mul64 r1, 0x22
  1a0598: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  1a05a0: 0f 12 00 00 00 00 00 00      	add64 r2, r1
  1a05a8: 7b 2a d0 ff 00 00 00 00      	stxdw [r10 - 0x30], r2
  1a05b0: 79 a1 c8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x38]
  1a05b8: 27 01 00 00 30 00 00 00      	mul64 r1, 0x30
  1a05c0: 7b 1a e0 ff 00 00 00 00      	stxdw [r10 - 0x20], r1
  1a05c8: 79 a1 c0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x40]
  1a05d0: 07 01 00 00 d0 ff ff ff      	add64 r1, -0x30
  1a05d8: 7b 1a d8 ff 00 00 00 00      	stxdw [r10 - 0x28], r1
  1a05e0: 05 00 05 00 00 00 00 00      	ja +0x5 <custom_panic+0x49358>
  1a05e8: 79 13 00 00 00 00 00 00      	ldxdw r3, [r1 + 0x0]
  1a05f0: 0f 23 00 00 00 00 00 00      	add64 r3, r2
  1a05f8: 7b 31 00 00 00 00 00 00      	stxdw [r1 + 0x0], r3
  1a0600: 79 a1 d0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x30]
  1a0608: 1d 16 41 00 00 00 00 00      	jeq r6, r1, +0x41 <custom_panic+0x49560>
  1a0610: bf 68 00 00 00 00 00 00      	mov64 r8, r6
  1a0618: 07 06 00 00 22 00 00 00      	add64 r6, 0x22
  1a0620: 79 a9 e0 ff 00 00 00 00      	ldxdw r9, [r10 - 0x20]
  1a0628: 79 a7 d8 ff 00 00 00 00      	ldxdw r7, [r10 - 0x28]
  1a0630: 15 09 f9 ff 00 00 00 00      	jeq r9, 0x0, -0x7 <custom_panic+0x49348>
  1a0638: 79 72 30 00 00 00 00 00      	ldxdw r2, [r7 + 0x30]
  1a0640: bf 81 00 00 00 00 00 00      	mov64 r1, r8
  1a0648: b7 03 00 00 20 00 00 00      	mov64 r3, 0x20
  1a0650: 85 10 00 00 04 26 00 00      	call 0x2604
  1a0658: 07 09 00 00 d0 ff ff ff      	add64 r9, -0x30
  1a0660: 07 07 00 00 30 00 00 00      	add64 r7, 0x30
  1a0668: 67 00 00 00 20 00 00 00      	lsh64 r0, 0x20
  1a0670: 77 00 00 00 20 00 00 00      	rsh64 r0, 0x20
  1a0678: 55 00 f6 ff 00 00 00 00      	jne r0, 0x0, -0xa <custom_panic+0x49378>
  1a0680: 71 81 21 00 00 00 00 00      	ldxb r1, [r8 + 0x21]
  1a0688: 55 01 1b 00 00 00 00 00      	jne r1, 0x0, +0x1b <custom_panic+0x494b0>
  1a0690: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a0698: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  1a06a0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a06a8: 85 10 00 00 9e 04 00 00      	call 0x49e
  1a06b0: 79 a1 f8 ff 00 00 00 00      	ldxdw r1, [r10 - 0x8]
  1a06b8: 79 a2 e8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x18]
  1a06c0: 18 08 00 00 1a 00 00 00 00 00 00 00 00 00 00 80      	lddw r8, -0x7fffffffffffffe6
  1a06d0: 1d 82 01 00 00 00 00 00      	jeq r2, r8, +0x1 <custom_panic+0x49428>
  1a06d8: 05 00 32 00 00 00 00 00      	ja +0x32 <custom_panic+0x495b8>
  1a06e0: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
  1a06e8: 07 02 00 00 ff ff ff ff      	add64 r2, -0x1
  1a06f0: 7b 21 00 00 00 00 00 00      	stxdw [r1 + 0x0], r2
  1a06f8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  1a0700: 07 01 00 00 e8 ff ff ff      	add64 r1, -0x18
  1a0708: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  1a0710: 85 10 00 00 b2 04 00 00      	call 0x4b2
  1a0718: b7 02 00 00 ff ff ff ff      	mov64 r2, -0x1
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
