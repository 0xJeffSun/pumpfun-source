# AMM claim transfer: missing self-transfer admission

`proposal.patch` adds the original self-transfer admission predicate immediately before Claim's token CPI, using the existing SelfTransferNotAllowed error. This is a source-only proposal. No main edits, builds, runtime transactions, fixtures, or dependency changes occurred. The prior accepted context and overflow-order packages remain frozen.

## Complete original path and argument mapping

The admitted original Claim handler0x5a570 calls the2400-byte application transfer wrapper0x727b8 at0x5a950. That wrapper calls the656-byte admission helper0x6f608 at0x72920, then only on success proceeds to the2192-byte anchor_spl transfer_checked0xf4a30 at0x730e0. The latter complete normalized body and all immediate target bodies match current anchor_spl::token_2022::transfer_checked0xe5b80; this is not evidence for changing SPL versions or dependencies.

The handler passes r4=context+0x158, the global incentive token-account region; the stack-0x1000 input is context+0x80, the destination user ATA region. In the wrapper:

*0x72820..0x72868 reads the source AccountInfo through [r4+0x20] and copies its key to stack-0x138.
*0x72870..0x728b8 reads the destination AccountInfo through [stack-0x1000+0x20] and copies its key to stack-0x118.
*0x728c0 advances the source typed token account to its authority/owner Pubkey at r4+0x48.
*0x728d0 loads the authority Pubkey pointer from stack-0xff8, the global accumulator AccountInfo supplied by Claim.
*0x728d8..0x72920 passes r2=source key, r3=source token owner, r4=destination key, r5=authority key to0x6f608.

The AccountInfo key loads are32 bytes, and the two comparisons each use32 bytes. The complete corrected context/member proof lives in the prior claim-context checkpoint; this package uses its now-matching field representations and preserves full handler/window ledger records.

## Exact predicate and error

At0x6f638, memcmp compares source and destination keys. Nonzero branches at0x6f658 directly to success0x6f880. Only for equal keys does0x6f678 compare source token owner against authority. Equality at0x6f690 also branches to success. Otherwise the function constructs error6087 (immediate0x17c7 at0x6f820). Current source defines SelfTransferNotAllowed with discriminant87 under Anchor's6000 offset and message `A transfer's source is its destination and the signer does not own it`.

The original error constructor includes the truthful source path `programs/pump-amm/src/utils/token.rs` and stores an ordinary Anchor error. It does not attach compared Pubkeys or account-name metadata. Therefore the proposed source uses `require!(source.key()!=destination.key() || source.owner==authority.key(), PumpAmmError::SelfTransferNotAllowed)`, rather than require_keys_eq or a fabricated historical location.

The application wrapper also returns early for zero amount (0x727c8/0x727d0). Claim already returns on amount0 before reaching its token call, so adding another amount branch is unnecessary. Its existing nonzero guard remains unchanged.

## Current omission and narrow correction

The current Claim source builds CpiContext and calls token_interface::transfer_checked directly. Current downstream helper0xe5b80 corresponds to original0xf4a30, bypassing original application wrapper0x727b8 and its admission helper. The current constructor/parser constrains the two ATAs, but the transfer helper itself contains no restored predicate at this call site. The proposed line adds exactly that predicate using typed source-owner data already loaded by the parser.

The original application helper owns/clones AccountInfo values in a different order from the current inline CpiContext construction. This patch does not purport to restore every clone/drop, error allocation, helper boundary, or full handler size. Extracting a broadly reusable helper or changing unrelated token transfer paths is not part of this proposal. No inlining/layout directive is added.

## Important reachability and equivalence limits

Under the existing successful Claim ATA constraints, equal source and destination token-account addresses imply their mint and owner agree with both global accumulator and user. Thus the SelfTransferNotAllowed failure is plausibly unreachable in a successfully admitted Claim context. No new hostile fixture or runtime probe was attempted. The proposal restores an explicit original application admission; it does not claim that the current saved successful cases expose a different final state or that the new branch is newly security-critical.

This does not remove the unresolved full handler, updater sharing, event serialization, or recursive graph differences. Data references are retained as ledger references unless their exact extent is proved above; no full transitive data equality is claimed. Original boundaries remain admitted inferred windows. Diagnostic source paths after a future build must remain truthful.

## Files and checks

`original/` retains complete handler, wrapper, admission and downstream CPI windows. `candidate/` retains the complete latest handler and actual downstream CPI. `rows.json` retains complete original/current rows plus every immediate call target, including branches/relocations/data references. `bindings.json` binds the latest eeca5a51 candidate, symbols, source and full ledger. `before.rs`/`after.rs` and `proposal.patch` preserve the exact source proposal.

Run `python3 -B work/amm-claim-transfer-next/verify.py --repo .` to check the seal, current bound evidence, exact predicate branch and call targets, downstream normalized correspondence and the single-line insertion. It does not compile or execute the target. Root review is required before any build.
