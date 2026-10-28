# mg-P-raw progress (main-Pump whole-ELF layout / raw lane)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-raw/ (src/, work/, tools/)
Start base: WP/base/L28 (987/1035, raw 166). Baseline inventory WP/base/L28/inventory.json.

## 03:29 start
- Read RULES, MECHANISMS, TASK, LANE-RULES, mg-M-raw PROGRESS. Next: read earlier Pump layout work (integ-layout, integ,
  research/pump-linux-link-layout-20261027), copy Mayhem tools, measure L28 raw baseline + section deltas.

## 03:44 tools + first WIN (mg-P-raw-01, raw 166 -> 204, recipe only)
Tools (WP/lanes/mg-P-raw/tools): pbuild.py (fastbuild identity + nested manifests + link hook rwrap.py/plink.py:
records link inputs, map, replay.json; --ordered replaces the SDK script; control reproduces L28 74345f6a/f23fc43f),
prelink.py (link-only replay ~1 s), pk.py (ELF/windows/correspondence incl. duplicate-group refinement by call
targets, data content, incoming calls), pbind.py (unmatched windows -> candidate fns via matched callers: 31/48),
pdatamap.py (data object binding), pgen.py (ordered.ld generator .text/.rodata/.data.rel.ro), prawready.py
(end-state raw prediction), unbound.py (explains unbound data objects), mkdeliv.py.
- L28 default link: main-object function order is locally scrambled vs original (LIS 320/577); non-local items
  (generic instances, sorted by symbol name incl. crate-hash) first, then local items by DefIndex (source order).
- generated ordered.ld: raw 204 (+38), 0 losses; real two-pass build == relink (c528c1ea/d9699192).
- raw-ready prediction 922/987 (+21 only-unbound-data). Not ready: cst4 merged-piece order (41 windows),
  panic Location line/col/file (21 windows; .data.rel.ro objects unbound because line/col differ), 3 windows
  calling duplicate generic instances (Account/Program::try_accounts) the original lacks, 1 wrong .rodata object.

## 03:52 WIN mg-P-raw-02 (raw 204, raw-ready 922 -> 952): lib.rs mod order = original codegen order
- PumpError constants: every error!(PumpError::X) passes &PumpError::X (promoted 4-B const, .rodata.cst4) to
  PumpError::name. lld -O1 merges cstN pieces by xxh3 shard ((xxh3_64 & 0xffffffff)>>27), then first-occurrence
  (= rustc creation = codegen order). Verified both ELFs shard-sorted (tools/cst.py, fu2.py, firstuse.py).
- Original local codegen order = module files alphabetically (buy_v2, create_v2, creator/*, extend_account,
  fee_recipient, migrate, migrate_v2, multi_hop_curve_swap, pump_quote, quote_control, sell, sell_v2, srfr, sweep_fees,
  token_incentives, trade_v3, util) then lib.rs items, then derive impls (same module order), then #[program] items.
- e1 = lib.rs lines 1-66 reordered (line-neutral): merge_order windows 41 -> 10, cst4 shards differing 23 -> 12.
  Remaining: admin_cto/sell.rs/migrate_v2/trade consequences (unmatched), create_v2.rs item order (execute before
  nested_create), fee_recipient nested in sell.rs, PumpError 42 created early in orig (non-local closure instance?),
  RouteFeeConfig AccountDeserialize creates &ErrorCode 3001/3003 (orig never).
- cst32: cand-only "programs/pump/src/set_creator.rs" (32 B path; original has creator/set_creator.rs and
  creator/set_metaplex_creator.rs) + 052ae5d7.. piece; orig-only "Nothing to s..." (unmatched user).
- Panic Locations (.data.rel.ro {file,line,col}) differ for 21 matched windows (e.g. volume_accumulator.rs 119:28 vs
  orig 436:28; curve_quote_payments.rs vs orig lib.rs:1442) -> need line/col/file layout (layout-pass input).
