| region | original bytes | u2b: in place / layout-only / missing | ordered: in place / layout-only / missing |
| --- | ---: | ---: | ---: |
| ELF header | 64 | 60 / 2 / 2 | 59 / 3 / 2 |
| program headers | 224 | 193 / 21 / 10 | 193 / 21 / 10 |
| .text | 1,162,040 | 5,747 / 836,631 / 319,662 | 8,318 / 836,360 / 317,362 |
| .rodata | 25,715 | 0 / 21,134 / 4,581 | 0 / 24,790 / 925 |
| padding before .data.rel.ro | 5 | 4 / 0 / 1 | 5 / 0 / 0 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .dynamic | 176 | 0 / 174 / 2 | 0 / 174 / 2 |
| .dynsym | 408 | 0 / 408 / 0 | 0 / 408 / 0 |
| .dynstr | 255 | 0 / 255 / 0 | 0 / 255 / 0 |
| padding before .rel.dyn | 1 | 0 / 0 / 1 | 0 / 0 / 1 |
| .rel.dyn | 70,384 | 0 / 27,664 / 42,720 | 0 / 46,480 / 23,904 |
| .shstrtab | 72 | 0 / 72 / 0 | 0 / 72 / 0 |
| section headers | 576 | 0 / 566 / 10 | 0 / 566 / 10 |
| **ELF extent** | **1,268,504** | **6,004** / **894,023** / **368,477** | **8,575** / **916,737** / **343,192** |

u2b: candidate 0fb1f8860b4d0e54…, extent delta +33,576 B, complete ELF equal False, candidate-only bytes 398,629

ordered: candidate ec076bf0fc0c7768…, extent delta +33,560 B, complete ELF equal False, candidate-only bytes 376,034
