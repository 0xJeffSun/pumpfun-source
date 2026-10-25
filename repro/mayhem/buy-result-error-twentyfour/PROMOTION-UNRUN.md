# UNRUN: one clean main-promotion recipe

No main source change or main rebuild was performed by this worker. Intended scratch publication: `repro/mayhem/buy-result-error-twentyfour`. Intended companion: `repro/mayhem/buy-result-error-main-twentyfour`.

1. Verify scratch publication seal and review `summary.json`, `static/summary.json`, `static/inventory-summary.json`, `gate-before.json`, `gate-after-build.json`, `dependency-integrity.json`, and `verification/results.json`. All9595 functional comparisons passed; known diagnostic differences, including three second-burn rows, remain in the full receipts.
2. Recheck every `main_sources`, `helpers`, `runtime_inputs`, and `tools` hash in `gate-before.json` against the repository/tool paths. The source map is the exact accepted24-handler baseline. Recheck the prior two-file proposal hashes. Stop on drift; do not silently rebase.
3. Copy only the reviewed `buy_pump_swap.rs` and `pump_swap_types.rs` from scratch publication's `proposal/` into the corresponding `programs/mayhem/src/instructions/` paths. Apply the separately reviewed README proposal. Verify every other Cargo/Rust source remains byte-identical to the gate baseline, and the two changed files equal scratch `source/` files. No Cargo.toml/lock/helper/dependency edits.
4. Run exactly one clean build from the repository root with the same established cache and unchanged helper:

```
CARGO_HOME="$PWD/work/mayhem-burn-fixtures/cargo-home" PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_partial_candidate.py --manifest programs/mayhem/Cargo.toml --program mayhem --artifact-name mayhem_recovered.so --tools-version v1.52 --output work/mayhem-buy-result-error-main
```

The output path must not already exist. Do not switch versions/flags or retry another recipe. Check process exit0, source_unchanged=true, and no compiler/backend errors. Retain all warnings/failures.

5. Require raw SHA256 of main `artifacts/mayhem_recovered.so` to be `dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4` and its size668544. Require unstripped `target/sbf-solana-solana/release/mayhem_recovered.so` SHA256 `f356e4a5c28ba6b5fb2312c6799470a0ffc9e8bec39984650de33797042ba1d2`. Also compare all meaningful allocated sections before accepting stripped/unstripped correspondence. Stop on mismatch; scratch receipts cannot establish acceptance for different main bytes.
6. Repeat main source/helper/dependency/tool integrity checks and retain their receipts. Only exact scratch/main executable equality permits associating the retained21-suite/9595-comparison receipts with promoted main. Publish main build/identity/gate evidence under `repro/mayhem/buy-result-error-main-twentyfour`; keep the immutable scratch package separate.

The compiler is the existing pinned v1.52 selection, not inferred historical provenance. A new research document naming another version does not change this recipe. No initializer work, new fixture, additional runtime case, source-coordinate fabrication, binary modification or excluded trade probe is authorized by this recipe.
