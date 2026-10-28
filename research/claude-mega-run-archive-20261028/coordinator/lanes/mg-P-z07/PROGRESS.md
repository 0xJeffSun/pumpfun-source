# mg-P-z07 PROGRESS (start = deliveries/r5-z07-03 = 918/165; baseline score.json of that delivery)
Lane work root: W/lanes/mg-P-z07 (src/, v/<variant>/src, w0..w3 warm work dirs, tools/vb.sh NAME SLOT WIN..)
Windows: 0x76a28 0x77940 0x7bfd8 0x7c720 0x7e490 0x7f010 0x83088 0x837a8 0x83c00 0x859b0
Prior notes: W/lanes/r5-z07/PROGRESS.md (read).

## Log
- 01:55 set up lane dir from r5-z07-03 src; warm work dirs cloned from r5-z07.
- 02:10 p1 (multiplex 6 bodies of 0x7e490): only the form calling a `&Pubkey` membership check gives 2944 B / line-only diff.
  => ORIGINAL `Global::validate_buyback_fee_recipient(&self, &Pubkey)` (callee 0x98438 stays byte-identical; all original
  callers stage a key temp = `&x.key()`).
- 02:20 d1 (= start + &Pubkey signature + pub fn validate_buyback_fee_recipient_account at trade_v3.rs 168-190 called by
  multi-hop with is_native=false; multi-hop's private preflight copy blanked): +0x7e490 but -0x6f3e8
  (legacy_sell::buyback_fee_recipient tail `validate(&account.key()).map(|_|account)`: temp lifetime). p2 tests 4 forms.
- 0x7f010 check_quote decoded: is_native=curve.quote_mint==default; let quote_mint/program=key() (by value);
  if !native { admit(assoc_quote_bc, &curve.to_account_info(), mint, program [BY VALUE], &mint.to_account_info(),
  &program.to_account_info(), false, user, system_program)?; check_token_account(assoc_quote_user, user, mint, program
  [BY VALUE])? }; validate_buyback_fee_recipient_account(&global, buyback, is_native, &mint, &program)?;
  fee = if native {None} else {get_transfer_fee(&quote_mint.to_account_info())?}; Ok((is_native, fee)).
  => original admit param order (account,authority,mint,program,mint_info,program_info,allow_create,payer,system_program).
- 02:15 DELIVERED mg-P-z07-01 (on r5-z07-03, 919) and mg-P-z07-02 (on L13, 963/165, +0x7e490). Lane src = L13 + that diff.
  vb.sh now scores vs W/base/L13/inventory.json. Old r5 tree kept at W/lanes/mg-P-z07/src_r5.
- p2 (scaffold copies admit_o/ctac_o with by-value keys + check_quote rewrite): 0x7f010 0.739 (3536 vs 3544 B).
  Remaining: is_native bool materialized early (entry-block select) vs original recomputing (r7==0) at each use; regs.
- 02:30 p3 (L13 + real signatures: admit_associated_token_account(account,authority,mint:Pubkey,program:Pubkey,mint_info,
  program_info,allow_create,payer,system_program) and check_token_account(..,mint:Pubkey,program:Pubkey); check_quote
  rewrite returning (bool,Option<Fee>) via get_transfer_fee): 963, no losses (0x160d0 stays matched by-value).
- IR loop (tools/irbuild.py + tools/llx.sh: llc of the whole crate .ll takes ~3 s; tools/sacmp.py / odiff.py compare):
  check_quote 0.739 -> 0.986 when the is_native zext sits in the final block = source `let is_native=quote_is_native(&a.bonding_curve);`
  with a private helper `fn quote_is_native(curve:&BondingCurve)->bool{curve.quote_mint==Pubkey::default()}` (p4 cq_n).
  Remaining 2 insns: native-path None has payload words +0x18/+0x20 = 0 (IR phi 0 instead of undef => exact MATCH in llc).
  p5 tests None forms (const NO_FEE, flatten, default, helper, mut fee, nested match).
- 02:45 DELIVERED mg-P-z07-03 (L13, 964/165, +0x7e490 +0x7f010). p5 cq_1 (const NO_FEE) = exact. Lane src = d3 tree.
- c1 (b7 claim cA form ported to L13): 0x76a28 0.8666, no losses; IR saved from w2 build for the reload study.

## STOP decision (~02:50, ~1.5h in)
DELIVERED (both composed into live base L18): mg-P-z07-01 (r5-z07-03+0x7e490, 919), mg-P-z07-02 (L13+0x7e490, 963),
mg-P-z07-03 (L13+0x7e490+0x7f010, 964). All verified: sha/score match, runtime_valid, 0 losses, 0 raw losses.
Lane src = d3 tree (L13 + both wins). Best partials in v/.

Remaining 8 windows triaged as NOT worth more of the shared budget:
- 0x76a28 claim_cashback: best 0.8666 (v/c1, b7 cA form ported to L13). Wall = backend scheduling only (byte order of the
  two adjacent bool loads [r2+0x28]/[r2+0x29] into swapped r8/r9; spill-slot pair -0x2a0/-0x2a8 swapped; cache-vs-reload of
  the info ptr). cb1-cb8/cb(borrow forms) all stuck here in round 1-2; not source-controllable.
- 0x7bfd8 update: 0.628 (0.68 with time_index non-#[inline] + raw seconds==0). Wall = reset-block store sinking +
  end-section placement; k1-k7/u1 exhausted it last round.
- 0x7c720 update_schedule: 0.36. Needs full volume_accumulator.rs re-layout (supply helper lines ~290-340 inlined into it);
  large (6312 B), not attempted.
- 0x77940 claim_v2: 0.27, ~1200 B of logic beyond the base candidate (data_is_empty path, line-305 program require); full re-derive.
- 0x83088/0x837a8/0x83c00/0x859b0 v3 buy/exact-quote family: need the exact-quote/buy HANDLER decomposition (0x1489f8/
  0x147ba0, z09) + fee helpers 0x80df8/0x806c8 (mg-P-lib, 0x806c8 already in L15). ABI of 0x83088 (9-arg) and 0x837a8
  callee list decoded in INSIGHTS-R5.md for those owners. Not duplicating their big handler work per coordination rules.

Most promising next idea: once z09 lands the v3 buy_exact_quote handler decomposition and mg-P-lib lands 0x80df8, the two
small equal-length windows 0x83088 (1088 B) and 0x837a8 (1112 B) become writable as standalone #[inline(never)] fns on their
trade_v3 lines using the decoded ABIs above (0x806c8/0x80df8/exact_input_tokens are all masked calls).
