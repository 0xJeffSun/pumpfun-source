# Independent Mayhem typed-error review

**Pass for the narrow correction and unchanged finite functional corpus.** No blocking issue found in the reviewed two-file source delta. This is not a full-equivalence, raw-log-equality, security or main-acceptance claim.

The exact patch adds `PumpSwapCpiMathOverflow = 11` to the existing `PumpSwapError` and uses `.ok_or(PumpSwapError::PumpSwapCpiMathOverflow).unwrap()` at the checked division. No other source delta is present against the frozen before/proposal files. Compiled scratch source matches that proposal and all other recorded source/helper/runtime input hashes remain unchanged.

Independently decoded original evidence: zero denominator falls through at 186192 to u32 enum value 11 at 186200; call 186280 reaches Result unwrap failure 674280. Its Debug vtable has size/alignment 4/4 and formatter196888; the index11 table entries identify exactly `PumpSwapCpiMathOverflow`. The original Display branch selects `Math Overflow in Pump Swap CPI call`. The original full functions and literal data remain the provenance, not a guessed log string.

Compiled candidate `dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4` has the denominator/carry OR and zero branch at130840/130848, writes11 at130856 and calls Result unwrap at130936 ->573992. The error pointer, 43-byte Result-unwrapping literal, 4/4 Debug vtable and23-byte variant name are checked against actual bytes. Candidate Debug's value11 route selects that name. Stripped and symbol ELF allocated sections agree. This is a panic construction, not a recoverable Anchor6011 return. The outer narrowing unwrap remains unchanged. Historical enum container spelling and complete math/helper equivalence are not recovered.

## Corpus and diagnostic limits

Independently reconciled **20 flat receipts, 9,589 comparisons, plus three two-step burn sequences, six comparisons = 9,595**. All21 recorded runner exits are zero; all20 flat mismatch arrays are empty. The15 saved verifier exits are zero. The burn receipts retain exactly the same three difference rows as baseline, each solely `second.logs_without_compute_numbers`: original `burn.rs:82` versus candidate `burn.rs:43` within the same Anchor `MayhemModeEnded`, code6004 and unchanged message. The review asserts those exact strings, not a new normalization rule. All other checked burn state/error/event/inner-instruction/return/signed-message fields agree.

There are also **58 flat diagnostic-difference rows**, so total retained diagnostic rows are61 including burn. In the two selected zero-divisor cases, the old extra Option-unwrapping log disappears but truthful source-location/compute differences remain. It would be wrong to claim identical logs or to hide those differences.

The aggregate19,190 is a recorded/derived signed-execution count. I independently verified signatures for **13,284 retained transaction byte strings /26,500 signatures** (including both burn steps). Administrative receipts do not retain every signed transaction byte string; I do not claim independent signature verification for all19,190 executions. Their unchanged harnesses do construct signed transactions and retain functional results.

The broad inventory leaves original opaque rows opaque. The simple full-ledger's original rows are byte-for-byte the prior rows. Newly grouped candidate symbols and matches on previously admitted original windows are bounded inventory evidence, not source completeness or full equivalence. No new broad normalization is accepted by this review.

## Reproduce

From the repository root:

```
PYTHONDONTWRITEBYTECODE=1 work/test-env/bin/python -B work/mayhem-result-error-independent-review/review.py
```

This only reads the frozen proposal, scratch build/static/receipts and baseline burn receipt, and writes this review's result/count files. It does not run a build, VM, transaction or probe. Initial reviewer check expected a panic-form burn location line; the retained receipt is instead an AnchorError location line. `review.initial.py`/`.log` retain that mistaken assertion, and the final verifier checks the actual two exact baseline strings. No target or test fixture was modified to pass it.

Main source changes and a root build may now exist independently. This review neither reads them as the proposal nor establishes their identity; root must separately require complete main/scratch executable and symbol equality before transferring these finite receipts.
