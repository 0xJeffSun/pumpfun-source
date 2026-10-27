# pump-hi progress log

Lane: main Pump original windows `0x101170 … 0x1ab9b8`. The branch is `claude/pump-hi-20261027`. Work happens in the
lane worktree; `work/` is gitignored scratch for builds.

## State for a continuation agent

- Frontier used: Round23 (`repro/pump/main-contract-round23-20261027`, 712/123/852,944). Rebase before every commit; Codex publishes a round every 10–20 minutes.
- Build loop: `tools/trial.sh <name> <source dir in worktree> [packet]` runs a cached frontier-recipe build under `sbf_lock.py --slots 6 --name sbf`, then `tools/measure.py`. Hashes go to `SP/lanes/pump-hi/out/<name>.measure.json`. The dependency cache is `SP/lanes/pump-hi/out/depcache`, keyed by the Cargo manifests; a manifest change means one cache-miss build of about 10 minutes.
- Apply this lane's changes to a new round with `python3 tools/apply_lane_changes.py --source-directory <crate>`, then build and measure.
- Runtime check: run `tools/run_suites.py --suites all --workers 3` with `REPO/work/test-env/bin/python` and `PYTHONDONTWRITEBYTECODE=1`. The sparse checkout must include `research/imported-lab`, `repro/pump/claim-token-incentives`, `repro/pump/native-curve-partial-fortyeight` and `repro/pump/tokenkeg-two-curve-fortyeight`.

## Verified gains

| when | base | change | gained | losses |
|---|---|---|---|---|
| 06:13 | Round20 | `#[program]` handler order from original dispatcher | 0x11b758 (8,696) | none |
| 06:22 | Round21 | same | 0x11b758 | none |
| 06:27 | Round21 | + by-value `update_global_authority_handler` | 0x1348c0 (3,264) | none |
| 06:31 | Round23 | both | 0x11b758, 0x1348c0 → 714/123/864,904 | none |

## Negative controls (do not repeat)

- `update_global_authority` with the assignment moved first, still in the `#[program]` fn body (`r21-uga`): the binary changed but there was no match. The bump stays a late load through the saved `ctx`.
- The same handler as an `#[inline(always)]` fn (`r21-uga3`): no match. Only the plain `fn` (inlined by LLVM's normal inliner) reproduces the entry-time loads.
- Handler reorder alone on Round20 (`reorder`): +0x11b758 only (706/120).

## Windows examined and left to Codex (active there)

- `0x180cc0`, `0x192c20` (token_2022 burn): Codex `parallel-main-migration-burn` delivered them; matched in Round23.
- Context-layout wrappers `0x12ba48`, `0x131128`, `0x1316e8`, and `0x137fc0`: these are Codex migration, distribution and context territory.
- 1-slot coordinate windows listed in Codex `parallel-main-data-frontier/round21-frontier.log` are coordinate-only and are not closed (no line padding).
