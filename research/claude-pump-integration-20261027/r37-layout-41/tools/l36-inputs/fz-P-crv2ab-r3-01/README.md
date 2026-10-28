# fz-P-crv2ab-r3-01: initialize_metadata 0x1ac28 normalized-equal (L34 -> 1012/1035, raw 168, 0 losses)

Base: W/base/L34 (= L33 + fz-P-crv2a-r2-01 walk; unstripped b95631086975...). Built with mg-P-int/tools/nbuild.py
(identity recipe): ok, runtime_valid, no stack warnings; score vs L34 inventory: gains [0x1ac28], losses [], raw_losses [].
Only src/create_v2.rs changes: line 101 (call site) and lines 582-598 replaced 1:1 (line-neutral, no pad lines; 586/588
Overflow sites stay on their lines).

## Source changes
1. `initialize_metadata(ctx:&Context<CreateV2>, name, symbol, uri)`; `let a=&ctx.accounts; let bump=ctx.bumps.mint_authority;`
   (call: `initialize_metadata(&ctx,name.clone(),symbol.clone(),uri.clone())?`). ArgumentPromotion gives the original ABI
   (sret, accounts, bump, name, symbol, uri).
2. `let minimum=Rent::get()?.minimum_balance(a.mint.to_account_info().data_len().checked_add(4).ok_or_else(|| error!(Overflow))?
   .checked_add(metadata.get_packed_len()?).ok_or_else(|| error!(Overflow))?);` (Rent::get as receiver; the AccountInfo clone is a
   statement temporary dropped right after minimum_balance and on the 586/588/get_packed_len error paths, as in the original).
3. `let rent=minimum.checked_sub(a.mint.to_account_info().lamports()).unwrap_or(0);` (original computes the value eagerly).
4. `transfer_rent(a,rent)?;` private helper `fn transfer_rent(a:&CreateV2,rent:u64)->Result<()>{ if rent>0 {system_program::transfer(..)?;} Ok(()) }`.
5. `metadata_cpi(&(&a.token_program,&a.mint,&a.mint_authority),(name,symbol,uri),&[&[b"mint-authority",&[bump]]])?;` private helper
   calling `token_metadata_initialize(CpiContext::new_with_signer(accounts.0.., TokenMetadataInitialize{mint, metadata, program_id,
   update_authority, mint_authority}, signer_seeds), metadata.0, metadata.1, metadata.2)?; Ok(())` (same accounts-tuple style as the
   existing update_metadata_authority / revoke_update_authority helpers of create_v2.rs).

## Binary evidence (orig vs candidate, from the scorer and short aligned hunks)
- Orig moves the 3 param Strings into one contiguous 72-B block right after the transfer, then the seeds slice next to it, and copies
  each String again into fresh arg temps right before token_metadata_initialize => an intact (String,String,String) call-argument
  tuple of an inlined helper whose body passes metadata.0/.1/.2 (destructuring with `let (n,s,u)=metadata` SROA-splits it: -41 insns).
- AccountInfo clone order inside the CPI context: a 120-permutation multiplex of the TokenMetadataInitialize literal order; only
  mint,metadata,program_id,update_authority,mint_authority gives the original size and block layout (7256 B, 0.98).
- Branch shapes: BPF cannot analyze conditional branches, so `jle` (rent skip) and `jeq +1; ja` (transfer `?`) record the IR block
  order at ISel. llc IR proof: moving the 588 error-closure blocks after the transfer block made the fn llc-exact; source form = the
  `if rent>0` transfer inside an LLVM-inlined helper (its blocks are inserted at the call site, before the 588 error block).
Behaviour: same calls in the same order (byte-identical to the original window), same errors/checks.
