# fz-P-inc-r1-01: +0x7c720 update_schedule (base L32, 991/1035, raw 166)

File changed: src/token_incentives/volume_accumulator.rs only (line-neutral: 470 lines, layout-pad balance kept;
synthetic_layout true because the new helper layout is positioned with `// layout-pad` blocks onto the original Source lines
297/309/337/338/359/369/371/373/394).

update_schedule (0x7c720, 6312 B) re-derived on the original's helper decomposition (mg-P-z07b decode of the original CFG):
- update_schedule: store seconds+mint; `if start!=0 && end!=0 { update_time_range(..)?; }`; `if supply>0 { update_token_supply(..)?; }`.
- update_token_supply (#[inline]): `if timestamp < start { return before_start(..) }` then `require!(timestamp <= end_time, 297)`
  then after_start(..). The before-start path does NOT run the 297 check (the original's order; L32 checked 297 first).
- update_token_supply_before_start / _after_start (#[inline]): end_day / day_index(..).expect(..); day<30 => require_gte 309
  (resp. 337, 338) + store, else `for index in (0|current)..=end` fill.
- update_time_range (#[inline]): 359/369/371, then 373 as one `require_gte!(seconds.checked_mul(30).expect(..) - 1,
  end.checked_sub(start).expect(..), TimeRangeTooLarge)` (no sub-overflow panic, as the original); tail
  `let current = day_index(..).expect(..); let next = current + 1; let end = end_day(..); require_gt!(394); for next..=end`.
- day_index(&acc, ts) -> Option<usize> helper with `.expect("current_timestamp should be bigger than start_time")` at callers.
- KEY last step (new in this lane): the day-supply store goes through a plain (no attribute) helper
  `fn set_token_supply(acc, day: usize, amount)` used by both supply paths. Evidence: with the store inline, rustc creates the
  store block after the 338 error block (it is reached through the bounds-check Assert block), so the store block falls through
  to the result join and BranchFolder tail-merges its `mov r3,2` with the before-start store (6304 B). Moving that one pre-opt IR
  block before the 338 error block gave MATCH (clang -O3 on rustc pre-opt IR, tools/clo.sh); a call site keeps the store at the
  call block's position after LLVM inlining. #[inline] helpers (not #[inline(always)]) are required for the after-start loop
  latch polarity (`jgt r7,r0` exit form).
- the now-unused current_day helper was replaced by a 12-line layout-pad block (binary identical: same unstripped sha).
Behaviour: window is byte-identical (normalized) to the original, so the supply-path order (297 skipped before start) follows
the original. 0 normalized / raw losses vs L32, no stack warnings.
