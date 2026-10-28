# mg-P-z05 PROGRESS (base L20 = 978/1035, raw 165)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z05/ (src/, work/, out/, tools/)
Windows: 0x58f58 (native buyback, 4872B), 0x5a260 (transfer_input helper, 4432B), 0x5b3b0 (hop body 18584B), 0x62aa0 (pump_quote convert, 2704B)
Prior notes: claude-pump-work/lanes/r5-z05/PROGRESS.md (mh2/mh3/g3-g6 experiments)

## Log
- setup: src = cp -c -R base/L20/pump; baseline build running.
- 02:47 rebased to L21 (979, faac97bf) per TASK.md update; src = L21 + my wins.
- 02:50 DELIVERED mg-P-z05-01 (980): 0x62aa0 convert: `if output > rt as u128 {..} else {Ok(output)}` (IR proof: the early
  `return Ok(output)` block sat between the :199 checked_sub test and its targets; moving it -> match; tools/mvblk.py+irname.py+llv.py).
- 03:10 DELIVERED mg-P-z05-02 (981, cumulative): 0x58f58 native buyback (gen/nb3.py variant S2+np+tv): by-value spl_token::id(),
  `invoke(&sync_native(..)?, &[to])?` one statement, EVENT_IX_TAG_LE.to_vec(). Dead ends: pre-bound ix/infos/seeds (0.20-0.48),
  helper fns for the self-CPI / sync (0.43-0.74). IR alloca permutation (tools/allocperm.py) reached 0.9915 first.
- Tools (lanes/mg-P-z05/tools): nb.sh (build+score one variant dir), batch.sh (parallel builds over work..work6 + ratio),
  rat.sh, callees.py (orig window callees), ccalls.py (candidate callees), fr.py (stack offsets), deliver.py, nirbuild.py (IR/MIR via
  IRWRAP_EXTRA='--emit=llvm-ir,mir'), llv.py/xfn.py/irname.py/mvblk.py/allocperm.py/frame.py (IR loop, ~0.1 s per llc).
- NEXT: 0x5a260 (transfer_input, 2x anchor_spl::token_2022::transfer_checked + 1 memcmp), then the hop body 0x5b3b0.
- 03:3x DELIVERED mg-P-z05-03 (982, cumulative): 0x5a260 transfer_input (gen/ti2.py variant ia+si+gen): match None/Some each
  calling #[inline(always)] transfer_tokens(program, from:&impl ToAccountInfo, to, authority:&impl ToAccountInfo, mint, amount,
  decimals, seeds) {if amount==0 return; anchor transfer_checked(new_with_signer(..))}. Path: inline arms 0.26-0.33 (Some memcmp
  block placed after None's first test; IR move of that block -> 0.48 proved block order) -> helper 0.67 -> si 0.71 -> generic 1.0.
- Remaining: 0x5b3b0 (hop body, 18584 B) — needs the hop body split out of execute (handler 0x567d8 not mine).
- 03:40 REBASED lane src onto L27 (986; contains my -01/-02): src = L27 + -03's multi_hop_curve_swap.rs -> 987 (v/r27), deliver.py now L27.
- 0x5b3b0 hop body: interface decoded (see INSIGHTS 0x567d8/0x5b3b0 note): hop(a, event_bump, h:&mut CurveHop, curve_bump,
  &current_mint, amount, previous:Option<&PreviousHop>, last, flag) -> Result<HopOutput{mint,amount,buyback_fee,vault:AccountInfo}>.
  gen/split2.py (on L27+-03) = v/sp2: nested #[inline(never)] swap_hop, no losses (987); swap_hop 28016 B vs 18584 B, ratio 0.099.
  The original hop body is a DIFFERENT algorithm shape: it calls get_fees (fee_math 0x89ec8), net_quote_for_budget (0x806c8), sub3,
  tokens_for_quote (0xa0838), sell_quote, post_fee_amount, apply_buy/apply_sell, accrue_fees x2, 0x57e40 (exact-quote prep), 0x8bbd0
  (TradeEvent builder?), anchor emit!/emit_cpi! (Event::data, sol_log_data, from_iter, exchange_malloc, new_with_bytes, invoke_signed)
  for Trade/Complete/PostCompleteBuy events, transfer_input x2 / transfer_quote_out / transfer_base_out / transfer_buyback_out,
  quote_payments/user_quote_payments::transfer_native, native_buyback. Ours uses home-made select_fees/buy_budget/add/sub/div/n +
  route_event. Full call skeleton with arg sources: llx/hop_callargs.txt (tools/callargs.py on llx/hop_orig.s). Needs a rewrite of the
  hop algorithm with these helpers (multi-hour; not attempted beyond the split).
- 0x567d8 handler (z04's, blocked on split; CLAIM then PARK in INSIGHTS): gen/hdl.py on v/sp2 re-lays execute to lines 200-263
  (sites 208/214/214/262, closure 259), helpers 192-245 moved to file end, hop fn module-level at 264. Best v/hd_sl_fa 0.349
  (requires part call-slot identical; residual loop block layout). Not delivered (no gain).
## Final state (04:4x)
- Delivered: mg-P-z05-01 (+0x62aa0), -02 (+0x58f58), -03 (+0x5a260) — all on L21; -01/-02 already composed into L23/L26.
- Best partial trees: v/sp2 (split), v/hd_sl_fa (handler re-layout); IR: llx/hdn.ll (handler), llx/hop_orig.s (orig hop body dis).
