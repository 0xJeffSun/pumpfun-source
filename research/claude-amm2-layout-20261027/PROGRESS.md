# layout lane (amm2) progress

Lane `layout`, branch `claude/amm2-layout-20261027`. Job: raw-byte matches and the path to whole-ELF identity
for `pump_amm` (link order of `.text` / `.rodata` / `.data.rel.ro`, dependency-owned bytes, ELF scoreboard).

## State (2026-10-27 11:58 PDT, round 0 restart)

- Base: origin/main 0cc61d636, frontier `repro/pump_amm/event-decoder-recovery-20261027`
  (candidate `0881a95d…`, Linux 647 normalized / 148 raw / 138 unmatched; re-measured here: same).
- The 647 frontier already locks `solana-program-entrypoint 2.2.1` (Codex adopted the lead), so the entrypoint
  lock change is no longer a separate layer for this lane.
- Pre-restart work (on 623 `account-context`, superseded): entrypoint-2.2.1 + text/data order relink = 623/168/162,
  `out/ep221-data/`, runtime `out/runtime/ep221-data/`; whole-ELF differ `tools/elfdiff.py`.
- Whole-ELF differ on the 647 frontier: extent +25,104 B; 5,998 original bytes in place; 864,568 (68.16%)
  reproduced modulo layout; 403,936 not reproduced (`out/elfdiff/edr-frontier.md`).

## In flight

1. Default Linux build of the 647 workspace with link-kit capture (`tools/build_linux.py`, no `--ordered`):
   `out/builds/edr-default` — must reproduce `0881a95d…` byte-for-byte.
2. Then `tools/dataplan.py` on its map → `ordered.ld` → native relink (`tools/relink.py`) → measure → two Linux
   `--ordered` builds → runtime replay → packet `g01-…` → PR.

## Tools (packet `tools/`)

Generator and build tools are copied from the older layout-amm lane (post-audit versions, read-only source:
`OLD/lanes/layout-amm/wt/research/claude-layout-amm-20261027/tools`); `elfdiff.py` is this lane's.
