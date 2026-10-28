# mg-P-z10b PROGRESS (mega run, Pump main, start base L25 = 984/1035, 166 raw)
Windows: 0x14c038 (legacy buy, 10880 B), 0x14f4e0 (buy_exact_sol_in, 13224 B)
Lane dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10b (src/, work/, out/, logs/, exp/, tools/)
Base: src = cp -c -R base/L25/pump (unstripped sha256 35f2b6913dbd...). Build: ./build.sh <tag> (nbuild.py, baseline L25).
Prior decode: mega-run/lanes/mg-P-z10/PROGRESS.md (0x14c038 control flow), lanes/mg-P-z10/logs/o14c038.txt.

## Log
- 03:08 lane started; src = L25 copy; tools copied from mg-P-z10.
- 03:12 b00 = unmodified L25 build: 984/166, sha 35f2b691 (= L25). Build ~25-35 s.
- Decoded original 0x14c038 (tools/cfgsum.py = compact block skeleton; tools/cfgdiff.sh = register-normalized skeleton diff;
  tools/xref.py = original callers of a helper; tools/hunks.py = diff hunk summary, REG = register-only):
  * entry stores &fee_recipient (-0x478) and &bonding_curve (-0x470): locals bound at the top whose ADDRESS is passed later
    (&&T params): transfer_curve_tokens_ref(authority=&bonding_curve), curve payment (0x8d108 with &bonding_curve),
    protocol fee (0x8d108 with &fee_recipient). 0x8d108/0x8e908 are MergeFunctions bodies (several identical fns alias).
  * flow: prepare -> validate_fee_recipient -> buyback_fee_recipient(rem,global,1) -> 608 -> amount=partial?min(amount,rtr)
    -> 617 -> 619 -> buy_quote/629 -> trade_fees -> `global.whitelist_pda==user.key()` zero select (4 values) -> 654/664/666
    -> IN-PLACE reserve updates 674/679/684/689 -> transfer_curve_tokens_ref -> `if user.key()==global.whitelist_pda {reload x2;
    sync}` -> `if uva.user==Pubkey::default(){uva.user=user.key()}` -> `let mint=mint.key()` -> if cf!=0 {check_bonding_curve_v2
    (rem, mint BY VALUE: copy of staged mint); if is_cashback_coin {transfer_native_owned(uva.to_account_info()); 747 eager
    ok_or(error!(Overflow)); cashback=true} else {ensure_rent_exempt; transfer_native_unchecked(&creator_vault)}} ->
    curve payment (0x8d108) -> if pf!=0 {split; if bf!=0 {0x8e908(&buyback_fee_recipient)}; 0x8d108(&fee_recipient, rest)}
    -> reserves+creator read BEFORE Clock::get (one load feeds both sol and quote reserve fields => locals) -> TradeEvent
    (cashback flag from control flow, not curve.is_cashback_coin) -> emit!+emit_cpi! -> if rtr==0 {complete=true;
    CompleteEvent same timestamp}.
- ~03:25 s1: rewrite + GENERIC helpers -> lost 0x8d108/0x8e908/0x91690 (generic instances are internal => ArgPromotion
  passes the inner pointer; originals are external pub fns). Keep helpers NON-generic.
- ~03:30 s2: non-generic: transfer_native_curve(&&mut Account<BC>) new 1-line fn (MergeFunctions alias of 0x8d108),
  transfer_native_curve_unchecked(&&AccountInfo), transfer_curve_tokens_ref(&&mut Account<BC>), check_bonding_curve_v2(mint:
  Pubkey). 984/166 no losses; 0x14c038 0.214 -> 0.7084 (10920 vs 10880 B). IR loop: tools/irb.py + tools/llone.sh (0.7 s).
- ~03:38 s3: event = locals (4 reserves + creator) -> `let timestamp=Clock::get()?.unix_timestamp` -> literal with the 4 uva
  fields written FIRST; complete-event block via ctx.accounts.bonding_curve (local reload avoided) -> 0.8079 (10904 B).
- ~03:45 s7 = s3 + holder_rewards_bps/holder_rewards written BEFORE ix_name (is_holder_reward load must precede the "buy"
  heap alloc) -> 0.9407, 10888 B (1 slot over), only 9 hunks left: (a) transfer_curve_tokens_ref arg setup order (orig
  computes r2-r4 adds first, decimals load last => decimals after the seeds in IR: e2 IR proof), (b) check_bonding_curve_v2
  arg copied from the staged mint (orig) vs re-read from the key (ours: MemCpyOpt forwarded), (c) cashback path: orig loads
  system_program AFTER the uva clone; `let uva=...to_account_info()` (s4/s6) fixes order but adds a 48-B slot (frame -0x30).
- ~03:53 s8 = s7 + cashback clone via `#[inline(always)] fn pay_owned(to:AccountInfo,sys,user,amount)` (clone evaluated
  before system_program.as_ref(), no frame growth; a `let` clone (s4/s6) or closure (s9) adds a 48-B slot) -> 10880 B,
  0.9615, 6 hunks. IR proof (llx/e11_before_prepare, o1/o2/o4/o6, d3): byte MATCH with 3 IR edits: (F1) GEPs of
  associated_bonding_curve/associated_user/token_program at the ENTRY (token_program after abc/au), (F2) mint.decimals
  load right before the transfer call (after the seeds), (F3) check_bonding_curve_v2 arg memcpy from %mint (not the key).
