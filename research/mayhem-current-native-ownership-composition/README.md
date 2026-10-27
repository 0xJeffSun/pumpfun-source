# Current ownership source and historical macro on native Linux

This independently reproduces the current qualified source from `c7837e92d` with the official Linux v1.54 compiler, then composes the native historical macro from PR #279. It preserves both recovered quotes, the initializer and the closer partial Legacy Buy body. Credit the upstream source and ownership packets for those recoveries. This is an unqualified native linker recipe; its counts are separate from the qualified mixed-toolchain result.

| Native stage | Candidate SHA-256 | Normalized windows | Raw-local | Distinct window-shape assignments |
| --- | --- | ---: | ---: | ---: |
| Exact current 67-input source | `a6adc4f876da179b4ce3daeebd55d24d17ca1aad4fc288085c5a1c5ba15069c5` | 432 | 84 | 431 |
| Historical macro composition and repeat | `78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932` | 432 | 85 | 432 |

The complete symbol artifact is `5aad2a991fe54a2ad0f4c33bc99f34725795acaf936e4ac4b2042c0e7dbc6f75`. Two actual root compilations reproduce both complete ELFs. Every prior normalized/raw-local match and all 4,383 positive immediate-call observations survive. The same 544-byte raw-local window at 538944 is added as in the older-source macro experiment.

The assignment count respects multiplicity: the parent reuses one candidate for two original windows of a duplicated shape. The composition supplies the second instance, allowing 432 distinct candidate windows. This reproduces the earlier allocator-context effect on current source. It adds no new original body or normalized frontier and proves no call/data graph isomorphism. **Nine bodies / 107,952 original text bytes remain unmatched; whole core identity remains 0/4.** The other three core programs are not freshly built or compared.

## Preserved partial body and typed checks

The native Legacy Buy body is the same complete normalized 13,784-byte partial body as the current qualified build. The original is 13,848 bytes and still differs. Fifty local callee shapes, seven typed Source records, the CPI origin at `pump_interface.rs:313`, and the observed result-capture/drop markers agree. These are bounded observations, not an exact caller body or proof that the native CPI error callback executes in the fixtures. A 64-byte size difference does not describe the number of differing instructions.

Both quote helpers retain twenty same-offset immediate-callee checks and twenty ordered typed references. The 960-byte initializer retains six ordered immediate calls and four typed pointers. Recursive/indirect/global data closure remains open.

## Fresh execution and negative controls

The composed artifact passes **486 fresh Legacy Buy pairs: 187 successes, 299 rejections and 972 independently verified signed records**. States, events, CPI fields, errors, returns and non-compute logs agree. Executable Mayhem account hashes before and after execution bind both binaries. Raw compute-log differences remain separately counted in `runtime-results.json`. All six raw runtime files are retained losslessly. The default verifier reconstructs seven exact inputs and reexecutes the frozen independent checker and signatures without a VM or network.

No prior AMM, initializer, Burn or sweep corpus is retagged as execution of this artifact. Rechecking signatures adds no cases. The fixtures are finite synthetic executions, not arbitrary-state or live-chain acceptance.

Four ordinary Legacy Buy controls recover no body and have no fresh VM claim. Moving checked multiplication into a Result gives a 13,704-byte body; eager and deferred consumption produce identical complete outputs. Rewriting the range guard reproduces both parent ELFs exactly. Deriving the CPI key from an owned AccountInfo gives 14,112 bytes and remains unmatched. All preserve 432 normalized windows and 84 native raw-local matches. Only those exact forms are excluded.

## Provenance and verification

All 67 parent inputs equal the current qualified source inventory. Only the explicit curve macro invocation and historical IDL change in the composition. Program namespaces, generated references, handlers, selected artifacts, workflows and frozen scripts remain intact. Actual compiler commands, environments, logs, source maps, fourteen complete target ELFs and seven real standard-strip replays are retained. Six executable identities and all 26 official target-library hashes are rechecked after compilation. The host macro/curve and warm target cache are reused; this is not a new clean dependency build or authenticated original recipe. Not every host library/C linker is pinned.

Original ELFs remain comparison/runtime inputs only. There is no assembly, padding, binary rewriting or extra normalization mask. Eight static external inputs are hard-pinned, including the already-merged host macro and current qualified symbols. Missing inputs fail closed.

With an existing Solders 0.27.1 Python environment:

```sh
python -I -B research/mayhem-current-native-ownership-composition/verify.py
python -I -B research/mayhem-current-native-ownership-composition/test_verify.py
```

`verify.py --static-only` explicitly excludes runtime/signature replay. Thirteen concrete mutation checks cover operands, typed data/callees, source/manifest boundaries, duplicate-instance cardinality, executed-program hashes and real signature bytes. Producer scripts retain their original absolute workspace locators; recompilation requires the recorded SDK/cache. The first unsealed static draft had a syntax error; its failed log is retained, and the corrected checks must pass before publication.
