# PumpSwap residual original-window disposition

Static review completed for all **785** baseline original windows, with an exhaustive disposition of **319 unmatched windows / 790,024 bytes**. This is a complete ledger of this inventory, not exhaustive historical-function identification, semantic recovery or security coverage. No compilation, runtime probe, chain call, new worker, main-repository edit, commit or publication was performed.

The original SHA256 is `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. The current AMM candidate SHA256 is `5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`. Both were independently checked against copied raw files. The user supplied published checkpoint `8099031`; the artifact hashes, rather than mutable HEAD, anchor this review. The Pump/Fees portions of earlier inventories predate the newer candidates and are not refreshed or represented as current here. AMM baseline identity remains applicable.

## Exhaustive classification

| Primary disposition | Windows | Meaning |
| --- | ---: | --- |
| Diagnostic-only local instruction delta | 10 | Exactly two unmasked instructions differ: source-line and filename-length stores. This does not establish equality of other data or call targets. |
| Source-supported historical create_config | 6 | Handler, wrapper, context, init helper, recipient setter and event serializer have existing scratch source/static evidence; absent current full-body matches and positive replay. |
| Source gap with historical compiler specialization | 3 | Scalar setters have existing source hypotheses and retained 616-vs-608-byte specialization differences. Not a proven compiler-only cause for the current candidate. |
| Unresolved source or compiler | 300 | Available evidence does not distinguish source differences, dependency selection, inlining, inferred boundaries and compiler effects. No speculative repair justified. |

Data is an overlapping gap, not a cause that can safely replace these dispositions: **260/319** unmatched windows contain relocated references with unresolved consumed extents; **32/319** contain indirect calls. Even matching bodies retain independent call/data obligations. The full inventory has 462 windows with relocated-data gaps. No unmatched row is declared a pure data-only or proven compiler-only mismatch.

[RESIDUAL_ROWS.md](RESIDUAL_ROWS.md) lists every unmatched row, exact half-open range, byte count, raw hash, classification and call/data counts. [residual-rows.json](residual-rows.json) supplies each row's baseline JSON pointer, individual unresolved targets, raw data previews with ranges/hashes, comparison candidates and next action. [all-row-dispositions.json](all-row-dispositions.json) also retains all 466 normalized matched rows; none are silently dropped. All ranges in this package are original `.text` virtual addresses and file offsets, which are equal in these artifacts.

## Seven additional diagnostic explanations

These seven local comparisons extend the three previously documented admin toggles. The candidate symbol suggests a comparison subject, not recovered historical function identity. Full lengths and relocation patterns agree and the only remaining unmasked instruction differences are the line/filename-length stores. [diagnostic-deltas.json](diagnostic-deltas.json) retains original/candidate ranges, exact instruction excerpts, filename pointer instructions, filename byte ranges and SHA256s.

| Row | Original range | Observed original source coordinate | Candidate coordinate |
| --- | --- | --- | --- |
| 325 | `0x9e3b0..0xa0068` | `programs/pump-amm/src/instructions/create_pool.rs:21` | `src/create.rs:51` |
| 326 | `0xa0068..0xa1dd0` | same | `src/create.rs:51` |
| 370 | `0xd44e0..0xd47b8` | `programs/pump-amm/src/state/volume_accumulator.rs:8` | `src/incentives.rs:4` |
| 373 | `0xd4f90..0xd5268` | `programs/pump-amm/src/state/volume_accumulator.rs:25` | `src/state.rs:124` |
| 395 | `0xe0148..0xe06a8` | `programs/pump-amm/src/lib.rs:36` | `src/lib.rs:38` |
| 397 | `0xe0720..0xe0bf8` | same | `src/lib.rs:38` |
| 451 | `0xf23f0..0xf26c8` | same | `src/lib.rs:38` |

Rows 142–144 are the previously documented cashback, boost and Mayhem-mode toggles. All ten remain strict mismatches. No fake coordinates, padding, path remapping or behavioral correction is proposed. The two volume rows concern AMM account deserialization only; no stopped Pump incentive work was resumed.

The bounded same-length/relocation-shape scan also retained **409 comparison pairs across 57 original rows**, limited to at most four differing instructions. These are not 409 identities or recoveries. Repeated closures and tiny type-ID functions produce many alternatives. Row 362, for example, has a one-instruction pointer-addend difference (`0x290` versus `0x230`); similarity alone does not justify calling that diagnostic or changing account layout. Every comparison remains available in `near-shape-candidates.json` without being promoted into a match.

## Source proposals, in priority order

1. **Preserve the existing create_config logic as the strongest source-supported proposal.** Its original handler is `0x16d88..0x17960`, wrapper `0xe0bf8..0xe1508`, context `0x80fb8..0x82630`, init helper `0x82630..0x83d38`, recipient setter `0x61d68..0x62688`, and event serializer `0x83d38..0x84020`. Raw hashes are in the row ledger. The retained `create-config-serialization-static/source-snapshot.tar.gz` contains `work/pump-amm-create-config-static/crate/programs/pump-amm/src/lib.rs:45–65` for the body, `instructions/admin/create_config.rs:3–25` for fixed-admin context/event, and `state/global_config.rs:218–266` for setters. This is a reviewable source hypothesis, not a newly authored patch or permission to merge the historical scratch wholesale. That scratch contains line-position layout choices; preserve them as raw history, do not reproduce padding to force identity.

   The body sets admin, validates LP fee then protocol fee then recipients then creator fee, clears disable flags, stores creator authority, obtains Clock time, and emits the same event through log data and self CPI. Each scalar limit is 1000; recipients must be nonzero and strictly ordered. These are inherited static findings from the retained assembly/source package. They are not newly executed behavior.

   The context requires mutable `Signer` admin equal to `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8`; global_config is a 949-byte init PDA paid by that admin, with `global_config` seed, System program and event accounts. Existing static attribution places account initialization before the fixed-admin address constraint, with custom error 6005. No authorization may be synthesized. A future successful replay requires an authentic, unchanged historical signed message satisfying the fixed-admin signer requirement, associated signatures, instruction/account ordering, and sufficient original pre-execution accounts/program/sysvar context to reproduce its execution. The retained evidence has **zero successful fixed-admin cases**. The 372 rejection cases cannot validate setter/event success; changed signed messages, signer substitution and patched binaries are excluded. No replay is proposed in this assignment.

2. **Review scalar setters and their shared error helper as one source/compiler family.** Original setters are `0x61630..0x61898`, `0x61898..0x61b00`, `0x61b00..0x61d68`. Historical scratch supplies 608-byte counterparts against 616-byte originals, with a retained explanation involving constant 1000 specialization into `Error::with_values`. Keep those exact negatives. The supporting `scalar-setter-negative-analysis.json` records the LP setter/helper comparison; the package findings describe the other two. Do not infer a unique compiler version or attempt unrelated edits to change specialization.

3. **Recover source/module provenance before editing diagnostics.** The ten explained windows give specific filename and line observations, not full historical source files. Preserve those observations and seek corroboration within retained sources. No semantic fix is established; line-padding a reconstruction would weaken its provenance.

4. **Trace the remaining 300 rows through callers and consumed data before proposing changes.** Each row retains exact targets and data previews. Previews intentionally do not claim consumed length or full rodata equality. Near-shape alternatives are leads only. There is no defensible additional implementation patch from this scan alone.

Current **Pool and GlobalConfig serializers stay accepted** under their documented normalization. GlobalConfig exit `0x4f00..0x5570` is already a complete normalized body match. The old scratch serializer correction is historical, not a new task. The earlier recipient-parser assembly excerpt spans `0xd8f0..0xe178`, while the current inferred matched row is `0xd8f0..0xe120` (2,096 bytes); do not substitute the older excerpt boundary for the current row. `original-evidence.json` excerpt SHA256 values hash assembly text, not raw ELF bytes, as its retained extraction script shows. This package supplies independent raw ELF hashes throughout.

## Verification and handoff

Run `python3 verify.py` from any directory after copying this package. It uses Python's standard library and the retained reader, with bytecode writes disabled. It verifies every copied input hash, all original boundaries and raw/normalized hashes, current-candidate matches, all near-shape pairs, diagnostic byte/pointer/store facts, residual completeness and summary counts. It performs no build, subprocess, network operation or executable launch. `verification.json` records the successful run.

`input-manifest.json` binds the copied raw ELFs, baseline catalog, status/completion records, current AMM source, audit reports and historical create_config source/assembly packages. `output-manifest.json` seals the deliverables separately from worker session logs. `analyze.py` and `finish.py` retain generation logic; only the verifier is intended to run standalone from the portable package. No new implemented handler, runtime case, whole-byte equality or security sign-off is claimed. Parent owns integration and publication.
