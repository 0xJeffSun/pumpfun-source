# Fees legacy quote and social admission — clean main source checkpoint

The clean main build is byte-identical to the independently tested scratch executable **and its complete symbol-bearing ELF**. All 31 handlers remain bounded reconstructions. The captured original still differs; these results do not establish whole-program equivalence, complete security coverage or a unique historical source/toolchain recipe.

| Artifact | SHA-256 |
| --- | --- |
| Main candidate, 773,808 bytes | `8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b` |
| Complete symbols | `ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b` |
| Main build report | `a55d91be1731af28e295b0815781d542f0edd3fe0f3070a0708578e85098b04d` |
| Preserved 372-payload scratch manifest | `7ded04148cddf20304e04a076af3baff57df67e71cd4d33547e949d9626bc3f6` |

## Source and one clean main build

`main-baseline-source-sha256.json` binds the exact accepted 5cf8 baseline before promotion. Only four Rust paths changed: `donation.rs`, `sharing_update.rs`, `social.rs`, and `instructions/fee_sharing/mod.rs`. They compose the accepted predicate/ownership source with the reviewed legacy-quote and social-admission patches. `main-promotion.patch` also includes the finalized program README. `source-sha256.json` and `source-snapshot.tar.gz` bind all 26 actual inputs; the README is also identified separately in `documentation-sha256.json`.

The one main build returned zero, with no backend stack diagnostic, using the unchanged pinned dependency graph, v1.44 compilation and the retained SDK's v1.52 `llvm-objcopy` stripping phase. SDK, Rustup alias and target directories were isolated. Before/after source, tool, SDK and authentic cache checks passed. `main-prebuild-manifest-sha256.json` explicitly freezes preparation inputs and excludes live orchestration logs. No failed main build, retry, flags, dependency, compiler or source-layout variant was introduced.

`main-scratch-identity.json` binds exact executable and symbol equality, both source maps and both build reports. The sole source-map difference between scratch and main is the finalized README. `scratch-handoff.tar.gz` preserves the complete reviewed scratch package, including preparation failure history, original source patches, full raw receipts and portable verifier. Cache/SDK/compiler hashes are retained; private keys, generated deployment keypairs and the private dependency cache are not distributed here.

## What the fresh bytes support

Legacy sharing admission checks the curve quote at bytes 83..115 only when allocation is at least 115 bytes. Short data is admitted by this helper. Borrow release and temporary AccountInfo drops occur before the Boolean admission branch; error 6031 precedes the sharing-version error 6024, without compared-key augmentation. The helper is inlined into the fresh legacy handler. The entire legacy handler remains unequal to the original.

The social helper checks canonical associated address, System-owned creation permission, exact supplied token-program ownership and decoded mint. Its two callers pass false/true creation flags. The creation branch invokes the idempotent associated-token instruction (opcode 1) with six AccountInfos through ordinary invoke. All 17 original immediate helper target windows have normalized matches actually called by the new helper. The six-AccountInfo drop body is raw-identical. Complete social helper, handler and wider context equality is not established.

The exhaustive ledger retains all **585 original inferred windows** and **547 current symbol windows**. There are 439 mapped original rows, 143 unattributed rows and three call conflicts; current candidate classifications are 440 normalized consistent, 105 unmatched and two call conflicts. 100 candidate windows are raw-identical. The two newly mapped original rows relative to the accepted a769 source are drop routines. Ambiguity and immediate/transitive call/data residuals remain explicit. Window counts are not a semantic completion percentage, and binary size is not evidence of equivalence.

`added-static-proof.json.gz`, the instruction/data ledgers, full function inventory and full byte partition are copied unchanged from scratch and reverified against the exact executable. The retained gate also checks ten complete bodies, 26 calls, five literals, five account codecs and 35 codec calls. Natural source-coordinate differences, remaining-account preprocessing, V2 payout and unrestricted descendant/data closure remain unresolved. No token-extension or stopped-lane behavior is inferred.

## Saved corpus and portability

All eleven scratch jobs have retained numeric zero exits. The saved corpus is **17,441 unchanged baseline comparisons + 20 unchanged focused comparisons = 17,461**, with **ten separate persistent donation steps**. This checkpoint introduces no new fixtures or unique cases and performs no main-build runtime replay. Eleven saved diagnostic rows are checked strictly. Two authentic historical `initialize_fee_config` messages retain their original signed bytes; they are not historical `initialize_fee_program_global` transactions.

The saved verifier checks 17,204 signatures in 8,644 encoded baseline/sequence fields, plus 80 signatures in 40 focused executions and the two genuine historical captures separately. Encoded fields and signatures are not unique-case counts. Some older baseline reports retain runtime controls without complete transaction bytes. Normal signature, blockhash and history safeguards remain as recorded by each unchanged harness; no signer bypass is added.

The actual scratch command used Python 3.12.11 and solders 0.27.1. `runtime-engine.json` is explicitly a post-run observation of that executable; the older Python 3.14 record remains historical inside scratch. Direct report gzip files are byte-identical copies, with their uncompressed hashes and main identity bound by `receipt-build-bindings.json`.

`published-harness-sha256.json` maps 44 current public copies to 46 recorded paths, with the two historical `work/` origins resolved to byte-identical public scripts. `runtime-inputs.json` binds 18 public runtime/fixture inputs. Four focused Python files and their fixtures/provenance have separate current maps. Only the focused source map and current build record change for future main executions; `focused-publication-adaptation.patch` records this. Saved focused receipts remain bound to the source/build that actually executed. No assertion or fixture changes accompany publication.

```sh
python3 -B repro/pump_fees/legacy-social-admission-v144/verify.py
python3 -B repro/pump_fees/legacy-social-admission-v144/verify.py --runtime
python3 -B repro/pump_fees/legacy-social-admission-v144/verify.py --current-main --repo .
```

The first command verifies the seal, builds/source/tool bindings and freshly recomputed static ledgers. `--runtime` additionally verifies saved assertions and signatures using solders, without target execution. `--current-main` checks that all current source/helper/documentation/harness/runtime/candidate files are tracked and match their hashes; it does not require a `work/` tree. The immutable scratch copy also retains its standalone portable and negative-test results. `status-proposal.json` and `integration-proposal.json` provide parent-owned central integration updates.
