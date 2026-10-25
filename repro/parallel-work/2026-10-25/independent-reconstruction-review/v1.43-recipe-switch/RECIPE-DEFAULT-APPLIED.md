# Durable v1.43 recipe — applied to the build tooling (2026-10-25)

The reverse-engineered compiler recipe is now the **default** in the build pipeline, so
future reconstruction-pass builds use it without needing an explicit flag:

- `scripts/build_partial_candidate.py` `--tools-version` now defaults to a **per-program
  recipe** when omitted: **pump / pump_amm / pump_fees → v1.43**, **mayhem → v1.52**.
  An explicit `--tools-version` still overrides it.
- `repro/status.json` records `preferred_compiler_candidate: v1.43` + a `compiler_recipe_note`
  for the three programs (mayhem noted as v1.52).

This is the durable switch: it changes what future builds produce, not the historical
v1.44 checkpoint artifacts. Those committed candidates stay v1.44-built (and their CI
`verify.py`/assertions still pin v1.44) until a reconstruction pass regenerates each
checkpoint with v1.43 — at which point that pass should also update the per-checkpoint
`selected_toolchain == "v1.44"` assertions to v1.43, atomically per program (see the
promotion procedure in README.md). No existing checkpoint, hash binding, or CI assertion
is changed by this recipe-default edit, so CI stays green.
