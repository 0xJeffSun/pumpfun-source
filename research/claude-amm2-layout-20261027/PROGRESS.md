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

- g01 finalized (two identical Linux builds b05f7268/5edda6f5), PR #316 opened 12:29.
- Main moved to `optional-context-recovery-20261027` (651/148/134, 97bd5553; same deps/lock as 647). Re-generated:
  g02 = 651/168/134 (+20 raw, same windows, 0 lost), Linux ×2 identical `ef65f2fe…`/`039554e2…`, runtime
  25/17,462/35,074/0, verify.py passes. Pushed into PR #316.

## Pipeline for a new candidate (about 15 min of lane work plus slot-lock waits)

    O=SP/lanes/layout/out; T=<packet>/tools
    cp -c -R <checkpoint>/results/source $O/src/<x>; cp -c -R SP/lanes/layout/target/linux-ep221 SP/lanes/layout/target/b-<x>
    cp -c -R SP/lanes/layout/cargo-home-ep221 SP/lanes/layout/ch-<x>        # one clone per concurrent build
    python3 $T/build_linux.py --source $O/src/<x> --output $O/builds/<x>-default --cargo-home ... --target-cache ... --lock SP/shared/sbf_lock.py
    python3 $T/dataplan.py --symbols D/artifacts/unstripped.so --map D/link/link.map --default-script D/link/sdk-default.ld --out-dir $O/plan-<x>
    python3 $T/relink.py --kit D/link --script $O/plan-<x>/ordered.ld --output $O/relink/<x>.so --target-cache ... --map $O/relink/<x>.map
    measure.py → cmpm.py; then two `build_linux.py --ordered` builds; replay_parallel.py of the checkpoint;
    $O/mkpacket.sh <gdir> <frontier-name> <checkpoint rel> <layout-name> <default> <ordA> <ordB> <runtime> <plan> <base measure> <layout measure> <target>
    then README, `tools/manifest.py`, `verify.py`, `test_scope.py`.
For a source composition that is not a checkpoint packet (integrate's tree), stage it with the frontier recipe
(`repro/pump_amm/<ck>/workspace_recipe_v2.py stage --source-root <tree> --output <ws>`) and pass `--source <ws>`;
`verify.py` reads the baseline from `<packet>/results/build`, so add a frontier entry pointing at the composed build.

## Raw priority ledger (tools/raw_priority.py on the 651 ordered diagnose)

Only call-only windows can become raw before `.text` has its original size (data immediates are absolute):
close {0xf28b8 0xf2d60 0xf2ed0 0xf31d8 0xf4030 0xf4180 0xf6eb0} → +59 raw; then {0xb3460 0xb92c8 0xe9b90 0xe9fc0} → +7;
then {0x73ef0 0x74128 0x74648 0x74900 0x74e30} → +5; the remaining 71 call-only windows need ~100 root slots.
The ordered raw set is the same 168 windows on 623, 647 and 651: source gains since 623 added no raw window because
every new match sits behind these blockers.

## In flight (12:50)

- `out/builds/u2b-default`: default build with link capture of the integrate lane's u2b workspace
  (`SP/lanes/integrate/out/linux-u2b-a/ws`, their Linux 0fb1f886 = 680/148/105, includes amm-hi's harvest change),
  to measure order + harvest (deficit should vanish). Composed-base helpers ready: `out/verify-composed.py`
  (`baseline_artifacts` in claims), `out/mkclaims.py` (env BASE_C/BASE_S).

## Next

1. Re-run the generator on the integrate lane's composition when `SP/shared/frontier/current.json` appears
   (amm-hi's harvest change should remove the 0xf4030/0xf4180 multiplicity deficit; check `multiplicity_deficit`;
   expect more raw in the dependency region, where only 0xf28b8 0xf2d60 0xf2ed0 0xf31d8 0xf6eb0 are unmatched).
2. The four helper-crate bodies (0xf28b8…0xf31d8) block raw for ~374 bodies each; they need a separate upstream
   crate (link-order evidence), kept out of main by DIRECTIVES 07:30 because its name/location is unevidenced.

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
