# Lane mg-P-z08
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-z08/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-z08] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/` (src/, work/). Build: `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/fastbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/src
--work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/work` (identity recipe, shared 6-slot pool `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/locks`).
Start point: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31` (`cp -c -R /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/pump /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/src`). Score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json`. L31 has a nested crate `pump-token-ext/` the harness rsync skips: build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/tools/nbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/src --work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/work --out /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/out --baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json` (or plain fastbuild.py, which now copies nested manifests).
Windows (6):
  - 0x89258  2288 B  body; no same-length candidate
  - 0x8bbd0  1800 B  body; no same-length candidate
  - 0xcd3d8  8504 B  body; no same-length candidate
  - 0x1367c0  5624 B  equal-len; nearest pump_recovered::token_incentives::claim_token_incentives::claim (670 slots)
  - 0x138b20  11928 B  body; no same-length candidate
  - 0x13b9b8  15480 B  body; no same-length candidate
Prior work on these windows: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z08/PROGRESS.md` (its separate-helper-crate finding is in INSIGHTS-R5.md). Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-z08-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "L31"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
