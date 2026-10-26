# Candidate promotion — pump 56/56 and mayhem 25/25, reproduced from committed main

_2026-10-25. Promotes the recovered dispatch-complete builds as the committed `repro/status.json`
candidates, replacing the stale pre-recovery candidates, and records that both deterministically
rebuild from `origin/main` so the SDK flows reproduce from a clean checkout._

## Why the prior candidates were stale
Scanning Anchor `global:<name>` discriminators in each committed `.so` (scanner validated against the
deployed originals, which read full coverage):

| program | prior committed candidate | dispatch | missing |
|---|---|---|---|
| pump | `admin-cto-compared-errors-main-fortyeight` | **53/56** | `claim_token_incentives`, `admin_update_token_incentives`, `set_mayhem_virtual_params` |
| mayhem | `sell-result-error-main-twentyfour` | **24/25** | `initialize_mayhem_state` (the `create_v2` Mayhem-mode CPI target) |

The pump `lib.rs` on main already wired all three recovered handlers (`#[program] pub mod pump_recovered`),
and mayhem `lib.rs` already wired `initialize_mayhem_state` — but `status.json` still pointed at
binaries built **before** those handlers existed, so a clean-checkout build and the committed candidate
disagreed.

## What was promoted
| program | new candidate | sha256 | dispatch |
|---|---|---|---|
| pump | `repro/pump/recovered-dispatch-56-from-main-v144/main/candidate.so` | `5392c9a9…` (1,671,184 B) | **56/56** |
| mayhem | `repro/mayhem/recovered-dispatch-25-from-main-v152/main/candidate.so` | `cbe8c8e7…` (691,128 B) | **25/25** |

Each new candidate dir carries `controls/identity.json`, `build-recipe.json`, `dispatch-coverage.json`
and `REPRODUCTION.md`. `status.json` keeps the old path as `prior_candidate_artifact`.

## Reproduction proof (the point of the promotion)
Each program was rebuilt from a **pristine `origin/main` git worktree** (`14ec9b5c`) with its recorded
recipe — pump `cargo build-sbf v1.44 --offline --locked`, mayhem `v1.52` — into an isolated target dir.
Both rebuilds came out **byte-identical** (same sha256) to the builds the `@pump-fun` SDK integration
actually ran against:

- pump rebuilt-from-main `5392c9a9…` == SDK build `5392c9a9…`  ✓ (56/56)
- mayhem rebuilt-from-main `cbe8c8e7…` == SDK build `cbe8c8e7…`  ✓ (25/25, incl. `initialize_mayhem_state`)

So the SDK flows reproduce from committed main source, deterministically.

## What this does NOT claim
Neither candidate is byte-identical to its deployed original (`full_byte_equality` stays `false` for both;
pump original 10.48 MB, mayhem original 777,408 B). This is **dispatch completeness + deterministic
reproduction from main**, not byte equality. The byte-identicality limit (lost source
structure/inlining) is unchanged.

## Standing risk — branch may re-drop the wiring
`origin/main` currently has the pump wiring (`set_mayhem_virtual_params` etc.). The working branch
`codex/layered-reconstruction` does **not** wire `set_mayhem_virtual_params` into `lib.rs`, so the next
`codex/layered-pass-N` merge from that branch can revert it on main again (the recurring regression the
sol-azy pass flagged). The durable fix is to carry the wiring on the branch too.
