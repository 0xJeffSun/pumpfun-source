# Round r436 — Mayhem final windows (started 2026-10-27 ~23:30 PDT)

Goal: close the last 5 unmatched Mayhem windows. Every window must be **normalized-identical** to the deployed original with **no losses**. After that comes whole-ELF identity.

## Frontier
- **Base:** 436/441, `W = /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work` (durable; never use /tmp for state).
- **Base tree:** `W/mayhem-env/parent-436`. It is read-only: copy it with `cp -R` and never edit it in place. It is lane pl-o82's `v/final2-434`, i.e. parent-434 plus O0081 and O0082 closures in buy_pump_swap.rs, buy_v2.rs, pump_interface.rs, pump_interface_v2.rs, sell_pump_swap.rs and state.rs.
- **Base build:** `W/mayhem-b/out/builds/pl-o82-final2-434/{candidate.so,symbols.so}`. Stripped is e93b60f1…, symbols 49d70dc7….
- **Unmatched windows** (original start / size / candidate symbol pattern):
  - O0076: 77200 / 8400 / `sweep_fees` (mayhem_recovered10sweep_fees17)
  - O0077: 85600 / 9736 / `buy_pump_swap7handler`
  - O0079: 95848 / 17312 / `sell_pump_swap7handler`
  - O0083: identify it with `measure.py` + `winreport.py`; it is the buy-side window after O0082 (127520–140512)
  - O0084: 159160 / 18096 / `sell_v2_handler`
- **Original:** `W/mayhem-b/wt/evidence/original/mayhem/deployed.so`.

## Build (always under the shared slot lock)
```
python3 W/sbf_lock.py --slots 6 --name sbf -- \
  python3 -B W/mayhem-b/build/build_lane.py <LABEL> <ROOT> <TARGET_NAME>
```
- `ROOT/programs/mayhem/Cargo.toml` is the crate. Output lands in `W/mayhem-b/out/builds/<LABEL>/{candidate.so,symbols.so,stderr,result.json}`.
- Make LABEL unique and lane-prefixed. Use your own TARGET_NAME (= lane name) so incremental builds take seconds.
- `LANE_CLEAN_ANCHOR=0` skips re-cleaning anchor (faster). Clean-build a final candidate once before reporting.
- **Reject** any build whose stderr contains `Stack offset` … `exceeded max offset`.

## Measure
```
python3 -B W/mayhem-b/build/measure.py <cand symbols.so> W/mayhem-b/out/builds/pl-o82-final2-434/symbols.so --json out.json
python3 -B W/mayhem-b/build/winreport.py <cand symbols.so> O0076 ...
```
- `measure.py` reports matched counts, gains and every loss kind.
- `winreport.py` gives per-window size, normalized equality, diff ratio and slot count.
- Add a window to its W list if missing. Lane tool dirs have richer diffs: `W/ir-o77/tools/{hunks.py,core.py,irx.py}`, `W/mayhem-b/build/{bindiff.py,mdiff.sh,irsurg.py,irexp.py,odis.py}`, `W/pl-o82/{irsurg.py,bindiff.py}`.

## Prior work: read it first, don't redo it
- Proven techniques: `W/TECHNIQUES.md`.
- Coordinator history: `W/LANES.md`.
- **pl-o82 (closed O0081 + O0082 this way, so study its diffs):** `W/pl-o82/` (ablations.json, m-*.json, v/*). `diff -r W/mayhem-env/parent-434 W/mayhem-env/parent-436` shows the exact closing edits.
- **O0076:** `W/mayhem-o76/`. mayhem-b found it needs an IR branch on `native` before the loop (llc 0.28→0.908).
- **O0077 / O0081 / O0083:** buy IR workflow, `W/ir-o77/` (tools, edits, evb/f/g/v text dumps).
- **O0079:** `W/mayhem-o79/` + branch `origin/claude/mayhem-o79-20261027` (2fa030af2). g4n1 has the first 14,608 B of 17,312 exact (event dispatch order, no native_accounting). Builds o79-g5n* are its latest.
- **O0084:** `W/o84/` + branch `origin/claude/pump-mid-20261027-latest` (20d7ea26a, x02 = 280 diff lines). Remaining: event tail ~100, post-CPI drop 14, price check 37, sell_amounts cap ~105.
- **Main-repo packets (read only):** `REPO/research/*mayhem*`, `REPO/docs/MAYHEM-PARALLEL-WORK.md`. REPO = /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source; `git -C REPO show origin/main:<path>` reads main.
- **Codex** is also working Mayhem at `/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/work/mayhem-priority-20261027/` (curve-latest434-q*, amm-latest434-*). Read it only; mine its ideas.

## Hard rules
1. **Never edit, check out in, or change branches of REPO** (Codex works there).
   - To commit, make your own worktree: `git -C REPO worktree add W/r436/<lane>/wt -b claude/r436-<lane> origin/main`, made sequentially. Committing is optional; your lane dir is durable.
2. **Work only in `W/r436/<lane>/`.** It holds your roots, notes and tools. Append one-line discoveries that could help other lanes to `W/r436/FINDINGS.md`: `HH:MM <lane> <window>: <finding>`. Read FINDINGS.md at start and every ~30 min; other lanes attack the same and sibling windows.
3. **Admission bar:** ordinary Rust source or build-recipe changes only. No asm, no padding, no patched bytes, no dead or unused ops added just to force bytes. `-Z` diagnostic flags are for diagnosis only, never shipped.
   - A claimed close needs normalized equality of the window, no losses of any kind vs the 436 base (`measure.py` `no_losses: true`), and no stack-offset warning.
4. **Python:** run with `python3 -B`. If you need solders, use `REPO/work/test-env/bin/python -B`.
5. **On a close or a meaningful partial**, write `W/r436/<lane>/BEST/`: the full ROOT tree copy, `source.patch` vs parent-436, the measure json and `NOTES.md` describing the mechanism. Keep going until the time box ends or the window closes.
6. **Respect the build lock** (6 slots shared with other sessions). Batch variant builds; prefer `llc` IR experiments for fast iteration (seconds, no lock).
