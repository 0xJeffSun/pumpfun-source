# Handoff

- Selected **Burn C0094 ↔ O0071** after classifying all **409 candidate / 441 original** rows. No initializer body or opaque target was decoded.
- New witness: original calls `0xd990` / `0xdaf0` share a Display-formatting failure branch to `0xee00`; candidate helper `[42160,42584)` constructs the 17/21-byte error messages directly. Original location evidence points to `alloc/src/string.rs:2830:14`.
- **No supported source patch.** Historical error-formatting source and bound lowering evidence are the falsifiable missing artifact; see `missing-artifact.json`.
- `REPORT.md` explains selection, complete call/data inventory, allocations and limits. `selection-ledger.json` supplies machine evidence. `input-map.json`, `ownedmap.json`, `manifest.json` seal public files only and preserve predecessor packages unchanged.
- Verify from any separate copy: `python3 -B verify.py`. Actual result and tamper tests are recorded beside the package in `verification.json`.
- No build, runtime, fixture, main edit, Git write, network or acceptance-count change. Whole-file equality remains false.
