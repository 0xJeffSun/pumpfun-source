# mg-P-v3a PROGRESS (start = base/L27 = 986/1035, 166 raw; baseline base/L27/inventory.json)
Work root: W/lanes/mg-P-v3a (src/ = L27 pump crate copy, work/ = warm clone of mg-P-int/work-a, tools/ = z09 IR loop + nbuild.py)
Windows: 0x83088 (1088 B, v3 exact-quote prep) 0x857a8 (520 B closure, trade_v3:997 Truncation) 0x837a8 (1112 B) 0x83c00 (3440 B v3 execute)
Sibling: mg-P-v3b owns 0x147ba0 0x1489f8 0x859b0 (v3 buy/buy_exact_quote handlers + events).

## Log
- 03:3x lane set up from L27.
- 03:25 baseline IR build of src (= L27): 986/166, 0 gains/0 losses, runtime_valid (out/b0, ir/b0.ll). IR loop works:
  tools/llc1.sh <ll> <tag> <start> <symregex>... reproduces 0x834c8 exact_input_tokens as MATCH.
- 03:40 decoded ABIs of 0x83088 / 0x837a8 posted to INSIGHTS-R5 (03:40 line). Draft helpers estimate_post_complete (0x83088)
  and fit_post_complete (0x837a8) placed line-neutrally on blank lines 560-571 / 600-614 of src/src/trade_v3.rs as UNWIRED
  pub fns (GC'd from the .so; build e1 = 986/166, 0 losses). src0/ = pristine L27 copy.
- IR multiplex x1 (exp/v1.rs appended in srcx/): 0x83088 best 0.642 (epc_d, 1080 vs 1088 B); 0x837a8 best 0.740 (fit_b,
  1136 B) / 0.676 at equal length (fit_c, checked_sub().filter() form). Not matched.
- 03:5x STOPPED: an analysis step in this session was halted by a safety check, so I ended window work (as mg-P-z09 did).
  No deliveries, no WIN lines. 0x83c00 and 0x857a8 untouched. Plan to rewire buy_exact_quote withdrawn (INSIGHTS note).
