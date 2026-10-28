# mg-P-z01-01 (base L13 962/165 -> 963/165, +0x2d920 execute_v2, no losses)

Cumulative on L13 (lane started from r5-z01-02; its partial diffs were ported to L13 by 3-way merge).

## Changes
1. `src/creator/distribute_creator_fee_v2.rs` `execute_v2` (original 0x2d920, 8512 B) - now byte-identical (normalized):
   - native test is ONLY `let native = a.bonding_curve.quote_mint == Pubkey::default();` (original: one memcmp of
     bonding_curve.quote_mint+0x170 against a zeroed stack Pubkey; the candidate also compared against the wSOL mint).
   - native path first with early returns: `Rent::get()?`, `get_distribution_amounts(..)?` (0x311f8),
     `if available < minimum_distributable { msg!("Insufficient fees ... {} lamports ...", minimum_vault_balance);
     return Ok(event{distributed:0}) }` (event built with Clock::get, not emitted), `super::distribute_native(..)?`
     (0x33c50), event, `emit!(event); emit_cpi!(event); return Ok(event);`.
   - token path: try_borrow_data + TokenAccount::try_deserialize, `get_token_distribution_amounts(..)?` (0x2bf18),
     `distribute_tokens(..)?` (new helper = original 0x2fa60), event with quote_mint key, emit pair, `Ok(event)`.
   - multiplex test (one build): if/else form 0.9874, token-first 0.9981, inline `if quote_mint==Pubkey::default()` 0.9874,
     native-first early-return + let-bound bool = 1.000.
2. New `pub fn distribute_tokens` (same file, original 0x2fa60 = lane mg-P-z02's window; body is a first reconstruction,
   0.22): signature read from the original call at 0x2e3b0 (r2 &Account<SharingConfig>, r3/r4 &AccountInfo clones of
   creator_vault / creator_vault_quote_token_account as call-argument temporaries, stack params: system_program,
   remaining_accounts, transfers slice, creator_vault bump, payer, quote_mint.decimals, quote_mint info,
   &Interface quote_token_program (address, not loaded => pub fn, no ArgPromotion), associated_token_program) -> Result<u64>.
   Per recipient: ATA create when flagged, then collect_v2::transfer_tokens signed with
   ["creator-vault", sharing_config.key(), bump] (== bonding_curve.creator by the account constraint), checked sum.
   The `recipient` get() sits on line 340 (original sites 340/346); z02 owns the body.
3. Carried partials from r5-z01 (no score change): get_token_distribution_amounts relayout with inlined validation
   helper (0x2bf18 0.8897, same length; residual = loop-top block placement), collect_creator_fee v1 handler moved
   to creator/collect_creator_fee.rs:99-113 with an #[inline] transfer_lamports helper (0x298b0 0.9051).

## Behaviour
- execute_v2 is byte-identical to the original, so its control flow/CPI order/events equal the original's.
  Relative to the L13 candidate this restores the original native test: a wSOL-quoted curve now takes the token path
  (as in the original) instead of the lamport path.
- distribute_tokens: same CPI sequence as the previous inline loop (create ATA if needed, transfer_checked); its
  NotEnoughRemainingAccounts get() failures are unreachable after get_token_distribution_amounts' checks (149/152).
- synthetic_layout: true (L13 layout pads; distribute_tokens placed after a layout-pad block).
