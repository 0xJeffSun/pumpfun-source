# mg-P-z08-03 (base L15, 972 -> 975, raw 165, 0 losses) = mg-P-z08-02 + 0x8bbd0

Gains: 0x1367c0 set_params, 0x89258 trade_fees (see -01/-02) and 0x8bbd0 = the original's TradeEvent builder.

## 0x8bbd0 (src/multi_hop_curve_swap.rs, src/trade_v3.rs)
- New `#[inline(never)] pub fn trade_event(curve:&BondingCurve, global:&Global, volume:&VolumeSnapshot, user:&Pubkey,
  mint:&Pubkey, is_buy, token_amount, quote_amount, fees:&(fee, creator_fee, fee_bps, creator_fee_bps), buyback_fee,
  unparsed_trailing_field, ix_name:&str, timestamp) -> TradeEvent` + `#[derive(Default)] VolumeSnapshot` appended after the
  last Source site of multi_hop_curve_swap.rs (identified by lane r5-z08: original callers = multi-hop 0x5b3b0 with
  "multi_hop_swap" and sell_v3 0x14a8a8 with "sell"; both call sites now use it, line-neutral).
- Body: `let virtual_quote_reserves=..; let real_quote_reserves=..; let quote_mint=curve.quote_mint;
  let is_sol=quote_mint==Pubkey::default();` then ONE struct literal whose field ORDER was found by an IR search
  (stores stay in declaration order; the literal order only moves the value computations): quote_mint, mint, sol_amount,
  is_buy, token_amount, user, timestamp, virtual_sol_reserves, virtual_token_reserves, real_token_reserves, fee_recipient,
  fee_basis_points, fee, creator, creator_fee_basis_points, creator_fee, track_volume, volume x4, ix_name, mayhem_mode,
  cashback_fee_basis_points, cashback, real_sol_reserves, buyback_fee_basis_points, buyback_fee, shareholders,
  quote_amount, virtual_quote_reserves, real_quote_reserves, holder_rewards_bps, holder_rewards, creator_fee_unclaimed,
  unparsed_trailing_field. Byte-identical (1800 B) in the real build.
- Behaviour: field VALUES are the builder's (byte-matched). sell_v3: identical values to L15 (after apply_sell +
  accrue_fees the curve fields equal the next_* values L15 used; buyback bps = same mayhem?0:global formula).
  multi-hop: event now carries mayhem_mode = curve.is_mayhem_mode and buyback_fee_basis_points = mayhem?0:global bps
  (L15 hard-coded false / global bps) = what the original's builder computes for its multi-hop caller. Event-only change;
  no state, CPI or error-path change.
