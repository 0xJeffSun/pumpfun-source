# r5-z06-02 (base L12): +2 normalized (0x722d0, 0x746a8) -> 909 / 165 raw, no losses, runtime_valid, no stack warnings
Cumulative over r5-z06-01.

## 0x722d0 update_buyback_config (from -01)
New module src/set_reserved_fee_recipients.rs (original file per .rodata, err at line 121); `match ra.len() {0=>{},8=>{let r=[ra[0].key(),..,ra[7].key()]; global.set_buyback_fee_recipients(r)?;} _=>return err!(WrongBuybackFeeRecipientsCount)} Ok(())`.
Evidence: callees set_buyback_basis_points/set_buyback_fee_recipients, switch shape 0/8/else, frame order (array literal deeper than error temps).

## 0x746a8 admin_update_token_incentives (src/incentives.rs, no Source sites)
- `let mint = ctx.accounts.mint.key();` BEFORE `Clock::get()?` (original copies the mint key to [-0xf0] before calling Clock::get and
  passes &mint to update_schedule, then reuses it for the event).
- `return Ok(());` explicit after the trailing msg! — gives the original's single shared exit block at the function end and
  result-first error propagation (same as plain Ok(()) semantically). Without it: 3152 B, ratio 0.94; with it: byte-identical.
Behaviour unchanged.
