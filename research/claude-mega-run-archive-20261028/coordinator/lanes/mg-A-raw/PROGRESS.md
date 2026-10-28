# mg-A-raw progress (PumpSwap AMM whole-ELF / raw layout lane)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-raw (src = union-755 copy, tools/, lin/ = own Linux cargo-home/target).
Base: union-755 (Linux 760/785 raw 159; native 755/150), /Users/shawwalters/amm100-run/lanes/mg-union/u755/src.

## 03:35 start
- Read RULES, MECHANISMS, TASK, AMM LANE-RULES, findings, mg-M-raw PROGRESS + WIN-r441a NOTES, layout-r1, mg-A-int.
- u755 Linux (mg-A-int lin/out-u755): .text 0x11fc98 vs orig 0x11bb38 (+16736 B: unmatched windows), .rodata -144 B,
  .data.rel.ro +136 B, rel.dyn -7 entries. .rodata follows .text => every rodata lddw shifts until .text size parity.
- Plan: (1) Linux build that saves link inputs (cargo rustc -- -C linker=wrapper in the pinned podman image) + native
  relink replay; (2) correspondence + ordered.ld generator (.text/.rodata/.data.rel.ro, no padding);
  (3) raw-ready check (pad-mode diagnostic relink = end-state prediction); (4) line-neutral source edits for
  merged-pool (cst4/8/16/32, str) order residuals.

## 03:43 WIN-01 (recipe only, raw 159 -> 169 Linux, 0 losses) = L/WIN-01, shared/wins/mg-A-raw-01.{patch(empty),json}
Tools (L/tools): lbuild-raw.sh SRC OUT [LD] (Linux container build; root crate via `cargo rustc ... -- -C linker=/lw/lwrap-lin.sh`,
saves link inputs to OUT/link incl. APFS-cloned rlibs; without LD == mg-A-int out-u755 33d8823d/dd1d823b), relink.py
(native link-only replay, 3 s, == container link), lay.py (relayout.py binding refactor: --ld order script, --predict end-state
raw readiness by translating every differing call/lddw slot), cmp.py (norm+raw gains/losses vs base rows), whybad.py
(non-ready windows grouped by data atom), pool.py (merged pool piece order orig vs cand).
u755 + ordered.ld: 760/169 (+10: 0x8740 0x1011c8 0x101238 0x101268 0x101290 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10dcb0).
Raw can't rise further until .text size parity (rodata base shifts +16736 B; 25 unmatched windows).
End-state prediction: 694/760 matched raw-ready; 66 not ready, ALL data: .rodata.cst4 order (51 windows), cst32 (12),
cst8 (5), pump::ID vs pump_fees::ID objects (2). All calls translate correctly (unmatched windows bound by call propagation).
cst4 pieces = PumpAmmError variant u32 promoted for to_string() (+ 4-byte strings from deps); same 94-piece set, permuted
inside lld hash shards -> insertion (= rustc codegen/first-use) order differs -> needs source order edits.
