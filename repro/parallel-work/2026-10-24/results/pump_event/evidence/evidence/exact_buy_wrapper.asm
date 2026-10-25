  12abc8: bf 56 00 00 00 00 00 00      	mov64 r6, r5
  12abd0: bf 49 00 00 00 00 00 00      	mov64 r9, r4
  12abd8: bf 38 00 00 00 00 00 00      	mov64 r8, r3
  12abe0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
  12abe8: 7b 1a 90 f7 00 00 00 00      	stxdw [r10 - 0x870], r1
  12abf0: 18 01 00 00 6d 7e 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b7e6d
  12ac00: b7 02 00 00 1a 00 00 00      	mov64 r2, 0x1a
  12ac08: 85 10 00 00 ff ff ff ff      	call -0x1
  12ac10: 79 61 08 f0 00 00 00 00      	ldxdw r1, [r6 - 0xff8]
  12ac18: a5 01 23 00 08 00 00 00      	jlt r1, 0x8, +0x23 <.text+0x12ac18>
  12ac20: bf 12 00 00 00 00 00 00      	mov64 r2, r1
  12ac28: 57 02 00 00 f8 ff ff ff      	and64 r2, -0x8
  12ac30: 15 02 20 00 08 00 00 00      	jeq r2, 0x8, +0x20 <.text+0x12ac18>
  12ac38: 79 62 00 f0 00 00 00 00      	ldxdw r2, [r6 - 0x1000]
  12ac40: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
  12ac48: 79 24 08 00 00 00 00 00      	ldxdw r4, [r2 + 0x8]
  12ac50: 55 01 33 00 10 00 00 00      	jne r1, 0x10, +0x33 <.text+0x12acd0>
  12ac58: b7 06 00 00 00 00 00 00      	mov64 r6, 0x0
  12ac60: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  12ac68: 7b 5a 78 f7 00 00 00 00      	stxdw [r10 - 0x888], r5
  12ac70: 7b 4a 80 f7 00 00 00 00      	stxdw [r10 - 0x880], r4
  12ac78: 7b 3a 88 f7 00 00 00 00      	stxdw [r10 - 0x878], r3
  12ac80: b7 01 00 00 ff ff ff ff      	mov64 r1, -0x1
  12ac88: 63 1a cb f7 00 00 00 00      	stxw [r10 - 0x835], r1
  12ac90: 63 1a c8 f7 00 00 00 00      	stxw [r10 - 0x838], r1
  12ac98: 7b 9a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r9
  12aca0: 7b 8a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r8
  12aca8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12acb0: 07 01 00 00 c8 f7 ff ff      	add64 r1, -0x838
  12acb8: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
  12acc0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12acc8: 07 01 00 00 e0 fb ff ff      	add64 r1, -0x420
  12acd0: bf a3 00 00 00 00 00 00      	mov64 r3, r10
  12acd8: 07 03 00 00 f0 ff ff ff      	add64 r3, -0x10
  12ace0: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  12ace8: bf 72 00 00 00 00 00 00      	mov64 r2, r7
  12acf0: 85 10 00 00 5f 87 00 00      	call 0x875f
  12acf8: 79 a8 e0 fb 00 00 00 00      	ldxdw r8, [r10 - 0x420]
  12ad00: 18 01 00 00 00 00 00 00 00 00 00 00 00 00 00 80      	lddw r1, -0x8000000000000000
  12ad10: 1d 18 01 00 00 00 00 00      	jeq r8, r1, +0x1 <.text+0x12ac00>
  12ad18: 05 00 24 00 00 00 00 00      	ja +0x24 <.text+0x12ad20>
  12ad20: 79 a2 f0 fb 00 00 00 00      	ldxdw r2, [r10 - 0x410]
  12ad28: 79 a1 e8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x418]
  12ad30: 05 00 13 00 00 00 00 00      	ja +0x13 <.text+0x12acb0>
  12ad38: 18 01 00 00 20 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd820
  12ad48: 85 10 00 00 22 fc 00 00      	call 0xfc22
  12ad50: bf 01 00 00 00 00 00 00      	mov64 r1, r0
  12ad58: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
  12ad60: bf 12 00 00 00 00 00 00      	mov64 r2, r1
  12ad68: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
  12ad70: a5 02 05 00 02 00 00 00      	jlt r2, 0x2, +0x5 <.text+0x12ac80>
  12ad78: 15 01 04 00 00 00 00 00      	jeq r1, 0x0, +0x4 <.text+0x12ac80>
  12ad80: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
  12ad88: 79 02 07 00 00 00 00 00      	ldxdw r2, [r0 + 0x7]
  12ad90: 79 22 00 00 00 00 00 00      	ldxdw r2, [r2 + 0x0]
  12ad98: 8d 00 00 00 02 00 00 00      	callx r2
  12ada0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12ada8: 07 01 00 00 98 f7 ff ff      	add64 r1, -0x868
  12adb0: b7 02 00 00 66 00 00 00      	mov64 r2, 0x66
  12adb8: 85 10 00 00 ac e8 00 00      	call 0xe8ac
  12adc0: 79 a2 a0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x860]
  12adc8: 79 a1 98 f7 00 00 00 00      	ldxdw r1, [r10 - 0x868]
  12add0: 79 a3 90 f7 00 00 00 00      	ldxdw r3, [r10 - 0x870]
  12add8: 7b 23 08 00 00 00 00 00      	stxdw [r3 + 0x8], r2
  12ade0: 7b 13 00 00 00 00 00 00      	stxdw [r3 + 0x0], r1
  12ade8: 95 00 00 00 00 00 00 00      	exit
  12adf0: 71 26 10 00 00 00 00 00      	ldxb r6, [r2 + 0x10]
  12adf8: a5 06 01 00 02 00 00 00      	jlt r6, 0x2, +0x1 <.text+0x12ace8>
  12ae00: 05 00 57 00 00 00 00 00      	ja +0x57 <.text+0x12afa0>
  12ae08: b7 05 00 00 00 00 00 00      	mov64 r5, 0x0
  12ae10: 15 01 ca ff 11 00 00 00      	jeq r1, 0x11, -0x36 <.text+0x12ab48>
  12ae18: 71 21 11 00 00 00 00 00      	ldxb r1, [r2 + 0x11]
  12ae20: 15 01 c8 ff 00 00 00 00      	jeq r1, 0x0, -0x38 <.text+0x12ab48>
  12ae28: 55 01 8e 00 01 00 00 00      	jne r1, 0x1, +0x8e <.text+0x12b180>
  12ae30: b7 05 00 00 01 00 00 00      	mov64 r5, 0x1
  12ae38: 05 00 c5 ff 00 00 00 00      	ja -0x3b <.text+0x12ab48>
  12ae40: 79 a1 e8 fb 00 00 00 00      	ldxdw r1, [r10 - 0x418]
  12ae48: 7b 1a 70 f7 00 00 00 00      	stxdw [r10 - 0x890], r1
  12ae50: 79 a9 f0 fb 00 00 00 00      	ldxdw r9, [r10 - 0x410]
  12ae58: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12ae60: 07 01 00 00 e8 f7 ff ff      	add64 r1, -0x818
  12ae68: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  12ae70: 07 02 00 00 f8 fb ff ff      	add64 r2, -0x408
  12ae78: b7 03 00 00 f8 03 00 00      	mov64 r3, 0x3f8
  12ae80: 85 10 00 00 f1 10 01 00      	call 0x110f1
  12ae88: b7 01 00 00 01 00 00 00      	mov64 r1, 0x1
  12ae90: 55 06 01 00 00 00 00 00      	jne r6, 0x0, +0x1 <.text+0x12ad80>
  12ae98: b7 01 00 00 00 00 00 00      	mov64 r1, 0x0
  12aea0: 7b 9a e0 f7 00 00 00 00      	stxdw [r10 - 0x820], r9
  12aea8: 79 a2 70 f7 00 00 00 00      	ldxdw r2, [r10 - 0x890]
  12aeb0: 7b 2a d8 f7 00 00 00 00      	stxdw [r10 - 0x828], r2
  12aeb8: 7b 8a d0 f7 00 00 00 00      	stxdw [r10 - 0x830], r8
  12aec0: 61 a2 c8 f7 00 00 00 00      	ldxw r2, [r10 - 0x838]
  12aec8: 63 2a 00 fc 00 00 00 00      	stxw [r10 - 0x400], r2
  12aed0: 61 a2 cb f7 00 00 00 00      	ldxw r2, [r10 - 0x835]
  12aed8: 63 2a 03 fc 00 00 00 00      	stxw [r10 - 0x3fd], r2
  12aee0: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
  12aee8: 7b 2a f8 fb 00 00 00 00      	stxdw [r10 - 0x408], r2
  12aef0: 79 a2 f0 ff 00 00 00 00      	ldxdw r2, [r10 - 0x10]
  12aef8: 7b 2a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r2
  12af00: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  12af08: 07 02 00 00 d0 f7 ff ff      	add64 r2, -0x830
  12af10: 7b 2a e8 fb 00 00 00 00      	stxdw [r10 - 0x418], r2
  12af18: 7b 7a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r7
  12af20: 7b 1a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r1
  12af28: 79 a1 78 f7 00 00 00 00      	ldxdw r1, [r10 - 0x888]
  12af30: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
  12af38: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12af40: 07 01 00 00 b8 f7 ff ff      	add64 r1, -0x848
  12af48: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  12af50: 07 02 00 00 e0 fb ff ff      	add64 r2, -0x420
  12af58: bf a5 00 00 00 00 00 00      	mov64 r5, r10
  12af60: 79 a3 88 f7 00 00 00 00      	ldxdw r3, [r10 - 0x878]
  12af68: 79 a4 80 f7 00 00 00 00      	ldxdw r4, [r10 - 0x880]
  12af70: 85 10 00 00 ad 48 00 00      	call 0x48ad
  12af78: 79 a1 b8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x848]
  12af80: 15 01 01 00 02 00 00 00      	jeq r1, 0x2, +0x1 <.text+0x12ae70>
  12af88: 05 00 40 00 00 00 00 00      	ja +0x40 <.text+0x12b070>
  12af90: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12af98: 07 01 00 00 a8 f7 ff ff      	add64 r1, -0x858
  12afa0: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  12afa8: 07 02 00 00 d0 f7 ff ff      	add64 r2, -0x830
  12afb0: bf 73 00 00 00 00 00 00      	mov64 r3, r7
  12afb8: 85 10 00 00 22 92 00 00      	call 0x9222
  12afc0: 79 a3 a0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x560]
  12afc8: 79 a4 98 fa 00 00 00 00      	ldxdw r4, [r10 - 0x568]
  12afd0: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
  12afd8: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12afe0: 79 a2 b0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x850]
  12afe8: 79 a1 a8 f7 00 00 00 00      	ldxdw r1, [r10 - 0x858]
  12aff0: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
  12aff8: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x12aef8>
  12b000: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
  12b008: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b010: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
  12b018: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
  12b020: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b028: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
  12b030: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0x12af30>
  12b038: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
  12b040: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b048: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
  12b050: 79 a3 d0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x530]
  12b058: 79 a4 c8 fa 00 00 00 00      	ldxdw r4, [r10 - 0x538]
  12b060: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
  12b068: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b070: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
  12b078: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x12af78>
  12b080: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
  12b088: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b090: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
  12b098: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
  12b0a0: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b0a8: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
  12b0b0: 55 04 a3 ff 00 00 00 00      	jne r4, 0x0, -0x5d <.text+0x12acb0>
  12b0b8: 05 00 38 00 00 00 00 00      	ja +0x38 <.text+0x12b160>
  12b0c0: 73 6a c8 f7 00 00 00 00      	stxb [r10 - 0x838], r6
  12b0c8: 18 01 00 00 f0 d8 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bd8f0
  12b0d8: 7b 1a e0 fb 00 00 00 00      	stxdw [r10 - 0x420], r1
  12b0e0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12b0e8: 07 01 00 00 f0 ff ff ff      	add64 r1, -0x10
  12b0f0: 7b 1a f0 fb 00 00 00 00      	stxdw [r10 - 0x410], r1
  12b0f8: 18 01 00 00 98 30 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b3098
  12b108: 7b 1a f8 ff 00 00 00 00      	stxdw [r10 - 0x8], r1
  12b110: bf a1 00 00 00 00 00 00      	mov64 r1, r10
  12b118: 07 01 00 00 c8 f7 ff ff      	add64 r1, -0x838
  12b120: 7b 1a f0 ff 00 00 00 00      	stxdw [r10 - 0x10], r1
  12b128: 7a 0a 00 fc 00 00 00 00      	stdw [r10 - 0x400], 0x0
  12b130: 7a 0a e8 fb 01 00 00 00      	stdw [r10 - 0x418], 0x1
  12b138: 7a 0a f8 fb 01 00 00 00      	stdw [r10 - 0x408], 0x1
  12b140: bf a6 00 00 00 00 00 00      	mov64 r6, r10
  12b148: 07 06 00 00 d0 f7 ff ff      	add64 r6, -0x830
  12b150: bf a2 00 00 00 00 00 00      	mov64 r2, r10
  12b158: 07 02 00 00 e0 fb ff ff      	add64 r2, -0x420
  12b160: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  12b168: 85 10 00 00 1b 00 01 00      	call 0x1001b
  12b170: b7 01 00 00 15 00 00 00      	mov64 r1, 0x15
  12b178: bf 62 00 00 00 00 00 00      	mov64 r2, r6
  12b180: 85 10 00 00 e1 bd fd ff      	call -0x2421f
  12b188: 05 00 78 ff 00 00 00 00      	ja -0x88 <.text+0x12ac30>
  12b190: 79 a2 c0 f7 00 00 00 00      	ldxdw r2, [r10 - 0x840]
  12b198: 79 a3 a0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x560]
  12b1a0: 79 a4 98 fa 00 00 00 00      	ldxdw r4, [r10 - 0x568]
  12b1a8: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
  12b1b0: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b1b8: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
  12b1c0: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x12b0c0>
  12b1c8: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
  12b1d0: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b1d8: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
  12b1e0: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
  12b1e8: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b1f0: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
  12b1f8: 55 04 03 00 00 00 00 00      	jne r4, 0x0, +0x3 <.text+0x12b0f8>
  12b200: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
  12b208: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b210: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
  12b218: 79 a3 d0 fa 00 00 00 00      	ldxdw r3, [r10 - 0x530]
  12b220: 79 a4 c8 fa 00 00 00 00      	ldxdw r4, [r10 - 0x538]
  12b228: 79 45 00 00 00 00 00 00      	ldxdw r5, [r4 + 0x0]
  12b230: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b238: 7b 54 00 00 00 00 00 00      	stxdw [r4 + 0x0], r5
  12b240: 55 05 03 00 00 00 00 00      	jne r5, 0x0, +0x3 <.text+0x12b140>
  12b248: 79 45 08 00 00 00 00 00      	ldxdw r5, [r4 + 0x8]
  12b250: 07 05 00 00 ff ff ff ff      	add64 r5, -0x1
  12b258: 7b 54 08 00 00 00 00 00      	stxdw [r4 + 0x8], r5
  12b260: 79 34 00 00 00 00 00 00      	ldxdw r4, [r3 + 0x0]
  12b268: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b270: 7b 43 00 00 00 00 00 00      	stxdw [r3 + 0x0], r4
  12b278: 55 04 6a ff 00 00 00 00      	jne r4, 0x0, -0x96 <.text+0x12acb0>
  12b280: 79 34 08 00 00 00 00 00      	ldxdw r4, [r3 + 0x8]
  12b288: 07 04 00 00 ff ff ff ff      	add64 r4, -0x1
  12b290: 7b 43 08 00 00 00 00 00      	stxdw [r3 + 0x8], r4
  12b298: 05 00 66 ff 00 00 00 00      	ja -0x9a <.text+0x12acb0>
  12b2a0: 73 1a c8 f7 00 00 00 00      	stxb [r10 - 0x838], r1
  12b2a8: 05 00 c3 ff 00 00 00 00      	ja -0x3d <.text+0x12afa8>
