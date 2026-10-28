# mg-M-raw WIN r441a — Mayhem raw 441/441 (+218 raw), whole meaningful ELF = original except 30 bytes

Base: mg-M-o83c BEST (441/441 normalized, raw 223; build mg-M-o83c-x01c, stripped 44e4f540…, symbols 7d033473…).
This tree = that root + 3 line-neutral source edits (source.patch) + the generated link script `ordered.ld`.

Build (both passes through the lock; rbuild_raw.py = mayhem-env/tools/rbuild.py + MGRAW_ORDERED override + saved
link inputs, otherwise identical — control rebuilds of parent-439 and the 441 root reproduce e899e096 / 44e4f540):
  1. python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B tools/rbuild_raw.py LABEL root
  2. python3 -B tools/gen_ordered.py WM/mayhem-b/out/builds/LABEL ordered.ld        (no --assign needed: 441 bind)
  3. MGRAW_ORDERED=ordered.ld python3 WM/sbf_lock.py ... tools/rbuild_raw.py LABEL2 root
Result (mgMraw-r441a-gen, = link-only replay tools/relink.py): stripped 380157fa6a63e717bd1630c6c4a86a4b66b596caedab6769d4497c8fa2b8d2a9
(775,416 B = the original's meaningful extent), symbols 5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448, no Stack-offset warning.
measure.py vs x01c: 441 -> 441, raw 223 -> 441 (raw_gains 218), edges 4768, Source 519, no_losses true.
measure.py vs mgMint-p439-clean: 439 -> 441 (+O0083 +O0084, from o83c), raw 141 -> 441, no_losses true.

## Whole-ELF comparison (elfcmp.json; original = deployed.so[:775416], tail all zero)
ELF header, program headers, .text, .rodata, .data.rel.ro, .dynamic, .shstrtab, section headers: byte-identical.
Remaining 30 bytes: .dynsym 1 B (st_name of entry 8), .dynstr 20 B, .rel.dyn 9 B (entries 2537-2539) — all one fact:
the dynamic symbol order of `sol_log_data` / `sol_memcpy_` is swapped (original: sol_log_data = 7, sol_memcpy_ = 8;
the 3 type-10 relocations are sorted by symbol index). lld inserts syscall names in first-reference order; in this
link both are first referenced by the anchor_lang rlib member, whose symtab has sol_memcpy_ (@448, from
<BpfWriter as io::Write>::write_all, a non-local instance emitted first) before sol_log_data (@515, the local
anchor_lang::solana_program::log::sol_log_data wrapper). All 12 anchor_lang rlib builds found on this machine have that
order. Not a .text/.rodata/data-layout issue; needs the original's dependency object / reference order.

## What each change does
- ordered.ld (tools/gen_ordered.py): .text in original window order (Codex q438 list was stale for 27 windows here:
  O0005 O0083 O0092-93 O0113-123 O0133 O0138-148 fell into *(.text*)), plus explicit .rodata and .data.rel.ro lists
  in original object order (bound by lddw anchors, pointer propagation, content) with the merged synthetic sections
  (.rodata.cst8 at 128, .rodata.str1.1 at 232, cst4, cst32, cst16) placed at their original positions.
  Alone it gives raw 434 (the 7 left are merged-piece order).
- lib.rs 10-11: `pub mod instructions; mod account_wrapper;` / `pub mod state;` (original codegen order: instruction
  modules before state.rs) -> .rodata.cst4 pieces 00/07 after 04/05 (O0088 O0089 O0090 O0094).
- extend_account.rs: handler moved into the blank lines 36-62 above account_size (account_size's line-dependent sites
  89/94/108 unchanged; handler has none) -> rustc codegens handler first, " bytes: " precedes the account
  discriminators in .rodata.cst8 (O0138).
- burn.rs:78: `if end_timestamp > current_unix_timestamp { return Err(anchor_lang::error!(BurnError::MayhemModeNotEnded)); }`
  (was `require!(end_timestamp <= current_unix_timestamp, ...)`, same line/check/error) -> MIR successor order makes
  MayhemModeEnded's promoted constant precede MayhemModeNotEnded's in .rodata.cst4 (O0071 O0095).
  (`if !(..) {} else` / `match` forms compile to the same object as require!; only the inverted comparison moves it.)
Merged sections are laid out per hash shard in insertion order = main-object constant creation order (rustc codegen
order), which a linker script cannot change; hence the three source edits.
