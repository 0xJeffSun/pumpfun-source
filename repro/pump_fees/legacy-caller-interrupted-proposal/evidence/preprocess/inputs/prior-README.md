# Fees legacy quote admission and social associated-token helper — scratch handoff

One isolated build of the two reviewed source proposals passed the unchanged 17,461 comparison corpus and the separate ten-step donation sequence. Main source has not been changed. This is a bounded source-recovery result, not whole-program equivalence or audit approval.

## Exact candidate and source composition

- Candidate: `candidate.so`, 773,808 bytes, SHA-256 `8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`.
- Symbols: `symbols.so`, SHA-256 `ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b`.
- Original: SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes. Whole-file equality is **false**: 423,337 differing shared byte positions; candidate length is 175,136 bytes shorter. Size is not an equivalence measure.
- Accepted predicate/ownership base: `a769ab3ccbb343e19a8aace7f7fd537725c27c90e09768daa4cd13cd73f4b9a9`, source package seal `22c362facdcf5c132d6db656489f81aec3a001840e900aeaa8d3230fe66e15af`.
- `inputs/baseline-source-sha256.json` and `inputs/corrected-source-sha256.json` bind all 26 actual source inputs. `source.patch` changes exactly three paths relative to that accepted base: `sharing_update.rs`, `social.rs`, and `instructions/fee_sharing/mod.rs`. The base's accepted predicate and donation ownership changes are preserved; `donation.rs` remains SHA-256 `3b946e7f6c7636c1d18224ce380a3605205e63d89e4ff478fc0c4399981770c6`.

The exact reviewed legacy `after_parallel` patch and public social helper patch both applied with zero fuzz and matched their recorded output hashes. The initial preparation script then failed on a manifest schema assertion (string versus structured entry), before compilation. `preparation/` preserves that failure and the explicit continuation that checked `before_sha256`/`after_sha256`. No source patch was retried or altered.

## Build and tool provenance

`build-01/build-attempt.json`, `build-comparison.json`, `build.log`, `build-result.json`, and `tool-phase-provenance.json` retain the one successful fixed-recipe build: official v1.44 compilation followed by the recorded SDK's v1.52 stripping phase. Source, SDK, tool and authentic dependency snapshots were checked before and after. The build used isolated SDK, Rustup and target directories. No compiler, dependency, flag, profile or source-coordinate variants were tried. Numeric exit was zero and the backend stack diagnostic list is empty.

The frozen dependency records cover 252 packages and 14,287 cached payload/generated metadata files. This package retains their hashes, not a replacement cache or claim that it independently distributes all compiler artifacts. Absolute original work paths in records are historical provenance; verification reads adjacent packaged copies.

## Fresh complete static comparison

`full-function-inventory.json` retains all **585 original inferred windows** and all **547 current symbol windows**, including ambiguous, unmatched and call-conflict rows. These windows are not a proven semantic function denominator. `added-static-proof.json.gz` compares every original row against the accepted a769 inventory and records complete current legacy/social bodies, wrappers, parser, exit, immediate callees, raw signed call operands and referenced data. `complete-byte-comparison.json.gz` partitions every shared byte position and records the unmatched tail.

Current inventory has 440 candidate windows with consistent normalized call patterns, 105 unmatched and two call conflicts; 100 candidate windows are raw-equal. Original rows comprise 439 mapped, 143 unattributed and three call conflicts. Relative to a769, two original rows changed from unattributed to mapped: 40472 and 41456, corresponding to drop routines. Ambiguity remains in 137 original and 137 candidate rows; 271 immediate call-pair residuals remain (177 unique-target conflicts, 92 unresolved and two terminal). These classifications do not prove transitive equivalence.

The legacy quote helper is inlined into current `update_fee_shares` at 508680..517160. The actual generated code checks data length, treats short data as accepted, borrows and reads exactly bytes 83..115, compares with the zero key, restores the borrow, drops temporary AccountInfo references, and tests the Boolean before loading the sharing version. The UnsupportedQuoteMint 6031 arm precedes the version 6024 arm, with no compared-values augmentation. The complete legacy body still differs from the original. Real source filenames/coordinates remain different.

The current social admission helper is 78072..83800 and its caller is 401856..411960. Two calls pass creation flags false and true. Fresh code checks the canonical associated address, System ownership and creation permission, exact supplied token-program ownership, decoded mint, and uses the idempotent associated-token instruction constructor (opcode 1), ordinary invoke and six AccountInfos. All 17 original helper direct-target windows have normalized matches actually called by the current helper. The six-AccountInfo drop at current 39648..40424 is raw-identical to original 40472..41248. **The complete social helper, handler and enclosing framework windows are not claimed equal**; their full comparisons and data references remain in the ledger.

`retained-static-gate.json` also rechecks the existing ten complete bodies, 26 direct calls, five literals, five account codecs and 35 codec calls, retaining known source-coordinate differences. Unresolved remaining-account preprocessing, V2 payout, context/metadata differences and deeper transitive call/data closure remain open. No token-extension interpretation or stopped-lane recovery is inferred from this work.

## Runtime scope and saved verification

All eleven jobs returned zero. The unchanged 17,441 baseline comparisons and unchanged 20 focused donation comparisons passed, for **17,461 comparisons**, plus **ten separate sequence steps**. There are **zero new fixtures** in this task; the focused 20 are a repeated accepted corpus, not 20 newly discovered cases. Historical baseline duplicate accounting and focused-case origins are preserved. Eleven retained diagnostic rows also pass their strict saved-log comparator. Original historical initializer messages and signatures are unchanged; normal signature, freshness and history controls remain enabled where specified by each frozen harness.

`runtime/*.json.gz` contains lossless deterministic gzip copies of the fresh raw reports; each uncompressed SHA is checked against the original progress row. `runner-repo/`, `validation-layer/`, and their maps bind the complete harness/fixture closure. Only the explicit focused source-map binding was adapted; `inputs/runtime-source-binding.patch` records it. `saved-verifier-portability.patch` records the one reader adaptation for compressed report storage, with assertions unchanged.

The run invoked `work/test-env/bin/python`, Python **3.12.11**, with solders **0.27.1**. `runtime-engine.json` is explicitly a post-run measurement using that same executable. `inputs/prior-runtime-engine.json` preserves the earlier base package's Python 3.14 record as history, not a claim about this execution. The recorded solders native hash is `a39f7bd790676cd4cf8cfde92d743b9647fb292245feb142ae1239c55414962d`.

## Portable checks and proposed integration

Run `python3 -B /absolute/path/to/handoff/verify.py` for the seal, exact source/build/tool bindings and recomputed static ledgers. Run the same command with `--runtime` under Python with solders 0.27.1 for saved assertions and cryptographic transaction checks. Neither command builds or executes a target transaction. The package is self-contained for these checks and does not read a work cache or moving main source.

`integration-proposal.json` proposes review before main promotion. Handler count remains **31 bounded**, and whole-program exactness remains **0/4**. Relative to the older 5cf main source, promotion would also need the accepted a769 donation change; do not drop that prerequisite or mistake the three-path patch for the entire main delta. Any authorized main promotion must finalize its separate README, clean-build the exact source once, and require entire stripped ELF **and symbols** identity before carrying these receipts forward. Central status, workflow and documentation changes remain parent-owned.
