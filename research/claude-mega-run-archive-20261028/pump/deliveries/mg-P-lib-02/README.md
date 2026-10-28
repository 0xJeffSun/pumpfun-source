# mg-P-lib-02: +0x60ee0 +0x93050 +0x940c0 (own) on a composite with r5-z05-04 and r5-z08-03's multi-hop payout

932 normalized / 165 raw (scored vs mg-P-lib-01 = 917/165): gains 0x58668 0x60a80 0x60ee0 0x61348 0x617e8 0x62170 0x63940
0x64358 0x645f8 0x64888 0x65238 0x65eb0 0x8eda0 0x93050 0x940c0; losses none; raw losses none. Build ok, runtime_valid, no stack warnings.
OWN windows: 0x60ee0, 0x93050, 0x940c0. PORTED: r5-z05-04 (create_v2.rs, lib.rs, multi_hop_curve_swap.rs, pump_quote.rs, 3-way merged
onto mg-P-lib-01 with git merge-file; one conflict on multi_hop line 485 resolved as z05 line + `admit_vaults(&h,require_ata)`),
and r5-z08-03's `transfer_quote_out` fn (multi-hop sell payout, 0x8eda0). create_v2.rs: removed 2 blank pad lines after z05's +2 so
libinst's check_quote_mint_extensions require stays on line 528 (0x1a918). synthetic_layout: true (layout-pad positioning).

## 0x60ee0 = pump_quote::root_seed (pump_quote.rs:90)
- Original: separate fn between depth (0x60a80) and initial_amount (0x61348); caller nested_create walk 0x18678 @0x19048 passes
  (sret, &curve (stack BondingCurve copy), &Global, control data ptr/len). Body: quote==default -> Ok(initial_virtual_sol_reserves);
  quote copied to a temp, (copy==default || copy==WSOL || whitelisted_quote_mints contains copy) -> Ok(initial_virtual_quote_reserves);
  control_entry(control,&curve.quote_mint)? -> None => error!(QuoteBondingCurveNotEligible) at pump_quote.rs:90.
- Source: `pub fn root_seed(curve:&BondingCurve, g:&Global, control:&[u8]) -> Result<u64>` at pump_quote.rs 82-91 (pad lines replaced 1:1)
  + private `fn global_quote(quote: Pubkey, g:&Global) -> bool` (by-value Pubkey = the temp copy) at 78-80. create_v2.rs's private root_seed
  removed (lines blanked), walk calls crate::pump_quote::root_seed(&curve, g, &control). Same semantics as before.
## 0x93050 / 0x940c0 = multi-hop payout wrappers (amount==0 early Ok + anchor_spl::token_2022::transfer_checked with curve signer seeds)
- Original hop body 0x5b3b0 calls 0x93050 @0x5e1d0 (program = stack AccountInfo r10-0x7f8 = base token program, from = Box
  InterfaceAccount (associated_base_bonding_curve), to = a.destination, authority = &Account<BondingCurve>, base_mint.decimals,
  base_mint info, amount, &[seeds]) and 0x940c0 @0x5e398 (program r10-0x7c8 = quote token program, from = &h.associated_quote_bonding_curve
  (UncheckedAccount, h+0x20), to = &a.buyback_fee_recipient (UncheckedAccount, a+0x38), same authority/seeds, quote mint).
  The sell payout 0x8eda0 @0x5d518 uses the same quote program slot r10-0x7c8.
- Source: pub fns transfer_base_out / transfer_buyback_out (+ z08's transfer_quote_out) appended to multi_hop_curve_swap.rs; the
  token programs come from z05's token_program_for results on line 485 (renamed base_token_program/quote_token_program); the last-hop
  output transfer and the buyback transfer call the wrappers. Same CPI (ix program = token program chosen from the mint owner, accounts
  [from, mint, to, authority], same seeds); the old checked_transfer used mint.owner as program id, identical for both token programs.
- Note: the old (from,mint,decimals) tuple on the last-hop path is now unused (`let _=..`); next delivery removes it.
