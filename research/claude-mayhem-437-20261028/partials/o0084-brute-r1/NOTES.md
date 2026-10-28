# o0084-brute-r1 NOTES (O0084 sell_v2_handler, source brute force)
base = parent-436 + x02 (o0084-ir-r1/roots/base pump_interface_v2.rs) -> 436, O0084 score (len 18104, pos 2035, ratio .8931, 446 masked diff lines), no_losses.
Tools: tools/b.sh (BT=target override), tools/mv.py = multi-variant builds (variants as pub fn o84hv_i dispatched on retained_bps magic in sell_v2::handler; score each fn).
- 00:05 v1 (own sell_curve_amounts helper inserted mid state.rs) = 173 lines but LOSSES: inserting lines in state.rs shifts Source records (panic Location line:col) of every later fn. Never insert lines; append or replace in place.
- Original O0084 Source records: state.rs 398:90, 350:43, 399:34, 321:26 (=shared sell_amounts/initial_trade_output/retained_basis_points), pump_interface_v2.rs 591:25, 592:26; error!(PumpCpiFailed) line 574.
- 00:30 switched base to o0084-port-r1 h4 (122 lines with call -0x masking fix; event store order already exact). mv1-3 (old base) cancelled.
- mv4 = 25 variants on h4: arm tuple/phi orders, 8 cap-helper forms (appended copies sa_*/ito_*), 7 price-check forms.
- mv4/mv6 results (h4 base, per-variant fn scores; copy=123 calibration): cap `match NA {true=>&f2,false=>&f11}` (or bool bound first: `let na=NA; if na{..}`) with cap-min BEFORE max -> 57; + price-check match/let-else forms -> 28; + arm tuple order quote-first -> 25. Remaining: unfolded +8 base for cap ptr (orig add r9,8 then 96/176), max calc order after cap min, native/else arm load order (~12).
- NOT yet verified as a real candidate (needs in-place, line-preserving edit of shared initial_trade_output lines 351-353 + measure.py no_losses check; buy_v2/O0081 shares it).
