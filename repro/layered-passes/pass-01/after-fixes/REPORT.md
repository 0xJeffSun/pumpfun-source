# Static comparison after the accepted Pump and Fees fixes

The new Pump artifact adds one original inferred window with a call-consistent match under the retained Pump method. Fees' matching, ambiguity and immediate-call residual counts are unchanged. Neither artifact equals its captured original. Smaller files and shifted addresses are not counted as source-fidelity improvements.

This package examines the accepted main **working integration**, identified by exact package seals below. It does not assume a publication commit. The comparison baseline is the sealed layer-one analysis at `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. No builds, transactions, new fixtures, source corrections or semantic investigation of excluded windows were performed here.

| Binding | Pump | Fees |
| --- | --- | --- |
| Current stripped SHA-256 | `731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93` | `5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49` |
| Current genuine symbol SHA-256 | `151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d` | `99ac87e9b79e86e23d7458400475d5d967545e345767d0263d544bfd02660a07` |
| Accepted package manifest SHA-256 | `1c67ccb8b40fc7b8cedcf156e5712970b6bc45fb64134a0dfb0eae3699cf7892` | `b41cf0026b5067c516e21e47e9ee476ffb27b7951dcaabe8562d94ee0a0f7a1a` |
| Original SHA-256 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Actual recorded source inputs | 37; README separately bound | 26; includes README and root Cargo files |
| Whole-file original equality | false | false |

`input-config.json` identifies the source packages; `input-origins.json` binds every copied input to its provenance. The copied source archives, expanded source trees, source maps, documentation maps, build attempts, final comparisons, logs, identity records, helper snapshots and actual compiler/stripper observations are checked together. Both recorded builds compile with v1.44 and strip with v1.52. The unchanged 53-file SDK is checked from the Fees snapshot against both builds' recorded maps. Tool executable hashes are historical observations, not a claim that those Darwin tools are installed on a verifier's host. The original historical compiler recipe remains unproved.

The Pump main compiler succeeded; its outer launcher subsequently failed because it had sealed a changing orchestration log. The original failure, before-log archive, and additive completion record remain present. This package preserves that distinction and does not turn the launcher into a reported success or rerun it. Source, helper, SDK, dependency and whole-ELF checks are retained. Fees' main and scratch README inputs differ as documented, while their executable and symbol bytes are identical; all 26 actual main inputs remain bound.

## Before and after

The two methods have different call-consistency and ambiguity conventions. Their counts must not be combined into a semantic coverage percentage.

| Pump retained method | c1ff baseline (568546) | current (731003) |
| --- | ---: | ---: |
| Original inferred windows | 1,035 | 1,035 |
| Candidate symbol / inferred windows | 777 / 777 | 785 / 785 |
| Candidate windows with normalized size/relocation pattern | 489 | 492 |
| Candidate windows with call-consistent pattern | 422 | 423 |
| Original windows with call-consistent pattern | 449 | 450 |
| Pattern pairs | 1,458 | 1,464 |
| Call-consistent pairs | 1,075 | 1,076 |
| Raw-equal pattern pairs (not necessarily unique or call-consistent) | 617 | 617 |
| Candidate rows with ambiguous call-consistent matches | 99 | 99 |

Only two original rows change match presence or cardinality. Original `[37584,38608)` now has candidate pattern `[44664,45688)`, but it fails the retained call-consistency test. Original `[910520,911080)` now has the call-consistent candidate `[651888,652448)`. The current symbol identifies the latter candidate as `CurveHop::exit`. This assigns a candidate symbol, not an independently recovered historical function name. The exhaustive before/after ledger preserves the full hashes, alternative matches and targets.

Nine uniquely corresponding candidate symbol stems have changed normalized bytes: the route module's `add`, `sub`, `n`, `move_lamports`, `native_buyback`, `execute`, `MultiHopCurve::try_accounts`, `CurveHop::try_accounts`, and `CurveHop::exit`. `result.json` records their exact current and prior ranges; symbol stems alone do not establish original equivalence. The candidate still has 362 symbol windows without a call-consistent mapping, and 585 original windows have none under this method. Near-pattern alternatives remain unaccepted hypotheses.

| Fees retained method | c1ff baseline (fc1088) | current (5cf8) |
| --- | ---: | ---: |
| Original inferred / candidate symbol windows | 585 / 546 | 585 / 546 |
| Candidate normalized call-consistent / call-conflict / unmatched | 438 / 3 / 105 | 438 / 3 / 105 |
| Original mapped / call-conflict / unattributed | 437 / 3 / 145 | 437 / 3 / 145 |
| Candidate raw-equal ranges | 98 | 98 |
| Candidate / original ambiguous rows | 137 / 138 | 137 / 138 |
| Strict / consistent pairs | 1,167 / 1,039 | 1,167 / 1,039 |
| All-direct-supported candidate ranges | 411 | 411 |
| Consistent candidate ranges lacking all immediate targets | 27 | 27 |
| Residual call pairs within consistent pairs | 92 | 92 |

All original Fees match-status/cardinality rows are unchanged. One unique candidate symbol stem changes normalized bytes: `create_donation_fee_pda`, now `[424568,437432)` (12,864 bytes). Its smaller size is not additional matched coverage. The candidate text decreases by 728 bytes, from 698,696 to 697,968. The method still records 272 immediate-call residuals across all strict pairs: 92 unresolved target windows, two terminal-boundary-only matches, and 178 unique-target contradictions. There are 122 candidate and 121 original indirect calls. The full catalog preserves every row and ambiguity; no unmatched row is hidden.

## Scope of the evidence

All original inferred windows, current candidate symbol windows, candidate inferred windows and raw function-symbol rows are retained. The instruction ledgers record raw signed direct-call operands and targets, indirect calls, unclassified branches, relocated values and raw instruction bytes. Full ELF headers, section metadata, section-relative differences, whole-file positional differences, relocations and file-region partitions remain available. Symbol ELF `.text` bytes and relocation patterns are checked against the stripped candidate.

The structural text partitions have zero uncovered or overlapping bytes for both programs and all three window views. That is a partition check, **not** proof that inferred boundaries are historical functions, every branch is reachable, every original behavior is reconstructed, or every dependency is equivalent. Entry inference uses symbols, entrypoints, calls and relocations; terminal extents retain their limitations. Same-size alternatives are not accepted matches. Matching normalization removes selected relocated/call operands, so the raw target and data obligations remain separate.

Pump's data previews do not prove consumed extents. Fees retains 25 original and 25 current bounded data objects, with current objects taken from the new accepted package and verified against their actual pointers/bytes; unmarked data remains unresolved. Neither indirect-call semantics nor full transitive framework/data closure is established. No known remaining source, metadata, dependency, runtime-coverage or byte-equality gap is removed by this inventory. Existing accepted handler and transaction counts do not change. Excluded original windows remain opaque; vocabulary-based categories in the inherited ledgers are triage annotations, not semantic investigation or historical naming.

Whole-file positional differences include 880,923 mismatched shared bytes plus an 8,906,291-byte original excess tail for Pump; Fees has 421,191 mismatched shared bytes plus a 178,928-byte original excess tail. These positional counts mix layout, metadata and body differences and are not an optimization or progress metric.

## Reproduction and portability

From any working directory, run the package's absolute path:

```sh
python3 -B /path/to/after-fixes/verify.py
python3 -B /path/to/after-fixes/verify.py --recompute
python3 -B /path/to/after-fixes/negative_tests.py
```

The first command checks the outer seal, the retained baseline inner seals, all copied provenance, source/archive equality and compiler binding consistency. `--recompute` also regenerates and compares all 23 compressed ledgers using static Python byte readers only. It requires no `work/`, repository checkout, SDK installation, network access or runtime harness. The negative-test command creates an isolated temporary copy and rejects altered candidate/source/analyzer/ledger inputs and a missing symbol artifact. It never changes this package.

`run_layer.py pump|fees` is the reusable entry point. `--inputs PROGRAM_DIRECTORY` explicitly selects an input tree, `--baseline JSON` selects the comparison ledger and `--output NEW_DIRECTORY` writes a new set of ledgers. `--check` compares with existing compressed output. The input tree must follow the included `inputs/current`, original ELF, expanded sources, source map and `input-selection.json` contract. Fees also requires its independently frozen whole catalog and bounded-data object input. Readers support these SBF ELF layouts (`.text` virtual address equals file offset), not arbitrary ELF architectures. The old method source is archived unchanged; `method-adaptation.patch` files document explicit path/schema/binding adaptations. Fees' `details-adaptation.patch` removes only the old hard-coded selected helper-address lead; it is not silently applied to new offsets. Current facts come from the new symbol artifacts. No matching rule was strengthened or weakened.

`before/` preserves both complete sealed baseline packages, including their original manifests. Historical bytecode in one archived baseline is retained as sealed provenance and is never executed. `result.json` is the concise machine summary; `*/ledgers/before-after.json.gz` retains every original row and every candidate symbol-stem comparison. `complete-structure.json.gz` and `complete-instructions.json.gz` provide the common exhaustive views; the remaining ledgers retain each program's original matching and data-residual details. Compressed JSON is deterministic (`mtime=0`).
