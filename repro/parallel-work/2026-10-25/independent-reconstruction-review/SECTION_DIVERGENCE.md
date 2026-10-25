# Where the byte divergence lives (ELF section breakdown)

Measured 2026-10-25 with the repo's own `scripts/analyze.py` parser, comparing each
captured original ELF against its current committed candidate. This localizes the
remaining byte-identicality gap by section.

| Program | ELF extent orig | ELF extent cand | cand smaller by | `.text` shortfall | `.text` share of gap |
| --- | ---: | ---: | ---: | ---: | ---: |
| pump | 1,934,800 | 1,576,744 | 358,056 | 335,544 | **94%** |
| pump_amm | 1,268,504 | 1,199,296 | 69,208 | 57,912 | **84%** |
| pump_fees | 873,256 | 768,848 | 104,408 | 102,792 | **98%** |
| mayhem | 775,416 | 667,552 | 107,864 | 100,816 | **93%** |

Per-section detail (orig → cand, bytes):

```
pump      .text 1,792,208 -> 1,456,664 (-335,544)  .rel.dyn 98,352 -> 79,296 (-19,056)  .rodata 32,031 -> 29,359 (-2,672)  .data.rel.ro 10,352 -> 9,568 (-784)
pump_amm  .text 1,162,040 -> 1,104,128 (-57,912)   .rel.dyn 70,384 -> 60,608 (-9,776)   .rodata 25,715 -> 24,155 (-1,560)  .data.rel.ro 8,584 -> 8,672 (+88)
pump_fees .text   799,648 ->   696,856 (-102,792)  .rel.dyn 43,968 -> 43,312 (-656)     .rodata 21,079 -> 20,075 (-1,004)  .data.rel.ro 6,744 -> 6,824 (+80)
mayhem    .text   706,744 ->   605,928 (-100,816)  .rel.dyn 40,768 -> 35,616 (-5,152)   .rodata 18,396 -> 16,540 (-1,856)  .data.rel.ro 7,784 -> 7,744 (-40)
```

`.dynsym`, `.dynstr`, `.dynamic`, `.shstrtab` are within a few bytes everywhere.

## Interpretation (remaining-work implication)

The gap is **overwhelmingly compiled code** (`.text`), not data, strings or
relocations:
- `.rodata` and `.data.rel.ro` are already within ~1–3 KB of the originals — the
  constants/strings/vtables are substantially recovered.
- Each candidate's `.text` is missing **~5%–19%** of the original's code
  (pump is the largest gap at ~336 KB, ~19% of its `.text`).

That missing code is some mix of:
1. **Genuinely unimplemented behavior** — the documented partial handlers (nested
   routes, Token-2022 / transfer-fee extension paths, exhaustive account validation)
   and the unrecovered/stopped handlers. This is real source still to recover.
2. **Compiler-driven code differences** — monomorphization, inlining decisions,
   panic/format machinery and std/core code that a *different* toolchain build emits
   differently. This is the unresolved-recipe half and cannot be closed by writing
   more handler source; it needs the correct historical compiler + dependency graph.

Both halves must close before `.text` matches, and `.text` dominates the gap, so
**whole-binary byte-identicality for the core programs is gated on code recovery +
exact compiler attribution** — consistent with the 0/4 whole-binary status and the
repo's (correct) refusal to brute-force the recipe. `.rodata`/relocation cleanup is
not where the remaining bytes are.
