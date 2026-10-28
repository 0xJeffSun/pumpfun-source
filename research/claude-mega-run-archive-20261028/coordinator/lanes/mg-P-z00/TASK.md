# Lane mg-P-z00
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-z00/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-z00] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00/` (src/, work/). Build: `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/fastbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00/src
--work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00/work` (identity recipe, shared 6-slot pool `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/locks`).
Start point: delivery `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-z00-03` (cumulative: L12 + that round-5 lane's gains). `cp -c -R /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-z00-03/src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00/src`; score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-z00-03/score.json` (gains/losses relative to your start).
Windows (7):
  - 0x14910  6080 B  body; no same-length candidate
  - 0x173d8  768 B  equal-len; nearest _<pump_recovered::multi_hop_curve::MultiHopCurve as anchor_lang::Accou (92 slots)
  - 0x18678  5704 B  body; no same-length candidate
  - 0x1ac28  7256 B  equal-len; nearest _<pump_recovered::distribution::DistributeCreatorFees as anchor_lang:: (901 slots)
  - 0x1c880  4872 B  body; no same-length candidate
  - 0x1db88  3128 B  body; no same-length candidate
  - 0x1e7c0  15576 B  body; no same-length candidate
Prior work on these windows: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z00/PROGRESS.md`. Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-z00-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "r5-z00-03"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
