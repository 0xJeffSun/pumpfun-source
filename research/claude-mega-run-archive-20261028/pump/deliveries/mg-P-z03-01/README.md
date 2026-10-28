# mg-P-z03-01 (base L15, 972 -> 973/165, +0x45fa0, no losses, runtime_valid, no stack warnings)

## 0x45fa0 = migrate.rs `init_pump_amm_boost(ctx:&Context<Migrate>)` (7520 B, require at migrate.rs:527)
Binary evidence (original window): call order Rent::get -> From<ProgramError> -> boost_enabled -> PumpError::name ->
Display::fmt -> unwrap_failed -> From<AnchorError> -> minimum_balance -> transfer_native -> init_boost, identical in ours;
frame: name String (-0x3b8) deeper than the Rent error copy (-0x3a0) => the require! is written BEFORE Rent::get in the
source (MIR locals in source order; reverse alloca order), while the len==2 path stays the fall-through => let-else.
Source (lines 523-531; lines 337-522 are now a layout-pad block, the require stays on its original line 527):
```rust
pub fn init_pump_amm_boost<'info>(ctx:&Context<'_,'_,'_,'info,Migrate<'info>>)->Result<()>{
 let a=&ctx.accounts;
 if a.bonding_curve.is_mayhem_mode{return Ok(());}
 let [boost,vault]=ctx.remaining_accounts else {
  require!(!native_payments::boost_enabled(&a.amm_global_config),PumpError::NotEnoughRemainingAccounts);
  return Ok(());
 };let funding=Rent::get()?.minimum_balance(165);native_payments::transfer_native(..,funding)?;
 let bump=ctx.bumps.pool_authority;let init=move |signer_seeds:&[&[&[u8]];1]|pump_amm::cpi::init_boost(CpiContext::new_with_signer(..,signer_seeds));init(&[&[b"pool-authority",a.mint.key().as_ref(),&[bump]]])
}
```
Steps (multiplex ratios): old match form 0.262 -> seeds closure (L15 create_pool pattern) 0.940 -> let-else (require first)
0.966 -> `let bump` right before the closure (orig loads the bump byte before the mint key copy) 0.9989 (only the copy's
line constant) -> placed at line 527: MATCH. Behaviour unchanged: same checks/order (mayhem early Ok, len!=2 -> require
!boost_enabled else Ok, Rent, transfer_native user->pool_authority, init_boost with the same 14 accounts and seeds).
synthetic_layout: true (L15 already carries synthetic layout; this adds one pad block 337-522).

## trade_types.rs prepare_bonding_curve (0x3cd50, not matched: 0.9245 -> 0.9937, 1 instruction)
`let funding=fund(..); if funding.is_err(){return funding;} if current_size>=166 {return funding;}
 curve.to_account_info().realloc(166,false)?; Ok(())` (same behaviour; 6 lines, line-neutral). Two separate
`return funding` make CVP put tag=2 into the 2nd phi input, so SimplifyCFG cannot merge the tests and the fund tag is
tested first as in the original. Residual: scheduling of one load after the realloc-error From call.
