  1a0bc0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a0bc8: b7 02 00 00 00 00 00 00      	mov64 r2, 0x0
  1a0bd0: 85 10 00 00 8c 29 00 00      	call 0x298c
  1a0bd8: bf 07 00 00 00 00 00 00      	mov64 r7, r0
  1a0be0: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a0be8: 85 10 00 00 2c 25 00 00      	call 0x252c
  1a0bf0: c5 07 01 00 00 00 00 00      	jslt r7, 0x0, +0x1 <custom_panic+0x49948>
  1a0bf8: bf 08 00 00 00 00 00 00      	mov64 r8, r0
  1a0c00: bf 61 00 00 00 00 00 00      	mov64 r1, r6
  1a0c08: 18 02 00 00 ff ff ff ff 00 00 00 00 ff ff ef 43      	lddw r2, 0x43efffffffffffff
  1a0c18: 85 10 00 00 61 29 00 00      	call 0x2961
  1a0c20: bf 01 00 00 00 00 00 00      	mov64 r1, r0
  1a0c28: b7 00 00 00 ff ff ff ff      	mov64 r0, -0x1
  1a0c30: 65 01 01 00 00 00 00 00      	jsgt r1, 0x0, +0x1 <custom_panic+0x49988>
  1a0c38: bf 80 00 00 00 00 00 00      	mov64 r0, r8
  1a0c40: 95 00 00 00 00 00 00 00      	exit
  1a0c48: 18 01 00 00 c0 f3 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bf3c0
  1a0c58: 85 10 00 00 c5 22 00 00      	call 0x22c5
  1a0c60: 18 01 00 00 d8 f3 1b 00 00 00 00 00 00 00 00 00      	lddw r1, 0x1bf3d8
  1a0c70: 85 10 00 00 cd 22 00 00      	call 0x22cd
