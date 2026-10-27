| region | original bytes | 647: in place / layout-only / missing | ordered: in place / layout-only / missing |
| --- | ---: | ---: | ---: |
| ELF header | 64 | 60 / 2 / 2 | 59 / 3 / 2 |
| program headers | 224 | 191 / 21 / 12 | 191 / 21 / 12 |
| .text | 1,162,040 | 5,747 / 802,055 / 354,238 | 8,318 / 801,734 / 351,988 |
| .rodata | 25,715 | 0 / 21,122 / 4,593 | 0 / 24,601 / 1,114 |
| padding before .data.rel.ro | 5 | 0 / 0 / 5 | 0 / 0 / 5 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .dynamic | 176 | 0 / 173 / 3 | 0 / 173 / 3 |
| .dynsym | 408 | 0 / 408 / 0 | 0 / 408 / 0 |
| .dynstr | 255 | 0 / 255 / 0 | 0 / 255 / 0 |
| padding before .rel.dyn | 1 | 0 / 0 / 1 | 0 / 0 / 1 |
| .rel.dyn | 70,384 | 0 / 26,800 / 43,584 | 0 / 43,168 / 27,216 |
| .shstrtab | 72 | 0 / 72 / 0 | 0 / 72 / 0 |
| section headers | 576 | 0 / 566 / 10 | 0 / 566 / 10 |
| **ELF extent** | **1,268,504** | **5,998** / **858,570** / **403,936** | **8,568** / **878,609** / **381,327** |

647: candidate 0881a95dafe46562…, extent delta +25,104 B, complete ELF equal False, candidate-only bytes 426,473

ordered: candidate b05f7268b9d5ddfd…, extent delta +25,104 B, complete ELF equal False, candidate-only bytes 406,514
