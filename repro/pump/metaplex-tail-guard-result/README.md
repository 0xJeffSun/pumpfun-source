# Metaplex error-first tail guard: measured negative result

[Hosted run 40233980723](https://github.com/lalalune/pumpfun-source/actions/runs/40233980723), source checkpoint `b1f07b0bdb7ba0607448d65a097f8c62600a3cf0`, compiled the dedicated tail-guard proposal, patch `e94135b4…`.

Compilation succeeded. The raw ELF exactly reproduced rejected candidate12, SHA256 `4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf`. The extra unconditional jump remains; verified zero allocation padding leaves 196,601 differing payload positions. The comparison step correctly exited1. Candidate11 remains the better retained comparison at1,509 differences.

The complete source patch and source-input map match `../metaplex-tail-guard-source-recovery/`. `verify.py` checks those inputs, the build log and manifest, actual generated raw/padded binaries, original capture and raw equality to candidate12. The trial is rejected as an identity repair. No shared contract source or accepted artifact was replaced; the formatting-only trial remains unbuilt.
