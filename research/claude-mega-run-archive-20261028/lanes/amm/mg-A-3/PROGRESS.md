# mg-A-3 progress (PumpSwap AMM buy/cashback windows)
Lane dir L=/Users/shawwalters/amm100-run/lanes/mg-A-3 (src = copy of mg-base733; base so = out/base.so, base rows = out/base-rows.json)
Targets: 0x351a8 distribute_cashback (8104 B), 0x376b0 buy handler (9936 B), 0x3a5a0 buy_exact_quote_in (12936 B)
Tools: tools/sc.sh SO (shape score+ndiff for 3 targets), tools/cmp.py BASEROWS NEWROWS (norm+raw gains/losses), tools/dis2.py, tools/dd.py, tools/seq.py
## Base scores (733 base)
0x351a8 shape 305 ndiff 1510 | 0x376b0 shape 347 ndiff 1458 (cand = pump_amm_recovered::buy, generic execute inlined) | 0x3a5a0 shape 932
## Log
## 02:3x status (rebased onto u744 = mg-union/u744; old src kept in src-733)
- Composer gen/compose2.py CB BUY [EXACT]: builds buy.rs from u744 buy.rs: uses + cashback tpl (//@N anchors, //PAD) at top,
  base 108-210, dedicated buy fn tpl, then execute<EXACT> (base 348-656), helpers, BuyEvent moved to file end; patches lib.rs
  buy line (line-neutral) to call legacy_buy::buy. Measured: 744/150 no losses.
- IR loop: tools/ir.sh OUT.ll (cargo rustc --emit=llvm-ir via slot lock, ~10s) + tools/llc.sh (2s) reproduces nbuild bytes.
  tools/bbatch.sh CB BUY.. / vbatch.sh: variant batches -> out/bbatch.log, out/vbatch.log (metrics exact/noreg/noslot/shape).
- 0x351a8 cashback (gen/cb_v6.rs): lines 44/54/57/98, create_idempotent, validate_self_transfer(&uq.key(), &uq.owner, ata.key, payer.key).
  shape 305->213. Block layout needs data_is_empty block NOT followed (IR order) by create or cont: achieved by
  `if ata.is_writable == false { return err!(..) }` (cont block becomes 0-target => created first). require!/if ! give 276.
  validate_pool_v2(.., &base_mint.key(), 1) (orig copies key) fixes tail but shape 250 (regalloc chaos).
- 0x376b0 buy (gen/buy_b1.rs, buy-r1 design ported): all error lines/closures match (317,326,327,387..409), shape 18,
  noslot 27. Remaining: frame 0x650 (orig) vs 0x600 (cand): orig has +0x50 B of stack objects near frame top; orig top
  object = first error!() name temp; cand top = event user_base_token_account key temp. Plus distribute_cashback arg-load order.
## 02:44 WIN 01: 0x376b0 (buy handler) -> 745/785 native, raw 150. shared/wins/mg-A-3-01.{patch,json}; snapshot lanes/mg-A-3/wins/01
- recipe: gen/compose2.py gen/cb_v6.rs gen/buy_b23.rs (buy_b23 = buy_b2 [#[inline(never)] pub fn buy] + pay_cashback wrapper with &base_mint.key()).
- key steps: standalone (not inlined) buy fn fixed frame layout (0x600->0x650); arg-load order fixed via wrapper (see findings).
## Next: 0x351a8 cashback (best cb_v6 shape 213 / exact ~825), 0x3a5a0 exact handler (dedicated fn, lines 625..781)

## 03:0x REBASE to u753 (newest base already includes my 0x376b0 win; 753/785 native, 150 raw)
- lane src now = u753 + buy win + exact partial. Clean build 753/150, NO losses. fr753n.json = u753 matched set.
- compose2.py now: buy.rs skeleton from u744, lib.rs base from u753 (keeps u753 sell-lifetime/pub-use edits). 3rd arg = EXACT tpl replaces execute.
- EXACT handler partial gen/ex1.rs (faithful specialization of execute::<true>, behavior-identical): dedicated pub fn buy_exact_quote_in
  with its OWN single-use wrapper pay_cashback_exact (CRITICAL: buy's pay_cashback must stay single-caller or buy's body shrinks and
  0x376b0 regresses -> use a separate wrapper per handler). All error lines match (625/636/638/646/700/733/754/776/781); added the
  original's require_gte!(pool_base, base_out, TooLittlePoolTokenLiquidity)@781 (behavior-neutral: base_for_quote never exceeds reserves).
  Result: 0x3a5a0 shape 932 -> 722 (still NOT matched). Big residual blocks in the estimate/curve-adjust math (orig offsets ~0xb88, 0x1178
  n=82, 0x1650, 0x18b8) = different scheduling of the fee/estimate/min()/gross_pool_quote-closure region. Needs the buy-style variant sweep.
- Partials saved in lanes/mg-A-3/partials/ (ex1.rs, cb_v6.rs, buy_b23.rs, compose2.py, exact-measure.json).
## Only WIN so far: mg-A-3-01 (0x376b0). Cashback 0x351a8 best shape 213 (cb_v6). Exact 0x3a5a0 best shape 722 (ex1).

## 03:00 FINAL state
- Lane src = clean u753 (753/785 native, 150 raw; includes my composed 0x376b0 win). Verified rows == base753 (no losses).
- WIN banked: shared/wins/mg-A-3-01.{patch,json} (0x376b0). Already composed into union base u753 by mg-A-int.
- Partials for next lane (lanes/mg-A-3/partials/ + gen/): 
  * 0x3a5a0 exact: gen/ex1.rs faithful execute::<true> specialization, shape 722 (from 932), all error lines matched, behavior-safe.
    Rebuild: python3 -B gen/compose2.py gen/cb_v6.rs gen/buy_b23.rs gen/ex1.rs. Residual = fee/estimate/min/gross_pool_quote scheduling.
  * 0x351a8 cashback: gen/cb_v6.rs, shape 213. Residual = AccountInfo-clone ordering for the inlined Create CpiContext (orig ~0x9a8 block)
    + stack slots. Needs the 520-closure/clone tooling (lanes/closures520-r1/cl.py, liquidity-r1 notes).
- Tooling built: tools/{ir.sh,llc.sh,irfn.py,irmove.py,irreorder.py,olist.py,ocalls.py,nd2.py,slotmap.py,seq.py,dd.py,sc.sh,cmp.py};
  batch runners gen/compose2.py + tools/bbatch.sh / vbatch.sh. IR loop ~12s/variant (no build slot for llc).
