# Lane mg-A-sp1
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-sp1/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (4):
  - 0x4c750  9024 B
  - 0x56710  5904 B
  - 0x53350  5840 B
  - 0x54a20  7112 B
Prior work: amm100 lanes second pass on sell / trade_v2 near-misses (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/MECHANISMS.md` first). From mg-A-5 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-5/PROGRESS.md`, `/Users/shawwalters/amm100-run/lanes/mg-A-5/gen/best_cb_partial.rs`, `tools/odiff.py`): 0x4c750 cashback helper is exact length with IR diff -189 and correct `associated_token::create` semantics; the residual is entry register coloring (the original keeps the remaining_accounts slice ptr in r6, ours in r7): perturb the first bindings (order of the two `remaining.get()` vs `let user_key`, how ata/info are taken) and watch the entry `mov64 rN, r1`. From mg-A-6 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-6/PROGRESS.md`, tree `/Users/shawwalters/amm100-run/lanes/mg-A-6/best-u751-src`, IR loop tools/ir.sh + llc.sh + ostat.py): after the executor/estimate restructure sizes are near-identical: sell 0x56710 diff 464, buy 0x53350 5840==5840 diff 656, exact 0x54a20 diff 743; first sell divergence is the transfer Result tag in r9 (orig) vs r8 plus larger error-cleanup paths (branch +0x76 vs +0xab): equalize error-block size first, then find the value the original pins in a callee-saved register across the four transfers (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-sp1-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-sp1-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
