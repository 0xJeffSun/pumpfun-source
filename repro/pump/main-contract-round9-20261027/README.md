# Main Pump verified checkpoint — Round9

The canonical Rust main contract builds reproducibly from the archived `primary/` sources. Clean, dependency-cached, canonical and archived-source builds produce identical stripped and unstripped ELF hashes.

The reconstruction matches **599 / 1,035 original function windows (57.9%)**, including **111 raw byte-equal bodies**. Matched windows contain **518,448 / 1,792,208 text bytes (28.9%)**. Normalization masks direct-call destinations and ELF pointers; it does not prove matching callees or data. The stricter closed direct-call subset contains 132 windows and excludes ELF data references. **Whole-ELF identity remains false.**

The full captured-loader regression passed 44 suites / 10,468 cases. Another 45 focused suites passed 3,187 executions. These corpora overlap. Strict diagnostics agree in 13,651 paired log cases; source coordinates and compute usage remain excluded from that comparison.

Round9 recovers all nine historical curve decoders, owned account contexts, V3 initialization and post-completion buy continuation, buyback recipient updates, creator-owner checks, synchronization and migration balance handling. Later distribution, Token-2022 migration, claim and metadata refinements are separate pending work.

```sh
python repro/pump/main-contract-round9-20261027/verify.py
python repro/pump/main-contract-round9-20261027/reproduce.py --registry-home ~/.cargo --output work/reproduce-main-round9
```

The optional dependency cache contains verified external libraries. Main Rust is always compiled anew. No original executable bytes are used as compiler input. Local signed fixtures and captured loader metadata do not establish live-chain acceptance. Remaining bodies, data/relocations and historical build provenance remain unresolved.
