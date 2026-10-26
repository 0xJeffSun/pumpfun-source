# Read-only review of two pinned remote branches

Baseline main: `998a2275426b140706a08a96034ce02ff3483d65`. This review used immutable Git objects only. It made no checkout/index/ref/merge/push/delete changes, ran no repository script/test/harness, and read no new program ELF/body/data extent. Work-only receipts are adjacent. Dirty staged P27 is untouched. Exact-head hosted CI was not queried or claimed.

| Branch | Exact head | Divergence main / branch | Recommendation |
|---|---|---:|---|
| research/ata-history-build | e948288ef99bee0106fa5837fe04ab62f0625175 | 215 / 1 | Superseded negative source-pin experiment; preserve its tiny tooling patch/head as historical evidence, then root may delete remote. Do not merge into current recipe. |
| review/reconstruction-2026-10-25 | afbc9d2aafd89de11fa1298a264376c05c570be6 | 178 / 1 | Historical report mostly integrated already; preserve branch-only README/head if desired, then root may delete remote. No current behavior/tooling improvement merits merge. |

Neither head is an ancestor of main; `git cherry` reports each exclusive commit as `+`, so neither is literally patch-equivalent. This is not a claim that the branch commits were already merged. The dispositions follow complete changed-path/object comparison plus retained historical receipt metadata.

## ATA experiment

The exclusive commit changes exactly two files: `.github/workflows/dependency-build.yml` and `scripts/pump_build_token_dependency.py`. It swaps the ATA source pin from f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca to abc63ad9467907a0c443606e0d449094988848b0, relabels the workflow step, and adds unstripped.so/optional token2022 rlib preservation. There are no branch-owned build receipts or source patches. The branch commit explicitly skips CI.

Pinned main already retains the exact abc63 source attempt at `repro/pump/dependency-exactness/ata-candidate-build-5/comparison.json`: full and normalized equality are false; candidate hash e5e7aed11ad3969eea2aa76c8b4d2e73ea25be7e6b5cce989b7710cf5452496e and first difference5404. Earlier f5ce attempts2/4 retain ba8dd8a4… and first difference28601. Those are historical measurements, not a proof of current recipe closure. Reintroducing abc63 would replace the current source choice with an already measured negative experiment and change active workflow/helper hashes. It offers no justified byte-identity fix.

The unstripped preservation idea is useful in isolation but is not safe to adopt blindly: it unconditionally copies a specific bpfel release path after the build; existence is not checked or recorded as an optional artifact failure, so a different output layout can make an otherwise completed build fail before the comparison report. No branch receipt proves that copy path for this experiment. If useful later, implement it separately with actual numeric retention/failure receipts and unchanged accepted source pin. `ATA-exclusive-tooling.patch` preserves the complete small delta without activating it.

## Independent review branch

The branch adds43 paths and changes no active source, helper or workflow. All43 rows with exact modes/blob IDs are retained in `review43-path-blob-disposition.json`:

- 33 paths are already byte-for-byte identical at the same paths on pinned main.
- Nine build JSON receipts are absent from the current tree but are exact blobs already reachable through main ancestor347aec7b953a49ad21aa481e29174ec8a2215029. Commit31aa51d6a3cc61e5c0cc0f1115e230d23eb491ac deleted that report tree; most later reappeared. Restoring these nine old receipts is unnecessary for preservation; main history already retains them.
- One1234-byte README is absent from both current main and that historical347 tree. It is only a navigation/claim summary, no new executable or evidence. A byte-exact work-only copy is retained as `review-unique-README.historical.md`; root can retain it in a permanent branch-disposition archive before deletion. The report's underlying42 files are already preserved in main history.

The nine old build receipts describe obsolete candidates5c1c1c2d/d27be7e9/8f89dbeb/9e4e19df, not current selected programs. They report compiler child exits0 and source-after equality but are not fresh current-head tests. The branch reports zero/four whole-byte identity, which remains a limitation; it overstates some historical finite tests as general SDK readiness. Its bootstrap script's supporting programs/seed-accounts/demo directories are entirely absent from the branch tree. The README's requirements.txt path is not supplied. The claim that the committed setup is runnable as-is is therefore unsupported by committed payloads.

### Concrete tooling defects and test limits

These scripts are already identical on pinned main; the branch contributes no fix:

1. `B-differential/harness/run_diff.py:124-125` changes a nonzero child exit with parsed zero mismatches into PASS. It also reuses a fixed output path with exist_ok without removing stale report.out before launch. A failed subsequent child may therefore inherit stale successful evidence. This is unsuitable as an acceptance gate.
2. `B-differential/harness/run_surf.py:38-39` treats rc0 plus case count and missing mismatch count (None) as PASS. It does not require an affirmative zero mismatch result. It likewise reuses fixed output directories.
3. `D-sdk-localnet/start-localnet.sh:11,14` accepts an arbitrary ledger argument then executes `rm -rf "$LEDGER"` without a root/output bound. Do not run this historical convenience launcher unchanged. Its required eight local .so files and three seed JSONs are not committed at its relative paths.
4. Both harnesses hardcode another checkout/temp-session path and old candidate filenames, glob all matching scripts, and have no current allowlist to enforce stopped-lane exclusions. The stored report itself includes a stopped admin-incentives invocation. No stopped runner was executed in this review.
5. The committed aggregated results have106 rows,86PASS/4MISMATCH/16ERROR and39098 case labels, but omit all numeric child exits and candidate/hash bindings. The retained raw differential summary has90 rows,84PASS/4MISMATCH/2ERROR and38100 cases; raw Surfpool has16ERROR. The aggregate's corrections may explain the difference, but it is not a single complete authenticated current-head receipt set. None of those raw90 results falsely has PASS+nonzero rc; the failure-hiding issue is a reachable code defect, not an accusation that the saved results exercised it.
6. `C-dependencies/utilize_multiset.py` deliberately erases branch/call displacements and instruction ordering before multiset comparison. That is diagnostic only; it cannot establish CFG/callee/ABI/source equivalence or justify a source change. Dependency source/body/data evidence was not reopened in this branch review.

All five reviewed Python tooling files parse as AST. No program runner, test, compiler, VM/localnet, build/acquisition or experimental patch ran. Hosted CI status for these exact remote heads is unknown; the branch's recorded historical claims do not replace it. There is no candidate implementation to accept from either branch. Root should preserve the tiny unique patch/README/head records before deleting remote refs, rather than merge stale recipe or acceptance claims into current state.

Fees UTF8 v2 is completed and remains separately unadmitted/unrun at `work/fees2387-utf8-next-boundary-plan-v2`, seal5c9adee2b23587d1d3683d40d7d97001ace363e92f22c070eb475cb209754fc7. Fifteen synthetic control cases and pure verifier0 are retained; no collector/main/real decoder/build/runtime ran.
