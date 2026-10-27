# Whole-ELF diff

original ELF `51a5f6a7fb5a812d...` (extent 1,268,504 B; capture adds 9,217,211 zero allocation bytes); candidate `ec076bf0fc0c7768...` (1,302,064 B)

| measure | value |
| --- | ---: |
| complete ELF equal | False |
| first differing offset | 0x18 |
| ELF extent delta (candidate - original) | +33560 |
| original bytes in place (corresponding and equal at the same offset) | 8,575 (0.68%) |
| (raw statistic: bytes equal at the same offset, coincidences included) | 565,117 |
| original bytes reproduced modulo layout | 925,312 (72.95%) |
| original bytes not reproduced | 343,192 |
| candidate-only bytes (functions, .rodata, .data.rel.ro, .rel.dyn) | 376,034 |
| windows normalized / raw / unmatched (repo measure) | 680 / 169 / 105 of 785 |
| windows equal in place | 0 |

## Byte classes (original ELF extent)

| class | bytes |
| --- | ---: |
| text:displaced-equal | 821,208 |
| text:unmatched-window | 316,760 |
| reldyn:displaced-equal | 38,501 |
| rodata:displaced-equal | 24,790 |
| reldyn:original-only | 23,904 |
| text:operand:call:equivalent | 9,247 |
| in-place | 8,575 |
| reldyn:offset-equivalent | 7,979 |
| data:displaced-equal | 6,026 |
| text:operand:lddw:.rodata:equivalent | 4,610 |
| data:pointer-equivalent | 1,582 |
| structural:displaced-equal | 1,437 |
| text:operand:lddw:.data.rel.ro:equivalent | 1,034 |
| rodata:original-only | 925 |
| data:original-only | 880 |
| text:operand:lddw:.data.rel.ro:target-not-reproduced | 396 |
| text:operand:lddw:.text:equivalent | 261 |
| text:operand:call:target-not-reproduced | 95 |
| structural:address-equivalent | 62 |
| text:operand:call:different-target | 55 |
| data:pointer-target-not-reproduced | 48 |
| data:different-content | 48 |
| structural:layout-consequence | 24 |
| text:operand:lddw:.data.rel.ro:different-target | 18 |
| text:operand:lddw:.rodata:target-not-reproduced | 18 |
| text:operand:lddw:.rodata:different-target | 14 |
| text:operand:lddw:.text:different-target | 6 |
| structural:padding-differs | 1 |

## Regions

| region | original off+size | candidate off+size | size delta | classes (bytes) |
| --- | --- | --- | ---: | --- |
| ELF header | 0x0+64 | - | - | in-place 59, structural:address-equivalent 3, structural:layout-consequence 2 |
| program headers | 0x40+224 | - | - | in-place 193, structural:address-equivalent 21, structural:layout-consequence 10 |
| .text | 0x120+1,162,040 | 0x120+1,193,864 | +31824 | text:displaced-equal 821,208, text:unmatched-window 316,760, text:operand:call:equivalent 9,247, in-place 8,318, text:operand:lddw:.rodata:equivalent 4,610, text:operand:lddw:.data.rel.ro:equivalent 1,034, text:operand:lddw:.data.rel.ro:target-not-reproduced 396, text:operand:lddw:.text:equivalent 261, text:operand:call:target-not-reproduced 95, text:operand:call:different-target 55, text:operand:lddw:.data.rel.ro:different-target 18, text:operand:lddw:.rodata:target-not-reproduced 18, text:operand:lddw:.rodata:different-target 14, text:operand:lddw:.text:different-target 6 |
| .rodata | 0x11bc58+25,715 | 0x1238a8+25,352 | -363 | rodata:displaced-equal 24,790, rodata:original-only 925 |
| padding before .data.rel.ro | 0x1220cb+5 | - | - | in-place 5 |
| .data.rel.ro | 0x1220d0+8,584 | 0x129bb0+9,152 | +568 | data:displaced-equal 6,026, data:pointer-equivalent 1,582, data:original-only 880, data:pointer-target-not-reproduced 48, data:different-content 48 |
| .dynamic | 0x124258+176 | 0x12bf70+176 | +0 | structural:displaced-equal 168, structural:address-equivalent 6, structural:layout-consequence 2 |
| .dynsym | 0x124308+408 | 0x12c020+408 | +0 | structural:displaced-equal 402, structural:address-equivalent 6 |
| .dynstr | 0x1244a0+255 | 0x12c1b8+255 | +0 | structural:displaced-equal 255 |
| padding before .rel.dyn | 0x12459f+1 | - | - | structural:padding-differs 1 |
| .rel.dyn | 0x1245a0+70,384 | 0x12c2b8+71,920 | +1536 | reldyn:displaced-equal 38,501, reldyn:original-only 23,904, reldyn:offset-equivalent 7,979 |
| .shstrtab | 0x135890+72 | 0x13dba8+72 | +0 | structural:displaced-equal 72 |
| section headers | 0x1358d8+576 | - | - | structural:displaced-equal 540, structural:address-equivalent 26, structural:layout-consequence 10 |

## .text

window status (count / original bytes): normalized 511 / 803,232, unmatched 105 / 316,760, raw-equal-displaced 169 / 42,048

differing instruction slots in matched windows: call:equivalent 4406, lddw:.rodata:equivalent 1602, lddw:.data.rel.ro:equivalent 517, lddw:.data.rel.ro:target-not-reproduced 198, lddw:.text:equivalent 88, call:target-not-reproduced 48, call:different-target 22, lddw:.data.rel.ro:different-target 9, lddw:.rodata:target-not-reproduced 6, lddw:.rodata:different-target 5, lddw:.text:different-target 2

size budget: candidate .text 1,193,864 - original 1,162,040 = +31824 = candidate-only functions 348,584 + bytes outside symbols 0 - original unmatched windows 316,760 - windows sharing one body 0

candidate-only text by crate: pump_amm_recovered 346,168, spl_token_2022 1,096, V 760, T 352, core 208

## .rodata / .data.rel.ro

.rodata: aligned 24,790 B, original-only 925 B, candidate-only 562 B in 60 hunks

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

.rel.dyn: entries 4399 / 4495; aligned equivalent 2905; original-only 1494; candidate-only 1590; relative [4225, 4317]

.dynsym: same names in same order True; .dynstr equal True; differing symbols [{"name": "custom_panic", "diffs": {"value": ["0xee4b0", "0xd44c0", "equivalent"]}}, {"name": "entrypoint", "diffs": {"value": ["0xee028", "0xd4038", "equivalent"]}}]

.dynamic differing entries: [{"index": 1, "original": ["DT_REL", "0x1245a0"], "candidate": ["DT_REL", "0x12c2b8"], "equivalent": true}, {"index": 2, "original": ["DT_RELSZ", "0x112f0"], "candidate": ["DT_RELSZ", "0x118f0"], "equivalent": false}, {"index": 4, "original": ["DT_RELCOUNT", "0x1081"], "candidate": ["DT_RELCOUNT", "0x10dd"], "equivalent": false}, {"index": 5, "original": ["DT_SYMTAB", "0x124308"], "candidate": ["DT_SYMTAB", "0x12c020"], "equivalent": true}, {"index": 7, "original": ["DT_STRTAB", "0x1244a0"], "candidate": ["DT_STRTAB", "0x12c1b8"], "equivalent": true}]

ELF header: [{"field": "e_entry", "original": "0xee028", "candidate": "0xd4038", "equivalent": true}, {"field": "e_shoff", "original": "0x1358d8", "candidate": "0x13dbf0", "equivalent": false}]

program headers: [{"phdr": 0, "field": "p_filesz", "original": "0x11bb38", "candidate": "0x123788", "equivalent": false}, {"phdr": 0, "field": "p_memsz", "original": "0x11bb38", "candidate": "0x123788", "equivalent": false}, {"phdr": 1, "field": "p_offset", "original": "0x11bc58", "candidate": "0x1238a8", "equivalent": true}, {"phdr": 1, "field": "p_vaddr", "original": "0x11bc58", "candidate": "0x1238a8", "equivalent": true}, {"phdr": 1, "field": "p_paddr", "original": "0x11bc58", "candidate": "0x1238a8", "equivalent": true}, {"phdr": 1, "field": "p_filesz", "original": "0x8600", "candidate": "0x86c8", "equivalent": false}, {"phdr": 1, "field": "p_memsz", "original": "0x8600", "candidate": "0x86c8", "equivalent": false}, {"phdr": 2, "field": "p_offset", "original": "0x124308", "candidate": "0x12c020", "equivalent": true}, {"phdr": 2, "field": "p_vaddr", "original": "0x124308", "candidate": "0x12c020", "equivalent": true}, {"phdr": 2, "field": "p_paddr", "original": "0x124308", "candidate": "0x12c020", "equivalent": true}, {"phdr": 2, "field": "p_filesz", "original": "0x11588", "candidate": "0x11b88", "equivalent": false}, {"phdr": 2, "field": "p_memsz", "original": "0x11588", "candidate": "0x11b88", "equivalent": false}, {"phdr": 3, "field": "p_offset", "original": "0x124258", "candidate": "0x12bf70", "equivalent": true}, {"phdr": 3, "field": "p_vaddr", "original": "0x124258", "candidate": "0x12bf70", "equivalent": true}, {"phdr": 3, "field": "p_paddr", "original": "0x124258", "candidate": "0x12bf70", "equivalent": true}]

section headers: 17 differing fields ["sh_addr", "sh_offset", "sh_size"]; candidate-only sections []
