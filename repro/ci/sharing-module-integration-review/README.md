# Independent SharingConfig integration review

No substantive finding remains. The sealed scratch and main publication, current tracked bindings, generic saved-build schema and finalized central integration pass. This review freezes 152 exact inputs and never builds or executes a Solana program.

The reviewed main package is `repro/pump_fees/sharing-module-v144`, manifest SHA-256 `07f2f80658251434d3ba3090a25f651b770b2aa688b86c6c07f5226359094db2` (53 payload files). Its unchanged scratch archive retains seal `a89a31c7e2f3bc526579d1c973aa116ab6614d686703adeb40bbe5c467e553cd` (166 payload files). All 60 owner paths match the recorded ownership map `74ad2980968c459626a91e8091c520ea330fda30431c82b0f1a6fe5f21db3e18`.

## Exact source and build binding

Independent byte reconstruction confirms only five Rust paths change: donation.rs replaces its complete SharingConfig declaration with a public reexport and removes the now-unused Shareholder import; lib.rs adds the instructions module; two module files wire the new tree; and instructions/fee_sharing/create_fee_sharing_config.rs contains the complete byte-preserved declaration and required imports. ConfigStatus, Shareholder, all handler and context bodies, state.rs and Cargo.lock remain unchanged. No line padding or compiler/dependency variation is introduced.

The baseline has 23 source inputs and both new builds have 26. Only the finalized program README differs between scratch and main source snapshots. Complete main and tested scratch ELF bytes are identical: 768,104 bytes, SHA-256 `8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87`. Build logs, four helpers, 53 SDK files and separately recorded v1.44 compiler/v1.52 strip phases pass the immutable package verifier. These are retained source/file/phase records, not a newly captured invocation trace or proof of a unique historical recipe. No main runtime replay is claimed.

## Independent code and data checks

A separate byte reader checks raw hashes, signed call operands, complete normalized bodies, relocation patterns and bounded literal bytes. Normalization is performed in memory only. It masks recorded address operands; it does not change executables or erase the remaining source-line differences.

All five checked codecs total 3,672 bytes. Their original filename and account-name literal extents match. Each retains exactly one differing normalized instruction slot, +528, with natural versus original line numbers: BuybackVault 3/50, SocialFeePda 6/113, DonationFeePda 9/135, FeeProgramGlobal 12/154, SharingConfig 5/37. Their 35 immediate sites resolve to 11 complete matching target bodies.

The separate SharingConfig inspection covers the full 744-byte checked decoder, 1,472-byte unchecked decoder and 1,024-byte Account::try_from wrapper. All 23 immediate call sites are independently decoded; they reach 19 target pairs. Only the wrapper's call to the checked decoder retains the known +528 line difference. These sites overlap the five-codec evidence and are not new unique functions. The retained initializer handler/parser/wrapper, social exit and six Pubkey bodies also pass: ten complete bodies, 26 direct targets and five literal extents.

Limits remain explicit. Original stripped boundaries are inferred from entry references, not original debug symbols. Twenty-eight pointer inventory entries lack established object/data closure. The larger candidate donation caller is 10,576 bytes versus its possible original incoming window of 13,800 bytes; no complete pairing/equivalence is claimed. The original whole ELF differs, arbitrary descendants remain unresolved, and no security/audit or exhaustive behavior conclusion follows from these checks.

## Saved runtime and history

The nine direct validation gzip files plus donation sequence exactly equal their frozen scratch members and bind the new executable and actual execution inputs. The generic unchanged saved-build verifier accepts the direct status schema. There are 17,441 comparisons (including the 17,331-case, 18-suite aggregate), 69 repeated focused inputs and ten separate donation sequence steps. There are no added cases or handlers.

Independent transaction decoding verifies 8,644 encoded transaction fields containing 17,204 signatures. These are field counts, not unique transactions or total executions. Both authentic captured messages are checked directly against their retained original payloads and classified by their actual discriminator `3ea214857941911b` as `initialize_fee_config`; they do not establish FeeProgramGlobal initializer history. Their raw transaction hashes are `3da6dbfecd2c3d189dfdf16a473f48d27f4024f1464778b468ae05a78cd4756b` and `12ceff5508047f2223ac0a0b178b9a36e063ae18d95562fe45fcaa7ab09c528b`. Signatures, unchanged-message assertions, runtime signature checking and the retained stale-blockhash rejection control pass. Nine external-codec rejection rows preserve exact AnchorError log equality.

## Main and central integration

The current tracked verifier passes all 26 source, four helper, two documentation, 44 canonical harness and 18 runtime map entries (89 unique paths), with both approved origin aliases explicit. The unchanged generic Fees checker passes against the frozen minimal input tree. A separate temporary Git fixture confirms positive current bindings and direct status consumption, rejects a missing new module, altered build helper, missing original runtime ELF, missing canonical harness and missing direct donation receipt, then passes restored checks. The owner's earlier nine checks are retained separately.

The installed Fees status exactly equals its owned proposal. All 31 Fees completion artifact rows and current validation artifact/hash/comparison report point to the new package. CI changes precisely ten Fees candidate paths plus the saved-package verifier path; flags and outputs are unchanged. The root binding dispatcher changes only the current Fees artifact path. Other programs' status/completion remain unchanged relative to the sealed current-AMM integration snapshot. There are still 150 rows, 140 bounded / five partial / five unrecovered, and 53,735 comparison receipts. Central and program documentation preserve historical checkpoint and byte-equality limitations.

The independent checker initially assumed the current-validation delta was artifact/hash only and rejected the legitimate `comparison_report` path update. The original checker and failure observation are retained; the corrected assertion enumerates all three intended fields. This was a review-script assumption, not a package or source defect. No reviewed package was modified.

## Reverification

Run `python3 -B verify.py` from this copied directory or by absolute path. Python with `solders` and Git are required. The verifier checks the review seal, independent byte/signature/source/central assertions, package verifier, generic schema and finite copied-fixture gates without work-directory dependencies, network access, compiler invocation or program execution. Add `--current-repo /path/to/pumpfun-source` to require all captured main/central bytes still match and rerun current tracked bindings. A later authorized integration may make this optional snapshot check stale.

Only `work/sharing-module-integration-review` was written. Other sealed reviews remain unchanged. No main edits, staging, commits, builds or runtime replays were performed. Hosted CI acceptance is a separate result.
