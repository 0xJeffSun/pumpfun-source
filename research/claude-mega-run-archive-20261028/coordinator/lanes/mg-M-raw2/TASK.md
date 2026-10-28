# Lane mg-M-raw2
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-raw2/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-raw2 O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Role: second Mayhem raw / whole-ELF layout lane. Mayhem is 441/441 normalized (lane mg-M-o83c, 03:2x): every window is
size-equal, raw-equal bodies are 223/441, and the whole meaningful ELF is not yet equal. Lane mg-M-raw owns .text function
order (ordered.ld) and relocations; you own the data side: .rodata, .data.rel.ro, .dynsym/.dynstr/.rel.dyn layout and the lddw
targets that point into them (a raw window differs from its normalized match only in call immediates and lddw values, so data
layout decides most of the remaining 218). Coordinate with mg-M-raw through FINDINGS.md and MR/lanes/mg-M-raw/PROGRESS.md.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw2/`. Base: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/BEST/` until BASES.md lists parent-441, then parent-441 (copy, never
write into mayhem-env/parent-*). Build with rbuild.py (parent-439/README.txt); measure.py reports raw counts; no normalized loss.
Inputs: mg-M-raw's comparison tools (`/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw/`), Codex's link recipe (origin/main
`research/mayhem-current438-composition-20261028/builds/first/{linker.py,ordered.ld,default.ld,link.map.gz}`), the Fees
whole-ELF precedent (origin/main `research/claude-fees100-crank-donation-20261027` README: data order follows source item order and
which constants/strings are emitted where), the AMM layout tools (`/Users/shawwalters/amm100-run/shared/tools/{relayout.py,relink.py}`).
Deliver: per-section diff summary, the source or recipe changes that move data into the original order, and raw WINs (raw
windows gained, zero normalized/raw losses) as WIN lines; mg-M-int composes them.
