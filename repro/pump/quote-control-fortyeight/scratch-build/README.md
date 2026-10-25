# Quote-control scratch regression handoff

This immutable scratch package adds six independent quote-control handlers to the frozen Pump42 source. It contains fresh results for all 35 prior differential suites (8,654 cases), the new quote-control suite (507 cases), and all 28 prior Surfpool runners (1,024 comparisons). No prior candidate's receipt is counted as validation of this executable.

The pinned v1.44 candidate is 1,478,960 bytes, SHA-256 `c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804`. The six additions are `initialize_quote_control`, `set_quote_control_admin`, `set_quote_control_reserves_admin`, `add_quote_control_mint`, `remove_quote_control_mint`, and `set_quote_control_mint_reserves`. Only `src/lib.rs` and four new `src/quote_control/` files differ from the prior source.

The maintained quote-control runner preserves the focused fixture and execution logic. Repository lookup and provenance-path discovery are portable. Its rerun produced identical transactions and outcomes for all 507 cases. Both the original focused handoff and maintained-run receipts are retained, but those repeated cases count only once. Quote-control has 1,014 executed signed transactions and 2,008 individual signatures. Existing Surfpool has 2,048 executed signed transactions; its separate individual signature count is recorded in `independent-verification.json`.

`focused-handoff/` preserves the first immutable focused review, including its source archive, strict static comparison, fixtures and original verifier. Its text describes the earlier focused-only review stage. The fresh broader results are recorded at this package's top level. `historical-unaccepted/` preserves old scripts, drafts, failures, reports and inventoried binaries without treating them as acceptance evidence.

All current checks pass, but full original-byte equality is false. Existing partial v3 and create_v2 scopes, depth-one nested creation limits and the confirmed `sell_v2` quote transfer-fee minimum/output and fee-event gap remain unchanged. The unchanged old sell_v2 suite does not cover that gap. No stopped-lane recovery, new fee probe, privileged signer bypass, binary patch or live broadcast was performed.

This package precedes main-path promotion. The final checkpoint must add a clean main build and whole-executable identity proof before applying these receipts to main. `manifest-sha256.json` hashes every packaged file except itself.
