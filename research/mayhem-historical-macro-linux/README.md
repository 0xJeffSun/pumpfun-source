# Native Linux historical macro composition

This packet rebuilds the complete authenticated historical Anchor program macro and composes it with both the 67-file Mayhem sizing snapshot and the newer initializer-recovery source using the official **Linux x86-64 v1.54 SDK**. It independently reproduces the published allocator-context effect and complete initializer match without a Mac compiler or a manually rendered parser.

Credit the upstream historical-macro/current-composition packets for the source discovery and mixed-toolchain result. This native recipe preserves **429/441 normalized original windows**, restores the second 328-byte allocator-shaped instance, and raises **native raw-local matches from 84 to 85**. The extra raw match is the complete 544-byte original window at address 538944. All prior 84 native raw-local matches survive.

The latest native composition reaches **430/441 normalized / 85 native raw-local windows**. Credit the upstream `mayhem-initializer-current-recovery-20261027` packet for recovering O0193. Its 960-byte initializer reproduces under Linux with the same ordered immediate callees and bounded typed references. Eleven bodies remain unmatched.

This is a native-recipe reproduction and a small native raw-local improvement. It adds **zero matches to the upstream normalized frontier**, does not improve or add to the separate mixed/qualified 430/141-raw composition, and does not promote a selected candidate. **Whole core identity remains 0/4**; the other three core programs were not freshly compiled or compared here.

| Native artifact | Stripped SHA-256 | Scope |
| --- | --- | --- |
| Current sizing source control | `5664f502026f369542ed3b71815b9d94239daad9e4856e50fe8b919dff6968f2` | 429 normalized / 84 raw-local |
| Historical macro enabled | `77e839c7ae3d529d5d04bcbef8d05df14cea135c74c3daf909014895dfc6e5e4` | 429 normalized / 85 raw-local |
| Independent root repeat | Same enabled hash, with identical complete symbols | Actual second root compilation |
| Exact upstream Solana gate applied to historical macro | `8b654deabc881d35156dbf5e6bd78bb51da8ef95c833800e73e806e4d63058e6` | Restores the control's 449 named normalized shapes; full ELF differs |
| Newer initializer source + historical macro, two root builds | `1da2887c0b0c30cc08c2ddf0d62f9c8d3b5a6ec31a3bcb51f599d5674432da83` | 430 normalized / 85 native raw-local; fresh initializer replay only |

The enabled symbol artifact is `4b882a6f60a889db82227ae10d87de5f073cf89e7fee2aa6b36deeeef149e17a`. The new host macro is an actual x86-64 ELF shared library, SHA-256 `3b0a5efc2cf5a15ac9b198ab2a6aa66650ababe46ee615a1bc45c796b1a7de31`.

The newer 430-window symbol artifact is `d83df322388bd4f43427e752ee5e17376542b378d3bf8bb1ed20155a4d6154c1`. A separate native 430-window current-framework control is retained at `0a11752e49292d75ff63d4d32e45a54e03ba24d80744d41e6ea12e3cfbb241c7`, with 84 raw-local matches; composing the historical macro again retains those 84 and adds the same 544-byte raw-local match.

## Source and compilation evidence

All 121 historical source files authenticate to the retained public Git tree. The exact host manifest, lockfile and ten checksum-verified supplemental crates are included. The host macro builds in a new target directory on Linux; this does not authenticate the original deployed build environment. Target dependency libraries are reused, so these are incremental target compilations rather than full clean dependency builds.

Only two of the 67 current program inputs change: the curve crate's explicit macro invocation and its historical CreateEvent-bearing IDL. Every handler, the complete root `lib.rs`, existing program namespace and generated-reference source remain unchanged. The producer replays the actual current compiler commands with the freshly built host macro and curve archive. Original target ELFs are comparison/runtime inputs only, never compiler/linker inputs. No binary rewriting, padding, assembly or additional normalization masks are used.

The newer stage takes the upstream initializer source archive exactly: only its `src/state.rs` differs from the sizing snapshot. It then composes the same two macro/IDL changes and reuses the authenticated native curve archive. That initializer source uses the upstream real AccountInfo/Pubkey snapshot and inline state initializer; no dummy stores, binary edits or custom reconstruction of its source are introduced here. The checker verifies the complete normalized body, five ordered local-callee shapes plus the `abort` import, two complete Source records, the unwrap message and ProgramError vtable header/immediate method shape. Recursive callee/data closure remains outside this bounded check.

The control and enabled output each contain 449 inferred candidate windows. Counting duplicate symbol names correctly, 448 named normalized shapes are preserved. One `finish_grow` instance changes from 312 to 328 bytes: the original has two instances of that 328-byte shape; the control has one and the enabled output has two. This is a shape-multiplicity result, not a complete ordered-callee/data proof. Function placement and call immediates remain separate obligations.

The gated host build uses the exact upstream change with Git blob `4fb84b0879c07819886ba419fee5b6434436555d`. Its target restores the entire control named-shape multiset. **Unlike the earlier mixed-toolchain result, this native gated ELF does not reproduce the complete control ELF**: text/layout/call bytes and relocation records differ. Both complete artifacts are retained. No gated VM execution is claimed.

Commands, environments, source/tool/dependency hashes, actual compiler output, host shared libraries and all complete target artifacts are retained. The six SDK tools are checked as Linux x86-64 ELFs, and all 26 target-library hashes are rechecked after the runs against the official archive receipt. Not every host dynamic library or the host C linker is pinned. No historical-source, unique-source or whole-program equivalence conclusion follows from this reproduction.

## Fresh runtime verification

The earlier 429-window enabled artifact has two separately executed finite matrices:

- **6,636 trade comparison pairs / 13,272 signed records** in fourteen unchanged currency/trade suites. Existing independent read-only checkers verify the saved payloads, states, errors, events, CPI fields and rollback. All non-compute logs agree.
- **69 initializer comparison pairs / 168 signed records**, including ten genuine original-Pump-to-Mayhem CPI creation successes. These executions attest the actual executable program-account hashes. All checked fields and non-compute logs agree; nine CPI pairs retain raw compute-log differences.

The record counts are not unique-signature or exhaustive-behavior counts. The control, repeat and gated artifacts do not inherit the enabled candidate's executions. No live-chain transaction or deployment occurred.

The newer **430-window composition has its own fresh 69 initializer pairs / 168 signed records**, including ten genuine Pump CPI creation successes. Its actual program accounts and signatures are checked independently. The earlier 6,636 trade pairs remain bound exclusively to the earlier `77e839…` executable; they are not relabeled as tests of `1da288…`. These initializer scenarios overlap the earlier matrix and add no unique scenario-count claim.

All 71 raw trade runtime files, including reports, original commands, independent results and logs, are retained losslessly in `runtime/trade.tar.xz` with a per-file hash inventory. Verification streams that archive, rechecks every file, reconstructs a temporary input tree and reruns the frozen receipt checkers without executing a target. An initially missing frozen imported fixture was added from its exact hash-bound input; the failed verification log remains. The first initializer launch failed before loading its absent runner; the exact upstream runner was restored before the 69 actual pairs were executed.

## Verify

With the repository's solders-enabled Python environment:

```sh
python -I -B research/mayhem-historical-macro-linux/verify.py
python -I -B research/mayhem-historical-macro-linux/test_verify.py
```

Standard Python can explicitly check static evidence with `verify.py --static-only`. That mode makes no runtime/signature-verification claim. Default verification requires the complete runtime evidence and dependencies; there is no missing-fixture waiver, compiler/VM/Git/network fallback, or receipt retagging. Only the hash-pinned `scripts/analyze.py` is external to the packet for offline static verification. Producer scripts preserve their actual workspace-specific build paths; regeneration requires the recorded SDK and dependency cache.

Ten tests reject concrete program-source, historical-source, host-macro, target-artifact, exact raw-body register/scalar, initializer Source/vtable/call-target and signature-byte mutations. The full-body matcher keeps its prior masks. These finite tests do not certify arbitrary source or library behavior.

`exploration/` separately preserves 21 unsuccessful quote-source search controls, all actual source deltas, logs and compiled ELFs. They use the upstream quote-control sibling base, not the canonical sizing/macro composition. Every control retained 429 normalized / 84 native raw-local windows and added no complete match; none has a fresh VM or acceptance claim. Only those tested forms failed. Their evidence must not be counted as another recovered function or repeated as a new discovery.
