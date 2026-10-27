# Mayhem external curve decoder recovery

The full-curve parent reconstructs `BondingCurve` and its account codec inside
Mayhem's `sell.rs`. Its unchecked decoder is 2,064 bytes, while the captured
O0213 body is 2,272 bytes. Moving that external account into a separate ordinary
Rust dependency and using the pinned Anchor `#[account("account")]` macro
recovers **the complete 2,272-byte normalized body of O0213**. All 15 ordered
immediate direct callees also have complete matching normalized bodies.

This addresses a source/code-generation gap in the current Mayhem work plan.
The parent full-field, padding and boxed-parser recovery is inherited and
credited to [the full-curve packet](../mayhem-full-curve-recovery/README.md).
Its four gains are not counted again here.

## Source scope and reproduction

`parent.json` binds revision `fa9dae66` and every one of its 54 source inputs:
16 root files plus 38 vendor files. `override/` and `source.patch` contain the
entire five-file delta; the proposal has 56 inputs:

- Add the local `pump-interface` path dependency and its canonical lock entry.
- Re-export its `BondingCurve` from the existing `external_curve` module.
- Put the same full field sequence in the new crate and derive the ordinary
  Anchor account codec. Explicit `Owner` remains the captured Pump program ID.

The handler/wrapper prefix and its source coordinates are unchanged. The
namespace argument preserves the ordinary `account:BondingCurve` discriminator
without deriving the Mayhem owner. The macro uses a local decoding cursor;
the prior manual implementation advances its caller's slice. No compiler output
is rewritten, padded or used as an input to compilation. Registry versions,
checksums, inherited vendor files and original captures remain unchanged.
Field and crate names are reconstruction labels, not authenticated historical
source spelling. `#[account]` is placed at `src/lib.rs:8`, corresponding to the
captured checked-decoder source record; this is a source coordinate, not a
claim that the entire checked decoder is recovered.

The original O0212 directly calls O0213. The proposed checked decoder directly
calls the uniquely matching unchecked body, binding the new match to this codec.
The unchanged all-window parser checks all 441 original windows against complete
candidate symbol ranges; it masks only its existing calls and declared relocations.
Allocated sections of stripped and symbol artifacts are compared before attribution.

| Measurement | Linux control | Proposal |
| --- | ---: | ---: |
| Complete normalized windows | 347 | 348 |
| Raw-local windows | 64 | 64 |
| O0213 unchecked decoder bytes | 2,064 | 2,272 (original: 2,272) |
| O0212 checked decoder bytes | 1,000 | 864 (original: 640) |

The exact old match-ID set is retained; **O0213 is the sole new full-body match**.
The published Darwin parent has 345 complete matches and 59 raw-local windows.
The Linux control's platform differences are not credited to this patch.
The checked decoder remains unmatched. O0213 still has one unresolved indirect
call and six relocated data/code references with unresolved extents/content.
Immediate direct-callee equality does not prove transitive call or data closure.
Whole ELF/capture identity and complete handler equivalence remain unachieved.

## Local build and runtime evidence

A root build, an all-dependency-clean build and a build using the packaged portable
controller reproduce both full artifact hashes:

- Candidate: `9312afcbc193458a6444ef5733686f7a06f490cb8f19e2e4ff391a92b663a454` (634,048 bytes).
- Symbols: `cc48ba70114aa4f3ea5e4cccbe9fdcf51eaa5c2ba684407107a19a4bf14888e9` (762,032 bytes).

Compilation uses the pinned Solana Docker image, Linux v1.54 compiler and v1.52
stripper, with network disabled, a private authenticated Cargo cache, read-only
source/SDK mounts and no original binary mount. SDK tool/archive hashes and actual
commands, source maps, environment and build logs are retained. The fresh build
explicitly recompiles both Anchor and the new interface dependency.

The proposal is replayed against the original in the unchanged local harnesses:
486 Legacy Buy, 396 Legacy Sell, 613 BuyV2 cases per quote family and 473 SellV2
cases per family. These total **4,140 fresh comparisons and 8,280 verified signature
entries**, with zero functional mismatches. Each of the four independent checkers
recomputes signed-transaction, quote/CPI, successful account/event and failed
rollback predicates from the full retained receipts. Inputs include ordinary
successes, account admission/decoding failures and existing arithmetic boundaries.
This bounded corpus is not exhaustive decoder fuzzing or initializer validation.
AMM/admin/Burn receipts from other candidates are not rebound to this artifact.
The independent shared-accounting PR #233 source delta is not composed here.
The later `d6e3792c` parallel-recovery composition has 375 public matches and
already fixes local-cursor consumption. Its published inventory still lists O0213
as unmatched. That newer composition is not claimed rebuilt or preserved by
this isolated packet; its CPI interface dependency requires a separate integration.

| Corpus | Cases | Non-compute log differences |
| --- | ---: | ---: |
| buy-legacy | 486 | 30 |
| sell-legacy | 396 | 0 |
| buy_v2-native | 613 | 26 |
| buy_v2-token | 613 | 46 |
| buy_v2-token22 | 613 | 46 |
| sell_v2-native | 473 | 10 |
| sell_v2-token | 473 | 12 |
| sell_v2-token22 | 473 | 12 |

Only explicit compute-consumption lines are removed for the separate diagnostic
count. Remaining non-compute and raw log differences are retained, not classified
as equality. All cases and full original/candidate records are compressed in
`validation/`; `summary.json` lists every residual diagnostic case.

The runtime executes byte-identical, hash-pinned copies of the existing harnesses
and fixtures from a read-only Linux mirror to avoid mounted-filesystem overhead.
The independent checkers run from the repository against its original inputs.
Two early build launches stopped before compilation because Cargo needed to
canonicalize the added path dependency's lock serialization. Offline Cargo
metadata resolved it; package versions/checksums were not changed. A Legacy Sell
launch rejected the unsupported `--cases` option before VM execution; the retry
uses that harness's fixed default corpus. Failed launch logs are retained under
`attempts/`, and accepted commands remain separately recorded.

## Reproduction commands

Python 3.12 with the repository's `solders`/`pyelftools` dependencies is used.
The default verifier never starts a compiler, target VM or network request:

```sh
python -I -B research/mayhem-external-curve-decoder/verify.py
python -I -B research/mayhem-external-curve-decoder/verify.py --materialize /scratch/curve-source
```

It checks the manifest, parent/input hashes, exact source/lock scope, builds,
all-window static attribution, case identity and every independent receipt checker.
Materialization refuses an existing destination. With the pinned Docker image,
SDK directories and private Cargo cache already prepared under the work directory:

```sh
python research/mayhem-external-curve-decoder/build.py --work /scratch/curve-work rebuilt --source /scratch/curve-source --fresh
```

The builder refuses to overwrite a build label. `builds/*/launch.json` and
`validation/commands.json` retain the actual historical argv; portable arguments
allow new paths. Local synthetic accounts use ordinary signature/blockhash checks
and the genuine Mayhem PDA for Pump CPI. There are no live transactions,
privileged signer substitutions, original-evidence edits or checkpoint selection.
