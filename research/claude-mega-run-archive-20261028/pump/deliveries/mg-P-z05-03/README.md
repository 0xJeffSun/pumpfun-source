# mg-P-z05-03 (base L21, 979 -> 982 normalized, raw 165) — cumulative (includes mg-P-z05-01 and -02)

Gains: 0x62aa0 `pump_quote::convert` (-01), 0x58f58 multi-hop native buyback (-02) and NEW 0x5a260 multi-hop input
transfer (4432 B), all byte-identical (normalized). 0 losses, 0 raw losses, no stack warnings.

0x5a260 change (src/multi_hop_curve_swap.rs, line-neutral: the unused `checked_transfer` (lines 120-127) is replaced by the
helper below in the same 8 lines; `route_input` (lines 134-146) becomes `transfer_input` in the same 13 lines; the two call sites
(696/698) are edited in place; `struct PreviousHop` made `pub`; no Source sites in 0x5a260):
```rust
#[inline(always)] fn transfer_tokens<'info>(program: &AccountInfo<'info>, from: &impl ToAccountInfo<'info>, to: &AccountInfo<'info>,
    authority: &impl ToAccountInfo<'info>, mint: &AccountInfo<'info>, amount: u64, decimals: u8, seeds: &[&[&[u8]]]) -> Result<()> {
    if amount == 0 { return Ok(()); }
    anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(program.clone(), TransferChecked { from: from.to_account_info(),
        to: to.clone(), authority: authority.to_account_info(), mint: mint.clone() }, seeds), amount, decimals)
}
pub fn transfer_input<'info>(a: &MultiHopCurve<'info>, previous: Option<&PreviousHop<'info>>, token_program: &AccountInfo<'info>,
    to: &AccountInfo<'info>, decimals: u8, mint: &AccountInfo<'info>, amount: u64) -> Result<()> {
    match previous {
        None => transfer_tokens(token_program, &*a.source, to, &a.source_authority, mint, amount, decimals, &[]),
        Some(p) => {
            if p.output_vault.key() == to.key() { return Ok(()); }
            transfer_tokens(token_program, &p.output_vault, to, &p.authority, mint, amount, decimals,
                &[&[b"bonding-curve", p.base_mint.as_ref(), &[p.bump]]])
        }
    }
}
```
call sites: buy `transfer_input(a,previous.as_ref(),&quote_token_program,&h.associated_quote_bonding_curve,h.quote_mint.decimals,
AsRef::<AccountInfo>::as_ref(&*h.quote_mint),amount)?;` / sell same with base_token_program and `&h.associated_base_bonding_curve.to_account_info()`.

Binary evidence (original 0x5a260): args (sret, a, Option<&PreviousHop> (null test first), &token_program, to, decimals, &mint, amount)
read from the hop body's two call sites (0x5d360 sell: `to` = fresh AccountInfo clone; 0x5dd38 buy: `to` = the UncheckedAccount's
&AccountInfo); PreviousHop layout {base_mint @0, output_vault @0x20, authority @0x50, bump @0x80} = the existing struct;
two direct anchor_spl::token_2022::transfer_checked calls (None: empty seeds, Some: bonding-curve seeds), one memcmp of by-value key()
copies. Decisive knobs: (1) the CPI is an #[inline(always)] helper shared by both arms: inlined blocks are spliced after the call
block, which gives the original's [None path][Some path] layout (inline code put the Some-path memcmp block right after the None
amount test: 0.26-0.33); (2) `from`/`authority` are generic `&impl ToAccountInfo` so `a.source`/`a.source_authority` are converted
inside the helper after the amount test (pre-converted &AccountInfo args hoisted the loads: 0.67); (3) seeds written inline in the
call (0.97 -> 1.000 vs a `let seeds` binding).
Behaviour: same accounts, program id (token_program_for = the mint owner's program), amounts, seeds and early returns as before
(anchor transfer_checked builds the same spl-token-2022 TransferChecked ix and invoke_signed(&[from,mint,to,authority])).
