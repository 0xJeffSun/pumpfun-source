# Lane mg-A-res1
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-res1/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (4):
  - 0x23e40  4504 B
  - 0x24fd8  7632 B
  - 0x2ba60  10240 B
  - 0x50f00  2016 B
Prior work: amm100 lanes near-miss partials left by finished lanes (read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/MECHANISMS.md` first). mg-A-2 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-2/PROGRESS.md`, best-partial.patch in `/Users/shawwalters/amm100-run/lanes/mg-A-2/`, IR loop tools/ir.sh + llc.sh): 0x23e40 migrate_pool_coin_creator is ONE instruction off (530/531; orig `add64 r3,-0x38` vs ours `-0x190` for the ZST unwrap_failed formatter slot); its IR proof: removing the `lifetime.start` of the old_coin_creator alloca gives diff 0. Cross-contract hint: the Mayhem lanes found that a plain `let k = acct.key();` (or `let old = pool.coin_creator;`) Pubkey local loses its StorageLive/StorageDead markers through MIR copy propagation, while the same value as an inline temp keeps them (`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md`, 01:3x o0079-port-r1 and 00:43 o0077-brute-r1 lines), so the removal is probably a let-binding form. 0x24fd8 set_coin_creator: 19 masked (stack-slot permutation + one early account-flag load). 0x2ba60 create_pool: 53 masked; an IR recipe reaches 5 (liquidity `ult,100` error-first, Clock error-first, quote supported_mint split into two arms). mg-A-6 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-6/PROGRESS.md`, `/Users/shawwalters/amm100-run/lanes/mg-A-6/best-u751-src`): 0x50f00 estimate at 141 diff after the executor/estimate restructure (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-res1`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-res1-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-res1-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
