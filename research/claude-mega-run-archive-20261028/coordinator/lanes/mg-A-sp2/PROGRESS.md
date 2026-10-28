# mg-A-sp2 PROGRESS (AMM windows 0x3a5a0 exact-in buy, 0x351a8 buy cashback, 0x16128 admin_update_token_incentives, 0x14920 admin_cto_pool)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2 (src = u753 copy, warm target from mg-base733).
Base: u753 native 753/785, raw 150 (verified 03:05, no gains/losses). base so: L/base/base.so, rows L/base/base-rows.json
Measure: MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-753n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L
## Log
- 03:05 lane set up; baseline verified 753/150.
- 03:12 ported mg-A-1 cto+inc handlers (admin_cto_pool.rs, admin_update_token_incentives.rs = I3) onto u753: 753/150 no losses; inc -24/+23, cto -25/+25.
- Tools in L/tools: ir.sh (IR via target-ir, 15 s), llcfn.sh (llc+diff one fn, 2 s; 4th arg 'full'), mx.sh (MULTIPLEX: N variant fns
  appended as pub fn hv_<name>, one IR+llc, scores each; MergeFunctions merges identical variants -> 'NOT FOUND'), ofnm.py, irsub.py/irmove.py
  (IR edits), mir.sh, pat2.py (counts 'branch -> [ldxdw payload; ja]' err blocks per window, orig or cand).
- 0x16128 ANALYSIS: orig keeps a separate err block for the update_token_incentives `?` (payload load sunk into it) and RET at fn end.
  IR proof: inserting an errupd block with a lifetime.end -> -1/+1. MemCpyOpt stack-move strips %mint lifetime markers in the cand.
- 03:29 WIN 01: 0x16128 via `update_token_incentives(..., &mint.key(), ...)?` (by-ref temp in the ?-call). 754/785 raw 150, 0 losses.
  shared/wins/mg-A-sp2-01.{patch,json} (diff -ruN vs u753; includes the cto port). Snapshot L/wins/01.
- 0x14920 ANALYSIS: slim-module llc (tools/slim.py, 0.2 s/variant) + adjacent-swap search (tools/perturb.py) -> only the prepare_pool arg-load order matters;
  IR order [pool.info, sys, payer] = exact. Orig call sites split in 2 families (A [payer,sys,pool]: cto, trade_v2 x3, multi_hop; B [pool,payer,sys]: buy/exact/sell/sweep).
- WIN 02 (03:5x): typed-param private wrapper fn prepare_pool(&Account<Pool>, &Program<System>, &Signer) in admin_cto_pool.rs (ArgPromotion -> param-order loads).
  755/785 raw 150, 0 losses. shared/wins/mg-A-sp2-02.{patch,json} (cumulative). Snapshot L/wins/02.
- 03:50 REBASED lane src onto u756 (includes my -01) + -02 cto wrapper: 757/785 native, raw 151, gains [0x14920], 0 losses (frontier matched-union-756n).
  Old tree kept at L/src-u753-w02. u756-relative patch of -02: L/wins/02-u756/vs-u756.patch (only admin_cto_pool.rs).
- NEXT: 0x3a5a0 exact-in buy handler (mg-A-3 ex1 partial), 0x351a8 buy distribute_cashback (mg-A-3 cb_v6 partial).
