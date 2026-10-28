# fz-P-inc-r2-01: +0x7bfd8 volume_accumulator::update (base L33 -> 1011/1035, raw 168)

Base: WP/base/L33 (1010/1035, raw 168, unstripped 9392550f...). Built with lanes/mg-P-int/tools/nbuild.py (harness
fastbuild, identity recipe); scored with harness/score.py --baseline base/L33/inventory.json:
gains [0x7bfd8], losses [], raw_gains [], raw_losses [], runtime_valid true, no stack warnings.

## Change (src/token_incentives/volume_accumulator.rs only)
`update` (0x7bfd8, 1864 B) rewritten in the form of the matched PumpSwap AMM updater
(AMM window 0x6d408 `GlobalVolumeAccumulator::update_user_volume_accumulator`, closed by lane fz-A-vol-r1, union-774):
- current day via the existing `day_index()` Option helper; the roll-over result is passed through instead of `?`:
  `let result = match day_index(global, now) { Some(d) => roll_over(global, user, d, now).map(|()| Some(d)), None => return Ok(()) };
   if let Ok(Some(d)) = result { if now <= global.end_time { add_global_sol_volume(..); add_user_sol_volume(..); } } result.map(|_| ())`
  (this keeps one Ok tag live from entry, spilled once, as in the original; `?` gives rematerialized 2s).
- `roll_over` (replaces accrue_previous_day; private, no inline attribute) takes the previous day from `day_index(global,
  user.last_update_timestamp)`, reads sol_volume and token_supply first, `if sol_volume > 0 { if user.current_sol_volume == 0
  { return Ok(()); } ... }`, Truncation `error!` kept on line 103, user stores in the order total_unclaimed_tokens,
  needs_claim, last_update_timestamp, current_sol_volume.
- two plain helpers appended at the end of the file: `add_user_sol_volume(user, sol_volume, now)` (current_sol_volume,
  needs_claim, last_update_timestamp) and `add_global_sol_volume(global, day, sol_volume)`.
- `user.user = *key` first and the before-start reset are unchanged.

Behaviour: identical (same checks, same panics in the same order, same Truncation error at line 103, same stores; the
function is now normalized-byte-equal to the original window 0x7bfd8). Callers unchanged (claim passes volume 0).

Layout: lines 22..115 re-laid line-neutrally with `// layout-pad` blocks so the only Source site (Truncation, line 103)
stays on its original line; file grows by 13 lines at the end (helpers; no Source sites after them).
synthetic_layout: true (pad blocks).
