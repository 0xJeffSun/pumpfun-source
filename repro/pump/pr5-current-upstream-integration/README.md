# PR #5 current-upstream integration evidence

This package binds the PR #5-only source on upstream `ebaa333` to the locally tested, unmodified [candidate ELF](candidate.so). Two independent clean-target Agave 2.1.21 SBF platform-tools v1.44 builds produced the same 1,635,144-byte ELF, SHA-256 `4c80e0c72e872f3cee06b35350f02010b6c62516bae96ed799482ecac1f6a438`. The source was compiled on `8099031`; upstream `ebaa333` added docs and repro inventory only. The package verifier confirms that all 37 compiler-input source hashes still match this checkout. The captured deployed Pump ProgramData is 10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Full byte equality is false beginning at offset 24.

The [receipt index](receipt-index.json) hashes the ELF, both build attempts/comparisons/logs, and five raw compressed replay receipts. Against this exact ELF, offline target/candidate execution matched upstream native/legacy 56/56 (50 reached Pump), recovered core curve 34/34, recovered route matrix 72/72, inherited QuoteControl 507/507, and inherited volume sync 341/341. The 1,010 cases contain 2,020 independently verifiable signed outer transaction bytes. The [read-only verifier](verify_package.py) checks those signatures, recorded paired effects, hashes, source inputs, and build identity:

```sh
python3 repro/pump/pr5-current-upstream-integration/verify_package.py
```

It requires the repository's pinned `solders` dependency. This verifier checks saved receipts; it does not execute SBF again. The signed local executions used test-owned accounts and the captured PumpSwap AMM to provide a genuine CPI PDA signature. No public transaction or real funds moved. The old PR #5 candidate's retained receipts, static candidate-function matches, and build reports target a different ELF; they are historical, not evidence for this candidate. Other inherited Pump suites, Surfpool, and unobserved routes or malformed accounts were not replayed here. This source is not a byte-identical or deployable replacement.
