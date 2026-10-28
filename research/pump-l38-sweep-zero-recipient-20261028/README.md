# Restore the deployed sweep recipient guard

The deployed Pump rejects the default recipient with `NotAuthorized` (6000) at `sweep_fees.rs:123`, before checking creator-vault seeds. L38 omitted this validation and returned `ConstraintSeeds` (2006) on the same creator-sweep input. This packet restores the genuine nonzero-recipient check in the shared sweep handler.

The focused fixture preserves the actual executable System Program when the recipient aliases its default key. Overwriting that account with an ordinary fixture account would fail account validation before reaching the handler. All transactions are normally signed and execute through the captured upgradeable loader.

Only `sweep_fees.rs` changes: one existing blank line becomes the recovered validation at its original Source line 123. All existing Source lines remain in place. The inherited synthetic source layout is disclosed; no source positioning for unrelated operations is introduced.

**This is a behavior correction with no new matched window.** The full census remains **1018/1035 normalized, 166 raw**, with zero normalized or raw gains or losses against the independent native L38 control. Window `0x72810` and whole-ELF identity remain unmatched. The newer open L39 packet (#559, head `44697701`) has the identical sweep source, checked before publication.

Validation includes 18 focused comparisons against the original, unchanged L38, and corrected candidate: creator and protocol sweeps, zero and positive fees, native SOL, SPL token, WSOL, and genuine recipient controls. All 54 focused signed transactions are retained and independently reverified. The correction restores the exact original error and Source log; errors, account state, events, CPI instructions and return data match the original. The existing **504-case sweep corpus** also passes with zero structured mismatches. Broader integration replay belongs to the root integration lane.

The packet retains the precise one-file patch, complete compiled sources, unchanged compiler receipts, SDK and target-library hashes, control and candidate ELFs, all 1035 census windows, signed runtime evidence, and captured-loader receipts. Both local path crates were explicitly cleaned with the recorded target, release, manifest and offline options, and both actually compiled. The fresh candidate exactly reproduces the earlier runtime ELF. No maintained source, global README counts, SDK or registry source changes.

```sh
python research/pump-l38-sweep-zero-recipient-20261028/verify.py
```

The verifier binds compiled inputs and artifacts, recomputes all normalized and raw match memberships, verifies the exact source patch, checks the clean and compiler receipts, re-verifies the retained signatures, and checks both runtime reports and loader profiles. It does not rebuild or claim whole-ELF identity. The exact build driver and focused producer are retained under `tools/`; substitute session paths when reproducing them.
