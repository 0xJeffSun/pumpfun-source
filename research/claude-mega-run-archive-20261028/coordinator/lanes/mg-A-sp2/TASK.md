# Lane mg-A-sp2
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-sp2/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (4):
  - 0x3a5a0  12936 B
  - 0x351a8  8104 B
  - 0x16128  3168 B
  - 0x14920  6152 B
Prior work: amm100 lanes second pass (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/MECHANISMS.md` first). From mg-A-3 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-3/PROGRESS.md`, `/Users/shawwalters/amm100-run/lanes/mg-A-3/{partials,gen}`, IR loop tools/ir.sh + llc.sh + irreorder.py ~12 s/variant): 0x3a5a0 exact-in buy handler, gen/ex1.rs is a faithful `execute::<true>` specialization with all 9 error lines matched; it needs its OWN single-use cashback wrapper or it de-inlines and regresses 0x376b0 (the closed buy handler used a dedicated non-generic `#[inline(never)] pub fn buy` + a single-use `pay_cashback` wrapper); residual is fee/estimate/min()/gross_pool_quote-closure scheduling. 0x351a8 cashback, gen/cb_v6.rs: AccountInfo-clone order for the inlined Create CpiContext + stack-slot layout. From mg-A-1 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-1/PROGRESS.md`, `/Users/shawwalters/amm100-run/lanes/mg-A-1/{gen,tools,snap/s3-partial}`, IR loop ir.sh + llcfn.sh + ofn.py ~3 s): 0x16128 at 23/24 (gen/inc/I3.rs; shared exit block placed mid-function vs at the end), 0x14920 cto at 25/25 same size 6152 (pure RA: pool ptr r2 vs r3 from the holder-rewards PDA call on) (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-sp2-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-sp2-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
