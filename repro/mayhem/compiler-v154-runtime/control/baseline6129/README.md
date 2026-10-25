# SellPumpSwap typed-result error refinement

One pinned v1.52 scratch build of the one-line source refinement passed all21 unchanged suites: **9595 functional comparisons, zero functional mismatches, no new unique cases**. The recorded/derived signed-execution count is19190; administrative receipts do not retain every signed transaction for independent byte-level checking. All58 flat diagnostic rows and three known second-burn source-location rows remain explicit.

The candidate is668640 bytes, SHA256 `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`. Its unstripped SHA256 is `948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8`. Original SHA256 is `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Whole original ELF identity remains false.

## Scope and proof

`proposal.patch` adds `.ok_or(PumpSwapError::PumpSwapCpiMathOverflow)` before the existing sizing unwrap in SellPumpSwap. It reuses the previously accepted typed-buy error variant; no other Cargo/Rust source differs from baseline. The new equality path stores11 and calls Result unwrap with the correct name and size4/alignment4 vtable. In the existing exercised zero-effective-quote SellPumpSwap cases the old Option message disappears, while source-location differences remain. `source-review.md` retains exact original branch/call/name/message evidence and the raw strict-guard limitation; `source-domain-invariant.md` bounds equality to vs=0 for the inspected successful caller domain. It does not claim full sizing/helper/error/formatter equivalence.

`static/before-inventory.json.gz` and `static/complete-inventory.json.gz` preserve complete before/after tables:441 original windows,410 grouped candidate windows,504 alias symbols,184 admitted originals and257 opaque originals.172 candidate windows match admitted originals under the unchanged normalizer. Full byte-difference intervals, sections, relocation records and admitted call/data/branch rows remain. No initializer or opaque original region was newly decoded, and no completion percentage is inferred.

## Reproduce without target execution

```
python3 -B verify.py
python3 -B verify.py --runtime-signatures --output /path/outside/this/package
```

The default verifies the whole seal and saved count/mismatch structure. `--runtime-signatures` additionally checks all13284 retained transaction strings/26500 signatures, extracts a disposable tree from the included archives, and runs all15 **unchanged saved-receipt verifiers** against those archived receipts. It does not run a VM, build, submit transactions or create test cases. Its six administrative suites remain functional evidence without complete retained raw-signature coverage.

Static regeneration is available through `static/check.py` and `static/full_inventory.py`; use a disposable copy because they rewrite derived files. No original work-directory path is required. The full runtime helpers/inputs/source are in `runtime-repository.tar.gz`; all raw receipts, attempt logs, verifications and captured burn fixtures are in `receipts-and-verification.tar.gz`. Individual compressed receipts and verification files also remain directly linkable.

## Reviewable artifacts

- `build01/`: exactly one successful build's raw stripped/symbol files, attempt, log, comparison, source/compiler/SDK fingerprints. Existing unused/dead-code and syscall-discovery warnings are retained; no backend/compiler error occurred.
- `gate-before.json`, `gate-after-build.json`, `gate-after-runtime.json`, `dependency-integrity-*.json`: source/helper/runtime/tool integrity and215 locked package archives/source trees.
- `source/programs/mayhem/`, `before/`, `proposal/`: complete compiled source and exact one-file delta, plus README and Mayhem-only status proposals preserving family and burn metadata.
- `summary.json`, `diagnostic-differences.json`, `selected-before-after-diagnostics.json`:9595-comparison accounting and complete retained diagnostic distinctions.
- `source-only-review.tar.gz`: immutable original source-only review and pinned evidence.
- `PROMOTION-UNRUN.md`: worker's unrun recipe for a single root main build; any completed root main identity belongs to `repro/mayhem/sell-result-error-main-twentyfour`.

No main edit or publication was performed by this worker. The scratch package is intended for `repro/mayhem/sell-result-error-twentyfour`. Excluded scopes remain excluded; no new probe or fixture was added. Source/byte/security completeness, historical compiler identity and raw log equality remain unresolved.

The packaged portable verification was executed successfully: all15 unchanged receipt verifiers passed and all13284 retained transaction strings/26500 signatures verified. Results/logs are retained in `portable-verification/`. This adds no target execution.
