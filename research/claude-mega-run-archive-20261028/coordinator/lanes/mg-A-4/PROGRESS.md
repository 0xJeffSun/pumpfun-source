# mg-A-4 progress (AMM multi-hop: 0x3dbc0 execute 9536B, 0x40a08 amm_hop 15512B, 0x44ab0 apply_hop_fees 536B, 0x45940 curve fn 16912B)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-4: src/ = union-744n + my multi_hop_swap.rs (src733/ = old 733 tree). Tools in $L/tools:
ev.py (event stream: calls/err lines/closures; `ev.py cmp SO ORIGADDR NAME`), hunks.py (normalized diff hunk summary), seg.py (compact
disassembly segment with names/jump targets: `seg.py orig 0xFN START END` / `seg.py cand SO NAME START END`), funcs.py, cmprows.py, errs.py.
## Wins
- 01 (733 base): +0x44ab0 gate_fees port -> 729 native. 02 (733): + collect-C multi_hop_swap merge -> 733 (+0x40100 0x40308 0x452e0 0xb92c8).
- 03 (union-744n base): port of 02 -> 748/150 native, 0 losses (wins/mg-A-4-03.patch). Measure with matched-union-744n.json.
## Orig design decoded (for 0x3dbc0/0x40a08/0x45940; all three need a rewrite, current ratio ~0.15)
- execute: program fn body; ctx by ptr. Loop1 (chunks(5)): buy = cur_mint==grp[1] (memcmp), next mint if-chain (Disc@251), Option<bool>
  None=2, MixedDirection@295, push output mint; keys_eq@300; ok_or_else@307. Loop2 state enum at -0x208: tag0=User, tag1=Pool(Box<AmmHop>, u8 flag @+1, box @+8),
  tag2=Curve. current_mint reinit to user_in.mint (-0x190). Index math saturating (__multi3). Curve run: j=i+1, while j<n && is_curve_hop(..)? j=j.saturating_add(1);
  hops=&rem[i*5..j*5]; flags=(i..j).map(|k| protocol|(creator<<1)).collect() [0xfb08 = this from_iter, mg-A-1 window]; mint=output_mints[j.saturating_sub(1)];
  dest = j==n ? user_out.to_account_info() : vault_for_mint(&rem[j*5..j*5+5],&mint)?; amount=curve(&ctx->(accounts,bumps.global_config), hops, flags(by val), amount,
  &mut state, dest(by val), buy)?; state=Curve. AMM: try_accounts; gates i24 = {protocol: buy?first:last, b1=b2: buy?last:first};
  (out,flag)=amm_hop(&ctx->(accounts,bumps.event_authority), &mut hop, &mint, amount, &mut state, last, minimum, gates)?; hop.exit; state=Pool(Box::new(hop),flag); mint=output_mints[i]; i+=1.
  End: require_gte@389.
- amm_hop: buy = *input_mint==quote_mint.key(); if buy {require DisabledBuy@469} else {DisabledSell@474}; trade_v2.rs helper inlined:
  find_program_address([b"pool-authority", pool.base_mint]) OnlyPumpPools@119, `gates.b1 && is_cashback` CashbackCoinNotSupported@120, mayhem@124;
  prepare_pool; program_for x2; if gates.protocol validate_buyback_token_account; user in (state==User: user_in.key/amount else 0) / out (last: key + token_amount);
  input transfer: User -> utils::token::transfer_checked(..,&a.user.to_account_info(), amount, &[]); Pool(prev,f) -> src=f?prev.base_vault:prev.quote_vault,
  if src.key()!=vault.key() transfer_from_pool; Curve -> none. reload x2; quote_fee=from_mint(quote_mint info); buy: received=amount_after_fee, quote-=received closure@579;
  sell: base-=amount closure@586; quote_reserves; HopFeeContext; buy: apply_hop_fees(received), trade_v2::estimate_buy_quote (0x50f00, mg-A-6), curve=received-l-p-c @636,
  base_for_quote, require_gt!(base_out,0) ZeroBase@642, require base_reserve>=out TooLittle@643, last: transfer_from_pool, accrue_hop_fees, @671 amount-received,
  create_buy_event(ctx{..}, &BuyResult{..}, amount, last?min:0, amount, curve, out_bal, in_bal, b, rawq, old_virtual, buyback_received, "multi_hop_swap"), emit!+emit_cpi!.
  sell: quote_for_sell, apply_hop_fees, calculate_sell_quote, require_gt!(total,0) ZeroQuote@712, after=amount_after_fee, @718 total-after, ... create_sell_event, emit+emit_cpi.
- curve fn: args (a, gc_bump, hops, flags Vec, amount, &mut state, destination, buy). native check: buy ? hops[..5][1] : hops[len.sat_sub(5)..][1] == native mint;
  match state {User=>(user_in, user), Pool(h,f)=>(f?h.base_vault:h.quote_vault, h.pool), _=>err AccountTypeNotSupported@838}; ... CPI; checks @928/929/936/941.

## Update 02:3x (after union-744n rebase)
- DELIVERED win: mg-A-4-03.patch = 748/785 native, 150 raw, 0 losses on union-744n (gains 0x40100 0x40308 0x452e0 0xb92c8). Lane src/ currently == this (win03: collect-C multi_hop_swap.rs + 733 amm_hop closures re-laid). mh_merge1.rs is this file.
- STRUCTURAL LEAD (gen/mh_v1.rs, also needs trade_v2::validate_multi_hop_pool helper inserted at lines 117-126 of trade_v2.rs; builds clean 747/150): full rewrite in the ORIGINAL shape:
  * HopSource<'info> enum { User, Pool(Box<AmmHop>, bool /*output_is_base*/), Curve } = the caller-frame state enum at [r10-0x208] (tag0/1/2). execute threads `source: HopSource` through the loop (no source/authority/source_seeds triple).
  * amm_hop(ctx, hop, input_mint:&Pubkey, amount, source:&HopSource, last, minimum, gates) -> Result<(u64, bool)>; buy = *input_mint==quote_mint; pool checks via trade_v2::validate_multi_hop_pool (OnlyPumpPools@119/Cashback@120/Mayhem@124 lines still need tuning); input transfer branches on HopSource; buy/sell arms build BuyResult/create_buy_event + create_sell_event, emit!+emit_cpi!.
  * curve_run(ctx, hops, flags, amount, source:&HopSource, destination, buy) -> matches state enum for (source, authority, pool); per-CPI-arm `.get()`; checks @928/929/936/941.
  Ratios vs orig normalized: 0x3dbc0 0.332 (was 0.175), 0x40a08 0.118, 0x45940 0.177. It inlines the line-307 `ok_or_else(NotEnoughRemainingAccounts)` closure so loses 0x40100 (-> 747). Not delivered (net -1 vs win03).
- NEXT (most promising): continue on gen/mh_v1.rs. (1) Force the execute line-307 closure out-of-line to recover 0x40100 (collect-C/orig keep it as a 520B fn at 0x40100; tried `match` and `if let` prologue, both inline it - try a #[inline(never)] helper fn `fn require_direction(d: Option<bool>) -> Result<bool>` or an explicit closure binding). (2) Then grind execute (0x3dbc0) toward a match: the orig loop-2 uses the state enum with __multi3 saturating index math and reinitialises current_mint to user_in.mint at the Pool arm; v1 already 0.33, remaining diff is mostly stack-slot/field order in the enum store/load + the hop_output_mints bounds-check layout. Tools: tools/ev.py cmp / tools/hunks.py / tools/seg.py (all take `orig 0xFN START END` or `cand SO NAME START END`).

## Update 02:5x (union-750n rebase; execute 0.175 -> 0.57)
- Rebased lane onto union-750n. Lane src/ now = v1x (the structural rewrite), measure 750/785 native, 150 raw, ZERO losses
  = SAME window set as u750 (so NOT a deliverable win; it is the continuation base). Saved: best-v1x/ (lib.rs + multi_hop_swap.rs
  + trade_v2.rs + v1x-vs-u750.patch + v1x.so + README.txt). All 5 earlier wins are already in union-750.
- KEY UNBLOCK: the orig keeps `execute` as a standalone .text fn (the #[program] handler calls it; it is not inlined). To stop
  LLVM inlining execute into the __global fn, export it: lib.rs line 26 `pub use instructions::{..., swap::{multi_hop_swap::execute
  as multi_hop_swap_execute, trade_v2}}`. That + `chunks_exact(5)` (orig iterates exact 5-chunks; keeps the None branch live so the
  line-307 ok_or_else closure stays out-of-line = 0x40100 kept) + allocating `output_mints` BEFORE reading user_in mint = execute
  normalized ratio 0.175 -> 0.57 (638/1145 insns equal, cand 1092B vs orig 1145B).
- Remaining execute diffs (tools: ev.py cmp / hunks.py / seg.py / coldcheck.sh): error-block ORDER is already ~aligned (only the
  L307 vs L300 cold blocks are swapped: orig emits L307 before L300). The 43% gap is HOT path:
  (1) flags map: orig builds the fee-flag byte with a packed constant `mov64 r5,0x10100; ...; or64 r5,r1` (LLVM combines the two
      bool->byte conversions); my `(protocol as u8)|((creator as u8)<<1)` compiles to shifts. Need the source form that yields the
      0x10100 packing (this also governs the separate 0xfb08 from_iter window, mg-A-1).
  (2) the `reallocs` BTreeSet drop_in_place is placed mid-loop in cand but elsewhere in orig (orig uses `let mut reallocs =
      BTreeSet::new()` only inside the AMM arm; try scoping it to the else-branch so its drop lands at the arm end).
  (3) a few stack-slot orderings in the Pool/Curve state store/load.
- amm_hop (0.12) and curve (0.18) barely started; same enum shape is right but need their own hot-path grinds.
- NEXT: finish execute to 1.0 (a real win: 0x3dbc0) via (1)+(2)+(3); start from best-v1x via gen/apply_v1.sh. Then amm_hop, then curve.
