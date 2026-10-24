# Partial Pump reconstruction

This Anchor 0.31.1 program independently implements four recovered administrative
handlers: `toggle_create_v2`, `toggle_mayhem_mode`, `toggle_cashback_enabled`, and
`set_max_curve_depth`. It is incomplete and not a deployable replacement.

The account layout comes from the captured official IDL. Runtime comparison with
the original validates the observed authorization, PDA, serialization and state
mutation behavior for these four handlers. Toggle handlers reject unchanged values
with NotAuthorized (6000); their success path changes the corresponding boolean
and does not emit an event. Wrong authority uses the same custom error rather than
Anchor's default ConstraintHasOne. `set_max_curve_depth` accepts the tested u8
boundaries without a further range restriction.

A fresh-target build and 93 differential cases are recorded under `repro/pump/`.
The 207,960-byte candidate differs from the original 10,485,715-byte allocation,
starting at byte 24. No full-program or instruction-level byte match is claimed.
The source crate's actual historical Anchor/toolchain versions remain unresolved.
Anchor 0.31.1 matches the observed error101 response to short dispatch data; this
is a useful candidate constraint, not unique version identification.

Reproduce using installed platform-tools v1.52 and root Python requirements:

```sh
python scripts/build_partial_candidate.py --manifest programs/pump/Cargo.toml \
  --program pump --artifact-name pump_recovered.so --output work/pump-clean
python scripts/pump_validate_admin.py \
  --candidate work/pump-clean/artifacts/pump_recovered.so \
  --output work/pump-admin-differential.json
python scripts/pump_verify_dependencies.py
```

Differential checks compare the error code, complete global state bytes and global
lamports. Logs, compute units, full transaction effects and unimplemented handlers
are not claimed equal. Tests use a local LiteSVM and synthetic administration keys.
