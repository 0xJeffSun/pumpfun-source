# Next admitted buy correction: complete before cashback

A minimal source-only correction is justified for the admitted `buy` path: check `BondingCurve.complete` before `is_cashback_coin`. The current source reverses these two checks. For an otherwise admitted call with both flags set, it therefore returns CashbackCoinNotSupported6094, whereas the retained original BuyV3 mode helper returns BondingCurveComplete6005.

`proposal.patch` swaps only those two adjacent `require!` lines in `pub fn buy`. No helper, account borrow, allocation, CPI, reserve write, fee operation, decoder, whitelist branch or sell body is changed. The freshly accepted fee-basis helper remains byte-for-byte unchanged. This package does not build or execute anything, and it does not edit main source.

## Complete original mode helper and admitted caller

Original ELF SHA256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Already-admitted B5 evidence retains the full helper [516272,517264),992 bytes, SHA256 `c4d17f123eb7dc7757d1d9e311051566b3915a960fbbd76e09734c1ba529747b`. The raw full-body disassembly, complete instruction/call/data ledger and original ELF are included; no success-only slice is substituted for the error branches.

The helper masks the complete byte at516280 and branches to its first error path at516288 when nonzero. That path stores6005 at516920. Only if complete is zero does it test the allowance argument at516304, followed by cashback at516312/516320. Allowance nonzero or cashback zero reaches success; cashback nonzero with allowance zero reaches the second error path, storing6094 at517144. Common return stores and terminal exit517256 are retained. Both failures use natural owned error construction with original source metadata; this proposal does not synthesize any historical path or line.

The admitted BuyV3 caller [1342408,1342576) first calls curve preparation249168 at1342472 and gates its success tag. It loads cashback from the current curve wrapper+163 at1342504 and complete from wrapper+161 at1342512, supplies literal allowance0 at1342536, and calls516272 at1342544. This caller is explicitly identified in the earlier admitted B5 review. The change therefore follows a documented source contract, rather than guessing from a generic shared helper.

The effective truth table at this call is:

| Complete | Cashback | Result |
|---|---|---|
| false | false | success |
| false | true |6094 |
| true | false |6005 |
| true | true |6005 |

Only the final row differs from the current adjacent source checks, assuming earlier current preflight has reached them. The patch retains `require!` and their natural source origins. Exact emitted layout, allocation, cleanup and historical diagnostic bytes are unproved; the swap is not presented as an instruction-identity repair.

## Deliberate scope limits

`buy_exact_quote` has the same reversed source lines. Its different original caller address1346216 occurs in the prior inventory, but that inventory marks other callers opaque and the B5 report explicitly attributes only the admitted BuyV3 caller1342544. This patch leaves `buy_exact_quote` untouched rather than extending source attribution from a shared helper address alone. Root may broaden it only after its original caller/argument identity is independently admitted.

The current `buy` still runs `check_quote` before these checks; this review does not establish full original relative error ordering between quote validation and mode preflight. Consequently the claim is limited to these adjacent checks when reached. Typed FeeConfig admission, whitelist fee exemption, reserve mutation before CPI, reload order, volume initialization and settlement/event composition remain unresolved and unchanged. All other original rows remain opaque. No sell_v2, incentives/admin, or token-extension scope is reopened.

## Acceptance conditions

Before any build, confirm current `trade.rs` equals `before/trade.rs` and review the exact two-line reorder. A later authorized build should use the unchanged pinned recipe and only this overlay. Preserve whole-function/call/data comparisons, including both error branches and source metadata; don't treat normalized or partial agreement as whole identity. Existing unmodified permitted regressions may establish preservation but are not evidence for this double-flag case unless their saved input bytes actually contain both flags. No new fixture is proposed here.

`python3 -B verify.py` checks the sealed files, exact source transformation, unchanged source outside the admitted buy function, regenerated complete original helper and caller disassemblies, both code stores, branch destinations, literal allowance and call target. Optional `--current-main /path/to/repository` binds the current source to the before file. It executes no program and performs no build or network request.
