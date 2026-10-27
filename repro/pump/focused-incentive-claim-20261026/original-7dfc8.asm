   7dfc8: 79 10 08 02 00 00 00 00      	ldxdw r0, [r1 + 0x208]
   7dfd0: 65 00 0a 00 ff ff ff ff      	jsgt r0, -0x1, +0xa <.text+0x7df08>
   7dfd8: bf a3 00 00 00 00 00 00      	mov64 r3, r10
   7dfe0: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
   7dfe8: 18 01 00 00 2e 72 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b722e
   7dff8: b7 02 00 00 0d 00 00 00      	mov64 r2, 0xd
   7e000: 18 04 00 00 48 de 1b 00 00 00 00 00 00 00 00 00      	lddw r4, 0x1bde48
   7e010: 18 05 00 00 68 de 1b 00 00 00 00 00 00 00 00 00      	lddw r5, 0x1bde68
   7e020: 85 10 00 00 be 5d 02 00      	call 0x25dbe
   7e028: 79 12 00 02 00 00 00 00      	ldxdw r2, [r1 + 0x200]
   7e030: 65 02 01 00 ff ff ff ff      	jsgt r2, -0x1, +0x1 <.text+0x7df20>
   7e038: 05 00 f3 ff 00 00 00 00      	ja -0xd <.text+0x7deb8>
   7e040: ad 20 07 00 00 00 00 00      	jlt r0, r2, +0x7 <.text+0x7df60>
   7e048: 79 11 10 02 00 00 00 00      	ldxdw r1, [r1 + 0x210]
   7e050: 15 01 05 00 00 00 00 00      	jeq r1, 0x0, +0x5 <.text+0x7df60>
   7e058: 65 01 01 00 ff ff ff ff      	jsgt r1, -0x1, +0x1 <.text+0x7df48>
   7e060: 05 00 ee ff 00 00 00 00      	ja -0x12 <.text+0x7deb8>
   7e068: 1f 20 00 00 00 00 00 00      	sub64 r0, r2
   7e070: 3f 10 00 00 00 00 00 00      	div64 r0, r1
   7e078: 95 00 00 00 00 00 00 00      	exit
   7e080: 18 01 00 00 ef 71 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1b71ef
   7e090: b7 02 00 00 29 00 00 00      	mov64 r2, 0x29
   7e098: 18 03 00 00 00 de 1b 00 00 00 00 00 00 00 00 00      	lddw r3, 0x1bde00
   7e0a8: 85 10 00 00 8f 5c 02 00      	call 0x25c8f
