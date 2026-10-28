# r5-z01-02: 0x22498 + 0x2b490 (cumulative)

Base L12 (907/165). Result 909 normalized / 165 raw, gains [0x22498, 0x2b490], no losses, runtime_valid, no stack warnings,
synthetic_layout false.

## Changes
1. `create_v2.rs` (0x22498, from r5-z01-01): outlined `#[inline(never)] fn create_event(...) -> Result<CreateEvent>` appended at
   file end; execute writes the curve first (line 134) then `create_event(..)?` (line 135). Scalars and quote_mint let-bound before
   `Clock::get()?`.
2. `creator/collect_creator_fee.rs` (0x2b490 `collect`, require! on line 198 via a layout-pad block after the accounts struct):
   original control flow = require(owner != FEES); executable -> msg + Ok(None); `let creator_key = creator.key();`
   NATIVE BRANCH FIRST as an early-return block (`if quote_mint.key()==native_mint::ID { Rent::get()?; amount =
   vault.lamports().saturating_sub(min_balance(0)); amount==0 -> msg; rent-exempt check -> msg; transfer_native(..);
   return Ok(Some((amount, Pubkey::default()))) }`), then the token path (borrow + TokenAccount::try_deserialize amount;
   amount==0 -> msg; transfer_tokens(..); Ok(Some((amount, quote_mint.key())))). Signer seeds written INLINE in each call:
   `&[&[b"creator-vault", creator_key.as_ref(), &[creator_vault_bump]]]`.

## Binary evidence (0x2b490)
- Callers: original collect_v2::execute (0x2a9b8, matched window) and admin_cto (0x28be8); callees transfer_tokens / transfer_native,
  TokenAccount::try_deserialize_unchecked, Rent::get, try_borrow_data, lamports/data_len/minimum_balance.
- Variant ladder (score.py ratios vs original): token-first if/else 0.709; native-first early return 0.8735 (frame: Rent temp moves
  below the error temps, matching the original's MIR order); + inline signer seeds 1.000 (outer &[seeds] store first, bump byte last).
  Native-first if/else (cc5) 0.885; tuple-returning variants 0.55.
- Behaviour: identical to base (the zero-amount message now precedes the rent-exempt check, which the base reached in the same
  cases with the same message: base's rent check was guarded by amount>0).
