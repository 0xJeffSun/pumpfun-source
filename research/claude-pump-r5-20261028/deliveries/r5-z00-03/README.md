# r5-z00-03: + check_token_account (orig 0x160d0) byte-identical (cumulative on r5-z00-02)

Base L12 (907/165). Result 910 normalized / 165 raw, gains [0x160d0, 0x17cf0, 0x19ec8], no losses, runtime_valid, no stack warnings.

## 0x160d0 (new fn buy_v2::check_token_account, buy_v2.rs:109/116/121)
Original 0x160d0 is an outlined helper called once from each of the buy (0x13b9b8), buy_exact_quote_in (0x13f630),
sell (0x144508) handlers and from 0x7f010, args (account=&AccountInfo [accounts+0x168], authority=&AccountInfo
[accounts+0x158], mint=&Pubkey copy, token_program=&Pubkey copy). Body: owner == token_program (6010
AccountTypeNotSupported @109, with_pubkeys) -> try_borrow_data -> TokenAccount::try_deserialize_unchecked ->
token.mint == mint (6004 MintDoesNotMatchBondingCurve @116) -> token.owner == authority.key (6010 @121).
Our buy/buy_exact/sell handlers did the same three checks inline (owner check, check_token(), a second
borrow+deserialize for the owner check); they now call
`check_token_account(&a.associated_quote_user, a.user.as_ref(), &a.quote_mint.key(), &a.quote_token_program.key())?`
(same checks, same order, same errors; replaced 2 lines by 1 call line + 1 empty line, line-neutral).
Stack-slot detail: the deserialize input must be a named slice `let mut slice:&[u8]=&data; ...(&mut slice)`
(`&mut &data[..]`, `&mut &**data`, `as_ref()`, try_deserialize: all 0.90 with the slice at a different frame slot).
Placed inside buy_v2.rs's existing layout-pad block 91-128 (pad 38 -> 14 + fn + 5), sites on 109/116/121.
synthetic_layout = true (pad-block positioning only for this change; r5-z00-01/02 changes as described there).

## 0x17cf0, 0x19ec8 (from r5-z00-02) unchanged.
