# Lane mg-A-raw
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-raw/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (0):

Prior work: amm100 lanes whole-ELF layout preparation for PumpSwap (raw 159 on Linux while normalized is ~759). Mayhem went from 223 to 441/441 raw with a generated linker order plus 3 line-neutral source edits (lane mg-M-raw: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw/tools/` = gen_ordered.py, rbuild_raw.py, rawready.py, elfcmp.py, datamap.py, relink.py; `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-raw/PROGRESS.md`; MECHANISMS.md "Whole-ELF layout"). AMM already has layout tooling from lane layout-r1 (`/Users/shawwalters/amm100-run/shared/tools/{nbuild-layout.sh,relayout.py,relink.py,lwrap.sh}`, `/Users/shawwalters/amm100-run/lanes/layout-r1/PROGRESS.md`). Raw must be judged on the Linux build (the 5 sysroot TypeId windows differ natively; mg-A-int has the Linux recipe, `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-int/PROGRESS.md`). Goals: an ordered.ld generator for .text/.rodata/.data.rel.ro, a raw-ready check of every matched window, the line-neutral edits (mod/item order) that fix the rest, and raw wins delivered as patches + recipe for mg-A-int (no normalized or raw losses). Separate shifts caused by still-unmatched windows from genuine layout differences (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-raw`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-raw-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-raw-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
