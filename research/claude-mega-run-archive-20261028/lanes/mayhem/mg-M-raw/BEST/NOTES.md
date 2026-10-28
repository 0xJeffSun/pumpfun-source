# mg-M-raw BEST — Mayhem whole-ELF layout recipe on parent-439 (2026-10-28 03:2x)

Result: same 439/441 normalized, 141 raw, no losses of any kind vs `mgMint-p439-clean` (measure.json). Raw cannot rise
while O0083/O0084 differ in size (every remaining raw miss is a pure address shift, see below). What changed is the
end state: with this recipe **all 439 matched windows are raw-ready** (every call / lddw immediate translates to the
original target; `rawready.json`), and every .text/.rodata/.data.rel.ro object is in original order. With the Codex
q438 `ordered.ld` only the first 141 are raw and 15 windows + 90 .rodata + 37 .data.rel.ro objects are out of order.

## Build (two passes; both through the build lock)
1. `python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B tools/rbuild_raw.py LABEL ROOT` (any ordered.ld)
2. `python3 -B tools/gen_ordered.py WM/mayhem-b/out/builds/LABEL OUT.ld --assign O0083=6buy_v27handler --assign O0084=15sell_v2_handler`
   (drop the --assign flags once O0083/O0084 match: they then bind by correspondence)
3. `MGRAW_ORDERED=OUT.ld python3 WM/sbf_lock.py ... rbuild_raw.py LABEL2 ROOT` (= `tools/relink.py` output, verified).
`rbuild_raw.py` = mayhem-env/tools/rbuild.py + ordered.ld override + saved link inputs; unchanged otherwise
(control: parent-439 rebuild reproduces e899e096/5d18b89a). This tree: candidate 8354a31a…, symbols 12894b9f….

## Source changes (source.patch vs parent-439; line-neutral for every line-dependent site)
1. `lib.rs` lines 10-11: `pub mod instructions; mod account_wrapper;` / `pub mod state;` (instructions before state,
   as the original codegen order shows: burn/extend_account/... windows precede the state.rs windows). Fixes the
   .rodata.cst4 insertion order of 00/07 vs 04/05 (O0088 O0089 O0090 O0094 become raw-ready).
2. `instructions/extend_account.rs`: `handler` moved from lines 113-139 into the blank block 36-62, above
   `account_size` (whose require!/err!/slice sites keep lines 89/94/108). handler has no line-dependent code. rustc then
   codegens handler first, so its msg pieces (" bytes: ") are created before the account discriminators: fixes the
   .rodata.cst8 order (" bytes: " vs GlobalParams disc 79c1f857…; O0138 raw-ready).
3. `instructions/burn.rs` line 78: `if end_timestamp > current_unix_timestamp { return Err(anchor_lang::error!(BurnError::MayhemModeNotEnded)); }`
   instead of `require!(end_timestamp <= current_unix_timestamp, …)` (same line, same check/error). The switch successor
   order changes the MIR RPO, so the MayhemModeEnded (4) promoted is created before MayhemModeNotEnded (5) as in the
   original .rodata.cst4 (O0071 O0095 raw-ready). (`if !(..)`/`match` forms give identical objects to require!.)
Mechanism: merged sections (.rodata.cst4/8/16/32, .rodata.str1.1) are laid out by lld per hash shard in insertion
order, i.e. main-object constant creation order = rustc codegen order (items by DefIndex, blocks in RPO). The linker
script cannot reorder pieces inside them.

## Remaining whole-ELF differences (elfcmp.json, datamap.json)
- Consequences of O0083/O0084 (Codex buy_v2::handler 7640 B vs 18648; sell_v2_handler +8): .text -9824 = -11008 +8
  +1176 (spec_to_string, From<MayhemError>, buy_v2::math, drop_in_place: called only by buy_v2::handler); all
  shifts after O0083; str1.1 extra piece `…/instructions/buy_v2.rs` (+51), Lanon buy_v2 path; .data.rel.ro: 2
  buy_v2.rs:107 Locations instead of the original pump_interface_v2.rs:393/394 ones (O0084's 591/592 already bind);
  .rel.dyn +10 entries; e_entry/e_shoff/phdrs/.dynamic values.
- Independent: .dynsym/.dynstr order sol_log_data <-> sol_memcpy_ (and the type-10 .rel.dyn order that follows the
  dynsym index). Both syscalls are first referenced by the anchor_lang rlib member (its symtab has sol_memcpy_ @448
  before sol_log_data @515); in the original sol_log_data was inserted first. Not fixable by ordered.ld; needs the
  original anchor_lang object (or an earlier member/main-object reference to sol_log_data).

**Superseded (03:24) by ../WIN-r441a** (same recipe applied to the 441 tree: raw 441/441).
