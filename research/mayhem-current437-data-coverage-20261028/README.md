# Qualified437 data coverage and remaining obligations

This inventory measures the original byte intervals justified by the current437
Source, code-reference, selected32, writer48 and counted-literal observations.
It first reruns the published data verifier, then unions intervals rather than
summing references. No source, matcher, candidate or public packet is modified.
All addresses below are **absolute original ELF addresses**, with exclusive end
bounds. They are not offsets relative to `.text`.

Original SHA-256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Candidate symbol SHA-256:
`32098641a885e48451df4f6d8cb62f45afafc96651106f5e467ac3f7e0a9ab9a`. Data packet manifest:
`18c4a4a4fbea00ec2c251cd1694cdb5bcd8fabbea556cfcacfef7171f9df5da9`.

## What is covered

The two payload sections contain **26,180 bytes**. These existing obligations
cover **6,100 bytes (23.30%)**: **5,352 raw-equal bytes** and **748 further bytes
checked through pointer correspondence**. **20,080 payload bytes (76.70%)** have
no interval-level obligation in these proofs yet. This is a footprint of the
listed proofs, not an estimate of engineering effort or proof of a mismatch.

ELF metadata is reported separately. Across every allocated, file-backed,
non-text section, the combined footprint is **16,612 of 67,729 bytes**. Of those,
**8,856 bytes are raw-equal** and **7,756 further bytes have pointer/address
correspondence**. No claim of whole-data or whole-ELF identity follows.

| Section | Original bytes | Raw-equal bytes | Further mapped bytes | Union covered | Uncovered |
|---|---:|---:|---:|---:|---:|
| `.rodata` | 18,396 | 1,724 | 0 | 1,724 | 16,672 |
| `.data.rel.ro` | 7,784 | 3,628 | 748 | 4,376 | 3,408 |
| `.dynamic` | 176 | 0 | 0 | 0 | 176 |
| `.dynsym` | 384 | 0 | 0 | 0 | 384 |
| `.dynstr` | 221 | 0 | 0 | 0 | 221 |
| `.rel.dyn` | 40,768 | 3,504 | 7,008 | 10,512 | 30,256 |

The Source footprint comes from **499 sites referring to 139 distinct 24-byte
records** recognized by the current Source reader. A record's four-byte zero word, length, line and column are exact;
its other pointer word is mapped to a byte-identical counted filename, including
the final NUL. Thirty selected 32-byte records add exact size/alignment and
zero-or-function fields. Five writer records extend those spans to 48 bytes.
Twenty-one counted instruction labels add 575 exact payload bytes. These ranges
can overlap, so the total uses a union.

A checked data pointer contributes its low four zero bytes to raw equality and
its high four address bytes to correspondence. This follows the actual data
encoding, not an assumption that pointer values are equal. Exact fixed-width
scalar values also imply exact bytes. If a byte has both forms of evidence it
is counted once, under raw equality. Mapped bytes may happen to match
numerically; this ledger does not give them raw credit.

The 48 code-address loads occupy `.text`, not a data allocation. Their 384
immediate-operand bytes have code-target correspondence and are excluded from
the non-text totals. Their complete target functions are covered by the
existing window relation; this inventory adds no code matches.

The selected obligations require 876 relocation entries. For each, the eight-byte
`r_offset` has a checked code/data-slot correspondence and the four-byte type is
exactly 8. Those 12-byte subranges account for 10,512 covered bytes in `.rel.dyn`.
The four-byte symbol-index word is **not** counted merely because the ELF parser
read it. The other 1,672 relocation entries, `.dynamic`, `.dynsym` and `.dynstr`
have no additional byte-range credit from these selected data proofs. Other
repository analyses may inspect them; that is not the same as this proof.

Headers, non-allocated sections, file gaps and loader padding are outside this
denominator. Uncovered ranges may contain strings, tables, scalars, padding or
unused bytes. Their boundaries are coverage boundaries, not inferred allocation
extents.

## Largest uncovered payload ranges

The xrefs are actual relocated original-code loads whose target lies in the
range. They are point references, not proof of the size or type of the referenced
object. Counts include matched and unmatched owners; `coverage.json` retains
every owner, candidate name and closure disposition. Incoming data pointers are
listed separately without inventing an enclosing object.

| Section | Absolute range | Bytes | Code xrefs | Leading owners (xref count) | Incoming data pointers |
|---|---|---:|---:|---|---:|
| `.rodata` | 713,022–725,428 | 12,406 | 239 | O0284 (72), O0266 (26), O0328 (25) | 161 |
| `.rodata` | 710,584–712,495 | 1,911 | 509 | O0134 (64), O0136 (63), O0124 (61) | 17 |
| `.data.rel.ro` | 728,944–730,688 | 1,744 | 87 | O0286 (77), O0276 (5), O0277 (5) | 0 |
| `.rodata` | 708,904–710,568 | 1,664 | 118 | O0052 (26), O0071 (6), O0081 (5) | 27 |
| `.data.rel.ro` | 732,104–732,456 | 352 | 2 | O0345 (1), O0351 (1) | 0 |
| `.rodata` | 708,538–708,872 | 334 | 128 | O0009 (8), O0071 (5), O0072 (5) | 6 |
| `.rodata` | 707,032–707,264 | 232 | 29 | O0067 (5), O0066 (3), O0072 (2) | 6 |
| `.data.rel.ro` | 732,856–733,048 | 192 | 3 | O0400 (3) | 0 |
| `.data.rel.ro` | 727,696–727,880 | 184 | 9 | O0213 (3), O0221 (3), O0098 (1) | 0 |
| `.data.rel.ro` | 732,648–732,760 | 112 | 5 | O0374 (1), O0375 (1), O0403 (1) | 0 |
| `.data.rel.ro` | 726,592–726,688 | 96 | 4 | O0077 (2), O0079 (2) | 0 |
| `.data.rel.ro` | 726,784–726,880 | 96 | 4 | O0083 (2), O0084 (2) | 0 |

## Concrete next obligations

1. **Counted ErrorCode names.** O0284 (`anchor_lang::error::ErrorCode::name`)
   contributes 72 direct references into the 12,406-byte `.rodata` gap. Analyze its
   finite return blocks to recover each actual pointer/length pair, then compare
   only those intervals. Use the native enum/macro source to label cases, while
   retaining explicit original tag-domain constraints. Do not treat the entire
   gap as one string table or infer lengths from NULs.
2. **Error display pieces.** O0286 (`ErrorCode` Display) has 77 direct references
   into the 1,744-byte `.data.rel.ro` gap. O0276/O0277 add ten log references there.
   Recover each formatter piece-array count from its call setup, bind each slice
   pointer and length, and compare the associated literals. This can address
   descriptor and payload bytes together without claiming generic formatting.
3. **Account-name strings in matched parsers.** O0134/O0136/O0124 contribute
   64/63/61 references into the 1,911-byte `.rodata` gap. These matched parser
   bodies provide stable call sites for recovering counted account names and
   constraint labels. Bound each interval from the actual Source/formatter
   construction; a pointer alone is not a string-length proof.
4. **Small standard-library diagnostic tables.** The 352-byte gap at
   732,104–732,456 is referenced by O0345 (`std::io::ErrorKind` Debug) and O0351
   (`hashbrown` capacity overflow). The 192-byte gap at 732,856–733,048 is referenced
   by O0400 (`slice_error_fail_rt`). Treat them as several candidate records
   until individual count/length evidence establishes their spans.
5. **Trade-only descriptor roots.** The two 96-byte gaps at 726,592–726,688 and
   726,784–726,880 have four references each from AMM and V2 trade owners. Those
   four business bodies remain unmatched. Inventory their exact local
   pointer/length construction and source types, but do not promote an entire
   record or handler based on adjacent bytes or matching arithmetic alone.
6. **Relocation and section layout.** Complete the uncredited relocation fields,
   then compare dynamic tags, symbol definitions/names and ordering through
   explicit section/symbol correspondences. These would still be symbolic
   obligations until the ordinary build reproduces original numeric addresses,
   section placement and final ELF bytes. No binary rewriting is an acceptable
   closure mechanism.

The first three lanes have concrete owners, pointers and source material and can
run independently of the four remaining trade-body searches. They should
produce bounded span proofs and mutation controls, then update this union.

## Reproduce

From the repository root:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-data-coverage-20261028/analyze.py --output-dir work/mayhem437-data-coverage
```

`coverage.json` contains all intervals, modes, evidence owners, per-section unions,
complements and xrefs. It also records the data verifier's summaries and this
analysis script's hash. Source/record arithmetic, section containment and union
partition identities are checked during generation. No compiler or VM runs.

Compare `work/mayhem437-data-coverage/coverage.json` with this packet's `coverage.json`; the output location does not affect the report.
