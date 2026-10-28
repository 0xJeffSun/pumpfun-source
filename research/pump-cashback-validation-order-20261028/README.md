# Restore cashback recipient validation before mint parsing

The deployed `claim_cashback_v2` validates the destination token account before deserializing the quote mint. The recovered source parsed the mint first. When both are invalid, this changes the observed error: a malformed mint plus a wrong recipient token-program owner returns `InvalidAccountData` in the control, while the deployed program returns `AccountTypeNotSupported` (6010) at Source line 333. A wrong recipient authority similarly needs `InvalidCashbackRecipient` (6076) at line 342.

This packet moves the actual mint parse after those validations. Its control is the exact qualified candidate from merged PR #538, including the recovered quote-program guard and early Clock read. The two-line source diff changes only `token_incentives/claim_token_incentives.rs`; the inherited synthetic layout is disclosed, and all existing Source line numbers remain unchanged.

**This is a behavior correction with no new matched window.** Control and candidate both retain **1018/1035 normalized and 166 raw**, with identical normalized and raw match memberships. Window `0x77940` remains unmatched, as does the whole meaningful ELF. These are pinned control-relative counts, with no claim about the current global frontier.

The focused producer retains 18 comparisons against original, PR #538 control, and corrected candidate, with 54 independently reverified signed transactions. It covers Token and Token-2022 cross-fault priorities, malformed recipient data, each fault alone, valid transfers, zero-amount bypass, and native controls. Corrected errors, state, events, CPI instructions and return data match the original, including the exact 333/342 error logs. The existing **283-case cashback corpus** also passes with zero structured mismatches. Both runs use the captured upgradeable loader; broader replay belongs to the root integration lane.

The packet retains complete control and candidate compiled sources, unchanged compiler receipts, the control's original PR #538 artifact binding, explicit candidate clean receipt, actual compilation of both local crates, SDK and target-library hashes, ELFs, all 1035 census windows, signed runtime evidence and captured-loader receipts. The exact source patch and focused producer are included. No maintained source, global README, SDK or registry source changes.

```sh
python research/pump-cashback-validation-order-20261028/verify.py
```

The verifier binds both compiled input trees and ELFs, recomputes the full census and memberships, checks the precise source change and 6010/6076 error priority, re-verifies all retained focused and corpus signatures, and validates the clean, compiler and loader receipts. It does not rebuild or assert whole-ELF identity. The recorded build driver and focused producer under `tools/` use session paths that need substitution for reproduction.
