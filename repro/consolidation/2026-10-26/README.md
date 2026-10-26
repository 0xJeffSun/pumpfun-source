# Consolidation transition (2026-10-26)

The pass-27 CI guard pins every current asset by SHA-256, including the root
README and the CI workflow. The 2026-10-26 consolidation rewrote the README, so
this package records that change as an explicit, reviewable transition instead of
weakening the guard.

- `transition.json` lists each changed asset with its pass-27 `before` hash and its
  new `after` hash: `README.md` and `.github/workflows/verify.yml`.
- `guard.py` runs an unchanged pass-27 entrypoint (`verify_current.py`,
  `verify_metadata.py` or `verify_portable_crypto.py`). It first checks this
  package's seal and the pass-27 guard code seal, then applies the transition only
  while the current-asset check runs. Every other pass-27 check, including the
  pinned script and workflow sets, sources, candidates, status files, history and
  attributes, is unchanged.

```sh
python3 -B repro/consolidation/2026-10-26/guard.py verify_current.py \
  --repo . --metadata repro/layered-passes/pass-27/current-metadata
```

To change another pinned asset later, add it to `transition.json` with its pass-27
hash as `before`, then reseal `manifest.json` and `manifest.sha256`.
