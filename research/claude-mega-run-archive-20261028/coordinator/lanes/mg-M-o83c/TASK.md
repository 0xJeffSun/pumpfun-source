# Lane mg-M-o83c
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83c/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-o83c O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Window: O0083 = buy_v2 handler (orig 140512, 18,648 B; pump_interface_v2.rs)
Base: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-439` (439/441; read-only; `cp -c -R` it, never write into mayhem-env/parent-*).
Build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/rbuild.py LABEL ROOT`
(~20 s; build_lane.py cannot compile this tree; see parent-439/README.txt). Measure every candidate against
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/builds/mgMint-p439-clean/symbols.so`. Older lane roots were made on parent-436/438: port their diffs.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/` (roots, tools, logs). Use your lane name as build LABEL prefix and TARGET_NAME.
A WIN: the window normalized-equal (`winreport.py` 0 diff slots), `measure.py` `no_losses: true` vs your base, no
`Stack offset` warning, and a clean rebuild (fresh target) reproducing it. Then write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/BEST/` (full root
tree, `source.patch` vs your base, measure json, `NOTES.md` with the mechanism) and append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Partials: keep `BEST-partial/` current with the lowest-diff verified build and its numbers.
Shared code: O0083 and O0084 both go through `state.rs` `initial_trade_output`/`buy_amounts`/`sell_amounts`, which the
closed legacy windows O0081/O0082 also use, so every candidate must keep O0081/O0082 (measure.py shows it). Post any
change you make to shared helpers in FINDINGS.md so the sibling lanes (and the integrator) can compose.

Start from the shared verified partial of the two earlier O0083 lanes (identical builds, symbols 1c208134…):
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/BEST-partial/` and `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83b/BEST-partial/` (19 reg-masked slots: cap region 8 + event
region 11; 168 winreport slots incl. frame offsets; 439, no losses). Read both lanes' PROGRESS.md (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83a/`,
`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83b/`) and their NOTES.md first: they record the TradeCap mechanism, the IR proofs and every dead end.
Both concluded the residue is a source floor because legacy and v2 share the generic `initial_trade_output` (one monomorph
per cap type) and the `10000 - retained` subtraction is hoisted only in the v2 monomorph. Treat that as an assumption to
test, not a fact: earlier windows (O0076, O0077, O0079) had residues that also looked like pure scheduling and closed.
Strategy: (1) IR to exact first: on the lanes' faithful IR (`ir/r5b.ll` or `ir/r2_438.ll`; llc reproduces the build), find the
minimal set of IR edits that gives llc posdiff 0 for the whole window (o0077-ir-r1 needed 6 edits; see its NOTES.md), including
frame/alloca order (`-stop-after=prologepilog`, `r436/o0083-port-r1/tools/frame.py`). (2) For each edit, find an ordinary source
form that produces it. Structural alternatives the earlier lanes did not try: a separate non-generic v2 helper (e.g. defined
next to the v2 handlers, so its schedule is independent of the legacy monomorph and the pinned state.rs:321 Source record stays
put), the cap/retained computation placed in the handler instead of a helper, by-value vs by-reference GlobalParams, and the
event built in the arms instead of the join block. (3) Build with rbuild.py, verify 440 + no_losses + clean rebuild. Alias-metadata lever (untested so far for O0083/O0084): the
machine scheduler and register allocator order loads/stores by alias analysis, so `noalias` / `!alias.scope` / `!noalias`
metadata, `readonly`/`dereferenceable`/`nonnull` attributes and TBAA decide which loads may move past which stores. Test in IR
first (add/remove those on the residue's loads and the function args, llc, score), then map a winning change to a reference-type
choice in source: `&AccountInfo` vs `&UncheckedAccount` vs `&Account<T>` vs `.as_ref()`, `&T` vs `&mut T` vs by-value Copy, a
`Pubkey` by value vs `&Pubkey`. That is exactly how Fees closed its last window (rent as `&UncheckedAccount` instead of a
noalias `&AccountInfo` removed scoped-noalias reuse and reproduced the original register allocation; PR #392).
Sibling lane on the same window: mg-M-o84c (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84c/PROGRESS.md` before long experiments; share mechanisms via FINDINGS.md).
