# v1.43 recipe switch — pump / pump_amm / pump_fees

Switches the three older core programs from the committed **v1.44** compiler to the
evidence-correct **v1.43** (mayhem stays v1.52). See ../RECIPE-REVERSE-ENGINEERING.md
for why v1.43 is correct (binary std-layout fingerprints + section-size match).

## What's here
- `<prog>/<candidate>.so` — the v1.43 build of each program (from current source).
- `<prog>/build-comparison.json`, `<prog>/build-attempt.json` — v1.43 build provenance
  (returncode 0, source_unchanged true, selected_toolchain v1.43).
- `RECEIPTS-SUMMARY.json` — per-suite differential tally against the v1.43 candidates.
- `status-v1.43-patch.json` — the status.json field changes to apply.

## Validation (this session, via scripts/*_differential.py vs evidence/original)
| Program | v1.43 sha256 | bytes | cases | mismatches |
|---|---|---:|---:|---:|
| pump | e3bae5a8… | 1,662,912 | 5,859 | 92 (only `pump_v3_token_extensions`, the known partial-handler gap, compiler-independent) |
| pump_amm | 0750daa6… | 1,254,848 | 16,381 | 0 |
| pump_fees | a6eab562… | 888,568 | 2,271 | 0 |

The v1.43 builds are **behaviorally identical** to the committed v1.44 builds (same
source, different codegen) — confirmed by zero unexpected differential mismatches.

## How to promote (team step, do atomically when sibling churn settles)
A full in-place switch of the bespoke committed checkpoints could not be landed safely
during this session: concurrent sessions rewrite those exact checkpoints and status.json
every few minutes, each checkpoint's verify.py **hardcodes** the candidate hash/size, and
the regenerated receipts total ~780 MB (too large for git). To promote:
1. For each program, rebuild with v1.43: `PYTHONPATH=scripts python3 scripts/build_partial_candidate.py --manifest programs/<crate>/Cargo.toml --program <prog> --artifact-name <artifact> --tools-version v1.43 --output <dir>`.
2. Replace the checkpoint's candidate .so with the v1.43 build; regenerate its build-comparison.json / build-attempt.json.
3. Regenerate the differential receipts against the v1.43 candidate (same suites) and repackage (manifest-sha256.json, the hardcoded hash in verify.py, provenance.json, main-scratch-identity.json, receipt-build-bindings.json).
4. Apply `status-v1.43-patch.json` to repro/status.json.
5. Run the checkpoint verify.py + scripts/verify_current_bindings.py to confirm clean.

Do this as one commit per program so CI never sees a half-switched state.
