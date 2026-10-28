# mg-M-raw2 progress (Mayhem data / dynamic-section lane)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw2/ (tools/, out/)
Base: mg-M-o83c/BEST (441/441, raw 223) + mg-M-raw WIN-r441a recipe (raw 441/441).

## 03:3x start
- mg-M-raw r441a: .text/.rodata/.data.rel.ro/.dynamic all byte-equal to the original; remaining whole-ELF diff =
  .dynsym idx 7/8 swapped (orig sol_log_data, sol_memcpy_; cand sol_memcpy_, sol_log_data) -> .dynstr order and
  the type-10 .rel.dyn entries (sorted by sym index) follow. Coordinator assigned this residue to this lane.
- trace (tools/trace.py, --trace-symbol relink, diagnostic): main cgu.0 refs abort, sol_log_, sol_try_find_program_address,
  sol_panic_ (= dynsym 3-6); then libanchor_lang cgu.0 member refs sol_memcpy_ before sol_log_data (= cand 7/8).
- call sites (tools/syscall_sites.py): sol_log_data only in anchor_lang::solana_program::log::sol_log_data (0x999d8);
  sol_memcpy_ in <BpfWriter<&mut [u8]> as Write>::write (0x977a8) and compiler_builtins memcpy (0xaa590).
