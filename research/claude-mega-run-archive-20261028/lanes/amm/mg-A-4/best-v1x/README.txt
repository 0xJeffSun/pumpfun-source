v1x = structural rewrite of multi_hop_swap.rs in the ORIGINAL program shape, on union-750n.
Measure: 750/785 native, 150 raw, ZERO losses = SAME window set as u750 (not a win; it is the
continuation BASE for the 3 big windows 0x3dbc0 execute / 0x40a08 amm_hop / 0x45940 curve).
Files to apply on u750: lib.rs (adds `multi_hop_swap::execute as multi_hop_swap_execute` to the
line-26 `pub use` so execute is external = not inlined into the #[program] fn), multi_hop_swap.rs,
trade_v2.rs (adds validate_multi_hop_pool helper at lines 117-126). Patch: v1x-vs-u750.patch.
Normalized-diff ratio vs orig: execute 0x3dbc0 0.57 (was 0.175), amm_hop 0x40a08 0.12, curve 0x45940 0.18.
Generators: ../gen/gen_v1.py (-> ../gen/mh_v1.rs via padb.py), ../gen/apply_v1.sh (build+measure+ratios),
../gen/tv2_helper.rs. Diag tools: ../tools/nbuild-diag.sh (cargo rustc -C remark=inline, separate
target-diag), ../tools/coldcheck.sh (why a cold callee is/ isn't inlined into execute).
