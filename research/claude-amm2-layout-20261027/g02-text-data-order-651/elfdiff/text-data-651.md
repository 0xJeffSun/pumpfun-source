# Whole-ELF diff

original ELF `51a5f6a7fb5a812d...` (extent 1,268,504 B; capture adds 9,217,211 zero allocation bytes); candidate `ef65f2fed6698b85...` (1,297,184 B)

| measure | value |
| --- | ---: |
| complete ELF equal | False |
| first differing offset | 0x18 |
| ELF extent delta (candidate - original) | +28680 |
| original bytes in place (corresponding and equal at the same offset) | 8,574 (0.68%) |
| (raw statistic: bytes equal at the same offset, coincidences included) | 565,881 |
| original bytes reproduced modulo layout | 893,692 (70.45%) |
| original bytes not reproduced | 374,812 |
| candidate-only bytes (functions, .rodata, .data.rel.ro, .rel.dyn) | 403,579 |
| windows normalized / raw / unmatched (repo measure) | 651 / 168 / 134 of 785 |
| windows equal in place | 0 |

## Byte classes (original ELF extent)

| class | bytes |
| --- | ---: |
| text:displaced-equal | 793,423 |
| text:unmatched-window | 345,240 |
| reldyn:displaced-equal | 35,951 |
| reldyn:original-only | 26,960 |
| rodata:displaced-equal | 24,602 |
| text:operand:call:equivalent | 9,028 |
| in-place | 8,574 |
| reldyn:offset-equivalent | 7,473 |
| data:displaced-equal | 6,026 |
| text:operand:lddw:.rodata:equivalent | 4,277 |
| data:pointer-equivalent | 1,582 |
| structural:displaced-equal | 1,437 |
| rodata:original-only | 1,113 |
| text:operand:lddw:.data.rel.ro:equivalent | 990 |
| data:original-only | 880 |
| text:operand:lddw:.data.rel.ro:target-not-reproduced | 294 |
| text:operand:lddw:.text:equivalent | 267 |
| text:operand:call:target-not-reproduced | 101 |
| structural:address-equivalent | 62 |
| text:operand:call:different-target | 58 |
| data:pointer-target-not-reproduced | 48 |
| data:different-content | 48 |
| structural:layout-consequence | 24 |
| text:operand:lddw:.data.rel.ro:different-target | 18 |
| text:operand:lddw:.rodata:different-target | 14 |
| text:operand:lddw:.rodata:target-not-reproduced | 6 |
| text:operand:lddw:.text:different-target | 6 |
| structural:padding-differs | 2 |

## Regions

| region | original off+size | candidate off+size | size delta | classes (bytes) |
| --- | --- | --- | ---: | --- |
| ELF header | 0x0+64 | - | - | in-place 59, structural:address-equivalent 3, structural:layout-consequence 2 |
| program headers | 0x40+224 | - | - | in-place 193, structural:address-equivalent 21, structural:layout-consequence 10 |
| .text | 0x120+1,162,040 | 0x120+1,189,416 | +27376 | text:displaced-equal 793,423, text:unmatched-window 345,240, text:operand:call:equivalent 9,028, in-place 8,318, text:operand:lddw:.rodata:equivalent 4,277, text:operand:lddw:.data.rel.ro:equivalent 990, text:operand:lddw:.data.rel.ro:target-not-reproduced 294, text:operand:lddw:.text:equivalent 267, text:operand:call:target-not-reproduced 101, text:operand:call:different-target 58, text:operand:lddw:.data.rel.ro:different-target 18, text:operand:lddw:.rodata:different-target 14, text:operand:lddw:.rodata:target-not-reproduced 6, text:operand:lddw:.text:different-target 6 |
| .rodata | 0x11bc58+25,715 | 0x122748+25,173 | -542 | rodata:displaced-equal 24,602, rodata:original-only 1,113 |
| padding before .data.rel.ro | 0x1220cb+5 | - | - | in-place 4, structural:padding-differs 1 |
| .data.rel.ro | 0x1220d0+8,584 | 0x1289a0+9,152 | +568 | data:displaced-equal 6,026, data:pointer-equivalent 1,582, data:original-only 880, data:pointer-target-not-reproduced 48, data:different-content 48 |
| .dynamic | 0x124258+176 | 0x12ad60+176 | +0 | structural:displaced-equal 168, structural:address-equivalent 6, structural:layout-consequence 2 |
| .dynsym | 0x124308+408 | 0x12ae10+408 | +0 | structural:displaced-equal 402, structural:address-equivalent 6 |
| .dynstr | 0x1244a0+255 | 0x12afa8+255 | +0 | structural:displaced-equal 255 |
| padding before .rel.dyn | 0x12459f+1 | - | - | structural:padding-differs 1 |
| .rel.dyn | 0x1245a0+70,384 | 0x12b0a8+71,664 | +1280 | reldyn:displaced-equal 35,951, reldyn:original-only 26,960, reldyn:offset-equivalent 7,473 |
| .shstrtab | 0x135890+72 | 0x13c898+72 | +0 | structural:displaced-equal 72 |
| section headers | 0x1358d8+576 | - | - | structural:displaced-equal 540, structural:address-equivalent 26, structural:layout-consequence 10 |

## .text

window status (count / original bytes): normalized 483 / 775,120, unmatched 134 / 345,240, raw-equal-displaced 168 / 41,680

differing instruction slots in matched windows: call:equivalent 4268, lddw:.rodata:equivalent 1491, lddw:.data.rel.ro:equivalent 495, lddw:.data.rel.ro:target-not-reproduced 147, lddw:.text:equivalent 90, call:target-not-reproduced 51, call:different-target 23, lddw:.data.rel.ro:different-target 9, lddw:.rodata:different-target 5, lddw:.rodata:target-not-reproduced 2, lddw:.text:different-target 2

size budget: candidate .text 1,189,416 - original 1,162,040 = +27376 = candidate-only functions 373,320 + bytes outside symbols 0 - original unmatched windows 345,240 - windows sharing one body 704

candidate-only text by crate: pump_amm_recovered 370,512, spl_token_2022 1,096, V 760, core 600, T 352

## .rodata / .data.rel.ro

.rodata: aligned 24,602 B, original-only 1,113 B, candidate-only 571 B in 59 hunks

.data.rel.ro: words 1073 / 1144, aligned with pointer targets mapped 877; unaligned bytes {"pointer-equivalent": 592, "candidate-only": 1448, "original-only": 880, "pointer-target-not-reproduced": 48, "different-content": 48}

panic Location records: original 113, candidate 138, common 75, original-only 38, candidate-only 63

| file | original-only | candidate-only | original minus nearest candidate line |
| --- | ---: | ---: | --- |
| /home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/accum.rs | 0 | 1 |  |
| programs/pump-amm/src/creator_reassignment.rs | 0 | 1 |  |
| programs/pump-amm/src/incentives.rs | 0 | 10 |  |
| programs/pump-amm/src/instructions/coin_creator/set_coin_creator.rs | 1 | 0 |  |
| programs/pump-amm/src/instructions/extend_account.rs | 1 | 0 |  |
| programs/pump-amm/src/instructions/swap/buy.rs | 1 | 1 | +230 x1 |
| programs/pump-amm/src/instructions/swap/multi_hop_swap.rs | 12 | 21 | +6 x2, -6 x1, +1 x1, -9 x1, +0 x1 |
| programs/pump-amm/src/instructions/swap/sell.rs | 2 | 0 |  |
| programs/pump-amm/src/instructions/swap/trade_v2.rs | 0 | 2 |  |
| programs/pump-amm/src/legacy_sell.rs | 0 | 2 |  |
| programs/pump-amm/src/lib.rs | 0 | 1 |  |
| programs/pump-amm/src/state/global_config.rs | 2 | 2 | +328 x1, +325 x1 |
| programs/pump-amm/src/state/pool.rs | 0 | 2 |  |
| programs/pump-amm/src/state/volume_accumulator.rs | 17 | 18 | +0 x2, +27 x1, +55 x1, +189 x1, +203 x1 |
| programs/pump-amm/src/utils/math.rs | 1 | 1 | +6 x1 |
| programs/pump-amm/src/utils/token.rs | 1 | 1 | +151 x1 |

## Dynamic structures and headers

.rel.dyn: entries 4399 / 4479; aligned equivalent 2714; original-only 1685; candidate-only 1765; relative [4225, 4303]

.dynsym: same names in same order True; .dynstr equal True; differing symbols [{"name": "custom_panic", "diffs": {"value": ["0xee4b0", "0xd3f40", "equivalent"]}}, {"name": "entrypoint", "diffs": {"value": ["0xee028", "0xd3ab8", "equivalent"]}}]

.dynamic differing entries: [{"index": 1, "original": ["DT_REL", "0x1245a0"], "candidate": ["DT_REL", "0x12b0a8"], "equivalent": true}, {"index": 2, "original": ["DT_RELSZ", "0x112f0"], "candidate": ["DT_RELSZ", "0x117f0"], "equivalent": false}, {"index": 4, "original": ["DT_RELCOUNT", "0x1081"], "candidate": ["DT_RELCOUNT", "0x10cf"], "equivalent": false}, {"index": 5, "original": ["DT_SYMTAB", "0x124308"], "candidate": ["DT_SYMTAB", "0x12ae10"], "equivalent": true}, {"index": 7, "original": ["DT_STRTAB", "0x1244a0"], "candidate": ["DT_STRTAB", "0x12afa8"], "equivalent": true}]

ELF header: [{"field": "e_entry", "original": "0xee028", "candidate": "0xd3ab8", "equivalent": true}, {"field": "e_shoff", "original": "0x1358d8", "candidate": "0x13c8e0", "equivalent": false}]

program headers: [{"phdr": 0, "field": "p_filesz", "original": "0x11bb38", "candidate": "0x122628", "equivalent": false}, {"phdr": 0, "field": "p_memsz", "original": "0x11bb38", "candidate": "0x122628", "equivalent": false}, {"phdr": 1, "field": "p_offset", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_vaddr", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_paddr", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_filesz", "original": "0x8600", "candidate": "0x8618", "equivalent": false}, {"phdr": 1, "field": "p_memsz", "original": "0x8600", "candidate": "0x8618", "equivalent": false}, {"phdr": 2, "field": "p_offset", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_vaddr", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_paddr", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_filesz", "original": "0x11588", "candidate": "0x11a88", "equivalent": false}, {"phdr": 2, "field": "p_memsz", "original": "0x11588", "candidate": "0x11a88", "equivalent": false}, {"phdr": 3, "field": "p_offset", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}, {"phdr": 3, "field": "p_vaddr", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}, {"phdr": 3, "field": "p_paddr", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}]

section headers: 17 differing fields ["sh_addr", "sh_offset", "sh_size"]; candidate-only sections []
