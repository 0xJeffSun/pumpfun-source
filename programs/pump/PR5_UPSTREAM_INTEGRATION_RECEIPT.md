# PR #5 current-upstream curve integration

This isolated source candidate starts at `8099031`. It integrates only PR #5’s richer curve routes with upstream’s native/legacy `multi_hop_curve.rs`: one Anchor `multi_hop_curve_swap` entrypoint and one fixed-account context. Classic SPL base mints with one five-account curve stage dispatch to upstream’s handler; other observed routes dispatch to the richer handler. The legacy branch validates its fee configuration before running, preserving the observed discriminator error order. Claim, admin incentives, and Mayhem source additions are outside this branch.

Two independent clean-target Agave 2.1.21 SBF platform-tools v1.44 builds used identical hashes for 37 inputs and produced an identical 1,635,144-byte ELF, SHA-256 `4c80e0c72e872f3cee06b35350f02010b6c62516bae96ed799482ecac1f6a438`. The pinned deployed payload SHA-256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; byte identity is false from offset 24. Relative to the deployed ELF: ELF extent gap -299,656 bytes, `.text` gap -280,176 bytes, relocation gap -1,017. The captured allocation includes zero padding; it was not used as a compiler input.

On that exact ELF, offline signed target/candidate receipts match: upstream native/legacy 56/56 (50 reach Pump), richer core 34/34, richer route matrix 72/72. Inherited QuoteControl 507/507 and volume-sync 341/341 also match. Other inherited Pump suites and Surfpool were not replayed. The dispatch is bounded by these fixtures; arbitrary malformed accounts and unobserved route combinations remain unproved. This is not a byte-identical or deployable substitute. No public transaction, real funds, push, or PR.

Source SHA-256:

- `programs/pump/src/lib.rs`: `a329f5debc33c4a86e424e36852aed23334c286322d4990c1e81e9fc4f9a0b1c`
- `programs/pump/src/multi_hop_curve.rs`: `f7fdd08e59ab965ff54cef0ab4e3ac930c74e0c9ea4847050ee35ea682453573`
- `programs/pump/src/multi_hop_curve_swap.rs`: `2b938e81aee1799eb5699ef11a457919ad9a39457338a752c93c95b2d736b40f`
- `programs/pump/src/trade_types.rs`: `49ab3f4dd75c2703157caaed925d7410c90dfeeecb4b55b5b24ae0335cbb44b5`
- `programs/pump/Cargo.lock`: `486cbaa1eab7a945e849df5f72ca7c1e0b172ab8a17a1cd7a353fde123a84e95`

Local build attempts, complete source manifests, logs, ELF comparisons, and focused replay files are under `work/pr5-integration-*`, `work/pr5-upstream-56.json`, `work/pr5-core-34.json`, `work/pr5-routes-72.json`, `work/pr5-quote-control-507.json`, and `work/pr5-volume-341.json`.
