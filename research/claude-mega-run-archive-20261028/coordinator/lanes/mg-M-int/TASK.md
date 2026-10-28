# Lane mg-M-int
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-int/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-int O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Role: Mayhem integrator and banker. You own every Mayhem PR of this run (window lanes never push).
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/`. PR/packet template: `research/claude-mayhem-437-20261028` on origin/main (PR #417) and
the r436 bank agent's last message in `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/state/workflow-agents.json` (description `bank-436`).

1. Materialize Codex qualified438 from origin/main `research/mayhem-current438-composition-20261028` (read-only: `git -C REPO
   show/archive`). `composed-inputs.json` lists every input file with sha256; the parent is
   `research/mayhem-current437-composition-20261028`; the only override is `overrides/src/instructions/sell_pump_swap.rs`.
   Reproduce the tree exactly (check every sha256) under your work dir.
2. Build it with the WM build wrapper; measure against the packet's `builds/first/symbols.so.gz`: expect 438. Note whether
   your bytes equal Codex's candidate b69ee99d… (its builds use `builds/first/{linker.py,ordered.ld}`); explain any difference.
3. Compose parent-439 = codex438 + Claude O0077 (`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0077-ir-r1/BEST/source-vs437.patch`: buy_pump_swap.rs handler +
   `#[inline(always)]` on pump_amm_interface::bought_amounts). First check codex438's copies of those two files against
   parent-437's; resolve any difference. Build, measure vs codex438 symbols: target 439, gains [O0077], no_losses; clean
   rebuild (fresh target) must give identical bytes.
4. Publish `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/parent-439` (tree, read-only from then on) and the symbols path; append
   `HH:MM BASE mayhem parent-439 439/441 raw=<n> path=<tree>` to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
5. Runtime: copy the packet's controllers (run_trades.py, run_initializer.py, run_sweeps.py, run_target_rates.py and their
   inputs) into your work dir and run them against the 439 candidate with `/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python -B`. Never write
   into REPO. Record cases / mismatches.
6. Package `research/claude-mayhem-439-20261028/` like #417 (honest README counts: normalized, raw, unmatched, whole-ELF
   unequal; SHA256SUMS; verify.py + test_verify.py that check counts from saved artifacts; candidate + symbols; source.patch
   vs codex438; measure json; runtime summary). Make a sparse worktree from origin/main inside your work dir
   (`git -C REPO worktree add --no-checkout -b claude/mayhem-439-20261028 <dir> origin/main`, then
   `git -C <dir> sparse-checkout set --cone docs research/claude-mayhem-437-20261028 research/<your packet>`; create
   worktrees sequentially). Run verify.py/test_verify.py with `HOME=<empty dir> python3 -I -B`. Commit (end the message with
   `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create` (body ends with
   `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append `HH:MM PR mayhem #<n> ...` to EVENTS.log.
   A bulk-merger merges mergeable PRs within minutes; that is expected.
7. Banker loop: watch `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log` for Mayhem WIN lines (mg-M-o83a/b, mg-M-o84a/b, mg-M-raw). Compose each onto the
   newest parent (440, then 441), verify no losses, clean build, runtime, PR each new count, publish parent-44x + BASE line.
   When 441/441 normalized lands, work with mg-M-raw on whole-ELF identity and bank that too.
