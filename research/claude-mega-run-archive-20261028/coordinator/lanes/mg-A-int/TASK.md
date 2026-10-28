# Lane mg-A-int
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-int/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Role: PumpSwap integrator. You own every AMM PR of this run (window lanes never push).
Work dir: `/Users/shawwalters/amm100-run/lanes/mg-A-int/` (compose in `/Users/shawwalters/amm100-run/lanes/mg-union/`).
1. Union composite on the 733 chain: base `/Users/shawwalters/amm100-run/lanes/mg-base733/src` (Linux 733 / native 728 / 139 raw; extracted from
   origin/main `research/amm-fee-value-call-recovery` sources/candidate.tar.gz). Port the 18 windows that amm100 lane wins
   close and the 733 chain lacks (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/state/amm-remaining.json` key `lane_new_vs_733`; patches `/Users/shawwalters/amm100-run/shared/wins/*.patch`,
   made on the older 656 base; collect-C composed them all on that base: `/Users/shawwalters/amm100-run/lanes/collect-C/{LOG.md,src-step1/}` = 739
   native / 150 raw). Port Codex-only 0x73ef0 (from REPO `repro/pump_amm/native-scanners-recovery-20261028` or
   `create-pool-fields-recovery-20261028`: diff their sources against the 733 base for that function) and diff Codex's newest
   checkpoint's matched set against the union for anything else.
2. Native build + measure with `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-733n.json`: target 728 + 18 + 1 = 747
   native, zero losses. Clean build.
3. Linux build with the recipe the 733 chain used (find it in the research/amm-fee-value-call-recovery packet and its
   parents; earlier Linux v1.44 AMM builds ran in a container). Expect native + 5 sysroot windows. Run the AMM runtime
   suite the packet chain uses (17,462 cases per LANE-RULES.md; find its runner) against the Linux candidate.
4. Publish `/Users/shawwalters/amm100-run/lanes/mg-union/src` as the new lane base plus a frontier file
   `/Users/shawwalters/amm100-run/shared/frontier/matched-union-<N>n.json` (same format as matched-733n.json) and append
   `HH:MM BASE amm union-<N> <N>/785 raw=<r> path=...` to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
5. Package `research/claude-amm-union-20261028/` (template: the research/amm-fee-value-call-recovery packet: sources,
   candidate, measurement, verify.py/tests; list every positioning device used), verify it with `HOME=<empty dir>
   python3 -I -B`, sparse worktree from origin/main (`git -C REPO worktree add --no-checkout -b claude/amm-union-20261028 ...`,
   sequentially), commit (message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`), push, `gh pr create`
   (body ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`). Append the PR line to EVENTS.log.
6. Integrator loop: compose mg-A-* wins (`/Users/shawwalters/amm100-run/shared/wins/mg-A-*.patch`) onto the union, new BASE line per composite,
   PR every ~+5 windows or hourly. Then whole-ELF identity (layout tools `/Users/shawwalters/amm100-run/shared/tools/{nbuild-layout.sh,relayout.py}`,
   lane layout-r1's notes) once the normalized count is high.
