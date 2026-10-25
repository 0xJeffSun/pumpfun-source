# AMM destination-rent build: review package

The single authorized offline source build succeeded. All **17,462 unchanged comparisons across 25 suites** pass, including **267 unchanged transfer-creator rows**. Independent saved-evidence verification passes **35,418 signatures**, 191 existing scalar checks and 78 existing recipient checks. This is a reviewable scratch candidate, not main acceptance, complete behavior, whole-original equality or security proof. Root review is required before integration.

## Source and provenance

Accepted package: `repro/pump_amm/update-event-borrow-v144`, manifest SHA-256 `8b850d6bf0ba8a302f135ec3f1b90ef1e25ac7e4f8ebb1a6c9e9618b2d9236b5`. The prior candidate is `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1`. Its named 22-input map, package files, current main source and source snapshot were checked before copying. No moving HEAD supplied build inputs.

The approved proposal package seal is `c4f7f087e0d093a3c962fd1212af539b7650f1296cdae350658c7c28bd739930`; patch SHA-256 is `f1c1fe8eb77bbbf9452c59c20744d1e9346e493f6d3a65744aa04123f92fa1d3`. The sole source change is `minimum_balance(0)` to `minimum_balance(destination.data_len())` in `transfer_creator.rs`. That file changed from frozen `a9c11eb18cd6e246e03221699abaf7fa9023253c492921b6c2876978555aebb3` to `20082ba3faf069756d3e26011ff06dcb03679416e6decdad3cca824b09728697`. The other 21 inputs are byte-identical. The strict minimum guard, authority funding, ATA selector 0, close/recreate/transfer order, source attributes and account admission are unchanged.

The accepted package identifies the successful main build as `work/amm-update-event-build/main-build-01` and seals its build helper and tool/SDK witnesses. This run used that unmodified helper with private source, target, SDK and rustup directories, and a private copy of the public registry cache to avoid parent writes. The recipe remains offline, locked v1.44 compilation and SDK-selected v1.52 stripping. Cache paths differ as a consequence of isolation; no path remapping or source-origin spoofing was applied. All 254 registry archive checksums and 5,567 extracted public source files were verified before and after. Tool and SDK witness maps and all 22 source inputs match before/after. These bounded witnesses do not establish a unique historical dependency/toolchain graph.

One build was run, with exit code 0. The full compiler output and invocation log are retained. No backend stack failure was found. Ten deprecation warnings and the SDK's undefined-syscall warning remain visible; the latter exactly matches the accepted build warning. The SDK's sealed syscall-list file is empty. Actual compile metadata identifies v1.44, while the isolated SDK's final link identifies v1.52 stripping. No compiler options, ELF bytes, headers or relocations were edited. Generated deployment keypairs were not opened, copied, hashed or published.

## Exact outputs and static result

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Candidate | 1,199,064 | `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706` |
| Symbol ELF | 1,682,440 | `3208594d62e12b12399a3a574491cc86893021547dae475d584dba49087d560c` |
| Complete original | 10,485,715 | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |

`targeted-static.json` binds the new symbols and complete shared-helper instructions. Its 5,144-byte `unwrap_and_move` helper begins at `0x3ec40`. Actual call `0x3ed70` reaches `AccountInfo::data_len` at `0xf9528`; the returned length moves from r0 to r2 at `0x3ed80`; call `0x3ed88` reaches `Rent::minimum_balance` at `0xf7c88`. The same r9 account supplies the subsequent lamports read. Both target bodies have complete normalized original counterparts. These are freshly decoded targets, not copied candidate offsets.

The helper's actual calls retain close at `0x3f990`, ATA create at `0x3feb8`, and System transfer at `0x40010`. `ata-selector-static.json` follows create's actual constructor target and records its selector-0 store. Source equality outside the one argument is separately verified. Static call correspondence does not close all failure paths, indirect calls or referenced-data semantics.

`static/` preserves all **785 original inferred windows**, **653 candidate symbol windows**, **668 symbol rows including aliases**, and **653 independently inferred candidate windows**, with ambiguity, unmatched rows, actual direct targets, indirect edges, data references, headers, section records and relocations retained. There are 475 original windows with normalized correspondence, 310 without; 197 candidate windows lack an original normalized match. Neither percentage nor normalization is whole-binary identity. Original inferred boundaries are not authenticated historical function boundaries. Historical rows remain separately labelled, and stale focused-candidate offsets are disabled.

Every original byte is compared: **670,580** unequal positions in the shared extent, **9,286,651** original-only positions, **9,957,231** total differing/missing positions. First difference is byte 24. `static/whole-file.json` retains exact maximal mismatch ranges and the original-only tail without changing it. Candidate and symbol `.text` bytes and relocation patterns agree.

## Regression evidence and limits

`runtime-01/` contains every full comparison receipt, suite log, incrementally retained progress file and signed transaction sidecar. The observer and suite scripts are unchanged accepted versions. Only orchestration paths and separation of actual compiled versus legacy source maps changed for isolation. The 34,924 comparison transactions plus 150 pre-existing boost setup transactions total 35,074 transactions. `verify_runtime.py` remains byte-identical to the accepted saved-evidence verifier. `runtime-summary.json`, `receipt-bindings.json`, `scalar-diagnostics.json` and `recipient-diagnostics.json` bind the actual candidate and source to the saved evidence.

`transfer-summary.json` retains all 267 accepted row identities; 100 rent-edge and 24 destination-data rows are unchanged. The data-rent cases initialize **zero-lamport destinations** and do **not** establish behavior for a live nonempty account. A passing corpus therefore does not complete this behavioral gate. The external **8/267 claim remains unverified**. The transfer suite compares error, selected account states, inner instructions and event logs; ordinary logs, compute and full execution traces are not equivalent under that contract. Synthetic finite fixtures are not unrestricted-input or security proof.

No new case, changed test assertion, signing/PDA/history/blockhash bypass, chain transaction, stopped-lane continuation, parent edit, staging, commit, push, network request or other-chat message was introduced. `runtime-source/` preserves the old source snapshot used for legacy receipt bookkeeping; only `source/` is the actual corrected compilation map. Mutable orchestration logs are retained as finished artifacts, never asserted immutable during execution.

## Verification and ownership

Run `python verify.py` using Python 3.11+ with the accepted `solders==0.27.1` environment. It checks the payload seal, exact source delta, before/after bindings, all saved signatures and existing diagnostics, actual targeted calls, then regenerates and compares the full static inventory in a temporary directory inside the package. It does not compile or replay a transaction. A separate copied package is used for delivery verification; its external receipt and the exact `owned-publication-files.json` map sit outside the sealed publication to avoid self-reference. All generated work is under the assigned worker directory.
