# r5-z00 PROGRESS (base L12 907/165)

Windows: 0x14910 0x160d0 0x173d8 0x17cf0 0x18678 0x19ec8 0x1ac28 0x1c880 0x1db88 0x1e7c0
Tools: bs.sh <variant> <slot> <windows..> (build var/<v> + score + win ratio); mkvar.py; deliver.sh; callers.py (orig callers of a window); callee.py.

## 0x19ec8 nested_create::ancestor  -- MATCHED (r5-z00-01, 908/165)
- a1 inline tail `try_deserialize(..).map_err(|_|error!(..))` in ancestor: 0.9902, len equal, only lines differ.
- a2 `let c=...map_err()?;Ok(c)`: 0.8896 (2728B). a3 match Err-first: 0.9044 (2664B).
- b1 = a1 + ancestor moved after walk with sites at 437/442/449; walk pad 30->44: +0x19ec8, no losses.

## 0x17cf0 quote_control -- MATCHED (r5-z00-02, 909/165)
- Original: outlined fn called once from create handler with remaining_accounts.get(3); errors 6063@345, 6075@348/353 (with_pubkeys).
- q1 ok_or_else(|| error!())? : MATCH. q3 match/return err!: 0.667. q4 let-else: not nearest.
- Layout: helpers root_seed/vault_amount/pool_record moved to module end (after ancestor); quote_control at 343-355.

## Original structure recovered for create_v2 (callers via callers.py)
- 0x1e7c0 create_v2 handler calls: 0x1ac28 initialize_metadata(a:&CreateV2,bump,name,symbol,uri) [lines 586/588],
  initialize_mayhem(&ctx) if mayhem, 0x1c880 mint_supply(a,bump,is_mayhem) [mint_to abc, set_authority, mayhem mint_to placed last],
  0x17cf0 quote_control(get(3)), control_account, 0x18678 walk(g?,remaining_accounts,..).
- 0x1ac28 calls 0x1db88 update_metadata_authority(bump:u8, &(token_program,&mint,&mint_authority)) -- 3-ref aggregate passed by pointer.
  TokenMetadata literal order in orig: name/symbol/uri clones first, then update_authority=OptionalNonZeroPubkey(mint_authority key) [0xe0], mint key [0x58], additional_metadata empty vec.
  update: clones X(token_program) x2, mint, mint_authority, mint (new_authority = mint), try_from(None) AFTER ctx build.
  Signer seeds in all three: outer slice element stored ([..]=ptr,2) => `let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]`.
- CreateV2 offsets: mint 0 (info @0x58), mint_authority 0xe0, abc 0xf0, global 0xf8, token_program 0x110.
- m1..m5: helpers written (gen_m.py / gen_m2.py). Best: update 0.587 (m3: by-ref tuple, lazy .0/.1/.2, signer-once) equal length;
  remaining diff = the try_from(None) arg temp gets its own 32B slot in ours (orig reuses it for the result) -> frame +0x20.
  mint_supply 0.17 (orig hoists box loads of global[0xf8]/abc[0xf0] to entry); init_metadata 0.17 (Rent::get err path / drop flags differ).
- 0x160d0 = check_token_account(account,authority:&AccountInfo,mint:&Pubkey,token_program:&Pubkey) buy_v2.rs 109/116/121:
  owner==token_program (AccountTypeNotSupported), try_borrow_data, TokenAccount::try_deserialize_unchecked, mint (MintDoesNotMatchBondingCurve), owner==authority.key (AccountTypeNotSupported).
  Called by buy/buy_exact/sell handlers with (&a.associated_quote_user, user, &quote_mint.key(), &quote_token_program.key()) and by 0x7f010. patch_k.py.
- 0x173d8 = buy_exact_quote_in_handler closure @ buy_v2.rs:949: (env=&Option<TransferFeeCfg>, amount, a, b) -> Result<(u64,u64)>:
  gross=pre_fee(env,amount)? [callee 0x95360 = util/transfer_fee.rs:66 fn, unmatched]; total=gross+a+b checked (Overflow@949); Ok((gross,total)).
  Called 3x by orig buy_exact_quote_in 0x13f630 in a loop vs max quote (TooMuchSolRequired@967). Our handler has different structure -> needs handler rewrite.

## 0x160d0 check_token_account -- MATCHED (r5-z00-03, 910/165)
- d0 `&mut &data[..]` / try_deserialize / `&mut &**data`: 0.9009 (slice temp slot differs). d1 named slice `let mut slice:&[u8]=&data`: MATCH.
  d2 as_ref 0.89, d4 block-scoped borrow 0.74.

## create_v2 helpers continued
- m6 u1 (let ctx; call(ctx,None.try_into()?)) 0.514; m7 u2 (let ctx; let new_authority) 0.11; m8 u3 (OptionalNonZeroPubkey::try_from(None)? inline) 0.587 (= u0).
- m10 u7 `match None.try_into(){Ok(v)=>v,Err(e)=>return Err(e.into())}` (signer seeds, by-ref tuple): 0.9413, 3024B (orig 3128):
  frame top now equal (227 equal insns); remaining = orig has the `?` residual copies (Ok payload copied twice, Err copied
  unaligned) AND the None-arg slot reused for the final arg (-0x28). `?` forms keep a separate None slot (+0x20 frame).
- mint_supply: n0/n1(global/abc deref locals)/n2(supply local) x seeds inline/signer/old: 0.08-0.18. Orig: each CPI builds its own
  inline `&[&[b"mint-authority",&[bump]]]`; box ptrs of global(0xf8) and abc(0xf0) loaded at entry; mayhem mint_to block placed last.
- init_metadata: literal order name/symbol/uri first fixes key-load order (0.16-0.18); clone slots/frame still differ.
- x1/x2 multi-variant (3 copies called in sequence) is NOT reliable for create_v2 helpers: copies shrank to ~2300B
  (shared private callees lose single-call inlining bonus). It worked for check_token_account (library callees only).
- admit (0x14910) with named slice deserialize: ratio unchanged 0.2971.
- y1 u10 `{None.try_into()?}` 0.587; y2 u11 `{let v=None.try_into()?;v}` 0.589 (3104B); y3 u7+inline seeds 0.446;
  y4 u6 `let none:Option<Pubkey>=None;` at fn top: 0.6385 (3128B, None stored at entry, frame +0x18);
  y5 u15 block-local none: 0.600; y6 identity(None): 0.587.
  Diagnosis: orig's None arg slot (-0x28) is stack-colored with the final OptionalNonZeroPubkey arg; ours keeps a separate slot.
  Best body so far: m10/u7 (match, 0.9413 but 3024B because no `?` residual copies). Not solved.

## STATUS SUMMARY (end of round 5 session)
MATCHED (delivered r5-z00-03 = 910/165): 0x19ec8 ancestor, 0x17cf0 quote_control, 0x160d0 check_token_account.
REMAINING:
- 0x1db88 update_metadata_authority: helper recovered (gen_m2.py u-variants), best 0.94 (u7) / 0.64 (y4) - None-temp slot coloring.
- 0x1c880 mint_supply: recovered semantics (mint abc, mayhem mint placed last, set_authority; per-CPI inline seeds; box ptrs
  of global/abc loaded at entry before seeds); best 0.18. Not solved.
- 0x1ac28 initialize_metadata: recovered (586/588 sites placed); best 0.18. Clone slot assignment / Rent::get error tail-dup differ.
  NOTE: the helper split (gen_m2.py/gen_x.py) is NOT in the delivered src; regenerate from gen_m2.py make(...) on src.
- 0x1e7c0 create_v2 handler: inlines helper @198-258 (NotEnoughRemainingAccounts/InvalidQuoteTokenProgram/UnsupportedQuoteMint
  quote validation) and @541-553 (Name/Symbol/UriTooLong) + own body 709-778; needs file-wide relayout + the three helpers above.
- 0x18678 walk: orig calls OUTLINED pump_quote.rs fns 0x60a80(61/62), 0x63940(241), 0x60ee0(90), 0x65eb0; ours inlines (10688B vs 5704B).
  Needs pump_quote.rs restructuring (coordinate with pump_quote owners).
- 0x14910 admit_associated_token_account: 0.297, same structure/sites, diffs = register alloc + frame slots (authority key copy
  slot -0x1f0 vs -0x208, error temp area offsets); named-slice deserialize made no change.
- 0x173d8 buy_exact_quote_in closure @949: needs buy_exact_quote_in handler loop reconstruction (pre-fee via util/transfer_fee.rs:66 fn 0x95360).
