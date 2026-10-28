# Restore cashback-v2 quote-program validation on L38

The deployed Pump rejects a non-SPL quote token program with `InvalidQuoteTokenProgram` (6064) before reading token balances or attempting a token CPI. L38 skipped this guard: a consistently derived zero-balance fixture succeeded, and a positive-balance fixture reached an `IncorrectProgramId` CPI error. This isolated source correction restores the deployed behavior and its early Clock read.

Only `token_incentives/claim_token_incentives.rs` changes. The existing mint-owner validation moves to its original Source line 310, the recovered program guard occupies its genuine original Source line 305, and the event reuses the timestamp read at handler entry. Native WSOL claims keep ignoring the quote-program argument, as the deployed program does. Inherited synthetic source positioning is disclosed; all other Source lines stay in place.

**This is a behavior fix, not a new byte-matched window.** The complete census remains **1018/1035 normalized, 166 raw**, with zero normalized or raw gains or losses against the independently built native L38 control. Window `0x77940` and whole-ELF identity remain unmatched.

Validation retains eight focused cases against original, unchanged L38 and corrected candidate: invalid-program zero/positive balances, invalid-program plus wrong mint owner, native bypass, and genuine Token/Token-2022 zero/positive controls. All 24 signed transactions are retained and independently re-verified; corrected state, errors, events, CPI instructions and return data match the original. The existing **283-case cashback corpus** also passes with zero mismatches. Both runs use the captured upgradeable loader. The root integration lane owns the broader 44-suite replay.

`source.patch` is the exact one-file diff. The packet includes the complete compiled candidate and official-control sources, unchanged compiler receipts, SDK/target-library/tool hashes, candidate/control ELFs and complete inventories. Both local path crates were explicitly cleaned and freshly compiled for the candidate. No maintained source, global README counts, SDK or registry source changed.

```sh
python research/pump-l38-cashback-quote-program-20261028/verify.py
```

The verifier recomputes every one of the 1035 windows, checks that the full normalized and raw match sets are unchanged, binds all compiled inputs and ELFs, verifies the precise source diff and error priority, re-verifies the 24 focused signatures, and checks both retained runtime/loader receipts. It does not rebuild or claim whole-ELF identity. The exact build driver and focused producer are retained under `tools/`; their session paths need substitution for reproduction.
