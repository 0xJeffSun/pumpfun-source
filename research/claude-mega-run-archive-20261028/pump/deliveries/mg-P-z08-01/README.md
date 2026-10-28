# mg-P-z08-01 (base L15, 972 -> 973, raw 165, 0 losses)

Gain: 0x1367c0 `pump_recovered::pump_recovered::set_params` (5624 B, normalized match).

## Changes (line-neutral; lib.rs keeps 3187 lines, every Source site on its line)
1. `src/fee_recipient.rs`: new `#[inline(never)] pub fn set_fee_recipients(ctx:&mut Context<SetParams>)->Result<[Pubkey;8]>`
   (appended after the last site). It is the original's separate helper 0x3e550 (fee_recipient.rs lines 47/60/78):
   require_gte!(remaining_accounts.len(),8) -> collect the 8 keys -> require! all non-zero (line 60) -> Rent::get ->
   rent-exempt loop with try_data_len()? and Error::from(ConstraintRentExempt).with_account_name(format!("fee_recipients[{}]")) ->
   require! sorted/unique (line 78) -> store global.fee_recipient / fee_recipients -> return the array.
   Binary evidence: original 0x3e550 call sequence = memcpy, 8x memcmp (non-zero), errors, Rent::get, 8x (lamports,
   try_data_len, is_exempt), 7x memcmp (sorted), format_inner, memcpy x2 (stores) - same order as this helper.
   (0x3e550 itself is not byte-matched yet; ported from lane r5-z08's undelivered work.)
2. `src/lib.rs` set_params (original lines 222-292): calls set_fee_recipients first; stores every group of Global fields
   right after its require (230: ivtr, irtr, ivsr, tts; 244 fee_basis_points; 250 withdraw_authority+enable_migrate;
   272 pool_migration_fee; 279 rest); `require_gte!(1000u64, ..)` (u64-typed literal => shared with_values instance);
   `require_keys_neq!(withdraw_authority, system_program::ID)`; emit!(event) without clone.
   Line 268: `u64::try_from((irtr as u128).checked_mul(ivsr as u128).and_then(move|v| v.checked_div((ivtr-irtr) as u128))
   .ok_or_else(|| error!(PumpError::Overflow))?).map_err(|_| error!(PumpError::Truncation))?`.
   The checked chain cannot fail after the line-222/228 requires (LLVM removes it and its closure; no extra code in the
   binary), but it moves the Truncation error block out of the fall-through path: with the plain `a*b/c` form rustc
   creates the closure-call block between the try_from continuation and the line-270 require, so ISel emitted
   `jgt ok; ja err` instead of the original `jle err`. Proven first on post-opt IR (llc): moving that block anywhere
   else gives a byte match. `move` on the and_then closure keeps ivtr/irtr un-captured (by-ref capture flipped the
   line-222 compare operands to `jlt r7,r9`).
   Store order: IR store order ivtr, irtr, ivsr, tts reproduces the original machine order (irtr, ivtr, tts, ivsr).
Behaviour: same checks/errors/stores/events as the original (set_params is byte-identical; the helper follows the
original call order). Build: identity recipe, runtime_valid, no stack warnings.
