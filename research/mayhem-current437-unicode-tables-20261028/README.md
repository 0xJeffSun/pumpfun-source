# Qualified437 Unicode printable table intervals

This packet verifies **six source-declared tables, totaling 1,449 exact bytes**, passed by the matched `core::unicode::printable::is_printable` function to its matched `check` helper. Original owner O0402 is `[690080, 690848)`; the corresponding candidate is recorded in `observations.json.gz`.

The prior data-proof chain is preserved: **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**. This adds exact data comparisons, not a function match or a Unicode semantic result.

## What establishes each count

For non-ASCII code points below 0x10000, the actual wrapper constructs slices for SINGLETONS0U, SINGLETONS0L and NORMAL0. For code points in [0x10000,0x20000), it constructs the corresponding plane1 slices. The verifier checks the actual plane guards, pointer loads, all six count operands, stack stores, register assignments and shared direct call. No adjacency or NUL value supplies a bound.

The upper tables hold byte pairs: the call passes 40 or 44 elements and the helper doubles that count, reads byte offsets 0 and1, and advances by2. The lower and normal tables have one-byte elements. The verifier checks the helper's actual stack-argument unpacking, load widths, end-pointer construction and selected boundary comparisons. The complete wrapper/helper bodies retain their existing normalized match; this packet makes only the stated data/slice claims and does not prove the printable classification algorithm or observe runtime behavior.

The installed compiler-sysroot `core/src/unicode/printable.rs` declares all six constants and source calls. It is archived with its licenses, source hash, recorded compiler path and compiler hash. This is explanatory installed-source context, not an attestation of original build provenance. The actual source values, immediate counts and byte intervals are checked independently against both frozen images.

Each interval must be inside `.rodata`, contain no relocation and equal the declared source bytes in both images. A failed table comparison removes the owner pair and propagates through the preserved dependency relation. The original intervals form the contiguous union `[723755,725204)`, but the proof validates six separately counted spans and makes no full-allocation claim.

## Coverage and validation

This adds **1,449 raw-equal payload bytes**. Cumulative coverage reaches **16,678 / 26,180 bytes (63.7%)**, with **9,502 bytes unproved**. Pointer/metadata tables from prior proofs retain their separate correspondence classification. No relocation-table, runtime, whole-Unicode or whole-ELF identity claim is added. The packet remains bound to qualified437.

```sh
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-unicode-tables-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-unicode-tables-20261028/test_verify.py
```

Tests corrupt every table's actual bytes and pointer operand, every count operand, the plane guard and helper stride. They check relation pruning, the following-byte boundary, strict inventory, special files, and resealed source/report/coverage edits.

| Table | Elements | Bytes per element | Original interval | Candidate interval | Total bytes |
| --- | --- | --- | --- | --- | --- |
| `SINGLETONS0U` | 40 | 2 | 724537–724617 | 704977–705057 | 80 |
| `SINGLETONS0L` | 290 | 1 | 724617–724907 | 705057–705347 | 290 |
| `NORMAL0` | 297 | 1 | 724907–725204 | 705347–705644 | 297 |
| `SINGLETONS1U` | 44 | 2 | 723755–723843 | 704195–704283 | 88 |
| `SINGLETONS1L` | 208 | 1 | 723843–724051 | 704283–704491 | 208 |
| `NORMAL1` | 486 | 1 | 724051–724537 | 704491–704977 | 486 |
