# r5-z09-01: v3 buy decomposed into the original's helper functions (911 / 165, +4, no losses)

Base L12 (907/165). Build: fastbuild identity recipe, runtime_valid true, no stack warnings.

## What changed
`src/trade_v3.rs`: the monolithic `trade::buy` (lines 392-871) is replaced, line-neutrally (same 480-line region,
everything after line 871 unchanged), by the original's decomposition, recovered from the original handler 0x147ba0 and its
callees:
- `v3_quote_context` (= 0x7f010: check_quote + SOL buyback-recipient validation, returns (is_sol, quote_fee))
- `v3_trade_fees` (= 0x7fde8: whitelist => zeros; else market cap / fee config / tier; returns
  TradeFees{protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps}; creator_fee = 0 when curve.creator is default)
- `v3_buy_costs` (= 0x80df8: buyback split, add3 first/post costs, gross-up; returns (pool_quote, total_buyback, quote_transfer_fee))
- `v3_pool_before` (= 0x82128, lines 494/498/502/506/507) **matched**
- `v3_post_complete` (= 0x82af8, lines 518/526; recomputes fees for the post quote through v3_trade_fees, as the original does)
- `v3_execute_buy` (= 0x83c00: apply_buy FIRST, transfer_curve_tokens(amount+post.base_out) line 691, whitelist-PDA path
  reload()s both base token accounts and calls `sync_virtual_quote_reserves(curve_vault.amount, user_ata.amount, quote_mint)`,
  user-volume init, accrue_fees for main and post fill, total buyback line 721 closure, transfer_from_user, buyback transfer
  (transfer_native SOL / transfer_user_quote_tokens), post_fee_amount net buybacks with require at line 767 closure)
- `v3_emit_buy` (= 0x859b0: one Clock::get, TradeEvent emit!/emit_cpi!, completion flag + CompleteEvent, PostCompleteBuyEvent)
- `buy` handler (= 0x147ba0, lines 801/802/811/842), excess/partial-fill clamp as in the original.
`src/mayhem_virtual_params.rs`: `sync_virtual_quote_reserves` made `pub(crate)` (called from v3_execute_buy as in the original
0x84578 -> 0xa23f0).

## Gains (score.py)
- 0x82128 (v3_pool_before body, 2512 B) - z07 window
- 0x84970, 0x84b78 (v3_execute_buy closures at lines 721 / 767) - coord windows
- 0x7890 (`Account<TokenAccount>::reload`, instantiated by the whitelist path's InterfaceAccount::reload) - libinst window

## Behaviour evidence (original disassembly)
- 0x147ba0 calls in order: 0x3cd50 prepare_bonding_curve, validate_trade, [6020 line 801, 6021 line 802 with_values(real, amount)],
  0x7f010, buy_quote + try_from closure 0x84d80 (line 811), 0x7fde8, (if excess) 0x82128 + 0x82af8, 0x80df8, add + 6002 line 842
  (require_gte double-evaluation of add), 0x83c00, 0x859b0 with ix name "buy" (0x1b6862, len 3).
- 0x83c00: apply_buy at entry; whitelist memcmp(user, global+0x288) => 0x7890 x2 (reload) + 0xa23f0 sync; accrue_fees x2 summed
  for the buyback transfer amount; post_fee_amount x2 returning (total_net - post_net, post_net).
- The candidate's previous monolith differed in behaviour (no whitelist reload/sync, transfers before apply_buy, buyback event
  net computed differently); the new code follows the original's data flow.

The handler 0x147ba0 itself is not matched yet (see lane PROGRESS.md).
