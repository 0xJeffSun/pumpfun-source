| region | original bytes | 651: in place / layout-only / missing | ordered: in place / layout-only / missing |
| --- | ---: | ---: | ---: |
| ELF header | 64 | 60 / 2 / 2 | 59 / 3 / 2 |
| program headers | 224 | 193 / 21 / 10 | 193 / 21 / 10 |
| .text | 1,162,040 | 5,845 / 808,185 / 348,010 | 8,318 / 807,985 / 345,737 |
| .rodata | 25,715 | 0 / 21,114 / 4,601 | 0 / 24,602 / 1,113 |
| padding before .data.rel.ro | 5 | 5 / 0 / 0 | 4 / 0 / 1 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .dynamic | 176 | 0 / 174 / 2 | 0 / 174 / 2 |
| .dynsym | 408 | 0 / 408 / 0 | 0 / 408 / 0 |
| .dynstr | 255 | 0 / 255 / 0 | 0 / 255 / 0 |
| padding before .rel.dyn | 1 | 0 / 0 / 1 | 0 / 0 / 1 |
| .rel.dyn | 70,384 | 0 / 31,264 / 39,120 | 0 / 43,424 / 26,960 |
| .shstrtab | 72 | 0 / 72 / 0 | 0 / 72 / 0 |
| section headers | 576 | 0 / 566 / 10 | 0 / 566 / 10 |
| **ELF extent** | **1,268,504** | **6,103** / **869,157** / **393,244** | **8,574** / **885,118** / **374,812** |

651: candidate 97bd5553c199cd24…, extent delta +28,680 B, complete ELF equal False, candidate-only bytes 419,337

ordered: candidate ef65f2fed6698b85…, extent delta +28,680 B, complete ELF equal False, candidate-only bytes 403,579
