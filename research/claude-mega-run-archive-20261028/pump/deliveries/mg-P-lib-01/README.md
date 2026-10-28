# mg-P-lib-01: +0x806c8 (trade_v3.rs net_quote_for_budget)

Cumulative on deliveries/r5-libinst-06 (916/165) -> 917 normalized / 165 raw. Gains vs start: 0x806c8. Losses: none. Raw losses: none.
Build: fastbuild identity recipe, ok, runtime_valid true, no stack warnings.

## Change (trade_v3.rs only)
- New private `#[inline(never)] fn net_quote_for_budget(creator:&Pubkey, protocol_fee_bps, creator_fee_bps, budget)
  -> Result<(net, protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps)>` written at trade_v3.rs 310-329 so its two
  `require_gt!` sites sit on the original lines 317 (BuyNotEnoughSolToCoverFees) and 326 (BuySlippageBelowMinTokensOut).
  The `gross_up_quote` header moved from lines 295-298 to 378-381 (its Source sites unchanged) so 295-377 is module level;
  pad balance kept (layout-pad(83) -> layout-pad(14) + helper lines). synthetic_layout: true (layout-pad positioning).
- v3 buy_exact_quote now calls the helper instead of `net_quote(..)` + the separate raw_quote/require pair (lines 900-902 -> 1 call + 2 blank).

## Binary evidence
- Original 0x806c8 callers: 0x5b3b0 (multi-hop) @0x5ce50, 0x83088 @0x83268, 0x1489f8 (v3 buy_exact_quote) @0x149140 (after the
  whitelist memcmp; r2 = curve, r3/r4/r5 = bps/bps/budget). The candidate function now byte-matches the original (normalized).
- Semantics (= original helper): creator_bps = creator==default ? 0 : creator_fee_bps; total = pbps.checked_add(creator_bps) (Overflow);
  net = total==0 ? budget : budget==0 ? 0 : budget*10000/(10000+total); require_gt!(net,0,6041); pf=fee(net,pbps)?; cf=fee(net,creator_bps)?;
  if net+pf+cf (saturating) > budget { net = net.checked_sub(excess)? (Overflow); require_gt!(net,0,6042) }.
- Behaviour note for the integrators: the base handler subtracted 1 when over budget; the original helper subtracts the full excess
  (differs only when the two rounded-up fees overshoot by 2). The new code follows the original helper. Fee-exempt path unchanged.
Origin: prior lane r5-libinst experiment nz5 (built but not delivered there); rebuilt and re-scored in this lane.
