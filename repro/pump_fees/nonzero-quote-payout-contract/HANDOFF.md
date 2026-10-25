# Fees nonzero-quote payout preparation

Owned original `[219376,225920)` only; fixed Fees8ff12 source and symbols. No source replacement, build, runtime, new fixture or main change.

- Pair `remaining[i]` with `remaining[n+i]`. Check both exist before comparing the first key; only the first account's executable flag filters the pair. The partner's flags are copied, not validated here.
- Unchanged: copied shareholders, false, clone the entire input account slice including trailing entries. Empty shareholders also take this branch.
- Changed/nonempty: saturating rescale with residual to the first greatest original weight; true; move retained first accounts followed by retained partners. Changed/empty returns true and no accounts.
- Ordinary errors clean up partners before first accounts. Missing first/partner report 6013 at original lines 234/237; mismatch reports 6020 at 239 with formatted-string compared values. Preserve per-iteration precedence, allocations and abnormal paths.

Full report and recomputable proof retain every root instruction, direct call and root data object. Helper 1008 has no normalized candidate match; recursive data/call and historical-source identity remain unresolved. No token-extension or preprocessing meaning is inferred. All 17,461 existing cases and the separate ten-step sequence remain requirements, not results of this task.

Run `python3 -B verify.py` in a separate copy. `verification.json` records portability and negative checks. `manifest.json` is the exact public allowlist (excluding itself); `ownedmap.json` states ownership and unresolved obligations. Read REPORT.md before composing any source change.
