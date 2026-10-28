# mg-P-z05-02 (base L21, 979 -> 981 normalized, raw 165) — cumulative (includes mg-P-z05-01)

Gains: 0x62aa0 `pump_quote::convert` (from -01) and 0x58f58 multi-hop native buyback (4872 B) now byte-identical
(normalized). 0 losses, 0 raw losses, no stack warnings.

0x58f58 change (src/multi_hop_curve_swap.rs, line-neutral: the rewritten fn occupies the same 16 lines 207-222; the only call site
at line 754 is edited in place; no Source sites in 0x58f58):
```rust
pub fn native_buyback<'info>(a: &MultiHopCurve<'info>, event_bump: u8, curve: &Account<'info, BondingCurve>, amount: u64) -> Result<()> {
    if amount == 0 { return Ok(()); }
    let to = a.buyback_fee_recipient.to_account_info();
    let curve_info = curve.to_account_info();
    crate::trade::quote_payments::transfer_native(curve, to.clone(), amount)?;
    invoke_signed(&Instruction { program_id: crate::ID, accounts: vec![AccountMeta::new_readonly(a.event_authority.key(), true),
        AccountMeta::new(curve_info.key(), false), AccountMeta::new(to.key(), false)], data: anchor_lang::event::EVENT_IX_TAG_LE.to_vec() },
        &[a.event_authority.to_account_info(), curve_info, to.clone()], &[&[b"__event_authority", &[event_bump]]])?;
    invoke(&anchor_spl::token::spl_token::instruction::sync_native(&anchor_spl::token::spl_token::id(), to.key)?, &[to])?;
    Ok(())
}
```
call site: `native_buyback(a,ctx.bumps.event_authority,&h.bonding_curve,paid_buyback)?;`

Binary evidence (original 0x58f58): args (sret, a, bump, &Account<BondingCurve>, amount) — `jeq r5,0 -> Ok`; clones
a.buyback_fee_recipient (MultiHopCurve+0x38) then the curve AccountInfo; calls trade::quote_payments::transfer_native (0x965b8);
self-CPI invoke_signed (3 metas, 8-byte EVENT_IX_TAG data allocated through RawVec -> raw_vec::handle_error, the same callee
the original calls at that site), spl_token::instruction::sync_native with a by-value `spl_token::id()` (4x lddw stack Pubkey)
and `invoke`. Decisive knobs: (1) by-value `spl_token::id()` (4776 -> 4872 B, same size as the original);
(2) the sync_native instruction built INSIDE the invoke call (one statement): the id temp and ix then live through the invoke,
so the invoke result shares the invoke_signed result slot and the frame matches (0.84 -> 1.000).
Behaviour: same lamport move (anchor sub_lamports/add_lamports, ArithmeticOverflow), same CPIs/accounts/order as before.
