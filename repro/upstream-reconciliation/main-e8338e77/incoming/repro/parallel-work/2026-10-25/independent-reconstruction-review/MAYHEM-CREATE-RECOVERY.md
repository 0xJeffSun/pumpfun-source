# Recovery: pump `create_v2` Mayhem-mode + mayhem `initialize_mayhem_state` (validated end-to-end)

_2026-10-25. Re-includes, with hard behavioral validation, the Mayhem-create path that was
added in `aa0b1f5b` and then excluded in `ef327155` ("Preserve excluded incoming Mayhem research
outside accepted compiler inputs"). The exclusion was tied to the v1.43 compiler cleanup; the
Mayhem-create logic itself is correct, as proven below._

## What was missing on main
- `programs/pump/src/create_v2.rs`: the Mayhem-mode branch was a **stub** —
  `require!(!is_mayhem_mode, ReconstructionError::ReconstructionBranchUnsupported)` — so any
  `create_v2` with `is_mayhem_mode = true` was rejected outright.
- `programs/mayhem/src/lib.rs`: `initialize_mayhem_state` + its `InitializeMayhemState` account
  context were **absent**. (The `MayhemState` layout, `MAYHEM_ID`, and the `CreateV2` Mayhem
  accounts were already on main — only the handler body and the mayhem handler were excluded.)

Net effect on main: Mayhem-mode token creation was non-functional.

## Why it could not be "validated standalone" — and how it is validated now
`initialize_mayhem_state` requires account #2 (`mint_authority`) to be pump's off-curve
`["mint-authority"]` PDA **and a signer**. No standalone transaction or local keypair can honestly
produce that signature; it can only be signed by **pump** via `invoke_signed`. So a standalone
oracle is impossible — but an **end-to-end** one is not.

`scripts/pump_create_mayhem_differential.py` drives pump's real `create_v2` Mayhem-mode
instruction, which `invoke_signed`s into mayhem `initialize_mayhem_state` (disc
`0x2dcc4555485ebd9d`, no args) using pump's `["mint-authority"]` PDA — the genuine CPI, no
synthetic signer. One valid transaction therefore exercises **both** the pump branch and the
mayhem handler. Each case runs against the captured originals **and** the independently rebuilt
pump+mayhem pair, comparing account state (before/after), error codes, logs, events, inner
instructions, and return data.

## Validation result (byte-level behavioral, candidate vs captured original)
- Candidate pump `f85dc9ea…` (built v1.44, `e_machine=263`), candidate mayhem `cbe8c8e7…`
  (built v1.52, `e_machine=263`), vs original pump `7a19affa…` / original mayhem.
- **17 / 17 cases, `mismatches: []`**, every case's `diff: []`.
- Cases: `mayhem-base`; duration `0/1/7/24/255`; `mayhem-disabled`, `create-v2-disabled`,
  `global-params-uninitialized` (error paths); `normal-mode-regression` (non-Mayhem create still
  matches); `name-32/33`, `symbol-13/14`, `uri-200/201` (Borsh length boundaries);
  `zero-creator-is-rejected`.

Both programs build with their established toolchains (pump v1.44, mayhem v1.52) and emit the
correct SBF ELF header (263), so this is not a header-incompatible older-family build.

## Scope / honesty
This is a **behavioral** recovery (semantic identity against the captured originals), not a claim
of whole-binary byte-identicality — which remains bounded by lost literal source per
`DEPENDENCY-BYTE-IDENTICALITY-FINAL.md` and `FULL-GAP-REPORT.md`. The recovered `MayhemState`
field names are behavioral (`field_8`, `field_56`, …); the Borsh positions are exact and oracle-
confirmed, the historical Rust identifiers are not asserted.
