# MEGA run — shared rules for every lane (started 2026-10-28 ~01:20 PDT; fleet launched ~01:45 PDT)

## Purpose and scope
This is a reproducible-build source reconstruction project for the Pump programs (main Pump, PumpSwap AMM, Mayhem),
which belong to the user's organization (repo github.com/lalalune/pumpfun-source). The deliverables are ordinary Rust
source and build recipes whose compiled output is byte-identical to the deployed builds, plus local differential test
evidence that behavior is unchanged. Everything runs locally: compile, disassemble, compare, and run the local VM test
suites. No transactions to any live network, no key material, and no vulnerability research are part of this work.

Coordinator: the Claude session "Mega workflow for contract completion" (this run's root).
Goal: finish the three remaining contracts **Mayhem, main Pump, PumpSwap (AMM)**. Normalized windows must reach N/N,
then raw/whole-ELF identity, as Fees already did (585/585, whole meaningful ELF byte-identical, PR #392).
Byte identity is achievable here by matching the original's source form (reference types, statement/field order,
helper boundaries, line positions); never claim a window or a contract is impossible.

MR = /Users/shawwalters/Documents/Codex/2026-10-24/mega-run (this dir; durable)
REPO = /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source (primary checkout; Codex works inside it)

## 0. Your task
Your prompt names your lane. Read `MR/lanes/<lane>/TASK.md` first, then the contract rules file it names
(those rules still apply; anything here or in TASK.md overrides their frontier/base numbers).
Current bases are in `MR/BASES.md`. Re-read it at every checkpoint; when your contract's base moves, rebase your
working tree onto it when convenient (port your diff, re-measure against the new base).
Before you call any residue scheduling-, RA- or placement-bound, read `MR/MECHANISMS.md` (cross-contract levers
that closed exactly such residues) and test the relevant ones in IR.

## 1. Hard rules
1. NEVER edit, check out, switch branches, `git add/commit/stash/reset` in REPO or any Codex worktree
   (`~/.codex/worktrees/...`). Read-only is fine: `git -C REPO show origin/main:<path>`, `git -C REPO log origin/main`.
   Do not run `git fetch` yourself (the coordinator does it); `origin/main` may be a few minutes stale.
2. Durable state only: work in your lane dir (TASK.md gives it). Never keep state in /tmp or /private/tmp
   (wiped on reboot). Python: `python3 -B` (or `-I` where the contract rules say so). Never put backticks inside
   unquoted heredocs (zsh executes them): use `<<'EOF'`.
3. Every SBF build goes through the contract's build wrapper (it holds the shared slot lock). Never run cargo directly.
   Never delete or modify other lanes' dirs, bases, harness or shared tools (copy them into your lane to change them).
4. Admission bar: ordinary Rust source / build-recipe changes the original authors could have written. No asm,
   no binary patching, no dead code or unused ops added to force bytes, no behavior change (errors, checks,
   events, CPI order must stay identical: the integrators re-run the runtime suites). `-Z` flags only for diagnosis.
   Contract specifics:
   - Mayhem: no padding of any kind.
   - Pump: line-neutral editing on the layout base (keep `// layout-pad` balance); if you add synthetic layout,
     set `synthetic_layout: true` in delivery.json and say so.
   - AMM: positioning devices (comment/doc lines only to hit original line numbers, `#[inline(always)]`,
     file moves) are allowed but must be listed in your win's description.
4b. Layout recipes (coordinator decision 03:47): a generated linker order (`ordered.ld` for .text/.rodata/.data.rel.ro derived
   from the original's layout) is admissible as a separately labeled layout layer, following the project's precedent: the
   Fees whole-ELF identity (#392) used a relayout'd ordered.ld and Codex's qualified Mayhem builds ship one. Packets must
   say the order is generated from the original layout and report both the source-only counts and the with-layout counts.
   Source edits made for layout (mod/item order) must still be ordinary, line-neutral and behavior-preserving.
5. A WIN = >=1 normalized (or raw) window gained with ZERO normalized and ZERO raw losses vs your base, a clean
   build (no `Stack offset ... exceeded` warning), measured by the contract's scorer. Never fabricate or round up.
6. Window lanes never open PRs and never push. Integrator/banker lanes own PRs (one per contract).

## 2. Reporting (the coordinator watches these files)
- On every verified WIN, save it in the contract's win format (TASK.md says where) AND append one line to
  `MR/EVENTS.log`:  `<HH:MM> WIN <contract> <lane> <+windows list> total=<normalized>/<N> raw=<raw> path=<win dir>`
- On a new composite base (integrators): `<HH:MM> BASE <contract> <name> <normalized>/<N> raw=<raw> path=...`
- On a PR (integrators): `<HH:MM> PR <contract> #<n> <one-line summary>`
- Reusable mechanism/finding: append ONE line to the contract findings file (TASK.md names it):
  `HH:MM <lane> <window>: <finding>`. Read that file when you start and every ~30 min.
- Keep `MR/lanes/<lane>/PROGRESS.md` current (every ~20-30 min): what you tried, what moved bytes, dead ends,
  current best, next ideas. A restarted lane resumes from it. (Your build trees live in the work dir TASK.md names.)
- Final message to the coordinator: <= 12 lines (wins with window ids + counts, best partials, where the files are,
  the most promising next idea). Details belong in PROGRESS.md, not in the final message.

## 3. Throughput (builds are the bottleneck: 16 cores shared with a Codex swarm)
- Prefer fast loops that need no build slot: LLVM-IR experiments (`opt -O3` / `llc` on saved IR; seconds), then
  map the winning IR shape back to source.
- When you do build, test MANY variants per build: put N variant copies of the function in one build as `pub fn`
  (external linkage, not inlined) called under dummy runtime conditions, then score each variant's symbol
  (Mayhem: `MR/../claude-mayhem-work/r436/o0084-brute-r1/tools/mv.py`; Pump: MULTIPLEX trick in INSIGHTS-R5.md;
  AMM: same idea). Never deliver multiplexed code — rebuild the single winning variant cleanly and re-measure.
- Reuse warm build targets (APFS clone `cp -c -R`), keep your own target dir, delete stale crate outputs when the
  contract rules say so (Pump: always recompiles; Fees lesson: deleting .fingerprint dirs breaks cargo).
- Script systematic variant sweeps (python generators over statement orders / reference types / let-binding / `?` vs
  match / helper boundaries / field order / inline attrs) instead of hand-editing one variant at a time.
- Scorers: always pass an explicit baseline (your start point) instead of relying on a default `base/current` link,
  because integrators publish new bases while you work.

## 4. Token economy (the whole fleet shares one account limit)
- Keep tool output short: pipe through `head`/`tail`/`grep`, never dump whole files > ~150 lines or full disassembly.
- Keep long disassembly listings of the deployed programs out of your context: compare with the diff/score tools and print
  counts plus short hunks (<= ~40 lines) instead of whole-function listings.
- Write scripts to files and run them, rather than long inline commands repeated many times.
- Do not re-read big files you have already read; keep notes in PROGRESS.md.

## 5. Coordination with other workers
- Codex agents work in REPO/work/ and `~/.codex/worktrees/pr-queue-review/pumpfun-source/work/` (Mayhem:
  `mayhem-priority-20261027`; AMM: `work/amm-*`; Pump: round publisher). Mine their ideas read-only.
- main moves every few minutes (Codex rounds, contributor PRs, a bulk-merger merges PRs within minutes).
- Other lanes may attack sibling windows: check the findings file before starting a long experiment.
- Stop when all your windows are closed, or after ~3 hours of real attempts with no new win. Always leave
  PROGRESS.md + your best partial tree in your lane dir before stopping.

## fz run (final run, started 2026-10-28 ~04:55 PDT; coordinator: Claude session 1f77d98b, one Workflow)
Lane names `fz-<group>-r<attempt>` (groups and prior notes: `MR/fz/groups.json`, generator `state/make_fz.py`). Work dirs:
Pump `WP/lanes/fz-*`, AMM `WA/lanes/fz-*`, Mayhem `WM/mega/fz-*`; progress files `MR/lanes/fz-*/PROGRESS.md`. Integrators are
`fz-int-<contract>` agents run one at a time per contract; they keep using the mg-*-int procedures and own all PRs.
Bases at start: Pump L31 990/1035 (no PR yet), AMM union-760 765/785 Linux (no PR yet), Mayhem parent-441 (PR #432).
Disk is ~97% full: lanes delete their own build output when they finish and stop building below 40 GB free.
Compare against the originals through the project's existing tools (score/win/winreport/dis/measure) and IR/llc of our own
builds. Do not write new general-purpose decoders or decompilers of the deployed programs.
