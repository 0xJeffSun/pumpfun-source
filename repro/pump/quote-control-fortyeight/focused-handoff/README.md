# Six quote-control handlers: focused scratch handoff

This isolated candidate adds six quote-control handlers to the exact published Pump42 source at `49e4ccc17ab45308ff3160d20c3d580512b772af`: `initialize_quote_control`, `set_quote_control_admin`, `set_quote_control_reserves_admin`, `add_quote_control_mint`, `remove_quote_control_mint`, and `set_quote_control_mint_reserves`. Main source and the accepted Pump42 package remain unchanged. This package is ready for review before broader regression testing or main integration.

The patch changes only `programs/pump/src/lib.rs` and adds four files under `programs/pump/src/quote_control/`. The four module files come from the preserved historical workspace draft. The old draft's full crate and unrelated source were not imported. Current `Global` and `PumpError` definitions remain unchanged.

The clean v1.44 build used 35 recorded local compiler inputs, a fresh target/SDK/rustup directory, and locked offline dependencies. It produced an ordinary unmodified 1,478,960-byte executable with SHA-256 `c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804`. The build does not reproduce the complete captured executable. The input manifest records local inputs and lockfiles; it is not a hermetic archive of every compiler or dependency byte.

Fresh focused LiteSVM validation passed 507 original/candidate comparisons, comprising 1,014 executions and 2,008 verified ordinary test-key signatures. All 800 failed executions preserved nonpayer account state and changed the payer only by the expected signature fee. Receipts save complete signed transactions, before/after tracked accounts, events, CPI records, return data and logs. Signature verification and recent-blockhash checking are explicitly enabled. The same signed transaction bytes run on both executables. No transaction is broadcast.

The historical 491 case definitions were copied as draft fixture leads into the new harness; their previous outcomes are not acceptance evidence. Sixteen new scoped cases cover an independently funded unsigned/readonly initialization user, list capacities 49/50/51/255/256, Token-2022 native-mint exclusion, and signed authority rent top-ups. The initial captured Global fixture is copied and its authority set to a normal test-owned key. QuoteControl fixtures are synthetic. No PDA or privileged signature bypass is used.

Captured IDL review confirms each handler's discriminator, argument order, account order, writable/signer declarations, PDA seeds and event layouts. QuoteControl has a 108-byte discriminator/header followed by 40-byte mint entries; the draft starts with capacity 50 and caps the list at 256. The fresh focused cases support these capacity and authorization behaviors against the captured original. Source and observed layout details are retained in `interface-review.json`.

Strict read-only static comparison finds complete inferred-entry-bounded matches for 13 of 23 selected quote-control functions after normalizing only actual ELF relocations and relative internal call offsets. Direct callees are checked separately and do not all match. These matches do not establish transitive read-only-data equality, exact historical source, or complete executable identity. Unmatched functions are preserved in `strict-functions.json`; no binary or layout manipulation was performed.

Historical source, scripts, saved successes and saved failures remain unchanged. The old static report's recorded candidate hash differs from the file currently at that path, so its 9/22 result is retained only as provenance in the inventory. The fresh package and its receipts use new candidate hashes throughout.

Limitations remain explicit: this candidate has not run the 35 existing main42 differential suites or 28 existing Surfpool runners. It is not promoted and does not change the accepted handler count. Current partial v3 and depth-one nested creation limits remain. The existing `sell_v2` quote transfer-fee minimum/output and fee-event gap remains unchanged. No work was performed on that stopped correction, v3 token extensions/fees, Pump incentives, or the stopped Mayhem initializer.

Reproduce the focused validation from the repository root with:

```sh
work/test-env/bin/python work/pump-quote-control-main42/focused.py --candidate work/pump-quote-control-main42/build/artifacts/pump_recovered.so --output work/pump-quote-control-main42/focused-rerun.json.gz
work/test-env/bin/python work/pump-quote-control-main42/verify-focused.py
```

The first command creates new receipts; the second verifies the frozen `focused.json.gz` receipts without executing program instructions. `handoff/manifest.json` hashes every packaged file except itself. The package includes the complete source snapshot/archive, build attempts/logs, stripped and unstripped candidates, test fixtures, focused harness and its build/helper closure, historical provenance, strict static report and receipt-verification summary. Generated deployment keys and mutable target caches are excluded.
