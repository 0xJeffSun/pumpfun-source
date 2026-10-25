# Fees legacy caller — clean main identity checkpoint

The clean main build is **826,904 bytes**, SHA-256 `e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`. The complete symbol ELF is `336f49a8075c87efe2eead28290793823a6b5bf004fe000b82b27981ae6ce501`. Both are byte-identical to the reviewed scratch candidate. Whole-file equality with the original remains **false**.

This checkpoint applies only the reviewed `sharing_update.rs` legacy caller recovery, plus accurate program documentation. The actual 26 main inputs and separate README binding are explicit. V2 source and named contexts remain unchanged; the original legacy helper partition is not reproduced. Compilation used the same locked v1.44 compiler and recorded SDK's v1.52 stripper, with isolated SDK, rustup alias and build target. No build variant or runtime retry was performed.

`main-scratch-identity.json` binds the clean main build, source map and full ELF/symbol identity to the immutable **369-payload** scratch handoff, preserved in `scratch-handoff.tar.gz` with manifest `56fcdea691bae6dacc004dfe65fe0bd6835a7ed8edea60942e3f5e2e639864dc`. That archive includes the independently reviewed source proposal, complete original roots, fresh candidate symbols, calls/data/cleanup analysis, before/after tool/cache records, all failures and original signed receipts. Its README provides the full reconstruction rationale and limitations. The candidate and original artifacts have not been byte-patched.

All **17,461 comparisons** (17,441 unchanged baseline + 20 unchanged focused) and **ten separate donation-sequence steps** passed on scratch. These include all **417** sharing-update rows. No new unique case is added. Main reuses those exact receipts solely because both entire ELF files match; no transactions were repeated for main. Nine baseline receipts, focused20, donation sequence and the two genuine historical initializer captures are directly available here, byte-identical to the archive. `receipt-build-bindings.json` maps every execution to the new main build without rewriting the recorded scratch source paths.

The saved verifier rechecks 17,204 baseline/sequence encoded-field signatures, 80 focused signatures, and the two separately stored genuine historical messages. Encoded fields and signatures are not counts of unique transactions. All original freshness/signature controls and focused state/event/inner/return/log assertions remain intact. Eleven saved diagnostic rows are checked without new execution.

Static evidence retains **all 585 original inferred windows and 562 candidate symbol windows**. Original mapped-pattern / unattributed / conflict categories are **448 / 135 / 2**, versus **439 / 143 / 3** in 8ff12. These are mechanical window categories, not historical function identities or completion percentages. Full raw/normalized/size matches, ambiguity, immediate-call residuals and relocations are preserved.

The generated Pump distribution CPI, four meta/info helpers, SharingConfig exit and event match normalized complete original windows and 96 immediate target bodies. The legacy handler, wrapper, original parser and generated AMM CPI remain nonidentical; the AMM helper has an actual outlined owned-account cleanup edge. Five accepted social roots and 176 immediate targets remain normalized-equal to 8ff12. `readme-claim-checks.json` records fresh main checks of the 12,864-byte donation handler, 8,984-byte parser, 928-byte wrapper, 74/76 matching immediate targets, 19 unique directly referenced objects and all 17 original social-helper immediate targets. Source coordinates, indirect/transitive/data closure, V2 payout behavior and the unique historical recipe remain unresolved. The source still represents 31 bounded Fees handlers and does not make any main contract exactly equal to its original.

`published-harness-sha256.json` maps 44 recorded baseline harness paths to **42 unique public files**, resolving two historical work-path aliases to byte-identical published copies. Two old reproduction shell wrappers were not executed by this runner and are not part of its execution map. Four focused harness files are unchanged; only their expected source map and main build provenance are adapted. All **18** runtime/fixture inputs are bound. `publication-notes.json` corrects the scratch README's textual “17” count without modifying that sealed history.

Run the portable verifier anywhere with Python and no work/cache directory:

```sh
python3 -B /path/to/legacy-caller-v144/verify.py
```

With solders installed, verify all saved runtime evidence:

```sh
python3 -B repro/pump_fees/legacy-caller-v144/verify.py --runtime
```

After the new files are tracked, verify current source, helpers, docs, canonical harness/fixtures and candidate bindings:

```sh
python3 -B repro/pump_fees/legacy-caller-v144/verify.py --current-main --repo .
```

The verifier never builds or executes a target transaction. Historical absolute paths are provenance only; current bindings use tracked repository paths. Old checkpoints and their seals remain unchanged. Main-package negative tests use missing artifacts and altered text/source/receipt bindings, never binary mutation. The earlier disposable-copy scratch negative test is preserved with its explicit scope in `scratch-verification/`.
