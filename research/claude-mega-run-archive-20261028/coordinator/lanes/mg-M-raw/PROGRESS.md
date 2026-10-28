# mg-M-raw progress (Mayhem raw / whole-ELF layout lane)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw/
Base: parent-438 (WM/mayhem-env/parent-438, symbols WM/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so); parent-439 when listed.

## 01:45 start
- Read RULES, TASK, r436 RULES/FINDINGS, TECHNIQUES. Extracted Codex 438 link recipe to work/codex438/.
- Original: .text 0x120 size 0xac8b8 (706744), .rodata 0xac9d8 size 0x47dc immediately after text.
- Codex438 cand .text 0xa9ff0 (-10440), .rodata 0x4844 (+104); parent-438 .text 0xaa288 (-9776), .rodata 0x4854 (+120).
  => every .rodata lddw shifts in all windows; raw=141 is mostly shift, needs separation.

## 02:5x resumed on parent-439 (coordinator message)
Tools (WM/mega/mg-M-raw/tools): elfcmp.py (whole-ELF section table + window correspondence + raw-mismatch classes),
rbuild_raw.py (copy of mayhem-env/tools/rbuild.py: MGRAW_ORDERED=<ld> override + saves link inputs; control build
mgMraw-p439-ctl reproduces e899e096/5d18b89a), relink.py (link-only replay, 0.3 s; control reproduces same hashes),
gen_ordered.py (ordered.ld generator: .text by window correspondence + .rodata/.data.rel.ro by datamap binding),
datamap.py (data object binding: lddw anchors + pointer propagation + content search), mergechk.py/pieceq.py
(merged-section piece order), callq.py, modseq.py. Durable inputs copied to mg-M-raw/inputs (mayhem-b/wt -> /private/tmp!).
Findings on parent-439 (mgMint-p439-clean, Codex q438 ordered.ld):
- .text: 15 windows out of original order (O0005, O0092-93, O0113-O0123, O0133: stale names -> *(.text*) tail).
  gen_ordered fixes all (out_of_order 0); raw stays 141 (nothing else possible while O0083/O0084 differ in size).
- text delta -9824 = O0083 cand (Codex buy_v2::handler 7640 vs 18648) + O0084 (+8) + 4 cand-only fns (1176 B:
  spec_to_string, From<MayhemError>, buy_v2::math, drop_in_place) all called only by Codex buy_v2::handler.
- .rodata/.data.rel.ro: 90 / 37 objects out of original order in Codex recipe; generated order -> 0. Merged sections
  (.rodata.cst8 first at 128, str1.1 at 232, cst4, cst32, cst16) placed at original positions.
- Remaining data diffs are consequences of Codex O0083 (buy_v2.rs path piece +51 in str1.1, Lanon buy_v2 path, 2
  buy_v2.rs:107 Locations; orig has pump_interface_v2.rs:393/394 Locations) EXCEPT: cst8 2 pieces swapped
  (" bytes: " vs GlobalParams discriminator 79c1f857..), cst4 2 pairs swapped (04,05 burn::handler vs 00,07 state.rs)
  = main-object constant creation order (rustc codegen order: original emits instructions before state), and
  .dynsym/.dynstr sol_log_data<->sol_memcpy_ (both first referenced by the anchor_lang rlib member, whose symtab has
  sol_memcpy_ first) -> also permutes type-10 .rel.dyn entries.

## 03:18 recipe result (BEST = WM/mega/mg-M-raw/BEST, NOTES.md there)
- gen_ordered (text+rodata+data.rel.ro) on parent-439: out_of_order 0 everywhere; raw 141 unchanged, no losses.
- Merged-piece residuals fixed with line-neutral source edits (all measured 439, no losses):
  msA lib.rs instructions before state (cst4 00/07), ea1 extend_account handler above account_size (cst8),
  b3 burn.rs:78 `if end > now { return Err(error!(NotEnded)) }` (cst4 04/05; require!/if-not/match forms give identical
  objects, only the inverted comparison changes MIR successor order).
- tools/rawready.py: end-state prediction (translated immediates + merged-piece order by content):
  p439+gen 432/439 ready; +msA 436; +ea1 437; +b3 439/439. Two-pass real build mgMraw-b3-gen == relink (8354a31a).
- Remaining independent: dynsym sol_log_data/sol_memcpy_ (anchor_lang rlib symtab order). Consequences: O0083/O0084.
- Dead ends: b1/b2 (if-not / match forms of the burn deadline check) = byte-identical to require!.
Next: (a) re-run gen_ordered on the o83c/o84c trees as they close (verify their objects bind, no --assign needed);
(b) dynsym: check whether another anchor_lang rlib build (Codex work dirs) has sol_log_data first; (c) transplant
end-state proof (Fees-style) if time allows.

## 03:24 RAW WIN on the 441 tree (coordinator: O0083/O0084 closed in mg-M-o83c, raw 223)
- control rebuild of o83c BEST root with rbuild_raw = 44e4f540/7d033473 (their x01c). Sizes of every section now = orig.
- gen_ordered alone: raw 223 -> 434 (q438 list stale for 27 windows incl. O0083 O0138-148); + my 3 edits: raw 441/441,
  no losses (vs x01c and vs p439-clean). Two-pass real build mgMraw-r441a-gen = relink: 380157fa / 5fda6745.
- WIN saved: WM/mega/mg-M-raw/WIN-r441a (root, source.patch vs o83c root, ordered.ld, measure, elfcmp, tools, NOTES).
## Section-by-section (r441a vs deployed.so[:775416]; tail 1,992 B zero)
  header/phdrs EQUAL | .text EQUAL | .rodata EQUAL | .data.rel.ro EQUAL | .dynamic EQUAL | .shstrtab EQUAL | shdrs EQUAL
  .dynsym 1 B | .dynstr 20 B | .rel.dyn 9 B (entries 2537-2539) = sol_log_data/sol_memcpy_ dynsym order (anchor_lang
  member symtab: sol_memcpy_@448 before sol_log_data@515; all 12 local anchor_lang rlib builds same).
Next: dynsym order (only remaining 30 bytes).

## 03:28 dynsym (last 30 B) — shared with mg-M-raw2 (split posted in FINDINGS: I take dependency/link side)
- DIAGNOSTIC (not deliverable): relink of r441a objects + one GC'ed extra object naming sol_log_data, placed after the
  main CGU object -> stripped ELF == deployed.so[:775416], 0 differing bytes (diag/x1, sha 9af9e3b1). So the 30 B are
  purely the insertion order: original named sol_log_data after sol_panic_ (main object symtab, after custom_panic) or in a
  member extracted before anchor_lang.
- Link side dead: ordered.ld can't change insertion; EXTERN(sol_log_data) -> slot 1, 488 B diff (diag/e1,e2); input order is
  rustc's; no rlib except anchor_lang names the syscall (anchor 1.0 wrapper; write_all is a local impl method defined
  before solana_program::log in anchor lib.rs, so every anchor_lang build names sol_memcpy_ first).
- Remaining candidate: a main-crate (or curve_accounts) construct that references the sol_log_data syscall after
  custom_panic without changing .text — mg-M-raw2's side; beware the no-dead-code admission rule.
