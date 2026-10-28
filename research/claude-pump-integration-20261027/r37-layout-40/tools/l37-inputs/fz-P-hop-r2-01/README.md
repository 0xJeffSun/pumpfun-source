# fz-P-hop-r2-01 (base L33 1010/1035 -> 1011/1035, raw 168; +0x567d8; 0 normalized / 0 raw losses)

Window: 0x567d8 `multi_hop_curve::execute` (multi-hop curve swap handler, 5216 B) — now normalized-equal (ratio 1.0000, same size).
Only file changed: `programs/pump/src/multi_hop_curve_swap.rs` (patch.diff vs base/L33/pump). No `// layout-pad` lines added
(6 before, 6 after); the file grows 876 -> 931 lines because the hop body moved into its own fn and helpers moved to the file
end (mg-P-z05 split2 + hdl, fz-P-hop-r1 V1); every Source site of an already matched window is unchanged (scorer: 0 losses).

## Source changes (all behaviour-preserving; same errors, codes, lines, checks and CPI order)
1. Hop body is a separate `#[inline(never)] fn swap_hop(a, event_bump, &mut CurveHop, curve_bump, &current_mint, amount,
   Option<&PreviousHop>, last, flag) -> Result<HopOutput>` (signature decoded from the original call at 0x57438; z05/r1).
2. Handler (r1 V1 base): requires at 208/214/218 (218 = MultiHopHopFeesMismatch), PreviousHop literal order, previous before current_mint.
3. This lane:
   - `for index in 0..count` (not 0..hop_fees.len()) + slice `let start = index * 5; &remaining_accounts[start..start.saturating_add(5)]`
     -> one bounds check (slice_end_index_len_fail(end,len)), no overflow panic, end tracked +5, as in the original.
   - last-hop flag `index + 1 == count` (with `index == count - 1` LLVM LFTR rewrote the latch to `eq` and laid the body first).
   - `let mut current_mint;` declared on the pad line before `require_gt!` and assigned at 219: its lifetime.start precedes the
     error paths, so StackColoring no longer folds the error-path to_string String into current_mint's slot (orig -0xd8, -0x118).
   - 214 as `if remaining_accounts.len() < 5 || count * 5 != remaining_accounts.len() { return err!(PumpError::NotEnoughRemainingAccounts); }`
     (same check by De Morgan, same line): the error edge becomes the last MIR successor, so the hop_fees drop/return block is
     created after the 218 all() loop -> the original's single `jne len,count -> err` at 218 (8 B smaller, equal size).
   - `saturating_add(5)`: the uadd.sat is turned into `add nuw` only after Range::index is inlined, which gives the original's
     use-list order of `start` (LSR then emits the pointer +0xf0 before end +5 in the latch). IR proof: on the `start + 5` build,
     `uselistorder i64 %_58.0, {1,0}` alone turns llc output into a MATCH. Overflow is impossible here (start+5 <= len), so
     saturating vs checked add cannot differ at runtime.

## Binary evidence
- score.json: normalized 1011, raw 168, gains [0x567d8], losses [], raw_gains [], raw_losses []; build.log: no stack warnings.
- Rebuilt twice (work dirs work-ir2 and work): unstripped sha256 79e978f7... both times.
- Call list of the handler equals the original's (tools/calls.py in the lane).

## Open for the integrator
- Raw/layout: the original slice-panic Location (data.rel.ro 0x1bdc00) is multi_hop_curve_swap.rs line 232 col 32; ours is line 221.
- Runtime suites not run by this lane (they need an integration package under W/full); swap_hop split is a pure refactor.
- 0x5b3b0 (swap_hop body) still 0.112: needs the rewrite around the original helper list (mg-P-z05 llx/hop_callargs.txt).
