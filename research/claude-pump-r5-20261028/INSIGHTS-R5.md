# Round 5 shared insights (append-only; prefix each entry with [lane] and the window address)
Base = W/base/L12 (= deliveries/integ-layout-r37-12: 907 normalized / 165 raw / 128 unmatched, layout composite on Round37).
Partition: W/targets/r5-partition.json. All windows are free (the old peer lanes are gone).

[r5-z08] 0x94e28/0x95360 (DELIVERED r5-z08-01, 909): the original links a SEPARATE helper crate right after the pump object.
  Evidence: in original.so the functions between __rust_alloc_error_handler (0x17bc38, end of pump object) and the anchor_spl
  object (drop_in_place<[AccountInfo;2]> 0x17cae8) are 0x17bc48 (mint-extension validator), 0x17c0f0 (required_quote_account_len),
  0x17c3d8/0x17c548 (native Fee::calculate_fee/calculate_pre_fee_amount), 0x17c850 (native TransferFeeConfig TLV parser,
  returns Result<Option<{older,newer}>,()> tag 0/1/2). Moving Fee+methods into a path crate (`pump-token-fee`) made the caller
  keep the 24-byte payload copy: cross-crate callees are bare declarations -> no inferred `nocapture` -> MemCpyOpt
  processImmutArgument cannot elide `memcpy(tmp,src); call f(&tmp)`. Any window whose ONLY diff is an un-elided by-ref copy
  into a call may have its callee in that crate (or another crate). Build note: fastbuild rsync excludes every Cargo.toml, so a
  nested crate needs an absolute `path =` (see deliveries/r5-z08-01 README).
[r5-libinst] 0x89b48: coordbodyB-01 (get_fees/calculate_fee_tier, util/fee.rs) was never integrated into L12; its patch applies cleanly to L12 -> 908 (+0x89b48), no losses. Delivered as r5-libinst-01. NOTE for all lanes: triage.json "nearest" for many windows is a length-neighbour only; use `win.py list` best= candidate and the original call graph (callers/callees) to identify a window - e.g. most of the r5-libinst "library" windows are actually pump helper fns (0x1a918 = create_v2 quote-mint extension check, 0x58bf0 = multi-hop ATA require_keys_eq helper, 0x7fde8 = v3 fee helper calling get_fees).
[r5-coord] 0x57c38/0x60670/0x84970/0x84b78/0x14eec8: coordinate-only `||error!(X)` closure windows need a closure INSTANCE at the original line.
  Line-neutral trick: bind the closure on the exact original line (a layout-pad blank line inside the same fn works: `let ovf=||error!(PumpError::Overflow);`)
  and pass it to `.ok_or_else(ovf)` at the real op; the closure fn body is byte-identical. If the closure exists in source but no fn is emitted,
  LLVM proved the op infallible (e.g. `real - computed.min(real)`): rewrite the operand so the edge survives (same value). +5, delivered r5-coord-01.
[r5-z06] 0x722d0 MATCHED (deliveries/r5-z06-01): update_buyback_config lives in the ORIGINAL file set_reserved_fee_recipients.rs (line 121; the candidate had no such file). Frame-order lesson: `core::array::from_fn(|i| ra[i].key())` puts the [Pubkey;8] alloca FIRST (inlined callee allocas are hoisted to the caller entry => shallowest slot); an array literal `[ra[0].key(), ..., ra[7].key()]` built after the error temps puts it deeper. If an aligned diff differs only in which local sits deeper, try literal vs from_fn / helper-vs-inline. Also `match len {0=>{},8=>{..;f()?;}_=>return err!(..)} Ok(())` vs if/require!: same code, different frame order.
[r5-z09] 0x147ba0 (v3 trade::buy handler): the original is a thin handler over helpers in trade_v3.rs: 0x7f010 check_quote->(is_sol,Option<fee>),
  0x7fde8 fees(a,quote)->{protocol_fee,creator_fee,protocol_bps,creator_bps} (tail-calls util/fee.rs 0x89ec8), 0x82128 pool-before (494-507),
  0x82af8 post-complete (518/526), 0x80df8 costs (371/375 + gross_up closure 382), 0x83c00 execute (691, closures 721/767; apply_buy FIRST,
  whitelist path = Account<TokenAccount>::reload x2 + sync_virtual_quote_reserves), 0x859b0 events. Delivered r5-z09-01: decomposition gives
  +0x82128 +0x84970 +0x84b78 +0x7890 (reload instantiation). z07/libinst: those helper windows now exist as fns in lanes/r5-z09/src/src/trade_v3.rs.
[r5-z01] 0x22498: MATCHED (deliveries/r5-z01-01). It is an outlined CreateEvent builder called from create_v2 (0x21520): private #[inline(never)] fn taking (3 Strings, creator:Pubkey, &InterfaceAccount<Mint>, &Signer, &Account<BondingCurve>, &Program<Token2022>, bool, u64)->Result<CreateEvent>; ArgumentPromotion turns the single-field refs into AccountInfo refs. Key mechanism: scalar fields loaded BEFORE Clock::get in the original => bind them with `let` before the literal; the 32-byte quote_mint copy store order only matched when it was ALSO let-bound (`let quote_mint=curve.quote_mint;`) - memcpy store order (asc/desc) in a struct literal is controlled by whether the Pubkey is a let temp or a direct field read.
[r5-z00] 0x19ec8 (nested_create::ancestor) MATCHED (delivery r5-z00-01): a `.map_err(|_| error!(..))` decode written as a separate helper fn (inlined) laid the try_borrow_data-error and Ok-memcpy blocks inline right after the check; writing the same expression directly as the TAIL expression of the caller sinks both blocks after `exit` (orig shape `jeq r1,2,+1; ja far`). `let x = ...map_err()?; Ok(x)` and `match {Err=>err!, Ok=>Ok}` were worse (0.89/0.90). Moving a fn definition later in the file (to reach original lines past a pinned site) did not perturb codegen/raw.
[r5-z05] 0x60a80/0x62170/0x63940/0x645f8/0x65238/0x65eb0: the original keeps small helpers as separate functions because they are `pub fn` in a `pub mod` (external hidden linkage => no single-caller inline bonus). Private helpers in a private mod got inlined into their only caller (t1 +2 only); making `pub mod pump_quote` + `pub fn` gave +6 at once. If an original window is a helper with a single caller and your candidate inlines it, try pub-in-pub-mod before #[inline(never)]. (deliveries/r5-z05-01, 913)
[r5-coord] 0x857a8/0x178e0: when the closure's line comes AFTER the op in source order, define a nested `#[inline(always)] fn f(a:u128)->Result<u64>{u64::try_from(a).map_err(|_|error!(PumpError::Truncation))}`
  ON that line (fn items are callable before their textual position) and call it at the op. inline(always) runs before the CGSCC inliner, so
  the map_err closure is outlined exactly like an inline one (byte-identical 520B window). A plain (non-inline) helper fn inlines the closure instead.
  Watch out: LLVM drops the edge if the narrowing is provably in range (e.g. available*10000/(10000+bps)) -> no closure emitted.
[r5-coord] behaviour lead 0x60878/0x84b78: original splits the buyback receipt as first = post_fee(total) - post_fee(post_raw) (two calls to 0x950e0,
  checked_sub, multi_hop:744 / trade_v3:767). r5-coord-02 aligned multi_hop; v3 buy/buy_exact_quote still use post_fee(buyback_fee) (differs only with
  post-complete fill + Token-2022 transfer fee).
[r5-coord] tool: lanes/r5-coord/tools/clos.py <so> lists every 520B error closure (orig vs cand) with code + file:line. Candidate has closures the
  original lacks at create_v2.rs 107/109/289, trade_v3.rs 811 (6026), 1255/1259 (6063), lib.rs 1039 (6072) -> those sites are mis-shaped/extra.
[r5-libinst] 0xd300: the out-of-line `alloc::fmt::format` (448 B) appears once the original's format! sites exist: distribute_creator_fees v1+v2 log msg!("Insufficient fees for distribution. Minimum vault balance needed: {} lamports. Use get_minimum_distributable_fee instruction to check the minimum distributable amount.", reserve+minimum) when available<minimum (candidate lacked it), and set_reserved_fee_recipients uses Error::from(ConstraintExecutable).with_account_name(format!) / with_owned_name(Error::from(ConstraintRentExempt), &format!) (candidate had them swapped + error!). Delivered r5-libinst-02 (911). Tip: tools/ro.py in lanes/r5-libinst reads &[&str] pieces from original .rodata (pointer stored as addr<<32).
[r5-libinst] 0x1a918/0x58bf0: small "require" helpers the original keeps out of line can be recreated at their exact Source line by (a) appending the fn after an end-of-file layout-pad block, or (b) a NESTED fn inside a big fn's pad block (fn items are allowed inside bodies; pass it to helpers as a fn pointer, it gets const-propagated to a direct call).
[r5-libinst] 0x7890 (InterfaceAccount<TokenAccount>::reload): ORIGINAL BEHAVIOUR MISSING IN ALL 8 TRADE HANDLERS: right after the curve token transfer, `if user.key()==global.whitelist_pda { associated_bonding_curve.reload()?; associated_user.reload()?; bonding_curve.sync_virtual_quote_reserves(abc.amount, au.amount, &curve.quote_mint)?; }` (sync = matched 0xa23f0 in mayhem_virtual_params.rs, now pub(crate)). Added only to legacy lib.rs buy in r5-libinst-03 (912, +0x7890). Handler owners (0x14c038,0x152888,0x13b9b8,0x13f630,0x144508,0x14a8a8,0x14f4e0,0x83c00) should add the same block.
[r5-libinst] LAYOUT EVIDENCE: in the original, 5 functions sit between pump's allocator shim (0x17bc38, 16 B) and anchor_spl's object (drop_in_place<[AccountInfo;2]>...): 0x17bc48 quote_extensions_supported, 0x17c0f0 required_quote_account_len, 0x17c3d8 Fee::calculate_fee, 0x17c548 Fee::calculate_pre_fee_amount, 0x17c850 transfer-fee-config TLV parser. In the candidate nothing sits there. => these live in a SEPARATE small dependency crate (no LTO => callers cannot infer nocapture => the original keeps the stack copy of Fee before calling calculate_fee/pre_fee (0x94e28/0x95360 "copy-elision" diffs) and different inlining). Testing a path-dep crate in r5-libinst (note: fastbuild's rsync excludes any nested Cargo.toml, so the crate must live outside the staged src, absolute path dep + manual Cargo.lock entry).
[r5-z07] 0x834c8: exact_input_tokens(quote_in,token_res,quote_res) at trade_v3.rs:591 MATCHED (delivery r5-z07-01). Needs `pub`:
  as a private #[inline(never)] fn with one guarded caller LLVM dropped its `quote_in==0` (checked_sub) branch (IPSCCP range).
[r5-z07] trade_v3.rs layout trick: lines 392-793 are a pad INSIDE `pub fn buy`. Moving buy's 7 header lines down to 794-800 turns
  that pad into module-level space (no site moves) so original trade_v3 helpers (lines 400-790) can be written on their own lines.
  Script: lanes/r5-z07/restruct.py (already applied in r5-z07-01).
[r5-z07] 0x85190 (buy_exact_quote closure, line 911 Truncation) proves the original v3 exact-quote handler itself keeps
  `u64::try_from(..).map_err(|_|error!(Truncation))` at 911; do not route that through a helper.
[r5-z07] 0x7b250 sync_user_volume_accumulator: original = AMM form: `let a=&mut *ctx.accounts;` before Clock::get, before/after
  around a reset helper, `if before==after { msg!("No changes in accumulator for user={}",..) } else { emit!+emit_cpi! }` -> 0.948.
[r5-z07] 0x7bfd8 volume_accumulator::update: original checks `seconds_in_a_day == 0` (raw i64) BEFORE the usize conversion.
[r5-libinst] STACK-SLOT ORDER HEURISTIC (observed on 0x48e10 burn helper): frame offsets come out in REVERSE MIR-local creation order (last-created local/temp sits closest to r10). So if the original has e.g. bump(-0xe9) > mint copy(-0x110) > seed array(-0x140) > outer slice(-0x150), the MIR order was outer, seeds, mint, bump = the inline expression `&[&[b"..", a.mint.key().as_ref(), &[bump]]]` (array temps are allocated before their element temps). A separately `let`-bound mint key lands below everything instead. Use this to choose between let-bound vs inline temporaries.
[r5-z00] 0x17cf0 MATCHED (r5-z00-02): it is an OUTLINED create_v2 helper `quote_control(Option<&AccountInfo>) -> Result<&AccountInfo>` called with `remaining_accounts.get(3)` (None -> UnsupportedQuoteMint via `ok_or_else(|| error!())?`, then PDA ["quote-control"] key + owner require_keys_eq! InvalidQuoteControl). `match {None=>return err!}` and let-else do NOT match; ok_or_else does. Generally: unmatched "body" windows called from a big unmatched handler are often small helpers the candidate inlined into the handler -- use callers/callee annotation (Source lines + error codes) to recover them as separate #[inline(never)] fns.
[r5-libinst] CONFIRMED 0x94e28 + 0x95360 (+2): moving Fee{epoch,maximum_fee,basis_points} with calculate_fee/calculate_pre_fee_amount (and the TLV parser, quote_extensions_supported) into a SEPARATE dependency crate makes pump's transfer_fee calculate_fee/pre_fee_amount keep the stack copy of the Fee (no cross-crate nocapture inference) -> both byte-match; Fee methods 0x17c3d8/0x17c548 still match in the crate. Crate: W/lanes/r5-libinst/crates/pump-token-ext-v1 (package pump-token-ext, no deps), absolute path dep in Cargo.toml + `[[package]] name="pump-token-ext" version="0.1.0"` in Cargo.lock + "pump-token-ext" in pump-recovered's dependency list. General lesson: a candidate fn whose ORIGINAL address lies between pump's allocator shim and the first anchor_spl generic is from a separate crate.
[r5-z06] 0x746a8 MATCHED (deliveries/r5-z06-02): admin_update_token_incentives = bind `let mint = ctx.accounts.mint.key()` before Clock::get()? and end with an explicit `return Ok(());` after the trailing msg!. The explicit `return Ok(())` (vs tail `Ok(())`) changed 3152B->3168B and moved the shared exit block to the function end (orig layout). Cheap knob worth trying on any handler whose diff is only "exit block placement / data-first vs result-first after a trailing msg!/emit".
[r5-z06] 0x6a1e0 control_entry: original's error-result stack slots (145->-0x148, 146->-0x128, 158->-0x138) are reproduced by making line 145 `let header = data.get(..108).ok_or_else(|| error!(InvalidQuoteControl))?;` (closure => alloca appended after inlining). Model: function's own allocas in source order shallowest-first, inlined-closure allocas appended after them. Block order still differs (orig puts 146 tail before main body).
[r5-z07] 0x7b250 MATCHED (r5-z07-02): AMM-form sync + `if before==after {msg!} else {emit!(event);emit_cpi!(event);}` (no clone: one key copy feeds both emits).
[r5-z03] 0x3fb70 migrate v1: the original is SPLIT into helpers (0x414c0 ATA create x4, 0x42618 transfer, 0x43060 fund wsol,
  0x43ea0 create_pool(ctx), 0x45fa0 boost(ctx) [require at migrate.rs:527], 0x47e28 base_token_program, 0x48128 close temp,
  0x48e10 burn LP). Restructuring migrate.rs this way gave +0x47e28 +0x48128 (deliveries r5-z03-01/02). Source generator in
  lanes/r5-z03/gen/{body.rs,expand.py}.
[r5-z03] seeds shape: helpers that build `&[&[b"pool-authority",a.mint.key().as_ref(),&[bump]]]` as an ARGUMENT of an
  #[inline(always)] inner fn reproduce the original stack layout (key -0x140, bump -0x119, slices -0x170, outer -0x180);
  let-binding the seeds (`let mint_key=..; let seeds=..`) does not.
[r5-z03] lamport moves: the original uses anchor's Lamports trait (`acc.sub_lamports(x)?; other.add_lamports(x)?`): the
  destination account is loaded only after the source borrow. A (from,to,n) helper hoists the `to` load -> mismatch.
  (0x3fb70 0.77->0.87, 0x43060 0.52->0.66).
[r5-z03] 0x3d250 fund_bonding_curve_rent lives in extend_account.rs (Overflow error! at line 141); moving it there
  (trade_types re-exports it) + `rqr.checked_add(reserved_bonding_curve_fees(curve)?)` + `let lamports=min.saturating_sub(avail)`
  gives 0.893 (remaining: LLVM tail-duplicates the Rent::get block into the else arm).
[r5-z08] 0x94908 MATCHED (r5-z08-02, 910): get_transfer_fee (util/transfer_fee.rs:31). ALL-ZERO early return: when the original
  writes every word of an enum result as 0 on an early `Ok(None)` path (stdw 0 x4) but ours stores only the tag, use a const
  item: `const NO_FEE: Option<Fee> = None; return Ok(NO_FEE);` -> rustc emits an indirect constant memcpy (payload zeroed).
  Ok(Default::default()), None.map(..), `let n=None; Ok(n)` do not. Also: per-field select (`if e>=c.newer.epoch {c.newer} else
  {c.older}` by value) gives the original's jlt-select chain; `*c.get_epoch_fee(e)` (ref select) does not.
[r5-z02] 0x311f8/0x32840/0x33c50 (v1 distribute_creator_fees): base put this code in programs/pump/src/distribution.rs, but the
  original path is programs/pump/src/creator/distribute_creator_fees.rs (len 0x34) -> `#[path="creator/distribute_creator_fees.rs"]
  pub mod distribution;` + lines via `// layout-pad`. Matched all 3 (910). Mechanisms: (a) an inlined private validate helper
  explains sites at 103/116 inside get_distribution_amounts' loop; (b) checked_mul(..).and_then(checked_add) share ONE
  ok_or_else site; (c) helper taking &Program<System> must be `pub` or ArgPromotion passes [field] instead of &field;
  (d) `x.saturating_add(y)` operand order is visible (jlt compares against the first operand).
[r5-z02] emit!(e.clone()) vs emit!(e): emit! takes a reference, so the original emits `emit!(e); emit_cpi!(e);` with no clone;
  removing the clone took set_metaplex_creator 0x3a7b8 0.62->0.998 and set_creator 0x38fc0 0.48->0.999 (with keys hoisted
  before `match &creators {Some..None}` in set). Check other emit!(x.clone()) sites in body windows.
[r5-z02] extend 0x3b8d8: `&data[..8]==[u8;8]` compiles via raw_eq to one load + switch; original keeps a memcmp chain
  (reload per compare) -> compare against `&[u8]` slices (consts) instead.
[r5-z05] u128 subtraction: the original often writes `(a as u128).checked_sub(b as u128)` (backend computes hi = neg64(borrow) even after the check: look for `mov r5,1; jlt a,b; mov r5,0; sub a,b; neg64 r5`). u64 checked_sub + `as u128` does not reproduce it. (0x61348, 0x617e8, convert 0x62aa0)
[r5-z05] Load order of two fields used in one compare came out REVERSED vs source `let` order: `let real=..; let virt=..;` produced the original's virt-then-real loads (0x617e8). Try swapping let order when only two ldxdw are swapped.
[r5-z05] 0x58668: a helper whose Source line falls inside a big fn body can be written as a nested `#[inline(never)] fn` inside that fn, placed in an existing layout-pad block (replace blank lines 1:1) - its body matched exactly. (deliveries/r5-z05-02, 916)
[r5-z03] 0x414c0 MATCHED: hand-built Instruction + `invoke_signed(&ix,&[infos..],seeds)` whose infos array is dropped BEFORE
  the Err check (drop_in_place call right after invoke_signed) = an inner fn returning ProgramResult with the invoke as its
  tail expr, and the caller doing `inner(..)?; Ok(())` (the `?` copies the ProgramError to a new temp before From). `?`
  directly on invoke_signed drops the array after the check; `.map_err(Into::into)` passes the result in place (no copy).
[r5-z03] ArgumentPromotion of ctx: a PRIVATE #[inline(never)] fn taking `&Context<X>` that reads only ctx.accounts and
  ctx.bumps.y is called as (accounts_ptr, bump) - same call shape as a pub fn(a,bump) - but the promoted accounts pointer
  has no noalias, so fields are reloaded after calls. Decide per window: 0x48e10/0x43060 want the ctx form; 0x414c0/0x48128
  want pub fn(a:&Migrate,bump,..) (they load InterfaceAccount+0x58 in the callee, i.e. no promotion at all).
[r5-z04] 0x55d30/0x4e208 (migrate_v2 CPI helpers): signer-seed STACK LAYOUT. Original order (high->low addr) bump(1B), key(32B), inner seeds [3 slices], outer slice, e.g. key -0x110 / inner -0x140 / outer -0x150 / bump -0xe9 (same as matched close_pool_authority_account 0x54f30). It is reproduced ONLY when the seeds `&[&[b"..", a.base_mint.key().as_ref(), &[bump]]]` are written as a CALL ARGUMENT of an #[inline(always)] helper (`close_token_account(a,acct,&[&[..]],tp)` pattern). `let signer_seeds=&[..]` or `let mint=key()` bindings, or seeds inline in CpiContext::new_with_signer, put the key LOWEST and cost ~5-30 pp similarity.
[r5-z04] 0x4e208: the original's helper derefs Box accounts EARLY (box ptr loaded before the amount==0 check): pass `&a.bonding_curve` / `&a.base_mint` / `&a.associated_base_bonding_curve` into an inline(always) helper typed `&Account<..>` / `&InterfaceAccount<..>` (deref-coercion load at the call) while program/`to` stay `a.x.to_account_info()` inside -> ratio 0.24 -> 0.66.
[r5-libinst] 0x7fde8 (v3 fee helper, original callers 0x147ba0/0x1489f8/0x14a8a8/0x82af8): `#[inline(never)] fn v3_fees(a:&SellV3,amount)->Result<(u64,u64,u64,u64)>{ if a.global.whitelist_pda==a.user.key(){return Ok((0,0,0,0))} let curve:&BondingCurve=&a.bonding_curve; let fee_config=a.fee_config.to_account_info(); let config_len=fee_config.data_len(); let cap=buy_fee_market_cap(curve,&a.base_mint)?; get_fees(&a.global,curve,&a.fee_config.0,config_len,cap,amount) }` reaches 0.9923 (same 1040 B; only the `add r8,8` curve-deref position differs). The AccountInfo clone must stay bound to fn end (orig drops it after get_fees). Handler lanes: original v3 buy/buy_exact_quote_in/sell all call this helper.
[r5-libinst] 0x17c850 / 0x9b148 / 0x9b430: pure block-placement mismatches (identical instructions). opt-level overrides for the helper crate (s/z/1) are wrong (lose 0x17c548); for BondingCurve, `n<41 -> Err` polarity as `if n>=41 {..} else {Err}` fixes the error-block placement but makes SimplifyCFG merge the dispatch tests (jlt/jeq pairs) - no form found that gives both.
[r5-z01] 0x2b490: MATCHED (r5-z01-02) collect() in creator/collect_creator_fee.rs:198. Two decisive knobs: (1) SOURCE ORDER of the two branches decides the frame layout (native branch written FIRST as `if key==native {...; return Ok(..)}` put the Rent temp below the error temps like the original; token-first if/else 0.71 -> native-first 0.87), even though the branch polarity/block order in the binary looked token-first; (2) signer seeds written INLINE in the call (`&[&[b"creator-vault", key.as_ref(), &[bump]]]`) instead of `let bump=[..];let seeds=..` -> outer-slice store first / bump byte last => 1.000.
[r5-z01] 0x2bf18 (distribute_creator_fee_v2.rs): validation (101/112/125) is an INLINED helper defined above the loop fn (149..173); `#[inline]` (not inline(always)) + passing the AccountInfo clone as a CALL-ARGUMENT TEMPORARY (`helper(..,&quote_mint.to_account_info())?`) moved 0.44 -> 0.73. I am re-laying distribute_creator_fee_v2.rs lines 1-215 (helper ~99-128, loop fn 144-178, execute_v2 requires at 205/213); z02's 0x2fa60 sites (340/346) stay free.
[r5-z08] 0x89258 trade_fees (util/fee.rs CPI fee helper, called by all v2/v1 handlers): 0.29 -> 0.986 by (1) building the
  CpiContext INSIDE the call args `get_fees_with_quote_mint(CpiContext::new(..), true, buy_fee_market_cap(curve,mint)?, q)?`
  (removes the 0xb8 ctx memcpy; ctx temp dropped on the market-cap error, as orig), (2) `let mut creator_fee_bps =
  fees.creator_fee_bps; if global.creator_fee_configurable && curve.creator_fee_bps > 0 { creator_fee_bps = curve.creator_fee_bps; }`
  (if/else expression and nested-if forms schedule differently), (3) explicit `return Ok((..));` at the end -> the Ok/Err
  result tag becomes a phi register (orig `mov r7,0 .. stxdw [r8],r7`) instead of two immediate stores (same knob as z06's).
[r5-z10] 0x1557e8 (admin_set_idl_authority): three reusable mechanisms (0.51 -> 0.968, 5712 vs 5704 B):
  (1) lib.rs-handler windows: the original inlines the per-file handler body into the lib.rs `pump_recovered::pump_recovered::<ix>` fn
      (window sits in lib.rs program-module order). A `pub fn execute` in the module is NOT inlined (external linkage, no last-call bonus);
      making it `pub(crate) fn` inlines it and moves the body to the lib.rs position with the right frame (ratio .87 -> .92).
  (2) Error-site `to_string` inlining is decided by BFI cold-callsite: if the require!'s error block freq < 2% of the fn entry the
      threshold drops to 45 and the original keeps `call <T as ToString>::to_string` (name() then to_string() straight into the AnchorError
      slots); otherwise Display::fmt + unwrap_failed get inlined. `slice[..8]==[u8;8]` adds a length branch (mismatch .75) -> not cold;
      `slice[..8]==*Discriminator::DISCRIMINATOR` / `==[..][..]` is a single 50/50 branch -> cold. Check with -print-bfi (below).
  (3) Seeds: the original signs program_signer with `&[&[&[],&[bump]]]` (2 seeds, first empty; dangling ptr 1 len 0 on stack) and
      returns `transfer_with_seed(CpiContext::new_with_signer(system_program, TransferWithSeed{from,base,to}, seeds), ...)` directly
      (no `?`/Ok), struct literal inline so the program clone comes first.
[r5-z10] TOOLING: llc reproduces rustc codegen exactly from the crate's post-opt IR: `~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3
  -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj x.ll` (~20 s for the whole crate). Get the IR with
  lanes/r5-z10/tools/irbuild.py (= fastbuild with RUSTC_WRAPPER lanes/r5-z10/tools/irwrap.py appending IRWRAP_EXTRA to the pump crate only;
  default --emit=llvm-ir -> <work>/target-identity/sbpf-solana-solana/release/deps/pump_recovered.ll). Useful IRWRAP_EXTRA:
  "-Cllvm-args=-print-bfi -Cllvm-args=-print-bfi-func-name=<mangled>" (block freqs at inline time, stderr in build.log),
  "-Zremark-dir=<dir> -Cremark=inline" (per-callsite Cost/Threshold YAML; 45 = cold callsite). Use a separate --work dir (proc-macro rebuild once).
  Then edit the IR (branch weights, memcpy forms) and llc to test hypotheses in seconds. NOTE: two fastbuilds must never share one --work dir.
[r5-libinst] 0x7fde8 MATCHED (r5-libinst-05): when the original keeps a `to_account_info()` clone alive until AFTER a later call (Rc drops after it, also on the `?` path), write the clone-using expressions as ARGUMENTS of that call: `get_fees(&a.global,curve,&a.fee_config.0,a.fee_config.to_account_info().data_len(),buy_fee_market_cap(curve,&a.base_mint)?,amount)` (statement temporary). A `let fee_config=..to_account_info();` binding gives the same drop point but moves an unrelated deref (`add r8,8`) -> 0.9923 only.
[r5-z05] 0x64888 block-order tricks: `require!(a || b)` with two Pubkey compares placed the error cold; `[&ID1, &ID2].iter().any(|id| x == *id)` keeps the original inline-error order AND folds to the direct ID constants (a [Pubkey;2]/contains() array materialises a 64-B rodata constant instead). For a trailing conditional check, `if cond_ok { return Ok(v) } require_eq!(...)` reproduced the original layout where `if !cond_ok { require_eq!(...) }` put the check cold. (r5-z05-04, 918)
[r5-z05] 0x64358: `data.get(offset..offset.wrapping_add(32))` == original `jgt off,-33 ; jle off+32,len` (no panic); `.and_then(|b| b.try_into().ok())` into [u8;32] gives the original Result<Pubkey> copy shape.
[r5-z09] 0x147ba0: a Pubkey copy hoisted ABOVE a branch, landing in a shared (stack-colored) temp slot, while the memcmp stays
  inside the branch, comes from passing `&a.user.key()` to an inlined helper (`fn exempt(curve,&Pubkey,global)->bool{curve.flag || *user==..}`).
  Inline `flag || a.user.key()==x` sinks the copy; eager `let x=a.user.key()==y` keeps the memcmp unconditional; a fn-scope
  `let user=a.user.key()` hoists but gets its own slot.
[r5-z02] 0x3b8d8 extend_account: the original computes the new size in an inlined helper returning Result<usize> (the line-84
  require error, the try_borrow_data error and the success all join in one `jne r2,2` before `current==new`). Writing it as a
  helper (`fn get_account_size(&AccountInfo)->Result<usize>` + `?`) also made the CpiContext AccountInfo clones and the
  error to_string inline exactly like the original (ratio 0.28->0.52). Lesson: out-of-line AccountInfo::clone /
  ToString::to_string calls in ours but inline in the original = our callsite is "cold" (BFI) -> extra branches in our CFG.
[r5-z02] 0x34558 distribute_fee_to_holders uses anchor_spl::associated_token::create, anchor_spl::token_2022::{transfer_checked,
  close_account}, migrate::transfer_native, `amounts.len().saturating_mul(2)`, `remaining_accounts.chunks(2).zip(amounts.iter())`,
  seeds bump as a temporary inside the seeds literal, source.to_account_info() cloned before `if amount != 0` (0.17 -> 0.53).
[r5-z00] 0x160d0 MATCHED (r5-z00-03): outlined buy_v2 `check_token_account(account,authority,&mint,&token_program)` (owner/mint/authority checks) used by buy/buy_exact/sell. Stack-slot lesson: `T::try_deserialize_unchecked(&mut &data[..])` puts the slice temp in a reused top slot; the original uses a NAMED slice `let mut slice:&[u8]=&data; T::try_deserialize_unchecked(&mut slice)?` (separate deeper slot). Same trick may apply to 0x14910 admit_associated_token_account (lines 81-88) and other Account deserialize sites with frame-offset-only diffs. Also: to test N body variants of a helper in ONE build, give each caller its own copy (fn_a/fn_b/fn_c) and check each with win.py show --sym.
[r5-z07] 0x7bfd8: removing `#[inline]` from volume_accumulator::time_index fixes the reset/seconds prologue (0.63->0.68, no losses);
  moving the end_time>=now volume part into a plain helper makes the "Overflowing user accumulator sol volume" panic inline
  (`jne r5,1` + call) like the original. Still unmatched: end-section block placement.
[r5-z07] 0x76a28 claim_cashback: original = Clock::get() first, Rent::get(), `min=rent.minimum_balance(uva.to_account_info().data_len())`,
  `amount=uva.get_lamports().saturating_sub(min)`, `if amount==0 {msg!("No cashback to claim");return Ok(())}`, sub/add_lamports,
  then line 252 `checked_add(amount).ok_or(error!(Overflow))?` (EAGER ok_or: error built twice + drop_in_place<Error>),
  emit!(event) without clone -> 0.766 (lanes/r5-z07/v/cb4).
[r5-z07] 0x77940 claim_cashback_v2: line 305 = `require!(quote_token_program == Tokenkeg || == Token-2022, InvalidQuoteTokenProgram)`
  inside `if !native`, plus Clock-first and the same msg!; still 0.25 (original ~1200 B larger).
[r5-z03] 0x42618 + 0x43060 MATCHED (r5-z03-06, 913): (a) an owned local (e.g. a selected token program AccountInfo) that the
  original drops INLINE on an early-return path = pass it BY VALUE into the #[inline(always)] inner fn that holds the
  `if amount==0 {return Ok(())}`; (b) `invoke(&Instruction{..}, &[infos])?` with the Instruction built inside the call args
  puts the invoke-result temp below... i.e. creates it before the ix temp = original frame order (result < ix < key staging <
  infos); a `let ix=..` first gives result above ix; (c) if the original RE-LOADS account fields after calls (no CSE), the
  accounts pointer is not noalias: use a private fn taking &Context (ArgPromotion) or drop the inner fn (inlined `a:&X` params
  regain noalias scopes).
[r5-z03] 0x45fa0 block order: `match ctx.remaining_accounts { [x, y] => {..}, _ => {..} }` (slice pattern) lays out the
  len==2 arm as fallthrough like the original; `if len==2 {..} else {..}`, `if len!=2 {..}`, `len==2 || f()` all give the
  else-arm first (identical binaries).
[r5-z04] 0x4e208 MATCHED (delivered r5-z04-01): last fix was reading `let decimals=mint.decimals;` right AFTER the `if amount==0{return Ok(())}` check inside the inline(always) helper (original loads decimals before the CpiContext clones, not as the trailing call arg).
[r5-z04] tooling: a `pub fn` in a pub module is normally `.hidden` global (no ArgumentPromotion) BUT a pub fn named like a glob-reexported/ambiguous name (`create_pool`, clashing via `pub use migrate_v2::*`) stayed LOCAL and got its `&Context` arg promoted to (accounts, bump). Renaming it (deposit_pool_liquidity) made it .hidden and kept r2=ctx like the original 0x502f0. Check binding with `llvm-objdump -t x.so | c++filt | grep name` (l + .hidden = global hidden).
[r5-z04] `let signer_seeds:&[&[&[u8]]]=&[&[b"..",a.base_mint.key().as_ref(),&[bump]]];` does NOT compile when the key temp must outlive the statement (E0716) — earlier "no symbol" results from such variants were silent build failures scored on a stale .so. Make your try script check fastbuild "ok": true before scoring.
[r5-z04] 0x4eb28 (quote funding, best 0.5745): native branch = anchor Lamports trait `a.bonding_curve.sub_lamports(amount)?; a.pool_authority_quote_account.add_lamports(amount)?;` + `invoke(&Instruction{program_id: anchor_spl::token::ID, accounts: vec![new(paqa),new_readonly(rent),new(bonding_curve)], data: TokenInstruction::SyncNative.pack()}, &[paqa,rent,curve])?` (Instruction as an inline temp, not a `let ix`: +5pp); outer `if native{..;}else{seeded(..)?;} Ok(())` (+5pp: original joins both Ok paths into one `mov r1,2` exit).
[r5-z02] 0x38fc0/0x3a7b8 MATCHED (r5-z02-02, 912): 1-insn residual "ldxdw rX,[r10-0x58] (event-authority data Rc) before vs after the
  From<ProgramError> result loads" after an emit_cpi! invoke = data-first vs result-first error phi. Fix = explicit `return Ok(());`
  right after `emit!(e); emit_cpi!(e);` INSIDE the branch that owns the event. Survey tool: in orig, list `call From<ProgramError>`
  sites followed by `ldxdw r3,[r10-0x58]` first (data-first: 0x3a710 0x3b4e8 0x75240 0x778a0 0x794b0 0x7bcf8) vs result-first.
  In sync, `if let Some(cs)=.. {..;return Ok(())} else {msg!}` fixed the order but moved the Clock temp slot (0.976);
  `match &x { Some(cs)=>{..;return Ok(());} None=>{msg!(..);} } Ok(())` matched exactly (stack colouring differs if-let vs match).
[r5-libinst] 0x80df8 (v3 buy costs helper, for z09's v3_buy_costs): decoded from the original: error sites are INLINE `ok_or_else(||error!(Overflow))` (no add/sub helper calls): line 371 = `buyback.checked_add(post_buyback)` (evaluated BEFORE add3); line 375 = ONE shared site for `add3(quote,pf,cf)?.checked_add(post_total).and_then(|t|t.checked_sub(total_buyback))` (post_total = add3(p.quote_in,p.protocol,p.creator)? or 0); then `pre_fee_amount(quote_fee, net)?` = DIRECT call to transfer_fee pre_fee_amount (0x95360, &Option<Fee>), no is_sol test; then the 382 gross.checked_sub(net) closure. buyback via v3_buyback_split (its expects are lib.rs:1936/1939 Locations in the original; Location lddw is masked). Returns (gross, total_buyback, gross-net).
[r5-libinst] 0x89ec8 get_fees: `calculate_fee_tier` must be called INSIDE the if/else arms (tail-expression if/else returning Result, one call per arm) - a `let fee_tiers=if..{&a}else{&b}; calculate_fee_tier(fee_tiers,..)` form flips the register assignment (fee_config r9 vs r7) and drops the result-slot stores; the default/WSOL/QUOTE_2 test must be a separate bool (`fn is_sol_quote(q)->bool` or `let is_sol=..;`) not an inline `||` chain in the if (block order). 0.52 -> 0.98.
[r5-z03] 0x3d250 MATCHED (fund_bonding_curve_rent, moved to extend_account.rs:141): `let native = curve.quote_mint ==
  Pubkey::default(); let reserved = if !native {0} else {..}` (or `if native {..} else {0}`). With the compare inline in the
  `if`, the zero-Pubkey temp's lifetime.end lands in the else block, so the else edge is a real block: PHI-elim splits it
  and `mov r8,0` sits in its own block + the Rent error block moves out of line. Binding the compare to a bool first makes
  the else edge empty -> `mov r8,0` in the entry block (original). General: an `if a == b` on a materialized temp (Pubkey
  default, etc.) vs `let c = a == b; if c` differ in block structure; check IR (z10 irbuild) for lifetime.end-only blocks.
[r5-z03] 0x3cd50 prepare_bonding_curve: IR shows SimplifyCFG folds `funding.is_ok() && size<166` into
  `and i1 %size_lt, %tag_eq2` (size first) -> testing `size<166 && is_ok()` and bitwise `is_ok() & (size<166)`.
[r5-z10] 0x1557e8: `emit_cpi!(event);return Ok(())` (explicit return) instead of trailing `Ok(())` removed an extra
  `ldxdw rX,[r10-sret]` the RA hoisted into the emit_cpi Ok path (+1 slot) -> original length 5704 B. llc proof: it is the invoke_signed
  Ok-edge probability (weights >= 4:1 do the same). Per window only; check where the original reloads the sret pointer (join block).
[r5-z10] 0x1557e8 (decisive negatives): `header.authority=idl_authority` 32-byte copy order (orig descending 0x18..0x0, ours ascending)
  is NOT changed by: clone/clone_from/ptr::write/new_from_array/&Pubkey param/struct-update/reassign/event-field source/borrow-scope
  variants; nor in IR by memcpy alignment, memmove, aggregate loads, alias-metadata stripping or forced block splits. Only explicit
  descending scalar i64 copies reproduce it. Window parked at 12 diff lines (6 reordered insns), lane r5-z10 src = best partial.
[r5-z08] 0x8eda0 MATCHED (r5-z08-03, 911): multi-hop last-hop SELL payout = separate fn `transfer_quote_out(&AccountInfo program,
  &UncheckedAccount from (CurveHop.associated_quote_bonding_curve), &InterfaceAccount<TokenAccount> to (destination),
  &Account<BondingCurve> authority, decimals u8, &AccountInfo mint, amount, &[&[&[u8]];1]) -> anchor_spl::token_2022::
  transfer_checked(CpiContext::new_with_signer(program.clone(), TransferChecked{from,to,authority,mint}, seeds), amount, dec)`.
  z05/multi-hop owners: the hop body 0x5b3b0 calls it once (@0x5d518) with the token program picked by quote mint owner.
  Arg types were read from the call site: inline wrapper field => &UncheckedAccount; Box field deref => &InterfaceAccount;
  [x+0]==&AccountInfo for Account<T>/Signer/UncheckedAccount/Program.
[r5-z08] 0x1367c0 set_params (0.98, not yet matched): the original (1) calls a fee_recipient.rs helper (0x3e550, lines 47/60/78)
  `fn(&mut Context<SetParams>)->Result<[Pubkey;8]>` that also stores global.fee_recipient(s); (2) stores each group of
  global fields RIGHT AFTER its require (222/228 -> 4 reserves, 242 -> fee_bps, 249 -> withdraw+enable_migrate, 270 -> pool
  fee, 278 -> rest); (3) final_real_sol_reserves = irtr*ivsr/(ivtr-irtr) (not vt*vs/(vt-rt)-vs; same value);
  (4) require_keys_neq!(withdraw_authority, system_program::ID) (rodata zero const memcmp); (5) `require_gte!(1000u64, x)`:
  an untyped `1000` in require_gte!/require_gt! makes with_values::<i32,u64> (separate, const-propagated instance) whereas the
  original passes r4=0x3e8 to the shared (u64,u64) instance; (6) emit!(event) without clone.
