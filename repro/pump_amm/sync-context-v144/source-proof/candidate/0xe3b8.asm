
/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/claim-self-transfer-v144/unstripped.so:	file format elf64-sbf

Disassembly of section .text:

000000000000e3b8 <_ZN99_$LT$anchor_lang..accounts..account..Account$LT$T$GT$$u20$as$u20$anchor_lang..Accounts$LT$B$GT$$GT$12try_accounts17h3c482a816be0f5ceE>:
    e3b8: 79 23 08 00 00 00 00 00      	ldxdw r3, [r2 + 0x8]
    e3c0: 55 03 0c 00 00 00 00 00      	jne r3, 0x0, +0xc <LBB102_3>
    e3c8: bf a2 00 00 00 00 00 00      	mov64 r2, r10
    e3d0: 07 02 00 00 f0 ff ff ff      	add64 r2, -0x10
    e3d8: bf 16 00 00 00 00 00 00      	mov64 r6, r1
    e3e0: bf 21 00 00 00 00 00 00      	mov64 r1, r2
    e3e8: b7 02 00 00 bd 0b 00 00      	mov64 r2, 0xbbd
    e3f0: 85 10 00 00 ea d1 01 00      	call 0x1d1ea
    e3f8: 79 a1 f0 ff 00 00 00 00      	ldxdw r1, [r10 - 0x10]
    e400: 79 a2 f8 ff 00 00 00 00      	ldxdw r2, [r10 - 0x8]
    e408: 7b 26 10 00 00 00 00 00      	stxdw [r6 + 0x10], r2
    e410: 7b 16 08 00 00 00 00 00      	stxdw [r6 + 0x8], r1
    e418: 7a 06 00 00 00 00 00 00      	stdw [r6 + 0x0], 0x0
    e420: 05 00 08 00 00 00 00 00      	ja +0x8 <LBB102_2>

000000000000e428 <LBB102_3>:
    e428: 07 03 00 00 ff ff ff ff      	add64 r3, -0x1
    e430: 7b 32 08 00 00 00 00 00      	stxdw [r2 + 0x8], r3
    e438: 79 23 00 00 00 00 00 00      	ldxdw r3, [r2 + 0x0]
    e440: bf 34 00 00 00 00 00 00      	mov64 r4, r3
    e448: 07 04 00 00 30 00 00 00      	add64 r4, 0x30
    e450: 7b 42 00 00 00 00 00 00      	stxdw [r2 + 0x0], r4
    e458: bf 32 00 00 00 00 00 00      	mov64 r2, r3
    e460: 85 10 00 00 5a ef ff ff      	call -0x10a6

000000000000e468 <LBB102_2>:
    e468: 95 00 00 00 00 00 00 00      	exit
