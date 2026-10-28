# mg-P-v3b PROGRESS (start = base/L27 = 986/1035, 166 raw; baseline base/L27/inventory.json)
Work root: W/lanes/mg-P-v3b (src/ = L27 pump crate copy, work/ = warm clone of mg-P-int/work-a, tools/, exp/, ir/)
Windows: 0x147ba0 (v3 buy handler, 3672 B), 0x1489f8 (v3 buy_exact_quote handler, 7856 B), 0x859b0 (v3 emit-buy events helper, 8944 B)
Sibling: mg-P-v3a owns 0x83088 0x857a8 0x837a8 0x83c00 (buy_exact_quote decomposition unblocks 0x857a8/0x83088).

## Log
- 03:3x lane set up (src from L27, warm work clone).
- 03:35 baseline nb build (tools/nb.py = nbuild + --emit=llvm-ir -Csave-temps): 986/166, 0/0, stripped == L27 candidate (d9452905).
  Pre-opt loop verified: clang -O3 (tools/clo.sh) on work/.../*.no-opt.bc reproduces ALL 694 crate fns byte-exact (tools/objvs.py).
- 03:42 decoded original 0x1489f8 handler glue (call skeleton + ABIs; posted to INSIGHTS-R5 03:42). Error variants/lines:
  881 BuyZeroAmount(gt) 882/891 BuyNotEnoughSolToCoverFees(gt) 926 NotEnoughTokensToBuy(require!) 935 TooMuchSolRequired(gte, double add)
  971/1001 BuySlippageBelowMinTokensOut(gte) 993 same(gt); net.checked_sub(excess).ok_or(BuyNotEnoughSolToCoverFees) (From<PumpError>, no site).
- v3a stopped: adopted its trade_v3.rs (estimate_post_complete 0x83088 / fit_post_complete 0x837a8 drafts) as my base (gen/base_v3a.rs).
- h1 (gen/gen.py + gen/h1_handler.rs): handler rewritten line-neutrally in 872..1025 (sites on original lines), quote_fee kept as
  Option<Fee> end-to-end (orig handler copies the 4-word Option<Fee> unmodified; no tuple map): v3_buy_costs/v3_execute_buy/
  fit_post_complete take &Option<native_transfer_fee::Fee>; gross_up_quote = pre_fee_amount(net) + checked_sub closure@382
  (orig 0x80df8 calls pre_fee_amount directly, no calculate_fee: L27's net+fee(pre) form differed in rounding edge cases).
  RESULT 986/166: +0x857a8 (closure @997) -0x163bf0 (PostCompleteBuyEvent::data now inlined everywhere: its only out-of-line
  caller was the old monolith's cold call site). Ratios: 0x1489f8 0.128->0.313 (7656/7856 B), 0x83c00 0.273->0.440,
  0x837a8 0.615, 0x83088 0.457, 0x147ba0 0.645, 0x859b0 0.258 (12512 vs 8944 B).
- 0x163bf0 mechanism (inline remarks): data() cost 145 vs threshold 250 in v3_emit_buy (205 in route_event) -> inlined; orig
  keeps it out of line in v3_emit_buy (2 calls) => orig post-event block is BFI-cold (threshold 45). Orig v3_emit_buy order:
  Clock, TradeEvent emit+cpi, CompleteEvent emit+cpi, THEN post_complete_buy_event(..)? + emit/cpi (ours builds post event first).
- h2 (= h1 + gen.py --emit=E1: v3_emit_buy emits TradeEvent/CompleteEvent first, builds the post event after, no event clones):
  986/166, +0x857a8 -0x163bf0 (net 0, NOT a win, not delivered). 0x859b0 0.258->0.335 (10504 vs 8944 B); 0x1489f8 0.313; 0x147ba0 0.645.
- 04:0x STOPPED per coordinator rule: a safety check halted one of my analysis steps, so I saved state and ended window work.
  Tree: W/lanes/mg-P-v3b/src (= best-h2 snapshot); pristine L27 copy in src0/. Regenerate: python3 -B gen/gen.py gen/base_v3a.rs
  gen/h1_handler.rs src/src/trade_v3.rs --fee-exempt-line=431 --emit=E1. Builds: out/h1, out/h2 (score.json). No deliveries/WIN lines.
## Next ideas (for a resuming lane)
- Recover 0x163bf0 (PostCompleteBuyEvent::data out of line): orig's post-event emit block in v3_emit_buy is BFI-cold (inline
  threshold 45 vs our 250); test source forms that make that block cold (it follows two emit_cpi `?` exits + the Option test),
  with the clang pre-opt loop + -Rpass=inline (ir/h1/remarks.txt shows cost 145 / threshold 250). Once 0x163bf0 is kept,
  h2 becomes a net +1 win (+0x857a8) to deliver.
- Then iterate 0x1489f8 (0.313) / 0x147ba0 (0.645, r5-z09 S3/M1 forms: v3_fee_exempt helper is already in the tree at line 431).
