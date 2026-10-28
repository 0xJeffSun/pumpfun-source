# o0083-ir-r1 (O0083 = buy_v2 handler, orig 140512-159160, 18648 B)
- v1 mirror of 436 sell_v2_handler: 1107 sdiff slots, no losses.
- v3 port of ir-o83 best-24 buy_v2_handler (tools/mkb24.py, cap as &field ref): 170 slots, no losses.
- v4 = v3 + cap selection moved into state::initial_trade_output (gp + quote_mint by value, legacy passes Pubkey::default(); tools/capin.py maxfirst): 162 slots, no losses. BEST/.
- v5 capfirst ordering: 118 slots on O0083 but loses O0081/O0082 (rejected).
- Open: original O0083 does cap select+min before retained/max, legacy O0081 does max first. Need a source form giving both.
- llc on full-module IR reproduces candidate exactly (tools/llc83.py), ~4 s per experiment.
