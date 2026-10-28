# mg-P-z09 PROGRESS (start = base/L19 = 977/1035, 165 raw; baseline base/L19/inventory.json)
Work root: W/lanes/mg-P-z09 (src/ = L19 pump crate copy, work/ = warm clone of mg-P-int/work-a, tools/)
Windows: 0x13f630 0x144508 0x147ba0 0x1489f8 0x857a8 0x83088 0x837a8 0x83c00 0x859b0
Prior notes read: lanes/r5-z09/PROGRESS.md, mega-run/lanes/mg-P-z07/PROGRESS.md, INSIGHTS-R5.md (v3 lines).

## State on L19 (win.py list)
- 0x147ba0 buy 0.623 (3696 vs 3672) | 0x83c00 v3_execute_buy 0.273 (3600 vs 3440) | 0x859b0 v3_emit_buy 0.258 (12432 vs 8944)
- 0x83088 net_quote? 0.228 (1088=1088) | 0x837a8 none (0.094) | 0x1489f8 buy_exact_quote 0.128 | 0x857a8 closure coord 0.948
- 0x13f630 v2 buy_exact_quote_in 0.148 | 0x144508 sell_v2 0.153
- not mine: 0x80df8 (mg-P-lib), 0x3cd50 (mg-P-z03)

## Log
- 02:40 lane set up (src from L19, warm work clone, tools/irbuild.py+irwrap.py copies of z07's IR loop).
- 02:45 baseline verified: plain fastbuild of src = 977/165, 0 gains/0 losses, unstripped sha 1bf472c7 (= L19). The IR build
  (tools/irbuild.py) gives the same stripped candidate (93f0fb7c) and the same score; only the unstripped sha differs (2e5b8980).
- IR loop works: ir/b0.ll saved; tools/llx.sh ir/b0.ll <tag> <orig_start> <symregex> reproduces 0x834c8 as MATCH in ~4 s.
- 02:50 STOPPED: an analysis step in this session was halted by a safety check, so I ended the session without further
  window work. No source edits made; src/ is still identical to base/L19/pump. No deliveries.
