# AMM create_config and shared-method source build

One clean isolated source build of the exact reviewed 22-input proposal succeeded. Candidate SHA-256 is `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2`, **1,199,296 bytes**. All **17,462 existing comparisons across 25 suites passed**, with **35,418 verified signatures**, 191 stricter scalar diagnostics and 78 stricter recipient diagnostics on unchanged fee-config cases. No new cases or initializer-success fixture were introduced.

`create_config` remains **static-only**, with no authentic positive runtime coverage. The existing 37 bounded handler count remains unchanged. The fixed administrator and PDA/account constraints are exactly the reviewed source. Whole ELF equality is **false**, and this is not complete recovery or security approval. Main source, central status and published files were not edited.

## Source and tool provenance

The immutable reviewed proposal is retained in `prebuild/` (seal `12b3943b4fefbb510c0f7786caf42ade28aeca0031a518a455e3e4d95236b6d8`). `source/` contains its exact 22 inputs, without source changes. Cargo/lock/profile and compiler recipe are unchanged. Four new ordinary module files and the two reviewed source edits reconstruct create_config/context/event and the four real shared GlobalConfig methods. There are no inline attributes, artificial callers, diagnostic padding, binary edits or compiler variants.

`frozen-inputs.json` and `tools-before.json` were recorded before compilation. The clean build's actual 22-file manifest is in `build-attempt.json` and `build-comparison.json`; before/after source maps are equal. The actual maintained builder and its helper snapshots are retained. The prebuild dependency check verifies all 254 locked public registry archives and 5,567 extracted source files against archive members. This current locked dependency check is not proof of the original historical graph.

The existing CLI is `solana-cargo-build-sbf 2.1.21`. Although its version banner mentions its default platform v1.43, this invocation explicitly selects **v1.44**. Cargo's target metadata identifies the actual v1.44 compiler sysroot. The installed SDK's separate unchanged strip phase selects **v1.52**; `toolchain-phases.json` binds the actual compiler, linker, strip executable and SDK scripts independently. The isolated final `solana` alias is not used to infer compilation identity. SDK links, target and rustup home were private to this build. `tools-after.json` confirms the frozen tool/helper/SDK source identities still agree.

Only the named candidate, unstripped ELF, rustc metadata and logs were retained from the build tree. Generated deployment keypair files were excluded **before opening**; only their path metadata is recorded. The build target was never recursively packaged.

## Fresh static comparison

All addresses below come from this build's fresh unstripped symbols. The retained original is hash-bound. Normalization masks relocatable instruction addresses/call displacement, not ordinary instructions; target bodies and consumed data are separate obligations.

| Routine | Candidate address | Original/candidate bytes | Complete normalized equality |
|---|---:|---:|---|
| Create wrapper | `0x942b0` | 2320 / 2320 | Yes |
| Create handler | `0xa0188` | 3032 / 3032 | Yes |
| Create context | `0x46128` | 5752 / 5752 | Yes |
| Init helper | `0x477a0` | 5896 / 5896 | No: two source-coordinate immediates |
| Recipient setter | `0xfe78` | 2336 / 2336 | No: four source-coordinate immediates |
| Create event serializer | `0x48ea8` | 744 / 744 | Yes |
| Update wrapper | `0x9d248` | 2296 / 2296 | Yes |
| Update handler | `0xc8340` | 2912 / 3160 | No |
| LP setter | `0xf758` | 616 / 608 | No |
| Protocol setter | `0xf9b8` | 616 / 608 | No |
| Creator setter | `0xfc18` | 616 / 608 | No |

The initializer's six routine roots contain 112 direct callsites; **107 immediate target bodies match completely**. The remaining target obligations are the three scalar methods, recipient setter and init helper. All calls, body hashes, extents, symbols and exact instruction differences are in `static-comparison.json`. The three scalar methods' five direct calls are also paired in semantic call order: four targets match, while their actual `with_values` target retains four instruction differences. An unused generic matching helper is explicitly not substituted for that actual target.

All four methods now have exactly two identified real direct callers: create_config and update_fee_config. The build confirms that graph but does **not** recover the original scalar codegen: each stays 608 bytes rather than 616. The actual common error helper at `0x340` is 1,336 bytes with four normalized instruction differences. The update handler shrank from accepted a6's 6,096 to 3,160 bytes but still differs from the original 2,912-byte body; no matching claim follows from smaller size.

Init helper changes are line 6 → 7 and filename length 57 → 39. Recipient changes are lines 256/263 → 25/27 and filename lengths 44 → 26. Actual paths are `src/instructions/admin/create_config.rs` and `src/state/global_config.rs`; historical paths/coordinates are not imitated. These are explicit complete-body mismatches, not silently normalized differences.

The 33 previously bounded initializer data references were recomputed against this candidate: 30 exact spans match, and three source-filename spans differ as stated. The event discriminator and event-CPI tag match at fresh locations. Eleven compiler panic/format/I/O metadata references remain outside full recursive data closure. The supplemental ledger retains every data pointer in the eleven root bodies, including the actual scalar origin paths; it marks unclosed extents rather than guessing them from neighboring strings.

Existing serializer fidelity was independently recomputed: Pool exit at `0x4570` is 1,704 bytes and GlobalConfig exit at `0x3f00` is 1,648 bytes. Both complete bodies, **all 24 direct targets each**, and each eight-byte discriminator match the original. `function-match.json` binds this fresh candidate and symbols. Full program/data equality remains false.

## Runtime evidence and unchanged inputs

The 25 original maintained suite commands are retained in the input snapshot. Their candidate/output arguments were pointed at this exact new ELF; fixture and harness files were unchanged. The observational wrapper verifies every ordinary test-owned transaction signature before forwarding its exact bytes to LiteSVM. It records loaded program hashes, signed transaction bytes, errors and log hashes. Transaction-history settings remain exactly as specified by each frozen suite; no historical signed payload was altered and no initializer signing workaround was introduced.

The frozen pre/post maps bind 22 actual scratch compiler inputs, 34 harness/runner inputs, 13 runtime fixture/dependency inputs and the 18-file accepted checkout snapshot. Some established receipts embed that last checkout map. Those embedded maps describe the unchanged checkout, **not** this scratch compilation. Every receipt is separately bound to the tested ELF and actual 22-input clean build manifest by `receipt-bindings.json.gz`. No inherited receipt is claimed as fresh execution of this candidate.

There are 34,924 comparison transactions plus **150 existing signed original-program create_pool setup transactions** in the boost suite: 35,074 observed transactions in total. Setup operations are classified separately by actual decoded instruction discriminator and do not increase the 17,462 comparison count. All 35,418 signatures verify, and each case's original/candidate transaction pair matches its saved error/log evidence.

The existing 356 fee-config cases retain identical payloads/mutations. Additional read-only checks verify:

- 191 scalar rejection cases preserve the original `Left: 1000` / actual supplied `Right` order, including existing 1001/u64::MAX cases.
- 78 recipient rejection cases preserve the complete original diagnostic sequence after explicitly separating truthful source-coordinate and measured compute differences. No spurious Left/Right public-key payload remains. Both sides preserve rollback state.

These checks use only saved results from the unchanged corpus. They add no runtime case or initializer coverage. `scalar-diagnostics.json`, `recipient-diagnostics.json`, `runtime-summary.json`, every receipt/log and signed sidecar are retained. The initial and expanded static reports reflect read-only ledger refinement, not source or build variants; this build and all runtime suite commands succeeded on their first execution.

## Review boundary

This handoff supports review of the exact source proposal and the observed static/runtime improvement. It does not authorize or perform main promotion. If later accepted, creation must remain labeled static-only and existing bounded handler/case totals must remain unchanged. Future main compilation must be separately source-bound; whole-file identity to this ELF would allow the exact saved corpus to bind to that main compilation.

Portable verification: `work/test-env/bin/python -B work/amm-create-config-build/handoff/verify.py`. It reads saved artifacts and independently verifies signatures; it does not compile or execute Solana programs. Optional `--current-source /path/to/repo` verifies the still-accepted 18-file checkout baseline, not the proposed scratch source. The only required Python runtime dependency is the already-used `solders` transaction decoder.
