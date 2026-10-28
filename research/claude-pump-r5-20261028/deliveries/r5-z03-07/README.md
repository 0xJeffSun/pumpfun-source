# r5-z03-07 (base L12 907/165 -> 914/165), cumulative over r5-z03-06

Gains: 0x3d250, 0x414c0, 0x42618, 0x43060, 0x47e28, 0x48128, 0x48e10.
Files: programs/pump/src/migrate.rs (as -06), extend_account.rs, trade_types.rs.
New over -06: 0x3d250 fund_bonding_curve_rent.
- The original's error site is programs/pump/src/extend_account.rs:141 (AnchorError file/line in the window), so the function
  now lives in extend_account.rs (module `extend`) with the Overflow error! on line 141 (lines 71-136 are a layout-pad
  block appended after the existing content; no existing site moved). trade_types.rs keeps the path via
  `pub use crate::extend::fund_bonding_curve_rent;` on the old fn's first line, the remaining old lines blanked (line count kept).
- Body: `let native = curve.quote_mint == Pubkey::default(); let reserved = if !native { 0 } else {
  curve.real_quote_reserves.checked_add(reserved_bonding_curve_fees(curve)?).ok_or_else(|| error!(Overflow))? };`
  then Rent::get()?.minimum_balance(size), available = to_account_info().lamports().saturating_sub(reserved), and
  `if minimum > available { let lamports = minimum.saturating_sub(available); system_program::transfer(..)?; }`.
  Binding the Pubkey compare to a bool removes the lifetime.end-only else block, so the reserved=0 phi copy is emitted in
  the entry block before the branch, as in the original (`mov r8,0` at 0x3d2c8).
Behaviour identical to the previous trade_types version (same checks, same order).
