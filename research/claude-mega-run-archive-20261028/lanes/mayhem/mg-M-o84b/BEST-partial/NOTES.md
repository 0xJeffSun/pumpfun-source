# BEST-partial r3 (mg-M-o84b, 02:14)
Base parent-439. O0084: 18088 B, 7 masked lines (P0 cap C4 + arm A3), winreport diffslots 159 ratio .9398; measure vs mgMint-p439-clean: 439 no_losses true; no stack warning; O0081 O0082 matched (norm_eq).
Mechanism (all in state.rs shared + pump_interface_v2.rs handler; composes with mg-M-o83b buy side):
 1. trait TradeCap{early,late} default identity; impl for &u64 overrides late (AI, legacy max-first unchanged); QuoteCap{global_params,quote_mint} overrides early (non-AI, LLVM-inlined) doing the cap select with native_mint::id() (fn call, not ::ID const).
 2. initial_trade_output/sell_amounts generic over C:TradeCap; v2 sell passes QuoteCap{&a.global_params,quote_mint}.
 3. initial_trade_output takes retained_bps and computes retained_basis_points LAZILY after cap.early (delays the 10000-sub past the cap loads) -> removes orig's hoisted mov64, cap cluster C5->C4. buy_amounts/sell_amounts pass retained_bps through.
 4. SellEvent built as per-field O0079-order scalar lets (not the (tuple)=if native{} form).
Residual: cap O+2376-2408 (4) = orig loads cap before 10000-sub; arm O+15392/15456/15768 (3) = 1 ldxdw 64B early + orig materializes fresh mov64 0 at tail. Build mg-M-o84b-r3 (rbuild.py).
