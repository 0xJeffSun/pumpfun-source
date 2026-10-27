# Native Linux PR #282 historical-macro composition

This packet composes the complete Buy/Sell quote recoveries from PRs #280/#282 with the native historical program macro from PR #279. It retains the upstream initializer and BuyV2 corrections. Source-recovery credit belongs to those preceding packets; this composition adds no normalized window to their frontier. The newer qualified checkpoint at `c7837e92d` retains a closer 13,784-byte partial Legacy Buy body. This exact PR #282 native source still has its 13,680-byte Legacy Buy body; it does not replace that qualified checkpoint or claim to include that later ownership edit.

Two actual Linux v1.54 root compilations produce byte-identical complete artifacts:

| Artifact | SHA-256 |
| --- | --- |
| Stripped candidate | `9d6b9032858aae91b63c95b496f9819501de0e0069edc323f3e609d734f445b8` |
| Symbols | `9874fa103179a8c0eabdd1c04ad6fc9d8019c0726a4ca0c50b7be77df5d95e4b` |

The composition preserves **432/441 normalized original windows**, all **4,383** previously positive immediate-call observations, and all 84 native parent raw-local matches. It adds the complete 544-byte raw-local window at original address 538944, yielding **85 native raw-local matches**. This reproduces PR #279's allocator-context effect on the newer source; it is not a new allocator discovery. The separate qualified 432/100 and historical 430/141 measurements are not combined with these counts.

Both outputs retain the Buy and Sell helpers' twenty same-offset immediate-callee checks and twenty ordered typed data observations. Their complete 960-byte initializer also retains six ordered immediate calls and four bounded typed pointer observations. These checks do not prove recursive calls, indirect calls or global data equivalence.

Nine original windows, totaling 107,952 text bytes, remain unmatched. Both complete outputs differ from the original. **Whole core identity remains 0/4**; the other three core binaries are not freshly compiled or compared here. No selected source, checkpoint, workflow or global ledger is changed.

## Source and build scope

The source archive is the exact 67-file PR #282 parent. Only the curve crate's explicit macro invocation and historical CreateEvent-bearing IDL change. Every handler, root namespace and generated reference remains intact. Per-file hashes, overrides, actual commands/environments/logs, both complete outputs and the reused parent are retained.

The host macro and curve dependency are reused from PR #279, with exact hashes. The newly compiled root uses the official Linux x86-64 v1.54 SDK. Six executable identities and all 26 official target-library hashes are rechecked after compilation. This is an incremental target build with a warm cache, not a new host-macro build, clean dependency build, authenticated historical recipe or pin of every host library/C linker. Original target binaries are read-only comparison/runtime inputs, never compiler/linker inputs. There is no binary rewriting, padding, assembly or additional matcher mask.

Four ordinary Legacy Sell source controls remain negative:

| Control | Legacy Sell bytes | Native raw-local windows |
| --- | ---: | ---: |
| PR #282 parent | 13,008 | 84 |
| Explicitly retain old CPI error while constructing replacement | 13,008 | 84 |
| Convert price-check errors inside an Anchor Result | 13,432 | 71 |
| Pass price reserves by value as u128 | 12,864 | 84 |
| Pass price reserves by value as u64 | 12,864 | 84 |

The original handler is 12,992 bytes. None matches it. All controls preserve the 432 normalized matches, but the Anchor Result control loses thirteen raw-local matches and is rejected. The retained-error output exactly repeats both parent ELFs; the u64/u128 value controls exactly repeat each other's two ELFs. The parent, retained-error and value controls have the same 51 immediate-callee multiset as the original; their caller bodies/order remain unequal. The Anchor Result control instead has 56 calls. No negative control has a fresh VM acceptance claim. Only these precise tested forms are excluded.

## Fresh bounded runtime

The composed artifact has its own **2,496 AMM comparison pairs / 4,992 independently verified signed records** across six unchanged Buy/Sell suites. Buy has 419 pairs per family and Sell has 413. Both Token-2022 suites are rejection-only. These are finite fixture checks, not successful Token-2022 trade evidence or arbitrary-state equivalence. No raw trade-log/compute-unit identity is claimed.

Another **69 initializer pairs / 168 signed records** include ten genuine original-Pump CPI successes. Actual executable program-account hashes and signatures are checked. Earlier parent/macro trade and initializer receipts remain bound to their own artifacts; they are not relabeled as executions of this composition. Rechecking signatures adds no cases.

All 31 raw AMM runtime files and both complete initializer reports are retained losslessly. The verifier reconstructs a temporary tree of frozen inputs and reexecutes the unchanged independent receipt checkers, without a VM, compiler, Git or network fallback. The input capsule contains unused support files too; its file count is not a count of executed scripts. The first offline check was launched before capture finished and failed on the absent inventory before receipt verification; the completed inventory is required on subsequent checks. A later check found an initializer harness omitted from the inherited input capsule; the exact recorded-hash file was added before full rechecking, without a missing-input waiver.

## Verify

Use an existing Python environment with Solders 0.27.1:

```sh
python -I -B research/mayhem-native-current432-composition/verify.py
python -I -B research/mayhem-native-current432-composition/test_verify.py
```

Standard Python may explicitly use `verify.py --static-only`; that mode claims no runtime/signature replay. Four external static inputs are SHA-256 pinned. Missing or changed inputs fail closed. Ten mutation tests cover register/scalar/branch bytes, masked immediate callees, Source/vtable data, source maps, manifest completeness and actual signature bytes. Only bounded typed checks examine normalized pointers; opaque references elsewhere remain unproved.
