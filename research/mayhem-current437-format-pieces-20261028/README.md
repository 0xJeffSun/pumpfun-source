# Qualified437 formatter piece arrays

This packet checks the static pieces selected by `ProgramErrorWithOrigin::log` and `AnchorError::log`. Original owners are O0276 at `[621536, 623240)` and O0277 at `[623240, 624832)`. Their normalized candidates are `ProgramErrorWithOrigin::log` and `AnchorError::log` in the qualified437 symbol image. Both call the matched `alloc::fmt::format::format_inner` at original 669936 and candidate 603616.

The prior printable-table, ErrorKind, ProgramError, ErrorCode message, and ErrorCode name obligations are preserved. The relation remains **437 normalized functions / 141 raw functions / 431 closed windows / 581 pairs**. This adds data evidence, not a function match.

## What fixes each count

Each arm stores an `Arguments` value and passes its address to `format_inner` in r2. The verifier requires the relocated piece-array pointer, the immediate piece count at Arguments+8, the immediate argument count at Arguments+24, the zero word at Arguments+32, and the exact register setup of that call. Arms that do not fall into the shared call jump to it without another write of those slots.

`format_inner` loads the piece count from Arguments+8. It then reads each descriptor length at byte offset 8 and advances 16 bytes, once per remaining count. It also loads the argument count from Arguments+24. The proof stops at that walk. It does not claim the formatted output, the writer callback, or allocator behavior.

A descriptor is 16 bytes in `.data.rel.ro`: a type-8 relocation whose low word is zero, and an unrelocated length word. The high word is the string address. Its bytes must equal the other image and the static piece of the vendored format literal. The 32 descriptors tile `[728944, 729456)` because each stored count selects that many records. Adjacency is not used as the bound.

The vendored `anchor-lang` 1.0.0 `error.rs` in the qualified437 source archive supplies the literals. A placeholder splits a literal. `{:?}` and `{}` are each one argument. A final placeholder leaves a trailing empty source piece; these images do not store that empty piece, so the count equals the non-empty pieces. An empty piece anywhere else is rejected. This is an observation about these ten sites, not a general formatter rule.

The same bodies also pass bare `Left:` and `Right:` to `sol_log_` with immediate lengths 5 and 6. Those four calls are counted strings, not piece arrays.

## Coverage

This adds **762 payload bytes**: **250 raw string bytes** and **512 descriptor bytes**. Of the descriptor bytes, **384 are raw** (zero low words and length words) and **128 are pointer correspondence**. Original payload coverage becomes **17,440 / 26,180 bytes (66.62%)**, leaving **8,740 unproved**. `.rodata` has 10,984 / 18,396 covered bytes. `.data.rel.ro` has 6,456 / 7,784. No relocation-table bytes are added. Old packets stay unchanged.

The 202-byte union `[714341, 714543)` contains every piece except `. Error Number: ` at `[710536, 710552)` and `ProgramError caused by account: ` at `[709192, 709224)`. These are unions of counted intervals, not allocation extents.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-format-pieces-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-format-pieces-20261028/test_verify.py
```

Tests corrupt every piece byte, descriptor pointer, and length, and every direct literal. Relation checks drop the owning pair. Count immediates, the `format_inner` stride, and its argument-count load must stay exact. A following byte outside a selected interval is not absorbed. Inventory, symlink, FIFO, and resealed report, coverage, and source edits are rejected.

## Piece sites

Addresses are original virtual addresses. The candidate has the same counts, lengths, and bytes at the addresses recorded in `observations.json.gz`.

| Owner | Pieces | Args | Original array | Source literal |
| --- | ---: | ---: | --- | --- |
| O0276 | 4 | 3 | 728944 | `ProgramError occurred. Error Code: {:?}. Error Number: {}. Error Message: {}.` |
| O0276 | 5 | 4 | 729104 | `ProgramError caused by account: {}. Error Code: {:?}. Error Number: {}. Error Message: {}.` |
| O0276 | 6 | 5 | 729008 | `ProgramError thrown in {}:{}. Error Code: {:?}. Error Number: {}. Error Message: {}.` |
| O0276 | 1 | 1 | 729184 | `Left: {}` |
| O0276 | 1 | 1 | 729200 | `Right: {}` |
| O0277 | 4 | 3 | 729216 | `AnchorError occurred. Error Code: {}. Error Number: {}. Error Message: {}.` |
| O0277 | 5 | 4 | 729376 | `AnchorError caused by account: {}. Error Code: {}. Error Number: {}. Error Message: {}.` |
| O0277 | 6 | 5 | 729280 | `AnchorError thrown in {}:{}. Error Code: {}. Error Number: {}. Error Message: {}.` |
| O0277 | 1 | 1 | 729184 | `Left: {}` |
| O0277 | 1 | 1 | 729200 | `Right: {}` |

## Counted string intervals

Ends are exclusive. Repeated pieces are one interval.

| Bytes | Original interval | Text |
| ---: | --- | --- |
| 32 | 709192–709224 | `ProgramError caused by account: ` |
| 16 | 710536–710552 | `. Error Number: ` |
| 35 | 714341–714376 | `ProgramError occurred. Error Code: ` |
| 17 | 714376–714393 | `. Error Message: ` |
| 1 | 714393–714394 | `.` |
| 23 | 714394–714417 | `ProgramError thrown in ` |
| 1 | 714417–714418 | `:` |
| 14 | 714418–714432 | `. Error Code: ` |
| 6 | 714432–714438 | `Left: ` |
| 7 | 714438–714445 | `Right: ` |
| 5 | 714445–714450 | `Left:` |
| 6 | 714450–714456 | `Right:` |
| 34 | 714456–714490 | `AnchorError occurred. Error Code: ` |
| 22 | 714490–714512 | `AnchorError thrown in ` |
| 31 | 714512–714543 | `AnchorError caused by account: ` |
