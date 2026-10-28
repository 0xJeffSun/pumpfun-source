# BEST-partial c4 (mg-M-o84c)
Base parent-439. O0084: 18096 B (= orig length), 4 masked lines (A4), winreport diffslots 73 ratio .9784; 439 no_losses; O0081/O0082 norm_eq; no stack warning.
= c1 (shared state.rs cap fix: real_sol_reserves loaded before cap.early -> cap region C4->C0; IR-proven exps/e1.py) + ONE let swap in pump_interface_v2.rs line 594 (line-neutral): global_quote_deployed computed before real_quote -> recovers orig instruction count (18088->18096) and drops diffslots 149->73.
Residual A4 (RA/scheduler, confirmed via let+literal sweeps + IR phi-perm floor): quote_vault_balance reload scheduled 64B early (O+15392 vs orig O+15456) + one zero-materialization mov at O+15720 vs orig O+15768. IR phi-reorder floor = 1 but does not map to source (moving the let breaks the sol_vault_balance data dep).

Clean rebuild (fresh label c4v) reproduces symbols sha 9f1f17d5c06b3cc6 byte-identical -> deterministic. NOT a WIN (norm_eq false, 4 masked).
