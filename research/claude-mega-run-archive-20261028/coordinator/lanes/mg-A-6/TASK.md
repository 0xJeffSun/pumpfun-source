# Lane mg-A-6
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-6/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (6):
  - 0x50598  1808 B
  - 0x50f00  2016 B
  - 0x51d08  872 B
  - 0x53350  5840 B
  - 0x54a20  7112 B
  - 0x56710  5904 B
Prior work: amm100 lanes tradev2-r1 (trade_v2.rs original line map in findings.md), sell-r1 (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-6`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-6-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-6-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
