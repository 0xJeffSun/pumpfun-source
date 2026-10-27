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

## Done this round

- Default Linux build with link-kit capture reproduces 647 exactly (`0881a95d…`/`16ddd88d…`, `out/builds/edr-default`).
- `dataplan.py` order → native relink = Linux build (`b05f7268…`/`5edda6f5…`): 647/168/138, +20 raw, 0 lost.
  Runtime 25 suites / 17,462 cases / 0 mismatches. `verify.py` passes; `test_scope.py` 9/9 mutation controls.
  Packet `g01-text-data-order-647/`. The second Linux build (`out/builds/edr-data-1`) was queued on the slot lock.
- Shared tools published: `SP/shared/tools/elfdiff.py`, `SP/shared/tools/scoreboard.py` (README lines added).

## Next

1. Add the repeat build to g01 claims (`out/mkclaims.py <g01> event-decoder repro/pump_amm/event-decoder-recovery-20261027
   event-decoder-text-data builds/text-data builds/text-data-repeat`), then `tools/manifest.py`, `verify.py`,
   `test_scope.py`, commit, PR.
2. Re-run the generator on the integrate lane's composition when `SP/shared/frontier/current.json` appears
   (amm-hi's harvest change should remove the 0xf4030/0xf4180 multiplicity deficit; check `multiplicity_deficit`).

## Findings this round

- The four bodies `0xf28b8 0xf2d60 0xf2ed0 0xf31d8` sit after the root crate's allocator-shim function (`0xf28a8`,
  16 B) and before anchor_spl's first object, so they are not root-crate code (every root CGU precedes the shim).
  In rustc's reverse-postorder crate list that slot belongs to an upstream crate loaded after anchor_spl that
  anchor_spl does not depend on; spl-token-2022 6.0.0 (anchor_spl's dependency) is linked after anchor_spl and
  mpl_token_metadata. The original's crate order is otherwise identical to the candidate's
  (root, shim, anchor_spl, mpl_token_metadata, spl_token_2022, spl_ata_client, anchor_lang, solana_*, borsh, std,
  alloc, core, compiler_builtins).
- The candidate-only Location `core/src/iter/traits/accum.rs:149:1` (480 B tail of candidate `.rodata`) comes from
  `<[V] as Concat<T>>::concat` (candidate 0xc570) — the original never calls `[..].concat()`.

## Tools (packet `tools/`)

Generator and build tools are copied from the older layout-amm lane (post-audit versions, read-only source:
`OLD/lanes/layout-amm/wt/research/claude-layout-amm-20261027/tools`); `elfdiff.py` is this lane's.
