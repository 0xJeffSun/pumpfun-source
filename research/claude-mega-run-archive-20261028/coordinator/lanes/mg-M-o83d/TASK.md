# Lane mg-M-o83d
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83d/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-o83d O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Window: O0083 = buy_v2 handler (orig 140512, 18,648 B; pump_interface_v2.rs)
Base: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-439` (439/441; read-only; `cp -c -R` it, never write into mayhem-env/parent-*).
Build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/rbuild.py LABEL ROOT`
(~20 s; build_lane.py cannot compile this tree; see parent-439/README.txt). Measure every candidate against
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/builds/mgMint-p439-clean/symbols.so`. Older lane roots were made on parent-436/438: port their diffs.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83d/` (roots, tools, logs). Use your lane name as build LABEL prefix and TARGET_NAME.
A WIN: the window normalized-equal (`winreport.py` 0 diff slots), `measure.py` `no_losses: true` vs your base, no
`Stack offset` warning, and a clean rebuild (fresh target) reproducing it. Then write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83d/BEST/` (full root
tree, `source.patch` vs your base, measure json, `NOTES.md` with the mechanism) and append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Partials: keep `BEST-partial/` current with the lowest-diff verified build and its numbers.
Shared code: O0083 and O0084 both go through `state.rs` `initial_trade_output`/`buy_amounts`/`sell_amounts`, which the
closed legacy windows O0081/O0082 also use, so every candidate must keep O0081/O0082 (measure.py shows it). Post any
change you make to shared helpers in FINDINGS.md so the sibling lanes (and the integrator) can compose.

Start from the newest composed partial: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/BEST-partial/` (g01 = o83c buy_v2 + o84c's c4 state.rs
hoist: O0083 3 masked / winreport 129, O0084 4 masked, 439, no losses). Read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83c/PROGRESS.md`,
`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84c/PROGRESS.md` and the FINDINGS.md lines from 02:35 on first. Sibling mg-M-o83c is still working the same
window: take a different angle and share mechanisms through FINDINGS.md.
Strategy: Different angle from o83c: (1) frame and alloca order: compare the original's frame layout with ours
(`llc -stop-after=prologepilog` on the lane IR, r436/o0083-port-r1/tools/frame.py), then find the source order of locals that
reproduces it; (2) register pressure across the event diamond: event construction with fewer simultaneously live values
(direct field stores, a let-block that ends temps early); (3) any MECHANISMS.md lever o83c has not logged as tried.
Sibling lane on the same window: mg-M-o83c (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o83c/PROGRESS.md` before long experiments; share mechanisms via FINDINGS.md).
