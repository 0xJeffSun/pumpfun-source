# mg-P-z00-02: +0x1c880 mint_supply (cumulative with -01 +0x1db88), base L13 -> 964/1035, raw 165

## Change (programs/pump/src/create_v2.rs only), on top of mg-P-z00-01
- `mint_supply(&ctx, is_mayhem_mode)` (#[inline(never)], takes `&Context<CreateV2>`; LLVM ArgumentPromotion passes
  (accounts, bumps.mint_authority, flag) exactly like the original's (r2, r3, r4) and the accounts pointer is not
  noalias, so account fields are reloaded after each CPI like the original).
- Two mint_to CPIs through `#[inline(always)] fn mint_tokens<T: ToAccountInfo>(a, to: &T, global: &Account<Global>, signer)`
  (each call gets its own `&[&[b"mint-authority",&[bump]]]` literal; amount = global.token_total_supply read at the CPI),
  then the set_authority CPI written in place with `let signer = ...;` and the SetAuthority literal in the original's
  evaluation order (account_or_mint before current_authority). Behaviour unchanged: mint_to(curve ATA, supply),
  mint_to(mayhem vault, supply) if mayhem, set_authority(MintTokens, None).

## Binary evidence
- Orig loads the global and curve-ATA Box pointers at entry, rebuilds the seeds once per CPI (3x), and clones
  token_program, mint, mint_authority for SetAuthority (in that order).
- Stack layout: set_authority must be MIR-level code (an LLVM-inlined helper's allocas land first in the entry block
  and its 33-byte `None` slot is coloured with the first seeds array -> 0x28 frame shift); IR alloca-reorder test confirmed.
- Result: 0x1c880 ratio 1.0000 (4872 B); also keeps 0x1db88. No losses, raw 165, runtime_valid, no stack warnings.
