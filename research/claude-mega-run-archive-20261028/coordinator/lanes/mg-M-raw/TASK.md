# Lane mg-M-raw
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-M-raw/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/RULES.md` (build wrapper `sbf_lock.py` + `mayhem-b/build/build_lane.py`, `measure.py`,
`winreport.py`, admission bar: no padding of any kind). Findings: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/FINDINGS.md` (read all of it first; append
one-line mechanisms as `HH:MM mg-M-raw O00xx: ...`). Techniques: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/TECHNIQUES.md`.

Role: Mayhem raw / whole-ELF layout lane. Goal: raise raw-equal windows (141 now) toward 441 and drive the whole
meaningful ELF to identity, with zero normalized losses. Raw equality needs the original function order (relative call
offsets), the .rodata layout (lddw values), relocations and section layout; the 3 unmatched windows shift addresses after
them until they close, so separate those shifts from genuine layout differences.
Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-raw/`. Base: parent-438 now, parent-439 when BASES.md lists it (no normalized losses allowed).
Inputs: Codex's link recipe on origin/main `research/mayhem-current438-composition-20261028/builds/first/{linker.py,
ordered.ld,default.ld,link.map.gz,invocation.json}`; `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build/layout-lane-linux-target2-sysroot` (earlier
layout lane); the Fees whole-ELF precedent `research/claude-fees100-crank-donation-20261027` on origin/main (relayout'd
ordered.ld, byte-identical 873,256-B meaningful ELF; read its README); AMM layout tools `/Users/shawwalters/amm100-run/shared/tools/{nbuild-layout.sh,
relayout.py,relink.py,lwrap.sh}` (AMM-specific; adapt copies).
Deliver: (1) a whole-ELF section-by-section comparison tool (sizes, offsets, first differing byte per section, meaningful
extent vs zero tail); (2) an ordered.ld generator that reproduces the original function order; (3) measured raw counts. A
raw WIN = raw windows gained with zero normalized and raw losses; post WIN lines to EVENTS.log; mg-M-int composes recipe
changes into its packets. Build only through the WM build wrapper.
