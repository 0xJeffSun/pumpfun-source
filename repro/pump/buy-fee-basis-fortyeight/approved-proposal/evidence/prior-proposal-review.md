# Current-source proposal: buy-side whitelist/mode contract

## Status and scope

This is a source-only proposal against the current `programs/pump/src/trade.rs` read from the checkpoint whose README names candidate `b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51`. Main is untouched. `before/trade.rs`, `proposal/trade.rs`, and `proposal.patch` give exact before/after source. No build, typecheck, target execution, new test, runtime case, fixture, signer/PDA bypass, or compiler/layout search was performed.

The minimal executable change is buy-only fee-basis selection at the two existing cap calculations. The whitelist math/reload helper is implemented for the current `SellV3` type but deliberately **not called**. Activating it in the current settlement flow would falsely imply the surrounding source already implements the original ordering. The decoder and `prepare_bonding_curve` calls remain unchanged. The sell function and all existing shared helpers remain byte-for-byte unchanged.

## Independent findings

1. The frozen packet's math is supported by the retained original. I found no correction needed to its ordered arithmetic, thresholds, cap, or error classes. The current proposal spells complete, mode, quote-threshold and circulation-threshold checks separately so the source order is explicit.
2. Current `buy` and `buy_exact_quote` both select fee thresholds using `curve.token_total_supply` in every mode. Original `0xa08f8` selects the mint's supply when mode is zero and the curve's supply when mode is nonzero. Thus ordinary-mode cap basis is a concrete current-source mismatch whenever the supplies differ. The patch fixes only this buy-side input and zero-base guard.
3. The frozen continuation cannot simply be pasted and called after current base CPI. Current buy flows delay the four first-leg reserve stores until after quote funding. The original mutates them **before** base CPI. A pasted helper would see stale virtual/real reserves; even a computed adjustment would then be overwritten by the later `virtual_quote_reserves=next_quote` assignment. Event fields also currently use the cached `next_quote`. These are concrete composition blockers, not evidence that the recovered helper is wrong.
4. Original common zero-user-volume initialization and subsequent fee-accrual ordering do not exist in current source. Current source computes next creator/protocol totals before base CPI. Moving a handful of stores and claiming complete error/effect order would therefore be unjustified. No such movement is included.
5. Whitelist fee exemption is also absent in current source. Original `0x7fde8` compares the same Global+648 key, then branches at 523928 to a four-zero result. However the current FeeConfig is an unchecked account decoded late, unlike the retained typed admission path. Skipping current decoding for whitelist would change admission failures; keeping current tier selection then zeroing would retain tier failures the original wrapper bypasses. The proposal does not silently introduce either behavior. Full exemption is an unresolved admission/fee-wrapper composition requirement.

## Original branch/call/data evidence

All decimal addresses below come from regenerated disassembly of retained original ELF SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Assembly files under `evidence/` contain encoded bytes and decoded signed branch targets. Old textual branch labels were not used to derive these observations.

### Buy-only fee-basis change

In `fee-basis.asm`:

- 657664 loads decoded virtual base+64; 657672 branches to the error path when zero, before either supply load. 658280 stores code6026. Its source-origin construction remains original evidence; proposed `require!` creates a natural new source origin and does not spoof coordinates.
- 657680 adds40 to the mint reference. 657688 reads mode from decoded curve+154; 657696 branches to 657720 when mode is zero. Nonzero mode assigns the curve base to r3 at657704 and adds96 at657712. 657720 loads the selected supply.
- 657728 loads virtual quote+72; 657784 calls u128 multiplication1791432;657840 divides through1785992 using virtual base. Hence the new helper computes `u128(selected_supply) * u128(virtual_quote) / u128(virtual_base)`.

The helper accepts `&Mint`, rather than an eagerly read `u64`, so zero-base rejection and mode selection happen before reading `mint.supply`. It is called in both buy paths at their pretrade cap position. It does not change tier selection, fee rounding, supplied-quote admission, or any sell behavior.

### Whitelist predicate, reload and helper call

`whitelist-sequence.asm` and `settlement-entry.asm` show:

- 539760 calls658416 (`0xa0bf0`) on decoded curve r9. Its failure at539776 exits before base CPI.
- 540000/540008 obtain context+48/context+72, the base vault/user typed-account roles. 540352/540368 pass them to the base CPI helper587208 at540376. Its failure branches from540392 to541776.
- 540536 adds648 to the Global wrapper, then540552 compares32 bytes with the user key copied at540440–540496. Equality at540576 branches to541800. This is Global.whitelist_pda, not decimal288 or a new signer bypass.
- 541840 calls30864 (`0x7890`) for the vault; its successful tag2 gates the user reload at541904. Its tag2 then gates current quote-key copying541944–542000 and amount loads542008/542024 from each reloaded token wrapper+104.
- 542072 calls664560 (`0xa23f0`) with mutable decoded curve r9, those two amounts, and the stored quote-key copy. Success tag2 branches at542088 back to540584, the common zero-user-volume sequence. Failures return through existing cleanup before later settlement.

The dormant helper preserves these two actual `reload()?` calls in this order, and copies `curve.quote_mint` after both. Reloads must run even when `complete` or `!is_mayhem_mode` makes the math return immediately. Cached pre-CPI amounts or callbacks that always succeed are not equivalent.

### Ordered math and errors

`whitelist-math.asm`:

- 664576/664584 checks complete first;664592/664608 checks mode second.
- 664616 loads total supply+96;664624 rejects its high bit before doubling at664632. 664640 and664656 reject the two ordered subtractions. Failure reaches ordinal24 at664888/call1432720 at664896: origin-free Pump Overflow6024.
- Real quote+88 is loaded664688. Stored quote is compared to zero via1783416 at664776. Nonzero quote requires1,000,000 at664832; zero quote requires10,000,000 at664944. Only then is circulating compared with1,000,000,000,000 at664856 or664968.
- Virtual base+64 was saved664664. The addition at665000 has its carry incorporated into the u128 product at665096–665176, so checked-u64 addition would incorrectly reject a supported input. Product-overflow and zero-divisor paths use the same ordinal24 converter.
- Division is called at665352. Quotient high-word branches665480/665552 call1686792 (`0x19bd08`) before either cap. `numeric-conversion.asm` stores4102 at1687160. `try_into()?` preserves that Anchor numeric-conversion class; existing shared `narrow()` would incorrectly produce6025 and is not used.
- Nonzero quote cap160,000,000,000 at665616, zero quote cap2,000,000,000,000 at665672. Final virtual quote+72 stores are665656/665712. No other curve/user field is written by this helper.

### Precise reserve-order integration blocker

`reserve-mutation.asm` establishes the successful stores inside658416 in this order:

1. virtual base+64 at658720, after subtracting first-leg base;
2. real base+80 at659184, after subtracting first-leg base;
3. virtual quote+72 at659256, after checked addition of first-leg quote;
4. real quote+88 at660184, after checked addition of first-leg quote.

The caller checks this result before the base CPI above. An eventual integrated source must preserve the interleaved checked operations/stores and their error paths, then base CPI, then the whitelist reload/helper, then common volume initialization and fee accrual, then funding/events. The present source computes four `next_*` values and creator/protocol totals first and commits them late; a reordered assignment-only patch cannot establish that full contract. Neither the patch nor this report asserts those missing stages are complete.

## Proposal layout and next gate

`proposal.patch` makes two buy-side substitutions and appends three private helpers. `buy_fee_market_cap` is the only newly called helper. `buy_whitelist_after_base_transfer` and `update_buy_whitelist_virtual_quote` are source implementations staged for a later faithful settlement composition. No dead helper is presented as implemented runtime behavior.

Before activation, recover/compose the surrounding buy settlement/admission source against the recorded original flow. In particular, resolve whitelist exemption with authentic early FeeConfig admission, common volume initialization, checked reserve mutation order, fee accrual, and adjusted event snapshots. The original helper does not authorize broadening quote admission or revisiting token extensions. The previously saved runtime rows remain future preservation obligations and provide no coverage for this proposal.
