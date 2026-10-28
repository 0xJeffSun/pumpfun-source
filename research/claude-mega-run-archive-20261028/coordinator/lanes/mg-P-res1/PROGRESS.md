# mg-P-res1 PROGRESS (main Pump near-miss windows; start = base/L22 980/1035 raw 165, unstripped a94263b5)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res1 (src/ = L22 copy, work/, out/, tools/, v/)
Windows: 0x857a8 (520 B coord, trade_v3:997 Truncation closure), 0x298b0 (4152 collect_creator_fee 0.905),
0x2bf18 (6664 get_token_distribution_amounts 0.89), 0x76a28 (3864 claim_cashback; not in L22 top3, z07 best v/c1 0.8666 on L13)

Added by coordinator (02:55, after the first four): 0x3cd50 prepare_bonding_curve 0.9937 (one extractvalue must move per
z03 llc proof; ~30 forms tried) and 0x3fb70 migrate::execute 0.867 (insn-identical body, MBP order only; branch weights worse).
Tools: lanes/mg-P-z03/tools (mx_fn.py, irt*.sh). Newest base L23 (981).

## Log
- 02:47 setup: src = cp -c -R base/L22/pump; tools copied from mg-P-z07 (irbuild/llx/sacmp) + own orng.py/brto.py.
- 0x857a8: orig caller 0x149cd8 in buy_exact_quote 0x1489f8 = 3rd tokens_for_quote (0xa0838) call:
  `rem = X - Y` (guarded `X>=Y` else PumpError::BuyNotEnoughSolToCoverFees .into(), no Source), `if rem!=0 {u64::try_from(
  tokens_for_quote(curve,rem)?).map_err(|_|error!(Truncation))?}` on line 997. Our handler has only 1 tokens_for_quote (911).
- 02:53 baseline IR build (tools/irbuild.py) = L22 exactly (980/165, stripped sha equal; unstripped differs only from IR emit).
  llc loop: single-fn module (tools/xfn.py) + tools/lle.py (text edits + llc + sacmp) reproduces collect_creator_fee
  (0.9051, 75 diffslots) in 0.3 s; get_token_distribution_amounts NOT reproduced by llc (6760 vs 6664 B, loop fn, as z01 said).
- 0x298b0 IR finding: the executable-check branch is `icmp eq i8 %exec,0` (ZeroHeuristic 37.5/62.5). Forcing 50/50 via
  !prof gives 0.9361 / 46 diffslots (4136 B); rent-favoured 20:12 = 0.928; 2000:1 = 0.75. => need a source form whose
  branch carries no zero-heuristic (or equal weight). Remaining after 50/50: msg tail-merge of "No creator fee" site,
  6-slot load/store order, one ldxdw placement.
- 0x3cd50 prepare_bonding_curve (0.9937, z03 parked): confirmed z03's llc proof MATCHES (tools/lle move `%_29.1=extractvalue
  %41,1` after the `%_14.val1` drop-load in the realloc-error block = 1.0000). Source: tried scope-boundary forms to drop the
  realloc AccountInfo temp BEFORE the `?` From-convert: `{let info=curve.to_account_info(); info.realloc(..)}?` -> 0.629 (1152 B)
  and `let r=..realloc(..); r?;` -> 0.644 (1096 B). Both naming a local reshape the whole fn (size changes). Confirmed scheduling
  wall: the payload extractvalue sits in the realloc-error block (MIR builds return value before drops); no source form defers it
  past the drop without restructuring. llc-only; parked (agrees with z03).
- 0x857a8 (0.948, coord-only): body is a 520B Truncation closure; diff is ONLY the baked Source constants (line 997 + file
  hash) per win.py (stw consts 0x1789/0x3e5/0x1d vs ours). To create a line-997 Truncation closure behavior-safely = inline the
  post_base narrowing (line 943, currently inline(never) exact_input_tokens) as `narrow_post(output(eff..)?)` with narrow_post's
  error! on physical line 997. BUT line 997 is mid-transfer code (`)?;` of transfer_from_user) with NO layout-pad between the
  970 Overflow site and 997 to absorb the shift -> needs a full buy_exact_quote line re-layout (integrator's layout pass), and
  the compute restructure risks the 4 currently-matched buy_exact_quote closures (904/911/930/970). mg-P-int already dropped it
  for this reason. NOT a safe window-lane win; left for the integrator's coordinate pass. exact_input_tokens==inline form proven
  value-equal (eff=q-1 checked Overflow; output() checked; try_from Truncation).
- 0x76a28 claim_cashback: on L22 base the handler is only 1160 B (__private::__global::claim_cashback) vs the 3864 B window
  -> the base tree does NOT carry z07's undelivered reconstruction (v/c1, 0.8666). Reaching even 0.867 needs porting z07's
  full cashback.rs body first, THEN z07's documented backend-scheduling wall (two adjacent bool-load order + spill-slot swap).
  Large reconstruction + known wall; not pursued (low confidence vs budget).
- 0x2bf18 get_token_distribution_amounts (0.8897): llc does NOT reproduce this loop fn (6760 vs 6664 B from the same IR),
  confirming z01 -- IR-level iteration impossible; z01 exhausted source forms (MBP cold-error-block order). Wall.
- 0x3fb70 migrate::execute (0.8672): llc-faithful; divergence pervasive (regalloc + shared-epilogue tail-merge), not one block.

## FINAL (mg-P-res1, ~03:1x) -- 0 wins; all 6 windows confirmed walls with fresh IR evidence
No net-gain delivery written; no EVENTS.log WIN line (nothing matched; not fabricating).
Closest: 0x3cd50 0.9937 (llc MATCH proven; source-unreachable: Ok(()) undef-phi blocks the extract fold) and
0x857a8 0.948 (coordinate-only; needs integrator buy_exact_quote re-layout to host a line-997 Truncation closure +
a behavior-safe inline of exact_input_tokens). 0x298b0 0.9051 (exec-branch BPI ZeroHeuristic, not source-reachable;
50/50 -> 0.9361). 0x2bf18 / 0x76a28 / 0x3fb70 all previously-established walls, re-confirmed.
New reusable findings appended to shared/INSIGHTS-R5.md (0x3cd50 undef-phi root cause; 0x298b0 per-branch weight map; 0x3fb70).
Tools added in lanes/mg-P-res1/tools: wd.py (compact normalized window diff), odf.py (llc-obj hunk diff), lle.py
(single-fn IR edit+llc+score), orng.py/brto.py (orig range/branch-target), llf.sh. Baseline IR tree: out/b0 (= L22, 980/165).
