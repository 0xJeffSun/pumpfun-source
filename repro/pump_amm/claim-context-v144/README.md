# AMM claim account context restoration

One isolated pinned v1.44 build, with v1.52 stripping, restores three ClaimTokenIncentives account declarations from the formatter-restored baseline. `user` and `event_authority` now own AccountInfo values; the global accumulator stores its Account inline. `source-proof/` preserves the original complete member/constructor/drop proof, before/after source and exact patch. No other source, Cargo, or vendored dependency input changed.

Candidate: `6f2589487eac44be02788312a55bcba09cebea635d9bdf0880d65b9999381815`.
Symbols: `10a7804429ce02fdec15f9a37f34fc67dab987e514295630b467ace314f0d935`.

Build and runner exited0, source manifest unchanged,28 explicit source inputs including all six vendor assets, tool and dependency records unchanged, no backend stack errors. Complete compiler output is in `build-01/build.log`; source/build/tool/dependency identities are separate records. The unchanged lockfile includes the already accepted formatter path patch and bs58 edge. No new dependency correction is introduced here.

## Static result

The complete original/current Claim parser10344, initializer closure5296, exit952 and wrapper1112 byte windows now have normalized body correspondence. Parser, closure and exit immediate target bodies match. The wrapper still calls the unmatched handler, so wrapper body correspondence does not establish transitive equality. Parser recursive graph correspondence also remains false. `claim-static.json`, `new-matches.json`, and complete before/after function/call/data ledgers preserve these distinctions.

Original normalized matching windows rise479→483 of785; unmatched306→302. Candidate unmatched windows196→192. Raw original body matches remain93. Whole ELF equality remains false: candidate1197792 bytes, original10485715 bytes,9960260 differing positions. These figures are inventory observations, not completeness estimates. Original boundaries remain admitted inferred windows.

## Unchanged runtime evidence

All25 saved suites passed17462 cases, with35074 transactions and35418 verified signatures. This includes34924 comparison transactions and150 existing boost setup transactions. No new case, probe, fixture, initializer-success test, signer or history change was introduced. Signed bytes and receipts are losslessly compressed in `runtime-01/`; `verify_runtime.py --verify` rechecks them without running a target. Truthful source locations and measured compute remain explicit diagnostic differences.

## Verification and limits

`python3 -B verify.py` checks the exact public manifest, source/build identities, regenerates both complete inventories, reruns static formatter and claim checks in disposable directories, and verifies all saved runtime signatures. It performs no compile or target execution. It requires the same Python analysis dependencies as the accepted verifier, including solders. `--current-main /path/to/repo` additionally binds all28 current compiler inputs; it does not build or claim current-main ELF identity.

The initial preparation missed a published static-reference directory before any compiler launch; the retained preparation scripts show the fallback to the accepted prior static reference and accepted build helpers. The first claim-static handler lookup exited1 because its symbol selector named the source helper instead of the exported program method; `static-lookup-correction.json` and `claim_static.initial.py` preserve that failure. Only the selector changed, with assertions retained. There was exactly one compiler attempt and one unchanged corpus run. No main source edit or deployment occurred.

Historical/package-version identity, full recursive data/call equality, dynamic coverage outside the saved corpus, and byte-exact whole-binary reconstruction remain unproved. The build result is evidence for this source correction only.

Publication note: generated Python bytecode is excluded. The original worker seal and exact exclusion are retained in `publication-history/`; source, artifacts and receipts are unchanged.
