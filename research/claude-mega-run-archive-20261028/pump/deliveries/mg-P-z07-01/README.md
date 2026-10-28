# mg-P-z07-01 (base r5-z07-03, 918 -> 919/165, +0x7e490, no losses)

Window 0x7e490 = `pub fn validate_buyback_fee_recipient_account(global,&AccountInfo recipient,is_native:bool,&Pubkey quote_mint,&Pubkey quote_token_program)->Result<()>`
at trade_v3.rs 168-190 (Source sites 172 AccountTypeNotSupported, 180 MintDoesNotMatchBondingCurve, 188 ConstraintSeeds).
Original callers: multi-hop hop body 0x5b3b0 (is_native=false) and v3 check_quote 0x7f010.

Changes (line-neutral):
1. lib.rs `Global::validate_buyback_fee_recipient(&self, buyback_fee_recipient: &Pubkey)` (was by value).
   Evidence: in 0x7e490 the original passes the `owner` local (-0x208) to 0x98438 and then the SAME slot to the ATA call;
   a by-value param forces an extra 32-byte copy (only diff of the by-value form, 3008 B vs 2944 B). The callee 0x98438
   stays byte-identical; every original caller (0x6f3e8, 0x13b9b8, 0x13f630, 0x144508) stages a key temp = `&x.key()`.
   All callers updated to `&x.key()` / `&token.owner`.
2. trade_v3.rs: new pub fn on its original lines; multi-hop calls it (is_native=false) instead of its private copy
   `preflight_buyback_recipient` (same checks; copy blanked line-for-line).
3. sell.rs legacy `buyback_fee_recipient`: `let result=global.validate_buyback_fee_recipient(&account.key());result.map(|_|account)`
   (the tail-expression form keeps the key temp alive to fn end and lost 0x6f3e8; the let form is byte-identical).
Behaviour: same checks, same order, same error codes (membership check now by reference).
