# Mayhem: compose both Legacy closures with the qualified 434 source

This packet composes the six source changes from PR #404, head
`c82783e9ddedd6cbd1e91ddf2209f04a1e304b91`, onto the frozen
[qualified 434-window source](../mayhem-current434-composition-20261027/README.md).
Both Legacy trade bodies now match the complete original windows under the
unchanged normalization. Every previous raw, normalized, ordered-callee and
Source observation is retained.

Fresh signed offline validation is retained in full and independently checked.
No runtime claim here is taken from PR #404's summary-only trade report.

| Measure | Qualified parent | Composed source |
| --- | ---: | ---: |
| Complete normalized windows | 434/441 | 436/441 |
| Raw local windows | 141 | 141 |
| Windows closed under the ordered direct-call relation | 425 | 429 |
| Positive direct-call observations | 4,371 | 4,473 |
| Positive Source observations | 472 | 486 |
| Matched original instruction bytes | 607,712 | 634,552 |

The only new local matches are O0081 (Legacy Buy, 13,848 bytes) and O0082
(Legacy Sell, 12,992 bytes). Both have all 50 immediate calls at the original
positions and the complete original CFGs (216 and 201 blocks). Their 26,840
bytes are complete-window evidence, not selected subsequences. O0186 and O0187
also join the recursive direct-call relation because their Legacy targets close.
The complete ELF remains different.

The five unmatched original windows are O0076 (8,400 bytes), O0077 (9,736),
O0079 (17,312), O0083 (18,648), and O0084 (18,096): 72,192 instruction bytes.
This is 1.13% of the window count and 10.21% of the catalogued instruction bytes;
neither percentage is an engineering-effort estimate. Raw local windows cover
65,504 bytes. The [full inventory](inventory.tsv) keeps every one of the 441
original windows and its candidate counterparts explicit.

## Source composition

Every PR #404 parent file equals the corresponding qualified-parent file.
Its six replacements therefore have no source conflict with the earlier
historical-macro, allocator-call and Source-origin fixes. The exact 67-file
source archive, complete hash inventories, six overrides and generated
`source.patch` independently establish that composition. `verify.py` rebuilds
this source relation from the two frozen inputs before checking the ELF proofs.

The recovery changes actual source structure: curve and cap references delay
reserve reads until use; checked price validation uses `let ... else`; CPI
construction and signer seeds are expressions; the event uses native Rust
layout with a Boolean side field and an unchanged manual wire serializer.
All statements in the source delta serve the program's calculations, calls,
errors or event values. No executable bytes, assembler or match policy changed.

## Build and evidence scope

Two root compilations using an isolated copy of the qualified dependency cache
produced the same stripped and symbol ELFs. They are not fresh dependency
compilations. Both 67-file input sets, command lines, stdout/stderr, linker
invocations and maps are retained. Tool and archive hashes were observed after
both builds; this is not a continuous before/after tool attestation. Linked
archives agree with the qualified parent or its pinned target-library inventory.

- Stripped SHA-256: `cac32dadb032cc80366124ab3ceb430fdc5bfae23ab9cec1b5d18bb9e0f55e5b`
- Symbol SHA-256: `f03e73e7b82b152e64e9a999f4f9276ece9ebcd42d2273d0b8adaa7c5fb0c229`

The verifier uses the unchanged parent reader and matcher. It recomputes all
body, raw, call, Source and recursive direct-call results from ELF bytes;
checks allocated stripped/symbol image equality; and reuses the quote,
initializer and nested integer typed-data checks. It does not promote generic
indirect-call, arbitrary data-object or unrestricted behavioral equivalence.
Mutation tests alter actual instructions, masked call destinations, Source
payloads, source overrides and compiler records, and check inventory rejection
of extra files, symlinks and special files.

## Fresh signed validation

The composed candidate was run against the original and, for the sweep/rate
suites, the qualified 434 control. Saved transaction signatures, input presets,
program-account hashes, state, events, inner instructions, return data and every
non-compute log are checked independently. The retained coverage is:

- 6,636 trade pairs across fourteen families: 13,272 signed transaction records.
- 692 sweep and 150 rate cases across three binaries: 2,526 signed records.
- 856 targeted rate-boundary cases across three binaries: 2,568 signed records.
- 69 initializer pairs, including their setup transactions: 168 signed records.

All comparisons pass. These are 18,534 verified signed records, not that many
unique scenarios. The unchanged preset families and finite initial states do
not prove unrestricted runtime behavior. The sweep checker differs from its
parent only in expecting zero repaired-control diagnostics: the qualified 434
control already contains those repairs. The verifier checks that exact source
delta. No execution here used chain RPC.

The 747,288,916 raw trade-report bytes are retained losslessly as xz, with raw
and compressed hashes and sizes. Extra negative controls reject signature,
executed-program hash, preset, account-data and non-compute-log corruption.

## Verify


```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-composition-20261027/verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-composition-20261027/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-composition-20261027/test_runtime.py
```

Verification reads saved evidence only. It does not compile or execute a target,
call a chain, or contact RPC. `--static-only` excludes runtime verification and
must not be reported as full qualification.
