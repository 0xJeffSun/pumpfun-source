# Lane mg-P-z10
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-z10/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-z10] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/` (src/, work/). Build: `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/fastbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/src
--work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/work` (identity recipe, shared 6-slot pool `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/locks`).
Start point: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31` (`cp -c -R /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/pump /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/src`). Score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json`. L31 has a nested crate `pump-token-ext/` the harness rsync skips: build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/tools/nbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/src --work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/work --out /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10/out --baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json` (or plain fastbuild.py, which now copies nested manifests).
Windows (6):
  - 0x14a8a8  6032 B  body; no same-length candidate
  - 0x14c038  10880 B  body; no same-length candidate
  - 0x14f4e0  13224 B  body; no same-length candidate
  - 0x152888  8488 B  body; no same-length candidate
  - 0x1557e8  5704 B  body; no same-length candidate
  - 0x17bc48  1192 B  equal-len; nearest pump_recovered::multi_hop_curve::div (149 slots)
Prior work on these windows: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z10/PROGRESS.md` (round 5 delivered nothing here; read why). Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-z10-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "L31"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
