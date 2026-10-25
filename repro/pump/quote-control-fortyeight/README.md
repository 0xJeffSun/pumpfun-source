# Pump quote-control checkpoint

The six independent quote-control initialization/administration handlers are integrated into the prior Pump42 source, bringing the recovered-handler count to 48. The existing partial `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` and `create_v2` paths remain partial. Full original-byte equality is false, and this is not a deployable substitute.

The pinned v1.44 main build and isolated scratch build produce the same unmodified 1,478,960-byte ELF, SHA-256 `c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804`. `main-scratch-identity.json` binds both complete executables and all 35 source/build inputs. The source delta is exactly `src/lib.rs` plus four new `src/quote_control/` files; other Pump Rust source is unchanged.

Fresh validation passed 9,161 differential cases across 36 suites: all 8,654 prior cases across 35 suites, plus 507 quote-control cases. The quote-control suite uses test-owned synthetic fixtures, explicit signature and blockhash checks, and complete saved transaction bytes. Its 1,014 executed transactions contain 2,008 verified individual signatures. All 800 failed executions preserve account state except the expected payer signature fee. The initial and portability reruns are retained but the repeated cases count once.

All 28 existing Surfpool runners also passed freshly against this exact candidate: 1,024 original/candidate comparisons and 2,048 signed transactions. `independent-verification.json` records the separate individual-signature total. These runners validate regression coverage of prior handlers; new quote-control acceptance is from the focused LiteSVM suite. Nothing was broadcast.

`all-differential.json.gz` aggregates the current passing suites. `differential/` and `surfpool/` preserve the actual fresh receipts, while `receipt-copy-map.json` binds compressed copies to executed files. `replay-commands.json` lists all 36 differential and 28 Surfpool commands. The maintained new runner is `scripts/pump_quote_control_fresh_differential.py`; the two older quote-control scripts remain historical evidence.

`focused-handoff/` is the immutable first focused package; its stage-specific text predates broader testing. `historical-unaccepted/` preserves old drafts, scripts, saved failures, reports and inventoried binaries. Those old reports lack sufficient provenance and the old static report names a different binary hash, so none counts as current acceptance. `scratch-package-bindings.json` preserves every tested scratch-package file and its hash through the main-package layout.

Strict static analysis finds 13 of 23 selected quote-control functions with matching complete inferred-entry-bounded bodies after normalizing only actual relocations and relative internal call offsets. Direct callee checks do not all match; transitive data equality, full historical source identity and whole-original-program equality remain unproven.

The current `sell_v2` quote transfer-fee minimum/output and fee-event gap is preserved explicitly; the unchanged old suite does not cover that boundary. Partial v3, token-extension and depth-one nested-creation limits are unchanged. No recovery was attempted for the stopped fee correction, Pump incentives, v3 token extensions/fees or the stopped Mayhem initializer. Main promotion included no binary patching, padding, optimizer variation, privileged-signature bypass or unrelated source changes.

`manifest-sha256.json` hashes every packaged file except itself. Source, harness and runtime hashes appear in `source-harness-sha256.json`; the complete prior helper snapshot and maintained new runner are retained. The local source/lockfile and toolchain records do not claim a hermetic historical compiler/dependency reconstruction.
