# mg-P-lib-03: L13 port of mg-P-lib-01/02 own windows: +0x806c8 +0x60ee0 +0x93050 +0x940c0

Base WP/base/L13 (962/165). Result 966 normalized / 165 raw; gains 0x60ee0 0x806c8 0x93050 0x940c0; losses none; raw losses none.
Build: mg-P-int nbuild.py (nested pump-token-ext crate), ok, runtime_valid, no stack warnings. synthetic_layout: true (layout-pad positioning).
Generator: lanes/mg-P-lib/tools/mk_s13.py + merge/nq.patch (trade_v3 hunk from mg-P-lib-01), applied to a copy of L13/pump.

Changes vs L13 (all line-neutral):
- trade_v3.rs: `net_quote_for_budget` helper at 310-329 (require_gt! at original lines 317/326), gross_up_quote header moved 295-298 ->
  378-381, v3 buy_exact_quote calls the helper (see mg-P-lib-01 README for the decoded semantics and behaviour note).
- pump_quote.rs: `pub fn root_seed(curve,&Global,control)` at 82-91 (error! QuoteBondingCurveNotEligible on line 90) + private
  `global_quote(quote: Pubkey, g)` at 78-80 (see mg-P-lib-02 README). create_v2.rs: private root_seed blanked, walk calls pump_quote::root_seed.
- multi_hop_curve_swap.rs: token_program_for results renamed base_token_program / quote_token_program and used as the CPI program;
  last-hop payout: buy -> transfer_base_out (0x93050), sell -> z08's transfer_quote_out with &quote_token_program (orig passes the
  same stack slot r10-0x7c8 as for the buyback); buyback -> transfer_buyback_out (0x940c0). The now-unused (from,mint,decimals)
  tuple was removed (3 lines blanked). Same CPIs as before (see mg-P-lib-02 README).
