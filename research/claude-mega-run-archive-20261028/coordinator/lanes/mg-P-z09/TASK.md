# Lane mg-P-z09
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-z09/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-z09] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/` (src/, work/). Build: `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/fastbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/src
--work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/work` (identity recipe, shared 6-slot pool `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/locks`).
Start point: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31` (`cp -c -R /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/pump /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/src`). Score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json`. L31 has a nested crate `pump-token-ext/` the harness rsync skips: build with `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/tools/nbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/src --work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/work --out /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z09/out --baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L31/inventory.json` (or plain fastbuild.py, which now copies nested manifests).
Windows (9):
  - 0x13f630  20184 B  body; no same-length candidate
  - 0x144508  13976 B  body; no same-length candidate
  - 0x147ba0  3672 B  equal-len; nearest _<pump_recovered::pump_amm::internal::__cpi_client_accounts_create_poo (453 slots)
  - 0x1489f8  7856 B  body; no same-length candidate
  - 0x857a8  520 B  coord; nearest pump_recovered::trade::buy::_{{closure}} (0 slots)
  - 0x83088  1088 B  equal-len; nearest _<pump_recovered::buy_v2::BuyV2 as anchor_lang::AccountsExit>::exit (134 slots)
  - 0x837a8  1112 B  equal-len; nearest pump_recovered::__private::__global::claim_token_incentives (139 slots)
  - 0x83c00  3440 B  body; no same-length candidate
  - 0x859b0  8944 B  body; no same-length candidate
Prior work on these windows: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z09/PROGRESS.md`; 0x857a8 (trade_v3.rs:997 Truncation closure, a round-5 coord gain lost in L13 composition) is called only from 0x1489f8 (v3 buy_exact_quote), see mg-P-int PROGRESS and `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int/remaining-c12.json`. The v3 family 0x83088/0x837a8/0x83c00/0x859b0 came from lane mg-P-z07: it decoded the 9-argument ABI of 0x83088 and the callee list of 0x837a8 (INSIGHTS-R5.md, `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-z07/PROGRESS.md`) and expects the two small equal-length ones to be writable as standalone `#[inline(never)]` fns on their trade_v3 lines once the buy_exact_quote decomposition exists; its IR loop `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/tools/irbuild.py` + `llx.sh` compiles the crate .ll with llc in ~3 s without a build slot. Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-z09-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "L31"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
