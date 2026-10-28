# mg-A-2 progress (AMM creator-fee + create-pool windows)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-2 (src = mg-base733 copy, own warm target). Base build = 728/139 native (verified).
Tools (L/tools): nd.py SO ADDR NAME [ctx] (masked diff; MS/MR/MJ env = mask stack/regs/jumps), all.sh SO (6 windows),
  b.sh [L] (nbuild + measure vs matched-733n + all.sh), ow.py orig ADDR FROM TO | SO NAME FROM TO (instr index range), funcs.py.
Window -> cand fn: 0x23e40 migrate_pool_coin_creator, 0x24fd8 set_coin_creator, 0x26da8 transfer_creator_fees_to_pump,
  0x28dd0 transfer_creator_fees_to_pump_v2 (all = pump_amm_recovered::pump_amm_recovered::X #[program] fns),
  0x2ba60 instructions::create_pool::execute, 0x2e720 pump_amm_recovered::extend_account.
Base733 masked (MS MR MJ) diffs: 59 / 273 / 203 / 432 / 926 / 436. Prior-lane bests (old 656 base): creatorfees-r1 migrate 22,
  set 193; createpool-r1-v1 create_pool 53, extend 15.
## Log
01:50 ported createpool-r1-v1 execute body into base733 create_pool.rs (gen/create_pool.base733.rs = original) -> 0x2ba60 53 masked
  (58 with MJ only), still 728/139, no loss. Residual = (a) quote supported_mint call tail-dup (orig: load box, branch on r6, two
  call sites, false-arm block placed at idx 825 near error blocks) (b) error-block placement after jgt liq,99 and Clock::get.
02:15 REBASED onto u744 (L/src = u744 + my edits; old 733 tree in L/src733). b.sh measures vs matched-union-744n.
02:20 create_pool IR findings (llc loop, tools/ndo.py + ir/irmv.py): (1) liquidity check needs `br (ult liq,100), err, cont` with err block
  next in IR order; (2) Clock::get()? needs err-first (`icmp ne` tag) -> together 53->15 all-masked; (3) quote check needs two
  supported_mint call arms with canonical arm predicted LIKELY (P in (0.5,0.8]) -> with weights 5:3..4:1 all-masked diff 5.
  Source if/else quote variants (mux build, gen/vars_q.py) give mset 1 but canonical predicted unlikely (memcmp==0 heuristic).
02:35 PORTED creatorfees-r1 migrate/set handlers into instructions/coin_creator/{migrate_pool_coin_creator,set_coin_creator}.rs
  (structs/events stay in creator_reassignment.rs; pub use re-exports): 0x23e40 now ONE instruction off (unwrap_failed &fmt::Error
  slot add64 r3,-0x38 orig vs -0x190), 0x24fd8 19 all-masked. Still 744/150, no losses.
02:55 STATUS (on u744, src builds 744/150 no losses). Window plain/all-masked diffs:
  0x23e40 migrate 1/0  | 0x24fd8 set 280/19 | 0x26da8 xfer-legacy 992/203 | 0x28dd0 xfer-v2 1189/432
  | 0x2ba60 create_pool 97/53 | 0x2e720 extend 602/436.  NO WINS yet (no normalized match gained).
Best partial saved: lanes/mg-A-2/best-partial.patch (diff -ruN vs u744/src). Contents: migrate+set handlers moved to
  instructions/coin_creator/{migrate_pool_coin_creator,set_coin_creator}.rs (structs/events stay in creator_reassignment.rs,
  pub use re-exports); create_pool.rs = field-by-field init port (createpool-r1-v1 body).
migrate 0x23e40: ONE instruction from a full win. Only diff = `add64 r3, -0x38` (orig) vs `-0x190` (ours): stack slot of the
  ZST `[0 x i8]` formatter arg (_11.i8) to the FIRST require!'s core::result::unwrap_failed. all-masked diff 0 (530/531 exact).
  IR proof (ir/cc.ll, tools/nolife.py): dropping lifetime.start of %old_coin_creator.i -> full diff 0 (xs1). So orig wants
  old_coin_creator's 32B slot live from entry so StackColoring packs the ZST at -0x38. Source attempts that FAILED to reach it:
  bind-early (M-a diff28), deferred-init (mig-b diff1 same), mut+default-init (M9 18), &hold (M10 16), mem::replace (M1/M8 25/55),
  .key()/.clone() (diff1 same). inline(never) loses the 0xec738 global wrapper (-1). Lead: find the source form (maybe body
  written directly in lib.rs #[program] fn, or a block scope) that emits StorageLive(old_coin_creator) at bb0 without an early load.
create_pool 0x2ba60: IR recipe proven (ir/x5.ll=all-masked 15, +branch-weights=5) but blocked by a compiler branch-prediction
  heuristic (canonical quote arm must be predicted LIKELY; memcmp==0 predicts UNLIKELY) that is NOT source-expressible. Residuals:
  (1) liquidity `ult,100` err-block placement (2) Clock::get err-first (3) quote supported_mint tail-dup into 2 arms.
Tools added in lanes/mg-A-2/tools: nd.py, ndo.py (.o diff), ow.py/owo.py (instr index range), calls.py, seqo.py (err-line seq),
  b.sh (build+measure vs 744), ir.sh (emit .ll), mir.sh, ir/{irmv.py,irsub.py,allocpos.py,nolife.py,mvstart.py,llc.sh}, gen/mux.py+muxm.sh (multiplex variants), vtry.sh.
