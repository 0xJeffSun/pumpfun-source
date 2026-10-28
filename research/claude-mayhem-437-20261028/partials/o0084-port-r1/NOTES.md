# o0084-port-r1 — O0084 sell_v2_handler (159160, 18096 B)

## Setup
- p1 = parent-436 + o84 x02 pump_interface_v2.rs delta (match forms in price check, inline signer seeds).
  build o0084-port-r1-p1: 18104 B, masked diff 446 lines (x02 on 434 was 280), no_losses, 436 matched.
  regions (1k buckets): 0:3 1000:38 2000:85 3000:19 4000:3 6000:3 7000:2 8000:3 9000:11 10000:101 14000:115 15000:36 16000:25 17000:2
  The 10000/14000 200 lines are mostly difflib misalignment of the 26 AccountInfo copy runs (stack slot/reg shifts).
- tools/: copies of o84 tools repointed to this lane (var.py SLOTP env for parallel runs, side.py side-by-side, seqs.py).

## Observations
- Original evaluates retained_bps>10000 check BEFORE the cap select; cap is selected as a pointer
  (global + 96 or +176, then load) -> suggests `cap = if .. {&field_2} else {&field_11}` (b-series).
- v1 (= roots/v1, cap as `&field` ref select in handler; same as o0084-ir-r1 v01): 17968 B, 242 lines.
- IR: event store order = struct literal/decl order; reordering IR stores to the original order
  [256,0,294,64,72,80,88,128,136,160,168,176,184,292,288,144,112,96,32,232,208,248,224,200,192] -> 226 (16000 region 25->14).
- IR s1: cap select as branchless select placed after raw_quote unwrap -> 220. Original asm has `add r9,8` then select 96/176:
  base = &GlobalParams (inner), offset select inside callee => original passes &GlobalParams + quote_mint into the shared
  initial_trade_output (like sell_quote/buy_quote in the pump-swap path do). Source records pin raw_quote unwrap at state.rs 350:43
  for sell_v2 too, so the select must live in the shared fn. -> g4 d1/d2/d3 (legacy passes Pubkey::default()).
- g3 (c1 map_err CPI, c2 SELLORD literal, c3 let-else price closure, c4 match CPI) pending (build lock contention).

## Results (masked diff lines, tools/regions.py; all no_losses=true, 436 matched, no stack warning)
- c2 (v1 + legacy-sell literal order SELLORD) 207; c3 (v1 + let-else closure) 396 (copy-region misalign).
- d1 (v1 + cap select inside shared initial_trade_output, &GlobalParams + quote_mint:Pubkey; legacy passes Pubkey::default()) 183. d2 (select after max line) 228. d3 (quote_mint:&Pubkey) 183.
- Codex checkpoint curve-after436 y/x3/r/z sell_v2 = 195 (let-else closure, map_err CPI, codex literal order).
- IR: moving quote_mint memcpy first in event block: v01 242 -> 192 (16000 region 25->4).
- h1..h5 on d1: h3 (SELLORD + map_err + separate `let quote_mint=if native{default}else{key}` BEFORE tuple) 179, 18096 B, but arms worse;
  h4 (same, quote_mint let AFTER the tuple) **128**, 18080 B: CPI-drop + event block exact. h5 (codex order + map_err) 166.
  remaining h4: 0-1900 price check reg/blocks, 1900-3100 cap/max order (orig: add r9,8; select 96/176; cap min BEFORE real_sol*retained), 15000 arm load order (orig native: gp before state; bc real before virtual).
- queued: g7 j1 (#[inline] initial_trade_output), j2 (cap min before max), j3 both, j5 (no attr); g8 k1 (codex closure), k2 (legacy closure).
- c1 (v1 + map_err CPI) 232 (14000 region 13->4). c4 (match CPI) 415. e1 (codex y + d1) 294 (bad: frame shift).
- k1 (h4 + codex let-else closure, vt/vs inside) 99; k2 (h4 + legacy closure verbatim) 99: price region 0-1900 -> 2 lines.
- j3/m2 (#[inline] on initial_trade_output) 56 for O0084 BUT loses O0081+O0082 (legacy). j2 (cap min before max) 316 + losses.
  m1 (h4 + cap by value `{global_params.field_2}else{..field_11}`, inline(always)) 109, no losses.
  m2 shows the exact orig cap codegen (add r9,8; mov 96/176 select) arises when initial_trade_output is NOT MIR-inlined.
  -> g10 n1..n4: separate trade_cap helper (#[inline] / plain, value / ref) so only the v2 select is out-of-line.
