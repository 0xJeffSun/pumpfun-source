# AMM fee-update event borrowing checkpoint

One isolated fixed-recipe build changed only `update_fee_config`'s `emit!(event.clone())` to `emit!(event)`. The fresh candidate is **1,199,048 bytes**, SHA-256 `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1`. The complete update handler now measures **2,912 bytes and matches the captured original normalized instruction body**. Its wrapper and event serializer also match completely. This is a measured result, not a predicted size or optimized binary patch.

All **17,462 unchanged comparisons across 25 suites passed**, with **35,418 independently verified signatures**, 191 existing scalar diagnostic checks and 78 existing recipient diagnostic checks. No new case, initializer-success fixture or signing workaround was introduced. Main source and central status remain unchanged pending review. Creation remains static-only; bounded handler and case counts remain 37 and 17,462. Whole-original ELF equality is **false** and the audit remains incomplete.

## Approved source and actual build provenance

`prebuild/` is the exact reviewed source-only residual package, seal `229c6fb667ed31cc114cbfa96a32b368f38b7ae8d0b2787893f77b31f285405f`. It includes the independent event-copy analysis and its seal, frozen 807010 source/ELF evidence, full scalar/caller windows, and the exact one-line patch. `source/` contains all 22 proposed inputs. Only `programs/pump-amm/src/lib.rs` differs from the accepted baseline, by that one event expression; Cargo, locks, profile, methods and all other source files are unchanged.

The clean `build-01` invocation uses CLI 2.1.21, explicitly selected v1.44 compilation, its own target/SDK/rustup home and the existing cached pinned dependencies. Cargo metadata proves the actual compiler sysroot. The unchanged installed SDK separately strips with v1.52; both phase identities are retained. The CLI banner's default platform v1.43 and final strip-phase alias are not used to infer the compilation toolchain. No source/flag/toolchain/path variants or additional builds were attempted.

`frozen-inputs.json` and `tools-before.json` bind inputs before compilation. `build-attempt.json` proves all 22 source inputs unchanged afterward; `tools-after.json` equals the recorded tool/helper/SDK identities. The current dependency check verifies 254 locked public archive checksums and 5,567 extracted source files, without claiming the original historical graph. All build logs, actual helper sources, phase scripts, candidate and symbols are retained. Generated deployment keypairs were excluded before opening; their path metadata alone is recorded. The target directory is never recursively packaged.

## Fresh complete static result and remaining obligations

The new update handler is at `0xc8340`, now **2,912 / 2,912 bytes**, with no normalized instruction differences. The accepted 807010 handler was 3,160 bytes. The measured 248-byte reduction removes the observed second event construction, and both event serializers now receive the same `r10−584` event value. No executable bytes were patched to obtain this result.

| Fresh root | Original/candidate bytes | Complete normalized match | Immediate target matches |
|---|---:|---|---:|
| Update wrapper | 2296 / 2296 | Yes | 13 / 13 |
| Update handler | 2912 / 2912 | Yes | **12 / 16** |
| Update event serializer | 744 / 744 | Yes | 4 / 4 |
| Create wrapper | 2320 / 2320 | Yes | 13 / 13 |
| Create handler | 3032 / 3032 | Yes | 12 / 16 |
| Create context | 5752 / 5752 | Yes | 39 / 40 |
| Create event serializer | 744 / 744 | Yes | 4 / 4 |
| Init helper | 5896 / 5896 | No: two source-coordinate immediates | 16 / 16 |
| Recipient setter | 2336 / 2336 | No: four source-coordinate immediates | 23 / 23 |

All three scalar methods remain **608 versus 616 original bytes**. Their actual called 1,336-byte `with_values` helper still has four normalized instruction differences, with all eight direct targets matching. The other generic matching helper is not substituted for their actual calls. All four shared methods retain the real create/update caller graph. Truthful source coordinates and the specialization residual remain unresolved; no new claim of transitive handler equality is made.

The update-specific data check covers every relocated reference in the complete wrapper/handler/event roots: **nine references**, of which five explicit consumed spans match and four compiler error/format/Location metadata extents remain unproved. Both inline literals match: UpdateFeeConfigEvent discriminator `5a1741233ef4bcd0` and the unchanged Anchor event-CPI tag. `update-data-comparison.json` separately records those bounds and the two calls' shared event-buffer definitions. Thus body equality does not silently stand in for full data or callee equality.

The creation data checks and their pre-existing metadata limits are retained. Fresh Pool exit at `0x4570` (1,704 bytes) and GlobalConfig exit at `0x3f00` (1,648 bytes), **all 24 direct targets each**, and their discriminator literals still match the original. Creation has no new runtime success evidence.

One read-only data checker initially assumed that both serializer arguments were assembled immediately from `r10`. The original/current first call instead passes `r8`, previously established as `r10−584`; the second directly uses that stack offset. The failed checker and output are retained, and its corrected version traces those actual definitions. This was a checker correction only: no source change, build repeat or runtime rerun followed it. The initial checker failure and the successful fresh checks are retained.

## Unchanged runtime and signed evidence

The same 25 maintained suite commands use this exact candidate. Their 32 maintained harness inputs and 13 runtime fixture/dependency inputs are hash-bound, together with the observational runner and signature recorder. Existing transaction-history configurations remain unchanged. Every ordinary test-owned transaction signature is verified before unchanged forwarding to LiteSVM; loaded program hashes, signed transaction bytes, error and log hashes are retained. No historical message is modified.

All 25 commands succeeded once. There are **34,924 comparison transactions plus 150 existing signed original-program boost setup transactions**, for 35,074 observed transactions and 35,418 signatures. Setup is independently classified by decoded instruction and is not counted as a new comparison. Each saved original/candidate transaction pair binds its case errors and available log evidence.

The 356 fee-config case payloads/mutations remain identical to the accepted corpus. Read-only saved-result checks pass for all 191 existing scalar Left/Right cases and 78 recipient failures, including rollback and removal of spurious compared-public-key output. No new fixture is added. `receipt-bindings.json.gz` binds every suite to the exact tested candidate, its clean 22-input build report and all signed sidecars.

Legacy embedded source maps describe the accepted 22-input 807010 checkout at execution time, not this one-line scratch compilation. Those maps are retained verbatim and labeled as snapshots. Actual build maps establish this executable's source provenance. No receipt inheritance is claimed: the unchanged corpus was freshly run once on this candidate.

## Handoff boundary

This is a portable scratch handoff for root review; no main promotion, staging or commit occurred. The full reviewed source proposal and prior evidence remain sealed within `prebuild/`. A future main promotion would require a separately source-bound clean build and whole-file identity before reusing these receipts. Normalized update-body equality is now established, while four immediate handler targets, compiler metadata, historical source/compiler/dependencies and whole-program equality remain unresolved.

Run `work/test-env/bin/python -B work/amm-update-event-build/handoff/verify.py`, or use its absolute path from another directory. Optional `--current-source /path/to/repo` checks the accepted 22-input checkout baseline. Python 3.11+ and the recorded `solders` package are required. The verifier reads static/saved evidence and verifies transaction signatures without compiling, replaying, requiring Surfpool or contacting the network.
