# mg-P-cto PROGRESS (mega run, main Pump, window 0x22a10 admin_cto::execute, 27400 B)
Start: base L19 (977/1035, 165 raw; unstripped sha 1bf472c7...). Work dir: claude-pump-work/lanes/mg-P-cto (src/, work/, out/, tools/).
Prior: mg-P-z01 found base admin_cto is a different, incomplete implementation (orig: token_frozen x5, name x15, memcmp x14,
create x2, invoke_signed x2, find_program_address x2, sol_log_data x2, AdminCtoEvent x2, CollectCreatorFeeEvent x2).

## Log
- 02:33 setup: src = L19/pump.
- 02:50 CORRECTION of the mg-P-z01 premise: on L19 the candidate execute (20048 B) has the SAME callee multiset as the
  original except: orig has 4 msg! (sol_log_) the cand lacks, associated_token::create x2 (cand create_idempotent x2),
  transfer_vault_tokens x1 (cand: pay_token helper), Clone::clone 33 (cand 61: orig inlines many Rc clones),
  data_is_empty 6 (cand 9), Display::fmt 9/to_string 7 (cand 5/11). PumpError::name 15/15, memcmp 14/14, token_frozen 5/5.
- Runtime oracle: full/scripts/pump_admin_cto_differential.py (363 LiteSVM cases vs evidence/original deployed.so; compares
  error/before/after/events/inner/return, NOT logs). L19 candidate: 363/363 match. Run (12 s):
  cd W/full && /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python -B scripts/pump_admin_cto_differential.py --candidate <candidate.so> --output <json>
- Tools (lanes/mg-P-cto/tools): olist.py (annotated listing: callee names, E<code>, L<line>), compact.py (collapses
  copies/error blocks, resolves jump targets to idx), rostr.py (rodata strings), tsz.py (-Zprint-type-sizes parser),
  orig.txt / orig_c.txt = original listing (do not print whole).
## Layout facts (from -Zprint-type-sizes, out/ir0/build.log)
- AdminCto: refs 0x00 authority,08 global,10 mint,18 quote_mint,20 qtp,28 atp,30 system,38 curve,40 cur_cr_qta,48 cv_qta,
  50 hcv_qta,58 pump_amm,60 amm_gc,68 pool_auth,70 pool,78 amm_ev,80 ccv_auth,88 ccv_ata,90 sharing,98 pump_fees,a0 fees_ev;
  AccountInfos 0xa8 current_creator, 0xd8 creator_vault, 0x108 holder_creator_vault, 0x138 event_authority, 0x168 program.
- AccountInfo: key 0, lamports 8, data 0x10, owner 0x18, rent_epoch 0x20, is_signer 0x28, is_writable 0x29, executable 0x2a.
- Account<BondingCurve>: info@0, curve@8: creator +8, quote_mint +0x28, creator_fee +0x78, is_mayhem +0xa2, cashback +0xa3,
  can_edit +0xa4, is_holder_reward +0xa5. Account<Global>: whitelisted_quote_mints[0] +0x3a8, max_configurable_creator_fee_bps
  +0x430, creator_fee_configurable +0x43e, is_holder_reward_enabled +0x43f. ctx.bumps.creator_vault = ctx+0x23.
## Original error sites (line: code)
284 6088 CtoNotAllowedForMayhemCoin | 289 6083 HolderRewardCreatorImmutable | 296 6084 HolderRewardDisabled |
298 6090 CtoNewCreatorNotAllowed | 306 6089 CtoNewCreatorRequired | 307 6030 CreatorShouldNotBeZero (with_pubkeys) |
312 6019 InvalidCreator | 326 6091 CreatorFeeNotConfigurableForQuote | 330 6080 CreatorFeeNotAllowedForCashbackCoin |
334 6077 CreatorFeeNotConfigurable | 338 6078 CreatorFeeBpsOutOfRange | 410 6095 CreatorFeesNotSwept | 556 6092
CtoCreatorAccountNotWritable | 648 ConstraintSeeds(2006, with_pubkeys) | 660 6093 CtoSharedVaultFrozen | 719 6093.
msg! strings: "Creator is a program; fees left in the vaults", "Creator is not a system-owned wallet; fees left in the vaults",
"Creator quote token account is frozen; fees left in the vaults", "No canonical pump pool for this mint; curve only".
## Decoded structure of the original execute (summary)
- Prologue: mint=mint.key(); holder_pda=find_program_address([b"holder-rewards",mint],ID).0; shared = curve.creator==sharing_config.key()
  && sharing_config.owner==FEES && !sharing_config.data_is_empty(); quote_locked = global_quote(curve.quote_mint by value)
  (default||native||whitelisted[0]); a 48-B struct {creator, max_fee, mayhem, holder_reward, cashback, quote_locked,
  holder_enabled, fee_configurable} is built at the frame top (inlined validation input?).
- Validation order: 284 mayhem; 289 curve.is_holder_reward && !holder; 296 holder && !curve.hr && !global.enabled;
  298 holder && new.is_some(); 306 !holder && new.is_none(); 307 require_keys_neq!(new, default); 312 new==holder_pda||new==sharing_key;
  fee Some: 326 quote_locked, 330 cashback (non-holder only), 334 !configurable, 338 !(1..=max).
- 410: prepare_bonding_curve(..) then require creator_fee==0.
- Wallet check (only when old creator != default and the old coin is not holder-reward): executable -> msg program;
  owner!=system -> msg not-system; 556 require is_writable; token_frozen(cur_cr_qta) -> msg frozen; else wallet=true.
  The 556/648/660 errors are re-tested with `jeq r7,2` => they sit inside INLINED helpers returning Result, `?` in caller.
- Holder sweep (holder && shared), helper returning Result<u64> swept: 648 require_keys_eq!(holder_creator_vault.key(),
  pda([b"creator-vault",holder_pda]), ConstraintSeeds); AMM side: if ccv_ata not empty: if token_frozen -> 660 require amount==0,
  else transfer_creator_fees_to_pump_v2 (12 inline AccountInfo clones); pump side seeds [b"creator-vault",current_creator.key(),
  [bump]]: native -> Rent::get, amount=lamports.saturating_sub(min0), if amount>0 {ensure_rent_exempt; transfer_native};
  token -> amount=token_raw_amount(cv_qta); if token_frozen(cv_qta) {719 require amount==0} else if amount>0 {ATA create
  (idempotent, CONFIRMED: original 0x17e428 calls ..._idempotent) for hcv_qta; transfer_vault_tokens}.
- Wallet collect: is_wsol=quote_mint.key()==native; ccv_empty; pump side ok = wsol || (!cv_qta empty && !frozen);
  amm side ok = !ccv_empty && !frozen(ccv_ata); ATA create for cur_cr_qta when (non-wsol) or amm side; then collect_v2::collect
  -> CollectCreatorFeeEvent (Clock, emit!, emit_cpi!); then collect_coin_creator_fee if amm side ok.
- Then pool-authority seeds; if shared: admin_cto_sharing_config(ctx, Option<Pubkey>) (tag var 3-state: 2 = skipped);
  curve update: old_creator=curve.creator copy; creator=target; old_fee=curve.creator_fee_bps; is_holder_reward; is_cashback;
  if fee {creator_fee_bps=fee}; can_edit=false. Pool: if pool.owner==AMM && !empty {admin_cto_pool(..)} else msg no-pool.
  Event reads new values BACK from the curve (creator, flags, fee bps); sharing_config_reset = tag!=2.
## 03:10 Calibration result + conclusion
- Experiment m1: added the 4 evidence-proven msg! paths (program / not-system / qta-frozen / no-pool). Build clean (no stack
  warnings), 977/165 no losses. execute grew 20048->20208 B, win.py ratio 0.0870 -> 0.0761 (WORSE). A provably-correct
  behavioral addition LOWERS the SequenceMatcher ratio => the candidate's whole-handler source form is fundamentally
  different from the original's; incremental edits do not converge and ratio is not a usable gradient here. Reverted m1;
  lane src = clean L19 baseline (best partial 0.087, runtime 363/363).
- Assessment: 0x22a10 is a 27,400 B / 378-block monolith (candidate 20048 B / 239 blocks) at 0.087. A scorer win needs a
  byte-identical whole-handler reconstruction in the ORIGINAL's exact source form AND the compiler's exact 378-block
  placement + exact Source line positions. That is all-or-nothing (one window, no sub-matches) and an order of magnitude
  larger than any matched window in this corpus (matched handlers are <~6 KB). Not achievable in this lane's build budget.
- NOT a mg-P-z01-style "incomplete candidate": runtime differential (full/scripts/pump_admin_cto_differential.py) is
  363/363 identical to the deployed original, and the callee multiset matches except: orig emits 4 msg! log lines the
  candidate omits (logs are NOT in the differential's compared keys), orig inlines pay_token's body (cand factors it),
  and Clone/to_string/data_is_empty inline counts differ.
- Recovered-but-unintegrated behavior (for the eventual full rebuild, each LOWERS similarity alone so only useful once the
  whole handler is in original form): the 4 msg! strings at the decoded positions; original inlines pay_token.
## Next idea (for a dedicated multi-build effort, not this lane)
Reconstruct execute from scratch following orig_c.txt CFG: build the 48-B by-value CtoParams snapshot {curve.creator[32],
global.max_configurable_creator_fee_bps, is_mayhem, is_holder_reward, is_cashback, quote_locked, creator_fee_configurable,
is_holder_reward_enabled} at the top and pass it by value to an inlined validate() (explains the early struct store at
[r10-0x38..-0xb]); compute `shared` and holder_pda before validation; emit the 4 msgs; inline the two create_idempotent+
transfer sequences. Then iterate block placement with the z10/z07 IR+llc loop (irbuild.py here) ONLY after the gross
structure matches. Expect many builds.
