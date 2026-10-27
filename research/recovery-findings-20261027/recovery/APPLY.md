# Ready-to-apply patches

Both diffs are against `origin/main` @ `a853b393` (the `programs/mayhem/src` and
`programs/pump-fees` trees are unchanged on `main` since then); both were verified with
`git apply --check` against `origin/main` on 2026-10-27.

| Diff | What it does | Validation |
|---|---|---|
| [`mayhem-enum-consolidation.diff`](mayhem-enum-consolidation.diff) | Consolidates the 5 split error enums into the original's single 20-variant `MayhemError`, and fixes the pump-swap slippage code (`PumpCpiSlippage` 6012 → `PumpSwapCpiSlippage` 6013). EDITs 1/2/3 of `mayhem-error-enum.patch.txt`, including the `burn.rs` repoint + import. | Compiles clean on the committed v1.54 recipe; `.text` masked-Jaccard +0.6pp ([`mayhem-enum-validation.md`](mayhem-enum-validation.md)) |
| [`fees-pathstring-relocations.diff`](fees-pathstring-relocations.diff) | 6 TIER-0 `#[path]` relocations: pure file renames plus 6 `lib.rs` module lines, with module names unchanged. | Matching original path strings 4 → 10 of 20; zero `.text` regression (masked-Jaccard 0.789938 → 0.789986) |

Apply from the repo root:

```bash
git apply research/recovery-findings-20261027/recovery/mayhem-enum-consolidation.diff
```

**These are review artifacts, not selected-source changes.** `programs/*` sources are pinned by
the pass-27 guard, so promoting either patch into active source still takes the normal path:
build a new candidate, bind receipts and differentials, update `repro/status.json`, and add a
reviewed guard transition. Pasting a diff into `programs/` on its own will fail CI.
