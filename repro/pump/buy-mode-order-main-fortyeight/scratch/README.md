# Pump buy complete/cashback validation order

One pinned source build applies the reviewed buy-only two-line reorder: `buy_v3` rejects a completed curve with6005 before rejecting cashback with6094. The two adjacent `require!` expressions are the only compiler-source change. The accepted fee-basis correction remains unchanged; `buy_exact_quote`, sell, whitelist, account declarations, decoder/preparation, fee arithmetic and settlement are unchanged. This worker did not edit main source or publish this package.

Candidate SHA256 is `bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314`,1,588,408 bytes. Symbols SHA256 is `b029fb7c5f3621c54bd5ad3a8c203ba73dbed8f152728a45d9be583025aac9ee`,2,173,584 bytes. The build ran once, exited0, and emitted no backend stack failure. All37 sources, the selected v1.44 compiler, recorded v1.52 strip tool, SDK/helper hashes and252-package14,281-file dependency gates remained intact. Source/compiler/layout alternatives were not attempted.

## Complete static result

The complete executable differs from the preceding accepted2b7e104 checkpoint at exactly **nine byte positions**, all in the14,376-byte `buy` function [572936,587312). Every byte outside that body is unchanged. The complete `buy_exact_quote` body is raw-identical to the baseline. `baseline-byte-differences.json` preserves every byte position and value; neither artifact was modified for comparison.

The emitted buy CFG loads complete at573144 (wrapper+161) and tests it before either quote-result branch can read cashback at573184/574144 (wrapper+163). Its6005 store is573816 and6094 store574040. Full before/current buy disassemblies, the complete admitted992-byte original mode helper, and the admitted original BuyV3 caller are retained in `mode-order-static/` and `mode-order-static-review.json`. This proves the local field/error order, not complete original-handler equivalence. Current quote checking still precedes those gates; broader error ordering is unresolved. The original helper has its own error allocation/diagnostic code and is not claimed byte-identical to the inlined current path.

The complete original/candidate inventories retain1035 original inferred and789 candidate windows, with454 original/427 candidate call-consistent matches and617 raw-equal pairs under the documented algorithm. Full call/data/branch records and every original-file mismatch interval are retained. Whole original identity is false:883,574 common-position bytes differ and8,897,307 original bytes exceed the candidate extent. Those counts are not a completion percentage. Excluded bodies remain opaque in these inventories. Indirect targets, object extents and transitive ABI equivalence are not inferred from normalized matches.

## Preserved tests and remaining coverage

All unchanged9269 differential comparisons across40 suites and1024 Surfpool comparisons across28 runners passed. Saved signature verification checked24,352 differential and2,980 Surfpool signature fields, plus32 original-only prerequisite signatures. The sealed receipt bindings and saved-signature verification report establish the actual completed counts and zero exits; no new case, fixture, signer, token extension or historical replay control is introduced. Nested/route adaptation remains limited to source/build identity binding, with original assertions and signature/history controls preserved.

Existing cases do not establish targeted coverage of complete=true plus cashback=true reaching the changed `buy` checks. The direct V3 case/fixture inspection is retained in `coverage-review.json`; passing existing suites establishes preservation, not runtime proof of that combination. Earlier divergent-supply coverage also remains absent. The original6005-first contract and actual emitted CFG provide source/static support independently of these runtime limitations.

Whitelist fee exemption versus early typed FeeConfig admission, reserve/reload/volume/event composition, complete buy error order, original build provenance and full security assessment remain open. The original exact-quote caller remained opaque in the admitted ordering packet, so its validation order was not broadened by analogy. All previous exclusions remain.

## Verification, lineage and publication

The immutable predecessor's full [fee-basis report](../buy-fee-basis-fortyeight/README.md) and [earlier decoder/preparation history](../curve-preparation-fortyeight/README.md) remain the historical record. `history/` retains predecessor manifests/README and exact baseline artifact identities. `approved-proposal/` contains the root-reviewed source diff and original complete-body evidence.

Run `work/test-env/bin/python -B /path/to/package/verify.py`. It verifies the exact seal, all37 source inputs, recorded build/tool/dependency integrity, full static ledgers and the saved signed runtime comparisons without building, signing or executing target programs. Optional `--repo` binds the unchanged baseline main files before promotion; omit it after intentional promotion. The package excludes caches, generated keypairs and telemetry.

Intended scratch destination is `repro/pump/buy-mode-order-fortyeight`; root reserves `repro/pump/buy-mode-order-main-fortyeight` for an independently built main companion. `README.proposed.md` is a source-checkpoint documentation proposal, not an applied main edit. Only complete main/scratch executable and symbol identity can carry these tested receipts to a subsequent main build.
