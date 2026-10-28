# Lane mg-P-int
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-int/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-int] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Role: main Pump integrator. You own every Pump PR of this run (window lanes never push).
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/`. Read `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/compose_latest.py` and `integrate.py` before using them, and the r5
packet README `research/claude-pump-r5-20261028/README.md` on origin/main (PR #416).

1. Compose L13 = L12 + the newest delivery of every round-5 lane: r5-coord-03, r5-libinst-06, r5-z00-03 (synthetic layout),
   r5-z01-02, r5-z02-02 (synthetic layout), r5-z03-07, r5-z04-02, r5-z05-04, r5-z06-02, r5-z07-03, r5-z08-03, r5-z09-01.
   Deliveries are cumulative and several already merged other lanes' work (read every delivery.json summary). Keep the
   composition line-neutral and keep synthetic layout labelled.
2. Build (fastbuild identity) and score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json`: target about 963 (907 + the union of
   round-5 gains, 56), zero losses, runtime_valid. When a delivery's gain does not survive composition, find out why; fix it
   or drop it and record that.
3. Port the windows only Codex rounds match: 0x43ea0 (migrate v1), 0x502f0 (migrate_v2 create_pool helper), 0x68bd8
   (QuoteControl::validate_new_mint) from REPO `repro/pump/main-contract-round46-20261027`; also score Round47's candidate
   (`repro/pump/main-contract-round47-20261027`) and port anything else it matches that L13 lacks. Line-neutral.
4. Publish `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/` (pump/, unstripped.so, candidate.so, inventory.json = score json, triage.json via triage.py).
   Do not repoint `base/current`. Append `HH:MM BASE pump L13 <n>/1035 raw=<r> path=...` to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
5. Package and PR (recipe from the r37 composites #396/#401/#416): `cd /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work && PKG_WORKTREE=<your sparse worktree> python3
   harness/mkpkg.py --name <name> --src <composite src> --base round37 --title ... --lanes <lane json> --readme-extra <md>
   --control` with `--builder-arg=--target-library-profile --builder-arg=linux-v1.44-sbf --builder-arg=--target-library-directory
   --builder-arg=$HOME/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib
   --pkg-builder-arg=--dependency-cache --pkg-builder-arg=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/int/work/claude-depcache`; then `bash harness/regress.sh <pkg> 4`
   and `python3 harness/add_regression.py <pkg>` (check mkpkg.py --help for current flags; earlier packages under `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/int`
   and `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/pr-r5` show working invocations). The README must say L12 is the parent and which windows carry synthetic
   layout. Branch `claude/pump-L13-20261028` from origin/main in a sparse worktree you create
   (`git -C REPO worktree add --no-checkout ...`, sequentially), run the packet verifier with an empty HOME, commit (message
   ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create` (body ends with
   `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append the PR line to EVENTS.log.
6. Integrator loop: compose the mega window lanes' deliveries (`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-*-NN`) onto L13 -> L14 -> ...;
   each new base gets a BASE line and, every ~+10 windows or hourly, a PR.
