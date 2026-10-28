# Current bases (coordinator-maintained; re-read at every checkpoint)

<!-- auto-newest:start -->
## Newest composites (auto from EVENTS.log, 03:57) — start new work here
Running lanes may stay on the base they started from; integrators compose deliveries made on any listed base.
- **mayhem: parent-441** 441/441 raw=441 (03:27) `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-441`
- **pump: L31** 990/1035 raw=166 (03:54) `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31`
- **pump layout layer (packets/raw only; lanes copy the source-only base above): L30+layout** 989/1035 raw=204 (03:47) `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L30/layout`
- **amm: union-760** 765/785 raw=160 (Linux source-only; native 760/151) (03:57) `/Users/shawwalters/amm100-run/lanes/mg-union/u760/src`; native frontier `/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json`
<!-- auto-newest:end -->

WM = /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
WP = /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
WA = /Users/shawwalters/amm100-run
REPO = /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source

## Mayhem (441 windows)  [updated 02:03]
- **LANE BASE: `WM/mayhem-env/parent-439`** (landed 01:58, lane mg-M-int; read-only: copy it, never write into any
  `mayhem-env/parent-*`) = Codex qualified438 + Claude O0077. 439/441 normalized, 141 raw; unmatched O0083 BuyV2,
  O0084 SellV2. Measure baseline: `WM/mayhem-b/out/builds/mgMint-p439-clean/symbols.so` (stripped e899e096…).
  BUILD it with `python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B WM/mayhem-env/tools/rbuild.py LABEL ROOT`
  (~20 s; compiles only programs/mayhem/src/** + idls/** against cached qualified dependency rlibs; every other file must
  equal parent-439). `mayhem-b/build/build_lane.py` cannot compile this tree. Details: `parent-439/README.txt`.
- Previous base: `WM/mayhem-env/parent-438` (read-only; copy it) = Claude parent-436 + O0079
  (sell_pump_swap.rs, PR #417) + O0077 (buy_pump_swap.rs + `#[inline(always)]` bought_amounts in pump_amm_interface.rs;
  lane r436/o0077-ir-r1/BEST). Symbols (incremental build): `WM/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so`.
  438/441 normalized. Unmatched: O0076 SweepFees (closed in Codex's tree), O0083 BuyV2, O0084 SellV2.
- Codex qualified438 on main 01:23 (REPO research/mayhem-current438-composition-20261028): 438/441, 141 raw,
  candidate b69ee99d…, symbols a4e4768d… (packet builds/first/symbols.so.gz) = qualified437 (O0076 SweepFees closed:
  GlobalParams passed as a separate method arg, named Rent locals, reused AccountInfo refs) + PR417's
  sell_pump_swap.rs (overrides/). Unmatched there: O0077, O0083, O0084.
- PENDING composite (lane mg-M-int): parent-439 = Codex qualified438 + Claude O0077 (buy_pump_swap.rs +
  pump_amm_interface.rs from r436/o0077-ir-r1/BEST). Remaining after it: O0083 BuyV2 (orig 140512, 18,648 B),
  O0084 SellV2 (orig 159160, 18,096 B).

## Pump main (1035 windows)  [updated 02:36]
- **NEWEST COMPOSITE: `WP/base/L17`** (02:26) = L16 + mg-P-z07-03 (0x7f010): **975/1035, 165 raw**. PR #425 = L15 (972).
- `WP/base/L16` (02:23) = L15 + mg-P-z01-01 (0x2d920) + mg-P-lib-04 (0x63cf0): **974/1035, 165 raw**,
  0 losses. Unmatched list: `WP/lanes/mg-P-int/remaining-c12.json`. New lanes start on L16. Deliveries on L13/L15/L16 all
  compose (the integrator merges against the base named in delivery.json).
- `WP/base/L15` (02:15) = L14 + mg-P-lib-03 (0x60ee0 0x806c8 0x93050 0x940c0) + mg-P-z02-02
  (0x3b8d8) + mg-P-z07-02 (0x7e490) + mg-P-z06-01 (0x6a1e0): **972/1035, 165 raw**, 0 losses. New lanes start on L15.
  Deliveries are immutable once written: never rewrite a delivery dir, write the next -NN.
- `WP/base/L14` (02:13, mg-P-int) = L13 + the Round46/47-only windows ported line-neutrally
  (0x43ea0 migrate::create_pool, 0x502f0 migrate_v2::create_pool via the anchor pump_amm CPI client, 0x68bd8
  validate_new_mint): **965/1035, 165 raw**. Round47 matches nothing else. Lanes already on L13 stay there (the
  integrator composes L13 deliveries onto L14); new lanes start on L14 (`--baseline WP/base/L14/inventory.json`).
- LANE BASE for running lanes: `WP/base/L13` (landed 02:08, lane mg-P-int) = L12 + all 12 round-5 deliveries: **962/1035, 165 raw**
  (55 of the 56 r5 gains; 0x857a8 dropped: coord's trade_v3:997 placement depended on the post_base narrowing that z07
  replaced). Score with `--baseline WP/base/L13/inventory.json`. L13 contains a nested path crate
  `pump/pump-token-ext/` whose Cargo.toml the harness rsync skips, so build L13-based trees with
  `python3 WP/lanes/mg-P-int/tools/nbuild.py --src <crate> --work <work> --out <out> --baseline WP/base/L13/inventory.json`
  (fastbuild + nested Cargo.toml copy + score; copy the tool, don't edit it). No Round46 ports yet (coming in L14).
- Previous base: `WP/base/L12` (= `WP/base/current`): layout composite on Codex Round37, 907 normalized / 165 raw
  (identity recipe; synthetic line layout labelled). Default scorer baseline = `WP/base/current/inventory.json`.
- Round-5 deliveries `WP/deliveries/r5-<lane>-NN` (latest per lane) gain 56 windows over L12 with no losses each
  (not yet composed). PENDING composite L13 (lane mg-P-int) -> up to ~963.
- Codex Round46 (REPO repro/pump/main-contract-round46-20261027): 823 normalized / 203 raw (genuine recipe).
  It matches 3 windows that L12+r5 do not (0x43ea0, 0x502f0, 0x68bd8) (lane mg-P-port46).
- Codex Round47 (REPO repro/pump/main-contract-round47-20261027, published 01:10): selected on main, 823 / 203 raw
  per status.json; lane mg-P-int checks whether it matches anything beyond L12 + r5 + Round46.
- Remaining unmatched in every artifact: 69 windows (list in `MR/state/pump-remaining.json`; its `remaining` key
  also holds the 3 Round46-only windows).

## PumpSwap AMM (785 windows)  [updated 02:24]
- **NEWEST COMPOSITE: union-750 `WA/lanes/mg-union/u750/src`** (02:20) = u744 + mg-A-4-03 (0x40100 0x40308 0x452e0
  0xb92c8) + mg-A-6-02 (0x51d08) + mg-A-7-02 (0x74b80) + a claim end_day order fix found by the runtime suite:
  **Linux 755/785, 159 raw; native 750/150**. Frontier `WA/shared/frontier/matched-union-750n.json`. Lanes on u744 may
  stay there (mg-A-int composes their patches); new lanes start on u750.
- **LANE BASE: union-744n `WA/lanes/mg-union/u744/src`** (landed 02:10, lane mg-A-int; read-only, `cp -c -R` it) = the
  733 chain + 16 windows (0x13458 0x1c890 0x1ef90 0x1fed8 0x22e88 0x2fb38 0x32750 0x44ab0 0x59408 0x5a570 0x5b5b8
  0x5c590 0x5dc20 0x6f3c8 0x73ef0 0xf2ed0): **744/785 native, 150 raw native; Linux v1.44 = 749/785, 159 raw** (02:16). Measure with
  `MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-union-744n.json ~/amm100-run/shared/tools/nbuild.sh <lane dir>`
  (a warm target: `cp -c -R WA/lanes/mg-base733/target <lane dir>/target`). Win patches: diff against u744/src.
- Previous base: `WA/lanes/mg-base733/src` (read-only; `cp -c -R` it) = the research chain head on main
  (REPO research/amm-fee-value-call-recovery, sources/candidate.tar.gz): Linux 733/785 normalized, 148 raw.
  Native build of it = 728 normalized / 139 raw (the 5 sysroot TypeId windows 0xa9b0 0xf8ca0 0x1016a8 0x10efd8
  0x111b38 only match on Linux). Measure natively with
  `MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-733n.json ~/amm100-run/shared/tools/nbuild.sh <lane dir>`
  (gains/losses are then relative to the 733 base).
- amm100 lane wins (`WA/shared/wins/*.patch`, made on the older 656 base) close 18 windows the 733 chain lacks
  (lanes mg-A-port*). Codex's selected checkpoint (REPO repro/pump_amm/native-scanners-recovery-20261028, 660/159 raw)
  additionally matches 0x73ef0.
- Codex moved its selected AMM checkpoint to REPO repro/pump_amm/create-pool-fields-recovery-20261028 at 01:23
  (still 660 / 159 raw; CreatePool work is active in Codex's work/amm-* dirs). Lane mg-A-int diffs its matched set.
- Remaining unmatched in every artifact: 33 windows (list in `MR/state/amm-remaining.json`, key `remaining_union`,
  which also holds Codex-only 0x73ef0).
