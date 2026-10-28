# Lane mg-A-sp3
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-sp3/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/amm100-run/LANE-RULES.md` (nbuild.sh, dis.py, win format; its 656/651 frontier numbers are old). Findings:
`/Users/shawwalters/amm100-run/shared/findings.md` (read it all first; append one line per reusable trick). Note from findings: shared dis.py misparses
hex call immediates; fixed copies are in lanes/multihop-r1/tools/dis.py and lanes/bigunknown-r1/tools/dis2.py.

Windows (4):
  - 0x19138  9176 B
  - 0xc5d0  1240 B
  - 0x2288  232 B
  - 0x14088  1656 B
Prior work: amm100 lanes second pass on lane mg-A-1 (`/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-A-1/PROGRESS.md`, `/Users/shawwalters/amm100-run/lanes/mg-A-1/{gen,tools,snap/s3-partial}`; tools remarks.sh + rem.py = per-call-site inline cost/threshold; ir.sh + llcfn.sh + ofn.py = 3 s IR loop; read `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/MECHANISMS.md`). The three srf windows are linked: 0x19138 (9176 B) matches only when borsh `[Pubkey;7]::serialize` stays out of line as its own function (0xc5d0) and `with_account_name<String>` (0x2288) is a direct out-of-line call; a `#[cold]` error helper proved the coldness lever (9672 vs 9176 B) but adds a wrapper; find the idiomatic construct that makes the per-recipient constraint-error path cold without a wrapper (validate candidates with remarks.sh before full builds). 0x14088 v2 at 66/71: the IR proof says the original has ONE merged error-return block (`/Users/shawwalters/amm100-run/lanes/<lane>/PROGRESS.md`, their gen/ and tools/ dirs).

Work dir `L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3`: `mkdir -p $L && cp -c -R /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/. $L/src && cp -c -R
/Users/shawwalters/amm100-run/lanes/mg-base733/target $L/target` (the newest union base from BASES.md and a warm target; read-only originals).
Build + measure: `MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-760n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L` (native v1.44,
~40 s plus queue; gains/losses relative to that union base (see BASES.md for its counts); the 5 sysroot TypeId windows only match on
Linux, ignore them).
A WIN: >=1 window gained, zero normalized and raw losses, clean build. Save
`/Users/shawwalters/amm100-run/shared/wins/mg-A-sp3-NN.patch` (`diff -ru /Users/shawwalters/amm100-run/lanes/mg-union/u760/src/programs/pump-amm/src $L/src/programs/pump-amm/src`,
cumulative) + `mg-A-sp3-NN.json` (the nbuild measure JSON + a description that lists every positioning device used: comment or
doc lines placed to hit original line numbers, `#[inline(always)]`, file moves). Append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`.
Window lanes never commit or push; mg-A-int composes wins. Rebase onto newer union bases as BASES.md lists them.
Codex is active on AMM (REPO `work/amm-*`, read-only): look there and at the newest `repro/pump_amm/*-20261028` packets on
origin/main for your functions before long experiments.
