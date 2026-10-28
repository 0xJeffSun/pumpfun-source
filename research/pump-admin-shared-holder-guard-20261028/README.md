# Restore the shared-holder destination validation boundary

The reconstructed `admin_cto` handler checks the holder creator-vault address only when the calculated payout is positive. The captured deployed program checks that address for every shared holder conversion, before inspecting either frozen vault. With a coherent wrong holder-vault address and its matching ATA, the control accepts a zero-balance conversion; the original returns `ConstraintSeeds` 2006 at `creator/admin_cto.rs:648`. With a positive frozen AMM or Pump vault, the control returns 6093 first, while the original still returns 2006.

This packet restores that real branch boundary. The destination validation runs under `shared && holder`; only payment depends on `amount > 0`. The existing AMM-to-Pump collection and Pump-vault balance checks follow the destination check. No validation is removed or replaced, and no new helper is introduced. The two genuine frozen-vault validations also recover their observed Source records:

| Validation | Control line | Deployed line |
|---|---:|---:|
| Frozen AMM sharing-config vault holds tokens | 413 | 660 |
| Frozen Pump sharing-config vault holds tokens | 557 | 719 |

The patch applies to the exact `admin_cto.rs` qualified in PR #595, preserving its five corrections and every other existing error Source position. The blank-line placement deliberately restores the same observed operations within the inherited synthetic source layout. This source positioning is engineered and is disclosed separately from the behavior correction.

Twelve focused original/control/candidate cases retain **36 independently reverified signed transactions**. The control fails nine cases: three zero-balance destination checks across native, Token and Token-2022 quotes; two destination-versus-frozen error priorities; and four frozen Source records across Token and Token-2022. The candidate matches all structured fields and every ordered `Program log` and `Program data` message. Valid empty and zero-balance frozen controls also match. The original **363-case admin_cto corpus** passes with zero structured or ordered program-message differences. Compute-use and runtime invocation bookkeeping are outside the message comparison.

All runs use the captured upgradeable loader and genuine captured dependency programs. The fixture exposes only the holder-vault public key before its ordinary ATA derivation and instruction construction. It retains every account check; the pool authority remains a nonsigner at the transaction boundary. Initial reproductions against the actual PR #569 ELF are retained separately.

Both complete match memberships remain **1018/1035 normalized and 166 raw**, relative to the exact compiled PR #595 control. There are no normalized or raw membership gains or losses. These are pinned control counts, not a current-frontier claim. The `0x22a10` handler window and whole-ELF identity remain unmatched.

The packet retains the one-file source patch, complete compiled control/candidate sources, unmodified compiler receipts, explicit clean receipt and actual compilation of both local crates, SDK/library hashes, ELFs, all 1035 census windows, signed runtime reports, loader receipts, and original CFG observations. No maintained source, global README, SDK or registry source changes.

```sh
python research/pump-admin-shared-holder-guard-20261028/verify.py
```

The verifier checks source/artifact bindings, the restored branch and same-operation Source records, unchanged remaining error positions, both complete match memberships, signatures, structured results and ordered messages, original instruction decoding, and compiler/clean/loader receipts. It does not rebuild or claim full program equivalence.

The recorded builder and runtime producer under `tools/` retain their session paths. Substitute a complete repository checkout for `/workspace/pumpfun-source-latest` when replaying elsewhere. The focused producer accepts `--candidate PATH --output PATH`, plus optional `--baseline PATH`; invoke it through `scripts/pump_with_captured_loader.py --receipt PATH`. The recorded compiler flags are `--release --target sbpf-solana-solana --locked --offline`; explicitly clean both `pump-recovered` and `pump-token-ext` for that target before rebuilding.
