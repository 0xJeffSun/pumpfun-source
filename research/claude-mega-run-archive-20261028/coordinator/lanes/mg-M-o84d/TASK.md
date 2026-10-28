# Lane mg-M-o84d
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84d/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-o84d O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Window: O0084 = sell_v2 handler (orig 159160, 18,096 B; pump_interface_v2.rs)
Base: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-439` (439/441; read-only; `cp -c -R` it, never write into mayhem-env/parent-*).
Build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools/rbuild.py LABEL ROOT`
(~20 s; build_lane.py cannot compile this tree; see parent-439/README.txt). Measure every candidate against
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/builds/mgMint-p439-clean/symbols.so`. Older lane roots were made on parent-436/438: port their diffs.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84d/` (roots, tools, logs). Use your lane name as build LABEL prefix and TARGET_NAME.
A WIN: the window normalized-equal (`winreport.py` 0 diff slots), `measure.py` `no_losses: true` vs your base, no
`Stack offset` warning, and a clean rebuild (fresh target) reproducing it. Then write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84d/BEST/` (full root
tree, `source.patch` vs your base, measure json, `NOTES.md` with the mechanism) and append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Partials: keep `BEST-partial/` current with the lowest-diff verified build and its numbers.
Shared code: O0083 and O0084 both go through `state.rs` `initial_trade_output`/`buy_amounts`/`sell_amounts`, which the
closed legacy windows O0081/O0082 also use, so every candidate must keep O0081/O0082 (measure.py shows it). Post any
change you make to shared helpers in FINDINGS.md so the sibling lanes (and the integrator) can compose.

Start from `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/BEST-partial/` (c4: 4 masked, winreport 73, length equal, 439, no losses) or the newer
composed g01 in `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/BEST-partial/`. Read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84c/PROGRESS.md` (residual: a quote_vault_balance
spill-reload scheduled 64 B early and one zero-materialization mov; an IR event-join phi permutation reached 1 but was not mapped
to source) and the FINDINGS.md lines from 02:35 on. Sibling mg-M-o84c is still working the same window: take a different
angle and share mechanisms through FINDINGS.md.
Strategy: Different angle from o84c: map the phi-permutation result to source (which value enters the event join first
is decided by arm statement order and by which values are computed before the if-native split), and test whether the spill
moves when the quote_vault_balance value is produced by a different expression shape (e.g. reading through the account
reference vs a copied local). Frame/alloca order via `llc -stop-after=prologepilog` is the second lever.
Sibling lane on the same window: mg-M-o84c (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-o84c/PROGRESS.md` before long experiments; share mechanisms via FINDINGS.md).
