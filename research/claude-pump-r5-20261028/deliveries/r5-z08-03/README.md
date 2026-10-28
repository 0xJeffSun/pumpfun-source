# r5-z08-03: multi-hop sell payout transfer helper (911 / 165)

Gains vs L12: 0x8eda0 (new), 0x94908, 0x94e28, 0x95360 (from r5-z08-01/02). No losses, no raw losses, runtime_valid.
Built from lanes/r5-z08/vars/N_mh1/src (its Cargo.toml path dep points at that src/native_fee; see r5-z08-01 README).

## Changes on top of r5-z08-02
- src/multi_hop_curve_swap.rs: new `#[inline(never)] pub fn transfer_quote_out(token_program:&AccountInfo, from:&UncheckedAccount,
  to:&InterfaceAccount<TokenAccount>, authority:&Account<BondingCurve>, decimals:u8, mint:&AccountInfo, amount:u64,
  signer_seeds:&[&[&[u8]];1]) -> Result<()>` = `anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(
  token_program.clone(), TransferChecked{from, to, authority, mint}, signer_seeds), amount, decimals)` (appended at EOF,
  line-neutral). The last-hop SELL payout (curve quote vault -> destination) now calls it with the token program chosen by
  the quote mint's owner (token_2022 / token, else AccountTypeNotSupported); the BUY payout keeps checked_transfer.
- Also carries lane work-in-progress that is byte-neutral for the score: trade_fees (fee_cpi.rs: CpiContext built inside the
  call args, buy_fee_market_cap, `let mut creator_fee_bps` selection, `return Ok(..)`, creator fee `if creator != default`),
  SetMayhemVirtualParams.token_program: Program<'info, Token2022>.

## Binary evidence (original 0x8eda0, 2088 B; only caller = multi-hop hop body 0x5b3b0 @0x5d518)
- Call site: r2 = &local AccountInfo (token program selected earlier), r3 = &CurveHop.associated_quote_bonding_curve
  (inline UncheckedAccount at accounts+0x20), r4 = &*destination (Box<InterfaceAccount<TokenAccount>> at MultiHopCurve+0x30),
  stack: &Account<BondingCurve>, quote_mint.decimals ([mint+0x30]), quote mint info ([mint+0x58]), amount, &seeds (len 1).
- Body: clones in order program, from, to, authority, mint (struct literal order from,to,authority,mint), remaining_accounts
  empty Vec, signer seeds len 1, call anchor_spl::token_2022::transfer_checked. Byte-identical (normalized) after the change.
- Behaviour: anchor's transfer_checked builds the spl-token-2022 instruction with program_id = token program key and
  invokes with [from, mint, to, authority] + seeds - the same account list the previous hand-built spl ix used.
