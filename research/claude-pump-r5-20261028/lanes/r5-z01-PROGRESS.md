# r5-z01 PROGRESS (round 5, base L12 907/165)
Windows: 0x22498 0x22a10 0x298b0 0x2b490 0x2bf18 0x2d920

## Deliveries
- r5-z01-01: 908/165, gains [0x22498] (create_event builder) + collect() restructure (0x2b490 0.30->0.51, no score change)

## 0x22498 MATCHED (create_v2.rs create_event)
- ev1 plain literal: 0.45 (curve loads after Clock::get). ev3 let-bind scalars: 0.85 same len (pubkey store order). ev5 also let-bind quote_mint: 1.000.

## 0x2b490 collect (collect_creator_fee.rs:198) remaining
- original flow: require(owner!=FEES) line198; executable->msg Ok(None); creator_key copied; if quote_mint.key()!=native {borrow+TokenAccount deser amount; amount==0 msg; seeds; transfer_tokens; Some((amount,mint key))} else {Rent::get; lamports.sat_sub(min(0)); ==0 msg; rent-exempt check msg; seeds; transfer_native; Some((amount,default))}; tail-merged Ok(Some).
- cc1 (that flow, seeds hoisted before the branch): 0.51, len 2536 vs 2696. Remaining: seeds built per-branch in original (bump stored per branch), stack slot offsets.
- cc2 (common tuple return, seeds per branch): 0.556. cc3 (token-first if/else, seeds per branch, return in branches): 0.709 len 2664.
- cc6 (= cc3 with *quote_mint.key): identical to cc3.
- cc7 (NATIVE-FIRST early-return block `if key==native {..; return Ok(Some((amount,default)))}` then token path): 0.8735, 176 equal prefix.
  Remaining: (a) seeds stores order (orig stores outer &[seeds] ptr first, bump byte last) -> try inline signer-seeds expr (cc10);
  (b) return tail: orig writes pubkey via memcpy/memset to r6+0x10 (mov r1,r6; add r1,16) in each branch and SHARES the
  `[r6+8]=amount; [r6]=1` tail -> try `let (amount,mint)=if native{..}else{..}; Ok(Some((amount,mint)))` native-first (cc9/cc11).

## 0x298b0 v1 collect_creator_fee handler (collect_creator_fee.rs:103) remaining
- v1a: moved handler into collect_creator_fee.rs (require at line 103; lib.rs program fn = 1-line forwarder + blank lines, line-neutral);
  __global stays matched. Ratio 0.4847 (same as before), len 4240 vs 4152.
- v1b (if !exec {body} else {msg}), v1c (match on bool), v1d (#[cold] inline(always) msg helper): byte-identical to v1a.
  v1e (#[cold] inline(never) helper): worse 0.355.
- Remaining: orig exec check `jne -> msg` (msg block out of line, Rent::get fallthrough); ours falls into msg. Frame: orig error
  temps near r10 (-0xe0 name), ours far (-0x248).

## 0x2bf18 get_token_distribution_amounts (distribute_creator_fee_v2.rs 101,112,125,149,152,163,168,173)
- Original = loop calling an INLINED validation helper (lines 101 address, 112 ata, 125 executable err!) defined above the
  loop fn (149/152 get() NotEnoughRemainingAccounts, 163 InvalidShareBps, 168 Overflow, 173 Uninitialized).
- d1 helper #[inline(always)]: 0.436. d2 helper #[inline]: 0.629 (6568 vs 6664). In orig the quote_mint AccountInfo clone is
  dropped right after the helper's `?` (Ok path) -> clone is a call-argument temporary in the caller: d5/d6 pass
  `&quote_mint.to_account_info()` (pending).
- execute_v2 (0x2d920) requires moved to lines 205/213 in the same restructure (layout script mkdist.py).

## Update (after r5-z01-02)
- 0x2b490 MATCHED via cc10 (native-first early return + inline signer seeds). Delivered r5-z01-02 (909).
- 0x2bf18: d7/d8 (helper takes `mint:&Pubkey` + AccountInfo/owner; call `validate(..,&quote_mint.key(),&quote_mint.to_account_info())?`)
  -> 0.8897 SAME LENGTH 6664. Remaining = pure block placement: original loop top = latch (div/store) and the push
  cap-check/grow_one block sits in the middle after the uninit check; ours rotates the cap-check+grow_one block to the loop top
  (MachineBlockPlacement findBestLoopTop rotates one step further), which also reorders the cold error blocks
  (orig ...152,163,168,unwrap,149,173 vs ours ...152,163,unwrap,149,168,173).
  Tried (all identical binary or worse): d9 `if needs_init {require!(initialize_ata)}`, d10 `require!(initialize_ata||!needs)`,
  d11 `if needs&&!init {return err!}`, d18 helper without #[inline], d25 helper as a closure inside the fn (all == d7);
  d13 `match checked_mul {None=>return err!}` 0.738 (worse); d1/d6 #[inline(always)] helper 0.44/0.64 (worse).
- 0x298b0: v1g (inline seeds in the call + emit!(event) without clone) 0.61 len 4160; v1h (let signer_seeds: &[&[&[u8]]] =
  &[&[..,&[bump]]] before the call) structure equal incl. seeds-before-clones but frame 0x48 larger (0.49);
  v1i (let bump) 0.48. Frame analysis: original's biggest shared slot (CpiContext 0xb8 = transfer ctx / AnchorError / Rent /
  Clock) sits at -0xb8 (FIRST frame object) while ours sits at -0x218 => in the original the CpiContext alloca is created before
  the require temporaries => transfer probably in an INLINED helper (callee allocas go to the caller entry first). Testing v1j/v1k.
