   810b8: bf 59 00 00 00 00 00 00      	mov64 r9, r5
   810c0: bf 48 00 00 00 00 00 00      	mov64 r8, r4
   810c8: bf 36 00 00 00 00 00 00      	mov64 r6, r3
   810d0: bf 27 00 00 00 00 00 00      	mov64 r7, r2
   810d8: 7b 1a 78 fe 00 00 00 00      	stxdw [r10 - 0x188], r1
   810e0: 18 01 00 00 2d e1 0a 00 00 00 00 00 00 00 00 00      	lddw r1, 0xae12d ; data 'Instruction: SellInstruction: SellV2Instruction: BuyV2Instruction: SellPumpSwapInstruction: BuyPumpSwap'
   810f0: b7 02 00 00 11 00 00 00      	mov64 r2, 0x11
   810f8: 85 10 00 00 ff ff ff ff      	call -0x1 ; external sol_log_
   81100: a5 09 04 00 10 00 00 00      	jlt r9, 0x10, +0x4 <.text+0x81008>
   81108: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   81110: 57 01 00 00 fe ff ff ff      	and64 r1, -0x2
   81118: 15 01 01 00 10 00 00 00      	jeq r1, 0x10, +0x1 <.text+0x81008>
   81120: 55 01 15 00 12 00 00 00      	jne r1, 0x12, +0x15 <.text+0x810b0>
   81128: 18 01 00 00 20 12 0b 00 00 00 00 00 00 00 00 00      	lddw r1, 0xb1220
   81138: 85 10 00 00 fe 42 00 00      	call 0x42fe ; target 0xa2930
   81140: bf 01 00 00 00 00 00 00      	mov64 r1, r0
   81148: 57 01 00 00 03 00 00 00      	and64 r1, 0x3
   81150: bf 12 00 00 00 00 00 00      	mov64 r2, r1
   81158: 07 02 00 00 fe ff ff ff      	add64 r2, -0x2
   81160: a5 02 06 00 02 00 00 00      	jlt r2, 0x2, +0x6 <.text+0x81078>
   81168: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x81078>
   81170: 79 01 07 00 00 00 00 00      	ldxdw r1, [r0 + 0x7]
   81178: 79 12 00 00 00 00 00 00      	ldxdw r2, [r1 + 0x0]
   81180: 15 02 02 00 00 00 00 00      	jeq r2, 0x0, +0x2 <.text+0x81078>
   81188: 79 01 ff ff 00 00 00 00      	ldxdw r1, [r0 - 0x1]
   81190: 8d 00 00 00 02 00 00 00      	callx r2
   81198: b7 01 00 00 66 00 00 00      	mov64 r1, 0x66
   811a0: 85 10 00 00 88 32 00 00      	call 0x3288 ; target 0x9a5e8
   811a8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   811b0: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   811b8: bf 80 00 00 00 00 00 00      	mov64 r0, r8
   811c0: bf 91 00 00 00 00 00 00      	mov64 r1, r9
   811c8: 95 00 00 00 00 00 00 00      	exit
   811d0: 79 81 08 00 00 00 00 00      	ldxdw r1, [r8 + 0x8]
   811d8: 7b 1a 70 fe 00 00 00 00      	stxdw [r10 - 0x190], r1
   811e0: 79 81 00 00 00 00 00 00      	ldxdw r1, [r8 + 0x0]
   811e8: 7b 1a 58 fe 00 00 00 00      	stxdw [r10 - 0x1a8], r1
   811f0: 69 81 10 00 00 00 00 00      	ldxh r1, [r8 + 0x10]
   811f8: 7b 1a 68 fe 00 00 00 00      	stxdw [r10 - 0x198], r1
   81200: 69 81 12 00 00 00 00 00      	ldxh r1, [r8 + 0x12]
   81208: 7b 1a 60 fe 00 00 00 00      	stxdw [r10 - 0x1a0], r1
   81210: b7 01 00 00 ff ff ff ff      	mov64 r1, -0x1
   81218: 6b 1a 84 fe 00 00 00 00      	stxh [r10 - 0x17c], r1
   81220: 63 1a 80 fe 00 00 00 00      	stxw [r10 - 0x180], r1
   81228: 7b 6a a8 fe 00 00 00 00      	stxdw [r10 - 0x158], r6
   81230: 7b 7a a0 fe 00 00 00 00      	stxdw [r10 - 0x160], r7
   81238: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81240: 07 01 00 00 88 fe ff ff      	add64 r1, -0x178
   81248: 7b 1a 10 f0 00 00 00 00      	stxdw [r10 - 0xff0], r1
   81250: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81258: 07 01 00 00 80 fe ff ff      	add64 r1, -0x180
   81260: 7b 1a 08 f0 00 00 00 00      	stxdw [r10 - 0xff8], r1
   81268: 7b 9a 00 f0 00 00 00 00      	stxdw [r10 - 0x1000], r9
   81270: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81278: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   81280: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   81288: 07 03 00 00 a0 fe ff ff      	add64 r3, -0x160
   81290: bf a5 00 00 00 00 00 00      	mov64 r5, r10
   81298: 79 a7 78 fe 00 00 00 00      	ldxdw r7, [r10 - 0x188]
   812a0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   812a8: bf 84 00 00 00 00 00 00      	mov64 r4, r8
   812b0: 85 10 00 00 8a ab ff ff      	call -0x5476 ; target 0x56f08
   812b8: 79 a9 68 ff 00 00 00 00      	ldxdw r9, [r10 - 0x98]
   812c0: 79 a8 60 ff 00 00 00 00      	ldxdw r8, [r10 - 0xa0]
   812c8: 79 a6 58 ff 00 00 00 00      	ldxdw r6, [r10 - 0xa8]
   812d0: 15 06 dc ff 00 00 00 00      	jeq r6, 0x0, -0x24 <.text+0x81098>
   812d8: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   812e0: 07 01 00 00 c8 fe ff ff      	add64 r1, -0x138
   812e8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
   812f0: 07 02 00 00 70 ff ff ff      	add64 r2, -0x90
   812f8: b7 03 00 00 90 00 00 00      	mov64 r3, 0x90
   81300: 85 10 00 00 50 52 00 00      	call 0x5250 ; target 0xaa588
   81308: 7b 9a c0 fe 00 00 00 00      	stxdw [r10 - 0x140], r9
   81310: 7b 8a b8 fe 00 00 00 00      	stxdw [r10 - 0x148], r8
   81318: 7b 6a b0 fe 00 00 00 00      	stxdw [r10 - 0x150], r6
   81320: 61 a1 80 fe 00 00 00 00      	ldxw r1, [r10 - 0x180]
   81328: 63 1a 78 ff 00 00 00 00      	stxw [r10 - 0x88], r1
   81330: 69 a1 84 fe 00 00 00 00      	ldxh r1, [r10 - 0x17c]
   81338: 6b 1a 7c ff 00 00 00 00      	stxh [r10 - 0x84], r1
   81340: 79 a1 a8 fe 00 00 00 00      	ldxdw r1, [r10 - 0x158]
   81348: 7b 1a 70 ff 00 00 00 00      	stxdw [r10 - 0x90], r1
   81350: 79 a1 a0 fe 00 00 00 00      	ldxdw r1, [r10 - 0x160]
   81358: 7b 1a 68 ff 00 00 00 00      	stxdw [r10 - 0x98], r1
   81360: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81368: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   81370: 7b 1a 60 ff 00 00 00 00      	stxdw [r10 - 0xa0], r1
   81378: 7b 7a 58 ff 00 00 00 00      	stxdw [r10 - 0xa8], r7
   81380: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   81388: 07 01 00 00 58 ff ff ff      	add64 r1, -0xa8
   81390: 79 a2 58 fe 00 00 00 00      	ldxdw r2, [r10 - 0x1a8]
   81398: 79 a3 70 fe 00 00 00 00      	ldxdw r3, [r10 - 0x190]
   813a0: 79 a4 68 fe 00 00 00 00      	ldxdw r4, [r10 - 0x198]
   813a8: 79 a5 60 fe 00 00 00 00      	ldxdw r5, [r10 - 0x1a0]
   813b0: 85 10 00 00 cd 3b ff ff      	call -0xc433 ; target 0x1f220
   813b8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
   813c0: bf 19 00 00 00 00 00 00      	mov64 r9, r1
   813c8: 55 08 bd ff 02 00 00 00      	jne r8, 0x2, -0x43 <.text+0x81098>
   813d0: bf a1 00 00 00 00 00 00      	mov64 r1, r10
   813d8: 07 01 00 00 b0 fe ff ff      	add64 r1, -0x150
   813e0: bf 72 00 00 00 00 00 00      	mov64 r2, r7
   813e8: 85 10 00 00 94 b2 ff ff      	call -0x4d6c ; target 0x5a890
   813f0: 05 00 b6 ff 00 00 00 00      	ja -0x4a <.text+0x81088>
