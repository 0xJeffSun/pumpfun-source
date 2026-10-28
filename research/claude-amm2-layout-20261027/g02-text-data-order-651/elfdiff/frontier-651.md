# Whole-ELF diff

original ELF `51a5f6a7fb5a812d...` (extent 1,268,504 B; capture adds 9,217,211 zero allocation bytes); candidate `97bd5553c199cd24...` (1,297,184 B)

| measure | value |
| --- | ---: |
| complete ELF equal | False |
| first differing offset | 0x18 |
| ELF extent delta (candidate - original) | +28680 |
| original bytes in place (corresponding and equal at the same offset) | 6,103 (0.48%) |
| (raw statistic: bytes equal at the same offset, coincidences included) | 566,794 |
| original bytes reproduced modulo layout | 875,260 (69.00%) |
| original bytes not reproduced | 393,244 |
| candidate-only bytes (functions, .rodata, .data.rel.ro, .rel.dyn) | 419,337 |
| windows normalized / raw / unmatched (repo measure) | 651 / 148 / 134 of 785 |
| windows equal in place | 0 |

## Byte classes (original ELF extent)

| class | bytes |
| --- | ---: |
| text:displaced-equal | 794,319 |
| text:unmatched-window | 345,240 |
| reldyn:original-only | 39,120 |
| reldyn:displaced-equal | 26,653 |
| rodata:displaced-equal | 21,114 |
| text:operand:call:equivalent | 10,626 |
| in-place | 6,103 |
| data:displaced-equal | 5,978 |
| reldyn:offset-equivalent | 4,611 |
| rodata:original-only | 4,601 |
| text:operand:lddw:.rodata:target-not-reproduced | 2,178 |
| text:operand:lddw:.rodata:equivalent | 2,098 |
| structural:displaced-equal | 1,439 |
| data:pointer-equivalent | 1,118 |
| data:original-only | 992 |
| text:operand:lddw:.data.rel.ro:equivalent | 956 |
| text:operand:lddw:.data.rel.ro:target-not-reproduced | 342 |
| data:different-content | 192 |
| data:pointer-vs-data | 192 |
| text:operand:lddw:.text:equivalent | 186 |
| text:operand:call:target-not-reproduced | 185 |
| data:pointer-target-not-reproduced | 104 |
| structural:address-equivalent | 59 |
| text:operand:call:different-target | 40 |
| structural:layout-consequence | 24 |
| text:operand:lddw:.rodata:different-target | 21 |
| data:pointer-different-target | 8 |
| text:operand:lddw:.data.rel.ro:different-target | 4 |
| structural:padding-differs | 1 |

## Regions

| region | original off+size | candidate off+size | size delta | classes (bytes) |
| --- | --- | --- | ---: | --- |
| ELF header | 0x0+64 | - | - | in-place 60, structural:address-equivalent 2, structural:layout-consequence 2 |
| program headers | 0x40+224 | - | - | in-place 193, structural:address-equivalent 21, structural:layout-consequence 10 |
| .text | 0x120+1,162,040 | 0x120+1,189,416 | +27376 | text:displaced-equal 794,319, text:unmatched-window 345,240, text:operand:call:equivalent 10,626, in-place 5,845, text:operand:lddw:.rodata:target-not-reproduced 2,178, text:operand:lddw:.rodata:equivalent 2,098, text:operand:lddw:.data.rel.ro:equivalent 956, text:operand:lddw:.data.rel.ro:target-not-reproduced 342, text:operand:lddw:.text:equivalent 186, text:operand:call:target-not-reproduced 185, text:operand:call:different-target 40, text:operand:lddw:.rodata:different-target 21, text:operand:lddw:.data.rel.ro:different-target 4 |
| .rodata | 0x11bc58+25,715 | 0x122748+25,171 | -544 | rodata:displaced-equal 21,114, rodata:original-only 4,601 |
| padding before .data.rel.ro | 0x1220cb+5 | - | - | in-place 5 |
| .data.rel.ro | 0x1220d0+8,584 | 0x1289a0+9,152 | +568 | data:displaced-equal 5,978, data:pointer-equivalent 1,118, data:original-only 992, data:different-content 192, data:pointer-vs-data 192, data:pointer-target-not-reproduced 104, data:pointer-different-target 8 |
| .dynamic | 0x124258+176 | 0x12ad60+176 | +0 | structural:displaced-equal 168, structural:address-equivalent 6, structural:layout-consequence 2 |
| .dynsym | 0x124308+408 | 0x12ae10+408 | +0 | structural:displaced-equal 404, structural:address-equivalent 4 |
| .dynstr | 0x1244a0+255 | 0x12afa8+255 | +0 | structural:displaced-equal 255 |
| padding before .rel.dyn | 0x12459f+1 | - | - | structural:padding-differs 1 |
| .rel.dyn | 0x1245a0+70,384 | 0x12b0a8+71,664 | +1280 | reldyn:original-only 39,120, reldyn:displaced-equal 26,653, reldyn:offset-equivalent 4,611 |
| .shstrtab | 0x135890+72 | 0x13c898+72 | +0 | structural:displaced-equal 72 |
| section headers | 0x1358d8+576 | - | - | structural:displaced-equal 540, structural:address-equivalent 26, structural:layout-consequence 10 |

## .text

window status (count / original bytes): normalized 503 / 779,816, unmatched 134 / 345,240, raw-equal-displaced 148 / 36,984

differing instruction slots in matched windows: call:equivalent 4439, lddw:.rodata:equivalent 765, lddw:.rodata:target-not-reproduced 726, lddw:.data.rel.ro:equivalent 478, lddw:.data.rel.ro:target-not-reproduced 171, lddw:.text:equivalent 92, call:target-not-reproduced 53, call:different-target 20, lddw:.rodata:different-target 7, lddw:.data.rel.ro:different-target 2

size budget: candidate .text 1,189,416 - original 1,162,040 = +27376 = candidate-only functions 373,320 + bytes outside symbols 0 - original unmatched windows 345,240 - windows sharing one body 704

candidate-only text by crate: pump_amm_recovered 370,512, spl_token_2022 1,096, V 760, core 600, T 352

## .rodata / .data.rel.ro

.rodata: aligned 21,114 B, original-only 4,601 B, candidate-only 4,057 B in 185 hunks

.data.rel.ro: words 1073 / 1144, aligned with pointer targets mapped 874; unaligned bytes {"pointer-equivalent": 104, "candidate-only": 1560, "pointer-target-not-reproduced": 104, "different-content": 192, "pointer-vs-data": 192, "original-only": 992, "pointer-different-target": 8}

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

.rel.dyn: entries 4399 / 4479; aligned equivalent 1954; original-only 2445; candidate-only 2525; relative [4225, 4303]

.dynsym: same names in same order True; .dynstr equal True; differing symbols [{"name": "custom_panic", "diffs": {"value": ["0xee4b0", "0xe6420", "equivalent"]}}, {"name": "entrypoint", "diffs": {"value": ["0xee028", "0xe5f98", "equivalent"]}}]

.dynamic differing entries: [{"index": 1, "original": ["DT_REL", "0x1245a0"], "candidate": ["DT_REL", "0x12b0a8"], "equivalent": true}, {"index": 2, "original": ["DT_RELSZ", "0x112f0"], "candidate": ["DT_RELSZ", "0x117f0"], "equivalent": false}, {"index": 4, "original": ["DT_RELCOUNT", "0x1081"], "candidate": ["DT_RELCOUNT", "0x10cf"], "equivalent": false}, {"index": 5, "original": ["DT_SYMTAB", "0x124308"], "candidate": ["DT_SYMTAB", "0x12ae10"], "equivalent": true}, {"index": 7, "original": ["DT_STRTAB", "0x1244a0"], "candidate": ["DT_STRTAB", "0x12afa8"], "equivalent": true}]

ELF header: [{"field": "e_entry", "original": "0xee028", "candidate": "0xe5f98", "equivalent": true}, {"field": "e_shoff", "original": "0x1358d8", "candidate": "0x13c8e0", "equivalent": false}]

program headers: [{"phdr": 0, "field": "p_filesz", "original": "0x11bb38", "candidate": "0x122628", "equivalent": false}, {"phdr": 0, "field": "p_memsz", "original": "0x11bb38", "candidate": "0x122628", "equivalent": false}, {"phdr": 1, "field": "p_offset", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_vaddr", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_paddr", "original": "0x11bc58", "candidate": "0x122748", "equivalent": true}, {"phdr": 1, "field": "p_filesz", "original": "0x8600", "candidate": "0x8618", "equivalent": false}, {"phdr": 1, "field": "p_memsz", "original": "0x8600", "candidate": "0x8618", "equivalent": false}, {"phdr": 2, "field": "p_offset", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_vaddr", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_paddr", "original": "0x124308", "candidate": "0x12ae10", "equivalent": true}, {"phdr": 2, "field": "p_filesz", "original": "0x11588", "candidate": "0x11a88", "equivalent": false}, {"phdr": 2, "field": "p_memsz", "original": "0x11588", "candidate": "0x11a88", "equivalent": false}, {"phdr": 3, "field": "p_offset", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}, {"phdr": 3, "field": "p_vaddr", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}, {"phdr": 3, "field": "p_paddr", "original": "0x124258", "candidate": "0x12ad60", "equivalent": true}]

section headers: 17 differing fields ["sh_addr", "sh_offset", "sh_size"]; candidate-only sections []
