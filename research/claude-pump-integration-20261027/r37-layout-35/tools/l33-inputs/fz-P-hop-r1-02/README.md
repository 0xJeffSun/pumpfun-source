# fz-P-hop-r1-02 (base L32 composite on fz-P-v3a-r1-02, 994/1035, +0x57e40 +0x83088 +0x837a8 +0x857a8, no losses, runtime_valid, no stack warnings)

Window 0x57e40 (2088 B, multi_hop_curve_swap.rs:295) = the multi-hop "complete fill" helper the original hop body calls
when a buy crosses the curve's remaining tokens. Now byte-equal (normalized) as `multi_hop_curve::execute::complete_fill`.

## Source (see patch.diff; line-neutral, file line counts unchanged)
- `complete_fill(global, fee_config, fee_config_len, market_cap, bonding_curve, associated_base_bonding_curve: &Box<InterfaceAccount<TokenAccount>>, flag, protocol_fee_bps, creator_fee_bps, budget) -> Result<Option<(TradeFees, u64, PostComplete)>>`
- one-line helper `pool_before(global: &Global, curve: &BondingCurve, curve_base, is_sol, amount, quote)` forwarding to the by-value `trade::v3_pool_before`.
- `trade::post_complete_for_budget` (duplicate of window 0x83088) is `pub`; add3/sub3/v3_pool_before/net_quote_for_budget pub(crate).

## Binary evidence (each knob measured with the scorer / llc on our IR)
- Output layout: original writes Option tag @0, masked fees @8..@0x20, quote @0x28, PostComplete @0x30..@0x70 = tuple
  `(TradeFees, u64, PostComplete)` (tuple offsets 0/0x20/0x28 confirmed with the platform rustc; a struct is reordered PostComplete-first). 0.68 -> 0.70.
- `&Box<InterfaceAccount>` param: original loads [abbc+0x68] in the callee before the memcmp (pointer arg not promoted). 0.78 -> 0.87, equal length.
- `pub` post_complete_for_budget: original passes exact_quote=1 as a stack arg (`stdw [r10-0xfe8], 1`).
- Load order at the v3_pool_before call: original = amount, memcmp, fee [global+0x408], real_quote [curve+0x60]. IR edit moving
  the fee load to that spot gave ratio 1.0 (llx/m1). Source: ArgumentPromotion of a forwarding helper with (global, curve) params.

## Behaviour
The crossing branch of the hop now calls complete_fill (Ok(None) when the budget does not cover the curve fill; fees from
fee_math::get_fees masked by the hop's flag bits). This mirrors the original helper exactly, but the hop body (0x5b3b0) is still a
reconstruction: run the multi-hop runtime/differential suite before integrating. If fz-P-v3a-r1-02 (estimate_post_complete = 0x83088)
is composed, point complete_fill at that function instead of post_complete_for_budget (same signature/semantics) and drop the duplicate.

## -02 changes vs -01
Built on fz-P-v3a-r1-02's tree (their trade_v3 estimate_post_complete = 0x83088); complete_fill calls estimate_post_complete,
the -01 duplicate post_complete_for_budget is not present; add3 and v3_pool_before are pub(crate). Gains vs L32: 0x57e40 (this lane)
+ 0x83088 0x837a8 0x857a8 (fz-P-v3a-r1).
