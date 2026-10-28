# Lane mg-M-o84c
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84c/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-o84c O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Window: O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)
Base: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-439` (439/441; read-only; `cp -c -R` it, never write into mayhem-env/parent-*).
Build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/rbuild.py LABEL ROOT`
(~20 s; build_lane.py cannot compile this tree; see parent-439/README.txt). Measure every candidate against
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/builds/mgMint-p439-clean/symbols.so`. Older lane roots were made on parent-436/438: port their diffs.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/` (roots, tools, logs). Use your lane name as build LABEL prefix and TARGET_NAME.
A WIN: the window normalized-equal (`winreport.py` 0 diff slots), `measure.py` `no_losses: true` vs your base, no
`Stack offset` warning, and a clean rebuild (fresh target) reproducing it. Then write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/BEST/` (full root
tree, `source.patch` vs your base, measure json, `NOTES.md` with the mechanism) and append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Partials: keep `BEST-partial/` current with the lowest-diff verified build and its numbers.
Shared code: O0083 and O0084 both go through `state.rs` `initial_trade_output`/`buy_amounts`/`sell_amounts`, which the
closed legacy windows O0081/O0082 also use, so every candidate must keep O0081/O0082 (measure.py shows it). Post any
change you make to shared helpers in FINDINGS.md so the sibling lanes (and the integrator) can compose.

Start from `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/BEST-partial/` (r3: 7 masked slots, 439, no losses, O0081/O0082 kept; source.patch =
state.rs + pump_interface_v2.rs; composes with the O0083 partials). Read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84b/PROGRESS.md`, its NOTES.md
and the 02:4x-03:0x FINDINGS.md lines first. Its IR baseline `out/r3.ll` reproduces r3 exactly via llc (`tools/rbuild_ir.py`,
`bir.sh`, `irx.py`). Residue: the cap ldxdw pair scheduled 56 B late, one arm ldxdw 64 B early, one fresh `mov64 0` near the
end. o84b found the structural IR levers that closed O0077/O0079 (phi order, lifetime.start placement, block-let, store order)
neutral here and called the rest scheduler/RA-bound; treat that as an open question.
Strategy: Attack the residue through what the scheduler and register allocator actually consume: alias metadata and
attributes on the loads/stores involved, value types (i64 vs ptr loads, struct vs scalar), and the order and count of
basic blocks feeding the region. Change one thing at a time in IR, score with llc, then map the winning change to source and
build (rbuild.py). A source change that adds dead ops is not admissible (Mayhem: no padding of any kind). Alias-metadata lever (untested so far for O0083/O0084): the
machine scheduler and register allocator order loads/stores by alias analysis, so `noalias` / `!alias.scope` / `!noalias`
metadata, `readonly`/`dereferenceable`/`nonnull` attributes and TBAA decide which loads may move past which stores. Test in IR
first (add/remove those on the residue's loads and the function args, llc, score), then map a winning change to a reference-type
choice in source: `&AccountInfo` vs `&UncheckedAccount` vs `&Account<T>` vs `.as_ref()`, `&T` vs `&mut T` vs by-value Copy, a
`Pubkey` by value vs `&Pubkey`. That is exactly how Fees closed its last window (rent as `&UncheckedAccount` instead of a
noalias `&AccountInfo` removed scoped-noalias reuse and reproduced the original register allocation; PR #392).
Sibling lane on the same window: mg-M-o83c (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83c/PROGRESS.md` before long experiments; share mechanisms via FINDINGS.md).
