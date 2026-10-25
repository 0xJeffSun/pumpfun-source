# Pump active buy fee-basis build

One isolated pinned-recipe build of the reviewed active-only source patch succeeded. Candidate SHA256 is `2b7e104ca71cf680208a72bc2d3eca86f3767c2bf83a6b75abe814356f9e8b66`,1,588,408 bytes. Unstripped SHA256 is `c30e0b0708279172af8adf82fb4877f1db760c1502707aba7ec7a324aa811aec`,2,173,584 bytes. These are new compiler outputs, not edited or padded binaries. This worker did not change main source/status; the supplied promotion scripts were **UNRUN** by this worker. Root handles any separate main promotion/build and its companion identity evidence.

## Source/build result

All37 baseline source inputs were checked against the current `b02a7e08…` checkpoint. Only `programs/pump/src/trade.rs` changed: two buy-side cap substitutions and one helper. Sell source, dependencies, flags, account declarations and decoders are unchanged. Dormant whitelist/reload/settlement helpers are absent. `approved-proposal/` preserves the root-reviewed exact diff and full original helper/wrapper evidence.

The existing builder used the same selected v1.44 compiler and observed v1.52 stripping phase. Before/after tool hashes, source/SDK/helper hashes and the252-package14,281-file dependency inventory matched. Compilation returned0 with no backend stack failures; the fresh direct-r10 scan found no out-of-range access. All logs and exact command records remain available. Warnings are retained, not suppressed. This is recorded candidate provenance, not authenticated original build provenance.

## Full static evidence

The emitted fee helper is [625528,626288),760 bytes. It is called exactly twice: from `buy` [572936,587312),14,376 bytes, and `buy_exact_quote` [588352,612400),24,048 bytes. Its zero-base check precedes the supply selection; zero mode reads the mint-supply field at+40 and nonzero mode reads curve supply+96. Virtual quote is at+72; u128 multiplication/division follow. Code6026 remains the error class, with a natural source coordinate for the new helper. All operand, branch, call and data-reference rows are retained in `fee-basis-static-review.json` and full disassemblies.

The original helper [657656,658416) is also760 bytes, but the two complete bodies are **not identical**. Original places its success arithmetic before the zero-error block; the emitted helper places the cold error path first. Call/data addresses and diagnostic origin also differ. No matching subsequence, equal length, normalized shape or successful test is treated as whole-body identity.

The full fresh inventory contains1035 original inferred windows and789 candidate symbol/inferred windows. Original/candidate call-consistent counts remain454/427, and raw-equal pairs remain617. Complete before/after ledgers preserve all failed and ambiguous matches. The original and candidate have883,574 different common-position bytes and8,897,307 excess original bytes; `complete-byte-comparison.json.gz` includes every differing interval and excess byte. Layout changes make these counts unsuitable as a completion measure.

`full-original-call-data-ledger.json.gz` and `full-candidate-call-data-ledger.json.gz` retain every complete window's direct, external and indirect call operands, data references and hashes. They remain opaque inventories for excluded bodies. Data previews do not establish arbitrary object extents, and indirect or transitive ABI equivalence is not inferred. The existing1840-byte serializer/all25 target checks and four metadata-body/62 target checks remain successful under their recorded normalized criteria, without changing the raw-equality claim.

## Preserved runtime evidence and coverage limit

All9269 unchanged differential comparisons passed across40 suites:9161 established baseline cases,56 partial-curve cases,20 two-curve cases,16 nested cases and16 general-route cases. All1024 unchanged Surfpool comparisons passed across28 runners. Existing cases, expected outcomes, signature checks, transaction-history controls, assertions and local addresses were preserved. No new fixture or excluded probe was run. Only source/build bindings were adapted in the existing nested/route harness copies; exact adaptation patches and AST checks are retained.

Saved verification covers24,352 differential signature fields and2,980 Surfpool signature fields, plus32 original-only prerequisite signatures. Complete signed receipts, case journals, raw result summaries, visible effects, error/CPI/event comparisons and68 compiler-input receipt bindings are retained. Historical embedded main-checkout maps are identified as snapshots; the actual executed candidate and37 compiled inputs are separately bound.

**These passes do not test divergent ordinary-mode supplies.** The shared direct V3 fixture has mint supply=curve supply=10^15. The saved64 exact-quote and156 configured-fee Surfpool fixtures likewise have equal supplies in both mode0 and mode1, with zero mode0-divergent cases. Their data/hash evidence is retained in `coverage-review.json` and `coverage-fixtures/`. This change has a direct original-source/data-flow justification, but these regressions establish preservation, not runtime exercise of its changed selection branch.

Original whitelist's four-zero bypass and early typed FeeConfig admission remain absent from the current unchecked/late-decoded fee path. Full buy error ordering, settlement/reload/volume/event composition, whole-original identity and the overall security assessment remain incomplete. No whitelist behavior, general program completion or acceptance of stopped scopes is claimed.

## Verification and publication

Run `work/test-env/bin/python -B /path/to/package/verify.py`; optional `--repo /path/to/repository` additionally checks the unchanged main baseline and retained maintained inputs. Verification reads saved data and signatures only: no target program execution, build, new transaction, signing or network request. Standard-library-only static checks are also available through `fee_basis_static.py --check` and `analyze_fresh.py --check`.

The package excludes compiler/runtime caches, generated keypairs, CLI telemetry and unrelated files. Two Python bytecode-cache hashes occurred in the historical prebuild inventory; those bytecode files are omitted, recorded in `prebuild-snapshot-exclusions.json`, and were never compiler inputs. The exact prebuild manifest is preserved and all37 actual compiler inputs remain included. The retained snapshot archive is explicitly the manifest minus those exclusions, not falsely presented as the original full snapshot.

Intended immutable source package: `repro/pump/buy-fee-basis-fortyeight`. `MAIN-PROMOTION.md`, `promote.py`, `build_main_once.py` and `README.proposed.md` are the UNRUN main-promotion recipe targeting `work/pump-buy-fee-basis-main` and the later companion `repro/pump/buy-fee-basis-main-fortyeight`. Root must independently require full stripped/unstripped main-to-scratch identity before carrying any tested receipt to main.
