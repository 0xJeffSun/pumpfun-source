# Main Pump verified source checkpoint — Round6

The canonical main contract source is reproduced from the archived `primary/` inputs with the actual `programs/pump` workspace layout. Clean, cached, canonical, and archived-source builds emit the same stripped and unstripped ELF hashes. The original deployed ELF is still different; the reconstruction goal remains active.

- Full regression:44 suites /10,468 signed fixture cases.
- Additional regression:41 suites /3,042 executions. Corpora overlap.
- Strict diagnostics:13,506 paired log cases, zero mismatches; source-coordinate text and compute use are separately excluded from this comparison.
- Function inventory:587/1,035 windows match after masking direct-call destinations and ELF-pointer values;111 match raw bytes. Matched windows cover493,664/1,792,208 text bytes (27.5%). Callee/data identity is a separate requirement.
- The closed direct-call subset has132 original windows and excludes every ELF data reference.

This checkpoint restores V3 account initialization and program validation, complete ordinary-buy continuation after curve completion, buyback recipient updates, creator-owner rejection, claim-program validation order, owned account contexts, and the first historical curve decoder. Later isolated decoder/CTO/migration refinements remain outside this checkpoint until composed and verified.

```sh
work/test-env/bin/python repro/pump/main-contract-round6-20261027/verify.py
work/test-env/bin/python repro/pump/main-contract-round6-20261027/reproduce.py --registry-home ~/.cargo --output work/reproduce-main-round6
```

`--dependency-cache` is optional on the reproducer. Its cache contains verified external libraries; every run compiles main Rust afresh. The default path performs a clean Cargo build. No captured executable bytes are used as compiler input. The local VM preserves the captured upgradeable-loader layout and uses synthetic test state; it does not establish current-chain acceptance.

`CHECKPOINT.json`, the complete reports, source snapshots, loader receipts, actual window inventory, and the independent verifier retain the scope of each claim. `upstream-review.json` records the last main/PR scope check. Whole-file identity, remaining function bodies, ELF data/relocations, and complete toolchain/source provenance remain unfinished.
