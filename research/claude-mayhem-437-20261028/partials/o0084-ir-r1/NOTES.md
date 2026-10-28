# o0084-ir-r1 (IR-first) notes

Base root `roots/base` = parent-436 + o84 x02 patch (inline signer seeds) on pump_interface_v2.rs.
- base: O0084 18104 B, 446 masked lines (x02 on 434 was 280; 436's state.rs sell_amounts(c,&cap) change re-opened cap region + CPI copy region).
- Tools: tools/b.sh LABEL ROOT [ir] (TS=n env picks target copy), tools/mk.py NEW BASE spec.json, tools/irx.py IR.ll exps/X.py (llc reproduces builds exactly).

## Results
- v01: cap passed as reference select `let cap=if key==default||key==WSOL{&g.field_2}else{&g.field_11}; sell_amounts(..,cap,..)`
  -> 17968 B, 242 lines, 436/441 no_losses. (base 446)
- IR e01 (lazy-ret-bb8): moving key loads to after retained check and compare chain + cap phi into the block after
  raw_quote unwrap gives exactly 18096 B (orig size) but 341 lines; original does compares AFTER the raw_quote udiv,
  cap ptr = (global+8) + {96|176} (unfolded add), key words loaded before mul and reused for `native` later.
- IR e01 k-keep / u2-b16 (exps/e01.py on out/v01.ll): keep key-word loads where v01 has them (bb9, cap statement), move the
  compare CFG + cap phi into bb8.i.i (after raw_quote unwrap), and use an UNFOLDED pointer: %gpd = gep(global_box,8)
  (=&GlobalParams) early, phi(96,176) offset, gep(gpd,phi) -> 166 lines (from 242), 17944 B. => the original computes the
  cap POINTER lazily at the `*cap` use inside initial_trade_output, from &GlobalParams + an early-copied quote key.
  Source idea: generic cap: C:Deref<Target=u64>, with a lazy QuoteCap{global:&GlobalParams,quote_mint:&Pubkey} Deref impl.
- Builds: v02/v04 (bitwise |) 324; v10/v11 (Deref QuoteCap lazy) 417; v15 (cap in initial_trade_output, &Pubkey, alwaysinline) 307.
- PRE-OPT pipeline (tools/pre.py: out/n01-noopt.ll [v01 built with -Cno-prepopulate-passes] -> mayhem-env opt default<O3> -> llc)
  reproduces v01 exactly (242). exps/capin.py models "cap selection inside initial_trade_output (ito2/sa2 copies)":
  * alwaysinline ito2: GEPs fold to box+104/184 -> 183..530.
  * ito2 NOT alwaysinline (plain/inlinehint; simplified before LLVM inlining) + arm GEPs (&gp.field_2 / &gp.field_11 in the
    if arms) + key BY VALUE (copied in handler, native uses same copy): ag-capfirst-val-ito = 114 lines, maxfirst 115.
  => source: `#[inline] fn initial_trade_output(vt,c,global_params:&GlobalParams,quote_mint:Pubkey,..)` with
     `let cap=if quote_mint==default||quote_mint==native_mint::ID{&global_params.field_2}else{&global_params.field_11};` (v16/v17).
- v16 BUILD (#[inline] ito, cap-first on line 351): O0084 115 lines (pre-opt predicted) BUT loses O0081/O0082 (legacy now
  does cap-min before max; buy_v2 handler keeps 2 out-of-line ito calls). -> v18 (#[inline], maxfirst) / v19 (inline(always), maxfirst).
- pre-opt: helper fn for just the cap select (ito alwaysinline) = 157-180, worse than whole-ito non-alwaysinline (111-115).
- pre-opt sl-*-1: rustc-like alloca slot for cap + then-arm block emitted after join -> cap phi orientation matches orig (111).
