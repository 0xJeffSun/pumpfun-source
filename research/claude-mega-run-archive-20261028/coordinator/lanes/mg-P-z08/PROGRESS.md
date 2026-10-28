# mg-P-z08 progress (base L15 = 972/1035, 165 raw)
Lane dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08 (src/ = main tree, v/<name>/ = variants, vlog.txt = build log)
Tools: tools/st.py <so> [win[=symregex]] (window status/ratio), tools/vb.py NAME [--src] (build+score vs L15).

## Windows (L15 start)
- 0x89258 trade_fees 0.973 (2296 vs 2288 B); r5-z08 F_g3 form was 0.9857 equal length (2 `?` branch polarities swapped).
- 0x8bbd0 TradeEvent builder: none in L15 (0.145); r5-z08 R_b2 trade_event helper 0.587 (1808 vs 1800).
- 0xcd3d8 SetMayhemVirtualParams::try_accounts 0.514.
- 0x1367c0 set_params 0.289 in L15 (11296 B, fee-recipient loop inline); r5-z08 P_x1 = 0.983 (5632 vs 5624) with fee_recipient.rs helper.
- 0x138b20 create 0.232; r5-z08 c5 form 0.2935.
- 0x13b9b8 buy_v2 handler 0.150.

## Log
- 02:25 ported r5-z08 undelivered partials (R_b2: fee_recipient.rs set_fee_recipients + lib.rs set_params/create c5 +
  multi_hop/trade_v3 trade_event) onto L15 (patch applied cleanly). Build p0 in flight.
- 02:23 p0 (ported partials) = 972, no losses: set_params 0.983, trade_event 0.587, create 0.2935.
- 02:40 DELIVERED mg-P-z08-01 (973, +0x1367c0 set_params): minimal tree = L15 + fee_recipient.rs helper + lib.rs set_params
  (create/trade_event partials NOT included; they stay in src/ as partials). Mechanism: IR store order + checked chain at
  line 268 (see INSIGHTS). IR workflow: tools/irb.sh (IR build), tools/irv.sh (llc+compare per fn), gen/spv.py (multiplexed
  handler copies as unused pub fns -> present in IR).
- Main tree src/ = d01 changes + create c5 + trade_event b2 (partials).
- 03:00 DELIVERED mg-P-z08-02 (974, cumulative +0x1367c0 +0x89258). trade_fees: tuple-destructure + if/else override + return Ok.
  Dead ends for trade_fees: helper fn / block expr (0.954), nested-if / `!a||b==0` (=h1 0.973), if/else on fees field (select-ized 0.47),
  fees helper with CPI (0.43/0.49), tail Ok without return (0.90).
- Next: 0x8bbd0 trade_event (0.587 in src/), then 0xcd3d8 try_accounts (0.514), create (0.29), buy_v2 (0.15).
- 03:15 0xcd3d8 (SetMayhemVirtualParams::try_accounts): PARKED. Call sequence identical to the original (66 calls); residue is
  frame layout only (orig has one extra 32-byte stack slot => every slot from 0xa8 down is 0x20 deeper). Not pursued further.
- 0x8bbd0 trade_event: let order `vqr` before `rqr` -> 0.5959 (from 0.5869). Next: multiplexed literal-order search.
- 03:50 0x8bbd0 PARKED at 0.5959 (b0: `let virtual_quote_reserves=..;let real_quote_reserves=..;` before quote_mint/is_sol lets,
  declaration-order literal) / 0.5928 at equal length 1800 B (g2: quote_mint FIRST in the literal). Multiplexed IR search
  (gen/tev.py + gen/tev_vars.py, ~50 variants): literal order only moves value computations (stores stay in declaration
  order); let-bound selects, ix_name first/last, field-assign after literal, local quote_mint all worse or identical.
  Residue: end-group store order (orig descending 0x198..0x168, g2 ascending) + spill-slot numbering.
- 04:05 0x8bbd0 IR probes on g2 (quote_mint first): a lifetime marker next to the final quote_mint memcpy flips its store
  order + the end-group order (z10's mechanism): lifetime.start before it -> 0.6516 (101 slots), lifetime.end(%quote_mint)
  right after it -> 0.6244. Source form for that not found yet. Background random search over literal orders running
  (gen/tev_search.py, log v/search.log, state v/search_state.json).
- 03:29 DELIVERED mg-P-z08-03 (975 on L15, cumulative +0x1367c0 +0x89258 +0x8bbd0). 0x8bbd0 found by the random literal-order
  search (v/search.log: first MATCH r8k3). Main tree src/ = d03 + create c5 partial (lib.rs create, NOT delivered).
- Remaining: 0x138b20 create (0.29), 0x13b9b8 buy_v2 (0.15), 0xcd3d8 (parked).
- 03:45 create 0x138b20: call sequence = original (25 calls; the 0x1a04f8 stub is shared by sol_log_data/set_return_data);
  early curve-init store order already identical; residue = frame layout (orig zero-Pubkey temps at -0x288/-0xe0, ours
  -0x2f0/-0x148 => 0x68 B more allocas above them) + regalloc. Background form search running: gen/cr_search.py
  (dims: accounts borrow form, quote_mint/is_sol form, clone placement, seeds let/inline, `let a` form, Clock let),
  log v/cr_search.log, state v/cr_state.json.
- 03:55 create search stopped after 2 rounds: the source dims tried (borrow form, quote_mint/is_sol form, clone placement,
  seeds let/inline, Clock let) leave the frame unchanged (best 0.2753..0.2819 as copies; real c5 build 0.2935). Offset map
  (tools/offmap.py) shows the real gap: orig objects 0x38..0x288 sit 0x68 shallower than ours, and a small object
  (bytes at -0x2a6/-0x2a7 + 3 dwords) that the orig keeps deep (-0x2c0) is at our frame top (-0x40..-0x2e) => different
  inlining order of some callee (insight: frame order = inline order). Next idea: find which inlined callee owns that
  object (IR alloca list via tools/blocks.py / grep alloca) and move the corresponding source into a helper.

## STATE (end of session)
- Deliveries: mg-P-z08-01 (+0x1367c0), -02 (+0x89258), -03 (+0x8bbd0), cumulative on L15 => 975; integrator composed
  -03 into L29 (988).
- Best partials: create 0x138b20 0.2935 (src/ lib.rs c5 form, not delivered); buy_v2 0x13b9b8 0.15 (untouched);
  0xcd3d8 0.514 (parked).
- Main tree src/ = d03 + create c5. Tools: tools/{st,vb,irb.sh,irv.sh,llt.sh,irname,mvblk,sinkperm,memops,offmap,callseg,
  blocks,selchk}.py, gen/{spv,tfv,tev,tev_search,cr_search}.py.
