# AMM Sync: restore no-change diagnostic

`proposal.patch` adds only the missing else-branch message to Sync's existing `before != after` event branch:

```rust
}else{
    msg!("No changes in accumulator for user={}",ctx.accounts.user.key());
}
```

The current matched Sync account declarations, Claim corrections, reset algorithm, event construction and CPI remain unchanged. No build, target execution, new fixture or harness assertion was performed.

## Original control flow

The full admitted original Sync handler is0x5dc20..0x5e778 (2904 bytes). Its Clock call0x5dc48 precedes all reset/log decisions. A Clock error at0x5dc58 branches to0x5dda0 and returns through the error path without the no-change message.

The no-change block starts0x5de10. It is reached when last_update_timestamp>=start_time (0x5dc70→0x5de10), when now>=start_time (0x5dc88→0x5de10), or when the reset qualifies but prior total_claimed_tokens is zero (0x5dca8→0x5de10). The qualifying reset with nonzero prior claimed total follows0x5dcb0 into event/log-data/self-CPI, bypassing this block. These are exactly the unchanged branches of the existing source's before/after test.

At0x5de10..0x5de50 the handler copies the user's32-byte key from the now-proved context AccountInfo at+0x280 into stack storage. At0x5de58 it supplies formatter0x10e970. Its complete40-byte body corresponds to the current Pubkey Debug/Display alias; both produce the same bare base58 Pubkey text. The original spelling of the formatting placeholder is not recoverable from this alias, so the proposed ordinary Display placeholder is not a historical-text claim.

The piece descriptor at0x122590 contains the relocated pointer0x11ce7c and length35. The exact bytes are `No changes in accumulator for user=`. Argument/piece counts at0x5dec0/0x5dec8 are each1. The handler invokes alloc::fmt::format_inner at0x5def0→0x1113f8, then logs the resulting string at0x5df08 and returns success. `format-data.json` retains the exact bounded descriptor/piece bytes. No arbitrary neighboring data or invented coordinates are needed.

## Current omission and existing runtime corroboration

Current accepted candidate69e5b9fc's complete Sync handler is0xaf120..0xafb98 (2680 bytes). It preserves reset and event behavior, but the unchanged branch returns without this formatted log. The source has no else branch.

The frozen222-case `incentives_sync` receipt already records113 rows containing the original no-change message and no corresponding candidate message. All113 have empty saved `diff`, because the unchanged harness explicitly excludes `logs` from its comparison at line128. This is not a newly designed test or an inferred future result: the original and candidate raw logs are already retained in the accepted signed corpus. `existing-sync-receipt.json.gz` is an exact copy, and `existing-log-evidence.json` extracts only indices, messages, errors and existing diff results. The copied receipt retains exactly the accepted synthetic account state and transaction bytes.

The existing effect/event/CPI/error comparisons remain valuable but do not cover arbitrary ordinary-log equality. This observed omission is a concrete source behavior discrepancy, not merely a code-size preference. Restoring the message also naturally restores its formatting/allocator path, without attempting to force the full handler's instruction shape.

## Limits

No successful build of this proposal exists yet. The branch predicates are derived from the complete original CFG and current before/after semantics; no claim is made that all remaining handler, allocation, data/metadata or transitive-call differences disappear. The currently matched parser/wrapper and all Claim logic remain frozen. Full original ELF identity and precise historical source spelling are unresolved.

Run `python3 -B work/amm-sync-nochange-log-next/verify.py --repo .` to check sealed files, optional live bindings, exact branch/format/formatter evidence, all113 saved log discrepancies and the single-else insertion. It performs no build or target execution. Any follow-up build requires root review.
