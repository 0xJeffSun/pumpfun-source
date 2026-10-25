# Restored three validated recoveries the merge reconciliation dropped from main

_2026-10-25. During a review pass, main was found to be missing three previously-recovered,
oracle-validated handler sets. All three commits are **ancestors of main**, but the
`merge-all-prs` checkpoint reconciliation (commits ~06:20–06:48, e.g. the "Integrate …" /
"Merge … into merge-all-prs" commits) rebuilt the program trees from a selected checkpoint that
omitted them. None was dropped on a correctness finding — the exclusions were mechanical
blob-selection, documented in the one case that left a note as "No incoming source semantics
were reviewed, compiled or executed." This restores all three, each re-validated on the
**corrected v1.44 compiler** (e_machine 263; the original validations used the now-retracted
v1.43)._

## What was missing and why it mattered
| Recovery | origin commit | effect of the drop | SDK impact |
|---|---|---|---|
| pump `claim_token_incentives` + `admin_update_token_incentives` | `294c9186` | pump back to 53 pub fn, no incentives module | **#1 hard-fail**: SDK builds both on `offlinePumpProgram` → `InstructionFallbackNotFound` |
| pump `create_v2` Mayhem mode + mayhem `initialize_mayhem_state` | `aa0b1f5b` | `create_v2` rejected `is_mayhem_mode` via a stub; mayhem had no initializer | Mayhem-mode token creation non-functional |
| pump v3 Token-2022 transfer-fee quote branches (`buy_v3`/`sell_v3`/`buy_exact_quote_in_v3`) | `7b3a63fb` | `quote_transfer_fee` helper absent | SDK Token-2022 transfer-fee quote routes diverge from the original |

## Re-validation (single fresh candidate, all oracles, vs captured originals)
Built pump (v1.44) + mayhem (v1.52), both `e_machine=263`, with all three recoveries applied,
then ran every relevant differential against `evidence/original/{pump,mayhem}/deployed.so`:

| Oracle | cases | result |
|---|---:|---|
| `pump_claim_token_incentives_differential` | 60 | `mismatches=[]` |
| `pump_admin_token_incentives_differential` | 98 (44==44 successes) | `mismatches=[]` |
| `pump_create_mayhem_differential` (end-to-end CPI) | 17 | `mismatches=[]` |
| `pump_v3_token_extensions_differential` | 126 | `mismatches=[]` |

Each compares account state, errors, logs/events, inner instructions and return data byte-for-byte.
The single candidate passing all four confirms the recoveries compose without regression.

## Commits restoring them (this session, on main)
- `e8338e77` — Mayhem-create path (+ the end-to-end CPI oracle).
- `498994cd` — token-incentive handlers.
- this commit — v3 Token-2022 transfer-fee branches (+ `pump_v3_token_extensions_differential.py`).

pump now dispatches 55 handlers again. Only `set_mayhem_virtual_params` remains undispatched —
a dormant, CPI-only handler with no captured caller (its driver lives in the ~100 KB of
unreconstructed original-mayhem code), so it cannot be honestly validated and is documented, not
guessed. See `MAYHEM-CREATE-RECOVERY.md` and `DEPENDENCY-BYTE-IDENTICALITY-FINAL.md`.

## Guard against recurrence
These three are the complete set of dropped, independently-validated recoveries found this pass
(admin_cto.rs is already current on main; pump-fees `sharing.rs` on main is newer than the stale
working-tree copy — neither was restored). If the `merge-all-prs` reconciliation runs again, it
must carry these blobs forward or it will re-break the SDK integration.
