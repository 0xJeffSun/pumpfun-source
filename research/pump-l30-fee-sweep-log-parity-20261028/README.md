# Pump Main L30 empty-fee-sweep log parity

This packet composes the already established Round47 empty-fee-sweep diagnostic into the newer Pump Main L30 research source. It does not claim a new historical-source discovery and does not modify the maintained `programs/pump` tree.

Qualification used upstream commit `4b163e0f6f7ff0f8ef7c947fad7993c8af694f7a`; the unchanged packet was rebased for publication onto current upstream `8c1a7bf6d94a8aa49b8836dc2c57b6402fef3ad8`. The immutable parent is `research/claude-pump-integration-20261027/r37-layout-30`, with stripped SHA-256 `d90e49c69de901ce642470016c99a33c398815fe4a4a4c8962c7c5f2973c010b` and unstripped SHA-256 `bb93433848be3ac21506ad4c4b985751bb828036ed725586420f4d589489ba44`.

## Source correction

Only the proposed L30 copy of `programs/pump/src/sweep_fees.rs` changes. After recipient or creator-vault validation and after selecting the creator/protocol balance, the existing zero-amount exit now emits:

```text
Program log: Nothing to sweep for fee bucket 0
Program log: Nothing to sweep for fee bucket 1
```

Bucket 0 is the protocol fee path and bucket 1 is the creator fee path. The edit is on the existing physical line 147; both source files remain 162 lines. It therefore leaves every pre-existing source line number in this file unchanged. `source.patch` is the exact one-hunk diff, and `proposed/sweep_fees.rs` is the complete corrected file.

The retained original-ELF observations contain exactly 84 affected no-op rows: 43 protocol-bucket cases and 41 creator-bucket cases. In every row, earlier account validation has succeeded, the selected amount is zero, the original returns successfully without state mutation, events, CPI, or return data, and the L30 parent lacks only the diagnostic. The notice is not emitted on positive sweeps or on cases that fail before this branch.

## Authenticated source-only build

The untouched L30 source was first rebuilt to both published parent hashes. The admitted `linux-v1.44-sbpf` profile uses the pinned native macOS v1.44 host compiler and the authenticated Linux x86_64 v1.44 SBPF target libraries specified by `scripts/pump_linux_v144_sbpf_libraries.json`. All 25 admitted target-library hashes pass. This establishes exact reproducibility of the authenticated L30 source-only recipe; it does not establish the provenance of the original deployed program's historical compiler.

Two isolated corrected builds agree byte-for-byte:

- stripped: `3b8588e551e30dde30fc41d39443a59753202d5af1b8b8e4cde44584ab3c2a27`
- unstripped: `eb6b008a7b2d447067aaecb4c16b19e3c7e5dc4f5aaca387fbeadcee2d36a28f`
- corrected source: `7785b8d9ac34c2499996b97d2b8984058b6ea802926dade88443013ae4fcce01`

Each build record binds the compiler, Cargo, objcopy, complete primary source inventory, dependency source calls, target-library profile, build log, and both ELF outputs. Local absolute paths in those records are provenance from the isolated build. The verifier resolves primary sources and loader inputs by repository-relative suffix and verifies their content hashes. The compiler produced the same 60 crate warnings as the reproduced baseline and no SBF stack-offset warning.

## Machine-code census

The unchanged 1,035-window matcher reports:

| Metric | L30 parent | Corrected candidate | Gain | Loss |
| --- | ---: | ---: | ---: | ---: |
| Normalized | 989 | 989 | 0 | 0 |
| Raw equal | 166 | 166 | 0 | 0 |
| Matched text bytes | 1,444,792 | 1,444,792 | 0 | 0 |

The sweep handler remains unmatched at `0x7cc18` and grows from 8,224 to 8,496 bytes. No previously matched function is lost. The separately generated linker-layout experiment's 204 raw matches belong to another artifact and are not combined with this source-only result.

## Fresh runtime acceptance

The focused 504-case signed fee-sweep suite binds the captured original, untouched parent, and corrected candidate to their exact executable hashes. It reproduces all 84 missing messages against the parent and closes all 84 against the corrected candidate. The 43 bucket-0 and 41 bucket-1 rows retain identical errors, pre/post account state, rollback, events, inner instructions, and return data. It also covers zero and positive creator/protocol fees across native SOL, SPL Token, and Token-2022 quotes, validation failures, read-only and owner failures, insufficient balances, and successful and failing CPI paths.

The complete captured-upgradeable-loader corpus was freshly executed against the exact candidate ELF:

- 44 suites and 10,468 paired cases
- 44 actual loader receipts and 23,834 executable loads
- 0 structured mismatches
- 18,268 serialized transaction occurrences and 2,407 distinct signed transactions reverified
- 10,384 candidate log sequences unchanged from retained L30 and exactly 84 message-only additions
- all 10,468 original log sequences unchanged from the retained run

The retained-to-fresh comparison excludes compute-consumption lines only; it preserves source filenames, line numbers, and columns verbatim. The ordered-log review additionally normalizes source line/column values while retaining filenames, matching the historical L30 audit. Its measured before/after is:

| Ordered log category | L30 parent | Corrected candidate |
| --- | ---: | ---: |
| Missing empty fee-bucket notice | 84 | 0 |
| All non-filename differences | 138 | 54 |
| Filename-only differences | 52 | 52 |
| Missing cashback-zero notice | 31 | 31 |
| Missing frozen creator-quote notice | 9 | 9 |
| Message-order differences | 6 | 6 |
| Missing non-system creator notice | 5 | 5 |
| Missing canonical-pool notice | 3 | 3 |

No new ordered-log family appears. Whole-ELF equality and complete behavioral equivalence are not claimed.

## Evidence and limitations

`runtime/affected-cases.json` binds every affected case body and transaction, `runtime/focused/` retains the three-way focused evidence, and `runtime/full.json.gz` plus 44 loader receipts retain the full fresh corpus. `measurement/` stores the recomputable function inventory. `builds/` stores the reproduced inputs and both identical candidate builds. `MANIFEST.json` rejects missing, changed, symlinked, or extra evidence files.

The 14 negative controls reject missing or misnumbered bucket messages, messages on positive fees or before validation, changed return/event/CPI behavior, executable or signature tampering, swapped outcomes, altered logs, missing or duplicate identities, and extra files. The first full-corpus setup attempt failed closed because a sparse checkout omitted authenticated Mayhem inputs; `failed-controls/` preserves that failure, and no result from it is accepted.

Forty-six of 1,035 windows remain unmatched. Fifty-four non-filename and 52 filename-only ordered-log differences remain outside this correction. Data/relocation completeness, whole-ELF identity, the generated-linker 204-raw artifact, and original historical source/toolchain provenance remain separate work.

See [REPRODUCE.md](REPRODUCE.md) for verification and rebuild commands.
