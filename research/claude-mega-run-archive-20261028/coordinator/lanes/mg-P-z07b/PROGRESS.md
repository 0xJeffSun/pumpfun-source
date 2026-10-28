# mg-P-z07b PROGRESS
Start: base L26 (985/1035, 166 raw; unstripped 5f588ddb...). Score baseline: W/base/L26/inventory.json.
Lane work root: W/lanes/mg-P-z07b (src/ = L26 copy, v/<variant>/src, w0..w3 warm work dirs, tools/ copied from mg-P-z07: vb.sh NAME SLOT WIN.., irbuild.py, llx.sh, sacmp.py, odiff.py, deliver.py)
Windows: 0x77940 claim_cashback_v2 (8832 B), 0x7c720 update_schedule (6312 B), 0x7bfd8 volume_accumulator::update (1864 B)

## Log
- 03:20 lane set up; baseline build running.
- 03:25 baseline v/base (L26 src, irbuild) = 985/166, candidate.so identical to L26. Tools added: tools/skel.py (basic-block
  skeleton, ERR blocks collapsed; modes orig/cand/obj), tools/skdiff.sh, tools/layout.py (re-layout a line range onto target
  lines with pad blocks; file length kept), tools/realdiff.py (drop offset-only hunks), tools/irblk.py (move IR blocks), tools/dumps.py.
- 0x7c720 update_schedule decoded (orig CFG): entry stores seconds+mint; `if start!=0 && end!=0 {time_range()?}`
  (5 errors 359/369/371/373/394 each followed by a `?` tag==2 check => inlined helper with ?); `if supply>0 {supply()?}`:
  ts<start tested FIRST (no 297 check on that path) -> before-start (end_day; day<30 ? 309 check+store : loop 0..=end);
  else 297 SupplyUpdateForFinishedRange, then current day, end_day, day<30 ? 337/338+store : loop current..=end.
  All supply results merge at ONE `if r3==2` block. 373 = require_gte!(seconds*30 - 1, end.checked_sub(start)) with NO
  sub-overflow panic (with_values gets prod-1; compare folded to prod>range).
- us_a (single supply helper, B-like time range): 0.30 -> 0.5875. us_b (dispatcher `if ts<start {return before(..)}
  require!(297); after(..)` + current day via `(secs!=0).then(|| e / ti(secs))`): 0.8449 (6296 vs 6312 B).
- KEY MECHANISM (IR loop proven): SBF analyzeBranch cannot analyze conditional branches, so MachineBlockPlacement pre-merges
  each block ending in a conditional branch with its IR-order successor => final layout of fallthroughs == IR block order.
  Moving the two 0x32 'current_timestamp' expect blocks to the IR function end: 0.8449 -> 0.8639; also moving the 394 error
  blocks after the loop: 0.9401 (2 real hunks left: 373 prod-1 and a shared `r3=2; ja` tail).
- mx1 (6 variants, single supply fn): all worse (0.59-0.67; regalloc of supply arg at entry breaks). But: day_index helper
  returning Option + .expect() at each caller puts the expect blocks at the end (vb/vc); inline
  `require_gte!(acc.seconds_in_a_day.checked_mul(30).expect(..) - 1, end.checked_sub(start).expect(..), ..)` (evaluated twice
  by the macro) has NO sub-overflow panic (orig form). 394 polarity unchanged by if/else, helper loop, helper tail.
- 394 analysis (print-after-all dumps): rustc creates the err block when the check block is codegen'd (before the loop);
  B has an intermediate `current+1` overflow-check block, so LoopRotate's lr.ph lands after the err. Testing in mx2.
- AMM 0x6db20 (update_token_incentives, 6312 B, same function) is unmatched in AMM too; its lane (WA/lanes/poolstate-r1,
  gen/va.uti6) stalled on the same two layout issues.
