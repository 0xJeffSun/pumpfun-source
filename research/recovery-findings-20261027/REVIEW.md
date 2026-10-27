# Review of PR #263

Reviewed submission: `db0031f6f7bab06c0b3379e3da04fe7193a57d0c`. Repository reference: `ff3d2ceb88201ad606187c525deffe10526fd8ff` after PRs #261–262 and Pump Round24. The original submission is retained byte-for-byte for research provenance, with no promotion of its suggested source changes.

## Error-code correction

The maintained buy/sell PumpSwap sources currently use `PumpCpiSlippage`, code `6012`, for their price-band rejection. That source observation alone does not prove the original uses `6013` at the same sites. The original's error-name table likewise does not identify which variant each branch returns.

The retained [buy](../mayhem-sizing-panic-recovery/runtime/buy-amm-native.json.gz) and [sell](../mayhem-sizing-panic-recovery/runtime/sell-amm-native.json.gz) reports each contain three native swap cases whose original and candidate both return `InstructionErrorCustom(6012)`: `reference_0`, `reference_1`, and `reference_18446744073709551616`. Their six complete case descriptors and error results are bound in `review-evidence.json`. These are previously recorded executions, not new runs performed by this review.

Consequently, the proposed blanket replacement with `6013` would break these established comparisons. Other error sites require individual attribution. Consolidating error enums is a separate source/code-generation hypothesis requiring a compiled artifact, whole-function/call/data comparisons and runtime validation. The submitted prose recipe is not a validated patch. Its additional arithmetic and rate-limit proposals are also unvalidated and must not be treated as recovered behavior.

## Completion and compiler claims

The submission aggregates finite cases across different historical candidates. Such totals are neither exhaustive behavioral coverage nor necessarily unique scenarios. Discriminator presence does not establish complete dispatch routing, account validation, CPI effects or all branches. The repository's [current status](../../docs/RECONSTRUCTION-STATUS.md) retains these distinctions and known gaps.

The Fees ledger analyzes an older 463/585-normalized candidate and concludes that no source recovery remains. The newer [Social claim-v2 packet](../fees-social-claim-v2-recovery/README.md) recovers another complete 10,664-byte normalized handler and reaches 579/585 with 198 raw-local matches. Histogram similarity, equal instruction kinds, or failure to find a one-constant fix cannot prove that the residual is exclusively compiler scheduling or unrecoverable source.

The twelve submitted compiler rows contain five successful builds and seven failures. Fees v1.44 fails; only v1.45/v1.46 succeed there. All three recorded AMM attempts and all three Mayhem attempts fail. This is a limited exploration, not an exhaustive compiler/flags/host/dependency study. The JSONL contains no candidate hashes, source-input manifests, commands or retained build artifacts sufficient to reproduce its numerical scores. Claims that native-host builds can never reproduce Linux output are also stronger than this evidence supports; the repository has separately qualified [cross-host Mayhem artifact reproduction](../mayhem-native-qualified-identity/README.md).

## Source layout and remaining work

The path-string plans may supply useful hypotheses, but filenames, line/column coordinates, code generation, call targets and data references must be checked together. The claimed Fees path gain has no paired candidate artifact or reproducible source/build packet in this submission. It is not added to current coverage. The enum, module-move, helper-target and arithmetic recipes describe older source layouts and require reconciliation before any implementation.

Missing original source or exact toolchain provenance is an unresolved research constraint, not proof of mathematical impossibility. A fixed-admin signature is relevant to authentic successful runtime initialization; static handler recovery and whole-ELF comparison do not require possession of that private key. No signer bypass or credential acquisition is proposed by this review.

All four core whole-ELF comparisons remain unequal. This archive contributes research history and corrected attribution, not new recovered functions, accepted runtime coverage or permission to override other task constraints.

## PR #265 follow-up

The follow-up at `b31f1225db96aae131ab52efba738f50bd9ad9ee` reports compile success and improved aggregate instruction similarity for enum consolidation plus a blanket slippage-code replacement. It includes one Markdown file, not the modified sources, candidate binaries, full command/receipt set or runtime reports needed to verify that result independently. Its baseline also differs from the selected candidate, with a cache-related explanation that is not independently established by this file.

A successful compile does not show equivalence to the original. The six original/candidate `6012` observations still refute the claimed unconditional `6013` correction. Preserve the report as an unverified historical follow-up; no behavioral fix, new function match or current selection follows from it.

The later `d1a8572c9c235458f13e241cb8fe545cf52c5506` attachment supplies a
433-line enum diff and a Fees path-relocation diff, plus application instructions.
The enum diff still replaces the two swap slippage sites with `6013`; the same
counterexamples apply. A successful `git apply --check` establishes patch context,
not compiler reproduction or behavioral equivalence. The submitted patch files
are retained without applying them to the maintained programs.
