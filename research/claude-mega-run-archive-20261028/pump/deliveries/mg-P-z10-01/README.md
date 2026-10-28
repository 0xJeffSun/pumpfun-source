# mg-P-z10-01

Base: L17 (93748494f9e7). Result: 976/1035 normalized, 165 raw; gains ['0x1557e8'], no losses, runtime_valid, no stack warnings.
synthetic_layout: true (inherited from the L17 layout composite; this delivery adds no layout pads).

L17 + 0x1557e8 admin_set_idl_authority (handler body inlined via pub(crate) execute; original seeds/transfer_with_seed tail; DISCRIMINATOR compare; explicit return Ok; RefMut bound in its own statement before try_serialize -> authority copy order)

## Changes (src/admin_set_idl_authority.rs only; line-neutral, no Source site moved)
1. `pub(crate) fn execute` (was `pub fn`): the original inlines the per-file body into the lib.rs handler
   `pump_recovered::admin_set_idl_authority` (window position + frame match) - r5-z10 i02.
2. System-owned branch: seeds `&[&[&[],&[bump]]]` (2 seeds, first empty), TransferWithSeed literal inline in
   CpiContext::new_with_signer, and `return transfer_with_seed(...)` without `?` (r5-z10 i01).
3. Line 90 discriminator check `==*anchor_lang::idl::IdlAccount::DISCRIMINATOR` (single 50/50 branch -> cold error
   site, `ToString::to_string` stays out of line like the original) (r5-z10 i04).
4. Line 95 explicit `return Ok(());` after emit_cpi! (removes the hoisted sret reload; r5-z10 i18).
5. NEW (this lane): line 94 `{let mut data=account.data.borrow_mut();header.try_serialize(&mut &mut data[..])?;}`
   instead of `header.try_serialize(&mut &mut account.data.borrow_mut()[..])?;`.
   Evidence: the last residual was the 32-byte `header.authority=idl_authority` copy order (original stores
   descending 0x18,0x10,0x8,0x0; ours ascending). llc on the extracted post-opt IR showed the order is decided by the
   `llvm.lifetime.start` of the `&mut [u8]` writer temp that rustc places right after the memcpy (StorageLive of the
   statement's outer temps happens before the `borrow_mut()` call): with that LIFETIME_START node chained after the
   memcpy's TokenFactor the ILP scheduler emits the stores ascending; moving the lifetime.start below the borrow
   check gives byte-identical code (ratio 1.0). Binding the RefMut in a preceding statement does exactly that in
   source. Same behaviour: same borrow/panic sites, RefMut dropped right after try_serialize (block scope), same error paths.

