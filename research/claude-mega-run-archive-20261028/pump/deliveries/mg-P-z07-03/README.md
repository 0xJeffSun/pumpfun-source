# mg-P-z07-03 (base L13, 962 -> 964/165, +0x7e490 +0x7f010, no losses; cumulative over mg-P-z07-02)

## 0x7e490 (from mg-P-z07-02)
`pub fn validate_buyback_fee_recipient_account` at trade_v3.rs 168-190; `Global::validate_buyback_fee_recipient(&self,&Pubkey)`
(by-value forced an extra 32-byte owner copy); callers pass `&x.key()`; multi-hop uses the fn (is_native=false);
legacy `buyback_fee_recipient` uses `let result=..;result.map(..)`.

## 0x7f010 v3 check_quote (callers: v3 buy 0x147ba0, buy_exact_quote 0x1489f8, sell 0x14a8a8)
Decoded from the original: `is_native` (one memcmp of curve.quote_mint vs default), `quote_mint`/`quote_token_program` key
copies, `if !is_native { admit_associated_token_account(..)?; check_token_account(..)? }`,
`validate_buyback_fee_recipient_account(&global, buyback, is_native, &mint, &program)?`, fee via util/transfer_fee
`get_transfer_fee` (0x94908) only for non-native; returns `(bool, Option<Fee>)`.
Changes:
1. buy_v2.rs: ORIGINAL SIGNATURES (from every original call site: check_quote 0x7f600/0x7f868, sweep_fees 0x73690):
   `admit_associated_token_account(account, authority, mint: Pubkey, token_program: Pubkey, mint_info, token_program_info,
   allow_create, payer, system_program)` and `check_token_account(account, authority, mint: Pubkey, token_program: Pubkey)`
   (the caller copies the key locals into fresh arg temps = by-value). All 8 + 3 call sites reordered mechanically
   (same argument expressions). 0x160d0 check_token_account stays byte-identical.
2. trade_v3.rs check_quote rewritten in the original shape (same lines 1212-1230): `let is_native=quote_is_native(&a.bonding_curve);`
   with a private helper `fn quote_is_native(curve:&BondingCurve)->bool` (the helper boundary moves the bool zext to the
   final block like the original: 0.74 -> 0.986), and the native fee as `const NO_FEE:Option<Fee>=None;` (zeroed payload words
   like the original: -> 1.000). The v3 handlers call check_quote directly (v3_quote_context wrapper removed); they map the
   Option<Fee> to their (u64,u64,u64) snapshot and derive quote_decimals as before. The buyback-recipient validation now runs
   inside check_quote (original order: before the sell handler's NotEnoughTokensToSell require_gte, checked in 0x14a8a8).
Behaviour: same checks/errors as the original check_quote; the old role-loop version also required the mint owner ==
quote_token_program (AccountOwnedByWrongProgram) which the original check_quote does not do (InterfaceAccount<Mint>
already constrains the mint's owner program).
